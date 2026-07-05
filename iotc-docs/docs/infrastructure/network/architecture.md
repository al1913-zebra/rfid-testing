---
id: architecture
title: Network connectivity (Wi-Fi and Ethernet)
sidebar_label: Getting on the network (Wi-Fi & Ethernet)
description: "How IOTC sleds reach the network: native Wi-Fi 6 in firmware plus the read-only view of the reader's own Ethernet interface, with Wi-Fi profiles, security types, and limits."
sidebar_custom_props: { emoji: "🌐" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder, Fleet Operator · **Read time:** ~5 min · **Ties to:** Network Configuration sub-tag of the API Reference

:::tip[See in the API Reference]
Sub-tag: Network Configuration. Operations: [`get_eth`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth) · [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) · [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi) · [`delete_wifi_profile`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-wifi-profile).
:::

A sled gets to the broker over its own **Wi-Fi** (Premium, Premium Plus, RFD90). Ethernet does not exist on the sled itself; [`get_eth`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth) reads the *reader's own* Ethernet interface posture — which on a handheld sled is typically absent because the sled has no Ethernet port. This chapter is the Wi-Fi-on-the-sled surface plus the read-only Ethernet view.

### What lives where

Wi-Fi credentials and IPv4 strategy live in firmware. They were provisioned by 123RFID Desktop during Phase 2 of the Quick Start. After that, you can:

- **Read** them with [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) (lists configured profiles).
- **Add or modify** them with [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi) (operation `CREATE` or `MODIFY`).
- **Remove** them with [`delete_wifi_profile`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-wifi-profile).

### Wi-Fi profiles, limits, and security

A device holds **up to 10** saved Wi-Fi profiles and connects to the preferred one in range. Each profile names a security posture — WPA2/WPA3 **Personal** (pre-shared key) or **Enterprise** (802.1X, with `tls` / `ttls` / `peap` and installed certificate references). Choosing Enterprise is the decision that pulls certificates into the picture: the `ca_cert`, `client_cert`, and `client_key` logical names must already be installed before a profile can use them.

The `CREATE` vs `MODIFY` distinction is a precondition check — `CREATE` needs the ESSID to be new, `MODIFY` needs it to already exist — so inspect with [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) first when unsure. The exact `securityType` enum, the per-profile limits (10 profiles, ESSID ≤ 32 characters, Enterprise certificate ≤ 4 KB), and the `set_wifi` error codes are catalogued in the [network configuration reference](/reference/mgmt/get-wifi); the step-by-step is in [How to configure Wi-Fi profiles](/infrastructure/network/wifi).

### [`get_eth`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth): when it makes sense

[`get_eth`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth) returns the *reader's own* Ethernet interface status: whether an Ethernet interface is up, its IP, link speed. On a handheld sled the result is typically "no Ethernet interface present", the sled has no Ethernet port. The command remains useful when:

- The sled is in a cradle that exposes Ethernet through a host (rare).
- You are querying through a fixed-reader companion deployment.
- You want to confirm the reader has not unexpectedly grown an interface (it hasn't).

Most Quick Start integrations will never call [`get_eth`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth). It is documented for completeness and for parity with the fixed-reader IOTC product.

### IPv4: DHCP vs static

`set_wifi.wifiConfig.accessPoint.ipv4Configuration` carries the IPv4 strategy:

- `{"enableDhcp": true}`, most deployments. Let the AP / DHCP server hand out an address.
- `{"enableDhcp": false, "ipAddress": "...", "subnetMask": "...", "gateway": "...", "dnsServer": "..."}`: static. Required for some industrial deployments where IP-to-device mapping must be deterministic.

Static IPv4 also requires the subnet to match what the AP serves; mismatches produce a connected radio that cannot route to the broker.

### Five-segment path mental model

From sled to broker:

```d2
direction: down
radio: "Radio\n(set_wifi — sled controls)"
ap: "Access Point\n(Wi-Fi environment)"
lan: "LAN\n(IT-managed)"
wan: "WAN / VPN\n(IT-managed)"
broker: "Broker\n(broker config)" { shape: queue }
radio -> ap -> lan -> wan -> broker
```

Each segment has its own failure profile. The sled controls only the first; the rest are IT / network domain. See [Where things fail](/diagnose/where-things-fail) for the layered diagnostic frame.

### Out of scope

- **TLS over MQTT**, see [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates).
- **The full configuration of an MQTT endpoint**, see [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints).
- **Network failure modes**, see [Where things fail](/diagnose/where-things-fail).

**Related:** 📕 [Network configuration (MGMT)](/reference/mgmt/get-wifi) · 📙 [How to configure Wi-Fi profiles](/infrastructure/network/wifi) · 📘 [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates) · 📘 [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints) · 📕 [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/)
