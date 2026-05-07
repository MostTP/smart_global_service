import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

const fleet = [
  {
    title: "Aviation",
    meta: "Charter • lease • cargo coordination",
    href: "/services/aviation",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVxnFJsrehTEk2yUOsP7PORVPwtmF2fNniruWejw-MkhNwgaXhd4f3mp17OGlKANcH3soneoePTKrrG6hxXH7WwAjlRF5_5z2m8XCIZcJvTm0cxocki5KvT1eq6ovIhgaROn57dM-Z7eqCivJx3aLSP3UDL3JSmPnEzw-RDk8S90X14Ni2vIA6Y_5bmQRu8LxoPl8fn8gs2qnsHr_rw2MAiPpQDEMpgGgf5yxaSV6ImcW8AUNq1DzNesTh_fPOHOWaXoB2OKC_11Y",
  },
  {
    title: "Marine",
    meta: "Cruises • fleet • shore-side logistics",
    href: "/services/marine",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDND1umrQnQ6rGUStJxAmHR0oYIZ1fAdchmJH0vEvJz-6-DVlCy1Oq7HGljTBy1ErGAOZAnJE0YuS6PgexLnMh13SEG4VQkB3WEH-BCCgoA1u5HVYPVKL1qKDKRe6LNVfjQSroSecr6iAU9SXkKQvN8knhFTorAPaVwHpm0dTQmUr2O5cneT2dT69uNSq7LmWKAL2keWD9CTvwYoSZCP3l_4Uvr9u6ebbZ9DgdclsPQGBOxyskZEjHFNTEryhD1oA9C8KCXUQ-Hl24",
  },
  {
    title: "Logistics",
    meta: "Procurement • transit • secure corridors",
    href: "/services/logistics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
  },
  {
    title: "Ground",
    meta: "Executive mobility • armored • route control",
    href: "/services/transportation",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD50eW4ZxggVN9yag8Waajln-tI4LU50HvyuTEBoMeJq-hY_pKBOmX1pLxVWloZ7xK4I3j1x6oItuYQoKexGj0eXO6ELjLMHLsh55I1rQu5wqy0iKicp8Nvj_aY-xB_Z5JbNRE1lbdBd0rkmr8_T87oxKiSozJY9l4BDDvWuHaQh-JHO8k2lym-evZWW3OxDW_jOxERAjsYNMcFKPkGt0hYbXpNvEcUDLAiwRGc8MPMN-au3G8-mkON3TnyDV2cJTFxfW6EHY2oI_E",
  },
] as const;

export default function FleetPage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="FLEET" />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Fleet registry</p>
            <h1 className={styles.h1}>
              Multi-domain assets.
              <br />
              One operational spine.
            </h1>
            <p className={styles.lede}>
              Browse how SGS stages capability across aviation, marine, logistics,
              and ground mobility—each route leads to a dedicated service surface.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primary} href="/services">
                All services
                <MaterialIcon name="arrow_outward" aria-hidden />
              </Link>
              <Link className={styles.secondary} href="/portal/payment">
                Request deployment
                <MaterialIcon name="arrow_outward" aria-hidden />
              </Link>
            </div>
          </div>

          <div className={`${styles.heroVisual} glass-panel`}>
            <div className={styles.heroImgWrap}>
              <Image
                alt=""
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY7cuyCsSfH4okNrMNn7uxt0tJ_voupMGaI-ik6LeuqdgWN2VcE1bEFKGAJas6ElS3U3CqYDA6wamORirzbCed2XNiP6PoHrubXWpM52VBKfELGk4E6pxbI47dkLdxKIXVoWXx2yGCV56L75SbgwUGpklVLKLF5F00MQfpUTgqIFlA3wuxdCqYqIMn8zmuSePBzYIdYAZajmd7Hgeq5B06GD9-XboAtGByRGSeHDGGxwndaJgEEyR-qJ0IBonWrmPMFeWEciaokiY"
                fill
                className={styles.heroImg}
                sizes="(max-width: 980px) 100vw, 560px"
                priority
              />
            </div>
            <div className={styles.heroCaption}>
              <span className={styles.captionK}>Fleet posture</span>
              <span className={styles.captionV}>Ready-state • audited • insured</span>
            </div>
          </div>
        </section>

        <section className={styles.readiness} aria-labelledby="readiness-heading">
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Readiness</p>
            <h2 id="readiness-heading" className={styles.sectionTitle}>
              What travels with every deployment
            </h2>
            <p className={styles.sectionLede}>
              Fleet units are booked as programs—not one-off rides—so crews, paperwork,
              and comms stay aligned from first call through close-out.
            </p>
          </div>
          <div className={styles.readinessGrid}>
            {[
              {
                icon: "verified_user",
                title: "Vetted assets",
                body:
                  "Aircraft, hulls, and ground units screened for insurance, maintenance logs, and SGS operating standards.",
              },
              {
                icon: "hub",
                title: "Nodal staging",
                body:
                  "Pre-positioned crews and spares at key hubs so swaps and delays are handled before they reach the client.",
              },
              {
                icon: "lock_person",
                title: "Controlled comms",
                body:
                  "Encrypted itineraries, need-to-know distribution, and audit-friendly handoffs between teams.",
              },
              {
                icon: "support_agent",
                title: "One coordinator",
                body:
                  "A single operations lead tracks status, escalations, and receipts—no chasing five different desks.",
              },
            ].map((item) => (
              <article key={item.title} className={`${styles.readinessCard} glass-panel`}>
                <div className={styles.readinessIcon} aria-hidden>
                  <MaterialIcon name={item.icon} aria-hidden />
                </div>
                <h3 className={styles.readinessTitle}>{item.title}</h3>
                <p className={styles.readinessBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.grid} aria-label="Fleet categories">
          {fleet.map((f) => (
            <Link key={f.href} href={f.href} className={`${styles.card} glass-panel`}>
              <div className={styles.cardMedia}>
                <Image
                  alt=""
                  src={f.img}
                  fill
                  className={styles.cardImg}
                  sizes="(max-width: 980px) 100vw, 33vw"
                />
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{f.title}</h2>
                <p className={styles.cardMeta}>{f.meta}</p>
                <span className={styles.cardLink}>
                  Open
                  <MaterialIcon name="chevron_right" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className={styles.sequence} aria-labelledby="sequence-heading">
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Activation</p>
            <h2 id="sequence-heading" className={styles.sectionTitle}>
              From request to wheels-up
            </h2>
          </div>
          <ol className={styles.steps}>
            {[
              {
                step: "01",
                title: "Scope & approve",
                body:
                  "Objective, route, risk profile, and billing path confirmed with sign-off from both sides.",
              },
              {
                step: "02",
                title: "Stage assets",
                body:
                  "Crews, craft, and ground envelopes briefed; contingencies and weather windows logged.",
              },
              {
                step: "03",
                title: "Execute movement",
                body:
                  "Live updates, reroutes as needed, and secure handoffs at each leg of the journey.",
              },
              {
                step: "04",
                title: "Close-out",
                body:
                  "Times, fuel, incidents (if any), and documentation packaged for finance and compliance.",
              },
            ].map((s) => (
              <li key={s.step} className={`${styles.step} glass-panel`}>
                <span className={styles.stepNum}>{s.step}</span>
                <div className={styles.stepCopy}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.ctaBand} aria-labelledby="fleet-cta-heading">
          <div className={styles.ctaInner}>
            <div className={styles.ctaCopy}>
              <h2 id="fleet-cta-heading" className={styles.ctaTitle}>
                Need a mixed-mode movement?
              </h2>
              <p className={styles.ctaText}>
                Tell us ports, pax count, security level, and timing—we&apos;ll propose a
                stacked program across air, sea, and ground.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link className={styles.primary} href="/contact">
                Talk to operations
                <MaterialIcon name="arrow_outward" aria-hidden />
              </Link>
              <Link className={styles.secondary} href="/services">
                Full service index
                <MaterialIcon name="arrow_outward" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
