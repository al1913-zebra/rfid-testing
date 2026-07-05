# IA Audit Rubric — 13 Parameters (ranked, with intent + falsifiable conformance check)

> CONTEXT MAPPING NOTE. This rubric was authored for a Zebra Handheld RFID IoT Connector docs portal. The two documents under audit (v1, v2) document the **native MQTT** IOTC interface, whose machine contract is **AsyncAPI**, NOT REST/OpenAPI. When a parameter says "OpenAPI/REST", map it to "AsyncAPI/MQTT"; "endpoint/operationId/path" maps to "MQTT command (MGMT/CTRL/DATA) and topic"; the event "payload schema" maps to `dataEVT`/`heartbeatEVT`/event schemas. Deployment-mode triad (PureCloud/Local/Hybrid) is a fixed-reader/cloud construct and likely **N/A** here — judge that parameter on operating-mode completeness only and say so. Evaluate each doc against BOTH (a) the literal conformance check and (b) the underlying architectural INTENT; when a doc consciously diverges from the literal check with a stated, defensible rationale (e.g. Diátaxis-as-badge instead of Diátaxis-as-skeleton), score intent and note the divergence rather than auto-failing.

---

## P1 — Single Versioned ToC Manifest with Deterministic Anchors, Firmware/API Matrix, and Spec Bijection
INTENT: One schema-valid ToC artifact where every node maps to a real source artifact (a command/topic/event/concept), anchors are deterministic, and content binds to a firmware/API-version matrix. No phantom nodes, no orphan references, counts reconcile.
CHECK (falsifiable): (1) every ToC leaf resolves to a real source page id or a declared NET-NEW/merged marker — zero unresolved/phantom nodes; (2) bijection — the set of documented commands/events equals the set in the machine contract (AsyncAPI), no orphans/uncovered; (3) NO reference anywhere to a Part/section that does not exist (e.g. a "Part 11" when there are 10 Parts); (4) version-matrix binding — firmware build ↔ API/feature version ↔ reader-model resolves; (5) declared counts reconcile exactly (page inventory = placed + merged; net-new tally; leaf totals).

## P2 — Single Canonical Home per Concept and Resource (Zero-Duplication Authority)
INTENT: Every fact has exactly ONE canonical page; every other mention is a cross-reference link, never a divergent copy. Drift-prone constants (limits, constraints fence, the stateOfHealth definition) are owned in one place.
CHECK: (1) each canonical artifact (each command, each constraint set, the constraints fence, the power/stateOfHealth definition) has exactly one canonical home, count==1; (2) zero divergent duplicate copies of the same content (e.g. multiple hand-maintained constraint lists that can drift); (3) high-risk shared facts are stated once and linked, not re-asserted; (4) any two definitions of the "same" thing agree (no two-vs-three mismatch).

## P3 — Auth/TLS/Certificate Provisioning Reference Track (Static Provisioning Authority)
INTENT: Security/cert/credential provisioning is a first-class, ordered track and is the gate on first connectivity; documents both the in-band (over-MQTT) and out-of-band (bootstrap tool) provisioning faces; cert-install precedes TLS-enable.
CHECK: (1) a single canonical security track covering credentials, TLS, cert install/rotation; (2) the hard cert-before-TLS ordering is explicit; (3) the out-of-band bootstrap/provisioning path and the over-MQTT path are both covered and not conflated; (4) the security gate is reachable on the first-connect journey.

## P4 — Self-Contained First-Tag-Stream Tutorial Spine
INTENT: One unmistakable linear "from nothing to a verified first read" path that crosses every hard gate in order, ends at a verifiable checkpoint, owns its links inline (no mid-spine dead-ends), and is not forked early into every model/permutation.
CHECK: (1) exactly one canonical get-started/first-read spine; (2) ordered steps cross the real gates (prereqs → pair/power → bootstrap/MDM gate → connect → configure → first read) monotonically; (3) terminal verification checkpoint exists (a physical-world observable); (4) no one-way exits that strand the reader; (5) model/transport variants are subordinate, not early forks.

## P5 — Transport-/Channel-Aware Event & Payload Schema Registry (Canonical Schema-to-Channel Mapping Owner)
INTENT: The event/payload schemas (dataEVT, heartbeatEVT, alerts, access results, the event-type catalog) are owned in one registry that maps each event to the channel/topic that carries it; required-vs-optional and units are explicit; versioned.
CHECK: (1) one canonical schema home per event type with 1:1 ToC entry; (2) each field has type + required flag + unit/enum domain; (3) explicit schema-to-channel/topic mapping; (4) versioned + sample payloads.

## P6 — Operating-Mode Configuration Reference Completeness
INTENT: Every operating mode (and any deployment mode that applies) has a canonical config-reference node enumerating required-vs-optional fields and mode-specific objects, so a consumer knows which fields populate per mode. (Deployment-mode triad likely N/A — judge on operating modes.)
CHECK: (1) closed set of operating modes each has exactly one canonical reference node; (2) per-mode field tables with required/optional flags; (3) mode-specific divergences (e.g. unsupported modes flagged) are explicit; (4) decision aid (mode matrix) present.

## P7 — Control-Plane Command and Request/Response Contract Reference
INTENT: The commands sent TO the device (MGMT/CTRL) and their request/response/correlation semantics are owned as a distinct reference surface, cross-linked to the topic map; the command-topic and any equivalent face are reconciled without duplication.
CHECK: (1) canonical reference per command cluster (MGMT, CTRL) and the response/error contract; (2) request + response schema present; (3) error/status codes catalogued; (4) cross-linked to topics and envelope, not restating them.

## P8 — Reader-Model Applicability Invariant (Closed-Vocabulary Tagging)
INTENT: Every node declares which reader families it applies to (closed vocabulary), so capability divergence (e.g. a non-capable variant, model-gated features) never reads as universal; scope exclusions are explicit.
CHECK: (1) model-applicability is declared/closed-vocabulary where it matters; (2) the not-capable / out-of-scope variant exclusion is explicit and consistently applied; (3) model-gated features (Wi-Fi/IOTC capability, etc.) are tagged, not assumed universal.

## P9 — Diátaxis Branch Purity with Declared-Mode Gating (or a justified equivalent)
INTENT: Content modes (tutorial/how-to/reference/explanation[/diagnosis]) do not contaminate each other; mode is gated by a declared attribute, not guessed; reference stays pure (no procedures), tutorials/how-tos don't inline full field tables. The literal check wants exactly-N Diátaxis top-level roots; a doc may consciously choose Diátaxis-as-per-page-badge over Diátaxis-as-skeleton — score the INTENT (purity + declared gating) and note the divergence.
CHECK: (1) every page carries exactly one declared mode badge; (2) reference leaves map to real artifacts and contain zero procedures; tutorial/how-to leaves contain zero full inline schema/field tables (cross-links allowed); (3) the badge is the authoritative gate (declared, not inferred); (4) within-Part ordering rule is stated once and obeyed.

## P10 — Egress/Transport Parity Symmetry (Contract-Derived Channel Set)
INTENT: The set of supported transports/channels is derived from the actual contract (not mirrored from a fixed-reader superset that invents unsupported transports); every supported transport carries the identical sub-shape (connect/auth, security, payload-topic mapping, delivery/QoS, runnable example).
CHECK: (1) documented transport/channel set == contract-supported set, zero invented transports, zero unsupported ones documented as live; (2) each transport has the same required sub-sections; (3) examples parse and intersect real schema field names; (4) MQTT-only / no-REST/WebSocket reality honored.

## P11 — Device-Lifecycle Stage Completeness (Provision → Operate → Update → Decommission)
INTENT: The full asset lifecycle is a navigable spine with no dead-end stage; transitions (firmware update/rollback, cert rotation, credential revocation, wipe) are each owned; long-lived field-asset realities are covered.
CHECK: (1) all four stages resolve to ≥1 node; (2) no stage is a dead-end (forward links exist); (3) transition concerns (update+rollback, rotation, revocation/wipe) each named to a concrete artifact; (4) does not re-prove static provisioning (cross-links P3).

## P12 — Troubleshooting and Error-Diagnostics Reference Track
INTENT: A first-class, symptom-entered diagnostics surface mapping failure → cause → fix, spanning command error responses, connection/transport failure states, and error/warning event payloads; distinguishes a genuine fault from a constraint violation.
CHECK: (1) one canonical diagnostics/error surface (symptom-first), not buried; (2) the error-response/code catalog is complete vs the contract; (3) connection/transport failure states + error/warning events mapped to remediation; (4) every entry has remediation + cross-link.

## P13 — RF-Regulatory and Hardware-vs-Software Boundary Isolation
INTENT: Region/frequency/transmit-power (law-bound hardware) is quarantined into one bounded, region-keyed, bounded-value reference (no free-form unlawful examples); the physical-setup (hardware-technician) surface is cleanly separated from the software/cloud-engineer surface.
CHECK: (1) all transmit-power/region values live in one designated branch, region-keyed with min/max bounds (no bare inline power examples); (2) read-only/out-of-band region reality stated; (3) hardware-setup vs software-config seam is clean (no leaf mixing both without a labeled boundary).

---

## SCORING INSTRUCTIONS FOR AUDITORS
For EACH document (v1 and v2) and the assigned parameter, produce:
- literalScore 0–10 (against the CHECK as written, mapped to MQTT/AsyncAPI context)
- intentScore 0–10 (against the INTENT)
- rating: PASS / PARTIAL / FAIL
- evidence: 2–5 concrete citations BY SECTION NUMBER / leaf title / matrix cell (quote the exact text you rely on; if you claim a defect, quote it verbatim)
- gaps: what is missing or wrong
Then: winner ('v1' | 'v2' | 'tie'), margin ('decisive' | 'clear' | 'slight' | 'none'), and a one-paragraph rationale.
Be adversarial and exact. If a doc references a non-existent Part, an undefined persona, a count that does not add up, or two definitions of one thing that disagree, that is a hard defect — quote it.
