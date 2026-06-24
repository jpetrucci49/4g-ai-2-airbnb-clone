"use client";

import { MapIcon } from "@/components/icons";

interface MapToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function MapToggle({ isVisible, onToggle }: MapToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-[calc(7.5rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-text-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg lg:hidden"
    >
      <MapIcon size={14} className="text-white" />
      {isVisible ? "Show list" : "Map"}
    </button>
  );
}
