import { Marquee } from "@/components/motion";
import { Logo } from "@/components/ui";

const ITEMS = [
  "Autonomous harvesting",
  "Robotics as a service",
  "No greenhouse rebuild",
  "Tomato first",
  "Scout · pick · de-leaf",
  "Priced against a wage",
];

/**
 * Ribbon — a full-bleed infinite marquee of capability keywords (degla.ai-style
 * scrolling strip). Sits between sections as a rhythmic monochrome break.
 */
export function Ribbon() {
  return (
    <div className="border-y border-border bg-bg-elev py-5">
      <Marquee duration={32}>
        {ITEMS.map((item) => (
          <span
            key={item}
            className="flex items-center gap-12 font-mono text-xs uppercase tracking-[0.28em] text-fg-muted"
          >
            {item}
            <Logo animated={false} className="text-fg-muted/60" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
