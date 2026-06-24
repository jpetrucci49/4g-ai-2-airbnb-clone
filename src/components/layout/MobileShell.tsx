"use client";

import { CategoryBar } from "@/components/layout/CategoryBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileCatalogTabs } from "@/components/layout/MobileCatalogTabs";
import { MobileSearchPill } from "@/components/layout/MobileSearchPill";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

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
  contentClassName?: string;
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
  contentClassName,
}: MobileShellProps) {
  const defaultTopNav =
    variant === "home" && categories && activeCategory && onCategorySelect ? (
      <CategoryBar categories={categories} activeId={activeCategory} onSelect={onCategorySelect} />
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
          contentClassName,
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
