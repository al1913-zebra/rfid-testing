The Trigger Settings in `123RFID Desktop` is part of the **Operating Mode** configuration in `IoT Connector`.

> ![123RFID Desktop Trigger Settings](https://zebradevs.github.io/rfid-ziotc-docs/_images/Trigger.png)

The following table illustrate the IoT Connector operating mode that must be configured on the reader to effectively migrate the 123RFID Desktop configuration.

> # Trigger Settings[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/trigger.html/#trigger-settings "Link to this heading")
> 
> | **123RFID Desktop Parameter** |              **Value**              |                                                   **Operating Mode**                                                    |
> |---------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------|
> |       **Start Trigger**       |            `Immediate`            | {
> 
> “type”: “CUSTOM”
> 
> } |
> |       **Start Trigger**       | `GPI Trigger`, **Port** `1`, **state** `High` | {
> 
> “type”: “CUSTOM”,
> 
> “radioStartConditions”: {
> 
> “type”: “GPI”,
> 
> “gpis”: [{
> 
> “port”: 1,
> 
> “signal”: “HIGH”
> 
> }]
> 
> }
> 
> } |
> |       **Stop Trigger**        |            `Immediate`            | {
> 
> “type”: “CUSTOM”
> 
> } |
> |       **Stop Trigger**        |         `Tag Observation`         | {
> 
> “type”: “CUSTOM”,
> 
> “radioStopConditions”: {
> 
> “tagCount”: 100
> 
> }
> 
> } |
> |       **Stop Trigger**        |           `Time Delay`            | {
> 
> “type”: “CUSTOM”,
> 
> “radioStopConditions”: {
> 
> “duration”: 1000
> 
> }
> 
> } |
> |       **Stop Trigger**        |            `N rounds`             | {
> 
> “type”: “CUSTOM”,
> 
> “radioStopConditions”: {
> 
> “antennaCycles”: 10
> 
> }
> 
> } |
> |       **Stop Trigger**        |           `GPI Trigger`           | {
> 
> “type”: “CUSTOM”,
> 
> “radioStopConditions”: {
> 
> “gpis”: [
> 
> “port” : 1,
> 
> “signal” : “HIGH”
> 
> ]
> 
> }
> 
> } |

Other trigger options like Report Tag Data and Autonomous Mode are not supported in IoT Connector yet.