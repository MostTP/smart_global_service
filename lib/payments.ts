import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import type { PaymentProvider } from "@prisma/client";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export function paymentProvider(): "stripe" | "paystack" {
  const v = (process.env.PAYMENT_PROVIDER ?? "stripe").toLowerCase();
  return v === "paystack" ? "paystack" : "stripe";
}

const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export async function createHostedCheckout(params: {
  quoteId: string;
  quoteToken: string;
  requestReference: string;
  amountCents: number;
  currency: string;
  provider: PaymentProvider;
  customerEmail?: string | null;
}): Promise<{ url: string; paymentId: string; externalId: string }> {
  const successUrl = `${siteUrl()}/portal/receipt?provider=stripe&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${siteUrl()}/quote/${params.quoteToken}?cancelled=1`;

  if (params.provider === "STRIPE") {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: params.customerEmail ?? undefined,
      line_items: [
        {
          price_data: {
            currency: params.currency.toLowerCase(),
            unit_amount: params.amountCents,
            product_data: {
              name: `Smart Global Service — quote ${params.requestReference}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        quoteId: params.quoteId,
        quoteToken: params.quoteToken,
        requestReference: params.requestReference,
      },
    });

    if (!session.url) throw new Error("Stripe Checkout did not return a URL");

    const payment = await prisma.payment.create({
      data: {
        quoteId: params.quoteId,
        provider: "STRIPE",
        externalId: session.id,
        status: "PENDING",
        amountCents: params.amountCents,
        currency: params.currency.toLowerCase(),
      },
    });

    return { url: session.url, paymentId: payment.id, externalId: session.id };
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not set");

  const paystackCurrency = (process.env.PAYSTACK_CURRENCY ?? "NGN").toUpperCase();
  const amount =
    paystackCurrency === "NGN"
      ? params.amountCents
      : Math.max(1, Math.round(params.amountCents));

  const initRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.customerEmail ?? "client@smartglobalservice.local",
      amount,
      currency: paystackCurrency,
      callback_url: `${siteUrl()}/portal/receipt?provider=paystack`,
      metadata: {
        quoteId: params.quoteId,
        quoteToken: params.quoteToken,
        requestReference: params.requestReference,
      },
    }),
  });

  const initJson = (await initRes.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string; reference?: string };
  };

  if (
    !initRes.ok ||
    !initJson.status ||
    !initJson.data?.authorization_url ||
    !initJson.data.reference
  ) {
    throw new Error(initJson.message ?? "Paystack initialize failed");
  }

  const payment = await prisma.payment.create({
    data: {
      quoteId: params.quoteId,
      provider: "PAYSTACK",
      externalId: initJson.data.reference,
      status: "PENDING",
      amountCents: params.amountCents,
      currency: paystackCurrency.toLowerCase(),
    },
  });

  return {
    url: initJson.data.authorization_url,
    paymentId: payment.id,
    externalId: initJson.data.reference,
  };
}
