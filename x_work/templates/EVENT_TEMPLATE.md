# Event: {eventName}

<!--
========================================================================
TEMPLATE — PUBLIC MQTT EVENT (device-emitted) reference.
========================================================================
This is the END-USER / developer-facing reference for ONE device-emitted event:
the device PUBLISHES it autonomously — NOT in reply to any request — fired by an
INTERNAL TRIGGER (a state change, or a stream armed by a prior START) OR at a
PRE-SET TIMED INTERVAL. The app SUBSCRIBES. There is no request, no response
envelope, and no `response.code`. (The broker only routes between clients — it
never originates messages, so never write "the broker sends".)

HOW TO USE: copy this file, rename it `{eventName}.mdx`, fill every {placeholder},
then DELETE every HTML (arrow-style) comment (MDX uses {/* */}) and the one block
marked "EXAMPLE — delete when authoring".

INTERNAL CONTENT LIVES ELSEWHERE: live-capture verdicts, schema-conformance
findings, and provenance tags (verified-from-schema, verified-on-device, etc.) are
NOT in this public file — they live in the companion `EVENT_TEMPLATE.maintainer.md`.
Keep this file free of QA/provenance noise.

TARGET: DOCUSAURUS / MDX (not plain GitHub). The Event payload / Configuration
sections use MDX components — Tabs (Example | Schema), an optional VariantSelect
dropdown for payload variants, and <Type>/<Enum> color badges. These do NOT render
on github.com; they need the Docusaurus build plus the shared components + CSS from
`TEMPLATE.assets.md` (the same assets the command template uses). Publish the filled
file as `.mdx`.

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

PLACEHOLDERS use {curly_braces}: {eventName}, {serial}, {tenantId}, {EP_TYPE},
{field}, {interval_seconds}. Keep them device-agnostic — never hardcode a real
serial, broker IP, or SSID as if fixed.
JSON: every fenced json code block must be valid JSON (no comments inside fences),
and an event payload has NO response/code object. Events are read-only telemetry —
usually nothing to mask; if a payload ever carries a secret, mask it as ********.
========================================================================
-->

{/* Required MDX imports — keep these; component + CSS source is in TEMPLATE.assets.md */}
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { VariantSelect, Variant } from '@site/src/components/VariantSelect';
import { Type, Enum } from '@site/src/components/ApiType';

## Overview

<!-- 1–2 sentence headline of what {eventName} reports and why a subscriber cares, then a short
paragraph. State plainly: device-emitted, NO request/response, NO response.code, and whether it
fires on an INTERNAL TRIGGER or a TIMED INTERVAL. -->

`{eventName}` is a device-emitted event: the device publishes it on its own — no command triggers it — to report {what it reports}. It fires on **an internal trigger** (e.g. a state change) **or at a pre-set timed interval** — state which, and for a timed interval give the length in seconds. There is no request, no response envelope, and no `response.code`.

:::info
Read-only telemetry — receiving `{eventName}` changes nothing on the device. Emission is **gated by configuration** (see [Configuration](#configuration)); if you see none, check that gate first.
:::

## Details

<!-- A scannable "at a glance" metadata table. Keep values short; link related commands/events.
The State Change / Response Code rows make the read-only, no-code nature explicit up front. -->

| Property | Value |
| --- | --- |
| **Pattern Name** | Event (device-emitted, fire-and-forget; no reply) |
| **Applies To** | {endpoint/plane — e.g. MDM `event` or DATA `data1event`}; {device models — e.g. RFD40, RFD90} |
| **Related Commands / Events** | {e.g. the enable command [`config_events`](config_events.md); sibling events} |
| **Emission** | {INTERNAL TRIGGER (e.g. a state change) or TIMED INTERVAL (every `{interval_seconds}` s)} |
| **Gated By** | {e.g. `{enable_flag}=true` + interval via `config_events`; or a START trigger; or none (autonomous)} |
| **State Change** | READ-ONLY telemetry (receiving it changes nothing) |
| **Response Code** | None — device-emitted events carry no `response.code` |

## When to Use

<!-- 2–4 sentences/bullets: WHAT info the subscriber gets, for WHAT purpose, in WHAT context,
and WHAT problem it solves. Write for a developer deciding whether to subscribe. -->

Subscribe to `{eventName}` when you need to **{outcome}** — {for what purpose}, typically in **{context / environment}**. It solves **{the problem}** without polling.

- **Monitor / detect:** {what state or data it surfaces}.
- **Use it for:** {the concrete scenario(s)}.
- **Prefer a polling command when:** {e.g. you need on-demand state — point to the matching `get_*` command}.

## Topic Mapping

<!-- Per the Axioms "Role & Action" rule, the row states Publish/Subscribe AND names the acting
client: the DEVICE publishes, the APP subscribes (never "the broker sends"). The role segment is
ENDPOINT-SPECIFIC — pick the plane this event uses. Generic pattern:
{tenantId}/{EP_TYPE}/clients/{role}/{serial} with {tenantId}=zebra. -->

| Direction | Topic | Note |
| --- | --- | --- |
| Device-emitted event (publish by device; subscribe by app) | `zebra/MDM/clients/event/{serial}` | Which plane/endpoint emits it |

:::note
The role segment is endpoint-specific: the MDM plane uses `zebra/MDM/clients/event/{serial}`; the DATA plane uses `zebra/DATA/clients/data1event/{serial}` (the EP segment is literally `DATA`, and the role tail is `data1event`, not `event`). Use the one this event actually emits on. There is no per-message authentication — credentials are presented once at CONNECT.
:::

## Key Fields

<!-- The handful of load-bearing fields in the emitted payload, shown before the full table. Keep to 3–5. -->

- **`eventName`** — identifies the event (`{eventName}`); use it to route/filter incoming messages.
- **`timestamp`** — when the device generated the event.
- **`data`** — {the payload the subscriber consumes; name the key sub-object(s)}.
- **`{enable_flag}`** (config) — the gate that must be set for this event to emit (see [Configuration](#configuration)).

## Event payload

<!-- The emitted payload — NO response/code object. <VariantSelect> is OPTIONAL: use it only if
this event emits MULTIPLE payload shapes (e.g. different `data` sub-objects, or per-plane variants),
one <Variant> each with its own Example + Schema. For a SINGLE-shape event, DELETE
<VariantSelect>/<Variant> and keep just the inner <Tabs>. Rules: blank line after each opening JSX
tag and before each closing one; Type cells use <Type>string</Type>; enum values use <Enum>VALUE</Enum>;
escape braces in a <summary> as \{ \}. Leave "Required" per the schema's `required` array — some event
schemas have none, so do NOT assert it. -->

<VariantSelect label="Payload variant">

<Variant label="{Variant A — e.g. with battery status}">

<Tabs groupId="body-view" queryString>
<TabItem value="example" label="Example" default>

```json title="Emitted event"
{
  "eventName": "{eventName}",
  "timestamp": "{ISO-8601 timestamp}",
  "data": {
    "{subField}": "{value}"
  }
}
```

</TabItem>
<TabItem value="schema" label="Schema">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventName` | <Type>string</Type> | `{Yes/No}` | Names the event (`{eventName}`). |
| `timestamp` | <Type>string</Type> | `{Yes/No}` | ISO-8601 time the event was generated. |
| `data` | <Type>object</Type> | `{Yes/No}` | Payload the event carries. Expand for child fields. |

<details>
<summary>data — child fields</summary>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data.{subField}` | <Type>string</Type> | `{Yes/No}` | `{what it reports}`. |
| `data.{status}` | <Type>enum</Type> | `{Yes/No}` | One of <Enum>VALUE_A</Enum> <Enum>VALUE_B</Enum>. |
| `data.{count}` | <Type>integer</Type> | `{Yes/No}` | `{units / range}`. |

</details>

</TabItem>
</Tabs>

</Variant>

<Variant label="{Variant B — e.g. inventory status only}">

<!-- Duplicate the Example + Schema <Tabs> block from the first <Variant> for THIS variant's
payload shape. Delete <VariantSelect> entirely if the event emits only one shape. -->

</Variant>

</VariantSelect>

## Configuration

<!-- How to ENABLE emission — events are gated. Show the enable payload (Example) and its fields
(Schema). TIMED event: an enable flag + interval seconds via config_events (or config_endpoint),
usually applied on REBOOT. STREAMED/trigger event: a START trigger (e.g. control_operation START)
instead of an interval; some events emit autonomously with no configuration (say so and delete
these tabs). Wrap in <VariantSelect> if the enable path differs (timed vs trigger). Replace the
{configBlock} placeholder with the real config object (e.g. heartbeatConfiguration). -->

<Tabs groupId="body-view" queryString>
<TabItem value="example" label="Example" default>

```json title="Enable via config_events"
{
  "command": "config_events",
  "requestId": "{requestId}",
  "eventConfiguration": {
    "{enable_flag}": true,
    "{configBlock}": {
      "interval": 60
    }
  }
}
```

</TabItem>
<TabItem value="schema" label="Schema">

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `{enable_flag}` | <Type>boolean</Type> | `{Yes/No}` | Set `true` to enable emission. |
| `{configBlock}.interval` | <Type>integer</Type> | `{Yes/No}` | Interval in seconds (must be `> 0` for a timed event); omit for trigger/streamed events. |
| `{configBlock}.{inclusion_flag}` | <Type>boolean</Type> | `{Yes/No}` | `{what extra data it includes, if any}`. |

</TabItem>
</Tabs>

:::note
The enable is delivered via `config_events` (or `config_endpoint`) and typically **applies on device reboot**. For a streamed event there is no interval — arm it with a START trigger (e.g. `control_operation` START); some events emit autonomously with no configuration at all.
:::

## Examples

<!-- ONE worked emitted-payload example marked for deletion. An event has no request/response
pair — just the emitted message (still NO response/code object). Replace with a real capture-shaped payload. -->

<!-- ===== EXAMPLE — delete when authoring (illustrative shape only; NOT a real event) ===== -->
**EXAMPLE — delete when authoring.** A device-emitted payload — note there is no `response`/`code` object:

```json
{ "eventName": "exampleEvt", "timestamp": "2020-01-01T00:00:00Z", "eventNumber": 1, "data": { "status": "HIGH" } }
```
<!-- ===== end EXAMPLE — delete the heading, prose, and fence above ===== -->

## Notes & Caveats

<!-- Catch-all admonitions. Delete any you don't use. Cover: the no-response-code fact,
troubleshooting when no events arrive, and read-only / nothing-to-mask (plus revert if enabling
changed stored config). -->

:::info
`{eventName}` is device-emitted and carries **no `response.code`** — the `refrence/response/response.yaml` code table does not apply to events. The event does not signal success/failure; the *absence* of an expected event is the signal to investigate.
:::

:::tip
If no `{eventName}` arrives: confirm the gate (`{enable_flag}=true` and `{configBlock}.interval > 0` for a timed event, or that the stream was armed with START); confirm you subscribed to the right plane/topic (see [Topic Mapping](#topic-mapping)); and remember config changes may apply only after a reboot.
:::

<!-- Docusaurus admonition types: :::note (neutral) · :::tip (best practice) · :::info (context) · :::warning (risk/behavior change) · :::danger (destructive/irreversible). Delete callouts you don't use. -->

:::note
Read-only telemetry — the payload carries no credentials, so there is nothing to mask. If enabling this event changed stored config, revert by re-sending `config_events` with `{enable_flag}=false` (or a different interval).
:::
