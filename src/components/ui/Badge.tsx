import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "favorite" | "discount" | "new";
  className?: string;
}

const variants = {
  default: "bg-white/90 text-text-primary",
  favorite: "bg-white/95 text-text-primary shadow-sm",
  discount: "text-success font-medium",
  new: "bg-text-primary text-white text-[10px] px-1.5 py-0.5 rounded",
};

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-md px-2 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
