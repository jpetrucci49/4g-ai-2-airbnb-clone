"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryBar } from "@/components/layout/CategoryBar";
import { Footer } from "@/components/layout/Footer";
import { MobileShell } from "@/components/layout/MobileShell";
import { Navbar } from "@/components/layout/Navbar";
import { HomeListings } from "@/components/pages/HomeListings";
import { SearchBarMobile } from "@/components/search/SearchBarMobile";
import { homeCategories } from "@/data/categories";
import { homeSections } from "@/data/sections";
import { LOADING_DELAY_MS } from "@/lib/constants";
import { defaultSearchState, searchStateToParams } from "@/lib/search";
import type { SearchState } from "@/types";

export function HomePageContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchState, setSearchState] = useState<SearchState>(defaultSearchState);
  const [activePanel, setActivePanel] = useState<"where" | "when" | "who" | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const filteredSections = useMemo(() => {
    const q = searchState.destination.toLowerCase().trim();
    if (!q) return homeSections;
    return homeSections
      .map((section) => ({
        ...section,
        listings: section.listings.filter(
          (l) => l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.listings.length > 0);
  }, [searchState.destination]);

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    router.push(`/catalog?${searchStateToParams(searchState).toString()}`);
  };

  return (
    <>
      <Navbar variant="home" searchState={searchState} activePanel={activePanel} onPanelChange={setActivePanel} onSearchStateChange={setSearchState} onSearch={handleSearch} />
      <div className="hidden md:block">
        <CategoryBar categories={homeCategories} activeId={activeCategory} onSelect={setActiveCategory} />
      </div>
      <MobileShell variant="home" onSearchOpen={() => setIsMobileSearchOpen(true)} searchLabel={searchState.destination || "Start your search"} activeTab="explore" categories={homeCategories} activeCategory={activeCategory} onCategorySelect={setActiveCategory} hideChrome={isMobileSearchOpen}>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 sm:px-6 sm:py-8">
          <HomeListings isLoading={isLoading} sections={filteredSections} />
        </main>
        <Footer />
      </MobileShell>
      <SearchBarMobile isOpen={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} state={searchState} onStateChange={setSearchState} onSearch={handleSearch} />
    </>
  );
}
