import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import { ServiceRequestForm } from "@/components/service-request-form";
import styles from "./page.module.css";

export function DesktopAviationShell() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="SERVICES" />

      <main>
        <section className={styles.hero}>
          <svg className={styles.flightPaths} viewBox="0 0 1440 800" aria-hidden>
            <path
              d="M-100 600C200 400 600 700 900 300C1100 50 1500 200 1600 100"
              stroke="#BBDEFB"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M-50 750C300 550 700 650 1000 250C1200 0 1400 150 1550 50"
              stroke="#BBDEFB"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M200 900C500 500 800 600 1100 200"
              stroke="#BBDEFB"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>

          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Global Aviation Division</span>
            <h1 className={styles.h1}>Celestial Precision. Grounded Reliability.</h1>
            <p className={styles.p}>
              Operating from our strategic hub in Lagos, SGS Aviation provides bespoke
              flight operations for the world's most demanding cargo and executive
              requirements.
            </p>
            <div className={styles.heroBtns}>
              <Link href="#request" className={styles.primary}>
                Request Service
              </Link>
              <Link href="/desktop#operations" className={styles.secondary}>
                View Operations
              </Link>
            </div>
          </div>
        </section>

        <section id="operations" className={styles.node}>
          <div className={styles.nodeInner}>
            <div className={styles.nodeCopy}>
              <span className={styles.nodeEyebrow}>Strategic Node</span>
              <h2 className={styles.h2}>
                The Lagos Terminal: Gateway to West African Airspace
              </h2>
              <p className={styles.nodeP}>
                Our primary operational base in Lagos serves as a critical nexus for
                continental logistics. Equipped with dedicated hangars and rapid-response
                maintenance crews, we ensure zero-latency deployment for both scheduled
                and ad-hoc aviation services.
              </p>
              <div className={styles.loc}>
                <MaterialIcon name="location_on" aria-hidden />
                <span>LOS | Murtala Muhammed International</span>
              </div>
            </div>

            <div className={`${styles.nodeMedia} glass-panel`}>
              <Image
                alt="Lagos Hangar Operations"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVxnFJsrehTEk2yUOsP7PORVPwtmF2fNniruWejw-MkhNwgaXhd4f3mp17OGlKANcH3soneoePTKrrG6hxXH7WwAjlRF5_5z2m8XCIZcJvTm0cxocki5KvT1eq6ovIhgaROn57dM-Z7eqCivJx3aLSP3UDL3JSmPnEzw-RDk8S90X14Ni2vIA6Y_5bmQRu8LxoPl8fn8gs2qnsHr_rw2MAiPpQDEMpgGgf5yxaSV6ImcW8AUNq1DzNesTh_fPOHOWaXoB2OKC_11Y"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={styles.nodeImg}
              />
              <div className={styles.nodeOverlay}>
                <div className={styles.kpis}>
                  <div>
                    <div className={styles.kpiValue}>24/7</div>
                    <div className={styles.kpiLabel}>Readiness</div>
                  </div>
                  <div>
                    <div className={styles.kpiValue}>4.2k</div>
                    <div className={styles.kpiLabel}>Sorties / Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function DesktopAviationPage() {
  return (
    <>
      <DesktopAviationShell />
      <ServiceRequestForm slug="aviation" />
    </>
  );
}

