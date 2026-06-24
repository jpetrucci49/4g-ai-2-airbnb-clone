import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import type { ListingSection as ListingSectionType } from "@/types";
import { PropertyCard } from "./PropertyCard";

interface ListingSectionProps {
  section: ListingSectionType;
  cardVariant?: "grid" | "carousel";
}

export function ListingSection({ section, cardVariant = "carousel" }: ListingSectionProps) {
  return (
    <section className="mb-8 overflow-hidden sm:mb-10">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        {section.href ? (
          <Link
            href={section.href}
            className="group flex min-w-0 items-center gap-1 text-base font-semibold hover:underline sm:text-lg md:text-[22px]"
          >
            <span className="truncate">{section.title}</span>
            <ChevronRightIcon
              size={18}
              className="shrink-0 opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
            />
          </Link>
        ) : (
          <h2 className="truncate text-base font-semibold sm:text-lg md:text-[22px]">
            {section.title}
          </h2>
        )}
      </div>

      <div className="overflow-hidden md:hidden">
        <div className="flex gap-3 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory scrollbar-hide">
          {section.listings.map((listing) => (
            <div
              key={listing.id}
              className="w-[40vw] max-w-[160px] min-w-[132px] shrink-0 snap-start"
            >
              <PropertyCard listing={listing} variant={cardVariant} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {section.listings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} variant={cardVariant} />
        ))}
      </div>
    </section>
  );
}
