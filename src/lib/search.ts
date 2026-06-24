import type { SearchState, GuestCounts } from "@/types";

export const defaultGuestCounts: GuestCounts = {
  adults: 1,
  children: 0,
  infants: 0,
  pets: 0,
};

export const defaultSearchState: SearchState = {
  destination: "",
  checkIn: null,
  checkOut: null,
  guests: defaultGuestCounts,
  flexibleDays: 0,
  category: "homes",
};

export function formatGuestSummary(guests: GuestCounts): string {
  const parts: string[] = [];
  const total = guests.adults + guests.children;
  if (total > 0) parts.push(`${total} guest${total !== 1 ? "s" : ""}`);
  if (guests.infants > 0)
    parts.push(`${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
  if (guests.pets > 0) parts.push(`${guests.pets} pet${guests.pets !== 1 ? "s" : ""}`);
  return parts.length > 0 ? parts.join(", ") : "Add guests";
}

export function searchStateToParams(state: SearchState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.destination) params.set("destination", state.destination);
  if (state.checkIn) params.set("checkIn", state.checkIn.toISOString());
  if (state.checkOut) params.set("checkOut", state.checkOut.toISOString());
  params.set("adults", String(state.guests.adults));
  params.set("children", String(state.guests.children));
  params.set("infants", String(state.guests.infants));
  params.set("pets", String(state.guests.pets));
  return params;
}

export function paramsToSearchState(params: URLSearchParams): SearchState {
  return {
    destination: params.get("destination") ?? "",
    checkIn: params.get("checkIn") ? new Date(params.get("checkIn")!) : null,
    checkOut: params.get("checkOut") ? new Date(params.get("checkOut")!) : null,
    guests: {
      adults: Number(params.get("adults") ?? 1),
      children: Number(params.get("children") ?? 0),
      infants: Number(params.get("infants") ?? 0),
      pets: Number(params.get("pets") ?? 0),
    },
    category: "homes",
  };
}
