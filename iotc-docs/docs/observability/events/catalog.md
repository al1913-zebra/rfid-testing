---
id: catalog
title: Event types catalog
sidebar_label: "Event types catalog (index)"
description: "Exhaustive reference for every device-to-cloud IOTC event: dataEVT, heartbeatEVT, alerts, mqttConnEVT. Trigger, cadence, topic, and full payload field tables with enums."
sidebar_custom_props: { emoji: "📇" }
---

> 📕 **REFERENCE** · **Audience:** API consumer · **Use:** navigation index + per-event field tables

This page is the exhaustive catalog of the **four** device-to-cloud events the RFD40 Premium / Premium Plus, RFD9030, and RFD9090 readers emit on IOTC firmware V1.0 / V1.1: [`dataEVT`](#dataevt), [`heartbeatEVT`](#heartbeatevt), [`alerts`](#alerts), and [`mqttConnEVT`](#mqttconnevt). Every event flows reader → application; there is no client-to-reader event. The field tables below are drawn verbatim from the canonical event schemas (`schemas/events/*.json`). For the architectural "why" — who subscribes and what is *not* emitted — see [The IOTC event model](/observability/events/model).

### Events at a glance

| Event | Default endpoint convention | Direction | Trigger | Consumer | Full schema |
|---|---|---|---|---|---|
| `dataEVT` | DATA1 / DATA2 publish topic (e.g., `<topic>/clients/rfid`) | Reader → App | Tag read during inventory | Application backend | [dataEVT schema](/rfid/dataevt-schema), [API Reference](/reference/api-overview) |
| `heartbeatEVT` | MGMT_EVT publish topic (e.g., `<topic>/clients/event`) | Reader → App | Periodic per `heartbeatConfiguration.interval` | Fleet monitoring | [API Reference](/reference/api-overview) |
| `alerts` | MGMT_EVT publish topic | Reader → App | Condition state transition; `id` enum: BATTERY, FIRMWARE_UPDATE, NETWORK_EVENT, TEMPERATURE, POWER | Operations | [API Reference](/reference/api-overview) |
| `mqttConnEVT` | MGMT_EVT publish topic | Reader → App | Connection state change (CONNECTED / DISCONNECTED) | Fleet monitoring | [API Reference](/reference/api-overview) |

> Not every event category configurable in `config_events` is emitted on current firmware. See [The IOTC event model](/observability/events/model) for exactly what V1.1 emits.

### Common properties of all events

| Property | Value |
|---|---|
| Direction | Device to Cloud (reader publishes; application subscribes) |
| Envelope | None. Events do **not** carry the `command` / `requestId` / `response.code` command-response envelope. Treat each event as a streaming record, not a reply. |
| Correlation | No `requestId`. Correlate by `deviceSerialNo` (where present) and per-event sequence (`eventNum` / `eventNumber`). |
| Applies to | RFD40 Premium, RFD40 Premium Plus, RFD9030, RFD9090 (RFD40 Standard is not in scope). |
| API versions | V1.0, V1.1. |
| Timestamp format | ISO 8601 for `dataEVT` and `heartbeatEVT`; `HH:MM:SS` clock-only string for `mqttConnEVT`; millisecond-precision ISO 8601 for `alerts`. |

### Topic routing

All events ride the publish topics of the endpoint(s) configured to emit them. The reader builds the full wire topic from a fixed three-part hierarchy; you configure only the middle `<topic>` segment in each endpoint's `publishTopics[]`.

```
<tenantId> / <topic> / <deviceSerialNumber>
```

For example, with `tenantId = zebra`, a DATA1 endpoint configured with `publishTopics: [{ "topic": "DATA1/clients/rfid", "qos": 1, "retain": false }]`, and serial `RFD40-24190525100255`, `dataEVT` publishes to:

```
zebra/DATA1/clients/rfid/RFD40-24190525100255
```

| Event | Carrying endpoint type(s) | Notes |
|---|---|---|
| `dataEVT` | `DATA1` and/or `DATA2` | The two data endpoints (`DATA_EP1` / `DATA_EP2`) are **concurrent**; both can stream simultaneously. Per-endpoint routing of which tags go where is controlled by `config_endpoint` / `set_post_filter`, not by `config_events`. |
| `heartbeatEVT` | `MGMT_EVT` (or `MDM` in a hybrid bootstrap) | Whichever event-bearing endpoint has `heartbeat: true` in its `eventConfiguration`. |
| `alerts` | `MGMT_EVT` (or `MDM`) | Same event-bearing endpoint family. |
| `mqttConnEVT` | `MGMT_EVT` (or `MDM`) | The `DISCONNECTED` variant is published by the broker from the reader's registered Last Will and Testament when the reader drops ungracefully. |

> Never put `tenantId` or the device serial in the `topic` field — the reader prepends and appends them automatically. `publishTopics` supports at most 3 entries per endpoint (error code 25 if exceeded). See [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints).

---

## `dataEVT`

Structured tag and barcode read output from an active inventory operation. Published automatically while inventory is running and one or more tags are read — no command triggers it.

| Property | Value |
|---|---|
| Event type | Data Event |
| Direction | Device → Cloud |
| Trigger | A tag is inventoried (or a barcode is scanned) during an active RFID inventory operation |
| Cadence | Governed by the operating mode's `reportFilter` **`duration`**: `duration: 0` reports **every individual read**; `duration > 0` **aggregates** reads over the window. The `reportFilter` block is optional, but when you include one, `duration` and `type` are required within it; omit `reportFilter` entirely and each operating mode applies its own default — so there is no single universal default cadence. |
| Endpoint | `DATA1` and/or `DATA2` publish topic |
| Carries | `tagData[]`, optional `barcodeData[]` (barcode on Premium Plus / RFD9090 imager-equipped models) |

**Top-level fields** (required: `timestamp`):

| Field | Type | Description |
|---|---|---|
| `type` | enum string | Active operating-mode profile when the event was generated. Enum: `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE`, `ADVANCED`. (`FAST_READ` is in the schema enum but not currently selectable via `set_operating_mode`.) |
| `timestamp` | string (ISO 8601) | Event generation time. **Required.** |
| `data` | object | Wrapper containing `tagData[]` and `barcodeData[]`. |

**`data.tagData[]` per-tag fields** (required: `eventNum`, `format`):

| Field | Type | When it appears |
|---|---|---|
| `EPCid` | string (hex) | The EPC identifier; primary key for the tag. |
| `EPC` | string (hex) | EPC memory-bank content (typically identical to `EPCid`). |
| `TID` | string (hex) | Factory-programmed Tag Identifier (manufacturer ID + model); immutable. |
| `USER` | string (hex) | User memory-bank content. |
| `RESERVED` | string (hex) | Reserved bank (kill / access passwords); typically restricted. |
| `PC` | string (hex) | Protocol Control word. |
| `CRC` | string (hex) | Tag CRC bits. |
| `XPC` | string (hex) | Extended PC bits, if present on the tag. |
| `format` | string | Format of the identifier; `epc`. **Required.** |
| `eventNum` | number | Per-event sequence number. **Required.** |
| `channel` | number | Channel in MHz used to read the tag. **Reported only when `reportFilter duration` is `0`.** |
| `phase` | number | Phase angle in degrees. **Reported only when `reportFilter duration` is `0`.** |
| `peakRssi` | number | RSSI in dBm. With `duration > 0`, the *peak* RSSI since the last report. |
| `seenCount` | number | Times the tag was inventoried since the previous report. **Always `1` when `duration` is `0`.** |
| `firstSeenTime` | number | Milliseconds since epoch when the tag was first seen (aggregated mode). |
| `lastSeenTime` | number | Milliseconds since epoch when the tag was last seen (aggregated mode). |
| `accessResults` | array of string | One entry per access operation, formatted `"<operation>-<bank>-<result>"`, e.g. `READ-EPC-SUCCESS`, `WRITE-USER-No Response from Tag`. |
| `MAC` | string | MAC address of the inventorying reader; only when enabled in the operating mode. |
| `HOSTNAME` | string | Hostname of the inventorying reader; only when enabled in the operating mode. |
| `userDefined` | string | Application-supplied string included on every event when configured. |

**`data.barcodeData[]` per-barcode fields** (required: `decodedBarcode`):

| Field | Type | Description |
|---|---|---|
| `symbology` | enum string | Barcode symbology. Enum: `CODE_39`. |
| `decodedBarcode` | string | Decoded string value. **Required.** |

**The `reportFilter duration` conditional:**

| `reportFilter duration` | Behavior |
|---|---|
| `0` | Each individual tag read is reported separately. `seenCount` is always `1`; `channel` and `phase` are populated. |
| `> 0` | Reads are aggregated across the window. `seenCount` accumulates; `channel` and `phase` are omitted; `peakRssi` is the peak across the window; `firstSeenTime`/`lastSeenTime` are populated. |

**Example** — single tag, per-read reporting (`duration: 0`):

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
        "format": "epc",
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

For the complete field-by-field treatment, see [Where tag reads come from](/rfid/dataevt-schema) and the Part 9 index entry [Data interface | dataEVT](/reference/data/tag-data-event).

---

## `heartbeatEVT`

Periodic liveness and health beacon. Published automatically at `eventConfiguration.heartbeatConfiguration.interval` while the device is active — no command triggers it. Its **absence** is itself a signal: a reader that stops heart-beating is offline.

| Property | Value |
|---|---|
| Event type | Heartbeat Event |
| Direction | Device → Cloud |
| Trigger | Timer fires at the configured interval while the device is active |
| Cadence | Every `heartbeatConfiguration.interval` seconds (heartbeat must be enabled and interval > 0) |
| Endpoint | `MGMT_EVT` publish topic |
| Carries | Uptime + sequence; optional `inventoryStatus` and `batteryAlert` blocks |

**Top-level fields:**

| Field | Type | Description |
|---|---|---|
| `eventName` | string | Always the literal `"heartbeat"` (not `heartbeatEVT`). |
| `timestamp` | string (ISO 8601) | When the event was generated. |
| `eventNumber` | integer | Monotonic sequence number; use for gap detection. |
| `upTime` | string | Uptime since last reboot, e.g. `"5 days 4hr 3min"`. |
| `data` | object | Optional sub-blocks (see below); present per `heartbeatConfiguration` flags. |

**`data.inventoryStatus`** — included when `heartbeatConfiguration.inventoryStatus: true`:

| Field | Type | Description |
|---|---|---|
| `rfidStatus` | enum string | `INPROGRESS` or `STOPPED`. |
| `tagCount` | integer | Total RFID tags scanned in the current operation. |
| `scanCount` | integer | Total scan attempts made during the operation. |

**`data.batteryAlert`** — included when `heartbeatConfiguration.batteryStatus: true`:

| Field | Type | Description |
|---|---|---|
| `status` | enum string | Operational battery state: `LOW`, `CRITICAL`, `CHARGING`, `FULL`, `HIGH`. |
| `stateOfHealth` | enum string | Long-term capacity: `LOW`, `FULL`, `CRITICAL`, `HIGH`, `CHARGING`. |
| `chargePercentage` | integer | Current charge level, 0–100. |

**Example:**

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

> The `batteryAlert` block here is a point-in-time **snapshot**. The `alerts` event with `id: BATTERY` fires on a **transition**. See [Watch your reader's pulse](/observability/heartbeat) for tuning, cost, and absence-detection patterns.

---

## `alerts`

Verbose, structured alert emitted when a monitored device condition transitions state or crosses a threshold. Published automatically — no command triggers it.

| Property | Value |
|---|---|
| Event type | Alert |
| Direction | Device → Cloud |
| Trigger | A monitored condition changes state or crosses a configured threshold |
| Cadence | Per transition (event-driven, not periodic) |
| Endpoint | `MGMT_EVT` publish topic |
| Carries | `type`, `state`, `id`, `priority`, and a category-specific `alertDetails` block |

**Top-level fields** (required: `type`, `timestamp`, `state`, `id`, `priority`):

| Field | Type | Enum / Description |
|---|---|---|
| `type` | enum string | `EVENT`, `NOTIFICATION`, `ALERT`. |
| `timestamp` | string (ISO 8601, ms) | Time the alert was generated, e.g. `2026-04-29T12:33:34.279Z`. |
| `state` | enum string | `SET` (condition active), `CLEAR` (condition resolved), `ONESHOT` (one-time, no paired CLEAR). |
| `id` | enum string | Alert category — **five published values**: `BATTERY`, `FIRMWARE_UPDATE`, `NETWORK_EVENT`, `TEMPERATURE`, `POWER`. |
| `priority` | enum string | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. |
| `alertDetails` | object | Category-specific payload (one of the blocks below). |

**`id` → trigger and state model:**

| `id` | Trigger | `state` values | `alertDetails` block |
|---|---|---|---|
| `BATTERY` | Battery charge or health state changes | `ONESHOT` | `batteryAlert` |
| `POWER` | Power source changes (e.g., USB to battery) | `ONESHOT` | `powerEvent` |
| `NETWORK_EVENT` | Wi-Fi or Ethernet interface connects, disconnects, or changes IP | `ONESHOT` | `networkInfo` |
| `FIRMWARE_UPDATE` | Firmware update starts, progresses, or completes | `SET` while in progress, `CLEAR` on completion | `fwUpdateStatus` |
| `TEMPERATURE` | Device temperature crosses a monitored threshold | `SET` when crossed, `CLEAR` when resolved | `temperatueInfo` |

> The canonical schema also describes `GPI_EVENT` and `ANTENNA_EVENT` as trigger conditions, but they are **not in the published `id` enum and are not emitted** by current firmware (the schema notes antenna, temperature exception, CPU, GPI, and user-app categories as not supported on the wire). Do not expect them. See [What is not currently emitted](/observability/events/model#what-is-not-currently-emitted).

**`alertDetails` blocks:**

| Block | Field | Type | Enum / Description |
|---|---|---|---|
| `batteryAlert` | `status` | enum string | `LOW`, `CRITICAL`, `CHARGING`, `FULL`, `HIGH`. |
| | `stateOfHealth` | enum string | `LOW`, `FULL`, `CRITICAL`, `HIGH`, `CHARGING`. |
| | `chargePercentage` | integer | 0–100. |
| `powerEvent` | `powerSource` | enum string | `DC`, `POE`, `POE+`, `BATTERY`, `CRADLE`. |
| | `lldp` | enum string | `success`, `failed`, `negotiating`. |
| | `powerMode` | enum string | `ACTIVE`, `LOWPOWER`. |
| `networkInfo` | `networkInterface.ethStatus[]` | array | Per-Ethernet (all six fields **required**): `interface`, `status` (`CONNECTED`/`DISCONNECTED`), `linkStatus` (`UP`/`DOWN`), `linkSpeed`, `ipV4Address`, `ipV6Address`. |
| | `networkInterface.wifiStatus[]` | array | Per-Wi-Fi: `interface`, `status` (`CONNECTED`/`DISCONNECTED`), `ssid`, `ipV4Address`, `ipV6Address`. |
| `fwUpdateStatus` | `updateStatus` | enum string | `started`, `updating`, `successfull`, `failed`, `skipped`. |
| | `overallProgress` | number | Percent of update completed. |
| | `stage` | string | Individual image step, e.g. `updating scanner fw`. |
| `temperatueInfo` | `nge`, `pa`, `ambient` | number | Internal temperature readings (NGE, PA, and ambient, in °C). |

**Example** — battery `ONESHOT`:

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
      "stateOfHealth": "FULL",
      "chargePercentage": 100
    }
  }
}
```

**Example** — firmware update `SET`:

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

**Example** — network event `ONESHOT` (Ethernet):

```json
{
  "type": "ALERT",
  "timestamp": "2026-04-29T12:33:57.757Z",
  "state": "ONESHOT",
  "id": "NETWORK_EVENT",
  "priority": "HIGH",
  "alertDetails": {
    "networkInfo": {
      "networkInterface": {
        "ethStatus": [
          {
            "interface": "eth0",
            "status": "CONNECTED",
            "linkStatus": "UP",
            "linkSpeed": "100Mbps",
            "ipV4Address": "192.168.0.111",
            "ipV6Address": "fe80::f299:9d51:864c:cff"
          }
        ]
      }
    }
  }
}
```

For state-semantics and priority-routing guidance, see [When the reader needs to interrupt you](/observability/alerts).

---

## `mqttConnEVT`

Endpoint connectivity state change plus device-identity context. Published automatically whenever the MQTT endpoint connection state changes — no command triggers it. Fires on **transitions only**: once per connect, once per disconnect.

| Property | Value |
|---|---|
| Event type | Connection Event |
| Direction | Device → Cloud |
| Trigger | The device establishes or loses endpoint connectivity |
| Cadence | Per transition |
| Endpoint | `MGMT_EVT` publish topic |
| Carries | Connection state + model, serial, API/MQTT version |

**Top-level fields:**

| Field | Type | Enum / Description |
|---|---|---|
| `connectionState` | enum string | `CONNECTED` or `DISCONNECTED`. No third value. |
| `timestamp` | string (`HH:MM:SS`) | Clock-only time of the transition. **May be absent on a disconnect** if the reader cannot reach the broker; not full ISO 8601 (the sled has no battery-backed RTC). |
| `deviceModel` | enum string | `RFD40` or `RFD90`. |
| `deviceSerialNo` | string | The reader's serial, e.g. `RFD40-24190525100354`. |
| `apiVersion` | number | IOTC API version active at the transition, e.g. `1.0`. |
| `mqttVersion` | number | MQTT protocol version negotiated, e.g. `3.1.1`. |

**Transition behavior:**

| Condition | `connectionState` | Notes |
|---|---|---|
| Device connects to the broker | `CONNECTED` | Published immediately after a successful (re)connection; includes `timestamp`. |
| Device loses connection | `DISCONNECTED` | `timestamp` may be missing. The ungraceful-drop variant is published by the broker from the reader's Last Will and Testament. |
| Device reconnects after a drop | `CONNECTED` | A fresh `CONNECTED` is published on every reconnection. |

**Example** — connected:

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

**Example** — disconnected (timestamp absent):

```json
{
  "connectionState": "DISCONNECTED",
  "deviceModel": "RFD40",
  "deviceSerialNo": "RFD40-24190525100354",
  "apiVersion": 1.2,
  "mqttVersion": 3.0999999
}
```

For the `HH:MM:SS` quirk, LWT mechanics, and dual-source offline detection, see [Knowing when you're connected](/observability/mqtt-connection).

---

### Which `config_events` flag enables which event

Each event stream is enabled (or disabled) by a boolean flag in `eventConfiguration`, applied via [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events) (active endpoint) or [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) (per-endpoint `eventConfiguration`). Omitted flags retain their current device state. `dataEVT` is *not* gated by `config_events` — it is driven by the active inventory operation and its operating mode.

| Catalog event | `config_events` flag(s) | Paired threshold (if any) |
|---|---|---|
| `heartbeatEVT` | `heartbeat` (+ `heartbeatConfiguration.interval`, `.inventoryStatus`, `.batteryStatus`) | — |
| `alerts` · `id: BATTERY` | `battery` | none (state-change driven, not a threshold) |
| `alerts` · `id: POWER` | `power` | — |
| `alerts` · `id: NETWORK_EVENT` | `network` | — |
| `alerts` · `id: FIRMWARE_UPDATE` | `firmwareUpdate` | — |
| `alerts` · `id: TEMPERATURE` | `temperature` | `temperatureThreshold` (°C) |
| `mqttConnEVT` | Implicit — emitted on every endpoint connection transition; not a `config_events` flag | — |
| `dataEVT` | Not gated by `config_events`; driven by active inventory + operating mode | — |

> Flags such as `antenna`, `gpi`, `exceptions`, `cpuUsage`, `flashUsage`, `ramUsage`, `ntp`, and `userApp` exist in `eventConfiguration` but produce **no event on current firmware**. Setting them has no effect on V1.1. See [Choose what the reader tells you](/observability/configure-events).

**Example** — enable battery and temperature alerts with a 55 °C threshold:

```json
{
  "command": "config_events",
  "requestId": "evt-cfg-001",
  "eventConfiguration": {
    "battery": true,
    "temperature": true,
    "temperatureThreshold": 55
  }
}
```

`config_events` is a state-changing command — retries after a timeout must use a **new** `requestId` (it is not idempotent, unlike read-only `get_*` commands).

**Related:** 📘 [The IOTC event model](/observability/events/model) · 📕 [Events reference (full schemas)](/observability/events/catalog) · 📕 [Where tag reads come from](/rfid/dataevt-schema) · 📘 [Watch your reader's pulse](/observability/heartbeat) · 📘 [When the reader needs to interrupt you](/observability/alerts) · 📘 [Knowing when you're connected](/observability/mqtt-connection) · 📘 [Choose what the reader tells you](/observability/configure-events) · 📕 [Command response error codes](/reference/errors/codes)
