import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { appendAudit } from "@/lib/audit";
import { notifyChannels } from "@/lib/notify";

function generatePublicToken() {
  return crypto.randomUUID();
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    requestId?: string;
    currency?: string;
    notes?: string;
    validUntil?: string | null;
    lineItems?: { description: string; amountCents: number; quantity?: number }[];
  };

  if (!body.requestId || !body.lineItems?.length) {
    return NextResponse.json(
      { error: "requestId and lineItems[] are required" },
      { status: 400 },
    );
  }

  const currency = (body.currency ?? "usd").toLowerCase();
  const totalCents = body.lineItems.reduce(
    (s, l) => s + l.amountCents * (l.quantity ?? 1),
    0,
  );

  if (totalCents <= 0) {
    return NextResponse.json({ error: "Total must be greater than zero" }, { status: 400 });
  }

  const svcReq = await prisma.serviceRequest.findUnique({
    where: { id: body.requestId },
  });
  if (!svcReq) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  const publicToken = generatePublicToken();
  const validUntil = body.validUntil ? new Date(body.validUntil) : null;

  const quote = await prisma.$transaction(async (tx) => {
    await tx.quote.updateMany({
      where: { requestId: svcReq.id, status: { in: ["DRAFT", "SENT"] } },
      data: { status: "SUPERSEDED" },
    });

    const q = await tx.quote.create({
      data: {
        publicToken,
        requestId: svcReq.id,
        status: "SENT",
        currency,
        totalCents,
        notes: body.notes ?? undefined,
        validUntil: validUntil && !Number.isNaN(validUntil.getTime()) ? validUntil : undefined,
        lineItems: {
          create: body.lineItems!.map((l) => ({
            description: l.description,
            amountCents: l.amountCents,
            quantity: l.quantity ?? 1,
          })),
        },
      },
      include: { lineItems: true, request: true },
    });

    await tx.serviceRequest.update({
      where: { id: svcReq.id },
      data: { status: "QUOTED" },
    });

    return q;
  });

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const quoteUrl = `${base}/quote/${quote.publicToken}`;

  await appendAudit({
    actorUserId: admin.kind === "session" ? admin.userId : undefined,
    entityType: "Quote",
    entityId: quote.id,
    action: "quote.sent",
    payload: { requestId: svcReq.id, totalCents },
  });

  await appendAudit({
    actorUserId: admin.kind === "session" ? admin.userId : undefined,
    entityType: "ServiceRequest",
    entityId: svcReq.id,
    action: "request.quoted",
    payload: { quoteId: quote.id },
  });

  const email = svcReq.contactEmail;
  if (email) {
    await notifyChannels({
      channels: ["email"],
      title: "Your SGS quotation is ready",
      body: `Reference ${svcReq.reference}. Review and pay: ${quoteUrl}`,
      emailTo: email,
    });
  }

  if (svcReq.userId) {
    await notifyChannels({
      userId: svcReq.userId,
      channels: ["in_app"],
      title: "Quotation ready",
      body: `Request ${svcReq.reference} — open ${quoteUrl}`,
      metadata: { quoteId: quote.id, quoteToken: quote.publicToken },
    });
  }

  return NextResponse.json({
    quote: {
      id: quote.id,
      publicToken: quote.publicToken,
      totalCents: quote.totalCents,
      currency: quote.currency,
      url: quoteUrl,
    },
  });
}
