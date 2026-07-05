# Documentation Workspace Meta-Guide

> **Project:** Zebra Handheld RFID Reader — IoT Connector (IOTC) developer documentation
> **Docusaurus site:** `zhr/` · serves `https://al1913-zebra.github.io/zebra-handheld-rfid-iotc/`
> **This folder:** `zhr/_meta/` — the non-shipping governance, knowledge, and brand workspace beside the published site.
> **Last updated:** 2026-06-06 · **Audience:** future Claude / AI sessions and human writers.

This file is the **onboarding guide** for anyone (especially an AI assistant) helping author the docs. Read it first. It tells you what governs the docs, what the product actually is, and which file to open for a given task.

## The one hard rule

**Docusaurus only compiles `zhr/docs/`.** Everything in `_meta/` is *source, rules, and reference material* — it is **never built, routed, or published**. The leading underscore keeps it out of any glob; it also sits outside the configured `docs.path` (`./docs`) so the build never touches it. Do not move authored `.md` from `_meta/` into `docs/` expecting it to "just work" — the published docs follow strict naming, IA, and link rules (below), and the build runs with `onBrokenLinks: 'throw'`.

---

## ⚠️ Critical accuracy warning — two different product families live here

The knowledge base mixes **two distinct Zebra RFID product lines**. Conflating them is the single biggest source of factual errors. Always confirm which one a source describes before you trust it.

| Aspect | **Handheld** (this project) | **Fixed / FX-series** (adjacent, *not* this project) |
| --- | --- | --- |
| Models | **RFD40, RFD90** (RFD9030 / RFD9090) reader **sleds** | FX9600, FX7500, ATR7000, **FXR90** fixed readers |
| Form factor | Sled attached to a host/mobile device | Fixed-mount infrastructure reader |
| IOTC interface | **MQTT only** (no REST, no on-reader app layer) | MQTT **and** REST / HTTP-Post |
| Operating modes | **Profile-based** (`CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE`, `ADVANCED`) | Mode-based (simple / inventory / conveyor / portal) |

**Known fixed-reader material in this workspace (do NOT use for handheld facts):**

- `knowledge-base/product/reference/handheld-rfid-iotc-master-docset/rfid-iot-connector.md` — an FX9600/FX7500/ATR7000 training-session transcript.
- `knowledge-base/product/reference/handheld-rfid-iotc-master-docset/connect-fixed-readers-to-*.md` — fixed-reader endpoint guides.

When in doubt, the authoritative handheld sources are: the live site (`zhr/docs/`, `zhr/sidebars.ts`), `knowledge-base/product/reference/handheld-rfid-iotc-mqtt-api-reference/`, and the `tag_descriptions/` capability list.

---

## Repository Directory Map

Every directory and authored document is annotated below. Machine-generated schema collections (JSON/YAML) are annotated at the directory level with file counts rather than listing each blob, to keep the map readable; the `.md` API **operation** files are listed in full. The `research-library/` is **git-ignored** (local only) and shown at folder level with counts. **Snapshot (2026-06-06):** 883 files across 106 directories — 336 of them in the git-ignored `research-library/`.

```text
_meta/
├── README.md                                   ← THIS onboarding guide
│
├── governance/                                 RULES that govern the docs (read before writing/naming)
│   ├── site-rulebooks/                          Site-specific naming & structure rulebooks (formerly zhr/brain/)
│   │   ├── URL-NAMING.md                         URL slug rules: lowercase kebab, ≤3 segments, H1-derived, no stop/filler words; renames need a 301
│   │   ├── TITLE-NAMING.md                       title: front-matter: sentence case, 30–60 chars, " | " separator, canonical product name
│   │   ├── META-DESCRIPTION.md                   description: front-matter: 120–160 chars, active voice, 5 templates by Diátaxis type
│   │   ├── 404-PAGE.md                           404 UX styleguide: 7 sections, real HTTP 404, noindex, search-first recovery
│   │   ├── D2-MIGRATION.md                       Mermaid→D2 history + live D2 fence/theme conventions (-t=0 --dark-theme=200)
│   │   └── ORPHAN-PAGES-AUDIT.md                 Sidebar reachability policy (intentional deep-reference vs accidental orphan)
│   ├── style-guide/
│   │   └── zebra-style-guide.md                  Zebra editorial style (doc P1086622-001 Rev. A): voice, terminology, formatting
│   ├── audits/                                   Empty scaffold (.gitkeep) — reserved for future documentation audits
│   ├── ia-blueprints/                            IA blueprints & navigation artifacts (.gitkeep scaffold retained)
│   │   └── DOCUMENTATION_TOC.md                  Generated unified TOC of every docs/ page — sidebar-ordered, per-page H1–H3 outline, anchor links into each source file
│   └── policy/                                   Empty scaffold (.gitkeep) — reserved for future policy docs
│
├── brand/                                      Brand assets (formerly top-level style-guide/) — for reference, not the docs build
│   ├── logos/
│   │   ├── Black/
│   │   │   ├── CMYK Logos Rich Black/
│   │   │   │   ├── Primary_Horizontal/ZebraLogo_Horizontal_CMYK.eps
│   │   │   │   └── Stacked/ZebraLogo_Stacked_CMYK.eps
│   │   │   └── RGB Logos Black/
│   │   │       ├── Primary_Horizontal/zebra-logo-horizontal-rgb.{eps,png,svg}
│   │   │       └── Stacked/zebra-logo-stacked-rgb.{eps,png,svg}
│   │   └── White/
│   │       ├── Primary_Horizontal/zebra-logo-white-horizontal.{eps,png,svg}
│   │       └── Stacked/zebra-logo-white-stacked.{eps,png,svg}
│   └── fonts/
│       ├── ZebraMono/   zebra-mono-extrabold.otf · zebra-mono-medium.otf
│       └── ZebraSans/   zebrasans-{bold,boldit,cnd-extra-bold,italic,regular}.otf
│
└── knowledge-base/                             SOURCE & research material (NOT published) — drafting input only
    ├── product/                                 Authored product knowledge, Diátaxis-organized
    │   ├── explanation/                          Understanding-oriented (concepts + portfolio/spec context) — 9 files
    │   │   ├── 123rfid-desktop-fact-sheet.md     case-study-lowes.md            soti-connect-flyer.md
    │   │   ├── use-case-hospitality.md           use-case-rfd40-retail.md
    │   │   ├── zebra-rfid-portfolio-brochure.md  zebra-rfid-portfolio-messaging.md
    │   │   ├── zebra-rfid-readers-flyer.md        zebra-rfid-strategy-and-solutions.md
    │   │   └── zebra-handheld-sleds-hardware-platform/   ← HANDHELD hardware source-of-truth
    │   │       ├── iot-setup-user-guide.md
    │   │       ├── rfd40-spec-sheet.md            rfd40-premium-series-spec-sheet.md   rfd40-m-premium-plus-spec-sheet.md
    │   │       ├── rfd40-prg-en.md                rfd40-qsg-en.md                       rfd40-standard-guide-accessory.md
    │   │       ├── rfd40-uhf-rfid-standard-sled-zebra.md
    │   │       ├── rfd40series-premium-prg-en.md  rfd40series-premium-qsg-en.md
    │   │       ├── rfd90 ultra-rugged uhf rfid sled.md   rfd90-spec-sheet.md
    │   │       └── rfd90-ultra-rugged-uhf-rfid-sleds-zebra.md
    │   │
    │   ├── how-to/                                Task-oriented guides
    │   │   ├── connect-a-reader-with-123rfid-desktop.md
    │   │   ├── migrate-from-123rfid-desktop-to-iotc.md
    │   │   └── windows-rfid-reader-and-pos-integration.md
    │   │
    │   ├── tutorials/                             Learning-oriented walkthroughs
    │   │   ├── 123rfid-desktop-getting-started.md
    │   │   ├── 123rfid-mobile-app-getting-started.md
    │   │   ├── rfd40-rfd90-first-mqtt-connection.md   ← canonical "first MQTT connection" handheld tutorial
    │   │   └── zebra-handheld-rfid-iotc-deployment-guide/
    │   │       ├── zebra_iotc_deployment_guide.md · zebra-handheld-rfid-iotc-deployment-guide.docx
    │   │       └── config_endpoint.md · control_operation.md · get_endpoint_config.md · get_version.md · reboot.md
    │   │
    │   └── reference/                             Information-oriented (⚠ MIXED handheld + fixed-reader — see warning above)
    │       ├── 123rfid-desktop-feature-reference.md      123rfid-mobile-app-reference.md
    │       ├── mdm-and-soti-interfaces.md                reader-health-monitoring-and-gen2x.md
    │       ├── release-notes-123rfid-desktop-3-0-0-63.md
    │       │
    │       ├── handheld-rfid-iotc-mqtt-api-reference/    ★ CANONICAL handheld MQTT API (24 operation docs)
    │       │   ├── Commands:  config_endpoint · get_endpoint_config · control_operation · set_operating_mode ·
    │       │   │              get_operating_mode · set_post_filter · get_post_filter · set_wifi · get_wifi ·
    │       │   │              delete_wifi_profile · get_eth · get_current_region · install_certificate ·
    │       │   │              delete_certificate · get_installed_certificate · get_status · get_version ·
    │       │   │              set_os · config_events · reboot
    │       │   └── Events:    dataevt · heartbeatevt · mqttconnevt · alerts
    │       │
    │       ├── handheld-rfid-iotc-api-schema-and-docs-technical-writer/   OpenAPI/schema toolchain (technical-writer copy)
    │       │   ├── README.md · info_description.md · error_codes.json · tag_config.json · requirements.txt · .gitignore
    │       │   ├── .vscode/                         (2 JSON editor settings)
    │       │   ├── operation_descriptions/          27 ×.md — long-form prose per API operation
    │       │   ├── tag_descriptions/                14 ×.md — API capability groups (see glossary "Endpoint capability tags")
    │       │   ├── exported_tags/                   15 ×.json — generated tag metadata
    │       │   ├── deployment_guide/                9 ×.md — README, api-reference-index, architecture, phase1–5, prerequisites
    │       │   ├── docs/                            FX90.yaml · openapi_md.json · index.html · fx90-download.html ·
    │       │   │                                    2 ×.pptx (strategy/usability decks) · assets/zebra-logo.jpg · css/*
    │       │   ├── schemas/                         README.md + JSON/YAML request/response schemas:
    │       │   │   ├── commands/control (5 json) · commands/dev_mgmt (17 json)
    │       │   │   ├── events (5 json) · models (6 json) · css (1)
    │       │   │   ├── response/control (5 json) · response/dev_mgmt (24 json)
    │       │   │   └── refrence/{events (23), payload (32), response (23)} (yaml)   [sic: "refrence"]
    │       │   └── scripts/                         7 ×.py — OpenAPI tag extraction, doc-strategy PPT gen, local serve, assistant setup
    │       │
    │       ├── handheld-rfid-iotc-api-schema-and-docs-zebra-official/     Official OpenAPI source (mirror of the above, fewer prose files)
    │       │   ├── README.md · openapi.json · example_description.json · index.html
    │       │   ├── .github/workflows/main.yml       CI for the API-reference site
    │       │   ├── commands/{control (5), dev_mgmt (17)} (json) · events (5) · models (6)
    │       │   ├── response/{control (5), dev_mgmt (24)} (json)
    │       │   ├── refrence/{events (23), payload (32), response (23)} (yaml)
    │       │   └── documentation/scripts/           add_custom_css.py · generate_openapi.py
    │       │
    │       └── handheld-rfid-iotc-master-docset/    Official Zebra IoTC docset (⚠ mixes handheld + FIXED-reader pages)
    │           ├── HANDHELD/shared concept pages:   what-is-iot-connector-…md · controlling-operating-mode-…md ·
    │           │                                    controlling-gpios-and-led-…md · access-operations-…md ·
    │           │                                    advanced-settings-…md · antenna-port-settings-…md ·
    │           │                                    certificate-management-…md · configuration-of-management-events-…md ·
    │           │                                    trigger-settings-…md · save-config-…md · appendix-…md
    │           ├── Schema/format stubs:             operating-modes-schema-…md · raw-mqtt-payload-schemas-…md ·
    │           │                                    tag-data-events-format-…md · health-events-format-…md
    │           ├── Fact sheets / FAQ / updates:     iot-connector-rfid-fact-sheet.md · iot-connector-scan-fact-sheet.md ·
    │           │                                    zebra-iot-connector-faqs-…md · zebra-rfid-iot-connector-documentation-updates.md ·
    │           │                                    zebra-rfid-iot-connector-getting-started-guide.md · welcome-to-…md · resources-…md ·
    │           │                                    customer-facing-zebra-iotconnector-alex-lavie.md (customer overview deck/notes)
    │           ├── Master content/TOC artifacts:    zebra-handheld-rfid-iotc-content.md (≈257 KB full dump) ·
    │           │                                    zebra-handheld-rfid-iotc-toc.md · -toc-outline.md · -conceptual-toc.md
    │           ├── Data-analytics / deployment:     packaging-and-deployment-…md · nodejs-da-application-…md ·
    │           │                                    python-da-application-…md · overview-of-data-analytics-…md ·
    │           │                                    user-applications-…md · real-time-data-with-iotc-software.md ·
    │           │                                    local-deployment-rest-api-guide-…md · configure-http-file-server-for-set-os-…md ·
    │           │                                    batching-and-retention-guide-…md
    │           ├── Migration guides:                fxconnect-to-iot-connector-migration-guide-…md ·
    │           │                                    rfid-api-3-to-iot-connector-migration-guide-…md
    │           ├── ⚠ FIXED-reader content:          rfid-iot-connector.md (FX training transcript) ·
    │           │                                    connect-fixed-readers-to-{aws-iot-core,azure-iot-hub,http-post,mqtt-broker,
    │           │                                    tcpip-endpoint}-…md · connect-fixed-readers-{using-web-socket,to-key-board-emulation}-…md ·
    │           │                                    communication-network-settings-…md · gpo-(general-purpose-output)-programming-…md
    │           └── introduction-zebra-iot-connector-documentation(-(2)…-(23)).md   23 near-duplicate intro variants (low value)
    │
    └── research-library/                        ⚠ GIT-IGNORED · ~80 MB third-party RFID/IoT research (local only; do not commit/publish)
        ├── rfid-applications-and-case-studies/   (125 files — incl. "Designing and Deploying RFID Applications", IntechOpen chapters)
        ├── rfid-fundamentals-and-hardware/       (117 files — incl. "RFID Field Guide" chapters)
        ├── security-privacy-and-cryptography/    (41 files — incl. bulletproof-tls-guide)
        ├── iot-platforms-and-edge/               (17 files)
        ├── rfid-deployment-and-buyers-guides/    (11 files)
        ├── communication-mqtt-and-networking/    (10 files)
        ├── api-and-web-design/                   (6 files)
        ├── data-and-information-architecture/    (4 files — incl. the Diátaxis documentation-framework reference)
        ├── business-strategy-and-industry/       (4 files — incl. Zebra 2025 Annual Report / Form 10-K and 2026 Proxy Statement)
        └── mental-models-and-reasoning/          (1 file — "The Great Mental Models", Tedford 2020)
```

> **Provenance note:** `site-rulebooks/` was the in-repo `zhr/brain/` (git history preserved). `brand/`, `product/`, and `research-library/` were consolidated from external folders (`style-guide/` and a separate `knowledge/` repo) on 2026-06-06; their pre-consolidation git history was intentionally not carried over. The former `_archive/` of salvaged third-party book/article notes was retired and removed on 2026-06-06 (recoverable from git history). The `[sic: "refrence"]` misspelling exists in the source schema folders — preserve it when referencing those paths.

---

## Handheld RFID Domain Glossary

Definitions reflect **these docs** (handheld RFD40/RFD90), not generic RFID theory.

### Product & hardware

| Term | Meaning |
| --- | --- |
| **IOTC / IoT Connector** | Zebra's in-firmware MQTT control + data plane on the sled. On handhelds it is **MQTT-only** — no REST surface, no on-reader app layer. |
| **RFD40** | Handheld UHF RFID reader sled; tiers: Premium, Premium Plus. |
| **RFD90** | Ultra-rugged handheld sled family: **RFD9030** (standard-range), **RFD9090** (long-range). |
| **Sled** | The handheld RFID reader hardware that clips onto a host/mobile device. |
| **123RFID Desktop** | Zebra PC app to discover, bootstrap, and bulk-provision readers over USB/Bluetooth (used **before** MQTT). |
| **123RFID Mobile** | Mobile counterpart app for on-device setup/testing. |
| **SOTI Connect / 42Gears SureMDM** | Third-party MDM platforms for zero-touch fleet provisioning. |

### MQTT transport

| Term | Meaning |
| --- | --- |
| **MQTT** | Lightweight pub/sub protocol (**v3.1.1**) carrying all IOTC handheld traffic. |
| **Broker** | The MQTT server the reader connects to (port 1883 plain, 8883 TLS/MQTTS). |
| **Topic triad** | Per endpoint: **Command Topic** (reader receives commands), **Response Topic** (reader publishes responses), **Event Topic** (reader publishes events). Defaults `MDM/clients/{cmnd,resp,event}`. |
| **Tenant ID** | Prefix applied to all MQTT topics for a deployment. |
| **QoS** | MQTT delivery-guarantee level (0/1/2). |
| **Retained message** | Broker-stored last message on a topic, delivered to new subscribers. |
| **LWT (Last Will & Testament)** | Message the broker publishes on an ungraceful disconnect. |
| **Keep-alive** | Interval (s) that holds the MQTT connection open (default depends on firmware). |
| **Clean session** | MQTT flag that starts a fresh session each connection. |
| **MQTTS / mutual TLS** | TLS-secured MQTT (8883) using CA cert + client cert + private key. |
| **requestId** | Unique per-command ID echoed in the response for correlation/de-dup. |
| **apiVersion** | IOTC API version on responses/events; values **V1.0 / V1.1**. |

### RFID air interface

| Term | Meaning |
| --- | --- |
| **EPC** | Electronic Product Code — globally unique tag identifier (hex). |
| **TID** | Factory-programmed, immutable tag/chip identifier memory bank. |
| **USER / RESERVED** | User-writable memory bank / bank holding access & kill passwords. |
| **Gen2 / Gen2v2** | EPC UHF Gen2 air-interface spec (memory banks, sessions, Select, Q). |
| **UHF** | Ultra-high-frequency RFID radio link the reader exposes over MQTT. |
| **Tag** | The RFID transponder singulated during inventory. |
| **Antenna** | Selectable radiating element used during inventory. |
| **RSSI** | Received signal strength (dBm) of a read; `peakRssi` in aggregated reads. |
| **Phase / SeenCount / Channel** | Read telemetry: signal phase (°), detection count, RF channel (MHz). |

### IOTC operations

| Term | Meaning |
| --- | --- |
| **Operating mode (profile)** | RF behavior preset: `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE` (default), `ADVANCED` (manual transmitPower/linkProfile/session). |
| **Inventory** | The act of singulating tags; started/stopped via `control_operation` (CTRL). `set_operating_mode` is rejected with **error 11** while inventory runs. |
| **Trigger semantics** | Start/stop conditions `IMMEDIATE` / `PRESSED` / `RELEASED` (the physical trigger button), plus threshold stops (`tagCount`, `stopTimeout`, `inventoryCount`). |
| **Select (pre-filter)** | Gen2 pre-singulation filter by memory pattern (max 32, offset in bits) — screens tags *before* the read. |
| **Post-filter** | Rule (`set_post_filter`) to match/exclude already-read tags by EPC pattern/mask — *after* the read. |
| **Endpoint** | A configured connection target (URL, security, topics). Types: **MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM**. The reader supports two simultaneous data paths (DATA1/DATA2). |
| **Endpoint capability tags** | API capability groups (from `tag_descriptions/`): Alerts, Certificate Management, Device Configuration, Device Health, Device Status, Event Configuration, Inventory Control, MQTT Connectivity, MQTT Endpoint Configuration, Network Configuration, Operating Mode, System Operations, Tag Data Event, Tag Filtering. |

### Asynchronous events

| Term | Meaning |
| --- | --- |
| **dataEVT** | Tag/barcode read events streamed during inventory (EPC/TID/USER, RSSI, phase, etc.). |
| **heartBeatEVT** | Periodic liveness/health pulse (uptime, inventory status, battery). |
| **mqttConnEVT** | Broker CONNECTED/DISCONNECTED event with device identity (`deviceModel` ∈ {RFD40, RFD90}) and `mqttVersion`. |
| **alerts** | Push notification when thresholds cross (battery, temperature, network, firmware). |

### Fleet & reliability

| Term | Meaning |
| --- | --- |
| **Bootstrap** | Initial provisioning of network + endpoints via 123RFID Desktop before MQTT. |
| **Provisioning** | Onboarding readers: single → bulk → MDM-managed. |
| **Fleet** | A managed population of readers (bulk config, drift, migration). |
| **Drift** | Divergence of a reader's config from its intended fleet baseline. |
| **Retention** | Buffering of tag events during outages (default ~150,000 events, replay ~500 TPS). |
| **Batching** | Grouping multiple tag events into one publish to cut bandwidth/CPU. |

> **API at a glance:** 24 operations = **20 commands + 4 events**, across 7 endpoint types. Management & Control are synchronous (command→response); Data and Management-Events are asynchronous (reader pushes).

---

## Content Governance & Style Rules

Hard constraints. When authoring for the published site, obey these; the detailed rulebooks are linked.

### Docusaurus / build rules

- **Only `zhr/docs/` compiles.** `routeBasePath: '/'` (docs served at root); `blog: false`. `_meta/` is never built.
- **Strict link checking:** `onBrokenLinks: 'throw'`, `onBrokenAnchors: 'throw'`, `onBrokenMarkdownLinks: 'warn'`. A bad internal link fails the build.
- **Diagrams = D2, not Mermaid.** Fence with ` ```d2 ` (add `layout=elk` for nested architectures). Theme pins are load-bearing: `defaultD2Opts: ['-t=0', '--dark-theme=200']`. The `d2` CLI must be on `PATH` at build time; generated SVGs are gitignored (`static/d2/`). LR flowcharts need explicit `direction: right`. → `governance/site-rulebooks/D2-MIGRATION.md`
- **URL stability:** published URLs are permanent. A rename requires a 301 in `docusaurus.config.ts` (`plugin-client-redirects`). Deliberately-deleted sections (e.g. former `/sdks/*`) **404 with no redirect** by design. → `ORPHAN-PAGES-AUDIT.md`

### Naming (the "coherent quartet": URL · title · sidebar_label · description)

- **URL:** lowercase kebab-case, ASCII, no extensions; ≤3 path segments; terminal segment derived from the H1 (strip stop/filler words); concept=noun, how-to=verb, tutorial=`<series>/phase-<N>`, reference=object name. No `_`, camelCase, or `introduction/overview/concepts/about` filler segments. → `URL-NAMING.md`
- **Title (`title:`):** sentence case (capitalize only first word + proper nouns/acronyms); 30–60 chars (never >80); separator is a spaced **vertical pipe ` | `** (em/en-dash forbidden in titles); keyword in first 30 chars. Canonical product name = **"Zebra Handheld RFID Reader"** (the truncated "Zebra Handheld RFID" is forbidden in title-shaped fields). → `TITLE-NAMING.md`
- **Meta description (`description:`):** 120–160 chars, active voice, lead with the subject (never "This page…" / "Learn about…"); 2–3 sentences echoing 1–3 title keywords; no markdown/HTML/newlines. → `META-DESCRIPTION.md`
- **404 page:** real HTTP 404, `noindex`, excluded from sitemap & search; search-first recovery; plain tone (no "Oops!", no mascots); accent color never red. → `404-PAGE.md`

### Editorial voice (Zebra style guide P1086622-001)

- **Simple, active, present tense.** Second-person imperative for procedures ("Remove the sled…"); third-person indicative for description. Avoid first person; "Zebra recommends" is allowed.
- **No humor, anthropomorphism, clichés, or marketing buzzwords.** State things positively; negatives go in Notes/Cautions. Drop meaningless modifiers (*actually, simply, easily, seamlessly, successfully*).
- **Terminology do/don't:** *bar code* (not barcode), *handheld* (not hand-held), *email*, *website*, *online*, *use* (not utilize), *can* (not "has the ability to"), *must* (not "need to"). Combine product alpha+numeric with no space ("RFD40", "ZT420"). **Serial (Oxford) comma required.**
- **Acronyms:** spell out on first reference with the acronym in parentheses. **Trademarks:** ®/™ on first occurrence outside a heading; never use marks generically; never all-caps for emphasis.
- **Numbers:** spell zero–nine, numerals for 10+; always numerals with units/measurements/percentages; metric first then Imperial.
- **Formatting:** lists introduced with a colon + parallel construction; menu paths use ` > `; admonition types are **Note / Caution / Warning / Important** (use sparingly, placed before the relevant step); UI buttons/keys in **bold**; links lowercase, prefer HTTPS with trailing slash. → `governance/style-guide/zebra-style-guide.md`

### Diátaxis discipline

The published site is organized by **Diátaxis** — every page is one of **Tutorial** (learning), **How-to** (task), **Reference** (information), or **Explanation** (understanding). Match the page's type to its URL shape, title shape, and description template. The `knowledge-base/product/` source folders use the same four buckets (`explanation/` folds the old "concepts" + "overview").

### Published information architecture (live `sidebars.ts` — canonical, 9 Parts)

1. **Get oriented** — start here, MQTT primer, RFID primer, how docs pair with the API Reference.
2. **Foundations** — what IOTC is, hardware tiers, actors, bootstrap tools, communication flow, native-MQTT-vs-OpenAPI, RFID air interface, + Architecture & MQTT internals.
3. **Quick start** — eight-phase tutorial (sealed box → live `dataEVT` → TLS), Phase 0 prerequisites.
4. **Manage your reader** — device state, network (Wi-Fi/Ethernet), MQTT endpoints, security (TLS & certs), system operations.
5. **Read tags** — operating-mode profiles, configure, trigger composition, start/stop inventory, pre- vs post-filter.
6. **Observe and monitor** — configure events, heartbeat, alerts, MQTT connection, event model/catalog, monitoring how-tos, tag-data.
7. **Scale to a fleet** — provisioning models, bulk management, drift, retention & retry, migration, cloud integration (AWS/Azure/GCP/custom).
8. **Diagnose & recover** — symptom index, failure modes, where-things-fail model, recovery playbooks, misconceptions.
9. **Reference** — API overview, command reference by endpoint, error codes, FAQ, appendices (regulatory, firmware history, tag standards, topic quick reference), glossary.

---

## Quick-Start Instructions for AI Agents

**Start every docs task by (a) reading this file, then (b) opening the right source below.** Then verify against the live site.

### Task → file routing

| If the task is… | Open first (in `_meta/`) |
| --- | --- |
| Naming a page / URL / title / description | `governance/site-rulebooks/URL-NAMING.md`, `TITLE-NAMING.md`, `META-DESCRIPTION.md` |
| Writing or editing prose (voice, terms, formatting) | `governance/style-guide/zebra-style-guide.md` |
| **Conceptual / "explain X"** content | `knowledge-base/product/explanation/` + the live Part 2 docs; for hardware, `…/explanation/zebra-handheld-sleds-hardware-platform/` |
| **API / MQTT** operation or event docs | `knowledge-base/product/reference/handheld-rfid-iotc-mqtt-api-reference/` (canonical); deep prose in `…-api-schema-and-docs-technical-writer/operation_descriptions/`; capability groups in `…/tag_descriptions/` |
| Raw request/response **schemas** | `…-api-schema-and-docs-technical-writer/schemas/` or `…-zebra-official/` (note the `refrence` spelling) |
| **Tutorial / quick-start** | `knowledge-base/product/tutorials/` (esp. `rfd40-rfd90-first-mqtt-connection.md`) |
| **How-to / task** guide | `knowledge-base/product/how-to/` |
| **Fleet / MDM / migration** | `…/reference/mdm-and-soti-interfaces.md`, `…/how-to/migrate-from-123rfid-desktop-to-iotc.md`, master-docset migration guides |
| **Diagrams** | `governance/site-rulebooks/D2-MIGRATION.md` |
| IA / sidebar / orphan / 404 questions | `ORPHAN-PAGES-AUDIT.md`, `404-PAGE.md`, and the live `zhr/sidebars.ts` |
| Brand assets (logos/fonts) | `brand/` |
| Deep background research | `knowledge-base/research-library/` (git-ignored, local) |
| Unified TOC / site map of all docs | `governance/ia-blueprints/DOCUMENTATION_TOC.md` |

### Standing rules for every task

1. **No fabrication.** If a fact isn't in the docs/sources, say so — don't invent specs, defaults, limits, or payloads.
2. **Handheld ≠ fixed reader.** Re-read the warning at the top before using anything from the master-docset, `rfid-iot-connector.md`, or the `connect-fixed-readers-*` pages.
3. **Live site is canonical.** When a source conflicts with `zhr/docs/`, `zhr/sidebars.ts`, or `zhr/docusaurus.config.ts`, the live repo wins. Snapshots (e.g. D2/orphan counts) may be stale.
4. **Respect the quartet.** Any new/edited page needs a coherent URL + title + sidebar_label + description per the rulebooks, and a correct Diátaxis type.
5. **Don't break the build.** Internal links must resolve (strict checking); use D2 fences with the pinned themes; never add routable content under `_meta/`.
