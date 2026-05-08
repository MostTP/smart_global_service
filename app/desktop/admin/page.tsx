import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type AdminRequestRow = {
  id: string;
  reference: string;
  serviceSlug: string;
  status: string;
  contactEmail: string | null;
  createdAt: Date;
};

export default async function DesktopAdminPage({ sentUrl }: { sentUrl?: string }) {
  let requests: AdminRequestRow[] = [];
  try {
    requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 150,
      select: {
        id: true,
        reference: true,
        serviceSlug: true,
        status: true,
        contactEmail: true,
        createdAt: true,
      },
    });
  } catch {
    requests = [];
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>S</div>
        <nav className={styles.sideNav} aria-label="Admin navigation">
          <button type="button" className={styles.sideBtnActive} aria-label="Dashboard">
            <MaterialIcon name="dashboard" className={styles.filled} aria-hidden />
          </button>
          <button type="button" className={styles.sideBtn} aria-label="Launch">
            <MaterialIcon name="rocket_launch" aria-hidden />
          </button>
          <button type="button" className={styles.sideBtn} aria-label="Finance">
            <MaterialIcon name="account_balance" aria-hidden />
          </button>
          <button type="button" className={styles.sideBtn} aria-label="Settings">
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
                placeholder="Filter in browser (Cmd+F)"
                readOnly
              />
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.status}>
              <span className={styles.statusLabel}>Pipeline</span>
              <span className={styles.statusValue}>REQUEST → QUOTE → PAY</span>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          {sentUrl ? (
            <div className={styles.banner}>
              Quotation sent. Client link:{" "}
              <a href={sentUrl} target="_blank" rel="noreferrer">
                {sentUrl}
              </a>
            </div>
          ) : null}

          <div className={`${styles.heroPanel} glass-panel`}>
            <p className={styles.kicker}>Service requests</p>
            <p className={styles.lede}>
              Open a request and issue a formal quote. The client receives email with a checkout
              link when your stack keys and <code>NEXT_PUBLIC_SITE_URL</code> are configured.
            </p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Contact</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        No requests yet — submit a form on any service page, or ensure{" "}
                        <code>DATABASE_URL</code> and <code>npx prisma db push</code> are applied.
                      </td>
                    </tr>
                  ) : (
                    requests.map((r) => (
                      <tr key={r.id}>
                        <td className={styles.mono}>{r.reference.slice(0, 13)}…</td>
                        <td>{r.serviceSlug}</td>
                        <td>{r.status}</td>
                        <td>{r.contactEmail ?? "—"}</td>
                        <td className={styles.mono}>
                          {r.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                        </td>
                        <td>
                          <div className={styles.cellActions}>
                            <Link
                              className={styles.rowLink}
                              href={`/admin/requests/${r.id}/quote`}
                            >
                              New quote
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
