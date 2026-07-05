# Command: get_wifi

## 1. Intent & Objective

`get_wifi` is a read-only device-management command in the Zebra Handheld RFID IOTC MQTT API (RFD40/RFD90, MQTT-only). It retrieves the Wi-Fi profile(s) saved on the device together with their current connection status and configuration. The returned record set describes, per wireless interface:

- **Interface details** — interface name, hostname, MAC address, and (per schema) an interface-level `ENABLED`/`DISABLED` status.
- **Access point** — ESSID, association status (`CONNECTED`/`DISCONNECTED`), security type, and whether the profile is preferred.
- **IPv4 configuration** — address, subnet mask, gateway, DHCP flag, DNS server, domain name.
- **IPv6 configuration** — schema-defined (address, prefix, gateway, auto flag, DNS, domain); not returned by the live device.
- **Security details** — credential/protocol block keyed by the security type (`WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise`). The device masks the credential value.

The command returns a **list** of profiles under `wifiProfiles.wifiConfig[]` [verified-from-schema: refrence/response/getWifiResponse.yaml `wifiConfig` is `type: array` of `wifiResponseSoti.yaml`]. The schema title/description state it "is used to retrieve wifi configuration details" and "get all the wifi profiles saved in device" [verified-from-schema: commands/dev_mgmt/get_wifi.json `description`, `command.description`].

**When it is used:** verifying wireless connectivity and IP configuration on a handheld, fleet/compliance audits of which SSID a device is associated to, and pre-inventory connectivity checks before issuing radio operations.

**Architectural context:** a read-only `dev_mgmt` command issued over the MDM/MGMT MQTT endpoint. The request carries no payload arguments beyond `command` and `requestId`; the device responds on the matching response topic with the profile list plus a standard `response{code,description}` status object.

**Credential handling:** the device masks secrets. In the live capture, `securityDetails.WPA2Personal.password` was returned as the literal mask `"XXXXXXXX"` (not a real secret) [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883].

This command was exercised live this run against a physical RFD40 (model `RFD40`, serial `24190525100255`) and returned `response.code = 0` ("Success") [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883].

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `{EP_TYPE}/clients/cmnd` (base `MDM/clients/cmnd`) | n/s | n/s |
| Subscribe (Response) | `{EP_TYPE}/clients/resp` (base `MDM/clients/resp`) | n/s | n/s |

On-wire topics observed this run: `zebra/MDM/clients/cmnd/RFD40-24190525100255` (request) and `zebra/MDM/clients/resp/RFD40-24190525100255` (response). The `zebra/...` tenant prefix and the `RFD40-<serial>` suffix wrapping are harness/transport configuration, not fields in the response payload [verified-from-test-harness: endpoint MDM_REMOTE, broker 192.168.1.6:1883 plain MQTT anonymous, topic wrapping `zebra/MDM/clients/{cmnd|resp}/RFD40-24190525100255`; tenant=`zebra`, serial=`24190525100255`].

QoS and retain are not specified per-operation in the command/response schemas; they are governed by the endpoint/broker MQTT parameters (e.g. `cfgEndpointPayload.mqttParams`), so they are marked **n/s** (not specified) for this operation [verified-from-schema: commands/dev_mgmt/get_wifi.json and response/dev_mgmt/get_wifi.json carry no QoS/retain fields].

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | Required | example `"get_wifi"` (no enum) | Command issued to get all the Wi-Fi profiles saved in the device [verified-from-schema: commands/dev_mgmt/get_wifi.json `properties.command`]. |
| `requestId` | root | string | Required | type `string` only (no enum, no pattern) | Unique identifier for the request, for tracking/debugging; echoed back in the response [verified-from-schema: commands/dev_mgmt/get_wifi.json `properties.requestId`]. |

The request schema defines exactly these two properties and marks both as `required`; there is **no** `payload` object and **no** `auth.user`/`auth.password` block [verified-from-schema: commands/dev_mgmt/get_wifi.json `properties`, `required`].

**Live exercise:** the operator envelope `{"command":"get_wifi","requestId":"abc123"}` was sent. It is schema-VALID against the request schema, and the device echoed `requestId":"abc123"` in the response [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]. The reading was captured with the robust client `mqtt_live_client.py` (unique clientId + attach preflight + retries) to obtain a reliable single response [verified-from-test-harness: capture client mqtt_live_client.py].

### JSON Request Example
```json
{ "command": "get_wifi", "requestId": "abc123" }
```

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | root | string | Required | example `"get_wifi"` | [verified-on-device] returned `"get_wifi"` | Echo of the executed command. |
| `requestId` | root | string | Required | (no enum) | [verified-on-device] returned `"abc123"` | Echo of the original request id. |
| `apiVersion` | root | string | Required | enum `[V1.0, V1.1]` | [verified-on-device] returned `"V1.1"` (in enum) | API version of the response payload [verified-from-schema: response/dev_mgmt/get_wifi.json `properties.apiVersion.enum`]. |
| `wifiProfiles` | root | object | Optional (not in `required`) | `$ref getWifiResponse.yaml` | [verified-on-device] present | Wrapper holding the profile list [verified-from-schema: response/dev_mgmt/get_wifi.json `properties.wifiProfiles`]. |
| `wifiProfiles.wifiConfig` | wifiProfiles | array | Optional | items `$ref wifiResponseSoti.yaml` | [verified-on-device] 1 element | List of Wi-Fi profiles [verified-from-schema: getWifiResponse.yaml `wifiConfig`]. |
| `response` | root | object | Required | `$ref response.yaml` `{code,description}` | [verified-on-device] `{code:0,description:"Success"}` | Standard status object [verified-from-schema: response/dev_mgmt/get_wifi.json `properties.response`]. |
| `response.code` | response | integer | Required | min 0, max 30 | [verified-on-device] `0` | Result code [verified-from-schema: response.yaml `code`]. |
| `response.description` | response | string | Required | example `"Success"` | [verified-on-device] `"Success"` | Result description [verified-from-schema: response.yaml `description`]. |

Top-level `required = [command, requestId, apiVersion, response]` (note: `wifiProfiles` is **not** required) [verified-from-schema: response/dev_mgmt/get_wifi.json `required`].

**`wifiProfiles.wifiConfig[].interfaceDetails`** (object) — schema `required = [interfaceName, status, hostname, macAddress]` [verified-from-schema: wifiResponseSoti.yaml `interfaceDetails.required`]:

| Field | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|------|-------------------|---------------------------|------------|-------------|
| `interfaceName` | string | Required | example `wlan0` | [verified-on-device] `"wlan0"` | Network interface name. |
| `status` | string | Required (schema) | enum `[ENABLED, DISABLED]` | [verified-from-schema: wifiResponseSoti.yaml `interfaceDetails.required`/`status.enum`] — OMITTED on-device (see D1) | Interface-level status. The schema requires it; the live device did **not** return it [verified-from-schema: wifiResponseSoti.yaml `interfaceDetails.status`]. |
| `hostname` | string | Required | example `RFD40S123` | [verified-on-device] `"RFD40-24190525100255"` | Device hostname. |
| `macAddress` | string | Required | example `E0-D0-45-3D-38-1D` | [verified-on-device] `"8C:D5:4A:1C:98:24"` | Interface MAC address (device used colon separators). |

**`interfaceDetails.accessPoint`** (object) — schema `required = [essid, status, securityType, isPreferred]` [verified-from-schema: wifiResponseSoti.yaml `accessPoint.required`]:

| Field | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|------|-------------------|---------------------------|------------|-------------|
| `essid` | string | Required | example `Zwireless` | [verified-on-device] `"Airtel_The_LAN_Before_Time"` | Access point network name. |
| `status` | string | Required | enum `[CONNECTED, DISCONNECTED]` | [verified-on-device] `"CONNECTED"` | Association status. |
| `securityType` | string | Required | enum `[WPA2personal, WPA3Personal, WPA2Enterprise, WPA3Enterprise]` | [verified-on-device] `"WPA2Personal"` — **NOT in enum, see D2/S1** | Security type. Device returns correctly-cased `WPA2Personal`; schema enum has typo `WPA2personal` [verified-from-schema: wifiResponseSoti.yaml `accessPoint.securityType.enum`]. |
| `isPreferred` | boolean | Required | — | [verified-on-device] `false` | Whether this profile is preferred. |
| `autoConn` | boolean | Optional | deprecated (kept for backward compatibility) | [verified-on-device] not returned | Deprecated field [verified-from-schema: wifiResponseSoti.yaml `accessPoint.autoConn`]. |

**`interfaceDetails.ipv4Configuration`** (object) — no `required` list in schema; all optional [verified-from-schema: wifiResponseSoti.yaml `ipv4Configuration`]:

| Field | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|------|-------------------|---------------------------|------------|-------------|
| `ipAddress` | string | Optional | format `ipv4` | [verified-on-device] `"192.168.1.5"` | Device IPv4 address. |
| `subnetMask` | string | Optional | format `ipv4` | [verified-on-device] `"255.255.255.0"` | Subnet mask. |
| `gateway` | string | Optional | format `ipv4` | [verified-on-device] `"192.168.1.1"` | IPv4 gateway. |
| `enableDhcp` | boolean | Optional | type boolean (example is string `"enabled"` — see S2) | [verified-on-device] `true` | DHCP flag; device returned boolean `true` (correct) [verified-from-schema: wifiResponseSoti.yaml `ipv4Configuration.enableDhcp`]. |
| `dnsServer` | string | Optional | format `ipv4` | [verified-on-device] `"192.168.1.1"` | DNS server. |
| `domainName` | string | Optional | — | [verified-on-device] `"zebra.com"` | Domain name. |

**`interfaceDetails.ipv6Configuration`** (object) — schema-defined, **not returned live** [verified-on-device] absent. Fields: `ipAddress` (format ipv6), `prefix` (integer), `gateway` (format ipv6), `enableAuto` (boolean with string enum `[enabled, disabled]` — see S3), `dnsServer` (format ipv6), `domainName` (string) [verified-from-schema: wifiResponseSoti.yaml `ipv6Configuration`].

**`interfaceDetails.securityDetails`** (object) — credential block keyed by security type [verified-from-schema: wifiResponseSoti.yaml `securityDetails`]:

| Key | Type | Notable Fields / Constraints | Provenance | Description |
|-----|------|------------------------------|------------|-------------|
| `WPA2Personal` | object | `password` (string, format password) | [verified-on-device] `{password:"XXXXXXXX"}` — masked | WPA2-Personal credentials. Device masked the password. |
| `WPA3Personal` | object | `password` (string, format password) | [verified-from-schema] not returned live | WPA3-Personal credentials. |
| `WPA2Enterprise` | object | `authentication[tls,ttls,peap]`, `innerAuthentication[none,tls,mschapv2]`, `identity`, `anonymousIdentity`, `password`, `passphrase`, `certificate` (array; bad example — S5), `protocol[WPA2_Enterprise_CCMP]` | [verified-from-schema] not returned live | WPA2-Enterprise config. |
| `WPA3Enterprise` | object | same auth fields, `certificate` (array; bad example — S5), `protocol` (5-value enum; `maxLength:3` contradiction — S4) | [verified-from-schema] not returned live | WPA3-Enterprise config. |

**Live discrepancies flagged:** D1 — interface-level `status` (`ENABLED`/`DISABLED`) is required by the schema but was **omitted** by the device. D2 — `accessPoint.securityType` value `"WPA2Personal"` is **not** in the schema enum because the schema member is mistyped as `WPA2personal` (see Section 6). The `WPA2Personal.password` value `"XXXXXXXX"` is a device mask, not a real secret.

### JSON Response Example (LIVE, verbatim)
```json
{
  "command": "get_wifi",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "wifiProfiles": {
    "wifiConfig": [
      {
        "interfaceDetails": {
          "interfaceName": "wlan0",
          "hostname": "RFD40-24190525100255",
          "macAddress": "8C:D5:4A:1C:98:24",
          "accessPoint": {
            "essid": "Airtel_The_LAN_Before_Time",
            "status": "CONNECTED",
            "securityType": "WPA2Personal",
            "isPreferred": false
          },
          "ipv4Configuration": {
            "ipAddress": "192.168.1.5",
            "subnetMask": "255.255.255.0",
            "gateway": "192.168.1.1",
            "enableDhcp": true,
            "dnsServer": "192.168.1.1",
            "domainName": "zebra.com"
          },
          "securityDetails": {
            "WPA2Personal": {
              "password": "XXXXXXXX"
            }
          }
        }
      }
    ]
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

## 5. Associated Error Codes

| Code | Status | Name | Triggering Condition | Provenance |
|------|--------|------|----------------------|------------|
| 0 | Success | Success | Wi-Fi profiles retrieved successfully | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] returned `{code:0,description:"Success"}` |
| 7 | Interface is not available | Interface is not available | Wi-Fi interface disabled/unavailable; the response schema's own example #4 pairs `code 7` with a `DISABLED` interface and no access point | [verified-from-schema: response/dev_mgmt/get_wifi.json `examples`[3]; response.yaml code 7]; trigger binding [firmware-only-unknown] |
| 20 | Wifi is not supported | Wifi is not supported | Representable hypothesis: command issued on a device/config without Wi-Fi support | [verified-from-schema: response.yaml code 20]; trigger binding [firmware-only-unknown] |
| 3 | Not able to retrieve information | Not able to retrieve information | Representable hypothesis: device could not read the Wi-Fi configuration | [verified-from-schema: response.yaml code 3]; trigger binding [firmware-only-unknown] |

Only `code 0` was observed on-device. All other codes and their exact triggering conditions are [firmware-only-unknown]. Codes are constrained to the 0–30 range of the standard table [verified-from-schema: response.yaml `code` `minimum:0`, `maximum:30`].

## 6. Conformance & Spec Notes (this command)

The reading was obtained with the robust capture client `mqtt_live_client.py` (unique clientId + attach preflight + retries) to ensure a single, reliable response was captured [verified-from-test-harness: mqtt_live_client.py].

### Live-response discrepancies (D) — device output vs schema

- **D1 — `interfaceDetails.status` required but omitted.** `wifiResponseSoti.yaml` lists `interfaceDetails.required = [interfaceName, status, hostname, macAddress]` with `status` enum `[ENABLED, DISABLED]`. The live device returned `interfaceDetails` **without** any top-level interface `status` field. It carries `accessPoint.status = "CONNECTED"` but no interface-level ENABLED/DISABLED status. [verified-on-device] device omits the field vs [verified-from-schema: wifiResponseSoti.yaml `interfaceDetails.required`/`status.enum`]. **Recommended fix:** either have firmware emit the interface-level `status`, or relax the schema to make `interfaceDetails.status` optional for the handheld profile.

- **D2 — `accessPoint.securityType` value not in enum.** The device returned `"WPA2Personal"`, which is **not** a member of the schema enum `[WPA2personal, WPA3Personal, WPA2Enterprise, WPA3Enterprise]`. The mismatch is caused by the schema typo (see S1); the device value is the correctly-cased one and also matches the `securityDetails` key `WPA2Personal`. [verified-on-device] device value vs [verified-from-schema: wifiResponseSoti.yaml `accessPoint.securityType.enum`]. **Recommended fix:** correct the enum member (S1), not the device.

> Note: a naive full-chain validator may report VALID because these constraints sit under a `$ref`-inside-array-`items`, and some resolvers fail to propagate `required`/`enum`. Direct validation of the `wifiConfig[0]` item against `wifiResponseSoti.yaml` is authoritative and surfaces D1 and D2.

### Schema-quality defects (S) — bugs in the schema itself

- **S1 — `securityType` enum typo.** `wifiResponseSoti.yaml accessPoint.securityType.enum` contains `"WPA2personal"` (lowercase `p`), inconsistent with the other members (`WPA3Personal`, etc.), with the `securityDetails` key `WPA2Personal`, and with the device output. This is the schema-side root cause of D2. [verified-from-schema: wifiResponseSoti.yaml line ~50–54]. **Fix:** change `WPA2personal` → `WPA2Personal`.

- **S2 — `enableDhcp` boolean with string example.** `ipv4Configuration.enableDhcp` is `type: boolean` but its `example` is the string `"enabled"` (type-invalid example). The live device correctly returned boolean `true`. [verified-from-schema: wifiResponseSoti.yaml `ipv4Configuration.enableDhcp`]. **Fix:** change the example to `true`/`false`.

- **S3 — `enableAuto` boolean + string enum contradiction.** `ipv6Configuration.enableAuto` is `type: boolean` but carries `enum: [enabled, disabled]` (strings) plus `example: "enabled"` — a boolean cannot satisfy a string enum. Not exercised live (no `ipv6Configuration` returned). [verified-from-schema: wifiResponseSoti.yaml `ipv6Configuration.enableAuto`]. **Fix:** drop the enum (use boolean) or change type to string.

- **S4 — `WPA3Enterprise.protocol` maxLength contradicts enum.** `protocol` has `maxLength: 3` yet its enum values are 20–35 characters (e.g. `WPA3_Enterprise_GCMP_256_SHA256`), making every enum value invalid. Not exercised live. [verified-from-schema: wifiResponseSoti.yaml `WPA3Enterprise.protocol`]. **Fix:** remove `maxLength: 3` (or set it to the actual max length).

- **S5 — `certificate` array with string example.** `WPA2Enterprise.certificate` and `WPA3Enterprise.certificate` are `type: array` but carry `example: "ap1wpa2e"` (a scalar string, not an array of cert objects). Not exercised live. [verified-from-schema: wifiResponseSoti.yaml `WPA2Enterprise.certificate`/`WPA3Enterprise.certificate`]. **Fix:** replace the example with an array of `{key,value}` objects.

- **S6 — Response examples are shape-inconsistent.** In `response/dev_mgmt/get_wifi.json`, examples[0] and examples[3] place the payload under a top-level `wifiConfig` property that is **not** defined in the response schema (which defines only `wifiProfiles`), whereas examples[1] and examples[2] correctly use `wifiProfiles.wifiConfig[]` (matching the live shape). Status casing also varies across examples (`Enabled` / `ENABLED` / `DISABLED`, and `Connected`), and the Title-case values `Enabled`/`Connected` do not match the `ENABLED`/`DISABLED` and `CONNECTED`/`DISCONNECTED` enums. [verified-from-schema: response/dev_mgmt/get_wifi.json `examples`]. **Fix:** normalize all examples to `wifiProfiles.wifiConfig[]` and to the uppercase enum values.

- **S7 — SOTI chain + orphan coexistence.** The `get_wifi` response refs the SOTI chain `getWifiResponse.yaml -> wifiResponseSoti.yaml`, while an orphan response file `response/dev_mgmt/get_wifi_response_soti.json` also exists (plain/SOTI coexistence). [verified-from-schema: response/dev_mgmt/get_wifi.json `wifiProfiles.$ref`]. **Fix:** consolidate to a single canonical response definition and remove or wire up the orphan file.

### Cross-command apiVersion note

On the same firmware/session, `get_version` and `get_status` returned `apiVersion = "V1.21"` (NOT in the `[V1.0, V1.1]` enum), whereas `get_wifi` returned the in-enum `"V1.1"`; `apiVersion` is therefore inconsistent across commands on one firmware build [verified-on-device: same-session get_version/get_status/get_wifi captures; live_capture.log]. **Recommended fix:** unify firmware `apiVersion` reporting and/or extend the enum to include the actually-emitted values (e.g. `V1.21`).
