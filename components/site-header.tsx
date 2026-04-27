import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services?category=transportation", label: "Transport" },
  { href: "/services?category=logistics", label: "Logistics" },
  { href: "/services?category=security", label: "Security" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 shadow-md shadow-blue-950/10 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-blue-950">Smart Global Service</span>
          <span className="hidden text-xs text-blue-800/70 sm:block">
            Integrated premium services
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-1 py-0.5 transition hover:bg-blue-50 hover:text-blue-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/services"
          className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-medium text-white shadow-md shadow-blue-900/20 transition hover:bg-blue-800 sm:px-4 sm:text-sm"
        >
          Request a service
        </Link>
      </div>
    </header>
  );
}
