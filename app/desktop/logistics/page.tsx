import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import { ServiceRequestForm } from "@/components/service-request-form";
import styles from "./page.module.css";

export function DesktopLogisticsShell() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="SERVICES" />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              Vertical Command : Logistics &amp; Procurement
            </span>
            <div className={styles.split}>
              <div className={styles.splitCol}>
                <h1 className={styles.h1}>
                  Logistics.
                  <br />
                  <span className={styles.primaryItalic}>Global Flow.</span>
                </h1>
                <p className={styles.p}>
                  Absolute precision in transit. From local haulage to complex
                  multi-nodal supply chains, we command the movement of assets
                  across every terrestrial border.
                </p>
              </div>
              <div className={styles.splitColBorder}>
                <h1 className={styles.h1}>
                  Procurement.
                  <br />
                  <span className={styles.secondaryItalic}>
                    Strategic Sourcing.
                  </span>
                </h1>
                <p className={styles.p}>
                  Intelligence-led acquisition. Leveraging global networks to
                  secure critical infrastructure, ensuring resilience through
                  rigorous vendor audit and lifecycle management.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.down} aria-hidden>
            <MaterialIcon name="expand_more" className={styles.downIcon} aria-hidden />
          </div>
        </section>

        <section className={styles.bento}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              <article className={styles.haulage}>
                <span className={styles.kicker}>Network Operations</span>
                <h2 className={styles.h2}>Haulage &amp; Fleet Integration</h2>
                <p className={styles.body}>
                  Our terrestrial division operates a synchronized fleet of
                  heavy-lift vehicles across local and interstate corridors.
                  Real-time telemetry ensures sub-meter tracking of critical cargo.
                </p>
                <div className={styles.imgWrap}>
                  <Image
                    alt="Haulage"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w"
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className={styles.img}
                  />
                </div>
              </article>

              <article className={styles.consulting}>
                <MaterialIcon name="insights" className={styles.bigIcon} aria-hidden />
                <h2 className={styles.h2}>Transport Consulting</h2>
                <p className={styles.body}>
                  Advisory services for supply chain optimization. We architect
                  logistics frameworks that reduce latency and maximize security
                  for sovereign and corporate entities.
                </p>
                <ul className={styles.checks}>
                  {["Route Optimization", "Regulatory Compliance"].map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                      <MaterialIcon name="done" className={styles.done} aria-hidden />
                    </li>
                  ))}
                </ul>
              </article>

              {[
                ["Global Sourcing", "Accessing Tier-1 manufacturing hubs and raw material reserves through established trade channels.", "67% Reach Efficiency", "primary"],
                ["Vendor Risk Audit", "Deep-dive due diligence and ethical scoring for third-party partners and upstream suppliers.", "Zero-Trust Protocols", "secondary"],
                ["Contract Lifecycle", "End-to-end management of legal instruments, from initial tendering to automated renewals.", "Automated Renewals", "primary"],
              ].map(([t, d, m, tone]) => (
                <article key={t} className={styles.mini}>
                  <h3 className={styles.h3}>{t}</h3>
                  <p className={styles.miniP}>{d}</p>
                  <div className={styles.meter}>
                    <div
                      className={tone === "secondary" ? styles.meterSecondary : styles.meterPrimary}
                    />
                  </div>
                  <span className={styles.meta}>{m}</span>
                </article>
              ))}
            </div>

            <div className={styles.actions}>
              <Link href="/desktop/portal/payment" className={styles.cta}>
                Request Service
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function DesktopLogisticsPage() {
  return (
    <>
      <DesktopLogisticsShell />
      <ServiceRequestForm slug="logistics" />
    </>
  );
}

