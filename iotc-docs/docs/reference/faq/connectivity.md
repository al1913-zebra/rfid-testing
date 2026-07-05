---
id: connectivity
title: Connectivity and network FAQs
sidebar_label: Connectivity & network FAQs
description: "FAQ about IOTC connectivity: MQTT ports, TLS, cellular, Wi-Fi reconnect signals, broker reachability checks, Wi-Fi profile limits, and post-reset TLS time."
sidebar_custom_props: { emoji: "🌐" }
---

> 📕 **REFERENCE** · **Audience:** API consumer, Fleet Operator · **Use:** connectivity and network lookup

### Which ports does IOTC use?

TCP/8883 for MQTT over TLS (recommended); TCP/1883 for cleartext MQTT.

**Details:** [About network architecture](/infrastructure/network/architecture)

### Is TLS required?

Not strictly required, but strongly recommended for any non-trivial deployment.

**Details:** [How to secure the MQTT connection with TLS](/infrastructure/tls-setup)

### Does the reader support cellular?

Not directly — the reader connects over its own Wi-Fi. For cellular backhaul, put the reader on a Wi-Fi network served by a cellular router or gateway.

**Details:** [About network architecture](/infrastructure/network/architecture)

### How do I know the reader reconnected after a network drop?

Watch for `mqttConnEVT: CONNECTED` and resumed `heartbeatEVT`. Heartbeats stopping without a `DISCONNECTED` event indicates a silent offline.

**Details:** [Knowing when you're connected](/observability/mqtt-connection)

### How do I check the broker is reachable from the reader?

From a test MQTT client (e.g. MQTTX) on the reader's own Wi-Fi network: if it can reach the broker host and port, the reader can too.

**Details:** [Troubleshoot network connectivity](/infrastructure/network/troubleshooting)

### How many Wi-Fi profiles can the reader store?

Up to 10.

**Details:** [Network configuration reference — Wi-Fi limits](/reference/mgmt/get-wifi)

### Why does TLS fail right after a factory reset?

The reader has no on-board real-time-clock backup, so a factory reset clears its clock. TLS rejects certificates until the time is correct — make sure a reachable NTP/SNTP server is configured so the clock re-syncs.

**Details:** [How to secure the MQTT connection with TLS](/infrastructure/tls-setup)
