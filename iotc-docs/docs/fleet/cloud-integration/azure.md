---
id: azure
title: How to integrate IOTC with Azure IoT Hub
sidebar_label: How to integrate with Azure IoT Hub
description: "Integrate IOTC readers with Azure IoT Hub: device provisioning via DPS, MQTT endpoint config, SAS vs X.509 auth, route tag data into Event Hubs."
sidebar_custom_props: { emoji: "🟦" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~60 min

:::note[Prerequisites]
This guide assumes the cloud side already exists. Create the broker endpoint, the per-reader device identity, and its credentials **first** — see [Cloud integration prerequisites](/fleet/cloud-integration/prerequisites).
:::

:::note[Provenance]
The reader-side payloads here are IOTC-native and authoritative. The Azure-side steps (DPS provisioning, SAS vs X.509 auth, Event Hubs routing) are adapted from Zebra's fixed-reader Azure IoT Hub connect guide plus Azure's own documentation — there is no handheld-specific Azure guide in the IOTC source set. Confirm the cloud-side specifics against current Azure IoT Hub documentation, which is authoritative for that side.
:::

This guide shows you how to connect a handheld reader to Azure IoT Hub as the MQTT broker.

### Prerequisites

An Azure subscription with an IoT Hub instance, sufficient permissions to register devices, and Azure CLI installed (or use the portal).

### Step 1: Register the device

```bash
az iot hub device-identity create \
  --hub-name <iot-hub-name> \
  --device-id <reader-serial> \
  --auth-method x509_ca
```

Generate a device certificate signed by your IoT Hub-uploaded CA. Convert it to PEM (PKCS#1 key) for the reader.

### Step 2: Install certificates on the reader

Per [Certificate management](/infrastructure/certificate-management), install the DigiCert Global Root G2 (Azure's TLS CA) and the device client certificate.

### Step 3: Configure the reader's endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "azure-1",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "dataEP",
      "epType": "DATA1",
      "protocol": "MQTT_TLS",
      "activate": true,
      "url": "<iot-hub-name>.azure-devices.net",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "<tenant-id>",
      "mqttParams": {
        "username": "<iot-hub-name>.azure-devices.net/<reader-serial>/?api-version=2021-04-12"
      },
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "azure-ca",
        "clientCert": "azure-client-cert",
        "clientKey": "azure-client-key"
      }
    }
  }
}
```

Azure IoT Hub requires a specific username format encoding the device identity.

### Step 4: Topic mapping

Azure IoT Hub uses its own MQTT topic convention (`devices/{deviceId}/messages/events/...`). For most use cases, you'll consume IoT Hub's native message ingestion (Event Hubs, IoT Hub built-in endpoint) rather than subscribing to topics directly.

### Step 5: Verify

Use `az iot hub monitor-events --hub-name <iot-hub-name>` to watch incoming messages. Start an inventory on the reader. Events should appear in the CLI output.

```d2
direction: down
R: IOTC Reader
H: Azure IoT Hub { shape: queue }
cloud: Azure Pipeline {
  EH: Event Hubs
  SB: Service Bus
  ADX: Azure Data Explorer
  SA: Stream Analytics
}
R -> H: "MQTT/TLS\ndevices/.../messages/events"
H -> cloud.EH
H -> cloud.SB
cloud.EH -> cloud.ADX
cloud.EH -> cloud.SA

```

**Related:** 📘 [Integration Patterns](/fleet/cloud-integration/patterns) · 📙 [TLS Setup](/infrastructure/tls-setup) · 📙 [Endpoint Configuration](/infrastructure/configure-endpoints)
