---
id: general
title: General questions
sidebar_label: General questions
description: "General FAQ about IOTC for handheld RFID: supported hardware, MQTT version, REST availability, credentials, minimum firmware, API versioning, multi-endpoint."
sidebar_custom_props: { emoji: "❓" }
---

> 📕 **REFERENCE** · **Audience:** API consumer · **Use:** general lookup

### What hardware does IOTC for Handheld RFID support?

The RFD40 (Premium and Premium Plus) and RFD90 sleds running firmware 3.10.27 or later.

**Details:** [About supported hardware](/foundations/hardware-tiers)

### Which MQTT version does IOTC use?

MQTT 3.1.1, exclusively.

**Details:** [About MQTT 3.1.1](/foundations/mqtt-primer)

### Is there a REST API?

No. Handheld IOTC communicates only over MQTT.

**Details:** [About Zebra IoT Connector for Handheld RFID](/foundations/about-iotc)

### Where do I get IOTC credentials?

From the Zebra developer portal, under IoT Connector → Tenants (for the Zebra-hosted broker). For a customer-hosted broker, you bring your own broker credentials.

**Details:** [How to obtain IOTC credentials and tenant ID](/quick-start/prerequisites/credentials)

### What is the minimum firmware version?

3.10.27.

**Details:** [Hardware and software requirements](/quick-start/prerequisites/requirements)

### Is the IOTC API versioned?

Yes — V1.0 and V1.1. Both API surfaces are accepted on firmware 3.10.27+; V1.1 is a delta release that adds features without breaking V1.0 clients.

**Details:** [About IOTC V1.1 features](/foundations/v1-1-features)

### Can one reader send to more than one destination at a time?

Yes. A reader runs multiple endpoints — MGMT, MGMT_EVT, CTRL, DATA1, DATA2, and an MDM or SOTI endpoint — each with its own broker, topics, and TLS settings.

**Details:** [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints)
