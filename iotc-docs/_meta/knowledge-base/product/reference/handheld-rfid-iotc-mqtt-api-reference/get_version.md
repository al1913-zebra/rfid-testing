**RFD40 / RFD90 MQTT API Reference** **Get Version**

# **Get Version**


**Description**
**1. Description**


The get_version command retrieves reader identity and software version information.


This command returns:


 - Reader model information

 - Reader serial number and SKU

 - Firmware version and component versions

 - Manufacturer and company identity metadata


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Device Identity and Firmware Retrieval|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_config, get_status, set_os|
|Required Request Fields|command, requestId|
|Supported Operations|Read reader identity and version details|



**3. When to Use This Command**


Use get_version to:


 - Identify the exact device model and serial number

 - Verify firmware and component version alignment

 - Confirm device software baseline before updates or troubleshooting


Key fields to check in the response:






|Field|What to Check|Why It Matters|
|---|---|---|
|model|RFD40 or RFD90?|Confirm the correct device type is connected before applying model-specific<br>configurations.|
|firmwareVersion|Is the firmware up to date?|Compare against the expected baseline before running updates or diagnosing<br>issues.|
|serialNumber|Does it match the device<br>label?|Used for asset tracking, support tickets, and device registration.|
|sku|Is the correct variant<br>deployed?|SKU identifies the regional and hardware variant of the reader.|
|detailedVersions.iotcVersion|Is IoTC at the expected<br>version?|IoTC version determines which MQTT API commands and features are available.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Version**


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_version",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Used to get the reader information|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example**

```
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

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to retrieve the reader version details. | Default:<br>"get_version"|
|**`requestId*`**|string|The unique identifier of the original request.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Get Version

|Field|Type|Description|
|---|---|---|
|**`apiVersion*`**|enum|Allowed: V1.1 | V1.0|
|**`readerVersion`**|object|Contains device version details including firmware, model, serial number, and SKU.|
|**` firmwareVersion*`**|string|The firmware version of the reader.|
|**` model*`**|enum|The model of the reader, such as RFD40 or RFD90. | Allowed: RFD40 | RFD90|
|**` serialNumber*`**|string|The serial number of the reader.|
|**` sku*`**|string|The stock keeping unit (SKU) identifier for the reader.|
|**` companyName*`**|enum|The company name associated with the reader. | Allowed: Zebra Technologies|
|**` manufacturerName*`**|enum|The manufacturer name associated with the reader. | Allowed: Zebra Technologies|
|**` detailedVersions`**|object|Detailed version information for the reader.|
|**`  scannerFirmware`**|string|The firmware version of the scanner component.|
|**`  radioFirmware`**|string|The firmware version of the radio component.|
|**`  iotcVersion`**|enum|The version of the IoT Connector (IoTC) software. | Allowed: V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Command response status code. See x-error-codes for code meanings. | Min: 0 | Max:<br>30|
|**` description*`**|string|response description in detail|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


