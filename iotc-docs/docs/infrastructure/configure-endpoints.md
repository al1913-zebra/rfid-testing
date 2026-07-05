---
id: configure-endpoints
title: How to configure MQTT endpoints
sidebar_label: How to configure MQTT endpoints
description: "Configure IOTC MQTT endpoints with config_endpoint: add, update, and delete operations across the seven endpoint types, with a canary-rollback pattern."
sidebar_custom_props: { emoji: "⚙️" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~10 min

This guide shows you how to set the broker target for one or more MQTT interfaces.

### Decide: single or separate brokers

If you have no specific reason to separate, **use a single broker for all interfaces**. Separate brokers are an architectural choice with operational cost; see [Multi-endpoint architectures](/infrastructure/multi-endpoint).

### Configure an interface

```json
{
  "command": "config_endpoint",
  "requestId": "ep-set-1",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "ctrlEP",
      "epType": "CTRL",
      "protocol": "MQTT_TLS",
      "activate": true,
      "url": "iotc-broker.zebra.com",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "<tenant-id>",
      "mqttParams": {
        "username": "<user>",
        "password": "<password>"
      },
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "broker-ca",
        "clientCert": "broker-client-cert",
        "clientKey": "broker-client-key"
      }
    }
  }
}
```

Repeat with the matching `epType` (`MGMT`, `DATA1`, `MDM`, …) for the other endpoints. Use `"operation": "add"` for a brand-new endpoint and `"delete"` (with just `endpointName` and `epType`) to remove one.

### Validate the change

Watch `mqttConnEVT` for the affected interface, you should see a disconnect from the old endpoint followed by a connect to the new one within seconds.

### Rollback if connectivity is lost

If the new endpoint configuration causes loss of MQTT connectivity:

1. Dock the reader in a cradle with USB access to 123RFID Desktop.
2. Restore the previous endpoint configuration.
3. Reapply and verify.

This is why endpoint changes should be canaried on a single device before fleet rollout.

```d2
S: Choose endpoint topology
Q1: "Tag volume\n> 100 TPS sustained?" { shape: diamond }
Q2: "MDM platform\nrequired?" { shape: diamond }
SEP: Separate DATA broker
SINGLE: Single broker
MDMG: MDM-managed endpoint
S -> Q1
Q1 -> Q2: No
Q1 -> SEP: Yes
Q2 -> SINGLE: No
Q2 -> MDMG: Yes

```

**Related:** 📘 [Multi-Endpoint Architectures](/infrastructure/multi-endpoint) · 📙 [TLS Setup](/infrastructure/tls-setup) · 📕 [config_endpoint](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) · 📕 [mqttConnEVT](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#tag-mqttconnevt)
