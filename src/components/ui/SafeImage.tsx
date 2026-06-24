"use client";

import { useState } from "react";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const common = {
    src: imgSrc,
    alt,
    className: cn(className, fill && "object-cover"),
    sizes,
    priority,
    onError: () => setImgSrc(PLACEHOLDER_IMAGE),
  };

  if (fill) {
    return <Image {...common} fill />;
  }

  return <Image {...common} width={width ?? 800} height={height ?? 600} />;
}
