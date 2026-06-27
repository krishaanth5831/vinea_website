"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem, AsciiField } from "@/components/motion";
import content from "../../lib/content";

const { product } = content;

export function Product() {
  const [active, setActive] = useState(0);
  const mod = product.modules[active];

  return (
    <Section id="product" className="border-t border-border">
      <Reveal>
        <Eyebrow index="02">{product.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {product.heading}
      </Reveal>
      <Reveal as="p" delay={0.14} className="mt-6 max-w-xl text-lead text-fg-muted">
        {product.body}
      </Reveal>

      {/* Module diagram + switcher */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Animated module panel — ASCII-art illustration that morphs per module */}
        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg border border-border bg-bg-elev">
          <AsciiField variant={active === 0 ? "cloud" : "scan"} />
          {/* Current module label */}
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted"
            >
              {mod.name}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Module selector */}
        <div>
          <p className="text-eyebrow mb-6">Swappable modules</p>
          <StaggerGroup as="ul" className="flex flex-col gap-3">
            {product.modules.map((m, i) => (
              <StaggerItem as="li" key={m.name}>
                <button
                  onClick={() => setActive(i)}
                  className={[
                    "w-full rounded-lg border p-5 text-left transition-colors",
                    active === i
                      ? "border-fg bg-bg-elev"
                      : "border-border bg-transparent hover:border-fg-muted",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-h3 font-semibold">{m.name}</span>
                    {active === i && (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "var(--motion-1)" }}
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-2 text-body text-fg-muted overflow-hidden"
                      >
                        {m.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
