# Documentation Table of Contents: IA Blueprint (v3)

> Authored 2026-06-07, revised the same day with a dedicated **ordering audit**. Baseline navigation source: [`sidebars.ts`](../../../sidebars.ts) (the Docusaurus sidebar — the single source of truth for site navigation). Rendered page inventory: [`DOCUMENTATION_TOC.md`](DOCUMENTATION_TOC.md). Page links resolve to the Markdown source under [`docs/`](../../../docs/).
>
> **Placement note:** the task specified `ia-blueprints/TOC_NEW.md`. This repository's IA-blueprints home is `_meta/governance/ia-blueprints/` (alongside `DOCUMENTATION_TOC.md` and the `actions-v*.md` audits), so the blueprint is written here rather than in a redundant new top-level folder.

## 1. Executive Summary & IA Audit Notes

The current IA is a **mature, deliberately-architected nine-Part reader journey** over 120 pages, already compliant with the First-Principles IA Framework at the macro level (prerequisite-ordered Parts, ≤3 grouping levels, per-page Diátaxis badges, MECE sections). It was refined in two evidence-grounded passes — a **structural** pass and an **ordering** pass — neither a teardown.

**Pass A — structure (grouping & naming):** adopted two structural refinements and rejected several anti-patterns (see §3).

**Pass B — ordering (this revision):** nine per-Part auditors *read the underlying pages* to establish true cognitive dependencies (not title-guessing), and a synthesizer resolved the Part sequence and cross-Part consistency. Findings:

- **The nine-Part sequence is already optimal** and is unchanged — it is a strict prerequisite chain: orient (1) → fundamentals (2) → hands-on start (3) → manage the reader (4) → read tags (5) → observe (6) → scale (7) → diagnose (8) → reference (9).
- **Eight within-Part / within-sub-category reorderings were adopted**, each justified by a *concrete* dependency found in the pages (e.g., `tls-setup`'s Step 1 requires `certificate-management`; `configure-endpoints` links to `multi-endpoint`; `configure-events` depends on the event concepts it enables). The governing rule throughout: **Explanation precedes the How-To that applies it, which precedes deep Reference; simpler precedes advanced; and analogous Parts are ordered the same way.**
- **Cross-Part consistency win:** Parts 5 and 7 both embed a tutorial. They are now uniformly ordered **Explanation → Tutorial → How-To** (Part 7's `provisioning-models` concept now precedes the `provision-fleet` tutorial, matching Part 5). Parallel structure lets readers predict the shape of every Part.
- **Three proposed reorderings were rejected** because they would optimize *topic-dependency* at the expense of the **reader's job-to-be-done**, which is the deeper first principle for those surfaces (see §3 "Considered and rejected").

The net result orders every list — topic, sub-topic, and sub-sub-topic level — so that nothing references a concept that appears later, while still respecting the distinct *purpose* of the orientation, incident-response, and reference surfaces.

**Nesting-depth note.** Primary navigation stays within **three grouping levels** (Part → sub-category → page). The single deepest branch is Part 9 → *Command reference* → *Management/Control/Data & events* → page; this is intentional and principled — reference structure should mirror the machinery it documents (the MGMT/CTRL/DATA endpoint split) — and it is the only branch at that depth.

---

## 2. Revised Table of Contents

- **Part 1: Get oriented**
  - [Start here](../../../docs/foundations/start.md)
  - [How to read this documentation](../../../docs/foundations/documentation-guide.md)
  - [Tutorials](../../../docs/tutorials.md)
  - [MQTT in five minutes](../../../docs/foundations/mqtt-primer.md)
  - [RFID in five minutes](../../../docs/foundations/rfid-primer.md)
  - [Pairing the docs with the API Reference](../../../docs/foundations/docs-and-api-reference.md)
- **Part 2: Foundations**
  - [What the IoT Connector is](../../../docs/foundations/about-iotc.md)
  - [IOTC V1.1 release features](../../../docs/foundations/v1-1-features.md)
  - [Which sled do you have?](../../../docs/foundations/hardware-tiers.md)
  - [Roles: Reader, Broker, Application](../../../docs/foundations/actors.md)
  - [How commands and responses flow](../../../docs/foundations/communication-flow.md)
  - [Bootstrapping with 123RFID Desktop](../../../docs/foundations/bootstrap-tools.md)
  - [123RFID Mobile (Android)](../../../docs/foundations/mobile-app.md)
  - [The interface model](../../../docs/foundations/architecture/interface-model.md)
  - [The OpenAPI Illusion](../../../docs/foundations/native-mqtt-vs-openapi.md)
  - [How the radio reads tags](../../../docs/foundations/rfid-air-interface.md)
  - **Architecture & MQTT internals** — *explanatory-depth; best read after Part 3, not required before the Quick Start*
    - [End-to-end system architecture](../../../docs/foundations/architecture/end-to-end.md)
    - [Handheld-specific considerations](../../../docs/foundations/architecture/handheld-considerations.md)
    - [Topic hierarchy & naming conventions](../../../docs/foundations/mqtt/topic-hierarchy.md)
    - [QoS levels & delivery guarantees](../../../docs/foundations/mqtt/qos.md)
    - [Authentication & authorization model](../../../docs/foundations/mqtt/auth-model.md)
    - [Connection lifecycle & keep-alive](../../../docs/foundations/mqtt/connection-lifecycle.md)
- **Part 3: Quick start**
  - [Your first 30 minutes](../../../docs/quick-start/overview.md)
  - **Phase 0: Prerequisites**
    - [Hardware & software requirements](../../../docs/quick-start/prerequisites/requirements.md)
    - [IOTC credentials & tenant ID](../../../docs/quick-start/prerequisites/credentials.md)
  - [Phase 1: Prepare network and broker](../../../docs/quick-start/phase-1.md)
  - [Phase 2: Bootstrap the reader](../../../docs/quick-start/phase-2.md)
  - [Phase 3: Verify the bootstrap connection](../../../docs/quick-start/phase-3.md)
  - [Phase 4: Inspect endpoint state](../../../docs/quick-start/phase-4.md)
  - [Phase 5: Add remote endpoints](../../../docs/quick-start/phase-5.md)
  - [Phase 6: Start and stop inventory](../../../docs/quick-start/phase-6.md)
  - [Phase 7: Reboot when needed](../../../docs/quick-start/phase-7.md)
  - [Phase 8: Secure the connection](../../../docs/quick-start/phase-8.md)
- **Part 4: Manage your reader**
  - [What your reader knows about itself](../../../docs/infrastructure/device-state.md)
  - **Network**
    - [Getting on the network (Wi-Fi & Ethernet)](../../../docs/infrastructure/network/architecture.md)
    - [How to configure Wi-Fi profiles](../../../docs/infrastructure/network/wifi.md)
    - [How to check Ethernet status](../../../docs/infrastructure/network/ethernet.md)
    - [How to troubleshoot network issues](../../../docs/infrastructure/network/troubleshooting.md)
  - **MQTT endpoints**
    - [How the MQTT plumbing fits together](../../../docs/infrastructure/mqtt-endpoints.md)
    - [Multi-endpoint architectures](../../../docs/infrastructure/multi-endpoint.md)
    - [How to configure MQTT endpoints](../../../docs/infrastructure/configure-endpoints.md)
    - [How to view endpoint configuration](../../../docs/infrastructure/view-endpoints.md)
  - **Security (TLS & certificates)**
    - [Securing the connection (TLS & certificates)](../../../docs/infrastructure/tls-and-certificates.md)
    - [How to manage TLS/SSL certificates](../../../docs/infrastructure/certificate-management.md)
    - [How to secure the MQTT connection with TLS](../../../docs/infrastructure/tls-setup.md)
    - [How to rotate certificates at scale](../../../docs/infrastructure/certificate-rotation.md)
  - [Updating firmware and rebooting](../../../docs/infrastructure/system-operations.md)
- **Part 5: Read tags**
  - **Operating mode**
    - [Choose how the reader reads tags](../../../docs/rfid/operating-mode-profiles.md)
    - [How to configure the operating mode](../../../docs/rfid/operating-mode/configure.md)
    - [RF performance tuning](../../../docs/rfid/performance-tuning.md)
    - [Trigger composition](../../../docs/rfid/operating-mode/trigger-composition.md)
  - [Read your first tag](../../../docs/tutorials/read-your-first-tag.md)
  - [Start, stop, and the trigger button](../../../docs/rfid/start-stop-inventory.md)
  - [Scan barcodes](../../../docs/rfid/barcode.md)
  - [Filter tags before vs after the read](../../../docs/rfid/post-filters.md)
  - [How to configure post-filters](../../../docs/rfid/operating-mode/post-filters-configure.md)
- **Part 6: Observe and monitor**
  - [Watch your reader's pulse](../../../docs/observability/heartbeat.md)
  - [When the reader needs to interrupt you](../../../docs/observability/alerts.md)
  - [Knowing when you're connected](../../../docs/observability/mqtt-connection.md)
  - **Event model & catalog**
    - [The IOTC event model](../../../docs/observability/events/model.md)
    - [Event types catalog](../../../docs/observability/events/catalog.md)
  - [Choose what the reader tells you](../../../docs/observability/configure-events.md)
  - **Monitoring how-tos**
    - [How to check device status & health](../../../docs/observability/monitoring/device-health.md)
    - [How to monitor battery lifecycle](../../../docs/observability/monitoring/battery.md)
    - [How to monitor connection quality](../../../docs/observability/monitoring/connection-quality.md)
    - [How to build a fleet health dashboard](../../../docs/observability/monitoring/fleet-dashboard.md)
  - **Tag data**
    - [Tag-data event architecture](../../../docs/rfid/tag-data/architecture.md)
    - [Where tag reads come from](../../../docs/rfid/dataevt-schema.md)
    - [How to interpret tag-data fields](../../../docs/rfid/tag-data/interpret.md)
    - [Dual data channels (data1event / data2event)](../../../docs/rfid/tag-data/dual-channels.md)
    - [How to process tag data in your application](../../../docs/rfid/tag-data/process.md)
- **Part 7: Scale to a fleet**
  - [Going from one reader to a fleet](../../../docs/fleet/provisioning-models.md)
  - [Tutorial: provision a three-reader fleet](../../../docs/fleet/provision-fleet.md)
  - [Keeping a fleet in sync](../../../docs/fleet/bulk-management.md)
  - [How to detect and remediate configuration drift](../../../docs/fleet/management/drift.md)
  - [What happens when the network drops](../../../docs/fleet/retention-and-retry.md)
  - **Provisioning how-tos**
    - [How to provision readers in bulk with 123RFID Desktop](../../../docs/fleet/provisioning/bulk-123rfid.md)
    - [How to set up zero-touch provisioning with SOTI Connect](../../../docs/fleet/provisioning/soti-connect.md)
    - [How to automate provisioning workflows](../../../docs/fleet/provisioning/automation.md)
  - **Migration**
    - [How to plan a migration](../../../docs/fleet/migration/plan.md)
    - [How to execute a phased migration](../../../docs/fleet/migration/execute.md)
    - [How to verify a successful migration](../../../docs/fleet/migration/verify.md)
    - [How to migrate 123RFID Desktop settings](../../../docs/fleet/migration/from-123rfid-desktop.md)
  - **Cloud integration**
    - [Cloud prerequisites](../../../docs/fleet/cloud-integration/prerequisites.md)
    - [Integration architecture patterns](../../../docs/fleet/cloud-integration/patterns.md)
    - [How to integrate with AWS IoT Core](../../../docs/fleet/cloud-integration/aws.md)
    - [How to integrate with Azure IoT Hub](../../../docs/fleet/cloud-integration/azure.md)
    - [How to integrate with Google Cloud](../../../docs/fleet/cloud-integration/gcp.md)
    - [How to integrate with a custom MQTT broker](../../../docs/fleet/cloud-integration/custom-broker.md)
- **Part 8: Diagnose & recover**
  - [Something's broken?](../../../docs/diagnose/symptoms.md)
  - [Failure modes](../../../docs/diagnose/failure-modes.md)
  - [Where things fail](../../../docs/diagnose/where-things-fail.md)
  - [Playbooks for getting back online](../../../docs/diagnose/recovery-playbooks.md)
  - [How to handle errors in application code](../../../docs/diagnose/handle-errors.md)
  - [Things people get wrong about IOTC](../../../docs/diagnose/misconceptions.md)
- **Part 9: Reference**
  - [MQTT API Reference](../../../docs/reference/api-overview.md)
  - **Command reference**
    - **Management (MGMT)**
      - [Device status (MGMT)](../../../docs/reference/mgmt/device-status.md)
      - [Network configuration (MGMT)](../../../docs/reference/mgmt/network.md)
      - [MQTT endpoint configuration (MGMT)](../../../docs/reference/mgmt/endpoint.md)
      - [Certificate management (MGMT)](../../../docs/reference/mgmt/certificates.md)
      - [System operations (MGMT)](../../../docs/reference/mgmt/system-operations.md)
      - [Event configuration (MGMT)](../../../docs/reference/mgmt/event-configuration.md)
    - **Control (CTRL)**
      - [Operating mode (CTRL)](../../../docs/reference/ctrl/operating-mode.md)
      - [Tag filtering (CTRL)](../../../docs/reference/ctrl/tag-filtering.md)
      - [Inventory control (CTRL)](../../../docs/reference/ctrl/inventory-control.md)
    - **Data & events**
      - [Data interface | dataEVT](../../../docs/reference/data/tag-data-event.md)
      - [Events reference | full schemas](../../../docs/reference/events/all-events.md)
    - [MDM and SOTI interfaces](../../../docs/reference/mdm/about.md)
  - **Error codes & handling**
    - [Error response format](../../../docs/reference/errors/format.md)
    - [Command response error codes](../../../docs/reference/errors/codes.md)
  - **FAQ**
    - [General questions](../../../docs/reference/faq/general.md)
    - [Connectivity & network FAQs](../../../docs/reference/faq/connectivity.md)
    - [Compatibility FAQs](../../../docs/reference/faq/compatibility.md)
    - [RFID operations FAQs](../../../docs/reference/faq/rfid.md)
    - [Fleet management FAQs](../../../docs/reference/faq/fleet.md)
  - **Appendices**
    - [Regulatory & regional information](../../../docs/reference/appendices/regulatory.md)
    - [Firmware version history & changelog](../../../docs/reference/appendices/firmware-history.md)
    - [Supported RFID tag types & standards](../../../docs/reference/appendices/tag-standards.md)
    - [MQTT topic quick reference](../../../docs/reference/appendices/topic-quick-reference.md)
  - [Glossary, limits, and cheat sheets](../../../docs/reference/glossary.md)

---

## 3. Key Structural Changes & Justifications

### 3a. Ordering changes adopted (this revision)

| Original order | Revised order | First-Principles IA justification |
| :--- | :--- | :--- |
| **Part 1:** Start here → **Tutorials** → How to read this documentation → … | Start here → **How to read this documentation** → Tutorials → … | **Diátaxis:** the Explanation page that frames the nine-Part structure should precede the Tutorials hub it helps the reader navigate. |
| **Part 2:** … actors → bootstrap-tools → mobile-app → **How commands and responses flow** → interface model → OpenAPI Illusion … | … actors → **How commands and responses flow** → bootstrap-tools → mobile-app → interface model → OpenAPI Illusion … | **Dependency:** `communication-flow` introduces the command/response, event, and fire-and-forget patterns that `interface model` and `OpenAPI Illusion` apply. It must precede them; it currently sat after. |
| **Part 4 → MQTT endpoints:** plumbing → configure → **multi-endpoint** → view | plumbing → **multi-endpoint** → configure → view | **Dependency + Diátaxis:** `configure-endpoints` links out to `multi-endpoint` for the single-vs-separate-broker decision, and `multi-endpoint` is an Explanation. Both Explanations precede both How-Tos. |
| **Part 4 → Security:** model → **tls-setup** → certificate-management → rotation | model → **certificate-management** → tls-setup → rotation | **Hard dependency:** `tls-setup` Step 1 *is* "install the broker CA — follow [certificate management]." You cannot enable TLS without first installing certificates. |
| **Part 6:** **configure-events** → heartbeat → alerts → mqtt-connection → Event model & catalog → … | heartbeat → alerts → mqtt-connection → Event model & catalog → **configure-events** → … | **Dependency:** `configure-events` (How-To) chooses *which* events to emit; the reader must first know *what* the events are (the three event Explanations + the event model). |
| **Part 6 → Tag data:** **Where tag reads come from** → Tag-data event architecture → interpret → … | **Tag-data event architecture** → Where tag reads come from → interpret → … | **Diátaxis:** the architecture Explanation (the five-stage flow) is the conceptual foundation; the dataEVT schema is field-level Reference that assumes it. Concept before reference. |
| **Part 7:** **Tutorial: provision a three-reader fleet** → Going from one reader to a fleet → … | **Going from one reader to a fleet** → Tutorial: provision a three-reader fleet → … | **Dependency + parallel structure:** the provisioning-models Explanation establishes the three paths the tutorial then demonstrates. This makes Part 7 match Part 5's adopted **Explanation → Tutorial → How-To** shape. |
| **Part 9 → Error codes & handling:** **Command response error codes** → Error response format | **Error response format** → Command response error codes | **Dependency:** the format page defines the response envelope and the `response.code` field that the code table presupposes. Envelope before codes. |

### 3b. Structural refinements retained (prior pass)

- **Part 5** groups the four operating-mode pages into an **"Operating mode"** sub-category placed ahead of the dependent tutorial (also trimming Part 5 from 9 → 6 top-level items). *(The ordering audit confirmed Part 5 is now correctly ordered and required no further change.)*
- **Part 2** sub-category description corrected from "reference-depth" to **"explanatory-depth"** (its six pages are Explanation, not Reference).

### 3c. Considered and rejected (each on a competing first principle)

| Proposed change | Why rejected |
| :--- | :--- |
| **Part 3:** move *Phase 0: Prerequisites* before *Your first 30 minutes*. | *Your first 30 minutes* is the Quick Start's **orientation/landing page** (it carries the eight-phase dependency ladder). The map must precede its first stop — the reader needs the arc before a bare hardware/credentials checklist. Overview stays first; it *introduces* Phase 0. |
| **Part 8:** lead with *Where things fail* (concept) and *Things people get wrong*, pushing *Something's broken?* down. | Part 8 is the **incident-response surface**; its first principle is the reader's job-to-be-done — they arrive *with a symptom* and need fast routing. The symptom-first index (*Something's broken?*) is the correct entry; a concept page first slows the operator mid-incident. |
| **Part 9:** lead with *Glossary* and *Error codes*, pushing *MQTT API Reference* to third. | Per Diátaxis, **reference architecture mirrors the machinery**, not a learning sequence — reference is consulted, not read linearly. The API overview is the index/front door; the glossary is a terminal lookup. (Only the *within*-Error-codes swap — format before codes — was adopted.) |
| *(Prior pass)* Sub-categorize Part 1; split Part 4 Network into a single-page "Foundations" sub-category; swap Part 8's emoji. | Buried the top-priority "Start here" page / created single-item sub-categories (anti-patterns) / pure churn. |

> **Completeness:** all **120** pages from `sidebars.ts` are placed exactly once; none invented, dropped, or moved across Part/sub-category boundaries — every change is a reordering within an existing list. Maximum grouping depth is three levels. The nine Parts remain mutually exclusive and collectively exhaustive, and the Part sequence (1–9) is unchanged because it is already an optimal prerequisite chain.
