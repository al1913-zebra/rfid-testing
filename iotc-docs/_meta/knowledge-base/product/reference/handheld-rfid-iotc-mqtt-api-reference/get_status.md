**RFD40 / RFD90 MQTT API Reference** **Get Status**

# **Get Status**


**Description**
**1. Description**


The get_status command retrieves a live health and readiness snapshot from the reader.


This command returns:


 - Power source and charging state details

 - RFID radio activity and connectivity status

 - Device time and NTP synchronization state

 - Battery health and capacity metrics


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Device Status Retrieval|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_version, get_current_region, get_config|
|Required Request Fields|command, requestId|
|Supported Operations|Status retrieval|



**3. When to Use This Command**


Use get_status to:


 - Monitor device health and readiness before starting operations

 - Verify device connectivity before starting RFID operations

 - Troubleshoot communication, radio, or battery-related issues


Key fields to check in the response:













|Field|What to Check|Expected State|
|---|---|---|
|radioActivity|Is an inventory already running?|INACTIVE before starting a new operation.|
|radioConnection|Is the radio connected to the<br>broker?|CONNECTED for normal operation.|
|powerSource|What is powering the device?|USB, WALLCHARGER, or CRADLE for powered operation.|
|chargePercentage|Is the battery sufficient for the<br>task?|Verify before long inventory runs on battery power.|
|ntp.reach|Is the NTP server reachable?|Non-zero means NTP is reachable and syncing. 0 means the NTP server is not<br>reachable.|
|stateOfHealth|Is the battery healthy?|GOOD for normal operation. AVERAGE or POOR may indicate battery replacement is<br>needed.|


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Status**


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_status",
 "requestId": "abcd123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command used to get the reader status information|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "get_status",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "deviceStatus": {
 "powerSource": "USB",
 "radioActivity": "INACTIVE",
 "radioConnection": "CONNECTED",
 "systemTime": "2024-02-26T13:45:53.728Z",
 "temperature": 32,
 "ntp": {
 "offset": 0,
 "reach": 0
 },
 "terminalConnection": {
 "status": "CONNECTED",
 "type": "USB"
 },
 "batteryStatus": {
 "capacity": 6400,
 "stateOfHealth": "GOOD",
 "chargePercentage": 100,
 "chargeStatus": 1
 }
 },
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Get Status**


**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to retrieve the device status.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`deviceStatus`**|object|Contains the current device status including power, battery, and connectivity information.|
|**` powerSource*`**|enum|The source of power for the device (e.g., DC, Wall Charger, USB, or Cradle). | Allowed:<br>DC | WALLCHARGER | USB | CRADLE|
|**` radioActivity*`**|enum|The activity status of the device's radio (e.g., Active or Inactive). | Allowed: INACTIVE |<br>ACTIVE|
|**` radioConnection*`**|enum|The connection status of the device's radio (e.g., Connected or Disconnected). |<br>Allowed: CONNECTED | DISCONNECTED|
|**` hostname*`**|string|The hostname of the device on the network.|
|**` systemTime`**|string|The system time of the device in ISO 8601 format. | Format: time|
|**` temperature*`**|integer|The current temperature of the device in degrees Celsius.|
|**` ntp`**|object|Details about the Network Time Protocol (NTP) synchronization.|
|**`  offset`**|integer|The offset in milliseconds between the device's clock and the NTP server.|
|**`  reach`**|integer|The reachability score of the NTP server.|
|**` terminalConnection`**|object|Details about the terminal connection to the device.|
|**`  status`**|enum|The connection status of the terminal (e.g., Connected or Disconnected). | Allowed:<br>CONNECTED | DISCONNECTED|
|**`  type`**|enum|The type of terminal connection (e.g., Bluetooth, CIO, or USB). | Allowed: BLUETOOTH<br>| CIO | USB|
|**` batteryStatus`**|object|Information about the battery status of the device.|
|**`  mfgDate`**|string|The battery manufacture date.|
|**`  cycleCount`**|integer|The number of completed battery charge cycles.|
|**`  fullChargeCapacity`**|integer|The current full charge capacity of the battery in mAh.|
|**`  temperature`**|integer|The battery temperature in degrees Celsius.|
|**`  designCapacity`**|integer|The designed battery capacity in mAh.|
|**`  batteryType`**|string|The battery chemistry/type.|
|**`  capacity`**|integer|The battery capacity remaining in mAh.|
|**`  stateOfHealth`**|enum|The overall health of the battery (e.g., Good, Average, or Poor). | Allowed: GOOD |<br>AVERAGE | POOR|
|**`  chargePercentage`**|integer|The percentage of battery charge remaining.|
|**`  chargeStatus`**|integer|The charging status of the device battery:<br>0 - Charger not connected,<br>1 - Charger connected and charging in progress,|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Get Status**

|Field|Type|Description|
|---|---|---|
|||2 - Charger connected and battery is 100%.|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


