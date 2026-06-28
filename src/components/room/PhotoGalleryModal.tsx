"use client";

import { useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui/SafeImage";
import { useCarousel } from "@/hooks/useCarousel";

interface PhotoGalleryModalProps {
  images: string[];
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

export function PhotoGalleryModal({
  images,
  title,
  initialIndex = 0,
  onClose,
}: PhotoGalleryModalProps) {
  const { index, next, prev, goTo } = useCarousel(images.length);

  useEffect(() => {
    goTo(initialIndex);
  }, [initialIndex, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Close gallery"
        >
          <CloseIcon size={16} />
        </button>
        <span className="text-sm font-medium">
          {index + 1} / {images.length}
        </span>
        <div className="size-8" aria-hidden />
      </div>

      <div className="relative flex flex-1 items-center justify-center px-14">
        <SafeImage
          src={images[index]}
          alt={`${title} ${index + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
              aria-label="Previous photo"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
              aria-label="Next photo"
            >
              <ChevronRightIcon size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
