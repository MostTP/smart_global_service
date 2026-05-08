import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { ServiceRequestForm } from "@/components/service-request-form";
import styles from "./page.module.css";

export function DesktopInvestmentShell() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="SERVICES" />

      <main className={styles.field}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Investment Vertical — 2024</p>
            <h1 className={styles.h1}>
              Investment.
              <br />
              Future Architecture.
            </h1>
            <div className={styles.rule} />
            <p className={styles.p}>
              Smart Global Service orchestrates high-capital deployments into the
              world's most critical infrastructure nodes. From automated logistics
              hubs to advanced aviation equity, we design the financial foundations
              of global movement.
            </p>
            <div className={styles.heroBtns}>
              <Link href="#request" className={styles.heroPrimary}>
                Request Service
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.portfolio}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              <article className={styles.big}>
                <span className={styles.kicker}>Sector 01</span>
                <h3 className={styles.h3}>Automated Hubs</h3>
                <p className={styles.body}>
                  Investing in fully autonomous port and terminal systems that redefine
                  global throughput efficiency through neural-network integration.
                </p>
                <div className={styles.imgWrap}>
                  <Image
                    alt="Automated Hubs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdrFq6-40GlDXM8-hnogaGx6tI5J3MmTIhy2m2-xYRpwttC0k2dWo81MDUl0r-NDRyuqB7HrW6CeYch7a2ZManI5gWn4nJJ9ApQCTiEGac0xqCZ8rjr1xkv592cKI2F8TImHSbeuuClllqBw8C_fm7yfvyQPSziJE4jMbvqKnxHbnsYCxV4VoYMiuBo7LOpkH8f4kUdxo-ALkaWxOKypzf5my45b6i0XfuPbxeW06r4lEPQ0ocdIkqYWa97OMOPsrErnQA4m-2iWA"
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className={styles.img}
                  />
                </div>
              </article>

              <article className={styles.side}>
                <div>
                  <span className={styles.kicker}>Sector 02</span>
                  <h3 className={styles.h3Small}>Aviation Equity</h3>
                  <p className={styles.sideP}>
                    Strategic capital allocation for next-generation fleet transitions and
                    private orbital infrastructure development.
                  </p>
                </div>
                <div className={styles.sideImgWrap}>
                  <Image
                    alt="Aviation Equity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD3DOnrSJRzmEutZGfKHhDg20JlRxaXB5lloIe6CcLdcWukMs52bD2nPPmKyII5J7wuNp8MjbjufOr2xs2s3swB7B0VXiTEDX_I6mXx2L9GJx6Aw46fksUakknmCrWExEAsyb2ZXn5g0ZJwuQTAwNfiSFn__-QoQhLIwM2yB3bOuP3RzrUquUanOIaAjQG7n_kRxI5LfaNZLryymZ4d6kjsI-6yG6pEshjaFOtKQ5tOeQAvC10Zp9-dMPJ5Fnlqx25s3iw272-_5Y"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className={styles.sideImg}
                  />
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function DesktopInvestmentPage() {
  return (
    <>
      <DesktopInvestmentShell />
      <ServiceRequestForm slug="investment" />
    </>
  );
}

