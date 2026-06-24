"use client";

import { cn } from "@/lib/utils";

export function AirbnbLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 32" fill="currentColor" className={cn("h-8 w-auto text-brand", className)}>
      <path d="M16.05 2.5c-3.2 0-5.8 2.6-5.8 5.8 0 4.5 5.8 11.5 5.8 11.5s5.8-7 5.8-11.5c0-3.2-2.6-5.8-5.8-5.8zm0 7.9a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM32 2.5h-4.2v17.3H32V2.5zm8.5 0c-4.7 0-8.5 3.8-8.5 8.5v8.8h4.2v-3.5c.9.6 2 1 3.2 1 4.7 0 8.5-3.8 8.5-8.5S45.2 2.5 40.5 2.5zm0 12.8c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zM56.8 2.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 12.8c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3zM72.5 2.5c-2.3 0-4.2 1.9-4.2 4.2v13.1h4.2V11.5h6.5v8.3H83V2.5h-4.2v5.8h-6.3V2.5h-4.2zm15.3 0v17.3h4.2V2.5h-4.2z" />
    </svg>
  );
}

const categoryEmojis: Record<string, string> = {
  all: "🏆", mansions: "🏛️", beach: "🏖️", cabins: "🛖",
  homes: "🏠", experiences: "🎈", services: "🛎️",
};

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  return <span className={cn("text-xl", className)}>{categoryEmojis[icon] ?? "🏡"}</span>;
}

const destinationEmojis: Record<string, string> = {
  nearby: "🧭", "cape-cod": "🏡", boston: "🏙️", portland: "🌲", orlando: "🎢", beach: "🏖️",
};

export function DestinationIcon({ icon, className }: { icon: string; className?: string }) {
  return (
    <span className={cn("flex size-12 items-center justify-center rounded-xl bg-bg-subtle text-2xl", className)}>
      {destinationEmojis[icon] ?? "📍"}
    </span>
  );
}
