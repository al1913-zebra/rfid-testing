**RFD40 / RFD90 MQTT API Reference** **Dataevt**

# **Dataevt**


**Description**
**1. Description**


The dataEVT event provides structured tag and barcode read output from active inventory operations.


This event includes:


 - Tag EPC, TID, and USER memory read data

 - Read telemetry fields such as RSSI, phase, channel, and seen count

 - Access operation results for read, write, lock, and kill actions


Use this event to:


 - Consume real-time tag read data from inventory activity

 - Track read quality metrics such as RSSI, phase, and seen count

 - Capture access operation outcomes for read and write results


**2. Event Details**

|Property|Value|
|---|---|
|Event Type|Data Event|
|Applies To|RFD40 Series, RFD90 Series|
|Trigger Condition|Generated during an active RFID inventory operation when tags are read|
|Related Events|heartBeatEVT, exceptionEVT, alerts|



**3. When This Event Is Published**


The reader publishes dataEVT automatically when an active RFID inventory operation is in progress and one or more tags are read.

No command is required.










|Condition|State / Behavior|Notes|
|---|---|---|
|Active inventory operation<br>running|Event published per tag read or per report<br>interval|Frequency depends on reportFilter duration setting|
|Tag inventoried by the<br>reader|Tag data fields populated and emitted in<br>payload|Fields such as channel and phase are only included when reportFilter<br>duration is 0|
|Barcode scanned during<br>operation|barcodeData array populated in payload|Includes decoded barcode string and symbology type|



_Note: Certain telemetry fields — channel, phase, and seenCount behavior — depend on the reportFilter duration setting in the_

_operating mode configuration. When reportFilter duration is 0, each individual tag read is reported separately. Otherwise, tags_

_are aggregated and reported at intervals, and peakRssi reflects the peak value since the last report._


**MQTT Response Payload**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Dataevt**


**Example**

```
 {
 "type": "BALANCED_PERFORMANCE",
 "timestamp": "2019-08-24T14:15:22Z",
 "data": {
 "tagData": [
 {
 "EPCid": "BEDD11112222333344445555",
 "EPC": "BEDD11112222333344445555",
 "TID": "E2003412013BFD000B4E16D21D030143000D5FFBFFFFDC60",
 "USER": "12343333123456781234567812345678123456781234567812345678123456781234567812345678",
 "channel": 911.75,
 "eventNum": 1,
 "peakRssi": -39,
 "phase": 0,
 "seenCount": 1,
 "accessResults": [
 "READ-EPC-SUCCESS",
 "READ-TID-SUCCESS",
 "WRITE-USER-No Response from Tag"
 ]
 }
 ]
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`type`**|enum|Type of operating mode (e.g., BALANCED_PERFORMANCE, FAST_READ, etc.) |<br>Allowed: FAST_READ | CYCLE_COUNT | DENSE_READERS | OPTIMAL_BATTERY |<br>BALANCED_PERFORMANCE | ADVANCED|
|**`timestamp*`**|string|Timestamp of the event in ISO-8601 format|
|**`data`**|object|Detailed data related to the event, including tag and barcode information|
|**` tagData`**|array|Contains a collection of tag data events.|
|**`  EPCid`**|string|EPCID refers to the Electronic Product Code Identifier, a unique identifier encoded on an<br>RFID tag to identify a specific physical object.<br>The EPCID is a critical component in RFID systems, as it provides a globally unique<br>identifier for items in the supply chain. It is encoded in the RFID tag's memory and is<br>used to distinguish one item from another, even if they are of the same type or category.<br>The EPCID is typically represented as a hexadecimal string and follows the EPCglobal<br>standard, which ensures interoperability across different RFID systems and<br>organizations. This identifier can be used for tracking, inventory management, and<br>authentication purposes.<br>EPCID will be reported as a hex string.|
|**`  EPC`**|string|The EPC (Electronic Product Code) memory bank is a section of memory on an RFID<br>tag that stores the unique identifier for the tagged object. This identifier is used to<br>distinguish one item from another in a supply chain or inventory system.<br>The EPC memory bank typically contains a globally unique identifier encoded as a<br>hexadecimal string, following the EPCglobal standard. This standard ensures<br>interoperability across different RFID systems and organizations. The EPC memory<br>bank is critical for tracking, inventory management, and authentication purposes.|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 2


**RFD40 / RFD90 MQTT API Reference** Dataevt

|Field|Type|Description|
|---|---|---|
|||The data in the EPC memory bank is often used in conjunction with other memory<br>banks, such as TID and USER, to provide comprehensive information about the tagged<br>object. The EPC memory bank is read during the inventory process and is essential for<br>identifying and managing items in real-time.<br>EPC will be reported as hex string.|
|**`  TID`**|string|The TID (Tag Identifier) memory bank is a section of memory on an RFID tag that<br>contains a unique identifier assigned by the tag manufacturer. This identifier is typically<br>immutable and is used to uniquely identify the tag regardless of the data stored in other<br>memory banks. The TID memory bank may also include additional information about the<br>tag, such as the manufacturer ID and model number. The data in this bank is encoded<br>as a hexadecimal string and is often used for authentication or anti-counterfeiting<br>purposes.<br>TID will be reported as hex string.|
|**`  USER`**|string|The "USER" memory bank in RFID tags is a user-defined memory area that can store<br>custom data.<br>This memory bank is typically used for application-specific purposes, allowing users to<br>write<br>and read data relevant to their use case. The data is represented as a hexadecimal<br>string,<br>providing a compact and efficient format for storage and transmission. The size and<br>structure<br>of the USER memory bank may vary depending on the RFID tag's specifications. It is<br>commonly<br>used in scenarios such as asset tracking, inventory management, and custom<br>identification<br>systems. Ensure proper handling of the data to maintain data integrity and security.<br>USER will be reported as hex string.|
|**`  RESERVED`**|string|The RESERVED memory bank is a section of memory on an RFID tag that is typically<br>used for storing passwords or other security-related data. It may include the kill<br>password and access password, which are used to control access to the tag and to<br>permanently disable it, respectively. The data in this bank is encoded as a hexadecimal<br>string and is often protected or restricted based on the tag's configuration.<br>RESERVED will be reported as hex string.|
|**`  PC`**|string|"PC" will report the PC bits of the inventoried tag as a hex string.|
|**`  CRC`**|string|"CRC" will report the CRC bits of the inventoried tag as a hex string.|
|**`  channel`**|number|"CHANNEL” will report the channel (in MHz) the reader was using when the tag was<br>inventoried. This value will only be reported if each individual tag read is reported (in<br>other words, if reportFilter duration is set to 0). Otherwise, it will not be reported.|
|**`  eventNum*`**|number|Event Number|
|**`  format*`**|string|The format of idHex is EPC|
|**`  peakRssi`**|number|“RSSI” will report the rssi (in dbm) of the inventoried tag. If the tag is only reported<br>occasionally (see set_tag_filter), this tag will be the peak rssi since the last reported<br>read.|
|**`  phase`**|number|"PHASE” will report the phase (in degrees) of the inventoried tag. This value will only be<br>reported if each individual tag read is reported (in other words, if reportFilter duration is<br>set to 0). Otherwise, it will not be reported.|
|**`  seenCount`**|number|“SEEN_COUNT” will report the number of times the tag has been inventoried since the<br>previous report. This value will always be 1 if each individual tag read is reported (in<br>other words, if reportFilter duration is set to 0).|
|**`  XPC`**|string|"XPC" will report the XPC bits of the inventoried tag, if present, as a hex string.|
|**`  accessResults`**|array|accessResults contains an array of strings, with each element in the array containing the<br>result of the access operation specified in the operating mode. For read operations, the<br>string contains the data read from the tag and for write operations, it contains<br>"SUCCESS" for successfull operations or an error message.|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Dataevt

|Field|Type|Description|
|---|---|---|
||||
|**`   item`**|string||
|**`  userDefined`**|string|userdefined string value to be included on every event|
|**`  firstSeenTime`**|number|"FIRST_SEEN_TIME" will report the timestamp (in milliseconds since epoch) when the<br>RFID tag was first seen by the reader.|
|**`  lastSeenTime`**|number|"LAST_SEEN_TIME" will report the timestamp (in milliseconds since epoch) when the<br>RFID tag was last seen by the reader.|
|**`  MAC`**|string|The MAC address of the reader that inventoried the tag. This will be reported only if the<br>MAC address is enabled in the operating mode.|
|**`  HOSTNAME`**|string|The hostname of the reader that inventoried the tag. This will be reported only if the<br>hostname is enabled in the operating mode.|
|**` barcodeData`**|array|Contains a collection of barcode data events.|
|**`  symbology`**|enum|The type of barcode symbology used in the scanned barcode (e.g., CODE_39). |<br>Allowed: CODE_39|
|**`  decodedBarcode*`**|string|The decoded string value from the scanned barcode.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


