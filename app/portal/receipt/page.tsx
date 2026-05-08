import Link from "next/link";
import { loadReceiptForStripeSession, verifyAndFinalizePaystack } from "@/lib/fulfillment";
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

export default async function ReceiptPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
    reference?: string;
    trxref?: string;
  }>;
}) {
  const sp = await searchParams;
  const sessionId = sp.session_id;
  const reference = sp.reference ?? sp.trxref;

  let receipt = null;

  if (sessionId) {
    try {
      receipt = await loadReceiptForStripeSession(sessionId);
    } catch {
      receipt = await prisma.receipt.findFirst({
        where: { payment: { externalId: sessionId, provider: "STRIPE" } },
      });
    }
  }

  if (!receipt && reference) {
    receipt = await verifyAndFinalizePaystack(reference);
  }

  if (!receipt) {
    return (
      <div style={{ padding: 48, maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>Receipt</h1>
        <p style={{ color: "var(--color-on-surface-variant)" }}>
          We could not verify a completed payment yet. If you just paid, wait a moment and refresh,
          or open the link from your confirmation email.
        </p>
        <p>
          <Link href="/services" style={{ color: "var(--color-primary)" }}>
            Back to services
          </Link>
        </p>
      </div>
    );
  }

  const summary = receipt.summary as {
    totalCents?: number;
    currency?: string;
    lines?: { description: string; amountCents: number; quantity: number }[];
    requestReference?: string;
    paidAt?: string;
  };

  const total = summary.totalCents ?? 0;
  const currency = summary.currency ?? "usd";

  return (
    <div style={{ padding: 48, maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>Payment receipt</h1>
      <p style={{ color: "var(--color-on-surface-variant)" }}>
        Request reference <strong>{receipt.requestReference}</strong>
        {summary.paidAt ? ` · ${summary.paidAt}` : null}
      </p>

      <div className="glass-panel" style={{ padding: 24, marginTop: 24 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {(summary.lines ?? []).map((line, i) => (
            <li
              key={i}
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
              <span>{formatMoney(line.amountCents * line.quantity, currency)}</span>
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
          <span>{formatMoney(total, currency)}</span>
        </div>
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/portal/dashboard" style={{ color: "var(--color-primary)" }}>
          Portal dashboard
        </Link>{" "}
        ·{" "}
        <Link href="/services" style={{ color: "var(--color-primary)" }}>
          Services
        </Link>
      </p>
    </div>
  );
}
