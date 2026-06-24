"use client";

import { cn } from "@/lib/utils";

const tabs = [
  { id: "homes", label: "Homes", icon: "🏠" },
  { id: "experiences", label: "Experiences", icon: "🎈" },
  { id: "services", label: "Services", icon: "🛎️" },
];

export function MobileCatalogTabs() {
  return (
    <div className="border-b border-border-light bg-white px-4">
      <div className="flex justify-center gap-6 py-3">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            className={cn(
              "flex flex-col items-center gap-0.5 border-b-2 pb-2 text-[11px] font-medium",
              i === 0
                ? "border-text-primary text-text-primary"
                : "border-transparent text-text-secondary",
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
