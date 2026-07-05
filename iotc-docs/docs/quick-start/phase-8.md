---
id: phase-8
title: "Phase 8: Secure the connection (TLS)"
sidebar_label: "Phase 8: Secure the connection"
description: "Phase 8 of the IOTC Quick Start: secure the connection. Install the broker CA, switch the endpoint to MQTT_TLS on port 8883, and verify with mqttConnEVT."
sidebar_custom_props: { emoji: "8️⃣" }
---

> 📗 **TUTORIAL** · **Phase:** 8 of 8 · **Audience:** Integrator · **Time:** ~15 min

**Artifact this phase produces:** the same working reader, now talking to the broker over **TLS (port 8883)** instead of cleartext. This is the step that turns your Quick Start setup into something you can put in front of production traffic.

### Why this phase exists

Phases 1–7 connect over **plain MQTT on port 1883** to keep first-light friction low — every command and every tag read crosses the network in clear text. That is fine on a lab bench and **not** fine in production. This phase promotes the connection to TLS 1.2. It is intentionally the happy path; the full reference (multiple auth modes, inline vs file certs, rotation at scale) lives in [Securing the connection (TLS & certificates)](/infrastructure/tls-and-certificates).

### What to do

#### 1. Install the broker's CA certificate

The reader must trust the certificate authority that signed your broker's certificate. Install the CA with [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate), giving it a stable alias you'll reference from the endpoint:

```bash
mosquitto_pub -h <broker-host> -p 1883 \
  -t 'zebra/MDM/clients/cmnd/RFD40-24190525100255' \
  -m '{
        "command": "install_certificate",
        "requestId": "tls-001",
        "certificateDetails": {
          "alias": "broker-ca",
          "certificateType": "CA",
          "url": "https://files.example.com/broker-ca.pem"
        }
      }'
```

For the inline-content variant and PEM/PKCS#1 specifics, see [How to manage TLS / SSL certificates](/infrastructure/certificate-management).

#### 2. Switch the endpoint to MQTT_TLS

Re-configure the endpoint you've been using so its `protocol` is `MQTT_TLS`, its `port` is `8883`, and it points at the CA alias you just installed:

```bash
mosquitto_pub -h <broker-host> -p 1883 \
  -t 'zebra/MDM/clients/cmnd/RFD40-24190525100255' \
  -m '{
        "command": "config_endpoint",
        "requestId": "tls-002",
        "epConfig": {
          "operation": "update",
          "configuration": {
            "endpointName": "mdm",
            "epType": "MDM",
            "protocol": "MQTT_TLS",
            "port": 8883,
            "activate": true,
            "url": "<broker-host>",
            "verificationType": "VERIFY_HOST_PEER",
            "securityParams": { "format": "PEM", "caCertificateFile": "broker-ca" }
          }
        }
      }'
```

Use `VERIFY_HOST_PEER` in production — see the [security model](/infrastructure/tls-and-certificates) for why `NONE` is unsafe.

#### 3. Verify over TLS

The reader drops the cleartext session and reconnects on 8883. Subscribe on the TLS listener and confirm a fresh `mqttConnEVT`:

```bash
mosquitto_sub -h <broker-host> -p 8883 --cafile broker-ca.pem \
  -t 'zebra/MDM/clients/event/RFD40-24190525100255' -v
```

```json
{ "connectionState": "CONNECTED", "deviceSerialNo": "RFD40-24190525100255", "mqttVersion": "3.1.1" }
```

### Didn't work?

- **TLS fails immediately after a factory reset.** The reader's clock is cleared on reset; TLS rejects certificates until the clock re-syncs. Ensure a reachable NTP/SNTP server is configured.
- **Handshake rejected.** Confirm the CA alias in the endpoint matches the installed alias, and that the broker certificate chains to that CA.
- For the full decision tree, see [How to secure the MQTT connection with TLS](/infrastructure/tls-setup).

### Success check

- `install_certificate` returns `response.code: 0`.
- `config_endpoint` returns `response.code: 0`.
- A new `mqttConnEVT: CONNECTED` arrives on the **8883** listener.
- Plaintext clients on 1883 can no longer reach the reader's endpoint.

### You've completed the Quick Start — securely

Eight phases: from an unboxed sled to a managed, observable, **encrypted** reader. Where to go next:

- **Production hardening.** [Rotate certificates at scale](/infrastructure/certificate-rotation) · [What happens when the network drops](/fleet/retention-and-retry).
- **Scale out.** [Going from one reader to a fleet](/fleet/provisioning-models).
- **Tune reads.** [Choose how the reader reads tags](/rfid/operating-mode-profiles).
