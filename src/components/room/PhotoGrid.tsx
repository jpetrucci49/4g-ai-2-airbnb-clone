"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui/SafeImage";
import { useCarousel } from "@/hooks/useCarousel";

interface PhotoGridProps {
  images: string[];
  title: string;
  onShowAll?: () => void;
}

export function PhotoGrid({ images, title, onShowAll }: PhotoGridProps) {
  const main = images[0];
  const rest = images.slice(1, 5);

  return (
    <div className="relative hidden gap-2 overflow-hidden rounded-xl md:grid md:grid-cols-4 md:grid-rows-2 md:h-[400px]">
      <div className="relative col-span-2 row-span-2">
        <SafeImage src={main} alt={title} fill sizes="50vw" priority />
      </div>
      {rest.map((img, i) => (
        <div key={i} className="relative">
          <SafeImage src={img} alt={`${title} ${i + 2}`} fill sizes="25vw" />
        </div>
      ))}
      {onShowAll && (
        <button
          type="button"
          onClick={onShowAll}
          className="absolute bottom-4 right-4 z-10 rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-medium hover:shadow-md"
        >
          Show all photos
        </button>
      )}
    </div>
  );
}

interface PhotoCarouselProps {
  images: string[];
  title: string;
}

export function PhotoCarousel({ images, title }: PhotoCarouselProps) {
  const { index, next, prev } = useCarousel(images.length);

  return (
    <div className="relative aspect-[4/3] md:hidden">
      <SafeImage
        src={images[index]}
        alt={title}
        fill
        sizes="100vw"
        priority
      />
      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
        aria-label="Previous"
      >
        <ChevronLeftIcon size={14} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
        aria-label="Next"
      >
        <ChevronRightIcon size={14} />
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`size-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
