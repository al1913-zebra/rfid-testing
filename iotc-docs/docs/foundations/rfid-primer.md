---
id: rfid-primer
title: RFID in five minutes
sidebar_label: RFID in five minutes
description: "Five-minute UHF RFID primer for engineers new to it: passive tags, the EPC, singulation, and why a read is probabilistic on Zebra handheld sleds."
sidebar_custom_props: { emoji: "🔖" }
---

> 📘 **EXPLANATION** · **Audience:** New Integrator (no prior RFID) · **Read time:** ~5 min

These docs teach MQTT from the ground up in [MQTT in five minutes](/foundations/mqtt-primer), but they assume you know what an RFID *read* actually is. This page closes that gap. If you have built UHF RFID systems before, skip ahead to [the air interface](/foundations/rfid-air-interface).

RFID is **radio-frequency identification**: a reader detects tags over the air, with no line of sight and no contact. Zebra handheld sleds (RFD40 / RFD90) use **UHF passive RFID** on the **EPC Gen2** standard. Four ideas are enough to read the rest of these docs.

### 1. Passive tags have no battery

A UHF tag is just an antenna and a tiny chip — no power source. The reader transmits RF energy; the tag *harvests* that energy to power its chip, then answers by **backscattering** — reflecting a modulated version of the reader's own signal.

```d2
direction: right
reader: "Handheld reader" { shape: rectangle }
tag: "Passive tag (no battery)" { shape: rectangle }
reader -> tag: "RF energy powers the tag"
tag -> reader: "backscattered EPC reply" { style.stroke-dash: 4 }
```

Two consequences follow from this asymmetry: range is short (a few metres on a handheld's single antenna), and the tag's reply is a faint echo that the reader has to work to hear.

### 2. A read is probabilistic, not a lookup

Coming from software, you might expect "scan = return all tags." RFID is not deterministic like that. Whether a given tag answers in a given instant depends on its orientation, distance, antenna null spots, and interference from other tags and readers. Readers compensate by reading **continuously** and reporting every sighting — which is why IOTC streams one `dataEVT` per read and why the same tag is usually seen many times. See [How to interpret tag-data fields](/rfid/tag-data/interpret).

### 3. Singulation reads one tag out of many

Energise a box of tags and they would all reply at once and collide. **Singulation** is the anti-collision process that isolates one tag at a time so the reader can read it cleanly. The reader runs repeated *inventory rounds*; the mechanics — the `Q` parameter, sessions, and the `SELECT` filter — live in [The RFID air interface](/foundations/rfid-air-interface). For now: the reader sweeps the field over and over, emitting a read each time it cleanly hears a single tag.

### 4. The EPC is the tag's identifier

Each tag carries an **EPC** (Electronic Product Code) — a hex string held in the tag's EPC memory bank, often a GS1 encoding (such as SGTIN) of a product plus a serial number. Most applications treat the EPC as an opaque key and look it up in a database; decoding its GS1 structure matters only when you reason about company prefix or item reference. Tags also expose other memory banks (TID, USER) — covered in [the air interface](/foundations/rfid-air-interface).

### What the reader tells you about each read

Beyond the EPC, a read can include **RSSI** (signal strength in dBm — a rough proximity hint) and **phase**. An application can use these to reason about *which* tag is closest, but EPC Gen2 has no built-in "find this one tag" command — any locate behaviour is built application-side on top of RSSI. See [How to interpret tag-data fields](/rfid/tag-data/interpret).

### The handheld shape

A handheld sled has **one antenna** and is **trigger-driven**: it reads while you hold the trigger and stops when you release it. That, together with battery limits, is why IOTC exposes operating-mode *profiles* that trade read rate against battery life and interference — see [Choose how the reader reads tags](/rfid/operating-mode-profiles).

### Where this goes from here

- The mechanics — singulation, sessions, `Q`, `SELECT`, and the memory banks: [The RFID air interface](/foundations/rfid-air-interface).
- The vocabulary, any time you hit an unfamiliar term: [Glossary](/reference/glossary).
- The standard itself is EPC Gen2 / ISO/IEC 18000-63, published by GS1 at [gs1.org/standards/rfid](https://www.gs1.org/standards/rfid).

**Related:** 📘 [MQTT in five minutes](/foundations/mqtt-primer) · 📘 [The RFID air interface](/foundations/rfid-air-interface) · 📘 [Which sled do you have?](/foundations/hardware-tiers)
