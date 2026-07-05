---
id: phase-5
title: "Phase 5: Add remote endpoints (config_endpoint)"
sidebar_label: "Phase 5: Add remote endpoints"
description: "Phase 5 of the IOTC Quick Start: add CTRL and DATA1 endpoints with config_endpoint, then verify all three endpoints are active and routable."
sidebar_custom_props: { emoji: "5️⃣" }
---

> 📗 **TUTORIAL** · **Phase:** 5 of 8 · **Audience:** Integrator · **Time:** ~8 min

**Artifact this phase produces:** two operational endpoints active on the sled, a **CTRL** endpoint for radio control and a **DATA1** endpoint for the tag stream, in addition to the bootstrap MDM endpoint. This is the configuration most production deployments actually run. (For *when* to keep the bootstrap MDM endpoint versus split into dedicated endpoints, see [Hybrid (MDM) vs split](/infrastructure/mqtt-endpoints).)

### Why this phase exists

The MDM endpoint is a hybrid that carries management, control, and data on one topic family — fine for bootstrap, but in steady state it leaks backpressure across roles, blocks per-role QoS, and forces broker ACLs to lump operator and data-pipeline access together. Production deployments split into MGMT + CTRL + DATA1 (and sometimes DATA2); [Hybrid (MDM) vs split](/infrastructure/mqtt-endpoints) explains the trade-off in full.

### The topic format reminder

All MQTT topics follow a fixed three-part hierarchy:

```
<tenantId> / <topic> / <deviceSerialNumber>
```

You configure only the **middle segment** in the `topic` field of each `publishTopic` or `subscribeTopic`. The reader prepends `tenantId` and appends `deviceSerialNumber` automatically. **Never** include the tenantId or serial in the `topic` field, they get added twice and the path becomes unroutable.

### What to do

#### 1. Add the CTRL endpoint

Publish on the MDM command topic:

```bash
mosquitto_pub -h <broker-host> -p 1883 \
  -t 'zebra/MDM/clients/cmnd/RFD40-24190525100255' \
  -m '{
    "command": "config_endpoint",
    "requestId": "add-ctrl-001",
    "epConfig": {
      "operation": "add",
      "configuration": {
        "endpointName": "ctrlEP",
        "epType": "CTRL",
        "protocol": "MQTT",
        "activate": true,
        "url": "broker.example.com",
        "verificationType": "NONE",
        "port": 1883,
        "qosCommon": 1,
        "tenantId": "zebra",
        "mqttParams": {
          "keepAlive": 300,
          "cleanSession": true,
          "reconnectDelayMin": 50,
          "reconnectDelayMax": 500,
          "publishTopics": [
            { "topic": "CTRL/clients/resp", "qos": 1, "retain": false },
            { "topic": "CTRL/clients/event", "qos": 1, "retain": false },
            { "topic": "CTRL/clients/rfid", "qos": 0, "retain": true }
          ],
          "subscribeTopics": [
            { "topic": "CTRL/clients/cmnd", "qos": 0, "retain": false }
          ]
        }
      }
    }
  }'
```

A few things to notice in this payload:

- The named payload object is **`epConfig`**, not `params`, not nested in any other envelope.
- `operation` is lowercase `add` (the casing varies by command; trust the per-command schema).
- `tenantId` is lowercase `zebra`, the canonical convention.
- `publishTopics` supports **at most 3 entries**; `subscribeTopics` supports **at most 1**. Exceed and the reader returns error 25 or 26.
- `verificationType: "NONE"` is required even on plain MQTT.

The response arrives on `zebra/MDM/clients/resp/<serial>` (the topic your Phase 4 `zebra/MDM/#` subscriber is already watching):

```json
{
  "command": "config_endpoint",
  "requestId": "add-ctrl-001",
  "apiVersion": "V1.1",
  "response": { "code": 0, "description": "Success" }
}
```

The reader is now subscribed to `zebra/CTRL/clients/cmnd/<serial>` for commands and publishes responses on `zebra/CTRL/clients/resp/<serial>`.

#### 2. Add the DATA1 endpoint

```bash
mosquitto_pub -h <broker-host> -p 1883 \
  -t 'zebra/MDM/clients/cmnd/RFD40-24190525100255' \
  -m '{
    "command": "config_endpoint",
    "requestId": "add-data1-001",
    "epConfig": {
      "operation": "add",
      "configuration": {
        "endpointName": "dataEP",
        "epType": "DATA1",
        "protocol": "MQTT",
        "activate": true,
        "url": "broker.example.com",
        "verificationType": "NONE",
        "port": 1883,
        "qosCommon": 1,
        "tenantId": "zebra",
        "mqttParams": {
          "keepAlive": 300,
          "cleanSession": true,
          "reconnectDelayMin": 50,
          "reconnectDelayMax": 500
        }
      }
    }
  }'
```

DATA1 publishes only; there is no `subscribeTopics` because applications never send commands to a data endpoint. The reader will publish `dataEVT` events on the DATA1 publish topic family.

#### 3. Verify both endpoints are active

Re-run [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) from Phase 4:

```bash
mosquitto_pub -h <broker-host> -p 1883 \
  -t 'zebra/MDM/clients/cmnd/RFD40-24190525100255' \
  -m '{"command":"get_endpoint_config","requestId":"verify-001"}'
```

The response should now list three active endpoints: `mdm_bootstrap`, `ctrlEP`, and `dataEP`.

#### 4. Subscribe to the new topic families

In additional MQTTX panes or terminal windows:

```bash
mosquitto_sub -h <broker-host> -p 1883 -t 'zebra/CTRL/#' -v &
mosquitto_sub -h <broker-host> -p 1883 -t 'zebra/DATA1/#' -v &
```

### Endpoint-type cheat sheet

| epType | Carries | Direction |
|---|---|---|
| `MGMT` | Identity, network, security, config, firmware | Bidirectional command/response |
| `MGMT_EVT` | Heartbeats, alerts, NTP, network/firmware events | Sled → app only |
| `CTRL` | [`set_operating_mode`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-operating-mode), [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation), [`set_post_filter`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-set-post-filter) | Bidirectional command/response |
| `DATA1` | `dataEVT` tag stream | Sled → app only |
| `DATA2` | Second `dataEVT` stream (optional) | Sled → app only |
| `MDM` | All roles combined (bootstrap default) | Bidirectional |
| `SOTI` | SOTI MobiControl variant | Bidirectional |

### Success check

- [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) returns `response.code: 0` for both adds.
- [`get_endpoint_config`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-get-endpoint-config) shows three active endpoints.
- Your CTRL and DATA1 subscribers are open and ready.

### Didn't work?

| Code | What it means | What to do |
|---|---|---|
| `10` | Configuration already exists | Use `"operation": "update"` instead of `"add"`, or `delete` the existing one first. |
| `23` | Invalid enum value | Check `epType`, `protocol`, or `verificationType` against the [`config_endpoint`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-config-endpoint) schema. |
| `25` | Max 3 publish topics exceeded | Reduce `publishTopics` to 3 entries or fewer. |
| `26` | Max 1 subscribe topic exceeded | Use only 1 `subscribeTopics` entry per endpoint. |
| `27` | Invalid tenant ID length | Shorten the tenant ID. |

Other common stumbles:

- **Endpoint configured but not flowing.** `activate` must be `true` and the broker URL must be reachable from the sled. The reader doesn't fail-loudly on broker unreachability at config time; it sits in a reconnect loop.
- **Topic missing tenantId in your subscriber.** Subscribe to `zebra/CTRL/#` not `CTRL/#`. The reader publishes the full three-part path.
- **Certificate fields referenced but not installed.** For TLS endpoints, certificate files must already be installed via [`install_certificate`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-install-certificate), see [Securing the connection](/infrastructure/tls-and-certificates). Plain MQTT (this Quick Start) doesn't need them.

### Where to go next

[Phase 6: Start and stop inventory](/quick-start/phase-6) — fire the radio with [`control_operation`](https://aa5123.github.io/RFID-40-90-handled-reader-api-reference-documentatiion/#op-control-operation) and watch tag reads flow.
