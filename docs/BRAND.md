# Vinea — Design System & Brand

> Single source of truth for visual language. Every build agent reads this before writing UI.

## Core principle
**Monochrome layout, color only in motion.** The page — type, layout, borders, backgrounds — is strictly black & white (and grays). Color is reserved exclusively for *animations*: it appears as a moving accent (gradient sweep, particle, line draw, hover bloom) and resolves back to monochrome at rest. This is the defining rule of the brand. References: [stacklink.nl](https://stacklink.nl/), [getcaveman.dev](https://getcaveman.dev/).

## Theme tokens (CSS variables)
Support **dark and light** themes via `data-theme` on `<html>`, default = dark.

```
Dark theme              Light theme
--bg        #0A0A0A     #FAFAF8
--bg-elev   #141414     #FFFFFF
--fg        #FAFAFA     #0A0A0A
--fg-muted  #A1A1AA     #52525B
--border    #262626     #E4E4E7
--accent    (motion-only — see below)
```

### Motion-only accent palette
Only used inside animated elements, never on static UI:
```
--motion-1 #00E5A0  (electric green — nods to Vinea/greenhouse)
--motion-2 #5B8CFF  (cobalt)
--motion-3 #FF5C38  (warm coral, sparingly)
```
Use as gradients/glows on: hero canvas, link underlines on hover, scroll-progress, section reveals, the robot/loop animation.

## Typography
Match the reference sites' tight, modern, technical feel.
- **Display / headings:** a grotesk — `Geist`, `Inter Tight`, or `Neue Montreal`-style. Large, tight tracking (-0.02em to -0.04em), heavy weight for hero.
- **Body:** `Inter` / `Geist Sans`, 16–18px, relaxed line-height (1.6).
- **Mono (labels, eyebrows, stats):** `Geist Mono` / `JetBrains Mono`, uppercase, letter-spacing 0.1em, small.
- Big type scale; generous whitespace; left-aligned.

## Layout & spacing
- Max content width ~1200px, generous gutters.
- 8px spacing grid. Big vertical rhythm between sections (120–200px).
- Thin 1px borders in `--border`, subtle dividers, lots of negative space.

## Animation language (advanced + minimalist)
- **Smooth scroll** via Lenis. Scroll-linked progress + parallax.
- **Reveal on scroll:** text masks up, opacity+translateY, staggered (Framer Motion `whileInView`, stagger 0.06s).
- **Hero:** one signature animated piece (e.g. animated line-mesh / orbiting modular-robot motif / generative grid) — the *only* place color lives prominently.
- **Magnetic / hover** effects on buttons + links; animated underlines.
- **Page/section transitions:** clip-path or mask wipes, not flashy slides.
- **Cursor:** optional custom minimal cursor (small dot + ring), monochrome with color on interactive hover.
- Respect `prefers-reduced-motion` — degrade to fades.
- Keep it restrained: motion should feel engineered, not decorative.

## Tone of voice (copy)
Confident, technical, understated. Short sentences. No hype words. Sounds like a serious robotics company, not a hype startup. Dutch-market credible.
