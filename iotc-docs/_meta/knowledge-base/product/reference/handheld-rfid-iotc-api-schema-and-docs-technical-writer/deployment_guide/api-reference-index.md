# API Reference — index

> Was a 0-byte placeholder. This points at where the API surface is actually defined.

The IOTC MQTT API surface (this SoT folder) is organised as:

- **Operation prose:** `../operation_descriptions/*.md` — one file per command/event.
- **Tag groups / sub-tags:** `../exported_tags/*.json` + `../tag_descriptions/*.md` (4 groups, 13 sub-tags) — the structure mirrored by the published `docs/reference/api-overview.md`.
- **Request/response envelopes:** `../schemas/models/*.v1.1.json` (+ `../schemas/refrence/response/response.yaml`).
- **Per-command/payload/response schemas:** `../schemas/{commands,response,refrence}/**`.
- **Event schemas:** `../schemas/events/*.json` + `../schemas/refrence/events/*.yaml`.
- **Error codes:** `../error_codes.json` → published as `docs/reference/errors/codes.md`.

Deployment walkthrough (Quick Start spine): `./README.md`, `./prerequisites.md`, `./phase1-environment-setup.md` … `./phase5-endpoint-configuration.md`.
