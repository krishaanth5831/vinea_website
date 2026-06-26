import { Section, Eyebrow } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import content from "../../lib/content";

const { roadmap } = content;

export function Roadmap() {
  return (
    <Section id="roadmap" className="border-t border-border">
      <Reveal>
        <Eyebrow index="06">{roadmap.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {roadmap.heading}
      </Reveal>

      <StaggerGroup
        as="ol"
        delayChildren={0.15}
        className="relative mt-16 flex flex-col"
      >
        {/* Vertical connector line */}
        <div
          className="absolute top-3 bottom-3 left-[3.25rem] w-px bg-border"
          aria-hidden
        />

        {roadmap.milestones.map((m, i) => (
          <StaggerItem as="li" key={m.phase} className="flex gap-8 py-6">
            {/* Phase badge */}
            <div className="relative flex w-24 shrink-0 flex-col items-end">
              <span className="relative z-10 rounded-full border border-border bg-bg px-2 py-0.5 font-mono text-xs uppercase tracking-[0.1em] text-fg-muted">
                {m.phase}
              </span>
            </div>
            <div>
              <h3 className="font-display text-h3">{m.title}</h3>
              <p className="mt-2 text-body text-fg-muted">{m.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
