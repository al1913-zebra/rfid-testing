**RFD40 / RFD90 MQTT API Reference** **Heartbeatevt**

# **Heartbeatevt**


**Description**
**1. Description**


The heartbeatEVT event provides a periodic liveness and health update from the device.


This event includes:


 - Device uptime and event sequence number

 - Inventory status details such as RFID state and tag count

 - Battery health data including charge percentage and state of health


Use this event to:


 - Confirm that devices remain online and active

 - Monitor inventory progression over time

 - Track battery condition in routine health telemetry


**2. Event Details**

|Property|Value|
|---|---|
|Event Type|Heartbeat Event|
|Applies To|RFD40 Series, RFD90 Series|
|Trigger Condition|Generated at the configured heartbeat interval while the device is active|
|Related Events|dataEVT, alerts, exceptionEVT|



**3. When This Event Is Published**


The reader publishes heartbeatEVT automatically at the interval configured in eventConfiguration.heartbeatConfiguration.interval. No

command is required to trigger it.







|Condition|Behavior|
|---|---|
|Heartbeat is enabled and interval is set|Reader publishes the event at every configured interval while active.|
|inventoryStatus is enabled in<br>heartbeatConfiguration|The data.inventoryStatus block is included in the payload.|
|batteryStatus is enabled in heartbeatConfiguration|The data.batteryAlert block is included in the payload.|
|Device goes offline|Heartbeat stops. The absence of heartbeat events can itself indicate a connectivity or power<br>issue.|


_Note: The heartbeat interval and payload contents are configured via config_endpoint under_

_eventConfiguration.heartbeatConfiguration. If no heartbeat events are arriving, verify that heartbeat is set to true and the interval_

_is greater than 0._


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Heartbeatevt**


**MQTT Response Payload**


**Example**

```
 {
 "eventName": "heartbeat",
 "timestamp": "2019-08-24T14:15:22Z",
 "eventNumber": 120,
 "data": {
 "inventoryStatus": {
 "rfidStatus": "INPROGRESS",
 "tagCount": 45,
 "scanCount": 128
 },
 "batteryAlert": {
 "status": "HIGH",
 "stateOfHealth": "FULL",
 "chargePercentage": 85
 }
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`eventName`**|string|Name of the event, indicating it is a heartbeat signal.|
|**`timestamp`**|string|The timestamp when the event was generated, in ISO 8601 format.|
|**`eventNumber`**|integer|A unique identifier or sequence number for the event.|
|**`upTime`**|string|The uptime duration of the system when the event was generated.|
|**`data`**|anyOf|Additional data associated with the heartbeat event, referencing different event types.|
|**` anyOf 1`**|object|Inventory status event reporting the current state of the RFID inventory operation.|
|**`  rfidStatus`**|enum|The current status of the RFID scanning process. | Allowed: INPROGRESS | STOPPED|
|**`  tagCount`**|integer|The total number of RFID tags scanned in the current operation.|
|**`  scanCount`**|integer|The total number of scan attempts made during the operation.|
|**` anyOf 2`**|object|Battery alert event indicating changes in battery status such as low or critical level.|
|**`  status`**|enum|The current status of the battery, which indicates its operational state. | Allowed: LOW |<br>CRITICAL | CHARGING | FULL | HIGH|
|**`  stateOfHealth`**|enum|The overall health of the battery, which reflects its long-term capacity and performance. |<br>Allowed: LOW | FULL | CRITICAL | HIGH | CHARGING|
|**`  chargePercentage`**|integer|The current charge level of the battery, represented as a percentage. | Max: 100|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


