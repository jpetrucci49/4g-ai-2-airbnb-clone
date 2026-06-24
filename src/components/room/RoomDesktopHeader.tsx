import { ShareIcon, HeartIcon } from "@/components/icons";

export function RoomDesktopHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 hidden items-start justify-between md:flex">
      <h1 className="text-[26px] font-semibold">{title}</h1>
      <div className="flex gap-4">
        <button type="button" className="flex items-center gap-2 text-sm font-medium underline">
          <ShareIcon size={14} /> Share
        </button>
        <button type="button" className="flex items-center gap-2 text-sm font-medium underline">
          <HeartIcon size={14} /> Save
        </button>
      </div>
    </div>
  );
}
