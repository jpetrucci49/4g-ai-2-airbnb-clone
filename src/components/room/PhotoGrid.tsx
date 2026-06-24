"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui/SafeImage";
import { useCarousel } from "@/hooks/useCarousel";

interface PhotoGridProps {
  images: string[];
  title: string;
}

export function PhotoGrid({ images, title }: PhotoGridProps) {
  const main = images[0];
  const rest = images.slice(1, 5);

  return (
    <div id="room-photos" className="relative hidden gap-2 overflow-hidden rounded-xl md:grid md:grid-cols-4 md:grid-rows-2 md:h-[400px]">
      <div className="relative col-span-2 row-span-2">
        <SafeImage src={main} alt={title} fill sizes="50vw" priority />
      </div>
      {rest.map((img, i) => (
        <div key={i} className="relative">
          <SafeImage src={img} alt={`${title} ${i + 2}`} fill sizes="25vw" />
        </div>
      ))}
      <button
        type="button"
        className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-medium hover:shadow-md"
      >
        <span aria-hidden>▦</span>
        Show all photos
      </button>
    </div>
  );
}

interface PhotoCarouselProps {
  images: string[];
  title: string;
}

export function PhotoCarousel({ images, title }: PhotoCarouselProps) {
  const router = useRouter();
  const { index, next, prev } = useCarousel(images.length);

  return (
    <div id="room-photos" className="relative aspect-[4/3] md:hidden">
      <SafeImage src={images[index]} alt={title} fill sizes="100vw" priority />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-8 items-center justify-center rounded-full bg-white/90 shadow"
          aria-label="Back"
        >
          <ChevronLeftIcon size={16} />
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full bg-white/90 shadow"
            aria-label="Share"
          >
            <ShareIcon size={14} />
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full bg-white/90 shadow"
            aria-label="Save"
          >
            <HeartIcon size={14} />
          </button>
        </div>
      </div>

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

      <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
