**RFD40 / RFD90 MQTT API Reference** **Alerts**

# **Alerts**


**Description**
**1. Description**


The alerts event provides detailed, structured alert information from the device for operational monitoring and troubleshooting.


This event includes:


 - Alert type, state, and priority classification

 - A structured alertDetails payload with domain-specific fields

 - Alert identifiers covering battery, power, firmware, and network conditions


Use this event to:


 - Monitor important status transitions and critical conditions

 - Track device health and infrastructure-related changes

 - Feed alert pipelines that require structured alert context


**2. Event Details**

|Property|Value|
|---|---|
|Event Type|Alert|
|Applies To|RFD40 Series, RFD90 Series|
|Trigger Condition|Generated when a device condition transitions state or crosses a monitored threshold|
|Related Events|alert_short, heartBeatEVT, exceptionEVT|



**3. When This Event Is Published**


The reader publishes alerts automatically when a monitored device condition changes state or crosses a threshold. No command is

required.

|`id`|Trigger Condition|`state` Values|
|---|---|---|
|BATTERY|Battery charge or health state changes.|ONESHOT|
|POWER|Power source changes (e.g., USB to battery).|ONESHOT|
|NETWORK_EVENT|Wi-Fi or Ethernet interface connects, disconnects, or changes IP.|ONESHOT|
|FIRMWARE_UPDATE|Firmware update starts, progresses, or completes.|SET while in progress, CLEAR on completion|
|TEMPERATURE|Device temperature crosses a monitored threshold.|SET when threshold crossed, CLEAR when resolved|
|GPI_EVENT|A GPI input state changes.|ONESHOT|
|ANTENNA_EVENT|An antenna state changes.|ONESHOT|



_Note: The state field tells you whether an alert condition is active or resolved. SET means the condition is currently active._

_CLEAR means it has been resolved. ONESHOT is a one-time informational event with no persistent state — it fires once and_

_does not require a corresponding CLEAR._


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** Alerts


**MQTT Response Payload**


**Example: example1**

```
 {
 "type": "ALERT",
 "timestamp": "2026-04-29T12:33:34.279Z",
 "state": "ONESHOT",
 "id": "BATTERY",
 "priority": "LOW",
 "alertDetails": {
 "batteryAlert": {
 "status": "CHARGING",
 "stateOfHealth": "GOOD",
 "chargePercentage": 100
 }
 }
 }

```

**Example: example2**

```
 {
 "type": "ALERT",
 "timestamp": "2026-04-29T12:33:34.290Z",
 "state": "ONESHOT",
 "id": "POWER",
 "priority": "HIGH",
 "alertDetails": {
 "powerEvent": {
 "powerSource": "BATTERY",
 "powerMode": "ACTIVE"
 }
 }
 }

```

**Example: example3**

```
 {
 "type": "ALERT",
 "timestamp": "2026-04-29T12:33:34.300Z",
 "state": "ONESHOT",
 "id": "NETWORK_EVENT",
 "priority": "HIGH",
 "alertDetails": {
 "networkInfo": {
 "networkInterface": {
 "wifiStatus": [
 {
 "interface": "wlan0",
 "status": "CONNECTED",
 "ssid": "IOT_TESTAP",
 "ipV4Address": "192.168.0.107"

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 2


**RFD40 / RFD90 MQTT API Reference** **Alerts**

```
 }
 ]
 }
 }
 }
 }

```

**Example: example4**

```
 {
 "type": "ALERT",
 "timestamp": "2026-04-29T12:33:57.757Z",
 "state": "ONESHOT",
 "id": "NETWORK_EVENT",
 "priority": "HIGH",
 "alertDetails": {
 "networkInfo": {
 "networkInterface": {
 "ethStatus": [
 {
 "interface": "eth0",
 "status": "CONNECTED",
 "linkStatus": "UP",
 "ipV4Address": "192.168.0.111"
 }
 ]
 }
 }
 }
 }

```

**Example: example5**

```
 {
 "type": "ALERT",
 "timestamp": "2026-04-29T12:33:57.757Z",
 "state": "SET",
 "id": "FIRMWARE_UPDATE",
 "priority": "CRITICAL",
 "alertDetails": {
 "fwUpdateStatus": {
 "updateStatus": "updating",
 "overallProgress": 20,
 "stage": "updating scanner fw"
 }
 }
 }

```

**Response Schema**


**Field** **Type** **Description**


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Alerts

|Field|Type|Description|
|---|---|---|
|**`type*`**|enum|Specifies the type of alert or message being generated, such as an event, notification,<br>exception, or alert. | Allowed: EVENT | NOTIFICATION | ALERT|
|**`timestamp*`**|string|Indicates the time at which the alert was generated, formatted as a time string. | Format:<br>time|
|**`state*`**|enum|Represents the state of the alert. 'SET' indicates an active alert, 'CLEAR' indicates the<br>alert has been resolved, and 'ONESHOT' is a one-time alert. | Allowed: SET | CLEAR |<br>ONESHOT|
|**`id*`**|enum|A unique identifier for the alert type, such as a low battery warning or a temperature<br>event. | Allowed: BATTERY | FIRMWARE_UPDATE | NETWORK_EVENT |<br>TEMPERATURE | POWER|
|**`priority*`**|enum|Defines the priority level of the alert, ranging from critical to low. | Allowed: CRITICAL |<br>HIGH | MEDIUM | LOW|
|**`alertDetails`**|anyOf|Contains additional details about the alert, which may vary depending on the specific<br>alert type.|
|**` anyOf 1`**|object|Contains detailed alert information including firmware update, download, and device alert<br>data.|
|**`  fwUpdateStatus`**|object|Details about the status of firmware updates, including progress and results.|
|**`   updateStatus*`**|enum|Current status of the firmware update process. | Allowed: started | updating | successfull<br>| failed | skipped|
|**`   overallProgress*`**|number|Percent of update completed.|
|**`   stage*`**|string|Individual image update steps or description.|
|**`  downloadInfo`**|object|Information regarding file download events, such as source, destination, and status.|
|**`   fileType*`**|enum|Specifies the type of file being downloaded. Options include firmware files<br>(FILE_TYPE_FW) and certificate files (FILE_TYPE_CERT). | Allowed: FILE_TYPE_FW |<br>FILE_TYPE_CERT|
|**`   fileName*`**|string|The name of the file being downloaded.|
|**`   status*`**|enum|Indicates the status of the file download or save operation. | Allowed: DOWNLOAD<br>SUCCESS | DOWNLOAD FAIL | SAVE FAIL | SAVE SUCCESS|
|**`  temperatueInfo`**|object|Details about temperature-related events, including thresholds and alerts.|
|**`   nge*`**|number|Represents the numeric value for the Next Generation Event (specific context needed).|
|**`   pa*`**|number|Indicates the pressure altitude value in numeric format.|
|**`   ambient*`**|number|Refers to the ambient temperature in numeric format.|
|**`  networkInfo`**|object|Data related to network events, including connectivity and performance metrics.|
|**`   networkInterface*`**|object|Details of the network interfaces on the device.|
|**`    ethStatus`**|array|List of Ethernet interface statuses.|
|**`     interface*`**|string|Name of the Ethernet interface.|
|**`     status*`**|enum|Connection status of the Ethernet interface. | Allowed: CONNECTED |<br>DISCONNECTED|
|**`     linkStatus*`**|enum|Link status of the Ethernet interface. | Allowed: UP | DOWN|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** Alerts

|Field|Type|Description|
|---|---|---|
|**`     linkSpeed*`**|string|Speed of the Ethernet link.|
|**`     ipV4Address*`**|string|IPv4 address assigned to the Ethernet interface.|
|**`     ipV6Address*`**|string|IPv6 address assigned to the Ethernet interface.|
|**`    wifiStatus`**|array|List of WiFi interface statuses.|
|**`     interface*`**|string|Name of the WiFi interface.|
|**`     status*`**|enum|Connection status of the WiFi interface. | Allowed: CONNECTED | DISCONNECTED|
|**`     ssid*`**|string|SSID of the connected WiFi network.|
|**`     ipV4Address*`**|string|IPv4 address assigned to the WiFi interface.|
|**`     ipV6Address*`**|string|IPv6 address assigned to the WiFi interface.|
|**`   btRemoteDevice`**|object|Details of connected Bluetooth remote devices.|
|**`    deviceName*`**|string|Name of the Bluetooth remote device. | Default: "TestLaptop"|
|**`    deviceMac*`**|string|MAC address of the Bluetooth remote device.|
|**`  batteryAlert`**|object|Details about battery-related alerts, such as low charge or health status.|
|**`   status`**|enum|The current status of the battery, which indicates its operational state. | Allowed: LOW |<br>CRITICAL | CHARGING | FULL | HIGH|
|**`   stateOfHealth`**|enum|The overall health of the battery, which reflects its long-term capacity and performance. |<br>Allowed: LOW | FULL | CRITICAL | HIGH | CHARGING|
|**`   chargePercentage`**|integer|The current charge level of the battery, represented as a percentage. | Max: 100|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 5**


