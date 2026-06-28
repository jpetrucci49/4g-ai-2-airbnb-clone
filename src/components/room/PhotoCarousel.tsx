"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui/SafeImage";
import { useCarousel } from "@/hooks/useCarousel";

interface PhotoCarouselProps {
  images: string[];
  title: string;
}

export function PhotoCarousel({ images, title }: PhotoCarouselProps) {
  const router = useRouter();
  const { index, next, prev } = useCarousel(images.length);

  const hasMultiple = images.length > 1;

  return (
    <div id="room-photos" className="relative aspect-[4/3] md:hidden">
      <SafeImage src={images[index]} alt={title} fill sizes="100vw" priority />
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
        <button type="button" onClick={() => router.back()} className="flex size-8 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Back">
          <ChevronLeftIcon size={16} />
        </button>
        <div className="flex gap-2">
          <button type="button" className="flex size-8 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Share">
            <ShareIcon size={14} />
          </button>
          <button type="button" className="flex size-8 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Save">
            <HeartIcon size={14} />
          </button>
        </div>
      </div>
      {hasMultiple && (
        <>
          <button type="button" onClick={prev} className="absolute left-3 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Previous">
            <ChevronLeftIcon size={14} />
          </button>
          <button type="button" onClick={next} className="absolute right-3 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Next">
            <ChevronRightIcon size={14} />
          </button>
          <div className="absolute bottom-3 right-3 z-10 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
