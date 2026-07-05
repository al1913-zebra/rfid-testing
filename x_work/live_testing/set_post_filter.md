# Command: set_post_filter

## 1. Intent & Objective

`set_post_filter` sets, updates, or removes a post-filter on the device — a rule that filters scanned RFID tag DATA before it is reported over a data endpoint, either including or excluding tags whose ID matches a pattern [verified-from-schema: commands/control/set_post_filter.json description]. The filter behavior — match a scanned tag-data pattern and either include or exclude it from reporting — is described on the payload's `reportOperation` field [verified-from-schema: refrence/payload/postFilterPayload.yaml reportOperation.description]. It is a **CONTROL-plane** command: it routes over CTRL and requires an active CTRL endpoint, the same control-plane routing rule established for `get_operating_mode`, `set_operating_mode`, and `get_post_filter` [verified-on-device: RFD40 serial 24190525100255].

It is **state-changing but REVERSIBLE**: an `ADD` installs a filter and an `operation: DELETE` removes it, so the change can be undone [verified-from-schema: refrence/payload/postFilterPayload.yaml operation.enum]. This session a `DATA_EP1` PREFIX/INCLUDE filter was added and then deleted, restoring the device to its no-filter baseline [verified-on-device: RFD40 serial 24190525100255]. The command carries no destructive tag operations — it only governs which scanned tag data is reported [verified-from-schema: refrence/payload/postFilterPayload.yaml reportOperation.description].

## 2. Topic Mapping (observed on-wire)

`set_post_filter` is a **CONTROL command** and its on-wire routing was exercised this session [verified-on-device: RFD40 serial 24190525100255]:

| Direction | Topic (wire form `{tenantId}/{baseTopic}/{serial}`) | Concrete topic this session |
| --- | --- | --- |
| Request (publish) | `zebra/CTRL/clients/cmnd/<serial>` | `zebra/CTRL/clients/cmnd/RFD40-24190525100255` |
| Response (subscribe) | `zebra/CTRL/clients/resp/<serial>` | `zebra/CTRL/clients/resp/RFD40-24190525100255` |

Routing notes:

- **Answered over CTRL.** Each request published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` was answered on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. This is the same control-plane routing as `get_operating_mode`, `set_operating_mode`, and `get_post_filter` [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].
- **Requires an active CTRL endpoint.** This session the device had three active endpoints `[MDM_REMOTE, CTRL_EP, DATA1_EP]`, so the CTRL endpoint was active and able to answer [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The command was answered over CTRL with that endpoint active [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

Top-level command fields:

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | `enum ["set_post_filter"]` — fixed command name | [verified-from-schema: commands/control/set_post_filter.json properties.command] |
| `requestId` | string | yes | unique identifier used to correlate the response | [verified-from-schema: commands/control/set_post_filter.json properties.requestId] |
| `postFilterPayload` | object | **no** | `$ref refrence/payload/postFilterPayload.yaml`; NOT in `required` (see **S4**) | [verified-from-schema: commands/control/set_post_filter.json properties.postFilterPayload] |

The command's top-level `required` array is `[command, requestId]`, so `postFilterPayload` is not statically required (see **S4**) [verified-from-schema: commands/control/set_post_filter.json required]. The command schema ships three examples, all with `dataEpType: "DATA_EP1"` — an ADD/PREFIX `FFFFBBBBA500`/INCLUDE, an ADD/REGEX `E280`/EXCLUDE, and an ADD/SUFFIX `BBBBEEEE`/INCLUDE [verified-from-schema: commands/control/set_post_filter.json examples].

`postFilterPayload` fields [verified-from-schema: refrence/payload/postFilterPayload.yaml properties]:

| Field | Type | Constraint / Notes | Locus |
| --- | --- | --- | --- |
| `operation` | string | `enum [ADD, DELETE, MODIFY]` | [verified-from-schema: refrence/payload/postFilterPayload.yaml operation.enum] |
| `dataEpType` | string | `enum [DATA_EP1, DATA_EP2]` — the data-endpoint TYPE the filter binds to (see **S1**) | [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum] |
| `matchPattern` | string | NO `pattern`/`enum`; description: for PREFIX/SUFFIX use hex digits only, even count; a PREFIX filter precludes select filters (see **S2**) | [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description] |
| `matchPatternMethod` | string | `enum [PREFIX, SUFFIX, REGEX]` | [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPatternMethod.enum] |
| `reportOperation` | string | `enum [INCLUDE, EXCLUDE]` | [verified-from-schema: refrence/payload/postFilterPayload.yaml reportOperation.enum] |

### JSON Request Example (operator-provided)

```json
{
  "command": "set_post_filter",
  "requestId": "abc123",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA1_EP",
    "matchPattern": "FFFFBBBBA500",
    "matchPatternMethod": "PREFIX",
    "reportOperation": "INCLUDE"
  }
}
```

Static verdict: **INVALID** — the `dataEpType` value `"DATA1_EP"` is OUT OF the declared enum `[DATA_EP1, DATA_EP2]` [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. `"DATA1_EP"` is the data ENDPOINT NAME (epType `DATA1`) created earlier via `config_endpoint`, NOT a valid `dataEpType` enum value — the valid value is `"DATA_EP1"` [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. This is a name/enum mix-up: the `postFilter` `dataEpType` enum value differs from the data endpoint's name (see **S1**) [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. The device confirmed the static verdict by rejecting this payload with `response.code 23` "Invalid enum value" (see Section 5) [verified-on-device: RFD40 serial 24190525100255]. Aside from `dataEpType`, the remaining fields satisfy their constraints — `operation ADD`, `matchPatternMethod PREFIX`, and `reportOperation INCLUDE` are all in their enums, and `matchPattern "FFFFBBBBA500"` is 12 hex digits (even count), satisfying the PREFIX/SUFFIX hex rule [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description].

## 4. Response Payload Breakdown

The response is a **status-only** envelope — there is NO `postFilterPayload` echo, unlike the getter `get_post_filter` [verified-from-schema: response/control/set_post_filter.json properties]:

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | echoes `set_post_filter` | [verified-from-schema: response/control/set_post_filter.json properties.command] |
| `requestId` | string | yes | echoes the request's `requestId` | [verified-from-schema: response/control/set_post_filter.json properties.requestId] |
| `apiVersion` | string | yes | `enum [V1.0, V1.1]` | [verified-from-schema: response/control/set_post_filter.json properties.apiVersion.enum] |
| `response` | object | yes | `$ref refrence/response/response.yaml` (separately requires `{code, description}`) | [verified-from-schema: response/control/set_post_filter.json properties.response] |

The response schema is titled `set_post_filter_response` and declares the FULL top-level `required [command, requestId, apiVersion, response]` — a POSITIVE, in contrast to `get_post_filter`, which declares no top-level `required` (see **S3**) [verified-from-schema: response/control/set_post_filter.json required]. The referenced `response.yaml` separately declares `required [code, description]` [verified-from-schema: refrence/response/response.yaml required]. The response schema's example carries `apiVersion "V1.1"` and `response {code: 0, description: "Success"}` [verified-from-schema: response/control/set_post_filter.json examples].

### JSON Response Example (LIVE, verbatim — ERROR, out-of-enum `dataEpType`)

```json
{"command":"set_post_filter","requestId":"abc123","apiVersion":"V1.1","response":{"code":23,"description":"Invalid enum value"}}
```

The exact operator payload (with out-of-enum `dataEpType "DATA1_EP"`) was REJECTED with `response.code 23` "Invalid enum value" — a documented, in-range (0..30) code that was PRESENT in the error response [verified-on-device: RFD40 serial 24190525100255]. The `requestId abc123` was echoed [verified-on-device: RFD40 serial 24190525100255].

### JSON Response Example (LIVE, verbatim — SUCCESS, corrected `dataEpType`)

```json
{"command":"set_post_filter","requestId":"abc125","apiVersion":"V1.1","response":{"description":"Success"}}
```

The corrected payload (with `dataEpType "DATA_EP1"`, `requestId abc125`) returned `{"description":"Success"}` with the `response.code` OMITTED — only `description` was present [verified-on-device: RFD40 serial 24190525100255]. That success `response` object is INVALID against `response.yaml`'s `required [code, description]` because `code` is missing (see **S3**) [verified-from-schema: refrence/response/response.yaml required]. So within this one command the error path includes `response.code` (23) while the success path omits it [verified-on-device: RFD40 serial 24190525100255].

## 5. Live Verification

ENVIRONMENT / VERDICT: the command was exercised against the RFD40 over the CTRL plane with `CTRL_EP` active [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. Verdict: **LIVE** [verified-on-device: RFD40 serial 24190525100255]. As a state-changing command its effect was added, verified by readback, and then deleted to leave no residue [verified-on-device: RFD40 serial 24190525100255].

On-wire sequence (B..H):

- **B — baseline `get_post_filter`.** Before the set, `get_post_filter` (`requestId g-before`) returned `{command, requestId, apiVersion "V1.1", response{description:"Success"}}` with NO `postFilterPayload` — an empty baseline [verified-on-device: RFD40 serial 24190525100255].
- **C — SET exact operator payload (out-of-enum).** The exact operator payload with `dataEpType "DATA1_EP"` (`requestId abc123`) returned `{...,"response":{"code":23,"description":"Invalid enum value"}}` — REJECTED with the documented in-range code 23, which was present in the error response [verified-on-device: RFD40 serial 24190525100255].
- **D — `get_post_filter` after the exact set.** A readback returned no `postFilterPayload`, confirming the rejected filter was NOT stored [verified-on-device: RFD40 serial 24190525100255].
- **E — SET corrected payload.** The corrected payload with `dataEpType "DATA_EP1"` (`requestId abc125`) returned `{...,"response":{"description":"Success"}}` — SUCCESS, with `response.code` OMITTED [verified-on-device: RFD40 serial 24190525100255].
- **F — `get_post_filter` after the corrected set.** A readback (`requestId g-after_corrected`) returned `postFilterPayload {postFilter:[{dataEpType:"DATA_EP1", matchPattern:"FFFFBBBBA500", matchPatternMethod:"PREFIX", reportOperation:"INCLUDE"}]}` alongside `response{description:"Success"}` — the filter was stored exactly as sent [verified-on-device: RFD40 serial 24190525100255]. This is the first LIVE populated `get_post_filter` response observed this session [verified-on-device: RFD40 serial 24190525100255].
- **G — DELETE.** An `operation DELETE` with matching params and `dataEpType DATA_EP1` (`requestId del-0`) returned `{...,"response":{"description":"Success"}}`, with `response.code` omitted [verified-on-device: RFD40 serial 24190525100255].
- **H — final `get_post_filter`.** The final readback returned no `postFilterPayload`, confirming cleanup — the device was restored to its no-filter state [verified-on-device: RFD40 serial 24190525100255].

Findings:

- **L1 — CONTROL routing.** `set_post_filter` was answered over CTRL (request on `cmnd`, response on `resp`) and required the active CTRL endpoint — the same control-plane rule as `get_operating_mode`, `set_operating_mode`, and `get_post_filter` [verified-on-device: RFD40 serial 24190525100255].
- **L2 — OUT-OF-ENUM `dataEpType` rejected with code 23.** The operator payload's `dataEpType "DATA1_EP"` (not in `enum [DATA_EP1, DATA_EP2]`) was rejected with `response.code 23` "Invalid enum value", which was present in the error response [verified-on-device: RFD40 serial 24190525100255]. Code 23 is a documented, in-range (0..30) code defined in the response schema [verified-from-schema: refrence/response/response.yaml code 23]. By contrast with `set_operating_mode`'s undocumented out-of-range 101 for its errors (**P4**), this is the first documented in-range error code observed live this session [inferred-from-live: cross-doc comparison with set_operating_mode P4; not re-verified on the wire this session].
- **L3 — SUCCESS omits `code`, ERROR includes it.** The corrected `DATA_EP1` set returned `{description:"Success"}` with NO `response.code`, while the rejected set returned `code 23`, so within one command success omits `code` and error includes it [verified-on-device: RFD40 serial 24190525100255]. This is the same omit-`code`-on-success pattern documented as `get_operating_mode` **O1** and `set_operating_mode` **P7** [inferred-from-live: cross-doc comparison with get_operating_mode O1 / set_operating_mode P7]. The success response is INVALID against `response.yaml`'s `required [code, description]` [verified-from-schema: refrence/response/response.yaml required].
- **L4 — filter stored exactly + populated `get_post_filter`.** After the corrected set, a `get_post_filter` readback returned `postFilterPayload {postFilter:[{DATA_EP1, FFFFBBBBA500, PREFIX, INCLUDE}]}`, so the filter was stored verbatim [verified-on-device: RFD40 serial 24190525100255]. This is the first LIVE populated `get_post_filter` response and closes the coverage gap noted in `get_post_filter.md` [verified-on-device: RFD40 serial 24190525100255].
- **L5 — ADD → verify → DELETE lifecycle + cleanup.** The `operation DELETE` (matching params) succeeded and the final `get_post_filter` returned no `postFilterPayload`, so the device was restored to the no-filter state and the test left no residual filter [verified-on-device: RFD40 serial 24190525100255].
- **L6 — `requestId` echoed on every send.** The device echoed `abc123` on the rejected set, `abc125` on the corrected set, `del-0` on the delete, and `g-before` / `g-after_corrected` on the two named gets [verified-on-device: RFD40 serial 24190525100255].

ADD / verify / DELETE lifecycle:

| Step | Command | `requestId` | Key request fields | Live response (`response` object) | Effect |
| --- | --- | --- | --- | --- | --- |
| B | `get_post_filter` | `g-before` | — | `{description:"Success"}`, no `postFilterPayload` | empty baseline [verified-on-device: RFD40 serial 24190525100255] |
| C | `set_post_filter` | `abc123` | ADD, `DATA1_EP`, PREFIX `FFFFBBBBA500`, INCLUDE | `{code:23, description:"Invalid enum value"}` | REJECTED (out-of-enum) [verified-on-device: RFD40 serial 24190525100255] |
| D | `get_post_filter` | (readback) | — | no `postFilterPayload` | rejected filter NOT stored [verified-on-device: RFD40 serial 24190525100255] |
| E | `set_post_filter` | `abc125` | ADD, `DATA_EP1`, PREFIX `FFFFBBBBA500`, INCLUDE | `{description:"Success"}` (no `code`) | filter added [verified-on-device: RFD40 serial 24190525100255] |
| F | `get_post_filter` | `g-after_corrected` | — | `postFilter:[{DATA_EP1, FFFFBBBBA500, PREFIX, INCLUDE}]`, `{description:"Success"}` | stored verbatim [verified-on-device: RFD40 serial 24190525100255] |
| G | `set_post_filter` | `del-0` | DELETE, `DATA_EP1`, matching params | `{description:"Success"}` (no `code`) | filter removed [verified-on-device: RFD40 serial 24190525100255] |
| H | `get_post_filter` | (readback) | — | no `postFilterPayload` | cleanup confirmed [verified-on-device: RFD40 serial 24190525100255] |

Cleanup confirmation: the final `get_post_filter` returned no `postFilterPayload`, so the device was left in its original no-filter state and the exercise left no residual configuration [verified-on-device: RFD40 serial 24190525100255].

### Second worked example — SUFFIX filter (`BBBBEEEE`)

This is a **confirmatory SUFFIX variant** of the first (PREFIX) worked example above; only `matchPatternMethod SUFFIX` (with `reportOperation INCLUDE`, `dataEpType DATA_EP1`) is newly exercised, and the shared findings (**L1**–**L6**, **S1**–**S5**) are cross-referenced rather than restated [inferred-from-live: cross-example comparison with the first PREFIX worked example]. The operator payload matches the command schema's third example (ADD/SUFFIX/`BBBBEEEE`/INCLUDE) except for `dataEpType` [verified-from-schema: commands/control/set_post_filter.json examples].

Operator payload:

```json
{
  "command": "set_post_filter",
  "requestId": "abc123",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA1_EP",
    "matchPattern": "BBBBEEEE",
    "matchPatternMethod": "SUFFIX",
    "reportOperation": "INCLUDE"
  }
}
```

Static verdict: **INVALID** — the `dataEpType` value `"DATA1_EP"` is OUT OF the declared enum `[DATA_EP1, DATA_EP2]`, the same name/enum trap as the first example (see **S1**) [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. Aside from `dataEpType`, the remaining fields are in-enum — `operation ADD`, `matchPatternMethod SUFFIX`, and `reportOperation INCLUDE` are all in their enums [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPatternMethod.enum]. The `matchPattern "BBBBEEEE"` is 8 hex digits (even count), satisfying the PREFIX/SUFFIX hex rule (see **S2**) [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description]. The device confirmed the verdict by rejecting the exact payload with `response.code 23` "Invalid enum value" [verified-on-device: RFD40 serial 24190525100255].

LIVE responses (verbatim):

```json
{"command":"set_post_filter","requestId":"abc123","apiVersion":"V1.1","response":{"code":23,"description":"Invalid enum value"}}
```

```json
{"command":"set_post_filter","requestId":"abc126","apiVersion":"V1.1","response":{"description":"Success"}}
```

```json
{"command":"get_post_filter","requestId":"g-after_corrected","apiVersion":"V1.1","postFilterPayload":{"postFilter":[{"dataEpType":"DATA_EP1","matchPattern":"BBBBEEEE","matchPatternMethod":"SUFFIX","reportOperation":"INCLUDE"}]},"response":{"description":"Success"}}
```

SUFFIX ADD / verify / DELETE lifecycle:

| Step | Command | `requestId` | Key request fields | Live response (`response` object) | Effect |
| --- | --- | --- | --- | --- | --- |
| B | `get_post_filter` | `g-before` | — | `{description:"Success"}`, no `postFilterPayload` | empty baseline [verified-on-device: RFD40 serial 24190525100255] |
| C | `set_post_filter` | `abc123` | ADD, `DATA1_EP`, SUFFIX `BBBBEEEE`, INCLUDE | `{code:23, description:"Invalid enum value"}` | REJECTED (out-of-enum) [verified-on-device: RFD40 serial 24190525100255] |
| D | `get_post_filter` | (readback) | — | no `postFilterPayload` | rejected filter NOT stored [verified-on-device: RFD40 serial 24190525100255] |
| E | `set_post_filter` | `abc126` | ADD, `DATA_EP1`, SUFFIX `BBBBEEEE`, INCLUDE | `{description:"Success"}` (no `code`) | filter added [verified-on-device: RFD40 serial 24190525100255] |
| F | `get_post_filter` | `g-after_corrected` | — | `postFilter:[{DATA_EP1, BBBBEEEE, SUFFIX, INCLUDE}]`, `{description:"Success"}` | stored verbatim [verified-on-device: RFD40 serial 24190525100255] |
| G | `set_post_filter` | `del-0` | DELETE, `DATA_EP1`, matching params | `{description:"Success"}` (no `code`) | filter removed [verified-on-device: RFD40 serial 24190525100255] |
| H | `get_post_filter` | (readback) | — | no `postFilterPayload` | cleanup confirmed [verified-on-device: RFD40 serial 24190525100255] |

Findings (confirmatory; see **L1**–**L6** / **S1**–**S3** for the shared detail):

- **SUFFIX exercised live.** `matchPatternMethod SUFFIX` with `matchPattern "BBBBEEEE"` was accepted on the corrected set and stored verbatim [verified-on-device: RFD40 serial 24190525100255]. This closes the SUFFIX part of the first example's coverage gap [inferred-from-live: cross-example comparison with the first PREFIX worked example].
- **Enum rejection is method-independent.** The out-of-enum `dataEpType "DATA1_EP"` with `matchPatternMethod SUFFIX` was rejected with `code 23` [verified-on-device: RFD40 serial 24190525100255]. Combined with the PREFIX example's identical code-23 rejection, this indicates code 23 keys off `dataEpType` rather than `matchPatternMethod` [inferred-from-live: cross-example comparison with the first PREFIX worked example].
- **Same success-omits-`code` / error-includes-`code` pattern (cross-ref **L3**).** The corrected SUFFIX set returned `{description:"Success"}` with no `code` while the exact set returned `code 23` [verified-on-device: RFD40 serial 24190525100255].
- **Full ADD → verify → DELETE lifecycle + cleanup (cross-ref **L5**).** The SUFFIX filter was added, read back, deleted, and the final readback returned no `postFilterPayload`, restoring the device to its no-filter state [verified-on-device: RFD40 serial 24190525100255].

### Third worked example — REGEX filter (`E280`, EXCLUDE)

This is a **confirmatory REGEX/EXCLUDE variant** of the first (PREFIX) and second (SUFFIX) worked examples above; only `matchPatternMethod REGEX` and `reportOperation EXCLUDE` (with `dataEpType DATA_EP1`) are newly exercised, and the shared findings (**L1**–**L6**, **S1**–**S5**) are cross-referenced rather than restated [inferred-from-live: cross-example comparison with the PREFIX/SUFFIX worked examples]. Unlike the prior two examples, this operator payload uses the in-enum `dataEpType "DATA_EP1"` and so matches the command schema's second example (ADD/`DATA_EP1`/`E280`/REGEX/EXCLUDE) exactly [verified-from-schema: commands/control/set_post_filter.json examples[1]].

Operator payload:

```json
{
  "command": "set_post_filter",
  "requestId": "abc123",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA_EP1",
    "matchPattern": "E280",
    "matchPatternMethod": "REGEX",
    "reportOperation": "EXCLUDE"
  }
}
```

Static verdict: **VALID** — `operation ADD`, `dataEpType DATA_EP1`, `matchPatternMethod REGEX`, and `reportOperation EXCLUDE` are each in their declared enums [verified-from-schema: refrence/payload/postFilterPayload.yaml properties]. Because `dataEpType` is the enum value `"DATA_EP1"` (in enum, not an endpoint name), this payload avoids the **S1** name/enum trap [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. The "hexadecimal digits only, even count" `matchPattern` rule is scoped to prefix and suffix filters, so it does NOT apply to the REGEX `matchPattern "E280"` [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description]. This is the first worked example using REGEX, where that hex constraint is not relevant [inferred-from-live: cross-example comparison with the PREFIX/SUFFIX worked examples]. The device confirmed the verdict by ACCEPTING the EXACT operator payload with success and NO `code 23` [verified-on-device: RFD40 serial 24190525100255]. This contrasts with the prior two turns' code-23 rejection of the out-of-enum `DATA1_EP` (see **L2**) [inferred-from-live: cross-example comparison with the PREFIX/SUFFIX worked examples].

LIVE responses (verbatim):

```json
{"command":"set_post_filter","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

```json
{"command":"get_post_filter","requestId":"g-after_set","apiVersion":"V1.1","postFilterPayload":{"postFilter":[{"dataEpType":"DATA_EP1","matchPattern":"E280","matchPatternMethod":"REGEX","reportOperation":"EXCLUDE"}]},"response":{"description":"Success"}}
```

REGEX/EXCLUDE ADD / verify / DELETE lifecycle:

| Step | Command | `requestId` | Key request fields | Live response (`response` object) | Effect |
| --- | --- | --- | --- | --- | --- |
| B | `get_post_filter` | `g-before` | — | `{description:"Success"}`, no `postFilterPayload` | empty baseline [verified-on-device: RFD40 serial 24190525100255] |
| C | `set_post_filter` | `abc123` | ADD, `DATA_EP1`, REGEX `E280`, EXCLUDE | `{description:"Success"}` (no `code`) | EXACT payload accepted, filter added [verified-on-device: RFD40 serial 24190525100255] |
| D | `get_post_filter` | `g-after_set` | — | `postFilter:[{DATA_EP1, E280, REGEX, EXCLUDE}]`, `{description:"Success"}` | stored verbatim [verified-on-device: RFD40 serial 24190525100255] |
| E | `set_post_filter` | `del-0` | DELETE, `DATA_EP1`, matching params | `{description:"Success"}` (no `code`) | filter removed [verified-on-device: RFD40 serial 24190525100255] |
| F | `get_post_filter` | `g-final` | — | no `postFilterPayload` | cleanup confirmed [verified-on-device: RFD40 serial 24190525100255] |

Findings (confirmatory; see **L1**–**L6** / **S1**–**S5** for the shared detail):

- **REGEX + EXCLUDE exercised live.** `matchPatternMethod REGEX` with `matchPattern "E280"` and `reportOperation EXCLUDE` were accepted and stored verbatim [verified-on-device: RFD40 serial 24190525100255]. This closes the REGEX and EXCLUDE parts of the prior examples' coverage gap [inferred-from-live: cross-example comparison with the PREFIX/SUFFIX worked examples].
- **EXACT operator payload ACCEPTED (valid `dataEpType`).** Because this payload used the in-enum `dataEpType "DATA_EP1"`, the unmodified operator payload was accepted with success and NO `code 23` [verified-on-device: RFD40 serial 24190525100255]. Combined with the first two turns' code-23 rejection of the out-of-enum `"DATA1_EP"`, this confirms the **S1** name/enum trap is avoided by sending the enum value `DATA_EP1` [inferred-from-live: cross-example comparison with the PREFIX/SUFFIX worked examples].
- **REGEX `matchPattern` is free-form (hex-even rule N/A).** The "hex only, even count" `matchPattern` rule applies to prefix and suffix filters only, not REGEX [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description]. The pattern `"E280"` was accepted and stored verbatim as a REGEX `matchPattern` [verified-on-device: RFD40 serial 24190525100255].
- **Same success-omits-`code` pattern (cross-ref **L3**).** The set and the delete both returned `{description:"Success"}` with no `code` [verified-on-device: RFD40 serial 24190525100255].
- **Full ADD → verify → DELETE lifecycle + cleanup (cross-ref **L5**).** The REGEX/EXCLUDE filter was added, read back, deleted, and the final readback returned no `postFilterPayload`, restoring the device to its no-filter state [verified-on-device: RFD40 serial 24190525100255].

Coverage note: ADD was exercised live across all three worked examples — PREFIX/INCLUDE (first), SUFFIX/INCLUDE (second), and REGEX/EXCLUDE (third), all with `dataEpType DATA_EP1`, plus DELETE, so all three `matchPatternMethod` values (PREFIX, SUFFIX, REGEX) and both `reportOperation` values (INCLUDE, EXCLUDE) are now exercised [verified-on-device: RFD40 serial 24190525100255]. Still NOT exercised and remaining schema-only: `operation MODIFY`, `dataEpType DATA_EP2`, and the >32-prefilter limit (code 24) [verified-from-schema: refrence/payload/postFilterPayload.yaml properties].

## 6. Associated Error Codes

This command returned the documented in-range code **23** on the error path and OMITTED the code on the success path this session (see **L2**, **L3**) [verified-on-device: RFD40 serial 24190525100255].

Codes relevant to a post-filter set [verified-from-schema: refrence/response/response.yaml code table]:

| Code | Meaning | Provenance |
| --- | --- | --- |
| 23 | Invalid enum value | [verified-on-device: RFD40 serial 24190525100255] |
| 0 | Success | [verified-from-schema: response/control/set_post_filter.json examples (response.code 0)] |
| 24 | Max 32 prefilters limit exceeded | [verified-from-schema: refrence/response/response.yaml code 24] |

Honesty notes: code `23` was OBSERVED LIVE in the error response to the out-of-enum `dataEpType` [verified-on-device: RFD40 serial 24190525100255]. Code `0` appears in the response schema's example, but the live success OMITTED `code` entirely, so do not claim code 0 was returned on the wire [verified-on-device: RFD40 serial 24190525100255]. Code `24` "Max 32 prefilters limit exceeded" is a hypothesis for an attempt to add more than 32 prefilters and was NOT exercised this session [verified-from-schema: refrence/response/response.yaml code 24]. Codes `25`/`26` (topic-overflow) are not relevant to a post-filter set [verified-from-schema: refrence/response/response.yaml code table]. Documented-code contrast: the in-range code 23 returned here differs from `set_operating_mode`'s undocumented out-of-range 101 for its error path (**P4**) [inferred-from-live: cross-doc comparison with set_operating_mode P4; not re-verified on the wire this session].

## 7. Conformance & Spec Notes (this command)

- **S1 — `dataEpType` NAME-vs-ENUM trap.** The `postFilter` `dataEpType` enum is `[DATA_EP1, DATA_EP2]`, but the data ENDPOINT added via `config_endpoint` is NAMED `"DATA1_EP"` (epType `DATA1`) [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. Sending the endpoint name `"DATA1_EP"` as `dataEpType` is an enum violation and the device rejected it with code 23 [verified-on-device: RFD40 serial 24190525100255]. Callers must use the `dataEpType` enum value (`DATA_EP1`/`DATA_EP2`), NOT the endpoint name [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum]. Fix: document the mapping between `dataEpType` enum values and data endpoints, or align the names [verified-from-schema: refrence/payload/postFilterPayload.yaml dataEpType.enum].
- **S2 — `matchPattern` not machine-enforced.** `matchPattern` has no `pattern` or `enum`, so the "PREFIX/SUFFIX hex-only, even-count" rule and the "PREFIX precludes select filters" rule are description-only [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description]. The value `"FFFFBBBBA500"` (12 hex digits, even) satisfies that rule and was accepted on the corrected set [verified-on-device: RFD40 serial 24190525100255]. Fix: add a `pattern` (e.g. `^[0-9A-Fa-f]{2,}$` with even length) for PREFIX/SUFFIX [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description].
- **S3 — success omits `response.code` despite a well-formed response schema.** `response/control/set_post_filter.json` declares the FULL `required [command, requestId, apiVersion, response]` — a POSITIVE, unlike `get_post_filter`'s missing top-level required [verified-from-schema: response/control/set_post_filter.json required]. Yet the live SUCCESS response's inner `response` object omits `code` (`{description:"Success"}` only), which is INVALID against `response.yaml`'s `required [code, description]`, while the error path includes `code 23` [verified-on-device: RFD40 serial 24190525100255]. Fix: always emit `response.code` (0 on success) — cross-ref `get_operating_mode` **O1** / `set_operating_mode` **P7** [verified-from-schema: refrence/response/response.yaml required].
- **S4 — `postFilterPayload` not in the command's `required`.** `set_post_filter`'s top-level `required` is `[command, requestId]` only, so a set with no `postFilterPayload` validates statically (though it would carry no filter to apply) [verified-from-schema: commands/control/set_post_filter.json required]. Fix: consider requiring `postFilterPayload` for `set_post_filter` [verified-from-schema: commands/control/set_post_filter.json required].
- **S5 — duplicate title + `x-stoplight` id** (cross-ref `get_post_filter` **F3**). The request payload `refrence/payload/postFilterPayload.yaml` shares `title "postFilterPayload"` and `x-stoplight id "y5oysu0o0kuvb"` with the response payload `refrence/response/postFilterResponse.yaml` [verified-from-schema: refrence/payload/postFilterPayload.yaml title, x-stoplight.id]. Fix: give each a unique `title`/`id` [verified-from-schema: refrence/payload/postFilterPayload.yaml title, x-stoplight.id].
- **POSITIVE (not a defect).** `set_post_filter`'s command schema constrains `command` with `enum ["set_post_filter"]` and the response schema declares the FULL `required [command, requestId, apiVersion, response]` [verified-from-schema: response/control/set_post_filter.json required]. On the wire the device ENFORCES the `dataEpType` enum (code 23) and the ADD/verify/DELETE lifecycle worked end-to-end [verified-on-device: RFD40 serial 24190525100255]. The error path returns a documented in-range code (23), unlike `set_operating_mode`'s 101 [inferred-from-live: cross-doc comparison with set_operating_mode P4; not re-verified on the wire this session].

## 8. Safety / operational note

`set_post_filter` is **state-changing but REVERSIBLE**: an `ADD` installs a filter and an `operation DELETE` removes it, so any change can be undone [verified-from-schema: refrence/payload/postFilterPayload.yaml operation.enum]. This session the added `DATA_EP1` PREFIX/INCLUDE filter was deleted and the final `get_post_filter` confirmed the device was back to no filters, so the test cleaned up after itself [verified-on-device: RFD40 serial 24190525100255].

The command is benign: it only governs which scanned tag DATA is reported (include/exclude by pattern) and carries no destructive tag operations [verified-from-schema: refrence/payload/postFilterPayload.yaml reportOperation.description]. It is a control-plane command: it routes over the CTRL endpoint and needs an active CTRL endpoint to be answered, the same routing rule as `get_operating_mode`, `set_operating_mode`, and `get_post_filter` [verified-on-device: RFD40 serial 24190525100255]. This session the CTRL endpoint was active among `[MDM_REMOTE, CTRL_EP, DATA1_EP]` [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].

Security: `set_post_filter` carries no credentials — the match patterns are tag-EPC hex strings, not secrets — so there is nothing to mask [verified-from-schema: refrence/payload/postFilterPayload.yaml matchPattern.description].