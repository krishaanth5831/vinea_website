"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

/**
 * ThemeToggle — switches the next-themes dark/light token system (BRAND:
 * default dark). Mono icons, no color. Renders a stable placeholder until
 * mounted to avoid hydration mismatch (theme is unknown on the server).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg",
        "transition-colors duration-200 hover:border-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
        className,
      )}
    >
      {/* Render only after mount so the icon matches the active theme */}
      {mounted ? (
        <span aria-hidden className="text-[1rem] leading-none">
          {isDark ? "☾" : "☀"}
        </span>
      ) : (
        <span aria-hidden className="h-4 w-4" />
      )}
    </button>
  );
}
