---
id: aws
title: How to integrate IOTC with AWS IoT Core
sidebar_label: How to integrate with AWS IoT Core
description: "Integrate IOTC readers with AWS IoT Core: register the device, configure the MQTT endpoint, install the AWS CA cert, route data into Lambda or Kinesis."
sidebar_custom_props: { emoji: "🟧" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~60 min

:::note[Prerequisites]
This guide assumes the cloud side already exists. Create the broker endpoint, the per-reader device identity, and its credentials **first** — see [Cloud integration prerequisites](/fleet/cloud-integration/prerequisites).
:::

:::note[Provenance]
The reader-side payloads here are IOTC-native and authoritative. The AWS-side steps (Thing/policy/certificate workflow, data routing) are adapted from Zebra's fixed-reader AWS IoT Core connect guide plus AWS's own documentation — there is no handheld-specific AWS guide in the IOTC source set. Confirm the cloud-side specifics against current AWS IoT Core documentation, which is authoritative for that side.
:::

This guide shows you how to connect a handheld reader to AWS IoT Core as the MQTT broker.

### Prerequisites

An AWS account with IoT Core enabled, IAM permissions to create things and policies, and access to the AWS Console.

### Step 1: Create a Thing and certificate in AWS

In AWS IoT Core: **Manage → Things → Create**. Create a Thing named after the reader's serial number. Generate and download a device certificate and key. Activate the certificate. Attach an IoT policy granting `iot:Connect`, `iot:Publish`, `iot:Subscribe`, and `iot:Receive` on the appropriate topic ARNs.

### Step 2: Install the AWS CA and client cert on the reader

Per [Certificate management](/infrastructure/certificate-management), install:

- The Amazon Root CA (`AmazonRootCA1.pem`) as a CA certificate, alias `aws-ca`.
- The Thing-specific client certificate (converted to PEM), alias `aws-client-cert`, and its private key (PKCS#1), alias `aws-client-key` — the two aliases referenced by `clientCert` and `clientKey` in Step 3.

### Step 3: Configure the reader's endpoints to point at AWS

```json
{
  "command": "config_endpoint",
  "requestId": "aws-1",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "dataEP",
      "epType": "DATA1",
      "protocol": "MQTT_TLS",
      "activate": true,
      "url": "<account-id>-ats.iot.<region>.amazonaws.com",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "<tenant-id>",
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "aws-ca",
        "clientCert": "aws-client-cert",
        "clientKey": "aws-client-key"
      }
    }
  }
}
```

Repeat for `ctrl` and `mgmt` if you want full integration; or keep them on the Zebra-hosted broker and use AWS only for DATA (separate-data-broker pattern, see [Multi-endpoint architectures](/infrastructure/multi-endpoint)).

### Step 4: Topic mapping

AWS IoT Core does not impose a topic convention; you choose. A common pattern is to mirror the IOTC topic structure under a top-level prefix you control. The reader continues to publish to `{tenantId}/data1event/...` — AWS receives those exactly. Downstream AWS rules can route to Kinesis, Lambda, or DynamoDB.

### Step 5: Verify

In AWS IoT Core's **Test to MQTT test client**, subscribe to `<tenantId>/data1event/clients/#`. Start an inventory on the reader. Tag-data events should appear in the AWS test client.

```d2
direction: down
R: IOTC Reader
AWS: AWS IoT Core { shape: queue }
cloud: AWS Pipeline {
  RU: IoT Rules
  KDS: Kinesis Data Stream
  L: Lambda
  SQ: SQS
  AN: Analytics
}
R -> AWS: "MQTT/TLS\nport 8883"
AWS -> cloud.RU
cloud.RU -> cloud.KDS
cloud.RU -> cloud.L
cloud.RU -> cloud.SQ
cloud.KDS -> cloud.AN

```

**Related:** 📘 [Integration Patterns](/fleet/cloud-integration/patterns) · 📙 [TLS Setup](/infrastructure/tls-setup) · 📙 [Endpoint Configuration](/infrastructure/configure-endpoints) · 📕 [config_endpoint](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint)
