---
id: wifi
title: How to configure Wi-Fi profiles
sidebar_label: How to configure Wi-Fi profiles
description: "Configure Wi-Fi profiles on an IOTC reader via set_wifi/get_wifi/delete_wifi_profile: the wifiConfig/accessPoint/securityDetails shape, WPA2/WPA3 Personal and Enterprise (tls/ttls/peap), the 10-profile cap, CREATE-fails-if-exists, and the SSID error codes."
sidebar_custom_props: { emoji: "📶" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder, Fleet Operator · **Time:** ~5 min · **Ties to:** Network Configuration sub-tag of the API Reference

This guide shows you how to configure Wi-Fi profiles on a handheld reader over MQTT using three commands: [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) to read the current state, [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi) to create or modify a profile, and [`delete_wifi_profile`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-delete-wifi-profile) to remove one. Applies to RFD40 Premium, RFD40 Premium Plus, RFD9030, and RFD9090; supported API versions `V1.0` and `V1.1`.

On a handheld sled, Wi-Fi is almost always the only network path — there is typically no Ethernet port (see [How to check Ethernet status](/infrastructure/network/ethernet)), so a working Wi-Fi profile is what carries the MQTT session that delivers commands and tag data. `set_wifi` currently supports **IPv4 with DHCP only**; static IPv4 and IPv6 are not available in the current API version.

### Where to send these commands

Publish each command to the reader's MGMT command topic and subscribe to its response topic *before* publishing, substituting the reader serial number (`{SN}`):

- **Command topic:** `zebra/rfid/{SN}/cmd/MGMT`
- **Response topic:** `zebra/rfid/{SN}/rsp/MGMT`

The reader echoes the original `command` and `requestId` in its response and adds a `response` object (`{code, description}`). Code `0` is success; any non-zero code is a failure with a specific cause — see [Response codes](#response-codes).

:::caution Idempotency is per-command
`get_wifi` is read-only and **idempotent**: if you do not receive a response, retry with the *same* `requestId`. `set_wifi` and `delete_wifi_profile` are **state-changing** and are *not* idempotent — if you must retry, issue a **new** `requestId` and confirm the result with `get_wifi` first to avoid, for example, a `CREATE` failing with code 18 because the previous attempt actually succeeded.
:::

### View the current configuration

Always read before you write. `get_wifi` requires only `command` and `requestId`:

```json
{"command": "get_wifi", "requestId": "wifi-1"}
```

The response lists every saved profile under `wifiProfiles.wifiConfig[]`, each with its ESSID, security type, preference flag, and connection status. The currently connected profile also carries `interfaceName`, `macAddress`, `hostname`, and `ipv4Configuration`; disconnected saved profiles carry only `accessPoint` and (for secured networks) `securityDetails`.

```json
{
  "command": "get_wifi",
  "requestId": "wifi-1",
  "apiVersion": "V1.1",
  "wifiProfiles": {
    "wifiConfig": [
      {
        "interfaceDetails": {
          "interfaceName": "wlan0",
          "status": "ENABLED",
          "hostname": "RFD40-22326520100477",
          "macAddress": "48:A4:93:BD:4A:FC",
          "accessPoint": {
            "essid": "WarehouseWiFi",
            "status": "CONNECTED",
            "securityType": "WPA2Personal",
            "isPreferred": true
          },
          "ipv4Configuration": {
            "ipAddress": "192.168.0.104",
            "subnetMask": "255.255.255.0",
            "gateway": "192.168.0.1",
            "enableDhcp": true,
            "dnsServer": "192.168.0.1",
            "domainName": "zebra.com"
          }
        }
      }
    ]
  },
  "response": {"code": 0, "description": "Success"}
}
```

The fields worth checking after every change:

| Field | What to check | Why it matters |
|---|---|---|
| `accessPoint.status` | Is the desired profile `CONNECTED`? | Confirms the reader is actively using that network. One of `CONNECTED` / `DISCONNECTED`. |
| `accessPoint.essid` | Is it the correct network? | Multiple profiles can be saved — verify the active one is the one you expect. |
| `accessPoint.isPreferred` | Is the preferred profile set correctly? | The preferred profile is the one the reader always tries when it is in range. |
| `accessPoint.securityType` | Does the security type match the AP? | A mismatch prevents association even when the password is correct. |
| `ipv4Configuration.ipAddress` | Did the device receive a valid IP? | `CONNECTED` but no IP means DHCP failed or the network is unreachable. |
| `ipv4Configuration.enableDhcp` | DHCP or static? | Determines how the address is assigned (the current API assigns via DHCP). |

If the reader has no Wi-Fi radio at all, `set_wifi` returns **code 20, "Wifi is not supported"** (`get_wifi` does not return code 20 — it reports only codes `0` and `3`).

### Create a new Wi-Fi profile: WPA2Personal

`set_wifi` nests the profile under `wifiConfig.accessPoint`, and the credentials under `security.securityDetails.<securityType>`. For a `CREATE`, the `accessPoint` block requires `essid`, `connect`, `isPreferred`, and `enableSecurity`; `operation`, `interfaceName`, and `enableInterface` are required on `wifiConfig`:

```json
{
  "command": "set_wifi",
  "requestId": "wifi-2",
  "wifiConfig": {
    "interfaceName": "wlan0",
    "enableInterface": true,
    "operation": "CREATE",
    "accessPoint": {
      "essid": "WarehouseWiFi",
      "connect": true,
      "isPreferred": true,
      "enableSecurity": true,
      "ipv4Configuration": {"enableDhcp": true},
      "security": {
        "securityType": "WPA2Personal",
        "securityDetails": {
          "WPA2Personal": {"password": "Wareh0use!2026"}
        }
      }
    }
  }
}
```

A successful `set_wifi` returns the minimal acknowledgement — there is no echo of the profile in the response, so verify with `get_wifi`:

```json
{
  "command": "set_wifi",
  "requestId": "wifi-2",
  "apiVersion": "V1.1",
  "response": {"code": 0, "description": "Success"}
}
```

**Security types:** `WPA2Personal`, `WPA3Personal`, `WPA2Enterprise`, `WPA3Enterprise`. For WPA3Personal, swap `securityType` and the `securityDetails` key to `WPA3Personal` — the `{password}` shape is identical:

```json
"security": {
  "securityType": "WPA3Personal",
  "securityDetails": {
    "WPA3Personal": {"password": "Wareh0use!2026"}
  }
}
```

| `securityType` | Mechanism | Required credentials |
|---|---|---|
| `WPA2Personal` | WPA2 Pre-Shared Key (PSK). Standard password-protected office Wi-Fi. | `password` |
| `WPA3Personal` | WPA3 with Simultaneous Authentication of Equals (SAE). Stronger than WPA2 PSK. | `password` |
| `WPA2Enterprise` | WPA2 with 802.1X / RADIUS. Corporate and institutional networks. | `authentication` (`tls` \| `ttls` \| `peap`) plus identity/certificate fields |
| `WPA3Enterprise` | WPA3 with 802.1X / RADIUS. Higher-assurance enterprise environments. | `authentication` (`tls` \| `ttls` \| `peap`) plus identity/certificate fields |

#### `accessPoint` field reference

| Field | Type | Required (CREATE) | Meaning |
|---|---|---|---|
| `essid` | string | Yes | The network name. **Case-sensitive** — a mismatch creates an unreachable profile on `CREATE`, or returns code 15 on `MODIFY`. |
| `connect` | boolean | Yes | `true` disconnects the current profile and connects to this one immediately; `false` saves the profile without switching (use for pre-provisioning). |
| `isPreferred` | boolean | Yes | `true` makes the reader always attempt this ESSID when in range. |
| `enableSecurity` | boolean | Yes | Whether the AP uses security. Set `true` for any WPA2/WPA3 network. |
| `autoConn` | boolean | No | Reserved for backward compatibility; will be removed in a future version. Omit on new profiles. |
| `ipv4Configuration` | object | No | DHCP/addressing options. Use `{"enableDhcp": true}` — the current API assigns IPv4 by DHCP only. |
| `security` | object | When secured | Holds `securityType` and `securityDetails` (see below). |

### Create a new profile: WPA2Enterprise (EAP-TLS)

Certificates must already be installed via [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate) (type `wifi`; see [Certificate management](/infrastructure/certificate-management)) — reference them by their installed logical name in each `certificate` entry's `value`. Each `certificate` item is a `{key, value}` pair where `key` is one of `ca_cert`, `client_cert`, `client_key`, or `cert_key_password`. EAP-TLS uses all three of the first kinds (CA, client cert, client key); set `authentication: "tls"`:

```json
{
  "command": "set_wifi",
  "requestId": "wifi-3",
  "wifiConfig": {
    "interfaceName": "wlan0",
    "enableInterface": true,
    "operation": "CREATE",
    "accessPoint": {
      "essid": "EnterpriseWiFi",
      "connect": false,
      "isPreferred": true,
      "enableSecurity": true,
      "security": {
        "securityType": "WPA2Enterprise",
        "securityDetails": {
          "WPA2Enterprise": {
            "authentication": "tls",
            "identity": "rfid-fleet@corp.example",
            "certificate": [
              {"key": "ca_cert", "value": "enterprise-ca"},
              {"key": "client_cert", "value": "enterprise-client"},
              {"key": "client_key", "value": "enterprise-client-key"}
            ],
            "protocol": "WPA2_Enterprise_CCMP"
          }
        }
      }
    }
  }
}
```

For username/password EAP (PEAP-MSCHAPv2 or TTLS-MSCHAPv2), install only the RADIUS server CA and supply `identity` + `password` instead of a client cert/key. Set the outer `authentication` and the optional `innerAuthentication`:

```json
"securityDetails": {
  "WPA2Enterprise": {
    "authentication": "peap",
    "innerAuthentication": "mschapv2",
    "identity": "rfid-fleet@corp.example",
    "anonymousIdentity": "anonymous@corp.example",
    "password": "R@dius-Secret-2026",
    "certificate": [
      {"key": "ca_cert", "value": "enterprise-ca"}
    ],
    "protocol": "WPA2_Enterprise_CCMP"
  }
}
```

**Enterprise authentication methods:** `tls`, `ttls`, `peap` (set in `authentication`; this field is **required** for both Enterprise types). `innerAuthentication` (`none` / `tls` / `mschapv2`) is optional and applies to `ttls` and `peap`.

#### Enterprise `securityDetails` field reference

| Field | Applies to | Meaning |
|---|---|---|
| `authentication` | `tls`, `ttls`, `peap` | **Required.** Outer EAP method. `tls` uses a client certificate; `ttls`/`peap` typically use identity + password. |
| `innerAuthentication` | `none`, `tls`, `mschapv2` | Optional. Inner (phase-2) method for `ttls`/`peap`. `mschapv2` is the common choice for username/password. |
| `identity` | all | EAP identity (username). |
| `anonymousIdentity` | all | Outer-tunnel identity sent in the clear; hides the real `identity` from passive observers. |
| `password` | `ttls`, `peap` | Credential for username/password EAP. |
| `passphrase` | all | Passphrase protecting an encrypted client key, when applicable. |
| `certificate[]` | all | Array of `{key, value}`. `key` ∈ `ca_cert` \| `client_cert` \| `client_key` \| `cert_key_password`; `value` is the installed certificate's logical name. |
| `protocol` | WPA2Enterprise | Encryption suite. WPA2 supports `WPA2_Enterprise_CCMP`. |
| `protocol` | WPA3Enterprise | One of `WPA3_Enterprise_CCMP`, `WPA3_Enterprise_CCMP_256`, `WPA3_Enterprise_GCMP_128`, `WPA3_Enterprise_GCMP_256_SHA256`, `WPA3_Enterprise_GCMP_256_SUITEB_192`. |

A WPA3Enterprise profile uses the same shape with the `securityType`/`securityDetails` key set to `WPA3Enterprise` and a WPA3 `protocol`, for example `WPA3_Enterprise_GCMP_256_SHA256` for a TTLS-MSCHAPv2 deployment.

### Modify an existing profile

Use `operation: "MODIFY"` to update an existing profile — for example, to rotate a Personal passphrase. The `essid` selects the profile to update and must already exist:

```json
{
  "command": "set_wifi",
  "requestId": "wifi-4",
  "wifiConfig": {
    "interfaceName": "wlan0",
    "enableInterface": true,
    "operation": "MODIFY",
    "accessPoint": {
      "essid": "WarehouseWiFi",
      "security": {
        "securityType": "WPA2Personal",
        "securityDetails": {
          "WPA2Personal": {"password": "Wareh0use!2027"}
        }
      }
    }
  }
}
```

You can also `MODIFY` connection behavior alone — for instance, promote a saved profile to preferred without touching its credentials:

```json
{
  "command": "set_wifi",
  "requestId": "wifi-4b",
  "wifiConfig": {
    "operation": "MODIFY",
    "accessPoint": {"essid": "WarehouseWiFi", "isPreferred": true}
  }
}
```

`MODIFY` fails with error code 15 (`IOT_ERROR_SSID_NOT_FOUND`) if the ESSID does not exist; `CREATE` fails with code 18 (`IOT_ERROR_SSID_ALREADY_EXIST`) if it already does. This is the core rule: **`CREATE` is for first provisioning of a new ESSID, `MODIFY` is for an ESSID the reader already has.** Choosing the wrong one is the most common `set_wifi` failure.

### Delete a profile

`delete_wifi_profile` removes a saved profile by ESSID. It requires `command`, `requestId`, and `wifiProfileInfo.essid`:

```json
{
  "command": "delete_wifi_profile",
  "requestId": "wifi-5",
  "wifiProfileInfo": {"essid": "OldWiFi"}
}
```

You **cannot delete the currently active SSID** — the reader returns code 16 (`IOT_ERROR_DELETE_ACTIVE_SSID`). If you need to remove the active network, first `set_wifi` (`MODIFY`/`CREATE` with `connect: true`) onto a different profile so the target is no longer active, then delete it. Deleting profiles is also how you make room when you hit the profile cap.

### Limits

- **Maximum 10 saved Wi-Fi profiles** per reader. Exceeding this returns code 19 (`IOT_ERROR_SSID_LIMIT_OVERFLOW`). Delete an unused profile with `delete_wifi_profile` before adding a new one when the limit is reached.
- **ESSID is case-sensitive.** A mismatch on `MODIFY` triggers code 15; on `CREATE` it silently produces a profile that will never associate.
- **DHCP-only IPv4.** Static IPv4 and IPv6 are not configurable in the current API version. Provide `ipv4Configuration: {"enableDhcp": true}` (or omit it).
- **Certificates first.** For any Enterprise profile that references a `certificate`, install it via `install_certificate` (type `wifi`) *before* `set_wifi`. The certificate must already be installed under the logical name you reference.

### Response codes

`response.code` is `0` on success; a non-zero code carries the failure reason. The codes you can encounter from the Wi-Fi commands are:

| `code` | `description` | `iot_status_code` | Returned by | When it occurs |
|---|---|---|---|---|
| 0 | Success | `IOT_STATUS_SUCCESS` | all | Command executed successfully. |
| 2 | Invalid payload | `IOT_ERROR_INVALID_PAYLOAD` | `set_wifi`, `delete_wifi_profile` | Malformed JSON or invalid field values. Validate against the command schema. |
| 3 | Not able to retrieve information | `IOT_ERROR_INFO_NOT_AVAILABLE` | `get_wifi` | The reader could not gather Wi-Fi state; retry with the same `requestId`. |
| 15 | WIFI Error - SSID not found | `IOT_ERROR_SSID_NOT_FOUND` | `set_wifi` (MODIFY), `delete_wifi_profile` | The named ESSID is not among the saved profiles. Verify the name (case-sensitive) or use `CREATE`. |
| 16 | WIFI Error - Cannot delete active SSID | `IOT_ERROR_DELETE_ACTIVE_SSID` | `delete_wifi_profile` | The profile is the currently connected network. Connect elsewhere first, then delete. |
| 17 | WIFI Error - SSID missed | `IOT_ERROR_SSID_MISSED` | `set_wifi`, `delete_wifi_profile` | The required SSID/ESSID field is missing from the payload. |
| 18 | WIFI Error - SSID already exist | `IOT_ERROR_SSID_ALREADY_EXIST` | `set_wifi` (CREATE) | A profile with this ESSID is already saved. Use `MODIFY`, or delete it first. |
| 19 | WIFI Error - SSID count overflow | `IOT_ERROR_SSID_LIMIT_OVERFLOW` | `set_wifi` (CREATE) | The 10-profile maximum is reached. Delete an unused profile first. |
| 20 | Wifi is not supported | `IOT_ERROR_WIFI_INTER_NOT_SUPPORTED` | `set_wifi` | The device hardware has no Wi-Fi interface. |
| 23 | Invalid enum value | `IOT_ERROR_INVALID_ENUM` | `set_wifi` | A field value (e.g. `securityType`, `authentication`, `protocol`) is outside its allowed enum. |

:::info
On a handheld sled, Wi-Fi is normally the only network path — there is typically no Ethernet port, so `get_eth` reports an absent or disabled interface in its response body (not via an error code), which is expected, not a fault. A working Wi-Fi profile is therefore a prerequisite for the MQTT session that carries every other command. After any `set_wifi`, confirm with `get_wifi` that `accessPoint.status` is `CONNECTED` and `ipv4Configuration.ipAddress` is populated before relying on the link.
:::

**Related:** 📘 [Network Architecture](/infrastructure/network/architecture) · 🔌 [How to check Ethernet status](/infrastructure/network/ethernet) · 🛠️ [How to troubleshoot network issues](/infrastructure/network/troubleshooting) · 📕 [Network configuration (MGMT)](/reference/mgmt/get-wifi) · 📙 [Certificate Management](/infrastructure/certificate-management) (for EAP-TLS prerequisites)
