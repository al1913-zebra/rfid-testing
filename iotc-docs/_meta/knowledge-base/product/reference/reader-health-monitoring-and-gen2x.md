#### Mastering Zebra RFID: Optimizing Reader Performance with Real-Time Health Monitoring and Gen2X Extensions

**Suresh Ramamoorthy**

Senior Manager Software Engineering,
Advanced Location Technologies


## Agenda

ZEBRA TECHNOLOGIES


#### Agenda
##### Mastering Zebra RFID



**1**


**2**


**3**



**Reader Device Status**


- Fixed Reader

- Sleds


**API Overview**


**Real-Time Health Monitoring**


- IoT Connector for Fixed Readers

- IoT Connector for Sleds

- Handheld SDK for Handheld /Sleds

- MDM



**4** **Gen2x Extensions**


**5** **Technical Resources**


**6** **Best Practices**


ZEBRA TECHNOLOGIES


## Reader Device Status

ZEBRA TECHNOLOGIES


#### Fixed Reader



**GPI Events**



**System**

   - Resource Utilization
(CPU, Memory, Flash)

   - Temperature

   - Up Time

   - GPO / GPI status

   - Power
(Negotiation, Source)
**RFID Radio**

   - Antenna Connection

   - Active/Inactive

   - Stats

   - Resource Utilization
(CPU/Memory)
**Reader Gateway**

   - Interface Connection
(Data)

   - Resource utilization
(CPU/Memory)

   - Stats
**User Apps**

   - App Running status

   - Resource utilization
(CPU/Memory)

   - Stats

   - Up Time


ZEBRA TECHNOLOGIES





















Async Event via Data
payload with timestamp
Antenna, CPU, RAM, Flash,
NTP, RFID Radio, Reader
Gateway, User Apps


#### RFID Sleds

**System**

- Current Time

- NTP sync status

- Temperature

- Up Time

- Power

- Model

- API version

- Serial Number

- Network Info

- Terminal Connection
(Bluetooth, Cradle, eConnex)
**RFID Radio**

- Active/Inactive

- Stats
**MQTT**

- MQTT version

- Connection status

- Stats





**Config Change**















Health, status, charge %
RFID Radio, Scanner, System



ZEBRA TECHNOLOGIES


## API Overview

ZEBRA TECHNOLOGIES


#### 3C Framework



ZEBRA TECHNOLOGIES




`o` Setup Event Streaming

`o` Settings for optimal functionality

`o` User preferences




`o` Manage

  - Software Update

  - Reboot

  - Factory Reset

`o` Monitor Heath Status


#### RFID API
##### Structure

ZEBRA TECHNOLOGIES




## Real-Time Health Monitoring

ZEBRA TECHNOLOGIES


#### IoT Connector
##### Fixed Reader


                        - REST




- REST




- REST

- MQTT

- Azure IoT Hub





|• MQTT Broker • Azure IoT Hub • AWS IoT Core Endpoint|• AWS IoT Core • WebSocket Client • TCP/IP Client • HID Keyboard Emulation* • MQTT Broker • WebSocket Client • Azure IoT Hub • AWS IoT Core Endpoint|
|---|---|
|Management<br>Control<br>Inbound<br>Interface<br>|Status Channel<br>Outbound<br>Interface<br>Management<br>Events<br>Tag Data<br>Events<br>Data Channel 1<br>Data Channel 2<br>|
|Events Streaming<br>IoT Connector v1<br>REST /cloud<br>(Default)<br>MQTT<br>Data Analytics (DA) App|Events Streaming<br>IoT Connector v1<br>REST /cloud<br>(Default)<br>MQTT<br>Data Analytics (DA) App|


Ethernet, Wi-Fi, WAN


**FXR90**







ZEBRA TECHNOLOGIES



**Monitoring**
Configure Endpoint
1. Subscribe
2. Consume Events
3. DA App Events if any



Ethernet



Ethernet



Ethernet


**ATR7000**




#### IoT Connector
##### Monitoring Fixed Readers



|Connect|Configure|Control|
|---|---|---|
|**Device Provisioning**<br>-<br>Reader Web UI/ RFID .NET SDK /<br>123RFID Desktop<br>-<br>End Point Configuration<br>-<br>Management Events<br>-<br>Management Interface<br>**Discover & Connect**<br>• FX Series: RM Command<br>**EnrollToCloud** to /Control (POST)<br>• FXR90:Reader automatically<br>connects to IOT Connector Endpoints<br>configured<br>• REST: /Cloud/LocalRestLogin to get<br>JWT Token for session.|**Setup Event Streaming**<br>•<br>**set_config**to enable<br>interested status<br>notifications<br>•<br>Heartbeat (Interval: 60<br>Sec default)<br>•<br>GPI<br>•<br>Firmware Upgrade<br>•<br>Error/Warnings<br>•<br>User App Custom events|**Events**<br>•<br>Heartbeat<br>•<br>CPU, RAM, FLASH, uptime, NTP sync status, temperature, radio<br>(active), Antennas Connected, Stats, user apps (running,<br>utilization, uptime)<br>•<br>GPI (Port No, High/Low)<br>•<br>Firmware Update progress (Download, overall, details, status)<br>**Disconnect**<br>-<br>FX Series: RM Command**disconnectFromCloud**to /Control (POST)<br>-<br>FXR90:<br>-<br>REST: Session Timeout<br>-<br>Others: Retries till max timeout and disconnects|


ZEBRA TECHNOLOGIES






#### IoT Connector – MQTT
##### Demo for fixed readers

ZEBRA TECHNOLOGIES


#### IoT Connector
##### RFID Sleds


                                                                           - MQTT Broker

                       - MQTT Broker


|Endpoint|Endpoint|
|---|---|
|Management<br>Control<br>Inbound<br>Interface<br>|Status Channel<br>Outbound<br>Interface<br>Management<br>Events<br>Tag Data<br>Events<br>Data Channel 1<br>Data Channel 2<br>|
|Events Streaming<br>IoT Connector v1<br>MQTT|Events Streaming<br>IoT Connector v1<br>MQTT|



Wi-Fi



ZEBRA TECHNOLOGIES



RFD40
Premium





Wi-Fi Wi-Fi





**Monitoring**
Configure Endpoint
1. Subscribe
2. Consume Events



RFD90
90 Long range



RFD40
Premium+



RFD90
30 Short range


#### IoT Connector
##### Monitoring Sleds



|Connect|Configure|Control|
|---|---|---|
|**Device Provisioning (Staging)**<br>-<br>RFID SDK / 123RFID Desktop<br>/ Mobile<br>-<br>End Point Configuration<br>-<br>Management, Events<br>**Discover & Connect**<br>• Reader automatically connects to<br>IOT Endpoint (MQTT broker)|**Setup Event Streaming**<br>•<br>**config_events**to enable<br>interested status<br>notifications<br>•<br>Alerts<br>•<br>Exception<br>•<br>Periodic: Heartbeat<br>(Interval: 60 Sec default)|**Events**<br>•<br>Alerts<br>•<br>Firmware update<br>•<br>Download Info (Firmware, Certs)<br>•<br>Power source (USB, Wall charger, Cradle)<br>•<br>Temperature Info (RFID PA, Ambient)<br>•<br>Network Status (Interface, network info)<br>•<br>System Exceptions<br>•<br>Battery<br>•<br>Exception (RFID, System, Scanner)<br>•<br>Heartbeat (Inventory, Battery)<br>**Disconnect**<br>-<br>Retries till max timeout and disconnects|


ZEBRA TECHNOLOGIES






#### Device Provisioning
##### Configure Wi-Fi Profile

###### • Open the 123RFID Desktop Application and connect your RFD40/90 device. • Navigate to the Configuration section and select the Communication option. • Click on the WiFi tab to access WiFi settings.

ZEBRA TECHNOLOGIES


#### Device Provisioning
##### Configure IoT Endpoint


  - Use 123 Desktop/Mobile
application to create IOT
endpoints in RFD40/90
devices


  - Below is an example
shows how to add IOT
endpoint for SOTI MDM


  - For generic IOT solution
select type MDM


  - Configure parameters
like URL, Protocol, Port,
Verification type, MQTT
publish & subscription
topics


ZEBRA TECHNOLOGIES


#### Device Monitoring
##### Demo using MQTT client

ZEBRA TECHNOLOGIES


#### Handheld SDK
##### Monitoring Handhelds / Sleds



|Connect|Configure|Control|
|---|---|---|
|**Discover & Connect**<br>• Transport: USB / Bluetooth<br>• Discover<br>Readers.**GetAvailableRFIDRea**<br>**derList()**<br>• Connect<br>**Connect()**|**Setup Event Streaming**<br>•<br>Status Notifications<br>addEventsListener<br>setReaderDisconnectEvent<br>eventStatusNotify<br>BATTERY_EVENT|**API**<br>**Battery Statistics** <br>•<br>Asset Info, Charge Cycles consumed, Status, state of Health<br>•<br>Config.**getBatteryStats**()<br>**Events**<br>•<br>Battery – Cause, Level, Charging status<br>**Disconnect**<br>-<br>**disconnect()**<br>-<br>**Dispose()**|


ZEBRA TECHNOLOGIES






## MDM

ZEBRA TECHNOLOGIES


#### SOTI Connect
##### RFD40/90

###### • SOTI connect is Mobile Device Management (MDM) provider • Manage multiple device types easily

ZEBRA TECHNOLOGIES


#### SOTI Connect
##### Demo

ZEBRA TECHNOLOGIES


## Technical Resources

ZEBRA TECHNOLOGIES


#### Resources
##### IOT Connector, SDK


  - IoT Connector for Fixed Reader

   - IOT Connector: [https://zebradevs.github.io/rfid-ziotc-docs/index.html](https://zebradevs.github.io/rfid-ziotc-docs/index.html)

   - [Alerts/Events: https://zebradevs.github.io/rfid-ziotc-docs/best_practices/configure_mgmtEvents.html#](https://zebradevs.github.io/rfid-ziotc-docs/best_practices/configure_mgmtEvents.html)

   - [JSON Schema: https://zebradevs.github.io/rfid-ziotc-docs/schemas/async_event_schema/index.html](https://zebradevs.github.io/rfid-ziotc-docs/schemas/async_event_schema/index.html)

   - [Postman Collections for REST: https://zebradevs.github.io/rfid-ziotc-docs/best_practices/resources/index.html](https://zebradevs.github.io/rfid-ziotc-docs/best_practices/resources/index.html)

  - IoT Connector for Handheld Reader


  - SDK/Tool

   - RFID Reader Tech Docs

[•](https://techdocs.zebra.com/dcs/rfid/) [https://techdocs.zebra.com/dcs/rfid/](https://techdocs.zebra.com/dcs/rfid/)

   - RFID Reader SDK for Windows (.NET) – includes Demo App (Exe, Source), SDK

[•](https://www.zebra.com/us/en/support-downloads/software/rfid-software/zebra-rfid-sdk-for-windows.html) [https://www.zebra.com/us/en/support-downloads/software/rfid-software/zebra-rfid-sdk-for-windows.html](https://www.zebra.com/us/en/support-downloads/software/rfid-software/zebra-rfid-sdk-for-windows.html)

   - 123RFID Desktop v3.0.0.33 or above

[•](https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html) [https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html](https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html)

  - Contact Zebra for the best and quickest way to get support for any questions or issues :

[–](https://www.zebra.com/us/en/about-zebra/contact-zebra/contact-tech-support.html) [https://www.zebra.com/us/en/about-zebra/contact-zebra/contact-tech-support.html](https://www.zebra.com/us/en/about-zebra/contact-zebra/contact-tech-support.html)


ZEBRA TECHNOLOGIES


## Gen2x Extensions

ZEBRA TECHNOLOGIES


#### Gen2x
##### Gen2 Compatible Feature


  - Impinj TagFocus [TM]

   - Enables capturing of more unique tags by giving ability to control persistent time of session 1 flag

  - Tag Quieting

   - Further ability to control Gen2 Session Flags

  - Impinj Protected Mode

   - Enables customer privacy by making tag invisible to readers

  - Impinj FastID [TM]

   - Ability to read EPC and TID together

  - Short-range reading

   - Limits range of tag

  - Impinj Integra [TM]

   - Ensure tag memory is written properly and ability to confirm how well bits are written

  - Impinj Authentication

   - Enables tag authentication


ZEBRA TECHNOLOGIES


#### Gen2x
##### Gen2 Compatible Feature


  - Impinj TagFocus [TM]

   - Enables capturing of more unique tags by giving ability to control persistent time of session 1 flag

  - Tag Quieting

   - Further ability to control Gen2 Session Flags

  - Impinj Protected Mode

   - Enables customer privacy by making tag invisible to readers

  - Impinj FastID [TM]

   - Ability to read EPC and TID together

  - Short-range reading

   - Limits range of tag

  - Impinj Integra [TM]

   - Ensure tag memory is written properly and ability to confirm how well bits are written

  - Impinj Authentication

   - Enables tag authentication


ZEBRA TECHNOLOGIES



Q2: Android


#### Gen2x
##### Practical Use cases

###### • Impinj TagFocus [TM]

  - Cycle Count

     - To read harder to read tags in the range

     - Useful for reading large tag populations

###### • Tag Quieting

  - Package Loading Use case

     - Every cycle the reader only need to read the tags
coming into the truck

     - Number of reads per box during truck loading
operations

             - Much higher and constant during loading
operation


ZEBRA TECHNOLOGIES


###### • Impinj Protected Mode

 - Retail Application Example

   - Item Sale

           - Consumer buys an item,

           - customer loyalty number associated with tag’s
PIN

           - On completion of purchase, the reader makes
invisible for the purchased item


   - Item Return

           - Consumer loyalty number provided upon return

           - Loyalty number used to look up the PIN from the
backend

           - On completion of return, the reader uses PIN to
make visible


#### RFID
##### Best Practices

###### • IOT Connector

  - Data Usage / Cost control

     - Subscribe for required notifications (status, data)

     - Enable the required data payloads (management / tag data).

     - Restrict the interval of reporting heart beats / alerts or tag events based on the use case

     - Use tag filtering (interval, tag matching pattern) & batching

  - Connection management

     - REST allows one connection (Management, Control and Events)

###### • Security

  - Use secured connection to protect data

  - Certificates can be used to establish secure connection

  - Latest software updates (subscribe for Zebra Notifications)


ZEBRA TECHNOLOGIES


#### RFID
##### Best Practices

###### • Optimal Performance

  - MQTT

     - QoS 0 Fire and Forget

     - QoS 1 At least Once

     - QoS 2 Exactly Once

  - Web Socket – Reconnect after timeout

  - Monitor events for thresholds and antenna status

  - Read Memory banks (TID, User) only if needed

  - Set the appropriate RF Settings (Operating Environment)

  - Batching and Retention can be used for managing network

conditions

  - DA Apps to make decisions inside the reader before data

flowing out of the reader


ZEBRA TECHNOLOGIES


# Questions?


# Thank You

ZEBRA and the stylized Zebra head are trademarks of Zebra Technologies Corp., registered in many jurisdictions worldwide.
All other trademarks are the property of their respective owners. ©2025 Zebra Technologies Corp. and/or its affiliates. All rights reserved.


ZEBRA TECHNOLOGIES


