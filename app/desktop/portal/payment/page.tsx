import Link from "next/link";
import { DesktopTopNav } from "@/components/desktop-top-nav";
import styles from "./page.module.css";

export default function DesktopPaymentPortalPage() {
  return (
    <div className={styles.shell}>
      <DesktopTopNav />
      <main className={styles.main}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>CLIENT PAYMENTS</p>
            <h1 className={styles.title}>Pay after you accept a quote</h1>
          </header>

          <div className={`${styles.left} glass-panel`} style={{ maxWidth: 720 }}>
            <p className={styles.paySub} style={{ marginBottom: 20 }}>
              Smart Global Service uses hosted checkout (Stripe by default, or Paystack when{" "}
              <code>PAYMENT_PROVIDER=paystack</code>
              ). There is no card form on this site: you pay from the secure link in your
              quotation email.
            </p>
            <ol style={{ margin: "0 0 24px", paddingLeft: 20, lineHeight: 1.7, color: "var(--color-on-surface-variant)" }}>
              <li>Submit a request on any service page.</li>
              <li>Operations issues a quote; you get an email with a quote link.</li>
              <li>Open the link, review lines, then use <strong>Accept quote &amp; pay</strong>.</li>
              <li>After payment, your receipt is on the confirmation page.</li>
            </ol>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <Link href="/services" className={styles.primary}>
                Request a service
              </Link>
              <Link href="/portal/dashboard" className={styles.secondary}>
                Portal dashboard
              </Link>
              <Link href="/portal/login" className={styles.secondary}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
