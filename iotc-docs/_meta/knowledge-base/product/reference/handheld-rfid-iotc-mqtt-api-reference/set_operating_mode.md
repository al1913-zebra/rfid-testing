**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**

# **Set Operating Mode**


**Description**
**1. Description**


The set_operating_mode command updates RFID operating behavior on the RFD40/RFD90 reader, covering profile selection, radio

conditions, query behavior, tag access operations, and metadata reporting.


This command allows you to configure:


 - Reader operating profile and advanced radio settings

 - Access operations such as read, write, lock, and kill

 - Radio start and stop trigger conditions

 - Query and select behavior used during inventory


Use this command to:


 - Optimize performance for your use case

 - Tune inventory behavior for dense or dynamic tag populations

 - Enable only the tag data fields needed by your application


**Command Details**







|Property|Value|
|---|---|
|Pattern Name|Operating Mode Configuration|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_operating_mode, control_operation, set_post_filter|
|Required Request Fields|command, requestId, operatingMode|
|Supported Operations|Configure operating profile, query/select behavior, radio triggers, access operations, and metadata reporting|
|Supported Access<br>Operations|READ, WRITE, ACCESS, LOCK, KILL|
|Supported Memory Banks|EPC, TID, USER, RESERVED|
|Supported Query States|STATE_A, STATE_B, STATE_AB|
|Supported SL Flags|ALL, ASSERTED, DEASSERTED|
|Supported Profiles|CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY, BALANCED_PERFORMANCE, ADVANCED|
|Supported Link Profiles|M4_256K, M2_240K, M2_256K, M2_320K, M4_240K, M4_320K, FM0_0K, FM0_320K, M8_240K, M8_256K,<br>M8_320K|
|Supported Sessions|SESSION_0, SESSION_1, SESSION_2, SESSION_3|


**2. Before You Begin**


Decide which aspects of the operating mode you need to configure before sending this command. You can send a minimal payload

targeting only one sub-section (for example, only profiles or only query), or send a full configuration in a single command.


**What You Need** **Details**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**







|What You Need|Details|
|---|---|
|Operating profile<br>decision|Choose a preset profile (e.g., BALANCED_PERFORMANCE, CYCLE_COUNT) or use ADVANCED if you need to set a<br>specific link profile, transmit power, or session manually.|
|Access operation<br>types|Know which tag memory banks you will read from or write to, and whether lock or kill operations are required. Have passwords<br>ready for access, lock, or kill operations.|
|Radio trigger<br>strategy|Decide when the reader should start and stop inventory — immediately, on trigger press, or on trigger release. Know thresholds<br>such as tag count or inventory count for auto-stop.|
|Query<br>parameters|Know your expected tag population size and whether you need to target a specific inventory state (STATE_A, STATE_B) or SL<br>flag.|
|Select / prefilter<br>criteria|If filtering tags by memory content, have the tag pattern (hex string), memory bank, bit offset, and pattern length ready.|
|Metadata<br>requirements|Know which tag metadata fields (RSSI, TID, USER, MAC, etc.) your backend application needs. Enabling unnecessary fields<br>increases data volume.|
|Inventory state|set_operating_mode cannot be sent while inventory is in progress. Stop any active inventory first — error code 11 is returned if<br>violated.|


**3. Choosing an Operating Profile**


The profiles field selects the reader's overall RF operating mode. Choose based on your deployment environment and performance

priorities.

|Profile|Description|
|---|---|
|CYCLE_COUNT|Reads as many unique tags as possible in each inventory cycle.|
|DENSE_READERS|Optimised for environments with multiple readers operating in proximity.|
|OPTIMAL_BATTERY|Prioritises battery longevity over read performance.|
|BALANCED_PERFORMANCE|Maintains a balance between read performance and battery life. This is the default.|
|ADVANCED|Unlocks manual control of transmitPower, linkProfile, session, and dynamicPower via advancedConfigurations.<br>advancedConfigurations is required when this profile is selected.|



**4. Choosing Access Operations**


Access operations let the reader do more than just read the EPC during inventory. Each entry in the accessOperations array runs

against every tag singulated in that inventory cycle. Choose operations based on what your application needs to do with each tag.







|Operation|What It Does|Key Constraints|
|---|---|---|
|READ|Reads a block of words from a specific<br>memory bank starting at a given word offset.|offset is in 16-bit words. length is the number of words to read. Multiple READ<br>operations targeting different banks can be combined.|
|WRITE|Writes a hex data string to a specific<br>memory bank location.|data must be a hex string with an even character count and a length that is a multiple<br>of 16-bit words. password (8 hex chars) is required even if no access password is set<br>— use 00000000.|
|ACCESS|Authenticates to the tag using the access<br>password, enabling subsequent protected<br>operations.|password must be exactly 8 hex characters (32 bits). If the tag has no password set,<br>use 00000000.|
|LOCK|Locks or unlocks a specified memory bank,<br>or permanently locks it so it can never be<br>changed again.|lockAction: PERMANENT_LOCK is irreversible. lockMemBank additionally supports<br>ACCESS_PWD and KILL_PWD beyond the standard memory banks.|
|KILL|Permanently and irreversibly disables the|This operation cannot be undone. password must match the tag's kill password|


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**



|Operation|What It Does|Key Constraints|
|---|---|---|
||tag. The tag will never respond to any<br>reader again.|exactly.|


**5. Choosing Radio Start and Stop Conditions**





Radio conditions define when the reader begins and ends an inventory round. Start and stop conditions are configured independently

- you can mix trigger types across start and stop.


**Start Trigger**

|`trigger` Value|Behavior|
|---|---|
|IMMEDIATE|Inventory starts as soon as the command is applied. No physical action required.|
|PRESSED|Inventory starts when the operator presses the physical trigger button.|
|RELEASED|Inventory starts when the operator releases the trigger button.|



**Stop Trigger and Thresholds**

|Field|What It Controls|
|---|---|
|trigger: RELEASED|Inventory stops when the operator releases the trigger.|
|trigger: PRESSED|Inventory stops when the trigger is pressed.|
|trigger: IMMEDIATE|Inventory stops based on threshold conditions rather than a physical action.|
|tagCount|Stops inventory after the specified number of unique tags have been read.|
|stopTimeout|Stops inventory after the specified duration in milliseconds.|
|inventoryCount|Stops inventory after the specified number of full inventory cycles complete.|



**6. Choosing Query Settings**


Query parameters directly affect how the reader singulates tags during inventory. Choosing the right session, inventory state, SL flag,

and tag population estimate can significantly improve read rates in dense environments.


**`session`**

|Value|Persistence|
|---|---|
|SESSION_0|Tag forgets its state immediately after leaving the RF field.|
|SESSION_1|Tag retains state for 500 ms to 5 seconds after leaving the RF field.|
|SESSION_2|Tag retains state for >2 seconds (implementation-dependent; can be much longer).|
|SESSION_3|Tag retains state indefinitely until changed by a reader.|



**`inventoryState`**

|Value|Which Tags Respond|
|---|---|
|STATE_A|Only tags currently in inventory state A respond.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**

|Value|Which Tags Respond|
|---|---|
|STATE_B|Only tags currently in inventory state B respond.|
|STATE_AB|Reader alternates between STATE_A and STATE_B across inventory rounds.|



**`slFlag`**

|Value|Which Tags Are Selected|
|---|---|
|ALL|All tags regardless of SL flag state.|
|ASSERTED|Only tags with the SL flag asserted (set to 1).|
|DEASSERTED|Only tags with the SL flag deasserted (set to 0).|



**`tagPopulation`**


tagPopulation is an estimate of how many tags the reader expects to find in the field. The reader uses this to tune its Q parameter —

the algorithm that controls how many slots are allocated during singulation.


**7. Choosing Select (Prefilter) Settings**


Select filters instruct the reader to pre-screen tags before inventory — only tags whose memory content matches the pattern are

eligible to respond. This reduces unnecessary singulation and improves performance in mixed-tag environments.


**Choosing the Right `memoryBank` for Filtering**

|`memoryBank`|Filter Based On|
|---|---|
|EPC|The tag's EPC identifier — company prefix, item reference, or serial portion.|
|TID|The factory-programmed chip identifier — chip type, manufacturer, and unique serial.|
|USER|Application-specific data written to the tag's user memory bank.|



**Understanding `offset` and `length`**


_Unlike accessOperations where offset is in 16-bit words, select offset is always in bits._






|Field|Unit|Example|
|---|---|---|
|offset|Bits|offset: 32 starts matching from bit 32 of the EPC bank — skipping the first 2 words. For a GS1 EPC, bit 32 is the start of the<br>company prefix portion.|
|length|Bits|length: 96 matches 96 bits (the full EPC). length: 24 matches only the first 24 bits — useful for matching a company prefix<br>without caring about the item or serial number.|
|tagPattern|Hex<br>string|"E2800011" — each hex character = 4 bits, so 8 hex chars = 32 bits matched. Must have an even number of characters,<br>max 64 characters.|



**Choosing the `action` Field**


The action field defines what happens to the SL flag and inventory state when a tag's memory matches (or does not match) the

tagPattern.


**Action** **On Match** **On Mismatch**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

|Action|On Match|On Mismatch|
|---|---|---|
|INV_A_NOT_INV_B_OR_ASRT_SL_NOT_DSRT_SL|Set to INV_A / Assert SL|Set to INV_B / Deassert SL|
|INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL|Set to INV_B / Deassert SL|Set to INV_A / Assert SL|
|INV_A_OR_ASRT_SL|Set to INV_A / Assert SL|No change|
|INV_B_OR_DSRT_SL|Set to INV_B / Deassert SL|No change|
|NOT_INV_B_OR_NOT_DSRT_SL|No change|Set to INV_A / Assert SL|
|NOT_INV_A_OR_NOT_ASRT_SL|No change|Set to INV_B / Deassert SL|
|INV_A2BB2A_NOT_INV_A_OR_NEG_SL_NOT_ASRT_SL|�F�l�i�p� �A!”�B� �/� �N�e�g�a�t�e� �S�L|Set to INV_A / Assert SL|
|NOT_INV_A2BB2A_OR_NOT_NEG_SL|No change|�F�l�i�p� �A!”�B� �/� �N�e�g�a�t�e� �S�L|



**8. Rules and Constraints**


**Inventory State**


 - set_operating_mode cannot be sent while an RFID inventory is in progress. If inventory is running, stop it first — the command will

be rejected with error code 11.


**Access Operations**


 - password must be exactly 8 hex characters (32 bits) for ACCESS, LOCK, and KILL operations.

 - data for WRITE must be a hex string with an even number of characters and a length that is a multiple of 16-bit words.

 - lockMemBank for LOCK additionally supports ACCESS_PWD and KILL_PWD beyond the standard EPC, TID, USER memory

banks.


**Select / Prefilter**


 - A maximum of 32 select filters are supported. Sending more than 32 entries returns error code 24.

 - tagPattern must be a hex string with an even number of characters, maximum 64 characters. Exceeding this returns error code 28.

 - offset in select is a bit position, not a word offset — unlike accessOperations.offset which is in 16-bit words.


**MQTT Command Payload**


**Example: Set operating mode**






**RFD40 / RFD90 MQTT API Reference** Set Operating Mode






**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

```
 {
 "enable": true,
 "tagPattern": "2222EEEEFFFF1111AAAABBBB",
 "memoryBank": "EPC",
 "offset": 32,
 "action": "INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL",
 "target": "SESSION_1",
 "length": 16
 }
 ],
 "tagMetaDataToEnable": {
 "RSSI": false,
 "PHASE": false,
 "SEENCOUNT": false,
 "CHANNEL": false,
 "PC": false,
 "XPC": true,
 "CRC": true,
 "EPC": true,
 "TID": true,
 "USER": true,
 "MAC": true,
 "HOSTNAME": true
 }
 }
 }
 }

```

**Example: Profile setting**

```
 {
 "command": "set_operating_mode",
 "requestId": "1286",
 "operatingMode": {
 "operatingModes": {
 "profiles": "BALANCED_PERFORMANCE"
 }
 }
 }

```

**Example: Access operations**

```
 {
 "command": "set_operating_mode",
 "requestId": "1286",
 "operatingMode": {
 "operatingModes": {
 "accessOperations": [
 {
 "operationType": "READ",
 "config": {
 "memoryBank": "EPC",

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 7


**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

```
 "offset": 2,
 "length": 3
 }
 },
 {
 "operationType": "READ",
 "config": {
 "memoryBank": "TID",
 "offset": 1,
 "length": 2
 }
 },
 {
 "operationType": "WRITE",
 "config": {
 "memoryBank": "USER",
 "offset": 2,
 "length": 2,
 "data": "FFFFEEEE",
 "password": "0000"
 }
 },
 {
 "operationType": "ACCESS",
 "config": {
 "password": "0000"
 }
 },
 {
 "operationType": "LOCK",
 "config": {
 "password": "0000",
 "lockMemBank": "EPC",
 "lockAction": "UNLOCK"
 }
 }
 ]
 }
 }
 }

```

**Example: Radio start/stop conditions**

```
 {
 "command": "set_operating_mode",
 "requestId": "1286",
 "operatingMode": {
 "operatingModes": {
 "radioStartConditions": {
 "trigger": "PRESSED",
 "startDelay": 5000,
 "repeat": false
 },
 "radioStopConditions": {

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 8


**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

```
 "trigger": "RELEASED",
 "tagCount": 10,
 "stopTimeout": 10000,
 "inventoryCount": 0
 }
 }
 }
 }

```

**Example: Query settings**

```
 {
 "command": "set_operating_mode",
 "requestId": "1286",
 "operatingMode": {
 "operatingModes": {
 "query": {
 "session": "SESSION_1",
 "inventoryState": "STATE_A",
 "slFlag": "ALL",
 "tagPopulation": 30
 }
 }
 }
 }

```

**Example: Select settings**

```
 {
 "command": "set_operating_mode",
 "requestId": "1286",
 "operatingMode": {
 "operatingModes": {
 "select": [
 {
 "enable": true,
 "tagPattern": "2222EEEEFFFF1111AAAABBBB",
 "memoryBank": "EPC",
 "offset": 32,
 "action": "INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL",
 "target": "SESSION_SL",
 "length": 16
 }
 ]
 }
 }
 }

```

**Example: Query and select settings**






**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

```
 "command": "set_operating_mode",
 "requestId": "8f07804c-4af1-41c8-9959-417b0aa8047d",
 "operatingMode": {
 "operatingModes": {
 "profiles": "BALANCED_PERFORMANCE",
 "query": {
 "session": "SESSION_1",
 "inventoryState": "STATE_B",
 "slFlag": "ALL",
 "tagPopulation": 40
 },
 "select": [
 {
 "enable": true,
 "tagPattern": "FFFFEEEE3435363742426666",
 "memoryBank": "EPC",
 "offset": 32,
 "action": "INV_B_NOT_INV_A_OR_DSRT_SL_NOT_ASRT_SL",
 "target": "SESSION_1",
 "length": 96
 }
 ]
 }
 }
 }

```

**Example: Tag metadata settings**

```
 {
 "command": "set_operating_mode",
 "requestId": "1286",
 "operatingMode": {
 "operatingModes": {
 "tagMetaDataToEnable": {
 "RSSI": true,
 "PHASE": true,
 "SEENCOUNT": true,
 "CHANNEL": true,
 "PC": false,
 "XPC": false,
 "CRC": true,
 "EPC": true,
 "TID": false,
 "USER": false,
 "MAC": false,
 "HOSTNAME": false
 }
 }
 }
 }

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 10


**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**


**Command Schema**







|Field|Type|Description|
|---|---|---|
|**`command*`**|enum|Specifies the name of the command to be executed. In this case, it is<br>set_operating_mode. | Default: "set_operating_mode" | Allowed: set_operating_mode|
|**`requestId*`**|string|A unique identifier for the request. This ensures traceability and prevents duplicate<br>processing of the same request.|
|**`operatingMode`**|object|Specifies the operating mode configuration for the RFID device, including profile<br>settings, access operations, radio start/stop conditions, query and select pre-filter<br>parameters, and tag metadata options.|
|**` operatingModes`**|object|Represents the reader operating mode.|
|**`  profiles`**|enum|The type of mode of operation<br>FAST_READ: Configures the radio for maximum read speed within short range.<br>(Currently not supported)<br>CYCLE_COUNT: Configures the radio to read as many unique tags as possible.<br>DENSE_READERS: Used when multiple readers in proximity.<br>OPTIMAL_BATTERY: Gives best battery life.<br>BALANCED_PERFORMANCE: Maintains balance between performance and battery<br>life.<br>ADVANCED: Allows custom link profile settings in the advancedConfigurations.In this<br>case, advancedConfigurations must be configured. | Default:<br>"BALANCED_PERFORMANCE" | Allowed: FAST_READ | CYCLE_COUNT |<br>DENSE_READERS | OPTIMAL_BATTERY | BALANCED_PERFORMANCE |<br>ADVANCED|
|<br>**`advancedConfigurations`**|object|To be set when profiles is ADVANCED. In other cases, link profile will be mapped<br>internally.|
|**`   transmitPower`**|number||
|**`   linkProfile`**|enum|Allowed: M4_256K | M2_240K | M2_256K | M2_320K | M4_240K | M4_320K | FM0_0K |<br>FM0_320K | M8_240K | M8_256K | M8_320K|
|**`   session`**|enum|Allowed: SESSION_0 | SESSION_1 | SESSION_2 | SESSION_3|
|**`   dynamicPower`**|boolean||
|**`  accessOperations`**|array|Supports read, write, lock and kill operations on tag memory banks (EPC, TID, USER,<br>etc.).|
|**`   operationType`**|enum|Specifies the type of access operation to perform on the tag. - `READ`: Reads data from<br>the specified memory bank. - `WRITE`: Writes data to the specified memory bank. -<br>`ACCESS`: Performs access operations using a password. - `LOCK`: Locks or unlocks<br>specified memory banks. - `KILL`: Permanently disables the tag using the kill password.<br> | Allowed: READ | WRITE | ACCESS | LOCK | KILL|
|**`   config`**|object||
|**`    memoryBank`**|enum|Specifies the memory bank to be accessed.<br> | Allowed: EPC | TID | USER | RESERVED|
|**`    offset`**|integer|Indicates the starting word position within the specified memory bank where the<br>operation will be applied. Offset is measured in 16-bit words.|
|**`    length`**|integer|Specifies the number of 16-bit words to be read or written. This determines the size of<br>the data block for the operation.|
|**`    data`**|string|A hex string indicating the words to be written. The length of the data field can exceed a|


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 11


**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

|Field|Type|Description|
|---|---|---|
|||single 16-bit word, but it must be a multiple of 16-bit words(see EPC Gen2 Spec).|
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
|**`   inventoryCount`**|integer|Specifies the number of inventory cycles to complete before stopping. Each cycle<br>represents a full scan for tags in the field.|
|**`  query`**|object|Configures the query parameters for inventory operations including session, target, and<br>tag population to optimize tag selection and reading.|
|**`   session`**|enum|Session field (see EPC Gen2 Spec). Determines the session used for inventory<br>operations. Sessions are used to manage tag states and collisions during inventory.<br>SESSION_0 is typically used for single inventory rounds, while SESSION_1,<br>SESSION_2, and SESSION_3 are used for multi-round inventories with varying<br>persistence levels.<br> | Allowed: SESSION_0 | SESSION_1 | SESSION_2 | SESSION_3|
|**`   inventoryState`**|enum|Target field (see EPC Gen2 Spec). Specifies the inventory state of tags to be selected.<br>'STATE_A' and 'STATE_B' represent the two possible states of a tag's inventory flag.<br>'STATE_AB' flips between states to optimize tag selection during inventory rounds.<br> | Allowed: STATE_A | STATE_B | STATE_AB|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 12


**RFD40 / RFD90 MQTT API Reference** Set Operating Mode

|Field|Type|Description|
|---|---|---|
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
|**`   RSSI`**|boolean|Indicates whether to report the RSSI. RSSI provides the strength of the signal received<br>from the tag, which can be useful for determining tag proximity.|
|**`   PHASE`**|boolean|Indicates whether to report the phase angle of the tag's signal. Phase information is<br>often used for advanced applications like tag localization or movement tracking.|
|**`   SEENCOUNT`**|boolean|Indicates whether to report the number of times the tag was detected during inventory.<br>This helps in understanding tag visibility and read consistency over multiple scans.|
|**`   CHANNEL`**|boolean|Indicates whether to report the communication channel used to read the tag. This is<br>useful in environments with multiple channels or frequency hopping to identify the<br>channel of operation.|
|**`   PC`**|boolean|Indicates whether to report the Protocol Control (PC) word. The PC word contains<br>information about the tag's memory structure and encoding, such as the length of the|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 13


**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**

|Field|Type|Description|
|---|---|---|
|||EPC.|
|**`   EPC`**|boolean|Indicates whether to report the EPC. EPC is the unique identifier stored in the tag's<br>memory, typically used for item identification.|
|**`   TID`**|boolean|Indicates whether to report the TID. TID is a factory-programmed, unique identifier for<br>the tag, often used for authentication or anti-counterfeiting.|
|**`   USER`**|boolean|Indicates whether to report the User memory bank data. The User memory bank can<br>store custom data defined by the application, such as additional product information.|
|**`   MAC`**|boolean|Indicates whether to report the MAC address of the reader. This is useful for identifying<br>the specific reader that performed the tag read in networked environments.|
|**`   HOSTNAME`**|boolean|Indicates whether to report the hostname of the reader. Hostnames are helpful in<br>networked environments where readers are identified by their assigned names.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "set_operating_mode",
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
|**`command*`**|string|The command that was executed to set the operating mode.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 11 — Inventory in progress<br>- 22 — Advanced configuration not set<br>- 23 — Invalid enum value<br>- 24 — Max 32 prefilters limit exceeded<br>- 28 — Tag match pattern length exceeded | Min: 0 | Max: 28|
|**` description*`**|string|response description in detail|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 14**


**RFD40 / RFD90 MQTT API Reference** **Set Operating Mode**


**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|11|Inventory in progress|An RFID inventory operation is<br>currently running|Stop the current inventory before starting a new operation or<br>changing the mode|
|22|Advanced configuration not set|The operating mode requires an<br>advanced profile that has not been<br>configured|Configure the advanced profile settings before setting the<br>operating mode|
|23|Invalid enum value|A field value does not match any of<br>the allowed enum options|Check the schema for allowed values and correct the field|
|24|Max 32 prefilters limit exceeded|More than 32 prefilter rules were<br>specified|Reduce the number of prefilter rules to 32 or fewer|
|28|Tag match pattern length exceeded|The tag match pattern string<br>exceeds the maximum allowed<br>length|Shorten the tag match pattern to within the allowed limit|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 15**


