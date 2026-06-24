"use client";

import { useState } from "react";
import { DatePicker } from "@/components/search/DatePicker";
import { flexDateOptions } from "@/data/flexDateOptions";
import { cn } from "@/lib/utils";

interface WhenPanelProps {
  checkIn: Date | null;
  checkOut: Date | null;
  flexibleDays: number;
  onDateChange: (checkIn: Date | null, checkOut: Date | null) => void;
  onFlexibleChange: (days: number) => void;
}

export function WhenPanel({ checkIn, checkOut, flexibleDays, onDateChange, onFlexibleChange }: WhenPanelProps) {
  const [mode, setMode] = useState<"dates" | "flexible">("dates");

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full bg-bg-subtle p-1">
          {(["dates", "flexible"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn("rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors", mode === m ? "bg-white shadow-sm" : "text-text-secondary")}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      {mode === "dates" && <DatePicker checkIn={checkIn} checkOut={checkOut} onChange={onDateChange} monthsToShow={2} />}
      <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-border-light pt-4">
        {flexDateOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFlexibleChange(opt.value)}
            className={cn("rounded-full border px-4 py-2 text-sm transition-colors", flexibleDays === opt.value ? "border-text-primary font-medium" : "border-border-default text-text-secondary hover:border-text-primary")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
