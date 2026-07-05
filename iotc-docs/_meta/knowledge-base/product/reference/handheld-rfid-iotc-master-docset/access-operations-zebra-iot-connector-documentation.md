Starting Reader firmware version **3.24.43** `IoT Connector` supports performing access operations. The following access operations are supported.

> 1.  Read
>     
> 2.  Write
>     
> 3.  Lock
>     
> 4.  Kill
>     

Access opreations can be performed using `IoT Connector` by setting the operating mode. `IoT Connector` can accept a maximum of 64 access operations in a sequence in operating mode. For more info on the operating mode, refer to **Operating Modes Schema**

## Read Operations[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#read-operations "Link to this heading")

`IoT Connector` supports tag read operations. Following memory banks can be read using the `IoT Connector`

> 1.  **EPC**
>     
> 2.  **TID**
>     
> 3.  **USER**
>     
> 4.  **RESERVED**
>     

Read operations can be performed by supplying the appropriate **accesses** entry in the operating mode on the `IoT Connector`. For example: To read the word #2 of the EPC bank, the following would be the operating mode.

> ```json
> {
>     "type": "CUSTOM",
>     "accesses":{
>         "type": "READ",
>         "config": {
>             "membank": "EPC",
>             "wordPointer": 2,
>             "wordCount": 1
>         }
>     }
> }
> ```

The result of the read access operation is sent as a data event on the data channel. For the example above the following message on the data channel indicates the access result.

> ```json
> {
>     "data": {
>         "accessResults":["bbbb"],
>         "eventNum":84,
>         "format":"epc",
>         "idHex":"bbbbbbbbbbbbbbbbbbbbbbbb"
>     },
>     "timestamp":"2023-04-13T11:49:33.809+0000",
>     "type":"CUSTOM"
> }
> ```

## Write Operations[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#write-operations "Link to this heading")

`IoT Connector` supports tag write operations. Following memory banks can be written using the `IoT Connector`

> 1.  **EPC**
>     
> 2.  **TID**
>     
> 3.  **USER**
>     
> 4.  **RESERVED**
>     

Write operations can be performed by supplying the appropriate **accesses** entry in the operating mode on the `IoT Connector`.

For example: To write 0xBBBB to word #2 of the EPC bank, the following would be the access object:

> ```json
> {
>     "type": "CUSTOM",
>     "accesses":{
>         "type": "WRITE",
>         "config": {
>             "membank":"EPC",
>             "wordPointer": 2,
>             "data": "bbbb"
>         }
>     }
> }
> ```

The result of the write access operation is sent as a data event on the data channel. For the example above the following message on the data channel indicates the access result when successful.

> ```json
> {
>     "data": {
>         "accessResults":["SUCCESS"],
>         "eventNum":84,
>         "format":"epc",
>         "idHex":"bbbbbbbbbbbbbbbbbbbbbbbb"
>     },
>     "timestamp":"2023-04-13T11:49:33.809+0000",
>     "type":"CUSTOM"
> }
> ```

In case of a failed attempt to write the tag, the following event will be sent on the data channel.

> ```json
> {
>     "data": {
>         "accessResults":["Error: tag returned error code 0x04 = Memory locked"],
>         "eventNum":84,
>         "format":"epc",
>         "idHex":"bbbbbbbbbbbbbbbbbbbbbbbb"
>     },
>     "timestamp":"2023-04-13T11:49:33.809+0000",
>     "type":"CUSTOM"
> }
> ```

## LOCK/UNLOCK Operations[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#lock-unlock-operations "Link to this heading")

`IoT Connector` supports LOCK/UNLOCK operations. The following LOCK/UNLOCK operations are supported.

> 1.  PERMALOCK\_USER\_BANK
>     
> 2.  WRITE\_LOCK\_USER\_BANK
>     
> 3.  WRITE\_UNLOCK\_USER\_BANK
>     
> 4.  PERMALOCK\_TID\_BANK
>     
> 5.  WRITE\_LOCK\_TID\_BANK
>     
> 6.  WRITE\_UNLOCK\_TID\_BANK
>     
> 7.  PERMALOCK\_EPC\_BANK
>     
> 8.  WRITE\_LOCK\_EPC\_BANK
>     
> 9.  WRITE\_UNLOCK\_EPC\_BANK
>     
> 10.  PERMALOCK\_ACCESS\_PASSWORD
>     
> 11.  READ\_WRITE\_LOCK\_ACCESS\_PASSWORD
>     
> 12.  READ\_WRITE\_UNLOCK\_ACCESS\_PASSWORD
>     
> 13.  PERMALOCK\_KILL\_PASSWORD
>     
> 14.  READ\_WRITE\_LOCK\_KILL\_PASSWORD
>     
> 15.  READ\_WRITE\_UNLOCK\_KILL\_PASSWORD
>     

Lock/Unlock operations can be performed by supplying the appropriate **accesses** entry in the operating mode on the `IoT Connector`.

For example: To write lock the EPC bank, the following would be the operating mode:

> ```json
> {
>     "type": "CUSTOM",
>     "accesses": [
>         {
>             "type": "ACCESS",
>             "config": {
>                 "password": "12345678"
>             }
>         },
>         {
>             "type": "LOCK",
>             "config": {
>                 "actions": [
>                     "WRITE_LOCK_EPC_BANK"
>                 ]
>             }
>         }
>     ]
> }
> ```

## Kill Operation[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#kill-operation "Link to this heading")

`IoT Connector` support tag Kill operations. kill can be performed by supplying the appropriate **accesses** entry in the operating mode.

The following is the sample operating mode for a Kill operation.

> ```json
> {
>     "type": "CUSTOM",
>     "accesses":{
>         "type": "KILL",
>         "config": {
>             "password": "kill password"
>         }
>     }
> }
> ```

## Example Operating Modes[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#example-operating-modes "Link to this heading")

This sections illustrates the operating modes that can be used for afew example scenarios.

### Example 1[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#example-1 "Link to this heading")

Below operating mode can be used to read, write and then re-read the word on all enabled antennas:

> ```json
> {
>     "type": "CUSTOM",
>     "accesses": [
>         {
>             "type": "READ",
>             "config": {
>                 "membank": "EPC",
>                 "wordPointer":2,
>                 "wordCount":1
>             }
>         },
>         {
>             "type": "WRITE",
>             "config": {
>                 "membank": "EPC",
>                 "wordPointer":2,
>                 "data": "bbbb"
>             }
>         },
>         {
>             "type": "READ",
>             "config": {
>                 "membank": "EPC",
>                 "wordPointer":2,
>                 "wordCount": 1
>             }
>         }
>     ]
> }
> ```

The results of the above operation could look like below for successful completion.

> ```json
> {
>     "data": {
>         "accessResults": [
>             "1234",
>             "Success",
>             "bbbb"
>         ],
>         "eventNum": 25873,
>         "format": "epc",
>         "idHex": "1234567890abcdef00000000"
>     },
>     "timestamp": "2023-05-01T08:55:44.625+0300",
>     "type": "CUSTOM"
> }
> ```

The results of the above operation could look like below for an error condition.

> ```json
> {
>     "data": {
>         "accessResults": [
>             "1234",
>             "Error: tag returned error code 0x04 = Memory locked",
>             "Not Attempted"
>         ],
>         "eventNum": 25872,
>         "format": "epc",
>         "idHex": "1234567890abcdef00000000"
>     },
>     "timestamp": "2023-05-01T08:55:43.395+0300",
>     "type": "CUSTOM"
> }
> ```

### Example 2[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#example-2 "Link to this heading")

The following example operating mode writes and then reads the EPC on antenna 1 and writes it on antenna 2 and then rereads on antenna 3 (note the 3 sets of square brackets within the outer brackets of the accesses list):

> ```json
> {
>     "type": "CUSTOM",
>     "antennas": [1,2,3],
>     "accesses": [[{
>         "type": "READ",
>         "config": {"membank": "EPC","wordPointer":2,"wordCount":1}
>         }],
>         [{
>         "type": "WRITE",
>         "config": {"membank": "EPC","wordPointer":2,"data": "bbbb"}
>         }],
>         [{
>         "type": "READ",
>         "config": {"membank": "EPC","wordPointer":2,"wordCount": 1}
>     }]]
> }
> ```

### Example 3[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#example-3 "Link to this heading")

The following example operating mode writes and then reads, writes, and the re-reads the EPC on antenna 1 and not the other enabled antennas (note the 2 sets of empty square brackets within the outer brackets of the accesses list that indicate that antennas 2 and 3 should not perform any access commands):

> ```css
> {
>     "type": "CUSTOM",
>     "antennas": [1,2,3],
>     "accesses": [[{
>         "type": "READ",
>         "config": {"membank": "EPC","wordPointer":2,"wordCount":1}
>     },
>     {
>         "type": "WRITE",
>         "config": {"membank": "EPC","wordPointer":2,"data": "bbbb"}
>     },
>     {
>         "type": "READ",
>         "config": {"membank": "EPC","wordPointer":2,"wordCount": 1}
>     }],
>     [],
>     []
>     ]
> }
> ```

### Example 4[](https://zebradevs.github.io/rfid-ziotc-docs/performing_access_operations/index.html#example-4 "Link to this heading")

The below operating mode can be used to find the tag using TID, then Write EPC, Write Access Password, Lock it, then read EPC and access password.

> ```json
> {
>     "type": "CUSTOM",
>     "query": {
>         "tagpopulation": 10,
>         "sel": "NOT_SL",
>         "session": "S0",
>         "target": "A"
>     },
>     "selects": [
>         {
>             "target": "S0",
>             "action": "INVA_INVB",
>             "membank": "TID",
>             "pointer": 0,
>             "length": 96,
>             "mask": "e2806894200050055eb4d0f6"
>         }
>     ],
>     "accesses": [
>         {
>             "type": "ACCESS",
>             "config": {
>                 "password": "11112222"
>             }
>         },
>         {
>             "type": "WRITE",
>             "config": {
>                 "membank": "EPC",
>                 "wordPointer": 2,
>                 "data": "BBBBBBBBBBBBBBBBBBBBBBBB"
>             }
>         },
>         {
>             "type": "WRITE",
>             "config": {
>                 "membank": "RESERVED",
>                 "wordPointer": 2,
>                 "data": "11112222"
>             }
>         },
>         {
>             "type": "LOCK",
>             "config": {
>                 "actions": [
>                     "WRITE_LOCK_EPC_BANK"
>                 ]
>             }
>         },
>         {
>             "type": "READ",
>             "config": {
>                 "membank": "EPC",
>                 "wordPointer": 0,
>                 "wordCount": 0
>             }
>         },
>         {
>             "type": "READ",
>             "config": {
>                 "membank": "RESERVED",
>                 "wordPointer": 0,
>                 "wordCount": 0
>             }
>         }
>     ],
>     "radioStopConditions": {
>         "antennaCycles": 1
>     }
> }
> ```

The result of the above operation will be sent on the data channel as shown below:

> ```json
> {
>     "data":{
>         "accessResults":[
>             "SUCCESS",
>             "SUCCESS",
>             "SUCCESS",
>             "SUCCESS",
>             "aa933000bbbbbbbbbbbbbbbbbbbbbbbb",
>             "1111222211112222"],
>         "eventNum":84,
>         "format":"epc",
>         "idHex":"bbbbbbbbbbbbbbbbbbbbbbbb"
>     },
>     "timestamp":"2023-04-13T11:49:33.809+0000",
>     "type":"CUSTOM"
> }
> ```