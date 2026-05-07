import Image from "next/image";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

export default function DesktopAdminPage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>S</div>
        <nav className={styles.sideNav} aria-label="Admin navigation">
          <button className={styles.sideBtnActive} aria-label="Dashboard">
            <MaterialIcon name="dashboard" className={styles.filled} aria-hidden />
          </button>
          <button className={styles.sideBtn} aria-label="Launch">
            <MaterialIcon name="rocket_launch" aria-hidden />
          </button>
          <button className={styles.sideBtn} aria-label="Finance">
            <MaterialIcon name="account_balance" aria-hidden />
          </button>
          <button className={styles.sideBtn} aria-label="Settings">
            <MaterialIcon name="settings" aria-hidden />
          </button>
        </nav>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <Image
              alt="Admin"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD50eW4ZxggVN9yag8Waajln-tI4LU50HvyuTEBoMeJq-hY_pKBOmX1pLxVWloZ7xK4I3j1x6oItuYQoKexGj0eXO6ELjLMHLsh55I1rQu5wqy0iKicp8Nvj_aY-xB_Z5JbNRE1lbdBd0rkmr8_T87oxKiSozJY9l4BDDvWuHaQh-JHO8k2lym-evZWW3OxDW_jOxERAjsYNMcFKPkGt0hYbXpNvEcUDLAiwRGc8MPMN-au3G8-mkON3TnyDV2cJTFxfW6EHY2oI_E"
              fill
              sizes="40px"
              className={styles.avatarImg}
            />
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topLeft}>
            <h1 className={styles.title}>COMMAND CENTER</h1>
            <div className={styles.searchWrap}>
              <MaterialIcon name="search" className={styles.searchIcon} aria-hidden />
              <input
                className={styles.search}
                placeholder="Search Logistics ID / Client"
              />
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.status}>
              <span className={styles.statusLabel}>Global Status</span>
              <span className={styles.statusValue}>OPERATIONAL</span>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          <div className={`${styles.heroPanel} glass-panel`}>
            <p className={styles.kicker}>Admin | Command Center</p>
            <p className={styles.lede}>
              This page matches the Stitches desktop command center layout: fixed
              sidebar, top app bar, and glass-panel content surface.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

