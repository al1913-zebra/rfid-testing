---
id: device-health
title: How to check device status and health
sidebar_label: How to check device status & health
description: "Check IOTC reader device health: get_status (battery, temp, antennas), get_version (firmware), and how to combine them into a fleet-wide health metric."
sidebar_custom_props: { emoji: "🩺" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** ~5 min

This guide shows you how to check the health of a handheld reader on demand and continuously.

### On-demand: [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status)

```json
{"command": "get_status", "requestId": "status-1"}
```

The response includes radio activity (`radioActivity`: `ACTIVE` / `INACTIVE`), the radio and terminal connection states, power source, battery (level and health), temperature, system time, and NTP reachability. (Firmware version comes from [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version), and uptime from `heartbeatEVT.upTime` — not from `get_status`.) For the full field list, see [API Reference](/reference/api-overview).

```d2
direction: right
R: "get_status response" { shape: page }
DS: deviceStatus
RR: "response\n(code, description)"
PS: powerSource
BS: batteryStatus
RA: radioActivity
RC: radioConnection
NT: ntp.reach
ST: systemTime
TM: temperature
BC: chargePercentage
BH: stateOfHealth
R -> DS
R -> RR
DS -> PS
DS -> BS
DS -> RA
DS -> RC
DS -> NT
DS -> ST
DS -> TM
BS -> BC
BS -> BH

```

### Continuous: subscribe to `heartbeatEVT`

For a reader on its MGMT interface, subscribe to:

```
{tenantId}/mgmt/clients/<channel>/<deviceSerial>
```

and filter on `eventName == "heartbeat"`. Heartbeats arrive at the configured interval (see [Configure events](/observability/configure-events)).

### Combine the two

[`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) gives a point-in-time snapshot; `heartbeatEVT` gives a stream. Combine for resilience: query [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) at startup or on demand; trust `heartbeatEVT` for ongoing state. If they disagree, the more recent timestamp wins.

**Related:** 📕 [get_status](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) · 📕 [heartbeatEVT](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#tag-heartbeatevt) · 📘 [Heartbeat Events](/observability/heartbeat)
