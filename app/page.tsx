import Link from "next/link";
import Image from "next/image";
import { ServiceListRow } from "@/components/service-list-row";
import { SERVICES } from "@/lib/services";

const heroImage =
  "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function Home() {
  const featured = SERVICES.filter((s) =>
    ["vip-diplomatic-transfer", "jet-lease", "boat-cruises", "security-escort"].includes(
      s.slug,
    ),
  );

  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16">
          <div>
            <h1 className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
              Transport, logistics, and specialist operations through one desk.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
              We operate a defined set of service lines—each with clear scope, its own
              request form, and the same review-and-quote workflow before work is
              confirmed.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-md shadow-slate-900/25 hover:bg-slate-800"
              >
                Service directory
              </Link>
              <Link
                href="/services/vip-diplomatic-transfer"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
              >
                VIP transfer
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-lg shadow-slate-900/10 lg:aspect-auto lg:min-h-[240px]">
            <Image
              src={heroImage}
              alt="Aircraft on the apron"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-300 pb-4 sm:flex-row sm:items-end">
          <h2 className="text-base font-semibold text-slate-900">Selected service lines</h2>
          <Link href="/services" className="text-sm text-blue-800 hover:underline">
            Full directory
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md shadow-slate-900/5">
          {featured.map((s) => (
            <li key={s.slug} className="hover:bg-slate-50/80">
              <ServiceListRow service={s} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
