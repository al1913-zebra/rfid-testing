# Zebra Handheld RFID IoT Connector — Conceptual Documentation TOC

**Deliverable type:** Information architecture (table of contents) for the conceptual documentation **only**. Designed to slot beside an external API reference site that is generated directly from the schema corpus in `api-schema-reference/`.

**Sled scope:** RFD40 Standard · RFD40 Premium · RFD40 Premium Plus · RFD90 · RFD9030
**Transport scope:** MQTT 3.1.1 (the native runtime contract)
**Framework:** Diátaxis (https://diataxis.fr) — this TOC covers Explanation, Tutorial, and a focused symptom-first surface. **The API Reference is a separate site** consumed via cross-link.

---

## PART A — Comparative Audit

### A.1 Source 1: the al1913-zebra site (`/docs/getting-started/quick-start/overview`)

The al1913 site is a 7-Part / ~20-chapter Docusaurus build with an explicit Quick Start track (§5.1–5.10, including Python / Node.js / C# code samples).

**Strengths**
- Clean Diátaxis-style separation of Foundations / Getting Started / Reference.
- Quick Start is detailed (10 sub-pages) and uses multi-language samples — good for developer on-ramp.
- "About X" landing pages on every chapter (information-foraging scent).
- Includes a dedicated **MQTT Core Concepts / MQTT Primer** (Part I, Chapter 3) — closes the REST-to-MQTT gap.
- 7-Part shape is mentally manageable.

**Gaps measured against the schema and hardware reality**
- **Hardware tiers are invisible.** RFD40 Standard (Bipartite — Bluetooth to host) and RFD40 Premium / Premium Plus / RFD90 (Monolithic Edge Node — native Wi-Fi) are not distinguished. A reader on the wrong tier will mis-map every later chapter.
- **MDM "hybrid" endpoint is not named.** 123RFID Desktop provisions an MDM hybrid endpoint by default; the docs treat MDM as just another epType.
- **No native-MQTT vs OpenAPI-schema disambiguation.** Hand-coding from the OpenAPI rendering produces nested payloads the sled rejects.
- **No "config_events" concept** (the schema makes this an explicit operation separate from `set_config`).
- **System operations (`set_os`, `reboot`) are not surfaced.** Firmware update lives behind `set_os` in the current schema; `reboot` is an explicit operation with a hard constraint (cannot run during active inventory).
- **Troubleshooting is one chapter** — not symptom-first.
- **No glossary, no firmware-compatibility matrix, no capacity/limits table.**

### A.2 Source 2: the content file `zebra-handheld-rfid-iotc-content.md` (current draft)

The current content file is comprehensive (~4,300 lines, ~150 topics). It corrects every gap in A.1. It is, however, **too long for a conceptual TOC** and includes operation-by-operation reference material that now belongs in the external API reference site (aa5123 site).

**What to retain from the current file**
- Hardware-tier fork as a first-class axis (Setup Path A / Path B).
- Bounded contexts and ubiquitous language.
- Mental-model layer (the 15 catalogued misconceptions).
- The "OpenAPI Illusion" disambiguation.
- Symptom-first failure-mode index.
- The "phantom RF90_DATA_BROKER" recovery playbook.

**What to remove and delegate to the API reference site**
- Per-operation atomic reference cards (all 23 operations + 4–5 event variants) — these are auto-generated on the aa5123 site from `schemas/` and `operation_descriptions/`.
- Per-event field reference — same.
- Error-code table — already in `error_codes.json`, rendered on the aa5123 site.
- Payload schema tables — same.

### A.3 Source 3: the aa5123 API reference site

The aa5123 site is a Docusaurus + `docusaurus-plugin-openapi-docs` build whose entire structure is generated from the schema corpus in `api-schema-reference/`. The fetched HTML did not surface its sidebar (the SPA renders client-side), but the sidebar is **completely determined by `tag_config.json`** plus the `operation_descriptions/` and `tag_descriptions/` content.

**The four top-level API tag groups (per `tag_config.json`).**

| Group | Sub-tags | Operations / Events |
|---|---|---|
| **Management** | Device Status · Network Configuration · MQTT Endpoint Configuration · Certificate Management · Device Configuration · System Operations | `get_status`, `get_version`, `get_current_region`, `get_eth`, `get_wifi`, `set_wifi`, `delete_wifi_profile`, `get_endpoint_config`, `config_endpoint`, `get_installed_certificate`, `install_certificate`, `delete_certificate`, `get_config`, `set_config`, `set_os`, `reboot` |
| **Control** | Operating Mode · Tag Filtering · Inventory Control | `get_operating_mode`, `set_operating_mode`, `get_post_filter`, `set_post_filter`, `control_operation` |
| **Events** | Event Configuration · Device Health · Alerts · Exceptions · MQTT Connectivity | `config_events`, `heartBeatEVT`, `alert_short`, `alerts`, `mqttConnEVT` |
| **Data** | Tag Data Event | `dataEVT` |

**Total: 23 documented items across 14 sub-tags in 4 top-level groups.**

This grouping is the spine the conceptual TOC must mirror so a reader can pivot conceptual → reference in one click.

### A.4 Schema-derived facts that change the conceptual TOC

Reading the latest schema and operation descriptions surfaces six facts that materially change a conceptual TOC built on older drafts.

| # | Schema fact | Impact on TOC |
|---|---|---|
| 1 | **`set_os` (not `firmware_update`) starts firmware updates.** `set_os` lives under the *System Operations* sub-tag. | Conceptual chapter is "System operations: OS updates, firmware, reboot" — not a standalone "firmware management" chapter. |
| 2 | **`reboot` is an explicit operation** with a documented rule: *cannot* run during active RFID inventory (returns error code 5). | Conceptual coverage in the same System Operations chapter. State-machine diagram must include the reboot-blocked-during-active-inventory edge. |
| 3 | **`config_events` is separate from `set_config`.** It configures the event flag set (antenna, terminalConnection, firmwareUpdate, gpi, network, exceptions, ntp, userApp, heartbeat, power, battery, temperature, fileDownload, cpuUsage, flashUsage, ramUsage) and thresholds (cpu, ram, flash, temperature). | Conceptual chapter is "Event configuration" (a separate chapter from the device configuration document). |
| 4 | **`install_certificate` is an MQTT operation** with five cert types (`client`, `server`, `mqtt`, `wifi`, `filestore`) and two sources (`HTTP` / `DIRECT`). | Conceptual chapter on certificates and TLS must cover MQTT-based install — not only out-of-band install via 123RFID Desktop. |
| 5 | **`alert_short` and `alerts` are two event variants** — compact and verbose. | Conceptual chapter "Alerts and exceptions" must distinguish the two. |
| 6 | **Reboot persistence rule** (from `reboot.md`): *"All management endpoint configurations are restored after reboot. Only radio operation configurations from control endpoint operations are lost on reboot."* | Conceptual chapter on the configuration lifecycle must distinguish *management-plane persistence* from *control-plane volatility*. |

---

## PART B — Design Principles for the New Conceptual TOC

1. **Simple at the top, robust in the middle.** Few top-level Parts (target: 7–8). Concept chapters mirror the API reference's 14 sub-tags so cross-linking is mechanical.
2. **Hardware tier is named in Part 2, not implied.** Every chapter that depends on tier carries a tier badge.
3. **Native MQTT is the runtime contract.** The OpenAPI rendering is a derivative for documentation; conceptual prose never uses nested REST-style payloads as examples.
4. **One-to-one concept ↔ API sub-tag where possible.** A reader on any API reference page can find the corresponding concept chapter in one hop; a reader on any concept chapter can find the relevant API pages in one hop.
5. **Diátaxis-correct.** Conceptual TOC is Explanation-dominant. One Tutorial track (Quick Start). Failure-mode pages live on a separate symptom-first surface in the conceptual docs (because failure modes are conceptual diagnostic content, not API-reference look-up). How-to is minimized; how-to procedures inhabit the API reference next to the operation that performs the procedure.
6. **Reading paths are explicit.** A new-integrator path (Parts 1 → 2 → 3 → 6 → 7) and a returning-architect path (Parts 4 → 5 → 6 → 8) are both linear.
7. **Outcome-predictive labels.** Every chapter title predicts what the reader will know after reading. No "Endpoint Architecture" — instead, "How MQTT endpoints route traffic: hybrid (MDM) vs split (CTRL + DATA)."

---

## PART C — The Conceptual TOC (from scratch)

**Eight Parts, twenty-eight chapters.** Each concept chapter is annotated with the **API reference sub-tag(s)** it ties to (so the cross-walk in Part D is mechanical).

---

### Part 1 — Orient (the entry point)

Three short pages every reader passes through.

| # | Chapter | What the reader will know after this page |
|---|---|---|
| 1.1 | **About this documentation** | What it covers, what the API Reference covers, who this is written for. |
| 1.2 | **MQTT in five minutes** (skippable for the MQTT-literate) | Pub/sub semantics; topics as addresses; QoS as a delivery-effort dial; subscribe-before-publish. |
| 1.3 | **How to use the conceptual docs alongside the API Reference** | Where conceptual ends and API Reference begins; the cross-walk in Part D; the four navigation entry points (concept, tutorial, symptom, API). |

---

### Part 2 — Foundations (the irreducible mental model)

Five chapters that every later page depends on.

| # | Chapter | What the reader will know |
|---|---|---|
| 2.1 | **What the Zebra Handheld RFID IoT Connector is** | First-principles definition; the four interfaces named (Management, Event, Control, Data); the MQTT-only transport invariant. |
| 2.2 | **Hardware tiers and architecture paths** | RFD40 Standard (Bipartite — Bluetooth to host) vs RFD40 Premium / Premium Plus / RFD90 (Monolithic Edge Node — Wi-Fi 6 in firmware). Setup Path A vs Setup Path B. Capability matrix. |
| 2.3 | **The four actors: Reader, Host, Broker, Application** | Definitions; which actors are present on each path; the authority and identity rules (Reader is authoritative). |
| 2.4 | **The message lifecycle: commands, responses, events, tag data** | The four interfaces walked end-to-end; the `requestId` correlation pattern; where retention buffers and LWT apply. |
| 2.5 | **Native MQTT payloads vs OpenAPI schema renderings** | The OpenAPI Illusion. Why both exist. The authoring rule: trust validated examples; the API Reference site shows the canonical native form. |

---

### Part 3 — Quick Start (the only Tutorial in the conceptual docs)

One narrative tutorial with a tier fork at the top.

| # | Chapter | What the reader will have done |
|---|---|---|
| 3.1 | **Your first 30 minutes — from unboxing to your first tag read** | Choose your path (A or B). Bootstrap via 123RFID Desktop. Publish your first MQTT command (`get_version`). Read your first tag (`control_operation start`). Stop. Promote to TLS. Bridges to Parts 4–6 for next steps. |

---

### Part 4 — Management Concepts (mirrors the API "Management" tag group)

Six chapters, each tied to one API Management sub-tag. Each chapter is **Explanation** in voice (not how-to); the corresponding API Reference pages carry the procedural detail.

| # | Chapter | Ties to API sub-tag | What the reader will know |
|---|---|---|---|
| 4.1 | **Device state and identity** | Device Status | What `get_status` reports (runtime) vs what `get_version` reports (identity); why region is read via `get_current_region` but cannot be set over MQTT. |
| 4.2 | **Network configuration** | Network Configuration | Wi-Fi (`get_wifi`, `set_wifi`, `delete_wifi_profile`) and Ethernet (`get_eth`); how WPA2/WPA3 Personal and Enterprise security types map; profile lifecycle. |
| 4.3 | **MQTT endpoint architecture — hybrid (MDM) vs split (CTRL + DATA)** | MQTT Endpoint Configuration | The seven epTypes; the MDM hybrid endpoint as bootstrap default; when and why to split; the 10-endpoint and 2-data-pipe limits; the phantom `RF90_DATA_BROKER` slot. |
| 4.4 | **Certificates and TLS trust** | Certificate Management | Five certificate types (`client`, `server`, `mqtt`, `wifi`, `filestore`); install via MQTT (`install_certificate` HTTP / DIRECT sources) vs install via 123RFID Desktop; `verificationType` taxonomy (NONE / PEER / HOST / HOST_PEER) and what each verifies. |
| 4.5 | **The configuration document and reconciliation** | Device Configuration | `get_config` / `set_config`; three configuration scopes (factory / saved / runtime); drift detection and reconcile-on-reconnect; **management-plane persistence vs control-plane volatility across reboot**. |
| 4.6 | **System operations — OS updates, firmware, reboot** | System Operations | `set_os` is how firmware updates start (URL + auth + verification); `reboot` is an explicit operation **blocked during active inventory**; the firmware update lifecycle (download → verify → apply → reboot); error code 14 (battery low) and 8 (flash insufficient). |

---

### Part 5 — Control Concepts (mirrors the API "Control" tag group)

Three chapters, each tied to one API Control sub-tag.

| # | Chapter | Ties to API sub-tag | What the reader will know |
|---|---|---|---|
| 5.1 | **Operating modes — the seven profiles and how to choose** | Operating Mode | The seven profiles (FAST_READ, CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE, READER_DEFINED, ADVANCED); the read-rate / battery / interference tradeoff triangle; **FAST_READ does not emit `dataEVT`**; profile defaults for power, link profile, session. |
| 5.2 | **The RFID inventory cycle — start, stop, trigger** | Inventory Control | The IDLE → READY → ACTIVE → IDLE state machine; physical trigger vs software start; `radioStartConditions` and `radioStopConditions` enumerations; the inventory-state lock on `reboot`. |
| 5.3 | **Tag filtering — pre-read (Select) vs post-read (Report)** | Tag Filtering | Pre-filter at the air protocol (saves RF effort); post-filter in the IOTC daemon (saves bandwidth); the current 4-filter cap (design supports 32); RSSI thresholds and seen-count thresholds; INCLUDE / EXCLUDE semantics. |

---

### Part 6 — Events & Data Concepts (mirrors the API "Events" and "Data" tag groups)

Five chapters, each tied to one API Events/Data sub-tag.

| # | Chapter | Ties to API sub-tag | What the reader will know |
|---|---|---|---|
| 6.1 | **Event configuration — choosing what the reader tells you** | Event Configuration | `config_events` is the dedicated operation (separate from `set_config`); the full event-flag set (antenna, terminalConnection, firmwareUpdate, gpi, network, exceptions, ntp, userApp, heartbeat, power, battery, temperature, fileDownload, cpuUsage, flashUsage, ramUsage); thresholds for CPU / RAM / flash / temperature; heartbeat sub-configuration (interval, inventoryStatus, batteryStatus, userApps). |
| 6.2 | **Device health and heartbeats** | Device Health | `heartBeatEVT` cadence and contents; how heartbeat verbosity affects battery; the per-fleet aggregation pattern. |
| 6.3 | **Alerts and exceptions** | Alerts (and Exceptions) | `alerts` (verbose) vs `alert_short` (compact); the supported alert ids (BATTERY, FIRMWARE_UPDATE, NETWORK_EVENT, TEMPERATURE, POWER); state/priority taxonomy; threshold-driven emission. |
| 6.4 | **MQTT connectivity events** | MQTT Connectivity | `mqttConnEVT` on every transition; LWT (Last Will and Testament); the `HH:MM:SS` timestamp quirk; reconcile-on-reconnect playbook. |
| 6.5 | **Tag data events — the `dataEVT` lifecycle** | Tag Data Event | The six-stage path from RF singulation to topic publish; `tagMetaDataToEnable` field-by-field cost; the 150,000-event retention buffer at 500 TPS flush; batching tradeoffs. |

---

### Part 7 — Operate & Scale (operational concerns beyond a single device)

Four chapters that take a reader from one working sled to a managed fleet.

| # | Chapter | What the reader will know |
|---|---|---|
| 7.1 | **Fleet provisioning — 123RFID Desktop, SOTI Connect, 42Gears SureMDM** | Comparison matrix; when to use which; the one-time-then-MDM pattern; region must still be set via 123RFID Desktop. |
| 7.2 | **Bulk configuration and drift management** | Canonical-config patterns; detection cadence; reconciliation strategies; reboot-required vs runtime-applied operations. |
| 7.3 | **Reliability, retention, and retry** | Sled-side retention buffer behavior; QoS choice per topic; idempotent vs state-changing retry; broker durability and downstream pipeline expectations. |
| 7.4 | **AI and RAG consumption** | Schema discoverability; topic naming for retrieval; embedded metadata patterns; agent-friendly atomic reference cards on the API site. |

---

### Part 8 — Diagnose & Reference Companion

Five chapters that close the loop: failure-mode recovery, plus the connective tissue back to the API reference.

| # | Chapter | What the reader will know |
|---|---|---|
| 8.1 | **Symptom-first diagnostic index** | Alphabetical list of symptoms (in the reader's words) mapped to failure-mode IDs (FM-XX-YY). Entry point from incident-response workflows. |
| 8.2 | **The two physical edges and where failures appear** | Path A: Reader ↔ Wi-Fi (one edge). Path B: Reader ↔ Host (BT/eConnex) and Host ↔ Broker (two edges). Edge-to-signal mapping (terminalConnection.status, mqttConnEVT, batteryStatus). |
| 8.3 | **Recovery playbooks** | RP-01 Recover lost connectivity · RP-02 Recover from configuration drift · RP-03 Re-add a missing endpoint · RP-04 Roll back a failed `set_os` firmware update (with reboot constraint) · RP-05 Free the phantom RF90_DATA_BROKER slot · RP-06 Implement graceful degradation. |
| 8.4 | **Common misconceptions corrected** | The MM-01..MM-15 catalogue: incoming mental models that produce wrong code, and the correct model with the page that fixes each. |
| 8.5 | **Reference companion** | Glossary (one-line definitions, A–Z) · Firmware compatibility matrix (which feature requires which firmware) · Capacity and limits (10 endpoints, 2 data pipes, 4 filters → 32, 150k retention) · Cross-walk from concept chapter → API reference page (Part D below) · Direct link to the API Reference site. |

---

## PART D — The Concept ↔ API Reference Cross-Walk

Every concept chapter in Parts 4–6 ties to one API reference sub-tag. The cross-walk is bidirectional: from any API reference page, a reader can reach the matching concept chapter in one hop; from any concept chapter, a reader can reach all relevant API reference operations in one hop.

| Concept chapter | API top-level group | API sub-tag | Operations / Events on the API Reference page |
|---|---|---|---|
| §4.1 Device state and identity | Management | Device Status | `get_status` · `get_version` · `get_current_region` |
| §4.2 Network configuration | Management | Network Configuration | `get_eth` · `get_wifi` · `set_wifi` · `delete_wifi_profile` |
| §4.3 MQTT endpoint architecture | Management | MQTT Endpoint Configuration | `get_endpoint_config` · `config_endpoint` |
| §4.4 Certificates and TLS trust | Management | Certificate Management | `get_installed_certificate` · `install_certificate` · `delete_certificate` |
| §4.5 The configuration document and reconciliation | Management | Device Configuration | `get_config` · `set_config` |
| §4.6 System operations — OS, firmware, reboot | Management | System Operations | `set_os` · `reboot` |
| §5.1 Operating modes — seven profiles | Control | Operating Mode | `get_operating_mode` · `set_operating_mode` |
| §5.2 The RFID inventory cycle | Control | Inventory Control | `control_operation` |
| §5.3 Tag filtering — pre vs post | Control | Tag Filtering | `get_post_filter` · `set_post_filter` |
| §6.1 Event configuration | Events | Event Configuration | `config_events` |
| §6.2 Device health and heartbeats | Events | Device Health | `heartBeatEVT` |
| §6.3 Alerts and exceptions | Events | Alerts (and Exceptions) | `alerts` · `alert_short` |
| §6.4 MQTT connectivity events | Events | MQTT Connectivity | `mqttConnEVT` |
| §6.5 Tag data events | Data | Tag Data Event | `dataEVT` |

**Authoring rule.** Every concept chapter in Parts 4–6 carries a "See in the API Reference" callout at the top, naming every operation/event in the matching API sub-tag. Every API reference page carries a "Concept: read more" callout pointing back to its concept chapter.

---

## PART E — What This TOC Drops (from the older draft and from the al1913 site)

To stay "simple yet robust", the new TOC drops:

| Dropped | Why | Where it lives now |
|---|---|---|
| Per-operation reference cards (×23) | Belong on the API Reference site; auto-generated from `schemas/` | aa5123 API Reference site |
| Per-event reference cards (×5) | Same | aa5123 API Reference site |
| Error-code table | Belongs in `error_codes.json` and rendered on the API site | aa5123 API Reference site |
| Payload-schema enumerations | Same | aa5123 API Reference site |
| Detailed how-to procedures (e.g., "How to add a post-filter") | Live next to the operation that performs the procedure | aa5123 API Reference site |
| Edge Applications (Python/Node DA apps) — Unit 8 in the older draft | Not present in current schema's `tag_config.json`; defer until SDK/runtime ships | Future appendix when SDK lands |
| Standalone "FAQ" unit | Distributed: factual Q&A → glossary entries; "why is X broken" → §8.1 Symptom Index | §8.5 and §8.1 |
| Standalone "Troubleshooting" chapter (al1913 site) | Promoted to Part 8 (symptom-first diagnostic surface, four chapters deep) | Part 8 |

---

## PART F — The Final TOC at a Glance

```
Part 1 — Orient
  1.1 About this documentation
  1.2 MQTT in five minutes
  1.3 How to use the conceptual docs alongside the API Reference

Part 2 — Foundations
  2.1 What the Zebra Handheld RFID IoT Connector is
  2.2 Hardware tiers and architecture paths
  2.3 The four actors: Reader, Host, Broker, Application
  2.4 The message lifecycle
  2.5 Native MQTT vs OpenAPI schema renderings

Part 3 — Quick Start
  3.1 Your first 30 minutes

Part 4 — Management Concepts                       (→ API "Management")
  4.1 Device state and identity                       (→ Device Status)
  4.2 Network configuration                           (→ Network Configuration)
  4.3 MQTT endpoint architecture                      (→ MQTT Endpoint Configuration)
  4.4 Certificates and TLS trust                      (→ Certificate Management)
  4.5 The configuration document and reconciliation   (→ Device Configuration)
  4.6 System operations — OS, firmware, reboot        (→ System Operations)

Part 5 — Control Concepts                          (→ API "Control")
  5.1 Operating modes — the seven profiles            (→ Operating Mode)
  5.2 The RFID inventory cycle                        (→ Inventory Control)
  5.3 Tag filtering — pre-read vs post-read           (→ Tag Filtering)

Part 6 — Events & Data Concepts                    (→ API "Events" and "Data")
  6.1 Event configuration                             (→ Event Configuration)
  6.2 Device health and heartbeats                    (→ Device Health)
  6.3 Alerts and exceptions                           (→ Alerts / Exceptions)
  6.4 MQTT connectivity events                        (→ MQTT Connectivity)
  6.5 Tag data events                                 (→ Tag Data Event)

Part 7 — Operate & Scale
  7.1 Fleet provisioning paths
  7.2 Bulk configuration and drift management
  7.3 Reliability, retention, and retry
  7.4 AI and RAG consumption

Part 8 — Diagnose & Reference Companion
  8.1 Symptom-first diagnostic index
  8.2 The two physical edges
  8.3 Recovery playbooks (RP-01 … RP-06)
  8.4 Common misconceptions corrected (MM-01 … MM-15)
  8.5 Reference companion (glossary, firmware compatibility, capacity, cross-walk, API link)
```

**Counts:** 8 Parts · 28 chapters · 14 conceptual chapters mirroring the 14 API sub-tags · one Quick Start tutorial · one symptom-first diagnostic surface.

---

## PART G — Editorial Notes for the Implementer

- **Sidebar collapse default.** Parts 1, 2, 3 expanded by default. Parts 4–8 collapsed by default. Reader sees a low-effort top of the sidebar.
- **Outcome-predictive titles.** Every sidebar label is a noun phrase that predicts what the reader will know after reading. No bare "Endpoints" — instead, "MQTT endpoint architecture."
- **Tier badges.** Every concept chapter that depends on hardware tier carries a `🅰` (Monolithic) or `🅱` (Bipartite) badge or `🅰🅱` (both). Readers learn to scan for tier match.
- **Cross-surface metadata.** Every concept page header carries:
  ```
  ─ Cross-surface links ────────────────────────
  Tutorial: §3.1 (if applicable)
  API Reference: <sub-tag link>
  Diagnose: §8.1 → FM-XX-YY (if a known failure surface exists)
  ──────────────────────────────────────────────
  ```
- **Voice and tone (Diátaxis-correct).**
  - Parts 1, 2, 4, 5, 6, 7 — Explanation. Discursive, evidence-anchored, third-person.
  - Part 3 — Tutorial. Narrative, second-person, confidence-closing.
  - Part 8 §8.1–§8.3 — Symptom-first failure mode and recovery (procedural). Imperative tone in §8.3; reference-style in §8.1.
  - Part 8 §8.4–§8.5 — Reference. Tabular where possible.
- **Schema-faithful examples.** Every code example is a flattened native MQTT payload (never a nested OpenAPI rendering). If an OpenAPI rendering is referenced, it is contained in a `> Schema vs Runtime` callout that explicitly explains the deviation.
- **The "see in the API Reference" callout shape:**
  ```
  > **See in the API Reference**
  > Sub-tag: <Device Status>
  > Operations: get_status · get_version · get_current_region
  > Link: https://<api-reference-site>/api/tags/device-status
  ```
- **The Diátaxis discipline.** This conceptual TOC has only one Tutorial (§3.1) and no standalone How-to chapters. How-to content lives next to the operations that perform the procedures, on the API Reference site (because the schema makes them generate-able). Concept chapters explain *why* and *what*; the API Reference explains *how to call it*.

---

*End of conceptual TOC deliverable. Eight Parts, twenty-eight chapters, fourteen one-to-one concept-to-API-sub-tag bridges, one Quick Start tutorial, one symptom-first diagnostic surface, one cross-walk that lets a reader pivot between the conceptual docs and the API reference in a single click.*
