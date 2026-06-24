"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeftIcon, HeartIcon, ShareIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { MobileShell } from "@/components/layout/MobileShell";
import { Navbar } from "@/components/layout/Navbar";
import { SafeImage } from "@/components/ui/SafeImage";
import { AmenitiesList } from "@/components/room/AmenitiesList";
import { BedroomCards, ThingsToKnow } from "@/components/room/BedroomCards";
import { BookingWidget, HostCard } from "@/components/room/BookingWidget";
import { MapPlaceholder } from "@/components/room/MapPlaceholder";
import { PhotoCarousel, PhotoGrid } from "@/components/room/PhotoGrid";
import { ReviewsSection } from "@/components/room/ReviewsSection";
import { SearchBarMobile } from "@/components/search/SearchBarMobile";
import { defaultSearchState, searchStateToParams } from "@/lib/search";
import type { ListingDetail } from "@/types";

interface RoomPageContentProps {
  listing: ListingDetail;
}

export function RoomPageContent({ listing }: RoomPageContentProps) {
  const router = useRouter();
  const [searchState, setSearchState] = useState(defaultSearchState);
  const [activePanel, setActivePanel] = useState<"where" | "when" | "who" | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(defaultSearchState.guests);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    router.push(`/catalog?${searchStateToParams(searchState).toString()}`);
  };

  const roomTopNav = (
    <div className="flex items-center gap-3 border-b border-border-light bg-white px-4 py-3">
      <Link
        href="/catalog"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-default"
        aria-label="Back to catalog"
      >
        <ChevronLeftIcon size={16} />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{listing.title}</p>
        <p className="truncate text-xs text-text-secondary">{listing.location}</p>
      </div>
      <Link href="/" className="shrink-0 text-xs font-semibold text-brand">
        Home
      </Link>
    </div>
  );

  return (
    <>
      <Navbar
        variant="room"
        searchState={searchState}
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onSearchStateChange={setSearchState}
        onSearch={handleSearch}
      />

      <MobileShell
        variant="room"
        topNav={roomTopNav}
        onSearchOpen={() => setIsMobileSearchOpen(true)}
        searchLabel="Search destinations"
        activeTab="explore"
        hideChrome={isMobileSearchOpen}
      >
        <div className="relative overflow-hidden md:hidden">
          <PhotoCarousel images={listing.images} title={listing.title} />
        </div>

        <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          <div className="mb-4 hidden items-start justify-between md:flex">
            <h1 className="text-[26px] font-semibold">{listing.title}</h1>
            <div className="flex gap-4">
              <button type="button" className="flex items-center gap-2 text-sm font-medium underline">
                <ShareIcon size={14} /> Share
              </button>
              <button type="button" className="flex items-center gap-2 text-sm font-medium underline">
                <HeartIcon size={14} /> Save
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <PhotoGrid images={listing.images} title={listing.title} />
          </div>

          <div className="mt-2 grid gap-12 md:mt-6 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="min-w-0">
              <div className="border-b border-border-light pb-6">
                <h1 className="text-xl font-semibold md:hidden">{listing.title}</h1>
                <p className="mt-1 text-sm text-text-secondary sm:text-base">
                  {listing.type} in {listing.location}
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  {listing.maxGuests} guests · {listing.bedrooms.length} bedrooms ·{" "}
                  {listing.beds} beds · {listing.baths} baths
                </p>
              </div>

              <div className="flex items-center gap-4 border-b border-border-light py-6">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  <SafeImage src={listing.host.avatar} alt={listing.host.name} fill sizes="48px" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">Hosted by {listing.host.name}</p>
                  <p className="text-sm text-text-secondary">
                    {listing.host.isSuperhost && "Superhost · "}
                    {listing.host.yearsHosting} years hosting
                  </p>
                </div>
              </div>

              <div className="border-b border-border-light py-6">
                <ul className="space-y-3 text-sm sm:text-base">
                  {listing.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span>✓</span>
                      <span className="font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-border-light py-6">
                <p className={`text-sm sm:text-base ${isDescriptionExpanded ? "" : "line-clamp-3"}`}>
                  {listing.description}
                </p>
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-2 text-sm font-semibold underline"
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              </div>

              <div className="lg:hidden">
                <BookingWidget
                  listing={listing}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                  onCheckInChange={setCheckIn}
                  onCheckOutChange={setCheckOut}
                  onGuestsChange={setGuests}
                  className="my-8"
                />
              </div>

              <BedroomCards bedrooms={listing.bedrooms} />
              <AmenitiesList amenities={listing.amenities} />
              <ReviewsSection
                reviews={listing.reviews}
                rating={listing.rating}
                reviewCount={listing.reviewCount}
                ratingBreakdown={listing.ratingBreakdown}
                isGuestFavorite={listing.isGuestFavorite}
              />
              <div className="border-t border-border-light py-8">
                <h2 className="mb-4 text-lg font-semibold">Where you&apos;ll be</h2>
                <MapPlaceholder className="h-64 rounded-xl sm:h-80" />
              </div>
              <HostCard host={listing.host} />
              <ThingsToKnow
                houseRules={listing.houseRules}
                safetyInfo={listing.safetyInfo}
                cancellationPolicy={listing.cancellationPolicy}
              />
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-28">
                <BookingWidget
                  listing={listing}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                  onCheckInChange={setCheckIn}
                  onCheckOutChange={setCheckOut}
                  onGuestsChange={setGuests}
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </MobileShell>

      <SearchBarMobile
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        state={searchState}
        onStateChange={setSearchState}
        onSearch={handleSearch}
      />
    </>
  );
}
