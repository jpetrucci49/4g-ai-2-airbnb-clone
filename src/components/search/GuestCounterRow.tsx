"use client";

import { Counter } from "@/components/ui/Counter";

interface GuestCounterRowProps {
  label: string;
  sublabel?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function GuestCounterRow({ label, sublabel, value, min = 0, max = 16, onChange }: GuestCounterRowProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium text-text-primary">{label}</p>
        {sublabel && <p className="text-sm text-text-secondary">{sublabel}</p>}
      </div>
      <Counter
        value={value}
        min={min}
        max={max}
        onIncrement={() => onChange(Math.min(value + 1, max))}
        onDecrement={() => onChange(Math.max(value - 1, min))}
      />
    </div>
  );
}
