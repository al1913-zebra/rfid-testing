---
id: mqtt-endpoints
title: How the MQTT plumbing fits together
sidebar_label: How the MQTT plumbing fits together
description: How IOTC's seven MQTT endpoint types (MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM) interconnect. Topic three-segment pattern, retention, per-endpoint TLS.
sidebar_custom_props: { emoji: "🚰" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder · **Read time:** ~5 min · **Ties to:** MQTT Endpoint Configuration sub-tag of the API Reference

:::tip[See in the API Reference]
Sub-tag: MQTT Endpoint Configuration. Operations: [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) · [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint).
:::

The word *endpoint* is overloaded. **API endpoints** are MQTT operation names — [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status), [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint), [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation). **MQTT endpoints** are broker connection targets — host, port, TLS settings, credentials, topic mapping. This chapter is about the second meaning: how the reader's broker connections are shaped, how many you can have, and how to choose between the hybrid bootstrap and the split-by-role production posture.

### Seven endpoint types

Each [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) operation creates or updates one MQTT endpoint of a specific `epType`:

| epType | What it carries | Direction | When to use |
|---|---|---|---|
| `MGMT` | Identity, network, security, config, firmware commands and responses | Bidirectional | Dedicated management channel |
| `MGMT_EVT` | Heartbeats, alerts, NTP, network/firmware events | Sled → app | Dedicated event channel |
| `CTRL` | [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode), [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation), [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter) | Bidirectional | Dedicated RFID control channel |
| `DATA1` | `dataEVT` tag stream | Sled → app | Primary tag-data destination |
| `DATA2` | Second `dataEVT` stream | Sled → app | Secondary tag-data destination |
| `MDM` | Management + Control + Data combined | Bidirectional | Bootstrap default; MDM platform integration |
| `SOTI` | SOTI MobiControl integration | Bidirectional | SOTI-managed fleets |

The full field schema for each endpoint is on the [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) reference. The runtime list of what is currently active is fetched with [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config).

### The topic format, always three parts

Every IOTC topic is constructed at runtime as:

```
<tenantId> / <topic> / <deviceSerialNumber>
```

You configure **only the middle segment** in `publishTopics[].topic` and `subscribeTopics[].topic`. The reader prepends `tenantId` and appends `deviceSerialNumber` automatically. With tenant `zebra`, middle topic `CTRL/clients/cmnd`, serial `RFD40-24190525100255`, the wire topic is:

```
zebra/CTRL/clients/cmnd/RFD40-24190525100255
```

**Never** include `tenantId` or the serial in the `topic` field, they get added twice and the path becomes unroutable.

### Hybrid (MDM) vs split (MGMT + CTRL + DATA)

The MDM endpoint created by 123RFID Desktop at bootstrap is **hybrid**: it carries management commands, control commands, events, *and* tag data on one topic family. This is convenient for first-light but has three production costs:

- **Backpressure leaks across roles.** A slow data consumer can starve management commands on the same session.
- **No per-role QoS.** QoS is per-endpoint; you cannot apply QoS 1 to commands and QoS 0 to tag data on the same hybrid.
- **Authorization sprawl.** Broker-side ACLs cannot separate operator access from data-pipeline access when everything lives under `MDM/`.

Production deployments typically split into `MGMT` + `CTRL` + `DATA1`. Add `MGMT_EVT` if you need a dedicated event channel; add `DATA2` if you need a second data destination (e.g., one to a real-time analytics pipeline, one to an archive).

**When to move off the bootstrap endpoint** — a quick decision:

| Keep the MDM bootstrap endpoint when… | Move to dedicated endpoints when… |
|---|---|
| Single broker, single consumer, modest tag volume | Control and data must go to different brokers |
| A pilot, a demo, or a single-reader deployment | You need per-role QoS (QoS 1 for commands, QoS 0 for tag data) |
| You want the simplest possible topology | Broker ACLs must separate operator access from the data pipeline |

The split is **additive** — adding `CTRL` does not remove the MDM endpoint. Phase 5 of the Quick Start walks the canonical add sequence.

```d2
direction: down
H: "Hybrid (MDM) — bootstrap default" {
  direction: right
  hr: Reader
  hb: Broker { shape: queue }
  ha: Application
  hr -> hb: "MDM (mgmt + ctrl + data)"
  hb -> ha
}
S: "Split — production" {
  direction: right
  sr: Reader
  sb: Broker { shape: queue }
  sa: Application
  sr -> sb: MGMT
  sr -> sb: CTRL
  sr -> sb: DATA1
  sb -> sa
}
```

### Limits, verification, and inspection

A few hard limits shape topology: at most **3 publish topics** and **1 subscribe topic** per endpoint, and `endpointName` must be unique when you `add`. The `verificationType` enum (`NONE` → `VERIFY_PEER` → `VERIFY_HOST` → `VERIFY_HOST_PEER`) sets how strictly the TLS handshake checks the broker; production uses `VERIFY_HOST_PEER`, which validates both the certificate chain and the hostname. Any certificate logical names it references must already be installed — see [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates).

Before any `update` or `delete`, run [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) to confirm the target exists and read its current configuration — it returns both the active endpoints and the names of saved-but-inactive ones. The full `verificationType` enum, the per-limit error codes, and the `add` / `update` / `delete` payload shapes live in the [endpoint configuration reference](/reference/mgmt/config-endpoint).

### Out of scope

- **TLS setup and certificate installation**: [Securing the connection](/infrastructure/tls-and-certificates).
- **Per-endpoint event flag configuration**: `eventConfiguration` and `heartbeatConfiguration` within [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) are covered in [Choose what the reader tells you](/observability/configure-events).
- **Bulk endpoint configuration across a fleet**: [Keeping a fleet in sync](/fleet/bulk-management).

**Related:** 📕 [Endpoint configuration (MGMT)](/reference/mgmt/config-endpoint) · 📙 [How to configure MQTT endpoints](/infrastructure/configure-endpoints) · 📘 [How commands and responses flow](/foundations/communication-flow) · 📘 [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates) · 📕 [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/)
