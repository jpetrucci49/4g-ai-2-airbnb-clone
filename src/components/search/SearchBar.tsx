"use client";

import { useRef, useEffect } from "react";
import { SearchIcon } from "@/components/icons";
import { buildSearchSegments } from "@/lib/searchBarSegments";
import type { SearchState } from "@/types";
import { cn } from "@/lib/utils";
import { SearchBarDropdown } from "./SearchBarDropdown";

interface SearchBarProps {
  state: SearchState;
  activePanel: "where" | "when" | "who" | null;
  onPanelChange: (panel: "where" | "when" | "who" | null) => void;
  onStateChange: (state: SearchState) => void;
  onSearch: () => void;
  compact?: boolean;
}

export function SearchBar({
  state,
  activePanel,
  onPanelChange,
  onStateChange,
  onSearch,
  compact = false,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onPanelChange(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onPanelChange]);

  const segments = buildSearchSegments(state, compact);

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <div className={cn("flex items-center rounded-full border border-border-light bg-white shadow-search", compact && "text-sm")}>
        {segments.map((seg, i) => (
          <button
            key={seg.id}
            type="button"
            onClick={() => onPanelChange(activePanel === seg.id ? null : seg.id)}
            className={cn(
              "flex flex-1 flex-col px-6 py-3 text-left transition-all",
              i > 0 && "border-l border-border-light",
              activePanel === seg.id && "rounded-full bg-white shadow-md",
              compact && "px-4 py-2",
            )}
          >
            <span className="text-xs font-semibold">{seg.label}</span>
            <span className={cn("truncate text-sm", seg.hasValue ? "text-text-primary" : "text-text-secondary")}>{seg.value}</span>
          </button>
        ))}
        <button type="button" onClick={onSearch} className="m-2 flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark" aria-label="Search">
          <SearchIcon size={16} className="text-white" />
        </button>
      </div>
      {activePanel && <SearchBarDropdown activePanel={activePanel} state={state} onStateChange={onStateChange} onPanelChange={onPanelChange} />}
    </div>
  );
}
