"use client";

import { useState } from "react";
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

export function RareFindBanner() {
  return (
    <div className="mb-3 flex items-center gap-2 rounded-xl border border-border-default bg-white px-4 py-3 text-sm shadow-sm">
      <span className="text-brand" aria-hidden>◆</span>
      <span>
        <span className="font-semibold">Rare find!</span> This place is usually booked
      </span>
    </div>
  );
}

export function BookingWidget({
  listing,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onReserve,
  className,
  showRareFind = true,
}: BookingWidgetProps) {
  const [showModal, setShowModal] = useState(false);
  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000))
      : 2;
  const total = listing.pricePerNight * nights;

  const handleReserve = () => {
    if (onReserve) onReserve();
    else setShowModal(true);
  };

  return (
    <>
      {showRareFind && (listing.isRareFind || listing.isGuestFavorite) && <RareFindBanner />}

      <div
        className={`rounded-xl border border-border-default bg-white p-6 shadow-lg ${className ?? ""}`}
      >
        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-[22px] font-semibold underline decoration-1 underline-offset-2">
            {formatPrice(total)}
          </span>
          <span className="text-text-secondary">for {nights} nights</span>
        </div>

        <div className="mb-4 overflow-hidden rounded-lg border border-border-default">
          <div className="grid grid-cols-2 border-b border-border-default">
            <label className="border-r border-border-default p-3">
              <span className="block text-[10px] font-bold uppercase">Check-in</span>
              <input
                type="date"
                value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  onCheckInChange(e.target.value ? new Date(e.target.value) : null)
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <label className="p-3">
              <span className="block text-[10px] font-bold uppercase">Checkout</span>
              <input
                type="date"
                value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  onCheckOutChange(e.target.value ? new Date(e.target.value) : null)
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>
          <label className="block p-3">
            <span className="block text-[10px] font-bold uppercase">Guests</span>
            <select
              value={guests.adults}
              onChange={(e) =>
                onGuestsChange({ ...guests, adults: Number(e.target.value) })
              }
              className="w-full bg-transparent text-sm outline-none"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} guest{n !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4 rounded-lg bg-bg-subtle px-4 py-3 text-center text-sm">
          $0 today · Free cancellation
        </div>

        <Button fullWidth size="lg" onClick={handleReserve} className="rounded-lg">
          Reserve
        </Button>
        <p className="mt-3 text-center text-sm text-text-secondary">
          You won&apos;t be charged yet
        </p>

        {checkIn && checkOut && (
          <div className="mt-4 space-y-2 border-t border-border-light pt-4 text-sm">
            <div className="flex justify-between">
              <span className="underline">
                {formatPrice(listing.pricePerNight)} x {nights} nights
              </span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm reservation">
        <p className="mb-4 text-text-secondary">
          Your reservation at <strong>{listing.title}</strong> is ready to confirm.
        </p>
        <p className="mb-6 text-sm">
          Total: <strong>{formatPrice(total)}</strong> for {nights} nights
        </p>
        <Button fullWidth onClick={() => setShowModal(false)}>
          Confirm
        </Button>
      </Modal>
    </>
  );
}
