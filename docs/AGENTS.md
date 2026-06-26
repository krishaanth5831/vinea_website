# Multi-Agent Build Plan (tmux / WSL)

This site is built by **5 Claude Code agents**, each in its own tmux pane, coordinating through shared files in this repo. No agent guesses content or style — everything flows from the shared docs below.

## How agents know what to do (coordination protocol)
There is **no shared memory** between Claude Code instances. They coordinate through **files on disk**, which all panes can read/write because they share this repo:

- `docs/SPEC.md` — what to build (IA, sections, constraints). Written by the Orchestrator.
- `docs/BRAND.md` — how it should look/move (design system). Written by the Orchestrator.
- `docs/content/site-content.json` — **the content source of truth.** Written by the Vault-Researcher from the Obsidian vault. Every UI agent reads copy/stats/section text from here — never invents it.
- `docs/content/RESEARCH-NOTES.md` — researcher's longer findings + `TODO:VERIFY` flags.
- `docs/TASKBOARD.md` — the live to-do/ownership board. Each agent updates its own rows (status: TODO / DOING / DONE / BLOCKED). This is how panes hand off and avoid colliding.

**Rule:** before starting any task, an agent reads SPEC + BRAND + the relevant slice of site-content.json, then claims its row in TASKBOARD.md.

## The 5 agents

| # | tmux pane | Agent | Owns | Reads | Writes |
|---|-----------|-------|------|-------|--------|
| 0 | `lead` | **Orchestrator / Integrator** | Scaffolds the Next.js app, owns SPEC/BRAND/TASKBOARD, wires content into pages, resolves merge conflicts, runs `npm run dev`/build, commits & pushes git. | everything | SPEC, BRAND, TASKBOARD, app shell, git |
| 1 | `vault` | **Vault-Researcher (content)** | Reads the Vinea Obsidian vault, extracts the real story, and writes structured copy. **Read-only on the vault.** Flags anything unconfirmed as `TODO:VERIFY`. | the Obsidian vault (read-only) | `site-content.json`, `RESEARCH-NOTES.md` |
| 2 | `design` | **Design-System** | Tailwind config, theme tokens (dark/light), global CSS, typography, the monochrome+motion-accent token system, base UI primitives (Button, Section, Eyebrow, ThemeToggle). | BRAND.md | `tailwind.config`, `globals.css`, `components/ui/*` |
| 3 | `motion` | **Animation** | Lenis smooth scroll, scroll-reveal primitives, hero signature animation (the only colorful piece), magnetic buttons, custom cursor, page/section transitions. Respects `prefers-reduced-motion`. | BRAND.md, design tokens | `components/motion/*`, hero canvas |
| 4 | `sections` | **Sections/Build** | Builds each page section (Hero, Problem, Product, RaaS, Market, Roadmap, About, Contact) by composing design + motion primitives and filling them with `site-content.json`. | SPEC, content.json, ui + motion components | `components/sections/*`, `app/page.tsx` |

### Dependency order (so panes don't block each other)
1. **Orchestrator** scaffolds the app first (everyone needs the repo to exist).
2. **Vault-Researcher** and **Design-System** run fully in parallel right after — neither depends on the other.
3. **Animation** starts once design tokens exist (depends on pane 2).
4. **Sections** starts once content.json + ui/motion primitives exist (depends on 1,2,3,4) — it's the integrator-side assembly and runs last/continuously.
5. **Orchestrator** integrates, reviews against BRAND/SPEC, and pushes.

## The Vault-Researcher in detail (the content brain)
- Vault location (read-only): `/mnt/c/Users/20252433/OneDrive - TU Eindhoven/Documents/k7_ideaverse_2.0/03 Projects/Vinea`
- Priority reads: `CLAUDE.md`, `01 Ideation/(C) Idea Anatomy — Full Compilation`, all 9 Pillars, `03 MVP Concept/(C) MVP Hardware*`, `04 Business Case/(C) Business Case*`, `05 Pitch/(C) Roadmap*`, `00 Research/*`.
- Output `site-content.json` shape: one object per site section (hero, problem, product, capabilities, raas, market, roadmap, about, contact) with `eyebrow`, `heading`, `body`, `bullets[]`, `stats[]{value,label,source}`, `cta`.
- **Never invent numbers.** Every stat carries a `source`. Unconfirmed → `TODO:VERIFY`.
- Does **not** write the public site directly. It only writes content files; UI agents consume them.

## Why 5 (and not more/fewer)
- Fewer than ~4 and content/design/motion serialize and you lose the parallelism tmux buys you.
- More than 5 and they start colliding on the same files (sections especially). 5 maps cleanly onto the 5 distinct concerns with minimal overlap: integrate · content · design · motion · assembly.
