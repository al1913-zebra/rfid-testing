**RFD40 / RFD90 MQTT API Reference** **Get Current Region**

# **Get Current Region**


**Description**
**1. Description**


The get_current_region command retrieves the reader's currently applied regulatory region settings.


This command returns:


 - Active country and regulatory region assignment

 - Supported channel set for the selected region

 - Allowed transmit power range information

 - Region-level compliance parameters used by the radio


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Regulatory Configuration Query|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_config, get_status, get_version|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve active regulatory region settings|



**3. When to Use This Command**


Use get_current_region to:


 - Confirm that the device is configured for the correct regulatory region

 - Validate channel and power constraints before inventory operations

 - Audit compliance settings across deployments


Key fields to check in the response:


















|Field|What to Check|Why It Matters|
|---|---|---|
|country|Is the correct country<br>configured?|The reader must match the regulatory region of its deployment location.|
|regulatoryStandard|FCC, ETSI, or another standard?|Determines which transmission rules apply — channels, power limits, and LBT<br>behavior.|
|maxTxPowerSupported|What is the allowed power<br>ceiling?|Use this to validate transmit power settings before starting inventory.|
|lbtEnabled|Is Listen Before Talk active?|Required in some regions (e.g., ETSI). Affects inventory start behavior.|
|frequencyHopping|Is frequency hopping enabled?|Mandatory in most regions. Confirms the radio is operating compliantly.|
|channelData|How many channels are<br>available?|The channel list defines where the reader can operate within the region.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Current Region**


_Note: Always run get_current_region after device provisioning or region changes to confirm the regulatory settings are correct before_

_starting inventory operations._


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_current_region",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the operation being performed, in this case, retrieving the current region<br>configuration.|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "get_current_region",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "currentRegion": {
 "frequencyHopping": true,
 "channelData": [
 "91575",
 "91525",
 "90325",
 "92675",
 "92625",
 "90425",
 "92725",
 "92025",
 "91925",
 "90925",
 "91875",
 "91775",
 "90525",
 "90475",
 "92525",
 "92175",
 "91475",
 "90675",
 "91375",
 "92225",

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Get Current Region**

```
 "91125",
 "91175",
 "90375",
 "90875",
 "90575",
 "91225",
 "90625",
 "91725",
 "91425",
 "90725",
 "91825",
 "91625",
 "91025",
 "91075",
 "90775",
 "92475",
 "90975",
 "91975",
 "91675",
 "91325",
 "92375",
 "90825",
 "92575",
 "91275",
 "92425",
 "92125",
 "92075",
 "92275",
 "90275",
 "92325"
 ],
 "country": "United States",
 "lbtEnabled": false,
 "maxTxPowerSupported": 300,
 "minTxPowerSupported": 0,
 "regulatoryStandard": "FCC"
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
|**`command*`**|string|The command issued by the client, indicating the operation to retrieve the current region.|
|**`requestId*`**|string|A unique identifier for tracking the request.|
|**`apiVersion*`**|enum|The version of the API being called, allowing for version-specific processing. | Allowed:<br>V1.0 | V1.1|
|**`currentRegion`**|object|A reference to the detailed payload structure containing region-specific information.|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Get Current Region**

|Field|Type|Description|
|---|---|---|
|**` frequencyHopping*`**|boolean|Indicates whether frequency hopping is enabled in the region.|
|**` channelData*`**|array|List of channel frequencies available in the region, represented as strings.|
|**`  item`**|string||
|**` country*`**|string|The country for ehich the device is configured to.|
|**` lbtEnabled*`**|boolean|Specifies if Listen Before Talk (LBT) is enabled for the region.|
|**` maxTxPowerSupported*`**|number|The maximum transmission power supported in the region, measured in dBm.|
|**` minTxPowerSupported*`**|number|The minimum transmission power supported in the region, measured in dBm.|
|**` regulatoryStandard*`**|string|The regulatory standard governing the region's transmission rules.|
|**`response*`**|object|A reference to the standard response schema used for this API.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


