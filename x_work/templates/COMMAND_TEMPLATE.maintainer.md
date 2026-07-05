# Maintainer notes: {command_name} (INTERNAL — do not publish)

<!--
========================================================================
TEMPLATE — INTERNAL / MAINTAINER companion to COMMAND_TEMPLATE.md.
========================================================================
This file holds the QA / verification record for a command: the live-capture
verdict, the schema-conformance findings, and every provenance tag. It is NOT
end-user reference — keep it OUT of the published docs (exclude it from the docs
build / sidebar). The public reference is `{command_name}.md` (from COMMAND_TEMPLATE.md).

HOW TO USE: copy this file, rename it `{command_name}.maintainer.md`, fill the
{placeholders}, and DELETE every HTML comment. Each fact here MUST carry a provenance
tag (legend below); facts proven here are what justify the claims written, untagged,
in the public reference.

JSON: every fenced ```json block must be valid JSON. Mask credentials as ********
(the device echoes a stored password back as "").
========================================================================
-->

> **Pairs with:** the public reference [`{command_name}.md`](./{command_name}.md). Verifications here back the public Request/Response/Response-Codes sections; nothing in this file should be copied verbatim into the public doc.

## Provenance legend (closed vocabulary)

<!-- End every factual cell/sentence in THIS file with exactly ONE tag from this closed
vocabulary. Tag every claim; never assert a fact you cannot trace to a schema file or an
on-wire capture. The public reference carries no tags — provenance lives here. -->

- `[verified-from-schema: <repo path> <jsonpath>]` — e.g. `[verified-from-schema: commands/control/{command_name}.json properties.command.enum]`
- `[verified-on-device: <model> serial <n>]` — e.g. `[verified-on-device: RFD40 serial {serial}]`
- `[verified-from-test-harness: <detail>]`
- `[inferred-from-live: <detail>]`
- `[firmware-only-unknown: <detail>]`

## Schema sources

<!-- Pin the exact backing schema files so the public doc's fields are traceable. Command and
response JSON sit two levels deep and $ref the refrence YAML via ../../refrence/...; the
"refrence" folder spelling is intentional and load-bearing. -->

| Artifact | Schema locus |
| --- | --- |
| Request envelope | `commands/{control\|dev_mgmt}/{command_name}.json` [verified-from-schema: commands/{control\|dev_mgmt}/{command_name}.json] |
| Request payload | `refrence/payload/{payload}.yaml` [verified-from-schema: refrence/payload/{payload}.yaml] |
| Response envelope | `response/{control\|dev_mgmt}/{command_name}.json` [verified-from-schema: response/{control\|dev_mgmt}/{command_name}.json properties] |
| Response codes | `refrence/response/response.yaml` (`$.properties.code`, integer; single source of truth — do NOT hardcode a range) [verified-from-schema: refrence/response/response.yaml properties.code] |

## Live Verification

<!-- State a verdict: **LIVE** (captured) or an HONEST live-capture blocker (subscribed on the
resp topic but nothing arrived; endpoint not active; etc.). If LIVE, paste the VERBATIM request
and response and point out that the response `requestId` matches the request `requestId` (the
correlation proof). Mask credentials as ********; a stored password reads back as "". -->

**Verdict: {LIVE | LIVE-CAPTURE BLOCKED}.** {one line: what was sent, on which topic, what came back, and that `requestId` correlated request → response} [verified-on-device: {model} serial {serial}].

```json
{ "command": "{command_name}", "requestId": "{requestId}", "{payloadKey}": { "password": "********" } }
```

```json
{ "command": "{command_name}", "requestId": "{requestId}", "apiVersion": "{V1.0 | V1.1}", "response": { "code": 0, "description": "{description}" } }
```

<!-- If a readback was used to confirm what actually applied (e.g. a partial set), paste the masked
readback here and tag it [verified-on-device: ...]. Record any APPLIED-vs-NOT-APPLIED differences. -->

## Conformance & Spec Notes

<!-- The schema-conformance findings and protocol notes that justify the public doc but are not
end-user reference. Keep wire-vs-convention honest: tag anything not seen on the wire as
"convention"/[inferred-from-live]. -->

- **Schema conformance.** {Does the captured envelope validate against the request/response schemas? Note any divergence — e.g. a SUCCESS response that omits the required `response.code`, or a `code` outside the set documented in `refrence/response/response.yaml`.} [verified-from-schema: response/{control\|dev_mgmt}/{command_name}.json required] [verified-on-device: {model} serial {serial}].
- **Axioms §III topic-block elements (traceability).** Topic String, Role & Action (app publishes `cmnd`; device publishes `resp`), Payload Schema, MQTT v5 Properties (below), Code Payload Example are all present and accounted for [verified-from-schema: commands/{control\|dev_mgmt}/{command_name}.json].
- **Correlation — observed token is `requestId`.** On this device the correlation token is the in-payload `requestId`, echoed in the response on `.../resp/{serial}` (NOT a `.../resp/{requestId}` topic) [verified-on-device: {model} serial {serial}].
- **MQTT v5 Response-Topic & Correlation-Data (convention).** The spec-level request/response convention sets the **Response Topic** and **Correlation Data** properties on the request PUBLISH (MQTT v5.0 OASIS §3.3.2.3.5, §3.3.2.3.6, §4.10 — https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html). Do NOT claim these v5 properties are on the wire unless a capture shows them [inferred-from-live: correlation observed via in-payload `requestId`; v5 properties are the convention mapping].
- **QoS.** {Observed QoS 0/1/2 — fill from capture} [inferred-from-live: {detail}] (do not assert a fixed QoS without a capture).
- **Retain — default FALSE on both `cmnd` and `resp`.** Request/response topics must not be retained: a retained command re-fires on any late-subscribing device, and a retained response is stale-delivered and mis-correlates to the wrong request; retain is reserved for last-known-state/telemetry [inferred-from-live: retain {true|false}].
- **AsyncAPI 3.0 mapping.** This command maps to a single `send` operation **with an Operation Reply Object** — the reply channel (`.../resp/{serial}`) plus `correlationId` (`requestId`) mirror MQTT's Response Topic + Correlation Data (https://www.asyncapi.com/docs/reference/specification/v3.0.0). Per Axioms §V.10 the backing JSON Schema/AsyncAPI spec is the single source of truth [verified-from-schema: commands/{control\|dev_mgmt}/{command_name}.json].

## Open questions / firmware unknowns

<!-- Anything undetermined that a future capture should resolve. Tag [firmware-only-unknown: ...]. -->

- {e.g. exact cause of an observed anomaly is undetermined} [firmware-only-unknown: {detail}].
