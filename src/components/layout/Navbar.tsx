"use client";

import Link from "next/link";
import {
  AirbnbLogo,
  CategoryIcon,
  GlobeIcon,
  MenuIcon,
  UserIcon,
} from "@/components/icons";
import { SearchBar } from "@/components/search/SearchBar";
import { useScrollCollapsed } from "@/hooks/useScrollPosition";
import { navCategories } from "@/data/categories";
import type { SearchState } from "@/types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "home" | "catalog" | "room" | "minimal";
  searchState: SearchState;
  activePanel: "where" | "when" | "who" | null;
  onPanelChange: (panel: "where" | "when" | "who" | null) => void;
  onSearchStateChange: (state: SearchState) => void;
  onSearch: () => void;
}

function UserMenu() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href="#"
        className="hidden rounded-full px-4 py-2.5 text-sm font-medium hover:bg-bg-subtle lg:block"
      >
        Become a host
      </Link>
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-full hover:bg-bg-subtle"
        aria-label="Language and currency"
      >
        <GlobeIcon size={18} />
      </button>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-border-default py-1.5 pl-3 pr-1.5 hover:shadow-sm"
        aria-label="User menu"
      >
        <MenuIcon size={16} />
        <span className="flex size-8 items-center justify-center rounded-full bg-text-secondary text-white">
          <UserIcon size={16} />
        </span>
      </button>
    </div>
  );
}

function NavCategories({ activeId = "homes" }: { activeId?: string }) {
  return (
    <nav className="flex items-center gap-8">
      {navCategories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={cn(
            "relative flex flex-col items-center gap-0.5 pb-1 text-xs font-medium",
            cat.id === activeId
              ? "text-text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-text-primary"
              : "text-text-secondary",
          )}
        >
          <CategoryIcon icon={cat.icon} className="size-5" />
          <span className="flex items-center gap-1">
            {cat.label}
            {cat.isNew && (
              <span className="rounded bg-text-primary px-1 py-0.5 text-[9px] font-bold text-white">
                NEW
              </span>
            )}
          </span>
        </button>
      ))}
    </nav>
  );
}

export function Navbar({
  variant = "home",
  searchState,
  activePanel,
  onPanelChange,
  onSearchStateChange,
  onSearch,
}: NavbarProps) {
  const isScrolled = useScrollCollapsed(100);

  if (variant === "minimal") return null;

  const searchBar = (
    <SearchBar
      state={searchState}
      activePanel={activePanel}
      onPanelChange={onPanelChange}
      onStateChange={onSearchStateChange}
      onSearch={onSearch}
      compact={variant === "room" || (variant === "home" && isScrolled)}
    />
  );

  if (variant === "catalog" || variant === "home") {
    const showExpandedHome = variant === "home" && !isScrolled;

    return (
      <header className="sticky top-0 z-40 hidden border-b border-border-light bg-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="shrink-0">
            <AirbnbLogo />
          </Link>

          {showExpandedHome ? (
            <NavCategories />
          ) : (
            <div className="flex flex-1 justify-center px-8">{searchBar}</div>
          )}

          <UserMenu />
        </div>

        {showExpandedHome && (
          <div className="flex justify-center border-t border-border-light px-6 py-4">
            {searchBar}
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 hidden border-b border-border-light bg-white md:block">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <Link href="/" className="shrink-0">
          <AirbnbLogo />
        </Link>
        <div className="flex flex-1 justify-center">{searchBar}</div>
        <UserMenu />
      </div>
    </header>
  );
}
