"use client";

import { MapToggle } from "@/components/catalog/MapToggle";
import { CatalogResultsGrid } from "@/components/catalog/CatalogResultsGrid";
import { Footer } from "@/components/layout/Footer";
import { MobileShell } from "@/components/layout/MobileShell";
import { MapPlaceholder } from "@/components/room/MapPlaceholder";
import type { Listing, SortOption } from "@/types";

interface GridProps {
  listings: Listing[];
  totalCount: number;
  sortBy: SortOption;
  currentPage: number;
  totalPages: number;
  onSortChange: (sort: SortOption) => void;
  onPageChange: (page: number) => void;
}

interface CatalogMobileContentProps {
  gridProps: GridProps;
  listings: Listing[];
  isMapVisible: boolean;
  isMobileSearchOpen: boolean;
  searchLabel: string;
  onSearchOpen: () => void;
  onMapToggle: () => void;
}

export function CatalogMobileContent({
  gridProps, listings, isMapVisible, isMobileSearchOpen, searchLabel, onSearchOpen, onMapToggle,
}: CatalogMobileContentProps) {
  return (
    <>
      <MobileShell variant="catalog" onSearchOpen={onSearchOpen} searchLabel={searchLabel} activeTab="explore" hideChrome={isMobileSearchOpen || isMapVisible}>
        <div className="px-4 py-4 sm:px-6">
          {isMapVisible ? <MapPlaceholder listings={listings} className="h-[calc(100dvh-8rem)] rounded-xl" /> : <CatalogResultsGrid {...gridProps} />}
        </div>
        {!isMapVisible && <Footer />}
      </MobileShell>
      {!isMobileSearchOpen && !isMapVisible && <MapToggle isVisible={isMapVisible} onToggle={onMapToggle} />}
    </>
  );
}
