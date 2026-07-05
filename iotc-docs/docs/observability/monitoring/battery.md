---
id: battery
title: How to monitor battery lifecycle
sidebar_label: How to monitor battery lifecycle
description: "Monitor IOTC reader battery lifecycle: heartbeat battery snapshots (current state) vs alerts (transitions like LOW set / CLEAR). How to pipeline both."
sidebar_custom_props: { emoji: "🔋" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** ~10 min

### Subscribe to battery state

Watch `heartbeatEVT.data.batteryAlert`:

```json
{
  "data": {
    "batteryAlert": {
      "status": "HIGH",
      "stateOfHealth": "FULL",
      "chargePercentage": 78
    }
  }
}
```

### React to battery alerts

Watch the `alerts` event with `id: BATTERY`:

```json
{
  "id": "BATTERY",
  "state": "ONESHOT",
  "priority": "LOW",
  "alertDetails": {"batteryAlert": {"status": "CHARGING", "stateOfHealth": "FULL", "chargePercentage": 100}}
}
```

A low or critical battery condition surfaces as an `alerts` event with `id: BATTERY` and an `alertDetails.batteryAlert.status` of `LOW` or `CRITICAL` (the other states are `CHARGING`, `FULL`, and `HIGH`).

### Interpret `stateOfHealth`

Two different surfaces report a `stateOfHealth`, and they use **different value sets** — match the field to the surface you are reading:

| Surface | Field | Values |
|---|---|---|
| `alerts` BATTERY event | `alertDetails.batteryAlert.stateOfHealth` | `LOW`, `CRITICAL`, `CHARGING`, `FULL`, `HIGH` (same scale as `status`) |
| `get_status` response | `batteryStatus.stateOfHealth` | `GOOD`, `AVERAGE`, `POOR` (long-term capacity grade) |

For the long-term capacity grade returned by `get_status`:

| Value | Meaning |
|---|---|
| `GOOD` | Battery is operating within nominal capacity |
| `AVERAGE` | Capacity has degraded measurably; monitor for replacement |
| `POOR` | Replacement recommended |

:::note[Provenance — which battery facts are schema-backed]
The long-term grade (`GOOD`/`AVERAGE`/`POOR`) is the **only** capacity rating the API schema defines: `deviceStatusResponse.yaml` → `batteryStatus.stateOfHealth`. The `alerts`/`batteryAlert` event also has a field named `stateOfHealth`, but its schema enum holds **charge-state** labels (`LOW`/`CRITICAL`/`CHARGING`/`FULL`/`HIGH`) — the same scale as its `status` field — despite the field name. Read the event's `stateOfHealth` as charge state, not as a health grade. The numeric `chargePercentage` → `status` trigger thresholds are **firmware-dependent** and are not in the schema; characterise drain in your own environment (next section).
:::

### Drain characterisation

Per-mode drain figures are deployment-specific. Measure drain over a representative shift in your environment. The canonical telemetry field is `heartbeatEVT.data.batteryAlert.chargePercentage` over time. Operational recommendations for battery-constrained deployments include increasing the heartbeat interval and stopping inventory between active scans.

**Related:** 📘 [Alert Events](/observability/alerts) · 📕 [alerts schema](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#tag-alerts) · 📙 [Diagnose battery issues](/diagnose/symptoms)

---
