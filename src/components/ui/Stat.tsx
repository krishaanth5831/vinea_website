import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Stat — a big monochrome figure with a mono caption (market/credibility
 * numbers). Static markup; pane 3 can wrap the value in a count-up animation.
 * The `value` is exposed via data-stat for that motion hook.
 */
type StatProps = {
  value: ReactNode;
  label: ReactNode;
  /** Optional small suffix shown after the value, e.g. "%", "×". */
  suffix?: string;
  className?: string;
};

export function Stat({ value, label, suffix, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        data-stat
        className="font-display text-h1 leading-none tracking-tight tabular-nums"
      >
        {value}
        {suffix && <span className="text-fg-muted">{suffix}</span>}
      </div>
      <div className="text-eyebrow">{label}</div>
    </div>
  );
}
