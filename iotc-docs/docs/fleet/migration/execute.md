---
id: execute
title: How to execute a phased migration
sidebar_label: How to execute a phased migration
description: "Execute a phased IOTC migration: ring-deploy by cohort, smoke tests at each ring, rollback triggers, and how to handle stragglers without rolling back."
sidebar_custom_props: { emoji: "🚀" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** days to weeks for a full fleet

Roll new firmware forward in expanding waves, proving each wave before the next. Because firmware revert is not supported on handheld readers, the strategy is to keep each wave small enough that a failure is contained and recoverable. This guide assumes you have already captured a baseline and chosen cohorts — see [Plan the migration](/fleet/migration/plan).

### 1. Push firmware to a wave

Issue [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) to each reader in the current wave. The reader downloads the image over HTTP(S), applies it, and reboots.

```json
{
  "command": "set_os",
  "requestId": "fw-1",
  "OSUpdateDetails": {
    "url": "https://updates.example.com/iotc-v1.1.fw",
    "authenticationType": "NONE",
    "verificationType": "VERIFY_HOST_PEER"
  }
}
```

`set_os` is asynchronous: the immediate response is code `1` (accepted), and the terminal outcome arrives later as the `alerts` event (`id: FIRMWARE_UPDATE`). Watch for the reader to come back via `mqttConnEVT: CONNECTED` and resumed `heartbeatEVT`.

**Error codes to watch:** `4` (update already in progress), `8` (insufficient flash), `13` (update failed), `14` (battery too low — charge and retry).

### 2. Advance the waves

| Wave | % of fleet | Soak | Pass criteria |
|---|---:|---|---|
| 1 | 1–5% canary | 24h | Reconnects; firmware matches target; baseline match per [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config); alert rate within baseline |
| 2 | 10% | 24h | Same |
| 3 | 50% | 12h | Same |
| 4 | 100% | — | Same |

Hold each wave for its full soak period before promoting the next. The soak is what turns a silent regression into a caught one — most firmware-induced failures (a Wi-Fi reconnect loop, an elevated alert rate) appear within a shift, not immediately.

### 3. Know your rollback triggers

Halt the rollout — do **not** promote the next wave — if the current wave shows any of:

- readers that do not reconnect (`mqttConnEVT: CONNECTED`) within the expected window,
- a firmware-correlated rise in `alerts`,
- configuration drift in `get_endpoint_config` versus the captured baseline.

Because the image cannot be reverted, "rollback" here means **stop the bleed and re-bootstrap**: stop promoting waves, then for any reader left in a bad state, re-provision its initial MDM endpoint with 123RFID Desktop and re-apply the captured baseline configuration. This is why a baseline capture is a hard prerequisite. See [Verify a successful migration](/fleet/migration/verify) for the full pass/fail gate.

### 4. Handle stragglers without rolling back

A few readers will be offline (powered down, out of Wi-Fi range) when their wave runs. Do not roll back the fleet for stragglers:

- Re-issue [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) to stragglers on their next `mqttConnEVT: CONNECTED`, or let your MDM retry on a schedule.
- Track them as a residual cohort and close them out separately, rather than blocking the wave plan.

**Related:** 📙 [Plan the migration](/fleet/migration/plan) · 📙 [Verify a successful migration](/fleet/migration/verify) · 📘 [Keeping a fleet in sync](/fleet/bulk-management) · 📕 [System operations (MGMT)](/reference/mgmt/set-os)
