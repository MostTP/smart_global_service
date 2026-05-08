"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/portal/portal.module.css";

export default function AdminQuoteForm({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [desc, setDesc] = useState("Quoted services (detail in CRM)");
  const [amountUsd, setAmountUsd] = useState("1000");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const dollars = Number.parseFloat(amountUsd);
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setError("Enter a positive amount (USD).");
      return;
    }
    const amountCents = Math.round(dollars * 100);
    setPending(true);
    const res = await fetch("/api/admin/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        requestId,
        notes: notes || undefined,
        lineItems: [{ description: desc, amountCents, quantity: 1 }],
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      quote?: { url?: string };
    };
    setPending(false);
    if (!res.ok) {
      setError(data.error ?? "Failed to create quote.");
      return;
    }
    if (data.quote?.url) {
      router.push(`/admin?sent=${encodeURIComponent(data.quote.url)}`);
    } else {
      router.push("/admin");
    }
    router.refresh();
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 48 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>New quotation</h1>
      <p style={{ color: "var(--color-on-surface-variant)", marginBottom: 24 }}>
        Request id <code>{requestId}</code>
      </p>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Line description
          <input
            className={styles.input}
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Amount (USD)
          <input
            className={styles.input}
            type="number"
            step="0.01"
            min="0.01"
            value={amountUsd}
            onChange={(ev) => setAmountUsd(ev.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Internal notes (optional)
          <textarea
            className={styles.input}
            rows={3}
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
          />
        </label>
        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send quote to client"}
        </button>
      </form>
      <p style={{ marginTop: 24 }}>
        <Link href="/admin" style={{ color: "var(--color-primary)" }}>
          Back to admin
        </Link>
      </p>
    </div>
  );
}
