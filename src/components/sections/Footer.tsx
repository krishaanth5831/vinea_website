import { Container, Logo } from "@/components/ui";
import content from "../../lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Logo wordmark animated={false} className="text-fg-muted" />
        <p className="text-small text-fg-muted">
          © {new Date().getFullYear()} Vinea. All rights reserved.
        </p>
        <a
          href={`mailto:${content.contact.email}`}
          className="text-small text-fg-muted transition-colors hover:text-fg"
        >
          {content.contact.email}
        </a>
      </Container>
    </footer>
  );
}
