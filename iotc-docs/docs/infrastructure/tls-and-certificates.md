---
id: tls-and-certificates
title: Connection security model (TLS and certificates)
sidebar_label: Securing the connection (TLS & certificates)
description: "The IOTC security model: TLS 1.2 for MQTT, CA trust chain, client cert options, MQTT_TLS vs plain MQTT endpoint types, cert rotation hooks."
sidebar_custom_props: { emoji: "🛡️" }
---

> 📘 **EXPLANATION** · **Audience:** Solution Builder · **Read time:** ~6 min · **Ties to:** Certificate Management sub-tag of the API Reference

:::tip[See in the API Reference]
Sub-tag: Certificate Management. Operations: [`get_installed_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-installed-certificate) · [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) · [`delete_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-certificate).
:::

IOTC's security model has four layers, applied independently. Each defends against a different class of attack; together they form the security posture for a deployment. This chapter explains those layers and how they combine; the certificate operations that implement them live in the linked how-to and reference pages.

### The four layers

| Layer | Threat | IOTC mechanism |
|---|---|---|
| **Transport** | Eavesdropping on the wire | TLS 1.2 / 1.3 (`protocol: MQTT_TLS`, port 8883) |
| **Server identity** | A man-in-the-middle posing as your broker | `verificationType` set to `VERIFY_HOST_PEER` |
| **Client identity** | An unauthorized reader connecting as yours | Client certificate ([`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) type `client`) |
| **Tenant boundary** | A neighboring tenant reading your topics | `tenantId` + broker-side ACLs |

You cannot achieve "secure" by picking one. A TLS-encrypted connection without `VERIFY_HOST_PEER` defends against passive eavesdropping but not against an active impostor. A signed client certificate without TLS leaks every payload in clear text. The four layers are an *AND*, not an *OR*.

```d2
direction: down
sec: "Secure connection = all four layers (AND, not OR)" {
  grid-rows: 4
  L1: "Transport — TLS 1.2 / 1.3 (MQTT_TLS, port 8883)"
  L2: "Server identity — verificationType: VERIFY_HOST_PEER"
  L3: "Client identity — client certificate"
  L4: "Tenant boundary — tenantId + broker ACLs"
}
```

### Five certificate types

[`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) takes a `type` field that selects the logical bucket the cert lives in:

| Type | Used for |
|---|---|
| `mqtt` | MQTT broker connections; both client cert/key and the broker's CA cert |
| `wifi` | Enterprise Wi-Fi (WPA2/WPA3 Enterprise with EAP-TLS) — CA, client cert, client key |
| `filestore` | The HTTP file server used by [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) and [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) (HTTP source) |
| `client` | Generic client-side certs |
| `server` | Generic server-side certs |

Certificates are stored on the device under logical names that you choose at install time (e.g., `mqtt_ca_cert`, `wifi_client_cert`, `filestore_ca_cert`). Other operations reference these names: `config_endpoint.securityParams.caCertificateFile`, the `value` of each entry in `set_wifi`'s `securityDetails.<type>.certificate[]`, and `set_os.OSUpdateDetails.caCertificateFile`.

### Certificate format and size

The reader accepts a narrow format envelope — PEM-encoded certificates, RSA keys in PKCS#1, and a 4 KB ceiling per file — and a mismatch is a common *asynchronous* install failure that surfaces on `alerts` rather than as an immediate error. The exact constraints and the `openssl` conversion for PKCS#8 keys are in the how-to: [Certificate format and size](/infrastructure/certificate-management#certificate-format-and-size).

### Two installation sources

`install_certificate.certSource` chooses how the certificate content arrives at the reader:

- **`HTTP`**, the reader downloads from a remote URL. Requires `filestore` certificates to be installed first if the source itself is HTTPS. This is the production pattern: certificate authorities push to an HTTPS endpoint; readers pull on demand.
- **`DIRECT`**, the certificate content is included inline in the MQTT payload (PEM string in `certificateBundle`). Simpler for first-light; less convenient at scale.

When `certSource` is omitted, the reader defaults to `HTTP`.

### Two install paths in practice

**Out-of-band, via 123RFID Desktop.** The Wi-Fi certificate chain for an Enterprise SSID can be loaded from the bootstrap UI in Phase 2. This fits when a reader has not yet joined any network.

**In-band, via [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate).** Once a reader is on the broker, MQTT certificate material for TLS and for the file store can be pushed via [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate). This is how MDM platforms (SOTI Connect, 42Gears SureMDM) provision certs at fleet scale.

### Rotation

Certificates expire, so the model assumes rotation from the start — and the **logical-name indirection** is what makes it safe. Because endpoints reference a certificate by name rather than by content, you can stage a replacement under a new name, repoint the endpoint, verify the reconnect, and only then delete the old one — with the untouched old name as a rollback path if the new certificate is bad. The step-by-step procedure (single reader, then fleet-scale waves) is in the how-to: [the logical-name rotation pattern](/infrastructure/certificate-rotation#the-logical-name-rotation-pattern).

### Installing, listing, and removing certificates

Installing a certificate (DIRECT or HTTP source), listing what is installed, and deleting by logical name are operational tasks rather than parts of the security model. The payloads for [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate), [`get_installed_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-installed-certificate), and [`delete_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-certificate), along with the logical-name conventions, are in [How to manage TLS/SSL certificates](/infrastructure/certificate-management).

### Confirmation via `alerts`

Certificate operations are asynchronous: [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) returns code `1` (accepted), and the terminal outcome arrives as an `alerts` event whose `alertDetails.downloadInfo` reports `fileType: FILE_TYPE_CERT` and a `status` of `DOWNLOAD SUCCESS` / `DOWNLOAD FAIL` / `SAVE SUCCESS` / `SAVE FAIL`. An MDM platform that drives certificate installs at scale should consume these events on the SOTI or MDM endpoint and treat them as the canonical install-outcome signal. See [When the reader needs to interrupt you](/observability/alerts).

### Out of scope

- **Broker-side ACLs**, that lives in your broker's documentation (Mosquitto, HiveMQ, AWS IoT Core, etc.).
- **Region and regulatory**: different surface; see [What your reader knows about itself](/infrastructure/device-state).
- **PKI design at organizational scale**, see the Ristić *Bulletproof TLS and PKI* reference and your security team.

**Related:** 📙 [How to manage TLS/SSL certificates](/infrastructure/certificate-management) · 📙 [How to rotate certificates at scale](/infrastructure/certificate-rotation) · 📙 [How to secure the MQTT connection with TLS](/infrastructure/tls-setup) · 📘 [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints) · 📘 [When the reader needs to interrupt you](/observability/alerts) · 📕 [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/)
