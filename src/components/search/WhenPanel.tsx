"use client";

import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { cn } from "@/lib/utils";

interface WhenPanelProps {
  checkIn: Date | null;
  checkOut: Date | null;
  flexibleDays: number;
  onDateChange: (checkIn: Date | null, checkOut: Date | null) => void;
  onFlexibleChange: (days: number) => void;
}

const flexOptions = [
  { label: "Exact dates", value: 0 },
  { label: "± 1 day", value: 1 },
  { label: "± 2 days", value: 2 },
  { label: "± 3 days", value: 3 },
  { label: "± 7 days", value: 7 },
  { label: "± 14 days", value: 14 },
];

export function WhenPanel({
  checkIn,
  checkOut,
  flexibleDays,
  onDateChange,
  onFlexibleChange,
}: WhenPanelProps) {
  const [mode, setMode] = useState<"dates" | "flexible">("dates");

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full bg-bg-subtle p-1">
          <button
            type="button"
            onClick={() => setMode("dates")}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-colors",
              mode === "dates" ? "bg-white shadow-sm" : "text-text-secondary",
            )}
          >
            Dates
          </button>
          <button
            type="button"
            onClick={() => setMode("flexible")}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-colors",
              mode === "flexible" ? "bg-white shadow-sm" : "text-text-secondary",
            )}
          >
            Flexible
          </button>
        </div>
      </div>

      {mode === "dates" && (
        <DatePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={onDateChange}
          monthsToShow={2}
        />
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-border-light pt-4">
        {flexOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFlexibleChange(opt.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              flexibleDays === opt.value
                ? "border-text-primary font-medium"
                : "border-border-default text-text-secondary hover:border-text-primary",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
