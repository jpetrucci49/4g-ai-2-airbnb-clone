import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function Counter({ value, min = 0, max = 16, onIncrement, onDecrement }: CounterProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        className={cn(
          "flex size-8 items-center justify-center rounded-full border border-border-default text-lg transition-colors",
          value <= min
            ? "cursor-not-allowed text-text-muted"
            : "hover:border-text-primary text-text-secondary",
        )}
        aria-label="Decrease"
      >
        −
      </button>
      <span className="w-4 text-center text-sm">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        className={cn(
          "flex size-8 items-center justify-center rounded-full border border-border-default text-lg transition-colors",
          value >= max
            ? "cursor-not-allowed text-text-muted"
            : "hover:border-text-primary text-text-secondary",
        )}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}
