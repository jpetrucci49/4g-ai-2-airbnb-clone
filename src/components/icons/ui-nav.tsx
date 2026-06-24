"use client";

type IconProps = { className?: string; size?: number };
const defaultSize = 16;

export function ChevronLeftIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M20.03 4.97L9 16l11.03 11.03 1.41-1.41L11.83 16l9.61-9.62-1.41-1.41z" />
    </svg>
  );
}

export function ChevronRightIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M11.97 4.97L23 16 11.97 27.03l-1.41-1.41L20.17 16 10.56 6.38l1.41-1.41z" />
    </svg>
  );
}

export function CloseIcon({ className, size = defaultSize }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M6.4 4.93L4.93 6.4 14.53 16l-9.6 9.6 1.47 1.47L16 17.47l9.6 9.6 1.47-1.47L17.47 16l9.6-9.6-1.47-1.47L16 14.53 6.4 4.93z" />
    </svg>
  );
}
