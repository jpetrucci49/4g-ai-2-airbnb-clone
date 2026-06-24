"use client";

import { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  listingId: string;
  className?: string;
}

export function WishlistButton({ className }: WishlistButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
      }}
      className={cn(
        "absolute right-3 top-3 z-10 rounded-full p-1.5 transition-transform hover:scale-110",
        className,
      )}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isSaved ? (
        <HeartFilledIcon size={22} />
      ) : (
        <HeartIcon size={22} className="fill-white/80 stroke-white" />
      )}
    </button>
  );
}
