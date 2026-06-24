"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { avatarPhoto } from "@/lib/images";
import type { Listing } from "@/types";
import { cn } from "@/lib/utils";
import { WishlistButton } from "./WishlistButton";

interface PropertyCardImageProps {
  listing: Listing;
  variant: "grid" | "carousel" | "catalog";
  index: number;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
}

export function PropertyCardImage({
  listing,
  variant,
  index,
  onPrev,
  onNext,
}: PropertyCardImageProps) {
  const showCarousel = variant === "catalog" || variant === "carousel";
  const hostAvatar = listing.hostAvatar ?? avatarPhoto(listing.id);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className={cn("relative bg-bg-subtle", variant === "catalog" ? "aspect-[4/3]" : "aspect-square")}>
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
        {variant === "catalog" && (
          <div className="absolute bottom-3 left-3">
            <div className="relative size-8 overflow-hidden rounded-full border-2 border-white shadow">
              <SafeImage src={hostAvatar} alt="Host" fill sizes="32px" />
            </div>
          </div>
        )}
        {showCarousel && listing.images.length > 1 && (
          <>
            <button type="button" onClick={onPrev} className="absolute left-1 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:opacity-0 md:group-hover:opacity-100" aria-label="Previous image">
              <ChevronLeftIcon size={12} />
            </button>
            <button type="button" onClick={onNext} className="absolute right-1 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:opacity-0 md:group-hover:opacity-100" aria-label="Next image">
              <ChevronRightIcon size={12} />
            </button>
            <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-0.5">
              {listing.images.map((_, i) => (
                <span key={i} className={cn("size-1 rounded-full", i === index ? "bg-white" : "bg-white/50")} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
