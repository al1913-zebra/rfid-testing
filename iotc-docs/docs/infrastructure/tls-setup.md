---
id: tls-setup
title: How to secure the MQTT connection with TLS
sidebar_label: How to secure the MQTT connection with TLS
description: "Enable TLS on an IOTC reader-broker connection: install the broker CA chain, switch the endpoint to MQTT_TLS, and verify with mqttConnEVT."
sidebar_custom_props: { emoji: "🔒" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~15 min

This guide shows you how to configure an endpoint to use TLS. The reader is the TLS **client**; your broker is the **server**. That split matters: certificate and key material is installed on the reader, while protocol and cipher-suite policy is enforced on the broker.

### Step 1: Install the broker CA

Follow [Install via HTTP](/infrastructure/certificate-management) or [Install via DIRECT](/infrastructure/certificate-management) with `type: mqtt` and a meaningful `name` (e.g., `broker-ca`).

### Step 2: Configure the endpoint for TLS

```json
{
  "command": "config_endpoint",
  "requestId": "tls-1",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "main-mgmt",
      "epType": "MGMT",
      "protocol": "MQTT_TLS",
      "url": "iotc-broker.zebra.com",
      "port": 8883,
      "qosCommon": 1,
      "verificationType": "VERIFY_HOST_PEER",
      "tenantId": "<TENANT_ID>",
      "activate": true,
      "mqttParams": {
        "username": "<MQTT_USERNAME>",
        "password": "<MQTT_PASSWORD>",
        "keepAlive": 60,
        "publishTopics": [{"topic": "MGMT/clients/resp", "qos": 0, "retain": false}],
        "subscribeTopics": [{"topic": "MGMT/clients/cmnd", "qos": 0, "retain": false}]
      },
      "securityParams": {
        "caCertificateFile": "broker-ca",
        "clientCert": "broker-client-cert",
        "clientKey": "broker-client-key",
        "format": "PEM"
      }
    }
  }
}
```

### Step 3: Verify

Watch `mqttConnEVT` arriving on the endpoint's event topic; you should see `connectionState: CONNECTED` and `mqttVersion: 3.1.1` once the secure connection is established.

### Verification levels

| `verificationType` | Behaviour |
|---|---|
| `NONE` | No TLS verification; use only on an isolated bench network |
| `VERIFY_PEER` | Server certificate validates against the installed CA |
| `VERIFY_HOST` | Hostname matches the certificate |
| `VERIFY_HOST_PEER` | Both — **recommended for production** |

### Harden the configuration

Enabling TLS is the start, not the finish. Four hardening choices materially change how strong the connection is:

- **Install the full chain, not just the leaf.** The reader validates the broker against the CA material you install. Install the *complete* chain — the root plus any intermediates — or the handshake fails with a chain error that is easy to misdiagnose.
- **Prefer ECDSA keys.** A 256-bit ECDSA key provides ~128 bits of security, against ~112 bits for RSA-2048, and is smaller and faster — which matters against the reader's 4 KB-per-certificate limit. RSA-2048 is the floor. Confirm your CA issues PEM / PKCS#1 material the reader accepts.
- **Set protocol and cipher policy on the broker.** Because the reader is the client, enforce versions on the server: require TLS 1.2 or later, disable SSLv3 / TLS 1.0 / 1.1, and prefer forward-secret (ECDHE) cipher suites so a future key compromise cannot decrypt recorded sessions.
- **Mind the clock.** TLS validation requires a correct time, and the reader has no real-time-clock backup. Configure a reachable NTP/SNTP server, or the handshake will fail after a factory reset until the clock re-syncs.

The endpoint shape here is identical to a plaintext endpoint plus `protocol: MQTT_TLS` and a `securityParams` block; the same `add` / `update` / `delete` operations and topic limits (3 publish / 1 subscribe, surfaced as error codes 25 and 26) apply. See [Configure MQTT endpoints](/infrastructure/configure-endpoints) and the [interface model](/foundations/architecture/interface-model) for the endpoint types and the MDM-as-bootstrap pattern.

**Related:** 📘 [Securing the connection (TLS and certificates)](/infrastructure/tls-and-certificates) · 📙 [Certificate management](/infrastructure/certificate-management) · 📙 [Rotate certificates at scale](/infrastructure/certificate-rotation) · 📕 [config_endpoint](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) · 📕 [mqttConnEVT](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#tag-mqttconnevt)
