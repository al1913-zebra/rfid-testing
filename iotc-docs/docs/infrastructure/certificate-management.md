---
id: certificate-management
title: How to manage TLS / SSL certificates
sidebar_label: How to manage TLS/SSL certificates
description: "Manage TLS / SSL certificates on IOTC readers: install via install_certificate (HTTP source), inspect with get_installed_certificates, delete and rotate."
sidebar_custom_props: { emoji: "📜" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder, Fleet Operator · **Time:** ~10 min

This guide shows you how to install, list, and delete certificates on a handheld reader.

### List installed certificates

```json
{"command": "get_installed_certificates", "requestId": "cert-1"}
```

> The operation is named `get_installed_certificate` (singular) on the API Reference, but the on-the-wire `command` string is `get_installed_certificates` (plural), as shown above.

### Install via HTTP download

The reader downloads the certificate(s) from URLs you specify.

```json
{
  "command": "install_certificate",
  "requestId": "cert-2",
  "certDetails": {
    "name": "broker-mqtt-ca",
    "type": "mqtt",
    "certSource": "HTTP",
    "authenticationType": "NONE",
    "verificationType": "VERIFY_HOST_PEER",
    "url": [
      {"key": "ca_cert", "value": "https://example.com/ca.pem"}
    ]
  }
}
```

### Install via direct (inline) content

```json
{
  "command": "install_certificate",
  "requestId": "cert-3",
  "certDetails": {
    "name": "broker-mqtt-ca",
    "type": "mqtt",
    "certSource": "DIRECT",
    "certificateBundle": {
      "ca_cert": "<PEM-content-string>"
    }
  }
}
```

### Certificate types

The `type` field determines where the certificate will be used:

| `type` | Purpose |
|---|---|
| `mqtt` | MQTT broker connection certificates (CA, client cert, client key) |
| `wifi` | Wi-Fi 802.1X / EAP-TLS certificates |
| `filestore` | Authentication for certificate-download servers |
| `client` | Generic client-side certificates |
| `server` | Server-side certificates |

### Certificate format and size

The reader accepts a narrow format envelope. A mismatch is one of the most common `install_certificate` failures, and because the install is asynchronous it surfaces as an `alerts` event (`alertDetails.downloadInfo` with `fileType: FILE_TYPE_CERT` and a `DOWNLOAD FAIL` / `SAVE FAIL` status) rather than as an immediate error.

| Constraint | Value |
|---|---|
| Encoding | **PEM** only, with `-----BEGIN CERTIFICATE-----` / `-----END CERTIFICATE-----` markers. PFX / PKCS#12 bundles are not supported on RFD40 / RFD90. |
| Key format | **RSA in PKCS#1** (`-----BEGIN RSA PRIVATE KEY-----`). A PKCS#8 key (`-----BEGIN PRIVATE KEY-----`) must be converted first. |
| Maximum size | **4 KB per file**, applied to the CA certificate, client certificate, and client key independently. |
| Required components (TLS) | CA certificate (authenticates the broker), client certificate (identifies the reader), and client key (the reader's private key). |

Convert a PKCS#8 key to PKCS#1 before installing:

```bash
openssl rsa -in key-pkcs8.pem -out key-pkcs1.pem -traditional
```

When a chain approaches the 4 KB ceiling, trim it to the minimum CA the broker requires.

### Delete a certificate

```json
{
  "command": "delete_certificate",
  "requestId": "cert-4",
  "certificateInfo": {"name": "old-ca", "type": "mqtt"}
}
```

Cannot delete a certificate currently referenced by an active endpoint or Wi-Fi profile.

### The logical name pattern

Every installed certificate carries a `name` you assign at install time. Other commands ([`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi), [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint), [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os)) reference the certificate by this logical name rather than by content. This keeps payloads small and lets you rotate the underlying certificate without changing the consuming commands.

### Private-key and CA hygiene

Key management, not key size, is where most real-world TLS compromises happen. A handful of practices carry most of the weight:

- **Keep private keys private.** Generate the client key where it is first created, restrict access to the smallest group possible, and never share one key across unrelated readers or environments — a per-device-class key limits the blast radius if one is compromised.
- **Generate with strong entropy; protect at rest.** Create keys on a host with a sound random-number generator and keep them passphrase-protected, so a compromised backup or USB transfer does not leak usable key material.
- **Prefer ECDSA P-256; RSA-2048 is the minimum.** Issue PEM-encoded, PKCS#1 material at 4 KB or less per certificate (the reader's limit).
- **Generate a new key at every renewal.** Re-issuing a certificate against the *same* key leaves the old key as a standing attack vector; a fresh key per renewal retires it. See [Rotate certificates at scale](/infrastructure/certificate-rotation).
- **Choose the CA deliberately.** Pick a CA that supports both RSA and ECDSA and offers ACME-style issuance automation. For fleet-internal device identity, a private CA / PKI is often the right call. Remember that a single CA is a single point of failure.

**Related:** 📘 [Security Model](/infrastructure/tls-and-certificates) · 📕 [certificate endpoints](/reference/api-overview) · 📙 [Rotation at Scale](/infrastructure/certificate-rotation) · 📙 [TLS Setup](/infrastructure/tls-setup)
