"use client";

import { StarIcon } from "@/components/icons";
import { RatingBreakdown } from "@/components/room/RatingBreakdown";
import { ReviewCard } from "@/components/room/ReviewCard";
import type { ListingDetail, Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: ListingDetail["ratingBreakdown"];
  isGuestFavorite?: boolean;
}

export function ReviewsSection({ reviews, rating, reviewCount, ratingBreakdown, isGuestFavorite }: ReviewsSectionProps) {
  return (
    <div className="border-t border-border-light py-8">
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-1 text-2xl font-semibold">
          <StarIcon size={20} />
          {rating.toFixed(2)}
        </span>
        {isGuestFavorite && (
          <span className="rounded-lg border border-border-default px-3 py-1 text-sm font-medium">Guest favorite</span>
        )}
        <span className="text-text-secondary">{reviewCount} reviews</span>
      </div>
      <RatingBreakdown ratingBreakdown={ratingBreakdown} />
      <div className="hidden gap-8 md:grid md:grid-cols-2">
        {reviews.slice(0, 4).map((review) => <ReviewCard key={review.id} review={review} />)}
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
