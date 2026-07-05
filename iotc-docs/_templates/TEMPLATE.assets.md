# MQTT API templates — Docusaurus assets (INTERNAL — site setup, do not publish)

> **✅ Already installed in `iotc-docs`.** The components below and the CSS are
> wired into this project — you do NOT need to add them again. This project uses
> **TypeScript + SCSS**, so the assets differ from the generic listing that follows.
>
> | Component | Location | Exports | Used for |
> | --- | --- | --- | --- |
> | **ApiBody** | `src/components/ApiBody.tsx` | default | The request/response (or payload/config) body: two tabs — **Schema** (SchemaTable) and **Example** (JsonBlock) — of the SAME data. **This is what pages use.** |
> | **SchemaTable** | `src/components/SchemaTable.tsx` | default, `SchemaRow` | The unified, collapsible **tree-table** (Field · Type · Required · Enum/Units · Example · Description) with a line-number gutter. Rendered on the Schema tab. |
> | **JsonBlock** | `src/components/JsonBlock.tsx` | default, `Json` | The collapsible, copy-pasteable **raw-JSON** block with line numbers. Rendered on the Example tab. |
> | **VariantSelect** | `src/components/VariantSelect.tsx` | `VariantSelect`, `Variant`, `VariantView` | Intent/variant switching (multi-intent commands, multi-shape events). |
> | **ApiType** | `src/components/ApiType.tsx` | `Type`, `Enum` | Standalone type badge / enum pill (SchemaTable renders these internally via the same CSS classes). |
> | CSS | `src/css/api.scss` | — | A partial already `@use`'d by `src/css/custom.scss`; holds type/enum, SchemaTable, JsonBlock, line-number, and the schema-table width styles (column sizing, scroll-fade, per-table full-bleed). |
>
> **The current body design uses `<ApiBody rows={...} json={...} />`** — a Schema tab (the
> tree-table) and an Example tab (the JSON), both with line numbers. NOT stacked, and NOT a
> hand-rolled `<Tabs>` Example/Schema. See "ApiBody" below and `docs/reference/mgmt/get-status.mdx`.
>
> **The API reference is a SEPARATE doc** — its own "API Reference" top-nav tab and the
> `apiReference` sidebar in `sidebars.ts` (pages keep their `/reference/...` URLs). Add new
> command/event pages to the `apiReference` sidebar, not the conceptual `docs` sidebar.

## ApiBody — the request/response body component

Each Request payload / Response payload (and event payload / configuration) is ONE `<ApiBody>`:

```jsx
import ApiBody from '@site/src/components/ApiBody';

{/* define the data ONCE in the page's ESM block */}
export const ROWS = [
  { field: 'command', type: 'string', required: true, example: 'get_status', desc: 'Fixed command name.' },
  { field: 'deviceStatus', type: 'object', required: false, desc: 'Status snapshot.', children: [
    { field: 'powerSource', type: 'enum', required: true, enumUnits: ['DC','USB','CRADLE'], example: 'USB', desc: 'Power source.' },
  ] },
];
export const JSON_DATA = { command: 'get_status', deviceStatus: { powerSource: 'USB' } };
```

```jsx
<ApiBody rows={ROWS} json={JSON_DATA} title="Response payload" />
```

- **`<ApiBody rows={...} json={...} title="…" />`** — renders a **Schema** tab and an
  **Example** tab of the same data. All ApiBody instances on a page share the tab choice via the
  `api-body-view` groupId (picking Schema/Example on one body switches every body). Internally it
  renders `<SchemaTable rows={rows} title={title} />` (Schema) and
  `<JsonBlock data={json} title={title} />` (Example) — the shared `title` is the header bar in both.
- **Schema tab — `<SchemaTable>`** — one unified tree-table merging schema and example.
  Columns: **# (line no.) · Field · Type · Required · Enum / Units · Example · Description**. Nested
  `children` render as indented child rows, each expandable with a `+` (collapsed) / `−` (expanded)
  toggle; **Expand all / Collapse all** sit above the table. Line numbers count the visible rows.
  Row shape: `{ field, type, required, enumUnits, example, desc, children }` — `required`
  `true`→"Yes"/`false`→"No"/string; `enumUnits` array→enum pills, string→units text; `desc`
  backticks→inline `<code>`. Defaults to fully expanded.
- **Example tab — `<JsonBlock>`** — a collapsible raw-JSON viewer with a line-number gutter. Every
  object/array is foldable (`+`/`−`); **Expand all / Collapse all** and a **Copy** button sit in its
  toolbar. Pass the actual JS value via `data` (not a string). Defaults to fully expanded.

You can still use `<JsonBlock>` standalone (e.g. in an Examples section). All styles live in
`src/css/api.scss`; both reuse the `.api-type--*` / `.api-enum` palette classes.

---

## Legacy dropdown + badge components (still available)

The sections below document `VariantSelect`/`ApiType` and the type palette. `VariantSelect`
is still used to switch **intents** (multi-intent commands) or **payload shapes** (multi-shape
events); inside each variant you place an `<ApiBody>`. `ApiType`'s `<Type>`/`<Enum>` remain useful
inline in prose. `Tabs`/`TabItem` back `ApiBody`'s tabs but are no longer hand-written in pages.

This file holds the **theme components and CSS** that BOTH public references import:
the command reference (`COMMAND_TEMPLATE.md` → your filled `{command_name}.mdx`) and the
event reference (`EVENT_TEMPLATE.md` → your filled `{eventName}.mdx`). Add these ONCE to
the Docusaurus site; every command and event page then reuses them. Nothing here is
end-user content — it is site plumbing.

The filled `.mdx` pages import:

```jsx
import Tabs from '@theme/Tabs';                                  // built into Docusaurus
import TabItem from '@theme/TabItem';                            // built into Docusaurus
import { VariantSelect, Variant, VariantView } from '@site/src/components/VariantSelect';
import { Type, Enum } from '@site/src/components/ApiType';
```

`Tabs`/`TabItem` ship with Docusaurus. The two files below are what you add.

- **`<VariantSelect>`** — the intent/variant **dropdown** (the control). The command template
  uses it for command **intents** (Add MGMT / CTRL / DATA1 endpoint …); the event template uses
  it for emitted-payload **variants** (or omits it for single-shape events).
- **`<VariantView>`** — a **display-only follower** with no dropdown of its own. Give it the same
  `groupId` and matching `<Variant value="…">`s as a `<VariantSelect>`, and it shows whichever
  variant the dropdown currently selects. The command template uses it so the **Response payload
  follows the intent chosen in the Request payload's dropdown** — one selection drives both.
- **`<Type>` / `<Enum>`** — color badges, used identically in both templates.

`<VariantSelect>` and `<VariantView>` sync through a tiny per-`groupId` store, mirroring how
Docusaurus `<Tabs groupId>` keep tab choices in sync across a page.

---

## 1. `src/components/VariantSelect.js` — dropdown + synced follower

```jsx
import React, { useId, useState, useEffect, Children, isValidElement } from 'react';

// --- shared per-groupId store (module-level), mirrors Docusaurus <Tabs groupId> sync ---
const VARIANT_GROUPS = new Map(); // groupId -> { value: string | undefined, listeners: Set<fn> }

function group(groupId) {
  let g = VARIANT_GROUPS.get(groupId);
  if (!g) { g = { value: undefined, listeners: new Set() }; VARIANT_GROUPS.set(groupId, g); }
  return g;
}

function publish(groupId, value) {
  const g = group(groupId);
  g.value = value;
  g.listeners.forEach((fn) => fn(value));
  try { localStorage.setItem(`variant-group:${groupId}`, value); } catch (e) { /* SSR / no storage */ }
}

// SSR-safe: server render AND first client render both use `initial` (no hydration mismatch);
// the effect then restores any persisted/shared choice and subscribes to future changes.
function useVariantGroup(groupId, initial, valid) {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    if (!groupId) return undefined;
    const g = group(groupId);
    let restored = g.value;
    if (restored === undefined) {
      try { restored = localStorage.getItem(`variant-group:${groupId}`) ?? undefined; } catch (e) { /* noop */ }
    }
    if (restored !== undefined && valid.includes(restored)) setValue(restored);
    const fn = (v) => { if (valid.includes(v)) setValue(v); };
    g.listeners.add(fn);
    return () => g.listeners.delete(fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);
  return [value, setValue];
}

const valuesOf = (items) => items.map((c, i) => String(c.props.value ?? c.props.label ?? i));
const pick = (items, values, value) => {
  const i = values.indexOf(value);
  return items[i >= 0 ? i : 0] ?? null;
};

// A labeled variant panel. `value` (or `label`) identifies it for syncing; put the
// per-variant Example/Schema <Tabs> inside it.
export function Variant({ children }) {
  return <>{children}</>;
}

// The dropdown control. Pass a `groupId` to sync it with a <VariantView> (or another
// <VariantSelect>) elsewhere on the page.
export function VariantSelect({ children, label = 'Variant', groupId }) {
  const items = Children.toArray(children).filter(isValidElement);
  const values = valuesOf(items);
  const id = useId();
  const [value, setValue] = useVariantGroup(groupId, values[0], values);
  const current = values.includes(value) ? value : values[0];
  const onChange = (v) => { setValue(v); if (groupId) publish(groupId, v); };
  if (items.length === 0) return null; // no <Variant> children → nothing to render
  return (
    <div className="variant-select">
      <label className="variant-select__label" htmlFor={id}>{label}</label>
      <select
        id={id}
        className="variant-select__control"
        value={current}
        onChange={(e) => onChange(e.target.value)}
      >
        {items.map((child, i) => (
          <option key={i} value={values[i]}>{child.props.label ?? `Option ${i + 1}`}</option>
        ))}
      </select>
      <div className="variant-select__panel">{pick(items, values, current)}</div>
    </div>
  );
}

// Display-only follower — NO dropdown. Use the SAME `groupId` and matching `value`s as the
// controlling <VariantSelect>; it shows whichever variant the dropdown currently selects.
export function VariantView({ children, groupId, caption }) {
  const items = Children.toArray(children).filter(isValidElement);
  const values = valuesOf(items);
  const [value] = useVariantGroup(groupId, values[0], values);
  const current = values.includes(value) ? value : values[0];
  if (items.length === 0) return null; // no <Variant> children → nothing to render
  return (
    <div className="variant-view" aria-live="polite">
      {caption ? <p className="variant-view__caption">{caption}</p> : null}
      {pick(items, values, current)}
    </div>
  );
}
```

<!-- Notes: SSR-safe (server + first client render use the first variant, so no hydration
mismatch; the effect then restores the shared/persisted choice). To sync, the controlling
<VariantSelect> and the following <VariantView> must use the SAME groupId and matching
<Variant value="…"> ids. aria-live="polite" lets assistive tech announce the followed change.
If you prefer no persistence, delete the two localStorage lines. -->

---

## 2. `src/components/ApiType.js` — type badge + enum pill

```jsx
import React from 'react';

// Color-coded type token, e.g. <Type>string</Type>. The word is ALWAYS the text,
// so it stays meaningful when color is unavailable (WCAG 1.4.1 — color is not the only signal).
export function Type({ children }) {
  const key = String(children).trim().toLowerCase();
  return <span className={`api-type api-type--${key}`}>{children}</span>;
}

// Neutral monospace pill for an allowed enum value, e.g. <Enum>ACTIVE</Enum>.
export function Enum({ children }) {
  return <span className="api-enum">{children}</span>;
}
```

---

## 3. `src/css/custom.css` — palette + pill + dropdown/follower styles

Colors are chosen to clear **WCAG AA (4.5:1)** as text on the default Docusaurus
surfaces (light `#ffffff`, dark `#1b1b1d`). `number`/`integer` share a hue and
`object`/`array` share a hue, keeping the palette to ~5 semantic hues, not a rainbow.

```css
/* ===== API type badges ===== */
.api-type {
  font-family: var(--ifm-font-family-monospace);
  font-size: 0.85em;
  font-weight: 600;
  white-space: nowrap;
}
/* Light mode */
.api-type--string  { color: #0a7d33; }
.api-type--number,
.api-type--integer { color: #1259c3; }
.api-type--boolean { color: #8a2be2; }
.api-type--object,
.api-type--array   { color: #9a5b00; }
.api-type--null    { color: #6b6f76; }
.api-type--enum    { color: #0f766e; }
/* Dark mode (Docusaurus sets data-theme="dark" on <html>) */
[data-theme='dark'] .api-type--string  { color: #4ec86f; }
[data-theme='dark'] .api-type--number,
[data-theme='dark'] .api-type--integer { color: #5fa8f5; }
[data-theme='dark'] .api-type--boolean { color: #c58af9; }
[data-theme='dark'] .api-type--object,
[data-theme='dark'] .api-type--array   { color: #e0a458; }
[data-theme='dark'] .api-type--null    { color: #a0a4ab; }
[data-theme='dark'] .api-type--enum    { color: #3fbdb0; }

/* ===== Enum value pills (neutral, monospace — not per-value colors) ===== */
.api-enum {
  font-family: var(--ifm-font-family-monospace);
  font-size: 0.85em;
  padding: 0.05em 0.4em;
  margin: 0 0.15em;
  border-radius: 4px;
  border: 1px solid var(--ifm-color-emphasis-300);
  background: var(--ifm-color-emphasis-100);
  color: var(--ifm-color-emphasis-900);
  white-space: nowrap;
}

/* ===== Intent / variant dropdown ===== */
.variant-select { margin: 0 0 1rem; }
.variant-select__label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
.variant-select__control {
  width: 100%;
  max-width: 28rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 6px;
  background: var(--ifm-background-surface-color);
  color: var(--ifm-font-color-base);
  font: inherit;
}
.variant-select__panel { margin-top: 1rem; }

/* ===== Synced follower (Response payload follows the Request dropdown) ===== */
.variant-view { margin: 0 0 1rem; }
.variant-view__caption {
  font-style: italic;
  color: var(--ifm-color-emphasis-700);
  margin: 0 0 0.5rem;
}
```

Reference `custom.css` in `docusaurus.config.js` (it usually already is):

```js
theme: { customCss: require.resolve('./src/css/custom.css') }
```

---

## 4. Palette reference (type → color, light / dark)

| Type | Light | Dark | Grouping |
| --- | --- | --- | --- |
| `string` | `#0a7d33` | `#4ec86f` | green |
| `number`, `integer` | `#1259c3` | `#5fa8f5` | blue (one family) |
| `boolean` | `#8a2be2` | `#c58af9` | purple |
| `object`, `array` | `#9a5b00` | `#e0a458` | amber (containers) |
| `null` | `#6b6f76` | `#a0a4ab` | grey (absence) |
| `enum` | `#0f766e` | `#3fbdb0` | teal (constrained set) |

---

## 5. Syncing the Response payload to the Request dropdown (`groupId`)

In `COMMAND_TEMPLATE.md` the **Request payload** uses the control and the **Response payload** uses the
follower, sharing one `groupId` and matching `<Variant value="…">` ids:

```mdx
{/* Request payload */}
<VariantSelect label="Intent" groupId="{command_name}-intent">
  <Variant value="variant-a" label="Add MGMT endpoint">
    {/* request Example | Schema tabs */}
  </Variant>
  <Variant value="variant-b" label="Add CTRL endpoint">
    {/* request Example | Schema tabs */}
  </Variant>
</VariantSelect>

{/* Response payload — no dropdown; follows the selection above */}
<VariantView groupId="{command_name}-intent" caption="Response for the intent selected in Request payload.">
  <Variant value="variant-a" label="Add MGMT endpoint">
    {/* response Example | Schema tabs */}
  </Variant>
  <Variant value="variant-b" label="Add CTRL endpoint">
    {/* response Example | Schema tabs */}
  </Variant>
</VariantView>
```

Rules: the `value` on each `<Variant>` MUST match between the `<VariantSelect>` and the
`<VariantView>` (that is the sync key); the dropdown shows `label`. The `groupId` is a
**site-global** key (persisted in `localStorage`, like Docusaurus Tabs groupIds), so use a
**page-unique** value — e.g. `{command_name}-intent`, which the placeholder makes unique per
command once filled. A generic shared id (e.g. `command-intent` on every page) would cross-restore
selections between unrelated pages (the `valid.includes` guard prevents crashes, not the bleed).
The inner Example/Schema `<Tabs>` intentionally keep the shared `groupId="body-view"` — its values
are always `example`/`schema`, so there is nothing to bleed. (To drop persistence entirely, remove
the two `localStorage` lines in the component.)

---

## 6. markdownlint (if the repo lints Markdown)

These MDX docs use inline components, fenced code, and MDX `{/* */}` comments by design.
The cleanest fix is to **exclude the MDX template output from markdownlint** (e.g. ignore
`*.mdx`), since markdownlint targets CommonMark, not MDX. If you must lint them, relax the
rules the MDX patterns trip, e.g. in `.markdownlint.json`:

```json
{ "MD033": false, "MD046": false, "MD025": false, "MD037": false }
```

`MD033` (inline HTML) fires on every `<Tabs>`/`<Type>`/`<details>`; `MD046` on fenced code;
`MD025` on the single H1; `MD037` on the `/* */` inside an MDX `{/* … */}` comment (a false
positive — markdownlint reads the asterisks as emphasis). None affect the build — MDX
compilation, not markdownlint, is the gate.
