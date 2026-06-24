"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
      {currentPage > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="flex size-8 items-center justify-center rounded-full hover:bg-bg-subtle"
          aria-label="Previous page"
        >
          <ChevronLeftIcon size={14} />
        </button>
      )}
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`e-${i}`} className="px-2 text-text-secondary">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
              page === currentPage
                ? "bg-text-primary text-white"
                : "text-text-primary hover:bg-bg-subtle"
            }`}
          >
            {page}
          </button>
        ),
      )}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="flex size-8 items-center justify-center rounded-full hover:bg-bg-subtle"
          aria-label="Next page"
        >
          <ChevronRightIcon size={14} />
        </button>
      )}
    </nav>
  );
}
