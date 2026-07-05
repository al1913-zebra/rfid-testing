---
id: rfid-air-interface
title: "RFID air interface: how Gen2 tags are read"
sidebar_label: How the radio reads tags
description: "How the EPC Gen2 (ISO 18000-63) air interface works: singulation and the Q parameter, sessions, the SELECT filter, and the EPC/TID/USER/RESERVED memory banks."
sidebar_custom_props: { emoji: "📶" }
---

> 📘 **EXPLANATION** · **Audience:** All · **Read time:** ~8 min

[MQTT in five minutes](/foundations/mqtt-primer) explains how IOTC *transports* data; this page explains what that data *is* at the radio layer. Everything a reader streams as `dataEVT` originates here. If terms like singulation, session, or memory bank are new, read [RFID in five minutes](/foundations/rfid-primer) first.

Zebra handheld sleds implement **EPC Gen2** (EPCglobal UHF Gen2v2), standardised as **ISO/IEC 18000-63**. Three ideas carry most of the weight: singulation, sessions, and memory banks.

### Inventory rounds and the Q parameter

When many tags are energised at once they cannot all reply — their backscatter would collide. Gen2 resolves this with a slotted **anti-collision** scheme. The reader opens an *inventory round* with a `Query` that carries a value **`Q`**; each tag picks a random slot in the range 0 to 2^Q − 1. The reader then steps through the slots:

```d2
direction: down
q: "Query: reader sets Q (2^Q slots)"
slot: "each tag picks a random slot"
read: "slot with one tag -> ACK -> read EPC"
again: "empty or collided slots -> next round"
q -> slot
slot -> read
slot -> again
again -> q: "adjust Q, repeat" { style.stroke-dash: 4 }
```

A slot holding exactly one tag is read cleanly; empty and collided slots are skipped, and the reader raises or lowers `Q` to match the tag population (dynamic Q). The key takeaway for application authors: a **single sweep does not catch every tag**. The reader runs many rounds per second, which is precisely why reads are probabilistic and why `dataEVT` carries a `seenCount`.

### Sessions and the inventoried flag

Each tag keeps an **inventoried flag** (state `A` or `B`) for each of four **sessions**, `S0`–`S3`. After the reader reads a tag, it flips that tag's flag so the tag is not re-counted within the same round. The sessions differ only in **how long the flag persists** once the tag leaves the field:

| Session | Flag persistence | Typical use |
|---|---|---|
| `S0` | None (resets immediately) | Single reader, short continuous sweeps |
| `S1` | ~0.5–5 s | Most multi-round inventories |
| `S2` | Seconds and longer | Multi-reader environments |
| `S3` | Longest, until the reader resets it | Multi-reader with strict de-duplication |

Sessions are what let several readers cover the same area without each one constantly re-reading the others' tags. Choosing one for a deployment is covered in [Choose how the reader reads tags](/rfid/operating-mode-profiles).

### SELECT: filtering before the round

Before an inventory round, the reader can issue a Gen2 **`SELECT`** that asserts or de-asserts a flag on every tag whose memory matches a bit mask — so only the matching subset takes part in the round. This is **pre-filtering**, and it is distinct from the post-singulation report filters applied after a tag is read. The trade-off between the two is the subject of [Filter tags before vs after the read](/rfid/post-filters).

### The four memory banks

Every Gen2 tag exposes four memory banks:

- **RESERVED** (bank 0) — the kill and access passwords.
- **EPC** (bank 1) — the identifier (protocol-control bits, the EPC, and a CRC). Writable.
- **TID** (bank 2) — the factory-programmed tag and chip identity. Read-only.
- **USER** (bank 3) — optional application-writable data.

For the precise read / write / lock matrix and the access operations (`READ`, `WRITE`, `ACCESS`, `LOCK`, `KILL`) with their password and length constraints, see [Supported RFID tag types and standards](/reference/appendices/tag-standards).

### What reaches your application

The reader turns each clean singulation into a `dataEVT` carrying the EPC plus optional metadata — RSSI, phase, channel, seen count, and (when enabled) TID or USER data. The mapping from air interface to event is in [Where tag reads come from](/rfid/dataevt-schema), and field-level interpretation in [How to interpret tag-data fields](/rfid/tag-data/interpret).

### Frequencies and region

UHF Gen2 operates in the 860–960 MHz band, bounded by region — for example FCC 902–928 MHz, ETSI 865–868 MHz — and the region also caps transmit power. A reader's region is set at bootstrap with 123RFID Desktop, **not** over MQTT; the bands and limits are in [Appendix: regulatory and regional information](/reference/appendices/regulatory).

### Where this goes from here

- Pick a behaviour profile (read rate vs battery vs density): [Choose how the reader reads tags](/rfid/operating-mode-profiles).
- The exact bank and access reference: [Supported RFID tag types and standards](/reference/appendices/tag-standards).
- The standard itself is EPC Gen2 / ISO/IEC 18000-63, published by GS1 at [gs1.org/standards/rfid](https://www.gs1.org/standards/rfid).

**Related:** 📘 [RFID in five minutes](/foundations/rfid-primer) · 📘 [Choose how the reader reads tags](/rfid/operating-mode-profiles) · 📕 [Supported RFID tag types and standards](/reference/appendices/tag-standards) · 📘 [Where tag reads come from](/rfid/dataevt-schema)
