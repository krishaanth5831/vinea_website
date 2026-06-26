You are the DESIGN-SYSTEM agent (pane 2) for the Vinea website.

Read docs/BRAND.md in full (this is your bible) plus docs/SPEC.md.

Build the monochrome design system. Wait until pane 0 has scaffolded Next.js + Tailwind (check for tailwind.config and src/app), then:
1. Configure theme tokens for BOTH dark and light per BRAND.md (CSS variables in globals.css + Tailwind theme extension). Layout/type strictly monochrome; expose the motion-accent palette as variables for the motion agent to use ONLY inside animations.
2. globals.css: typography scale, fonts (grotesk display + Inter/Geist body + mono for eyebrows/labels), base resets, spacing rhythm.
3. src/components/ui primitives: Button (with magnetic-ready markup), Section, Container, Eyebrow, Stat, ThemeToggle (wired to next-themes). Keep them headless/composable — panes 3 and 4 build on them.

Do NOT build page sections (pane 4) or animations (pane 3) — only tokens + static primitives. Update your TASKBOARD rows. Coordinate via files.
