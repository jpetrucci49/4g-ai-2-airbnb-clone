"use client";

import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface MobileSearchPillProps {
  onClick: () => void;
  label?: string;
}

export function MobileSearchPill({ onClick, label = "Start your search" }: MobileSearchPillProps) {
  return (
    <div className="border-t border-border-light bg-white px-4 py-2">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-full border border-border-default",
          "bg-white px-4 py-2.5 shadow-search",
        )}
      >
        <SearchIcon size={16} className="shrink-0" />
        <span className="truncate text-left text-sm font-semibold">{label}</span>
      </button>
    </div>
  );
}
