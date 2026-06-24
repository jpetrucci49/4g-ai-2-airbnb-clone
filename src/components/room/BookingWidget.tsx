"use client";

import { useState } from "react";
import { BookingFormFields } from "@/components/room/BookingFormFields";
import { BookingPriceSummary } from "@/components/room/BookingPriceSummary";
import { RareFindBanner } from "@/components/room/RareFindBanner";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatPrice } from "@/lib/utils";
import type { GuestCounts, ListingDetail } from "@/types";

interface BookingWidgetProps {
  listing: ListingDetail;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCounts;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  onGuestsChange: (guests: GuestCounts) => void;
  onReserve?: () => void;
  className?: string;
  showRareFind?: boolean;
}

export function BookingWidget({
  listing, checkIn, checkOut, guests, onCheckInChange, onCheckOutChange, onGuestsChange, onReserve, className, showRareFind = true,
}: BookingWidgetProps) {
  const [showModal, setShowModal] = useState(false);
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000)) : 2;
  const total = listing.pricePerNight * nights;
  const handleReserve = () => (onReserve ? onReserve() : setShowModal(true));

  return (
    <>
      {showRareFind && (listing.isRareFind || listing.isGuestFavorite) && <RareFindBanner />}
      <div className={`rounded-xl border border-border-default bg-white p-6 shadow-lg ${className ?? ""}`}>
        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-[22px] font-semibold underline decoration-1 underline-offset-2">{formatPrice(total)}</span>
          <span className="text-text-secondary">for {nights} nights</span>
        </div>
        <BookingFormFields checkIn={checkIn} checkOut={checkOut} guests={guests} onCheckInChange={onCheckInChange} onCheckOutChange={onCheckOutChange} onGuestsChange={onGuestsChange} />
        <div className="mb-4 rounded-lg bg-bg-subtle px-4 py-3 text-center text-sm">$0 today · Free cancellation</div>
        <Button fullWidth size="lg" onClick={handleReserve} className="rounded-lg">Reserve</Button>
        <p className="mt-3 text-center text-sm text-text-secondary">You won&apos;t be charged yet</p>
        <BookingPriceSummary listing={listing} nights={nights} total={total} checkIn={checkIn} checkOut={checkOut} />
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm reservation">
        <p className="mb-4 text-text-secondary">Your reservation at <strong>{listing.title}</strong> is ready to confirm.</p>
        <p className="mb-6 text-sm">Total: <strong>{formatPrice(total)}</strong> for {nights} nights</p>
        <Button fullWidth onClick={() => setShowModal(false)}>Confirm</Button>
      </Modal>
    </>
  );
}
