import Image from "next/image";
import Link from "next/link";
import { SectorsOfExcellence } from "@/components/sectors-of-excellence";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

export default function DesktopHomePage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="HOME" />

      <main>
        <section className={`${styles.hero} ${styles.globalGrid}`}>
          <div className={styles.globe} aria-hidden>
            <svg className={styles.globeSvg} viewBox="0 0 800 800">
              <circle cx="400" cy="400" r="350" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="400" cy="400" rx="350" ry="120" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="400" cy="400" rx="120" ry="350" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50,400 Q400,100 750,400" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50,400 Q400,700 750,400" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <h1 className={styles.heroHeadline}>
                Executive Mobility.
                <br />
                Global Precision.
              </h1>
              <div className={styles.heroCopy}>
                <p className={styles.heroBody}>
                  Unrivaled logistics orchestration for those who demand absolute
                  reliability in global transit, aviation management, and strategic
                  maritime operations.
                </p>
                <div className={styles.heroButtons}>
                  <Link className={styles.heroPrimary} href="/fleet">
                    EXPLORE FLEET
                  </Link>
                  <Link className={styles.heroSecondary} href="/services">
                    NETWORK NODES
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={`${styles.heroPanel} glass-panel`}>
                <div className={styles.heroPanelStack}>
                  {[
                    {
                      icon: "rocket_launch",
                      label: "Active Deployments",
                      value: "542+",
                    },
                    {
                      icon: "hub",
                      label: "Global Transit Nodes",
                      value: "128",
                    },
                    {
                      icon: "center_focus_strong",
                      label: "Precision Rating",
                      value: "99.9%",
                    },
                  ].map((row) => (
                    <div key={row.label} className={styles.panelRow}>
                      <div className={styles.panelRowIcon} aria-hidden>
                        <MaterialIcon
                          name={row.icon}
                          className={styles.panelRowGlyph}
                          aria-hidden
                        />
                      </div>
                      <div className={styles.panelRowText}>
                        <span className={styles.panelLabel}>{row.label}</span>
                        <span className={styles.panelValue}>{row.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectorsOfExcellence />

        <section
          className={`${styles.operating} ${styles.deepField}`}
          aria-labelledby="operating-heading"
        >
          <div className={styles.operatingInner}>
            <div className={styles.operatingHead}>
              <span className={styles.operatingEyebrow}>Operating model</span>
              <h2 id="operating-heading" className={styles.operatingTitle}>
                One spine from intake to receipt
              </h2>
              <p className={styles.operatingLede}>
                Engagements run as programs—shared timelines, clear ownership, and
                documentation that finance and security teams can actually use.
              </p>
            </div>
            <div className={styles.operatingGrid}>
              {[
                {
                  icon: "account_tree",
                  title: "Program spine",
                  body:
                    "Scopes, approvals, and billing paths set upfront so every leg executes against one plan.",
                },
                {
                  icon: "sync_alt",
                  title: "Audited handoffs",
                  body:
                    "Air, sea, and ground nodes exchange manifests and risk notes—no silent gaps between teams.",
                },
                {
                  icon: "admin_panel_settings",
                  title: "Command visibility",
                  body:
                    "Live posture and exceptions in one surface; close-out packs when the movement finishes.",
                },
              ].map((item) => (
                <article key={item.title} className={`${styles.operatingCard} glass-panel`}>
                  <div className={styles.operatingIcon} aria-hidden>
                    <MaterialIcon name={item.icon} aria-hidden />
                  </div>
                  <h3 className={styles.operatingCardTitle}>{item.title}</h3>
                  <p className={styles.operatingCardBody}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.spotlight} aria-labelledby="spotlight-heading">
          <div className={styles.spotlightInner}>
            <div className={`${styles.spotlightVisual} glass-panel`}>
              <div className={styles.spotlightMedia}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w"
                  alt="Global logistics coordination and staging"
                  fill
                  className={styles.spotlightImg}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className={styles.spotlightCopy}>
              <span className={styles.spotlightEyebrow}>Field posture</span>
              <h2 id="spotlight-heading" className={styles.spotlightTitle}>
                Capacity staged before the call
              </h2>
              <p className={styles.spotlightBody}>
                Hubs hold pre-qualified assets and coordinators—so when timelines
                compress, you are choosing between ready options, not cold-starting
                vendors from zero.
              </p>
              <div className={styles.spotlightLinks}>
                <Link className={styles.spotlightPrimary} href="/fleet">
                  Fleet registry
                  <MaterialIcon name="arrow_outward" aria-hidden />
                </Link>
                <Link className={styles.spotlightSecondary} href="/about">
                  Our standards
                  <MaterialIcon name="arrow_outward" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.stats} ${styles.deepField}`}>
          <div className={styles.statsInner}>
            {[
              { icon: "public", value: "214", label: "Countries Reached" },
              { icon: "flight_takeoff", value: "15k", label: "Annual Missions" },
              { icon: "security", value: "100%", label: "Safety Record" },
              { icon: "monitoring", value: "24/7", label: "Global Support" },
            ].map((s) => (
              <div key={s.label} className={`${styles.statCard} glass-panel`}>
                <MaterialIcon name={s.icon} className={styles.statIcon} aria-hidden />
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaBg} aria-hidden />
          <div className={styles.ctaInner}>
            <span className={styles.ctaEyebrow}>Elevate Your Operations</span>
            <h2 className={styles.ctaTitle}>
              Ready to orchestrate your global movements?
            </h2>
            <Link className={styles.ctaButton} href="/portal/payment">
              CONTACT THE COMMAND CENTER
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <span className={styles.footerBrand}>SGS</span>
            <p className={styles.footerBody}>
              Smart Global Service is the definitive partner for multi-modal executive
              transit and global supply chain orchestration.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h5 className={styles.footerHead}>DIVISIONS</h5>
            <ul className={styles.footerList}>
              <li><Link href="/desktop#aviation">AVIATION DIVISION</Link></li>
              <li><Link href="/desktop#marine">MARINE LOGISTICS</Link></li>
              <li><Link href="/desktop#fleet">FLEET OPERATIONS</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5 className={styles.footerHead}>RESOURCES</h5>
            <ul className={styles.footerList}>
              <li><Link href="#">PRIVACY POLICY</Link></li>
              <li><Link href="#">TERMS OF SERVICE</Link></li>
              <li><Link href="#">SECURITY</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5 className={styles.footerHead}>CONTACT</h5>
            <ul className={styles.footerList}>
              <li><Link href="#">LAGOS</Link></li>
              <li><Link href="#">LONDON</Link></li>
              <li><Link href="#">DUBAI</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

