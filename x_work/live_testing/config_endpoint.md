# Command: config_endpoint

## 1. Intent & Objective

`config_endpoint` lets an operator add, delete, or update an MQTT endpoint configuration on the device; the `epConfig.operation` enum is `[add, delete, update]` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml operation.enum]. The command schema's description summarizes it as "Using config_endpoint user can add/delete/modify the end point configuration" [verified-from-schema: commands/dev_mgmt/config_endpoint.json description] — note the description says "modify" while the enum value is "update" (see G1).

This session exercised **`operation: add`** for a **non-active MGMT endpoint named `MGMT_EP`** (`activate: false`) [verified-on-device: RFD40 serial 24190525100255]. Because `activate` was `false`, the endpoint is **saved but not connected/activated**, so the active MDM control session that carried the command was left untouched [verified-on-device: RFD40 serial 24190525100255]. The endpoint being configured (`MGMT_EP`, base topics `MGMT/clients/*`) is a separate saved config, distinct from the MDM transport over which the command itself traveled [verified-on-device: RFD40 serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

The `config_endpoint` command was sent over the **existing active MDM control channel** (endpoint `MDM_REMOTE`); the control session attached to the broker on the first connect attempt (rc=0, unique clientId, no retries) [verified-from-test-harness: Mosquitto broker 192.168.1.6:1883, device 192.168.1.5, Wi-Fi "Airtel_The_LAN_Before_Time"].

| Direction | On-wire topic | Wire form |
| --- | --- | --- |
| Publish (request) | `zebra/MDM/clients/cmnd/RFD40-24190525100255` | `{tenantId}/{baseTopic}/{serial}` [verified-on-device: RFD40 serial 24190525100255] |
| Subscribe (response) | `zebra/MDM/clients/resp/RFD40-24190525100255` | `{tenantId}/{baseTopic}/{serial}` [verified-on-device: RFD40 serial 24190525100255] |

**Transport vs. configured endpoint:** the command rode the MDM control channel (`MDM/clients/*`), while the endpoint being *configured* is `MGMT_EP` with base topics `MGMT/clients/*` [verified-on-device: RFD40 serial 24190525100255]. The `MGMT/clients/*` topics inside the payload are the **base** topics of the saved endpoint; they are NOT the transport for this command [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

Required vs. optional per `refrence/payload/cfgEndpointPayload.yaml`: `epConfig.required = [operation, configuration]`; `configuration.required` (9) = `[endpointName, epType, protocol, activate, url, verificationType, port, qosCommon, tenantId]`; `securityParams.required` (4) = `[format, caCertificateFile, clientCert, clientKey]` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml].

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `command` | string | Yes | Fixed operation name `config_endpoint` [verified-from-schema: commands/dev_mgmt/config_endpoint.json properties.command, required = ["command","requestId"]]. |
| `requestId` | string | Yes | Unique request identifier for tracking/correlation; echoed in the response [verified-from-schema: commands/dev_mgmt/config_endpoint.json properties.requestId, required]. |
| `epConfig` | object | Yes (per payload) | Endpoint-config wrapper ($ref refrence/payload/cfgEndpointPayload.yaml). Note: not in the command schema's top-level `required` array, but the referenced payload requires `[operation, configuration]` [verified-from-schema: commands/dev_mgmt/config_endpoint.json properties.epConfig; refrence/payload/cfgEndpointPayload.yaml required]. |
| `epConfig.operation` | string | Yes | Enum `[add, delete, update]`; this session sent `add` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml operation.enum; verified-on-device: RFD40 serial 24190525100255]. |
| `epConfig.configuration` | object | Yes | The endpoint config block; `required` lists the 9 fields below [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml configuration.required]. |
| `configuration.endpointName` | string | Yes | Endpoint name; sent `MGMT_EP` [verified-from-schema: ...configuration.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.epType` | string | Yes | Enum `[MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM]`; sent `MGMT` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml epType.enum; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.protocol` | string | Yes | Enum `[MQTT, MQTT_TLS]`; sent `MQTT` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml protocol.enum; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.activate` | boolean | Yes | Sent `false` -> endpoint saved but not activated [verified-from-schema: ...configuration.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.url` | string | Yes | Broker address; sent `192.168.1.6` [verified-from-schema: ...configuration.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.verificationType` | string | Yes | Enum `[NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER]`; sent `VERIFY_HOST_PEER` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml verificationType.enum; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.port` | integer | Yes | Sent `1883` [verified-from-schema: ...configuration.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.qosCommon` | integer | Yes | Common QoS level; sent `1` [verified-from-schema: ...configuration.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.tenantId` | string | Yes | Sent `zebra` [verified-from-schema: ...configuration.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.mqttParams` | object | No | MQTT connection params (keep-alive, session, reconnect, topics, optional credentials) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams]. |
| `mqttParams.keepAlive` | integer | No | Keep-alive seconds (max 65535); sent `300` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams.keepAlive; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.cleanSession` | boolean | No | Sent `true` [verified-from-schema: ...mqttParams.cleanSession; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.reconnectDelayMin` | integer | No | Min reconnect delay (s); sent `5` [verified-from-schema: ...mqttParams.reconnectDelayMin; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.reconnectDelayMax` | integer | No | Max reconnect delay (s); sent `60` [verified-from-schema: ...mqttParams.reconnectDelayMax; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.clientId` | string | No | Declared in schema; NOT sent this session [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams.clientId; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.username` | string | No | Broker username when required; NOT sent this session [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams.username; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.password` | string | No | Broker password when required; NOT sent this session. Sensitive — mask as `********` (see section 8) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams.password; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.publishTopics[]` | array | No | "Supports up to 3"; sent 3 entries: `MGMT/clients/resp` (qos 1, retain false), `MGMT/clients/event` (qos 1, retain false), `MGMT/clients/rfid` (qos 0, retain true). Item `required = [topic, qos, retain]` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml publishTopics; verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.subscribeTopics[]` | array | No | "Supports up to 1"; sent 1 entry: `MGMT/clients/cmnd` (qos 0, retain false). Item `required = [topic, qos, retain]` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml subscribeTopics; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.securityParams` | object | No | Cert/security block; when present, `required = [format, caCertificateFile, clientCert, clientKey]` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml securityParams.required]. |
| `securityParams.format` | string | Yes (in securityParams) | Enum `[PEM, PFX]`; sent `PEM` [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml securityParams.format; verified-on-device: RFD40 serial 24190525100255]. |
| `securityParams.caCertificateFile` | string | Yes (in securityParams) | On-device CA cert **file name** reference; sent `mqtt_ca_cert` (a filename, not key material) [verified-from-schema: ...securityParams.required; verified-on-device: RFD40 serial 24190525100255]. |
| `securityParams.clientCert` | string | Yes (in securityParams) | On-device client cert **file name** reference; sent `mqtt_client_cert` [verified-from-schema: ...securityParams.required; verified-on-device: RFD40 serial 24190525100255]. |
| `securityParams.clientKey` | string | Yes (in securityParams) | On-device client key **file name** reference; sent `mqtt_client_key` [verified-from-schema: ...securityParams.required; verified-on-device: RFD40 serial 24190525100255]. |
| `configuration.eventConfiguration` | object | No | Event-config block ($ref cfgEventPayload.yaml); NOT sent this session [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml eventConfiguration]. |

### JSON Request Example (operator-provided, schema-validated, sent)

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "MGMT_EP",
      "epType": "MGMT",
      "protocol": "MQTT",
      "activate": false,
      "url": "192.168.1.6",
      "port": 1883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "zebra",
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
        "subscribeTopics": [ { "topic": "MGMT/clients/cmnd", "qos": 0, "retain": false } ]
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

This is the exact request sent this session [verified-on-device: RFD40 serial 24190525100255]. It carries **no `password`** field; the `securityParams` values are on-device certificate **file-name references**, not embedded key material, so there is nothing secret to mask in the request [verified-on-device: RFD40 serial 24190525100255]. **Static verdict: FULLY VALID** against the command schema AND `cfgEndpointPayload.yaml` — all 9 `configuration` required fields are present; `operation: add`, `epType: MGMT`, `protocol: MQTT`, and `verificationType: VERIFY_HOST_PEER` are all in-enum; the 3 publish + 1 subscribe topics are within the "up to 3" / "up to 1" limits; and `securityParams` carries all 4 required fields [verified-from-schema: commands/dev_mgmt/config_endpoint.json; refrence/payload/cfgEndpointPayload.yaml].

## 4. Response Payload Breakdown

The response is a **status-only envelope** — there is no echoed endpoint payload, just the result code [verified-on-device: RFD40 serial 24190525100255].

| Field | Type | Notes |
| --- | --- | --- |
| `command` | string | Echoes `config_endpoint` [verified-on-device: RFD40 serial 24190525100255]. |
| `requestId` | string | Echoes the request value `1233` [verified-on-device: RFD40 serial 24190525100255]. |
| `apiVersion` | string | `V1.1`; enum `[V1.0, V1.1]` [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/config_endpoint.json properties.apiVersion.enum]. |
| `response` | object | Result status `{ code, description }`; `response.yaml` requires `[code, description]` [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/config_endpoint.json properties.response; refrence/response/response.yaml required]. |
| `response.code` | integer | `0` (Success); range 0..30 [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/response.yaml code minimum/maximum]. |
| `response.description` | string | `Success` [verified-on-device: RFD40 serial 24190525100255]. |

### JSON Response Example (LIVE, verbatim)

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "apiVersion": "V1.1",
  "response": { "code": 0, "description": "Success" }
}
```

**Validation result: VALID.** The full live envelope validates against `response/dev_mgmt/config_endpoint.json` — `apiVersion "V1.1"` is in the enum `[V1.0, V1.1]`, `response.code 0` is within `0..30`, and `response.yaml` requires `[code, description]`, both of which are present [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/config_endpoint.json; refrence/response/response.yaml].

## 5. Live State-Change Verification

The add was confirmed by a before/after read with `get_endpoint_config` [verified-on-device: RFD40 serial 24190525100255]:

| Stage | `savedEndpoints.epNames` | `activeEndpoints` |
| --- | --- | --- |
| BEFORE | `[MDM_REMOTE]` | `[MDM_REMOTE]` |
| `config_endpoint add` -> `response.code 0` | — | — |
| AFTER | `[MDM_REMOTE, MGMT_EP]` | `[MDM_REMOTE]` (UNCHANGED) |

The saved store grew by exactly `MGMT_EP`, while the active set was unchanged — so `MGMT_EP` was **added to the saved store but NOT activated** (`activate: false` honored), and the MDM control session was preserved [verified-on-device: RFD40 serial 24190525100255]. This is the definitive add proof [verified-on-device: RFD40 serial 24190525100255].

### MGMT_EP readback (single-endpoint variant, password MASKED)

A subsequent `get_endpoint_config` with `endpointDetails.endpointName = "MGMT_EP"` returned `code 0`; the single-endpoint variant returns the named endpoint under `activeEndpoints.epConfig[0]` even though it is NOT active [verified-on-device: RFD40 serial 24190525100255]. The masked readback JSON:

```json
{
  "command": "get_endpoint_config", "requestId": "rb", "apiVersion": "V1.1",
  "endpointResponse": { "activeEndpoints": { "epConfig": [ { "configuration": {
    "endpointName": "MGMT_EP", "epType": "MGMT", "protocol": "MQTT", "activate": false,
    "url": "192.168.1.6", "verificationType": "VERIFY_HOST_AND_PEER", "port": 1883, "qosCommon": 0, "tenantId": "zebra",
    "mqttParams": { "keepAlive": 300, "cleanSession": true, "reconnectDelayMin": 5, "reconnectDelayMax": 60,
      "password": "********",
      "publishTopics": [
        { "topic": "MGMT/clients/resp", "qos": 1, "retain": false },
        { "topic": "MGMT/clients/event", "qos": 1, "retain": false },
        { "topic": "MGMT/clients/rfid", "qos": 0, "retain": false } ],
      "subscribeTopics": [ { "topic": "MGMT/clients/cmnd", "qos": 0, "retain": false } ] },
    "securityParams": { "format": "PEM", "caCertificateFile": "mqtt_ca_cert", "clientCert": "mqtt_client_cert", "clientKey": "mqtt_client_key" },
    "eventConfiguration": { "terminalConnection": false, "firmwareUpdate": true, "network": true, "ntp": true,
      "heartbeat": false, "power": true, "battery": true, "fileDownload": true } } } ] } },
  "response": { "code": 0, "description": "Success" }
}
```

### Submitted vs. readback comparison

These are framed as **observed via the `get_endpoint_config` readback** (a separate command with its own documented fidelity quirks — those quirks are catalogued in `get_endpoint_config.md`, not asserted of `config_endpoint`), NOT as mutations asserted of `config_endpoint` itself [verified-on-device: RFD40 serial 24190525100255]. Every divergence below is attributable to the readback command, per that same `get_endpoint_config.md` quirk catalogue.

| Field | Submitted (config_endpoint) | Readback reports (get_endpoint_config) | Note |
| --- | --- | --- | --- |
| `verificationType` | `VERIFY_HOST_PEER` (in request enum) | `VERIFY_HOST_AND_PEER` | Readback token is NOT in either the request or response schema enum; compounds the get_endpoint_config "VERIFY_NONE" finding — the firmware verification vocabulary diverges from schema (see H1) [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/payload/cfgEndpointPayload.yaml + refrence/response/epConfigurationSoti.yaml verificationType.enum]. |
| `qosCommon` | `1` | `0` | Readback reports a different value; this is a get_endpoint_config readback fidelity quirk (see get_endpoint_config.md), not an asserted mutation by config_endpoint [verified-on-device: RFD40 serial 24190525100255]. |
| `publishTopics` `MGMT/clients/rfid` `retain` | `true` | `false` | All readback topics report `retain: false`; this is a get_endpoint_config readback fidelity quirk (see get_endpoint_config.md), not an asserted mutation by config_endpoint [verified-on-device: RFD40 serial 24190525100255]. |
| `eventConfiguration` | NOT submitted | populated default block | `firmwareUpdate/network/ntp/power/battery/fileDownload = true`; `terminalConnection/heartbeat = false`; includes the schema-undeclared `ntp` field [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.password` | NOT submitted | NON-EMPTY (masked `********`) | Firmware populated a credential not present in the add request; origin not determined this session (see section 8) [verified-on-device: RFD40 serial 24190525100255]. |

**Stored as submitted** (readback matches the request): `endpointName`, `epType` (MGMT), `protocol` (MQTT), `activate` (false), `url` (192.168.1.6), `port` (1883), `tenantId` (zebra), `keepAlive` (300), `cleanSession` (true), `reconnectDelayMin` (5), `reconnectDelayMax` (60), the **3 publish topics' names and per-topic `qos`** (`MGMT/clients/resp` qos 1, `MGMT/clients/event` qos 1, `MGMT/clients/rfid` qos 0 — all qos values match what was submitted; only the `MGMT/clients/rfid` `retain` bit diverged, true->false, per the row above), the 1 subscribe topic (`MGMT/clients/cmnd`, qos 0, retain false), and `securityParams` (all 4 cert-file references) [verified-on-device: RFD40 serial 24190525100255].

Verdict: **LIVE** [verified-from-test-harness: connect rc=0 first attempt, MQTT control session attached over MDM_REMOTE; verified-on-device: RFD40 serial 24190525100255].

### Second worked example — add `CTRL_EP` (`verificationType: NONE`, no `securityParams`)

A second `operation: add` was exercised this session for a **non-active CTRL endpoint named `CTRL_EP`** (`activate: false`, base topics `CTRL/clients/*`) [verified-on-device: RFD40 serial 24190525100255]. The shared mechanics (status-only response envelope, transport over the active `MDM_REMOTE` control channel, the `{tenantId}/{baseTopic}/{serial}` on-wire wrapping, and the saved-but-not-activated semantics of `activate: false`) are identical to the `MGMT_EP` example above and are not repeated here; this subsection records only what is **new or different** for the CTRL add [verified-on-device: RFD40 serial 24190525100255]. Two differences from the MGMT example are material: the request sent `verificationType: NONE` (a VALID schema enum value, unlike the MGMT example's `VERIFY_HOST_PEER`), and it sent **no `securityParams` block at all** (allowed — `securityParams` is not in `configuration.required`) [verified-from-schema: commands/dev_mgmt/config_endpoint.json; refrence/payload/cfgEndpointPayload.yaml configuration.required (9 fields, no securityParams)].

**Operational note (attach-preflight aborted, then retry succeeded).** On the first attempt this turn the device was momentarily DETACHED from the broker (broker `$SYS` reported 1 connected client — the probe only — and 0 device-originated messages in 15 s), so the robust client's `get_version` attach-preflight failed and it **ABORTED the state-change BEFORE transmitting** — no `config_endpoint` was sent to a detached device, so the safety design held [verified-from-test-harness: broker $SYS connected-clients probe; laptop stayed on Airtel and the Mosquitto broker at 192.168.1.6:1883 stayed reachable throughout — device-side drop, not a laptop-roaming event]. On retry the device had re-attached and the add **succeeded on the first attempt** [verified-on-device: RFD40 serial 24190525100255].

**Live result.** The CTRL add returned `response.code 0` ("Success"), `apiVersion "V1.1"`, `requestId` echoed `1233`; the status-only response envelope validated VALID against `response/dev_mgmt/config_endpoint.json` (`apiVersion` in enum `[V1.0, V1.1]`, `response.code 0` within `0..30`) [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/config_endpoint.json].

**State-change proof** via `get_endpoint_config` before/after [verified-on-device: RFD40 serial 24190525100255]:

| Stage | `savedEndpoints.epNames` | `activeEndpoints` |
| --- | --- | --- |
| BEFORE | `[MDM_REMOTE, MGMT_EP]` | `[MDM_REMOTE]` |
| `config_endpoint add` -> `response.code 0` | — | — |
| AFTER | `[MDM_REMOTE, MGMT_EP, CTRL_EP]` | `[MDM_REMOTE]` (UNCHANGED) |

The saved store grew by exactly `CTRL_EP` (2 -> 3 names) while the active set was unchanged — so `CTRL_EP` was **added to the saved store but NOT activated** (`activate: false` honored), and the MDM control session was preserved [verified-on-device: RFD40 serial 24190525100255]. `MGMT_EP` (added the prior turn) **PERSISTED across the device's drop/re-attach**, confirming saved endpoint configs survive a broker disconnect [verified-on-device: RFD40 serial 24190525100255].

**`CTRL_EP` readback (single-endpoint variant, password MASKED).** A subsequent `get_endpoint_config` with `endpointDetails.endpointName = "CTRL_EP"` returned `code 0`; the single-endpoint variant returns the named endpoint under `activeEndpoints.epConfig[0]` even though it is NOT active [verified-on-device: RFD40 serial 24190525100255]. The masked readback JSON:

```json
{
  "command": "get_endpoint_config", "requestId": "rb", "apiVersion": "V1.1",
  "endpointResponse": { "activeEndpoints": { "epConfig": [ { "configuration": {
    "endpointName": "CTRL_EP", "epType": "CTRL", "protocol": "MQTT", "activate": false,
    "url": "192.168.1.6", "verificationType": "VERIFY_NONE", "port": 1883, "qosCommon": 0, "tenantId": "zebra",
    "mqttParams": { "keepAlive": 300, "cleanSession": true, "reconnectDelayMin": 50, "reconnectDelayMax": 500,
      "password": "********",
      "publishTopics": [
        { "topic": "CTRL/clients/resp", "qos": 1, "retain": false },
        { "topic": "CTRL/clients/event", "qos": 1, "retain": false },
        { "topic": "CTRL/clients/rfid", "qos": 0, "retain": false } ],
      "subscribeTopics": [ { "topic": "CTRL/clients/cmnd", "qos": 0, "retain": false } ] },
    "securityParams": { "format": "PEM" },
    "eventConfiguration": { "terminalConnection": false, "firmwareUpdate": true, "network": true, "ntp": true,
      "heartbeat": false, "power": true, "battery": true, "fileDownload": true } } } ] } },
  "response": { "code": 0, "description": "Success" }
}
```

**Submitted vs. readback comparison (CTRL-specific differences only).** As with the MGMT example, these are framed as **observed via the `get_endpoint_config` readback** (a separate command whose fidelity quirks are catalogued in `get_endpoint_config.md`), NOT as mutations asserted of `config_endpoint` itself [verified-on-device: RFD40 serial 24190525100255]:

| Field | Submitted (config_endpoint) | Readback reports (get_endpoint_config) | Note |
| --- | --- | --- | --- |
| `verificationType` | `NONE` (a VALID schema enum value) | `VERIFY_NONE` (NOT in the schema enum) | **Decisive H1 confirmation** — directly shows schema token `NONE` -> firmware token `VERIFY_NONE`; this directly confirms (and strengthens) the get_endpoint_config E3 finding — E3 saw `VERIFY_NONE` on the pre-configured `MDM_REMOTE` endpoint with no known submitted value, whereas here a schema token `NONE` was actually SUBMITTED and read back as `VERIFY_NONE` (a submitted->readback mapping, not just a readback artifact) (see H1) [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/payload/cfgEndpointPayload.yaml + refrence/response/epConfigurationSoti.yaml verificationType.enum]. |
| `securityParams` | NOT submitted | defaulted `{ "format": "PEM" }` | **NEW observation** — the MGMT example submitted all 4 cert-file references and got them back; here, with `securityParams` omitted entirely, the firmware returns a defaulted single-field `{format: PEM}` block [verified-on-device: RFD40 serial 24190525100255]. |
| `qosCommon` | `1` | `0` | Reproduces the MGMT readback quirk (see get_endpoint_config.md), not an asserted mutation by config_endpoint [verified-on-device: RFD40 serial 24190525100255]. |
| `publishTopics` `CTRL/clients/rfid` `retain` | `true` | `false` | Reproduces the MGMT quirk — all readback topics report `retain: false` [verified-on-device: RFD40 serial 24190525100255]. |
| `eventConfiguration` | NOT submitted | populated default block | Reproduces MGMT: `firmwareUpdate/network/ntp/power/battery/fileDownload = true`, `terminalConnection/heartbeat = false`, including the schema-undeclared `ntp` field [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.password` | NOT submitted (and no `securityParams` submitted either) | NON-EMPTY (masked `********`) | Reproduces MGMT: firmware populated a credential not present in the add request; presence confirmed, origin not determined this session, no speculation (see section 8) [verified-on-device: RFD40 serial 24190525100255]. |

**Stored as submitted** (readback matches the request): `endpointName`, `epType` (CTRL), `protocol` (MQTT), `activate` (false), `url` (192.168.1.6), `port` (1883), `tenantId` (zebra), `keepAlive` (300), `cleanSession` (true), `reconnectDelayMin` (50), `reconnectDelayMax` (500), the **3 publish topics' names and per-topic `qos`** (`CTRL/clients/resp` qos 1, `CTRL/clients/event` qos 1, `CTRL/clients/rfid` qos 0 — all qos values match; only the `CTRL/clients/rfid` `retain` bit diverged, true->false, per the row above), and the 1 subscribe topic (`CTRL/clients/cmnd`, qos 0, retain false) [verified-on-device: RFD40 serial 24190525100255].

This worked example **confirms H1**: because the submitted in-enum token `NONE` is observed via readback as `VERIFY_NONE` (not in the schema enum), it directly demonstrates the `NONE` -> `VERIFY_NONE` firmware mapping that the MGMT example could only show for `VERIFY_HOST_PEER` -> `VERIFY_HOST_AND_PEER` [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/payload/cfgEndpointPayload.yaml + refrence/response/epConfigurationSoti.yaml verificationType.enum].

### Third worked example — add `DATA1_EP` (`activate: true` — first activation)

**Headline (SAFETY result).** A third `operation: add` was exercised this session, and it is the **first `activate: true` add** of the session (the `MGMT_EP` and `CTRL_EP` examples were both `activate: false`). The central question — whether activating a DATA1 endpoint would disrupt the MDM control session that carries these commands — was answered **on-device: it did NOT**. The active set went `[MDM_REMOTE]` -> `[MDM_REMOTE, DATA1_EP]` (BOTH active), and the AFTER `get_endpoint_config` (and the subsequent single-endpoint readback) round-tripped successfully over the MDM channel. This confirms DATA1 and MDM **coexist as independent active endpoints** (`activeEndpoints` is genuinely multi-active), and that activating a DATA1 endpoint did NOT sever the MDM control channel; `DATA1_EP` was added to the SAVED store AND made ACTIVE (`activate: true` honored) [verified-on-device: RFD40 serial 24190525100255]. The user was asked to confirm and chose "Activate as given." The shared mechanics (status-only response envelope, transport over the active `MDM_REMOTE` control channel, the `{tenantId}/{baseTopic}/{serial}` on-wire wrapping) are identical to the prior examples and are not repeated here; this subsection records only what is new or different for the DATA1 activate add [verified-on-device: RFD40 serial 24190525100255].

The exact request sent carried **no `password`, no `securityParams`, and no `topics` in `mqttParams`** (only `keepAlive 300`, `cleanSession true`, `reconnectDelayMin 50`, `reconnectDelayMax 500`); `verificationType` was `NONE`, `qosCommon` `1`, `port` `1883`, `tenantId` `zebra`, `url` `192.168.1.6` [verified-on-device: RFD40 serial 24190525100255]. **Static verdict: FULLY VALID** against `commands/dev_mgmt/config_endpoint.json` AND `refrence/payload/cfgEndpointPayload.yaml` — all 9 `configuration.required` fields present; `operation add` / `epType DATA1` / `protocol MQTT` / `verificationType NONE` all in-enum; `mqttParams` present without `publishTopics`/`subscribeTopics` (both optional); `securityParams` omitted (optional) [verified-from-schema: commands/dev_mgmt/config_endpoint.json; refrence/payload/cfgEndpointPayload.yaml configuration.required].

**Command-response nuance (timeout -> auto-retry -> code 101 on duplicate add — do NOT simplify to "returned code 0").** ATTEMPT 1 (`requestId "1233"`) **TIMED OUT** — no response was received within the 12 s client window. The robust client then AUTO-RETRIED with a fresh client-generated `requestId "4a9d55c6fffc4520"` [verified-from-test-harness: 12 s client response timeout, auto-retry with fresh requestId]. ATTEMPT 2 returned `response.code 101`, `description "Error in processing command"`, `apiVersion "V1.1"` [verified-on-device: RFD40 serial 24190525100255]. The only two adds sent were attempts 1 and 2; attempt 2 errored (code 101, did NOT add), yet the AFTER state shows `DATA1_EP` added AND active. Therefore **attempt 1 was actually PROCESSED by the device** (added + activated `DATA1_EP`) even though its response was not received in time — most plausibly because the activation triggered a brief MQTT reconfiguration that delayed/dropped the attempt-1 response; attempt 2 then re-sent the SAME add and was rejected as a duplicate (`DATA1_EP` already existed from attempt 1), which the firmware reported with the generic code 101 [inferred-from-live: attempt-1 succeeded despite timeout, deduced from the before/after state since only attempts 1 and 2 were sent and attempt 2 errored]. The documented code for a duplicate add is `10` ("Configuration already exists"); the firmware instead returned the undocumented, out-of-range `101` — see H2 [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/response.yaml code table].

**Response validation (the observed code-101 envelope).** Observed:

```json
{ "command": "config_endpoint", "requestId": "4a9d55c6fffc4520", "apiVersion": "V1.1",
  "response": { "code": 101, "description": "Error in processing command" } }
```

**Validation result: INVALID** against `response/dev_mgmt/config_endpoint.json` — `refrence/response/response.yaml` constrains `code` to `minimum 0` / `maximum 30`, so `101` exceeds the maximum and is absent from the documented `0..30` code table; the full envelope therefore fails response-schema validation (forward ref: see **H2**) [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/response.yaml code maximum].

**Operational caveat (non-idempotent retry).** Auto-retrying a NON-idempotent `add` after a lost response produced this spurious duplicate-add error: the first (timed-out) attempt had actually succeeded, so the retry could only ever be a duplicate. This is a client/tooling interaction caveat — not a device defect — and is worth guarding against in tooling (correlate by endpoint identity, or read back before retrying a lost `add`, rather than blindly resending a non-idempotent state-change) [inferred-from-live: caveat derived from the timeout/retry/duplicate-add sequence above].

**`DATA1_EP` readback (single-endpoint variant, password MASKED).** A subsequent `get_endpoint_config` with `endpointDetails.endpointName = "DATA1_EP"` returned `code 0` (this readback, like the AFTER read, round-tripped successfully over the still-active MDM channel) [verified-on-device: RFD40 serial 24190525100255]. The masked readback JSON:

```json
{
  "command": "get_endpoint_config", "requestId": "rb", "apiVersion": "V1.1",
  "endpointResponse": { "activeEndpoints": { "epConfig": [ { "configuration": {
    "endpointName": "DATA1_EP", "epType": "DATA1", "protocol": "MQTT", "activate": true,
    "url": "192.168.1.6", "verificationType": "VERIFY_NONE", "port": 1883, "qosCommon": 0, "tenantId": "zebra",
    "mqttParams": { "keepAlive": 300, "cleanSession": true, "reconnectDelayMin": 50, "reconnectDelayMax": 500,
      "password": "********",
      "publishTopics": [ { "topic": "DATA/clients/data1event", "qos": 1, "retain": false } ] },
    "securityParams": { "format": "PEM" },
    "eventConfiguration": { "terminalConnection": false, "firmwareUpdate": true, "network": true, "ntp": true,
      "heartbeat": false, "power": true, "battery": true, "fileDownload": true } } } ] } },
  "response": { "code": 0, "description": "Success" }
}
```

**Submitted vs. readback comparison (DATA1-specific differences only).** As with the prior examples, these are framed as **observed via the `get_endpoint_config` readback** (a separate command whose fidelity quirks are catalogued in `get_endpoint_config.md`), NOT as mutations asserted of `config_endpoint` itself [verified-on-device: RFD40 serial 24190525100255]:

| Field | Submitted (config_endpoint) | Readback reports (get_endpoint_config) | Note |
| --- | --- | --- | --- |
| `verificationType` | `NONE` (a VALID schema enum value) | `VERIFY_NONE` (NOT in the schema enum) | **THIRD on-device confirmation of H1** — after MGMT `VERIFY_HOST_PEER` -> `VERIFY_HOST_AND_PEER` and CTRL `NONE` -> `VERIFY_NONE`, this independently reproduces the submitted `NONE` -> readback `VERIFY_NONE` mapping, reinforcing the firmware verification vocabulary divergence (see H1) [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/payload/cfgEndpointPayload.yaml + refrence/response/epConfigurationSoti.yaml verificationType.enum]. |
| `publishTopics` | NONE submitted (`mqttParams` had no topics at all) | ONE default publish topic `DATA/clients/data1event` (qos 1, retain false); no subscribe topic | **NEW observation** — for a DATA1 endpoint with topics omitted entirely, the firmware assigns a DEFAULT DATA1 publish topic `DATA/clients/data1event`; the MGMT/CTRL examples submitted their own topics, so this default behavior is first seen here [verified-on-device: RFD40 serial 24190525100255]. |
| `qosCommon` | `1` | `0` | Reproduces the MGMT/CTRL readback quirk (see get_endpoint_config.md), not an asserted mutation by config_endpoint [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.password` | NOT submitted (and no `securityParams` submitted either) | NON-EMPTY (masked `********`) | Reproduces MGMT/CTRL: firmware populated a credential not present in the add request; presence confirmed, origin not determined this session, no speculation (see section 8) [verified-on-device: RFD40 serial 24190525100255]. |
| `securityParams` | NOT submitted | defaulted `{ "format": "PEM" }` | Reproduces the CTRL observation — with `securityParams` omitted, the firmware returns a defaulted single-field `{format: PEM}` block [verified-on-device: RFD40 serial 24190525100255]. |
| `eventConfiguration` | NOT submitted | populated default block | Reproduces MGMT/CTRL: `firmwareUpdate/network/ntp/power/battery/fileDownload = true`, `terminalConnection/heartbeat = false`, including the schema-undeclared `ntp` field [verified-on-device: RFD40 serial 24190525100255]. |

**Stored as submitted** (readback matches the request): `endpointName`, `epType` (DATA1), `protocol` (MQTT), `activate` (true), `url` (192.168.1.6), `port` (1883), `tenantId` (zebra), `keepAlive` (300), `cleanSession` (true), `reconnectDelayMin` (50), `reconnectDelayMax` (500) [verified-on-device: RFD40 serial 24190525100255].

**State-change proof** via `get_endpoint_config` before/after [verified-on-device: RFD40 serial 24190525100255]:

| Stage | `savedEndpoints.epNames` | `activeEndpoints` |
| --- | --- | --- |
| BEFORE | `[MDM_REMOTE, MGMT_EP, CTRL_EP]` | `[MDM_REMOTE]` |
| `config_endpoint add` (`activate: true`) — attempt 1 TIMED OUT (processed); attempt 2 -> `response.code 101` (duplicate) | — | — |
| AFTER | `[MDM_REMOTE, MGMT_EP, CTRL_EP, DATA1_EP]` (DATA1_EP ADDED) | `[MDM_REMOTE, DATA1_EP]` (DATA1_EP now ACTIVE; MDM_REMOTE STILL ACTIVE) |

The saved store grew by exactly `DATA1_EP` (3 -> 4 names) AND the active set grew by exactly `DATA1_EP` (1 -> 2) while `MDM_REMOTE` remained active — so `DATA1_EP` was **added to the saved store and made ACTIVE** (`activate: true` honored), and the MDM control session was **preserved** through the activation [verified-on-device: RFD40 serial 24190525100255]. This is the definitive activate-add proof, and the headline safety result: the first activation coexisted with, rather than displaced, the MDM control channel [verified-on-device: RFD40 serial 24190525100255].

## 6. Associated Error Codes

| Code | Meaning | Provenance |
| --- | --- | --- |
| 0 | Success | [verified-on-device: RFD40 serial 24190525100255] |
| 2 | Invalid payload | [verified-from-schema: refrence/response/response.yaml code table] |
| 10 | Configuration already exists | [verified-from-schema: refrence/response/response.yaml code table] |
| 23 | Invalid enum value | [verified-from-schema: refrence/response/response.yaml code table] |
| 25 | Max 3 publish topics exceeded | [verified-from-schema: refrence/response/response.yaml code table] |
| 26 | Max 1 subscribe topic exceeded | [verified-from-schema: refrence/response/response.yaml code table] |
| 27 | Invalid tenant ID length | [verified-from-schema: refrence/response/response.yaml code table] |

**Honesty note:** only code `0` was observed live this session [verified-on-device: RFD40 serial 24190525100255]. Codes 2, 10, 23, 25, 26, and 27 are documented strictly from the schema's code table; no command-specific trigger is asserted beyond the table text [verified-from-schema: refrence/response/response.yaml].

## 7. Conformance & Spec Notes (this command)

**Positive:** the live add succeeded cleanly — first-attempt connect (rc=0), `response.code 0`, and a faithful add (`MGMT_EP` appeared in the saved store, was correctly left inactive per `activate: false`, and the active MDM session was preserved) [verified-on-device: RFD40 serial 24190525100255; verified-from-test-harness: MQTT control session attached over MDM_REMOTE].

- **G1 — Command description says "add/delete/MODIFY" but the enum is "update".** `commands/dev_mgmt/config_endpoint.json` description reads "add/delete/modify", whereas `operation.enum` is `[add, delete, update]` — the third value is `update`, not `modify` [verified-from-schema: commands/dev_mgmt/config_endpoint.json description vs refrence/payload/cfgEndpointPayload.yaml operation.enum]. **Fix:** align the word ("update").

- **G2 — Response schema title is `cfgAlertResponse`.** The title is a copy-paste from an alert response, not a config_endpoint response title [verified-from-schema: response/dev_mgmt/config_endpoint.json title]. **Fix:** correct the title.

- **G3 — Response schema has no top-level `required` array.** Nothing is required at the envelope level [verified-from-schema: response/dev_mgmt/config_endpoint.json]. **Fix:** add `required` (`command, requestId, apiVersion, response`).

- **G4 — Cross-schema `securityParams.required` mismatch.** The REQUEST payload (`cfgEndpointPayload.yaml`) requires `[format, caCertificateFile, clientCert, clientKey]` (4, no `algorithm`), while the RESPONSE payload (`epConfigurationSoti.yaml`) requires `[format, algorithm, caCertificateFile, clientCert, clientKey]` (5, adds `algorithm`) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml vs refrence/response/epConfigurationSoti.yaml securityParams.required]. **Fix:** reconcile the two.

- **H1 — Firmware `verificationType` vocabulary diverges from the schema enum.** The firmware emits tokens outside the schema enum `[NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER]`, now confirmed on **two distinct submitted values this session** via `get_endpoint_config` readback: submitted `NONE` -> readback `VERIFY_NONE` (the CTRL_EP example), and submitted `VERIFY_HOST_PEER` -> readback `VERIFY_HOST_AND_PEER` (the MGMT_EP example); neither firmware token (`VERIFY_NONE`, `VERIFY_HOST_AND_PEER`) is in the schema enum [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml verificationType.enum + refrence/response/epConfigurationSoti.yaml verificationType.enum; verified-on-device: RFD40 serial 24190525100255]. **Fix:** align the enum with the firmware tokens (or correct the values the firmware emits).

- **H2 — Firmware returns an undocumented, out-of-range response code.** `config_endpoint` returned `response.code 101` ("Error in processing command") when attempt 2 re-added an endpoint that already existed; the response code table in `refrence/response/response.yaml` defines only codes `0..30` (with `maximum: 30`), so `101` is BOTH out of range and absent from the documented table — the full envelope therefore fails response-schema validation (`code 101 > maximum 30`). Moreover, for a duplicate add the documented code is `10` ("Configuration already exists"), but the firmware returned the generic `101` [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/response.yaml code maximum/table]. **Fix:** extend `response.yaml`'s code table/maximum to cover firmware codes such as `101` (and/or have the firmware return the specific documented code `10` for a duplicate add).

- **(Semantic note, not a schema error) — plain MQTT paired with TLS verification + certificates.** The submitted payload pairs `protocol "MQTT"` (plain) on port `1883` with `verificationType VERIFY_HOST_PEER` and a cert `securityParams` block. The schema permits this (`securityParams` is not conditional on `protocol`) and the device accepted it (`code 0`), but TLS verification + certificates on a plain-MQTT endpoint is semantically unusual — TLS params typically pair with `protocol MQTT_TLS` on port 8883 [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml; verified-on-device: RFD40 serial 24190525100255].

## 8. Security note — endpoint credential handling

`config_endpoint` payloads CAN carry broker credentials (`mqttParams.username` / `mqttParams.password`) [verified-from-schema: refrence/payload/cfgEndpointPayload.yaml mqttParams.username + mqttParams.password]. **This** request included no `password` — only certificate **file-name references** (`mqtt_ca_cert`, `mqtt_client_cert`, `mqtt_client_key`), which point at on-device certificates and are not embedded key material, so nothing in the request was secret [verified-on-device: RFD40 serial 24190525100255]. However, the `MGMT_EP` readback shows a **NON-EMPTY `password` field** that was never submitted [verified-on-device: RFD40 serial 24190525100255] — so endpoint configuration data, whether sent or read back, must be treated as **sensitive**. In this document any password is masked as `********` everywhere; the real value is never printed (and none was available in any case) [verified-on-device: RFD40 serial 24190525100255]. Redact `password` (and any `username`) in logs, tickets, screenshots, and any shared artifacts, and capture/transport/store these configs over secured channels [inferred-from-live: redaction/handling recommendation derived from the credential field being present in the readback].
