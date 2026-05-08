import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import { ServiceRequestForm } from "@/components/service-request-form";
import styles from "./page.module.css";

export function DesktopSecurityShell() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="SERVICES" />
      <main className={styles.main}>
        <div className={styles.scan} aria-hidden />

        <section className={styles.hero}>
          <span className={styles.eyebrow}>Service Vertical: Security</span>
          <h1 className={styles.h1}>Security. Uncompromising Protection.</h1>
          <p className={styles.p}>
            Strategic defensive solutions designed for the global elite. From
            sovereign-level asset protection to private VIP transit, we operate at
            the intersection of precision intelligence and tactical dominance.
          </p>
          <div className={styles.heroBtns}>
            <Link href="#request" className={styles.heroPrimary}>
              Request Service
            </Link>
          </div>
          <div className={styles.heroImage}>
            <Image
              alt="SGS Security Operations"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb_kBtOd556feM3DeSta8rCF-rEUobTUPKZ7HA9b_9Z0K6Is7Qpksc0kdKWkjKqW3mxYRMgyOYvqubpixIi07QIkvVGAaITJLJcRaJNJL5iPmxrsZG7NDYXgaXmO-uGwpTJEL2XFDEHxJ7BoqLOT4fGGx-usYuXrVjp2tgJTXU6_x2nCbkKcU_h5jGSGu4VRSCRjWmktRaEgYzElIvIAyYoykpbPEoPB34ozj3bE2BM2YWAOAa65n6WonkBQ8mmruPWn5xQKinJ80"
              fill
              sizes="100vw"
              className={styles.img}
            />
            <div className={styles.imgShade} />
          </div>
        </section>

        <section className={styles.bento}>
          <div className={styles.head}>
            <div>
              <h2 className={styles.h2}>Tactical Divisions</h2>
              <p className={styles.sub}>
                Our operations are divided into specialized units, each managed by
                former special operations veterans and intelligence officers.
              </p>
            </div>
            <div className={styles.rule} aria-hidden />
            <div className={styles.cap}>Global Capability</div>
          </div>

          <div className={styles.grid}>
            <article className={styles.big}>
              <div className={styles.bigTop}>
                <MaterialIcon name="security" className={styles.bigIcon} aria-hidden />
                <span className={styles.modality}>MODALITY: ARMED/UNARMED</span>
              </div>
              <h3 className={styles.h3}>Elite Escort Services</h3>
              <p className={styles.copy}>
                High-stakes protective details for high-net-worth individuals and
                corporate delegations in high-risk environments.
              </p>
              <ul className={styles.list}>
                {[
                  "Counter-Surveillance Teams",
                  "Strategic Route Analysis",
                  "24/7 Threat Monitoring",
                ].map((t) => (
                  <li key={t}>
                    <span className={styles.dot} aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <button className={styles.btn}>VIEW PROTOCOL</button>
            </article>

            {[
              ["shield_person", "VIP Escort Detail", "Discrete personal protection that integrates seamlessly with luxury lifestyles without compromising privacy."],
              ["lock", "High-Value Logistics", "Secure transport for precious metals, confidential data, and proprietary physical assets globally."],
            ].map(([icon, title, desc]) => (
              <article key={title} className={styles.small}>
                <MaterialIcon name={icon} className={styles.smallIcon} aria-hidden />
                <h3 className={styles.h3}>{title}</h3>
                <p className={styles.copy}>{desc}</p>
                <div className={styles.forward} aria-hidden>
                  <MaterialIcon name="arrow_forward" className={styles.forwardIcon} aria-hidden />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function DesktopSecurityPage() {
  return (
    <>
      <DesktopSecurityShell />
      <ServiceRequestForm slug="security" />
    </>
  );
}

