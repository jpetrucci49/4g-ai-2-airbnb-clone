"use client";

import { cn } from "@/lib/utils";

type IconProps = { className?: string; size?: number };
const defaultSize = 16;

export function HeartIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={cn("stroke-current", className)} strokeWidth={2}>
      <path d="M16 28c7-4.35 10-7.5 10-12.18a5.5 5.5 0 0 0-9.71-3.56 1 1 0 0 1-1.58 0A5.5 5.5 0 0 0 6 15.82C6 20.5 9 23.65 16 28z" />
    </svg>
  );
}

export function HeartFilledIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={cn("fill-brand", className)}>
      <path d="M16 28c7-4.35 10-7.5 10-12.18a5.5 5.5 0 0 0-9.71-3.56 1 1 0 0 1-1.58 0A5.5 5.5 0 0 0 6 15.82C6 20.5 9 23.65 16 28z" />
    </svg>
  );
}

export function SearchIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M13 4a9 9 0 1 0 5.74 16.06l7.18 7.18 1.41-1.41-7.18-7.18A9 9 0 0 0 13 4zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
    </svg>
  );
}

export function StarIcon({ className, size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 2l4.09 8.28 9.15 1.33-6.62 6.45 1.56 9.11L16 22.77l-7.18 3.77 1.56-9.11-6.62-6.45 9.15-1.33L16 2z" />
    </svg>
  );
}

export function GlobeIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 2c1.93 0 4.57 3.5 5.47 9H10.53C11.43 7.5 14.07 4 16 4zM6.07 16c0-1.1.18-2.16.5-3.14h5.93v3.14H6.07zm2.43 6.14c.32-.98.5-2.04.5-3.14h6.43v6.28c-3.5-.68-6.14-2.14-6.93-3.14zm8.5 3.14v-6.28h6.43c-.79 1-3.43 2.46-6.93 3.14zm8.5-9.28h5.93c.32.98.5 2.04.5 3.14s-.18 2.16-.5 3.14h-5.93v-6.28zm0-2h5.43c.32-.98.5-2.04.5-3.14 0-1.1-.18-2.16-.5-3.14H25.5v6.28z" />
    </svg>
  );
}

export function MenuIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M4 8h24v2H4V8zm0 7h24v2H4v-2zm0 7h24v2H4v-2z" />
    </svg>
  );
}

export function UserIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
    </svg>
  );
}

export function ShareIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M24 4l-8 8V9.5C9.5 9.5 5 12 5 18c0 0 3-4 9-4.5V20l8 8V4z" />
    </svg>
  );
}
