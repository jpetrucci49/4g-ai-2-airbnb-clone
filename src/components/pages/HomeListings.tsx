import { ListingSection } from "@/components/listings/ListingSection";
import { ListingSectionSkeleton } from "@/components/ui/Skeleton";
import type { ListingSection as ListingSectionType } from "@/types";

interface HomeListingsProps {
  isLoading: boolean;
  sections: ListingSectionType[];
}

export function HomeListings({ isLoading, sections }: HomeListingsProps) {
  if (isLoading) {
    return (
      <div className="space-y-10">
        {Array.from({ length: 4 }).map((_, i) => <ListingSectionSkeleton key={i} />)}
      </div>
    );
  }

  return sections.map((section) => <ListingSection key={section.id} section={section} />);
}
