"use client";

import Link from "next/link";
import { useCarousel } from "@/hooks/useCarousel";
import type { Listing } from "@/types";
import { cn } from "@/lib/utils";
import { PropertyCardDetails } from "./PropertyCardDetails";
import { PropertyCardImage } from "./PropertyCardImage";

interface PropertyCardProps {
  listing: Listing;
  variant?: "grid" | "carousel" | "catalog";
  className?: string;
}

export function PropertyCard({ listing, variant = "grid", className }: PropertyCardProps) {
  const { index, next, prev } = useCarousel(listing.images.length);

  return (
    <Link href={`/rooms/${listing.id}`} className={cn("group block", className)}>
      <PropertyCardImage
        listing={listing}
        variant={variant}
        index={index}
        onPrev={(e) => { e.preventDefault(); prev(); }}
        onNext={(e) => { e.preventDefault(); next(); }}
      />
      <PropertyCardDetails listing={listing} variant={variant} />
    </Link>
  );
}
