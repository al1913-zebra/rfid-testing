---
id: handle-errors
title: How to handle errors in application code
sidebar_label: How to handle errors in application code
description: "Handle IOTC MQTT command-error responses: read response.code, look up the class, then retry transient codes with backoff, fix permanent ones, and wait on async code 1 — with real payloads and per-command idempotency rules."
sidebar_custom_props: { emoji: "🩹" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~20 min

This guide shows how to turn a command-response `response.code` into a concrete action in your client. The reader never signals failure at the MQTT protocol layer (no `PUBACK`-level error, no Last Will for command failures); every outcome — success, async-accepted, or failure — arrives inside the JSON `response` object of the reply. Your handler's job is to read that one integer and route on it.

For the envelope shape and the canonical 0–28 table this builds on, see [Error response format](/reference/errors/format) and [Command response error codes](/reference/errors/codes).

## Goal

Given any command reply on `<tenantId>/MDM/clients/cmnd_resp/<deviceSerialNumber>` (or the matching control/data topic), decide in one pass whether to **continue**, **wait**, **retry**, or **surface a permanent failure to the operator** — and never retry a write blindly.

## Step 1 — Correlate the reply to your request

`requestId` is the only correlation mechanism IOTC provides; MQTT does not pair request and response at the protocol layer. Match the reply's `requestId` to the request you sent before reading `response.code`. Discard or log replies whose `requestId` you do not recognize (a stale retry, or another client on a shared topic).

```json
{
  "command": "set_operating_mode",
  "requestId": "set-mode-001",
  "apiVersion": "V1.1",
  "response": { "code": 11, "description": "Inventory in progress" }
}
```

## Step 2 — Read `response.code` and branch on its class

Read the integer at `response.code` (the `code` field inside the `response` object — the payload is `{command, requestId, apiVersion, response:{code, description}}`, so there is no double nesting). Branch first on class, not on the specific code — the class determines whether a retry is even safe.

```python
resp  = reply["response"]
code  = resp["code"]
descr = resp["description"]   # verbatim from error_codes.json on the device

if code in (0, 1, 12):
    pass            # see Step 3 — success / async-accepted / no-op
elif code in (3, 4, 11):
    pass            # see Step 4 — transient, retry with backoff
else:
    pass            # see Step 5 — permanent, classify and surface
```

### Classify codes ahead of time

Precompute this map at startup so the hot path is a single lookup. Every code is taken verbatim from `error_codes.json`; the full per-code cause and recommended action live in [Command response error codes](/reference/errors/codes).

| Code(s) | `iot_status_code` | Classification | Strategy |
|---|---|---|---|
| 0 | `IOT_STATUS_SUCCESS` | Success | Continue |
| 1 | `IOT_STATUS_CMD_PAYLOAD_ACCEPTED` | Async-accepted | Wait for the follow-up `alerts` event (Step 3) |
| 3 | `IOT_ERROR_INFO_NOT_AVAILABLE` | Transient (info unavailable) | Retry with backoff |
| 4, 11 | `IOT_STATUS_FW_UPDATE_IN_PROGRESS`, `IOT_ERROR_INVENTORY_IN_PROGRESS` | Transient (operation conflict) | Wait and retry |
| 12 | `IOT_ERROR_NO_RADIO_OP_IN_PROGRESS` | Informational (no-op) | Continue without retry |
| 2, 17, 23 | `IOT_ERROR_INVALID_PAYLOAD`, `IOT_ERROR_SSID_MISSED`, `IOT_ERROR_INVALID_ENUM` | Permanent (payload bug) | Fix code and surface error |
| 10, 18 | `IOT_ERROR_CONFIG_ALREADY_EXIST`, `IOT_ERROR_SSID_ALREADY_EXIST` | Permanent (resource exists) | Fix logic (use `MODIFY`/update or a different name) |
| 15, 21 | `IOT_ERROR_SSID_NOT_FOUND`, `IOT_ERROR_CERT_NOT_FOUND` | Permanent (resource missing) | Verify name; install/create first |
| 5, 14 | `IOT_ERROR_IN_REBOOT_INVENTORY_IN_PROGRESS`, `IOT_ERROR_FW_UPDATE_FAIL_LOW_BATTERY` | Conditional (device state) | Address the precondition, then retry |
| 6, 7 | `IOT_STATUS_REGION_NOT_CONFIGURED`, `IOT_ERROR_INTERFACE_NOT_AVAILABLE` | Permanent (config gap) | Configure region/interface, retry |
| 8, 19 | `IOT_ERROR_LOW_FLASH_SIZE`, `IOT_ERROR_SSID_LIMIT_OVERFLOW` | Permanent (capacity) | Free space/slots, then retry |
| 13 | `IOT_ERROR_FW_UPDATE_FAIL` | Failure | Investigate, correct, retry |
| 16 | `IOT_ERROR_DELETE_ACTIVE_SSID` | Permanent (active resource) | Disconnect/switch SSID first |
| 20 | `IOT_ERROR_WIFI_INTER_NOT_SUPPORTED` | Permanent (capability) | Use an alternate interface |
| 22, 24, 25, 26, 27, 28 | `IOT_CTRL_ADVANCED_PROFILE_NOT_SET`, `IOT_ERROR_PREFILTERS_LIMIT_EXCEEDED`, `IOT_ERROR_PUBLISH_TOPICS_EXCEEDED`, `IOT_ERROR_SUBSCRIBE_TOPIC_EXCEEDED`, `IOT_ERROR_INVALID_TENANTID_LENGTH`, `IOT_ERROR_TAG_MATCH_PATTERN_LENGTH_EXCEEDED` | Permanent (constraint violation) | Reduce/correct the payload |
| 9 | `IOT_STATUS_FILE_NOT_FOUND` | Permanent (file missing) | Verify URL/path |

## Step 3 — Handle success and async-accepted codes (0, 1, 12)

- **`code 0` — Success.** The operation-specific payload (`readerVersion`, `deviceStatus`, `endpointResponse`, …) is present and populated. Continue.
- **`code 1` — Command payload is accepted.** Returned only by [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) and [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate). This is an acknowledgement, **not** a terminal result — the device is processing asynchronously. Subscribe to `alerts` **before** sending either command, then wait for the `FIRMWARE_UPDATE` alert (`state: SET` → `CLEAR`) or the certificate-install outcome. Do not resend on `code 1`.
- **`code 12` — No Radio Operation in Progress.** See [Distinguishing code 12](#distinguishing-code-12). Treat as success.

> Defensive note for [`reboot`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-reboot): the canonical schema defines only `0` (Success) and `5` (Inventory in progress) for `reboot` — `code 1` is **not** one of them (it is returned only by `set_os` and `install_certificate`). `reboot` is asynchronous: a `code 0` acknowledges the request and the device resets a moment later. See [Error response format](/reference/errors/format).

## Step 4 — Retry transient codes with backoff (3, 4, 11)

Codes 3, 4, and 11 mean "valid request, wrong moment." The payload is correct; the device is momentarily busy (gathering info, mid firmware update, or mid inventory). Retry with exponential backoff and jitter — **but only if the command is idempotent** (see Step 6). For codes 4 and 11, the more robust pattern is to clear the precondition first (run [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) `STOP` for an inventory conflict — see [Playbook RP-04](/diagnose/recovery-playbooks#rp-04)) rather than spin on backoff.

### Retry transient errors with backoff

```python
import time, random

TRANSIENT = {3, 4, 11}
SUCCESS   = {0, 1, 12}      # 1 = async-accepted: handle via the alerts subscription

class PermanentError(Exception):
    def __init__(self, reply):
        self.reply = reply
        super().__init__(reply["response"]["description"])

def call_with_retry(send_fn, max_attempts=5):
    delay = 1.0
    for attempt in range(max_attempts):
        reply = send_fn()                 # send_fn must use a NEW requestId for writes
        code  = reply["response"]["code"]
        if code in SUCCESS:
            return reply
        if code in TRANSIENT:
            time.sleep(delay + random.uniform(0, delay * 0.1))   # full backoff + jitter
            delay *= 2
            continue
        raise PermanentError(reply)        # do not retry permanent codes
    raise TimeoutError("max attempts reached")
```

## Step 5 — Surface permanent codes by class

Permanent codes will not change on retry; retrying wastes time and can hide the real defect. Group your handling by the recommended-action class below — every cause and action is verbatim from `error_codes.json`.

### Validation / payload class (2, 17, 23)

The request is malformed. **Fix the code, do not retry the same payload.**

| Code | Meaning | Action |
|---:|---|---|
| 2 | Invalid payload (`set_wifi`, `delete_wifi_profile`) | Validate against the command schema; correct field values. |
| 17 | SSID missed (`set_wifi`, `delete_wifi_profile`) | Include the required `essid`/SSID field in the payload. |
| 23 | Invalid enum value (`config_endpoint`, `set_wifi`, `install_certificate`, `control_operation`, `set_operating_mode`, `set_post_filter`) | Check the schema for allowed values and correct the field. |

### State / precondition class (4, 5, 11, 14, 22)

The reader is in a state that blocks the command. **Clear the precondition, then retry.**

| Code | Meaning | Action |
|---:|---|---|
| 4 | Firmware update in progress (`set_os`) | Wait for the current update to finish before another `set_os`. |
| 5 | Can't reboot, inventory in progress (`reboot`) | `control_operation STOP`, then `reboot` — see [RP-04](/diagnose/recovery-playbooks#rp-04). |
| 11 | Inventory in progress (`control_operation`, `set_operating_mode`) | Stop the current inventory before starting a new op or changing mode. |
| 14 | Battery too low for firmware update (`set_os`) | Charge or connect external power — see [RP-06](/diagnose/recovery-playbooks#rp-06). |
| 22 | Advanced configuration not set (`set_operating_mode`) | Configure the advanced profile before setting the mode. |

### Resource / capacity class (6, 7, 8, 10, 18, 19, 24, 25, 26, 27, 28)

A resource is missing, duplicated, or over a hard limit. **Adjust the request or free a slot.**

| Code | Meaning | Action |
|---:|---|---|
| 6 | Region not configured (`cloud_connect`) | Set the regulatory region (via 123RFID Desktop) before connecting. |
| 7 | Interface not available (`cloud_connect`) | Verify the required network interface is present and enabled. |
| 8 | Insufficient flash size (`set_os`) | Free flash (delete unused certs/Wi-Fi profiles) or use a smaller package. |
| 10 | Configuration already exists (`config_endpoint`) | Delete the existing config or use a different name. |
| 18 | SSID already exists (`set_wifi`) | Use `operation: "MODIFY"` to update instead of `CREATE`. |
| 19 | Wi-Fi profile count overflow (`set_wifi`) | Delete an unused Wi-Fi profile before adding one. |
| 24 | Max 32 prefilters exceeded (`set_operating_mode`) | Reduce prefilter rules to ≤ 32. |
| 25 | Max 3 publish topics exceeded (`config_endpoint`) | Reduce publish topics to ≤ 3 per endpoint. |
| 26 | Max 1 subscribe topic exceeded (`config_endpoint`) | Use exactly 1 subscribe topic per endpoint. |
| 27 | Invalid tenant ID length (`config_endpoint`) | Shorten the tenant ID to within the allowed limit. |
| 28 | Tag match pattern length exceeded (`set_operating_mode`) | Shorten the tag match pattern. |

### Certificate / file class (9, 21)

| Code | Meaning | Action |
|---:|---|---|
| 9 | File not found (`install_certificate`, `delete_certificate`, `get_installed_certificate`, `set_os`) | Verify the file path or URL is correct and the file exists. |
| 21 | Certificate not found (`delete_certificate`, `get_installed_certificate`, `install_certificate`) | Verify the certificate name; install it with `install_certificate` first. |

### Wi-Fi class (15, 16, 20)

| Code | Meaning | Action |
|---:|---|---|
| 15 | SSID not found (`set_wifi`, `delete_wifi_profile`) | Verify the SSID name and that the profile was saved. |
| 16 | Cannot delete active SSID (`delete_wifi_profile`) | Connect to a different SSID before deleting the active one. |
| 20 | Wi-Fi not supported (`set_wifi`) | The hardware has no Wi-Fi interface — use Ethernet or another interface. |

### Failure class (13)

| Code | Meaning | Action |
|---:|---|---|
| 13 | Firmware update failed (`set_os`) | Check firmware URL, battery, flash, and network; re-issue — see [RP-06](/diagnose/recovery-playbooks#rp-06) and [RP-09](/diagnose/recovery-playbooks#rp-09). |

## Step 6 — Apply the right idempotency rule before any retry

Idempotency is **per command**, and it governs whether you reuse or regenerate `requestId` on retry:

- **Read-only `get_*` commands are idempotent.** Retry with the **same** `requestId` — the reader treats a repeat as the same request and returns the same kind of result. Example: `get_status`, `get_wifi`, `get_operating_mode`.
- **State-changing `set_*` / `control_operation` commands are NOT idempotent.** Retry with a **new** `requestId` so a late-arriving duplicate of the original cannot be misread as the retry's reply, and so the reader does not collapse two distinct intents. Example: `set_wifi`, `set_operating_mode`, `control_operation`.

```python
import uuid

def new_request_id():
    return uuid.uuid4().hex[:16]   # 16-hex-digit identifier, per the schema

def send_get_status(request_id):                 # idempotent: caller may reuse request_id
    return publish("get_status", request_id, {})

def send_control_stop():                          # not idempotent: fresh id every attempt
    return publish("control_operation", new_request_id(),
                   {"ctrlOprPayload": {"controlType": "RFID", "operation": "STOP"}})
```

## Worked example: stop an inventory, then change mode

This is the canonical recovery for `code 11` (Inventory in progress) returned by [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode).

1. The mode change is rejected because inventory is running:

   ```json
   {
     "command": "set_operating_mode",
     "requestId": "set-mode-001",
     "apiVersion": "V1.1",
     "response": { "code": 11, "description": "Inventory in progress" }
   }
   ```

2. Clear the precondition. Send [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) `STOP` with a fresh `requestId` (it is a write, so not idempotent):

   ```json
   {
     "command": "control_operation",
     "requestId": "ctrl-stop-7f3a91b2",
     "ctrlOprPayload": { "controlType": "RFID", "operation": "STOP" }
   }
   ```

3. Accept either terminal outcome — both mean "the radio is now idle":

   ```json
   { "command": "control_operation", "requestId": "ctrl-stop-7f3a91b2",
     "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
   ```

   ```json
   { "command": "control_operation", "requestId": "ctrl-stop-7f3a91b2",
     "apiVersion": "V1.1", "response": { "code": 12, "description": "No Radio Operation in Progress" } }
   ```

4. Re-send `set_operating_mode` with a new `requestId`. Expect `code 0`.

## Worked example: duplicate Wi-Fi profile (code 18)

A `CREATE` for an SSID that already exists returns `code 18`. Do not retry the `CREATE` — switch the `operation` to `MODIFY` on the same profile.

1. Rejected `CREATE`:

   ```json
   {
     "command": "set_wifi",
     "requestId": "abc123",
     "apiVersion": "V1.1",
     "response": { "code": 18, "description": "WIFI Error - SSID already exist" }
   }
   ```

2. Fix the logic — re-issue as `MODIFY` (verbatim payload shape from the `set_wifi` schema):

   ```json
   {
     "command": "set_wifi",
     "requestId": "wifi-fix-3c8d",
     "wifiConfig": {
       "operation": "MODIFY",
       "accessPoint": { "isPreferred": true, "essid": "TestAP1" }
     }
   }
   ```

3. Expect `code 0`.

## Distinguishing code 12

Code 12 (`IOT_ERROR_NO_RADIO_OP_IN_PROGRESS`) appears when `STOP` is sent to an already-idle reader. It is **not** a failure — it is the no-op acknowledgement of an idempotent intent ("ensure the radio is stopped"). Treat it identically to `code 0` when your goal was to stop the radio. The same applies inside [Playbook RP-04](/diagnose/recovery-playbooks#rp-04).

## When to escalate to the operator

Surface to a human when the action is physical or out of the application's control. Escalate immediately (no retry) on:

- `code 6`/`code 7` — region/interface must be provisioned via 123RFID Desktop.
- `code 8`/`code 14` — free flash / charge the device (physical).
- `code 16`/`code 20` — network or hardware capability (switch SSID, no Wi-Fi radio).
- `code 13` after the [RP-06](/diagnose/recovery-playbooks#rp-06) checks (battery, flash, URL reachability) all pass — escalate to support.

For symptom-first navigation when you are not sure which code you are looking at, start from [Something's broken?](/diagnose/symptoms).

**Related:** 📕 [Command response error codes](/reference/errors/codes) · 📕 [Error response format](/reference/errors/format) · 📙 [Recovery playbooks](/diagnose/recovery-playbooks) · 📙 [Something's broken?](/diagnose/symptoms) · 📘 [How commands and responses flow](/foundations/communication-flow) · 📕 [MQTT API Reference](/reference/api-overview)
