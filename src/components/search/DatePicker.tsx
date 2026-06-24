"use client";

import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { MonthGrid } from "@/components/search/MonthGrid";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  monthsToShow?: 1 | 2;
}

export function DatePicker({
  checkIn,
  checkOut,
  onChange,
  monthsToShow = 2,
}: DatePickerProps) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const handleSelect = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) onChange(date, null);
    else if (date < checkIn) onChange(date, null);
    else onChange(checkIn, date);
  };

  const months = useMemo(() => {
    return Array.from({ length: monthsToShow }, (_, i) => {
      const d = new Date(viewDate.getFullYear(), viewDate.getMonth() + i, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }, [viewDate, monthsToShow]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="rounded-full p-2 hover:bg-bg-subtle"
          aria-label="Previous month"
        >
          <ChevronLeftIcon size={14} />
        </button>
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
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
