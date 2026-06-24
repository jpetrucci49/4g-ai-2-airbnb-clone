import { StarIcon } from "@/components/icons";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/types";

interface PropertyCardDetailsProps {
  listing: Listing;
  variant: "grid" | "carousel" | "catalog";
}

export function PropertyCardDetails({ listing, variant }: PropertyCardDetailsProps) {
  if (variant === "catalog") {
    return (
      <div className="mt-2 space-y-0.5 sm:mt-3">
        <div className="flex items-start justify-between gap-1">
          <p className="text-[13px] font-semibold leading-tight sm:text-[15px]">
            {listing.type} in {listing.location.split(",")[0]}
          </p>
          <span className="flex shrink-0 items-center gap-0.5 text-xs sm:text-sm">
            <StarIcon size={10} />
            {listing.rating.toFixed(2)}
            <span className="text-text-secondary">({listing.reviewCount})</span>
          </span>
        </div>
        {listing.tagline && <p className="truncate text-xs text-text-secondary sm:text-sm">{listing.tagline}</p>}
        {listing.bedrooms != null && listing.beds != null && (
          <p className="text-xs text-text-secondary sm:text-sm">
            {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? "s" : ""} · {listing.beds} bed{listing.beds !== 1 ? "s" : ""}
          </p>
        )}
        <p className="text-xs sm:text-sm">
          <span className="font-semibold">{formatPrice(listing.pricePerNight)}</span>
          <span className="text-text-secondary"> per night</span>
        </p>
        {listing.perks && listing.perks.length > 0 && (
          <p className="truncate text-xs text-text-secondary">{listing.perks.join(" · ")}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-0.5 sm:mt-3">
      <p className="truncate text-[13px] font-semibold sm:text-[15px]">{listing.title}</p>
      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
        <p className="text-text-secondary">{listing.priceLabel ?? `${formatPrice(listing.pricePerNight)} night`}</p>
        <p className="flex shrink-0 items-center gap-0.5">
          <StarIcon size={10} />
          {listing.rating.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
