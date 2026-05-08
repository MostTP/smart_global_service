import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function PortalDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/portal/login?callbackUrl=/portal/dashboard");
  }

  const [requests, notifications] = await Promise.all([
    prisma.serviceRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 40,
      include: {
        quotes: {
          where: { status: "SENT" },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
  ]);

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem" }}>
        Portal
      </h1>
      <p style={{ color: "var(--color-on-surface-variant)", marginBottom: 8 }}>
        Signed in as {session.user.email}
      </p>
      <SignOutButton />

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Service requests
        </h2>
        {requests.length === 0 ? (
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            No requests yet.{" "}
            <Link href="/services" style={{ color: "var(--color-primary)" }}>
              Browse services
            </Link>
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
            {requests.map((r) => {
              const quote = r.quotes[0];
              const payUrl = quote ? `${base}/quote/${quote.publicToken}` : null;
              return (
                <li
                  key={r.id}
                  className="glass-panel"
                  style={{ padding: 16, marginBottom: 12, fontSize: "0.95rem" }}
                >
                  <strong>{r.serviceSlug}</strong> · {r.status} · ref {r.reference.slice(0, 8)}…
                  {payUrl ? (
                    <>
                      {" · "}
                      <Link href={payUrl} style={{ color: "var(--color-primary)" }}>
                        Open quote
                      </Link>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          In-app notifications
        </h2>
        {notifications.length === 0 ? (
          <p style={{ color: "var(--color-on-surface-variant)" }}>No notifications yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
            {notifications.map((n) => (
              <li
                key={n.id}
                className="glass-panel"
                style={{
                  padding: 16,
                  marginBottom: 12,
                  fontSize: "0.95rem",
                  opacity: n.read ? 0.65 : 1,
                }}
              >
                <strong>{n.title}</strong>
                <div style={{ marginTop: 6, color: "var(--color-on-surface-variant)" }}>
                  {n.body}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p style={{ marginTop: 40 }}>
        <Link href="/services" style={{ color: "var(--color-primary)" }}>
          Services
        </Link>
      </p>
    </div>
  );
}
