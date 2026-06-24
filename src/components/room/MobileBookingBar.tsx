"use client";

import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { ListingDetail } from "@/types";

interface MobileBookingBarProps {
  listing: ListingDetail;
  nights: number;
  total: number;
  onReserve: () => void;
}

export function MobileBookingBar({ listing, nights, total, onReserve }: MobileBookingBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 border-t border-border-light bg-white px-4 py-3 md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-base font-semibold">
            {formatPrice(listing.pricePerNight)}{" "}
            <span className="font-normal text-text-secondary">night</span>
          </p>
          <p className="text-xs text-text-secondary">
            {formatPrice(total)} for {nights} nights
          </p>
        </div>
        <Button size="md" onClick={onReserve} className="shrink-0 rounded-lg px-6">
          Reserve
        </Button>
      </div>
    </div>
  );
}
