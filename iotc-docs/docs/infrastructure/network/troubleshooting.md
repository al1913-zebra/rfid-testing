---
id: troubleshooting
title: How to troubleshoot network issues
sidebar_label: How to troubleshoot network issues
description: "Troubleshoot IOTC reader network/MQTT connectivity: mqttConnEVT reconnect loops, keep-alive and backoff, Wi-Fi association/DHCP/DNS failures, broker reachability, and the Wi-Fi error codes a misconfig returns — with real get_status/get_wifi/get_eth payloads."
sidebar_custom_props: { emoji: "🛠️" }
---

> 📙 **HOW-TO** · **Audience:** Fleet Operator · **Time:** ~10 min

This guide shows you how to diagnose common network and MQTT connectivity failures on a handheld reader (RFD40 Premium, RFD40 Premium Plus, RFD9030, RFD9090). Each section follows a **symptom → cause → fix** structure with the exact command to run, the response field to inspect, and the error code a misconfiguration returns.

All diagnostic commands are read-only `get_*` operations. They are **idempotent** — if a command times out you may safely resend it with the *same* `requestId`. (State-changing operations such as `set_wifi` are *not* idempotent; a retry must use a *new* `requestId`.)

Send commands to the management command topic and read replies on the response topic:

```
Publish:    zebra/rfid/{SN}/cmd/MGMT
Subscribe:  zebra/rfid/{SN}/rsp/MGMT
```

Replace `{SN}` with the reader's serial number (for example `RFD40-24190525100354`).

### Before you start: confirm the symptom

Pin down *where* the path breaks before changing anything. The fastest signal is the connection event the reader publishes on its own — `mqttConnEVT` — and a single `get_status` round-trip.

1. Subscribe to the management event topic and watch for `mqttConnEVT`:

   ```
   zebra/rfid/{SN}/evt/MGMT
   ```

   A healthy reader publishes `connectionState: CONNECTED` once per (re)connection. A reader stuck in a reconnect loop publishes alternating `DISCONNECTED`/`CONNECTED` events:

   ```json
   {
     "connectionState": "CONNECTED",
     "timestamp": "12:17:56",
     "deviceModel": "RFD40",
     "deviceSerialNo": "RFD40-24190525100354",
     "apiVersion": "1.0",
     "mqttVersion": "3.1.1"
   }
   ```

   > **Note:** `timestamp` is `HH:MM:SS` (not ISO 8601) and may be **absent** on a `DISCONNECTED` event, because the reader may be unable to read NTP-synced time at the moment the link drops. Do not treat a missing timestamp as a parse error. See [MQTT connection state](/observability/mqtt-connection) for the full event semantics.

2. Send a `get_status` and confirm the reader answers over MQTT at all:

   ```json
   { "command": "get_status", "requestId": "diag-001", "apiVersion": "V1.1" }
   ```

   A reply on `rsp/MGMT` (any reply) proves the broker path is fundamentally working. Inspect `deviceStatus.radioConnection`:

   ```json
   {
     "command": "get_status",
     "requestId": "diag-001",
     "apiVersion": "V1.1",
     "deviceStatus": {
       "powerSource": "USB",
       "radioActivity": "INACTIVE",
       "radioConnection": "CONNECTED",
       "systemTime": "2024-02-26T13:45:53.728Z",
       "temperature": 32,
       "ntp": { "offset": 0, "reach": 0 },
       "batteryStatus": {
         "capacity": 6400, "stateOfHealth": "GOOD",
         "chargePercentage": 100, "chargeStatus": 1
       }
     },
     "response": { "code": 0, "description": "Success" }
   }
   ```

| `deviceStatus` field | Healthy value | What a bad value means |
|---|---|---|
| `radioConnection` | `CONNECTED` | `DISCONNECTED` — radio is not attached to the broker; jump to *Reader keeps reconnecting* or *Wi-Fi association fails*. |
| `radioActivity` | `INACTIVE` (when idle) | `ACTIVE` means an inventory is running and may mask other state. |
| `ntp.reach` | non-zero | `0` — the NTP server is unreachable; DNS/routing is likely broken (see *DNS resolution failure*). |
| `powerSource` | `USB` / `WALLCHARGER` / `CRADLE` / `DC` | A reader on low battery (`chargePercentage`) can drop Wi-Fi to save power. |

If `get_status` returns **no reply at all**, the reader is not reaching the broker — start at *Reader keeps reconnecting* and *firewall blocks 1883/8883*.

### Symptom: Wi-Fi association fails

Issue [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) and inspect the active profile's `accessPoint.status` (`CONNECTED` / `DISCONNECTED`) and whether `ipv4Configuration.ipAddress` is populated. Common association failures:

- Wrong passphrase or invalid EAP credentials → the profile never reaches `accessPoint.status: CONNECTED`.
- SSID out of range or the AP is down → no association.
- Associated but no IP → DHCP failure (`accessPoint.status: CONNECTED` but `ipv4Configuration.ipAddress` empty).

**Run:**

```json
{ "command": "get_wifi", "requestId": "diag-wifi-1", "apiVersion": "V1.1" }
```

**A healthy, associated profile looks like this** (only the *connected* profile carries `interfaceName`, `macAddress`, `hostname`, and `ipv4Configuration`; saved-but-disconnected profiles carry only `accessPoint` and `securityDetails`):

```json
{
  "command": "get_wifi",
  "requestId": "diag-wifi-1",
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
            "essid": "IOT_TESTAP",
            "status": "CONNECTED",
            "securityType": "WPA2Personal",
            "isPreferred": true,
            "autoConn": true
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
  "response": { "code": 0, "description": "Success" }
}
```

**Inspect these fields:**

| Field | Check | Cause if wrong |
|---|---|---|
| `interfaceDetails.status` | `ENABLED` | `DISABLED` — Wi-Fi radio is off; the response will contain only `interfaceName`/`status`. Re-enable via `set_wifi` or 123RFID Desktop. |
| `accessPoint.status` | `CONNECTED` | `DISCONNECTED` — wrong passphrase, EAP credential failure, SSID out of range, or AP down. |
| `accessPoint.essid` | the network you expect | Multiple profiles can be saved; the reader may be on the wrong one. Set the correct one `isPreferred: true`. |
| `accessPoint.securityType` | matches the AP exactly | A `WPA2Personal` vs `WPA3Personal` / `WPA2Enterprise` mismatch blocks association even with a correct password. |
| `ipv4Configuration.ipAddress` | populated, in-subnet | Empty → associated but DHCP failed (see next section). |

**Security types accepted by `set_wifi`** (the `securityType` must match the AP):

| `securityType` | Auth | Notes |
|---|---|---|
| `WPA2Personal` | Passphrase | Standard PSK office/home Wi-Fi. |
| `WPA3Personal` | Passphrase (SAE) | Stronger than WPA2. |
| `WPA2Enterprise` | `tls` \| `ttls` \| `peap` (802.1X) | Requires installed certificates for `tls`. |
| `WPA3Enterprise` | `tls` \| `ttls` \| `peap` (802.1X) | Highest-security enterprise option. |

**Fix:** re-provision the profile with [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi) (`operation: "MODIFY"` to update an existing SSID, `"CREATE"` for a new one), or use 123RFID Desktop. Full payload shapes are in [How to configure Wi-Fi profiles](/infrastructure/network/wifi). For Enterprise TLS, the `ca_cert`, `client_cert`, and `client_key` must already be installed before `set_wifi`.

**Wi-Fi error codes returned by `set_wifi` / `delete_wifi_profile`:**

| Code | `iot_status_code` | Cause | Fix |
|---|---|---|---|
| `2` | `IOT_ERROR_INVALID_PAYLOAD` | JSON malformed or invalid field value. | Validate the payload against the `set_wifi` schema. |
| `15` | `IOT_ERROR_SSID_NOT_FOUND` | `MODIFY`/`delete` on an SSID that is not saved. | Verify the ESSID (case-sensitive); use `CREATE` for new profiles. |
| `16` | `IOT_ERROR_DELETE_ACTIVE_SSID` | Tried to delete the currently connected profile. | Connect to a different SSID first, then delete. |
| `17` | `IOT_ERROR_SSID_MISSED` | The SSID field is missing from the payload. | Include the `essid` field. |
| `18` | `IOT_ERROR_SSID_ALREADY_EXIST` | `CREATE` for an SSID that already exists. | Use `MODIFY`, or delete the existing profile first. |
| `19` | `IOT_ERROR_SSID_LIMIT_OVERFLOW` | More than 10 saved profiles. | Delete an unused profile with `delete_wifi_profile`. |
| `20` | `IOT_ERROR_WIFI_INTER_NOT_SUPPORTED` | Hardware has no Wi-Fi interface. | Use Ethernet (cradle) instead. |
| `23` | `IOT_ERROR_INVALID_ENUM` | A field (e.g. `securityType`, `authentication`) is not an allowed value. | Correct to a value from the enum tables above. |

> **Profile limit:** the reader stores a maximum of **10** Wi-Fi profiles. The 11th `CREATE` fails with code `19`.

### Symptom: DHCP failure

[`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) shows `accessPoint.status: CONNECTED` but `ipv4Configuration.ipAddress` is empty (or the whole `ipv4Configuration` block is absent). The reader is associated at layer 2 but never received a lease.

Check:

- The Wi-Fi network's DHCP scope has free leases.
- The reader's MAC address (`interfaceDetails.macAddress`, e.g. `48:A4:93:BD:4A:FC`) is not blocked by MAC filtering.
- The reader is not configured for static addressing with a wrong/empty address — confirm `ipv4Configuration.enableDhcp: true` if you expect DHCP.

**Fix:** free DHCP leases or whitelist the MAC. To pin a static address instead, re-send `set_wifi` with `enableDhcp: false` and an explicit `ipAddress`, `subnetMask`, `gateway`, and `dnsServer`.

### Symptom: DNS resolution failure

The reader has an IP but cannot reach the broker hostname. Tell-tale signs: `get_status` returns `ntp.reach: 0` (the NTP pool is also resolved by name), and the reader never publishes `mqttConnEVT: CONNECTED`.

Check:

- The configured DNS in the [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) response (`ipv4Configuration.dnsServer`) is reachable and correct. A bogus value such as `0.0.0.0` resolves nothing.
- The broker hostname (`iotc-broker.zebra.com` or your customer broker) resolves on a control machine in the same network/subnet.
- `ipv4Configuration.gateway` is correct — an incorrect gateway prevents the reader from reaching any off-subnet DNS server or broker.

**Fix:** correct the DNS server / gateway via `set_wifi`, or point the reader's MDM endpoint at the broker's **IP address** rather than a hostname to bypass DNS entirely while you debug.

### Symptom: firewall blocks 1883/8883

Connection drops at the TCP layer before the MQTT CONNECT packet. The reader will publish `mqttConnEVT: DISCONNECTED` (often with no `timestamp`) and `get_status` will not reply.

Check:

- Outbound **TCP/8883** (TLS, `protocol: MQTT_TLS`) or **TCP/1883** (cleartext, `protocol: MQTT`) is permitted from the host's network to the broker.
- The reader's endpoint `protocol` matches the port: `MQTT` ↔ `1883`, `MQTT_TLS` ↔ `8883`. A `MQTT` endpoint pointed at `8883`, or `MQTT_TLS` at `1883`, fails the handshake.
- No proxy is intercepting MQTT traffic without configuration.

Confirm the endpoint target with [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config):

```json
{ "command": "get_endpoint_config", "requestId": "diag-ep-1", "apiVersion": "V1.1" }
```

| Endpoint field | Check | Failure if wrong |
|---|---|---|
| `activate` | `true` | An inactive endpoint never connects. |
| `protocol` | `MQTT` or `MQTT_TLS` | Mismatch with the broker's listener prevents connection. |
| `url` / `port` | broker address + `1883`/`8883` | Wrong host or port → TCP never completes. |
| `verificationType` | `NONE`, `VERIFY_PEER`, `VERIFY_HOST`, or `VERIFY_HOST_PEER` | A stricter type than the broker presents causes a TLS handshake failure. |

See [How to configure MQTT endpoints](/infrastructure/configure-endpoints) and [How to view endpoint configuration](/infrastructure/view-endpoints) to correct these values.

### Symptom: Reader keeps reconnecting (flapping)

The reader cycles `mqttConnEVT: CONNECTED` → `DISCONNECTED` → `CONNECTED` repeatedly. This is almost always a keep-alive, backoff, or duplicate-client-ID problem rather than a routing problem (routing failures produce a *persistent* `DISCONNECTED`, not a cycle).

**Causes and fixes:**

1. **Duplicate `clientId`.** Two readers (or a stale test client) sharing one MQTT `clientId` forces the broker to evict whichever connected first — producing a perfect flap. Confirm each endpoint's `clientId` is unique per broker via `get_endpoint_config`, then re-provision with a unique `clientId` using `config_endpoint`.
2. **Keep-alive too aggressive for the link.** The reader must ping the broker within the `keepAlive` window (default **60 seconds**); if a flaky link delays the PINGREQ past that window, the broker drops the session and the reader reconnects. On marginal Wi-Fi (low RSSI, roaming between APs), raise `keepAlive` (max `65535`) toward a value that exceeds the worst observed round-trip stall — for example toward `300` seconds.
3. **Reconnect backoff too aggressive.** If the reader hammers the broker immediately after each drop, raise `reconnectDelayMin` so the first retry waits longer, and confirm `reconnectDelayMax` (the upper bound of the exponential backoff) is high enough that repeated retries spread out instead of bunching up.
4. **Power saving.** A low `chargePercentage` from `get_status` can let the radio sleep; keep the sled on `CRADLE`/`USB`/`WALLCHARGER` power while diagnosing.
5. **AP roaming / DHCP lease churn.** If the reader changes IP on each reconnect (compare `ipv4Configuration.ipAddress` across `get_wifi` calls), pin a static IP or extend the DHCP lease time.
6. **Messages lost across reconnects.** A clean session (`cleanSession: true`, the default) discards queued messages on reconnect; leave it `true` for management/control unless you must buffer events across drops, in which case set `cleanSession: false`.
7. **Frequent Last Will and Testament (LWT) messages.** The broker publishes the reader's LWT to `zebra/rfid/{SN}/evt/MGMT` on an unexpected disconnect. If you see these often, the reader is losing TCP unexpectedly (power, Wi-Fi, crash) rather than disconnecting cleanly — chase the underlying power or Wi-Fi cause above rather than the broker.

> **Note:** Endpoint changes via `config_endpoint` take effect after a `reboot`. The reader disconnects, restarts, and reconnects within roughly 30–60 seconds.

### Symptom: Ethernet (cradle) shows no link

On a handheld sled, `get_eth` reports the **reader's own** Ethernet interface — not the broker side and not a cradle bridge. On most handheld sleds there is no on-board Ethernet, so the interface is typically reported **absent or `Disabled`**; that is expected, and Wi-Fi is the normal transport.

**Run:**

```json
{ "command": "get_eth", "requestId": "diag-eth-1", "apiVersion": "V1.1" }
```

**When the interface is disabled/absent, the response is minimal** — only `interfaceName` and `status`:

```json
{
  "command": "get_eth",
  "requestId": "diag-eth-1",
  "apiVersion": "V1.1",
  "ethConfig": {
    "interfaceDetails": { "interfaceName": "eth0", "status": "disabled" }
  },
  "response": { "code": 0, "description": "Success" }
}
```

**When Ethernet is present and up, inspect:**

| Field | Check | Cause if wrong |
|---|---|---|
| `interfaceDetails.status` | `enabled` | `disabled` — no wired traffic regardless of cable state. |
| `linkStatus.status` | `Connected` | `Disconnected` — cable unplugged or switch port down. |
| `linkStatus.linkSpeed` | expected speed (e.g. `100Mbps`) | An unexpectedly low speed indicates a cable or switch negotiation issue. |
| `ipv4Configuration.ipAddress` | populated | Empty → DHCP failed or static addressing not set. |
| `ipv4Configuration.gateway` | correct | A wrong gateway blocks reaching the broker. |

> **Note:** On a handheld sled the Ethernet interface is normally absent. `get_eth` then returns a successful response (`code 0`) whose `interfaceDetails.status` is `disabled` (with `linkStatus`/`ipv4Configuration` omitted), or `code 3` (`IOT_ERROR_INFO_NOT_AVAILABLE`) if it cannot read the interface — either way, use Wi-Fi. See [How to check Ethernet status](/infrastructure/network/ethernet).

### Diagnostic command sequence

For systematic diagnosis, run in order. Each step narrows the fault domain; stop at the first one that fails.

1. [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) — does the reader respond at all over MQTT? If yes, the path is fundamentally working; check `radioConnection` and `ntp.reach`.
2. [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) — Wi-Fi association (`accessPoint.status`) and DHCP state (`ipv4Configuration.ipAddress`).
3. [`get_eth`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth) — only if the reader is wired; on a sled this is normally `disabled`/absent.
4. [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) — broker target: `activate`, `protocol`, `url`, `port`, `verificationType`.
5. Inspect `mqttConnEVT` and `heartBeatEVT` events over a 5-minute window for connection-quality dropouts. A reader publishes `heartBeatEVT` at its configured interval; missing heartbeats are themselves a connectivity signal.

**Read-only and idempotent:** every command above is a `get_*` query (required fields `command`, `requestId`). A timeout can be retried with the same `requestId` with no side effects.

```d2
classes: {
  good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } }
  bad:  { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
Start: "Symptom: reader offline?"
Q1: "mqttConnEVT\nreceived recently?" { shape: diamond }
Q2: "Sled has\nWi-Fi link?" { shape: diamond }
Q3: "Flapping?\nCONNECTED<->DISCONNECTED" { shape: diamond }
RC: "Run get_status\nover MDM"
WF: "Fix Wi-Fi:\nset_wifi or 123RFID Desktop" { class: bad }
NET: "Check broker reachability\nnc -vz host port" { shape: diamond }
OK: "Reader healthy;\nbroker reachable" { class: good }
MDM: "MDM endpoint inactive;\nre-bootstrap" { class: bad }
FW: Firewall / port block { class: bad }
KA: "keepAlive / clientId\n/ backoff" { class: bad }
ESC: "Escalate:\ncollect logs, open support case" { class: bad }
Start -> Q1
Q1 -> Q2: No
Q1 -> Q3: "Yes, flapping"
Q1 -> RC: "Yes, DISCONNECTED"
Q3 -> KA: Yes
Q3 -> NET: No
Q2 -> WF: No
Q2 -> NET: Yes
RC -> OK: responds
RC -> MDM: no response
NET -> OK: reachable
NET -> FW: fails
WF -> OK: fixed
WF -> ESC: still failing
KA -> OK: fixed
KA -> ESC: still flapping
MDM -> OK: fixed
MDM -> ESC: still failing
FW -> OK: port opened
FW -> ESC: still blocked

```

### Error code quick reference

Network-relevant response codes the reader returns in the `response.code` field. The full catalog is in [Error codes](/reference/errors/codes).

| Code | `iot_status_code` | Returned by | Meaning |
|---|---|---|---|
| `0` | `IOT_STATUS_SUCCESS` | all | Command succeeded. |
| `2` | `IOT_ERROR_INVALID_PAYLOAD` | `set_wifi`, `delete_wifi_profile` | Malformed JSON or invalid field value. |
| `3` | `IOT_ERROR_INFO_NOT_AVAILABLE` | `get_status`, `get_wifi`, `get_eth`, `get_endpoint_config` | Reader could not gather the requested info — retry after a short delay; reboot if persistent. |
| `15` | `IOT_ERROR_SSID_NOT_FOUND` | `set_wifi`, `delete_wifi_profile` | SSID not in saved profiles. |
| `16` | `IOT_ERROR_DELETE_ACTIVE_SSID` | `delete_wifi_profile` | Cannot delete the connected SSID. |
| `17` | `IOT_ERROR_SSID_MISSED` | `set_wifi`, `delete_wifi_profile` | SSID field missing. |
| `18` | `IOT_ERROR_SSID_ALREADY_EXIST` | `set_wifi` | SSID already saved. |
| `19` | `IOT_ERROR_SSID_LIMIT_OVERFLOW` | `set_wifi` | More than 10 profiles. |
| `20` | `IOT_ERROR_WIFI_INTER_NOT_SUPPORTED` | `set_wifi` | No Wi-Fi hardware. |
| `23` | `IOT_ERROR_INVALID_ENUM` | `set_wifi`, `config_endpoint` | A field value is not in the allowed enum. |

**Related:** 📙 [Wi-Fi Configuration](/infrastructure/network/wifi) · 🔌 [Ethernet status](/infrastructure/network/ethernet) · 🔗 [MQTT connection state](/observability/mqtt-connection) · 📙 [Diagnose connection issues](/diagnose/symptoms) · 🧰 [Recovery playbooks](/diagnose/recovery-playbooks) · 📕 [Error codes](/reference/errors/codes) · 📕 [get_status / get_wifi](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status)
