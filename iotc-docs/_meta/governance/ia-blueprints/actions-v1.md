# actions-v1 — execution plan for DOCUMENTATION_TOC_REVIEW.md

> Every recommendation in [`DOCUMENTATION_TOC_REVIEW.md`](./DOCUMENTATION_TOC_REVIEW.md) — mandatory, recommended, optional, and standing — turned into a discrete, executable action.
> For **each** action this document lists the `_meta` content (files **and** folders, **direct and indirect**) required to *understand* and *execute* it, plus the unavoidable non-`_meta` execution dependencies.
> Source of truth for all MQTT API schema / error-code / payload / event facts: **`_meta/knowledge-base/product/reference/handheld-rfid-iotc-api-schema-and-docs-technical-writer/`** (the "technical-writer" SoT). The sibling `…-zebra-official`, `…-master-docset`, and `…-mqtt-api-reference` folders are **not** authoritative — do not source facts from them.
> Date: 2026-06-06.

---

## Legend

- **Priority** — **M** Mandatory (the review's highest-value fixes: C1, C2) · **R** Recommended · **O** Optional / evaluate · **S** Standing guard (protect / process).
- **Review ref** — the section/ID in DOCUMENTATION_TOC_REVIEW.md the action implements.
- "Direct" `_meta` content = files the action edits or reads first-hand. "Indirect" = files needed to *understand* the action correctly (governance rules, framework theory, source facts) even if not edited.

---

## Section 1 — Shared `_meta` dependency packs

To avoid repeating ~40 paths per action, four reusable packs are defined here. Each action below says "**Packs:** …" then adds action-specific files.

### Pack SoT — the API schema source of truth
`_meta/knowledge-base/product/reference/handheld-rfid-iotc-api-schema-and-docs-technical-writer/` (whole folder is the canonical source; the high-value members:)
- `README.md` — the regeneration workflow (edit schema/description → `scripts/generate_openapi_tags_md.py` → `docs/openapi_md.json` → Docusaurus gen-api-docs). **Read before changing any reference fact** so edits land in the generated API reference, not just the docs prose.
- `error_codes.json` — canonical error table, codes 0–28 (the only authoritative error-code source).
- `tag_config.json` — tag groups, operation→tag map, operation ordering (defines the sub-tag taxonomy that Part 9 and Part 4–6 mirror).
- `info_description.md` — top-level API description.
- `operation_descriptions/` — per-operation prose (`install_certificate.md`, `config_events.md`, `control_operation.md`, `set_operating_mode.md`, `set_wifi.md`, `set_os.md`, `reboot.md`, `get_status.md`, `dataEVT.md`, `heartBeatEVT.md`, `alerts.md`, `mqttConnEVT.md`, … 37 files).
- `tag_descriptions/` — per-sub-tag prose (`Certificate_Management.md`, `Event_Configuration.md`, `Inventory_Control.md`, `Operating_Mode.md`, `Device_Status.md`, `Device_Health.md`, `Network_Configuration.md`, `MQTT_Endpoint_Configuration.md`, `System_Operations.md`, `Tag_Data_Event.md`, `Tag_Filtering.md`, `Alerts.md`, `MQTT_Connectivity.md`, `Device_Configuration.md`). **These map 1:1 to the API Reference sub-tags and to the Part 4–6 concept pages.**
- `schemas/commands/{control,dev_mgmt}/*.json` — command payload schemas.
- `schemas/events/*.json` — event schemas (`alerts.json`, `dataEVT.json`, `heartBeatEVT.json`, `mqttConnEVT.json`).
- `schemas/response/{control,dev_mgmt}/*.json` — response schemas (incl. `dev_mgmt/cloud_connect.json` for the code-1/cloud_connect notes).
- `schemas/refrence/{payload,events,response}/*.yaml` — field-level component schemas (this is where the *individual fields* live — e.g. `payload/cfgEventPayload.yaml`, `payload/installCertPayload.yaml`, `payload/ctrlOprPayload.yaml`, `payload/radioStartCondPayload.yaml`, `response/alertDetails.yaml`, `response/installedCertResponse.yaml`).
- `schemas/models/*.json` — envelope models (`iot_*_response.v1.1.json`, `iot_*_commands.v1.1.json`).
- `exported_tags/*.json` — per-tag exported bundles (one per sub-tag).
- `scripts/*.py` — generators (`generate_openapi_tags_md.py`, `extract_openapi_tags.py`, `clean_descriptions.py`, …).
- `docs/openapi_md.json`, `docs/FX90.yaml` — the rendered OpenAPI spec (generated; do not hand-edit).

### Pack GOV — governance rulebooks
`_meta/governance/`
- `site-rulebooks/TITLE-NAMING.md` — Diátaxis title shapes (§2: concept=noun, how-to=verb/"How to", tutorial=phased/`Tutorial:`, reference=object); §6 title-vs-sidebar-label; §7 anti-patterns incl. "mixed shapes (concept + how-to) → split the page"; §3a vertical-pipe-not-dash.
- `site-rulebooks/URL-NAMING.md` — §1a URL↔H1; §7 stability (URLs permanent, renames need 301s); §7a blast-radius; §9 applied-renames table; §9 future-pass candidates (`/infrastructure/security/model` → `/infrastructure/tls-and-certificates`).
- `site-rulebooks/META-DESCRIPTION.md` — five description templates; the "title/URL/sidebar/description = coherent quartet" rule.
- `site-rulebooks/ORPHAN-PAGES-AUDIT.md` — reachability classification of all ~115 docs; **already classifies `errors/handling` and `cloud-integration/tutorial-fleet` as "intentional"** (conflicts with review C2 — reconcile here); re-audit cadence via `scripts/check_reachability.py`.
- `site-rulebooks/D2-MIGRATION.md` — D2 diagram inventory + syntax + theme; needed whenever a page carrying a D2 diagram is split/moved.
- `site-rulebooks/404-PAGE.md` — redirect/"did you mean" behaviour; extends the quartet to a **quintet** (adds 404 behaviour) for any URL that has ever existed.
- `style-guide/zebra-style-guide.md` — corporate baseline (Zebra Technical Publications Style Guide P1086622-001). **Note the conflict:** it mandates title-case headings, no humour, no contractions, second-person imperative — the site-rulebooks deliberately override this with sentence-case + warm voice. The site-rulebooks are the operative layer; the style guide is the fallback.
- `audits/` (currently only `.gitkeep`) — intended home for generated audit output (A-14 balance metric, A-15 re-audit artifacts).
- `policy/` (currently only `.gitkeep`) — intended home for any new authoring policy (A-09 single-source rule).

### Pack IA — the blueprint trio
`_meta/governance/ia-blueprints/`
- `DOCUMENTATION_TOC.md` — the generated TOC being improved.
- `DOCUMENTATION_TOC_REVIEW.md` — the review this plan executes.
- `actions-v1.md` — this file.

### Pack FW — framework theory (the "understand" layer)
`_meta/knowledge-base/research-library/`
- `data-and-information-architecture/diataxis-model.md` — **the** Diátaxis source; the four-mode theory, blur, quality essay, complex-hierarchies.
- `mental-models-and-reasoning/the-great-mental-models.md` — first-principles / circle-of-competence / map-is-not-territory / inversion framing.
- (supporting IA) `data-and-information-architecture/information-architecture-rosenfeld.md`, `discipline-of-organizing.md`, `metadata-standards-deconstruction.md`.

### Pack KB-DOCSETS — compiled docsets (IA rationale + rendered API reference)
`_meta/knowledge-base/product/reference/`
> **Not** the fact SoT (that stays Pack SoT / technical-writer). These are the **IA-rationale** and **rendered-reference** surfaces the actions must stay consistent with.
- `handheld-rfid-iotc-master-docset/` — 71-file compiled docset. High-value members:
  - **IA blueprints** — `zebra-handheld-rfid-iotc-toc-outline.md` (9 Units × Diátaxis modes — the conceptual precursor the live TOC realizes), `…-toc.md`, `…-conceptual-toc.md`, `…-content.md`.
  - **FAQ source** — `zebra-iot-connector-faqs-zebra-iot-connector-documentation.md`.
  - **Fixed-reader guides** — `connect-fixed-readers-to-*.md`, `local-deployment-rest-api-guide-*.md` (the surface handheld docs are scoped *against*; the cloud how-tos adapt these).
  - **Migration guides** — `fxconnect-to-iot-connector-migration-guide-*.md`, `rfid-api-3-to-iot-connector-migration-guide-*.md`.
  - **Conceptual explainers (parallel Part 4–6)** — `controlling-operating-mode`, `trigger-settings`, `advanced-settings`, `antenna-port-settings`, `access-operations`, `operating-modes-schema`, `tag-data-events-format`, `health-events-format`, `raw-mqtt-payload-schemas`, `batching-and-retention-guide`, `certificate-management`, `communication-network-settings`, `configuration-of-management-events`, `save-config` (each `-zebra-iot-connector-documentation.md`).
  - **DA-app tutorials** — `nodejs-da-application`, `python-da-application`, `overview-of-data-analytics-applications`, `zebra-rfid-iot-connector-getting-started-guide.md`.
  - **Background** — `what-is-iot-connector`, `rfid-iot-connector`, `iot-connector-{rfid,scan}-fact-sheet`, `real-time-data-with-iotc-software`, `customer-facing-…`, `welcome-…`, `resources-…`, `appendix-…`, `packaging-and-deployment-…`, `zebra-rfid-iot-connector-documentation-updates`, `introduction-…(2-23).md`.
- `handheld-rfid-iotc-mqtt-api-reference/` — 24 `.md`, the **prose MQTT API Reference render** (one page per operation/event; carries its own error tables + command/response schemas). The **cross-walk target** ("See in the API Reference") the de-blur actions link to and must stay parity with. SoT `operation_descriptions/` remains canonical; this is the rendered surface.

### Pack RL — research-library domain corpora (content-depth source)
`_meta/knowledge-base/research-library/` (beyond the theory books already in Pack FW)
- `rfid-fundamentals-and-hardware/` (27 incl. the RFID Field Guide chapters, `rfid-handbook`, `the-rf-in-rfid-dobkin`, `uhf-rfid-tags-explained`, `rfid-terminology-glossary`) → Gen2 / air-interface / operating-mode depth.
- `communication-mqtt-and-networking/` (10 incl. `mqtt-essentials`, `mqtt-design-best-practices`, `hivemq-mqtt-essentials`, `mqtt-security-ssl-tls`, `mqtt-vs-rest`) → MQTT endpoints / QoS / topics / security.
- `rfid-applications-and-case-studies/` (24 + the IntechOpen book) → use-case scenarios.
- `rfid-deployment-and-buyers-guides/` (11) → deployment / prerequisites context.
- `iot-platforms-and-edge/` (17) → cloud / edge integration.
- `api-and-web-design/` (6 incl. `restful-web-api-patterns`, `the-design-of-web-apis`, `mastering-api-architecture`) → reference / error-handling / FAQ patterns.
- `security-privacy-and-cryptography/` (non-TLS: `spychips`, `secure-efficient-rfid-zhang`, `epcglobal-supply-chain-security`, `detecting-rfid-misuse`, `rfid-wine-supply-chain-security` — low) → tenant / privacy context.
- `business-strategy-and-industry/` (4 incl. the Zebra annual report / proxy — low) → use-case grounding.

### Pack PROD — product knowledge-base (how-to + explanation source)
`_meta/knowledge-base/product/`
- `how-to/connect-a-reader-with-123rfid-desktop.md`, `how-to/migrate-from-123rfid-desktop-to-iotc.md`, `how-to/windows-rfid-reader-and-pos-integration.md`.
- `explanation/use-case-rfd40-retail.md`, `…/use-case-hospitality.md`, `…/case-study-lowes.md` (scenarios/personas); `…/soti-connect-flyer.md` (SOTI provisioning).
- `explanation/zebra-handheld-sleds-hardware-platform/*.md` (13 — RFD40/RFD90 spec sheets, QSG, PRG: the hardware facts behind hardware-tiers / handheld-considerations / cert-Wi-Fi / prerequisites).
- Background: `explanation/{zebra-rfid-portfolio-brochure,zebra-rfid-portfolio-messaging,zebra-rfid-readers-flyer,zebra-rfid-strategy-and-solutions,123rfid-desktop-fact-sheet}.md`; `tutorials/*` (already used via A-05/A-07/A-08).

### Pack BRAND (low) — brand assets
`_meta/brand/`
- `fonts/**` (7 `.otf`), `logos/**` (12 `.eps`/`.png`/`.svg`). Relevant only to visual-consistency work: 404 chrome/logo (A-18) and D2 diagram brand theme (A-03 state-machine move, A-13 TOC artifact).

---

## Section 2 — Non-`_meta` execution dependencies (unavoidable)

The user scoped the analysis to `_meta`, but the *docs being changed* live in `docs/` and the *machinery* lives at repo root. No action is executable without these; listed once, referenced per action as "**Non-`_meta`:** …":

- `docs/**/*.md` — the actual pages (each carries its Diátaxis badge in a `> 📘 …` callout + frontmatter `title`/`sidebar_label`/`description`).
- `sidebars.ts` — sidebar IA (placement, surfacing).
- `docusaurus.config.ts` — redirects (`@docusaurus/plugin-client-redirects`), navbar, OpenAPI spec path.
- `scripts/generate-toc.mjs` — generates `DOCUMENTATION_TOC.md` from `sidebars.ts` (A-13/A-14 edit this).
- `scripts/check_reachability.py` — orphan/reachability audit (A-05/A-06/A-15).
- `docs/foundations/documentation-guide.md` — the in-site declaration of the badge system and the "no mixing" rule (the standard the whole review tests against).

---

## Section 3 — The actions

### A-01 · De-blur `security/model.md` to a pure Explanation — **M** · review M1 / C1
**Do:** keep the four-layer model, the AND-not-OR argument, the two-sources/two-paths discussion, "Confirmation via alerts." **Cut** the cert format/size table, the `install_certificate` payload JSON, "Listing and removing," and the 4-step Rotation procedure; replace with one-line pointers to the existing reference/how-to.
**`_meta` content required:**
- **Packs:** SoT, GOV, IA, FW.
- **SoT specifics:** `operation_descriptions/{install_certificate,get_installed_certificate,delete_certificate,set_os,alerts}.md`; `tag_descriptions/{Certificate_Management,Alerts}.md`; `schemas/commands/dev_mgmt/{install_certificate,delete_certificate,get_installed_certificate}.json`; `schemas/refrence/payload/{installCertPayload,delCertPayload}.yaml`; `schemas/refrence/response/installedCertResponse.yaml`; `schemas/refrence/events/{fileDownload,alertEvent}.yaml`; `schemas/refrence/response/alertDetails.yaml`; `schemas/response/dev_mgmt/{install_certificate,delete_certificate}.json`; `error_codes.json` (codes 9, 21, 23); `exported_tags/certificate_management.json`.
- **GOV specifics:** TITLE-NAMING §2a + §7 (mixed-shape anti-pattern); URL-NAMING §9 future-pass (`model` → `tls-and-certificates` deferred — do **not** rename here unless batched); ORPHAN-PAGES (security cluster: `tls-setup` 11 in-links, `certificate-management`, `rotation`); D2-MIGRATION (rotation.md owns diagram **D39** gantt — if any rotation content is relocated, carry the D2 fence per the rulebook).
- **Indirect (research-library):** `security-privacy-and-cryptography/bulletproof-tls-and-pki.md` + `security-privacy-and-cryptography/bulletproof-tls-guide/` (the Ristić reference model.md cites by name); `communication-mqtt-and-networking/mqtt-security-ssl-tls.md`.
- **Indirect (product/explanation):** `_meta/knowledge-base/product/explanation/123rfid-desktop-fact-sheet.md` and `…/zebra-handheld-sleds-hardware-platform/` (out-of-band cert install via 123RFID Desktop; Enterprise Wi-Fi cert chain).
**Non-`_meta`:** `docs/infrastructure/security/{model,tls-setup,certificate-management,rotation}.md`; `docs/reference/mgmt/certificates.md` (the canonical home that already exists); `docs/observability/alerts.md`; `sidebars.ts`.

### A-02 · De-blur `observability/configure-events.md` to a pure How-to — **M** · review M2 / C1
**Do:** keep the two task payloads ("enable everything", "selective production") + the pre-condition. **Cut** the 16-flag table, the four thresholds, and the `heartbeatConfiguration` field defs → reference; move the "`config_events` vs `config_endpoint`" *explanation* to the event-model page.
**`_meta` content required:**
- **Packs:** SoT, GOV, IA, FW.
- **SoT specifics:** `operation_descriptions/{config_events,config_endpoint}.md`; `tag_descriptions/{Event_Configuration,Device_Health}.md`; `schemas/commands/dev_mgmt/{config_events,config_endpoint}.json`; `schemas/refrence/payload/{cfgEventPayload,cfgAlertPayload,cfgEndpointPayload}.yaml`; `schemas/refrence/events/{heartbeatEvents,heartbeatEvents_new,inventoryStatus,batteryAlert,usageStatus,userAppDetails}.yaml`; `schemas/refrence/response/{currentEventConfig,currentAlertConfig}.yaml`; `exported_tags/event_configuration.json`.
- ⚠ **Drift to reconcile (discovered in analysis):** `schemas/refrence/payload/cfgEventPayload.yaml` defines **8** flags + `heartbeatConfiguration`, but the docs page lists **16** flags + four thresholds (`cpu/ram/flash/temperature`) and extra flags (`antenna`, `gpi`, `exceptions`, `ntp`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`). Before extracting, reconcile against `schemas/commands/dev_mgmt/config_events.json` and the SoT — fix whichever is wrong (this is itself a C4 single-source action; see A-09).
- **GOV specifics:** TITLE-NAMING §2b; META-DESCRIPTION Template B; ORPHAN-PAGES (`observability/events/{model,catalog}` cluster).
**Non-`_meta`:** `docs/observability/{configure-events,events/model,heartbeat,alerts,mqtt-connection}.md`; `docs/reference/mgmt/event-configuration.md`; `docs/reference/events/all-events.md`; `sidebars.ts`.

### A-03 · De-blur `rfid/start-stop-inventory.md` to a pure How-to — **M** · review M3 / C1
**Do:** keep START/STOP recipes, the three start-mechanisms as task guidance, the IDLE-required lock rule. **Cut** the error-code table → error reference; move the state-machine D2 diagram → explanation/reference; thin the enum/field tables to links.
**`_meta` content required:**
- **Packs:** SoT, GOV, IA, FW.
- **SoT specifics:** `error_codes.json` (codes 0, 5, 11, 12, 22, 23); `operation_descriptions/{control_operation,set_operating_mode,get_status}.md`; `tag_descriptions/{Inventory_Control,Operating_Mode,Device_Status}.md`; `schemas/commands/control/{control_operation,set_operating_mode}.json`; `schemas/refrence/payload/{ctrlOprPayload,radioStartCondPayload,radioStopCondPayload,operatingModePayload,inventorySettingsPayload}.yaml`; `schemas/response/control/control_operation.json`; `schemas/response/dev_mgmt/get_status.json`; `schemas/refrence/response/deviceStatusResponse.yaml`; `exported_tags/{inventory_control,operating_mode}.json`.
- **GOV specifics:** TITLE-NAMING §2b; URL-NAMING §9 (the `start-stop-inventory` slug history); **D2-MIGRATION** (the state-machine is a D2 `stateDiagram`→manual-nodes conversion target; if it moves, carry the fence + theme rules); ORPHAN-PAGES (`rfid/operating-mode/*` cluster).
- **Indirect (research-library):** `rfid-fundamentals-and-hardware/rfid-field-guide-deploying-radio-frequency-identification-systems/` (EPC Gen2 sessions / air interface, for the explanation page that receives the state machine).
**Non-`_meta`:** `docs/rfid/{start-stop-inventory,operating-mode-profiles,operating-mode/configure,dataevt-schema}.md`; `docs/reference/ctrl/inventory-control.md`; `docs/reference/errors/codes.md`; `sidebars.ts`.

### A-04 · Run the C1 blur-sweep across the suspected set — **M** · review M8 / C1 / Appendix B
**Do:** for each suspected page, compare content to its badge; extract anything serving a different need; link to the canonical reference. Suspected set: `infrastructure/network/architecture.md`, `infrastructure/endpoints/about.md`, `rfid/operating-mode-profiles.md`, `observability/heartbeat.md`, `observability/alerts.md`, `rfid/dataevt-schema.md` (confirm each badge first — `dataevt-schema` may legitimately be reference).
**`_meta` content required:**
- **Packs:** SoT, GOV, IA, FW.
- **SoT specifics (by page):**
  - network/architecture → `operation_descriptions/{set_wifi,get_wifi,get_eth}.md`; `schemas/commands/dev_mgmt/{set_wifi,get_wifi,get_eth}.json`; `schemas/refrence/payload/{cfgWifiPayload,ethConfigPayload}.yaml`; `schemas/refrence/response/{getWifiResponse,ethResponse,wifiStatusResponse}.yaml`; `tag_descriptions/Network_Configuration.md`; `exported_tags/network_configuration.json`; `error_codes.json` (15–20).
  - endpoints/about → `operation_descriptions/{config_endpoint,get_endpoint_config}.md`; `schemas/refrence/payload/cfgEndpointPayload.yaml`; `schemas/refrence/response/{epConfiguration,endpointResponse,savedEpconfigs,getepCfgResponse}.yaml`; `tag_descriptions/MQTT_Endpoint_Configuration.md`; `exported_tags/mqtt_endpoint_configuration.json`; `error_codes.json` (10, 25–27).
  - operating-mode-profiles → `operation_descriptions/{set_operating_mode,get_operating_mode}.md`; `schemas/refrence/payload/{operatingModePayload,queryPayload,radioStartCondPayload,radioStopCondPayload,selectPayload,accessCmds*}.yaml`; `tag_descriptions/Operating_Mode.md`; `exported_tags/operating_mode.json`.
  - heartbeat → `operation_descriptions/heartBeatEVT.md`; `schemas/events/heartBeatEVT.json`; `schemas/refrence/events/{heartbeatEvents,heartbeatEvents_new,inventoryStatus,batteryAlert,usageStatus}.yaml`; `tag_descriptions/Device_Health.md`; `exported_tags/device_health.json`.
  - alerts → `operation_descriptions/alerts.md`; `schemas/events/alerts.json`; `schemas/refrence/events/{alertEvent,errorAlert,batteryAlert}.yaml`; `schemas/refrence/response/{alertDetails,currentAlertConfig}.yaml`; `tag_descriptions/Alerts.md`; `exported_tags/alerts.json`.
  - dataevt-schema → `operation_descriptions/dataEVT.md`; `schemas/events/dataEVT.json`; `schemas/refrence/events/{dataEvts,tagDataEVTs,readerDataEVTs,barcodeDataEVTs}.yaml`; `schemas/refrence/payload/{tagMetaDataPayload,tagReportFilterPayload}.yaml`; `tag_descriptions/Tag_Data_Event.md`; `exported_tags/tag_data_event.json`.
- **GOV specifics:** TITLE-NAMING + ORPHAN-PAGES (each page's cluster) + D2-MIGRATION (D13, D50/51, D38, etc. live on several of these pages).
**Non-`_meta`:** each `docs/**` page above + its `docs/reference/{mgmt,ctrl,data,events}/*` mirror + `sidebars.ts`.

### A-05 · Surface / relocate the buried fleet tutorial — **M** · review M4 / C2a
**Do:** make `fleet/cloud-integration/tutorial-fleet.md` discoverable as a 📗 Tutorial (add a Tutorials entry surface and/or lift it out of the how-to "Cloud integration" group). Because the **ORPHAN-PAGES-AUDIT already calls it "intentional,"** first reconcile that classification, then apply the move as a URL-NAMING §7 rename (redirect + cross-ref update + quartet/quintet refresh).
**`_meta` content required:**
- **Packs:** GOV, IA, FW, SoT.
- **SoT specifics:** `deployment_guide/` (whole — `README.md`, `api-reference-index.md`, `architecture.md`, `prerequisites.md`, `phase1-…` through `phase5-…`) is the parallel fleet/deployment tutorial source; `operation_descriptions/{config_endpoint,install_certificate,config_events,control_operation,get_endpoint_config}.md`; `tag_config.json` (operation ordering for a coherent tutorial sequence).
- **Tutorials source (product):** `_meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/` (`zebra_iotc_deployment_guide.md`, `config_endpoint.md`, `control_operation.md`, `get_endpoint_config.md`, `get_version.md`, `reboot.md`, `.docx`); `…/rfd40-rfd90-first-mqtt-connection.md`; `…/123rfid-desktop-getting-started.md`; `…/123rfid-mobile-app-getting-started.md`.
- **GOV specifics:** TITLE-NAMING §2c (gives the exact pattern `Tutorial: Provision a three-reader fleet`); URL-NAMING §5 (tutorial phase pattern) + §7/§7a (redirect, blast radius); ORPHAN-PAGES (cloud-integration cluster note **and** the "promoted to sidebar" precedent for accidental orphans — reconcile the "intentional" verdict); 404-PAGE (redirect + "did you mean"); META-DESCRIPTION §9a.
**Non-`_meta`:** `docs/fleet/cloud-integration/tutorial-fleet.md`; `docs/quick-start/*` (align voice/shape with the existing tutorial); `sidebars.ts`; `docusaurus.config.ts` (redirect); `scripts/check_reachability.py`.

### A-06 · Re-home `reference/errors/handling.md` out of the Reference Part — **M** · review M5 / C2b
**Do:** move the 📙 How-to to a how-to context; keep Part 9 "Error codes & handling" pure reference (`codes.md`, `format.md`). Reconcile against ORPHAN-PAGES (which lists `errors/handling` as "✅ Intentional — how-to for error handling" inside the errors cluster).
**`_meta` content required:**
- **Packs:** SoT, GOV, IA, FW.
- **SoT specifics:** `error_codes.json` (esp. code 1 async-accept; per-command code lists); `schemas/response/dev_mgmt/cloud_connect.json` (the code-1/cloud_connect notes referenced by the errors pages); `operation_descriptions/*` (per-op error behaviour); `info_description.md`.
- **GOV specifics:** ORPHAN-PAGES (the conflicting "intentional" verdict to resolve); URL-NAMING §7 (rename/redirect); TITLE-NAMING §2b; META-DESCRIPTION; 404-PAGE.
- **Indirect (research-library):** `api-and-web-design/restful-web-api-patterns.md`, `…/mastering-api-architecture.md` (error-handling patterns for the how-to's quality).
**Non-`_meta`:** `docs/reference/errors/{codes,format,handling}.md`; candidate how-to home (`docs/rfid/tag-data/process.md` or a Part 6/Part 8 location); `sidebars.ts`; `docusaurus.config.ts`.

### A-07 · Add a discoverable Tutorials surface — **R** · review A3 / C3
**Do:** create a navigable entry that lists the Quick Start *and* the fleet tutorial (and any future tutorial) so the learning quadrant is reachable.
**`_meta` content required:**
- **Packs:** IA, FW, GOV.
- **Tutorials source (product):** `_meta/knowledge-base/product/tutorials/` (all) + SoT `deployment_guide/`.
- **GOV specifics:** ORPHAN-PAGES ("promoted to sidebar" mechanism + re-audit cadence); URL-NAMING §5; TITLE-NAMING §2c.
- **FW specifics:** `diataxis-model.md` (cycle-of-interaction / journey-around-the-map — why a learning surface matters).
**Non-`_meta`:** `sidebars.ts`; `docs/quick-start/*`; `docs/fleet/cloud-integration/tutorial-fleet.md`.

### A-08 · Evaluate (do **not** manufacture) a second tutorial — **O** · review A4 / C3
**Do:** decide whether a real unserved learning need exists (most likely "build your first tag-reading application end-to-end"). Add only if real; otherwise leave the quadrant honestly small (Diátaxis: "don't create empty structures").
**`_meta` content required:**
- **Packs:** FW (decisive — `diataxis-model.md` tutorial principles + the empty-structure warning), SoT, IA.
- **SoT specifics:** `operation_descriptions/{control_operation,dataEVT}.md`; `schemas/events/dataEVT.json` (the "first tag into an app" outcome); `deployment_guide/phase4-first-command.md`.
- **Tutorials source (product):** `…/tutorials/rfd40-rfd90-first-mqtt-connection.md` (candidate seed).
- **GOV specifics:** TITLE-NAMING §2c (gives `Tutorial: Read your first tag with Python` as the canonical shape).
- **Indirect (research-library):** `communication-mqtt-and-networking/{mqtt-essentials,hivemq-mqtt-essentials,mqtt-intro-for-beginners}.md`; `api-and-web-design/web-api-cookbook-js.md` (application code for the lesson).
**Non-`_meta`:** `docs/quick-start/*` (to avoid overlap); `sidebars.ts`.

### A-09 · Institute single-source-of-truth; delete duplicated facts after extraction — **R** · review C4 / D1 / D2
**Do:** after A-01…A-04, delete the now-redundant reference tables/procedures from explanation/how-to pages; codify the authoring rule: "if you are about to paste a table of fields/codes/enums into a non-reference page, link to the reference instead." Fold in the cfgEventPayload 8-vs-16 reconciliation (A-02) as the canonical example.
**`_meta` content required:**
- **Packs:** SoT (the single source itself + `README.md` regen workflow), GOV, IA, FW.
- **GOV specifics:** `policy/` (home for the new authoring rule) and/or `style-guide/zebra-style-guide.md` (cross-references §); the rule should also be noted in the site-rulebooks set so it sits with TITLE/URL/META.
- **FW specifics:** `the-great-mental-models.md` (map-is-not-the-territory); `diataxis-model.md` (reference "describe and only describe").
**Non-`_meta`:** every `docs/**` page that currently embeds a reference table (outputs of A-01…A-04); `docs/reference/**` (the canonical homes).

### A-10 · Trim FAQ answers to thin routers — **R** · review D3
**Do:** replace any FAQ answer that re-explains/re-instructs a canonical page with a one-line answer + link.
**`_meta` content required:**
- **Packs:** SoT, GOV, IA.
- **SoT specifics:** `operation_descriptions/*`, `tag_descriptions/*`, `error_codes.json`, `info_description.md`, `docs/FX90.yaml` (to verify each answer against the source before trimming).
- **GOV specifics:** TITLE-NAMING §9c (FAQ titles); META-DESCRIPTION §9d (FAQ descriptions); ORPHAN-PAGES (`reference/faq/*` cluster — search-driven, intentionally unsurfaced).
**Non-`_meta`:** `docs/reference/faq/{general,connectivity,compatibility,rfid,fleet}.md`.

### A-11 · Make ambiguous how-to titles goal-explicit; keep warm sidebar labels — **R** · review M6 / C5
**Do:** for ambiguous titles (`Trigger composition`, `Misconceptions`, `Failure modes`, `Choose what the reader tells you`, `Start, stop, and the trigger button`, etc.), make the `title`/`description` goal-explicit while keeping the evocative `sidebar_label`. Apply the quartet rule.
**`_meta` content required:**
- **Packs:** GOV (primary), SoT, IA.
- **GOV specifics:** `TITLE-NAMING.md` (the whole rulebook — §2 patterns, §6 title-vs-sidebar with the `heartbeat.md` worked example, §7 anti-patterns, §3a pipes); `META-DESCRIPTION.md` (quartet); `URL-NAMING.md` §1a (only if a slug must change — prefer not to, per stability); `style-guide/zebra-style-guide.md` (**conflict note:** legacy title-case vs site sentence-case — site rulebook wins).
- **SoT specifics:** `tag_descriptions/*` + `operation_descriptions/*` (accurate goal nouns/verbs so titles match the machinery).
**Non-`_meta`:** `docs/**/*.md` frontmatter (`title`, `sidebar_label`, `description`); `sidebars.ts`.

### A-12 · Trim Quick Start "Why this phase exists" + "Didn't work?" — **R** · review M7 / C6
**Do:** cap "Why this phase exists" at ≤2 sentences (link to Part 2 for depth); keep "Didn't work?" short and reassuring, not a branching how-to.
**`_meta` content required:**
- **Packs:** FW (decisive), SoT, GOV.
- **FW specifics:** `diataxis-model.md` (tutorial: "ruthlessly minimise explanation," "eliminate the unexpected," and the endorsement of *flagging* likely failure); `the-great-mental-models.md` (scenario analysis — the phase-rehearsal framing).
- **SoT specifics:** `deployment_guide/{prerequisites,phase1-environment-setup,phase2-device-bootstrap,phase3-connection-validation,phase4-first-command,phase5-endpoint-configuration}.md` (source material for each phase).
- **GOV specifics:** META-DESCRIPTION §9a (phase-chain descriptions); TITLE-NAMING §2c/§9a (phase titles); `style-guide` (voice — and the contraction/humour conflict to adjudicate in favour of the site voice).
**Non-`_meta`:** `docs/quick-start/{overview, prerequisites/{requirements,credentials}, phase-1 … phase-8}.md`.

### A-13 · Add Diátaxis badge glyphs to the generated TOC — **R** · review A1 / Part E
**Do:** make `generate-toc.mjs` parse each page's badge (the `> 📘 …` callout / frontmatter) and prefix every TOC entry with 📘/📗/📙/📕, so blur and mis-filing are visible.
**`_meta` content required:**
- **Packs:** IA (the TOC + review Part E), GOV, FW.
- **GOV specifics:** ORPHAN-PAGES (the badge-annotated TOC becomes a companion to the reachability audit); TITLE-NAMING (the four Diátaxis types are the badge set).
**Non-`_meta`:** `scripts/generate-toc.mjs` (the generator — edit here); `sidebars.ts`; `docs/**/*.md` (badge source); `docs/foundations/documentation-guide.md` (badge taxonomy definition).

### A-14 · Add a quadrant-balance / deep-quality coverage line to the TOC — **R** · review A2 / Part E
**Do:** have the generator emit per-mode counts (📘 N · 📗 N · 📙 N · 📕 N) in the TOC header, turning the "every file placed" functional-coverage claim into a deep-quality one. Reconcile the **count mismatch** (TOC header says "116 of 116"; ORPHAN-PAGES says 115; D2-MIGRATION says the corpus grew) as part of this.
**`_meta` content required:**
- **Packs:** IA, FW, GOV.
- **FW specifics:** `diataxis-model.md` (the quality essay — functional vs deep quality; this is the conceptual basis for the new line).
- **GOV specifics:** ORPHAN-PAGES (authoritative current page count; reconcile against the TOC header); `audits/` (home for the emitted metric over time).
**Non-`_meta`:** `scripts/generate-toc.mjs`; `sidebars.ts`.

### A-15 · Adopt the one-page-at-a-time workflow + re-audit cadence — **S** · review Part F
**Do:** work one page per commit, publish each step, don't restructure the nine Parts; after each batch, regenerate the badge-annotated TOC (A-13) and re-run reachability. Frame every fix as the docs honouring their own declared "no mixing" standard.
**`_meta` content required:**
- **Packs:** IA (review Part F), GOV, FW.
- **GOV specifics:** ORPHAN-PAGES (re-audit cadence); URL-NAMING §7a (blast-radius gating of single-file vs batched changes); `audits/` (cadence artifacts).
- **FW specifics:** `diataxis-model.md` ("work one step at a time," "complete, not finished").
**Non-`_meta`:** `scripts/{generate-toc.mjs,check_reachability.py}`; git workflow.

### A-16 · Protect the commendations (regression guards) — **S** · review Part B
**Do:** record as invariants the things the review says to keep: journey-major/mode-minor top structure; reference mirrors machinery; "Out of scope" sections; "Related: complementary-quadrant" boxes; the badge system + "no mixing" rule; persona reading-paths. Guard them during all the above changes.
**`_meta` content required:**
- **Packs:** IA (review Part B), GOV (all rulebooks already encode these invariants), SoT (`tag_config.json` + `tag_descriptions/` define the machinery the reference mirrors), FW.
**Non-`_meta`:** `docs/foundations/{start,documentation-guide}.md` (where the journey + personas + badge rules are declared); `sidebars.ts`.

---

> **Optional / deferred actions (A-17 – A-19).** The items below are genuinely optional — some are explicitly *deferred* in the governance rulebooks (URL-NAMING §9 "future-pass candidates") because their cost currently exceeds their benefit. They are recorded here as full actions (not footnotes) so the backlog is complete and each carries its `_meta` evidence base. Do **not** start them until the Mandatory/Recommended set (A-01 – A-16) has settled the page content, because they all change URLs/reachability and would otherwise thrash.

### A-17 · Optional deferred URL renames (URL-NAMING §9 future-pass) — **O (deferred)** · URL-NAMING §9
**Do:** only as a single batched, high-blast-radius pass (URL-NAMING §7a), and only after the de-blur work (A-01, A-04) settles each page's content and fate of its sibling files. Each rename needs a 301 redirect + a full internal cross-reference sweep + the quartet/quintet refresh + an orphan re-audit (A-19).

| Candidate (current URL) | Proposed URL | Gate / why deferred |
|---|---|---|
| `/infrastructure/security/model` | `/infrastructure/tls-and-certificates` | `security/` has 4 files, only 1 surfaced; flattening forces a decision on `tls-setup`, `certificate-management`, `rotation`. (This is the item previously footnoted under A-01.) |
| `/infrastructure/endpoints/about` | `/infrastructure/mqtt-endpoints` | `endpoints/` has 4 files, only 1 surfaced; forces a decision on `configure`, `multi-endpoint`, `view`. |
| `/infrastructure/network/architecture` | `/infrastructure/network-architecture` | URL-NAMING §5 says **keep** the folder (network has siblings `wifi`/`ethernet`/`troubleshooting`); listed for completeness but currently **recommended-against**. |

**`_meta` content required:**
- **Packs:** GOV (primary), IA.
- **GOV specifics:** `URL-NAMING.md` §5 (single-occupancy flattening rule), §7/§7a (stability + blast-radius gating), §9 (the future-pass table itself), §11 (rename maintenance steps); `TITLE-NAMING.md` §10 + `META-DESCRIPTION.md` §10 (the coherent-quartet refresh each rename triggers); `404-PAGE.md` §6/§12 (did-you-mean + redirect upkeep — see A-18); `ORPHAN-PAGES-AUDIT.md` (the sibling-file clusters: `/infrastructure/security/*` 3 pages, `/infrastructure/endpoints/*` 3 pages, `/infrastructure/network/*` 2 pages — their reachability decides whether flattening is safe).
- **SoT specifics:** `tag_descriptions/{Certificate_Management,MQTT_Endpoint_Configuration,Network_Configuration}.md` (confirm the new leaf names match the machinery the pages mirror).
**Non-`_meta`:** `docs/infrastructure/{security,endpoints,network}/**`; `sidebars.ts`; `docusaurus.config.ts` (301 redirects); `scripts/check_reachability.py`; every internal cross-reference to the old URLs.

### A-18 · Optional: maintain the redirect + 404 "did you mean" map after relocations — **O** · 404-PAGE / URL-NAMING §7
**Do:** whenever A-05, A-06, or A-17 rename or delete a URL, add/refresh the `plugin-client-redirects` entries and the 404 "did you mean" suggestion map; confirm intentionally-deleted URLs return a **true** 404 (no redirect shell) — e.g. the already-deleted `/sdks/*` set.
**`_meta` content required:**
- **Packs:** GOV, IA.
- **GOV specifics:** `404-PAGE.md` (§6 did-you-mean computation, §7 true-404/noindex technical rules, §11 checklist, §12 maintenance + monthly top-N 404 review); `URL-NAMING.md` §7 (stability/redirect rules) + §9 (applied-renames table to extend); `ORPHAN-PAGES-AUDIT.md` (the `/sdks/*` deletion record — those URLs must 404 with **no** redirect).
**Non-`_meta`:** `docusaurus.config.ts` (`@docusaurus/plugin-client-redirects`); `src/pages/404.tsx` (or `404.md`); analytics for the top-N 404 list.

### A-19 · Optional: refresh the orphan/reachability re-audit and reconcile page counts — **O** · ORPHAN-PAGES-AUDIT
**Do:** run the reachability check to fill the "**pending re-audit**" placeholders in `ORPHAN-PAGES-AUDIT.md` and settle the 115-vs-116 count mismatch (see Section 4 #3). Run after A-05/A-06/A-17 change reachability. Overlaps A-14 (the count line) and A-15 (the standing cadence) — this is the one-time settling of the currently-pending numbers.
**`_meta` content required:**
- **Packs:** GOV, IA.
- **GOV specifics:** `ORPHAN-PAGES-AUDIT.md` (the "pending re-audit" rows in §Numbers + the re-audit cadence section); `URL-NAMING.md` §9 (renames that move pages between reachable/orphan); `audits/` (home for the regenerated audit output).
- **IA specifics:** `DOCUMENTATION_TOC.md` (the "116 of 116" header line to reconcile against the audit's recount).
**Non-`_meta`:** `scripts/check_reachability.py`; `sidebars.ts`; `docs/**`.

---

## Section 4 — Items discovered during `_meta` analysis (not explicit in the review)

These surfaced while mapping `_meta` and must be tracked or they will silently block the actions:

1. **Event-flag drift (8 vs 16).** `…/schemas/refrence/payload/cfgEventPayload.yaml` lists 8 flags + `heartbeatConfiguration`; `docs/observability/configure-events.md` lists 16 flags + 4 thresholds. Reconcile against `…/schemas/commands/dev_mgmt/config_events.json` before A-02/A-09. → folded into **A-02**, **A-09**.
2. **Governance contradicts the review on two pages.** `ORPHAN-PAGES-AUDIT.md` declares `errors/handling` and `cloud-integration/tutorial-fleet` "intentional." The review (C2a/C2b) says relocate. The audit must be updated in lockstep, or the relocations will read as regressions. → folded into **A-05**, **A-06**.
3. **Page-count mismatch across artifacts.** TOC header "116 of 116" vs ORPHAN-PAGES "115" vs D2-MIGRATION "corpus has grown." → folded into **A-14**.
4. **Voice-policy conflict.** `style-guide/zebra-style-guide.md` (legacy: title-case headings, no contractions, no humour) vs the site-rulebooks' sentence-case + warm voice (e.g. "Watch your reader's pulse"). The site-rulebooks are operative; record this precedence explicitly. → folded into **A-11**, **A-12**.
5. **The "quartet/quintet" maintenance obligation.** Per TITLE-NAMING §10, META-DESCRIPTION §10, URL-NAMING §7, and 404-PAGE §12, any rename/relocation (A-05, A-06; possibly A-11) must update title + URL + sidebar label + meta description + 404/redirect behaviour together. → embedded in those actions.
6. **Regeneration coupling.** Per SoT `README.md`, reference facts changed in `docs/` that mirror the API must trace back to the SoT and be regenerated (`generate_openapi_tags_md.py`) — otherwise the published API reference and the docs drift. → applies to A-01…A-04, A-09, A-10.

---

## Section 5 — Re-audit: coverage of DOCUMENTATION_TOC_REVIEW.md

Every element of the review mapped to an action (or marked as context). No recommendation is unaccounted for.

| Review element | Captured by | Notes |
|---|---|---|
| TL;DR bullet 1 (keep the skeleton) | A-16 | Protected as invariant |
| TL;DR bullet 2 (discipline leaked) | A-01–A-04 | The core fix |
| TL;DR bullet 3 (blur = duplication) | A-09 | Single-source rule |
| TL;DR bullet 4 (tutorials thin) | A-07, A-08 | Discoverability first |
| TL;DR bullet 5 (mis-filed by mode) | A-05, A-06 | |
| Part A (combined lens) | A-16 (+ context) | Conceptual framing; FW pack carries it |
| Part B — B1 journey structure | A-16 | |
| Part B — B2 badges exist | A-13, A-16 | |
| Part B — B3 reference mirrors machinery | A-16 | SoT `tag_config.json`/`tag_descriptions/` |
| Part B — B4 "Out of scope" sections | A-16 | |
| Part B — B5 Related boxes + API cross-walk | A-16 | |
| Part B — B6 persona reading-paths | A-16 | |
| Part C — C1 mode-blur | A-01, A-02, A-03, A-04 | Verified + sweep |
| Part C — C2a buried tutorial | A-05 | + governance reconcile |
| Part C — C2b how-to in reference | A-06 | + governance reconcile |
| Part C — C3 quadrant balance | A-07, A-08 | |
| Part C — C4 single source / drift | A-09 | + discovered drift #1 |
| Part C — C5 naming | A-11 | |
| Part C — C6 tutorial purity | A-12 | |
| Part D — A1 badge column | A-13 | |
| Part D — A2 balance table | A-14 | + count mismatch #3 |
| Part D — A3 tutorials surface | A-07 | |
| Part D — A4 evaluate 2nd tutorial | A-08 | |
| Part D — D1 delete dup tables | A-09 | |
| Part D — D2 delete dup rotation proc | A-01, A-09 | |
| Part D — D3 trim FAQ | A-10 | |
| Part D — M1 model.md | A-01 | |
| Part D — M2 configure-events.md | A-02 | |
| Part D — M3 start-stop-inventory.md | A-03 | |
| Part D — M4 tutorial-fleet relocate | A-05 | |
| Part D — M5 handling.md re-home | A-06 | |
| Part D — M6 titles | A-11 | |
| Part D — M7 Quick Start trim | A-12 | |
| Part D — M8 sweep set | A-04 | |
| Part E — badge glyphs | A-13 | |
| Part E — deep-quality coverage line | A-14 | |
| Part F — workflow/cadence | A-15 | |
| Appendix A — Part classification | A-16 (reference) | Used to scope A-01–A-06 |
| Appendix B — verified vs suspected | A-03, A-04 | Verified→A-03; suspected→A-04 |

**Gaps found in re-audit:** none at the recommendation level. Four *new* obligations not in the review (Section 4 #1–#4) were added to the relevant actions; two cross-cutting maintenance rules (#5, #6) were embedded. The only deliberately-deferred item is the optional `model` → `tls-and-certificates` URL rename (URL-NAMING §9 future-pass), intentionally **not** bundled into A-01 to keep that action low-blast-radius.

---

## Section 6 — Gap-fill addendum (v1.1): complete `_meta` coverage

> Section 5 audits coverage of the *review's recommendations*. This section audits the orthogonal axis — coverage of *every `_meta` asset*, from the recursive 885-file inventory. It **supplements** Section 3 (additions only; no A-01…A-19 mapping removed). Pack names resolve to Section 1.

### 6.1 Per-action additions

| Action | Added packs | Specific new `_meta` items |
|---|---|---|
| A-01 | KB-DOCSETS, RL | master-docset `certificate-management`, `communication-network-settings`; `mqtt-api-reference/{install_certificate,get_installed_certificate,delete_certificate,alerts}.md`; RL `communication-mqtt-and-networking/mqtt-security-ssl-tls.md`, `security-privacy-and-cryptography/*` |
| A-02 | KB-DOCSETS | `mqtt-api-reference/config_events.md`; master-docset `configuration-of-management-events`, `health-events-format` |
| A-03 | KB-DOCSETS, RL | `mqtt-api-reference/control_operation.md`; master-docset `controlling-operating-mode`, `trigger-settings`, `operating-modes-schema`; RL `rfid-fundamentals-and-hardware/*` (Gen2 / sessions for the state machine) |
| A-04 | KB-DOCSETS, RL, SoT (Tag_Filtering set) | **Extend sweep to** `docs/rfid/post-filters.md` + `docs/rfid/operating-mode/post-filters-configure.md`; SoT `tag_descriptions/Tag_Filtering.md`, `operation_descriptions/{set_post_filter,get_post_filter}.md`, `schemas/commands/control/{set_post_filter,get_post_filter}.json`, `schemas/refrence/payload/{postFilterPayload,selectPayload,rssiFilterPayload,tagIdFilterPayload}.yaml`, `exported_tags/tag_filtering.json`; master-docset `advanced-settings`, `antenna-port-settings`, `access-operations`, `tag-data-events-format`; `mqtt-api-reference/{set_post_filter,get_post_filter,set_operating_mode,get_operating_mode,dataevt}.md`; RL rfid-fundamentals + communication-mqtt |
| A-05 | KB-DOCSETS, PROD | master-docset `connect-fixed-readers-to-*`, `local-deployment-rest-api-guide`, `{fxconnect,rfid-api-3}-…-migration-guide`; PROD `how-to/connect-a-reader-with-123rfid-desktop.md`, `how-to/migrate-from-123rfid-desktop-to-iotc.md`, `explanation/soti-connect-flyer.md` |
| A-06 | KB-DOCSETS, RL | `mqtt-api-reference/*` (per-op error tables); RL `api-and-web-design/{restful-web-api-patterns,mastering-api-architecture}.md` |
| A-07 | KB-DOCSETS | master-docset `zebra-rfid-iot-connector-getting-started-guide.md` + DA-app tutorials; IA-blueprint tutorial Units (toc-outline Units 2/6) |
| A-08 | KB-DOCSETS, PROD, RL | master-docset `nodejs-da-application`, `python-da-application`, `overview-of-data-analytics-applications`; PROD `how-to/windows-rfid-reader-and-pos-integration.md`, `explanation/use-case-*`, `explanation/case-study-lowes.md`; RL rfid-fundamentals / communication-mqtt / api-and-web-design / rfid-applications |
| A-09 | *(diff baseline only)* | **`…/handheld-rfid-iotc-api-schema-and-docs-zebra-official/`** as the official baseline to diff the 8-vs-16 flag reconciliation (`refrence/payload/cfgEventPayload.yaml`, `commands/dev_mgmt/config_events.json`, `openapi.json`). **NOT a fact source — the technical-writer SoT rule stands** |
| A-10 | KB-DOCSETS, RL | master-docset `zebra-iot-connector-faqs-…md` (authoritative FAQ); `mqtt-api-reference/*` (verify answers); RL `api-and-web-design/*` |
| A-12 | PROD | `how-to/connect-a-reader-with-123rfid-desktop.md`; `explanation/zebra-handheld-sleds-hardware-platform/*` (prerequisites/requirements facts) |
| A-13 | KB-DOCSETS, RL, BRAND | master-docset IA blueprints (`zebra-handheld-rfid-iotc-{toc,toc-outline,conceptual-toc,content}.md`); RL `data-and-information-architecture/*`; BRAND (diagram/TOC theme) |
| A-14 | KB-DOCSETS, RL | master-docset IA blueprints (mode counts per Unit to reconcile against); RL `data-and-information-architecture/*` |
| A-15 | KB-DOCSETS, SoT toolchain | master-docset IA blueprints; `…/technical-writer/docs/handled_reader_documentation_strategy.pptx`, `…/handled_reader_usability_meeting.pptx` (recorded IA / usability rationale; binary — name only) |
| A-16 | KB-DOCSETS, PROD | master-docset IA blueprints + fixed-reader guides (the "how handheld differs from fixed" framing) + background overviews; PROD use-cases / personas; the strategy decks (shared with A-15) |
| A-18 | BRAND | `_meta/brand/logos/**`, `_meta/brand/fonts/**` (404 chrome / logo consistency) |

### 6.2 Coverage ledger — every `_meta` top-level area

| `_meta` area | Files | Mapped to | Status |
|---|---|---|---|
| `brand/{fonts,logos}` | 19 | A-18 (Pack BRAND); A-03/A-13 visual | ✅ mapped (low) |
| `governance/ia-blueprints` | 4 | Pack IA → all actions | ✅ |
| `governance/site-rulebooks` | 6 | Pack GOV → A-01/05/06/11/12/17/18 | ✅ |
| `governance/style-guide` | 1 | Pack GOV → A-11/A-12 | ✅ |
| `governance/{audits,policy}` | 2 (`.gitkeep`) | A-09/A-14/A-15 output homes | ✅ |
| `…/reference/…-technical-writer` | 232 | Pack SoT → A-01–A-04, A-06, A-09, A-10 | ✅ (SoT) |
| `…/reference/…-mqtt-api-reference` | 24 | Pack KB-DOCSETS → A-01/02/03/06/10/16 | ✅ (new) |
| `…/reference/…-master-docset` | 71 | Pack KB-DOCSETS → A-05/07/08/10/13/14/15/16 + A-01/03/04 | ✅ (new) |
| `…/reference/…-zebra-official` | 147 | A-09 diff baseline only | ✅ (diff-only; **not** a fact source) |
| `…/product/{explanation,how-to,tutorials}` | 35 | Pack PROD / SoT-adjacent → A-04/05/07/08/12/16 | ✅ |
| `…/research-library/{rfid-*,communication-mqtt,iot-platforms,api-and-web-design,security-privacy,business-strategy}` | ~155 md | Pack RL → A-01/03/04/05/06/08/10 | ✅ (new) |
| `…/research-library/{data-and-information-architecture,mental-models-and-reasoning}` | 5 | Pack FW → A-13/14/15/16 + framing | ✅ |
| **Non-required assets** | 154 research-library figures · 7 `.otf` · 12 logo binaries (`.eps/.png/.svg`) · 2 `.pptx` · 1 `.docx` · `.gitkeep`/`.gitignore` · generated `docs/openapi_md.json` | — | ⚪ figures / branding / binaries / placeholders / generated — not execution-required (the 2 strategy `.pptx` are named in A-15) |

Every content-bearing `_meta` area is now mapped to ≥1 action; every remaining asset is explicitly classified non-required. Total reconciles to the 885-file inventory.

---

*This plan lists actions and their `_meta` evidence base only; it executes none of them. Apply via A-15's one-page-at-a-time workflow.*
