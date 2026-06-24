"use client";

import { CloseIcon } from "@/components/icons";
import { navCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface MobileSearchHeaderProps {
  onClose: () => void;
}

export function MobileSearchHeader({ onClose }: MobileSearchHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border-light px-4 py-3">
      <div className="flex flex-1 justify-center gap-6">
        {navCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={cn(
              "flex flex-col items-center gap-1 border-b-2 pb-2 text-xs font-medium",
              cat.id === "homes" ? "border-text-primary text-text-primary" : "border-transparent text-text-secondary",
            )}
          >
            <span className="text-lg">
              {cat.icon === "homes" ? "🏠" : cat.icon === "experiences" ? "🎈" : "🛎️"}
            </span>
            {cat.label}
          </button>
        ))}
      </div>
      <button type="button" onClick={onClose} className="flex size-8 items-center justify-center rounded-full border border-border-default" aria-label="Close">
        <CloseIcon size={14} />
      </button>
    </header>
  );
}
