---
id: plan
title: How to plan an IOTC migration
sidebar_label: How to plan a migration
description: "Plan an IOTC migration: inventory readers, choose target firmware and config, define cohorts and rollout rings, and set verification gates and rollback."
sidebar_custom_props: { emoji: "🗺️" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator, Solution Builder · **Time:** ~2 hours planning

A handheld-reader migration is firmware-version-based. The IOTC V1.0 and V1.1 API surfaces are both accepted on firmware 3.10.27+; "migration" therefore means rolling firmware forward and confirming the deployment continues to function.

### Pre-migration baseline

For each reader in scope, issue the per-domain read commands ([`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config), [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi), [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode)) and store the responses as the baseline. This captures the full state including endpoints, Wi-Fi profiles, certificates (by reference), and the active operating-mode configuration. The baseline is both your diff target during [verification](/fleet/migration/verify) and your recovery source if a reader must be re-bootstrapped.

### Risk register

- **Firmware revert is not supported** on handheld readers — plan migration as a one-way operation. There is no "downgrade" command.
- **The firmware URL must be reachable** from each reader's own network segment, not just from your workstation. A reader behind an isolated AP or a blocked egress port will fail the download with no firmware change.
- **Battery and flash gates.** [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) rejects readers with low battery (code `14`) or insufficient flash (code `8`). Charge and clear space on the canary cohort first.
- **A canary cohort (1–5%) must validate** the new firmware before fleet-wide rollout. Most regressions surface within one shift of soak, not immediately on reconnect.

### Rollback approach

Since the image cannot be reverted, plan rollback as **re-bootstrap from baseline**, not downgrade:

1. Stop promoting waves the moment a [rollback trigger](/fleet/migration/execute#3-know-your-rollback-triggers) fires.
2. For any reader stuck in a bad state, re-provision its initial MDM endpoint with 123RFID Desktop (the bootstrap path), then re-apply the captured baseline configuration over MQTT.
3. Re-apply operating mode explicitly — it does not persist across the reboot the update forces.

Document this playbook before you start; mid-incident is the wrong time to discover the baseline was never captured.

### Go/no-go checklist

- [ ] Baseline per-domain reads ([`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config), `get_wifi`, `get_operating_mode`) captured for every reader
- [ ] Canary cohort identified (1–5%)
- [ ] Firmware URL reachable from each reader's network, on the egress port the reader uses
- [ ] Sufficient battery (else code `14`) and flash (else code `8`) on canary devices
- [ ] Rollback playbook (re-bootstrap via 123RFID Desktop + baseline re-apply) documented
- [ ] Verification gate and exit criteria agreed — see [Verify a successful migration](/fleet/migration/verify)

**Related:** 📙 [Execute a phased migration](/fleet/migration/execute) · 📙 [Verify a successful migration](/fleet/migration/verify) · 📘 [Keeping a fleet in sync](/fleet/bulk-management) · 📕 [System operations (MGMT)](/reference/mgmt/set-os)
