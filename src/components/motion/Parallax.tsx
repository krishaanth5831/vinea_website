"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Parallax — translates its children as it passes through the viewport.
 * `speed` > 0 moves slower than scroll (recedes), < 0 moves faster (leads).
 *
 * prefers-reduced-motion: renders a static wrapper, no transform.
 */
type ParallaxProps = {
  children: ReactNode;
  /** -1..1 range works well. Positive = lags scroll. */
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = 0.2, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 120 * speed;
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 140, damping: 30, restDelta: 0.01 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
