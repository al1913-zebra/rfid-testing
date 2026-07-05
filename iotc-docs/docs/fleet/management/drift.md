---
id: drift
title: How to detect and remediate configuration drift
sidebar_label: How to detect and remediate configuration drift
description: "Detect IOTC configuration drift across an RFD40/RFD90 fleet: snapshot each reader with read-only get_* commands, diff against a golden baseline, classify deltas, and apply per-domain corrective writes."
sidebar_custom_props: { emoji: "📐" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder, Fleet Operator · **Time:** ~30 min

This guide shows you how to detect and remediate configuration **drift** — the gap between what a reader's config should be (your golden baseline) and what it actually is right now.

The detection mechanism is a **read-back diff**: snapshot each reader with the read-only `get_*` commands, compare each domain against the baseline captured in [Step 4 of the provisioning tutorial](/fleet/provision-fleet), and act on the deltas. The five read commands below are the only ones you send during detection. They are all **idempotent** — they never change device state, so you can retry the *same* `requestId` on timeout without side effects.

| Domain | Read command | Response section | Baseline field(s) to diff |
|---|---|---|---|
| Endpoints (broker, topics, TLS) | [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) | `endpointResponse` | `activeEndpoints.epConfig[].configuration`, `savedEndpoints.epNames[]` |
| Wi-Fi profiles | [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi) | `wifiProfiles` | `wifiConfig[].accessPoint.{essid, securityType, isPreferred}`, `ipv4Configuration.enableDhcp` |
| Operating mode (radio) | [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode) | `operatingMode` | `profiles`, `radioStartConditions.trigger`, `query.{session, tagPopulation}`, `tagMetaDataToEnable` |
| Post-filters | [`get_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-post-filter) | `postFilterPayload` | `dataEpType`, `matchPattern`, `matchPatternMethod`, `reportOperation` |
| Firmware / identity | [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version) | `readerVersion` | `firmwareVersion`, `detailedVersions.iotcVersion`, `sku` |

:::note[Scope]
This procedure applies to **RFD40 Premium, RFD40 Premium Plus, RFD9030, and RFD9090** readers. Detection is entirely read-only; remediation uses the per-domain write commands ([`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint), [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi), [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode), [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter)). All commands flow over the reader's active **MGMT** endpoint: publish to `<tenantId>/MGMT/clients/cmnd/<serial>`, read responses on `<tenantId>/MGMT/clients/resp/<serial>`.
:::

### Store a golden configuration baseline

Maintain the desired configuration in version control. The golden config is the authoritative declaration of "what every reader should look like." Capture it once from a known-good reference reader by running each read command and recording the desired-state fields.

The baseline below is a **distilled subset**, not the verbatim response envelope — it keeps only the fields you diff and drops runtime telemetry, so its top-level keys are baseline labels, not response-section names. Each baseline key maps to one response section returned by the reader (see the "Response section" column in the table above): `endpointConfig` is extracted from `endpointResponse.activeEndpoints.epConfig[].configuration`; `wifi` from `wifiProfiles.wifiConfig[].interfaceDetails`; `operatingMode` from `operatingMode.operatingModes`; `postFilter` from one entry of `postFilterPayload.postFilter[]`; and `version` from `readerVersion`. When you snapshot a live reader for diffing, project the same fields out of those response sections before comparing. Field values below are illustrative of a TLS-secured cloud fleet.

```json
{
  "endpointConfig": {
    "endpointName": "fleet-mgmt",
    "epType": "MGMT",
    "protocol": "MQTT_TLS",
    "url": "iotc-broker.zebra.com",
    "port": 8883,
    "verificationType": "VERIFY_HOST_PEER",
    "activate": true,
    "qosCommon": 1,
    "mqttParams": {
      "keepAlive": 60,
      "publishTopics": [
        {"topic": "MGMT/clients/resp", "qos": 1, "retain": false},
        {"topic": "MGMT/clients/event", "qos": 1, "retain": false}
      ],
      "subscribeTopics": [{"topic": "MGMT/clients/cmnd", "qos": 1, "retain": false}]
    },
    "securityParams": {"caCertificateFile": "broker-ca", "format": "PEM"}
  },
  "wifi": {
    "accessPoint": {"essid": "WAREHOUSE-RFID", "securityType": "WPA2Enterprise", "isPreferred": true},
    "ipv4Configuration": {"enableDhcp": true}
  },
  "operatingMode": {
    "profiles": "BALANCED_PERFORMANCE",
    "radioStartConditions": {"trigger": "IMMEDIATE"},
    "query": {"session": "SESSION_1", "tagPopulation": 200},
    "tagMetaDataToEnable": ["EPC", "RSSI", "TID"]
  },
  "postFilter": {
    "dataEpType": "DATA_EP1",
    "matchPattern": "E2801190",
    "matchPatternMethod": "PREFIX",
    "reportOperation": "INCLUDE"
  },
  "version": {"firmwareVersion": "3.2.45", "detailedVersions": {"iotcVersion": "1.1.0"}}
}
```

Commit this file with the reference reader's serial and capture date in the path or commit message. When you intentionally change the fleet's desired state (a new broker, a new radio profile), update the baseline through the same review process you use for code — drift detection is only as trustworthy as the baseline it diffs against.

### Diff per-domain reads against the baseline

For each reader periodically (daily or hourly):

```python
def check_drift(serial):
    actual = read_surfaces(serial)   # get_endpoint_config, get_wifi, get_operating_mode, get_post_filter, get_version
    baseline = load_golden_config()
    diff = compute_diff(actual, baseline)
    if diff:
        log_drift(serial, diff)
        if should_remediate(diff):
            remediate(serial, diff)
```

Each read is one MQTT request/response round-trip. A snapshot request carries only `command` and `requestId`:

```json
{"command": "get_endpoint_config", "requestId": "drift-RFD40-24190525100255-ep-20260607T0900"}
```

Encode the serial and a timestamp in `requestId` so you can correlate responses to readers and snapshot runs in your broker logs. The response wraps the requested domain plus a `response` envelope carrying the result code:

```json
{
  "endpointResponse": {
    "activeEndpoints": {
      "epConfig": [
        {
          "configuration": {
            "endpointName": "fleet-mgmt",
            "epType": "MGMT",
            "protocol": "MQTT_TLS",
            "url": "iotc-broker.zebra.com",
            "port": 8883,
            "verificationType": "VERIFY_HOST_PEER",
            "activate": true,
            "qosCommon": 1,
            "securityParams": {"caCertificateFile": "broker-ca", "format": "PEM"}
          }
        }
      ]
    },
    "savedEndpoints": {"epNames": ["fleet-mgmt", "fleet-ctrl", "fleet-data1"]}
  },
  "response": {"command": "get_endpoint_config", "requestId": "drift-RFD40-24190525100255-ep-20260607T0900", "code": 0, "description": "Success"}
}
```

**Always branch on `response.code` before diffing.** A non-zero code means you do not have a valid snapshot — treat the read as *unknown*, not as *no drift*. Read-only `get_*` commands return only two codes; everything else is a transport or timeout problem you handle in your client, not a config delta:

| `response.code` | `iot_status_code` | Meaning | What the diff engine does |
|---:|---|---|---|
| `0` | `IOT_STATUS_SUCCESS` | Snapshot is valid | Proceed to diff this domain |
| `3` | `IOT_ERROR_INFO_NOT_AVAILABLE` | Device could not gather the info right now | Skip the domain, mark snapshot incomplete, retry the **same** `requestId` after a short delay; if persistent, flag the reader for inspection |

A read that never produces a response at all (no message on the resp topic within your timeout) is itself a signal: the reader may be offline, its MGMT endpoint may have drifted to an unreachable broker, or its certificate may have expired. Correlate missing snapshots with [`heartbeatEVT`](/observability/heartbeat) liveness before assuming the configuration is bad.

:::warning[Ethernet on a handheld sled]
`get_eth` reports the **reader's own** Ethernet interface. On an RFD40/RFD90 handheld sled the wired interface is typically reported absent — the response contains only `interfaceDetails.{interfaceName, status}`. Do not treat an absent Ethernet interface as drift; it is the expected hardware reality for a handheld. Diff Ethernet only on cradle-docked deployments where a wired link is part of the baseline.
:::

### Decide whether to remediate

Not every difference matters. Some fields are *runtime telemetry* that change continuously and are never part of a configuration baseline; diffing them produces nothing but noise. Others are *desired-state* fields where any delta is a genuine misconfiguration. Classify every field in your snapshot into one of three buckets before the diff engine ever runs:

| Class | Example fields | Action on delta | Why |
|---|---|---|---|
| **Ignore** | `deviceStatus.chargePercentage`, `deviceStatus.temperature`, `radioActivity`, `radioConnection`, `ipv4Configuration.ipAddress` (DHCP-assigned), `accessPoint.status` | None | Runtime telemetry and DHCP leases drift naturally every snapshot; they are not configuration. |
| **Alert** | `securityParams.caCertificateFile`, endpoint `url`/`port`, `wifiConfig[].accessPoint.essid`, `firmwareVersion`, `detailedVersions.iotcVersion` | Open a ticket; do not auto-write | Identity, trust anchors, and firmware are high-blast-radius. A wrong cert alias or broker URL can sever the MGMT channel — the very channel you would need to fix it. Resolve under human review. |
| **Auto-remediate** | `eventConfiguration` cadence, `profiles`, `radioStartConditions.trigger`, `query.session`, `postFilter.*` | Push a corrective write | Recoverable, low-risk, and safe to converge automatically toward the baseline. |

The boundary between **Alert** and **Auto-remediate** is the blast radius of getting it wrong, not the size of the diff. A one-field change to `url` belongs in **Alert**; a wholesale `operatingMode` mismatch belongs in **Auto-remediate**.

### Auto-remediate

Remediation pushes a **per-domain corrective write** for each auto-remediable delta. There is no single "apply config" command — you converge each domain with its own write command, and each write is scoped to exactly the fields that drifted. Unlike the read side, **state-changing writes are not idempotent**: a retry must use a *new* `requestId`, because re-applying the same `requestId` after a partial failure can double-apply or be silently dropped.

```python
def remediate(serial, diff):
    # Push a corrective write to each affected surface. For an endpoint diff:
    publish_command(serial, {
        "command": "config_endpoint",
        "requestId": f"drift-{serial}-ep-{ts()}",   # new requestId per attempt
        "epConfig": build_ep_patch_from_diff(diff)
    })
    # Wi-Fi diffs go through set_wifi; operating-mode diffs through set_operating_mode.
```

Map each drifted domain to its corrective command:

| Drifted domain | Corrective command | Operation / payload key | Notes |
|---|---|---|---|
| Endpoint config | [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) | `epConfig.operation: "update"` | `endpointName` must already exist for `update`. Never include `tenantId` or serial in the `topic` field — the reader prepends/appends them at runtime. |
| Wi-Fi profile | [`set_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-wifi) | `wifiConfig` with `operation: "MODIFY"` | Use `MODIFY` for an existing ESSID; `CREATE` returns error `18` if the SSID already exists. |
| Operating mode | [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode) | `operatingMode` | Send only the drifted sub-section (e.g. just `profiles`). **Stop inventory first** — applying while a read is running returns error `11`. |
| Post-filter | [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter) | `postFilterPayload` | Re-assert `dataEpType` so the rule lands on the correct concurrent data endpoint (`DATA_EP1` or `DATA_EP2`). |

A minimal `config_endpoint` correction that reconciles only a drifted broker port back to the baseline `8883`:

```json
{
  "command": "config_endpoint",
  "requestId": "drift-RFD40-24190525100255-ep-20260607T0905",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "fleet-mgmt",
      "epType": "MGMT",
      "url": "iotc-broker.zebra.com",
      "port": 8883
    }
  }
}
```

An `operatingMode` correction restoring the baseline radio profile after a firmware update reset it:

```json
{
  "command": "set_operating_mode",
  "requestId": "drift-RFD40-24190525100255-om-20260607T0906",
  "operatingMode": {
    "operatingModes": {
      "profiles": "BALANCED_PERFORMANCE",
      "query": {"session": "SESSION_1", "tagPopulation": 200}
    }
  }
}
```

**Confirm convergence** after every corrective write. A `code: 0` response means the command was accepted — it does not by itself prove the snapshot now matches. Re-run the same `get_*` read and diff again; only a clean diff closes the drift. Handle write rejections by code:

| `response.code` | `iot_status_code` | Returned by | Remediation response |
|---:|---|---|---|
| `0` | `IOT_STATUS_SUCCESS` | all writes | Accepted — re-read to confirm convergence |
| `10` | `IOT_ERROR_CONFIG_ALREADY_EXIST` | `config_endpoint` | You sent `add` for an existing name; switch to `update` |
| `11` | `IOT_ERROR_INVENTORY_IN_PROGRESS` | `set_operating_mode` | Stop inventory via [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) `STOP`, then retry with a new `requestId` |
| `18` | `IOT_ERROR_SSID_ALREADY_EXIST` | `set_wifi` | Use `MODIFY` instead of `CREATE` |
| `23` | `IOT_ERROR_INVALID_ENUM` | `config_endpoint`, `set_wifi`, `set_operating_mode`, `set_post_filter` | A field value is not in the allowed enum set — your baseline holds an invalid value; fix the baseline, not the device |
| `25` / `26` | `IOT_ERROR_PUBLISH_TOPICS_EXCEEDED` / `IOT_ERROR_SUBSCRIBE_TOPIC_EXCEEDED` | `config_endpoint` | Baseline declares > 3 publish or > 1 subscribe topic; trim it |

See [Command response error codes](/reference/errors/codes) for the full superset and [How to handle errors in application code](/diagnose/handle-errors) for classify-and-backoff patterns.

### Fleet-wide compliance monitoring

Maintain a per-reader drift score over time. Dashboards highlight readers that drift repeatedly (indicating misconfiguration source) and readers whose drift was successfully remediated. Persist three things per snapshot run: the per-domain diff (which fields drifted), the action taken (ignored / alerted / remediated), and whether the post-remediation re-read converged. A reader that drifts on the *same* field every cycle is not a reader problem — it points at an upstream source re-applying a stale config (an MDM template, a manual workflow, a firmware default).

```d2
classes: {
  bad: { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
direction: down
GC: "Golden config\n(version control)" { shape: cylinder }
CMP: Comparison engine
fleet: Fleet {
  R1: "Reader 1\nget_endpoint_config"
  R2: "Reader 2\nget_endpoint_config"
  Rn: "Reader N\nget_endpoint_config"
}
DR: Drift report
DB: Drift database { shape: cylinder }
DASH: Dashboard
ALT: Alert on threshold { class: bad }
GC -> CMP
fleet.R1 -> CMP
fleet.R2 -> CMP
fleet.Rn -> CMP
CMP -> DR
DR -> DB
DB -> DASH
DB -> ALT

```

Feed the drift database into the same surface as your liveness and battery telemetry so operators see configuration health and device health side by side — see the [Fleet health dashboard](/observability/monitoring/fleet-dashboard).

**Related:** 📘 [Keeping a fleet in sync](/fleet/bulk-management) · 🎓 [Provision a three-reader fleet](/fleet/provision-fleet) · 📙 [Automation](/fleet/provisioning/automation) · 📘 [What your reader knows about itself](/infrastructure/device-state) · 📕 [Command response error codes](/reference/errors/codes)
