import { HeroCanvas } from "@/components/motion";
import { Reveal } from "@/components/motion";
import { Magnetic } from "@/components/motion";
import { Section, Button, Eyebrow } from "@/components/ui";
import content from "../../lib/content";

const { hero } = content;

export function Hero() {
  return (
    <Section
      id="hero"
      bleed
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-14"
    >
      {/* Full-bleed animated canvas — the ONLY place color lives at rest */}
      <HeroCanvas className="absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-gutter)]">
        <Reveal delay={0}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal as="h1" delay={0.08} mask className="text-display mt-6 max-w-3xl">
          {hero.heading}
        </Reveal>
        <Reveal as="p" delay={0.18} className="mt-6 max-w-xl text-lead text-fg-muted">
          {hero.body}
        </Reveal>
        <Reveal delay={0.28} className="mt-10">
          <Magnetic strength={0.3}>
            <Button as="a" href={hero.cta.href} size="lg">
              {hero.cta.label}
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </Section>
  );
}
