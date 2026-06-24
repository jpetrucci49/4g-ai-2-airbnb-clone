"use client";

import type { SearchState } from "@/types";
import { WhenPanel } from "./WhenPanel";
import { WherePanel } from "./WherePanel";
import { WhoPanel } from "./WhoPanel";

interface SearchBarDropdownProps {
  activePanel: "where" | "when" | "who";
  state: SearchState;
  onStateChange: (state: SearchState) => void;
  onPanelChange: (panel: "where" | "when" | "who" | null) => void;
}

export function SearchBarDropdown({
  activePanel,
  state,
  onStateChange,
  onPanelChange,
}: SearchBarDropdownProps) {
  return (
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
          onDateChange={(checkIn, checkOut) => onStateChange({ ...state, checkIn, checkOut })}
          onFlexibleChange={(flexibleDays) => onStateChange({ ...state, flexibleDays })}
        />
      )}
      {activePanel === "who" && (
        <WhoPanel guests={state.guests} onChange={(guests) => onStateChange({ ...state, guests })} />
      )}
    </div>
  );
}
