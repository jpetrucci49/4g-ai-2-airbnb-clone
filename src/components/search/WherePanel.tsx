"use client";

import { DestinationIcon } from "@/components/icons";
import { destinations } from "@/data/destinations";
import type { Destination } from "@/types";

interface WherePanelProps {
  onSelect: (destination: Destination) => void;
}

export function WherePanel({ onSelect }: WherePanelProps) {
  return (
    <div className="p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
        Suggested destinations
      </p>
      <ul className="max-h-80 overflow-y-auto">
        {destinations.map((dest) => (
          <li key={dest.id}>
            <button
              type="button"
              onClick={() => onSelect(dest)}
              className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left hover:bg-bg-subtle"
            >
              <DestinationIcon icon={dest.icon} />
              <div>
                <p className="font-medium text-text-primary">{dest.name}</p>
                <p className="text-sm text-text-secondary">{dest.description}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
