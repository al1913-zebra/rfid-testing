# Command: set_operating_mode

## 1. Intent & Objective

`set_operating_mode` configures the RFID operating mode of the device — the profile, advanced radio configuration, tag-access operations, radio start/stop conditions, the Gen2 query, select pre-filters, and tag-metadata flags [verified-from-schema: commands/control/set_operating_mode.json description]. It is a CONTROL-plane command: it routes over CTRL and requires an active CTRL endpoint, the same routing rule established for `get_operating_mode` [verified-from-test-harness: deployment topology — request/response observed on the CTRL cmnd/resp topics with CTRL_EP active].

It is state-changing but **REVERSIBLE**: per its own description, "On reboot the set configurations will be lost and the device will go back to default operating mode" [verified-from-schema: commands/control/set_operating_mode.json description]. This session it changed the device from `BALANCED_PERFORMANCE` to `ADVANCED`; a reboot — or re-sending `set_operating_mode {profiles: BALANCED_PERFORMANCE}` — restores the default [verified-on-device: RFD40 serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

| Direction | Topic | Note |
| --- | --- | --- |
| Request (publish) | `zebra/CTRL/clients/cmnd/RFD40-24190525100255` | CONTROL routing [verified-on-device: RFD40 serial 24190525100255] |
| Response (subscribe) | `zebra/CTRL/clients/resp/RFD40-24190525100255` | CONTROL routing [verified-on-device: RFD40 serial 24190525100255] |

`set_operating_mode` is a CONTROL command and is delivered over the CTRL endpoint; an active CTRL endpoint is required for it to route. This session the CTRL endpoint was active from the prior turn (active endpoints `[MDM_REMOTE, CTRL_EP, DATA1_EP]`) [verified-from-test-harness: deployment topology — CTRL_EP active; same CONTROL routing rule as get_operating_mode]. Environment: laptop on Wi-Fi `Airtel_The_LAN_Before_Time`; broker `192.168.1.6:1883` reachable; device `192.168.1.5` reachable [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

Top-level command fields:

| Field | Type | Required | Notes / Locus |
| --- | --- | --- | --- |
| `command` | string, enum `["set_operating_mode"]` | yes | Fixed command name [verified-from-schema: commands/control/set_operating_mode.json properties.command.enum] |
| `requestId` | string | yes | Unique request identifier for traceability [verified-from-schema: commands/control/set_operating_mode.json properties.requestId] |
| `operatingMode` | object (`$ref` operatingModePayload.yaml) | **no** | NOT in `required` (`required: [command, requestId]`) — so partial sets are allowed; the schema ships single-aspect examples [verified-from-schema: commands/control/set_operating_mode.json required + examples] |

`operatingMode.operatingModes.*` fields [verified-from-schema: refrence/payload/operatingModePayload.yaml properties.operatingModes.properties]:

| Field | Type | Notes / Locus |
| --- | --- | --- |
| `profiles` | string, enum `FAST_READ`, `CYCLE_COUNT`, `DENSE_READERS`, `OPTIMAL_BATTERY`, `BALANCED_PERFORMANCE`, `ADVANCED` (default `BALANCED_PERFORMANCE`) | `FAST_READ` is "Currently not supported"; `ADVANCED` requires `advancedConfigurations` [verified-from-schema: operatingModePayload.yaml profiles.enum + description] |
| `advancedConfigurations.transmitPower` | number, no `minimum`/`maximum` | Unbounded — see **P3** [verified-from-schema: operatingModePayload.yaml advancedConfigurations.transmitPower] |
| `advancedConfigurations.linkProfile` | string, enum `M4_256K`, `M2_240K`, `M2_256K`, `M2_320K`, `M4_240K`, `M4_320K`, `FM0_0K`, `FM0_320K`, `M8_240K`, `M8_256K`, `M8_320K` | [verified-from-schema: operatingModePayload.yaml linkProfile.enum] |
| `advancedConfigurations.session` | string, enum `SESSION_0`, `SESSION_1`, `SESSION_2`, `SESSION_3` | [verified-from-schema: operatingModePayload.yaml session.enum] |
| `advancedConfigurations.dynamicPower` | boolean | [verified-from-schema: operatingModePayload.yaml dynamicPower] |
| `accessOperations[]` | array (`$ref` accessCmds.yaml) | Each entry: `operationType` + `config` |
| `accessOperations[].operationType` | string, enum `READ`, `WRITE`, `ACCESS`, `LOCK`, `KILL` | [verified-from-schema: accessCmds.yaml items.operationType.enum] |
| `accessOperations[].config.memoryBank` | string, enum `EPC`, `TID`, `USER`, `RESERVED` | [verified-from-schema: accessCmds.yaml config.memoryBank.enum] |
| `accessOperations[].config.offset` | integer (16-bit words) | Starting word position [verified-from-schema: accessCmds.yaml config.offset] |
| `accessOperations[].config.length` | integer (16-bit words) | Word count [verified-from-schema: accessCmds.yaml config.length] |
| `accessOperations[].config.data` | string (hex, multiple of 16-bit words) | Words to write [verified-from-schema: accessCmds.yaml config.data] |
| `accessOperations[].config.password` | string | Stated rule: "exactly 8 hex characters (32 bits)" — but NOT pattern-enforced; see **P1**. Sensitive tag-access credential — MASKED in examples [verified-from-schema: accessCmds.yaml config.password.description] |
| `accessOperations[].config.lockMemBank` | string, enum `EPC`, `ACCESS_PWD`, `KILL_PWD`, `TID`, `USER`, `ALL` | [verified-from-schema: accessCmds.yaml config.lockMemBank.enum] |
| `accessOperations[].config.lockAction` | string, enum `READ_AND_WRITE`, `PERMANENT_LOCK`, `PERMANENT_UNLOCK`, `UNLOCK` | [verified-from-schema: accessCmds.yaml config.lockAction.enum] |
| `radioStartConditions` | object (`$ref` radioStartCondPayload.yaml) | e.g. `trigger`, `startDelay`, `repeat` [verified-from-schema: operatingModePayload.yaml radioStartConditions] |
| `radioStopConditions` | object (`$ref` radioStopCondPayload.yaml) | e.g. `trigger`, `tagCount`, `stopTimeout`, `inventoryCount` [verified-from-schema: operatingModePayload.yaml radioStopConditions] |
| `query` | object (`$ref` queryPayload.yaml) | e.g. `session`, `inventoryState`, `slFlag`, `tagPopulation` [verified-from-schema: operatingModePayload.yaml query] |
| `select[]` | array (`$ref` selectPayload.yaml), up to 32 filters | Pre-filter config [verified-from-schema: operatingModePayload.yaml select] |
| `tagMetaDataToEnable` | object of booleans | Declared property keys: `RSSI`, `PHASE`, `SEENCOUNT`, `CHANNEL`, `PC`, `EPC`, `TID`, `USER`, `MAC`, `HOSTNAME` [verified-from-schema: operatingModePayload.yaml properties.operatingModes.properties.tagMetaDataToEnable.properties (lines 189-229)]. NOTE: `XPC` and `CRC` (used in the request and readback this session) are NOT declared properties — they appear only in the file's `examples` block (operatingModePayload.yaml lines 51-52) [verified-from-schema] and were confirmed on the wire [verified-on-device: RFD40 serial 24190525100255]. See **P6**. |

### JSON Request Example (operator-provided, schema-validated, sent — tag-access passwords MASKED)

The exact request sent this session is the command schema's canonical example #1 (the full `ADVANCED` config) [verified-from-schema: commands/control/set_operating_mode.json examples[0]]. It is statically **VALID** against `operatingModePayload.yaml` (all enums match, structure correct) [verified-from-schema: refrence/payload/operatingModePayload.yaml]. The five Gen2 tag-access passwords are MASKED below as `********`:

```json
{
  "command": "set_operating_mode",
  "requestId": "abc123",
  "operatingMode": {
    "operatingModes": {
      "profiles": "ADVANCED",
      "advancedConfigurations": { "transmitPower": 300, "linkProfile": "M2_240K", "session": "SESSION_1", "dynamicPower": true },
      "accessOperations": [
        { "operationType": "READ",   "config": { "memoryBank": "EPC", "offset": 1, "length": 2 } },
        { "operationType": "READ",   "config": { "memoryBank": "TID", "offset": 2, "length": 2 } },
        { "operationType": "WRITE",  "config": { "memoryBank": "USER", "offset": 2, "length": 2, "data": "FFFFEEEE", "password": "********" } },
        { "operationType": "ACCESS", "config": { "password": "********" } },
        { "operationType": "LOCK",   "config": { "password": "********", "lockMemBank": "TID", "lockAction": "UNLOCK" } }
      ],
      "radioStartConditions": { "trigger": "IMMEDIATE", "startDelay": 3000, "repeat": false },
      "radioStopConditions": { "trigger": "IMMEDIATE", "tagCount": 10, "stopTimeout": 10000, "inventoryCount": 0 },
      "query": { "session": "SESSION_1", "inventoryState": "STATE_B", "slFlag": "ALL", "tagPopulation": 30 },
      "select": [
        { "enable": true, "tagPattern": "2222EEEEFFFF1111AAAABBBB", "memoryBank": "EPC", "offset": 32,
          "action": "INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL", "target": "SESSION_1", "length": 16 }
      ],
      "tagMetaDataToEnable": { "RSSI": false, "PHASE": false, "SEENCOUNT": false, "CHANNEL": false, "PC": false, "XPC": true, "CRC": true,
                               "EPC": true, "TID": true, "USER": true, "MAC": true, "HOSTNAME": true }
    }
  }
}
```

> Note: the schema's literal example #1 carries a 4-hex-character tag-access password, which is masked to `********` here (and everywhere this request is documented). Its non-conforming length — half the stated 8-hex (32-bit) rule — is the subject of defect **P1** below.

## 4. Response Payload Breakdown

| Field | Type | Required | Notes / Locus |
| --- | --- | --- | --- |
| `command` | string | yes | Echoes the executed command [verified-from-schema: response/control/set_operating_mode.json properties.command] |
| `requestId` | string | yes | Echoes the original request id [verified-from-schema: response/control/set_operating_mode.json properties.requestId] |
| `apiVersion` | string, enum `["V1.0", "V1.1"]` | yes | [verified-from-schema: response/control/set_operating_mode.json properties.apiVersion.enum] |
| `response.code` | integer, `minimum 0`, `maximum 30` | yes | Status code [verified-from-schema: refrence/response/response.yaml code] |
| `response.description` | string | yes | Human-readable status [verified-from-schema: refrence/response/response.yaml description] |

This is a status-only envelope — `set_operating_mode` returns no payload echo, only `response{code, description}`. All four envelope fields (`command`, `requestId`, `apiVersion`, `response`) are `required` [verified-from-schema: response/control/set_operating_mode.json required].

### JSON Response Example (LIVE, verbatim)

```json
{ "command": "set_operating_mode", "requestId": "abc123", "apiVersion": "V1.1", "response": { "code": 101, "description": "Error in processing command" } }
```

The envelope is structurally complete (all four required fields present; `apiVersion` is in enum) but it is **INVALID** against the schema: `response.yaml` constrains `code` to `maximum 30`, and `101` exceeds that and is absent from the documented 0..30 code table — the same undocumented out-of-range code-101 class already documented for `config_endpoint` (H2). See **P4** [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: refrence/response/response.yaml code maximum].

## 5. Live Verification

**Verdict: LIVE.** The request (schema example #1, masked above) was published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` and the response was read on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. CTRL_EP was already active from the prior turn [verified-from-test-harness: CTRL_EP active]. The user explicitly confirmed before this state-changing send.

**Headline 1 — the SET returned `code 101` yet the mode PARTIALLY APPLIED.** On a single send (not a retry artifact), `set_operating_mode` returned `response.code 101` "Error in processing command" [verified-on-device: RFD40 serial 24190525100255]. A subsequent `get_operating_mode` readback over CTRL then proved the mode had been **largely applied** despite the error — so a `code 101` from `set_operating_mode` does NOT mean "nothing changed" (**P5**). Callers must read back to learn what actually applied [verified-on-device: RFD40 serial 24190525100255].

**Headline 2 — the destructive WRITE/LOCK access ops were NOT applied (the three generic READ ops are metadata-auto-provisioned, not remnants of the submit).** The readback shows the five submitted access ops (2 READ, WRITE, ACCESS, LOCK) were NOT stored; the three generic READ ops (EPC/TID/USER, all `offset 0`, `length 0`) that remain are now understood as AUTO-PROVISIONED by that submit's `EPC`/`TID`/`USER` tag-metadata flags (all `true`; its also-`true` `MAC`/`HOSTNAME` reader flags added no ops), per the §5 sixth worked example and **P10** — NOT as remnants of the submitted access ops (which were EPC `{offset 1, length 2}` + TID `{offset 2, length 2}` — only two reads, with non-zero offsets — plus WRITE/ACCESS/LOCK) [verified-on-device: RFD40 serial 24190525100255]. The destructive `WRITE` (`FFFFEEEE` → USER) and `LOCK` (UNLOCK TID) ops were NOT applied/stored — no tag-modification was armed [verified-on-device: RFD40 serial 24190525100255].

APPLIED-vs-NOT-APPLIED (readback over CTRL) [verified-on-device: RFD40 serial 24190525100255]:

| Aspect | Submitted | Readback result | Verdict |
| --- | --- | --- | --- |
| `profiles` | `ADVANCED` | `ADVANCED` | APPLIED as sent |
| `advancedConfigurations` | `transmitPower 300`, `linkProfile M2_240K`, `session SESSION_1`, `dynamicPower true` | identical (incl. `transmitPower 300`) | APPLIED as sent (300 stored) |
| `query` | `session SESSION_1`, `inventoryState STATE_B`, `slFlag ALL`, `tagPopulation 30` | identical | APPLIED as sent |
| `radioStartConditions` | `trigger IMMEDIATE`, `startDelay 3000`, `repeat false` | identical | APPLIED as sent |
| `select` | the exact pre-filter sent | identical | APPLIED as sent |
| `accessOperations` | 2 READ + WRITE + ACCESS + LOCK | 3 generic READ ops (EPC/TID/USER, offset 0 length 0); WRITE/ACCESS/LOCK dropped | NOT applied as sent |
| `tagMetaDataToEnable.XPC` | `true` | `false` | NOT applied (also an undeclared key — see **P6**) |
| `tagMetaDataToEnable.CRC` | `true` | `false` | NOT applied (also an undeclared key — see **P6**) |
| `tagMetaDataToEnable.SEENCOUNT` | `false` | key ABSENT from readback | Dropped |
| `radioStopConditions.inventoryCount` | `0` | absent from readback | Dropped |
| `radioStopConditions` (rest) | `trigger IMMEDIATE`, `tagCount 10`, `stopTimeout 10000` | identical | APPLIED as sent |

Masked `get_operating_mode` readback (verbatim; readback contained no passwords — only 3 READ ops stored):

```json
{
  "command": "get_operating_mode",
  "requestId": "gm-verify",
  "apiVersion": "V1.1",
  "operatingMode": {
    "operatingModes": {
      "profiles": "ADVANCED",
      "advancedConfigurations": { "transmitPower": 300, "linkProfile": "M2_240K", "session": "SESSION_1", "dynamicPower": true },
      "accessOperations": [
        { "operationType": "READ", "config": { "memoryBank": "EPC", "offset": 0, "length": 0 } },
        { "operationType": "READ", "config": { "memoryBank": "TID", "offset": 0, "length": 0 } },
        { "operationType": "READ", "config": { "memoryBank": "USER", "offset": 0, "length": 0 } }
      ],
      "radioStartConditions": { "trigger": "IMMEDIATE", "startDelay": 3000, "repeat": false },
      "radioStopConditions": { "trigger": "IMMEDIATE", "tagCount": 10, "stopTimeout": 10000 },
      "query": { "session": "SESSION_1", "inventoryState": "STATE_B", "slFlag": "ALL", "tagPopulation": 30 },
      "select": [
        { "enable": true, "tagPattern": "2222EEEEFFFF1111AAAABBBB", "memoryBank": "EPC", "offset": 32,
          "action": "INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL", "target": "SESSION_1", "length": 16 }
      ],
      "tagMetaDataToEnable": { "RSSI": false, "PHASE": false, "CHANNEL": false, "PC": false, "XPC": false, "CRC": false,
                               "EPC": true, "TID": true, "USER": true, "MAC": true, "HOSTNAME": true }
    }
  },
  "response": { "description": "Success" }
}
```

**Safety outcome:** because the WRITE/ACCESS/LOCK ops were never stored, no destructive tag operation (the USER-bank write or the TID unlock) was armed [verified-on-device: RFD40 serial 24190525100255]. **transmitPower 300 WAS accepted/stored** (readback confirms) [verified-on-device: RFD40 serial 24190525100255].

**Cause of code 101 — UNDETERMINED (corrected; do not assert the access ops).** The exact cause of the `ADVANCED` set's `code 101` is UNDETERMINED. A later `accessOperations`-only test (§5 third worked example) sent these EXACT access ops alone — the same 2 READ + WRITE + ACCESS + LOCK, the same malformed 4-hex tag-access password (defect **P1**), the same `WRITE` (`FFFFEEEE` → USER) and `LOCK` (UNLOCK EPC) — and they SUCCEEDED and were STORED [verified-on-device: RFD40 serial 24190525100255]. Therefore the `101` was NOT caused by the `accessOperations` or the malformed password; its cause lies ELSEWHERE in the full `ADVANCED` payload and remains undetermined. The access-op dropping seen in this turn's readback was COLLATERAL of the error, not a sign the access ops were invalid (they are valid and store standalone, as shown in §5) [inferred-from-live: the same access ops succeed and store when sent alone, so they are not the 101 cause].

**Readback note:** the `get_operating_mode` readback again returned `response {description: "Success"}` with NO `response.code` — reconfirming the `get_operating_mode` O1 finding [verified-on-device: RFD40 serial 24190525100255].

### Second worked example — minimal profile set (`BALANCED_PERFORMANCE`): clean success + revert

This is the command schema's canonical example #2 — a minimal, profile-only set — and it doubled as the **revert/cleanup** of the `ADVANCED` mode left behind by the primary example above [verified-from-schema: commands/control/set_operating_mode.json examples[1] + verified-on-device: RFD40 serial 24190525100255]. Same CONTROL routing and active CTRL_EP as the primary run (do not restate P5's apply-on-error behavior here; this run is the BENIGN contrast) [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].

**The request (= command schema example #2).** It carries no credentials — there is nothing to mask [verified-on-device: RFD40 serial 24190525100255]:

```json
{ "command": "set_operating_mode", "requestId": "1286", "operatingMode": { "operatingModes": { "profiles": "BALANCED_PERFORMANCE" } } }
```

Static verdict: **VALID** — `command` is in `enum ["set_operating_mode"]`, `requestId` is present, and `profiles: BALANCED_PERFORMANCE` is in the `profiles` enum (it is also the schema default). This is a partial set: `operatingMode` is NOT in the command's `required` (`required: [command, requestId]`), so a profile-only body validates [verified-from-schema: commands/control/set_operating_mode.json required + examples[1] + refrence/payload/operatingModePayload.yaml profiles.enum]. (The runner used `som-set` as the on-wire id; the operator-supplied id was `1286`. The device echoes whatever `requestId` is supplied — it is documented here as `1286` [verified-on-device: RFD40 serial 24190525100255].)

**Before → after (readback over CTRL).** A `get_operating_mode` BEFORE this set returned `profiles: "ADVANCED"` (the mode left by the primary `ADVANCED` run); a `get_operating_mode` AFTER returned `profiles: "BALANCED_PERFORMANCE"`. So the set **APPLIED** — the profile changed `ADVANCED → BALANCED_PERFORMANCE`, restoring the device to the schema-default profile and serving as the revert/cleanup of the prior `ADVANCED` set [verified-on-device: RFD40 serial 24190525100255].

| Aspect | Before (readback) | Submitted | After (readback) | Verdict |
| --- | --- | --- | --- | --- |
| `profiles` | `ADVANCED` | `BALANCED_PERFORMANCE` | `BALANCED_PERFORMANCE` | APPLIED — device reverted to default |

**The SUCCESS response (LIVE, verbatim).** The device returned [verified-on-device: RFD40 serial 24190525100255]:

```json
{ "command": "set_operating_mode", "requestId": "1286", "apiVersion": "V1.1", "response": { "description": "Success" } }
```

Validation verdict: **INVALID** against the response schema — `response` is `{ "description": "Success" }` with NO `code` field, but `response.yaml` requires `[code, description]`; the required `response.code` is MISSING [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: response/control/set_operating_mode.json properties.response + refrence/response/response.yaml required]. This extends the `get_operating_mode` **O1** omit-`code`-on-success pattern to `set_operating_mode`'s SUCCESS response — the same omission, now shown for `set` (see **P7**).

**The contrast / confirmation.** The primary example (full `ADVANCED` set — carrying `profiles ADVANCED`, `advancedConfigurations`, `query`, `radioStart/StopConditions`, `select`, `tagMetaDataToEnable`, AND the malformed 4-hex access-op password — defect **P1** — plus WRITE/LOCK ops) returned `response.code 101` (an ERROR; code PRESENT, out-of-range — defect **P4**). This minimal set carries ONLY `profiles: BALANCED_PERFORMANCE` and NO `accessOperations`, and it returned `{ description: "Success" }` with NO code, with the profile actually changing. The two sends differ in nearly every field, so this is not a single-variable contrast. A later `accessOperations`-only test (§5 third worked example) then sent the primary run's EXACT access ops alone — the same malformed 4-hex password (**P1**) and the WRITE/LOCK — and they SUCCEEDED and were STORED, so the access ops do NOT block `set_operating_mode`. Taken together — those access ops succeed and store standalone, and this profile-only run with no access ops succeeded — the prior `101` is NOT attributable to the `accessOperations`; its cause is UNDETERMINED and lies elsewhere in the full `ADVANCED` payload, NOT in `set_operating_mode` in general, and the access-op dropping in the `ADVANCED` readback was collateral of that undetermined error. A profile-only set succeeds cleanly [verified-on-device: RFD40 serial 24190525100255 + inferred-from-live: the same access ops succeed and store standalone (§5 third worked example), so they are not the 101 cause; the 101 cause is undetermined]. This also confirms the per-command code-presence pattern: a response with NO `code` = success, a response WITH a `code` = error (see **P7**).

**Safety / hygiene outcome.** This run was BENIGN — no `accessOperations`, no radio start, no destructive ops — and it reverted the device `ADVANCED → BALANCED_PERFORMANCE`, cleaning up the state the primary run left behind [verified-on-device: RFD40 serial 24190525100255].

### Third worked example — `accessOperations`-only set: SUCCESS, ops stored, and a CORRECTION to the code-101 attribution

This is the command schema's canonical example #3 — an `accessOperations`-only partial set — and its result is the **headline correction of this whole document**: the SAME access ops that the primary `ADVANCED` run dropped on `code 101` (the 2 READ + WRITE + ACCESS + LOCK, carrying the SAME malformed 4-hex tag-access password, defect **P1**) here SUCCEED and are STORED when sent ALONE. So the prior `101` was NOT the access ops / the password; its cause is undetermined and lies elsewhere in the full `ADVANCED` payload [verified-from-schema: commands/control/set_operating_mode.json examples[2] (this is canonical example #3) + verified-on-device: RFD40 serial 24190525100255 (success + ops stored) + inferred-from-live: the same access ops succeed and store standalone, so they are not the 101 cause]. Same CONTROL routing and active CTRL_EP as the prior runs [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The send was user-confirmed beforehand.

**The request (= command schema example #3; tag-access passwords MASKED as `********`).** Five access ops; the `LOCK` targets `EPC` (`lockAction UNLOCK`). The five Gen2 tag-access passwords are MASKED below [verified-on-device: RFD40 serial 24190525100255]:

```json
{
  "command": "set_operating_mode",
  "requestId": "1286",
  "operatingMode": {
    "operatingModes": {
      "accessOperations": [
        { "operationType": "READ",   "config": { "memoryBank": "EPC", "offset": 2, "length": 3 } },
        { "operationType": "READ",   "config": { "memoryBank": "TID", "offset": 1, "length": 2 } },
        { "operationType": "WRITE",  "config": { "memoryBank": "USER", "offset": 2, "length": 2, "data": "FFFFEEEE", "password": "********" } },
        { "operationType": "ACCESS", "config": { "password": "********" } },
        { "operationType": "LOCK",   "config": { "password": "********", "lockMemBank": "EPC", "lockAction": "UNLOCK" } }
      ]
    }
  }
}
```

Static verdict: **VALID** — `command` is in `enum ["set_operating_mode"]`, `requestId` is present, and every access-op field is in-enum (`operationType` READ/WRITE/ACCESS/LOCK; `memoryBank` EPC/TID/USER; `lockMemBank EPC`; `lockAction UNLOCK`). This is a partial set: `operatingMode` is NOT in the command's `required` (`required: [command, requestId]`), so an access-ops-only body validates [verified-from-schema: commands/control/set_operating_mode.json required + examples[2] + refrence/payload/accessCmds.yaml items]. The 4-hex `********` passwords are the **P1** defect (the stated rule is 8 hex / 32 bits), but they are NOT `pattern`-enforced, so static validation passes [verified-from-schema: refrence/payload/accessCmds.yaml config.password.description].

**The SUCCESS response (LIVE, verbatim).** The device returned [verified-on-device: RFD40 serial 24190525100255]:

```json
{ "command": "set_operating_mode", "requestId": "1286", "apiVersion": "V1.1", "response": { "description": "Success" } }
```

This is **SUCCESS with NO `response.code`** — the omit-code-on-success pattern (O1 / **P7**) reconfirmed for `set_operating_mode`. Validation verdict: **INVALID** against the response schema — `response` is `{ "description": "Success" }` with NO `code` field, but `response.yaml` requires `[code, description]`; the required `response.code` is MISSING [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: response/control/set_operating_mode.json properties.response + refrence/response/response.yaml required].

**Readback — all five access ops were STORED.** A `get_operating_mode` over CTRL after the set showed all five submitted access ops present (the device echoes stored passwords as EMPTY `""` — no credential is returned) [verified-on-device: RFD40 serial 24190525100255]:

| Submitted access op | Readback result | Verdict |
| --- | --- | --- |
| `READ` EPC `{offset 2, length 3}` | `READ` EPC `{offset 2, length 3}` | STORED as sent |
| `READ` TID `{offset 1, length 2}` | `READ` TID `{offset 1, length 2}` | STORED as sent |
| `WRITE` USER `{offset 2, length 2, data FFFFEEEE, password ********}` | `WRITE` USER `{offset 2, data FFFFEEEE, password ""}` — `length` DROPPED | STORED (NOTE: stored WRITE dropped `length`; password echoed empty `""`) |
| `ACCESS` `{password ********}` | `ACCESS` `{password ""}` | STORED (password echoed empty `""`) |
| `LOCK` `{lockMemBank EPC, lockAction UNLOCK, password ********}` | `LOCK` `{lockMemBank EPC, lockAction UNLOCK, password ""}` | STORED as sent (password echoed empty `""`) |

**CORRECTION / REFUTATION — the prior `code 101` was NOT the access ops.** Because these EXACT ops — including the malformed 4-hex password (**P1**) and the destructive `WRITE`/`LOCK` — SUCCEED and are STORED when sent ALONE, they did NOT cause the primary `ADVANCED` run's `code 101`. The doc's earlier attribution of that `101` to the `accessOperations` / the malformed password is **REFUTED**. The `101`'s cause lies ELSEWHERE in the full `ADVANCED` payload and is **UNDETERMINED**; the access-op dropping in that turn's readback was COLLATERAL of the error, not evidence the access ops were invalid [verified-on-device: RFD40 serial 24190525100255 + inferred-from-live: the same access ops succeed and store standalone, so they are not the 101 cause]. (See the corrected clauses in §5 primary, §5 second example, **P1**, and **P5**.)

**PARTIAL-SET MERGE (behavior, confirmed).** This set carried ONLY `accessOperations`, yet the readback showed it COEXISTING with prior aspects: this turn's `accessOperations` + last turn's `profiles BALANCED_PERFORMANCE` (unchanged — this set had no profiles) + the `ADVANCED`-era `radioStartConditions {trigger IMMEDIATE, startDelay 3000, repeat false}`, `radioStopConditions {trigger IMMEDIATE, tagCount 10, stopTimeout 10000}`, and `query {SESSION_1, STATE_B, ALL, 30}` — all LEFTOVER from two turns ago and untouched by this set [verified-on-device: RFD40 serial 24190525100255]. So `set_operating_mode` updates ONLY the aspects present in the payload and leaves all others intact — partial sets are **cumulative/merge, NOT full-replacements** [verified-on-device: RFD40 serial 24190525100255].

**SAFETY — destructive ops now ARMED; clear before any inventory.** Unlike the `ADVANCED` run (where WRITE/LOCK were dropped), the destructive `WRITE` (`FFFFEEEE` → USER memory) and `LOCK` (UNLOCK EPC) access ops are NOW STORED/ARMED in the operating mode [verified-on-device: RFD40 serial 24190525100255]. They have NOT executed — no inventory was started. BUT the merged mode also carries the LEFTOVER `radioStartConditions {trigger: IMMEDIATE}` from the `ADVANCED` set, so a future inventory START would run these armed ops against any tags in range [verified-on-device: RFD40 serial 24190525100255 + inferred-from-live: armed-but-not-executed]. **RECOMMEND clearing them before any inventory:** reboot (restores the default mode), or send a benign `accessOperations` set (or `{profiles: BALANCED_PERFORMANCE}`) to overwrite. No broker/Wi-Fi credentials are involved; tag-access passwords appear only as `********` and the device returned stored passwords as empty `""` [verified-on-device: RFD40 serial 24190525100255].

### Fourth worked example — radio start/stop conditions only: clean MERGE apply (single-session BEFORE → AFTER)

This is the command schema's canonical example #4 — a `radioStartConditions`/`radioStopConditions`-only partial set — and it is a **clean single-session proof of the partial-set MERGE behavior**: a captured BEFORE readback and a captured AFTER readback (both this session) show ONLY the two radio aspects change while every other aspect is preserved untouched [verified-from-schema: commands/control/set_operating_mode.json examples[3]] [verified-on-device: RFD40 serial 24190525100255]. Unlike the primary `ADVANCED` run, this run returned a clean `{description: "Success"}` with NO error — so it is a MERGE apply on success, NOT a partial apply on error; do not conflate it with **P5** [verified-on-device: RFD40 serial 24190525100255]. Same CONTROL routing and active CTRL_EP as the prior runs [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].

**The request (= command schema example #4).** It carries no credentials (radio conditions only) — there is nothing to mask [verified-on-device: RFD40 serial 24190525100255]:

```json
{
  "command": "set_operating_mode",
  "requestId": "abc123",
  "operatingMode": {
    "operatingModes": {
      "radioStartConditions": { "trigger": "PRESSED", "startDelay": 5000, "repeat": false },
      "radioStopConditions": { "trigger": "RELEASED", "tagCount": 10, "stopTimeout": 10000, "inventoryCount": 0 }
    }
  }
}
```

Static verdict: **VALID** — `command` is in `enum ["set_operating_mode"]`, `requestId` is present, and both radio triggers are in-enum (`PRESSED`/`RELEASED` are members of `[PRESSED, RELEASED, IMMEDIATE]`). This is a partial set: `operatingMode` is NOT in the command's `required` (`required: [command, requestId]`), so a radio-conditions-only body validates [verified-from-schema: commands/control/set_operating_mode.json required + examples[3] + refrence/payload/radioStartCondPayload.yaml trigger.enum + refrence/payload/radioStopCondPayload.yaml trigger.enum]. The on-wire `requestId` was `abc123` (operator-supplied; the device echoed it) [verified-on-device: RFD40 serial 24190525100255].

**The SET response (LIVE, verbatim).** The device returned [verified-on-device: RFD40 serial 24190525100255]:

```json
{"command":"set_operating_mode","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

This is a **CLEAN SUCCESS** — `response.code` is OMITTED (the envelope carries only `{description: "Success"}`); there is NO `code 101` this time [verified-on-device: RFD40 serial 24190525100255]. Validation verdict: **INVALID** against the response schema — `response.yaml` requires `[code, description]`, but the required `response.code` is MISSING — reconfirming the `get_operating_mode` **O1** / this doc's **P7** omit-`code`-on-success pattern for `set_operating_mode` [verified-on-device: RFD40 serial 24190525100255] [verified-from-schema: refrence/response/response.yaml required].

**BEFORE readback (`get_operating_mode` over CTRL).** This is the captured BEFORE state for this session [verified-on-device: RFD40 serial 24190525100255]. It is the device's post-reboot state from the prior turn: the reboot reset `profiles` to `BALANCED_PERFORMANCE`, reset the radio conditions to `IMMEDIATE`, and cleared the armed WRITE/LOCK ops (note `accessOperations` is ABSENT) — which is exactly what `reboot`'s own post-reboot readback pins down (profile `BALANCED_PERFORMANCE`, `accessOperations` absent, radio reset to `IMMEDIATE`); the `query` and `tagMetaDataToEnable` values shown below are reported here as the captured readback, not as reboot-asserted defaults [verified-on-device: RFD40 serial 24190525100255]:

```json
{"operatingModes":{
  "profiles":"BALANCED_PERFORMANCE",
  "radioStartConditions":{"trigger":"IMMEDIATE","startDelay":0,"repeat":false},
  "radioStopConditions":{"trigger":"IMMEDIATE"},
  "query":{"session":"SESSION_1","inventoryState":"STATE_A","slFlag":"ALL","tagPopulation":30},
  "tagMetaDataToEnable":{"RSSI":true,"PHASE":false,"SEENCOUNT":true,"CHANNEL":false,"PC":false,"XPC":false,"CRC":false,"EPC":false,"TID":false,"USER":false,"MAC":false,"HOSTNAME":false}
}}
```

**AFTER readback (`get_operating_mode` over CTRL).** Only the two radio aspects changed; all else is byte-for-byte preserved [verified-on-device: RFD40 serial 24190525100255]:

```json
{"operatingModes":{
  "profiles":"BALANCED_PERFORMANCE",
  "radioStartConditions":{"trigger":"PRESSED","startDelay":5000,"repeat":false},
  "radioStopConditions":{"trigger":"RELEASED","tagCount":10,"stopTimeout":10000},
  "query":{"session":"SESSION_1","inventoryState":"STATE_A","slFlag":"ALL","tagPopulation":30},
  "tagMetaDataToEnable":{"RSSI":true,"PHASE":false,"SEENCOUNT":true,"CHANNEL":false,"PC":false,"XPC":false,"CRC":false,"EPC":false,"TID":false,"USER":false,"MAC":false,"HOSTNAME":false}
}}
```

The AFTER `get_operating_mode` response itself again returned `{description: "Success"}` with NO `response.code` — **O1** reconfirmed [verified-on-device: RFD40 serial 24190525100255].

**BEFORE → AFTER diff (both readbacks captured this session), keyed on aspect** [verified-on-device: RFD40 serial 24190525100255]:

| Aspect | Before (readback) | Submitted | After (readback) | Verdict |
| --- | --- | --- | --- | --- |
| `profiles` | `BALANCED_PERFORMANCE` | (not in payload) | `BALANCED_PERFORMANCE` | PRESERVED by merge (this set had no `profiles`) |
| `radioStartConditions` | `trigger IMMEDIATE`, `startDelay 0`, `repeat false` | `trigger PRESSED`, `startDelay 5000`, `repeat false` | `trigger PRESSED`, `startDelay 5000`, `repeat false` | APPLIED exactly as sent |
| `radioStopConditions` | `trigger IMMEDIATE` | `trigger RELEASED`, `tagCount 10`, `stopTimeout 10000`, `inventoryCount 0` | `trigger RELEASED`, `tagCount 10`, `stopTimeout 10000` | APPLIED (`tagCount`/`stopTimeout` stored; sent `inventoryCount 0` DROPPED from readback) |
| `query` | `SESSION_1`, `STATE_A`, `ALL`, `30` | (not in payload) | `SESSION_1`, `STATE_A`, `ALL`, `30` | PRESERVED by merge |
| `tagMetaDataToEnable` | (the map shown above) | (not in payload) | (identical map) | PRESERVED by merge |
| `accessOperations` | ABSENT | (not in payload) | ABSENT | ABSENT before and after (cleared by the prior reboot) |

**N1 — MERGE (same-session proof).** A partial set updates ONLY the aspects present in the payload (`radioStartConditions`/`radioStopConditions`) and leaves all other aspects (`profiles`, `query`, `tagMetaDataToEnable`) UNTOUCHED. This is a cleaner, single-session BEFORE → AFTER proof of the partial-set MERGE behavior already noted cross-turn in the §5 third worked example [verified-on-device: RFD40 serial 24190525100255].

**N2 — trigger-based radio conditions, first live exercise.** `trigger PRESSED` (start) and `trigger RELEASED` (stop) — both members of the `radioStart/StopCondPayload.yaml` enum `[PRESSED, RELEASED, IMMEDIATE]` — were accepted and STORED EXACTLY (`startDelay 5000` stored). The only prior worked example to actually submit radio conditions — the primary `ADVANCED` run — used `IMMEDIATE` for both triggers; this is the first live SET of a non-`IMMEDIATE` trigger [verified-from-schema: refrence/payload/radioStartCondPayload.yaml trigger.enum + refrence/payload/radioStopCondPayload.yaml trigger.enum] [verified-on-device: RFD40 serial 24190525100255].

**N3 — `inventoryCount: 0` DROPPED.** The `radioStopConditions` readback omits the sent zero-valued `inventoryCount` (sent `0`, absent in readback), while `tagCount 10` and `stopTimeout 10000` (both non-zero) ARE stored [verified-on-device: RFD40 serial 24190525100255]. This is CONSISTENT with the §5 primary `ADVANCED` run, where the sent `inventoryCount: 0` was also absent from the readback [verified-on-device: RFD40 serial 24190525100255]. The generalization that the device omits a zero-valued `inventoryCount` on readback is supported by these two observations [inferred-from-live: device omits zero-valued `inventoryCount` on readback, observed in the §5 primary and fourth worked examples].

**N4 — CLEAN SUCCESS (no 101).** A radio-conditions-only partial set returned a clean `{description: "Success"}` (no error), further corroborating that the primary `ADVANCED` run's `code 101` cause is UNDETERMINED and is NOT triggered by a radio-conditions-only partial set (note this run exercises trigger-based `PRESSED`/`RELEASED` conditions, whereas the `ADVANCED` run's radio conditions were `IMMEDIATE` and applied fine, so this does not re-test the `ADVANCED` run's specific radio conditions) [verified-on-device: RFD40 serial 24190525100255]. The success envelope again omitted `response.code`, which is INVALID against `response.yaml`'s `required [code, description]` (O1 / **P7** reconfirmed) [verified-on-device: RFD40 serial 24190525100255] [verified-from-schema: refrence/response/response.yaml required].

**CROSS-REF (reboot).** The BEFORE readback shows `accessOperations` ABSENT, `profiles BALANCED_PERFORMANCE`, and the radio conditions reset to `IMMEDIATE`, empirically confirming the prior reboot cleared both the armed WRITE/LOCK ops and the prior radio settings, and the command description's claim "On reboot the set configurations will be lost and the device will go back to default operating mode" [verified-on-device: RFD40 serial 24190525100255] [verified-from-schema: commands/control/set_operating_mode.json description].

**Resulting device state / safety.** The device now sits at `BALANCED_PERFORMANCE` with trigger-based radio conditions (start on `PRESSED` after a 5000 ms delay, stop on `RELEASED` / `tagCount 10` / `stopTimeout 10000`) and NO `accessOperations` armed — a BENIGN state (no destructive WRITE/LOCK is staged) [verified-on-device: RFD40 serial 24190525100255]. It is **REVERSIBLE**: a reboot restores the default operating mode, or re-send `set_operating_mode` with `radioStartConditions {trigger: IMMEDIATE}` / `radioStopConditions {trigger: IMMEDIATE}` to revert the radio conditions [verified-from-schema: commands/control/set_operating_mode.json description] [verified-on-device: RFD40 serial 24190525100255].

### Fifth worked example — query setting (`session`/`inventoryState`/`slFlag`/`tagPopulation`): idempotent clean apply, write-path proven by a probe

This is the command schema's canonical example #5 — a `query`-only partial set — and it is documented as a **two-run proof**: RUN 1 (the operator payload) returned a clean `{description: "Success"}` but did NOT change the device's `query` (the device already held the submitted value, so this run was IDEMPOTENT), and RUN 2 then proves the WRITE PATH with a probe-then-restore (set a DIFFERENT `query`, confirm it changed, then re-send the operator payload to restore) [verified-on-device: RFD40 serial 24190525100255]. The operator payload matches the command schema's example index [4] (`query` only, `{SESSION_1, STATE_A, ALL, 30}`) [verified-from-schema: commands/control/set_operating_mode.json examples[4]]. Like the fourth worked example this is a MERGE apply on a clean success, NOT a partial apply on error; do not conflate it with **P5** [verified-on-device: RFD40 serial 24190525100255]. Same CONTROL routing and active CTRL_EP as the prior runs [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].

**The request (= command schema example #5).** It carries no credentials (`query` only) — there is nothing to mask [verified-on-device: RFD40 serial 24190525100255]:

```json
{ "command": "set_operating_mode", "requestId": "abc123",
  "operatingMode": { "operatingModes": {
    "query": { "session": "SESSION_1", "inventoryState": "STATE_A", "slFlag": "ALL", "tagPopulation": 30 } } } }
```

Static verdict: **VALID** — `command` is in `enum ["set_operating_mode"]`, `requestId` is present, and every `query` field is in-enum (`session SESSION_1` ∈ `[SESSION_0..SESSION_3]`; `inventoryState STATE_A` ∈ `[STATE_A, STATE_B, STATE_AB]`; `slFlag ALL` ∈ `[ALL, ASSERTED, DEASSERTED]`) with `tagPopulation 30` ≥ the declared `minimum 0` [verified-from-schema: refrence/payload/queryPayload.yaml properties]. This is a partial set: `operatingMode` is NOT in the command's `required` (`required: [command, requestId]`), so a `query`-only body validates [verified-from-schema: commands/control/set_operating_mode.json required + examples[4]]. The on-wire `requestId` was `abc123` (operator-supplied; the device echoed it) [verified-on-device: RFD40 serial 24190525100255].

#### RUN 1 — the operator payload (IDEMPOTENT: clean success, query unchanged, merge preserved)

**The SET response (LIVE, verbatim).** The device returned [verified-on-device: RFD40 serial 24190525100255]:

```json
{"command":"set_operating_mode","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

This is a **CLEAN SUCCESS** — `response.code` is OMITTED (the envelope carries only `{description: "Success"}`); there is NO `code 101` [verified-on-device: RFD40 serial 24190525100255]. Validation verdict: **INVALID** against the response schema — `response.yaml` requires `[code, description]`, but the required `response.code` is MISSING — reconfirming the `get_operating_mode` **O1** / this doc's **P7** omit-`code`-on-success pattern for `set_operating_mode` [verified-from-schema: refrence/response/response.yaml required].

**BEFORE readback (`get_operating_mode` over CTRL).** Captured BEFORE the RUN 1 set [verified-on-device: RFD40 serial 24190525100255]:

```json
{"operatingModes":{
  "profiles":"BALANCED_PERFORMANCE",
  "radioStartConditions":{"trigger":"PRESSED","startDelay":5000,"repeat":false},
  "radioStopConditions":{"trigger":"RELEASED","tagCount":10,"stopTimeout":10000},
  "query":{"session":"SESSION_1","inventoryState":"STATE_A","slFlag":"ALL","tagPopulation":30},
  "tagMetaDataToEnable":{"RSSI":true,"PHASE":false,"SEENCOUNT":true,"CHANNEL":false,"PC":false,"XPC":false,"CRC":false,"EPC":false,"TID":false,"USER":false,"MAC":false,"HOSTNAME":false}
}}
```

**AFTER readback (`get_operating_mode` over CTRL).** IDENTICAL to BEFORE — every field byte-for-byte the same [verified-on-device: RFD40 serial 24190525100255]:

```json
{"operatingModes":{
  "profiles":"BALANCED_PERFORMANCE",
  "radioStartConditions":{"trigger":"PRESSED","startDelay":5000,"repeat":false},
  "radioStopConditions":{"trigger":"RELEASED","tagCount":10,"stopTimeout":10000},
  "query":{"session":"SESSION_1","inventoryState":"STATE_A","slFlag":"ALL","tagPopulation":30},
  "tagMetaDataToEnable":{"RSSI":true,"PHASE":false,"SEENCOUNT":true,"CHANNEL":false,"PC":false,"XPC":false,"CRC":false,"EPC":false,"TID":false,"USER":false,"MAC":false,"HOSTNAME":false}
}}
```

The device's `query` ALREADY held exactly `{SESSION_1, STATE_A, ALL, 30}` coming into this turn — those values PERSISTED from the prior turn (the radio-conditions turn; no reboot happened between turns), so the submitted value already matched, making RUN 1 an **IDEMPOTENT** set for the `query` (BEFORE `query` == AFTER `query` == the submitted value) [verified-on-device: RFD40 serial 24190525100255]. RUN 1 alone proves acceptance, static + enum validity, clean Success, and merge-preservation — but NOT that the device WROTE the `query` (it could in principle have ignored a value that already matched); that gap is closed by RUN 2 [verified-on-device: RFD40 serial 24190525100255].

**RUN 1 BEFORE → AFTER (both readbacks captured this session), keyed on aspect** [verified-on-device: RFD40 serial 24190525100255]:

| Aspect | Before (readback) | Submitted | After (readback) | Verdict |
| --- | --- | --- | --- | --- |
| `query` | `SESSION_1`, `STATE_A`, `ALL`, `30` | `SESSION_1`, `STATE_A`, `ALL`, `30` | `SESSION_1`, `STATE_A`, `ALL`, `30` | IDEMPOTENT — already matched; clean Success changed nothing |
| `profiles` | `BALANCED_PERFORMANCE` | (not in payload) | `BALANCED_PERFORMANCE` | PRESERVED by merge (this set had no `profiles`) |
| `radioStartConditions` | `trigger PRESSED`, `startDelay 5000`, `repeat false` | (not in payload) | `trigger PRESSED`, `startDelay 5000`, `repeat false` | PRESERVED by merge (persisted from the prior turn, no reboot) |
| `radioStopConditions` | `trigger RELEASED`, `tagCount 10`, `stopTimeout 10000` | (not in payload) | `trigger RELEASED`, `tagCount 10`, `stopTimeout 10000` | PRESERVED by merge (persisted from the prior turn, no reboot) |
| `tagMetaDataToEnable` | (the map shown above) | (not in payload) | (identical map) | PRESERVED by merge |

The prior turn's `radioStartConditions {PRESSED, 5000, false}` and `radioStopConditions {RELEASED, tagCount 10, stopTimeout 10000}` are STILL PRESENT here — cross-turn persistence (no reboot between turns) and preserved untouched by this `query`-only set [verified-on-device: RFD40 serial 24190525100255].

#### RUN 2 — confirmatory WRITE-PATH probe (proves the set genuinely writes the `query`; ends at the operator's value)

To close the idempotency gap, a probe set a DIFFERENT `query`, a readback confirmed the change, and the operator's exact payload was re-sent to restore. All three sets returned a clean `{description: "Success"}` with NO `response.code` [verified-on-device: RFD40 serial 24190525100255].

**SET probe response (query `{SESSION_2, STATE_B, ASSERTED, 40}`; LIVE, verbatim)** [verified-on-device: RFD40 serial 24190525100255]:

```json
{"command":"set_operating_mode","requestId":"probe","apiVersion":"V1.1","response":{"description":"Success"}}
```

**SET restore response (query `{SESSION_1, STATE_A, ALL, 30}` — the operator's EXACT payload, `requestId abc123`; LIVE, verbatim)** [verified-on-device: RFD40 serial 24190525100255]:

```json
{"command":"set_operating_mode","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

**RUN 2 write-path R0 → R1 → R2 (`get_operating_mode` `query` readbacks over CTRL)** [verified-on-device: RFD40 serial 24190525100255]:

| Step | Action | `query` readback | Verdict |
| --- | --- | --- | --- |
| R0 | baseline readback (before probe) | `SESSION_1`, `STATE_A`, `ALL`, `30` | baseline = the operator's value |
| R1 | after probe set `{SESSION_2, STATE_B, ASSERTED, 40}` | `SESSION_2`, `STATE_B`, `ASSERTED`, `40` | CHANGED (R0 ≠ R1) — the set WROTE the `query` |
| R2 | after restore set (operator's exact payload) | `SESSION_1`, `STATE_A`, `ALL`, `30` | RESTORED (R1 ≠ R2; R2 == operator value) |

The probe set a DIFFERENT `query` and the readback CHANGED (R0 ≠ R1); re-sending the operator's exact payload restored it (R1 ≠ R2; R2 == operator value) — this shows `set_operating_mode` genuinely WRITES all four `query` fields (it does not merely echo an already-matching value) and leaves the device at the operator's requested `query` value [verified-on-device: RFD40 serial 24190525100255]. R2 also shows `radioStartConditions {trigger PRESSED, startDelay 5000, repeat false}` STILL PRESENT — preserved across all sets [verified-on-device: RFD40 serial 24190525100255].

#### Findings

**N1 — IDEMPOTENT (RUN 1).** The operator's `query`-only set was idempotent — the device's `query` already held exactly `{SESSION_1, STATE_A, ALL, 30}`, so BEFORE == AFTER; the set returned clean Success but changed nothing [verified-on-device: RFD40 serial 24190525100255].

**N2 — WRITE-PATH PROVEN (RUN 2).** A confirmatory probe set a DIFFERENT `query` `{SESSION_2, STATE_B, ASSERTED, 40}` and the readback CHANGED (R0 ≠ R1); re-sending the operator's exact payload restored it (R1 ≠ R2; R2 == operator value), which shows `set_operating_mode` genuinely WRITES all four `query` fields (it does not merely echo an already-matching value) and leaves the device at the operator's requested `query` value [verified-on-device: RFD40 serial 24190525100255].

**N3 — ENUM COVERAGE (live).** Across RUN 1 + the probe, these `query` enum members were accepted and STORED live — `session {SESSION_1, SESSION_2}`, `inventoryState {STATE_A, STATE_B}`, `slFlag {ALL, ASSERTED}`, `tagPopulation {30, 40}` [verified-on-device: RFD40 serial 24190525100255]. All are declared members of the `query` enums (`session`/`inventoryState`/`slFlag`) and within `tagPopulation`'s `minimum 0` [verified-from-schema: refrence/payload/queryPayload.yaml properties].

**N4 — MERGE + CROSS-TURN PERSISTENCE.** The prior turn's `radioStartConditions {PRESSED, 5000, false}` / `radioStopConditions {RELEASED, tagCount 10, stopTimeout 10000}` PERSISTED into this turn (no reboot between turns) and were preserved untouched by every `query`-only set — so partial sets merge at aspect granularity, and operating-mode config persists across turns absent a reboot [verified-on-device: RFD40 serial 24190525100255].

**N5 — CLEAN SUCCESS, no code.** All three `query` sets (RUN 1 operator, probe, restore) returned `{description: "Success"}` with NO `response.code` (O1 / **P7** reconfirmed; no `code 101`) [verified-on-device: RFD40 serial 24190525100255]. A `response` lacking `code` is INVALID against `response.yaml`'s `required [code, description]` [verified-from-schema: refrence/response/response.yaml required].

**N6 — DEVICE USES THE DECLARED NAMES.** The readback echoes `query` with the DECLARED property names (`session`/`inventoryState`/`slFlag`/`tagPopulation`), corroborating that the `queryPayload.yaml` declaration and this command's example are the correct on-wire form (against the `operatingModePayload` example's `sel`/`target`/`S0` — see **P9**) [verified-on-device: RFD40 serial 24190525100255]. The declared property names are exactly `session`/`inventoryState`/`slFlag`/`tagPopulation` [verified-from-schema: refrence/payload/queryPayload.yaml properties].

**Resulting device state / safety.** The device now sits at `BALANCED_PERFORMANCE` with `query = {SESSION_1, STATE_A, ALL, 30}` (the operator's value), the trigger-based radio conditions `{PRESSED, 5000}` / `{RELEASED, tagCount 10, stopTimeout 10000}` preserved, and NO `accessOperations` armed — a BENIGN state (no destructive WRITE/LOCK is staged) [verified-on-device: RFD40 serial 24190525100255]. It is **REVERSIBLE**: per the command description, "On reboot the set configurations will be lost and the device will go back to default operating mode" [verified-from-schema: commands/control/set_operating_mode.json description].

### Sixth worked example — tag metadata settings (`tagMetaDataToEnable`-only): clean WRITE + MERGE, plus a causally-proven READ-op auto-provisioning

This is the command schema's canonical example #8 — a `tagMetaDataToEnable`-only partial set — and it is documented as a **two-run proof**: RUN 1 (the operator payload) returned a clean `{description: "Success"}` and the readback shows all ten DECLARED metadata flags applied EXACTLY as sent (three genuinely flipped `false → true`, so this is a real WRITE, not idempotent), while RUN 2 is a controlled probe-then-restore that CAUSALLY proves the new auto-provisioning finding [verified-on-device: RFD40 serial 24190525100255]. The operator payload matches the command schema's example index [7] (`tagMetaDataToEnable` only) [verified-from-schema: commands/control/set_operating_mode.json examples[7]]. Like the fourth and fifth worked examples this is a MERGE apply on a clean success, NOT a partial apply on error; do not conflate it with **P5** [verified-on-device: RFD40 serial 24190525100255]. Same CONTROL routing and active CTRL_EP as the prior runs [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The send was user-confirmed beforehand.

**The request (= command schema example #8).** It carries no credentials (metadata flags only) — there is nothing to mask [verified-on-device: RFD40 serial 24190525100255]:

```json
{ "command": "set_operating_mode", "requestId": "abc123",
  "operatingMode": { "operatingModes": { "tagMetaDataToEnable": {
    "RSSI": true, "PHASE": true, "SEENCOUNT": true, "CHANNEL": true, "PC": false, "XPC": false,
    "CRC": true, "EPC": true, "TID": false, "USER": false, "MAC": false, "HOSTNAME": false } } } }
```

Static verdict: **VALID** — `command` is in `enum ["set_operating_mode"]`, `requestId` is present, and the ten DECLARED keys (`RSSI`, `PHASE`, `SEENCOUNT`, `CHANNEL`, `PC`, `EPC`, `TID`, `USER`, `MAC`, `HOSTNAME`) are all boolean members of the declared `tagMetaDataToEnable.properties` block [verified-from-schema: refrence/payload/operatingModePayload.yaml properties.operatingModes.properties.tagMetaDataToEnable.properties (lines 189-229)]. The two keys `XPC` and `CRC` are UNDECLARED properties — they pass static validation only because `tagMetaDataToEnable` has no `additionalProperties: false`; this is the existing **P6** defect, not restated here [verified-from-schema: refrence/payload/operatingModePayload.yaml properties.operatingModes.properties.tagMetaDataToEnable]. This is a partial set: `operatingMode` is NOT in the command's `required` (`required: [command, requestId]`), so a metadata-only body validates [verified-from-schema: commands/control/set_operating_mode.json required + examples[7]]. The on-wire `requestId` was `abc123` (operator-supplied; the device echoed it) [verified-on-device: RFD40 serial 24190525100255].

#### RUN 1 — the operator payload (clean WRITE: declared flags applied as sent; merge preserved)

**The SET response (LIVE, verbatim).** The device returned [verified-on-device: RFD40 serial 24190525100255]:

```json
{"command":"set_operating_mode","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

This is a **CLEAN SUCCESS** — `response.code` is OMITTED (the envelope carries only `{description: "Success"}`); there is NO `code 101` [verified-on-device: RFD40 serial 24190525100255]. Validation verdict: **INVALID** against the response schema — `response.yaml` requires `[code, description]`, but the required `response.code` is MISSING — reconfirming the `get_operating_mode` **O1** / this doc's **P7** omit-`code`-on-success pattern for `set_operating_mode` [verified-from-schema: refrence/response/response.yaml required].

**Per-flag DIFF (BEFORE readback → submitted → AFTER readback), over CTRL** [verified-on-device: RFD40 serial 24190525100255]:

| Flag | Declared? | Before | Submit | After | Verdict |
| --- | --- | --- | --- | --- | --- |
| `RSSI` | declared | `true` | `true` | `true` | APPLIED as sent |
| `PHASE` | declared | `false` | `true` | `true` | APPLIED as sent (CHANGED `false → true`) |
| `SEENCOUNT` | declared | `true` | `true` | `true` | APPLIED as sent |
| `CHANNEL` | declared | `false` | `true` | `true` | APPLIED as sent (CHANGED `false → true`) |
| `PC` | declared | `false` | `false` | `false` | APPLIED as sent |
| `XPC` | UNDECLARED (**P6**) | `false` | `false` | `false` | UNINFORMATIVE — `false → false` cannot distinguish applied vs ignored |
| `CRC` | UNDECLARED (**P6**) | `false` | `true` | `false` | NOT applied (submitted `true`, returned `false`) — clean **P6** confirmation |
| `EPC` | declared | `false` | `true` | `true` | APPLIED as sent (CHANGED `false → true`) |
| `TID` | declared | `false` | `false` | `false` | APPLIED as sent |
| `USER` | declared | `false` | `false` | `false` | APPLIED as sent |
| `MAC` | declared | `false` | `false` | `false` | APPLIED as sent |
| `HOSTNAME` | declared | `false` | `false` | `false` | APPLIED as sent |

**AUTO-PROVISION OBSERVATION (RUN 1).** The BEFORE readback had `accessOperations` ABSENT; the AFTER readback had `accessOperations` containing a single generic READ op for the EPC bank [verified-on-device: RFD40 serial 24190525100255]. The only memory-bank metadata flag set `true` in this payload was `EPC`, and a READ EPC op is exactly what appeared [verified-on-device: RFD40 serial 24190525100255]. The RUN 1 AFTER `accessOperations` was (verbatim) [verified-on-device: RFD40 serial 24190525100255]:

```json
"accessOperations": [ { "operationType": "READ", "config": { "memoryBank": "EPC", "offset": 0, "length": 0 } } ]
```

#### RUN 2 — controlled AUTO-PROVISION probe (proves the EPC/TID/USER coupling causally; restores the operator state)

To turn the RUN 1 correlation into causation, a probe flipped the memory-bank metadata flags and watched `accessOperations` track them, then the operator's exact payload was re-sent to restore [verified-on-device: RFD40 serial 24190525100255]. Both the probe and the restore returned a clean `{description: "Success"}` with NO `response.code` [verified-on-device: RFD40 serial 24190525100255].

**SET probe response (`tagMetaData {… EPC=false, TID=true, USER=true …}`; LIVE, `response` body only)** [verified-on-device: RFD40 serial 24190525100255]:

```json
{"description":"Success"}
```

**SET restore response (the operator's EXACT payload — `EPC=true, TID=false, USER=false`, `requestId abc123`; LIVE, full envelope verbatim)** [verified-on-device: RFD40 serial 24190525100255]:

```json
{"command":"set_operating_mode","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

**RUN 2 auto-provision R0 → R1 → R2 (`get_operating_mode` `tagMetaData` + `accessOperations` readbacks over CTRL)** [verified-on-device: RFD40 serial 24190525100255]:

| Step | Action | `tagMetaData` (EPC/TID/USER) | `accessOperations` readback | Verdict |
| --- | --- | --- | --- | --- |
| R0 | baseline (operator end-state) | `EPC=true`, `TID=false`, `USER=false` | `[READ EPC {offset 0, length 0}]` | baseline — one READ op for the one enabled bank |
| R1 | after probe (`EPC=false`, `TID=true`, `USER=true`) | `EPC=false`, `TID=true`, `USER=true` | `[READ TID {offset 0, length 0}, READ USER {offset 0, length 0}]` | TRACKED — EPC op GONE; TID + USER ops APPEARED |
| R2 | after restore (operator's exact payload) | `EPC=true`, `TID=false`, `USER=false` | `[READ EPC {offset 0, length 0}]` | RESTORED — back to the operator end-state |

The R1 `accessOperations` was (verbatim) [verified-on-device: RFD40 serial 24190525100255]:

```json
"accessOperations": [ { "operationType": "READ", "config": { "memoryBank": "TID", "offset": 0, "length": 0 } },
                      { "operationType": "READ", "config": { "memoryBank": "USER", "offset": 0, "length": 0 } } ]
```

The controlled flip shows the generic READ `accessOperations` TRACK the memory-bank metadata flags 1:1 — enabling `EPC`/`TID`/`USER` metadata auto-provisions a generic READ `{offset 0, length 0}` op for that exact bank, and disabling it removes that op [verified-on-device: RFD40 serial 24190525100255]. This is causal, not mere correlation: the EPC op disappeared and the TID + USER ops appeared exactly as the flags were flipped, then reverted on restore [verified-on-device: RFD40 serial 24190525100255].

#### Findings

**N1 — DECLARED FLAGS WRITE.** All ten DECLARED metadata flags applied EXACTLY as sent, and three genuinely flipped `false → true` (`PHASE`, `CHANNEL`, `EPC`), so RUN 1 is a real WRITE, not an idempotent no-op [verified-on-device: RFD40 serial 24190525100255].

**N2 — UNDECLARED CRC NOT SETTABLE; XPC uninformative.** The undeclared `CRC` (**P6**) submitted `true` came back `false`, so it cannot be enabled — a clean confirmation of **P6** for `CRC` [verified-on-device: RFD40 serial 24190525100255]. The undeclared `XPC` submitted `false` stayed `false`, which is UNINFORMATIVE — because the value did not change, this run cannot distinguish "applied" from "ignored" for `XPC`; only `CRC`'s `true → false` confirms the undeclared-key-not-settable behavior this run [verified-on-device: RFD40 serial 24190525100255].

**N3 — AUTO-PROVISION (HEADLINE, proven causally).** Enabling a memory-bank tag-metadata flag (`EPC`/`TID`/`USER`) auto-creates a generic READ `{offset 0, length 0}` `accessOp` for that bank, and disabling it removes that op — proven by RUN 1 (the `EPC` flag produced a READ EPC op from an empty `accessOperations`) and by the RUN 2 controlled flip (`EPC → [READ EPC]`; `TID + USER → [READ TID, READ USER]`; back to `EPC → [READ EPC]`) [verified-on-device: RFD40 serial 24190525100255]. The four tag-read flags enabled `true` in RUN 1 (`RSSI`/`PHASE`/`SEENCOUNT`/`CHANNEL`) produced NO READ ops, confirming non-memory-bank flags do not provision access ops [verified-on-device: RFD40 serial 24190525100255]. The remaining `PC`/`MAC`/`HOSTNAME` flags were never enabled in these runs, so their behavior was not directly observed; because they are not members of `accessCmds.yaml config.memoryBank.enum` (`EPC`/`TID`/`USER`/`RESERVED`) they are not expected to provision READ ops [verified-from-schema: refrence/payload/accessCmds.yaml config.memoryBank.enum], and on that basis only the three memory-bank flags `EPC`/`TID`/`USER` drove READ-op provisioning [inferred-from-live]. The coupling is directly verified only for `EPC`/`TID`/`USER`; the schema's fourth memory bank `RESERVED` was not exercised and is not asserted here [verified-from-schema: refrence/payload/accessCmds.yaml config.memoryBank.enum].

**N4 — CLEAN SUCCESS, no code.** All three sets (RUN 1 operator + probe + restore) returned `{description: "Success"}` with NO `response.code` (O1 / **P7** reconfirmed; no `code 101`) [verified-on-device: RFD40 serial 24190525100255]. A `response` lacking `code` is INVALID against `response.yaml`'s `required [code, description]` [verified-from-schema: refrence/response/response.yaml required].

**N5 — MERGE preserved.** Across these `tagMetaData`-only sets the other aspects were preserved untouched — `profiles BALANCED_PERFORMANCE`, `query {SESSION_1, STATE_A, ALL, 30}`, `radioStartConditions {PRESSED, 5000, false}`, and `radioStopConditions {RELEASED, tagCount 10, stopTimeout 10000}` — reconfirming the aspect-granularity partial-set MERGE behavior [verified-on-device: RFD40 serial 24190525100255].

**N6 — REFINEMENT of §5 primary.** This auto-provisioning explains the §5 primary `ADVANCED` run's three generic READ ops (`EPC`/`TID`/`USER`, `offset 0`, `length 0`) as metadata-auto-provisioned by that run's `EPC`/`TID`/`USER` metadata flags (all `true` in that submit), not as remnants of its submitted access ops [verified-on-device: RFD40 serial 24190525100255]. That run's `MAC`/`HOSTNAME` metadata flags were also `true` but added no access ops, consistent with their being reader metadata rather than memory banks [verified-on-device: RFD40 serial 24190525100255]. See the corrected §5-primary Headline 2 and **P10** [verified-on-device: RFD40 serial 24190525100255].

**Resulting device state / safety.** The device now sits at `BALANCED_PERFORMANCE` with `tagMetaData` = the operator's values EXCEPT `CRC`, which could not be set `true` (**P6**), and a single auto-provisioned `accessOperations` entry `[READ EPC {offset 0, length 0}]` that is READ-only and benign — NO `WRITE`/`LOCK` is armed — while `query` and the radio conditions are preserved [verified-on-device: RFD40 serial 24190525100255]. It is **REVERSIBLE**: per the command description, "On reboot the set configurations will be lost and the device will go back to default operating mode" [verified-from-schema: commands/control/set_operating_mode.json description].

## 6. Associated Error Codes

| Code | Description | Provenance |
| --- | --- | --- |
| `101` | "Error in processing command" | **The only code observed live this session** — undocumented and out-of-range (exceeds `maximum 30`); see **P4** [verified-on-device: RFD40 serial 24190525100255] |
| `0` | Success | Schema-only — NOT observed this session [verified-from-schema: refrence/response/response.yaml code table] |
| `2` | Invalid payload | Schema-only [verified-from-schema: refrence/response/response.yaml code table] |
| `23` | Invalid enum value | Schema-only [verified-from-schema: refrence/response/response.yaml code table] |

Honesty: the only code returned live was `101` (an out-of-table code). The success-shaped codes (`0`/`2`/`23`) are schema-documented only — do NOT claim `code 0` was returned this session [verified-on-device: RFD40 serial 24190525100255].

## 7. Conformance & Spec Notes (this command)

**P1 — `accessCmds` password length rule vs example/payload.** `accessCmds.yaml` `config.password.description` says "exactly 8 hex characters (32 bits)", but the command schema's own example (and this payload) use a 4-hex-character password — half the stated 8-hex length. There is no `pattern`/`minLength` enforcing the rule, so it passes static validation, yet it violates the stated rule. IMPORTANTLY, it is NOT the cause of the `code-101` seen with the `ADVANCED` set — a later `accessOperations`-only test (§5 third worked example) showed the access ops with this 4-hex password SUCCEED and are STORED when sent alone, so **P1** is a schema-quality defect only, not a runtime blocker [verified-from-schema: refrence/payload/accessCmds.yaml config.password.description + verified-on-device: access ops succeed+stored standalone, RFD40 serial 24190525100255]. **Fix:** use a conforming 8-hex password, and/or add a pattern `^[0-9A-Fa-f]{8}$` to enforce it.

**P2 — `accessOperations` field-name inconsistency.** `accessCmds.yaml` and this command's examples use `operationType`, but `operatingModePayload.yaml`'s OWN example uses `type` for `accessOperations` entries [verified-from-schema: refrence/payload/operatingModePayload.yaml examples (accessOperations[].type, lines 15/66) vs refrence/payload/accessCmds.yaml items.operationType]. **Fix:** correct `operatingModePayload.yaml`'s example to `operationType`.

**P3 — `transmitPower` has no numeric bounds.** `advancedConfigurations.transmitPower` is `type: number` with no `minimum`/`maximum`; the example/payload value `300` was accepted and stored by the device (readback shows `300`) [verified-from-schema: operatingModePayload.yaml advancedConfigurations.transmitPower; verified-on-device: 300 stored]. **Fix:** document/clamp the valid `transmitPower` range and its units (300 is plausibly centi-dBm = 30.0 dBm).

**P4 — `code 101` is undocumented and out-of-range.** The device returned `response.code 101` "Error in processing command", which exceeds `response.yaml`'s `maximum 30` and is absent from the 0..30 code table — same class as `config_endpoint`'s H2 [verified-on-device: RFD40 serial 24190525100255 + verified-from-schema: refrence/response/response.yaml code maximum/table]. **Fix:** extend the code table/`maximum` to cover firmware codes like 101, and/or return a specific documented code.

**P5 (behavior) — partial apply on error.** The device returned an ERROR (`code 101`) yet applied most of the mode (profile / advancedConfigurations / query / radio / select) while silently dropping other parts of the payload (the WRITE/ACCESS/LOCK access ops; XPC/CRC metadata; the absent SEENCOUNT key; the dropped `inventoryCount`) — though the access-op drop was COLLATERAL of an undetermined error, not an inability to process those ops: the same WRITE/ACCESS/LOCK ops SUCCEED and STORE when sent alone (§5 third worked example) [verified-on-device: RFD40 serial 24190525100255 + inferred-from-live: access ops succeed+stored standalone]. A `code 101` from `set_operating_mode` therefore does NOT mean "nothing changed" — callers must read back to learn what actually applied [verified-on-device: RFD40 serial 24190525100255]. **Fix:** make `set_operating_mode` atomic (all-or-nothing), or return a structured per-field error rather than a single generic 101.

**P6 (schema) — `tagMetaDataToEnable` example uses keys absent from / inconsistent with the declared properties.** The `tagMetaDataToEnable.properties` block declares ONLY `RSSI`, `PHASE`, `SEENCOUNT`, `CHANNEL`, `PC`, `EPC`, `TID`, `USER`, `MAC`, `HOSTNAME` (operatingModePayload.yaml lines 189-229). However, the file's `examples` block (and this command's example/payload) use `XPC` and `CRC`, which are NOT declared properties, and the YAML example additionally uses `SEEN_COUNT` and `ANTENNA` — neither matching the declared `SEENCOUNT` property nor existing as a property at all (`ANTENNA` has no declaration) [verified-from-schema: refrence/payload/operatingModePayload.yaml properties.operatingModes.properties.tagMetaDataToEnable.properties (lines 189-229) vs examples (lines 47-52)]. This makes the schema example self-inconsistent with its own property list, and is a plausible schema-side contributor to why the submitted `XPC:true`/`CRC:true` came back FALSE on the device (they are not modeled property keys) [verified-on-device: RFD40 serial 24190525100255]. **Fix:** reconcile the example with the properties — either add `XPC`/`CRC` (and a properly named seen-count / antenna key) as declared properties, or remove the undeclared keys from the example and rename `SEEN_COUNT` to `SEENCOUNT`.

**P7 (behavior) — inconsistent `response.code` presence (success omits code, error includes it).** `set_operating_mode` (like `get_operating_mode`, the O1 finding) OMITS the required `response.code` on SUCCESS — the success envelope is `response { "description": "Success" }` only, which is INVALID against `response.yaml`'s `required [code, description]` — yet it INCLUDES a code on ERROR (the out-of-range `101` returned by the primary `ADVANCED` set, **P4**). So across these control commands a MISSING code signals success and a PRESENT code signals an error — the inverse of the `code 0 = success` convention documented in the response code table [verified-on-device: RFD40 serial 24190525100255 — minimal profile-only set success omitted `code`; `ADVANCED` set error returned `101` + verified-from-schema: refrence/response/response.yaml required [code, description] + code table (`0 = Success`)]. **Fix:** always emit `response.code` (e.g. `0` on success) so the success envelope conforms to the required `[code, description]` contract and callers can rely on a uniform success signal.

**P8 (schema) — `radioStartConditions` example uses an undeclared `periodicDuration` field.** `operatingModePayload.yaml`'s OWN examples (lines 20-24 and 71-75) place `periodicDuration: 0` INSIDE `radioStartConditions`, but `radioStartCondPayload.yaml` does NOT declare a `periodicDuration` property — it declares ONLY `trigger`, `startDelay`, and `repeat`. So the `operatingModePayload` example uses an UNDECLARED field for `radioStartConditions`. Because `radioStartCondPayload.yaml` has no `additionalProperties: false`, the undeclared key is not statically REJECTED, but it is an example-vs-declaration inconsistency — the same family as `get_operating_mode`'s **O6** (response-example `periodicDuration` undeclared). Our radio-conditions-only payload (§5 fourth worked example) does NOT use `periodicDuration`, and the device readback did NOT include it [verified-from-schema: refrence/payload/radioStartCondPayload.yaml properties vs refrence/payload/operatingModePayload.yaml examples (lines 20-24/71-75)] [verified-on-device: RFD40 serial 24190525100255]. **Fix:** either declare `periodicDuration` in `radioStartCondPayload.yaml`, or remove it from the `operatingModePayload` example.

**P9 (schema) — `query` field-naming / description divergence.** Two related inconsistencies affect the `query` aspect. (a) `queryPayload.yaml`'s property DESCRIPTIONS mislabel the fields: `inventoryState` is described as "Target field (see EPC Gen2 Spec)" and `slFlag` is described as "Sel field (see EPC Gen2 Spec)" — the descriptions use the Gen2-spec labels Target/Sel while the property NAMES are `inventoryState`/`slFlag` [verified-from-schema: refrence/payload/queryPayload.yaml properties (inventoryState/slFlag descriptions)]. (b) `operatingModePayload.yaml`'s OWN `query` example (lines 30-34 and 81-85) uses `sel: ALL`, `target: A`, `session: S0`, `tagPopulation: 0` — i.e. it uses `sel`/`target` (NOT the declared `slFlag`/`inventoryState`) and `S0` (NOT in the `session` enum `[SESSION_0..SESSION_3]`), so that example is inconsistent with the `queryPayload.yaml` declaration [verified-from-schema: refrence/payload/operatingModePayload.yaml examples (lines 30-34/81-85)]. The device readback uses the DECLARED names (`session`/`inventoryState`/`slFlag`/`tagPopulation`), so the command-schema example and the `queryPayload` declaration are the correct on-wire form and the `operatingModePayload` example is the outlier [verified-on-device: RFD40 serial 24190525100255]. Because `queryPayload.yaml` has no `additionalProperties: false`, the divergent example keys are not statically REJECTED, but this is an example-vs-declaration inconsistency — the same family as `get_operating_mode`'s **O4** (query payload-example `sel`/`target`/`S0` wrong vs `queryPayload.yaml`) [verified-from-schema: refrence/payload/queryPayload.yaml properties]. **Fix:** align the `operatingModePayload` example to the declared property names (`session`/`inventoryState`/`slFlag`) and a valid `session` enum value, and reword the `queryPayload` descriptions so the label matches the property name.

**P10 (behavior) — memory-bank `tagMetaDataToEnable` flags AUTO-PROVISION generic READ `accessOperations`.** Enabling a memory-bank tag-metadata flag (`EPC`/`TID`/`USER`) causes the device to auto-create a generic READ `{offset 0, length 0}` `accessOp` for that exact bank, and disabling the flag removes that op [verified-on-device: RFD40 serial 24190525100255]. This was proven causally by the §5 sixth worked example: RUN 1 produced a `[READ EPC]` op from a previously-ABSENT `accessOperations` after enabling `EPC` as the only memory-bank metadata flag set `true`, and the RUN 2 controlled flip showed the ops track the flags 1:1 (`EPC → [READ EPC]`; `TID + USER → [READ TID, READ USER]`; back to `EPC → [READ EPC]`) [verified-on-device: RFD40 serial 24190525100255]. The four tag-read flags enabled `true` in RUN 1 (`RSSI`/`PHASE`/`SEENCOUNT`/`CHANNEL`) created no READ ops, confirming non-memory-bank flags do not provision access ops [verified-on-device: RFD40 serial 24190525100255]. The remaining `PC`/`MAC`/`HOSTNAME` flags were never enabled in these runs; because they are not members of `accessCmds.yaml config.memoryBank.enum` (`EPC`/`TID`/`USER`/`RESERVED`) they are not expected to provision READ ops [verified-from-schema: refrence/payload/accessCmds.yaml config.memoryBank.enum], and on that basis only the three memory-bank flags drove READ-op provisioning [inferred-from-live]. The coupling is directly verified for `EPC`/`TID`/`USER` only; the schema's fourth memory bank `RESERVED` was not exercised and the behavior is not asserted for it [verified-from-schema: refrence/payload/accessCmds.yaml config.memoryBank.enum]. This is benign (the auto-provisioned ops are READ-only, `offset 0`/`length 0` — no `WRITE`/`LOCK` is armed), but it explains why a metadata-only set can change a caller's `accessOperations`, and it is the mechanism behind the §5 primary `ADVANCED` run's three generic READ ops (see the corrected §5-primary Headline 2) [verified-on-device: RFD40 serial 24190525100255]. **Fix:** document this metadata→READ-op coupling so callers reading back `accessOperations` understand the generic `{offset 0, length 0}` reads are auto-generated from the enabled memory-bank metadata flags, not stored operator-submitted ops.

**POSITIVE (not defects).** The command schema is well-formed: `command` has `enum ["set_operating_mode"]` and a top-level `examples` array; the response schema declares the full `required [command, requestId, apiVersion, response]` with the correct title `set_operating_mode_response`. `operatingMode` is NOT in the command's `required`, so partial sets are allowed (the schema ships single-aspect examples) [verified-from-schema: commands/control/set_operating_mode.json + response/control/set_operating_mode.json].

## 8. Safety / operational note — state-changing reader reconfiguration

`set_operating_mode` is a state-changing CONTROL command, but the change is **REVERSIBLE**: a reboot restores the default operating mode (per the command description), or you can re-send `set_operating_mode {profiles: BALANCED_PERFORMANCE}` to revert [verified-from-schema: commands/control/set_operating_mode.json description; verified-on-device: RFD40 serial 24190525100255]. The primary run moved the device from `BALANCED_PERFORMANCE` to `ADVANCED`; a follow-up minimal profile-only set (§5, second worked example) then reverted it back to `BALANCED_PERFORMANCE`, which is the device's current profile [verified-on-device: RFD40 serial 24190525100255].

The destructive `WRITE`/`LOCK` access ops were NOT applied this run, so no tag-modification was armed — the safety-relevant outcome [verified-on-device: RFD40 serial 24190525100255]. CONTROL routing requires an active CTRL endpoint, which was active this session [verified-from-test-harness: CTRL_EP active]. The send was user-confirmed beforehand, and it was config-only (no inventory was started) [verified-on-device: RFD40 serial 24190525100255]. CTRL_EP also remains active from the prior turn [verified-from-test-harness: CTRL_EP active].

Tag-access passwords are sensitive Gen2 credentials and MUST be masked as `********` wherever the request is documented; the live readback contained no passwords (only the 3 default READ ops were stored) [verified-on-device: RFD40 serial 24190525100255]. No broker/Wi-Fi credentials are involved in this command.