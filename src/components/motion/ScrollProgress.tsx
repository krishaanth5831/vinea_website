"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ScrollProgress — a thin fixed bar tracking page scroll. This is one of the
 * sanctioned spots for the motion-accent palette: the bar is a subtle gradient
 * sweep of --motion-1/2/3 (BRAND.md). Sits at the top of the viewport.
 *
 * prefers-reduced-motion: still shown (it's a static indicator, not decorative),
 * but without the spring smoothing.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduced ? 1000 : 120,
    damping: reduced ? 100 : 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--motion-1), var(--motion-2), var(--motion-3))",
        }}
      />
    </motion.div>
  );
}
