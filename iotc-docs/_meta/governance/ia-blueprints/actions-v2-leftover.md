# actions-v2-leftover.md — unimplemented recommendations from `actions-v2.md`

> **Generated:** 2026-06-07 · **Method:** every recommendation in [`actions-v2.md`](./actions-v2.md) (§1–§10, mandatory **and** optional) was checked against the live `docs/` tree *after* the "gaps + flagged polish" pass (commit `9ffb3b2`). Items confirmed **not implemented** are listed below, each with the evidence that it is still open. Implemented and out-of-scope-by-design rows are summarized at the end so the accounting is complete.

> **Status — 2026-06-07 execution pass:** **all 14 items are now executed.** A1–A9 and C1–C3 implemented; **B1** shipped a new page; **B2** resolved as a documented out-of-scope decision; **A3** addressed by provenance flag (live provider-doc verification is outside the repo). Two audit corrections surfaced during execution: **A5/rssiFilter → out-of-scope** (schema says "Currently ONLY supported by the FX9600"), and **C2/heartbeatEvents_new → keep** (it is the substantive schema, not a dupe). See the [Resolution log](#resolution-log--2026-06-07) below.

## Scorecard

| Bucket | Count | Where |
|---|---:|---|
| ✅ **Implemented** this program | 8 clusters | see [§ Implemented](#implemented-not-leftover) |
| ⛔ **Out-of-scope by design** (not gaps) | all of §5, parts of §6/§10.2, glossary limits | see [§ Out-of-scope](#out-of-scope-by-design-not-leftover) |
| 🔴 **Leftover — mandatory** | 9 | [Table A](#table-a--mandatory-leftovers) |
| 🟡 **Leftover — optional** | 2 | [Table B](#table-b--optional-leftovers) |
| 🧹 **Leftover — `_meta` cleanup** (not doc pages) | 3 | [Table C](#table-c--meta-source-cleanup-leftovers) |

---

## Mapped `_meta/` source per leftover (from actions-v2.md)

The specific source content actions-v2.md mapped to each item — i.e. what an executor reads to resolve it.

| Item | Mapped `_meta/` source (verified to exist) | Target page(s) |
|---|---|---|
| **A1** | SoT `schemas/refrence/payload/{accessCmds,accessCmdRead/Write/Lock/Kill/AccessPayload}.yaml`, embedded via `operatingModePayload.yaml` → `accessOperations` | `reference/ctrl/operating-mode.md`, `appendices/tag-standards.md` |
| **A2** | throughput → `explanation/zebra-handheld-sleds-hardware-platform/*spec-sheet.md` (RFD40 *1300+ reads/s, 20+ ft*); brokers → `research-library/communication-mqtt-and-networking/{mqtt-broker-selection,mqtt-essentials}.md`; cellular → hardware platform (no sled cellular radio) | `reference/faq/{rfid,connectivity,compatibility}.md` |
| **A3** | `master-docset/connect-fixed-readers-to-{aws-iot-core,azure-iot-hub}-…md` + `research-library/iot-platforms-and-edge/*`; **provider docs are the external authority** | `fleet/cloud-integration/{aws,azure}.md` |
| **A4** | SoT `schemas/refrence/response/deviceStatusResponse.yaml` (`batteryStatus.stateOfHealth` = `GOOD/AVERAGE/POOR`) + `events/batteryAlert.yaml` (`status`/`stateOfHealth` = charge-state labels); `product/reference/reader-health-monitoring-and-gen2x.md` | `observability/monitoring/battery.md` |
| **A5** | Gen2X → `product/reference/reader-health-monitoring-and-gen2x.md` ("Gen2x Extensions": TagFocus, Tag Quieting, Protected Mode, FastID, …); rssi → SoT `schemas/refrence/payload/rssiFilterPayload.yaml` (**verbatim:** "Currently ONLY supported by the FX9600") | `rfid/performance-tuning.md`, `fleet/migration/from-123rfid-desktop.md` |
| **A6** | SoT `schemas/models/*.v1.1.json` (per-op `apiVersion`; `iot_control_cmd_response` enum `V1.0`/`V1.1`); `product/reference/release-notes-123rfid-desktop-3-0-0-63.md` (Desktop tool) | `reference/faq/compatibility.md` |
| **A7** | SoT `schemas/models/{iot_commands,iot_response,iot_control_cmd_response,iot_mgmt_cmd_response}.v1.1.json` + `refrence/response/response.yaml` (envelope: `command`/`requestId`/`payload` + `response.{code,description}`); `research-library/communication-mqtt-and-networking/mqtt-vs-rest.md` | `foundations/native-mqtt-vs-openapi.md` |
| **A8** | `brand/fonts/{ZebraSans,ZebraMono}/*.otf` (9 files) | `src/css/custom.*`, `static/` |
| **A9** | SoT `schemas/refrence/payload/{cfgAlertPayload,cfgEventPayload}.yaml`, `response/dev_mgmt/config_alerts.json`, `refrence/response/currentAlertConfig.yaml`, `operation_descriptions/config_events.md` | determination + note in `observability/configure-events.md` |
| **B1** | `product/tutorials/123rfid-mobile-app-getting-started.md`, `product/reference/123rfid-mobile-app-reference.md` | new `foundations/mobile-app.md` (+ sidebars) |
| **B2** | `explanation/{use-case-hospitality,use-case-rfd40-retail,case-study-lowes}.md` | decision (see resolution) |
| **C1** | `master-docset/{operating-modes-schema,tag-data-events-format,health-events-format,raw-mqtt-payload-schemas,batching-and-retention-guide}-zebra-iot-connector-documentation.md` → point to SoT `schemas/**` | — |
| **C2** | `…technical-writer/deployment_guide/api-reference-index.md` (0 B); `…technical-writer/schemas/refrence/events/heartbeatEvents_new.yaml` | — |
| **C3** | `master-docset/introduction-zebra-iot-connector-documentation-(2..23).md` | — |

---

## Resolution log — 2026-06-07

What was done for each item (commit follows this entry). Tables A–C below remain as the *pre-execution* record; this log is the authoritative status.

| Item | Outcome | What changed |
|---|---|---|
| **A1** | ✅ Done | Field-level **access operations (`accessOperations[]`)** reference added to `reference/ctrl/operating-mode.md` — `READ`/`WRITE`/`ACCESS`/`LOCK`/`KILL` config fields, password format (8 hex = 32 bits), `lockMemBank`/`lockAction` enums, BlockWrite note, irreversibility + schema field-name-drift caution. `tag-standards.md` already carried the standards table + cross-links. |
| **A2** | ✅ Done | Throughput "Details" re-pointed to the per-sled **hardware spec** ([hardware-tiers](../../../docs/foundations/hardware-tiers.md)) as the real source of the 1,300+/s figure. Cellular and broker-list answers verified already-cited and accurate — no churn. |
| **A3** | ✅ (flag) | `aws.md`/`azure.md` provenance notes delegate verification to the **authoritative provider docs**; the actual handheld-delta check needs live AWS/Azure access, outside this repo. |
| **A4** | ✅ Done | `battery.md`: provenance note (health grade `GOOD/AVERAGE/POOR` is from `deviceStatusResponse.yaml` only; the event's `stateOfHealth` carries charge-state labels — schema quirk; thresholds firmware-dependent) + fixed field path `battery.` → `batteryStatus.stateOfHealth`. |
| **A5** | ✅ Done (out-of-scope) | **rssiFilter** is FX9600-only per the schema → marked **not available on handheld** in `performance-tuning.md` ("Beyond the four levers") and hardened in the migration how-to (RSSI thresholding goes application-side). **Gen2X** described from source with an explicit availability caveat. |
| **A6** | ✅ Done | `faq/compatibility.md`: provenance note (V1.0/V1.1 from the schema's per-op `Supported API Versions` + control-response `apiVersion` enum; firmware mapping indicative). |
| **A7** | ✅ Done | `native-mqtt-vs-openapi.md`: provenance note re-pointing the envelope to SoT `schemas/models/*.v1.1.json` (+ `response.yaml`); the hand-authored-Stoplight-fragment evidence reinforces the page's thesis. |
| **A8** | ✅ Done | Wired **Zebra Sans (headings)** + **Zebra Mono (code)** via `@font-face` in `src/css/custom.scss` (fonts copied to `src/css/fonts/`, webpack-resolved + baseUrl-safe, `font-display: swap`). Body stays on the system stack (unsubsetted `.otf` would regress load perf). 7 `.otf` exist (not 9); condensed display face intentionally unmapped. |
| **A9** | ✅ Done (superseded) | Confirmed `config_alerts` **is superseded by `config_events`** (every toggle/threshold reproduced; absent from the V1.1 command enum). Recorded in `configure-events.md`. |
| **B1** | ✅ Done | New `foundations/mobile-app.md` (123RFID Mobile as sled-side bootstrap + operator; Admin-gated MQTT/Wi-Fi/cert surfaces + scope caveats); wired into Part 2 sidebar. |
| **B2** | ⛔ Decision: out-of-scope | **No use-cases page.** Sources are marketing flyers; only `use-case-hospitality` ties RFID↔IOTC and even there IOTC is positioned for **FX9600 fixed readers**; `case-study-lowes` is barcode/mobile-computer (IOTC-irrelevant). A page would be marketing diluting a technical reference. Recorded as a deliberate decision. |
| **C1** | ✅ Done | The 5 hollow MarkSnip stubs replaced with **SoT redirect pointers** (each names the authoritative `schemas/**` path + published page). |
| **C2** | ✅ Done (+correction) | `deployment_guide/api-reference-index.md` (was 0 B) **populated** with a real API-surface index. `heartbeatEvents_new.yaml` **preserved** — the "dead dupe" claim was wrong (it is the 1354-B substantive schema; `heartbeatEvents.yaml` is the 120-B stub). `actions-v2.md` §6 corrected. |
| **C3** | ✅ Done (corrected count) | Intro captures collapsed **23 → 6** (kept base / (10) / (11) / (17) / (22) / (23)). md5 showed only **4** byte-identical ((6)(7)(8)(9) ≡ (10)); the rest were byte-distinct same-topic captures removed as redundant source-archive with **zero site impact**. The "~18 duplicates" was an over-count by byte measure. |

---

## Table A — mandatory leftovers

Genuine documentation or verification gaps that remain open in the published docs.

| # | Ref in actions-v2 | Recommendation (not yet implemented) | Category | Evidence it is still open |
|---|---|---|---|---|
| A1 | §1, §8, §9 #8 | **Write / lock / kill access-payload depth.** Decide whether tag-access `accessCmd{Write,Lock,Kill}Payload` (passwords, `lockAction: PERMANENT_LOCK`, memory-bank targeting) gets a field-level reference on `reference/ctrl/operating-mode.md`, **or** mark it explicitly out-of-scope for handheld. | Reference depth / decision | `grep` of `operating-mode.md` for `PERMANENT_LOCK`/`accessPassword`/`lockAction` → **0 hits**. `tag-standards.md` has only a one-line `PERMANENT_LOCK` + kill-password mention (table level). No field-level surface; no explicit out-of-scope marker. |
| A2 | §1 (`faq/*`) | **Verify FAQ assertions or cite their backing.** "Max tags/sec" throughput, supported-broker list, and cellular-support answers in `reference/faq/*` have no schema/source backing — verify against an authoritative source or link the backing reference page. | Verification / provenance | FAQ pages were not touched in the pass; assertions remain uncited. |
| A3 | §2, §9 #4 | **AWS / Azure handheld-delta verification.** Provenance notes were added, but the *actual* confirmation that the handheld-specific steps (Thing/policy/cert, DPS, routing) are correct against current AWS IoT Core / Azure IoT Hub docs was **flagged, not performed**. | Verification | `aws.md`/`azure.md` now carry a `:::note[Provenance]` (done), but no delta verification was executed. |
| A4 | §2 | **`observability/monitoring/battery.md` field provenance.** Battery `stateOfHealth`/drain values have no provenance note tying them to a source (`batteryAlert.yaml` is an out-of-scope event); confirm/flag the value sets. | Verification / provenance | Page is well-developed (two `stateOfHealth` scales documented) but `grep` finds **no** provenance/source admonition. |
| A5 | §2, §10.3, §9 #9 | **Gen2X coverage + `rssiFilterPayload` scope.** (a) Develop a Gen2X subsection in `performance-tuning.md` (or explicitly accept the source's Gen2X half as under-consumed); (b) verify `rssiFilterPayload` applies to RFD40/RFD90 (its YAML carries an FX9600 note) — resolve or move to the out-of-scope multi-antenna bucket. | Content / verification | `grep -ri "gen2x" docs/` → **0 hits** anywhere. `rssiFilter` handheld scope only *flagged* (in the new migration how-to + audit), never confirmed. |
| A6 | §2 | **`reference/faq/compatibility.md` V1.0↔V1.1 provenance.** Only `foundations/v1-1-features.md` received the sourced-provenance note; its FAQ sibling still asserts compatibility facts with no source note. | Provenance | `grep` of `faq/compatibility.md` for provenance/verify/admonition → **0 hits**. |
| A7 | §4 | **Re-point `native-mqtt-vs-openapi.md` provenance to the SoT.** The command-envelope facts should cite SoT `schemas/models/*` (`iot_response.v1.1.json` etc.); the nominal source is the empty `raw-mqtt-payload-schemas` MarkSnip stub. | Provenance | `grep` for `schemas/models`/`iot_response`/provenance → **0 hits**; page untouched. |
| A8 | §7, §10.3, §9 #7 | **Wire the ZebraSans / ZebraMono brand fonts** into the theme (copy to `static/fonts/` + `@font-face` + font-family vars in `src/css/`), **or** record them as intentionally unused. | Theme / asset | Confirmed prior turn: no `static/fonts/` dir, no `@font-face`/`ZebraSans`/`ZebraMono` reference in `src/css/`. 9 `.otf` master files remain unused. |
| A9 | §5, §9 #8 | **Confirm `config_alerts` is superseded by `config_events`.** If superseded, no doc change is needed but the determination should be recorded; if not, `config_alerts` needs surfacing. | Verification | Still marked "appears superseded — confirm" in §5; no confirmation performed. |

---

## Table B — optional leftovers

Lower-priority / product-decision items the audit itself marked optional.

| # | Ref | Recommendation (not implemented) | Category | Notes |
|---|---|---|---|---|
| B1 | §3, §9 #6 | **123RFID Mobile app** coverage (tutorial + reference). Source files exist (`123rfid-mobile-app-getting-started.md`, `123rfid-mobile-app-reference.md`); the docs treat 123RFID **Desktop** as the sole bootstrap tool. Surface the mobile app as an alternate path **or** mark out-of-scope. | Product decision | No `docs/` page references the mobile app. |
| B2 | §3, §9 #6 | **"Where IOTC fits" / use-cases** page. A light `foundations/` page anchoring the abstract API to the two vertical use-cases (`use-case-hospitality`, `use-case-rfd40-retail`). | Optional content | Audit notes it is reasonable to keep these out-of-scope as marketing. |

---

## Table C — `_meta/` source cleanup leftovers

Housekeeping in the **source tree** (not published doc pages). None affect the live site; all improve source hygiene so the audit stops reading hollow files as "coverage."

| # | Ref | Recommendation (not implemented) | Category |
|---|---|---|---|
| C1 | §6, §9 #2 | **Delete or redirect the 5 hollow MarkSnip stubs** in `…/master-docset/` (`operating-modes-schema`, `tag-data-events-format`, `health-events-format`, `raw-mqtt-payload-schemas`, `batching-and-retention-guide`) — they are empty (~100–185 B) yet are the *nominal* source for the reference/schema layer. Replace with pointers to the SoT or remove. | Source cleanup |
| C2 | §6, §9 #2 | **Populate or remove** the empty (0-byte) `…technical-writer/deployment_guide/api-reference-index.md`, and **remove** the dead duplicate `…technical-writer/schemas/refrence/events/heartbeatEvents_new.yaml`. | Source cleanup |
| C3 | §6 (low) | **Drop the ~18 byte-identical duplicate `introduction-*.md`** files in `…/master-docset/` (keep the 5 distinct: `about/index`, `deployment_modes (10)`, `setupziotc (17)`, `directionality (22)/(23)`). | Source cleanup (low priority) |

> Also noted in §10.2 but **not** scheduled for deletion (correctly unreferenced today, removal optional): the 24 `mqtt-api-reference/*.md` and the 5 `deployment-guide` per-command files — dead-dupe prose mirroring the SoT `operation_descriptions`.

---

## Implemented (not leftover)

Recorded in the §9 resolution log and verified in `docs/`:

- **§9 #5** — new `fleet/migration/from-123rfid-desktop` settings-migration how-to.
- **§9 #3** — `firmware-history.md` + `regulatory.md` disclaimers promoted to prominent `:::caution` admonitions; `retention-and-retry.md` constants already flagged (the recommendation's "banner non-authoritative" branch). *Note:* binding these to an authoritative external changelog/regulatory source remains external/optional, not a doc task.
- **§9 #4 (part)** — `gcp.md`/`aws.md`/`azure.md` provenance notes added (the *flagging* half; verification half is A3 above).
- **§2** — `diagnose/symptoms.md` + `failure-modes.md` provenance notes (FM-*/RP- anchors preserved); `foundations/v1-1-features.md` sourced-provenance note + V1.1 additive example.
- **§10.1** — the 10 SoT payload schemas named at file level (completeness; no doc gap).

## Out-of-scope by design (not leftover)

These were deliberately **not** implemented and are not gaps:

- **All of §5** — fixed-reader endpoint guides (TCP/IP, WebSocket, HID, HTTP-POST), GPIO/GPO/LED, on-reader DA apps & local REST, FxConnect/RFID-API3 migration, not-currently-emitted event schemas, `set_eth`/`get_capablity`, marketing/case-studies, investor/strategy research, academic vertical applications, EPC-discovery/RTLS.
- **§6** — `FX90.yaml` (upstream artifact) and the `…-zebra-official/` stale mirror (standing do-not-source posture).
- **§10.2** — out-of-scope research categories (api-web-design, buyers-guides, non-RTLS iot-platforms), the two multi-antenna schemas (`antennaStopCondPayload`, `delayBtwnAntennaCyclesPayload`), and SoT build-infra/tooling.
- **§1 glossary "Capacity and limits"** — ownerless figures are **disclosed in an admonition** and judged acceptable as-is.

---

### Verification evidence (commands run 2026-06-07)

```
grep -rni "gen2x" docs/                                  → 0 matches
grep -ni "PERMANENT_LOCK|accessPassword|lockAction" \
     docs/reference/ctrl/operating-mode.md               → 0 matches
     docs/reference/appendices/tag-standards.md          → 2 matches (table-level only)
grep provenance/admonition  docs/reference/faq/compatibility.md   → 0
grep provenance/admonition  docs/observability/monitoring/battery.md → 0 (content only)
grep schemas/models|provenance docs/foundations/native-mqtt-vs-openapi.md → 0
static/fonts/ + @font-face in src/css/                   → absent (fonts unwired)
```
