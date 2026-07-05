# Command: set_os

> **Test, validation & divergence report.** Live firmware-validated against RFD40 serial `RFD40-24190525100255`, endpoint `MDM_REMOTE`, tenant `zebra`. The end-to-end OTA flow (request → `FIRMWARE_UPDATE` start event → in-progress lock → completion ack → `get_version` verification) was exercised on-device 2026-06-18. Provenance tags: `[verified-on-device]`, `[verified-from-schema]`, `[inferred-from-live]`, `[firmware-only-unknown]`.

## 1. Intent & Objective

`set_os` is a **device-management (dev_mgmt / MDM-plane)** command that initiates an **over-the-air firmware update**: it points the reader at a firmware `.DAT` image hosted at a URL and triggers the download-and-flash cycle. The schema describes it as "Command issued to set new firmware & initiate firmware update" [verified-from-schema: `commands/dev_mgmt/set_os.json` description]. `set_os` is a member of the dev_mgmt command enum [verified-from-schema: `models/iot_commands.v1.1.json` command enum includes `set_os`].

It is **state-changing and session-severing**: applying firmware reboots/reflashes the reader, during which the device **rejects every other command with `code 4`** and is briefly off the network. The command is **asynchronous**: the device emits a `FIRMWARE_UPDATE` start event, and the `set_os` reply on the response topic is `code 1` ("Command payload is accepted") delivered **after** the install completes — and it is **identical whether the update succeeded or failed**. The only way to confirm the firmware actually changed is an out-of-band `get_version` read-back comparing `readerVersion.firmwareVersion` (see §5 and `get_version.md`). [verified-on-device]

## 2. Topic Mapping

| Direction | On-wire topic (verified) | Carries |
|---|---|---|
| Publish (Request) | `zebra/MDM/clients/cmnd/RFD40-24190525100255` | the `set_os` envelope |
| Subscribe (Response) | `zebra/MDM/clients/resp/RFD40-24190525100255` | the `code 1` completion ack **and** the `code 4` lock returned to *other* commands during the install |
| Subscribe (Event/Alerts) | `zebra/MDM/clients/event/RFD40-24190525100255` | the `FIRMWARE_UPDATE` start NOTIFICATION |

Topics follow the verified `{tenantId}/{EP_TYPE}/clients/{cmnd\|resp\|event}/{serial}` wrapping [verified-on-device]. `set_os` declares no per-operation QoS/retain; those come from the endpoint's `mqttParams`.

## 3. Request Payload Breakdown

Envelope: `command` (string), `requestId` (string), `OSUpdateDetails` (object, `$ref refrence/payload/osUpdatePayload.yaml`). Top-level `required` is `[command, requestId]` only — `OSUpdateDetails` is **not** in `required` despite being needed for any real update (see SO-06). `OSUpdateDetails` fields:

| Field | Type | Required | Enum / Constraint | Notes |
|---|---|---|---|---|
| `url` | string (`format: uri`) | **Required** | — | Firmware `.DAT` download URL. Live: `https://www.zebra.com/.../SAAFKS00-013-R02E0.DAT`. |
| `authenticationType` | string | **Required** | `NONE / CERTIFICATE` | Auth **to the firmware source**. Live used `NONE`. Example value `CERTIFICATE` is in-enum (correct — contrast `install_certificate`, see §7 note). |
| `verificationType` | string | optional | `NONE / VERIFY_PEER / VERIFY_HOST / VERIFY_HOST_PEER` | TLS peer/host verification. No `default`; live omitted it. |
| `caCertificateFileContent` | string | optional | — | Inline CA PEM, for `CERTIFICATE` auth only (prose-only rule — SO-05). |
| `caCertificateFile` | string | optional | — | Path to an installed CA cert, for `CERTIFICATE` auth only (prose-only rule — SO-05). |

**Live request (firmware-validated, schema-VALID — P1):**
```json
{
  "command": "set_os",
  "requestId": "abc123",
  "OSUpdateDetails": {
    "url": "https://www.zebra.com/content/dam/support-dam/en/firmware/unrestricted/0001/SAAFKS00-013-R02E0.DAT",
    "authenticationType": "NONE"
  }
}
```
Required `[command, requestId]` and `OSUpdateDetails.[url, authenticationType]` are all present; `authenticationType: NONE` is in-enum; `url` is a valid URI; optional fields correctly omitted. **Static verdict: VALID** [verified-from-schema: `commands/dev_mgmt/set_os.json`, `refrence/payload/osUpdatePayload.yaml`]. Note: `https://` + `authenticationType: NONE` with no `verificationType` means an **unauthenticated TLS transport** (server cert not verified) — accepted, but harden with `verificationType` for production (SO-19).

## 4. Response Payload Breakdown

The completion reply is an **accept acknowledgement**, not a terminal success:

```json
{ "command": "set_os", "requestId": "abc123", "apiVersion": "V1.1",
  "response": { "code": 1, "description": "Command payload is accepted" } }
```

| Field | Value | Schema | Verdict |
|---|---|---|---|
| `command` / `requestId` | echoed | string | ✓ |
| `apiVersion` | `V1.1` | enum `[V1.0, V1.1]` | ✓ **in-enum** (contrast `get_version` → `V1.21` out-of-enum — SO-09) |
| `response.code` | `1` | integer 0–30 | in range; = *accept*, not `0`/Success (SO-20) |
| `response.description` | "Command payload is accepted" | — | async/terminal-agnostic ack |

- Top-level `required` = `[command, requestId, apiVersion]`; the `response` status block is **not** required [verified-from-schema: `response/dev_mgmt/set_os.json` lines 41-45]. Live always includes it.
- `code 1` is returned **at completion, for both success and failure** — there is **no terminal success (`0`) / failure (`13`) code** in the observed flow. Confirm the outcome via `get_version` (SO-07/SO-20). [verified-on-device]

## 5. Live Firmware-Update Lifecycle (the async model)

The firmware update is a four-phase, accept-then-poll cycle. All four phases are `[verified-on-device]`:

**(a) Start event** — on the **event** topic, immediately after accept:
```json
{"type":"NOTIFICATION","timestamp":"2026-06-18T11:30:50.387Z","state":"ONESHOT","id":"FIRMWARE_UPDATE","priority":"HIGH",
 "alertDetails":{"fwUpdateStatus":{"updateStatus":"Starting FW update"}}}
```
Envelope chain `events/alerts.json → refrence/response/alertDetails.yaml (fwUpdateStatus) → refrence/events/fwUpdateEvents.yaml`. `id: FIRMWARE_UPDATE` **is** a valid alert id (P3) and `type: NOTIFICATION`/`state: ONESHOT`/`priority: HIGH` are all in-enum — but the body **violates `fwUpdateEvents.yaml`**: `updateStatus: "Starting FW update"` is out-of-enum (SO-02) and the schema-required `overallProgress`/`stage` are absent (SO-01). Timestamp is full ISO-8601 vs the schema's `format: time` (SO-10); the schema's own `FIRMWARE_UPDATE` example uses `state: SET`/`priority: CRITICAL` (SO-11).

**(b) In-progress device lock** — while the update runs, **every other command** is rejected on the **response** topic with `code 4`:
```json
{"command":"get_endpoint_config","requestId":"abc123","apiVersion":"V1.1","response":{"code":4,"description":"Firmware update in progress"}}
```
The reply echoes the *blocked* command's name. This device-wide lock is a real live behavior not documented in any schema or sibling doc (SO-08). Do **not** retry-storm during this window. [verified-on-device]

**(c) Completion ack** — after the install (and reboot) finishes, `set_os` finally replies on the **response** topic with `code 1` (see §4). **This ack is identical for success and failure** — it confirms only that the payload was accepted, not that the firmware updated.

**(d) Verification via `get_version`** — the **only** way to confirm the outcome. Run `get_version` and compare `readerVersion.firmwareVersion` against the target build:
- Before: `PAAFKS00-013-R02` [verified-on-device: `get_version.md`].
- Target `.DAT`: `SAAFKS00-013-R02E0.DAT` → expected post-update `firmwareVersion` `SAAFKS00-013-R02`.
- The `-013-R02` portion matches; the **`PAA` → `SAA` prefix change** is the build-variant signal. `firmwareVersion` is a free-form string with no pattern/enum, so the operator must compare the **full string** (SO-15). A failed update leaves the prior version in place. [verified-on-device + inferred-from-live]

## 6. Associated Error / Result Codes

From `refrence/response/response.yaml` (`code` integer, min 0 max 30):

| Code | Meaning | Applies to set_os | Provenance |
|---|---|---|---|
| 0 | Success | terminal success — **not observed** (device acks with `code 1`) | [verified-from-schema; not observed] |
| 1 | Command payload is accepted | **Observed** — the completion ack (success or failure) | [verified-on-device] |
| 4 | Firmware update in progress | **Observed** — returned to *other* commands during the install (device-wide lock) | [verified-on-device] |
| 8 | Insufficient flash size | precondition failure (not enough space) | [verified-from-schema; not observed] |
| 9 | File not found | bad/unreachable `url` | [verified-from-schema; not observed] |
| 13 | Firmware update Failed | terminal failure — surfaced via the `FIRMWARE_UPDATE` event, **not** the `set_os` ack | [verified-from-schema; not observed] |
| 14 | Battery is low, Cannot update firmware | precondition failure (low battery) | [verified-from-schema; not observed] |
| 23 | Invalid enum value | malformed `authenticationType`/`verificationType` | [verified-from-schema; not observed] |

## 7. Divergences, Inconsistencies & Fixes

**21** divergences (live-vs-schema, schema-internal, and cross-doc). Severity: **2 CRITICAL, 11 MAJOR, 5 MINOR, 3 SUGGESTION**. Tokens are wrapped in backticks for table safety.

| ID | Scope | Severity | Category | Divergence / Issue | Expected (schema) | Actual (live / schema) | Fix |
|---|---|---|---|---|---|---|---|
| SO-01 | Event Payload | CRITICAL | Missing Property | START event omits schema-`required` fields | `fwUpdateEvents.yaml:25-28` requires `[updateStatus, overallProgress, stage]` | Live start event carries **only** `fwUpdateStatus.updateStatus`; `overallProgress` and `stage` absent → fails strict validation | Make `overallProgress`/`stage` optional, or document they are absent on the start (`NOTIFICATION`) phase and present only mid-update |
| SO-02 | Event Payload | CRITICAL | Enum/Schema Error | `updateStatus` value out-of-enum | `fwUpdateEvents.yaml:9-14` enum `[started, updating, successfull, failed, skipped]` | Live `updateStatus: "Starting FW update"` — not an enum member | Add the start-phase literal to the enum (or relax to a documented string set) and cover the start phase |
| SO-03 | Event Payload | MAJOR | Enum/Example Divergence | `updateStatus` enum member misspelled | `fwUpdateEvents.yaml:12` `successfull` | `successfull` should be `successful` | Rename `successfull` → `successful` (coordinate with the firmware-emitted string) |
| SO-04 | Event Payload | MAJOR | Enum/Example Divergence | `fwUpdateEvents.yaml` example violates its own enum | `fwUpdateEvents.yaml:15` `example: in progress` | `"in progress"` is not in the enum `[started, updating, …]` | Change the example to a valid member, e.g. `updating` |
| SO-05 | Request Payload | MAJOR | Documentation Divergence | `caCertificateFile`/`caCertificateFileContent` applicability is prose-only | `osUpdatePayload.yaml:35-46` — descriptions say "required for certificate-based auth" but neither is in `required` and there is no `if/then/oneOf` | `CERTIFICATE` + no CA field validates; `NONE` + a CA field validates; "exactly one of File/FileContent" unenforced | Add `if authenticationType==CERTIFICATE then require one of caCertificateFile/caCertificateFileContent`, or document firmware-side-only enforcement |
| SO-06 | Schema Structure | MAJOR | Missing Property | `OSUpdateDetails` de-facto required but not in `required` | `set_os.json:53-56` `required: [command, requestId]` | All examples and every real update include `OSUpdateDetails`; a payload without it validates yet cannot update | Add `OSUpdateDetails` to `required`, or document the unenforced-content gap |
| SO-07 | Response / Behavior | MAJOR | Behavioral Divergence | `code 1` ack is non-terminal; no success/failure result is delivered on the resp topic | `response.yaml` defines `0 Success` and `13 Firmware update Failed`; schema is silent on the async model | Live `code 1` returned at completion for **both** success and failure; `0`/`13` never seen on the resp topic; outcome confirmable only via `get_version` | Document that `code 1` = accepted-not-updated, that there is no terminal result on the resp topic, and that completion MUST be verified via `get_version` |
| SO-08 | Behavioral (live) | MAJOR | Behavioral Divergence | Device-wide `code 4` lock during install is undocumented | `response.yaml:19` defines `4 Firmware update in progress` (schema-only, no binding) | Live: during the install, `get_endpoint_config` returned `code 4`; the lock applies to all commands and is not documented | Document `code 4` as the live lock returned to other commands during a `set_os` install; warn against retry-storming |
| SO-09 | Response Payload | MAJOR | Behavioral Divergence | `apiVersion` is per-handler, not device-wide | `response/dev_mgmt/set_os.json:31-34` enum `[V1.0, V1.1]` | Same device/session: `set_os` → `V1.1` (in-enum) but `get_version` → `V1.21` (out-of-enum). The family disagrees | Make `apiVersion` consistent across handlers in firmware; do not widen the `set_os` enum on this account (mirrors `install_certificate` IC-08) |
| SO-10 | Event Payload | MAJOR | Enum/Example Divergence | `timestamp` declared `format: time` vs live ISO-8601 | `events/alerts.json:103-107` `format: time`, example `22:54:25` | Live `timestamp: 2026-06-18T11:30:50.387Z` (full date-time); the file's own examples also use date-time | Change `format` to `date-time` and the example to an ISO-8601 instant |
| SO-11 | Event Payload | MAJOR | Enum/Example Divergence | `alerts.json` `FIRMWARE_UPDATE` example state/priority diverge from live | `alerts.json` example `state: SET`, `priority: CRITICAL` | Live start event is `state: ONESHOT`, `priority: HIGH` (both valid enum members) | Align the `FIRMWARE_UPDATE` example to the live `ONESHOT`/`HIGH`, or document both shapes |
| SO-12 | Request Payload | MAJOR | Documentation Divergence | `requestId` "16 hex digit" claim is false/unenforced | `models/iot_commands.v1.1.json` describes `requestId` as "16 hex digit identifier"; no `pattern`/length | Live `requestId: "abc123"` (6 chars) and every example contradict it; `set_os.json` uses a generic description | Reconcile: add `pattern: ^[0-9a-fA-F]{16}$` and fix examples, **or** drop the "16 hex digit" claim from `models` |
| SO-13 | Schema Structure | MAJOR | Missing Property | No `additionalProperties: false` on the request body or `OSUpdateDetails` | `set_os.json:38-56` and `osUpdatePayload.yaml:7-46` declare none | Typos (`URL`, `authentication_type`) validate silently while the firmware rejects/ignores them, masking integration bugs | Add `additionalProperties: false` to the request object and to `OSUpdateDetails` |
| SO-14 | Request Payload | MINOR | Property Divergence | `command` not pinned by `const`/`enum` | `set_os.json:39-43` (type string, example only) | `command: "reboot"` validates against `set_os.json`; the canonical enum lives only in `models/iot_commands.v1.1.json` | Add `const: "set_os"` (or `enum: ["set_os"]`) to the per-command schema |
| SO-15 | Response (get_version) | MINOR | Documentation Divergence | `PAA`→`SAA` firmware-prefix change is unvalidated | `readerVersionResponse.yaml` `firmwareVersion` is free-form (no pattern/enum) | Device before `PAAFKS00-013-R02`; target `SAAFKS00-013-R02`. `-013-R02` matches; the `PAA`/`SAA` prefix differs and nothing validates it | Document that the operator compares the **full** `firmwareVersion` string via `get_version`, and that `PAA`→`SAA` is the expected post-update prefix |
| SO-16 | Event Payload | MINOR | Documentation Divergence | Terminal-state taxonomy split across schemas | `fwUpdateEvents.yaml:9-14` vs `events/alert_short.json` FW ids | Two FW terminal-state vocabularies (enum states vs `FIRMWARE_UPDATE_SUCCESS/FAIL` ids) are not cross-referenced | Cross-reference the long-form `fwUpdateStatus` enum and the short-form SOTI ids |
| SO-17 | Request Payload | MINOR | Documentation Divergence | `osUpdatePayload.yaml` ships zero examples | `osUpdatePayload.yaml:6` `examples: []` | Consumers reading the `$ref`'d model see no example (the 3 examples live only in `set_os.json`) | Populate `osUpdatePayload.yaml` examples, or accept reliance on `set_os.json` |
| SO-18 | Response Payload | MINOR | Documentation Divergence | Response-schema example `requestId` is non-canonical | `response/dev_mgmt/set_os.json` example `requestId: "18996"` | Diverges from the `abc123` used in the command schema/examples | Normalize the response example `requestId` to `abc123` |
| SO-19 | Request Payload | SUGGESTION | Documentation Divergence | `https://` + `authenticationType: NONE` is unauthenticated transport | `osUpdatePayload.yaml` — `authenticationType` (auth to source) and `verificationType` (TLS checks) are independent; `verificationType` optional with no default | Live: `https` `.DAT` + `NONE` + no `verificationType` → TLS server cert not verified | Document that `NONE` over `https` is accepted but unauthenticated; recommend a `verificationType` for hardened deployments |
| SO-20 | Response Payload | SUGGESTION | Behavioral Divergence | `code 1` "accepted" ≠ "updated" | `response.yaml:14` `1 = Command payload is accepted`; `0 = Success` | Live ack is `code 1`, never `0`; callers gating on `code 0` to mean "updated" misjudge success | Add a note that `code 1` is acceptance only; confirm the install via `get_version` (cross-ref `get_version.md`) |
| SO-21 | Request Payload | SUGGESTION | Documentation Divergence | `caCertificateFileContent` PEM example double-escaped | `osUpdatePayload.yaml:37` uses `\\r\\n` | `set_os.json:34` uses single-escaped `\r\n`; the literal double-backslash renders a misleading value | Normalize the PEM example escaping to match `set_os.json` |

### Positives (confirmed correct — explicitly verified)

- **P1 — Live request is schema-VALID** (required satisfied, `NONE` in-enum, `url` a valid URI, optional fields omitted). [verified-from-schema]
- **P2 — Live response is schema-VALID** — `apiVersion: V1.1` in-enum; `required: [command, requestId, apiVersion]` and the `response` block correctly not required; nested `response` satisfies `[code, description]`. [verified-from-schema + verified-on-device]
- **P3 — `FIRMWARE_UPDATE` is a valid alert `id`** (unlike `FILE_DOWNLOAD`, which is absent from the enum); `type: NOTIFICATION`, `state: ONESHOT`, `priority: HIGH` are all in-enum (only the schema *example* diverges — SO-11). [verified-from-schema]
- **P4 — all flow codes exist within `min 0 / max 30`**: `1`, `4`, `8`, `9`, `13`, `14`. [verified-from-schema]
- **P5 — `set_os` is in the `iot_commands` command enum.** [verified-from-schema]

> **Cross-reference note (sibling-file defect, not a set_os defect).** `set_os`/`osUpdatePayload.yaml` gets its `authenticationType` example **right** (`CERTIFICATE`, in-enum). The analogous `install_certificate` schema does **not**: `refrence/payload/installCertPayload.yaml` sets `example: BASIC`, which is out of its own `[NONE, CERTIFICATE]` enum (tracked under `install_certificate.md` IC-10 / register GAP-H). Noted here only as the contrast that confirms the `set_os` example is correct.

## 8. Safety / Operational Notes

- **Session-severing firmware apply.** `set_os` downloads and flashes firmware, which reboots the reader and drops it off the network for the duration. Plan for the device to be unreachable and to re-attach its MQTT session afterward.
- **Device-wide lock (`code 4`).** During the install, **every** other command returns `code 4` "Firmware update in progress" (verified for `get_endpoint_config`). Do not retry-storm; pause orchestration until the device returns and `get_version` succeeds.
- **`code 1` is acceptance, not success.** The `set_os` ack is `code 1` for **both** success and failure. Never treat it as "updated." **Confirm via `get_version`** — compare the full `readerVersion.firmwareVersion` string (e.g. `PAAFKS00-013-R02` → `SAAFKS00-013-R02`); a failed update leaves the prior version. Terminal failure surfaces via the `FIRMWARE_UPDATE` event and `code 13`, not the `set_os` ack.
- **Preconditions.** Ensure adequate battery and flash before issuing: low battery → `code 14`, insufficient flash → `code 8`, bad/unreachable URL → `code 9`.
- **Transport security.** `authenticationType: NONE` over `https://` is accepted but does **not** verify the server certificate; for production use `authenticationType: CERTIFICATE` and/or a `verificationType` (`VERIFY_PEER`/`VERIFY_HOST`/`VERIFY_HOST_PEER`) with a CA cert.

---
*Divergence basis: `commands/dev_mgmt/set_os.json`, `refrence/payload/osUpdatePayload.yaml`, `response/dev_mgmt/set_os.json`, `refrence/events/fwUpdateEvents.yaml`, `events/alerts.json`, `refrence/response/alertDetails.yaml`, `refrence/response/response.yaml`, `models/iot_commands.v1.1.json`, `refrence/response/readerVersionResponse.yaml`. Completion check: `get_version.md`. Live firmware-validated flow on RFD40-24190525100255, 2026-06-18.*
