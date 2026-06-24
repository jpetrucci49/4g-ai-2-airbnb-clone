import { AmenitiesList } from "@/components/room/AmenitiesList";
import { BedroomCards, ThingsToKnow } from "@/components/room/BedroomCards";
import { HostCard } from "@/components/room/HostCard";
import { ReviewsSection } from "@/components/room/ReviewsSection";
import { RoomBreadcrumbs, RoomCalendarSection, RoomLocationSection } from "@/components/room/RoomSections";
import { RoomOverview } from "@/components/room/RoomOverview";
import type { ListingDetail } from "@/types";

interface RoomMainColumnProps {
  listing: ListingDetail;
  nights: number;
  checkIn: Date | null;
  checkOut: Date | null;
  isDescriptionExpanded: boolean;
  onToggleDescription: () => void;
  onDateChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

export function RoomMainColumn({
  listing,
  nights,
  checkIn,
  checkOut,
  isDescriptionExpanded,
  onToggleDescription,
  onDateChange,
}: RoomMainColumnProps) {
  const locationParts = listing.location.split(", ");
  const breadcrumbs = ["Airbnb", "United States", locationParts[1] ?? "Massachusetts", locationParts[0]];

  return (
    <div className="min-w-0">
      <RoomOverview
        listing={listing}
        isDescriptionExpanded={isDescriptionExpanded}
        onToggleDescription={onToggleDescription}
      />
      <BedroomCards bedrooms={listing.bedrooms} />
      <div id="room-amenities"><AmenitiesList amenities={listing.amenities} /></div>
      <div id="room-reviews">
        <ReviewsSection
          reviews={listing.reviews}
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          ratingBreakdown={listing.ratingBreakdown}
          isGuestFavorite={listing.isGuestFavorite}
        />
      </div>
      <RoomCalendarSection
        city={locationParts[0]}
        nights={nights}
        checkIn={checkIn}
        checkOut={checkOut}
        onDateChange={onDateChange}
      />
      <RoomLocationSection location={listing.location} />
      <HostCard host={listing.host} />
      <ThingsToKnow
        houseRules={listing.houseRules}
        safetyInfo={listing.safetyInfo}
        cancellationPolicy={listing.cancellationPolicy}
      />
      <RoomBreadcrumbs crumbs={breadcrumbs} />
    </div>
  );
}
