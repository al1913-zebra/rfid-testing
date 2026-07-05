**RFD40 / RFD90 MQTT API Reference** **Set Post Filter**

# **Set Post Filter**


**Description**
**1. Description**


The set_post_filter command configures which tag reads should be reported by the reader after matching rules are applied.


This command allows you to configure:


 - Operation type (ADD, MODIFY, DELETE)

 - Data endpoint target (DATA_EP1 or DATA_EP2)

 - Match pattern value

 - Match method (PREFIX, SUFFIX, REGEX)


Use this command to:


 - Reduce unwanted tag reports

 - Focus reporting on specific tag patterns

 - Update filter logic without changing the inventory command flow


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Post-Filter Configuration|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_post_filter, get_operating_mode, control_operation|
|Required Request Fields|command, requestId, postFilterPayload|
|Supported Operations|ADD, MODIFY, DELETE|
|Supported Data Endpoints|DATA_EP1, DATA_EP2|
|Supported Match Methods|PREFIX, SUFFIX, REGEX|
|Supported Report Behaviors|INCLUDE, EXCLUDE|



**3. Before You Begin**


Gather the filter details before sending this command. An incorrect match pattern or method mismatch will result in a saved but

non-functional filter.






|What You<br>Need|Details|
|---|---|
|Operation<br>type|Decide whether you are adding a new filter (ADD), updating an existing one (MODIFY), or removing one (DELETE).|
|Data<br>endpoint|Identify which data endpoint the filter should apply to — DATA_EP1 or DATA_EP2.|
|Match<br>pattern|Prepare the value to match against the tag ID. For PREFIX and SUFFIX methods, only hexadecimal digits are allowed and the number<br>of digits must be even. For REGEX, prepare a valid regular expression string.|
|Match<br>method|Choose how the pattern is applied — PREFIX matches the beginning of the tag ID, SUFFIX matches the end, and REGEX matches<br>using a regular expression.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Set Post Filter**






|What You<br>Need|Details|
|---|---|
|Report<br>operation|Decide whether matching tags should be reported (INCLUDE) or suppressed (EXCLUDE).|



**4. Operations**


The operation field inside postFilterPayload determines the action performed on the post filter.


 - ADD — Creates a new post filter rule on the specified data endpoint.

 - MODIFY — Updates an existing post filter rule on the specified data endpoint.

 - DELETE — Removes an existing post filter rule from the specified data endpoint.


**5. Match Methods**


The matchPatternMethod field defines how the matchPattern value is compared against the tag ID.

|matchPatternMethod|Description|
|---|---|
|PREFIX|Matches the beginning of the tag ID.|
|SUFFIX|Matches the end of the tag ID.|
|REGEX|Matches the tag ID using a regular expression.|



**6. Rules and Constraints**


Violating any of these rules will cause the command to fail or the filter to behave incorrectly.


**Match Pattern**


 - For PREFIX and SUFFIX methods, matchPattern must contain only hexadecimal digits (0–9, a–f, A–F) and must have an even

number of characters.

 - For REGEX method, matchPattern must be a valid regular expression string.

 - An incorrectly formatted pattern will result in a saved but non-functional filter.


**Data Endpoints**


 - Each filter is scoped to a specific data endpoint (DATA_EP1 or DATA_EP2). Filters applied to one endpoint do not affect the other.


**MQTT Command Payload**


**Example: Filter tags using prefix**

```
 {
 "command": "set_post_filter",
 "requestId": "abc123",
 "postFilterPayload": {
 "operation": "ADD",
 "dataEpType": "DATA_EP1",
 "matchPattern": "FFFFBBBBA500",
 "matchPatternMethod": "PREFIX",
 "reportOperation": "INCLUDE"
 }
 }

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Set Post Filter**


**Example: Filter tags using regex**

```
 {
 "command": "set_post_filter",
 "requestId": "abc123",
 "postFilterPayload": {
 "operation": "ADD",
 "dataEpType": "DATA_EP1",
 "matchPattern": "E280",
 "matchPatternMethod": "REGEX",
 "reportOperation": "EXCLUDE"
 }
 }

```

**Example: Filter tags using suffix**

```
 {
 "command": "set_post_filter",
 "requestId": "abc123",
 "postFilterPayload": {
 "operation": "ADD",
 "dataEpType": "DATA_EP1",
 "matchPattern": "BBBBEEEE",
 "matchPatternMethod": "SUFFIX",
 "reportOperation": "INCLUDE"
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the name of the command to be executed. In this case, it is set_post_filter.|
|**`requestId*`**|string|A unique identifier for the request. This ensures traceability and prevents duplicate<br>processing of the same request.|
|**`postFilterPayload`**|object|Defines the post-filter configuration to apply to scanned RFID tags, including the filter<br>operation, data endpoint type, match pattern, pattern method, and report operation.|
|**` operation`**|enum|Specifies the operation to perform on the filter such as add a new filter, remove and<br>update an existing filter.<br> | Allowed: ADD | DELETE | MODIFY|
|**` dataEpType`**|enum|Specifies the data endpoint to which the filter should be applied. Two data endpoints are<br>supported for reporting filtered tag data.<br> | Allowed: DATA_EP1 | DATA_EP2|
|**` matchPattern`**|string|Defines the value to match for the filter. For prefix and suffix filters, only hexadecimal<br>digits are allowed, and the number of digits must be even. When a prefix filter is used,<br>select filters cannot be applied.|
|**` matchPatternMethod`**|enum|Specifies the method used to match the tag ID. `PREFIX`: Matches the beginning of the<br>tag ID. `SUFFIX`: Matches the end of the tag ID. `REGEX`: Matches the tag ID using a<br>regular expression.<br> | Allowed: PREFIX | SUFFIX | REGEX|
|**` reportOperation`**|enum|Specifies the filter operation to apply. `INCLUDE`: Only tags matching the filter criteria|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Set Post Filter**

|Field|Type|Description|
|---|---|---|
|||will be reported. `EXCLUDE`: Tags matching the filter criteria will be excluded from<br>reporting.<br> | Allowed: INCLUDE | EXCLUDE|



**MQTT Response Payload**


**Example**

```
 {
 "command": "set_post_filter",
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
|**`command*`**|string|The command that was executed to set the post filter configuration.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 23 — Invalid enum value | Min: 0 | Max: 23|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|23|Invalid enum value|A field value does not match any of<br>the allowed enum options|Check the schema for allowed values and correct the field|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


