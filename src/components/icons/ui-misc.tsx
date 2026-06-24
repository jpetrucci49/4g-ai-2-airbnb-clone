"use client";

type IconProps = { className?: string; size?: number };
const defaultSize = 16;

export function FilterIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M4 6h24v2H4V6zm4 9h16v2H8v-2zm4 9h8v2h-8v-2z" />
    </svg>
  );
}

export function MapIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M10 4L2 7v21l8-3 12 3 8-3V7l-8 3-12-3zm0 3.18l10 2.5v16.14l-10-2.5V7.18zm12 2.5l6-1.5v16.14l-6 1.5V9.68z" />
    </svg>
  );
}
