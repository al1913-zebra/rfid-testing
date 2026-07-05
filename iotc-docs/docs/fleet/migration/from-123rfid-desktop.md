---
id: from-123rfid-desktop
title: How to carry 123RFID Desktop settings over to IOTC
sidebar_label: How to migrate 123RFID Desktop settings
description: "Map each 123RFID Desktop setting — antenna power, RF mode, triggers, advanced singulation, network — to its IOTC MQTT equivalent (set_operating_mode, set_wifi, config_endpoint), with handheld out-of-scope items called out."
sidebar_custom_props: { emoji: "🔀" }
---
> 📙 **HOW-TO** · **Audience:** Solution Builder migrating from a 123RFID-Desktop-tuned reader · **Goal:** reproduce a known-good Desktop configuration through the IOTC MQTT API

This guide is for the integrator who already has a reader **tuned in 123RFID Desktop** and now needs the same behaviour driven over MQTT through the IoT Connector. It maps each Desktop settings group to the IOTC command and field that produces the equivalent result.

:::note[Two different meanings of "migration"]
This page is about migrating **settings** — porting your Desktop tuning into IOTC payloads. It is **not** the firmware-version migration covered by [Plan a migration](/fleet/migration/plan) / [Execute](/fleet/migration/execute) / [Verify](/fleet/migration/verify), which rolls a firmware build across a fleet. You will often do both: bootstrap with 123RFID Desktop, then reproduce its tuning over MQTT.
:::

:::caution[Source and firmware scope]
The original Zebra "123RFID Desktop → IoT Connector" mapping guidance targets reader firmware **2.0.1.37 and below**. The field names below reflect the **current IOTC V1.1** schema this site documents (firmware 3.10.27+). Treat the mapping as the *concept* (which Desktop knob becomes which IOTC field), and confirm exact enums against the live [Operating mode (CTRL)](/reference/ctrl/set-operating-mode) reference for your firmware.
:::

## First, understand what changes

123RFID Desktop is a **bootstrap and bench-tuning** tool: it talks to the reader locally (USB/Bluetooth) and writes settings directly. IOTC is a **remote control plane**: the same settings become JSON payloads published to the reader's `CTRL` and `MGMT` endpoints over MQTT. The reader's radio is identical — what changes is *who sends the configuration and how*.

One first-principles consequence drives half this table: **a handheld RFD40/RFD90 sled has a single internal antenna.** Desktop exposes per-port antenna controls because the same UI also drives fixed readers (FX series) with up to 8 ports. On a handheld, the per-port and multi-antenna knobs collapse to "the one antenna," and a few Desktop features have **no handheld equivalent at all** (see [out of scope](#settings-with-no-handheld-equivalent)).

## The mapping

### Antenna port settings

| 123RFID Desktop setting | IOTC equivalent | Notes |
|---|---|---|
| Antenna **enable / disable** | n/a (single internal antenna) | The handheld's one antenna is always the active port; there is nothing to enable or disable. |
| **Power (dBm)** | `set_operating_mode` → `operatingModes.antennas[].transmitPower` | The single most impactful read-tuning lever. See [RF performance tuning](/rfid/performance-tuning) for the read-rate ↔ battery ↔ density trade-off and the regulatory ceiling. |
| **RF Mode** | `set_operating_mode` → `query.linkProfile` | The Gen2 air-protocol profile (modulation, data rate, Tari). Choose via the operating-mode profile rather than a raw mode number where possible — see [Choose how the reader reads tags](/rfid/operating-mode-profiles). |
| **Dwell time** | n/a (single antenna) | Dwell time governs how long a multi-antenna reader stays on each port before hopping. With one antenna there is no hop, so there is no dwell. |

### Trigger settings

| 123RFID Desktop setting | IOTC equivalent | Notes |
|---|---|---|
| What starts/stops a read; physical-trigger behaviour | `set_operating_mode` → `radioStartConditions` / `radioStopConditions` | This is where the handheld's physical trigger button is wired in as a start source. See [Trigger composition](/rfid/operating-mode/trigger-composition) for the start/stop enums and [Start, stop, and the trigger button](/rfid/start-stop-inventory) for the how-to. |

### Advanced settings

| 123RFID Desktop setting | IOTC equivalent | Notes |
|---|---|---|
| **Antenna singulation** (session, target) | `set_operating_mode` → `query.session` / `query.target` | EPC Gen2 session and inventoried-flag target. Profiles set sensible defaults; override only in `ADVANCED`. |
| **State Aware** | `set_operating_mode` → `query` state-aware settings | Controls how the reader tracks the Gen2 inventoried flag across rounds. |
| **Tag Population Estimate** | `set_operating_mode` → `query.tagPopulation` | The Q-algorithm seed: estimated tags in field. Mis-sizing this is the usual cause of poor read rates in dense vs sparse populations. |
| **RSSI Filter** | n/a on handheld — do it application-side | **Not available on the sled.** The schema's `rssiFilter` is annotated *"Currently ONLY supported by the FX9600"* — it is a fixed-reader feature. Do RSSI thresholding **application-side** on the `RSSI` value each `dataEVT` carries (see [How to interpret tag-data fields](/rfid/tag-data/interpret)). |

Configure all of the above through the single [How to configure the operating mode](/rfid/operating-mode/configure) how-to — it is the IOTC analogue of Desktop's whole "Advanced" tab.

### Communication / network settings

| 123RFID Desktop setting | IOTC equivalent | Notes |
|---|---|---|
| Wi-Fi profile | `set_wifi` | See [How to configure Wi-Fi profiles](/infrastructure/network/wifi). |
| Server / endpoint connection | `config_endpoint` | Where the reader publishes. See [How to configure MQTT endpoints](/infrastructure/configure-endpoints). |

### Save / restore configuration

123RFID Desktop's **Save Config** exports a reader's full state to a file. To reproduce that state on another reader through IOTC, reapply each surface with its own command — Wi-Fi with [`set_wifi`](/infrastructure/network/wifi), endpoints with [`config_endpoint`](/infrastructure/configure-endpoints), and the radio tuning with [`set_operating_mode`](/rfid/operating-mode/configure). Apply the same sequence on every reader to bring a fleet to a known-good baseline — see [How to detect and remediate configuration drift](/fleet/management/drift).

## Settings with no handheld equivalent

These Desktop groups exist for **fixed readers** and have no handheld counterpart — do not look for an IOTC payload for them:

- **GPO (General Purpose Output) programming** — RFD40/RFD90 sleds have no GPIO/GPO header. The GPI/GPO event surface is among the categories IOTC does **not** emit on handheld; see [The IOTC event model → what is not currently emitted](/observability/events/model#what-is-not-currently-emitted).
- **User Applications** — on-reader app install/management is a fixed-reader (FX) capability, not a handheld one.

## Verify the migration

1. Apply your mapped `set_operating_mode` payload, then read it back with `get_operating_mode` and diff against intent.
2. Run a short inventory and confirm read rate / RSSI distribution match what you saw in Desktop. If they differ, the usual culprits are `transmitPower`, `linkProfile`, and `tagPopulation`.

**Related:** 📘 [Bootstrapping with 123RFID Desktop](/foundations/bootstrap-tools) · 📙 [How to configure the operating mode](/rfid/operating-mode/configure) · 📘 [RF performance tuning](/rfid/performance-tuning) · 📕 [Operating mode (CTRL)](/reference/ctrl/set-operating-mode) · 📙 [How to detect and remediate configuration drift](/fleet/management/drift)
