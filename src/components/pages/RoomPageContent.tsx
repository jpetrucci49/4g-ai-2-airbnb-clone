"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { HeartIcon, ShareIcon, StarIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { MobileShell } from "@/components/layout/MobileShell";
import { Navbar } from "@/components/layout/Navbar";
import { AmenitiesList } from "@/components/room/AmenitiesList";
import { BedroomCards, ThingsToKnow } from "@/components/room/BedroomCards";
import { BookingWidget } from "@/components/room/BookingWidget";
import { GuestFavoriteBanner } from "@/components/room/GuestFavoriteBanner";
import { HostCard } from "@/components/room/HostCard";
import { MapPlaceholder } from "@/components/room/MapPlaceholder";
import { MobileBookingBar } from "@/components/room/MobileBookingBar";
import { PhotoCarousel, PhotoGrid } from "@/components/room/PhotoGrid";
import { ReviewsSection } from "@/components/room/ReviewsSection";
import { RoomSubNav } from "@/components/room/RoomSubNav";
import { DatePicker } from "@/components/search/DatePicker";
import { SearchBarMobile } from "@/components/search/SearchBarMobile";
import { SafeImage } from "@/components/ui/SafeImage";
import { defaultSearchState, searchStateToParams } from "@/lib/search";
import { formatPrice } from "@/lib/utils";
import type { ListingDetail } from "@/types";

interface RoomPageContentProps {
  listing: ListingDetail;
}

const highlightIcons: Record<string, string> = {
  trophy: "🏆",
  key: "🔑",
  location: "📍",
};

export function RoomPageContent({ listing }: RoomPageContentProps) {
  const router = useRouter();
  const [searchState, setSearchState] = useState(defaultSearchState);
  const [activePanel, setActivePanel] = useState<"where" | "when" | "who" | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(defaultSearchState.guests);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  const nights = useMemo(() => {
    if (checkIn && checkOut) {
      return Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000));
    }
    return 2;
  }, [checkIn, checkOut]);

  const total = listing.pricePerNight * nights;

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    router.push(`/catalog?${searchStateToParams(searchState).toString()}`);
  };

  const handleReserve = () => setShowReserveModal(true);

  const locationParts = listing.location.split(", ");
  const breadcrumbs = ["Airbnb", "United States", locationParts[1] ?? "Massachusetts", locationParts[0]];

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

      <RoomSubNav
        listing={listing}
        nights={nights}
        total={total}
        onReserve={handleReserve}
      />

      <MobileShell
        variant="room"
        onSearchOpen={() => setIsMobileSearchOpen(true)}
        searchLabel="Search destinations"
        activeTab="explore"
        hideChrome={isMobileSearchOpen}
        contentClassName="pb-[calc(10rem+env(safe-area-inset-bottom))] md:pb-0"
      >
        <PhotoCarousel images={listing.images} title={listing.title} />

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

          <PhotoGrid images={listing.images} title={listing.title} />

          <div className="mt-2 grid gap-12 md:mt-6 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="min-w-0">
              <div className="border-b border-border-light pb-6">
                <h1 className="text-xl font-semibold md:hidden">{listing.title}</h1>
                <p className="mt-1 text-sm font-medium sm:text-base">
                  {listing.type} in {listing.location}
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  {listing.maxGuests} guests · {listing.bedrooms.length} bedrooms ·{" "}
                  {listing.beds} beds · {listing.baths} baths
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 md:hidden">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <StarIcon size={12} />
                    {listing.rating.toFixed(2)}
                  </span>
                  <button type="button" className="text-sm underline">
                    ({listing.reviewCount} reviews)
                  </button>
                  {listing.isGuestFavorite && (
                    <span className="rounded-lg border border-border-default px-2 py-0.5 text-xs font-medium">
                      Guest favorite
                    </span>
                  )}
                </div>
              </div>

              {listing.isGuestFavorite && (
                <div className="hidden md:block">
                  <GuestFavoriteBanner rating={listing.rating} reviewCount={listing.reviewCount} />
                </div>
              )}

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
                <ul className="space-y-5">
                  {(listing.highlightDetails ?? listing.highlights.map((h) => ({ title: h, description: "", icon: "key" }))).map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="text-xl" aria-hidden>
                        {highlightIcons[item.icon] ?? "✓"}
                      </span>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {item.description && (
                          <p className="text-sm text-text-secondary">{item.description}</p>
                        )}
                      </div>
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
                  className="mt-3 rounded-lg border border-border-default px-4 py-2 text-sm font-semibold hover:bg-bg-subtle md:mt-2 md:border-0 md:p-0 md:underline md:hover:bg-transparent"
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              </div>

              <BedroomCards bedrooms={listing.bedrooms} />
              <div id="room-amenities">
                <AmenitiesList amenities={listing.amenities} />
              </div>
              <div id="room-reviews">
                <ReviewsSection
                  reviews={listing.reviews}
                  rating={listing.rating}
                  reviewCount={listing.reviewCount}
                  ratingBreakdown={listing.ratingBreakdown}
                  isGuestFavorite={listing.isGuestFavorite}
                />
              </div>

              <div className="border-t border-border-light py-8">
                <h2 className="mb-2 text-[22px] font-semibold">
                  {nights} nights in {locationParts[0]}
                </h2>
                {checkIn && checkOut && (
                  <p className="mb-6 text-sm text-text-secondary">
                    {checkIn.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {" – "}
                    {checkOut.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
                <DatePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onChange={(inDate, outDate) => {
                    setCheckIn(inDate);
                    setCheckOut(outDate);
                  }}
                  monthsToShow={2}
                />
              </div>

              <div id="room-location" className="border-t border-border-light py-8">
                <h2 className="mb-2 text-[22px] font-semibold">Where you&apos;ll be</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  {listing.location}, United States
                </p>
                <MapPlaceholder className="h-64 rounded-xl sm:h-80" />
                <p className="mt-4 text-sm text-text-secondary">
                  Exact location will be provided after booking.
                </p>
                <button type="button" className="mt-2 text-sm font-semibold underline">
                  Show more
                </button>
              </div>

              <HostCard host={listing.host} />
              <ThingsToKnow
                houseRules={listing.houseRules}
                safetyInfo={listing.safetyInfo}
                cancellationPolicy={listing.cancellationPolicy}
              />

              <nav className="flex flex-wrap items-center gap-1 py-6 text-sm text-text-secondary">
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb} className="flex items-center gap-1">
                    {i > 0 && <span>›</span>}
                    {i < breadcrumbs.length - 1 ? (
                      <Link href="#" className="hover:underline">{crumb}</Link>
                    ) : (
                      <span>{crumb}</span>
                    )}
                  </span>
                ))}
              </nav>
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
                  onReserve={handleReserve}
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </MobileShell>

      <MobileBookingBar
        listing={listing}
        nights={nights}
        total={total}
        onReserve={handleReserve}
      />

      <SearchBarMobile
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        state={searchState}
        onStateChange={setSearchState}
        onSearch={handleSearch}
      />

      {showReserveModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 md:items-center">
          <div className="w-full max-w-md rounded-t-2xl bg-white p-6 md:rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold">Confirm reservation</h3>
            <p className="mb-4 text-sm text-text-secondary">
              Total: <strong>{formatPrice(total)}</strong> for {nights} nights at {listing.title}
            </p>
            <button
              type="button"
              onClick={() => setShowReserveModal(false)}
              className="w-full rounded-lg bg-brand py-3 font-semibold text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}
