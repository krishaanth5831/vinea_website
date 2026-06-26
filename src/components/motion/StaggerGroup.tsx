"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * StaggerGroup / StaggerItem — orchestrate a set of children that reveal in
 * sequence (BRAND.md: "staggered, stagger 0.06s"). Wrap a list in
 * <StaggerGroup> and each child in <StaggerItem>.
 *
 * prefers-reduced-motion: items fade in together with no translate.
 */
type GroupProps = {
  children: ReactNode;
  as?: ElementType;
  /** Delay between each child, seconds. */
  stagger?: number;
  /** Initial delay before the first child, seconds. */
  delayChildren?: number;
  className?: string;
  once?: boolean;
};

export function StaggerGroup({
  children,
  as = "div",
  stagger = 0.06,
  delayChildren = 0,
  className,
  once = true,
}: GroupProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        shown: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = {
  children: ReactNode;
  as?: ElementType;
  y?: number;
  className?: string;
};

export function StaggerItem({ children, as = "div", y = 20, className }: ItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0.4 : 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
