import { BookingWidget } from "@/components/room/BookingWidget";
import type { GuestCounts, ListingDetail } from "@/types";

interface RoomBookingSidebarProps {
  listing: ListingDetail;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCounts;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  onGuestsChange: (guests: GuestCounts) => void;
  onReserve: () => void;
}

export function RoomBookingSidebar(props: RoomBookingSidebarProps) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-28">
        <BookingWidget {...props} />
      </div>
    </div>
  );
}
