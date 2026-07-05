# Phase 4 — Command Validation Report

- **Run mode:** MOCK (local broker reachable; device NOT attached)
- **Broker:** 192.168.1.6:1883 (local Mosquitto; anonymous)
- **Device session:** NOT attached this run -> **no `[verified-on-device]`** labels.
- **In-memory schema validation:** 95 example(s) valid, 13 invalid, 0 schema-resolve error(s).
- **Broker mock round-trips:** 13 pass, 0 fail (routing/shape only — `[verified-via-local-mock]`).

> **Honesty reframe:** mock response codes are ASSUMPTIONS encoded in the harness, not firmware truth. Passing rows prove envelope/topic round-trip + code representability only. CTRL/DATA-plane and all TLS paths remain `[firmware-only-unknown]`.

| Operation | Test | Topic | Sent | Expected | Observed | Result | Provenance |
|-----------|------|-------|------|----------|----------|--------|------------|
| control_operation.json | example#0 vs schema | commands/control/control_operation.json | example | valid | valid | PASS | [verified-from-schema] |
| control_operation.json | example#1 vs schema | commands/control/control_operation.json | example | valid | valid | PASS | [verified-from-schema] |
| get_operating_mode.json | example#0 vs schema | commands/control/get_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| get_post_filter.json | example#0 vs schema | commands/control/get_post_filter.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#0 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#1 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#2 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#3 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#4 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#5 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#6 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#7 vs schema | commands/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_post_filter.json | example#0 vs schema | commands/control/set_post_filter.json | example | valid | valid | PASS | [verified-from-schema] |
| set_post_filter.json | example#1 vs schema | commands/control/set_post_filter.json | example | valid | valid | PASS | [verified-from-schema] |
| set_post_filter.json | example#2 vs schema | commands/control/set_post_filter.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#0 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#1 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#2 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#3 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#4 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#5 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#6 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | INVALID: 'protocol' is a required property | FAIL | [verified-from-schema] |
| config_endpoint.json | example#7 vs schema | commands/dev_mgmt/config_endpoint.json | example | valid | INVALID: 'activate' is a required property | FAIL | [verified-from-schema] |
| config_events.json | example#0 vs schema | commands/dev_mgmt/config_events.json | example | valid | valid | PASS | [verified-from-schema] |
| config_events.json | example#1 vs schema | commands/dev_mgmt/config_events.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_certificate.json | example#0 vs schema | commands/dev_mgmt/delete_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_certificate.json | example#1 vs schema | commands/dev_mgmt/delete_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_certificate.json | example#2 vs schema | commands/dev_mgmt/delete_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_wifi_profile.json | example#0 vs schema | commands/dev_mgmt/delete_wifi_profile.json | example | valid | valid | PASS | [verified-from-schema] |
| get_endpoint_config.json | example#0 vs schema | commands/dev_mgmt/get_endpoint_config.json | example | valid | valid | PASS | [verified-from-schema] |
| get_endpoint_config.json | example#1 vs schema | commands/dev_mgmt/get_endpoint_config.json | example | valid | valid | PASS | [verified-from-schema] |
| install_certificate.json | example#0 vs schema | commands/dev_mgmt/install_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| install_certificate.json | example#1 vs schema | commands/dev_mgmt/install_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| install_certificate.json | example#2 vs schema | commands/dev_mgmt/install_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| install_certificate.json | example#3 vs schema | commands/dev_mgmt/install_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| install_certificate.json | example#4 vs schema | commands/dev_mgmt/install_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#0 vs schema | commands/dev_mgmt/set_config.json | example | valid | INVALID: 'interfaceName' is a required property | FAIL | [verified-from-schema] |
| set_config.json | example#1 vs schema | commands/dev_mgmt/set_config.json | example | valid | INVALID: 'interfaceName' is a required property | FAIL | [verified-from-schema] |
| set_config.json | example#2 vs schema | commands/dev_mgmt/set_config.json | example | valid | INVALID: 'protocol' is a required property | FAIL | [verified-from-schema] |
| set_config.json | example#3 vs schema | commands/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#4 vs schema | commands/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#5 vs schema | commands/dev_mgmt/set_config.json | example | valid | INVALID: 'interfaceName' is a required property | FAIL | [verified-from-schema] |
| set_os.json | example#0 vs schema | commands/dev_mgmt/set_os.json | example | valid | valid | PASS | [verified-from-schema] |
| set_os.json | example#1 vs schema | commands/dev_mgmt/set_os.json | example | valid | valid | PASS | [verified-from-schema] |
| set_os.json | example#2 vs schema | commands/dev_mgmt/set_os.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#0 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#1 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#2 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | INVALID: 'interfaceName' is a required property | FAIL | [verified-from-schema] |
| set_wifi.json | example#3 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#4 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#5 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#6 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | INVALID: 'connect' is a required property | FAIL | [verified-from-schema] |
| set_wifi.json | example#7 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#8 vs schema | commands/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| control_operation.json | example#0 vs schema | response/control/control_operation.json | example | valid | valid | PASS | [verified-from-schema] |
| get_operating_mode.json | example#0 vs schema | response/control/get_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| get_post_filter.json | example#0 vs schema | response/control/get_post_filter.json | example | valid | valid | PASS | [verified-from-schema] |
| set_operating_mode.json | example#0 vs schema | response/control/set_operating_mode.json | example | valid | valid | PASS | [verified-from-schema] |
| set_post_filter.json | example#0 vs schema | response/control/set_post_filter.json | example | valid | valid | PASS | [verified-from-schema] |
| config_endpoint.json | example#0 vs schema | response/dev_mgmt/config_endpoint.json | example | valid | valid | PASS | [verified-from-schema] |
| config_events.json | example#0 vs schema | response/dev_mgmt/config_events.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_certificate.json | example#0 vs schema | response/dev_mgmt/delete_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_wifi_profile.json | example#0 vs schema | response/dev_mgmt/delete_wifi_profile.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_wifi_profile.json | example#1 vs schema | response/dev_mgmt/delete_wifi_profile.json | example | valid | valid | PASS | [verified-from-schema] |
| delete_wifi_profile.json | example#2 vs schema | response/dev_mgmt/delete_wifi_profile.json | example | valid | valid | PASS | [verified-from-schema] |
| get_capablity.json | example#0 vs schema | response/dev_mgmt/get_capablity.json | example | valid | valid | PASS | [verified-from-schema] |
| get_config.json | example#0 vs schema | response/dev_mgmt/get_config.json | example | valid | INVALID: 'payload' is a required property | FAIL | [verified-from-schema] |
| get_current_region.json | example#0 vs schema | response/dev_mgmt/get_current_region.json | example | valid | valid | PASS | [verified-from-schema] |
| get_endpoint_config.json | example#0 vs schema | response/dev_mgmt/get_endpoint_config.json | example | valid | valid | PASS | [verified-from-schema] |
| get_endpoint_config.json | example#1 vs schema | response/dev_mgmt/get_endpoint_config.json | example | valid | valid | PASS | [verified-from-schema] |
| get_eth.json | example#0 vs schema | response/dev_mgmt/get_eth.json | example | valid | valid | PASS | [verified-from-schema] |
| get_eth.json | example#1 vs schema | response/dev_mgmt/get_eth.json | example | valid | INVALID: 'hostname' is a required property | FAIL | [verified-from-schema] |
| get_eth_response.json | example#0 vs schema | response/dev_mgmt/get_eth_response.json | example | valid | valid | PASS | [verified-from-schema] |
| get_eth_response.json | example#1 vs schema | response/dev_mgmt/get_eth_response.json | example | valid | valid | PASS | [verified-from-schema] |
| get_installed_certificate.json | example#0 vs schema | response/dev_mgmt/get_installed_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| get_status.json | example#0 vs schema | response/dev_mgmt/get_status.json | example | valid | INVALID: 'hostname' is a required property | FAIL | [verified-from-schema] |
| get_version.json | example#0 vs schema | response/dev_mgmt/get_version.json | example | valid | valid | PASS | [verified-from-schema] |
| get_wifi.json | example#0 vs schema | response/dev_mgmt/get_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| get_wifi.json | example#1 vs schema | response/dev_mgmt/get_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| get_wifi.json | example#2 vs schema | response/dev_mgmt/get_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| get_wifi.json | example#3 vs schema | response/dev_mgmt/get_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| install_certificate.json | example#0 vs schema | response/dev_mgmt/install_certificate.json | example | valid | valid | PASS | [verified-from-schema] |
| reboot.json | example#0 vs schema | response/dev_mgmt/reboot.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#0 vs schema | response/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#1 vs schema | response/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#2 vs schema | response/dev_mgmt/set_config.json | example | valid | INVALID: 'protocol' is a required property | FAIL | [verified-from-schema] |
| set_config.json | example#3 vs schema | response/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#4 vs schema | response/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_config.json | example#5 vs schema | response/dev_mgmt/set_config.json | example | valid | valid | PASS | [verified-from-schema] |
| set_os.json | example#0 vs schema | response/dev_mgmt/set_os.json | example | valid | valid | PASS | [verified-from-schema] |
| set_wifi.json | example#0 vs schema | response/dev_mgmt/set_wifi.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#0 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#1 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#2 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#3 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#4 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#5 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#6 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alert_short.json | example#7 vs schema | events/alert_short.json | example | valid | valid | PASS | [verified-from-schema] |
| alerts.json | example#0 vs schema | events/alerts.json | example | valid | INVALID: {'batteryAlert': {'status': 'CHARGING', 'stateOfHealth': 'GOOD', 'chargePercenta | FAIL | [verified-from-schema] |
| alerts.json | example#1 vs schema | events/alerts.json | example | valid | valid | PASS | [verified-from-schema] |
| alerts.json | example#2 vs schema | events/alerts.json | example | valid | valid | PASS | [verified-from-schema] |
| alerts.json | example#3 vs schema | events/alerts.json | example | valid | valid | PASS | [verified-from-schema] |
| alerts.json | example#4 vs schema | events/alerts.json | example | valid | valid | PASS | [verified-from-schema] |
| dataEVT.json | example#0 vs schema | events/dataEVT.json | example | valid | valid | PASS | [verified-from-schema] |
| heartBeatEVT.json | example#0 vs schema | events/heartBeatEVT.json | example | valid | valid | PASS | [verified-from-schema] |
| mqttConnEVT.json | example#0 vs schema | events/mqttConnEVT.json | example | valid | valid | PASS | [verified-from-schema] |
| mqttConnEVT.json | example#1 vs schema | events/mqttConnEVT.json | example | valid | valid | PASS | [verified-from-schema] |
| get_version | positive envelope | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "get_version", "requestId": "0000000 | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| get_status | positive envelope | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "get_status", "requestId": "00000000 | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| get_endpoint_config | positive envelope | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "get_endpoint_config", "requestId":  | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| control_operation | positive envelope | CTRL/clients/cmnd -> CTRL/clients/resp | {"command": "control_operation", "requestId": "0 | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| get_operating_mode | positive envelope | CTRL/clients/cmnd -> CTRL/clients/resp | {"command": "get_operating_mode", "requestId": " | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| set_operating_mode | positive envelope | CTRL/clients/cmnd -> CTRL/clients/resp | {"command": "set_operating_mode", "requestId": " | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| config_endpoint | positive envelope | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "config_endpoint", "requestId": "000 | code=0, rid echoed, well-formed | code=0, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| set_operating_mode | negative: bad enum -> 23 | CTRL/clients/cmnd -> CTRL/clients/resp | {"command": "set_operating_mode", "requestId": " | code=23, rid echoed, well-formed | code=23, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| set_post_filter | negative: >32 prefilters -> 24 | CTRL/clients/cmnd -> CTRL/clients/resp | {"command": "set_post_filter", "requestId": "000 | code=24, rid echoed, well-formed | code=24, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| config_endpoint | negative: >3 publishTopics -> 25 | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "config_endpoint", "requestId": "000 | code=25, rid echoed, well-formed | code=25, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| config_endpoint | negative: >1 subscribeTopic -> 26 | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "config_endpoint", "requestId": "000 | code=26, rid echoed, well-formed | code=26, rid=ok, env=ok | PASS | [verified-via-local-mock] |
| get_version | negative: missing requestId -> 2 | MGMT/clients/cmnd (connector-unit) | {"command": "get_version"} | code=2 | code=2 | PASS | [verified-via-local-mock] |
| (unknown) | negative: unknown command -> 23 | MGMT/clients/cmnd -> MGMT/clients/resp | {"command": "no_such_cmd", "requestId": "0000000 | code=23, rid echoed, well-formed | code=23, rid=ok, env=ok | PASS | [verified-via-local-mock] |

---

## Live Device Verification — `[verified-on-device]`

After the MOCK run, the physical **RFD40 Premium+** attached its MQTT session to the broker (`192.168.1.6:1883`, anonymous) via endpoint **`MDM_REMOTE`**. The operator supplied the real topic format. Evidence: `live_capture.log`.

- **Real on‑wire topics:** `zebra/MDM/clients/cmnd/RFD40-24190525100255` (publish requests), `zebra/MDM/clients/resp/RFD40-24190525100255` (responses) — i.e. **`{tenantId}/{configured-base}/{serialNumber}`**. The device wraps the configured base topic `MDM/clients/cmnd` with the `zebra` tenant prefix and the `RFD40-24190525100255` serial suffix.
- **Device identity** (from `get_version`): serial `24190525100255`, firmware `PAAFKS00-013-R02`, SKU `RFD4031-G10B700-E8`, scannerFirmware `PAAEOC20-003-R01`, radioFirmware `2.0.53.0`, model `RFD40`, MAC `8C:D5:4A:1C:98:24`, region India/ETSI.
- Label used: `[verified-on-device: RFD40 Premium+ @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]`.

### MDM read‑only command set — real responses

| Operation | Topic (cmnd → resp) | response.code | apiVersion | Response payload key | Provenance |
|-----------|--------------------|---------------|------------|----------------------|------------|
| get_version | zebra/MDM/clients/cmnd→resp/RFD40-24190525100255 | **0** Success | **V1.21** | readerVersion | [verified-on-device] |
| get_status | ″ | **0** Success | **V1.21** | deviceStatus (powerSource USB, radio INACTIVE/DISCONNECTED, ntp, terminalConnection USB, batteryStatus LI‑ION GOOD 100% cap 6093/6400) | [verified-on-device] |
| get_config | ″ | **0** Success | **V1.21** | currentConfig (readerVersion+deviceStatus+currentRegion+ethConfig+wifiConfig) | [verified-on-device] |
| get_endpoint_config | ″ | **0** Success | V1.1 | endpointResponse (active=`MDM_REMOTE(MDM)`, saved=[MDM_REMOTE]) | [verified-on-device] |
| get_current_region | ″ | **0** Success | V1.1 | currentRegion (India, ETSI, ch 865700–867500, maxTx 30) | [verified-on-device] |
| get_wifi | ″ | **0** Success | V1.1 | wifiProfiles (wlan0, essid Airtel_The_LAN_Before_Time, CONNECTED, WPA2Personal, 192.168.1.5/24, domain zebra.com, password masked) | [verified-on-device] |
| get_eth | ″ | **0** Success | V1.1 | ethConfig (eth0, status **"Disabled"**) | [verified-on-device] |
| get_installed_certificates | ″ | **0** Success | V1.1 | installedCerts `{}` (empty) | [verified-on-device] |

### CTRL/DATA1 provisioning attempt — real responses

| Operation | Sent | response.code | Meaning | Provenance |
|-----------|------|---------------|---------|------------|
| config_endpoint (add CTRL, 2 pub topics) | epConfig{add, epType CTRL,…} | **25** | Max 3 publish topics exceeded | [verified-on-device] |
| config_endpoint (add DATA1, 2 pub topics) | epConfig{add, epType DATA1,…} | **25** | Max 3 publish topics exceeded | [verified-on-device] |
| config_endpoint (add CTRL, **1** pub topic) | epConfig{add, epType CTRL,…} | **25** | Max 3 publish topics exceeded (confirms **global** limit) | [verified-on-device] |
| get_endpoint_config (post‑attempt) | — | 0 | active endpoints still only `MDM_REMOTE` | [verified-on-device] |

> **Control plane (`control_operation`, operating modes, post‑filters) and data plane (`dataEVT`) remain `[firmware-only-unknown]`** — CTRL/DATA1 could not be provisioned (the firmware's publish‑topic budget is fully consumed by `MDM_REMOTE`). A brief inventory was authorized but could not run without a live CTRL endpoint.

### On‑device discrepancies (vs. schema) — see `BLOCKERS_AND_INCONSISTENCIES.md`

- `apiVersion: "V1.21"` returned by get_version/get_status/get_config (others return `V1.1`) — **not in the documented enum `[V1.0, V1.1]`**, and inconsistent across commands.
- `verificationType: "VERIFY_NONE"` in the live endpoint config — **not in the documented enum `[NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER]`**.
- Topics are **tenant‑prefixed + serial‑suffixed** (contradicts the "no tenant prefix" assumption).
- `get_eth` status `"Disabled"` (capitalized) — confirms the schema enum `[enabled, disabled]` casing is wrong.
- `get_installed_certificates` (plural) accepted (`code 0`) — confirms the **plural** command literal is correct on‑device; the singular *filename* is the mismatch.
- `code 25` ("Max 3 publish topics") is enforced **globally**, not per‑endpoint as documented.
