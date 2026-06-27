"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * AsciiField — animated ASCII-art illustration (box.ascii.dev inspiration). An
 * intensity field is sampled into monospace glyphs on a <canvas>: it first
 * "decodes" out of random static when scrolled into view, then breathes with a
 * live shimmer. A handful of the most active glyphs twinkle in motion-accent
 * colour — the brand's "colour only in motion" rule, expressed as ASCII.
 *
 *  - `cloud` — an organic, dispersing swarm (the autonomous-agents motif).
 *  - `scan`  — a structured diamond with a sweeping scan line (the scout motif).
 *
 * Switching `variant` morphs the field live (no decode replay). The loop only
 * runs once the canvas is on-screen. prefers-reduced-motion: one static frame.
 */
type Variant = "cloud" | "scan";

const RAMP = " .·:-=+*o%#@";
const STATIC_GLYPHS = "01<>/\\|=+*#{}[]";
const FONT_PX = 13;

export function AsciiField({
  variant = "cloud",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(canvasRef, { once: true, margin: "0px 0px -10% 0px" });

  const variantRef = useRef<Variant>(variant);
  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const styles = getComputedStyle(document.documentElement);
    const accents = ["--motion-1", "--motion-2", "--motion-3"].map((v) =>
      styles.getPropertyValue(v).trim(),
    );
    const muted = styles.getPropertyValue("--fg-muted").trim();

    const cellW = FONT_PX * 0.62;
    const cellH = FONT_PX * 1.04;
    let cols = 0;
    let rows = 0;

    function resize() {
      const rect = ctx.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.canvas.width = Math.floor(rect.width * dpr);
      ctx.canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(rect.width / cellW);
      rows = Math.floor(rect.height / cellH);
      ctx.font = `${FONT_PX}px ui-monospace, monospace`;
      ctx.textBaseline = "alphabetic";
    }

    const hash = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const tl = hash(xi, yi);
      const tr = hash(xi + 1, yi);
      const bl = hash(xi, yi + 1);
      const br = hash(xi + 1, yi + 1);
      return tl * (1 - u) * (1 - v) + tr * u * (1 - v) + bl * (1 - u) * v + br * u * v;
    };

    /** Base intensity 0..1 for a cell at time t. */
    function intensity(cx: number, cy: number, t: number) {
      const nx = cx / cols - 0.5;
      const ny = (cy / rows - 0.5) * 1.15;
      if (variantRef.current === "scan") {
        const d = Math.abs(nx) + Math.abs(ny); // diamond distance
        let base = Math.max(0, 1 - d / 0.46);
        base *= 0.6 + 0.5 * noise(cx * 0.5, cy * 0.5);
        const scanY = (0.5 + 0.45 * Math.sin(t * 0.9)) * rows; // sweeping line
        base += Math.max(0, 1 - Math.abs(cy - scanY) / 1.2) * 0.9 * (d < 0.5 ? 1 : 0.3);
        return Math.min(1, base);
      }
      const r2 = nx * nx + ny * ny; // cloud
      let base = Math.exp(-r2 * 6.5);
      const flow = noise(cx * 0.28 + t * 0.45, cy * 0.28 - t * 0.25);
      base *= 0.45 + 1.1 * flow;
      return Math.min(1, base);
    }

    let raf = 0;
    const revealStart = performance.now();

    function draw(now: number) {
      const rect = ctx.canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const t = (now - revealStart) / 1000;
      const p = reduced ? 1 : Math.min(1, (now - revealStart) / 1300);

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const inten = intensity(cx, cy, t);
          const flick = reduced ? 0.5 : noise(cx * 0.6 + t * 1.4, cy * 0.6 - t * 1.0);

          let glyph: string;
          let decoding = false;
          if (p < 1 && Math.random() < (1 - p) * 0.8) {
            glyph = STATIC_GLYPHS[(Math.random() * STATIC_GLYPHS.length) | 0];
            decoding = true;
          } else {
            const lvl = Math.min(
              RAMP.length - 1,
              Math.max(0, Math.floor(inten * (0.78 + 0.42 * flick) * (RAMP.length - 1))),
            );
            glyph = RAMP[lvl];
          }
          if (glyph === " ") continue;

          const twinkle = !reduced && inten > 0.55 && flick > 0.82;
          if (twinkle || decoding) {
            const a = accents[(cx + cy * 2 + Math.floor(t * 3)) % accents.length];
            ctx.fillStyle = hexA(a, decoding ? 0.5 : 0.9);
          } else {
            ctx.fillStyle = hexA(muted, 0.18 + 0.6 * inten);
          }
          ctx.fillText(glyph, cx * cellW, cy * cellH + FONT_PX);
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(canvas);

    if (reduced) draw(performance.now());
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView, reduced]);

  return (
    <canvas ref={canvasRef} aria-hidden className={cn("h-full w-full", className)} />
  );
}

/** hex (#rrggbb) → rgba() with alpha. */
function hexA(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  if (h.length < 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
