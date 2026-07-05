---
id: barcode
title: Scan barcodes
sidebar_label: Scan barcodes
description: "How to scan barcodes over IOTC on imager-equipped sleds: start the scanner with control_operation (controlType SCANNER) and read barcodeData from dataEVT."
sidebar_custom_props: { emoji: "📷" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder, API Consumer · **Time:** ~10 min

:::note[Pending SME confirmation]
This page is authored from the MQTT API schema (`control_operation`, `dataEVT.barcodeData`). Two details await firmware/product SME confirmation: the **exact model coverage** (whether the base RFD40 Premium scans, versus Premium Plus / RFD90) and the **full supported symbology list** — the schema currently enumerates only `CODE_39`. The command mechanics below are schema-accurate and will not change.
:::

Imager-equipped sleds can scan barcodes as well as read RFID tags, over the same MQTT connection. The barcode scanner is a **separate subsystem** from the RFID radio: you start it explicitly, and decoded barcodes arrive in the same `dataEVT` stream as tag reads.

### Which sleds

The API schema does not map barcode production to specific models. Its `readerVersion.model` enum is just `RFD40` and `RFD90` (no sub-variants), and scanner presence is reported at runtime by the boolean capability flag `deviceCapabilities.isScannerSupported` (from `get_capability`) — not as a fixed per-model attribute. Treat a sled as scan-capable when `isScannerSupported` is `true`; the exact model coverage is pending SME confirmation.

### 1. Start the scanner

Send `control_operation` with `controlType: SCANNER`. The payload key is `ctrlOprPayload`:

```json
{
  "command": "control_operation",
  "requestId": "scan-001",
  "ctrlOprPayload": {
    "controlType": "SCANNER",
    "operation": "START"
  }
}
```

This starts the barcode subsystem only; the RFID radio is controlled separately (`controlType: RFID`). `control_operation` carries no tuning parameters.

### 2. Read decoded barcodes from `dataEVT`

Decoded barcodes arrive in `dataEVT.data.barcodeData[]`:

```json
{
  "type": "BALANCED_PERFORMANCE",
  "timestamp": "2026-05-19T14:23:11Z",
  "data": {
    "barcodeData": [
      { "symbology": "CODE_39", "decodedBarcode": "ABC-12345" }
    ]
  }
}
```

| Field | Type | Description |
|---|---|---|
| `symbology` | enum | Barcode symbology. The schema currently enumerates `CODE_39`. |
| `decodedBarcode` | string | The decoded string value (required). |

A single `dataEVT` can carry both `tagData` and `barcodeData` if both subsystems are active in the same event window. For the full event shape, see [Where tag reads come from](/rfid/dataevt-schema).

### 3. Stop the scanner

```json
{
  "command": "control_operation",
  "requestId": "scan-002",
  "ctrlOprPayload": { "controlType": "SCANNER", "operation": "STOP" }
}
```

Stop the scanner when you no longer need it. The schema does not define scanner-specific status codes for `START`/`STOP`; error codes `11` ("Inventory in progress") and `12` ("No Radio Operation in Progress") are scoped to the RFID radio and are not documented for the `SCANNER` control type.

### Errors

| Code | Meaning                                                              |
|------|----------------------------------------------------------------------|
| `23` | Invalid enum value (a `controlType` or `operation` outside the accepted set) |

The schema does not define scanner-specific status codes for the `SCANNER` control type. Error codes `11` ("Inventory in progress") and `12` ("No Radio Operation in Progress") belong to the RFID radio/inventory subsystem — not the barcode scanner — so do not expect them from scanner `START`/`STOP`.

**Related:** 📕 [Inventory control (CTRL)](/reference/ctrl/control-operation) · 📕 [Where tag reads come from](/rfid/dataevt-schema) · 📙 [Start, stop, and the trigger button](/rfid/start-stop-inventory)
