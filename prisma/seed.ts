import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail =
    process.env.ADMIN_SEED_EMAIL ?? "admin@smartglobalservice.local";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "change-me-admin-9";

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: "SGS Admin",
      passwordHash,
      role: UserRole.ADMIN,
    },
    update: {
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const catalog: {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    heroImageUrl: string;
    templateFormSlug: string;
    sortOrder: number;
  }[] = [
    {
      slug: "aviation",
      title: "Aviation | Jet Lease & Charter",
      subtitle: "Executive air",
      category: "Aviation",
      description:
        "Charter, lease, and ramp-to-runway coordination with crew-ready timing worldwide.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBVxnFJsrehTEk2yUOsP7PORVPwtmF2fNniruWejw-MkhNwgaXhd4f3mp17OGlKANcH3soneoePTKrrG6hxXH7WwAjlRF5_5z2m8XCIZcJvTm0cxocki5KvT1eq6ovIhgaROn57dM-Z7eqCivJx3aLSP3UDL3JSmPnEzw-RDk8S90X14Ni2vIA6Y_5bmQRu8LxoPl8fn8gs2qnsHr_rw2MAiPpQDEMpgGgf5yxaSV6ImcW8AUNq1DzNesTh_fPOHOWaXoB2OKC_11Y",
      templateFormSlug: "aviation",
      sortOrder: 10,
    },
    {
      slug: "marine",
      title: "Marine | Boat Cruises & Logistics",
      subtitle: "Maritime",
      category: "Marine",
      description:
        "Blue-water moves, berths, and shore programs with disciplined voyage planning.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDND1umrQnQ6rGUStJxAmHR0oYIZ1fAdchmJH0vEvJz-6-DVlCy1Oq7HGljTBy1ErGAOZAnJE0YuS6PgexLnMh13SEG4VQkB3WEH-BCCgoA1u5HVYPVKL1qKDKRe6LNVfjQSroSecr6iAU9SXkKQvN8knhFTorAPaVwHpm0dTQmUr2O5cneT2dT69uNSq7LmWKAL2keWD9CTvwYoSZCP3l_4Uvr9u6ebbZ9DgdclsPQGBOxyskZEjHFNTEryhD1oA9C8KCXUQ-Hl24",
      templateFormSlug: "marine",
      sortOrder: 20,
    },
    {
      slug: "security",
      title: "Security | Executive Protection",
      subtitle: "Protection",
      category: "Security",
      description:
        "Discrete mobility, advance teams, and route envelopes for high-trust itineraries.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDb_kBtOd556feM3DeSta8rCF-rEUobTUPKZ7HA9b_9Z0K6Is7Qpksc0kdKWkjKqW3mxYRMgyOYvqubpixIi07QIkvVGAaITJLJcRaJNJL5iPmxrsZG7NDYXgaXmO-uGwpTJEL2XFDEHxJ7BoqLOT4fGGx-usYuXrVjp2tgJTXU6_x2nCbkKcU_h5jGSGu4VRSCRjWmktRaEgYzElIvIAyYoykpbPEoPB34ozj3bE2BM2YWAOAa65n6WonkBQ8mmruPWn5xQKinJ80",
      templateFormSlug: "security",
      sortOrder: 30,
    },
    {
      slug: "logistics",
      title: "Logistics & Procurement | Global Operations",
      subtitle: "Logistics",
      category: "Logistics",
      description:
        "Procurement, staging, and corridor control that keeps critical lines moving.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
      templateFormSlug: "logistics",
      sortOrder: 40,
    },
    {
      slug: "investment",
      title: "Investment | Infrastructure & Partnerships",
      subtitle: "Investment",
      category: "Investment",
      description:
        "Long-horizon programs pairing capital, partners, and execution roadmaps.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBdrFq6-40GlDXM8-hnogaGx6tI5J3MmTIhy2m2-xYRpwttC0k2dWo81MDUl0r-NDRyuqB7HrW6CeYch7a2ZManI5gWn4nJJ9ApQCTiEGac0xqCZ8rjr1xkv592cKI2F8TImHSbeuuClllqBw8C_fm7yfvyQPSziJE4jMbvqKnxHbnsYCxV4VoYMiuBo7LOpkH8f4kUdxo-ALkaWxOKypzf5my45b6i0XfuPbxeW06r4lEPQ0ocdIkqYWa97OMOPsrErnQA4m-2iWA",
      templateFormSlug: "investment",
      sortOrder: 50,
    },
    {
      slug: "transportation",
      title: "Transportation | Executive Mobility",
      subtitle: "Ground mobility",
      category: "Transportation",
      description:
        "Elite chauffeur and secure road movement with route intelligence.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
      templateFormSlug: "transportation",
      sortOrder: 60,
    },
    {
      slug: "procurement",
      title: "Procurement | Precision Supply",
      subtitle: "Sourcing",
      category: "Procurement",
      description:
        "Sourcing, verification, and delivery of mission-critical assets.",
      heroImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
      templateFormSlug: "procurement",
      sortOrder: 70,
    },
  ];

  for (const row of catalog) {
    await prisma.serviceCatalog.upsert({
      where: { slug: row.slug },
      update: {
        title: row.title,
        subtitle: row.subtitle,
        category: row.category,
        description: row.description,
        heroImageUrl: row.heroImageUrl,
        templateFormSlug: row.templateFormSlug,
        sortOrder: row.sortOrder,
        active: true,
      },
      create: {
        ...row,
        active: true,
      },
    });
  }

  console.log("Seeded admin:", adminEmail, "and service catalog.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
