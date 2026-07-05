---
id: verify
title: How to verify a successful migration
sidebar_label: How to verify a successful migration
description: "Verify a successful IOTC migration: per-cohort smoke tests (get_version, get_endpoint_config), fleet drift check, and the exit criteria that define done."
sidebar_custom_props: { emoji: "✅" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** ~30 min per wave

Verification answers one question per wave: *did the readers come back in the same state we left them, on the firmware we intended?* Run these checks before promoting the next wave in [Execute a phased migration](/fleet/migration/execute).

### Checks

1. **Confirm firmware.** Run [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version) on every reader in the wave and confirm `readerVersion.firmwareVersion` (and `detailedVersions.iotcVersion`) match the target. A reader still on the old version did not take the update — treat it as a straggler, not a pass.
2. **Diff configuration against baseline.** Run [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) (and the other per-domain reads you captured) and diff against the pre-migration baseline. Management configuration — endpoints, Wi-Fi, certificates — survives the reboot, so it should match exactly. If `get_endpoint_config` returns code `3` (cannot retrieve), it is usually transient: retry after a short delay before flagging the reader.
3. **Re-apply non-persistent state.** Operating mode does **not** survive a reboot. If a specific mode matters, re-apply [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) after the reader reconnects, then confirm with [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode).
4. **Watch alert rates.** Observe `alerts` over a representative shift and confirm no firmware-correlated elevation.

### Exit criteria (and why each one)

Declare the wave complete only when all hold:

- **100% of the wave on target firmware** — a partial wave hides a failure mode that the next, larger wave will multiply.
- **Configuration drift nominal** — drift after a reboot means something the update should have preserved was lost; that is a defect to investigate before scaling out.
- **Alert rates within baseline** — a quiet reconnect that then alerts repeatedly is a regression that only a shift-length soak reveals.

If any criterion fails, stop the rollout and follow the rollback triggers in [Execute a phased migration](/fleet/migration/execute#3-know-your-rollback-triggers).

**Related:** 📙 [Plan the migration](/fleet/migration/plan) · 📙 [Execute a phased migration](/fleet/migration/execute) · 📘 [Keeping a fleet in sync](/fleet/bulk-management) · 📕 [Command response error codes](/reference/errors/codes)
