"use client";

import Image from "next/image";
import { useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./sectors-of-excellence.module.css";

const SECTORS = [
  {
    title: "Private Aviation",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBY7cuyCsSfH4okNrMNn7uxt0tJ_voupMGaI-ik6LeuqdgWN2VcE1bEFKGAJas6ElS3U3CqYDA6wamORirzbCed2XNiP6PoHrubXWpM52VBKfELGk4E6pxbI47dkLdxKIXVoWXx2yGCV56L75SbgwUGpklVLKLF5F00MQfpUTgqIFlA3wuxdCqYqIMn8zmuSePBzYIdYAZajmd7Hgeq5B06GD9-XboAtGByRGSeHDGGxwndaJgEEyR-qJ0IBonWrmPMFeWEciaokiY",
    imageAlt: "Private jet on a runway at night",
    headline: "Precision Flight Management",
    body:
      "Orchestrating complex flight paths across international borders with real-time tracking and concierge flight crew management.",
  },
  {
    title: "Maritime Logistics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDND1umrQnQ6rGUStJxAmHR0oYIZ1fAdchmJH0vEvJz-6-DVlCy1Oq7HGljTBy1ErGAOZAnJE0YuS6PgexLnMh13SEG4VQkB3WEH-BCCgoA1u5HVYPVKL1qKDKRe6LNVfjQSroSecr6iAU9SXkKQvN8knhFTorAPaVwHpm0dTQmUr2O5cneT2dT69uNSq7LmWKAL2keWD9CTvwYoSZCP3l_4Uvr9u6ebbZ9DgdclsPQGBOxyskZEjHFNTEryhD1oA9C8KCXUQ-Hl24",
    imageAlt: "Maritime vessel at sea",
    headline: "Blue-Water Asset Movement",
    body:
      "Coordinating berths, coastal logistics, and secure cargo corridors with disciplined voyage planning and port-side execution.",
  },
  {
    title: "Executive Transport",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDb_kBtOd556feM3DeSta8rCF-rEUobTUPKZ7HA9b_9Z0K6Is7Qpksc0kdKWkjKqW3mxYRMgyOYvqubpixIi07QIkvVGAaITJLJcRaJNJL5iPmxrsZG7NDYXgaXmO-uGwpTJEL2XFDEHxJ7BoqLOT4fGGx-usYuXrVjp2tgJTXU6_x2nCbkKcU_h5jGSGu4VRSCRjWmktRaEgYzElIvIAyYoykpbPEoPB34ozj3bE2BM2YWAOAa65n6WonkBQ8mmruPWn5xQKinJ80",
    imageAlt: "Secure executive mobility",
    headline: "Controlled Ground Corridors",
    body:
      "Armored and discreet ground movement with route risk modeling, advance teams, and real-time itinerary adaptation.",
  },
  {
    title: "Strategic Advisory",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdrFq6-40GlDXM8-hnogaGx6tI5J3MmTIhy2m2-xYRpwttC0k2dWo81MDUl0r-NDRyuqB7HrW6CeYch7a2ZManI5gWn4nJJ9ApQCTiEGac0xqCZ8rjr1xkv592cKI2F8TImHSbeuuClllqBw8C_fm7yfvyQPSziJE4jMbvqKnxHbnsYCxV4VoYMiuBo7LOpkH8f4kUdxo-ALkaWxOKypzf5my45b6i0XfuPbxeW06r4lEPQ0ocdIkqYWa97OMOPsrErnQA4m-2iWA",
    imageAlt: "Strategic partnerships and infrastructure",
    headline: "Capital & Partnership Architecture",
    body:
      "Structuring long-horizon engagements—risk framing, stakeholder alignment, and execution roadmaps for complex initiatives.",
  },
  {
    title: "Global Freight",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVj0da7MKI8JhQtelo7ybvr04pEPBSAjT4xZsIFKm-bcFI8HBXK5kvpSCtt0wBNULpZ3simBBYwn_QEwzkoclRNfT4i_UVTzGSNZHEiovCatMYHoabwiNe4rlMwKY0mEdWaCUIajnqy2MnGWFBMMVDkYz5P92kRI2G2S73clL5GI92MvaCRB7V6HvbWuhqxifWV22eGvCSQ0aTZAvc1lNWMzSGhwbvFQUBsSH2iyBsdlweQrBmmAd8eZL6rAFDuemsJNTnQK0M38w",
    imageAlt: "Global freight and logistics hub",
    headline: "Multi-Modal Freight Command",
    body:
      "End-to-end coordination across air, sea, and land nodes—customs-aware scheduling, consolidation, and exception handling.",
  },
  {
    title: "Infrastructure Support",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTQn3ww2IrRl7lwymQHkhueWQ82O7axXKvkH3wo_0kGCjGOuZUf37O8oMuqi7Zx4MpVQtnkvV-6rAZIakvs-7a2nZr_jnmUlmNVenUBOq-VsOmjyrtlGZlyi9vZ64P6BIaquCFhaolHWfj_wj0GJvDQ431pMJTKqeT0Tzpn3BYhC-7WLfPYt0Lb3qE9ofMoqxqHljpjjSIJe2Ehf_FtejzqD4nDUZjLrzuPeW4s6mBeFRppbI8W9Y_Sjbtnc4e0PGIWHp_W0yasyY",
    imageAlt: "Infrastructure and terminal operations",
    headline: "Operational Readiness Layers",
    body:
      "On-site support for terminals, hubs, and critical paths—runbooks, vendor orchestration, and uptime-focused governance.",
  },
  {
    title: "Crisis Response",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD50eW4ZxggVN9yag8Waajln-tI4LU50HvyuTEBoMeJq-hY_pKBOmX1pLxVWloZ7xK4I3j1x6oItuYQoKexGj0eXO6ELjLMHLsh55I1rQu5wqy0iKicp8Nvj_aY-xB_Z5JbNRE1lbdBd0rkmr8_T87oxKiSozJY9l4BDDvWuHaQh-JHO8k2lym-evZWW3OxDW_jOxERAjsYNMcFKPkGt0hYbXpNvEcUDLAiwRGc8MPMN-au3G8-mkON3TnyDV2cJTFxfW6EHY2oI_E",
    imageAlt: "Command operations center atmosphere",
    headline: "Rapid Contingency Deployment",
    body:
      "When timelines collapse, we activate playbooks—communications, logistics pivots, and secure extraction paths under pressure.",
  },
] as const;

export function SectorsOfExcellence() {
  const [active, setActive] = useState(0);
  const current = SECTORS[active]!;

  return (
    <section id="services" className={styles.services}>
      <div className={styles.servicesInner}>
        <div className={styles.serviceList}>
          <div className={styles.serviceListHead}>
            <span className={styles.coreEyebrow}>Core Capabilities</span>
            <h2 className={styles.coreTitle}>Sectors of Excellence</h2>
          </div>

          <div className={styles.dividerList} role="tablist" aria-label="Sectors">
            {SECTORS.map((sector, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={sector.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="sector-panel"
                  id={`sector-tab-${idx}`}
                  className={`${styles.serviceRow} ${isActive ? styles.serviceRowActive : ""}`}
                  onClick={() => setActive(idx)}
                >
                  <div className={styles.serviceRowLeft}>
                    <span className={styles.serviceIndex}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className={styles.serviceRowTitle}>{sector.title}</h3>
                  </div>
                  <MaterialIcon name="arrow_forward" className={styles.arrow} aria-hidden />
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.preview}>
          <div
            id="sector-panel"
            role="tabpanel"
            aria-labelledby={`sector-tab-${active}`}
            className={`${styles.previewCard} glass-panel`}
          >
            <div className={styles.progress} aria-hidden>
              {SECTORS.map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.progressSeg} ${
                    idx === active ? styles.progressSegActive : ""
                  }`}
                />
              ))}
            </div>
            <Image
              key={current.image}
              alt={current.imageAlt}
              src={current.image}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={styles.previewImg}
              priority={active === 0}
            />
            <div className={styles.previewOverlay}>
              <span className={styles.focus}>
                Focus {String(active + 1).padStart(2, "0")}
              </span>
              <h4 className={styles.previewTitle}>{current.headline}</h4>
              <p className={styles.previewBody}>{current.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
