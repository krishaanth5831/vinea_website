"use client";

import { useRef } from "react";
import type { ReactNode, PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Magnetic — wraps an interactive element (button/link) and pulls it toward the
 * cursor on hover (BRAND.md: "Magnetic / hover effects on buttons + links").
 * The inner element carrying [data-magnetic-label] lags behind the root for the
 * classic "label trails the cursor" feel — this pairs with pane 2's Button,
 * which already ships those data hooks.
 *
 * prefers-reduced-motion: renders an inert wrapper, no pointer tracking.
 */
type MagneticProps = {
  children: ReactNode;
  /** How far the root is allowed to travel toward the cursor, px. */
  strength?: number;
  /** Extra travel applied to the [data-magnetic-label], px. */
  labelStrength?: number;
  className?: string;
};

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

export function Magnetic({
  children,
  strength = 18,
  labelStrength = 8,
  className,
}: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const lx = useSpring(useMotionValue(0), SPRING);
  const ly = useSpring(useMotionValue(0), SPRING);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const nx = (relX / (rect.width / 2)) * strength;
    const ny = (relY / (rect.height / 2)) * strength;
    x.set(nx);
    y.set(ny);
    lx.set((relX / (rect.width / 2)) * labelStrength);
    ly.set((relY / (rect.height / 2)) * labelStrength);
    setLabel(el, lx, ly);
  }

  function reset() {
    x.set(0);
    y.set(0);
    lx.set(0);
    ly.set(0);
    if (ref.current) setLabel(ref.current, lx, ly);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/** Apply the lag transform to the inner [data-magnetic-label], if present. */
function setLabel(
  root: HTMLElement,
  lx: MotionValue<number>,
  ly: MotionValue<number>,
) {
  const label = root.querySelector<HTMLElement>("[data-magnetic-label]");
  if (label) {
    label.style.transform = `translate3d(${lx.get()}px, ${ly.get()}px, 0)`;
    label.style.transition = "transform 0.15s ease-out";
  }
}
