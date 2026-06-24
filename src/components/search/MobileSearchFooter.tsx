"use client";

import { SearchIcon } from "@/components/icons";
import type { MobileSearchStep } from "@/components/search/MobileSearchStepPanel";

interface MobileSearchFooterProps {
  step: MobileSearchStep;
  onClear: () => void;
  onSearch: () => void;
  onNext: () => void;
}

export function MobileSearchFooter({ step, onClear, onSearch, onNext }: MobileSearchFooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-border-light px-6 py-4">
      <button type="button" onClick={onClear} className="font-semibold underline">Clear all</button>
      {step === "where" && (
        <button type="button" onClick={onSearch} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-6 py-3 font-semibold text-white">
          <SearchIcon size={18} className="text-white" /> Search
        </button>
      )}
      {(step === "when" || step === "who") && (
        <button type="button" onClick={onNext} className="rounded-xl bg-text-primary px-6 py-3 font-semibold text-white">
          Next
        </button>
      )}
    </footer>
  );
}
