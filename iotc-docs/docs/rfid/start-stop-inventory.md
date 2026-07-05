---
id: start-stop-inventory
title: Start and stop a tag inventory
sidebar_label: Start, stop, and the trigger button
description: "Start and stop an IOTC tag inventory: control_operation START / STOP, the physical trigger, trigger-mode composition, what each interaction sends on the wire."
sidebar_custom_props: { emoji: "⏯️" }
---

> 📙 **HOW-TO** · **Audience:** All · **Time:** ~5 min · **Ties to:** Inventory Control sub-tag of the API Reference

:::tip[See in the API Reference]
Sub-tag: Inventory Control. Operation: [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation).
:::

Inventory begins and ends with [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation). This guide gives you the recipes: the minimal START/STOP payloads, how to choose what makes `START` fire (command, trigger, or threshold), how to let the radio stop itself, and the one rule that trips people up — stop before you reconfigure.

### Start and stop the radio

[`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) takes a `ctrlOprPayload` with two uppercase-enum fields: `controlType` (`RFID` for the radio, `SCANNER` for the barcode scanner on scan-capable sleds) and `operation` (`START` or `STOP`).

**Start inventory:**

```json
{
  "command": "control_operation",
  "requestId": "start-001",
  "ctrlOprPayload": {
    "controlType": "RFID",
    "operation": "START"
  }
}
```

**Stop inventory:**

```json
{
  "command": "control_operation",
  "requestId": "stop-001",
  "ctrlOprPayload": {
    "controlType": "RFID",
    "operation": "STOP"
  }
}
```

`control_operation` **does not configure inventory behavior** — it only flips the active radio between IDLE and ACTIVE. Set the operating-mode parameters (profile, sessions, filters, metadata) with [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) **before** you send `START`.

A `STOP` sent to an already-idle radio returns code `12` and is harmless (idempotent); a `START` sent to an already-running radio returns code `11` — send `STOP` first if you wanted a fresh run. Field reference: [Inventory control (CTRL)](/reference/ctrl/control-operation); full code table: [Command response error codes](/reference/errors/codes).

### Choose what makes START fire

`set_operating_mode`'s `radioStartConditions.trigger` selects what actually fires the radio when you send `START`. Pick the recipe that matches your workflow and set it inside `set_operating_mode.operatingModes` **before** sending `START`:

- **Operator press-and-hold** — start on `PRESSED`, stop on `RELEASED`. The trigger behaves like a "while pressed" button.
- **Autonomous / application-driven** — start `IMMEDIATE`, stop `IMMEDIATE`. The application starts and stops the radio.
- **Press to halt an autonomous scan** — start `IMMEDIATE`, stop `PRESSED`.

For what each enum value means and how the start and stop triggers compose, see [Composing radio triggers](/rfid/operating-mode/trigger-composition); for the full `radioStartConditions` field list, see [Operating mode (CTRL)](/reference/ctrl/set-operating-mode).

### Let the radio stop itself

`radioStopConditions` can stop inventory without an explicit `STOP`. A common recipe is **countdown inventory**: start on the trigger, then stop on the first threshold to fire.

Set `radioStartConditions.trigger: PRESSED`, `radioStopConditions.trigger: RELEASED`, with `radioStopConditions.tagCount: 50` and `stopTimeout: 30000`. The operator presses the trigger → inventory runs → it stops on the first of: release, 50 unique tags, or 30 seconds.

The stop thresholds (`tagCount`, `stopTimeout`, `inventoryCount`) and the start modifiers (`startDelay`, `repeat`) are documented in [Operating mode (CTRL)](/reference/ctrl/set-operating-mode).

### Stop before reboot or set_operating_mode

Two operations require the radio to be IDLE and reject the request while inventory is active:

- [`reboot`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-reboot) — returns code `5` if inventory is active.
- [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) — returns code `11` if inventory is active.

Always send `control_operation STOP` first, confirm `radioActivity` is `INACTIVE` with [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status), then proceed.

### Watch for tag data

Once `START` succeeds, the reader publishes `dataEVT` events on the active DATA endpoint's publish topic. The volume depends on the operating mode, the tag population, and the `reportFilter duration` (when `0`, every read is reported separately; when `> 0`, reads are aggregated). See [Where tag reads come from](/rfid/dataevt-schema).

### Out of scope

- **The barcode scanner (`controlType: SCANNER`)** — present on scan-capable sleds — is **out of scope for this page**, but it _is_ part of this MQTT API: `control_operation` accepts `controlType: SCANNER` with `START` / `STOP`, and decoded barcodes arrive in `dataEVT.data.barcodeData[]`. Starting/stopping the scanner and the barcode-read surface are documented in [Scan barcodes](/rfid/barcode) and [Where tag reads come from](/rfid/dataevt-schema). Only deeper scanner _configuration_ belongs to the external 123RFID / scanner SDK.
- **Filtering which tags actually emit `dataEVT`** — see [Filter tags before vs after the read](/rfid/post-filters).
- **Access operations on tags (read/write/lock/kill memory)** — set in `set_operating_mode.operatingModes.accessOperations`. Covered in advanced operating-mode material.

**Related:** 📕 [Inventory control (CTRL)](/reference/ctrl/control-operation) · 📕 [Operating mode (CTRL)](/reference/ctrl/set-operating-mode) · 📕 [Command response error codes](/reference/errors/codes) · 📘 [Composing radio triggers](/rfid/operating-mode/trigger-composition) · 📘 [Choose how the reader reads tags](/rfid/operating-mode-profiles) · 📘 [Where tag reads come from](/rfid/dataevt-schema)
