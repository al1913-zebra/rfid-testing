---
id: multi-endpoint
title: Multi-endpoint architectures
sidebar_label: Multi-endpoint architectures
description: "Why and how a single RFD40/RFD90 reader runs multiple concurrent MQTT endpoints: the seven epTypes, per-endpoint activation, broker isolation patterns, dual-data routing, and the topic/QoS/limit mechanics that make it work."
sidebar_custom_props: { emoji: "🔀" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder · **Read time:** ~9 min

A single RFD40 Premium, RFD40 Premium Plus, RFD9030, or RFD9090 reader is not limited to one MQTT connection. The IOTC firmware models each connection as a named **endpoint** with its own broker URL, port, protocol, credentials, TLS material, topic set, and reconnect policy. Because endpoints carry a **role** (`epType`) rather than just an address, one reader can publish management responses to a control plane, stream tag data to a separate analytics broker, and answer to an MDM platform — all at the same time, over independent TCP sessions.

> *"A reader can have multiple endpoints with different types simultaneously — for example, one `MGMT` endpoint for commands and one `DATA1` endpoint for tag data."* — `config_endpoint` operation description.

This page explains the **why and the mechanism**. For the step-by-step add/update/delete procedure, see [How to configure MQTT endpoints](/infrastructure/configure-endpoints); for the topic and type model in isolation, see [Endpoint Configuration](/infrastructure/mqtt-endpoints).

## Why split a reader across endpoints

A reader generates three fundamentally different traffic profiles, and merging them onto one broker connection couples their failure and scaling characteristics:

| Traffic class | Cadence | Sensitivity | Natural owner |
|---|---|---|---|
| Management commands / responses (`MGMT`) | Low, request-response | Latency-sensitive — operators wait on the reply | Operations / NOC |
| Management & connectivity events (`MGMT_EVT`) | Sporadic bursts (firmware, alerts, `mqttConnEVT`) | Must not be dropped under data load | Operations / NOC |
| RFID tag data (`DATA1` / `DATA2`) | High, fire-and-hose during inventory | Throughput-sensitive, loss-tolerant per-read | Analytics / cloud pipeline |

When a busy inventory pushes thousands of `dataEVT` messages per second through the same connection that carries a `set_operating_mode` reply, the command-response path can starve. Splitting `DATA1` onto its own broker connection isolates that backpressure. The trade-off is real operational cost — covered under [Trade-offs](#trade-offs) — so the split should be driven by scale, latency, or policy, never adopted by default.

## The endpoint as the unit of architecture

Every endpoint is created, modified, and removed with one command, [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint), and inspected with [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config). The `epType` field, not the URL, is what makes multi-endpoint topologies possible — the firmware routes each role's traffic to whichever endpoint of that type is currently active.

### Endpoint types (`epType`)

The `epType` enum is fixed. Each value binds a connection to a role:

| `epType` | Carries | Notes |
|---|---|---|
| `MGMT` | Management command channel and responses | Dedicated channel to send commands and receive responses. |
| `MGMT_EVT` | Management events pushed by the reader | Connection status, firmware updates, and alerts as a dedicated push channel. |
| `MDM` | Management **and** management events on one connection | The hybrid endpoint — folds the `MGMT` and `MGMT_EVT` roles into a single connection. Required first endpoint (see below). |
| `CTRL` | Operational control | Start/stop inventory, change operating mode. |
| `DATA1` | Primary RFID tag-data stream | Streams tag reads (`dataEVT`) to a backend. |
| `DATA2` | Secondary RFID tag-data stream | A concurrent second data destination — see [Two data endpoints](#two-data-endpoints). |
| `SOTI` | SOTI MobiControl device management | Use when the management platform is SOTI MobiControl. |

> `DATA1`/`DATA2` are the endpoint-type names used by `config_endpoint`. The post-filter command [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter) refers to the same two endpoints as `DATA_EP1` and `DATA_EP2`.

### Provisioning order: MDM first, everything else over the air

Multi-endpoint topologies are bootstrapped, not configured all at once. The dependency is strict:

1. **MDM endpoint (manual).** The `MDM` endpoint is the *first* endpoint that must exist. It is configured during onboarding using the **123RFID application** — it is the only endpoint configured that way, and it gives the reader its initial broker connection.
2. **All other endpoints (remote).** Once the reader is connected via the active MDM endpoint, every additional endpoint (`MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, and even additional `MDM` endpoints) is added remotely with `config_endpoint` over MQTT.

The hybrid `MDM` endpoint handles both management and management events on one connection. Splitting into dedicated `MGMT` and `MGMT_EVT` endpoints is what you do when you need finer control — separate brokers, separate credentials, or separate event retention from command latency.

### Activation selects the live endpoint per role

You can stage many endpoints on a reader and switch which one is live without re-sending its full configuration. The `activate` flag governs this:

- `activate: true` — the endpoint becomes active immediately after the command succeeds; MQTT connections are made to it.
- `activate: false` — the configuration is *saved* on the device but not connected. The default is `false`.

> The active endpoint determines which connection profile the reader uses — whichever endpoint is marked `activate: true` handles communication for that role.

This is the mechanism behind safe broker migration: stage the new endpoint with `activate: false`, verify it with `get_endpoint_config`, then flip it active with an `update`. A saved-but-inactive endpoint is the most common reason data does not flow — it is the first field to check in the response.

## Topic and QoS mechanics that constrain a topology

Endpoint topologies are bounded by hard firmware limits. Designing a split that exceeds them produces a rejected command, not a degraded connection.

### The three-part topic, constructed at runtime

You configure only the **middle segment** of each topic. The reader assembles the full topic itself:

```
<tenantId> / <topic> / <deviceSerialNumber>
```

If `tenantId` is `zebra`, the configured `topic` is `MDM/clients/resp`, and the device serial is `RFD40-24190525100255`, the reader publishes to:

```
zebra/MDM/clients/resp/RFD40-24190525100255
```

Never put `tenantId` or the device serial in the `topic` field — the reader prepends and appends them automatically. Per-endpoint topic naming (`MGMT/...`, `CTRL/...`, `DATA1/...`) is also how a single broker disambiguates roles when you choose *not* to split brokers.

### Per-endpoint limits and required fields

| Field | Constraint | Violation → error |
|---|---|---|
| `endpointName` | Required for every operation; must be unique on `add` | `add` of an existing name → **code 10** (`IOT_ERROR_CONFIG_ALREADY_EXIST`) |
| `publishTopics` | Maximum **3** entries per endpoint | More than 3 → **code 25** (`IOT_ERROR_PUBLISH_TOPICS_EXCEEDED`) |
| `subscribeTopics` | Maximum **1** entry per endpoint | More than 1 → **code 26** (`IOT_ERROR_SUBSCRIBE_TOPIC_EXCEEDED`) |
| `tenantId` | Bounded length | Too long → **code 27** (`IOT_ERROR_INVALID_TENANTID_LENGTH`) |
| `epType`, `protocol`, `verificationType` | Must match the fixed enums | Out-of-enum value → **code 23** (`IOT_ERROR_INVALID_ENUM`) |

A successful `config_endpoint` returns `response.code: 0` (`Success`). On `add`/`update`/`delete`, the required request fields are `command`, `requestId`, and `epConfig`. For `delete`, only `endpointName` and `epType` are needed inside `configuration`.

### Required `configuration` fields per endpoint

Every `add` (and `update` that changes connection parameters) must carry these fields. Certificate files referenced under `securityParams` must already be installed via [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) before the endpoint is configured.

| Field | Type | Enum / example | Meaning |
|---|---|---|---|
| `endpointName` | string | `mgmt`, `dataEP` | Unique name; identifies the endpoint for `update`/`delete`. |
| `epType` | enum | `MGMT`, `MGMT_EVT`, `CTRL`, `DATA1`, `DATA2`, `SOTI`, `MDM` | Role of the endpoint. |
| `protocol` | enum | `MQTT`, `MQTT_TLS` | Plain or TLS transport. |
| `activate` | boolean | `false` (default) | Connect now (`true`) or stage (`false`). |
| `url` | string | `iotc-broker.zebra.com` | Broker hostname or IP. |
| `port` | integer | `1883` (MQTT) / `8883` (MQTT_TLS) | Broker port. |
| `verificationType` | enum | `NONE`, `VERIFY_PEER`, `VERIFY_HOST`, `VERIFY_HOST_PEER` | TLS peer/host verification level. |
| `qosCommon` | integer | `1` | Default QoS applied to the endpoint. |
| `tenantId` | string | `ZEBRA` | First topic segment; not embedded in `topic`. |

## Worked topology — split-broker reader with dual data

A realistic scale deployment: command/response and management events go to an operations broker over TLS; tag data is split across two data brokers — `DATA1` to a regional ingest broker and `DATA2` to an on-prem analytics broker — while an MDM endpoint anchors device management. All four roles run concurrently on one reader.

```d2
direction: right
R: RFD40 Premium reader
BO: Ops Broker (8883, TLS) { shape: queue }
BD1: Regional Data Broker { shape: queue }
BD2: On-prem Analytics Broker { shape: queue }
BM: MDM Broker { shape: queue }
NOC: Operations / NOC
CLOUD: Cloud Analytics
LOCAL: Local Dashboard
MDM: "MDM Platform"
R -> BO: "MGMT + MGMT_EVT (CTRL)"
R -> BD1: "DATA1 (dataEVT)"
R -> BD2: "DATA2 (filtered subset)"
R -> BM: "MDM hybrid"
BO -> NOC
BD1 -> CLOUD
BD2 -> LOCAL
BM -> MDM
```

### Stage the management endpoint (TLS, not yet live)

Saved with `activate: false` so it can be verified before cut-over. Note exactly **3** publish topics (response, event, rfid) and **1** subscribe topic (command) — the maximums:

```json
{
  "command": "config_endpoint",
  "requestId": "topo-mgmt-1",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "mgmt_tls",
      "epType": "MGMT",
      "protocol": "MQTT_TLS",
      "activate": false,
      "url": "ops-broker.zebra.com",
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

### Add the primary data endpoint (live, separate broker)

A different `url` from `MGMT` — this is the isolation that protects command latency from inventory backpressure. Plain MQTT on `1883` here for an in-VPC ingest broker:

```json
{
  "command": "config_endpoint",
  "requestId": "topo-data1-1",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "dataEP",
      "epType": "DATA1",
      "protocol": "MQTT",
      "activate": true,
      "url": "regional-ingest.zebra.com",
      "verificationType": "NONE",
      "port": 1883,
      "qosCommon": 1,
      "tenantId": "zebra",
      "mqttParams": {
        "keepAlive": 300,
        "cleanSession": true,
        "reconnectDelayMin": 50,
        "reconnectDelayMax": 500
      }
    }
  }
}
```

Each successful call returns:

```json
{
  "command": "config_endpoint",
  "requestId": "topo-data1-1",
  "apiVersion": "V1.1",
  "response": { "code": 0, "description": "Success" }
}
```

### Verify before cut-over

[`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) returns both the active endpoints and the list of every saved endpoint name, so you can confirm staging worked:

```json
{
  "command": "get_endpoint_config",
  "requestId": "topo-verify-1",
  "apiVersion": "V1.1",
  "endpointResponse": {
    "activeEndpoints": {
      "epConfig": [
        { "configuration": { "endpointName": "dataEP", "epType": "DATA1", "activate": true, "url": "regional-ingest.zebra.com", "port": 1883 } }
      ]
    },
    "savedEndpoints": {
      "epNames": ["mdm_onboard", "mgmt_tls", "dataEP", "dataEP2"]
    }
  },
  "response": { "code": 0, "description": "Success" }
}
```

`mgmt_tls` appears under `savedEndpoints.epNames` but **not** under `activeEndpoints` — it is staged but inactive. Flip it live with an `update` carrying `activate: true`. Because `config_endpoint` is a state-changing command, retries must use a **new** `requestId`; only read-only `get_*` queries such as `get_endpoint_config` are idempotent on the same `requestId`.

## Two data endpoints (`DATA1` / `DATA2`) {#two-data-endpoints}

`DATA1` and `DATA2` (a.k.a. `DATA_EP1` / `DATA_EP2`) are **concurrent**, not failover. A reader can stream tag data to both at once — for example, full reads to a cloud pipeline on `DATA1` and a filtered subset to a local dashboard on `DATA2`.

How traffic is *divided* between them is decided by routing, not by event configuration:

- **Endpoint target / broker** is set with `config_endpoint` (the `url`, `port`, and topics of each `DATA` endpoint).
- **Which tags reach which endpoint** is set with [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter), whose `dataEndpoint` field is scoped to `DATA_EP1` or `DATA_EP2`. A filter on one endpoint does not affect the other.

```json
{
  "command": "set_post_filter",
  "requestId": "pf-data2-1",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA_EP2",
    "matchPattern": "E280",
    "matchPatternMethod": "PREFIX",
    "reportOperation": "INCLUDE"
  }
}
```

This routes only tags whose EPC begins with the hex prefix `E280` to the `DATA2` broker, while `DATA1` continues to carry the full read stream. This is purely a *routing* decision — `config_endpoint`/`set_post_filter` decide which data reaches `DATA1` versus `DATA2`. It is distinct from `dataEVT` **cadence** (per-read vs. aggregated), which is not a per-endpoint setting at all: cadence is controlled by the required `reportFilter` `duration` field of the operating-mode configuration set with [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) (`0` = each individual tag read is reported; `>0` = reads are aggregated and reported at that interval — neither value is a default). One operating-mode cadence applies to the reader; post-filters then route the resulting `dataEVT` traffic across the two data endpoints.

## Single-broker architecture

All four interfaces connect to the same broker. The simplest pattern; recommended for deployments below a few hundred readers. The roles are still distinct — they are disambiguated by their topic middle segments (`MGMT/...`, `CTRL/...`, `DATA1/...`) on the shared broker — but they share one TCP session, one credential set, and one failure domain.

```d2
direction: down
R: Reader
B: Single Broker { shape: queue }
A: Application
R -> B: "MGMT, CTRL, DATA*"
B -> A

```

**Use when:** straightforward operations matter more than scale specialisation.

## Separate data broker

MGMT, CTRL, and MDM share one broker; DATA routes to a dedicated tag-data broker (commonly a managed IoT platform). The `DATA1`/`DATA2` endpoints carry a different `url` from the management endpoints, which is precisely what isolates inventory backpressure from command-response latency.

```d2
direction: down
R: Reader
B1: Management Broker { shape: queue }
B2: Data Broker { shape: queue }
A1: Control App
A2: Analytics Pipeline
R -> B1: "MGMT, CTRL"
R -> B2: "DATA1, DATA2"
B1 -> A1
B2 -> A2

```

**Use when:** tag volume threatens to starve command-response latency, or DATA needs to flow directly into a cloud analytics pipeline.

## MDM-managed endpoint

SOTI Connect sets the endpoint configuration on the reader's behalf; the reader does not need application-side endpoint configuration. The `SOTI` endpoint type binds the connection to SOTI MobiControl; the hybrid `MDM` type folds management and management-events onto a single connection where a dedicated `MGMT`/`MGMT_EVT` split is not required.

```d2
direction: down
R: Reader
BM: MDM Broker { shape: queue }
BO: Operational Broker { shape: queue }
M: "MDM Platform\nSOTI / SureMDM"
A: Application
R -> BM: MDM hybrid
R -> BO: "CTRL, DATA*"
BM -> M
BO -> A

```

**Use when:** enterprise MDM is mandated by IT policy or fleet operations.

## Trade-offs

Separate brokers add operational complexity (two sets of credentials, two health metrics, partial-connectivity failure modes) but buy isolation and specialisation. The pattern is justified when scale, latency, or organisational policy demand it, not by default.

Concretely, weigh these against the single-broker baseline:

| Dimension | Single broker | Split brokers |
|---|---|---|
| Credentials & certificates | One set | One set **per endpoint** — more to rotate, see [TLS and certificates](/infrastructure/tls-and-certificates) |
| Failure domains | All-or-nothing | Partial connectivity — data can flow while management is down, and vice versa |
| Backpressure isolation | None — data load can starve commands | Strong — inventory traffic cannot delay command-response |
| Connectivity observability | One `mqttConnEVT` stream | Per-endpoint connection state; each endpoint reports independently |
| Operational overhead | Minimal | Two+ broker fleets to provision, monitor, and reconnect-tune |

Because each endpoint keeps its own `reconnectDelayMin`/`reconnectDelayMax` and emits its own connectivity signal, a split topology degrades gracefully: losing the data broker does not sever management, so you can still issue commands and inspect state while the analytics path recovers.

**Related:** 📘 [Endpoint Configuration](/infrastructure/mqtt-endpoints) · 📙 [Configure Endpoints](/infrastructure/configure-endpoints) · 📗 [View Endpoints](/infrastructure/view-endpoints) · 📘 [Cloud Integration Patterns](/fleet/cloud-integration/patterns) · 📙 [Custom Broker](/fleet/cloud-integration/custom-broker)

---
