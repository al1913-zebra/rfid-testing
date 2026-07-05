---
id: ethernet
title: How to check Ethernet status
sidebar_label: "How to check Ethernet status"
description: "Check the reader's OWN Ethernet interface with get_eth over MQTT: the ethConfig.interfaceDetails, linkStatus, and ipv4Configuration fields, the disabled/absent-interface response shape, and the response codes."
sidebar_custom_props: { emoji: "🔌" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder, Fleet Operator · **Time:** ~3 min · **Ties to:** Network Configuration sub-tag of the API Reference

This guide shows you how to check the status of **the reader's own Ethernet interface** with `get_eth`. The command reports the posture of an interface (`eth0`) on the reader itself — not a broker-side, cradle, or upstream network device. Ethernet configuration is read-only over MQTT (there is no `set_eth` you can issue against a handheld sled), and a handheld sled typically has **no Ethernet port**, so on most sleds the interface is reported absent. The fields below describe what you see when an interface *is* present (for example, a fixed-reader companion or a cradle that exposes a host-side interface).

`get_eth` is a read-only `get_*` command and is therefore **idempotent**: if you do not receive a response, retry with the *same* `requestId`. Applies to RFD40 Premium, RFD40 Premium Plus, RFD9030, and RFD9090; supported API versions `V1.0` and `V1.1`. Security features, static IP configuration, and IPv6 are not available in the current API version.

### Issue the command

Publish the command to the reader's MGMT command topic, substituting the reader serial number (`{SN}`):

- **Command topic:** `zebra/rfid/{SN}/cmd/MGMT`
- **Response topic** (subscribe before publishing): `zebra/rfid/{SN}/rsp/MGMT`

```json
{"command": "get_eth", "requestId": "eth-1"}
```

`command` and `requestId` are the only required fields; there is no payload to populate. The reader publishes its response to `rsp/MGMT` within 1–3 seconds.

### Interpret the response

When an Ethernet interface is present and enabled, the reader returns the full `ethConfig` block:

```json
{
  "command": "get_eth",
  "requestId": "eth-1",
  "apiVersion": "V1.1",
  "ethConfig": {
    "interfaceDetails": {
      "interfaceName": "eth0",
      "status": "enabled",
      "hostname": "RFD40-24190525100354",
      "macAddress": "E0-D0-45-3D-38-1D",
      "linkStatus": {
        "status": "Connected",
        "linkSpeed": "100Mbps"
      },
      "ipv4Configuration": {
        "ipAddress": "192.168.1.101",
        "subnetMask": "255.255.255.0",
        "gateway": "192.168.1.144",
        "enableDhcp": "enabled",
        "dnsServer": "192.168.1.78",
        "domainName": "test.soti.com"
      }
    }
  },
  "response": {"code": 0, "description": "Success"}
}
```

`linkStatus.status` is `Connected` when the reader's Ethernet link is up and `Disconnected` otherwise; `ipv4Configuration` reflects the DHCP-assigned addressing. When the interface is disabled, the response contains only `ethConfig.interfaceDetails.{interfaceName, status}` (see [Disabled and absent-interface responses](#disabled-and-absent-interface-responses)).

### Field reference

Walk the response top-down. `ethConfig.interfaceDetails` always carries the four base fields; `linkStatus` and `ipv4Configuration` are nested under `interfaceDetails` and are present only when the interface is enabled.

#### `interfaceDetails`

| Field | Type | Example | Always present? | Meaning |
|---|---|---|---|---|
| `interfaceName` | string | `eth0` | Yes | Name of the reader's network interface. |
| `status` | enum | `enabled` | Yes | Interface administrative state. One of `enabled` / `disabled`. If `disabled`, no wired traffic is possible regardless of link state. |
| `hostname` | string | `RFD40-24190525100354` | When enabled | Hostname assigned to the reader (serial-derived). |
| `macAddress` | string | `E0-D0-45-3D-38-1D` | When enabled | MAC address of the Ethernet interface. |

#### `interfaceDetails.linkStatus`

| Field | Type | Example | Meaning |
|---|---|---|---|
| `status` | enum | `Connected` | Physical link state. One of `Connected` / `Disconnected`. `Connected` confirms a cable is plugged in and the switch port is active. |
| `linkSpeed` | string | `100Mbps` | Negotiated link speed. An unexpected value (e.g. `10Mbps` instead of `100Mbps`) can indicate a cable or switch-port problem. |

#### `interfaceDetails.ipv4Configuration`

| Field | Type | Example | Meaning |
|---|---|---|---|
| `ipAddress` | string (ipv4) | `192.168.1.101` | IPv4 address assigned to the interface. Empty/absent means DHCP failed or no address is configured. |
| `subnetMask` | string (ipv4) | `255.255.255.0` | Subnet mask for the IPv4 address. |
| `gateway` | string (ipv4) | `192.168.1.144` | Default gateway. An incorrect gateway prevents the reader from reaching external networks or the MQTT broker. |
| `enableDhcp` | enum | `enabled` | Whether the address is DHCP-assigned. One of `enabled` / `disabled`. |
| `dnsServer` | string (ipv4) | `192.168.1.78` | DNS server address. |
| `domainName` | string | `test.soti.com` | Domain name associated with the network. |

### What to check, and why

| Field | What to check | Why it matters |
|---|---|---|
| `interfaceDetails.status` | Is the Ethernet interface enabled? | If `disabled`, no wired network traffic is possible regardless of link state. |
| `linkStatus.status` | Is the physical link connected? | Confirms a cable is plugged in and the switch port is active. |
| `linkStatus.linkSpeed` | What speed is the link negotiated at? | Unexpected speeds (e.g. `10Mbps` instead of `100Mbps`) can indicate cable or switch issues. |
| `ipv4Configuration.ipAddress` | Has the device received an IP address? | No IP address means DHCP failed or static addressing is not configured. |
| `ipv4Configuration.enableDhcp` | Is DHCP enabled or static? | Determines whether the IP address is assigned automatically. |
| `ipv4Configuration.gateway` | Is the gateway correct? | An incorrect gateway prevents the device from reaching external networks or the MQTT broker. |

### Disabled and absent-interface responses

When the interface exists but is administratively disabled, the reader omits `linkStatus` and `ipv4Configuration` and returns only the interface name and state:

```json
{
  "command": "get_eth",
  "requestId": "eth-1",
  "apiVersion": "V1.1",
  "ethConfig": {
    "interfaceDetails": {
      "interfaceName": "eth0",
      "status": "disabled"
    }
  },
  "response": {"code": 0, "description": "Success"}
}
```

On a handheld sled with **no Ethernet hardware at all**, the interface is reported the same way as a disabled one: the reader returns a **successful response (code 0)** whose `ethConfig.interfaceDetails` carries only `interfaceName` and `status` (`"disabled"`), with `linkStatus` and `ipv4Configuration` omitted. The reader does not signal an absent interface with an error code; the absence is conveyed in the response body.

This is the expected, healthy result on most handheld sleds — it is not a fault. Treat a `disabled` status from `get_eth` as confirmation that the sled has no usable wired interface, and use [Wi-Fi](/infrastructure/network/wifi) as the network path instead. If the reader genuinely cannot gather interface state, it returns error **code 3, "Not able to retrieve information"** instead of an `ethConfig` block — retry with the same `requestId`.

### Response codes

`response.code` is `0` on success; a non-zero code carries the failure reason. The codes you can encounter from `get_eth` are:

| `code` | `description` | `iot_status_code` | When it occurs |
|---|---|---|---|
| 0 | Success | `IOT_STATUS_SUCCESS` | Interface state returned in `ethConfig`. An absent or disabled interface is reported here with `status` `"disabled"`. |
| 3 | Not able to retrieve information | `IOT_ERROR_INFO_NOT_AVAILABLE` | The reader could not gather interface state at this time; retry with the same `requestId`. |

:::info
`get_eth` reports the reader's own Ethernet interface. Most handheld sleds have no Ethernet port, so the interface is typically reported absent — a successful response (code 0) whose `status` is `"disabled"`, not an error code; when the enabled fields are present they describe that reader's interface. Ethernet configuration is read-only over MQTT.
:::

**Related:** 📘 [Network Architecture](/infrastructure/network/architecture) · 📙 [How to configure Wi-Fi profiles](/infrastructure/network/wifi) · 📙 [How to troubleshoot network issues](/infrastructure/network/troubleshooting) · 📕 [get_eth](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-eth)
