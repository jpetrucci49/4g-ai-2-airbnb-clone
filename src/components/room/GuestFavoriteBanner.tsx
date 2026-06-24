import { StarIcon } from "@/components/icons";

interface GuestFavoriteBannerProps {
  rating: number;
  reviewCount: number;
}

export function GuestFavoriteBanner({ rating, reviewCount }: GuestFavoriteBannerProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-border-default px-6 py-5">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>🏆</span>
        <div>
          <p className="font-semibold">Guest favorite</p>
          <p className="text-sm text-text-secondary">
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <div className="h-10 w-px bg-border-default" />
        <div className="text-center">
          <p className="flex items-center justify-center gap-1 text-lg font-semibold">
            <StarIcon size={14} />
            {rating.toFixed(2)}
          </p>
          <button type="button" className="text-sm underline">
            {reviewCount} reviews
          </button>
        </div>
      </div>
    </div>
  );
}
