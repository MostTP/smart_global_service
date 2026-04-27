import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, type ServiceDefinition } from "@/lib/services";

type Props = {
  service: ServiceDefinition;
};

/** Compact grid cell: image + dense text, minimal padding. */
export function ServiceGridTile({ service }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:bg-slate-50/90 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-100">
        <Image
          src={service.cardImage.src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-2.5">
        <span className="text-[11px] text-slate-500">{CATEGORY_LABELS[service.category]}</span>
        <p className="mt-0.5 text-sm font-semibold leading-tight text-slate-900">{service.name}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-600">{service.summary}</p>
      </div>
    </Link>
  );
}
