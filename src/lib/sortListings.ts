import type { SortOption } from "@/types";

export function sortListings<T extends { pricePerNight: number; rating: number }>(
  items: T[],
  sortBy: SortOption,
): T[] {
  const copy = [...items];
  if (sortBy === "price-asc") return copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
  if (sortBy === "price-desc") return copy.sort((a, b) => b.pricePerNight - a.pricePerNight);
  if (sortBy === "rating-desc") return copy.sort((a, b) => b.rating - a.rating);
  return copy;
}
