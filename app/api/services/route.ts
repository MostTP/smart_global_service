import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.serviceCatalog.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        slug: true,
        title: true,
        subtitle: true,
        category: true,
        description: true,
        heroImageUrl: true,
        templateFormSlug: true,
        sortOrder: true,
      },
    });
    return NextResponse.json({ services: items });
  } catch {
    return NextResponse.json({ services: [], error: "catalog_unavailable" }, { status: 200 });
  }
}
