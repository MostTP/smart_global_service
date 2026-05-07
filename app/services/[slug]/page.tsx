import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesktopAviationShell } from "@/app/desktop/aviation/page";
import { DesktopInvestmentShell } from "@/app/desktop/investment/page";
import { DesktopLogisticsShell } from "@/app/desktop/logistics/page";
import DesktopMarinePage from "@/app/desktop/marine/page";
import { DesktopSecurityShell } from "@/app/desktop/security/page";
import { MaterialIcon } from "@/components/material-icon";
import { ServiceRequestForm } from "@/components/service-request-form";
import styles from "./page.module.css";

const SERVICE = {
  marine: {
    eyebrow: "Marine Logistics & Leisure",
    title: ["Marine.", "Absolute Depth."],
    body:
      "Navigating the complexities of global waters with cinematic precision and technical excellence.",
    heroBg: "depth",
    cards: [
      {
        tier: "Tier I",
        name: "Bespoke Yachting",
        desc: "Personalized high-sea experiences for private stakeholders and executive retreats.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF2jd59vtPUFdzZqllc-ajUHSkNVF-mBb1vtQGQ0qMjjbWAyY2p2XdeqkGWsXR89uXstcXsFmh0ZDEBMsJVs8AWtvIHzO8xXeCq0h-8sIUHzJYhEM3zJyGzTUZ10SmPLtzYLisDl9kXMwXJ-b_Kgw4EzSeMKg5dFEyU7PveQ1qw_2gWQlPyS-gHXpIYvbJNMevFt1sX-rGFfMzONvzcQFSNlKy8KYRAfSe0zbvJn4dF3wMxUzPlOKRSEL3eFJjU1oxACFn2ZhpBzU",
      },
      {
        tier: "Tier II",
        name: "Fleet Logistics",
        desc: "Reliable commercial maritime transport and tactical cargo movement across global nodes.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkYlwwWunzkD55Rxk0AmHgqIjWQDFGeAmp4MVFcC-dI9m9uKsf8EmlCW8_TCl-OQc0-zxB6aVe8zA73koiJq-4RUdZF7KxsBzNlPdd0Xreuwk0Na0du-DTgTKuhWH5xNRynu-rsMBoGL7GZzmmWAmagmAN6WRFWf66NEbPxXoco29gk65i3TTyAd7y17n6J-cuDHv2UVeGNpLFg2QX-3_0ptbceCuxVMNZKTlAScNE-wrsiocpiMVCTa31o7U6WSrGGRjZzb6EQ2E",
      },
    ],
    categories: [
      { icon: "celebration", label: "Leisure Packages" },
      { icon: "event", label: "Corporate Events" },
      { icon: "transfer_within_a_station", label: "VIP Transport" },
    ],
  },
  aviation: {
    eyebrow: "Aviation | Jet Lease & Charter",
    title: ["Aviation.", "Executive Air."],
    body:
      "Discrete jet chartering and fleet access—structured for executive movement and mission-critical timelines.",
    heroBg: "flight",
    cards: [],
    categories: [
      { icon: "flight", label: "Jet Charter" },
      { icon: "badge", label: "Crewed Lease" },
      { icon: "package_2", label: "Cargo & Handling" },
    ],
  },
  logistics: {
    eyebrow: "Logistics & Procurement | Global Operations",
    title: ["Logistics.", "Global Nodes."],
    body:
      "Coordinating global procurement and movement across ports, terminals, and secure corridors.",
    heroBg: "grid",
    cards: [],
    categories: [
      { icon: "local_shipping", label: "Freight & Transit" },
      { icon: "inventory_2", label: "Procurement Cycles" },
      { icon: "hub", label: "Network Operations" },
    ],
  },
  security: {
    eyebrow: "Security | Executive Protection",
    title: ["Security.", "Executive Cover."],
    body:
      "Executive protection and secure infrastructure—designed for controlled movement and trusted outcomes.",
    heroBg: "grid",
    cards: [],
    categories: [
      { icon: "shield", label: "Executive Protection" },
      { icon: "radar", label: "Monitoring" },
      { icon: "vpn_lock", label: "Secure Transport" },
    ],
  },
  investment: {
    eyebrow: "Investment | Infrastructure & Partnerships",
    title: ["Investment.", "Strategic Capital."],
    body:
      "Infrastructure partnerships and strategic investment flows—built on long-term, high-trust execution.",
    heroBg: "grid",
    cards: [],
    categories: [
      { icon: "payments", label: "Capital Flows" },
      { icon: "account_balance", label: "Partnerships" },
      { icon: "assured_workload", label: "Infrastructure" },
    ],
  },
  transportation: {
    eyebrow: "Transportation",
    title: ["Transportation.", "Executive Mobility."],
    body:
      "Elite chauffeur services and armored transport for high-net-worth individuals and corporate executives.",
    heroBg: "grid",
    cards: [],
    categories: [
      { icon: "directions_car", label: "Chauffeur" },
      { icon: "local_police", label: "Armored" },
      { icon: "route", label: "Route Control" },
    ],
  },
  procurement: {
    eyebrow: "Procurement",
    title: ["Procurement.", "Precision Supply."],
    body:
      "Sourcing, verification, and delivery of mission-critical assets—executed with clarity and control.",
    heroBg: "grid",
    cards: [],
    categories: [
      { icon: "shopping_cart", label: "Sourcing" },
      { icon: "verified", label: "Verification" },
      { icon: "warehouse", label: "Fulfillment" },
    ],
  },
} as const;

type Slug = keyof typeof SERVICE;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const key = slug as Slug;
  const data = SERVICE[key];
  if (!data) return notFound();

  if (slug === "marine") return <DesktopMarinePage />;
  if (slug === "aviation") {
    return (
      <>
        <DesktopAviationShell />
        <ServiceRequestForm slug="aviation" />
      </>
    );
  }
  if (slug === "logistics") {
    return (
      <>
        <DesktopLogisticsShell />
        <ServiceRequestForm slug="logistics" />
      </>
    );
  }
  if (slug === "security") {
    return (
      <>
        <DesktopSecurityShell />
        <ServiceRequestForm slug="security" />
      </>
    );
  }
  if (slug === "investment") {
    return (
      <>
        <DesktopInvestmentShell />
        <ServiceRequestForm slug="investment" />
      </>
    );
  }

  return (
    <main className={styles.main}>
        <section
          className={`${styles.hero} ${
            data.heroBg === "depth" ? styles.depthBg : styles.gridBg
          }`}
        >
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <h1 className={styles.title}>
              {data.title[0]}
              <br />
              {data.title[1]}
            </h1>
            <p className={styles.body}>{data.body}</p>
            <Link className={styles.cta} href="#request">
              Request Service
            </Link>
          </div>
        </section>

        {data.cards.length ? (
          <section className={styles.gallery}>
            <div className={styles.sectionHead}>
              <span className={styles.subEyebrow}>Sub-Services</span>
              <h2 className={styles.sectionTitle}>
                {key === "marine" ? "Boat Cruises" : "Service Tiers"}
              </h2>
            </div>

            <div className={styles.cardStack}>
              {data.cards.map((c) => (
                <div key={c.name} className={`${styles.imageCard} glass-panel`}>
                  <div className={styles.imageWrap}>
                    <Image
                      alt={c.name}
                      src={c.img}
                      fill
                      sizes="100vw"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.tier}>{c.tier}</span>
                    <h3 className={styles.cardTitle}>{c.name}</h3>
                    <p className={styles.cardDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.categories}>
          <div className={styles.sectionHead}>
            <span className={styles.subEyebrow}>Categorization</span>
            <h2 className={styles.sectionTitle}>
              {key === "marine" ? "Marine Occasions" : "Capabilities"}
            </h2>
          </div>

          <div className={styles.list}>
            {data.categories.map((c) => (
              <div key={c.label} className={styles.row}>
                <div className={styles.rowLeft}>
                  <MaterialIcon
                    name={c.icon}
                    className={styles.rowIcon}
                    aria-hidden
                  />
                  <span className={styles.rowLabel}>{c.label}</span>
                </div>
                <MaterialIcon
                  name="arrow_forward_ios"
                  className={styles.rowArrow}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </section>

        <ServiceRequestForm slug={slug as "transportation" | "procurement"} />
    </main>
  );
}

