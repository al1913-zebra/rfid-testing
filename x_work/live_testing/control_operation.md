# Command: control_operation

## 1. Intent & Objective

`control_operation` controls device functionality, including RFID operations and scan operations [verified-from-schema: commands/control/control_operation.json description]. It selects a `controlType` (`RFID` or `SCANNER`) and an `operation` (`START` or `STOP`) [verified-from-schema: refrence/payload/ctrlOprPayload.yaml properties]. With `operation START` and `controlType RFID`, the radio begins inventorying tags and the device streams tag data events (`dataEVT`) over the DATA endpoint until a `STOP` (or the operating-mode stop conditions are met) [verified-on-device: RFD40 serial 24190525100255].

It is a CONTROL-plane command: the command routes over CTRL and requires an active CTRL endpoint, the same control-plane routing rule established for `get_operating_mode` / `set_operating_mode` / `get_post_filter` [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. `START` is a real radio operation (it emits RF and reads tags) but is **REVERSIBLE** via `STOP` [verified-on-device: RFD40 serial 24190525100255]. On the wire `control_operation` START drove BOTH planes — the CONTROL plane for the command round-trip and the DATA plane for the resulting tag `dataEVT` stream [verified-on-device: RFD40 serial 24190525100255]. Among the documented control commands it is the only one whose START is observed to drive the DATA plane as well as CONTROL [inferred-from-live: cross-doc comparison — the other documented control commands route only over CTRL].

## 2. Topic Mapping (observed on-wire)

`control_operation` is the command that drives the data plane: the command itself travels over CTRL, while the tag events it triggers are published by the device over DATA [verified-on-device: RFD40 serial 24190525100255]. Both topic families were observed on-wire this session via a wildcard `#` subscription during the inventory window [verified-on-device: RFD40 serial 24190525100255].

| Plane | Direction | Topic (wire form `{tenantId}/{baseTopic}/{serial}`) | Concrete topic this session |
| --- | --- | --- | --- |
| CONTROL | Request (publish) | `zebra/CTRL/clients/cmnd/<serial>` | `zebra/CTRL/clients/cmnd/RFD40-24190525100255` |
| CONTROL | Response (subscribe) | `zebra/CTRL/clients/resp/<serial>` | `zebra/CTRL/clients/resp/RFD40-24190525100255` |
| DATA | Tag events (subscribe) | `zebra/DATA/clients/data1event/<serial>` | `zebra/DATA/clients/data1event/RFD40-24190525100255` |

Routing notes:

- **Command answered over CTRL.** The `START` and `STOP` requests published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` were answered on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. This is the same control-plane routing as `get_operating_mode` / `set_operating_mode` / `get_post_filter` [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].
- **Requires an active CTRL endpoint.** This session the device had active endpoints `[MDM_REMOTE, CTRL_EP, DATA1_EP]`, so the CTRL endpoint was active and able to answer the command [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The command was answered over CTRL with that endpoint active [verified-on-device: RFD40 serial 24190525100255].
- **Tag events published over DATA.** The tag `dataEVT` messages were published by the device on `zebra/DATA/clients/data1event/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. That topic is `DATA1_EP`'s configured `publishTopic` `"DATA/clients/data1event"` wrapped with the tenant prefix `"zebra"` and the serial suffix [verified-from-schema: the DATA1_EP publishTopics from get_endpoint_config]. The on-wire EP segment is literally `DATA` (not `DATA1`), with the event role `data1event` (see **C4**) [verified-on-device: RFD40 serial 24190525100255].
- **DATA streaming requires an active DATA endpoint.** Receiving the tag stream depended on an active DATA endpoint; `DATA1_EP` was active this session [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The `dataEVT` messages were observed on the DATA topic with that endpoint active [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

Top-level command fields:

| Field | Type | Required | Notes / Locus |
| --- | --- | --- | --- |
| `command` | string, enum `["control_operation"]` | **no** | Fixed command name; constrained by enum but NOT in a top-level `required` array (see **C1**) [verified-from-schema: commands/control/control_operation.json properties.command.enum] |
| `requestId` | string | **no** | Unique request identifier for traceability; NOT in a top-level `required` array (see **C1**) [verified-from-schema: commands/control/control_operation.json properties.requestId] |
| `ctrlOprPayload` | object (`$ref` ctrlOprPayload.yaml) | **no** | The control-operation body; NOT in a top-level `required` array (see **C1**) [verified-from-schema: commands/control/control_operation.json properties.ctrlOprPayload] |

`ctrlOprPayload.*` fields [verified-from-schema: refrence/payload/ctrlOprPayload.yaml properties]:

| Field | Type | Required | Notes / Locus |
| --- | --- | --- | --- |
| `controlType` | string, enum `RFID`, `SCANNER` | yes | Selects an RFID operation or a scanner operation [verified-from-schema: refrence/payload/ctrlOprPayload.yaml controlType.enum] |
| `operation` | string, enum `START`, `STOP` | yes | Starts or stops the operation [verified-from-schema: refrence/payload/ctrlOprPayload.yaml operation.enum] |

The nested `ctrlOprPayload` IS well-constrained: it declares `required [controlType, operation]` [verified-from-schema: refrence/payload/ctrlOprPayload.yaml required].

### JSON Request Example (operator-provided, schema-validated, sent)

The operator payload is the command schema's canonical example #1 (the RFID `START`), differing only in the `requestId` value [verified-from-schema: commands/control/control_operation.json examples[0]]:

```json
{ "command": "control_operation", "requestId": "abc123", "ctrlOprPayload": { "controlType": "RFID", "operation": "START" } }
```

Static verdict: **VALID** — `command` is in `enum ["control_operation"]`, `requestId` is present, and `ctrlOprPayload` carries both required fields with in-enum values (`controlType RFID` ∈ `[RFID, SCANNER]`; `operation START` ∈ `[START, STOP]`) [verified-from-schema: refrence/payload/ctrlOprPayload.yaml controlType.enum]. The `requestId` value `abc123` is operator-supplied; the schema's own example uses `abcd1432` [verified-from-schema: commands/control/control_operation.json examples[0]]. Note that the command schema declares NO top-level `required` array, so the three top-level fields are individually optional at the command level even though the nested payload requires its two (see **C1**) [verified-from-schema: commands/control/control_operation.json].

## 4. Response Payload Breakdown

### 4a. Command response (CONTROL plane — status only)

| Field | Type | Required | Notes / Locus |
| --- | --- | --- | --- |
| `command` | string | yes | Echoes the executed command [verified-from-schema: response/control/control_operation.json properties.command] |
| `requestId` | string | yes | Echoes the original request id [verified-from-schema: response/control/control_operation.json properties.requestId] |
| `apiVersion` | string, enum `["V1.0", "V1.1"]` | yes | API version of the response message [verified-from-schema: response/control/control_operation.json properties.apiVersion.enum] |
| `response.code` | integer, `minimum 0`, `maximum 30` | yes | Status code [verified-from-schema: refrence/response/response.yaml code] |
| `response.description` | string | yes | Human-readable status [verified-from-schema: refrence/response/response.yaml description] |

This is a status-only envelope — the `control_operation` command response carries no data-payload echo, only `response{code, description}` [verified-from-schema: response/control/control_operation.json properties]. All four envelope fields (`command`, `requestId`, `apiVersion`, `response`) are declared in the top-level `required` array (the wrapper itself is well-formed; see **POSITIVE**) [verified-from-schema: response/control/control_operation.json required]. The referenced `response.yaml` schema separately declares `required [code, description]` [verified-from-schema: refrence/response/response.yaml required]. The schema's response example is `{code: 0, description: "Success"}` [verified-from-schema: response/control/control_operation.json examples].

### 4b. Tag data event (DATA plane — `dataEVT` output, the stream START triggers)

The `START` operation triggers `dataEVT` messages on the DATA topic; this is the data-plane output, distinct from the command response above [verified-on-device: RFD40 serial 24190525100255]. Each `dataEVT` is described by `events/dataEVT.json` [verified-from-schema: events/dataEVT.json properties]:

| Field | Type | Required | Notes / Locus |
| --- | --- | --- | --- |
| `type` | string, enum `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE`, `ADVANCED` | no | The operating-mode profile in effect [verified-from-schema: events/dataEVT.json properties.type.enum] |
| `timestamp` | string (ISO-8601) | yes | Event timestamp [verified-from-schema: events/dataEVT.json properties.timestamp] |
| `data` | object (`$ref` dataEvts.yaml) | no | Detailed event data, including tag and barcode information [verified-from-schema: events/dataEVT.json properties.data] |

`timestamp` is the only top-level required field of `dataEVT` [verified-from-schema: events/dataEVT.json required]. `data` carries `tagData[]` (`$ref` tagDataEVTs.yaml) and `barcodeData[]` (`$ref` barcodeDataEVTs.yaml) [verified-from-schema: refrence/events/dataEvts.yaml properties]. Each `tagData[]` item declares the following fields [verified-from-schema: refrence/events/tagDataEVTs.yaml properties]:

| Field | Type | Notes / Locus |
| --- | --- | --- |
| `EPCid` | string (hex) | The always-reported tag identifier (EPC Identifier) [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.EPCid] |
| `EPC` | string (hex) | EPC memory-bank contents [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.EPC] |
| `TID` | string (hex) | Tag Identifier memory-bank contents [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.TID] |
| `USER` | string (hex) | USER memory-bank contents [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.USER] |
| `RESERVED` | string (hex) | RESERVED memory-bank contents [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.RESERVED] |
| `PC` | string (hex) | PC bits of the inventoried tag [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.PC] |
| `CRC` | string (hex) | CRC bits of the inventoried tag [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.CRC] |
| `channel` | number | Channel in MHz; reported only if each individual read is reported, i.e. `reportFilter` duration is set to 0 [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.channel] |
| `eventNum` | number | Event number; a tagData required field [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.eventNum] |
| `format` | string | The format of `idHex` (EPC); a tagData required field (see **C5**) [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.format] |
| `peakRssi` | number | Reports the RSSI in dBm; when the tag is reported only occasionally this is the peak RSSI since the last reported read [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.peakRssi] |
| `phase` | number | Phase in degrees; reported only if each individual read is reported, i.e. `reportFilter` duration is set to 0 [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.phase] |
| `seenCount` | number | Times inventoried since the previous report; always 1 if each individual read is reported (`reportFilter` duration 0) [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.seenCount] |
| `XPC` | string (hex) | XPC bits, if present [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.XPC] |
| `accessResults` | array of string | Results of the operating-mode access operations [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.accessResults] |
| `userDefined` | string | User-defined string included on every event [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.userDefined] |
| `firstSeenTime` | number | First-seen timestamp (ms since epoch) [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.firstSeenTime] |
| `lastSeenTime` | number | Last-seen timestamp (ms since epoch) [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.lastSeenTime] |
| `MAC` | string | MAC of the reader; "reported only if the MAC address is enabled in the operating mode" [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.MAC] |
| `HOSTNAME` | string | Hostname of the reader; "reported only if the hostname is enabled in the operating mode" [verified-from-schema: refrence/events/tagDataEVTs.yaml properties.HOSTNAME] |

Each `tagData[]` item declares `required [eventNum, format]` [verified-from-schema: refrence/events/tagDataEVTs.yaml required]. The item schema documents two distinct per-field reporting rules: `MAC` and `HOSTNAME` are "reported only if ... enabled in the operating mode," while `channel`, `phase`, and `seenCount` are tied to per-read reporting (`reportFilter` duration 0) [verified-from-schema: refrence/events/tagDataEVTs.yaml field descriptions]. Which tag-data fields actually appear in a live `dataEVT` tracks the operating mode's `tagMetaDataToEnable` flags, with `EPCid` always present (see **C3**) [inferred-from-live: the set_operating_mode tagMetaDataToEnable flags gate the dataEVT fields].

## 5. Live Verification

**Verdict: LIVE.** The `START` request (operator payload above) was published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` and answered on `zebra/CTRL/clients/resp/RFD40-24190525100255`; a `STOP` was later sent as cleanup [verified-on-device: RFD40 serial 24190525100255]. CTRL_EP and DATA1_EP were both active this session [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The device was in a clean post-reboot default operating mode for this run [verified-on-device: RFD40 serial 24190525100255]. The user explicitly confirmed before this state-changing send [verified-on-device: RFD40 serial 24190525100255].

**START response (LIVE, verbatim)** [`requestId abc123`, over CTRL]:

```json
{"command":"control_operation","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

This is a **SUCCESS with `response.code` OMITTED** — the envelope carries only `{description: "Success"}` [verified-on-device: RFD40 serial 24190525100255]. Validation verdict: **INVALID** against the referenced `response.yaml`, which requires `[code, description]`; the required `response.code` is MISSING [verified-from-schema: refrence/response/response.yaml required]. This is the same omit-`code`-on-success pattern already documented as `get_operating_mode` **O1** and `set_operating_mode` **P7**, now observed on `control_operation` (see **L2** / **C2**) [inferred-from-live: same omit-code-on-success behavior as get_operating_mode O1 / set_operating_mode P7].

**STOP response (LIVE, verbatim)** [`requestId abc124`, over CTRL, used as cleanup to halt the radio]:

```json
{"command":"control_operation","requestId":"abc124","apiVersion":"V1.1","response":{"description":"Success"}}
```

The `STOP` likewise returned `{description: "Success"}` with `response.code` OMITTED — the same SUCCESS shape and the same INVALID-vs-`response.yaml` omission as `START` [verified-on-device: RFD40 serial 24190525100255].

### Data-plane capture (the `START` → `dataEVT` stream)

During the roughly 8-second inventory window a wildcard `#` subscription captured both planes: the CTRL `cmnd`/`resp` round-trips for `START`/`STOP`, and the tag `dataEVT` stream on `zebra/DATA/clients/data1event/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. The data plane delivered 3 `dataEVT` messages on that DATA topic, carrying 85 tag reads in total (`eventNum 1` → `85`) across 12 unique `EPCid` values [verified-on-device: RFD40 serial 24190525100255]. Every `dataEVT` carried `type "BALANCED_PERFORMANCE"`, the device's active profile (see **L5**) [verified-on-device: RFD40 serial 24190525100255].

**First `dataEVT` (LIVE, verbatim — first 3 of 40 `tagData` entries shown; the rest of the 85 reads are omitted):**

```json
{"type":"BALANCED_PERFORMANCE","timestamp":"2026-06-14T10:19:52.604Z","data":{"tagData":[
  {"EPCid":"E28011606000020E8A58E4DB","eventNum":1,"peakRssi":-26,"seenCount":1},
  {"EPCid":"E28011606000020E8A58E4CB","eventNum":2,"peakRssi":-28,"seenCount":1},
  {"EPCid":"E28011606000020E8A58E4EB","eventNum":3,"peakRssi":-36,"seenCount":1}
]}}
```

**The 12 unique `EPCid` values** (all share the `E28011606000020E8A5...` prefix — a batch of similar tags near the sled) [verified-on-device: RFD40 serial 24190525100255]:

| # | EPCid |
| --- | --- |
| 1 | `E28011606000020E8A58E4DB` |
| 2 | `E28011606000020E8A58E4CB` |
| 3 | `E28011606000020E8A58E4EB` |
| 4 | `E28011606000020E8A58E4BB` |
| 5 | `E28011606000020E8A58E49B` |
| 6 | `E28011606000020E8A58E48B` |
| 7 | `E28011606000020E8A58E43B` |
| 8 | `E28011606000020E8A58E4FB` |
| 9 | `E28011606000020E8A59183B` |
| 10 | `E28011606000020E8A59182B` |
| 11 | `E28011606000020E8A59181B` |
| 12 | `E28011606000020E8A59180B` |

Observed value ranges: `peakRssi` ranged about −25 to −66 dBm across the reads [verified-on-device: RFD40 serial 24190525100255]. `seenCount` was 1 on every reported read, consistent with per-read reporting [verified-on-device: RFD40 serial 24190525100255]. The live `tagData` entries carried ONLY `EPCid`, `eventNum`, `peakRssi`, and `seenCount` — there was NO `TID`, `USER`, `channel`, `phase`, `EPC`, `PC`, `CRC`, or `format` [verified-on-device: RFD40 serial 24190525100255]. This matches the device's post-reboot default `tagMetaDataToEnable` (RSSI true → `peakRssi` present; SEENCOUNT true → `seenCount` present; TID/USER/CHANNEL/PHASE/EPC and the rest false → absent), with `EPCid` always present (see **C3**) [inferred-from-live: the set_operating_mode tagMetaDataToEnable flags gate the dataEVT fields].

### Findings

- **L1 — CONTROL routing for the command.** `START` and `STOP` were published on the CTRL `cmnd` topic and answered on the CTRL `resp` topic; an active CTRL endpoint is required [verified-on-device: RFD40 serial 24190525100255].
- **L2 — SUCCESS omits `response.code`.** Both `START` and `STOP` returned `{description: "Success"}` with NO `code`, which is INVALID against `response.yaml`'s `required [code, description]` [verified-on-device: RFD40 serial 24190525100255]. This is the omit-`code`-on-success pattern of `get_operating_mode` **O1** / `set_operating_mode` **P7**, now on `control_operation` [inferred-from-live: same omit-code-on-success behavior as O1 / P7].
- **L3 — DATA-plane streaming (first live data-plane capture this session).** `START` triggered tag `dataEVT` messages on `zebra/DATA/clients/data1event/RFD40-24190525100255` (DATA1_EP's `publishTopic` wrapped with tenant + serial) [verified-on-device: RFD40 serial 24190525100255]. Receiving the stream requires an active DATA endpoint [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].
- **L4 — REAL inventory.** 3 `dataEVT` messages carried 85 tag reads (`eventNum 1` → `85`) across 12 unique `EPCid` values (the `E28011606000020E8A5...` family), with `peakRssi` about −25 to −66 dBm; the radio inventoried continuously from `START` until `STOP` [verified-on-device: RFD40 serial 24190525100255].
- **L5 — `dataEVT.type` echoes the operating-mode profile.** Every `dataEVT` carried `type "BALANCED_PERFORMANCE"`, the device's current profile [verified-on-device: RFD40 serial 24190525100255].
- **L6 — `tagData` fields are GATED by `tagMetaDataToEnable`.** The live `tagData` reported `EPCid`/`eventNum`/`peakRssi`/`seenCount` only (RSSI + SEENCOUNT enabled in the default mode), while `TID`/`USER`/`channel`/`phase`/`EPC`/`PC`/`CRC` were ABSENT (those flags off), with `EPCid` always reported [verified-on-device: RFD40 serial 24190525100255]. The link from the `tagMetaDataToEnable` flags to the reported fields cross-references the `set_operating_mode` finding [inferred-from-live: the set_operating_mode tagMetaDataToEnable flags gate the dataEVT fields].
- **L7 — `STOP` halts the inventory (cleanup; REVISED — see the STOP worked example).** The `dataEVT` stream ceased after the `STOP`, leaving the radio not running [verified-on-device: RFD40 serial 24190525100255]. A later dedicated STOP run found that a single in-flight read may still be flushed ~2.9s after `STOP` before the stream fully ceases, so STOP does not always end with zero trailing events (see the STOP worked example) [verified-on-device: RFD40 serial 24190525100255].

**START → dataEVT → STOP lifecycle.** End-to-end the lifecycle worked on the wire: a CTRL `START` was acknowledged, the DATA plane streamed real tag reads, and a CTRL `STOP` ended the stream [verified-on-device: RFD40 serial 24190525100255].

**Coverage caveat.** Only RFID `START` (and `STOP` for cleanup) were exercised; `controlType SCANNER` was NOT exercised this session [verified-on-device: RFD40 serial 24190525100255]. The error codes below (11/12/23) were also NOT exercised [verified-from-schema: refrence/response/response.yaml code table].

### Worked example — STOP (halting a >=10s inventory)

This subsection re-runs the **§5** operator flow — RFID `START` held for at least 10 seconds, then `STOP` — as a NEW capture (distinct from the §5 START run) to characterize STOP-side timing, with both payloads sharing `requestId "abc123"` [verified-on-device: RFD40 serial 24190525100255]. It confirms the START-side findings **L1**–**L6** rather than restating them, and adds STOP-specific timing detail [verified-on-device: RFD40 serial 24190525100255]. It also REVISES **L7**: `STOP` halts the radio, but this run observed exactly one in-flight read flushed after `STOP`, contrary to the earlier "zero trailing events" wording (detailed below) [verified-on-device: RFD40 serial 24190525100255].

**The STOP payload** is the command schema's canonical example #2 (the RFID `STOP`), differing only in the `requestId` value [verified-from-schema: commands/control/control_operation.json examples[1]]:

```json
{ "command": "control_operation", "requestId": "abc123", "ctrlOprPayload": { "controlType": "RFID", "operation": "STOP" } }
```

Static verdict: **VALID** — `command` is in `enum ["control_operation"]`, and `ctrlOprPayload` carries both required fields with in-enum values (`controlType RFID`; `operation STOP` ∈ `[START, STOP]`) [verified-from-schema: refrence/payload/ctrlOprPayload.yaml required].

**Timeline (elapsed seconds within the test; device timestamps in UTC).** The inventory ran 12.3 s (>= the requested 10 s) from `START` to `STOP` [verified-on-device: RFD40 serial 24190525100255]:

| Elapsed | Event | `eventNum` | Device timestamp (UTC) | Phase |
| --- | --- | --- | --- | --- |
| +6.45 s | `START` sent (CTRL) | — | — | command |
| +10.48 s | `dataEVT` — 40 reads | 1..40 | `2026-06-14T10:51:36.389Z` | DURING (first batch ~4 s after START) |
| +14.33 s | `dataEVT` — 40 reads | 41..80 | `2026-06-14T10:51:40.230Z` | DURING |
| +18.70 s | `dataEVT` — 40 reads | 81..120 | `2026-06-14T10:51:44.596Z` | DURING (arrived right at STOP) |
| +18.75 s | `STOP` sent (CTRL) | — | — | command |
| +21.62 s | `dataEVT` — 1 read | 121..121 | `2026-06-14T10:51:44.867Z` | POST-STOP trailing read (+2.87 s after STOP) |
| +29.36 s | second `STOP` sent while idle (CTRL) | — | — | command |
| — | no further `dataEVT` | — | — | stream ceased |

**STOP SUCCESS omits `response.code`.** The `STOP` returned `{description: "Success"}` with NO `code`, the same omit-`code`-on-success shape observed for `START` (see **L2** / **C2**) [verified-on-device: RFD40 serial 24190525100255]. The STOP response (LIVE, verbatim) [`requestId abc123`, over CTRL]:

```json
{"command":"control_operation","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

**STOP halts the inventory (REVISES L7).** The continuous `dataEVT` stream (3 batches of 40 reads, `eventNum 1..120`) ceased after `STOP` [verified-on-device: RFD40 serial 24190525100255]. **Be precise about the trailing read:** exactly ONE further single-read `dataEVT` (`eventNum 121`) was delivered ~2.87 s after `STOP`, after which no further events arrived — the stream did NOT stop with zero trailing events, which corrects the earlier **L7** "no `dataEVT` after STOP" wording [verified-on-device: RFD40 serial 24190525100255]. That trailing read's `eventNum` continues the sequence (`120` → `121`) and its device timestamp (`…44.867Z`) is ~0.27 s after the last during-batch (`…44.596Z`), i.e. it was inventoried at essentially the STOP moment and delivered ~2.9 s later by delivery latency [verified-on-device: RFD40 serial 24190525100255]. So `STOP` is effective immediately at the radio, while a single in-flight/buffered read may still be flushed a couple of seconds afterward rather than indicating continued inventory [inferred-from-live: the trailing read's eventNum continues the sequence and its device timestamp coincides with STOP, indicating an in-flight read flushed after STOP rather than continued inventory].

**Batching/cadence.** Tag reads were delivered in batches of ~40 per `dataEVT` roughly every ~3.8–4.4 s (device timestamps `36.389` → `40.230` → `44.596`, ~3.84 s then ~4.37 s apart), with the first batch ~4 s after `START` [verified-on-device: RFD40 serial 24190525100255].

**code 12 confirmed (idle STOP).** A SECOND `STOP` issued at +29.36 s while no inventory was running returned `response.code 12` "No Radio Operation in Progress", with the `code` PRESENT in the error response [verified-on-device: RFD40 serial 24190525100255]. Code 12 is documented in `response.yaml`, and its value falls within the schema's in-range `code` bounds (`minimum 0`, `maximum 30`) [verified-from-schema: refrence/response/response.yaml code]. The idle-STOP response (LIVE, verbatim) [`requestId abc123`, over CTRL]:

```json
{"command":"control_operation","requestId":"abc123","apiVersion":"V1.1","response":{"code":12,"description":"No Radio Operation in Progress"}}
```

This idle-STOP observation upgrades the prior code-12 hypothesis in **§6** to verified-on-device [verified-on-device: RFD40 serial 24190525100255]. It also shows the code-presence asymmetry — the error path includes `code` while the success path omits it — matching the pattern seen on `set_post_filter` and `get`/`set_operating_mode` **O1** / **P7** [inferred-from-live: cross-doc comparison of the code-presence asymmetry].

**Coverage caveat.** Only RFID `START`/`STOP`/idle-`STOP` were exercised; `controlType SCANNER` was NOT exercised this session (cross-ref the §5 coverage caveat) [verified-on-device: RFD40 serial 24190525100255]. Error codes 11 and 23 remain unexercised [verified-from-schema: refrence/response/response.yaml code table].

## 6. Associated Error Codes

IMPORTANT: on the SUCCESS path this command returned **NO numeric code** this session — both the `START` and `STOP` successes conveyed status via `response.description: "Success"` with `code` ABSENT (see **L2** / **C2**) [verified-on-device: RFD40 serial 24190525100255]. The ERROR path DOES carry a code, however: a `STOP` issued while idle (no inventory running) returned `response.code 12` "No Radio Operation in Progress" [verified-on-device: RFD40 serial 24190525100255].

| Code | Meaning | Provenance |
| --- | --- | --- |
| 0 | Success | [verified-from-schema: response/control/control_operation.json examples (response.code 0)] |
| 11 | Inventory in progress | [inferred-from-live: plausible response to a `START` issued while an inventory is already running; documented in response.yaml but not observed this session] |
| 12 | No Radio Operation in Progress | [verified-on-device: RFD40 serial 24190525100255 — returned by a `STOP` issued while no inventory was running] |
| 23 | Invalid enum value | [inferred-from-live: plausible response to a bad `controlType`/`operation`; documented in response.yaml but not observed this session] |

Honesty note: code `0` appears in the response schema's example but was NOT observed on the wire — the live successes omitted `code` entirely, so do not claim code 0 was returned [verified-on-device: RFD40 serial 24190525100255]. Code `12` is now verified-on-device, returned by an idle `STOP` (no inventory running) [verified-on-device: RFD40 serial 24190525100255]. Codes `11` and `23` remain hypotheses for the corresponding error conditions and were not exercised [verified-from-schema: refrence/response/response.yaml code table].

## 7. Conformance & Spec Notes (this command)

- **C1 — command schema has NO top-level `required`.** `commands/control/control_operation.json` declares no top-level `required` array, so `{}` validates against the wrapper and `command`, `requestId`, and `ctrlOprPayload` are individually optional at the top level [verified-from-schema: commands/control/control_operation.json]. The nested `ctrlOprPayload.yaml` does require `[controlType, operation]`, so a present payload is well-constrained [verified-from-schema: refrence/payload/ctrlOprPayload.yaml required]. This command schema simply lacks a top-level `required` array — unlike `get_post_filter`, whose command schema does declare `required [command, requestId]` [verified-from-schema: commands/control/get_post_filter.json required]. Fix: add top-level `required [command, requestId, ctrlOprPayload]` [verified-from-schema: commands/control/control_operation.json].
- **C2 — SUCCESS omits `response.code` (behavior).** The `START`/`STOP` successes conveyed status only via `description`, omitting the `response.yaml`-required `code` [verified-on-device: RFD40 serial 24190525100255]. The response wrapper schema itself declares the full `required [command, requestId, apiVersion, response]` (well-formed), but the inner `response` object omits `code` [verified-from-schema: response/control/control_operation.json required]. This cross-references `get_operating_mode` **O1** / `set_operating_mode` **P7** [inferred-from-live: same omit-code-on-success behavior as O1 / P7]. Fix: always emit `response.code` (0 on success) [verified-from-schema: refrence/response/response.yaml required].
- **C3 — `dataEVT` fields gated by `tagMetaDataToEnable`.** Which tag-data fields actually appear in a live `dataEVT` tracks the operating mode's enabled metadata flags — the live capture (`EPCid`/`eventNum`/`peakRssi`/`seenCount` only) matched the default mode (RSSI + SEENCOUNT on) [verified-on-device: RFD40 serial 24190525100255]. That flag-gating is a cross-reference to the `set_operating_mode` `tagMetaDataToEnable` finding rather than a property the `dataEVT` item schema states directly [inferred-from-live: the set_operating_mode tagMetaDataToEnable flags gate the dataEVT fields]. As for the per-field rules the item schema does state: `MAC` and `HOSTNAME` are "reported only if ... enabled in the operating mode," while `channel` and `phase` are reported only if each individual read is reported (`reportFilter` duration 0) [verified-from-schema: refrence/events/tagDataEVTs.yaml field descriptions].
- **C4 — DATA topic shape.** The on-wire tag-data topic `zebra/DATA/clients/data1event/RFD40-24190525100255` is DATA1_EP's configured `publishTopic` `"DATA/clients/data1event"` verbatim, wrapped with the tenant prefix `"zebra"` and the serial suffix [verified-from-schema: the DATA1_EP publishTopics from get_endpoint_config]. The on-wire EP segment is literally `DATA` (from the topic string), with the event role `data1event` — it is NOT `DATA1/clients/...` [verified-on-device: RFD40 serial 24190525100255].
- **C5 — live `tagData` omits the schema-required `format`.** `tagDataEVTs.yaml` declares `required [eventNum, format]`, but the live `tagData` entries carry `eventNum` and NOT `format`, so the live tag-data items are INVALID against their own item schema's `required` [verified-on-device: RFD40 serial 24190525100255]. The `format` requirement is declared in the schema [verified-from-schema: refrence/events/tagDataEVTs.yaml required]. Separately, `dataEVT.json`'s top-level `required` is only `[timestamp]`, and the live events include `type` + `timestamp` + `data`, satisfying that [verified-from-schema: events/dataEVT.json required]. Fix: either report `format`, or drop it from the `tagData` `required` [verified-from-schema: refrence/events/tagDataEVTs.yaml required].
- **POSITIVE (not a defect).** `control_operation`'s command schema constrains `command` with `enum ["control_operation"]` [verified-from-schema: commands/control/control_operation.json]. The nested `ctrlOprPayload` requires `[controlType, operation]` [verified-from-schema: refrence/payload/ctrlOprPayload.yaml required]. The response declares the full `required [command, requestId, apiVersion, response]` [verified-from-schema: response/control/control_operation.json required]. On the wire the `START` → `dataEVT` → `STOP` lifecycle worked end-to-end and the device read real tags [verified-on-device: RFD40 serial 24190525100255].

## 8. Safety / operational note

`control_operation` `START` (RFID) is a **real radio operation**: the radio emits RF and inventories any tags in range, and the device streams their reads as `dataEVT` over the DATA plane [verified-on-device: RFD40 serial 24190525100255]. This run was **BENIGN**: the device was in a clean post-reboot default mode with NO `accessOperations` armed, so the inventory was read-only — no WRITE/LOCK/KILL tag operation was performed [verified-on-device: RFD40 serial 24190525100255]. Had destructive access operations been armed in the operating mode, a `START` would run them against tags in range, so the operator should confirm the operating mode is read-only before starting (cross-reference the `set_operating_mode` armed-access-ops safety note) [inferred-from-live: armed access ops in the operating mode would execute on a START, per the set_operating_mode finding].

The operation is **REVERSIBLE** via `STOP`: this test STARTed, captured the stream, then STOPped, leaving the radio not running, with the stream ceasing after at most a single in-flight read flushed shortly after `STOP` (see the STOP worked example) [verified-on-device: RFD40 serial 24190525100255]. The CONTROL routing needs an active CTRL endpoint, and receiving the tag stream needs an active DATA endpoint; both `CTRL_EP` and `DATA1_EP` were active this session [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].

Security: `control_operation` carries no broker/Wi-Fi or tag-access credentials in either the request or the response, so there is nothing to mask in the command exchange [verified-from-schema: refrence/payload/ctrlOprPayload.yaml properties]. The tag `EPCid` values in the `dataEVT` stream are environment identifiers read off physical tags, not secrets or credentials, so they are shown unmasked [verified-on-device: RFD40 serial 24190525100255]. The exercise left the radio stopped and the device in its default operating mode [verified-on-device: RFD40 serial 24190525100255].