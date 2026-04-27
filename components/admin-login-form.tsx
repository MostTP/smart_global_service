"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const err = searchParams.get("error");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(
    err === "config"
      ? "Admin is not configured (set ADMIN_SECRET in .env)."
      : "",
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage(data.error ?? "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-center text-sm text-blue-700 hover:text-blue-800 hover:underline">
        ← Back to site
      </Link>
      <div className="rounded-lg border border-blue-100 bg-[#fffefb] p-8 shadow-md shadow-blue-950/5">
        <h1 className="text-center text-xl font-semibold text-blue-950">Staff login</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter the operations token configured on the server.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            required
            placeholder="Token"
            className="w-full rounded-md border border-blue-100 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          {message ? <p className="text-sm text-red-600">{message}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-700 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
