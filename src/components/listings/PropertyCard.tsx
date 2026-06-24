"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { useCarousel } from "@/hooks/useCarousel";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/types";
import { cn } from "@/lib/utils";
import { WishlistButton } from "./WishlistButton";

interface PropertyCardProps {
  listing: Listing;
  variant?: "grid" | "carousel" | "catalog";
  className?: string;
}

export function PropertyCard({ listing, variant = "grid", className }: PropertyCardProps) {
  const { index, next, prev } = useCarousel(listing.images.length);
  const showCarousel = variant === "catalog" || variant === "carousel";

  return (
    <Link href={`/rooms/${listing.id}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-xl">
        <div
          className={cn(
            "relative bg-bg-subtle",
            variant === "catalog" ? "aspect-[4/3]" : "aspect-square",
          )}
        >
          <SafeImage
            src={listing.images[index] ?? listing.images[0]}
            alt={listing.title}
            fill
            className="transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 42vw, 280px"
          />
          {listing.isGuestFavorite && (
            <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
              <Badge label="Guest favorite" variant="favorite" className="text-[10px] sm:text-xs" />
            </div>
          )}
          {listing.isRareFind && !listing.isGuestFavorite && (
            <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
              <Badge label="Rare find" variant="favorite" className="text-[10px] sm:text-xs" />
            </div>
          )}
          <WishlistButton listingId={listing.id} />

          {showCarousel && listing.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  prev();
                }}
                className="absolute left-1 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeftIcon size={12} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                className="absolute right-1 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRightIcon size={12} />
              </button>
              <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                {listing.images.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "size-1 rounded-full",
                      i === index ? "bg-white" : "bg-white/50",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-0.5 sm:mt-3">
        {variant === "catalog" ? (
          <>
            <div className="flex items-start justify-between gap-1">
              <p className="text-[13px] font-semibold leading-tight sm:text-[15px]">
                {listing.type} in {listing.location.split(",")[0]}
              </p>
              <span className="flex shrink-0 items-center gap-0.5 text-xs sm:text-sm">
                <StarIcon size={10} />
                {listing.rating.toFixed(2)}
              </span>
            </div>
            <p className="truncate text-xs text-text-secondary sm:text-sm">{listing.title}</p>
            {listing.bedrooms && (
              <p className="text-xs text-text-secondary sm:text-sm">
                {listing.bedrooms} bed · {listing.beds} beds
              </p>
            )}
            {listing.hasMonthlyDiscount && listing.monthlyPrice ? (
              <p className="text-xs sm:text-sm">
                <span className="font-semibold">{formatPrice(listing.monthlyPrice)}</span>
                <span className="text-text-secondary"> monthly</span>
              </p>
            ) : (
              <p className="text-xs text-text-secondary sm:text-sm">
                {listing.priceLabel ?? `${formatPrice(listing.pricePerNight)} night`}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="truncate text-[13px] font-semibold sm:text-[15px]">{listing.title}</p>
            <p className="text-xs text-text-secondary sm:text-sm">
              {listing.priceLabel ?? `${formatPrice(listing.pricePerNight)} night`}
            </p>
            <p className="flex items-center gap-0.5 text-xs sm:text-sm">
              <StarIcon size={10} />
              {listing.rating.toFixed(2)}
            </p>
          </>
        )}
      </div>
    </Link>
  );
}
