"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * HeroCanvas — the site's ONE signature animation and the one place color lives
 * prominently (BRAND.md). A monochrome modular grid-mesh with a few autonomous
 * "agents" (the orbiting modular-robot motif) that travel node-to-node, laying
 * down a motion-accent trail and lighting the nodes they touch. At rest the
 * accent eases back toward monochrome — color only while there's motion.
 *
 * The cursor acts as an attractor: nodes near it bloom in --motion-1/2/3.
 *
 * prefers-reduced-motion: a single static monochrome render of the mesh (no
 * loop, no color), so reduced-motion users still get the structural visual.
 */
type HeroCanvasProps = { className?: string };

type Node = { x: number; y: number; bx: number; by: number; glow: number };
type Agent = { i: number; target: number; t: number; color: string };

const ACCENTS = ["--motion-1", "--motion-2", "--motion-3"];

export function HeroCanvas({ className }: HeroCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const canvas: HTMLCanvasElement = ref.current;
    const ctx = canvas.getContext("2d")!;

    const styles = getComputedStyle(document.documentElement);
    const readVar = (name: string) => styles.getPropertyValue(name).trim();
    const accents = ACCENTS.map(readVar);
    const lineColor = readVar("--border");
    const nodeColor = readVar("--fg-muted");

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    const GAP = 64;
    const NEIGHBOR = GAP * 1.5;

    let nodes: Node[] = [];
    let edges: Array<[number, number]> = [];
    let agents: Agent[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function build() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / GAP) + 1;
      rows = Math.ceil(height / GAP) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // slight deterministic jitter for an organic, engineered-not-rigid mesh
          const jx = Math.sin(r * 12.9 + c * 4.1) * 8;
          const jy = Math.cos(r * 3.7 + c * 9.3) * 8;
          const x = c * GAP + jx;
          const y = r * GAP + jy;
          nodes.push({ x, y, bx: x, by: y, glow: 0 });
        }
      }

      // precompute neighbour edges once (cheap per-frame redraw afterwards)
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].bx - nodes[j].bx, nodes[i].by - nodes[j].by);
          if (d > 0 && d < NEIGHBOR) edges.push([i, j]);
        }
      }

      // a few agents that hop along the grid — the modular-robot motif
      const count = Math.max(3, Math.min(6, Math.floor((cols * rows) / 90)));
      agents = Array.from({ length: count }, (_, k) => {
        const i = Math.floor(Math.random() * nodes.length);
        return {
          i,
          target: neighborOf(i),
          t: Math.random(),
          color: accents[k % accents.length],
        };
      });
    }

    function neighborOf(i: number): number {
      const n = nodes[i];
      const candidates: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const d = Math.hypot(nodes[j].bx - n.bx, nodes[j].by - n.by);
        if (d > 0 && d < NEIGHBOR) candidates.push(j);
      }
      return candidates.length
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : i;
    }

    function drawMesh(animate: boolean) {
      ctx.clearRect(0, 0, width, height);

      // 1) faint monochrome neighbour lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      for (const [i, j] of edges) {
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // 2) nodes — monochrome base, accent bloom where glowing
      for (const n of nodes) {
        const g = n.glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4 + g * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
        if (animate && g > 0.02) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2 + g * 5, 0, Math.PI * 2);
          ctx.fillStyle = withAlpha(accents[0], g * 0.5);
          ctx.fill();
        }
      }
    }

    function step() {
      // pointer attraction + glow decay
      for (const n of nodes) {
        const dx = pointer.x - n.bx;
        const dy = pointer.y - n.by;
        const dist = Math.hypot(dx, dy);
        const pull = pointer.active ? Math.max(0, 1 - dist / 180) : 0;
        n.x += (n.bx + dx * 0.12 * pull - n.x) * 0.08;
        n.y += (n.by + dy * 0.12 * pull - n.y) * 0.08;
        n.glow += (pull - n.glow) * 0.1;
        n.glow *= 0.96; // resolve toward monochrome at rest
      }

      // agents hop node→node, dragging an accent trail
      for (const ag of agents) {
        ag.t += 0.018;
        const from = nodes[ag.i];
        const to = nodes[ag.target];
        const ease = ag.t * ag.t * (3 - 2 * ag.t);
        const px = from.x + (to.x - from.x) * ease;
        const py = from.y + (to.y - from.y) * ease;

        // light the trail node + draw the travelling pulse
        to.glow = Math.min(1, to.glow + 0.04);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(px, py);
        ctx.strokeStyle = withAlpha(ag.color, 0.8);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = ag.color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(ag.color, 0.18);
        ctx.fill();

        if (ag.t >= 1) {
          ag.i = ag.target;
          ag.target = neighborOf(ag.i);
          ag.t = 0;
        }
      }
    }

    let raf = 0;
    function loop() {
      drawMesh(true);
      step();
      raf = requestAnimationFrame(loop);
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    build();
    const ro = new ResizeObserver(() => {
      build();
      if (reduced) drawMesh(false);
    });
    ro.observe(canvas);

    if (reduced) {
      drawMesh(false); // single static monochrome render
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  );
}

/** Convert a hex CSS color (#rrggbb) to rgba() with the given alpha. */
function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  if (h.length < 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
