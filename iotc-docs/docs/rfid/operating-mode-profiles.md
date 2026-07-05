---
id: operating-mode-profiles
title: Choose how the reader reads tags
sidebar_label: Choose how the reader reads tags
description: "Operating-mode profiles in IOTC: CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE, ADVANCED. What each tunes and when to pick which."
sidebar_custom_props: { emoji: "📻" }
---

> 📘 **EXPLANATION** · **Audience:** All · **Read time:** ~6 min · **Ties to:** Operating Mode sub-tag of the API Reference

:::tip[See in the API Reference]
Sub-tag: Operating Mode. Operations: [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode) · [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode).
:::

The operating mode of an IOTC reader is configured around a **profile**, a named preset that selects how the radio behaves. Profile choice is the most consequential decision in how the reader reads. Get it wrong and the symptoms range from "no reads" through "battery dies in an hour" to "every neighbour reader interferes." Get it right and the rest of the operating-mode surface is parameter-level refinement.

> New to RFID vocabulary — singulation, EPC Gen2 sessions, `linkProfile`, `transmitPower`? Keep the [Glossary](/reference/glossary) open as you read.

### Five supported profiles

| Profile | What it optimises for |
|---|---|
| `CYCLE_COUNT` | Maximum unique tag reads per inventory cycle |
| `DENSE_READERS` | Multiple readers in close proximity (warehouse, factory floor) |
| `OPTIMAL_BATTERY` | Battery longevity above read performance |
| `BALANCED_PERFORMANCE` | The default. Even mix of read performance and battery life. |
| `ADVANCED` | Manual control of `transmitPower`, `linkProfile`, `session`, `dynamicPower` via `advancedConfigurations` |

A sixth enum value, **`FAST_READ`**, appears in the schema but is documented as **not currently supported**. Selecting it returns an error. The doc here lists five effective options.

### Setting a profile

A minimal [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) payload that selects a profile only:

```json
{
  "command": "set_operating_mode",
  "requestId": "set-mode-001",
  "operatingMode": {
    "operatingModes": {
      "profiles": "BALANCED_PERFORMANCE"
    }
  }
}
```

Note the **double nesting** — `operatingMode` wraps `operatingModes` wraps the actual configuration. This is unique to [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode); no other command nests like this. Inside `operatingModes` you can also set `radioStartConditions`, `radioStopConditions`, `query`, `select`, `accessOperations`, and `tagMetaDataToEnable` — covered in adjacent chapters.

### The read-rate ↔ battery ↔ density triangle

You cannot maximise all three. A reader at full duty cycle reads fast and exhausts its battery; a reader spaced out for battery slow-scans; a reader optimised for dense environments throttles to avoid interfering with peers. Each profile picks a point on this triangle.

```d2
RR: "Read rate" { shape: hexagon }
BL: "Battery life" { shape: hexagon }
DF: "Dense-field coexistence" { shape: hexagon }
RR -- BL: "can't max all three" { style.stroke-dash: 4 }
BL -- DF { style.stroke-dash: 4 }
DF -- RR { style.stroke-dash: 4 }
cc: CYCLE_COUNT
ob: OPTIMAL_BATTERY
dr: DENSE_READERS
bp: "BALANCED_PERFORMANCE\n(default)"
cc -> RR
ob -> BL
dr -> DF
bp -> RR
bp -> BL
bp -> DF
```

| Profile | Read rate | Battery life | Behavior in dense fields |
|---|---|---|---|
| `CYCLE_COUNT` | Highest | Shortest | Aggressive; may collide with peer readers |
| `DENSE_READERS` | Modest | Modest | Optimised for coexistence |
| `OPTIMAL_BATTERY` | Lowest | Longest | Conservative; fewer rounds per minute |
| `BALANCED_PERFORMANCE` | Mid | Mid | Reasonable defaults; good first choice |
| `ADVANCED` | Whatever you configure | Whatever you configure | Whatever you configure |

The right profile is empirical: deploy with `BALANCED_PERFORMANCE`, measure read rate against your target, switch if needed.

### `ADVANCED`: manual radio control

`ADVANCED` unlocks the `advancedConfigurations` block:

```json
{
  "operatingMode": {
    "operatingModes": {
      "profiles": "ADVANCED",
      "advancedConfigurations": {
        "transmitPower": 27,
        "linkProfile": "M2_240K",
        "session": "SESSION_1",
        "dynamicPower": true
      }
    }
  }
}
```

The four fields:

- **`transmitPower`**: radio transmit power in dBm (e.g., `27`), bounded above by the region's `maxTxPowerSupported` (returned by [`get_current_region`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-current-region)). Compare against that region limit rather than assuming its reported value shares the same numeric scale.
- **`linkProfile`**: physical-layer encoding. The `Mn_*` notation refers to Miller-modulation factor `n`; lower factors carry more redundancy (better range, slower). The eleven accepted values are listed in the [operating-mode reference](/reference/ctrl/set-operating-mode).
- **`session`**: EPC Gen2 session: `SESSION_0`, `SESSION_1`, `SESSION_2`, `SESSION_3`. See "Sessions" below.
- **`dynamicPower`**: boolean. When true, the radio adjusts power per round.

`advancedConfigurations` is **required when `profiles` is `ADVANCED`**, and rejected with error code `22` (Advanced configuration not set) if missing.

### EPC Gen2 sessions, briefly

A Gen2 session is a flag in tag memory that tracks whether the tag has been read in the current inventory round. The four sessions differ in **how long the flag persists** after a tag leaves the radio's field:

| Session | Flag persistence | Use |
|---|---|---|
| `SESSION_0` | Immediately reset | Single-round inventories; one reader |
| `SESSION_1` | 500 ms – 5 s | Most multi-round inventories |
| `SESSION_2` | > 2 s, can be long | Multi-reader, long-cycle |
| `SESSION_3` | Indefinite until reader resets | Multi-reader with strict deduplication |

The default is typically `SESSION_1`. Tag-population dynamics drive the choice: small populations work with `SESSION_0`; large, mobile populations benefit from `SESSION_1` or higher; multi-reader deployments often need `SESSION_2`.

### Pre-condition: inventory must not be running

[`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) cannot be applied during active RFID inventory. If `radioActivity` is `ACTIVE`, the command returns error code `11` (Inventory in progress). Stop with `control_operation STOP` first.

The other error codes `set_operating_mode` can return — `22` (advanced configuration not set), `23` (invalid enum), `24` (> 32 prefilters), `28` (tag match-pattern length) — are catalogued in the [operating-mode reference](/reference/ctrl/set-operating-mode) and the [error-code reference](/reference/errors/codes).

### Reading current state

[`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode) returns the active configuration in the same shape as the [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) payload:

```json
{
  "command": "get_operating_mode",
  "requestId": "mode-check-001"
}
```

Use this **before** any change to know the current baseline, and **after** any change to confirm it took.

### Where the other surfaces live

[`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) covers many fields. Each is explored in its own chapter:

- **Start/stop triggers and stop thresholds**: [Start, stop, and the trigger button](/rfid/start-stop-inventory).
- **Pre-filtering (Select) and post-filtering (Report)**: [Filter tags before vs after the read](/rfid/post-filters).
- **Access operations (read, write, lock, kill)**: covered as an advanced surface in the [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) reference.
- **Tag metadata enable flags (RSSI, PHASE, CHANNEL, TID, USER, MAC, HOSTNAME, etc.)**, set in `tagMetaDataToEnable`; surfaces in `dataEVT` events as fields. See [Where tag reads come from](/rfid/dataevt-schema).

**Related:** 📙 [Start, stop, and the trigger button](/rfid/start-stop-inventory) · 📘 [Filter tags before vs after the read](/rfid/post-filters) · 📘 [Where tag reads come from](/rfid/dataevt-schema) · 📕 [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/) · 📕 [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/)
