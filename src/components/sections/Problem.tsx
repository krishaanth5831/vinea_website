import { Section, Eyebrow, Stat } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import content from "../../lib/content";

const { problem } = content;

export function Problem() {
  return (
    <Section id="problem">
      <Reveal>
        <Eyebrow index="01">{problem.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {problem.heading}
      </Reveal>
      <Reveal as="p" delay={0.14} className="mt-6 max-w-xl text-lead text-fg-muted">
        {problem.body}
      </Reveal>

      {/* Stats row */}
      <StaggerGroup
        as="dl"
        delayChildren={0.2}
        className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-3"
      >
        {problem.stats.map((s) => (
          <StaggerItem key={s.value}>
            <Stat value={s.value} label={s.label} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Bullet list */}
      <StaggerGroup as="ul" delayChildren={0.3} className="mt-12 flex flex-col gap-3">
        {problem.bullets.map((b) => (
          <StaggerItem as="li" key={b} className="flex items-start gap-3 text-fg-muted text-body">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-muted" aria-hidden />
            {b}
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
