import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/types";

interface MapPlaceholderProps {
  listings?: Listing[];
  className?: string;
}

export function MapPlaceholder({ listings = [], className }: MapPlaceholderProps) {
  return (
    <div
      className={`relative flex h-full min-h-[400px] items-center justify-center bg-bg-subtle ${className ?? ""}`}
    >
      <div className="text-center text-text-secondary">
        <span className="text-4xl">🗺️</span>
        <p className="mt-2 font-medium">Map</p>
      </div>
      {listings.map((listing, i) => {
        if (!listing.monthlyPrice && !listing.pricePerNight) return null;
        const price = listing.monthlyPrice ?? listing.pricePerNight;
        return (
          <div
            key={listing.id}
            className="absolute rounded-lg bg-white px-2 py-1 text-xs font-semibold shadow-md"
            style={{
              top: `${20 + (i % 4) * 18}%`,
              left: `${15 + (i % 3) * 25}%`,
            }}
          >
            {formatPrice(price)}
          </div>
        );
      })}
    </div>
  );
}
