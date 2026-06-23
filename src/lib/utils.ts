import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(checkIn: Date, checkOut: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const start = checkIn.toLocaleDateString("en-US", opts);
  const end = checkOut.toLocaleDateString("en-US", {
    ...opts,
    year: checkIn.getFullYear() !== checkOut.getFullYear() ? "numeric" : undefined,
  });
  return `${start} - ${end}`;
}
