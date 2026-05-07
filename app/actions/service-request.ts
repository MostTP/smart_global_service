"use server";

import {
  SERVICE_REQUEST_FORM_CONFIG,
  type ServiceRequestSlug,
  isServiceRequestSlug,
} from "@/lib/service-request-forms";

export type ServiceRequestState =
  | { status: "idle" }
  | { status: "success"; reference: string; slug: ServiceRequestSlug }
  | { status: "error"; message: string };

export async function submitServiceRequest(
  _prevState: ServiceRequestState,
  formData: FormData,
): Promise<ServiceRequestState> {
  const rawSlug = formData.get("serviceSlug");
  const serviceSlug =
    typeof rawSlug === "string" && isServiceRequestSlug(rawSlug) ? rawSlug : null;

  if (!serviceSlug) {
    return { status: "error", message: "Invalid or missing service." };
  }

  const definition = SERVICE_REQUEST_FORM_CONFIG[serviceSlug];
  const payload: Record<string, string> = { serviceSlug };

  for (const field of definition.fields) {
    const raw = formData.get(field.name);
    const value = typeof raw === "string" ? raw.trim() : "";

    if (field.required && !value) {
      return {
        status: "error",
        message: `Please complete: ${field.label}.`,
      };
    }

    if (field.type === "select" && field.required && value === "") {
      return {
        status: "error",
        message: `Please select: ${field.label}.`,
      };
    }

    payload[field.name] = value;
  }

  const reference = crypto.randomUUID();
  console.log(
    "[service-request]",
    JSON.stringify({ reference, slug: serviceSlug, ...payload }),
  );

  return { status: "success", reference, slug: serviceSlug };
}
