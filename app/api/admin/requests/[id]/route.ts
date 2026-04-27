import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { RequestStatus } from "@/lib/generated/prisma/enums";
import { notifyRequestStatusChange } from "@/lib/notifications";
import { createMockPaymentIntent } from "@/lib/payments";

const allowedStatuses = new Set<string>(Object.values(RequestStatus));

type PatchBody = {
  status?: string;
  adminNotes?: string | null;
  quoteAmount?: number | null;
  quoteCurrency?: string | null;
  quoteMessage?: string | null;
  initiatePayment?: boolean;
};

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  let body: PatchBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.status !== undefined && !allowedStatuses.has(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const data: {
    status?: (typeof RequestStatus)[keyof typeof RequestStatus];
    adminNotes?: string | null;
    quoteAmount?: number | null;
    quoteCurrency?: string | null;
    quoteMessage?: string | null;
    paymentProvider?: string | null;
    paymentStatus?: string | null;
    paymentRef?: string | null;
  } = {};

  if (body.status !== undefined) {
    data.status = body.status as (typeof RequestStatus)[keyof typeof RequestStatus];
  }
  if (body.adminNotes !== undefined) {
    data.adminNotes = body.adminNotes;
  }
  if (body.quoteAmount !== undefined) {
    data.quoteAmount = body.quoteAmount;
  }
  if (body.quoteCurrency !== undefined) {
    data.quoteCurrency = body.quoteCurrency;
  }
  if (body.quoteMessage !== undefined) {
    data.quoteMessage = body.quoteMessage;
  }

  let paymentIntent = null;
  if (body.initiatePayment) {
    const quoteAmount =
      data.quoteAmount !== undefined ? data.quoteAmount : existing.quoteAmount;
    const quoteCurrency =
      data.quoteCurrency !== undefined ? data.quoteCurrency : existing.quoteCurrency;
    paymentIntent = createMockPaymentIntent({
      id: existing.id,
      quoteAmount,
      quoteCurrency,
    });
    data.paymentProvider = paymentIntent.provider;
    data.paymentStatus = paymentIntent.status;
    data.paymentRef = paymentIntent.reference;
  }

  const updated = await prisma.serviceRequest.update({
    where: { id },
    data,
  });

  if (body.status && body.status !== existing.status) {
    await notifyRequestStatusChange(updated, existing.status);
  }

  return NextResponse.json({ request: updated, paymentIntent });
}
