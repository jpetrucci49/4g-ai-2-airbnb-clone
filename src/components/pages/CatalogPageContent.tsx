"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/catalog/Pagination";
import { MapToggle } from "@/components/catalog/MapToggle";
import { ResultsHeader } from "@/components/catalog/ResultsHeader";
import { Footer } from "@/components/layout/Footer";
import { MobileShell } from "@/components/layout/MobileShell";
import { Navbar } from "@/components/layout/Navbar";
import { StickyCatalogNav } from "@/components/layout/StickyCatalogNav";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { SearchBarMobile } from "@/components/search/SearchBarMobile";
import { MapPlaceholder } from "@/components/room/MapPlaceholder";
import { filterListings } from "@/data/listings";
import { paramsToSearchState, searchStateToParams } from "@/lib/search";
import type { SearchState, SortOption } from "@/types";

const PAGE_SIZE = 18;

function sortListings<T extends { pricePerNight: number; rating: number }>(
  items: T[],
  sortBy: SortOption,
): T[] {
  const copy = [...items];
  switch (sortBy) {
    case "price-asc":
      return copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case "price-desc":
      return copy.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case "rating-desc":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

export function CatalogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchState, setSearchState] = useState<SearchState>(() =>
    paramsToSearchState(searchParams),
  );
  const [activePanel, setActivePanel] = useState<"where" | "when" | "who" | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const destination = searchParams.get("destination") ?? "";
  const region = searchParams.get("region") ?? "";

  const filtered = useMemo(() => {
    return sortListings(filterListings({ destination, region }), sortBy);
  }, [destination, region, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    router.push(`/catalog?${searchStateToParams(searchState).toString()}`);
  };

  const searchLabel = searchState.destination || destination || "Search destinations";

  const resultsGrid = (
    <>
      <ResultsHeader totalCount={filtered.length} sortBy={sortBy} onSortChange={setSortBy} />
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {visible.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} variant="catalog" />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-text-secondary">
          No stays match your search. Try Cape Cod, Boston, or Portland.
        </p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );

  return (
    <>
      <Navbar
        variant="catalog"
        searchState={searchState}
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onSearchStateChange={setSearchState}
        onSearch={handleSearch}
      />

      <div className="hidden min-w-0 lg:flex lg:h-[calc(100vh-140px)]">
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 lg:max-w-[55%]">{resultsGrid}</div>
        <div className="sticky top-[140px] w-[45%] shrink-0 self-start">
          <MapPlaceholder listings={visible} className="h-[calc(100vh-140px)]" />
        </div>
      </div>

      <MobileShell
        variant="catalog"
        onSearchOpen={() => setIsMobileSearchOpen(true)}
        searchLabel={searchLabel}
        activeTab="explore"
        hideChrome={isMobileSearchOpen || isMapVisible}
      >
        <div className="px-4 py-4 sm:px-6">
          {isMapVisible ? (
            <MapPlaceholder listings={visible} className="h-[calc(100dvh-8rem)] rounded-xl" />
          ) : (
            resultsGrid
          )}
        </div>
        {!isMapVisible && <Footer />}
      </MobileShell>

      <StickyCatalogNav
        searchState={searchState}
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onSearchStateChange={setSearchState}
        onSearch={handleSearch}
      />

      {!isMobileSearchOpen && !isMapVisible && (
        <MapToggle isVisible={isMapVisible} onToggle={() => setIsMapVisible(!isMapVisible)} />
      )}

      <SearchBarMobile
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        state={searchState}
        onStateChange={setSearchState}
        onSearch={handleSearch}
      />
    </>
  );
}
