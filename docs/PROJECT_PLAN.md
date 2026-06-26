# Vinea Website — Project Plan

The one-page map of how this site gets built. Detail lives in the linked docs.

## Goal
A credible, premium marketing site for **Vinea** — a modular autonomous greenhouse robot sold as Robotics-as-a-Service. It explains the product and RaaS model to growers, cofounders, and investors, and captures demo requests.

## Stack
Next.js (App Router, TS) · Tailwind CSS · Framer Motion · Lenis (smooth scroll) · deploy on Vercel.

## Aesthetic (see [BRAND.md](BRAND.md))
Black & white, minimalist, dark/light theme. **Color appears only inside animations** — the layout and type stay monochrome. Inspiration: [stacklink.nl](https://stacklink.nl/), [getcaveman.dev](https://getcaveman.dev/).

## How it's built — 5 agents in tmux (see [AGENTS.md](AGENTS.md))
Claude Code instances don't share memory, so they coordinate through **files in this repo**:
- [SPEC.md](SPEC.md) — what to build (information architecture, constraints)
- [BRAND.md](BRAND.md) — how it looks/moves (design system)
- [content/site-content.json](content/site-content.json) — **content source of truth**, seeded from the Obsidian vault; UI agents read copy from here and never invent it
- [TASKBOARD.md](TASKBOARD.md) — live ownership board; each agent claims and updates its own rows

| Pane | Agent | Owns |
|---|---|---|
| 0 | Orchestrator | scaffold, integrate, build, git push |
| 1 | Vault-Researcher | reads the vault (read-only), writes content |
| 2 | Design-System | tokens, theme, typography, UI primitives |
| 3 | Animation | Lenis, scroll reveals, hero signature animation, magnetic UI |
| 4 | Sections | builds each section, fills copy from content.json |

## Build order
1. Orchestrator scaffolds the Next.js app.
2. Vault-Researcher + Design-System run in parallel.
3. Animation starts once design tokens exist.
4. Sections assembles once content + primitives + motion exist.
5. Orchestrator integrates, reviews against BRAND/SPEC, pushes.

## Launch (WSL Ubuntu)
One-time: open Ubuntu, run `claude` and authenticate (machine-wide). Then:
```bash
cd /mnt/c/Users/20252433/Desktop/website_vinea
bash scripts/start-agents.sh   # opens tmux with all 5 panes
```

## Definition of done
- All sections from SPEC built and integrated, copy sourced from content.json
- Dark + light themes both correct; color confined to animations
- `prefers-reduced-motion` respected; `npm run build` clean; Lighthouse 90+
- No `TODO:VERIFY` left in published content (e.g. contact email)
- Deployed to Vercel
