import type { SortOption, Listing } from "@/types";
import { CatalogResultsGrid } from "./CatalogResultsGrid";
import { MapPlaceholder } from "@/components/room/MapPlaceholder";

interface GridProps {
  listings: Listing[];
  totalCount: number;
  sortBy: SortOption;
  currentPage: number;
  totalPages: number;
  onSortChange: (sort: SortOption) => void;
  onPageChange: (page: number) => void;
}

interface CatalogDesktopLayoutProps {
  listings: Listing[];
  gridProps: GridProps;
}

export function CatalogDesktopLayout({ listings, gridProps }: CatalogDesktopLayoutProps) {
  return (
    <div className="hidden min-w-0 lg:flex lg:h-[calc(100vh-140px)]">
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 lg:max-w-[55%]">
        <CatalogResultsGrid {...gridProps} />
      </div>
      <div className="sticky top-[140px] w-[45%] shrink-0 self-start">
        <MapPlaceholder listings={listings} className="h-[calc(100vh-140px)]" />
      </div>
    </div>
  );
}
