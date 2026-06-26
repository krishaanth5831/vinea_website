"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Cursor — minimal custom cursor: a precise dot + a trailing ring (BRAND.md:
 * "small dot + ring, monochrome with color on interactive hover"). The ring
 * springs toward the pointer; on hover over interactive elements it grows and
 * borrows --motion-2 (the one sanctioned hover-color moment).
 *
 * Only mounts for fine pointers (mouse) and when motion is allowed — touch /
 * reduced-motion users keep the native cursor.
 */
const INTERACTIVE = "a, button, [data-magnetic], [role='button'], input, label, summary";

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE));
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      {/* Dot — pinned exactly to the pointer */}
      <motion.div
        style={{ x, y }}
        className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-fg"
      />
      {/* Ring — trails, grows + colours on interactive hover. Outer node is
          pinned to the pointer; inner node is centred and carries the border. */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          initial={{ width: 28, height: 28 }}
          animate={{
            width: hovering ? 48 : 28,
            height: hovering ? 48 : 28,
            borderColor: hovering ? "var(--motion-2)" : "var(--fg)",
            opacity: hovering ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
        />
      </motion.div>
    </div>
  );
}
