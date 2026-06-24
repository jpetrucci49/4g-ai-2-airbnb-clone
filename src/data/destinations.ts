import type { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "nearby",
    name: "Nearby",
    description: "Find what's around you",
    icon: "nearby",
  },
  {
    id: "cape-cod",
    name: "Cape Cod",
    description: "Because your wishlist has stays in Cape Cod",
    icon: "cape-cod",
    region: "Massachusetts",
  },
  {
    id: "boston",
    name: "Boston, MA",
    description: "For sights like Fenway Park",
    icon: "boston",
    region: "Massachusetts",
  },
  {
    id: "portland",
    name: "Portland, ME",
    description: "Great for a weekend getaway",
    icon: "portland",
    region: "Maine",
  },
  {
    id: "orlando",
    name: "Orlando, FL",
    description: "For its bustling nightlife",
    icon: "orlando",
    region: "Florida",
  },
  {
    id: "provincetown",
    name: "Provincetown, MA",
    description: "Popular beach destination",
    icon: "beach",
    region: "Massachusetts",
  },
];
