**RFD40 / RFD90 MQTT API Reference** **Config Events**

# **Config Events**


**Description**
**1. Description**


The config_events command configures or updates event and alert behavior on the reader.


This command allows you to configure:


 - Enable or disable individual event streams

 - Heartbeat interval and heartbeat payload options

 - Threshold values for CPU, RAM, flash, and temperature alerts

 - Monitoring and notification behavior for supported device events


Use this command to:


 - Control which operational events are emitted by the device

 - Tune heartbeat reporting to match monitoring requirements

 - Configure threshold-based alerts for proactive device health monitoring


**2. Command Details**






|Property|Value|
|---|---|
|Pattern Name|Event Configuration|
|Applies To|RFD40 Series, RFD90 Series|
|Related<br>Commands|config_endpoint, reboot, get_status, set_config|
|Required Request<br>Fields|command, requestId, eventConfiguration|
|Supported<br>Operations|Enable and disable events; configure heartbeat and threshold parameters|
|Supported Event<br>Flags|antenna, terminalConnection, firmwareUpdate, gpi, network, exceptions, ntp, userApp, heartbeat, power, battery,<br>temperature, fileDownload, cpuUsage, flashUsage, ramUsage|
|Supported<br>Threshold Fields|cpuThreshold, ramThreshold, flashThreshold, temperatureThreshold|



**3. Before You Begin**


Decide which events and alerts your application needs before sending this command. All event flags and threshold fields inside

eventConfiguration are optional — include only what you need to change.






|What You Need|Details|
|---|---|
|Event flags|Determine which event streams your application needs. Set the corresponding boolean flag to true to enable or false to disable.<br>Omitted flags retain their current device state.|
|Heartbeat<br>configuration|If enabling the heartbeat event, decide the reporting interval (in seconds) and which status fields — inventoryStatus,<br>batteryStatus, and userApps — should be included in each heartbeat message.|
|CPU alert<br>threshold|Know the CPU usage percentage above which you want a CPU alert triggered. Only relevant when cpuUsage is enabled.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Config Events**



|What You Need|Details|
|---|---|
|RAM alert<br>threshold|Know the RAM usage percentage above which you want a RAM alert triggered. Only relevant when ramUsage is enabled.|
|Flash alert<br>threshold|Know the flash usage percentage above which you want a flash alert triggered. Only relevant when flashUsage is enabled.|
|Temperature<br>alert threshold|Know the temperature value above which you want a temperature alert triggered. Only relevant when temperature is enabled.|


**4. Event Types**





Each boolean flag in eventConfiguration controls an independent event stream on the device.

|Event Flag|Description|
|---|---|
|antenna|Antenna-related events, such as connection or disconnection of an antenna.|
|terminalConnection|Terminal connection and disconnection events.|
|firmwareUpdate|Events related to firmware update progress and completion.|
|gpi|General Purpose Input (GPI) state change events.|
|network|Network interface events, such as connectivity changes.|
|exceptions|Exception and error events from the device runtime.|
|ntp|NTP synchronization events.|
|userApp|User application lifecycle events.|
|heartbeat|Periodic heartbeat messages from the device. Requires heartbeatConfiguration if interval or payload options need to be set.|
|power|Power source change events, such as switching between battery and external power.|
|battery|Battery status events, such as low battery warnings.|
|temperature|Temperature monitoring events. Requires temperatureThreshold to define the trigger level.|
|fileDownload|File download progress and completion events.|
|cpuUsage|CPU usage alert events. Requires cpuThreshold to define the trigger level.|
|flashUsage|Flash storage usage alert events. Requires flashThreshold to define the trigger level.|
|ramUsage|RAM usage alert events. Requires ramThreshold to define the trigger level.|



**MQTT Command Payload**


**Example: Enable all events**

```
 {
 "command": "config_events",
 "requestId": "abc123",
 "eventConfiguration": {
 "antenna": true,
 "terminalConnection": true,

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Config Events

```
 "firmwareUpdate": true,
 "gpi": true,
 "network": true,
 "exceptions": true,
 "ntp": true,
 "userApp": true,
 "heartbeat": true,
 "power": true,
 "battery": true,
 "temperature": true,
 "fileDownload": true,
 "cpuUsage": true,
 "flashUsage": true,
 "ramUsage": true,
 "heartbeatConfiguration": {
 "interval": 100,
 "inventoryStatus": true,
 "batteryStatus": true,
 "userApps": true
 },
 "cpuThreshold": 80,
 "ramThreshold": 80,
 "flashThreshold": 80,
 "temperatureThreshold": 55
 }
 }

```

**Example: Selective events**

```
 {
 "command": "config_events",
 "requestId": "abc123",
 "eventConfiguration": {
 "antenna": false,
 "terminalConnection": true,
 "firmwareUpdate": true,
 "gpi": false,
 "network": true,
 "exceptions": false,
 "ntp": false,
 "userApp": false,
 "heartbeat": false,
 "power": true,
 "battery": true,
 "temperature": true,
 "fileDownload": true,
 "cpuUsage": false,
 "flashUsage": false,
 "ramUsage": false
 }
 }

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Config Events**


**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to configure events & alert threshold values|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`eventConfiguration`**|object|Specifies which device events to enable or disable and their configuration thresholds.|
|**` terminalConnection`**|boolean|set to true to enable terminal connection/disconnection events|
|**` firmwareUpdate`**|boolean|set to true to enable fw update events|
|**` network`**|boolean|set to true to enable network events|
|**` heartbeat`**|boolean|set to true to enable heart beat|
|**` power`**|boolean|set to true to enable power source alerts|
|**` battery`**|boolean|set to true to enable battery alerts|
|**` temperature`**|boolean|set to true to enable temperature alerts|
|**` fileDownload`**|boolean|set to true to enable file download alerts|
|**` heartbeatConfiguration`**|object||
|**`  interval`**|integer|heart beat interval in seconds|
|**`  inventoryStatus`**|boolean|set to true to enable inventory status as part of heartbeat message|
|**`  batteryStatus`**|boolean|set to true to enable battery status as part of heartbeat message|



**MQTT Response Payload**


**Example**

```
 {
 "command": "config_events",
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
|**`command*`**|string|The command that was executed to configure events.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


**RFD40 / RFD90 MQTT API Reference** Config Events

|Field|Type|Description|
|---|---|---|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Command response status code. See x-error-codes for code meanings. | Min: 0 | Max:<br>30|
|**` description*`**|string|response description in detail|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 5**


