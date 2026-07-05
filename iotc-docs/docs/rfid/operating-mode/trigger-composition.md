---
id: trigger-composition
title: "RFID trigger composition: start and stop conditions"
sidebar_label: Trigger composition
description: "How the IOTC trigger button composes with control_operation: trigger modes, what each pull sends, and how host-app and trigger-driven inventory interact."
sidebar_custom_props: { emoji: "🔘" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder · **Read time:** ~5 min

The handheld sled has a physical trigger button. Its behaviour with respect to RFID inventory is **composed** from two independent enums — `radioStartConditions.trigger` and `radioStopConditions.trigger`, set inside `set_operating_mode`'s `operatingMode.operatingModes` object.

### The two enums

Both `radioStartConditions.trigger` and `radioStopConditions.trigger` accept the same enum: `IMMEDIATE`, `PRESSED`, `RELEASED`.

- `IMMEDIATE`: fires as soon as the command is applied (start) or based on threshold conditions (stop).
- `PRESSED`: fires on physical trigger press.
- `RELEASED`: fires on physical trigger release.

### Common compositions

| Behaviour | start | stop |
|---|---|---|
| Press-and-hold | `PRESSED` | `RELEASED` |
| Toggle | `PRESSED` | `PRESSED` |
| Pulse with auto-stop | `PRESSED` | `IMMEDIATE` (+ `stopTimeout`) |
| Operator-initiated, count-bounded | `PRESSED` | `IMMEDIATE` (+ `tagCount`) |
| Always running | `IMMEDIATE` | `IMMEDIATE` (+ `inventoryCount`) |

These behaviours are compositions of the start and stop triggers above — there is no separate "trigger mode" enum to set.

### The radio lifecycle

Whichever start and stop triggers you compose, they move the radio through three states:

```d2
classes: { good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } } }
direction: down
IDLE
READY: "READY\n(configured, not emitting)"
ACTIVE: "ACTIVE\n(radioActivity = ACTIVE)" { class: good }
IDLE -> READY: START
READY -> ACTIVE: fire
ACTIVE -> IDLE: STOP
ACTIVE -> IDLE: "failure / timeout / threshold" { style.stroke-dash: 4 }
```

`get_status.deviceStatus.radioActivity` reads `ACTIVE` while running and `INACTIVE` otherwise. The intermediate `READY` state (radio configured, not yet emitting) is brief and not directly observable from `radioActivity`.

### Interaction with MQTT-initiated control

A [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) START produces the same effect as if the trigger fired (subject to the `radioStartConditions.trigger` configuration). The trigger and the API are equivalent input sources; the most recent event wins.

**Related:** 📘 [Handheld Considerations](/foundations/architecture/handheld-considerations) · 📙 [Start/Stop](/rfid/start-stop-inventory) · 📕 [set_operating_mode](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode)
