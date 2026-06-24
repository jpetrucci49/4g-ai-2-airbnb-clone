import Link from "next/link";
import { DatePicker } from "@/components/search/DatePicker";
import { MapPlaceholder } from "@/components/room/MapPlaceholder";

interface RoomCalendarSectionProps {
  city: string;
  nights: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onDateChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

export function RoomCalendarSection({ city, nights, checkIn, checkOut, onDateChange }: RoomCalendarSectionProps) {
  return (
    <div className="border-t border-border-light py-8">
      <h2 className="mb-2 text-[22px] font-semibold">{nights} nights in {city}</h2>
      {checkIn && checkOut && (
        <p className="mb-6 text-sm text-text-secondary">
          {checkIn.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          {" – "}
          {checkOut.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      )}
      <DatePicker checkIn={checkIn} checkOut={checkOut} onChange={onDateChange} monthsToShow={2} />
    </div>
  );
}

interface RoomLocationSectionProps {
  location: string;
}

export function RoomLocationSection({ location }: RoomLocationSectionProps) {
  return (
    <div id="room-location" className="border-t border-border-light py-8">
      <h2 className="mb-2 text-[22px] font-semibold">Where you&apos;ll be</h2>
      <p className="mb-4 text-sm text-text-secondary">{location}, United States</p>
      <MapPlaceholder className="h-64 rounded-xl sm:h-80" />
      <p className="mt-4 text-sm text-text-secondary">Exact location will be provided after booking.</p>
      <button type="button" className="mt-2 text-sm font-semibold underline">Show more</button>
    </div>
  );
}

interface RoomBreadcrumbsProps {
  crumbs: string[];
}

export function RoomBreadcrumbs({ crumbs }: RoomBreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1 py-6 text-sm text-text-secondary">
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-1">
          {i > 0 && <span>›</span>}
          {i < crumbs.length - 1 ? <Link href="#" className="hover:underline">{crumb}</Link> : <span>{crumb}</span>}
        </span>
      ))}
    </nav>
  );
}
