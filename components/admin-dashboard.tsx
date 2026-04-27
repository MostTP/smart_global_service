"use client";

import { useCallback, useEffect, useState } from "react";

type Row = {
  id: string;
  serviceSlug: string;
  category: string;
  customerName: string | null;
  email: string | null;
  phone: string | null;
  payload: unknown;
  status: string;
  adminNotes: string | null;
  quoteAmount: number | null;
  quoteCurrency: string | null;
  quoteMessage: string | null;
  paymentProvider: string | null;
  paymentStatus: string | null;
  paymentRef: string | null;
  createdAt: string;
};

const statuses = [
  "submitted",
  "under_review",
  "quoted",
  "approved",
  "rejected",
  "cancelled",
] as const;

export function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (withSpinner = false) => {
    if (withSpinner) setLoading(true);
    const res = await fetch("/api/admin/requests");
    if (!res.ok) {
      setError("Could not load requests.");
      setLoading(false);
      return;
    }
    const data = (await res.json()) as Row[];
    setRows(data);
    setError("");
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/admin/requests");
      if (cancelled) return;
      if (!res.ok) {
        setError("Could not load requests.");
        setLoading(false);
        return;
      }
      const data = (await res.json()) as Row[];
      setRows(data);
      setError("");
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function patchRow(
    id: string,
    body: Record<string, unknown>,
  ): Promise<boolean> {
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(j.error ?? "Update failed");
      return false;
    }
    await load(false);
    return true;
  }

  if (loading) {
    return <p className="mt-8 text-sm text-slate-500">Loading…</p>;
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => void load(true)}
          className="rounded-md border border-blue-100 bg-[#fffefb] px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-white"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-md border border-blue-100 bg-[#fffefb] px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-700"
        >
          Log out
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="overflow-x-auto rounded-lg border border-blue-100 bg-[#fffefb] shadow-md shadow-blue-950/5">
        <table className="min-w-full text-left text-xs text-slate-600">
          <thead className="border-b border-blue-100 bg-blue-50/60 text-[11px] font-semibold uppercase tracking-wide text-blue-900/70">
            <tr>
              <th className="p-3">When</th>
              <th className="p-3">Service</th>
              <th className="p-3">Client</th>
              <th className="p-3">Status</th>
              <th className="p-3">Quote</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <RequestRow key={r.id} row={r} onPatch={patchRow} />
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">No requests yet.</p>
        ) : null}
      </div>
    </div>
  );
}

function RequestRow({
  row,
  onPatch,
}: {
  row: Row;
  onPatch: (id: string, body: Record<string, unknown>) => Promise<boolean>;
}) {
  const [status, setStatus] = useState(row.status);
  const [quoteAmount, setQuoteAmount] = useState(
    row.quoteAmount != null ? String(row.quoteAmount) : "",
  );
  const [quoteCurrency, setQuoteCurrency] = useState(row.quoteCurrency ?? "NGN");
  const [quoteMessage, setQuoteMessage] = useState(row.quoteMessage ?? "");
  const [adminNotes, setAdminNotes] = useState(row.adminNotes ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const amount =
      quoteAmount.trim() === "" ? null : Math.round(Number(quoteAmount));
    const ok = await onPatch(row.id, {
      status,
      quoteCurrency: quoteCurrency || null,
      quoteMessage: quoteMessage || null,
      adminNotes: adminNotes || null,
      quoteAmount: amount !== null && Number.isFinite(amount) ? amount : null,
    });
    setSaving(false);
    if (ok && (status === "quoted" || status === "approved") && amount) {
      // optional: auto-set quoted when amount set
    }
  }

  async function stubPay() {
    setSaving(true);
    await onPatch(row.id, { initiatePayment: true });
    setSaving(false);
  }

  const inputCls =
    "w-full rounded-md border border-blue-100 bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <tr className="border-t border-blue-50 align-top text-slate-800">
      <td className="whitespace-nowrap p-3 text-slate-500">
        {new Date(row.createdAt).toLocaleString()}
      </td>
      <td className="p-3">
        <div className="font-medium text-blue-950">{row.serviceSlug}</div>
        <div className="text-[10px] uppercase text-slate-500">{row.category}</div>
      </td>
      <td className="p-3">
        <div className="text-sm">{row.customerName}</div>
        <div className="text-xs text-slate-500">{row.email}</div>
      </td>
      <td className="p-3">
        <select
          className={`${inputCls} max-w-[140px]`}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className="p-3">
        <div className="flex gap-1">
          <input
            className={`${inputCls} w-20`}
            placeholder="Amount"
            value={quoteAmount}
            onChange={(e) => setQuoteAmount(e.target.value)}
          />
          <input
            className={`${inputCls} w-14`}
            value={quoteCurrency}
            onChange={(e) => setQuoteCurrency(e.target.value)}
          />
        </div>
        <textarea
          className={`${inputCls} mt-1 max-w-[220px]`}
          rows={2}
          placeholder="Quote message"
          value={quoteMessage}
          onChange={(e) => setQuoteMessage(e.target.value)}
        />
      </td>
      <td className="p-3 text-[10px] text-slate-500">
        {row.paymentRef ? (
          <>
            <div>{row.paymentProvider}</div>
            <div>{row.paymentStatus}</div>
            <div className="break-all">{row.paymentRef}</div>
          </>
        ) : (
          "—"
        )}
      </td>
      <td className="space-y-1.5 p-3">
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="block w-full rounded-md bg-blue-700 px-2 py-1.5 text-[11px] font-medium text-white hover:bg-blue-800 disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => void stubPay()}
          className="block w-full rounded-md border border-blue-100 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-blue-50/50 disabled:opacity-50"
        >
          Stub pay
        </button>
        <details className="text-[10px] text-slate-500">
          <summary className="cursor-pointer select-none text-slate-600 hover:text-blue-950">
            Payload
          </summary>
          <pre className="mt-1 max-h-32 max-w-xs overflow-auto whitespace-pre-wrap break-all rounded border border-blue-100 bg-blue-50/40 p-2 text-[9px] text-slate-700">
            {JSON.stringify(row.payload, null, 2)}
          </pre>
        </details>
        <textarea
          className={`${inputCls} mt-1 max-w-[200px]`}
          rows={2}
          placeholder="Internal notes"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
        />
      </td>
    </tr>
  );
}
