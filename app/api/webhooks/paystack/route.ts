import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { verifyAndFinalizePaystack } from "@/lib/fulfillment";

export const runtime = "nodejs";

function secureHexCompare(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });
  }

  const raw = await request.text();
  const hash = createHmac("sha512", secret).update(raw).digest("hex");
  const signature = request.headers.get("x-paystack-signature") ?? "";

  if (!secureHexCompare(hash, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(raw) as { event?: string; data?: { reference?: string } };

  if (payload.event === "charge.success" && payload.data?.reference) {
    await verifyAndFinalizePaystack(payload.data.reference);
  }

  return NextResponse.json({ ok: true });
}
