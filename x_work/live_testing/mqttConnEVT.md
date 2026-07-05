# Event: mqttConnEVT

> **Live-capture status (read first):** A reboot-triggered connection-state transition was captured live this session, yielding three `mqttConnEVT` messages — one `DISCONNECTED` and two `CONNECTED` [verified-on-device: RFD40 serial 24190525100255]. The verbatim live payloads carry `apiVersion` as the JSON number `1.21` and `mqttVersion` as the JSON number `3.0999999`, which are reproduced unmodified below [verified-on-device: RFD40 serial 24190525100255]. The schema field declarations and examples are taken from the schema file and are labeled `[verified-from-schema]`, kept separate from the live captures [verified-from-schema: events/mqttConnEVT.json].

## 1. Intent & Objective

`mqttConnEVT` is a device-EMITTED event: the device publishes it automatically whenever the MQTT endpoint connection state changes, without any command triggering it [verified-on-device: RFD40 serial 24190525100255]. The event conveys the endpoint connectivity state, which is one of `CONNECTED` or `DISCONNECTED` [verified-from-schema: events/mqttConnEVT.json properties.connectionState]. It also carries device identity in the form of `deviceModel` and `deviceSerialNo` [verified-from-schema: events/mqttConnEVT.json properties]. It additionally carries version metadata in the form of `apiVersion` and `mqttVersion` [verified-from-schema: events/mqttConnEVT.json properties]. The schema describes the event as providing "details about the connection state of a device, including its metadata and protocol versions." [verified-from-schema: events/mqttConnEVT.json description].

Because it is device-originated, there is no request/response round-trip: the device publishes it and a subscriber receives it [verified-on-device: RFD40 serial 24190525100255]. The live `DISCONNECTED` event arrived after the device session dropped, with no `timestamp` field [verified-on-device: RFD40 serial 24190525100255]. This pattern is consistent with an MQTT Last-Will message published by the broker on session loss [inferred-from-live: DISCONNECTED arrived ~26s after the reboot ack with no timestamp]. The live `CONNECTED` events arrived on reconnect, each carrying its own timestamp [verified-on-device: RFD40 serial 24190525100255]. This pattern is consistent with a birth message the device publishes on (re)connect [inferred-from-live: CONNECTED events followed the DISCONNECTED on reconnect]. Use it to monitor endpoint connectivity transitions [verified-from-schema: events/mqttConnEVT.json description]. Use it to detect reconnect and disconnect events [verified-on-device: RFD40 serial 24190525100255]. Use it to correlate connection state with the device identity and version metadata it carries [verified-from-schema: events/mqttConnEVT.json properties].

## 2. Topic Mapping (observed on-wire)

`mqttConnEVT` is a device-originated event and has no `cmnd`/`resp` topics of its own, because no command produces it [verified-on-device: RFD40 serial 24190525100255]. This session it was observed on the per-endpoint `rfid` topic, formed from the endpoint's `{EP}/clients/rfid` `publishTopic` wrapped with the tenant and serial [verified-on-device: RFD40 serial 24190525100255]:

| Direction | Topic (wire form `{tenantId}/{EP}/clients/rfid/{serial}`) | Concrete topic this session |
| --- | --- | --- |
| Device-emitted event (MDM) | `zebra/MDM/clients/rfid/<serial>` | `zebra/MDM/clients/rfid/RFD40-24190525100255` |
| Device-emitted event (CTRL) | `zebra/CTRL/clients/rfid/<serial>` | `zebra/CTRL/clients/rfid/RFD40-24190525100255` |

Routing notes:

- **Per-endpoint `rfid` plane.** The event was published on `zebra/MDM/clients/rfid/RFD40-24190525100255` and on `zebra/CTRL/clients/rfid/RFD40-24190525100255`, i.e. each active endpoint's own `{EP}/clients/rfid` topic [verified-on-device: RFD40 serial 24190525100255]. Each active endpoint (MDM and CTRL) emitted its own `mqttConnEVT` [verified-on-device: RFD40 serial 24190525100255].
- **Not the `event` topic.** `mqttConnEVT` was NOT published on the `{EP}/clients/event` topic where alerts and the heartbeat would flow [verified-on-device: RFD40 serial 24190525100255]. The ALERT events seen this session (`id=BATTERY` priority `LOW`, `id=POWER` priority `HIGH`, `id=NETWORK_EVENT`) did arrive on `zebra/MDM/clients/event/RFD40-24190525100255`, confirming the two planes are distinct [verified-on-device: RFD40 serial 24190525100255].
- **Topic not declared in schema.** The schema and its examples do not state the topic on which `mqttConnEVT` is published (see **M5**) [verified-from-schema: events/mqttConnEVT.json].

## 3. Event Payload Breakdown

The `mqttConnEVT.json` schema declares six top-level properties — `connectionState`, `timestamp`, `deviceModel`, `deviceSerialNo`, `apiVersion`, and `mqttVersion` — and carries NO `required` array [verified-from-schema: events/mqttConnEVT.json properties]. None of the six properties is therefore required [verified-from-schema: events/mqttConnEVT.json].

| Field | Type (declared) | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `connectionState` | string | no | enum `[CONNECTED, DISCONNECTED]`; the connection status of the device | [verified-from-schema: events/mqttConnEVT.json properties.connectionState] |
| `timestamp` | string | no | format `time`, described as `HH:MM:SS`; example `"12:17:56"` | [verified-from-schema: events/mqttConnEVT.json properties.timestamp] |
| `deviceModel` | string | no | enum `[RFD40, RFD90]`; the device model | [verified-from-schema: events/mqttConnEVT.json properties.deviceModel] |
| `deviceSerialNo` | string | no | unique serial number; example `"RFD40-24190525100354"` | [verified-from-schema: events/mqttConnEVT.json properties.deviceSerialNo] |
| `apiVersion` | string | no | the API version in use; example `"1.0"` | [verified-from-schema: events/mqttConnEVT.json properties.apiVersion] |
| `mqttVersion` | string | no | the MQTT protocol version; example `"3.1.1"` | [verified-from-schema: events/mqttConnEVT.json properties.mqttVersion] |

### Schema examples (from the schema, not a live capture)

The schema carries two examples [verified-from-schema: events/mqttConnEVT.json examples]. The first example is a `CONNECTED` state with a `timestamp`, `apiVersion` `"1.0"`, and `mqttVersion` `"3.1.1"` [verified-from-schema: events/mqttConnEVT.json examples]:

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

The second example is a `DISCONNECTED` state that omits `timestamp` and uses `apiVersion` `"1.2"` with `mqttVersion` `"3.1.1"` [verified-from-schema: events/mqttConnEVT.json examples]:

```json
{
  "connectionState": "DISCONNECTED",
  "deviceModel": "RFD40",
  "deviceSerialNo": "RFD40-24190525100354",
  "apiVersion": "1.2",
  "mqttVersion": "3.1.1"
}
```

In both schema examples `apiVersion` and `mqttVersion` are JSON strings, consistent with their declared `string` type [verified-from-schema: events/mqttConnEVT.json examples].

### Live captures (verbatim, this session)

The three payloads below were captured live and are reproduced byte-for-byte, including `apiVersion` and `mqttVersion` as JSON numbers [verified-on-device: RFD40 serial 24190525100255]. The first was a `DISCONNECTED` event on the MDM `rfid` topic, with NO `timestamp` field [verified-on-device: RFD40 serial 24190525100255]:

```json
{"connectionState":"DISCONNECTED","deviceModel":"RFD40","deviceSerialNo":"RFD40-24190525100255","apiVersion":1.21,"mqttVersion":3.0999999}
```

The second was a `CONNECTED` event on the MDM `rfid` topic, with an ISO-8601 `timestamp` [verified-on-device: RFD40 serial 24190525100255]:

```json
{"connectionState":"CONNECTED","timestamp":"2026-06-14T12:54:51.207Z","deviceModel":"RFD40","deviceSerialNo":"RFD40-24190525100255","apiVersion":1.21,"mqttVersion":3.0999999}
```

The third was a `CONNECTED` event on the CTRL `rfid` topic, with its own ISO-8601 `timestamp` [verified-on-device: RFD40 serial 24190525100255]:

```json
{"connectionState":"CONNECTED","timestamp":"2026-06-14T12:54:51.411Z","deviceModel":"RFD40","deviceSerialNo":"RFD40-24190525100255","apiVersion":1.21,"mqttVersion":3.0999999}
```

### Live vs schema (per field)

- **`connectionState`.** Both `CONNECTED` and `DISCONNECTED` are members of the declared enum [verified-from-schema: events/mqttConnEVT.json properties.connectionState]. Both enum states were observed live this session, so the live values are valid [verified-on-device: RFD40 serial 24190525100255].
- **`deviceModel`.** The declared enum is `[RFD40, RFD90]` [verified-from-schema: events/mqttConnEVT.json properties.deviceModel]. The live value `RFD40` is a member of that enum and is valid [verified-on-device: RFD40 serial 24190525100255].
- **`deviceSerialNo`.** The schema example uses `RFD40-24190525100354` [verified-from-schema: events/mqttConnEVT.json properties.deviceSerialNo]. The live value `RFD40-24190525100255` is a string and is valid for this device [verified-on-device: RFD40 serial 24190525100255].
- **`apiVersion` (type mismatch).** The schema declares `apiVersion` as type `string` with example `"1.0"` [verified-from-schema: events/mqttConnEVT.json properties.apiVersion]. The device emitted it as the JSON number `1.21`, which does not match the declared `string` type [verified-on-device: RFD40 serial 24190525100255].
- **`mqttVersion` (type mismatch + float artifact).** The schema declares `mqttVersion` as type `string` with example `"3.1.1"` [verified-from-schema: events/mqttConnEVT.json properties.mqttVersion]. The device emitted it as the JSON number `3.0999999`, which does not match the declared `string` type and is a floating-point artifact of approximately `3.1` [verified-on-device: RFD40 serial 24190525100255].
- **`timestamp` (format divergence).** The schema declares `timestamp` as a `string` of format `time` described as `HH:MM:SS` with example `"12:17:56"` [verified-from-schema: events/mqttConnEVT.json properties.timestamp]. The live `CONNECTED` events instead carried a full ISO-8601 timestamp such as `2026-06-14T12:54:51.207Z` [verified-on-device: RFD40 serial 24190525100255]. The live `DISCONNECTED` event omitted `timestamp` entirely, which the schema permits because there is no `required` array [verified-from-schema: events/mqttConnEVT.json].

## 4. Trigger / Emission

`mqttConnEVT` requires no command and no configuration to enable: the device publishes it automatically on every MQTT endpoint connection-state change [verified-on-device: RFD40 serial 24190525100255]. The `DISCONNECTED` event was published after the device session dropped [verified-on-device: RFD40 serial 24190525100255]. This is consistent with an MQTT Last-Will publication by the broker on session loss [inferred-from-live: DISCONNECTED arrived ~26s after the reboot ack with no timestamp]. The `CONNECTED` events were published when the endpoints reconnected [verified-on-device: RFD40 serial 24190525100255]. This is consistent with a birth message published on (re)connect [inferred-from-live: CONNECTED events followed the DISCONNECTED on reconnect]. Each active endpoint published its own `mqttConnEVT` on its own `rfid` topic [verified-on-device: RFD40 serial 24190525100255].

To trigger a transition for testing, force the device session to drop and re-establish, for example by rebooting the device or otherwise causing a reconnect [verified-on-device: RFD40 serial 24190525100255]. This session a reboot was used to force the disconnect/reconnect cycle, and the reboot was acknowledged with `code 1` [verified-on-device: RFD40 serial 24190525100255].

## 5. Live Verification

> **Verdict: LIVE.** A reboot-triggered connection-state transition was captured this session and produced three `mqttConnEVT` messages [verified-on-device: RFD40 serial 24190525100255].

ENVIRONMENT: a standalone broker subscriber on the wildcard `#`, independent of the device session, captured the events during the disconnect/reconnect cycle on the RFD40 with serial 24190525100255 [verified-on-device: RFD40 serial 24190525100255].

What was captured:

- The reboot used to force the transition was acknowledged with `code 1` [verified-on-device: RFD40 serial 24190525100255].
- Three `mqttConnEVT` messages were captured during the disconnect/reconnect cycle — one `DISCONNECTED` and two `CONNECTED` [verified-on-device: RFD40 serial 24190525100255]. All three were published with `retain=false` [verified-on-device: RFD40 serial 24190525100255].
- The first event arrived at roughly +38.5s on `zebra/MDM/clients/rfid/RFD40-24190525100255` as a `DISCONNECTED` state with no `timestamp` field, roughly 26 seconds after the reboot acknowledgement [verified-on-device: RFD40 serial 24190525100255]. The timing is consistent with the broker keepalive/LWT detecting the dropped device session [inferred-from-live: ~26s gap between reboot ack and the DISCONNECTED publication].
- The second event arrived at roughly +39.8s on `zebra/MDM/clients/rfid/RFD40-24190525100255` as a `CONNECTED` state on reconnect, carrying the ISO-8601 timestamp `2026-06-14T12:54:51.207Z` [verified-on-device: RFD40 serial 24190525100255].
- The third event arrived at roughly +40.0s on `zebra/CTRL/clients/rfid/RFD40-24190525100255` as a `CONNECTED` state, carrying the ISO-8601 timestamp `2026-06-14T12:54:51.411Z` [verified-on-device: RFD40 serial 24190525100255]. The CTRL endpoint published its own `CONNECTED` `mqttConnEVT` on its own `rfid` topic, demonstrating per-endpoint emission [verified-on-device: RFD40 serial 24190525100255].

Corroborating observation (context, not `mqttConnEVT`): on reconnect, ALERT events (`id=BATTERY` priority `LOW`, `id=POWER` priority `HIGH`, `id=NETWORK_EVENT`) were also seen on `zebra/MDM/clients/event/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. The device therefore does emit events on the `event` topic, confirming the event pipeline works [verified-on-device: RFD40 serial 24190525100255].

Key findings:

- **L1 — both enum states observed.** The reboot-triggered transition yielded three `mqttConnEVT` — one `DISCONNECTED` and two `CONNECTED` — so both enum states were observed live [verified-on-device: RFD40 serial 24190525100255].
- **L2 — per-endpoint `rfid` topic.** `mqttConnEVT` was published on `zebra/MDM/clients/rfid/RFD40-24190525100255` and `zebra/CTRL/clients/rfid/RFD40-24190525100255`, the endpoint's `{EP}/clients/rfid` `publishTopic`, and each active endpoint (MDM and CTRL) emitted its own [verified-on-device: RFD40 serial 24190525100255].
- **L3 — transition semantics.** `DISCONNECTED` arrived roughly 26 seconds after the reboot with no `timestamp`, then `CONNECTED` followed on reconnect with an ISO-8601 timestamp, and all three were `retain=false` [verified-on-device: RFD40 serial 24190525100255]. The `DISCONNECTED` timing and the `CONNECTED` ordering are consistent with an LWT-style disconnect followed by a birth-message reconnect [inferred-from-live: DISCONNECTED ~26s after the reboot ack, then CONNECTED on reconnect].
- **L4 — `mqttVersion` live `3.0999999`.** The device emitted `mqttVersion` as the JSON number `3.0999999`, an approximately `3.1` floating-point artifact [verified-on-device: RFD40 serial 24190525100255]. The schema instead declares `mqttVersion` as a string with example `"3.1.1"`, so this is a type mismatch [verified-from-schema: events/mqttConnEVT.json properties.mqttVersion]. The float artifact is present in the live data and not in the current schema file [verified-on-device: RFD40 serial 24190525100255].
- **L5 — `apiVersion` live `1.21`.** The device emitted `apiVersion` as the JSON number `1.21` [verified-on-device: RFD40 serial 24190525100255]. The schema instead declares `apiVersion` as a string with example `"1.0"` [verified-from-schema: events/mqttConnEVT.json properties.apiVersion]. The live number also differs from the command-response `apiVersion` `"V1.21"`, a string with a leading `V`, returned by `get_status`/`get_version` on this device [verified-on-device: RFD40 serial 24190525100255].
- **L6 — `timestamp` form.** The `CONNECTED` events carried ISO-8601 timestamps rather than the schema's `HH:MM:SS`, while the `DISCONNECTED` event omitted `timestamp` [verified-on-device: RFD40 serial 24190525100255]. The omission matches the schema's `DISCONNECTED` example, which also has no `timestamp` [verified-from-schema: events/mqttConnEVT.json examples].
- **L7 — event pipeline healthy.** ALERT events (`id=BATTERY`, `id=POWER`, `id=NETWORK_EVENT`) were also seen on the MDM `event` topic on reconnect, so the device's event pipeline works [verified-on-device: RFD40 serial 24190525100255]. This corroborates that the `heartbeatEVT` non-emission documented in `heartbeatEVT.md` is heartbeat-specific rather than a general event failure [verified-on-device: RFD40 serial 24190525100255].

## 6. Associated Codes / Notes

`mqttConnEVT` is a device-emitted event and carries no response envelope and no `response.code` — those exist only on command responses, not on device-originated events [verified-from-schema: events/mqttConnEVT.json]. The `mqttConnEVT.json` schema declares no `response` object and no `code` field, so the `0..30` response-code table does not apply to the event itself [verified-from-schema: events/mqttConnEVT.json properties].

## 7. Conformance & Spec Notes

- **M1 — title mismatch.** `events/mqttConnEVT.json` is titled `epConnection`, which does not match the event/file name `mqttConnEVT` [verified-from-schema: events/mqttConnEVT.json title]. **Fix:** retitle the schema to match the event name [verified-from-schema: events/mqttConnEVT.json title].
- **M2 — `apiVersion`/`mqttVersion` type mismatch.** The schema declares both `apiVersion` and `mqttVersion` as type `string` [verified-from-schema: events/mqttConnEVT.json properties]. The device emits them as JSON numbers — `apiVersion` `1.21` and `mqttVersion` `3.0999999`, the latter additionally a float artifact of approximately `3.1` [verified-on-device: RFD40 serial 24190525100255]. **Fix:** align the schema type to what the device emits, or fix the firmware to emit strings `"1.21"` and `"3.1.1"` [verified-from-schema: events/mqttConnEVT.json properties].
- **M3 — `timestamp` format divergence.** The schema describes `timestamp` as `HH:MM:SS` (format `time`, example `"12:17:56"`) [verified-from-schema: events/mqttConnEVT.json properties.timestamp]. The device instead emits a full ISO-8601 timestamp on `CONNECTED` and omits `timestamp` on `DISCONNECTED` [verified-on-device: RFD40 serial 24190525100255]. The omission is permitted because there is no `required` array [verified-from-schema: events/mqttConnEVT.json]. **Fix:** document the actual ISO-8601 format and the optionality of `timestamp` [verified-from-schema: events/mqttConnEVT.json properties.timestamp].
- **M4 — inconsistent schema examples.** The `CONNECTED` example has a `timestamp` and `apiVersion` `"1.0"`, while the `DISCONNECTED` example omits `timestamp` and uses `apiVersion` `"1.2"`, with both using string `mqttVersion` `"3.1.1"` [verified-from-schema: events/mqttConnEVT.json examples]. **Fix:** make the examples consistent with each other and with real output [verified-from-schema: events/mqttConnEVT.json examples].
- **M5 — topic not documented in schema.** The schema and its examples do not state the topic on which the event is published [verified-from-schema: events/mqttConnEVT.json]. Live capture shows `mqttConnEVT` on the per-endpoint `{EP}/clients/rfid` topic for MDM and CTRL, distinct from alerts and the heartbeat on `{EP}/clients/event` and from tag data on the DATA endpoint's data topic [verified-on-device: RFD40 serial 24190525100255]. **Fix:** document the `rfid`-topic routing for `mqttConnEVT` [verified-on-device: RFD40 serial 24190525100255].
- **POSITIVE (not a defect).** `connectionState` and `deviceModel` match their declared enums, and the schema declares `deviceModel` and `deviceSerialNo` as string fields [verified-from-schema: events/mqttConnEVT.json properties]. The live `deviceModel` and `deviceSerialNo` are correct for the device, and the event fired on the connection transition — `DISCONNECTED` then `CONNECTED` — once per active endpoint [verified-on-device: RFD40 serial 24190525100255].

## 8. Safety / operational note

`mqttConnEVT` is read-only telemetry: it reports connection state, device identity, and version metadata, and receiving it changes nothing on the device, so it is benign [verified-on-device: RFD40 serial 24190525100255]. A reboot was used this turn to force the connection-state transition that produced the capture [verified-on-device: RFD40 serial 24190525100255].

The event carries no credentials: `deviceSerialNo` is a device identifier and `apiVersion`/`mqttVersion` are version values, none of which is a secret, so there is nothing to mask [verified-from-schema: events/mqttConnEVT.json properties]. For the related heartbeat behavior, see `heartbeatEVT.md`: this device emitted `mqttConnEVT` and ALERT events but did not emit a heartbeat, so the heartbeat non-emission is heartbeat-specific [verified-on-device: RFD40 serial 24190525100255].