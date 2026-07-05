---
id: compatibility
title: Compatibility FAQs
sidebar_label: Compatibility FAQs
description: "FAQ about IOTC compatibility: V1.0/V1.1 interop, firmware support, application changes, mixed-version fleets, supported brokers, and certificate format."
sidebar_custom_props: { emoji: "🤝" }
---

> 📕 **REFERENCE** · **Audience:** All personas · **Use:** compatibility lookup · Migration procedure is in [Plan the migration](/fleet/migration/plan), not in this FAQ.

:::note[How these answers are sourced]
The V1.0↔V1.1 interop answers come from the API schema itself: every documented operation declares `Supported API Versions: V1.0, V1.1`, and the control-response model (`iot_control_cmd_response.v1.1.json`) enum-constrains `apiVersion` to `V1.0` / `V1.1`. The **firmware-version** mapping (3.10.27+) has **no schema source** — treat it as indicative and confirm against the [firmware version history](/reference/appendices/firmware-history) and Zebra's release notes for your model.
:::

### Is IOTC V1.0 backward compatible with V1.1?

Mostly yes — V1.1 is a delta release; existing V1.0 client code typically works unmodified.

**Details:** [About IOTC V1.1 features](/foundations/v1-1-features)

### Which firmware versions support V1.1?

Firmware 3.10.27 and later.

**Details:** [Firmware version history and changelog](/reference/appendices/firmware-history)

### Do I need to update applications when migrating to V1.1?

Only if you want to consume V1.1-only fields; existing code is forward-compatible.

**Details:** [How to plan a migration](/fleet/migration/plan)

### Can mixed-version fleets coexist during migration?

Yes — V1.0 and V1.1 readers can operate against the same broker with the same application.

**Details:** [How to execute a phased migration](/fleet/migration/execute)

### Which MQTT brokers are supported?

Any broker that implements MQTT 3.1.1 — the only protocol version the reader speaks. Common choices include Mosquitto, HiveMQ, and EMQX; SOTI provides a managed broker for SOTI-managed fleets.

**Details:** [About MQTT 3.1.1](/foundations/mqtt-primer)

### What certificate format does the reader require?

PEM-encoded certificates with PKCS#1 keys, up to 4 KB each: a CA certificate, a client certificate, and a client key.

**Details:** [How to manage TLS/SSL certificates](/infrastructure/certificate-management)
