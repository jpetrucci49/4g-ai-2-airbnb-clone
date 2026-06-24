import Link from "next/link";
import { GlobeIcon, MenuIcon, UserIcon } from "@/components/icons";

export function UserMenu() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href="#"
        className="hidden rounded-full px-4 py-2.5 text-sm font-medium hover:bg-bg-subtle lg:block"
      >
        Become a host
      </Link>
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-full hover:bg-bg-subtle"
        aria-label="Language and currency"
      >
        <GlobeIcon size={18} />
      </button>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-border-default py-1.5 pl-3 pr-1.5 hover:shadow-sm"
        aria-label="User menu"
      >
        <MenuIcon size={16} />
        <span className="flex size-8 items-center justify-center rounded-full bg-text-secondary text-white">
          <UserIcon size={16} />
        </span>
      </button>
    </div>
  );
}
