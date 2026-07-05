# Command: config_events

## 1. Intent & Objective

`config_events` enables or disables which device management events the device emits — terminal connection, firmware update, network, heartbeat, power, battery, temperature, file download, and related telemetry — and configures heartbeat reporting plus alert thresholds [verified-from-schema: refrence/payload/cfgEventPayload.yaml description]. The command schema describes it as "Enables or disables specific device events. To apply the changes, a device reboot is required." [verified-from-schema: commands/dev_mgmt/config_events.json description]. This document covers the **enable-ALL-events** operation, in which every event flag in the operator payload is set to `true` [verified-on-device: RFD40 serial 24190525100255].

It is a **DEV_MGMT** command: it routes over the MDM/management plane rather than the control plane [verified-on-device: RFD40 serial 24190525100255]. The command is published on the MDM `cmnd` topic and answered on the MDM `resp` topic, and once the configured events are active they flow on the MDM `event` topic [verified-on-device: RFD40 serial 24190525100255]. This session the `MDM_REMOTE` endpoint was active and carried the command [verified-on-device: RFD40 serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

`config_events` is a **DEV_MGMT / MDM-plane command** and was exercised over the MDM endpoint this session [verified-on-device: RFD40 serial 24190525100255]:

| Direction | Topic (wire form `{tenantId}/{baseTopic}/{serial}`) | Concrete topic this session |
| --- | --- | --- |
| Request (publish) | `zebra/MDM/clients/cmnd/<serial>` | `zebra/MDM/clients/cmnd/RFD40-24190525100255` |
| Response (subscribe) | `zebra/MDM/clients/resp/<serial>` | `zebra/MDM/clients/resp/RFD40-24190525100255` |
| Device-emitted events | `zebra/MDM/clients/event/<serial>` | `zebra/MDM/clients/event/RFD40-24190525100255` |

Routing notes:

- **Answered over MDM.** The request published to `zebra/MDM/clients/cmnd/RFD40-24190525100255` was answered on `zebra/MDM/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. This is MDM/management-plane routing, not control-plane routing [verified-on-device: RFD40 serial 24190525100255].
- **Events flow on the MDM event topic.** Once the configured events become active, the device emits them on `zebra/MDM/clients/event/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. This session no events were captured in a 6-second window after the set (see Section 5) [verified-on-device: RFD40 serial 24190525100255].
- **Deployment topology context.** This session the deployment held four SAVED endpoints `[MDM_REMOTE, MGMT_EP, CTRL_EP, DATA1_EP]`, of which three were ACTIVE — `[MDM_REMOTE, CTRL_EP, DATA1_EP]` — while `MGMT_EP` was saved-only (`activate: false` honored) [verified-on-device: RFD40 serial 24190525100255]. The CONTROL-routing/deployment context for this session is recorded by the harness [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The `config_events` command rode the active `MDM_REMOTE` channel [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

The command schema declares three top-level properties — `command`, `requestId`, and `eventConfiguration` — and a top-level `required` array `[command, requestId]` [verified-from-schema: commands/dev_mgmt/config_events.json properties, required].

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | example `"config_events"`; NO `enum` constraint (see **C1**) | [verified-from-schema: commands/dev_mgmt/config_events.json properties.command] |
| `requestId` | string | yes | unique identifier used to correlate the response | [verified-from-schema: commands/dev_mgmt/config_events.json properties.requestId, required] |
| `eventConfiguration` | object | no (per command schema) | `$ref refrence/payload/cfgEventPayload.yaml`; carries the event flags, heartbeat config, and thresholds | [verified-from-schema: commands/dev_mgmt/config_events.json properties.eventConfiguration] |

The `command` property carries only an `example` and NO `enum`, so any string satisfies static validation for `command` (see **C1**) [verified-from-schema: commands/dev_mgmt/config_events.json properties.command]. This is the same weaker-validation class as `get_post_filter` **F1** [inferred-from-live: cross-doc class comparison with get_post_filter F1].

### `eventConfiguration` fields DECLARED by the payload schema

The referenced payload schema `cfgEventPayload.yaml` declares exactly eight boolean flags plus a `heartbeatConfiguration` object, and carries NO `required` array and NO `additionalProperties: false` [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties]:

| Field | Type | Constraint / Notes | Locus |
| --- | --- | --- | --- |
| `terminalConnection` | boolean | set to true to enable terminal connection/disconnection events | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.terminalConnection] |
| `firmwareUpdate` | boolean | set to true to enable firmware update events | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.firmwareUpdate] |
| `network` | boolean | set to true to enable network events | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.network] |
| `heartbeat` | boolean | set to true to enable heartbeat | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.heartbeat] |
| `power` | boolean | set to true to enable power source alerts | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.power] |
| `battery` | boolean | set to true to enable battery alerts | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.battery] |
| `temperature` | boolean | set to true to enable temperature alerts | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.temperature] |
| `fileDownload` | boolean | set to true to enable file download alerts | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.fileDownload] |
| `heartbeatConfiguration.interval` | integer | "heart beat interval in seconds"; example `100` | [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.interval] |
| `heartbeatConfiguration.inventoryStatus` | boolean | set to true to include inventory status in the heartbeat message | [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.inventoryStatus] |
| `heartbeatConfiguration.batteryStatus` | boolean | set to true to include battery status in the heartbeat message | [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.batteryStatus] |

### Fields present in the command example but UNDECLARED by the payload schema (C3)

The command's own example #1 (identical to the operator payload below) carries thirteen additional fields that `cfgEventPayload.yaml` does NOT declare [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties vs commands/dev_mgmt/config_events.json examples[0]]. These are the eight extra boolean flags `antenna`, `gpi`, `exceptions`, `ntp`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`; the four thresholds `cpuThreshold`, `ramThreshold`, `flashThreshold`, `temperatureThreshold`; and `heartbeatConfiguration.userApps` [verified-from-schema: commands/dev_mgmt/config_events.json examples[0]]. They pass static validation only because the payload schema sets no `additionalProperties: false` (see **C3**) [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties].

### JSON Request Example (operator-provided, schema-validated, sent — enable ALL)

```json
{
  "command": "config_events",
  "requestId": "abc123",
  "eventConfiguration": {
    "antenna": true,
    "terminalConnection": true,
    "firmwareUpdate": true,
    "gpi": true,
    "network": true,
    "exceptions": true,
    "ntp": true,
    "userApp": true,
    "heartbeat": true,
    "power": true,
    "battery": true,
    "temperature": true,
    "fileDownload": true,
    "cpuUsage": true,
    "flashUsage": true,
    "ramUsage": true,
    "heartbeatConfiguration": {
      "interval": 100,
      "inventoryStatus": true,
      "batteryStatus": true,
      "userApps": true
    },
    "cpuThreshold": 80,
    "ramThreshold": 80,
    "flashThreshold": 80,
    "temperatureThreshold": 55
  }
}
```

This payload carries 24 fields in `eventConfiguration`: 16 top-level boolean flags, `heartbeatConfiguration{interval, inventoryStatus, batteryStatus, userApps}`, and 4 thresholds [verified-from-schema: commands/dev_mgmt/config_events.json examples[0]]. It is identical to the command schema's example #1 [verified-from-schema: commands/dev_mgmt/config_events.json examples[0]]. The `requestId` value `abc123` is operator-supplied [verified-on-device: RFD40 serial 24190525100255].

**Static verdict: VALID** — `command` and `requestId` are both present, and the payload validates against `cfgEventPayload.yaml` because that schema declares no `additionalProperties: false`, so the thirteen undeclared fields are accepted as extra properties (see **C3**) [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties]. The `command` value is not enum-constrained, so it passes static validation regardless of its string content (see **C1**) [verified-from-schema: commands/dev_mgmt/config_events.json properties.command]. A second example in the command schema (example #2) is a selective set in which `antenna`, `gpi`, `exceptions`, `ntp`, `userApp`, `heartbeat`, `cpuUsage`, `flashUsage`, and `ramUsage` are `false` with the others `true` and NO `heartbeatConfiguration`; it was not exercised this session [verified-from-schema: commands/dev_mgmt/config_events.json examples[1]].

## 4. Response Payload Breakdown

The response is a **status-only envelope** — there is no echoed event payload, just the result status [verified-on-device: RFD40 serial 24190525100255].

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | echoes `config_events` | [verified-from-schema: response/dev_mgmt/config_events.json properties.command, required] |
| `requestId` | string | yes | echoes the request's `requestId` | [verified-from-schema: response/dev_mgmt/config_events.json properties.requestId, required] |
| `apiVersion` | string | yes | enum `["V1.0", "V1.1"]` | [verified-from-schema: response/dev_mgmt/config_events.json properties.apiVersion.enum, required] |
| `response` | object | yes | `$ref response.yaml`; the referenced schema requires `[code, description]` | [verified-from-schema: response/dev_mgmt/config_events.json properties.response, required] |

The response schema declares the full top-level `required` array `[command, requestId, apiVersion, response]` (a POSITIVE — unlike the no-top-level-required class of `get_post_filter` **F2**) [verified-from-schema: response/dev_mgmt/config_events.json required]. The referenced `response.yaml` schema separately requires `[code, description]` [verified-from-schema: refrence/response/response.yaml required]. The response schema's example is `{command: "config_events", requestId: "abc123", apiVersion: "V1.1", response: {code: 0, description: "Success"}}` [verified-from-schema: response/dev_mgmt/config_events.json examples].

The response schema file is titled `cfgAlertResponse` even though it is the `config_events` response — a copy-paste title collision (see **C2**) [verified-from-schema: response/dev_mgmt/config_events.json title].

### JSON Response Example (LIVE, verbatim)

```json
{"command":"config_events","requestId":"abc123","apiVersion":"V1.1","response":{"code":0,"description":"Success"}}
```

The live response carried four top-level keys: `command`, `requestId`, `apiVersion`, and `response` [verified-on-device: RFD40 serial 24190525100255]. The `apiVersion` value `V1.1` is in the declared enum [verified-from-schema: response/dev_mgmt/config_events.json properties.apiVersion.enum]. The `response` object was `{"code":0,"description":"Success"}` with `code` PRESENT [verified-on-device: RFD40 serial 24190525100255]. This DEV_MGMT success **includes** `response.code` (code 0), in CONTRAST to the control-plane commands `get_operating_mode`/`set_operating_mode` (**O1**/**P7**), `get_post_filter`/`set_post_filter`, and `control_operation`, which OMIT `response.code` on success (see **L2**) [inferred-from-live: cross-doc contrast with the control-plane omit-code-on-success commands].

**Validation result: VALID.** In the live envelope `apiVersion "V1.1"` is in the enum `[V1.0, V1.1]` and `response.code 0` is within `0..30` [verified-from-schema: response/dev_mgmt/config_events.json]. The referenced `response.yaml`'s required `[code, description]` are both present in the live response object [verified-from-schema: refrence/response/response.yaml required].

## 5. Live Verification

ENVIRONMENT / VERDICT: the command was exercised against the RFD40 over the MDM/management plane with `MDM_REMOTE` active [verified-on-device: RFD40 serial 24190525100255]. Verdict: **LIVE** [verified-on-device: RFD40 serial 24190525100255]. It is a state-changing but benign telemetry-configuration command [verified-on-device: RFD40 serial 24190525100255].

The request was published to `zebra/MDM/clients/cmnd/RFD40-24190525100255` and the response was read on `zebra/MDM/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. The verbatim live response was:

```json
{"command":"config_events","requestId":"abc123","apiVersion":"V1.1","response":{"code":0,"description":"Success"}}
```

### BEFORE / AFTER `MDM_REMOTE` eventConfiguration diff (via `get_endpoint_config`)

The change was confirmed by a before/after read with `get_endpoint_config` on the `MDM_REMOTE` endpoint [verified-on-device: RFD40 serial 24190525100255]:

| Field | BEFORE | AFTER | Change |
| --- | --- | --- | --- |
| `terminalConnection` | `false` | `true` | flipped to true |
| `firmwareUpdate` | `false` | `true` | flipped to true |
| `network` | `false` | `true` | flipped to true |
| `ntp` | `false` | `true` | flipped to true |
| `heartbeat` | `false` | `true` | flipped to true |
| `power` | `false` | `true` | flipped to true |
| `battery` | `false` | `true` | flipped to true |
| `temperature` | (absent) | `true` | appeared, set true |
| `fileDownload` | `false` | `true` | flipped to true |
| `heartbeatConfiguration` | (absent) | `{interval:100, inventoryStatus:true, batteryStatus:true}` | appeared |

The BEFORE readback showed `MDM_REMOTE` eventConfiguration `{terminalConnection:false, firmwareUpdate:false, network:false, ntp:false, heartbeat:false, power:false, battery:false, fileDownload:false}` with no `temperature` key and no `heartbeatConfiguration` [verified-on-device: RFD40 serial 24190525100255]. The AFTER readback showed `MDM_REMOTE` eventConfiguration `{terminalConnection:true, firmwareUpdate:true, network:true, ntp:true, heartbeat:true, power:true, battery:true, temperature:true, fileDownload:true, heartbeatConfiguration:{interval:100, inventoryStatus:true, batteryStatus:true}}` [verified-on-device: RFD40 serial 24190525100255]. The `MDM_REMOTE` eventConfiguration therefore CHANGED IMMEDIATELY (pre-reboot): all flags flipped to true, and `temperature` plus `heartbeatConfiguration` appeared [verified-on-device: RFD40 serial 24190525100255].

### Submitted vs. stored (accept-but-drop — L5)

The device accepted the full 24-field enable-all payload with `code 0` but STORED ONLY a subset; the readback below marks each field stored, dropped, or undeclared [verified-on-device: RFD40 serial 24190525100255]:

| Submitted field | Submitted value | In payload schema? | Stored in readback? |
| --- | --- | --- | --- |
| `terminalConnection` | `true` | declared | STORED (`true`) |
| `firmwareUpdate` | `true` | declared | STORED (`true`) |
| `network` | `true` | declared | STORED (`true`) |
| `heartbeat` | `true` | declared | STORED (`true`) |
| `power` | `true` | declared | STORED (`true`) |
| `battery` | `true` | declared | STORED (`true`) |
| `temperature` | `true` | declared | STORED (`true`) |
| `fileDownload` | `true` | declared | STORED (`true`) |
| `ntp` | `true` | UNDECLARED | STORED (`true`) — see **L6** |
| `heartbeatConfiguration.interval` | `100` | declared | STORED (`100`) |
| `heartbeatConfiguration.inventoryStatus` | `true` | declared | STORED (`true`) |
| `heartbeatConfiguration.batteryStatus` | `true` | declared | STORED (`true`) |
| `antenna` | `true` | UNDECLARED | DROPPED |
| `gpi` | `true` | UNDECLARED | DROPPED |
| `exceptions` | `true` | UNDECLARED | DROPPED |
| `userApp` | `true` | UNDECLARED | DROPPED |
| `cpuUsage` | `true` | UNDECLARED | DROPPED |
| `flashUsage` | `true` | UNDECLARED | DROPPED |
| `ramUsage` | `true` | UNDECLARED | DROPPED |
| `cpuThreshold` | `80` | UNDECLARED | DROPPED |
| `ramThreshold` | `80` | UNDECLARED | DROPPED |
| `flashThreshold` | `80` | UNDECLARED | DROPPED |
| `temperatureThreshold` | `55` | UNDECLARED | DROPPED |
| `heartbeatConfiguration.userApps` | `true` | UNDECLARED | DROPPED |

Findings:

- **L1 — DEV_MGMT routing.** `config_events` was published on `zebra/MDM/clients/cmnd` and answered on `zebra/MDM/clients/resp`; it is an MDM/management command, not a control-plane command [verified-on-device: RFD40 serial 24190525100255].
- **L2 — SUCCESS INCLUDES `response.code` (code 0).** The live success returned `{code:0, description:"Success"}` with `code` PRESENT [verified-on-device: RFD40 serial 24190525100255]. This DEV_MGMT success-includes-code behavior CONTRASTS with the control-plane commands that omit `code` on success (`get_operating_mode` **O1**, `set_operating_mode` **P7**, `control_operation`, `get_post_filter`, `set_post_filter`) [inferred-from-live: cross-doc contrast with the control-plane omit-code-on-success commands].
- **L3 — STORED immediately, EMISSION on reboot.** The `get_endpoint_config` readback showed `MDM_REMOTE` eventConfiguration changed IMMEDIATELY (pre-reboot), and no MDM events were emitted in a 6-second window [verified-on-device: RFD40 serial 24190525100255]. The command description states a reboot is required to APPLY the changes, so the config is STORED immediately while event EMISSION/activation takes effect on reboot [verified-from-schema: commands/dev_mgmt/config_events.json description].
- **L4 — Targets the MDM/management endpoint.** Only `MDM_REMOTE`'s eventConfiguration changed; the other active endpoints `CTRL_EP` and `DATA1_EP` retained the eventConfiguration set when created via `config_endpoint`, confirming `config_events` configures the events of the MDM/management endpoint on which it is received [verified-on-device: RFD40 serial 24190525100255].
- **L5 — Accept-but-drop (subset stored).** The device accepted the full 24-field enable-all payload with `code 0` but STORED ONLY the subset `{terminalConnection, firmwareUpdate, network, ntp, heartbeat, power, battery, temperature, fileDownload}` plus `heartbeatConfiguration{interval, inventoryStatus, batteryStatus}`, and SILENTLY DROPPED `antenna`, `gpi`, `exceptions`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`, the four thresholds (`cpuThreshold`/`ramThreshold`/`flashThreshold`/`temperatureThreshold`), and `heartbeatConfiguration.userApps` — none of which appear in the readback [verified-on-device: RFD40 serial 24190525100255].
- **L6 — `ntp` STORED but UNDECLARED.** The device stored `ntp:true`, so the firmware supports an `ntp` event flag [verified-on-device: RFD40 serial 24190525100255]. `ntp` is NOT a declared property of `cfgEventPayload.yaml`, which declares 8 flags and no `ntp` [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties].

So enabling "ALL" enabled only the SUPPORTED subset; callers must read back with `get_endpoint_config` to learn what actually applied [verified-on-device: RFD40 serial 24190525100255]. The other active endpoints `CTRL_EP` and `DATA1_EP` retained the eventConfiguration set when they were created via `config_endpoint` and were unchanged by `config_events` [verified-on-device: RFD40 serial 24190525100255].

### Selective worked example (example #2 — NOT all events)

A second run exercised the command schema's selective example (`examples[1]`), enabling `{terminalConnection, firmwareUpdate, network, power, battery, temperature, fileDownload}` and disabling `{antenna, gpi, exceptions, ntp, userApp, heartbeat, cpuUsage, flashUsage, ramUsage}`, with NO `heartbeatConfiguration` and NO thresholds (unlike the enable-all payload of §5) [verified-from-schema: commands/dev_mgmt/config_events.json examples[1]]. **Static verdict: VALID.** The example declares exactly 8 booleans (`terminalConnection`, `firmwareUpdate`, `network`, `heartbeat`, `power`, `battery`, `temperature`, `fileDownload`), all of correct type [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties]. The 8 undeclared booleans (`antenna`, `gpi`, `exceptions`, `ntp`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`) pass validation only because `cfgEventPayload.yaml` sets no `additionalProperties: false` (cross-ref **C3**) [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties].

**Recovery context (honest).** After a power outage that acted as a reboot and APPLIED the previously-staged enable-all config, `config_events` became unresponsive — it returned NO RESPONSE across multiple attempts (incl. 3×20s) while `get_version`, `get_status`, `get_current_region`, and `get_endpoint_config` all returned `code 0`, a `config_events`-specific hang [verified-on-device: RFD40 serial 24190525100255]. A user-approved reboot was acknowledged (`code 1`, "Command payload is accepted"), the device went down (~+32s) and recovered (~+45s) with endpoints restored `[MDM_REMOTE, CTRL_EP, DATA1_EP]`, after which `config_events` responded normally (`code 0`) [verified-on-device: RFD40 serial 24190525100255]. The selective run below is the post-recovery run [verified-on-device: RFD40 serial 24190525100255].

**Live response (verbatim).**

```json
{"command":"config_events","requestId":"abc123","apiVersion":"V1.1","response":{"code":0,"description":"Success"}}
```

The selective `config_events` returned `{code:0, description:"Success"}` with `code` PRESENT, the same DEV_MGMT include-code-on-success behavior as the enable-all run (cross-ref **L2**) [verified-on-device: RFD40 serial 24190525100255].

**BEFORE → AFTER `MDM_REMOTE` eventConfiguration diff (via `get_endpoint_config`) — REPLACE semantics.** The post-reboot BEFORE readback was the ENABLE-ALL set, because the reboot re-applied the stored enable-all config (config persists across reboot; cross-ref **C5**) [verified-on-device: RFD40 serial 24190525100255]:

| Field | BEFORE (post-reboot enable-all) | AFTER (selective applied) | Change |
| --- | --- | --- | --- |
| `terminalConnection` | `true` | `true` | unchanged |
| `firmwareUpdate` | `true` | `true` | unchanged |
| `network` | `true` | `true` | unchanged |
| `ntp` | `true` | `false` | flipped to false |
| `heartbeat` | `true` | `false` | flipped to false |
| `power` | `true` | `true` | unchanged |
| `battery` | `true` | `true` | unchanged |
| `temperature` | `true` | `true` | unchanged |
| `fileDownload` | `true` | `true` | unchanged |
| `heartbeatConfiguration` | `{interval:100, inventoryStatus:true, batteryStatus:true}` | (absent) | REMOVED |

**SEL1 — SUCCESS code 0.** The selective config returned `{code:0, description:"Success"}` with `code` PRESENT, matching the enable-all DEV_MGMT include-code-on-success (cross-ref **L2**) [verified-on-device: RFD40 serial 24190525100255].

**SEL2 — PER-FLAG selective applied.** The readback reflects each submitted value for the supported flags: the seven enabled (`terminalConnection`, `firmwareUpdate`, `network`, `power`, `battery`, `temperature`, `fileDownload`) are `true` and the two disabled (`ntp`, `heartbeat`) are `false` [verified-on-device: RFD40 serial 24190525100255].

**SEL3 — REPLACE, not merge.** The BEFORE eventConfiguration carried `heartbeatConfiguration{interval:100, ...}`, the selective payload OMITTED `heartbeatConfiguration` (and set `heartbeat:false`), and the AFTER readback has NO `heartbeatConfiguration` at all — so `config_events` FULLY REPLACES the MDM endpoint's eventConfiguration rather than field-merging it [verified-on-device: RFD40 serial 24190525100255]. This contrasts with `set_operating_mode`, which merges partial sets [inferred-from-live: cross-command contrast — set_operating_mode partial sets merge, config_events replaces].

**SEL4 — `ntp:false` STORED.** The device stored `ntp:false`, whereas the enable-all run stored `ntp:true`, confirming the firmware fully models an `ntp` event flag in both states (cross-ref **L6** / **C3**, where `cfgEventPayload.yaml` is shown not to declare `ntp`) [verified-on-device: RFD40 serial 24190525100255].

**SEL5 — ACCEPT-BUT-DROP reconfirmed.** The device accepted the payload (`code 0`) but stored none of the seven undeclared/unsupported extras (`antenna`, `gpi`, `exceptions`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`) — they are absent from the readback, the same accept-but-drop behavior as the enable-all run (cross-ref **L5** / **C4**) [verified-on-device: RFD40 serial 24190525100255].

**Coverage caveat.** Both the enable-all set and the selective set (example #2) were exercised over MDM with `MDM_REMOTE` active [verified-on-device: RFD40 serial 24190525100255]. Live event EMISSION (heartbeat/alerts flowing on the MDM event topic) was still NOT observed this session, since the heartbeat interval is 100s and no dedicated emission-capture window was run, so only the stored config was read back [verified-on-device: RFD40 serial 24190525100255]. Per the command description, event emission activates on reboot [verified-from-schema: commands/dev_mgmt/config_events.json description]. The error codes 2 and 23 were NOT exercised [verified-from-schema: refrence/response/response.yaml code table].

## 6. Associated Error Codes

| Code | Meaning | Provenance |
| --- | --- | --- |
| 0 | Success | [verified-on-device: RFD40 serial 24190525100255] |
| 2 | Invalid payload | [verified-from-schema: refrence/response/response.yaml code table] |
| 23 | Invalid enum value | [verified-from-schema: refrence/response/response.yaml code table] |

**Honesty note:** only code `0` was observed live this session, and it was PRESENT in the response (`response.code 0`) [verified-on-device: RFD40 serial 24190525100255]. Code `2` (Invalid payload) is a hypothesis for a malformed payload and was NOT exercised [verified-from-schema: refrence/response/response.yaml code table]. Code `23` (Invalid enum value) is a hypothesis and was NOT exercised [verified-from-schema: refrence/response/response.yaml code table].

## 7. Conformance & Spec Notes (this command)

- **C1 — `command` is NOT enum-constrained.** The `command` property in `config_events.json` carries only an `example` and no `enum`, so any string passes static validation for `command` [verified-from-schema: commands/dev_mgmt/config_events.json properties.command]. This is the same weaker-validation class as `get_post_filter` **F1** [inferred-from-live: cross-doc class comparison with get_post_filter F1]. **Fix:** add `enum ["config_events"]` to the command property [verified-from-schema: commands/dev_mgmt/config_events.json properties.command].
- **C2 — Response title mismatch.** `response/dev_mgmt/config_events.json` is titled `cfgAlertResponse` though it is the `config_events` response — a copy-paste title collision [verified-from-schema: response/dev_mgmt/config_events.json title]. **Fix:** retitle it (e.g. `config_events_response`) [verified-from-schema: response/dev_mgmt/config_events.json title].
- **C3 — `eventConfiguration` schema UNDER-declares its own command example.** `cfgEventPayload.yaml` declares only 8 booleans plus `heartbeatConfiguration{interval, inventoryStatus, batteryStatus}`, but the command's example #1 (and the operator payload) carry 13 additional fields — `antenna`, `gpi`, `exceptions`, `ntp`, `userApp`, `cpuUsage`, `flashUsage`, `ramUsage`, `cpuThreshold`, `ramThreshold`, `flashThreshold`, `temperatureThreshold`, and `heartbeatConfiguration.userApps` — that the payload schema does not declare [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties vs commands/dev_mgmt/config_events.json examples[0]]. They pass validation only because there is no `additionalProperties: false` [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties]. **Fix:** declare the device-supported fields (notably `ntp`, which the device stores) and either declare or remove the unsupported ones [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties].
- **C4 — (behavior) accept-but-drop unsupported fields.** The device accepts undeclared/unsupported fields with `code 0` but silently drops them, storing only the supported subset (per **L5**), rather than rejecting the over-spec'd payload [verified-on-device: RFD40 serial 24190525100255]. **Fix:** document the supported field set, and consider rejecting or warning on unsupported fields [verified-on-device: RFD40 serial 24190525100255].
- **C5 — (behavior) stored immediately, applied on reboot.** The stored eventConfiguration updates immediately in `get_endpoint_config`, but per the description a reboot is required for the change to take effect (event emission) [verified-on-device: RFD40 serial 24190525100255]. Callers should not assume events are live until after a reboot [verified-from-schema: commands/dev_mgmt/config_events.json description].
- **POSITIVE (not a defect).** The response schema declares the full top-level `required [command, requestId, apiVersion, response]` [verified-from-schema: response/dev_mgmt/config_events.json required]. The command schema declares `required [command, requestId]` [verified-from-schema: commands/dev_mgmt/config_events.json required]. On the wire, `config_events` was accepted with the documented in-range code `0`, and the supported event set was correctly stored and reflected in `get_endpoint_config` [verified-on-device: RFD40 serial 24190525100255].

## 8. Safety / operational note

`config_events` is a **benign telemetry-configuration** command: it toggles which device-management events are emitted and configures heartbeat reporting and alert thresholds, and carries no credentials in either the request or the response — only event flags and thresholds — so there is nothing to mask [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties]. It is state-changing [verified-on-device: RFD40 serial 24190525100255]. Re-sending `config_events` with the desired flags would restore a prior configuration; restoration was not exercised this session [inferred-from-live: not exercised this turn].

The change is STORED immediately but activates on REBOOT [verified-on-device: RFD40 serial 24190525100255]. The command description states a device reboot is required to apply the changes, and no reboot was performed this turn, so live event emission was not observed [verified-from-schema: commands/dev_mgmt/config_events.json description]. The device is now configured (stored) to emit the supported event set after the next reboot [verified-on-device: RFD40 serial 24190525100255].

It is a DEV_MGMT command: it routes over the MDM/management endpoint and configures the events of the MDM endpoint on which it is received, leaving other endpoints' event configuration untouched [verified-on-device: RFD40 serial 24190525100255]. This session the MDM endpoint was active among the three active endpoints `[MDM_REMOTE, CTRL_EP, DATA1_EP]`, with `MGMT_EP` saved-only out of four saved endpoints `[MDM_REMOTE, MGMT_EP, CTRL_EP, DATA1_EP]` [verified-on-device: RFD40 serial 24190525100255].
