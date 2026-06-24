"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { StarIcon } from "@/components/icons";
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
  className?: string;
}

export function BookingWidget({
  listing,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  className,
}: BookingWidgetProps) {
  const [showModal, setShowModal] = useState(false);
  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000))
      : 2;
  const total = listing.pricePerNight * nights;

  const handleReserve = () => setShowModal(true);

  return (
    <>
      <div
        className={`rounded-xl border border-border-default bg-white p-6 shadow-lg ${className ?? ""}`}
      >
        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-[22px] font-semibold">
            {formatPrice(listing.pricePerNight)}
          </span>
          <span className="text-text-secondary">night</span>
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

        {listing.isGuestFavorite && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-bg-subtle p-3 text-sm">
            <span>🏆</span>
            <span className="font-medium">Guest favorite</span>
            <span className="text-text-secondary">· One of the most loved homes</span>
          </div>
        )}

        <button type="button" className="mt-4 text-sm text-text-secondary underline">
          Report this listing
        </button>
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

interface HostCardProps {
  host: ListingDetail["host"];
}

export function HostCard({ host }: HostCardProps) {
  return (
    <div className="border-t border-border-light py-8">
      <div className="flex items-start gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
          <SafeImage src={host.avatar} alt={host.name} fill sizes="64px" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Hosted by {host.name}</h3>
          {host.isSuperhost && (
            <p className="text-sm text-text-secondary">Superhost · {host.yearsHosting} years hosting</p>
          )}
          <div className="mt-2 flex gap-4 text-sm text-text-secondary">
            <span>{host.reviewCount} reviews</span>
            <span className="flex items-center gap-0.5">
              <StarIcon size={12} />
              {host.rating} rating
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-text-secondary">{host.bio}</p>
      <div className="mt-4 space-y-1 text-sm text-text-secondary">
        <p>Response rate: {host.responseRate}</p>
        <p>Responds {host.responseTime}</p>
      </div>
      <Button variant="outline" className="mt-4">
        Message host
      </Button>
    </div>
  );
}
