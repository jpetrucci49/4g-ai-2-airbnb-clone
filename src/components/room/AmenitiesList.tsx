import type { Amenity } from "@/types";
import { Button } from "@/components/ui/Button";

const amenityIcons: Record<string, string> = {
  kitchen: "🍳",
  wifi: "📶",
  parking: "🅿️",
  pets: "🐾",
  ac: "❄️",
  washer: "🧺",
  dryer: "💨",
  tv: "📺",
  patio: "🌿",
  grill: "🔥",
};

interface AmenitiesListProps {
  amenities: Amenity[];
  maxVisible?: number;
}

export function AmenitiesList({ amenities, maxVisible = 6 }: AmenitiesListProps) {
  const visible = amenities.slice(0, maxVisible);
  const remaining = amenities.length - maxVisible;

  return (
    <div className="border-t border-border-light py-8">
      <h2 className="mb-6 text-[22px] font-semibold">What this place offers</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-4 text-text-primary">
            <span className="text-xl">{amenityIcons[amenity.icon] ?? "✓"}</span>
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <Button variant="outline" className="mt-6">
          Show all {amenities.length} amenities
        </Button>
      )}
    </div>
  );
}
