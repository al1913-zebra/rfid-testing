# Command: {command_name}

<!--
========================================================================
TEMPLATE — PUBLIC MQTT COMMAND (request/response) reference.
========================================================================
This is the END-USER / developer-facing reference for ONE request/response
command: a backend/app client PUBLISHES a command to the topic the device
SUBSCRIBES to; the device PUBLISHES the correlated reply to the topic the app
SUBSCRIBES to. (The broker only routes between clients — it never originates
messages, so never write "the broker sends".)

HOW TO USE: copy this file, rename it `{command_name}.mdx`, fill every
{placeholder}, then DELETE every HTML comment (MDX uses {/* */}) and the one
block marked "EXAMPLE — delete when authoring".

INTERNAL CONTENT LIVES ELSEWHERE: live-capture verdicts, schema-conformance
findings, and provenance tags (verified-from-schema, verified-on-device, etc.) are
NOT in this public file — they live in the companion `COMMAND_TEMPLATE.maintainer.md`.
Keep this file free of QA/provenance noise.

TARGET: DOCUSAURUS / MDX (not plain GitHub). The Request body / Response body
sections use MDX components — Tabs (Example | Schema), a VariantSelect dropdown for
per-intent variants (the Response body follows the same selection via VariantView), and
<Type>/<Enum> color badges. These do NOT render on
github.com; they need the Docusaurus build plus the components + CSS from the
companion `TEMPLATE.assets.md` (shared with the event template). Publish the filled file as `.mdx`.

MDX AUTHORING RULES (the filled file must obey these to build):
  - Replace ALL {placeholders}. Then DELETE every HTML (arrow-style) comment — MDX
    does NOT support them; use {/* ... */} for any comment you keep.
  - Literal { } and < in PROSE or TABLE CELLS are parsed as JSX. Wrap them in
    `backticks`, or escape as \{ \< (e.g. inside a <summary>). They are safe ONLY
    inside a fenced code block.
  - Nested Markdown inside a JSX tag needs a BLANK LINE after the opening tag and
    before the closing tag (inside <TabItem>, <Variant>, <details>) or the
    table/code will not render.
  - Do NOT put a :::admonition inside a <TabItem> (breaks MDX). Admonitions
    elsewhere use Docusaurus syntax: :::note :::tip :::info :::warning :::danger.
  - <details>/<summary> still works: blank line after </summary> and before
    </details>; keep <summary> on one line and escape any braces in it.

PLACEHOLDERS use {curly_braces}: {command_name}, {requestId}, {serial},
{payloadKey}, {tenantId}, {EP_TYPE}, {field}. Keep them device-agnostic — never
hardcode a real serial, broker IP, or SSID as if fixed.
JSON: every fenced json code block must be valid JSON (no comments inside fences).
Mask credentials as ******** (the device echoes a stored password back as "").
========================================================================
-->

{/* Required MDX imports — keep these; component + CSS source is in TEMPLATE.assets.md */}
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { VariantSelect, Variant, VariantView } from '@site/src/components/VariantSelect';
import { Type, Enum } from '@site/src/components/ApiType';

## Overview

<!-- 1–2 sentence headline of what {command_name} does, then a short paragraph of
context. State plainly whether it is state-changing or read-only. If it is
destructive/irreversible, lead with the :::danger callout below; otherwise delete it. -->

`{command_name}` {one-sentence summary of what it does}. {A short paragraph: what it configures or returns, and the plane it runs on.}

:::danger
`{command_name}` is **state-changing**: describe what it changes and the blast radius. If destructive, name the revert path (e.g. a reboot restores defaults). Delete this callout if the command is read-only.
:::

## Details

<!-- A scannable "at a glance" metadata table. Keep it to short values; link the
related commands. The State Change / Reversibility rows replace a separate "Safety"
section — operational risk is surfaced here plus the inline callouts. -->

| Property | Value |
| --- | --- |
| **Pattern Name** | Request / Response (app publishes a command; device publishes the correlated reply) |
| **Applies To** | {endpoint/plane — e.g. CONTROL `CTRL` or device-management `MDM`}; {device models — e.g. RFD40, RFD90} |
| **Related Commands** | {e.g. [`{related_command}`]({related_command}.md), …} |
| **Required Request Fields** | `command`, `requestId` |
| **Supported Operations** | {what the payload can do — e.g. full set / partial (merge) sets / read-only query} |
| **State Change** | {STATE-CHANGING or READ-ONLY} |
| **Reversibility** | {REVERSIBLE (e.g. reboot restores defaults, or re-send the inverse), or NOT REVERSIBLE, or n/a for read-only} |

## When to Use

<!-- Answer, in 2–4 sentences or bullets: WHAT information/outcome the caller gets,
for WHAT purpose, in WHAT context/environment, and WHAT problem it solves. Write for
a developer deciding whether this is the right command. -->

Use `{command_name}` when you need to **{outcome}** — {for what purpose}, typically in **{context / environment, e.g. an active CTRL session over the management broker}**. It solves **{the problem}**.

- **Get / change:** {what data or state}.
- **Use it for:** {the concrete scenario(s)}.
- **Prefer a different command when:** {pointer to the read-only or inverse command, if any}.

## Topic Mapping

<!-- Per the Axioms "Role & Action" rule, each row states Publish/Subscribe AND names
the acting client (app vs device) — never "the broker sends". The cmnd and resp topics
are TWIN topics (Coupled Topic Mapping): the `resp` topic carries the correlated reply to
the `cmnd` request, and the in-payload `requestId` links them. Generic pattern:
{tenantId}/{EP_TYPE}/clients/{role}/{serial} with {tenantId}=zebra, {EP_TYPE}=CTRL|MDM|DATA,
{role}=cmnd|resp. Replace the CTRL examples if this command routes over a different plane. -->

| Direction | Topic | Note |
| --- | --- | --- |
| Request (publish by app) | `zebra/CTRL/clients/cmnd/{serial}` | {which endpoint must be active to route} |
| Response (subscribe by app; published by device) | `zebra/CTRL/clients/resp/{serial}` | Correlated reply to the request above; `requestId` links the twin topics |

:::note
There is no per-message authentication block — credentials are presented once at CONNECT (Basic / token / mTLS). The `requestId` you send is echoed in the response so you can match reply to request.
:::

## Key Fields

<!-- The handful of load-bearing fields, shown BEFORE the full tables so readers see what
matters first. Keep to 3–5. Reference the full definitions below. -->

- **`requestId`** (request) — your correlation token; make it unique per request. The device echoes it in the response so you can pair reply ↔ request.
- **`{discriminating_field}`** (request) — {the field that selects the operation/target/mode}.
- **`response.code`** (response) — read this to determine success vs failure (see [Response Codes](#response-codes)).
- **{`{other_key_field}`}** — {why it matters}.

## Request body

<!-- The request envelope is `{ command, requestId, {payloadKey} }`; the payload sits under a
NAMED key (e.g. operatingMode, epConfig), not a generic "payload" wrapper. Below, <VariantSelect>
is a DROPDOWN of intents — one <Variant> per intent (e.g. config_endpoint: Add MGMT / CTRL / DATA1
endpoint). Each variant carries its OWN Example and Schema in a two-tab <Tabs>. Rules: blank line
after each opening JSX tag and before each closing one; Type cells use <Type>string</Type> etc.;
enum values use <Enum>VALUE</Enum>; braces in a <summary> are escaped as \{ \}; no braces in a
<Type>/<Enum> child. The `groupId="{command_name}-intent"` links this dropdown to the Response body's
<VariantView>, so selecting an intent switches BOTH sections — keep the same groupId and matching
<Variant value="…"> ids in both. For a SINGLE-intent command, delete <VariantSelect>/<Variant>
(and the Response <VariantView>) and keep just the inner <Tabs>. -->

:::warning
Mask any credential as `********` wherever the request is shown. The device returns a stored password as an empty string `""` on readback.
:::

<VariantSelect label="Intent" groupId="{command_name}-intent">

<Variant value="variant-a" label="Add {intent A} (e.g. MGMT endpoint)">

<Tabs groupId="body-view" queryString>
<TabItem value="example" label="Example" default>

```json title="Request body"
{
  "command": "{command_name}",
  "requestId": "{requestId}",
  "{payloadKey}": {
    "{field_1}": "{value_1}",
    "password": "********"
  }
}
```

</TabItem>
<TabItem value="schema" label="Schema">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | <Type>string</Type> | Yes | Fixed command name (`{command_name}`). |
| `requestId` | <Type>string</Type> | Yes | Correlation token; echoed in the response. |
| `{payloadKey}` | <Type>object</Type> | No | Named payload wrapper — not in `required`. Expand for child fields. |

<details>
<summary>\{payloadKey\} — child fields</summary>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `{payloadKey}.{field}` | <Type>string</Type> | Yes | `{what the field does}`. |
| `{payloadKey}.{choice}` | <Type>enum</Type> | No | One of <Enum>VALUE_A</Enum> <Enum>VALUE_B</Enum>. |
| `{payloadKey}.{count}` | <Type>integer</Type> | No | `{units / range}`. |

</details>

</TabItem>
</Tabs>

</Variant>

<Variant value="variant-b" label="Add {intent B} (e.g. CTRL endpoint)">

<!-- Duplicate the Example + Schema <Tabs> block from the first <Variant>, with THIS intent's
own JSON example and field table. Add one <Variant> per intent the command supports — and add a
matching <Variant value="variant-b"> to the Response body's <VariantView> so the two stay in sync. -->

</Variant>

</VariantSelect>

## Response body

<!-- The response envelope is `{ command, requestId, apiVersion, response{ code, description } }` —
read-only values the device returns. `requestId` echoes the request (the correlation proof). For
`response.code`, treat `refrence/response/response.yaml` as the source of truth — do NOT hardcode a
numeric range or label any code "out-of-range". <VariantView> below has NO dropdown of its own — it
FOLLOWS the Request body's dropdown via the shared groupId "{command_name}-intent". Give it one <Variant>
per intent with the SAME value="…" ids as the request, each holding that intent's response. If the
response is identical across intents, replace <VariantView> with a single <Tabs> (no per-variant split). -->

<VariantView groupId="{command_name}-intent" caption="Response for the intent selected in Request body.">

<Variant value="variant-a" label="Add {intent A} (e.g. MGMT endpoint)">

<Tabs groupId="body-view" queryString>
<TabItem value="example" label="Example" default>

```json title="Response body"
{
  "command": "{command_name}",
  "requestId": "{requestId}",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "{description}"
  }
}
```

</TabItem>
<TabItem value="schema" label="Schema">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | <Type>string</Type> | Yes | Echoes the executed command. |
| `requestId` | <Type>string</Type> | Yes | Echoes the request's `requestId` — pairs reply to request. |
| `apiVersion` | <Type>enum</Type> | Yes | One of <Enum>V1.0</Enum> <Enum>V1.1</Enum>. Confirm per command — some responses extend it (e.g. <Enum>V1.2</Enum> <Enum>V1.21</Enum>). |
| `response` | <Type>object</Type> | Yes | Status wrapper. Expand for child fields. |

<details>
<summary>response — child fields</summary>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `response.code` | <Type>integer</Type> | Yes | Status code; values/bounds per `refrence/response/response.yaml` (`0` = Success, non-zero = error). |
| `response.description` | <Type>string</Type> | Yes | Human-readable status. |

</details>

</TabItem>
</Tabs>

</Variant>

<Variant value="variant-b" label="Add {intent B} (e.g. CTRL endpoint)">

<!-- Duplicate the Example + Schema <Tabs> block above for THIS intent's response (its own code,
description, and any response fields that differ). Keep value="variant-b" matching the request's
<Variant value="variant-b"> so the sync lines up. -->

</Variant>

</VariantView>

## Response Codes

<!-- List the codes THIS command can return. SOURCE them from refrence/response/response.yaml —
do not invent or hardcode a range. `0` = Success; non-zero = error. If the device is known to
return a code outside the schema set, or to omit `code` on success, note it as a Warning callout
here (the detailed evidence belongs in COMMAND_TEMPLATE.maintainer.md, not in this public doc). -->

| Code | Description |
| --- | --- |
| `0` | Success. |
| `{code}` | {meaning, per refrence/response/response.yaml}. |
| `{code}` | {meaning}. |

:::warning
Optional: note any real-device anomaly relevant to callers — e.g. a success response that omits `code`, or a code outside the documented set. Delete if none.
:::

## Examples

<!-- Show ONE end-to-end worked exchange: a request and its correlated reply sharing one
`requestId`. Keep credentials masked. This is where a reader confirms the request/response
correlation. Replace the marked block below with a real, command-specific exchange. -->

<!-- ===== EXAMPLE — delete when authoring (illustrative shape only; NOT a real command) ===== -->
**EXAMPLE — delete when authoring.** Request and reply share `requestId` (`req-001`):

```json
{ "command": "example_set", "requestId": "req-001", "exampleConfig": { "mode": "FAST" } }
```

```json
{ "command": "example_set", "requestId": "req-001", "apiVersion": "V1.1", "response": { "code": 0, "description": "Success" } }
```
<!-- ===== end EXAMPLE — delete the heading, prose, and both fences above ===== -->

## Notes & Caveats

<!-- Catch-all for admonitions that don't belong to a single section. Use the callout type
that matches severity: [!TIP] best practice, [!NOTE] neutral aside, [!WARNING] behavior change /
risk, [!CAUTION] destructive/irreversible. Delete any you don't need. Restate the revert path for
a state-changing command, and the masking reminder. -->

:::tip
A best-practice tip — e.g. read back state after a partial set to confirm what actually applied.
:::

<!-- Docusaurus admonition types: :::note (neutral) · :::tip (best practice) · :::info (context) · :::warning (risk/behavior change) · :::danger (destructive/irreversible). Delete callouts you don't use. -->

:::danger
If state-changing: the exact revert path — e.g. reboot restores the default operating mode, or re-send `{command_name}` with the inverse value. Delete if read-only.
:::
