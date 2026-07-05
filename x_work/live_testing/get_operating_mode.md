# Command: get_operating_mode

## 1. Intent & Objective

`get_operating_mode` fetches the current RFID operating-mode configuration of the device — the active profile, radio start/stop conditions, Gen2 query parameters, select pre-filters, access operations, and tag-metadata reporting flags [verified-from-schema: commands/control/get_operating_mode.json description]. It is a **read-only** command: the request carries no settings and the device returns a snapshot of its present operating-mode state without mutating it [verified-from-schema: commands/control/get_operating_mode.json properties].

It is a **CONTROL-plane** command. It is published on the CTRL endpoint and is answered there, not on the MDM management channel, and it requires an active CTRL endpoint on the device before it will respond [verified-on-device: RFD40 serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

`get_operating_mode` is a **CONTROL command**. Its on-wire routing was established by live probing this session [verified-on-device: RFD40 serial 24190525100255]:

| Direction | Topic (wire form `{tenantId}/{baseTopic}/{serial}`) | Concrete topic this session |
| --- | --- | --- |
| Request (publish) | `zebra/CTRL/clients/cmnd/<serial>` | `zebra/CTRL/clients/cmnd/RFD40-24190525100255` |
| Response (subscribe) | `zebra/CTRL/clients/resp/<serial>` | `zebra/CTRL/clients/resp/RFD40-24190525100255` |

THE ROUTING FINDING (the key operational result of this session):

- **Not answered over MDM.** In the same session, `get_version` published over the MDM channel (`zebra/MDM/clients/cmnd/RFD40-24190525100255`) returned code 0 — proving the MDM channel was functional — but `get_operating_mode` published to the same MDM command topic produced NO response (two timeouts). The management channel does not handle control commands [verified-on-device: RFD40 serial 24190525100255].
- **Requires an active CTRL endpoint.** Initially there was no active CTRL endpoint (active = `[MDM_REMOTE(MDM), DATA1_EP(DATA1)]`; CTRL_EP was saved but inactive), and publishing to `zebra/CTRL/clients/cmnd` with no active CTRL subscriber also produced no response [verified-on-device: RFD40 serial 24190525100255].
- **CTRL_EP was activated (user-confirmed) to enable the test.** After activation, active endpoints = `[MDM_REMOTE, CTRL_EP, DATA1_EP]` (3 active; the MDM control session was preserved). The activation reproduced the `config_endpoint` activation quirk seen earlier for DATA1: attempt 1 timed out (activation delayed the ack) and the retry returned the undocumented code 101 "Error in processing command", but the state proof (`get_endpoint_config`) confirmed CTRL_EP became active [verified-on-device: RFD40 serial 24190525100255].
- **With CTRL_EP active, the command was answered.** `get_operating_mode` published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` was answered on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. Conclusion: control commands route over the CTRL endpoint and require an active CTRL endpoint [verified-from-test-harness: routing — MDM channel rejects control commands; CTRL endpoint required and must be active].

## 3. Request Payload Breakdown

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | enum `["get_operating_mode"]` | [verified-from-schema: commands/control/get_operating_mode.json properties.command.enum] |
| `requestId` | string | yes | unique identifier to correlate the response | [verified-from-schema: commands/control/get_operating_mode.json properties.requestId, required] |

The command schema is **well-formed**: `command` carries an `enum` and the file provides a top-level `examples` array — a stronger contract than most sibling command schemas [verified-from-schema: commands/control/get_operating_mode.json properties.command.enum + top-level examples].

### JSON Request Example (operator-provided, schema-validated, sent)

```json
{
  "command": "get_operating_mode",
  "requestId": "abc123"
}
```

Static verdict: **VALID** — `command` is in the enum and `requestId` is present; the request matches the command schema's example exactly [verified-from-schema: commands/control/get_operating_mode.json required + examples].

## 4. Response Payload Breakdown

Envelope. The response schema declares top-level `required = [command, requestId, apiVersion, response]` [verified-from-schema: response/control/get_operating_mode.json required].

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | echoes `get_operating_mode` | [verified-from-schema: response/control/get_operating_mode.json properties.command] |
| `requestId` | string | yes | echoes the request's `requestId` | [verified-from-schema: response/control/get_operating_mode.json properties.requestId] |
| `apiVersion` | string | yes | enum `["V1.0", "V1.1"]` | [verified-from-schema: response/control/get_operating_mode.json properties.apiVersion.enum] |
| `operatingMode` | object | no | `$ref operatingModePayload.yaml`; not in top-level required | [verified-from-schema: response/control/get_operating_mode.json properties.operatingMode] |
| `response` | object | yes | `$ref response.yaml`; requires `{code, description}` | [verified-from-schema: response/control/get_operating_mode.json properties.response + refrence/response/response.yaml required] |

`operatingMode.operatingModes.*` field table. "Present live" marks what the live RFD40 actually emitted this session [verified-on-device: RFD40 serial 24190525100255]:

| Field | Type | Present live | Notes | Locus |
| --- | --- | --- | --- | --- |
| `profiles` | string (enum) | yes (`BALANCED_PERFORMANCE`) | enum `FAST_READ, CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE, ADVANCED`; default `BALANCED_PERFORMANCE`. **O5**: `FAST_READ` is enumerated but its own description says "(Currently not supported)" | [verified-from-schema: operatingModePayload.yaml profiles.enum + description] |
| `advancedConfigurations` | object | no (absent) | only set when profile is `ADVANCED`; profile here is `BALANCED_PERFORMANCE`, so absent | [verified-from-schema: operatingModePayload.yaml advancedConfigurations.description; verified-on-device] |
| `accessOperations` | array (`$ref accessCmds.yaml`) | no (absent) | not configured this session | [verified-from-schema: operatingModePayload.yaml accessOperations; verified-on-device] |
| `radioStartConditions` | object (`$ref radioStartCondPayload.yaml`) | yes | `radioStartCondPayload.yaml` declares only `trigger`/`startDelay`/`repeat`; the device emitted exactly those three: live `{trigger: IMMEDIATE, startDelay: 0, repeat: false}` | [verified-from-schema: refrence/payload/radioStartCondPayload.yaml properties; verified-on-device] |
| `radioStopConditions` | object (`$ref radioStopCondPayload.yaml`) | yes | live `{trigger: IMMEDIATE}` | [verified-from-schema: operatingModePayload.yaml radioStopConditions; verified-on-device] |
| `query` | object (`$ref queryPayload.yaml`) | yes | declared `{session(SESSION_0..3), inventoryState(STATE_A/B/AB), slFlag(ALL/ASSERTED/DEASSERTED), tagPopulation}`. **O4**: the device agrees with `queryPayload.yaml`, not with the payload file's own example | [verified-from-schema: refrence/payload/queryPayload.yaml; verified-on-device] |
| `select` | array (`$ref selectPayload.yaml`) | no (absent) | up to 32 pre-filters; not configured this session | [verified-from-schema: operatingModePayload.yaml select; verified-on-device] |
| `tagMetaDataToEnable` | object | yes | flags per metadata field. **O2**: device emits 12 keys including `XPC` and `CRC`, which the properties do NOT declare. **O3**: properties use `SEENCOUNT` (matches device) but the example uses `SEEN_COUNT` and lists `ANTENNA` (device emits neither underscore-form nor `ANTENNA`) | [verified-from-schema: operatingModePayload.yaml tagMetaDataToEnable.properties vs examples; verified-on-device] |

### JSON Response Example (LIVE, verbatim)

```json
{
  "command": "get_operating_mode",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "operatingMode": {
    "operatingModes": {
      "profiles": "BALANCED_PERFORMANCE",
      "radioStartConditions": { "trigger": "IMMEDIATE", "startDelay": 0, "repeat": false },
      "radioStopConditions": { "trigger": "IMMEDIATE" },
      "query": { "session": "SESSION_1", "inventoryState": "STATE_A", "slFlag": "ALL", "tagPopulation": 30 },
      "tagMetaDataToEnable": { "RSSI": true, "PHASE": false, "SEENCOUNT": true, "CHANNEL": false, "PC": false,
        "XPC": false, "CRC": false, "EPC": false, "TID": false, "USER": false, "MAC": false, "HOSTNAME": false }
    }
  },
  "response": { "description": "Success" }
}
```

Validation result: **INVALID** against the response schema — the required `response.code` is MISSING (**O1**). `refrence/response/response.yaml` requires `[code, description]`, and the response schema requires `response`, so a `response` object without `code` fails validation. The `operatingMode` content itself validated structurally (`profiles` in enum; `query` fields and enums valid); the missing `response.code` was the only HARD schema-validation error — `XPC` and `CRC` are undeclared but tolerated because `additionalProperties: false` is not set (see **O2**) [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: response/control/get_operating_mode.json + refrence/response/response.yaml required].

## 5. Live Verification

ENVIRONMENT / VERDICT: laptop on Wi-Fi "Airtel_The_LAN_Before_Time"; Mosquitto broker `192.168.1.6:1883` reachable; device `192.168.1.5` reachable. Verdict: **LIVE** [verified-on-device: RFD40 serial 24190525100255 + verified-from-test-harness: broker + device reachability].

Routing discovery (replayed from Section 2):

- `get_version` over MDM returned code 0 (MDM functional), but `get_operating_mode` over the MDM command topic timed out twice — the management channel does not handle control commands [verified-on-device: RFD40 serial 24190525100255].
- Publishing to the CTRL command topic with no active CTRL subscriber produced no response [verified-on-device: RFD40 serial 24190525100255].
- After CTRL_EP was activated (user-confirmed) — active endpoints became `[MDM_REMOTE, CTRL_EP, DATA1_EP]` — `get_operating_mode` published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` was answered on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255].

Captured live operating mode [verified-on-device: RFD40 serial 24190525100255]:

- `profiles`: `BALANCED_PERFORMANCE` (the schema default) [verified-on-device + verified-from-schema: operatingModePayload.yaml profiles.default].
- `query`: `{session: SESSION_1, inventoryState: STATE_A, slFlag: ALL, tagPopulation: 30}` [verified-on-device].
- `tagMetaDataToEnable`: `RSSI: true`, `SEENCOUNT: true`, all other flags `false` [verified-on-device].
- `radioStartConditions`: `{trigger: IMMEDIATE, startDelay: 0, repeat: false}`; `radioStopConditions`: `{trigger: IMMEDIATE}` [verified-on-device].
- `advancedConfigurations`, `accessOperations`, and `select` were absent (not configured — profile is not `ADVANCED`) [verified-on-device].

Live defect and device-vs-schema findings:

- **O1** — the live `response` object is `{ "description": "Success" }` with NO `code` field, so the live response is INVALID against the response schema; success was conveyed only by `description: "Success"`. Every other command this session returned a numeric `response.code`; `get_operating_mode` uniquely omitted it [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: refrence/response/response.yaml required].
- **O2** — the device returns 12 tag-metadata keys including `XPC` and `CRC`, which `operatingModePayload.yaml` does not declare (accepted only because the schema sets no `additionalProperties: false`) [verified-on-device + verified-from-schema: operatingModePayload.yaml tagMetaDataToEnable.properties].
- **O3** — the device uses `SEENCOUNT` (matching the schema properties), but the payload file's EXAMPLE uses `SEEN_COUNT` and lists `ANTENNA`, which the device does not emit [verified-on-device + verified-from-schema: operatingModePayload.yaml examples vs properties].
- **O4** — for `query`, the device AGREES with `queryPayload.yaml` (`session`/`inventoryState`/`slFlag`/`tagPopulation`), NOT with the payload file's own example (`sel`/`target`/`session: S0`) [verified-on-device + verified-from-schema: operatingModePayload.yaml examples vs refrence/payload/queryPayload.yaml].

## 6. Associated Error Codes

IMPORTANT: this command returned **NO numeric code** this session. Success was conveyed by `response.description: "Success"` with `code` ABSENT (**O1**) [verified-on-device: RFD40 serial 24190525100255].

Schema-documented codes relevant to a read-only retrieval command [verified-from-schema: refrence/response/response.yaml code table]:

| Code | Meaning | Provenance |
| --- | --- | --- |
| 0 | Success | [verified-from-schema: refrence/response/response.yaml code table] |
| 2 | Invalid payload | [verified-from-schema: refrence/response/response.yaml code table] |
| 3 | Not able to retrieve information | [verified-from-schema: refrence/response/response.yaml code table] |

Honesty note: NO numeric code was observed live — the device omitted `code` entirely. Do NOT claim code 0 was returned; it was absent. The codes above are documented by the schema only and are labelled `[verified-from-schema]` [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: refrence/response/response.yaml].

## 7. Conformance & Spec Notes (this command)

- **O1 — `response.code` missing on-device (response is INVALID).** The live response omitted the required `response.code`, conveying success only via `description: "Success"`; this fails the response schema. This is a firmware defect, not a schema defect — the schema correctly requires `code`. Fix: have the firmware emit `response.code` (e.g. 0 for success) on `get_operating_mode` as it does for every other command this session [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: refrence/response/response.yaml required = [code, description]].
- **O2 — `tagMetaDataToEnable` emits undeclared fields.** The device returns `XPC` and `CRC`, which `operatingModePayload.yaml` does not declare (it declares only RSSI, PHASE, SEENCOUNT, CHANNEL, PC, EPC, TID, USER, MAC, HOSTNAME); they are tolerated only because `additionalProperties: false` is not set. Fix: declare `XPC` and `CRC` in `tagMetaDataToEnable.properties` [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: operatingModePayload.yaml tagMetaDataToEnable.properties].
- **O3 — `tagMetaDataToEnable` example naming inconsistency.** The device and the schema properties use `SEENCOUNT` (no underscore), but the payload file's example uses `SEEN_COUNT` and also lists `ANTENNA`, which the device does not emit and the properties do not declare. Fix: correct the example to `SEENCOUNT` and either drop `ANTENNA` or declare it consistently [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: operatingModePayload.yaml examples vs properties].
- **O4 — payload-example `query` uses wrong field names + out-of-enum value.** The payload file's example uses `query { sel, target, session: "S0", tagPopulation }`, but the referenced `queryPayload.yaml` declares `{ session(SESSION_0..3), inventoryState(STATE_A/B/AB), slFlag(ALL/ASSERTED/DEASSERTED), tagPopulation }` and the live device agrees with `queryPayload.yaml`. Fix: correct the payload example's `query` to `slFlag`/`inventoryState`/`SESSION_*` [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: operatingModePayload.yaml examples vs refrence/payload/queryPayload.yaml].
- **O5 — `profiles` enum includes an unsupported value.** `profiles.enum` includes `FAST_READ`, but its own description states "FAST_READ: ... (Currently not supported)". Fix: remove `FAST_READ` from the enum, or remove the "not supported" caveat once it is supported [verified-from-schema: operatingModePayload.yaml profiles.enum + description].
- **O6 — response-schema example contains an undeclared `radioStartConditions.periodicDuration`.** The `get_operating_mode` response-schema example sets `radioStartConditions: {trigger, startDelay, periodicDuration: 0, repeat}`, but `radioStartCondPayload.yaml` declares only `trigger`, `startDelay`, and `repeat` — `periodicDuration` is not a property of `radioStartConditions`. The live device did NOT emit `periodicDuration`; it emitted exactly the three declared fields, so this is a schema-example defect, not a device omission. Fix: remove `periodicDuration` from the response-schema example (or declare it in `radioStartCondPayload.yaml` if it is intended) [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: response/control/get_operating_mode.json examples vs refrence/payload/radioStartCondPayload.yaml properties].
- **POSITIVE (not a defect).** The command schema is well-formed — `command` has `enum ["get_operating_mode"]` plus a top-level `examples` array — and the response schema declares a full top-level `required = [command, requestId, apiVersion, response]`. The O1 defect is the firmware omitting `code`, not the schema [verified-from-schema: commands/control/get_operating_mode.json + response/control/get_operating_mode.json required].

## 8. Routing / operational note — control-plane via CTRL

`get_operating_mode` is a control-plane command: control commands **require an active CTRL endpoint** and are **not answered over the MDM channel** [verified-on-device: RFD40 serial 24190525100255]. This was demonstrated this session — `get_version` over MDM returned code 0 while `get_operating_mode` over MDM timed out twice, and CTRL-topic publishes were silent until a CTRL subscriber was active [verified-on-device + verified-from-test-harness: routing].

State note: to run this test, CTRL_EP was activated (user-confirmed) via `config_endpoint` operation=update with `activate: true`. The device now has 3 active endpoints `[MDM_REMOTE, CTRL_EP, DATA1_EP]` — a left-behind, user-approved state change. It is revertible: `config_endpoint` operation=update with `activate: false` on CTRL_EP restores a 2-active baseline if desired [verified-on-device: RFD40 serial 24190525100255].

Security: `get_operating_mode` carries no credentials in either the request or the response (RFID configuration only); there is nothing to mask [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: commands/control/get_operating_mode.json + response/control/get_operating_mode.json].