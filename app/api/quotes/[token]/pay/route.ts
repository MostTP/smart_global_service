import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appendAudit } from "@/lib/audit";
import { createHostedCheckout, paymentProvider } from "@/lib/payments";
import type { PaymentProvider } from "@prisma/client";

export async function POST(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  const quote = await prisma.quote.findUnique({
    where: { publicToken: token },
    include: {
      request: true,
      payments: { where: { status: "PENDING" } },
    },
  });

  if (!quote || quote.status !== "SENT") {
    return NextResponse.json({ error: "Quote is not payable" }, { status: 400 });
  }

  if (quote.validUntil && quote.validUntil < new Date()) {
    await prisma.quote.update({
      where: { id: quote.id },
      data: { status: "EXPIRED" },
    });
    return NextResponse.json({ error: "Quote expired" }, { status: 400 });
  }

  if (quote.request.status === "CANCELLED" || quote.request.status === "PAID") {
    return NextResponse.json({ error: "Request closed" }, { status: 400 });
  }

  await prisma.payment.deleteMany({
    where: { quoteId: quote.id, status: "PENDING" },
  });

  const usePaystack = paymentProvider() === "paystack";
  const provider: PaymentProvider = usePaystack ? "PAYSTACK" : "STRIPE";

  let url: string;
  try {
    const session = await createHostedCheckout({
      quoteId: quote.id,
      quoteToken: quote.publicToken,
      requestReference: quote.request.reference,
      amountCents: quote.totalCents,
      currency: quote.currency,
      provider,
      customerEmail: quote.request.contactEmail,
    });
    url = session.url;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  await prisma.serviceRequest.update({
    where: { id: quote.requestId },
    data: { status: "AWAITING_PAYMENT" },
  });

  await appendAudit({
    entityType: "Quote",
    entityId: quote.id,
    action: "quote.checkout_started",
    payload: { provider },
  });

  return NextResponse.json({ url });
}
