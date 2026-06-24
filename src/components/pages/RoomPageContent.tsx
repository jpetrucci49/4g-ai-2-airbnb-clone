"use client";

import { Footer } from "@/components/layout/Footer";
import { MobileShell } from "@/components/layout/MobileShell";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBookingBar } from "@/components/room/MobileBookingBar";
import { PhotoCarousel } from "@/components/room/PhotoCarousel";
import { PhotoGrid } from "@/components/room/PhotoGrid";
import { ReserveConfirmModal } from "@/components/room/ReserveConfirmModal";
import { RoomBookingSidebar } from "@/components/room/RoomBookingSidebar";
import { RoomDesktopHeader } from "@/components/room/RoomDesktopHeader";
import { RoomMainColumn } from "@/components/room/RoomMainColumn";
import { RoomSubNav } from "@/components/room/RoomSubNav";
import { SearchBarMobile } from "@/components/search/SearchBarMobile";
import { useRoomPageState } from "@/hooks/useRoomPageState";
import type { ListingDetail } from "@/types";

interface RoomPageContentProps {
  listing: ListingDetail;
}

export function RoomPageContent({ listing }: RoomPageContentProps) {
  const state = useRoomPageState();
  const total = listing.pricePerNight * state.nights;

  return (
    <>
      <Navbar variant="room" searchState={state.searchState} activePanel={state.activePanel} onPanelChange={state.setActivePanel} onSearchStateChange={state.setSearchState} onSearch={state.handleSearch} />
      <RoomSubNav listing={listing} nights={state.nights} total={total} onReserve={state.handleReserve} />
      <MobileShell variant="room" onSearchOpen={() => state.setIsMobileSearchOpen(true)} searchLabel="Search destinations" activeTab="explore" hideChrome={state.isMobileSearchOpen} contentClassName="pb-[calc(10rem+env(safe-area-inset-bottom))] md:pb-0">
        <PhotoCarousel images={listing.images} title={listing.title} />
        <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          <RoomDesktopHeader title={listing.title} />
          <PhotoGrid images={listing.images} title={listing.title} />
          <div className="mt-2 grid gap-12 md:mt-6 lg:grid-cols-[1fr_380px] lg:gap-16">
            <RoomMainColumn listing={listing} nights={state.nights} checkIn={state.checkIn} checkOut={state.checkOut} isDescriptionExpanded={state.isDescriptionExpanded} onToggleDescription={() => state.setIsDescriptionExpanded(!state.isDescriptionExpanded)} onDateChange={(a, b) => { state.setCheckIn(a); state.setCheckOut(b); }} />
            <RoomBookingSidebar listing={listing} checkIn={state.checkIn} checkOut={state.checkOut} guests={state.guests} onCheckInChange={state.setCheckIn} onCheckOutChange={state.setCheckOut} onGuestsChange={state.setGuests} onReserve={state.handleReserve} />
          </div>
        </main>
        <Footer />
      </MobileShell>
      <MobileBookingBar listing={listing} nights={state.nights} total={total} onReserve={state.handleReserve} />
      <SearchBarMobile isOpen={state.isMobileSearchOpen} onClose={() => state.setIsMobileSearchOpen(false)} state={state.searchState} onStateChange={state.setSearchState} onSearch={state.handleSearch} />
      {state.showReserveModal && <ReserveConfirmModal title={listing.title} total={total} nights={state.nights} onClose={() => state.setShowReserveModal(false)} />}
    </>
  );
}
