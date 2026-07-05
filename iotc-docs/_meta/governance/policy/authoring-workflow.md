# Authoring workflow & re-audit cadence

How to change these docs without breaking them. This codifies the method the
documentation review prescribed (Part F) and that the A-01…A-19 cleanup
followed. It is a **standing** policy — apply it to every future docs change.

## The method (one page at a time)

1. **Don't restructure the nine Parts.** The journey-major / mode-minor top
   structure is correct (see [invariants](invariants.md)). Diátaxis "changes the
   structure of your documentation from the inside" — fix pages, not the spine.
2. **One page per commit; publish each improvement.** Pick one page, make it
   honour its badge — extract off-mode content to its canonical home and link
   (see [SINGLE-SOURCE-OF-TRUTH](../site-rulebooks/SINGLE-SOURCE-OF-TRUTH.md)) —
   then commit and push. *"Every step in the right direction is worth publishing
   immediately."* Don't batch unrelated pages into one commit.
3. **Let the structure settle; re-derive from evidence.** After a batch, the
   badge-annotated TOC (below) *shows* whether anything else needs to move.
   Don't pre-plan a grand restructure.
4. **Use the commitment positively.** The docs already promise "no mixing" (one
   Diátaxis mode per page). Every fix is the docs living up to their own
   declared standard — frame it that way.

## Blast-radius gating (URL-NAMING §7a)

Before a change that renames or moves a page, count the blast radius (file move
+ sidebar entry + redirect + each cross-reference + id/slug):

- **Low** — 1 file, ≤ ~10 cross-refs, no sidebar restructure → apply inline, one
  commit. (A-05 and A-06 were single-file renames done this way.)
- **High** — many files, dozens of cross-refs, an IA change → a dedicated
  batched pass; land every step atomically and re-audit before merge. (A-17 is
  gated this way and deferred.)

A rename always carries the **coherent quartet** (title + URL + sidebar label +
meta description) and a 301 redirect — see TITLE-NAMING §10, URL-NAMING §7,
META-DESCRIPTION §10, and 404-PAGE.

## Re-audit cadence

After each batch, regenerate the instruments and re-run the audit:

| Step | Command | Needs | What it catches |
|---|---|---|---|
| Badge-annotated TOC | `node scripts/generate-toc.mjs` | node | Mode-blur / mis-filing made visible (📘/📗/📙/📕 per entry) + the quadrant-balance counts |
| Reachability + links | `python scripts/check_reachability.py` | python (stdlib) | Broken internal links, broken anchors, orphan pages |
| API reference (when a schema or `operation_descriptions/*` changes) | `python scripts/generate_openapi_tags_md.py` then `npx docusaurus gen-api-docs all` | python + node | Schema ↔ rendered-reference drift (see SINGLE-SOURCE-OF-TRUTH §4) |

Record each run's headline numbers in [`../audits/`](../audits/). Settle any
page count against the live `check_reachability.py` output — it walks `docs/`,
so it is authoritative; never hand-maintain a count. The CI build
(`onBrokenLinks` / `onBrokenAnchors: throw`) is the hard gate; the local
reachability script is the fast pre-check.

## "Complete, not finished"

Diátaxis: documentation is never "finished" — it is "complete" for now. Work in
small, publishable increments; re-audit; stop when the badged TOC shows no
remaining blur, not when a checklist is exhausted.
