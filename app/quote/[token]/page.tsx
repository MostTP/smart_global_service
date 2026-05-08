import Link from "next/link";
import { notFound } from "next/navigation";
import { QuotePayButton } from "@/components/quote-pay-button";
import { prisma } from "@/lib/prisma";

function formatMoney(cents: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const quote = await prisma.quote.findUnique({
    where: { publicToken: token },
    include: {
      lineItems: true,
      request: { select: { reference: true, status: true, serviceSlug: true } },
    },
  });

  if (!quote) notFound();

  const payable = quote.status === "SENT" && quote.request.status !== "PAID";
  const expired = quote.validUntil ? quote.validUntil < new Date() : false;

  return (
    <div style={{ padding: 48, maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem" }}>
        Quotation
      </h1>
      <p style={{ color: "var(--color-on-surface-variant)" }}>
        Request {quote.request.reference} · {quote.request.serviceSlug}
      </p>

      {quote.notes ? (
        <p className="glass-panel" style={{ padding: 16, marginTop: 20 }}>
          {quote.notes}
        </p>
      ) : null}

      <div className="glass-panel" style={{ padding: 24, marginTop: 24 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {quote.lineItems.map((line) => (
            <li
              key={line.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                padding: "12px 0",
                borderBottom: "1px solid rgba(141,144,157,0.25)",
              }}
            >
              <span>
                {line.description}{" "}
                <span style={{ color: "var(--color-on-surface-variant)" }}>
                  ×{line.quantity}
                </span>
              </span>
              <span>
                {formatMoney(line.amountCents * line.quantity, quote.currency)}
              </span>
            </li>
          ))}
        </ul>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          <span>Total</span>
          <span>{formatMoney(quote.totalCents, quote.currency)}</span>
        </div>
      </div>

      {expired ? (
        <p style={{ color: "#f2b8b5", marginTop: 24 }}>This quotation has expired.</p>
      ) : null}

      {!payable ? (
        <p style={{ marginTop: 24, color: "var(--color-on-surface-variant)" }}>
          {quote.request.status === "PAID"
            ? "This request is already paid."
            : "This quote is not available for payment."}
        </p>
      ) : expired ? null : (
        <QuotePayButton token={token} />
      )}

      <p style={{ marginTop: 32 }}>
        <Link href="/services" style={{ color: "var(--color-primary)" }}>
          Services
        </Link>
      </p>
    </div>
  );
}
