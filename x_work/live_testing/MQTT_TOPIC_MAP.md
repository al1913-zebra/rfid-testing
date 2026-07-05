# Phase 1 — Topic & Schema Map

> **Scope:** Handheld RFD40 / RFD90, **MQTT-only** (no REST/HTTP/GPIO/cloud-core). Source-of-truth is the repo schema tree (`commands/`, `response/`, `events/`, `refrence/`, `models/`). `openapi.json`/`index.html` are generated artifacts (never hand-edited).
> **Run mode this execution:** initial **MOCK FALLBACK**, later **LIVE‑MDM (read‑only) VERIFIED** once the RFD40 (serial `24190525100255`) attached via endpoint `MDM_REMOTE`. **Real on‑wire topics are tenant‑prefixed + serial‑suffixed:** `zebra/{EP_TYPE}/clients/{cmnd|resp|event|rfid}/RFD40-24190525100255` — e.g. the configured base `MDM/clients/cmnd` is wrapped by the device into `zebra/MDM/clients/cmnd/RFD40-24190525100255`. **This contradicts the earlier "no tenant prefix" reading** (it is `{tenantId}/{base}/{serialNumber}`). 8 read‑only MDM commands returned `code 0` (see `phase4-validation-report.md` → *Live Device Verification*). CTRL/DATA planes remain unverified — `config_endpoint` for them was blocked by `code 25`, a **global** publish‑topic limit (`MDM_REMOTE` already holds 3). See `phase2-broker.md` and `BLOCKERS_AND_INCONSISTENCIES.md`.

## Topic convention (verified)
- Pattern: **`{EP_TYPE}/clients/{cmnd|resp|event|rfid}`** — topics are configured **per endpoint** under `configuration.mqttParams.publishTopics` / `subscribeTopics`, not globally hardcoded. `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples + refrence/payload/cfgEndpointPayload.yaml]`
- Device **subscribes** to `.../cmnd` (publish requests here); **publishes** responses to `.../resp`, events/alerts to `.../event`, tag data to `.../rfid`.
- Per endpoint: up to **3 publishTopics** and **1 subscribeTopic** (enforced by error codes 25 / 26). `[verified-from-schema: refrence/response/response.yaml codes 25,26]`
- QoS/Retain are defined **per publish/subscribe topic** (`qos:int`, `retain:bool`, each topic `required:[topic,qos,retain]`) plus a `configuration.qosCommon:int`. There is **no per-operation/per-message QoS binding**. `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml]`
- MQTT version **3.1.1** `[verified-from-schema: events/mqttConnEVT.json mqttVersion]` (a `3.0999999` numeric artifact also appears — see anomalies).

### Live instance of the pattern (this environment's MDM_EP)
- Device SUBSCRIBES to **`MDM/clients/cmnd`**; PUBLISHES responses to **`MDM/clients/resp`**, events to **`MDM/clients/event`**. tenantId `zebra` is configured but the topics carry **NO tenant prefix** — used exactly as given. No separate `.../rfid` topic exists on this MDM management endpoint (a DATA endpoint must be added via `config_endpoint` first).
- If tenant prefixing were enabled elsewhere, topics would become `zebra/MDM/clients/*` — **not** assumed here.

---

## Operations — Control plane (epType `CTRL`; live instance would route over the MDM connection until a CTRL endpoint is added)

| Operation | command enum | Source file | Publish (cmnd) | Response (resp) | Event (event) | epType | Payload key (on-wire) | Error-code subset (hypothesis) | _meta grounding page | Provenance |
|-----------|--------------|-------------|----------------|-----------------|---------------|--------|-----------------------|--------------------------------|----------------------|------------|
| Start/Stop inventory | `control_operation` | commands/control/control_operation.json | `CTRL/clients/cmnd` | `CTRL/clients/resp` | `CTRL/clients/event` | CTRL | `ctrlOprPayload` → refrence/payload/ctrlOprPayload.yaml | 0, 11, 12, 23 | deployment-guide/control_operation.md | `[verified-from-schema]` (command value has **no** `example`/`default` — see anomalies) |
| Get operating mode | `get_operating_mode` | commands/control/get_operating_mode.json | `CTRL/clients/cmnd` | `CTRL/clients/resp` | — | CTRL | _(none — `command`+`requestId` only)_ | 0, 3, 22 | reference (operatingModePayload SoT) | `[verified-from-schema]` |
| Set operating mode | `set_operating_mode` | commands/control/set_operating_mode.json | `CTRL/clients/cmnd` | `CTRL/clients/resp` | — | CTRL | `operatingMode` → refrence/payload/operatingModePayload.yaml | 0, 2, 22, 23 | reference (operatingModePayload SoT) | `[verified-from-schema]` |
| Get post-filter | `get_post_filter` | commands/control/get_post_filter.json | `CTRL/clients/cmnd` | `CTRL/clients/resp` | — | CTRL | _(none — `command`+`requestId` only)_ | 0, 3 | refrence/payload/postFilterPayload.yaml | `[verified-from-schema]` — **omitted from `iot_control_cmds` enum** (see anomalies) |
| Set post-filter | `set_post_filter` | commands/control/set_post_filter.json | `CTRL/clients/cmnd` | `CTRL/clients/resp` | — | CTRL | `postFilterPayload` → refrence/payload/postFilterPayload.yaml | 0, 2, 23, 24 | refrence/payload/postFilterPayload.yaml | `[verified-from-schema]` (command value has **no** `example`/`default` — see anomalies) |

> Control-plane runtime behavior (inventory start/stop, operating modes, post-filters) is **`[firmware-only-unknown]`** this run — no CTRL endpoint exists live and the device session was not attached.

## Operations — Device-management plane (epType `MGMT`; live instance = `MDM` topics `MDM/clients/{cmnd,resp,event}`)

| Operation | command enum | Source file | Publish (cmnd) | Response (resp) | Event (event) | epType | Payload key (on-wire) | Error-code subset (hypothesis) | _meta grounding page | Provenance |
|-----------|--------------|-------------|----------------|-----------------|---------------|--------|-----------------------|--------------------------------|----------------------|------------|
| Configure endpoint (add/update/delete) | `config_endpoint` | commands/dev_mgmt/config_endpoint.json | `MGMT/clients/cmnd` (live `MDM/clients/cmnd`) | `MGMT/clients/resp` | — | MGMT/MDM | `epConfig` → refrence/payload/cfgEndpointPayload.yaml | 0, 1, 2, 10, 23, 25, 26, 27 | deployment-guide/config_endpoint.md | `[verified-from-schema]` — payload YAML **has a syntax defect** (see anomalies) |
| Get endpoint config | `get_endpoint_config` | commands/dev_mgmt/get_endpoint_config.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | `endpointDetails` → refrence/payload/epName.yaml | 0, 2, 3 | deployment-guide/get_endpoint_config.md | `[verified-from-schema]` |
| Configure events | `config_events` | commands/dev_mgmt/config_events.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | governs `heartBeatEVT`/`alerts` emission + interval | MGMT/MDM | `eventConfiguration` → refrence/payload/cfgEventPayload.yaml | 0, 2, 23 | reader-health-monitoring-and-gen2x.md | `[verified-from-schema]` |
| Get version | `get_version` | commands/dev_mgmt/get_version.json | `MGMT/clients/cmnd` (live `MDM/clients/cmnd`) | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 3 | deployment-guide/get_version.md | `[verified-from-schema]` (mock-exercised; **no device reply this run**) |
| Get status | `get_status` | commands/dev_mgmt/get_status.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 3 | reader-health-monitoring-and-gen2x.md | `[verified-from-schema]` — example omits required `hostname` (see anomalies) |
| Get config | `get_config` | commands/dev_mgmt/get_config.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 2, 3, 23 | reference/save-config-*.md | `[verified-from-schema]` — response chain has `MQT-TLS` typo (see anomalies) |
| Set config | `set_config` | commands/dev_mgmt/set_config.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | `configData` → refrence/payload/setCfgPayload.yaml | 0, 2, 10, 23 | reference/save-config-*.md | `[verified-from-schema]` — refs the defective cfgEndpointPayload.yaml |
| Get current region | `get_current_region` | commands/dev_mgmt/get_current_region.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 6 | appendix-*.md | `[verified-from-schema]` |
| Set OS / FW update | `set_os` | commands/dev_mgmt/set_os.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | `fwUpdateEvents` via alerts | MGMT/MDM | `OSUpdateDetails` → refrence/payload/osUpdatePayload.yaml | 0, 2, 4, 8, 13, 14 | appendix-*.md | `[verified-from-schema]` |
| Reboot | `reboot` | commands/dev_mgmt/reboot.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 5 | deployment-guide/reboot.md | `[verified-from-schema]` (state-changing — not exercised live) |
| Get Wi-Fi | `get_wifi` | commands/dev_mgmt/get_wifi.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 3, 20 | how-to/connect-a-reader-with-123rfid-desktop.md | `[verified-from-schema]` |
| Set Wi-Fi | `set_wifi` | commands/dev_mgmt/set_wifi.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | `wifiConfig` → refrence/payload/cfgWifiPayload.yaml | 0, 2, 15, 17, 18, 19, 20, 23 | 123rfid-desktop-feature-reference.md | `[verified-from-schema]` — examples #2/#6 omit required fields (see anomalies) |
| Delete Wi-Fi profile | `delete_wifi_profile` | commands/dev_mgmt/delete_wifi_profile.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | `wifiProfileInfo` → refrence/payload/delWifiProfile.yaml | 0, 15, 16, 20 | 123rfid-desktop-feature-reference.md | `[verified-from-schema]` |
| Get Ethernet | `get_eth` | commands/dev_mgmt/get_eth.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 3, 7 | reference/windows-rfid-reader-and-pos-integration.md | `[verified-from-schema]` — orphan `get_eth_response.json` has string `code` (see anomalies) |
| Install certificate | `install_certificate` | commands/dev_mgmt/install_certificate.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | `certDetails` → refrence/payload/installCertPayload.yaml | 0, 2, 21, 30 | certificate-management-*.md | `[verified-from-schema]` — TLS/cert verification path **untestable** (plain MQTT) |
| Delete certificate | `delete_certificate` | commands/dev_mgmt/delete_certificate.json | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | `certificateInfo` → refrence/payload/delCertPayload.yaml | 0, 21 | certificate-management-*.md | `[verified-from-schema]` (command file has **no** `required` array) |
| Get installed certificate(s) | `get_installed_certificates` *(enum, plural)* | commands/dev_mgmt/get_installed_certificate.json *(file, singular)* | `MGMT/clients/cmnd` | `MGMT/clients/resp` | — | MGMT/MDM | _(none)_ | 0, 3, 21 | certificate-management-*.md | `[verified-from-schema]` — **singular/plural mismatch** (see anomalies) |

> Device-management runtime behavior is **`[firmware-only-unknown]`** this run for *every* command — the device session was not attached, so no real `response.code`/payload was captured. Mock/in-memory validation (Phase 4) confirms envelope shape and code *representability* only.

---

## Events

| Event | Source file | inline vs $ref | Event/RFID topic role | Payload schema (resolved) | _meta grounding | Provenance |
|-------|-------------|----------------|-----------------------|----------------------------|-----------------|------------|
| Alerts (battery/temp/power/error/FW/download/network) | events/alerts.json | `$ref` (alertDetails → fwUpdateEvents, fileDownload, tempEvent, **networkEvent**, batteryAlert) | `MGMT_EVT/clients/event` (live `MDM/clients/event`) | refrence/response/alertDetails.yaml | reader-health-monitoring-and-gen2x.md | `[verified-from-schema]` — **fails to resolve** transitively (networkEvent.yaml syntax defect — see anomalies) |
| Alert (short form) | events/alert_short.json | **inline** (no `$ref`) | `MGMT_EVT/clients/event` | (inline in events/alert_short.json) | reader-health-monitoring-and-gen2x.md | `[verified-from-schema]` |
| Tag data event | events/dataEVT.json | `$ref` (tagMetaData, operating-mode `type`) | `DATA1/clients/rfid` (live: none until DATA endpoint added) | refrence/* (tag data) | reader-health-monitoring-and-gen2x.md | `[verified-from-schema]` — data-plane behavior `[firmware-only-unknown]` |
| Heartbeat event | events/heartBeatEVT.json | `$ref` | `MGMT_EVT/clients/event` (live `MDM/clients/event`) | refrence/events/heartbeatEvents.yaml (vs `heartbeatEvents_new.yaml`) | reader-health-monitoring-and-gen2x.md | `[verified-from-schema]` — **duplicate** heartbeat schema (see anomalies) |
| MQTT connection event | events/mqttConnEVT.json | **inline** (no `$ref`) | `MGMT_EVT/clients/event` (live `MDM/clients/event`) | (inline) `mqttVersion`, `apiVersion` | reference/mdm-and-soti-interfaces.md | `[verified-from-schema]` — `mqttVersion` typed `number` vs example `"3.1.1"`; `3.0999999` artifact (see anomalies) |

> The 5 `events/*.json` filenames do **not** 1:1 name-match the 23 `refrence/events/*.yaml` schemas — this divergence is expected, not a defect. Only `$ref`s literally present in a file were chased.

---

## Orphan responses (response file with no matching request command)

`response/dev_mgmt/` — **7 orphans** (confirmed): `cloud_connect.json`, `config_alerts.json`, `get_capablity.json`, `get_config_response_soti.json`, `get_eth_response.json`, `get_wifi_response_soti.json`, `set_eth.json`.
`response/control/` — **0 orphans**.

> Plain-vs-Soti response files coexisting is expected: `iot_response.payload.oneOf` (see below) references the `*Soti` variants and several plain variants but **not** `ethResponse.yaml`/`wifiResponse.yaml`/`epConfiguration.yaml` directly.

---

## Unresolved $refs / structural anomalies

| # | Anomaly | Evidence (path:line) | Nature | Disposition |
|---|---------|----------------------|--------|-------------|
| A1 | **YAML syntax error** — `properties:` given a scalar string then child keys; `topic` is required but undefined | refrence/payload/cfgEndpointPayload.yaml:116 (`properties: Supports up to 3 publish topics.`) and :133 | Real defect — file is **invalid YAML**; breaks redocly `build-docs`; `required:[topic,qos,retain]` has no `topic` property | **Fix in Phase 5** |
| A2 | **YAML syntax error** — missing property name under antenna `properties:` | refrence/response/deviceCapablity.yaml:180–185 | Real defect — invalid YAML; breaks `get_capablity.json` resolution | **Fix in Phase 5** (orphan response; low blast radius) |
| A3 | **YAML syntax error** — missing property name under `ethStatus.items.properties:` | refrence/events/networkEvent.yaml:18–20 | Real defect — invalid YAML; cascades to `alertDetails.yaml` → `events/alerts.json` | **Fix in Phase 5** |
| A4 | **Enum typo `MQT-TLS`** (should be `MQTT_TLS`) | refrence/response/epConfiguration.yaml:27 ; refrence/response/epConfigurationSoti.yaml:32 | Real defect — `get_config` example with `MQTT_TLS` fails its own schema | **Fix in Phase 5** |
| A5 | `response.code` is a **string** `"0"` not integer | refrence/response (orphan) get_eth_response.json:example | Real defect — violates `response.yaml code:integer` | **Fix in Phase 5** (orphan) |
| A6 | `mqttConnEVT.mqttVersion` typed `number`; example uses `"3.1.1"` (string); `3.0999999` numeric artifact | events/mqttConnEVT.json | Type/example mismatch + float artifact of `3.1` | **Log only** (firmware reports 3.1.1) — Phase 5 candidate (type→string) |
| A7 | `SEEN_COUNT` (examples) vs `SEENCOUNT` (property) | refrence/payload/operatingModePayload.yaml:47,98 vs :198 | Example key ≠ schema property; validates silently (no `additionalProperties:false`) | **Log only** |
| A8 | `get_installed_certificates` (enum, plural) vs `get_installed_certificate.json` (file, singular) | models/iot_commands.v1.1.json enum vs commands/dev_mgmt/get_installed_certificate.json | Naming mismatch — generated `operationId` is singular, dispatch enum is plural | **Log; Phase 5 candidate (align enum→singular)** |
| A9 | `iot_control_cmds` command enum **omits `get_post_filter`** | models/iot_control_cmds.v1.1.json (`[control_operation, set_operating_mode, get_operating_mode, set_post_filter]`) | Enum gap — `get_post_filter` exists as a command file + payload `oneOf` | **Log; Phase 5 candidate (add to enum)** |
| A10 | Control vs dev-mgmt **enum split** across model files | models/iot_commands.v1.1.json (16 dev-mgmt) vs iot_control_cmds.v1.1.json (4 control) | Expected design — control cmds are NOT "undocumented" | **Log only (not a defect)** |
| A11 | `iot_response.payload.oneOf` member list (11 members) | models/iot_response.v1.1.json | readerVersionResponse, deviceStatusResponse, currentRegionResponse, ethResponseSoti, wifiResponseSoti, installedCertResponse, epConfigurationSoti, getWifiResponse, endpointResponse, setConfigResponse, getConfigResponse | **Document the full list** (richer than a "Soti-only" reading) |
| A12 | Duplicate heartbeat schema | refrence/events/heartbeatEvents.yaml + heartbeatEvents_new.yaml | Versioned duplicate pair | **Log only** |
| A13 | `control_operation` / `set_post_filter` command property has **no `example`/`default`** | commands/control/control_operation.json, set_post_filter.json | Generated docs show no command literal for these | **Log; Phase 5 candidate (add example)** |
| A14 | `control_operation.json` / `delete_certificate.json` have **no `required` array** | commands/control/control_operation.json, commands/dev_mgmt/delete_certificate.json | Per-file divergence from the mgmt envelope `required:[command,requestId]` | **Log only** |
| A15 | `requestId` documented as "16 hex digits" but examples use `abc123`/`1233`/`abcd1432` | commands/*/*.json examples | Doc-intent vs example divergence | **Log only — do not "fix" either side** |
| A16 | Named-key (`ctrlOprPayload`, `epConfig`, …) on the wire vs `payload.oneOf` in envelope models | commands/* vs models/iot_commands, iot_control_cmds | Structural divergence — named key is the on-wire shape | **Log only — validate examples against command files** |

**Missing `$ref`s:** **none** (every `$ref` resolves to an existing file; the failures above are syntax errors in *target* files, not missing files). `[verified-from-schema: TEMP/iotc_ground_truth.json missing_refs=[]]`

---

## Open questions for blockers log
1. Device-session attachment never proven this run (broker shows 3 connected MQTT clients but **zero** device-originated traffic on `MDM/clients/resp|event`) — who are the other 2 clients? → connectivity/observability blocker.
2. CTRL/DATA endpoints do not exist live → control-plane & data-plane behavior unverifiable.
3. All TLS/`securityParams`/`verificationType` paths untestable on plain-MQTT/1883.
4. Code↔trigger bindings (which code each operation actually returns) not stated verbatim in `response.yaml` → `[firmware-only-unknown]` (the code→*meaning* table IS in `response.yaml`).
5. `index.html` regeneration blocked (no node/npx) — openapi.json regen unaffected.
6. The YAML syntax defects (A1–A3) imply the committed `index.html` predates these edits or redocly tolerated them — the current sources would fail a clean redocly `build-docs`.
