# MQTT API reference templates

Copy-from templates for authoring the **MQTT command** and **event** reference
pages of this site. They target **Docusaurus / MDX** and use the shared theme
components already installed in this project.

> These files live **outside `docs/`** on purpose. They contain unfilled
> `{placeholders}` and HTML authoring comments that would break the MDX build,
> so Docusaurus never compiles this folder. Only your **filled** copy (saved
> under `docs/…` as `.mdx`) is built.

## Files

| File | What it is |
| --- | --- |
| `COMMAND_TEMPLATE.mdx` | Public reference for one **request/response command** (app publishes a command; device publishes the correlated reply). |
| `EVENT_TEMPLATE.mdx` | Public reference for one **device-emitted event** (no request, no `response.code`). |
| `COMMAND_TEMPLATE.maintainer.md` | Internal QA/provenance companion for a command — **not published**. |
| `EVENT_TEMPLATE.maintainer.md` | Internal QA/provenance companion for an event — **not published**. |
| `TEMPLATE.assets.md` | Design reference for the shared components + palette. The components are already installed (see below). |

## Installed infrastructure (do not re-add)

The templates import these — all already present in the project:

- `src/components/ApiBody.tsx` (default export) — **what pages use for the body**: a
  **Schema** tab (the tree-table) and an **Example** tab (the JSON), of the same data.
- `src/components/SchemaTable.tsx` (default export) — the unified, collapsible
  **tree-table** (# line-no · Field · Type · Required · Enum/Units · Example · Description)
  with `+`/`−` per expandable row and Expand all / Collapse all. (Schema tab.)
- `src/components/JsonBlock.tsx` (default export) — the collapsible, copy-pasteable
  **raw-JSON** block with line numbers (`+`/`−` folding, Expand all / Collapse all, Copy). (Example tab.)
- `src/components/VariantSelect.tsx` — exports `VariantSelect`, `Variant`, `VariantView`
  (intent / payload-shape switching).
- `src/components/ApiType.tsx` — exports `Type`, `Enum` (inline badge/pill).
- `src/css/api.scss` — type/enum, SchemaTable, JsonBlock, line-number, and the
  schema-table width styles: column sizing, scroll-fade, and per-table full-bleed
  (a partial already `@use`'d by `src/css/custom.scss`).

The request/response body uses **`<ApiBody rows={...} json={...} title="…" />`** (Schema
tab + Example tab, both with line numbers). Define the row tree and JSON object once in the
page's ESM block (`export const`), then pass them by name. See `TEMPLATE.assets.md`.

**The API reference is a separate doc**: add new command/event pages to the `apiReference`
sidebar in `sidebars.ts` (its own "API Reference" top-nav tab), NOT the conceptual `docs`
sidebar. Pages keep their `/reference/...` URLs.

## How to author a page

1. Copy the relevant template into the right reference folder, e.g.
   `docs/reference/mgmt/get-status.mdx`.
2. Replace **every** `{placeholder}`, then **delete every HTML `<!-- -->`
   comment** (MDX does not support them; use `{/* … */}` for a comment you keep)
   and the one block marked `EXAMPLE — delete when authoring`.
3. Obey the MDX authoring rules called out at the top of each template
   (escape literal `{`, `}`, `<` in prose/table cells; blank line after each
   opening JSX tag and before each closing one; no `:::admonition` inside a
   `<TabItem>`).
4. Add the page's doc id to `sidebars.ts` so it is reachable.
5. Keep the JSON envelopes valid, mask credentials as `********`, and treat the
   standalone schema files (`commands/…`, `response/…`, `refrence/…`) as the
   single source of truth — not the drifted inline examples in `openapi.json`.

The first filled example in this repo is
[`docs/reference/mgmt/get-status.mdx`](../docs/reference/mgmt/get-status.mdx).
