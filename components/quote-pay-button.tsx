"use client";

import { useState } from "react";

export function QuotePayButton({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function pay() {
    setError(null);
    setPending(true);
    try {
      const res = await fetch(`/api/quotes/${token}/pay`, {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout.");
        setPending(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error.");
      setPending(false);
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      <button
        type="button"
        onClick={pay}
        disabled={pending}
        style={{
          background: "var(--color-primary)",
          color: "var(--color-on-primary)",
          border: 0,
          padding: "16px 28px",
          fontSize: "0.8rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          cursor: pending ? "wait" : "pointer",
        }}
      >
        {pending ? "Redirecting…" : "Accept quote & pay"}
      </button>
      {error ? (
        <p style={{ color: "#f2b8b5", marginTop: 12 }} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
