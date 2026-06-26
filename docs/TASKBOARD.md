# Taskboard — live ownership board

Each agent updates ONLY its own rows. Status: `TODO` | `DOING` | `DONE` | `BLOCKED(reason)`.
Read this before claiming work; don't touch another agent's files without coordinating via this board.

## Pane 0 — Orchestrator
- [x] DONE  Scaffold Next.js (App Router, TS, Tailwind v4, src/, @/*) into repo root
- [x] DONE  Install framer-motion, lenis, next-themes, clsx
- [x] DONE  Wire ThemeProvider (next-themes, class strategy, default dark) + baseline tokens in globals.css
- [x] DONE  Integrate sections into app/page.tsx (unblocked + completed by pane 4)
- [ ] DOING  Review build against BRAND.md + SPEC.md (continuous)
- [x] DONE  Resolve K7 open content decisions (founder, contact email, pricing hidden) → site-content.json
- [x] DONE  Commit + push shell/ui/motion/content to origin/dev (auth via WSL ~/.ssh/id_ed25519)

> Notes (pane 0):
> - Baseline globals.css token system in place; pane 2 has since extended it. Theme toggle works.
> - @pane3: HeroCanvas.tsx:32 had a TS build error (`canvas` possibly null in build()); added an
>   explicit `const canvas: HTMLCanvasElement` annotation to unblock `npm run build`. Keep it.

## Pane 1 — Vault-Researcher
- [x] DONE  Read vault (priority files in AGENTS.md)
- [x] DONE  Write docs/content/site-content.json (all sections, verified + sourced)
- [x] DONE  Write docs/content/RESEARCH-NOTES.md with sources + TODO:VERIFY
- NOTE  Content ready for panes 0/4. K7 decisions resolved 2026-06-26 (by pane 0): pricing stays hidden (publishPricing:false → "Request pricing"); founder shown publicly as "Krishaanth Ramaraj" (about.founder); contact email krishaanth@getvinea.nl. Still open: "75% labour" citation (hedged in copy), socials URLs. See RESEARCH-NOTES.md. NB: ensure the getvinea.nl inbox actually exists before launch.

## Pane 2 — Design-System
- [x] DONE  Theme tokens dark/light + motion-accent palette (Tailwind v4 @theme in globals.css — no tailwind.config; v4 is CSS-first)
- [x] DONE  globals.css (type scale, fonts via layout's Geist/Geist Mono, base resets, 8px/section spacing rhythm)
- [x] DONE  components/ui: Button (magnetic-ready), Container, Section, Eyebrow, Stat, ThemeToggle + barrel (src/components/ui/index.ts)
- NOTE  Pane 3 (motion): magnetic hooks on Button root `[data-magnetic]` + inner `[data-magnetic-label]`; Stat value carries `[data-stat]` for count-up. Tokens `--motion-1/2/3` (`text-motion-1` etc.) are ANIMATION-ONLY, never static UI.
- NOTE  Pane 4 (sections): import from `@/components/ui`; type utils `.text-eyebrow`/`.text-display`; size tokens `text-display/h1/h2/h3/lead/body/small`; `Section` handles vertical rhythm + Container (`bleed` for hero canvas).

## Pane 3 — Animation
- [x] DONE  Lenis smooth-scroll provider (src/components/motion/LenisProvider.tsx — wired into providers.tsx alongside ScrollProgress + Cursor)
- [x] DONE  Reveal/stagger primitives: Reveal (mask/translate), StaggerGroup+StaggerItem, ScrollProgress (accent gradient bar), Parallax — all prefers-reduced-motion aware
- [x] DONE  HeroCanvas — line-mesh + agent traversal (modular-robot motif), motion-accent palette, pointer attractor bloom, resolves to monochrome at rest; static mesh render for reduced-motion
- [x] DONE  Magnetic.tsx (pairs with Button [data-magnetic]/[data-magnetic-label]) + Cursor (dot+ring, monochrome base, --motion-2 on interactive hover)
- NOTE  Pane 4 (sections): import from `@/components/motion`; use <HeroCanvas> in bleed hero area, wrap CTAs in <Magnetic>, text blocks in <Reveal> or <StaggerGroup>+<StaggerItem>

## Pane 4 — Sections
- [x] DONE  Hero, Problem, Product, Capabilities
- [x] DONE  RaaS, Market, Roadmap, About, Contact
- [x] DONE  Compose from ui + motion, fill from site-content.json
- [x] DONE  Nav + Footer (fixed top bar, theme toggle, scroll-progress; brand footer)
- [x] DONE  Wire all sections into app/page.tsx; green build confirmed
