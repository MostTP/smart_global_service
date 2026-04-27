"use client";

import { useMemo, useState } from "react";
import type { ServiceDefinition, ServiceField } from "@/lib/services";

type Props = {
  service: ServiceDefinition;
};

function inputClassName() {
  return "w-full rounded-md border border-blue-100 bg-[#fffefb] px-3 py-2 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200";
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: ServiceField;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `field-${field.key}`;
  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        name={field.key}
        required={field.required}
        placeholder={field.placeholder}
        rows={4}
        className={inputClassName()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        id={id}
        name={field.key}
        required={field.required}
        className={inputClassName()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {!field.required ? <option value="">—</option> : null}
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
  const type =
    field.type === "datetime"
      ? "datetime-local"
      : field.type === "number"
        ? "number"
        : field.type;
  return (
    <input
      id={id}
      name={field.key}
      type={type}
      required={field.required}
      placeholder={field.placeholder}
      className={inputClassName()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function RequestServiceForm({ service }: Props) {
  const initialPayload = useMemo(() => {
    const o: Record<string, string> = {};
    for (const f of service.requestForm.fields) {
      o[f.key] = "";
    }
    return o;
  }, [service]);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payload, setPayload] = useState<Record<string, string>>(initialPayload);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: service.slug,
          customerName,
          email,
          phone: phone || undefined,
          payload,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        details?: string[];
        id?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(
          data.details?.join(" ") ?? data.error ?? "Something went wrong.",
        );
        return;
      }
      setStatus("success");
      setMessage(
        "Your request was submitted. Our team will review it and send a quotation where applicable.",
      );
      setCustomerName("");
      setEmail("");
      setPhone("");
      setPayload(initialPayload);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <input
            name="customerName"
            required
            className={inputClassName()}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            required
            className={inputClassName()}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Phone <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            name="phone"
            type="tel"
            className={inputClassName()}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="border-t border-blue-100 pt-6">
        <p className="mb-4 text-sm font-semibold text-blue-950">{service.requestForm.title}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.requestForm.fields.map((field) => (
            <div
              key={field.key}
              className={field.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <label
                htmlFor={`field-${field.key}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                {field.label}
                {field.required ? <span className="text-red-600"> *</span> : null}
              </label>
              <FieldInput
                field={field}
                value={payload[field.key] ?? ""}
                onChange={(v) =>
                  setPayload((prev) => ({ ...prev, [field.key]: v }))
                }
              />
              {field.helpText ? (
                <p className="mt-1 text-xs text-slate-500">{field.helpText}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {message ? (
        <p
          className={
            status === "success" ? "text-sm font-medium text-emerald-700" : "text-sm text-red-600"
          }
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-blue-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
