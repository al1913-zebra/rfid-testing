---
id: regulatory
title: "Appendix: regulatory and regional information"
sidebar_label: Regulatory & regional information
description: The IOTC get_current_region response schema (regulatoryStandard, maxTxPowerSupported, minTxPowerSupported, channelData, LBT, frequencyHopping) and regional power/certification lookup for RFD40 Premium, RFD40 Premium Plus, RFD9030, and RFD9090 readers.
sidebar_custom_props: { emoji: "⚖️" }
---

> 📕 **REFERENCE** · **Audience:** All personas · **Use:** regional power and certification lookup

:::caution[Zebra's regulatory portal is authoritative]
The region codes and frequency bands below are **indicative** and are **not carried in the IOTC MQTT API schema** — the schema's `currentRegion` response defines only the field *names* (`country`, `regulatoryStandard`, `maxTxPowerSupported`, `channelData`, …), not the band edges or the per-country dBm ceiling. Country approvals and bands change. Before deploying to a new country, confirm the current band, power ceiling, and certification status against the Zebra regulatory portal and the device's regulatory label.
:::

The reader operates in a single **regulatory region** that fixes its UHF channel set, frequency-hopping behaviour, Listen Before Talk (LBT) requirement, and transmit-power ceiling. The region is selected once at bootstrap with **123RFID Desktop** over USB — it is **not** settable over the IOTC MQTT API. Software reads it back with [`get_current_region`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-current-region) and must keep `transmitPower` at or below the reported `maxTxPowerSupported`.

This appendix is the lookup table for that workflow: general UHF region/band background, the exact shape of the `get_current_region` response, its field and response-code semantics, and where to find the authoritative per-country certification status.

#### Regional UHF allocations (general context)

:::caution[Not schema data]
The table below is **general UHF RFID background**, **not** values defined by the IOTC API. The `currentRegion` schema does **not** define a list of region codes, regulatory domains, frequency bands, or per-region LBT/hopping flags. It returns only the per-device fields `country`, `regulatoryStandard`, `frequencyHopping`, `lbtEnabled`, `maxTxPowerSupported`, `minTxPowerSupported`, and `channelData` — both `country` and `regulatoryStandard` are free-form strings, not enums. Treat the rows below as indicative industry context only; the device reports its *actual* operating channels in the `channelData` array (see [The `get_current_region` response](#the-get_current_region-response) below), not a band range, and the authoritative per-country allocation, power ceiling, and certification status are maintained at the Zebra regulatory portal and on the device's regulatory label.
:::

Broadly, a deployment region fixes a UHF Gen2 frequency band and whether Listen Before Talk and frequency hopping apply:

| Example region | Approx. UHF band (MHz) | LBT | Freq. hopping |
|---|---|---|---|
| United States | 902–928 | No | Yes |
| European Union (ETSI) | 865.6–867.6 | Yes | No (4-channel ETSI EN 302 208) |
| Japan | 916.7–920.9 | Yes | Yes |

Band edges and approvals change and many countries split into low/high sub-bands or impose duty-cycle rules; consult the Zebra regulatory portal for the current authoritative list before deploying to a new country.

#### The `get_current_region` response

`get_current_region` is a read-only Device Status command (idempotent — safe to retry with the **same** `requestId`). It takes only the standard request envelope and returns the `currentRegion` block. Applies to **RFD40 Premium / Premium Plus** and **RFD90** series readers.

**Request**

```json
{
  "command": "get_current_region",
  "requestId": "abc123"
}
```

**Response (United States / FCC)**

```json
{
  "command": "get_current_region",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "currentRegion": {
    "frequencyHopping": true,
    "channelData": [
      "91575", "91525", "90325", "92675", "92625", "90425", "92725", "92025", "91925", "90925",
      "91875", "91775", "90525", "90475", "92525", "92175", "91475", "90675", "91375", "92225",
      "91125", "91175", "90375", "90875", "90575", "91225", "90625", "91725", "91425", "90725",
      "91825", "91625", "91025", "91075", "90775", "92475", "90975", "91975", "91675", "91325",
      "92375", "90825", "92575", "91275", "92425", "92125", "92075", "92275", "90275", "92325"
    ],
    "country": "United States",
    "lbtEnabled": false,
    "maxTxPowerSupported": 300,
    "minTxPowerSupported": 0,
    "regulatoryStandard": "FCC"
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

#### `currentRegion` field reference

All seven `currentRegion` fields are **required** in a successful response.

| Field | Type | Example | Meaning |
|---|---|---|---|
| `frequencyHopping` | boolean | `true` | Whether the radio hops across the channel set. Mandatory in most FFH (frequency-hopping) regions such as the US; ETSI uses fixed channels with LBT instead. |
| `channelData` | array of string | `["91575", "91525", …]` | The channels the reader may operate on, **not** the band edges. Each entry is the centre frequency in **10 kHz units** (5-digit). `91575` → 915.75 MHz; `92675` → 926.75 MHz. The reference schema also documents a comma-joined string form, e.g. `"915250,915750"`. The US/FCC set returns 50 channels spanning ~902.75–927.25 MHz. |
| `country` | string | `"United States"` | The configured country. The reference schema uses the short form (`"USA"`); a live FCC reader returns the long form (`"United States"`). Treat as a display string, not an enum. |
| `lbtEnabled` | boolean | `false` | Listen Before Talk. Required in ETSI/CE and several Asian regions; the radio senses the channel before transmitting. Affects inventory-start timing. `false` for FCC. |
| `maxTxPowerSupported` | number (dBm) | `300` | Regulatory power ceiling. **Unit varies by firmware:** the live FCC example reports `300` (centi-dBm = 30.0 dBm); the reference schema documents `29.2` (dBm). Always interpret it relative to the same scale your `transmitPower` setting uses and never request more than this value. |
| `minTxPowerSupported` | number (dBm) | `0` | Regulatory/hardware power floor. Live FCC example reports `0` (= 0.0 dBm); reference schema documents `10.0`. |
| `regulatoryStandard` | string | `"FCC"` | The governing standard. Free-form string, e.g. `FCC` or `ETSI_EU_800M_900M_3_CHANNEL`. Drives channel plan, power rules, and LBT behaviour. |

:::tip[Power-unit guardrail]
Because `maxTxPowerSupported` is reported in **centi-dBm on FCC firmware** (`300` = 30.0 dBm) but in **dBm in the reference schema** (`29.2`), do not hard-code a divisor. Compare your intended `transmitPower` against the value the *same reader* returns. See [The regulatory ceiling](/rfid/performance-tuning) for how `transmitPower` is validated against this limit.
:::

#### Reading `channelData`

`channelData` entries are integers-as-strings in 10 kHz units. To convert to MHz, divide by 100:

| `channelData` entry | Centre frequency |
|---|---|
| `90275` | 902.75 MHz |
| `91575` | 915.75 MHz |
| `92025` | 920.25 MHz |
| `92725` | 927.25 MHz |

The array is unordered (the radio's hop sequence, not ascending frequency). The **count** of entries tells you how many channels the region grants — 50 for US/FCC, far fewer for the ETSI 4-channel plan.

#### Response codes

The `response.code` field carries the command result. `get_current_region` returns only two codes: `0` on success and `3` when it cannot read region state.

| Code | Meaning | Applies to region workflow |
|---|---|---|
| `0` | Success | `currentRegion` is fully populated. |
| `3` | Not able to retrieve information | Region state could not be read (e.g. radio not ready). Retry the same `requestId`. |

The complete IOTC response-code table is in [Command response error codes](/reference/errors/codes).

#### `regulatoryStandard` values

The `currentRegion.regulatoryStandard` field is a **free-form string**, not a closed enum: the schema types it as `string` and documents a single example value, `ETSI_EU_800M_900M_3_CHANNEL`. A live FCC reader reports the short form `FCC`. The exact string is firmware- and region-specific; treat it as a display/audit value the reader reports, not a fixed set of allowed values, and do not assume it maps to a specific certification authority.

| `regulatoryStandard` (reported) | Source |
|---|---|
| `ETSI_EU_800M_900M_3_CHANNEL` | Schema example value |
| `FCC` | Observed on a live US/FCC reader |

The device's specific certifications and approval status per country are on its regulatory label and on the Zebra product page — they are not carried in the IOTC API response.

#### Pre-deployment compliance check

Use this sequence to confirm a reader is compliant before starting inventory:

1. Send `get_current_region` and confirm `response.code` is `0` (a `3` means region state could not be read — retry).
2. Verify `country` and `regulatoryStandard` match the deployment location.
3. Read `maxTxPowerSupported` and ensure your `transmitPower` setting is at or below it (on the same unit scale).
4. Confirm `lbtEnabled` and `frequencyHopping` match the region's expectations (e.g. LBT on for ETSI).
5. Confirm `channelData` is non-empty and the channel count matches the region.

**Related:** 📗 [Phase 2: Region set via 123RFID Desktop](/quick-start/phase-2) · 🎚️ [RF performance tuning — the regulatory ceiling](/rfid/performance-tuning) · 📕 [Command response error codes](/reference/errors/codes) · 📕 [get_current_region](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-current-region) · 📘 [Supported Hardware](/foundations/hardware-tiers)
