---
id: post-filters-configure
title: How to configure post-filters
sidebar_label: How to configure post-filters
description: "Configure IOTC post-singulation filters with set_post_filter: ADD/MODIFY/DELETE a PREFIX/SUFFIX/REGEX rule on DATA_EP1 or DATA_EP2, INCLUDE or EXCLUDE matches, with full payloads, expected responses, and verification."
sidebar_custom_props: { emoji: "🧹" }
---

> 📙 **HOW-TO** · **Audience:** Solution Builder · **Time:** ~10 min

This guide installs, verifies, edits, and removes **post-singulation filters** with `set_post_filter`. A post-filter runs in the reader daemon *after* the radio has singulated a tag and read its EPC; it decides whether that read is published on a data endpoint. It does not change what the radio puts on the air — for that, use a Gen2 `select` pre-filter (see [Filter tags before vs after the read](/rfid/post-filters)).

**Applies to:** RFD40 Premium, RFD40 Premium Plus, RFD9030, RFD9090. **API versions:** V1.0, V1.1.

### Before you begin

Decide four things before you send the command. A method/pattern mismatch produces a filter that *saves successfully but suppresses everything* — there is no error, so get them right up front.

| Decision | Field | Allowed values |
|---|---|---|
| What to do | `operation` | `ADD`, `MODIFY`, `DELETE` |
| Which endpoint | `dataEpType` | `DATA_EP1`, `DATA_EP2` |
| What to match | `matchPattern` | Hex string (PREFIX/SUFFIX) or regex string (REGEX) |
| How to match | `matchPatternMethod` | `PREFIX`, `SUFFIX`, `REGEX` |
| Report or suppress | `reportOperation` | `INCLUDE`, `EXCLUDE` |

Rules that decide whether a `matchPattern` is valid:

- **PREFIX / SUFFIX** — `matchPattern` may contain only hexadecimal digits (`0`–`9`, `a`–`f`, `A`–`F`) and **must have an even number of characters**. An odd-length or non-hex pattern installs but never matches.
- **REGEX** — `matchPattern` is a regular-expression string and is exempt from the even-hex rule.
- An unrecognised enum value (an invalid `operation`, `dataEpType`, `matchPatternMethod`, or `reportOperation`) is rejected with code `23` (*Invalid enum value*). `set_post_filter` defines no separate pattern-length error — the `code 28` *Tag match pattern length exceeded* limit applies to `set_operating_mode` pre-filters, not post-filters.

The request is **state-changing**, so it is not idempotent. If you retry after a timeout, use a **new** `requestId`; reusing the old one on an `ADD` can install the rule twice.

#### Filter fields at a glance

Only `command` and `requestId` are listed in the `set_post_filter` schema's `required[]` array. The `postFilterPayload` fields are *required in practice* — the command does nothing useful without them — but they are **not enforced by the schema**.

| Field | Schema-required | Type | Notes |
|---|---|---|---|
| `command` | ✓ | string | Always `set_post_filter`. |
| `requestId` | ✓ | string | Unique per request; correlates the response. |
| `postFilterPayload` | required in practice / not enforced by schema | object | Carries the five fields below. |
| `postFilterPayload.operation` | required in practice / not enforced by schema | enum | `ADD` / `MODIFY` / `DELETE`. |
| `postFilterPayload.dataEpType` | required in practice / not enforced by schema | enum | `DATA_EP1` / `DATA_EP2`. Filters are scoped per endpoint — a rule on one endpoint does not affect the other. |
| `postFilterPayload.matchPattern` | required in practice / not enforced by schema | string | Value compared against the tag ID. |
| `postFilterPayload.matchPatternMethod` | required in practice / not enforced by schema | enum | `PREFIX` (start of tag ID), `SUFFIX` (end of tag ID), `REGEX` (regular expression). |
| `postFilterPayload.reportOperation` | required in practice / not enforced by schema | enum | `INCLUDE` (only matches reported) / `EXCLUDE` (matches suppressed). |

### View current post-filters

Always start here. `get_post_filter` is read-only and **idempotent**, so you can retry it with the same `requestId`. Use it to confirm the starting state and to find the exact rule you intend to `MODIFY` or `DELETE`.

```json
{ "command": "get_post_filter", "requestId": "pf-1" }
```

Expected response — the active rules are returned as an array under `postFilterPayload.postFilter`, one entry per installed filter, per endpoint:

```json
{
  "command": "get_post_filter",
  "requestId": "pf-1",
  "apiVersion": "V1.1",
  "postFilterPayload": {
    "postFilter": [
      {
        "dataEpType": "DATA_EP1",
        "matchPattern": "E28000",
        "matchPatternMethod": "PREFIX",
        "reportOperation": "INCLUDE"
      }
    ]
  },
  "response": { "code": 0, "description": "Success" }
}
```

An empty `postFilter` array (or its absence) means no post-filters are installed and every singulated tag is reported on both endpoints.

### Add a PREFIX inclusion filter

Report **only** tags whose EPC begins with a given hex prefix on `DATA_EP1`. Note the constraint: while a `PREFIX` post-filter is active, Gen2 `select` pre-filters cannot also be applied (`SUFFIX` and `REGEX` carry no such restriction).

```json
{
  "command": "set_post_filter",
  "requestId": "pf-2",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA_EP1",
    "matchPattern": "E28000",
    "matchPatternMethod": "PREFIX",
    "reportOperation": "INCLUDE"
  }
}
```

Expected response:

```json
{
  "command": "set_post_filter",
  "requestId": "pf-2",
  "apiVersion": "V1.1",
  "response": { "code": 0, "description": "Success" }
}
```

After this, only tags whose EPC starts with `E28000` are published on `DATA_EP1`. `DATA_EP2` is unchanged.

### Add a SUFFIX exclusion filter

Suppress tags whose EPC ends with a given hex suffix on `DATA_EP2` — useful to drop a known block of reference or test tags from one stream.

```json
{
  "command": "set_post_filter",
  "requestId": "pf-3",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA_EP2",
    "matchPattern": "FFFF",
    "matchPatternMethod": "SUFFIX",
    "reportOperation": "EXCLUDE"
  }
}
```

Expected response is `{"code": 0, "description": "Success"}`. Because this rule targets `DATA_EP2`, the `DATA_EP1` PREFIX rule added above is untouched — the two endpoints filter independently.

### Add a REGEX filter

When prefix/suffix matching is not enough, match the whole tag ID with a regular expression. `REGEX` is the only method that can express "anchored, fixed-length, character-class" rules, and it is exempt from the even-hex constraint.

```json
{
  "command": "set_post_filter",
  "requestId": "pf-4",
  "postFilterPayload": {
    "operation": "ADD",
    "dataEpType": "DATA_EP1",
    "matchPattern": "^E280[0-9A-F]{20}$",
    "matchPatternMethod": "REGEX",
    "reportOperation": "INCLUDE"
  }
}
```

This includes only 24-hex-digit EPCs beginning with `E280` on `DATA_EP1`. Expected response is `{"code": 0, "description": "Success"}`.

### Verify the filter took effect

A successful `set_post_filter` response (`code: 0`) confirms the rule was **saved**, not that it **matches**. Always confirm both:

1. Re-run [`get_post_filter`](#view-current-post-filters) and check the rule appears under the intended `dataEpType` with the exact `matchPattern` and `matchPatternMethod` you sent.
2. Present a known-matching test tag and confirm a `dataEVT` arrives on the expected endpoint (and that a known *non*-matching tag does **not** for an `INCLUDE` rule). See [Where tag reads come from](/rfid/dataevt-schema).

If the rule is present but no expected reads appear, the pattern is almost certainly malformed (odd-length hex, wrong method, or a regex that matches nothing) — see [Troubleshooting](#troubleshooting).

### Modify or delete

`operation: MODIFY` updates an existing filter on the named endpoint; `operation: DELETE` removes one. Run [`get_post_filter`](#view-current-post-filters) first so you target the rule that actually exists.

Modify — change the `DATA_EP1` rule to a longer, more specific prefix:

```json
{
  "command": "set_post_filter",
  "requestId": "pf-5",
  "postFilterPayload": {
    "operation": "MODIFY",
    "dataEpType": "DATA_EP1",
    "matchPattern": "E2806894",
    "matchPatternMethod": "PREFIX",
    "reportOperation": "INCLUDE"
  }
}
```

Delete — remove the `DATA_EP2` suffix rule:

```json
{
  "command": "set_post_filter",
  "requestId": "pf-6",
  "postFilterPayload": {
    "operation": "DELETE",
    "dataEpType": "DATA_EP2",
    "matchPattern": "FFFF",
    "matchPatternMethod": "SUFFIX",
    "reportOperation": "EXCLUDE"
  }
}
```

Both return `{"code": 0, "description": "Success"}` on success. After a `DELETE`, confirm with `get_post_filter` that the rule is gone — a `DELETE` aimed at a non-existent rule returns a generic error, so the read-back is your real proof.

### INCLUDE vs EXCLUDE

The two endpoints (`DATA_EP1`, `DATA_EP2`) are **concurrent** and filtered independently. Pick `reportOperation` per endpoint based on whether the matching set is your allow-list or your block-list:

| `reportOperation` | Effect | Use when |
|---|---|---|
| `INCLUDE` | Only tags matching the pattern are reported on that endpoint. | The matching set is small/known (an allow-list). |
| `EXCLUDE` | Tags matching the pattern are suppressed; everything else is reported. | You want to drop a known noisy block (a block-list). |

### Response codes

`set_post_filter` and `get_post_filter` return the standard IOTC `response` object (`code` + `description`). `set_post_filter` returns only `0` and `23`; `get_post_filter` returns only `0` and `3`:

| Code | Meaning | Command | Typical cause |
|---|---|---|---|
| `0` | Success | both | Filter saved (`set_post_filter`) / retrieved (`get_post_filter`). |
| `3` | Not able to retrieve information | `get_post_filter` | `get_post_filter` could not read current state. |
| `23` | Invalid enum value | `set_post_filter` | `operation`, `dataEpType`, `matchPatternMethod`, or `reportOperation` not one of the allowed values. |

A `code: 0` means the rule was *stored*. It does **not** validate that a PREFIX/SUFFIX pattern is even-length hex, or that a REGEX matches any real tag — an invalid-but-storable pattern saves silently and filters nothing in. Verification (above) is the only guard.

### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `set_post_filter` returns `code: 23` | A field carries a value outside its enum, or a required field is missing/malformed. | Check spelling/case of `operation`, `dataEpType`, `matchPatternMethod`, `reportOperation`, and confirm `command` + `requestId` are present. |
| Saved `code: 0` but **no** reads arrive (INCLUDE rule) | Odd-length or non-hex PREFIX/SUFFIX pattern, or a REGEX that matches nothing. | Re-check the pattern; PREFIX/SUFFIX must be even-length hex. Test with a known-matching tag. |
| `select` pre-filters stop working after adding a filter | An active `PREFIX` post-filter blocks `select` pre-filters. | Use `SUFFIX`/`REGEX` instead, or drop the `select` pre-filters. |
| Filter affects the wrong stream | Rule installed on the other endpoint. | Endpoints are independent — re-issue on the intended `dataEpType`. |
| `DELETE` returns a generic error | No matching rule on that endpoint. | Run `get_post_filter` first; target a rule that exists. |

**Related:** 📘 [Filter tags before vs after the read](/rfid/post-filters) · 📕 [Tag filtering (CTRL)](/reference/ctrl/set-post-filter) · ⚙️ [How to configure the operating mode](/rfid/operating-mode/configure) · 📘 [Where tag reads come from](/rfid/dataevt-schema) · 📕 [Error codes](/reference/errors/codes) · 📕 [set_post_filter](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter)
