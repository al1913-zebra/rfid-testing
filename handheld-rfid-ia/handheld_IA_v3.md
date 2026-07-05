# Zebra RFD40 / RFD90 Handheld RFID Sled — IoT Connector (IOTC)
## Developer Manual — Information Architecture & Table of Contents

_Document type: Structural plan (no content generation)._
**Version 3.1 | June 2026 | CONFIDENTIAL**

> **How this IA was synthesized.** This blueprint takes the **best of two prior architectures**. From the **handheld (RFD40/90) IA** it keeps the product-derived **10-Part lifecycle spine**, the load-bearing **bootstrap/MDM-endpoint gate**, Diátaxis-as-a-**per-page badge** (never the folder skeleton), the fifth content type **Diagnosis**, the persona router, and the provenance/completeness ledger. From the **fixed-reader (FXR90) IA** it imports the **discipline**: gapless numbering, a single **canonical source** for every fact (no duplicated, drifting copies), **once-stated** design rules, a mandated cross-reference pattern table, clean page templates, **mechanically executable** quality methods, and a **✓ MVD scheme** whose marks map one-to-one to Phase 1. Every internal-consistency defect found in the prior handheld draft (a phantom "Part 11," a self-contradicting persona caption, an undefined "Incident Responder" persona, a "two-vs-three `stateOfHealth`" mismatch, and three divergent copies of the constraints fence) is corrected here.
>
> **What changed in Version 3.0.** v3 closes the residual conformance gaps the v2 audit surfaced, each paired with a falsifiable check in §8: the **Decommission** lifecycle stage and its revocation/wipe transitions (Part 8); region-keyed **min and max** transmit-power bounds (Part 10); a single **event-to-channel schema registry**; **per-operating-mode field tables**; an **endpoint/channel parity grid**; the **firmware ↔ API ↔ reader-model matrix**; the request/response **correlation envelope**; a closed-vocabulary reader-model **`applies_to`** tag on every page (§4.6); and an **enumerated** (not merely asserted) command-error catalog.
>
> **What changed in Version 3.1.** Schema-accuracy pass against the RFD40/RFD90 MQTT API Reference (the `gen2x-openapi-spec` contract): the machine contract is **OpenAPI, not AsyncAPI**; the firmware **rollback** command (`os/revertbackOS`) was removed as non-existent — the schema offers `set_os` (update) + `reboot` + failure-recovery only; `dynamicPower` is a boolean toggle (not a min/max bound); the radio lifecycle is `radioActivity` INACTIVE→ACTIVE; and the event-to-channel registry now lists real events (not the `NETWORK_EVENT` alert-id or the MGMT_EVT channel). Naming pass against the topic-naming guide: Tutorial titles use gerunds, Diagnosis titles use diagnostic verbs, and vague/over-long titles were tightened. (Two items are flagged for your confirmation rather than changed — see the audit notes.)

---

## Table of contents of this blueprint

1. Audience analysis & developer personas
2. Content-type taxonomy (the five-quadrant badge system)
3. Detailed table of contents (the information architecture)
4. Information design principles
5. Navigation model & cross-reference strategy
6. Format specifications & page templates
7. Implementation priorities
8. Quality evaluation framework
9. Completeness & provenance
10. Appendix — Title → Source-page mapping

---

# 1. Audience analysis & developer personas

Four personas drive the architecture. Each enters the lifecycle spine at a different stage, determined by the job they arrive with. The personas are re-derived for handheld realities (a battery-powered Bluetooth peripheral of a moving Android host, brought up out-of-band, hunting one tag in a crowd) rather than carried over from the fixed-reader benchmark.

| Persona | Description | Primary need | Entry point |
|---|---|---|---|
| **New Integrator** | First contact with handheld IOTC; has a sled in a box, no prior MQTT or RFID depth. Does not yet know the sled is a Bluetooth peripheral that must be bootstrapped out-of-band. | One uninterrupted onboarding path: understand the frame → pair & power up → clear the bootstrap/MDM gate → connect → configure → pull the trigger and read a tag. | Part 1 router → walk **Parts 1–6**, seeded by the Tutorials hub. |
| **Solution Builder** | Building a production mobile-worker app (picking, asset search, returns) that drives the trigger, consumes `dataEVT`, and closes the loop with operator feedback. The defining handheld persona. | Trigger composition, tag-data handling, the find-one-tag locate loop, RF-power-DOWN, and the IOTC-vs-host-SDK boundary. | Part 1 router → **Parts 4–8**, with Part 6 as the center of gravity. |
| **API / Integration Consumer** | Writes integration code against the native MQTT interface (often server-side/middleware); treats the docs as a lookup surface. | Fast, dry lookup: the MGMT/CTRL/DATA command reference, event schemas, the matrices, error codes, and the constraints fence. Must not be misled by OpenAPI framing — it is native MQTT. | Part 1 router → **Part 10 Reference** (≤2 steps); enters out of order. |
| **Returning Developer** | Arrives with fixed-reader (FXR90-class) IOTC or 123RFID Desktop experience; adopting the IOTC API for handheld. Fixed and handheld are complementary, not a hardware migration. | A hard **do-not-port reconciliation**, the out-of-band region/MDM reality, and how to carry 123RFID Desktop settings across. | Part 1 router → the **do-not-port checklist (Part 2)** and the **IOTC-adoption cluster (Part 8)** (≤2 steps). |

## 1.1 Persona-to-Part matrix

**Legend:** **P** = Primary (this persona's home Part) · **R** = Read (load-bearing for the job) · **S** = Skim (helpful, not required) · **—** = Skip.

| Part | New Integrator | Solution Builder | API / Int. Consumer | Returning Developer |
|---|:---:|:---:|:---:|:---:|
| **1 — Orient** | P | R | R | R |
| **2 — Understand the handheld system** | P | R | S | R |
| **3 — Pair & Power Up** | P | R | — | S |
| **4 — Connect & Secure** | P | P | S | R |
| **5 — Configure the Read** | P | P | S | R |
| **6 — Read & Find** | P | P | R | R |
| **7 — Observe & Monitor** | S | R | S | S |
| **8 — Scale to a Fleet** | — | R | — | P |
| **9 — Diagnose & Recover** | R | R | R | R |
| **10 — Reference Library** | S | R | P | R |

Two cells are deliberately near-universal: **Part 9 (Diagnose)** is `R` for every persona and is never gated, so it is reachable fast from anywhere; **Part 10 (Reference)** is consulted by all four but is *home* only to the API Consumer. The matrix encodes the router's promise exactly: the **New Integrator's Primary cells (Parts 1–6) form one contiguous walk** with no gaps, while the API Consumer (Part 10) and the Returning Developer (the Part 2 do-not-port checklist + the Part 8 adoption cluster) each reach their destination in **≤2 steps** from the Part-1 router without re-slicing the spine.

---

# 2. Content-type taxonomy (the five-quadrant badge system)

Every page carries **exactly one** content-type badge. The badge is **metadata applied per page — never the folder skeleton.** The skeleton is the lifecycle spine (§3); Diátaxis rides on top as a filter, so a reader can ask the site to "show me every Tutorial" without the file tree ever being sliced by learning mode. There are no `tutorials/`, `how-to/`, or `reference/` top-level buckets.

| Content type | Badge | The reader question it answers | Template |
|---|---|---|---|
| **Explanation** | `[Explanation]` | *"What is this, why does it work this way, and what are the trade-offs?"* | Concept → mechanism → trade-offs → "what this implies for the rest of the docs." |
| **Tutorial** | `[Tutorial]` | *"Teach me by doing — walk me from nothing to a visible result."* | Promise → numbered steps with verifiable results → worked artifact → recap → "Didn't work?" escape hatch. Ends at a **physical-world checkpoint** (radio turns ACTIVE; `peakRssi` climbs as you approach). |
| **How-To Guide** | `[How-To Guide]` | *"I have a real task and the context — give me the steps."* | Goal → prerequisites → ordered steps with exact payloads → verify → response/error codes. |
| **Reference** | `[Reference]` | *"Tell me the exact field, enum, payload, or code — I am consulting, not reading."* | Dry, exhaustive, machine-ordered: field tables, enum lists, conditional matrices, worked payloads. |
| **Diagnosis** | `[Diagnosis]` | *"Something is broken right now — route me from symptom to fix."* | Symptom → fast triage → ranked causes → fix steps → success check. **Entered symptom-first.** |

**Why a fifth type.** A mobile, battery-bound, wirelessly-tethered device fails in **symptom-entered** ways a hardwired reader does not (Wi-Fi roam dropouts, Bluetooth pairing loss, battery drain, a trigger that won't fire, a good read with no operator beep). Folding these into How-To would bury a symptom router under task recipes; promoting **Diagnosis** to its own type keeps it symptom-ordered. This also keeps the IOTC-vs-host-SDK boundary honest: the operator-feedback *model* is an Explanation, the *drive-feedback-from-`dataEVT`* recipe is a How-To, and the *no-beep-fired* failure is a Diagnosis.

**Diagnosis and the ordering tie-breaker.** The within-Part mode-order tie-breaker is **defined once in §4.5** and is not restated here. **Diagnosis is intentionally exempt** from it: a `[Diagnosis]` page is placed symptom-first, never by mode-order, and lives in its dedicated Part (9) or beside the failure it addresses.

---

# 3. Detailed table of contents (the information architecture)

> **Reading this TOC.** The **10 Parts** are the structure — a handheld-lifecycle **strict prerequisite chain** (nothing references a concept introduced in a later Part). The bracketed `[Badge]` on every leaf is the Diátaxis tag (filtering only). `*[NET-NEW]*` marks a page with no current-inventory equivalent; `*[REFRAMED]*` marks an existing page whose framing changes for handheld. **✓** marks a Minimum-Viable-Documentation (Phase-1) leaf (see §7). Lists never exceed **two bullet levels** (Part → section → leaf); each section carries a sentence-case noun-phrase name per the §4.7 blueprint plus a one-line descriptor. Within each Part, leaves are ordered by **dependency and task sequence first**, with the Diátaxis mode-order as the tie-breaker (rule stated once in §4.5). Three surfaces are deliberately non-linear: **Part 1 is job-ordered, Part 9 is symptom-first, Part 10 is consulted/machinery-ordered.**

## Part 1 — Orient: what this is, who it is for, where to go ✓
*Orientation surface — sequenced first and job-ordered. Carries the scope promise (IOTC is a native-MQTT data/control plane; a sled is a battery-powered Bluetooth peripheral brought up out-of-band) and the Tutorials-vs-Reference doc-set promise.*

- **Welcome and navigation** — *Product purpose, manual layout, and persona-based reading paths for new readers.*
  - `[Explanation]` ✓ Start here: what handheld IOTC lets you build
  - `[Explanation]` ✓ How this manual is organized
  - `[Explanation]` ✓ Which reading path fits you (the persona router)
- **Quick concept primers** — *Just-enough background on the two core domains, MQTT and RFID.*
  - `[Explanation]` ✓ MQTT in five minutes
  - `[Explanation]` ✓ RFID in five minutes
- **Docs and API Reference relationship** — *How this manual relates to the native-MQTT API Reference surface.*
  - `[Explanation]` ✓ This manual and the MQTT API Reference
  - `[Explanation]` ✓ The OpenAPI illusion: it's native MQTT, not REST
- **Conventions and support**
  - `[Reference]` Documentation conventions and code-example standards *[NET-NEW]*
  - `[Reference]` Related documents and support *[NET-NEW]*
- **Guided learning path** — *Pointer to the Tutorials hub and the structured onboarding sequence.*
  - `[Explanation]` ✓ The Tutorials hub — your onboarding sequence at a glance

## Part 2 — Understand the handheld system ✓
*Build the conceptual model before any task. Foundational theory (the radio, MQTT) precedes the system architecture; introduces the seven endpoint types (MDM as the bootstrap default; SOTI-only commands marked out of scope) and closes with the five physical realities that dictate every later Part.*

- **Product and release scope** — *What the connector is and what changed in the current release.*
  - `[Explanation]` ✓ What the IoT Connector does
  - `[Explanation]` What's new in IOTC V1.1
- **RF reading and tag memory** — *The radio read mechanism and the Gen2 tag-memory model.*
  - `[Explanation]` ✓ How the radio reads a tag (UHF air interface and singulation)
  - `[Explanation]` Tag memory and the Gen2 model — Reserved/EPC/TID/USER banks, sessions 0–3, inventoried flags A/B *[NET-NEW]*
- **MQTT protocol model** — *Topic addressing, QoS delivery guarantees, and authentication at the protocol level.*
  - `[Explanation]` ✓ Topic structure: tenant / topic / serial
  - `[Explanation]` ✓ QoS levels and delivery guarantees
  - `[Explanation]` Authentication and authorization over MQTT
- **System architecture and message flow** — *Actors, command-response-event flow, endpoint model, and the end-to-end path.*
  - `[Explanation]` ✓ The three actors: reader, broker, application
  - `[Explanation]` ✓ How commands, responses, and events flow
  - `[Explanation]` ✓ The interface model and the seven endpoint types (MDM, MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI)
  - `[Explanation]` End-to-end: from a trigger pull to your application
- **Hardware and bootstrap tooling** — *Sled and host hardware, out-of-band bootstrap rationale, and the companion app.*
  - `[Explanation]` ✓ Your sled and host hardware (RFD40 / RFD90 on TC-series) — IOTC requires the IOTC-capable RFD40 (Premium-class) and RFD90; the RFD40 Standard variant is **not IOTC-capable** and is out of scope
  - `[Explanation]` ✓ Why out-of-band bootstrap is required (123RFID Desktop sets region, Wi-Fi, and the MDM endpoint over Bluetooth or USB-C)
  - `[Explanation]` 123RFID Mobile: the Android companion app
- **Handheld constraints and porting** — *Physical realities unique to a sled and do-not-port guidance.*
  - `[Explanation]` ✓ The five physical realities of a handheld sled
  - `[Reference]` ✓ Do-not-port orientation — a short framing that **links to the canonical constraints fence** (Part 10); see §5.3 *[NET-NEW]*

## Part 3 — Pair and power up the sled ✓ — *physical realities: Bluetooth host-tether + battery*
*The first gate-blocking tasks the fixed benchmark has no equivalent for. Nothing happens until the sled is paired over Bluetooth and has charge — so prerequisites open the Part, and the power model is introduced here, at power-up. Deep duty-cycle engineering is deferred to Part 8 via a "when you are ready" pointer (§4.2).*

- **Setup prerequisites** — *Hardware, software, and credentials required before any task begins.*
  - `[Reference]` ✓ Hardware and software you need
  - `[How-To Guide]` ✓ Get your IOTC credentials and tenant ID
- **Guided first read** — *End-to-end onboarding tutorial to a new user's first live RFID read.*
  - `[Tutorial]` ✓ Reaching your first live read (guided onboarding spanning pair → power → bootstrap → read; also surfaced from the Tutorials hub)
- **Bluetooth host link** — *Explanation plus procedures to establish and confirm the host link.*
  - `[Explanation]` ✓ The Bluetooth host link — a transport separate from the Wi-Fi/MQTT path *[NET-NEW]*
  - `[How-To Guide]` ✓ Pair, re-pair, and confirm the host link *[NET-NEW]*
- **Power and battery**
  - `[Explanation]` ✓ The handheld power model — battery, duty cycle, sleep/wake (`powerSource` DC/WALLCHARGER/USB/CRADLE, `powerMode` ACTIVE; every `PINGREQ` wakes the host Wi-Fi radio; PoE is not a handheld option) *[NET-NEW]*
  - `[How-To Guide]` ✓ Charge the sled and clear the battery gate (the `set_os` error code 14 low-battery gate) *[NET-NEW]*
  - `[How-To Guide]` ✓ Make the battery last a shift (OPTIMAL_BATTERY, stop-between-scans; "when you are ready" → Part 8) *[NET-NEW]*
  - `[How-To Guide]` Monitor battery charge and long-term health *[REFRAMED — relocated from Observe to where battery first matters]*

## Part 4 — Connect and secure the mobile link — *physical realities: out-of-band bootstrap/MDM gate + roaming Wi-Fi/MQTT*

> **⛔ Hard prerequisite — the bootstrap/MDM gate.** The reader is **not MQTT-reachable** until it is bootstrapped with **123RFID Desktop** (over Bluetooth or USB-C), which sets the regulatory region and Wi-Fi and creates the **MDM endpoint** — and that MDM endpoint is **active**. The **initial** region, Wi-Fi, and broker target **cannot be set over MQTT** (the chicken-and-egg gate — you can't reach the broker until they exist), so the reader cannot be started or verified until this clears; additional Wi-Fi profiles are managed over MQTT via `set_wifi` after bootstrap. The MDM endpoint is the **first** endpoint; every other endpoint (MGMT, MGMT_EVT, CTRL, DATA1, DATA2, and additional MDM/SOTI endpoints) is added remotely through it. This whole Part assumes the gate is cleared in its first section.

*After bootstrap, connectivity is intermittent-by-design — Wi-Fi roam and DHCP churn tear down the TCP socket; under `cleanSession:true` the broker does not replay in-flight reads, so surviving a roam depends on the `reportFilter` aggregation window and app-side retry.*

- **Initial bootstrap and MDM bring-up** — *Out-of-band provisioning, MDM channel activation, and the first firmware update.*
  - `[Tutorial]` ✓ Preparing your network and broker
  - `[Tutorial]` ✓ Bootstrapping the sled and creating the MDM endpoint (the first-light gate)
  - `[Explanation]` ✓ Device state and health *[REFRAMED — moved to precede verification]*
  - `[Tutorial]` ✓ Verifying the MDM connection is live (`get_version` over the MDM channel)
  - `[How-To Guide]` Update firmware and reboot the reader (`set_os` then `reboot`) *(absorbs the merged `quick-start/phase-7` "reboot when needed" step)*
- **Network onboarding and access** — *Wi-Fi profiles, Ethernet and cradle interface, broker ports, and failure diagnosis.*
  - `[Explanation]` ✓ How the reader gets on the network — host Wi-Fi (primary) and cradle Ethernet (`get_eth` + `alerts.ethStatus`)
  - `[How-To Guide]` ✓ Configure Wi-Fi profiles (over MQTT, after bootstrap)
  - `[How-To Guide]` Check Ethernet/cradle interface status
  - `[How-To Guide]` ✓ Open the MQTT broker ports — firewall, proxy, captive-portal (1883/8883) *[NET-NEW]*
  - `[Diagnosis]` When the reader won't get on the network
- **MQTT endpoint topology** — *Endpoint types and evolution from a hybrid MDM endpoint to dedicated channels.*
  - `[Explanation]` ✓ The MDM endpoint and endpoint types — bootstrap, hybrid design, dependency chain *[REFRAMED]*
  - `[Explanation]` ✓ From hybrid MDM endpoint to dedicated channels (MGMT / CTRL / DATA) *[REFRAMED]*
  - `[Tutorial]` ✓ Inspecting the endpoints the MDM channel created (`get_endpoint_config`)
  - `[Tutorial]` ✓ Adding dedicated endpoints through the MDM channel (`config_endpoint`)
  - `[How-To Guide]` Configure MQTT endpoints
  - `[How-To Guide]` View the active endpoint configuration
- **Session continuity while roaming** — *Maintaining session and reliability semantics as the reader roams across access points.*
  - `[Explanation]` ✓ The MQTT session on a moving reader — keep-alive, Last Will, roam teardown *[REFRAMED]*
  - `[Explanation]` ✓ The reliability model for connection drops (QoS / persistent session / `reportFilter` window / app retry) *[REFRAMED — relocated from Scale]*
  - `[How-To Guide]` Keep reading across Wi-Fi roams (static IP vs DHCP, keepAlive tuning, reconnect budgets) *[NET-NEW]*
- **Transport security and credentials** — *TLS and certificate model, per-endpoint TLS, and credential management and pinning (certificate install precedes TLS-enable, per §4.5).*
  - `[Explanation]` ✓ The TLS and certificate security model
  - `[How-To Guide]` ✓ Install and manage TLS certificates
  - `[How-To Guide]` ✓ Turn on TLS for an endpoint
  - `[Tutorial]` ✓ Securing the connection with TLS
  - `[How-To Guide]` Set and rotate MQTT credentials, and pin certificates *[NET-NEW]*
  - `[How-To Guide]` Rotate certificates across the fleet

## Part 5 — Configure how the reader reads — *physical realities: manual trigger + single-target density*
*Before pulling the trigger, decide how the radio behaves. Foregrounds the manual-trigger reality (`GPI_EVENT` does **not** fire on this firmware) and prepares for inverted single-target density (RF-power-DOWN, SELECT/post-filters).*

- **Operating mode selection** — *Understand, compare via matrix, then set the chosen operating mode.*
  - `[Explanation]` ✓ How operating modes shape the read (mode profiles) — incl. DENSE_READERS as the mobile interference-mitigation profile
  - `[Reference]` ✓ Operating-mode decision matrix — a **per-profile field table** (each field flagged required/optional per profile) across CYCLE_COUNT / DENSE_READERS / OPTIMAL_BATTERY / BALANCED_PERFORMANCE / ADVANCED, with the **ADVANCED → `advancedConfigurations`** required-object divergence and the schema-present-but-**not-supported** FAST_READ explicitly flagged *[NET-NEW]*
  - `[How-To Guide]` ✓ Configure the operating mode
- **Trigger-driven reads** — *The physical trigger, its power strategy, and start and stop conditions.*
  - `[Explanation]` ✓ How the trigger starts and stops the radio (`radioStartConditions` × `radioStopConditions` IMMEDIATE/PRESSED/RELEASED; a physical pull ≡ an MQTT `control_operation` START; `GPI_EVENT`/`ANTENNA_EVENT` not emitted)
  - `[Explanation]` ✓ Power strategies for trigger-based inventory *[NET-NEW]*
  - `[How-To Guide]` ✓ Compose trigger start and stop conditions *[NET-NEW]*
- **Tag targeting controls** — *Gen2 SELECT-Query mechanics, pre and post-read filtering, and RF power.*
  - `[Explanation]` ✓ How Gen2 SELECT and Query work — EPC masking, sessions, SL flag, `tagPopulation` *[NET-NEW]*
  - `[Explanation]` ✓ Tag filtering before vs after the read
  - `[Explanation]` ✓ How RF power tunes range, rate, and density (`transmitPower`/`dynamicPower`, within regional limits; `rssiFilter` does **not** exist on RFD40/RFD90)
  - `[How-To Guide]` ✓ Configure post-singulation filters
  - `[How-To Guide]` ✓ Scale RF power down to isolate one tag (cross-links the per-region `transmitPower` **min/max envelope** — `minTxPowerSupported`/`maxTxPowerSupported`, Part 10 — never just a ceiling; `dynamicPower` is a boolean toggle, not a bounded value) *[NET-NEW]*

## Part 6 — Read and find tags — *physical realities: single-target density + operator feedback*
*The core operator job: pull the trigger, get tag data, find the one tag in a crowd with immediate feedback. Carries the IOTC-vs-host-SDK boundary: there is **no** `set_beeper`/`set_led`/haptic API on the wire — IOTC supplies the data (`dataEVT.peakRssi`, `accessResults`); the host app drives the cues via the Android SDK / 123RFID Mobile (host-side cue implementation is out of scope here).*

- **First tag read** — *The trigger-driven inventory loop, its model, tutorials, and trigger control.*
  - `[Explanation]` ✓ How a trigger-driven inventory loop works (trigger → `control_operation` START → `radioActivity` INACTIVE→ACTIVE → `dataEVT` stream → stop condition) *[NET-NEW]*
  - `[Tutorial]` ✓ Reading your first tag
  - `[Tutorial]` ✓ Walking through a trigger-driven inventory loop *[NET-NEW]*
  - `[How-To Guide]` ✓ Start and stop reads with the trigger *(consolidates the merged `quick-start/phase-6` start/stop step)*
- **Barcode scanning** — *Scanning via the sled's barcode engine rather than RFID.*
  - `[How-To Guide]` Scan a barcode with the sled (`control_operation` with `controlType: SCANNER`; decoded value in `dataEVT.data.barcodeData[]`, `symbology` enumerating `CODE_39`)
- **Tag data handling** — *Event production, the two channels, payload reference, and field interpretation.*
  - `[Explanation]` ✓ How tag-data events are produced
  - `[Explanation]` ✓ Two data channels (the DATA1 / DATA2 endpoints, each carrying `dataEVT`)
  - `[How-To Guide]` ✓ Interpret the fields in a tag read
  - `[How-To Guide]` ✓ Process tag data in your application
  - `[Reference]` ✓ The `dataEVT` tag-read payload — a task page that **cross-links the canonical schema home** (Part 10 *Data interface: `dataEVT`*); fields are defined once there, never redefined here
- **Tag write and lock** — *Write, lock, and kill operations with paired tutorial and safety guidance.*
  - `[Tutorial]` Writing and locking your first tag *[NET-NEW]*
  - `[How-To Guide]` Write, lock, and kill tags safely (`lockAction` PERMANENT_LOCK is irreversible; KILL is permanent; outcomes in `dataEVT.accessResults[]`) *[NET-NEW]*
- **Single-tag locate** — *Proximity Geiger workflow, locate-loop tutorials, isolation, and RSSI-driven guidance.*
  - `[Explanation]` ✓ The proximity (Geiger) locate model — `peakRssi` as a proximity proxy (not exact distance), SELECT to a target EPC, no native locate; geofencing/proximity-zone triggering is **not** an IOTC feature *[NET-NEW]*
  - `[Tutorial]` ✓ Building a find-one-tag locate loop *[NET-NEW]*
  - `[Tutorial]` Isolating a target tag with SELECT and post-filters *[NET-NEW]*
  - `[How-To Guide]` ✓ Drive the locate loop from live RSSI *[NET-NEW]*
- **Operator feedback** — *Driving operator-facing feedback from the IOTC data path and dataEVT consumption.*
  - `[Explanation]` ✓ The IOTC data path and where it stops (the host-SDK boundary) — IOTC supplies `dataEVT.peakRssi`/`accessResults`; there is no `set_beeper`/`set_led` on the wire *[NET-NEW]*
  - `[How-To Guide]` ✓ Consume `dataEVT` to drive operator feedback (the cue implementation itself is host-SDK — out of scope) *[NET-NEW]*

## Part 7 — Observe and monitor
*Proactive watching once the reader is reading — distinct from mid-incident troubleshooting (Part 9) and from reading tags (Part 6). On a mobile reader, observability means correlating roam/heartbeat/`NETWORK_EVENT` signals, because Wi-Fi RSSI is not on the MQTT surface.*

- **Event model and types** — *What the IOTC event model is, its type catalog, and event selection.*
  - `[Explanation]` The IOTC event model
  - `[Reference]` Event types catalog
  - `[How-To Guide]` Choose which events the reader emits
- **Liveness and connection signals** — *Heartbeats, alerts, connection state and events, and connection quality on a moving device.*
  - `[Explanation]` Heartbeats: the reader's pulse
  - `[Explanation]` Alerts: when the reader interrupts you
  - `[Explanation]` Connection state and events (`mqttConnEVT`)
  - `[Explanation]` Connection quality on a moving device (correlate `mqttConnEVT` transitions, heartbeat gaps, and `NETWORK_EVENT` IP/DHCP churn) *[NET-NEW]*
- **Monitoring tasks** — *Checking device and reader health, connection quality, and fleet dashboards.*
  - `[How-To Guide]` Check device status and health (incl. `get_status.ntp`; NTP is host-supplied/out-of-band, not settable over MQTT)
  - `[How-To Guide]` Monitor reader health — CPU, RAM, flash, temperature, exceptions *[NET-NEW]*
  - `[How-To Guide]` Monitor connection quality
  - `[How-To Guide]` Build a fleet health dashboard

## Part 8 — Scale to a fleet
*Turn one working reader into a managed fleet — an operational discipline that follows single-device mastery. Also the home of the deep battery duty-cycle engineering deferred from Part 3 (per the progressive-disclosure pointers, §4.2).*

- **Fleet provisioning** — *Conceptual framing, tutorial, and per-tool and automation methods for initial provisioning.*
  - `[Explanation]` From one reader to a managed fleet (provisioning models)
  - `[Tutorial]` Provisioning a three-reader fleet
  - `[How-To Guide]` Bulk-provision with 123RFID Desktop
  - `[How-To Guide]` Zero-touch provision with SOTI Connect
  - `[How-To Guide]` Automate provisioning workflows
- **Configuration consistency** — *The fleet-wide sync model and detecting and fixing configuration drift.*
  - `[Explanation]` How fleet configuration stays in sync
  - `[How-To Guide]` Detect and fix configuration drift
- **Migration to IOTC** — *What carries over, planning, phased rollout, settings transfer, and verification for a 123RFID Desktop–managed fleet.*
  - `[Explanation]` What carries over to IOTC — which 123RFID Desktop settings transfer; region/Wi-Fi/first-MDM-endpoint are set out-of-band, never over MQTT *[NET-NEW]*
  - `[How-To Guide]` Plan the move to IOTC
  - `[How-To Guide]` Execute a phased rollout to IOTC
  - `[How-To Guide]` Carry 123RFID Desktop settings into IOTC
  - `[How-To Guide]` Verify the IOTC rollout succeeded
- **Fleet battery and duty cycle** — *Duty-cycle tuning, firmware rollout under battery limits, and battery aging and replacement (deferred from Part 3).*
  - `[How-To Guide]` Tune fleet duty cycle for battery life *[NET-NEW]*
  - `[How-To Guide]` Roll out firmware across a battery-limited fleet (mixed-charge cohorts past the `set_os` code 14 gate) *[NET-NEW]*
  - `[How-To Guide]` Manage battery aging and replacement (GOOD→AVERAGE→POOR thresholds) *[NET-NEW]*
- **Capacity and density** — *Network and message capacity planning and managing sled density in overlapping zones.*
  - `[How-To Guide]` Plan bandwidth and message capacity for a fleet *[NET-NEW]*
  - `[How-To Guide]` Deploy multiple sleds in overlapping zones — RF co-location (DENSE_READERS, post-filter, app-side dedup) *[NET-NEW]*
- **Cloud integration** — *Architecture patterns, preparation, and per-platform cloud connection how-tos.*
  - `[Explanation]` Cloud integration architecture patterns
  - `[How-To Guide]` Prepare for cloud integration
  - `[How-To Guide]` Connect to AWS IoT Core
  - `[How-To Guide]` Connect to Azure IoT Hub
  - `[How-To Guide]` Connect to Google Cloud IoT
  - `[How-To Guide]` Connect to a custom MQTT broker
- **Decommissioning and retirement** — *What persists versus is erased, factory reset, and credential revocation; the lifecycle terminus.*
  - `[Explanation]` What persists vs is erased on decommission — region/Wi-Fi/the MDM endpoint are set out-of-band and must be re-bootstrapped to redeploy (cross-links the Part 4 gate and the Part 3 power model) *[NET-NEW]*
  - `[How-To Guide]` Decommission and factory-reset a sled — revoke credentials/certificates over MQTT, then wipe out-of-band via 123RFID Desktop *[NET-NEW]*
  - `[How-To Guide]` Revoke and rotate credentials on decommission (cross-links *Rotate certificates across the fleet* and *Set and rotate MQTT credentials*, Part 4) *[NET-NEW]*

## Part 9 — Diagnose and recover
*The reactive, symptom-first surface entered mid-incident — **symptom-ordered, not concept-ordered**, and never persona-gated so it is reachable fast from anywhere. Sequenced near the end because diagnosis presupposes you know what "working" looks like.*

- **Triage and fault isolation** — *Symptom-first entry point and the model for locating where failures originate.*
  - `[Diagnosis]` Something's broken? Start here (the top-level symptom router)
  - `[Diagnosis]` Handheld-only failures: roam, pairing, battery, trigger, feedback *[NET-NEW]*
  - `[Explanation]` Where things fail — the fault-isolation model (Wi-Fi link vs MQTT/broker session vs application)
- **Failure modes and recovery** — *Common failure modes, restore playbooks, and the firmware-update recovery path.*
  - `[Diagnosis]` Diagnose common failure modes
  - `[How-To Guide]` Get back online with recovery playbooks
  - `[How-To Guide]` Recover from a failed firmware update (`set_os` codes 8/13/14) *[NET-NEW]*
- **Application errors and misconceptions** — *Developer errors from wrong IOTC assumptions and handling command errors in code.*
  - `[Explanation]` ✓ Things people get wrong about IOTC — no `set_beeper`/`set_led`; `GPI_EVENT`/`ANTENNA_EVENT` not emitted; "proximity" is RSSI-as-distance-proxy only; SOTI-only config commands are not on the native surface. **Links to the canonical constraints fence** (Part 10); see §5.3 *[REFRAMED]*
  - `[Diagnosis]` Diagnosing a fixed-reader assumption that won't port *[NET-NEW]*
  - `[How-To Guide]` Handle command errors in your code

## Part 10 — Reference library
*The terminal lookup surface — **consulted, not read linearly** — reachable directly from the persona router by an API Consumer who skips every other Part. The command reference is **four sibling sections** (MQTT API foundations, Management commands, Control commands, Data and event references). Placed last because reference is destination, not journey.*

- **MQTT API foundations** — *The command index and the common command-response envelope shared by all commands.*
  - `[Reference]` MQTT API reference index
  - `[Reference]` The MQTT command/response envelope — the `requestId` field that **correlates** each response to its originating command (echoed back in the response), the per-endpoint response topic, and the `response.code`/`response.description` status fields *[NET-NEW]*
- **Management commands** — *Device status, network, endpoints, certificates, system operations, and events.*
  - `[Reference]` Device status commands
  - `[Reference]` Network configuration commands
  - `[Reference]` Endpoint configuration commands
  - `[Reference]` Certificate commands
  - `[Reference]` System operations commands
  - `[Reference]` Event configuration commands
- **Control commands** — *Operating mode, tag filtering, inventory control, and access read, write, lock, kill.*
  - `[Reference]` Operating-mode command
  - `[Reference]` Tag-filtering commands
  - `[Reference]` Inventory-control command
  - `[Reference]` Access commands: read, write, lock, kill *[NET-NEW]*
- **Data and event references** — *The dataEVT interface, event schemas, tag-metadata config, and channel registry.*
  - `[Reference]` ✓ Data interface: `dataEVT` — **the single canonical schema home** for the tag-read payload (Part 6's *The `dataEVT` tag-read payload* cross-links here; the field schema is defined once, here)
  - `[Reference]` Full event schemas
  - `[Reference]` Tag-metadata configuration (`tagMetaDataToEnable`) *[NET-NEW]*
  - `[Reference]` Event-to-channel registry — the single canonical owner of the event→topic mapping: every event type (`dataEVT`, `heartbeatEVT`, `mqttConnEVT`, `alerts`, `exceptionEVT`) mapped 1:1 to its carrying topic and endpoint (e.g. `dataEVT`→DATA1/DATA2, management events→MGMT_EVT), cross-linking each event's own schema leaf; version-pinned, every field carrying the §4.3 Name·Type·Required·Unit/Enum contract *[NET-NEW]*
- **Compatibility and parity matrices** — *Endpoint-channel parity and the firmware, API-version, and reader-model grid.*
  - `[Reference]` Endpoint/channel parity grid — MDM / MGMT / MGMT_EVT / CTRL / DATA1 / DATA2 × {connection & auth, TLS/cert, payload-topic mapping, QoS/delivery, worked MQTT example}; the channel set is derived from the OpenAPI contract (`gen2x-openapi-spec`), so no transport is invented and none the spec does not expose is documented as live *[NET-NEW]*
  - `[Reference]` Firmware / API-version / reader-model matrix — every firmware build ↔ IOTC API/feature version ↔ reader model (RFD40 Premium-class & RFD90 IOTC-capable; RFD40 Standard not IOTC-capable); the canonical owner of the version binding that §8 Currency pins claims to *[NET-NEW]*
- **Handheld field references** — *MDM and SOTI, power and battery, trigger, health thresholds, and QoS-per-topic tables.*
  - `[Reference]` MDM and SOTI interfaces — the SOTI-only `get_config`/`set_config`/`alert_short` are out of scope (named exclusions only)
  - `[Reference]` ✓ **Power and battery field reference (canonical)** — the **three** distinct power/health surfaces, two of which share the name `stateOfHealth`; see §9.2 for the canonical definition *[NET-NEW]*
  - `[Reference]` Trigger-composition matrix — each `radioStartConditions` × `radioStopConditions` × threshold → behaviour + exact `set_operating_mode` payload *[NET-NEW]*
  - `[Reference]` Health events and thresholds (`config_events`) *[NET-NEW]*
  - `[Reference]` QoS-per-topic quick table *[NET-NEW]*
  - `[Reference]` ✓ **Handheld constraints and not-supported features (canonical fence)** — the single consultable checklist; see §5.3 *[NET-NEW]*
- **Error references** — *Error-response format and the command error-code catalog.*
  - `[Reference]` Error response format
  - `[Reference]` Command error codes — an **enumerated, contract-complete** table: every code in the OpenAPI `x-error-codes` extension (incl. `set_os` code 14), each row linking to its Diagnosis symptom entry (Part 9)
- **Quick references and lookups** — *Glossary, topic quick reference, the OpenAPI spec, the tag-memory map, and hardware specs.*
  - `[Reference]` Glossary, limits, and cheat sheets
  - `[Reference]` MQTT topic quick reference
  - `[Reference]` OpenAPI specification (`gen2x-openapi-spec`) — the machine-readable contract for the native-MQTT command/response API (the `x-error-codes` extension is the source of the error-code catalog) *[NET-NEW]*
  - `[Reference]` Tag memory map and access-command reference *[NET-NEW]*
  - `[Reference]` Hardware specifications quick reference *[NET-NEW]*
- **Standards and version history** — *Regulatory and tag standards, plus firmware and documentation history.*
  - `[Reference]` Regulatory and regional reference — the per-region `currentRegion` payload: the channel/frequency set (`channelData`, `frequencyHopping`), the `regulatoryStandard`, `lbtEnabled`, and the **min and max** transmit power (`minTxPowerSupported`/`maxTxPowerSupported`, never just a ceiling); `get_current_region` is read-only and region is set out-of-band at bootstrap
  - `[Reference]` Supported tag types and standards
  - `[Reference]` Firmware version history
  - `[Reference]` Manual changelog *[NET-NEW]*
- **Frequently asked questions** — *Entries grouped by general, connectivity, compatibility, RFID operations, and fleet topics.*
  - `[Reference]` FAQ: general
  - `[Reference]` FAQ: connectivity & network
  - `[Reference]` FAQ: compatibility
  - `[Reference]` FAQ: RFID operations
  - `[Reference]` FAQ: fleet management

---

# 4. Information design principles

Seven principles govern every page. Each rule is stated **once** here and referenced elsewhere — never restated per Part.

## 4.1 Modularity (single canonical source)
Each page is a self-contained unit addressing one job at one Diátaxis altitude, safe to land on cold from search or a deep link; it states its own prerequisites and links forward/back rather than embedding dependencies inline. **No content duplication:** when the same fact would appear in two places, **one page is the canonical source** and every other mention is a cross-reference link to it. (The constraints fence and the `stateOfHealth` definition are the load-bearing examples — see §5.3 and §9.2.) Each page carries its own *last-updated* date for per-page versioning.

## 4.2 Progressive disclosure
The first read never carries depth the reader has not earned. Enforced with explicit **"when you are ready" forward-pointers**: the power model is introduced at Part 3 only as far as a first shift needs (OPTIMAL_BATTERY, stop-between-scans), while deep duty-cycle engineering, scan-window optimization, and battery-aware firmware rollout are deferred to Part 8. Onboarding is never blocked by tuning; tuning is never orphaned from the stage that needs it.

## 4.3 Visual hierarchy & scannability
| Element | Rule |
|---|---|
| Headings | Maximum three levels per page (H1 page title, H2 section, H3 sub-section). No H4 or deeper. |
| Page strip | Every page opens with a strip: **badge · audience · applies-to · read-time** (the `applies_to` reader-model value is governed by §4.6). |
| Parameter / field tables | Every field in a table with columns **Name · Type · Required · Unit/Enum · Description · Default · Example** — the same contract for command request/response payloads and for event payloads. Never in prose. |
| Payloads | In fenced JSON blocks, 2-space indent, lower-camelCase fields matching the schema. |
| Standard callouts | Four: **Note** (info), **Tip** (advice), **Warning** (pitfall), **Important** (critical requirement). |
| Product callouts | Four, each tied to a real footgun: **⛔ Prerequisite/gate** (a step assumes an active MDM endpoint), **⚡ Power/Battery** (an action has a battery cost), **🔌 IOTC-vs-host-SDK boundary** (the wire stops, the host app begins), **🚫 Not-on-handheld / out-of-scope** (an inert fixed-reader vestige or an out-of-scope command). |

## 4.4 Task orientation
Pages are titled and structured around what the reader is trying to *do* — *"Find one tag in a crowd," "Keep reading across Wi-Fi roams," "Pair, re-pair, and confirm the host link."* Decision aids are first-class lookup objects: the **operating-mode decision matrix**, the **trigger-composition matrix**, and the **QoS-per-topic table**. The single deliberate exception is the Part-10 command reference, organized by the **machinery** (MGMT/CTRL/DATA) because reference is consulted against the API's own shape, not read as a task.

## 4.5 Consistency & convention (the ordering rule — stated once)
Within every Part, **leaves are ordered by dependency and task-sequence first**: a prerequisite, a must-consult decision aid, or an earlier doing-step always precedes what needs it. The Diátaxis **mode-order — Explanation → Tutorial → How-To → Reference — is only the default tie-breaker** applied where dependency and task-sequence leave a free choice. Consequently a How-To may precede a Tutorial (install certificates before enabling TLS) and a Reference may precede a How-To (consult the catalog before choosing). **Diagnosis is exempt** (symptom-first; §2). Terminology is pinned to one canonical form per concept (an operator-initiated START is always distinguished from the inert threshold-driven START; "proximity" always means RSSI-as-distance-*proxy*). The recognizable benchmark Part names (Understand, Observe, Scale, Diagnose, Reference) are preserved for cross-product parity.

## 4.6 Reader-model applicability (closed-vocabulary tagging)
Every page declares which reader families it applies to via a machine-readable front-matter **`applies_to`** key drawn from a **closed vocabulary** — `{RFD40-Premium, RFD40-Premium-Plus, RFD90, all-IOTC-capable}` — surfaced in the §4.3 page strip. Capability divergence is never left implicit: the **RFD40 Standard variant is not IOTC-capable** and is the explicit excluded value, and any model-gated feature (Wi-Fi, IOTC endpoints, SOTI-over-Ethernet) carries an `applies_to` that excludes it. The closed vocabulary and the not-capable exclusion are owned **once** — here, in the canonical fence (§5.3), and in the firmware/reader-model matrix (Part 10); every other page tags, it does not re-argue scope. The tag is asserted mechanically (§8 Consistency): an out-of-vocabulary value, a missing tag, or a Wi-Fi/endpoint/IOTC-feature page whose `applies_to` includes RFD40-Standard is a build failure. The `all-IOTC-capable` value is permitted **only** where RFD40 Premium-class and RFD90 genuinely do not diverge; any page carrying model-divergent values (e.g. RF transmit-power, antenna count) must name the specific models (`RFD40-Premium`/`RFD40-Premium-Plus`/`RFD90`) rather than fall back to the convenience value — a §8 lint flags model-divergent pages tagged `all-IOTC-capable`.

## 4.7 Section naming (the section-name blueprint)
Sections are the middle navigational tier (Part → section → leaf; earlier drafts called these clusters). A section bundles mixed-badge leaves at once, so — unlike a Diátaxis leaf title — it is **never** an imperative, gerund-as-action, bare-article phrase, clause, or question. Every section name is a **sentence-case noun phrase** naming the shared object, machinery, signal class, or lifecycle sub-stage its leaves orbit. This is the one form that scans neutrally above a Reference table, a How-To, and an Explanation alike.
- **Form** — noun phrase headed by a thing or an activity-nominalization (selection, onboarding, provisioning, handling, recovery, references); a coordinate *X and Y* phrase is allowed, with at most one "and".
- **Length** — 2–5 words (target 2–3); drop articles ("The trigger" → "Trigger-driven reads"), possessives ("Your hardware and its first-light tool" → "Hardware and bootstrap tooling"), and time-window framings ("Your first 30 minutes" → "Guided first read").
- **Casing** — sentence case; capitalize only the first word and proper nouns/established acronyms (MQTT, MDM, MGMT, CTRL, TLS, RFID, IOTC, OpenAPI, Gen2, Wi-Fi, QoS, SOTI).
- **Punctuation** — no terminal period, colon, dash, slash, question mark, or parentheses in the name; spell out "and" (never "&"); strip acronym glosses ("Management (MGMT) commands" → "Management commands").
- **Parallelism** — all sibling sections within one Part share the noun-phrase shape and a similar length band; never mix an imperative or clause sibling among noun-phrase siblings.
- **Relation** — never repeat the parent Part's verb or core noun, and never duplicate a contained leaf's title; use a superordinate term ("The event model" leaf → section "Event model and types").
- **No sequence numbers** — order is conveyed by leaf sequence, not by the label.
- **Descriptor** — each section may carry one optional, ≤12-word italic descriptor on the same line (`**Name** — *descriptor*`); every scope-narrowing fragment that would otherwise be smuggled into a name via a colon, dash, or long list goes there instead. Short, self-evident sections (Conventions and support; Power and battery) may omit it.

---

# 5. Navigation model & cross-reference strategy

## 5.1 Navigation mechanisms
- **The lifecycle spine** — the default walkable path; a strict prerequisite chain, so a top-to-bottom reader always stands on earned ground.
- **The Part-1 persona router** — a device layered *on* the spine; gets non-linear readers to their entry Part in ≤2 steps (New Integrator → walk 1–6; Solution Builder → 4–8; API Consumer → Part 10; Returning Dev → Part 2 do-not-port + Part 8 adoption).
- **The Tutorials hub** (Part 1) — the consolidated guided-learning landing: 30-minute onboarding → first trigger pull → read your first tag → find-one-tag → provision a fleet, as one sequence regardless of which Parts the tutorials physically live in.
- **Per-page furniture** — breadcrumbs (Part > Page), a right-rail table of contents, the badge/audience/read-time strip, and a **"Related" box** linking complementary-quadrant pages.
- **Search** — accepts both command/field names (`set_operating_mode`, `peakRssi`, `set_os`, `config_endpoint`) and natural-language symptoms ("reads stop when I walk between aisles", "no beep on a good read", "can't connect after unboxing").

## 5.2 Mandated cross-reference patterns
Applied to every applicable page (FIXED-style mandate):

| From (badge) | To (badge) | Link-label pattern |
|---|---|---|
| Explanation | How-To | "How to: [task] →" |
| Explanation | Reference | "Reference: [field/command] →" |
| Tutorial step | Reference | "API Reference: [command] →" inline where first used |
| How-To | Reference | "Reference: [command/schema] →" |
| Reference | Tutorial / How-To | "Common tasks: [task] →" at the top |
| Diagnosis | How-To / Reference | "Recovery: [playbook] →" and "Fix details: [reference] →" |
| Error code | Diagnosis | each code links to its symptom entry |
| **Any constraint / vestige mention** | **Constraints fence (Part 10)** | **"See: Handheld constraints (canonical) →"** |
| Reference (MGMT/CTRL command) | Command/response envelope (Part 10) | "Correlation: `requestId` + response topic →" |

**Concept → recipe → reference triads.** Each Explanation links forward to the How-To that applies it and the Reference that pins its fields. Example: *trigger composition* (Explanation, Part 5) → *Compose trigger start/stop conditions* (How-To, Part 5) → *Trigger-composition matrix* (Reference, Part 10).

## 5.3 The single canonical fence (reachability without duplication)
The handheld manual has cross-cutting footguns (fixed-reader assumptions that silently fail; not-supported features; out-of-scope commands). These are stated in **exactly one canonical place — the *Handheld constraints and not-supported features* reference in Part 10** — which holds the complete checklist:

> `GPI_EVENT`/`ANTENNA_EVENT` not emitted · no `rssiFilter` · no `set_region`/`set_ntp` over MQTT · single antenna · no on-reader apps · MQTT-only transport (no REST/WebSocket) · no `set_beeper`/`set_led` (host-SDK) · RFD40 Standard not IOTC-capable · host SDKs out of scope · SOTI-only `get_config`/`set_config`/`alert_short` out of scope.

To give the three personas who need it **defense-in-depth reachability without three drifting copies**, the **Part 2 *Do-not-port orientation*** (for the Returning Developer building the mental model) and the **Part 9 *Things people get wrong about IOTC*** (for any reader mid-incident) each carry a short framing and a **link to the canonical fence** — they do not maintain their own constraint lists. There is one list; it changes in one place.

## 5.4 Content dependency map
Arrows are *prerequisite* edges. The **bootstrap/MDM gate is the single most load-bearing edge**: everything in **Parts 4–10** is unreachable until it clears.

```
Orient (P1)
 → Understand the handheld system (P2): the five physical realities + the seven endpoint types
   → Pair & Power Up (P3)            [Bluetooth host-tether + battery first matter here]
       (no network path exists until the sled is paired & charged)
     → ⛔ BOOTSTRAP / MDM-ENDPOINT GATE
         123RFID Desktop (Bluetooth or USB-C) sets region + Wi-Fi + creates the MDM endpoint.
         Region / Wi-Fi / broker CANNOT be set over MQTT — the reader is not MQTT-reachable,
         and cannot be started or verified, until this clears.
       → Connect & Secure (P4)        [roaming Wi-Fi/MQTT first matters here]
           (verify via the MDM channel → add MGMT/CTRL/DATA THROUGH the MDM endpoint;
            certificate-install → TLS-enable: the hard cert-before-TLS edge)
         → Configure the Read (P5)     [manual trigger + density first matter here]
           → Read & Find (P6)          [density + operator feedback first matter here]
             → Observe & Monitor (P7)
             → Scale to a Fleet (P8)    [deep battery duty-cycle engineering lands here]
               → Retire & Decommission (P8 terminus)  [revoke credentials → factory-reset/wipe → re-bootstrap to redeploy]

 The asset lifecycle is a closed spine with no dead-end stage:
   Provision (single-device: the P3–P4 bootstrap/MDM spine; fleet: P8) → Operate (P5–P7) → Update (P4 `set_os`+`reboot` / P8 fleet rollout / P9 failure-recovery) → Decommission (P8 terminus).

 Diagnose (P9)   — symptom-first, reachable from anywhere, never gated (sequenced late)
 Reference (P10) — consulted, not read; entered out of order at any point
```

---

# 6. Format specifications & page templates

Each badge has one committed template.

- **Reference template** — page strip → one-line summary → topic + direction (publish/subscribe) → request payload (JSON schema + parameter table) → response/event payload → status/error codes → worked MQTT example (topic + request + expected response) → "Related" box. Every field table — whether a command request/response or an event payload — uses the §4.3 column contract (Name · Type · Required · Unit/Enum · Description · Default · Example).
- **Tutorial template** — end-state promise → prerequisites → time estimate → numbered steps, each with a verifiable result, **ending at a physical-world checkpoint** → the complete worked artifact → recap → **"Didn't work?"** escape hatch linking to the relevant Diagnosis page.
- **How-To template** — goal → prerequisites → ordered steps with exact payloads → verify → response/error codes, surfacing the **⚡ power cost** and the **🔌 host-SDK boundary** where they apply.
- **Diagnosis template** — symptom statement → fast triage / fault-isolation → ranked likely causes → fix steps → success check, linking to the canonical Reference for fix details.

**Code-example standards.** Because the interface is native MQTT, **cURL is not applicable** — every wire example is an **MQTT payload in canonical JSON** over its named topic, and shows all three of: the **topic**, the **request payload**, and the **expected response payload or error code** (e.g. the `set_os` code 14 battery gate). Server-side/middleware integration may be shown in **Python**; host-app on-device cue code (Android `Vibrator`/`AudioManager`, the Zebra RFID host SDK) is **out of scope** and is referred to the Android RFID SDK / 123RFID Mobile docs. Every multi-step example includes a **reconnect-on-roam** pattern (catch the socket teardown a Wi-Fi handoff causes under `cleanSession:true`, reconnect, resubscribe, resume from the live `dataEVT` stream). Placeholders use the canonical convention: `{sled_serial}`, `{tenant_id}`, `{broker_host}`, `{endpoint_name}` — never live values.

---

# 7. Implementation priorities

Three phases. **✓ in the TOC marks every Phase-1 (MVD) leaf**, and the Phase-1 set below is defined by exactly those marks.

## 7.1 Phase 1 — Minimum Viable Documentation (the walkable first-read spine)
**Goal:** a New Integrator clears the bootstrap/MDM gate and reaches a live, *found* tag with the correct mental model, and the load-bearing footguns are already fenced. The ✓-marked set is:
- **All of Parts 1–3** (orient → understand the frame and the endpoint model → pair, power up, and survive the battery gate; the Part 2 *Do-not-port orientation* ships here).
- **Part 4** — the first-light/bootstrap cluster, the get-on-the-network core, the endpoint inspect-and-add cluster, the reliability reframe, and the secure-core (cert-install before TLS-enable). *(Deferred: fleet credential/cert rotation.)*
- **Part 5** — the operating-mode, trigger, and targeting (SELECT / filtering / RF-power-DOWN) clusters.
- **Part 6** — the read-first, tag-data, find-one-tag, and operator-feedback clusters. *(Deferred: barcode, write/lock/kill.)*
- **Three safety-rail references, shipped early despite living in later Parts** because they prevent silent failure for any reader who deep-links: the Part 9 *Things people get wrong about IOTC* page, the Part 10 *Handheld constraints* canonical fence, and the Part 10 *Power and battery field reference*.

Pulling those three references into Phase 1 does **not** violate the strict-prerequisite-chain claim: that claim governs **reading order** (conceptual dependency), while phasing governs **shipping order**, and per §4.1 the fence and field-reference pages are self-contained and safe to land on cold.

## 7.2 Phase 2 — Full coverage
Part 7 (Observe & Monitor) in full; Part 8 (Scale) — provisioning, drift, the IOTC-adoption cluster, cloud integration; Part 9 (Diagnose) in full; the remaining Part 4–6 leaves (barcode, write/lock/kill, credential/cert rotation); the deep battery duty-cycle engineering deferred from Part 3; the **Retire & Decommission** cluster (Part 8); and the **per-operating-mode field tables** (Part 5).

## 7.3 Phase 3 — Advanced & polish
The complete Part 10 command reference (MGMT/CTRL/Data-events), full event schemas, the trigger-composition and health-threshold matrices, the **command/response correlation envelope**, the **event-to-channel registry**, the **endpoint/channel parity grid**, the **firmware ↔ API ↔ reader-model matrix**, the **enumerated command-error catalog**, the FAQs, the appendices and lookups, and a cross-reference / "Related"-box completeness pass across all ten Parts.

---

# 8. Quality evaluation framework

Six attributes. Each method is **mechanically executable or falsifiable** and anchored to a machine contract — the **OpenAPI specification** (`gen2x-openapi-spec.yaml`) that describes the native-MQTT command/response API. (The transport is genuinely MQTT publish/subscribe, **not** REST — see *The OpenAPI illusion* in Part 1 — but the contract artifact itself is OpenAPI, with `x-error-codes` carrying the error catalog.)

| Attribute | What it asks | Executable measurement method |
|---|---|---|
| **Accuracy** | Does every claim, payload, field, and enum match RFD40/90 firmware — not the FX-series schema or the SOTI surface? | **Validate every payload example against the OpenAPI schema** (`gen2x-openapi-spec.yaml`, machine diff). Lint that the canonical scope line holds wherever touched (Ethernet via cradle, no `set_beeper`/`set_led`, no `rssiFilter`, `GPI_EVENT`/`ANTENNA_EVENT` present-but-not-emitted). Assert the SOTI-only commands appear **only** as named exclusions, and the three `stateOfHealth`/charge surfaces are never conflated (§9.2). |
| **Completeness** | Is every inventory page and net-new surface present, and does each physical reality land where it bites? | **Inventory diff** against the ledger (§9.1): every legacy page placed once; the 2 merges named; the 56 net-new present. **OpenAPI command-coverage diff**: every command/event in the spec has a Reference page. Confirm each reality lands in Parts 3–6 and the gate appears in Parts 2 & 4 + the dependency map. **Lifecycle-stage check**: all four stages — Provision/Operate/Update/Decommission — resolve to ≥1 leaf and forward-link (no dead-end stage). **Reader-model coverage**: every page carries an `applies_to` value from the §4.6 closed vocabulary. |
| **Clarity** | Can a reader at the page's stated audience act unaided, and are the gate and host-SDK boundary unmistakable? | **Usability test:** a new developer completes the 30-minute onboarding + read-first-tag unassisted; **time-to-first-found-tag** measured. **Binary failure:** any page that could lead a reader to (a) send a command that does not exist (`set_beeper`/SOTI trap) or (b) act before the MDM endpoint is up. **Callout-presence lint** for the ⛔/⚡/🔌 boxes. |
| **Findability** | Can each persona reach home in ≤2 steps, and can a reader mid-incident route from symptom to fix fast? | **Navigation test:** trace each of the four router paths (≤2 steps). **Symptom-routing test:** each handheld failure mode reachable by natural-language search. **Link-resolution check:** every Title→Source row (§10) and every cross-reference resolves to a real page. |
| **Currency** | Does content track current firmware, V1.1, and the live MQTT schema, with no fixed-reader carryover? | Pin every version-sensitive claim to the firmware-history reference and the V1.1 page. **Schema-contradiction scan** against the OpenAPI spec; **vestige audit** for fixed-reader carryover (in-band bootstrap, portal/conveyor/GPIO/multi-antenna, REST/WebSocket) that must be fenced, not documented as live. Doc update is a required step in the firmware release checklist. |
| **Consistency** | One shape per Part, pinned terminology, coherent numbering? | **Automated lint + assertions:** within-Part order obeys §4.5; the ordering rule appears once; declared counts reconcile (4 personas, 5 content types, 6 quality attributes, **exactly 10 Parts**); **numbering check fails on any reference to a Part > 10**; the constraints fence exists in exactly one canonical place (no divergent copies); the three power/health surfaces are stated consistently. Additional v3 guardrails, each falsifiable: every page's `applies_to` is a member of the §4.6 closed vocabulary and **no** Wi-Fi/endpoint/IOTC-feature page includes RFD40-Standard; the regulatory table states **both a min and a max** `transmitPower` per region (zero bare inline power values); the **endpoint/channel parity grid** exposes the identical **named** sub-sections {connection & auth, TLS/cert, payload-topic mapping, QoS/delivery, worked example} across MDM/MGMT/MGMT_EVT/CTRL/DATA1/DATA2 (set-identity per channel, not merely equal count); the **event-to-channel registry** maps every event type 1:1 to a topic with per-field type/required/unit; the **firmware ↔ API ↔ reader-model matrix** resolves every (build, model) pair to exactly one API-version cell; the **command/response envelope** names the `requestId` correlation field; and the **command-error catalog is enumerated** and equals the OpenAPI `x-error-codes` set (zero orphans/uncovered); every event schema (notably `dataEVT`) has exactly **one** canonical home leaf with all other mentions cross-linking it (count==1); and the regulatory table states the per-region channel/frequency set and `transmitPower` **min and max** (`minTxPowerSupported`/`maxTxPowerSupported`). |

---

# 9. Completeness & provenance

## 9.1 Completeness ledger
All **120** pages from the current inventory (`sidebars.ts`) are accounted for: **118 placed as discrete leaves** above and **2 deliberately merged** with named sinks —
- `quick-start/phase-6` (legacy "Start and stop inventory") → **Part 6**, *Start and stop reads with the trigger.*
- `quick-start/phase-7` (legacy "Reboot when needed") → **Part 4**, *Update firmware and reboot the reader.*

No inventory page is invented or dropped. **56 net-new pages** (`*[NET-NEW]*`) are added where the analysis demands them — concentrated in the largest gaps (Bluetooth pairing, power/battery, operator feedback, find-one-tag) and the v3 conformance additions (the Retire & Decommission lifecycle cluster, the event-to-channel registry, the endpoint/channel parity grid, the firmware↔API↔reader-model matrix, and the command/response envelope) — **plus one net-new navigation section**, the *Which reading path fits you* persona router, which is hosted on the existing *How this manual is organized* page (`foundations/documentation-guide`) rather than being a discrete page. That single shared host is why a naïve leaf count reads one higher than the placed-inventory count until this note reconciles it: **118 placed + 56 net-new pages + 1 net-new section = 175 leaves**, and `foundations/documentation-guide` appears on two rows of §10.

## 9.2 Canonical definition — the three power/health surfaces (do not conflate)
There are **three distinct surfaces**, **two of which literally share the name `stateOfHealth`**. They are defined **here, once**, and referenced (never re-described) elsewhere:

| Surface | Meaning | Values |
|---|---|---|
| `get_status.batteryStatus.stateOfHealth` | Long-term **capacity** | `GOOD` / `AVERAGE` / `POOR` |
| `heartbeatEVT.batteryAlert.status` | Operational **charge state** | `LOW` / `CRITICAL` / `CHARGING` / `FULL` / `HIGH` |
| `heartbeatEVT.batteryAlert.stateOfHealth` | The **same operational charge scale** (NOT capacity) | `LOW` / `CRITICAL` / `CHARGING` / `FULL` / `HIGH` |

The *Power and battery field reference* (Part 10) is the canonical home; the glossary carries a one-line "do-not-conflate" pointer to it.

## 9.3 Single-canonical constraints
The do-not-port / not-supported / out-of-scope constraint set lives in exactly one canonical place (§5.3, Part 10) and is reached from Parts 2 and 9 by link. The SOTI-only commands `get_config`, `set_config`, and `alert_short` appear **only** as named exclusions (interface-model concept, MDM/SOTI reference, misconceptions page, constraints fence). Likewise, the bootstrap/MDM-gate rule has a single canonical home — the **Part 4 ⛔ prerequisite block** — and its mentions in Parts 2 and 8 and the §5.4 dependency map are short framings that point to it, not independent re-derivations of the rule.

## 9.4 Blueprint altitude and the IA↔content boundary
This is a structural plan — **no content generation** (see the header). Every reference artifact it introduces — the firmware↔API↔reader-model matrix, the per-operating-mode field tables, the event-to-channel registry's per-field rows, the enumerated command-error catalog, the per-channel parity examples, and each command's request/response schema — is **named, given exactly one canonical owner, and made falsifiable by a §8 check**, but is deliberately **not instantiated** here: populating those tables, matrices, and payloads is content production (Phase 3 and the live docs) against the OpenAPI contract, not information architecture. The IA's job is to guarantee each artifact has a single home and a mechanical conformance test; filling it is the writer's job. Consequently, conformance clauses that require an *instantiated* artifact (spec bijection against the populated contract, parsed example payloads, enumerated code tables, populated matrix cells) are satisfied at this altitude by the **canonical-owner + falsifiable-method** standard and reach full instantiation only when the content is authored — a deliberate scope boundary, not an omission.

---

# 10. Appendix — Title → Source-page mapping

Titles are renamed for this IA, so every leaf maps to its source page id (under `docs/…`), or is marked **NET-NEW** / **merged**, preserving IA→page traceability. Rows are grouped by Part and ordered as in §3.

### Part 1 — Orient
| New title | Source page | Badge |
|---|---|---|
| Start here: what handheld IOTC lets you build | `foundations/start` | Explanation |
| How this manual is organized | `foundations/documentation-guide` | Explanation |
| Which reading path fits you (persona router) | *(NET-NEW section on `foundations/documentation-guide`)* | Explanation |
| MQTT in five minutes | `foundations/mqtt-primer` | Explanation |
| RFID in five minutes | `foundations/rfid-primer` | Explanation |
| This manual and the MQTT API Reference | `foundations/docs-and-api-reference` | Explanation |
| The OpenAPI illusion: it's native MQTT, not REST | `foundations/native-mqtt-vs-openapi` | Explanation |
| Documentation conventions and code-example standards | *(NET-NEW)* | Reference |
| Related documents and support | *(NET-NEW)* | Reference |
| The Tutorials hub | `tutorials` | Explanation |

### Part 2 — Understand
| New title | Source page | Badge |
|---|---|---|
| What the IoT Connector does | `foundations/about-iotc` | Explanation |
| What's new in IOTC V1.1 | `foundations/v1-1-features` | Explanation |
| How the radio reads a tag | `foundations/rfid-air-interface` | Explanation |
| Tag memory and the Gen2 model | *(NET-NEW)* | Explanation |
| Topic structure: tenant / topic / serial | `foundations/mqtt/topic-hierarchy` | Explanation |
| QoS levels and delivery guarantees | `foundations/mqtt/qos` | Explanation |
| Authentication and authorization over MQTT | `foundations/mqtt/auth-model` | Explanation |
| The three actors: reader, broker, application | `foundations/actors` | Explanation |
| How commands, responses, and events flow | `foundations/communication-flow` | Explanation |
| The interface model and the seven endpoint types | `foundations/architecture/interface-model` | Explanation |
| End-to-end: from a trigger pull to your application | `foundations/architecture/end-to-end` | Explanation |
| Your sled and host hardware | `foundations/hardware-tiers` | Explanation |
| Why out-of-band bootstrap is required | `foundations/bootstrap-tools` | Explanation |
| 123RFID Mobile: the Android companion app | `foundations/mobile-app` | Explanation |
| The five physical realities of a handheld sled | `foundations/architecture/handheld-considerations` | Explanation |
| Do-not-port orientation (links to canonical fence) | *(NET-NEW)* | Reference |

### Part 3 — Pair and power up
| New title | Source page | Badge |
|---|---|---|
| Hardware and software you need | `quick-start/prerequisites/requirements` | Reference |
| Get your IOTC credentials and tenant ID | `quick-start/prerequisites/credentials` | How-To Guide |
| Reaching your first live read | `quick-start/overview` | Tutorial |
| The Bluetooth host link | *(NET-NEW)* | Explanation |
| Pair, re-pair, and confirm the host link | *(NET-NEW)* | How-To Guide |
| The handheld power model | *(NET-NEW)* | Explanation |
| Charge the sled and clear the battery gate | *(NET-NEW)* | How-To Guide |
| Make the battery last a shift | *(NET-NEW)* | How-To Guide |
| Monitor battery charge and long-term health | `observability/monitoring/battery` | How-To Guide |

### Part 4 — Connect and secure
| New title | Source page | Badge |
|---|---|---|
| Preparing your network and broker | `quick-start/phase-1` | Tutorial |
| Bootstrapping the sled and creating the MDM endpoint | `quick-start/phase-2` | Tutorial |
| Device state and health | `infrastructure/device-state` | Explanation |
| Verifying the MDM connection is live | `quick-start/phase-3` | Tutorial |
| Update firmware and reboot the reader | `infrastructure/system-operations` (+ merged `quick-start/phase-7`) | How-To Guide |
| How the reader gets on the network | `infrastructure/network/architecture` | Explanation |
| Configure Wi-Fi profiles | `infrastructure/network/wifi` | How-To Guide |
| Check Ethernet/cradle interface status | `infrastructure/network/ethernet` | How-To Guide |
| Open the MQTT broker ports | *(NET-NEW)* | How-To Guide |
| When the reader won't get on the network | `infrastructure/network/troubleshooting` | Diagnosis |
| The MDM endpoint and endpoint types | `infrastructure/mqtt-endpoints` | Explanation |
| From hybrid MDM endpoint to dedicated channels | `infrastructure/multi-endpoint` | Explanation |
| Inspecting the endpoints the MDM channel created | `quick-start/phase-4` | Tutorial |
| Adding dedicated endpoints through the MDM channel | `quick-start/phase-5` | Tutorial |
| Configure MQTT endpoints | `infrastructure/configure-endpoints` | How-To Guide |
| View the active endpoint configuration | `infrastructure/view-endpoints` | How-To Guide |
| The MQTT session on a moving reader | `foundations/mqtt/connection-lifecycle` | Explanation |
| The reliability model for connection drops | `fleet/retention-and-retry` | Explanation |
| Keep reading across Wi-Fi roams | *(NET-NEW)* | How-To Guide |
| The TLS and certificate security model | `infrastructure/tls-and-certificates` | Explanation |
| Install and manage TLS certificates | `infrastructure/certificate-management` | How-To Guide |
| Turn on TLS for an endpoint | `infrastructure/tls-setup` | How-To Guide |
| Securing the connection with TLS | `quick-start/phase-8` | Tutorial |
| Set and rotate MQTT credentials, and pin certificates | *(NET-NEW)* | How-To Guide |
| Rotate certificates across the fleet | `infrastructure/certificate-rotation` | How-To Guide |

### Part 5 — Configure how it reads
| New title | Source page | Badge |
|---|---|---|
| How operating modes shape the read | `rfid/operating-mode-profiles` | Explanation |
| Operating-mode decision matrix | *(NET-NEW)* | Reference |
| Configure the operating mode | `rfid/operating-mode/configure` | How-To Guide |
| How the trigger starts and stops the radio | `rfid/operating-mode/trigger-composition` | Explanation |
| Power strategies for trigger-based inventory | *(NET-NEW)* | Explanation |
| Compose trigger start and stop conditions | *(NET-NEW)* | How-To Guide |
| How Gen2 SELECT and Query work | *(NET-NEW)* | Explanation |
| Tag filtering before vs after the read | `rfid/post-filters` | Explanation |
| How RF power tunes range, rate, and density | `rfid/performance-tuning` | Explanation |
| Configure post-singulation filters | `rfid/operating-mode/post-filters-configure` | How-To Guide |
| Scale RF power down to isolate one tag | *(NET-NEW)* | How-To Guide |

### Part 6 — Read and find
| New title | Source page | Badge |
|---|---|---|
| How a trigger-driven inventory loop works | *(NET-NEW)* | Explanation |
| Reading your first tag | `tutorials/read-your-first-tag` | Tutorial |
| Walking through a trigger-driven inventory loop | *(NET-NEW)* | Tutorial |
| Start and stop reads with the trigger | `rfid/start-stop-inventory` (+ merged `quick-start/phase-6`) | How-To Guide |
| Scan a barcode with the sled | `rfid/barcode` | How-To Guide |
| How tag-data events are produced | `rfid/tag-data/architecture` | Explanation |
| Two data channels | `rfid/tag-data/dual-channels` | Explanation |
| Interpret the fields in a tag read | `rfid/tag-data/interpret` | How-To Guide |
| Process tag data in your application | `rfid/tag-data/process` | How-To Guide |
| The `dataEVT` tag-read payload | `rfid/dataevt-schema` | Reference |
| Writing and locking your first tag | *(NET-NEW)* | Tutorial |
| Write, lock, and kill tags safely | *(NET-NEW)* | How-To Guide |
| The proximity (Geiger) locate model | *(NET-NEW)* | Explanation |
| Building a find-one-tag locate loop | *(NET-NEW)* | Tutorial |
| Isolating a target tag with SELECT and post-filters | *(NET-NEW)* | Tutorial |
| Drive the locate loop from live RSSI | *(NET-NEW)* | How-To Guide |
| The IOTC data path and where it stops | *(NET-NEW)* | Explanation |
| Consume `dataEVT` to drive operator feedback | *(NET-NEW)* | How-To Guide |

### Part 7 — Observe and monitor
| New title | Source page | Badge |
|---|---|---|
| The IOTC event model | `observability/events/model` | Explanation |
| Event types catalog | `observability/events/catalog` | Reference |
| Choose which events the reader emits | `observability/configure-events` | How-To Guide |
| Heartbeats: the reader's pulse | `observability/heartbeat` | Explanation |
| Alerts: when the reader interrupts you | `observability/alerts` | Explanation |
| Connection state and events | `observability/mqtt-connection` | Explanation |
| Connection quality on a moving device | *(NET-NEW)* | Explanation |
| Check device status and health | `observability/monitoring/device-health` | How-To Guide |
| Monitor reader health | *(NET-NEW)* | How-To Guide |
| Monitor connection quality | `observability/monitoring/connection-quality` | How-To Guide |
| Build a fleet health dashboard | `observability/monitoring/fleet-dashboard` | How-To Guide |

### Part 8 — Scale to a fleet
| New title | Source page | Badge |
|---|---|---|
| From one reader to a managed fleet | `fleet/provisioning-models` | Explanation |
| Provisioning a three-reader fleet | `fleet/provision-fleet` | Tutorial |
| Bulk-provision with 123RFID Desktop | `fleet/provisioning/bulk-123rfid` | How-To Guide |
| Zero-touch provision with SOTI Connect | `fleet/provisioning/soti-connect` | How-To Guide |
| Automate provisioning workflows | `fleet/provisioning/automation` | How-To Guide |
| How fleet configuration stays in sync | `fleet/bulk-management` | Explanation |
| Detect and fix configuration drift | `fleet/management/drift` | How-To Guide |
| What carries over to IOTC | *(NET-NEW)* | Explanation |
| Plan the move to IOTC | `fleet/migration/plan` | How-To Guide |
| Execute a phased rollout to IOTC | `fleet/migration/execute` | How-To Guide |
| Carry 123RFID Desktop settings into IOTC | `fleet/migration/from-123rfid-desktop` | How-To Guide |
| Verify the IOTC rollout succeeded | `fleet/migration/verify` | How-To Guide |
| Tune fleet duty cycle for battery life | *(NET-NEW)* | How-To Guide |
| Roll out firmware across a battery-limited fleet | *(NET-NEW)* | How-To Guide |
| Manage battery aging and replacement | *(NET-NEW)* | How-To Guide |
| Plan bandwidth and message capacity for a fleet | *(NET-NEW)* | How-To Guide |
| Deploy multiple sleds in overlapping zones | *(NET-NEW)* | How-To Guide |
| Cloud integration architecture patterns | `fleet/cloud-integration/patterns` | Explanation |
| Prepare for cloud integration | `fleet/cloud-integration/prerequisites` | How-To Guide |
| Connect to AWS IoT Core | `fleet/cloud-integration/aws` | How-To Guide |
| Connect to Azure IoT Hub | `fleet/cloud-integration/azure` | How-To Guide |
| Connect to Google Cloud IoT | `fleet/cloud-integration/gcp` | How-To Guide |
| Connect to a custom MQTT broker | `fleet/cloud-integration/custom-broker` | How-To Guide |
| What persists vs is erased on decommission | *(NET-NEW)* | Explanation |
| Decommission and factory-reset a sled | *(NET-NEW)* | How-To Guide |
| Revoke and rotate credentials on decommission | *(NET-NEW)* | How-To Guide |

### Part 9 — Diagnose and recover
| New title | Source page | Badge |
|---|---|---|
| Something's broken? Start here | `diagnose/symptoms` | Diagnosis |
| Handheld-only failures: roam, pairing, battery, trigger, feedback | *(NET-NEW)* | Diagnosis |
| Where things fail | `diagnose/where-things-fail` | Explanation |
| Diagnose common failure modes | `diagnose/failure-modes` | Diagnosis |
| Get back online with recovery playbooks | `diagnose/recovery-playbooks` | How-To Guide |
| Recover from a failed firmware update | *(NET-NEW)* | How-To Guide |
| Things people get wrong about IOTC (links to canonical fence) | `diagnose/misconceptions` | Explanation |
| Diagnosing a fixed-reader assumption that won't port | *(NET-NEW)* | Diagnosis |
| Handle command errors in your code | `diagnose/handle-errors` | How-To Guide |

### Part 10 — Reference library
| New title | Source page | Badge |
|---|---|---|
| MQTT API reference index | `reference/api-overview` | Reference |
| The MQTT command/response envelope (requestId correlation) | *(NET-NEW)* | Reference |
| Device status commands | `reference/mgmt/device-status` | Reference |
| Network configuration commands | `reference/mgmt/network` | Reference |
| Endpoint configuration commands | `reference/mgmt/endpoint` | Reference |
| Certificate commands | `reference/mgmt/certificates` | Reference |
| System operations commands | `reference/mgmt/system-operations` | Reference |
| Event configuration commands | `reference/mgmt/event-configuration` | Reference |
| Operating-mode command | `reference/ctrl/operating-mode` | Reference |
| Tag-filtering commands | `reference/ctrl/tag-filtering` | Reference |
| Inventory-control command | `reference/ctrl/inventory-control` | Reference |
| Access commands: read, write, lock, kill | *(NET-NEW)* | Reference |
| Data interface: `dataEVT` | `reference/data/tag-data-event` | Reference |
| Full event schemas | `reference/events/all-events` | Reference |
| Tag-metadata configuration | *(NET-NEW)* | Reference |
| Event-to-channel registry | *(NET-NEW)* | Reference |
| Endpoint/channel parity grid | *(NET-NEW)* | Reference |
| Firmware / API-version / reader-model matrix | *(NET-NEW)* | Reference |
| MDM and SOTI interfaces | `reference/mdm/about` | Reference |
| Power and battery field reference (canonical) | *(NET-NEW)* | Reference |
| Trigger-composition matrix | *(NET-NEW)* | Reference |
| Health events and thresholds | *(NET-NEW)* | Reference |
| QoS-per-topic quick table | *(NET-NEW)* | Reference |
| Handheld constraints and not-supported features (canonical fence) | *(NET-NEW)* | Reference |
| Error response format | `reference/errors/format` | Reference |
| Command error codes | `reference/errors/codes` | Reference |
| Glossary, limits, and cheat sheets | `reference/glossary` | Reference |
| MQTT topic quick reference | `reference/appendices/topic-quick-reference` | Reference |
| OpenAPI specification (gen2x-openapi-spec) | *(NET-NEW)* | Reference |
| Tag memory map and access-command reference | *(NET-NEW)* | Reference |
| Hardware specifications quick reference | *(NET-NEW)* | Reference |
| Regulatory and regional reference (per-region min & max transmitPower) | `reference/appendices/regulatory` | Reference |
| Supported tag types and standards | `reference/appendices/tag-standards` | Reference |
| Firmware version history | `reference/appendices/firmware-history` | Reference |
| Manual changelog | *(NET-NEW)* | Reference |
| FAQ: general | `reference/faq/general` | Reference |
| FAQ: connectivity and network | `reference/faq/connectivity` | Reference |
| FAQ: compatibility | `reference/faq/compatibility` | Reference |
| FAQ: RFID operations | `reference/faq/rfid` | Reference |
| FAQ: fleet management | `reference/faq/fleet` | Reference |

---

**END OF BLUEPRINT** — This document defines the structural plan only. Content production should follow the templates, conventions, and priorities specified herein.
