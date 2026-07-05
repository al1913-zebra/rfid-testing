---
id: mobile-app
title: "123RFID Mobile: the Android companion app"
sidebar_label: 123RFID Mobile (Android)
description: "What the 123RFID Mobile Android app is, how it connects to an RFD40/RFD90 sled, and the Admin-gated MQTT/Wi-Fi/certificate provisioning that makes it a sled-side IOTC bootstrap path alongside 123RFID Desktop."
sidebar_custom_props: { emoji: "📱" }
---
> 📘 **EXPLANATION** · **Audience:** Solution Builder, Fleet Operator deciding how to bootstrap · **Read time:** ~4 min

[123RFID Desktop](/foundations/bootstrap-tools) is the bootstrap tool this documentation leans on. It is not the only one. **123RFID Mobile** is the Android companion app, and on RFD40/RFD90 it can do two distinct jobs: it is a hands-on **operator/bench tool** for reading and locating tags, and — behind an Admin login — a **sled-side bootstrap path** that can put Wi-Fi, certificates, and an MQTT endpoint onto the reader without a laptop.

This page explains what it is and, precisely, where it does and does not overlap the IoT Connector.

### What it is

A Zebra-published Android app (Google Play: `com.zebra.rfidreaderAPI.demo`; Android 7+). It runs on a Zebra enterprise mobile computer paired with an RFD40 (Premium / Premium+) or RFD90 sled — the same handheld hardware this site documents. Zebra describes it as demonstrating "the device's capability and tag operation functionality": it is an operator and bench tool, **not** an enterprise data pipeline.

### How the sled connects

One reader at a time, by either transport:

- **USB / Common IO** — direct over the sled's 8-pin Common IO port; no pairing. The app opens straight to the Rapid Read screen.
- **Bluetooth** — `Tap and Pair` (NFC; Premium/Premium+), `Scan and Pair` (Premium+), `Pair using Barcode` (Premium+), or manual Bluetooth pairing (~10 m). After first pairing the sled auto-reconnects.

### Operator features (local, not IOTC)

These act on the sled directly and write data **locally** — they do **not** publish over MQTT:

- **Rapid Read / Inventory** — live unique-tag count, read rate, elapsed time.
- **Memory-bank reads** — `EPC` (default), `TID`, `USER`, `RESERVED`, with a configurable word count.
- **Locate Tag / Multi-Tag** — proximity bar graph; multi-tag locate from an imported CSV.
- **Tag Write / Lock / Kill** — write `EPC`/`TID`/`USER`/`PC+CRC`/passwords; `Lock` and `Kill` (the same Gen2 operations documented under [`set_operating_mode` access operations](/reference/ctrl/set-operating-mode)).
- **Brand ID** and **Tag List Match Mode** — NXP BrandID checks; match reads against an imported `taglist.csv`.
- **Data export** — on stop, inventory is written to a **local CSV** (`/sdcard/inventory/RFID_<timestamp>.csv`). This is a file on the device, **not** an MQTT stream — do not confuse the two.

### The IOTC-relevant part (Admin-gated)

Behind an Admin login (documented for RFD40/RFD90 **EU** devices; default password `zebraRfid@1111`, which must be changed on first use), 123RFID Mobile exposes the same reader-side provisioning surfaces that make a sled an IOTC participant:

| Mobile screen | What it sets on the reader | IOTC equivalent |
|---|---|---|
| **Endpoint Configuration** | A named endpoint — type `SOTI` or `MDM`, protocol `MQTT` or `MQTT_TLS`, with URL/server, port, keep-alive, tenant ID, min/max reconnect delay, username/password, active flag | [`config_endpoint`](/infrastructure/configure-endpoints) / [MDM & SOTI interfaces](/reference/mdm/about) |
| **Certificates Management** | Upload `Ca_cert` / `Client_cert` / `Client_key` for the Wi-Fi, **MQTT**, Filestore, or Others interface | [Certificate management](/infrastructure/certificate-management) |
| **WLAN Settings** | SSID profiles, WPA2/WPA3 Personal & Enterprise | [Wi-Fi profiles](/infrastructure/network/wifi) |

So on an RFD40/RFD90 it is a legitimate **alternative bootstrap path**: it can place network credentials, TLS certificates, and an MQTT/MQTT_TLS endpoint directly onto the sled over USB or Bluetooth, without 123RFID Desktop.

### Where it fits relative to 123RFID Desktop

The two are complementary, not redundant:

- **123RFID Mobile** — on-the-floor reads, locate, writes, and (EU, Admin) sled-side MQTT/Wi-Fi/cert provisioning.
- **[123RFID Desktop](/foundations/bootstrap-tools)** — still required for generating **encrypted (EDAT) firmware packages** and for **installing the WPA certificate** on the reader; it remains the bootstrap tool this site's Quick Start uses.

:::caution[Scope limits — read before you design around it]

- The MQTT endpoint, certificate, and WLAN screens are **Admin-only** and documented for **RFD40/RFD90 EU** devices — not a general data path.
- Endpoint types are limited to **`SOTI` / `MDM`** and protocols to **`MQTT` / `MQTT_TLS`** — narrower than the full endpoint surface in [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints).
- The app's own **data export is local CSV only**; it does not publish tag reads over MQTT. The MQTT capability here is *reader endpoint provisioning*, which is separate from the app's read/export features.
- For a fleet, prefer [zero-touch provisioning with SOTI Connect](/fleet/provisioning/soti-connect) or [bulk 123RFID Desktop](/fleet/provisioning/bulk-123rfid) over per-device mobile provisioning.

:::

**Related:** 📘 [Bootstrapping with 123RFID Desktop](/foundations/bootstrap-tools) · 📙 [How to configure MQTT endpoints](/infrastructure/configure-endpoints) · 📙 [How to configure Wi-Fi profiles](/infrastructure/network/wifi) · 📙 [How to manage TLS/SSL certificates](/infrastructure/certificate-management) · 📕 [MDM and SOTI interfaces](/reference/mdm/about) · 📙 [Zero-touch provisioning with SOTI Connect](/fleet/provisioning/soti-connect)
