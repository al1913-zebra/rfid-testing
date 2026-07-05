# Command: delete_wifi_profile

## 1. Intent & Objective

`delete_wifi_profile` is a **state-changing** Handheld RFID IOTC command that removes a single saved Wi-Fi profile from the reader's profile store. It is delivered over MQTT and is routed as a device-management (dev-management) command. The profile to remove is identified by its `essid` carried inside `wifiProfileInfo`; on success the matching saved profile is deleted and the command returns a status-only envelope (no profile echo) [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json properties = command, requestId, response]. The active (currently-connected) profile is protected from deletion by the firmware (code 16) [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json examples #1 + refrence/response/response.yaml code], so deleting a **non-active** profile — as exercised this session — is the safe path and does not disturb the live MQTT session [verified-on-device: RFD40 serial 24190525100255].

The live exercise on the physical reader (model `RFD40`) deleted the non-active profile `ALM_MOTO_E70_FUSION` and returned `response.code 0` ("Success") with `apiVersion "V1.1"`, echoing `requestId abc123` [verified-on-device: RFD40 serial 24190525100255]. The device IP, broker, endpoint type and serial used for this run are harness/identity coordinates [verified-from-test-harness: device @192.168.1.5, endpoint MDM_REMOTE, broker 192.168.1.6:1883, serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

`delete_wifi_profile` is routed over the device's management (MDM) endpoint. The per-operation `delete_wifi_profile` schema does not itself define MQTT topics — topics are configured **per endpoint** via `config_endpoint` / `cfgEndpointPayload.mqttParams`, not per command — so no QoS/retain is asserted at the command level. The topics below are the **actual on-wire topics observed this session** when the command was published and the response received:

| Direction | Topic Path (observed) | QoS | Retain |
|-----------|-----------------------|-----|--------|
| Publish (Request)    | `zebra/MDM/clients/cmnd/RFD40-24190525100255` | not specified per-operation in schema | n/s |
| Subscribe (Response) | `zebra/MDM/clients/resp/RFD40-24190525100255` | n/s | n/s |

The on-wire form is `{tenantId}/{baseTopic}/{serial}` — here `tenantId=zebra`, base `MDM/clients/cmnd|resp`, serial `RFD40-24190525100255` — i.e. the device wraps the configured base topic with the tenant prefix and the serial suffix. [verified-from-test-harness: the `delete_wifi_profile` request was published to / its response received on these exact topics this session]

Transport/identity coordinates for this run (not values present in the `delete_wifi_profile` payload): device `192.168.1.5`, broker `192.168.1.6:1883` (plain MQTT), endpoint `MDM_REMOTE`, model `RFD40`, serial `24190525100255`; the laptop control host was on Wi-Fi `Airtel_The_LAN_Before_Time`, the MQTT control session attached on the first attempt (`connect rc=0`, unique clientId, no retries). [verified-from-test-harness]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | default `delete_wifi_profile` (no example, no enum) | The operation being performed (delete a saved Wi-Fi profile). [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json command] |
| `requestId` | root | string | Required | example `abc123` | Unique request identifier for tracking/debugging. [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json requestId] |
| `wifiProfileInfo` | root | object | **Optional at command level** (see D1) | `$ref` delWifiProfile.yaml | Identifies the Wi-Fi profile to be deleted. [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json wifiProfileInfo + required] |
| `essid` | wifiProfileInfo | string | **Not required** (see D2) | example `JioFi` | SSID of the Wi-Fi profile to be deleted. [verified-from-schema: refrence/payload/delWifiProfile.yaml essid] |

**Note:** The `delete_wifi_profile` request schema **declares exactly three properties — `command`, `requestId`, `wifiProfileInfo`** — and sets no `additionalProperties:false`, so extra/undeclared properties would still validate (the same permissiveness flagged for the response in D3). There is no `auth` block: broker authentication is a transport/harness concern, not part of the payload. This command carries **no credential field** — there is nothing to mask. [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json properties (no additionalProperties)]

**Note (D1):** The command-level `required` array is only `["command", "requestId"]`. `wifiProfileInfo` — the object that names the profile to delete — is **not required at the command level**, so a `delete_wifi_profile` request with no `wifiProfileInfo` would pass schema validation despite having no profile to delete [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json required].

**Note (D2):** Within `wifiProfileInfo`, `essid` is **not required** — `delWifiProfile.yaml` defines `essid` but ships **no `required` array** — so a delete with no `essid` would also pass validation despite having no profile to identify [verified-from-schema: refrence/payload/delWifiProfile.yaml].

### JSON Request Example (operator-provided, schema-validated, sent)

> This is the **exact request that was sent** to the device this session (operator-provided), verbatim. It carries **no credential field — nothing is masked**. The targeted profile `ALM_MOTO_E70_FUSION` was confirmed present in the before-state and absent in the after-state `get_wifi` (Section 5).

```json
{
  "command": "delete_wifi_profile",
  "requestId": "abc123",
  "wifiProfileInfo": {
    "essid": "ALM_MOTO_E70_FUSION"
  }
}
```

**Static validation — fully VALID.** The request is **VALID against the command schema** (`command` + `requestId` are both present, satisfying `required`) [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json required], and **VALID against `delWifiProfile.yaml`** (`essid` is a present string; `essid` is not required but is supplied) [verified-from-schema: refrence/payload/delWifiProfile.yaml essid]. (The command schema's own example uses `essid "TestAP2"`; the live run substituted the real `essid "ALM_MOTO_E70_FUSION"`.) [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json examples]

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | root | string | Not in schema `required` (see D4) | default `delete_wifi_profile`; returned `delete_wifi_profile` | [verified-on-device: RFD40 serial 24190525100255] | The command that was executed. |
| `requestId` | root | string | Not in schema `required` (see D4) | returned `abc123` (echoed from request); schema `default` is the integer `1235` despite `type:"string"` (see D5) | [verified-on-device: RFD40 serial 24190525100255] | Unique identifier of the original request. |
| `apiVersion` | root | string | **UNDECLARED in schema** (see D3); present on-device | no property, no enum in schema; device returned `V1.1` | [verified-on-device: RFD40 serial 24190525100255] | API version of the response — returned by the device but not modeled by the response schema. |
| `response` | root | object | Not in schema `required` (see D4); device returned it | `$ref` response.yaml; `{code, description}` | [verified-on-device: RFD40 serial 24190525100255] | Standard status envelope. |
| `response.code` | response | integer | Required (within response); min 0, max 30 [verified-from-schema: refrence/response/response.yaml code] | device returned `0` | [verified-on-device: RFD40 serial 24190525100255] | Result status code (0 = Success). |
| `response.description` | response | string | Required (within response) [verified-from-schema: refrence/response/response.yaml required] | device returned `Success` | [verified-on-device: RFD40 serial 24190525100255] | Human-readable result description. |

The response schema declares only `command`, `requestId`, and `response` ( `$ref` response.yaml, with `code`/`description` both required and `code` bounded 0–30); it does **not** declare an `apiVersion` property and has **no top-level `required` array** [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json properties + refrence/response/response.yaml].

**Note (D3):** `apiVersion` is **undeclared** in the response schema, yet the device returns `apiVersion "V1.1"` (and the schema's own examples #1/#2 include it). Because the schema sets no `additionalProperties:false`, this extra property is **accepted but unvalidated and unconstrained** (no enum) [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json properties] / [verified-on-device: RFD40 serial 24190525100255].

### JSON Response Example (LIVE, verbatim)

```json
{
  "command": "delete_wifi_profile",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

The full envelope **validated against the response schema** — `response.code 0` and `description` are present, satisfying response.yaml's `required: [code, description]` [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json + refrence/response/response.yaml required]. **Caveat:** the extra `apiVersion "V1.1"` is accepted **only because** the schema sets no `additionalProperties:false` (see D3) — it is not validated by the schema [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json properties].

## 5. Live State-Change Verification

Because `delete_wifi_profile` is state-changing, the saved-profile list was captured with `get_wifi` immediately before and after the command. The observations below are [verified-on-device: RFD40 serial 24190525100255].

- **BEFORE** (`get_wifi`): saved Wi-Fi profile names = `[Airtel_The_LAN_Before_Time, ALM_MOTO_E70_FUSION]`; connected = `Airtel_The_LAN_Before_Time`; the target `ALM_MOTO_E70_FUSION` is **present**.
- **ACTION** (`delete_wifi_profile`, `essid: ALM_MOTO_E70_FUSION`): returned `response.code 0` ("Success"), `apiVersion "V1.1"`, with `requestId` echoed as `abc123`.
- **AFTER** (`get_wifi`): saved Wi-Fi profile names = `[Airtel_The_LAN_Before_Time]`; connected = `Airtel_The_LAN_Before_Time`; the target `ALM_MOTO_E70_FUSION` is **absent**.

Profile count went **2 -> 1** (decreased by exactly one); `ALM_MOTO_E70_FUSION` was removed while `Airtel_The_LAN_Before_Time` was **retained and still CONNECTED**, so the MQTT control session was preserved. This is the definitive delete proof. `ALM_MOTO_E70_FUSION` was a **non-active** profile (the device was connected to `Airtel`, not `ALM`), which is why the delete succeeded with code 0 and did not disturb the session. [verified-on-device: RFD40 serial 24190525100255]

## 6. Associated Error Codes

| Code | Status | Name | Triggering Condition | Provenance |
|------|--------|------|----------------------|------------|
| 0 | Success | Success | `delete_wifi_profile` completed; matching profile removed | [verified-on-device: RFD40 serial 24190525100255] |
| 15 | Error | WIFI Error - SSID not found | The `essid` targeted for deletion is not a saved profile | [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json example #2 + refrence/response/response.yaml code] |
| 16 | Error | WIFI Error - Cannot delete active SSID | The currently-connected profile is protected and cannot be deleted | [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json example #1 + refrence/response/response.yaml code] |
| 2 | Error | Invalid payload | Generic malformed / unparseable request payload | [verified-from-schema: refrence/response/response.yaml code] |

**Honesty note.** Only `code 0` was observed live this session. Codes **15 / 16 / 2 were not exercised on-device** — they are drawn from this command's response examples and the response-code table and are labeled strictly [verified-from-schema]. In particular, deleting the **active SSID** (which would provoke code 16) was **deliberately not attempted**, because doing so could disturb the live session. Codes are constrained to the 0–30 range defined by the table [verified-from-schema: refrence/response/response.yaml code minimum/maximum].

## 7. Conformance & Spec Notes (this command)

**Positive result (live, clean).** The operator-provided request is schema-VALID against `commands/dev_mgmt/delete_wifi_profile.json` and `delWifiProfile.yaml`, and the live response validated against the response schema (`response.code 0`, `description` present) [verified-on-device: RFD40 serial 24190525100255] / [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json + refrence/response/response.yaml]. The live behavior was clean; the issues below are **schema-quality defects**, distinct from runtime behavior.

- **D1 — Command-level `required` omits `wifiProfileInfo`.** `commands/dev_mgmt/delete_wifi_profile.json` `required` is only `["command", "requestId"]`, so a `delete_wifi_profile` with no `wifiProfileInfo` would pass validation despite having no profile to delete [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json required]. **Fix:** add `wifiProfileInfo` to the command-level `required` array.

- **D2 — `wifiProfileInfo.essid` is not required.** `refrence/payload/delWifiProfile.yaml` has **no `required` array**, so a delete with no `essid` would pass validation despite having no profile to identify [verified-from-schema: refrence/payload/delWifiProfile.yaml]. **Fix:** add `required: [essid]` to `delWifiProfile.yaml`.

- **D3 — Response schema does not declare `apiVersion`.** The device returns `apiVersion "V1.1"` (and the schema's own examples #1/#2 include it), yet the response schema declares no `apiVersion` property and sets no `additionalProperties:false`, so `apiVersion` is **undeclared, unvalidated, and unconstrained** (no enum) [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json properties] / [verified-on-device: RFD40 serial 24190525100255]. **Fix:** declare `apiVersion` (string, enum `[V1.0, V1.1]`) in the response schema.

- **D4 — Response schema has NO `required` array.** Nothing is required at the response level — weaker than sibling response schemas (e.g. `set_wifi` requires `command` / `requestId` / `apiVersion`) [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json]. **Fix:** add `required: [command, requestId, apiVersion, response]` (or at least `command` / `requestId` / `response`).

- **D5 — Response `requestId.default` type mismatch.** `requestId.type` is `"string"` but its `default` is the integer `1235` [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json requestId]. **Fix:** change the default to a string (e.g. `"1235"`) or remove it.

- **D6 — Response examples are inconsistent on `apiVersion`.** Example #0 omits `apiVersion` while examples #1 and #2 include it [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json examples]. **Fix:** make the examples consistent (include `apiVersion` in all, once D3 declares it).

- **(Minor) `command` uses `default` instead of `example` and defines no `enum`.** The request `command` property carries `default: "delete_wifi_profile"` with no example and no enum — a minor style inconsistency [verified-from-schema: commands/dev_mgmt/delete_wifi_profile.json command]. **Fix:** add an `example` and pin the value with an `enum`.

## 8. Safety note — active-SSID protection

The **active / currently-connected** Wi-Fi profile is protected: the firmware refuses to delete it and returns **code 16 ("WIFI Error - Cannot delete active SSID")** [verified-from-schema: response/dev_mgmt/delete_wifi_profile.json example #1 + refrence/response/response.yaml code]. Deleting a **non-active** profile is the safe operation — that is exactly what was done this session: `ALM_MOTO_E70_FUSION` was not the connected network, so its deletion returned code 0 and left the device connected to `Airtel_The_LAN_Before_Time`, preserving the MQTT control session [verified-on-device: RFD40 serial 24190525100255]. On this deployment the device manages itself over `Airtel_The_LAN_Before_Time` to the broker at `192.168.1.6:1883` (endpoint `MDM_REMOTE`), so deleting the **session-carrying** AP would be the dangerous case — but the device would **refuse** it (code 16) rather than sever its own control channel [verified-from-test-harness: device manages itself over Airtel_The_LAN_Before_Time to broker 192.168.1.6:1883, endpoint MDM_REMOTE, serial 24190525100255] / [verified-from-schema: refrence/response/response.yaml code 16]. Provoking code 16 by attempting to delete the active SSID was deliberately **not** attempted this session [verified-on-device: RFD40 serial 24190525100255].