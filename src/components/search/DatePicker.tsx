"use client";

import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  monthsToShow?: 1 | 2;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date > start && date < end;
}

function MonthGrid({
  year,
  month,
  checkIn,
  checkOut,
  onSelect,
}: {
  year: number;
  month: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const monthName = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="flex-1">
      <h3 className="mb-4 text-center text-sm font-semibold">{monthName}</h3>
      <div className="mb-2 grid grid-cols-7 text-center text-xs text-text-secondary">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
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

export function DatePicker({
  checkIn,
  checkOut,
  onChange,
  monthsToShow = 2,
}: DatePickerProps) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const handleSelect = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      onChange(date, null);
    } else if (date < checkIn) {
      onChange(date, null);
    } else {
      onChange(checkIn, date);
    }
  };

  const months = useMemo(() => {
    const result = [];
    for (let i = 0; i < monthsToShow; i++) {
      const d = new Date(viewDate.getFullYear(), viewDate.getMonth() + i, 1);
      result.push({ year: d.getFullYear(), month: d.getMonth() });
    }
    return result;
  }, [viewDate, monthsToShow]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
          }
          className="rounded-full p-2 hover:bg-bg-subtle"
          aria-label="Previous month"
        >
          <ChevronLeftIcon size={14} />
        </button>
        <button
          type="button"
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
          }
          className="rounded-full p-2 hover:bg-bg-subtle"
          aria-label="Next month"
        >
          <ChevronRightIcon size={14} />
        </button>
      </div>
      <div className={cn("flex gap-8", monthsToShow === 1 && "justify-center")}>
        {months.map(({ year, month }) => (
          <MonthGrid
            key={`${year}-${month}`}
            year={year}
            month={month}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
