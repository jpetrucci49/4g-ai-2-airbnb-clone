"use client";

import { CategoryIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryBarProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CategoryBar({ categories, activeId, onSelect }: CategoryBarProps) {
  return (
    <div className="border-b border-border-light">
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6">
        <div className="flex flex-1 gap-4 overflow-x-auto py-3 scrollbar-hide sm:gap-6 sm:py-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-0.5 border-b-2 pb-2 transition-colors sm:gap-1 sm:pb-3",
                activeId === cat.id
                  ? "border-text-primary text-text-primary"
                  : "border-transparent text-text-secondary hover:border-border-default hover:text-text-primary",
              )}
            >
              <CategoryIcon icon={cat.icon} className="text-lg sm:text-xl" />
              <span className="max-w-[64px] truncate text-[10px] font-medium sm:max-w-none sm:text-xs">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="hidden shrink-0 items-center gap-2 rounded-xl border border-border-default px-3 py-2 text-sm font-medium hover:shadow-sm md:flex"
        >
          Filters
        </button>
      </div>
    </div>
  );
}
