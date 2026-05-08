import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type ServiceCardLink = {
  href: string;
  label: string;
  description: string;
  img: string;
};

/** Fields read from `ServiceCatalog` rows (avoids fragile re-exports from @prisma/client). */
type CatalogCardRow = {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  heroImageUrl: string | null;
};

const staticLinks: ServiceCardLink[] = [
  {
    href: "/services/aviation",
    label: "Aviation | Jet Lease & Charter",
    description:
      "Charter, lease, and ramp-to-runway coordination with crew-ready timing worldwide.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVxnFJsrehTEk2yUOsP7PORVPwtmF2fNniruWejw-MkhNwgaXhd4f3mp17OGlKANcH3soneoePTKrrG6hxXH7WwAjlRF5_5z2m8XCIZcJvTm0cxocki5KvT1eq6ovIhgaROn57dM-Z7eqCivJx3aLSP3UDL3JSmPnEzw-RDk8S90X14Ni2vIA6Y_5bmQRu8LxoPl8fn8gs2qnsHr_rw2MAiPpQDEMpgGgf5yxaSV6ImcW8AUNq1DzNesTh_fPOHOWaXoB2OKC_11Y",
  },
  {
    href: "/services/marine",
    label: "Marine | Boat Cruises & Logistics",
    description:
      "Blue-water moves, berths, and shore programs with disciplined voyage planning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDND1umrQnQ6rGUStJxAmHR0oYIZ1fAdchmJH0vEvJz-6-DVlCy1Oq7HGljTBy1ErGAOZAnJE0YuS6PgexLnMh13SEG4VQkB3WEH-BCCgoA1u5HVYPVKL1qKDKRe6LNVfjQSroSecr6iAU9SXkKQvN8knhFTorAPaVwHpm0dTQmUr2O5cneT2dT69uNSq7LmWKAL2keWD9CTvwYoSZCP3l_4Uvr9u6ebbZ9DgdclsPQGBOxyskZEjHFNTEryhD1oA9C8KCXUQ-Hl24",
  },
  {
    href: "/services/security",
    label: "Security | Executive Protection",
    description:
      "Discrete mobility, advance teams, and route envelopes for high-trust itineraries.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb_kBtOd556feM3DeSta8rCF-rEUobTUPKZ7HA9b_9Z0K6Is7Qpksc0kdKWkjKqW3mxYRMgyOYvqubpixIi07QIkvVGAaITJLJcRaJNJL5iPmxrsZG7NDYXgaXmO-uGwpTJEL2XFDEHxJ7BoqLOT4fGGx-usYuXrVjp2tgJTXU6_x2nCbkKcU_h5jGSGu4VRSCRjWmktRaEgYzElIvIAyYoykpbPEoPB34ozj3bE2BM2YWAOAa65n6WonkBQ8mmruPWn5xQKinJ80",
  },
  {
    href: "/services/logistics",
    label: "Logistics & Procurement | Global Operations",
    description:
      "Procurement, staging, and corridor control that keeps critical lines moving.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
  },
  {
    href: "/services/investment",
    label: "Investment | Infrastructure & Partnerships",
    description:
      "Long-horizon programs pairing capital, partners, and execution roadmaps.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdrFq6-40GlDXM8-hnogaGx6tI5J3MmTIhy2m2-xYRpwttC0k2dWo81MDUl0r-NDRyuqB7HrW6CeYch7a2ZManI5gWn4nJJ9ApQCTiEGac0xqCZ8rjr1xkv592cKI2F8TImHSbeuuClllqBw8C_fm7yfvyQPSziJE4jMbvqKnxHbnsYCxV4VoYMiuBo7LOpkH8f4kUdxo-ALkaWxOKypzf5my45b6i0XfuPbxeW06r4lEPQ0ocdIkqYWa97OMOPsrErnQA4m-2iWA",
  },
  {
    href: "/services/transportation",
    label: "Transportation | Executive Mobility",
    description: "Chauffeur programs, armored movement, and discrete road corridors.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
  },
  {
    href: "/services/procurement",
    label: "Procurement | Precision Supply",
    description: "Sourcing, verification, and controlled delivery for critical assets.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
  },
];

async function getLinks(): Promise<ServiceCardLink[]> {
  try {
    const rows = await prisma.serviceCatalog.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (!rows.length) return staticLinks;
    return (rows as CatalogCardRow[]).map((c) => ({
      href: `/services/${c.slug}`,
      label: c.title,
      description: c.description ?? c.subtitle ?? "",
      img:
        c.heroImageUrl ??
        staticLinks.find((s) => s.href.endsWith(c.slug))?.img ??
        staticLinks[0].img,
    }));
  } catch {
    return staticLinks;
  }
}

export default async function DesktopServicesIndex() {
  const links = await getLinks();

  return (
    <div className={styles.shell}>
      <DesktopTopNav active="SERVICES" />
      <main className={styles.main}>
        <div className={styles.grid}>
          {links.map((l: ServiceCardLink) => (
            <Link key={l.href} href={l.href} className={`${styles.card} glass-panel`}>
              <div className={styles.cardMedia} aria-hidden>
                <Image
                  alt=""
                  src={l.img}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>{l.label}</span>
                <p className={styles.cardDesc}>{l.description}</p>
                <span className={styles.cardMeta}>
                  Explore
                  <MaterialIcon name="arrow_outward" className={styles.cardMetaIcon} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
