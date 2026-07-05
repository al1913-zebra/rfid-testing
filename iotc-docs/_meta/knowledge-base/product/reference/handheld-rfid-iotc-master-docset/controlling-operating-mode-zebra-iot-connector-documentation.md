`Zebra IoT Connector` provides the ability to configure the radio to different modes of operation that optimize the radio configuration based on intended use case. Once configured, the mode can be started using the START REST API and will continue to operate until the STOP REST API is called.

The following modes are supported in `Zebra IoT Connector`.

-   Simple
    
-   Inventory
    
-   Portal
    
-   Directionality
    
-   Conveyer
    
-   Custom
    

## Configuring using Web Console[](https://zebradevs.github.io/rfid-ziotc-docs/controlling_operating_modes/index.html#configuring-using-web-console "Link to this heading")

The Operating mode configuration page can be accessed by navigating to **Communication** > **Zebra IoT Connector** > **Operating Mode**. This page allows the users to configure any Operating mode.

**Simple:**

Simple mode configures the radio to read and report all unique tags in the field of view of the radio.

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags. This can be adjusted using the Filter object when setting the mode.
>     
> 
> ![../_images/Simple.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/Simple.png)

**Inventory:**

Inventory mode configures the radio to read tags and report all unique tags for each antenna on a periodic interval. Additional meta-data (i.e., peak RSSI and number of reads for each antenna during the interval) is reported.

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags once. This can be adjusted using the Filter object when setting the mode.
>     
> -   The radio reports tags every second. This can be adjusted using the Interval object when setting the mode.
>     
> 
> ![../_images/Inventory.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/Inventory.png)

**Portal:**

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
> 
> ![../_images/Portal.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/Portal.png)

**Conveyor:**

Conveyor mode configures the radio to read tags and report all unique tags for each antenna.

Default:

> -   The radio attempts to read tags on all antennas. This can be adjusted using the Antennas object when setting the mode.
>     
> -   The radio reports all unique tags once. This can be adjusted using the Filter object when setting the mode.
>     
> 
> ![../_images/Conveyor.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/Conveyor.png)

**Directionality**

Directionality mode configures the radio to read tags and report zone transitions based on their movement. For more information on Directionality, refer to [Introduction](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#directionality-how-to).

**Custom:**

Custom mode provides all the low-level options to configures the radio and is designed for advanced user.

Payload of Operating mode can be written in JSON format and can be applied using Custom Mode.

> ![../_images/Custom.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/Custom.png)

## Parameters supported in Operating Modes are:[](https://zebradevs.github.io/rfid-ziotc-docs/controlling_operating_modes/index.html#parameters-supported-in-operating-modes-are "Link to this heading")

**Environment:** The type of environment in which the reader operates. Along with the regulatory configuration of the reader, the environment parameter will set the default link profile parameters (i.e., Miller mode, BLF, Tari, etc.) and the receiver dynamic range (interference immunity).

> -   **HIGH\_INTERFERENCE**: The reader is operating in the presence of other readers (defined as a multi-interrogator or dense interrogator environment in the Gen2 and ISO standards).
>     
> -   **LOW\_INTERFERENCE**: The reader is operating in an environment when the likelihood of interference is very low or only occurs for very brief periods of time (defined as a single interrogator environment in the Gen2 and ISO standards).
>     
> -   **VERY\_HIGH\_INTERFERENCE**: The reader is operating in an environment where the number of readers is greater than the number of available channels, or when interfering readers are in very close proximity to each other.
>     
> -   **AUTO\_DETECT**: This will cause the reader to try and assess the environment and adjust accordingly.
>     
> -   **DEMO**: Should be used when demonstrating the maximum performance (fastest read rate) of a reader. This assumes no other readers in the environment.
>     
> 
> If absent, the environment is set to `HIGH_INTERFERENCE`, which is `Default`.

**Tag Metadata:** Controls the metadata that is sent when a tag is reported

> -   **ANTENNA** will report the antenna port upon which the tag was inventoried.
>     
> -   **RSSI** will report the rssi (in dbm) of the inventoried tag. If the tag is only reported occasionally (see reportFilter), this tag will be the peak rssi since the last reported read.
>     
> -   **PHASE** will report the phase (in degrees) of the inventoried tag. This value will only be reported if each individual tag read is reported (in other words, if reportFilter duration is set to 0). Otherwise, it will not be reported.
>     
> -   **CHANNEL** will report the channel (in MHz) the reader was using when the tag was inventoried. This value will only be reported if each individual tag read is reported (in other words, if reportFilter duration is set to 0). Otherwise, it will not be reported.
>     
> -   **SEEN\_COUNT** will report the number of times the tag has been inventoried since the previous report. This value will always be 1 if each individual tag read is reported (in other words, if reportFilter duration is set to 0).
>     
> -   **PC** will report the PC bits of the inventoried tag as a hex string.
>     
> -   **XPC** will report the XPC bits of the inventoried tag, if present, as a hex string.
>     
> -   **CRC** will report the CRC bits of the inventoried tag as a hex string.
>     
> -   **EPC** will report the entire contents of the EPC bank as a hex string. If only a portion of the memory bank is desired, this can be requested by appending a \[ \] to the string and placing the words requested. For instance, if only the first word is desired, the value can be set as “EPC\[1\]”. If the first word and the 3-5 word are desired, the value can be set to “EPC\[1,3-5\]”.
>     
> -   **TID** will report the entire contents of the TID bank as a hex string. If only a portion of the memory bank is desired, this can be requested by appending a \[ \] to the string and placing the words requested. For instance, if only the first word is desired, the value can be set as “TID\[1\]”. If the first word and the 3-5 word are desired, the value can be set to “TID\[1,3-5\]”.
>     
> -   **USER** will report the entire contents of the USER bank as a hex string. If only a portion of the memory bank is desired, this can be requested by appending a \[ \] to the string and placing the words requested. For instance, if only the first word is desired, the value can be set as “TID\[1\]”. If the first word and the 3-5 word are desired, the value can be set to “TID\[1,3-5\]”.
>     
> 
> The array may also contain an object. The object must contain a single name value pair with the name being set to **userDefined** and the value being any desired string. Each time the tag is reported, this object will be included.
> 
> By Default, `SIMPLE` mode does not report any additional meta data, `PORTAL` and `CONVEYOR` modes reports `ANTENNA`, and `INVENTORY` mode reports `ANTENNA`, `RSSI`, and `SEEN_COUNT`.

**Filter:** Represents filter on the tag id. If absent, no filter is used.

> -   **value** The value to match. For prefix and suffix filters. Only hex digits are allowed and there must be an even number of hex digits. When prefix filter is used, selects cannot be used. For regex filter, C++ STL regex values should be used.
>     
> -   **match** The segment or method of the id to match. Example: `prefix`, `suffix`, `regex`.
>     
> -   **operation** The filter operation (include/exclude). Example: `include`, `exclude`.
>     

**Report Filter** Controls when and how often a tag is reported NOTE: This cannot be set while in `INVENTORY` mode. Setting the modeSpecificSetting for interval must be used in INVENTORY mode. If absent, each mode uses a different default. `SIMPLE` report tag read once. `PORTAL` and `CONVEYOR` report each tag the first time it is read on each antenna.

> -   **Duration** (in seconds) to wait to report a tag again once it has already been reported It should be noted that the way the filter works is that as long as the tag is being read by the reader, it will not report unless the time since the previous report of this tag on this antenna meets the type and duration.
>     
> -   **Type** Configures the timeout (in seconds) by antenna or for entire radio. Example: `RADIO_WIDE`, `PER_ANTENNA`.
>     

**Antenna Configuration**

Port Enable/Disable can be done using this parameter.the antenna ports to use to read tags. For ATR, the integers represent beam numbers. If absent, all antennas ports are used; for the ATR, a set of 38 beams are used.

**Transmit Power**

Desired Transmit Power (in dbm). If absent, the value is set to 27 dbm; for the ATR, the value is set to 36 dbm EIRP.

**Reporting Interval**

Reporting interval of Inventory mode, can be used to set The time interval (how often) to report each tag.

**Portal Mode**

`Start Trigger` The GPI trigger to start reads on the portal

> `Port`: The GPI port to signal. If absent, port 1 is used.
> 
> `signal`: The signal value for the trigger. If absent, signal LOW is used.

`stopInterval` The interval at which to stop reads after the last unique tag is read (seconds). If absent, the reader will stop after not reading a unique tag in 3 seconds.