---
id: tag-standards
title: Supported RFID tag types and standards
sidebar_label: Supported RFID tag types & standards
description: "RFID tag types and air-interface standards supported by IOTC: EPC Gen2 (UHF), tag memory banks (EPC, TID, USER, RESERVED), session and inventory flags."
sidebar_custom_props: { emoji: "🏷️" }
---

> 📕 **REFERENCE** · **Audience:** Solution Builder

EPC Gen2 / ISO 18000-63 UHF. For the conceptual explanation — singulation, sessions, the Q parameter, and SELECT — see [The RFID air interface](/foundations/rfid-air-interface).

### Memory banks

| Bank | Index | Purpose | Read | Write |
|---|---:|---|---|---|
| RESERVED | 0 | Access and kill passwords | Yes (password-protected) | Yes (password-protected) |
| EPC | 1 | Tag identifier | Yes | **Yes** |
| TID | 2 | Manufacturer-assigned identifier | Yes | Locked (read-only) |
| USER | 3 | Application-writable data | Yes | **Yes** |

### Tag access operations supported

Via `set_operating_mode.accessOperations`:

| Operation | Action |
|---|---|
| `READ` | Read words from a memory bank |
| `WRITE` | Write hex data to a memory bank |
| `ACCESS` | Authenticate to the tag using access password |
| `LOCK` | Lock or permanently lock a memory bank or password |
| `KILL` | Permanently and irreversibly disable the tag |

Constraints:

- `password` is 8 hex characters (32 bits) for ACCESS, LOCK, KILL.
- `data` for WRITE is even-length hex, multiple of 16-bit words.
- `LOCK` with `lockAction: PERMANENT_LOCK` is irreversible.
- `KILL` is irreversible, the tag never responds again.

Tag write operations (`WRITE` to the EPC and USER banks) **are** part of the V1.1 API surface — configure them through `set_operating_mode.accessOperations`.

**Related:** 📘 [The RFID air interface](/foundations/rfid-air-interface) · 📘 [Where tag reads come from](/rfid/dataevt-schema) · 📕 [Operating mode (CTRL)](/reference/ctrl/set-operating-mode) · 📙 [How to configure the operating mode](/rfid/operating-mode/configure) · 📕 [Regulatory and regional information](/reference/appendices/regulatory)
