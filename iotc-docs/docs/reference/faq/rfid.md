---
id: rfid
title: RFID operations FAQs
sidebar_label: RFID operations FAQs
description: "FAQ about IOTC RFID operations: operating-mode profiles, tag-read rate, EPC/ISO standards, reading the TID bank, filtering tags, and reboot persistence."
sidebar_custom_props: { emoji: "📡" }
---

> 📕 **REFERENCE** · **Audience:** API consumer · **Use:** RFID operations lookup

### How many tags per second can the reader read?

Up to 1,300+ tags/second on RFD90 and RFD40 Premium-series sleds; the effective rate depends on the operating-mode profile. (The peak figure is the per-sled hardware spec; it is not carried in the MQTT API schema.)

**Details:** [Which sled do you have?](/foundations/hardware-tiers) — the per-sled hardware spec, which is the source of the peak read-rate figure · [Choosing how the reader reads tags](/rfid/operating-mode-profiles) — the profile that sets the effective rate

### What operating-mode profiles are available?

`CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE` (the default), and `ADVANCED` (manual transmit power, link profile, and session).

**Details:** [Operating mode (CTRL)](/reference/ctrl/set-operating-mode)

### What RFID tag standards are supported?

EPC Gen2 / ISO 18000-63 UHF tags.

**Details:** [Supported RFID tag types and standards](/reference/appendices/tag-standards)

### Can I read the TID memory bank?

Yes. Enable `TID` in `tagMetaDataToEnable` (via [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode)) so each `dataEVT` carries the TID, or add a `READ` access operation against the TID bank.

**Details:** [Operating mode (CTRL)](/reference/ctrl/set-operating-mode)

### How do I filter tags?

Two layers: `select` prefilters screen tags *before* the read (by memory-bank content); post-filters screen the tag ID *after* the read.

**Details:** [Filtering tags: select vs post-filter](/rfid/post-filters)

### Does the operating mode survive a reboot?

No. Management configuration (endpoints, Wi-Fi, certificates) persists, but radio operating mode does not — re-apply `set_operating_mode` after every boot if you need a specific mode.

**Details:** [Operating mode (CTRL)](/reference/ctrl/set-operating-mode)
