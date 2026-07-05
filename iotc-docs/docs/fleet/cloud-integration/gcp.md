---
id: gcp
title: How to integrate IOTC with Google Cloud (MQTT bridge)
sidebar_label: How to integrate with Google Cloud
description: Integrate IOTC readers with Google Cloud via MQTT bridge or HiveMQ Cloud (GCP IoT Core is sunset). Device registry, JWT auth, tag routing into BigQuery.
sidebar_custom_props: { emoji: "🟩" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~60 min

:::note[Prerequisites]
This guide assumes the cloud side already exists. Create the broker endpoint, the per-reader device identity, and its credentials **first** — see [Cloud integration prerequisites](/fleet/cloud-integration/prerequisites).
:::

:::info
Google Cloud IoT Core was deprecated by Google in 2023. This guide targets the successor pattern: GCP-hosted Pub/Sub via an MQTT bridge or a customer-hosted MQTT broker on GCP infrastructure. If you are building on GCP, evaluate [Custom MQTT Broker](/fleet/cloud-integration/custom-broker) using HiveMQ on GKE or EMQX on Compute Engine.

**Provenance:** the reader-side payload below is IOTC-native and authoritative. The GCP-side steps are authored from Google Cloud's current architecture — Zebra's IOTC source material ships fixed-reader connect guides for AWS and Azure only, and **no GCP guide**. Treat Google Cloud's own documentation as authoritative for the cloud-side steps, and re-verify them against current GCP services before building.
:::

This guide shows you how to connect a handheld reader to a GCP-hosted MQTT broker and route tag data into Pub/Sub for downstream processing.

### Prerequisites

A GCP project, a GKE cluster (or Compute Engine instance) hosting an MQTT broker, a Pub/Sub topic for tag data.

### Step 1: Deploy the broker

Deploy HiveMQ, EMQX, or Mosquitto on GCP per the vendor's instructions. Configure TLS, expose port 8883 publicly, and set up an authentication backend (vault-integrated or static credentials).

### Step 2: Install certificates on the reader

Per [Certificate management](/infrastructure/certificate-management), install the broker's CA certificate and (if using mutual TLS) the client certificate.

### Step 3: Configure the reader's endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "gcp-1",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "dataEP",
      "epType": "DATA1",
      "protocol": "MQTT_TLS",
      "activate": true,
      "url": "<broker-hostname>.example.com",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "<tenant-id>",
      "mqttParams": {
        "username": "<broker-user>",
        "password": "<broker-password>"
      },
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "gcp-broker-ca"
      }
    }
  }
}
```

### Step 4: Bridge to Pub/Sub

Deploy a bridge service (a Cloud Run service, a GKE pod, or a Cloud Function with Eventarc) that subscribes to the MQTT broker's tag-data topics and publishes to a Pub/Sub topic. Downstream consumers (Dataflow, BigQuery streaming inserts, Cloud Functions) consume from Pub/Sub.

### Step 5: Verify

Watch Pub/Sub topic metrics — message rate should match the reader's tag-emission rate.

```d2
direction: down
R: IOTC Reader
B: "GCP-hosted broker\nHiveMQ on GKE /\nEMQX on Compute Engine" { shape: queue }
BR: "Bridge service\n(Cloud Run / GKE /\nCloud Function)"
PS: Pub/Sub topic
cloud: GCP Analytics {
  BQ: BigQuery
  DF: Dataflow
}
R -> B: MQTT/TLS
B -> BR
BR -> PS
PS -> cloud.BQ
PS -> cloud.DF

```

**Related:** 📘 [Integration Patterns](/fleet/cloud-integration/patterns) · 📙 [Custom MQTT Broker](/fleet/cloud-integration/custom-broker) · 📙 [TLS Setup](/infrastructure/tls-setup)
