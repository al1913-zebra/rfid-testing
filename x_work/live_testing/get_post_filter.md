# Command: get_post_filter

## 1. Intent & Objective

`get_post_filter` fetches the post-filter configuration currently applied on the device — the rules that filter scanned RFID tag DATA before it is reported, per data endpoint [verified-from-schema: commands/control/get_post_filter.json description]. A post-filter matches scanned tag data by pattern and either includes or excludes it from reporting [verified-from-schema: refrence/payload/postFilterPayload.yaml reportOperation.description]. It is a **read-only** command: the request carries no settings and the device returns a snapshot of the present post-filter(s) without mutating any state [verified-from-schema: commands/control/get_post_filter.json properties].

It is a **CONTROL-plane** command [verified-from-schema: models/iot_control_cmds.v1.1.json properties.command.enum]. It is published on the CTRL endpoint and answered there, and it requires an active CTRL endpoint on the device before it will respond — the same control-plane routing rule established for `get_operating_mode` and `set_operating_mode` [verified-on-device: RFD40 serial 24190525100255].

## 2. Topic Mapping (observed on-wire)

`get_post_filter` is a **CONTROL command** [verified-from-schema: models/iot_control_cmds.v1.1.json properties.command.enum]. Its on-wire routing was exercised this session [verified-on-device: RFD40 serial 24190525100255]:

| Direction | Topic (wire form `{tenantId}/{baseTopic}/{serial}`) | Concrete topic this session |
| --- | --- | --- |
| Request (publish) | `zebra/CTRL/clients/cmnd/<serial>` | `zebra/CTRL/clients/cmnd/RFD40-24190525100255` |
| Response (subscribe) | `zebra/CTRL/clients/resp/<serial>` | `zebra/CTRL/clients/resp/RFD40-24190525100255` |

Routing notes:

- **Answered over CTRL.** The request published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` was answered on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. This is the same control-plane routing as `get_operating_mode` / `set_operating_mode` [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].
- **Requires an active CTRL endpoint.** This session the device had three active endpoints `[MDM_REMOTE, CTRL_EP, DATA1_EP]`, so the CTRL endpoint was active and able to answer [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. The command was answered over CTRL with that endpoint active [verified-on-device: RFD40 serial 24190525100255].

## 3. Request Payload Breakdown

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | yes | example `"get_post_filter"`; NO `enum` constraint (see **F1**) | [verified-from-schema: commands/control/get_post_filter.json properties.command] |
| `requestId` | string | yes | unique identifier used to correlate the response | [verified-from-schema: commands/control/get_post_filter.json properties.requestId, required] |

Both fields are declared in the command's top-level `required` array `[command, requestId]` [verified-from-schema: commands/control/get_post_filter.json required]. Unlike its sibling `set_post_filter` (whose `command` carries `enum ["set_post_filter"]`) and unlike `set_operating_mode` / `get_operating_mode`, the `get_post_filter` `command` property carries only an `example` and NO `enum`, so any string satisfies static validation for `command` (see **F1**) [verified-from-schema: commands/control/get_post_filter.json properties.command].

### JSON Request Example (operator-provided, schema-validated, sent)

```json
{
  "command": "get_post_filter",
  "requestId": "abc123"
}
```

Static verdict: **VALID** — `command` and `requestId` are both present, and this request matches the command schema's sole `examples` entry exactly [verified-from-schema: commands/control/get_post_filter.json examples]. The `requestId` value `abc123` is operator-supplied [verified-on-device: RFD40 serial 24190525100255].

## 4. Response Payload Breakdown

Envelope. The response schema declares NO top-level `required` array, so an empty `{}` would validate against the wrapper, and neither `postFilterPayload` nor `response` is individually required (see **F2**) [verified-from-schema: response/control/get_post_filter.json].

| Field | Type | Required | Constraint / Notes | Locus |
| --- | --- | --- | --- | --- |
| `command` | string | no | echoes `get_post_filter` | [verified-from-schema: response/control/get_post_filter.json properties.command] |
| `requestId` | string | no | echoes the request's `requestId` | [verified-from-schema: response/control/get_post_filter.json properties.requestId] |
| `apiVersion` | string | no | enum `["V1.1", "V1.0"]` | [verified-from-schema: response/control/get_post_filter.json properties.apiVersion.enum] |
| `postFilterPayload` | object | no | `$ref postFilterResponse.yaml`; carries the `postFilter[]` array | [verified-from-schema: response/control/get_post_filter.json properties.postFilterPayload] |
| `response` | object | no | `$ref response.yaml` (the referenced schema separately requires `{code, description}`) | [verified-from-schema: response/control/get_post_filter.json properties.response] |

The referenced `response.yaml` schema declares `required [code, description]` [verified-from-schema: refrence/response/response.yaml required].

`postFilterPayload.postFilter[]` item fields. The referenced payload schema is titled `postFilterPayload` (the file is named `postFilterResponse.yaml`; see **F3**) [verified-from-schema: refrence/response/postFilterResponse.yaml title]:

| Field | Type | Constraint / Notes | Locus |
| --- | --- | --- | --- |
| `dataEpType` | string | plain string, NO enum (the request-side payload constrains it to `DATA_EP1`/`DATA_EP2`; see **F4**) | [verified-from-schema: refrence/response/postFilterResponse.yaml properties.postFilter.items.properties.dataEpType] |
| `matchPattern` | string | the pattern matched during filtering | [verified-from-schema: refrence/response/postFilterResponse.yaml properties.postFilter.items.properties.matchPattern] |
| `matchPatternMethod` | string | plain string, NO enum (the request-side payload constrains it to `PREFIX`/`SUFFIX`/`REGEX`; see **F4**) | [verified-from-schema: refrence/response/postFilterResponse.yaml properties.postFilter.items.properties.matchPatternMethod] |
| `reportOperation` | string | plain string, NO enum (the request-side payload constrains it to `INCLUDE`/`EXCLUDE`; see **F4**) | [verified-from-schema: refrence/response/postFilterResponse.yaml properties.postFilter.items.properties.reportOperation] |

**Populated vs empty shape.** The response schema's example shows `postFilterPayload` PRESENT — a `postFilter` array with one entry `{dataEpType: "DATA_EP1", matchPattern: "FFFF", matchPatternMethod: "REGEX", reportOperation: "INCLUDE"}` — alongside `response {code: 0, description: "Success"}` [verified-from-schema: response/control/get_post_filter.json examples]. The live device, which had no post-filters configured, returned NEITHER `postFilterPayload` NOR `response.code` — only `{command, requestId, apiVersion, response{description}}` (see **F6** and the divergence note in Section 5) [verified-on-device: RFD40 serial 24190525100255]. The populated `postFilterPayload` shape above is documented from the schema only and was not exercised live [verified-from-schema: response/control/get_post_filter.json examples].

### JSON Response Example (LIVE, verbatim — no filters configured)

```json
{"command":"get_post_filter","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

The live response carried exactly four top-level keys: `command`, `requestId`, `apiVersion`, and `response` [verified-on-device: RFD40 serial 24190525100255]. The `apiVersion` value `V1.1` is in the declared enum [verified-from-schema: response/control/get_post_filter.json properties.apiVersion.enum]. The `response` object was `{"description":"Success"}` with the `code` field OMITTED [verified-on-device: RFD40 serial 24190525100255]. The `postFilterPayload` field was omitted entirely — no filters are configured on the device and none were ever set [verified-on-device: RFD40 serial 24190525100255].

Validation result: **INVALID** against the referenced `response.yaml` — that schema requires `[code, description]`, and the live `response` carries only `description` (the required `response.code` is MISSING) (see **L2** / **F5**) [verified-from-schema: refrence/response/response.yaml required]. The omission was observed on the wire [verified-on-device: RFD40 serial 24190525100255].

## 5. Live Verification

ENVIRONMENT / VERDICT: the command was exercised against the RFD40 over the CTRL plane with `CTRL_EP` active [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics]. Verdict: **LIVE** [verified-on-device: RFD40 serial 24190525100255]. As a read-only getter it needs no confirmation and was sent directly [verified-on-device: RFD40 serial 24190525100255].

The request `{command: get_post_filter, requestId: abc123}` was published to `zebra/CTRL/clients/cmnd/RFD40-24190525100255` and the response was read on `zebra/CTRL/clients/resp/RFD40-24190525100255` [verified-on-device: RFD40 serial 24190525100255]. The verbatim live response was:

```json
{"command":"get_post_filter","requestId":"abc123","apiVersion":"V1.1","response":{"description":"Success"}}
```

Findings:

- **L1 — CONTROL routing.** `get_post_filter` was answered over CTRL (request on `cmnd`, response on `resp`) and required the active CTRL endpoint — the same control-plane rule as `get_operating_mode` / `set_operating_mode` [verified-on-device: RFD40 serial 24190525100255].
- **L2 — SUCCESS omits `response.code`.** The live success returned `{description: "Success"}` with NO `code`, which is INVALID against `response.yaml`'s `required [code, description]` [verified-on-device: RFD40 serial 24190525100255]. This is the same omit-`code`-on-success behavior already documented as `get_operating_mode` **O1** and `set_operating_mode` **P7**, now observed on a third control command [verified-from-schema: refrence/response/response.yaml required].
- **L3 — `postFilterPayload` omitted when no filters.** The live no-filter response contained NO `postFilterPayload` field at all — not even an empty `postFilter: []` array [verified-on-device: RFD40 serial 24190525100255].
- **L4 — deterministic / idempotent getter.** A second send (`requestId abc124`) returned an identical response, with no side effects [verified-on-device: RFD40 serial 24190525100255].
- **L5 — `requestId` echoed.** The device echoed the operator-supplied `requestId` on both sends (`abc123` and `abc124`) [verified-on-device: RFD40 serial 24190525100255].

**Live-vs-schema-example divergence.** The response schema example shows `postFilterPayload` PRESENT (a `postFilter` array) AND `response {code: 0, description: "Success"}` [verified-from-schema: response/control/get_post_filter.json examples]. The live device, with no filters set, returned NEITHER `postFilterPayload` NOR `response.code` — only `{command, requestId, apiVersion, response{description}}` [verified-on-device: RFD40 serial 24190525100255].

**Coverage caveat.** The POPULATED `get_post_filter` response (a `postFilterPayload` carrying actual filters) was NOT exercised live — the device has no post-filters configured, and configuring one requires `set_post_filter`, a separate state-changing command out of scope this turn [verified-on-device: RFD40 serial 24190525100255]. The populated shape is therefore documented from the schema only [verified-from-schema: response/control/get_post_filter.json examples]; only the empty / no-filter shape is verified on the wire [verified-on-device: RFD40 serial 24190525100255]. UPDATE: this gap is now CLOSED — the `set_post_filter` turn added a `DATA_EP1` PREFIX filter and a `get_post_filter` readback returned `postFilterPayload {postFilter:[{DATA_EP1, FFFFBBBBA500, PREFIX, INCLUDE}]}`, so the populated shape is now verified on the wire (see `set_post_filter.md` **L4**) [verified-on-device: RFD40 serial 24190525100255].

## 6. Associated Error Codes

IMPORTANT: this command returned **NO numeric code** this session — success was conveyed by `response.description: "Success"` with `code` ABSENT (see **L2**) [verified-on-device: RFD40 serial 24190525100255].

Schema-documented codes relevant to a read-only retrieval command [verified-from-schema: refrence/response/response.yaml code table]:

| Code | Meaning | Provenance |
| --- | --- | --- |
| 0 | Success | [verified-from-schema: response/control/get_post_filter.json examples (response.code 0)] |
| 3 | Not able to retrieve information | [inferred-from-live: plausible retrieval-failure code for a getter; documented in response.yaml but not observed this session] |

Honesty note: code `0` appears in the response schema's example but was NOT observed on the wire — the live success omitted `code` entirely; do not claim code 0 was returned [verified-on-device: RFD40 serial 24190525100255]. Code `3` is a hypothesis for a retrieval failure and was not observed [inferred-from-live: not exercised this session].

Sibling-domain note: code `24` "Max 32 prefilters limit exceeded" belongs to the setter `set_post_filter` (which adds filters), not to this getter, which never adds filters [verified-from-schema: refrence/response/response.yaml code table].

## 7. Conformance & Spec Notes (this command)

- **F1 — `command` is NOT enum-constrained.** The `command` property in `get_post_filter.json` carries only an `example` and no `enum`, so any string passes static validation for `command` [verified-from-schema: commands/control/get_post_filter.json properties.command]. The sibling `set_post_filter.json` constrains `command` with `enum ["set_post_filter"]`, and `set_operating_mode` / `get_operating_mode` likewise constrain theirs — an asymmetry that leaves `get_post_filter` with weaker validation [verified-from-schema: commands/control/set_post_filter.json properties.command.enum]. Fix: add `enum ["get_post_filter"]` to the command property [verified-from-schema: commands/control/get_post_filter.json properties.command].
- **F2 — response has NO top-level `required`.** `response/control/get_post_filter.json` declares no top-level `required` array, so an empty `{}` validates against the wrapper and neither `postFilterPayload` nor `response` is individually required [verified-from-schema: response/control/get_post_filter.json]. This is the same no-top-level-required class already noted for `get_endpoint_config` / `config_endpoint` [verified-from-schema: response/control/get_post_filter.json]. The live success — `{description}` only — is also INVALID against `response.yaml`'s `required [code, description]`, even though the wrapper itself requires neither field [verified-on-device: RFD40 serial 24190525100255]. Fix: declare top-level `required [command, requestId, apiVersion, response]` [verified-from-schema: response/control/get_post_filter.json].
- **F3 — duplicate title + `x-stoplight` id.** `refrence/payload/postFilterPayload.yaml` (the request payload) and `refrence/response/postFilterResponse.yaml` (the response payload) BOTH declare `title: postFilterPayload` and `x-stoplight id: y5oysu0o0kuvb` [verified-from-schema: refrence/response/postFilterResponse.yaml title, x-stoplight.id]. The response file is named `postFilterResponse.yaml` but is titled `postFilterPayload`, so the two files collide on both identifiers — a copy-paste collision [verified-from-schema: refrence/payload/postFilterPayload.yaml title, x-stoplight.id]. Fix: retitle the response file `postFilterResponse` and give it a unique `x-stoplight` id [verified-from-schema: refrence/response/postFilterResponse.yaml title].
- **F4 — response payload items lack enums.** In `postFilterResponse.yaml`, the `postFilter[]` item fields `dataEpType`, `matchPatternMethod`, and `reportOperation` are plain strings with no enum constraints [verified-from-schema: refrence/response/postFilterResponse.yaml properties.postFilter.items.properties]. The request-side `postFilterPayload.yaml` constrains the same fields with enums (`DATA_EP1`/`DATA_EP2`; `PREFIX`/`SUFFIX`/`REGEX`; `INCLUDE`/`EXCLUDE`), so the response does not enforce the documented enums [verified-from-schema: refrence/payload/postFilterPayload.yaml properties]. Fix: mirror those enums on the response item fields [verified-from-schema: refrence/response/postFilterResponse.yaml properties.postFilter.items.properties].
- **F5 — SUCCESS omits `response.code` (behavior).** As in **L2**, the live success conveyed status only via `description: "Success"` with `code` absent, failing `response.yaml`'s `required [code, description]` [verified-on-device: RFD40 serial 24190525100255]. This cross-references `get_operating_mode` **O1** and `set_operating_mode` **P7** [verified-from-schema: refrence/response/response.yaml required]. Fix: always emit `response.code` (0 on success) [verified-on-device: RFD40 serial 24190525100255].
- **F6 — live omits `postFilterPayload` when none set.** The response schema example always shows `postFilterPayload`, but the live no-filter response omits it, so callers must treat `postFilterPayload` as optional/absent when no filters are configured [verified-on-device: RFD40 serial 24190525100255]. The schema example carries `postFilterPayload` unconditionally [verified-from-schema: response/control/get_post_filter.json examples]. Fix: document `postFilterPayload` as present only when filters exist, or have the device return an empty `postFilter: []` [verified-on-device: RFD40 serial 24190525100255].
- **POSITIVE (not a defect).** `get_post_filter` IS present in the `iot_control_cmds.v1.1.json` command enum (5 commands: `control_operation`, `set_operating_mode`, `get_operating_mode`, `set_post_filter`, `get_post_filter`) — there is no enum gap for it [verified-from-schema: models/iot_control_cmds.v1.1.json properties.command.enum]. The command schema's sole example equals the operator payload exactly, and the response schema declares the `apiVersion` enum and references both `response.yaml` and `postFilterResponse.yaml` [verified-from-schema: response/control/get_post_filter.json]. On the wire the getter is deterministic and idempotent with no side effects [verified-on-device: RFD40 serial 24190525100255].

## 8. Safety / operational note

`get_post_filter` is a **read-only getter**: it fetches the device's current post-filter(s) and changes no state, so it is safe to issue at any time and is deterministic / idempotent on repeat sends [verified-on-device: RFD40 serial 24190525100255]. It carries no settings in the request [verified-from-schema: commands/control/get_post_filter.json properties].

It is a control-plane command: it routes over the CTRL endpoint and needs an active CTRL endpoint to be answered, the same routing rule as `get_operating_mode` / `set_operating_mode` [verified-on-device: RFD40 serial 24190525100255]. This session the CTRL endpoint was active among `[MDM_REMOTE, CTRL_EP, DATA1_EP]` [verified-from-test-harness: deployment topology — CTRL_EP active; CONTROL routing on the cmnd/resp topics].

Security: `get_post_filter` carries no credentials in either the request or the response — post-filters describe tag-data match patterns only — so there is nothing to mask [verified-from-schema: refrence/response/postFilterResponse.yaml properties]. The exercise left the device state unchanged (no filters were set or removed) [verified-on-device: RFD40 serial 24190525100255]. The operation is benign [verified-on-device: RFD40 serial 24190525100255].