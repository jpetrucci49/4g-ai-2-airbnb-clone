"use client";

import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pill";
}

export function Tabs({ tabs, activeId, onChange, variant = "underline" }: TabsProps) {
  return (
    <div
      className={cn(
        "flex gap-6",
        variant === "pill" && "gap-2 rounded-full bg-bg-subtle p-1",
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "whitespace-nowrap text-sm transition-colors",
            variant === "underline" &&
              (activeId === tab.id
                ? "border-b-2 border-text-primary pb-3 font-semibold text-text-primary"
                : "pb-3 text-text-secondary hover:text-text-primary hover:border-b-2 hover:border-border-default"),
            variant === "pill" &&
              (activeId === tab.id
                ? "rounded-full bg-white px-4 py-2 font-medium shadow-sm"
                : "px-4 py-2 text-text-secondary"),
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
