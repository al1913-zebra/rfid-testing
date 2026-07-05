**RFD40 / RFD90 MQTT API Reference** **Mqttconnevt**

# **Mqttconnevt**


**Description**
**1. Description**


The mqttConnEVT event provides endpoint connectivity state changes and device identity context for the reader.


This event includes:


 - Connection state indicating CONNECTED or DISCONNECTED

 - Device model and serial number at the time of the transition

 - API and protocol version metadata for the active connection


Use this event to:


 - Monitor endpoint connectivity transitions in real time

 - Detect reconnect and disconnect behavior in deployment environments

 - Correlate connection state with device identity and version context


**2. Event Details**

|Property|Value|
|---|---|
|Event Type|Connection Event|
|Applies To|RFD40 Series, RFD90 Series|
|Trigger Condition|Generated when the device establishes or loses endpoint connectivity|
|Related Events|alerts, heartBeatEVT, exceptionEVT|



**3. When This Event Is Published**


The reader publishes mqttConnEVT automatically whenever the MQTT endpoint connection state changes. No command is required.







|Condition|`connectionState`|Notes|
|---|---|---|
|Device successfully connects to<br>the MQTT broker|CONNECTED|Published immediately after a successful connection or reconnection. Includes<br>timestamp.|
|Device loses connection to the<br>MQTT broker|DISCONNECTED|Published when the connection drops. timestamp may not be present if the device<br>cannot reach the broker at the time of disconnect.|
|Device reconnects after a drop|CONNECTED|A new CONNECTED event is published each time the device re-establishes the<br>connection.|


**MQTT Response Payload**


**Example: example1**

```
 {
 "connectionState": "CONNECTED",
 "timestamp": "12:17:56",
 "deviceModel": "RFD40",
 "deviceSerialNo": "RFD40-24190525100354",

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Mqttconnevt**

```
 "apiVersion": "1.0",
 "mqttVersion": "3.1.1"
 }

```

**Example: example2**

```
 {
 "connectionState": "DISCONNECTED",
 "deviceModel": "RFD40",
 "deviceSerialNo": "RFD40-24190525100354",
 "apiVersion": 1.2,
 "mqttVersion": 3.0999999
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`connectionState`**|enum|Indicates the connection status of the device. Possible values are 'CONNECTED' or<br>'DISCONNECTED'. | Allowed: CONNECTED | DISCONNECTED|
|**`timestamp`**|string|The time at which the MQTT connection event occurred, formatted as HH:MM:SS. |<br>Format: time|
|**`deviceModel`**|enum|Specifies the model of the device involved in the MQTT connection event. Supported<br>models are 'RFD40' and 'RFD90'. | Allowed: RFD40 | RFD90|
|**`deviceSerialNo`**|string|The unique serial number of the device involved in the MQTT connection event.|
|**`apiVersion`**|number|The version of the API in use during the MQTT connection event.|
|**`mqttVersion`**|number|The version of the MQTT protocol being used for the connection.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


