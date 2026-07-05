# actions-v2.md — `_meta/` → topic source-traceability audit

> **Generated:** 2026-06-07 · **Auditor pass:** exhaustive recursive map of `_meta/` against every topic/page in
> [`DOCUMENTATION_TOC.md`](./DOCUMENTATION_TOC.md) (118 pages / 9 Parts).
> Companion to [`actions-v1.md`](./actions-v1.md) (which tracked Diátaxis/IA refactor A-01…A-19). This pass answers a
> different question: **for each published topic, which physical `_meta/` asset is its required source — and where is
> that relationship missing, broken, or reversed (source with no consuming page)?**

## Inputs & method

- **Topic catalog:** `_meta/governance/ia-blueprints/DOCUMENTATION_TOC.md` → the 118 pages under `docs/`.
- **Source tree audited (recursive):** `_meta/brand/`, `_meta/governance/`, `_meta/knowledge-base/product/{explanation,how-to,tutorials,reference}/`, `_meta/knowledge-base/research-library/`.
- Files were **read**, not inferred from names (per the audit constraint). Three subtree deep-reads + a governance/brand pass underpin the rows below.

### Source-of-Truth (confirmed)
`…/reference/handheld-rfid-iotc-api-schema-and-docs-technical-writer/` is the **only** API SoT (it alone carries `operation_descriptions/`, `tag_descriptions/`, `error_codes.json`, `info_description.md`, `deployment_guide/`). The sibling `…-zebra-official/` is a **mirror, NOT the SoT** — and is **provably stale** (`refrence/payload/cfgEventPayload.yaml` still carries the 8-flag schema; the SoT carries the corrected 16-flag + 4-threshold + `userApps` version from A-09). Per [`SINGLE-SOURCE-OF-TRUTH.md`](../site-rulebooks/SINGLE-SOURCE-OF-TRUTH.md §4), never regenerate docs from the official mirror.

### Legend — Mapping Status
- **Fully Mapped** — page's facts trace cleanly to a named `_meta/` SoT/source; relationship is sound.
- **Missing** — a required `_meta/` asset exists but is *not reflected/consumed* by the page (or only partially).
- **Unmapped** — the topic asserts facts with **no traceable `_meta/` source** (single-source-of-truth risk), OR a substantive `_meta/` source backs **no** page (orphan).
- **Out-of-scope** — source exists but is fixed-reader / marketing / investor material deliberately excluded from this handheld site (recorded so it is not mistaken for a gap).

---

## §1 — Missing relationships: API / Reference layer (Part 9 + how-tos that cite payloads)

| Topic / Page | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| `docs/reference/appendices/firmware-history.md` | *(none in `_meta/`)* — nearest is `…/product/reference/release-notes-123rfid-desktop-3-0-0-63.md` (Desktop **tool**, not reader firmware) | Reference data | **Unmapped** | Firmware version table (3.10.x–3.11.x, dates, deltas) has **zero SoT backing**; page self-flags "indicative." No authoritative reader-firmware changelog exists anywhere in `_meta/`. Needs a sourced changelog or an explicit non-authoritative banner. |
| `docs/reference/appendices/regulatory.md` | `…technical-writer/schemas/refrence/response/currentRegionResponse.yaml` (field names only) + `research-library/rfid-fundamentals-and-hardware/*` (band/standards background) | Schema + Reference data | **Missing** | The region-code→frequency-band table (US 902–928, EU1 865.6–867.6, JP/BR/CN/KR/AU…) and FCC/ISED/CE/MIC cert claims are **not in any SoT file** — `currentRegionResponse.yaml` defines only `country`/`regulatoryStandard` field *names*, not values. Numeric bands have no upstream owner; bind them to a sourced regulatory reference. |
| `docs/reference/glossary.md` → "Capacity and limits" | *(none — "firmware-dependent")* | Reference data | **Unmapped** | 150,000-event retention buffer, 500 TPS flush, 60 s default heartbeat, "PEM/PKCS#1 only" are tagged "canonical baseline / firmware-dependent" with **no schema or file owner**. Disclosed in an admonition (acceptable) but ownerless — same figures resurface unbacked in `fleet/retention-and-retry.md` (see §2). |
| `docs/reference/ctrl/operating-mode.md` + `docs/reference/appendices/tag-standards.md` | `…technical-writer/schemas/refrence/payload/{accessCmdKillPayload,accessCmdLockPayload,accessCmdWritePayload}.yaml` | Schema | **Missing** | Tag-access **write/lock/kill** payloads (passwords, `lockAction: PERMANENT_LOCK`, memory-bank targeting) are surfaced **only at table level**; no field-level reference. If write/kill/lock is a supported handheld surface, `operating-mode.md` needs the depth; if not, mark out-of-scope explicitly. |
| `docs/reference/mdm/about.md` · `docs/fleet/provisioning/soti-connect.md` | `…/product/reference/mdm-and-soti-interfaces.md`; `…technical-writer/schemas/refrence/response/{capablites_soti,epConfigurationSoti,ethResponseSoti,wifiResponseSoti}.yaml`; `…/schemas/response/dev_mgmt/{get_wifi_response_soti}.json` | Reference + Schema | **Fully Mapped** | SoT SOTI-shaped schemas + the loose `mdm-and-soti-interfaces.md` back these cleanly. (Listed here to confirm: no master-docset MDM source exists, but the SoT covers it.) |
| `docs/reference/{faq/*}.md` (throughput, broker list, cellular) | *(prose / product knowledge)* | Reference data | **Missing** | Several FAQ assertions ("max tags/sec", supported-broker list, cellular support) have no schema/file backing. Verify against an authoritative source or cite the backing reference page. |

---

## §2 — Missing relationships: content/source gaps (Parts 4–8)

| Topic / Page | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| `docs/fleet/retention-and-retry.md` (Layer-3 reader-side retention buffer) | `…/master-docset/batching-and-retention-guide-…md` | Source content | **Missing** | The nominal source is a **MarkSnip capture stub (~184 bytes, no content)**. The quantitative retention claims (150k events / 500 TPS) therefore have **no real source** in `_meta/` (mirrors the ownerless glossary figures). Source the buffer/flush numbers or mark firmware-dependent. |
| `docs/fleet/cloud-integration/gcp.md` | *(none)* — AWS/Azure/MQTT/HTTP-POST connect files exist; **no GCP file** | Source content | **Unmapped** | `master-docset/connect-fixed-readers-to-{aws,azure,mqtt-broker,http-post}-…md` back the sibling pages, but there is **no GCP connect source** anywhere in `_meta/`. The GCP page is authored from external provider docs only. |
| `docs/fleet/cloud-integration/aws.md` · `azure.md` | `…/master-docset/connect-fixed-readers-to-{aws-iot-core,azure-iot-hub}-…md` (fixed-reader) + `research-library/iot-platforms-and-edge/*` | Source content | **Missing** | Backing source is **fixed-reader** connect guides; handheld provider-specific steps (Thing creation, device registration) are adapted, not directly sourced. Confirm the handheld deltas are correct against an authoritative provider source. |
| `docs/observability/monitoring/battery.md` | `…/product/reference/reader-health-monitoring-and-gen2x.md`; `…/master-docset/configuration-of-management-events-…md`; (`health-events-format-…md` is a **stub**) | Source content | **Missing** | Battery `stateOfHealth`/drain specifics are sourced only from the management-events file + health-monitoring loose file; the dedicated `health-events-format` master-docset file is an **empty stub**. Battery thresholds partially trace to SoT `batteryAlert.yaml` (currently an out-of-scope event) — verify field provenance. |
| `docs/rfid/performance-tuning.md` · `docs/rfid/operating-mode-profiles.md` (Gen2X / dense-reader) | `…/product/reference/reader-health-monitoring-and-gen2x.md` (Gen2X half) | Source content | **Missing** | The Gen2X material in the source is only **thinly folded** into these pages; either develop a Gen2X subsection or accept the source's Gen2X half as under-consumed. |
| `docs/diagnose/failure-modes.md` · `docs/diagnose/symptoms.md` | `…technical-writer/error_codes.json` + `…/deployment_guide/*` (partial) | Source content | **Missing** | The FM-* taxonomy and symptom→failure-mode mapping are **editorially synthesized**; only the error-code leaves trace to `error_codes.json`. The mapping itself has no `_meta/` source — record as authored, or build a source matrix. |
| `docs/foundations/v1-1-features.md` · `docs/reference/faq/compatibility.md` | `…technical-writer/schemas/models/*.v1.1.json`; `…/product/reference/release-notes-123rfid-desktop-3-0-0-63.md` (thin) | Schema + Reference | **Missing** | Per-endpoint V1.0↔V1.1 support is inferable from the versioned model schemas but there is **no dedicated V1.1 feature/changelog source**. The release-notes file is Desktop-tool, not reader firmware. |
| `docs/rfid/barcode.md` | `explanation/zebra-handheld-sleds-hardware-platform/*spec-sheet.md` (which sleds) + `…technical-writer/schemas/refrence/events/barcodeDataEVTs.yaml` | Spec + Schema | **Fully Mapped** | "Which sleds" → spec sheets; `dataEVT.barcodeData` → SoT event schema. Sound (recorded for completeness). |

---

## §3 — Genuine content gaps: `_meta/` source exists but **no page consumes it**

| Topic that *should* exist | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| **"Migrate 123RFID Desktop settings → IOTC"** (no page) | `…/product/how-to/migrate-from-123rfid-desktop-to-iotc.md` | How-to source | **Unmapped** | Source maps Desktop antenna/trigger/GPO/RF-mode/dwell settings to IOTC `set_operating_mode`/`config_*` equivalents. The existing `docs/fleet/migration/*` pages are **firmware-version** (V1.0→V1.1) migration — a *different* meaning. Genuine content gap: add a how-to (e.g. `fleet/migration/from-123rfid-desktop.md`) or a `bootstrap-tools.md` section. |
| **123RFID Mobile app** tutorial + reference (no page) | `…/product/tutorials/123rfid-mobile-app-getting-started.md`; `…/product/reference/123rfid-mobile-app-reference.md` | Tutorial + Reference source | **Unmapped** | Android companion app (Rapid Read, Brand ID, Locate Tag, memory-bank reads). Zero docs coverage; docs currently treat **123RFID Desktop** as the sole bootstrap tool. **Product decision needed** — surface as an alternate bootstrap path, or mark out-of-scope. |
| **"Where IOTC fits" / use-cases** page (optional, no page) | `explanation/{use-case-hospitality,use-case-rfd40-retail}.md` | Explanation source | **Unmapped (optional)** | Two vertical use-cases (QSR/food, retail cycle-count) have no home. A single light `foundations/` "use cases" page would anchor the abstract API; reasonable to keep out-of-scope as marketing. Low priority. |

---

## §4 — Topics with **no `_meta/` backing** (authored from first principles / external knowledge)

| Topic / Page | Nearest `_meta/` source (if any) | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| `docs/foundations/mqtt-primer.md` · `foundations/mqtt/{topic-hierarchy,qos,auth-model,connection-lifecycle}.md` | `research-library/communication-mqtt-and-networking/*` (mqtt-essentials, mastering-mqtt, mqtt-vs-rest, mqtt-security-ssl-tls, mqtt-broker-selection) | Research background | **Fully Mapped** | First-principles MQTT, backed by the research-library category. Acceptable: no product-specific source needed. |
| `docs/foundations/rfid-primer.md` · `foundations/rfid-air-interface.md` | `research-library/rfid-fundamentals-and-hardware/*` (rfid-field-guide, basics-of-an-rfid-system, comptia-rfid-plus, antenna-selection) | Research background | **Fully Mapped** | Backed by the RFID-fundamentals category. |
| `docs/infrastructure/tls-and-certificates.md` · `tls-setup.md` · `certificate-rotation.md` | `research-library/security-privacy-and-cryptography/bulletproof-tls-guide/*` + SoT cert schemas | Research + Schema | **Fully Mapped** | Rotation/canary/CT-monitoring/short-lived-cert content maps directly to the Bulletproof-TLS guide; payloads to SoT. |
| `docs/foundations/documentation-guide.md` · `diagnose/where-things-fail.md` · `diagnose/misconceptions.md` | `research-library/{mental-models-and-reasoning/the-great-mental-models, data-and-information-architecture/diataxis-model}.md` | Methodology background | **Fully Mapped** | Diátaxis + mental-models methodology backing. |
| `docs/foundations/native-mqtt-vs-openapi.md` | `research-library/communication-mqtt-and-networking/mqtt-vs-rest.md`; (`master-docset/raw-mqtt-payload-schemas` is a **stub**) | Research + Source content | **Missing** | "OpenAPI illusion" concept is backed by research, but the raw-payload-schema master-docset source is an **empty stub**; the envelope facts actually come from the SoT `schemas/models/*`. Re-point provenance to SoT. |

---

## §5 — Orphaned `_meta/` source (backs no topic) — reverse missing relationships

| Source asset | Folder in `_meta/` | Dependency Type | Mapping Status | Disposition |
|---|---|---|---|---|
| Fixed-reader endpoint guides — TCP/IP, WebSocket, HID/keyboard-emulation, HTTP-POST | `…/master-docset/connect-fixed-readers-to-{tcpip,websocket,keyboard-emulation,http-post}-…md` | Source content | **Out-of-scope** | Handheld is MQTT-only; `rfid/barcode.md` covers scan via `dataEVT`, not HID. Correctly unreferenced. |
| GPIO / GPO / LED programming | `…/master-docset/{controlling-gpios-and-led,gpo-(general-purpose-output)-programming}-…md`; SoT `schemas/refrence/payload/gpiPayload.yaml`, `events/gpiEvents.yaml` | Source + Schema | **Out-of-scope** | RFD40/RFD90 have no GPIO header; `observability/events/model.md#what-is-not-currently-emitted` is the catch-all. |
| On-reader apps & analytics | `…/master-docset/{user-applications,nodejs-da-application,python-da-application,overview-of-data-analytics-applications,packaging-and-deployment,local-deployment-rest-api-guide}-…md`; SoT `events/{userAppEvent,userAppDetails}.yaml` | Source + Schema | **Out-of-scope** | DA apps / on-reader code / local REST are fixed-reader surfaces; FAQ confirms "no REST API" for handheld. |
| Fixed-reader migration guides | `…/master-docset/{fxconnect-to-iot-connector,rfid-api-3-to-iot-connector}-migration-guide-…md` | Source content | **Out-of-scope** | FxConnect / RFID-API3 → IOTC; not the firmware-wave migration of `docs/fleet/migration/*`. |
| Not-currently-emitted event schemas | SoT `schemas/refrence/events/{antennaEvent,ntpEvent,tempEvent,powerEvent,exceptionEvents,networkEvent,fwUpdateEvents,fileDownload,inventoryStatus,usageStatus}.yaml` | Schema | **Out-of-scope** | Listed by `event-configuration.md` as not emitted on V1.1; correctly parked under the events-model catch-all. |
| `get_capablity` / `set_eth` / `config_alerts` commands | SoT `schemas/response/dev_mgmt/{get_capablity,set_eth,config_alerts}.json` + `refrence/response/{deviceCapablity,capablites_soti}.yaml` + `payload/cfgAlertPayload.yaml` | Schema | **Out-of-scope / verify** | `set_eth` — Ethernet is read-only on handheld (`network.md` = `get_eth` only). `config_alerts` appears **superseded by `config_events`** — confirm. `get_capablity` is fixed-reader/SOTI. |
| Marketing / case studies | `explanation/{case-study-lowes,zebra-rfid-strategy-and-solutions,zebra-rfid-portfolio-brochure,zebra-rfid-portfolio-messaging,zebra-rfid-readers-flyer}.md`; `…/master-docset/{iot-connector-scan-fact-sheet,customer-facing-…,real-time-data-with-iotc-software,rfid-iot-connector}.md` | Marketing source | **Out-of-scope** | No topic warranted; `rfid-iot-connector.md` is a raw webinar transcript (not citable). |
| Windows .NET / POS integration | `…/product/how-to/windows-rfid-reader-and-pos-integration.md` | How-to source | **Out-of-scope** | Different product surface (.NET SDK); at most one cross-reference line in `docs-and-api-reference.md`. |
| Investor / strategy research | `research-library/business-strategy-and-industry/{zebra-2025-annual-report,zebra-2026-proxy-statement,rfid-business-models-impact,rfid-adoption-commercial-issues}.md` | Research background | **Out-of-scope** | A technical docs site needs no investor/strategy page. |
| Academic vertical applications (~21 chapters + playbooks) | `research-library/rfid-applications-and-case-studies/*` (race-timing, library-circulation, wine supply chain, construction-waste, anti-counterfeiting, etc.) | Research background | **Out-of-scope** | Background only; would remain mostly unused even if a use-cases page were added. |
| EPC discovery / RTLS | `research-library/iot-platforms-and-edge/{epc-network-discovery-services,epcglobal-dht-discovery,rtls-guide,what-is-rtls}.md` | Research background | **Out-of-scope** | IOTC handheld is presence-reading, not EPCIS/RTLS. |

---

## §6 — Dead / duplicate / empty source assets (cleanup candidates)

| Asset | Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| Schema/format capture **stubs** (MarkSnip, ~100–185 bytes, no content) | `…/master-docset/{operating-modes-schema,tag-data-events-format,health-events-format,raw-mqtt-payload-schemas,batching-and-retention-guide}-…md` | Source content | **Missing (hollow)** | These are the *nominal* sources for the entire `docs/reference/*` schema layer, `rfid/dataevt-schema.md`, and `fleet/retention-and-retry.md` — but they are **empty**. The real schema source is the SoT (`…technical-writer/schemas/**`). Delete the stubs or replace with pointers to the SoT so they stop reading as coverage. |
| Duplicate `introduction-*.md` (23 files → 5 distinct pages) | `…/master-docset/introduction-zebra-iot-connector-documentation-(2..23).md` | Source content | **Out-of-scope (dupe)** | ~18 of 23 are byte-identical duplicates. Materially unique: `about/index`, `deployment_modes (10)`, `setupziotc (17)`, and **`directionality (22)/(23)`** (the only Portal-Directionality-mode source — relevant to `operating-mode-profiles.md`). Drop the rest. |
| Empty SoT stub | `…technical-writer/deployment_guide/api-reference-index.md` (**0 bytes**) | Source content | **Missing (hollow)** | Intended to back `reference/api-overview.md` / `docs-and-api-reference.md`; contributes nothing. Populate or remove. |
| Heartbeat event schema | SoT `schemas/refrence/events/heartbeatEvents_new.yaml` | Schema | **Keep — NOT a dupe (correction 2026-06-07)** | Earlier called a dead duplicate; byte inspection shows the reverse — `heartbeatEvents.yaml` is a **120-byte stub** while `heartbeatEvents_new.yaml` (**1354 B**) carries the only heartbeat battery fields (`batteryStatus.health/level/chargeStatus`). `_new` is the **substantive** file; **do not delete it.** The empty `heartbeatEvents.yaml` is the stale stub, but it may be `$ref`'d elsewhere — leave it pending a reference check rather than deleting blind. |
| Fixed-reader OpenAPI | SoT `docs/FX90.yaml` | Schema | **Out-of-scope** | Full FX90 fixed-reader OpenAPI; upstream artifact only. |
| Stale mirror | `…-zebra-official/` (entire tree, esp. `refrence/payload/cfgEventPayload.yaml`) | Schema | **Out-of-scope (do-not-source)** | 8-flag stale schema; never regenerate docs from it (see SoT note above). |

---

## §7 — Governance & brand dependency mapping (config/template/asset, not TOC topics)

These `_meta/` assets are **required dependencies of the site system**, not of any single doc topic. Recorded so the inventory is exhaustive.

| Consumer (site system) | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Notes |
|---|---|---|---|---|
| `src/components/NotFoundBody.tsx` (404 surfaces) | `governance/site-rulebooks/404-PAGE.md` | Spec / Template | **Fully Mapped** | Component tracks §3a–§3g of the rulebook (verified in source). |
| Every page's `description` front matter | `governance/site-rulebooks/META-DESCRIPTION.md` | Policy / Config | **Fully Mapped** | Enforced across pages. |
| Page titles, `sidebar_label`, URL slugs, `sidebars.ts` | `governance/site-rulebooks/{TITLE-NAMING,URL-NAMING}.md` | Policy / Config | **Fully Mapped** | The "coherent quartet" rules (title/URL/sidebar/description). |
| Sidebar placement / orphan-prevention | `governance/site-rulebooks/ORPHAN-PAGES-AUDIT.md` | Policy / Config | **Fully Mapped** | Cluster tables reconciled with `sidebars.ts` (A-17). |
| d2 diagram fences + `deploy.yml` d2 install | `governance/site-rulebooks/D2-MIGRATION.md` | Policy / Config | **Fully Mapped** | remark-d2 toolchain rulebook. |
| SoT designation (this whole audit) | `governance/site-rulebooks/SINGLE-SOURCE-OF-TRUTH.md` | Policy | **Fully Mapped** | Defines technical-writer-folder-as-SoT. |
| Authoring process + CI regression guards | `governance/policy/{authoring-workflow,invariants}.md` | Policy | **Fully Mapped** | A-15/A-16 policy docs. |
| IA blueprint / this TOC | `governance/ia-blueprints/{DOCUMENTATION_TOC,DOCUMENTATION_TOC_REVIEW,actions-v1}.md` + `…/master-docset/zebra-handheld-rfid-iotc-{toc,toc-outline,conceptual-toc,content}.md` | Blueprint | **Fully Mapped** | The 4 master-docset TOC/outline/content files are the IA precursors; `…-content.md` (261 KB) drafted prose for `foundations/*` + `quick-start/*`. |
| Docusaurus theme — navbar logo + favicon | `brand/logos/**` (svg/png/eps, 12 files) | Asset | **Fully Mapped (partial copy)** | **Wired.** 5 of 12 logos copied to `static/img/` (`zebra-logo-{black-horizontal,black-stacked,white-horizontal,white-stacked}.svg` + `black-stacked.png`); favicon referenced at `docusaurus.config.ts:27`; navbar uses the copied subset. EPS/CMYK print masters correctly stay in `_meta/` only (the web build needs only the copied SVG/PNG). |
| Docusaurus theme — body/heading/mono typography | `brand/fonts/{ZebraSans,ZebraMono}/*.otf` (7 present) | Asset | **Resolved — wired** (2026-06-07, A8) | Headings now render in **Zebra Sans** and code in **Zebra Mono** via `@font-face` in `src/css/custom.scss` (the 7 `.otf` copied to `src/css/fonts/`, `font-display: swap`). Body stays on the system stack by design. *(Audit-time finding, since closed: at the audit the fonts were unwired — no `static/fonts/`, no `@font-face`.)* See §9 #7 + §10.3. |
| `governance/audits/` | `.gitkeep` only (empty) | — | **n/a** | Reserved for future audit artifacts (e.g. this file's successors). |

---

## §8 — Fully-Mapped clusters (sound source→topic chains, no action needed)

| Topic cluster | Required `_meta/` source | Status |
|---|---|---|
| **Part 9 command reference** — `reference/mgmt/*`, `reference/ctrl/*`, `reference/data/tag-data-event.md`, `reference/events/all-events.md`, `reference/api-overview.md` | SoT `operation_descriptions/*.md` + `schemas/refrence/{payload,response,events}/*` + `schemas/{commands,response,events,models}/**` + `exported_tags/*.json` + `tag_descriptions/*.md` + `error_codes.json` | **Fully Mapped** |
| **Quick Start phases 1–7** | SoT `deployment_guide/{README,prerequisites,phase1..phase5}.md` + `tutorials/zebra-handheld-rfid-iotc-deployment-guide/*` (per-command + `zebra_iotc_deployment_guide.md`) | **Fully Mapped** |
| `foundations/hardware-tiers.md` · `architecture/handheld-considerations.md` · `quick-start/prerequisites/requirements.md` | `explanation/zebra-handheld-sleds-hardware-platform/*` (RFD40/RFD90 spec sheets, QSG, PRG, setup guide) | **Fully Mapped** |
| `foundations/bootstrap-tools.md` · `quick-start/phase-2.md` · `fleet/provisioning/bulk-123rfid.md` | `explanation/123rfid-desktop-fact-sheet.md` + `how-to/connect-a-reader-with-123rfid-desktop.md` + `tutorials/123rfid-desktop-getting-started.md` + `reference/123rfid-desktop-feature-reference.md` | **Fully Mapped** |
| `fleet/provisioning/soti-connect.md` · `reference/mdm/about.md` · `fleet/provisioning-models.md` | `explanation/soti-connect-flyer.md` + `reference/mdm-and-soti-interfaces.md` + SoT SOTI schemas | **Fully Mapped** |
| `tutorials/read-your-first-tag.md` | `tutorials/rfd40-rfd90-first-mqtt-connection.md` + `master-docset/zebra-rfid-iot-connector-getting-started-guide.md` (one of only two genuinely handheld-authored docset files) | **Fully Mapped** |
| Foundations primers (MQTT / RFID / TLS / methodology) | `research-library/{communication-mqtt-and-networking, rfid-fundamentals-and-hardware, security-privacy-and-cryptography/bulletproof-tls-guide, mental-models-and-reasoning, data-and-information-architecture}/*` | **Fully Mapped** |
| `rfid/operating-mode-profiles.md` · `performance-tuning.md` · `operating-mode/*` | `master-docset/{controlling-operating-mode,advanced-settings,antenna-port-settings,trigger-settings,access-operations,save-config}-…md` + SoT operating-mode schemas | **Fully Mapped** |
| `observability/configure-events.md` · `heartbeat.md` · `events/{model,catalog}.md` · `reference/mgmt/event-configuration.md` | `master-docset/configuration-of-management-events-…md` + SoT `schemas/events/*` + `config_events` 16-flag (A-09) | **Fully Mapped** |

---

## §9 — Prioritized actions (derived from §1–§6)

> **Resolution log (2026-06-07, "gaps + flagged polish" pass).** Implemented: **#5** — new [`fleet/migration/from-123rfid-desktop`](../../../docs/fleet/migration/from-123rfid-desktop.md) settings-migration how-to. **#3 / firmware-history / regulatory / retention / cloud / diagnose** — buried disclaimers promoted to prominent `:::caution`/`:::note` provenance admonitions; per the "flag, don't invent" rule, ownerless facts (regulatory bands, firmware changelog, 150k/500-TPS retention constants, cloud-provider steps, symptom→FM mapping) were **flagged as non-authoritative with their real authoritative source named**, not fabricated. Still open / external-only: **#2** (hollow `_meta` stubs — source cleanup), **#6** (123RFID Mobile product decision), **#7** (wire ZebraSans/ZebraMono fonts — theme change), **#8/#9** (`config_alerts` supersession + `rssiFilter` handheld scope — verification).

**Resolution log (2026-06-07, execution pass — commit `80aab22`).** The items left open above were then executed and deployed; the authoritative per-item record is in [`actions-v2-leftover.md`](./actions-v2-leftover.md#resolution-log--2026-06-07). Closed since: **#2** — the 5 hollow stubs replaced with SoT pointers and `api-reference-index.md` populated (`heartbeatEvents_new.yaml` **kept** — it is the substantive 1354-B schema, *not* a dupe; §6 corrected). **#6** — new [`foundations/mobile-app`](../../../docs/foundations/mobile-app.md) (123RFID Mobile as a sled-side bootstrap/operator path); a use-cases page was **declined** as marketing dilution (out-of-scope). **#7** — Zebra Sans (headings) + Zebra Mono (code) **wired** via `@font-face` in `src/css/custom.scss` (7 `.otf` → `src/css/fonts/`; body kept on the system stack). **#8** — `config_alerts` **confirmed superseded** by `config_events`, and a field-level access-operations reference (`READ`/`WRITE`/`ACCESS`/`LOCK`/`KILL`, `lockAction`, passwords) was added to `reference/ctrl/operating-mode.md`. **#9** — `rssiFilter` **confirmed FX9600-only → out-of-scope** for RFD40/RFD90 (recorded in `performance-tuning.md` + the migration how-to; RSSI thresholding moves application-side). Nothing here remains open; the only residual follow-up is external (live AWS/Azure provider-doc delta, #4).

1. **(Withdrawn)** — the consolidated-config MGMT reference action and its error-code mappings were later reverted and removed from the live docs per a product decision (§1).
2. **Hollow schema stubs** — delete/redirect the 5 empty `master-docset/*format*/*schema*` files to the SoT so they stop reading as coverage; populate or remove `deployment_guide/api-reference-index.md` (0 bytes) and `heartbeatEvents_new.yaml` (§5, §6).
3. **Ownerless quantitative claims** — bind `firmware-history.md`, `regulatory.md` band table, and the 150k/500-TPS retention figures (glossary + `retention-and-retry.md`) to a sourced reference, or banner them non-authoritative (§1, §2).
4. **`gcp.md` unsourced** + AWS/Azure handheld deltas — confirm against authoritative provider sources (§2).
5. **123RFID-Desktop-settings migration** — author the missing how-to (source exists, no page) (§3).
6. **Product decisions** — 123RFID **Mobile** app coverage; optional use-cases page (§3).
7. **Wire the brand fonts** — ZebraSans/ZebraMono (9 `.otf`) are **confirmed unused**: copy to `static/fonts/` and add `@font-face` + font-family vars in `src/css/`, or record the fonts as intentionally unused. (Logos are already wired — see §7.) (§7, §10.0)
8. **Confirm `config_alerts` is superseded by `config_events`**, and decide whether write/lock/kill access payloads need field-level depth (§1, §5).
9. **Verify `rssiFilterPayload` handheld scope** — its YAML carries an FX9600 (fixed-reader) RSSI threshold (−88…−26 dBm) and is mapped to `performance-tuning.md`; confirm RFD40/RFD90 support or mark it out-of-scope alongside the other multi-antenna fixed-reader schemas (§10.1, §10.3).

---

## §10 — File-level completeness reconciliation

> §1–§9 audit at **topic granularity**. This section audits at **file granularity** — every one of the **889** files under `_meta/` *(audit-time count; **873** today — see the §10.0 reconciliation note)* is bucketed, so no nested asset is skipped. A second pass (3 parallel recon agents reading each subtree against §1–§9) confirmed the topic-level findings are sound and surfaced the file-level entries below: nothing changes the gaps in §1–§3; the additions are (a) **file-level naming** of schemas previously covered only as a group (§10.1), (b) assets that are out-of-scope/dead/infra but were **not yet explicitly bucketed** (§10.2), and (c) two **new flags** (§10.3).

### §10.0 — Coverage matrix (every file bucketed)

| `_meta/` area | Files | Mapped (backs a page) | Out-of-scope | Infra / tooling | Dead-dupe | Accounted by |
|---|---:|---:|---:|---:|---:|---|
| `README.md` (repo root) | 1 | — | — | 1 | — | repo readme |
| `brand/` | 21 | 12 logos (partial copy) | — | — | — | §7 (+7 fonts, now **wired** — §7, §10.3) |
| `governance/` | 17 | 17 (policy / config / blueprint / style-guide / this audit) | — | — | — | §7 + ia-blueprints |
| `product/explanation/` | 22 | 16 hardware + 4 (123rfid/soti/portfolio) | 2 marketing | — | — | §8, §5 |
| `product/how-to/` | 3 | 1 (connect-a-reader) | 1 (windows-POS) | — | — | §8, §5; **1 source-no-page** (migrate, §3) |
| `product/tutorials/` | 10 | 4 (deployment-guide spine, rfd40-rfd90, 123rfid-desktop) | — | — | 5 per-command dupes | §8; §10.2; **1 mobile, §3** |
| `product/reference/…technical-writer/` (SoT) | 232 | ~150 schemas + 27 op-desc + 14 tag-desc + deployment-guide | — | ~40 build/infra | — | §1, §8, §10.1, §10.2 |
| `product/reference/…zebra-official/` | 147 | — | — | — | 147 stale mirror | §6 (do-not-source) |
| `product/reference/…master-docset/` | 71 | ~25 substantive | ~16 fixed-reader | — | ~30 (18 dup intros, 5 stubs, transcripts) | §5, §6, §8 |
| `product/reference/…mqtt-api-reference/` | 24 | — | — | — | 24 dup prose of SoT op-desc | §10.2 |
| `product/reference/` loose `.md` | 5 | 3 (desktop-feature, mdm-soti, gen2x) | 1 (release-notes) | — | — | §8, §5; **1 mobile-ref, §3** |
| `research-library/` (consumed) | 173 | mqtt 10 · rfid-fundamentals 117 · security 41 · mental-models 1 · data-IA 4 | — | — | — | §8 |
| `research-library/` (background) | 163 | — | api-web 6 · business 4 · iot-platforms 17 · rfid-applications 125 · rfid-deployment 11 | — | — | §5, §10.2 |
| **Total** | **889** | | | | | audit-time total — reconciles to **873** today (see note ↓) |

> **Reconciliation (2026-06-07).** The matrix above is the **audit-time snapshot (889 files)**. After the execution pass (commit `80aab22`), `find _meta -type f` = **873**. The delta is fully accounted for: **product 514 → 497** (C3 removed 17 byte-distinct `introduction-*` captures from `master-docset/`) and **governance 17 → 18** (this `actions-v2-leftover.md` execution-tracker was added). Bucket logic and conclusions are unchanged. Note also that the `chore/consolidate-meta-folder` branch moved `product/` and `research-library/` under **`_meta/knowledge-base/`**; the area names above remain the conceptual buckets, now nested one level deeper on disk.

### §10.1 — File-level mappings (schemas previously covered only as a §8 group)

These SoT payload schemas are **Fully Mapped**; §1 named several against their 📕 *reference* page, but the **📙 how-to page each also backs** was not itemized. Naming them here completes the file-level trace (verified by reading each YAML).

| Topic / Page | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| `docs/rfid/operating-mode/configure.md` | SoT `schemas/refrence/payload/{queryPayload,selectPayload,radioStartCondPayload,radioStopCondPayload,inventorySettingsPayload,operatingModePayload}.yaml` | Schema | **Fully Mapped** (now named) | The 📙 configure how-to's singulation/SELECT/start-stop/aggregation sections derive from these; §1 mapped them only to the 📕 `reference/ctrl/operating-mode.md`. |
| `docs/rfid/operating-mode/configure.md` · `docs/rfid/dataevt-schema.md` | SoT `schemas/refrence/payload/tagMetaDataPayload.yaml` | Schema | **Fully Mapped** (now named) | Per-tag reporting metadata (RSSI/PHASE/SEEN_COUNT/CHANNEL/PC/EPC/TID/USER) — backs both the configure how-to and the dataEVT field reference. |
| `docs/rfid/operating-mode/post-filters-configure.md` | SoT `schemas/refrence/payload/{postFilterPayload,tagReportFilterPayload,tagIdFilterPayload}.yaml` | Schema | **Fully Mapped** (now named) | Post-filter add/modify + report-duration dedup; §1 mapped `postFilterPayload` only to 📕 `tag-filtering.md`. |
| `docs/infrastructure/network/wifi.md` | SoT `schemas/refrence/payload/cfgWifiPayload.yaml` | Schema | **Fully Mapped** (now named) | The 📙 Wi-Fi how-to's WPA2Personal/Enterprise(EAP-TLS) bodies; §1 mapped it to 📕 `reference/mgmt/network.md`. |
| `docs/infrastructure/network/ethernet.md` | SoT `schemas/refrence/payload/ethConfigPayload.yaml` | Schema | **Fully Mapped** (now named) | Read-only Ethernet state (no `set_eth` on handheld). |
| `docs/infrastructure/configure-endpoints.md` | SoT `schemas/refrence/payload/cfgEndpointPayload.yaml` + `epName.yaml` | Schema | **Fully Mapped** (now named) | Endpoint host/port/TLS/credentials/clientId for the 📙 configure how-to. |
| `docs/infrastructure/certificate-management.md` | SoT `schemas/refrence/payload/{installCertPayload,delCertPayload}.yaml` | Schema | **Fully Mapped** (now named) | Install (inline/HTTP) + delete-by-logical-name; the 📙 how-to home. |
| `docs/infrastructure/system-operations.md` | SoT `schemas/refrence/payload/osUpdatePayload.yaml` | Schema | **Fully Mapped** (now named) | `set_os` firmware-update URL/payload. |
| `docs/quick-start/phase-6.md` · `docs/rfid/start-stop-inventory.md` | SoT `schemas/refrence/payload/ctrlOprPayload.yaml` | Schema | **Fully Mapped** (now named) | `control_operation` START/STOP; §1 mapped it to 📕 `reference/ctrl/inventory-control.md`. |
| `docs/observability/configure-events.md` | SoT `schemas/refrence/payload/cfgEventPayload.yaml` | Schema | **Fully Mapped** (now named) | A-09 16-flag/4-threshold/`userApps` config — the 📙 how-to body (§8 noted it; named here). |

### §10.2 — Newly-bucketed assets (out-of-scope / dead / infra, previously unnamed)

| Topic / Page | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| *(none — duplicate prose layer)* | `product/reference/handheld-rfid-iotc-mqtt-api-reference/*.md` (24 files) | Source content | **Dead-dupe (do-not-source)** | Per-operation prose that **mirrors** the SoT `operation_descriptions/*.md` 1:1 (alerts, config_endpoint, get_version, set_post_filter, …). Not a second source; back no page. Keep SoT as the single source; do not generate pages from these. |
| *(none — duplicate prose layer)* | `product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/{config_endpoint,control_operation,get_endpoint_config,get_version,reboot}.md` (5) | Source content | **Dead-dupe** | Per-command mirrors of SoT op-descriptions inside the deployment-guide folder; the guide *spine* (`zebra_iotc_deployment_guide.md`) is the real source (§8). |
| *(none — single internal antenna)* | SoT `schemas/refrence/payload/{antennaStopCondPayload,delayBtwnAntennaCyclesPayload}.yaml` | Schema | **Out-of-scope** | Multi-antenna **fixed-reader** tuning; RFD40/RFD90 have one internal antenna (`architecture/handheld-considerations.md`). Correctly unconsumed. |
| *(none — background research)* | `research-library/api-and-web-design/*` (6: mastering-api-architecture, restful-web-api-patterns, the-design-of-web-apis, design-and-build-great-web-apis, rfid-middleware-architecture, web-api-cookbook-js) | Research background | **Out-of-scope** | API-design theory; the docs' API design is SoT-driven. No consuming page. |
| *(none — background research)* | `research-library/rfid-deployment-and-buyers-guides/*` (11: 10-steps/20-questions/24-questions, buyers-guide-*, deploying-rfid-*, asset-management-*, rfid-system-planning-strategy, tool-tracking-buyers-guide) | Research background | **Out-of-scope** | Procurement/methodology advisories; no consuming page (provisioning pages derive from product sources, not these). |
| *(none — background research)* | `research-library/iot-platforms-and-edge/*` non-RTLS/EPC (13: big-data-and-iot, iot-a-to-z, iot-architectures-and-standards, iot-edge-*, iot-in-5-days, iot-mit-*, iot-precision-*, iot-sensors-to-cloud, iot-what-is, learning-iot-raspberry-pi, mastering-iot-*, practical-iot-handbook, rethinking-iot) | Research background | **Out-of-scope** | General IoT/edge background (the 4 RTLS/EPC files already in §5). No consuming page. |
| `docs/reference/api-overview.md` (assembly metadata) | SoT `exported_tags/*.json` (15) + `tag_descriptions/*.md` (14) + `info_description.md` | Infra / metadata | **Fully Mapped (infra)** | The OpenAPI tag-group/sub-tag metadata that the api-overview's 4-group/13-sub-tag structure mirrors. Generated/assembly inputs, not prose pages. |
| *(none — build tooling)* | SoT `scripts/*.py` (7), `.vscode/*` (2), `README.md`, `schemas/README.md`, `requirements.txt`, `.gitignore`, `schemas/example_description.json`, `tag_config.json`, generated `docs/openapi_md.json`, `docs/*.{pptx,html}`, `docs/css/*`, `schemas/css/*`, `docs/assets/zebra-logo.jpg` | Build tooling | **Infra (non-content)** | ~40 files that build/serve the external API-reference site; not page sources. `FX90.yaml` already noted (§6). |

### §10.3 — New flags (from the file-level pass)

| Topic / Page | Required File/Folder in `_meta/` | Dependency Type | Mapping Status | Missing Relationship Description |
|---|---|---|---|---|
| `docs/rfid/performance-tuning.md` | SoT `schemas/refrence/payload/rssiFilterPayload.yaml` | Schema | **Resolved — out-of-scope** (2026-06-07) | RSSI pre-filter (−88…−26 dBm) maps to performance-tuning, but the YAML reads verbatim *"Currently ONLY supported by the FX9600"* → **not available on RFD40/RFD90**. Recorded in `performance-tuning.md` ("Beyond the four levers") + the migration how-to (RSSI thresholding goes application-side); belongs in the §10.2 fixed-reader bucket. (→ §9 #9) |
| Docusaurus theme — typography | `brand/fonts/{ZebraSans,ZebraMono}/*.otf` (7 present, not 9) | Asset | **Resolved — wired** (2026-06-07, A8) | Zebra Sans (headings) + Zebra Mono (code) wired via `@font-face` in `src/css/custom.scss`; the 7 `.otf` were copied to `src/css/fonts/` (webpack-resolved + baseUrl-safe, `font-display: swap`). Body kept on the system stack (unsubsetted `.otf` as body text would regress load perf). (→ §7, §9 #7) |
