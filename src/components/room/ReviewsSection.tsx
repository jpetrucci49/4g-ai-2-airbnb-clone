"use client";

import { StarIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ListingDetail, Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: ListingDetail["ratingBreakdown"];
  isGuestFavorite?: boolean;
}

const categories = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "accuracy", label: "Accuracy" },
  { key: "checkin", label: "Check-in" },
  { key: "communication", label: "Communication" },
  { key: "location", label: "Location" },
  { key: "value", label: "Value" },
] as const;

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative size-10 overflow-hidden rounded-full">
          <SafeImage src={review.avatar} alt={review.author} fill sizes="40px" />
        </div>
        <div>
          <p className="font-medium">{review.author}</p>
          <p className="text-sm text-text-secondary">{review.location}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="flex items-center gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarIcon key={i} size={10} />
          ))}
        </span>
        <span className="text-text-secondary">{review.date}</span>
      </div>
      <p className="text-sm text-text-secondary line-clamp-4">{review.text}</p>
    </div>
  );
}

export function ReviewsSection({
  reviews,
  rating,
  reviewCount,
  ratingBreakdown,
  isGuestFavorite,
}: ReviewsSectionProps) {
  return (
    <div className="border-t border-border-light py-8">
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-1 text-2xl font-semibold">
          <StarIcon size={20} />
          {rating.toFixed(2)}
        </span>
        {isGuestFavorite && (
          <span className="rounded-lg border border-border-default px-3 py-1 text-sm font-medium">
            Guest favorite
          </span>
        )}
        <span className="text-text-secondary">{reviewCount} reviews</span>
      </div>

      <div className="mb-8 hidden gap-8 md:grid md:grid-cols-2">
        {categories.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <span className="w-28 text-sm">{label}</span>
            <div className="h-1 flex-1 rounded-full bg-border-light">
              <div
                className="h-full rounded-full bg-text-primary"
                style={{ width: `${(ratingBreakdown[key] / 5) * 100}%` }}
              />
            </div>
            <span className="w-8 text-sm font-medium">{ratingBreakdown[key].toFixed(1)}</span>
          </div>
        ))}
      </div>

      <div className="hidden gap-8 md:grid md:grid-cols-2">
        {reviews.slice(0, 4).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">
        {reviews.map((review) => (
          <div key={review.id} className="w-72 shrink-0 rounded-xl border border-border-light p-4">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <button type="button" className="mt-6 rounded-lg border border-text-primary px-6 py-3 text-sm font-semibold hover:bg-bg-subtle">
        Show all {reviewCount} reviews
      </button>
    </div>
  );
}
