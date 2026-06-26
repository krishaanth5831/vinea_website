# Vinea — Website

Marketing site for **Vinea**: a modular autonomous greenhouse robot, sold as Robotics-as-a-Service (RaaS) to commercial greenhouse growers.

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis (smooth scroll)
- **Aesthetic:** Black & white minimalist, dark/light theme. Layout/type are monochrome; **color appears only inside animations.** Inspiration: [stacklink.nl](https://stacklink.nl/), [getcaveman.dev](https://getcaveman.dev/)
- **Deploy target:** Vercel

## Build model

This site is built by a team of coordinated Claude Code agents running in tmux (WSL). See [`docs/AGENTS.md`](docs/AGENTS.md) for the agent roster and coordination protocol, [`docs/SPEC.md`](docs/SPEC.md) for the product/site spec, and [`docs/BRAND.md`](docs/BRAND.md) for the design system.

Site content is sourced from the Vinea Obsidian vault and written to [`docs/content/site-content.json`](docs/content/site-content.json) by the vault-researcher agent.

## Dev

```bash
npm install
npm run dev
```
