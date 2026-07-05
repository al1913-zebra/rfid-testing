---
id: hardware-tiers
title: "Which sled do you have?"
sidebar_label: "Which sled do you have?"
description: "Zebra RFD40 / RFD90 sleds run IOTC in firmware and connect to your MQTT broker over their own Wi-Fi 6 radio. Tell the models apart by SKU and capability."
sidebar_custom_props: { emoji: "🛷" }
---

> 📘 **EXPLANATION** · **Audience:** New Integrator, Solution Builder · **Read time:** ~4 min

Every IOTC sled runs the IoT Connector **in its own firmware** and connects to your MQTT broker over its **own Wi-Fi 6 radio**. There is a single network edge between the reader and the broker — **Reader ↔ Wi-Fi ↔ Broker** — and the sled itself is the MQTT client. Credentials, certificates, and topic subscriptions all live in the sled's firmware.

```d2
direction: down
R: "Reader\n(Wi-Fi 6, IOTC in firmware)"
B: Broker { shape: queue }
A: Application
R -> B: native MQTT
B -> A
```

### One product line, three models

| Model | RFID read range (nominal) | Integrated 1D/2D scanner | Battery |
|---|---|---|---|
| **RFD40 Premium** | ~12 m | — (RFID only) | 7,000 mAh |
| **RFD40 Premium Plus** | ~12 m | SE4100 imager | 7,000 mAh |
| **RFD90 — RFD9030** (standard range) | ~12 m | SE4750MR or SE4850 imager | 7,000 mAh |
| **RFD90 — RFD9090** (long range) | up to ~29 m | SE4750MR or SE4850 imager | 7,000 mAh |

All models share the same IOTC surface: UHF Gen2 RFID (region-set at first boot), native Wi-Fi 6, a single forward-facing internal antenna, a trigger button, a 7,000 mAh PowerPrecision+ battery, and USB-C / cradle charging. The integrated barcode imager is the main capability difference: **RFD40 Premium is RFID-only**, **Premium Plus** adds the SE4100 1D/2D imager, and the RFD90 carries the SE4750MR (standard-range) or SE4850 (extended-range) imager. The IOTC (MQTT) surface is identical across every model.

### How to identify your model in seconds

- Powered off, read the model / part number on the label:
  - begins `RFD40…` (e.g., `RFD4030`, `RFD4031`, `RFD4090`) → an RFD40 sled (Premium or Premium Plus)
  - begins `RFD9030` (standard range) or `RFD9090` (long range) → an RFD90 sled
- From an existing deployment, the [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version) response names the model family (`RFD40` / `RFD90`), the full SKU, the firmware version, and the in-firmware IOTC version.

### Minimum firmware

All chapters assume firmware **3.10.27 or later**. Earlier firmware lacks [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events), the [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) HTTP source, and several event flags. Older deployments will need a [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) update before the docs apply cleanly. See [Updating firmware and rebooting](/infrastructure/system-operations).

### What this implies for scope

Because every sled has one internal antenna, this documentation does **not** cover external-antenna selection, cable-loss compensation, or directionality settings; those exist only on fixed readers. Because every sled is battery-powered, the docs give sustained attention to battery lifecycle, the OPTIMAL_BATTERY profile, and heartbeat-emission cost. These are not caveats; they shape every chapter.

**Related:** 📘 [Roles: Reader, Broker, Application](/foundations/actors) · 📘 [Bootstrapping with 123RFID Desktop](/foundations/bootstrap-tools) · 📘 [How commands and responses flow](/foundations/communication-flow) · 📕 [Capacity and limits](/reference/glossary) · 📕 [Regulatory & regional information](/reference/appendices/regulatory)
