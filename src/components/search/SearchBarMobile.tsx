"use client";

import { useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { navCategories } from "@/data/categories";
import { defaultSearchState } from "@/lib/search";
import { formatDateRange } from "@/lib/utils";
import type { Destination, SearchState } from "@/types";
import { cn } from "@/lib/utils";
import { DatePicker } from "./DatePicker";
import { WherePanel } from "./WherePanel";
import { WhoPanel } from "./WhoPanel";

interface SearchBarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  state: SearchState;
  onStateChange: (state: SearchState) => void;
  onSearch: () => void;
}

type Step = "where" | "when" | "who";

export function SearchBarMobile({
  isOpen,
  onClose,
  state,
  onStateChange,
  onSearch,
}: SearchBarMobileProps) {
  const [step, setStep] = useState<Step>("where");

  if (!isOpen) return null;

  const whenLabel =
    state.checkIn && state.checkOut
      ? formatDateRange(state.checkIn, state.checkOut)
      : "Add dates";

  const handleClear = () => {
    onStateChange(defaultSearchState);
    setStep("where");
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white md:hidden">
      <header className="flex items-center justify-between border-b border-border-light px-4 py-3">
        <div className="flex flex-1 justify-center gap-6">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={cn(
                "flex flex-col items-center gap-1 border-b-2 pb-2 text-xs font-medium",
                cat.id === "homes"
                  ? "border-text-primary text-text-primary"
                  : "border-transparent text-text-secondary",
              )}
            >
              <span className="text-lg">
                {cat.icon === "homes" ? "🏠" : cat.icon === "experiences" ? "🎈" : "🛎️"}
              </span>
              {cat.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full border border-border-default"
          aria-label="Close"
        >
          <CloseIcon size={14} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {step !== "where" && (
          <div className="mb-3 space-y-3">
            <button
              type="button"
              onClick={() => setStep("where")}
              className="flex w-full items-center justify-between rounded-2xl border border-border-light px-4 py-4 shadow-sm"
            >
              <span className="text-text-secondary">Where</span>
              <span className="font-medium">{state.destination || "Nearby"}</span>
            </button>
            {step === "who" && (
              <button
                type="button"
                onClick={() => setStep("when")}
                className="flex w-full items-center justify-between rounded-2xl border border-border-light px-4 py-4 shadow-sm"
              >
                <span className="text-text-secondary">When</span>
                <span className="font-medium">{whenLabel}</span>
              </button>
            )}
          </div>
        )}

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
                  onChange={(e) =>
                    onStateChange({ ...state, destination: e.target.value })
                  }
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <WherePanel
                onSelect={(dest: Destination) => {
                  onStateChange({ ...state, destination: dest.name, destinationId: dest.id });
                  setStep("when");
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
                onChange={(checkIn, checkOut) =>
                  onStateChange({ ...state, checkIn, checkOut })
                }
                monthsToShow={1}
              />
            </>
          )}
          {step === "who" && (
            <>
              <h2 className="mb-4 text-2xl font-semibold">Who?</h2>
              <WhoPanel
                guests={state.guests}
                onChange={(guests) => onStateChange({ ...state, guests })}
              />
            </>
          )}
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-border-light px-6 py-4">
        <button type="button" onClick={handleClear} className="font-semibold underline">
          Clear all
        </button>
        {step === "where" && (
          <button
            type="button"
            onClick={onSearch}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-6 py-3 font-semibold text-white"
          >
            <SearchIcon size={18} className="text-white" />
            Search
          </button>
        )}
        {step === "when" && (
          <button
            type="button"
            onClick={() => setStep("who")}
            className="rounded-xl bg-text-primary px-6 py-3 font-semibold text-white"
          >
            Next
          </button>
        )}
        {step === "who" && (
          <button
            type="button"
            onClick={onSearch}
            className="rounded-xl bg-text-primary px-6 py-3 font-semibold text-white"
          >
            Next
          </button>
        )}
      </footer>
    </div>
  );
}
