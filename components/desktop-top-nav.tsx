"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";
import styles from "./desktop-top-nav.module.css";

type NavItem = { href: string; label: string };

const nav: NavItem[] = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/fleet", label: "FLEET" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function DesktopTopNav({ active }: { active?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          SGS
        </Link>
        <div className={styles.links}>
          {nav.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`${styles.link} ${active === l.label ? styles.active : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/portal/payment" className={styles.cta}>
          REQUEST SERVICE
          <MaterialIcon name="arrow_outward" className={styles.ctaIcon} aria-hidden />
        </Link>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MaterialIcon name={open ? "close" : "menu"} className={styles.menuIcon} aria-hidden />
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.mobilePanelInner}>
          {nav.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`${styles.mobileLink} ${active === l.label ? styles.mobileLinkActive : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/portal/payment"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            REQUEST SERVICE
            <MaterialIcon name="arrow_outward" className={styles.ctaIcon} aria-hidden />
          </Link>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.scrim} ${open ? styles.scrimVisible : ""}`}
        aria-hidden={!open}
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
    </nav>
  );
}
