# Phase 0/2 — Network Preflight & Broker Setup

## Decision (per CANONICAL LIVE-MDM PREDICATE): **MOCK FALLBACK**
- **Condition (1) TCP gate — PASS** (but via the laptop's own broker, see caveat).
- **Condition (2) device-session attachment — FAIL** (no device-originated response/event to well-formed read-only commands).
- ⇒ **No `[verified-on-device]` labels emitted this run.** This is a **CONNECTIVITY BLOCKER, not a failure.**

## Tool-availability preflight (verbatim)
| Tool | Result |
|------|--------|
| `python --version` | **Python 3.12.10** ✓ |
| `node --version` | **NOT FOUND** → `redocly build-docs` + `add_custom_css.py` cannot run (HTML render blocked) |
| `npx` / `redocly` / `docker` | **NOT FOUND** |
| `mosquitto` (PATH) | not on PATH, but **`C:\Program Files\Mosquitto\mosquitto.exe`, `mosquitto_pub.exe`, `mosquitto_sub.exe` present** ✓ |
| `python -c "import yaml, paho.mqtt.client, jsonschema"` | **ok (all three)** ✓ |
| `jinja2` | absent — **irrelevant** (`generate_openapi.py` imports only `json/os/yaml`) |

**Branch:** openapi.json regeneration works; **`index.html` regeneration is BLOCKED (no node/npx)** → environment blocker, not a failure. A local broker is available (Mosquitto already running), so Phase 3/4 use the broker path (mock).

## Network-reachability preflight (verbatim)
```
IPv4 (Get-NetIPAddress):
  169.254.225.213 /16  Bluetooth Network Connection   (APIPA)
  169.254.225.162 /16  Local Area Connection* 10       (APIPA)
  169.254.251.47  /16  Local Area Connection* 9        (APIPA)
  169.254.2.142   /16  Ethernet                        (APIPA)
  192.168.1.6     /24  Wi-Fi   <-- the only routable IPv4
  127.0.0.1       /8   Loopback

WLAN: SSID=Airtel_The_LAN_Before_Time  State=connected  Band=5GHz
      laptop Wi-Fi MAC = c8:6e:08:3e:50:cb   AP BSSID = c0:2e:5f:cf:4b:40

Test-NetConnection 192.168.1.6 -Port 1883:  TcpTestSucceeded = True  (SourceAddress 192.168.1.6)
Test-Connection 192.168.1.5 -Count 2:        Success, Success  (device pings)
Get-NetNeighbor 192.168.1.5:                 LinkLayerAddress = 8C-D5-4A-1C-98-24   State = Probe
Get-NetRoute:  192.168.1.0/24 -> on-link (Wi-Fi);  0.0.0.0/0 -> 192.168.1.1 (Wi-Fi)
Local 1883 listener:  0.0.0.0:1883  OwningProcess PID 8244  ProcessName = mosquitto
```

### Segmentation / multi-homing analysis
- **No segmentation.** The laptop's only routable IPv4 is **`192.168.1.6/24`** on Wi-Fi — i.e. the laptop **IS the configured broker host** and is on the **same `192.168.1.0/24` LAN** as the device (`192.168.1.5`) and broker (`192.168.1.6`). The 169.254.x entries are APIPA (no DHCP) on idle adapters, not a second routable network. The earlier-recorded `10.239.36.0/24` state is **stale and no longer in effect**.
- **Device MAC discrepancy (resolved):** the provided device Wi-Fi MAC `C0:2E:5F:CF:4B:3F` matches the **AP BSSID range** (`c0:2e:5f:cf:4b:40`), so it is the **router/AP**, not the sled. The ARP-resolved L2 address for `192.168.1.5` is **`8C-D5-4A-1C-98-24`** — trust this as the sled's true MAC. ARP `State=Probe` counts as PRESENT (diagnostic only).
- **Broker-attach caveat applies:** because the laptop *is* `192.168.1.6` and runs Mosquitto locally, `TcpTestSucceeded` succeeds via loopback **even if the RFD40 is not attached** — so condition (2) is mandatory.

## Broker identity & auth
- **Broker:** existing **local Mosquitto v2.1.2**, listening `0.0.0.0:1883`, PID **8244** (process `mosquitto`), uptime ~30948 s at probe time.
- **Auth:** anonymous **accepted** (paho `on_connect rc=0`). No username/password was needed/supplied.

## Device-session-attach evidence (condition 2) — verbatim
1. **18 s passive listen** on `$SYS/#` + `MDM/clients/#` + `#`: `$SYS/broker/clients/connected = 3` (2 clients beyond the probe), but **zero** application-topic messages — **no device-originated `MDM/clients/*` traffic**.
2. **Read-only `get_version` round-trip** (well-formed `{command,requestId}` → `MDM/clients/cmnd`, subscribed to `resp`+`event`, 20 s): **0 messages** on `resp`/`event`. No correlated device response.
3. **Confirmation `get_version` + `get_status` over full `#`** (25 s): the only messages received were the harness's **own published commands echoed back on `MDM/clients/cmnd`** (correlated on `requestId` but they are *command* envelopes with `response.code = None`, NOT device responses). Still **zero** traffic on `MDM/clients/resp|event`.

**Verdict:** a reachable broker port with other clients connected does **not** prove the RFD40 processes commands. Condition (2) is **not satisfied** → MOCK FALLBACK; the identity of the 2 other connected clients is unknown (open question for the blockers log).

## Test hub actually used
- **LOCAL / MOCK hub = the running Mosquitto on `192.168.1.6:1883`** (loopback to the laptop's own broker). Loopback publish/subscribe round-trips succeed (Phase 3 wildcard capture records 12 `cmnd→resp` round-trips). All results are `[verified-via-local-mock: routing/shape only]`.

## Remediation options to reach a LIVE device session (enumerated; **none assumed active**)
- **(a)** The laptop is already on the Airtel Wi-Fi `192.168.1.0/24` **and already IS `192.168.1.6` running Mosquitto** — so option (a)'s networking prerequisite is met. What is missing is the **device actually connecting to this broker and subscribing to `MDM/clients/cmnd`**: re-verify via **123RFID Desktop** that `MDM_EP`'s broker URL is `192.168.1.6:1883` and the endpoint is **activated**, and add a **Windows Defender Firewall INBOUND allow for TCP 1883** so the sled can reach the laptop-hosted broker. (Pin a DHCP reservation for `192.168.1.6` so the lease stays stable.)
- **(b)** Ensure a real broker the device trusts listens at `192.168.1.6:1883` and that the device's session attaches to it.
- **(c)** (in effect this run) Use the local Mosquitto + paho mock and log live-device testing as blocked by **device-session non-attachment**.

## Acceptance
- LOCAL path satisfied: a loopback publish is received by a subscriber (wildcard_capture.log + phase4 round-trips, recorded verbatim). The LIVE predicate's condition (2) was tested and **failed**, recorded as a connectivity blocker with evidence above.
