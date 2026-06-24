"use client";

import { SortDropdown } from "./SortDropdown";

import type { SortOption } from "@/types";

interface ResultsHeaderProps {
  totalCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ResultsHeader({ totalCount, sortBy, onSortChange }: ResultsHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-sm text-text-secondary">
        <span className="font-semibold text-text-primary">{totalCount}+</span> stays
      </p>
      <SortDropdown value={sortBy} onChange={onSortChange} />
    </div>
  );
}
