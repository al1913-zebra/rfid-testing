# Event: heartbeatEVT

> **Live-capture status (read first):** No `heartbeatEVT` was captured this session despite the heartbeat being enabled and confirmed active [verified-on-device: RFD40 serial 24190525100255]. The payload shape documented below is taken from the SCHEMA example only and is labeled `[verified-from-schema]`; it is NOT a live capture [verified-from-schema: events/heartBeatEVT.json]. See Section 5 for the honest live blocker [verified-on-device: RFD40 serial 24190525100255].

## 1. Intent & Objective

`heartbeatEVT` is a device-EMITTED event: the reader publishes it on its own, without any command triggering it, to signal active status and report essential metadata such as uptime and event details [verified-from-schema: events/heartBeatEVT.json description]. The schema titles it `heartBeatEvent` [verified-from-schema: events/heartBeatEVT.json title]. It describes the event as "a heartbeat signal sent periodically from a device or system to indicate its active status and provide essential metadata like uptime and event details." [verified-from-schema: events/heartBeatEVT.json description]. Because it is device-originated, there is no request/response round-trip: the device publishes it, and a subscriber receives it [verified-from-schema: events/heartBeatEVT.json].

Emission is gated by configuration: the heartbeat must be enabled and the reporting interval set in `eventConfiguration.heartbeatConfiguration` [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration]. The device repeats the event at the interval configured in `heartbeatConfiguration.interval` (seconds) [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.interval]. The heartbeat is enabled/configured through the endpoint's `eventConfiguration` (the `heartbeat` flag plus `heartbeatConfiguration`), set via `config_events` or `config_endpoint` [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.heartbeat]. Section 4 covers the enable path [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration].

## 2. Topic Mapping (observed on-wire)

`heartbeatEVT` is a device-originated event and flows on the MDM endpoint event topic; it has no `cmnd`/`resp` topics of its own because no command produces it [verified-from-schema: events/heartBeatEVT.json]. The concrete topic where it would arrive this session was confirmed as the MDM event topic [verified-on-device: RFD40 serial 24190525100255]:

| Direction | Topic (wire form `{tenantId}/{baseTopic}/{serial}`) | Concrete topic this session |
| --- | --- | --- |
| Device-emitted event | `zebra/MDM/clients/event/<serial>` | `zebra/MDM/clients/event/RFD40-24190525100255` |

Routing notes:

- **MDM event plane.** Device-emitted events flow on the `MDM_REMOTE` `publishTopic` `MDM/clients/event`, wrapped with the tenant and serial to form `zebra/MDM/clients/event/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. This is the topic on which a `heartbeatEVT` would be published [verified-on-device: RFD40 serial 24190525100255].
- **Subscribed but none arrived.** The event topic was subscribed this session, yet no `heartbeatEVT` (indeed no device-emitted message) was received on it (see Section 5) [verified-on-device: RFD40 serial 24190525100255].

## 3. Event Payload Breakdown

> The payload shape in this section is taken from the schema, not from a live capture [verified-from-schema: events/heartBeatEVT.json].

The `heartBeatEVT.json` schema declares five top-level properties — `eventName`, `timestamp`, `eventNumber`, `upTime`, and `data` — and carries NO `required` array [verified-from-schema: events/heartBeatEVT.json properties]. None of the five properties is therefore required (see **H3**) [verified-from-schema: events/heartBeatEVT.json].

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `eventName` | string | no | example `"heartbeat"`; names the event as a heartbeat signal | [verified-from-schema: events/heartBeatEVT.json properties.eventName] |
| `timestamp` | string | no | ISO-8601; example `"2019-08-24T14:15:22Z"` | [verified-from-schema: events/heartBeatEVT.json properties.timestamp] |
| `eventNumber` | integer | no | sequence/identifier for the event; example `120` | [verified-from-schema: events/heartBeatEVT.json properties.eventNumber] |
| `upTime` | string | no | uptime duration when the event was generated; example `"5 days 4hr 3min"` | [verified-from-schema: events/heartBeatEVT.json properties.upTime] |
| `data` | object (`anyOf`) | no | `anyOf` `inventoryStatus.yaml` \| `batteryAlert.yaml`; `anyOf` permits one OR both (see **H2**) | [verified-from-schema: events/heartBeatEVT.json properties.data] |

The `data` property is an `anyOf` of two sub-schemas — `inventoryStatus` and `batteryAlert` — so the heartbeat may carry one or both sub-objects [verified-from-schema: events/heartBeatEVT.json properties.data]. Which sub-objects appear is gated by the `heartbeatConfiguration` inclusion flags (see **H4** and Section 4) [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration].

### `data.inventoryStatus` sub-fields

The `inventoryStatus` sub-schema reports the current state of the RFID inventory operation [verified-from-schema: refrence/events/inventoryStatus.yaml description]:

| Field | Type | Constraint / Notes | Locus |
| --- | --- | --- | --- |
| `rfidStatus` | string | enum `[INPROGRESS, STOPPED]`; current state of the RFID scanning process | [verified-from-schema: refrence/events/inventoryStatus.yaml properties.rfidStatus] |
| `tagCount` | integer | total number of RFID tags scanned in the current operation | [verified-from-schema: refrence/events/inventoryStatus.yaml properties.tagCount] |
| `scanCount` | integer | total number of scan attempts made during the operation | [verified-from-schema: refrence/events/inventoryStatus.yaml properties.scanCount] |

### `data.batteryAlert` sub-fields

The `batteryAlert` sub-schema reports battery status [verified-from-schema: refrence/events/batteryAlert.yaml description]:

| Field | Type | Constraint / Notes | Locus |
| --- | --- | --- | --- |
| `status` | string | enum `[LOW, CRITICAL, CHARGING, FULL, HIGH]`; current operational state of the battery | [verified-from-schema: refrence/events/batteryAlert.yaml properties.status] |
| `stateOfHealth` | string | enum `[LOW, FULL, CRITICAL, HIGH, CHARGING]`; long-term capacity/performance | [verified-from-schema: refrence/events/batteryAlert.yaml properties.stateOfHealth] |
| `chargePercentage` | integer | `maximum: 100`; current charge level as a percentage | [verified-from-schema: refrence/events/batteryAlert.yaml properties.chargePercentage] |

### Schema example (NOT a live capture)

The following is the schema's own example payload — the only concrete `heartbeatEVT` payload available this session, since none was captured live [verified-from-schema: events/heartBeatEVT.json examples]:

```json
{
  "eventName": "heartbeat",
  "timestamp": "2019-08-24T14:15:22Z",
  "eventNumber": 120,
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

The example includes BOTH `inventoryStatus` and `batteryAlert` inside `data`, even though `data` is declared as `anyOf` [verified-from-schema: events/heartBeatEVT.json examples]. This is consistent with `anyOf` semantics, where one or more of the listed sub-schemas may match (see **H2**) [verified-from-schema: events/heartBeatEVT.json properties.data]. The example omits `upTime`, which is permitted because no property is required (see **H3**) [verified-from-schema: events/heartBeatEVT.json].

## 4. Configuration (how to enable)

Heartbeat emission is enabled through the endpoint's `eventConfiguration` [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.heartbeat]. Two conditions must hold: `eventConfiguration.heartbeat` must be `true`, and `eventConfiguration.heartbeatConfiguration.interval` (integer seconds) must be greater than `0` [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.interval].

| Field | Type | Constraint / Notes | Locus |
| --- | --- | --- | --- |
| `heartbeat` | boolean | set to `true` to enable the heartbeat | [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.heartbeat] |
| `heartbeatConfiguration.interval` | integer | heartbeat interval in seconds; example `100` | [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.interval] |
| `heartbeatConfiguration.inventoryStatus` | boolean | set to `true` to include inventory status in the heartbeat message | [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.inventoryStatus] |
| `heartbeatConfiguration.batteryStatus` | boolean | set to `true` to include battery status in the heartbeat message | [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.batteryStatus] |

The `heartbeatConfiguration.inventoryStatus` and `heartbeatConfiguration.batteryStatus` booleans control whether the corresponding `data` sub-objects are included in each heartbeat (see **H4**) [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration]. The heartbeat is configured via `config_events` (or via `config_endpoint`) under `eventConfiguration` [verified-from-schema: commands/dev_mgmt/config_events.json properties.eventConfiguration]. Per the `config_events` schema description, the change applies on a device REBOOT [verified-from-schema: commands/dev_mgmt/config_events.json description]. For the full enable workflow, validation behavior, and the accept-but-drop semantics, see `config_events.md` [verified-from-schema: commands/dev_mgmt/config_events.json description].

## 5. Live Verification

> **Verdict: LIVE-CAPTURE BLOCKED, not a failure.** The enable path was accepted and confirmed and the device was healthy, yet no `heartbeatEVT` was emitted this session [verified-on-device: RFD40 serial 24190525100255]. The payload in Section 3 is therefore documented from the schema only [verified-from-schema: events/heartBeatEVT.json].

ENVIRONMENT: the heartbeat was exercised against the RFD40 over the MDM/management plane with `MDM_REMOTE` active [verified-on-device: RFD40 serial 24190525100255].

What was confirmed working:

- **Enable accepted (code 0).** A `config_events` call with `eventConfiguration.heartbeat=true` and `heartbeatConfiguration{interval:15, inventoryStatus:true, batteryStatus:true}` returned `response.code 0` "Success" [verified-on-device: RFD40 serial 24190525100255].
- **Applied by reboot.** Because `config_events` applies on reboot, a reboot was performed; it was acknowledged (`code 1`) and the device recovered in roughly 36 seconds [verified-on-device: RFD40 serial 24190525100255].
- **Config CONFIRMED via readback.** A `get_endpoint_config` readback confirmed the active `MDM_REMOTE` `eventConfiguration` carried `heartbeat=true` and `heartbeatConfiguration={interval:15, inventoryStatus:true, batteryStatus:true}` [verified-on-device: RFD40 serial 24190525100255].
- **Device healthy and responsive.** `get_status` returned `code 0` with `radioConnection=CONNECTED`, and the command responses (`config_events`, reboot, `get_status`, `get_endpoint_config`) all came through on the `resp` topics, confirming the device's publish path works [verified-on-device: RFD40 serial 24190525100255].

What was observed despite that:

- **ZERO heartbeats emitted.** Across roughly 405 seconds of cumulative listening — a 135s window before enabling, a 70s window after the enable+reboot, a 120s diagnostic window, and an 80s window after the sled was undocked from USB — on the MDM event topic AND a broker wildcard `#` subscription, zero `heartbeatEVT` events (in fact zero device-emitted messages) were captured [verified-on-device: RFD40 serial 24190525100255]. With `interval` 15s, a 120s window should have yielded multiple heartbeats had the device been emitting [inferred-from-live: at interval 15s a 120s window expects roughly 8 heartbeats].

USB-tethered hypothesis — TESTED AND REFUTED:

- During the first attempts the device was on USB power with a USB terminal connection (`powerSource=USB`, `terminalConnection.type=USB`), so USB-tethering was the initial hypothesis for the missing heartbeats [verified-on-device: RFD40 serial 24190525100255]. The sled was then UNDOCKED from USB and the capture retried: `get_status` reported `powerSource=NONE` and `terminalConnection.status=DISCONNECTED` (`type=NONE`), and a `get_endpoint_config` readback still confirmed `heartbeat=true` with `heartbeatConfiguration.interval=15` [verified-on-device: RFD40 serial 24190525100255]. An additional 80-second listen on the MDM event topic and the wildcard `#` still captured ZERO heartbeats [verified-on-device: RFD40 serial 24190525100255]. So USB-tethering is NOT the cause — undocking did not restore heartbeat emission [verified-on-device: RFD40 serial 24190525100255]. The interval value is also not the cause: the earlier enable-all configuration ran with `interval` 100s during the first 135s window and likewise produced no heartbeats [verified-on-device: RFD40 serial 24190525100255]. The actual condition gating heartbeat emission on this device is undetermined and not exposed by the API [firmware-only-unknown: the condition gating heartbeat emission is undetermined].

Conclusion: the user's troubleshooting conditions (`heartbeat=true`, `interval>0`) were MET and CONFIRMED, and the two leading hypotheses (USB-tethering and a too-small interval) were both tested and refuted, yet the device emitted no `heartbeatEVT` this session — a live-capture blocker rather than a failure, with the gating condition undetermined [verified-on-device: RFD40 serial 24190525100255]. The heartbeat payload shape is documented from the schema only and is not verified on-device [verified-from-schema: events/heartBeatEVT.json].

## 6. Associated Codes / Notes

`heartbeatEVT` is a device-emitted event and carries no response envelope and no `response.code` — those exist only on command responses, not on device-originated events [verified-from-schema: events/heartBeatEVT.json]. The `heartBeatEVT.json` schema declares no `response` object and no `code` field, so the `0..30` response-code table does not apply to the event itself [verified-from-schema: events/heartBeatEVT.json properties].

Troubleshooting note: if no heartbeats arrive, verify that `heartbeat=true` and `heartbeatConfiguration.interval>0` [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration.interval]. This session both of those were verified `true` via `get_endpoint_config`, yet no heartbeat arrived, so a correct configuration alone was not sufficient to produce emission this session (see Section 5) [verified-on-device: RFD40 serial 24190525100255].

## 7. Conformance & Spec Notes

- **H1 — `heartbeatEvents.yaml` is an EMPTY STUB.** `refrence/events/heartbeatEvents.yaml` has `examples: []` and a description but NO `properties` [verified-from-schema: refrence/events/heartbeatEvents.yaml]. A versioned duplicate `refrence/events/heartbeatEvents_new.yaml` also exists [verified-from-schema: refrence/events/heartbeatEvents_new.yaml]. Neither is referenced by `events/heartBeatEVT.json`, which instead references `inventoryStatus.yaml` and `batteryAlert.yaml` for its `data` [verified-from-schema: events/heartBeatEVT.json properties.data]. So `heartbeatEvents.yaml` and `heartbeatEvents_new.yaml` are orphan/stub schemas, not the heartbeat payload definition [verified-from-schema: refrence/events/heartbeatEvents.yaml]. **Fix:** remove the orphan stubs or wire the canonical one into `heartBeatEVT.json` [verified-from-schema: events/heartBeatEVT.json properties.data].
- **H2 — `data` is `anyOf` but the example uses BOTH.** `heartBeatEVT.json` `data` is `anyOf` `{inventoryStatus | batteryAlert}` [verified-from-schema: events/heartBeatEVT.json properties.data]. The schema example includes BOTH sub-objects, which `anyOf` permits because it matches when one or more sub-schemas match, so the example is consistent with `anyOf` [verified-from-schema: events/heartBeatEVT.json examples].
- **H3 — no `required` array on `heartBeatEVT.json`.** None of `eventName`, `timestamp`, `eventNumber`, `upTime`, or `data` is required [verified-from-schema: events/heartBeatEVT.json]. This contrasts with `dataEVT.json`, which requires `[timestamp]` [verified-from-schema: events/dataEVT.json required]. **Fix:** consider requiring at least `eventName` and `timestamp` for the heartbeat [verified-from-schema: events/heartBeatEVT.json].
- **H4 — `data` inclusions gated by `heartbeatConfiguration` flags.** Whether `inventoryStatus` and `batteryAlert` appear in a heartbeat's `data` is controlled by `heartbeatConfiguration.inventoryStatus` and `heartbeatConfiguration.batteryStatus` [verified-from-schema: refrence/payload/cfgEventPayload.yaml heartbeatConfiguration].
- **POSITIVE (not a defect).** `heartBeatEVT.json` is well-formed with a clear example and correct `$ref`s to `inventoryStatus.yaml` and `batteryAlert.yaml` [verified-from-schema: events/heartBeatEVT.json properties.data]. The enable path (`config_events` `heartbeat=true` plus `interval`) was accepted with `code 0` and confirmed in the `eventConfiguration` readback this session [verified-on-device: RFD40 serial 24190525100255].

## 8. Safety / operational note

`heartbeatEVT` is read-only telemetry: it reports device health, inventory status, and battery status, and carries no credentials, so there is nothing to mask [verified-from-schema: events/heartBeatEVT.json description]. Receiving the event is benign and changes nothing on the device [verified-from-schema: events/heartBeatEVT.json].

Enabling the heartbeat this turn DID change the device's stored `eventConfiguration`: `heartbeat` was set to `true` with `interval` 15 [verified-on-device: RFD40 serial 24190525100255]. That change is reversible by re-sending `config_events` with `heartbeat=false` (or a different interval); reversal was not exercised this session [inferred-from-live: not exercised this turn]. No credentials are present in the configuration [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties]. No credentials are present in the event payload [verified-from-schema: events/heartBeatEVT.json properties].