import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBY7cuyCsSfH4okNrMNn7uxt0tJ_voupMGaI-ik6LeuqdgWN2VcE1bEFKGAJas6ElS3U3CqYDA6wamORirzbCed2XNiP6PoHrubXWpM52VBKfELGk4E6pxbI47dkLdxKIXVoWXx2yGCV56L75SbgUGpklVLKLF5F00MQfpUTgqIFlA3wuxdCqYqIMn8zmuSePBzYIdYAZajmd7Hgeq5B06GD9-XboAtGByRGSeHDGGxwndaJgEEyR-qJ0IBonWrmPMFeWEciaokiY";

const VALUES = [
  {
    icon: "verified",
    title: "Verification-first",
    body:
      "Every request is validated, scoped, and confirmed before deployment.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD50eW4ZxggVN9yag8Waajln-tI4LU50HvyuTEBoMeJq-hY_pKBOmX1pLxVWloZ7xK4I3j1x6oItuYQoKexGj0eXO6ELjLMHLsh55I1rQu5wqy0iKicp8Nvj_aY-xB_Z5JbNRE1lbdBd0rkmr8_T87oxKiSozJY9l4BDDvWuHaQh-JHO8k2lym-evZWW3OxDW_jOxERAjsYNMcFKPkGt0hYbXpNvEcUDLAiwRGc8MPMN-au3G8-mkON3TnyDV2cJTFxfW6EHY2oI_E",
    imgAlt: "Command operations and vehicle staging",
  },
  {
    icon: "public",
    title: "Global coverage",
    body:
      "Multi-nodal operations across ports, terminals, and secure corridors.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDND1umrQnQ6rGUStJxAmHR0oYIZ1fAdchmJH0vEvJz-6-DVlCy1Oq7HGljTBy1ErGAOZAnJE0YuS6PgexLnMh13SEG4VQkB3WEH-BCCgoA1u5HVYPVKL1qKDKRe6LNVfjQSroSecr6iAU9SXkKQvN8knhFTorAPaVwHpm0dTQmUr2O5cneT2dT69uNSq7LmWKAL2keWD9CTvwYoSZCP3l_4Uvr9u6ebbZ9DgdclsPQGBOxyskZEjHFNTEryhD1oA9C8KCXUQ-Hl24",
    imgAlt: "Maritime vessel at sea",
  },
  {
    icon: "shield",
    title: "Discretion by design",
    body:
      "Controlled information flow with minimal surface area and clear ownership.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb_kBtOd556feM3DeSta8rCF-rEUobTUPKZ7HA9b_9Z0K6Is7Qpksc0kdKWkjKqW3mxYRMgyOYvqubpixIi07QIkvVGAaITJLJcRaJNJL5iPmxrsZG7NDYXgaXmO-uGwpTJEL2XFDEHxJ7BoqLOT4fGGx-usYuXrVjp2tgJTXU6_x2nCbkKcU_h5jGSGu4VRSCRjWmktRaEgYzElIvIAyYoykpbPEoPB34ozj3bE2BM2YWAOAa65n6WonkBQ8mmruPWn5xQKinJ80",
    imgAlt: "Secure executive mobility",
  },
] as const;

const SPOTLIGHT_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w";

export default function AboutPage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="ABOUT" />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Smart Global Service</p>
              <h1 className={styles.h1}>
                Command-grade execution.
                <br />
                Premium discretion.
              </h1>
              <p className={styles.p}>
                We coordinate high-trust operations across mobility, logistics,
                security, and procurement—structured for clarity, speed, and
                control.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.cta} href="/services">
                  Explore services
                  <MaterialIcon name="arrow_outward" aria-hidden />
                </Link>
                <Link className={styles.secondary} href="/contact">
                  Contact
                </Link>
              </div>
            </div>

            <figure className={`${styles.heroFigure} glass-panel`}>
              <div className={styles.heroMedia}>
                <Image
                  src={HERO_IMG}
                  alt="Private jet on a runway at dusk"
                  fill
                  className={styles.heroImg}
                  sizes="(max-width: 900px) 100vw, 420px"
                  priority
                />
              </div>
              <figcaption className={styles.heroCaption}>
                Precision scheduling across air, sea, and secure ground networks.
              </figcaption>
            </figure>
          </div>
        </header>

        <section className={styles.principles} aria-labelledby="principles-heading">
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Principles</p>
            <h2 id="principles-heading" className={styles.sectionTitle}>
              How we hold the standard
            </h2>
          </div>
          <div className={styles.values}>
            {VALUES.map((v) => (
              <article key={v.title} className={`${styles.valueCard} glass-panel`}>
                <div className={styles.valueMedia}>
                  <Image
                    src={v.img}
                    alt={v.imgAlt}
                    fill
                    className={styles.valueImg}
                    sizes="(max-width: 1100px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.valueBody}>
                  <div className={styles.valueIcon}>
                    <MaterialIcon name={v.icon} aria-hidden />
                  </div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueBodyText}>{v.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.spotlight} aria-labelledby="spotlight-heading">
          <div className={`${styles.spotlightVisual} glass-panel`}>
            <div className={styles.spotlightMedia}>
              <Image
                src={SPOTLIGHT_IMG}
                alt="Global logistics and cargo coordination"
                fill
                className={styles.spotlightImg}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className={styles.spotlightCopy}>
            <p className={styles.sectionEyebrow}>Operations</p>
            <h2 id="spotlight-heading" className={styles.spotlightTitle}>
              One spine across regions and modes
            </h2>
            <p className={styles.spotlightText}>
              From procurement desks to tarmac and berth, teams work off shared
              playbooks—clear approvals, measurable checkpoints, and direct lines
              to decision-makers when timelines compress.
            </p>
            <Link className={styles.spotlightLink} href="/fleet">
              View fleet registry
              <MaterialIcon name="arrow_outward" aria-hidden />
            </Link>
          </div>
        </section>

        <section className={styles.metricsBand} aria-labelledby="metrics-heading">
          <div className={styles.metricsIntro}>
            <h2 id="metrics-heading" className={styles.metricsTitle}>
              At a glance
            </h2>
            <p className={styles.metricsSub}>
              Benchmarks from live programs—numbers shift as engagements grow.
            </p>
          </div>
          <div className={styles.metrics}>
            {[
              { k: "12+", v: "years" },
              { k: "40+", v: "countries" },
              { k: "24/7", v: "operations" },
              { k: "500+", v: "clients" },
            ].map((m) => (
              <div key={m.v} className={styles.metric}>
                <span className={styles.metricK}>{m.k}</span>
                <span className={styles.metricV}>{m.v}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
