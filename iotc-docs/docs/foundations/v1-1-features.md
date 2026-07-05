---
id: v1-1-features
title: IOTC V1.1 release features
sidebar_label: IOTC V1.1 release features
description: What changed in IOTC V1.1, the current API baseline for handheld RFID readers on firmware 3.10.27+. V1.0 compatibility, per-endpoint version support.
sidebar_custom_props: { emoji: "🆕" }
---

> 📘 **EXPLANATION** · **Audience:** All · **Read time:** ~3 min

IOTC V1.1 is the current API baseline for handheld RFID readers running firmware 3.10.27 or later. The V1.1 surface is what this documentation describes; V1.0 remains accepted by V1.1 firmware for backward compatibility.

:::note[How this page is sourced]
The "supports both V1.0 and V1.1" claim is not editorial — each operation's command schema declares it directly (`Supported API Versions: V1.0, V1.1` in the IOTC schema's `operation_descriptions`). The firmware baseline (3.10.27) is a product fact that the schema does not carry; treat the exact minimum-firmware string as **indicative** and confirm it against the [firmware version history](/reference/appendices/firmware-history) and Zebra's release notes for your model.
:::

### Per-endpoint version support

Every operation in this API declares its supported versions. Across the documented operation set, every operation supports both `V1.0` and `V1.1`; there is no V1.0-only or V1.1-only operation. Field-level changes between versions, where they exist, are catalogued on the affected operation's Reference page in [API Reference](/reference/api-overview).

The clearest concrete example of a V1.1 *additive* change is the event-configuration surface: V1.1 expands `config_events` to 16 management-event flags plus per-event thresholds and a `userApps` block. A V1.0 client that sends the smaller flag set still works — the additional flags simply default off until set. See [Choose what the reader tells you](/observability/configure-events) for the full flag list.

### Effect on V1.0 clients

A client written for V1.0 continues to function against V1.1 firmware. Field additions in V1.1 are additive — V1.0 clients ignore unknown fields. For projects that want to consume V1.1-only fields (richer event payloads, new metadata flags), update the client to expect the new fields.

There is no firmware revert on handheld readers. Once on V1.1 firmware, the reader stays on V1.1.

**Related:** 📕 [API Reference](/reference/api-overview) · 📙 [Migration Planning](/fleet/migration/plan) · 📕 [Firmware History](/reference/appendices/firmware-history)
