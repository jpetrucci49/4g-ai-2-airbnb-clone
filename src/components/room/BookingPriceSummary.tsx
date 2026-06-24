import { formatPrice } from "@/lib/utils";
import type { ListingDetail } from "@/types";

interface BookingPriceSummaryProps {
  listing: ListingDetail;
  nights: number;
  total: number;
  checkIn: Date | null;
  checkOut: Date | null;
}

export function BookingPriceSummary({ listing, nights, total, checkIn, checkOut }: BookingPriceSummaryProps) {
  if (!checkIn || !checkOut) return null;

  return (
    <div className="mt-4 space-y-2 border-t border-border-light pt-4 text-sm">
      <div className="flex justify-between">
        <span className="underline">{formatPrice(listing.pricePerNight)} x {nights} nights</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
