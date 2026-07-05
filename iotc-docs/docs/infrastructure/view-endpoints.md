---
id: view-endpoints
title: How to view endpoint configuration
sidebar_label: How to view endpoint configuration
description: "How to inspect IOTC MQTT endpoint configuration with get_endpoint_config: list active endpoints (epType, protocol, url/port, verificationType, topics, QoS, event flags) and every saved endpoint name. Real request/response payloads, field tables, and error codes."
sidebar_custom_props: { emoji: "👁️" }
---

> 📙 **HOW-TO** · **Audience:** All · **Time:** ~5 min

This guide shows you how to inspect the current MQTT endpoint configuration on a handheld reader (RFD40 Premium, RFD40 Premium Plus, RFD9030, RFD9090) using `get_endpoint_config`, and how to read every field the reader returns.

`get_endpoint_config` is **read-only and idempotent** — it changes nothing on the device, so you can safely retry the same `requestId` if a response is lost. Run it before any [`config_endpoint`](/infrastructure/configure-endpoints) `update`/`delete` to confirm the target endpoint exists and to capture its current settings before you overwrite them.

### Before you begin

You need an already-active management connection to publish the command and receive the response — typically the bootstrap `MDM` endpoint (or a dedicated `MGMT` endpoint). The reader subscribes for commands and publishes responses on topics built at runtime as:

```
<tenantId> / <topic> / <deviceSerialNumber>
```

You configure only the middle segment; the reader prepends `tenantId` and appends the device serial. With tenant `zebra`, command-topic middle segment `MGMT/clients/cmnd`, and serial `RFD40-24190525100255`, you publish the command to:

```
zebra/MGMT/clients/cmnd/RFD40-24190525100255
```

and read the response on the matching response topic (e.g. `zebra/MGMT/clients/resp/RFD40-24190525100255`).

### Issue the command

Publish this payload to the active management endpoint's command topic. Only `command` and `requestId` are required; supply a unique `requestId` so you can correlate the response.

```json
{"command": "get_endpoint_config", "requestId": "ep-1"}
```

To inspect **one** endpoint instead of all active endpoints, add the optional `endpointDetails` object with the endpoint's name:

```json
{
  "command": "get_endpoint_config",
  "requestId": "ep-ctrl-1",
  "endpointDetails": { "endpointName": "ctrl" }
}
```

#### Request fields

| Field | Type | Required | Description |
|---|---|---|---|
| `command` | string | Yes | Must be `get_endpoint_config`. |
| `requestId` | string | Yes | Unique identifier echoed back in the response for tracking and correlation. |
| `endpointDetails.endpointName` | string | No | When present, the response includes only this endpoint's configuration. When omitted, the response includes **all active endpoints** plus the list of all saved endpoint names. |

### Interpret the response

A successful all-endpoints query returns the active endpoint configuration(s) under `endpointResponse.activeEndpoints.epConfig[]` and every saved endpoint name under `endpointResponse.savedEndpoints.epNames[]`:

```json
{
  "command": "get_endpoint_config",
  "requestId": "ep-1",
  "apiVersion": "V1.1",
  "endpointResponse": {
    "activeEndpoints": {
      "epConfig": [
        {
          "configuration": {
            "endpointName": "mgmt",
            "epType": "MGMT",
            "protocol": "MQTT_TLS",
            "activate": true,
            "url": "iotc-broker.zebra.com",
            "port": 8883,
            "verificationType": "VERIFY_HOST_PEER",
            "qosCommon": 1,
            "tenantId": "zebra",
            "mqttParams": {
              "keepAlive": 96,
              "cleanSession": false,
              "reconnectDelayMin": 5,
              "reconnectDelayMax": 512,
              "clientId": "zebra-rfd40-mgmt-01",
              "username": "mqttuser",
              "password": "xxxxxx",
              "publishTopics": [
                { "topic": "MGMT/clients/resp", "qos": 1, "retain": false },
                { "topic": "MGMT/clients/rfid", "qos": 1, "retain": true }
              ],
              "subscribeTopics": [
                { "topic": "MGMT/clients/cmnd", "qos": 1, "retain": false }
              ]
            },
            "securityParams": {
              "format": "PEM",
              "caCertificateFile": "broker-ca",
              "clientCert": "broker-client-cert",
              "clientKey": "broker-client-key"
            },
            "eventConfiguration": {
              "terminalConnection": false,
              "firmwareUpdate": true,
              "network": true,
              "ntp": true,
              "heartbeat": false,
              "power": true,
              "battery": true,
              "fileDownload": true
            }
          }
        }
      ]
    },
    "savedEndpoints": {
      "epNames": ["mgmt", "ctrl", "dataEP", "mdm"]
    }
  },
  "response": { "code": 0, "description": "Success" }
}
```

`endpointResponse.activeEndpoints.epConfig[]` carries each active endpoint's full `configuration`; `endpointResponse.savedEndpoints.epNames[]` lists every saved endpoint by name — including ones that are saved but not currently active (`activate: false`). When you query a single endpoint with `endpointDetails`, only that endpoint's `epConfig` entry is returned and `savedEndpoints` is omitted. For the full schema, see [API Reference](/reference/api-overview).

```d2
direction: right
R: "get_endpoint_config response" { shape: page }
AE: activeEndpoints
SE: savedEndpoints
RR: "response\n(code, description)"
EP1: "epConfig[]: one entry per active endpoint\n(MGMT in this example)"
EN: "epNames: [mgmt, ctrl, dataEP, mdm]"
R -> AE
R -> SE
R -> RR
AE -> EP1
SE -> EN

```

#### Response envelope fields

| Field | Type | Description |
|---|---|---|
| `command` | string | Echoes `get_endpoint_config`. |
| `requestId` | string | Echoes the `requestId` you sent. |
| `apiVersion` | string | API contract version: `V1.0` or `V1.1`. |
| `endpointResponse.activeEndpoints.epConfig[]` | array | One entry per currently active endpoint, each wrapping a `configuration` object (fields below). |
| `endpointResponse.savedEndpoints.epNames[]` | array of string | Names of every endpoint saved on the device, active or not. Omitted when you query a single endpoint. |
| `response.code` | integer | Result code; `0` = Success. See the error table below. |
| `response.description` | string | Human-readable result, e.g. `Success`. |

#### `configuration` fields

Each `epConfig[].configuration` object describes one endpoint. The first table lists the connection-level fields; `mqttParams`, `securityParams`, and `eventConfiguration` are broken out below.

| Field | Type | What it tells you |
|---|---|---|
| `endpointName` | string | The logical name used to reference this endpoint in `config_endpoint` `update`/`delete`. |
| `epType` | string (enum) | The role this endpoint plays. See the `epType` enum below. |
| `protocol` | string (enum) | Transport: `MQTT` (plaintext) or `MQTT_TLS` (encrypted). A mismatch with the broker prevents connection. |
| `activate` | boolean | `true` = the endpoint is connecting/connected; `false` = saved but dormant. Default `false`. |
| `url` | string | Broker hostname or IP. |
| `port` | integer | Broker port. `1883` plaintext MQTT, `8883` MQTT over TLS. |
| `verificationType` | string (enum) | How strictly the TLS handshake is validated. See the enum below. |
| `qosCommon` | integer | Default QoS applied to the connection; `0`, `1`, or `2` (max `2`). |
| `tenantId` | string | Tenant identifier prepended to every topic at runtime. |

`epType` enum — what each role carries:

| `epType` | Carries | Direction |
|---|---|---|
| `MGMT` | Identity, network, security, config, and firmware commands and responses | Bidirectional |
| `MGMT_EVT` | Heartbeats, alerts, NTP, network/firmware events | Reader → app |
| `CTRL` | `set_operating_mode`, `control_operation`, `set_post_filter` and their responses | Bidirectional |
| `DATA1` | `dataEVT` tag stream (primary destination) | Reader → app |
| `DATA2` | Second concurrent `dataEVT` stream (secondary destination) | Reader → app |
| `MDM` | Management + Control + Data combined on one connection (bootstrap default) | Bidirectional |
| `SOTI` | SOTI MobiControl integration | Bidirectional |

> `DATA1` and `DATA2` are **concurrent** data endpoints, not a primary/failover pair. Which tag reads land on each is set per endpoint via [`config_endpoint`](/infrastructure/configure-endpoints) and `set_post_filter` post-filtering — not by event configuration.

`verificationType` enum — increasing TLS strictness:

| Value | TLS behavior |
|---|---|
| `NONE` | No certificate validation. |
| `VERIFY_PEER` | Validates the broker's certificate chain. |
| `VERIFY_HOST` | Validates the broker hostname against the certificate. |
| `VERIFY_HOST_PEER` | Validates both chain and hostname. Production default. |

`mqttParams` — MQTT session and topic mapping:

| Field | Type | What it tells you |
|---|---|---|
| `keepAlive` | integer | Keep-alive interval in seconds while the client is idle (max `65535`). |
| `cleanSession` | boolean | `true` = start a clean session each connect; `false` = resume a persistent session. Default `true`. |
| `reconnectDelayMin` | integer | Minimum back-off (seconds) before reconnecting after a drop. |
| `reconnectDelayMax` | integer | Maximum back-off (seconds) before reconnecting after a drop. |
| `clientId` | string | MQTT client identifier; must be unique per reader per broker. |
| `username` | string | Broker username, when basic auth is used. |
| `password` | string | Broker password (masked in transit; do not log). |
| `publishTopics[]` | array | Up to **3** entries the reader publishes to. Each has `topic` (middle segment only), `qos`, and `retain`. |
| `subscribeTopics[]` | array | Up to **1** entry the reader subscribes to for inbound commands. Each has `topic`, `qos`, and `retain`. |

Each `publishTopics[]`/`subscribeTopics[]` entry contains only the **middle segment** of the topic. The reader prepends `tenantId` and appends `deviceSerialNumber` at runtime — so `MGMT/clients/cmnd` becomes `zebra/MGMT/clients/cmnd/RFD40-24190525100255` on the wire. `retain: true` means the broker holds the last message for late subscribers.

`securityParams` — present when `protocol` is `MQTT_TLS`:

| Field | Type | What it tells you |
|---|---|---|
| `format` | string (enum) | Certificate bundle format: `PEM` or `PFX` (`PEM` is the supported format on handheld readers). |
| `algorithm` | string (enum) | Signing algorithm, when reported: `RSA256` or `RSA512`. |
| `caCertificateFile` | string | Logical name of the installed CA certificate used to trust the broker. |
| `clientCert` | string | Logical name of the installed client certificate (mutual TLS). |
| `clientKey` | string | Logical name of the installed client private key (mutual TLS). |

The certificate logical names here must already be installed on the device. See [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates).

`eventConfiguration` — which device events this endpoint emits. The values are booleans (event enabled/disabled); `heartbeat` is paired with a `heartbeatConfiguration` block when enabled. Common flags returned for management endpoints:

| Flag | Meaning |
|---|---|
| `terminalConnection` | Terminal connect/disconnect events. |
| `firmwareUpdate` | Firmware update progress events. |
| `network` | Network state-change events. |
| `ntp` | NTP synchronization events. |
| `heartbeat` | Periodic heartbeat (`heartBeatEVT`); cadence set by `heartbeatConfiguration.interval`. |
| `power` | Power-source alerts. |
| `battery` | Battery alerts. |
| `fileDownload` | File-download alerts. |

> What this endpoint *emits* is configured per endpoint via `eventConfiguration`; how `dataEVT` reads are *routed* between `DATA1`/`DATA2` is configured via `config_endpoint`/`set_post_filter`, not via event flags. To change which events fire, see [Choose what the reader tells you](/observability/configure-events).

### Verify the result

1. Confirm `response.code` is `0` (`Success`). Any non-zero code means the query failed — see the error table.
2. For each endpoint you care about, check `activate`. An endpoint with `activate: false` is saved but **not** connecting, so expect no data flow from it.
3. Confirm `protocol`, `url`, and `port` match your broker (`MQTT_TLS` + `8883` for production).
4. For `MQTT_TLS`, confirm `verificationType` matches the broker's certificate posture (`VERIFY_HOST_PEER` for production).
5. Confirm `publishTopics`/`subscribeTopics` middle segments are correct — the reader publishes only to listed topics and receives commands only on the subscribed one.
6. Cross-check `savedEndpoints.epNames[]` to see which endpoint names already exist before you `add` a new one (re-adding an existing name returns error code `10`).

To watch the connection state of an endpoint after you change it, subscribe to `mqttConnEVT` — see [MQTT connection events](/observability/mqtt-connection).

### Response (error) codes

`get_endpoint_config` is read-only, so the codes you are most likely to see are these. The full code table is shared across all IOTC commands.

| Code | Meaning | Typical cause for `get_endpoint_config` |
|---|---|---|
| `0` | Success | Configuration returned. |
| `3` | Not able to retrieve information | The named `endpointName` does not exist, or configuration could not be read. |

> A 1883-vs-8883 or `MQTT`-vs-`MQTT_TLS` mismatch does **not** surface as an error code here — `get_endpoint_config` reports the configuration faithfully. You catch those by reading `protocol`/`port` and watching `mqttConnEVT` for failed connects.

### Related reading

- The reader's own Ethernet interface is reported by `get_eth` (not the broker side); on a handheld sled this interface is typically reported absent.
- For the full request/response schema and the complete shared error-code table, see the [endpoint configuration reference](/reference/mgmt/config-endpoint).

**Related:** 📘 [Endpoint Configuration](/infrastructure/mqtt-endpoints) · 📕 [get_endpoint_config](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) · 📙 [How to Configure](/infrastructure/configure-endpoints) · 📕 [Endpoint configuration reference](/reference/mgmt/config-endpoint) · 📘 [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates) · 📘 [Multi-endpoint architectures](/infrastructure/multi-endpoint)
