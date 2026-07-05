# Documentation TOC — First-Principles × Diátaxis Audit

> A structured review of [`DOCUMENTATION_TOC.md`](./DOCUMENTATION_TOC.md) against two lenses:
> the **first-principles mental model** (decompose to irreducible needs, rebuild; don't reason by analogy or convenience)
> and the **Diátaxis framework** (tutorial / how-to / reference / explanation, derived from the two axes of craft).
> Scope: the information architecture the TOC *mirrors* (sidebar order, page placement, per-page mode), plus the TOC artifact itself.
> Date: 2026-06-06. Sources: `the-great-mental-models.md`, `diataxis-model.md`, and the live `docs/` tree.

---

## TL;DR — the verdict

- **The skeleton is right.** A nine-Part *journey* spine with per-page Diátaxis badges, persona reading-paths, "Out of scope" bounding, and "Related: complementary-quadrant" boxes is exactly what Diátaxis prescribes for a complex product. **Keep it.** Do **not** restructure into four top-level boxes.
- **The discipline has leaked.** The docs *declare* "pages are exactly one type… the documentation does not mix modes on a single page" (`documentation-guide.md:49`). Spot-checks show that promise is **broken on real pages** — Explanation pages carrying hard reference tables and payload schemas, How-to pages carrying full reference enumerations and a state-machine diagram. This is Diátaxis "blur," and it is the single highest-value thing to fix.
- **The blur is duplication, not gap-filling.** The canonical reference homes for the leaked content **already exist** in Part 9. So the fix is *extract-and-link*, which also kills a silent **drift risk** (two copies of the same fact).
- **One quadrant is thin.** Tutorials are essentially one (Quick Start) plus one *buried* fleet tutorial. First principles asks "which user need is unserved?" — the *learning-oriented* need is under-served and under-discoverable. (Fix discoverability first; only add a tutorial if a real need exists — do **not** manufacture empty structure.)
- **Two pages are filed by topic but mis-filed by mode**: a Tutorial living inside a how-to cluster, and a How-to living inside the Reference Part.

Net: the architecture doesn't need redrawing — it needs **mode purity enforced inside it**, plus a few relocations and a smarter TOC artifact.

---

## Part A — The combined lens (why these two frameworks are one argument)

The request pairs "first principles" with "Diátaxis." These are not two separate audits; **Diátaxis *is* the first-principles model of documentation**, and reading them together is what makes the findings sharp.

First-principles thinking (the Musk/Aristotle move in `the-great-mental-models.md`) says: stop reasoning by analogy ("how have docs like this been organised before?") and reduce the problem to truths that cannot be decomposed further, then build up. Diátaxis's *Foundations* does exactly this for documentation. It reduces "what does a documentation user need?" to **two irreducible axes**:

- **action ↔ cognition** (doing vs. knowing)
- **acquisition ↔ application** (study vs. work)

Two binary axes define a plane with **exactly four quadrants** — tutorial, how-to, reference, explanation — "necessarily four… not three, or five." That is a first-principles derivation, not a list someone liked. So:

> A first-principles audit of these docs **is** a Diátaxis audit — plus one meta-question the mental-models book forces us to ask: *have the authors reasoned from need-atoms, or have they drifted into analogy and convenience?*

Several other models from `the-great-mental-models.md` map cleanly onto specific Diátaxis principles and onto specific findings below:

| Mental model (from the book) | Diátaxis counterpart | Where it shows up in this audit |
|---|---|---|
| **First principles** — reduce to irreducible truths | The four needs derived from two axes | The whole audit; "one mode per page" |
| **Circle of competence** — know your boundary | "Keep explanation closely bounded"; "omit the unnecessary" | The excellent "Out of scope" sections (commend) |
| **The map is not the territory** | "Reference should mirror the machinery" | Part 9 mirrors MGMT/CTRL/DATA (commend); the TOC itself is a map |
| **Confirmation bias** (ch. 1) | — | The docs *declare* purity, then assume it; this audit is the disconfirming check |
| **Commitment & consistency bias** (ch. 5) | — | Use it positively: hold the docs to the standard they publicly committed to |
| **Inversion** (Munger: avoid failure > seek brilliance) | The "blur" failure-mode warning | Ask "what quietly destroys these docs?" → mode-mixing, drift, unfindable tutorials |
| **Lollapalooza** — overlapping systems compound | "Make connections" | Badges + breadcrumbs + Related boxes + persona paths + API cross-walk compound into navigation |
| **Scenario analysis** — pre-run the day | (user-journey thinking) | Persona reading-paths in `start.md` / `documentation-guide.md` |

The most useful single framing: the docs are in a **commitment-and-consistency + confirmation-bias trap of their own making**. Having written "we do not mix modes," the natural human tendency is to *believe it's true* and stop checking. The audit's job is the disconfirming evidence.

---

## Part B — What the TOC already gets right (keep these)

These are not throwaway compliments; each is a Diátaxis principle executed well, and each should be **protected** during any change.

1. **Journey-major, mode-minor top structure is correct.** Diátaxis explicitly warns that it is "not a scheme into which documentation must be placed — four boxes," and that complex products legitimately organise by topic/journey with the four modes living *inside*. The nine Parts (orient → foundations → quick start → manage → read → observe → scale → diagnose → reference) are the documented "journey around the map" / cycle of interaction (learning → goals → information → understanding). **This is textbook complex-hierarchy Diátaxis.**
2. **Per-page Diátaxis badges already exist** (📘/📗/📙/📕) and are declared in `documentation-guide.md`. The framework is *adopted*, not just admired — the problem is enforcement, which is a much better place to be.
3. **Reference mirrors the machinery.** Part 9's command reference is organised MGMT / CTRL / Data & events, mirroring the endpoint taxonomy — "respect the structure of the machinery." A map that matches the territory.
4. **"Out of scope" sections are everywhere.** This is simultaneously Diátaxis bounding ("keep explanation closely bounded," "omit the unnecessary") and the first-principles **circle of competence**. Genuinely excellent and rare. Universalise it.
5. **"Related: complementary-quadrant" boxes** implement Diátaxis "make connections" and the cross-quadrant journey, and the **"See in the API Reference"** callouts implement the docs↔reference pairing. This is the Lollapalooza of overlapping navigation aids.
6. **Persona reading-paths** (`start.md`, `documentation-guide.md`) are scenario analysis: they pre-run each reader's day and route them to the right entry point. Diátaxis endorses exactly this ("a user may enter the documentation anywhere").

---

## Part C — Findings & recommendations

Each finding: **observation → evidence → principle violated → TOC/IA change.** Ordered by value.

### C1 — Mode-blur on single pages (highest value) — *verified*

**Observation.** Despite the stated "no mixing" rule, multiple pages carry two or three modes at once. The pattern runs **both directions**: explanation pages absorbing reference/how-to, and how-to pages absorbing reference/explanation. This is precisely the Diátaxis "blur" the *Map* and *Reference-vs-Explanation* pages warn is "at the heart of a vast number of problems."

**Evidence (read in full, not inferred):**

| Page | Badge | Mode actually present | The leak |
|---|---|---|---|
| `infrastructure/security/model.md` | 📘 Explanation | Explanation **+ Reference + How-to** | "Certificate format and size" (PEM/PKCS#1/4 KB table) and "The minimal payload: `install_certificate`" (JSON schema) and "Listing and removing" are **reference**; the `openssl` conversion command and the 4-step "Rotation" procedure are **how-to** |
| `observability/configure-events.md` | 📙 How-to | How-to **+ Reference + Explanation** | "Sixteen event flags" (complete 16-row enumeration), "Four thresholds", and the `heartbeatConfiguration` field defs are **reference**; "`config_events` vs `config_endpoint.eventConfiguration`" is **explanation** |
| `rfid/start-stop-inventory.md` | 📙 How-to | How-to **+ Reference + Explanation** | "Error codes" table, the trigger/stop-condition enum tables, and "Start delay and repeat" field defs are **reference**; the "State machine" D2 diagram is **explanation** |

**Why this is the worst offender.** Diátaxis on reference: *"Don't pollute your practical how-to guide with every possible thing… Refer to the x reference guide for a full list of options."* The "Sixteen event flags" table **is** that full list. Diátaxis on explanation: *"allowing [instruction/description] to creep in interferes with the explanation itself, and removes them from view in the correct place."* `model.md` is an explanation interrupted by a payload schema.

**The aggravating factor — it's duplication, not gap-filling.** The canonical reference homes already exist:

- cert format / `install_certificate` schema / listing-removing → **`reference/mgmt/certificates.md`** (exists)
- the rotation procedure → **`infrastructure/security/rotation.md`** ("How to rotate certificates at scale," exists)
- the 16 event flags / `config_events` schema → **`reference/mgmt/event-configuration.md`** (exists)
- inventory error codes → **`reference/errors/codes.md`** (exists)
- `control_operation` enum tables → **`reference/ctrl/inventory-control.md`** (exists)
- `config_events` vs per-endpoint relationship → **`observability/events/model.md`** (exists)

So the blurred content is a **second copy** of facts that already live in their correct quadrant. Per "the map is not the territory," a fact should have **one authoritative location**; two copies guarantee eventual drift (the error-code semantics, the 4 KB limit, the flag list will all be edited in one place and not the other).

**Recommendation (MODIFY — extract & link, do not delete the page):**
- For each blurred page, **cut** the reference tables/schemas and the embedded procedures; **replace** with a one-line statement + link to the existing canonical reference/how-to. Keep only the single mode the badge claims.
- `model.md`: keep the four-layer model, the "why all four (AND not OR)," the two-sources / two-paths discussion, "Confirmation via alerts." Cut format table, payload, listing/removing, and rotation steps → link to `reference/mgmt/certificates.md` and `infrastructure/security/rotation.md`.
- `configure-events.md`: keep the two task payloads ("enable everything," "selective production") and the pre-condition. Cut the 16-flag table + threshold/field defs → link to `reference/mgmt/event-configuration.md`; move the "`config_events` vs per-endpoint" comparison's *explanatory* content to `observability/events/model.md` and link.
- `start-stop-inventory.md`: keep START/STOP recipes, the three start-mechanisms *as task guidance*, and the operational lock rule. Cut the error-code table → `reference/errors/codes.md`; move the state-machine diagram → an explanation page (or `reference/ctrl/inventory-control.md`).
- **Then run the same audit across the rest of Part 4–6 "overview/about" pages** (see Appendix B for the suspected list) — the heading patterns strongly suggest the same leak in `infrastructure/network/architecture.md`, `infrastructure/endpoints/about.md`, `rfid/operating-mode-profiles.md`, `observability/heartbeat.md`, `observability/alerts.md`, and `rfid/dataevt-schema.md`.

### C2 — Two pages mis-filed by mode (high value)

**C2a — A Tutorial buried in a how-to cluster.**
`fleet/cloud-integration/tutorial-fleet.md` is badged 📗 **Tutorial** ("Tutorial: provision a three-reader fleet") but sits as the **last child of Part 7 → "Cloud integration"**, surrounded by `aws.md` / `azure.md` / `gcp.md` / `custom-broker.md` how-to guides. Diátaxis calls tutorial↔how-to conflation "the single most common conflation… particularly harmful." A learner cannot find a tutorial that is hidden inside a cloud-integration how-to group.
**Recommendation (MODIFY — relocate/surface):** give tutorials a discoverable home. Either (a) add a small **"Tutorials" entry surface** that lists the Quick Start *and* the fleet tutorial, cross-linked from Part 3; or (b) lift `tutorial-fleet.md` out of the "Cloud integration" how-to group into its own clearly-tutorial node. At minimum it must not be the trailing item of a how-to-named group.

**C2b — A How-to inside the Reference Part.**
`reference/errors/handling.md` is badged 📙 **How-to** ("How to handle errors in application code") but lives in **Part 9 → "Error codes & handling,"** next to the genuinely-reference `codes.md` and `format.md`. Diátaxis reference must "describe and only describe"; instruction "should link to how-to guides." A how-to in the reference aisle is the food-packet-with-a-recipe-printed-on-it anti-pattern from the *Reference* page.
**Recommendation (MODIFY — re-home):** move `handling.md` to a how-to context (e.g., adjacent to application-side tag-data processing in Part 6, or a how-to surface) and keep Part 9's "Error codes & handling" node **pure reference** (`codes.md`, `format.md`), with a Related link across to the how-to.

### C3 — Quadrant balance: the learning-oriented need is thin and hard to find (medium-high)

**Observation.** Running the first-principles question "which of the four needs is under-served?" across the nine Parts: explanation is abundant (Parts 1–2, much of 4–7), how-to is abundant, reference is abundant and well-structured — but **tutorials number two**, one of which is buried (C2a).

**Principle.** Diátaxis: tutorials are "rarely done well… genuinely difficult," and the acquisition phase is the *foundation* of the cycle. **However**, Diátaxis is equally emphatic: *"It certainly does not mean that you should create empty structures… Don't do that. It's horrible."*

**Recommendation (balanced — discoverability first, content second):**
1. **Fix discoverability now** (this is C2a): make the two existing tutorials a navigable quadrant.
2. **Evaluate, do not manufacture, a second tutorial.** Ask whether a real unserved learning need exists — most likely *"Build your first tag-reading application end-to-end"* (a learning experience beyond device bring-up, ending in code that ingests `dataEVT`). Add it **only** if that need is real; otherwise leave the quadrant honestly small. The Quick Start already covers device bring-up well.
3. Do **not** add empty `tutorials/` scaffolding to "balance the grid." That is reasoning by analogy ("four-box docs have a tutorials folder"), the exact first-principles error.

### C4 — Single source of truth / drift (medium, follows from C1)

**Observation.** C1's extractions remove duplicated facts, but make the principle explicit as its own rule so it governs *future* writing: every fact (error code, size limit, enum, field) has **one** canonical home (reference), and every other page **links** rather than restates.

**Principle.** First principles "map is not the territory" + Diátaxis reference "austere… one consults it." Two maps of one territory diverge.

**Recommendation (DELETE the duplicates; institute the rule):** after C1, delete the now-redundant tables/schemas from explanation/how-to pages. Add a one-line authoring rule to the contributor/governance notes: *"If you are about to paste a table of fields, codes, or enums into a non-reference page, link to the reference instead."*

### C5 — Naming: how-to titles should declare the goal (medium-low; respect the house voice)

**Observation.** The docs use a deliberately warm, journey voice (`start.md` → "A word on voice"), which produces evocative sidebar labels: "Start, stop, and the trigger button" (📙), "Choose what the reader tells you" (📙), "Watch your reader's pulse," "When the reader needs to interrupt you," "Something's broken?", "Trigger composition," "Failure modes," "Misconceptions." Diátaxis "pay attention to naming": good how-to titles "say exactly what [they] show," and *"Application performance monitoring"* is rated "very bad" because the reader can't tell if it's *what / whether / how*. "Trigger composition" and "Misconceptions" sit in that ambiguous zone, and search engines "appreciate good titles just as much as humans."

**Tension.** The warm labels are an asset for the journey sidebar and for engagement — they should not be flattened into "How to X" everywhere.

**Recommendation (MODIFY — keep voice, disambiguate elsewhere):** keep the evocative `sidebar_label`; make the **page `title`/H1 and `description` goal-explicit** so the mode is unambiguous to a searcher landing cold (e.g., title "How to compose start/stop triggers," sidebar "Trigger composition"). The badge already does most of this work — so treat C5 as polish, not a priority.

### C6 — Tutorial purity in the Quick Start (medium-low)

**Observation.** Each Quick Start phase carries "Why this phase exists" (explanation) and "Didn't work?" (troubleshooting). Diátaxis tutorial rules: *"ruthlessly minimise explanation"* and a tutorial should *"eliminate the unexpected"* (branching/troubleshooting is how-to behaviour, which *"prepares for the unexpected"*).

**Nuance (don't over-correct).** Diátaxis also says: *"show the learner where they'll be going"* and *"if you know in advance the likely signs of going wrong, consider flagging them."* So a **brief** framing and a **short, reassuring** "Didn't work?" are *defensible* and even endorsed — the risk is only if they balloon into full explanation/branching how-to inside the lesson.

**Recommendation (MODIFY — trim, don't remove):** cap "Why this phase exists" at ~2 sentences (expectation-setting), link to the Part 2 explanation for depth; keep "Didn't work?" short and confidence-restoring (one or two likely failures + the recovery), not a decision tree. This preserves the tutorial's "maintain a narrative of the expected" while honouring "minimise explanation."

---

## Part D — Consolidated change-list for the TOC / IA

### Additions

| # | Add | Rationale | Framework |
|---|---|---|---|
| A1 | A **badge column / glyph** (📘📗📙📕) on every TOC entry | Turns the TOC from a file-map into a **mode-coverage audit** — the Diátaxis "compass" made into an instrument | Diátaxis compass; map-is-not-territory |
| A2 | A **quadrant-balance table** in the TOC header (counts per mode) | Makes C3 (tutorial thinness) visible at a glance; converts a functional-coverage claim into a deep-quality one | First principles ("what's unserved?"); Diátaxis *quality* |
| A3 | A discoverable **Tutorials surface** listing Quick Start + fleet tutorial | Fixes C2a; makes the learning quadrant navigable | Diátaxis cycle of interaction |
| A4 | *(Evaluate only)* a second tutorial — "build your first tag-reading app" | Only if a real learning need exists; **do not** scaffold empty | Diátaxis ("don't create empty structures") |

### Deletions

| # | Delete | Rationale | Framework |
|---|---|---|---|
| D1 | Duplicated **reference tables/schemas** from `model.md`, `configure-events.md`, `start-stop-inventory.md` (and the C1 sweep set) | They already exist in the canonical reference; two copies → drift | Diátaxis reference purity; map-is-not-territory |
| D2 | The **rotation procedure** inside `model.md` | Duplicates `infrastructure/security/rotation.md` | Single source of truth |
| D3 | Any **FAQ answer** that re-explains/re-instructs a canonical page → replace with one-line answer + link | FAQs are Diátaxis blur-magnets; keep them thin routers | Diátaxis; first principles (one atom per fact) |

### Modifications

| # | Modify | Action | Framework |
|---|---|---|---|
| M1 | `infrastructure/security/model.md` | Reduce to pure 📘 Explanation; link out the extracted reference/how-to | C1 |
| M2 | `observability/configure-events.md` | Reduce to pure 📙 How-to (two payloads + pre-condition); link out the flag table & comparison | C1 |
| M3 | `rfid/start-stop-inventory.md` | Reduce to pure 📙 How-to; link out error codes & state machine | C1 |
| M4 | `fleet/cloud-integration/tutorial-fleet.md` | Relocate/surface as a discoverable 📗 Tutorial, not the tail of a how-to group | C2a |
| M5 | `reference/errors/handling.md` | Re-home the 📙 How-to out of Part 9; keep the Reference node pure | C2b |
| M6 | Ambiguous how-to titles (`Trigger composition`, etc.) | Goal-explicit `title`/`description`; keep warm `sidebar_label` | C5 |
| M7 | Quick Start phase pages | Trim "Why this phase exists" to ≤2 sentences; keep "Didn't work?" brief | C6 |
| M8 | C1 sweep set (Appendix B) | Audit each for mode-blur; extract-and-link as needed | C1 |

---

## Part E — Enhancements to the TOC artifact itself

The TOC is itself a **reference document** (a map of the docs) and a **governance instrument**. Two upgrades, both implementable in `scripts/generate-toc.mjs`:

1. **Emit each page's badge.** Every page already carries its mode in frontmatter/body (the `> 📘 **EXPLANATION** …` callout). Parse it and prefix each TOC line with the glyph. Result: blur and mis-filing become **visible** — a 📗 Tutorial sitting amid 📙 How-tos (C2a) or a 📙 How-to amid 📕 Reference (C2b) jumps out of the page.

2. **Upgrade the coverage line from functional to deep quality.** The header currently asserts *functional* quality — "116 of 116 files placed… 642 headings indexed" (completeness, measurable). Diátaxis's *quality* essay distinguishes **functional quality** (accuracy/completeness — measured) from **deep quality** (fit, flow, anticipation — judged). Add a **mode-balance breakdown** (e.g., "📘 N · 📗 N · 📙 N · 📕 N") so the map reports not just *that every file is placed* but *whether the four needs are served in proportion*. That single line operationalises the whole audit and is the bridge from "complete" to "good."

> A useful self-check the TOC can then carry, drawn straight from the *quality* essay: completeness is a **constraint** you must satisfy; mode-fit and flow are **liberations** you must invent. The current TOC measures the constraint. Make it also surface the invention.

---

## Part F — How to do the work (method matters as much as the list)

Diátaxis's working method is explicit and worth following literally, because it removes the temptation to "tear it down and start again":

1. **Don't restructure the nine Parts.** They're correct (Part B). "DiÃ¡taxis changes the structure of your documentation from the inside."
2. **Work one page at a time, publish each improvement.** Pick one blurred page (start with `model.md` — highest leak, clearest canonical target), extract-and-link, commit. Repeat. *"Every step in the right direction is worth publishing immediately."*
3. **Let the structure settle, don't impose it.** After the C1 sweep + C2 relocations, the badge-annotated TOC (A1) will *show* whether anything else needs to move. Re-derive from evidence, don't pre-plan.
4. **Use the commitment positively.** The docs already promised "no mixing." Every fix is the docs living up to their **own** declared standard — frame it that way to whoever maintains them, and the consistency bias that currently hides the blur starts working *for* the cleanup instead of against it.

---

## Appendix A — Diátaxis classification of the nine Parts

Confirms the journey is mode-coherent at the Part level (mode lives *inside* each topic, as Diátaxis prescribes):

| Part | Dominant mode(s) | Notes |
|---|---|---|
| 1 — Get oriented | 📘 Explanation (+ orientation) | Primers + "how to read"; pure framing |
| 2 — Foundations | 📘 Explanation | Mental models, architecture, air interface — correct |
| 3 — Quick start | 📗 Tutorial | The one full tutorial; trim per C6 |
| 4 — Manage your reader | 📙 How-to + 📘 Explanation | Topic cluster; **C1 blur lives here** |
| 5 — Read tags | 📙 How-to + 📘 Explanation | Topic cluster; **C1 blur lives here** |
| 6 — Observe & monitor | 📙 How-to + 📘 + 📕 | Topic cluster; **C1 blur lives here** |
| 7 — Scale to a fleet | 📙 How-to | Contains the **mis-filed 📗 tutorial** (C2a) |
| 8 — Diagnose & recover | 📙 How-to + 📕 + 📘 | Legitimate cross-mode cluster; keep each page pure |
| 9 — Reference | 📕 Reference (+ FAQ) | Mirrors machinery (commend); contains **mis-filed 📙 how-to** (C2b); watch FAQ blur |

## Appendix B — C1 sweep set (verified vs. suspected)

**Verified blur (read in full):**
- `infrastructure/security/model.md` (📘) — reference + how-to embedded
- `observability/configure-events.md` (📙) — reference + explanation embedded
- `rfid/start-stop-inventory.md` (📙) — reference + explanation embedded

**Suspected blur (heading patterns indicate embedded reference; verify before extracting):**
- `infrastructure/network/architecture.md` — "`set_wifi`: supported security types," "Error codes that matter," "IPv4: DHCP vs static"
- `infrastructure/endpoints/about.md` — "Seven endpoint types," "Limits that matter," "Verification types"
- `rfid/operating-mode-profiles.md` — "Five supported profiles," "Setting a profile"
- `observability/heartbeat.md` — "The shape," interval/field tables
- `observability/alerts.md` — "State semantics," "Priority," threshold tables
- `rfid/dataevt-schema.md` — per-tag / per-barcode field tables (may be intentionally reference-badged; confirm badge first)

**Method for each:** read the page → compare content to its declared badge → cut anything that serves a *different* need than the badge → link to the canonical home (Appendix list of existing reference targets is in C1).

---

*This review recommends changes; it makes none to the docs or the TOC. Apply via the one-page-at-a-time workflow in Part F.*
