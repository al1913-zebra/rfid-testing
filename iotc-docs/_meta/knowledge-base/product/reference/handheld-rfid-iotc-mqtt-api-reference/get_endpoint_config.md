**RFD40 / RFD90 MQTT API Reference** **Get Endpoint Config**

# **Get Endpoint Config**


**Description**
**1. Description**


The get_endpoint_config command retrieves endpoint configuration details from the reader.


This command returns:


 - Active endpoint configuration including protocol, connection, and topic settings

 - MQTT parameters and security configuration for active endpoints

 - Event routing configuration for active endpoints

 - List of all saved endpoint names on the device


No additional payload fields are required for retrieving all active endpoints. To query a specific endpoint, include the optional

endpointDetails object with the endpoint name.


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Endpoint Configuration Query|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|config_endpoint, get_config|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve active and saved endpoint configuration details|



**3. When to Use This Command**


Use get_endpoint_config to:


 - Verify active endpoint configuration before making changes

 - Confirm MQTT topic assignments and QoS levels

 - Audit security and event routing settings across endpoints

 - Retrieve the list of all saved endpoints on the device


Key fields to check in the response:







|Field|What to Check|Why It Matters|
|---|---|---|
|activate|Is the endpoint active?|An inactive endpoint does not connect. Confirm before expecting data<br>flow.|
|protocol|Is the correct protocol configured?|A protocol mismatch (e.g., MQTT vs MQTT_TLS) prevents broker<br>connection.|
|url and port|Are the broker address and port<br>correct?|Incorrect values prevent the reader from reaching the broker.|
|verificationType|Is TLS verification set correctly?|Mismatched verification type causes TLS handshake failures.|
|publishTopics|Are the correct topics configured?|The reader publishes data only to explicitly listed topics.|
|subscribeTopics|Is the command topic correct?|The reader only receives commands on subscribed topics.|


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Endpoint Config**






|Field|What to Check|Why It Matters|
|---|---|---|
|savedEndpoints.epNames|What endpoints are saved on the<br>device?|Lists all endpoint names available for activation or deletion.|



_Note: Use get_endpoint_config before calling config_endpoint to review existing configuration. This prevents overwriting active_

_endpoint settings unexpectedly._


**MQTT Command Payload**


**Example: Active endpoint config**

```
 {
 "command": "get_endpoint_config",
 "requestId": "abc123"
 }

```

**Example: Specific endpoint config**

```
 {
 "command": "get_endpoint_config",
 "requestId": "def456",
 "endpointDetails": {
 "endpointName": "ctrl"
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the operation being performed, in this case, retrieving the endpoint<br>configuration. | Default: "get_endpoint_config"|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`endpointDetails`**|object|Specifies the endpoint to retrieve configuration details for.|
|**` endpointName`**|string||



**MQTT Response Payload**


**Example: Active endpoint config**

```
 {
 "command": "get_endpoint_config",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "endpointResponse": {
 "activeEndpoints": {

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Get Endpoint Config






**RFD40 / RFD90 MQTT API Reference** Get Endpoint Config

```
 "savedEndpoints": {
 "epNames": [
 "ctrlEP",
 "ctrl",
 "gmdm",
 "dataEP",
 "mgmt3"
 ]
 }
 },
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Example: Specific endpoint config**

```
 {
 "command": "get_endpoint_config",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "endpointResponse": {
 "activeEndpoints": {
 "epConfig": [
 {
 "configuration": {
 "endpointName": "ctrl",
 "epType": "CTRL",
 "protocol": "MQTT",
 "activate": true,
 "url": "10.209.240.104",
 "verificationType": "VERIFY_NONE",
 "port": 1883,
 "qosCommon": 0,
 "tenantId": "zebra",
 "mqttParams": {
 "keepAlive": 96,
 "cleanSession": false,
 "reconnectDelayMin": 5,
 "reconnectDelayMax": 512,
 "username": "mqttuser",
 "password": "xxxxxx",
 "publishTopics": [
 {
 "topic": "CTRL/clients/resp",
 "qos": 0,
 "retain": false
 },
 {
 "topic": "CTRL/clients/event",
 "qos": 0,
 "retain": false
 },

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** **Get Endpoint Config**

```
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
 "format": "PEM"
 },
 "eventConfiguration": {
 "terminalConnection": false,
 "firmwareUpdate": true,
 "network": true,
 "ntp": true,
 "heartbeat": false,
 "power": true,
 "battery": true,
 "fileDownload": true
 }
 }
 }
 ]
 }
 },
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command`**|string|The command indicating the type of operation or request being performed. | Default:<br>"get_endpoint_config"|
|**`requestId`**|string|A unique identifier for the request, used for tracking and correlation purposes.|
|**`apiVersion`**|string|The version of the API being used for the request.|
|**`epDetails`**|object|Contains the active endpoint configuration and list of saved endpoint names.|
|**` activeEndpoints`**|object|A reference to the configuration details of currently active endpoints.|
|**`  epConfig`**|array|An array containing endpoint configurations.|
|**`   configuration`**|object||



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 5


**RFD40 / RFD90 MQTT API Reference** Get Endpoint Config







|Field|Type|Description|
|---|---|---|
|**`    endpointName`**|string|The name of the endpoint, e.g., "MDM" for Mobile Device Management.|
|**`    epType*`**|enum|The type of endpoint, specifying its functionality (e.g., Management, Control, etc.). |<br>Allowed: MGMT | MGMT_EVT | CONTROL | DATA | COMMON | SOTI|
|**`    protocol*`**|enum|The communication protocol used by the endpoint, such as MQTT or HTTP. | Allowed:<br>MQTT | MQTTWS | MQT-TLS | MQTT-WSS | TCPIP | WS | WSS | HID | HTTPS | HTTP |<br>AWS | AZURE|
|**`    activate*`**|boolean|Indicates whether the endpoint is activated (true or false). | Default: false|
|**`    url*`**|string|The URL of the endpoint, specifying its address.|
|**`    verificationType*`**|enum|The type of verification to be used for the endpoint connection. | Allowed: NONE |<br>VERIFY_PEER | VERIFY_HOST | VERIFY_HOST_PEER|
|**`    port*`**|integer|The port number used for the connection.|
|**`    qosCommon`**|integer|The Quality of Service (QoS) level for message delivery.|
|**`    tenantId`**|string|The tenant's unique identifier.|
|**`    mqttParams`**|object||
|**`     keepAlive`**|integer|The keep-alive interval for the MQTT connection. | Max: 65535|
|**`     cleanSession`**|boolean|Indicates whether the MQTT session should be clean (true or false). | Default: true|
|<br>**`reconnectDelayMin`**|integer|Minimum delay before reconnecting in case of disconnection.|
|<br>**`reconnectDelayMax`**|integer|Maximum delay before reconnecting in case of disconnection.|
|**`     clientId`**|string|The client ID used for the MQTT connection.|
|**`     username`**|string|The username for authenticating the MQTT connection.|
|**`     password`**|string|The password for authenticating the MQTT connection.|
|**`     publishTopics`**|array|A list of topics to which messages will be published.|
|**`      topic*`**|string|The topic to publish messages to.|
|**`      qos*`**|integer|The QoS level for the published topic.|
|**`      retain*`**|boolean|Indicates whether the message should be retained on the broker.|
|**`     subscribeTopics`**|array|A list of topics to which the client will subscribe.|
|**`      topic*`**|string|The topic to which the client will subscribe.|
|**`      qos*`**|integer|The QoS level for the subscription.|
|**`      retain*`**|boolean|Indicates whether the message should be retained.|
|**`    securityParams`**|object|Security parameters for the endpoint connection.|
|**`     format*`**|enum|The format of the security certificate (e.g., PEM or PFX). | Allowed: PEM | PFX|
|**`     algorithm*`**|enum|The encryption algorithm used (e.g., RSA256). | Allowed: RSA256 | RSA512|


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 6


**RFD40 / RFD90 MQTT API Reference** **Get Endpoint Config**

























|Field|Type|Description|
|---|---|---|
|<br>**`caCertificateFile*`**|string|The CA certificate file for establishing trust.|
|**`     clientCert*`**|string|The client certificate file for authentication.|
|**`     clientKey*`**|string|The client key file for authentication.|
|<br>**`eventConfiguration`**|object|Reference to the event configuration payload.|
|<br>**`terminalConnection`**|boolean|set to true to enable terminal connection/disconnection events|
|**`     firmwareUpdate`**|boolean|set to true to enable fw update events|
|**`     network`**|boolean|set to true to enable network events|
|**`     heartbeat`**|boolean|set to true to enable heart beat|
|**`     power`**|boolean|set to true to enable power source alerts|
|**`     battery`**|boolean|set to true to enable battery alerts|
|**`     temperature`**|boolean|set to true to enable temperature alerts|
|**`     fileDownload`**|boolean|set to true to enable file download alerts|
|<br>**`heartbeatConfiguration`**|object||
|**`      interval`**|integer|heart beat interval in seconds|
|<br>**`inventoryStatus`**|boolean|set to true to enable inventory status as part of heartbeat message|
|**`      batteryStatus`**|boolean|set to true to enable battery status as part of heartbeat message|
|**` savedEndpoints`**|object|A reference to the configuration details of saved endpoint configurations.|
|**`  epNames`**|array|An array containing endpoint configurations.|
|**`   item`**|string||
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|


**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 7**


