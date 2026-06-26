# Vinea Website — Spec

## What Vinea is
A modular autonomous greenhouse robot: **one configurable base** that accepts **interchangeable modules** (harvesting + crop scouting to start). It works **inside existing greenhouse infrastructure** — no rebuild required. Robotics + AI are the core differentiators. Target beachhead: Dutch commercial greenhouse growers (tomato / cucumber / pepper) in Westland & Lansingerland.

**Business model:** Robotics-as-a-Service (RaaS) — €4,500–6,500 / robot / month, 12-month minimum, three tiers. (Confirm exact tier names/details from the vault before publishing pricing — or keep pricing off the public site and use "Request pricing".)

## Goal of the site
A credible, premium marketing/landing site that:
1. Explains the product and the RaaS model to greenhouse operators and potential cofounders/investors.
2. Captures interest (demo request / contact / waitlist).
3. Signals serious engineering through restrained, advanced motion design.

## Information architecture (single long-scroll landing page + a couple of subpages)
1. **Hero** — name "Vinea", one-line positioning, signature animation, primary CTA ("Request a demo").
2. **Problem** — labour scarcity / cost / margins in greenhouse growing (pull real framing from vault Pillars).
3. **Product / How it works** — the modular base + swappable modules (harvesting, scouting). Animated diagram of module-swapping.
4. **Capabilities** — autonomy, AI perception, works in existing greenhouses, etc.
5. **RaaS / Pricing model** — how RaaS works; tiers (or "request pricing").
6. **Why now / Market** — Dutch greenhouse market, labour trend (credible stats from vault research, cited).
7. **Roadmap / Vision** — pulled from the 12-month roadmap notes (kept high-level for public).
8. **About / Team** — solo founder + cofounder search framing (keep honest, forward-looking).
9. **Contact / CTA** — demo request form (and/or email), footer.

> Subpages optional: `/product`, `/about`. Start single-page.

## Constraints
- All public copy must be **grounded in the vault** — no invented specs, customers, or numbers. The vault-researcher agent owns this and flags anything uncertain as `TODO:VERIFY`.
- Pricing/financials: be conservative about what goes public. Default to "Request pricing" unless K7 confirms.
- Performance: Lighthouse 90+; respect `prefers-reduced-motion`.

## Stack
Next.js (App Router, TS) · Tailwind · Framer Motion · Lenis · deploy on Vercel.

## Reference sites
- https://stacklink.nl/ — B&W, motion, type, smooth scroll
- https://getcaveman.dev/ — B&W, minimalist, animated accents
