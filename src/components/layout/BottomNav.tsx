"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab?: "explore" | "wishlists" | "login";
}

const items = [
  { id: "explore" as const, label: "Explore", icon: "🔍", href: "/" },
  { id: "wishlists" as const, label: "Wishlists", icon: "❤️", href: "/catalog" },
  { id: "login" as const, label: "Log in", icon: "👤", href: "#" },
];

export function BottomNav({ activeTab }: BottomNavProps) {
  const resolvedTab = activeTab ?? "explore";

  return (
    <nav className="border-t border-border-light bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-1.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium",
              resolvedTab === item.id ? "text-brand" : "text-text-secondary",
            )}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
