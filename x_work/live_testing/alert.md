# Event: alerts

> **Live-capture status (read first).** **Verdict: LIVE** — all 5 alert types below were firmware-validated on `zebra/MDM/clients/event/RFD40-24190525100255` [verified-on-device]. The bundled `events/alerts.json` examples are byte-for-byte identical to the live capture (see P-10). This is a **device-originated event** (no command triggers it). Provenance tags: `[verified-on-device]`, `[verified-from-schema]`, `[inferred-from-live]`, `[firmware-only-unknown]`.

## 1. Intent & Objective

The **`alerts`** event delivers detailed, structured alert information from the reader for operational monitoring and troubleshooting. The reader publishes it **autonomously** when a monitored device condition changes state or crosses a threshold — **no command is required** [verified-on-device]. Each alert carries:

- an alert **type**, **state**, and **priority** classification (the envelope);
- a structured **`alertDetails`** payload with domain-specific fields;
- an alert **id** covering battery, power, firmware, and network conditions.

Use it to: monitor important status transitions and critical conditions; track device health and infrastructure changes; and feed alert pipelines that need structured alert context.

**Relationship to `NOTIFICATION` events.** The same `alerts.json` envelope is also used with `type: NOTIFICATION` for command side-effects — `FILE_DOWNLOAD` (install_certificate.md §7.4) and the `FIRMWARE_UPDATE` *start* notification (set_os.md §5). **This doc covers the `type: ALERT` subset** (autonomous monitoring alerts); it does not re-document those notification flows. The long-form `alerts` event is also described in `MQTT_API_REFERENCE.md` (~lines 2349-2462); this is the first standalone event doc for it.

## 2. Topic Mapping

| Direction | On-wire topic (verified) | Wire form |
|---|---|---|
| Subscribe (Event) | `zebra/MDM/clients/event/RFD40-24190525100255` | `{tenantId}/{EP_TYPE}/clients/event/{serial}` [verified-on-device] |

There is **no request leg** — the device emits this event on its own. QoS/retain come from the endpoint's `mqttParams`, not from this event. The same event topic also carries `NOTIFICATION`-type events (FILE_DOWNLOAD, FIRMWARE_UPDATE-start) and heartbeats.

## 3. Event Payload Breakdown

### 3.1 Envelope (`events/alerts.json`)

| Field | Type | Required | Enum / Constraint | Live values |
|---|---|---|---|---|
| `type` | string | **Required** | `EVENT / NOTIFICATION / ALERT` | `ALERT` (all 5) ✓ |
| `timestamp` | string | **Required** | declared `format: time`, example `22:54:25` | full ISO-8601 e.g. `2026-04-29T12:33:34.279Z` — **format divergence, see D6 / GAP-H-0208** |
| `state` | string | **Required** | `SET / CLEAR / ONESHOT` | `ONESHOT` (#1-4), `SET` (#5) ✓ |
| `id` | string | **Required** | `BATTERY / FIRMWARE_UPDATE / NETWORK_EVENT / TEMPERATURE / POWER` | all 4 live ids in-enum ✓ |
| `priority` | string | **Required** | `CRITICAL / HIGH / MEDIUM / LOW` | `LOW / HIGH / CRITICAL` ✓ |
| `alertDetails` | object | optional (**not** in `required`) | `anyOf → refrence/response/alertDetails.yaml` | present on all 5 |

`state` semantics: `SET` = active/asserted, `CLEAR` = resolved, `ONESHOT` = one-time notification. Envelope `required` is `[type, timestamp, state, id, priority]` — `alertDetails` is **optional**, so the envelope validates even when its body fails (the D1-D5 defects below are all inside `alertDetails`).

### 3.2 `id` → `alertDetails` branch routing (`refrence/response/alertDetails.yaml`)

`alertDetails` is an `anyOf` over `alertDetails.yaml`, which declares branches: `fwUpdateStatus`, `downloadInfo`, `temperatueInfo` (sic — D6), `networkInfo`, `batteryAlert`. **There is NO `powerEvent` branch** — so the live `POWER` alert's body cannot be routed at all (**D1**), even though `refrence/events/powerEvent.yaml` exists.

| Live `id` | `alertDetails` key | Leaf schema | Branch present? |
|---|---|---|---|
| `BATTERY` | `batteryAlert` | `refrence/events/batteryAlert.yaml` | ✓ |
| `POWER` | `powerEvent` | `refrence/events/powerEvent.yaml` (exists) | ✗ **missing branch (D1)** |
| `NETWORK_EVENT` | `networkInfo` | `refrence/events/networkEvent.yaml` | ✓ |
| `FIRMWARE_UPDATE` | `fwUpdateStatus` | `refrence/events/fwUpdateEvents.yaml` | ✓ |
| `TEMPERATURE` | `temperatueInfo` (sic) | `refrence/events/tempEvent.yaml` | ✓ (key misspelled — D6) |

### 3.3 `BATTERY` → `batteryAlert`

`{status, stateOfHealth, chargePercentage}`. `status` enum `[LOW, CRITICAL, CHARGING, FULL, HIGH]` (live `CHARGING` ✓); `chargePercentage` max 100 (live `100` ✓). **`stateOfHealth` enum `[LOW, FULL, CRITICAL, HIGH, CHARGING]` does NOT include the live value `GOOD`, and is semantically the wrong vocabulary for a "health" grade — see D5.** `batteryAlert` declares no `required` array.

### 3.4 `POWER` → `powerEvent`

`{powerSource, lldp, powerMode}`. `powerSource` enum `[DC, POE, POE+, BATTERY, CRADLE]` (live `BATTERY` ✓); `powerMode` enum `[ACTIVE, LOWPOWER]` (live `ACTIVE` ✓). **`required: [powerSource, lldp, powerMode]` — but the live alert omits `lldp` (D2), and the whole branch is unrouted (D1).** `lldp` (LLDP negotiation) is link-type-specific and not emitted on battery power.

### 3.5 `NETWORK_EVENT` → `networkInfo.networkInterface.{wifiStatus[], ethStatus[]}`

Per-interface arrays. Live wifi `{interface, status, ssid, ipV4Address}`; live eth `{interface, status, linkStatus, ipV4Address}`. **Both item schemas over-require address/speed fields the firmware omits**: `ethStatus.items.required` includes `linkSpeed` + `ipV6Address` (D3); `wifiStatus.items.required` includes `ipV6Address` (D4). `status` `[CONNECTED, DISCONNECTED]` and `linkStatus` `[UP, DOWN]` match live.

### 3.6 `FIRMWARE_UPDATE` → `fwUpdateStatus`

`{updateStatus, overallProgress, stage}`, all `required`. The live mid-update alert (`updateStatus: "updating"` ✓ in-enum, `overallProgress: 20`, `stage: "updating scanner fw"`) is **fully schema-valid (P-6)**. Contrast the `set_os` *start* NOTIFICATION (`updateStatus: "Starting FW update"`, only `updateStatus` present), which is out-of-enum and missing required fields — see set_os.md SO-01/SO-02.

### 3.7 `TEMPERATURE` → `temperatueInfo` (sic)

Routes to `tempEvent.yaml` `{nge, pa, ambient}` (all `required`). Not exercised live this batch; the device documentation marks temperature among the not-yet-supported event types. The branch **key is misspelled** `temperatueInfo` (D6).

## 4. Trigger / Emission

Alerts are emitted autonomously on a monitored state change or threshold crossing — no command. Per-id triggers: `BATTERY` (status/health/charge change), `POWER` (source/mode change), `NETWORK_EVENT` (Wi-Fi/Ethernet connect/disconnect, link, address change), `FIRMWARE_UPDATE` (update progress). **Which alerts are enabled is governed by `config_events` `eventConfiguration` toggles** (`battery`, `power`, `network`, `firmwareUpdate`, …) — enablement is a property of `config_events`, not of this event. [inferred-from-live + verified-from-schema: refrence/payload/cfgEventPayload.yaml]

## 5. Live Verification — the 5 firmware-validated alerts

**Verdict: LIVE.** All five validated against the envelope; bodies surface the D1-D5 schema defects below. Verbatim captures:

```json
{ "type":"ALERT","timestamp":"2026-04-29T12:33:34.279Z","state":"ONESHOT","id":"BATTERY","priority":"LOW",
  "alertDetails":{"batteryAlert":{"status":"CHARGING","stateOfHealth":"GOOD","chargePercentage":100}}}
{ "type":"ALERT","timestamp":"2026-04-29T12:33:34.290Z","state":"ONESHOT","id":"POWER","priority":"HIGH",
  "alertDetails":{"powerEvent":{"powerSource":"BATTERY","powerMode":"ACTIVE"}}}
{ "type":"ALERT","timestamp":"2026-04-29T12:33:34.300Z","state":"ONESHOT","id":"NETWORK_EVENT","priority":"HIGH",
  "alertDetails":{"networkInfo":{"networkInterface":{"wifiStatus":[{"interface":"wlan0","status":"CONNECTED","ssid":"IOT_TESTAP","ipV4Address":"192.168.0.107"}]}}}}
{ "type":"ALERT","timestamp":"2026-04-29T12:33:57.757Z","state":"ONESHOT","id":"NETWORK_EVENT","priority":"HIGH",
  "alertDetails":{"networkInfo":{"networkInterface":{"ethStatus":[{"interface":"eth0","status":"CONNECTED","linkStatus":"UP","ipV4Address":"192.168.0.111"}]}}}}
{ "type":"ALERT","timestamp":"2026-04-29T12:33:57.757Z","state":"SET","id":"FIRMWARE_UPDATE","priority":"CRITICAL",
  "alertDetails":{"fwUpdateStatus":{"updateStatus":"updating","overallProgress":20,"stage":"updating scanner fw"}}}
```

| # | id | Envelope | Body verdict |
|---|---|---|---|
| L1 | `BATTERY` | valid | `stateOfHealth "GOOD"` out-of-enum (D5); else OK |
| L2 | `POWER` | valid | **unroutable** — no `powerEvent` branch (D1); also missing required `lldp` (D2) |
| L3 | `NETWORK_EVENT` (wifi) | valid | missing required `ipV6Address` (D4) |
| L4 | `NETWORK_EVENT` (eth) | valid | missing required `linkSpeed` + `ipV6Address` (D3) |
| L5 | `FIRMWARE_UPDATE` | valid | **fully valid** (P-6) |

## 6. Associated Codes / Notes

This event carries **no `response`/`code` block** — the 0–30 response codes belong to commands, not to device-originated alerts.

**Schema-variant note (three conflicting alert schemas).** The **long-form `events/alerts.json`** (envelope + `alertDetails` `anyOf`) is canonical and matches the live alerts. Two others diverge and are **not** what the device emits: **`events/alert_short.json`** (the SOTI projection — flat, ~61 granular ids like `BATTERY_LOW_SET`, no `state`/`alertDetails`) and **`refrence/events/alertEvent.yaml`** (an alternate `evtData` shape with `ntp`/`cpuUsage`/`userApp`/`temperature` — none observed live). Consumers should validate against `alerts.json`. (Cross-ref set_os.md SO-16, the FW terminal-state taxonomy split.)

## 7. Conformance & Spec Notes (this event)

**7 divergences (4 CRITICAL, 1 MAJOR, 2 MINOR), all `alertDetails`-body or doc issues; the envelope itself is sound.** Tokens in backticks for table safety. Register rows: D1-D7 are logged as new `GAP-H` rows under operation `alerts`; D6 (timestamp) is **not** re-logged — it is `GAP-H-0208`.

| ID | Severity | Category | Divergence | Expected (`file:line`) | Actual (live) | Fix |
|---|---|---|---|---|---|---|
| D1 | CRITICAL | Missing Property | `alertDetails.yaml` has **no `powerEvent` branch** → live `POWER` alert unroutable, though `powerEvent.yaml` exists | `alertDetails.yaml:6-21` (branches: fwUpdateStatus, downloadInfo, temperatueInfo, networkInfo, batteryAlert) | `POWER` sends `alertDetails.powerEvent{…}`; key absent from the schema | Add `powerEvent: {$ref: ../events/powerEvent.yaml}` to `alertDetails.yaml`. Extends `GAP-H-0210` |
| D2 | CRITICAL | Semantic Schema Error | `powerEvent.yaml` **requires `lldp`** but live `POWER` omits it | `powerEvent.yaml:30-33` `required: [powerSource, lldp, powerMode]` | live `{powerSource:BATTERY, powerMode:ACTIVE}` — no `lldp` | Make `lldp` optional (link-type-specific; absent on battery power) |
| D3 | CRITICAL | Semantic Schema Error | `networkEvent` `ethStatus.items.required` forces `linkSpeed` **and** `ipV6Address`; live eth omits both | `networkEvent.yaml:48-54` | live eth `{interface, status, linkStatus, ipV4Address}` | Require only `interface, status, linkStatus, ipV4Address`; make `linkSpeed`/`ipV6Address` optional |
| D4 | CRITICAL | Semantic Schema Error | `networkEvent` `wifiStatus.items.required` forces `ipV6Address`; live wifi omits it | `networkEvent.yaml:84-89` | live wifi `{interface, status, ssid, ipV4Address}` | Make `ipV6Address` optional |
| D5 | MAJOR | Semantic Schema Error | Battery `stateOfHealth` enum lacks live `GOOD` **and** is the wrong vocabulary (reuses charge states) | `batteryAlert.yaml:17-25` enum `[LOW, FULL, CRITICAL, HIGH, CHARGING]` | live `stateOfHealth: "GOOD"` | Use health grades incl. `GOOD` (e.g. `GOOD, FAIR, POOR, CRITICAL`); stop reusing the `status` enum |
| D6 | MINOR | Documentation Divergence | `alertDetails.yaml` temperature branch key misspelled `temperatueInfo` | `alertDetails.yaml:13` | `temperatueInfo:` (missing `r`); `id` is `TEMPERATURE` | Rename to `temperatureInfo` |
| D7 | MINOR | Documentation Divergence | `MQTT_TOPIC_MAP.md` claims `networkEvent.yaml` has a syntax defect / "fails to resolve transitively" — **stale/false on disk** | `networkEvent.yaml:18-22` well-formed; `$ref` chain resolves | `MQTT_TOPIC_MAP.md:61` asserts a syntax defect that no longer exists | Remove the stale annotation; replace with D3/D4 |

> **Also recurring (cross-ref, not re-logged): timestamp `format: time` vs live ISO-8601** — `events/alerts.json:103-107` declares `format: time` (example `22:54:25`) but every live alert sends a full ISO-8601 instant. Tracked under **`GAP-H-0208`** (= set_os SO-10 / install_certificate ICN-2).

### Positives (firmware-validated strengths — not defects)

- **P-1…P-4** — envelope `type` (`ALERT`), `id` (all 4 live ids), `state` (`ONESHOT`/`SET`), `priority` (`LOW`/`HIGH`/`CRITICAL`) are **all in-enum** [`events/alerts.json:96-138`].
- **P-5** — `alertDetails` is optional, so the 5 envelopes pass all required-field checks despite the body defects [`alerts.json:150-156`].
- **P-6** — the `FIRMWARE_UPDATE` body is fully valid (`updating` in-enum + `overallProgress` + `stage`) [`fwUpdateEvents.yaml`].
- **P-7** — battery `status: CHARGING` in-enum, `chargePercentage: 100 ≤ max` [`batteryAlert.yaml`].
- **P-9** — `powerEvent.yaml` enum trailing whitespace is cosmetic (YAML strips it); live `BATTERY`/`ACTIVE` parse in-enum.
- **P-10** — the 5 bundled `alerts.json` examples are byte-for-byte the live capture (SSID `IOT_TESTAP`, both IPs, full ISO-8601 timestamps) — firmware-accurate, presentable as verified-on-device.

## 8. Safety / Operational Notes

- **Alerts are autonomous and gated.** Absence of an alert is **not** proof of a healthy state — emission is gated by `config_events` `eventConfiguration` toggles; if a category is disabled, its alerts never publish.
- **Do not hard-fail on the over-strict schema.** A strict validator **will reject** the live `POWER`, `NETWORK_EVENT`, and `BATTERY` bodies until D1-D5 are fixed (missing `powerEvent` branch; required `lldp`/`linkSpeed`/`ipV6Address`; out-of-enum `stateOfHealth`). Consumers should validate the **envelope** strictly but treat `alertDetails` bodies leniently (the envelope is sound; the bodies are over-constrained relative to firmware).
- **Validate against the long-form `alerts.json`**, not `alert_short.json` or `alertEvent.yaml` (§6).

---
*Divergence basis: `events/alerts.json`, `refrence/response/alertDetails.yaml`, `refrence/events/{batteryAlert,powerEvent,networkEvent,fwUpdateEvents,tempEvent}.yaml`, `events/alert_short.json`, `refrence/events/alertEvent.yaml`, `MQTT_TOPIC_MAP.md:61`. Live firmware-validated alerts (BATTERY/POWER/NETWORK_EVENT×2/FIRMWARE_UPDATE) on RFD40-24190525100255.*
