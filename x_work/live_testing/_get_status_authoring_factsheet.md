# get_status — authoring source-of-truth fact sheet

Canonical, reconciled facts for authoring the public MQTT reference page
`iotc-docs/docs/reference/mgmt/get-status.mdx` from `COMMAND_TEMPLATE.mdx`.
**The current standalone schema files are the single source of truth.** The
`x_work/tw_adds/*` descriptions and the `x_work/live_testing/get_status.md`
report were written against the **OLD** schema and flag divergences that have
since been **FIXED** — do NOT reproduce those fixed divergences as if they were
still live. `openapi.json` inline examples are drifted (GAP-H-0256) — ignore
them; use the standalone files below.

## Source files (relative to `handheld-rfid-iotc-api-schema-and-docs-zebra-official/`)

- Request envelope: `commands/dev_mgmt/get_status.json`
- Response envelope: `response/dev_mgmt/get_status.json`
- `deviceStatus` object: `refrence/response/deviceStatusResponse.yaml` (note: folder spelling "refrence" is intentional)
- `response` object + code table: `refrence/response/response.yaml`

## 1. Command classification

| Property | Value |
| --- | --- |
| Command name | `get_status` |
| Plane / endpoint | Device-management — the site calls it the **MGMT endpoint** (the reference test device used an endpoint of type **MDM**; the topic base is endpoint-configurable) |
| Pattern | Request / Response (app publishes a command; device publishes the correlated reply) |
| State change | **READ-ONLY** (a query; receiving the reply changes nothing on the device) |
| Reversibility | n/a (read-only) |
| Device models | RFD40 series, RFD90 series (verified on **RFD40 Premium+**) |
| Description (from schema) | "This command used to retrieve the reader status information." |

## 2. Request schema — `commands/dev_mgmt/get_status.json`

Envelope is just two fields (no payload wrapper, no `auth` block):

| Field | Type | Required | Example | Description |
| --- | --- | --- | --- | --- |
| `command` | string | Yes | `get_status` | Command used to get the reader status information. |
| `requestId` | string | Yes | `abcd123` | A unique identifier for the request, allowing tracking and debugging of the operation. Echoed back unchanged in the response. |

`required: [command, requestId]`. There is **no** `payload`/named-payload key and **no** `auth` object — broker credentials are presented once at CONNECT, not per message.

Request example (verbatim shape):
```json
{ "command": "get_status", "requestId": "abcd123" }
```

## 3. Response schema — `response/dev_mgmt/get_status.json`

Top-level response fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `command` | string | Yes | Echoes the executed command (`get_status`). |
| `requestId` | string | Yes | Echoes the request's `requestId` — pairs reply to request. |
| `apiVersion` | enum(string) | Yes | enum = **`V1.1`, `V1.2`, `V1.21`**; schema example `V1.21`. (This enum was widened — see §7 FIXED-1.) |
| `deviceStatus` | object | **No** (optional; NOT in `required`) | `$ref` deviceStatusResponse.yaml — the status snapshot. |
| `response` | object | Yes | `$ref` response.yaml — `{ code, description }`. |

`required: [command, requestId, apiVersion, response]` — note `deviceStatus` is **optional** at the envelope level.

## 4. `deviceStatus` object — `refrence/response/deviceStatusResponse.yaml`

`required: [powerSource, radioActivity, radioConnection, systemTime]` — everything else is **optional** and may be absent depending on device state/model.

| Field | Type | Required | Enum / constraint | Example | Description |
| --- | --- | --- | --- | --- | --- |
| `powerSource` | string(enum) | **Yes** | `DC` / `WALLCHARGER` / `USB` / `CRADLE` | `CRADLE` | The source of power for the device. |
| `radioActivity` | string(enum) | **Yes** | `INACTIVE` / `ACTIVE` | `ACTIVE` | Activity status of the RFID radio. |
| `radioConnection` | string(enum) | **Yes** | `CONNECTED` / `DISCONNECTED` | `CONNECTED` | Connection status of the RFID radio. |
| `systemTime` | string | **Yes** | `format: date-time` (ISO 8601) | `2022-07-01T03:01:31.464Z` | Device system time in ISO 8601. (format was `time` → now `date-time`; see §7 FIXED-4.) |
| `hostname` | string | No | — | `RFD40-212735201D0053.local` | Device hostname on the network. (Was wrongly `required`; now optional — §7 FIXED-2.) |
| `temperature` | integer | No | °C | `32` | **Device** temperature (top level). (Was wrongly `required`; now optional — §7 FIXED-3.) |
| `ntp` | object | No | — | — | NTP synchronization details. |
| `ntp.offset` | integer | No | milliseconds | `120` | Offset in ms between the device clock and the NTP server. |
| `ntp.reach` | integer | No | — | `321` | NTP server reachability score. `0` = server not reached / not syncing. |
| `terminalConnection` | object | No | — | — | Host-terminal link to the sled. |
| `terminalConnection.status` | string(enum) | No | `CONNECTED` / `DISCONNECTED` | `CONNECTED` | Terminal connection status. |
| `terminalConnection.type` | string(enum) | No | `BLUETOOTH` / `CIO` / `USB` | `USB` | Terminal transport type. |
| `batteryStatus` | object | No | — | — | Battery status information. |
| `batteryStatus.mfgDate` | string | No | DDMMMYYYY | `22DEC2024` | Battery manufacture date. (Example format corrected — §7 FIXED-6.) |
| `batteryStatus.cycleCount` | integer | No | — | `120` | Completed battery charge cycles. |
| `batteryStatus.fullChargeCapacity` | integer | No | mAh | `3200` | Current full-charge capacity. |
| `batteryStatus.temperature` | integer | No | °C | `32` | **Battery** temperature (distinct from the device `temperature` above). |
| `batteryStatus.designCapacity` | integer | No | mAh | `7000` | Designed battery capacity. |
| `batteryStatus.batteryType` | string | No | — | `LI-ION` | Battery chemistry/type. (Example casing corrected — §7 FIXED-5.) |
| `batteryStatus.capacity` | integer | No | mAh | `5000` | Remaining battery capacity. |
| `batteryStatus.stateOfHealth` | string(enum) | No | `GOOD` / `AVERAGE` / `POOR` | `GOOD` | Overall battery health. |
| `batteryStatus.chargePercentage` | integer | No | 0–100 | `23` | Percentage of charge remaining. |
| `batteryStatus.chargeStatus` | integer | No | `0` / `1` / `2` | `1` | Charging status: `0` = charger not connected; `1` = charger connected, charging in progress; `2` = charger connected, battery at 100%. |

**Two temperatures:** `deviceStatus.temperature` (device, optional) and `deviceStatus.batteryStatus.temperature` (battery). Do not conflate them.

## 5. Response object + codes — `refrence/response/response.yaml`

`response` = `{ code: integer (min 0, max 101), description: string }`, both required.

Codes **relevant to `get_status`** (source the meanings from response.yaml; do NOT invent a numeric range or label anything "out of range"):

| Code | Meaning | Applies to get_status |
| --- | --- | --- |
| `0` | Success | Yes — status retrieved and returned (the only code observed live). |
| `3` | Not able to retrieve information | Yes — the reader could not gather the requested status at this moment; retry, and if persistent, reboot after stopping any active inventory. |
| `101` | Default error | Generic catch-all in the table. |

The full code table (0–33, plus 101) lives in the Error codes reference — link there, do not duplicate the whole table on this page.

## 6. Live capture (verbatim, RFD40 Premium+, serial 24190525100255, firmware PAAFKS00-013-R02)

Request sent: `{"command":"get_status","requestId":"abcd123"}`. Device replied with `code 0` / `"Success"`, `apiVersion "V1.21"`, and this `deviceStatus` (note it **omits** `hostname` and top-level `temperature` — consistent with them now being optional):

```json
{
  "command": "get_status",
  "requestId": "abcd123",
  "apiVersion": "V1.21",
  "deviceStatus": {
    "powerSource": "USB",
    "radioActivity": "INACTIVE",
    "radioConnection": "DISCONNECTED",
    "systemTime": "2026-06-12T15:28:37.971Z",
    "ntp": {
      "offset": 0,
      "reach": 0
    },
    "terminalConnection": {
      "status": "CONNECTED",
      "type": "USB"
    },
    "batteryStatus": {
      "mfgDate": "19APR2024",
      "cycleCount": 24,
      "fullChargeCapacity": 6149,
      "temperature": 29,
      "designCapacity": 6400,
      "batteryType": "LI-ION",
      "capacity": 6087,
      "stateOfHealth": "GOOD",
      "chargePercentage": 99,
      "chargeStatus": 0
    }
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

A schema-valid **minimal** response (required deviceStatus fields only) looks like:
```json
{
  "command": "get_status",
  "requestId": "abcd123",
  "apiVersion": "V1.21",
  "deviceStatus": {
    "powerSource": "USB",
    "radioActivity": "INACTIVE",
    "radioConnection": "DISCONNECTED",
    "systemTime": "2026-06-12T15:28:37.971Z"
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

## 7. FIXED divergences — DO NOT resurrect these as live issues

All confirmed FIXED on the current disk (divergence report GAP-H-0118…0125, all FIXED_CONFIRMED):

- **FIXED-1 (GAP-H-0119):** `apiVersion` enum widened to include `V1.21` (now `V1.1`/`V1.2`/`V1.21`). The live `V1.21` is in-enum. Do NOT say `V1.21` is out of the documented enum.
- **FIXED-2 (GAP-H-0120):** `hostname` removed from `deviceStatus.required` — now optional. Do NOT list it as required.
- **FIXED-3 (GAP-H-0121):** top-level `temperature` removed from `deviceStatus.required` — now optional.
- **FIXED-4 (GAP-H-0118 + 0122 + 0123):** `systemTime` key no longer has a trailing space; its `type: string` / `format: date-time` now bind; `required` entry is satisfiable. Do NOT mention a trailing-space bug or `format: time`.
- **FIXED-5 (GAP-H-0124):** `batteryType` example is now `LI-ION`.
- **FIXED-6 (GAP-H-0125):** `mfgDate` example is now `22DEC2024` (DDMMMYYYY).

What IS still worth stating as neutral behavior (not a "bug"): the optional `deviceStatus` members (`hostname`, top-level `temperature`, `ntp`, `terminalConnection`, `batteryStatus`) may be absent depending on device state/model — the live RFD40 Premium+ omitted `hostname` and top-level `temperature`. Cross-command `apiVersion` reporting can differ (e.g. `mqttConnEVT` emits a numeric `apiVersion`); that is a firmware note, not a `get_status` schema defect.

## 8. Topic mapping

Three-segment topic pattern used by this site: `<tenantId> / <topic> / <deviceSerialNumber>`, where `<topic>` is configured per endpoint.

| Direction | Topic | Note |
| --- | --- | --- |
| Request (publish by app) | `zebra/MGMT/clients/cmnd/{serial}` | On the management endpoint. The reference test device used the `MDM` base: `zebra/MDM/clients/cmnd/{serial}`. |
| Response (subscribe by app; published by device) | `zebra/MGMT/clients/resp/{serial}` | Correlated reply; `requestId` links the twin topics. Test device: `zebra/MDM/clients/resp/{serial}`. |

No per-message auth block; credentials are presented once at CONNECT. QoS/retain are governed by the endpoint's `mqttParams`, not by this command — do not assert a fixed QoS.

## 9. Operational cross-command facts (accurate, useful for When to Use / Notes)

- Check `deviceStatus.radioActivity` **before** `reboot` or `set_operating_mode`: if it is `ACTIVE`, `reboot` is rejected (code `5`, "Can't reboot device, inventory in progress") and `set_operating_mode` is rejected (code `11`, "Inventory in progress").
- No on-device RTC backup battery: after a cold start / factory reset, before SNTP has synced, `systemTime` is a baseline default and `ntp.reach` is `0`. Time-sensitive operations (TLS cert validity, log/event timestamps) may use the default time until `ntp.reach` becomes non-zero.
- `get_status` is the on-demand poll; the same health domains are also pushed asynchronously via `heartbeatEVT` / alerts. Prefer the events for continuous monitoring, `get_status` for a point-in-time check.

## 10. Site conventions the page MUST follow (for native feel + a clean build)

- Frontmatter keys: `id`, `title`, `sidebar_label`, `description`, `sidebar_custom_props: { emoji: "🩺" }`.
- Body opens with the reference banner blockquote, e.g.:
  `> 📕 **REFERENCE** · **Audience:** API consumer · **Use:** request an on-demand device-health snapshot`
- Admonitions use Docusaurus syntax with optional bracket titles: `:::note[Title]`, `:::tip`, `:::info`, `:::warning`, `:::danger`. Never place an admonition inside a `<TabItem>`.
- End with a `**Related:**` line using 📘 (concept) / 📕 (reference) emoji links.
- `onBrokenLinks` and `onBrokenAnchors` are set to **throw**. Only link to internal pages that EXIST and same-page anchors that match a real heading. Confirmed-existing internal targets you may link to:
  - `/infrastructure/device-state` (concept: what your reader knows about itself)
  - `/reference/mgmt/device-status` (sibling MGMT reference incl. get_version, get_current_region)
  - `/reference/errors/codes` and `/reference/errors/format`
  - `/reference/appendices/topic-quick-reference`
  - `/foundations/mqtt/topic-hierarchy`
  - `/infrastructure/system-operations` (reboot)
  - `/reference/ctrl/operating-mode` (set_operating_mode) and `/reference/ctrl/inventory-control`
  - `/rfid/start-stop-inventory`
  - `/observability/heartbeat`, `/observability/mqtt-connection`
  - `/reference/api-overview`
  Same-page anchors that will exist: `#topic-mapping`, `#response-codes`.

## 11. Template application notes (get_status is a SINGLE-INTENT, read-only command)

- Delete the `:::danger` state-changing callout (this is read-only).
- Request body: single intent → use a plain `<Tabs>` (Example | Schema). Do NOT use `<VariantSelect>`/`<Variant>` for the request.
- Response body: use a **standalone** `<VariantSelect label="Response scenario">` (no `groupId`) with two `<Variant>`s: "Full snapshot" (the live capture) and "Minimal — required fields only". Each variant has its own Example | Schema `<Tabs>`. Do NOT use `<VariantView>` (there is no request-intent dropdown to follow).
- Imports needed: `Tabs`, `TabItem` (from @theme), and from the project components: `VariantSelect`, `Variant` (from `@site/src/components/VariantSelect`), `Type`, `Enum` (from `@site/src/components/ApiType`). Do NOT import `VariantView`.
- Sections in order: Overview, Details, When to Use, Topic Mapping, Key Fields, Request body, Response body, Response Codes, Examples, Notes & Caveats — then the `**Related:**` footer. (No "Configuration" section — that is event-only.)
- MDX rules: replace every placeholder; delete every `<!-- -->` comment; wrap/escape literal `{`, `}`, `<` in prose and table cells (use backticks or `\{`); blank line after each opening JSX tag and before each closing one; every fenced ```json block must be valid JSON; keep `<summary>` on one line.
