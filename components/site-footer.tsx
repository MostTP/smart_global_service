import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#ddd5c8] bg-[#ebe6dc] py-12 text-sm text-slate-700">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-semibold text-blue-950">Smart Global Service</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
            Integrated premium services across transport, logistics, security, and
            specialist operations—planned, quoted, and delivered through one team.
          </p>
        </div>
        <div>
          <p className="font-semibold text-blue-950">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/services" className="text-blue-800 hover:text-blue-950 hover:underline">
                All services
              </Link>
            </li>
            <li>
              <Link
                href="/services/jet-lease"
                className="text-blue-800 hover:text-blue-950 hover:underline"
              >
                Jet lease
              </Link>
            </li>
            <li>
              <Link
                href="/services/boat-cruises"
                className="text-blue-800 hover:text-blue-950 hover:underline"
              >
                Boat cruises
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-blue-950">How it works</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Submit a request, we review and quote where needed, then confirm in writing.
            For urgent jobs, say so in the form.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-[#d8d0c4] px-4 pt-8 text-center text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} Smart Global Service.{" "}
        <Link href="/admin/login" className="text-blue-800/80 hover:text-blue-950 hover:underline">
          Staff login
        </Link>
      </p>
    </footer>
  );
}
