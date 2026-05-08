import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const quote = await prisma.quote.findUnique({
    where: { publicToken: token },
    include: {
      lineItems: true,
      request: {
        select: {
          reference: true,
          serviceSlug: true,
          status: true,
          contactEmail: true,
        },
      },
    },
  });

  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    quote: {
      token: quote.publicToken,
      status: quote.status,
      currency: quote.currency,
      totalCents: quote.totalCents,
      validUntil: quote.validUntil,
      notes: quote.notes,
      lineItems: quote.lineItems,
      request: quote.request,
    },
  });
}
