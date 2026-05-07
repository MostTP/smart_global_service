import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

const channels = [
  {
    icon: "call",
    title: "Operations desk",
    body: "+1 (555) 010-4482 · 24/7 priority line",
  },
  {
    icon: "mail",
    title: "Secure inbox",
    body: "ops@smartglobalservice.example",
  },
  {
    icon: "location_on",
    title: "Global nodes",
    body: "Singapore · Lagos · Dubai · London",
  },
] as const;

export default function ContactPage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav active="CONTACT" />
      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.h1}>Start a request. We respond fast.</h1>
          <p className={styles.sub}>
            Share scope, timeline, and constraints. Our desk routes you to the
            right vertical with a single accountable lead.
          </p>
        </header>

        <div className={styles.split}>
          <section className={styles.side} aria-label="Contact channels">
            {channels.map((c) => (
              <article key={c.title} className={`${styles.channel} glass-panel`}>
                <div className={styles.channelIcon}>
                  <MaterialIcon name={c.icon} aria-hidden />
                </div>
                <div>
                  <h2 className={styles.channelTitle}>{c.title}</h2>
                  <p className={styles.channelBody}>{c.body}</p>
                </div>
              </article>
            ))}

            <div className={styles.sideCtas}>
              <Link className={styles.primary} href="/portal/payment">
                Request service
                <MaterialIcon name="arrow_outward" aria-hidden />
              </Link>
              <Link className={styles.ghost} href="/services">
                Browse capabilities
                <MaterialIcon name="arrow_outward" aria-hidden />
              </Link>
            </div>
          </section>

          <section className={`${styles.formPanel} glass-panel`} aria-label="Message form">
            <h2 className={styles.formTitle}>Message the desk</h2>
            <p className={styles.formHint}>
              This is a static UI form (no backend). Wire it when you’re ready.
            </p>

            <form className={styles.form}>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input className={styles.input} name="name" placeholder="Full name" />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Organization</span>
                  <input
                    className={styles.input}
                    name="org"
                    placeholder="Company / entity"
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Service vertical</span>
                <select className={styles.select} name="vertical" defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  <option value="aviation">Aviation</option>
                  <option value="marine">Marine</option>
                  <option value="logistics">Logistics</option>
                  <option value="security">Security</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Brief</span>
                <textarea
                  className={styles.textarea}
                  name="brief"
                  rows={5}
                  placeholder="Origin, destination, dates, sensitivities, budget band…"
                />
              </label>

              <div className={styles.formActions}>
                <button className={styles.submit} type="button">
                  Submit (demo)
                </button>
                <span className={styles.formNote}>No data is sent in this build.</span>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
