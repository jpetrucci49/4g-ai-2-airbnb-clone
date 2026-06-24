"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { CategoryBar } from "@/components/layout/CategoryBar";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface MobileSearchPillProps {
  onClick: () => void;
  label?: string;
}

export function MobileSearchPill({ onClick, label = "Start your search" }: MobileSearchPillProps) {
  return (
    <div className="border-t border-border-light bg-white px-4 py-2">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-full border border-border-default",
          "bg-white px-4 py-2.5 shadow-search",
        )}
      >
        <SearchIcon size={16} className="shrink-0" />
        <span className="truncate text-left text-sm font-semibold">{label}</span>
      </button>
    </div>
  );
}

interface BottomNavProps {
  activeTab?: "explore" | "wishlists" | "login";
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const pathname = usePathname();
  const resolvedTab =
    activeTab ?? (pathname === "/" || pathname.startsWith("/catalog") || pathname.startsWith("/rooms")
      ? "explore"
      : "explore");

  const items = [
    { id: "explore" as const, label: "Explore", icon: "🔍", href: "/" },
    { id: "wishlists" as const, label: "Wishlists", icon: "❤️", href: "/catalog" },
    { id: "login" as const, label: "Log in", icon: "👤", href: "#" },
  ];

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

export function MobileCatalogTabs() {
  const tabs = [
    { id: "homes", label: "Homes", icon: "🏠" },
    { id: "experiences", label: "Experiences", icon: "🎈" },
    { id: "services", label: "Services", icon: "🛎️" },
  ];

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

interface MobileShellProps {
  children: React.ReactNode;
  onSearchOpen: () => void;
  searchLabel?: string;
  activeTab?: "explore" | "wishlists" | "login";
  topNav?: React.ReactNode;
  categories?: Category[];
  activeCategory?: string;
  onCategorySelect?: (id: string) => void;
  variant?: "home" | "catalog" | "room" | "default";
  hideChrome?: boolean;
}

export function MobileShell({
  children,
  onSearchOpen,
  searchLabel,
  activeTab,
  topNav,
  categories,
  activeCategory,
  onCategorySelect,
  variant = "default",
  hideChrome = false,
}: MobileShellProps) {
  const defaultTopNav =
    variant === "home" && categories && activeCategory && onCategorySelect ? (
      <CategoryBar
        categories={categories}
        activeId={activeCategory}
        onSelect={onCategorySelect}
      />
    ) : variant === "catalog" ? (
      <MobileCatalogTabs />
    ) : null;

  const resolvedTopNav = topNav ?? defaultTopNav;

  return (
    <>
      {!hideChrome && resolvedTopNav && (
        <div className="sticky top-0 z-30 md:hidden">{resolvedTopNav}</div>
      )}

      <div
        className={cn(
          "min-w-0 overflow-x-hidden",
          !hideChrome && "pb-[calc(7.25rem+env(safe-area-inset-bottom))] md:pb-0",
        )}
      >
        {children}
      </div>

      {!hideChrome && (
        <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
          <MobileSearchPill onClick={onSearchOpen} label={searchLabel} />
          <BottomNav activeTab={activeTab} />
        </div>
      )}
    </>
  );
}
