"use client";

import Link from "next/link";
import {
  AirbnbLogo,
  GlobeIcon,
  MenuIcon,
  UserIcon,
} from "@/components/icons";
import { SearchBar } from "@/components/search/SearchBar";
import { useScrollCollapsed } from "@/hooks/useScrollPosition";
import type { SearchState } from "@/types";

interface StickyCatalogNavProps {
  searchState: SearchState;
  activePanel: "where" | "when" | "who" | null;
  onPanelChange: (panel: "where" | "when" | "who" | null) => void;
  onSearchStateChange: (state: SearchState) => void;
  onSearch: () => void;
}

export function StickyCatalogNav({
  searchState,
  activePanel,
  onPanelChange,
  onSearchStateChange,
  onSearch,
}: StickyCatalogNavProps) {
  const isVisible = useScrollCollapsed(400, 200);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-border-light bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        <Link href="/" className="shrink-0">
          <AirbnbLogo />
        </Link>
        <div className="flex flex-1 justify-center">
          <SearchBar
            state={searchState}
            activePanel={activePanel}
            onPanelChange={onPanelChange}
            onStateChange={onSearchStateChange}
            onSearch={onSearch}
            compact
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="#" className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-bg-subtle xl:block">
            Become a host
          </Link>
          <button type="button" className="flex size-9 items-center justify-center rounded-full hover:bg-bg-subtle" aria-label="Language">
            <GlobeIcon size={16} />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-border-default py-1 pl-2.5 pr-1 hover:shadow-sm"
            aria-label="User menu"
          >
            <MenuIcon size={14} />
            <span className="flex size-7 items-center justify-center rounded-full bg-text-secondary text-white">
              <UserIcon size={14} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
