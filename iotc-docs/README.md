# Zebra IoT Connector for Handheld RFID Reader | Documentation

![Docusaurus](https://img.shields.io/badge/Docusaurus-3.10-3ECC5F?logo=docusaurus&logoColor=white)
![Diagrams: D2](https://img.shields.io/badge/diagrams-D2-7C3AED)
![Node](https://img.shields.io/badge/node-%E2%89%A520-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-Proprietary-lightgrey)

> Developer documentation for the **Zebra IoT Connector (IOTC)** on RFD40 and RFD90 handheld RFID reader sleds — the in‑firmware **MQTT 3.1.1** control and data plane. Built with [Docusaurus 3](https://docusaurus.io/) and organised on the [Diátaxis](https://diataxis.fr/) framework (Tutorials · How‑to · Reference · Explanation).

**Live site:** <https://al1913-zebra.github.io/zebra-handheld-rfid-iotc/>

---

## Table of contents

- [Description](#description)
- [Documentation map](#documentation-map)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

---

## Description

The **Zebra IoT Connector (IOTC) for Handheld RFID** is the in‑firmware MQTT control and data plane on Zebra's RFD40 and RFD90 reader sleds. Over a single persistent **MQTT 3.1.1** connection — there is no REST surface and no on‑reader application layer — it lets applications:

- configure readers (network, endpoints, TLS, firmware),
- run RFID inventory and stream tag reads (`dataEVT`),
- observe device health via heartbeats, alerts, and connection events, and
- provision and maintain fleets through 123RFID Desktop, SOTI Connect, or 42Gears SureMDM.

This repository is the source for the **conceptual documentation site** — the guides, tutorials, and explanations that show how the system works and how to integrate with it. The companion **[MQTT API Reference site](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/)** is the authoritative field‑level reference for all **24 operations** (20 commands + 4 events) across the **seven endpoint types** (`MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, `SOTI`, `MDM`); this site links to it from every operation.

**What's inside**

- **120 pages** across **9 Parts**, organised on the Diátaxis framework.
- An **eight‑phase Quick Start** tutorial that takes you from a sealed box to a live tag stream, with inline 123RFID Desktop screenshots.
- **65 architecture diagrams** authored in [D2](https://d2lang.com/) and compiled to SVG at build time.
- A diagnostics suite: a symptom‑first index, **20** catalogued failure modes, **9** recovery playbooks, and **14** documented misconceptions.

**Who it's for**

- **New integrators** writing their first MQTT publisher/subscriber against a sled.
- **Solution builders** architecting multi‑reader deployments (endpoints, profiles, security postures).
- **API consumers** who need exact payload shapes, enums, and error codes.
- **Fleet operators** rolling out and maintaining hundreds-to-thousands of sleds.

**Hardware covered:** RFD40 Premium, RFD40 Premium Plus, and RFD90 (RFD9030 standard‑range and RFD9090 long‑range).

---

## Documentation map

The site is organised into **nine Parts**. Parts 1–3 read top‑down; Parts 4–9 are reference surfaces consulted as needed. Each Part has a generated landing page; the full structure lives in [`sidebars.ts`](sidebars.ts).

| Part | Title | What it covers |
|---|---|---|
| 1 | Get oriented | Where to start, the MQTT primer, pairing the docs with the API Reference |
| 2 | Foundations | What IOTC is, hardware tiers, the actors, bootstrap, the interface model, the "OpenAPI Illusion" |
| 3 | Quick start | An eight‑phase tutorial from network prep to live `dataEVT` |
| 4 | Manage your reader | Device state, network, MQTT endpoints, TLS & certificates, firmware & reboot |
| 5 | Read tags | Operating‑mode profiles, start/stop & triggers, pre‑filter vs post‑filter |
| 6 | Observe and monitor | Event configuration, heartbeats, alerts, connection events, the tag‑data event |
| 7 | Scale to a fleet | Provisioning models, bulk config & drift, reliability under network drops, migration, cloud integration |
| 8 | Diagnose & recover | Symptom index, failure modes, recovery playbooks, misconceptions |
| 9 | Reference | Command reference, error codes, FAQs, appendices, glossary |

---

## Tech stack

| Layer | Choice |
|---|---|
| Site generator | [Docusaurus 3.10](https://docusaurus.io/) (classic preset) |
| Build performance | Docusaurus Faster (Rust‑based bundler) |
| Diagrams | [D2](https://d2lang.com/) via `remark-d2` + the `d2` CLI |
| Styling | SCSS via `docusaurus-plugin-sass` |
| Language | TypeScript |
| UI runtime | React 19 |
| Node runtime | Node.js ≥ 20 |
| CI / hosting | GitHub Actions → GitHub Pages (published from the `gh-pages` branch) |

---

## Installation

### Prerequisites

- **Node.js ≥ 20** and npm.
- **The `d2` CLI (v0.7.1).** Diagrams are authored as inline ` ```d2 ` fences; `remark-d2` spawns the `d2` binary for each one **at build time**, so the build fails without it.

```bash
# Install the d2 CLI (macOS / Linux) — pinned to the version CI uses
curl -fsSL https://d2lang.com/install.sh | sh -s -- --version v0.7.1
d2 --version   # → 0.7.1
```

### Set up the project

```bash
git clone https://github.com/al1913-zebra/zebra-handheld-rfid-iotc.git
cd zebra-handheld-rfid-iotc
npm install
```

---

## Usage

### Local development

```bash
npm start         # dev server with hot reload at http://localhost:3000
npm run build     # production build into ./build (requires the d2 CLI on PATH)
npm run serve     # serve the production build locally
npm run typecheck # TypeScript check, no emit
npm run clear     # clear the Docusaurus cache if a stale build misbehaves
```

> Hot reload covers `docs/`, `src/`, and `static/`. Restart the dev server after editing `docusaurus.config.ts` or `sidebars.ts`. `npm run build` surfaces broken‑link and broken‑anchor warnings that the dev server does not.

### Authoring content

| To change… | Edit… |
|---|---|
| A documentation page | `docs/<part>/…/<page>.md` |
| Sidebar order, grouping, and landing pages | [`sidebars.ts`](sidebars.ts) |
| Site title, navbar, footer, metadata | [`docusaurus.config.ts`](docusaurus.config.ts) |
| Brand palette and layout | `src/css/*.scss` |
| Landing‑page tile icons | `sidebar_custom_props.emoji` (per page) and `customProps.emoji` (per category), rendered by the swizzled `src/theme/DocCard` |
| Logos and screenshots | `static/img/` |

Conventions:

- **Front matter** on every page: `id`, `title`, `sidebar_label`, `description`, `sidebar_custom_props.emoji`.
- **Diagrams** are inline ` ```d2 ` fences compiled to SVG.
- **Voice badges** mark the Diátaxis quadrant: 📗 Tutorial · 📙 How‑to · 📘 Explanation · 📕 Reference.
- **The MQTT API Reference schema is the single source of truth** for field names, enums, and error codes.

### Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which installs dependencies and the `d2` CLI, runs `npm run build`, and publishes `./build` to the `gh-pages` branch via [`peaceiris/actions-gh-pages@v4`](https://github.com/peaceiris/actions-gh-pages). Concurrency is grouped on `pages`, so a newer push cancels an in‑flight run. To host elsewhere, update `url` and `baseUrl` in `docusaurus.config.ts`.

---

## Project structure

```text
zebra-handheld-rfid-iotc/
├── docs/                     # 120 pages across 9 Parts (Diátaxis)
│   ├── foundations/          # Parts 1–2 — orientation, MQTT & RFID primers, architecture, interface model
│   ├── quick-start/          # Part 3 — Phase 0 prerequisites + the 8-phase tutorial
│   ├── infrastructure/       # Part 4 — device state, network, endpoints, security, system ops
│   ├── rfid/                 # Part 5 — operating modes, start/stop, filtering, tag data
│   ├── observability/        # Part 6 — events, heartbeat, alerts, connection, monitoring
│   ├── fleet/                # Part 7 — provisioning, bulk config, reliability, migration, cloud
│   ├── diagnose/             # Part 8 — symptoms, failure modes, recovery playbooks, misconceptions
│   └── reference/            # Part 9 — command reference, error codes, FAQs, appendices, glossary
├── src/
│   ├── css/                  # SCSS palette and layout modules
│   ├── theme/                # Swizzled Docusaurus components (DocCard, CodeBlock, Heading, …)
│   ├── components/           # CopyPageButton, Steps, LazyVideo, …
│   ├── client-modules/       # Click-to-zoom for screenshots
│   └── pages/                # Landing page (hero, feature cards, persona cards)
├── static/img/              # Logos, favicon, Quick-Start screenshots
├── .github/workflows/deploy.yml   # CI: install deps + d2 CLI, build, publish to gh-pages
├── docusaurus.config.ts       # Site config (URL, navbar, footer, metadata, plugins)
├── sidebars.ts                # The nine-Part docs sidebar
├── package.json
└── tsconfig.json
```

---

## Contributing

1. **Branch off `main`** with a descriptive name (e.g. `docs/improve-tls-chapter`, `fix/symptom-index-anchors`).
2. **Edit in place** — page content under `docs/`, styling under `src/css/`, configuration in `docusaurus.config.ts`.
3. **Verify locally.** Run `npm start` to preview, then `npm run build` and confirm a clean build with **zero broken‑link / broken‑anchor warnings**.
4. **Match the voice.** Explanation pages reason from first principles; how‑tos are imperative; reference pages are terse and tabular. Keep the Diátaxis badge accurate.
5. **Honour the source of truth.** Field names, enums, payload keys, and error codes must match the MQTT API Reference schema.
6. **Anchors are stable contracts.** Preserve explicit `{#anchor}` heading IDs that other pages link to.
7. **Open a PR** describing the change and any cross‑page implications. For new chapters or large rewrites, raise an issue first so the change can be scoped against the nine‑Part information architecture.

---

## License

No open‑source license is granted. Documentation content, diagrams, and brand assets are **© Zebra Technologies Corporation and/or its affiliates — All Rights Reserved**, and are intended for internal and enterprise use. Contact the authors below for any reuse or distribution.

The Docusaurus build tooling and other third‑party dependencies remain under their respective licenses (Docusaurus is © Meta Platforms, Inc. and contributors, MIT).

---

## Authors

| Name | Role | Email |
|---|---|---|
| **Abdul Latheef Mohamed** | Lead Technical Writer | [abdullatheef.mohamed@zebra.com](mailto:abdullatheef.mohamed@zebra.com) |
| **Immanuel Aloysius** | Technical Writer | [immanuel.aloysius@zebra.com](mailto:immanuel.aloysius@zebra.com) |
