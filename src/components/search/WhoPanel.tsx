"use client";

import { Counter } from "@/components/ui/Counter";
import { GUEST_LIMITS } from "@/lib/constants";

interface GuestCounterProps {
  label: string;
  sublabel?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function GuestCounterRow({
  label,
  sublabel,
  value,
  min = 0,
  max = 16,
  onChange,
}: GuestCounterProps) {
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

interface WhoPanelProps {
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  onChange: (guests: WhoPanelProps["guests"]) => void;
}

export function WhoPanel({ guests, onChange }: WhoPanelProps) {
  return (
    <div className="divide-y divide-border-light px-2">
      <GuestCounterRow
        label="Adults"
        sublabel="Ages 13 or above"
        value={guests.adults}
        min={GUEST_LIMITS.adults.min}
        max={GUEST_LIMITS.adults.max}
        onChange={(adults) => onChange({ ...guests, adults })}
      />
      <GuestCounterRow
        label="Children"
        sublabel="Ages 2 – 12"
        value={guests.children}
        min={GUEST_LIMITS.children.min}
        max={GUEST_LIMITS.children.max}
        onChange={(children) => onChange({ ...guests, children })}
      />
      <GuestCounterRow
        label="Infants"
        sublabel="Under 2"
        value={guests.infants}
        min={GUEST_LIMITS.infants.min}
        max={GUEST_LIMITS.infants.max}
        onChange={(infants) => onChange({ ...guests, infants })}
      />
      <GuestCounterRow
        label="Pets"
        sublabel="Bringing a service animal?"
        value={guests.pets}
        min={GUEST_LIMITS.pets.min}
        max={GUEST_LIMITS.pets.max}
        onChange={(pets) => onChange({ ...guests, pets })}
      />
    </div>
  );
}
