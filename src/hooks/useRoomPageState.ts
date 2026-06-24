"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultSearchState, searchStateToParams } from "@/lib/search";
import type { GuestCounts, SearchState } from "@/types";

export function useRoomPageState() {
  const router = useRouter();
  const [searchState, setSearchState] = useState<SearchState>(defaultSearchState);
  const [activePanel, setActivePanel] = useState<"where" | "when" | "who" | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<GuestCounts>(defaultSearchState.guests);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  const nights = useMemo(() => {
    if (checkIn && checkOut) {
      return Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000));
    }
    return 2;
  }, [checkIn, checkOut]);

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    router.push(`/catalog?${searchStateToParams(searchState).toString()}`);
  };

  return {
    searchState,
    setSearchState,
    activePanel,
    setActivePanel,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    isDescriptionExpanded,
    setIsDescriptionExpanded,
    isMobileSearchOpen,
    setIsMobileSearchOpen,
    showReserveModal,
    setShowReserveModal,
    nights,
    handleSearch,
    handleReserve: () => setShowReserveModal(true),
  };
}
