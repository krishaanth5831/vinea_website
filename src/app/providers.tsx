"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * App-wide client providers. next-themes drives the dark/light token system
 * (see globals.css). Class strategy + default dark per BRAND.md.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
