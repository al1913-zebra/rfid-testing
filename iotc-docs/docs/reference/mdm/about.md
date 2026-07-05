---
id: about
title: MDM and SOTI interfaces
sidebar_label: MDM and SOTI interfaces
description: "Reference for the IOTC MDM endpoint: the bootstrap default that 123RFID Desktop creates first, plus SOTI Connect and 42Gears SureMDM integration."
sidebar_custom_props: { emoji: "📱" }
---
> 📕 **REFERENCE** · **Audience:** API consumer · **Use:** look up the MDM and SOTI endpoint types

:::note[Source of truth]
This page mirrors the [MQTT API Reference](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/) for convenience. The API Reference is authoritative for field names, enums, and error codes; if the two ever differ, trust the API Reference.
:::

Two management-integration endpoint types let an MDM platform manage the reader over its own MQTT broker. Both are configured with the same [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) shape — you select the `epType`. Concept chapter: [Going from one reader to a fleet](/fleet/provisioning-models).

### `epType: MDM` (Generic MDM)

A standardized, lightweight set of IOTC management APIs that any MDM platform can implement. 123RFID Desktop creates this endpoint first and enrolls the sled; every other endpoint is then added remotely through it. Most parameters remain user-configurable through the 123RFID applications. 42Gears (SureMDM) is a current implementation of the Generic MDM API set.

### `epType: SOTI`

The SOTI MobiControl / SOTI Connect specialisation. Functionally equivalent to Generic MDM, with minor variations in API definitions and configuration parameters — for example, the reader returns a SOTI-shaped response for [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) (`get_wifi_response_soti.json`). Most parameters are pre-configured; the operator sets only a few essential values. 123RFID Desktop enrolls sleds directly into the SOTI cloud.

Connecting to SOTI Connect requires the SOTI MQTT broker URL and port, broker credentials, TLS certificates, and (optionally) a tenant ID.

**Related:** 📘 [Going from one reader to a fleet](/fleet/provisioning-models) · 📙 [Zero-touch provisioning with SOTI Connect](/fleet/provisioning/soti-connect) · 📕 [MQTT endpoint configuration (MGMT)](/reference/mgmt/config-endpoint) · 📕 [MQTT API Reference](/reference/api-overview)
