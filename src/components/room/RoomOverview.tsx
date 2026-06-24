import { StarIcon } from "@/components/icons";
import { GuestFavoriteBanner } from "@/components/room/GuestFavoriteBanner";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ListingDetail } from "@/types";

const highlightIcons: Record<string, string> = { trophy: "🏆", key: "🔑", location: "📍" };

interface RoomOverviewProps {
  listing: ListingDetail;
  isDescriptionExpanded: boolean;
  onToggleDescription: () => void;
}

export function RoomOverview({ listing, isDescriptionExpanded, onToggleDescription }: RoomOverviewProps) {
  return (
    <>
      <div className="border-b border-border-light pb-6">
        <h1 className="text-xl font-semibold md:hidden">{listing.title}</h1>
        <p className="mt-1 text-sm font-medium sm:text-base">{listing.type} in {listing.location}</p>
        <p className="mt-2 text-sm text-text-secondary">
          {listing.maxGuests} guests · {listing.bedrooms.length} bedrooms · {listing.beds} beds · {listing.baths} baths
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 md:hidden">
          <span className="flex items-center gap-1 text-sm font-medium"><StarIcon size={12} />{listing.rating.toFixed(2)}</span>
          <button type="button" className="text-sm underline">({listing.reviewCount} reviews)</button>
          {listing.isGuestFavorite && (
            <span className="rounded-lg border border-border-default px-2 py-0.5 text-xs font-medium">Guest favorite</span>
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
            {listing.host.isSuperhost && "Superhost · "}{listing.host.yearsHosting} years hosting
          </p>
        </div>
      </div>
      <div className="border-b border-border-light py-6">
        <ul className="space-y-5">
          {(listing.highlightDetails ?? listing.highlights.map((h) => ({ title: h, description: "", icon: "key" }))).map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="text-xl" aria-hidden>{highlightIcons[item.icon] ?? "✓"}</span>
              <div>
                <p className="font-medium">{item.title}</p>
                {item.description && <p className="text-sm text-text-secondary">{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b border-border-light py-6">
        <p className={`text-sm sm:text-base ${isDescriptionExpanded ? "" : "line-clamp-3"}`}>{listing.description}</p>
        <button type="button" onClick={onToggleDescription} className="mt-3 rounded-lg border border-border-default px-4 py-2 text-sm font-semibold hover:bg-bg-subtle md:mt-2 md:border-0 md:p-0 md:underline md:hover:bg-transparent">
          {isDescriptionExpanded ? "Show less" : "Show more"}
        </button>
      </div>
    </>
  );
}
