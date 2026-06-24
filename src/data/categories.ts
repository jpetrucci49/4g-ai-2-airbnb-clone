import type { Category } from "@/types";

export const homeCategories: Category[] = [
  { id: "all", label: "All", icon: "all" },
  { id: "mansions", label: "Mansions", icon: "mansions" },
  { id: "icons", label: "Icons", icon: "icons" },
  { id: "tropical", label: "Tropical", icon: "tropical" },
  { id: "amazing-views", label: "Amazing views", icon: "views" },
  { id: "lakefront", label: "Lakefront", icon: "lakefront" },
  { id: "beach", label: "Beach", icon: "beach" },
  { id: "cabins", label: "Cabins", icon: "cabins" },
  { id: "top-cities", label: "Top cities", icon: "cities" },
  { id: "camping", label: "Camping", icon: "camping" },
  { id: "play", label: "Play", icon: "play" },
  { id: "trending", label: "Trending", icon: "trending" },
];

export const navCategories: Category[] = [
  { id: "homes", label: "Homes", icon: "homes" },
  { id: "experiences", label: "Experiences", icon: "experiences", isNew: true },
  { id: "services", label: "Services", icon: "services", isNew: true },
];
