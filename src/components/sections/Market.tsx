import { Section, Eyebrow, Stat } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import content from "../../lib/content";

const { market } = content;

export function Market() {
  return (
    <Section id="market" className="border-t border-border">
      <Reveal>
        <Eyebrow index="05">{market.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {market.heading}
      </Reveal>
      <Reveal as="p" delay={0.14} className="mt-6 max-w-xl text-lead text-fg-muted">
        {market.body}
      </Reveal>

      <StaggerGroup
        as="dl"
        delayChildren={0.2}
        className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-3"
      >
        {market.stats.map((s) => (
          <StaggerItem key={s.value}>
            <Stat value={s.value} label={s.label} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
