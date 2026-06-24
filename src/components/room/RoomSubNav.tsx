"use client";

import { useScrollCollapsed } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { ListingDetail } from "@/types";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
] as const;

interface RoomSubNavProps {
  listing: ListingDetail;
  nights: number;
  total: number;
  onReserve: () => void;
}

export function RoomSubNav({ listing, nights, total, onReserve }: RoomSubNavProps) {
  const isCompact = useScrollCollapsed(520, 400);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={cn(
        "sticky top-0 z-30 hidden border-b border-border-light bg-white md:block",
        isCompact && "shadow-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <nav className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollTo(`room-${tab.id}`)}
              className="text-sm font-medium text-text-secondary hover:text-text-primary hover:underline"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {isCompact && (
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-base font-semibold">
                {formatPrice(total)} <span className="font-normal text-text-secondary">for {nights} nights</span>
              </p>
              <p className="text-xs text-text-secondary">
                ★ {listing.rating.toFixed(2)} · {listing.reviewCount} reviews
              </p>
            </div>
            <Button size="md" onClick={onReserve} className="rounded-lg px-6">
              Reserve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
