"use server";

import { auth } from "@/auth";
import { appendAudit } from "@/lib/audit";
import { notifyChannels } from "@/lib/notify";
import { prisma } from "@/lib/prisma";
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
  const session = await auth();

  try {
    const row = await prisma.serviceRequest.create({
      data: {
        reference,
        serviceSlug,
        payload,
        status: "SUBMITTED",
        contactEmail: payload.contactEmail || null,
        contactName: null,
        contactPhone: payload.contactPhone || null,
        userId: session?.user?.id,
      },
    });

    await appendAudit({
      actorUserId: session?.user?.id,
      entityType: "ServiceRequest",
      entityId: row.id,
      action: "request.created",
      payload: { reference: row.reference, serviceSlug },
    });

    if (row.contactEmail) {
      await notifyChannels({
        channels: ["email"],
        title: "SGS — request received",
        body: `Thank you. Reference ${reference}. We will send a formal quotation to this address once reviewed.`,
        emailTo: row.contactEmail,
      });
    }

    if (session?.user?.id) {
      await notifyChannels({
        userId: session.user.id,
        channels: ["in_app"],
        title: "Request submitted",
        body: `${reference} (${serviceSlug})`,
        metadata: { requestId: row.id, reference },
      });
    }
  } catch (e) {
    console.error("[service-request]", e);
    return {
      status: "error",
      message: "We could not save your request. Please try again shortly.",
    };
  }

  return { status: "success", reference, slug: serviceSlug };
}
