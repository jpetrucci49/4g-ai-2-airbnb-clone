import { StarIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
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
          {Array.from({ length: review.rating }).map((_, i) => <StarIcon key={i} size={10} />)}
        </span>
        <span className="text-text-secondary">{review.date}</span>
      </div>
      <p className="line-clamp-4 text-sm text-text-secondary">{review.text}</p>
    </div>
  );
}
