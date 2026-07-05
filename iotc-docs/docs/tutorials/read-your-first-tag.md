---
id: read-your-first-tag
title: "Tutorial: Read your first tag with Python"
sidebar_label: "Tutorial: Read your first tag"
description: "Tutorial: build a Python (paho-mqtt) app that starts IOTC inventory, ingests dataEVT tag reads, and prints a live unique-tag set — your first tag-reading application end to end."
sidebar_custom_props: { emoji: "🐍" }
---

> 📗 **TUTORIAL** · **Audience:** Solution Builder · **Time:** ~20 min · **Prerequisite:** a reader already reading (Quick Start through Phase 6)

The Quick Start ends with tag reads scrolling past in `mosquitto_sub`. This tutorial takes the next step: a small **Python application** that starts an inventory, receives the reader's `dataEVT` events over MQTT, and turns them into a live set of **unique tags** — the move from "a reader that reads" to "an application that does something with the reads." By the end you have one runnable script.

:::note[Before you start]
- A reader already bootstrapped and reading: complete the [Quick Start](/quick-start/overview) through [Phase 6](/quick-start/phase-6) so you have an active **CTRL** endpoint (for commands) and a **DATA1** endpoint (for the tag stream) on a reachable broker.
- **Python 3.9+** and the Paho MQTT client: `pip install paho-mqtt` (these examples use paho-mqtt 2.x, the current release).
- Your broker host and port, the reader's **serial number**, and your tenant (`zebra` by default).
- A few EPC Gen2 tags in front of the antenna.

This tutorial stays on **plain MQTT (port 1883)** to keep the focus on the application; promote it to TLS afterward with [Phase 8](/quick-start/phase-8).
:::

### Step 1: Connect to the broker

Create `first_tag_app.py`. Set your connection details, then connect a Paho client and start its network loop in the background:

```python
import json, time
import paho.mqtt.client as mqtt

TENANT = "zebra"
SERIAL = "RFD40-24190525100255"          # your reader's serial number
BROKER, PORT = "broker.example.com", 1883

def on_connect(client, userdata, flags, reason_code, properties=None):
    print("connected" if reason_code == 0 else f"connect failed: {reason_code}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="first-tag-app")
client.on_connect = on_connect
client.connect(BROKER, PORT, keepalive=60)
client.loop_start()
time.sleep(1)
```

**You should see** `connected` printed. If not, the broker host/port is wrong or unreachable — the same path you verified in [Phase 1](/quick-start/phase-1).

### Step 2: Subscribe to the tag stream and command responses

The reader publishes `dataEVT` tag reads on the **DATA1** endpoint's topic family, and answers your commands on the **CTRL** response topic. Every topic is `<tenant>/<topic>/<serial>` (see [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints)). Subscribe to both inside `on_connect`:

```python
CMD_TOPIC  = f"{TENANT}/CTRL/clients/cmnd/{SERIAL}"   # we publish commands here
RESP_TOPIC = f"{TENANT}/CTRL/clients/resp/{SERIAL}"   # the reader answers here
DATA_TOPIC = f"{TENANT}/DATA1/#"                       # dataEVT tag reads land here

def on_connect(client, userdata, flags, reason_code, properties=None):
    if reason_code != 0:
        print(f"connect failed: {reason_code}")
        return
    client.subscribe([(RESP_TOPIC, 1), (DATA_TOPIC, 0)])
    print("connected and subscribed")
```

**You should see** `connected and subscribed`. Nothing flows yet — the radio is idle until Step 3.

### Step 3: Start inventory from your code

Send [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) `START` on the CTRL command topic. The payload key is `ctrlOprPayload`; `controlType` and `operation` are **uppercase** enums:

```python
def control(op, request_id):
    client.publish(CMD_TOPIC, json.dumps({
        "command": "control_operation",
        "requestId": request_id,
        "ctrlOprPayload": {"controlType": "RFID", "operation": op},
    }))

control("START", "app-start-001")
```

**You should see** a command response arrive on `RESP_TOPIC` with `response.code` `0` (you'll print it in Step 4). Code `11` means an inventory is already running — send `STOP` first. The full table is in [Start and stop a tag inventory](/rfid/start-stop-inventory).

### Step 4: Turn `dataEVT` into a live unique-tag set

`dataEVT` is an **event**, not a command response: it has `type`, `timestamp`, and `data.tagData[]`, with no `requestId`/`response` envelope. Each entry in `tagData` carries `EPCid` (the tag's identity) and, when enabled, telemetry like `peakRssi` and `seenCount`. Route messages by topic and deduplicate by `EPCid`:

```python
seen = {}   # EPCid -> times seen

def on_message(client, userdata, msg):
    payload = json.loads(msg.payload)
    if "/DATA1/" in msg.topic:                      # a dataEVT tag-read event
        for tag in payload.get("data", {}).get("tagData", []):
            epc = tag.get("EPCid")
            if not epc:
                continue
            if epc not in seen:
                rssi = tag.get("peakRssi")
                print(f"new tag {epc}" + (f"  rssi={rssi} dBm" if rssi is not None else ""))
            seen[epc] = seen.get(epc, 0) + 1
    elif "/CTRL/clients/resp/" in msg.topic:        # a command response
        print(f"{payload.get('command')} -> code {payload.get('response', {}).get('code')}")

client.on_message = on_message
```

**You should see** a `new tag <EPC>` line the first time each tag is read, with repeats folded into the seen-count. The field reference for everything in `tagData` is [Where tag reads come from](/rfid/dataevt-schema).

### Step 5: Stop cleanly and summarize

Read for a fixed window (or until you press Ctrl-C), send `STOP`, then report what the application captured:

```python
print("inventory started — present some tags (Ctrl-C to stop)")
try:
    time.sleep(15)                 # read for 15 seconds
except KeyboardInterrupt:
    pass

control("STOP", "app-stop-001")
time.sleep(1)

print(f"\ndone — {len(seen)} unique tag(s):")
for epc, count in sorted(seen.items()):
    print(f"  {epc}  (seen {count}x)")

client.loop_stop()
client.disconnect()
```

**You should see** a `control_operation -> code 0` line (or `12`, which just means the radio was already idle — harmless), then a summary listing each unique EPC and how many times it was read.

### The complete app

```python
import json, time
import paho.mqtt.client as mqtt

TENANT = "zebra"
SERIAL = "RFD40-24190525100255"          # your reader's serial number
BROKER, PORT = "broker.example.com", 1883

CMD_TOPIC  = f"{TENANT}/CTRL/clients/cmnd/{SERIAL}"
RESP_TOPIC = f"{TENANT}/CTRL/clients/resp/{SERIAL}"
DATA_TOPIC = f"{TENANT}/DATA1/#"

seen = {}   # EPCid -> times seen

def on_connect(client, userdata, flags, reason_code, properties=None):
    if reason_code != 0:
        print(f"connect failed: {reason_code}")
        return
    client.subscribe([(RESP_TOPIC, 1), (DATA_TOPIC, 0)])
    print("connected and subscribed")

def on_message(client, userdata, msg):
    payload = json.loads(msg.payload)
    if "/DATA1/" in msg.topic:
        for tag in payload.get("data", {}).get("tagData", []):
            epc = tag.get("EPCid")
            if not epc:
                continue
            if epc not in seen:
                rssi = tag.get("peakRssi")
                print(f"new tag {epc}" + (f"  rssi={rssi} dBm" if rssi is not None else ""))
            seen[epc] = seen.get(epc, 0) + 1
    elif "/CTRL/clients/resp/" in msg.topic:
        print(f"{payload.get('command')} -> code {payload.get('response', {}).get('code')}")

def control(op, request_id):
    client.publish(CMD_TOPIC, json.dumps({
        "command": "control_operation",
        "requestId": request_id,
        "ctrlOprPayload": {"controlType": "RFID", "operation": op},
    }))

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="first-tag-app")
client.on_connect = on_connect
client.on_message = on_message
client.connect(BROKER, PORT, keepalive=60)
client.loop_start()
time.sleep(1)

control("START", "app-start-001")
print("inventory started — present some tags (Ctrl-C to stop)")
try:
    time.sleep(15)
except KeyboardInterrupt:
    pass

control("STOP", "app-stop-001")
time.sleep(1)

print(f"\ndone — {len(seen)} unique tag(s):")
for epc, count in sorted(seen.items()):
    print(f"  {epc}  (seen {count}x)")

client.loop_stop()
client.disconnect()
```

### Recap

You wrote an application that connects to the broker, subscribes to the DATA1 tag stream, starts and stops inventory through the CTRL endpoint, and ingests `dataEVT` into an in-memory unique-tag set. That ingest-and-deduplicate loop is the core of every IOTC application; from here you swap the `print` and the `seen` dict for your own pipeline — a database write, an HTTP post, a dashboard update.

### Didn't work?

- **`connected` but no `new tag` lines.** Inventory may not be emitting: confirm `START` returned code `0`, that tags are in range, and that the profile is one of the five supported (not `FAST_READ`). See [Start and stop a tag inventory](/rfid/start-stop-inventory).
- **`new tag` lines never appear but a CTRL response does.** The reader is publishing `dataEVT` on a different topic than `DATA1/#`. Confirm the DATA1 endpoint is active with [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) (Quick Start [Phase 4](/quick-start/phase-4)).
- **`TypeError` on `mqtt.Client(...)`.** You're on paho-mqtt 1.x. Upgrade (`pip install -U paho-mqtt`) or drop the `CallbackAPIVersion.VERSION2` argument and use the 1.x callback signatures.

**Related:** 📗 [Quick Start](/quick-start/overview) · 📕 [Where tag reads come from (dataEVT)](/rfid/dataevt-schema) · 📙 [Start and stop a tag inventory](/rfid/start-stop-inventory) · 📘 [How the MQTT plumbing fits together](/infrastructure/mqtt-endpoints)
