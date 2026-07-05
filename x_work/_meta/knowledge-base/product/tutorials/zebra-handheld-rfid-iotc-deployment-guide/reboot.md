**RFD40 / RFD90 MQTT API Reference** **Reboot**

# **Reboot**


**Description**
**1. Description**


The reboot command performs a warm reset of the device. After a successful reboot, the device automatically reinitializes its

connection to the previously connected server. If the reboot fails, a failure notification is sent.


Use this command to:


 - Restart the device for applying configuration changes

 - Recover from error states

 - Reinitialize device connections

 - Apply pending device updates


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Device Reboot|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|config_events, config_endpoint, set_operating_mode|
|Required Request Fields|command, requestId|
|Supported Operations|Warm reset of the device|



**3. Before You Begin**


This is a minimal command with no configuration payload. Confirm the following before sending.






|What You<br>Need|Details|
|---|---|
|Inventory<br>state|The device cannot be rebooted while an RFID inventory operation is in progress. Stop the active inventory using control_operation<br>before sending this command. Attempting to reboot during an active inventory returns error code 5.|
|Server<br>reconnection|After a successful reboot, the device automatically reconnects to the previously connected server. No manual reconnection is<br>required.|
|Configuration<br>persistence|All management endpoint configurations are restored after reboot. Only radio operation configurations from control endpoint<br>operations are lost on reboot.|



**4. Rules and Constraints**


Violating any of these rules will cause the command to be rejected.


**Inventory State**


 - The device cannot be rebooted while an RFID inventory operation is active. Sending reboot during an active inventory returns

error code 5.

 - Use control_operation with operation: STOP to halt the inventory before sending this command.


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Reboot**


**MQTT Command Payload**


**Example**

```
 {
 "command": "reboot",
 "requestId": "123abcd"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to reboot the reader|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "reboot",
 "requestId": "18996",
 "apiVersion": "V1.1",
 "response": {
 "code": 1,
 "description": "Command payload is accepted"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to reboot the device.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 5 — Can't reboot device, inventory in progress | Min: 0 | Max: 5|
|**` description*`**|string|response description in detail|



**Error Codes**


**Code** **Description** **Cause** **Action**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Reboot








|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|5|Can't reboot device, inventory in<br>progress|An RFID inventory operation is<br>currently active|Stop the inventory with control_operation before rebooting|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


