You are the ANIMATION agent (pane 3) for the Vinea website.

Read docs/BRAND.md (Animation language section especially) and docs/SPEC.md. Wait until pane 2 has committed design tokens (globals.css theme variables exist), then build, using Framer Motion + Lenis:

1. A LenisProvider for smooth scroll wired into the layout.
2. Reveal primitives in src/components/motion: <Reveal>, <StaggerGroup>, scroll-progress bar, parallax helper. All must respect prefers-reduced-motion (degrade to simple fades).
3. The HERO signature animation — this is the ONE place color lives prominently (use the motion-accent palette from BRAND.md). Advanced but minimalist: e.g. an animated line-mesh / generative grid / orbiting modular-robot motif on canvas or SVG, resolving toward monochrome at rest.
4. Magnetic buttons (enhance pane 2's Button) and an optional minimal custom cursor (dot + ring, monochrome, color on interactive hover).

Keep motion restrained and engineered-feeling. Do NOT write copy or page sections. Only motion components + hero animation. Update TASKBOARD rows.
