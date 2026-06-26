import { Section, Eyebrow, Button } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Magnetic } from "@/components/motion";
import content from "../../lib/content";

const { contact } = content;

export function Contact() {
  return (
    <Section id="contact" className="border-t border-border">
      <Reveal>
        <Eyebrow index="08">{contact.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" delay={0.06} mask className="text-display mt-6 max-w-3xl">
        {contact.heading}
      </Reveal>
      <Reveal as="p" delay={0.14} className="mt-6 max-w-xl text-lead text-fg-muted">
        {contact.body}
      </Reveal>

      <Reveal delay={0.22} className="mt-10 flex flex-wrap gap-4">
        <Magnetic strength={0.3}>
          <Button as="a" href={contact.cta.href} size="lg">
            {contact.cta.label}
          </Button>
        </Magnetic>
        <Magnetic strength={0.2}>
          <Button as="a" href={`mailto:${contact.email}`} size="lg" variant="ghost">
            {contact.email}
          </Button>
        </Magnetic>
      </Reveal>
    </Section>
  );
}
