**RFD40 / RFD90 MQTT API Reference** **Config Endpoint**

# **Config Endpoint**


**Description**
**1. Description**


config_endpoint configures the communication endpoints on the RFD40/RFD90 reader. Use this command to add, update, or delete

endpoint connections — including setting the broker URL, port, protocol, credentials, and MQTT topics for each connection.


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Endpoint Configuration Management|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_endpoint_config, config_events, set_config, reboot|
|Required Request Fields|command, requestId, epConfig|
|Supported Operations|add, update, delete|
|Supported Endpoint Types|MGMT, MGMT_EVT, CTRL, DATA1, DATA2, SOTI, MDM|
|Supported Protocols|MQTT, MQTT_TLS|
|Supported Verification Types|NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER|



**3. Endpoint Provisioning Behavior**


Understanding how endpoints are provisioned helps you know which endpoints to configure yourself and which are handled by the

123RFID application.


**Initial Provisioning — MDM Endpoint**


The MDM endpoint is the first endpoint that must exist on the reader. It is manually configured using the 123RFID application during

reader onboarding. This gives the reader its initial connection to the broker.


_Note: The MDM endpoint is the only endpoint configured through the 123RFID application. All other endpoints are configured_

_through the broker using config_endpoint after the MDM endpoint is active._


**Remote Provisioning — All Other Endpoints**


Once the reader is connected to the broker via the MDM endpoint, all other endpoints are configured remotely using config_endpoint

over MQTT. This includes:


 - MGMT — Dedicated management command and response channel

 - MGMT_EVT — Dedicated management events channel

 - CTRL — Remote operational control of the reader

 - DATA1 / DATA2 — RFID tag data streaming to a backend system


Additional MDM endpoints can also be added through the broker using config_endpoint after the initial MDM endpoint is active.




**RFD40 / RFD90 MQTT API Reference** **Config Endpoint**


**4. Choosing an Endpoint Type**


The epType field defines the role of the endpoint. A reader can have multiple endpoints with different types simultaneously — for

example, one MGMT endpoint for commands and one DATA1 endpoint for tag data. Choose based on what this connection will carry.













|epType|Role|Use This When|
|---|---|---|
|MGMT|Management|You need a dedicated channel to send commands to the reader and receive responses.|
|MGMT_EVT|Management events|You want a dedicated channel for the reader to push device events (connection status, firmware<br>updates, alerts) to your system.|
|MDM|Management +<br>Management events|Your device management platform requires a single endpoint that handles both management<br>commands and device events.|
|CTRL|Control|You need to control reader operations such as starting or stopping inventory, or changing operating<br>modes.|
|DATA1 /<br>DATA2|Data|You want the reader to stream RFID tag read data to a backend system. Use DATA2 for a<br>secondary data destination.|
|SOTI|SOTI MDM|Your device management platform is SOTI MobiControl.|


**5. Before You Begin**


Gather the following before sending the command. Missing any of these will cause the endpoint to fail to connect even if the command

succeeds.












|What You Need|Details|
|---|---|
|Broker URL and<br>port|The hostname or IP address of the MQTT broker, and the port it listens on. Port 1883 for standard MQTT, 8883 for MQTT over<br>TLS.|
|Authentication<br>credentials|Username and password for the broker. Never hardcode these — supply them from a secrets manager or environment variable<br>at runtime.|
|MQTT topic<br>names|The middle segment of the topic path the reader will publish to (up to 3) and subscribe to (up to 1). The reader constructs the<br>full topic at runtime — see MQTT Topic Format below.|
|Endpoint type|The role this endpoint will play. See the Choosing an Endpoint Type section above.|
|Protocol|MQTT for standard connections, MQTT_TLS for encrypted connections.|
|Certificates (if<br>using TLS)|CA certificate, client certificate, and client private key files must be installed on the device using install_certificate before<br>sending this command.|



**6. MQTT Topic Format**


All topics on the RFD40/RFD90 follow a fixed three-part hierarchy. The reader constructs the full topic at runtime — you configure only

the middle segment in the topic field.


Format:


``

<tenantId> / <topic> / <deviceSerialNumber>

``


Example:


If tenantId is zebra, topic is MDM/clients/resp, and the device serial is RFD40-24190525100255, the reader publishes to:


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Config Endpoint


``

zebra/MDM/clients/resp/RFD40-24190525100255

``


_Important: Never include the tenantId or device serial number in the topic field. These are added automatically by the reader._


**7. Operations**


The operation field inside epConfig determines the action performed on the endpoint definition.


 - add — Creates a new endpoint on the device. The endpointName must not already exist. Returns error code 10 if a configuration

with the same name already exists.

 - update — Modifies an existing endpoint. The endpointName must already exist on the device.

 - delete — Permanently removes an existing endpoint. Only endpointName and epType are required for this operation.


**8. Rules and Constraints**


Violating any of these rules will cause the command to fail or the endpoint to be configured incorrectly.


**Endpoint Name**


 - endpointName is required for all operations.

 - Attempting to add an endpoint with a name that already exists returns error code 10. Use update to modify an existing endpoint, or

delete it first.

 - For delete and update operations, the endpoint must already exist on the device.


**Topics**


 - publishTopics supports a maximum of 3 entries per endpoint. Exceeding this returns error code 25.

 - subscribeTopics supports a maximum of 1 entry per endpoint. Exceeding this returns error code 26.

 - Configure only the middle segment in the topic field. The reader prepends tenantId and appends the device serial number

automatically at runtime.


**Certificates**


 - Certificate files referenced in securityParams (caCertificateFile, clientCert, clientKey) must already be installed on the device using

install_certificate before this command is sent.


**Activation**


 - activate: true marks the endpoint active immediately after the command succeeds.

 - activate: false saves the configuration on the device without activating it. The endpoint can be activated later using the update

operation.


**MQTT Command Payload**


**Example: Add MGMT endpoint for MQTT TLS**

```
 {
 "command": "config_endpoint",
 "requestId": "1233",
 "epConfig": {
 "operation": "add",
 "configuration": {
 "endpointName": "mgmt_tls",
 "epType": "MGMT",

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Config Endpoint

```
 "protocol": "MQTT_TLS",
 "activate": false,
 "url": "broker.ip.com",
 "port": 8883,
 "verificationType": "VERIFY_HOST_PEER",
 "qosCommon": 1,
 "tenantId": "ZEBRA",
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

**Example: Add control endpoint for MQTT TLS**

```
 {
 "command": "config_endpoint",
 "requestId": "1233",
 "epConfig": {
 "operation": "add",

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** Config Endpoint

```
 "configuration": {
 "endpointName": "ctrlEP_tls",
 "epType": "CTRL",
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

**Example: Add data endpoint**

```
 {
 "command": "config_endpoint",

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 5


**RFD40 / RFD90 MQTT API Reference** Config Endpoint

```
 "requestId": "1233",
 "epConfig": {
 "operation": "add",
 "configuration": {
 "endpointName": "dataEP",
 "epType": "DATA1",
 "protocol": "MQTT",
 "activate": true,
 "url": "17L11-DS3362",
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

**Example: Add MDM endpoint**

```
 {
 "command": "config_endpoint",
 "requestId": "1233",
 "epConfig": {
 "operation": "add",
 "configuration": {
 "endpointName": "mgmt_tst",
 "epType": "MDM",
 "protocol": "MQTT",
 "activate": true,
 "url": "test.example.com",
 "verificationType": "NONE",
 "port": 1883,
 "qosCommon": 1,
 "tenantId": "ZEBRA",
 "mqttParams": {
 "keepAlive": 300,
 "cleanSession": true,
 "reconnectDelayMin": 50,
 "reconnectDelayMax": 500,
 "publishTopics": [
 {
 "topic": "MDM/clients/resp",
 "qos": 1,
 "retain": false
 },
 {
 "topic": "MDM/clients/event",
 "qos": 1,

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 6


**RFD40 / RFD90 MQTT API Reference** Config Endpoint

```
 "retain": false
 },
 {
 "topic": "MDM/clients/rfid",
 "qos": 0,
 "retain": true
 }
 ],
 "subscribeTopics": [
 {
 "topic": "MDM/clients/cmnd",
 "qos": 0,
 "retain": false
 }
 ]
 }
 }
 }
 }

```

**Example: Add control endpoint**

```
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
 "url": "17L11-GG6663-1",
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

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 7


**RFD40 / RFD90 MQTT API Reference** Config Endpoint

```
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

**Example: Add data endpoint for MQTT TLS**

```
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

**Example: Delete endpoint**


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 8


**RFD40 / RFD90 MQTT API Reference** **Config Endpoint**

```
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

**Example: Update endpoint**

```
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
 "tenantId": "ZEBRA"
 }
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to configure active endpoint|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`epConfig`**|object|Defines the endpoint configuration including protocol, security, and MQTT parameters.|
|**` operation*`**|enum|Specifies the type of operation to perform, either adding, deleting, or updating a<br>configuration. | Allowed: add | delete | update|
|**` configuration*`**|object||
|**`  endpointName*`**|string|Identifies the name of the endpoint, which determines its purpose or function.|
|**`  epType*`**|enum|Specifies the type of the endpoint. | Allowed: MGMT | MGMT_EVT | CTRL | DATA1 |<br>DATA2 | SOTI | MDM|
|**`  protocol*`**|enum|Defines the communication protocol used by the endpoint. | Allowed: MQTT |<br>MQTT_TLS|
|**`  activate*`**|boolean|Set to true to activate the endpoint to which MQTT connections will be made. | Default:<br>false|
|**`  url*`**|string|Specifies the URL associated with the endpoint.|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 9


**RFD40 / RFD90 MQTT API Reference** Config Endpoint

|Field|Type|Description|
|---|---|---|
|**`  verificationType*`**|enum|Specifies the type of verification used for establishing secure connections. | Allowed:<br>NONE | VERIFY_PEER | VERIFY_HOST | VERIFY_HOST_PEER|
|**`  port*`**|integer|Specifies the port number used for communication.|
|**`  qosCommon*`**|integer|Defines the Quality of Service (QoS) level for the endpoint.|
|**`  tenantId*`**|string|Identifies the tenantID associated with the configuration.|
|**`  mqttParams`**|object||
|**`   keepAlive`**|integer|Specifies the keep-alive interval in seconds when client is idle. | Max: 65535|
|**`   cleanSession`**|boolean|Indicates whether to start a clean session for the MQTT client. | Default: true|
|**`   reconnectDelayMin`**|integer|Specifies the minimum delay in seconds before reconnecting when a connection is lost.|
|**`   reconnectDelayMax`**|integer|Specifies the maximum delay in seconds before reconnecting when a connection is lost.|
|**`   clientId`**|string|Specifies the client ID used for MQTT connections.|
|**`   username`**|string|The username when MQTT broker requires username authentication.|
|**`   password`**|string|The password when MQTT broker requires password authentication.|
|**`   publishTopics`**|array|Array of object|
|**`    topic*`**|string|Specifies the topic to publish messages to. Supports up to 3 publish topics.|
|**`    qos*`**|integer|Defines the QoS level for publishing messages.|
|**`    retain*`**|boolean|Indicates whether the message should be retained by the broker.|
|**`   subscribeTopics`**|array|Array of object|
|**`    topic*`**|string|Specifies the topic to subscribe to. Supports up to 1 subscribe topic.|
|**`    qos*`**|integer|Defines the QoS level for subscribing to messages.|
|**`    retain*`**|boolean|Indicates whether the subscription retains messages.|
|**`  securityParams`**|object|Defines the security parameters for the endpoint.|
|**`   format*`**|enum|Specifies the format of the security certificates. Currently, only PEM is supported. |<br>Allowed: PEM | PFX|
|**`   caCertificateFile*`**|string|Specifies the file containing the CA certificates.|
|**`   clientCert*`**|string|Specifies the file containing the client certificate.|
|**`   clientKey*`**|string|Specifies the file containing the client private key.|
|**`  eventConfiguration`**|object|Reference to the event configuration schema.|
|**`   terminalConnection`**|boolean|set to true to enable terminal connection/disconnection events|
|**`   firmwareUpdate`**|boolean|set to true to enable fw update events|
|**`   network`**|boolean|set to true to enable network events|
|**`   heartbeat`**|boolean|set to true to enable heart beat|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 10


**RFD40 / RFD90 MQTT API Reference** **Config Endpoint**







|Field|Type|Description|
|---|---|---|
|**`   power`**|boolean|set to true to enable power source alerts|
|**`   battery`**|boolean|set to true to enable battery alerts|
|**`   temperature`**|boolean|set to true to enable temperature alerts|
|**`   fileDownload`**|boolean|set to true to enable file download alerts|
|<br>**`heartbeatConfiguration`**|object||
|**`    interval`**|integer|heart beat interval in seconds|
|**`    inventoryStatus`**|boolean|set to true to enable inventory status as part of heartbeat message|
|**`    batteryStatus`**|boolean|set to true to enable battery status as part of heartbeat message|


**MQTT Response Payload**


**Example**

```
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

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command`**|string|The command that was executed to configure an endpoint.|
|**`requestId`**|string|The unique identifier of the original request.|
|**`apiVersion`**|enum|Allowed: V1.0 | V1.1|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 10 — Configuration already exist<br>- 23 — Invalid enum value<br>- 25 — Max 3 publish topics exceeded<br>- 26 — Max 1 subscribe topic exceeded<br>- 27 — Invalid tenant ID length | Min: 0 | Max: 27|
|**` description*`**|string|response description in detail|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 11**


**RFD40 / RFD90 MQTT API Reference** **Config Endpoint**


**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|10|Configuration already exist|An endpoint or configuration with<br>the same name already exists|Delete the existing configuration first or use a different name|
|23|Invalid enum value|A field value does not match any of<br>the allowed enum options|Check the schema for allowed values and correct the field|
|25|Max 3 publish topics exceeded|More than 3 publish topics were<br>specified in the endpoint<br>configuration|Reduce the number of publish topics to 3 or fewer|
|26|Max 1 subscribe topic exceeded|More than 1 subscribe topic was<br>specified in the endpoint<br>configuration|Use only 1 subscribe topic per endpoint|
|27|Invalid tenant ID length|The tenant ID exceeds the<br>maximum allowed character length|Shorten the tenant ID to within the allowed limit|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 12**


