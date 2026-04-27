import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyNewServiceRequest } from "@/lib/notifications";
import { getServiceBySlug } from "@/lib/services";
import { normalizePayload, validateServicePayload } from "@/lib/validate-request";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const serviceSlug = typeof b.serviceSlug === "string" ? b.serviceSlug : "";
  const customerName =
    typeof b.customerName === "string" ? b.customerName.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone =
    typeof b.phone === "string" && b.phone.trim() ? b.phone.trim() : null;
  const rawPayload =
    b.payload && typeof b.payload === "object" && !Array.isArray(b.payload)
      ? (b.payload as Record<string, unknown>)
      : null;

  if (!serviceSlug || !customerName || !email) {
    return NextResponse.json(
      { error: "serviceSlug, customerName, and email are required" },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!rawPayload) {
    return NextResponse.json({ error: "payload object is required" }, { status: 400 });
  }

  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 404 });
  }

  const errors = validateServicePayload(service, rawPayload);
  if (errors.length) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 422 });
  }

  const payload = normalizePayload(service, rawPayload);

  const created = await prisma.serviceRequest.create({
    data: {
      serviceSlug: service.slug,
      category: service.category,
      customerName,
      email,
      phone,
      payload: payload as object,
      status: "submitted",
    },
  });

  await notifyNewServiceRequest(created);

  return NextResponse.json({ id: created.id, status: created.status });
}
