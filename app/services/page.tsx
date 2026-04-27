import Link from "next/link";
import { ServiceGridTile } from "@/components/service-grid-tile";
import {
  CATEGORY_LABELS,
  type ServiceCategory,
  getServicesByCategory,
} from "@/lib/services";

const categories: (ServiceCategory | "all")[] = [
  "all",
  "transportation",
  "logistics",
  "security",
  "procurement",
  "marine",
  "aviation",
  "investment",
];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const raw = sp.category ?? "all";
  const category = (categories.includes(raw as ServiceCategory | "all")
    ? raw
    : "all") as ServiceCategory | "all";
  const list = getServicesByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6">
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md shadow-slate-900/5 sm:p-4">
        <header className="border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h1 className="text-base font-semibold text-slate-900 sm:text-lg">Services</h1>
          </div>
          <p className="mt-1.5 text-xs leading-snug text-slate-600 sm:text-sm">
            Scope page and request form per line. Reviewed before confirm or quote.
          </p>
        </header>

        <nav
          className="mt-3 flex gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Category"
        >
          {categories.map((c) => {
            const href = c === "all" ? "/services" : `/services?category=${c}`;
            const active = c === category;
            return (
              <Link
                key={c}
                href={href}
                className={
                  active
                    ? "-mb-px whitespace-nowrap border-b-2 border-blue-700 px-2.5 py-2 text-xs font-medium text-slate-900 sm:text-sm"
                    : "-mb-px whitespace-nowrap border-b-2 border-transparent px-2.5 py-2 text-xs text-slate-600 hover:border-slate-300 hover:text-slate-900 sm:text-sm"
                }
              >
                {c === "all" ? "All" : CATEGORY_LABELS[c]}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-3 sm:p-3">
        <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4">
          {list.map((s) => (
            <ServiceGridTile key={s.slug} service={s} />
          ))}
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-snug text-slate-500">
        Not listed? Pick the nearest line and note details in the request.
      </p>
    </div>
  );
}
