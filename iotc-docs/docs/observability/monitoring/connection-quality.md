---
id: connection-quality
title: How to monitor connection quality
sidebar_label: How to monitor connection quality
description: "Monitor IOTC reader MQTT connection quality from mqttConnEVT reconnect counts, heartbeat gaps, and NETWORK_EVENT alerts for Wi-Fi/Ethernet state changes."
sidebar_custom_props: { emoji: "📶" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** ~10 min

This guide shows you how to monitor a handheld reader's connection quality continuously, using the signals the reader actually publishes over MQTT.

### MQTT connection stability

Maintain a count of `mqttConnEVT` transitions per reader over rolling windows. `mqttConnEVT` fires on every `CONNECTED` / `DISCONNECTED` transition; a reader with more than ~10 reconnects per hour likely has a connectivity issue — Wi-Fi roaming, AP coverage gaps, or broker capacity.

### Heartbeat gaps

A reader emitting `heartbeatEVT` at its configured interval (60 s by default) that then misses several in a row is effectively offline, even if no `DISCONNECTED` event arrived (an ungraceful drop publishes the broker's Last Will, but a stuck radio may not). Track the gap between consecutive heartbeats; a gap beyond ~3× the interval is a strong offline signal.

```d2
classes: {
  good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } }
  warn: { style: { fill: "#fef7e0"; stroke: "#f9ab00"; font-color: "#b06000" } }
  bad:  { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
direction: down
T1: "t=0\nheartbeat" { class: good }
T2: "t=60\nheartbeat" { class: good }
T3: "t=90\nmqttConnEVT\nDISCONNECTED" { class: bad }
T4: "t=95\nmqttConnEVT\nCONNECTED" { class: good }
T5: "t=120\nheartbeat\n(gap detected)" { class: warn }
T1 -> T2 -> T3 -> T4 -> T5

```

### Network-interface events

Enable the `network` event flag via [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events). The reader then publishes `alerts` with `id: NETWORK_EVENT` whenever a Wi-Fi or Ethernet interface connects, disconnects, or changes IP. Each carries `alertDetails.networkInfo.networkInterface.wifiStatus[]` (or `ethStatus[]`) with `status` (`CONNECTED` / `DISCONNECTED`), `ssid`, and `ipV4Address` — the authoritative record of when and how the link changed.

:::note[Wi-Fi RSSI is not on the MQTT surface]
The reader does not publish a Wi-Fi signal-strength (RSSI) value in any IOTC event. Use reconnect frequency (`mqttConnEVT`), heartbeat gaps, and `NETWORK_EVENT` alerts as your connection-quality signals; read radio-level RSSI from 123RFID Desktop or the host platform if you need it.
:::

### Correlating to environmental causes

| Pattern | Likely cause |
|---|---|
| Reconnects cluster at AP boundaries | Wi-Fi roaming; check AP placement and channels |
| Reconnects during certain shift hours | RF interference or AP congestion at those times |
| `NETWORK_EVENT` shows an IP change on each reconnect | DHCP lease churn; consider longer leases or static addressing |
| Reconnects with no `NETWORK_EVENT` correlation | Investigate the broker or upstream network |

**Related:** 📘 [Knowing when you're connected](/observability/mqtt-connection) · 📘 [Watch your reader's pulse](/observability/heartbeat) · 📘 [When the reader needs to interrupt you](/observability/alerts) · 📙 [Diagnose connection issues](/diagnose/symptoms)
