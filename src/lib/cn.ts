import clsx, { type ClassValue } from "clsx";

/**
 * Tiny class-name joiner used across the UI primitives. Thin wrapper over clsx
 * so panes 3 & 4 can compose/override primitive styling cleanly.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
