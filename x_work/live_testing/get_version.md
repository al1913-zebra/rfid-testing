# Command: get_version

## 1. Intent & Objective

`get_version` is a **device-management (dev_mgmt) read command** for the Zebra Handheld RFID readers (RFD40 Series / RFD90 Series) exposed over the IoT Connector (IoTC) MQTT API. Its single purpose is to retrieve the reader's **identity and software-version metadata** in one round trip — it changes no state on the device and takes no parameters beyond the command envelope. The schema describes it as a command "used to retrieve the reader information like device serial no, model no, sku, and firmware version information." [verified-from-schema: commands/dev_mgmt/get_version.json#/description]

**What it returns.** The response carries a structured `readerVersion` object plus an `apiVersion` string and a standard `response` status block. From `readerVersion` an application learns:
- the reader **model** (`RFD40` or `RFD90`) — [verified-from-schema: refrence/response/readerVersionResponse.yaml#/properties/model/enum];
- the **serialNumber** and **sku** (regional/hardware variant) — [verified-from-schema: readerVersionResponse.yaml#/properties/serialNumber, #/properties/sku];
- the top-level **firmwareVersion** of the reader — [verified-from-schema: readerVersionResponse.yaml#/properties/firmwareVersion];
- **companyName** and **manufacturerName** (both constrained to "Zebra Technologies") — [verified-from-schema: readerVersionResponse.yaml#/properties/companyName, #/properties/manufacturerName];
- a nested **detailedVersions** object breaking out `scannerFirmware`, `radioFirmware`, and the IoTC software version `iotcVersion` — [verified-from-schema: readerVersionResponse.yaml#/properties/detailedVersions].

**When an application uses it.** The grounding page lists three primary use cases: identifying the exact device model and serial number, verifying firmware/component version alignment, and confirming the device software baseline before updates or troubleshooting. [verified-from-_meta-knowledge-base: .../get_version.md §3]. In practice this maps to:
- **Asset tracking / device registration** — the `serialNumber` is used to match the physical device label and to key support tickets and inventory records. [verified-from-_meta-knowledge-base: .../get_version.md §3 field table]
- **Firmware-version gating** — an orchestrator compares `firmwareVersion` (and the component versions in `detailedVersions`) against an expected baseline before pushing an update or diagnosing an issue. [verified-from-_meta-knowledge-base: .../get_version.md §3]
- **Capability/feature negotiation & support** — `detailedVersions.iotcVersion` "determines which MQTT API commands and features are available," so callers read it to decide which commands they may safely issue. [verified-from-_meta-knowledge-base: .../get_version.md §3 field table]

**Architectural context.** `get_version` is a dev-management command (repo path `commands/dev_mgmt/`). The grounding page situates it alongside `get_config`, `get_status`, and `set_os` as a "Device Identity and Firmware Retrieval" pattern that applies to both RFD40 and RFD90 series. [verified-from-_meta-knowledge-base: .../get_version.md §2]. The request is a minimal envelope (`command` + `requestId`) and the device echoes the `requestId` in the response so the caller can correlate the reply. [verified-from-schema: commands/dev_mgmt/get_version.json#/properties, #/required]. On the test harness, the command was published to and answered on the `MDM_REMOTE` endpoint's command/response topics (request `zebra/MDM/clients/cmnd/RFD40-24190525100255`, response `zebra/MDM/clients/resp/RFD40-24190525100255`); the grounding §2 table itself carries no endpoint/topic/routing content, only the pattern name, applicability, related commands, required request fields, and supported operations. [verified-from-test-harness: endpoint MDM_REMOTE, publish topic zebra/MDM/clients/cmnd/RFD40-24190525100255, response topic zebra/MDM/clients/resp/RFD40-24190525100255]

**Live observation.** This command was exercised live this run against a physical RFD40 (sku `RFD4031-G10B700-E8`, serial `24190525100255`). It returned `response.code = 0` ("Success") with a fully-populated `readerVersion` object — model `RFD40`, serial `24190525100255`, sku `RFD4031-G10B700-E8`, firmware `PAAFKS00-013-R02` — and `apiVersion` `V1.21`, echoing `requestId` `abc123`. [verified-on-device: model RFD40, serial 24190525100255, sku RFD4031-G10B700-E8, firmware PAAFKS00-013-R02, apiVersion V1.21, requestId abc123, response.code 0]. The run-environment transport facts (device reached via the `MDM_REMOTE` endpoint over broker `192.168.1.6:1883`, device IP `192.168.1.5`) are not part of the response payload. [verified-from-test-harness: device @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883 plain MQTT anonymous]

## 2. Topic Mapping

| Direction | Topic Path | QoS | Retain |
|-----------|-----------|-----|--------|
| Publish (Request) | `{EP_TYPE}/clients/cmnd`  (LIVE: `zebra/MDM/clients/cmnd/RFD40-24190525100255`) | n/s | n/s |
| Subscribe (Response) | `{EP_TYPE}/clients/resp` (LIVE: `zebra/MDM/clients/resp/RFD40-24190525100255`) | n/s | n/s |

Notes:
- The configured base topics are `MDM/clients/cmnd` and `MDM/clients/resp` (endpoint `MDM_REMOTE`). On the wire the device wraps the base as `{tenantId}/{base}/{serial}`, i.e. `zebra/MDM/clients/cmnd/RFD40-24190525100255` for the request and `zebra/MDM/clients/resp/RFD40-24190525100255` for the response, with `tenantId = zebra` and the serial-suffix `RFD40-24190525100255`. [verified-from-test-harness: publish topic zebra/MDM/clients/cmnd/RFD40-24190525100255, response topic zebra/MDM/clients/resp/RFD40-24190525100255, tenantId=zebra, serial-in-topic, endpoint MDM_REMOTE, broker 192.168.1.6:1883 plain MQTT anonymous]
- **QoS and Retain are not specified per-operation** (`n/s`): neither the request schema nor the response schema defines QoS or retain. These transport settings are governed by the endpoint's `cfgEndpointPayload.mqttParams`, not by the `get_version` command. [verified-from-schema: commands/dev_mgmt/get_version.json — no QoS/retain fields present]

## 3. Request Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Description |
|-------|----------|------|-------------------|---------------------------|-------------|
| `command` | top-level | string | **Required** | example `get_version`; no `enum` defined | Identifies the operation; "used to get the reader information." [verified-from-schema: commands/dev_mgmt/get_version.json#/properties/command, #/required] |
| `requestId` | top-level | string | **Required** | example `abc123`; **no hex/length/pattern constraint** | A unique identifier for the request, allowing tracking and debugging; echoed back in the response. [verified-from-schema: commands/dev_mgmt/get_version.json#/properties/requestId, #/required] |

Notes:
- The request object defines **only** `command` and `requestId`; there is **no `payload` key** and **no `auth` field** of any kind. [verified-from-schema: commands/dev_mgmt/get_version.json#/properties, #/required]
- `requestId` is typed `string` only — there is no enforced hex encoding, minimum/maximum length, or regex pattern. [verified-from-schema: commands/dev_mgmt/get_version.json#/properties/requestId]
- **Live:** the exact request published was `{"command":"get_version","requestId":"abc123"}`. It validated **schema-VALID** against the request schema, and the device **echoed `requestId` as `abc123`** in the response. [verified-on-device: requestId echoed abc123]. The request was carried over the `MDM_REMOTE` endpoint topic. [verified-from-test-harness: device @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]

### JSON Request Example
```json
{ "command": "get_version", "requestId": "abc123" }
```

## 4. Response Payload Breakdown

| Field | Location | Type | Required/Optional | Allowed Enums/Constraints | Provenance | Description |
|-------|----------|------|-------------------|---------------------------|------------|-------------|
| `command` | top-level | string | **Required** | default `get_version` | [verified-on-device — returned `"get_version"`] | The command that was executed to retrieve the reader version details. (schema: response/dev_mgmt/get_version.json#/properties/command, #/required) |
| `requestId` | top-level | string | **Required** | example `abcd123`; no pattern/length | [verified-on-device — echoed `"abc123"`] | The unique identifier of the original request. (schema: response/dev_mgmt/get_version.json#/properties/requestId, #/required) |
| `apiVersion` | top-level | string (enum) | **Required** | enum `["V1.1","V1.0"]` | [verified-on-device — returned `"V1.21"` → **D1**: not in documented enum] | API version string. Schema enum is `V1.1` / `V1.0`; device returned an undocumented `V1.21`. (schema: response/dev_mgmt/get_version.json#/properties/apiVersion/enum, #/required) |
| `readerVersion` | top-level | object (`$ref` readerVersionResponse.yaml) | Optional (not in top-level `required`) | per referenced schema | [verified-on-device — fully populated object returned] | Container for device version details. (schema: response/dev_mgmt/get_version.json#/properties/readerVersion → refrence/response/readerVersionResponse.yaml) |
| `response` | top-level | object (`$ref` response.yaml) | **Required** | `{code:integer 0–30, description:string}` | [verified-on-device — `{code:0, description:"Success"}`] | Standard status block. (schema: response/dev_mgmt/get_version.json#/properties/response, #/required → refrence/response/response.yaml) |
| `readerVersion.firmwareVersion` | nested | string | **Required** (in readerVersion) | free-form string; example `SAAFKS00-006-R02` | [verified-on-device — **present**, value `"PAAFKS00-013-R02"`] | The firmware version of the reader. (schema: readerVersionResponse.yaml#/properties/firmwareVersion, #/required) |
| `readerVersion.model` | nested | string (enum) | **Required** (in readerVersion) | enum `["RFD40","RFD90"]` | [verified-on-device — **present**, value `"RFD40"` (in enum)] | The model of the reader. (schema: readerVersionResponse.yaml#/properties/model/enum, #/required) |
| `readerVersion.serialNumber` | nested | string | **Required** (in readerVersion) | free-form string; example `23053520102096` | [verified-on-device — **present**, value `"24190525100255"`] | The serial number of the reader. (schema: readerVersionResponse.yaml#/properties/serialNumber, #/required) |
| `readerVersion.sku` | nested | string | **Required** (in readerVersion) | free-form string; example `RFD4031-G10B700-US` | [verified-on-device — **present**, value `"RFD4031-G10B700-E8"`] | The SKU identifier for the reader. (schema: readerVersionResponse.yaml#/properties/sku, #/required) |
| `readerVersion.companyName` | nested | string (enum) | **Required** (in readerVersion) | enum `["Zebra Technologies"]` | [verified-on-device — **present**, value `"Zebra Technologies"` (in enum)] | The company name associated with the reader. (schema: readerVersionResponse.yaml#/properties/companyName/enum, #/required) |
| `readerVersion.manufacturerName` | nested | string (enum) | **Required** (in readerVersion) | enum `["Zebra Technologies"]` | [verified-on-device — **present**, value `"Zebra Technologies"` (in enum)] | The manufacturer name associated with the reader. (schema: readerVersionResponse.yaml#/properties/manufacturerName/enum, #/required) |
| `readerVersion.detailedVersions` | nested | object | Optional (not in readerVersion `required`) | object | [verified-on-device — object returned] | Detailed component version information. (schema: readerVersionResponse.yaml#/properties/detailedVersions) |
| `readerVersion.detailedVersions.scannerFirmware` | nested | string | Optional | free-form string; example `PAAEOC20-003-R01` | [verified-on-device — value `"PAAEOC20-003-R01"`] | The firmware version of the scanner component. (schema: readerVersionResponse.yaml#/properties/detailedVersions/properties/scannerFirmware) |
| `readerVersion.detailedVersions.radioFirmware` | nested | string | Optional | free-form string; example `2.0.42.0` | [verified-on-device — value `"2.0.53.0"`] | The firmware version of the radio component. (schema: readerVersionResponse.yaml#/properties/detailedVersions/properties/radioFirmware) |
| `readerVersion.detailedVersions.iotcVersion` | nested | string (enum) | Optional | enum `["V1.1"]` | [verified-on-device — returned `"V1.21"` → **D2**: not in documented enum] | The IoT Connector (IoTC) software version. Schema enum allows only `V1.1`; device returned `V1.21`. (schema: readerVersionResponse.yaml#/properties/detailedVersions/properties/iotcVersion/enum) |
| `response.code` | nested | integer | **Required** (in response) | `minimum:0`, `maximum:30` (see error table §5) | [verified-on-device — value `0`] | The schema's own `code.description` is the markdown response-code table ("Response codes: \| Code \| Meaning \| ... \| 0 \| Success \| ..."); the phrasing "Command response status code." is the grounding page's wording. [verified-from-schema: refrence/response/response.yaml#/properties/code (type integer, minimum 0, maximum 30, description = response-code table)] / "Command response status code." [verified-from-_meta-knowledge-base: .../get_version.md p.3 Response Schema, code row] |
| `response.description` | nested | string | **Required** (in response) | free-form string; example `Success` | [verified-on-device — value `"Success"`] | Response description in detail. (schema: response.yaml#/properties/description, #/required) |

Note on required-field coverage: all **6** `readerVersion` required fields (`firmwareVersion`, `model`, `serialNumber`, `sku`, `companyName`, `manufacturerName`) were **present** in the live response — no omission. [verified-on-device: 6 required readerVersion fields present]. The reading was taken over the test endpoint. [verified-from-test-harness: device @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]

### JSON Response Example (LIVE, verbatim)
```json
{
  "command": "get_version",
  "requestId": "abc123",
  "apiVersion": "V1.21",
  "readerVersion": {
    "firmwareVersion": "PAAFKS00-013-R02",
    "model": "RFD40",
    "serialNumber": "24190525100255",
    "sku": "RFD4031-G10B700-E8",
    "companyName": "Zebra Technologies",
    "manufacturerName": "Zebra Technologies",
    "detailedVersions": {
      "scannerFirmware": "PAAEOC20-003-R01",
      "radioFirmware": "2.0.53.0",
      "iotcVersion": "V1.21"
    }
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
| 0 | Success | Success | Reader version details successfully retrieved and returned. Returned live with the full `readerVersion` payload. | [verified-on-device: response.code = 0, description "Success"] (run env [verified-from-test-harness: device @192.168.1.5 via MDM_REMOTE broker 192.168.1.6:1883]) |
| 3 | Error | Not able to retrieve information | Representable hypothesis: the most plausible failure code for a version-retrieval command if the device cannot read its identity/version data. The exact code↔trigger binding for `get_version` was not exercised this run. | Code/name [verified-from-schema: refrence/response/response.yaml#/properties/code table]; trigger binding [firmware-only-unknown] |

Notes:
- The `response.code` field is constrained to integers `0–30`; the full meaning table (Code 0 Success … Code 30) lives in `response.yaml`. Only **code 0** was observed live; **no other code is claimed verified on-device**. [verified-from-schema: refrence/response/response.yaml#/properties/code (minimum 0, maximum 30)]
- Mapping of any non-zero code to a specific `get_version` failure condition is firmware-determined and was not exercised. [firmware-only-unknown]

## 6. Spec-vs-Device Discrepancies (this command)

- **D1 — `apiVersion` value out of enum.** The live device returned `apiVersion = "V1.21"`, which is **not** in the documented enum `["V1.1","V1.0"]`. [verified-on-device: apiVersion V1.21] vs [verified-from-schema: response/dev_mgmt/get_version.json#/properties/apiVersion/enum]. **Recommended source fix:** extend the `apiVersion` enum in `response/dev_mgmt/get_version.json` to include `V1.21` (and update the corresponding `_meta` grounding page §"Response Schema" which lists "Allowed: V1.1 | V1.0"), or relax the field to an unconstrained version `string` if firmware will continue to advance the version freely.

- **D2 — `detailedVersions.iotcVersion` value out of enum.** The live device returned `iotcVersion = "V1.21"`, which is **not** in the documented enum `["V1.1"]`. [verified-on-device: iotcVersion V1.21] vs [verified-from-schema: refrence/response/readerVersionResponse.yaml#/properties/detailedVersions/properties/iotcVersion/enum]. **Recommended source fix:** extend the `iotcVersion` enum in `refrence/response/readerVersionResponse.yaml` to include `V1.21` (and keep it aligned with `apiVersion`, since both reported the same value live), or convert it to an unconstrained version `string`.

- **D3 — Minor example divergence (type-valid, not a validation failure).** Three free-form string fields returned values that differ from the schema/grounding examples but carry no enum or pattern, so they validate cleanly:
  - `readerVersion.firmwareVersion` live `"PAAFKS00-013-R02"` vs schema example `"SAAFKS00-006-R02"`.
  - `readerVersion.sku` live `"RFD4031-G10B700-E8"` vs schema example `"RFD4031-G10B700-US"`.
  - `readerVersion.serialNumber` live `"24190525100255"` vs schema example `"23053520102096"`.
  Values [verified-on-device: firmwareVersion PAAFKS00-013-R02, sku RFD4031-G10B700-E8, serialNumber 24190525100255]; examples [verified-from-schema: refrence/response/readerVersionResponse.yaml#/properties/{firmwareVersion,sku,serialNumber}]. **Recommended source fix:** refresh the `example` values in `readerVersionResponse.yaml` (and the `_meta` grounding page sample response) to reflect a current RFD40 (sku `RFD4031-G10B700-E8`) reading so the documentation matches observed firmware/SKU/serial formats. No schema-type change required.
