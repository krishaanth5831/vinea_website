"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Logo — Vinea's pixel-diamond mark. A 4-fold-symmetric arrangement of square
 * "pixels": four diagonal wedges around a cross-shaped negative space, with four
 * detached studs at the cardinal tips. Drawn in `currentColor` so it inherits
 * the theme foreground (works on light + dark). Optionally renders the "Vinea"
 * wordmark beside the mark.
 *
 * The mark assembles on mount — pixels scale/fade in from the centre outward,
 * a nod to the ASCII/pixel aesthetic. prefers-reduced-motion: static render.
 */

// 13×13 bitmap. '#' = filled pixel. A solid pixel-diamond with a 4-point star
// cut from the centre and four detached studs at the cardinal tips.
const GRID = [
  "......#......",
  ".....#.#.....",
  "....#####....",
  "...###.###...",
  "..####.####..",
  ".####...####.",
  "#.#.......#.#",
  ".####...####.",
  "..####.####..",
  "...###.###...",
  "....#####....",
  ".....#.#.....",
  "......#......",
];

const CELL = 10;
const CENTER = 6;

type Cell = { x: number; y: number; dist: number };

const CELLS: Cell[] = GRID.flatMap((row, r) =>
  row.split("").flatMap((ch, c) =>
    ch === "#"
      ? [{ x: c * CELL, y: r * CELL, dist: Math.abs(c - CENTER) + Math.abs(r - CENTER) }]
      : [],
  ),
);

type LogoProps = {
  className?: string;
  /** Show the "Vinea" wordmark next to the mark. */
  wordmark?: boolean;
  /** Run the assemble animation on mount. Default: true. */
  animated?: boolean;
};

export function Logo({ className, wordmark = false, animated = true }: LogoProps) {
  const reduced = useReducedMotion();
  const play = animated && !reduced;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <motion.svg
        viewBox="0 0 130 130"
        role="img"
        aria-label="Vinea"
        className="h-[1.4em] w-[1.4em] shrink-0"
        initial={play ? "hidden" : false}
        animate={play ? "shown" : false}
        variants={{ shown: { transition: { staggerChildren: 0.025 } } }}
      >
        {CELLS.map((cell, i) => (
          <motion.rect
            key={i}
            x={cell.x}
            y={cell.y}
            width={CELL}
            height={CELL}
            fill="currentColor"
            style={{ transformOrigin: `${cell.x + CELL / 2}px ${cell.y + CELL / 2}px` }}
            variants={{
              hidden: { opacity: 0, scale: 0.2 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: cell.dist * 0.03 },
              },
            }}
          />
        ))}
      </motion.svg>
      {wordmark && (
        <span className="font-mono text-xs uppercase tracking-[0.28em]">Vinea</span>
      )}
    </span>
  );
}
