"use client";

import { Children } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Marquee — an infinite horizontal scroller (degla.ai inspiration). The track is
 * duplicated and translated with a CSS keyframe (`--marquee` in globals.css) for
 * a seamless GPU-cheap loop. Pauses on hover.
 *
 * prefers-reduced-motion: the track is static (no translate).
 */
type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  duration?: number;
  /** Scroll right-to-left (default) or left-to-right. */
  reverse?: boolean;
  className?: string;
};

export function Marquee({
  children,
  duration = 28,
  reverse = false,
  className,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul
      aria-hidden={ariaHidden}
      className={cn(
        "flex shrink-0 items-center gap-12 pr-12",
        !reduced && "animate-[marquee_var(--marquee-duration)_linear_infinite]",
      )}
      style={
        {
          "--marquee-duration": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group/marquee flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex group-hover/marquee:[animation-play-state:paused] [&_*]:group-hover/marquee:[animation-play-state:paused]">
        <Track />
        {!reduced && <Track ariaHidden />}
      </div>
    </div>
  );
}
