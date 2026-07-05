---
id: dual-channels
title: Dual data channels (data1event / data2event)
sidebar_label: "Dual data channels (data1event / data2event)"
description: "Why and how IOTC supports two parallel tag-data channels (data1event / data2event): use cases (split brokers, A/B routing), config, per-channel filters."
sidebar_custom_props: { emoji: "🔀" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder · **Read time:** ~4 min

IOTC exposes two tag-data channels: `data1event` and `data2event`. They are independent topic families carrying the same `dataEVT` payload schema. A reader can run **both concurrently** — up to two data endpoints (`DATA1` and `DATA2`) are supported at once — and route a different slice of its tag data to each. Configuration is per-reader, not per-tag. The names `data1event` / `data2event` are illustrative topic conventions; the endpoint *types* are `DATA1` / `DATA2`, and the actual middle topic segment is whatever you configure per endpoint.

### Why two channels exist

Three motivations:

- **Load balancing across consumers.** Two consumer applications can each subscribe to a different channel and receive disjoint subsets of the fleet's tag-data stream.
- **Priority separation.** Operationally critical readers can publish on `data1event` with a low-latency consumer; background-volume readers can publish on `data2event` with a batch consumer.
- **Topology specialisation.** Different channels can route to different brokers (see [Multi-endpoint architectures](/infrastructure/multi-endpoint)), enabling architectures where high-value data goes to one pipeline and high-volume data to another.

### How the channels are configured

Each channel is a separate data endpoint you provision with [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) (`epType: DATA1` or `DATA2`) and activate with `activate: true`. Both can be active simultaneously. To send a different subset of reads to each, scope a post-filter to the target endpoint with [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter) (`dataEpType: DATA_EP1` or `DATA_EP2`); filters on one endpoint do not affect the other. Endpoint definitions are sticky across reboots.

```d2
direction: right
S: Single-channel {
  direction: right
  SR: Reader
  SB: Broker { shape: queue }
  SA: App
  SR -> SB: DATA1
  SB -> SA
}
Dc: Dual-channel {
  direction: right
  DR: Reader
  DB1: Broker A { shape: queue }
  DA1: Operational app
  DB2: Broker B { shape: queue }
  DA2: Analytics pipeline
  DR -> DB1: "DATA1\n(local app)"
  DB1 -> DA1
  DR -> DB2: "DATA2\n(analytics)"
  DB2 -> DA2
}

```

### What this implies for application architecture

Applications must subscribe to **the channel(s) the reader is configured to publish on**. Subscribing only to `data1event` when a reader routes a subset of reads to `data2event` means that subset never arrives. Fleet-wide dashboards typically subscribe to **both** channels using wildcard topics; per-channel specialised consumers subscribe to one.

**Related:** 📘 [Tag Data Architecture](/rfid/tag-data/architecture) · 📙 [Configure Event Reporting](/observability/configure-events) · 📕 [DATA Interface](/reference/api-overview) · 📕 [config_events](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events)
