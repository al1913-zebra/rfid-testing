---
id: recovery-playbooks
title: Playbooks for getting back online
sidebar_label: Playbooks for getting back online
description: "Step-by-step recovery playbooks (RP-NN) for IOTC failures: re-bootstrap a sled, recover broker connection, reset a stalled inventory, rotate expired cert."
sidebar_custom_props: { emoji: "🛟" }
---

> 📙 **HOW-TO** · **Audience:** All personas in incident response · **Time:** ~10 min per playbook

Nine recovery playbooks. Each is a tested sequence of steps that brings a failing sled back to a known-good state. Pick the playbook that matches your situation. Run each step; verify the success check; move on.

### RP-01: Connect a sled to 123RFID Desktop {#rp-01}

**When:** 123RFID Desktop can't find your sled.

1. Confirm the USB-C cable is data-capable (not charge-only). Many cheap cables are charge-only; substitute a known-good cable.
2. Power-cycle the sled (hold trigger + power for 5 s).
3. Restart 123RFID Desktop.
4. **Success check:** the sled appears in the Discovery view with its serial number and current firmware.

### RP-02: Activate the bootstrap MDM endpoint {#rp-02}

**When:** Phase 2 of Quick Start completed but no MQTT command works.

1. Open 123RFID Desktop, connect to the sled.
2. In the Endpoints tab, locate the MDM endpoint. Confirm `activate: true`.
3. Verify the broker URL, port, protocol match what was reachable in Phase 1.
4. Save and re-activate. The sled may reboot.
5. Watch broker logs for an incoming connection from the sled's IP.
6. **Success check:** subscribe to `<tenantId>/MDM/#` and see at least one publish from the sled.

### RP-03: Verify topic routing {#rp-03}

**When:** [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version) (or any command) returns no response within 5 s.

1. Confirm the publish topic exactly: `<tenantId>/MDM/clients/cmnd/<deviceSerialNumber>`. The reader subscribes to *this exact form*; off-by-one fails silently.
2. With `mosquitto_sub -t '#' -v`, subscribe to everything. Re-publish the command.
3. Find which topic the response arrives on. Update your subscriber to use that exact topic.
4. If still no response, run [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) on the MDM endpoint to confirm `publishTopics` matches what you expect.
5. **Success check:** [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version) returns within 5 s, with `requestId` matching.

### RP-04: Stop inventory cleanly {#rp-04}

**When:** Any operation returning code 5 or 11 ("inventory in progress" or "can't reboot during inventory").

1. Publish [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) with `ctrlOprPayload: { controlType: "RFID", operation: "STOP" }`.
2. Wait for the response. Code 0 = stopped; code 12 = already stopped (also fine).
3. Confirm with [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) — `deviceStatus.radioActivity` should be `INACTIVE`.
4. Retry the original operation.
5. **Success check:** the original operation returns code 0.

### RP-05: Tag data not flowing {#rp-05}

**When:** `control_operation START` returned code 0, but no `dataEVT` arrives.

1. Run [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode). Confirm `profiles` is one of the five supported values, **not `FAST_READ`** (not currently supported).
2. Run [`get_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-post-filter) on the active data endpoint. Look for `reportOperation: EXCLUDE` rules that may be filtering all tags.
3. Run [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config). Confirm the DATA1 (or active data) endpoint has `activate: true` and a `publishTopics` entry.
4. Subscribe to `<tenantId>/DATA1/#` (or the active data topic) with a wildcard. Move tags into the read zone.
5. **Success check:** `dataEVT` events stream past with `data.tagData[].EPCid` matching your tags.

### RP-06: Recover from failed firmware update {#rp-06}

**When:** [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) returned code 13 (Firmware update Failed) or the update appeared to start but didn't complete.

1. Run [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version). The reader may have rolled back to the previous firmware automatically; verify which version is active now.
2. Run [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status). Confirm `batteryStatus.chargePercentage` ≥ 50 and `powerSource` is `WALLCHARGER` or `USB` — battery-low gates firmware updates.
3. Confirm flash space — [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) returns code 8 if insufficient flash. Delete unused certificates or Wi-Fi profiles to free space if needed.
4. Verify the firmware URL is reachable from the sled's network — try downloading it from the sled's Wi-Fi segment.
5. Re-issue [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) with the same URL.
6. Watch `alerts` for `FIRMWARE_UPDATE` progress and completion.
7. **Success check:** `alerts` reports `FIRMWARE_UPDATE` complete. Then [`get_version`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-version) confirms the new firmware.

### RP-07: Diagnose silent-offline state {#rp-07}

**When:** Heartbeats stop arriving but the broker still shows the reader connected.

1. Try a [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status). If it times out, the reader is unreachable.
2. Check `mqttConnEVT` history — was there a DISCONNECTED event that you missed?
3. Inspect broker-side metrics, most brokers expose last-seen-message timestamps per client.
4. Wait for the keep-alive interval (default 60 s; up to 1.5× that before the broker times the client out). The broker should issue an LWT-style disconnect by then.
5. If the reader is genuinely stuck, physically reset (hold trigger + power for 10 s, or remove battery for sleds that allow it).
6. **Success check:** heartbeats resume; `mqttConnEVT` shows CONNECTED.

### RP-08: Reconcile drift {#rp-08}

**When:** A reader's configuration differs from the canonical for its class.

1. Run [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi), capture the Wi-Fi profiles.
2. Run [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config), capture the endpoint list.
3. Run [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode) (note: this is *expected* to differ after every reboot — radio-operation state doesn't persist).
4. Diff each against canonical. For each differing field that *should* be persistent, push with the relevant `set_*` operation.
5. Re-read each surface; verify against canonical.
6. If the diff persists after reconcile, escalate, this implies the local change is overriding the push, possibly via 123RFID Desktop access.
7. **Success check:** every surface matches canonical, save for operating-mode (which is re-applied on every boot anyway).

### RP-09: Stagger and retry rollout {#rp-09}

**When:** Fleet-wide firmware update failed on some readers.

1. Identify which readers failed via `alerts` `FIRMWARE_UPDATE` failure events.
2. Group failures by reason — battery-low, flash-insufficient, firmware-source-unreachable have different fixes.
3. For battery-low readers (FM-FW-04): defer until charged; group them into a charging-station-mounted batch and retry.
4. For flash-insufficient (FM-FW-02): delete unused certificates and Wi-Fi profiles to free flash, then retry.
5. For source-unreachable (FM-FW-03): verify the firmware URL is reachable from the failing readers' Wi-Fi segment. Often a different segment than the successful readers'.
6. Re-issue [`set_os`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-os) against the failed subset only.
7. **Success check:** `alerts` `FIRMWARE_UPDATE` completion events arrive for all targeted readers within a sensible window.

## Symptom-area triage flows

When a symptom doesn't map cleanly to a playbook above, start from the matching area below. Each flow consolidates the former per-area troubleshooting how-tos: a quick cause-by-symptom list and a decision tree.

### Connection {#connection}

- **Reader never appears on the broker** — confirm it is powered on and on Wi-Fi, that the network resolves the broker hostname, and that the [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) credentials match the broker.
- **Connects then immediately disconnects** (`mqttConnEVT` CONNECTED → DISCONNECTED seconds later) — auth failure (check broker logs), ACL failure on the topic family, or the last-will firing on a too-aggressive keep-alive.
- **Intermittent disconnects** — Wi-Fi roaming between APs (Wi-Fi RSSI is *not* published in any IOTC event — read it from 123RFID Desktop or the host), or keep-alive too aggressive for the network (raise 30 s → 60 s).
- **TLS handshake fails** (never reaches `mqttConnEVT: CONNECTED`) — installed CA doesn't match the broker's server-certificate chain, the certificate has expired, or clock skew > 24 h fails validation.
- **No `mqttConnEVT` ever** — a firewall is blocking 8883; test with `nc -zv broker.example.com 8883` and coordinate with network operations.

```d2
classes: {
  good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } }
  bad:  { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
S: Connection symptom
Q1: "mqttConnEVT\never received?" { shape: diamond }
Q2: "Port open?\nnc -zv host 8883" { shape: diamond }
Q3: "LWT\nreceived?" { shape: diamond }
FW: Firewall / port block { class: bad }
Cred: "Bad credentials /\ncert chain" { class: bad }
Drop: "Network drop;\ncheck signal" { class: bad }
Sof: "Soft failure;\nget_status + gap-detect" { class: bad }
S -> Q1
Q1 -> Q2: No
Q1 -> Q3: "Yes,\nthen DISCONNECTED"
Q2 -> FW: No
Q2 -> Cred: Yes
Q3 -> Drop: Yes
Q3 -> Sof: No

```

### RFID reads {#rfid}

- **Operation starts but no tags read** — confirm tags are in the field; check [`get_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-post-filter) for an over-restrictive include filter; check [`get_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-operating-mode) `transmitPower`; confirm the regulatory region (a wrong region can disable the radio).
- **Very low read rate** — tag orientation (linear tags read poorly perpendicular to the antenna), large tag populations needing session tuning (S0 vs S1), or per-tag metadata overhead (disable `TID`/`USER` in `tagMetaDataToEnable` you don't need).
- **Unexpected tags in results** — filter pattern/offset/length wrong, or a wildcard subscription delivering another reader's tags (check the serial in the topic).
- **Operation stops unexpectedly** — radio/firmware fault (`get_status` reports `radioConnection: DISCONNECTED` or code 3 → reboot, then support), battery below threshold, or the trigger released when `radioStopConditions.trigger` is `RELEASED` (normal).

```d2
classes: {
  good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } }
  bad:  { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
S: RFID symptom
Q1: "control_operation\nSTART accepted?" { shape: diamond }
Stop: "Already running;\nsend STOP first" { class: bad }
Cfg: "Check operating-mode\nconfig" { class: bad }
Q2: "dataEVT events\narriving?" { shape: diamond }
Q3: "Post-filter\nexcluding tags?" { shape: diamond }
Filt: Adjust post-filter { class: bad }
Q4: "Tag in\nread range?" { shape: diamond }
Range: "Move tags into range;\ncheck antenna power" { class: bad }
Rad: "Radio / firmware fault;\nreboot; else support" { class: bad }
S -> Q1
Q1 -> Stop: "No, code 11"
Q1 -> Cfg: "No, other code"
Q1 -> Q2: Yes
Q2 -> Q3: No
Q3 -> Filt: Yes
Q3 -> Q4: No
Q4 -> Range: No
Q4 -> Rad: Yes

```

### Tag data {#tag-data}

- **No tag-data events** — subscription topic must match the configured channel (`data1event` vs `data2event`) and serial number; confirm the reader is actually running (`get_status.deviceStatus.radioActivity: ACTIVE`).
- **Empty or partial payloads** — fields like `RSSI` are only present when enabled in `tagMetaDataToEnable`; compact verbosity in [`config_events`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-events) omits default-value fields.
- **Duplicate reads** — expected for raw reporting; deduplicate in the application per [Process tag data](/rfid/tag-data/process).
- **Timestamp drift** — the clock drifted beyond NTP range; check `get_status.deviceStatus.ntp.reach` and `systemTime`, and reboot to force a re-sync.

```d2
classes: {
  good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } }
  bad:  { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
S: Tag-data symptom
Q1: Events arriving? { shape: diamond }
RFID: See RFID-symptom tree
Q2: "Timestamps\ncorrect?" { shape: diamond }
Clock: "Clock drift;\ncheck NTP sync" { class: bad }
Q3: "Duplicates\nexcessive?" { shape: diamond }
Dedupe: "Enable Unique-Tag\nreporting / app-side dedupe" { class: bad }
Q4: "Expected fields\npresent?" { shape: diamond }
Meta: "Update tagMetaDataToEnable\nvia set_operating_mode" { class: bad }
OK: Data flowing OK { class: good }
S -> Q1
Q1 -> RFID: No
Q1 -> Q2: Yes
Q2 -> Clock: No
Q2 -> Q3: Yes
Q3 -> Dedupe: Yes
Q3 -> Q4: No
Q4 -> Meta: No
Q4 -> OK: Yes

```

### Battery & power {#battery}

- **Rapid drain during operations** — expected with extra per-tag metadata (`RSSI`/`TID`/`USER`) or continuous inventory; if unexpected, check `heartbeatEVT.data.batteryAlert.stateOfHealth` (degraded batteries drain faster) and consider spot-scan over continuous-read.
- **Unexpected shutdowns** — inspect the last `heartbeatEVT` and `alerts` (`id: BATTERY`/`POWER`) before shutdown; if the battery looked healthy, contact support (possible hardware fault).
- **Health degradation over time** — normal cycle-count wear (replace below ~80%); accelerated wear points to high-temperature charging.
- **Optimal power configuration** — lengthen MQTT keep-alive (60 s → 300 s), lengthen the heartbeat interval beyond its default when telemetry resolution matters less than battery, stop inventory when idle, and cradle-charge on breaks.

```d2
classes: {
  good: { style: { fill: "#e6f4ea"; stroke: "#1e8e3e"; font-color: "#137333" } }
  warn: { style: { fill: "#fef7e0"; stroke: "#f9ab00"; font-color: "#b06000" } }
  bad:  { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } }
}
title: "Battery drain over a shift (example)" { near: top-center; shape: text; style.font-size: 18; style.bold: true }
direction: down
H08: "08:00 - 100%" { class: good }
H10: "10:00 - 84%" { class: good }
H12: "12:00 - 68%" { class: good }
H14: "14:00 - 51%" { class: warn }
H16: "16:00 - 33%" { class: warn }
H18: "18:00 - 12%" { class: bad }
H08 -> H10 -> H12 -> H14 -> H16 -> H18

```

### Out of scope

- **Why the failures happened**: explanation belongs in the matching FM page or concept chapter.
- **Recovery from regulatory-region misconfiguration**: requires factory reset + 123RFID Desktop reboot; out of scope for routine recovery.

**Related:** 📘 [Something's broken?](/diagnose/symptoms) · 📘 [Where things fail](/diagnose/where-things-fail) · 📘 [Things people get wrong about IOTC](/diagnose/misconceptions)
