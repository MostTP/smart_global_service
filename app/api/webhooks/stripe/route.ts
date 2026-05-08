import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { finalizeSuccessfulStripePayment } from "@/lib/fulfillment";
import { getStripe } from "@/lib/payments";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const raw = await request.text();
  const stripe = getStripe();
  const sig = (await headers()).get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !sig) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: ReturnType<typeof stripe.webhooks.constructEvent>;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    console.warn("[stripe webhook] signature", e);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid" && session.id) {
      await finalizeSuccessfulStripePayment({ sessionId: session.id, session });
    }
  }

  return NextResponse.json({ received: true });
}
