import Image from "next/image";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import { ServiceRequestForm } from "@/components/service-request-form";
import styles from "./page.module.css";

export default function DesktopMarinePage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="SERVICES" />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                Sector 04 // Maritime Operations
              </span>
              <h1 className={styles.title}>Marine. Absolute Depth.</h1>
              <p className={styles.body}>
                Precision navigation across the world's most demanding waters. From
                luxury yacht charters to high-capacity commercial logistics, SGS
                Marine delivers unwavering reliability on every horizon.
              </p>
            </div>
          </div>
          <svg
            className={styles.waves}
            preserveAspectRatio="none"
            viewBox="0 0 1440 200"
            aria-hidden
          >
            <path
              d="M0 100 C 300 150, 600 50, 900 120 C 1200 190, 1440 100, 1440 100 V 200 H 0 Z"
              fill="rgba(187, 222, 251, 0.05)"
            />
            <line x1="0" y1="50" x2="1440" y2="50" stroke="#BBDEFB" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="1440" y2="100" stroke="#BBDEFB" strokeWidth="0.5" />
            <line x1="0" y1="150" x2="1440" y2="150" stroke="#BBDEFB" strokeWidth="0.5" />
          </svg>
        </section>

        <section className={styles.bento}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              <article className={`${styles.big} glass-panel`}>
                <div>
                  <span className={styles.kicker}>Vertical A</span>
                  <h2 className={styles.h2}>Boat Cruises &amp; Yacht Charter</h2>
                  <p className={styles.p}>
                    Bespoke maritime experiences tailored for high-stakes corporate
                    hosting and elite leisure. Our fleet ranges from sleek day-cruisers
                    to monumental luxury yachts.
                  </p>
                </div>
                <div className={styles.metrics}>
                  {[
                    ["Leisure", "Personal Journeys"],
                    ["Corporate", "Executive Hosting"],
                    ["VIP", "Ultimate Privacy"],
                  ].map(([a, b]) => (
                    <div key={a} className={styles.metric}>
                      <span className={styles.metricA}>{a}</span>
                      <span className={styles.metricB}>{b}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.imgWrap}>
                  <Image
                    alt="Boat Cruises"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDND1umrQnQ6rGUStJxAmHR0oYIZ1fAdchmJH0vEvJz-6-DVlCy1Oq7HGljTBy1ErGAOZAnJE0YuS6PgexLnMh13SEG4VQkB3WEH-BCCgoA1u5HVYPVKL1qKDKRe6LNVfjQSroSecr6iAU9SXkKQvN8knhFTorAPaVwHpm0dTQmUr2O5cneT2dT69uNSq7LmWKAL2keWD9CTvwYoSZCP3l_4Uvr9u6ebbZ9DgdclsPQGBOxyskZEjHFNTEryhD1oA9C8KCXUQ-Hl24"
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className={styles.img}
                  />
                </div>
              </article>

              <div className={styles.stack}>
                <article className={`${styles.small} glass-panel`}>
                  <span className={styles.kicker}>Vertical B</span>
                  <h2 className={styles.h2}>Fleet Logistics</h2>
                  <p className={styles.p}>
                    Strategic commercial maritime transport specializing in global
                    node-to-node connectivity and heavy cargo operations.
                  </p>
                  <div className={styles.bullets}>
                    <div className={styles.bullet}>
                      <MaterialIcon name="anchor" aria-hidden />
                      <span>Port Management</span>
                    </div>
                    <div className={styles.bullet}>
                      <MaterialIcon name="local_shipping" aria-hidden />
                      <span>Route Optimization</span>
                    </div>
                  </div>
                </article>

                <article className={`${styles.poster} glass-panel`}>
                  <Image
                    alt="Commercial Ops"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD16O29riViPA54DMrneqn01VzjDmxxDi1vSV78ANmlK1vu57rn9Zz6uuFgbpaStj4MeJxmjO5kDfSQxe7KqQOhZqgoYidn_ypfjYKwnksdQUq2ll00JOdcfuBtjVIC6VE5DxBV77kRj_lmFMU96rk-EKK6a4RymTxJk73_KEPsv9_czwf6heR7FchauiXLQ6fIRLxzlhjAlSCE8OekWYgbemL53-GtcYmdmrfi59CCbYheHCq9Ua2cBzsaYNoS0vyVEg7XjKPoQ8U"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className={styles.posterImg}
                  />
                  <div className={styles.posterLabel}>
                    <span>Commercial Ops</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.fleet}>
          <div className={styles.fleetHead}>
            <div>
              <span className={styles.fleetEyebrow}>The Collection</span>
              <h2 className={styles.fleetTitle}>Vessel Specifications</h2>
            </div>
            <div className={styles.fleetNav} aria-hidden>
              <button className={styles.fleetBtn} type="button">
                <MaterialIcon name="arrow_back" aria-hidden />
              </button>
              <button className={styles.fleetBtn} type="button">
                <MaterialIcon name="arrow_forward" aria-hidden />
              </button>
            </div>
          </div>

          <div className={styles.fleetScroller}>
            {[
              {
                name: "Odyssey-X",
                klass: "Class: Alpha",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUcj77DZ-khlSgivX_utfh6q5x05MqQD3G5LhT0rBnRH-9_rmFryF_4pbBAHhea8Tng2bZ9flUaoZeJWkOnK3AeLLdaOXHnjxXNNwD80choRbJDVt1v1mfh67Wvnhv0iqpV8Qj9xLeFpnKZWJcL9BUulQmDARmAnpwfE_DY_iac8vMvVbKUDIlHb-FB8rQCg3uCII_UmPbFwm6cx7TfVQY0h2qwfZd537wpMNQcywVyr8ArINk-vzwD2EwHxjEoLDqa5K1QXukDkU",
                rows: [
                  ["Capacity", "12 Guest / 6 Crew"],
                  ["Length", "42 Meters"],
                  ["Cruising Speed", "28 Knots"],
                ],
              },
              {
                name: "Zenith II",
                klass: "Class: Omega",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7uoILJp21TOMw-dYaP1jRwq3C6sou2pQ254YAMXZLXNIw0Ft4r2HJF4XRyi83f3lwQAbL90LbcDUiVuL1HR32_cIetxW8ec77m4PtqSCC1Vfhd4dcyvEylAGj2og3rhQLpzqOWpELD5i3y2_uTHoVGBFYW-BC2ttwUTErPUKuvQw79tARThO7YClApO2s58rW-zc5bySBi0M1uuoJ-JVMmyAtsAugEQnCrMtxRSeNLQ2GQyCe9mN0q5yJP3CYz1d67tylyw0orKk",
                rows: [
                  ["Capacity", "24 Guest / 12 Crew"],
                  ["Length", "78 Meters"],
                  ["Cruising Speed", "22 Knots"],
                ],
              },
              {
                name: "Explorer 01",
                klass: "Class: Logistics",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRuCXNb_xkANA8xcnUVlACFfWeWt_-jC3MxELniCyNdNKRLRnzX1LtYtCMRcSRmxWo1iPEhf8DBOIvk49DTnYRaObhYb-Yo1TosnhjdVdba3aI0rM_Qy7ZftJ6v5Bam_6-jNWQouKUrEFAjJuhro77ASzsvqybyjtavnKMcIjvFk9phyowJyJsP8ilNhy9kDOVqKj6oqQEcRfel0ZIR2YHy6m672ZWEpcZ63auE8mz4JBEBG_5Y38frNo3PvptdvcTxEsMrJ69xt0",
                rows: [
                  ["Capacity", "150 Tons Cargo"],
                  ["Endurance", "12,000 NM"],
                  ["Classification", "Ice Class 1A"],
                ],
              },
            ].map((v) => (
              <article key={v.name} className={`${styles.vessel} glass-panel`}>
                <div className={styles.vesselImgWrap}>
                  <Image
                    alt={v.name}
                    src={v.img}
                    fill
                    sizes="400px"
                    className={styles.vesselImg}
                  />
                </div>
                <div className={styles.vesselBody}>
                  <div className={styles.vesselTop}>
                    <h3 className={styles.vesselName}>{v.name}</h3>
                    <span className={styles.vesselClass}>{v.klass}</span>
                  </div>
                  <ul className={styles.vesselList}>
                    {v.rows.map(([k, val]) => (
                      <li key={k} className={styles.vesselRow}>
                        <span>{k}</span>
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="request" className={styles.request}>
          <div className={styles.requestInner}>
            <div className={styles.requestLeft}>
              <span className={styles.reqEyebrow}>Engagement</span>
              <h2 className={styles.reqTitle}>Service Deployment Request</h2>
              <p className={styles.reqBody}>
                Submit your requirements for a comprehensive logistical analysis.
                Our maritime command center will provide a deployment strategy within
                6 hours of submission.
              </p>
              <div className={styles.support}>
                <MaterialIcon name="terminal" className={styles.supportIcon} aria-hidden />
                <div>
                  <h4 className={styles.supportTitle}>Technical Support</h4>
                  <p className={styles.supportDesc}>
                    24/7 Global dispatch for all fleet operations.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${styles.requestForm} glass-panel`}>
              <ServiceRequestForm slug="marine" embed />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

