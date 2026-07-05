---
id: prerequisites
title: Cloud integration prerequisites
sidebar_label: Cloud prerequisites
description: "What to create on the cloud side — AWS IoT Core, Azure IoT Hub, Google Cloud, or a custom broker — before wiring an IOTC reader to it."
sidebar_custom_props: { emoji: "🔑" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Use:** vendor-side checklist before the provider guides

Every cloud guide in this section (`AWS`, `Azure`, `Google Cloud`, `custom broker`) starts from the point where the cloud side **already exists** — a broker endpoint, a device identity, and credentials the reader can present. Those artifacts are created in the cloud vendor's own console, not over IOTC, and they are the most common place an integration stalls. Create the items below **first**, then follow the per-provider guide.

:::note Source of truth for vendor steps
Cloud-vendor consoles, CLIs, and API versions change independently of this documentation. The links below are entry points; always confirm the exact steps against the provider's current documentation. The IOTC-side credentials (Zebra tenant / broker) are covered separately in [Phase 0: How to obtain IOTC credentials and tenant ID](/quick-start/prerequisites/credentials).
:::

### What every integration needs (provider-independent)

- A reachable **MQTT 3.1.1** broker endpoint (host + TLS port, normally `8883`).
- A **device identity** per reader (named by serial number is the convention used throughout these guides).
- The **CA certificate** chain the reader must trust, plus any **client certificate/key** the broker requires — PEM-encoded, PKCS#1, ≤ 4 KB each (see [How to manage TLS / SSL certificates](/infrastructure/certificate-management)).
- **Topic ACLs** that permit the reader's three-segment topics (`<tenantId>/<topic>/<deviceSerialNumber>`).

### AWS IoT Core

Before [How to integrate IOTC with AWS IoT Core](/fleet/cloud-integration/aws), in the AWS console:

1. Enable **AWS IoT Core** in your target region, and note the account's **ATS data endpoint** (*IoT Core → Settings → Device data endpoint*, of the form `<id>-ats.iot.<region>.amazonaws.com`).
2. **Create a Thing** per reader (*Manage → Things → Create*), named after the device serial number.
3. **Generate and download** a device certificate and private key, and download the **Amazon Root CA (CA1)**. Convert the client cert/key to PEM / PKCS#1 for the reader.
4. **Activate** the certificate and **attach an IoT policy** granting `iot:Connect`, `iot:Publish`, `iot:Subscribe`, `iot:Receive` on the reader's topic ARNs (scope them to the serial-number topic space).
5. **Attach** the certificate to the Thing.

*Hand-off to the AWS guide:* the ATS endpoint, the Amazon Root CA, the per-reader client cert/key, and the policy.

### Azure IoT Hub

Before [How to integrate IOTC with Azure IoT Hub](/fleet/cloud-integration/azure), in the Azure portal:

1. **Create an IoT Hub** and note its **hostname** (`<hub>.azure-devices.net`).
2. **Register a device** per reader (*IoT Hub → Devices → Add device*) — or, for scale, create a **Device Provisioning Service (DPS)** enrolment group linked to the hub.
3. Choose the auth method: **symmetric key (SAS)** or **X.509** client certificate; for X.509, register the issuing CA / thumbprint.
4. Obtain the **root CA chain** the reader must trust for the hub's TLS endpoint.

*Hand-off to the Azure guide:* the hub hostname, the per-device identity + SAS key (or X.509 cert), and the trust chain.

### Google Cloud

Before [How to integrate IOTC with Google Cloud IoT](/fleet/cloud-integration/gcp):

1. Note that **Google Cloud IoT Core was retired (August 2023)** — there is no native managed MQTT device registry. Plan an **MQTT-bridge** path instead.
2. Stand up a broker that fronts Google Cloud: a **self-managed broker** (Mosquitto / HiveMQ / EMQX on GCE or GKE) or **HiveMQ Cloud**, bridging messages into **Pub/Sub**.
3. In your **GCP project**, create the **Pub/Sub topic** (and a **BigQuery** subscription/sink if you route tag data there).
4. Create the **per-reader credentials** the bridge expects (broker username/password or client cert; a signed **JWT** only if your bridge implements that legacy pattern).

*Hand-off to the GCP guide:* a reachable broker/bridge endpoint, per-reader credentials, and the downstream Pub/Sub topic.

### Custom MQTT broker

Before [How to integrate IOTC with a custom MQTT broker](/fleet/cloud-integration/custom-broker):

1. Stand up the broker (Mosquitto, HiveMQ, EMQX, …) and expose **port 8883 with TLS** configured (server certificate signed by a CA the reader will trust).
2. Create **per-reader credentials** — username/password and/or a client certificate for mutual TLS.
3. Configure **topic ACLs** scoped to each reader's serial-number topic space (`<tenantId>/<topic>/<deviceSerialNumber>`).
4. Decide a **rate-limit / backpressure** posture for tag-data bursts (a single inventory sweep can emit hundreds of TPS).

*Hand-off to the custom-broker guide:* the TLS broker endpoint, per-reader credentials, the ACLs, and a rate-limit plan.

**Related:** 📘 [Cloud integration architecture patterns](/fleet/cloud-integration/patterns) · 📙 [How to manage TLS / SSL certificates](/infrastructure/certificate-management) · 📗 [Tutorial: provision a three-reader fleet](/fleet/provision-fleet)
