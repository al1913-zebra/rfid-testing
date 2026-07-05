---
id: where-things-fail
title: Where things fail
sidebar_label: Where things fail
description: "A layered model for IOTC fault isolation: Wi-Fi link, MQTT/broker session, application — and how get_status, mqttConnEVT, and heartbeat gaps localise it."
sidebar_custom_props: { emoji: "🧭" }
---

> 📘 **EXPLANATION** · **Audience:** All personas in incident response · **Read time:** ~4 min

Diagnose any IOTC failure by first identifying **which layer of the connection path is broken.** A reader runs IOTC in its own firmware and reaches the broker over a single Wi-Fi edge, so the path is short — but each layer fails differently. Get the layer right and the symptom maps to a small set of failure modes. Get it wrong and you debug in the wrong subsystem.

### One path, three layers

```d2
direction: down
R: "Reader\n(IOTC firmware)"
AP: Access Point
B: "Broker\n(MQTT terminates)" { shape: queue }
A: "Application\n(consumes events)"
R -> AP: "Wi-Fi — Layer 1 (Wi-Fi link)"
AP -> B: "LAN / WAN — Layer 2 (MQTT session)"
B -> A: "pub/sub — Layer 3 (application)"
```

The reader (RFD40 Premium / Premium Plus / RFD90) has one physical network edge: **Reader ↔ Broker over Wi-Fi.** Everything between the AP and the broker is IT infrastructure outside IOTC's surface. Failures cluster into three layers: the **Wi-Fi link**, the **MQTT/broker session**, and the **application**.

### Layer-to-signal mapping

Each layer produces characteristic signals when it fails. Diagnose by checking these signals in order.

#### Reader ↔ Wi-Fi

- **`get_status.deviceStatus.radioConnection`**: `CONNECTED` means radio firmware sees the Wi-Fi controller.
- **`alerts` `NETWORK_EVENT`**: Wi-Fi association or network failures.
- **Heartbeats stop, no DISCONNECTED event**: soft failure; the reader still has TCP but is internally stuck. Power-cycle.

#### Reader ↔ Broker (MQTT)

- **`mqttConnEVT`**: broker-perceived connection state (CONNECTED / DISCONNECTED).
- **No `mqttConnEVT` at all**: the reader cannot reach the broker — firewall, wrong endpoint, or bad credentials.
- **No commands reach the reader**: subscription-topic mismatch on the CTRL/MGMT endpoint.

#### Broker ↔ Application

- **Application sees nothing even though `mqttConnEVT` is CONNECTED**: topic routing or broker ACLs are wrong.
- **No `dataEVT`** while inventory is running: the DATA endpoint is inactive or a post-filter is excluding tags.

### A decision tree

```d2
classes: { bad: { style: { fill: "#fce8e6"; stroke: "#d93025"; font-color: "#c5221f" } } }
direction: down
S: "No tag data in application"
q1: "Heartbeats\narriving?" { shape: diamond }
q2: "mqttConnEVT\nCONNECTED?" { shape: diamond }
q3: "Inventory running?\n(radioActivity)" { shape: diamond }
q4: "DATA endpoint\nactive?" { shape: diamond }
fmnet: "Wi-Fi / broker\nreachability" { class: bad }
sub: "Check MGMT / CTRL\nsubscription"
ctrl: "START not fired;\nverify CTRL"
rp05: "Activate DATA\nendpoint" { class: bad }
fmdata: "Filter excluding\ntags" { class: bad }
S -> q1
q1 -> q2: "no"
q1 -> q3: "yes"
q2 -> fmnet: no
q2 -> sub: yes
q3 -> ctrl: no
q3 -> q4: yes
q4 -> rp05: no
q4 -> fmdata: yes
```

### Why "which layer" comes first

Failures are scoped by layer. A Wi-Fi authentication failure has nothing to do with the broker; you waste time inspecting broker logs. A broker ACL problem has nothing to do with the radio; you waste time power-cycling the reader. Starting with "which layer?" → "which signal?" gets you to a one-page failure mode quickly. The symptom index in [Something's broken?](/diagnose/symptoms) is organised around exactly this hierarchy.

### Three signals to learn

Three commands and events together cover most of the diagnostic surface:

| Signal | What it tells you | When to use |
|---|---|---|
| [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) | Power, radio, NTP, battery, connection state | First check on any new symptom |
| `mqttConnEVT` | Broker-perceived connection state | When the application can't tell whether the reader is offline |
| `heartbeatEVT` (absence) | Heartbeats stopping is a signal of silent offline | When `mqttConnEVT` and [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) disagree |

If all three are healthy and the symptom persists, the problem is downstream of the broker — broker ACLs, downstream pipeline, application bug.

### A systematic approach {#systematic-approach}

Once you know the layer, work the symptom in five steps rather than guessing:

1. **Identify the layer.** Use the layer-to-signal mapping above to place the failure in the Wi-Fi link, the MQTT/broker session, or the application — and, for power or radio faults, the reader itself. Asking "which layer?" first is far more productive than "what's wrong?".
2. **Gather the minimum data** for that layer:
   - *Power / radio:* battery and charge state plus the radio fields of [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status) (`radioActivity`, `radioConnection`), and recent `alerts`.
   - *Wi-Fi link:* [`get_wifi`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-wifi), and broker reachability tested from a control machine.
   - *MQTT / TLS:* [`get_status`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-status), recent `mqttConnEVT` events, and certificate validity.
   - *Application / topics:* your logs, the failing operation's `requestId`, and the topics you subscribed to.
3. **Isolate the variable.** Change one thing at a time — swap to a known-good Wi-Fi profile, a known-good tag, or a wildcard subscription. Multi-variable changes mask which fix worked.
4. **Test the hypothesis.** State it concretely ("the reader can't resolve the broker hostname"), design an unambiguous test (a DNS query from a host on the same segment), and run it.
5. **Verify the fix.** Re-exercise the original failure path and confirm the failure is gone — then decide whether the fix is narrow (this device, this moment) or general (the fleet, the future).

### Out of scope

- **Specific failure modes per layer**: covered as FM-XX-YY entries in the symptom index and failure-mode pages.
- **Recovery procedures**: covered in [Playbooks for getting back online](/diagnose/recovery-playbooks).
- **Why the system fails the way it does**: covered in the relevant explanation chapters in Parts 4–6.

**Related:** 📘 [Something's broken?](/diagnose/symptoms) · 📙 [Playbooks for getting back online](/diagnose/recovery-playbooks) · 📘 [What your reader knows about itself](/infrastructure/device-state) · 📘 [Knowing when you're connected](/observability/mqtt-connection)
