"use client";

import Link from "next/link";
import { AirbnbLogo } from "@/components/icons";
import { NavCategories } from "@/components/layout/NavCategories";
import { UserMenu } from "@/components/layout/UserMenu";
import { SearchBar } from "@/components/search/SearchBar";
import { useScrollCollapsed } from "@/hooks/useScrollPosition";
import type { SearchState } from "@/types";

interface NavbarProps {
  variant?: "home" | "catalog" | "room" | "minimal";
  searchState: SearchState;
  activePanel: "where" | "when" | "who" | null;
  onPanelChange: (panel: "where" | "when" | "who" | null) => void;
  onSearchStateChange: (state: SearchState) => void;
  onSearch: () => void;
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
          <Link href="/" className="shrink-0"><AirbnbLogo /></Link>
          {showExpandedHome ? <NavCategories /> : <div className="flex flex-1 justify-center px-8">{searchBar}</div>}
          <UserMenu />
        </div>
        {showExpandedHome && (
          <div className="flex justify-center border-t border-border-light px-6 py-4">{searchBar}</div>
        )}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 hidden border-b border-border-light bg-white md:block">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <Link href="/" className="shrink-0"><AirbnbLogo /></Link>
        <div className="flex flex-1 justify-center">{searchBar}</div>
        <UserMenu />
      </div>
    </header>
  );
}
