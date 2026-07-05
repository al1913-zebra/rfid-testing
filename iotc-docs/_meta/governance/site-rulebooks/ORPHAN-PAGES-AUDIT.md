# Orphan-page audit

This audit identifies every doc page in `/docs/**` that is **not** linked
from the left-sidebar TOC, then classifies each as **intentional** (deep
reference reachable via in-page cross-links or the symptom index) or
**accidental** (genuinely orphaned, no path in via the sidebar or any
sidebar-surfaced page).

The classification is anchored to the design note in `sidebars.ts`:

> Nine Parts, ~46 curated entries (~120 total docs in /docs/**; the
> rest are reachable via in-page cross-links and the symptom index, by
> design).

So the *expectation* is that most non-sidebar docs are intentional. The
question for each is: **does the design hold up?** A page is
**intentional** if at least one sidebar-surfaced page (or another deep
reference reachable from sidebar) links to it. A page is **accidental**
if its only incoming links are from other non-surfaced docs, OR it has
no incoming links at all *and* doesn't belong to a coherent reachable
cluster.

## Numbers

Live figures from `python scripts/check_reachability.py` (2026-06-07):

| | Count |
|---|---|
| Total docs in `/docs/**` | **118** (live count; was 115 in the 2026-06 hand re-count, then +1 `tutorials` index (A-07) and +1 `tutorials/read-your-first-tag` (A-08); the A-05/A-06 relocations were renames, net 0) |
| Referenced in `sidebars.ts` ("surfaced") | **117** (every doc-id quoted in the sidebar — across all nine Parts and their collapsed sub-categories, not just the curated spine) |
| Not referenced in the sidebar | **1** |
| ↳ Reachable (surfaced **or** via an in-page cross-link) | **118 — all** (0 unreachable; 0 broken links; 0 broken anchors) |
| ↳ Truly accidental orphans (no path in) | **0** |

> **Re-audit (A-19, 2026-06-07).** `check_reachability.py` reports **118 docs,
> 117 surfaced in `sidebars.ts`, 0 broken links, 0 broken anchors, 0 orphans** —
> every page is reachable. This supersedes the earlier estimates: the
> "~48 curated entries / ~67 reached-via-cluster" framing predates the sidebar's
> growth — the nine Parts now list nearly every page directly through their
> collapsed sub-categories. The cluster tables below remain as the historical
> rationale for *where* each non-spine page sits; the single page not quoted
> directly in the sidebar is still reachable via an in-page cross-link.

> **Note (2026-06).** The derived breakdown above must be regenerated: the corpus is now 115 pages, and the rows for `/reference/troubleshooting/bluetooth`, `/reference/mgmt/device-configuration`, `/fleet/management/apply-config`, `/fleet/management/read-config`, and `/reference/appendices/config-schema` referenced pages that no longer exist and have been removed from the cluster tables below.

> **Note (A-07, 2026-06).** A curated Tutorials index `/tutorials` was added
> and **surfaced in Part 1** (Get oriented), gathering the Quick Start and the
> fleet tutorial so the learning quadrant is navigable (review A3 / C3). It is
> surfaced from creation, not an orphan. Corpus 115 → 116; surfaced +1. Full
> reachability recount deferred to the standing cadence
> (`scripts/check_reachability.py`).

## Reachable from a sidebar-surfaced page (intentional)

These 8 orphans have ≥ 1 incoming link from a sidebar-surfaced page.
They are the canonical "deep reference reachable via cross-link" cases.

| Page | Incoming from surfaced | Intentional? |
|---|---|---|
| `/fleet/cloud-integration/custom-broker` | `/quick-start/prerequisites/credentials` | ✅ Yes — credentials chapter explicitly references custom-broker options |
| `/infrastructure/security/certificate-management` | `/infrastructure/network/wifi` | ✅ Yes — wifi chapter cross-links to cert-management for TLS setup |
| `/reference/api-overview` | `/quick-start/prerequisites/credentials`, `/infrastructure/network/wifi` | ✅ Yes — but worth surfacing too (see "promoted" below) |
| `/reference/errors/codes` | `/diagnose/failure-modes` | ✅ Yes — failure-modes catalogue points at the error-codes reference |
| `/fleet/migration/execute` | `/quick-start/prerequisites/requirements` | ✅ Yes — requirements section references migration |
| `/foundations/mqtt/auth-model` | `/quick-start/prerequisites/credentials` | ✅ Yes — credentials chapter references the auth model |
| `/reference/appendices/firmware-history` | `/quick-start/prerequisites/requirements` | ✅ Yes — requirements references firmware versioning |
| `/reference/appendices/regulatory` | `/foundations/hardware-tiers` | ✅ Yes — hardware tiers chapter references region/regulatory info |

## Reachable via a cluster (intentional deep reference)

These 72 orphans form coherent clusters that are reached via:
(a) one of the 8 directly-reachable pages above,
(b) the symptom index in `/diagnose/symptoms` (Part 8), or
(c) the external API reference site.

Each cluster has a designated entry point in the sidebar; the deeper
pages spread from there via in-page links.

### `/reference/troubleshooting/*` cluster (5 pages) — superseded but kept

| Page | Intentional? | Notes |
|---|---|---|
| `/reference/troubleshooting/approach` | ✅ Intentional (legacy) | Pre-Diagnose IA refactor; content overlaps `/diagnose/symptoms` |
| `/reference/troubleshooting/battery` | ✅ Intentional (legacy) | Linked from `/observability/monitoring/battery` |
| `/reference/troubleshooting/connection` | ✅ Intentional (legacy) | 4 in-links, including infra/network and foundations |
| `/reference/troubleshooting/rfid` | ✅ Intentional (legacy) | Linked from approach |
| `/reference/troubleshooting/tag-data` | ✅ Intentional (legacy) | Linked from approach |

> **Note.** This cluster predates the `/diagnose/*` IA refactor. The new
> diagnose pages are the canonical surface; these remain as deep
> reference that the symptom index can link to. Not surfaced in sidebar
> by design — would create two "where do I diagnose?" entry points.

### `/reference/mgmt/*` cluster (6 pages) — API-reference mirror

| Page | Intentional? |
|---|---|
| `/reference/mgmt/certificates` | ✅ Intentional — mirrors external API ref §3.x |
| `/reference/mgmt/device-status` | ✅ Intentional |
| `/reference/mgmt/endpoint` | ✅ Intentional |
| `/reference/mgmt/event-configuration` | ✅ Intentional |
| `/reference/mgmt/network` | ✅ Intentional |
| `/reference/mgmt/system-operations` | ✅ Intentional |

> **Note.** These are docs-side mirrors of the external MQTT API
> reference's MGMT sub-tags. They duplicate concept content from Part 4
> (Manage your reader) and are reached from the external API ref pages,
> not from the sidebar. Surfacing them would create competing entry
> points with the same content surface.

### `/reference/ctrl/*` cluster (3 pages) — API-reference mirror

| Page | Intentional? |
|---|---|
| `/reference/ctrl/inventory-control` | ✅ Intentional — mirrors external API ref CTRL sub-tag |
| `/reference/ctrl/operating-mode` | ✅ Intentional |
| `/reference/ctrl/tag-filtering` | ✅ Intentional |

> Same rationale as `/reference/mgmt/*`.

### `/reference/faq/*` cluster (5 pages) — search-driven reference

| Page | Intentional? |
|---|---|
| `/reference/faq/compatibility` | ✅ Intentional |
| `/reference/faq/connectivity` | ✅ Intentional |
| `/reference/faq/fleet` | ✅ Intentional |
| `/reference/faq/general` | ✅ Intentional |
| `/reference/faq/rfid` | ✅ Intentional |

> **Note.** FAQ pages are designed to be reached via search (Algolia
> indexes them) and via Q-shaped queries from search engines. Surfacing
> them in the sidebar adds noise without improving discoverability.

### `/reference/appendices/*` cluster (3 pages) — reference appendices

| Page | Intentional? | Notes |
|---|---|---|
| `/reference/appendices/libraries` | 🗑️ **Deleted** | Duplicated `/sdks/libraries`; both deleted along with the SDK section |
| `/reference/appendices/tag-standards` | ✅ Intentional | Linked from `/rfid/tag-data/interpret` |
| `/reference/appendices/topic-quick-reference` | ✅ Intentional | Linked from `/foundations/mqtt/topic-hierarchy` |

### `/reference/data/*`, `/reference/events/*`, `/reference/errors/*`, `/reference/mdm/*` clusters (4 pages) — API-reference mirrors

| Page | Intentional? |
|---|---|
| `/reference/data/tag-data-event` | ✅ Intentional — mirrors external API ref DATA sub-tag |
| `/reference/events/all-events` | ✅ Intentional — mirrors external API ref Events sub-tag |
| `/reference/errors/format` | ✅ Intentional — mirrors error-response shape ref |
| `/reference/mdm/about` | ✅ Intentional — MDM/SOTI interface ref |

> **Update (A-06, 2026-06).** `/reference/errors/handling` was **re-homed**:
> it is a 📙 How-to ("How to handle errors in application code"), not an
> API-reference mirror. Renamed `/reference/errors/handling` →
> `/diagnose/handle-errors` (301 redirect) and **surfaced in Part 8
> (Diagnose & recover)** beside the recovery playbooks; the Part 9 error
> node (`codes`, `format`) stays pure reference and links across to it.
> The earlier "✅ Intentional — how-to for error handling" verdict
> recorded the mode-misfiling (review C2b / action A-06).

### `/sdks/*` cluster — entire section deleted

| Page | Disposition |
|---|---|
| `/sdks/overview` | 🗑️ **Deleted** — duplicated `/sdks/libraries` with no inbound links |
| `/sdks/csharp` | 🗑️ **Deleted** — per-language tutorial duplicated the canonical Quick Start |
| `/sdks/nodejs` | 🗑️ **Deleted** — same rationale |
| `/sdks/python` | 🗑️ **Deleted** — same rationale |
| `/sdks/libraries` | 🗑️ **Deleted** — out-of-scope MQTT-library reference; the navbar Developer Portal covers the SDK surface |

> **Note.** The entire `/sdks/*` section was deleted as not-required.
> The canonical Quick Start at `/quick-start/overview` is
> language-agnostic (uses `mosquitto_pub` / `mosquitto_sub`); the
> navbar's "Developer Portal" link to developer.zebra.com is the
> primary SDK surface. The two library-reference pages
> (`/sdks/libraries` and `/reference/appendices/libraries`) were also
> deleted as out-of-scope. The `docs/sdks/` directory is empty and
> removed. **No redirects are kept** — these URLs intentionally 404.
> (An earlier attempt added redirects to `/foundations/mqtt-primer`,
> but `@docusaurus/plugin-client-redirects` generates a redirect-shell
> HTML page at each `from` URL, which means the "deleted" URLs were
> still resolving as redirect pages instead of true 404s. The redirects
> were removed so the URLs truly disappear.)

### `/fleet/cloud-integration/*` cluster (4 pages) — cloud-broker how-tos

| Page | Intentional? |
|---|---|
| `/fleet/cloud-integration/aws` | ✅ Intentional |
| `/fleet/cloud-integration/azure` | ✅ Intentional |
| `/fleet/cloud-integration/gcp` | ✅ Intentional |
| `/fleet/cloud-integration/patterns` | ✅ Intentional — cluster hub |

> **Note.** Reached via `/fleet/cloud-integration/custom-broker` (which is
> linked from prerequisites/credentials) and via the cluster hub
> `patterns.md`. Cloud-broker selection is out-of-scope of the canonical
> reading path; surfacing it would suggest endorsement of specific
> clouds.
>
> **Update (A-05, 2026-06).** `tutorial-fleet` — a 📗 Tutorial, not a
> cloud-broker how-to — was **relocated out of this cluster**: renamed
> `/fleet/cloud-integration/tutorial-fleet` → `/fleet/provision-fleet`
> (301 redirect) and **surfaced as the lead tutorial node of Part 7** in
> `sidebars.ts`. The earlier "✅ Intentional" verdict was stale (it was
> already a sidebar item under Cloud integration) and recorded a
> mode-misfiling (a Tutorial buried in a how-to group). See review C2a /
> action A-05.

### `/fleet/management/*` cluster (1 page) — fleet ops how-tos

| Page | Intentional? |
|---|---|
| `/fleet/management/drift` | ✅ Intentional |

> **Note.** Reached via `/fleet/bulk-management` (sidebar-surfaced) which
> is the concept entry; these are the how-to extensions.

### `/fleet/migration/*` cluster (3 pages) — migration how-tos

| Page | Intentional? |
|---|---|
| `/fleet/migration/plan` | ✅ Intentional — 5 in-links incl. compatibility FAQ |
| `/fleet/migration/execute` | ✅ Intentional — linked from prerequisites |
| `/fleet/migration/verify` | ✅ Intentional |

### `/fleet/provisioning/*` cluster (3 pages) — provisioning how-tos

| Page | Intentional? |
|---|---|
| `/fleet/provisioning/automation` | ✅ Intentional |
| `/fleet/provisioning/bulk-123rfid` | ✅ Intentional |
| `/fleet/provisioning/soti-connect` | ✅ Intentional — 4 in-links |

> **Note.** Reached via `/fleet/provisioning-models` (sidebar-surfaced)
> which is the concept entry.

### `/foundations/architecture/*` cluster (3 pages) — deep architecture

| Page | Intentional? |
|---|---|
| `/foundations/architecture/end-to-end` | ✅ Intentional |
| `/foundations/architecture/handheld-considerations` | ✅ Intentional — 5 in-links |
| `/foundations/architecture/interface-model` | ✅ Intentional |

> **Note.** `/foundations/communication-flow` is the sidebar-surfaced
> concept entry to architecture topics. These three deeper pages spread
> from it (e.g., `interface-model` links from `topic-hierarchy`,
> `handheld-considerations` from multiple pages).

### `/foundations/mqtt/*` cluster (4 pages) — deep MQTT

| Page | Intentional? |
|---|---|
| `/foundations/mqtt/auth-model` | ✅ Intentional — linked from prereqs/credentials |
| `/foundations/mqtt/connection-lifecycle` | ✅ Intentional |
| `/foundations/mqtt/qos` | ✅ Intentional — 4 in-links |
| `/foundations/mqtt/topic-hierarchy` | ✅ Intentional |

> **Note.** `/foundations/mqtt-primer` is the sidebar-surfaced entry;
> these deeper MQTT pages spread from it and from prereqs/credentials.

### `/infrastructure/*` endpoint pages (flattened in A-17) — endpoint how-tos

| Page | Intentional? |
|---|---|
| `/infrastructure/configure-endpoints` | ✅ Intentional — 7 in-links |
| `/infrastructure/multi-endpoint` | ✅ Intentional |
| `/infrastructure/view-endpoints` | ✅ Intentional |

> **Note (A-17, 2026-06).** The `endpoints/` sub-folder was flattened to
> `/infrastructure/<leaf>` (URL-NAMING Pass 4). `/infrastructure/mqtt-endpoints`
> (was `endpoints/about`) is the sidebar-surfaced concept entry; these how-tos
> spread from it via in-page links.

### `/infrastructure/network/*` cluster (2 pages) — network ops

| Page | Intentional? |
|---|---|
| `/infrastructure/network/ethernet` | ✅ Intentional |
| `/infrastructure/network/troubleshooting` | ✅ Intentional |

> **Note.** Sidebar surfaces `/infrastructure/network/{architecture, wifi}`;
> ethernet and troubleshooting are deeper.

### `/infrastructure/*` security pages (flattened in A-17) — TLS ops

| Page | Intentional? |
|---|---|
| `/infrastructure/tls-setup` | ✅ Intentional — 11 in-links |
| `/infrastructure/certificate-management` | ✅ Intentional — linked from wifi |
| `/infrastructure/certificate-rotation` | ✅ Intentional |

> **Note (A-17, 2026-06).** The `security/` sub-folder was flattened to
> `/infrastructure/<leaf>` (URL-NAMING Pass 4); `/infrastructure/tls-and-certificates`
> (was `security/model`) is the sidebar-surfaced concept entry.

### `/observability/events/{catalog, model}` and `/observability/monitoring/*` cluster (6 pages)

| Page | Intentional? |
|---|---|
| `/observability/events/catalog` | ✅ Intentional — linked from events/model |
| `/observability/events/model` | ✅ Intentional |
| `/observability/monitoring/battery` | ✅ Intentional — 3 in-links |
| `/observability/monitoring/connection-quality` | ✅ Intentional |
| `/observability/monitoring/device-health` | ✅ Intentional |
| `/observability/monitoring/fleet-dashboard` | ✅ Intentional |

> **Note.** Part 6 sidebar covers the event-family chapters; the
> catalog/model and monitoring how-tos extend from there.

### `/rfid/operating-mode/*` cluster (3 pages) — operating-mode how-tos

| Page | Intentional? |
|---|---|
| `/rfid/operating-mode/configure` | ✅ Intentional |
| `/rfid/operating-mode/post-filters-configure` | ✅ Intentional |
| `/rfid/operating-mode/trigger-composition` | ✅ Intentional |

> **Note.** The flattened sidebar exposes `/rfid/operating-mode-profiles`,
> `/rfid/start-stop-inventory`, `/rfid/post-filters` as concept pages;
> these deeper how-tos extend each.

### `/rfid/tag-data/*` cluster (4 pages) — tag-data deep dives

| Page | Intentional? |
|---|---|
| `/rfid/tag-data/architecture` | ✅ Intentional |
| `/rfid/tag-data/dual-channels` | ✅ Intentional |
| `/rfid/tag-data/interpret` | ✅ Intentional |
| `/rfid/tag-data/process` | ✅ Intentional |

> **Note.** Sidebar surfaces `/rfid/dataevt-schema`; these deeper pages
> spread from it.

## Truly accidental orphans — promoted to sidebar (or deleted)

These 4 pages had no incoming links and didn't belong to a coherent
reachable cluster. Three are promoted to the sidebar; one was deleted.

| Page | H1 | Disposition |
|---|---|---|
| `/foundations/documentation-guide` | "About the Structure of This Documentation" | **Promoted to Part 1** (Get oriented) — between `start` and `mqtt-primer`. This *is* the docs reading guide; a reader who can't find it can't find the docs. |
| `/foundations/v1-1-features` | "About IOTC V1.1 Features" | **Promoted to Part 8** (Diagnose and reference) — release notes belong with reference material |
| `/reference/api-overview` | "MQTT API Reference" | **Promoted to Part 8** (Diagnose and reference) — the canonical internal landing for the API reference (the navbar's "API Reference" goes to the *external* render; this internal page is the docs-side index) |
| `/sdks/overview` | "SDKs & Language Tutorials" | **Deleted** — duplicated `/sdks/libraries` and had no incoming cross-references. Subsequently the entire `/sdks/*` section was deleted (see the SDK cluster section above). |

> The other 8 reachable-from-surfaced pages are kept as deep reference,
> consistent with the design philosophy. They are linked at the right
> moment in the canonical reading path; surfacing them would dilute the
> sidebar without adding discoverability.

## Re-audit cadence

Run `scripts/check_reachability.py` (from the repo root) whenever a page is added or moved. A
new doc that has no incoming links and doesn't belong to a cluster is
either (a) something to promote to the sidebar or (b) something to
cross-link from an existing surfaced page.
