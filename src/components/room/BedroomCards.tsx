import { SafeImage } from "@/components/ui/SafeImage";
import type { Bedroom } from "@/types";

interface BedroomCardsProps {
  bedrooms: Bedroom[];
}

export function BedroomCards({ bedrooms }: BedroomCardsProps) {
  return (
    <div className="border-t border-border-light py-8">
      <h2 className="mb-6 text-[22px] font-semibold">Where you&apos;ll sleep</h2>
      <div className="flex gap-4 overflow-x-auto">
        {bedrooms.map((bedroom) => (
          <div key={bedroom.id} className="w-48 shrink-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <SafeImage
                src={bedroom.image}
                alt={bedroom.name}
                fill
                sizes="200px"
              />
            </div>
            <p className="mt-2 font-medium">{bedroom.name}</p>
            <p className="text-sm text-text-secondary">{bedroom.bedType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ThingsToKnowProps {
  houseRules: string[];
  safetyInfo: string[];
  cancellationPolicy: string;
}

export function ThingsToKnow({
  houseRules,
  safetyInfo,
  cancellationPolicy,
}: ThingsToKnowProps) {
  const sections = [
    { title: "House rules", items: houseRules },
    { title: "Safety & property", items: safetyInfo },
    { title: "Cancellation policy", items: [cancellationPolicy] },
  ];

  return (
    <div className="border-t border-border-light py-8">
      <h2 className="mb-6 text-[22px] font-semibold">Things to know</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 font-semibold">{section.title}</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button type="button" className="mt-3 text-sm font-semibold underline">
              Show more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
