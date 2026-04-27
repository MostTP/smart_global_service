import type { ServiceDefinition } from "@/lib/services";

export function validateServicePayload(
  service: ServiceDefinition,
  payload: Record<string, unknown>,
): string[] {
  const errors: string[] = [];
  for (const field of service.requestForm.fields) {
    const raw = payload[field.key];
    const empty =
      raw === undefined ||
      raw === null ||
      (typeof raw === "string" && raw.trim() === "");

    if (field.required && empty) {
      errors.push(`${field.label} is required`);
      continue;
    }

    if (field.type === "number" && !empty) {
      const n = Number(raw);
      if (!Number.isFinite(n)) {
        errors.push(`${field.label} must be a valid number`);
      }
    }
  }
  return errors;
}

export function normalizePayload(
  service: ServiceDefinition,
  raw: Record<string, unknown>,
): Record<string, string | number | null> {
  const out: Record<string, string | number | null> = {};
  for (const field of service.requestForm.fields) {
    const val = raw[field.key];
    if (val === undefined || val === null || val === "") {
      out[field.key] = null;
      continue;
    }
    if (field.type === "number") {
      const n = Number(val);
      out[field.key] = Number.isFinite(n) ? n : null;
    } else {
      out[field.key] = String(val).trim();
    }
  }
  return out;
}
