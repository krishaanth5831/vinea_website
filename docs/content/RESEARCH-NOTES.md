# Vinea — Research Notes (Vault-Researcher / pane 1)

Longer-form findings behind `site-content.json`. Everything here is sourced to the Vinea
Obsidian vault (read-only). Where the vault does not confirm something, it is flagged
`TODO:VERIFY` and listed at the bottom. Vault read on 2026-06-26.

> Status of the underlying project (from vault `CLAUDE.md`, updated 2026-06-07):
> **Idea Anatomy phase COMPLETE (9/9 pillars). Moving into Validation.** No prototype,
> no customers, no deployments, no signed partners yet. The site must reflect a
> pre-prototype company that is honest about stage. Do **not** imply traction that
> does not exist.

---

## The Vinea narrative (the spine of the site)

Dutch greenhouse operators (tomato, cucumber, pepper) are bleeding ~€1.6M/year per
5-hectare site on manual harvesting and scouting **at the exact moment** their seasonal
labour supply is structurally collapsing — and **at the exact moment** computer-vision
hardware has crossed the cost/reliability threshold that makes robotic harvesting
buildable by a small team. A funded competitor (SAIA Agrobotics, €10M raised) has proved
investors will back the thesis — but their approach requires rebuilding the greenhouse,
leaving ~95% of the market unserved.

The opening: **one modular robot base** that works inside *existing* greenhouse
infrastructure, accepting swappable **harvest** and **scout** modules, sold as a
**monthly service (RaaS)** that is cheaper than the labour it replaces from month one —
and that becomes harder to leave (and harder to compete with) every season it runs,
because every deployment makes the shared dataset, and therefore the product, better.

The economics model at 40–80:1 LTV:CAC **if** the throughput assumption holds — a robot
sustaining ~450–600 fruit/hr to replace 3 workers. That single number is the load-bearing
bet the prototype must prove; everything else is downstream of it.

Source: `01 Ideation/(C) Idea Anatomy — Full Compilation` ("The Whole Thing in One
Paragraph" + all 9 pillar summaries).

---

## Sourcing per site section

### brand / hero
- One-line pitch, tagline, "no rebuild / monthly service / harder to leave" framing —
  `Compilation: The One-Line Pitch` + `Pillar 6 — Business Model`.

### problem
- **€1.6M/year per 5-ha site** on manual harvest + scouting — `Pillar 1 — Problem` /
  Compilation §1.
- **~8 workers/ha, ~€38,200/worker/year** — `Pillar 1` / Compilation §1.
- **~95% of market unserved** by rebuild-required robots (SAIA requires full greenhouse
  rebuild) — `Pillar 1` / Compilation §1.
- **75% reported drop in available greenhouse labour** — `Pillar 1` / Compilation §1.
  Note: the vault states this as a *reported* figure; copy is hedged ("reports of",
  "reported drop") deliberately — keep that hedge in the UI.

### product / capabilities
- One configurable base; same chassis/compute/nav; only gripper, row-width adapter, and
  licensed modules vary — `Pillar 5 — Solution` / Compilation §5.
- Harvest module (picking + de-leafing, CV-guided, crop-specific grippers, tomato first)
  and Scout module (daily passes, disease/pest detection **3–5 days before visible
  symptoms**, grower dashboard) — `Pillar 5` / Compilation §5.
- **6-DOF off-the-shelf arm** (UR5e / xArm / myCobot class) — `MVP Hardware Concept v1` §2.
- **Soft silicone adaptive (Fin Ray-style) gripper** that warps to fruit shape to prevent
  bruising; small blade for stem detachment — `MVP Hardware Concept v1` §5.
- **Dual coarse-to-fine vision**: fixed plant-wide camera for fruit location + eye-in-hand
  camera for ripeness verification — `MVP Hardware Concept v1` §3.
- "Every deployment improves the shared model" — data flywheel, `Pillar 8 — Moat` (moat #1).

### raas
- RaaS, no upfront purchase, hardware+software+maintenance+data, **12-month minimum** —
  `Pillar 6` / Compilation §6.
- Tiers: Harvest **€4,500**, Harvest+Scout (default) **€5,800**, Full Analytics **€6,500**
  per robot/month — `Pillar 6` table / `Business — Unit Economics & Pricing`.
- **€4,300–7,600/month net saving per robot** vs. labour replaced (1 robot ≈ 3–4 workers
  at €3,362/month each) — `Pillar 7 — Unit Economics` / Compilation §7.
- Other unit-econ figures NOT surfaced on the public site (see sensitivity flags): LTV
  €940k–1.25M, CAC €10–22k, LTV:CAC 40–80:1, gross margin 75–85%, payback 5–7 months.

### market
- **TAM ~$2.3–3.1B/year by 2033** (global harvesting/scouting robotics) — `Pillar 4` /
  Compilation §4.
- **SAM (NL, full penetration) ~€167–223M/year, ~587 addressable farms** — `Pillar 4`.
- **Vision tech cost collapse**: RGB-D $500→$150, **LiDAR $10k→<$1k (2020–2024)** —
  `Pillar 3 — Why Now` / Compilation §3. ("70%+ fall in vision-sensor costs" is a
  conservative restatement of these — RGB-D ≈70%, LiDAR ≈90%.)
- **SAIA €10M raise**; **€450M+ Dutch agricultural-innovation funding**; HIC venture
  studio (Bleiswijk), TU Delft RoboHouse — `Pillar 3` / Compilation §3.
- "2026 = the dawn of horticultural robotics" — Dutch regional development authorities'
  policy framing, per `Pillar 3` / Compilation §3.

### roadmap
- Validation now (talk to 5+ Dutch growers before building) → prototype the core throughput
  bet → first direct pilot in Westland/Lansingerland → channel partners (Ridder, Priva,
  Royal Brinkman) then Belgium/Spain (Almería) expansion. **Sequential, not simultaneous.**
  — `Compilation` §2 (GTM sequencing), §4, "What's Locked vs Open".

### about
- Solo founder (K7), EE/hardware foundation (Degla AI), decade-long pull toward agribotics,
  honest about lacking greenhouse/CV depth. Cross-faculty proto team first, deeper domain
  experts once funded. **Cofounder filter: obsession over credentials.** — `Pillar 9 —
  Why You` / `Cofounder Search — Where to Look`.

### contact
- No public email/domain confirmed yet. `Going Public Checklist` shows domain registration,
  email setup (`you@vinea.xx` or `vinea.startup@gmail.com`), and LinkedIn page are all
  still **unchecked / not started**. → contact CTA left as `mailto:TODO:VERIFY`.

---

## TODO:VERIFY list (must be confirmed with K7 before publishing)

1. ~~**Contact email / domain**~~ — RESOLVED 2026-06-26 (K7): `contact.cta.href = mailto:krishaanth@getvinea.nl`.
2. ~~**Company / founder name to display publicly**~~ — RESOLVED 2026-06-26 (K7): founder shown
   publicly as **Krishaanth Ramaraj** (`about.founder`).
3. **"75% less greenhouse labour"** — STILL OPEN. Vault carries this as a *reported* figure without a
   primary citation. Hedged in copy; confirm a citable source before treating it as hard.
4. **Tagline / one-liner final wording** — drawn verbatim-ish from the vault pitch; confirm
   K7 is happy with the public phrasing.
5. **LinkedIn / socials URLs** — none exist yet; footer social links should stay empty or
   be added once the pages are live.

---

## Public-sensitivity flags (recommend NOT publishing, or gating)

- **Pricing (€4,500 / €5,800 / €6,500 tiers).** `raas.publishPricing` is set to `false`.
  SPEC.md and the vault both lean toward "Request pricing" until K7 explicitly approves
  putting numbers on a public page. Tiers/prices are kept in the JSON for internal use but
  the UI should default to the "Request pricing" CTA, not a price table. **RESOLVED 2026-06-26
  (K7): pricing stays hidden — `publishPricing` remains `false`, use "Request pricing".**
- **Internal unit economics** — LTV, CAC, LTV:CAC (40–80:1), gross margin, BOM payback.
  Deliberately **excluded** from `site-content.json`. These are investor-deck figures, not
  public marketing copy. Do not surface.
- **Competitor naming (SAIA Agrobotics).** The "~95% unserved" framing depends on the claim
  that the only funded competitor requires a greenhouse rebuild. Public copy states the
  *category* ("rebuild-required robots") rather than naming the competitor, to avoid a
  combative/defamation-adjacent posture. Keep it that way unless K7 wants SAIA named.
- **Stage honesty.** No customers, pilots, or partners exist. Copy must not imply
  deployments. Roadmap is phrased as intent ("Now / Next / Then / Later"), not as done work.
  Channel-partner names (Ridder, Priva, Royal Brinkman) are *targets* — do **not** present
  them as existing partnerships anywhere in the UI.

---

## Connections (vault files read)

`CLAUDE.md` · `01 Ideation/(C) Idea Anatomy — Full Compilation` · Pillars 1–9 ·
`03 MVP Concept/(C) MVP Hardware Concept v1` · `05 Pitch/(C) Going Public Checklist`.
