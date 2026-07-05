---
id: configure-events
title: Configure which events the reader emits
sidebar_label: Choose what the reader tells you
description: "Configure which IOTC events a reader emits via config_events: heartbeats, alerts, mqttConnEVT, dataEVT enable / interval / verbosity."
sidebar_custom_props: { emoji: "🎛️" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~10 min · **Ties to:** Event Configuration sub-tag of the API Reference

:::tip[See in the API Reference]
Sub-tag: Event Configuration. Operation: [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events).
:::

A sled can report a wide range of operational event classes — heartbeats, alerts, exceptions, NTP transitions, network state, firmware-update progress, GPI state, antenna health. **You decide which.** [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events) switches each event class on or off and sets the alert thresholds. For the full list of flags, the threshold fields, and the `heartbeatConfiguration` options, see [Event configuration (reference)](/reference/mgmt/config-events); for which of those events the firmware actually emits, see [The IOTC event model](/observability/events/model).

:::note[`config_events` is the single surface — it supersedes `config_alerts`]
A legacy `config_alerts` command once configured the system-resource alerts separately. It is **superseded by `config_events`** and is not part of the V1.1 command set — do not send it. Every toggle and threshold it set is reproduced here: the `cpuUsage` / `ramUsage` / `flashUsage` / `temperature` boolean flags paired with the `cpuThreshold` / `ramThreshold` / `flashThreshold` / `temperatureThreshold` fields (plus the `ntp` and `userApp` flags). Set alert thresholds through `config_events`.
:::

### Enable everything (initial development)

Turn every stream on while you map your application to the event stream, then trim what you do not consume:

```json
{
  "command": "config_events",
  "requestId": "events-all",
  "eventConfiguration": {
    "antenna": true, "terminalConnection": true, "firmwareUpdate": true,
    "gpi": true, "network": true, "exceptions": true, "ntp": true,
    "userApp": true, "heartbeat": true, "power": true, "battery": true,
    "temperature": true, "fileDownload": true, "cpuUsage": true,
    "flashUsage": true, "ramUsage": true,
    "heartbeatConfiguration": {
      "interval": 100, "inventoryStatus": true, "batteryStatus": true
    },
    "cpuThreshold": 80, "ramThreshold": 80, "flashThreshold": 80,
    "temperatureThreshold": 55
  }
}
```

### Selective production payload

A typical single-reader production posture — keep the alerts (power, battery, temperature) and operational events (terminal, network, firmware, file download), and drop the noisy or non-emitting ones:

```json
{
  "command": "config_events",
  "requestId": "events-prod",
  "eventConfiguration": {
    "antenna": false, "terminalConnection": true, "firmwareUpdate": true,
    "gpi": false, "network": true, "exceptions": false, "ntp": false,
    "userApp": false, "heartbeat": false, "power": true, "battery": true,
    "temperature": true, "fileDownload": true, "cpuUsage": false,
    "flashUsage": false, "ramUsage": false
  }
}
```

Omitting a flag leaves its current device-side state unchanged; setting it to `false` switches the stream off.

### Where the events actually go

Each enabled event publishes on the publish-topic family of whichever endpoint is configured to carry it. The MDM hybrid endpoint at bootstrap carries everything; a split deployment routes management events on the MGMT_EVT endpoint. How this device-wide command relates to an endpoint's own `eventConfiguration` is explained in [The IOTC event model → Configuration paths](/observability/events/model#configuration-paths).

### Pre-condition

[`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events) has no radio-state pre-condition — you can send it mid-inventory — and returns the generic response shape (`apiVersion`, `response.code`, `response.description`). Per the command schema, **event-configuration changes take effect after a device reboot**.

### Out of scope

- **The shape of each event payload** — covered per event: [Watch your reader's pulse](/observability/heartbeat), [When the reader needs to interrupt you](/observability/alerts), [Knowing when you're connected](/observability/mqtt-connection), [Where tag reads come from](/rfid/dataevt-schema).
- **What each flag and threshold means** — [Event configuration (reference)](/reference/mgmt/config-events).
- **Routing events to multiple endpoints** — [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints).

**Related:** 📕 [Event configuration (reference)](/reference/mgmt/config-events) · 📘 [The IOTC event model](/observability/events/model) · 📘 [Watch your reader's pulse](/observability/heartbeat) · 📘 [When the reader needs to interrupt you](/observability/alerts) · 📕 [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events)
