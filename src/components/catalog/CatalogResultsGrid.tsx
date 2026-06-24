"use client";

import { Pagination } from "@/components/catalog/Pagination";
import { ResultsHeader } from "@/components/catalog/ResultsHeader";
import { PropertyCard } from "@/components/listings/PropertyCard";
import type { Listing, SortOption } from "@/types";

interface CatalogResultsGridProps {
  listings: Listing[];
  totalCount: number;
  sortBy: SortOption;
  currentPage: number;
  totalPages: number;
  onSortChange: (sort: SortOption) => void;
  onPageChange: (page: number) => void;
}

export function CatalogResultsGrid({
  listings,
  totalCount,
  sortBy,
  currentPage,
  totalPages,
  onSortChange,
  onPageChange,
}: CatalogResultsGridProps) {
  return (
    <>
      <ResultsHeader totalCount={totalCount} sortBy={sortBy} onSortChange={onSortChange} />
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {listings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} variant="catalog" />
        ))}
      </div>
      {totalCount === 0 && (
        <p className="py-12 text-center text-sm text-text-secondary">
          No stays match your search. Try Cape Cod, Boston, or Portland.
        </p>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}
