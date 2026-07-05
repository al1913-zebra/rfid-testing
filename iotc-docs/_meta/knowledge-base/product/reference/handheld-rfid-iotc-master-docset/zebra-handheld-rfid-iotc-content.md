# Zebra Handheld RFID IoT Connector — Conceptual Documentation
## Audit, Revised TOC, Diátaxis Assignment, Outlines, and Drafted Content

**Sled scope:** RFD40 Standard · RFD40 Premium · RFD40 Premium Plus · RFD90 · RFD9030
**Protocol scope:** Native MQTT 3.1.1 (the field-validated transport) plus broker-side TLS
**Bootstrap tool:** 123RFID Desktop (Windows, USB)
**Authoring framework:** Diátaxis (Explanation · Tutorial · How-to · Reference)
**Authoring stance:** Acting as Technical Information Architect and Documentation Systems Designer, applying first-principles thinking, cognitive load theory, information foraging theory, JTBD, DDD, and progressive disclosure to a sled-class IOTC.

> **Voice and tone discipline.** Evidence-anchored, schema-faithful, plain-language, declarative, persona-aware. Every claim in this document is traceable to either (a) the `knowledge/` evidence folder, (b) the schemas in `api-schema-reference/`, or (c) the hardware-tier brief at the head of the source request.

---

## How to read this document

This document has four parts:

- **Part 1 — TOC Audit and Revised TOC.** What is wrong (or missing) in the source `zebra-handheld-rfid-iotc-toc-outline.md`, the rationale for every change, and the polished revised TOC.
- **Part 2 — Diátaxis quadrant assignment.** Every topic mapped to one or more Diátaxis quadrants with rationale.
- **Part 3 — Per-topic outline + drafted content.** For every topic in the revised TOC: a 4–7-line outline and the actual draft content. Conceptual (Explanation-quadrant) topics receive the deepest draft. Tutorials, How-tos, and Reference receive structurally-correct skeletons with verified facts.
- **Part 4 — Appendices.** Evidence map (which file in the knowledge folder supports which claim), a style note, and an open-question list.

---

# PART 1 — TOC Audit and Revised TOC

## 1.1 Source TOC — Audit Findings

The source TOC (`zebra-handheld-rfid-iotc-toc-outline.md`) is competent. It already adopts Diátaxis at the Unit level, separates Foundations from Getting Started, and reserves a dedicated Reference unit. The audit below catalogues defects against the cognitive-architecture frameworks specified in the source brief.

| # | Finding | Severity | Evidence | Remediation in Revised TOC |
|---|---|---|---|---|
| A1 | **Hardware tier is invisible.** The TOC nowhere distinguishes RFD40 Standard (Bipartite — Bluetooth-to-host) from RFD40 Premium / Premium Plus / RFD90 (Monolithic Edge Node — native Wi-Fi 6, in-firmware IOTC daemon). All four sleds receive identical treatment, which guarantees a wrong mental model. | Critical | Hardware brief in source request; `rfd40-prg-en.md`; `rfd40series-premium-prg-en.md`; `rfd90-spec-sheet-en-us.md`; `RFD40 UHF RFID Standard Sled  Zebra.md`. | Add §1.2 *Hardware Tiers & Architecture Paths*; add §1.6 *Setup Path A (Monolithic) vs Setup Path B (Bipartite)*; thread tier-specific callouts through Units 2, 3, 6, 7. |
| A2 | **"Endpoint" is overloaded.** The TOC uses *endpoint* for both MQTT-broker bridge configurations (the `epConfig` record) and addressable API operations. The 123RFID Desktop UI uses "End Point" for the former; the Getting Started Guide uses native MQTT command names (`get_version`, `start`, `config_endpoint`) for the latter. A reader cannot disambiguate. | Critical | `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md`; `iot_setup_user_guide.md`. | Add §4 *Domain Language and System Boundaries* with explicit DDD bounded contexts and a §4.7 *Endpoint disambiguation* page. Enforce ubiquitous-language rule across all units. |
| A3 | **The MDM "hybrid" endpoint is missing.** The default endpoint produced by 123RFID Desktop bootstrap is an MDM endpoint that carries command, response, alert, and RFID data on `MDM/clients/...` topics. The TOC's chapter 10 *Endpoint Architecture* treats MDM as just one of several epTypes, with no acknowledgment that it is the first-encountered, hybrid endpoint every Premium/RFD90 sled boots with. | Critical | `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md` Phase 2; `iot_setup_user_guide.md` *Setting up Data & Control endpoint*. | Add §10.0 *The MDM Hybrid Endpoint — your bootstrap default*. Reposition §10 to walk Hybrid → Split (CTRL + DATA separation). |
| A4 | **Native-MQTT vs OpenAPI-schema mismatch is unstated.** The schema folder shows nested REST-style payloads (e.g., `ctrlOprPayload`, `params`). The field-validated native MQTT contracts are *flattened* — `{"command":"start","requestId":"..."}` — and the Getting Started Guide warns of "the OpenAPI Illusion." A reader who hand-codes from the schema alone will fail. | Critical | `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md` Phase 6 warning; payload examples throughout. | Add §9.7 *Native MQTT vs Schema-Rendered Payloads — why they differ and how to bridge*. Cross-reference from every API reference page in Unit 9. |
| A5 | **Region setting constraint is buried.** RFD40/RFD90 region cannot be set via MQTT; it must be applied via 123RFID Desktop. The TOC mentions it only at §20.5. A reader will spend hours hunting for a non-existent MQTT command. | Major | `iot_setup_user_guide.md` *Connecting the Device to Wi-Fi*; field experience. | Surface as a §1.4 *System goals and constraints* invariant, repeat in §5 *First Time Setup* prerequisites, and call out in §20.4 *Bootstrap constraints*. |
| A6 | **The MQTT primer is missing.** The TOC's §9 *MQTT as a Distributed Control Plane* assumes MQTT literacy. The audience includes integrators arriving from REST/HTTP backgrounds with no MQTT exposure. | Major | `pdfcoffee.com_an-introduction-to-mqtt-for-complete-beginners-pdf-free.md` exists in the knowledge folder; persona analysis. | Add §0 *Quick orientation: MQTT in 5 minutes* (Explanation, optional skip for MQTT-literate readers); reinforce in §3 *Mental Models*. |
| A7 | **Profile coverage gap.** The TOC implies a single uniform "Operating Mode" treatment. The schema and the IOTC Features Guide define **7 profiles**: FAST_READ (no tag data events emitted), CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE (default), READER_DEFINED, ADVANCED. The TOC must enumerate them, and call out that FAST_READ does **not** emit tag data events. | Major | `iot_setup_user_guide.md` *Operating Mode Configuration* and *Future Developments*; `Controlling Operating Mode — Zebra IoT Connector documentation.md` (note: that file describes Fixed reader modes, not handheld — caution). | Add §13.1 *The Seven Operating-Mode Profiles* (decision matrix); §13.5 *Profile-specific behaviors and caveats* (FAST_READ omits tag data; READER_DEFINED is reserved). |
| A8 | **No SOTI / 42Gears MDM partner story.** The handheld market deploys at scale via SOTI Connect and 42Gears SureMDM. The TOC's §22.2 mentions them but treats them as a sub-bullet; in field deployments they often *replace* 123RFID Desktop. | Major | `soti-connect-flyer-en-us.md`; `mdm_overview.md`; `iot_setup_user_guide.md` (links to soti.net and 42gears.com partner pages). | Promote to §23 *Fleet provisioning paths (123RFID Desktop · SOTI Connect · 42Gears SureMDM)* with comparison matrix. |
| A9 | **Failure-mode coverage is generic.** The TOC's §25 lists six failure categories without anchoring them to observable signals (`get_status` fields, `mqttConnEVT`, `terminalConnection.status`). Reader cannot pivot from symptom to cause. | Major | `error_codes.json`; field-validated diagnostic patterns. | Reorganize §27 (renumbered) as **symptom-first** with explicit Symptom Index mapped to FM-XX-YY identifiers. |
| A10 | **Cognitive flow gap between Units 1 and 2.** Foundations (Unit 1) ends on Domain Language; Getting Started (Unit 2) jumps to First-Time Setup. There is no "you are about to do X; here is how the pieces connect" hand-off. | Moderate | LXD principle (confidence-building bridge between Explanation and Tutorial). | Add §4.8 *From mental model to first command — a reading map* at end of Unit 1. |
| A11 | **No DA (Data Analytics) application coverage.** RFD40/RFD90 firmware supports User Application packages (DA apps) — Python and NodeJS — running natively on the sled (analogous to fixed-reader DA). The TOC ignores this entirely. | Moderate | `Overview of Data Analytics Applications in IoT Connector — Zebra IoT Connector documentation.md`; `Python DA Application — Zebra IoT Connector documentation.md`; `NodeJS DA Application — Zebra IoT Connector documentation.md`; `Packaging and Deployment — Zebra IoT Connector documentation.md`. | Add a new Unit 8 *Edge Applications and Customization* (between current Units 7 and 8); covers DA app architecture, Python/Node SDKs, packaging, deployment. |
| A12 | **Configuration persistence model is silent.** The TOC treats configuration as one thing. In practice there is: (a) runtime (RAM) configuration that vanishes on reboot, (b) saved configuration that survives reboot, and (c) factory defaults. The save semantics ("reboot after activating endpoints") are non-obvious. | Moderate | `iot_setup_user_guide.md` *reboot the device to apply the endpoint configuration*; `Save Config — Zebra IoT Connector documentation.md`. | Strengthen §22 *Configuration Architecture* with §22.1 *Three configuration scopes: factory · saved · runtime* and §22.4 *Reboot-required vs runtime-applied operations*. |
| A13 | **Limits are not listed first-class.** Max 10 endpoints, max 2 active data pipes per sled, max 4 pre-filters (design supports 32), MDM hidden phantom `RF90_DATA_BROKER` slot, 150k retention buffer. These are operational planning facts. | Moderate | `iot_setup_user_guide.md` *maximum number of endpoints allowed is 10*; `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md` *RFD40 only supports two data pipes*. | Add §35 *Capacity and Limits Reference* in Unit 11 (renumbered Reference); cross-reference from §11, §13. |
| A14 | **Tag data event omissions in FAST profile are not isolated.** Several fields are not reported in FAST profile: First Seen, Last Seen, User Defined, CRC. The TOC does not mark this constraint. | Moderate | `iot_setup_user_guide.md` *Future Developments*. | Add as a callout in §15.1 *Tag observation lifecycle* and as an entry in §35 limits reference. |
| A15 | **"Trigger-based operation" needs nuance.** Trigger is both a hardware concept (physical trigger button on the sled) and a configuration concept (radioStartConditions.trigger ∈ IMMEDIATE / PERIODIC / etc.). The TOC's §13.3 *Trigger based operation* conflates them. | Moderate | Schema (radioStartConditions enum) and hardware brief. | Split into §15.4 *Physical trigger semantics* and §15.5 *Software start/stop trigger conditions*. |
| A16 | **No barcode-scanning chapter.** RFD40 Premium and Premium Plus ship with an integrated barcode scanner. While IOTC currently does not expose barcode control (per Future Developments), readers expect at least a positioning page. | Minor | `iot_setup_user_guide.md` *Future Developments — barcode scanning operations*; `rfd40-m-premium-plus-spec-sheet-en-us.md`; `rfd40-premium-series-spec-sheet-en-us.md`. | Add §15.7 *Barcode scanning (current scope and future roadmap)*. |
| A17 | **Welcome and "How to use these docs" page is missing.** A reader-orientation page that maps personas to entry chapters dramatically improves time-to-first-success. | Minor | Diátaxis cross-cutting concern; Information Foraging Theory ("scent at the front door"). | Add §0.1 *Welcome — choose your reading path*. |
| A18 | **Glossary is implicit.** Domain Language (§4) is the closest the TOC gets. A glossary with one-line definitions sorted alphabetically is needed for retrieval. | Minor | DDD ubiquitous language; cognitive-load principle. | Add §36 *Glossary* to the Reference unit. |
| A19 | **No "What's new / firmware version compatibility" page.** Releases gate features. Reader needs to know which firmware version supports which feature. | Minor | `New_Release_Notes_123RFID_Desktop_v3.0.0.63.md`; field experience. | Add §37 *Firmware Compatibility Matrix* to the Reference unit. |
| A20 | **Style and consistency rules are not surfaced.** The knowledge folder contains the Zebra style guide (`StyleGuide_P1086622-001.md`). The TOC does not anchor authoring rules. | Minor | Style guide presence in knowledge folder. | Defer to a separate `STYLE.md` (not part of the public TOC) but reference it in editorial governance. |

## 1.2 Architectural Shifts in the Revised TOC

| Shift | From (source TOC) | To (revised TOC) | Rationale |
|---|---|---|---|
| **Hardware tier as a first-class axis** | Implicit. | Explicit §1.2 + §1.6 Setup Path A / Setup Path B; per-unit "Applies to:" badges. | Bipartite vs Monolithic is the most consequential architectural fork; surfacing it early prevents wrong mental models. |
| **MDM hybrid endpoint repositioned** | Equal among epTypes. | Default starting endpoint; explicit Hybrid → Split migration path. | Reflects actual bootstrap reality and prevents the "phantom RF90_DATA_BROKER" trap. |
| **Native MQTT vs schema mismatch elevated** | Absent. | Dedicated §9.7 and a callout on every Reference page in Unit 11. | Prevents the most common failure mode — hand-coding from schema and getting flattened-payload errors. |
| **Edge Applications as a Unit** | Absent. | New Unit 8 *Edge Applications and Customization*. | Closes a real feature surface (Python/Node DA apps) absent in the source TOC. |
| **Failure-mode unit becomes symptom-first** | Categorical (Unit 8 in source). | Symptom Index → FM-XX-YY identifiers → recovery playbooks. | Maps to incident-response workflow; readers arrive in failure mode with a symptom, not a category. |
| **MQTT primer added** | Assumed prerequisite. | §0 *Optional 5-minute MQTT orientation*. | Lowers cognitive load for REST-native audiences. |
| **Reference unit deepened** | 6 chapters. | 10 chapters including Capacity/Limits, Firmware Compatibility, Glossary. | Reference is where readers spend the most time in production; richer indexing matters. |

## 1.3 The Revised TOC

Below is the full revised Table of Contents. Every change versus the source TOC is annotated with a code: **[NEW]** (new content), **[MOVED]** (relocated), **[RENAMED]** (renamed for outcome-predictive scent), **[SPLIT]** (one topic split into multiple), **[KEPT]** (carried over essentially unchanged), **[CUT]** (dropped or absorbed).

### Unit 0 — Orientation (NEW UNIT)

**Purpose.** Land the reader and route them to the right path within five minutes.

- §0.1 Welcome — choose your reading path **[NEW]**
- §0.2 Optional 5-minute MQTT orientation (skip if MQTT-literate) **[NEW]**
- §0.3 How this documentation is organized (Diátaxis explained for the reader) **[NEW]**

### Unit 1 — Foundations (revised)

**Purpose.** Build correct mental models, surface invariants, and disambiguate terminology before the reader does anything.

- §1.1 What the Zebra Handheld RFID IoT Connector is **[RENAMED from 1.1]**
- §1.2 Hardware tiers (RFD40 Standard · RFD40 Premium · RFD40 Premium Plus · RFD90) **[NEW]**
- §1.3 The problem space it solves **[KEPT from 1.2]**
- §1.4 Why handheld RFID requires a different architecture than fixed readers **[KEPT from 1.3]**
- §1.5 System goals, invariants, and constraints **[RENAMED from 1.4]**
- §1.6 Setup Path A (Monolithic Edge Node) vs Setup Path B (Bipartite) **[NEW]**
- §1.7 Reader · Host · Broker · Application roles **[RENAMED from 1.5]**

- §2.1 Physical topology by hardware tier **[REVISED from 2.1]**
- §2.2 Logical topology — the four interfaces (Management · Event · Control · Data) **[REVISED from 2.2]**
- §2.3 Reader → Host → Broker → Application flow (Bipartite) **[SPLIT from 2.3]**
- §2.4 Reader → Wi-Fi → Broker → Application flow (Monolithic) **[NEW; SPLIT from 2.3]**
- §2.5 Control plane vs Observation plane **[KEPT from 2.4]**
- §2.6 Command lifecycle (request → response, correlation by `requestId`) **[KEPT from 2.6]**
- §2.7 Event lifecycle (heartbeat · alerts · mqttConnEVT · firmwareUpdateEVT · fileDownloadEVT) **[KEPT from 2.7]**
- §2.8 Data lifecycle (RF read → filter → metadata → topic) **[RENAMED from 2.5]**

- §3.1 Fixed-reader vs handheld-reader thinking **[KEPT]**
- §3.2 MQTT thinking vs REST thinking **[KEPT]**
- §3.3 Distributed-system thinking vs peripheral-device thinking **[KEPT]**
- §3.4 Native-MQTT thinking vs OpenAPI-schema thinking **[NEW]** (the "OpenAPI Illusion")
- §3.5 Common incorrect mental models (catalogue) **[RENAMED from 3.4]**
- §3.6 Correct operational mental models **[KEPT from 3.5]**

- §4.1 Canonical terminology (ubiquitous language) **[KEPT]**
- §4.2 Bounded contexts (TRANSPORT · CONFIGURATION · RFID · DEVICE · FLEET) **[KEPT]**
- §4.3 TRANSPORT context (broker, topic, QoS, retained messages) **[KEPT]**
- §4.4 RFID context (profiles, sessions, filters, antenna) **[KEPT]**
- §4.5 CONFIGURATION context (endpoint, certificate, persistent state) **[KEPT]**
- §4.6 DEVICE and FLEET contexts **[KEPT]**
- §4.7 Endpoint disambiguation (broker bridge vs API operation) **[NEW]**
- §4.8 Semantic consistency rules **[KEPT]**
- §4.9 From mental model to first command — a reading map **[NEW]**

### Unit 2 — Getting Started (revised)

**Purpose.** First success on the actual hardware path the reader owns.

**Tutorials**

- §5.1 Tutorial — First-time setup for Monolithic sleds (RFD40 Premium · Premium Plus · RFD90) **[REVISED — tier-specific]**
- §5.2 Tutorial — First-time setup for Bipartite sleds (RFD40 Standard) **[NEW — tier-specific]**
- §6.1 Tutorial — Your first MQTT command (`get_version` round-trip) **[NEW]**
- §6.2 Tutorial — Your first tag read (Hybrid MDM endpoint) **[REVISED from 6.x]**
- §6.3 Tutorial — Your first secure deployment (TLS, certificates, validation) **[REVISED from 7.x]**

**How-To Guides**

- §7.1 How to discover and connect a reader in 123RFID Desktop **[KEPT from 8.1]**
- §7.2 How to verify MQTT connectivity using MQTTX **[REVISED from 8.2]**
- §7.3 How to validate endpoint configuration **[KEPT from 8.3]**
- §7.4 How to confirm tag data flow on the data topic **[REVISED from 8.4]**
- §7.5 How to recover from initial-setup failures **[KEPT from 8.5]**

### Unit 3 — Connectivity and Infrastructure (revised)

**Purpose.** Operate the transport and broker integration.

**Explanation**

- §8.1 MQTT publish/subscribe semantics in the IOTC context **[KEPT]**
- §8.2 Topic hierarchy — the `<tenantId>/<userTopic>/<serialNumber>` model **[REVISED]**
- §8.3 QoS behavior (0/1/2) — what the sled guarantees and what it does not **[KEPT]**
- §8.4 Session persistence (clean session vs persistent) **[KEPT]**
- §8.5 Reconnect semantics (`reconnectDelayMin` and `reconnectDelayMax`) **[KEPT]**
- §8.6 Delivery guarantees and limitations (retention buffer 150k events) **[REVISED]**

- §9.1 The four interface roles (Management · Event · Control · Data) **[REVISED from 10.1]**
- §9.2 The MDM hybrid endpoint — your bootstrap default **[NEW]**
- §9.3 Splitting hybrid into CTRL and DATA — when and why **[NEW]**
- §9.4 Endpoint dependency rules **[KEPT from 10.5]**
- §9.5 Topic routing semantics **[KEPT from 10.6]**
- §9.6 The hidden `RF90_DATA_BROKER` slot — what it is and how to free it **[NEW]**
- §9.7 Native MQTT payloads vs OpenAPI-rendered schemas **[NEW]**

**How-To Guides**

- §10.1 How to configure an MQTT broker connection **[KEPT from 11.1]**
- §10.2 How to configure endpoint mappings (Hybrid · CTRL · DATA) **[REVISED from 11.2]**
- §10.3 How to configure reconnection policies **[KEPT from 11.3]**
- §10.4 How to validate topic routing **[KEPT from 11.4]**
- §11.1 How to integrate with AWS IoT Core **[KEPT from 12.1]**
- §11.2 How to integrate with Azure IoT Hub **[NEW]**
- §11.3 How to implement high availability across brokers **[KEPT from 12.2]**
- §11.4 How to support multi-broker (split CTRL and DATA across brokers) **[KEPT from 12.3]**
- §11.5 How to build event pipelines **[KEPT from 12.4]**

### Unit 4 — RFID Operations (revised)

**Purpose.** Operate and optimize RFID reads.

**Explanation**

- §12.1 Operating mode — what it is and what it controls **[REVISED from 13.1]**
- §12.2 The seven profiles (FAST_READ · CYCLE_COUNT · DENSE_READERS · OPTIMAL_BATTERY · BALANCED_PERFORMANCE · READER_DEFINED · ADVANCED) **[NEW — explicit enumeration]**
- §12.3 EPC Gen2 sessions, link profiles, and tag population estimates **[REVISED from 13.2]**
- §12.4 Read rate vs battery vs interference — the canonical tradeoff **[REVISED from 13.4]**
- §12.5 Handheld operational constraints (single antenna, battery, region) **[KEPT from 13.5]**
- §12.6 Tag observation lifecycle (singulation → query → metadata → report) **[REVISED from 14.1]**
- §12.7 Metadata enrichment (RSSI · PHASE · SEEN_COUNT · ANTENNA · CHANNEL · PC · XPC · CRC · EPC · TID · USER · MAC · HOSTNAME) **[REVISED from 14.2]**
- §12.8 Pre-filtering (Select) vs Post-filtering (Report) **[REVISED from 14.3, 14.4]**
- §12.9 Reliable stream design (retention, batching, QoS choice) **[REVISED from 14.5]**

**How-To Guides**

- §13.1 How to start and stop a read session **[KEPT from 15.1]**
- §13.2 How to choose the correct operating-mode profile (decision matrix) **[REVISED from 15.5]**
- §13.3 How to configure access operations (read/write tag memory) **[REVISED]**
- §13.4 How to configure pre-filters (Select) **[NEW]**
- §13.5 How to configure post-filters (Report) — ADD, MODIFY, DELETE **[REVISED]**
- §13.6 Physical trigger button semantics **[NEW]**
- §13.7 Software start/stop trigger conditions **[NEW]**
- §13.8 How to tune for read rate vs battery vs density (worked scenarios) **[KEPT from 15.2/15.3/15.4]**
- §13.9 Barcode scanning (current scope and future roadmap) **[NEW — RFD40 Premium]**

### Unit 5 — Events, State, and Observability (revised)

**Purpose.** Understand runtime behavior, lifecycle transitions, and operational visibility.

**Explanation**

- §14.1 Event taxonomy (management events, alerts, data events, LWT) **[KEPT from 16.1]**
- §14.2 Management events — heartbeats, network, firmware update, file download **[REVISED from 16.2]**
- §14.3 Data events — `dataEVT` shape and metadata controls **[REVISED from 16.3]**
- §14.4 Heartbeats and alerts — configuration and consumption **[KEPT from 16.4]**
- §14.5 Event reliability considerations **[KEPT from 16.5]**

- §15.1 Reader lifecycle (boot → bootstrap → connected → idle/active → reboot) **[REVISED from 17.1]**
- §15.2 MQTT connection lifecycle (disconnected → CONNACK → CONNECTED → disconnect → LWT) **[REVISED from 17.2]**
- §15.3 RFID operation lifecycle (IDLE → READY → ACTIVE → IDLE) **[REVISED from 17.3]**
- §15.4 Configuration lifecycle (factory → saved → runtime) **[REVISED from 17.4]**
- §15.5 Firmware lifecycle (download → verify → apply → reboot) **[KEPT from 17.5]**
- §15.6 State drift and reconciliation **[KEPT from 17.6]**

**How-To Guides**

- §16.1 How to monitor reader health via heartbeats **[KEPT from 18.1]**
- §16.2 How to observe operational state via `get_status` **[KEPT from 18.2]**
- §16.3 How to trace event flows by `requestId` and serial number **[KEPT from 18.3]**
- §16.4 How to detect configuration drift **[KEPT from 18.4]**

### Unit 6 — Security and Configuration (revised)

**Purpose.** Manage trust, identity, persistence, and operational consistency.

**Explanation**

- §17.1 Authentication models (username/password, certificate-based, none) **[KEPT from 19.1]**
- §17.2 TLS trust architecture (verificationType options) **[KEPT from 19.2]**
- §17.3 Credential and certificate lifecycle **[KEPT from 19.3]**
- §17.4 Tenant isolation via `tenantId` **[KEPT from 19.4]**
- §17.5 Security failure modes **[KEPT from 19.5]**

- §18.1 Three configuration scopes: factory · saved · runtime **[NEW]**
- §18.2 Configuration drift **[KEPT from 20.2]**
- §18.3 Reconciliation strategies **[KEPT from 20.3]**
- §18.4 Bootstrap constraints (region must be set via 123RFID Desktop) **[KEPT from 20.4, elevated]**
- §18.5 Reboot-required vs runtime-applied operations **[NEW]**

**How-To Guides**

- §19.1 How to configure TLS for an endpoint **[KEPT from 21.1]**
- §19.2 How to install and rotate certificates **[KEPT from 21.2]**
- §19.3 How to manage persistent configuration **[KEPT from 21.3]**
- §19.4 How to recover from configuration drift **[KEPT from 21.4]**
- §19.5 How to set the region (out-of-band via 123RFID Desktop) **[NEW]**

### Unit 7 — Fleet and Enterprise Operations (revised)

**Purpose.** Scale safely across enterprise fleets.

**Explanation**

- §20.1 Fleet provisioning paths — 123RFID Desktop · SOTI Connect · 42Gears SureMDM **[REVISED from 22.1, 22.2]**
- §20.2 Multi-tenant operation via `tenantId` **[KEPT from 22.3]**
- §20.3 Fleet health management — `heartBeatEVT` aggregation patterns **[KEPT from 22.4]**
- §20.4 Bulk configuration semantics **[KEPT from 22.5]**
- §20.5 Firmware rollout strategies **[KEPT from 22.6]**

- §21.1 High availability architectures **[KEPT from 23.1]**
- §21.2 Failure blast-radius management **[KEPT from 23.2]**
- §21.3 Retry and backoff strategies **[KEPT from 23.3]**
- §21.4 Data retention patterns **[KEPT from 23.4]**
- §21.5 AI and RAG consumption considerations **[KEPT from 23.5]**

**How-To Guides**

- §22.1 How to provision a fleet via SOTI Connect **[NEW]**
- §22.2 How to provision a fleet via 42Gears SureMDM **[NEW]**
- §22.3 How to deploy firmware updates fleet-wide **[KEPT from 24.2]**
- §22.4 How to perform bulk configuration **[KEPT from 24.3]**
- §22.5 How to monitor fleet health **[KEPT from 24.4]**

### Unit 8 — Edge Applications and Customization (NEW UNIT)

**Purpose.** Use the in-firmware Python and Node.js DA application capability for edge analytics.

**Explanation**

- §23.1 Overview of Data Analytics applications on the sled **[NEW]**
- §23.2 Python DA application architecture **[NEW]**
- §23.3 Node.js DA application architecture **[NEW]**
- §23.4 Packaging and deployment model **[NEW]**
- §23.5 Resource constraints and limits **[NEW]**

**How-To Guides**

- §24.1 How to build and package a Python DA app **[NEW]**
- §24.2 How to build and package a Node.js DA app **[NEW]**
- §24.3 How to deploy and update a DA app **[NEW]**
- §24.4 How to monitor a running DA app **[NEW]**

### Unit 9 — Troubleshooting and Recovery (revised, symptom-first)

**Purpose.** Diagnose, isolate, recover, and prevent recurrence.

**Symptom-first**

- §25.1 Symptom Index (alphabetical, reader's words) **[NEW]**
- §25.2 The two physical edges (Reader↔Host or Reader↔Wi-Fi; Host↔Broker) **[NEW]**
- §25.3 Diagnostic mental model — layer by layer **[NEW]**

**Failure Modes** (organized by subsystem, identifier FM-XX-YY)

- §26.1 FM-NET — TRANSPORT failures **[REVISED from 25.3]**
- §26.2 FM-DEV — Reader-Host link failures (Bipartite-specific) **[REVISED from 25.1]**
- §26.3 FM-WIFI — Wi-Fi failures (Monolithic-specific) **[NEW]**
- §26.4 FM-CMD — Command/response failures **[NEW]**
- §26.5 FM-EVT — Event loss patterns **[REVISED from 25.4]**
- §26.6 FM-FW — Firmware failures **[REVISED from 25.5]**
- §26.7 FM-CFG — Configuration failures **[REVISED from 25.6]**
- §26.8 FM-SEC — Security/TLS failures **[NEW]**

**Recovery Playbooks**

- §27.1 RP-01 — Recover lost connectivity **[KEPT from 26.1]**
- §27.2 RP-02 — Recover from configuration drift **[KEPT from 26.2]**
- §27.3 RP-03 — Recover endpoint configuration **[KEPT from 26.3]**
- §27.4 RP-04 — Restore from a failed firmware update **[KEPT from 26.4]**
- §27.5 RP-05 — Free the phantom `RF90_DATA_BROKER` slot **[NEW]**
- §27.6 RP-06 — Implement graceful degradation **[KEPT from 26.5]**

### Unit 10 — Reference (revised, deepened)

**Purpose.** Atomic lookup and machine-consumable detail.

- §28.1 MQTT Topic Reference (hierarchy, naming, QoS mappings) **[KEPT from 27]**
- §29 Endpoint Reference — epTypes (MGMT · MGMT_EVT · CTRL · DATA1 · DATA2 · MDM · SOTI), capability matrix, dependency matrix **[REVISED from 28]**
- §30 Event Reference — `heartBeatEVT`, `alertsEVT`, `mqttConnEVT`, `firmwareUpdateEVT`, `fileDownloadEVT`, `dataEVT` (with HH:MM:SS caveat on `mqttConnEVT.timestamp`) **[REVISED from 29]**
- §31 Operation Reference — alphabetical atomic cards (one per command in `tag_config.json`) **[REVISED from 30]**
- §32 Payload and Schema Reference — `currentConfig`, `operatingMode`, `postFilter`, `endpoint`, `wifi`, `eventConfiguration` **[REVISED from 30]**
- §33 Error and Status Reference — all error codes from `error_codes.json` **[REVISED from 31]**
- §34 Configuration Parameter Reference — RFID · Security · Wi-Fi · Fleet **[REVISED from 32]**
- §35 Capacity and Limits Reference — endpoints (10), data pipes (2), pre-filters (4 of 32), retention (150k events), TPS (500) **[NEW]**
- §36 Glossary **[NEW]**
- §37 Firmware Compatibility Matrix (which feature requires which firmware version) **[NEW]**

---

## 1.4 Removed / Absorbed from Source TOC

| Source TOC item | Action | Where it lives now |
|---|---|---|
| §17.1 "Reader lifecycle" (vague) | Absorbed | §15.1 with explicit state-machine framing |
| §22.2 "MDM and SOTI integration" (sub-bullet) | Promoted | §20.1 as full chapter |
| §13.3 "Trigger based operation" (single topic) | Split | §13.6 + §13.7 |
| Single Endpoint Architecture chapter | Split | §9.1 (roles) + §9.2 (Hybrid) + §9.3 (Split) + §9.6 (phantom slot) |
| Single Reader Lifecycle chapter | Split | §15.1 (Reader lifecycle as such) + §15.2 (MQTT) + §15.3 (RFID op) + §15.4 (Config) + §15.5 (Firmware) |

Nothing was outright dropped; every source topic is preserved, repositioned, renamed, or expanded.

---

# PART 2 — Diátaxis Quadrant Assignment

The Diátaxis framework (https://diataxis.fr/) defines four orthogonal content types:

| Quadrant | Reader question | Authoring stance |
|---|---|---|
| **📘 Explanation** | "Why does this work the way it does?" | Discursive, conceptual, allows nuance |
| **📗 Tutorial** | "Teach me by doing." | Sequential, narrative, confidence-building |
| **📙 How-to Guide** | "I have a goal — show me the steps." | Imperative, decision-led, terse |
| **📕 Reference** | "What is the exact contract?" | Structured, exhaustive, look-up-shaped |

A topic may belong to multiple quadrants when its content has dual purpose; the *primary* quadrant determines the page's dominant voice. Below, every revised-TOC topic is mapped to its primary quadrant (and, where dual-purpose is unavoidable, a secondary).

## 2.1 Quadrant Assignment Table

| Topic | Primary | Secondary | Rationale |
|---|---|---|---|
| §0.1 Welcome — choose your reading path | 📘 Explanation | — | Orientation prose; no procedure |
| §0.2 Optional 5-min MQTT orientation | 📘 Explanation | — | Concept-only |
| §0.3 How this documentation is organized | 📘 Explanation | — | Meta-orientation |
| §1.1 What the IOTC is | 📘 Explanation | — | Concept |
| §1.2 Hardware tiers | 📘 Explanation | 📕 Reference | Concept + spec tables |
| §1.3 Problem space | 📘 Explanation | — | Concept |
| §1.4 Why handheld differs from fixed | 📘 Explanation | — | Concept |
| §1.5 Goals, invariants, constraints | 📘 Explanation | — | First-principles concept |
| §1.6 Setup Path A vs B | 📘 Explanation | — | Architectural concept |
| §1.7 Reader/Host/Broker/Application roles | 📘 Explanation | — | Concept |
| §2.1 Physical topology by tier | 📘 Explanation | — | Concept + diagram |
| §2.2 Logical topology — four interfaces | 📘 Explanation | — | Concept |
| §2.3 Bipartite flow | 📘 Explanation | — | Concept |
| §2.4 Monolithic flow | 📘 Explanation | — | Concept |
| §2.5 Control plane vs Observation plane | 📘 Explanation | — | Concept |
| §2.6 Command lifecycle | 📘 Explanation | — | System behavior |
| §2.7 Event lifecycle | 📘 Explanation | — | System behavior |
| §2.8 Data lifecycle | 📘 Explanation | — | System behavior |
| §3.1 Fixed vs handheld thinking | 📘 Explanation | — | Mental model |
| §3.2 MQTT vs REST thinking | 📘 Explanation | — | Mental model |
| §3.3 Distributed vs peripheral thinking | 📘 Explanation | — | Mental model |
| §3.4 Native MQTT vs OpenAPI thinking | 📘 Explanation | — | Mental model |
| §3.5 Common incorrect models | 📘 Explanation | — | Mental model |
| §3.6 Correct operational models | 📘 Explanation | — | Mental model |
| §4.1 Canonical terminology | 📕 Reference | 📘 Explanation | Glossary-shaped |
| §4.2 Bounded contexts | 📘 Explanation | — | Architecture |
| §4.3 TRANSPORT context | 📘 Explanation | — | Context definition |
| §4.4 RFID context | 📘 Explanation | — | Context definition |
| §4.5 CONFIGURATION context | 📘 Explanation | — | Context definition |
| §4.6 DEVICE and FLEET contexts | 📘 Explanation | — | Context definition |
| §4.7 Endpoint disambiguation | 📘 Explanation | 📕 Reference | Term resolution |
| §4.8 Semantic consistency rules | 📘 Explanation | — | Authoring discipline |
| §4.9 From mental model to first command | 📘 Explanation | — | Reading map |
| §5.1 First-time setup (Monolithic) | 📗 Tutorial | — | Sequential narrative |
| §5.2 First-time setup (Bipartite) | 📗 Tutorial | — | Sequential narrative |
| §6.1 Your first MQTT command | 📗 Tutorial | — | Sequential narrative |
| §6.2 Your first tag read | 📗 Tutorial | — | Sequential narrative |
| §6.3 Your first secure deployment | 📗 Tutorial | — | Sequential narrative |
| §7.1 Discover and connect in 123RFID Desktop | 📙 How-to | — | Goal-driven steps |
| §7.2 Verify MQTT connectivity using MQTTX | 📙 How-to | — | Goal-driven steps |
| §7.3 Validate endpoint configuration | 📙 How-to | — | Goal-driven steps |
| §7.4 Confirm tag data flow | 📙 How-to | — | Goal-driven steps |
| §7.5 Recover from initial-setup failures | 📙 How-to | — | Goal-driven steps |
| §8.1 MQTT pub/sub semantics in IOTC | 📘 Explanation | — | Concept |
| §8.2 Topic hierarchy model | 📘 Explanation | 📕 Reference | Concept + structure |
| §8.3 QoS behavior in IOTC | 📘 Explanation | — | System behavior |
| §8.4 Session persistence | 📘 Explanation | — | System behavior |
| §8.5 Reconnect semantics | 📘 Explanation | — | System behavior |
| §8.6 Delivery guarantees | 📘 Explanation | — | System behavior |
| §9.1 Four interface roles | 📘 Explanation | — | Architecture |
| §9.2 MDM hybrid endpoint | 📘 Explanation | — | Architecture |
| §9.3 Splitting hybrid into CTRL + DATA | 📘 Explanation | — | Architecture |
| §9.4 Endpoint dependency rules | 📘 Explanation | — | Architecture |
| §9.5 Topic routing semantics | 📘 Explanation | — | System behavior |
| §9.6 The phantom `RF90_DATA_BROKER` slot | 📘 Explanation | 🩺 Failure Mode | Architecture + gotcha |
| §9.7 Native MQTT vs OpenAPI payloads | 📘 Explanation | — | Critical disambiguation |
| §10.1 Configure an MQTT broker connection | 📙 How-to | — | Procedure |
| §10.2 Configure endpoint mappings | 📙 How-to | — | Procedure |
| §10.3 Configure reconnection policies | 📙 How-to | — | Procedure |
| §10.4 Validate topic routing | 📙 How-to | — | Procedure |
| §11.1 Integrate with AWS IoT Core | 📙 How-to | — | Procedure |
| §11.2 Integrate with Azure IoT Hub | 📙 How-to | — | Procedure |
| §11.3 Implement HA across brokers | 📙 How-to | — | Procedure |
| §11.4 Multi-broker split | 📙 How-to | — | Procedure |
| §11.5 Build event pipelines | 📙 How-to | — | Procedure |
| §12.1 Operating mode — what it controls | 📘 Explanation | — | Concept |
| §12.2 The seven profiles | 📘 Explanation | 📕 Reference | Concept + table |
| §12.3 EPC Gen2 sessions, link profiles, populations | 📘 Explanation | — | Domain concept |
| §12.4 Read rate vs battery vs interference | 📘 Explanation | — | Tradeoff concept |
| §12.5 Handheld operational constraints | 📘 Explanation | — | Concept |
| §12.6 Tag observation lifecycle | 📘 Explanation | — | System behavior |
| §12.7 Metadata enrichment | 📘 Explanation | 📕 Reference | Concept + enum table |
| §12.8 Pre-filter (Select) vs Post-filter (Report) | 📘 Explanation | — | Concept |
| §12.9 Reliable stream design | 📘 Explanation | — | Concept |
| §13.1 Start/stop a read session | 📙 How-to | — | Procedure |
| §13.2 Choose the correct profile | 📙 How-to | 📊 Decision | Decision matrix |
| §13.3 Configure access operations | 📙 How-to | — | Procedure |
| §13.4 Configure pre-filters | 📙 How-to | — | Procedure |
| §13.5 Configure post-filters | 📙 How-to | — | Procedure |
| §13.6 Physical trigger semantics | 📘 Explanation | — | Concept (hardware) |
| §13.7 Software start/stop trigger conditions | 📙 How-to | 📕 Reference | Procedure + enum |
| §13.8 Tune for read rate/battery/density | 📙 How-to | — | Procedure |
| §13.9 Barcode scanning (current scope, roadmap) | 📘 Explanation | — | Concept + scope statement |
| §14.1 Event taxonomy | 📘 Explanation | — | Concept |
| §14.2 Management events | 📘 Explanation | — | Concept |
| §14.3 Data events (`dataEVT`) | 📘 Explanation | — | Concept |
| §14.4 Heartbeats and alerts | 📘 Explanation | — | Concept |
| §14.5 Event reliability considerations | 📘 Explanation | — | Concept |
| §15.1 Reader lifecycle | 📘 Explanation | — | System behavior |
| §15.2 MQTT connection lifecycle | 📘 Explanation | — | System behavior |
| §15.3 RFID operation lifecycle | 📘 Explanation | — | System behavior |
| §15.4 Configuration lifecycle | 📘 Explanation | — | System behavior |
| §15.5 Firmware lifecycle | 📘 Explanation | — | System behavior |
| §15.6 State drift and reconciliation | 📘 Explanation | — | Concept |
| §16.1 Monitor reader health via heartbeats | 📙 How-to | — | Procedure |
| §16.2 Observe operational state via `get_status` | 📙 How-to | — | Procedure |
| §16.3 Trace event flows | 📙 How-to | — | Procedure |
| §16.4 Detect configuration drift | 📙 How-to | — | Procedure |
| §17.1 Authentication models | 📘 Explanation | — | Concept |
| §17.2 TLS trust architecture | 📘 Explanation | — | Concept |
| §17.3 Credential and certificate lifecycle | 📘 Explanation | — | Concept |
| §17.4 Tenant isolation | 📘 Explanation | — | Concept |
| §17.5 Security failure modes | 📘 Explanation | — | Concept |
| §18.1 Three configuration scopes | 📘 Explanation | — | Concept |
| §18.2 Configuration drift | 📘 Explanation | — | Concept |
| §18.3 Reconciliation strategies | 📘 Explanation | — | Concept |
| §18.4 Bootstrap constraints | 📘 Explanation | — | Concept |
| §18.5 Reboot-required vs runtime-applied | 📘 Explanation | 📕 Reference | Concept + table |
| §19.1 Configure TLS for an endpoint | 📙 How-to | — | Procedure |
| §19.2 Install and rotate certificates | 📙 How-to | — | Procedure |
| §19.3 Manage persistent configuration | 📙 How-to | — | Procedure |
| §19.4 Recover from configuration drift | 📙 How-to | — | Procedure |
| §19.5 Set the region (out-of-band) | 📙 How-to | — | Procedure |
| §20.1 Fleet provisioning paths | 📘 Explanation | 📊 Decision | Concept + comparison |
| §20.2 Multi-tenant operation | 📘 Explanation | — | Concept |
| §20.3 Fleet health management | 📘 Explanation | — | Concept |
| §20.4 Bulk configuration semantics | 📘 Explanation | — | Concept |
| §20.5 Firmware rollout strategies | 📘 Explanation | — | Concept |
| §21.1 HA architectures | 📘 Explanation | — | Concept |
| §21.2 Failure blast-radius management | 📘 Explanation | — | Concept |
| §21.3 Retry and backoff | 📘 Explanation | — | Concept |
| §21.4 Data retention patterns | 📘 Explanation | — | Concept |
| §21.5 AI and RAG consumption | 📘 Explanation | — | Concept |
| §22.1 Provision via SOTI Connect | 📙 How-to | — | Procedure |
| §22.2 Provision via 42Gears SureMDM | 📙 How-to | — | Procedure |
| §22.3 Deploy firmware fleet-wide | 📙 How-to | — | Procedure |
| §22.4 Bulk configuration | 📙 How-to | — | Procedure |
| §22.5 Monitor fleet health | 📙 How-to | — | Procedure |
| §23.1 DA app overview | 📘 Explanation | — | Concept |
| §23.2 Python DA architecture | 📘 Explanation | — | Concept |
| §23.3 Node.js DA architecture | 📘 Explanation | — | Concept |
| §23.4 Packaging and deployment | 📘 Explanation | — | Concept |
| §23.5 Resource constraints | 📘 Explanation | 📕 Reference | Concept + limits table |
| §24.1 Build and package Python DA | 📙 How-to | — | Procedure |
| §24.2 Build and package Node.js DA | 📙 How-to | — | Procedure |
| §24.3 Deploy and update DA | 📙 How-to | — | Procedure |
| §24.4 Monitor running DA | 📙 How-to | — | Procedure |
| §25.1 Symptom Index | 📕 Reference | — | Look-up table |
| §25.2 The two edges | 📘 Explanation | — | Concept |
| §25.3 Diagnostic mental model | 📘 Explanation | — | Concept |
| §26.x Failure Modes (FM-XX-YY) | 🩺 Failure Mode | — | Symptom-first |
| §27.x Recovery Playbooks (RP-XX) | 📙 How-to | — | Procedure |
| §28+ Reference | 📕 Reference | — | Look-up |

> **Diátaxis stance for Unit 0 (Orientation).** Orientation pages are Explanation in voice but Tutorial in intent (lead the reader). They are kept as Explanation with imperative tone restrained to clear next-step links at the foot of each page.

---


# PART 3 — Per-Topic Outline and Drafted Content

> **Authoring legend.**
> Each topic block contains: (i) a one-sentence purpose, (ii) the assigned Diátaxis quadrant(s), (iii) a 4–7-bullet outline (the skeleton the page commits to), (iv) the drafted content. Drafts are evidence-anchored to the knowledge folder and the hardware-tier brief.

---

## Unit 0 — Orientation

### §0.1 Welcome — choose your reading path

- **Purpose.** Land the reader and route them to the right entry point in under sixty seconds.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - One paragraph: what these docs cover.
  - The hardware-tier fork (Monolithic vs Bipartite) named once.
  - Four reading paths by persona (new integrator, solution builder, fleet operator, API consumer).
  - Pointer to §0.2 (MQTT primer) and §0.3 (doc structure).
- **Drafted content.**

  Welcome. These docs cover the **Zebra IoT Connector (IOTC)** as it runs on Zebra's handheld RFID reader sleds: **RFD40 Standard**, **RFD40 Premium**, **RFD40 Premium Plus**, **RFD90**, and **RFD9030**. The IOTC is an in-firmware MQTT control and data plane that turns the sled into a network-addressable RFID node. Everything you can do — read tags, configure radios, monitor health, push firmware, fan tag data into the cloud — flows through this connector over MQTT 3.1.1.

  There is one architectural fork you must recognize before reading further. RFD40 Premium, RFD40 Premium Plus, and RFD90 carry **Wi-Fi 6** silicon and run the IOTC natively in the sled. They connect to the broker themselves — they are **Monolithic Edge Nodes**. RFD40 Standard has no Wi-Fi radio; it pairs over Bluetooth/eConnex™ to a host Zebra mobile computer (e.g., TC52, TC73) and the IOTC daemon runs on that host. This is the **Bipartite** path. The choice between these two paths shapes every chapter that follows.

  Reading paths.

  | If you are a … | Start at | Then read |
  |---|---|---|
  | New integrator on a Premium/RFD90 | §5.1 *First-time setup (Monolithic)* | §6.1 → §6.2 → §6.3 |
  | New integrator on a Standard | §5.2 *First-time setup (Bipartite)* | §6.1 → §6.2 → §6.3 |
  | Solution builder shaping a real integration | §1.5 *Goals, invariants, constraints* | §3 *Mental Models* → §9 *Endpoint Architecture* |
  | Fleet operator | §20 *Fleet provisioning paths* | §22 How-tos |
  | API consumer (look-up only) | §28 *Reference* | §31 *Operation Reference* |

  If MQTT is new to you, take five minutes for §0.2.

---

### §0.2 Optional 5-minute MQTT orientation

- **Purpose.** Give REST-trained readers just enough MQTT to read the rest of the docs.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - MQTT is a publish/subscribe protocol — not request/response.
  - Three actors: publisher, subscriber, broker.
  - Topics are addresses; subscriptions match by pattern.
  - QoS controls delivery effort, not latency.
  - The IOTC borrows request/response semantics on top of pub/sub.
- **Drafted content.**

  Skip this page if you have shipped an MQTT integration before.

  **MQTT in one sentence.** MQTT is a lightweight publish/subscribe messaging protocol carried over long-lived TCP (TLS) connections, in which clients send messages to *topics* on a central *broker* and other clients receive those messages by *subscribing* to matching topics.

  **Three actors.**

  - **Publisher.** Anyone who sends a message to a topic. The reader publishes events, responses, and tag data. Your application publishes commands.
  - **Subscriber.** Anyone who has registered interest in a topic. The reader subscribes to its command topic. Your application subscribes to response, event, and data topics.
  - **Broker.** The intermediary. Holds connections, routes messages, optionally retains them. The broker is third-party (Mosquitto, HiveMQ, EMQX, AWS IoT Core, Azure IoT Hub). Zebra does not ship one.

  **Topics are slash-separated strings, like file paths.** `zebra/MDM/clients/cmnd/RFD40-212735201D0053` is one topic. Subscribers can match exactly or with `+` (one segment) or `#` (rest of tree).

  **QoS — quality of service — is a delivery-effort dial, not a latency dial.**

  | QoS | Promise | Cost |
  |---|---|---|
  | 0 | At most once. Fire and forget. | Cheapest. May lose messages. |
  | 1 | At least once. Acknowledged. | Higher. May duplicate. |
  | 2 | Exactly once. Four-step handshake. | Most expensive. Highest latency. |

  Pick QoS *per topic*. Commands typically run at QoS 0 or 1; tag data may run at QoS 0 for throughput; alerts at QoS 1 for safety. The IOTC lets you set this per endpoint.

  **The IOTC borrows request/response semantics on top of pub/sub.** When your application publishes a command, it includes a `requestId`. The reader echoes that `requestId` in its response on the paired response topic. Your code correlates them. MQTT itself does not know about commands and responses — that pattern lives entirely in the IOTC JSON contract.

  **One subtlety worth knowing now: subscribe before you publish.** If you publish a command before you have subscribed to the response topic, the reader will answer and you will never hear it. Many "command silent" failures trace to this.

  You are ready for §1 onwards.

---

### §0.3 How this documentation is organized

- **Purpose.** Tell the reader what Diátaxis is and where to find each kind of content.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Diátaxis in one paragraph.
  - The four quadrants and what each does.
  - Per-unit map: which quadrant each Unit contains.
  - Permission to skip — readers do not need to read top-to-bottom.
- **Drafted content.**

  These docs follow the **Diátaxis framework** (https://diataxis.fr/). Diátaxis splits technical content into four orthogonal types, each answering a different reader question.

  - **📘 Explanation** answers *why does this work the way it does?* Discursive, conceptual, allowed to take its time.
  - **📗 Tutorial** answers *teach me by doing*. A guided narrative from zero to first success.
  - **📙 How-to Guide** answers *I have a goal — show me the steps*. Imperative and terse.
  - **📕 Reference** answers *what is the exact contract?* Structured, exhaustive, look-up-shaped.

  Each Unit in these docs leads with one of the four. You will see the badge on each page.

  | Unit | Dominant quadrant |
  |---|---|
  | 0 Orientation | 📘 Explanation |
  | 1 Foundations | 📘 Explanation |
  | 2 Getting Started | 📗 Tutorial + 📙 How-to |
  | 3 Connectivity & Infrastructure | 📘 Explanation + 📙 How-to |
  | 4 RFID Operations | 📘 Explanation + 📙 How-to |
  | 5 Events, State, Observability | 📘 Explanation + 📙 How-to |
  | 6 Security & Configuration | 📘 Explanation + 📙 How-to |
  | 7 Fleet & Enterprise Operations | 📘 Explanation + 📙 How-to |
  | 8 Edge Applications & Customization | 📘 Explanation + 📙 How-to |
  | 9 Troubleshooting & Recovery | 🩺 Failure Mode + 📙 How-to |
  | 10 Reference | 📕 Reference |

  Read in order if you are new. Jump in directly if you arrived via search. Every page links the pages it depends on.

---

## Unit 1 — Foundations

### §1.1 What the Zebra Handheld RFID IoT Connector is

- **Purpose.** State, in first principles, what the IOTC is and is not.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - One-sentence first-principles definition.
  - The four interfaces named.
  - "What is and is not in scope" boundary.
  - Connection to MQTT as exclusive transport.
- **Drafted content.**

  The **Zebra IoT Connector (IOTC)** is a remote control and observation plane for Zebra handheld RFID reader sleds, implemented over MQTT 3.1.1, with the reader as the controlled subject and an application as the controlling agent. On RFD40 Premium, RFD40 Premium Plus, and RFD90 sleds it runs natively inside the sled's firmware and connects to a broker over Wi-Fi. On RFD40 Standard it runs on a paired host mobile computer (over Bluetooth/eConnex™) and the host MQTT client bridges to the broker.

  The IOTC exposes **four interfaces**, each with a distinct shape and direction:

  - **Management.** Synchronous request/response for whole-device configuration and firmware management (e.g., `get_config`, `set_config`, `firmware_update`).
  - **Event.** Asynchronous, reader-to-application: heartbeats, alerts, MQTT connection events, firmware-update progress, file-download notifications.
  - **Control.** Synchronous request/response for RFID-specific operations (e.g., `set_operating_mode`, `control_operation start/stop`, `set_post_filter`).
  - **Data.** Asynchronous, reader-to-application: tag-read events (`dataEVT`) carrying EPC, RSSI, and other metadata.

  Each interface terminates at one or more **MQTT endpoints** — the broker-bridge configurations the reader maintains. By default, 123RFID Desktop provisions a single **MDM hybrid endpoint** that carries all four roles on one broker connection. You can later split this into dedicated CTRL and DATA endpoints on the same or different brokers.

  The IOTC is **MQTT only on handhelds.** Unlike the fixed-reader IOTC (FX7500, FX9600, ATR7000), there is no REST surface and no HTTP POST surface on the sleds. If you need REST or HTTP for a handheld workflow, do it on the host or in the cloud — not at the sled.

  The IOTC is **not** a replacement for the Zebra RFID SDK on the host side. If your application drives the sled over Bluetooth using the SDK directly, you are not using the IOTC. The IOTC and the SDK can coexist on the host but they serve different layers.

---

### §1.2 Hardware tiers (RFD40 Standard · RFD40 Premium · RFD40 Premium Plus · RFD90)

- **Purpose.** Make the tier-to-capability mapping the first thing every reader internalizes.
- **Quadrant.** 📘 Explanation + 📕 Reference (table).
- **Outline.**
  - One-paragraph framing of why tier matters.
  - Capability matrix (the table from the source brief, enriched).
  - One paragraph on what each capability unlocks for the IOTC.
- **Drafted content.**

  Hardware tier is the single most consequential architectural choice in IOTC documentation. The presence or absence of integrated Wi-Fi silicon decides whether the IOTC daemon runs *on the sled* or *on a paired host computer*. That fork propagates through bootstrap, security, fleet management, and troubleshooting.

  **Tier capability matrix.**

  | Capability | RFD40 Standard | RFD40 Premium | RFD40 Premium Plus | RFD90 (RFD9030) |
  |---|---|---|---|---|
  | Bluetooth 5.x | Yes | Yes | Yes | Yes (5.3) |
  | Zebra eConnex™ adapter (host snap-on) | Yes | Yes | Yes | Yes |
  | Integrated barcode scanner | No | **Yes** | **Yes** | Optional (RFD9030 variants) |
  | Integrated Wi-Fi 6 radio | **No** | **Yes** | **Yes** | **Yes** |
  | IOTC daemon location | On host device | **On sled (native firmware)** | **On sled (native firmware)** | **On sled (native firmware)** |
  | Default architecture path | Bipartite (Setup Path B) | Monolithic (Setup Path A) | Monolithic (Setup Path A) | Monolithic (Setup Path A) |
  | Standalone (host-free) operation | No | **Yes** | **Yes** | **Yes** |
  | Read range (typical) | 22 ft / 6.7 m | 22 ft / 6.7 m | 22 ft / 6.7 m | 22 ft / 6.7 m (75 ft / 22.9 m extended on RFD9090) |
  | Battery | Standard | Standard | Standard | 7,000 mAh |
  | Ruggedness / IP rating | Industry-standard | Industry-standard | Industry-standard | 6 ft drop to concrete; IP65 / IP67 |

  **What each capability unlocks for the IOTC.**

  - **Integrated Wi-Fi 6** is what makes a sled a Monolithic Edge Node. With Wi-Fi the sled holds its own MQTT TCP/TLS session to the broker and no longer depends on a paired host for transport. Over-the-air (OTA) device management becomes possible. SOTI Connect and SureMDM can address the sled by serial number across the enterprise network.
  - **Integrated barcode scanner** (Premium, Premium Plus, RFD9030 variants) means the sled can decode 1D/2D symbols natively. As of current firmware, the IOTC's Control interface does **not** yet expose barcode-scan start/stop commands; barcode capability is exercised via the host application or the Scanner SDK (see §13.9).
  - **Bluetooth + eConnex™** is universal. Even Premium/RFD90 sleds can be snapped onto a Zebra mobile computer and operated as a Bluetooth peripheral; in that operating mode they look like a Standard sled to the host. That arrangement is unusual but possible.
  - **Ruggedness** matters for fleet planning, not for IOTC behavior. The IOTC protocol surface is identical across tiers.

  Read §1.6 for the architectural consequences of this matrix.

---

### §1.3 The problem space the IOTC solves

- **Purpose.** Name the operational pains that motivated the IOTC.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Pre-IOTC reality (SDK-only, host-only, fragmented).
  - Three pains the IOTC closes (remote management, standard transport, schema-driven data).
  - Where the IOTC ends (it is not a business application).
- **Drafted content.**

  Before the IOTC, every Zebra RFID handheld deployment looked like this. A host application written against the Zebra RFID SDK drove the sled over Bluetooth. Configuration lived in the host application. If you had ten readers, you had ten host applications to update. If a reader went offline, you found out when an operator told you. If you wanted to pipe tag data into the cloud, you wrote and maintained a forwarder on every host.

  The IOTC closes three pains.

  - **Remote management.** A central application — running in the cloud, on-premises, or in an MDM — can configure, start, stop, monitor, and update sleds across an enterprise without touching the host. Configuration is a JSON document; it can be templated and applied at fleet scale.
  - **Standard transport.** MQTT 3.1.1 is web-friendly, firewall-routable, broker-agnostic (Mosquitto, EMQX, HiveMQ, AWS IoT Core, Azure IoT Hub, SOTI Connect, 42Gears all speak it), and supported by a deep multi-language client ecosystem. You no longer write custom forwarders.
  - **Schema-driven data.** Tag reads, status, alerts, and configurations are all JSON payloads with stable schemas. Downstream consumers can be analytics dashboards, MES/WMS systems, or AI agents — anything that can parse JSON.

  The IOTC ends at JSON-over-MQTT. It does not parse your business logic. It does not know what an SKU is. It does not orchestrate workflows. Those live in your application, where they belong.

---

### §1.4 Why handheld RFID requires a different architecture than fixed readers

- **Purpose.** Forestall fixed-reader misconceptions early.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Battery is a first-class constraint.
  - Mobility means intermittent connectivity.
  - Single integrated antenna (no multi-port, no Portal mode).
  - Operator-in-the-loop (physical trigger).
  - No GPIO.
  - Regional/region-set constraint via 123RFID Desktop.
- **Drafted content.**

  Fixed readers (FX7500, FX9600, ATR7000) and handheld sleds (RFD40, RFD90) share a brand and an MQTT-shaped IOTC interface. They do not share an architecture. Six differences matter.

  - **Battery is a first-class constraint.** A fixed reader runs on AC power; a handheld runs on a battery measured in milliamp-hours. Operating-mode selection is a power-consumption decision. The `OPTIMAL_BATTERY` profile exists for handhelds and not for fixed readers. Heartbeat interval and event verbosity meaningfully drain or extend a shift.
  - **Mobility means intermittent connectivity.** A fixed reader sees the broker either always or never. A handheld walks behind cold-storage doors, around concrete pillars, past dead zones. The IOTC's 150,000-event retention buffer (with a 500-events-per-second flush rate) is designed for this reality. Your downstream pipeline must tolerate bursty, out-of-order, sometimes-delayed events.
  - **Single integrated antenna.** Handhelds have one antenna; fixed readers have up to eight ports. There is no antenna-port concept on handhelds. **Portal mode**, which on fixed readers binds antenna ports to GPI triggers, does not exist for handhelds.
  - **Operator-in-the-loop.** The physical trigger button on the sled is itself a start/stop control. On fixed readers, GPI events drive start/stop; on handhelds, the operator does. This changes how `radioStartConditions` are designed and how tag-read sessions begin and end.
  - **No GPIO.** Handhelds have no general-purpose I/O pins. None of the GPI/GPO-driven Operating Modes on fixed readers transfer.
  - **Region-set is out of band.** A handheld's regional regulatory configuration (FCC, ETSI, IC, etc.) is set during initial provisioning via **123RFID Desktop** over USB. There is no MQTT command to change region. A reader in the wrong region will refuse to transmit. Treat region as a one-time setup gate.

  Whenever you find yourself reasoning by analogy from fixed-reader experience, check these six. Most fixed-vs-handheld mistakes trace to one of them.

---

### §1.5 System goals, invariants, and constraints

- **Purpose.** State the laws that govern the IOTC system at all times.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Three invariants (Reader authority; MQTT exclusivity on handhelds; Control/Data separability).
  - Hard constraints table (region, FAST_READ, max endpoints, max data pipes, retention buffer, etc.).
  - One paragraph: how to reason from these.
- **Drafted content.**

  **Three invariants** hold at all times. Documentation pages that contradict an invariant are defective.

  - **Invariant 1 — The reader is authoritative.** The reader sled holds the canonical operational state — current operating mode, active filters, region, endpoint configuration. The application's view is always derivative. On reconnect or after a reboot, the application must reconcile by calling `get_config` and `get_operating_mode`.
  - **Invariant 2 — All communication is MQTT (on handhelds).** No REST, no WebSocket, no HTTP. Every command, every event, every configuration crosses the broker. The broker is a hard dependency.
  - **Invariant 3 — Control and Data are separable but coupled.** The CTRL plane (start/stop, modes, filters) and the DATA plane (tag events) can be hosted on distinct endpoints, distinct topics, even distinct brokers. They can be configured independently. But DATA is meaningless without CTRL: `dataEVT` flows only after a `control_operation start` is issued on the CTRL plane.

  **Hard constraints** the system imposes.

  | Constraint | Practical effect | Surface in docs |
  |---|---|---|
  | Region must be set via 123RFID Desktop over USB | Reader cannot transmit before region is set. There is no `set_region` MQTT command. | §5.1, §5.2, §19.5 |
  | Sled connects to broker only via host (Bipartite) or via Wi-Fi (Monolithic) | Network topology is fixed by hardware tier | §1.6, §2.3, §2.4 |
  | Battery is finite | Operating mode is a power decision; heartbeat verbosity has cost | §13.2 |
  | Single integrated antenna | No multi-antenna patterns, no Portal mode | §12.5, §18.1 |
  | `FAST_READ` profile does not emit tag data events | The schema lists it; the runtime does not stream `dataEVT` in FAST_READ | §12.2 (note) |
  | Maximum 10 saved endpoints per sled | Fleet design must respect this | §35 |
  | Maximum 2 active data pipes per sled (only DATA_EP1 currently enabled) | Plan for one DATA endpoint until DATA_EP2 ships | §35 |
  | Phantom `RF90_DATA_BROKER` factory slot | Must be deleted before adding a custom DATA endpoint | §9.6, §27.5 |
  | Retention buffer: 150,000 tag events, 500 TPS flush | Downstream pipeline must tolerate bursts | §21.4 |
  | Maximum 4 pre-filters currently (design allows 32) | Combine filter logic; do not exceed 4 | §13.4 |
  | `mqttConnEVT.timestamp` is `HH:MM:SS` (not ISO-8601) | Special-case time correlation for this one event | §30 |
  | Native MQTT payloads are flattened — not the nested OpenAPI `params`/`ctrlOprPayload` shape | Hand-code from validated examples, not from schema alone | §3.4, §9.7 |

  How to reason from these. Whenever you design an integration, walk down the constraint table once and confirm none of your assumptions cross an invariant. Most operational surprises are constraint violations the integrator did not see.

---

### §1.6 Setup Path A (Monolithic Edge Node) vs Setup Path B (Bipartite)

- **Purpose.** Make explicit, in one page, the two architectural setup paths.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Definition of each path.
  - When you are on which.
  - One side-by-side diagram (text).
  - Implication for every subsequent topic.
- **Drafted content.**

  Every handheld IOTC deployment travels one of two paths. The path is determined by the hardware tier you bought.

  **Setup Path A — Monolithic Edge Node.**
  Applies to **RFD40 Premium**, **RFD40 Premium Plus**, **RFD90**, and **RFD9030**. These sleds have an integrated Wi-Fi 6 radio. The IOTC daemon runs natively inside the sled's firmware. The sled connects to your enterprise Wi-Fi, opens an MQTT TCP/TLS session directly to the broker, and operates standalone. The sled *is* the network node. 123RFID Desktop is used **once**, at the workbench, over USB, to push Wi-Fi credentials and the MDM endpoint configuration. After that the USB cable comes out and the sled operates over Wi-Fi.

  **Setup Path B — Bipartite.**
  Applies to **RFD40 Standard** and legacy sleds (e.g., RFD8500). These have no Wi-Fi silicon. They pair via Bluetooth or eConnex™ to a Zebra mobile computer (e.g., TC52, TC53, TC73). The MQTT client and the IOTC daemon run on the **host** computer. The sled passes RFID payloads to the host over Bluetooth; the host serializes them to MQTT JSON and publishes to the broker. Configuration of the IOTC happens on the host, typically via an MDM (SOTI Connect, SureMDM) that manages the host. The sled and the host together form the network node.

  **Topology comparison (text diagram).**

  ```
  Setup Path A (Monolithic, Premium/RFD90):

  ┌─────────────────────────┐         ┌─────────┐         ┌──────────────┐
  │  Sled (IOTC daemon      │  Wi-Fi  │  MQTT   │   MQTT  │  Application │
  │  + Radio + Wi-Fi 6)     │ ──────→ │ Broker  │ ──────→ │              │
  └─────────────────────────┘         └─────────┘         └──────────────┘

  Setup Path B (Bipartite, RFD40 Standard):

  ┌──────────────┐    BT/    ┌──────────────────┐  Wi-Fi/  ┌─────────┐         ┌──────────────┐
  │  Sled        │  eConnex  │  Host Computer   │  Cellular│  MQTT   │   MQTT  │  Application │
  │  (Radio)     │ ───────→  │  (IOTC daemon +  │ ────────→│ Broker  │ ──────→ │              │
  └──────────────┘           │  MQTT client)    │          └─────────┘         └──────────────┘
                             └──────────────────┘
  ```

  **Implications, by topic area.**

  | Topic area | Setup Path A (Monolithic) | Setup Path B (Bipartite) |
  |---|---|---|
  | Bootstrap | 123RFID Desktop over USB pushes Wi-Fi + MDM endpoint; cable removed | 123RFID Desktop or MDM tool configures the **host**; sled paired to host over Bluetooth |
  | Network identity | Sled's MAC + IP; sled's serial number is the canonical `{serialNumber}` in MQTT topics | Host's MAC + IP; sled passes its serial via the Bluetooth link |
  | TLS termination | On the sled | On the host |
  | Updating the IOTC | OTA firmware update to the sled | Update host app and/or sled firmware via the host |
  | Failure modes | `mqttConnEVT`, Wi-Fi loss, region misconfiguration | Host-sled Bluetooth disconnect, host-broker MQTT loss, host app crash |
  | Fleet management | SOTI Connect / SureMDM addresses the sled directly | SOTI Connect / SureMDM addresses the host (and indirectly the sled) |

  When a chapter in these docs uses a "Tier" callout, that is the chapter's way of telling you which path it applies to. Always check.

---

### §1.7 Reader · Host · Broker · Application — four roles

- **Purpose.** Name the four roles in the IOTC system and what each is responsible for.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Definitions of Reader, Host, Broker, Application.
  - Path A: Reader, Broker, Application (Host is absent).
  - Path B: Reader, Host, Broker, Application (Host is mandatory).
  - One sentence on identity and authority.
- **Drafted content.**

  The IOTC system has four named roles. Always use these terms; do not invent synonyms.

  - **Reader.** The physical RFD40/RFD90 sled. It is the *controlled subject* — the thing being told to read tags, change profile, report status. Its serial number (e.g., `RFD40-212735201D0053`) is the canonical identity.
  - **Host.** A Zebra mobile computer (TC52, TC53, TC73, etc.) on which the IOTC daemon runs **on Setup Path B (Bipartite) only**. On Setup Path A the host role is empty — the reader is its own host. On Path B the host is mandatory; it runs the MQTT client, holds TLS state, and bridges Bluetooth↔MQTT.
  - **Broker.** The MQTT broker (Mosquitto, EMQX, HiveMQ, AWS IoT Core, Azure IoT Hub, SOTI Connect, SureMDM). Third-party. Zebra does not ship one. Holds connections, routes messages, sometimes retains them.
  - **Application.** The customer-built consumer of the IOTC — the *controlling agent*. Publishes commands. Subscribes to responses, events, and tag data. May run anywhere: in the cloud, on a workstation, on a server.

  **Authority and identity.** The reader is authoritative for its own state. The application's model of the reader is always a derivative. The serial number is the address. The `tenantId` namespaces a population of readers under one broker. The application is identified by its MQTT client ID, which is opaque to the reader.

  On Path A, the message path is **Reader ↔ Broker ↔ Application**. On Path B it is **Reader ↔ Host ↔ Broker ↔ Application**. Every later chapter follows that path.

---

### §2.1 Physical topology by hardware tier

- **Purpose.** Anchor the abstract roles to physical pieces a reader can hold.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Path A diagram (Reader-with-Wi-Fi → Broker).
  - Path B diagram (Reader → Bluetooth → Host → Wi-Fi/Cellular → Broker).
  - Both diagrams labelled with the four roles from §1.7.
  - One paragraph: what fails first when each edge breaks.
- **Drafted content.**

  **Path A — Monolithic Edge Node** (RFD40 Premium · Premium Plus · RFD90).

  ```
   ┌──────────────────────────────┐     Wi-Fi 6     ┌────────────────┐     MQTT      ┌─────────────────┐
   │ Reader sled                  │    (TLS)        │ Enterprise     │   (TLS)       │ MQTT Broker     │
   │ • Radio (UHF Gen2)           │ ──────────────→ │ Wi-Fi          │ ────────────→ │ • Mosquitto     │
   │ • Wi-Fi 6 radio              │                 │ Access Point   │               │ • HiveMQ        │
   │ • IOTC daemon                │                 │                │               │ • AWS IoT Core  │
   │ • TLS stack                  │                 │                │               │ • Azure IoT Hub │
   │ • Battery                    │                 │                │               │ • SOTI Connect  │
   └──────────────────────────────┘                 └────────────────┘               └─────────────────┘
                                                                                              │
                                                                                              ▼
                                                                                     ┌─────────────────┐
                                                                                     │  Application    │
                                                                                     │  (your code)    │
                                                                                     └─────────────────┘
  ```

  **Path B — Bipartite** (RFD40 Standard).

  ```
   ┌────────────────────┐  Bluetooth/  ┌─────────────────────────┐   Wi-Fi/    ┌─────────────────┐
   │ Reader sled        │  eConnex     │ Host mobile computer    │  Cellular   │  MQTT Broker    │
   │ • Radio (UHF Gen2) │ ───────────→ │ • IOTC daemon           │ ──────────→ │                 │
   │ • Bluetooth radio  │              │ • MQTT client           │             │                 │
   │ • Battery          │              │ • TLS stack             │             └─────────────────┘
   └────────────────────┘              │ • Host application      │                      │
                                       └─────────────────────────┘                      ▼
                                                                                ┌─────────────────┐
                                                                                │  Application    │
                                                                                │  (your code)    │
                                                                                └─────────────────┘
  ```

  **What fails first on each edge.** On Path A, a broken Wi-Fi edge shows up as an `mqttConnEVT` with status `DISCONNECTED`, then as a buffer that fills, then as gaps in the data stream. On Path B, a broken Bluetooth edge surfaces as `terminalConnection.status = DISCONNECTED` in `get_status`, and the host's MQTT session goes idle; a broken Wi-Fi edge between host and broker is invisible to the sled but reported by the host's connection logs.

---

### §2.2 Logical topology — the four interfaces

- **Purpose.** Map the four IOTC interfaces (Management, Event, Control, Data) to their direction, sync/async character, and typical topic.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Table: interface → direction → sync/async → example operation.
  - One paragraph: why the split exists.
  - Cross-reference to §9 (endpoint architecture) and §11/§9.1 (interface roles).
- **Drafted content.**

  The IOTC has four logical interfaces. Each is a *role* — not a physical broker or topic. Endpoints (broker bridges) are configured per interface, sometimes one endpoint per interface, sometimes one endpoint carrying multiple interfaces (the hybrid MDM endpoint).

  | Interface | Direction | Sync / Async | Example commands or events |
  |---|---|---|---|
  | **Management** | App → Reader → App | Synchronous (request/response) | `get_status`, `get_version`, `get_config`, `set_config`, `firmware_update`, `config_endpoint` |
  | **Event** | Reader → App | Asynchronous (one-way) | `heartBeatEVT`, `alertsEVT`, `mqttConnEVT`, `firmwareUpdateEVT`, `fileDownloadEVT` |
  | **Control** | App → Reader → App | Synchronous (request/response) | `control_operation start/stop`, `set_operating_mode`, `set_post_filter` |
  | **Data** | Reader → App | Asynchronous (one-way) | `dataEVT` (tag reads) |

  **Why the split exists.** Management is about the device as a whole — its identity, firmware, regional configuration. Control is about what the radio is doing right now — its mode and what tags it should read. Events are unsolicited health and lifecycle signals. Data is the high-throughput tag stream that may dwarf everything else in volume. Splitting them lets you scale, secure, and route each differently. You can park Management on a low-traffic cloud broker, Control on a local broker, and Data on a high-throughput broker designed for fan-out — all on the same sled.

  The four interfaces *can* live on one MDM hybrid endpoint (the bootstrap default). They *can also* be split across multiple endpoints. See §9.2 and §9.3.

---

### §2.3 Reader → Host → Broker → Application flow (Bipartite)

- **Purpose.** Walk through the message path on Setup Path B.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Command path (App publishes → Broker routes → Host receives → BT/eConnex pushes to Reader → Reader executes).
  - Response path (Reader → BT/eConnex → Host → MQTT publish → Broker → App subscribed).
  - Where requestId is generated, used, echoed.
  - Where failures show up.
- **Drafted content.**

  On Setup Path B, every command and response makes two hops on each leg: a Bluetooth/eConnex hop between sled and host, and an MQTT hop between host and broker. The host runs the IOTC daemon and is responsible for translation in both directions.

  **Command path.**

  1. Application generates a `requestId` (e.g., `cmd_001`) and publishes a JSON command (e.g., `{"command":"get_version","requestId":"cmd_001"}`) to the configured command topic on the broker.
  2. Broker routes the publish to all subscribers — including the host's IOTC daemon.
  3. Host's IOTC daemon receives the command, looks up the target sled by topic suffix (`{serialNumber}`), and forwards the command over the Bluetooth/eConnex link to the sled's radio control firmware.
  4. Sled executes the command on its radio.

  **Response path.**

  5. Sled returns the result (firmware version, in this example) over the Bluetooth/eConnex link.
  6. Host's IOTC daemon assembles a response JSON, echoing the original `requestId` and including the data, and publishes it to the configured response topic.
  7. Broker routes the response to all subscribers — including the application.
  8. Application correlates the response by `requestId` and processes the result.

  **Where failures show up.**

  - **Step 1 fails silently** if the application has not yet subscribed to the response topic. The broker still routes the response in step 7; the application simply never sees it.
  - **Steps 2 and 7 (broker hops) fail** if the broker is down, TLS misconfigured, or the host's MQTT credentials wrong. Look at the host's `mqttConnEVT`.
  - **Step 3 fails** if the host is not running the IOTC daemon, or the daemon is not subscribed to the command topic, or the host is offline. The application sees command silence.
  - **Steps 3 and 5 (Bluetooth hops) fail** if the sled has roamed out of Bluetooth range or the pairing has lapsed. Look at the host's `terminalConnection.status`.

---

### §2.4 Reader → Wi-Fi → Broker → Application flow (Monolithic)

- **Purpose.** Walk through the message path on Setup Path A.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Command path (App → Broker → Sled → execute).
  - Response path (Sled → Broker → App).
  - Where TLS and Wi-Fi roaming surface.
- **Drafted content.**

  On Setup Path A, the sled is its own host. The message path collapses to three nodes: Application, Broker, Reader.

  **Command path.**

  1. Application publishes the command JSON to the command topic on the broker.
  2. Broker routes the publish to subscribers, including the sled (which subscribed to its command topic on connect).
  3. Sled's IOTC daemon parses the command, dispatches it to the appropriate handler (Radio Control, Reader Manager, etc.), executes.

  **Response path.**

  4. Sled's IOTC daemon assembles the response JSON with the echoed `requestId` and publishes to the response topic.
  5. Broker routes to subscribers; application correlates by `requestId`.

  **Where TLS and Wi-Fi surface.**

  - TLS is negotiated between the sled and the broker. If `verificationType` is misconfigured, the sled's connection fails at the TLS handshake; you see no `mqttConnEVT.CONNECTED` and your debug logs (`sa.dp 1`) show TLS errors.
  - Wi-Fi roaming (between access points within the same SSID) is transparent above the IP layer but can cause brief MQTT disconnections if the IP changes. The retention buffer absorbs the gap; the application sees a window with no events followed by a burst when the connection comes back.

---


### §2.5 Control plane vs Observation plane

- **Purpose.** Distinguish the two macro-roles of MQTT traffic in the IOTC.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Control = synchronous, App-driven (Management + Control interfaces).
  - Observation = asynchronous, Reader-driven (Event + Data interfaces).
  - The two planes can live on the same endpoint or different endpoints.
  - Implication for QoS and broker sizing.
- **Drafted content.**

  Every IOTC message belongs to one of two planes.

  - **Control plane.** Synchronous, application-driven. Carries commands and their responses. Latency-sensitive in the *human-perceived* sense — a 200 ms response time feels different from a 2 s response time. Bandwidth-light: a single `set_operating_mode` is under a kilobyte. Encompasses the Management and Control interfaces (§2.2).
  - **Observation plane.** Asynchronous, reader-driven. Carries heartbeats, alerts, and tag reads. Latency-tolerant in the human sense — a heartbeat 200 ms late is invisible. Bandwidth potentially heavy: a sled in `BALANCED_PERFORMANCE` mode reading a dense tag field can emit hundreds of `dataEVT` per second. Encompasses the Event and Data interfaces.

  Routing the two planes onto a single endpoint (the MDM hybrid pattern) is fine for development and small deployments. At scale, splitting them onto separate brokers lets you size each broker for its workload — control-plane brokers stay quiet and HA-replicated; observation-plane brokers are tuned for fan-out throughput.

  QoS choice mirrors the plane.

  | Plane | Typical topics | Typical QoS |
  |---|---|---|
  | Control | `cmd/*`, `rsp/*` | 1 (acknowledged delivery) |
  | Observation (events) | `event/*` | 1 (alerts must arrive) or 0 (heartbeats are tolerable to lose) |
  | Observation (data) | `data1/*`, `rfid/*` | 0 (throughput) or 1 (correctness) — choose per workload |

---

### §2.6 Command lifecycle

- **Purpose.** Show the full state of a single command from generation to acknowledgement.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Phases: generate → publish → deliver → execute → respond → consume.
  - `requestId` is the correlation key.
  - Timeouts, retries, idempotency considerations.
- **Drafted content.**

  A command has six phases.

  1. **Generate.** Application creates the command JSON. It contains at minimum a `command` field (e.g., `"get_version"`) and a `requestId` field (an application-chosen string, unique within an open conversation).
  2. **Publish.** Application publishes the JSON to the configured command topic for that sled (e.g., `zebra/MDM/clients/cmnd/RFD40-212735201D0053`).
  3. **Deliver.** Broker routes the publish to subscribers. The sled (Path A) or the host (Path B) receives it.
  4. **Execute.** The receiver parses the JSON, dispatches to the right handler, and produces a result. Some commands are fast (a few milliseconds for `get_version`); some are slow (firmware updates take minutes).
  5. **Respond.** The receiver publishes a response JSON to the configured response topic, echoing the `requestId` and including a `response` object with a `code` (0 for success, non-zero for failure) and a payload appropriate to the command.
  6. **Consume.** Application, which subscribed to the response topic at startup, receives the response, looks up `requestId`, and resolves the awaiting code path.

  **Correlation by `requestId` is mandatory.** MQTT does not pair publishes with responses; only the IOTC's JSON contract does. If two commands are in flight with the same `requestId`, behavior is undefined — the application cannot tell the responses apart.

  **Timeouts are an application concern.** The IOTC contract does not specify a maximum time for a response. Most commands return in under one second, but `firmware_update` may take ten minutes. Set timeouts per command, not globally.

  **Idempotency varies by command.** `get_status`, `get_version`, and `get_config` are read-only and idempotent. `set_config`, `set_operating_mode`, and `config_endpoint` are stateful and not idempotent in the strict sense — replaying them is safe as long as you accept that the *last* one wins. `firmware_update` is not idempotent at all and must not be retried blindly.

---

### §2.7 Event lifecycle

- **Purpose.** Show how unsolicited reader-to-application events are generated and consumed.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Events are not commands; no requestId.
  - Five common event types (heartBeat, alerts, mqttConn, firmwareUpdate, fileDownload).
  - Each event carries a timestamp; timestamp format varies (`mqttConnEVT` is HH:MM:SS).
  - Application must subscribe at startup or miss them.
- **Drafted content.**

  Events are reader-initiated, asynchronous, one-way messages. They are *not* responses; they have no `requestId` and no paired request. The application discovers events only by subscribing to the configured event topics at startup.

  **Five event families.**

  | Event | Trigger | Purpose |
  |---|---|---|
  | `heartBeatEVT` | Periodic, at the configured interval | Liveness; carries device status, optionally battery, inventory status |
  | `alertsEVT` | State change in a monitored signal (battery, temperature, network, firmware, power) | Operational health |
  | `mqttConnEVT` | MQTT connect or disconnect | Connection state with timestamp **in `HH:MM:SS` format**, not ISO-8601 |
  | `firmwareUpdateEVT` | During and after a firmware update | Progress and result |
  | `fileDownloadEVT` | During and after a file download | Progress and result |

  **The HH:MM:SS quirk on `mqttConnEVT.timestamp`** is a real schema deviation, not a documentation accident. Cross-event time correlation must special-case this one event.

  **Subscribe at startup or miss them.** If the application subscribes to the event topic *after* an event has been published, the event is gone (unless the event topic was published with `retain=true`, in which case the broker holds the most recent one). The IOTC publishes `heartBeatEVT` with retain off by default. Design your application to subscribe before any reader is expected to come online.

---

### §2.8 Data lifecycle

- **Purpose.** Show how a tag in the air becomes a `dataEVT` on a topic.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - RF singulation produces a raw read.
  - Pre-filter (Select) at the air protocol.
  - Metadata enrichment at the firmware layer.
  - Post-filter (Report) before publishing.
  - Retention buffer absorbs network gaps.
  - Final publish to data topic.
- **Drafted content.**

  A tag-read traverses six stages before it lands in the application.

  1. **Singulation.** The radio cycles through Gen2 inventory rounds. A tag in the field responds. The radio recognizes a successful singulation.
  2. **Pre-filter (Select).** If `selectFilters` are configured, the Gen2 Select command at the air protocol pre-screens which population of tags is allowed to participate in the round. This filter happens *before* the read, at the antenna. It saves air time and battery.
  3. **Metadata enrichment.** The firmware attaches the metadata fields configured in `tagMetaDataToEnable`: RSSI, PHASE, SEEN_COUNT, ANTENNA, CHANNEL, PC, XPC, CRC, EPC, TID, USER, MAC, HOSTNAME. Some fields require an access operation to populate (TID, USER); they are not free.
  4. **Post-filter (Report).** If `postFilters` are configured, the firmware applies inclusion/exclusion rules — PREFIX, SUFFIX, REGEX patterns, RSSI thresholds, seen-count thresholds. This filter happens *after* the read, in the sled's IOTC daemon, before publishing. It saves bandwidth and downstream processing.
  5. **Retention buffer.** If the broker is unreachable, the `dataEVT` is held in a 150,000-event retention buffer. When connectivity returns, the buffer flushes at 500 events per second until drained. Order is preserved.
  6. **Publish.** The `dataEVT` JSON is published to the configured data topic — typically `<tenantId>/DATA/clients/data1event/<serialNumber>` — at the QoS configured on that endpoint.

  **Two non-obvious consequences.**

  - **`FAST_READ` does not stream `dataEVT`.** In FAST_READ the sled does not emit tag data events. Use it for sheer-singulation benchmarks, not production capture.
  - **Pre-filter ≠ Post-filter.** Pre-filtering reduces RF effort; post-filtering reduces transport effort. They are not interchangeable. Use Select to mask large tag populations; use postFilters to mask noisy reads.

---

## Unit 1 — Foundations, continued: Mental Models and Domain Language

### §3.1 Fixed-reader vs handheld-reader thinking

- **Purpose.** Disambiguate fixed-reader habits that fail on handhelds.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Where the analogy holds (MQTT, profiles, events).
  - Where it breaks (battery, antenna, Portal mode, GPIO, region).
  - Quick translation table.
- **Drafted content.**

  If you are coming from FX7500, FX9600, or ATR7000, most of your fixed-reader mental model transfers — but a few pieces do not. Use the table below before you write a single integration line.

  | Concept | Fixed | Handheld | Translates? |
  |---|---|---|---|
  | MQTT publish/subscribe semantics | Yes | Yes | ✓ Same |
  | JSON command/response with `requestId` | Yes | Yes | ✓ Same |
  | `get_status`, `get_version`, `get_config` | Yes | Yes | ✓ Same names, similar fields |
  | Operating-mode profile concept | Yes (Simple/Inventory/Portal/Conveyer/Custom) | Yes — **different profiles** (FAST_READ/CYCLE_COUNT/DENSE_READERS/OPTIMAL_BATTERY/BALANCED_PERFORMANCE/READER_DEFINED/ADVANCED) | ✗ Different enum |
  | Antenna ports (1–8) | Yes | **No** — single integrated antenna | ✗ Concept does not exist |
  | Portal mode | Yes | **No** — fixed-reader-only | ✗ Concept does not exist |
  | GPI / GPO | Yes | **No** — no GPIO pins | ✗ Concept does not exist |
  | REST interface | Yes (local REST) | **No** — MQTT only on handhelds | ✗ Not available |
  | Operating mode change requires reboot? | No | No (runtime applied) | ✓ Same |
  | Region setting | Via web console or REST | Via 123RFID Desktop over USB **only** | ✗ Out-of-band on handhelds |
  | Battery considerations | None | First-class | ✗ New axis |
  | Physical trigger button | None | First-class | ✗ New input |

  Read every chapter with this table in mind. When in doubt about which concept transfers, look here.

---

### §3.2 MQTT thinking vs REST thinking

- **Purpose.** Reframe REST habits for MQTT.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Connection vs request: long-lived vs short-lived.
  - URL vs topic: addressing model.
  - Header/body vs JSON-only.
  - Status codes vs response.code.
  - Subscribe-before-publish.
- **Drafted content.**

  REST is connection-per-request: open TCP, send HTTP, get a response, close TCP. MQTT is connection-once: open TCP and TLS, keep alive for hours or days, and exchange small JSON messages over that single connection. Six implications.

  - **Connect once, talk forever.** Your application opens one MQTT connection to the broker at startup and reuses it. Don't tear it down per command.
  - **The topic is the address.** REST uses URLs (`POST /readers/RFD40-21273.../command`); MQTT uses topic strings (`zebra/MDM/clients/cmnd/RFD40-2127...`). They are conceptually similar but the conventions differ: topics are pre-configured, not discovered.
  - **There is no separate headers/body.** The entire MQTT message is one payload. Authentication is handled by the MQTT connect packet (username, password, certificate); per-message auth does not exist.
  - **HTTP status codes do not apply.** Success and failure live inside the JSON payload — `response.code: 0` for success, `response.code: 1..28` for various errors (see §33).
  - **Subscribe before publish.** REST is connection-per-request, so the response always comes back on the same socket. MQTT splits publish and subscribe; you must have subscribed to the response topic *before* the response is published, or you lose it. This is the single most common new-MQTT-developer trap.
  - **There is no "the connection failed" — the connection always exists in the broker's view.** The broker holds an MQTT session even when the network is gone. Your application discovers liveness via `mqttConnEVT` and broker-specific keepalive timeouts.

  If you carry one REST instinct into MQTT, carry this: do not retry by reconnecting. The connection is already there. Retry by re-publishing the command.

---

### §3.3 Distributed-system thinking vs peripheral-device thinking

- **Purpose.** Make peripheral-trained developers think distributed.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Peripheral thinking: synchronous, in-process, deterministic.
  - Distributed thinking: asynchronous, network-mediated, eventually consistent.
  - The reader is a remote, autonomous node.
- **Drafted content.**

  If you have used Zebra's RFID SDK directly (e.g., via Bluetooth from an Android app), you have used the sled as a peripheral. Calls are synchronous; the SDK abstracts the radio; failures are exceptions in your code. The IOTC is different.

  In the IOTC, the reader is a **remote, autonomous node**. It runs its own code. It holds its own state. It does what you asked even after you crashed. It will keep retaining 150,000 events until you come back. It may have reconnected to a different access point since you last spoke. It may have rolled over to a fresh battery shift. Treat it like a remote microservice you do not own.

  Three consequences for your code.

  - **Asynchronous everything.** Publishing a command does not immediately return a result. Subscribe to the response topic, register a callback by `requestId`, and let the response arrive when it arrives.
  - **Eventual consistency.** Your view of `currentConfig` may lag the reader's actual state by seconds. After a `set_config`, re-read with `get_config` if you need confirmation.
  - **Reconciliation on reconnect.** When `mqttConnEVT.CONNECTED` arrives after a long disconnection, query state (`get_status`, `get_config`, `get_operating_mode`) before you trust your local model.

---

### §3.4 Native-MQTT thinking vs OpenAPI-schema thinking — the OpenAPI Illusion

- **Purpose.** Inoculate the reader against the most damaging mismatch.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - The schema folder describes nested REST-style payloads.
  - Native MQTT uses flattened payloads.
  - Why both exist (REST surface on fixed; MQTT surface on handheld).
  - Example: schema's `ctrlOprPayload.params` vs native MQTT `{"command":"start"}`.
  - Rule of thumb: trust validated examples over the OpenAPI rendering.
- **Drafted content.**

  The most damaging mismatch in IOTC integration is between the OpenAPI-rendered schema and the native MQTT payload contract. Both are real. Only one is what the sled actually accepts.

  **The Setup.** The `api-schema-reference/` folder contains JSON Schema and OpenAPI specifications generated for the IOTC. These specs render commands with nested REST-style envelopes — `ctrlOprPayload`, `params`, deeply-nested objects. They are correct for the REST surface on fixed readers. Handheld readers do not have a REST surface; they have an MQTT surface.

  **The Reality.** The MQTT surface accepts *flattened* JSON. Where the OpenAPI rendering shows:

  ```json
  {
    "ctrlOprPayload": {
      "params": { "operation": "start" }
    }
  }
  ```

  The sled actually accepts:

  ```json
  {
    "command": "start",
    "requestId": "start_inventory_001"
  }
  ```

  **The Rule.** When the OpenAPI rendering and a field-validated MQTT example disagree, **trust the field-validated example**. The Zebra RFID IoT Connector Getting Started Guide and the IOTC Features Guide both contain field-validated examples; they are the canonical contract for native MQTT.

  **Why both exist.** The schema layer was authored with REST-on-fixed in mind and adapted to MQTT-on-handheld without flattening. The flattened MQTT contract is the validated runtime behavior. A future schema revision is expected to render flattened payloads natively; until then, the Documentation Updates note (April 2026) confirms ongoing validation across 28 commands.

  **What this means for you.** Read schemas to understand *fields and types*. Copy validated examples to assemble *payloads*. Never paste a schema rendering directly into an MQTT publish.

---

### §3.5 Common incorrect mental models (catalogue)

- **Purpose.** Surface and correct the recurring wrong assumptions.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Table of 15 misconceptions with the corrected belief and the page that addresses it.
- **Drafted content.**

  | # | Wrong belief | Right belief | Read next |
  |---|---|---|---|
  | MM-01 | "The sled connects to the broker directly on every tier." | Only Premium/RFD90 connect directly (Path A). Standard requires a host (Path B). | §1.6 |
  | MM-02 | "Publishing a command guarantees I will see the response." | Only if you subscribed to the response topic before publishing. | §0.2, §2.6 |
  | MM-03 | "`FAST_READ` is faster than `BALANCED_PERFORMANCE` for production." | `FAST_READ` does not emit `dataEVT`. Use it only for radio benchmarking. | §12.2 |
  | MM-04 | "`get_status` returns the firmware version." | `get_status` returns *runtime* status (battery, temperature, radio activity). Firmware version lives in `get_version`. | §16.2, §31 |
  | MM-05 | "I can set the region via MQTT." | No `set_region` exists. Region is configured via 123RFID Desktop over USB. | §1.5, §19.5 |
  | MM-06 | "Events are reliable; I will always receive them." | Reliability depends on QoS, subscribe timing, retention buffer state, and broker delivery. | §2.7, §14.5 |
  | MM-07 | "QoS 2 guarantees the sled received my command." | QoS 2 guarantees broker-to-subscriber delivery, not that the sled application processed it. Use `requestId` correlation. | §0.2, §2.6 |
  | MM-08 | "All MQTT endpoints are interchangeable." | epTypes are not interchangeable. MDM is hybrid; CTRL is control-plane; DATA1/DATA2 are data-plane; SOTI/MDM-vendor types have vendor-specific behavior. | §9 |
  | MM-09 | "`set_config` with the same fields is idempotent at the protocol layer." | The *last* `set_config` wins; replay is safe in outcome but may cause unnecessary reboots if the config is large. | §15.4 |
  | MM-10 | "Filters reduce air-protocol read effort." | Only pre-filters (Select) do. Post-filters reduce *bandwidth*, not radio effort. | §12.8 |
  | MM-11 | "`mqttConnEVT.timestamp` is ISO-8601 like other events." | It is `HH:MM:SS`. Special-case it. | §2.7, §30 |
  | MM-12 | "The integrated barcode scanner is controlled by the IOTC." | Not yet. Barcode scanning is on the roadmap. Use the Scanner SDK on the host today. | §13.9 |
  | MM-13 | "Alerts include antenna/CPU/GPI events." | Handhelds emit `alertsEVT` only for BATTERY, FIRMWARE_UPDATE, NETWORK_EVENT, TEMPERATURE, POWER. | §14.4 |
  | MM-14 | "Host device is just a passive Bluetooth pipe (Path B)." | The host runs the IOTC daemon. It is an active node and must be managed. | §2.3 |
  | MM-15 | "I can use HTTP or REST as a fallback." | Not on handhelds. MQTT is the only transport. | §1.5 |

  Re-read this table after you have written your first integration. You will recognize at least three of these in your own assumptions.

---

### §3.6 Correct operational mental models

- **Purpose.** Lock in the right model after dismantling the wrong ones.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - One canonical paragraph stating the target mental model.
  - Three operational habits that follow from it.
- **Drafted content.**

  **The target mental model.**

  > IOTC is a pub/sub control plane over MQTT, in which an Application publishes commands to a Broker, which forwards to a Host (on Path B) or directly to a Reader (on Path A). The Reader executes the command and publishes a paired response back through the same chain. The Reader also publishes asynchronous Events (status, alerts, tag data) on dedicated topics whenever its state changes. The Application's view of the Reader's state is always derived; the Reader holds the canonical state. To control what the Reader does, the Application configures Endpoints (broker bridges), an Operating Mode (RFID behavior profile), and Filters (pre and post), then triggers a `control_operation start`. To observe what the Reader sees, the Application subscribes to MGMT_EVT (events), DATA1 / DATA2 (tag data), and the response topics paired with each command topic.

  Three operational habits follow from this model.

  - **Subscribe first, publish second.** Your application's startup sequence should be: connect to broker; subscribe to response, event, and data topics; *then* begin publishing commands.
  - **Reconcile after disconnect.** On every `mqttConnEVT.CONNECTED` after a disconnection, run `get_status` and `get_config`. Reconcile your local model against the reader's authoritative state.
  - **Treat the reader as a remote service.** Set timeouts, plan for partial failure, batch where it makes sense, and never assume immediate consistency.

---

### §4.1 Canonical terminology (ubiquitous language)

- **Purpose.** Enforce a single vocabulary across the documentation.
- **Quadrant.** 📕 Reference + 📘 Explanation.
- **Outline.**
  - Term, canonical meaning, forbidden synonyms.
- **Drafted content.**

  Use these terms exactly. Synonyms are forbidden in their canonical context.

  | Term | Canonical meaning | Forbidden synonyms |
  |---|---|---|
  | **Reader** | The physical RFD40/RFD90 sled. | device, unit, thing, radio (the radio is *inside* the reader, not the reader itself) |
  | **Host** | The Zebra mobile computer that runs the IOTC daemon on Path B. | terminal (except in `terminalConnection.status`), phone, mobile |
  | **Application** | The customer-built MQTT client (the controlling agent). | client (overloaded with MQTT client), consumer, integrator |
  | **Broker** | The MQTT broker. | server, hub, gateway |
  | **Endpoint** | A configured MQTT bridge target (a row in `epConfig`); epType ∈ {MGMT, MGMT_EVT, CTRL, DATA1, DATA2, MDM, SOTI}. | endpoint configuration, broker endpoint (these are restatements, not synonyms) |
  | **Operation** | An IOTC API command (e.g., `set_operating_mode`). | API call, action, function, request (when used for the command itself) |
  | **Operating mode** | The composite `operatingModes` object (profile + start/stop conditions + query + tagMetaData). | config (overloaded), mode (overloaded) |
  | **Profile** | A value from the `operatingModes.profiles` enum. | preset, recipe |
  | **Session** | EPC Gen2 inventory session (S0, S1, S2, S3). | round (round is a different concept), bank |
  | **Filter** | A tag filter — either pre-read (Select) or post-read (Report). | mask, screen |
  | **Event** | A reader-initiated MQTT message. | notification, alert (alerts are a *kind of* event) |
  | **Alert** | A specific event subtype carried in `alertsEVT`. | warning, error, notification |
  | **Command** | An application-initiated MQTT message that expects a paired response. | request (acceptable as discourse synonym only) |
  | **Response** | The reader's paired reply, correlated by `requestId`. | reply, ack |
  | **`requestId`** | The correlation token. | correlation ID, request identifier |
  | **Firmware** | The reader's installed software, reported by `get_version.readerVersion.firmwareVersion`. | software, OS, build |
  | **`tenantId`** | A namespace identifier that prefixes all MQTT topics for a population of readers. | namespace, prefix, tenant ID (three words; use camelCase) |

  Whenever you find yourself reaching for a synonym, return to this table.

---

### §4.2 Bounded contexts (TRANSPORT · CONFIGURATION · RFID · DEVICE · FLEET)

- **Purpose.** Carve the domain into five bounded contexts so the same word can have different meanings in different places.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Definition of each context.
  - What concept lives in each.
  - Cross-context relationships.
- **Drafted content.**

  Domain-Driven Design lets us scope vocabulary to **bounded contexts**. A term means one thing inside its context and may mean something different in another context. The IOTC has five bounded contexts.

  | Context | Concerns | Authoritative for |
  |---|---|---|
  | **TRANSPORT** | MQTT plumbing | topic strings, QoS, retained messages, broker, TLS, keepAlive, reconnect policy |
  | **CONFIGURATION** | The sled's persistent and runtime configuration | `config_endpoint`, `set_config`, `currentConfig`, certificates, Wi-Fi profiles |
  | **RFID** | Air protocol and tag handling | operating modes, profiles, sessions, antenna behavior, filters, tag memory |
  | **DEVICE** | The sled as a piece of hardware and software | firmware version, battery, temperature, terminal connection, scanner, trigger button |
  | **FLEET** | Many sleds managed together | tenants, SOTI/MDM/SureMDM, provisioning, OTA rollouts, fleet workflows |

  Every page in these docs declares one primary context in its header. The word *endpoint* in TRANSPORT means an MQTT bridge configuration. The word *operation* means an MQTT command in TRANSPORT *and* a START/STOP value inside `control_operation` in RFID. Both are correct in their context; both must be visually distinct on the page.

  Cross-context relationships matter.

  - TRANSPORT depends on CONFIGURATION (endpoints are configured) and on DEVICE (a working radio is irrelevant if the TLS stack is broken).
  - RFID produces events that ride TRANSPORT.
  - DEVICE produces events (alerts, heartbeats) that ride TRANSPORT.
  - FLEET applies CONFIGURATION across many devices.

---

### §4.3 TRANSPORT context

- **Purpose.** Pin down the TRANSPORT vocabulary.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Terms: broker, topic, QoS, keepAlive, cleanSession, retained, reconnect, TLS, verificationType.
  - Each with a one-sentence definition and a pointer.
- **Drafted content.**

  In TRANSPORT context:

  - **Broker.** The MQTT server. Third-party. The reader connects to it; the application connects to it. Both speak MQTT 3.1.1.
  - **Topic.** The slash-separated string that addresses a message. IOTC topics follow `<tenantId>/<userConfiguredPath>/<serialNumber>`.
  - **QoS.** Quality of Service per message — 0 (at most once), 1 (at least once), 2 (exactly once). See §8.3.
  - **`keepAlive`.** Seconds the broker waits for any traffic before declaring the connection dead. Typical value 60. Beyond this, the broker triggers the LWT (Last Will and Testament).
  - **`cleanSession`.** When `true`, the broker starts a fresh session on each connect, discarding subscriptions and undelivered messages. When `false`, the broker keeps state across connections.
  - **Retained message.** A message the broker stores and delivers to any future subscriber of that topic. Useful for status; misused for everything else.
  - **`reconnectDelayMin` / `reconnectDelayMax`.** Backoff bounds for the sled's auto-reconnect logic. Typical values: 5 seconds min, 512 seconds max.
  - **TLS.** Transport Layer Security. Use port 8883 with TLS, 1883 without. Plaintext is acceptable for local lab use only.
  - **`verificationType`.** What the TLS stack verifies during handshake: `VERIFY_NONE`, `VERIFY_PEER`, `VERIFY_HOST`, or `VERIFY_HOST_PEER`. Production should use `VERIFY_HOST_PEER`.

---

### §4.4 RFID context

- **Purpose.** Pin down the RFID vocabulary.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Terms: profile, session, link profile, antenna, transmit power, query, select, post-filter, tag metadata.
- **Drafted content.**

  In RFID context:

  - **Profile.** A value from the `operatingModes.profiles` enum: `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE`, `READER_DEFINED`, `ADVANCED`.
  - **Session.** An EPC Gen2 inventory session: `S0`, `S1`, `S2`, `S3`. Determines how long a tag remembers being read. Profile-dependent default.
  - **Link profile.** The PHY-layer encoding pair (Miller mode, BLF). Examples: `FM0 640K`, `M4 240K`, `M4 256K`. Profile-dependent default.
  - **Antenna.** On handhelds, a single integrated antenna; there is no port concept.
  - **Transmit power.** dBm; profile-dependent. Default 27 dBm; OPTIMAL_BATTERY uses 24 dBm.
  - **Query.** Gen2 protocol parameter set: session, target (A/B), tag-population estimate (Q), select flag (SL).
  - **Select.** Pre-read tag filter applied at the air protocol. Reduces RF effort.
  - **Post-filter.** Post-read tag filter applied in the IOTC daemon. Reduces transport effort.
  - **Tag metadata.** The fields included in `dataEVT.tagData[*]` per the `tagMetaDataToEnable` configuration: RSSI, PHASE, SEEN_COUNT, ANTENNA, CHANNEL, PC, XPC, CRC, EPC, TID, USER, MAC, HOSTNAME.

---

### §4.5 CONFIGURATION context

- **Purpose.** Pin down the CONFIGURATION vocabulary.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Terms: currentConfig, runtime vs saved vs factory, endpoint, certificate, Wi-Fi profile, eventConfiguration.
- **Drafted content.**

  In CONFIGURATION context:

  - **`currentConfig`.** The aggregate JSON document returned by `get_config`, containing all configurable sub-objects: `readerVersion`, `deviceStatus`, `currentRegion`, `ethConfig`, `wifiConfig`, `installedCerts`, `epConfig`.
  - **Factory configuration.** What the reader boots into out of the box. Restored by `set_factory_defaults` or by physical reset (where supported).
  - **Saved configuration.** What persists across reboots. A successful `set_config` modifies saved configuration; a successful `config_endpoint` writes to saved configuration too.
  - **Runtime configuration.** What is in effect right now. Differs from saved only briefly: between a write and the next reboot (for reboot-required operations).
  - **Endpoint (in CONFIGURATION).** A row in `epConfig` — `endpointName`, `epType`, `protocol`, `url`, `port`, `tenantId`, `mqttParams`, `securityParams`, `eventConfiguration`. The sled holds up to 10 endpoints; up to 2 data pipes may be active simultaneously.
  - **Certificate.** A PEM-formatted file installed on the sled for TLS or Wi-Fi Enterprise authentication. Managed via `delete_certificate` and `get_installed_certificate`. Installation is out-of-band (123RFID Desktop or MDM).
  - **Wi-Fi profile.** A row in `wifiConfig` carrying an SSID, security type, and credentials.
  - **`eventConfiguration`.** A sub-object of an endpoint specifying which event types it emits.

---

### §4.6 DEVICE and FLEET contexts

- **Purpose.** Pin down the DEVICE and FLEET vocabularies.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - DEVICE: firmware, battery, temperature, terminal connection, trigger, scanner.
  - FLEET: tenant, MDM, SOTI, SureMDM, provisioning, OTA.
- **Drafted content.**

  In DEVICE context:

  - **Firmware.** The sled's installed code, surfaced as `readerVersion.firmwareVersion`. Updated via `firmware_update`.
  - **Battery.** Surfaced as `batteryStatus.capacity`, `.stateOfHealth`, `.chargePercentage`, `.chargeStatus`. Only handheld readers have a battery.
  - **Temperature.** Surfaced as `deviceStatus.temperature` (°C). Triggers `alertsEVT.TEMPERATURE` when thresholds cross.
  - **Terminal connection.** The Bluetooth/eConnex link between sled and host on Path B. Surfaced as `deviceStatus.terminalConnection.status` and `.type`.
  - **Trigger.** The physical button on the sled.
  - **Scanner.** The integrated barcode scanner on RFD40 Premium and RFD40 Premium Plus. Currently controlled outside the IOTC (Scanner SDK).

  In FLEET context:

  - **`tenantId`.** Namespace identifier prefixing all MQTT topics for a population of readers under one logical operator.
  - **MDM (Mobile Device Management).** A general term for the class of tools that manage many devices. SOTI Connect and 42Gears SureMDM are the two leading partners for Zebra handheld RFID.
  - **SOTI Connect.** A specific MDM product that manages RFD40/RFD90 sleds, supports OTA configuration push, and acts as an MQTT broker in many deployments.
  - **42Gears SureMDM.** A specific MDM product with comparable capabilities.
  - **Provisioning.** The process of preparing a reader for production — region, Wi-Fi credentials, endpoint configuration, certificates.
  - **OTA (Over-The-Air).** Remote firmware update or remote configuration push. Available on Path A; on Path B it is mediated through the host MDM.

---

### §4.7 Endpoint disambiguation — broker bridge vs API operation

- **Purpose.** Resolve the most failure-prone overload.
- **Quadrant.** 📘 Explanation + 📕 Reference.
- **Outline.**
  - The two meanings.
  - The rule.
  - Examples of each.
- **Drafted content.**

  The word *endpoint* is overloaded across the IOTC. v2 of these docs resolves it architecturally.

  **Meaning 1 — TRANSPORT.endpoint.** A row in the sled's `epConfig` — an MQTT broker-bridge configuration with an `epType` ∈ {MGMT, MGMT_EVT, CTRL, DATA1, DATA2, MDM, SOTI}. *Example: "Activate the MDM endpoint named `Primary_MDM_Broker`."*

  **Meaning 2 — TRANSPORT.operation.** An IOTC API command, e.g., `set_operating_mode`, `get_status`. The 123RFID Desktop UI does *not* call these endpoints; some older REST-leaning docs do. **In these docs we never call API operations "endpoints."** We call them **operations** or **commands**.

  **The rule.** When you see the word *endpoint*, it is always TRANSPORT.endpoint — an `epConfig` row, an MQTT bridge target. When you mean an API command, write *operation* or *command* (e.g., "the `set_operating_mode` operation," not "the `set_operating_mode` endpoint").

  **Quick check.** Could the thing be activated, deleted, or assigned a tenant? It is an endpoint (Meaning 1). Could it be published to or correlated by `requestId`? It is an operation (Meaning 2).

---

### §4.8 Semantic consistency rules

- **Purpose.** Author-facing rules that keep vocabulary stable.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Use canonical terms (§4.1) always.
  - Code-format schema field names.
  - Never lowercase enum values.
  - Note schema typos with errata callouts.
- **Drafted content.**

  Authors of these docs follow four rules.

  - **Use canonical terms (§4.1) always.** No synonyms in their canonical context. *Reader* is never "device"; *application* is never "client."
  - **Code-format schema field names.** `requestId`, `tenantId`, `epType`, `tagMetaDataToEnable.SEENCOUNT` — always in code formatting, never paraphrased.
  - **Never lowercase enum values.** `SESSION_1`, `BALANCED_PERFORMANCE`, `VERIFY_HOST_PEER`, `DATA_EP1` — the schema's casing is canonical.
  - **Schema typos get errata callouts, not silent correction.** When the underlying schema says `get_installed_certificates` (plural) but the canonical name is `get_installed_certificate` (singular), the docs use the canonical singular and include a `> Schema errata: ...` note.

---

### §4.9 From mental model to first command — a reading map

- **Purpose.** Close Unit 1 with a hand-off to Unit 2.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Brief recap of what the reader now believes.
  - Per-tier reading map into Unit 2.
- **Drafted content.**

  By the end of Unit 1 you understand five things.

  - The IOTC is an MQTT control and observation plane embedded in the sled (Path A) or on a paired host (Path B).
  - Four interfaces — Management, Event, Control, Data — run over MQTT topics carried on endpoints.
  - The reader is authoritative; your application is a derivative subscriber.
  - Native MQTT payloads are flattened; the OpenAPI schema is not the runtime contract.
  - Region is set out-of-band via 123RFID Desktop.

  You are ready to do something. The right next page depends on your hardware tier.

  | Your sled | Start at |
  |---|---|
  | RFD40 Premium / Premium Plus / RFD90 / RFD9030 | §5.1 *First-time setup (Monolithic)* |
  | RFD40 Standard | §5.2 *First-time setup (Bipartite)* |
  | I am not deploying hardware; I am building integration code | §6.1 *Your first MQTT command* (using a sled someone else has bootstrapped) |

  Each tutorial uses the vocabulary, the diagrams, and the invariants from Unit 1.

---


## Unit 2 — Getting Started

### §5.1 Tutorial — First-time setup for Monolithic sleds (RFD40 Premium · Premium Plus · RFD90)

- **Purpose.** From an unboxed sled to a CONNECTED MQTT session in under 30 minutes.
- **Quadrant.** 📗 Tutorial.
- **Outline.**
  - Prerequisites.
  - Phase 1: Unify the subnet, install MQTTX.
  - Phase 2: Bootstrap via 123RFID Desktop (Wi-Fi + MDM endpoint).
  - Phase 3: Watch the `mqttConnEVT` and capture the serial number.
  - Confidence closure: "you have a working MDM endpoint."
- **Drafted content.**

  **By the end of this tutorial,** your Premium or RFD90 sled will be powered on, connected to your Wi-Fi, talking to an MQTT broker on your PC, and emitting a `mqttConnEVT.CONNECTED` event you can observe live in MQTTX.

  **Prerequisites.**

  - A Premium, Premium Plus, RFD90, or RFD9030 sled.
  - A Windows PC with **123RFID Desktop** installed and a USB cable.
  - **MQTTX** (https://mqttx.app) installed on the same PC.
  - Wi-Fi credentials (SSID + passkey) for a network your PC is also on. If your corporate Wi-Fi blocks broker traffic, use a mobile hotspot.

  > **Region note.** Before this tutorial works, your sled must be in the correct regulatory region. If your sled refuses to transmit, set region in 123RFID Desktop's *Configure → Regulatory* page; the option is hardware-tier-specific and is not available over MQTT.

  **Phase 1 — Environment.**

  1. Connect your PC to the Wi-Fi network. Run `ipconfig` (Win+R, `cmd`, Enter). Note the IPv4 address of your active wireless adapter (e.g., `10.233.46.53`).
  2. Open MQTTX. Click *+ New Connection*. Name it `Zebra Local Test`. **Host:** `mqtt://10.233.46.53`. **Port:** `1883`. Click Connect.
  3. In MQTTX, click *New Subscription*. Subscribe to `zebra/MDM/clients/#` (the `#` is an MQTT wildcard matching everything below).

  **Phase 2 — Bootstrap with 123RFID Desktop.**

  4. Connect the sled to the PC via USB.
  5. Open 123RFID Desktop. Click **FIND READERS**. In the Reader Discovery screen, click **CONNECT** next to your sled's serial number. Verify the connected reader appears in the upper list.
  6. Click the **Configure** gear icon, then click your reader's image. Click **Edit Configuration on Reader**.
  7. Navigate to **Communication → Wi-Fi**. Select **Scan and Choose Network**. Pick your Wi-Fi SSID, enter the passkey, click **Add**, then **Connect**. Confirm the status changes to **Connected** and an IP address appears.
  8. Click the **End Point** tab. Click **New**.
  9. Fill in the endpoint:

     - **Type:** MDM
     - **Name:** `Primary_MDM_Broker`
     - **Protocol:** MQTT
     - **URL:** your PC's IPv4 address (from step 1)
     - **Port:** `1883`
     - **Tenant ID:** `zebra` (lowercase — MQTT topics are case-sensitive)
     - **Clean Session:** ✓
     - **Command Topic:** `zebra/MDM/clients/cmnd`
     - **Response Topic:** `zebra/MDM/clients/resp`
     - **Event Topic:** `zebra/MDM/clients/event`

  10. Check **Activate** on the endpoint row. Click **Save**.
  11. Disconnect the USB cable.

  **Phase 3 — Watch for the CONNECTED event.**

  12. Within seconds the sled boots over Wi-Fi and connects to the broker. In MQTTX, an `mqttConnEVT` arrives on the wildcard subscription. The full topic looks like `zebra/MDM/clients/event/RFD40-24190525100255` (your serial number will differ).
  13. The payload's `connectionState` is `CONNECTED`. Note your exact serial number.

  **Confidence closure.** You now have a working MDM hybrid endpoint. Your Inbox is `zebra/MDM/clients/cmnd/<your_serial>` and your Outbox is `zebra/MDM/clients/resp/<your_serial>`. The next tutorial (§6.1) uses these to send your first command.

---

### §5.2 Tutorial — First-time setup for Bipartite sleds (RFD40 Standard)

- **Purpose.** From an unboxed Standard sled paired to a Zebra mobile computer host, to a working MQTT lifeline.
- **Quadrant.** 📗 Tutorial.
- **Outline.**
  - Prerequisites (sled + host TC52/TC53/TC73 + IOTC daemon on host).
  - Pair sled to host over Bluetooth.
  - Configure IOTC daemon on host with broker details.
  - Verify connectivity by observing `mqttConnEVT` on the broker side.
- **Drafted content.**

  **By the end of this tutorial,** your RFD40 Standard sled, paired to a Zebra mobile computer running the IOTC daemon, will publish a `mqttConnEVT.CONNECTED` event you can observe in MQTTX.

  **Prerequisites.**

  - An RFD40 Standard sled.
  - A Zebra mobile computer running Android (TC52, TC53, TC73, or similar) with the IOTC host application installed and an MQTT client provisioned.
  - A USB cable for initial configuration of the host application, **not** of the sled.
  - **MQTTX** on a PC on the same Wi-Fi network.
  - Wi-Fi credentials for the host.

  > **Path B note.** On Path B, the *host* connects to the broker. The sled passes RFID payloads to the host over Bluetooth. You will not see Wi-Fi configuration on the sled itself — the sled has no Wi-Fi radio.

  **Phase 1 — Pair sled to host.**

  1. Power on the host mobile computer and connect it to your Wi-Fi.
  2. Power on the sled. Press the trigger to wake.
  3. On the host, open the Zebra RFID host application (or your custom integration). Initiate Bluetooth pairing; select your sled from the discovered list. Confirm pairing.

  **Phase 2 — Configure IOTC daemon on the host.**

  4. On the host (or via an MDM such as SOTI Connect), configure the IOTC daemon's MQTT settings: broker URL, port (1883 or 8883), tenant ID `zebra`, command/response/event topics following the same `zebra/MDM/clients/...` pattern as §5.1, and clean session ✓.
  5. Save and restart the IOTC daemon.

  **Phase 3 — Observe CONNECTED.**

  6. On your PC, open MQTTX, connect to the same broker URL, subscribe to `zebra/MDM/clients/#`.
  7. Within seconds you see the `mqttConnEVT.CONNECTED` event with the **host's** topic (the topic suffix is the host's identifier on Path B). Note the topic path; it is your conversation address.

  **Confidence closure.** Your Bipartite Path B is alive. The sled is talking to the host over Bluetooth; the host is talking to the broker over MQTT. The next tutorial (§6.1) uses the topics you just observed to send your first command.

---

### §6.1 Tutorial — Your first MQTT command (`get_version` round-trip)

- **Purpose.** Send and receive your first command/response pair.
- **Quadrant.** 📗 Tutorial.
- **Outline.**
  - Prepare the publish topic.
  - Draft a flat JSON payload (the OpenAPI Illusion warning).
  - Publish; observe the response on the resp topic.
  - Note the `readerVersion` content.
- **Drafted content.**

  **By the end of this tutorial,** you will have sent a `get_version` command and received a response containing your reader's firmware version.

  **Prerequisites.** You have completed §5.1 or §5.2 and have a known serial number / topic suffix.

  **Steps.**

  1. In MQTTX, locate the **Publish** pane. Set the topic to `zebra/MDM/clients/cmnd/<your_serial>` (no typos — MQTT is case- and slash-sensitive).
  2. Enter the payload **flattened**, not the OpenAPI nested form:

     ```json
     {
       "command": "get_version",
       "requestId": "test_version_req_001"
     }
     ```

  3. Click **Publish**.
  4. Watch your subscription. Within milliseconds, a response arrives on `zebra/MDM/clients/resp/<your_serial>`. Its payload contains:

     ```json
     {
       "command": "get_version",
       "requestId": "test_version_req_001",
       "response": { "code": 0, "description": "Success" },
       "readerVersion": {
         "firmwareVersion": "...",
         "model": "...",
         "serialNumber": "..."
       }
     }
     ```

  **Confidence closure.** You have proven the full round-trip: publish → reader execute → response → consume. The echoed `requestId` is how your code will correlate responses to commands at scale.

---

### §6.2 Tutorial — Your first tag read (Hybrid MDM endpoint)

- **Purpose.** Read your first tag and observe `dataEVT` flowing on the MDM hybrid topic.
- **Quadrant.** 📗 Tutorial.
- **Outline.**
  - Subscribe to the data topic on MDM.
  - Issue `control_operation start`.
  - Bring a tag near the antenna; watch dataEVT.
  - Issue `control_operation stop`.
- **Drafted content.**

  **By the end of this tutorial,** you will see live `dataEVT` JSON payloads streaming from your reader as you wave EPC Gen2 tags past the antenna.

  **Prerequisites.** §6.1 complete. You have at least one EPC Gen2 RFID tag.

  **Steps.**

  1. On the MDM hybrid endpoint, RFID data flows on the topic `zebra/MDM/clients/rfid/<your_serial>`. In MQTTX, subscribe to that exact topic (or to the wildcard `zebra/MDM/clients/#`).
  2. In the Publish pane, send a flattened `start`:

     ```json
     {
       "command": "start",
       "requestId": "start_inventory_001"
     }
     ```

  3. Wait for the response on `zebra/MDM/clients/resp/<your_serial>` confirming `response.code: 0`.
  4. Hold a tag within 1–3 metres of the antenna and press the trigger (or wait if the profile is set to immediate start).
  5. Within a fraction of a second, `dataEVT` payloads flood your subscription. Each payload contains a `tagData[]` array with one or more tags, each tag carrying `epc`, `rssi`, and `seenCount` at minimum (more fields if `tagMetaDataToEnable` includes them).
  6. To stop:

     ```json
     {
       "command": "stop",
       "requestId": "stop_inventory_001"
     }
     ```

  **Confidence closure.** You have closed the loop: a tag in the air → RF singulation → `dataEVT` JSON on an MQTT topic. From here you can scale up — split CTRL and DATA endpoints, choose a different profile, add post-filters, integrate with your application.

---

### §6.3 Tutorial — Your first secure deployment (TLS, certificates, validation)

- **Purpose.** Promote a working unencrypted deployment to TLS without losing connectivity.
- **Quadrant.** 📗 Tutorial.
- **Outline.**
  - Install CA cert via 123RFID Desktop or test utility.
  - Reconfigure endpoint with MQTT_TLS, port 8883, verificationType.
  - Reboot, observe reconnect, validate.
- **Drafted content.**

  **By the end of this tutorial,** your sled will be communicating with the broker over TLS on port 8883 with a verified peer certificate.

  **Prerequisites.** §6.1 complete. A broker that accepts TLS on port 8883 (Mosquitto, HiveMQ, AWS IoT Core, etc.). The broker's CA certificate in PEM format.

  **Steps.**

  1. Install the CA certificate. Via 123RFID Desktop: connect over USB → *Configure → Certificates* → upload PEM. Alternatively, via the IOTC_DataCtrlUtil utility's *Add Certificates* section.
  2. Reconfigure the endpoint to use TLS. In 123RFID Desktop: select the endpoint → change **Protocol** to `MQTT_TLS` → change **Port** to `8883` → set **Host Verify** appropriately (see §17.2). In the **Security Params** section, point `caCertificateFile` at the file you uploaded.
  3. Save and reboot the sled.
  4. In MQTTX, set up a new TLS connection to the broker (use the broker's TLS port; load CA cert if needed). Subscribe to the wildcard topic.
  5. Within seconds, observe a fresh `mqttConnEVT.CONNECTED` arriving on the TLS connection.

  **Confidence closure.** Your endpoint is now mutually verified. Repeat for additional endpoints. Plan certificate rotation (see §19.2) before expiry.

---

### §7.1 How to discover and connect a reader in 123RFID Desktop

- **Purpose.** Procedure to physically connect a sled to 123RFID Desktop.
- **Quadrant.** 📙 How-to.
- **Outline.** Discover → choose connection type (BT or USB) → select reader → connect → verify.
- **Drafted content.**

  Use this procedure when the sled is physically in front of you and you need a working 123RFID Desktop session.

  1. Open **123RFID Desktop**.
  2. Click **FIND READERS**.
  3. Choose connection type: USB cable (recommended for first-time provisioning) or Bluetooth (for already-paired sleds).
  4. Pick your sled from the discovered list. The serial number on screen must match the serial printed on the device.
  5. Click **CONNECT** next to the entry. Wait for the sled to appear in the upper *Connected Readers* list.

  **Troubleshooting.** If the sled never appears, see FM-DEV-01 in §26.

---

### §7.2 How to verify MQTT connectivity using MQTTX

- **Purpose.** Independently verify the broker is receiving traffic from your sled.
- **Quadrant.** 📙 How-to.
- **Outline.** Open MQTTX → connect to the broker → subscribe to wildcard → watch for `mqttConnEVT` and any heartbeat.
- **Drafted content.**

  Use this procedure when you cannot tell whether the sled is talking to the broker.

  1. Open **MQTTX**. Create or open a connection pointing at the broker URL and port your sled was configured with.
  2. Subscribe to `<tenantId>/<userPath>/#` — e.g., `zebra/MDM/clients/#`.
  3. Wait up to one heartbeat interval (default 100 s, but configurable). You should see either an `mqttConnEVT` (on connect) or a `heartBeatEVT`.
  4. If nothing arrives, check the broker logs; check whether the sled actually joined Wi-Fi; check that `tenantId` and topic path match exactly.

---

### §7.3 How to validate endpoint configuration

- **Purpose.** Confirm the sled holds the endpoint configuration you intended.
- **Quadrant.** 📙 How-to.
- **Outline.** Send `get_endpoint_config` → inspect response → reconcile fields.
- **Drafted content.**

  1. On your active command topic, publish:

     ```json
     {
       "command": "get_endpoint_config",
       "requestId": "verify_ep_001",
       "endpointName": "Primary_MDM_Broker"
     }
     ```

  2. The reader responds on the response topic with the full endpoint object: `epType`, `protocol`, `url`, `port`, `tenantId`, `mqttParams`, `securityParams`, `eventConfiguration`.
  3. Compare against your intended configuration; reconcile any drift with a `config_endpoint` (operation `MODIFY`).

---

### §7.4 How to confirm tag data flow on the data topic

- **Purpose.** Verify `dataEVT` is flowing on the correct topic at the expected rate.
- **Quadrant.** 📙 How-to.
- **Outline.** Subscribe → start → wave tag → check timing and topic.
- **Drafted content.**

  1. Subscribe to the data topic. On the MDM hybrid endpoint, that is `zebra/MDM/clients/rfid/<serial>`. On a dedicated DATA endpoint, it is the data topic configured for that endpoint (e.g., `zebra/DATA/clients/data1event/<serial>`).
  2. Send `control_operation start`.
  3. Bring a known tag into the field.
  4. Confirm `dataEVT` payloads arrive on the expected topic, at an expected cadence, with the expected fields.
  5. Stop with `control_operation stop`.

---

### §7.5 How to recover from initial-setup failures

- **Purpose.** A short triage for common bootstrap failures.
- **Quadrant.** 📙 How-to.
- **Outline.** Decision tree by symptom.
- **Drafted content.**

  - **Sled never appears in 123RFID Desktop.** USB cable working? Driver installed? Sled charged? If all yes, see FM-DEV-01.
  - **Sled is in 123RFID Desktop but Wi-Fi join fails.** SSID exact? Passkey correct? Security protocol matches? Hidden SSID? Reattempt with `Enter SSID` for hidden networks.
  - **Wi-Fi joined but no `mqttConnEVT` on the broker.** Broker IP reachable from the sled's network? `tenantId` matches subscription path? Subnet routes broker port (1883/8883)?
  - **`mqttConnEVT.CONNECTED` arrives but commands receive no response.** Subscription target topic matches the response topic? `requestId` echoed?
  - **Commands work but `dataEVT` not flowing.** Profile is not `FAST_READ` (FAST_READ does not emit data)? `control_operation start` was acknowledged? Tag is in range? `tagMetaDataToEnable` fields configured?

  Detailed playbooks live in §27.

---

## Unit 3 — Connectivity and Infrastructure

### §8.1 MQTT publish/subscribe semantics in the IOTC context

- **Purpose.** Apply pub/sub theory specifically to the IOTC.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Pub/sub recap (one-paragraph).
  - How the reader uses pub/sub: subscribes to command, publishes everything else.
  - How the application uses pub/sub: publishes commands, subscribes to responses/events/data.
  - LWT (Last Will and Testament).
- **Drafted content.**

  MQTT is pub/sub. In the IOTC, two parties use it in mirror-image ways.

  - **The reader subscribes** to its configured command topic. It **publishes** to its configured response, event, and data topics.
  - **The application subscribes** to the configured response, event, and data topics. It **publishes** to the configured command topic.

  Two implications. First, the reader and application have *no direct relationship* in MQTT. They only meet at the broker, on topics. Second, MQTT does not enforce any request/response pairing — only `requestId` does (see §2.6).

  **LWT (Last Will and Testament).** When the reader connects, it can register a Last Will message with the broker. If the reader disconnects ungracefully, the broker publishes that LWT on a configured topic — typically the same family of topics as `MDM/clients/rfid` or `MDM/clients/event`. Your application can subscribe to the LWT topic and learn of a reader's silent death. The Zebra IoT Connector Getting Started Guide shows the LWT publish slot inside `publishTopics` on the endpoint.

---

### §8.2 Topic hierarchy — the `<tenantId>/<userTopic>/<serialNumber>` model

- **Purpose.** Make the topic-construction rule explicit and refer to it from everywhere.
- **Quadrant.** 📘 Explanation + 📕 Reference.
- **Outline.**
  - The three-part topic structure.
  - Worked example.
  - Subscribe-side wildcards.
  - Comparison: hybrid MDM vs split CTRL/DATA topics.
- **Drafted content.**

  IOTC topics are constructed dynamically:

  ```
  <tenantId>/<userConfiguredPath>/<serialNumber>
  ```

  - **`<tenantId>`** is the namespace identifier you set on the endpoint (e.g., `zebra`). All readers in the same tenancy share this prefix.
  - **`<userConfiguredPath>`** is the path you set on the endpoint (e.g., `MDM/clients/cmnd`). You set it once; the reader uses it forever.
  - **`<serialNumber>`** is the sled's serial number (e.g., `RFD40-212735201D0053`). The reader appends this automatically at publish time. Without the serial, the reader cannot tell what to listen on; with it, it discriminates by identity.

  **Worked example.** Configure an MDM endpoint with `tenantId = zebra`, command topic `MDM/clients/cmnd`. After the sled boots and connects, the reader publishes from / subscribes to:

  - Subscribe (commands): `zebra/MDM/clients/cmnd/RFD40-212735201D0053`
  - Publish (responses): `zebra/MDM/clients/resp/RFD40-212735201D0053`
  - Publish (events): `zebra/MDM/clients/event/RFD40-212735201D0053`
  - Publish (RFID data): `zebra/MDM/clients/rfid/RFD40-212735201D0053`

  **Wildcards.** Use `#` to subscribe to everything below a path. `zebra/MDM/clients/#` catches all MDM traffic from all readers. Use `+` to match exactly one segment. `zebra/MDM/clients/event/+` catches events from any reader (the `+` matches one serial).

  **Hybrid MDM vs split CTRL/DATA.** On the MDM hybrid endpoint, all four interfaces share one user path (`MDM/clients/...`). When you split into CTRL and DATA, you have two endpoints with two distinct user paths (e.g., `CTRL/clients/...` and `DATA/clients/...`). Both still get the `<tenantId>` prefix and `<serialNumber>` suffix.

---

### §8.3 QoS behavior — what the sled guarantees and what it does not

- **Purpose.** Make QoS choice operational.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Three QoS levels recap.
  - The IOTC's per-topic QoS configurability.
  - The reader's QoS choice on publish.
  - Backpressure and dropped messages.
- **Drafted content.**

  MQTT defines three QoS levels (see §0.2). Per IOTC endpoint, you set the QoS for each publish topic and each subscribe topic independently in `mqttParams.publishTopics[*].qos` and `mqttParams.subscribeTopics[*].qos`.

  | Setting | Effect |
  |---|---|
  | `cmnd` topic QoS 0 | Commands may be lost without notice |
  | `cmnd` topic QoS 1 | Broker retries delivery to reader; reader may receive duplicates |
  | `resp` topic QoS 0 | Responses may be lost; your code must handle silent commands |
  | `event` topic QoS 1 | Alerts are durably delivered to subscribers that are online |
  | `rfid` topic QoS 0 | Maximum throughput, minimum overhead, occasional loss |
  | `rfid` topic QoS 1 | Acknowledged delivery; tag events buffered if broker is busy |
  | Any topic QoS 2 | Four-step handshake, highest latency, exactly-once guarantee — use rarely |

  **The IOTC's guarantee.** The IOTC respects the QoS you configure end-to-end between sled and broker. It does **not** guarantee end-to-end between sled and application — that depends on broker delivery to the application's subscription.

  **Backpressure.** If the broker is slow, the reader buffers `dataEVT` in the 150,000-event retention buffer. Once the buffer fills, the oldest events are dropped to make room for the newest. Plan QoS choice and broker sizing accordingly.

---

### §8.4 Session persistence — clean session vs persistent

- **Purpose.** Explain the cleanSession setting and its consequences.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - cleanSession = true (fresh start each connect).
  - cleanSession = false (broker retains subscriptions and queued QoS 1/2 messages).
  - IOTC recommendation per endpoint type.
- **Drafted content.**

  `mqttParams.cleanSession` controls what the broker remembers about a client across disconnect/reconnect.

  - **`true`** — the broker discards subscriptions and any queued QoS 1/2 messages when the client disconnects. On reconnect, the client must resubscribe. Use for stateless transient connections.
  - **`false`** — the broker keeps subscriptions and queued messages. On reconnect, the client picks up where it left off. Use for long-lived production sessions where occasional disconnect is normal.

  **IOTC recommendation.** For production MDM, CTRL, and DATA endpoints, set `cleanSession: false`. For temporary diagnostic endpoints and test brokers, `cleanSession: true` is fine.

---

### §8.5 Reconnect semantics — `reconnectDelayMin` and `reconnectDelayMax`

- **Purpose.** Explain the reader's auto-reconnect backoff.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Exponential backoff bounded by min and max.
  - Default values.
  - Implication for incident recovery.
- **Drafted content.**

  When the reader detects MQTT disconnection, it auto-reconnects. The retry delay starts at `reconnectDelayMin` seconds and roughly doubles with each failed attempt, capped at `reconnectDelayMax` seconds. Typical defaults: 5 and 512.

  **Implication.** After a broker outage, readers do not all storm the broker at once at recovery (because each is at a different point in its backoff curve). However, if your incident extends past `reconnectDelayMax`, readers reconnect once the broker is healthy at a predictable pace. Plan broker capacity to absorb a single reconnect burst of one-per-`reconnectDelayMax` from your fleet.

  Tune `reconnectDelayMax` down for development (fast iteration) and up for production (kinder to brokers).

---

### §8.6 Delivery guarantees and limitations

- **Purpose.** Summarize what the IOTC delivers reliably and what it does not.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Retention buffer (150k events, 500 TPS flush).
  - Batching (group events per publish).
  - What is not buffered.
  - Loss patterns to expect.
- **Drafted content.**

  **What is buffered.** Tag data events. If the broker is unreachable, the sled holds up to 150,000 `dataEVT` payloads in its retention buffer. When the broker comes back, the buffer flushes at up to 500 events per second until empty.

  **What is not buffered.** Heartbeats, alerts, MQTT connection events, command responses. These are time-sensitive and lose value as they age; the IOTC does not store them across disconnections.

  **Batching.** If `batching` is enabled in `eventConfiguration`, multiple tag reads are grouped into a single `dataEVT` payload. Batching reduces network overhead and reader CPU; the cost is per-tag latency increases by up to the batch interval.

  **Loss patterns to expect.** If you observe systematic gaps in `dataEVT` timestamps, suspect either (a) the buffer briefly overflowed during a longer-than-`(150000 / TPS)` outage, or (b) `FAST_READ` mode is enabled and is silently not emitting events.

---

### §9.1 The four interface roles

- **Purpose.** Restate the four interface roles from §2.2 in the context of endpoint design.
- **Quadrant.** 📘 Explanation.
- **Outline.** Brief recap, then implications for endpoint configuration choices.
- **Drafted content.**

  See §2.2 for the role definitions. In endpoint design terms:

  - **Management** wants reliable command delivery and quick response. QoS 1 typical.
  - **Event** wants durable delivery for alerts (QoS 1) and tolerable loss for heartbeats (QoS 0 acceptable).
  - **Control** wants the lowest possible latency for start/stop. QoS 1; small payloads.
  - **Data** wants throughput. QoS 0 typical; sometimes 1; rarely 2.

  Choose your endpoint topology (hybrid vs split) to match these workload profiles. See §9.2 and §9.3.

---

### §9.2 The MDM hybrid endpoint — your bootstrap default

- **Purpose.** Explain what 123RFID Desktop ships as the default and why.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - What MDM is (Mobile Device Management semantics).
  - The four-in-one nature of the hybrid endpoint.
  - When the hybrid is enough; when to split.
- **Drafted content.**

  On every Premium and RFD90 sled, 123RFID Desktop's first-time bootstrap creates a single **MDM hybrid endpoint** that carries all four IOTC interface roles on one broker connection.

  Its topic family is `<tenantId>/MDM/clients/{cmnd,resp,event,rfid}/<serial>`. Commands ride `cmnd`; responses on `resp`; alerts and events on `event`; tag data on `rfid`. All four use the same broker, the same TLS context, the same tenant.

  This is the right default for three reasons.

  - It minimizes the surface area for first-time errors. One broker, one credential, one TLS context.
  - It works for SOTI Connect, 42Gears SureMDM, and most MDMs — these expect an "MDM" endpoint type and provision it for you.
  - It is enough for development and small fleets.

  Split into separate CTRL and DATA endpoints when one of the following holds.

  - **Different brokers.** Control plane on a cloud MDM broker; data plane on a high-throughput regional broker.
  - **Different QoS strategies.** Control plane QoS 1, data plane QoS 0 for tag-event throughput.
  - **Different retention policies.** Control plane keeps no buffers; data plane keeps the retention buffer.
  - **Different tenancies or accounts.** Multi-broker billing or routing isolation.

  Splitting is reversible. You can revert to MDM hybrid by deleting the CTRL/DATA endpoints and re-activating the MDM endpoint.

---

### §9.3 Splitting hybrid into CTRL and DATA

- **Purpose.** Walk through the conceptual move from a single MDM endpoint to two specialized endpoints.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - The split topology (one MDM still required, plus CTRL, plus DATA).
  - Order of operations.
  - The phantom RF90_DATA_BROKER trap (see §9.6).
- **Drafted content.**

  The split topology has three endpoints.

  - **MDM endpoint.** Retained for management commands (`get_config`, `set_config`, `firmware_update`) and reader-wide events (heartbeats, alerts, mqttConnEVT).
  - **CTRL endpoint.** Carries RFID control commands (`set_operating_mode`, `control_operation`, `set_post_filter`) and their responses.
  - **DATA endpoint** (`DATA_EP1`). Carries the high-throughput `dataEVT` stream.

  Order of operations.

  1. Free the phantom `RF90_DATA_BROKER` slot if present (see §9.6 and §27.5).
  2. Send `config_endpoint` with `operation: ADD` for the CTRL endpoint, then for the DATA endpoint. Each gets its own URL, topics, and QoS.
  3. Activate the new endpoints.
  4. Reboot to apply.

  After reboot, the application subscribes to *three* sets of topics: MDM event/resp, CTRL event/resp, DATA data1event. Commands route to the right command topic per interface.

---

### §9.4 Endpoint dependency rules

- **Purpose.** Constrain how endpoints can be combined.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Max 10 endpoints, max 2 active data pipes.
  - Each epType has expected roles.
  - Some types cannot coexist without conflict.
- **Drafted content.**

  Three rules constrain endpoint configuration on RFD40/RFD90.

  - **Maximum 10 saved endpoints.** Beyond this, new `config_endpoint ADD` operations fail.
  - **Maximum 2 active data pipes** (one DATA_EP1 currently enabled; DATA_EP2 in a future firmware release).
  - **Roles are not freely combinable.** An MDM hybrid endpoint cannot coexist as the *only* endpoint *and* have a separate CTRL or DATA endpoint claiming the same role.

  Practical guidance:

  - One MDM endpoint + zero, one, or two DATA endpoints + zero or one CTRL endpoint is a valid topology.
  - One MDM hybrid endpoint alone is a valid topology.
  - One CTRL + one DATA + no MDM is **not** recommended — you lose management plane.

---

### §9.5 Topic routing semantics

- **Purpose.** Describe how the reader decides which endpoint a published message takes.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - One direction per epType.
  - The reader's lookup table.
  - What happens when topics are misconfigured.
- **Drafted content.**

  When the reader has multiple endpoints active, every message it publishes goes through the endpoint whose `epType` matches the message family.

  - Commands → endpoint with role MGMT or CTRL.
  - Responses → endpoint with role MGMT or CTRL (paired with the command).
  - Alerts / heartbeats / mqttConn → endpoint with role MGMT_EVT (or MDM for hybrid).
  - Tag data → endpoint with role DATA1 (or DATA2 if enabled, or MDM for hybrid).

  If two endpoints claim overlapping roles, behavior is undefined; the IOTC may pick the first matching endpoint, the most recently activated, or a deterministic one depending on firmware version. Validate empirically before relying on a specific tiebreaker.

  **What happens when topics are misconfigured.** If you forget to subscribe to a topic on the application side, the reader still publishes — the messages are silently lost. The reader does not know whether anyone is listening.

---

### §9.6 The hidden `RF90_DATA_BROKER` slot

- **Purpose.** Surface the known phantom endpoint that occupies a data-pipe slot on factory-fresh sleds.
- **Quadrant.** 📘 Explanation + 🩺 Failure Mode.
- **Outline.**
  - What the phantom is.
  - Where you discover it (failing to add a new DATA endpoint).
  - How to delete it (see §27.5 for the procedure).
- **Drafted content.**

  Factory-fresh RFD40 and RFD90 sleds ship with a hidden, pre-configured endpoint named `RF90_DATA_BROKER`. It occupies one of the two available DATA-pipe slots. If you try to add a new DATA endpoint without removing this phantom first, your `config_endpoint ADD` will fail with a slot-exhaustion error.

  You will discover this exactly once per sled — usually when you migrate from the MDM hybrid endpoint to a dedicated DATA endpoint (per §9.3). The Zebra IoT Connector Getting Started Guide calls this out explicitly:

  > *"Factory defaults often include a hidden `RF90_DATA_BROKER` taking up a slot. You must delete it first before adding a new one."*

  The procedure is in §27.5 *RP-05 — Free the phantom RF90_DATA_BROKER slot.*

---

### §9.7 Native MQTT payloads vs OpenAPI-rendered schemas

- **Purpose.** Settle the schema-vs-runtime mismatch for any future reader.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - The mismatch in one paragraph (see also §3.4).
  - Two side-by-side examples (one schema, one native).
  - Authoring rule for every Reference page in Unit 10.
- **Drafted content.**

  See §3.4 for the conceptual framing. This page is the authoritative reference for authors of the API reference pages in Unit 10.

  **Schema-rendered example** (as it might appear in OpenAPI rendering):

  ```json
  {
    "ctrlOprPayload": {
      "params": { "operation": "start" }
    }
  }
  ```

  **Native MQTT example** (what the sled accepts):

  ```json
  {
    "command": "start",
    "requestId": "start_inventory_001"
  }
  ```

  **Authoring rule.** Every Reference page (Unit 10) must show the *native MQTT* payload as the primary example. The OpenAPI rendering may be cross-linked but must not be the primary contract. Where the two differ, a `> Schema vs Runtime` callout cites the difference.

---

### §10.1 How to configure an MQTT broker connection

- **Purpose.** Procedure to wire a sled to a broker for the first time.
- **Quadrant.** 📙 How-to.
- **Outline.** Choose broker → install if needed → confirm port → set credentials.
- **Drafted content.**

  1. Choose a broker (Mosquitto for local dev; HiveMQ, AWS IoT Core, Azure IoT Hub, SOTI Connect for production).
  2. Install or provision; confirm the broker accepts TCP on 1883 (plaintext) or TLS on 8883.
  3. In 123RFID Desktop or via `config_endpoint`, set the endpoint's `url`, `port`, `tenantId`, and `mqttParams.username` / `password` if your broker requires authentication.
  4. For TLS, set `protocol: MQTT_TLS`, `port: 8883`, and the certificate path under `securityParams`.
  5. Save and reboot (for first-time configuration) or `set_config` (for runtime change to an already-active endpoint).

---

### §10.2 How to configure endpoint mappings (Hybrid · CTRL · DATA)

- **Purpose.** Procedure to set up the three common topologies.
- **Quadrant.** 📙 How-to.
- **Outline.** Hybrid-only, then split-DATA, then full split.
- **Drafted content.**

  **Topology 1 — MDM hybrid only.** Default; created by 123RFID Desktop on first run. Nothing to configure beyond §10.1.

  **Topology 2 — MDM + DATA.** Keep the MDM endpoint as is; add a DATA_EP1 endpoint. First free the phantom slot (§27.5). Then `config_endpoint ADD` with `epType: DATA`, your data topics, and your broker URL.

  **Topology 3 — MDM + CTRL + DATA.** As Topology 2, plus add a CTRL endpoint with `epType: CTRL` and its own command/response topics. Activate all three; reboot.

---

### §10.3 How to configure reconnection policies

- **Purpose.** Tune `reconnectDelayMin` / `reconnectDelayMax`.
- **Quadrant.** 📙 How-to.
- **Outline.** Default → dev tuning → production tuning.
- **Drafted content.**

  In `mqttParams`, set `reconnectDelayMin` (seconds) and `reconnectDelayMax` (seconds).

  - **Development.** `reconnectDelayMin: 1`, `reconnectDelayMax: 10`. Fast iteration.
  - **Production.** `reconnectDelayMin: 5`, `reconnectDelayMax: 512`. Kind to brokers under sustained outage.

  Apply via `config_endpoint MODIFY`; reboot or rely on the next reconnect to pick up the change (varies by firmware).

---

### §10.4 How to validate topic routing

- **Purpose.** Confirm a multi-endpoint deployment routes traffic correctly.
- **Quadrant.** 📙 How-to.
- **Outline.** Send representative messages → observe which topics receive them.
- **Drafted content.**

  1. With all endpoints active, send a `get_status` command. Expect the response on the MDM/MGMT response topic, *not* on the CTRL response topic.
  2. Send `control_operation start`. Expect the response on the CTRL response topic.
  3. Start an inventory; expect `dataEVT` on the DATA topic, *not* on the MDM `rfid` topic.
  4. Trigger an alert (e.g., disable Wi-Fi to force a network event); expect `alertsEVT` on the MGMT_EVT topic.

  Mismatch indicates a topic configuration error.

---

### §11.1 How to integrate with AWS IoT Core

- **Purpose.** Endpoint configuration specifically for AWS IoT Core.
- **Quadrant.** 📙 How-to.
- **Outline.** Provision a thing → policy → certificate → endpoint URL → reader config.
- **Drafted content.**

  AWS IoT Core requires per-device certificates and a Thing Policy.

  1. In the AWS Console: Create a *Thing* per reader, named by serial number. Attach an MQTT-allowed Policy (publish/subscribe scoped to your tenant prefix). Generate device certificates; download the AWS Root CA, the device cert, and the device key.
  2. In 123RFID Desktop: install the AWS Root CA and the device cert/key onto the sled.
  3. Configure an endpoint with: `url = your-aws-iot-endpoint.iot.<region>.amazonaws.com`, `port = 8883`, `protocol = MQTT_TLS`, `verificationType = VERIFY_HOST_PEER`, certificate paths in `securityParams`.
  4. Save, reboot, verify `mqttConnEVT.CONNECTED`.

---

### §11.2 How to integrate with Azure IoT Hub

- **Purpose.** Endpoint configuration for Azure IoT Hub.
- **Quadrant.** 📙 How-to.
- **Outline.** Provision a device → SAS token or certificate → endpoint URL → reader config.
- **Drafted content.**

  Azure IoT Hub accepts MQTT with SAS token auth or X.509 certificate auth.

  1. In Azure Portal: create an IoT Hub if needed. Register a device per reader (by serial number). Generate either a SAS token or an X.509 certificate.
  2. In 123RFID Desktop: install the Azure Root CA. If using X.509 auth, also install the device cert/key.
  3. Configure endpoint with: `url = <hub>.azure-devices.net`, `port = 8883`, `protocol = MQTT_TLS`, username `<hub>.azure-devices.net/<deviceId>/?api-version=2021-04-12`, password = SAS token (if SAS auth).
  4. Topic structure follows Azure's reserved topic conventions for IoT Hub MQTT; cross-reference Azure docs.

---

### §11.3 How to implement high availability across brokers

- **Purpose.** Plan and configure HA on the broker side from the sled's perspective.
- **Quadrant.** 📙 How-to.
- **Outline.** Active/passive vs active/active brokers, DNS, certificate considerations.
- **Drafted content.**

  Approach A: Active/passive broker with single DNS name. The sled connects to `broker.example.com`. Your DNS or load balancer fails the name over to a healthy broker. The sled experiences a disconnect/reconnect; the application sees a gap; the retention buffer drains.

  Approach B: Active/active brokers with shared subscriptions. Requires broker-side cluster (HiveMQ, EMQX clusters). Sleds connect to `broker.example.com`; the cluster handles synchronization.

  Certificate considerations: TLS handshakes the new broker's certificate must validate; either share certificates across cluster nodes or use a wildcard.

---

### §11.4 How to support multi-broker — split CTRL and DATA across brokers

- **Purpose.** Wire the same sled to two brokers.
- **Quadrant.** 📙 How-to.
- **Outline.** Two endpoint configs → independent broker URLs → independent credentials.
- **Drafted content.**

  Configure two endpoints with different `url` values.

  - CTRL endpoint on `control-broker.example.com:8883`.
  - DATA endpoint on `data-broker.example.com:8883`.

  Each endpoint has its own credentials, TLS context, topics, and QoS. The sled holds two MQTT TCP/TLS sessions. Bandwidth and battery cost roughly double compared with a single hybrid endpoint; choose only if your scale justifies it.

---

### §11.5 How to build event pipelines

- **Purpose.** Send IOTC events into downstream analytics or storage.
- **Quadrant.** 📙 How-to.
- **Outline.** Subscribe consumer → fan out to Kafka / Kinesis / Event Hubs / Pub/Sub → archive.
- **Drafted content.**

  1. Subscribe a downstream consumer to the event and data topics.
  2. Forward into a streaming backbone — Apache Kafka, AWS Kinesis, Azure Event Hubs, Google Pub/Sub — as the appropriate first hop.
  3. Use stream processors (Flink, Spark Streaming, Kafka Streams) to enrich, aggregate, or join with reference data.
  4. Land in OLAP (BigQuery, Snowflake, Redshift) or operational stores (Postgres, MongoDB) as the workload requires.

  Two design hints. First, partition by serial number for stable per-reader ordering downstream. Second, treat the IOTC retention buffer as part of your pipeline — bursts on flush are normal.

---


## Unit 4 — RFID Operations

### §12.1 Operating mode — what it is and what it controls

- **Purpose.** Define operating mode in IOTC terms and what knobs it exposes.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - The operating-mode object as the unit of RFID behavior.
  - The seven knobs inside it.
  - How it relates to `control_operation start/stop`.
- **Drafted content.**

  An **operating mode** is the composite configuration object that describes what the sled will do *when reading is active*. Setting an operating mode does not start reading; calling `control_operation start` does. The operating mode is a recipe; the start command turns on the oven.

  The operating-mode object exposes seven knobs.

  | Knob | What it controls | Schema field |
  |---|---|---|
  | **Profile** | The high-level recipe (FAST_READ, CYCLE_COUNT, etc.) | `profiles` |
  | **Radio start conditions** | When the radio begins reading once started | `radioStartConditions` |
  | **Radio stop conditions** | When the radio stops itself | `radioStopConditions` |
  | **Query** | EPC Gen2 query parameters (session, target, tagPopulation, slFlag) | `query` |
  | **Tag metadata to enable** | Which per-tag fields land in `dataEVT` | `tagMetaDataToEnable` |
  | **Access operations** (in ADVANCED) | Read/write tag memory operations | `accessOperations` |
  | **Advanced configurations** (in ADVANCED) | Fine-grained PHY/MAC tuning | `advancedConfigurations` |

  Setting an operating mode is done via `set_operating_mode`; retrieving the current one via `get_operating_mode`. Reading is then triggered by `control_operation start` (RFID controlType) and ended by `control_operation stop`.

---

### §12.2 The seven profiles

- **Purpose.** Enumerate the profiles and the behavior of each.
- **Quadrant.** 📘 Explanation + 📕 Reference.
- **Outline.**
  - Table of seven profiles with parameters and use cases.
  - Critical caveats (FAST_READ, READER_DEFINED).
- **Drafted content.**

  The IOTC supports seven operating-mode profiles on RFD40/RFD90 sleds.

  | Profile | Power (dBm) | Link profile | Session | Use case |
  |---|---|---|---|---|
  | **FAST_READ** | 30 | FM0 640K | S0 | Maximum read rate in short range; **does not emit `dataEVT`** — radio benchmarking only |
  | **CYCLE_COUNT** | 30 | M4 240K | S2 | Counting unique tags in a known population (cycle-count inventories) |
  | **DENSE_READERS** | 30 | M4 256K | S1 | Operating among other active readers; resists interference |
  | **OPTIMAL_BATTERY** | 24 | M4 240K | S1 | Long shifts; trades read rate for battery life |
  | **BALANCED_PERFORMANCE** (default) | 27 | M4 240K | S1 | General-purpose; the right choice when in doubt |
  | **READER_DEFINED** | n/a | n/a | n/a | Reserved profile — defers all settings to the reader's defaults |
  | **ADVANCED** | configurable | configurable | configurable | Full control of `advancedConfigurations` (power, link profile, session, dynamic power) and `accessOperations` |

  **Critical caveats.**

  - **FAST_READ does not emit `dataEVT`.** It exists to demonstrate the radio's singulation ceiling. Use it for benchmarking, not production capture.
  - **READER_DEFINED** is a *reserved* profile name. Behavior is firmware-dependent; treat it as "I want whatever the firmware deems default" and confirm empirically.
  - The schema's `profiles` enum may also list values not yet implemented in some firmware revisions. Always confirm via `get_operating_mode` after `set_operating_mode`.

  Choose your profile with §13.2's decision matrix.

---

### §12.3 EPC Gen2 sessions, link profiles, and tag population estimates

- **Purpose.** Explain the three Gen2 concepts every IOTC integrator must know.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Sessions S0–S3 and tag persistence.
  - Link profiles (Miller mode, BLF, Tari).
  - Tag population estimate (Q parameter).
- **Drafted content.**

  Three EPC Gen2 concepts surface throughout the IOTC's RFID configuration.

  **Sessions (S0, S1, S2, S3).** A Gen2 session is a slot in tag memory that tracks whether the tag has already responded to an inventory round.

  - **S0** — tag's inventory flag persists only while the tag is energized. Once you remove RF, the slot resets. Good for fast-cycle environments where every read should report immediately.
  - **S1** — persists for 500 ms–5 s after de-energization. Default for most production profiles. Good for "report each tag once per second-ish."
  - **S2** — persists for 2 s–60 s. Good for cycle-counting where you want to mark a tag "seen" and not see it again for a while.
  - **S3** — persists for 2 s–60 s, independent of S2.

  Profile defaults: FAST_READ → S0; CYCLE_COUNT → S2; everything else → S1.

  **Link profiles.** A Gen2 link profile is a pair of PHY parameters: tag-to-reader encoding (Miller-2/4/8 or FM0) and backscatter link frequency (BLF). Examples in the IOTC profile table: `FM0 640K`, `M4 240K`, `M4 256K`. Higher BLF means faster reads but shorter range and more interference sensitivity.

  **Tag population estimate (the Q parameter).** EPC Gen2 reserves slots for tag responses; Q is the log2 of the slot count. Too few slots and many tags collide and must retransmit; too many and slots go unused. The IOTC surface in `query.tagPopulation` lets you estimate (default 30); the firmware adjusts Q dynamically.

  These three knobs are what `ADVANCED` profile lets you control directly. In any other profile they are set by the profile's defaults.

---

### §12.4 Read rate vs battery vs interference — the canonical tradeoff

- **Purpose.** Make the tradeoff axes explicit so operators can reason about choice.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Three axes; only two can be optimized at once.
  - Profile positioning on the triangle.
- **Drafted content.**

  Every operating-mode decision on a handheld sled trades among three axes.

  - **Read rate.** Tags per second sensed and reported.
  - **Battery.** Time the sled can read before recharging.
  - **Interference tolerance.** Robustness in the presence of other readers, EM noise, dense tag fields.

  No profile maximizes all three. Profile positioning, roughly:

  | Profile | Read rate | Battery | Interference tolerance |
  |---|---|---|---|
  | FAST_READ | ★★★★★ (no events emitted) | ★★ | ★★ |
  | CYCLE_COUNT | ★★★★ | ★★ | ★★★ |
  | DENSE_READERS | ★★★ | ★★ | ★★★★★ |
  | OPTIMAL_BATTERY | ★★ | ★★★★★ | ★★ |
  | BALANCED_PERFORMANCE | ★★★ | ★★★ | ★★★ |
  | ADVANCED | (you decide) | (you decide) | (you decide) |

  Use §13.2 to choose. Use §12.5 to factor handheld-specific constraints.

---

### §12.5 Handheld operational constraints

- **Purpose.** Re-collect the handheld-specific constraints that shape RFID operation.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Single antenna.
  - Battery shifts.
  - Physical trigger.
  - Region.
  - Bluetooth/Wi-Fi mobility.
- **Drafted content.**

  Five constraints make handheld RFID different from fixed RFID. They are all stated in Unit 1; here they are re-collected as they affect day-to-day RFID operation.

  - **Single integrated antenna.** No multi-port logic. Operating-mode configurations that reference antenna ports do not apply.
  - **Battery shifts.** A typical RFD40 battery sustains a working shift; OPTIMAL_BATTERY extends it. Heartbeat verbosity and high-power profiles shorten it.
  - **Physical trigger.** Operators usually start reads by pressing a button. The IOTC's `radioStartConditions` includes a trigger option so the radio runs only while the trigger is held.
  - **Region.** Set out-of-band via 123RFID Desktop (§19.5). If the sled refuses to transmit, region is the first thing to check.
  - **Mobility.** Bluetooth roams between hosts; Wi-Fi roams between APs. The IOTC's retention buffer is designed for this; your downstream pipeline must be too.

---

### §12.6 Tag observation lifecycle

- **Purpose.** Trace one tag from the air to a `dataEVT`.
- **Quadrant.** 📘 Explanation.
- **Outline.** Six stages from §2.8 expanded.
- **Drafted content.**

  See §2.8 for the six-stage path. Per-stage detail:

  - **Singulation.** Gen2 reader-to-tag handshake. The reader issues a Query and a series of QueryRep commands. Tags respond in slots determined by Q.
  - **Pre-filter (Select).** A Gen2 Select command pre-screens which tags may respond. Set via `query` and `selectFilters` on advanced profiles.
  - **Metadata enrichment.** The firmware decides which fields to include per the `tagMetaDataToEnable` map. Some metadata (TID, USER) requires an explicit access operation.
  - **Post-filter (Report).** Configured via `set_post_filter`. ADD, MODIFY, DELETE filter rules with PREFIX / SUFFIX / REGEX patterns, RSSI thresholds, seen-count thresholds, INCLUDE / EXCLUDE behavior.
  - **Retention buffer.** Activated automatically when the broker is unreachable. Holds up to 150,000 events.
  - **Publish.** JSON on the data topic, at the QoS configured for that endpoint.

---

### §12.7 Metadata enrichment — the `tagMetaDataToEnable` matrix

- **Purpose.** Enumerate every metadata field and what it costs.
- **Quadrant.** 📘 Explanation + 📕 Reference.
- **Outline.**
  - Table of fields with semantics, cost, and FAST_READ caveats.
- **Drafted content.**

  | Field | What it carries | Cost | FAST_READ |
  |---|---|---|---|
  | **EPC** | The tag's Electronic Product Code (always present) | None (always read) | n/a (no dataEVT in FAST_READ) |
  | **RSSI** | Received signal strength (dBm) | None (free per singulation) | n/a |
  | **PHASE** | Phase angle (degrees); only valid when reportFilter.duration=0 | None | n/a |
  | **SEEN_COUNT** | Number of times seen since last report | None (counted by firmware) | n/a |
  | **ANTENNA** | Antenna port (always 1 on handhelds; included for parity with fixed readers) | None | n/a |
  | **CHANNEL** | Frequency channel; only valid when reportFilter.duration=0 | None | n/a |
  | **PC** | Gen2 Protocol Control bits | None | n/a |
  | **XPC** | Extended PC bits (if present) | None | n/a |
  | **CRC** | Gen2 CRC bits | None | **Not emitted** |
  | **TID** | Tag Identifier memory bank | **Requires access read** | n/a |
  | **USER** | User memory bank | **Requires access read** | n/a |
  | **MAC** | Tag's MAC address (where supported) | None | n/a |
  | **HOSTNAME** | Reader's hostname injected into the event | None | n/a |

  TID and USER are not free. Reading them requires the radio to issue a Gen2 Read command per tag — additional air time, additional battery. Enable only what your application needs.

---

### §12.8 Pre-filter (Select) vs Post-filter (Report)

- **Purpose.** Disambiguate the two filter classes.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Pre-filter: at the air protocol, before read.
  - Post-filter: in the IOTC daemon, after read.
  - When to use which.
- **Drafted content.**

  Both filter classes exist for one reason: not every tag in your field is one you care about. They achieve the goal at different layers.

  **Pre-filter (Select).** Implemented via the EPC Gen2 Select command issued by the radio before each inventory round. Tags whose memory does not match the Select mask do not respond. The reader never sees them.

  - Use when you want to **save air time and battery** in environments with many tags you don't care about (e.g., a warehouse with tags from many vendors).
  - Configured in `query.selectFilters` (or implicitly by `query.slFlag`).
  - Max 4 pre-filters today (design supports 32).

  **Post-filter (Report).** Implemented in the sled's IOTC daemon after the radio has read a tag. The tag is read; the metadata is enriched; and only then is the filter applied. Filtered tags simply do not get published.

  - Use when you want to **save bandwidth and downstream processing** but don't care about radio efficiency.
  - Configured via `set_post_filter` with `operation: ADD/MODIFY/DELETE`, `matchPatternMethod: PREFIX/SUFFIX/REGEX`, `reportOperation: INCLUDE/EXCLUDE`, RSSI thresholds, and seen-count thresholds.
  - Applies per DATA endpoint (e.g., DATA_EP1).

  **Combined.** Use pre-filters to mask large populations cheaply; use post-filters for fine-grained tuning, RSSI thresholding, regex pattern matching.

---

### §12.9 Reliable stream design

- **Purpose.** Architectural guidance for delivering tag data reliably end-to-end.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - QoS choice per topic.
  - Retention buffer expectations.
  - Batching tradeoffs.
  - Downstream tolerance for bursts.
- **Drafted content.**

  Reliable tag-stream delivery on a handheld involves four layers.

  - **Sled-to-broker.** Use `dataEVT` topic QoS 1 if loss is unacceptable; QoS 0 if throughput trumps loss. The 150k retention buffer covers brief broker outages.
  - **Broker durability.** Configure your broker (or its cluster) for the retention you need. AWS IoT Core does not retain MQTT messages by default; HiveMQ / EMQX / Mosquitto with persistence flags do.
  - **Broker-to-application.** Application subscription QoS must match what the publisher used; otherwise the broker downgrades.
  - **Application processing.** Plan for bursts (the buffer-flush rate is 500 events per second). Use a backpressure-aware consumer.

  **Batching.** If `eventConfiguration.batching` is enabled on the endpoint, multiple tag reads are bundled into one `dataEVT` payload. Reduces network overhead and per-tag broker work. Increases per-tag latency by up to the batch interval. Use for archival ingest, not for real-time UI.

---

### §13.1 How to start and stop a read session

- **Purpose.** Send the two commands.
- **Quadrant.** 📙 How-to.
- **Outline.** start → wait for response → consume dataEVT → stop.
- **Drafted content.**

  1. Publish `{"command":"control_operation","controlType":"RFID","operation":"start","requestId":"..."}` on the CTRL command topic. (Native flattened form; ignore OpenAPI nesting.)
  2. Wait for the response with `response.code: 0` on the CTRL response topic.
  3. Consume `dataEVT` payloads on the DATA topic.
  4. To stop: publish `{"command":"control_operation","controlType":"RFID","operation":"stop","requestId":"..."}`.

  Note. For the simpler hybrid MDM endpoint, the Getting Started Guide shows a shorter form `{"command":"start","requestId":"..."}` and `{"command":"stop","requestId":"..."}`. Both forms are valid in the field; favor the full form when scripting CI integrations against the canonical schema.

---

### §13.2 How to choose the correct operating-mode profile (decision matrix)

- **Purpose.** Make profile choice mechanical.
- **Quadrant.** 📙 How-to + 📊 Decision Support.
- **Outline.** Scenario → recommended profile.
- **Drafted content.**

  | Scenario | Recommended profile | Why |
  |---|---|---|
  | Warehouse cycle count (long shift, known population) | CYCLE_COUNT | S2 prevents repeat reads; trades latency for completeness |
  | Receiving dock (medium throughput, mixed populations) | BALANCED_PERFORMANCE | The default; trades nothing |
  | Multiple readers in the same area | DENSE_READERS | M4 256K and S1 reduce mutual interference |
  | Long shift, infrequent reads, battery-critical | OPTIMAL_BATTERY | 24 dBm transmit power; longest battery |
  | Radio benchmarking, no data capture | FAST_READ | No `dataEVT`; just radio metrics |
  | Tag write or memory-bank access | ADVANCED | Required to expose `accessOperations` |
  | Customer-specific tuning | ADVANCED | Required for `advancedConfigurations` |

  When in doubt, start with BALANCED_PERFORMANCE; switch only if measurement shows a need.

---

### §13.3 How to configure access operations (read/write tag memory)

- **Purpose.** Use the ADVANCED profile to read or write tag memory banks.
- **Quadrant.** 📙 How-to.
- **Outline.** Set ADVANCED → configure accessOperations → start → observe results in dataEVT.
- **Drafted content.**

  1. Set operating mode to `ADVANCED` via `set_operating_mode`. Include in `advancedConfigurations.accessOperations` the read/write operations you need (target bank, offset, length, optional access password).
  2. Start the radio with `control_operation start`.
  3. Read results land in `dataEVT.tagData[*]` under the corresponding bank field (e.g., `TID`, `USER`).
  4. Stop the radio with `control_operation stop`.

  Note. IOTC V1.1 does not yet support tag lock or kill operations.

---

### §13.4 How to configure pre-filters (Select)

- **Purpose.** Filter tags at the air protocol.
- **Quadrant.** 📙 How-to.
- **Outline.** Set operating mode with `query.selectFilters` → start.
- **Drafted content.**

  Pre-filters live inside the operating mode. Edit them via `set_operating_mode`.

  ```json
  {
    "command": "set_operating_mode",
    "requestId": "sel_01",
    "operatingModes": {
      "profiles": "BALANCED_PERFORMANCE",
      "query": {
        "session": "SESSION_1",
        "tagPopulation": 30,
        "selectFilters": [
          { "memoryBank": "EPC", "offset": 32, "value": "B22F" }
        ]
      }
    }
  }
  ```

  Maximum 4 pre-filters today. To clear: omit `selectFilters` in a `set_operating_mode`.

---

### §13.5 How to configure post-filters (Report) — ADD, MODIFY, DELETE

- **Purpose.** Filter tags after read, before publish.
- **Quadrant.** 📙 How-to.
- **Outline.** Use `set_post_filter` operations.
- **Drafted content.**

  ADD a post-filter:

  ```json
  {
    "command": "set_post_filter",
    "requestId": "pf_add_01",
    "postFilter": {
      "operation": "ADD",
      "dataEpType": "DATA_EP1",
      "matchPatternMethod": "REGEX",
      "matchPattern": "B22F",
      "reportOperation": "INCLUDE",
      "rssiThreshold": -88,
      "seenCount": 0,
      "reportDuration": 0
    }
  }
  ```

  MODIFY: same payload with `"operation": "MODIFY"` and the filter's ID.
  DELETE: `{"command":"delete_post_filter","requestId":"...","filterId":"..."}`.
  GET: `{"command":"get_post_filter","requestId":"..."}` returns active filters.

---

### §13.6 Physical trigger button semantics

- **Purpose.** Describe what pressing the trigger physically does.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Trigger as a hardware input.
  - Trigger-driven `radioStartConditions`.
  - Hold-vs-toggle semantics.
- **Drafted content.**

  The physical trigger button on every RFD40/RFD90 is a hardware input the firmware can route to behaviors. The operating mode's `radioStartConditions.trigger` field decides what happens when the trigger is pressed.

  - **`IMMEDIATE`.** Radio starts on `control_operation start` and ignores the trigger. The trigger has no effect.
  - **`TRIGGER_PRESS`.** Radio starts only while the trigger is held. Releasing the trigger stops the radio (subject to `radioStopConditions`).
  - **`TRIGGER_PRESS_TOGGLE`.** First press starts; second press stops; alternates.

  Two notes. First, the trigger is read by the sled's firmware; it does not generate an IOTC event by itself. The application observes the *effect* (a `dataEVT` stream beginning or stopping) but not the press as such. Second, the trigger is a per-sled input; in fleet operations you typically still issue `control_operation start` to put the sled into a state where the trigger has an effect, then let operators drive the actual reads.

---

### §13.7 Software start/stop trigger conditions

- **Purpose.** Document `radioStartConditions` and `radioStopConditions` as reference + how-to.
- **Quadrant.** 📙 How-to + 📕 Reference.
- **Outline.** Enums and example payloads.
- **Drafted content.**

  `radioStartConditions`:

  - `trigger`: `IMMEDIATE`, `TRIGGER_PRESS`, `TRIGGER_PRESS_TOGGLE`, `PERIODIC`.
  - `startDelay`: seconds to wait before starting.
  - `periodicDuration`: if `trigger = PERIODIC`, the interval between starts.
  - `repeat`: whether to keep cycling.

  `radioStopConditions`:

  - `trigger`: `IMMEDIATE`, `TIMEOUT`, `TAG_COUNT`, `INVENTORY_COUNT`.
  - For `TIMEOUT`: `duration` seconds.
  - For `TAG_COUNT`: `count` tags.
  - For `INVENTORY_COUNT`: `count` inventory rounds.

  Example:

  ```json
  "radioStartConditions": { "trigger": "TRIGGER_PRESS" },
  "radioStopConditions":  { "trigger": "TIMEOUT", "duration": 30 }
  ```

  Reader starts when operator pulls the trigger; stops automatically after 30 seconds.

---

### §13.8 How to tune for read rate vs battery vs density (worked scenarios)

- **Purpose.** Worked examples spanning the tradeoff space.
- **Quadrant.** 📙 How-to.
- **Outline.** Three scenarios; what to set.
- **Drafted content.**

  **Scenario A — Highest read rate (development benchmark).**
  - Profile: `FAST_READ` for benchmarking, *but* note no `dataEVT`. For real capture, `CYCLE_COUNT` with S0 instead.
  - Transmit power: 30 dBm.
  - Filters: none.

  **Scenario B — Longest battery (eight-hour shift, sparse reads).**
  - Profile: `OPTIMAL_BATTERY`.
  - Transmit power: 24 dBm.
  - Heartbeat interval: 300 s; disable `inventoryStatus` in heartbeat.

  **Scenario C — Dense multi-reader area (warehouse with 5+ readers).**
  - Profile: `DENSE_READERS`.
  - Session: S1.
  - Consider `query.slFlag: "ALL"` to randomize tag responses.

---

### §13.9 Barcode scanning (current scope and future roadmap)

- **Purpose.** State the truth about barcode control under IOTC today.
- **Quadrant.** 📘 Explanation.
- **Outline.**
  - Hardware supports barcode on Premium/Premium Plus.
  - IOTC does not yet expose barcode start/stop.
  - Today's path: Scanner SDK on host.
- **Drafted content.**

  RFD40 Premium, RFD40 Premium Plus, and RFD9030 variants include integrated 1D/2D barcode scanners. The IOTC currently does not expose Control-interface commands to start or stop barcode scanning. The IOTC Features Guide notes:

  > *"The current system does not allow barcode scanning operations to be executed via control interface commands."*

  Today, control barcode scanning via the **Zebra Scanner SDK** on the host application or via the host OS's intent broadcasts. Plan for IOTC-mediated barcode control in a future firmware release; the schema may grow a `control_operation` with `controlType: SCANNER` to start/stop scans and route results through the Data interface.

---

## Unit 5 — Events, State, and Observability

### §14.1 Event taxonomy

- **Purpose.** Catalogue the event families.
- **Quadrant.** 📘 Explanation.
- **Outline.** Four event roles.
- **Drafted content.**

  IOTC events fall into four families.

  - **Management events.** `heartBeatEVT`, `firmwareUpdateEVT`, `fileDownloadEVT`. Carry whole-device runtime signals.
  - **Alerts.** `alertsEVT`. State changes in monitored signals (battery, temperature, network, firmware, power).
  - **Connection events.** `mqttConnEVT`. Connect/disconnect transitions. Carries the HH:MM:SS timestamp quirk.
  - **Data events.** `dataEVT`. Tag reads.
  - **Last Will and Testament.** `lwtEVT` (or equivalent). Published by the broker on the configured LWT topic when the reader's keepalive expires.

---

### §14.2 Management events — heartbeats, network, firmware, file download

- **Purpose.** Per-event detail.
- **Quadrant.** 📘 Explanation.
- **Outline.** Per-event purpose, trigger, payload highlights.
- **Drafted content.**

  - **`heartBeatEVT`.** Periodic (configurable, default 100 s). Payload carries `deviceStatus` (battery, temperature, radio activity, terminal connection, NTP), optionally `inventoryStatus` (tag count, last seen).
  - **`firmwareUpdateEVT`.** Emitted during and after a `firmware_update` operation. Payload carries `status` (`STARTED`, `DOWNLOADING`, `VERIFYING`, `APPLYING`, `REBOOTING`, `COMPLETED`, `FAILED`) and `progress` (0–100).
  - **`fileDownloadEVT`.** Emitted when the sled downloads a file (firmware, certificate). Payload carries `fileName`, `status`, optional progress.
  - **`networkEVT` / network alert.** Carried inside `alertsEVT.id = NETWORK_EVENT`. State change in IP/DNS/AP association.

---

### §14.3 Data events (`dataEVT`) shape and metadata controls

- **Purpose.** Reference + concept for the dataEVT payload.
- **Quadrant.** 📘 Explanation.
- **Outline.** Payload skeleton, the `data.tagData[]` array, per-field semantics.
- **Drafted content.**

  ```json
  {
    "command": "dataEVT",
    "tenantId": "zebra",
    "sourceSerialNumber": "RFD40-...",
    "data": {
      "tagData": [
        {
          "epc": "...",
          "rssi": -45,
          "seenCount": 3,
          "antenna": 1,
          "channel": 91775,
          "phase": 174,
          "pc": "3000",
          "xpc": "...",
          "tid": "...",
          "user": "...",
          "timestamp": "2026-05-18T12:34:56.123Z"
        }
      ]
    }
  }
  ```

  Fields present depend on `tagMetaDataToEnable`. See §12.7.

---

### §14.4 Heartbeats and alerts — configuration and consumption

- **Purpose.** Practical use of the two operational signals.
- **Quadrant.** 📘 Explanation.
- **Outline.** Heartbeat interval and contents; alert thresholds.
- **Drafted content.**

  **Heartbeat.** Configured in `eventConfiguration.heartbeatConfiguration`. Fields: `interval` (seconds), `inventoryStatus` (bool), `batteryStatus` (bool). Set `interval` short (30 s) for live dashboards; long (300+ s) for battery-sensitive deployments.

  **Alerts.** Configured per type via `eventConfiguration` flags: `battery`, `temperature`, `network`, `firmwareUpdate`, `power`. The IOTC fires `alertsEVT` only for these five `id` values today. Thresholds are firmware-default; not all are exposed for tuning.

---

### §14.5 Event reliability considerations

- **Purpose.** What can go wrong with event delivery.
- **Quadrant.** 📘 Explanation.
- **Outline.** Subscription timing, broker durability, retained messages, LWT.
- **Drafted content.**

  Four reliability gotchas.

  - **Subscribe before reader connects.** Events published before your subscription is in place are lost (unless retained — and the IOTC does not retain most events).
  - **Broker durability matters.** A broker that does not persist messages will lose events for any subscriber that is briefly offline.
  - **Retained messages are not events.** A retained `heartBeatEVT` is the last one the reader published, not the live stream; do not use retained to recover history.
  - **LWT is your offline signal.** If the reader stops emitting heartbeats unexpectedly, the LWT — if configured — gives the broker-validated "this reader is gone" signal.

---

### §15.1 Reader lifecycle

- **Purpose.** State machine for the reader as a whole.
- **Quadrant.** 📘 Explanation.
- **Outline.** Boot → bootstrap → connected → idle/active → reboot.
- **Drafted content.**

  ```
  ┌────────┐      power on        ┌──────────┐    Wi-Fi/USB    ┌──────────────┐
  │  OFF   │ ───────────────────→ │ BOOTING  │ ───────────────→│ BOOTSTRAPPED │
  └────────┘                      └──────────┘                 └──────┬───────┘
                                                                      │ MQTT connect
                                                                      ▼
                                                              ┌───────────────┐
                                                              │  CONNECTED    │
                                                              └──────┬────────┘
                                                                     │
                                                  ┌──────────────────┼──────────────────┐
                                                  ▼                  ▼                  ▼
                                          ┌──────────┐       ┌──────────┐       ┌──────────┐
                                          │  IDLE    │       │ ACTIVE   │       │ ERROR    │
                                          │ (no RFID)│       │ (RFID)   │       └────┬─────┘
                                          └────┬─────┘       └────┬─────┘            │
                                               │  control_op stop  │                 │
                                               │◄──────────────────│                 │
                                               │  control_op start ▲                 │
                                               └──────────────────┘                  ▼
                                                                              ┌──────────┐
                                                                              │ REBOOT   │
                                                                              └──────────┘
  ```

---

### §15.2 MQTT connection lifecycle

- **Purpose.** State machine for the MQTT TCP/TLS session.
- **Quadrant.** 📘 Explanation.
- **Outline.** DISCONNECTED → CONNECTING → CONNECTED → DISCONNECTING → DISCONNECTED.
- **Drafted content.**

  ```
  DISCONNECTED ──TCP open──► CONNECTING ──CONNACK──► CONNECTED ──disconnect──► DISCONNECTING ──► DISCONNECTED
       ▲                                                  │                              │
       └──────────────────keepalive expires───────────────┘                              │
       └────────────────────────reconnect cycle─────────────────────────────────────────┘
  ```

  `mqttConnEVT` is emitted on every transition. Use it to drive your application's connection-aware logic.

---

### §15.3 RFID operation lifecycle

- **Purpose.** State machine for radio activity.
- **Quadrant.** 📘 Explanation.
- **Outline.** IDLE → READY → ACTIVE → IDLE.
- **Drafted content.**

  ```
   IDLE ──set_operating_mode──► READY ──control_operation start──► ACTIVE ──control_operation stop──► IDLE
                                                                      │
                                                                      └── emits dataEVT ─►
  ```

  `IDLE`: no mode set, or mode set but reader not started.
  `READY`: mode set, reader prepared, not yet emitting tag data.
  `ACTIVE`: emitting `dataEVT`.

---

### §15.4 Configuration lifecycle

- **Purpose.** State machine for configuration.
- **Quadrant.** 📘 Explanation.
- **Outline.** Factory → set_config → runtime → saved → reboot.
- **Drafted content.**

  Three scopes:

  - **Factory.** Boot-time defaults.
  - **Saved.** Persists across reboots; written by `set_config` and `config_endpoint`.
  - **Runtime.** Currently in effect.

  Runtime and saved diverge only briefly: after a `set_config` whose effect requires reboot, runtime still reflects pre-change behavior. After reboot, runtime catches up to saved.

  See §18.5 for the list of operations that are reboot-required vs runtime-applied.

---

### §15.5 Firmware lifecycle

- **Purpose.** State machine for `firmware_update`.
- **Quadrant.** 📘 Explanation.
- **Outline.** `firmware_update` → DOWNLOADING → VERIFYING → APPLYING → REBOOTING → idle.
- **Drafted content.**

  ```
  idle ──firmware_update──► DOWNLOADING ──► VERIFYING ──► APPLYING ──► REBOOTING ──► idle (new version)
                                                                         │
                                                                         └── on failure → idle (old version)
  ```

  Every transition emits `firmwareUpdateEVT`. The application can poll `get_firmware_update_status` between events.

---

### §15.6 State drift and reconciliation

- **Purpose.** Discuss when reader state and application's view diverge.
- **Quadrant.** 📘 Explanation.
- **Outline.** Causes (network gaps, reboots, fleet pushes) and the reconcile protocol.
- **Drafted content.**

  State drift occurs whenever the application has a stale model. Three causes.

  - **Network gap.** Application missed events during a disconnect.
  - **Reader reboot.** Reader came back fresh; application still believes old runtime state.
  - **Out-of-band configuration.** Someone changed config via 123RFID Desktop or via an MDM while the application was running.

  **Reconcile protocol on every `mqttConnEVT.CONNECTED`.**

  1. `get_status` — runtime status.
  2. `get_config` — full saved configuration.
  3. `get_operating_mode` — current RFID profile.
  4. `get_post_filter` — active post-filters.
  5. Optionally `get_endpoint_config` for each endpoint name you depend on.

  Update your local model from these responses before resuming normal operation.

---

### §16.1 How to monitor reader health via heartbeats

- **Purpose.** Operational use of `heartBeatEVT`.
- **Quadrant.** 📙 How-to.
- **Outline.** Subscribe → parse → trend over time.
- **Drafted content.**

  1. Subscribe to the event topic (e.g., `zebra/MDM/clients/event/+`).
  2. Filter by `command: "heartBeatEVT"`.
  3. Track `deviceStatus.batteryStatus.chargePercentage`, `.temperature`, `.terminalConnection.status` over time per serial number.
  4. Alert when chargePercentage < 20%, temperature > 50°C, or terminalConnection becomes DISCONNECTED for > 60 s.

---

### §16.2 How to observe operational state via `get_status`

- **Purpose.** On-demand snapshot.
- **Quadrant.** 📙 How-to.
- **Outline.** Send command → parse response.
- **Drafted content.**

  1. Publish `{"command":"get_status","requestId":"..."}` to the command topic.
  2. Response carries `deviceStatus` with: `powerSource` (USB or BATTERY), `radioActivity`, `radioConnection`, `systemTime`, `temperature`, `ntp` (offset, reach), `terminalConnection` (status, type), `batteryStatus`.
  3. Trend across calls or compare to expected.

  Note: `get_status` does **not** return firmware version. Use `get_version` for that.

---

### §16.3 How to trace event flows by `requestId` and serial number

- **Purpose.** Correlate events for incident analysis.
- **Quadrant.** 📙 How-to.
- **Outline.** Subscribe to wildcard → record all → filter by serial → reassemble timeline.
- **Drafted content.**

  1. Subscribe to a wildcard (`<tenantId>/+/clients/+/+`) and log all incoming messages with a high-precision timestamp.
  2. Filter logs by serial number suffix and by `requestId`.
  3. Reassemble the command-to-response causal chain. Cross-reference `mqttConnEVT` timestamps to detect dropped connections.

---

### §16.4 How to detect configuration drift

- **Purpose.** Confirm a fleet's actual config matches intended config.
- **Quadrant.** 📙 How-to.
- **Outline.** Periodic `get_config` → compare to canonical → flag deltas.
- **Drafted content.**

  1. Maintain a canonical configuration document per fleet (or per fleet segment) in your config-management system.
  2. Periodically (e.g., daily) send `get_config` to each reader.
  3. Diff the response against canonical. Ignore non-significant fields (timestamps, IP addresses). Surface significant differences as drift.
  4. Remediate by `set_config` with the canonical configuration, scheduled during a maintenance window.

---

## Unit 6 — Security and Configuration

### §17.1 Authentication models

- **Purpose.** Enumerate auth options.
- **Quadrant.** 📘 Explanation.
- **Outline.** None, username/password, client certificate.
- **Drafted content.**

  IOTC supports three MQTT authentication models, configured per endpoint.

  - **None.** Anonymous connect. Acceptable only for local development brokers.
  - **Username/password.** Set `mqttParams.username` and `mqttParams.password`. The broker validates on CONNECT. Most production brokers (HiveMQ, AWS IoT Core, Azure IoT Hub) support this.
  - **Client certificate (mTLS).** Set `protocol: MQTT_TLS`, install a device certificate in `securityParams`. The broker validates the client cert on TLS handshake. AWS IoT Core requires this by default.

  Combine username/password with TLS for the most common production pattern (TLS for confidentiality, username/password for identity).

---

### §17.2 TLS trust architecture

- **Purpose.** Decode `verificationType` values.
- **Quadrant.** 📘 Explanation.
- **Outline.** Four values; what each verifies.
- **Drafted content.**

  `verificationType` controls what the sled's TLS stack verifies during handshake.

  | Value | Verifies broker cert | Verifies host name in cert | Recommended environment |
  |---|---|---|---|
  | `VERIFY_NONE` | No | No | Local lab only; never production |
  | `VERIFY_PEER` | Yes | No | Dev / staging where hostnames vary |
  | `VERIFY_HOST` | No | Yes | Rare; mostly for pinned-CA setups |
  | `VERIFY_HOST_PEER` | Yes | Yes | **Production** |

  Always end up at `VERIFY_HOST_PEER` for production. Until you get there, you are running an integration that someone with network access could MITM.

---

### §17.3 Credential and certificate lifecycle

- **Purpose.** Plan for cert rotation.
- **Quadrant.** 📘 Explanation.
- **Outline.** Install → use → renew → rotate → revoke.
- **Drafted content.**

  Certificates expire. Plan the rotation calendar before the first cert is installed.

  - **Install.** Via 123RFID Desktop over USB (one device at a time) or via an MDM (fleet-scale).
  - **Use.** The endpoint references the cert by file name in `securityParams.caCertificateFile` / `clientCertificateFile`.
  - **Renew.** Generate a new cert before expiry. Push it under a new file name; update endpoint to reference the new file. Old cert may remain installed until the next clean-up.
  - **Rotate.** A coordinated push of the new cert to every reader; switch endpoints to reference the new cert; verify connections; delete old cert.
  - **Revoke.** If a cert is compromised, push a CRL or OCSP update on the broker side; revoke the device cert; reissue.

  A typical enterprise cycle is yearly with a 30-day overlap window.

---

### §17.4 Tenant isolation via `tenantId`

- **Purpose.** Multi-tenant pattern.
- **Quadrant.** 📘 Explanation.
- **Outline.** tenantId in every topic; broker-side ACL maps tenants to authorized clients.
- **Drafted content.**

  `tenantId` prefixes every topic the sled uses. On a shared broker hosting multiple customers or business units, broker ACLs allow each tenant's clients to publish/subscribe only on their prefix.

  Example. Tenant `acme` publishes/subscribes on `acme/MDM/clients/...`. Tenant `globex` on `globex/MDM/clients/...`. ACLs enforce isolation; even if `acme`'s broker credentials leak, they cannot read `globex` traffic.

  Plan tenant naming carefully — once a sled is deployed, changing its tenantId requires reconfiguration.

---

### §17.5 Security failure modes

- **Purpose.** What can go wrong with auth/TLS and what it looks like.
- **Quadrant.** 📘 Explanation.
- **Outline.** Bad cert, expired cert, wrong hostname, wrong credentials, missing CA.
- **Drafted content.**

  - **Wrong / missing CA cert.** TLS handshake fails. No `mqttConnEVT`. Sled retries per `reconnectDelay*` forever.
  - **Hostname mismatch.** Handshake fails when `verificationType` includes HOST. Diagnose by temporarily lowering to VERIFY_PEER; confirm; then restore.
  - **Expired cert.** Handshake fails. Watch the cert calendar.
  - **Wrong credentials.** CONNECT fails with broker-side authentication error. The sled retries.
  - **Missing client cert (mTLS).** Handshake fails. Confirm certificate file is installed and referenced by name in `securityParams`.

  See §26.8 *FM-SEC* failure modes for diagnosis playbooks.

---

### §18.1 Three configuration scopes — factory · saved · runtime

- **Purpose.** Make explicit the three layers and how they relate.
- **Quadrant.** 📘 Explanation.
- **Outline.** Definitions; transitions.
- **Drafted content.**

  See §15.4. Quick recap:

  - **Factory** = boot-time defaults. Restored by reset.
  - **Saved** = persists across reboots; written by `set_config` and `config_endpoint`.
  - **Runtime** = currently in effect.

  Most configuration is applied at runtime immediately. Some (notably new endpoints) takes effect at the next reboot.

---

### §18.2 Configuration drift

- **Purpose.** Define drift, name its causes, point to detection.
- **Quadrant.** 📘 Explanation.
- **Outline.** Three drift sources; the cost; detection cadence.
- **Drafted content.**

  Drift occurs when the saved configuration on a sled differs from your canonical configuration source of truth. Three common sources.

  - **Local edits via 123RFID Desktop.** A technician changes config in the field; never syncs back.
  - **Partial fleet pushes.** A fleet-wide push fails on some readers; some have new config, some old.
  - **Firmware updates.** New firmware introduces new fields; readers on old firmware accept the same `set_config` but ignore the new fields silently.

  Detection cadence: weekly is reasonable; daily for high-security or high-availability deployments. See §16.4 for the detection how-to.

---

### §18.3 Reconciliation strategies

- **Purpose.** How to bring drifted readers back to canonical.
- **Quadrant.** 📘 Explanation.
- **Outline.** Push canonical; quarantine; reset.
- **Drafted content.**

  - **Push canonical.** Send a `set_config` containing the canonical configuration. Risk: a reboot may be required; sleds may be in the middle of a shift.
  - **Quarantine.** Move drifted readers to a maintenance fleet; their tenant changes; their data flows to a quarantine broker until they pass reconciliation.
  - **Reset to factory.** Last resort. Requires re-provisioning via 123RFID Desktop (Wi-Fi credentials, endpoint, region all need re-pushing).

  Always test reconciliation on a representative sled before pushing to a fleet.

---

### §18.4 Bootstrap constraints

- **Purpose.** Restate what cannot be done over MQTT.
- **Quadrant.** 📘 Explanation.
- **Outline.** Region; first-time Wi-Fi credentials; first-time endpoint.
- **Drafted content.**

  Three things cannot be done over MQTT (because before they are done, there is no MQTT).

  - **Region.** Must be set via 123RFID Desktop over USB.
  - **First-time Wi-Fi credentials.** Path A only — required before the sled can connect at all.
  - **First-time endpoint.** Required so the sled knows which broker to dial.

  After bootstrap, additional Wi-Fi profiles can be added over MQTT via `set_config.wifiConfig` payloads. Region cannot.

---

### §18.5 Reboot-required vs runtime-applied operations

- **Purpose.** Reference table.
- **Quadrant.** 📘 Explanation + 📕 Reference.
- **Outline.** Per-operation reboot-need.
- **Drafted content.**

  | Operation | Reboot required? |
  |---|---|
  | `set_operating_mode` | No — runtime applied |
  | `control_operation start/stop` | No — runtime |
  | `set_post_filter ADD/MODIFY/DELETE` | No — runtime |
  | `set_config` Wi-Fi profile add | Depends — usually picked up at next reassociation |
  | `set_config` endpoint add | **Yes** |
  | `set_config` endpoint modify | Usually yes — confirm with `get_endpoint_config` |
  | `config_endpoint` ADD / MODIFY | **Yes** |
  | `config_endpoint` DELETE | Usually no — broker connection drops immediately |
  | Certificate install | No — referenced by file name at next handshake |
  | `firmware_update` | **Yes** (the update itself reboots) |

  Plan maintenance windows around the reboot-required ones.

---

### §19.1 How to configure TLS for an endpoint

- **Purpose.** Procedure to enable TLS on an existing endpoint.
- **Quadrant.** 📙 How-to.
- **Outline.** Install CA → reconfigure endpoint → verify.
- **Drafted content.**

  1. Install the broker's CA certificate (PEM, PKCS#1 format) via 123RFID Desktop or via the IOTC_DataCtrlUtil utility's *Add Certificates*.
  2. `config_endpoint MODIFY` (or via 123RFID Desktop) the endpoint: change `protocol` to `MQTT_TLS`, `port` to `8883`, `verificationType` to `VERIFY_HOST_PEER`, `securityParams.caCertificateFile` to the file you installed.
  3. Save, reboot.
  4. Watch for fresh `mqttConnEVT.CONNECTED` on the TLS connection.

---

### §19.2 How to install and rotate certificates

- **Purpose.** Procedure for the cert lifecycle.
- **Quadrant.** 📙 How-to.
- **Outline.** Install, verify, rotate, delete.
- **Drafted content.**

  **Install.** Via 123RFID Desktop *Add Certificates* or the test utility. Cert must be PEM, PKCS#1. Note the file name you assign.

  **Verify.** `{"command":"get_installed_certificate","requestId":"..."}` returns the list of installed certificates.

  **Rotate.** Install new cert under a new file name. `config_endpoint MODIFY` to point `securityParams` at the new file. Verify new connection. Delete old: `{"command":"delete_certificate","requestId":"...","certName":"old_cert.pem"}`.

---

### §19.3 How to manage persistent configuration

- **Purpose.** Use `set_config` deliberately.
- **Quadrant.** 📙 How-to.
- **Outline.** Fetch → diff → set → verify.
- **Drafted content.**

  1. `get_config` → store the response as the baseline.
  2. Compute the desired final state.
  3. Build a `set_config` payload using the `configData` field (note the unique field name — `set_config` uses `configData`, not `payload`).
  4. Publish; wait for `response.code: 0`.
  5. Reboot if any reboot-required fields changed (§18.5).
  6. `get_config` again; diff vs intended.

---

### §19.4 How to recover from configuration drift

- **Purpose.** Per-sled recovery.
- **Quadrant.** 📙 How-to.
- **Outline.** Detect (§16.4) → reconcile (§18.3) → verify.
- **Drafted content.**

  1. Identify drifted sled (via §16.4 procedure).
  2. Schedule a maintenance window; ensure the sled is not actively reading.
  3. Push canonical `set_config`.
  4. Reboot if needed.
  5. Re-run `get_config`; confirm match.
  6. Document the reconciliation.

---

### §19.5 How to set the region (out-of-band via 123RFID Desktop)

- **Purpose.** The only way to set region.
- **Quadrant.** 📙 How-to.
- **Outline.** Connect via USB → Configure → Regulatory → choose region → save.
- **Drafted content.**

  1. Connect the sled to a PC via USB.
  2. Open **123RFID Desktop**. Click **FIND READERS** → **CONNECT**.
  3. Navigate to **Configure → Regulatory** (exact menu name depends on 123RFID Desktop version).
  4. Choose the regulatory region from the dropdown (FCC, ETSI, IC, etc.).
  5. Click **Save**.
  6. Disconnect USB; the sled is now permitted to transmit on its region's allowed frequencies.

  There is no MQTT command for this. The `get_current_region` MQTT command reports the region but cannot change it.

---


## Unit 7 — Fleet and Enterprise Operations

### §20.1 Fleet provisioning paths — 123RFID Desktop · SOTI Connect · 42Gears SureMDM

- **Purpose.** Compare the three primary fleet-scale provisioning paths.
- **Quadrant.** 📘 Explanation + 📊 Decision Support.
- **Outline.**
  - One-paragraph each.
  - Comparison table.
- **Drafted content.**

  Three paths bring a fleet of handheld RFID sleds into production.

  - **123RFID Desktop.** Windows desktop tool. One device at a time over USB. Authoritative for first-time bootstrap (region, Wi-Fi, first endpoint). Not designed for scale. Use for development, lab setup, and small-fleet manual provisioning.
  - **SOTI Connect.** Enterprise MDM (Mobile Device Management) platform with native RFD40/RFD90 support. Provides centralized configuration, certificate distribution, firmware OTA, and health monitoring at fleet scale. Often acts as the MQTT broker itself in addition to managing devices.
  - **42Gears SureMDM.** Competing MDM with similar capabilities. Native RFD40/RFD90 support since 2024.

  Comparison.

  | Capability | 123RFID Desktop | SOTI Connect | 42Gears SureMDM |
  |---|---|---|---|
  | Initial bootstrap (region, first Wi-Fi) | ✓ Required for first time | △ Possible via custom setup | △ Possible via custom setup |
  | Per-device manual config | ✓ | ✓ | ✓ |
  | Fleet-wide config push | ✗ | ✓ | ✓ |
  | OTA firmware updates | ✗ | ✓ | ✓ |
  | Certificate management at scale | ✗ | ✓ | ✓ |
  | Health monitoring dashboard | ✗ | ✓ | ✓ |
  | Acts as MQTT broker | ✗ | ✓ | △ Optional |
  | Cost | Free | Licensed | Licensed |
  | Best for | Dev, lab, very small fleets | Enterprise fleets | Enterprise fleets |

  Use 123RFID Desktop once per sled at bootstrap. After that, transition all routine operations to an MDM.

---

### §20.2 Multi-tenant operation via `tenantId`

- **Purpose.** Architectural pattern for shared infrastructure.
- **Quadrant.** 📘 Explanation.
- **Outline.** Tenant naming → ACL enforcement → cross-tenant queries.
- **Drafted content.**

  See §17.4 for the security framing. Operationally, multi-tenant deployments succeed when these rules hold.

  - **One tenantId per logical business unit.** Not per reader, not per warehouse — per management boundary.
  - **Tenant ACLs enforced at the broker.** A broker compromise still isolates tenants if ACLs are right.
  - **Cross-tenant data integration happens above the broker.** Downstream analytics may aggregate; the broker does not.

  Naming conventions: short, lowercase, dot-free (e.g., `zebra`, `acme`, `globex`). Avoid customer-identifying names if topics may surface in logs.

---

### §20.3 Fleet health management — `heartBeatEVT` aggregation patterns

- **Purpose.** Patterns for turning per-reader heartbeats into fleet dashboards.
- **Quadrant.** 📘 Explanation.
- **Outline.** Subscribe → aggregate → alert.
- **Drafted content.**

  Three patterns.

  - **Per-reader liveness.** Track time-since-last-heartbeat per serial. Alert if > 3 × heartbeat interval.
  - **Fleet aggregate metrics.** Average battery percentage, count of sleds with batterystateOfHealth = REPLACE, average temperature, count of sleds in radioActivity = ACTIVE.
  - **Anomaly detection.** Sleds whose metrics drift significantly from cohort norms; flag for inspection.

  Implementation tools: Grafana/Prometheus for time-series, Splunk for log-style, custom for application-specific.

---

### §20.4 Bulk configuration semantics

- **Purpose.** How fleet-wide configuration push behaves.
- **Quadrant.** 📘 Explanation.
- **Outline.** Push mechanism via MDM; staggered apply; verification.
- **Drafted content.**

  MDMs typically push configuration via a `set_config` to each sled, sequenced over time to avoid broker overload. Sleds apply per-§18.5 reboot rules. Some sleds may be offline during the push; the MDM queues and retries.

  Verification: poll `get_config` after the push window; flag any sled whose configuration drifted from intended (see §16.4).

---

### §20.5 Firmware rollout strategies

- **Purpose.** Patterns for rolling firmware across a fleet.
- **Quadrant.** 📘 Explanation.
- **Outline.** Canary → cohort → fleet; rollback considerations.
- **Drafted content.**

  - **Canary.** Push new firmware to a small set (5–10%) first. Watch heartbeats, alerts, and tag-read rates for 24–72 h.
  - **Cohort.** Gradual rollout across 20%, 50%, 100% over a week.
  - **Rollback.** If canary fails, halt the rollout. Rollback means pushing the previous firmware version; on RFD40/RFD90, this works via the same `firmware_update` operation pointing at the old image.

  Plan rollouts during low-business-impact windows; respect reboot times.

---

### §21.1 High availability architectures

- **Purpose.** Architectural patterns for HA across sled, broker, and application.
- **Quadrant.** 📘 Explanation.
- **Outline.** Sled-level redundancy; broker HA; application HA.
- **Drafted content.**

  - **Sled-level.** Sleds are single units; HA means having spare sleds available to swap.
  - **Broker.** Use a clustered broker (HiveMQ, EMQX) or a managed HA broker (AWS IoT Core, Azure IoT Hub). The sled does not load-balance across brokers in a single endpoint.
  - **Multi-broker per sled.** Configure two endpoints pointing at two brokers (one MDM, one MDM-failover). Note: the sled does not auto-fail-over; both endpoints are always active.
  - **Application HA.** Standard pattern: multiple subscribers across instances; broker handles fan-out.

---

### §21.2 Failure blast-radius management

- **Purpose.** Limit how far a single failure can propagate.
- **Quadrant.** 📘 Explanation.
- **Outline.** Per-fleet boundaries; canary fleets; back-pressure to broker.
- **Drafted content.**

  - **Per-fleet boundaries.** Tenant boundaries are also failure boundaries. A broker outage in tenant `acme` does not affect `globex`.
  - **Canary fleets.** Maintain a small "canary" fleet that receives new firmware/config first. Failure here does not blast to production.
  - **Back-pressure to broker.** A misbehaving fleet that floods a broker is contained by per-tenant rate limits at the broker (where supported).

---

### §21.3 Retry and backoff strategies

- **Purpose.** Sled-side and application-side retry patterns.
- **Quadrant.** 📘 Explanation.
- **Outline.** Sled's `reconnectDelay*`; application's command-retry policy.
- **Drafted content.**

  **Sled-side.** Built in via `mqttParams.reconnectDelayMin` / `reconnectDelayMax`. Exponential backoff between min and max.

  **Application-side.** Two retry patterns.

  - **Idempotent command retry.** For `get_*`: retry after timeout with the same `requestId`; the second response wins.
  - **State-changing command retry.** For `set_*`, `control_operation`, etc.: retry with a *new* `requestId`. Track responses by `requestId` to detect duplicates.

---

### §21.4 Data retention patterns

- **Purpose.** End-to-end retention from sled to archive.
- **Quadrant.** 📘 Explanation.
- **Outline.** Sled retention buffer; broker retention; downstream archive.
- **Drafted content.**

  - **Sled.** 150,000-event retention buffer for `dataEVT`. Survives short broker outages.
  - **Broker.** Depends on broker. Mosquitto/EMQX/HiveMQ can persist messages; AWS IoT Core does not by default; Azure IoT Hub has per-message retention up to 24 hours.
  - **Downstream archive.** S3, Azure Blob, GCS, or a data warehouse for long-term storage; parquet for analytics workloads.

  Define retention policy per data class. Tag events for audit may need years; alerts for compliance may need months; heartbeats may need weeks.

---

### §21.5 AI and RAG consumption considerations

- **Purpose.** Anticipate AI and agent consumption of IOTC docs and events.
- **Quadrant.** 📘 Explanation.
- **Outline.** Schema discoverability; topic naming for RAG; event-shape consistency.
- **Drafted content.**

  Three implications for AI consumption.

  - **Schema discoverability.** Publish the IOTC schemas (and these docs) in AsyncAPI or OpenAPI format. AI agents can plan command sequences only against discoverable contracts.
  - **Topic naming for RAG.** Topic strings should be retrieval-friendly: `<tenant>/<role>/<action>/<serial>` reads better than opaque `T1/R5/A2/N3`. Stable, human-readable naming improves RAG retrieval quality.
  - **Event-shape consistency.** Field names should be stable across firmware versions; schema errata (like the `mqttConnEVT.timestamp` HH:MM:SS quirk) should be documented in machine-readable form so RAG can warn consuming agents.

---

### §22.1 How to provision a fleet via SOTI Connect

- **Purpose.** SOTI-specific procedure.
- **Quadrant.** 📙 How-to.
- **Outline.** Enroll → push configuration profile → push certificates → activate endpoint → verify.
- **Drafted content.**

  1. Enroll the sled into SOTI Connect. Initial enrollment may use a QR code or a one-touch token via 123RFID Desktop.
  2. Build a SOTI Configuration Profile containing: MQTT endpoint settings, Wi-Fi credentials, certificate bundle, post-filter defaults.
  3. Assign profile to the device group covering the new sled.
  4. SOTI pushes; observe `mqttConnEVT.CONNECTED` on the MDM endpoint.
  5. Verify by `get_config`.

  Region must still be set via 123RFID Desktop before SOTI takes over.

---

### §22.2 How to provision a fleet via 42Gears SureMDM

- **Purpose.** SureMDM-specific procedure.
- **Quadrant.** 📙 How-to.
- **Outline.** Enroll → profile → deploy → verify.
- **Drafted content.**

  Analogous to §22.1. Enroll via SureMDM's enrollment workflow; build a profile; assign; deploy; verify. Region is still 123RFID Desktop.

---

### §22.3 How to deploy firmware updates fleet-wide

- **Purpose.** OTA at scale.
- **Quadrant.** 📙 How-to.
- **Outline.** Stage in MDM → canary → cohort rollout → verify.
- **Drafted content.**

  1. Stage the firmware image on a file server accessible to your sleds (HTTPS).
  2. In your MDM, create a firmware-update profile referencing the image URL.
  3. Apply to a canary group (5–10%). Wait. Verify success via `firmwareUpdateEVT.COMPLETED` and post-update `get_version`.
  4. Roll out to broader cohorts.
  5. Track failures; roll back where needed.

---

### §22.4 How to perform bulk configuration

- **Purpose.** Push the same config to many sleds.
- **Quadrant.** 📙 How-to.
- **Outline.** Define canonical → push via MDM → verify.
- **Drafted content.**

  1. Define the canonical configuration document (the `set_config.configData` JSON).
  2. Apply via your MDM's bulk-push mechanism.
  3. Verify via `get_config` polling after the push window.

---

### §22.5 How to monitor fleet health

- **Purpose.** Real-time fleet-health dashboard.
- **Quadrant.** 📙 How-to.
- **Outline.** Build per-reader liveness + aggregate metrics.
- **Drafted content.**

  See §20.3. The procedure:

  1. Subscribe to all `event/+` topics under your tenant.
  2. Aggregate `heartBeatEVT` into a time-series store.
  3. Build dashboards with per-reader liveness and fleet aggregates.
  4. Alert on outliers.

---

## Unit 8 — Edge Applications and Customization

### §23.1 Overview of Data Analytics applications on the sled

- **Purpose.** Position the in-firmware DA app capability.
- **Quadrant.** 📘 Explanation.
- **Outline.** What DA apps are; languages; deployment model; constraints.
- **Drafted content.**

  Premium and RFD90 sleds with native firmware support a **Data Analytics (DA) application** runtime — a sandboxed environment where you can deploy small custom programs that run *on the sled* alongside the IOTC daemon. DA apps subscribe to internal IOTC events (tag reads, alerts) and can filter, enrich, or transform them before publishing externally.

  - **Languages.** Python and Node.js are supported.
  - **Deployment.** Packaged as a tarball/zip and pushed to the sled via the firmware-management surface (similar to a firmware update).
  - **Use cases.** On-sled filtering more complex than the IOTC's post-filter API allows; per-tag side effects (e.g., write-back to the host display via an LED-blink command); local-only aggregation when broker connectivity is unreliable.

  DA apps run on Path A (Monolithic) sleds. On Path B, equivalent logic lives in the host app.

---

### §23.2 Python DA application architecture

- **Purpose.** Architectural overview of a Python DA app.
- **Quadrant.** 📘 Explanation.
- **Outline.** Entry point; SDK access; event hooks; lifecycle.
- **Drafted content.**

  A Python DA app is a Python module with a defined entry point (e.g., `main.py`) and a manifest describing dependencies. At runtime the sled's firmware launches the Python interpreter in a sandbox and invokes the entry point. The app receives events via an SDK API and can publish to local interfaces.

  Lifecycle: app start → handler registration → event loop → app stop on sled shutdown.

  Constraints: limited CPU and memory; no arbitrary network access (egress is mediated through the IOTC's endpoint configuration); restricted file system access.

---

### §23.3 Node.js DA application architecture

- **Purpose.** Analogous overview for Node.js DA apps.
- **Quadrant.** 📘 Explanation.
- **Outline.** Module entry, SDK access, event hooks.
- **Drafted content.**

  A Node.js DA app is a Node module with a defined entry script and a package.json. Lifecycle and constraints mirror the Python pattern. Event-driven style fits naturally; the SDK exposes EventEmitter-style hooks for tag reads and other internal events.

---

### §23.4 Packaging and deployment model

- **Purpose.** How DA apps get onto a sled.
- **Quadrant.** 📘 Explanation.
- **Outline.** Packaging requirements; deployment via firmware-management; rollout.
- **Drafted content.**

  Packaging produces a single archive containing the app code, manifest, and any third-party dependencies the firmware permits. Deployment proceeds through the same firmware-management surface as core firmware updates (similar API surface and `fileDownloadEVT` flow). MDMs may also distribute DA apps as part of a configuration profile.

---

### §23.5 Resource constraints and limits

- **Purpose.** What a DA app may not do.
- **Quadrant.** 📘 Explanation + 📕 Reference.
- **Outline.** CPU, memory, network, storage.
- **Drafted content.**

  Exact limits depend on firmware version; treat the following as orders of magnitude.

  - **CPU.** Single-core, low MHz. Designed for stream processing, not heavy compute.
  - **Memory.** Tens of MB.
  - **Network.** Egress only via IOTC endpoints. No arbitrary outbound TCP.
  - **Storage.** Tens of MB for app code and transient state.

  Confirm limits in your firmware's release notes before architecting heavy on-sled logic.

---

### §24.1 How to build and package a Python DA app

- **Purpose.** Procedure to produce a deployable Python DA app.
- **Quadrant.** 📙 How-to.
- **Outline.** Scaffold → develop locally → package → deploy.
- **Drafted content.**

  1. Scaffold from the Zebra DA app Python template.
  2. Develop and test locally against a simulator (when provided) or the Python SDK's stub implementation.
  3. Run the packaging script to produce the deployment archive.
  4. Deploy via firmware-management surface or MDM.

---

### §24.2 How to build and package a Node.js DA app

- **Purpose.** Analogous procedure for Node.
- **Quadrant.** 📙 How-to.
- **Outline.** Same as §24.1, Node version.
- **Drafted content.**

  As §24.1, substituting the Node.js scaffolding, dependencies, and packaging script.

---

### §24.3 How to deploy and update a DA app

- **Purpose.** Operational deployment.
- **Quadrant.** 📙 How-to.
- **Outline.** Upload archive → activate → verify → roll back if needed.
- **Drafted content.**

  1. Upload the DA app archive to the sled via firmware-management or MDM.
  2. Activate (the sled stops any current DA app, installs the new one, starts it).
  3. Verify by reading the DA app's outputs or by querying `get_status` (where surfaced).
  4. Roll back by re-uploading the previous version.

---

### §24.4 How to monitor a running DA app

- **Purpose.** Visibility into DA app health.
- **Quadrant.** 📙 How-to.
- **Outline.** SDK-exposed metrics; log channel; alert thresholds.
- **Drafted content.**

  1. Subscribe to the DA app's log channel (firmware-version-specific).
  2. Track app uptime, CPU, memory; alert if metrics breach published thresholds.
  3. Use IOTC's `alertsEVT` extension (where supported) to receive app-emitted alerts on the standard event topic.

---

## Unit 9 — Troubleshooting and Recovery

### §25.1 Symptom Index

- **Purpose.** Symptom-first entry point.
- **Quadrant.** 📕 Reference.
- **Outline.** Alphabetical list of symptoms with FM identifiers.
- **Drafted content.**

  | Symptom (reader's words) | Failure Mode |
  |---|---|
  | "Reader never appears in 123RFID Desktop" | FM-DEV-01 |
  | "Reader connects, then drops in seconds" | FM-NET-01 |
  | "Periodic 30-second disconnections" | FM-NET-02 |
  | "Cannot connect at all" | FM-NET-03 |
  | "`set_config` returns code 0 but field is unchanged" | FM-CFG-01 |
  | "Endpoint config disappeared after reboot" | FM-CFG-03 |
  | "Command published, no response arrived" | FM-CMD-01 |
  | "Command silently ignored" | FM-CMD-04 |
  | "START succeeded but `dataEVT` does not arrive" | FM-RFID-01 |
  | "Tag read rate is much lower than expected" | FM-RFID-02 |
  | "Tag reads return empty metadata fields" | FM-RFID-03 |
  | "`mqttConnEVT.timestamp` cannot be parsed as ISO-8601" | FM-EVT-02 |
  | "`heartBeatEVT` stopped" | FM-EVT-04 |
  | "Battery alerts repeating every minute" | FM-EVT-05 |
  | "TLS handshake fails" | FM-SEC-01 |
  | "Certificate appears installed but is not used" | FM-SEC-02 |
  | "Firmware update stuck at 50%" | FM-FW-01 |
  | "Wi-Fi association fails (Path A)" | FM-WIFI-01 |
  | "Wi-Fi roaming causes long gaps" | FM-WIFI-02 |
  | "Bluetooth disconnects between sled and host (Path B)" | FM-DEV-02 |
  | "Multiple readers conflict on same broker" | FM-NET-05 |
  | "Reader cannot reach broker after corporate VPN change" | FM-NET-04 |
  | "Phantom RF90_DATA_BROKER blocking new DATA endpoint" | RP-05 |

---

### §25.2 The two physical edges

- **Purpose.** Re-anchor diagnosis to physical edges.
- **Quadrant.** 📘 Explanation.
- **Outline.** Bipartite has two edges (BT + WAN); Monolithic has one (Wi-Fi).
- **Drafted content.**

  On Path A, there is one physical edge that can fail: between the sled and the Wi-Fi access point (and then through the AP to the broker). Failures here manifest as `mqttConnEVT.DISCONNECTED` (if the sled is up) or radio silence (if Wi-Fi never came up).

  On Path B, there are two physical edges: between the sled and the host (Bluetooth/eConnex), and between the host and the broker (Wi-Fi/cellular). Failures on the first edge manifest as `terminalConnection.status: DISCONNECTED` in `get_status` on the host's perspective. Failures on the second edge manifest as `mqttConnEVT` on the host's broker connection.

  Always identify the failing edge before deeper diagnosis.

---

### §25.3 Diagnostic mental model — layer by layer

- **Purpose.** Top-down diagnostic ladder.
- **Quadrant.** 📘 Explanation.
- **Outline.** Network → MQTT → Sled application → RFID radio → Tags.
- **Drafted content.**

  Diagnose top-down.

  - **Layer 1 — Network.** Is the sled (Path A) or host (Path B) on the network? Ping the broker IP. Confirm DNS resolution.
  - **Layer 2 — MQTT.** Is the broker accepting the connection? Check `mqttConnEVT`. Try MQTTX with the same credentials and topics.
  - **Layer 3 — Sled application.** Is the IOTC daemon running and dispatching commands? Send `get_status`; if no response, the daemon may be stuck.
  - **Layer 4 — RFID radio.** Is the radio configured? Is operating mode set? `get_operating_mode`.
  - **Layer 5 — Tags.** Are tags physically in range and on the right frequency for the region?

  Most problems live in layers 1–3.

---

### §26.1 FM-NET — TRANSPORT failures

- **Purpose.** Catalogue connection-related failure modes.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs with symptoms, likely causes, diagnosis, fix.
- **Drafted content.**

  - **FM-NET-01 — Reader connects, drops in seconds.** Likely cause: `keepAlive` too low for broker idle-timeout. Fix: increase `keepAlive` (e.g., from 30 to 120).
  - **FM-NET-02 — Periodic 30-second disconnections.** Likely cause: NAT keepalive vs MQTT keepalive mismatch. Fix: align keepalive with NAT idle timeout (typically 60 s).
  - **FM-NET-03 — Cannot connect at all.** Likely cause: broker port (1883/8883) blocked at firewall. Fix: open port; confirm DNS resolves broker URL.
  - **FM-NET-04 — Reader cannot reach broker after VPN change.** Likely cause: changed routing or firewall ruleset. Fix: re-enable broker route.
  - **FM-NET-05 — Multiple readers conflict.** Likely cause: duplicate MQTT client IDs from misconfigured endpoint. Fix: ensure unique client IDs (use serial number).

---

### §26.2 FM-DEV — Reader-Host link failures (Bipartite-specific)

- **Purpose.** Bluetooth/eConnex failures.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-DEV-01 — Reader never appears in 123RFID Desktop.** Likely cause: USB driver not installed; sled discharged; cable damaged. Fix: install Zebra USB driver; charge sled; replace cable.
  - **FM-DEV-02 — Bluetooth disconnects between sled and host.** Likely cause: roam out of range; battery low; OS-level Bluetooth glitch. Fix: re-pair; charge; reset Bluetooth on host.
  - **FM-DEV-03 — eConnex adapter not recognized.** Likely cause: physical contact issue. Fix: clean contacts; reseat sled.

---

### §26.3 FM-WIFI — Wi-Fi failures (Monolithic-specific)

- **Purpose.** Wi-Fi-specific failures on Path A.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-WIFI-01 — Wi-Fi association fails.** Likely cause: wrong SSID, wrong passkey, wrong security type (WPA2 vs WPA3 vs Enterprise), hidden SSID. Fix: re-enter credentials precisely; use 123RFID Desktop's *Enter SSID* for hidden networks; verify Enterprise CA cert is installed.
  - **FM-WIFI-02 — Wi-Fi roaming causes long gaps.** Likely cause: AP-to-AP handoff takes seconds. Fix: tune AP roaming thresholds; consider seamless-roam-capable APs; lengthen `keepAlive`.
  - **FM-WIFI-03 — Wi-Fi 6 negotiation fails.** Likely cause: AP does not support Wi-Fi 6 properly. Fix: confirm AP firmware; fall back to Wi-Fi 5 if possible.

---

### §26.4 FM-CMD — Command/response failures

- **Purpose.** Failures in the command/response loop.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-CMD-01 — Command published, no response.** Likely cause: not subscribed to response topic; topic typo; broker dropped publish. Fix: confirm subscription before publish; check exact topic string with reader's serial.
  - **FM-CMD-02 — Response has non-zero `response.code`.** Likely cause: command-specific error; see `error_codes.json`. Fix: per error code.
  - **FM-CMD-03 — `control_operation start` returns code 11.** Likely cause: duplicate start (already running). Fix: send `control_operation stop` first.
  - **FM-CMD-04 — `set_config` silently ignored.** Likely cause: nested OpenAPI payload instead of flattened native MQTT (`payload` field used where `configData` is expected). Fix: use `configData` per §9.7 *Native MQTT vs OpenAPI schema*.

---

### §26.5 FM-EVT — Event loss patterns

- **Purpose.** When events are missing.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-EVT-01 — Events lost during disconnect.** Likely cause: events are not buffered across disconnect (only `dataEVT` is). Fix: design app to tolerate missed heartbeats.
  - **FM-EVT-02 — `mqttConnEVT.timestamp` not ISO-8601.** It is HH:MM:SS by design. Fix: special-case parsing for this event.
  - **FM-EVT-03 — Specific event type not arriving.** Likely cause: disabled in `eventConfiguration`. Fix: enable the relevant flag in `set_config.eventConfiguration` (e.g., `battery: true`).
  - **FM-EVT-04 — `heartBeatEVT` stopped.** Likely cause: reader disconnected; heartbeat disabled; MGMT_EVT endpoint deleted. Fix: check `mqttConnEVT`; verify `eventConfiguration.heartbeat: true`.
  - **FM-EVT-05 — Battery alerts repeating every minute.** Likely cause: chargePercentage hovering at threshold. Fix: charge sled; or adjust threshold (where exposed).

---

### §26.6 FM-FW — Firmware failures

- **Purpose.** Firmware update failure modes.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-FW-01 — Firmware update stuck at 50%.** Likely cause: file server slow; corrupted image. Fix: cancel; re-stage image; reattempt.
  - **FM-FW-02 — Reader fails to reboot post-update.** Likely cause: incompatible firmware (cross-tier image). Fix: use RP-04 rollback procedure.
  - **FM-FW-03 — Version verification fails.** Likely cause: image not signed correctly. Fix: download fresh image from Zebra support portal.

---

### §26.7 FM-CFG — Configuration failures

- **Purpose.** Configuration-related failure modes.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-CFG-01 — `set_config` code 0 but field unchanged.** Likely cause: reboot-required field changed; runtime not yet reflecting. Fix: reboot; verify via `get_config`.
  - **FM-CFG-02 — Endpoint configuration drift.** Likely cause: out-of-band edit via 123RFID Desktop. Fix: reconcile per §19.4.
  - **FM-CFG-03 — Endpoint disappeared after reboot.** Likely cause: deactivated endpoint may be hidden; or non-persistent change. Fix: re-add endpoint with `activate: true`.

---

### §26.8 FM-SEC — Security/TLS failures

- **Purpose.** TLS-specific failure modes.
- **Quadrant.** 🩺 Failure Mode.
- **Outline.** Sub-IDs.
- **Drafted content.**

  - **FM-SEC-01 — TLS handshake fails.** Likely cause: missing/wrong CA cert; wrong `verificationType`; hostname mismatch. Fix: install correct CA; align verification type; verify hostname.
  - **FM-SEC-02 — Cert installed but not used.** Likely cause: `securityParams.caCertificateFile` references wrong file name. Fix: `get_installed_certificate` to list; correct the reference.
  - **FM-SEC-03 — Authentication failed.** Likely cause: wrong username/password or client cert. Fix: re-issue creds; confirm on broker side.
  - **FM-SEC-04 — Certificate expired.** Likely cause: rotation overdue. Fix: install new cert; update endpoint reference.

---

### §27.1 RP-01 — Recover lost connectivity

- **Purpose.** End-to-end recovery for a sled that is no longer reaching the broker.
- **Quadrant.** 📙 How-to.
- **Outline.** Verify edges → reset MQTT → reboot → escalate.
- **Drafted content.**

  1. Confirm sled is powered and not faulted. Press trigger; observe LED feedback.
  2. Path A: open 123RFID Desktop, connect over USB, verify Wi-Fi association in *Configure → Communication → Wi-Fi*. Path B: confirm host-sled Bluetooth is paired and connected.
  3. From the broker side, watch for `mqttConnEVT`. If silent for 10+ minutes, suspect endpoint configuration; verify `url`, `port`, `tenantId` match the broker's expectation.
  4. If still silent, reboot the sled. Watch for the boot sequence to complete and `mqttConnEVT.CONNECTED` to arrive.
  5. Escalate if the sled boots but cannot connect — check broker logs for refused connections, TLS errors, or credential errors.

---

### §27.2 RP-02 — Recover from configuration drift

- **Purpose.** Bring a drifted sled back to canonical config.
- **Quadrant.** 📙 How-to.
- **Outline.** Detect → snapshot → reconcile → verify.
- **Drafted content.**

  1. Snapshot current state with `get_config`. Store as baseline.
  2. Compute diff vs canonical.
  3. If reboot-required fields differ: schedule a window; push `set_config` with canonical `configData`; reboot.
  4. If only runtime fields differ: push and apply at runtime.
  5. Verify via fresh `get_config`. Confirm match.

---

### §27.3 RP-03 — Recover endpoint configuration

- **Purpose.** Re-add a missing or corrupt endpoint configuration.
- **Quadrant.** 📙 How-to.
- **Outline.** Inventory → identify gap → re-add → activate.
- **Drafted content.**

  1. `get_endpoint_config` for each expected endpoint name.
  2. Identify missing or misconfigured ones.
  3. `config_endpoint ADD` (for missing) or `config_endpoint MODIFY` (for misconfigured).
  4. Activate; reboot if required.
  5. Confirm via fresh `get_endpoint_config`.

---

### §27.4 RP-04 — Restore from a failed firmware update

- **Purpose.** Rollback.
- **Quadrant.** 📙 How-to.
- **Outline.** Identify failed sleds → push previous image → verify.
- **Drafted content.**

  1. List sleds where `firmwareUpdateEVT.status: FAILED` or where post-update `get_version` does not match expectations.
  2. Stage the previous firmware image on a file server.
  3. Issue `firmware_update` pointing at the previous image.
  4. Confirm `firmwareUpdateEVT.COMPLETED` and post-update version.

  Note. If the sled is bricked beyond MQTT reach, recovery requires 123RFID Desktop over USB.

---

### §27.5 RP-05 — Free the phantom `RF90_DATA_BROKER` slot

- **Purpose.** Procedure that every Premium/RFD90 deployer hits once.
- **Quadrant.** 📙 How-to.
- **Outline.** Identify → delete phantom → verify → add real DATA endpoint.
- **Drafted content.**

  1. List existing endpoints. `get_endpoint_config` for `RF90_DATA_BROKER`. If it exists, this is your phantom.
  2. Send the delete:

     ```json
     {
       "command": "config_endpoint",
       "requestId": "delete_phantom_01",
       "epConfig": {
         "operation": "delete",
         "configuration": { "endpointName": "RF90_DATA_BROKER" }
       }
     }
     ```

  3. Wait for `{"code": 0, "description": "Success"}` on the response topic.
  4. The phantom slot is freed. You may now `config_endpoint ADD` a real DATA endpoint per §9.3 / §13.5.

---

### §27.6 RP-06 — Implement graceful degradation

- **Purpose.** Application-side handling of degraded sled connectivity.
- **Quadrant.** 📙 How-to.
- **Outline.** Define degraded states → fall back → notify operators.
- **Drafted content.**

  1. Define degraded states for your app: NO_HEARTBEAT, NO_RESPONSE, NO_DATA.
  2. For each state, choose a fallback (cache last-known data; pause writes; notify operator).
  3. Subscribe to `mqttConnEVT` and `alertsEVT.NETWORK_EVENT` to drive state transitions.
  4. On recovery, run the reconcile protocol (§15.6) before resuming normal operation.

---


## Unit 10 — Reference

### §28.1 MQTT Topic Reference

- **Purpose.** Authoritative topic-construction reference.
- **Quadrant.** 📕 Reference.
- **Outline.** Topic template, role-to-default-suffix table, wildcard rules.
- **Drafted content.**

  **Topic template.** `<tenantId>/<userConfiguredPath>/<serialNumber>`

  **Default suffixes (MDM hybrid endpoint).**

  | Role | Default `userConfiguredPath` | Direction |
  |---|---|---|
  | Command (publish to reader) | `MDM/clients/cmnd` | App → Reader |
  | Response (subscribe) | `MDM/clients/resp` | Reader → App |
  | Event / Alert (subscribe) | `MDM/clients/event` | Reader → App |
  | RFID Data (subscribe) | `MDM/clients/rfid` | Reader → App |
  | Last Will (subscribe) | `MDM/clients/rfid` (LWT slot inside `publishTopics`) | Broker → App |

  **Default suffixes (split CTRL endpoint).**

  | Role | Default path |
  |---|---|
  | Command | `CTRL/clients/cmnd` |
  | Response | `CTRL/clients/resp` |
  | Event | `CTRL/clients/event` |
  | LWT | `CTRL/clients/rfid` |

  **Default suffixes (split DATA endpoint).**

  | Role | Default path |
  |---|---|
  | Data event | `DATA/clients/data1event` |
  | Data event (DATA_EP2, future) | `DATA/clients/data2event` |

  **Wildcards.** MQTT 3.1.1 wildcards `#` (multi-level) and `+` (single-level) work as standard.

  **QoS mappings.** See §8.3.

---

### §29 Endpoint Reference

- **Purpose.** Authoritative reference for the endpoint object.
- **Quadrant.** 📕 Reference.
- **Outline.** epType enum, capability matrix, dependency matrix.
- **Drafted content.**

  **epType values.**

  | Value | Role | Direction |
  |---|---|---|
  | `MGMT` | Management commands and responses | Bidirectional |
  | `MGMT_EVT` | Reader-initiated management events | Reader → App |
  | `CTRL` | Control commands and responses (RFID) | Bidirectional |
  | `DATA1` | Tag data stream (primary) | Reader → App |
  | `DATA2` | Tag data stream (secondary; future) | Reader → App |
  | `MDM` | **Hybrid** endpoint carrying all four roles | Bidirectional |
  | `SOTI` | SOTI Connect bridge endpoint | Bidirectional |

  **Capability matrix.**

  | Capability | MDM | MGMT | MGMT_EVT | CTRL | DATA1 | DATA2 | SOTI |
  |---|---|---|---|---|---|---|---|
  | Carries commands | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
  | Carries responses | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
  | Carries alerts/heartbeats | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ |
  | Carries `dataEVT` | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
  | Counts toward 10-endpoint limit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
  | Counts toward 2-data-pipe limit | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |

  **Dependency matrix.** See §9.4.

---

### §30 Event Reference

- **Purpose.** One row per event with key fields.
- **Quadrant.** 📕 Reference.
- **Outline.** heartBeatEVT, alertsEVT, mqttConnEVT, firmwareUpdateEVT, fileDownloadEVT, dataEVT.
- **Drafted content.**

  | Event | Direction | Timestamp format | Key fields |
  |---|---|---|---|
  | `heartBeatEVT` | Reader → App | ISO-8601 | `heartbeat.deviceStatus.battery`, `.temperature`, `.radioActivity`, `.terminalConnection`, `.ntp`; optional `.inventoryStatus` |
  | `alertsEVT` | Reader → App | ISO-8601 | `alerts[].id` ∈ {BATTERY, FIRMWARE_UPDATE, NETWORK_EVENT, TEMPERATURE, POWER}; `.state`; `.priority`; `.message` |
  | `mqttConnEVT` | Reader → App | **HH:MM:SS** | `timestamp`, `apiVersion` (number), `mqttVersion` (number), `connectionState` ∈ {CONNECTED, DISCONNECTED} |
  | `firmwareUpdateEVT` | Reader → App | ISO-8601 | `firmwareUpdate.status` ∈ {STARTED, DOWNLOADING, VERIFYING, APPLYING, REBOOTING, COMPLETED, FAILED}; `.progress` (0–100); `.version` |
  | `fileDownloadEVT` | Reader → App | ISO-8601 | `fileDownload.status`; `.fileName`; optional `.progress` |
  | `dataEVT` | Reader → App (DATA topic) | ISO-8601 per tag | `data.tagData[]` (see §14.3) |

  Schema errata: `mqttConnEVT.timestamp` is `HH:MM:SS`, not ISO-8601. Special-case parsing.

---

### §31 Operation Reference (alphabetical)

- **Purpose.** One atomic card per operation. Names sourced from `tag_config.json`.
- **Quadrant.** 📕 Reference.
- **Outline.** Card shape; per-operation list with one-line summary.
- **Drafted content.**

  **Card shape per operation (see §9.7 for the native-MQTT vs OpenAPI rule):**

  ```
  Operation: <name>
  Interface: MGMT | CTRL
  Description: one sentence
  Native MQTT request: {flattened JSON}
  Native MQTT response: {response shape}
  Applicable error codes: subset of error_codes.json
  Known failure modes: FM-XX-YY links
  ```

  **List of operations.**

  | Operation | Interface | One-line description |
  |---|---|---|
  | `config_endpoint` | MGMT | Add, modify, or delete an MQTT endpoint configuration |
  | `control_operation` | CTRL | Start or stop the radio (controlType RFID) — and in future, scanner (controlType SCANNER) |
  | `delete_certificate` | MGMT | Remove an installed PEM certificate |
  | `delete_endpoint` | MGMT | Remove a named endpoint configuration |
  | `delete_post_filter` | CTRL | Remove a specific post-filter by ID |
  | `firmware_update` | MGMT | Initiate an OTA firmware update |
  | `get_config` | MGMT | Retrieve the full saved configuration |
  | `get_current_region` | MGMT | Read-only retrieval of regulatory region |
  | `get_endpoint_config` | MGMT | Retrieve a single endpoint configuration |
  | `get_firmware_update_status` | MGMT | Poll firmware update progress |
  | `get_installed_certificate` | MGMT | List installed certificates (singular canonical name; plural is a schema typo) |
  | `get_operating_mode` | CTRL | Read the current operating mode object |
  | `get_post_filter` | CTRL | Read active post-filters |
  | `get_status` | MGMT | Read runtime device status |
  | `get_version` | MGMT | Read firmware, model, and serial number |
  | `set_config` | MGMT | Write to saved configuration; **uses `configData` field**, not `payload` |
  | `set_operating_mode` | CTRL | Write the operating mode object |
  | `set_post_filter` | CTRL | Add, modify, or delete post-filters |

---

### §32 Payload and Schema Reference

- **Purpose.** Per-payload schema with required/optional fields.
- **Quadrant.** 📕 Reference.
- **Outline.** Six core payloads.
- **Drafted content.**

  Detailed schemas live in `api-schema-reference/`. Quick reference:

  | Payload object | Origin operations | Top-level fields |
  |---|---|---|
  | `currentConfig` | `get_config`, `set_config.configData` | `readerVersion`, `deviceStatus`, `currentRegion`, `ethConfig`, `wifiConfig`, `installedCerts`, `epConfig` |
  | `operatingMode` | `get_operating_mode`, `set_operating_mode` | `profiles`, `radioStartConditions`, `radioStopConditions`, `query`, `tagMetaDataToEnable`, optionally `accessOperations`, `advancedConfigurations` |
  | `endpoint` (epConfig row) | `config_endpoint`, `get_endpoint_config` | `endpointName`, `epType`, `protocol`, `activate`, `url`, `port`, `verificationType`, `qosCommon`, `tenantId`, `mqttParams`, `securityParams`, `eventConfiguration` |
  | `postFilter` | `set_post_filter`, `get_post_filter` | `operation` ∈ {ADD, MODIFY, DELETE}, `filterId`, `dataEpType` ∈ {DATA_EP1, DATA_EP2}, `matchPatternMethod` ∈ {PREFIX, SUFFIX, REGEX}, `matchPattern`, `reportOperation` ∈ {INCLUDE, EXCLUDE}, `rssiThreshold`, `seenCount`, `reportDuration` |
  | `wifiProfile` | inside `currentConfig.wifiConfig` | `interfaceName`, `enableInterface`, `operation` ∈ {CREATE, MODIFY}, `accessPoint` (ESSID, security type, credentials), `ipv4Configuration` |
  | `eventConfiguration` | inside endpoint config | `terminalConnection`, `firmwareUpdate`, `network`, `ntp`, `heartbeat`, `power`, `battery`, `temperature`, `fileDownload`, `heartbeatConfiguration` |

---

### §33 Error and Status Reference

- **Purpose.** All error codes per `error_codes.json`.
- **Quadrant.** 📕 Reference.
- **Outline.** Code, symbolic name, description, applicable commands, recommended action.
- **Drafted content.**

  > **Note.** Codes 0–28 are defined in `api-schema-reference/error_codes.json`. The table below summarizes; consult the JSON for exact field-level detail.

  | Code | Symbolic name | Description | Recommended action |
  |---|---|---|---|
  | 0 | SUCCESS | Operation completed successfully | None |
  | 1 | GENERAL_FAILURE | Unspecified failure | Inspect message; retry once |
  | 2 | INVALID_PARAMETER | Field value out of range or wrong type | Validate payload against schema |
  | 3 | MISSING_PARAMETER | Required field absent | Re-publish with missing field |
  | 4 | UNAUTHORIZED | Credentials rejected | Verify username/password/cert |
  | 5 | RESOURCE_BUSY | Resource (e.g., radio) already engaged | Wait or stop first |
  | … | … | … | … |
  | 11 | DUPLICATE_OPERATION | Same operation already in progress (e.g., duplicate START) | Issue STOP first |
  | … | … | … | … |
  | 28 | FIRMWARE_UPDATE_FAILED | Update did not complete | Use RP-04 rollback |

  For complete code-by-code semantics, consult `api-schema-reference/error_codes.json`. Surface every code on the appropriate Operation Reference page (§31).

---

### §34 Configuration Parameter Reference

- **Purpose.** Per-domain configuration parameter catalog.
- **Quadrant.** 📕 Reference.
- **Outline.** Four sub-areas; each with a field table.
- **Drafted content.**

  **RFID settings** (inside `operatingMode`).
  - `profiles` — enum (§12.2).
  - `query.session` — `SESSION_0`, `SESSION_1`, `SESSION_2`, `SESSION_3`.
  - `query.tagPopulation` — integer estimate.
  - `query.slFlag` — `ALL`, `SELECT`, `DESELECT`.
  - `tagMetaDataToEnable` — boolean per field (§12.7).
  - `radioStartConditions` — `trigger`, `startDelay`, `periodicDuration`, `repeat`.
  - `radioStopConditions` — `trigger`, `duration`, `count`.

  **Security settings** (inside endpoint).
  - `protocol` — `MQTT`, `MQTT_TLS`.
  - `verificationType` — `VERIFY_NONE`, `VERIFY_PEER`, `VERIFY_HOST`, `VERIFY_HOST_PEER`.
  - `securityParams.caCertificateFile` — string file name.
  - `securityParams.clientCertificateFile` — string file name.
  - `securityParams.clientKeyFile` — string file name.
  - `securityParams.format` — `PEM`.
  - `securityParams.algorithm` — algorithm name.

  **Wi-Fi settings** (inside `currentConfig.wifiConfig`).
  - `accessPoint.essid` — SSID string.
  - `accessPoint.enableSecurity` — boolean.
  - `accessPoint.security.securityType` — `WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise`.
  - `accessPoint.security.securityDetails.<type>` — credentials per type.
  - `ipv4Configuration.enableDhcp` — boolean.

  **Fleet settings** (architectural; not all are sled fields).
  - `tenantId` — broker-wide namespace prefix.
  - MDM-specific fields (SOTI Connect, SureMDM) — vendor-defined.

---

### §35 Capacity and Limits Reference

- **Purpose.** Quick numerical reference.
- **Quadrant.** 📕 Reference.
- **Outline.** Numeric table.
- **Drafted content.**

  | Limit | Value | Note |
  |---|---|---|
  | Maximum saved endpoints | 10 | Across all `epType` values |
  | Maximum active data pipes | 2 | Only DATA_EP1 enabled in current firmware; DATA_EP2 in roadmap |
  | Maximum publish topics per endpoint | 3 | Inside `mqttParams.publishTopics` |
  | Maximum subscribe topics per endpoint | 1 | Inside `mqttParams.subscribeTopics` |
  | Maximum pre-filters | 4 | Design supports 32; current firmware caps at 4 |
  | Tag data retention buffer | 150,000 events | Held when broker unreachable |
  | Retention flush rate | 500 events / second | On broker reconnect |
  | `mqttParams.keepAlive` range | 0–65535 seconds | Set ≥ broker idle timeout |
  | Reconnect backoff range | `reconnectDelayMin` to `reconnectDelayMax` (seconds) | Exponential backoff |
  | Heartbeat interval default | 100 seconds | Configurable per endpoint |
  | Trigger frame in FAST_READ | Tag data events not emitted | FAST_READ is benchmark-only |

---

### §36 Glossary

- **Purpose.** One-line definitions in alphabetical order.
- **Quadrant.** 📕 Reference.
- **Outline.** Alphabetical list.
- **Drafted content.**

  - **123RFID Desktop.** Zebra's Windows utility for first-time provisioning of handheld sleds over USB.
  - **42Gears SureMDM.** A third-party MDM platform supporting RFD40/RFD90.
  - **Alert.** Specific event subtype in `alertsEVT` (BATTERY, FIRMWARE_UPDATE, NETWORK_EVENT, TEMPERATURE, POWER).
  - **Application.** The customer-built MQTT client; the controlling agent in IOTC.
  - **Bipartite.** Hardware tier with no Wi-Fi; sled pairs to a host over Bluetooth/eConnex (RFD40 Standard).
  - **Broker.** The MQTT broker; third-party.
  - **CTRL.** Endpoint role / `epType` for RFID control commands and responses.
  - **DATA1 / DATA2.** Endpoint roles for tag data streams.
  - **DA app.** Data Analytics application; in-firmware Python or Node.js program for on-sled processing.
  - **dataEVT.** Tag-read event published on the data topic.
  - **EPC Gen2.** EPCglobal Class 1 Generation 2 air protocol (ISO/IEC 18000-63).
  - **Endpoint.** A configured MQTT broker-bridge configuration (a row in `epConfig`). Never used in these docs for "API operation."
  - **firmware_update.** MGMT operation that initiates an OTA firmware update.
  - **heartBeatEVT.** Periodic management event.
  - **Host.** Zebra mobile computer that runs the IOTC daemon on Path B (Bipartite).
  - **IOTC.** Zebra IoT Connector; the MQTT-based control and data plane for Zebra RFID readers.
  - **MDM (epType).** Hybrid endpoint carrying all four interface roles.
  - **MDM (platform).** Mobile Device Management platform like SOTI Connect or SureMDM.
  - **MGMT.** Endpoint role / `epType` for management commands and responses.
  - **MGMT_EVT.** Endpoint role / `epType` for management-side events.
  - **Monolithic Edge Node.** Hardware tier with native Wi-Fi 6; sled connects directly to broker (Premium/Premium Plus/RFD90).
  - **mqttConnEVT.** MQTT connect/disconnect event. Timestamp is HH:MM:SS.
  - **Operating mode.** Composite RFID configuration object: profile + start/stop conditions + query + tagMetaData.
  - **Operation (RFID).** Value inside `control_operation` payload: START or STOP.
  - **Operation (TRANSPORT).** An IOTC API command (e.g., `set_operating_mode`).
  - **Path A / Path B.** Setup Path A (Monolithic) / Setup Path B (Bipartite). See §1.6.
  - **Profile.** Value of `operatingModes.profiles`.
  - **Reader.** The physical RFD40/RFD90 sled.
  - **requestId.** Application-chosen correlation token echoed by the reader in its response.
  - **RFD40.** Zebra handheld RFID sled family — Standard, Premium, Premium Plus variants.
  - **RFD90 / RFD9030.** Zebra ultra-rugged handheld RFID sled family.
  - **SOTI Connect.** A third-party MDM platform with native RFD40/RFD90 support.
  - **Tenant ID.** Namespace identifier prefixing all MQTT topics for a population of sleds.
  - **TLS.** Transport Layer Security; used on port 8883.
  - **verificationType.** TLS handshake verification setting (NONE / PEER / HOST / HOST_PEER).

---

### §37 Firmware Compatibility Matrix

- **Purpose.** Map features to required firmware versions.
- **Quadrant.** 📕 Reference.
- **Outline.** Per-feature firmware floor.
- **Drafted content.**

  > Treat this as a template. Fill exact firmware versions from your support portal's release notes.

  | Feature | Required firmware |
  |---|---|
  | IOTC V1.1 baseline | RFD40 firmware ≥ X.Y.Z (early access June 2025; consult release notes) |
  | FAST_READ profile | All current firmware |
  | DENSE_READERS profile | All current firmware |
  | DATA_EP2 active | Future firmware (not in current EA) |
  | Barcode control via IOTC `controlType: SCANNER` | Future firmware (roadmap) |
  | Post-filter count > 4 | Future firmware (design supports 32) |
  | First/Last Seen times in `dataEVT` | Future firmware |
  | CRC field in `dataEVT` | Future firmware |
  | User-Defined string in `dataEVT` | Future firmware |

  Always consult the release notes for the firmware version on your sled (`get_version.readerVersion.firmwareVersion`).

---

# PART 4 — Appendices

## A. Evidence Map

For every Unit 1 conceptual claim, the supporting evidence in `/Users/latheef/Desktop/x/knowledge/`:

| Claim | Evidence file |
|---|---|
| Four interfaces: Management, Event, Control, Data | `iot_setup_user_guide.md` (the RFD40/90 IOTC Features Guide), §Interfaces/Endpoints |
| MDM hybrid endpoint default + topic family | `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md`, Phase 2 |
| Native MQTT flattened payloads vs OpenAPI schema | `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md`, Phase 4 and Phase 6 warning |
| Region must be set via 123RFID Desktop | `iot_setup_user_guide.md` (Annexure → Connecting the Device to Wi-Fi); product behavior |
| Seven profiles (FAST_READ … ADVANCED) | `iot_setup_user_guide.md`, §Supported Features → Operating Mode Configuration |
| FAST_READ does not emit `dataEVT` | `iot_setup_user_guide.md`, §Future Developments |
| Maximum 10 endpoints | `iot_setup_user_guide.md`, ZETI commands section |
| Maximum 2 data pipes; phantom RF90_DATA_BROKER | `Zebra_RFID_IoT_Connector_Getting_Started_Guide.md`, Phase 5 (Step 5.1) |
| Maximum 4 pre-filters today (design 32) | `iot_setup_user_guide.md`, §Future Developments |
| 150,000 event retention buffer at 500 TPS | `What is IoT Connector — Zebra IoT Connector documentation.md`, §Retention |
| MDM partners SOTI / 42Gears | `iot_setup_user_guide.md`, §Management & Event Interface (cites soti.net and 42gears.com) |
| RFD40 Standard lacks Wi-Fi; Premium/RFD90 has Wi-Fi 6 | Source hardware brief; `RFD90 Ultra-Rugged UHF RFID Sleds  Zebra.md`; `RFD40 UHF RFID Standard Sled  Zebra.md`; `rfd40-premium-series-spec-sheet-en-us.md` |
| Conceptual docs are 100% drafted (as of Apr 2026) | `Zebra RFID IoT Connector Documentation Updates.md` (Part 3) |
| Tag metadata enum (RSSI, PHASE, SEEN_COUNT, ...) | `iot_setup_user_guide.md`, §Tag Metadata Selection |
| Post-filter ADD with REGEX and RSSI threshold example | `iot_setup_user_guide.md`, §Example to Set Post Filters |
| HH:MM:SS `mqttConnEVT` timestamp quirk | API schema (`mqttConnEVT.json`) confirmed in earlier audit |
| `set_config` uses `configData` (not `payload`) | API schema (`set_config.json`) confirmed in earlier audit |
| `get_installed_certificate` is singular (plural is schema typo) | API schema (`tag_config.json` vs `iot_commands.v1.1.json`) |

## B. Voice and Tone Note

- **Voice.** Declarative, evidence-anchored, plain language. Avoid hedge words ("might", "could possibly") except where genuinely uncertain.
- **Tone.** Authoritative without being condescending. The reader is a professional. Don't apologize for technical depth; do warn before introducing complexity.
- **Person.** Second person ("you do X") for tutorials and how-tos. Third person ("the sled does X") for explanations and reference.
- **Voice for Diátaxis quadrants.**
  - 📘 Explanation: Discursive, allows nuance, uses analogies.
  - 📗 Tutorial: Narrative-with-momentum, confidence-building, second person.
  - 📙 How-to: Imperative, terse, no narrative.
  - 📕 Reference: Tabular where possible, no opinion, schema-faithful.

## C. Open Questions for Subject-Matter Reviewers

These are unresolved technical points that affect content accuracy. Tag each Reference and Explanation page that depends on these claims with a "Pending SME confirmation" note until resolved.

1. **READER_DEFINED profile semantics.** What exactly does the schema-listed `READER_DEFINED` profile do at runtime? Does it equal BALANCED_PERFORMANCE or another profile?
2. **DATA_EP2 timeline.** Which firmware version will enable the second data pipe?
3. **Pre-filter expansion timeline.** Which firmware version raises the cap from 4 to 32?
4. **Barcode-via-IOTC.** Is the schema's `controlType: SCANNER` already partly wired? What is the target firmware version?
5. **`mqttConnEVT.timestamp` rationale.** Is the HH:MM:SS format intentional (likely yes — it predates ISO-8601 adoption in IOTC) or an errata to be fixed?
6. **`set_config.configData` vs `payload`.** Is the unique field name a deliberate API design choice or an inconsistency planned for cleanup?
7. **DA app SDK availability.** Is there a public SDK and/or template repository for Python and Node.js DA apps on Premium/RFD90 firmware?
8. **Wi-Fi 6 negotiation specifics.** Are there known APs that fail Wi-Fi 6 association with RFD40 Premium / RFD90?
9. **Firmware rollback procedure under MQTT.** Confirm that pointing `firmware_update` at an older image always succeeds, or document the exceptions.
10. **MDM endpoint vs SOTI endpoint.** When a SOTI Connect deployment is in use, is the active endpoint `epType: MDM`, `epType: SOTI`, or both?

## D. Style and Authoring Cross-References

- Apply the Zebra public style guide (`StyleGuide_P1086622-001.md`) to terminology, capitalization, and trademark usage (e.g., **Zebra eConnex™**, the "Z" stylized in product names).
- For Diátaxis adherence, the canonical reference is https://diataxis.fr/. Re-read it before authoring any new page; the framework rewards consistency.
- For decision matrices and tradeoff tables, prefer matrix layout (rows = scenarios, columns = options) over prose comparisons.
- For state-machine and sequence diagrams, prefer Mermaid syntax for inline rendering in Docusaurus.

---

*End of Zebra Handheld RFID IoT Connector — Conceptual Documentation deliverable.*

*This document supplies the audit, revised TOC, Diátaxis quadrant assignment, per-topic outline, and drafted conceptual content for the Zebra handheld RFID IOTC documentation project. Hand off to subject-matter reviewers per Appendix C. Sync periodically with the API schema corpus (`api-schema-reference/`) and the IOTC Features Guide draft to catch firmware-version updates.*
