"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { ListingSection as ListingSectionType } from "@/types";
import { PropertyCard } from "./PropertyCard";

interface ListingSectionHeaderProps {
  section: ListingSectionType;
  onScroll: (direction: "left" | "right") => void;
}

function ListingSectionHeader({ section, onScroll }: ListingSectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4 sm:mb-4">
      <div className="min-w-0">
        {section.href ? (
          <Link href={section.href} className="group flex min-w-0 items-center gap-1 text-base font-semibold hover:underline sm:text-lg md:text-[22px]">
            <span className="truncate">{section.title}</span>
            <ChevronRightIcon size={18} className="shrink-0 opacity-70 sm:opacity-0 sm:group-hover:opacity-100" />
          </Link>
        ) : (
          <h2 className="truncate text-base font-semibold sm:text-lg md:text-[22px]">{section.title}</h2>
        )}
        {section.subtitle && <p className="mt-1 text-sm text-text-secondary">{section.subtitle}</p>}
      </div>
      <div className="hidden shrink-0 items-center gap-2 md:flex">
        <button type="button" onClick={() => onScroll("left")} className="flex size-8 items-center justify-center rounded-full border border-border-default hover:shadow-sm" aria-label="Scroll left">
          <ChevronLeftIcon size={14} />
        </button>
        <button type="button" onClick={() => onScroll("right")} className="flex size-8 items-center justify-center rounded-full border border-border-default hover:shadow-sm" aria-label="Scroll right">
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}

interface ListingSectionProps {
  section: ListingSectionType;
  cardVariant?: "grid" | "carousel";
}

export function ListingSection({ section, cardVariant = "carousel" }: ListingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mb-8 overflow-hidden sm:mb-10">
      <ListingSectionHeader section={section} onScroll={scroll} />
      <div className="overflow-hidden md:hidden">
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory scrollbar-hide">
          {section.listings.map((listing) => (
            <div key={listing.id} className="w-[40vw] max-w-[160px] min-w-[132px] shrink-0 snap-start">
              <PropertyCard listing={listing} variant={cardVariant} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {section.listings.map((listing) => <PropertyCard key={listing.id} listing={listing} variant={cardVariant} />)}
      </div>
    </section>
  );
}
