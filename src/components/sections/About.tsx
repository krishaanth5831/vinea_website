import { Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import content from "../../lib/content";

const { about } = content;

export function About() {
  return (
    <Section id="about" className="border-t border-border">
      <Reveal>
        <Eyebrow index="07">{about.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {about.heading}
      </Reveal>
      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal as="p" delay={0.14} className="text-lead text-fg-muted">
          {about.body}
        </Reveal>
        <Reveal delay={0.22}>
          <div className="rounded-lg border border-border bg-bg-elev p-8">
            <p className="font-display text-h3">{about.founder.name}</p>
            <p className="mt-1 text-eyebrow">{about.founder.role}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
