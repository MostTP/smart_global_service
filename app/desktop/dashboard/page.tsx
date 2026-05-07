import Image from "next/image";
import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

export default function DesktopDashboardPage() {
  return (
    <div className={styles.shell}>
      <div className={styles.deepFieldBg} aria-hidden />
      <div className={styles.rings} aria-hidden />

      <DesktopTopNav />

      <div className={styles.frame}>
        <aside className={styles.sidebar}>
          <div className={styles.sideInner}>
            <span className={styles.sideEyebrow}>Navigation</span>
            <nav className={styles.sideNav} aria-label="Sidebar">
              {(
                [
                  { icon: "home", label: "Home", active: false },
                  { icon: "deployed_code", label: "Services", active: false },
                  { icon: "history", label: "History", active: true },
                  { icon: "notifications", label: "Notifications", active: false },
                  { icon: "settings", label: "Settings", active: false },
                ] as const
              ).map(({ icon, label, active }) => (
                <Link
                  key={label}
                  href={label === "History" ? "/dashboard" : "/desktop/services"}
                  className={`${styles.sideLink} ${active ? styles.sideActive : ""}`}
                >
                  <MaterialIcon
                    name={icon}
                    className={active ? styles.filled : ""}
                    aria-hidden
                  />
                  <span>{label}</span>
                  {label === "Notifications" ? <span className={styles.dot} /> : null}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.profile}>
            <div className={`${styles.profileCard} glass-panel`}>
              <div className={styles.profileImg}>
                <Image
                  alt="Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJN1dkqOdWOIBFzpWZHBqm1kS42pElu_aKolzPR2BmRPmQ_BeqhSG5xQmfNfWSX37rCE2kPMDretGMo8LN2DFEHwiIlShaL6bEhd2A8m-SCbZAzVNoDbCH-tTYwE_4C0k5zXsX1EnIGKemlGhP66yM3QoxbOYxiYrug11opGi1Kmt7cz8m3oc08NuxBydWitL7PPx0ABkJ9mu8YLEz1iVl_sD4q0TpbU_9m8RcHBLZ6odwlxOURAk0LggUG1LNhw-6lHewPIczEro"
                  fill
                  sizes="40px"
                  className={styles.profileImgEl}
                />
              </div>
              <div>
                <span className={styles.profileRole}>Global Admin</span>
                <span className={styles.profileUser}>COMMANDER_01</span>
              </div>
            </div>
          </div>
        </aside>

        <main className={styles.main}>
          <header className={styles.header}>
            <h1 className={styles.h1}>History | Service &amp; Booking Archive</h1>
            <p className={styles.sub}>
              Desktop dashboard shell aligned to the Stitches desktop dashboard layout.
            </p>
          </header>

          <section className={styles.cards}>
            {[
              ["Global Transit #SG-882", "In Transit - Lagos Port", "local_shipping"],
              ["Procurement #PR-102", "Completed - June 12", "payments"],
              ["Marine Survey #MS-441", "Cancelled", "sailing"],
            ].map(([title, meta, icon]) => (
              <article key={title} className={`${styles.card} glass-panel`}>
                <div className={styles.cardLeft}>
                  <div className={styles.avatar}>
                    <MaterialIcon name={icon} aria-hidden />
                  </div>
                  <div>
                    <p className={styles.cardTitle}>{title}</p>
                    <p className={styles.cardMeta}>{meta}</p>
                  </div>
                </div>
                <MaterialIcon name="chevron_right" className={styles.chev} aria-hidden />
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

