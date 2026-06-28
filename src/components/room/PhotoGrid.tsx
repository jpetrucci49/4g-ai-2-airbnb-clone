"use client";

import { SafeImage } from "@/components/ui/SafeImage";

export { PhotoCarousel } from "./PhotoCarousel";

interface PhotoGridProps {
  images: string[];
  title: string;
  onShowAll?: (startIndex?: number) => void;
}

export function PhotoGrid({ images, title, onShowAll }: PhotoGridProps) {
  const main = images[0];
  const rest = images.slice(1, 5);

  const openAt = (index: number) => onShowAll?.(index);

  return (
    <div className="relative hidden gap-2 overflow-hidden rounded-xl md:grid md:grid-cols-4 md:grid-rows-2 md:h-[400px]">
      <button
        type="button"
        onClick={() => openAt(0)}
        className="relative col-span-2 row-span-2 cursor-pointer"
        aria-label="View photo 1"
      >
        <SafeImage src={main} alt={title} fill sizes="50vw" priority />
      </button>
      {rest.map((img, i) => (
        <button
          key={i}
          type="button"
          onClick={() => openAt(i + 1)}
          className="relative cursor-pointer"
          aria-label={`View photo ${i + 2}`}
        >
          <SafeImage src={img} alt={`${title} ${i + 2}`} fill sizes="25vw" />
        </button>
      ))}
      {onShowAll && (
        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-medium hover:shadow-md"
        >
          <span aria-hidden>▦</span>
          Show all photos
        </button>
      )}
    </div>
  );
}
