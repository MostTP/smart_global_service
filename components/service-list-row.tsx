import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, type ServiceDefinition } from "@/lib/services";

type Props = {
  service: ServiceDefinition;
};

/**
 * Compact directory row (text-first, small thumb)—reads like an internal / gov
 * service catalogue rather than a marketing card grid.
 */
export function ServiceListRow({ service }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700"
    >
      <div className="relative h-14 w-[5.5rem] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm sm:h-16 sm:w-28">
        <Image
          src={service.cardImage.src}
          alt=""
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold text-slate-900 group-hover:underline sm:text-[15px]">
            {service.name}
          </span>
          <span className="text-xs text-slate-500">{CATEGORY_LABELS[service.category]}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-600">
          {service.summary}
        </p>
      </div>
      <div className="hidden shrink-0 self-center text-sm text-slate-400 sm:block">→</div>
    </Link>
  );
}
