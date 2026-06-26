import { Section, Eyebrow, Stat, Button } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { Magnetic } from "@/components/motion";
import content from "../../lib/content";

const { raas } = content;

export function RaaS() {
  return (
    <Section id="raas" className="border-t border-border">
      <Reveal>
        <Eyebrow index="04">{raas.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-h1 mt-6 max-w-2xl">
        {raas.heading}
      </Reveal>
      <Reveal as="p" delay={0.14} className="mt-6 max-w-xl text-lead text-fg-muted">
        {raas.body}
      </Reveal>

      {/* Key stat */}
      <Reveal delay={0.2} className="mt-12">
        <Stat value={raas.stats[0].value} label={raas.stats[0].label} />
      </Reveal>

      {/* Tiers — shown only if publishPricing is true; otherwise show CTA */}
      {raas.publishPricing ? (
        <StaggerGroup
          as="ul"
          delayChildren={0.2}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {raas.tiers.map((tier) => (
            <StaggerItem as="li" key={tier.name}>
              <div
                className={[
                  "flex h-full flex-col gap-4 rounded-lg border p-8",
                  (tier as { featured?: boolean }).featured
                    ? "border-fg bg-bg-elev"
                    : "border-border bg-transparent",
                ].join(" ")}
              >
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-fg-muted">
                  {tier.name}
                </p>
                <p className="font-display text-h2 leading-none tracking-tight">{tier.price}</p>
                <p className="text-small text-fg-muted">{tier.includes}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <Reveal delay={0.25} className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="text-lead text-fg-muted">
            Pricing is tailored to fleet size and crop. Request a quote to see the numbers.
          </p>
          <Magnetic strength={0.25} className="shrink-0">
            <Button as="a" href="#contact" variant="outline">
              Request pricing
            </Button>
          </Magnetic>
        </Reveal>
      )}
    </Section>
  );
}
