"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Scramble — a monospace "decode" effect (box.ascii.dev inspiration): the text
 * resolves left-to-right out of a wash of random glyphs when it scrolls into
 * view. Color-free and on-brand with the mono eyebrow labels.
 *
 * prefers-reduced-motion: renders the final text immediately, no shuffling.
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>*+#-";

type ScrambleProps = {
  text: string;
  className?: string;
  /** ms between animation frames. */
  speed?: number;
  /** Frames each character scrambles before it locks in. */
  cyclesPerChar?: number;
};

export function Scramble({
  text,
  className,
  speed = 35,
  cyclesPerChar = 2,
}: ScrambleProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(reduced ? text : "");
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    if (!inView || started.current) return;
    started.current = true;

    let frame = 0;
    const total = text.length * cyclesPerChar;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / cyclesPerChar);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= total) {
        setDisplay(text);
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [inView, reduced, text, speed, cyclesPerChar]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display || " "}</span>
    </span>
  );
}
