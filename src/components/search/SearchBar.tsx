"use client";

import { useRef, useEffect } from "react";
import { SearchIcon } from "@/components/icons";
import { formatGuestSummary } from "@/lib/search";
import { formatDateRange } from "@/lib/utils";
import type { SearchState } from "@/types";
import { cn } from "@/lib/utils";
import { WhenPanel } from "./WhenPanel";
import { WherePanel } from "./WherePanel";
import { WhoPanel } from "./WhoPanel";

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

  const whenLabel =
    state.checkIn && state.checkOut
      ? formatDateRange(state.checkIn, state.checkOut)
      : "Add dates";

  const whoLabel = formatGuestSummary(state.guests);

  const segments = [
    {
      id: "where" as const,
      label: "Where",
      value: state.destination || "Search destinations",
      hasValue: !!state.destination,
    },
    {
      id: "when" as const,
      label: "When",
      value: whenLabel,
      hasValue: !!(state.checkIn && state.checkOut),
    },
    {
      id: "who" as const,
      label: "Who",
      value: whoLabel,
      hasValue: state.guests.adults > 0,
    },
  ];

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <div
        className={cn(
          "flex items-center rounded-full border border-border-light bg-white shadow-search transition-shadow",
          compact ? "text-sm" : "",
        )}
      >
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
            <span
              className={cn(
                "truncate text-sm",
                seg.hasValue ? "text-text-primary" : "text-text-secondary",
              )}
            >
              {compact && seg.id === "where" ? "Anywhere" : seg.value}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={onSearch}
          className="m-2 flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark"
          aria-label="Search"
        >
          <SearchIcon size={16} className="text-white" />
        </button>
      </div>

      {activePanel && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(850px,90vw)] -translate-x-1/2 rounded-3xl bg-white shadow-dropdown">
          {activePanel === "where" && (
            <WherePanel
              onSelect={(dest) => {
                onStateChange({ ...state, destination: dest.name, destinationId: dest.id });
                onPanelChange("when");
              }}
            />
          )}
          {activePanel === "when" && (
            <WhenPanel
              checkIn={state.checkIn}
              checkOut={state.checkOut}
              flexibleDays={state.flexibleDays ?? 0}
              onDateChange={(checkIn, checkOut) =>
                onStateChange({ ...state, checkIn, checkOut })
              }
              onFlexibleChange={(flexibleDays) =>
                onStateChange({ ...state, flexibleDays })
              }
            />
          )}
          {activePanel === "who" && (
            <WhoPanel
              guests={state.guests}
              onChange={(guests) => onStateChange({ ...state, guests })}
            />
          )}
        </div>
      )}
    </div>
  );
}
