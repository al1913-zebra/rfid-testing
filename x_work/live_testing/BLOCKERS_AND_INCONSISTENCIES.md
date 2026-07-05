# BLOCKERS & INCONSISTENCIES

> **Run mode:** **MOCK FALLBACK** — canonical LIVE-MDM predicate condition (2) failed (no device-originated response/event). **No `[verified-on-device]` facts exist this run.** Evidence: `phase2-broker.md`.
> Format per entry: **Item | Evidence (path/line) | Why it's blocked / what it is | What would resolve it | Provenance.**

---

## 1. Spec-vs-reality discrepancies (schema internal)

| Item | Evidence (path:line) | What it is | What would resolve it | Provenance |
|------|----------------------|------------|------------------------|------------|
| **Invalid YAML — `properties:` is a scalar string** (FIXED Phase 5) | `refrence/payload/cfgEndpointPayload.yaml:116,133` | `properties: Supports up to 3 publish topics.` then child keys → file would not parse → breaks redocly `build-docs`; `required:[topic,qos,retain]` referenced undefined `topic` | Fixed: proper `properties:` mapping + added `topic` property; "up to N" moved to `description` | `[verified-from-schema]` |
| **Invalid YAML — missing property name (antenna)** (FIXED) | `refrence/response/deviceCapablity.yaml:180` | orphan `type:number/max8/min1` under `properties:` | Fixed: added `port` property name | `[verified-from-schema]` |
| **Invalid YAML — missing property name (eth/wifi status)** (FIXED) | `refrence/events/networkEvent.yaml:18,58` | orphan `example: eth0` / `wlan0` under `properties:`; cascaded to `alertDetails.yaml` → `events/alerts.json` | Fixed: added `interface` property (per `required`) | `[verified-from-schema]` |
| **Enum typo `MQT-TLS`** (FIXED) | `refrence/response/epConfiguration.yaml:27`, `epConfigurationSoti.yaml:32` | should be `MQTT_TLS`; `get_config` example using `MQTT_TLS` failed its own schema | Fixed → `MQTT_TLS` | `[verified-from-schema]` |
| **`response.code` typed as string** (FIXED) | `response/dev_mgmt/get_eth_response.json:33` | `"code":"0"` violates `response.yaml code:integer` | Fixed → `0` | `[verified-from-schema]` |
| **`mqttConnEVT` version fields mistyped** (FIXED) | `events/mqttConnEVT.json` `apiVersion`/`mqttVersion` | typed `number` but values are dotted strings; `3.0999999` float artifact of `3.1`; example used `"3.1.1"` | Fixed: type→`string`; example `3.0999999`→`"3.1.1"`, `1.2`→`"1.2"` | `[verified-from-schema]` |
| **`iot_control_cmds` enum gap** (FIXED) | `models/iot_control_cmds.v1.1.json` | enum omitted `get_post_filter` though the command file + payload `oneOf` exist | Fixed: added `get_post_filter` | `[verified-from-schema]` |
| **`set_post_filter` command property had no literal** (FIXED) | `commands/control/set_post_filter.json:9` | command property lacked enum/example (sibling `control_operation` pins via enum) | Fixed: added `enum:["set_post_filter"]` | `[verified-from-schema]` |
| **`SEEN_COUNT` (examples) vs `SEENCOUNT` (property)** (NOT fixed — log per instruction) | `refrence/payload/operatingModePayload.yaml:47,98` vs `:198` | example metadata key differs from the schema property; validates silently (no `additionalProperties:false`) | Align example key to `SEENCOUNT` OR add the `SEEN_COUNT` property — left as-is per scope | `[verified-from-schema]` |
| **Cert command naming: file singular vs literal plural** (NOT fixed — rename too invasive) | `commands/dev_mgmt/get_installed_certificate.json` (file) vs command literal & `iot_commands` enum `get_installed_certificates` | generated `operationId`/path is singular; dispatch literal is plural | Rename file (changes generated path) or accept; logged | `[verified-from-schema]` |
| **Partial command examples omit required fields** (NOT fixed) | `config_endpoint.json` ex#6/#7, `set_config.json` ex#0–#5, `set_wifi.json` ex#2/#6 | examples demonstrate subsets and omit required `configuration`/`wifiConfig` fields → fail their own schema | Complete the examples or mark them `partial`; logged (was masked before the YAML fix) | `[verified-from-schema]` |
| **Placeholder example values** (NOT fixed) | `operatingModePayload.yaml` (`linkProfile: string`, `mask: string`, `session: S0`), `get_config.json` (`securityParams.algorithm: ToDo`) | placeholder/invalid enum values in examples (`S0` not in `SESSION_0..3`; `string`/`ToDo` not enum members) | Replace placeholders with valid enum values; logged | `[verified-from-schema]` |
| **`status` case mismatches in examples** (NOT fixed) | `get_eth.json` ex#1 (`Disabled` vs enum `disabled`), eth `linkStatus.status` `Connected` | example casing differs from enum | Normalize example casing; logged | `[verified-from-schema]` |
| **Duplicate heartbeat schema** (NOT fixed) | `refrence/events/heartbeatEvents.yaml` + `heartbeatEvents_new.yaml` | versioned duplicate pair; `events/heartBeatEVT.json` refs the non-`_new` one | Consolidate to one; logged | `[verified-from-schema]` |
| **Orphan response files (7)** | `response/dev_mgmt/`: `cloud_connect`, `config_alerts`, `get_capablity`, `get_config_response_soti`, `get_eth_response`, `get_wifi_response_soti`, `set_eth` | response schemas with no matching request command | Add request counterparts or document as response-only; expected per `iot_response.oneOf` design | `[verified-from-schema]` |
| **`requestId` 16-hex-vs-examples divergence** (log, do not fix) | command files describe "16 hex digit identifier"; examples use `abc123`/`1233`/`abcd1432` | doc-intent vs example reality | Decide canonical form; do not silently "fix" either side | `[verified-from-schema]` |
| **Named-key vs `payload.oneOf` divergence** (log, do not fix) | `commands/*/*.json` use named key (`ctrlOprPayload`, `epConfig`…) vs `models/iot_commands`,`iot_control_cmds` wrap in generic `payload.oneOf` | the named-key form is the on-the-wire shape | Document both; treat named key as wire shape | `[verified-from-schema]` |
| **`get_eth_response.json` property name `rspPpayload`** | `response/dev_mgmt/get_eth_response.json:72` | likely typo for `rspPayload`; example uses `ethConfig` key instead, so the `$ref ethResponse.yaml` is never exercised | Rename property / align example; orphan file, low impact; logged | `[verified-from-schema]` |
| **`iot_response.payload.oneOf` full member list (11)** | `models/iot_response.v1.1.json` | `readerVersionResponse, deviceStatusResponse, currentRegionResponse, ethResponseSoti, wifiResponseSoti, installedCertResponse, epConfigurationSoti, getWifiResponse, endpointResponse, setConfigResponse, getConfigResponse` — mixes Soti + plain variants; excludes plain `ethResponse`/`wifiResponse`/`epConfiguration` | Documented in MQTT_API_REFERENCE; not a defect | `[verified-from-schema]` |
| **Control vs dev-mgmt enum split** | `models/iot_commands` (16 dev-mgmt) vs `iot_control_cmds` (5 control after fix) | control commands absent from dev-mgmt enum — by design, NOT "undocumented" | None (design) | `[verified-from-schema]` |

---

## 2. Undocumented / transient topics (from the `#` wildcard capture)

| Item | Evidence | Why | Resolution | Provenance |
|------|----------|-----|------------|------------|
| **No undocumented/transient topics observed** | `wildcard_capture.log` (24 msgs) | Capture showed only `MGMT/clients/{cmnd,resp}` and `CTRL/clients/{cmnd,resp}` — all present in `MQTT_TOPIC_MAP.md`. | n/a | `[verified-via-local-mock: routing/shape only]` |
| **Capture is MOCK-only** | `phase2-broker.md` | On the fallback path the mock only re-emits what test clients publish — `#` validates routing, not firmware-originated traffic. No device-originated `MDM/clients/resp\|event` appeared. | LIVE device session (see §5) | `[verified-via-local-mock]` |

---

## 3. Unexplained / unmapped error codes (within 0–30)

| Item | Evidence | Why | Resolution | Provenance |
|------|----------|-----|------------|------------|
| **All code↔operation bindings are hypotheses** | `refrence/response/response.yaml` (code→*meaning* table is verbatim; code→*operation* binding is NOT) | The schema defines code *meanings* but never binds a code to a specific operation. The per-command subsets in `MQTT_TOPIC_MAP.md`/`MQTT_API_REFERENCE.md` are inferences validated only for *representability* via mock. | A `[verified-on-device]` capture of real `response.code` per command (needs attached device) | `[firmware-only-unknown]` for bindings; `[verified-from-schema]` for meanings |
| **Code 9 "File not found" — no confident operation mapping** | `response.yaml` code 9 | plausibly `set_os` (FW file) or `install_certificate` (cert file), but unstated | Device observation | `[firmware-only-unknown]` |
| **Code 29 "URL missing for HTTP source" — no confident mapping** | `response.yaml` code 29 | plausibly `set_os`/`config_endpoint` HTTP source, but unstated; HTTP source itself is not a handheld-MQTT primitive | Device observation / source page stating it | `[firmware-only-unknown]` |
| **Code 28 "Tag match pattern length exceeded"** | `response.yaml` code 28 | mapped (hypothesis) to `set_post_filter` `matchPattern`; binding unstated | Device observation | `[firmware-only-unknown]` binding |
| **Code 22 "Advanced configuration not set"** | `response.yaml` code 22 | hypothesis: `get/set_operating_mode` when `profiles=ADVANCED` without `advancedConfigurations`; unstated | Device observation | `[firmware-only-unknown]` binding |

---

## 4. Firmware-only unknowns (environment cannot confirm this run)

| Item | Evidence | Why blocked | What would resolve it | Provenance |
|------|----------|-------------|------------------------|------------|
| **Every MDM/management command's real behavior** | device session not attached (`phase2-broker.md`) | the MDM plane is *potentially* observable, but NO command got a device response this run | Attach the RFD40 session (predicate cond. 2) then exercise read-only MDM commands | `[firmware-only-unknown]` |
| **All CTRL control-plane behavior** (inventory via `control_operation`, operating modes, post-filters) | no CTRL endpoint exists live | CTRL endpoint must be added via `config_endpoint` over `MDM/clients/cmnd` first | Add CTRL endpoint + attached session | `[firmware-only-unknown]` |
| **All DATA data-plane behavior** (`dataEVT` tag reads on `.../rfid`) | no DATA endpoint exists live | DATA1/DATA2 endpoint must be added via `config_endpoint` first | Add DATA endpoint + attached session | `[firmware-only-unknown]` |
| **All TLS / `securityParams` / `verificationType` / `install_certificate` verification** | MDM_EP is plain MQTT/1883 | no TLS endpoint (8883) exists; PEM/PFX/`VERIFY_*` paths unexercisable | An MQTT_TLS endpoint (8883) with certs | `[firmware-only-unknown]` |
| **Real `response.code`/payload for any command** | mock returns encoded assumptions | mock codes are self-authored, not firmware truth | Attached device | `[firmware-only-unknown]` |
| **Heartbeat/`mqttConnEVT`/alert emission & intervals** | no device-originated events captured | `config_events` effects unobservable | Attached device + `config_events` | `[firmware-only-unknown]` |

---

## 5. Operational blockers

| Item | Evidence | Why blocked | What would resolve it | Provenance |
|------|----------|-------------|------------------------|------------|
| **DEVICE-SESSION NON-ATTACHMENT (make-or-break this run)** | 18s passive listen: `$SYS clients/connected=3` but 0 app-topic msgs; `get_version`/`get_status` round-trips: 0 responses on `MDM/clients/resp\|event` | A reachable broker port + 3 connected clients does NOT prove the RFD40 processes `MDM/clients/cmnd`. The 2 non-probe clients produced no traffic and are **unidentified**. | Verify (123RFID Desktop) the sled's `MDM_EP` URL = `192.168.1.6:1883` and is **activated**; confirm it connects + subscribes to `MDM/clients/cmnd`; then a read-only `get_version` round-trip should return | `[verified-via-local-mock]` (broker state) |
| **NO network segmentation (favorable), laptop IS the broker host** | `Get-NetIPAddress`: only routable IPv4 = `192.168.1.6/24` (Wi-Fi); `Get-NetRoute` 192.168.1.0/24 on-link | The earlier `10.239.36.0/24` recording is stale; laptop, device, broker all share the Airtel LAN. But because the laptop *is* `.6`, TCP-1883 success is via loopback — not proof of device attachment. | n/a (favorable) — but keep DHCP reservation for `.6` (lease fragility) | `[verified-via-local-mock]` |
| **1883 listener identity** | `Get-NetTCPConnection -LocalPort 1883`: PID 8244 `mosquitto` v2.1.2, anonymous accepted (rc=0) | a real Mosquitto broker holds 1883; anonymous pub/sub allowed | n/a | `[verified-via-local-mock]` |
| **Anonymous auth assumed** | no MQTT username/password supplied; broker accepted anonymous | if the production broker requires auth, live tests fail and `[verified-on-device]` is voided | Provide credentials if required | `[firmware-only-unknown]` |
| **MDM-only live scope** | only `MDM_EP` provisioned; CTRL/DATA absent | no live control/data coverage until endpoints added via `config_endpoint` | Add CTRL/DATA endpoints | `[verified-from-schema]` |
| **Plain MQTT (no TLS)** | `MDM_EP` protocol MQTT/1883 | all TLS paths unverifiable | MQTT_TLS endpoint on 8883 | `[firmware-only-unknown]` |
| **Subnet mask** | `Get-NetIPAddress` PrefixLength **24** for `192.168.1.6` | laptop side confirmed **/24**; device mask still strictly assumed but consistent (on-link ping succeeds) | read device mask via 123RFID Desktop / `get_config` if a non-/24 is ever suspected | `[verified-via-local-mock]` |
| **Multi-homing** | other IPv4s are 169.254.x APIPA (Bluetooth/Ethernet/LAN*) only | not a true second routable network; `192.168.1.6:1883` path uses the Wi-Fi interface | n/a | `[verified-via-local-mock]` |
| **Firewall (laptop-hosted broker)** | 3 clients already connected inbound → inbound TCP 1883 effectively permitted | the device's non-response is NOT a firewall block (other clients connect); a Defender INBOUND allow for 1883 should still be confirmed if the sled cannot connect | confirm Windows Defender INBOUND allow TCP 1883 | `[verified-via-local-mock]` |
| **Device MAC discrepancy (resolved)** | provided `C0:2E:5F:CF:4B:3F` ≈ AP BSSID `c0:2e:5f:cf:4b:40`; ARP for `192.168.1.5` = `8C-D5-4A-1C-98-24` | the provided value is the AP/router, not the sled | trust ARP `8C-D5-4A-1C-98-24` for sled identity | `[verified-via-local-mock]` |
| **`index.html` regeneration BLOCKED** | `node`/`npx`/`redocly` not installed (Phase 0) | redocly `build-docs` + `add_custom_css.py` cannot run locally | install Node ≥16, or rely on CI (which, post-Phase-5, now has valid YAML to build) | `[verified-from-schema]` (env) |
| **`docker` absent** | Phase 0 preflight | no containerized broker fallback needed (local Mosquitto present) | n/a | env |
| **`_meta` dangling links ignored** | per R4 (removed schema mirrors, `governance/*` empty, external `zebradevs.github.io` URLs) | stale capture artifacts, not live sources | n/a | `[verified-from-_meta-knowledge-base]` |
| **External published docs site not verifiable** | `README.md` links `https://friendly-adventure-3jvjew4.pages.github.io/` (not in repo) | GitHub Pages URL not part of the checkout | n/a | `[verified-from-schema: README.md]` |
| **MarkSnip stub pages ignored for facts** | `raw-mqtt-payload-schemas-*`, `operating-modes-schema-*`, `tag-data-events-format-*`, `health-events-format-*`, `batching-and-retention-guide-*` | redirect text + dangling links only | use repo schema as SoT | `[verified-from-_meta-knowledge-base]` |

---

## Remediation options to reach a LIVE device session (none assumed active)
- **(a)** Laptop is already on the Airtel Wi-Fi `192.168.1.0/24` and already *is* `192.168.1.6` hosting Mosquitto. Re-verify via **123RFID Desktop** that `MDM_EP`'s broker URL is `192.168.1.6:1883` and **activated**, confirm a Defender INBOUND allow for TCP 1883, and pin a DHCP reservation for `.6`. Then the sled should attach and respond.
- **(b)** Point the sled at a broker it trusts at `192.168.1.6:1883` and confirm its session attaches.
- **(c)** (in effect) local Mosquitto + paho mock; live-device testing logged as blocked by **device-session non-attachment**.

> The MDM-provisioning prerequisite (device bootstrapped via 123RFID Desktop) is satisfied for `MDM_EP`. The remaining gap is the **runtime MQTT session**, not provisioning.

---

## 6. ON-DEVICE FINDINGS (LIVE this run — supersede the MOCK-era notes above)

Once the RFD40 Premium+ (serial `24190525100255`, firmware `PAAFKS00-013-R02`) attached its MQTT session via endpoint **`MDM_REMOTE`**, the **8 read-only MDM commands were verified live** (`code 0`). Evidence: `live_capture.log`; tabulated in `phase4-validation-report.md` → *Live Device Verification*. Label: `[verified-on-device: RFD40 Premium+ @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]`.

| # | Finding (now `[verified-on-device]`) | Evidence | Spec impact | Resolution |
|---|--------------------------------------|----------|-------------|------------|
| L1 | **Topics are tenant-prefixed AND serial-suffixed**: configured base `MDM/clients/cmnd` → on-wire `zebra/MDM/clients/cmnd/RFD40-24190525100255` = `{tenantId}/{base}/{serialNumber}` | `live_capture.log` (responses arrived only on the wrapped topic); `get_endpoint_config` shows base topics `MDM/clients/*` | **Contradicts** the earlier "topics carry NO tenant prefix" assumption. Document the wrapping rule. | Update topic docs to the real `{tenantId}/{base}/{serial}` form |
| L2 | **`apiVersion: "V1.21"`** returned by get_version/get_status/get_config; `V1.1` by the others | `live_capture.log` | `apiVersion` enum is documented `[V1.0, V1.1]`; **`V1.21` is undocumented** and responses are **inconsistent** across commands | Add `V1.21` to the `apiVersion` enum in response models, or treat as free-form version string |
| L3 | **`verificationType: "VERIFY_NONE"`** in the live `MDM_REMOTE` config | `get_endpoint_config` response | Documented enum is `[NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER]`; **`VERIFY_NONE` is undocumented** | Add `VERIFY_NONE` to the `verificationType` enum (or reconcile NONE↔VERIFY_NONE) |
| L4 | **`get_eth` status `"Disabled"`** (capitalized) | `live_capture.log` | Confirms the schema enum `[enabled, disabled]` casing is wrong (matches the flagged example) | Fix the eth `status` enum casing to match firmware (`Enabled`/`Disabled`) |
| L5 | **`get_installed_certificates` (plural) accepted, `code 0`** | `live_capture.log` | **Resolves A8**: the plural command literal is correct on-device; the singular *filename* (`get_installed_certificate.json`) is the mismatch | Rename the command file to plural, or accept the divergence |
| L6 | **`code 25` "Max 3 publish topics" is GLOBAL, not per-endpoint** | `config_endpoint add` for CTRL (2 topics → 25) and a retry with **1** topic (→ 25), while `MDM_REMOTE` holds 3 publish topics | **Contradicts** the documented per-endpoint limit; blocks adding CTRL/DATA1 via MQTT while `MDM_REMOTE` consumes the budget | Provision CTRL/DATA1 via 123RFID Desktop (manages the budget atomically); or free publish-topic slots from `MDM_REMOTE` (risks the management channel) |
| L7 | **`eventConfiguration` object** (the real `config_events` shape): `{terminalConnection, firmwareUpdate, network, ntp, heartbeat, power, battery, fileDownload}` booleans — **all `false`** | `get_endpoint_config` response | Explains why the device emitted **no heartbeats/events** during passive listens (all event classes disabled) | Enable via `config_events` to observe events live |
| L8 | **Real `mqttParams`**: `keepAlive 40, cleanSession false, reconnectDelayMin 5, reconnectDelayMax 500`; `password` masked `xxxxxx` | `get_endpoint_config` response | Confirms `cfgEndpointPayload.mqttParams` fields; device masks secrets in responses | n/a (informational) |
| L9 | **Device WiFi MAC `8C:D5:4A:1C:98:24`** (from `get_wifi`) | `live_capture.log` | **Confirms** the ARP-resolved sled MAC (not the provided `C0:2E:5F:CF:4B:3F`, which is the AP) | Resolved |

### Still `[firmware-only-unknown]` (NOT resolved this run)
- **Control plane** (`control_operation` start/stop inventory, `get/set_operating_mode`, `get/set_post_filter`) and **data plane** (`dataEVT` tag reads) — **CTRL/DATA1 could not be provisioned** (blocked by L6's global publish-topic limit), so none were exercised. A brief inventory was authorized but had no live CTRL endpoint to drive it.
- All **MQTT_TLS / `securityParams` / certificate-verification** paths — `MDM_REMOTE` is plain MQTT/1883.
- Real `response.code` for any **error/negative** path on a live command (only `code 0` success paths were exercised read-only).
- The general **code↔trigger binding** for codes other than the live `0`/`25` observed.
