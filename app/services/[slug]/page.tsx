import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RequestServiceForm } from "@/components/request-service-form";
import {
  CATEGORY_LABELS,
  SERVICES,
  getServiceBySlug,
} from "@/lib/services";

const jetHero =
  "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1920";

const boatHero =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const heroImage =
    service.slug === "jet-lease"
      ? jetHero
      : service.slug === "boat-cruises"
        ? boatHero
        : null;

  return (
    <article className="bg-white">
      {heroImage ? (
        <div className="relative h-52 w-full border-b border-blue-100 sm:h-64">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-12">
        <nav className="text-sm text-slate-500">
          <Link href="/services" className="text-blue-700 hover:text-blue-800 hover:underline">
            Services
          </Link>
          <span className="mx-1.5 text-slate-400">/</span>
          <span className="text-slate-800">{service.name}</span>
        </nav>

        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-blue-800/70">
          {CATEGORY_LABELS[service.category]}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">
          {service.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{service.summary}</p>
        {service.premiumNote ? (
          <p className="mt-3 text-sm italic text-slate-500">{service.premiumNote}</p>
        ) : null}

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.highlights.map((h) => (
            <li
              key={h}
              className="rounded-md border border-blue-100 bg-blue-50/40 px-4 py-3 text-sm text-slate-800"
            >
              {h}
            </li>
          ))}
        </ul>

        {service.externalLinks?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {service.externalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-blue-200 bg-[#fffefb] px-4 py-2 text-sm font-medium text-blue-900 shadow-sm transition hover:border-blue-300 hover:bg-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}

        {service.slug === "jet-lease" ? (
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Hero photo is stock for illustration. Fleet reference: use the external link
            (Swift Wings Jet). Operations and quotes are handled by Smart Global Service.
          </p>
        ) : null}
        {service.slug === "boat-cruises" ? (
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Hero photo is stock for illustration. For Lagos cruise options, see the
            Kampari Tours link above.
          </p>
        ) : null}

        <section
          id="request"
          className="mt-12 rounded-lg border border-blue-100 bg-gradient-to-b from-blue-50/50 to-[#fffefb] p-6 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-blue-950">Request this service</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fields change by service type. Submitting does not confirm a booking—we
            review and reply with next steps or a quotation.
          </p>
          <div className="mt-8">
            <RequestServiceForm service={service} />
          </div>
        </section>
      </div>
    </article>
  );
}
