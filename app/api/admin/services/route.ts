import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { appendAudit } from "@/lib/audit";

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    slug?: string;
    title?: string;
    subtitle?: string;
    category?: string;
    description?: string;
    heroImageUrl?: string | null;
    templateFormSlug?: string;
    sortOrder?: number;
    active?: boolean;
  };

  if (!body.slug || !body.title || !body.templateFormSlug) {
    return NextResponse.json(
      { error: "slug, title, and templateFormSlug are required" },
      { status: 400 },
    );
  }

  const row = await prisma.serviceCatalog.upsert({
    where: { slug: body.slug },
    create: {
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      description: body.description,
      heroImageUrl: body.heroImageUrl ?? undefined,
      templateFormSlug: body.templateFormSlug,
      sortOrder: body.sortOrder ?? 0,
      active: body.active ?? true,
    },
    update: {
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      description: body.description,
      heroImageUrl: body.heroImageUrl ?? undefined,
      templateFormSlug: body.templateFormSlug,
      sortOrder: body.sortOrder ?? 0,
      active: body.active ?? true,
    },
  });

  await appendAudit({
    actorUserId: admin.kind === "session" ? admin.userId : undefined,
    entityType: "ServiceCatalog",
    entityId: row.slug,
    action: "service_catalog.upsert",
    payload: { slug: row.slug },
  });

  return NextResponse.json({ service: row });
}
