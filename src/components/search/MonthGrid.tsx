"use client";

import { cn } from "@/lib/utils";
import { getDaysInMonth, isInRange, isSameDay } from "@/lib/date-utils";

interface MonthGridProps {
  year: number;
  month: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
}

export function MonthGrid({ year, month, checkIn, checkOut, onSelect }: MonthGridProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const monthName = new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="flex-1">
      <h3 className="mb-4 text-center text-sm font-semibold">{monthName}</h3>
      <div className="mb-2 grid grid-cols-7 text-center text-xs text-text-secondary">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const date = new Date(year, month, day);
          const isPast = date < today;
          const isStart = checkIn && isSameDay(date, checkIn);
          const isEnd = checkOut && isSameDay(date, checkOut);
          const inRange = isInRange(date, checkIn, checkOut);
          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={cn(
                "flex size-10 items-center justify-center text-sm transition-colors",
                isPast && "cursor-not-allowed text-text-muted",
                !isPast && !isStart && !isEnd && !inRange && "hover:rounded-full hover:bg-bg-subtle",
                inRange && "bg-bg-subtle",
                (isStart || isEnd) && "rounded-full bg-text-primary font-semibold text-white",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
