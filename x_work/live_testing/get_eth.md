# Command: get_eth

## 1. Intent & Objective

`get_eth` is a **read-only device-management (dev_mgmt) command** that retrieves the wired **Ethernet interface configuration and status** of a Zebra handheld RFID reader. It applies to the RFD-series handheld readers; the only model exercised/observed this session is **RFD40** [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]. The RFD90 (and any other RFD-series handheld) is covered by the same schema contract but was **NOT** device-observed this session — general applicability rests on the shared schema, not a device capture [verified-from-schema: response/dev_mgmt/get_eth.json]. It is an **MQTT-only** command issued against the MDM/MGMT management endpoint; there is no REST, HTTP, or TCP/IP equivalent.

**What it returns.** The command resolves to an `ethConfig` object whose `interfaceDetails` describes the Ethernet adapter [verified-from-schema: refrence/response/ethResponseSoti.yaml — interfaceDetails]:
- `interfaceName` — the OS-level interface name (e.g. `eth0`).
- `status` — whether the interface is `enabled` / `disabled` (per schema enum).
- `hostname` — the device hostname bound to the interface.
- `macAddress` — the interface MAC address.
- `linkStatus` (optional) — `{ status: Connected|Disconnected, linkSpeed }`, the live carrier state and negotiated speed.
- `ipv4Configuration` (optional) — `{ ipAddress, subnetMask, gateway, enableDhcp, dnsServer, domainName }`, the IPv4 addressing for the interface.
- `security` (optional) — an `802.1X / EAP` block (`securityStatus`, `EAP802_1X.authentication`, `innerAuthentication`, `certificate`).

**When it is used.** Network diagnostics and provisioning verification: confirming that the reader's wired uplink is up, checking the negotiated link speed, and validating the IPv4 addressing the reader is using to reach back-end services (e.g. a POS/host integration over the wired LAN). Because it is read-only and idempotent, it is safe to poll during commissioning or troubleshooting.

**Architectural context & caveat.** `get_eth` is a pure *getter* over the dev_mgmt surface — it carries no configuration payload and never mutates device state. The request schema explicitly notes a capability caveat: *"Security features, static IP configuration, and IPv6 support are not available in the current API version."* [verified-from-schema: commands/dev_mgmt/get_eth.json — description]. Note that this caveat is in tension with the response model, which **does** define a `security`/`EAP802_1X` block and a full (static-capable) `ipv4Configuration` — see Conformance note S5.

**Live observation.** Exercised live, the device returned `response.code = 0` ("Success") with the Ethernet interface **Disabled** — `interfaceDetails = { interfaceName: "eth0", status: "Disabled" }` — `apiVersion "V1.1"`, and the `requestId` echoed back as `abc123` [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]. The model reported by the device is exactly **RFD40**; the device serial `24190525100255` and firmware build `PAAFKS00-013-R02` are device-identity/harness inputs, **not** fields present in the live response body [verified-from-test-harness: RFD40 serial 24190525100255, firmware PAAFKS00-013-R02].

---

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `{EP_TYPE}/clients/cmnd` (base `MDM/clients/cmnd`) | n/s | n/s |
| Subscribe (Response) | `{EP_TYPE}/clients/resp` (base `MDM/clients/resp`) | n/s | n/s |

**Topic wrapping (transport).** The on-wire topics observed this run were `zebra/MDM/clients/cmnd/RFD40-24190525100255` (request) and `zebra/MDM/clients/resp/RFD40-24190525100255` (response), i.e. the pattern `{tenantId}/{base}/{serial}` with `tenantId = zebra`, `base = MDM/clients/{cmnd|resp}`, and `serial = RFD40-24190525100255` [verified-from-test-harness: on-wire topics zebra/MDM/clients/{cmnd,resp}/RFD40-24190525100255]. The endpoint type exercised was `MDM_REMOTE` [verified-from-test-harness: endpoint MDM_REMOTE].

**Tenant / serial are NOT response-payload fields.** `tenantId` (`zebra`) and the device serial (`24190525100255`) are harness/topic-routing inputs supplied by configuration, not values returned inside the `get_eth` response body [verified-from-test-harness: tenant/serial are harness-config inputs, not response-payload fields].

**QoS / Retain.** Not specified per-operation in any `get_eth` schema. MQTT QoS and retain are governed centrally by the endpoint configuration (`cfgEndpointPayload.mqttParams`), not by this command — hence `n/s` above [verified-from-schema: commands/dev_mgmt/get_eth.json — no mqtt params declared]. The broker used was `192.168.1.6:1883` (plain MQTT, anonymous) [verified-from-test-harness: broker 192.168.1.6:1883 plain MQTT anonymous].

---

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | root | string | **Required** | example `get_eth` (no enum declared) | Command issued to get the ethernet configuration [verified-from-schema: commands/dev_mgmt/get_eth.json — properties.command] |
| `requestId` | root | string | **Required** | type:string only; no length/format constraint | Unique identifier for the request, for tracking/debugging [verified-from-schema: commands/dev_mgmt/get_eth.json — properties.requestId] |

The request schema declares **exactly two** properties and `required: ["command", "requestId"]` [verified-from-schema: commands/dev_mgmt/get_eth.json — required]. There is **no payload/config object** and **no `auth` (user/password) field** — `get_eth` carries no parameters beyond the command name and request id.

**Live exercise.** The operator published `{"command":"get_eth","requestId":"abc123"}`, which validated **schema-VALID** against the request schema, and the device **echoed `requestId = "abc123"`** back in the response [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883].

### JSON Request Example
```json
{ "command": "get_eth", "requestId": "abc123" }
```

---

## 4. Response Payload Breakdown

> **Schema note (S1):** `response/dev_mgmt/get_eth.json` defines `properties` for `command`, `requestId`, `apiVersion`, `ethConfig`, and `response`, **but declares NO top-level `required` array** — unlike sibling dev_mgmt response schemas, which require `[command, requestId, apiVersion, response]`. The Required/Optional column below reflects the *intended/sibling* contract; per the literal `get_eth` response schema, none of the top-level fields are formally required [verified-from-schema: response/dev_mgmt/get_eth.json — no top-level required].

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | root | string | Required* | example `get_eth` | [verified-on-device] | Echo of the executed command (`get_eth`) |
| `requestId` | root | string | Required* | — | [verified-on-device] | Echo of the original request id (`abc123`) |
| `apiVersion` | root | string | Required* | enum `[V1.0, V1.1]` | [verified-on-device] | Device returned **`V1.1` (IN enum)**. See cross-command note below. |
| `ethConfig` | root | object | Optional (per schema) | `$ref ethResponseSoti.yaml` | [verified-on-device] (present) | Ethernet configuration container |
| `ethConfig.interfaceDetails` | ethConfig | object | (container) | — | [verified-on-device] (present) | Per-interface details object |
| `ethConfig.interfaceDetails.interfaceName` | interfaceDetails | string | **Required** | example `eth0` | [verified-on-device] = `eth0` | Name of the network interface |
| `ethConfig.interfaceDetails.status` | interfaceDetails | string | **Required** | enum `[enabled, disabled]` | [verified-on-device] = `Disabled` | Interface enable state. **D1: live value `"Disabled"` is NOT in the lowercase enum.** |
| `ethConfig.interfaceDetails.hostname` | interfaceDetails | string | **Required** | example `RFD40AB03` | [verified-from-schema] — **ABSENT live (D2)** | Hostname assigned to the device |
| `ethConfig.interfaceDetails.macAddress` | interfaceDetails | string | **Required** | example `E0-D0-45-3D-38-1D` | [verified-from-schema] — **ABSENT live (D2)** | MAC address of the interface |
| `ethConfig.interfaceDetails.linkStatus` | interfaceDetails | object | Optional | — | [verified-from-schema] — absent live | Live carrier state/speed |
| `…linkStatus.status` | linkStatus | string | Required (within linkStatus) | enum `[Connected, Disconnected]` | [verified-from-schema] | Current link status |
| `…linkStatus.linkSpeed` | linkStatus | string | Required (within linkStatus) | example `100Mbps` | [verified-from-schema] | Negotiated link speed |
| `ethConfig.interfaceDetails.ipv4Configuration` | interfaceDetails | object | Optional | — | [verified-from-schema] — absent live | IPv4 configuration block |
| `…ipv4Configuration.ipAddress` | ipv4Configuration | string | Optional | format `ipv4` | [verified-from-schema] | IPv4 address |
| `…ipv4Configuration.subnetMask` | ipv4Configuration | string | Optional | format `ipv4` | [verified-from-schema] | Subnet mask |
| `…ipv4Configuration.gateway` | ipv4Configuration | string | Optional | format `ipv4` | [verified-from-schema] | Default gateway |
| `…ipv4Configuration.enableDhcp` | ipv4Configuration | boolean | Optional | **type:boolean BUT enum `[enabled, disabled]`, example `"enabled"` (S3 contradiction)** | [verified-from-schema] | DHCP on/off |
| `…ipv4Configuration.dnsServer` | ipv4Configuration | string | Optional | format `ipv4` | [verified-from-schema] | DNS server address |
| `…ipv4Configuration.domainName` | ipv4Configuration | string | Optional | example `test.soti.com` | [verified-from-schema] | Domain name |
| `ethConfig.interfaceDetails.security` | interfaceDetails | object | Optional | — | [verified-from-schema] — absent live | 802.1X security block (see S5 caveat) |
| `…security.securityStatus` | security | boolean | Optional | example `true` | [verified-from-schema] | Whether security features are enabled |
| `…security.EAP802_1X.authentication` | EAP802_1X | string | Optional | enum `[EAP-MD5, LEAP, PEAP, EAP-SIM, EAP-AKA, EAP-TLS, EAP-TTLS, EAP-FAST]` | [verified-from-schema] | Outer 802.1X auth method |
| `…security.EAP802_1X.innerAuthentication` | EAP802_1X | string | Optional | enum `[EAP-MS-CHAPv2, " EAP-TLS", EAP-GTC]` (**S4: leading space in `" EAP-TLS"`**) | [verified-from-schema] | Inner 802.1X auth method |
| `…security.EAP802_1X.certificate` | EAP802_1X | string | Optional | example `client45` | [verified-from-schema] | Certificate used for 802.1X |
| `response` | root | object | Required* | `$ref response.yaml` | [verified-on-device] | Standard result object |
| `response.code` | response | integer | **Required** (within response) | `0..30` | [verified-on-device] = `0` | Result code (`0` = Success) |
| `response.description` | response | string | **Required** (within response) | example `Success` | [verified-on-device] = `Success` | Human-readable result |

\* "Required*" = required in sibling dev_mgmt schemas but **not** declared required in this file (S1).

**`interfaceDetails.required` = `[interfaceName, status, hostname, macAddress]`** [verified-from-schema: refrence/response/ethResponseSoti.yaml — interfaceDetails.required]. The live device, with the interface **Disabled**, returned only `{ interfaceName, status }` — omitting the required `hostname` and `macAddress` (and the optional `linkStatus`, `ipv4Configuration`, `security`) [verified-on-device]. This is the observed minimal-`interfaceDetails` behavior when Ethernet is Disabled (D2).

**Deterministic validation result (live vs `response/dev_mgmt/get_eth.json` → `ethResponseSoti.yaml`):**
- **D1** — `interfaceDetails.status = "Disabled"` is **not** in the schema enum `[enabled, disabled]` (Title-case device value vs lowercase schema). Value/case mismatch.
- **D2** — `interfaceDetails` is **missing the required `hostname` and `macAddress`** (device returned only `interfaceName` + `status` because the interface is Disabled).
- `apiVersion = "V1.1"` — **IN** the documented enum `[V1.0, V1.1]` (no violation).

### JSON Response Example (LIVE, verbatim)
```json
{
  "command": "get_eth",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "ethConfig": {
    "interfaceDetails": {
      "interfaceName": "eth0",
      "status": "Disabled"
    }
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

---

## 5. Associated Error Codes

| Code | Status | Name | Triggering Condition | Provenance |
|------|--------|------|----------------------|------------|
| 0 | Success | Success | Ethernet configuration retrieved successfully. Returned live with the interface Disabled. | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883] |
| 7 | Error | Interface is not available | Representable hypothesis — plausible when the Ethernet interface is unavailable/absent on the device. Not observed this run. | code name [verified-from-schema: refrence/response/response.yaml]; trigger→code binding [firmware-only-unknown] |
| 3 | Error | Not able to retrieve information | Secondary hypothesis — the device could not read back the interface details. Not observed this run. | code name [verified-from-schema: refrence/response/response.yaml]; trigger→code binding [firmware-only-unknown] |

Only `code 0` was observed on-device. Codes `7` and `3` are listed as **plausible hypotheses** for this getter; the actual code↔trigger bindings are firmware-internal and unverified. The full `0..30` code table is defined in `refrence/response/response.yaml` [verified-from-schema]. No error code other than `0` is claimed verified on this device [firmware-only-unknown].

---

## 6. Conformance & Spec Notes (this command)

### Live-response discrepancies (device vs schema)

- **D1 — `status` value out-of-enum (case/value mismatch).** Live `ethConfig.interfaceDetails.status = "Disabled"`, but the schema enum is lowercase `[enabled, disabled]` [verified-from-schema: refrence/response/ethResponseSoti.yaml — interfaceDetails.status.enum] vs [verified-on-device]. **Recommended fix:** align casing — either broaden the schema enum to accept the device's Title-case values (`Enabled`/`Disabled`) or normalize the firmware to emit lowercase. Document the canonical casing in the API spec.

- **D2 — required `hostname`/`macAddress` omitted when interface Disabled.** `interfaceDetails.required = [interfaceName, status, hostname, macAddress]`, but the live (Disabled) response returned only `{interfaceName, status}` [verified-from-schema: refrence/response/ethResponseSoti.yaml — interfaceDetails.required] vs [verified-on-device]. **Recommended fix:** model the Disabled state explicitly — e.g. make `hostname`/`macAddress` conditionally required (required only when `status = enabled`), or have the firmware always populate them. The schema's own example #2 (Disabled) already shows the minimal shape, so the `required` list contradicts the schema's own example.

### Schema-quality defects (in the schema itself — not live-response violations)

- **S1 — No top-level `required` array.** `response/dev_mgmt/get_eth.json` declares properties but no top-level `required`, unlike sibling dev_mgmt response schemas that require `[command, requestId, apiVersion, response]` [verified-from-schema: response/dev_mgmt/get_eth.json]. **Recommended fix:** add `"required": ["command","requestId","apiVersion","response"]` for cross-command consistency.

- **S2 — Malformed casing in `examples[0]`.** The first example uses `ethconfig` (lowercase `c`), `InterfaceDetails` (capital `I`), and `hostName` (camel-case `N`) — **none** match the actual schema property names `ethConfig` / `interfaceDetails` / `hostname`. `examples[1]` uses correct casing and matches the live response [verified-from-schema: response/dev_mgmt/get_eth.json — examples]. **Recommended fix:** correct `examples[0]` casing (or remove it) so examples validate against the schema.

- **S3 — `enableDhcp` type/enum/example contradiction.** `ipv4Configuration.enableDhcp` is declared `type: boolean` yet carries `enum: [enabled, disabled]` (strings) and `example: "enabled"` (string) — a boolean can never equal a string enum member [verified-from-schema: refrence/response/ethResponseSoti.yaml — ipv4Configuration.enableDhcp]. Not exercised live (`ipv4Configuration` absent when interface Disabled). **Recommended fix:** pick one representation — either `type: boolean` with `example: true` and no enum, or `type: string` with the `[enabled, disabled]` enum.

- **S4 — Leading-space enum member.** `interfaceDetails.security.EAP802_1X.innerAuthentication` enum contains `" EAP-TLS"` with a **leading space** [verified-from-schema: refrence/response/ethResponseSoti.yaml — innerAuthentication.enum]. Not exercised live. **Recommended fix:** trim to `EAP-TLS`.

- **S5 — Response models features the request doc says are unavailable.** The request schema description states *"Security features, static IP configuration, and IPv6 support are not available in the current API version"* [verified-from-schema: commands/dev_mgmt/get_eth.json — description], yet `ethResponseSoti.yaml` models a full `security`/`EAP802_1X` block and a static-capable `ipv4Configuration` [verified-from-schema: refrence/response/ethResponseSoti.yaml]. **Recommended fix:** reconcile — either remove/flag the unavailable blocks in the response schema or update the request-schema caveat to reflect what is actually supported in this API version.

- **S6 — Orphan response file uses a different container property AND a different payload variant.** The canonical `response/dev_mgmt/get_eth.json` wraps the Ethernet payload under a property named **`ethConfig`** whose `$ref` targets the **SOTI variant** `refrence/response/ethResponseSoti.yaml` [verified-from-schema: response/dev_mgmt/get_eth.json — ethConfig.$ref]. The orphan/non-canonical file `response/dev_mgmt/get_eth_response.json` instead wraps the payload under a property literally named **`rspPpayload`** (a misspelling of `rspPayload`/`respPayload`, with a doubled `P`) whose `$ref` targets the **plain** `refrence/response/ethResponse.yaml` [verified-from-schema: response/dev_mgmt/get_eth_response.json — rspPpayload.$ref, lines 72-73]. The two files therefore differ on **two** axes: (1) the container property name itself (`ethConfig` vs `rspPpayload`), and (2) the payload variant (SOTI vs plain). They do **not** both use an `ethConfig` container. The **live-exercised** `get_eth` uses the canonical `ethConfig` -> SOTI file. **Recommended fix:** confirm the orphan `get_eth_response.json` is intentional (or remove it); if retained, fix the misspelled `rspPpayload` property name and reconcile which payload variant (plain vs SOTI) is canonical to avoid ambiguity. As the non-canonical file, this does not affect the canonical S1-S5 claims.

### Cross-command `apiVersion` note

`get_eth` returned the **in-enum** `apiVersion "V1.1"` [verified-on-device]. However, on the **same session/firmware build**, `get_version` and `get_status` returned `apiVersion "V1.21"` — a value **NOT** in the enum `[V1.0, V1.1]` — while `get_eth`, `get_current_region`, `get_wifi`, `get_endpoint_config`, and `get_installed_certificates` returned `"V1.1"` [verified-on-device: same-session get_version/get_status captures on RFD40 24190525100255 — see live_capture.log]. **`apiVersion` is therefore inconsistent across commands on a single firmware build.** **Recommended fix:** unify `apiVersion` reporting across commands and extend the enum to cover all values the firmware actually emits (e.g. add `V1.21`), or correct the offending commands to emit an in-enum value.
