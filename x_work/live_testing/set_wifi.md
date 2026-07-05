# Command: set_wifi

## 1. Intent & Objective

`set_wifi` is a **state-changing** Handheld RFID IOTC command that writes a Wi-Fi profile to the reader. It is delivered over MQTT and is routed as a device-management (dev-management) command.

A single invocation either **creates** a new saved Wi-Fi profile or **modifies** an existing one. This is selected by `wifiConfig.operation`, whose schema enum is `CREATE` | `MODIFY` [verified-from-schema: refrence/payload/cfgWifiPayload.yaml operation.enum]. The command configures, in one payload:
- the network interface (`interfaceName`, `enableInterface`) [verified-from-schema: refrence/payload/cfgWifiPayload.yaml interfaceName/enableInterface];
- the access point (`accessPoint.essid`, preference and auto-connect flags) [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint];
- the security type and its credentials (`security.securityType`, `security.securityDetails`) [verified-from-schema: refrence/payload/cfgWifiPayload.yaml security];
- an optional static IPv4 block (`accessPoint.ipv4Configuration`) [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.ipv4Configuration].

**Critical `accessPoint.connect` semantics.** The `connect` flag governs whether the device *switches* to the profile being written. Per schema, "If true, disconnects the currently connected profile and connects to the specified one; if false, just saves the profile." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.connect.description]. In this run the command was sent with `connect:false`, so the profile was **saved but the device did not switch networks** — the device stayed connected to `Airtel` and the live session was preserved [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883].

**API caveat — static IP / IPv6.** The request schema description states this API "currently supports IPv4 addressing with DHCP-based IP assignment only, static IP configuration and IPv6 support is not available in the current API version." [verified-from-schema: commands/dev_mgmt/set_wifi.json description]. (See conformance note B7: the payload schema nonetheless models a static `ipv4Configuration`.)

**Credentials are write-only.** Passwords are supplied in the request but are never echoed back: this command's response is a status-only envelope that carries **no credential and no config echo** [verified-from-schema: response/dev_mgmt/set_wifi.json properties]. Documentation examples in this page show the password masked as `********`; the real credential is never written into this page. (Note: whether the firmware masks returned passwords on a separate read-back command such as `get_wifi` was **not observed this session** and is not defined in any `set_wifi` source file — no read-back mask token is asserted here.)

The live exercise on the physical reader (model `RFD40`) used `operation: CREATE` with `accessPoint.connect: false` and returned `response.code 0` ("Success") with `apiVersion "V1.1"`, echoing `requestId abc123` [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]. The device IP, broker, endpoint type and serial used for this run are harness/identity coordinates [verified-from-test-harness: device @192.168.1.5, endpoint MDM_REMOTE, broker 192.168.1.6:1883].

## 2. Topic Mapping (observed on-wire)

`set_wifi` is routed over the device's management (MDM) endpoint. The per-operation `set_wifi` schema does not itself define MQTT topics — topics are configured **per endpoint** via `config_endpoint` / `cfgEndpointPayload.mqttParams`, not per command — so no QoS/retain is asserted at the command level. The topics below are the **actual on-wire topics observed this session** when the command was published and the response received:

| Direction | Topic Path (observed) | QoS | Retain |
|-----------|-----------------------|-----|--------|
| Publish (Request)    | `zebra/MDM/clients/cmnd/RFD40-24190525100255` | not specified per-operation in schema | n/s |
| Subscribe (Response) | `zebra/MDM/clients/resp/RFD40-24190525100255` | n/s | n/s |

The on-wire form is `{tenantId}/{baseTopic}/{serial}` — here `tenantId=zebra`, base `MDM/clients/cmnd|resp`, serial `RFD40-24190525100255` — i.e. the device wraps the configured base topic with the tenant prefix and the serial suffix. [verified-from-test-harness: the `set_wifi` request was published to / its response received on these exact topics this session; the wrapping rule is corroborated across every command exercised this session — see `live_capture.log`]

Transport/identity coordinates for this run (not values present in the `set_wifi` payload): device `192.168.1.5`, broker `192.168.1.6:1883` (plain MQTT, anonymous), endpoint `MDM_REMOTE`, model `RFD40`, serial `24190525100255`. [verified-from-test-harness]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `set_wifi` | The operation being performed (set the Wi-Fi configuration). [verified-from-schema: commands/dev_mgmt/set_wifi.json command] |
| `requestId` | root | string | Required | example `abc123` | Unique request identifier for tracking/debugging. [verified-from-schema: commands/dev_mgmt/set_wifi.json requestId] |
| `wifiConfig` | root | object | **Optional at command level** (see B5) | `$ref` cfgWifiPayload.yaml | The Wi-Fi profile configuration object. [verified-from-schema: commands/dev_mgmt/set_wifi.json wifiConfig + required] |
| `interfaceName` | wifiConfig | string | Required (within wifiConfig) | — | Network interface for which the Wi-Fi config is set (e.g. `wlan0`). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml interfaceName] |
| `enableInterface` | wifiConfig | boolean | Required (within wifiConfig) | true / false | Whether the network interface is enabled or disabled. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml enableInterface] |
| `operation` | wifiConfig | string | Required (within wifiConfig) | enum `CREATE`, `MODIFY`; example `CREATE` | Create a new profile or modify an existing one. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml operation] |
| `accessPoint` | wifiConfig | object | Required (within wifiConfig) | required keys: `connect`, `isPreferred`, `essid`, `enableSecurity` | Access-point connection settings (credentials, security, IP). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint + accessPoint.required] |
| `connect` | accessPoint | boolean | Required | true / false | If true, disconnects current profile and connects to this one; if false, just saves the profile. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.connect] |
| `isPreferred` | accessPoint | boolean | Required | true / false | Marks this profile as preferred to always connect to when available. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.isPreferred] |
| `essid` | accessPoint | string | Required | example `ZWireless` | The ESSID (network name) of the access point. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.essid] |
| `enableSecurity` | accessPoint | boolean | Required | true / false | Whether security is enabled for this access point. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.enableSecurity] |
| `autoConn` | accessPoint | boolean | Optional (**deprecated**) | true / false | "Reserved for backward compatibility. It will be removed in the future." [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.autoConn] |
| `ipv4Configuration` | accessPoint | object | Optional | `ipAddress`/`subnetMask`/`gateway`/`dnsServer` (format ipv4), `enableDhcp` (bool), `domainName` (string) | Static IPv4 network configuration (but see B7 caveat). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.ipv4Configuration] |
| `security` | accessPoint | object | Optional | required keys: `securityType`, `securityDetails` | Security type and credential details for the access point. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.security + security.required] |
| `securityType` | security | string | Required (within security) | enum `WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise`; example `WPA2personal` (typo, see B3) | Authentication/encryption method for the access point. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml security.securityType] |
| `securityDetails` | security | object | Required (within security) | properties: `WPA2Personal`, `WPA2Enterprise`, `WPA3Enterprise` (no `WPA3Personal`, see B2) | Credentials specific to the chosen security type. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml security.securityDetails] |
| `WPA2Personal` | securityDetails | object | Optional (one-of by securityType) | resolves to `{ password: string }`, required `[password]` — **malformed block, see B1** | Personal-mode credentials (single password). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml securityDetails.WPA2Personal] |
| `password` | WPA2Personal | string | Required (within WPA2Personal) | — | The pre-shared key for personal-mode authentication (write-only). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml securityDetails.WPA2Personal.password] |
| `WPA2Enterprise` | securityDetails | object | Optional (one-of by securityType) | required `[authentication]` | Enterprise (802.1X) credentials/cert parameters. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml securityDetails.WPA2Enterprise] |
| `WPA2Enterprise.authentication` | WPA2Enterprise | string | Required (within WPA2Enterprise) | enum `tls`, `ttls`, `peap`; example `peap` | Outer authentication protocol. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.authentication] |
| `WPA2Enterprise.innerAuthentication` | WPA2Enterprise | string | Optional | enum `none`, `tls`, `mschapv2` | Inner authentication method within the outer protocol. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.innerAuthentication] |
| `WPA2Enterprise.identity` | WPA2Enterprise | string | Optional | example `test` | Identity (username) for enterprise auth. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.identity] |
| `WPA2Enterprise.anonymousIdentity` | WPA2Enterprise | string | Optional | example `test` | Anonymous identity for enterprise auth. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.anonymousIdentity] |
| `WPA2Enterprise.password` | WPA2Enterprise | string | Optional | — | Password for enterprise auth (write-only). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.password] |
| `WPA2Enterprise.passphrase` | WPA2Enterprise | string | Optional | — | Passphrase for enterprise auth (write-only). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.passphrase] |
| `WPA2Enterprise.certificate` | WPA2Enterprise | array of object | Optional | items `{key,value}`; `key` enum `ca_cert`/`client_key`/`client_cert`/`cert_key_password`; `items.maxProperties:4` (per-entry, bounds each `{key,value}` object — **not the array length**); example `ap1wpa2e` (string — invalid, see B4) | Certificate key-value entries used for enterprise authentication. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.certificate + .items.maxProperties] |
| `WPA2Enterprise.protocol` | WPA2Enterprise | string | Optional | enum `WPA2_Enterprise_CCMP` | Encryption protocol for WPA2-Enterprise. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.protocol] |
| `WPA3Enterprise` | securityDetails | object | Optional (one-of by securityType) | required `[authentication]` | Enterprise (802.1X) credentials/cert parameters for WPA3. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml securityDetails.WPA3Enterprise] |
| `WPA3Enterprise.authentication` | WPA3Enterprise | string | Required (within WPA3Enterprise) | enum `tls`, `ttls`, `peap`; example `peap` | Outer authentication protocol. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA3Enterprise.authentication] |
| `WPA3Enterprise.innerAuthentication` | WPA3Enterprise | string | Optional | enum `none`, `tls`, `mschapv2` | Inner authentication method. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA3Enterprise.innerAuthentication] |
| `WPA3Enterprise.identity` / `anonymousIdentity` / `password` / `passphrase` | WPA3Enterprise | string | Optional | — | Identity / anonymous identity / password / passphrase (credentials write-only). [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA3Enterprise] |
| `WPA3Enterprise.certificate` | WPA3Enterprise | array of object | Optional | items `{key,value}`; `key` enum `ca_cert`/`client_key`/`client_cert`/`cert_key_password`; `items.maxProperties:4` (per-entry, bounds each `{key,value}` object — **not the array length**); example `ap1wpa2e` (string — invalid, see B4) | Certificate key-value entries for WPA3-Enterprise auth. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA3Enterprise.certificate + .items.maxProperties] |
| `WPA3Enterprise.protocol` | WPA3Enterprise | string | Optional | enum `WPA3_Enterprise_CCMP`, `WPA3_Enterprise_CCMP_256`, `WPA3_Enterprise_GCMP_128`, `WPA3_Enterprise_GCMP_256_SHA256`, `WPA3_Enterprise_GCMP_256_SUITEB_192` | Encryption protocol for WPA3-Enterprise. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA3Enterprise.protocol] |

**Note:** The `set_wifi` request **root properties are limited to exactly `command`, `requestId`, `wifiConfig`** — there is no `auth` block (no `auth.user` / `auth.password`) anywhere in this command's request schema; broker authentication is a transport/harness concern, not part of the payload [verified-from-schema: commands/dev_mgmt/set_wifi.json properties].

**Note (B5):** The command-level `required` array is only `["command", "requestId"]`. `wifiConfig` — the actual configuration being set — is **not required at the command level**, so a `set_wifi` request with no `wifiConfig` would pass schema validation [verified-from-schema: commands/dev_mgmt/set_wifi.json required].

### JSON Request Example (operator-provided, schema-validated, sent — password MASKED)

> This is the **exact request that was sent** to the device this session (operator-provided), pre-validated **schema-VALID** against `commands/dev_mgmt/set_wifi.json` before sending. Only the `password` is masked (`********`) — the real credential is never written into this page. The resulting profile `ALM_MOTO_E70_FUSION` was then confirmed in the after-state `get_wifi` (Section 5).

```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "wifiConfig": {
    "interfaceName": "wlan0",
    "enableInterface": true,
    "operation": "CREATE",
    "accessPoint": {
      "connect": false,
      "isPreferred": false,
      "autoConn": true,
      "essid": "ALM_MOTO_E70_FUSION",
      "enableSecurity": true,
      "security": {
        "securityType": "WPA2Personal",
        "securityDetails": {
          "WPA2Personal": {
            "password": "********"
          }
        }
      }
    }
  }
}
```

This reconstructed payload is **schema-valid** against `commands/dev_mgmt/set_wifi.json` [verified-from-schema: commands/dev_mgmt/set_wifi.json]. The `password` shown here is masked; the real credential is never written into this page.

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | root | string | Required | returned `set_wifi` | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] | The command that was executed. |
| `requestId` | root | string | Required | returned `abc123` (echoed from request) | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] | Unique identifier of the original request. |
| `apiVersion` | root | string | Required | enum `V1.0`, `V1.1`; device returned `V1.1` | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] | API version of the response (in-enum). |
| `response` | root | object | **Not in schema `required` (see B6)**, but device returned it | `$ref` response.yaml; `{code, description}` | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] | Standard status envelope. |
| `response.code` | response | integer | Required (within response) | min 0, max 30; device returned `0` | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] | Result status code (0 = Success). |
| `response.description` | response | string | Required (within response) | device returned `Success` | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] | Human-readable result description. |

The schema definitions for `apiVersion` (enum/example) and `response` (`$ref` to response.yaml, with `code`/`description` both required and `code` bounded 0–30) are [verified-from-schema: response/dev_mgmt/set_wifi.json apiVersion/response and refrence/response/response.yaml].

**Note (B6):** The response schema's `required` array is `["command", "requestId", "apiVersion"]` — it **omits `response`** (sibling response schemas require `response`) [verified-from-schema: response/dev_mgmt/set_wifi.json required]. The live device nonetheless **did** return the `response{code,description}` object [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883].

**Note:** The `set_wifi` response carries **no configuration echo and no credential** — it is purely a status envelope (`command`, `requestId`, `apiVersion`, `response`) [verified-from-schema: response/dev_mgmt/set_wifi.json properties]. To confirm the resulting saved profile state, a follow-up `get_wifi` is required (see Section 5).

### JSON Response Example (LIVE, verbatim)

```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

## 5. Live State-Change Verification

Because `set_wifi` is state-changing, the saved-profile list was captured with `get_wifi` immediately before and after the command. The behavioral observations below are [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883].

- **BEFORE** (`get_wifi`): saved Wi-Fi profile names = `[Airtel]`.
- **ACTION** (`set_wifi`, `operation: CREATE`, `accessPoint.connect: false`): returned `response.code 0` ("Success"), `apiVersion "V1.1"`, with `requestId` echoed as `abc123`.
- **AFTER** (`get_wifi`): saved Wi-Fi profile names = `[Airtel, ALM_MOTO_E70_FUSION]` — the new profile was **CREATED** and persisted.
- **Connectivity preserved:** the device **remained connected to `Airtel`**. The `connect:false` directive was honored (the new profile was saved but not activated), so the live session over the existing network was not disrupted.

This confirms the CREATE path end-to-end: a single saved profile was added without switching the active connection. A profile created this way is reversible via the sibling **`delete_wifi_profile`** command. [verified-from-schema: `commands/dev_mgmt/delete_wifi_profile.json` exists in the command set]

## 6. Associated Error Codes

| Code | Status | Name | Triggering Condition | Provenance |
|------|--------|------|----------------------|------------|
| 0 | Success | Success | `set_wifi` completed; profile saved (CREATE) | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] |
| 2 | Error | Invalid payload | Malformed / unparseable request payload (hypothesis) | [firmware-only-unknown] |
| 15 | Error | WIFI Error - SSID not found | SSID-targeting failure on MODIFY (hypothesis) | [firmware-only-unknown] |
| 17 | Error | WIFI Error - SSID missed | Required SSID not supplied (hypothesis) | [firmware-only-unknown] |
| 18 | Error | WIFI Error - SSID already exist | CREATE of an essid that already exists (hypothesis) | [firmware-only-unknown] |
| 19 | Error | WIFI Error - SSID count overflow | Saved-profile capacity exceeded (hypothesis) | [firmware-only-unknown] |
| 20 | Error | Wifi is not supported | Wi-Fi unsupported on the device/interface (hypothesis) | [firmware-only-unknown] |
| 21 | Error | Certificate not found | Referenced enterprise certificate not present (hypothesis) | [firmware-only-unknown] |
| 23 | Error | Invalid enum value | Out-of-enum value supplied (e.g. bad `operation`/`securityType`) (hypothesis) | [firmware-only-unknown] |

Only `code 0` was observed live this run; the error names above are taken verbatim from the response-code table [verified-from-schema: refrence/response/response.yaml code]. The mapping of any non-zero code to a specific `set_wifi` trigger is **[firmware-only-unknown]** — these are hypotheses pending firmware confirmation. Codes are constrained to the 0–30 range defined by the table [verified-from-schema: refrence/response/response.yaml code minimum/maximum].

## 7. Conformance & Spec Notes (this command)

**Positive result (live, clean).** The reconstructed request payload is schema-VALID against `commands/dev_mgmt/set_wifi.json`, and the live response was schema-VALID: `apiVersion "V1.1"` is in the response enum `[V1.0, V1.1]`, and `response{code,description}` matched response.yaml [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] / [verified-from-schema: response/dev_mgmt/set_wifi.json apiVersion]. The live behavior was clean; the issues below are **schema-quality defects**, distinct from runtime behavior.

- **B1 — Malformed `WPA2Personal` block.** In `securityDetails.WPA2Personal`, the YAML contains duplicate `type` / `description` / `properties` keys (a botched copy of a WPA3-Personal block), and its `description` wrongly reads "WPA3-Personal security credentials." Under YAML last-key-wins this resolves to `{type:object, properties:{password}, required:[password]}`, but the duplicate keys and the wrong description are real defects [verified-from-schema: refrence/payload/cfgWifiPayload.yaml securityDetails.WPA2Personal]. **Fix:** remove the duplicate keys and correct the description to "WPA2-Personal security credentials."

- **B2 — Missing `WPA3Personal` in `securityDetails`.** `securityType` enum includes `WPA3Personal`, but `securityDetails` has **no `WPA3Personal` property** (the intended WPA3-Personal block was absorbed into the malformed WPA2Personal block, B1). A `WPA3Personal` profile therefore cannot specify its credentials [verified-from-schema: refrence/payload/cfgWifiPayload.yaml securityDetails + security.securityType.enum]. **Fix:** add a distinct `WPA3Personal` object (`{ password }`, required `[password]`) alongside `WPA2Personal`.

- **B3 — `securityType` example typo.** The `securityType` example is `WPA2personal` (lowercase `p`), while the enum is `[WPA2Personal, WPA3Personal, WPA2Enterprise, WPA3Enterprise]` (capital `P`) [verified-from-schema: refrence/payload/cfgWifiPayload.yaml security.securityType.example vs .enum]. **Fix:** change the example to `WPA2Personal`.

- **B4 — `certificate` array with string example.** Both `WPA2Enterprise.certificate` and `WPA3Enterprise.certificate` are `type: array` (of `{key,value}` objects), yet each carries `example: "ap1wpa2e"` — a string, which is type-invalid for an array [verified-from-schema: refrence/payload/cfgWifiPayload.yaml WPA2Enterprise.certificate / WPA3Enterprise.certificate]. **Fix:** replace the example with a valid array, e.g. `[{ "key": "ca_cert", "value": "wifi_ca_cert" }]`.

- **B5 — Command-level `required` omits `wifiConfig`.** `commands/dev_mgmt/set_wifi.json` `required` is only `["command", "requestId"]`, so a `set_wifi` with no `wifiConfig` would pass validation despite having nothing to set [verified-from-schema: commands/dev_mgmt/set_wifi.json required]. **Fix:** add `wifiConfig` to the command-level `required` array.

- **B6 — Response schema omits `response` from `required`.** `response/dev_mgmt/set_wifi.json` `required` is `["command", "requestId", "apiVersion"]`, omitting `response`, even though the device returns `response{code,description}` and sibling response schemas require it [verified-from-schema: response/dev_mgmt/set_wifi.json required] / [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]. **Fix:** add `response` to the response-level `required` array.

- **B7 — Static IP / IPv6 modeled despite "not available" caveat.** The request-schema description states "static IP configuration and IPv6 support is not available in the current API version," yet `cfgWifiPayload.yaml` models a static `ipv4Configuration` (`ipAddress`/`subnetMask`/`gateway`/`dnsServer`/`domainName` with only `enableDhcp` as the DHCP toggle) [verified-from-schema: commands/dev_mgmt/set_wifi.json description vs refrence/payload/cfgWifiPayload.yaml accessPoint.ipv4Configuration]. **Fix:** reconcile — either drop the caveat or mark the static fields as not-yet-supported / DHCP-only.

- **B8 — Command schema ships a partial-`MODIFY` example that violates the `$ref`'d payload schema's `required` arrays — and the device accepts it.** Example #3 in `commands/dev_mgmt/set_wifi.json` (the partial `MODIFY` example) carries `wifiConfig` with only `operation` + `accessPoint{isPreferred, essid}` — it omits `interfaceName` and `enableInterface` (required by `cfgWifiPayload.yaml` top-level `required`) and omits `connect` and `enableSecurity` (required by `accessPoint.required`), i.e. **4 missing-required**. So the command schema bundles an example that fails static validation against the very payload schema it `$ref`s [verified-from-schema: commands/dev_mgmt/set_wifi.json examples #3 lines 57-67 vs refrence/payload/cfgWifiPayload.yaml required + accessPoint.required]. This is a **self-contradiction**: the schema both declares those four fields required and ships an example that lacks them. The runtime sides with the lenient example, not the strict required arrays — the live device **accepted** this exact partial (static-INVALID) payload, instantiated with a real `essid`, and returned `response.code 0` ("Success") [verified-on-device: RFD40 serial 24190525100255]. **Fix:** reconcile the example with the payload schema — either relax the `cfgWifiPayload.yaml` `required` / `accessPoint.required` arrays to match the device's lenient `MODIFY` behavior (e.g. make `interfaceName` / `enableInterface` / `connect` / `enableSecurity` conditional on `operation`), or correct example #3 to include the four required fields.

**Cross-command `apiVersion` inconsistency.** On the same firmware this session, `get_version` and `get_status` returned `apiVersion "V1.21"`, which is **not** in the response enum `[V1.0, V1.1]`, whereas `set_wifi` returned the in-enum value `"V1.1"`. The `apiVersion` value is therefore inconsistent across commands on a single firmware build [verified-on-device: same-session get_version/get_status captures; live_capture.log] / [verified-from-schema: response/dev_mgmt/set_wifi.json apiVersion.enum]. **Fix:** align firmware `apiVersion` reporting or extend the schema enum to cover all values the firmware actually emits.

---

## 8. Operation modes — `CREATE` vs `MODIFY`

`wifiConfig.operation` selects what the command does to the saved-profile store; schema enum `CREATE` | `MODIFY` [verified-from-schema: refrence/payload/cfgWifiPayload.yaml operation.enum]. `operation` is a required field of `wifiConfig` [verified-from-schema: refrence/payload/cfgWifiPayload.yaml required]. Both modes use the same `wifiConfig` schema (required: `interfaceName`, `enableInterface`, `operation`, `accessPoint`) [verified-from-schema: refrence/payload/cfgWifiPayload.yaml required] and the same status-only response envelope (`command` / `requestId` / `apiVersion` / `response.code` / `response.description`) [verified-from-schema: response/dev_mgmt/set_wifi.json required]. A `MODIFY` need not repeat the full payload: the command schema's own `MODIFY` example carries only `operation` + `accessPoint{isPreferred, essid}` [verified-from-schema: commands/dev_mgmt/set_wifi.json examples lines 57-67]. The `essid` is the access-point network-name field [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.essid.description]; the live run further showed `MODIFY` matched the existing profile by `essid` (profile count unchanged) [inferred-from-live: MODIFY matched existing profile by essid, count 2 -> 2].

| Operation | Effect | Target selection | Live result this session |
|-----------|--------|------------------|--------------------------|
| `CREATE` | Adds a new saved profile to the store. | New `essid`. | Grew profiles 1 -> 2 (added `ALM_MOTO_E70_FUSION`); code 0; device stayed on Airtel. [verified-on-device: RFD40 serial 24190525100255] |
| `MODIFY` | Updates an existing saved profile in place (no new entry). | Existing profile matched by `essid`. | Kept profiles 2 -> 2 (`ALM_MOTO_E70_FUSION` updated in place, not added); code 0; device stayed on Airtel. [verified-on-device: RFD40 serial 24190525100255] |

The live-result column is the direct CREATE-vs-MODIFY discriminator: CREATE increases the saved-profile count, MODIFY leaves it unchanged. [verified-on-device: RFD40 serial 24190525100255]

### `CREATE` — live-verified

The prior turn's `CREATE` added profile `ALM_MOTO_E70_FUSION` (WPA2Personal, `connect:false`); the device returned `response.code` 0 and the saved-profile count grew 1 -> 2 with no network switch (it stayed connected to `Airtel_The_LAN_Before_Time`). [verified-on-device: RFD40 serial 24190525100255]

### `MODIFY` — live-verified

A safe `MODIFY` was submitted this turn: `operation: MODIFY`, `accessPoint.connect: false`, `essid: ALM_MOTO_E70_FUSION`, `securityType: WPA2Personal`. The request pre-validated as schema-VALID against the request schema. [verified-from-schema: commands/dev_mgmt/set_wifi.json + refrence/payload/cfgWifiPayload.yaml]

The device returned a status-only envelope — no config echo and no credential in the response. The on-device fact is `response.code: 0` [verified-on-device: RFD40 serial 24190525100255]. The envelope's `requestId` was echoed (`abc123`) [verified-from-test-harness: requestId is harness-supplied request identity], and `apiVersion: "V1.1"` (in-enum) with `response.description: "Success"` are schema/envelope facts [verified-from-schema: response/dev_mgmt/set_wifi.json apiVersion.enum + response.yaml code]. The full envelope validated against the response schema. [verified-from-schema: response/dev_mgmt/set_wifi.json]

`get_wifi` before and after the call showed the saved-profile set unchanged — `[Airtel_The_LAN_Before_Time, ALM_MOTO_E70_FUSION]`, count 2 -> 2 — proving the operation updated the existing profile in place rather than adding one (the MODIFY-vs-CREATE proof). The device remained connected to `Airtel_The_LAN_Before_Time` throughout, so `connect:false` was honored and the MQTT control session was preserved. [verified-on-device: RFD40 serial 24190525100255]

Note: credential and security changes applied by a `MODIFY` are not observable via `get_wifi` — passwords are masked and the interface-level fields were unchanged here — so the proof that the `MODIFY` was accepted is `response.code` 0 plus an unchanged profile count (update, not add). [verified-on-device: RFD40 serial 24190525100255]

Masked request example (real credential withheld):

```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "wifiConfig": {
    "interfaceName": "wlan0",
    "enableInterface": true,
    "operation": "MODIFY",
    "accessPoint": {
      "connect": false,
      "isPreferred": false,
      "autoConn": true,
      "essid": "ALM_MOTO_E70_FUSION",
      "enableSecurity": true,
      "security": {
        "securityType": "WPA2Personal",
        "securityDetails": {
          "WPA2Personal": {
            "password": "********"
          }
        }
      }
    }
  }
}
```

On-wire topics for this command on this deployment: publish the request to `zebra/MDM/clients/cmnd/RFD40-24190525100255` and read the response from `zebra/MDM/clients/resp/RFD40-24190525100255` (wire form `{tenantId}/{base}/{serial}`). [verified-from-test-harness: deployment topology — Mosquitto 192.168.1.6:1883, endpoint MDM_REMOTE, serial 24190525100255]

(Operational note: the live run was briefly blocked when a mains power cut took the Airtel AP down and the laptop roamed to a hotspot, segmenting it from the device; once the LAN recovered and the laptop regained the broker at 192.168.1.6, the `MODIFY` completed cleanly. [verified-from-test-harness: deployment topology])

### `MODIFY` (set preferred AP) — partial payload, live-verified

This turn exercised a **partial "set preferred AP" `MODIFY`**: the operator-provided payload carries only `operation` plus `accessPoint{isPreferred, essid}`, with **no `password` field** (nothing to mask). It is the command schema's own example #3 instantiated with a real `essid` — it differs from `commands/dev_mgmt/set_wifi.json` example #3 only in `essid` (`Airtel_The_LAN_Before_Time` vs the example's `TestAP1`) [verified-from-schema: commands/dev_mgmt/set_wifi.json examples #3 lines 57-67]. The exact request sent, verbatim:

```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "wifiConfig": {
    "operation": "MODIFY",
    "accessPoint": {
      "isPreferred": true,
      "essid": "Airtel_The_LAN_Before_Time"
    }
  }
}
```

**Static validation — command-level VALID, payload-schema INVALID.** The payload satisfies the command schema (`required` is only `["command","requestId"]`; `wifiConfig` is not required at the command level), so it is **VALID against `commands/dev_mgmt/set_wifi.json`** [verified-from-schema: commands/dev_mgmt/set_wifi.json required]. But against the `$ref`'d payload schema it is **INVALID with 4 missing-required**: `wifiConfig` omits `interfaceName` and `enableInterface`, and `accessPoint` omits `connect` and `enableSecurity` [verified-from-schema: refrence/payload/cfgWifiPayload.yaml required + accessPoint.required]. Example #3 itself fails the same way — see conformance note **B8** (schema self-contradiction).

**Live result — device sided with the lenient example.** The device **accepted** the partial (payload-schema-INVALID) request and returned a status-only envelope; the on-device fact is `response.code: 0` [verified-on-device: RFD40 serial 24190525100255]. The envelope's `requestId` was echoed (`abc123`) [verified-from-test-harness: requestId is harness-supplied request identity], and `apiVersion: "V1.1"` (in the response enum `[V1.0, V1.1]`) with `response.description: "Success"` are schema/envelope facts; the full envelope validated against the response schema [verified-from-schema: response/dev_mgmt/set_wifi.json apiVersion.enum + refrence/response/response.yaml code]:

```json
{
  "command": "set_wifi",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

**MODIFY not CREATE (count 2 -> 2).** `get_wifi` BEFORE and AFTER both showed the same two saved profiles `[Airtel_The_LAN_Before_Time, ALM_MOTO_E70_FUSION]`, connected to `Airtel_The_LAN_Before_Time`; the saved-profile count stayed **2 -> 2**, proving the operation updated a profile in place rather than adding one (the MODIFY-vs-CREATE discriminator) [verified-on-device: RFD40 serial 24190525100255]. That `MODIFY` selected the existing profile by `essid` (the schema does not state the match key) is the same essid-keyed-match inference already noted in §8's intro — see that paragraph [inferred-from-live: MODIFY matched existing profile by essid, count 2 -> 2].

**`isPreferred` is observable.** `get_wifi` does expose `isPreferred` (it is a readable field in `interfaceDetails.accessPoint`), and `Airtel_The_LAN_Before_Time`'s value read `true` both BEFORE and AFTER this call [verified-on-device: RFD40 serial 24190525100255].

**Idempotency honesty note.** `Airtel_The_LAN_Before_Time` was **already `isPreferred: true` before this call**, so this run is **idempotent** with respect to the preferred flag: it did **not** flip `isPreferred` from `false` to `true`. The acceptance of the set-preferred `MODIFY` is proven by `response.code 0` plus the unchanged profile count (update, not add) — **not** by an observed `false -> true` transition; the preferred flag was already `true` and remained `true` [verified-on-device: RFD40 serial 24190525100255].

**Session preserved.** The target `essid` is the AP the device is already connected to and which carries the MDM session; the payload has **no `connect` field** and selects **no switch to a different network**, so the device remained connected to `Airtel_The_LAN_Before_Time` throughout and the MQTT control session was not disrupted — this is the safest possible `MODIFY` (it reinforces the current link) [verified-on-device: RFD40 serial 24190525100255] [verified-from-test-harness: device manages itself over Airtel_The_LAN_Before_Time to broker 192.168.1.6:1883, endpoint MDM_REMOTE, serial 24190525100255].

### ⚠️ `connect:true` safety note

`accessPoint.connect` controls whether the device connects to the profile or merely saves it: if `true`, it disconnects the currently connected profile and connects to the specified one; if `false`, it just saves the profile. [verified-from-schema: refrence/payload/cfgWifiPayload.yaml accessPoint.connect.description]

On this deployment the device manages itself over the same Wi-Fi (`Airtel_The_LAN_Before_Time`) that carries the MDM session to the broker at 192.168.1.6:1883, so `connect:true` to a different target would disconnect from Airtel, leave the broker LAN, and sever the MQTT control channel. [verified-from-test-harness: deployment topology] The originally drafted `MODIFY` used `connect:true` against a typo ESSID (`LM_MOTO_E70_FUSION`) that does not exist as a reachable AP; running it would have disconnected the sled and stranded it off the control channel, so it was correctly not run. Use `connect:false` whenever managing a profile over the same Wi-Fi that carries the MDM session, and reverse an unwanted profile with `delete_wifi_profile` (a real command in this command set) rather than switching onto it. [verified-from-test-harness: deployment topology]
