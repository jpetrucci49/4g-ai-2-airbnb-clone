"use client";

import { CategoryIcon } from "@/components/icons";
import { navCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface NavCategoriesProps {
  activeId?: string;
}

export function NavCategories({ activeId = "homes" }: NavCategoriesProps) {
  return (
    <nav className="flex items-center gap-8">
      {navCategories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={cn(
            "relative flex flex-col items-center gap-0.5 pb-1 text-xs font-medium",
            cat.id === activeId
              ? "text-text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-text-primary"
              : "text-text-secondary",
          )}
        >
          <CategoryIcon icon={cat.icon} className="size-5" />
          <span className="flex items-center gap-1">
            {cat.label}
            {cat.isNew && (
              <span className="rounded bg-text-primary px-1 py-0.5 text-[9px] font-bold text-white">
                NEW
              </span>
            )}
          </span>
        </button>
      ))}
    </nav>
  );
}
