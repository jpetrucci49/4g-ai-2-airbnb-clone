import type { ListingSection } from "@/types";
import { listings } from "./listings";

const cape = listings.filter((l) => l.location.includes("Massachusetts"));
const portland = listings.filter((l) => l.location.includes("Maine"));
const boston = listings.filter((l) => l.location.includes("Boston"));
const favorites = listings.filter((l) => l.isGuestFavorite);
const discounted = listings.filter((l) => l.hasMonthlyDiscount);

function slice(list: typeof listings, start: number, count: number) {
  return list.length ? list.slice(start, start + count) : listings.slice(start, start + count);
}

export const homeSections: ListingSection[] = [
  {
    id: "cape-cod",
    title: "Popular homes in Cape Cod",
    listings: slice(cape, 0, 10),
    href: "/catalog?region=cape-cod",
  },
  {
    id: "portland",
    title: "Popular homes in Portland",
    listings: slice(portland, 0, 8),
    href: "/catalog?region=portland",
  },
  {
    id: "boston-month",
    title: "Available next month in Boston",
    listings: slice(boston, 0, 8),
    href: "/catalog?region=boston",
  },
  {
    id: "stay-portland",
    title: "Stay in Portland",
    listings: slice(portland, 0, 10),
    href: "/catalog?region=portland",
  },
  {
    id: "boston-weekend",
    title: "Available in Boston this weekend",
    listings: slice(boston, 0, 10),
    href: "/catalog?region=boston",
  },
  {
    id: "guest-favorites",
    title: "Guest favorites",
    listings: slice(favorites, 0, 10),
    href: "/catalog",
  },
  {
    id: "hotels",
    title: "Great hotels for your next trip",
    subtitle: "Plus, get Airbnb credit when you stay at a featured hotel.",
    listings: listings.slice(10, 20),
    href: "/catalog",
  },
  {
    id: "monthly",
    title: "Stays with monthly discounts",
    listings: slice(discounted, 0, 10),
    href: "/catalog",
  },
  {
    id: "weekend",
    title: "Available this weekend",
    listings: listings.slice(15, 25),
    href: "/catalog",
  },
  {
    id: "trending",
    title: "Trending destinations",
    listings: listings.slice(20, 30),
    href: "/catalog",
  },
  {
    id: "new-england",
    title: "Explore New England",
    listings: listings.slice(25, 35),
    href: "/catalog?destination=Massachusetts",
  },
  {
    id: "coastal",
    title: "Coastal escapes",
    listings: listings.slice(30, 40),
    href: "/catalog?region=cape-cod",
  },
];
