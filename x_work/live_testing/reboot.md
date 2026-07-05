# Command: reboot

> Live-verified command reference. A REAL warm-reset was performed this session on RFD40 serial 24190525100255, with explicit user confirmation beforehand (reboot is session-severing). Provenance labels: `[verified-on-device]`, `[verified-from-schema]`, `[verified-from-test-harness]`, `[inferred-from-live]`.

## 1. Intent & Objective

`reboot` performs a **warm reset** of the device. Per the command schema description, "Reboot command is used to perform warm reset of device. After successful reboot, device will reinitiate the connection to previously connected server. Upon failure notification will be sent." `[verified-from-schema: commands/dev_mgmt/reboot.json description]` This run confirmed exactly that behavior end-to-end: the device acknowledged the request, warm-reset, then **auto-reconnected to its previously-connected server (MDM_REMOTE) with no manual intervention** roughly ~44s after the command was sent `[verified-on-device: RFD40 serial 24190525100255]`.

`reboot` is a **state-changing, session-severing** command: while rebooting, the device drops its MQTT connections, so the MQTT control session is severed for the duration of the reset `[verified-on-device: RFD40 serial 24190525100255]`. Because of this it must be a deliberate, confirmed action — it was issued this session **only after explicit user confirmation**, sent **once**, and **never retried** `[verified-on-device: RFD40 serial 24190525100255]`.

## 2. Topic Mapping (observed on-wire)

The MQTT control session was attached over endpoint **MDM_REMOTE** (connect rc=0, unique clientId) against Mosquitto broker `192.168.1.6:1883`, device `192.168.1.5` `[verified-from-test-harness: deployment topology — laptop on Wi-Fi "Airtel_The_LAN_Before_Time", broker 192.168.1.6:1883, device 192.168.1.5, endpoint MDM_REMOTE]`.

| Direction | Topic (observed on-wire) | Wire form | Provenance |
|---|---|---|---|
| Publish (request) | `zebra/MDM/clients/cmnd/RFD40-24190525100255` | `{tenantId}/{baseTopic}/{serial}` | `[verified-from-test-harness: on-wire publish topic]` |
| Subscribe (response) | `zebra/MDM/clients/resp/RFD40-24190525100255` | `{tenantId}/{baseTopic}/{serial}` | `[verified-from-test-harness: on-wire response topic]` |

The reboot request was published to the `cmnd` topic; the acknowledgement was read from the `resp` topic on the same serial `[verified-from-test-harness: on-wire topics]`.

## 3. Request Payload Breakdown

| Field | Type | Required | Description | Provenance |
|---|---|---|---|---|
| `command` | string | yes | Command issued to reboot the reader. | `[verified-from-schema: commands/dev_mgmt/reboot.json properties.command; required]` |
| `requestId` | string | yes | A unique identifier for the request, allowing tracking and debugging of the operation. | `[verified-from-schema: commands/dev_mgmt/reboot.json properties.requestId; required]` |

The command schema declares `required = ["command","requestId"]` and no payload beyond these two fields `[verified-from-schema: commands/dev_mgmt/reboot.json required]`.

**Minor (hygiene):** the reboot **command** schema ships **no `examples` array** — it carries only per-property `example` values, not a top-level `examples` block `[verified-from-schema: commands/dev_mgmt/reboot.json — no examples array]`. (Note: this is scoped to the **command** schema only; the **response** schema does ship a top-level `examples` array — see §4.) Fix: add the canonical request example to the command schema. (See §7.)

**Minor (hygiene nit):** the command schema's `command` description is the literal string `"Command issued to reboot the reader "` (note the **trailing space**, no period); the table above normalizes it for readability `[verified-from-schema: commands/dev_mgmt/reboot.json properties.command.description]`. (See §7.)

### JSON Request Example (operator-provided, schema-validated, sent)

```json
{
  "command": "reboot",
  "requestId": "123abcd"
}
```

This is the exact, verbatim envelope sent this session — a minimal envelope with no payload beyond `command` + `requestId`, matching the command schema example exactly `[verified-on-device: RFD40 serial 24190525100255]`. **STATIC verdict: VALID** — both required fields (`command`, `requestId`) are present `[verified-from-schema: commands/dev_mgmt/reboot.json required = ["command","requestId"]]`. It was sent **ONCE and never retried** — a reboot must not be auto-resent `[verified-on-device: RFD40 serial 24190525100255]`.

## 4. Response Payload Breakdown

| Field | Type | Required | Description / constraint | Provenance |
|---|---|---|---|---|
| `command` | string | yes | The command that was executed to reboot the device. | `[verified-from-schema: response/dev_mgmt/reboot.json properties.command; required]` |
| `requestId` | string | yes | The unique identifier of the original request. | `[verified-from-schema: response/dev_mgmt/reboot.json properties.requestId; required]` |
| `apiVersion` | string (enum) | yes | Allowed values: `V1.0`, `V1.1`. | `[verified-from-schema: response/dev_mgmt/reboot.json properties.apiVersion.enum = [V1.0, V1.1]]` |
| `response` | object | yes | Standard response object; `$ref` → `refrence/response/response.yaml`. | `[verified-from-schema: response/dev_mgmt/reboot.json properties.response.$ref]` |
| `response.code` | integer | yes | Response code, range 0..30. | `[verified-from-schema: refrence/response/response.yaml properties.code, minimum 0 maximum 30; required]` |
| `response.description` | string | yes | Response description in detail. | `[verified-from-schema: refrence/response/response.yaml properties.description; required]` |

**Success-ack is code 1, not code 0.** The reboot success acknowledgement is `response.code` **`1` "Command payload is accepted"** — **NOT** code 0 `[verified-on-device: RFD40 serial 24190525100255]`. The ack is returned **BEFORE** the warm reset; there is **no later "reboot complete" response on the same request** — the device simply reconnects on its own after the reset `[verified-on-device: RFD40 serial 24190525100255]`. Callers must therefore treat code 1 as the reboot success-ack `[inferred-from-live: code 1 is the reboot success-ack]`.

The response schema is **well-formed**: it declares top-level `required = [command, requestId, apiVersion, response]` `[verified-from-schema: response/dev_mgmt/reboot.json required]`. **Spec defect R1:** the response schema **`title` is `"setWifiResponse"`** — a copy-paste bug; for the reboot response it should be a reboot response title `[verified-from-schema: response/dev_mgmt/reboot.json title]`. (See §7.)

**Response schema ships an examples block (with a non-canonical requestId).** Unlike the command schema, the **response** schema **does** carry a top-level `examples` array whose example matches the live ack (code 1 "Command payload is accepted") — but its example uses `requestId: "18996"`, inconsistent with the canonical `"123abcd"` used in the request example, the per-property `example`, and the live response below `[verified-from-schema: response/dev_mgmt/reboot.json examples]`. Recommend aligning the response-schema example's `requestId` to the canonical value. (See §7.)

### JSON Response Example (LIVE, verbatim)

```json
{
  "command": "reboot",
  "requestId": "123abcd",
  "apiVersion": "V1.1",
  "response": {
    "code": 1,
    "description": "Command payload is accepted"
  }
}
```

This is the exact live ack returned by the device at ~+2.0s, before it warm-reset `[verified-on-device: RFD40 serial 24190525100255]`. **Response verdict: VALID** against `response/dev_mgmt/reboot.json` — all four top-level required fields present; `apiVersion` "V1.1" is in the enum `[V1.0, V1.1]`; `response.code` 1 is within 0..30; `response.yaml` requires `[code, description]`, both present; and code 1 is documented in the `response.yaml` code table as "Command payload is accepted" `[verified-from-schema: response/dev_mgmt/reboot.json + refrence/response/response.yaml code table]`.

## 5. Live Reboot Cycle Verification

This is the definitive proof: a single `reboot` command drove the device through a clean warm-reset and **auto-reconnect to MDM_REMOTE with no manual intervention**. Elapsed times are from a monotonic counter started just before the cycle. Because the probes are discrete, downtime is stated as **observed bounds**, not a pinned instant `[verified-from-test-harness: probe timing]`.

| Phase | Elapsed | Observation | Provenance |
|---|---|---|---|
| **PRE-STATE** | ~+1.8s | Device attached. `activeEndpoints = [MDM_REMOTE, DATA1_EP]`; `savedEndpoints = [MDM_REMOTE, MGMT_EP, CTRL_EP, DATA1_EP]`. | `[verified-on-device: RFD40 serial 24190525100255]` |
| **ACK** | ~+2.0s | Device returned the status envelope **`response.code 1` "Command payload is accepted"** (NOT code 0), BEFORE rebooting. | `[verified-on-device: RFD40 serial 24190525100255]` |
| **DEVICE DOWN** | observed by ~+28.6s | Fresh attach-preflight (`get_version`) probe FAILED (two 6s timeouts) → device offline/rebooting; reboot took effect. | `[verified-from-test-harness: attach-preflight probe timed out]` · `[verified-on-device: device offline]` |
| **RECOVERY** | by ~+46.5s | First recovery probe (15s after the down observation) SUCCEEDED → device had re-attached on its own to previously-connected server MDM_REMOTE (~44s after the command), no manual intervention. | `[verified-from-test-harness: recovery probe succeeded]` · `[verified-on-device: re-attached to MDM_REMOTE]` |
| **POST-VERIFY** | ~+46.5s | `activeEndpoints = [MDM_REMOTE, DATA1_EP]` (both active endpoints restored/re-activated); `savedEndpoints = [MDM_REMOTE, MGMT_EP, CTRL_EP, DATA1_EP]` (all 4 saved configs intact); MDM control session auto-restored. | `[verified-on-device: RFD40 serial 24190525100255]` |

**Timing honesty:** the device was confirmed **OFFLINE by ~+29s** and had **re-attached by ~+46s** (~44s after the command); the precise off→on instant falls **between** the discrete probes, so downtime is an observed bound, not an exact figure `[verified-from-test-harness: discrete probe timing]` `[verified-on-device: device up/down state]`. Both **active endpoints persisted and auto-reactivated**, **saved endpoints persisted**, and the **MDM control session auto-restored** across the reset — exactly as the schema description promises `[verified-on-device: RFD40 serial 24190525100255]` `[verified-from-schema: commands/dev_mgmt/reboot.json description]`.

### Operational re-verification (second reboot — clears the operating mode)

A **second `reboot` was issued this session** — an **operational, user-requested reboot** whose purpose was to **clear the armed destructive access operations** (a WRITE `FFFFEEEE`→USER and a LOCK UNLOCK on EPC) left in the operating mode by the prior `set_operating_mode` `accessOperations` test `[verified-on-device: RFD40 serial 24190525100255]`. This subsection re-verifies the §5 cycle and adds two findings, detailed below: reboot **clears the operating mode to default**, and warm-reset **recovery time varies**. Elapsed times are from a monotonic counter started just before the cycle; because the probes are discrete, downtime is stated as **observed bounds**, not pinned instants `[verified-from-test-harness: discrete probe timing]`.

| Phase | Elapsed | Observation | Provenance |
|---|---|---|---|
| **PRE-STATE** | start | Device attached; `activeEndpoints = [MDM_REMOTE, CTRL_EP, DATA1_EP]`. | `[verified-on-device: RFD40 serial 24190525100255]` |
| **ACK** | ~+2.1s | Device returned **`response.code 1` "Command payload is accepted"**, `apiVersion` **V1.1** — consistent with the first reboot's ack. | `[verified-on-device: RFD40 serial 24190525100255]` |
| **DEVICE DOWN** | confirmed by ~+28.2s | Attach-preflight (`get_version`) probe timed out → device offline/rebooting; reboot took effect. | `[verified-from-test-harness: attach-preflight probe timed out]` · `[verified-on-device: device offline]` |
| **RECOVERY** | by ~+113.8s | Recovery probes at ~+58.2s (down) and ~+88.3s (down) before ~+113.8s (UP) → device re-attached on its own to previously-connected server MDM_REMOTE by ~+113.8s (~112s after the command was sent), no manual intervention. | `[verified-from-test-harness: recovery probe succeeded]` · `[verified-on-device: re-attached to MDM_REMOTE]` |
| **POST-VERIFY** | ~+113.8s | `activeEndpoints = [MDM_REMOTE, CTRL_EP, DATA1_EP]` — **all three active endpoints auto-reconnected**; MDM control session auto-restored. | `[verified-on-device: RFD40 serial 24190525100255]` |

**Timing honesty:** as in the first reboot's §5, the precise off→on instant is only known to fall **between** the last down probe (~+88.3s) and the first up probe (~+113.8s), so the recovery time is an observed bound, not an exact pinned instant `[verified-from-test-harness: discrete probe timing]` `[verified-on-device: device up/down state]`.

**Recovery time VARIES.** This reboot re-attached in **~110s** — **slower** than the first reboot's **~44s** — yet both auto-reconnected with no manual intervention. So warm-reset recovery time is not a fixed figure; it varies run-to-run `[verified-on-device: RFD40 serial 24190525100255]` `[verified-from-test-harness: discrete probe timing across two reboots this session]`.

**Reboot CLEARS the operating mode to default.** A `get_operating_mode` readback over CTRL after re-attach showed `profiles` **`BALANCED_PERFORMANCE`**, `accessOperations` **absent (NONE)**, and `radioStartConditions {trigger IMMEDIATE, startDelay 0, repeat false}` (`startDelay` reset from the prior **3000 → 0**) `[verified-on-device: RFD40 serial 24190525100255]`. The reboot therefore **removed the armed destructive WRITE (`FFFFEEEE`→USER) and LOCK (UNLOCK EPC) access ops** left by the prior `set_operating_mode` test — they were never executed, just cleared, and are now gone `[verified-on-device: RFD40 serial 24190525100255]`. This empirically **confirms the `set_operating_mode` schema claim** *"On reboot the set configurations will be lost and the device will go back to default operating mode"* `[verified-on-device: RFD40 serial 24190525100255]` `[verified-from-schema: commands/control/set_operating_mode.json description]`.

**Endpoint configs PERSIST; operating mode is VOLATILE.** Across this reset the three active endpoints (MDM_REMOTE, CTRL_EP, DATA1_EP) restored, while the operating mode reset to default — so **endpoint configuration is persistent but operating-mode configuration is lost on reboot** `[verified-on-device: RFD40 serial 24190525100255]`.

**Security:** the `get_operating_mode` readback exposed no credentials — the password-bearing `accessOperations` had been cleared by the reboot — so there is nothing to mask `[verified-on-device: RFD40 serial 24190525100255]`.

## 6. Associated Error Codes

| Code | Description | Notes | Provenance |
|---|---|---|---|
| `1` | Command payload is accepted | The reboot success-ack observed live this session; returned BEFORE the warm reset. | `[verified-on-device: RFD40 serial 24190525100255]` |
| `5` | Can't reboot device, inventory in progress | Reboot is refused while an RFID inventory is running. | `[verified-from-schema: refrence/response/response.yaml code table]` |
| `0` | Success | Documented in the code table. | `[verified-from-schema: refrence/response/response.yaml code table]` |
| `2` | Invalid payload | Documented in the code table. | `[verified-from-schema: refrence/response/response.yaml code table]` |

**Honesty note:** only **code 1** was observed live this session; codes 5, 0, and 2 are strictly schema-documented and carry no triggers beyond the code-table text `[verified-from-schema: refrence/response/response.yaml code table]`. **Contrast worth stating:** reboot's success-ack is **code 1 (accepted)**, whereas most commands return **code 0 (Success)** — callers tuned to expect code 0 will misjudge a successful reboot `[verified-on-device: RFD40 serial 24190525100255]` `[verified-from-schema: refrence/response/response.yaml code table]`.

## 7. Conformance & Spec Notes (this command)

- **R1 (defect) — response schema title is `"setWifiResponse"`.** This is the reboot response schema; the title is a copy-paste artifact and should reflect reboot. **Fix:** correct the title to a reboot response title `[verified-from-schema: response/dev_mgmt/reboot.json title]`.
- **POSITIVE (not a defect) — response schema declares its top-level `required` array.** UNLIKE sibling response schemas `get_endpoint_config` and `config_endpoint`, which omit a top-level `required` array, the reboot response schema **DOES** declare `required = [command, requestId, apiVersion, response]` `[verified-from-schema: response/dev_mgmt/reboot.json required; get_endpoint_config.json / config_endpoint.json have no top-level required]`. (Note: not every sibling omits it — e.g. `delete_certificate` also declares the full `required` array, so reboot is not uniquely well-formed on this point.)
- **Minor (hygiene) — command schema ships no `examples` array.** The reboot **command** schema carries no top-level `examples` block (only per-property `example` values). **Fix:** add the canonical request example `[verified-from-schema: commands/dev_mgmt/reboot.json — no examples array]`.
- **Minor (hygiene) — response schema example uses a non-canonical `requestId`.** The reboot **response** schema does ship a top-level `examples` array (matching the live ack, code 1 "Command payload is accepted"), but its example uses `requestId: "18996"` instead of the canonical `"123abcd"` used everywhere else. **Fix:** align the response-schema example's `requestId` to the canonical value `[verified-from-schema: response/dev_mgmt/reboot.json examples]`.
- **Minor (hygiene nit) — trailing space in command description.** The command schema's `command` description is `"Command issued to reboot the reader "` (trailing space, no period). **Fix:** trim the trailing space `[verified-from-schema: commands/dev_mgmt/reboot.json properties.command.description]`.
- **POSITIVE (behavior) — live reboot succeeded cleanly.** The warm reset completed and the device auto-reconnected to MDM_REMOTE with all active/saved endpoints restored and the control session auto-restored, with no manual intervention `[verified-on-device: RFD40 serial 24190525100255]`.

## 8. Safety note — session-severing reboot

`reboot` is **uniquely disruptive** — handle with care:

- **Session-severing.** The warm reset drops the MQTT control session for the duration of the reboot, and **recovery time VARIES** — the two reboots this session re-attached in **~44s** and **~110s** respectively, so the practical downtime bound is roughly **~30s to ~2 minutes** `[verified-on-device: RFD40 serial 24190525100255]` `[verified-from-test-harness: discrete probe timing across two reboots]`. Do not over-generalize the exact number; state it as the observed bound, and expect run-to-run variation.
- **Confirm before issuing.** Because it severs the session, reboot was run this session **only after explicit user confirmation**; treat it as a deliberate, confirmed action `[verified-on-device: RFD40 serial 24190525100255]`.
- **Auto-reconnect (verified).** The device auto-reconnects to the previously-connected server after the reset (MDM_REMOTE re-attached on its own within ~44s this run), so no manual reconnect was needed `[verified-on-device: RFD40 serial 24190525100255]`. On an **unstable deployment**, plan for the possibility of a manual / 123RFID reconnect if auto-reconnect fails `[inferred-from-live: contingency for unstable deployments]`.
- **Do NOT reboot during an active RFID inventory.** The device will refuse with **code 5 "Can't reboot device, inventory in progress"** `[verified-from-schema: refrence/response/response.yaml code table]`.
- **Send once — never auto-retry a reboot** `[verified-on-device: RFD40 serial 24190525100255]`.

**Security:** reboot carries **no credentials** in request or response; there is nothing to mask `[verified-on-device: RFD40 serial 24190525100255]` `[verified-from-schema: commands/dev_mgmt/reboot.json + response/dev_mgmt/reboot.json]`.