import { formatGuestSummary } from "@/lib/search";
import { formatDateRange } from "@/lib/utils";
import type { SearchState } from "@/types";

export function buildSearchSegments(state: SearchState, compact: boolean) {
  const whenLabel = state.checkIn && state.checkOut ? formatDateRange(state.checkIn, state.checkOut) : "Add dates";
  const whoLabel = formatGuestSummary(state.guests);

  return [
    {
      id: "where" as const,
      label: "Where",
      value: compact ? state.destination || "Anywhere" : state.destination || "Search destinations",
      hasValue: !!state.destination,
    },
    {
      id: "when" as const,
      label: "When",
      value: compact ? (state.checkIn && state.checkOut ? formatDateRange(state.checkIn, state.checkOut) : "Anytime") : whenLabel,
      hasValue: !!(state.checkIn && state.checkOut),
    },
    {
      id: "who" as const,
      label: "Who",
      value: compact && !state.guests.adults ? "Add guests" : whoLabel,
      hasValue: state.guests.adults > 0,
    },
  ];
}
