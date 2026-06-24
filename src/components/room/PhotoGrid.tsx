import { SafeImage } from "@/components/ui/SafeImage";

export { PhotoCarousel } from "./PhotoCarousel";

interface PhotoGridProps {
  images: string[];
  title: string;
}

export function PhotoGrid({ images, title }: PhotoGridProps) {
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
      <button type="button" className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-medium hover:shadow-md">
        <span aria-hidden>▦</span>
        Show all photos
      </button>
    </div>
  );
}
