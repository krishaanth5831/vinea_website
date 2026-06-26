import { Section, Eyebrow } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import content from "../../lib/content";

const { capabilities } = content;

export function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-border">
      <Reveal>
        <Eyebrow index="03">{capabilities.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {capabilities.heading}
      </Reveal>

      <StaggerGroup
        as="ul"
        delayChildren={0.15}
        className="mt-14 grid gap-px border border-border sm:grid-cols-2"
      >
        {capabilities.bullets.map((b, i) => (
          <StaggerItem
            as="li"
            key={i}
            className="flex gap-4 bg-bg p-8 text-body text-fg-muted"
          >
            <span className="mt-0.5 font-mono text-xs tabular-nums text-fg-muted/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{b}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
