# Command: get_status

## 1. Intent & Objective

`get_status` is a **device-management (dev_mgmt)** command for the Zebra handheld RFID sleds (RFD40 / RFD90 family) that retrieves a point-in-time snapshot of the reader's operational health. It is an MQTT-only request/response operation: the controlling application publishes a small request envelope on the management **command** topic and the reader returns a single `deviceStatus` payload on the management **response** topic. [verified-from-schema: commands/dev_mgmt/get_status.json — `description`: "This command used to retrieve the reader status information."]

**What it reports.** The response aggregates the reader's current state across several health domains:

- **Power** — the active power source (`powerSource`). [verified-from-schema: refrence/response/deviceStatusResponse.yaml — `powerSource` enum DC / WALLCHARGER / USB / CRADLE]
- **RFID radio** — whether the radio is active and whether it is connected (`radioActivity`, `radioConnection`). [verified-from-schema: deviceStatusResponse.yaml — `radioActivity`, `radioConnection`]
- **System / time** — device system time and NTP synchronization quality (`systemTime`, `ntp.offset`, `ntp.reach`), and device temperature (`temperature`). [verified-from-schema: deviceStatusResponse.yaml]
- **Terminal connection** — the host-terminal link to the sled and its transport (`terminalConnection.status`, `terminalConnection.type` = BLUETOOTH / CIO / USB). [verified-from-schema: deviceStatusResponse.yaml — `terminalConnection`]
- **Battery** — a detailed battery report (manufacture date, cycle count, full-charge/design/remaining capacity, temperature, chemistry, state of health, charge percentage, charge status). [verified-from-schema: deviceStatusResponse.yaml — `batteryStatus`]

**When an application uses it.** A monitoring or MDM application issues `get_status` to poll a sled on demand (for example before starting an inventory, when a battery-low alert fires, or during fleet health audits) rather than waiting for periodic async heartbeat/alert events. Conceptually this is the "Control → Events / Monitor Health Status" side of the IoT Connector for sleds: the same status domains that are also pushed asynchronously (Power source USB/Wall charger/Cradle, Temperature, Network status, Battery, Heartbeat) are here returned synchronously in response to a direct query. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md — "IoT Connector → Monitoring Sleds" Control column lists Power source (USB, Wall charger, Cradle), Temperature, Network Status, Battery, Heartbeat (Inventory, Battery); "RFID Sleds → System" lists Current Time, NTP sync status, Temperature, Power, Terminal Connection (Bluetooth, Cradle, eConnex), and API version.]

> Note on the grounding page: its "Fixed Reader" / FXR90 / ATR7000 columns and the REST/Azure/AWS/WebSocket transport matrix describe fixed-reader IoT Connector behavior and do **not** apply to the RFD40/RFD90 sled `get_status` command, which is MQTT-only. Only the **RFID Sleds** and **Monitoring Sleds** concepts above are used here.

**Architectural context.** `get_status` is routed over the reader's configured **management (MGMT/MDM) endpoint**. The application provisions an IoT endpoint of type **MDM** on the device (via 123RFID Desktop/Mobile) with a broker URL, port, protocol, and the MQTT publish/subscribe topics; the reader then auto-connects to that MQTT broker and listens for management commands. [verified-from-_meta-knowledge-base: reader-health-monitoring-and-gen2x.md — "Device Provisioning → Configure IoT Endpoint": "For generic IOT solution select type MDM", configure URL, Protocol, Port, Verification type, MQTT publish & subscription topics; "Discover & Connect: Reader automatically connects to IOT Endpoint (MQTT broker)".]

**Live observation.** On this run the device returned `response.code = 0` ("Success") with a populated `deviceStatus`: power source `USB`, RFID radio `INACTIVE` and `DISCONNECTED`, a `CONNECTED` `USB` terminal connection, and a healthy battery at 99 % (`stateOfHealth: GOOD`). The reported `apiVersion` was `V1.21`. These are the only facts the captured response payload substantiates; the deviceStatus values and the result code/description are detailed in Sections 4 and 5. [verified-on-device: the live response JSON above — `response.code = 0`, `description = "Success"`, `apiVersion = "V1.21"`, and the deviceStatus field values]

> Run-environment / transport facts for this run — device serial `24190525100255`, firmware `PAAFKS00-013-R02`, model `RFD40 Premium+`, device IP `192.168.1.5`, endpoint name `MDM_REMOTE`, broker `192.168.1.6:1883`, and plain/anonymous MQTT — are NOT present in the captured response payload and therefore cannot be attested by it. They are recorded here from the test harness only. [verified-from-test-harness: run-environment metadata, not present in the response payload]

---

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `{tenantId}/{base}/{serial}` over the configured MDM command base (e.g. `MDM/clients/cmnd`) | not specified in operation schema (per endpoint `mqttParams`) | not specified in operation schema (per endpoint `mqttParams`) |
| Subscribe (Response) | parallel response base (e.g. `MDM/clients/resp`) wrapped the same way | not specified in operation schema (per endpoint `mqttParams`) | not specified in operation schema (per endpoint `mqttParams`) |

**Topic structure (transport-level, not in this command's payload).** The configured base command topic (for example `MDM/clients/cmnd`) is wrapped as `{tenantId}/{base}/{serial}`; on the harness used for this run that resolves to `zebra/MDM/clients/cmnd/RFD40-24190525100255` for the command and the parallel `zebra/MDM/clients/resp/RFD40-24190525100255` for the response, with `tenantId = zebra` and `serial = RFD40-24190525100255`. Neither the request schema nor the response schema defines any topic, tenant, serial, or message-count field, and the captured response JSON contains none of these, so the topic strings, the tenant/serial values, and the "one response per request" delivery behaviour cannot be tied to this command by the response payload — they are recorded from the broker/endpoint configuration only. [verified-from-test-harness: MQTT broker trace / endpoint configuration — topic strings, tenantId, serial, and message count, none present in the response payload or in commands/dev_mgmt/get_status.json or response/dev_mgmt/get_status.json] [firmware-only-unknown: the on-wire topic-wrapping rule is not declared in any provided schema]

**QoS / Retain.** The `get_status` operation schemas define no per-operation QoS or retain flag; these are governed by the endpoint's `cfgEndpointPayload.mqttParams` configuration, not by this command. The grounding page notes MQTT QoS levels are available in general (QoS 0 fire-and-forget, QoS 1 at-least-once, QoS 2 exactly-once) but does not bind a specific level to `get_status`. [verified-from-schema: commands/dev_mgmt/get_status.json and response/dev_mgmt/get_status.json contain no QoS/retain keys] [verified-from-_meta-knowledge-base: reader-health-monitoring-and-gen2x.md — "Best Practices → MQTT: QoS 0/1/2".]

---

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | request root | string | **Required** | example `get_status` (no `enum` defined in schema) | The command to execute to retrieve reader status information. [verified-from-schema: commands/dev_mgmt/get_status.json — `properties.command`, `required`] |
| `requestId` | request root | string | **Required** | example `abcd123` (no length/pattern constraint in schema) | A unique identifier for the request, enabling tracking and debugging; echoed back unchanged in the response. [verified-from-schema: commands/dev_mgmt/get_status.json — `properties.requestId`, `required`] |

Notes:
- There is **no `payload` key** for this command — the request body consists solely of `command` and `requestId`. [verified-from-schema: commands/dev_mgmt/get_status.json — only two `properties`]
- There is **no `auth` block** (no `auth.user` / `auth.password`); broker credentials, when used, live in the endpoint's `mqttParams`, not in the command payload. [verified-from-schema: commands/dev_mgmt/get_status.json defines no `auth` property]
- **requestId format note (informational):** the schema gives the example `abcd123` and imposes `type: string` only — no hex or fixed-length constraint — so any string is schema-valid. [verified-from-schema: commands/dev_mgmt/get_status.json — `requestId` has `type: string` only]
- The request sent on this run was `{"command":"get_status","requestId":"abcd123"}`. The response echoed `requestId` back unchanged as `abcd123`, confirming the round-trip; the request body is schema-valid against the request schema. [verified-on-device: the live response echoed `requestId = "abcd123"`] [verified-from-schema: commands/dev_mgmt/get_status.json — both `command` and `requestId` are `type: string` and both required]

### JSON Request Example
```json
{ "command": "get_status", "requestId": "abcd123" }
```

---

## 4. Response Payload Breakdown

Top-level response fields (from `response/dev_mgmt/get_status.json`):

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | response root | string | **Required** | example `get_status` | [verified-on-device] (returned `"get_status"`) | The command that was executed to retrieve the device status. |
| `requestId` | response root | string | **Required** | example `abc123` | [verified-on-device] (returned `"abcd123"`, echoing the request) | The unique identifier of the original request. |
| `apiVersion` | response root | string | **Required** | schema enum `[V1.0, V1.1]` | [verified-on-device] (returned `"V1.21"` — **NOT in schema enum**, see D1) | The API/firmware schema version the device reports. |
| `deviceStatus` | response root | object | Optional (not in `required`) | `$ref` deviceStatusResponse.yaml | [verified-on-device] (object returned) | Container for the device status snapshot (power, radio, time, NTP, terminal, battery). |
| `response` | response root | object | **Required** | `$ref` response.yaml (`code`, `description`) | [verified-on-device] (`code: 0`, `description: "Success"`) | Standard result object with status code and description. |

[verified-from-schema: response/dev_mgmt/get_status.json — `properties`, `required: [command, requestId, apiVersion, response]`]

`deviceStatus` object fields (from `refrence/response/deviceStatusResponse.yaml`):

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `powerSource` | deviceStatus | string | **Required** (in schema `required`) | enum `DC / WALLCHARGER / USB / CRADLE` | [verified-on-device] (returned `"USB"`) | The source of power for the device. |
| `radioActivity` | deviceStatus | string | **Required** | enum `INACTIVE / ACTIVE` | [verified-on-device] (returned `"INACTIVE"`) | Activity status of the device's RFID radio. |
| `radioConnection` | deviceStatus | string | **Required** | enum `CONNECTED / DISCONNECTED` | [verified-on-device] (returned `"DISCONNECTED"`) | Connection status of the device's RFID radio. |
| `hostname` | deviceStatus | string | **Required** (in schema `required`) | example `RFD40-212735201D0053.local` | [verified-from-schema] (defined & required in schema but **OMITTED** by the live device, see D2) | The hostname of the device on the network. |
| `systemTime` | deviceStatus | string | **Required** (listed in `required` as `systemTime`) | schema property key is `"systemTime "` (trailing space) with `format: time`; example `2022-07-01T03:01:31.464Z` | [verified-on-device] (returned key `"systemTime"`, value `"2026-06-12T15:28:37.971Z"`) | The device system time in ISO 8601 format. See D3 — the trailing-space property key both prevents the type/format definition from binding to the real field and makes the `required: systemTime` constraint permanently unsatisfiable. |
| `temperature` | deviceStatus | integer | **Required** (in schema `required`) | example `32` (degrees Celsius) | [verified-from-schema] (defined & required at deviceStatus top level but **OMITTED** by the live device; temperature appears only inside `batteryStatus`, see D2) | The current device temperature in degrees Celsius. |
| `ntp` | deviceStatus | object | Optional | — | [verified-on-device] (object returned) | NTP synchronization details. |
| `ntp.offset` | deviceStatus.ntp | integer | Optional | example `120` (milliseconds) | [verified-on-device] (returned `0`) | Offset in ms between device clock and NTP server. |
| `ntp.reach` | deviceStatus.ntp | integer | Optional | example `321` | [verified-on-device] (returned `0`) | Reachability score of the NTP server. |
| `terminalConnection` | deviceStatus | object | Optional | — | [verified-on-device] (object returned) | Terminal (host) connection details. |
| `terminalConnection.status` | deviceStatus.terminalConnection | string | Optional | enum `CONNECTED / DISCONNECTED` | [verified-on-device] (returned `"CONNECTED"`) | Connection status of the terminal. |
| `terminalConnection.type` | deviceStatus.terminalConnection | string | Optional | enum `BLUETOOTH / CIO / USB` | [verified-on-device] (returned `"USB"`) | The transport type of the terminal connection. |
| `batteryStatus` | deviceStatus | object | Optional | — | [verified-on-device] (object returned) | Battery status information. |
| `batteryStatus.mfgDate` | deviceStatus.batteryStatus | string | Optional | example `2024-01-15` | [verified-on-device] (returned `"19APR2024"` — type-valid, format divergence, see D4) | The battery manufacture date. |
| `batteryStatus.cycleCount` | deviceStatus.batteryStatus | integer | Optional | example `120` | [verified-on-device] (returned `24`) | Number of completed charge cycles. |
| `batteryStatus.fullChargeCapacity` | deviceStatus.batteryStatus | integer | Optional | example `3200` (mAh) | [verified-on-device] (returned `6149`) | Current full-charge capacity in mAh. |
| `batteryStatus.temperature` | deviceStatus.batteryStatus | integer | Optional | example `32` (°C) | [verified-on-device] (returned `29`) | Battery temperature in degrees Celsius. |
| `batteryStatus.designCapacity` | deviceStatus.batteryStatus | integer | Optional | example `7000` (mAh) | [verified-on-device] (returned `6400`) | Designed battery capacity in mAh. |
| `batteryStatus.batteryType` | deviceStatus.batteryStatus | string | Optional | example `Li-ion` | [verified-on-device] (returned `"LI-ION"` — type-valid, casing divergence, see D4) | Battery chemistry/type. |
| `batteryStatus.capacity` | deviceStatus.batteryStatus | integer | Optional | example `5000` (mAh) | [verified-on-device] (returned `6087`) | Remaining battery capacity in mAh. |
| `batteryStatus.stateOfHealth` | deviceStatus.batteryStatus | string | Optional | enum `GOOD / AVERAGE / POOR` | [verified-on-device] (returned `"GOOD"`) | Overall battery health. |
| `batteryStatus.chargePercentage` | deviceStatus.batteryStatus | integer | Optional | example `23` | [verified-on-device] (returned `99`) | Percentage of charge remaining. |
| `batteryStatus.chargeStatus` | deviceStatus.batteryStatus | integer | Optional | `0` = charger not connected; `1` = charger connected, charging; `2` = charger connected, battery 100% | [verified-on-device] (returned `0` — charger not connected) | Battery charging status. |

[verified-from-schema: refrence/response/deviceStatusResponse.yaml — `properties`, enums, examples, and `required: [powerSource, radioActivity, radioConnection, hostname, systemTime, temperature]`]

Field-presence summary for the live response:
- **Present in live response ([verified-on-device]):** `powerSource`, `radioActivity`, `radioConnection`, `systemTime`, `ntp` (`offset`, `reach`), `terminalConnection` (`status`, `type`), and all returned `batteryStatus` members (`mfgDate`, `cycleCount`, `fullChargeCapacity`, `temperature`, `designCapacity`, `batteryType`, `capacity`, `stateOfHealth`, `chargePercentage`, `chargeStatus`).
- **Defined in schema but NOT returned live ([verified-from-schema]):** `hostname` and top-level `deviceStatus.temperature` — both are in the schema's `required` list yet absent from the device response (see Discrepancy D2).

### JSON Response Example (LIVE, verbatim)
```json
{
  "command": "get_status",
  "requestId": "abcd123",
  "apiVersion": "V1.21",
  "deviceStatus": {
    "powerSource": "USB",
    "radioActivity": "INACTIVE",
    "radioConnection": "DISCONNECTED",
    "systemTime": "2026-06-12T15:28:37.971Z",
    "ntp": {
      "offset": 0,
      "reach": 0
    },
    "terminalConnection": {
      "status": "CONNECTED",
      "type": "USB"
    },
    "batteryStatus": {
      "mfgDate": "19APR2024",
      "cycleCount": 24,
      "fullChargeCapacity": 6149,
      "temperature": 29,
      "designCapacity": 6400,
      "batteryType": "LI-ION",
      "capacity": 6087,
      "stateOfHealth": "GOOD",
      "chargePercentage": 99,
      "chargeStatus": 0
    }
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

---

## 5. Associated Error Codes

The `response.code` integer comes from the shared 0–30 table in `refrence/response/response.yaml` (`minimum: 0`, `maximum: 30`). Only code `0` was observed on-device for `get_status`; the row below for code `3` is a representable hypothesis from the table, and its trigger binding is not exercised.

| Code | Status | Name | Triggering Condition | Provenance |
|------|--------|------|----------------------|------------|
| 0 | Success | Success | Status retrieved and returned successfully | [verified-on-device] — observed in the live response (`code: 0`, `description: "Success"`) |
| 3 | Failure | Not able to retrieve information | Plausible when the reader cannot gather the requested status (e.g., a status subsystem is unavailable). Representable per response.yaml; the exact code↔trigger binding for `get_status` was not exercised. | code/name [verified-from-schema: refrence/response/response.yaml — code 3 "Not able to retrieve information"]; trigger [firmware-only-unknown] |

All other codes in the table (`1`, `2`, `4`–`30`) are defined in `response.yaml` but were **not** returned by `get_status` on this run; whether and when they apply to this command is [firmware-only-unknown]. No code other than `0` was verified on-device. [verified-from-schema: refrence/response/response.yaml — full 0–30 code table]

---

## 6. Spec-vs-Device Discrepancies (this command)

- **D1 — `apiVersion` value outside documented enum.** The live device returned `apiVersion: "V1.21"`, but the response schema restricts `apiVersion` to the enum `[V1.0, V1.1]`. [verified-on-device: returned `"V1.21"`] vs [verified-from-schema: response/dev_mgmt/get_status.json — `apiVersion.enum: [V1.0, V1.1]`]. **Recommended source fix:** add `"V1.21"` (and any other shipped firmware version strings) to the `apiVersion` enum, or relax the enum to a `pattern`-based string if the version set is open-ended.

- **D2 — `deviceStatus.required` lists fields the device omits.** The schema marks both `hostname` and (top-level) `temperature` as required in `deviceStatusResponse.yaml`, but the live response contains **neither**: `hostname` is absent entirely, and `temperature` appears only inside `batteryStatus`, not at the `deviceStatus` top level. [verified-from-schema: deviceStatusResponse.yaml — `required: [..., hostname, systemTime, temperature]`] vs [verified-on-device: both omitted from the live response]. **Recommended source fix:** either drop `hostname` and top-level `temperature` from `deviceStatus.required` (move them to optional), or — if they are intended to be returned only under certain conditions (e.g., when on a network / when a thermal sensor is present) — document them as conditionally returned and remove them from the unconditional `required` set so valid live payloads do not fail schema validation.

- **D3 — schema bug: trailing-space property key for `systemTime` (two distinct consequences).** In `deviceStatusResponse.yaml` the property is defined under the key `"systemTime "` (note the trailing space) and carries `type: string` plus `format: time`, while the `required` array lists `systemTime` (no space) and the device emits `"systemTime"` (no space). Because `properties` contains ONLY the trailing-space key `"systemTime "` and NO key `"systemTime"`, this produces two separate failures:
  1. **The type/format definition never binds.** The `type: string` / `format` constraints attach to the misspelled key, so they never apply to the `"systemTime"` field the device actually returns — which is instead treated as an unconstrained additional property.
  2. **The `required: systemTime` constraint is permanently unsatisfiable.** The `required` array references `systemTime`, but no property of that name exists in `properties`. A strict validator can therefore NEVER satisfy this required entry for ANY payload: every response fails the `required` check regardless of what the device sends.

  [verified-from-schema: deviceStatusResponse.yaml line 34 `'systemTime '` (with trailing space) vs line 130 `systemTime` in `required`; no `systemTime` key exists in `properties`] vs [verified-on-device: returned key `"systemTime"`, value `"2026-06-12T15:28:37.971Z"`]. **Recommended source fix:** rename the property key from `"systemTime "` to `"systemTime"` — this single change resolves BOTH consequences (the `type`/`format` constraints then bind to the returned field, and the `required` entry becomes satisfiable). Additionally, the declared `format: time` denotes a time-of-day, whereas the field carries a full ISO 8601 date-time; consider changing it to `format: date-time`.

- **D4 — minor casing/format divergence (type-valid).** Two `batteryStatus` fields differ from their schema examples in formatting only:
  - `batteryType`: live `"LI-ION"` vs schema example `"Li-ion"`.
  - `mfgDate`: live `"19APR2024"` (DDMMMYYYY) vs schema example `"2024-01-15"` (ISO `YYYY-MM-DD`).
  Both remain valid `string` values (the schema imposes no enum/pattern on either), so this is a documentation/example divergence, not a validation failure. [verified-on-device: `"LI-ION"`, `"19APR2024"`] vs [verified-from-schema: deviceStatusResponse.yaml — `batteryType` example `Li-ion`, `mfgDate` example `2024-01-15`]. **Recommended source fix:** update the examples to match the real device output (`"LI-ION"`, `"19APR2024"`), or, if a canonical representation is required, add a `pattern`/`enum` and normalize the firmware output to it.
