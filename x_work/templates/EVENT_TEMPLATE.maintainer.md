# Maintainer notes: {eventName} (INTERNAL — do not publish)

<!--
========================================================================
TEMPLATE — INTERNAL / MAINTAINER companion to EVENT_TEMPLATE.md.
========================================================================
This file holds the QA / verification record for an event: the live-capture
verdict (or an honest live-capture blocker), the schema-conformance findings, and
every provenance tag. It is NOT end-user reference — keep it OUT of the published
docs (exclude it from the docs build / sidebar). The public reference is
`{eventName}.mdx` (from EVENT_TEMPLATE.md).

HOW TO USE: copy this file, rename it `{eventName}.maintainer.md`, fill the
{placeholders}, and DELETE every HTML comment. Each fact here MUST carry a provenance
tag (legend below); the tagged facts here are what justify the untagged claims in the
public reference.

JSON: every fenced json code block must be valid JSON; an event payload has NO
response/code object. Events are read-only telemetry — usually nothing to mask.
========================================================================
-->

> **Pairs with:** the public reference [`{eventName}.mdx`](./{eventName}.mdx). Verifications here back the public Event payload / Configuration sections; nothing in this file should be copied verbatim into the public doc.

## Provenance legend (closed vocabulary)

<!-- End every factual cell/sentence in THIS file with exactly ONE tag from this closed
vocabulary. Tag every claim; never assert a fact you cannot trace to a schema file or an
on-wire capture. The public reference carries no tags — provenance lives here. -->

- `[verified-from-schema: <repo path> <jsonpath>]` — e.g. `[verified-from-schema: events/{eventName}.json properties.{field}]`
- `[verified-on-device: <model> serial <n>]` — e.g. `[verified-on-device: RFD40 serial {serial}]`
- `[verified-from-test-harness: <detail>]`
- `[inferred-from-live: <detail>]`
- `[firmware-only-unknown: <detail>]`

## Schema sources

<!-- Pin the exact backing schema files so the public doc's fields are traceable. Event JSON sits
one level deep and $refs the refrence YAML via ../refrence/... ; the "refrence" folder spelling is
intentional and load-bearing. -->

| Artifact | Schema locus |
| --- | --- |
| Event payload | `events/{eventName}.json` [verified-from-schema: events/{eventName}.json properties] |
| Nested `data` sub-schema(s) | `refrence/events/{ref}.yaml` [verified-from-schema: refrence/events/{ref}.yaml] |
| Enable / configuration | `refrence/payload/cfgEventPayload.yaml` (delivered via `config_events`) [verified-from-schema: refrence/payload/cfgEventPayload.yaml properties.{enable_flag}] |

## Live Verification

<!-- State a verdict: **LIVE** (an emitted payload was captured) or an HONEST live-capture blocker
(subscribed on the right topic long enough, enable confirmed, yet nothing arrived — a blocker, not a
failure; leave the gating cause as a slot and tag it [firmware-only-unknown: ...]). If LIVE, paste the
VERBATIM emitted payload and confirm it matches the public §Topic Mapping / Event payload. Mask any
secret as ********. -->

**Verdict: {LIVE | LIVE-CAPTURE BLOCKED, not a failure}.** {one line: topic subscribed, window length, and what arrived — or, if blocked, what was confirmed working (enable accepted, config read back) and what was observed (zero events)} [verified-on-device: {model} serial {serial}].

```json
{ "eventName": "{eventName}", "timestamp": "{ISO-8601 timestamp}", "data": { "{subField}": "{value}" } }
```

<!-- If the enable path was exercised: record that config_events returned success and the readback
confirmed the config, then whether any event actually emitted. If nothing emitted despite a confirmed
enable, say so plainly and tag the undetermined gating cause [firmware-only-unknown: ...]. -->

## Conformance & Spec Notes

<!-- Schema-conformance findings + protocol notes that justify the public doc but are not end-user
reference. Keep wire-vs-convention honest: tag anything not seen on the wire as
"convention"/[inferred-from-live]. -->

- **Schema conformance.** {Does the captured payload validate against `events/{eventName}.json`? Note any divergence — a field emitted with a different type than declared, a `timestamp` format that differs, or fields present/absent vs the `required` array (some event schemas have none).} [verified-from-schema: events/{eventName}.json properties] [verified-on-device: {model} serial {serial}].
- **Axioms §III topic-block elements (traceability).** Topic String, Role & Action (device publishes; app subscribes), Payload Schema, MQTT v5 Properties (below), Code Payload Example are all accounted for [verified-from-schema: events/{eventName}.json].
- **No response envelope.** The event carries no `response`/`response.code`; the `refrence/response/response.yaml` code table does not apply to it [verified-from-schema: events/{eventName}.json].
- **Retain — PER EVENT KIND.** For a last-known-state / status event (heartbeat, connection state), retain MAY be TRUE so a late subscriber immediately gets the current snapshot; for a streamed / high-rate event (tag data), retain should be FALSE — a retained stream frame is stale and misleads late subscribers. Record the observed retain flag [inferred-from-live: retain {true|false}].
- **QoS.** {Observed QoS 0/1/2 — fill from capture} [inferred-from-live: {detail}] (do not assert a fixed QoS without a capture).
- **Payload format indicator.** {UTF-8 JSON text vs binary — note the MQTT v5 Payload Format Indicator if observed} [inferred-from-live: {detail}].
- **AsyncAPI 3.0 mapping.** This event maps to a single `send` operation with **NO reply** — a fire-and-forget notification (unlike a command's `send` + Operation Reply Object) (https://www.asyncapi.com/docs/reference/specification/v3.0.0). Per Axioms §V.10 the backing JSON Schema/AsyncAPI spec is the single source of truth [verified-from-schema: events/{eventName}.json].

## Open questions / firmware unknowns

<!-- Anything undetermined that a future capture should resolve. Tag [firmware-only-unknown: ...]. -->

- {e.g. the exact condition gating emission is undetermined — enable confirmed via readback, yet no event observed} [firmware-only-unknown: {detail}].
