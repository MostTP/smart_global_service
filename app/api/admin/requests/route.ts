import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { RequestStatus } from "@/lib/generated/prisma/enums";

export async function GET(req: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status");
  const statusFilter =
    statusParam &&
    (Object.values(RequestStatus) as string[]).includes(statusParam)
      ? (statusParam as (typeof RequestStatus)[keyof typeof RequestStatus])
      : undefined;

  const rows = await prisma.serviceRequest.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json(rows);
}
