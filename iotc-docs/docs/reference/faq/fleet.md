---
id: fleet
title: Fleet management FAQs
sidebar_label: Fleet management FAQs
description: "FAQ about IOTC fleet management: SOTI Connect, fleet firmware updates, firmware rollback, health monitoring, drift detection, and supported MDM platforms."
sidebar_custom_props: { emoji: "🚚" }
---

> 📕 **REFERENCE** · **Audience:** API consumer · **Use:** fleet management lookup

### Does IOTC support SOTI Connect?

Yes. SOTI Connect is the recommended MDM platform for handheld IOTC fleets.

**Details:** [How to set up zero-touch provisioning with SOTI Connect](/fleet/provisioning/soti-connect)

### Which MDM platforms work with IOTC?

SOTI Connect (Zebra's reference partner, via the `SOTI` endpoint type) and any platform that implements the Generic MDM API set, such as 42Gears, via the `MDM` endpoint type.

**Details:** [MDM and SOTI interfaces](/reference/mdm/about)

### How do I update firmware across a fleet?

Issue [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) to each reader, ideally orchestrated in waves through SOTI Connect or your automation pipeline.

**Details:** [How to execute a phased migration](/fleet/migration/execute)

### Can I roll back firmware on handheld readers?

No. Firmware revert is not supported on this hardware family — plan migrations as one-way, with re-bootstrap from a captured baseline as the recovery path.

**Details:** [How to plan a migration](/fleet/migration/plan)

### How do I detect configuration drift across the fleet?

Read each configuration surface ([`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config), `get_wifi`, `get_operating_mode`), diff each against the canonical config for that device class, and reconcile the difference.

**Details:** [Keeping a fleet in sync](/fleet/bulk-management)

### How do I monitor fleet health?

Subscribe to fleet-wide `heartbeatEVT` and `mqttConnEVT` with wildcard topics; treat heartbeat absence as a silent-offline signal.

**Details:** [How to build a fleet health dashboard](/observability/monitoring/fleet-dashboard)
