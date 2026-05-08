import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function appendAudit(params: {
  actorUserId?: string | null;
  entityType: string;
  entityId: string;
  action: string;
  payload?: Prisma.InputJsonValue;
}) {
  await prisma.auditLog.create({
    data: {
      actorUserId: params.actorUserId ?? undefined,
      entityType: params.entityType,
      entityId: params.entityId,
      action: params.action,
      payload: params.payload ?? undefined,
    },
  });
}
