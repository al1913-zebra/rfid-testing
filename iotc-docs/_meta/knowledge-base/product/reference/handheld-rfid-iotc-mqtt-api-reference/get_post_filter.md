**RFD40 / RFD90 MQTT API Reference** **Get Post Filter**

# **Get Post Filter**


**Description**
**1. Description**


The get_post_filter command retrieves the post-filter rules currently configured on the reader.


This command returns:


 - Active post-filter criteria currently applied on the device

 - Data endpoint filter assignment information

 - Match method and pattern behavior configuration

 - Report operation filtering settings


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Post-Filter Configuration Query|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|set_post_filter, get_operating_mode, control_operation|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve active post-filter configuration|



**3. When to Use This Command**


Use get_post_filter to:


 - Verify the active tag post-filter configuration

 - Confirm data endpoint filter assignments

 - Validate match pattern and report operation behavior


Key fields to check in the response:









|Field|What to Check|Why It Matters|
|---|---|---|
|dataEpType|Which endpoint does this filter<br>apply to?|Filters are scoped per data endpoint (DATA_EP1 or DATA_EP2). Confirm the correct<br>endpoint has the correct rule.|
|matchPattern|Is the pattern correct?|An incorrect pattern means the wrong tags are being included or excluded from reports.|
|matchPatternMethod|Is the match method correct?|PREFIX, SUFFIX, and REGEX behave differently. A method mismatch causes incorrect<br>filtering even with a correct pattern.|
|reportOperation|Is the filter set to INCLUDE or<br>EXCLUDE?|Determines whether matching tags are reported or suppressed. Verify this before a<br>production inventory run.|


**MQTT Command Payload**


**Example**








**RFD40 / RFD90 MQTT API Reference** **Get Post Filter**

```
 "command": "get_post_filter",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the name of the command executed. In this case, it is get_post_filter to fetch<br>the current post filter information of the device.|
|**`requestId*`**|string|A unique identifier assigned to the request, used to track and correlate responses with<br>their corresponding requests.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "get_post_filter",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "postFilterPayload": {
 "postFilter": [
 {
 "dataEpType": "DATA_EP1",
 "matchPattern": "FFFF",
 "matchPatternMethod": "REGEX",
 "reportOperation": "INCLUDE"
 }
 ]
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
|**`command`**|string|The type of command being executed or responded to. For MQTT, this specifies the<br>operation type.|
|**`requestId`**|string|A unique identifier for the request, used for tracking the request and its corresponding<br>response in the MQTT protocol.|
|**`apiVersion`**|enum|Allowed: V1.1 | V1.0|
|**`postFilterPayload`**|object|Contains the current post-filter configuration applied to scanned tags.|
|**` postFilter`**|array|A list of post-filter configurations.|
|**`  dataEpType`**|string|The type of data endpoint.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Get Post Filter**

|Field|Type|Description|
|---|---|---|
|**`  matchPattern`**|string|The pattern to match during filtering.|
|**`  matchPatternMethod`**|string|The method used to apply the match pattern.|
|**`  reportOperation`**|string|The operation type for reporting.|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


