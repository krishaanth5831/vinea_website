/**
 * Motion primitives barrel (pane 3 — Animation).
 * Framer Motion + Lenis. Everything here respects prefers-reduced-motion,
 * degrading to simple fades / static renders. Color appears ONLY inside these
 * animated elements (motion-accent palette), never on static UI — per BRAND.md.
 */
export { LenisProvider, useLenis } from "./LenisProvider";
export { Reveal } from "./Reveal";
export { StaggerGroup, StaggerItem } from "./StaggerGroup";
export { ScrollProgress } from "./ScrollProgress";
export { Parallax } from "./Parallax";
export { Magnetic } from "./Magnetic";
export { Cursor } from "./Cursor";
export { HeroCanvas } from "./HeroCanvas";
