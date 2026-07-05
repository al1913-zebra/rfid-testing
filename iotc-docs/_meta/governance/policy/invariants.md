# Protected invariants (regression guards)

The documentation review's Part B listed what the docs already get right. These
are not compliments to admire — each is a Diátaxis principle executed well, and
each must be **preserved** by every future change. Use this list as the
regression guard: before merging, confirm no invariant below was weakened.

## The invariants

1. **Journey-major, mode-minor top structure.** The nine Parts (orient →
   foundations → quick start → manage → read → observe → scale → diagnose →
   reference) organise by journey, with the four Diátaxis modes living *inside*
   each topic. Declared in [`sidebars.ts`](../../../sidebars.ts) and
   [`documentation-guide.md`](../../../docs/foundations/documentation-guide.md).
   **Guard:** don't restructure the Parts — fix pages within them (see
   [authoring-workflow](authoring-workflow.md)).
2. **Per-page Diátaxis badge + "no mixing".** Every page declares its mode
   (📘 Explanation · 📗 Tutorial · 📙 How-to · 📕 Reference) and holds exactly
   one. **Guard:** new pages carry a badge; the badge-annotated TOC
   (`generate-toc.mjs`) makes any new blur visible.
3. **Reference mirrors the machinery.** Part 9 is organised MGMT / CTRL /
   Data & events, mirroring the endpoint taxonomy (the SoT `tag_config.json` and
   `tag_descriptions/`). **Guard:** keep the reference structure matching the API
   machinery; route fact changes through the SoT
   ([SINGLE-SOURCE-OF-TRUTH](../site-rulebooks/SINGLE-SOURCE-OF-TRUTH.md) §4).
4. **"Out of scope" sections.** Pages bound themselves explicitly (Diátaxis
   bounding + the circle-of-competence). **Guard:** keep them; add one when a new
   page risks scope creep.
5. **"Related" complementary-quadrant boxes + "See in the API Reference"
   callouts.** They implement Diátaxis "make connections" and the docs↔reference
   pairing. **Guard:** keep the Related footer on every page, pointing across
   quadrants (a how-to links its explanation/reference, and so on).
6. **Persona reading-paths.** [`start.md`](../../../docs/foundations/start.md)
   and `documentation-guide.md` route each reader from their entry point.
   **Guard:** keep the reading-path tables current as pages move — a rename must
   update them (part of the cross-reference sweep).

## How the guards are enforced

- **Automated (fast pre-check + CI):** `scripts/check_reachability.py` catches
  broken links/anchors and orphans, and the CI build throws on either; the
  badge-annotated TOC (`scripts/generate-toc.mjs`) surfaces invariant-2 blur and
  invariant-3 mis-filing.
- **Review-time (human judgement):** invariants 1, 4, 5, and 6 are judgement
  calls — confirm them when reviewing a change, using this list as the checklist.

These invariants held throughout the A-01…A-19 cleanup: the nine Parts were
never restructured, every relocated page kept its badge / "Out of scope" /
"Related" box, and each relocation refreshed the reading-paths and added a
redirect.
