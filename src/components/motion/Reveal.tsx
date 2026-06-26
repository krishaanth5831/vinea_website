"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Reveal — the core scroll-in primitive (BRAND.md: "opacity + translateY,
 * staggered"). Animates once when the element enters the viewport.
 *
 * prefers-reduced-motion: degrades to a plain opacity fade (no translate/clip).
 */
type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Seconds of delay before this element animates. */
  delay?: number;
  /** Travel distance in px for the translateY (ignored when reduced). */
  y?: number;
  /** Use a text-mask wipe (clip-path up) instead of translate. */
  mask?: boolean;
  className?: string;
  /** Re-run every time it enters the viewport. Default: once. */
  once?: boolean;
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  mask = false,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once }}
        transition={{ duration: 0.4, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  const hidden = mask
    ? { opacity: 0, clipPath: "inset(0 0 100% 0)", y }
    : { opacity: 0, y };
  const shown = mask
    ? { opacity: 1, clipPath: "inset(0 0 -10% 0)", y: 0 }
    : { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
