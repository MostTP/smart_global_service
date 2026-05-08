import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { appendAudit } from "@/lib/audit";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    name?: string;
  };

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const name = typeof body.name === "string" ? body.name.trim() : undefined;

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Valid email and password (8+ characters) required." },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash,
      role: "CLIENT",
    },
  });

  await appendAudit({
    actorUserId: user.id,
    entityType: "User",
    entityId: user.id,
    action: "user.registered",
  });

  return NextResponse.json({ ok: true, userId: user.id });
}
