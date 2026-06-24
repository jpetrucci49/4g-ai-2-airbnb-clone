import type { GuestCounts } from "@/types";

interface BookingFormFieldsProps {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCounts;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  onGuestsChange: (guests: GuestCounts) => void;
}

export function BookingFormFields({
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
}: BookingFormFieldsProps) {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-border-default">
      <div className="grid grid-cols-2 border-b border-border-default">
        <label className="border-r border-border-default p-3">
          <span className="block text-[10px] font-bold uppercase">Check-in</span>
          <input
            type="date"
            value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
            onChange={(e) => onCheckInChange(e.target.value ? new Date(e.target.value) : null)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <label className="p-3">
          <span className="block text-[10px] font-bold uppercase">Checkout</span>
          <input
            type="date"
            value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
            onChange={(e) => onCheckOutChange(e.target.value ? new Date(e.target.value) : null)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>
      <label className="block p-3">
        <span className="block text-[10px] font-bold uppercase">Guests</span>
        <select
          value={guests.adults}
          onChange={(e) => onGuestsChange({ ...guests, adults: Number(e.target.value) })}
          className="w-full bg-transparent text-sm outline-none"
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} guest{n !== 1 ? "s" : ""}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
