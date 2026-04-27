/**
 * Hook for email/SMS/push — replace with Resend, Twilio, etc.
 */
export async function notifyNewServiceRequest(request: {
  id: string;
  serviceSlug: string;
  email: string | null;
}): Promise<void> {
  if (process.env.NOTIFICATION_WEBHOOK_URL) {
    try {
      await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "service_request.created",
          id: request.id,
          serviceSlug: request.serviceSlug,
          email: request.email,
        }),
      });
    } catch (e) {
      console.error("[notifications] webhook failed", e);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[notifications] new request", request.id, request.serviceSlug, request.email);
  }
}

export async function notifyRequestStatusChange(
  request: { id: string; status: string; email: string | null },
  previousStatus: string,
): Promise<void> {
  if (process.env.NOTIFICATION_WEBHOOK_URL) {
    try {
      await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "service_request.status",
          id: request.id,
          from: previousStatus,
          to: request.status,
          email: request.email,
        }),
      });
    } catch (e) {
      console.error("[notifications] webhook failed", e);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[notifications] status", request.id, previousStatus, "→", request.status);
  }
}
