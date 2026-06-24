import type { ListingDetail } from "@/types";

const categories = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "accuracy", label: "Accuracy" },
  { key: "checkin", label: "Check-in" },
  { key: "communication", label: "Communication" },
  { key: "location", label: "Location" },
  { key: "value", label: "Value" },
] as const;

interface RatingBreakdownProps {
  ratingBreakdown: ListingDetail["ratingBreakdown"];
}

export function RatingBreakdown({ ratingBreakdown }: RatingBreakdownProps) {
  return (
    <div className="mb-8 hidden gap-8 md:grid md:grid-cols-2">
      {categories.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-4">
          <span className="w-28 text-sm">{label}</span>
          <div className="h-1 flex-1 rounded-full bg-border-light">
            <div className="h-full rounded-full bg-text-primary" style={{ width: `${(ratingBreakdown[key] / 5) * 100}%` }} />
          </div>
          <span className="w-8 text-sm font-medium">{ratingBreakdown[key].toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}
