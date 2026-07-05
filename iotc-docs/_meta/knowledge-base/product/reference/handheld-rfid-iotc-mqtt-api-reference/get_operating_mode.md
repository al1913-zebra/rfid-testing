**RFD40 / RFD90 MQTT API Reference** **Get Operating Mode**

# **Get Operating Mode**


**Description**
**1. Description**


The get_operating_mode command retrieves the reader's current RFID operating mode configuration.


This command returns:


 - Active operating profile configuration

 - Radio trigger and query behavior settings

 - Access operation and metadata reporting configuration

 - Response metadata for command execution


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Operating Mode Query|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|set_operating_mode, control_operation, get_post_filter|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve active RFID operating mode and profile settings|



**3. When to Use This Command**


Use get_operating_mode to:


 - Verify current RFID operating profile selection

 - Inspect current query and radio trigger behavior

 - Confirm active metadata and access operation settings


Key fields to check in the response:












|Field|What to Check|Why It Matters|
|---|---|---|
|profiles|Which profile is currently<br>active?|Confirms whether the reader is running the intended performance profile before<br>starting inventory.|
|radioStartConditions.trigger|What starts the inventory?|Verify the trigger mode matches the application — IMMEDIATE for autonomous,<br>PRESSED for manual.|
|radioStopConditions.trigger|What stops the inventory?|Prevents unexpected behavior where inventory runs indefinitely or stops too<br>early.|
|query.session|Which Gen2 session is in use?|Confirms session alignment with tag population management strategy.|
|query.tagPopulation|Is the tag estimate configured<br>correctly?|An inaccurate estimate degrades inventory performance in dense environments.|
|tagMetaDataToEnable|Which data fields are being<br>reported?|Unused fields add overhead. Verify only required fields are enabled before a<br>production run.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Operating Mode**


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_operating_mode",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|enum|Specifies the name of the command executed. In this case, it is get_operating_mode to<br>fetch the current operating mode information of the device. | Allowed:<br>get_operating_mode|
|**`requestId*`**|string|A unique identifier assigned to the request, used to track and correlate responses with<br>their corresponding requests.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "get_operating_mode",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "operatingMode": {
 "operatingModes": {
 "profiles": "BALANCED_PERFORMANCE",
 "radioStartConditions": {
 "trigger": "IMMEDIATE",
 "startDelay": 0,
 "periodicDuration": 0,
 "repeat": false
 },
 "radioStopConditions": {
 "trigger": "IMMEDIATE"
 },
 "query": {
 "session": "SESSION_1",
 "inventoryState": "STATE_A",
 "slFlag": "ALL",
 "tagPopulation": 30
 },
 "tagMetaDataToEnable": {
 "RSSI": true,
 "SEENCOUNT": true,
 "XPC": false,
 "CRC": false,
 "EPC": false,
 "TID": false,
 "USER": false,

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Get Operating Mode**

```
 "MAC": false,
 "HOSTNAME": false
 }
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
|**`command*`**|string|The type of command being executed or responded to. For MQTT, this specifies the<br>operation type.|
|**`requestId*`**|string|A unique identifier for the request, used for tracking the request and its corresponding<br>response in the MQTT protocol.|
|**`apiVersion*`**|enum|The version of the API being used in this MQTT response message. | Allowed: V1.0 |<br>V1.1|
|**`operatingMode`**|object|Specifies the operating mode configuration for the RFID device, including profile<br>settings, access operations, radio start/stop conditions, query and select pre-filter<br>parameters, and tag metadata options.|
|**` operatingModes`**|object|Represents the reader operating mode.|
|**`  profiles`**|enum|The type of mode of operation<br>FAST_READ: Configures the radio for maximum read speed within short range.<br>(Currently not supported)<br>CYCLE_COUNT: Configures the radio to read as many unique tags as possible.<br>DENSE_READERS: Used when multiple readers in proximity.<br>OPTIMAL_BATTERY: Gives best battery life.<br>BALANCED_PERFORMANCE: Maintains balance between performance and battery<br>life.<br>ADVANCED: Allows custom link profile settings in the advancedConfigurations.In this<br>case, advancedConfigurations must be configured. | Default:<br>"BALANCED_PERFORMANCE" | Allowed: FAST_READ | CYCLE_COUNT |<br>DENSE_READERS | OPTIMAL_BATTERY | BALANCED_PERFORMANCE |<br>ADVANCED|
|<br>**`advancedConfigurations`**|object|To be set when profiles is ADVANCED. In other cases, link profile will be mapped<br>internally.|
|**`   transmitPower`**|number||
|**`   linkProfile`**|enum|Allowed: M4_256K | M2_240K | M2_256K | M2_320K | M4_240K | M4_320K | FM0_0K |<br>FM0_320K | M8_240K | M8_256K | M8_320K|
|**`   session`**|enum|Allowed: SESSION_0 | SESSION_1 | SESSION_2 | SESSION_3|
|**`   dynamicPower`**|boolean||
|**`  accessOperations`**|array|Supports read, write, lock and kill operations on tag memory banks (EPC, TID, USER,<br>etc.).|
|**`   operationType`**|enum|Specifies the type of access operation to perform on the tag. - `READ`: Reads data from|


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Get Operating Mode

|Field|Type|Description|
|---|---|---|
|||the specified memory bank. - `WRITE`: Writes data to the specified memory bank. -<br>`ACCESS`: Performs access operations using a password. - `LOCK`: Locks or unlocks<br>specified memory banks. - `KILL`: Permanently disables the tag using the kill password.<br> | Allowed: READ | WRITE | ACCESS | LOCK | KILL|
|**`   config`**|object||
|**`    memoryBank`**|enum|Specifies the memory bank to be accessed.<br> | Allowed: EPC | TID | USER | RESERVED|
|**`    offset`**|integer|Indicates the starting word position within the specified memory bank where the<br>operation will be applied. Offset is measured in 16-bit words.|
|**`    length`**|integer|Specifies the number of 16-bit words to be read or written. This determines the size of<br>the data block for the operation.|
|**`    data`**|string|A hex string indicating the words to be written. The length of the data field can exceed a<br>single 16-bit word, but it must be a multiple of 16-bit words(see EPC Gen2 Spec).|
|**`    password`**|string|A hex string with exactly 8 hex characters (32 bits) used for access, lock, or kill<br>operations(see EPC Gen2 Spec).|
|**`    lockMemBank`**|enum|Specifies the memory bank to be locked or unlocked.<br> | Allowed: EPC | ACCESS_PWD | KILL_PWD | TID | USER | ALL|
|**`    lockAction`**|enum|Specifies the lock operation to perform on the memory bank with password if given. |<br>Allowed: READ_AND_WRITE | PERMANENT_LOCK | PERMANENT_UNLOCK |<br>UNLOCK|
|**`  radioStartConditions`**|object|Configures how and at what time intervals inventory of tags should be started.<br>If this configuration is absent, by default radio will immediately begin inventorying tags<br>upon receiving a "start" command.|
|**`   trigger`**|enum|Represents the trigger configuration to start the inventory operation. - `PRESSED`:<br>Inventory starts when the trigger is pressed. - `RELEASED`: Inventory starts when the<br>trigger is released. - `IMMEDIATE`: Inventory starts immediately without requiring a<br>trigger action.<br> | Allowed: PRESSED | RELEASED | IMMEDIATE|
|**`   startDelay`**|integer|Specifies the delay (in milliseconds) before starting the inventory operation. This delay<br>applies to any trigger configuration when set to a value greater than 0. For example, if<br>set to 3000 milliseconds, the inventory will start 3 seconds after the trigger action.|
|**`   repeat`**|boolean|Determines whether the inventory operation can be repeated using the trigger. If<br>enabled, pressing the trigger will start reading tags, and releasing it will stop the read<br>operation (not abort). Pressing the trigger again will restart the inventory operation. If<br>disabled, pressing the trigger after stopping the inventory will not restart the operation.|
|**`  radioStopConditions`**|object|Configures how and under what conditions the inventory of tags should stop.<br>If this configuration is absent, the radio will continue inventorying tags until a "stop"<br>command is issued.|
|**`   trigger`**|enum|Represents the trigger configuration to stop the inventory operation. - `PRESSED`:<br>Inventory stops when the trigger is pressed. - `RELEASED`: Inventory stops when the<br>trigger is released. - `IMMEDIATE`: Inventory stops immediately without requiring a<br>trigger action.<br> | Allowed: PRESSED | RELEASED | IMMEDIATE|
|**`   tagCount`**|integer|Specifies the number of unique tags to be read before stopping the inventory.|
|**`   stopTimeout`**|integer|Specifies the duration (in milliseconds) after which the inventory operation will stop.|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** Get Operating Mode

|Field|Type|Description|
|---|---|---|
|**`   inventoryCount`**|integer|Specifies the number of inventory cycles to complete before stopping. Each cycle<br>represents a full scan for tags in the field.|
|**`  query`**|object|Configures the query parameters for inventory operations including session, target, and<br>tag population to optimize tag selection and reading.|
|**`   session`**|enum|Session field (see EPC Gen2 Spec). Determines the session used for inventory<br>operations. Sessions are used to manage tag states and collisions during inventory.<br>SESSION_0 is typically used for single inventory rounds, while SESSION_1,<br>SESSION_2, and SESSION_3 are used for multi-round inventories with varying<br>persistence levels.<br> | Allowed: SESSION_0 | SESSION_1 | SESSION_2 | SESSION_3|
|**`   inventoryState`**|enum|Target field (see EPC Gen2 Spec). Specifies the inventory state of tags to be selected.<br>'STATE_A' and 'STATE_B' represent the two possible states of a tag's inventory flag.<br>'STATE_AB' flips between states to optimize tag selection during inventory rounds.<br> | Allowed: STATE_A | STATE_B | STATE_AB|
|**`   slFlag`**|enum|Sel field (see EPC Gen2 Spec). Indicates the SL (Select) flag used to filter tags. 'ALL'<br>selects all tags regardless of SL flag state. 'ASSERTED' selects only tags with an<br>asserted SL flag, while 'DEASSERTED' selects tags with a deasserted SL flag.<br> | Allowed: ALL | ASSERTED | DEASSERTED|
|**`   tagPopulation`**|integer|Estimates tag count to optimize reading. This value helps the reader adjust its settings<br>(e.g., Q parameter) to improve inventory performance for the expected number of tags in<br>the field. | Min: 0|
|**`  select`**|array|Configures the pre-filtering of tags during inventory operations.<br>This allows for selective reading of tags based on specific criteria, optimizing inventory<br>performance.<br>Supports up to 32 select filters.|
|**`   enable*`**|boolean|Used to enable and disable the pre-filter. Set to true to enable the pre-filter, allowing the<br>reader to apply specific filtering criteria to tags before inventory operations.|
|**`   tagPattern*`**|string|Specifies the bit pattern to match against the tag's memory content. The value must be<br>a hex string (only values 0-9, a-f or A-F) and must have an even number of characters,<br>max 64 characters. This is used to filter tags based on specific data stored in their<br>memory(see EPC Gen2 Spec).|
|**`   memoryBank*`**|enum|Membank field (see EPC Gen2 Spec). Specifies the memory bank to be accessed for<br>filtering.<br> | Allowed: EPC | TID | USER|
|**`   offset*`**|integer|Indicates the starting bit position within the specified memory bank where the tagPattern<br>will be applied for matching(see EPC Gen2 Spec).|
|**`   action*`**|enum|Defines how to set SL/invnetory flag if match/mismatch occurs. These actions determine<br>how tags are selected or excluded during inventory operations(see EPC Gen2 Spec).<br> | Allowed: INV_A_NOT_INV_B_OR_ASRT_SL_NOT_DSRT_SL |<br>INV_A_OR_ASRT_SL | NOT_INV_B_OR_NOT_DSRT_SL |<br>INV_A2BB2A_NOT_INV_A_OR_NEG_SL_NOT_ASRT_SL |<br>INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL | INV_B_OR_DSRT_SL |<br>NOT_INV_A_OR_NOT_ASRT_SL | NOT_INV_A2BB2A_OR_NOT_NEG_SL|
|**`   target*`**|enum|Specifies the session or SL (Select) flag to be used for filtering tags. This helps in<br>managing tag states and collisions during inventory(see EPC Gen2 Spec).<br> | Allowed: SESSION_SL | SESSION_0 | SESSION_1 | SESSION_2 | SESSION_3|
|**`   length*`**|integer|Specifies the number of bits in the tag's memory to be compared against the tagPattern.<br>This determines the size of the filter applied to the memory bank(see EPC Gen2 Spec).|
|**`  tagMetaDataToEnable`**|object|Specifies which metadata fields of the tag should be reported when it is read. Each field<br>can be enabled or disabled based on the application's requirements.|
|**`   RSSI`**|boolean|Indicates whether to report the RSSI. RSSI provides the strength of the signal received|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 5


**RFD40 / RFD90 MQTT API Reference** **Get Operating Mode**

|Field|Type|Description|
|---|---|---|
|||from the tag, which can be useful for determining tag proximity.|
|**`   PHASE`**|boolean|Indicates whether to report the phase angle of the tag's signal. Phase information is<br>often used for advanced applications like tag localization or movement tracking.|
|**`   SEENCOUNT`**|boolean|Indicates whether to report the number of times the tag was detected during inventory.<br>This helps in understanding tag visibility and read consistency over multiple scans.|
|**`   CHANNEL`**|boolean|Indicates whether to report the communication channel used to read the tag. This is<br>useful in environments with multiple channels or frequency hopping to identify the<br>channel of operation.|
|**`   PC`**|boolean|Indicates whether to report the Protocol Control (PC) word. The PC word contains<br>information about the tag's memory structure and encoding, such as the length of the<br>EPC.|
|**`   EPC`**|boolean|Indicates whether to report the EPC. EPC is the unique identifier stored in the tag's<br>memory, typically used for item identification.|
|**`   TID`**|boolean|Indicates whether to report the TID. TID is a factory-programmed, unique identifier for<br>the tag, often used for authentication or anti-counterfeiting.|
|**`   USER`**|boolean|Indicates whether to report the User memory bank data. The User memory bank can<br>store custom data defined by the application, such as additional product information.|
|**`   MAC`**|boolean|Indicates whether to report the MAC address of the reader. This is useful for identifying<br>the specific reader that performed the tag read in networked environments.|
|**`   HOSTNAME`**|boolean|Indicates whether to report the hostname of the reader. Hostnames are helpful in<br>networked environments where readers are identified by their assigned names.|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 6**


