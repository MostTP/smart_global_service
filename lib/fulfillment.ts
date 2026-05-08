import type Stripe from "stripe";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { appendAudit } from "@/lib/audit";
import { notifyChannels } from "@/lib/notify";
import { getStripe } from "@/lib/payments";

export async function finalizeSuccessfulStripePayment(params: {
  sessionId: string;
  session: Stripe.Checkout.Session;
}) {
  const quoteId = params.session.metadata?.quoteId;
  const quoteToken = params.session.metadata?.quoteToken;
  const requestReference = params.session.metadata?.requestReference;
  if (!quoteId || !quoteToken || !requestReference) {
    console.warn("[stripe] missing metadata on session", params.sessionId);
    return null;
  }

  const amountTotal = params.session.amount_total;
  if (amountTotal == null) return null;

  const payment = await prisma.payment.findFirst({
    where: { externalId: params.sessionId, provider: "STRIPE" },
    include: { quote: { include: { request: true, lineItems: true } } },
  });

  if (!payment) return null;
  if (payment.status === "SUCCEEDED") {
    return prisma.receipt.findUnique({ where: { paymentId: payment.id } });
  }

  const pi = params.session.payment_intent;
  const stripePaymentIntentId =
    typeof pi === "string" ? pi : pi && "id" in pi ? String(pi.id) : null;

  const receiptSummary: Prisma.InputJsonValue = {
    provider: "stripe",
    quoteToken,
    requestReference,
    requestId: payment.quote.requestId,
    serviceSlug: payment.quote.request.serviceSlug,
    lines: payment.quote.lineItems.map((l) => ({
      description: l.description,
      amountCents: l.amountCents,
      quantity: l.quantity,
    })),
    totalCents: amountTotal,
    currency: (params.session.currency ?? payment.currency).toLowerCase(),
    paidAt: new Date().toISOString(),
    stripePaymentIntent: stripePaymentIntentId,
  };

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCEEDED" },
    }),
    prisma.quote.update({
      where: { id: payment.quoteId },
      data: { status: "ACCEPTED" },
    }),
    prisma.serviceRequest.update({
      where: { id: payment.quote.requestId },
      data: { status: "PAID" },
    }),
    prisma.receipt.create({
      data: {
        paymentId: payment.id,
        requestReference,
        summary: receiptSummary,
      },
    }),
  ]);

  await appendAudit({
    entityType: "Payment",
    entityId: payment.id,
    action: "payment.succeeded",
    payload: { sessionId: params.sessionId, provider: "STRIPE" },
  });

  const email = payment.quote.request.contactEmail;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (email) {
    await notifyChannels({
      channels: ["email"],
      title: "Payment confirmed — SGS",
      body: `Your payment for request ${requestReference} is confirmed. View your receipt at ${base}/portal/receipt?session_id=${encodeURIComponent(params.sessionId)}`,
      emailTo: email,
    });
  }

  return prisma.receipt.findUnique({ where: { paymentId: payment.id } });
}

export async function verifyAndFinalizePaystack(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY missing");

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secret}` } },
  );

  const body = (await res.json()) as {
    status?: boolean;
    data?: {
      status?: string;
      amount?: number;
      currency?: string;
      metadata?: { quoteId?: string; quoteToken?: string; requestReference?: string };
    };
  };

  if (!res.ok || !body.status || body.data?.status !== "success") {
    return null;
  }

  const meta = body.data.metadata;
  if (!meta?.quoteId || !meta.quoteToken || !meta.requestReference) return null;

  const payment = await prisma.payment.findFirst({
    where: { externalId: reference, provider: "PAYSTACK" },
    include: { quote: { include: { request: true, lineItems: true } } },
  });

  if (!payment) return null;
  if (payment.status === "SUCCEEDED") {
    return prisma.receipt.findUnique({ where: { paymentId: payment.id } });
  }

  const amount = body.data.amount ?? payment.amountCents;
  const receiptSummary: Prisma.InputJsonValue = {
    provider: "paystack",
    quoteToken: meta.quoteToken,
    requestReference: meta.requestReference,
    requestId: payment.quote.requestId,
    serviceSlug: payment.quote.request.serviceSlug,
    lines: payment.quote.lineItems.map((l) => ({
      description: l.description,
      amountCents: l.amountCents,
      quantity: l.quantity,
    })),
    totalCents: amount,
    currency: (body.data.currency ?? payment.currency).toLowerCase(),
    paidAt: new Date().toISOString(),
  };

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCEEDED" },
    }),
    prisma.quote.update({
      where: { id: payment.quoteId },
      data: { status: "ACCEPTED" },
    }),
    prisma.serviceRequest.update({
      where: { id: payment.quote.requestId },
      data: { status: "PAID" },
    }),
    prisma.receipt.create({
      data: {
        paymentId: payment.id,
        requestReference: meta.requestReference,
        summary: receiptSummary,
      },
    }),
  ]);

  await appendAudit({
    entityType: "Payment",
    entityId: payment.id,
    action: "payment.succeeded",
    payload: { reference, provider: "PAYSTACK" },
  });

  const email = payment.quote.request.contactEmail;
  if (email) {
    await notifyChannels({
      channels: ["email"],
      title: "Payment confirmed — SGS",
      body: `Your Paystack payment for request ${meta.requestReference} is confirmed.`,
      emailTo: email,
    });
  }

  return prisma.receipt.findUnique({ where: { paymentId: payment.id } });
}

export async function loadReceiptForStripeSession(sessionId: string) {
  const existing = await prisma.payment.findFirst({
    where: { externalId: sessionId, provider: "STRIPE", status: "SUCCEEDED" },
    include: { receipt: true },
  });
  if (existing?.receipt) return existing.receipt;

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") return null;

  await finalizeSuccessfulStripePayment({ sessionId, session });
  return prisma.payment
    .findFirst({
      where: { externalId: sessionId, provider: "STRIPE" },
      include: { receipt: true },
    })
    .then((p) => p?.receipt ?? null);
}
