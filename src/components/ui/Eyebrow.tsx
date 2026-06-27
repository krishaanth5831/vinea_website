import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Scramble } from "@/components/motion";

/**
 * Eyebrow — small uppercase mono label that sits above headings (BRAND: mono,
 * uppercase, wide tracking). Optionally renders a leading index marker, e.g.
 * "01 / Product", common on the reference sites. String children run through a
 * monospace "decode" scramble on scroll-in (box.ascii.dev inspiration); pass
 * `scramble={false}` to opt out.
 */
type EyebrowProps = {
  index?: string;
  scramble?: boolean;
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({
  index,
  scramble = true,
  className,
  children,
  ...props
}: EyebrowProps) {
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
      {scramble && typeof children === "string" ? (
        <Scramble text={children} />
      ) : (
        <span>{children}</span>
      )}
    </p>
  );
}
