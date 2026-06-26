import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Section — a full-width page section with the big vertical rhythm from
 * BRAND.md (120–200px via --spacing-section). By default it wraps children in
 * a Container; pass `bleed` for full-bleed content (e.g. the hero canvas).
 */
type SectionProps<T extends ElementType> = {
  as?: T;
  /** Skip the inner Container (full-bleed content controls its own width). */
  bleed?: boolean;
  /** Tighten top/bottom padding (e.g. stacked sub-sections). */
  compact?: boolean;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Section<T extends ElementType = "section">({
  as,
  bleed = false,
  compact = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps<T>) {
  const Tag = (as ?? "section") as ElementType;
  return (
    <Tag
      className={cn(
        compact
          ? "py-[clamp(64px,8vw,112px)]"
          : "py-[var(--spacing-section)]",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}
