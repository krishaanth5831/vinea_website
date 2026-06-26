"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { LenisProvider, ScrollProgress, Cursor } from "@/components/motion";

/**
 * App-wide client providers. next-themes drives the dark/light token system
 * (see globals.css). Class strategy + default dark per BRAND.md.
 *
 * LenisProvider (pane 3) supplies smooth scroll; ScrollProgress + Cursor are the
 * global motion chrome (both prefers-reduced-motion aware — see motion/).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LenisProvider>
        <ScrollProgress />
        <Cursor />
        {children}
      </LenisProvider>
    </ThemeProvider>
  );
}
