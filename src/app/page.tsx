/*
 * Integration shell. Pane 4 (Sections) produces section components in
 * src/components/sections/*; the Orchestrator wires them here in SPEC.md order:
 * Hero · Problem · Product · Capabilities · RaaS · Market · Roadmap · About · Contact.
 * Until those land, this renders a minimal monochrome placeholder.
 */
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
          Vinea
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Autonomous greenhouse robotics
        </h1>
        <p className="mt-4 text-fg-muted">
          Site under construction — sections are being integrated.
        </p>
      </div>
    </main>
  );
}
