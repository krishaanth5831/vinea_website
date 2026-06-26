# Taskboard — live ownership board

Each agent updates ONLY its own rows. Status: `TODO` | `DOING` | `DONE` | `BLOCKED(reason)`.
Read this before claiming work; don't touch another agent's files without coordinating via this board.

## Pane 0 — Orchestrator
- [x] DONE  Scaffold Next.js (App Router, TS, Tailwind v4, src/, @/*) into repo root
- [x] DONE  Install framer-motion, lenis, next-themes, clsx
- [x] DONE  Wire ThemeProvider (next-themes, class strategy, default dark) + baseline tokens in globals.css
- [ ] DOING  Integrate sections into app/page.tsx (waiting on pane 4 components)
- [ ] DOING  Review build against BRAND.md + SPEC.md (continuous)
- [ ] DOING  Commit + push to GitHub remote (scaffold pushed; will push integrations)

> Note: baseline globals.css holds the BRAND token system + `dark` class variant so the
> theme toggle works. Pane 2 owns/extends this file. `npm run build` passes on the shell.

## Pane 1 — Vault-Researcher
- [ ] TODO  Read vault (priority files in AGENTS.md)
- [ ] TODO  Write docs/content/site-content.json (all sections)
- [ ] TODO  Write docs/content/RESEARCH-NOTES.md with sources + TODO:VERIFY

## Pane 2 — Design-System
- [ ] TODO  tailwind.config + theme tokens (dark/light, motion-accent palette)
- [ ] TODO  globals.css (typography, base)
- [ ] TODO  components/ui: Button, Section, Eyebrow, Stat, ThemeToggle

## Pane 3 — Animation
- [ ] TODO  Lenis smooth-scroll provider
- [ ] TODO  Reveal/stagger primitives (prefers-reduced-motion aware)
- [ ] TODO  Hero signature animation (the colored piece)
- [ ] TODO  Magnetic buttons + custom cursor

## Pane 4 — Sections
- [ ] TODO  Hero, Problem, Product, Capabilities
- [ ] TODO  RaaS, Market, Roadmap, About, Contact
- [ ] TODO  Compose from ui + motion, fill from site-content.json
