**RFD40 / RFD90 MQTT API Reference** **Control Operation**

# **Control Operation**


**Description**
**1. Description**


The control_operation command configures or updates the active radio or scanner operation state on the reader.


This command allows you to configure:


 - Control type selection (RFID or SCANNER)

 - Start or stop operation for the selected control type


Use this command to:


 - Start RFID inventory operations on demand

 - Stop active radio or scanner operations


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|RFID Operation Control|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_operating_mode, set_operating_mode, get_status|
|Required Request Fields|command, requestId, ctrlOprPayload|
|Supported Operations|START, STOP|
|Supported Control Types|RFID, SCANNER|



**3. Before You Begin**


This is a lightweight command with only two required payload fields. Confirm the following before sending.







|What You<br>Need|Details|
|---|---|
|Control type|Decide which reader subsystem to control — RFID for the radio frequency inventory engine, or SCANNER for the barcode<br>scanner.|


**4. Operations**


The operation field inside ctrlOprPayload determines the action performed on the selected reader subsystem.


 - START — Begins the operation for the selected control type. For RFID, this starts the inventory cycle using the currently

configured operating mode.

 - STOP — Halts the active operation for the selected control type.


**5. Rules and Constraints**


Violating any of these rules will cause the command to fail or the device to return an unexpected response.


**Start Operation**


 - Sending START while an inventory is already running returns error code 11. Use get_status to check the current device state

before sending START if the inventory state is uncertain.


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Control Operation**


 - control_operation does not configure operating parameters. Always configure the desired behavior using set_operating_mode

before sending a START command.


**Stop Operation**


 - Sending STOP when no operation is active returns error code 12. This is not a failure — the device is already in the desired idle

state. No corrective action is required.


**MQTT Command Payload**


**Example: Start inventory**

```
 {
 "command": "control_operation",
 "requestId": "abcd1432",
 "ctrlOprPayload": {
 "controlType": "RFID",
 "operation": "START"
 }
 }

```

**Example: Stop inventory**

```
 {
 "command": "control_operation",
 "requestId": "abcd1432",
 "ctrlOprPayload": {
 "controlType": "RFID",
 "operation": "STOP"
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command`**|enum|Specifies the name of the command to be executed. In this case, it is control_operation.<br>| Allowed: control_operation|
|**`requestId`**|string|A unique identifier for the request. This ensures traceability and prevents duplicate<br>processing of the same request.|
|**`ctrlOprPayload`**|object|Defines the control operation to be performed on the device, including the control type<br>and the operation to start or stop.|
|**` controlType*`**|enum|Specifies whether the control is for RFID or Scanner operations. | Allowed: RFID |<br>SCANNER|
|**` operation*`**|enum|Indicates the operation to be performed such as start or stop the inventory. | Allowed:<br>START | STOP|



**MQTT Response Payload**


**Example**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Control Operation**

```
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

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The type of command being executed or responded to. For MQTT, this specifies the<br>operation type.|
|**`requestId*`**|string|A unique identifier for the request, used for tracking the request and its corresponding<br>response in the MQTT protocol.|
|**`apiVersion*`**|enum|The version of the API being used in this MQTT response message. | Allowed: V1.0 |<br>V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 11 — Inventory in progress<br>- 12 — No Radio Operation in Progress<br>- 23 — Invalid enum value | Min: 0 | Max: 23|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|11|Inventory in progress|An RFID inventory operation is<br>currently running|Stop the current inventory before starting a new operation or<br>changing the mode|
|12|No Radio Operation in Progress|A stop command was sent but no<br>radio operation is currently active|No action required — the radio is already idle|
|23|Invalid enum value|A field value does not match any of<br>the allowed enum options|Check the schema for allowed values and correct the field|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


