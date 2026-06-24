"use client";

import { GuestCounterRow } from "@/components/search/GuestCounterRow";
import { GUEST_LIMITS } from "@/lib/constants";
import type { GuestCounts } from "@/types";

interface WhoPanelProps {
  guests: GuestCounts;
  onChange: (guests: GuestCounts) => void;
}

export function WhoPanel({ guests, onChange }: WhoPanelProps) {
  return (
    <div className="divide-y divide-border-light px-2">
      <GuestCounterRow label="Adults" sublabel="Ages 13 or above" value={guests.adults} min={GUEST_LIMITS.adults.min} max={GUEST_LIMITS.adults.max} onChange={(adults) => onChange({ ...guests, adults })} />
      <GuestCounterRow label="Children" sublabel="Ages 2 – 12" value={guests.children} min={GUEST_LIMITS.children.min} max={GUEST_LIMITS.children.max} onChange={(children) => onChange({ ...guests, children })} />
      <GuestCounterRow label="Infants" sublabel="Under 2" value={guests.infants} min={GUEST_LIMITS.infants.min} max={GUEST_LIMITS.infants.max} onChange={(infants) => onChange({ ...guests, infants })} />
      <GuestCounterRow label="Pets" sublabel="Bringing a service animal?" value={guests.pets} min={GUEST_LIMITS.pets.min} max={GUEST_LIMITS.pets.max} onChange={(pets) => onChange({ ...guests, pets })} />
    </div>
  );
}
