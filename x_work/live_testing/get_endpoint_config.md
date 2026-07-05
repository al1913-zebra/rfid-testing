# Command: get_endpoint_config

## 1. Intent & Objective

`get_endpoint_config` retrieves the device's configured MQTT endpoint(s) and is a faithful read-back of what was previously provisioned [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json description]. It operates in two modes determined entirely by whether `endpointDetails.endpointName` is supplied [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json description + properties.endpointDetails]:

- **No `endpointName` (all-endpoints variant):** the response returns every active endpoint's full configuration under `activeEndpoints.epConfig[]` PLUS a list of all saved endpoint names under `savedEndpoints.epNames[]` [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json description].
- **With `endpointName` (single-endpoint variant):** only that one endpoint's configuration is returned [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json description].

This session exercised the **no-`endpointDetails`** (all-endpoints) variant; the live device returned one active endpoint plus the saved-names list [verified-on-device: RFD40 serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

The control session attached to the MQTT broker on the first connect attempt (rc=0, unique clientId, no retries) over endpoint MDM_REMOTE [verified-from-test-harness: Mosquitto broker 192.168.1.6:1883, device 192.168.1.5, Wi-Fi "Airtel_The_LAN_Before_Time"].

| Direction | On-wire topic | Wire form |
| --- | --- | --- |
| Publish (request) | `zebra/MDM/clients/cmnd/RFD40-24190525100255` | `{tenantId}/{baseTopic}/{serial}` [verified-on-device: RFD40 serial 24190525100255] |
| Subscribe (response) | `zebra/MDM/clients/resp/RFD40-24190525100255` | `{tenantId}/{baseTopic}/{serial}` [verified-on-device: RFD40 serial 24190525100255] |

The `mqttParams` topics inside the response payload are the **base** topics (e.g. `MDM/clients/cmnd`); on-wire they are wrapped to `{tenantId}/{base}/{serial}` [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `command` | string | Yes | Fixed operation name `get_endpoint_config` [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json properties.command, required]. Schema supplies a `default` (no `example`, no `enum`) [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json properties.command]. |
| `requestId` | string | Yes | Unique request identifier for tracking/correlation; echoed in the response [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json properties.requestId, required]. |
| `endpointDetails` | object | No | Optional selector object ($ref refrence/payload/epName.yaml); omitting it selects the all-endpoints variant [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json properties.endpointDetails; refrence/payload/epName.yaml]. |
| `endpointDetails.endpointName` | string | No | The single endpoint to retrieve; when present, only that endpoint's config is returned. The referenced schema has no `required` array, so it is optional [verified-from-schema: refrence/payload/epName.yaml properties.endpointName]. |

### JSON Request Example (operator-provided, schema-validated, sent)

```json
{
  "command": "get_endpoint_config",
  "requestId": "abc123"
}
```

This is the exact request sent this session, byte-for-byte identical to the command schema's example #1 [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: commands/dev_mgmt/get_endpoint_config.json examples[0]]. It carries no credential and is read-only. **Static verdict: VALID** — `command` and `requestId` are both present, and the omitted `endpointDetails` is allowed and selects the all-endpoints variant [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json required = ["command","requestId"]].

## 4. Response Payload Breakdown

### Envelope

| Field | Type | Notes |
| --- | --- | --- |
| `command` | string | Echoes `get_endpoint_config` [verified-on-device: RFD40 serial 24190525100255]. |
| `requestId` | string | Echoes the request value `abc123` [verified-on-device: RFD40 serial 24190525100255]. |
| `apiVersion` | string | `V1.1` [verified-on-device: RFD40 serial 24190525100255]. |
| `endpointResponse` | object | Carries the endpoint payload (`activeEndpoints` + `savedEndpoints`). **The device emits the key `endpointResponse`, but the response schema declares the payload under `epDetails` — see E1** [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/get_endpoint_config.json properties.epDetails]. |
| `response` | object | Result status `{ code, description }` [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/get_endpoint_config.json properties.response]. |

### Endpoint configuration (`endpointResponse.activeEndpoints.epConfig[].configuration`)

Required vs optional per `epConfigurationSoti.yaml` `configuration.required = [epType, protocol, activate, url, verificationType, port]` [verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.required].

| Field | Type | Required | Live value | Notes |
| --- | --- | --- | --- | --- |
| `endpointName` | string | No | `MDM_REMOTE` | Endpoint name [verified-on-device: RFD40 serial 24190525100255]. |
| `epType` | string | Yes | `MDM` | Enum includes MDM [verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.epType.enum]. |
| `protocol` | string | Yes | `MQTT` | Enum [MQTT, MQTT_TLS]; description erroneously mentions HTTP — see E7 [verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.protocol]. |
| `activate` | boolean | Yes | `true` | [verified-on-device: RFD40 serial 24190525100255]. |
| `url` | string | Yes | `192.168.1.6` | Broker address [verified-on-device: RFD40 serial 24190525100255]. |
| `verificationType` | string | Yes | `VERIFY_NONE` | NOT in the schema enum — see E3 [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.verificationType.enum]. |
| `port` | integer | Yes | `1883` | [verified-on-device: RFD40 serial 24190525100255]. |
| `qosCommon` | integer | No | `0` | Common QoS level [verified-on-device: RFD40 serial 24190525100255]. |
| `tenantId` | string | No | `zebra` | [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.keepAlive` | integer | No | `40` | [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.cleanSession` | boolean | No | `false` | [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.reconnectDelayMin` | integer | No | `5` | [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.reconnectDelayMax` | integer | No | `500` | [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.username` | string | No | (absent) | Declared in schema but NOT returned this session [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/epConfigurationSoti.yaml mqttParams.properties.username]. |
| `mqttParams.password` | string | No | `********` | PRESENT but **MASKED** — sensitive, see section 8 [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.publishTopics[]` | array | No | 3 entries | `MDM/clients/resp`, `MDM/clients/event`, `MDM/clients/rfid` (all qos 0, retain false) [verified-on-device: RFD40 serial 24190525100255]. |
| `mqttParams.subscribeTopics[]` | array | No | 1 entry | `MDM/clients/cmnd` (qos 0, retain false) [verified-on-device: RFD40 serial 24190525100255]. |
| `securityParams.format` | string | Yes (in securityParams) | `PEM` | Only field returned; schema also requires algorithm/caCertificateFile/clientCert/clientKey — see E4 [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/epConfigurationSoti.yaml securityParams.required]. |
| `eventConfiguration{}` | object | No | 20 keys (16 boolean + 4 integer) | Latest capture returns all 8 schema-declared booleans (`terminalConnection, firmwareUpdate, network, heartbeat, power, battery, temperature, fileDownload`) **plus 12 undeclared keys**: 8 booleans (`antenna, gpi, exceptions, ntp, userApp, cpuUsage, flashUsage, ramUsage`) and 4 integer thresholds (`cpuThreshold, ramThreshold, flashThreshold, temperatureThreshold`). Per vendor, only the 8 declared booleans are **working**; the 12 undeclared keys are **not yet supported**. `heartbeatConfiguration` still not returned by default; when present it never includes `userApps`, although `config_events` example #1 sends `heartbeatConfiguration.userApps:true` (undeclared/unsupported, silently dropped) — see E9. Schema does not distinguish working vs future — see E6/E8 and the §4 addendum [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/payload/cfgEventPayload.yaml]. |
| `savedEndpoints.epNames[]` | array of string | No | `["MDM_REMOTE"]` | List of all saved endpoint names [verified-on-device: RFD40 serial 24190525100255]. |

No `clientId` field was returned, although the schema declares one under `mqttParams` [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/epConfigurationSoti.yaml mqttParams.properties.clientId].

### JSON Response Example (LIVE, verbatim — password MASKED)

```json
{
  "command": "get_endpoint_config",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "endpointResponse": {
    "activeEndpoints": {
      "epConfig": [
        {
          "configuration": {
            "endpointName": "MDM_REMOTE",
            "epType": "MDM",
            "protocol": "MQTT",
            "activate": true,
            "url": "192.168.1.6",
            "verificationType": "VERIFY_NONE",
            "port": 1883,
            "qosCommon": 0,
            "tenantId": "zebra",
            "mqttParams": {
              "keepAlive": 40,
              "cleanSession": false,
              "reconnectDelayMin": 5,
              "reconnectDelayMax": 500,
              "password": "********",
              "publishTopics": [
                { "topic": "MDM/clients/resp", "qos": 0, "retain": false },
                { "topic": "MDM/clients/event", "qos": 0, "retain": false },
                { "topic": "MDM/clients/rfid", "qos": 0, "retain": false }
              ],
              "subscribeTopics": [
                { "topic": "MDM/clients/cmnd", "qos": 0, "retain": false }
              ]
            },
            "securityParams": { "format": "PEM" },
            "eventConfiguration": {
              "terminalConnection": false, "firmwareUpdate": false, "network": false, "ntp": false,
              "heartbeat": false, "power": false, "battery": false, "fileDownload": false
            }
          }
        }
      ]
    },
    "savedEndpoints": { "epNames": ["MDM_REMOTE"] }
  },
  "response": { "code": 0, "description": "Success" }
}
```

**Two-part validation result:**

1. **Envelope: VALID — but trivially.** The full live envelope validates against `response/dev_mgmt/get_endpoint_config.json`, because the schema declares the payload under property `epDetails` while the device returns `endpointResponse`. With no `additionalProperties: false` and no top-level `required` array, `endpointResponse` is accepted as an unvalidated extra property and the absent `epDetails` is fine [verified-from-schema: response/dev_mgmt/get_endpoint_config.json; verified-on-device: RFD40 serial 24190525100255].
2. **Content: INVALID if validated.** When the device's `endpointResponse` content is validated against `endpointResponse.yaml` (the schema intended for `epDetails`), it fails with 5 errors — `securityParams` is missing the 4 required fields `algorithm/caCertificateFile/clientCert/clientKey` (only `format` present), and `verificationType: "VERIFY_NONE"` is not in the enum `[NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER]` [verified-from-schema: refrence/response/epConfigurationSoti.yaml; verified-on-device: RFD40 serial 24190525100255].

**Consequence (E1):** because the device key (`endpointResponse`) does not match the declared key (`epDetails`), the rich validator never runs — the key mismatch **masks** the E3/E4 content violations, and the entire endpoint configuration lands in a property the schema never validates [verified-from-schema + verified-on-device].

### Addendum — `eventConfiguration` 20-key capture (operator-supplied, verbatim evidence)

A later operator-supplied `get_endpoint_config` read returned a **20-key** `eventConfiguration` block (the basis for E6/E8 above) — far richer than the 8-key blocks in §4/§5:

```json
{
  "antenna": false,
  "terminalConnection": false,
  "firmwareUpdate": true,
  "gpi": false,
  "network": true,
  "exceptions": false,
  "ntp": true,
  "userApp": false,
  "heartbeat": false,
  "power": true,
  "battery": true,
  "temperature": false,
  "fileDownload": true,
  "cpuUsage": false,
  "flashUsage": false,
  "ramUsage": false,
  "cpuThreshold": 0,
  "ramThreshold": 0,
  "flashThreshold": 0,
  "temperatureThreshold": 0
}
```

| Group | Keys | In `cfgEventPayload.yaml`? |
| --- | --- | --- |
| **Working** (vendor-confirmed, 8) | `terminalConnection, firmwareUpdate, network, heartbeat, power, battery, temperature, fileDownload` | **Yes** — declared (the schema's full boolean set) |
| **Not yet supported** (vendor-stated future, 12) | `antenna, gpi, exceptions, ntp, userApp, cpuUsage, flashUsage, ramUsage` (booleans) + `cpuThreshold, ramThreshold, flashThreshold, temperatureThreshold` (integers) | **No** — undeclared; accepted only because there is no `additionalProperties: false` |

**Is the working-vs-future split mentioned in the schema? No.** `cfgEventPayload.yaml` (reached via `endpointResponse.yaml → getepCfgResponse.yaml → epConfigurationSoti.yaml.configuration.eventConfiguration $ref`) declares **exactly the 8 working keys** plus `heartbeatConfiguration`, and contains **no** annotation (`deprecated`, `x-`extension, description, or enum) marking any field as not-yet-supported. The 12 future keys are neither declared nor flagged — the split is entirely implicit. `heartbeatConfiguration` is absent from this default read [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/payload/cfgEventPayload.yaml].

## 5. Live Verification

The device returned `response.code 0` ("Success"), `apiVersion "V1.1"`, and echoed `requestId "abc123"` [verified-on-device: RFD40 serial 24190525100255]. Exactly **1 active endpoint** was returned: `MDM_REMOTE` (epType MDM, protocol MQTT, url 192.168.1.6, port 1883, verificationType VERIFY_NONE, tenantId zebra) — the same endpoint configured earlier this session, confirming `get_endpoint_config` is a faithful read-back [verified-on-device: RFD40 serial 24190525100255; inferred-from-live: returned config equals the endpoint provisioned earlier this session]. `savedEndpoints.epNames` was `["MDM_REMOTE"]` [verified-on-device: RFD40 serial 24190525100255]. Verdict: **LIVE** [verified-from-test-harness: connect rc=0 first attempt, MQTT control session attached; verified-on-device: RFD40 serial 24190525100255].

### Live re-verification — multi-endpoint state (2 active, 4 saved)

This is a **later capture** than the §5 paragraph above. Between the original single-endpoint §5 read and this re-verification, three endpoints were added this session via `config_endpoint` (`MGMT_EP` and `CTRL_EP` with `activate: false`; `DATA1_EP` with `activate: true` — all documented in config_endpoint.md), so the device now holds **4 saved** endpoints and **2 active** ones [verified-on-device: RFD40 serial 24190525100255]. The identical read-only request (`{ "command": "get_endpoint_config", "requestId": "abc123" }`, all-endpoints variant) was re-sent and succeeded on the first attempt.

**Envelope.** The device returned `response.code 0` ("Success"), `apiVersion "V1.1"`, and echoed `requestId "abc123"`; the payload again arrives under the key `endpointResponse` (the schema declares `epDetails` — E1 reconfirmed) [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: response/dev_mgmt/get_endpoint_config.json properties.epDetails].

**Saved vs. active — the clearest demonstration this session.** `savedEndpoints.epNames` now lists all 4: `["MDM_REMOTE", "MGMT_EP", "CTRL_EP", "DATA1_EP"]`, while `activeEndpoints.epConfig[]` carries **2 full configurations** — `MDM_REMOTE` and `DATA1_EP`, both active [verified-on-device: RFD40 serial 24190525100255]. This is the key enrichment over the original §5 capture (which had exactly 1 active config): the all-endpoints variant returns **every active endpoint's full configuration** plus the complete saved-names list. `MGMT_EP` and `CTRL_EP`, added with `activate: false`, appear **only as names** in `savedEndpoints.epNames` and get **no** config block in `activeEndpoints.epConfig[]` — making the active-vs-saved distinction directly observable: 2 active full configs vs. 4 saved names [verified-on-device: RFD40 serial 24190525100255; inferred-from-live: the two saved-only names map to the two `activate:false` adds recorded in config_endpoint.md].

Active-endpoint summaries (passwords MASKED) [verified-on-device: RFD40 serial 24190525100255]:

| Endpoint | epType | url:port | verificationType | keepAlive | cleanSession | publishTopics | subscribeTopics | eventConfiguration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `MDM_REMOTE` | MDM | 192.168.1.6:1883 | `VERIFY_NONE` | 40 | false | `MDM/clients/resp`, `MDM/clients/event`, `MDM/clients/rfid` (qos 0, retain false) | `MDM/clients/cmnd` (qos 0, retain false) | all 8 keys `false` |
| `DATA1_EP` | DATA1 | 192.168.1.6:1883 | `VERIFY_NONE` | 300 | true | `DATA/clients/data1event` (qos 1, retain false) | (none) | `firmwareUpdate/network/ntp/power/battery/fileDownload = true`; `terminalConnection/heartbeat = false` |

Both active endpoints carry `qosCommon 0`, `tenantId zebra`, `securityParams { format: PEM }`, and a present-but-masked `password`; **both** report `verificationType "VERIFY_NONE"` — E3 reconfirmed on **both** active endpoints [verified-on-device: RFD40 serial 24190525100255; verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.verificationType.enum].

**Two-part validation (multi-endpoint).**

1. **Envelope: VALID — but trivially**, for the same reason as the original §5: the device returns the payload under `endpointResponse` while the schema declares `epDetails`; with no `additionalProperties: false` and no top-level `required`, `endpointResponse` is an unvalidated extra property and the absent `epDetails` passes (E1) [verified-from-schema: response/dev_mgmt/get_endpoint_config.json; verified-on-device: RFD40 serial 24190525100255].
2. **Content: INVALID** when the `endpointResponse` content is validated against `endpointResponse.yaml` — now **10 errors (5 per active endpoint × 2)**: per endpoint the two §7 content violations recur — **E4** (`securityParams` missing its required fields; only `{ format }` present) and **E3** (`verificationType "VERIFY_NONE"` not in the schema enum) [verified-from-schema: refrence/response/epConfigurationSoti.yaml securityParams.required + configuration.properties.verificationType.enum; verified-on-device: RFD40 serial 24190525100255].

**Significance — E1's bypass SCALES with active-endpoint count.** In the original single-active capture the key mismatch masked **5** content violations; with 2 active endpoints it now masks **10**. Because the entire `endpointResponse` lands in a property the schema never validates, *every* active endpoint's config escapes validation — so the bypass impact grows linearly with the number of active endpoints [verified-from-schema: response/dev_mgmt/get_endpoint_config.json properties.epDetails; verified-on-device: RFD40 serial 24190525100255].

**Verdict: LIVE** [verified-from-test-harness: connect rc=0 first attempt, MQTT control session attached; verified-on-device: RFD40 serial 24190525100255]. The control session rode the existing active MDM channel as established in §2.

Masked multi-endpoint response JSON (both passwords masked `********`):

```json
{
  "command": "get_endpoint_config",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "endpointResponse": {
    "activeEndpoints": {
      "epConfig": [
        {
          "configuration": {
            "endpointName": "MDM_REMOTE",
            "epType": "MDM",
            "protocol": "MQTT",
            "activate": true,
            "url": "192.168.1.6",
            "verificationType": "VERIFY_NONE",
            "port": 1883,
            "qosCommon": 0,
            "tenantId": "zebra",
            "mqttParams": {
              "keepAlive": 40,
              "cleanSession": false,
              "reconnectDelayMin": 5,
              "reconnectDelayMax": 500,
              "password": "********",
              "publishTopics": [
                { "topic": "MDM/clients/resp", "qos": 0, "retain": false },
                { "topic": "MDM/clients/event", "qos": 0, "retain": false },
                { "topic": "MDM/clients/rfid", "qos": 0, "retain": false }
              ],
              "subscribeTopics": [
                { "topic": "MDM/clients/cmnd", "qos": 0, "retain": false }
              ]
            },
            "securityParams": { "format": "PEM" },
            "eventConfiguration": {
              "terminalConnection": false, "firmwareUpdate": false, "network": false, "ntp": false,
              "heartbeat": false, "power": false, "battery": false, "fileDownload": false
            }
          }
        },
        {
          "configuration": {
            "endpointName": "DATA1_EP",
            "epType": "DATA1",
            "protocol": "MQTT",
            "activate": true,
            "url": "192.168.1.6",
            "verificationType": "VERIFY_NONE",
            "port": 1883,
            "qosCommon": 0,
            "tenantId": "zebra",
            "mqttParams": {
              "keepAlive": 300,
              "cleanSession": true,
              "reconnectDelayMin": 50,
              "reconnectDelayMax": 500,
              "password": "********",
              "publishTopics": [
                { "topic": "DATA/clients/data1event", "qos": 1, "retain": false }
              ]
            },
            "securityParams": { "format": "PEM" },
            "eventConfiguration": {
              "terminalConnection": false, "firmwareUpdate": true, "network": true, "ntp": true,
              "heartbeat": false, "power": true, "battery": true, "fileDownload": true
            }
          }
        }
      ]
    },
    "savedEndpoints": { "epNames": ["MDM_REMOTE", "MGMT_EP", "CTRL_EP", "DATA1_EP"] }
  },
  "response": { "code": 0, "description": "Success" }
}
```

**Security.** This re-verification response carries **two** broker `password` fields (`MDM_REMOTE` and `DATA1_EP`); both are masked as `********` here and the real values are never printed — handle per §8 (redact in logs/tickets/screenshots, transport over secured channels) [verified-on-device: RFD40 serial 24190525100255].

## 6. Associated Error Codes

| Code | Meaning | Provenance |
| --- | --- | --- |
| 0 | Success | [verified-on-device: RFD40 serial 24190525100255] |
| 2 | Invalid payload | [verified-from-schema: refrence/response/response.yaml code table] |
| 3 | Not able to retrieve information | [verified-from-schema: refrence/response/response.yaml code table] |
| 23 | Invalid enum value | [verified-from-schema: refrence/response/response.yaml code table] |

**Honesty note:** only code `0` was observed live this session [verified-on-device: RFD40 serial 24190525100255]. Codes 2, 3, and 23 are general codes from the schema's code table and are documented strictly as schema-sourced; no command-specific trigger is asserted beyond what the table states [verified-from-schema: refrence/response/response.yaml].

## 7. Conformance & Spec Notes (this command)

**Positive:** the live read succeeded cleanly — first-attempt connect (rc=0), `code 0`, and a faithful read-back of the configured endpoint [verified-on-device: RFD40 serial 24190525100255; verified-from-test-harness: MQTT control session attached].

- **E1 — Response property name mismatch (`epDetails` vs `endpointResponse`).** `response/dev_mgmt/get_endpoint_config.json` declares the endpoint payload under property `epDetails` ($ref endpointResponse.yaml), but BOTH the schema's own examples AND the live device return the key `endpointResponse`. Because there is no `additionalProperties: false` and no `required` array, the real endpoint config is accepted as an unvalidated extra property and the declared `epDetails` validator never runs — masking the E3/E4 content violations [verified-from-schema: response/dev_mgmt/get_endpoint_config.json properties.epDetails + examples; verified-on-device: RFD40 serial 24190525100255]. **Fix:** rename the declared property to `endpointResponse` (or make the device emit `epDetails`) so the rich schema actually validates the payload.

- **E2 — Response schema has no top-level `required` array.** Nothing is required at the envelope level [verified-from-schema: response/dev_mgmt/get_endpoint_config.json]. **Fix:** add `required` (e.g. `command, requestId, apiVersion, response`).

- **E3 — `verificationType` enum omits the value the device returns.** `epConfigurationSoti.yaml` `verificationType.enum` is `[NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER]`, but the device (and the schema's own examples) return `VERIFY_NONE` [verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.verificationType.enum; verified-on-device: RFD40 serial 24190525100255]. **Fix:** add `VERIFY_NONE` to the enum (or correct the value the firmware emits).

- **E4 — `securityParams.required` overspecified vs reality.** `epConfigurationSoti.yaml` requires all of `[format, algorithm, caCertificateFile, clientCert, clientKey]`, but the device (and the schema's own examples) return `securityParams` with only `{ format }` [verified-from-schema: refrence/response/epConfigurationSoti.yaml securityParams.required; verified-on-device: RFD40 serial 24190525100255]. **Fix:** relax `required` to `[format]` (or make the other fields conditional on protocol MQTT_TLS).

- **E5 — `publishTopics`/`subscribeTopics` items require `topic` but do not declare it.** In `epConfigurationSoti.yaml` the item schemas' `required` is `[topic, qos, retain]` yet `topic` is not in the item's declared `properties` (only `qos`, `retain`). Latent: the device DOES supply `topic`, so it passes, but the property is required-yet-undeclared [verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.mqttParams.properties.publishTopics.items + subscribeTopics.items]. **Fix:** add a `topic` (string) property to the item schemas.

- **E6 — `eventConfiguration` returns 12 undeclared keys and still omits `heartbeatConfiguration`.** `cfgEventPayload.yaml` declares exactly 8 booleans (`terminalConnection/firmwareUpdate/network/heartbeat/power/battery/temperature/fileDownload`) plus the `heartbeatConfiguration` object. The latest 20-key device capture (see §4 addendum) returns all 8 declared booleans — including `temperature` (`=false`) — but adds **12 undeclared keys**: 8 extra booleans (`antenna, gpi, exceptions, ntp, userApp, cpuUsage, flashUsage, ramUsage`) and 4 integer thresholds (`cpuThreshold, ramThreshold, flashThreshold, temperatureThreshold`, all `0`), none of which appear anywhere in `cfgEventPayload.yaml`. These 12 are accepted only because the object has no `additionalProperties: false` (and no `required` array). `heartbeatConfiguration` is still **not returned** by a default read — it only appears after a `config_events` enable-all sets it (see config_events.md), so "not returned" means "not present by default", not "never returnable" [verified-from-schema: refrence/payload/cfgEventPayload.yaml; verified-on-device: RFD40 serial 24190525100255]. **Fix:** declare the intended extra keys in `cfgEventPayload.yaml`, or add `additionalProperties: false` to reject undeclared keys. **Note:** the earlier "device does NOT return `temperature`" observation no longer reproduces — `temperature=false` is present in the 20-key capture (the prior claim rested on an older 8-key capture that lacked the key).

- **E8 — Working-vs-future support split is real on the device but entirely undocumented in the schema.** The vendor confirms only the 8 schema-declared booleans (`terminalConnection, firmwareUpdate, network, heartbeat, power, battery, temperature, fileDownload`) are functional today; the other 12 returned keys (`antenna, gpi, exceptions, ntp, userApp, cpuUsage, flashUsage, ramUsage` + `cpuThreshold, ramThreshold, flashThreshold, temperatureThreshold`) are **not yet supported** ("will be supported in the future"). The split is exact — the 8 *declared* keys are precisely the 8 *working* keys, and the 12 *undeclared* keys are precisely the 12 *future* keys — yet `cfgEventPayload.yaml` neither declares the 12 keys nor flags any field as working / future / unsupported: there is no `deprecated` flag, no `x-`extension, no description annotation, and no enum to distinguish them. A consumer reading the schema therefore cannot tell which `eventConfiguration` toggles actually take effect (enabling `gpi`, `cpuUsage`, or a `*Threshold` silently does nothing) [verified-from-schema: refrence/payload/cfgEventPayload.yaml — no `additionalProperties`/`required`, no future-support annotation; vendor-stated: 8 working / 12 future]. **Fix:** declare the 12 keys when they become supported and, in the interim, annotate them (e.g. `description: "reserved — not yet supported"` or an `x-support-status` extension) so the working-vs-future boundary is documented rather than implicit.

- **E7 — `protocol` description mentions HTTP though enum excludes it.** `epConfigurationSoti.yaml` `protocol.enum` is `[MQTT, MQTT_TLS]` but its description says "such as MQTT or HTTP" [verified-from-schema: refrence/response/epConfigurationSoti.yaml configuration.properties.protocol]. **Fix:** correct the description to MQTT/MQTT_TLS.

- **E9 — `heartbeatConfiguration.userApps` is promoted by the schema's own example yet is undeclared and device-unsupported, while a rival orphan schema mandates it.** The canonical `eventConfiguration` schema `cfgEventPayload.yaml` (reached via `endpointResponse.yaml → getepCfgResponse.yaml → epConfigurationSoti.yaml.configuration.eventConfiguration $ref`, and `$ref`d directly by `config_events.json:76`) declares `heartbeatConfiguration` with **only** `{interval (integer), inventoryStatus, batteryStatus}` — **no `userApps`, no `scanStatus`** [verified-from-schema: refrence/payload/cfgEventPayload.yaml lines 31-44]. Yet `config_events.json`'s **own example #1** sends `heartbeatConfiguration.userApps: true` [verified-from-schema: commands/dev_mgmt/config_events.json examples[0] line 33; mirrored at openapi.json:1059] — an **undeclared** field the device does **not** support (operator-confirmed). It passes static validation only because `heartbeatConfiguration` sets no `additionalProperties: false`, and the device silently **drops** it on `config_events` (already tracked under config_events.md / register GAP-H-0062 + GAP-H-0064). Compounding this, the **orphan** schema `refrence/response/currentEventConfig.yaml` (referenced by nothing) models the same concept incompatibly: it names the object `heartConfiguration` (no "beat"), types `interval` as `number` (not `integer`), and **`required`s all of `[interval, inventoryStatus, scanStatus, batteryStatus, userApps]`** — making the unsupported `userApps` (and `scanStatus`) **mandatory** [verified-from-schema: refrence/response/currentEventConfig.yaml lines 31-56]. **Impact:** a consumer copying example #1 sends `heartbeatConfiguration.userApps` (silently dropped), and a `get_endpoint_config` read-back of `heartbeatConfiguration` (itself only present after a `config_events` enable — see E6/GAP-H-0092) **never includes `userApps`**, so the field can never round-trip. **Fix:** drop `userApps` from `config_events.json` example #1 (and `openapi.json:1059`); remove `userApps`+`scanStatus` from `currentEventConfig.yaml`'s `required` (or delete the orphan); reconcile the two heartbeat-config schemas onto one canonical shape (single name `heartbeatConfiguration`, `interval` as `integer`); and add `additionalProperties: false` to `heartbeatConfiguration` so undeclared/unsupported fields are rejected rather than silently accepted-and-dropped.

- **(Minor) — request `command` uses `default` instead of `example` and defines no `enum`.** [verified-from-schema: commands/dev_mgmt/get_endpoint_config.json properties.command]. **Fix:** add an `example` and/or an `enum` constraining the value to `get_endpoint_config`.

## 8. Security note — credential readback

`get_endpoint_config` reads back endpoint configuration, and the live device response **includes the broker `password` field** under `mqttParams` [verified-on-device: RFD40 serial 24190525100255]. In this document the password is masked as `********` everywhere; the real value is never printed [verified-on-device: RFD40 serial 24190525100255]. Treat the output of this command as **sensitive**: it returns broker credentials and must be redacted in logs, tickets, screenshots, and any shared artifacts. Capture, transport, and store the response over secured channels and scrub the `password` (and any `username`, where present) before distribution [inferred-from-live: handling/redaction recommendation derived from the credential field being present in the response].