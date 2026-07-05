---
id: api-overview
title: MQTT API Reference
sidebar_label: MQTT API Reference
description: "Index of the IOTC MQTT API surface: 20 commands and 4 events across the seven endpoint types. Each operation links to its reference page in this documentation."
sidebar_custom_props: { emoji: "📘" }
---

> 📕 **REFERENCE** · **Audience:** API Consumer · **Use:** directory of all 20 commands and 4 events

:::tip[Before your first payload]
IOTC accepts **native MQTT payloads** — a top-level `command`/`requestId` plus a command-specific named object — not the generic `params`/`requestBody` envelopes the OpenAPI rendering can suggest. Read [The OpenAPI illusion](/foundations/native-mqtt-vs-openapi) first, or the reader will reject your requests.
:::

The IOTC MQTT API surface is **20 commands and 4 events**, organised into 4 top-level tag groups and 13 sub-tags. Each operation links to its reference page in this documentation. [`get_status`](/reference/mgmt/get-status) has a full dedicated command page — payload schema, response schema, field-by-field descriptions, error codes, and worked examples — and the remaining operations link to their endpoint reference pages while dedicated per-command pages are rolled out.

## How every command works

Every command request uses the same envelope:

```json
{
  "command": "<command_name>",
  "requestId": "<client-supplied id>",
  "<commandPayloadKey>": { /* command-specific payload, if any */ }
}
```

Read-only commands (`get_*`, [`reboot`](/reference/mgmt/reboot)) take only `command` and `requestId`. Commands with parameters add a single named payload object whose key is operation-specific (`ctrlOprPayload`, `epConfig`, `operatingMode`, etc.). See [The OpenAPI Illusion](/foundations/native-mqtt-vs-openapi) for the canonical shape, and [How commands and responses flow](/foundations/communication-flow) for the request/response and event flows.

Responses echo `command` and `requestId` and add `apiVersion` and a `response` object:

```json
{
  "command": "<command_name>",
  "requestId": "<echo>",
  "apiVersion": "V1.1",
  "<responsePayloadKey>": { /* result, when the command returns data */ },
  "response": { "code": 0, "description": "Success" }
}
```

Error codes appear in `response.code`; see [Error Response Format](/reference/errors/format) and [Command Response Error Codes](/reference/errors/codes).

## Command payload keys

| Command | Required payload key |
|---|---|
| All `get_*` commands · [`reboot`](/reference/mgmt/reboot) | (none beyond `command` and `requestId`) |
| [`set_wifi`](/reference/mgmt/set-wifi) | `wifiConfig` |
| [`delete_wifi_profile`](/reference/mgmt/delete-wifi-profile) | `wifiProfileInfo` |
| [`config_endpoint`](/reference/mgmt/config-endpoint) | `epConfig` |
| [`install_certificate`](/reference/mgmt/install-certificate) · [`delete_certificate`](/reference/mgmt/delete-certificate) | `certDetails` |
| [`set_os`](/reference/mgmt/set-os) | `OSUpdateDetails` |
| [`set_operating_mode`](/reference/ctrl/set-operating-mode) | `operatingMode` (wraps an inner `operatingModes`) |
| [`set_post_filter`](/reference/ctrl/set-post-filter) | `postFilterPayload` |
| [`control_operation`](/reference/ctrl/control-operation) | `ctrlOprPayload` |
| [`config_events`](/reference/mgmt/config-events) | `eventConfiguration` |

## Topic format

Every IOTC topic is constructed at runtime as three segments:

```
<tenantId> / <topic> / <deviceSerialNumber>
```

You configure only the **middle segment** in `publishTopics[].topic` and `subscribeTopics[].topic`. The reader prepends `tenantId` and appends `deviceSerialNumber` automatically. See [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints).

---

## Management

The **Management** tag group covers device identity, network setup, MQTT endpoints, certificates, and system operations. Fourteen operations across five sub-tags.

### Device Status

Live identity, runtime health, and regulatory region. See [What your reader knows about itself](/infrastructure/device-state).

| API | Type | Description |
|---|---|---|
| [`get_status`](/reference/mgmt/get-status) | Command | Live health snapshot: power source, radio activity, battery, NTP, temperature. |
| [`get_version`](/reference/mgmt/get-status) | Command | Identity and software versions: model, serial number, SKU, firmware, IOTC version. |
| [`get_current_region`](/reference/mgmt/get-status) | Command | Active regulatory region, channel set, power limits, LBT, frequency hopping. |

### Network Configuration

Ethernet status and Wi-Fi profile management. See [Getting on the network (Wi-Fi & Ethernet)](/infrastructure/network/architecture).

| API | Type | Description |
|---|---|---|
| [`get_eth`](/reference/mgmt/get-eth) | Command | Ethernet interface state, link, and IP address. |
| [`get_wifi`](/reference/mgmt/get-wifi) | Command | List configured Wi-Fi profiles and connection status. |
| [`set_wifi`](/reference/mgmt/set-wifi) | Command | Create or modify a Wi-Fi profile. Personal (WPA2/WPA3) and Enterprise (EAP-TLS/TTLS/PEAP). |
| [`delete_wifi_profile`](/reference/mgmt/delete-wifi-profile) | Command | Remove a saved Wi-Fi profile by SSID. |

### MQTT Endpoint Configuration

Add, update, delete, and inspect MQTT broker endpoints. See [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints).

| API | Type | Description |
|---|---|---|
| [`get_endpoint_config`](/reference/mgmt/get-endpoint-config) | Command | Retrieve active endpoint configurations and the list of saved endpoint names. |
| [`config_endpoint`](/reference/mgmt/config-endpoint) | Command | Add, update, or delete an endpoint. Supports MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM. |

### Certificate Management

Install, inspect, and remove TLS certificates for MQTT, Wi-Fi, and the file store. See [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates).

| API | Type | Description |
|---|---|---|
| [`get_installed_certificate`](/reference/mgmt/get-installed-certificate) | Command | List installed certificates by logical name and type. |
| [`install_certificate`](/reference/mgmt/install-certificate) | Command | Install a CA, client cert, or client key. Sources: `HTTP` (download) or `DIRECT` (inline). |
| [`delete_certificate`](/reference/mgmt/delete-certificate) | Command | Remove an installed certificate by name and type (omit name to delete all of a type). |

### System Operations

Firmware update and warm reset. See [Updating firmware and rebooting](/infrastructure/system-operations).

| API | Type | Description |
|---|---|---|
| [`set_os`](/reference/mgmt/set-os) | Command | Start a firmware update from a URL. Asynchronous; verify the outcome with `get_version`. |
| [`reboot`](/reference/mgmt/reboot) | Command | Warm reset (async accept, code 1). Session-severing; refused with code 5 if an inventory is active. |

---

## Control

The **Control** tag group covers the RFID radio: operating mode, tag filtering, and inventory start/stop. Five operations across three sub-tags.

### Operating Mode

Profile selection, query parameters, access operations, and metadata enablement. See [Choose how the reader reads tags](/rfid/operating-mode-profiles).

| API | Type | Description |
|---|---|---|
| [`get_operating_mode`](/reference/ctrl/get-operating-mode) | Command | Retrieve the active profile and all operating-mode parameters. |
| [`set_operating_mode`](/reference/ctrl/set-operating-mode) | Command | Set profile, sessions, triggers, query, select prefilters, access operations, and tag metadata. |

### Tag Filtering

Post-read report filters scoped to a data endpoint. See [Filter tags before vs after the read](/rfid/post-filters).

| API | Type | Description |
|---|---|---|
| [`get_post_filter`](/reference/ctrl/get-post-filter) | Command | Retrieve post-filter rules for each data endpoint. |
| [`set_post_filter`](/reference/ctrl/set-post-filter) | Command | Add, modify, or delete a post-filter (PREFIX / SUFFIX / REGEX match, INCLUDE / EXCLUDE). |

### Inventory Control

Start and stop RFID inventory (or scanner) operations. See [Start, stop, and the trigger button](/rfid/start-stop-inventory).

| API | Type | Description |
|---|---|---|
| [`control_operation`](/reference/ctrl/control-operation) | Command | START or STOP an `RFID` or `SCANNER` subsystem. |

---

## Events

The **Events** tag group covers the reader's asynchronous management-event surface. One command (event configuration) and three event types across four sub-tags.

### Event Configuration

Configure which events the reader emits and at what thresholds. See [Choose what the reader tells you](/observability/configure-events).

| API | Type | Description |
|---|---|---|
| [`config_events`](/reference/mgmt/config-events) | Command | Enable / disable event flags. Set heartbeat interval, CPU / RAM / flash / temperature thresholds. |

### Device Health

Periodic liveness with optional inventory and battery sub-payloads. See [Watch your reader's pulse](/observability/heartbeat).

| API | Type | Description |
|---|---|---|
| [`heartbeatEVT`](/reference/events/heartbeat-event) | Event | Periodic device heartbeat: uptime, sequence number, inventory status, battery alert. |

### Alerts

Threshold-driven and state-transition notifications. See [When the reader needs to interrupt you](/observability/alerts).

| API | Type | Description |
|---|---|---|
| [`alerts`](/reference/events/alerts-event) | Event | Verbose alert with category-specific `alertDetails` block. |

### MQTT Connectivity

Endpoint connection state transitions. See [Knowing when you're connected](/observability/mqtt-connection).

| API | Type | Description |
|---|---|---|
| [`mqttConnEVT`](/reference/events/mqtt-connection-event) | Event | CONNECTED / DISCONNECTED transition with device identity and protocol-version context. |

---

## Data

The **Data** tag group covers tag-read events emitted during active inventory.

### Tag Data Event

Per-tag (or aggregated) inventory output. See [Where tag reads come from](/rfid/dataevt-schema).

| API | Type | Description |
|---|---|---|
| [`dataEVT`](/reference/data/tag-data-event) | Event | Inventory event with EPC, TID, USER, telemetry (RSSI, phase, channel, seen count), and access-operation results. |

---

## Cross-walk: concept chapter ↔ API sub-tag

Every Part 4–6 chapter in these docs ties to one API sub-tag. The pairing is bidirectional.

| Concept chapter | API sub-tag |
|---|---|
| [What your reader knows about itself](/infrastructure/device-state) | Device Status |
| [Getting on the network (Wi-Fi & Ethernet)](/infrastructure/network/architecture) | Network Configuration |
| [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints) | MQTT Endpoint Configuration |
| [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates) | Certificate Management |
| [Updating firmware and rebooting](/infrastructure/system-operations) | System Operations |
| [Choose how the reader reads tags](/rfid/operating-mode-profiles) | Operating Mode |
| [Filter tags before vs after the read](/rfid/post-filters) | Tag Filtering |
| [Start, stop, and the trigger button](/rfid/start-stop-inventory) | Inventory Control |
| [Choose what the reader tells you](/observability/configure-events) | Event Configuration |
| [Watch your reader's pulse](/observability/heartbeat) | Device Health |
| [When the reader needs to interrupt you](/observability/alerts) | Alerts |
| [Knowing when you're connected](/observability/mqtt-connection) | MQTT Connectivity |
| [Where tag reads come from](/rfid/dataevt-schema) | Tag Data Event |

## Related

- [The OpenAPI Illusion](/foundations/native-mqtt-vs-openapi) — why the on-the-wire MQTT shape differs from the OpenAPI rendering.
- [How commands and responses flow](/foundations/communication-flow) — the three flow types (command/response, event, tag data).
- [Error Response Format](/reference/errors/format) — the response envelope.
- [Command Response Error Codes](/reference/errors/codes) — the full list of 29 codes (0–28).
- [Things people get wrong about IOTC](/diagnose/misconceptions) — common integration mistakes and their fixes.
