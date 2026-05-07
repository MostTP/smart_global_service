import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./page.module.css";

export default function DesktopPaymentPortalPage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav />
      <main className={styles.main}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>FINANCIAL CLEARANCE</p>
            <h1 className={styles.title}>Secure Transaction Portal</h1>
          </header>

          <div className={styles.grid}>
            <section className={`${styles.left} glass-panel`}>
              <div className={styles.leftTop}>
                <div>
                  <h2 className={styles.invoice}>Invoice #SGS-992-QX</h2>
                  <p className={styles.issued}>ISSUED: OCTOBER 24, 2024</p>
                </div>
                <div className={styles.auth}>
                  <MaterialIcon name="verified_user" className={styles.authIcon} aria-hidden />
                  <p className={styles.authLabel}>Authenticated Session</p>
                </div>
              </div>

              <div className={styles.breakdown}>
                {[
                  {
                    title: "Global Logistics: Tier 1 Routing",
                    desc: "Satellite-guided fleet coordination for trans-pacific corridor.",
                    amt: "$142,500.00",
                  },
                  {
                    title: "Strategic Advisory: Market Entry",
                    desc: "EMEA region risk assessment and infrastructure planning.",
                    amt: "$85,000.00",
                  },
                  {
                    title: "Aviation Support: G-IV Maintenance",
                    desc: "Quarterly component audit and safety certification.",
                    amt: "$34,200.00",
                  },
                ].map((r) => (
                  <div key={r.title} className={styles.lineItem}>
                    <div>
                      <p className={styles.lineTitle}>{r.title}</p>
                      <p className={styles.lineDesc}>{r.desc}</p>
                    </div>
                    <p className={styles.lineAmt}>{r.amt}</p>
                  </div>
                ))}
              </div>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>$261,700.00</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Operational Fee</span>
                  <span>$8,400.00</span>
                </div>
                <div className={styles.totalRowStrong}>
                  <span>Total</span>
                  <span>$270,100.00</span>
                </div>
              </div>
            </section>

            <section className={`${styles.right} glass-panel`}>
              <h2 className={styles.payHead}>Authorization</h2>
              <p className={styles.paySub}>
                Provide payment credentials to authorize the transaction.
              </p>

              <div className={styles.form}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Card Number</span>
                  <input className={styles.input} placeholder="•••• •••• •••• ••••" />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Cardholder</span>
                  <input className={styles.input} placeholder="Commander Chen" />
                </label>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Expiry</span>
                    <input className={styles.input} placeholder="MM/YY" />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>CVC</span>
                    <input className={styles.input} placeholder="•••" />
                  </label>
                </div>
              </div>

              <div className={styles.actions}>
                <Link href="/desktop" className={styles.secondary}>
                  Cancel
                </Link>
                <Link href="/portal/receipt" className={styles.primary}>
                  Authorize
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

