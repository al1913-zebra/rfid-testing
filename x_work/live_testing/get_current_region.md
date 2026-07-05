# Command: get_current_region

## 1. Intent & Objective

`get_current_region` is a **device-management (dev_mgmt) read command** that retrieves the reader's **current regulatory / RF region configuration** in a single round trip. It returns the complete picture of how the radio is currently allowed to operate under the active regulatory region: whether frequency hopping is engaged, the exact channel plan (the list of channel center frequencies the reader may use), the configured country, whether Listen-Before-Talk (LBT) is active, the minimum and maximum transmit-power limits (in dBm), and the governing regulatory standard. [verified-from-schema: refrence/response/currentRegionResponse.yaml — `currentRegion` object with fields `frequencyHopping`, `channelData`, `country`, `lbtEnabled`, `maxTxPowerSupported`, `minTxPowerSupported`, `regulatoryStandard`]

The command's purpose, per the request schema, is "to retrieve the current region configuration of the device." [verified-from-schema: commands/dev_mgmt/get_current_region.json — `description`]

**What it does (field-by-field):**
- `frequencyHopping` — reports whether the radio is hopping across the channel plan vs. operating on a fixed channel. [verified-from-schema: currentRegionResponse.yaml — `frequencyHopping` (boolean)]
- `channelData` — the channel plan: an array of channel center-frequency strings the reader is permitted to transmit on under the active region. [verified-from-schema: currentRegionResponse.yaml — `channelData` (array of string)]
- `country` — the country the device is configured for. [verified-from-schema: currentRegionResponse.yaml — `country` (string)]
- `lbtEnabled` — whether Listen-Before-Talk is enabled for the region. [verified-from-schema: currentRegionResponse.yaml — `lbtEnabled` (boolean)]
- `maxTxPowerSupported` / `minTxPowerSupported` — the upper and lower transmit-power bounds, measured in dBm. [verified-from-schema: currentRegionResponse.yaml — `maxTxPowerSupported` / `minTxPowerSupported` (number, "measured in dBm")]
- `regulatoryStandard` — the regulatory standard governing the region's transmission rules (e.g., ETSI, FCC). [verified-from-schema: currentRegionResponse.yaml — `regulatoryStandard` (string)]

**When an application uses it:** before starting an inventory, before a compliance audit, or as part of fleet provisioning verification, an application reads the current region to confirm the reader is operating under the correct country/standard and within the expected channel and power envelope. Because regulatory operation is mandatory (a reader configured for the wrong region may transmit out of band or at non-compliant power), this read is typically the gate that precedes any radio operation. The values returned here mirror the parameters a region-set operation would have applied.

**Architectural context:** this is a **read-only dev_mgmt command issued over MQTT** through a device-management endpoint. The live run used the `MDM_REMOTE` endpoint on a plain, anonymous MQTT broker; the request is published to the command topic and the structured response is delivered on the response topic. [verified-from-test-harness: endpoint `MDM_REMOTE`, broker 192.168.1.6:1883, device 192.168.1.5, plain MQTT, anonymous; model RFD40, serial 24190525100255] The command was **exercised live on a physical RFD40** during this run and returned a fully schema-valid response (`response.code` = 0). [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883 — `response.code` = 0]

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `{EP_TYPE}/clients/cmnd` (base `MDM/clients/cmnd`) | n/s | n/s |
| Subscribe (Response) | `{EP_TYPE}/clients/resp` (base `MDM/clients/resp`) | n/s | n/s |

The device wraps the configured base command/response paths (`MDM/clients/cmnd` and `MDM/clients/resp`) into a fully-qualified on-wire form by prepending the configured tenant ID and appending the device serial (i.e., `{tenantId}/{base}/{serial}`). The tenant ID and serial used to construct the live on-wire topics are harness-configuration inputs, not values present in the response payload. [verified-from-test-harness: base paths `MDM/clients/cmnd` / `MDM/clients/resp`; tenant ID and serial supplied as harness configuration]

QoS and Retain are **not specified per-operation** in any schema for this command; they are governed by the endpoint's MQTT parameters (`cfgEndpointPayload.mqttParams`), not by `get_current_region` itself. They are marked `n/s` (not specified) here. [verified-from-schema: commands/dev_mgmt/get_current_region.json — no QoS/retain fields present]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | request root | string | **Required** | example `"get_current_region"`; no enum defined | Specifies the operation being performed — retrieving the current region configuration. [verified-from-schema: get_current_region.json — `command`] |
| `requestId` | request root | string | **Required** | type `string` only; no format/pattern constraint | A unique identifier for the request, allowing tracking and debugging of the operation; echoed back in the response. [verified-from-schema: get_current_region.json — `requestId`] |

There is **no payload key, no parameters object, and no auth field** in the request schema — the request consists solely of `command` and `requestId`, both required. [verified-from-schema: get_current_region.json — `properties` = {command, requestId}; `required` = [command, requestId]]

**Live request sent (operator):** `{"command":"get_current_region","requestId":"abc123"}` — this envelope was validated as **schema-VALID**, and the `requestId` `"abc123"` was **echoed back** in the live response. [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883 — response `requestId` = `"abc123"`]

### JSON Request Example
```json
{ "command": "get_current_region", "requestId": "abc123" }
```

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | response root | string | **Required** | example `"get_current_region"`; no enum | [verified-on-device] returned `"get_current_region"` | The command echoed by the device, indicating the operation performed. [verified-from-schema: response/dev_mgmt/get_current_region.json — `command`; `required`] |
| `requestId` | response root | string | **Required** | type `string` only | [verified-on-device] returned `"abc123"` | Unique identifier for tracking the request; echoes the request's `requestId`. [verified-from-schema: response/dev_mgmt/get_current_region.json — `requestId`; `required`] |
| `apiVersion` | response root | string | **Required** | enum `["V1.0", "V1.1"]` | [verified-on-device] returned `"V1.1"` (IN enum) | The version of the API being called, allowing version-specific processing. [verified-from-schema: response/dev_mgmt/get_current_region.json — `apiVersion`, enum, `required`] |
| `currentRegion` | response root | object (`$ref` currentRegionResponse.yaml) | **Required** (present in live; see note) | n/a — composite, see below | [verified-on-device] full object returned | Detailed region configuration payload. [verified-from-schema: response/dev_mgmt/get_current_region.json — `currentRegion` `$ref`] |
| `response` | response root | object (`$ref` response.yaml) | **Required** | `{code, description}` | [verified-on-device] `{code:0, description:"Success"}` | Standard response wrapper with status code and description. [verified-from-schema: response/dev_mgmt/get_current_region.json — `response` `$ref`, `required`] |
| `response.code` | response.response | integer | **Required** | minimum 0, maximum 30 | [verified-on-device] returned `0` (Success) | Operation result code (see Section 5). [verified-from-schema: refrence/response/response.yaml — `code`, min 0 / max 30, `required`] |
| `response.description` | response.response | string | **Required** | example `"Success"` | [verified-on-device] returned `"Success"` | Human-readable result description. [verified-from-schema: refrence/response/response.yaml — `description`, `required`] |
| `currentRegion.frequencyHopping` | currentRegion | boolean | **Required** | n/a | [verified-on-device] returned `true` | Whether frequency hopping is enabled in the region. [verified-from-schema: currentRegionResponse.yaml — `frequencyHopping`, `required`] |
| `currentRegion.channelData` | currentRegion | array of string | **Required** | items type `string` | [verified-on-device] returned 4 channels: `["865700","866300","866900","867500"]` | List of channel center frequencies available in the region, as strings. [verified-from-schema: currentRegionResponse.yaml — `channelData` (array<string>), `required`] |
| `currentRegion.country` | currentRegion | string | **Required** | **no enum** (free-form) | [verified-on-device] returned `"India"` | The country the device is configured for. [verified-from-schema: currentRegionResponse.yaml — `country`, `required`] |
| `currentRegion.lbtEnabled` | currentRegion | boolean | **Required** | n/a | [verified-on-device] returned `false` | Whether Listen-Before-Talk is enabled for the region. [verified-from-schema: currentRegionResponse.yaml — `lbtEnabled`, `required`] |
| `currentRegion.maxTxPowerSupported` | currentRegion | number | **Required** | dBm; no min/max constraint | [verified-on-device] returned `30` | Maximum transmission power supported in the region, in dBm. [verified-from-schema: currentRegionResponse.yaml — `maxTxPowerSupported`, `required`] |
| `currentRegion.minTxPowerSupported` | currentRegion | number | **Required** | dBm; no min/max constraint | [verified-on-device] returned `0` | Minimum transmission power supported in the region, in dBm. [verified-from-schema: currentRegionResponse.yaml — `minTxPowerSupported`, `required`] |
| `currentRegion.regulatoryStandard` | currentRegion | string | **Required** | **no enum** (free-form) | [verified-on-device] returned `"ETSI"` | The regulatory standard governing the region's transmission rules. [verified-from-schema: currentRegionResponse.yaml — `regulatoryStandard`, `required`] |

**Required-field note:** the response schema lists `[command, requestId, apiVersion, response]` as required at the top level; `currentRegion` is defined as a property but is **not** in the top-level `required` array. [verified-from-schema: response/dev_mgmt/get_current_region.json — `required`] However, on a successful (`code:0`) read it is the operative payload and was present in the live response. All **7 fields inside `currentRegion` are required** by `currentRegionResponse.yaml` and all 7 were present and type-correct in the live response. [verified-from-schema: currentRegionResponse.yaml — `required` lists all 7 fields]

**Conformance statement:** the LIVE RESPONSE is **FULLY SCHEMA-VALID — zero violations**. Every required field was present, every type matched, `apiVersion` was within its enum, and the single observed `response.code` (`0`) is a valid value within the schema's documented 0–30 range. (Only `code 0` was exercised in this run; no other code value was observed, so this is not a statement that the range was tested — see Section 5.) [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883 — `response.code` = 0]

### JSON Response Example (LIVE, verbatim)
```json
{
  "command": "get_current_region",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "currentRegion": {
    "frequencyHopping": true,
    "channelData": [
      "865700",
      "866300",
      "866900",
      "867500"
    ],
    "country": "India",
    "lbtEnabled": false,
    "maxTxPowerSupported": 30,
    "minTxPowerSupported": 0,
    "regulatoryStandard": "ETSI"
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
| 0 | Success | Success | Region configuration successfully retrieved; `currentRegion` payload returned. Observed live. | [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883 — `response.code` = 0, `description` = "Success"] |
| 6 | Failure | Region is not configured | Most plausible region-specific failure: the reader has no active region set, so there is no region configuration to return. The exact code↔trigger binding for this command was not observed on-device. | [verified-from-schema: refrence/response/response.yaml — code 6 "Region is not configured"]; trigger [firmware-only-unknown] |
| 3 | Failure | Not able to retrieve information | Secondary hypothesis: the device cannot retrieve the region information (e.g., transient internal/read failure). Not observed on-device; binding unconfirmed. | [verified-from-schema: refrence/response/response.yaml — code 3 "Not able to retrieve information"]; trigger [firmware-only-unknown] |

Only `code 0` was observed on the device. Codes 6 and 3 are **representable hypotheses** drawn from the canonical 0–30 code table in `response.yaml`; their association with `get_current_region` is unverified firmware behavior. No other code is claimed as verified for this command, and all codes are constrained to the documented 0–30 range. [verified-from-schema: refrence/response/response.yaml — `code` minimum 0 / maximum 30] [firmware-only-unknown: any non-zero code↔trigger binding for this command]

## 6. Conformance & Spec Notes (this command)

**Headline (positive result):** the LIVE RESPONSE for `get_current_region` was **FULLY SCHEMA-VALID with zero violations**. All required top-level fields (`command`, `requestId`, `apiVersion`, `response`) and all 7 required `currentRegion` fields were present and type-correct, `apiVersion` was within its enum, and the observed `response.code` (`0`) is a valid in-range value. [verified-on-device: RFD40 @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883 — `response.code` = 0]

**P1 — apiVersion is in-enum for this command.** The device returned `apiVersion` `"V1.1"`, which **IS** within the documented enum `["V1.0", "V1.1"]`; this command's own response validated cleanly on this field. [verified-on-device — `apiVersion` = "V1.1"] [verified-from-schema: response/dev_mgmt/get_current_region.json — `apiVersion` enum] *Cross-command observation (this session, same firmware — `apiVersion` is INCONSISTENT across commands):* on this one firmware build (RFD40, serial `24190525100255`, firmware `PAAFKS00-013-R02`), different commands emit different `apiVersion` values. In the same session, **`get_version` and `get_status` returned `apiVersion` `"V1.21"`**, which is **NOT** in the documented enum `["V1.0","V1.1"]`, whereas `get_current_region` (and `get_wifi`, `get_eth`, `get_endpoint_config`, `get_installed_certificates`) returned the in-enum `"V1.1"`. So a single firmware build reports two different `apiVersion` values depending on the command — `get_current_region` happens to fall on the in-enum side. [verified-on-device: same-session captures on RFD40 24190525100255 — `get_version`/`get_status` `apiVersion` = `"V1.21"`; evidence in `get_version.md`, `get_status.md`, `phase4-validation-report.md` (Live Device Verification), and `live_capture.log`] *Recommended fix:* treat `apiVersion` as a firmware-level constant and make it consistent across all commands; if `"V1.21"` is intended, add it to the shared `apiVersion` enum, otherwise correct the firmware so every command reports a value within `["V1.0", "V1.1"]`.

The following are **defects in the SCHEMA itself / its examples** — they are NOT live-response violations. The live device behaved correctly; these are documentation-quality issues in the schema files.

**S1 — `minTxPowerSupported` example is type-invalid against its own type.** In `currentRegionResponse.yaml`, `minTxPowerSupported` is declared `type: number`, but its `example` is the **quoted string `'10.0'`**, which is type-invalid against its own declared type. The live device correctly returned the numeric `0`. *Recommended fix:* change the example to an unquoted number (e.g., `10.0` or `0`). [verified-from-schema: refrence/response/currentRegionResponse.yaml — `minTxPowerSupported` type `number`, example `'10.0'`] [verified-on-device — returned numeric `0`]

**S2 — malformed `channelData.items.example`.** In `currentRegionResponse.yaml`, `channelData.items` is `type: string` with `example: '"915250,915750"'` — a **double-quoted, comma-joined string** that does not represent a single channel frequency. Real `channelData` items are **single frequency strings** (the live device returned items like `"865700"`, `"866300"`). The example misrepresents the item shape and could mislead implementers into joining frequencies into one element. *Recommended fix:* set the item example to a single frequency string, e.g., `"865700"`. [verified-from-schema: refrence/response/currentRegionResponse.yaml — `channelData.items.example` = `'"915250,915750"'`] [verified-on-device — `channelData` items are single frequency strings]

**S3 — stale / implausible US example in the response schema.** The response-schema example in `response/dev_mgmt/get_current_region.json` shows a **US / FCC** region with ~50 channels and `maxTxPowerSupported: 300`, whereas the live device is **India / ETSI** with 4 channels and `maxTxPowerSupported: 30`. Since `maxTxPowerSupported` is documented in dBm, **300 dBm is physically implausible** (a value off by an order of magnitude vs. the live `30`), suggesting a stale or unit-confused example. *Recommended fix:* refresh the example to a realistic, current device configuration and correct the power value to a plausible dBm figure (e.g., 30). This is both a documentation-freshness issue and a suspicious example value. [verified-from-schema: response/dev_mgmt/get_current_region.json — `examples[0]` country "United States", regulatoryStandard "FCC", `maxTxPowerSupported` 300] [verified-on-device — country "India", regulatoryStandard "ETSI", `maxTxPowerSupported` 30]

**S4 — `country` and `regulatoryStandard` are unconstrained free-form strings.** Neither field defines an `enum` in `currentRegionResponse.yaml`; both are plain `type: string`. The device returned `"India"` and `"ETSI"`, while the schema property examples are `USA` (for `country`) and `ETSI_EU_800M_900M_3_CHANNEL` (for `regulatoryStandard`) — i.e., the examples diverge from live values and the field formats are not standardized. Without an enum the schema does not constrain the allowed set of countries/standards, so clients cannot rely on a fixed vocabulary (a design choice that may be a gap if a controlled set is expected). *Recommended fix:* if the allowed set is finite, add enums for `country` and `regulatoryStandard` (and align examples to the actual device vocabulary, e.g., `India` / `ETSI`); otherwise document explicitly that they are free-form and clarify the expected token format. [verified-from-schema: refrence/response/currentRegionResponse.yaml — `country` / `regulatoryStandard` are `type: string` with no enum; examples `USA` / `ETSI_EU_800M_900M_3_CHANNEL`] [verified-on-device — returned "India" / "ETSI"]

**Summary distinction:** P1 confirms that **this command's own `apiVersion` is in-enum and its response validated cleanly**; any cross-command `apiVersion` consistency concern is a generic, scoped note ([firmware-only-unknown]) since no sibling-command response was captured in this run. S1–S4 are **schema/example** defects in the repo files and do not reflect any defect in the live device behavior — the live `get_current_region` response was fully schema-valid.
