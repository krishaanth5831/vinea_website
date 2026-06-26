import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Eyebrow — small uppercase mono label that sits above headings (BRAND: mono,
 * uppercase, wide tracking). Optionally renders a leading index marker, e.g.
 * "01 / Product", common on the reference sites.
 */
type EyebrowProps = {
  index?: string;
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p className={cn("text-eyebrow flex items-center gap-2", className)} {...props}>
      {index && (
        <>
          <span aria-hidden className="tabular-nums">
            {index}
          </span>
          <span aria-hidden className="opacity-40">
            /
          </span>
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
