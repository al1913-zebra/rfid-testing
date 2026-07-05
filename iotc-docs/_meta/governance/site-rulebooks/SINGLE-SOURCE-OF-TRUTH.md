# Single-Source-of-Truth Rulebook for the Zebra IoT Connector docs

This rulebook governs **where facts live**. It sits beside TITLE-NAMING,
URL-NAMING, and META-DESCRIPTION as a site authoring rule. Apply it whenever
you are about to write a table of fields, codes, enums, limits, or a payload
schema — or to restate any one of those facts in prose.

---

## 1. The rule

> **If you are about to paste a table of fields, codes, enums, or limits into
> a page that is not a Reference page, link to the reference instead.**

Every fact — an error code, a size limit, an enum value, a field name, a
payload shape — has exactly **one** canonical home. Every other page that
needs it **links** to that home rather than restating it.

## 2. Why

- **Map is not the territory** (*The Great Mental Models*): a page that
  restates a fact is a second map of one territory. Two maps drift; the reader
  cannot tell which is current.
- **Diátaxis**: reference must *"describe and only describe."* Explanation,
  how-to, and tutorial pages *reference* it — they do not duplicate it. A table
  of enums on an explanation page is the reference mode leaking into the wrong
  quadrant (the mode-blur that actions A-01…A-04 removed).

## 3. Canonical homes

| Fact type | Canonical home |
|---|---|
| Command response error codes (0–28) | [`/reference/errors/codes`](/reference/errors/codes) |
| Error-response envelope shape | [`/reference/errors/format`](/reference/errors/format) |
| Event schemas (heartbeatEVT, alerts, mqttConnEVT) | [`/reference/events/all-events`](/reference/events/all-events) |
| `dataEVT` field reference | [`/rfid/dataevt-schema`](/rfid/dataevt-schema) |
| Operating-mode fields/enums (profiles, `linkProfile`, `radioStart`/`StopConditions`, query) | [`/reference/ctrl/operating-mode`](/reference/ctrl/operating-mode) |
| Inventory control (`control_operation`) | [`/reference/ctrl/inventory-control`](/reference/ctrl/inventory-control) |
| Network config (`securityType`, Wi-Fi limits) | [`/reference/mgmt/network`](/reference/mgmt/network) |
| MQTT endpoint config (`epType`, `verificationType`, limits) | [`/reference/mgmt/endpoint`](/reference/mgmt/endpoint) |
| Event configuration flags/thresholds (`config_events`) | [`/reference/mgmt/event-configuration`](/reference/mgmt/event-configuration) |
| Canonical terms and limits | [`/reference/glossary`](/reference/glossary) |
| Command/event schema fields, enums, payload shapes (upstream source) | the API schema SoT (§4) → external MQTT API Reference |

Docs-side `/reference/**` pages mirror the API schema SoT for convenience and
carry a "Source of truth" admonition pointing back to it.

## 4. The source of truth for API facts

The single source of truth for the MQTT API schema is the technical-writer
schema folder:

```
_meta/knowledge-base/product/reference/handheld-rfid-iotc-api-schema-and-docs-technical-writer
```

**not** any `zebra-official` copy. Within it, `schemas/`, `operation_descriptions/`,
`tag_descriptions/`, `error_codes.json`, and `info_description.md` are the
authoritative fact sources.

### Regeneration coupling

When you change an API fact that the reference renders — a schema under
`schemas/**`, an `operation_descriptions/*.md`, `error_codes.json`, etc. — you
must re-run the SoT generation workflow so the rendered API reference does not
drift from the schema (per the SoT `README.md`):

1. `python scripts/generate_openapi_tags_md.py` → regenerates `docs/openapi_md.json`
2. `cd docusaurus && npx docusaurus gen-api-docs all && node scripts/postprocess-generated-api-docs.mjs`

A fact corrected only in a docs page, or only in a schema, leaves the two
surfaces disagreeing.

## 5. Worked example — the `eventConfiguration` 8-vs-16 drift (A-02 / A-09)

The canonical illustration of this rule:

- `schemas/commands/dev_mgmt/config_events.json` (both `examples`) and
  `operation_descriptions/config_events.md §4` define **16** event flags,
  4 thresholds, and a `heartbeatConfiguration` that includes `userApps`.
- But the payload schema `schemas/refrence/payload/cfgEventPayload.yaml`
  listed only **8** flags and no thresholds — an under-documented second map
  of the same territory.
- The docs (`/reference/mgmt/event-configuration`, `/observability/configure-events`)
  had correctly captured all 16 from the authoritative example.

**Fix (A-09):** reconcile the lagging schema to the authoritative 16 flags
+ 4 thresholds + `userApps`, so schema, generated API reference, and docs all
agree. The lesson: when two SoT files disagree, the **executable example**
(`config_events.json`) and the operation description win over an
under-maintained `$ref` payload — and the lagging file is corrected **at
source**, never worked around downstream.

## 6. Precedent — the C1 extractions (A-01…A-04)

These actions removed reference tables that had leaked onto explanation /
how-to pages and linked to the canonical home instead. They are the template:

- **A-01** — cert format / payload / listing / rotation tables → `certificate-management`, `rotation`.
- **A-02** — the 16-flag event table → `/reference/mgmt/event-configuration`.
- **A-03** — the `control_operation` error table + the radio state machine → the error reference / `trigger-composition`.
- **A-04** — Wi-Fi limits & `securityType`, endpoint limits & `verificationType`, the 11-value `linkProfile` enum → the `mgmt`/`ctrl` reference mirrors.

The pattern each followed: extract the table to its reference home (adding it
there if missing, **verified against the SoT**), then replace it with a
one-line pointer.

## 7. Checklist before you add a table

- [ ] Is this a Reference page? If **no** → do not put the table here; link.
- [ ] Does the canonical home already hold this fact? If **yes** → link to it.
- [ ] If the home is missing the fact, add it **there** (verified against the
      SoT in §4), then link from your page.
- [ ] If the fact is an API schema fact, did you change it **at the SoT** and
      run the regeneration workflow (§4)?

---

## Maintenance

This rulebook lives at `/_meta/governance/site-rulebooks/SINGLE-SOURCE-OF-TRUTH.md`,
beside TITLE-NAMING, URL-NAMING, and META-DESCRIPTION. The SoT for MQTT API
facts is the `…-technical-writer` schema folder (§4). When a new canonical home
is established (a new reference page), add a row to the §3 table.
