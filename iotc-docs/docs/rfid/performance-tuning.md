---
id: performance-tuning
title: "RF performance tuning: read rate, range, and density"
sidebar_label: RF performance tuning
description: "Tune IOTC read performance via the ADVANCED profile: transmit power, link profile, Gen2 session, and dynamic power within regional limits, plus dense-reader strategy."
sidebar_custom_props: { emoji: "🎚️" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder · **Read time:** ~8 min

:::note[Pending SME confirmation]
The tuning *levers* below come from the `set_operating_mode` schema and are accurate. The specific **recommended values** for a given environment — Zebra's proprietary RF playbook — await RF-engineering SME input. Treat this page as the *method and the knobs*, not a settings table.
:::

Choosing a profile ([Choose how the reader reads tags](/rfid/operating-mode-profiles)) gets you most of the way. The `ADVANCED` profile exposes the radio levers for the rest. This page explains those levers and the trade-offs they navigate.

### The trade-off you are tuning

Read rate, battery life, and dense-field coexistence pull against each other — you cannot maximise all three (see the triangle in [operating-mode profiles](/rfid/operating-mode-profiles)). Tuning is choosing your point on that triangle for your environment and tag population.

### The four `ADVANCED` levers

Set inside `set_operating_mode.operatingMode.operatingModes.advancedConfigurations` when `profiles` is `ADVANCED`:

| Lever | What it controls | Trade-off |
|---|---|---|
| `transmitPower` | Radio output power in dBm | Higher power → longer range and more tags in the field (more reads, but more battery drain and more interference). Capped by region (below). |
| `linkProfile` | Physical-layer encoding (Miller modulation; 11 values such as `FM0_0K` … `M8_320K`) | Lower Miller factor reads faster but is shorter-range and less robust; higher factor is slower but more robust at range. |
| `session` | EPC Gen2 session `SESSION_0`–`SESSION_3` | Governs re-read/de-dup behaviour; higher sessions suit multi-reader and large mobile populations. See [The RFID air interface](/foundations/rfid-air-interface). |
| `dynamicPower` | Per-round power adaptation (boolean) | Lets the radio trim power to the population each round — helps battery and reduces near-field over-read. |

### The regulatory ceiling

`transmitPower` must not exceed the region's `maxTxPowerSupported`, returned by [`get_current_region`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-current-region). The region is set at bootstrap with 123RFID Desktop, **not** over MQTT. Compare against that reported limit rather than assuming a fixed scale. Bands and limits per region: [Appendix: regulatory and regional information](/reference/appendices/regulatory).

### Dense-reader coexistence

In multi-reader environments, raw read rate is rarely the goal — avoiding reader-to-reader interference is. The `DENSE_READERS` profile (or `ADVANCED` with conservative power and a higher session) trades read rate for coexistence. The Gen2 mechanism — sessions and the inventory round — is described in [The RFID air interface](/foundations/rfid-air-interface).

### Beyond the four levers

Two capabilities frequently asked about in tuning are **not** part of the handheld `set_operating_mode` surface:

- **RSSI pre-filtering** — dropping a tag response below an RSSI threshold *at the radio*. The schema's `rssiFilter` is annotated **"Currently ONLY supported by the FX9600"** — it is a fixed-reader feature, **not available on RFD40/RFD90**. Do RSSI thresholding **application-side** instead, on the `RSSI` value each `dataEVT` carries (enable `RSSI` in `tagMetaDataToEnable`; see [How to interpret tag-data fields](/rfid/tag-data/interpret)).
- **Gen2X extensions** — a set of Gen2-compatible, Impinj-chip features (Impinj TagFocus™ for session-1 flag persistence, Tag Quieting, Protected Mode, FastID for reading EPC + TID together, short-range read, Integra, tag authentication). These act at the tag / session-flag level, not the RF-power level. Zebra's source material presents Gen2X as a general Gen2/Impinj capability set and does **not** document a configurable RFD40/RFD90 `set_operating_mode` surface for it — confirm availability for your sled and firmware before designing around it.

### Method: measure, adjust, re-measure

1. Start with `BALANCED_PERFORMANCE`.
2. Measure read rate, unique-tag count, and battery against your target.
3. Move **one lever at a time** — typically `transmitPower`, then `session`, then `linkProfile` — and re-measure.
4. Lock in the resulting profile or `ADVANCED` config via `set_operating_mode` (inventory must be stopped first, or it returns code `11`).

For the configure mechanics and the full `advancedConfigurations` shape, see [How to configure the operating mode](/rfid/operating-mode/configure).

**Related:** 📘 [Choose how the reader reads tags](/rfid/operating-mode-profiles) · 📘 [The RFID air interface](/foundations/rfid-air-interface) · 📕 [Appendix: regulatory and regional information](/reference/appendices/regulatory) · 📙 [How to configure the operating mode](/rfid/operating-mode/configure)
