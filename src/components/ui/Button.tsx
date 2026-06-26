"use client";

import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";

/**
 * Button — monochrome, headless-ish action primitive with magnetic-ready
 * markup. The motion agent (pane 3) attaches its magnetic effect to the root
 * via `[data-magnetic]` and translates the inner `[data-magnetic-label]` span
 * independently for the classic "label lags the cursor" feel. Color may appear
 * only inside motion (e.g. an animated underline/glow), never on static UI.
 *
 * Render as a link by passing `as="a"` (or a Next <Link> via `as`).
 */
type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 " +
  "rounded-full border font-medium transition-colors duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "border-fg bg-fg text-bg hover:bg-fg-muted hover:border-fg-muted",
  outline: "border-fg bg-bg-elev text-fg hover:bg-fg hover:text-bg hover:border-fg",
  ghost: "border-transparent bg-transparent text-fg hover:bg-bg-elev",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-6 text-small",
  lg: "h-14 px-8 text-[1rem]",
};

type ButtonOwnProps = {
  as?: "button" | "a";
  variant?: Variant;
  size?: Size;
  /** Disable the magnetic data hooks (e.g. inside dense lists). */
  noMagnetic?: boolean;
  children?: ReactNode;
  className?: string;
};

type ButtonProps = ButtonOwnProps &
  Omit<
    ComponentPropsWithoutRef<"button"> & ComponentPropsWithoutRef<"a">,
    keyof ButtonOwnProps
  >;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { as = "button", variant = "solid", size = "md", noMagnetic, className, children, ...props },
    ref,
  ) {
    const Tag = as as "button";
    return (
      <Tag
        ref={ref as Ref<HTMLButtonElement>}
        data-magnetic={noMagnetic ? undefined : ""}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        <span data-magnetic-label className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </Tag>
    );
  },
);
