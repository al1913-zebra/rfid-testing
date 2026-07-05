# MQTT Operations — Categorization, Domains & Test/Validation Sequence
## Zebra IoT Connector for Handheld Readers (RFD40 / RFD90)

> All **27 operations** in `openapi.json` are MQTT operations. This document categorizes them, groups them by functional **domain**, and defines the recommended **dependency-ordered sequence to test and validate each one**, with the exact topic to **publish** the request to and the topic the **response/event** is observed on.

**Source of truth & grounding:** `openapi.json` + the per-operation schema files, the consolidated `MQTT_TOPIC_MAP.md`, the per-operation verified test docs (`*.md`, live device serial `RFD40-24190525100255`, tenant `zebra`, broker `192.168.1.6:1883`), and `BLOCKERS_AND_INCONSISTENCIES.md`. Where the schema-era topic map and the live capture disagree, the **live-observed topic is used** (see §7).

---

## 1. Topic convention

Topics are configured **per endpoint** (`configuration.mqttParams.publishTopics`/`subscribeTopics`), not globally. The device **subscribes** to a `.../cmnd` topic (publish requests there) and **publishes** to `.../resp` (command replies), `.../event` (alerts + heartbeat), and `.../rfid` (tag data + connection events). On the wire each base is wrapped as:

```
{tenantId}/{EP_TYPE}/clients/{cmnd|resp|event|rfid}/{serialNumber}
example:  zebra/MDM/clients/cmnd/RFD40-24190525100255
```

| Plane (`EP_TYPE`) | Purpose | Request topic | Reply / emission topic |
|---|---|---|---|
| `CTRL` | Control plane — RFID control, operating mode, post-filter | `CTRL/clients/cmnd` | `CTRL/clients/resp` |
| `MDM` (a.k.a. `MGMT`) | Device-management plane | `MDM/clients/cmnd` | `MDM/clients/resp` |
| `MDM` event | Async alerts + heartbeat | — (device-emitted) | `MDM/clients/event` |
| `{EP}` rfid | Connection events (per endpoint) | — (device-emitted) | `{EP}/clients/rfid` |
| `DATA` | Tag-data stream | — (device-emitted) | `DATA/clients/data1event` |

---

## 2. Categorization

### 2.1 By message pattern (Command vs Event, and sub-type)

All operations are MQTT. **22 are commands** (publish a request, await a reply on `.../resp`); **5 are events** (device-pushed, no request).

| Sub-type | Pattern | Count | Operations |
|---|---|---|---|
| Read command | Command — non-mutating query (request/response) | 10 | `get\_operating\_mode`, `get\_post\_filter`, `get\_config`, `get\_current\_region`, `get\_endpoint\_config`, `get\_eth`, `get\_installed\_certificate`, `get\_status`, `get\_version`, `get\_wifi` |
| Write/Config command | Command — mutates persistent state (request/response) | 9 | `set\_operating\_mode`, `set\_post\_filter`, `config\_endpoint`, `config\_events`, `delete\_certificate`, `delete\_wifi\_profile`, `install\_certificate`, `set\_config`, `set\_wifi` |
| Action command | Command — triggers an action / lifecycle change (request/response) | 3 | `control\_operation`, `reboot`, `set\_os` |
| Async event | Event — device-pushed, no request | 5 | `alerts`, `alert\_short`, `dataEVT`, `heartBeatEVT`, `mqttConnEVT` |

### 2.2 By plane

| Plane | Count | Operations |
|---|---|---|
| CTRL | 5 | `control\_operation`, `get\_operating\_mode`, `get\_post\_filter`, `set\_operating\_mode`, `set\_post\_filter` |
| MGMT/MDM | 17 | `config\_endpoint`, `config\_events`, `delete\_certificate`, `delete\_wifi\_profile`, `get\_config`, `get\_current\_region`, `get\_endpoint\_config`, `get\_eth`, `get\_installed\_certificate`, `get\_status`, `get\_version`, `get\_wifi`, `install\_certificate`, `reboot`, `set\_config`, `set\_os`, `set\_wifi` |
| EVENT | 4 | `alerts`, `alert\_short`, `heartBeatEVT`, `mqttConnEVT` |
| DATA | 1 | `dataEVT` |

> The four `EVENT`-plane events split by topic: `heartBeatEVT`, `alerts`, `alert_short` ride the `MDM/clients/event` topic, whereas `mqttConnEVT` rides the per-endpoint `{EP}/clients/rfid` topic (NOT the `event` topic). `dataEVT` is its own `DATA` plane.

### 2.3 By functional domain

| # | Domain | Count | Operations |
|---|---|---|---|
| 1 | Connectivity & Session | 1 | `mqttConnEVT` |
| 2 | Device Identity & Version | 1 | `get\_version` |
| 3 | Health, Status & Monitoring | 5 | `get\_config`, `get\_status`, `alerts`, `alert\_short`, `heartBeatEVT` |
| 4 | Network (Wi-Fi/Ethernet) | 4 | `delete\_wifi\_profile`, `get\_eth`, `get\_wifi`, `set\_wifi` |
| 5 | Regulatory & Region | 1 | `get\_current\_region` |
| 6 | Security & Certificates | 3 | `delete\_certificate`, `get\_installed\_certificate`, `install\_certificate` |
| 7 | Endpoint & Event Configuration | 3 | `config\_endpoint`, `config\_events`, `get\_endpoint\_config` |
| 8 | RFID Operating Mode & Filtering | 4 | `get\_operating\_mode`, `get\_post\_filter`, `set\_operating\_mode`, `set\_post\_filter` |
| 9 | RFID Inventory Control & Tag Data | 2 | `control\_operation`, `dataEVT` |
| 10 | Bulk Configuration & Firmware | 3 | `reboot`, `set\_config`, `set\_os` |

---

## 3. Per-operation topic reference (all 27)

| Operation | Type | Sub-type | Plane | Domain | Publish (request) topic | Response / event topic |
|---|---|---|---|---|---|---|
| `control\_operation` | Command | Action command | CTRL | RFID Inventory Control & Tag Data | `CTRL/clients/cmnd  ->  zebra/CTRL/clients/cmnd/{serial}` | `CTRL/clients/resp  ->  zebra/CTRL/clients/resp/{serial}` |
| `get\_operating\_mode` | Command | Read command | CTRL | RFID Operating Mode & Filtering | `CTRL/clients/cmnd  ->  zebra/CTRL/clients/cmnd/{serial}` | `CTRL/clients/resp  ->  zebra/CTRL/clients/resp/{serial}` |
| `get\_post\_filter` | Command | Read command | CTRL | RFID Operating Mode & Filtering | `CTRL/clients/cmnd  ->  zebra/CTRL/clients/cmnd/{serial}` | `CTRL/clients/resp  ->  zebra/CTRL/clients/resp/{serial}` |
| `set\_operating\_mode` | Command | Write/Config command | CTRL | RFID Operating Mode & Filtering | `CTRL/clients/cmnd  ->  zebra/CTRL/clients/cmnd/{serial}` | `CTRL/clients/resp  ->  zebra/CTRL/clients/resp/{serial}` |
| `set\_post\_filter` | Command | Write/Config command | CTRL | RFID Operating Mode & Filtering | `CTRL/clients/cmnd  ->  zebra/CTRL/clients/cmnd/{serial}` | `CTRL/clients/resp  ->  zebra/CTRL/clients/resp/{serial}` |
| `config\_endpoint` | Command | Write/Config command | MGMT/MDM | Endpoint & Event Configuration | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `config\_events` | Command | Write/Config command | MGMT/MDM | Endpoint & Event Configuration | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `delete\_certificate` | Command | Write/Config command | MGMT/MDM | Security & Certificates | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `delete\_wifi\_profile` | Command | Write/Config command | MGMT/MDM | Network (Wi-Fi/Ethernet) | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_config` | Command | Read command | MGMT/MDM | Health, Status & Monitoring | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_current\_region` | Command | Read command | MGMT/MDM | Regulatory & Region | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_endpoint\_config` | Command | Read command | MGMT/MDM | Endpoint & Event Configuration | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_eth` | Command | Read command | MGMT/MDM | Network (Wi-Fi/Ethernet) | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_installed\_certificate` | Command | Read command | MGMT/MDM | Security & Certificates | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_status` | Command | Read command | MGMT/MDM | Health, Status & Monitoring | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_version` | Command | Read command | MGMT/MDM | Device Identity & Version | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `get\_wifi` | Command | Read command | MGMT/MDM | Network (Wi-Fi/Ethernet) | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `install\_certificate` | Command | Write/Config command | MGMT/MDM | Security & Certificates | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `reboot` | Command | Action command | MGMT/MDM | Bulk Configuration & Firmware | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `set\_config` | Command | Write/Config command | MGMT/MDM | Bulk Configuration & Firmware | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `set\_os` | Command | Action command | MGMT/MDM | Bulk Configuration & Firmware | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `set\_wifi` | Command | Write/Config command | MGMT/MDM | Network (Wi-Fi/Ethernet) | `MDM/clients/cmnd  ->  zebra/MDM/clients/cmnd/{serial}` | `MDM/clients/resp  ->  zebra/MDM/clients/resp/{serial}` |
| `alerts` | Event | Async event | EVENT | Health, Status & Monitoring | `(device-emitted; no request)` | `MDM/clients/event  ->  zebra/MDM/clients/event/{serial}` |
| `alert\_short` | Event | Async event | EVENT | Health, Status & Monitoring | `(device-emitted; no request)` | `MDM/clients/event  ->  zebra/MDM/clients/event/{serial} (SOTI short form)` |
| `dataEVT` | Event | Async event | DATA | RFID Inventory Control & Tag Data | `(device-emitted; no request)` | `DATA/clients/data1event  ->  zebra/DATA/clients/data1event/{serial}` |
| `heartBeatEVT` | Event | Async event | EVENT | Health, Status & Monitoring | `(device-emitted; no request)` | `MDM/clients/event  ->  zebra/MDM/clients/event/{serial}` |
| `mqttConnEVT` | Event | Async event | EVENT | Connectivity & Session | `(device-emitted; no request)` | `per active endpoint, one on each {EP}/clients/rfid:  zebra/MDM/clients/rfid/{serial} (MDM EP)  +  zebra/CTRL/clients/rfid/{serial} (CTRL EP)` |

---

## 4. Recommended test & validation sequence

**Sequencing principles:** (1) subscribe & observe **connection** first; (2) **read before write** — capture a baseline; (3) **provision before use** — CTRL/DATA planes need `config_endpoint`; (4) **enable + reboot before observe** — `config_events` needs a reboot, which must precede `set_operating_mode` (a reboot wipes the operating mode); (5) **adds before deletes**; (6) **destructive last** — firmware/reboot end the session.

> The sequence has **29 steps over 27 unique operations**: `control_operation` runs twice (START / STOP), `reboot` runs twice (apply event-config / final teardown), and each `set_*` is followed by its matching `get_*` read-back.


### PHASE 0 — Passive connection observation

*Subscribe a standalone broker client (wildcard `#`) BEFORE the device connects so you capture device-origin traffic. Connection events fire on connect with no command sent.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 1 | **mqttConnEVT** — Observe the connection event emitted by each active endpoint as the device attaches. | `per active endpoint, one on each {EP}/clients/rfid:  zebra/MDM/clients/rfid/{serial} (MDM EP)  +  zebra/CTRL/clients/rfid/{serial} (CTRL EP)` | Broker reachable; a `#` subscriber attached independently of the device. | One `mqttConnEVT` per active endpoint on `.../rfid` (MDM and CTRL); contains `mqttVersion`/`apiVersion`. |

### PHASE 1 — Identity & liveness reads (read-only, MDM)

*Cheapest, safest calls — prove the device session is alive and answering before anything mutating. These 8-ish read-only MDM commands are the ones empirically confirmed returning `code 0`.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 2 | **get\_version** — Confirm device identity: serial, model, SKU, firmware. | `MDM/clients/cmnd` → `MDM/clients/resp` | Device MQTT session attached to the MDM broker (subscribed to `MDM/clients/cmnd`). | `response.code 0` + version object (serial/model/firmware). |
| 3 | **get\_status** — Confirm health snapshot: power, radio, battery, temperature. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + `deviceStatus` object. |

### PHASE 2 — Configuration-state baseline reads (read-only, MDM)

*Capture the full current configuration BEFORE any mutation so every later `set_*` has a known baseline and a rollback reference.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 4 | **get\_current\_region** — Read regulatory region. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + region config. |
| 5 | **get\_eth** — Read Ethernet configuration. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + ethernet details. |
| 6 | **get\_wifi** — Read Wi-Fi configuration / profiles. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + wifi profiles. |
| 7 | **get\_installed\_certificate** — Read installed certificates inventory. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + installed-cert list. |
| 8 | **get\_endpoint\_config** — Read active + saved endpoint configuration (baseline before provisioning). | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + active endpoints & saved names. |
| 9 | **get\_config** — Read the complete consolidated device configuration. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | `response.code 0` + full config blob. |

### PHASE 3 — Endpoint provisioning (MDM, state-change)

*The CTRL and DATA planes do not exist until provisioned. Control commands and the tag-data stream depend on this step. ⚠ The code-25 global publish-topic limit (max 3 publish topics; an MDM endpoint already holds 3) can block adding CTRL/DATA over MQTT — provisioning via 123RFID Desktop may be required (this is how CTRL\_EP / DATA1\_EP were active in the live session).*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 10 | **config\_endpoint** — Add a CTRL endpoint (CTRL\_EP) and a DATA endpoint (DATA1\_EP); optionally modify/delete endpoints. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session; free publish-topic budget OR 123RFID Desktop provisioning (code 25 limit). | Re-run `get\_endpoint\_config` and diff: CTRL\\_EP and DATA1\\_EP now active. |

### PHASE 4 — Event enablement + apply reboot (MDM, state-change)

*`config_events` selects which events emit, but **requires a reboot to take effect**. That reboot must happen HERE — before `set_operating_mode` — because a reboot resets the operating mode to default (so setting the mode earlier would be wiped).*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 11 | **config\_events** — Enable heartbeat / alert events and set the heartbeat interval. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session attached. | Re-run `get\_endpoint\_config` and diff `eventConfiguration`; full effect after the reboot below. |
| 12 | **reboot** — **Apply reboot** — activate the event configuration. Re-fires `mqttConnEVT` on reconnect. | `MDM/clients/cmnd` → `MDM/clients/resp` | No RFID inventory in progress; config\_events submitted. | Device reconnects (connect rc=0); `mqttConnEVT` re-observed; heartbeat/alerts begin flowing. |

### PHASE 5 — Control-plane reads (read-only, CTRL)

*Now that CTRL\_EP exists, read the control-plane state. These route ONLY over CTRL — over MDM they time out.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 13 | **get\_operating\_mode** — Read current operating mode (profiles, radio start/stop, query, tag metadata). | `CTRL/clients/cmnd` → `CTRL/clients/resp` | Active CTRL endpoint; CTRL session. | `response.code 0` (note: success may OMIT `code`) + `operatingMode` object. |
| 14 | **get\_post\_filter** — Read current post-filter set. | `CTRL/clients/cmnd` → `CTRL/clients/resp` | Active CTRL endpoint. | `response.code 0` + post-filter config. |

### PHASE 6 — Control-plane writes + read-back verify (CTRL)

*Mutate control state, then immediately re-read with the matching getter to prove the write. Do this AFTER the apply-reboot so the mode persists for the inventory test.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 15 | **set\_operating\_mode** — Set operating mode (profile, radio conditions, query, tag metadata). ⚠ Persisted mode is lost on the next reboot. | `CTRL/clients/cmnd` → `CTRL/clients/resp` | Active CTRL endpoint; apply-reboot already done. | Re-run `get\_operating\_mode` and diff the submitted vs stored mode. |
| 16 | **set\_post\_filter** — Set / add / delete a post-filter (e.g. EPC prefix/suffix/REGEX). | `CTRL/clients/cmnd` → `CTRL/clients/resp` | Active CTRL endpoint. | Re-run `get\_post\_filter` and confirm; out-of-enum `dataEpType` returns `code 23`. |

### PHASE 7 — Inventory & data-plane (CTRL command + DATA stream)

*Start a real RFID inventory and validate the tag-data stream, then stop it. ⚠ Confirm the operating mode is READ-ONLY (no armed WRITE/LOCK/KILL access operations) before START.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 17 | **control\_operation** — **START** an RFID inventory (`controlType RFID`, `operation START`). | `CTRL/clients/cmnd` → `CTRL/clients/resp` | Active CTRL endpoint (command) + active DATA endpoint (stream); read-only mode confirmed. | CTRL response `description "Success"` (success OMITS `code`); tag reads begin. |
| 18 | **dataEVT** — Observe the tag-data stream (EPCid/eventNum/peakRssi/seenCount; fields gated by `tagMetaDataToEnable`). | `DATA/clients/data1event  ->  zebra/DATA/clients/data1event/{serial}` | Inventory STARTed; DATA1\\_EP active; subscribed to the DATA topic. | Messages arrive on `zebra/DATA/clients/data1event/{serial}`; `eventNum` increments; `type` echoes the mode profile. |
| 19 | **control\_operation** — **STOP** the inventory (`operation STOP`). | `CTRL/clients/cmnd` → `CTRL/clients/resp` | Inventory in progress. | Stream ceases (allow ~2.9s trailing flush); idle STOP returns `code 12` "No Radio Operation in Progress". |

### PHASE 8 — Asynchronous event validation (EVENT, MDM)

*With events enabled and the apply-reboot done, validate the device-pushed event streams on the MDM event topic.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 20 | **heartBeatEVT** — Observe periodic heartbeat (uptime + inventory/battery metadata) at the configured interval. | `MDM/clients/event  ->  zebra/MDM/clients/event/{serial}` | `config\_events` enabled + apply-reboot done. | Heartbeat arrives on `zebra/MDM/clients/event/{serial}` at the interval. |
| 21 | **alerts** — Observe system alerts (battery / power / network etc.). | `MDM/clients/event  ->  zebra/MDM/clients/event/{serial}` | `config\_events` enabled. | Alert events on `zebra/MDM/clients/event/{serial}` (e.g. `id=BATTERY/POWER/NETWORK\_EVENT`). |
| 22 | **alert\_short** — Observe SOTI short-form alerts (no detail body). | `MDM/clients/event  ->  zebra/MDM/clients/event/{serial} (SOTI short form)` | `config\_events` enabled. | Short alert events on the MDM event topic. |

### PHASE 9 — Network & security mutations (MDM, state-change — adds before deletes)

*Mutating connectivity/credentials risks the session, so do these late, AND add before delete (never delete the asset you are connected through). ⚠ `set_wifi connect:true` can sever connectivity; `delete_wifi_profile` is blocked for the active SSID; full cert verification needs a TLS (8883) endpoint.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 23 | **install\_certificate** — Install a certificate (PEM/PFX). | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session. Full verify needs a TLS endpoint (plain-MQTT can only check the envelope). | Re-run `get\_installed\_certificate`; new cert listed. |
| 24 | **set\_wifi** — Add / modify a Wi-Fi profile (IPv4/DHCP). ⚠ `connect:true` switches the active AP. | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session. Avoid disconnecting the management link. | Re-run `get\_wifi`; new/updated profile present. |
| 25 | **delete\_certificate** — Delete a (non-essential) certificate. | `MDM/clients/cmnd` → `MDM/clients/resp` | A deletable certificate present (ideally the one just installed). | Re-run `get\_installed\_certificate`; cert gone. |
| 26 | **delete\_wifi\_profile** — Delete a NON-active Wi-Fi profile. | `MDM/clients/cmnd` → `MDM/clients/resp` | A non-active profile present; active-SSID is protected from deletion. | Re-run `get\_wifi`; profile gone (active SSID still present). |

### PHASE 10 — Bulk configuration (MDM, state-change)

*Exercise the consolidated setter once the individual setters are proven, so a failure is easy to localize.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 27 | **set\_config** — Apply a complete configuration bundle (region, eth, wifi, endpoints, events/alerts). | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session; individual `set\_*` paths validated first. | Re-run `get\_config` and diff against the submitted bundle. |

### PHASE 11 — Firmware & lifecycle (destructive — run LAST)

*These end or replace the session; run only after everything else is validated.*

| Step | Operation | Publish → Response/Event topic | Prerequisite | Validation check |
|---|---|---|---|---|
| 28 | **set\_os** — Initiate a firmware update (downloads + flashes new OS). | `MDM/clients/cmnd` → `MDM/clients/resp` | MDM session; valid firmware source. | FW-update progress via alerts; device reboots into new firmware. |
| 29 | **reboot** — **Final teardown reboot** — warm reset; session-severing. | `MDM/clients/cmnd` → `MDM/clients/resp` | No inventory in progress. | Device reconnects to the previous server; `mqttConnEVT` re-fires. |

---

## 5. Critical dependencies & caveats

- **CTRL & DATA planes require provisioning.** `control_operation`, `get/set_operating_mode`, `get/set_post_filter` (CTRL) and `dataEVT` (DATA) only work after `config_endpoint` adds the respective endpoint. Control commands time out if sent over MDM.
- **Code-25 publish-topic limit.** Each endpoint allows up to 3 publish topics; an existing MDM endpoint holding 3 blocks adding CTRL/DATA over MQTT. Provision via 123RFID Desktop or free a topic first.
- **`config_events` needs a reboot** to take effect — and that reboot must run **before** `set_operating_mode`, because a reboot resets the operating mode to default (anything set earlier is lost).
- **`control_operation` START is a real radio op.** If destructive access operations (WRITE/LOCK/KILL) are armed in the operating mode, START executes them against tags in range. Confirm a read-only mode before START. It is reversible via STOP (allow ~2.9 s trailing read).
- **Connectivity/credential mutations are risky.** `set_wifi connect:true` can switch the active AP and sever the link; `delete_wifi_profile` cannot delete the active SSID; full `install_certificate` verification needs a TLS (8883) endpoint (plain MQTT validates only the envelope).
- **Success-omits-`code` quirk.** Several commands (`control_operation`, `get/set_operating_mode`, `set_post_filter`) return `{"description":"Success"}` with `response.code` OMITTED on success — verify by `description` + echoed `requestId`, not by `code 0`. Error paths DO carry a code (e.g. idle STOP → `code 12`; out-of-enum → `code 23`).
- **Firmware/reboot end the session.** `set_os` and `reboot` reconnect the device (re-firing `mqttConnEVT`); run them last.

---

## 6. Topic-source reconciliation (transparency)

Where the schema-era `MQTT_TOPIC_MAP.md` and the live device captures disagree, the **live-observed** topic is authoritative and is what this document uses:

| Event | `MQTT_TOPIC_MAP.md` (schema-era) | Live-observed (per-op `.md`) | Used here |
|---|---|---|---|
| `dataEVT` | `DATA1/clients/rfid` | `DATA/clients/data1event` → `zebra/DATA/clients/data1event/{serial}` | **live** |
| `mqttConnEVT` | `MGMT_EVT/clients/event` | per-endpoint `{EP}/clients/rfid` (`zebra/MDM/...` AND `zebra/CTRL/...`) | **live** |
| `heartBeatEVT` | `MDM/clients/event` | `zebra/MDM/clients/event/{serial}` | agree |
| `alerts` | `MGMT_EVT/clients/event` | `zebra/MDM/clients/event/{serial}` (BATTERY/POWER/NETWORK observed) | **live** |

> Note: `BLOCKERS_AND_INCONSISTENCIES.md` describes an earlier *mock-fallback* run ("no `[verified-on-device]` facts"); it is superseded for topics by the later live session (serial `24190525100255`, with `MDM_REMOTE`/`CTRL_EP`/`DATA1_EP` active) recorded in the per-operation docs. Its dependency facts (CTRL/DATA need provisioning, code-25 limit) remain valid.

---

*27 operations — 22 commands (10 read, 9 write/config, 3 action) + 5 events — across CTRL, MDM, DATA and EVENT planes. Test sequence: 29 steps, P0→P11.*
