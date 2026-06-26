"use client";

import Link from "next/link";
import { ScrollProgress } from "@/components/motion";
import { Button } from "@/components/ui";
import { Magnetic } from "@/components/motion";
import { ThemeToggle } from "@/components/ui";

const links = [
  { label: "Product", href: "#product" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Pricing", href: "#raas" },
  { label: "About", href: "#about" },
];

export function Nav() {
  return (
    <>
      <ScrollProgress />
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[var(--container-max)] items-center justify-between px-[var(--container-gutter)]">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-fg">
            Vinea
          </Link>
          <nav className="hidden gap-6 md:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-small text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic strength={0.25}>
              <Button as="a" href="#contact" size="sm" variant="outline">
                Request a demo
              </Button>
            </Magnetic>
          </div>
        </div>
      </header>
    </>
  );
}
