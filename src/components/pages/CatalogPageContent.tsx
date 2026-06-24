"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CatalogDesktopLayout } from "@/components/catalog/CatalogDesktopLayout";
import { CatalogMobileContent } from "@/components/catalog/CatalogMobileContent";
import { Navbar } from "@/components/layout/Navbar";
import { StickyCatalogNav } from "@/components/layout/StickyCatalogNav";
import { SearchBarMobile } from "@/components/search/SearchBarMobile";
import { filterListings } from "@/data/listings";
import { paramsToSearchState, searchStateToParams } from "@/lib/search";
import { sortListings } from "@/lib/sortListings";
import type { SearchState, SortOption } from "@/types";

const PAGE_SIZE = 18;

export function CatalogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchState, setSearchState] = useState<SearchState>(() => paramsToSearchState(searchParams));
  const [activePanel, setActivePanel] = useState<"where" | "when" | "who" | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const destination = searchParams.get("destination") ?? "";
  const region = searchParams.get("region") ?? "";
  const filtered = useMemo(() => sortListings(filterListings({ destination, region }), sortBy), [destination, region, sortBy]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    router.push(`/catalog?${searchStateToParams(searchState).toString()}`);
  };

  const gridProps = { listings: visible, totalCount: filtered.length, sortBy, currentPage, totalPages, onSortChange: setSortBy, onPageChange: setCurrentPage };

  return (
    <>
      <Navbar variant="catalog" searchState={searchState} activePanel={activePanel} onPanelChange={setActivePanel} onSearchStateChange={setSearchState} onSearch={handleSearch} />
      <CatalogDesktopLayout listings={visible} gridProps={gridProps} />
      <CatalogMobileContent gridProps={gridProps} listings={visible} isMapVisible={isMapVisible} isMobileSearchOpen={isMobileSearchOpen} searchLabel={searchState.destination || destination || "Search destinations"} onSearchOpen={() => setIsMobileSearchOpen(true)} onMapToggle={() => setIsMapVisible(!isMapVisible)} />
      <StickyCatalogNav searchState={searchState} activePanel={activePanel} onPanelChange={setActivePanel} onSearchStateChange={setSearchState} onSearch={handleSearch} />
      <SearchBarMobile isOpen={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} state={searchState} onStateChange={setSearchState} onSearch={handleSearch} />
    </>
  );
}
