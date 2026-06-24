"use client";

import { useState } from "react";
import { MobileSearchFooter } from "@/components/search/MobileSearchFooter";
import { MobileSearchHeader } from "@/components/search/MobileSearchHeader";
import { MobileSearchStepPanel, type MobileSearchStep } from "@/components/search/MobileSearchStepPanel";
import { defaultSearchState } from "@/lib/search";
import { formatDateRange } from "@/lib/utils";
import type { SearchState } from "@/types";

interface SearchBarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  state: SearchState;
  onStateChange: (state: SearchState) => void;
  onSearch: () => void;
}

export function SearchBarMobile({ isOpen, onClose, state, onStateChange, onSearch }: SearchBarMobileProps) {
  const [step, setStep] = useState<MobileSearchStep>("where");
  if (!isOpen) return null;

  const whenLabel = state.checkIn && state.checkOut ? formatDateRange(state.checkIn, state.checkOut) : "Add dates";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white md:hidden">
      <MobileSearchHeader onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-4">
        {step !== "where" && (
          <div className="mb-3 space-y-3">
            <button type="button" onClick={() => setStep("where")} className="flex w-full items-center justify-between rounded-2xl border border-border-light px-4 py-4 shadow-sm">
              <span className="text-text-secondary">Where</span>
              <span className="font-medium">{state.destination || "Nearby"}</span>
            </button>
            {step === "who" && (
              <button type="button" onClick={() => setStep("when")} className="flex w-full items-center justify-between rounded-2xl border border-border-light px-4 py-4 shadow-sm">
                <span className="text-text-secondary">When</span>
                <span className="font-medium">{whenLabel}</span>
              </button>
            )}
          </div>
        )}
        <MobileSearchStepPanel step={step} state={state} onStateChange={onStateChange} onStepChange={setStep} />
      </div>
      <MobileSearchFooter
        step={step}
        onClear={() => { onStateChange(defaultSearchState); setStep("where"); }}
        onSearch={onSearch}
        onNext={() => setStep(step === "when" ? "who" : "when")}
      />
    </div>
  );
}
