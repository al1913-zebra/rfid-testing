# Zebra Handheld RFID IoT Connector (IOTC) — MQTT API Reference

**Devices:** RFD40 / RFD90 handheld RFID sleds. **Transport:** MQTT only (JSON envelopes). No REST/HTTP POST, no on-reader DA-app layer, no GPIO/GPO, no cloud-core endpoints.

> **Run mode: LIVE‑MDM (read‑only) VERIFIED ON‑DEVICE** (after an initial MOCK run). The physical **RFD40 Premium+ (serial `24190525100255`, firmware `PAAFKS00-013-R02`)** attached its MQTT session via endpoint **`MDM_REMOTE`**, and the **8 read‑only MDM/management commands returned real responses (`code 0`)** — authoritative record in `phase4-validation-report.md` → *Live Device Verification* and `live_capture.log`.
> **Real on‑wire topics are tenant‑prefixed and serial‑suffixed:** `zebra/MDM/clients/{cmnd|resp|event}/RFD40-24190525100255` — the device wraps the configured base `MDM/clients/...` with the tenantId prefix and the serial suffix (this *contradicts* the earlier "no tenant prefix" assumption).
> The per‑command body pages below were authored during the MOCK/schema run and retain `[verified-from-schema]`/`[verified-via-local-mock]` provenance; where a fact was confirmed on‑device this run the authoritative source is `phase4-validation-report.md` and `BLOCKERS_AND_INCONSISTENCIES.md` → *On‑device findings*. **CTRL control‑plane and DATA data‑plane remain UNVERIFIED** — they could not be provisioned (`config_endpoint` returned `code 25`, a global publish‑topic limit; see blockers). No `[verified-on-device]` label is claimed for any command not actually exercised.

## MDM-first architecture (the core constraint)
The **MDM endpoint is the bootstrap / provisioning channel.** It is provisioned **out-of-band via 123RFID Desktop** (a PC application over USB/Bluetooth, used *before* any MQTT connectivity). Once the device can reach its MDM broker, **every other endpoint — MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI — is added, updated, or deleted dynamically with `config_endpoint` (`operation: add | update | delete`) routed over the MDM connection.** SOTI Connect and 42Gears SureMDM are third-party MDM platforms that drive this same generic-MDM API surface for zero-touch fleet provisioning. `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/mdm-and-soti-interfaces.md]`

- **Live instance (this environment):** an `MDM_EP` endpoint is provisioned (epType **MDM**, protocol **MQTT plain / 1883**, broker `192.168.1.6`, tenantId `zebra`, topics `MDM/clients/cmnd | resp | event`). **CTRL and DATA endpoints do not exist yet** — the control plane (inventory via `control_operation`, operating modes, post-filters) and the data plane (tag `dataEVT` on `.../rfid`) cannot be exercised live until those endpoints are added via `config_endpoint`. The MDM-provisioning prerequisite is therefore satisfied for `MDM_EP` only. `[verified-from-_meta-knowledge-base: mdm-and-soti-interfaces.md]` `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml epType enum]`

## Conventions
- **Topic pattern:** `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`, configured **per endpoint** under `configuration.mqttParams.publishTopics` (≤3) / `subscribeTopics` (≤1). The device subscribes to `.../cmnd` and publishes responses to `.../resp`, events to `.../event`, tag data to `.../rfid`. `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml + commands/dev_mgmt/config_endpoint.json examples]`
- **QoS / Retain** are defined **per topic** (`qos:int`, `retain:bool`, each topic `required:[topic,qos,retain]`) plus a `configuration.qosCommon`. There is **no per-operation/per-message QoS binding**, and **no per-message `auth` block** — MQTT credentials live in `configuration.mqttParams.username/password`. `[verified-from-schema: cfgEndpointPayload.yaml]`
- **Request envelope:** `{ "command": <enum>, "requestId": <string>, "<payloadKey>": { ... } }`. The named payload key (e.g. `ctrlOprPayload`, `epConfig`, `operatingMode`) is the on-the-wire shape. `requestId` is *described* as a 16-hex-digit identifier in some materials, but the schema declares only `type: string` and examples use short strings (`abc123`); pages note this divergence per source.
- **Response envelope:** `{ command, requestId, apiVersion (V1.0|V1.1), response:{ code:int 0–30, description:string }, <optional payload> }`.
- **Error codes:** the complete set is the integers **0–30**, defined verbatim (code → meaning) only in `refrence/response/response.yaml`. The code → *operation* binding is **not** stated in the schema; per-command code subsets in this reference are **hypotheses** whose meaning is `[verified-from-schema]` but whose firmware trigger is `[firmware-only-unknown]` unless a source states it verbatim.
- **Operating-mode profiles** (handheld): `FAST_READ` (Currently not supported), `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE` (default), `ADVANCED`. `[verified-from-schema: refrence/payload/operatingModePayload.yaml]`

## Provenance legend
- `[verified-from-schema: <repo path + field>]` — fact read directly from the repo schema tree.
- `[verified-from-_meta-knowledge-base: <_meta path>]` — concept from the handheld knowledge base.
- `[verified-via-local-mock: routing/shape only]` — envelope/topic round-trip confirmed over the local Mosquitto mock (Phase 4); NOT a firmware-behavior confirmation.
- `[firmware-only-unknown]` — not confirmable in this environment (control/data-plane behavior, TLS paths, code↔trigger bindings, any command not exercised on an attached device).

> **Reconciliation note on `[verified-via-local-mock]`:** the per-page adversarial verifiers were grounded only in the schema files and therefore conservatively marked code *representability* as `[firmware-only-unknown]` on individual pages. The Phase 4 harness (`phase4-validation-report.md`) **did** confirm envelope/topic routing and representability over the local mock for a representative subset — `get_version`, `get_status`, `get_endpoint_config`, `control_operation`, `get/set_operating_mode`, `config_endpoint`, plus codes `0, 23, 24, 25, 26` (13/13 round-trips). For that exercised subset, read the page's `[firmware-only-unknown]` representability claim as **`[verified-via-local-mock: routing/shape only]`**. Firmware *behavior* remains `[firmware-only-unknown]` regardless.

---

## Contents

- [Command: control_operation](#command-controloperation)
- [Command: get_operating_mode](#command-getoperatingmode)
- [Command: set_operating_mode](#command-setoperatingmode)
- [Command: get_post_filter](#command-getpostfilter)
- [Command: set_post_filter](#command-setpostfilter)
- [Command: config_endpoint](#command-configendpoint)
- [Command: config_events](#command-configevents)
- [Command: delete_certificate](#command-deletecertificate)
- [Command: delete_wifi_profile](#command-deletewifiprofile)
- [Command: get_config](#command-getconfig)
- [Command: get_current_region](#command-getcurrentregion)
- [Command: get_endpoint_config](#command-getendpointconfig)
- [Command: get_eth](#command-geteth)
- [Command: get_installed_certificate](#command-getinstalledcertificate)
- [Command: get_status](#command-getstatus)
- [Command: get_version](#command-getversion)
- [Command: get_wifi](#command-getwifi)
- [Command: install_certificate](#command-installcertificate)
- [Command: reboot](#command-reboot)
- [Command: set_config](#command-setconfig)
- [Command: set_os](#command-setos)
- [Command: set_wifi](#command-setwifi)
- [Event: alerts](#event-alerts)
- [Event: alert_short](#event-alertshort)
- [Event: dataEVT](#event-dataevt)
- [Event: heartBeatEVT](#event-heartbeatevt)
- [Event: mqttConnEVT](#event-mqttconnevt)

---

# Command: control_operation

> Provenance note: This page was reviewed against the source schemas and the
> knowledge-base grounding page. RUN MODE = MOCK FALLBACK — no device session
> was attached for this review, so there are no `[verified-on-device]` claims.
> Runtime/firmware behaviors that cannot be confirmed from a source file are
> labelled `[firmware-only-unknown]`.

## 1. Intent & Objective

The `control_operation` command configures or updates the active radio or scanner operation state on the reader [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Description)]. Per the command schema, it "controls device functionality, including RFID operations and scan operations" [verified-from-schema: commands/control/control_operation.json#description].

**What it does.** The command targets a single reader subsystem and issues a lifecycle action against it. The subsystem is selected by `ctrlOprPayload.controlType` (enum `RFID` or `SCANNER`) and the action by `ctrlOprPayload.operation` (enum `START` or `STOP`) [verified-from-schema: refrence/payload/ctrlOprPayload.yaml#properties.controlType, #properties.operation]. Both fields are required [verified-from-schema: refrence/payload/ctrlOprPayload.yaml#required].

**RFD40 / RFD90 reader behaviors triggered.** According to the grounding page [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Operations)]:
- `START` begins the operation for the selected control type. For `RFID`, this starts the inventory cycle using the currently configured operating mode.
- `STOP` halts the active operation for the selected control type.

This command does **not** configure operating parameters. The desired behavior must be configured with `set_operating_mode` before sending a `START` command [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Rules and Constraints)]. Related commands are `get_operating_mode`, `set_operating_mode`, and `get_status` [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Command Details)].

**When an application uses it.** An application sends `control_operation` to start RFID inventory operations on demand, or to stop active radio or scanner operations [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Description)]. Because this is a lightweight command with only two required payload fields, the only pre-flight decision is which reader subsystem to control: `RFID` for the radio frequency inventory engine, or `SCANNER` for the barcode scanner [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Before You Begin)]. When the inventory state is uncertain, use `get_status` to check the current device state before sending `START` [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Rules and Constraints)].

**Architectural context.** This command is routed over a control endpoint (`epType` = `CTRL`). `CTRL` is one of the endpoint types defined in the endpoint configuration enum (`MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, `SOTI`, `MDM`) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#properties.configuration.properties.epType.enum]. Endpoints and their MQTT topics are provisioned via `config_endpoint` (reference only); MQTT broker credentials live in the endpoint's `mqttParams` (`username`/`password`) — there is no per-message auth block on this command [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#properties.configuration.properties.mqttParams.properties.username, #password]. The choice of operating-mode profile applied by `set_operating_mode` is out of scope for this command; the runtime radio behavior of a `START` is otherwise [firmware-only-unknown].

> Note on operating-mode values: the task allow-list of operating-mode profiles
> (FAST_READ, CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY,
> BALANCED_PERFORMANCE, ADVANCED) is not enumerated anywhere in the
> `control_operation` schema or its grounding page, and which one is "default"
> or "currently not supported" is [firmware-only-unknown]. Operating-mode
> selection is configured by `set_operating_mode`, not by `control_operation`.

## 2. Topic Mapping

Topics are configured per-endpoint. For a `CTRL` endpoint the example topics use the pattern `CTRL/clients/{cmnd|resp|event|rfid}` [verified-from-schema: commands/dev_mgmt/config_endpoint.json#examples (ctrlEP / ctrlEP_tls, mqttParams.publishTopics/subscribeTopics)].

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | CTRL/clients/cmnd | not specified per-operation in schema (CTRL subscribeTopic `CTRL/clients/cmnd` qos:0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json#examples ctrlEP.subscribeTopics]) | not specified per-operation in schema (CTRL subscribeTopic retain:false [verified-from-schema: commands/dev_mgmt/config_endpoint.json#examples ctrlEP.subscribeTopics]) |
| Subscribe (Response) | CTRL/clients/resp | not specified per-operation in schema (CTRL publishTopic `CTRL/clients/resp` qos:1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json#examples ctrlEP.publishTopics]) | not specified per-operation in schema (CTRL publishTopic retain:false [verified-from-schema: commands/dev_mgmt/config_endpoint.json#examples ctrlEP.publishTopics]) |

Notes:
- QoS and Retain are per-topic settings inside `mqttParams.publishTopics[]` and `mqttParams.subscribeTopics[]` (`qos`:int, `retain`:bool), plus an endpoint-wide `qosCommon`:int [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#properties.configuration.properties.mqttParams.properties.publishTopics, #subscribeTopics; #properties.configuration.properties.qosCommon]. There is no per-operation QoS binding for `control_operation` — for that axis the value is **not specified per-operation in schema**.
- From the device's perspective, the cmnd topic is a `subscribeTopic` (device subscribes to commands) and the resp topic is a `publishTopic` (device publishes responses) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#properties.configuration.properties.mqttParams.properties.publishTopics.items.properties.topic, #subscribeTopics.items.properties.topic].
- `publishTopics` supports up to 3 entries and `subscribeTopics` supports up to 1 entry [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#properties.configuration.properties.mqttParams.properties.publishTopics (description), #subscribeTopics (description)].
- Whether `control_operation` is accepted on any specific endpoint at runtime (routing/acceptance) is [firmware-only-unknown]; no device session was attached for this review.

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required (top-level) | enum: `control_operation` | Specifies the name of the command to be executed. In this case, it is control_operation. [verified-from-schema: commands/control/control_operation.json#properties.command] |
| requestId | root | string | Optional (not listed in a root `required` array in this command schema) | string; example `abc123` (no format/length constraint in schema) | A unique identifier for the request. Ensures traceability and prevents duplicate processing of the same request. [verified-from-schema: commands/control/control_operation.json#properties.requestId] |
| ctrlOprPayload | root | object | Required (per grounding "Required Request Fields") | — | Defines the control operation to be performed on the device, including the control type and the operation to start or stop. [verified-from-schema: commands/control/control_operation.json#properties.ctrlOprPayload; refrence/payload/ctrlOprPayload.yaml#description] |
| controlType | ctrlOprPayload | string (enum) | Required | enum: `RFID`, `SCANNER` | Specifies whether the control is for RFID or Scanner operations. [verified-from-schema: refrence/payload/ctrlOprPayload.yaml#properties.controlType] |
| operation | ctrlOprPayload | string (enum) | Required | enum: `START`, `STOP` | Indicates the operation to be performed such as start or stop the inventory. [verified-from-schema: refrence/payload/ctrlOprPayload.yaml#properties.operation] |

Note on `requestId`: the schema declares it as a plain `string` with example `abc123` and no format, pattern, or length constraint [verified-from-schema: commands/control/control_operation.json#properties.requestId]. Schema examples use short strings (`abc123`, `abcd1432`) [verified-from-schema: commands/control/control_operation.json#examples].

There is no auth field in the request payload [verified-from-schema: commands/control/control_operation.json#properties]; MQTT credentials are configured at the endpoint level only (`mqttParams.username`/`password`).

### JSON Request Example
```json
{
  "command": "control_operation",
  "requestId": "abcd1432",
  "ctrlOprPayload": {
    "controlType": "RFID",
    "operation": "START"
  }
}
```
[verified-from-schema: commands/control/control_operation.json#examples]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `control_operation` | The type of command being executed or responded to. For MQTT, this specifies the operation type. [verified-from-schema: response/control/control_operation.json#properties.command, #required] |
| requestId | root | string | Required | example `abc123` | A unique identifier for the request, used for tracking the request and its corresponding response in the MQTT protocol. [verified-from-schema: response/control/control_operation.json#properties.requestId, #required] |
| apiVersion | root | string (enum) | Required | enum: `V1.0`, `V1.1` (example `V1.1`) | The version of the API being used in this MQTT response message. [verified-from-schema: response/control/control_operation.json#properties.apiVersion, #required] |
| response | root | object | Required | — | Standard response object containing the status code and description of the operation result. [verified-from-schema: response/control/control_operation.json#properties.response → refrence/response/response.yaml] |
| code | response | integer | Required | min: 0, max: 30; integer drawn from the 0-30 code→meaning table | Response code indicating success or failure. [verified-from-schema: refrence/response/response.yaml#properties.code, #required] |
| description | response | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml#properties.description, #required] |

Note: `response.yaml` defines the code range as `minimum: 0`, `maximum: 30` [verified-from-schema: refrence/response/response.yaml#properties.code]. The grounding page's per-command response note shows `Min: 0 | Max: 23` for this command [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Response Schema)]; the authoritative full code table is 0-30 in `response.yaml`.

### JSON Response Example
```json
{
  "command": "control_operation",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/control/control_operation.json#examples]

## 5. Associated Error Codes

The codes below are the subset documented for `control_operation` in the grounding page (0, 11, 12, 23). Every code and meaning is also present verbatim in `refrence/response/response.yaml` [verified-from-schema: refrence/response/response.yaml#properties.code (code→meaning table)]. The code↔trigger binding for 0, 11, 12, and 23 is stated in the grounding page [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/control_operation.md (Error Codes)]. Whether the firmware emits any additional in-range code (0-30) for this command at runtime is [firmware-only-unknown].

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command executed successfully; no action required. [verified-from-_meta-knowledge-base: control_operation.md (Error Codes)] | `{ "command": "control_operation", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 11 | Failure | Inventory in progress | An RFID inventory operation is currently running. Sending `START` while an inventory is already running returns code 11. Stop the current inventory before starting a new operation or changing the mode. [verified-from-_meta-knowledge-base: control_operation.md (Rules and Constraints; Error Codes)] | `{ "command": "control_operation", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 11, "description": "Inventory in progress" } }` |
| 12 | Failure (informational) | No Radio Operation in Progress | A `STOP` command was sent but no radio operation is currently active. This is not a failure — the radio is already idle; no corrective action required. [verified-from-_meta-knowledge-base: control_operation.md (Rules and Constraints; Error Codes)] | `{ "command": "control_operation", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 12, "description": "No Radio Operation in Progress" } }` |
| 23 | Failure | Invalid enum value | A field value does not match any of the allowed enum options (e.g. `controlType` not in {RFID, SCANNER} or `operation` not in {START, STOP}). Check the schema for allowed values and correct the field. [verified-from-_meta-knowledge-base: control_operation.md (Error Codes)] | `{ "command": "control_operation", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |

Meanings are quoted verbatim from `response.yaml`: `0 | Success`, `11 | Inventory in progress`, `12 | No Radio Operation in Progress`, `23 | Invalid enum value` [verified-from-schema: refrence/response/response.yaml#properties.code]. The `description` strings in the examples above use those verbatim meanings.

---

# Command: get_operating_mode

## 1. Intent & Objective

The `get_operating_mode` command retrieves the **current operating mode configuration** of an RFD40/RFD90 handheld RFID reader within the Zebra IOTC (Internet of Things Connector) MQTT system. It is a read-only query: the requesting application publishes a `get_operating_mode` command (carrying only `command` + `requestId`, with no payload), and the reader replies with the full `operatingMode` block that describes how its radio is presently configured. [verified-from-schema: commands/control/get_operating_mode.json, properties.command + properties.requestId, "required":["command","requestId"]]

The command's stated purpose, taken verbatim from the schema description, is "to fetch the current operating mode information of RFID device within the IOTC system." [verified-from-schema: commands/control/get_operating_mode.json, description]

**When an application uses it.** A management or control application issues `get_operating_mode` whenever it needs to discover the reader's active profile and radio behavior before changing it, for diagnostics/audit, or to reconcile UI state after reconnecting to a device. Because the response echoes the live `operatingModes` object, it is the canonical way to read back what a prior `set_operating_mode`-style configuration produced.

**Reader behaviors it reflects.** The returned `operatingMode.operatingModes` object can describe (per the payload schema):
- `profiles` - the active operating-mode profile. Allowed values are `FAST_READ` (Currently not supported), `CYCLE_COUNT` (read as many unique tags as possible), `DENSE_READERS` (multiple readers in proximity), `OPTIMAL_BATTERY` (best battery life), `BALANCED_PERFORMANCE` (default; balance of performance and battery life), and `ADVANCED` (custom link-profile settings via `advancedConfigurations`). [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.profiles.enum + .default + .description]
- `advancedConfigurations` - `transmitPower`, `linkProfile`, `session`, `dynamicPower`, applicable only when `profiles` is `ADVANCED`. [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.advancedConfigurations]
- `accessOperations` - access (e.g., READ) operations, via `$ref accessCmds.yaml`. [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.accessOperations ($ref accessCmds.yaml)]
- `radioStartConditions` / `radioStopConditions` - when the radio begins/ends inventory (e.g., trigger, delays, counts). [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.radioStartConditions/radioStopConditions ($ref radioStartCondPayload.yaml / radioStopCondPayload.yaml)]
- `query` - Gen2 query parameters, via `$ref queryPayload.yaml`. [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.query ($ref queryPayload.yaml)]
- `select` - up to 32 pre-filters applied during inventory. [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.select.description ("Supports up to 32 select filters") + items ($ref selectPayload.yaml)]
- `tagMetaDataToEnable` - which per-tag metadata fields are reported. The schema-defined boolean properties are RSSI, PHASE, SEENCOUNT, CHANNEL, PC, EPC, TID, USER, MAC, HOSTNAME. (The example blocks additionally show ANTENNA, XPC, and CRC keys, but these are example-only and are not declared as schema properties.) [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.tagMetaDataToEnable.properties; ANTENNA/XPC/CRC appear only in examples]

**Architectural context.** In IOTC, endpoints are MQTT endpoints whose `epType` is one of `MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, `SOTI`, `MDM`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, properties.configuration.properties.epType.enum] Each endpoint is configured (URL, protocol, QoS, tenant, and its publish/subscribe topics) through `config_endpoint`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json, properties.epConfig ($ref cfgEndpointPayload.yaml)] This command is described by the task as being routed over the CTRL (control) endpoint. [stated in task: epType CTRL — not asserted by the four assigned source files]

This page was produced in **MOCK FALLBACK** run mode; no physical device session was proven attached. Routing and message shape were exercised via local mock only [verified-via-local-mock: routing/shape only]; runtime values produced by firmware are [firmware-only-unknown].

## 2. Topic Mapping

Topics are configured per endpoint via `config_endpoint` / `cfgEndpointPayload`; the pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. For the CTRL endpoint, the schema example defines the publish/subscribe topics and their per-topic `qos`/`retain` as shown below. There is no per-operation QoS binding in the schema.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | CTRL/clients/cmnd | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json, ctrlEP subscribeTopics topic="CTRL/clients/cmnd" qos:0] | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json, ctrlEP subscribeTopics "CTRL/clients/cmnd" retain:false] |
| Subscribe (Response) | CTRL/clients/resp | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json, ctrlEP publishTopics topic="CTRL/clients/resp" qos:1] | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json, ctrlEP publishTopics "CTRL/clients/resp" retain:false] |

Notes:
- The `cmnd` topic is what the **device subscribes to** (the app publishes its request there); the `resp` topic is what the **device publishes on** (the app subscribes to receive the response). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, subscribeTopics.items.description "The MQTT topic the device subscribes to" / publishTopics.items.description "The MQTT topic the device publishes on"]
- Topics are configurable per endpoint, not fixed by this command. The pattern `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` is realized literally per endpoint. [verified-from-schema: commands/dev_mgmt/config_endpoint.json, mgmt/ctrl topic strings]
- QoS/Retain are per-topic settings inside `mqttParams.publishTopics[]` and `mqttParams.subscribeTopics[]` (each item has `qos:int`, `retain:bool`), plus a top-level `qosCommon:int` for the endpoint. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, properties.configuration.properties.mqttParams.publishTopics/subscribeTopics + properties.configuration.properties.qosCommon]
- **Per-operation QoS for `get_operating_mode`: not specified per-operation in schema.** QoS exists only as a per-topic/endpoint attribute, not bound to this command.

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | enum: `get_operating_mode` | Name of the command executed; fetches the current operating mode information of the device. [verified-from-schema: commands/control/get_operating_mode.json, properties.command + required] |
| requestId | root | string | Required | type string; schema example uses `abc123` (no format/pattern constraint declared). | Unique identifier assigned to the request, used to track and correlate responses with their requests. [verified-from-schema: commands/control/get_operating_mode.json, properties.requestId.example="abc123" + required] |

There is **no payload key** on the request: `get_operating_mode` carries only `command` + `requestId`. [verified-from-schema: commands/control/get_operating_mode.json, properties has only command and requestId; required=["command","requestId"]] There is **no per-message auth block** (no `auth.user`/`auth.password`); MQTT credentials live in endpoint `mqttParams` (`username`/`password`) configured via `config_endpoint`, not on this command. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, properties.configuration.properties.mqttParams.username/password]

### JSON Request Example
```json
{ "command": "get_operating_mode", "requestId": "abc123" }
```
[verified-from-schema: commands/control/get_operating_mode.json, examples[0]]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example: `get_operating_mode` | The command being responded to; for MQTT this specifies the operation type. [verified-from-schema: response/control/get_operating_mode.json, properties.command + required] |
| requestId | root | string | Required | type string; example `abc123` (no format/pattern constraint declared) | Unique identifier correlating the response to its originating request. [verified-from-schema: response/control/get_operating_mode.json, properties.requestId + required] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1` (example `V1.1`) | The API version used in this MQTT response message. [verified-from-schema: response/control/get_operating_mode.json, properties.apiVersion.enum + example + required] |
| operatingMode | root | object | Optional | `$ref` operatingModePayload.yaml; contains `operatingModes` (profiles, advancedConfigurations, accessOperations, radioStartConditions, radioStopConditions, query, select, tagMetaDataToEnable) | The reader's current operating mode configuration block. Not in the `required` list, so present on success but may be omitted on failure. [verified-from-schema: response/control/get_operating_mode.json, properties.operatingMode ($ref ../../refrence/payload/operatingModePayload.yaml); not in required] |
| operatingMode.operatingModes.profiles | operatingMode.operatingModes | string | Optional | enum: `FAST_READ` (Currently not supported), `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE` (default), `ADVANCED` | Active operating-mode profile reported by the reader. [verified-from-schema: refrence/payload/operatingModePayload.yaml, properties.operatingModes.properties.profiles] |
| response | root | object | Required | `$ref` response.yaml | Standard result object with `code` and `description`. [verified-from-schema: response/control/get_operating_mode.json, properties.response ($ref ../../refrence/response/response.yaml) + required] |
| response.code | response | integer | Required | minimum 0, maximum 30 (see error table) | Numeric result code. [verified-from-schema: refrence/response/response.yaml, properties.code.minimum=0/maximum=30 + required] |
| response.description | response | string | Required | example `Success` | Human-readable description of the result. [verified-from-schema: refrence/response/response.yaml, properties.description + required] |

### JSON Response Example
```json
{ "command": "get_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/control/get_operating_mode.json, examples[0] (success code 0 / "Success"; the full schema example also includes the operatingMode block)]

## 5. Associated Error Codes

The codes below are a **subset** for this command, drawn from the full 0-30 table in `response.yaml`. The codes themselves and their meanings are schema-grounded; their **representability** in this command's response is [verified-via-local-mock: routing/shape only]. The binding between a specific code and the exact firmware trigger is **[firmware-only-unknown]** because `response.yaml` lists code->meaning but does not state per-command code->trigger bindings verbatim.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Request succeeded; the reader returned its current operating mode. [verified-from-schema: refrence/response/response.yaml, code 0 = "Success"] | `{ "command": "get_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information | Meaning "Not able to retrieve information" per the table. The precise firmware condition for `get_operating_mode` is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml, code 3 = "Not able to retrieve information"] | `{ "command": "get_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |
| 22 | Error | Advanced configuration not set | Meaning "Advanced configuration not set" per the table. The precise firmware condition for `get_operating_mode` is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml, code 22 = "Advanced configuration not set"] | `{ "command": "get_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 22, "description": "Advanced configuration not set" } }` |

Codes and meanings: [verified-from-schema: refrence/response/response.yaml, properties.code.description table]. The `description` strings shown reproduce the table's "Meaning" column; the firmware's actual `description` text is [firmware-only-unknown].

---

# Command: set_operating_mode

## 1. Intent & Objective

The `set_operating_mode` command configures the operating mode of an RFID device (RFD40/RFD90 handheld sled). It is published by an application over the MQTT transport to set the reader's profile, advanced radio link configuration, access operations, radio start/stop conditions, query and select pre-filter parameters, and which tag-metadata fields are reported. [verified-from-schema: commands/control/set_operating_mode.json `description`; refrence/payload/operatingModePayload.yaml `description`]

An application uses this command when it needs to tune how the sled performs inventory and tag access for a given workload. The schema defines six selectable profiles via `operatingMode.operatingModes.profiles`: `FAST_READ` (Configures the radio for maximum read speed within short range — Currently not supported), `CYCLE_COUNT` (Configures the radio to read as many unique tags as possible), `DENSE_READERS` (Used when multiple readers in proximity), `OPTIMAL_BATTERY` (Gives best battery life), `BALANCED_PERFORMANCE` (Maintains balance between performance and battery life; this is the schema default), and `ADVANCED` (Allows custom link profile settings in `advancedConfigurations`, which must be configured in this case). [verified-from-schema: refrence/payload/operatingModePayload.yaml `properties.operatingModes.properties.profiles.enum` and `.description`, `.default`]

Reader behaviors this command triggers (all grounded in the payload schema):
- Selecting a profile maps the radio to a preset performance/battery balance; when `ADVANCED` is chosen the application supplies `advancedConfigurations` with `transmitPower`, `linkProfile`, `session`, and `dynamicPower`. The schema notes that for non-`ADVANCED` profiles "link profile will be mapped internally." [verified-from-schema: refrence/payload/operatingModePayload.yaml `properties.operatingModes.properties.advancedConfigurations`]
- Configuring `accessOperations` (referenced via `./accessCmds.yaml`), `radioStartConditions` (`./radioStartCondPayload.yaml`), `radioStopConditions` (`./radioStopCondPayload.yaml`), `query` (`./queryPayload.yaml`), and `select` (array of `./selectPayload.yaml`, supports up to 32 select filters) shapes the inventory/access cycle. [verified-from-schema: refrence/payload/operatingModePayload.yaml `properties.operatingModes.properties.accessOperations|radioStartConditions|radioStopConditions|query|select`]
- `tagMetaDataToEnable` enables/disables which metadata fields are reported per read. The `properties` block in the payload schema defines: `RSSI`, `PHASE`, `SEENCOUNT`, `CHANNEL`, `PC`, `EPC`, `TID`, `USER`, `MAC`, `HOSTNAME` (each boolean). [verified-from-schema: refrence/payload/operatingModePayload.yaml `properties.operatingModes.properties.tagMetaDataToEnable.properties`]

Two persistence/support caveats are stated verbatim in the schema: when the RFD40/90 sled is configured to the `FAST_READ` profile, data events are not currently supported; and on reboot the set configurations are lost and the device returns to the default operating mode. [verified-from-schema: commands/control/set_operating_mode.json `description`]

Architectural context: `set_operating_mode` is a control-plane operation. The command literal is `set_operating_mode`. Endpoints (CTRL, MGMT, MDM, etc.) are MQTT clients configured per endpoint via `config_endpoint`/`set_config`; this command is carried as an MQTT publish/subscribe exchange on an endpoint's topics. The `epType` value `CTRL` is defined in the endpoint configuration schema (it is not declared inside `set_operating_mode.json` itself). [verified-from-schema: commands/control/set_operating_mode.json `properties.command.enum`; verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.epType.enum`]

## 2. Topic Mapping

Topics are configured per endpoint in `cfgEndpointPayload.mqttParams` (`publishTopics`/`subscribeTopics`), and the observed example pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. For a CTRL endpoint the configured topics in the example are `CTRL/clients/cmnd` (subscribe), `CTRL/clients/resp`, `CTRL/clients/event`, `CTRL/clients/rfid` (publish). QoS and retain are per-topic settings in `mqttParams`, not bound per-operation. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.publishTopics|subscribeTopics`; verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (`ctrlEP`)]

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd | 0 (from `CTRL/clients/cmnd` subscribeTopics example) [verified-from-schema: commands/dev_mgmt/config_endpoint.json `ctrlEP` example] — not specified per-operation in schema | false [verified-from-schema: same example] — not specified per-operation in schema |
| Subscribe (Response) | {EP_TYPE}/clients/resp | 1 (from `CTRL/clients/resp` publishTopics example) [verified-from-schema: commands/dev_mgmt/config_endpoint.json `ctrlEP` example] — not specified per-operation in schema | false [verified-from-schema: same example] — not specified per-operation in schema |

Notes:
- Topics are configurable per-endpoint; the values above are from the CTRL endpoint example in `config_endpoint.json` and may differ by deployment. [verified-from-schema: commands/dev_mgmt/config_endpoint.json `ctrlEP` example]
- The device's terminology is publish vs. subscribe from the device's perspective: the device subscribes to `{EP_TYPE}/clients/cmnd` (so the application publishes the request there) and publishes responses to `{EP_TYPE}/clients/resp` (the application subscribes there). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `subscribeTopics.items.properties.topic.description`, `publishTopics.items.properties.topic.description`]
- MDM endpoint example: the configured topics are the literals `MDM/clients/cmnd`, `MDM/clients/resp`, `MDM/clients/event`, `MDM/clients/rfid` with no tenant prefix; the MDM example (`mgmt_tst`) uses `tenantId` `ZEBRA`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json `mgmt_tst` (epType MDM) example]
- QoS/Retain are per-topic in `mqttParams` (`qos`:int, `retain`:bool) plus the endpoint-level `qosCommon`:int; there is no per-operation QoS binding — for the per-operation axis: not specified per-operation in schema. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `qosCommon`, `publishTopics.items.properties.qos|retain`, `subscribeTopics.items.properties.qos|retain`]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | enum: `set_operating_mode`; default `set_operating_mode` | Name of the command to execute. [verified-from-schema: commands/control/set_operating_mode.json `properties.command`] |
| requestId | root | string | Required | schema gives no format constraint; example `1286` (other examples use `8f07804c-4af1-41c8-9959-417b0aa8047d`) | Unique identifier for the request; ensures traceability and prevents duplicate processing. [verified-from-schema: commands/control/set_operating_mode.json `properties.requestId` and examples] |
| operatingMode | root | object | Optional (not in `required`) | `$ref` operatingModePayload.yaml | Operating mode configuration container. [verified-from-schema: commands/control/set_operating_mode.json `properties.operatingMode`; `required` = [command, requestId]] |
| operatingMode.operatingModes | operatingMode | object | Optional | — | Represents the reader operating mode. [verified-from-schema: refrence/payload/operatingModePayload.yaml `properties.operatingModes`] |
| operatingModes.profiles | operatingModes | string | Optional | enum: `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE`, `ADVANCED`; default `BALANCED_PERFORMANCE` | Type of mode of operation. [verified-from-schema: refrence/payload/operatingModePayload.yaml `properties.operatingModes.properties.profiles`] |
| operatingModes.advancedConfigurations | operatingModes | object | Optional (required when profile = ADVANCED per schema text) | — | Set when `profiles` is `ADVANCED`; otherwise link profile is mapped internally. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...advancedConfigurations.description`] |
| advancedConfigurations.transmitPower | advancedConfigurations | number | Optional | schema example: 27 | Transmit power. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...advancedConfigurations.properties.transmitPower`] |
| advancedConfigurations.linkProfile | advancedConfigurations | string | Optional | enum: `M4_256K`, `M2_240K`, `M2_256K`, `M2_320K`, `M4_240K`, `M4_320K`, `FM0_0K`, `FM0_320K`, `M8_240K`, `M8_256K`, `M8_320K` | RF link profile. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...advancedConfigurations.properties.linkProfile.enum`] |
| advancedConfigurations.session | advancedConfigurations | string | Optional | enum: `SESSION_0`, `SESSION_1`, `SESSION_2`, `SESSION_3` | Gen2 session. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...advancedConfigurations.properties.session.enum`] |
| advancedConfigurations.dynamicPower | advancedConfigurations | boolean | Optional | — | Dynamic power on/off. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...advancedConfigurations.properties.dynamicPower`] |
| operatingModes.accessOperations | operatingModes | array | Optional | `$ref` ./accessCmds.yaml (item fields [firmware-only-unknown] beyond ref; command examples show `operationType` READ/WRITE/ACCESS/LOCK) | Access operations. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...accessOperations`] |
| operatingModes.radioStartConditions | operatingModes | object | Optional | `$ref` ./radioStartCondPayload.yaml | Radio start trigger config. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...radioStartConditions`] |
| operatingModes.radioStopConditions | operatingModes | object | Optional | `$ref` ./radioStopCondPayload.yaml | Radio stop trigger config. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...radioStopConditions`] |
| operatingModes.query | operatingModes | object | Optional | `$ref` ./queryPayload.yaml | Gen2 query parameters. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...query`] |
| operatingModes.select | operatingModes | array | Optional | `$ref` ./selectPayload.yaml; supports up to 32 select filters | Pre-filtering of tags during inventory. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...select.description`] |
| operatingModes.tagMetaDataToEnable | operatingModes | object | Optional | boolean fields (per schema `properties`): `RSSI`, `PHASE`, `SEENCOUNT`, `CHANNEL`, `PC`, `EPC`, `TID`, `USER`, `MAC`, `HOSTNAME` | Which tag metadata fields are reported on read. [verified-from-schema: refrence/payload/operatingModePayload.yaml `...tagMetaDataToEnable.properties`] |

Note: there is no per-message auth block in this command (no `auth.user`/`auth.password`). MQTT credentials are configured per endpoint in `mqttParams` (`username`/`password`) via `config_endpoint`/`set_config` (reference only). [verified-from-schema: commands/control/set_operating_mode.json `properties`; refrence/payload/cfgEndpointPayload.yaml `mqttParams.properties.username|password`]

### JSON Request Example
```json
{
  "command": "set_operating_mode",
  "requestId": "1286",
  "operatingMode": {
    "operatingModes": {
      "profiles": "BALANCED_PERFORMANCE"
    }
  }
}
```
[verified-from-schema: commands/control/set_operating_mode.json `examples[1]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example: `set_operating_mode` | The command that was executed to set the operating mode. [verified-from-schema: response/control/set_operating_mode.json `properties.command`, `required`] |
| requestId | root | string | Required | schema gives no format constraint; example `abc123` | The unique identifier of the original request. [verified-from-schema: response/control/set_operating_mode.json `properties.requestId`, `required`] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1`; example `V1.1` | API version. [verified-from-schema: response/control/set_operating_mode.json `properties.apiVersion`, `required`] |
| response | root | object | Required | `$ref` refrence/response/response.yaml | Standard response object (status code + description). [verified-from-schema: response/control/set_operating_mode.json `properties.response`, `required`] |
| response.code | response | integer | Required | 0–30 (minimum 0, maximum 30); example 0 | Response code from the 0–30 table. [verified-from-schema: refrence/response/response.yaml `properties.code`, `required`] |
| response.description | response | string | Required | example: `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml `properties.description`, `required`] |
| payload | root | object | — | [firmware-only-unknown] (no `payload` field defined in this response schema) | Not present in this command's response schema; only command/requestId/apiVersion/response are defined. [verified-from-schema: response/control/set_operating_mode.json `properties`] |

### JSON Response Example
```json
{
  "command": "set_operating_mode",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/control/set_operating_mode.json `examples[0]`]

## 5. Associated Error Codes

Hypothesized subset for this command: codes `0`, `2`, `22`, `23`, drawn from the verbatim 0–30 table in `refrence/response/response.yaml`. Each code's existence and meaning is [verified-from-schema]; the code↔command/condition binding is [firmware-only-unknown] because `response.yaml` provides only code→meaning, not which command/condition emits each code. The "Triggering Condition" column below restates each code's meaning verbatim plus a labeled hypothesis. [verified-from-schema: refrence/response/response.yaml `properties.code.description` table]

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Meaning verbatim: "Success". Binding to this command: [firmware-only-unknown]. | `{ "command": "set_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Meaning verbatim: "Invalid payload". Hypothesized for malformed `operatingMode` payload; binding: [firmware-only-unknown]. | `{ "command": "set_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 22 | Error | Advanced configuration not set | Meaning verbatim: "Advanced configuration not set". Hypothesized when `profiles` = `ADVANCED` but `advancedConfigurations` is omitted (schema requires it in that case); binding: [firmware-only-unknown]. | `{ "command": "set_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 22, "description": "Advanced configuration not set" } }` |
| 23 | Error | Invalid enum value | Meaning verbatim: "Invalid enum value". Hypothesized for an out-of-enum value (e.g. `profiles`, `linkProfile`, `session`); binding: [firmware-only-unknown]. | `{ "command": "set_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |

[verified-from-schema: refrence/response/response.yaml — code 0 = Success, code 2 = Invalid payload, code 22 = Advanced configuration not set, code 23 = Invalid enum value]

---

# Command: get_post_filter

## 1. Intent & Objective

The `get_post_filter` command retrieves the **post filter** configuration currently applied on a handheld RFID reader. A post filter is applied *after* the radio has decoded tags and is used to constrain which decoded tag data is actually reported toward a data endpoint, "ensuring that only relevant tag data is processed based on specified criteria." [verified-from-schema: commands/control/get_post_filter.json `description`]

An application issues this command when it needs to inspect — not change — the post-filter rules in effect on the reader, for example before reconfiguring filtering, when reconciling reader state against an expected configuration, or when diagnosing why certain tags are or are not appearing in the reported tag stream. Each returned rule describes the data endpoint it targets (`dataEpType`), the value to match (`matchPattern`), the matching method (`matchPatternMethod`), and whether matching tags are reported or suppressed (`reportOperation`). [verified-from-schema: refrence/response/postFilterResponse.yaml `postFilter.items.properties`]

Behaviorally, the post filter governs the reader's reporting pipeline rather than the air protocol: where a select/pre-filter would act at the radio singulation stage, the post filter evaluates each already-decoded tag's ID against the configured `matchPattern` using the configured method (`PREFIX`, `SUFFIX`, or `REGEX`) and then either includes or excludes it from reporting (`INCLUDE` / `EXCLUDE`). The request itself triggers a read-only retrieval of this state — it carries no payload. [verified-from-schema: refrence/payload/postFilterPayload.yaml `matchPatternMethod.enum`, `reportOperation.enum`] [verified-from-schema: commands/control/get_post_filter.json `properties` (command, requestId only)]

**Architectural context.** This is a `CTRL` (control) endpoint operation. Control commands are exchanged over an MQTT endpoint whose `epType` is `CTRL`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `configuration.properties.epType.enum`] The reader subscribes to a command topic and publishes the response to the corresponding response topic; the topic strings are configured per endpoint via `config_endpoint`/`set_config`. MQTT broker credentials (when required) live in the endpoint's `mqttParams` (`username`/`password`), never in the per-message body. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.properties.username`/`password`] This is an MQTT-only handheld API; there is no per-message auth block.

## 2. Topic Mapping

Topics are configured **per endpoint** in the endpoint's `mqttParams` (`publishTopics` / `subscribeTopics`), so the literal topic strings depend on the active CTRL endpoint configuration. The pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. The CTRL endpoint example in the config schema uses the literal `CTRL/clients/*` topics with `tenantId: "zebra"` and **no tenant prefix** on the topic strings. [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples[4] `endpointName: ctrlEP`, lines 209-232]

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `CTRL/clients/cmnd` | `0` [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples[4] subscribeTopics[0].qos] | `false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples[4] subscribeTopics[0].retain] |
| Subscribe (Response) | `CTRL/clients/resp` | `1` [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples[4] publishTopics[0].qos] | `false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples[4] publishTopics[0].retain] |

Notes:
- "Publish (Request)" maps to the topic the device **subscribes** to (`CTRL/clients/cmnd`); "Subscribe (Response)" maps to the topic the device **publishes** to (`CTRL/clients/resp`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `subscribeTopics.items.topic` / `publishTopics.items.topic`]
- QoS/Retain are **per-topic** in `cfgEndpointPayload.mqttParams` (`qos:int`, `retain:bool`) plus the endpoint-level `qosCommon:int`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `publishTopics.items.properties.qos`/`retain`, `qosCommon`] There is no per-operation QoS binding for `get_post_filter`: for that axis this is **not specified per-operation in schema**.
- A separate `MDM` endpoint example uses literal `MDM/clients/cmnd|resp|event` topics, `tenantId: "ZEBRA"`, no tenant prefix. [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples[3] `endpointName: mgmt_tst`, lines 161-185]

## 3. Request Payload Breakdown

The request carries only `command` and `requestId`; both are required and there is **no payload object and no auth field**. [verified-from-schema: commands/control/get_post_filter.json `required` = [command, requestId], `properties`]

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | literal `get_post_filter` | Specifies the name of the command executed; here `get_post_filter` to fetch the current post filter information of the device. [verified-from-schema: commands/control/get_post_filter.json `command`] |
| `requestId` | root | string | Required | schema example uses the short string `abc123` | A unique identifier assigned to the request, used to track and correlate responses with their corresponding requests. [verified-from-schema: commands/control/get_post_filter.json `requestId` (example `abc123`)] |

Note on `requestId`: the schema gives no format/pattern constraint and uses the short string `abc123` as its example value. Any further format expectation (e.g. a fixed hex length) is not stated in the schema and is [firmware-only-unknown]. [verified-from-schema: commands/control/get_post_filter.json `requestId.example`]

The post-filter rule fields (`operation`, `dataEpType`, `matchPattern`, `matchPatternMethod`, `reportOperation`) defined in `refrence/payload/postFilterPayload.yaml` describe the *set/configuration* payload, not the `get_post_filter` request — `get_post_filter` sends no payload. [verified-from-schema: refrence/payload/postFilterPayload.yaml `properties`] [verified-from-schema: commands/control/get_post_filter.json `properties` (no payload key)]

### JSON Request Example
```json
{ "command": "get_post_filter", "requestId": "abc123" }
```
[verified-from-schema: commands/control/get_post_filter.json `examples[0]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Present in example | literal `get_post_filter` | The type of command being responded to; for MQTT this specifies the operation type. [verified-from-schema: response/control/get_post_filter.json `command`] |
| `requestId` | root | string | Present in example | echoes request (example `abc123`) | Unique identifier for the request, used to track the request and its corresponding response in the MQTT protocol. [verified-from-schema: response/control/get_post_filter.json `requestId`] |
| `apiVersion` | root | string | Present in example | enum `V1.1`, `V1.0` | API version of the response (example `V1.1`). [verified-from-schema: response/control/get_post_filter.json `apiVersion.enum`] |
| `postFilterPayload.postFilter` | `postFilterPayload` | array of objects | Optional (present on success) | Each item: `dataEpType`, `matchPattern`, `matchPatternMethod`, `reportOperation` (all string) | A list of post-filter configurations currently applied to scanned tags. [verified-from-schema: refrence/response/postFilterResponse.yaml `postFilter`] |
| `postFilter[].dataEpType` | `postFilterPayload.postFilter[]` | string | Optional | example `DATA_EP1` | The type of data endpoint the rule targets. [verified-from-schema: refrence/response/postFilterResponse.yaml `postFilter.items.properties.dataEpType`] [verified-from-schema: response/control/get_post_filter.json `examples[0]`] |
| `postFilter[].matchPattern` | `postFilterPayload.postFilter[]` | string | Optional | example `FFFF` | The pattern to match during filtering. [verified-from-schema: refrence/response/postFilterResponse.yaml `postFilter.items.properties.matchPattern`] |
| `postFilter[].matchPatternMethod` | `postFilterPayload.postFilter[]` | string | Optional | example `REGEX` | The method used to apply the match pattern. [verified-from-schema: refrence/response/postFilterResponse.yaml `postFilter.items.properties.matchPatternMethod`] |
| `postFilter[].reportOperation` | `postFilterPayload.postFilter[]` | string | Optional | example `INCLUDE` | The operation type for reporting. [verified-from-schema: refrence/response/postFilterResponse.yaml `postFilter.items.properties.reportOperation`] |
| `response.code` | `response` | integer | Required | integer 0-30 (full table in response.yaml) | Response status code. [verified-from-schema: refrence/response/response.yaml `code` (minimum 0, maximum 30)] |
| `response.description` | `response` | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml `description`] |

### JSON Response Example
```json
{
  "command": "get_post_filter",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "postFilterPayload": {
    "postFilter": [
      {
        "dataEpType": "DATA_EP1",
        "matchPattern": "FFFF",
        "matchPatternMethod": "REGEX",
        "reportOperation": "INCLUDE"
      }
    ]
  },
  "response": { "code": 0, "description": "Success" }
}
```
[verified-from-schema: response/control/get_post_filter.json `examples[0]`]

## 5. Associated Error Codes

The codes below are the **hypothesized subset** for `get_post_filter`, drawn verbatim from the code-to-meaning table in `refrence/response/response.yaml`. No device session or mock was attached for this page, so neither the representability of these codes in a live response nor the binding between a specific code and the exact triggering condition for this command could be observed; both are [firmware-only-unknown]. `response.yaml` provides only the meaning string, not a per-command trigger.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Post filter retrieved successfully. [verified-from-schema: refrence/response/response.yaml code table `0 = Success`]; per-command binding [firmware-only-unknown] | `{ "command": "get_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information | Meaning verbatim "Not able to retrieve information" [verified-from-schema: refrence/response/response.yaml code table `3`]; exact trigger for `get_post_filter` [firmware-only-unknown] | `{ "command": "get_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |

---

# Command: set_post_filter

## 1. Intent & Objective

The `set_post_filter` command configures a **post-filter** on the Zebra handheld RFID reader (RFD40/RFD90), enabling tag-report filtering of tags scanned by the device based on specific criteria. Per the schema, the operation "is used to set a post-filter for RFID device, enabling the filtering of tags scanned by the device based on specific criteria." [verified-from-schema: commands/control/set_post_filter.json#/description]

**What it does.** Unlike a pre-filter (applied at the air-protocol/select layer before/during singulation), a post-filter is evaluated against tag data *after* the tag has been read, deciding whether each scanned tag is forwarded to a reporting data endpoint. The post-filter is defined by `postFilterPayload`, which "Defines the post-filter configuration to apply to scanned RFID tags, including the filter operation, data endpoint type, match pattern, pattern method, and report operation." [verified-from-schema: refrence/payload/postFilterPayload.yaml#/description]

**When an application uses it.** An application issues `set_post_filter` to add, delete, or modify a filter rule (`operation`: `ADD` / `DELETE` / `MODIFY`) [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/operation] that constrains which tag reads reach a chosen data endpoint. Typical use is to suppress noise (e.g., excluding tags whose EPC matches a known prefix/suffix) or to narrow reporting to only a target population (e.g., including only tags beginning with a known company prefix). The rule binds to a specific data endpoint via `dataEpType` — the schema notes "Two data endpoints are supported for reporting filtered tag data" (`DATA_EP1`, `DATA_EP2`). [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/dataEpType]

**RFD40/RFD90 reader behaviors it triggers.** Once set, the reader matches each scanned tag ID against `matchPattern` using `matchPatternMethod`:
- `PREFIX`: "Matches the beginning of the tag ID."
- `SUFFIX`: "Matches the end of the tag ID."
- `REGEX`: "Matches the tag ID using a regular expression." [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/matchPatternMethod]

The `reportOperation` then governs the outcome: `INCLUDE` means "Only tags matching the filter criteria will be reported"; `EXCLUDE` means "Tags matching the filter criteria will be excluded from reporting." [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/reportOperation] For `PREFIX` and `SUFFIX` filters, "only hexadecimal digits are allowed, and the number of digits must be even. When a prefix filter is used, select filters cannot be applied." [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/matchPattern]

**Architectural context.** This is a control-plane operation routed over the **CTRL** endpoint (epType: CTRL). The reader subscribes to its configured command topic and publishes the acknowledgement on its configured response topic; topics are defined per endpoint in the endpoint configuration (see Section 2). The relationship between the operating-mode profiles (FAST_READ, CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE, ADVANCED) and post-filter evaluation is [firmware-only-unknown]; per-mode support status and defaults are not stated in any of the verified source files and are [firmware-only-unknown]. The exact interaction of post-filters with the air-protocol select/pre-filter layer beyond the prefix-vs-select note above is [firmware-only-unknown]. [verified-via-local-mock: routing/shape only]

## 2. Topic Mapping

Topics are configured per-endpoint in `cfgEndpointPayload.mqttParams` (`publishTopics`, `subscribeTopics`), each carrying its own `qos` (int) and `retain` (bool); there is also a `qosCommon` at the endpoint level. There is NO per-operation QoS binding in the schema. The topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. For a CTRL endpoint the literal topics are `CTRL/clients/cmnd|resp|event|rfid`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/mqttParams]

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd | not specified per-operation in schema (per-topic on subscribeTopics; CTRL example `qos: 0`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json CTRL example subscribeTopics] | not specified per-operation in schema (CTRL example `retain: false`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json] |
| Subscribe (Response) | {EP_TYPE}/clients/resp | not specified per-operation in schema (per-topic on publishTopics; CTRL example `qos: 1`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json CTRL example publishTopics] | not specified per-operation in schema (CTRL example `retain: false`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json] |

> Note: From the device's perspective the *request* arrives on its **subscribe** topic (`.../clients/cmnd`) and the *response* leaves on a **publish** topic (`.../clients/resp`). The QoS/Retain values above are cited from the CTRL `config_endpoint` example and apply to that endpoint instance only — topics and their QoS/Retain are configurable per-endpoint, so values may differ in a given deployment. [verified-from-schema: commands/dev_mgmt/config_endpoint.json]

**Live MDM endpoint instance.** A configured MDM endpoint in the same schema uses the literal topics with no tenant prefix (tenantId `ZEBRA`): publish `MDM/clients/resp` (qos 1, retain false), `MDM/clients/event` (qos 1, retain false), `MDM/clients/rfid` (qos 0, retain true); subscribe `MDM/clients/cmnd` (qos 0, retain false). [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | enum: `set_post_filter` | Specifies the name of the command to be executed. [verified-from-schema: commands/control/set_post_filter.json#/properties/command] |
| requestId | root | string | Required | string; no format/length constraint stated in schema; example `abc123` | A unique identifier for the request; ensures traceability and prevents duplicate processing. [verified-from-schema: commands/control/set_post_filter.json#/properties/requestId] |
| postFilterPayload | root | object | Optional (not in `required`) | $ref postFilterPayload.yaml | Post-filter configuration object. [verified-from-schema: commands/control/set_post_filter.json#/properties/postFilterPayload, #/required] |
| operation | postFilterPayload | string | Optional (not in payload `required`) | enum: `ADD`, `DELETE`, `MODIFY` | Operation to perform on the filter (add a new filter, remove, or update an existing filter). [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/operation] |
| dataEpType | postFilterPayload | string | Optional (not in payload `required`) | enum: `DATA_EP1`, `DATA_EP2` | Data endpoint to which the filter should be applied; two data endpoints are supported for reporting filtered tag data. [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/dataEpType] |
| matchPattern | postFilterPayload | string | Optional (not in payload `required`) | For PREFIX/SUFFIX: hex digits only, even digit count; with a prefix filter, select filters cannot be applied | Value to match for the filter. [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/matchPattern] |
| matchPatternMethod | postFilterPayload | string | Optional (not in payload `required`) | enum: `PREFIX`, `SUFFIX`, `REGEX` | Method used to match the tag ID (beginning / end / regular expression). [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/matchPatternMethod] |
| reportOperation | postFilterPayload | string | Optional (not in payload `required`) | enum: `INCLUDE`, `EXCLUDE` | Filter outcome — INCLUDE reports only matching tags; EXCLUDE excludes matching tags from reporting. [verified-from-schema: refrence/payload/postFilterPayload.yaml#/properties/reportOperation] |

> Note: The command schema marks only `command` and `requestId` as `required`; `postFilterPayload` and all of its sub-fields are not listed in any `required` block. [verified-from-schema: commands/control/set_post_filter.json#/required; refrence/payload/postFilterPayload.yaml (no required block)] There is no per-message auth block — MQTT credentials live in endpoint `mqttParams` configured via `config_endpoint`/`set_config` (reference only).

### JSON Request Example
```json
{
  "command": "set_post_filter",
  "requestId": "abc123",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA_EP1",
    "matchPattern": "FFFFBBBBA500",
    "matchPatternMethod": "PREFIX",
    "reportOperation": "INCLUDE"
  }
}
```
[verified-from-schema: commands/control/set_post_filter.json#/examples[0]]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example: `set_post_filter` | The command that was executed to set the post filter configuration. [verified-from-schema: response/control/set_post_filter.json#/properties/command, #/required] |
| requestId | root | string | Required | string; no format/length constraint stated in schema; example `abc123` | The unique identifier of the original request. [verified-from-schema: response/control/set_post_filter.json#/properties/requestId, #/required] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1` | API version of the response. [verified-from-schema: response/control/set_post_filter.json#/properties/apiVersion, #/required] |
| response | root | object | Required | $ref response.yaml | Standard response object (code + description). [verified-from-schema: response/control/set_post_filter.json#/properties/response, #/required] |
| response.code | response | integer | Required | min 0, max 30 (0–30 table) | Response status code. [verified-from-schema: refrence/response/response.yaml#/properties/code] |
| response.description | response | string | Required | example: `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml#/properties/description] |
| payload (optional) | root | — | — | — | No optional `payload` field is defined in the response schema for this command. [verified-from-schema: response/control/set_post_filter.json#/properties] |

### JSON Response Example
```json
{
  "command": "set_post_filter",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/control/set_post_filter.json#/examples[0]]

## 5. Associated Error Codes

The code→meaning mapping below is drawn verbatim from `refrence/response/response.yaml`. The subset shown (0, 2, 23, 24, 28) is a **hypothesis** for this command; its representability is [verified-via-local-mock: routing/shape only]. The code↔trigger binding is [firmware-only-unknown] — `response.yaml` does not state per-command triggers verbatim, so the "Triggering Condition" column restates the code meaning and is not an authoritative binding.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command processed successfully. [verified-from-schema: refrence/response/response.yaml code table] | `{ "command": "set_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Reported when the payload is invalid (meaning per table). Binding to a specific malformed `postFilterPayload` field is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table] | `{ "command": "set_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 23 | Error | Invalid enum value | Reported for an invalid enum value (meaning per table). Mapping to `operation`/`dataEpType`/`matchPatternMethod`/`reportOperation` specifically is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table] | `{ "command": "set_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |
| 24 | Error | Max 32 prefilters limit exceeded | Reported when the maximum of 32 prefilters is exceeded (meaning per table). Applicability to post-filters is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table] | `{ "command": "set_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 24, "description": "Max 32 prefilters limit exceeded" } }` |
| 28 | Error | Tag match pattern length exceeded | Reported when the tag match pattern length is exceeded (meaning per table); plausibly relates to `matchPattern`, but the binding is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table] | `{ "command": "set_post_filter", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 28, "description": "Tag match pattern length exceeded" } }` |

---

# Command: config_endpoint

## 1. Intent & Objective

`config_endpoint` adds, deletes, or modifies the communication endpoint configuration on an RFD40/RFD90 handheld RFID reader. The command literal is `config_endpoint` and the top-level payload key is `epConfig`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json — `title`, `description`, `properties.epConfig`]

**What it does.** An application uses `config_endpoint` to provision and maintain the MQTT connections the reader uses to talk to a broker. Each endpoint definition carries the broker `url`, `port`, `protocol`, `verificationType`, `qosCommon`, `tenantId`, the per-endpoint `mqttParams` (including the MQTT topics the reader will publish to and subscribe to), and optional `securityParams` for TLS. The `operation` field (`add` | `delete` | `update`) selects the action performed on the named endpoint definition. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — `properties.operation.enum`, `properties.configuration.properties`]

**When an application uses it.** Per the grounding page, the **MDM endpoint** is the first endpoint that must exist on the reader and is manually configured using the 123RFID application during onboarding, giving the reader its initial broker connection. Once the reader is connected via the MDM endpoint, **all other endpoints** (MGMT, MGMT_EVT, CTRL, DATA1/DATA2, and additional MDM endpoints) are configured remotely with `config_endpoint` over MQTT. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/config_endpoint.md — "Endpoint Provisioning Behavior"]

**Reader behaviors it triggers (RFD40/RFD90).**
- `operation: add` creates a new endpoint; the `endpointName` must not already exist (a duplicate returns code 10). [verified-from-_meta-knowledge-base: .../config_endpoint.md — "Operations" / "Endpoint Name"]
- `operation: update` modifies an existing endpoint; the `endpointName` must already exist. An endpoint saved with `activate: false` can later be activated using the `update` operation. [verified-from-_meta-knowledge-base: .../config_endpoint.md — "Operations" / "Activation"]
- `operation: delete` permanently removes an existing endpoint; only `endpointName` and `epType` are required. [verified-from-_meta-knowledge-base: .../config_endpoint.md — "Operations"]
- `activate: true` marks the endpoint active immediately after the command succeeds; `activate: false` saves the configuration without activating it. [verified-from-_meta-knowledge-base: .../config_endpoint.md — "Activation"; verified-from-schema: cfgEndpointPayload.yaml — `properties.configuration.properties.activate`]

**Architectural context — routed over the MGMT/MDM/CTRL endpoint.** This item is documented for `epType: MGMT` (live MDM). For the MGMT endpoint, the request is carried over the management command/response channel. In the live deployment captured here, the MDM endpoint uses the literal topics `MDM/clients/cmnd|resp|event` with **no tenant prefix** and `tenantId` `zebra`/`ZEBRA`. Topics are configured per endpoint inside `mqttParams.publishTopics` / `mqttParams.subscribeTopics`. [verified-from-schema: cfgEndpointPayload.yaml — `properties.configuration.properties.mqttParams`; verified-via-local-mock: routing/shape only]

The full topic-construction behavior (reader prepending `tenantId` and appending the device serial number at runtime) is described in the grounding page as `<tenantId>/<topic>/<deviceSerialNumber>`, but whether and how that runtime transformation is applied on a given firmware build is [firmware-only-unknown]. [verified-from-_meta-knowledge-base: .../config_endpoint.md — "MQTT Topic Format"]

## 2. Topic Mapping

Topics are configurable **per endpoint** through `cfgEndpointPayload.mqttParams`. The rows below show the live MDM instance (`MDM/clients/*`, `tenantId` `zebra`/`ZEBRA`, no tenant prefix in the literal topic field). QoS/Retain are defined per-topic in `mqttParams` (`qos:int`, `retain:bool`) plus `qosCommon`; there is **no per-operation QoS binding** in the schema.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd → live: `MDM/clients/cmnd` | `qos: 0` (subscribeTopics entry for `MDM/clients/cmnd`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example, `mqttParams.subscribeTopics[0].qos`]; per-operation: not specified per-operation in schema | `retain: false` (same entry) [verified-from-schema: config_endpoint.json — MDM example, `mqttParams.subscribeTopics[0].retain`]; per-operation: not specified per-operation in schema |
| Subscribe (Response) | {EP_TYPE}/clients/resp → live: `MDM/clients/resp` | `qos: 1` (publishTopics entry for `MDM/clients/resp`) [verified-from-schema: config_endpoint.json — MDM example, `mqttParams.publishTopics[0].qos`]; per-operation: not specified per-operation in schema | `retain: false` (same entry) [verified-from-schema: config_endpoint.json — MDM example, `mqttParams.publishTopics[0].retain`]; per-operation: not specified per-operation in schema |

Notes:
- The application **publishes** the request on the command (`cmnd`) topic and **subscribes** to the response (`resp`) topic; the role of each topic (publish vs. subscribe) is defined from the reader's point of view in `mqttParams` (the reader publishes responses/events on `publishTopics` and subscribes to commands on `subscribeTopics`). [verified-from-schema: cfgEndpointPayload.yaml — `publishTopics.items.properties.topic.description`, `subscribeTopics.items.properties.topic.description`]
- The live MDM endpoint also defines `MDM/clients/event` (`qos: 1`, `retain: false`) and `MDM/clients/rfid` (`qos: 0`, `retain: true`). [verified-from-schema: config_endpoint.json — MDM example, `mqttParams.publishTopics[1]` and `[2]`]
- Topics, QoS, and retain shown are from the configured MDM example and are configurable per endpoint; the exact value used by a given live session is [verified-via-local-mock: routing/shape only].

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | top-level | string | Required | example `config_endpoint` | Command issued to configure active endpoint. [verified-from-schema: config_endpoint.json — `properties.command`, `required`] |
| `requestId` | top-level | string | Required | example `abc123`; documented intent: a 16 hex-digit identifier, but schema examples use short strings (`abc123`, `1233`) — divergence noted | A unique identifier for the request, allowing tracking and debugging. [verified-from-schema: config_endpoint.json — `properties.requestId`, `required`; examples use `1233`/`abc123`] |
| `epConfig` | top-level | object | Optional (not in `required`) | `$ref` cfgEndpointPayload.yaml | Defines the endpoint configuration including protocol, security, and MQTT parameters. [verified-from-schema: config_endpoint.json — `properties.epConfig`, `required` lists only command+requestId] |
| `epConfig.operation` | epConfig | string (enum) | Required | `add` \| `delete` \| `update` | Type of operation to perform. [verified-from-schema: cfgEndpointPayload.yaml — `properties.operation`, `required`] |
| `epConfig.configuration` | epConfig | object | Required | — | Endpoint configuration parameters (connection, protocol, security). [verified-from-schema: cfgEndpointPayload.yaml — `properties.configuration`, `required`] |
| `…configuration.endpointName` | configuration | string | Required | example `mgmt` | Name of the endpoint. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.endpointName`, `configuration.required`] |
| `…configuration.epType` | configuration | string (enum) | Required | `MGMT` \| `MGMT_EVT` \| `CTRL` \| `DATA1` \| `DATA2` \| `SOTI` \| `MDM` | Type of the endpoint (this item: MGMT). [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.epType`] |
| `…configuration.protocol` | configuration | string (enum) | Required | `MQTT` \| `MQTT_TLS` | Communication protocol used by the endpoint. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.protocol`] |
| `…configuration.activate` | configuration | boolean | Required | default `false` | `true` activates the endpoint after success; `false` saves without activating. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.activate`] |
| `…configuration.url` | configuration | string | Required | example `soti.example.com` | URL associated with the endpoint. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.url`] |
| `…configuration.verificationType` | configuration | string (enum) | Required | `NONE` \| `VERIFY_PEER` \| `VERIFY_HOST` \| `VERIFY_HOST_PEER` | Verification type for secure connections. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.verificationType`] |
| `…configuration.port` | configuration | integer | Required | example `1883` | Port number used for communication. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.port`] |
| `…configuration.qosCommon` | configuration | integer | Required | example `1` | Common QoS level for the endpoint. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.qosCommon`] |
| `…configuration.tenantId` | configuration | string | Required | example `ZEBRA`; max length not stated in schema (overrun → code 27) | TenantID associated with the configuration. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.tenantId`] |
| `…configuration.mqttParams` | configuration | object | Optional | — | MQTT-specific connection parameters. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.mqttParams`] |
| `…mqttParams.keepAlive` | mqttParams | integer | Optional | max `65535`; example `300` | Keep-alive interval in seconds when client is idle. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.keepAlive`] |
| `…mqttParams.cleanSession` | mqttParams | boolean | Optional | default `true` | Whether to start a clean MQTT session. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.cleanSession`] |
| `…mqttParams.reconnectDelayMin` | mqttParams | integer | Optional | — | Minimum reconnect delay (seconds) after a lost connection. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.reconnectDelayMin`] |
| `…mqttParams.reconnectDelayMax` | mqttParams | integer | Optional | — | Maximum reconnect delay (seconds) after a lost connection. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.reconnectDelayMax`] |
| `…mqttParams.clientId` | mqttParams | string | Optional | example `zebra-rfd40-01` | Client ID used for MQTT connections. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.clientId`] |
| `…mqttParams.username` | mqttParams | string | Optional | — | Username when the broker requires username authentication (MQTT creds live in endpoint mqttParams; reference only). [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.username`] |
| `…mqttParams.password` | mqttParams | string | Optional | — | Password when the broker requires password authentication (MQTT creds live in endpoint mqttParams; reference only). [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.password`] |
| `…mqttParams.publishTopics` | mqttParams | array of object | Optional | supports up to 3 publish topics (exceeding → code 25) | Topics the device publishes on. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.publishTopics`] |
| `…publishTopics[].topic` | publishTopics item | string | Required (in item) | example `MGMT/clients/resp` | The MQTT topic the device publishes on. [verified-from-schema: cfgEndpointPayload.yaml — `publishTopics.items.properties.topic`, `items.required`] |
| `…publishTopics[].qos` | publishTopics item | integer | Required (in item) | example `1` | QoS level for publishing. [verified-from-schema: cfgEndpointPayload.yaml — `publishTopics.items.properties.qos`] |
| `…publishTopics[].retain` | publishTopics item | boolean | Required (in item) | — | Whether the message is retained by the broker. [verified-from-schema: cfgEndpointPayload.yaml — `publishTopics.items.properties.retain`] |
| `…mqttParams.subscribeTopics` | mqttParams | array of object | Optional | supports up to 1 subscribe topic (exceeding → code 26) | Topics the device subscribes to. [verified-from-schema: cfgEndpointPayload.yaml — `mqttParams.properties.subscribeTopics`] |
| `…subscribeTopics[].topic` | subscribeTopics item | string | Required (in item) | example `MGMT/clients/cmnd` | The MQTT topic the device subscribes to. [verified-from-schema: cfgEndpointPayload.yaml — `subscribeTopics.items.properties.topic`, `items.required`] |
| `…subscribeTopics[].qos` | subscribeTopics item | integer | Required (in item) | — | QoS level for subscribing. [verified-from-schema: cfgEndpointPayload.yaml — `subscribeTopics.items.properties.qos`] |
| `…subscribeTopics[].retain` | subscribeTopics item | boolean | Required (in item) | — | Whether the subscription retains messages. [verified-from-schema: cfgEndpointPayload.yaml — `subscribeTopics.items.properties.retain`] |
| `…configuration.securityParams` | configuration | object | Optional (required for TLS use) | — | Security parameters for the endpoint. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.securityParams`] |
| `…securityParams.format` | securityParams | string (enum) | Required (in object) | `PEM` \| `PFX`; only PEM is supported | Format of the security certificates. [verified-from-schema: cfgEndpointPayload.yaml — `securityParams.properties.format`, `securityParams.required`] |
| `…securityParams.caCertificateFile` | securityParams | string | Required (in object) | example `cloud-trusted-ca-certs.crt` | File containing the CA certificates. [verified-from-schema: cfgEndpointPayload.yaml — `securityParams.properties.caCertificateFile`] |
| `…securityParams.clientCert` | securityParams | string | Required (in object) | example `client_cert.pem` | File containing the client certificate. [verified-from-schema: cfgEndpointPayload.yaml — `securityParams.properties.clientCert`] |
| `…securityParams.clientKey` | securityParams | string | Required (in object) | example `client_key.pem` | File containing the client private key. [verified-from-schema: cfgEndpointPayload.yaml — `securityParams.properties.clientKey`] |
| `…configuration.eventConfiguration` | configuration | object | Optional | `$ref` cfgEventPayload.yaml | Reference to the event configuration schema. [verified-from-schema: cfgEndpointPayload.yaml — `configuration.properties.eventConfiguration`] |

> Note: There is no per-message auth block in this API. MQTT credentials live in the endpoint's `mqttParams` (`username`/`password`) and are set via `config_endpoint`/`set_config` (reference only). No `auth.user`/`auth.password` field exists.

### JSON Request Example
```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "mgmt_tls",
      "epType": "MGMT",
      "protocol": "MQTT_TLS",
      "activate": false,
      "url": "broker.ip.com",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "ZEBRA",
      "mqttParams": {
        "keepAlive": 300,
        "cleanSession": true,
        "reconnectDelayMin": 5,
        "reconnectDelayMax": 60,
        "publishTopics": [
          { "topic": "MGMT/clients/resp", "qos": 1, "retain": false },
          { "topic": "MGMT/clients/event", "qos": 1, "retain": false },
          { "topic": "MGMT/clients/rfid", "qos": 0, "retain": true }
        ],
        "subscribeTopics": [
          { "topic": "MGMT/clients/cmnd", "qos": 0, "retain": false }
        ]
      },
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "mqtt_ca_cert",
        "clientCert": "mqtt_client_cert",
        "clientKey": "mqtt_client_key"
      }
    }
  }
}
```
[verified-from-schema: commands/dev_mgmt/config_endpoint.json — first `examples[]` entry (MGMT/MQTT_TLS add)]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | top-level | string | Optional (not in a `required` list in this response schema) | example `config_endpoint` | The command that was executed to configure an endpoint. [verified-from-schema: response/dev_mgmt/config_endpoint.json — `properties.command`] |
| `requestId` | top-level | string | Optional | example `abc123` | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/config_endpoint.json — `properties.requestId`] |
| `apiVersion` | top-level | string (enum) | Optional | `V1.0` \| `V1.1`; example `V1.1` | API version. [verified-from-schema: response/dev_mgmt/config_endpoint.json — `properties.apiVersion`] |
| `response` | top-level | object | Optional | `$ref` response.yaml | Standard response object containing the status code and description. [verified-from-schema: response/dev_mgmt/config_endpoint.json — `properties.response`] |
| `response.code` | response | integer | Required (in response object) | `minimum: 0`, `maximum: 30`; full code→meaning table carried verbatim | Response code indicating success or failure. [verified-from-schema: refrence/response/response.yaml — `properties.code`, `required`] |
| `response.description` | response | string | Required (in response object) | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml — `properties.description`, `required`] |
| `payload` | top-level | — | Optional | not present in this response schema | No additional `payload` object is defined for `config_endpoint` responses. [verified-from-schema: response/dev_mgmt/config_endpoint.json — only command/requestId/apiVersion/response properties] |

### JSON Response Example
```json
{
  "command": "config_endpoint",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/dev_mgmt/config_endpoint.json — `examples[0]`]

## 5. Associated Error Codes

The codes below are the **hypothesized subset** for this command, drawn verbatim from the `code → meaning` table in `refrence/response/response.yaml` (integers 0–30). The fact that these codes are *representable* on this command is [verified-via-local-mock: routing/shape only]. The code↔trigger **binding** is [firmware-only-unknown] unless `response.yaml` states it verbatim. Where a "Triggering Condition" is shown below it is sourced from the meaning text in `response.yaml` (the meaning, not a verified runtime binding); supplementary conditions seen in the _meta grounding page are labeled accordingly and remain firmware-unverified bindings.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Operation completed successfully (meaning per response.yaml). Binding to this command: [verified-via-local-mock: routing/shape only]. [verified-from-schema: response.yaml — code 0 "Success"] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 1 | Accepted | Command payload is accepted | Meaning per response.yaml: "Command payload is accepted." Per-command trigger [firmware-only-unknown]; representability [verified-via-local-mock: routing/shape only]. [verified-from-schema: response.yaml — code 1] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 1, "description": "Command payload is accepted" } }` |
| 2 | Error | Invalid payload | Meaning per response.yaml: "Invalid payload." Per-command trigger [firmware-only-unknown]; representability [verified-via-local-mock: routing/shape only]. [verified-from-schema: response.yaml — code 2] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 10 | Error | Configuration already exists | Meaning per response.yaml: "Configuration already exists." Grounding page (firmware-unverified binding): an `add` whose `endpointName` already exists returns code 10. [verified-from-schema: response.yaml — code 10; verified-from-_meta-knowledge-base: .../config_endpoint.md — "Operations"/"Endpoint Name"] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 10, "description": "Configuration already exists" } }` |
| 23 | Error | Invalid enum value | Meaning per response.yaml: "Invalid enum value." Grounding page (firmware-unverified binding): a field value does not match any allowed enum option. [verified-from-schema: response.yaml — code 23; verified-from-_meta-knowledge-base: .../config_endpoint.md — "Error Codes"] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |
| 25 | Error | Max 3 publish topics exceeded | Meaning per response.yaml: "Max 3 publish topics exceeded." Grounding page (firmware-unverified binding): more than 3 entries in `publishTopics`. [verified-from-schema: response.yaml — code 25; verified-from-_meta-knowledge-base: .../config_endpoint.md — "Topics"/"Error Codes"] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 25, "description": "Max 3 publish topics exceeded" } }` |
| 26 | Error | Max 1 subscribe topic exceeded | Meaning per response.yaml: "Max 1 subscribe topic exceeded." Grounding page (firmware-unverified binding): more than 1 entry in `subscribeTopics`. [verified-from-schema: response.yaml — code 26; verified-from-_meta-knowledge-base: .../config_endpoint.md — "Topics"/"Error Codes"] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 26, "description": "Max 1 subscribe topic exceeded" } }` |
| 27 | Error | Invalid tenant ID length | Meaning per response.yaml: "Invalid tenant ID length." Grounding page (firmware-unverified binding): `tenantId` exceeds the maximum allowed character length. [verified-from-schema: response.yaml — code 27; verified-from-_meta-knowledge-base: .../config_endpoint.md — "Error Codes"] | `{ "command": "config_endpoint", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 27, "description": "Invalid tenant ID length" } }` |

> The "Status" / "Name" text is the verbatim meaning from `response.yaml`. Assignment of any specific code to a specific failure of `config_endpoint` at runtime is [firmware-only-unknown] except where the _meta grounding page states it (and even then that binding is firmware-unverified). The subset {0,1,2,10,23,25,26,27} is documented as a hypothesis; its representability on this command is [verified-via-local-mock: routing/shape only].

---

# Command: config_events

## 1. Intent & Objective

The `config_events` command enables or disables specific device events on a Zebra handheld RFID reader (RFD40/RFD90) and sets the associated alert threshold/heartbeat configuration. The command schema states this verbatim: "Enables or disables specific device events. To apply the changes, a device reboot is required." [verified-from-schema: commands/dev_mgmt/config_events.json field `description`].

An application uses `config_events` during the "Configure / Setup Event Streaming" phase of device monitoring, after an endpoint has been provisioned and the device has connected to its MQTT broker. The _meta grounding page describes this exact flow for sleds: under "Configure", the step is "**config_events** to enable interested status notifications" covering Alerts, Exception, and Periodic Heartbeat (Interval: 60 Sec default). [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md, "IoT Connector / Monitoring Sleds" table]. The grounding page also lists the categories of events that monitoring exposes for sleds, including Alerts, Firmware update, Download Info, Power source, Temperature Info, Network Status, System Exceptions, Battery, Exception, and Heartbeat (Inventory, Battery). [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md, "IoT Connector / Monitoring Sleds" Control column].

The reader behaviors this command triggers are determined by the boolean toggles inside the `eventConfiguration` payload. Per the payload schema, setting a flag to `true` enables emission of that event class: terminal connection/disconnection events, firmware update events, network events, heartbeat, power source alerts, battery alerts, temperature alerts, and file download alerts. The heartbeat behavior is further shaped by `heartbeatConfiguration` (interval in seconds, plus whether inventory status and battery status are folded into each heartbeat message). [verified-from-schema: refrence/payload/cfgEventPayload.yaml fields `terminalConnection`, `firmwareUpdate`, `network`, `heartbeat`, `power`, `battery`, `temperature`, `fileDownload`, `heartbeatConfiguration`]. Once enabled, these events are subsequently published by the reader as asynchronous event messages on the endpoint's event topic; the toggles configured here govern which of those streams are active. A device reboot is required for the change to take effect. [verified-from-schema: commands/dev_mgmt/config_events.json field `description`].

Architecturally, `config_events` is a management (MGMT) command. In this deployment it is routed over the live MDM management endpoint (epType MDM). The reader subscribes for commands on the endpoint's command topic and publishes its response on the response topic; the endpoint, its protocol, and its topics are all provisioned beforehand via endpoint configuration (reference only: `config_endpoint` / `set_config`, payload `epConfig`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml fields `epType`, `mqttParams.publishTopics`, `mqttParams.subscribeTopics`]. The MDM/SOTI management path for RFD40/90 is corroborated conceptually by the grounding page, which lists MDM and SOTI Connect as the management channel for these sleds. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md, "MDM / SOTI Connect RFD40/90"].

## 2. Topic Mapping

Topics are configured per endpoint via the endpoint's `mqttParams` (publish and subscribe topic arrays), each carrying its own `qos` (integer) and `retain` (boolean). QoS/Retain are NOT bound per operation in any schema; for the per-operation axis this is "not specified per-operation in schema". The schema's own topic examples use the `MGMT/clients/*` form, and the general topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. The live MDM management endpoint in this deployment uses the literal `MDM/clients/cmnd`, `MDM/clients/resp`, and `MDM/clients/event` topics with no tenant prefix (tenantId zebra). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml fields `mqttParams.publishTopics[].topic` (example `MGMT/clients/resp`), `mqttParams.subscribeTopics[].topic` (example `MGMT/clients/cmnd`), `mqttParams.publishTopics[].qos`, `mqttParams.publishTopics[].retain`, `mqttParams.subscribeTopics[].qos`, `mqttParams.subscribeTopics[].retain`].

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd (live: MDM/clients/cmnd) | not specified per-operation in schema (per-topic `qos` on the subscribe-topic the device reads commands from; example `qos: 1` is given only on the publish-topic example) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.subscribeTopics[].qos`] | not specified per-operation in schema (per-topic `retain` boolean) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.subscribeTopics[].retain`] |
| Subscribe (Response) | {EP_TYPE}/clients/resp (live: MDM/clients/resp) | not specified per-operation in schema (per-topic `qos`; publish-topic example shows `qos: 1`) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.publishTopics[].qos`] | not specified per-operation in schema (per-topic `retain` boolean) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.publishTopics[].retain`] |

Note: from the reader's perspective, the device subscribes to the `cmnd` topic (so it appears under `subscribeTopics`) and publishes to the `resp`/`event` topics (so they appear under `publishTopics`). The endpoint-level `qosCommon` (integer, example `1`) provides a common QoS default for the endpoint. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml field `qosCommon`]. Topic routing/shape for this command was confirmed only as routing/shape: [verified-via-local-mock: routing/shape only].

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | literal `config_events` (example) | Command issued to configure events & alert threshold values [verified-from-schema: commands/dev_mgmt/config_events.json `properties.command`] |
| requestId | root | string | Required | documented as a 16 hex digit identifier; examples use short strings (`abc123`) — divergence noted | A unique identifier for the request, allowing tracking and debugging of the operation [verified-from-schema: commands/dev_mgmt/config_events.json `properties.requestId`] |
| eventConfiguration | root | object | Optional (not in `required`) | `$ref` cfgEventPayload.yaml | Specifies which device events to enable or disable and their configuration thresholds [verified-from-schema: commands/dev_mgmt/config_events.json `properties.eventConfiguration`; refrence/payload/cfgEventPayload.yaml `description`] |
| eventConfiguration.terminalConnection | eventConfiguration | boolean | Optional | true/false | set to true to enable terminal connection/disconnection events [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.terminalConnection`] |
| eventConfiguration.firmwareUpdate | eventConfiguration | boolean | Optional | true/false | set to true to enable fw update events [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.firmwareUpdate`] |
| eventConfiguration.network | eventConfiguration | boolean | Optional | true/false | set to true to enable network events [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.network`] |
| eventConfiguration.heartbeat | eventConfiguration | boolean | Optional | true/false | set to true to enable heart beat [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.heartbeat`] |
| eventConfiguration.power | eventConfiguration | boolean | Optional | true/false | set to true to enable power source alerts [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.power`] |
| eventConfiguration.battery | eventConfiguration | boolean | Optional | true/false | set to true to enable battery alerts [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.battery`] |
| eventConfiguration.temperature | eventConfiguration | boolean | Optional | true/false | set to true to enable temperature alerts [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.temperature`] |
| eventConfiguration.fileDownload | eventConfiguration | boolean | Optional | true/false | set to true to enable file download alerts [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.fileDownload`] |
| eventConfiguration.heartbeatConfiguration | eventConfiguration | object | Optional | see sub-fields | Configuration for heartbeat event reporting, including interval and status inclusions [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.heartbeatConfiguration`] |
| eventConfiguration.heartbeatConfiguration.interval | heartbeatConfiguration | integer | Optional | example `100` (seconds) | heart beat interval in seconds [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.heartbeatConfiguration.properties.interval`] |
| eventConfiguration.heartbeatConfiguration.inventoryStatus | heartbeatConfiguration | boolean | Optional | true/false | set to true to enable inventory status as part of heartbeat message [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.heartbeatConfiguration.properties.inventoryStatus`] |
| eventConfiguration.heartbeatConfiguration.batteryStatus | heartbeatConfiguration | boolean | Optional | true/false | set to true to enable battery status as part of heartbeat message [verified-from-schema: refrence/payload/cfgEventPayload.yaml `properties.heartbeatConfiguration.properties.batteryStatus`] |

Divergence note: the `config_events.json` `examples` block contains additional keys that are NOT defined in the referenced `cfgEventPayload.yaml` `properties` — namely `antenna`, `gpi`, `exceptions`, `ntp`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`, the threshold fields `cpuThreshold`/`ramThreshold`/`flashThreshold`/`temperatureThreshold`, and `heartbeatConfiguration.userApps`. Because they appear only in the example and have no schema definition, their type/constraint/semantics are [firmware-only-unknown]. [verified-from-schema: commands/dev_mgmt/config_events.json `examples`; refrence/payload/cfgEventPayload.yaml `properties`]. There is no per-message auth block in this payload.

### JSON Request Example
```json
{
  "command": "config_events",
  "requestId": "abc123",
  "eventConfiguration": {
    "terminalConnection": true,
    "firmwareUpdate": true,
    "network": true,
    "heartbeat": true,
    "power": true,
    "battery": true,
    "temperature": true,
    "fileDownload": true,
    "heartbeatConfiguration": {
      "interval": 100,
      "inventoryStatus": true,
      "batteryStatus": true
    }
  }
}
```
[verified-from-schema: commands/dev_mgmt/config_events.json `examples`; refrence/payload/cfgEventPayload.yaml `properties` — example pared to schema-defined fields only]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `config_events` | The command that was executed to configure events [verified-from-schema: response/dev_mgmt/config_events.json `properties.command`] |
| requestId | root | string | Required | example `abc123` (documented as 16 hex digit identifier; example diverges) | The unique identifier of the original request [verified-from-schema: response/dev_mgmt/config_events.json `properties.requestId`] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1` (example `V1.1`) | API version of the response [verified-from-schema: response/dev_mgmt/config_events.json `properties.apiVersion`] |
| response | root | object | Required | `$ref` response.yaml | Standard response object containing the status code and description of the operation result [verified-from-schema: response/dev_mgmt/config_events.json `properties.response`; refrence/response/response.yaml `description`] |
| response.code | response | integer | Required | integer 0–30 (full code→meaning table in response.yaml) | Response code [verified-from-schema: refrence/response/response.yaml `properties.code`] |
| response.description | response | string | Required | example `Success` | response description in detail [verified-from-schema: refrence/response/response.yaml `properties.description`] |
| payload (optional) | root | — | Optional | not defined in response schema | No `payload` object is defined in this response schema [firmware-only-unknown] |

### JSON Response Example
```json
{ "command": "config_events", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/dev_mgmt/config_events.json `examples`]

## 5. Associated Error Codes

The codes below are the hypothesized subset for `config_events` (0, 2, 23). All meanings are quoted verbatim from the full code→meaning table in `refrence/response/response.yaml`. The fact that these codes are *representable* on this command is [verified-via-local-mock: routing/shape only]. The specific code↔trigger BINDING is [firmware-only-unknown] because `response.yaml` lists only code→meaning, not which command/condition emits each code. The "Triggering Condition" entries below are inferred from the verbatim meaning text and are therefore [firmware-only-unknown] for the precise emission condition.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command accepted and applied (reboot still required to take effect per command description); [firmware-only-unknown] for exact emission condition. [verified-from-schema: refrence/response/response.yaml code 0 = "Success"] | `{ "command": "config_events", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Inferred: the `eventConfiguration` payload is malformed or structurally invalid; binding [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code 2 = "Invalid payload"] | `{ "command": "config_events", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 23 | Error | Invalid enum value | Inferred: a field carries a value outside its allowed enumerated set; binding [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code 23 = "Invalid enum value"] | `{ "command": "config_events", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |

---

# Command: delete_certificate

## 1. Intent & Objective

The `delete_certificate` command instructs an RFD40/RFD90 handheld RFID reader to remove a previously saved certificate from the device. The command literal is `delete_certificate` and its purpose is described in the command schema as "Command issued to delete saved certificate" [verified-from-schema: commands/dev_mgmt/delete_certificate.json `description`], with the embedded `command` property documented as "Specifies the operation being performed, in this case, deleting saved certificates." [verified-from-schema: commands/dev_mgmt/delete_certificate.json `properties.command.description`].

The certificate to act on is identified by the `certificateInfo` object, whose schema title is "certificateInfo" and which "Identifies the certificate to be deleted from the device." [verified-from-schema: refrence/payload/delCertPayload.yaml `title`, `description`]. A certificate is selected by `type` (required) and optionally by `name`. When the certificate `name` is not provided, the device removes every previously installed certificate of the matching `type`: "If certificate name not provided, then we will delete all the previously installed certificate of matching type." [verified-from-schema: refrence/payload/delCertPayload.yaml `properties.name.description`]. The supported certificate `type` values are `server`, `client`, `mqtt`, `wifi`, and `filestore` [verified-from-schema: refrence/payload/delCertPayload.yaml `properties.type.enum`].

When an application uses it: a management application issues `delete_certificate` to revoke or clean up certificate material that the reader previously stored, for example when rotating credentials, decommissioning a trust relationship, or freeing certificate slots before installing replacements.

Architectural / conceptual context (certificate management on the reader): the reader can install multiple certificates, and certificates are categorized by type. The knowledge base describes the principal roles: a **Server** certificate (only one allowed; secures incoming connections to the reader such as the Web Console/SFTP; the reader ships with a self-signed server certificate by default), **Client** certificates (more than one allowed; secure outgoing connections from the reader and are the recommended type for use with IoT Connector), and **App** certificates (for use by user applications on the reader) [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/certificate-management-zebra-iot-connector-documentation.md]. The grounding page also notes that the reader supports certificates in PFX format and that a certificate's password must be included when configuring endpoints that use it [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/certificate-management-zebra-iot-connector-documentation.md]. Note that the `mqtt`, `wifi`, and `filestore` enum values in the payload schema are not individually defined in the grounding page; their precise device-side semantics are [firmware-only-unknown].

Routing / endpoint context: this command is part of the device management (MGMT) command set and is delivered over the management endpoint. In this MOCK FALLBACK run the physical device session was not proven attached, so the on-device deletion behavior (whether files are physically erased, side effects on active connections, etc.) is [firmware-only-unknown]. The command/response routing and message shape are [verified-via-local-mock: routing/shape only]. The management endpoint observed in the endpoint configuration uses `epType` `MDM` with literal topics `MDM/clients/cmnd|resp|event` and `tenantId` `ZEBRA`, with no tenant prefix on the topic path [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]` (`endpointName: mgmt_tst`, `epType: MDM`)].

## 2. Topic Mapping

Topics are configured per endpoint via the endpoint's `mqttParams` (`publishTopics` / `subscribeTopics`), and each topic entry carries its own `qos` (integer) and `retain` (boolean), alongside an endpoint-level `qosCommon` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.publishTopics.items.properties` and `...subscribeTopics.items.properties`, `properties.configuration.properties.qosCommon`]. There is no per-operation QoS binding for `delete_certificate`; QoS/Retain are properties of the topic, not of the command. The values below are cited from the `MDM` endpoint instance in the `config_endpoint` example (literal `MDM/clients/*` topics, `tenantId` `ZEBRA`).

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd → MDM/clients/cmnd | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]...subscribeTopics[0].qos`] (per-topic, not per-operation; not specified per-operation in schema) | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]...subscribeTopics[0].retain`] |
| Subscribe (Response) | {EP_TYPE}/clients/resp → MDM/clients/resp | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]...publishTopics[0].qos`] (per-topic, not per-operation; not specified per-operation in schema) | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]...publishTopics[0].retain`] |

Notes:
- The topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` and topics are configurable per endpoint [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `...publishTopics.items.properties.topic`, `...subscribeTopics.items.properties.topic`]. From the device's perspective, the command arrives on its subscribe topic (`.../cmnd`) and the response is emitted on a publish topic (`.../resp`).
- The MDM endpoint example uses literal `MDM/clients/cmnd|resp|event` with no tenant prefix; `tenantId` is `ZEBRA` [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]`].
- Routing/shape of this command/response over these topics is [verified-via-local-mock: routing/shape only].

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required (fixed value `delete_certificate`) | example `delete_certificate` | Specifies the operation being performed, in this case, deleting saved certificates. [verified-from-schema: commands/dev_mgmt/delete_certificate.json `properties.command`] |
| requestId | root | string | Required | example `abc123`. Documented intent in the canonical model is a "16 hex digit identifier" [verified-from-schema: models/iot_mgmt_commands.v1.1.json `properties.requestId.description`], but the per-command schema example uses the short string `abc123` [verified-from-schema: commands/dev_mgmt/delete_certificate.json `properties.requestId.example`] — divergence noted (documented intent vs. example reality; not "fixed" on either side). | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/delete_certificate.json `properties.requestId.description`] |
| certificateInfo | root | object | Required (present in all examples; `$ref` to delCertPayload.yaml) | — | Identifies the certificate to be deleted from the device. [verified-from-schema: commands/dev_mgmt/delete_certificate.json `properties.certificateInfo` → refrence/payload/delCertPayload.yaml `title`/`description`] |
| certificateInfo.name | certificateInfo | string | Optional | example `test_soti` | Name of the certificate. If certificate name not provided, then all previously installed certificates of matching type are deleted. [verified-from-schema: refrence/payload/delCertPayload.yaml `properties.name`] |
| certificateInfo.type | certificateInfo | string | Required | enum: `server`, `client`, `mqtt`, `wifi`, `filestore`; example `client` | Different types of supported certificate. [verified-from-schema: refrence/payload/delCertPayload.yaml `properties.type`, `required: [type]`] |

Note: there is no per-message authentication block; MQTT credentials live in the endpoint `mqttParams` (configured via `config_endpoint`/`set_config`) and are not part of this command payload.

### JSON Request Example
```json
{
  "command": "delete_certificate",
  "requestId": "abc123",
  "certificateInfo": {
    "name": "ca_cert",
    "type": "wifi"
  }
}
```
[verified-from-schema: commands/dev_mgmt/delete_certificate.json `examples[0]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `delete_certificate` | The command that was executed to delete a certificate. [verified-from-schema: response/dev_mgmt/delete_certificate.json `properties.command`, `required`] |
| requestId | root | string | Required | example `abc123` | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/delete_certificate.json `properties.requestId`, `required`] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1`; example `V1.1` | API version of the response. [verified-from-schema: response/dev_mgmt/delete_certificate.json `properties.apiVersion`, `required`] |
| response | root | object | Required (`$ref` to response.yaml) | — | Standard response object containing the status code and description of the operation result. [verified-from-schema: response/dev_mgmt/delete_certificate.json `properties.response` → refrence/response/response.yaml `description`] |
| response.code | response | integer | Required | minimum 0, maximum 30; example `0` | Response code drawn from the 0–30 code→meaning table. [verified-from-schema: refrence/response/response.yaml `properties.code`, `required`] |
| response.description | response | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml `properties.description`, `required`] |

### JSON Response Example
```json
{
  "command": "delete_certificate",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/dev_mgmt/delete_certificate.json `examples[0]`]

## 5. Associated Error Codes

The codes below are drawn verbatim from the full 0–30 code→meaning table in `refrence/response/response.yaml` [verified-from-schema: refrence/response/response.yaml `properties.code.description`]. The subset shown for this command (0, 21) is a **hypothesis**: that these codes are representable on this command's response is [verified-via-local-mock: routing/shape only]. The binding between a specific code and the exact triggering condition for `delete_certificate` is [firmware-only-unknown] — `response.yaml` provides only the code→meaning mapping, not per-command triggers.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Operation completed successfully (certificate deletion accepted/performed). Meaning is verbatim from the table [verified-from-schema: refrence/response/response.yaml code `0`]; exact device-side trigger for this command is [firmware-only-unknown]. | `{ "command": "delete_certificate", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 21 | Error (hypothesized) | Certificate not found | Meaning "Certificate not found" is verbatim from the table [verified-from-schema: refrence/response/response.yaml code `21`]; the specific condition (e.g., no certificate of the given `name`/`type` exists) for this command is [firmware-only-unknown]. Representability on `delete_certificate` is [verified-via-local-mock: routing/shape only]. | `{ "command": "delete_certificate", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 21, "description": "Certificate not found" } }` |

Note: the error response examples above follow the response schema shape [verified-from-schema: response/dev_mgmt/delete_certificate.json `examples[0]`] with the `description` text taken verbatim from the code table [verified-from-schema: refrence/response/response.yaml `properties.code.description`].

---

# Command: delete_wifi_profile

## 1. Intent & Objective

`delete_wifi_profile` is a device-management command that instructs an RFD40/RFD90 handheld RFID reader to delete a previously saved Wi-Fi profile from the device, identified by its SSID. The command schema describes itself as "Command issued to delete saved wifi profile" and the `command` property carries the description "Specifies the operation being performed, in this case, deleting wifi profile." [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json — `description`, `properties.command.description`]

The profile to be removed is named by a single field, `essid`, described in the payload schema as the "SSID of the wifi profile to be deleted"; the payload object itself is described as identifying "the WiFi profile to be deleted from the device." [verified-from-schema: refrence/payload/delWifiProfile.yaml — `description`, `properties.essid.description`]

An application uses this command when it needs to remove stale, incorrect, or no-longer-authorized wireless credentials from a fielded reader as part of remote Wi-Fi lifecycle management. Conceptually, this corresponds to the device-side counterpart of the 123RFID Desktop Wi-Fi Configuration workflow, where a user can "Click **Delete** to delete the selected network profile" for RFD40/RFD90 readers, and where the guide notes that "Wi-Fi configuration is available on handheld readers only." [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/123rfid-desktop-feature-reference.md — "Wi-Fi Configuration" section, lines 645, 701]

Architecturally, this run documents the command as routed over the MDM management endpoint (MDM device-management). The reader subscribes for commands and publishes responses on MDM topics configured per endpoint; the binding of this command to that endpoint and the resulting reader behavior on the radio (the actual removal of the stored profile from the Wi-Fi supplicant configuration and any disconnection side effects) is firmware-internal. [verified-via-local-mock: routing/shape only] The precise on-device firmware behavior triggered (supplicant store mutation, reconnection logic) is [firmware-only-unknown].

## 2. Topic Mapping

Topics are configured per endpoint via `config_endpoint` / `set_config`; the values below show the MDM endpoint example instance, which uses literal `MDM/clients/*` topics with no tenant prefix (tenantId `ZEBRA`/`zebra`). QoS and Retain are defined per topic inside `mqttParams.publishTopics[]` / `mqttParams.subscribeTopics[]` (each carrying `qos:int`, `retain:bool`) plus a top-level `qosCommon`; there is no per-operation QoS binding for `delete_wifi_profile`.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Subscribe (Request, device receives) | MDM/clients/cmnd | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example `mqttParams.subscribeTopics[0].qos`] | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example `mqttParams.subscribeTopics[0].retain`] |
| Publish (Response, device sends) | MDM/clients/resp | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example `mqttParams.publishTopics[0].qos`] | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example `mqttParams.publishTopics[0].retain`] |

Notes:
- The topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`; topics are configurable per endpoint, so a non-MDM endpoint would substitute its own `epType` prefix (e.g., `MGMT/clients/cmnd`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — `mqttParams.publishTopics.items.properties.topic.example` (`MGMT/clients/resp`), `mqttParams.subscribeTopics.items.properties.topic.example` (`MGMT/clients/cmnd`)]
- From the device's perspective, the reader **subscribes** to the `cmnd` topic to receive `delete_wifi_profile` and **publishes** to the `resp` topic to return the result. The QoS/Retain shown are those of the MDM endpoint example definition, not a per-operation binding. For the per-operation QoS axis: not specified per-operation in schema. [verified-via-local-mock: routing/shape only]
- `qos`, `retain`, and `topic` are each `required` per topic entry. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — `mqttParams.publishTopics.items.required`, `mqttParams.subscribeTopics.items.required`]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | default `delete_wifi_profile` | "Specifies the operation being performed, in this case, deleting wifi profile." [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json — `properties.command`, `required`] |
| requestId | root | string | Required | examples use short strings such as `abc123`; a "16 hex digit identifier" intent is documented in the shared models, see divergence note | "A unique identifier for the request, allowing tracking and debugging of the operation." [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json — `properties.requestId`, `required`] |
| wifiProfileInfo | root | object | Optional (not listed in `required`) | — | "Identifies the WiFi profile to be deleted from the device." [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json — `properties.wifiProfileInfo` ($ref delWifiProfile.yaml); refrence/payload/delWifiProfile.yaml — `description`] |
| wifiProfileInfo.essid | wifiProfileInfo | string | Optional (no `required` block in payload schema) | example `JioFi` (schema), `TestAP2` (command example) | "SSID of the wifi profile to be deleted." [verified-from-schema: refrence/payload/delWifiProfile.yaml — `properties.essid`] |

Notes:
- The command schema's `required` array lists only `command` and `requestId`; `wifiProfileInfo` is therefore not marked required at the schema level. [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json — `required`]
- requestId divergence: the field is documented as a "16 hex digit identifier" in the shared command model, but the in-schema examples use short non-hex strings (`abc123`, `abc345`, `1235`). Treat the 16-hex form as documented intent and the short strings as example reality; do not silently "fix" either side. [verified-from-schema: models/iot_mgmt_commands.v1.1.json — `properties.requestId.description` ("16 hex digit identifier"); commands/dev_mgmt/delete_wifi_profile.json — `examples`; response/dev_mgmt/delete_wifi_profile.json — `examples`]
- There is no per-message auth block; MQTT credentials are configured at the endpoint level via `config_endpoint` / `set_config` (`mqttParams.username` / `mqttParams.password`), not in this payload. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — `mqttParams.username`, `mqttParams.password`]

### JSON Request Example
```json
{
  "command": "delete_wifi_profile",
  "requestId": "abc123",
  "wifiProfileInfo": {
    "essid": "TestAP2"
  }
}
```
[verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json — `examples[0]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | (no `required` block in response schema) | default `delete_wifi_profile` | "The command that was executed to delete a WiFi profile." [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `properties.command`] |
| requestId | root | string | (no `required` block in response schema) | default `1235`; echoes the original request id; examples `abc345`, `1235` | "The unique identifier of the original request." [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `properties.requestId`, `examples`] |
| apiVersion | root | string | Optional (present only in some examples) | `V1.1` appears in examples | Present in the code-16 and code-15 examples; absent from the success example. [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `examples[1]`, `examples[2]`] |
| response | root | object | Present in all examples | $ref response.yaml | "Standard response object containing the status code and description of the operation result." [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `properties.response` ($ref response.yaml); refrence/response/response.yaml — `description`] |
| response.code | response | integer | Required | min `0`, max `30` (full 0–30 table) | "Response codes" table. [verified-from-schema: refrence/response/response.yaml — `properties.code`, `required`] |
| response.description | response | string | Required | example `Success` | "response description in detail." [verified-from-schema: refrence/response/response.yaml — `properties.description`, `required`] |

Notes:
- No `payload` object is defined in the response schema for this command; the response carries only `command`, `requestId`, optional `apiVersion`, and `response`. [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `properties`]

### JSON Response Example
```json
{
  "command": "delete_wifi_profile",
  "requestId": "abc345",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `examples[0]` (`code:0`, `description:"Success"`)]

## 5. Associated Error Codes

The subset below is the candidate set for `delete_wifi_profile` (0, 15, 16, 20). All code → meaning rows are drawn verbatim from the 0–30 table in `refrence/response/response.yaml`. The representability of these codes for this command is [verified-via-local-mock: routing/shape only]; the code ↔ trigger binding is [firmware-only-unknown] unless the schema states the pairing verbatim. Codes 15 and 16 are stated verbatim in this command's own response examples (with `description` text), so their presence for this command is grounded; codes 0 and 20 have no verbatim trigger statement for this command.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Operation completed successfully (general success row from the table). Trigger specific to delete_wifi_profile is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml — code 0] | `{ "command": "delete_wifi_profile", "requestId": "abc345", "response": { "code": 0, "description": "Success" } }` [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `examples[0]`] |
| 15 | Error | WIFI Error - SSID not found | Documented meaning is "WIFI Error - SSID not found"; this code and description appear verbatim in this command's response examples. Binding to a specific essid lookup miss is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml — code 15; response/dev_mgmt/delete_wifi_profile.json — `examples[2]`] | `{ "command": "delete_wifi_profile", "requestId": "1235", "apiVersion": "V1.1", "response": { "code": 15, "description": "WIFI Error - SSID not found" } }` [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `examples[2]`] |
| 16 | Error | WIFI Error - Cannot delete active SSID | Documented meaning is "WIFI Error - Cannot delete active SSID"; this code and description appear verbatim in this command's response examples. Binding to the active-connection condition is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml — code 16; response/dev_mgmt/delete_wifi_profile.json — `examples[1]`] | `{ "command": "delete_wifi_profile", "requestId": "1235", "apiVersion": "V1.1", "response": { "code": 16, "description": "WIFI Error - Cannot delete active SSID" } }` [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json — `examples[1]`] |
| 20 | Error | Wifi is not supported | Table meaning is "Wifi is not supported." The specific trigger for delete_wifi_profile is [firmware-only-unknown]; representability is [verified-via-local-mock: routing/shape only]. [verified-from-schema: refrence/response/response.yaml — code 20] | `{ "command": "delete_wifi_profile", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 20, "description": "Wifi is not supported" } }` [shape per response/dev_mgmt/delete_wifi_profile.json — `examples`; code 20 meaning per refrence/response/response.yaml] |

---

# Command: get_config

## 1. Intent & Objective

The `get_config` command instructs an RFD40/RFD90 handheld RFID reader to return its **complete current device configuration** in a single response. The command literal is `get_config` and it carries **no payload** — only the mandatory `command` and `requestId` fields are sent [verified-from-schema: commands/dev_mgmt/get_config.json, `required: [command, requestId]`].

An application issues `get_config` when it needs a full snapshot of reader state for inventory/audit, post-provisioning verification, or troubleshooting. The reader gathers and returns, per the command description, "version details, device status, current region details, ethernet & wifi configuration, end point configuration, details of installed certificates, event and alert configuration" [verified-from-schema: commands/dev_mgmt/get_config.json, `description`].

The returned `currentConfig` object aggregates the following sub-objects [verified-from-schema: refrence/response/getConfigResponse.yaml, `properties`]:

- `readerVersion` — firmware/model/serial/SKU and detailed sub-firmware versions [verified-from-schema: refrence/response/getConfigResponse.yaml, `readerVersion`].
- `deviceStatus` — power source, radio activity/connection, system time, temperature, NTP, terminal connection, battery status [verified-from-schema: refrence/response/getConfigResponse.yaml, `deviceStatus`].
- `currentRegion` — frequency-hopping flag, channel data, country, LBT flag, supported Tx power bounds, regulatory standard [verified-from-schema: refrence/response/getConfigResponse.yaml, `currentRegion`].
- `ethConfig` and `wifiConfig` — Ethernet and Wi-Fi interface details [verified-from-schema: refrence/response/getConfigResponse.yaml, `ethConfig`/`wifiConfig`].
- `installedCerts` — certificates installed on the device [verified-from-schema: refrence/response/getConfigResponse.yaml, `installedCerts`].
- `epConfig` — the endpoint configuration (protocol, security, MQTT params, event configuration) [verified-from-schema: refrence/response/getConfigResponse.yaml, `epConfig`].
- `deviceCapabilities` — capabilities/features supported by the device [verified-from-schema: refrence/response/getConfigResponse.yaml, `deviceCapabilities`].

**Architectural context.** This is a management (MGMT) command. In this run it is routed over the live MDM management endpoint (epType `MDM`), which maps to literal topics `MDM/clients/cmnd|resp|event` with **no tenant prefix** even though `tenantId` is `ZEBRA`/`zebra` [verified-from-schema: commands/dev_mgmt/config_endpoint.json, `mgmt_tst` example: `epType: MDM`, `tenantId: ZEBRA`, topics `MDM/clients/*`]. Endpoint types are an enum of `MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, `configuration.epType.enum`].

The reader behaviors triggered by `get_config` (which internal subsystems are queried, timing, locking against in-progress radio operations) are firmware-internal and not expressed in the schema. [firmware-only-unknown]

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd | not specified per-operation in schema (per-topic on the MDM subscribe entry `MDM/clients/cmnd`: qos `0`) | not specified per-operation in schema (per-topic: retain `false`) |
| Subscribe (Response) | {EP_TYPE}/clients/resp | not specified per-operation in schema (per-topic on the MDM publish entry `MDM/clients/resp`: qos `1`) | not specified per-operation in schema (per-topic: retain `false`) |

Topics are **configured per endpoint** via `config_endpoint`/`set_config`; QoS and Retain are defined per-topic inside `cfgEndpointPayload.mqttParams` (`qos:int`, `retain:bool`) plus an endpoint-wide `qosCommon` integer [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, `mqttParams.publishTopics[].{qos,retain}`, `mqttParams.subscribeTopics[].{qos,retain}`, `configuration.qosCommon`]. There is **no per-operation QoS binding** for `get_config`; for that axis the value is "not specified per-operation in schema".

Live MDM endpoint instance (note: the device subscribes to `cmnd` and publishes `resp`/`event`/`rfid`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json, `mgmt_tst` (`epType: MDM`) example]:

| Topic | Role on device | QoS | Retain |
|-------|----------------|-----|--------|
| MDM/clients/cmnd | subscribe (app -> reader request) | 0 | false |
| MDM/clients/resp | publish (reader -> app response) | 1 | false |
| MDM/clients/event | publish (reader -> app event) | 1 | false |
| MDM/clients/rfid | publish (reader -> app rfid) | 0 | true |

Topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`; the live MDM_EP uses literal `MDM/clients/*` with no tenant prefix despite `tenantId` being set [verified-from-schema: commands/dev_mgmt/config_endpoint.json, `mgmt_tst` example]. Routing/shape of cmnd->resp confirmed only at the local mock level. [verified-via-local-mock: routing/shape only]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | literal `get_config` (example `get_config`) | Specifies the operation being performed — retrieving the complete device configuration [verified-from-schema: commands/dev_mgmt/get_config.json, `properties.command`]. |
| requestId | root | string | Required | 16 hex-digit identifier (documented); example uses short string `abc123` (see divergence note) | A unique identifier for the request, allowing tracking and debugging of the operation [verified-from-schema: commands/dev_mgmt/get_config.json, `properties.requestId`]. |

There is **no payload key** for this command — `get_config` sends `command` + `requestId` only, and both are required [verified-from-schema: commands/dev_mgmt/get_config.json, `required: [command, requestId]`]. There is **no auth block / no auth.user / no auth.password**; MQTT credentials live only in endpoint `mqttParams` (`username`/`password`) configured via `config_endpoint`/`set_config` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, `mqttParams.username`/`mqttParams.password`].

**requestId divergence:** `requestId` is documented as a 16 hex-digit identifier, but the schema example uses a short string (`abc123`) [verified-from-schema: commands/dev_mgmt/get_config.json, `properties.requestId.example`].

### JSON Request Example
```json
{ "command": "get_config", "requestId": "abc123" }
```

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | `get_config` (example) | The command that was executed to retrieve the device configuration [verified-from-schema: response/dev_mgmt/get_config.json, `properties.command`]. |
| requestId | root | string | Required | example `abc123` (see requestId divergence note in §3) | The unique identifier of the original request [verified-from-schema: response/dev_mgmt/get_config.json, `properties.requestId`]. |
| apiVersion | root | string | Required | example `V1.1` | API version of the response [verified-from-schema: response/dev_mgmt/get_config.json, `properties.apiVersion`]. |
| currentConfig | root | object | Optional (present on success; not in `required`) | sub-objects: `readerVersion`, `deviceStatus`, `currentRegion`, `ethConfig`, `wifiConfig`, `installedCerts`, `epConfig`, `deviceCapabilities` | The complete device configuration snapshot [verified-from-schema: response/dev_mgmt/get_config.json `properties.currentConfig` $ref refrence/response/getConfigResponse.yaml]. |
| response.code | response | integer | Required | integer 0–30 (see §5 / table in response.yaml) | Response status code [verified-from-schema: refrence/response/response.yaml, `properties.code`]. |
| response.description | response | string | Required | example `Success` | Response description in detail [verified-from-schema: refrence/response/response.yaml, `properties.description`]. |

Note: the response schema's `required` array lists `command, requestId, apiVersion, payload`, but the named config object in the schema is `currentConfig` (not `payload`); this is a schema inconsistency [verified-from-schema: response/dev_mgmt/get_config.json, `required` vs `properties.currentConfig`].

### JSON Response Example
```json
{ "command": "get_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```

## 5. Associated Error Codes

Hypothesized subset for `get_config`, drawn verbatim from the code->meaning table in `refrence/response/response.yaml`. The set of codes that are **representable** on the resp topic is confirmed only at routing/shape level [verified-via-local-mock: routing/shape only]. The code<->trigger **binding** is [firmware-only-unknown] because `response.yaml` states only the meaning, not which command/condition raises each code.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Configuration retrieved successfully (meaning verbatim) [verified-from-schema: refrence/response/response.yaml, code 0]. Per-trigger binding [firmware-only-unknown]. | `{ "command": "get_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Meaning "Invalid payload" verbatim [verified-from-schema: refrence/response/response.yaml, code 2]. Exact trigger for get_config [firmware-only-unknown]. | `{ "command": "get_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 3 | Error | Not able to retrieve information | Meaning "Not able to retrieve information" verbatim [verified-from-schema: refrence/response/response.yaml, code 3]. Exact trigger for get_config [firmware-only-unknown]. | `{ "command": "get_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |
| 23 | Error | Invalid enum value | Meaning "Invalid enum value" verbatim [verified-from-schema: refrence/response/response.yaml, code 23]. Exact trigger for get_config [firmware-only-unknown]. | `{ "command": "get_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |

---

# Command: get_current_region

## 1. Intent & Objective

The `get_current_region` command retrieves the **current regulatory region configuration** of an RFD40/RFD90 handheld RFID reader. The command schema describes it verbatim as: "This command is used to retrieve the current region configuration of the device." [verified-from-schema: commands/dev_mgmt/get_current_region.json (description)].

An application issues this command when it needs to discover which regulatory region the reader is presently operating under and the radio parameters that region imposes, before performing inventory or configuring transmit power. The response returns a `currentRegion` object describing the active region: whether frequency hopping is enabled (`frequencyHopping`), the list of channel frequencies in use (`channelData`), the configured `country`, whether Listen Before Talk is enabled (`lbtEnabled`), the maximum and minimum supported transmission power (`maxTxPowerSupported` / `minTxPowerSupported`, in dBm), and the governing `regulatoryStandard` (e.g. `FCC`, `ETSI_EU_800M_900M_3_CHANNEL`). [verified-from-schema: refrence/response/currentRegionResponse.yaml (frequencyHopping, channelData, country, lbtEnabled, maxTxPowerSupported, minTxPowerSupported, regulatoryStandard)].

Reader behaviors triggered: this is a read-only management query. It reports the region state that the reader's radio is bound to; the exact firmware behavior (how the reader internally derives the channel plan, the precise dBm scaling of the power fields, and whether a query is rejected when no region is set) is [firmware-only-unknown]. The relationship between the example integer power values (`maxTxPowerSupported: 300`, `minTxPowerSupported: 0` in the response example) and the dBm-decimal examples in the reference (`29.2`, `10.0`) is a units/representation divergence in the source files and is [firmware-only-unknown].

Architectural context: this command is routed over a **management endpoint**. In this documentation run it is described against the **MDM** endpoint example (an MDM-type management endpoint), which carries device-management commands over MQTT. The Zebra IoT Connector (IOTC) on the reader connects as an MQTT client to a broker (for example EMQX), optionally over mutual TLS, and subscribes/publishes on per-endpoint topics. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/appendix-zebra-iot-connector-documentation.md] (MQTT client, endpoints, topics, mTLS concepts). The MDM endpoint instance, topics, QoS/Retain, and `tenantId` used below are grounded in the `config_endpoint` MDM example. [verified-from-schema: commands/dev_mgmt/config_endpoint.json (examples, epType MDM)].

## 2. Topic Mapping

Topics are configured **per endpoint** through `config_endpoint` / `set_config`, using the pattern `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. The MDM endpoint example uses the literal topics `MDM/clients/cmnd|resp|event|rfid` with **no tenant prefix** (the MDM example carries `tenantId: "ZEBRA"`). QoS and Retain are defined per-topic inside `mqttParams.publishTopics[]` / `subscribeTopics[]` (`qos: int`, `retain: bool`), plus an endpoint-wide `qosCommon`. There is **no per-operation QoS binding** for `get_current_region` in any schema. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml (mqttParams.publishTopics, mqttParams.subscribeTopics, qos, retain, qosCommon, tenantId)] [verified-from-schema: commands/dev_mgmt/config_endpoint.json (MDM example, lines 141-188)] [verified-via-local-mock: routing/shape only].

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `MDM/clients/cmnd` (`{EP_TYPE}/clients/cmnd`) | `0` (subscribeTopics for `MDM/clients/cmnd`, qos:0) [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example]; not specified per-operation in schema | `false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example] |
| Subscribe (Response) | `MDM/clients/resp` (`{EP_TYPE}/clients/resp`) | `1` (publishTopics for `MDM/clients/resp`, qos:1) [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example]; not specified per-operation in schema | `false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example] |

Notes: from the reader's perspective the device **subscribes** to `.../cmnd` (the request topic) and **publishes** on `.../resp` (the response topic), as encoded by `subscribeTopics`/`publishTopics` in the endpoint config. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml]. Topic strings and their QoS/Retain are configurable per endpoint; the values shown are the MDM instance and are not bound to this specific operation.

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `get_current_region` | Specifies the operation being performed, in this case, retrieving the current region configuration. [verified-from-schema: commands/dev_mgmt/get_current_region.json (command)] |
| `requestId` | root | string | Required | example `abc123`; no format/length constraint defined in schema | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/get_current_region.json (requestId)] |

This command has **no payload** — only `command` and `requestId` are defined, and both are required. There is no payload key. [verified-from-schema: commands/dev_mgmt/get_current_region.json (properties, required)]. There is no per-message auth block. [verified-from-schema: commands/dev_mgmt/get_current_region.json].

### JSON Request Example
```json
{ "command": "get_current_region", "requestId": "abc123" }
```

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `get_current_region` | The command issued by the client, indicating the operation to retrieve the current region. [verified-from-schema: response/dev_mgmt/get_current_region.json (command)] |
| `requestId` | root | string | Required | example `abc123`; no format/length constraint defined in schema | A unique identifier for tracking the request. [verified-from-schema: response/dev_mgmt/get_current_region.json (requestId)] |
| `apiVersion` | root | string | Required | enum: `V1.0`, `V1.1`; example `V1.1` | The version of the API being called, allowing for version-specific processing. [verified-from-schema: response/dev_mgmt/get_current_region.json (apiVersion)] |
| `currentRegion` | root | object | Optional (not in `required`) | see sub-fields below | A reference to the detailed payload structure containing region-specific information. [verified-from-schema: response/dev_mgmt/get_current_region.json (currentRegion); refrence/response/currentRegionResponse.yaml] |
| `currentRegion.frequencyHopping` | currentRegion | boolean | Required (within currentRegion) | — | Indicates whether frequency hopping is enabled in the region. [verified-from-schema: refrence/response/currentRegionResponse.yaml (frequencyHopping)] |
| `currentRegion.channelData` | currentRegion | array of string | Required (within currentRegion) | example item `"915250,915750"` | List of channel frequencies available in the region, represented as strings. [verified-from-schema: refrence/response/currentRegionResponse.yaml (channelData)] |
| `currentRegion.country` | currentRegion | string | Required (within currentRegion) | example `USA` / `United States` | The country the device is configured to. [verified-from-schema: refrence/response/currentRegionResponse.yaml (country)] |
| `currentRegion.lbtEnabled` | currentRegion | boolean | Required (within currentRegion) | — | Specifies if Listen Before Talk (LBT) is enabled for the region. [verified-from-schema: refrence/response/currentRegionResponse.yaml (lbtEnabled)] |
| `currentRegion.maxTxPowerSupported` | currentRegion | number | Required (within currentRegion) | example `29.2` (ref) / `300` (response example) — units divergence is [firmware-only-unknown] | The maximum transmission power supported in the region, measured in dBm. [verified-from-schema: refrence/response/currentRegionResponse.yaml (maxTxPowerSupported)] |
| `currentRegion.minTxPowerSupported` | currentRegion | number | Required (within currentRegion) | example `10.0` (ref) / `0` (response example) | The minimum transmission power supported in the region, measured in dBm. [verified-from-schema: refrence/response/currentRegionResponse.yaml (minTxPowerSupported)] |
| `currentRegion.regulatoryStandard` | currentRegion | string | Required (within currentRegion) | example `ETSI_EU_800M_900M_3_CHANNEL` / `FCC` (no enum defined; values are examples) | The regulatory standard governing the region's transmission rules. [verified-from-schema: refrence/response/currentRegionResponse.yaml (regulatoryStandard)] |
| `response` | root | object | Required | see `response.code` / `response.description` | A reference to the standard response schema used for this API. [verified-from-schema: response/dev_mgmt/get_current_region.json (response); refrence/response/response.yaml] |
| `response.code` | response | integer | Required | integer 0–30 (full code→meaning table in response.yaml); example `0` (Success) | Response status code. [verified-from-schema: refrence/response/response.yaml (code, minimum 0, maximum 30)] |
| `response.description` | response | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml (description)] |

### JSON Response Example
```json
{ "command": "get_current_region", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```

Full success example with region payload (from the response schema's `examples`) [verified-from-schema: response/dev_mgmt/get_current_region.json (examples)]:
```json
{
  "command": "get_current_region",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "currentRegion": {
    "frequencyHopping": true,
    "channelData": ["91575", "91525", "90325", "92675"],
    "country": "United States",
    "lbtEnabled": false,
    "maxTxPowerSupported": 300,
    "minTxPowerSupported": 0,
    "regulatoryStandard": "FCC"
  },
  "response": { "code": 0, "description": "Success" }
}
```

## 5. Associated Error Codes

The codes below are the **hypothesized subset** for `get_current_region`, drawn verbatim from the response code→meaning table. Their **representability** (that this command can carry these `response.code` integers in the documented response shape) is [verified-via-local-mock: routing/shape only]. The **code↔trigger binding** (which firmware condition emits which code for this specific command) is [firmware-only-unknown] — `refrence/response/response.yaml` lists the codes but does not bind them per-command. Only integers 0–30 from that table are valid. [verified-from-schema: refrence/response/response.yaml (code table, minimum 0, maximum 30)].

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Operation succeeded; the `currentRegion` object is returned. Exact firmware trigger binding [firmware-only-unknown]; code meaning [verified-from-schema: refrence/response/response.yaml]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "get_current_region", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 6 | Error | Region is not configured | Hypothesized: the reader has no region configured, so the current region cannot be reported. Code↔trigger binding [firmware-only-unknown]; code meaning [verified-from-schema: refrence/response/response.yaml]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "get_current_region", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 6, "description": "Region is not configured" } }` |

---

# Command: get_endpoint_config

## 1. Intent & Objective

The `get_endpoint_config` command retrieves the configured endpoint definitions held by an RFD40 or RFD90 handheld RFID reader and returns them to the requesting application over MQTT. Per the command schema, it is the operation "to get configured endpoints. If API does not included endpointName argument, then response includes all active endpoints detailed configuration & list of all saved endpoint names otherwise response includes interested endpoints configuration only" [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json `description`].

When `endpointDetails` (and its `endpointName`) is omitted, the response returns all active endpoints' detailed configuration plus the list of all saved endpoint names; when `endpointName` is supplied, the response returns only the requested endpoint's configuration [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json `description`, `examples`]. The structure actually returned — `activeEndpoints.epConfig[].configuration` (protocol, connection, MQTT, security, and event-routing settings) and `savedEndpoints.epNames[]` — is what the response schema examples emit [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `examples`].

An application uses this command when it needs to read back the reader's current connectivity wiring rather than change it: to verify the active endpoint configuration before changing it with `config_endpoint`, to confirm the configured MQTT topics and their per-topic QoS, and to retrieve the list of saved endpoint names. Any further reasoning about when to call it relative to `config_endpoint`, or what firmware-internal state is touched, is [firmware-only-unknown].

This is a read/query command. It does not change RF behavior, does not start or stop inventory, and does not alter operating-mode profiles. (For reference, the operating-mode profiles defined elsewhere in this API set are FAST_READ, CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE, and ADVANCED; none are configured by this command, and none of the four source files for this page reference them.) The reader behavior it triggers is limited to gathering and serializing its stored endpoint records; whether any further firmware-internal state is touched is [firmware-only-unknown].

Architectural context: this command is documented as part of the device-management command set [verified-from-schema: repository path `commands/dev_mgmt/get_endpoint_config.json`]. The endpoint type that carries a given endpoint record is the `epType` value in that record; the `epType` enum defined in the configuration schema is `MGMT | MGMT_EVT | CTRL | DATA1 | DATA2 | SOTI | MDM` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `configuration.properties.epType.enum`]. The concrete routing for any specific live endpoint (which topic family, which `tenantId`, whether a tenant prefix is applied) was NOT verified — no device session was attached for this page, so it is [firmware-only-unknown].

## 2. Topic Mapping

Topics are configured per endpoint inside each endpoint's `mqttParams` (`publishTopics`, `subscribeTopics`), each topic entry carrying its own `qos` (integer) and `retain` (boolean), plus an endpoint-wide `qosCommon` (integer). There is no per-operation QoS/Retain binding in any of the source files; QoS/Retain are properties of the configured topic, not of `get_endpoint_config`. The table below reflects the topic shapes that actually appear in the response schema examples (`{EP_TYPE}/clients/{cmnd|resp|event|rfid}`); the concrete topic family for any specific live endpoint is configurable per endpoint and was not verified for this page.

| Direction | Topic Path (from schema examples) | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `{EP_TYPE}/clients/cmnd` (subscribe entry on the device side; e.g. `MGMT/clients/cmnd`, `CTRL/clients/cmnd`) | not specified per-operation in schema (per-topic `qos`, e.g. `0` for a `*/clients/cmnd` subscribe entry) [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `examples[].endpointResponse.activeEndpoints.epConfig[].configuration.mqttParams.subscribeTopics[].qos`] | not specified per-operation in schema (per-topic `retain`, e.g. `false`) [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `...subscribeTopics[].retain`] |
| Subscribe (Response) | `{EP_TYPE}/clients/resp` (publish entry on the device side; e.g. `MGMT/clients/resp`, `CTRL/clients/resp`) | not specified per-operation in schema (per-topic `qos`, e.g. `0` for a `*/clients/resp` publish entry) [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `...mqttParams.publishTopics[].qos`] | not specified per-operation in schema (per-topic `retain`, e.g. `false`) [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `...publishTopics[].retain`] |

Notes on grounding for the QoS/Retain values:
- The per-topic `qos:int` and `retain:bool` fields, and the endpoint-wide `qosCommon:int`, are defined in `refrence/payload/cfgEndpointPayload.yaml` under `configuration.qosCommon` and `configuration.mqttParams.publishTopics[].{qos,retain}` / `subscribeTopics[].{qos,retain}` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `qosCommon` line 74; `publishTopics` items lines 114-132; `subscribeTopics` items lines 136-153].
- The concrete example values (`qos: 0`, `retain: false` for `*/clients/cmnd` and `*/clients/resp`; `qos: 0`, `retain: true` for `*/clients/rfid`) come from the captured endpoint examples in the response schema; those examples illustrate `MGMT/clients/*` and `CTRL/clients/*` [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `examples`, lines 56-74 and 133-156].
- The exact per-topic `qos`/`retain` provisioned on any specific live endpoint, and the topic family it actually uses, are [firmware-only-unknown] — no device session was attached for this page.

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | Default `get_endpoint_config` | "Specifies the operation being performed, in this case, retrieving the endpoint configuration." [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json `properties.command`, `required`] |
| `requestId` | root | string | Required | No format constraint in schema; `example: "123"`, examples use `abc123` / `def456` | "A unique identifier for the request, allowing tracking and debugging of the operation." [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json `properties.requestId`, `example`, `examples`] |
| `endpointDetails` | root | object | Optional (not in `required`) | — | "Specifies the endpoint to retrieve configuration details for." When omitted, all active endpoints plus the list of saved endpoint names are returned; when present, only the named endpoint is returned. [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json `properties.endpointDetails` $ref -> refrence/payload/epName.yaml `description`; command `description`] |
| `endpointDetails.endpointName` | `endpointDetails` | string | Optional | — | The endpoint name to query (example value `ctrl` from the command examples). [verified-from-schema: refrence/payload/epName.yaml `properties.endpointName`; commands/dev_mgmt/get_endpoint_config.json `examples[1].endpointDetails.endpointName`] |

Note: There is no per-message authentication block; this command carries no `auth.user`/`auth.password`. MQTT credentials live on the endpoint itself (`mqttParams.username` / `mqttParams.password`, set via `config_endpoint`) and are referenced only there [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `configuration.mqttParams.username` line 105, `password` line 108].

### JSON Request Example
```json
{ "command": "get_endpoint_config", "requestId": "def456", "endpointDetails": { "endpointName": "ctrl" } }
```
(The minimal form omits `endpointDetails` entirely: `{ "command": "get_endpoint_config", "requestId": "abc123" }`, which returns all active endpoints plus saved endpoint names.) [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json `examples`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | present in examples | Default `get_endpoint_config` | "The command indicating the type of operation or request being performed." [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `properties.command`] |
| `requestId` | root | string | present in examples | No format constraint in schema; `example: "123"`, examples use `abc123` | "A unique identifier for the request, used for tracking and correlation purposes." [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `properties.requestId`, `example`] |
| `apiVersion` | root | string | present in examples | `example: V1.1` (no enum defined in schema) | "The version of the API being used for the request." [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `properties.apiVersion`, `example`] |
| `epDetails` | root | object | Optional | $ref -> refrence/response/endpointResponse.yaml | Contains the active endpoint configuration and the list of saved endpoint names. The schema declares this key as `epDetails`, while the `examples` block emits the same content under the key `endpointResponse` (key-name divergence noted). [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `properties.epDetails` vs `examples[].endpointResponse`; refrence/response/endpointResponse.yaml] |
| `epDetails.activeEndpoints.epConfig[].configuration` | nested | object | Optional | endpoint record fields incl. `endpointName`, `epType`, `protocol`, `activate`, `url`, `verificationType`, `port`, `qosCommon`, `tenantId`, `mqttParams`, `securityParams`, `eventConfiguration` | The detailed configuration of each active endpoint. [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `examples[].endpointResponse.activeEndpoints.epConfig[0].configuration`] |
| `epDetails.savedEndpoints.epNames[]` | nested | array of string | Optional | e.g. `ctrlEP, ctrl, gmdm, dataEP, mgmt3` | List of all saved endpoint names on the device. [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `examples[0].endpointResponse.savedEndpoints.epNames`] |
| `response` | root | object | present in examples | $ref -> refrence/response/response.yaml | "Standard response object containing the status code and description of the operation result." [verified-from-schema: response/dev_mgmt/get_endpoint_config.json `properties.response`; refrence/response/response.yaml `description`] |
| `response.code` | `response` | integer | Required | Minimum 0, Maximum 30 (full code table in response.yaml) | "Response code indicating success or failure." (schema description label) [verified-from-schema: refrence/response/response.yaml `properties.code` `minimum`/`maximum`, `required`] |
| `response.description` | `response` | string | Required | `example: Success` | "response description in detail." [verified-from-schema: refrence/response/response.yaml `properties.description`, `required`] |

### JSON Response Example
```json
{ "command": "get_endpoint_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/dev_mgmt/get_endpoint_config.json `examples[].response`]

## 5. Associated Error Codes

The full integer code->meaning table (0-30) is carried verbatim in `refrence/response/response.yaml`, and `response.code` is constrained to Minimum 0 / Maximum 30 there [verified-from-schema: refrence/response/response.yaml `properties.code` `minimum: 0`, `maximum: 30`, code table lines 13-45]. The subset below is a plausible set for a read/query command (0, 2, 3); each code's meaning is quoted verbatim from that table. `response.yaml` provides only the code->meaning text, not per-command triggers, so the binding of any specific code to a triggering condition for `get_endpoint_config` is [firmware-only-unknown].

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command executed successfully. [verified-from-schema: refrence/response/response.yaml code table `0 \| Success`] | `{ "command": "get_endpoint_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | `response.yaml` states the meaning "Invalid payload" but does not bind it to a trigger for this command; per-command emission is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table `2 \| Invalid payload`] | `{ "command": "get_endpoint_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 3 | Error | Not able to retrieve information | `response.yaml` states the meaning "Not able to retrieve information"; the specific triggering condition for this command is [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table `3 \| Not able to retrieve information`] | `{ "command": "get_endpoint_config", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |

Note: Only codes within the integer range 0-30 from `refrence/response/response.yaml` are valid for `response.code`. The three codes listed above (0, 2, 3) are all valid 0-30 codes; their actual emission by `get_endpoint_config` is [firmware-only-unknown].

---

# Command: get_eth

## 1. Intent & Objective

The `get_eth` command retrieves the current Ethernet configuration of a Zebra handheld RFID reader (RFD40/RFD90) over MQTT. It is a read-only query: an application publishes the command and the reader replies with a snapshot of its Ethernet interface state — interface name, administrative status, host name, MAC address, link status/speed, and the IPv4 configuration (address, subnet mask, gateway, DHCP flag, DNS server, and domain name). [verified-from-schema: commands/dev_mgmt/get_eth.json `description`; verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails`]

The command literal is `get_eth`. [verified-from-schema: commands/dev_mgmt/get_eth.json `command.example`]

Scope/limitations explicitly stated by the schema: "Security features, static IP configuration, and IPv6 support are not available in the current API version." So even though the response schema defines a `security` (802.1X EAP) sub-object, the command documentation itself states those features are not available in the current API version. [verified-from-schema: commands/dev_mgmt/get_eth.json `description`; verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.security`]

When an application uses it: a management or device-administration client issues `get_eth` to read back the reader's wired-network posture — for example to confirm whether the Ethernet interface is `enabled`/`disabled`, whether the link is `Connected`/`Disconnected` and at what `linkSpeed`, and what IPv4 addressing the device currently holds (including whether `enableDhcp` is set). This is a diagnostic/inventory-of-state operation; it does not change any setting. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.status`, `interfaceDetails.linkStatus`, `interfaceDetails.ipv4Configuration`]

RFD40/RFD90 reader behaviors it triggers: the reader reads its own Ethernet interface state and serializes it into the `ethConfig` response object. No RF/inventory radio activity is involved by this command. The exact firmware-side data-collection path and the conditions under which fields are populated vs. omitted are [firmware-only-unknown]; however, the response examples show that when the interface is `Disabled`, only `interfaceName` and `status` are returned (link, IPv4 details omitted). [verified-from-schema: response/dev_mgmt/get_eth.json `examples[1]`]

Architectural context: this command is routed over a management-class endpoint. In this run the live management endpoint is the MDM endpoint (`epType: MDM`), reached over plain MQTT with topics `MDM/clients/cmnd` (subscribe/command-in) and `MDM/clients/resp` (publish/response-out), with no tenant prefix on the topic strings and `tenantId` `ZEBRA`. The endpoint type enum confirms `MDM` is a valid `epType` alongside `MGMT`/`CTRL`/etc. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `configuration.epType.enum`; verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]`]

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `MDM/clients/cmnd` (pattern `{EP_TYPE}/clients/cmnd`) | `0` [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3].epConfig.configuration.mqttParams.subscribeTopics[0].qos`] | `false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]...subscribeTopics[0].retain`] |
| Subscribe (Response) | `MDM/clients/resp` (pattern `{EP_TYPE}/clients/resp`) | `1` [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3].epConfig.configuration.mqttParams.publishTopics[0].qos`] | `false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]...publishTopics[0].retain`] |

Notes:
- Topics are configurable per endpoint, not fixed per command. The pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. From the device's perspective, `*/clients/cmnd` is a `subscribeTopics` entry (the reader subscribes to receive commands) and `*/clients/resp` is a `publishTopics` entry (the reader publishes responses); an application client mirrors this (publishes to `cmnd`, subscribes to `resp`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.publishTopics`, `mqttParams.subscribeTopics`; verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3]`]
- The live MDM instance shown above uses the literal topics `MDM/clients/cmnd`, `MDM/clients/resp`, `MDM/clients/event`, `MDM/clients/rfid` with NO tenant prefix and `tenantId` `ZEBRA`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json `examples[3].epConfig.configuration` (`tenantId`, `mqttParams` topics)]
- QoS/Retain are per-topic properties carried in `cfgEndpointPayload.mqttParams` (each topic entry requires `topic`, `qos:int`, `retain:bool`), plus an endpoint-wide `qosCommon:int`. There is NO per-operation QoS binding in the schema — for the per-operation QoS axis this is **not specified per-operation in schema**. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.publishTopics.items` (`qos`,`retain` required), `mqttParams.subscribeTopics.items`, `configuration.qosCommon`]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | literal `get_eth` | Command issued to get the Ethernet configuration. [verified-from-schema: commands/dev_mgmt/get_eth.json `command`, `required`] |
| `requestId` | root | string | Required | No `format`/`pattern` in schema; `example: abc123` | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/get_eth.json `requestId` (`example: abc123`), `required`] |

This command takes no payload object beyond `command` and `requestId` — the request schema defines only those two properties and lists both as required. There is no auth/user/password field in the message (MQTT credentials live in endpoint `mqttParams` via `config_endpoint`/`set_config`, reference only). [verified-from-schema: commands/dev_mgmt/get_eth.json `properties`, `required`; verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.username`, `mqttParams.password`]

### JSON Request Example
```json
{ "command": "get_eth", "requestId": "abc123" }
```
[verified-from-schema: commands/dev_mgmt/get_eth.json `properties`, `required`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | present in schema & examples | echoes `get_eth` | The command that was executed to retrieve the Ethernet configuration. [verified-from-schema: response/dev_mgmt/get_eth.json `command`] |
| `requestId` | root | string | present in schema & examples | echoes original request id (examples use `abc123`) | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/get_eth.json `requestId`] |
| `apiVersion` | root | string | present in schema & examples | enum: `V1.0`, `V1.1` (examples use `V1.1`) | API version of the response. [verified-from-schema: response/dev_mgmt/get_eth.json `apiVersion.enum`] |
| `ethConfig` | root | object | present when interface data is returned | `$ref` -> `ethResponseSoti.yaml` (object `ethConfig`) | Detailed Ethernet configuration. [verified-from-schema: response/dev_mgmt/get_eth.json `ethConfig.$ref`; verified-from-schema: refrence/response/ethResponseSoti.yaml `title`/`description`] |
| `ethConfig.interfaceDetails` | nested | object | required keys: `interfaceName`, `status`, `hostname`, `macAddress` | — | Details about the Ethernet network interface. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.required`] |
| `ethConfig.interfaceDetails.interfaceName` | nested | string | Required | example `eth0` | Name of the network interface. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.interfaceName`] |
| `ethConfig.interfaceDetails.status` | nested | string | Required | enum: `enabled`, `disabled` (examples capitalize as `Enabled`/`Disabled`) | Status of the network interface. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.status.enum`] |
| `ethConfig.interfaceDetails.hostname` | nested | string | Required | example `RFD40AB03` | Hostname assigned to the device. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.hostname`] |
| `ethConfig.interfaceDetails.macAddress` | nested | string | Required | example `E0-D0-45-3D-38-1D` | MAC address of the interface. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.macAddress`] |
| `ethConfig.interfaceDetails.linkStatus` | nested | object | Optional (required keys within: `status`, `linkSpeed`) | — | Current link status and speed. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.linkStatus.required`] |
| `…linkStatus.status` | nested | string | Required (within linkStatus) | enum: `Connected`, `Disconnected` | Current status of the network link. [verified-from-schema: refrence/response/ethResponseSoti.yaml `linkStatus.status.enum`] |
| `…linkStatus.linkSpeed` | nested | string | Required (within linkStatus) | example `100Mbps` | Speed of the network link. [verified-from-schema: refrence/response/ethResponseSoti.yaml `linkStatus.linkSpeed`] |
| `ethConfig.interfaceDetails.ipv4Configuration` | nested | object | Optional | — | IPv4 network configuration. [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.ipv4Configuration`] |
| `…ipv4Configuration.ipAddress` | nested | string (`format: ipv4`) | Optional | example `192.168.1.81` | IPv4 address. [verified-from-schema: refrence/response/ethResponseSoti.yaml `ipv4Configuration.ipAddress`] |
| `…ipv4Configuration.subnetMask` | nested | string (`format: ipv4`) | Optional | example `255.255.255.0` | Subnet mask. [verified-from-schema: refrence/response/ethResponseSoti.yaml `ipv4Configuration.subnetMask`] |
| `…ipv4Configuration.gateway` | nested | string (`format: ipv4`) | Optional | example `192.168.1.144` | Gateway address. [verified-from-schema: refrence/response/ethResponseSoti.yaml `ipv4Configuration.gateway`] |
| `…ipv4Configuration.enableDhcp` | nested | boolean | Optional | schema declares `type: boolean` yet also lists string enum `enabled`/`disabled` with `example: enabled` (internal contradiction in source); the response file example uses boolean `true` | Indicates if DHCP is enabled. [verified-from-schema: refrence/response/ethResponseSoti.yaml `ipv4Configuration.enableDhcp`] |
| `…ipv4Configuration.dnsServer` | nested | string (`format: ipv4`) | Optional | example `192.168.1.78` | DNS server address. [verified-from-schema: refrence/response/ethResponseSoti.yaml `ipv4Configuration.dnsServer`] |
| `…ipv4Configuration.domainName` | nested | string | Optional | example `test.soti.com` | Domain name. [verified-from-schema: refrence/response/ethResponseSoti.yaml `ipv4Configuration.domainName`] |
| `ethConfig.interfaceDetails.security` | nested | object | Optional | per command schema: "Security features … not available in the current API version" | 802.1X EAP security parameters (`securityStatus`, `EAP802_1X`). [verified-from-schema: refrence/response/ethResponseSoti.yaml `interfaceDetails.security`; verified-from-schema: commands/dev_mgmt/get_eth.json `description`] |
| `response` | root | object | Required (`$ref` -> response.yaml; `code`,`description` required) | — | Standard status object. [verified-from-schema: response/dev_mgmt/get_eth.json `response.$ref`; verified-from-schema: refrence/response/response.yaml `required`] |
| `response.code` | nested | integer | Required | integer `0`–`30` (full table in response.yaml) | Response status code. [verified-from-schema: refrence/response/response.yaml `code` (`minimum: 0`, `maximum: 30`)] |
| `response.description` | nested | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml `description`] |

Casing divergence note: the response schema property and second example use camelCase `ethConfig` / `interfaceDetails`, while the first response example uses `ethconfig` / `InterfaceDetails`. The schema-canonical form is `ethConfig.interfaceDetails`; the first example's casing is an inconsistency in the source file. [verified-from-schema: response/dev_mgmt/get_eth.json `properties.ethConfig` vs `examples[0]`]

### JSON Response Example
```json
{ "command": "get_eth", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/dev_mgmt/get_eth.json `examples` (command/requestId/apiVersion/response shape)]

A fuller success example with interface data (schema example, `interfaceDetails` form):
```json
{
  "command": "get_eth",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "ethConfig": {
    "interfaceDetails": {
      "interfaceName": "eth0",
      "status": "Disabled"
    }
  },
  "response": { "code": 0, "description": "Success" }
}
```
[verified-from-schema: response/dev_mgmt/get_eth.json `examples[1]`]

## 5. Associated Error Codes

Representability of this subset for `get_eth` = [verified-via-local-mock: routing/shape only]. The code values and their meanings are quoted verbatim from the response code table; the specific code-to-trigger BINDING for `get_eth` is a hypothesis and is [firmware-only-unknown] unless `response.yaml` states it verbatim (it does not bind codes to commands).

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command processed; Ethernet configuration returned. (Meaning verbatim from table.) [verified-from-schema: refrence/response/response.yaml code table row 0] | `{ "command": "get_eth", "requestId": "abc123", "apiVersion": "V1.1", "ethConfig": { "interfaceDetails": { "interfaceName": "eth0", "status": "Disabled" } }, "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information | Hypothesis: reader could not read back the Ethernet configuration. Code/meaning verbatim from table; code-to-trigger binding [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table row 3] | `{ "command": "get_eth", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |
| 7 | Error | Interface is not available | Hypothesis: the Ethernet interface is not present/available on this device. Code/meaning verbatim from table; code-to-trigger binding [firmware-only-unknown]. [verified-from-schema: refrence/response/response.yaml code table row 7] | `{ "command": "get_eth", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 7, "description": "Interface is not available" } }` |

Subset provenance: codes `0, 3, 7` are the hypothesized subset for `get_eth`. All three exist in the canonical 0–30 table. [verified-from-schema: refrence/response/response.yaml code table; verified-via-local-mock: routing/shape only]

---

# Command: get_installed_certificate

> **Naming mismatch (documented per spec):** The schema **file** is named singular `get_installed_certificate.json`, but the wire **command literal** is plural `get_installed_certificates`. The value carried in the `command` field on both request and response is the plural form. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json field `command.example` = `get_installed_certificates`; file basename = `get_installed_certificate.json`] [verified-from-schema: response/dev_mgmt/get_installed_certificate.json field `command.example` = `get_installed_certificates`]

## 1. Intent & Objective

`get_installed_certificate` (wire literal `get_installed_certificates`) is a Management/MDM command that asks the RFD40/RFD90 handheld RFID reader to enumerate the X.509 certificates currently installed on the device and return their metadata. The command exists to let a management application audit what trust material the reader holds — for example, to confirm that the CA and client certificates required to bring up a TLS-secured MQTT endpoint are present and not expired before activating that endpoint. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json field `description` = "This API is used to get installed certificates."]

Conceptually, the reader supports installing multiple certificates, broadly grouped into Server, Client, and App roles, and supports CA certificate import; the Client certificate type is the one recommended for use with the IoT Connector to secure outgoing connections from the reader. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/certificate-management-zebra-iot-connector-documentation.md — "Certificate Management Overview" / Server, Client, App descriptions]

The request itself carries no certificate selector or filter — it is a bare command (`command` + `requestId` only), so it returns the full installed-certificate inventory rather than a single named certificate. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json `properties` = only `command`, `requestId`; `required` = ["command","requestId"]] The response returns an `installedCerts.certInfo[]` array; each entry describes one certificate's name, type, issuer/subject, public-key algorithm, serial, and validity window. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo[]` item properties]

**Reader behaviors triggered:** issuing this command causes the reader to read back its local certificate store and serialize the per-certificate metadata into the response. The schemas do not describe radio, inventory, or RF-profile side effects for this command, and none should be assumed. [firmware-only-unknown] (no radio/inventory fields appear in either schema)

**Architectural context:** this command is routed over the Management endpoint. In this deployment the live endpoint is the MDM endpoint (`epType: MDM`), which uses the literal topic family `MDM/clients/cmnd|resp|event` with no tenant prefix even though `tenantId` is `ZEBRA`/`zebra`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json examples — `epType: "MDM"` with `subscribeTopics[].topic` = `MDM/clients/cmnd`, `publishTopics[].topic` = `MDM/clients/resp`/`MDM/clients/event`/`MDM/clients/rfid`, `tenantId` = `ZEBRA`] The endpoint type enum that may host this command is constrained to `MGMT | MGMT_EVT | CTRL | DATA1 | DATA2 | SOTI | MDM`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `configuration.epType.enum`] Runtime routing/shape of this command over the local management endpoint was not exercised in this run (device session not attached). [firmware-only-unknown]

## 2. Topic Mapping

Topics are not hard-coded to the command; they are configured **per endpoint** in the endpoint's `mqttParams` (`publishTopics[]` for device→client traffic and `subscribeTopics[]` for client→device commands). The table below shows the live **MDM** endpoint instance from the `config_endpoint` MDM example.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd → live: `MDM/clients/cmnd` | `0` | `false` |
| Subscribe (Response) | {EP_TYPE}/clients/resp → live: `MDM/clients/resp` | `1` | `false` |

Notes / provenance:
- The "Publish (Request)" row corresponds to the client publishing a command onto the topic the **device subscribes** to; in the MDM example that is `MDM/clients/cmnd` with `qos: 0`, `retain: false`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example `mqttParams.subscribeTopics[0]` = {topic:`MDM/clients/cmnd`, qos:0, retain:false}]
- The "Subscribe (Response)" row corresponds to the topic the **device publishes** responses onto; in the MDM example that is `MDM/clients/resp` with `qos: 1`, `retain: false`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example `mqttParams.publishTopics[0]` = {topic:`MDM/clients/resp`, qos:1, retain:false}]
- The MDM endpoint also defines `MDM/clients/event` (qos:1, retain:false) and `MDM/clients/rfid` (qos:0, retain:true). [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example `mqttParams.publishTopics`]
- Topic strings follow the `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` pattern and are configurable per endpoint; the MDM instance uses the literal `MDM/...` family with **no** tenant prefix despite `tenantId` being set. [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example]
- QoS/Retain are defined **per topic** inside `mqttParams` (`qos:int`, `retain:bool`), with a separate endpoint-wide `qosCommon:int`. There is **no per-operation QoS binding** in the schema for this command. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.publishTopics[].qos/retain`, `mqttParams.subscribeTopics[].qos/retain`, `configuration.qosCommon`] For a per-operation QoS axis: not specified per-operation in schema.

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | request root | string | Required | example `get_installed_certificates` (plural literal) | Command issued to get install certificate. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json `properties.command`, `required`] |
| `requestId` | request root | string | Required | example `abc123` | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json `properties.requestId`, `required`] |

There is **no payload object** for this command — the request carries only `command` and `requestId`; no auth block exists. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json `properties` contains only `command` and `requestId`]

**requestId note:** the schema gives `requestId` only as a free-form string with example `abc123`; no length or hex-format constraint is stated in this schema. [verified-from-schema: commands/dev_mgmt/get_installed_certificate.json `requestId.example` = `abc123`, no `pattern`/`maxLength`]

### JSON Request Example
```json
{ "command": "get_installed_certificates", "requestId": "abc123" }
```
[verified-from-schema: commands/dev_mgmt/get_installed_certificate.json `properties` (command/requestId examples)]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | response root | string | present in example | example `get_installed_certificates` | The command that was executed to retrieve the list of installed certificates. [verified-from-schema: response/dev_mgmt/get_installed_certificate.json `properties.command`] |
| `requestId` | response root | string | present in example | example `abc123` | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/get_installed_certificate.json `properties.requestId`] |
| `apiVersion` | response root | string | present in example | enum `V1.0` \| `V1.1` (example `V1.1`) | API version of the response payload. [verified-from-schema: response/dev_mgmt/get_installed_certificate.json `properties.apiVersion.enum`] |
| `installedCerts` | response root | object | optional (not in any `required` list) | object with `certInfo[]` array | Container for the list of certificates installed on the device. [verified-from-schema: response/dev_mgmt/get_installed_certificate.json `properties.installedCerts` → refrence/response/installedCertResponse.yaml] |
| `installedCerts.certInfo` | installedCerts | array of object | optional | each item describes one certificate | A list of installed certificates with their details. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo`] |
| `certInfo[].name` | certInfo item | string | optional | example `Reader Main Certificate` | The name of the certificate. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.name`] |
| `certInfo[].type` | certInfo item | string | Required | enum `client` \| `server` \| `' mqtt'` \| `' wifi'` \| `filestore` (note leading-space anomaly on `' mqtt'`/`' wifi'`) | The type/role of the certificate. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.type.enum`, `required`] |
| `certInfo[].installTime` | certInfo item | string (date-time) | Required (per yaml `required`) | format date-time; example `2022-07-01T03:01:31.464Z` | Date/time the certificate was installed. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.installTime`, `required`] |
| `certInfo[].issuerName` | certInfo item | string | Required | example `FX9600EE5729` | The issuer of the certificate. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.issuerName`, `required`] |
| `certInfo[].publicKeyAlg` | certInfo item | string | optional | enum `RSA256` \| `RSA512` (example values in response use `RSA`) | The algorithm used for the public key. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.publicKeyAlg.enum`] |
| `certInfo[].publicKey` | certInfo item | string | optional | example `091234acgbe12` | The public key in string format. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.publicKey`] |
| `certInfo[].serial` | certInfo item | string | optional | example `410835777` | The serial number of the certificate. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.serial`] |
| `certInfo[].subjectName` | certInfo item | string | Required | example `FX9600EE572` | The subject to whom the certificate belongs. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.subjectName`, `required`] |
| `certInfo[].validFrom` | certInfo item | string (date) | Required | format date; example `2022-07-01` | Start of the certificate validity window. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.validFrom`, `required`] |
| `certInfo[].validTill` | certInfo item | string (date) | Required | format date; example `2023-07-01` | End of the certificate validity window. [verified-from-schema: refrence/response/installedCertResponse.yaml `certInfo.items.validTill`, `required`] |
| `response` | response root | object | present in example | `{ code, description }` | Standard response status object. [verified-from-schema: response/dev_mgmt/get_installed_certificate.json `properties.response` → refrence/response/response.yaml] |
| `response.code` | response | integer | Required | integer 0–30 (min 0, max 30) | Response code; see error-code table. [verified-from-schema: refrence/response/response.yaml `code` min/max + table] |
| `response.description` | response | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml `description`, `required`] |

> Schema/example anomalies (documented, not corrected): the `installedCertResponse.yaml` enum for `type` literally includes leading spaces (`' mqtt'`, `' wifi'`) while the response example uses unspaced `mqtt`/`wifi`; and the example sets `publicKeyAlg`/`publicKey` to `RSA` whereas the yaml enumerates `publicKeyAlg` as `RSA256`/`RSA512`. [verified-from-schema: refrence/response/installedCertResponse.yaml vs response/dev_mgmt/get_installed_certificate.json `examples[0]`]

### JSON Response Example
```json
{ "command": "get_installed_certificates", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/dev_mgmt/get_installed_certificate.json `examples[0]` (success `response` block); apiVersion from `properties.apiVersion.enum`]

A fuller success response also carries `installedCerts.certInfo[]`, e.g. an entry `{ "name": "client_cert", "type": "mqtt", "issuerName": "RootCA", "publicKeyAlg": "RSA", "publicKey": "RSA", "serial": "1", "subjectName": "Client", "validFrom": "2024-07-01T07:00:00Z", "validTill": "2030-05-06T08:06:57Z" }`. [verified-from-schema: response/dev_mgmt/get_installed_certificate.json `examples[0].installedCerts.certInfo`]

## 5. Associated Error Codes

The codes below are the **hypothesized subset** for this command, drawn verbatim from the central code→meaning table. The fact that these codes are *representable* on this command's response (integer `code` in the 0–30 range with paired `description`) is [verified-from-schema: refrence/response/response.yaml `code.minimum`/`code.maximum` and `response.yaml` table]. The code→trigger **binding** is [firmware-only-unknown] because `response.yaml` provides only the code→meaning mapping, not the per-command trigger that emits each code.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command succeeded; installed-certificate list returned. Code→meaning [verified-from-schema: refrence/response/response.yaml table row 0]. Trigger binding [firmware-only-unknown]. | `{ "command": "get_installed_certificates", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information | Hypothesized when the reader cannot read back its certificate store / metadata. Code→meaning [verified-from-schema: refrence/response/response.yaml table row 3]. Trigger binding [firmware-only-unknown]. | `{ "command": "get_installed_certificates", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |
| 21 | Error | Certificate not found | Hypothesized when no matching/installed certificate is present to report. Code→meaning [verified-from-schema: refrence/response/response.yaml table row 21]. Trigger binding [firmware-only-unknown]. | `{ "command": "get_installed_certificates", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 21, "description": "Certificate not found" } }` |

> Only integer codes 0–30 from `refrence/response/response.yaml` are valid; the full table is the single source of truth and `code` is constrained to `minimum: 0`, `maximum: 30`. [verified-from-schema: refrence/response/response.yaml `code.minimum`/`code.maximum` and the embedded table]

---

# Command: get_status

## 1. Intent & Objective

The `get_status` command retrieves the current reader status information from an RFD40/RFD90 handheld RFID reader. [verified-from-schema: commands/dev_mgmt/get_status.json#/description ("This command used to retrieve the reader status information.")]

An application issues `get_status` when it needs an on-demand, point-in-time snapshot of the device's operational health rather than waiting for an asynchronous heartbeat/alert event. The response carries a `deviceStatus` object describing power, radio, connectivity, time-sync, temperature, terminal connection, and battery condition. The exact fields returned are enumerated in the response schema and its referenced `deviceStatus` definition. [verified-from-schema: response/dev_mgmt/get_status.json#/properties/deviceStatus -> refrence/response/deviceStatusResponse.yaml]

Conceptually, this command belongs to the reader Device Status / Real-Time Health Monitoring domain. For RFID sleds (RFD40/RFD90), the monitored System attributes include current time, NTP sync status, temperature, up time, power, and terminal connection (Bluetooth, Cradle, eConnex); RFID Radio active/inactive status; and battery health/status/charge percentage. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md ("RFID Sleds" System/RFID Radio block and "Health, status, charge %")] The specific reader behaviors triggered by `get_status` (e.g., whether the radio is briefly polled, whether battery gauges are sampled live) are [firmware-only-unknown].

Architectural context: this command is routed over the management plane. For this run it targets the live MDM endpoint (`epType: MDM`), which is a generic IoT/MDM management interface used by RFD40/90 devices; the grounding deck shows MDM listed under management/monitoring for sleds and SOTI Connect as an MDM provider for RFD40/90. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md ("MDM", "SOTI Connect / RFD40/90 ... Mobile Device Management (MDM) provider")] The endpoint `epType` enumeration that includes `MGMT` and `MDM` is defined in the endpoint-config payload schema. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/epType (enum: MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM)] Routing/shape of the command over this endpoint is [verified-via-local-mock: routing/shape only]; physical-device behavior was not proven this run.

## 2. Topic Mapping

Topics are not hard-coded per operation; they are configured per endpoint via `config_endpoint` / `set_config` and live in `cfgEndpointPayload.mqttParams` as `publishTopics` and `subscribeTopics`, each carrying its own `qos` (int) and `retain` (bool). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/mqttParams/properties/publishTopics and .../subscribeTopics] An endpoint-wide `qosCommon` (int) also exists. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/qosCommon] There is no per-operation QoS binding in the schema.

The table shows the live MDM endpoint instance. From the MDM example in `config_endpoint.json`, the device publishes responses on `MDM/clients/resp` (qos 1, retain false) and subscribes to commands on `MDM/clients/cmnd` (qos 0, retain false), with `tenantId: ZEBRA` and no tenant prefix on the topic literals. [verified-from-schema: commands/dev_mgmt/config_endpoint.json#/examples/3 (epType MDM: publishTopics MDM/clients/resp qos 1 retain false; subscribeTopics MDM/clients/cmnd qos 0 retain false)]

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd (live: `MDM/clients/cmnd`) | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example subscribeTopics.qos]; not specified per-operation in schema | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example subscribeTopics.retain] |
| Subscribe (Response) | {EP_TYPE}/clients/resp (live: `MDM/clients/resp`) | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example publishTopics.qos]; not specified per-operation in schema | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example publishTopics.retain] |

Note: The "Publish (Request)" topic is the device's subscribe topic (`subscribeTopics`), and the "Subscribe (Response)" topic is the device's publish topic (`publishTopics`); QoS/retain above are cited from those entries. The general topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` and is configurable per endpoint. [verified-from-schema: commands/dev_mgmt/config_endpoint.json (topic literals across MGMT/CTRL/MDM examples)]

## 3. Request Payload Breakdown

`get_status` carries no payload object; only `command` and `requestId` are sent. [verified-from-schema: commands/dev_mgmt/get_status.json#/properties and #/required (only command, requestId)] There is no `payload` key for this command, and there is no per-message auth block.

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required [verified-from-schema: commands/dev_mgmt/get_status.json#/required] | example `get_status` (literal: `get_status`) [verified-from-schema: commands/dev_mgmt/get_status.json#/properties/command/example] | Command used to get the reader status information. [verified-from-schema: commands/dev_mgmt/get_status.json#/properties/command/description] |
| requestId | root | string | Required [verified-from-schema: commands/dev_mgmt/get_status.json#/required] | Documented as a 16 hex digit identifier, but the schema example uses a short string `abcd123` (divergence noted). [verified-from-schema: commands/dev_mgmt/get_status.json#/properties/requestId/example] | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/get_status.json#/properties/requestId/description] |

### JSON Request Example
```json
{ "command": "get_status", "requestId": "abcd123" }
```
[verified-from-schema: commands/dev_mgmt/get_status.json#/properties (command + requestId examples)]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required [verified-from-schema: response/dev_mgmt/get_status.json#/required] | example `get_status` | The command that was executed to retrieve the device status. [verified-from-schema: response/dev_mgmt/get_status.json#/properties/command] |
| requestId | root | string | Required [verified-from-schema: response/dev_mgmt/get_status.json#/required] | example `abc123` (short string; 16-hex-digit divergence noted) | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/get_status.json#/properties/requestId] |
| apiVersion | root | string | Required [verified-from-schema: response/dev_mgmt/get_status.json#/required] | enum: `V1.0`, `V1.1` (example `V1.1`) [verified-from-schema: response/dev_mgmt/get_status.json#/properties/apiVersion/enum] | API version of the response. [verified-from-schema: response/dev_mgmt/get_status.json#/properties/apiVersion] |
| response | root | object | Required [verified-from-schema: response/dev_mgmt/get_status.json#/required] | contains `code` (int 0-30) + `description` (string) [verified-from-schema: refrence/response/response.yaml#/properties] | Standard response object with the status code and description of the operation result. [verified-from-schema: refrence/response/response.yaml#/description] |
| response.code | response | integer | Required [verified-from-schema: refrence/response/response.yaml#/required] | 0-30 (minimum 0, maximum 30) [verified-from-schema: refrence/response/response.yaml#/properties/code (minimum/maximum)] | Response code; see error table. [verified-from-schema: refrence/response/response.yaml#/properties/code] |
| response.description | response | string | Required [verified-from-schema: refrence/response/response.yaml#/required] | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml#/properties/description] |
| deviceStatus | root | object | Optional (not in required list) [verified-from-schema: response/dev_mgmt/get_status.json#/required (only command, requestId, apiVersion, response)] | See deviceStatus sub-fields below | Current device status including power, battery, and connectivity info. [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/description] |
| deviceStatus.powerSource | deviceStatus | string | Required within deviceStatus [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | enum: `DC`, `WALLCHARGER`, `USB`, `CRADLE` [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/powerSource/enum] | The source of power for the device. |
| deviceStatus.radioActivity | deviceStatus | string | Required within deviceStatus [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | enum: `INACTIVE`, `ACTIVE` [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/radioActivity/enum] | Activity status of the device's radio. |
| deviceStatus.radioConnection | deviceStatus | string | Required within deviceStatus [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | enum: `CONNECTED`, `DISCONNECTED` [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/radioConnection/enum] | Connection status of the device's radio. |
| deviceStatus.hostname | deviceStatus | string | Required within deviceStatus [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | example `RFD40-212735201D0053.local` [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/hostname] | The hostname of the device on the network. |
| deviceStatus.systemTime | deviceStatus | string | Required within deviceStatus [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | ISO 8601 (format: time) [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties (systemTime)] | System time of the device. (Schema key has a trailing space `'systemTime '`; examples use `systemTime`.) [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/'systemTime '] |
| deviceStatus.temperature | deviceStatus | integer | Required within deviceStatus [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | degrees Celsius, example 32 [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/temperature] | Current temperature of the device in degrees Celsius. |
| deviceStatus.ntp | deviceStatus | object | Optional (not in deviceStatus required) [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | `offset` (int, ms), `reach` (int) [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/ntp/properties] | NTP synchronization details. |
| deviceStatus.terminalConnection | deviceStatus | object | Optional [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | `status` enum CONNECTED/DISCONNECTED; `type` enum BLUETOOTH/CIO/USB [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/terminalConnection/properties] | Terminal connection details. |
| deviceStatus.batteryStatus | deviceStatus | object | Optional [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/required] | `mfgDate`, `cycleCount`, `fullChargeCapacity`, `temperature`, `designCapacity`, `batteryType`, `capacity`, `stateOfHealth` (enum GOOD/AVERAGE/POOR), `chargePercentage`, `chargeStatus` (0=charger not connected, 1=charging, 2=100%) [verified-from-schema: refrence/response/deviceStatusResponse.yaml#/properties/batteryStatus/properties] | Battery status information. |

### JSON Response Example
```json
{ "command": "get_status", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/dev_mgmt/get_status.json#/examples/0 (and #/properties)]

A fuller success response also includes the `deviceStatus` object:
```json
{
  "command": "get_status",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "deviceStatus": {
    "powerSource": "USB",
    "radioActivity": "INACTIVE",
    "radioConnection": "CONNECTED",
    "systemTime": "2024-02-26T13:45:53.728Z",
    "temperature": 32,
    "ntp": { "offset": 0, "reach": 0 },
    "terminalConnection": { "status": "CONNECTED", "type": "USB" },
    "batteryStatus": { "capacity": 6400, "stateOfHealth": "GOOD", "chargePercentage": 100, "chargeStatus": 1 }
  },
  "response": { "code": 0, "description": "Success" }
}
```
[verified-from-schema: response/dev_mgmt/get_status.json#/examples/0]

## 5. Associated Error Codes

The codes below are the hypothesized subset for `get_status`. The code-to-meaning text is drawn verbatim from the response code table; the binding between a specific code and the trigger that produces it for this command is [firmware-only-unknown] (the table lists meanings, not per-command triggers). Representability of these codes over this command's routing/shape is [verified-via-local-mock: routing/shape only].

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success [verified-from-schema: refrence/response/response.yaml#/properties/code (code 0 = Success)] | Status retrieved successfully. Trigger binding [firmware-only-unknown]; representability [verified-via-local-mock: routing/shape only] | `{ "command": "get_status", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information [verified-from-schema: refrence/response/response.yaml#/properties/code (code 3 = "Not able to retrieve information")] | Hypothesized when the reader cannot read back its status. Exact trigger binding [firmware-only-unknown]; representability [verified-via-local-mock: routing/shape only] | `{ "command": "get_status", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |

---

# Command: get_version

## 1. Intent & Objective

The `get_version` command retrieves reader identity and software version information from an RFD40 / RFD90 handheld RFID reader. According to the command schema, it "is used to retrieve the reader information like device serial no, model no, sku, and firmware version information." [verified-from-schema: commands/dev_mgmt/get_version.json#description]

Per the _meta grounding page, this command returns reader model information, the reader serial number and SKU, firmware version and component versions, and manufacturer/company identity metadata. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_version.md]

An application uses `get_version` to:
- Identify the exact device model and serial number;
- Verify firmware and component version alignment;
- Confirm the device software baseline before updates or troubleshooting.
[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_version.md]

The grounding page identifies the pattern as "Device Identity and Firmware Retrieval," applicable to the RFD40 Series and RFD90 Series, with related commands `get_config`, `get_status`, and `set_os`. The supported operation is "Read reader identity and version details," and the required request fields are `command` and `requestId`. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_version.md]

Specific response fields worth checking, per the grounding page: `model` (RFD40 vs RFD90, to confirm the correct device type before applying model-specific configuration); `firmwareVersion` (whether firmware is current, before updates or diagnostics); `serialNumber` (matching the device label for asset tracking, support tickets, and registration); `sku` (the regional/hardware variant deployed); and `detailedVersions.iotcVersion` (the IoTC version determines which MQTT API commands and features are available). [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_version.md]

**Reader behaviors triggered:** `get_version` is a read-only identity/version query. The schema defines no payload knobs that change radio or scanning state, so this command does not start, stop, or alter inventory or radio operations; it returns version metadata only. The set of physical reader actions performed by firmware to gather this data is [firmware-only-unknown].

**Architectural context (routing):** This item is documented for `epType` MGMT, exercised against the live MDM (live MDM management) endpoint. Topics are configured per endpoint via `config_endpoint` / `set_config`; the live MDM endpoint uses the literal topic family `MDM/clients/cmnd | resp | event` with no tenant prefix (the configured `tenantId` is `zebra`/`ZEBRA`). [verified-from-schema: commands/dev_mgmt/config_endpoint.json (epType MDM example, endpointName "mgmt_tst", tenantId "ZEBRA", topics MDM/clients/*)] The `MDM` endpoint type is an allowed `epType` enum value. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#configuration.epType.enum] Routing/shape of this command over the cmnd/resp topics is [verified-via-local-mock: routing/shape only].

## 2. Topic Mapping

Topics are configurable per endpoint (publish/subscribe topics with their own QoS and retain are defined in `cfgEndpointPayload.mqttParams.publishTopics` / `subscribeTopics`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#configuration.mqttParams.publishTopics, subscribeTopics] The live MDM endpoint instance below is taken from the `config_endpoint` MDM example (no tenant prefix). [verified-from-schema: commands/dev_mgmt/config_endpoint.json (epType MDM example)]

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd — live instance: `MDM/clients/cmnd` | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json (MDM subscribeTopics MDM/clients/cmnd qos:0)] — per-operation: not specified per-operation in schema | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json (MDM subscribeTopics retain:false)] |
| Subscribe (Response) | {EP_TYPE}/clients/resp — live instance: `MDM/clients/resp` | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json (MDM publishTopics MDM/clients/resp qos:1)] — per-operation: not specified per-operation in schema | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json (MDM publishTopics retain:false)] |

Notes:
- The reader publishes responses/events and subscribes to commands; thus from the device's perspective `MDM/clients/resp` is a publish topic and `MDM/clients/cmnd` is a subscribe topic. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#publishTopics.topic example "MGMT/clients/resp", subscribeTopics.topic example "MGMT/clients/cmnd"]
- QoS is also governed at the endpoint level by `qosCommon` (example `1`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#configuration.qosCommon] There is no per-operation QoS binding in the schema; for that axis: not specified per-operation in schema.
- `publishTopics` supports up to 3 topics and `subscribeTopics` supports up to 1 topic. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#publishTopics.description, subscribeTopics.description]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `get_version` | "Used to get the reader information" [verified-from-schema: commands/dev_mgmt/get_version.json#properties.command] |
| requestId | root | string | Required | example `abc123`; documented as a 16 hex-digit identifier, but the schema example uses a short string `abc123` (see divergence note) | "A unique identifier for the request, allowing tracking and debugging of the operation." [verified-from-schema: commands/dev_mgmt/get_version.json#properties.requestId] |

There is no command payload key for `get_version` — only `command` and `requestId` are defined, and both are required. [verified-from-schema: commands/dev_mgmt/get_version.json#required] There is no per-message auth block (MQTT credentials are configured at the endpoint via `config_endpoint` / `set_config` `mqttParams.username` / `password`, reference only). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#mqttParams.username, password]

**requestId divergence note:** `requestId` is documented elsewhere as a 16 hex-digit identifier, yet the schema and grounding examples use short non-hex strings (`abc123` in the command schema and grounding page; `abcd123` in the response schema). [verified-from-schema: commands/dev_mgmt/get_version.json#properties.requestId.example "abc123"] [verified-from-schema: response/dev_mgmt/get_version.json#properties.requestId.example "abcd123"] [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_version.md (example requestId "abc123")] The 16-hex-digit rule itself is [firmware-only-unknown] within the files read for this item.

### JSON Request Example
```json
{ "command": "get_version", "requestId": "abc123" }
```
[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_version.md (MQTT Command Payload example)]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | default `get_version` | "The command that was executed to retrieve the reader version details." [verified-from-schema: response/dev_mgmt/get_version.json#properties.command] |
| requestId | root | string | Required | example `abcd123` | "The unique identifier of the original request." [verified-from-schema: response/dev_mgmt/get_version.json#properties.requestId] |
| apiVersion | root | string (enum) | Required | Allowed: `V1.1`, `V1.0`; example `V1.1` | API version. [verified-from-schema: response/dev_mgmt/get_version.json#properties.apiVersion.enum] |
| readerVersion | root | object | Optional | see sub-fields | "Contains device version details including firmware, model, serial number, and SKU." [verified-from-schema: refrence/response/readerVersionResponse.yaml#description] |
| readerVersion.firmwareVersion | readerVersion | string | Required (in readerVersion) | example `SAAFKS00-006-R02` | "The firmware version of the reader." [verified-from-schema: refrence/response/readerVersionResponse.yaml#firmwareVersion] |
| readerVersion.model | readerVersion | string (enum) | Required (in readerVersion) | Allowed: `RFD40`, `RFD90` | "The model of the reader, such as RFD40 or RFD90." [verified-from-schema: refrence/response/readerVersionResponse.yaml#model.enum] |
| readerVersion.serialNumber | readerVersion | string | Required (in readerVersion) | example `23053520102096` | "The serial number of the reader." [verified-from-schema: refrence/response/readerVersionResponse.yaml#serialNumber] |
| readerVersion.sku | readerVersion | string | Required (in readerVersion) | example `RFD4031-G10B700-US` | "The stock keeping unit (SKU) identifier for the reader." [verified-from-schema: refrence/response/readerVersionResponse.yaml#sku] |
| readerVersion.companyName | readerVersion | string (enum) | Required (in readerVersion) | Allowed: `Zebra Technologies` | "The company name associated with the reader." [verified-from-schema: refrence/response/readerVersionResponse.yaml#companyName.enum] |
| readerVersion.manufacturerName | readerVersion | string (enum) | Required (in readerVersion) | Allowed: `Zebra Technologies` | "The manufacturer name associated with the reader." [verified-from-schema: refrence/response/readerVersionResponse.yaml#manufacturerName.enum] |
| readerVersion.detailedVersions | readerVersion | object | Optional | see sub-fields | "Detailed version information for the reader." [verified-from-schema: refrence/response/readerVersionResponse.yaml#detailedVersions] |
| readerVersion.detailedVersions.scannerFirmware | detailedVersions | string | Optional | example `PAAEOC20-003-R01` | "The firmware version of the scanner component." [verified-from-schema: refrence/response/readerVersionResponse.yaml#detailedVersions.scannerFirmware] |
| readerVersion.detailedVersions.radioFirmware | detailedVersions | string | Optional | example `2.0.42.0` | "The firmware version of the radio component." [verified-from-schema: refrence/response/readerVersionResponse.yaml#detailedVersions.radioFirmware] |
| readerVersion.detailedVersions.iotcVersion | detailedVersions | string (enum) | Optional | Allowed: `V1.1`; example `V1.1` | "The version of the IoT Connector (IoTC) software." [verified-from-schema: refrence/response/readerVersionResponse.yaml#detailedVersions.iotcVersion.enum] |
| response | root | object | Required | see sub-fields | "Standard response object containing the status code and description of the operation result." [verified-from-schema: refrence/response/response.yaml#description] |
| response.code | response | integer | Required (in response) | Min: 0, Max: 30; example `0` | "Command response status code." [verified-from-schema: refrence/response/response.yaml#code (minimum 0, maximum 30)] |
| response.description | response | string | Required (in response) | example `Success` | "response description in detail" [verified-from-schema: refrence/response/response.yaml#description (description field)] |

Required top-level response fields: `command`, `requestId`, `apiVersion`, `response`. [verified-from-schema: response/dev_mgmt/get_version.json#required] Required `readerVersion` sub-fields: `firmwareVersion`, `model`, `serialNumber`, `sku`, `companyName`, `manufacturerName` (`detailedVersions` is not in the readerVersion `required` list). [verified-from-schema: refrence/response/readerVersionResponse.yaml#required] Required `response` sub-fields: `code`, `description`. [verified-from-schema: refrence/response/response.yaml#required]

### JSON Response Example
```json
{
  "command": "get_version",
  "requestId": "abcd123",
  "apiVersion": "V1.1",
  "readerVersion": {
    "firmwareVersion": "SAAFKS00-006-R02",
    "model": "RFD40",
    "serialNumber": "23053520102096",
    "sku": "RFD4031-G10B700-US",
    "companyName": "Zebra Technologies",
    "manufacturerName": "Zebra Technologies",
    "detailedVersions": {
      "scannerFirmware": "PAAEOC20-003-R01",
      "radioFirmware": "2.0.42.0",
      "iotcVersion": "V1.1"
    }
  },
  "response": { "code": 0, "description": "Success" }
}
```
[verified-from-schema: response/dev_mgmt/get_version.json#examples[0]]

## 5. Associated Error Codes

The integer code domain is 0–30, drawn verbatim from the response code table. [verified-from-schema: refrence/response/response.yaml#code (Response codes table, minimum 0, maximum 30)] The subset below is a **hypothesis** for `get_version`; its representability over the response shape is [verified-via-local-mock: routing/shape only]. The code↔trigger binding is [firmware-only-unknown] unless `response.yaml` states it verbatim — `response.yaml` provides only code→meaning text (not which command emits which code), so triggering conditions below are inferred and marked accordingly.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command processed successfully and version details returned. Meaning is verbatim from the table [verified-from-schema: refrence/response/response.yaml#code (0 = Success)]; binding to `get_version` [verified-via-local-mock: routing/shape only]. | `{ "command": "get_version", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information | Hypothesized: reader could not retrieve the requested version/identity information. Meaning is verbatim from the table [verified-from-schema: refrence/response/response.yaml#code (3 = Not able to retrieve information)]; the specific firmware trigger for `get_version` is [firmware-only-unknown]; representability [verified-via-local-mock: routing/shape only]. | `{ "command": "get_version", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |

---

# Command: get_wifi

## 1. Intent & Objective

The `get_wifi` command retrieves the current Wi-Fi configuration details stored on a Zebra handheld RFID reader (RFD40 / RFD90). The command schema describes it as the command "issued to get all the wifi profiles saved in device" and its top-level intent as to "retrieve wifi configuration details" [verified-from-schema: commands/dev_mgmt/get_wifi.json, properties.command.description and description].

An application uses this command when it needs to read back the network state of the reader — for example to confirm that the reader has joined the intended access point, to display the assigned IPv4 address / gateway / DNS to an operator, or to audit which security profile (WPA2-Personal, WPA2-Enterprise, WPA3-Enterprise, etc.) the reader is currently using. Concretely, the response surfaces the interface name (`wlan0`), interface `status` (ENABLED/DISABLED), `hostname`, `macAddress`, the connected `accessPoint` (ESSID, connection status, security type), and the `ipv4Configuration` block (IP address, subnet mask, gateway, DHCP flag, DNS server, domain name) [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.*].

This is a read-only management query. It does not change reader RFID radio state and is not an inventory operation. From a workflow standpoint, the Wi-Fi link being queried here is the same network connection that an operator establishes through 123RFID Desktop during the "Configure Wi-Fi Connectivity" phase, where the reader is connected to an SSID with a chosen protocol/passkey and the tool verifies the Connected network name, assigned IP Address, MAC Address, and a "Connected" status [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/how-to/connect-a-reader-with-123rfid-desktop.md, Phase 2]. The reader requires this stable Wi-Fi link for MQTT and other network-dependent protocols to function in production [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/how-to/connect-a-reader-with-123rfid-desktop.md, Phase 2].

Architecturally, `get_wifi` is a device-management (MGMT) operation. In this run it is routed over the MDM management endpoint: the reader subscribes for the command on `MDM/clients/cmnd` and publishes its response on `MDM/clients/resp`; the topic literals carry no tenant prefix (the MDM example sets `tenantId` to `ZEBRA` but the topic strings are not tenant-prefixed) [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples[3].epConfig.configuration with epType MDM and mqttParams topics]. The MDM topic defaults (`MDM/clients/cmnd`, `MDM/clients/resp`, `MDM/clients/event`) are the same defaults exposed in the endpoint configuration UI [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/how-to/connect-a-reader-with-123rfid-desktop.md, Phase 3 endpoint table]. The exact firmware-level radio/Wi-Fi-supplicant behaviors triggered by this query are [firmware-only-unknown].

Routing/shape of this command was exercised against a local mock only; the physical device session was not proven attached this run [verified-via-local-mock: routing/shape only].

## 2. Topic Mapping

Topics are configured per-endpoint and follow the pattern `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. The MDM management endpoint example sets `tenantId` to `ZEBRA`, but the topic literals themselves carry no tenant prefix, so the literal instances are `MDM/clients/cmnd` and `MDM/clients/resp` [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples[3].epConfig.configuration.mqttParams.subscribeTopics/publishTopics].

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd (e.g. MDM/clients/cmnd) | not specified per-operation in schema; per-topic subscribe `qos: 0` in MDM example [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples[3].mqttParams.subscribeTopics[0].qos] | per-topic `retain: false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples[3].mqttParams.subscribeTopics[0].retain] |
| Subscribe (Response) | {EP_TYPE}/clients/resp (e.g. MDM/clients/resp) | not specified per-operation in schema; per-topic publish `qos: 1` in MDM example [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples[3].mqttParams.publishTopics[0].qos] | per-topic `retain: false` [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples[3].mqttParams.publishTopics[0].retain] |

Notes:
- The "Request" direction is the device's subscribe topic (`.../clients/cmnd`) and the "Response" direction is the device's publish topic (`.../clients/resp`). The application publishes to `cmnd` and subscribes to `resp`.
- QoS and Retain are per-topic settings defined in `cfgEndpointPayload.mqttParams` (`publishTopics[].qos`, `publishTopics[].retain`, `subscribeTopics[].qos`, `subscribeTopics[].retain`) plus an endpoint-wide `qosCommon` integer; the QoS/Retain values shown above are cited from the MDM `config_endpoint` example, not bound to `get_wifi` itself [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, properties.configuration.properties.mqttParams.publishTopics/subscribeTopics and properties.configuration.properties.qosCommon]. There is no per-operation QoS binding in the schema.
- Topics are configurable per-endpoint; if left blank the default values (`MDM/clients/cmnd|resp|event`) are auto-populated [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/how-to/connect-a-reader-with-123rfid-desktop.md, Phase 3 note].

## 3. Request Payload Breakdown

`get_wifi` takes no payload object — only the `command` literal and a `requestId` [verified-from-schema: commands/dev_mgmt/get_wifi.json, properties and required].

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `get_wifi` (command literal: `get_wifi`) | Command issued to get all the wifi profiles saved in device [verified-from-schema: commands/dev_mgmt/get_wifi.json, properties.command] |
| requestId | root | string | Required | example `abc123`; the schema gives no format/length constraint and describes it only as a unique request identifier | A unique identifier for the request, allowing tracking and debugging of the operation [verified-from-schema: commands/dev_mgmt/get_wifi.json, properties.requestId] |

No `auth` block exists on this message; MQTT broker credentials live in the endpoint `mqttParams` (`username`/`password`) configured via `config_endpoint` / `set_config` and are referenced only there [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, properties.configuration.properties.mqttParams.username/password].

### JSON Request Example
```json
{ "command": "get_wifi", "requestId": "abc123" }
```

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `get_wifi` | The command that was executed to retrieve the WiFi configuration [verified-from-schema: response/dev_mgmt/get_wifi.json, properties.command] |
| requestId | root | string | Required | example `abc123` (schema gives no format/length constraint) | The unique identifier of the original request [verified-from-schema: response/dev_mgmt/get_wifi.json, properties.requestId] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1` | API version of the response [verified-from-schema: response/dev_mgmt/get_wifi.json, properties.apiVersion] |
| wifiProfiles | root | object | Optional (not in `required`) | Contains the list of WiFi profiles and their connection status; `wifiProfiles.wifiConfig` is an array of interface-detail objects | List of WiFi profiles and connection status [verified-from-schema: response/dev_mgmt/get_wifi.json, properties.wifiProfiles -> refrence/response/getWifiResponse.yaml] |
| wifiProfiles.wifiConfig[] | wifiProfiles | array of objects | Optional | each item is a `wifiConfig` object | Array of WiFi config entries [verified-from-schema: refrence/response/getWifiResponse.yaml, properties.wifiConfig] |
| interfaceDetails | wifiConfig[] | object | Required within wifiConfig | requires `interfaceName`, `status`, `hostname`, `macAddress` | WiFi network interface details [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails] |
| interfaceDetails.interfaceName | interfaceDetails | string | Required | example `wlan0` | The name of the network interface [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.interfaceName] |
| interfaceDetails.status | interfaceDetails | string | Required | enum: `ENABLED`, `DISABLED` | The status of the network interface [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.status] |
| interfaceDetails.hostname | interfaceDetails | string | Required | example `RFD40S123` | The hostname of the device [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.hostname] |
| interfaceDetails.macAddress | interfaceDetails | string | Required | example `E0-D0-45-3D-38-1D` | The MAC address of the network interface [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.macAddress] |
| interfaceDetails.accessPoint | interfaceDetails | object | Optional | requires `essid`, `status`, `securityType`, `isPreferred` | Connected/configured access point info [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.accessPoint] |
| accessPoint.essid | accessPoint | string | Required (within accessPoint) | example `Zwireless` | The ESSID (network name) of the access point [verified-from-schema: refrence/response/wifiResponseSoti.yaml, accessPoint.properties.essid] |
| accessPoint.status | accessPoint | string | Required (within accessPoint) | enum: `CONNECTED`, `DISCONNECTED` | Connection status to the access point [verified-from-schema: refrence/response/wifiResponseSoti.yaml, accessPoint.properties.status] |
| accessPoint.securityType | accessPoint | string | Required (within accessPoint) | enum: `WPA2personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise` | The security type used by the access point [verified-from-schema: refrence/response/wifiResponseSoti.yaml, accessPoint.properties.securityType] |
| accessPoint.isPreferred | accessPoint | boolean | Required (within accessPoint) | true/false | Indicates whether this access point is preferred for connection [verified-from-schema: refrence/response/wifiResponseSoti.yaml, accessPoint.properties.isPreferred] |
| accessPoint.autoConn | accessPoint | boolean | Optional | deprecated, kept for backward compatibility | Deprecated field [verified-from-schema: refrence/response/wifiResponseSoti.yaml, accessPoint.properties.autoConn] |
| interfaceDetails.ipv4Configuration | interfaceDetails | object | Optional | fields below | IPv4 network configuration for the WiFi interface [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.ipv4Configuration] |
| ipv4Configuration.ipAddress | ipv4Configuration | string (ipv4) | Optional | example `192.168.1.81` | The IPv4 address of the device [verified-from-schema: refrence/response/wifiResponseSoti.yaml, ipv4Configuration.properties.ipAddress] |
| ipv4Configuration.subnetMask | ipv4Configuration | string (ipv4) | Optional | example `255.255.255.0` | The subnet mask of the network [verified-from-schema: refrence/response/wifiResponseSoti.yaml, ipv4Configuration.properties.subnetMask] |
| ipv4Configuration.gateway | ipv4Configuration | string (ipv4) | Optional | example `192.168.1.144` | The IPv4 gateway address [verified-from-schema: refrence/response/wifiResponseSoti.yaml, ipv4Configuration.properties.gateway] |
| ipv4Configuration.enableDhcp | ipv4Configuration | boolean | Optional | true/false | Indicates if DHCP is enabled for IPv4 [verified-from-schema: refrence/response/wifiResponseSoti.yaml, ipv4Configuration.properties.enableDhcp] |
| ipv4Configuration.dnsServer | ipv4Configuration | string (ipv4) | Optional | example `192.168.1.78` | The IPv4 address of the DNS server [verified-from-schema: refrence/response/wifiResponseSoti.yaml, ipv4Configuration.properties.dnsServer] |
| ipv4Configuration.domainName | ipv4Configuration | string | Optional | example `test.soti.com` | The domain name of the network [verified-from-schema: refrence/response/wifiResponseSoti.yaml, ipv4Configuration.properties.domainName] |
| interfaceDetails.ipv6Configuration | interfaceDetails | object | Optional | ipAddress/prefix/gateway/enableAuto/dnsServer/domainName | IPv6 network configuration for the WiFi interface [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.ipv6Configuration] |
| interfaceDetails.securityDetails | interfaceDetails | object | Optional | WPA2Personal / WPA3Personal / WPA2Enterprise / WPA3Enterprise sub-objects | Security credentials and protocol details for the WiFi connection [verified-from-schema: refrence/response/wifiResponseSoti.yaml, properties.interfaceDetails.properties.securityDetails] |
| response | root | object | Required | requires `code` and `description` | Standard response object with status code and description [verified-from-schema: response/dev_mgmt/get_wifi.json, properties.response -> refrence/response/response.yaml] |
| response.code | response | integer | Required | range 0–30 (full table in response.yaml) | Response code [verified-from-schema: refrence/response/response.yaml, properties.code, minimum 0 maximum 30] |
| response.description | response | string | Required | example `Success` | Response description in detail [verified-from-schema: refrence/response/response.yaml, properties.description] |

### JSON Response Example
```json
{ "command": "get_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```

## 5. Associated Error Codes

The codes below are the hypothesized subset for `get_wifi`, drawn verbatim from the 0–30 table in `refrence/response/response.yaml`. The representability of these codes on this command is [verified-via-local-mock: routing/shape only]. The binding of a specific code to a specific trigger for `get_wifi` is [firmware-only-unknown] unless `response.yaml` states it verbatim (the YAML provides code→meaning text but does not bind triggers per command).

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command processed successfully and Wi-Fi configuration returned [verified-from-schema: refrence/response/response.yaml, code 0]. Per-command trigger binding [firmware-only-unknown] beyond the verbatim meaning. | `{ "command": "get_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 3 | Error | Not able to retrieve information | Verbatim meaning: "Not able to retrieve information" [verified-from-schema: refrence/response/response.yaml, code 3]. Per-command trigger binding [firmware-only-unknown]. | `{ "command": "get_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 3, "description": "Not able to retrieve information" } }` |
| 7 | Error | Interface is not available | Verbatim meaning: "Interface is not available" [verified-from-schema: refrence/response/response.yaml, code 7]. Shipped as a `get_wifi` response example where the interface status is `DISABLED` [verified-from-schema: response/dev_mgmt/get_wifi.json, examples[3] response.code 7]. Per-command trigger binding [firmware-only-unknown]. | `{ "command": "get_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 7, "description": "Interface is not available" } }` |
| 20 | Error | Wifi is not supported | Verbatim meaning: "Wifi is not supported" [verified-from-schema: refrence/response/response.yaml, code 20]. Per-command trigger binding [firmware-only-unknown]. | `{ "command": "get_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 20, "description": "Wifi is not supported" } }` |

Note: code `7` ("Interface is not available") is the only error code that appears bound to `get_wifi` by a shipped schema example (the `status: DISABLED` case). Codes 0, 3, and 20 are drawn from the shared 0–30 table in `response.yaml`; their per-command binding remains [firmware-only-unknown]. All four codes are within the valid 0–30 range.

---

# Command: install_certificate

## 1. Intent & Objective

The `install_certificate` command provisions a certificate (or certificate bundle) onto an RFD40/RFD90 handheld RFID reader over the MQTT API. The command literal is `install_certificate` and its purpose is stated verbatim in the schema as "This API is used to install certificates." [verified-from-schema: commands/dev_mgmt/install_certificate.json, description].

**What it does.** An application publishes this command to instruct the reader to install a certificate described by the `certDetails` payload. The certificate can be supplied two ways, controlled by `certDetails.certSource`: downloaded from remote URLs (`HTTP`) or provided inline (`DIRECT`) in `certDetails.certificateBundle`. When `certSource` is omitted, the device defaults to `HTTP` and downloads certificate content from the URLs listed in `certDetails.url` [verified-from-schema: refrence/payload/installCertPayload.yaml, certSource].

**When an application uses it.** An application uses `install_certificate` to place the trust material a reader needs before it can establish secured (TLS) connections or be authenticated by a remote service. The certificate `type` field identifies where the certificate is used on the reader and accepts `client`, `server`, `mqtt`, `wifi`, or `filestore` [verified-from-schema: refrence/payload/installCertPayload.yaml, type]. For example, the schema examples install a `mqtt` certificate, a `filestore` certificate, and a `wifi` certificate [verified-from-schema: commands/dev_mgmt/install_certificate.json, examples].

**Architectural context (concepts).** The conceptual grounding page (FX/ATR/web-console centric, used here for concepts only) describes that a reader can hold multiple certificates, that there can be only one server certificate while multiple client certificates may coexist, and that the client certificate type is the recommended type for use with IoT Connector [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/certificate-management-zebra-iot-connector-documentation.md]. That same page notes a reader may pull a certificate from a secure hosting server or accept a file directly, which maps conceptually to the `HTTP` vs `DIRECT` `certSource` distinction in the handheld MQTT schema [verified-from-_meta-knowledge-base: same path]. Once installed, a certificate referenced by name in an endpoint's `securityParams` (for example `caCertificateFile`, `clientCert`, `clientKey`) lets that endpoint connect over `MQTT_TLS` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, securityParams].

**Reader behaviors triggered.** The exact firmware actions on the RFD40/RFD90 (key-store writes, format conversion, trust-chain rebuild, TLS re-handshake) and the actual download/validation behavior are not described in the repo schemas. Because the TLS/cert verification path cannot be exercised over plain MQTT on port 1883, the runtime verification behavior is [firmware-only-unknown].

**Routing.** This command is routed over the live MDM (MGMT/live-MDM) endpoint. In the live MDM endpoint instance the topics are literal `MDM/clients/cmnd|resp|event` with no tenant prefix (tenantId `ZEBRA`/`zebra`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples → epType MDM]. Topics are configured per endpoint via `config_endpoint`/`set_config` (reference only). [verified-via-local-mock: routing/shape only]

## 2. Topic Mapping

Topics follow the pattern `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` and are configured per endpoint in `cfgEndpointPayload.mqttParams` (`publishTopics`, `subscribeTopics`), each carrying its own `qos` (int) and `retain` (bool), alongside the endpoint-level `qosCommon` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml, mqttParams]. There is no per-operation QoS binding in the schema. The live MDM instance below is taken from the MDM endpoint example [verified-from-schema: commands/dev_mgmt/config_endpoint.json, examples → endpointName "mgmt_tst", epType "MDM"].

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `MDM/clients/cmnd` | not specified per-operation in schema (subscribeTopics `MDM/clients/cmnd` qos `0` for the endpoint) [verified-from-schema: commands/dev_mgmt/config_endpoint.json, MDM example subscribeTopics] | not specified per-operation in schema (endpoint `retain: false`) [same] |
| Subscribe (Response) | `MDM/clients/resp` | not specified per-operation in schema (publishTopics `MDM/clients/resp` qos `1` for the endpoint) [verified-from-schema: commands/dev_mgmt/config_endpoint.json, MDM example publishTopics] | not specified per-operation in schema (endpoint `retain: false`) [same] |

Notes: From the reader's perspective the device subscribes to `MDM/clients/cmnd` (where the application publishes the command) and publishes responses on `MDM/clients/resp`. The literal `{EP_TYPE}` for the live MDM endpoint is `MDM` with no tenant prefix. Topic strings, qos, and retain are configurable per endpoint and are not bound to this specific operation. [verified-via-local-mock: routing/shape only]

## 3. Request Payload Breakdown

The top-level request carries `command`, `requestId`, and the payload key `certDetails`. Top-level `required` is `command`, `requestId` [verified-from-schema: commands/dev_mgmt/install_certificate.json, required]. Within `certDetails`, `required` is `type`, `authenticationType` [verified-from-schema: refrence/payload/installCertPayload.yaml, required]. There is no per-message auth block.

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `install_certificate` | Command issued to install new certificate [verified-from-schema: commands/dev_mgmt/install_certificate.json, properties.command] |
| requestId | root | string | Required | example value `abc123` (examples also use `cert-test-001`, `19001`, `abc456`, `0001`); shared models describe it as a "16 hex digit identifier" [verified-from-schema: models/iot_commands.v1.1.json, requestId] — note this divergence from the short example strings, logged not fixed | A unique identifier for the request, allowing tracking and debugging of the operation [verified-from-schema: commands/dev_mgmt/install_certificate.json, properties.requestId] |
| certDetails | root | object | Optional (not in root `required`) | `$ref` → installCertPayload.yaml | Defines the certificate details required for installation on the device [verified-from-schema: commands/dev_mgmt/install_certificate.json, properties.certDetails; refrence/payload/installCertPayload.yaml, description] |
| name | certDetails | string | Optional | example `sotiAgent` | A logical name for the certificate entry, typically representing the application, service, or agent [verified-from-schema: refrence/payload/installCertPayload.yaml, name] |
| type | certDetails | string | Required | enum: `client`, `server`, `mqtt`, `wifi`, `filestore` | Certificate category that identifies where the certificate is used [verified-from-schema: refrence/payload/installCertPayload.yaml, type] |
| authenticationType | certDetails | string | Required | enum: `NONE`, `CERTIFICATE` | Authentication method used to access the remote certificate source. `NONE`: none; `CERTIFICATE`: certificate-based [verified-from-schema: refrence/payload/installCertPayload.yaml, authenticationType] |
| certSource | certDetails | string | Optional | enum: `HTTP`, `DIRECT`; defaults to `HTTP` if omitted | How certificate content is supplied. `DIRECT`: inline in `certificateBundle`; `HTTP`: downloaded from `url` [verified-from-schema: refrence/payload/installCertPayload.yaml, certSource] |
| url | certDetails | array of objects | Optional | each item has `key` enum: `ca_cert`, `client_key`, `client_cert`, `cert_key_password`; `value` string (URL, or password value for `cert_key_password`) | Key-value entries mapping certificate components to downloadable URLs [verified-from-schema: refrence/payload/installCertPayload.yaml, url] |
| verificationType | certDetails | string | Optional | enum: `NONE`, `VERIFY_PEER`, `VERIFY_HOST`, `VERIFY_HOST_PEER` | TLS verification mode used when validating remote endpoints. Runtime effect is [firmware-only-unknown] (TLS path untestable on plain MQTT 1883) [verified-from-schema: refrence/payload/installCertPayload.yaml, verificationType] |
| certificateBundle | certDetails | object | Optional | sub-fields `ca_cert`, `client_key`, `client_cert`, `cert_key_password` (all strings); used when `certSource` is `DIRECT` | Inline certificate payload; provide content for one certificate `type` [verified-from-schema: refrence/payload/installCertPayload.yaml, certificateBundle] |
| caCertificateFileContent | certDetails | string | Optional | applicable only when `certSource` is `HTTP` and `authenticationType` is `CERTIFICATE`; not applicable when `certSource` is `DIRECT`; if empty, device uses an already installed filestore certificate | Inline certificate content used only for remote download authentication [verified-from-schema: refrence/payload/installCertPayload.yaml, caCertificateFileContent] |

### JSON Request Example
```json
{
  "command": "install_certificate",
  "requestId": "19001",
  "certDetails": {
    "name": "mqtt_certs",
    "type": "mqtt",
    "authenticationType": "NONE",
    "certSource": "HTTP",
    "url": [
      { "key": "client_cert", "value": "http://192.168.0.107:8080/mqtt_client_cert.pem" },
      { "key": "client_key",  "value": "http://192.168.0.107:8080/mqtt_client_key.pem" },
      { "key": "ca_cert",     "value": "http://192.168.0.107:8080/mqtt_ca_cert.pem" }
    ],
    "verificationType": "VERIFY_HOST_PEER"
  }
}
```
[verified-from-schema: commands/dev_mgmt/install_certificate.json, examples]

## 4. Response Payload Breakdown

The response carries `command`, `requestId`, `apiVersion`, and `response`. All four are `required` [verified-from-schema: response/dev_mgmt/install_certificate.json, required]. The `response` object is a `$ref` to the standard response schema (`code` integer 0-30, `description` string) [verified-from-schema: response/dev_mgmt/install_certificate.json, properties.response → refrence/response/response.yaml].

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `install_certificate` | The command that was executed to install a certificate [verified-from-schema: response/dev_mgmt/install_certificate.json, properties.command] |
| requestId | root | string | Required | example `abc123` (echoes the request; examples also use `18996`); shared models describe it as a "16 hex digit identifier" [verified-from-schema: models/iot_mgmt_cmd_response.v1.1.json, requestId] — same short-string vs 16-hex divergence noted, logged not fixed | The unique identifier of the original request [verified-from-schema: response/dev_mgmt/install_certificate.json, properties.requestId] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1` | API version of the response [verified-from-schema: response/dev_mgmt/install_certificate.json, properties.apiVersion] |
| response.code | response | integer | Required | min `0`, max `30`; see code→meaning table | Response status code [verified-from-schema: refrence/response/response.yaml, code] |
| response.description | response | string | Required | example `Success` | Response description in detail [verified-from-schema: refrence/response/response.yaml, description] |
| payload (optional) | root | — | Optional | not present in this response schema | No additional payload object is defined for this response [verified-from-schema: response/dev_mgmt/install_certificate.json, properties] |

### JSON Response Example
```json
{
  "command": "install_certificate",
  "requestId": "18996",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
The schema's own example uses `code: 1` / `"Command payload is accepted"` [verified-from-schema: response/dev_mgmt/install_certificate.json, examples]; the success shape with `code: 0` / `"Success"` is per the response code table [verified-from-schema: refrence/response/response.yaml, code].

## 5. Associated Error Codes

The codes below are the hypothesized subset for `install_certificate`, drawn verbatim from the response code table [verified-from-schema: refrence/response/response.yaml, code]. The set of codes 0-30 is the only valid range. The representability of this command emitting these codes (routing/shape) is [verified-via-local-mock: routing/shape only]; the specific code↔trigger binding is [firmware-only-unknown] because response.yaml does not state per-command triggering conditions verbatim. The "Triggering Condition" column reproduces only the meaning string from the table; the actual firmware condition is [firmware-only-unknown].

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Operation succeeded (table meaning "Success") [verified-from-schema: refrence/response/response.yaml]; exact firmware condition [firmware-only-unknown] | `{ "command": "install_certificate", "requestId": "0001", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Table meaning "Invalid payload" [verified-from-schema: refrence/response/response.yaml]; binding to a malformed `certDetails` is [firmware-only-unknown] | `{ "command": "install_certificate", "requestId": "0001", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 21 | Error | Certificate not found | Table meaning "Certificate not found" [verified-from-schema: refrence/response/response.yaml]; binding to a missing/installed cert reference is [firmware-only-unknown] | `{ "command": "install_certificate", "requestId": "0001", "apiVersion": "V1.1", "response": { "code": 21, "description": "Certificate not found" } }` |
| 29 | Error | Url missing for HTTP source | Table meaning "Url missing for HTTP source" [verified-from-schema: refrence/response/response.yaml]; binding to a missing `url` under `certSource: HTTP` is [firmware-only-unknown] | `{ "command": "install_certificate", "requestId": "0001", "apiVersion": "V1.1", "response": { "code": 29, "description": "Url missing for HTTP source" } }` |
| 30 | Error | Certificate content missing for direct source | Table meaning "Certificate content missing for direct source" [verified-from-schema: refrence/response/response.yaml]; binding to an empty `certificateBundle` under `certSource: DIRECT` is [firmware-only-unknown] | `{ "command": "install_certificate", "requestId": "0001", "apiVersion": "V1.1", "response": { "code": 30, "description": "Certificate content missing for direct source" } }` |

---

# Command: reboot

## 1. Intent & Objective

The `reboot` command performs a **warm reset** of an RFD40/RFD90 handheld RFID reader over the MQTT management/MDM channel. It is a state-changing, management-plane operation that takes **no configuration payload** — only the `command` literal and a `requestId` are sent. [verified-from-schema: commands/dev_mgmt/reboot.json — properties.command, properties.requestId, required]

**What it does.** The command issues a warm reset of the device. After a successful reboot, the device automatically reinitializes (reinitiates) its connection to the previously connected server; upon failure, a failure notification is sent. [verified-from-schema: commands/dev_mgmt/reboot.json — description] [verified-from-_meta-knowledge-base: _meta/.../reboot.md §1 Description]

**When an application uses it.** Per the grounding guide, an application sends `reboot` to: restart the device for applying configuration changes; recover from error states; reinitialize device connections; and apply pending device updates. [verified-from-_meta-knowledge-base: _meta/.../reboot.md §1 "Use this command to"]

**RFD40/RFD90 reader behaviors it triggers.**
- The reader is restricted to **RFD40 Series and RFD90 Series**. [verified-from-_meta-knowledge-base: _meta/.../reboot.md §2 "Applies To"]
- The device **cannot be rebooted while an RFID inventory operation is in progress**; the inventory must first be stopped (the guide references `control_operation` with `operation: STOP`). Attempting to reboot during an active inventory returns error code **5**. [verified-from-_meta-knowledge-base: _meta/.../reboot.md §3 Inventory state, §4 Rules and Constraints]
- After a successful reboot the device **automatically reconnects** to the previously connected server — no manual reconnection is required. [verified-from-_meta-knowledge-base: _meta/.../reboot.md §3 Server reconnection]
- Configuration persistence: all **management endpoint configurations are restored** after reboot; only **radio operation configurations from control endpoint operations are lost** on reboot. [verified-from-_meta-knowledge-base: _meta/.../reboot.md §3 Configuration persistence]

**Architectural context.** This command is documented for `epType` **MGMT** and is exercised on the live management/MDM endpoint. Topics are configured per endpoint; the live MDM endpoint uses the literal topic family `MDM/clients/cmnd|resp|event` with no tenant prefix (`tenantId` `ZEBRA`). [verified-from-schema: commands/dev_mgmt/config_endpoint.json — examples[].epConfig.configuration where epType=="MDM", mqttParams.publishTopics/subscribeTopics, tenantId]

> SPECIAL NOTE: This command is **state-changing and was not exercised live this run** (mock-fallback mode). Routing and message shape were validated against the schemas only; device-side reboot behavior is [firmware-only-unknown].

## 2. Topic Mapping

Topics are **configurable per endpoint**; QoS and Retain are carried per-topic inside `cfgEndpointPayload.mqttParams.publishTopics[]` / `subscribeTopics[]` (each entry has `qos:int`, `retain:bool`) plus the endpoint-level `qosCommon`. There is **no per-operation QoS binding** in the `reboot` schema. The rows below show the live **MDM** endpoint instance and the per-topic values from a config_endpoint MDM example.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `MDM/clients/cmnd` (`{EP_TYPE}/clients/cmnd`) | `0` — per `subscribeTopics[].qos` for `MDM/clients/cmnd` (device subscribes to cmnd); not specified per-operation in schema [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example subscribeTopics] | `false` — per `subscribeTopics[].retain` for `MDM/clients/cmnd` [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example subscribeTopics] |
| Subscribe (Response) | `MDM/clients/resp` (`{EP_TYPE}/clients/resp`) | `1` — per `publishTopics[].qos` for `MDM/clients/resp` (device publishes resp); not specified per-operation in schema [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example publishTopics] | `false` — per `publishTopics[].retain` for `MDM/clients/resp` [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example publishTopics] |

Notes:
- The `MDM/clients/cmnd|resp|event` topics carry **no tenant prefix**; `tenantId` is `ZEBRA`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example tenantId, topics]
- `qosCommon` for the MDM example endpoint is `1`. [verified-from-schema: commands/dev_mgmt/config_endpoint.json — MDM example qosCommon] [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — properties.configuration.properties.qosCommon]
- Per-topic `qos`/`retain` are defined by `cfgEndpointPayload.yaml` (publishTopics/subscribeTopics items require `topic`, `qos`, `retain`). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — mqttParams.publishTopics.items, mqttParams.subscribeTopics.items]
- Routing/shape for this command validated in mock only. [verified-via-local-mock: routing/shape only]

## 3. Request Payload Breakdown

This command has **no named payload object** — only `command` and `requestId` are sent (both required). There is no `auth` field. [verified-from-schema: commands/dev_mgmt/reboot.json — properties, required]

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `reboot` | Command issued to reboot the reader. [verified-from-schema: commands/dev_mgmt/reboot.json — properties.command] |
| `requestId` | root | string | Required | example `123abcd`. No length/format constraint is declared in the schema; schema and guide examples use short strings (e.g., `123abcd`, `18996`, `abc123`). Any fixed-width/hex-format requirement is [firmware-only-unknown]. | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/reboot.json — properties.requestId] |

### JSON Request Example
```json
{ "command": "reboot", "requestId": "123abcd" }
```
[verified-from-schema: commands/dev_mgmt/reboot.json — properties.command.example, properties.requestId.example] [verified-from-_meta-knowledge-base: _meta/.../reboot.md "MQTT Command Payload" example]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `reboot` | The command that was executed to reboot the device. [verified-from-schema: response/dev_mgmt/reboot.json — properties.command] |
| `requestId` | root | string | Required | example `123abcd` (response example uses `18996`) | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/reboot.json — properties.requestId, examples] |
| `apiVersion` | root | string (enum) | Required | `V1.0` \| `V1.1` (example `V1.1`) | API version of the response. [verified-from-schema: response/dev_mgmt/reboot.json — properties.apiVersion.enum] |
| `response` | root | object | Required | `$ref` to `refrence/response/response.yaml`; requires `code` + `description` | Standard response object containing the status code and description of the operation result. [verified-from-schema: response/dev_mgmt/reboot.json — properties.response; refrence/response/response.yaml — required] |
| `response.code` | response | integer | Required | `0`–`30` (min 0, max 30) per the code→meaning table | Response code indicating success or failure. [verified-from-schema: refrence/response/response.yaml — properties.code, minimum/maximum] |
| `response.description` | response | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml — properties.description] |

### JSON Response Example
```json
{ "command": "reboot", "requestId": "18996", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
[verified-from-schema: response/dev_mgmt/reboot.json — examples (command, requestId, apiVersion shape); response.code/description shape] [verified-from-schema: refrence/response/response.yaml — code 0 = Success]

> Note: the schema's own embedded example returns `"code": 1, "description": "Command payload is accepted"` (an acknowledgement), not `code 0`. The `code 0 = Success` example above is constructed from the response.yaml code table. [verified-from-schema: response/dev_mgmt/reboot.json — examples[0]] [verified-from-schema: refrence/response/response.yaml — code 1 = "Command payload is accepted", code 0 = "Success"]

## 5. Associated Error Codes

Hypothesized subset for `reboot`: **0, 5**. The codes and their meanings are reproduced verbatim from the 0–30 table in `refrence/response/response.yaml`. The representability of this subset on the `cmnd`/`resp` topics is [verified-via-local-mock: routing/shape only]. The code↔trigger **binding** is [firmware-only-unknown] unless the `_meta` grounding guide states it verbatim (noted in the Triggering Condition column).

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | `Success` [verified-from-schema: refrence/response/response.yaml — code 0] | Command executed successfully. [verified-from-_meta-knowledge-base: _meta/.../reboot.md Error Codes table, code 0] | `{ "command": "reboot", "requestId": "123abcd", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 5 | Error | `Can't reboot device, inventory in progress` [verified-from-schema: refrence/response/response.yaml — code 5] | An RFID inventory operation is currently active; stop the inventory with `control_operation` (operation `STOP`) before rebooting. [verified-from-_meta-knowledge-base: _meta/.../reboot.md §3/§4 + Error Codes table, code 5] | `{ "command": "reboot", "requestId": "123abcd", "apiVersion": "V1.1", "response": { "code": 5, "description": "Can't reboot device, inventory in progress" } }` |

> Subset representability: [verified-via-local-mock: routing/shape only]. Any error code beyond this hypothesized subset for `reboot` is [firmware-only-unknown].

---

# Command: set_config

## 1. Intent & Objective

The `set_config` command issues a complete or partial device-configuration update to a Zebra handheld RFID reader (RFD40 / RFD90) over MQTT. Per the command schema, it is "issued to set the complete device configuration such as current region details, ethernet & wifi configuration, end point configuration, event and alert configuration" [verified-from-schema: commands/dev_mgmt/set_config.json `description`].

The command literal is `set_config` [verified-from-schema: commands/dev_mgmt/set_config.json `properties.command.example`], and its single payload key is `configData` [verified-from-schema: commands/dev_mgmt/set_config.json `properties.configData`]. The `configData` object carries up to three top-level members:

- `applyAfterReboot` (boolean): "if set to true, configuration changes will be applied after reboot" [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.applyAfterReboot`].
- `wifiConfig`: a WiFi profile configuration block "including network credentials and security settings" [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `description`], referenced via `$ref: ./cfgWifiPayload.yaml` [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.wifiConfig`].
- `epConfig`: an endpoint configuration block "including protocol, security, and MQTT parameters" [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `description`], referenced via `$ref: ./cfgEndpointPayload.yaml` [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.epConfig`].

When an application uses it: a management/MDM client sends `set_config` to live-provision the reader — for example to create or modify a WiFi access-point profile (`wifiConfig.operation` = `CREATE` or `MODIFY` [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.operation.enum`]), or to add/delete/update a messaging endpoint such as MGMT, MDM, CTRL, or DATA (`epConfig.operation` = `add` | `delete` | `update` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.operation.enum`]). The schema examples show both a WiFi-only update and endpoint creation for `epType` values including `MDM`, `DATA1`, `CTRL`, and `MGMT` [verified-from-schema: commands/dev_mgmt/set_config.json `examples`].

RFD40/RFD90 reader behaviors triggered: applying a `wifiConfig` with `accessPoint.connect: true` causes the reader to disconnect the currently connected profile and connect to the specified one; with `connect: false` it just saves the profile [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.connect.description`]. Applying an `epConfig` block configures the MQTT endpoint (broker URL, port, QoS, tenant, MQTT params and topics) the reader uses for that endpoint [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml]. Whether changes take effect immediately or are deferred is governed by `applyAfterReboot` [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.applyAfterReboot`]. The precise firmware-level sequencing (radio reinitialization, network re-association timing) is [firmware-only-unknown].

Architectural context: this is an `epType: MGMT` (live MDM) device-management operation routed over the management/MDM endpoint. Endpoints are themselves configured by this very command through `epConfig.configuration.epType`, whose allowed values are `MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, `SOTI`, `MDM` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.epType.enum`]. The command/response routing shape was exercised through the local mock only [verified-via-local-mock: routing/shape only].

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | per-endpoint MQTT topic configured in `epConfig` (no schema-defined fixed pattern) | not specified per-operation in schema | not specified per-operation in schema |
| Subscribe (Response) | per-endpoint MQTT topic configured in `epConfig` (no schema-defined fixed pattern) | not specified per-operation in schema | not specified per-operation in schema |

Topics are configured per endpoint, not per operation, and the topic string for each direction is an arbitrary value supplied inside `epConfig.configuration.mqttParams.publishTopics`/`subscribeTopics` — the schema does not define a fixed `{EP_TYPE}/clients/...` topic pattern [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.publishTopics`/`.subscribeTopics`]. Example topics in the source files vary in shape: some use `MGMT/clients/resp` and `MDM/clients/cmnd` while another uses `IOT/data/resp` / `IOT/data/cmnd`, so the `*/clients/*` form is only an example convention, not a schema rule [verified-from-schema: commands/dev_mgmt/set_config.json `examples`]. QoS and Retain are defined per-topic inside `epConfig.configuration.mqttParams` (each `publishTopics`/`subscribeTopics` entry carries `topic`, `qos` as integer, and `retain` as boolean) plus a `qosCommon` integer at the configuration level [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.publishTopics` / `.subscribeTopics` and `properties.configuration.properties.qosCommon`]. There is no per-operation QoS binding for `set_config` itself — for that axis the schema does not specify a value.

Example endpoint (CTRL, requestId `1234`): the request example configures `tenantId: "zebra"` and supplies literal MDM topics with their per-topic qos/retain settings — publish `MDM/clients/resp` qos 1 retain false, `MDM/clients/event` qos 1 retain false, `MDM/clients/rfid` qos 0 retain true, and subscribe `MDM/clients/cmnd` qos 0 retain false [verified-from-schema: commands/dev_mgmt/set_config.json `examples` (requestId `1234`) `configData.epConfig.configuration.mqttParams.publishTopics`/`subscribeTopics`]. The `mqttParams.publishTopics` array "Supports up to 3 publish topics" and `subscribeTopics` "Supports up to 1 subscribe topic" [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.publishTopics.description` / `.subscribeTopics.description`].

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `set_config` | Specifies the operation being performed, in this case, setting the reader configuration. [verified-from-schema: commands/dev_mgmt/set_config.json `properties.command`, `required`] |
| requestId | root | string | Required | example `abc123` (examples also use short strings such as `209543`, `1233`, `1234`, `5678`) | A unique identifier for the request, allowing tracking and debugging of the operation. [verified-from-schema: commands/dev_mgmt/set_config.json `properties.requestId`, `examples`] |
| configData | root | object | Optional (not in `required`) | members: `applyAfterReboot`, `wifiConfig`, `epConfig` | Specifies the complete device configuration to be applied, including WiFi and endpoint settings. [verified-from-schema: commands/dev_mgmt/set_config.json `properties.configData`; refrence/payload/setCfgPayload.yaml `description`] |
| configData.applyAfterReboot | configData | boolean | Optional | true \| false | If set to true, configuration changes will be applied after reboot. [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.applyAfterReboot`] |
| configData.wifiConfig | configData | object | Optional | see cfgWifiPayload.yaml | WiFi profile configuration including network credentials and security settings. [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.wifiConfig`; refrence/payload/cfgWifiPayload.yaml] |
| configData.wifiConfig.operation | wifiConfig | string | Required (within wifiConfig) | `CREATE` \| `MODIFY` | The operation to perform on the WiFi configuration. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.operation.enum`, `required`] |
| configData.wifiConfig.interfaceName | wifiConfig | string | Required (within wifiConfig) | — | The name of the network interface for which the WiFi configuration is being set. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.interfaceName`, `required`] |
| configData.wifiConfig.enableInterface | wifiConfig | boolean | Required (within wifiConfig) | true \| false | Whether the network interface should be enabled or disabled. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.enableInterface`, `required`] |
| configData.wifiConfig.accessPoint | wifiConfig | object | Required (within wifiConfig) | requires `connect`, `isPreferred`, `essid`, `enableSecurity` | Access point connection settings including credentials, security type, and IP configuration. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint`, `required`] |
| ...accessPoint.essid | accessPoint | string | Required | example `ZWireless` | The ESSID (network name) of the access point. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.essid`] |
| ...accessPoint.connect | accessPoint | boolean | Required | true \| false | If true, disconnects the current profile and connects to this one; if false, just saves the profile. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.connect`] |
| ...accessPoint.isPreferred | accessPoint | boolean | Required | true \| false | Marks this profile as the preferred one to always connect to when available. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.isPreferred`] |
| ...accessPoint.enableSecurity | accessPoint | boolean | Required | true \| false | Indicates whether security is enabled for this access point. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.enableSecurity`] |
| ...accessPoint.autoConn | accessPoint | boolean | Optional | true \| false | Reserved for backward compatibility; will be removed in the future. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.autoConn`] |
| ...accessPoint.security.securityType | security | string | Required (within security) | `WPA2Personal` \| `WPA3Personal` \| `WPA2Enterprise` \| `WPA3Enterprise` | The security type specifying the authentication and encryption method. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `properties.accessPoint.properties.security.properties.securityType.enum`] |
| configData.epConfig | configData | object | Optional | see cfgEndpointPayload.yaml; requires `operation`, `configuration` | Endpoint configuration including protocol, security, and MQTT parameters. [verified-from-schema: refrence/payload/setCfgPayload.yaml `properties.epConfig`; refrence/payload/cfgEndpointPayload.yaml `required`] |
| configData.epConfig.operation | epConfig | string | Required (within epConfig) | `add` \| `delete` \| `update` | Type of operation to perform: adding, deleting, or updating a configuration. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.operation.enum`] |
| configData.epConfig.configuration | epConfig | object | Required (within epConfig) | requires `endpointName`, `epType`, `protocol`, `activate`, `url`, `verificationType`, `port`, `qosCommon`, `tenantId` | The endpoint configuration parameters including connection, protocol, and security settings. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration`, `.required`] |
| ...configuration.epType | configuration | string | Required | `MGMT` \| `MGMT_EVT` \| `CTRL` \| `DATA1` \| `DATA2` \| `SOTI` \| `MDM` | Specifies the type of the endpoint. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.epType.enum`] |
| ...configuration.protocol | configuration | string | Required | `MQTT` \| `MQTT_TLS` | Communication protocol used by the endpoint. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.protocol.enum`] |
| ...configuration.verificationType | configuration | string | Required | `NONE` \| `VERIFY_PEER` \| `VERIFY_HOST` \| `VERIFY_HOST_PEER` | Type of verification used for establishing secure connections. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.verificationType.enum`] |
| ...configuration.port | configuration | integer | Required | example `1883` | Port number used for communication. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.port`] |
| ...configuration.qosCommon | configuration | integer | Required | example `1` | Defines the QoS level for the endpoint. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.qosCommon`] |
| ...configuration.tenantId | configuration | string | Required | example `ZEBRA` | Identifies the tenantID associated with the configuration. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.tenantId`] |
| ...configuration.mqttParams | configuration | object | Optional | members: `keepAlive` (max 65535), `cleanSession`, `reconnectDelayMin`, `reconnectDelayMax`, `clientId`, `username`, `password`, `publishTopics` (up to 3), `subscribeTopics` (up to 1) | MQTT-specific connection parameters including keep-alive, session, and topic configuration. (MQTT broker credentials `username`/`password` live here — there is no per-message auth block.) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams`] |
| ...mqttParams.publishTopics[].{topic,qos,retain} | mqttParams | array of objects | Optional | each item requires `topic` (string), `qos` (integer), `retain` (boolean); array supports up to 3 | Publish topic entries with QoS and retain settings. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.publishTopics`] |
| ...mqttParams.subscribeTopics[].{topic,qos,retain} | mqttParams | array of objects | Optional | each item requires `topic` (string), `qos` (integer), `retain` (boolean); array supports up to 1 | Subscribe topic entries with QoS and retain settings. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.subscribeTopics`] |

### JSON Request Example
```json
{
  "command": "set_config",
  "requestId": "209543",
  "configData": {
    "wifiConfig": {
      "operation": "CREATE",
      "accessPoint": {
        "essid": "TEST_5G",
        "connect": true,
        "autoConn": true,
        "enableSecurity": true,
        "isPreferred": false,
        "security": {
          "securityType": "WPA2Personal",
          "securityDetails": {
            "WPA2Personal": {
              "password": "nov211985"
            }
          }
        }
      }
    }
  }
}
```
[verified-from-schema: commands/dev_mgmt/set_config.json `examples[0]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `set_config` | The command that was executed to set the device configuration. [verified-from-schema: response/dev_mgmt/set_config.json `properties.command`, `required`] |
| requestId | root | string | Required | example `abc123` (examples also use short strings such as `209543`, `1233`, `1234`, `5678`) | The unique identifier of the original request. [verified-from-schema: response/dev_mgmt/set_config.json `properties.requestId`, `examples`] |
| apiVersion | root | string | Required | `V1.0` \| `V1.1` (example `V1.1`) | API version of the response. [verified-from-schema: response/dev_mgmt/set_config.json `properties.apiVersion.enum`, `required`] |
| cfgResponse | root | object | Optional (not in `required`) | members: `ethConfig`, `wifiConfigResp`, `epConfig`, `wifiProfiles` | Contains the echoed/applied configuration after changes; in examples it mirrors the submitted `wifiConfig`/`epConfig` (secrets masked as `XXXXXXXX`). [verified-from-schema: response/dev_mgmt/set_config.json `properties.cfgResponse`; refrence/response/setConfigResponse.yaml] |
| response | root | object | Required | requires `code`, `description` | Standard response object containing the status code and description of the operation result. [verified-from-schema: response/dev_mgmt/set_config.json `properties.response`, `required`; refrence/response/response.yaml] |
| response.code | response | integer | Required | integer 0–30 (full code→meaning table in response.yaml) | Response status code. [verified-from-schema: refrence/response/response.yaml `properties.code` (`minimum: 0`, `maximum: 30`)] |
| response.description | response | string | Required | example `Success` | Response description in detail. [verified-from-schema: refrence/response/response.yaml `properties.description`] |

### JSON Response Example
```json
{
  "command": "set_config",
  "requestId": "209543",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/dev_mgmt/set_config.json `examples` (`response` block), `properties`]

## 5. Associated Error Codes

The subset below is a hypothesis for the codes most plausibly relevant to `set_config` (configuration apply / payload validation / endpoint creation). All codes and their meanings are drawn verbatim from the 0–30 table [verified-from-schema: refrence/response/response.yaml `properties.code.description`]. Representability of each code in the response shape is [verified-via-local-mock: routing/shape only]. The specific code↔trigger binding for `set_config` is [firmware-only-unknown] — response.yaml lists meanings but does not bind any code to this command verbatim; the "Triggering Condition" column restates the table's meaning, not a documented trigger for this command.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Operation completed successfully (table meaning "Success"). Code↔trigger binding for set_config: [firmware-only-unknown]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "set_config", "requestId": "209543", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Table meaning "Invalid payload" — hypothesized when the submitted `configData` is malformed or fails validation. Code↔trigger binding: [firmware-only-unknown]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "set_config", "requestId": "209543", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 10 | Error | Configuration already exists | Table meaning "Configuration already exists" — hypothesized on an `epConfig.operation: add` (or `wifiConfig` create) for an endpoint/profile that already exists. Code↔trigger binding: [firmware-only-unknown]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "set_config", "requestId": "209543", "apiVersion": "V1.1", "response": { "code": 10, "description": "Configuration already exists" } }` |
| 23 | Error | Invalid enum value | Table meaning "Invalid enum value" — hypothesized when an enum-constrained field (e.g. `epType`, `protocol`, `verificationType`, `wifiConfig.operation`, `securityType`) is set to an unsupported value. Code↔trigger binding: [firmware-only-unknown]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "set_config", "requestId": "209543", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |
| 25 | Error | Max 3 publish topics exceeded | Table meaning "Max 3 publish topics exceeded" — hypothesized when `epConfig.configuration.mqttParams.publishTopics` contains more than 3 entries. Code↔trigger binding: [firmware-only-unknown]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "set_config", "requestId": "209543", "apiVersion": "V1.1", "response": { "code": 25, "description": "Max 3 publish topics exceeded" } }` |
| 26 | Error | Max 1 subscribe topic exceeded | Table meaning "Max 1 subscribe topic exceeded" — hypothesized when `epConfig.configuration.mqttParams.subscribeTopics` contains more than 1 entry. Code↔trigger binding: [firmware-only-unknown]. Representability [verified-via-local-mock: routing/shape only]. | `{ "command": "set_config", "requestId": "209543", "apiVersion": "V1.1", "response": { "code": 26, "description": "Max 1 subscribe topic exceeded" } }` |

> Code names and meanings are quoted from refrence/response/response.yaml [verified-from-schema: refrence/response/response.yaml `properties.code.description`]: 0 = Success, 2 = Invalid payload, 10 = Configuration already exists, 23 = Invalid enum value, 25 = Max 3 publish topics exceeded, 26 = Max 1 subscribe topic exceeded. The full table spans codes 0–30; only this plausibly-relevant subset is shown.

---

# Command: set_os

## 1. Intent & Objective

The `set_os` command sets a new firmware image and initiates a firmware update on the handheld RFID reader (RFD40 / RFD90). The command literal is `set_os` and the schema describes it as "Command issued to set new firmware & initiate firmware update" [verified-from-schema: commands/dev_mgmt/set_os.json `description`]. The operation is further characterized in the response schema as "set_os" being "The command that was executed to set the operating system configuration" [verified-from-schema: response/dev_mgmt/set_os.json `properties.command.description`].

An application issues `set_os` when it needs to push a firmware/OS build to a reader for an over-the-air update. The reader is pointed at a source URL from which it downloads the OS update payload; the schema constrains this to a valid URI ("The URL where the OS update can be downloaded. Must be a valid URI.") [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.url`]. In a local deployment the OS build is typically staged on a file server that the URL resolves to, and the `set_os` request itself is delivered over MQTT [verified-from-grounding: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/configure-http-file-server-for-set-os-zebra-iot-connector-documentation.md]. The exact firmware image set consumed from that source is [firmware-only-unknown].

The named payload object is `OSUpdateDetails`, described as "Defines the firmware update details including the source URL and authentication parameters." [verified-from-schema: refrence/payload/osUpdatePayload.yaml `description`]. Within it, the reader can be told how to authenticate to and verify the firmware source. `authenticationType` selects whether authentication is needed for the source URL: `NONE` ("No authentication is needed") or `CERTIFICATE` ("A valid inline certificate or preinstalled certificate is required") [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.authenticationType`]. `verificationType` controls TLS verification behavior during the connection, with the enum `NONE` / `VERIFY_PEER` / `VERIFY_HOST` / `VERIFY_HOST_PEER` [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.verificationType`]. The CA certificate can be supplied either inline as PEM content via `caCertificateFileContent` or as a file path / preinstalled reference via `caCertificateFile` [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.caCertificateFileContent`, `properties.caCertificateFile`].

The concrete reader-side behaviors triggered by `set_os` (download mechanics, flash-write sequencing, reboot timing, and the exact firmware image set consumed) beyond what the schema states are [firmware-only-unknown].

Architecturally, this is a device-management operation. For this documentation item the command is routed over an MGMT-class management endpoint; the MDM endpoint example uses the literal topic family `MDM/clients/cmnd` (request) and `MDM/clients/resp` (response) with `tenantId` `ZEBRA` and no tenant prefix on the topic [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM endpoint example, lines 141-188]. The `epType` enum that defines the endpoint class includes `MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, `SOTI`, and `MDM` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.epType.enum`]. Routing/shape of `set_os` over this topic family is [verified-via-local-mock: routing/shape only].

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | {EP_TYPE}/clients/cmnd — example instance `MDM/clients/cmnd` | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `subscribeTopics[0].qos`, line 181] | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `subscribeTopics[0].retain`, line 182] |
| Subscribe (Response) | {EP_TYPE}/clients/resp — example instance `MDM/clients/resp` | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `publishTopics[0].qos`, line 165] | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `publishTopics[0].retain`, line 166] |

Notes:
- Topics are configured per endpoint. QoS and Retain are per-topic values defined inside `mqttParams.publishTopics[]` and `mqttParams.subscribeTopics[]` (each entry carries `topic`, `qos:int`, `retain:bool` as required fields), plus an endpoint-level `qosCommon:int` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams` and `properties.configuration.properties.qosCommon`].
- The QoS/Retain shown above are the values from the MDM endpoint example (`tenantId` `ZEBRA`, no tenant prefix); from the reader's perspective `cmnd` is a subscribe topic and `resp`/`event`/`rfid` are publish topics [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example, lines 141-188].
- There is no per-operation QoS binding for `set_os`: the QoS axis is not specified per-operation in schema; it is bound only per-topic at endpoint-configuration time.
- The topic family pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `publishTopics`/`subscribeTopics` topic examples].

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `set_os` | "Specifies the operation being performed, in this case, setting the reader operating system." [verified-from-schema: commands/dev_mgmt/set_os.json `properties.command`] |
| requestId | root | string | Required | example `abc123` | "A unique identifier for the request, allowing tracking and debugging of the operation." Examples use short strings such as `abc123`/`abc124`/`abc125`. [verified-from-schema: commands/dev_mgmt/set_os.json `properties.requestId` and `examples`] |
| OSUpdateDetails | root | object | Required (present in all examples; `command` and `requestId` are the only entries in the schema `required` array) | $ref → refrence/payload/osUpdatePayload.yaml | "Defines the firmware update details including the source URL and authentication parameters." [verified-from-schema: commands/dev_mgmt/set_os.json `properties.OSUpdateDetails`; refrence/payload/osUpdatePayload.yaml `description`] |
| OSUpdateDetails.url | OSUpdateDetails | string (format: uri) | Required | must be a valid URI; example `https://192.168.29.39:8000/Build-3.10.27/Firmware` | "The URL where the OS update can be downloaded. Must be a valid URI." [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.url`, `required`] |
| OSUpdateDetails.authenticationType | OSUpdateDetails | string | Required | enum: `NONE`, `CERTIFICATE` | "Specifies the type of authentication required for accessing the URL. NONE - No authentication is needed. CERTIFICATE - A valid inline certificate or preinstalled certificate is required." [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.authenticationType`, `required`] |
| OSUpdateDetails.verificationType | OSUpdateDetails | string | Optional | enum: `NONE`, `VERIFY_PEER`, `VERIFY_HOST`, `VERIFY_HOST_PEER` | "Specifies the type of verification to perform during the connection." (NONE = no verification; VERIFY_PEER = verify peer certificate; VERIFY_HOST = verify host certificate; VERIFY_HOST_PEER = verify both) [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.verificationType`] |
| OSUpdateDetails.caCertificateFileContent | OSUpdateDetails | string | Optional | PEM content; example `-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----` | "The content of the CA certificate in PEM format, required for certificate-based authentication." [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.caCertificateFileContent`] |
| OSUpdateDetails.caCertificateFile | OSUpdateDetails | string | Optional | example `/apps/ca.crt` | "The file path to the CA certificate, required for certificate-based authentication." [verified-from-schema: refrence/payload/osUpdatePayload.yaml `properties.caCertificateFile`] |

No per-message auth block exists; there is no `auth.user` / `auth.password` field. MQTT broker credentials, when required, live in the endpoint `mqttParams` (`username` / `password`) configured via `config_endpoint` / `set_config`, not in this command [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `properties.configuration.properties.mqttParams.properties.username`/`password`].

### JSON Request Example
```json
{
  "command": "set_os",
  "requestId": "abc124",
  "OSUpdateDetails": {
    "url": "https://192.168.29.39:8000/Build-3.10.27/Firmware/PAAFKS00-013-R01E0.DAT",
    "authenticationType": "CERTIFICATE",
    "verificationType": "VERIFY_PEER",
    "caCertificateFile": "filestore_ca_cert"
  }
}
```
[verified-from-schema: commands/dev_mgmt/set_os.json `examples[1]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| command | root | string | Required | example `set_os` | "The command that was executed to set the operating system configuration." [verified-from-schema: response/dev_mgmt/set_os.json `properties.command`, `required`] |
| requestId | root | string | Required | example `abc123` | "The unique identifier of the original request." (examples use short strings such as `abc123` / `18996`) [verified-from-schema: response/dev_mgmt/set_os.json `properties.requestId`, `examples`, `required`] |
| apiVersion | root | string | Required | enum: `V1.0`, `V1.1`; example `V1.1` | API version of the response. [verified-from-schema: response/dev_mgmt/set_os.json `properties.apiVersion`, `required`] |
| response | root | object | Optional (not listed in `required`) | $ref → refrence/response/response.yaml | "Standard response object containing the status code and description of the operation result." [verified-from-schema: response/dev_mgmt/set_os.json `properties.response`; refrence/response/response.yaml `description`] |
| response.code | response | integer | Required (within response object) | minimum 0, maximum 30; example `0` | Response code; see the 0-30 code→meaning table. [verified-from-schema: refrence/response/response.yaml `properties.code`, `required`] |
| response.description | response | string | Required (within response object) | example `Success` | "response description in detail" [verified-from-schema: refrence/response/response.yaml `properties.description`, `required`] |

### JSON Response Example
```json
{
  "command": "set_os",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
The response schema's own example shows an accepted-but-async pattern: `{ "command": "set_os", "requestId": "18996", "apiVersion": "V1.1", "response": { "code": 1, "description": "Command payload is accepted" } }` [verified-from-schema: response/dev_mgmt/set_os.json `examples[0]`].

## 5. Associated Error Codes

The following is the hypothesized subset of codes for `set_os`, drawn verbatim from the 0-30 table in refrence/response/response.yaml. Representability of these codes over the response shape is [verified-via-local-mock: routing/shape only]. The code↔trigger binding (which specific reader condition emits which code for this command) is [firmware-only-unknown] — response.yaml states code meanings but does not bind them to `set_os` triggers verbatim. The "Triggering Condition" column repeats the verbatim meaning from the table and is therefore the code's meaning, not a verified per-command cause.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | "Success" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | "Invalid payload" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 4 | Error | Firmware update in progress | "Firmware update in progress" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 4, "description": "Firmware update in progress" } }` |
| 8 | Error | Insufficient flash size | "Insufficient flash size" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 8, "description": "Insufficient flash size" } }` |
| 13 | Error | Firmware update Failed | "Firmware update Failed" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 13, "description": "Firmware update Failed" } }` |
| 14 | Error | Battery is low, Cannot update firmware | "Battery is low, Cannot update firmware" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 14, "description": "Battery is low, Cannot update firmware" } }` |
| 29 | Error | Url missing for HTTP source | "Url missing for HTTP source" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 29, "description": "Url missing for HTTP source" } }` |
| 30 | Error | Certificate content missing for direct source | "Certificate content missing for direct source" [verified-from-schema: refrence/response/response.yaml code table]. Per-command binding [firmware-only-unknown]. | `{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 30, "description": "Certificate content missing for direct source" } }` |

---

# Command: set_wifi

## 1. Intent & Objective

The `set_wifi` command provisions or modifies a Wi-Fi network profile on an RFD40/RFD90 handheld RFID reader (sled) over MQTT. Per the command schema, the API "is used to set wifi configuration. It currently supports IPv4 addressing with DHCP-based IP assignment only, static IP configuration and IPv6 support is not available in the current API version." [verified-from-schema: commands/dev_mgmt/set_wifi.json `description`]

What it does, grounded in the payload schema (`wifiConfig`, [verified-from-schema: refrence/payload/cfgWifiPayload.yaml]):
- Targets a named network interface via `interfaceName` and enables/disables that interface via `enableInterface`. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `interfaceName`, `enableInterface`]
- Performs one of two operations selected by `operation`: `CREATE` (create a new configuration) or `MODIFY` (modify an existing one). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `operation.enum`]
- Defines an `accessPoint` block carrying the ESSID (network name), whether to connect now or just save the profile (`connect`), whether to mark it preferred (`isPreferred`), and the security type plus credentials (`security`). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint`]
- Supports IPv4 network configuration (`ipv4Configuration`: `ipAddress`, `subnetMask`, `gateway`, `enableDhcp`, `dnsServer`, `domainName`). Note the schema description above states only DHCP-based IPv4 assignment is supported in the current API version. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.ipv4Configuration`]

When an application uses it: an MDM/MGMT host issues `set_wifi` to remotely add a wireless network profile to the sled, switch the active connection, mark a preferred SSID, or update credentials/security on an existing profile — without physically touching the device.

Profile behavior, grounded only in the payload schema descriptions: per the schema, `connect` "indicates whether to connect to this profile. If true, disconnects the currently connected profile and connects to the specified one; if false, just saves the profile," and `isPreferred` "marks this profile as the preferred one to always connect to when available." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.connect`, `accessPoint.isPreferred`] The schema enumerates the security types `WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise`. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `security.securityType.enum`] Any broader on-device Wi-Fi configuration surface (e.g. desktop-tool fields, certificate-management UI, or a recommended security posture) is not described in these source schema files and is [firmware-only-unknown].

Architectural context: this is a device-management (MGMT) operation. It is delivered over the management endpoint. In this run the live management endpoint is an `MDM` endpoint (live MDM / MDM_EP) configured with literal topics `MDM/clients/cmnd|resp|event` and `tenantId` `ZEBRA`, with no tenant prefix on the topic path. [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example, lines 141-188] Whether and how the firmware reconfigures the radio/supplicant immediately versus on next association is [firmware-only-unknown].

## 2. Topic Mapping

Topics are configured per endpoint in `cfgEndpointPayload.mqttParams` (`publishTopics`, `subscribeTopics`), where each entry carries its own `qos` (int) and `retain` (bool); the endpoint also has a `qosCommon` int. There is no per-operation QoS binding for `set_wifi` in any schema. The pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`. The values below are the live MDM endpoint instance.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `MDM/clients/cmnd` (`{EP_TYPE}/clients/cmnd`) | 0 [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `subscribeTopics[0].qos`]; not specified per-operation in schema | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `subscribeTopics[0].retain`] |
| Subscribe (Response) | `MDM/clients/resp` (`{EP_TYPE}/clients/resp`) | 1 [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `publishTopics[0].qos`]; not specified per-operation in schema | false [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM `publishTopics[0].retain`] |

Notes:
- The request is published to the device's subscribe topic (`.../clients/cmnd`); the device publishes its response to `.../clients/resp`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `subscribeTopics.items.topic` example `MGMT/clients/cmnd`, `publishTopics.items.topic` example `MGMT/clients/resp`]
- Topics are configurable per endpoint; the `MDM/clients/*` literals and their qos/retain shown above are the live MDM instance from the config example, and the live MDM endpoint uses `tenantId` `ZEBRA` with no tenant prefix. [verified-from-schema: commands/dev_mgmt/config_endpoint.json MDM example, lines 141-188]
- QoS/Retain are per-topic in `mqttParams` (plus endpoint-level `qosCommon`); QoS is not specified per-operation in schema. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `qosCommon`, `publishTopics.items.qos/retain`, `subscribeTopics.items.qos/retain`]
- Routing/shape of request-on-cmnd to response-on-resp confirmed only in routing/shape terms. [verified-via-local-mock: routing/shape only]

## 3. Request Payload Breakdown

The `wifiConfig` payload key is a `$ref` to `refrence/payload/cfgWifiPayload.yaml`. [verified-from-schema: commands/dev_mgmt/set_wifi.json `properties.wifiConfig.$ref`] There is no auth/user/password envelope field; MQTT credentials live in endpoint `mqttParams` (configured via `config_endpoint`/`set_config`, reference only).

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `set_wifi` | "Specifies the operation being performed, in this case, setting the wifi configuration." [verified-from-schema: commands/dev_mgmt/set_wifi.json `properties.command`, `required`] |
| `requestId` | root | string | Required | example `abc123`; documented as a unique identifier. The schema examples use short strings (e.g. `abc123`) and one UUID-style value (`aa483090-c0d0-4ab3-b7e5-233586918a13`); the schema states no fixed length/format. | "A unique identifier for the request, allowing tracking and debugging of the operation." [verified-from-schema: commands/dev_mgmt/set_wifi.json `properties.requestId`, `examples`, `required`] |
| `wifiConfig` | root | object | Optional (not listed in root `required`) | `$ref` cfgWifiPayload.yaml | WiFi profile configuration (network credentials and security). [verified-from-schema: commands/dev_mgmt/set_wifi.json `properties.wifiConfig`; refrence/payload/cfgWifiPayload.yaml `description`] |
| `wifiConfig.interfaceName` | wifiConfig | string | Required (in wifiConfig) | example `wlan0` (from command examples) | "The name of the network interface for which the Wi-Fi configuration is being set." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `interfaceName`, `required`] |
| `wifiConfig.enableInterface` | wifiConfig | boolean | Required (in wifiConfig) | true/false | "Specifies whether the network interface should be enabled or disabled." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `enableInterface`, `required`] |
| `wifiConfig.operation` | wifiConfig | string | Required (in wifiConfig) | enum: `CREATE`, `MODIFY` | "The operation to be performed on the Wi-Fi configuration." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `operation`, `required`] |
| `wifiConfig.accessPoint` | wifiConfig | object | Required (in wifiConfig) | — | "Access point connection settings including credentials, security type, and IP configuration." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint`, `required`] |
| `accessPoint.connect` | accessPoint | boolean | Required (in accessPoint) | true/false | If true, disconnects the current profile and connects to this one; if false, just saves the profile. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.connect`, `accessPoint.required`] |
| `accessPoint.isPreferred` | accessPoint | boolean | Required (in accessPoint) | true/false | "Marks this profile as the preferred one to always connect to when available." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.isPreferred`, `accessPoint.required`] |
| `accessPoint.autoConn` | accessPoint | boolean | Optional | true/false | "Reserved for backward compatibility. It will be removed in the future." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.autoConn`] |
| `accessPoint.essid` | accessPoint | string | Required (in accessPoint) | example `ZWireless` | "The ESSID (network name) of the access point." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.essid`, `accessPoint.required`] |
| `accessPoint.enableSecurity` | accessPoint | boolean | Required (in accessPoint) | true/false | "Indicates whether security is enabled for this access point." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.enableSecurity`, `accessPoint.required`] |
| `accessPoint.ipv4Configuration` | accessPoint | object | Optional | fields: `ipAddress`, `subnetMask`, `gateway`, `enableDhcp`, `dnsServer`, `domainName` (all IPv4-format strings except `enableDhcp` boolean and `domainName` plain string). Schema description: current API supports DHCP-based IPv4 only. | "IPv4 network configuration for the WiFi interface." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.ipv4Configuration`] |
| `accessPoint.security` | accessPoint | object | Optional (object); `securityType` + `securityDetails` required when present | — | "Security type and credential details for the access point." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `accessPoint.security`, `security.required`] |
| `security.securityType` | security | string | Required (within security) | enum: `WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise` | "The security type for the access point." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `security.securityType`] |
| `security.securityDetails` | security | object | Required (within security) | keyed by security type: `WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise` | "Security credentials specific to the chosen security type." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `security.securityDetails`] |
| `securityDetails.WPA3Personal` | securityDetails | object | Optional | `password` (string, required) | WPA3-Personal security credentials. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `securityDetails` WPA3-Personal `password`/`required`] |
| `securityDetails.WPA2Enterprise` | securityDetails | object | Optional | `authentication` enum `tls`/`ttls`/`peap` (required); `innerAuthentication` enum `none`/`tls`/`mschapv2`; `identity`; `anonymousIdentity`; `password`; `passphrase`; `certificate[]` (key enum `ca_cert`/`client_key`/`client_cert`/`cert_key_password`, value string, maxProperties 4); `protocol` enum `WPA2_Enterprise_CCMP` | WPA2-Enterprise security configuration with optional certificate parameters. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `securityDetails.WPA2Enterprise`] |
| `securityDetails.WPA3Enterprise` | securityDetails | object | Optional | `authentication` enum `tls`/`ttls`/`peap` (required); `innerAuthentication` enum `none`/`tls`/`mschapv2`; `identity`; `anonymousIdentity`; `password`; `passphrase`; `certificate[]` (key enum as above, maxProperties 4); `protocol` enum `WPA3_Enterprise_CCMP`/`WPA3_Enterprise_CCMP_256`/`WPA3_Enterprise_GCMP_128`/`WPA3_Enterprise_GCMP_256_SHA256`/`WPA3_Enterprise_GCMP_256_SUITEB_192` | WPA3-Enterprise security configuration with optional certificate parameters. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml `securityDetails.WPA3Enterprise`] |

Note on `WPA2Personal`: the payload YAML declares a `WPA2Personal` object under `securityDetails` but its inline `properties`/`description`/`required` collapse onto the WPA3-Personal block (the YAML duplicates `type: object`/`properties:` keys). The command-example usage shows `securityDetails.WPA2Personal.password` (e.g. `test@123`). The exact required-field set for `WPA2Personal` as distinct from `WPA3Personal` is [firmware-only-unknown]. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml lines 94-105; commands/dev_mgmt/set_wifi.json example lines 22-29]

### JSON Request Example
```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "wifiConfig": {
    "interfaceName": "wlan0",
    "enableInterface": true,
    "operation": "CREATE",
    "accessPoint": {
      "connect": false,
      "isPreferred": false,
      "autoConn": true,
      "essid": "TestAP1",
      "enableSecurity": true,
      "security": {
        "securityType": "WPA2Personal",
        "securityDetails": {
          "WPA2Personal": {
            "password": "test@123"
          }
        }
      }
    }
  }
}
```
[verified-from-schema: commands/dev_mgmt/set_wifi.json `examples[0]`]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `set_wifi` | "The command that was executed to set the WiFi configuration." [verified-from-schema: response/dev_mgmt/set_wifi.json `properties.command`, `required`] |
| `requestId` | root | string | Required | example `abc123` | "The unique identifier of the original request." [verified-from-schema: response/dev_mgmt/set_wifi.json `properties.requestId`, `required`] |
| `apiVersion` | root | string | Required | enum: `V1.0`, `V1.1`; example `V1.1` | API version. [verified-from-schema: response/dev_mgmt/set_wifi.json `properties.apiVersion`, `required`] |
| `response` | root | object | Optional (not in root `required`); contains required `code`+`description` | `$ref` response.yaml | Standard response object with status code and description. [verified-from-schema: response/dev_mgmt/set_wifi.json `properties.response.$ref`; refrence/response/response.yaml `description`] |
| `response.code` | response | integer | Required (within response) | integer 0-30 (minimum 0, maximum 30); see code->meaning table | Response code. [verified-from-schema: refrence/response/response.yaml `code`, `required`] |
| `response.description` | response | string | Required (within response) | example `Success` | "response description in detail." [verified-from-schema: refrence/response/response.yaml `description`, `required`] |

### JSON Response Example
```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```
[verified-from-schema: response/dev_mgmt/set_wifi.json `examples[0]`]

## 5. Associated Error Codes

The codes below are the hypothesized subset for `set_wifi`, drawn verbatim from the full 0-30 table in `refrence/response/response.yaml`. The fact that any of these codes is representable in this command's `response.code` field is [verified-via-local-mock: routing/shape only] (0-30 integer, schema-bounded). The binding of a specific code to a specific `set_wifi` trigger is [firmware-only-unknown] — `response.yaml` lists code meanings but does not state per-command triggering conditions verbatim. The "Status" column is an editorial pass/fail grouping (code 0 = pass; all others = fail) and is itself [firmware-only-unknown] as to firmware semantics.

| Code | Status | Name | Triggering Condition | Error Response Example |
|------|--------|------|----------------------|------------------------|
| 0 | Success | Success | Command succeeded (success case, not an error). [firmware-only-unknown for exact set_wifi success semantics] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }` |
| 2 | Error | Invalid payload | Hypothesized: malformed/invalid `wifiConfig` payload. Binding [firmware-only-unknown]. Meaning "Invalid payload" [verified-from-schema: refrence/response/response.yaml code 2] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 2, "description": "Invalid payload" } }` |
| 15 | Error | WIFI Error - SSID not found | Hypothesized: target ESSID not found. Binding [firmware-only-unknown]. Meaning "WIFI Error - SSID not found" [verified-from-schema: refrence/response/response.yaml code 15] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 15, "description": "WIFI Error - SSID not found" } }` |
| 17 | Error | WIFI Error - SSID missed | Hypothesized: required ESSID omitted. Binding [firmware-only-unknown]. Meaning "WIFI Error - SSID missed" [verified-from-schema: refrence/response/response.yaml code 17] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 17, "description": "WIFI Error - SSID missed" } }` |
| 18 | Error | WIFI Error - SSID already exist | Hypothesized: `CREATE` of an SSID that already exists. Binding [firmware-only-unknown]. Meaning "WIFI Error - SSID already exist" [verified-from-schema: refrence/response/response.yaml code 18] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 18, "description": "WIFI Error - SSID already exist" } }` |
| 19 | Error | WIFI Error - SSID count overflow | Hypothesized: stored profile count limit exceeded. Binding [firmware-only-unknown]. Meaning "WIFI Error - SSID count overflow" [verified-from-schema: refrence/response/response.yaml code 19] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 19, "description": "WIFI Error - SSID count overflow" } }` |
| 20 | Error | Wifi is not supported | Hypothesized: Wi-Fi not supported on this device/interface. Binding [firmware-only-unknown]. Meaning "Wifi is not supported" [verified-from-schema: refrence/response/response.yaml code 20] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 20, "description": "Wifi is not supported" } }` |
| 23 | Error | Invalid enum value | Hypothesized: an enum-constrained field (e.g. `operation`, `securityType`, `authentication`, `protocol`) carries a value outside its allowed set. Binding [firmware-only-unknown]. Meaning "Invalid enum value" [verified-from-schema: refrence/response/response.yaml code 23] | `{ "command": "set_wifi", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 23, "description": "Invalid enum value" } }` |

---

# Event: alerts

> Provenance summary: All field names, types, enums, and examples below are grounded in `events/alerts.json` and the `$ref` chain it pulls in (`refrence/response/alertDetails.yaml` -> `refrence/events/{fwUpdateEvents,fileDownload,tempEvent,networkEvent,batteryAlert,powerEvent}.yaml`). Concept-level statements (enablement toggles, heartbeat interval, MQTT QoS levels) are grounded in the handheld-sled rows of `_meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md`. Run mode for this page = MOCK FALLBACK; no physical device session was proven attached, so nothing here carries an on-device label.
>
> Scope divergence note: The work-item header described this event as "no payload (command+requestId only)". That does not match the schema actually present in the repo. `events/alerts.json` is a live MDM management event with a structured body (`type`, `timestamp`, `state`, `id`, `priority`, `alertDetails`) and has no `command`/`requestId` fields at all (those belong to command/response objects such as `config_events`, not to this event). This page documents the schema as it exists in `events/alerts.json`. [verified-from-schema: events/alerts.json properties + required]

## 1. Triggering Conditions

The `alerts` event is an asynchronous, device-originated management event (epType `MGMT_EVT`). The connector publishes it whenever a monitored subsystem on the RFD40/RFD90 changes state. Each emission carries an `id` naming the subsystem, a `state` describing the transition, a `priority`, and an `alertDetails` block whose populated sub-object depends on `id`. [verified-from-schema: events/alerts.json properties.id / properties.state / properties.priority / properties.alertDetails]

Per the schema, the alert categories that can fire (`id` enum) are `BATTERY`, `FIRMWARE_UPDATE`, `NETWORK_EVENT`, `TEMPERATURE`, and `POWER`. The schema's own top-level description states that several other categories — antenna, temperature exceptions, CPU usage, GPI, and user-app info — are "currently not supported", so do not expect those to emit on handheld even though related enums may appear elsewhere. [verified-from-schema: events/alerts.json description + properties.id.enum]

State semantics that drive a given emission (grounded verbatim in the schema): `SET` indicates an active/asserted alert, `CLEAR` indicates the same alert has been resolved, and `ONESHOT` is a one-time notification with no paired clear. For example, a firmware update in progress is emitted as `state: SET`, whereas a battery status snapshot and network-interface change are emitted as `state: ONESHOT` in the schema examples. [verified-from-schema: events/alerts.json properties.state.enum + examples]

Per-category triggering, grounded in the referenced sub-schemas:

- BATTERY -> `alertDetails.batteryAlert`: emitted on a change in battery `status` (`LOW`, `CRITICAL`, `CHARGING`, `FULL`, `HIGH`), `stateOfHealth`, or `chargePercentage` (0-100). [verified-from-schema: refrence/events/batteryAlert.yaml properties]
- FIRMWARE_UPDATE -> `alertDetails.fwUpdateStatus`: emitted as the firmware update process advances; `updateStatus` moves through `started`, `updating`, `successfull`, `failed`, `skipped` with an `overallProgress` percent and a `stage` description. [verified-from-schema: refrence/events/fwUpdateEvents.yaml properties]
- NETWORK_EVENT -> `alertDetails.networkInfo`: emitted on a network-interface change — Wi-Fi (`wlan0`) or Ethernet (`eth0`) connect/disconnect, link up/down, or address assignment; the Bluetooth remote-device block (`btRemoteDevice`) is also defined. [verified-from-schema: refrence/events/networkEvent.yaml properties]
- TEMPERATURE -> `alertDetails.temperatueInfo`: emitted with temperature readings (`nge`, `pa`, `ambient`). Note the schema top-level description lists temperature among the categories "currently not supported", so although the enum and sub-schema exist, emission is not guaranteed on handheld. [verified-from-schema: events/alerts.json description + refrence/events/tempEvent.yaml] [firmware-only-unknown: actual handheld emission of TEMPERATURE]
- POWER -> `alertDetails.powerEvent`: emitted on a power-source/power-mode change. The example shows `powerSource: BATTERY`, `powerMode: ACTIVE`. (The `powerEvent` sub-schema is reached via the `alertDetails.powerEvent` key used in the example; note it is not listed among the named `$ref` properties in `alertDetails.yaml` — see Payload Breakdown.) [verified-from-schema: events/alerts.json examples + refrence/events/powerEvent.yaml]

File-download progress is also defined in the `alertDetails` reference set via `downloadInfo` -> `fileDownload.yaml` (firmware/cert download SUCCESS/FAIL), but there is no matching `id` enum value for it in `events/alerts.json`, so its placement in this event is ambiguous. [verified-from-schema: refrence/response/alertDetails.yaml downloadInfo + events/alerts.json properties.id.enum] [firmware-only-unknown: which id value carries downloadInfo]

Enablement and cadence are not properties of this event; they are governed by the `config_events` command (`eventConfiguration` toggles such as `battery`, `firmwareUpdate`, `network`, `power`, `temperature`, `fileDownload`, and the periodic `heartbeat`). The knowledge base confirms that for sleds, event streaming is set up with `config_events` and the periodic heartbeat defaults to a 60-second interval; the `cfgEventPayload.yaml` example uses `interval: 100` seconds. Threshold-style alerts (CPU/RAM/flash/temperature) are configured via `alertConfiguration` thresholds in `cfgAlertPayload.yaml`. None of these knobs appear inside the `alerts` event payload itself. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md (Monitoring Sleds: config_events; Heartbeat Interval 60 Sec default)] [verified-from-schema: refrence/payload/cfgEventPayload.yaml + refrence/payload/cfgAlertPayload.yaml]

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Event) | `MDM/clients/event` (literal for the live MDM endpoint; pattern is `{EP_TYPE}/clients/event`, `EP_TYPE = MGMT_EVT`/`MDM`) | not specified per-operation in schema | not specified per-operation in schema |

Topics are configured per endpoint, not per operation. For the live MDM endpoint the topics are literal `MDM/clients/cmnd` | `MDM/clients/resp` | `MDM/clients/event` with no tenant prefix (tenantId `zebra`). QoS and Retain are set per-topic inside `cfgEndpointPayload.mqttParams.publishTopics[]` (`qos`: integer, `retain`: boolean) plus the endpoint-level `qosCommon` (integer); there is no per-operation QoS/Retain binding for this event — for that axis, treat it as "not specified per-operation in schema". [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml properties.configuration.qosCommon + mqttParams.publishTopics.items.{topic,qos,retain}] The MQTT QoS levels themselves (0 fire-and-forget, 1 at-least-once, 2 exactly-once) are described in the knowledge base. [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md (Best Practices: MQTT QoS 0/1/2)] [verified-via-local-mock: routing/shape only]

## 3. Payload Breakdown

Top-level event fields (fully inline in `events/alerts.json`):

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `type` | string | Required | `EVENT`, `NOTIFICATION`, `ALERT` | Type of alert/message being generated. [verified-from-schema: events/alerts.json properties.type] |
| `timestamp` | string (format: time) | Required | n/a | Time the alert was generated, formatted as a time string. Examples mix `HH:MM:SS` and full ISO-8601. [verified-from-schema: events/alerts.json properties.timestamp + examples] |
| `state` | string | Required | `SET`, `CLEAR`, `ONESHOT` | Alert state: SET = active, CLEAR = resolved, ONESHOT = one-time. [verified-from-schema: events/alerts.json properties.state] |
| `id` | string | Required | `BATTERY`, `FIRMWARE_UPDATE`, `NETWORK_EVENT`, `TEMPERATURE`, `POWER` | Alert type identifier; selects which `alertDetails` sub-object is populated. [verified-from-schema: events/alerts.json properties.id] |
| `priority` | string | Required | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` | Priority level of the alert. [verified-from-schema: events/alerts.json properties.priority] |
| `alertDetails` | object (`anyOf` -> `$ref alertDetails.yaml`) | Optional (not in `required`) | n/a | Type-specific detail block; see sub-objects below. [verified-from-schema: events/alerts.json properties.alertDetails + required] |

`alertDetails` sub-objects (`$ref` chain from `refrence/response/alertDetails.yaml`):

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `alertDetails.fwUpdateStatus` | object -> `fwUpdateEvents.yaml` | Optional | n/a | Firmware update progress block. [verified-from-schema: refrence/response/alertDetails.yaml fwUpdateStatus] |
| &nbsp;&nbsp;`.updateStatus` | string | Required (within block) | `started`, `updating`, `successfull`, `failed`, `skipped` | Current firmware update status. [verified-from-schema: refrence/events/fwUpdateEvents.yaml] |
| &nbsp;&nbsp;`.overallProgress` | number | Required (within block) | n/a | Percent of update completed (example `20`). [verified-from-schema: refrence/events/fwUpdateEvents.yaml] |
| &nbsp;&nbsp;`.stage` | string | Required (within block) | n/a | Individual image update step (example `updating scanner fw`). [verified-from-schema: refrence/events/fwUpdateEvents.yaml] |
| `alertDetails.downloadInfo` | object -> `fileDownload.yaml` | Optional | n/a | File download status block. [verified-from-schema: refrence/response/alertDetails.yaml downloadInfo] |
| &nbsp;&nbsp;`.fileType` | string | Required (within block) | `FILE_TYPE_FW`, `FILE_TYPE_CERT` | Type of file being downloaded. [verified-from-schema: refrence/events/fileDownload.yaml] |
| &nbsp;&nbsp;`.fileName` | string | Required (within block) | n/a | Name of the file being downloaded. [verified-from-schema: refrence/events/fileDownload.yaml] |
| &nbsp;&nbsp;`.status` | string | Required (within block) | `DOWNLOAD SUCCESS`, `DOWNLOAD FAIL`, `SAVE FAIL`, `SAVE SUCCESS` | Download/save operation status. [verified-from-schema: refrence/events/fileDownload.yaml] |
| `alertDetails.temperatueInfo` | object -> `tempEvent.yaml` | Optional | n/a | Temperature readings block (note: TEMPERATURE listed as "currently not supported"). [verified-from-schema: refrence/response/alertDetails.yaml temperatueInfo] |
| &nbsp;&nbsp;`.nge` | number | Required (within block) | n/a | Next Generation Event numeric value. [verified-from-schema: refrence/events/tempEvent.yaml] |
| &nbsp;&nbsp;`.pa` | number | Required (within block) | n/a | PA numeric value. [verified-from-schema: refrence/events/tempEvent.yaml] |
| &nbsp;&nbsp;`.ambient` | number | Required (within block) | n/a | Ambient temperature numeric value. [verified-from-schema: refrence/events/tempEvent.yaml] |
| `alertDetails.networkInfo` | object -> `networkEvent.yaml` | Optional | n/a | Network interface status block. [verified-from-schema: refrence/response/alertDetails.yaml networkInfo] |
| &nbsp;&nbsp;`.networkInterface` | object | Required (within block) | n/a | Container for `ethStatus[]` / `wifiStatus[]`. [verified-from-schema: refrence/events/networkEvent.yaml required] |
| &nbsp;&nbsp;`.networkInterface.ethStatus[]` | array of object | Optional | item `status`: `CONNECTED`/`DISCONNECTED`; `linkStatus`: `UP`/`DOWN` | Per-Ethernet-interface status (`interface`, `status`, `linkStatus`, `linkSpeed`, `ipV4Address`, `ipV6Address`). [verified-from-schema: refrence/events/networkEvent.yaml] |
| &nbsp;&nbsp;`.networkInterface.wifiStatus[]` | array of object | Optional | item `status`: `CONNECTED`/`DISCONNECTED` | Per-Wi-Fi-interface status (`interface`, `status`, `ssid`, `ipV4Address`, `ipV6Address`). [verified-from-schema: refrence/events/networkEvent.yaml] |
| &nbsp;&nbsp;`.btRemoteDevice` | object | Optional | n/a | Bluetooth remote device (`deviceName`, `deviceMac`). [verified-from-schema: refrence/events/networkEvent.yaml] |
| `alertDetails.batteryAlert` | object -> `batteryAlert.yaml` | Optional | n/a | Battery alert block. [verified-from-schema: refrence/response/alertDetails.yaml batteryAlert] |
| &nbsp;&nbsp;`.status` | string | Optional | `LOW`, `CRITICAL`, `CHARGING`, `FULL`, `HIGH` | Current battery operational status. [verified-from-schema: refrence/events/batteryAlert.yaml] |
| &nbsp;&nbsp;`.stateOfHealth` | string | Optional | `LOW`, `FULL`, `CRITICAL`, `HIGH`, `CHARGING` | Long-term battery health. [verified-from-schema: refrence/events/batteryAlert.yaml] |
| &nbsp;&nbsp;`.chargePercentage` | integer (max 100) | Optional | n/a | Current charge level percent. [verified-from-schema: refrence/events/batteryAlert.yaml] |
| `alertDetails.powerEvent` | object -> `powerEvent.yaml` | Optional (used in example; not a named property in `alertDetails.yaml`) | n/a | Power source/mode block. [verified-from-schema: events/alerts.json examples + refrence/events/powerEvent.yaml] |
| &nbsp;&nbsp;`.powerSource` | string | Required (within block) | `DC`, `POE`, `POE+`, `BATTERY`, `CRADLE` | Source of power for the device. [verified-from-schema: refrence/events/powerEvent.yaml] |
| &nbsp;&nbsp;`.lldp` | string | Required (within block) | `success`, `failed`, `negotiating` | LLDP negotiation status. [verified-from-schema: refrence/events/powerEvent.yaml] |
| &nbsp;&nbsp;`.powerMode` | string | Required (within block) | `ACTIVE`, `LOWPOWER` | Current power mode. [verified-from-schema: refrence/events/powerEvent.yaml] |

Notes on the schema:
- `alertDetails.yaml` formally names only five keys: `fwUpdateStatus`, `downloadInfo`, `temperatueInfo` (sic), `networkInfo`, `batteryAlert`. The `events/alerts.json` examples additionally use `powerEvent` and `networkInterface` nested under `networkInfo`, so the `powerEvent` placement is example-driven, not declared in `alertDetails.yaml`. [verified-from-schema: refrence/response/alertDetails.yaml properties + events/alerts.json examples]
- There is no per-message `auth` block on this event; MQTT credentials live only in the endpoint's `mqttParams` (`username`/`password`) configured via the endpoint config command, not in the event. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams.username/password]
- This event has no `command`/`requestId` fields. (`requestId` — a 16-hex-digit identifier per the API convention, though command examples use short strings such as `abc123` — applies to command/response objects, not to this event.) [verified-from-schema: events/alerts.json properties; commands/dev_mgmt/config_events.json requestId example "abc123"]

### Error codes
Error codes are not part of this event; this event has no response object. The standard integer code table (0-30) lives in `refrence/response/response.yaml` (e.g., `0` Success, `2` Invalid payload, `4` Firmware update in progress, `13` Firmware update Failed, `14` Battery is low, Cannot update firmware) and is returned by commands, not by management events. Any binding between a specific alert and a specific code is [firmware-only-unknown] unless `response.yaml` states it verbatim (it does not for this event). The representability of any per-command code subset is [verified-via-local-mock: routing/shape only]. [verified-from-schema: refrence/response/response.yaml code table]

### JSON Event Payload Example
```json
{
  "type": "ALERT",
  "timestamp": "2026-04-29T12:33:34.279Z",
  "state": "ONESHOT",
  "id": "BATTERY",
  "priority": "LOW",
  "alertDetails": {
    "batteryAlert": {
      "status": "CHARGING",
      "stateOfHealth": "GOOD",
      "chargePercentage": 100
    }
  }
}
```

> Example fidelity note: the example above is reproduced verbatim from `events/alerts.json`. It contains `stateOfHealth: "GOOD"`, which is NOT in the `batteryAlert.yaml` enum (`LOW`, `FULL`, `CRITICAL`, `HIGH`, `CHARGING`). This is a divergence between the schema example and the referenced enum. [verified-from-schema: events/alerts.json examples vs refrence/events/batteryAlert.yaml stateOfHealth.enum]

Additional schema examples (verbatim from `events/alerts.json`) for the other `id` values — firmware update (`SET`/`CRITICAL`), network Wi-Fi/Ethernet change (`ONESHOT`/`HIGH`), and power (`ONESHOT`/`HIGH`):
```json
{
  "type": "ALERT",
  "timestamp": "2026-04-29T12:33:57.757Z",
  "state": "SET",
  "id": "FIRMWARE_UPDATE",
  "priority": "CRITICAL",
  "alertDetails": {
    "fwUpdateStatus": {
      "updateStatus": "updating",
      "overallProgress": 20,
      "stage": "updating scanner fw"
    }
  }
}
```

---

# Event: alert_short

> Run mode: MOCK FALLBACK. No physical device session was proven attached for this page. Every fact below is grounded in a repository schema, the `_meta` knowledge base, or the local mock (routing/shape only). No claim is `[verified-on-device]`.

`alert_short` is the **compact** variant of the handheld alert family (the verbose sibling is `alerts`). It is an `epType: MGMT_EVT` live management/MDM event, published outbound by the reader on the management event channel. The conceptual docset explicitly distinguishes the two: "`alert_short` (compact) vs `alerts` (verbose)" `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/handheld-rfid-iotc-master-docset/zebra-handheld-rfid-iotc-conceptual-toc.md]`. The schema's own description states it is the "Short form of alerts, does not contain details about the alert. This is mainly meant for SOTI." `[verified-from-schema: events/alert_short.json#/description]`.

## 1. Triggering Conditions

The connector emits an `alert_short` message when a discrete device-side condition transitions and the corresponding event class is enabled. The `id` enum in the schema enumerates the exact conditions that drive emission `[verified-from-schema: events/alert_short.json#/properties/id/enum]`:

- **Battery thresholds** — `BATTERY_LOW_SET`, `BATTERY_LOW_CLEAR`, `BATTERY_CRITICAL_SET`, `BATTERY_FULL`. The `_SET`/`_CLEAR` suffix pattern indicates a threshold being crossed and later released; the example `BATTERY_CRITICAL_SET` carries `priority: CRITICAL`, `description: "battery level is critically low"` `[verified-from-schema: events/alert_short.json#/examples]`.
- **Temperature thresholds** — `TEMPERATURE_HIGH_SET`, `TEMPERATURE_HIGH_CLEAR`, `TEMPERATURE_CRITICAL_SET`, `TEMPERATURE_CRITICAL_CLEAR` `[verified-from-schema: events/alert_short.json#/properties/id/enum]`.
- **Firmware lifecycle** — `FIRMWARE_DOWNLOAD_FAIL`, `FIRMWARE_DOWNLOAD_SUCCESS`, `FIRMWARE_UPDATE_FAIL`, `FIRMWARE_UPDATE_SUCCESS`. Example: `FIRMWARE_DOWNLOAD_SUCCESS`, `priority: LOW`, `description: "firmware download completed successfully"` `[verified-from-schema: events/alert_short.json#/examples]`.
- **Network / interface configuration** — `NETWORK_INTERFACE_CHANGE`, `WIFI_CONFIG_SUCCESS`, `WIFI_CONFIG_FAIL`, `ETH_CONFIG_SUCCESS`, `ETH_CONFIG_FAIL`, and `POWER_SOURCE_UPDATE` `[verified-from-schema: events/alert_short.json#/properties/id/enum]`.
- **Certificate download / install lifecycle** — the large block of `MQTT_*`, `WIFI_*`, and `FILESTORE_*` `*_DOWNLOAD_{SUCCESS,FAIL}` and `*_INSTALL_{SUCCESS,FAIL}` identifiers (root cert, client cert, client key). Example: `MQTT_ROOT_CERT_INSTALL_SUCCESS`, `priority: HIGH`, `description: "MQTT root certificate install success"` `[verified-from-schema: events/alert_short.json#/examples]`.

Enablement and reporting cadence are governed by `config_events`. The `eventConfiguration` toggles (e.g. `battery`, `temperature`, `power`, `network`, `firmwareUpdate`, `fileDownload`) gate which of these conditions are reported, and the numeric `*Threshold` fields (`temperatureThreshold: 55`, etc.) parameterize the `_SET`/`_CLEAR` crossings `[verified-from-schema: commands/dev_mgmt/config_events.json#/examples]`. The knowledge base confirms the Sleds monitoring flow uses `config_events` "to enable interested status notifications" for Alerts and that "a device reboot is required" to apply the changes `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md]` `[verified-from-schema: commands/dev_mgmt/config_events.json#/description]`.

The precise firmware-internal binding between a physical sensor reading and the moment a specific `id` fires (debounce, hysteresis, exact threshold comparison) is **`[firmware-only-unknown]`** — the schema enumerates the identifiers and the threshold inputs, but the device firmware owns the emission logic and it was not observable in this MOCK FALLBACK run. Fixed-reader event semantics are deliberately not imported here.

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Event) | `MDM/clients/event` (live MDM_EP; no tenant prefix) | not specified per-operation in schema (per-topic value lives in `mqttParams.publishTopics[].qos`) | not specified per-operation in schema (per-topic value lives in `mqttParams.publishTopics[].retain`) |

Notes:

- The generic topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`, configured **per endpoint**. For the live MDM endpoint the event topic is the literal `MDM/clients/event` with **no** tenant prefix `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/how-to/connect-a-reader-with-123rfid-desktop.md]` `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/rfd40-rfd90-first-mqtt-connection.md]`. The configured MDM endpoint uses `tenantId: zebra` `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/tutorials/zebra-handheld-rfid-iotc-deployment-guide/get_endpoint_config.md]`.
- QoS and Retain are **per-topic** values defined inside `cfgEndpointPayload.mqttParams.publishTopics[]` (`qos: integer`, `retain: boolean`, both `required`), plus the endpoint-wide `qosCommon: integer` `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/mqttParams/properties/publishTopics]` `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/qosCommon]`. There is **no per-operation QoS binding** for this event in any schema — for that axis the value is "not specified per-operation in schema." MQTT broker credentials likewise live in `mqttParams` (`username`/`password`) configured via the endpoint config; there is no per-message auth block `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml#/properties/configuration/properties/mqttParams]`.
- The literal `MDM/clients/event` routing was exercised for shape/routing only `[verified-via-local-mock: routing/shape only]`.

## 3. Payload Breakdown

The `alert_short` body is **fully inline** in `events/alert_short.json` — there is no `$ref` to chase. All six properties are listed in `required` `[verified-from-schema: events/alert_short.json#/required]`.

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `id` | string | Required | `FIRMWARE_DOWNLOAD_FAIL`, `FIRMWARE_DOWNLOAD_SUCCESS`, `BATTERY_LOW_SET`, `BATTERY_LOW_CLEAR`, `BATTERY_CRITICAL_SET`, `BATTERY_FULL`, `TEMPERATURE_HIGH_SET`, `TEMPERATURE_HIGH_CLEAR`, `TEMPERATURE_CRITICAL_SET`, `TEMPERATURE_CRITICAL_CLEAR`, `NETWORK_INTERFACE_CHANGE`, `FIRMWARE_UPDATE_FAIL`, `FIRMWARE_UPDATE_SUCCESS`, `WIFI_CONFIG_SUCCESS`, `WIFI_CONFIG_FAIL`, `ETH_CONFIG_SUCCESS`, `ETH_CONFIG_FAIL`, `POWER_SOURCE_UPDATE`, `MQTT_INSTALL_CERTIFICATE_SUCCESS`, `MQTT_INSTALL_CERTIFICATE_FAIL`, `MQTT_CLIENT_CERT_DOWNLOAD_FAIL`, `MQTT_CLIENT_CERT_DOWNLOAD_SUCCESS`, `MQTT_CLIENT_KEY_DOWNLOAD_FAIL`, `MQTT_CLIENT_KEY_DOWNLOAD_SUCCESS`, `MQTT_ROOT_CERT_DOWNLOAD_FAIL`, `MQTT_ROOT_CERT_DOWNLOAD_SUCCESS`, `WIFI_INSTALL_CERTIFICATE_SUCCESS`, `WIFI_INSTALL_CERTIFICATE_FAIL`, `WIFI_CLIENT_CERT_DOWNLOAD_FAIL`, `WIFI_CLIENT_CERT_DOWNLOAD_SUCCESS`, `WIFI_CLIENT_KEY_DOWNLOAD_FAIL`, `WIFI_CLIENT_KEY_DOWNLOAD_SUCCESS`, `WIFI_ROOT_CERT_DOWNLOAD_FAIL`, `WIFI_ROOT_CERT_DOWNLOAD_SUCCESS`, `FILESTORE_INSTALL_CERTIFICATE_SUCCESS`, `FILESTORE_INSTALL_CERTIFICATE_FAIL`, `FILESTORE_CLIENT_CERT_DOWNLOAD_FAIL`, `FILESTORE_CLIENT_CERT_DOWNLOAD_SUCCESS`, `FILESTORE_CLIENT_KEY_DOWNLOAD_FAIL`, `FILESTORE_CLIENT_KEY_DOWNLOAD_SUCCESS`, `FILESTORE_ROOT_CERT_DOWNLOAD_FAIL`, `FILESTORE_ROOT_CERT_DOWNLOAD_SUCCESS`, `MQTT_ROOT_CERT_INSTALL_SUCCESS`, `MQTT_ROOT_CERT_INSTALL_FAIL`, `MQTT_CLIENT_CERT_INSTALL_SUCCESS`, `MQTT_CLIENT_CERT_INSTALL_FAIL`, `MQTT_CLIENT_KEY_INSTALL_SUCCESS`, `MQTT_CLIENT_KEY_INSTALL_FAIL`, `WIFI_ROOT_CERT_INSTALL_SUCCESS`, `WIFI_ROOT_CERT_INSTALL_FAIL`, `WIFI_CLIENT_CERT_INSTALL_SUCCESS`, `WIFI_CLIENT_CERT_INSTALL_FAIL`, `WIFI_CLIENT_KEY_INSTALL_SUCCESS`, `WIFI_CLIENT_KEY_INSTALL_FAIL`, `FILESTORE_ROOT_CERT_INSTALL_SUCCESS`, `FILESTORE_ROOT_CERT_INSTALL_FAIL`, `FILESTORE_CLIENT_CERT_INSTALL_SUCCESS`, `FILESTORE_CLIENT_CERT_INSTALL_FAIL`, `FILESTORE_CLIENT_KEY_INSTALL_SUCCESS`, `FILESTORE_CLIENT_KEY_INSTALL_FAIL` | The unique identifier for the alert, representing the specific type of event or notification. `[verified-from-schema: events/alert_short.json#/properties/id]` |
| `timestamp` | string (`format: time`) | Required | (none) | The time when the alert was generated, formatted as a string. Examples mix a bare time `"22:54:25"` with ISO-8601 `"2026-04-17T05:09:13.805Z"` `[verified-from-schema: events/alert_short.json#/properties/timestamp]` |
| `type` | string | Required | `NOTIFICATION`, `ALERT` | The category of the message, indicating whether it is a notification or an alert. `[verified-from-schema: events/alert_short.json#/properties/type/enum]` |
| `priority` | string | Required | `HIGH`, `LOW`, `CRITICAL` | The urgency level of the alert. `[verified-from-schema: events/alert_short.json#/properties/priority/enum]` |
| `messageID` | string | Required | `ZEBRA_RFID_HH_ALERTS` | The identifier for the message type, used to categorize the source or purpose of the alert. `[verified-from-schema: events/alert_short.json#/properties/messageID/enum]` |
| `description` | string | Required | (none) | A brief human-readable text describing the alert or notification. `[verified-from-schema: events/alert_short.json#/properties/description]` |

> Schema vs. envelope note: This item was scoped as "no payload (command+requestId only)," but the `alert_short.json` schema itself defines a fully inline body with the six fields above and **no** `command`/`requestId` properties. The `command`+`requestId` envelope shape applies to the management *command* family (e.g. `config_events`, where `requestId` is documented as a unique tracking identifier) rather than to this outbound event body `[verified-from-schema: events/alert_short.json#/properties]` `[verified-from-schema: commands/dev_mgmt/config_events.json#/properties/requestId]`. Where a `requestId` is used elsewhere it is documented as a "16 hex digit identifier" (the `config_events.json` schema itself only says "A unique identifier for the request, allowing tracking and debugging of the operation"), yet the examples use short strings such as `abc123` — note this divergence `[verified-from-schema: models/iot_commands.v1.1.json (requestId.description), models/iot_mgmt_commands.v1.1.json (requestId.description)]` `[verified-from-schema: commands/dev_mgmt/config_events.json#/examples]`.

> Error codes: `alert_short` is an event and does not itself carry a `response.code`. Acknowledgements to the management *commands* that enable it (e.g. `config_events`) use the standard `response` object whose `code` is an integer constrained to `0`–`30` with the meaning table carried verbatim (e.g. `0` Success, `2` Invalid payload, `23` Invalid enum value, `25` Max 3 publish topics exceeded) `[verified-from-schema: refrence/response/response.yaml#/properties/code]`. The binding between any particular code and a specific trigger is **`[firmware-only-unknown]`** unless `response.yaml` states it verbatim; the representability of a per-command code subset is a hypothesis `[verified-via-local-mock: routing/shape only]`.

### JSON Event Payload Example

```json
{
  "id": "BATTERY_CRITICAL_SET",
  "timestamp": "14:30:15",
  "type": "ALERT",
  "priority": "CRITICAL",
  "messageID": "ZEBRA_RFID_HH_ALERTS",
  "description": "battery level is critically low"
}
```

*Example reproduced verbatim from `[verified-from-schema: events/alert_short.json#/examples]`.*

---

# Event: dataEVT

> Run mode: MOCK FALLBACK. No physical RFD40/RFD90 session was proven attached during this run, and no live DATA endpoint was exercised. All facts below are grounded in repo schema files and the `_meta` knowledge base, or are explicitly marked `[firmware-only-unknown]`. The actual data-plane (tag DATA) wire behavior is `[firmware-only-unknown]`.

`dataEVT` is the Tag/Barcode **DATA-plane** event emitted by the Handheld RFID IOT Connector. It carries inventoried RFID tag reads (and optionally scanned barcode reads) rather than management/status telemetry. It is associated with `epType: DATA1` (and by enum extension `DATA2`) and is published on the data topic (`.../rfid`).

A note on the ITEM framing ("no payload (command+requestId only)"): the schema for this event does **not** match a command-style envelope. `events/dataEVT.json` defines an asynchronous **event** payload with `type`, `timestamp`, and `data` — there is **no** `command` field and **no** `requestId` field in this event schema `[verified-from-schema: events/dataEVT.json properties]`. The `command`/`requestId` pair belongs to inbound *commands* (e.g. `commands/dev_mgmt/config_endpoint.json properties.command`/`properties.requestId`), not to this outbound data event. The DATA-plane delivery of these tag/barcode records over MQTT is `[firmware-only-unknown]` because no DATA endpoint was live this run.

## 1. Triggering Conditions

`dataEVT` represents structured DATA-plane output: "Data Events capture and represent the structured information related to various events generated by the system. These events may include tag data, barcode data, and other relevant event-related details." `[verified-from-schema: events/dataEVT.json description]`

What populates the payload:

- **Tag reads (RFID inventory).** When the reader inventories one or more Gen2 tags, each read is reported as an entry in `data.tagData[]` `[verified-from-schema: refrence/events/dataEvts.yaml properties.tagData]`, where each entry is a tag-data record (EPC, TID, USER, RSSI, channel, phase, seenCount, accessResults, etc.) `[verified-from-schema: refrence/events/tagDataEVTs.yaml]`. The exact firmware trigger that flushes a tag read onto the data plane (per-read vs. per-report aggregation) is governed by the tag report filter: the schema states a value "will only be reported if each individual tag read is reported (in other words, if reportFilter duration is set to 0)" and that `seenCount` "will report the number of times the tag has been inventoried since the previous report" `[verified-from-schema: refrence/events/tagDataEVTs.yaml properties.channel, properties.seenCount]`. The precise emission cadence on the wire is `[firmware-only-unknown]`.
- **Barcode reads.** When the device scans a barcode, the decode is reported in `data.barcodeData[]` (each entry carries `symbology` and `decodedBarcode`) `[verified-from-schema: refrence/events/dataEvts.yaml properties.barcodeData; refrence/events/barcodeDataEVTs.yaml]`.
- **Operating-mode context.** The top-level `type` reports the active operating-mode profile under which the data was produced (default `BALANCED_PERFORMANCE`) `[verified-from-schema: events/dataEVT.json properties.type]`. Supported profile enums are `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE` (default), `ADVANCED` `[verified-from-schema: events/dataEVT.json properties.type.enum]`. (The `events/dataEVT.json` enum lists `FAST_READ` without any support qualifier; any "currently not supported" note for `FAST_READ` is `[firmware-only-unknown]` and is not asserted by this schema.)

Distinction from management/status events: the handheld/sled IOT Connector separates the **Tag Data** stream from the management **Events** stream — the connector exposes a "Tag Data / Data Channel" outbound interface alongside the Management Events interface `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md]`. Unlike heartbeat/alert/exception events, `dataEVT` is **not** gated by the `config_events` toggles or `heartbeatConfiguration.interval`; those flags govern management/status events (heartbeat, battery, temperature, network, exceptions, etc.) `[verified-from-schema: commands/dev_mgmt/config_events.json examples; refrence/payload/cfgEventPayload.yaml]`, whereas tag/barcode data is produced by radio inventory / scan activity. The binding between any specific configuration knob and the data-plane emission is `[firmware-only-unknown]`.

Provenance for this section: `[verified-from-schema: events/dataEVT.json, refrence/events/dataEvts.yaml, refrence/events/tagDataEVTs.yaml, refrence/events/barcodeDataEVTs.yaml]`, `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md]`, with wire-level emission cadence `[firmware-only-unknown]`.

## 2. Topic Mapping

Topics are configured per endpoint and follow the pattern `{EP_TYPE}/clients/{cmnd|resp|event|rfid}` `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples.mqttParams.publishTopics/subscribeTopics]`. Tag DATA flows on the `.../rfid` topic. For a `DATA1` data-plane endpoint the type prefix is `DATA1` (e.g. `DATA1/clients/rfid`); the literal `MDM/clients/...` form below is shown only because the schema's MDM endpoint example (`endpointName mgmt_tst`, `epType MDM`, tenantId `ZEBRA`) is the example that defines explicit topics with no tenant prefix `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (endpointName mgmt_tst, epType MDM)]`. No live endpoint was observed this run (MOCK FALLBACK).

Per-topic `qos` (int) and `retain` (bool) live in `cfgEndpointPayload.mqttParams.publishTopics[]`, alongside the endpoint-wide `qosCommon` `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml properties.configuration.properties.qosCommon, properties.mqttParams.properties.publishTopics]`. There is **no per-operation / per-event QoS binding** in the schema; for that axis: not specified per-operation in schema.

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Event - tag data) | `{EP_TYPE}/clients/rfid` (e.g. `MDM/clients/rfid`, or `DATA1/clients/rfid` for a DATA1 endpoint) | `0` `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (...rfid topic qos)]` | `true` `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (...rfid topic retain)]` |
| Publish (Event - general event channel, reference) | `{EP_TYPE}/clients/event` (e.g. `MDM/clients/event`) | `1` `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (...event topic qos)]` | `false` `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (...event topic retain)]` |
| Endpoint-wide default | n/a (`qosCommon`) | `1` (example) `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml properties.qosCommon.example]` | not specified per-operation in schema |

Notes:
- For the `DATA1` endpoint examples in `config_endpoint.json` (`dataEP`, `dataEP_tls`), `mqttParams` defines only `keepAlive`, `cleanSession`, `reconnectDelayMin`, `reconnectDelayMax` and **omits** explicit `publishTopics`/`subscribeTopics` `[verified-from-schema: commands/dev_mgmt/config_endpoint.json examples (endpointName dataEP / dataEP_tls)]`. The concrete `.../rfid` qos/retain values cited above come from the endpoint examples that *do* define topics (MGMT/CTRL/MDM), where `.../rfid` is consistently `qos: 0, retain: true`. Whether a DATA1 endpoint applies these same `.../rfid` values when topics are omitted is `[firmware-only-unknown]`.
- Routing/shape (event published on a `.../rfid` publish topic) is `[verified-via-local-mock: routing/shape only]`; the live tag-data delivery is `[firmware-only-unknown]` (no DATA endpoint live this run).
- MQTT credentials, when required by the broker, live in `mqttParams.username`/`mqttParams.password` and certificate material in `securityParams` (config_endpoint / set_config, reference only) `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml properties.mqttParams.properties.username/password, properties.securityParams]`. There is no per-message auth block on this event.

## 3. Payload Breakdown

Top-level `dataEVT` event object `[verified-from-schema: events/dataEVT.json properties]`:

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `type` | string | Optional | `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE` (default), `ADVANCED` | Operating-mode profile under which the data was produced. `[verified-from-schema: events/dataEVT.json properties.type]` |
| `timestamp` | string | **Required** | n/a | Event time in ISO-8601 format (e.g. `2019-08-24T14:15:22Z`). `[verified-from-schema: events/dataEVT.json properties.timestamp, required]` |
| `data` | object | Optional | n/a | Detailed event data; `$ref -> refrence/events/dataEvts.yaml`. Holds `tagData[]` and/or `barcodeData[]`. `[verified-from-schema: events/dataEVT.json properties.data]` |

`data` object `[verified-from-schema: refrence/events/dataEvts.yaml]`:

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `tagData` | array of tag-data objects | Optional | n/a | Collection of RFID tag-read records; `$ref -> tagDataEVTs.yaml`. `[verified-from-schema: refrence/events/dataEvts.yaml properties.tagData]` |
| `barcodeData` | array of barcode objects | Optional | n/a | Collection of scanned-barcode records; `$ref -> barcodeDataEVTs.yaml`. `[verified-from-schema: refrence/events/dataEvts.yaml properties.barcodeData]` |

`tagData[]` item `[verified-from-schema: refrence/events/tagDataEVTs.yaml]`:

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `EPCid` | string | Optional | n/a | EPC Identifier, hex string. `[verified-from-schema: refrence/events/tagDataEVTs.yaml properties.EPCid]` |
| `EPC` | string | Optional | n/a | Contents of the EPC memory bank, hex string. `[verified-from-schema: ...properties.EPC]` |
| `TID` | string | Optional | n/a | Tag Identifier memory bank, hex string. `[verified-from-schema: ...properties.TID]` |
| `USER` | string | Optional | n/a | USER memory bank, hex string. `[verified-from-schema: ...properties.USER]` |
| `RESERVED` | string | Optional | n/a | RESERVED memory bank (passwords), hex string. `[verified-from-schema: ...properties.RESERVED]` |
| `PC` | string | Optional | n/a | PC bits, hex string. `[verified-from-schema: ...properties.PC]` |
| `CRC` | string | Optional | n/a | CRC bits, hex string. `[verified-from-schema: ...properties.CRC]` |
| `XPC` | string | Optional | n/a | XPC bits, if present, hex string. `[verified-from-schema: ...properties.XPC]` |
| `channel` | number | Optional | n/a | Channel in MHz used when the tag was inventoried (only when each read is reported / reportFilter duration = 0). `[verified-from-schema: ...properties.channel]` |
| `eventNum` | number | **Required** | n/a | Event number. `[verified-from-schema: refrence/events/tagDataEVTs.yaml properties.eventNum, required]` |
| `format` | string | **Required** | n/a | Format of idHex is EPC (example `epc`). `[verified-from-schema: refrence/events/tagDataEVTs.yaml properties.format, required]` |
| `peakRssi` | number | Optional | n/a | RSSI in dBm (peak since last reported read when reported occasionally). `[verified-from-schema: ...properties.peakRssi]` |
| `phase` | number | Optional | n/a | Phase in degrees (only when each read is reported / reportFilter duration = 0). `[verified-from-schema: ...properties.phase]` |
| `seenCount` | number | Optional | n/a | Number of times the tag was inventoried since the previous report; always 1 when each read is reported. NOTE: the tag-data record uses property name `seenCount`, while the tag-metadata selector enum uses `SEEN_COUNT` — see divergence note below. `[verified-from-schema: refrence/events/tagDataEVTs.yaml properties.seenCount; refrence/payload/tagMetaDataPayload.yaml items.enum]` |
| `accessResults` | array of string | Optional | n/a | Per-operation access results (read data, or `SUCCESS` / error message for writes). `[verified-from-schema: ...properties.accessResults]` |
| `userDefined` | string | Optional | n/a | User-defined string included on every event. `[verified-from-schema: ...properties.userDefined]` |
| `firstSeenTime` | number | Optional | n/a | Timestamp (ms since epoch) when tag was first seen. `[verified-from-schema: ...properties.firstSeenTime]` |
| `lastSeenTime` | number | Optional | n/a | Timestamp (ms since epoch) when tag was last seen. `[verified-from-schema: ...properties.lastSeenTime]` |
| `MAC` | string | Optional | n/a | MAC address of the reporting reader (only if enabled in operating mode). `[verified-from-schema: ...properties.MAC]` |
| `HOSTNAME` | string | Optional | n/a | Hostname of the reporting reader (only if enabled in operating mode). `[verified-from-schema: ...properties.HOSTNAME]` |

`barcodeData[]` item `[verified-from-schema: refrence/events/barcodeDataEVTs.yaml]`:

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `symbology` | string | Optional | `CODE_39` | Barcode symbology type. `[verified-from-schema: refrence/events/barcodeDataEVTs.yaml properties.symbology.enum]` |
| `decodedBarcode` | string | **Required** | n/a | Decoded barcode value. `[verified-from-schema: refrence/events/barcodeDataEVTs.yaml properties.decodedBarcode, required]` |

**SEENCOUNT / SEEN_COUNT / seenCount divergence:** The metadata selector that controls which fields are reported uses the enum token `SEEN_COUNT` `[verified-from-schema: refrence/payload/tagMetaDataPayload.yaml items.enum]`, the emitted tag-data record uses the property key `seenCount` `[verified-from-schema: refrence/events/tagDataEVTs.yaml properties.seenCount]`, and the ITEM note references a `SEENCOUNT` family form. These are the same logical concept (count of inventories since the previous report) expressed in three casings; documenters should map `SEEN_COUNT` (selector) -> `seenCount` (output field). Which exact form firmware emits on the live data plane is `[firmware-only-unknown]`.

**requestId note:** This event schema contains no `requestId`. Where `requestId` does appear (on inbound commands such as `config_endpoint`/`config_events`), it is documented as a unique request identifier and the repo examples use short strings (e.g. `abc123`, `1233`) `[verified-from-schema: commands/dev_mgmt/config_endpoint.json properties.requestId.example "abc123" and examples requestId "1233"]`. This divergence is noted for cross-reference only; it does not apply to the `dataEVT` payload itself.

**Error codes:** `dataEVT` is a one-way DATA-plane event and does not itself carry a `response.code`. For completeness, response codes are integers `0`–`30` per `refrence/response/response.yaml` (e.g. `0` Success, `2` Invalid payload, `11` Inventory in progress, `12` No Radio Operation in Progress, `23` Invalid enum value) `[verified-from-schema: refrence/response/response.yaml properties.code]`. The binding of any specific code to a data-plane trigger is `[firmware-only-unknown]`; any per-event subset is at most a hypothesis whose representability is `[verified-via-local-mock: routing/shape only]`.

### JSON Event Payload Example

```json
{
  "type": "BALANCED_PERFORMANCE",
  "timestamp": "2019-08-24T14:15:22Z",
  "data": {
    "tagData": [
      {
        "EPCid": "BEDD11112222333344445555",
        "EPC": "BEDD11112222333344445555",
        "TID": "E2003412013BFD000B4E16D21D030143000D5FFBFFFFDC60",
        "USER": "12343333123456781234567812345678123456781234567812345678123456781234567812345678",
        "channel": 911.75,
        "eventNum": 1,
        "peakRssi": -39,
        "phase": 0,
        "seenCount": 1,
        "accessResults": [
          "READ-EPC-SUCCESS",
          "READ-TID-SUCCESS",
          "WRITE-USER-No Response from Tag"
        ]
      }
    ]
  }
}
```

> Example transcribed verbatim from `events/dataEVT.json examples[0]` `[verified-from-schema: events/dataEVT.json examples]`. Note this example omits the `format` field even though `tagDataEVTs.yaml` marks `format` as required — a schema/example divergence `[verified-from-schema: events/dataEVT.json examples vs refrence/events/tagDataEVTs.yaml required]`. The live on-the-wire DATA-plane shape is `[firmware-only-unknown]`.

---

# Event: heartBeatEVT

## 1. Triggering Conditions

`heartBeatEVT` is a periodic (timer-driven) management event. Unlike state-change events, it is **not** triggered by a threshold crossing or an inventory-completion boundary; it is emitted on a fixed cadence as long as heartbeat reporting is enabled. The schema title and description confirm the periodic nature: "This event represents a heartbeat signal sent periodically from a device or system to indicate its active status and provide essential metadata like uptime and event details." [verified-from-schema: events/heartBeatEVT.json `description`, line 3]. The duplicate reference schema reinforces this: "Heartbeat event periodically reporting device health and connectivity status." [verified-from-schema: refrence/events/heartbeatEvents.yaml `description`, line 3].

**Enablement and interval are governed by `config_events`.** Heartbeat emission is turned on by setting `eventConfiguration.heartbeat` to `true`. [verified-from-schema: refrence/payload/cfgEventPayload.yaml `heartbeat`, lines 16-18 ("set to true to enable heart beat")]. The emission cadence is controlled by `eventConfiguration.heartbeatConfiguration.interval`, defined as "heart beat interval in seconds" with example `100`. [verified-from-schema: refrence/payload/cfgEventPayload.yaml `heartbeatConfiguration.interval`, lines 35-38]. The `config_events` command itself carries this block — see its example with `heartbeat: true` and `heartbeatConfiguration: { interval: 100, inventoryStatus: true, batteryStatus: true, userApps: true }`. [verified-from-schema: commands/dev_mgmt/config_events.json `examples[0].eventConfiguration`, lines 21-34]. Note that `config_events` states "To apply the changes, a device reboot is required." so enabling/disabling the heartbeat or changing its interval takes effect after reboot. [verified-from-schema: commands/dev_mgmt/config_events.json `description`, line 6].

**What the heartbeat carries.** The payload self-describes uptime and the device's "active status" plus optional health sub-blocks. The schema's top-level `data` is an `anyOf` over the inventory-status and battery-alert reference schemas, so an individual heartbeat may report inventory progress, battery health, or both. [verified-from-schema: events/heartBeatEVT.json `data.anyOf`, lines 48-58, referencing `../refrence/events/inventoryStatus.yaml` and `../refrence/events/batteryAlert.yaml`]. Which of these sub-statuses are included is itself a `config_events` choice: `heartbeatConfiguration.inventoryStatus` ("set to true to enable inventory status as part of heartbeat message") and `heartbeatConfiguration.batteryStatus` ("set to true to enable battery status as part of heartbeat message"). [verified-from-schema: refrence/payload/cfgEventPayload.yaml lines 39-44]. So the heartbeat doubles as a liveness signal and as a configurable health digest.

The _meta knowledge base (handheld/sled section only) corroborates the heartbeat being a configurable periodic management event for RFD40/RFD90 sleds: it is set up via `config_events` under "Periodic: Heartbeat (Interval: 60 Sec default)" and the consumed event is described as "Heartbeat (Inventory, Battery)". [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md, "Monitoring Sleds" Connect/Configure/Control table, lines 418-420]. Two values diverge between sources: the schema example interval is `100` seconds [verified-from-schema: commands/dev_mgmt/config_events.json line 31] while the _meta deck cites a `60` second default [verified-from-_meta-knowledge-base: same file, line 420]; the authoritative default value for this build is [firmware-only-unknown].

> NOTE — the per-message command/requestId framing called out for this item (command + requestId, no payload) is **not** present in the event schema. The actual `heartBeatEvent` object is payload-bearing: it carries `eventName`, `timestamp`, `eventNumber`, `upTime`, and `data`, and it does not define `command` or `requestId` fields. [verified-from-schema: events/heartBeatEVT.json `properties`, lines 27-59]. The `command`/`requestId` pair is a property of the inbound `config_events` *command* that enables the heartbeat, not of the outbound event. [verified-from-schema: commands/dev_mgmt/config_events.json `properties.command` + `properties.requestId`, lines 64-78].

> SPECIAL NOTE — a **duplicate** reference schema exists: `refrence/events/heartbeatEvents.yaml` (minimal: `type: object` + a one-line description, no properties) [verified-from-schema: refrence/events/heartbeatEvents.yaml, lines 1-3] and `refrence/events/heartbeatEvents_new.yaml` (richer: an `anyOf` exposing `inventoryStatus`, `scanStatus`, `batteryStatus`, and `userApps`) [verified-from-schema: refrence/events/heartbeatEvents_new.yaml, lines 1-61]. The canonical event object documented here is `events/heartBeatEVT.json`, which references the *per-domain* reference schemas (`inventoryStatus.yaml`, `batteryAlert.yaml`) rather than either `heartbeatEvents*.yaml` file. The field naming differs across these duplicates (e.g. `tagCount` vs `tagsRed`, `rfidStatus` vs `status`, `batteryAlert` vs `batteryStatus`); the authoritative field set on a live device is [firmware-only-unknown].

[verified-from-schema: events/heartBeatEVT.json] [verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md] [firmware-only-unknown for the authoritative default interval and the canonical field naming across duplicate reference schemas]

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Event) | `MDM/clients/event` (literal for the live `MDM_EP`, `epType` MDM/MGMT_EVT, no tenant prefix; tenantId `zebra`) | not specified per-operation in schema | not specified per-operation in schema |

The topic pattern is `{EP_TYPE}/clients/{cmnd|resp|event|rfid}`, and topics are configured **per endpoint** (not bound to this event in any schema). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `publishTopics.items.topic` example `MGMT/clients/resp` (line 120) and `subscribeTopics.items.topic` example `MGMT/clients/cmnd` (line 142)]. For a management/MDM event the publish leg resolves to `{EP_TYPE}/clients/event`; the live `MDM_EP` uses the literal `MDM/clients/event` with no tenant prefix (tenant `zebra`). The `MDM` value is a valid `epType` enum member. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `epType.enum` includes `MDM` and `MGMT_EVT`, lines 37-44].

QoS and Retain are **per-topic** properties inside `mqttParams.publishTopics[]` (`qos: integer`, `retain: boolean`, both `required`) plus an endpoint-wide `qosCommon: integer`. [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `publishTopics.items.properties.qos`/`retain` (lines 122-132) and `qosCommon` (lines 74-77)]. There is **no per-operation QoS/Retain binding for this event** in any schema — those axes are "not specified per-operation in schema"; they are determined by whichever publish-topic entry carries `MDM/clients/event` on the configured endpoint. The concrete `qos`/`retain` integers/booleans for the live MDM endpoint are [verified-via-local-mock: routing/shape only] for representability and otherwise [firmware-only-unknown].

[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml] [verified-via-local-mock: routing/shape only]

## 3. Payload Breakdown

The `heartBeatEvent` object's top-level fields are inline in `events/heartBeatEVT.json`; the `data` member is a `$ref` `anyOf` resolving to `refrence/events/inventoryStatus.yaml` and `refrence/events/batteryAlert.yaml` (expanded below). No top-level `required` array is declared in the event schema. [verified-from-schema: events/heartBeatEVT.json — no `required` key present, lines 1-60].

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `eventName` | string | Optional (no `required` array) | n/a (example `heartbeat`) | Name of the event, indicating it is a heartbeat signal. [verified-from-schema: events/heartBeatEVT.json `eventName`, lines 28-32] |
| `timestamp` | string | Optional | n/a (ISO 8601; example `2019-08-24T14:15:22Z`) | The timestamp when the event was generated, in ISO 8601 format. [verified-from-schema: events/heartBeatEVT.json `timestamp`, lines 33-37] |
| `eventNumber` | integer | Optional | n/a (example `120`) | A unique identifier or sequence number for the event. [verified-from-schema: events/heartBeatEVT.json `eventNumber`, lines 38-42] |
| `upTime` | string | Optional | n/a (example `5 days 4hr 3min`) | The uptime duration of the system when the event was generated. [verified-from-schema: events/heartBeatEVT.json `upTime`, lines 43-47] |
| `data` | object (`anyOf` of `inventoryStatus` / `batteryAlert`) | Optional | n/a | Additional data associated with the heartbeat event, referencing different event types. [verified-from-schema: events/heartBeatEVT.json `data`, lines 48-58] |
| `data.rfidStatus` | string | Optional | `INPROGRESS`, `STOPPED` | Current status of the RFID scanning process. [verified-from-schema: refrence/events/inventoryStatus.yaml `rfidStatus`, lines 7-12] |
| `data.tagCount` | integer | Optional | n/a | Total number of RFID tags scanned in the current operation. [verified-from-schema: refrence/events/inventoryStatus.yaml `tagCount`, lines 13-15] |
| `data.scanCount` | integer | Optional | n/a | Total number of scan attempts made during the operation. [verified-from-schema: refrence/events/inventoryStatus.yaml `scanCount`, lines 16-18] |
| `data.status` | string | Optional | `LOW`, `CRITICAL`, `CHARGING`, `FULL`, `HIGH` | Current status of the battery (operational state). [verified-from-schema: refrence/events/batteryAlert.yaml `status`, lines 7-16] |
| `data.stateOfHealth` | string | Optional | `LOW`, `FULL`, `CRITICAL`, `HIGH`, `CHARGING` | Overall battery health (long-term capacity/performance). [verified-from-schema: refrence/events/batteryAlert.yaml `stateOfHealth`, lines 17-25] |
| `data.chargePercentage` | integer (max 100) | Optional | n/a | Current charge level of the battery as a percentage. [verified-from-schema: refrence/events/batteryAlert.yaml `chargePercentage`, lines 26-28] |

Notes on framing fields:
- This event has **no per-message auth block**. There is no `auth.user`/`auth.password` field anywhere in the event or its referenced schemas; MQTT credentials, when required, live in endpoint `mqttParams.username`/`mqttParams.password` and are configured via the endpoint config (reference only, not part of this event). [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml `mqttParams.username`/`password`, lines 105-110].
- `requestId` does **not** appear on this event. Where it does appear (on the enabling `config_events` command) it is documented as "A unique identifier for the request" of type string, with the example value `abc123`. [verified-from-schema: commands/dev_mgmt/config_events.json `requestId`, lines 70-73; example `abc123` lines 11/43].

### Error codes (representability only)

`heartBeatEVT` is an outbound async event and carries no `code`/`description` response object. The standard response code table (integers 0–30) lives verbatim in `refrence/response/response.yaml` (e.g. `0` Success, `2` Invalid payload, `11` Inventory in progress, `23` Invalid enum value). [verified-from-schema: refrence/response/response.yaml `code` table, lines 7-47]. The binding of any specific code to a heartbeat-related trigger is **[firmware-only-unknown]** unless `response.yaml` states it verbatim (it does not name heartbeat); any per-event subset is a hypothesis whose representability is [verified-via-local-mock: routing/shape only].

### JSON Event Payload Example

```json
{
  "eventName": "heartbeat",
  "timestamp": "2019-08-24T14:15:22Z",
  "eventNumber": 120,
  "upTime": "5 days 4hr 3min",
  "data": {
    "inventoryStatus": {
      "rfidStatus": "INPROGRESS",
      "tagCount": 45,
      "scanCount": 128
    },
    "batteryAlert": {
      "status": "HIGH",
      "stateOfHealth": "FULL",
      "chargePercentage": 85
    }
  }
}
```

(Example assembled from `events/heartBeatEVT.json` `examples[0]` (lines 9-25), with `upTime` added from the schema's `upTime.example` "5 days 4hr 3min" (line 45). The example's nesting under `inventoryStatus`/`batteryAlert` keys reflects the schema example; the `data.anyOf` $ref shapes are flattened in the field table above. [verified-from-schema: events/heartBeatEVT.json].)

---

# Event: mqttConnEVT

> This event is emitted by the connector as an **outbound management event** — it is not a command/response pair. The MQTT message body is the inline `epConnection` object described below. The exact endpoint type/channel that carries this event is not declared in `events/mqttConnEVT.json` (the OpenAPI spec lists it only under the `Events` tag at path `/mqttConnEVT`); the concrete management channel is therefore **[firmware-only-unknown]**. `mqttVersion` reported by this build is **3.1.1** `[verified-from-schema: events/mqttConnEVT.json — examples[].mqttVersion / properties.mqttVersion.example]`.

## 1. Triggering Conditions

`mqttConnEVT` reports a **change in the MQTT connection state** of the device endpoint. The connector emits it when the device transitions between connected and disconnected, carrying the new state in the `connectionState` field, whose only allowed values are `CONNECTED` and `DISCONNECTED` `[verified-from-schema: events/mqttConnEVT.json — properties.connectionState.enum]`. The schema describes the payload as "details about the connection state of a device, including its metadata and protocol versions" and the field itself as "Indicates the connection status of the device" `[verified-from-schema: events/mqttConnEVT.json — description / properties.connectionState.description]`.

The accompanying `timestamp` field is documented as "The time at which the MQTT connection event occurred, formatted as HH:MM:SS" `[verified-from-schema: events/mqttConnEVT.json — properties.timestamp.description/format]`, confirming the event is bound to the moment of the connection-state transition rather than to a periodic interval.

At the conceptual level, the device-management surface for the RFD40/RFD90 tracks **MQTT version, connection status, and stats** as part of its monitored state, and connection establishment/loss is surfaced to the management consumer — for example, a successful broker connection produces a connected notification on the device side `[verified-from-_meta-knowledge-base: _meta/knowledge-base/product/reference/reader-health-monitoring-and-gen2x.md — "MQTT" → "MQTT version", "Connection status", "Stats"; _meta/knowledge-base/product/reference/mdm-and-soti-interfaces.md — "If connection is successful user will see get connected notification"]`.

Whether this specific event is independently enabled/disabled through the event-configuration payload is **[firmware-only-unknown]**: the reviewed `config_events` schema (`cfgEventPayload.yaml`) exposes booleans for `terminalConnection`, `firmwareUpdate`, `network`, `heartbeat`, `power`, `battery`, `temperature`, and `fileDownload`, plus a `heartbeatConfiguration` block — but it does **not** define a dedicated boolean for MQTT connection-state events `[verified-from-schema: refrence/payload/cfgEventPayload.yaml — properties.*]`. No battery-threshold, inventory-complete, or heartbeat-interval mechanism applies to this event; those concepts belong to other events and are not part of the `epConnection` payload `[verified-from-schema: events/mqttConnEVT.json]`.

This is a handheld (RFD40/RFD90) MQTT management event.

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Event) | **[firmware-only-unknown]** — not bound by the event schema; resolved from the endpoint's `mqttParams.publishTopics[]` configured via `config_endpoint`/`set_config` (no device session attached to observe the live value) | not specified per-operation in schema | not specified per-operation in schema |

Notes on provenance:

- The event schema (`events/mqttConnEVT.json`) does **not** bind this event to any MQTT topic, and the OpenAPI document does not associate it with a concrete topic either. Topics are **configured per endpoint** rather than fixed per operation. The schema's own publish/subscribe topic examples are literals such as `MGMT/clients/resp` (publish) and `MGMT/clients/cmnd` (subscribe) `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — mqttParams.publishTopics.items example / subscribeTopics.items example]`. The actual topic that carries `mqttConnEVT` is whatever the operator configured for the management-event endpoint and is **[firmware-only-unknown]** here.
- QoS and Retain are **per-topic** properties carried in the endpoint configuration, not per-operation. In `cfgEndpointPayload.mqttParams` each `publishTopics[]` / `subscribeTopics[]` entry defines its own `qos` (integer) and `retain` (boolean), and the endpoint carries a `qosCommon` (integer) default `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — mqttParams.publishTopics.items.properties.qos/retain; mqttParams.subscribeTopics.items.properties.qos/retain; configuration.qosCommon]`. The schema example shows a publish topic `MGMT/clients/resp` with `qos: 1` `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — mqttParams.publishTopics.items example]`. Because there is **no per-operation QoS binding** for `mqttConnEVT`, the QoS/Retain that actually apply are whatever the operator configured for the management event topic via `config_endpoint`/`set_config` — hence "not specified per-operation in schema" above.
- Up to 3 publish topics and 1 subscribe topic are supported per endpoint `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — publishTopics "Supports up to 3 publish topics"; subscribeTopics "Supports up to 1 subscribe topic"]`.

## 3. Payload Breakdown

The `mqttConnEVT` payload is **fully inline** in `events/mqttConnEVT.json` (object title `epConnection`) — there is no `$ref`. The schema defines no `required` array, so all fields below are documented as optional from a schema standpoint `[verified-from-schema: events/mqttConnEVT.json — no top-level required[]]`.

| Field | Type | Required/Optional | Allowed Enums | Description |
|-------|------|-------------------|---------------|-------------|
| `connectionState` | string | Optional (no `required[]` in schema) | `CONNECTED`, `DISCONNECTED` | Connection status of the device. `[verified-from-schema: events/mqttConnEVT.json — properties.connectionState]` |
| `timestamp` | string (format `time`) | Optional | n/a | Time the MQTT connection event occurred, formatted `HH:MM:SS` (e.g. `12:17:56`). `[verified-from-schema: events/mqttConnEVT.json — properties.timestamp]` |
| `deviceModel` | string | Optional | `RFD40`, `RFD90` | Model of the device involved in the MQTT connection event. `[verified-from-schema: events/mqttConnEVT.json — properties.deviceModel]` |
| `deviceSerialNo` | string | Optional | n/a | Unique serial number of the device (e.g. `RFD40-24190525100354`). `[verified-from-schema: events/mqttConnEVT.json — properties.deviceSerialNo]` |
| `apiVersion` | string | Optional | n/a | Version of the API in use during the event (e.g. `1.0`, `1.2`). `[verified-from-schema: events/mqttConnEVT.json — properties.apiVersion]` |
| `mqttVersion` | string | Optional | n/a | MQTT protocol version used for the connection — `3.1.1` for this build. `[verified-from-schema: events/mqttConnEVT.json — properties.mqttVersion]` |

> There is **no per-message auth block** in this payload — no `auth.user` / `auth.password` fields exist. MQTT broker credentials live only in the endpoint `mqttParams` (`username` / `password`) configured via `config_endpoint`/`set_config`, mentioned here for reference only `[verified-from-schema: refrence/payload/cfgEndpointPayload.yaml — mqttParams.username/password]`.

> `requestId` note: this is an outbound event payload and defines **no** `requestId` field `[verified-from-schema: events/mqttConnEVT.json]`. (When `requestId` appears elsewhere in this API it is part of the command envelope, not of this event body.)

> Error codes: this is an outbound event and does not itself carry a `response.code`. The full integer code→meaning table (codes `0`–`30`) is carried verbatim in `refrence/response/response.yaml` `[verified-from-schema: refrence/response/response.yaml — properties.code, minimum 0 / maximum 30]`. Any mapping of a specific code to this event is **[firmware-only-unknown]**.

### JSON Event Payload Example

```json
{
  "connectionState": "CONNECTED",
  "timestamp": "12:17:56",
  "deviceModel": "RFD40",
  "deviceSerialNo": "RFD40-24190525100354",
  "apiVersion": "1.0",
  "mqttVersion": "3.1.1"
}
```

A `DISCONNECTED` transition (timestamp omitted in the schema's second example) is also valid `[verified-from-schema: events/mqttConnEVT.json — examples[1]]`:

```json
{
  "connectionState": "DISCONNECTED",
  "deviceModel": "RFD40",
  "deviceSerialNo": "RFD40-24190525100354",
  "apiVersion": "1.2",
  "mqttVersion": "3.1.1"
}
```
