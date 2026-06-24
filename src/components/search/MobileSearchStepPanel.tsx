"use client";

import { SearchIcon } from "@/components/icons";
import { DatePicker } from "@/components/search/DatePicker";
import { WherePanel } from "@/components/search/WherePanel";
import { WhoPanel } from "@/components/search/WhoPanel";
import type { Destination, SearchState } from "@/types";

export type MobileSearchStep = "where" | "when" | "who";

interface MobileSearchStepPanelProps {
  step: MobileSearchStep;
  state: SearchState;
  onStateChange: (state: SearchState) => void;
  onStepChange: (step: MobileSearchStep) => void;
}

export function MobileSearchStepPanel({ step, state, onStateChange, onStepChange }: MobileSearchStepPanelProps) {
  return (
    <div className="rounded-3xl border border-border-light p-6 shadow-sm">
      {step === "where" && (
        <>
          <h2 className="mb-4 text-2xl font-semibold">Where?</h2>
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-border-default px-4 py-3">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Search destinations"
              value={state.destination}
              onChange={(e) => onStateChange({ ...state, destination: e.target.value })}
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <WherePanel
            onSelect={(dest: Destination) => {
              onStateChange({ ...state, destination: dest.name, destinationId: dest.id });
              onStepChange("when");
            }}
          />
        </>
      )}
      {step === "when" && (
        <>
          <h2 className="mb-4 text-2xl font-semibold">When?</h2>
          <DatePicker
            checkIn={state.checkIn}
            checkOut={state.checkOut}
            onChange={(checkIn, checkOut) => onStateChange({ ...state, checkIn, checkOut })}
            monthsToShow={1}
          />
        </>
      )}
      {step === "who" && (
        <>
          <h2 className="mb-4 text-2xl font-semibold">Who?</h2>
          <WhoPanel guests={state.guests} onChange={(guests) => onStateChange({ ...state, guests })} />
        </>
      )}
    </div>
  );
}
