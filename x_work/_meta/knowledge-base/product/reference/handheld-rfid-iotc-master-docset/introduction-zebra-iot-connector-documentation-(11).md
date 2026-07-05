# Introduction[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html/#introduction "Link to this heading")

`Zebra IoT Connector` provides the ability to configure the radio to different modes of operation that optimize the radio configuration based on intended use case. Once configured, the mode can be started using the START REST API and will continue to operate until the STOP REST API is called.

The following operating modes are supported are supported in `Zebra IoT Connector`.

-   Simple
    
-   Inventory
    
-   Portal
    
-   Conveyer
    
-   Directionality
    
-   Custom
    

Important

Refer [Operating Modes Schema](https://zebradevs.github.io/rfid-ziotc-docs/schemas/operating_modes/index.html#oper-modes) for detail description of various options supported by different modes.

The operating mode configration can be pushed to reader using the following methods:

-   For [Local Deployment](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment) deployment use **PUT /mode** API ([Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis)).
    
-   For Other Clouds or Custom MQTT deployments use **set\_mode** command ([RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads)).
    

## Simple[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html#simple "Link to this heading")

Simple mode configures the radio to read and report all unique tags in the field of view of the radio.

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags. This can be adjusted using the Filter object when setting the mode.
>     

## Inventory[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html#inventory "Link to this heading")

Inventory mode configures the radio to read tags and report all unique tags for each antenna on a periodic interval. Additional meta-data (i.e., peak RSSI and number of reads for each antenna during the interval) is reported.

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags once. This can be adjusted using the Filter object when setting the mode.
>     
> -   The radio reports tags every second. This can be adjusted using the Interval object when setting the mode.
>     

## Portal[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html#portal "Link to this heading")

Portal mode configures the radio to report all unique tags that pass by each antenna immediately following a GPI event. The GPI event signals the beginning of the read period. As soon as the GPI event triggers the radio, the radio continues to read tags until no new unique tags are read for a configurable stop interval. Once the radio stops reading tags, it waits for the next GPI event to start the process again.

> Note
> 
> Portal mode is only applicable to FX7500 and FX9600 Readere

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags once. This can be adjusted using the Filter object when setting the mode.
>     
> -   The radio waits for a LOW signal on GPI 1. This can be adjusted using the StartTrigger object when setting the mode.
>     
> -   The radio continues to read until no new unique tags have been read for 3 seconds. This can be adjusted using the StopInterval object when setting the mode.
>     

## Directionality[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html#directionality "Link to this heading")

Directionality mode configures the radio to read tags and report zone transitions based on their movement. For more information on Directionality, refer to **Portal Directionality Deployment Guide**.

## Conveyer[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html#conveyer "Link to this heading")

Conveyer mode configures the radio to read tags and report all unique tags for each antenna.

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags once. This can be adjusted using the Filter object when setting the mode.
>     

## Custom[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/operating_modes/index.html#custom "Link to this heading")

Custom mode provides all the low-level options to configures the radio and is designed for advanced user.