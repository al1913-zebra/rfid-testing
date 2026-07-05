---
id: certificate-rotation
title: How to rotate certificates at scale
sidebar_label: How to rotate certificates at scale
description: "Rotate IOTC TLS certificates across a fleet: pre-stage new CA, switch endpoints, expire old cert, recover when rotation leaves readers stranded."
sidebar_custom_props: { emoji: "🔁" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** ~30 min

This guide shows you how to rotate TLS certificates across a fleet of handheld readers without downtime.

### Why the cadence keeps shrinking

Plan for rotation to get *more* frequent, not less. Maximum public-certificate lifetimes are falling fast — roughly 200 days as of 2026, dropping to 100 days in 2027 and to 47 days in 2029. Manual renewal does not survive that cadence, so treat automation as a requirement rather than a nice-to-have. Two timing rules keep automated rotation safe:

- **Renew about a month before expiry.** The margin absorbs a failed issuance, a CA outage, or a CAA misconfiguration without taking readers offline.
- **Deploy roughly two weeks after issuance.** This dodges validation failures on readers whose clock is slightly off — which, given the reader has no real-time-clock backup, is a real risk after any reset.

### Monitor for expiration

Subscribe to the certificate-expiry `alerts` event. Configure the warning threshold via [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events), typically 30 days before expiration.

### The logical-name rotation pattern

Every endpoint references its certificate by **logical name**, not by content (see [the logical name pattern](/infrastructure/certificate-management#the-logical-name-pattern)). That indirection is what makes rotation safe on a single reader, and it is the primitive the fleet waves below build on:

1. **Install the new certificate under a *new* logical name** — e.g. `mqtt_ca_cert_2026`, not the existing `mqtt_ca_cert`. The old certificate stays in place.
2. **Repoint the endpoint** at the new name with [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) (update).
3. **Verify the reconnect** — watch `mqttConnEVT` confirm a clean TLS reconnection on the new certificate.
4. **Delete the old certificate** with [`delete_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-certificate) once no endpoint references it.

Because the old name is untouched until step 4, a bad certificate is fully recoverable — repoint the endpoint back to the old name. Replacing a certificate *in place* (same logical name) removes that escape route, so always rotate to a new name.

### Stage the new certificate to a canary cohort

Select 1–5% of the fleet. Issue [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) for each canary reader with the new certificate under a **new alias** (e.g., `client-cert-2026`). Do not delete the old certificate.

### Cut over the canary

Update the canary readers' [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) to reference the new certificate alias. Watch `mqttConnEVT` confirm secure reconnection.

### Widen the rollout in waves

| Wave | % of fleet | Wait before next wave | Pass criteria |
|---|---:|---|---|
| 1 | 1% (canary) | 24 hours | Zero cert-related TLS failures |
| 2 | 10% | 24 hours | Same |
| 3 | 50% | 12 hours | Same |
| 4 | 100% | — | Same |

```d2
title: "Certificate rotation rollout" { near: top-center; shape: text; style.font-size: 18; style.bold: true }
direction: down
W1: "Wave 1 - canary 1%\nInstall + monitor 24 h" { shape: step }
W2: "Wave 2 - 10%\nInstall + monitor 24 h" { shape: step }
W3: "Wave 3 - 50%\nInstall + monitor 12 h" { shape: step }
W4: "Wave 4 - 100%\nInstall (final wave)" { shape: step }
W1 -> W2: "t=0 → +24h"
W2 -> W3: +48 h
W3 -> W4: +60 h

```

### Handle install failures

If [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) returns an error, the reader retains its existing certificate and remains operational. Log the failure, fix the cause, and retry. Do not delete the old certificate until the new one is verified working.

### Verify and clean up

Once 100% of the fleet is on the new alias, issue [`delete_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-certificate) for the old alias.

### Rotate the key, not just the certificate

Rotation is the moment to retire the private key, not only the certificate. Generate a fresh key for each new alias; re-issuing against the same key leaves the old key usable by anyone who captured it — and on systems without forward secrecy, a leaked key can decrypt previously recorded sessions. A new key per rotation closes that window.

### Looking ahead: short-lived certs and CT monitoring

- **Short-lived certificates** (valid for up to ~7 days) drop revocation machinery entirely and shrink the window a stolen key can be abused. They pair naturally with issuance automation, but validate the operational impact on a constrained device fleet before adopting them broadly.
- **Certificate Transparency monitoring** — if your broker uses publicly issued certificates, monitor CT logs for your domains. It is a low-cost way to catch unexpected or misissued certificates that should never have been minted for your infrastructure.

**Related:** 📙 [Certificate Management](/infrastructure/certificate-management) · 📙 [Automation](/fleet/provisioning/automation) · 📕 [alerts](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#tag-alerts) · 📙 [Phased Rollout Pattern](/fleet/migration/execute)
