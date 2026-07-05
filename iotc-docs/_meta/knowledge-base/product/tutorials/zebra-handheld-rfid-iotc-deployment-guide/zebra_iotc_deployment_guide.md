# Zebra Handheld RFID Reader IoTC Deployment Guide
## RFD40 / RFD90 end-to-end MQTT deployment, validation, and inventory control

This guide provides a complete operational workflow for deploying a Zebra handheld RFID reader with IoTC over MQTT. It is organized in the same order you should actually perform the work:

1. prepare the network and MQTT broker,
2. provision the initial MDM endpoint in 123RFID Desktop,
3. verify that the reader is alive and reachable,
4. add remote endpoints with `config_endpoint`,
5. confirm configuration with `get_endpoint_config`,
6. start and stop RFID inventory with `control_operation`,
7. reboot the reader only when required.

This version corrects the earlier draft in two important ways:

- **No MQTT commands are assumed to be available before the initial MDM endpoint exists and is active.**
- **Phase 1 and Phase 2 are restored and expanded into a proper deployment sequence.**

The command-level behavior in this guide is governed by the official command references for `config_endpoint`, `get_endpoint_config`, `control_operation`, `get_version`, and `reboot`.

---

# 1. Scope and assumptions

This document applies to Zebra:

- RFD40 series
- RFD90 series

It assumes you are building an MQTT-based deployment in which:

- the reader connects to a broker over Wi-Fi,
- the reader’s initial endpoint is provisioned with 123RFID Desktop,
- remote endpoints are then created over MQTT,
- RFID inventory is controlled through a dedicated control endpoint,
- tag data is streamed through a dedicated data endpoint.

---

# 2. Critical sequencing rule

## 2.1 No command traffic before the initial MDM endpoint exists

A Zebra reader cannot participate in the MQTT command workflow until its initial **MDM endpoint** has been provisioned through **123RFID Desktop** and successfully brought online.

That means:

- you cannot run `get_version` before the MDM endpoint is provisioned,
- you cannot run `config_endpoint` before the MDM endpoint is active,
- you cannot run `get_endpoint_config` before the MDM endpoint is active,
- you cannot run `control_operation` before the MDM endpoint is active,
- you cannot run `reboot` through the MQTT workflow before the MDM endpoint is active.

The MDM endpoint is the bootstrap connection. Everything else depends on it.

## 2.2 What the MDM endpoint does

The initial MDM endpoint gives the reader its first live broker connection. Once that connection is active, the reader can receive and publish MQTT messages and you can manage all additional endpoints remotely.

---

# 3. End-to-end architecture

At a high level, the reader uses one bootstrap endpoint and then any number of operational endpoints.

## 3.1 Bootstrap endpoint

- **MDM**
  - created locally through 123RFID Desktop
  - used to bring the device online
  - used as the first live MQTT path into and out of the reader

## 3.2 Remote operational endpoints

After the bootstrap endpoint is active, additional endpoints can be added with `config_endpoint`:

- **MGMT** — management commands and responses
- **MGMT_EVT** — management events
- **CTRL** — RFID or scanner control
- **DATA1** — primary RFID data stream
- **DATA2** — secondary RFID data stream
- **SOTI** — SOTI MobiControl integration
- **MDM** — additional MDM endpoints if needed after bootstrap

---

# 4. Topic model

All MQTT topics follow the same runtime pattern:

```text
<tenantId>/<middle-topic>/<deviceSerialNumber>
```

You configure only the **middle topic segment** in the endpoint payload.

### Example

If:

- `tenantId` = `zebra`
- middle topic = `CTRL/clients/cmnd`
- serial number = `RFD40-24190525100255`

the final topic becomes:

```text
zebra/CTRL/clients/cmnd/RFD40-24190525100255
```

### Important rules

- Do **not** include the tenant ID in the `topic` field.
- Do **not** include the serial number in the `topic` field.
- Do **not** treat the topic field as a full path. It is only the middle segment.
- Use a distinct middle topic namespace for each endpoint role.

---

# 5. Phase 1 — Environment and network baseline

Before touching the reader, set up a working MQTT environment. This phase removes avoidable failures caused by network isolation, missing broker access, or unclear topic routing.

## 5.1 Decide where the broker will run

You need a reachable MQTT broker for the deployment. Typical choices are:

- a local broker on a workstation,
- a server on the same LAN as the reader,
- a controlled test VM inside the same subnet,
- a broker accessible by both the reader and the MQTT client used for testing.

The broker must be reachable over the port you intend to use.

### Common ports

- `1883` for standard MQTT
- `8883` for MQTT over TLS

## 5.2 Make the network path predictable

For development and troubleshooting, keep the reader, broker, and MQTT client in a network environment that minimizes access control surprises.

Recommended baseline:

- connect the PC running MQTTX to the same network that the reader will use,
- verify the broker host name or IP address,
- verify the broker port,
- verify that firewall rules allow MQTT traffic,
- avoid subnet isolation that blocks device-to-broker traffic,
- avoid AP isolation that prevents peer access on Wi-Fi.

## 5.3 Prepare your broker details

Before provisioning the reader, collect:

- broker host name or IP address
- broker port
- protocol: `MQTT` or `MQTT_TLS`
- username and password if the broker requires authentication
- TLS certificate material if the broker uses TLS
- intended tenant ID
- intended topic names for management, control, and data flows

## 5.4 Prepare MQTTX for validation

MQTTX is used only as a diagnostic and validation client. It is not the bootstrap mechanism for the reader.

Prepare one MQTTX connection for listening and publishing to the broker so you can validate:

- the bootstrap endpoint,
- the management endpoint,
- the control endpoint,
- the data endpoint.

### Suggested MQTTX connection values

- **Name**: `Zebra Test`
- **Client ID**: leave as default unless your broker requires a fixed client ID
- **Host**: broker address
- **Port**: broker port
- **Protocol**: MQTT or MQTT over TLS, matching your broker

### Validation goal

MQTTX should be able to:

- subscribe to the expected topic patterns,
- publish test messages when needed,
- confirm the reader’s connect, response, and data behavior.

---

# 6. Phase 2 — Bootstrap provisioning with 123RFID Desktop

This phase creates the initial MDM endpoint and gives the reader its first usable MQTT connection.

## 6.1 Open 123RFID Desktop

Launch 123RFID Desktop and connect to the reader using a direct management path such as Bluetooth or USB, depending on the reader and your workstation setup.

The purpose of this step is not MQTT command execution. The purpose is to establish the device’s first network identity and initial endpoint configuration.

## 6.2 Discover the reader

Use the reader discovery workflow in 123RFID Desktop to locate the handheld reader.

During discovery:

- ensure the reader is powered on,
- ensure Bluetooth is enabled if you are using wireless discovery,
- ensure USB is connected if you are using cable-based discovery,
- confirm the physical serial number matches the device shown in the UI.

## 6.3 Connect to the reader

Select the discovered reader and connect to it.

At this point you are still in the bootstrap domain. You are not yet using the MQTT command plane. You are establishing a management session so the initial endpoint can be configured.

## 6.4 Configure Wi-Fi

The reader needs a live network path to reach the MQTT broker.

Configure the wireless network:

- select the intended SSID,
- provide the correct passphrase,
- choose the correct security mode,
- save the network settings,
- connect the reader to the Wi-Fi network.

### What you should verify

After Wi-Fi configuration, confirm:

- the reader shows a connected Wi-Fi state,
- the reader has been assigned an IP address,
- the router and broker are on a reachable path,
- the Wi-Fi network is the one that can reach the broker.

## 6.5 Configure the initial MDM endpoint

Now create the initial MDM endpoint in 123RFID Desktop.

This is the first endpoint that must be active on the device. It is the bootstrap path that allows the reader to join the MQTT workflow.

### Minimum information needed

- endpoint name
- broker host or URL
- broker port
- protocol
- tenant ID
- MQTT parameters
- credentials if required
- certificate material if using TLS

### Recommended MDM role

Use the MDM endpoint for the first live connection. Once it is active, you can use it to add all other endpoints remotely.

## 6.6 Save and activate

Save the endpoint configuration and activate the MDM endpoint.

Only after this step is complete does the MQTT command workflow become available.

---

# 7. Phase 3 — Validate that the bootstrap connection is live

Once the MDM endpoint is active, confirm the reader is actually communicating with the broker.

## 7.1 Confirm broker connectivity

Check that:

- the reader is connected to Wi-Fi,
- the broker is reachable,
- the MDM endpoint reports connected status,
- MQTTX can see reader traffic.

## 7.2 Use `get_version` only after MDM is active

`get_version` is a reader command that reports identity and version information. It is not a pre-bootstrap command. It must be used only after the MDM endpoint exists and the reader has a live MQTT path.

### Request

```json
{
  "command": "get_version",
  "requestId": "abc123"
}
```

### What it returns

The response includes:

- reader model
- serial number
- SKU
- firmware version
- manufacturer and company metadata
- detailed component versions, including IoTC version

### What to verify

- the connected device model is correct
- the serial number matches the physical label
- the firmware baseline is what you expect
- the IoTC version is compatible with the command set you plan to use

### Example response shape

```json
{
  "command": "get_version",
  "requestId": "abcd123",
  "apiVersion": "V1.1",
  "readerVersion": {
    "firmwareVersion": "SAAFKS00-006-R02",
    "model": "RFD40",
    "serialNumber": "23053520102096",
    "sku": "RFD4031-G10B700-US",
    "companyName": "Zebra Technologies",
    "manufacturerName": "Zebra Technologies",
    "detailedVersions": {
      "scannerFirmware": "PAAEOC20-003-R01",
      "radioFirmware": "2.0.42.0",
      "iotcVersion": "V1.1"
    }
  },
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

---

# 8. Phase 4 — Confirm or inspect endpoint state with `get_endpoint_config`

Use `get_endpoint_config` after the bootstrap endpoint is live and after you begin creating remote endpoints.

## 8.1 Purpose

This command retrieves endpoint configuration details from the reader.

It is used to confirm:

- active endpoint configuration
- saved endpoint names
- MQTT parameter values
- security settings
- event routing values
- topic assignments

## 8.2 When to use it

Use `get_endpoint_config`:

- before changing endpoint settings,
- after adding an endpoint,
- after updating an endpoint,
- before deleting an endpoint,
- when troubleshooting a connection problem,
- when verifying which endpoint names already exist.

## 8.3 Request examples

### Retrieve all active endpoints

```json
{
  "command": "get_endpoint_config",
  "requestId": "abc123"
}
```

### Retrieve a specific endpoint

```json
{
  "command": "get_endpoint_config",
  "requestId": "def456",
  "endpointDetails": {
    "endpointName": "ctrlEP"
  }
}
```

## 8.4 What to inspect in the response

Pay attention to:

- `activate`
- `protocol`
- `url`
- `port`
- `verificationType`
- `tenantId`
- `publishTopics`
- `subscribeTopics`
- `savedEndpoints.epNames`

## 8.5 Response behavior

A successful response includes the configuration details and a standard success object.

If the reader cannot retrieve the requested information, the command returns code `3`.

### Response code meanings

- `0` — Success
- `3` — Not able to retrieve information

### Practical response rule

If you receive code `3`, retry after a short delay. If the issue persists, reboot the reader only after you have stopped any active inventory.

---

# 9. Phase 5 — Create remote endpoints with `config_endpoint`

Once the bootstrap MDM endpoint is active, use `config_endpoint` to create all operational MQTT endpoints.

## 9.1 Command purpose

`config_endpoint` configures the communication endpoints on the reader. It supports:

- adding endpoints,
- updating endpoints,
- deleting endpoints.

## 9.2 Supported endpoint types

- `MGMT`
- `MGMT_EVT`
- `CTRL`
- `DATA1`
- `DATA2`
- `SOTI`
- `MDM`

## 9.3 Supported protocols

- `MQTT`
- `MQTT_TLS`

## 9.4 Supported verification types

- `NONE`
- `VERIFY_PEER`
- `VERIFY_HOST`
- `VERIFY_HOST_PEER`

## 9.5 Required request fields

- `command`
- `requestId`
- `epConfig`

## 9.6 Supported operations

- `add`
- `update`
- `delete`

### Rules

- `endpointName` is required for all operations.
- For `add`, the endpoint name must not already exist.
- For `update` and `delete`, the endpoint must already exist.
- `publishTopics` supports a maximum of 3 entries.
- `subscribeTopics` supports a maximum of 1 entry.
- If you use TLS, the certificate files must already be installed on the device.
- `activate: true` activates the endpoint when the command succeeds.
- `activate: false` stores the endpoint without activating it.

## 9.7 Standard payload structure

A typical request looks like this:

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "ctrlEP",
      "epType": "CTRL",
      "protocol": "MQTT",
      "activate": false,
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
          {
            "topic": "CTRL/clients/resp",
            "qos": 1,
            "retain": false
          },
          {
            "topic": "CTRL/clients/event",
            "qos": 1,
            "retain": false
          },
          {
            "topic": "CTRL/clients/rfid",
            "qos": 0,
            "retain": true
          }
        ],
        "subscribeTopics": [
          {
            "topic": "CTRL/clients/cmnd",
            "qos": 0,
            "retain": false
          }
        ]
      }
    }
  }
}
```

## 9.8 Endpoint-type guidance

### MGMT
Use when you want a dedicated command and response channel.

### MGMT_EVT
Use when you want a dedicated device-event channel.

### CTRL
Use when you want a dedicated control path for starting and stopping RFID or scanner operations.

### DATA1 / DATA2
Use when you want RFID tag data streamed to a backend system. Use `DATA2` only when you need a second data destination.

### SOTI
Use when the reader is managed by SOTI MobiControl.

### MDM
Use when your management design requires an MDM-style endpoint definition beyond the initial bootstrap configuration.

---

# 10. Examples of `config_endpoint`

## 10.1 Add a management endpoint over TLS

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "mgmt_tls",
      "epType": "MGMT",
      "protocol": "MQTT_TLS",
      "activate": false,
      "url": "broker.ip.com",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "zebra",
      "mqttParams": {
        "keepAlive": 300,
        "cleanSession": true,
        "reconnectDelayMin": 5,
        "reconnectDelayMax": 60,
        "publishTopics": [
          {
            "topic": "MGMT/clients/resp",
            "qos": 1,
            "retain": false
          },
          {
            "topic": "MGMT/clients/event",
            "qos": 1,
            "retain": false
          },
          {
            "topic": "MGMT/clients/rfid",
            "qos": 0,
            "retain": true
          }
        ],
        "subscribeTopics": [
          {
            "topic": "MGMT/clients/cmnd",
            "qos": 0,
            "retain": false
          }
        ]
      },
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "mqtt_ca_cert",
        "clientCert": "mqtt_client_cert",
        "clientKey": "mqtt_client_key"
      }
    }
  }
}
```

## 10.2 Add a control endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "ctrlEP",
      "epType": "CTRL",
      "protocol": "MQTT",
      "activate": false,
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
          {
            "topic": "CTRL/clients/resp",
            "qos": 1,
            "retain": false
          },
          {
            "topic": "CTRL/clients/event",
            "qos": 1,
            "retain": false
          },
          {
            "topic": "CTRL/clients/rfid",
            "qos": 0,
            "retain": true
          }
        ],
        "subscribeTopics": [
          {
            "topic": "CTRL/clients/cmnd",
            "qos": 0,
            "retain": false
          }
        ]
      }
    }
  }
}
```

## 10.3 Add a data endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
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
}
```

## 10.4 Add a TLS-secured data endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "dataEP_tls",
      "epType": "DATA1",
      "protocol": "MQTT_TLS",
      "activate": true,
      "url": "broker.ip.com",
      "port": 8883,
      "verificationType": "VERIFY_HOST_PEER",
      "qosCommon": 1,
      "tenantId": "zebra",
      "mqttParams": {
        "keepAlive": 300,
        "cleanSession": true,
        "reconnectDelayMin": 5,
        "reconnectDelayMax": 60
      },
      "securityParams": {
        "format": "PEM",
        "caCertificateFile": "mqtt_ca_cert",
        "clientCert": "mqtt_client_cert",
        "clientKey": "mqtt_client_key"
      }
    }
  }
}
```

## 10.5 Delete an endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "delete",
    "configuration": {
      "endpointName": "mgmt_tst",
      "epType": "MGMT"
    }
  }
}
```

## 10.6 Update an endpoint

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "update",
    "configuration": {
      "endpointName": "mgmt_tls",
      "epType": "MGMT",
      "protocol": "MQTT_TLS",
      "url": "broker.updated.com",
      "tenantId": "zebra"
    }
  }
}
```

---

# 11. `config_endpoint` response and error handling

## 11.1 Success response

```json
{
  "command": "config_endpoint",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

## 11.2 Response codes

- `0` — Success
- `10` — Configuration already exists
- `23` — Invalid enum value
- `25` — Max 3 publish topics exceeded
- `26` — Max 1 subscribe topic exceeded
- `27` — Invalid tenant ID length

## 11.3 Practical interpretation

- `10` usually means the endpoint name is already in use.
- `23` usually means an enum is invalid.
- `25` and `26` mean the topic array limits were exceeded.
- `27` means the tenant ID must be shortened.

---

# 12. Phase 6 — Start and stop RFID inventory with `control_operation`

`control_operation` is the command that starts or stops the active radio or scanner operation.

## 12.1 Supported control types

- `RFID`
- `SCANNER`

For RFID inventory, use `RFID`.

## 12.2 Supported operations

- `START`
- `STOP`

## 12.3 Behavioral rule

`control_operation` does not configure inventory parameters. It only starts or stops the selected subsystem.

If your workflow requires operating-mode configuration, set that first using the appropriate operating-mode command, then use `control_operation`.

## 12.4 Start inventory request

```json
{
  "command": "control_operation",
  "requestId": "abcd1432",
  "ctrlOprPayload": {
    "controlType": "RFID",
    "operation": "START"
  }
}
```

## 12.5 Stop inventory request

```json
{
  "command": "control_operation",
  "requestId": "stop1432",
  "ctrlOprPayload": {
    "controlType": "RFID",
    "operation": "STOP"
  }
}
```

## 12.6 Response

```json
{
  "command": "control_operation",
  "requestId": "abc123",
  "apiVersion": "V1.1",
  "response": {
    "code": 0,
    "description": "Success"
  }
}
```

## 12.7 Response codes

- `0` — Success
- `11` — Inventory in progress
- `12` — No Radio Operation in Progress
- `23` — Invalid enum value

### Practical meaning

- `11` means an inventory is already running.
- `12` means a STOP command was issued while the reader was already idle.
- `23` means one of the enum values is invalid.

---

# 13. Phase 7 — Reboot when needed

`reboot` performs a warm reset.

## 13.1 When to use it

Use `reboot` when you need to:

- apply changes that require a restart,
- recover from a stuck or inconsistent state,
- reinitialize device connections.

## 13.2 What must happen before reboot

Before sending `reboot`:

- stop any active RFID inventory,
- confirm inventory is not running,
- confirm that the device can safely restart.

## 13.3 Reboot request

```json
{
  "command": "reboot",
  "requestId": "123abcd"
}
```

## 13.4 Reboot response

The documented response schema allows:

- `0` — Success
- `5` — Can’t reboot device, inventory in progress

### Important observation

The reboot reference includes an example response with code `1` and description `Command payload is accepted`, but the response schema and error table define `0` and `5`. For implementation and validation, rely on the schema and error table as the authoritative contract.

---

# 14. Correct operational workflow

This is the complete flow you should follow.

## 14.1 Build the network and broker baseline

- choose broker location
- ensure broker reachability
- choose MQTT or MQTT_TLS
- prepare credentials and certificates
- prepare MQTTX for validation

## 14.2 Provision the reader through 123RFID Desktop

- discover the reader
- connect by USB or Bluetooth
- configure Wi-Fi
- create the initial MDM endpoint
- activate the MDM endpoint

## 14.3 Verify the bootstrap connection

- confirm the reader is online
- confirm the broker connection is active
- run `get_version` and record the model, serial number, firmware, and IoTC version

## 14.4 Create remote endpoints

Use `config_endpoint` to create:

- `MGMT` endpoint
- `CTRL` endpoint
- `DATA1` endpoint
- `MGMT_EVT` endpoint if needed
- `DATA2` endpoint if needed

## 14.5 Validate the active configuration

Use `get_endpoint_config` to verify:

- active endpoints
- saved endpoint names
- topics
- protocol
- security settings
- activation state

## 14.6 Start inventory

Use `control_operation` with:

- `controlType: "RFID"`
- `operation: "START"`

## 14.7 Observe data

The tag stream should appear on the configured data topic.

## 14.8 Stop inventory

Use `control_operation` with:

- `controlType: "RFID"`
- `operation: "STOP"`

## 14.9 Reboot only when justified

Use `reboot` only when you need a warm reset and inventory is not active.

---

# 15. Validation checklist

## 15.1 Before bootstrap

- broker address known
- port known
- Wi-Fi network available
- reader power and connectivity verified
- 123RFID Desktop ready

## 15.2 After bootstrap

- MDM endpoint active
- reader connected to broker
- serial number captured
- `get_version` succeeds

## 15.3 After remote endpoint creation

- `config_endpoint` returns success
- endpoint appears in `get_endpoint_config`
- endpoint activation state is correct
- topic paths are correct

## 15.4 Before inventory start

- control endpoint exists
- data endpoint exists
- inventory mode is correct
- no inventory is already running

## 15.5 Before reboot

- RFID inventory stopped
- no live operation in progress

---

# 16. Troubleshooting guide

## 16.1 `get_version` is unavailable

This usually means the bootstrap MDM endpoint is not yet active. Provision the initial MDM endpoint first.

## 16.2 `config_endpoint` fails

Check for:

- duplicate endpoint name
- invalid enum
- too many publish topics
- too many subscribe topics
- invalid tenant ID
- missing certificates for TLS

## 16.3 `get_endpoint_config` fails

Check whether the device is temporarily unable to return configuration. Retry later. If the problem continues, reboot only after stopping inventory.

## 16.4 `control_operation START` fails

The most likely reasons are:

- inventory is already running
- the control endpoint is not configured correctly
- the selected control type is wrong
- the reader is not in the expected operating state

## 16.5 `control_operation STOP` returns no-op behavior

That usually means the reader was already idle.

## 16.6 `reboot` fails

If inventory is active, stop it first and then try again.

---

# 17. Minimal command reference

## `get_version`

```json
{
  "command": "get_version",
  "requestId": "abc123"
}
```

## `get_endpoint_config`

```json
{
  "command": "get_endpoint_config",
  "requestId": "abc123"
}
```

## `config_endpoint`

```json
{
  "command": "config_endpoint",
  "requestId": "1233",
  "epConfig": {
    "operation": "add",
    "configuration": {
      "endpointName": "ctrlEP",
      "epType": "CTRL",
      "protocol": "MQTT",
      "activate": false,
      "url": "broker.example.com",
      "verificationType": "NONE",
      "port": 1883,
      "qosCommon": 1,
      "tenantId": "zebra"
    }
  }
}
```

## `control_operation`

```json
{
  "command": "control_operation",
  "requestId": "abcd1432",
  "ctrlOprPayload": {
    "controlType": "RFID",
    "operation": "START"
  }
}
```

## `reboot`

```json
{
  "command": "reboot",
  "requestId": "123abcd"
}
```

---

# 18. Final operating principle

The correct mental model is:

1. **Bootstrap first** with 123RFID Desktop and the initial MDM endpoint.
2. **Verify the live connection** only after bootstrap is active.
3. **Use MQTT commands** to create and inspect all other endpoints.
4. **Use control commands** only after the control and data paths are in place.
5. **Reboot only when needed**, and never while RFID inventory is active.
