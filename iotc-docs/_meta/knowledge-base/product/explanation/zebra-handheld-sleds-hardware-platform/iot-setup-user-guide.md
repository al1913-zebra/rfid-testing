# **RFD40/90 IOTC Features Guide**

#### **Early Access – Zebra Confidential** **June 2025**


### **RFD40/90 IOTC Features Guide**

#### Contents

Introduction....................................................................................................................2

Interfaces/Endpoints....................................................................................................2

Management & Event Interface.................................................................................2

Control Interface......................................................................................................3

Data Interface..........................................................................................................3

Supported Features..................................................................................................4

Future Developments...............................................................................................5

Prerequisites...................................................................................................................5

Setting up Data & Control endpoint..................................................................................5

Annexure.........................................................................................................................6

Connecting the Device to Wi-Fi.....................................................................................6

Setting up MQTT broker................................................................................................6

Setting up MQTT Client.................................................................................................7

Configuring the Control & Data Endpoints...................................................................10

IoT Endpoint Parameters.........................................................................................10

Publish and Subscribe Topics.................................................................................11

Configure Control & Data Endpoint using utility app.................................................13

Configure Control & Data Endpoint using ZETI commands.......................................18

Testing Control & Data Endpoints............................................................................22

Support.........................................................................................................................31

Document Revision History............................................................................................31



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



1


### **RFD40/90 IOTC Features Guide**

## Introduction

This documentation outlines the Zebra IoT Connector feature available in the RFD40/90
handheld readers. It offers an overview of the IoT Connector capabilities, guides users on
configuring various endpoints, details about testing procedures, and provides in-depth
information on different configuration options.


The IoT Connector for the Zebra RFD4090 device facilitates efficient communication and
management through the MQTT protocol. It offers a user-friendly interface for controlling
readers and extracting tag data and events. Utilizing JSON-formatted data structures, this
interface can be easily integrated with web applications, whether deployed in the cloud or
on-premises.
#### Interfaces/Endpoints

The Zebra IoT Connector feature provides four different interfaces as below; each can be
configured to use a different endpoint of choice.

|Serial NO|Endpoint Type|Direction|
|---|---|---|
|**1**<br>|Management<br>|In/out (command & response)<br>|
|**2**<br>|Event<br>|out<br>|
|**3**<br>|Control<br>|In/out (command & response)<br>|
|**4**|Data|Out|


##### Management & Event Interface

The management endpoint facilitates device management actions on the reader, such as
firmware updates and configuration adjustments. It operates as a synchronous interface,
meaning the reader processes commands received through this endpoint and provides
immediate responses.


The management event interface is an asynchronous channel through which the reader
sends real-time messages. It is used to monitor health events, such as heartbeats (including
reader temperature, battery status, and inventory status), as well as general alerts (like
battery, file download, and network-related alerts), errors, and warnings.


RFD4090 supports device management.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



2


### **RFD40/90 IOTC Features Guide**

Below are examples of the partner Enterprise mobility management solutions that offer
device management to RFD40/90.


  - [www.42gears.com](https://www.42gears.com/blog/simplifying-rfid-management-suremdm-now-supports-zebra-rfd40-and-rfd90-sleds/)

  - [www.soti.net](https://www.soti.net/resources/blog/2024/soti-connect-now-supports-zebra-rfid-sleds/)


Management and event endpoints can be configured to connect to MQTT using 123RFID
Desktop application. For detailed steps, refer to management & event endpoints setup.

##### Control Interface

The control interface offers essential features for managing RFID operations, including the
ability to start and stop inventory processes. It allows users to configure various RFID
parameters, such as operating profiles (as detailed in Table 1), transmit power settings, and
inventory-specific parameters like access filters, select filters, post filters, data report filters
etc. For a comprehensive understanding of all available configuration parameters, users
should refer to the API documentation RFD4090_iot_api_doc.zip, which provides detailed
guidance and specifications.


























|Profli e|Description|Transmit<br>power (dBm)|Link<br>profile|Session|
|---|---|---|---|---|
|**Fast read**<br>|Read as many tags as fast<br>as possible in short range<br>|30<br>|FM0 640K<br>|S0<br>|
|**Cycle count**<br>|Read as many unique tags<br>as possible.<br>|30<br>|M4 240K<br>|S2<br>|
|**Dense readers**<br>|Used when multiple readers<br>in proximity<br>|30<br>|M4 256K<br>|S1<br>|
|**Optimal**<br>**battery**<br>|Gives best battery life<br>|24<br>|M4 240K<br>|S1<br>|
|**Balanced**<br>**performance**<br>**(Default)**|Maintains balance between<br>performance and battery<br>life.<br>|27<br>|M4 240K|S1|


##### Data Interface

The data interface is an outbound channel designed to transmit RFID tag and barcode events
from the reader, facilitating real-time data processing. It delivers detailed RFID tag
information, including unique identifiers like EPC and TID, user-defined memory data,
protocol-specific bits (PC, CRC, XPC), diagnostics such as RSSI, phase, and channel



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



3


### **RFD40/90 IOTC Features Guide**

frequency, as well as timestamps for first and last seen events. Additionally, it reports
inventory counts and access operation results.


For barcode data, the interface captures symbology (e.g., CODE_39) and decoded string
values. Equipped with advanced filtering and reporting capabilities, this interface ensures
efficient data integration for inventory management and enterprise IoT applications.


For more details, please refer to data events definitions in RFD4090_iot_api_doc.zip

##### Supported Features

_Control Interface_

  - **Operating Mode Configuration:** Configure the reader’s operating profile to
optimize speed, battery life, or dense environments. Supported profiles include
FAST_READ, CYCLE_COUNT, DENSE_READERS, OPTIMAL_BATTERY,
BALANCED_PERFORMANCE, READER_DEFINED, and ADVANCED. In ADVANCED
mode, users can fine-tune transmit power, link profile, session, and dynamic power
settings.

  - **Access Operations:** Supports read and write operations on tag memory banks
(EPC, TID, USER, etc.) with results reported in the data interface.

  - **Radio Start/Stop Conditions:** Configurable triggers for starting and stopping
inventory, including button press, tag count, timeout, and inventory count.

  - **Query and Select Operations:** Use query parameters to control tag inventory
behavior (session, target, tag population) and apply select filters to pre-filter tags
based on memory bank data, mask, and offset. This enables targeted and efficient
tag reading.

  - **Tag Metadata Selection:** Users can specify which tag metadata fields (RSSI,
PHASE, SEEN_COUNT, ANTENNA, CHANNEL, PC, XPC, CRC, EPC, TID, USER, MAC,
HOSTNAME) are reported for each tag read.

  - **Post Filter Application:** Users can define post filters to control which tag data is
reported. Filters can be based on prefix, suffix, or regular expression patterns, and
can include or exclude tags, set report durations, seen count thresholds, RSSI
thresholds, and whitelist/blacklist tag patterns.

_Data Interface_

  - **Tag Data Events** : Reports detailed tag read data, including EPC, TID, USER, CRC, PC,
XPC, antenna, channel, RSSI, phase, and seen count.

  - **Access Results** : Provides results of access operations (read/write) as part of tag
data events.

  - **User-Defined Fields** : Allows inclusion of custom user-defined string values in event
reports.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



4


### **RFD40/90 IOTC Features Guide**


  - **Advanced Filtering and Reporting:** Supports advanced filtering (pre-filters, postfilters) and flexible reporting options to streamline data integration for inventory
management and enterprise IoT applications.
##### Future Developments

  - The current system does not allow barcode scanning operations to be executed via
control interface commands.

  - At present, only up to 4 pre-filters are supported, but there is the capability to support
up to 32 pre-filters.

  - During standard inventory operations, memory bank data is not included in reports
when tag metadata is enabled. To obtain memory bank data, users must perform
access operations using the set operating mode command.

  - Support for reporting scanned barcode data, including symbology and decoded
barcode value.

  - At present, only data1 channel is enabled, data2 will be enabled in later releases.

  - Tag black & whitelisting is not supported.

  - RSSI based tag filtering is not supported.

  - Tag data events are not reported in “Fast” read profile

  - In Tag data events below are not supported

`o` “First Seen” & “Last Seen” times are not reported

`o` “User Defined” strings are not included in data events

`o` “CRC” is not included in data events

## Prerequisites

To test the IoT Connector (IOTC), the following setups are required:


1. MQTT Broker
2. Wi-Fi Connection
3. MQTT Client
4. RFD40/90 Sled

## Setting up Data & Control endpoint

To set up Control & Data endpoints, the provided test utility can be used. In the future
Zebra’s 123RFID Tools and SDKs will be enhanced to configure Data and Control endpoints.


Please refer to section Configure Control & Data Endpoint using utility app



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



5


### **RFD40/90 IOTC Features Guide**

## Annexure

This section offers detailed information on various configurations required for IoT
connection and directs you to appropriate resources.
#### Connecting the Device to Wi-Fi

To configure Wi-Fi profiles and connect the device to the network using 123RFID Desktop
[application, refer Wi-Fi Confguration .](https://docs.zebra.com/us/en/rfid/123rfid-desktop/c-123rfid-desktop-application-features/c-123rfid-desktop-online-reader-configuration/g-123rfid-desktop-fx75-network-settings/t-123rifd-desktop-wi-fi-configuration.html)
#### Setting up MQTT broker

This section will describe how to install MQTT broker on windows and verify the installation.
We can use popular MQTT brokers like Mosquitto, EMQX, HiveMQ, and others to facilitate
the IoT Connection.


The method used in this document is to install the MQTT Mosquitto broker.


1. Visit the official Eclipse Mosquitto download page to download the installer:

[https://mosquitto.org/download/](https://mosquitto.org/download/)



2. In the "Windows" section and download the appropriate installer for your system

(e.g., 64-bit or 32-bit).
3. Run the Installer by double clicking the downloaded .exe file to start the installation

process. If you want to use Mosquitto commands from the terminal, add the
installation directory (e.g., C:\Program Files\Mosquitto) to your system's PATH
environment variable.
4. Open Command Prompt and navigate to the directory where the Mosquitto installer

package is located.
**cd C:\Program Files\mosquitto**



**5.** Run the following command to start the broker with default configuration:

**mosquitto -v**


To start with a specific configuration file, run


**mosquitto -v -c mosquitto.conf**


6. To setup secure MQTT connection we must use PEM formatted certificates encoded in

PKCS#1 format only. Shell script required to generate self-sign certificates are provided
for reference.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



6


### **RFD40/90 IOTC Features Guide**

#### Setting up MQTT Client

Once installed, open MQTTX app and create a new connection, by clicking on the “+” icon
on the left menu bar and enter the details as below and click on “Connect”.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



7


### **RFD40/90 IOTC Features Guide**

To subscribe to a topic, click on “New Subscription” and enter the topic name as shown
below and click on Confirm.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



8


### **RFD40/90 IOTC Features Guide**

Now publish a test message on the test topic and check if the message is received back on
the subscription.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



9


### **RFD40/90 IOTC Features Guide**

#### Configuring the Control & Data Endpoints

##### IoT Endpoint Parameters

Endpoint configuration includes the following parameters settings for MQTT connection.


  - Type: Represents the type of endpoint (e.g. control, data1, data2).

  - Name: A unique and identifiable name for the endpoint (e.g., mqttclient). This helps
distinguish between multiple endpoints.

  - Protocol: Specifies the communication protocol to be used.

`o` MQTT: For unsecured communication.

`o` MQTT TLS: For secured communication, which requires SSL/TLS certificates
for encryption.

  - Port:

`o` 1883 for unsecured MQTT communication.

`o` 8883 for secured MQTT TLS communication.

  - Tenant ID: A namespace identifier used to logically group devices or endpoints
(e.g., zebra). This helps in organizing and managing devices in multi-tenant
environments.

  - Keep Alive: Set the interval (in seconds) for maintaining broker connectivity when idle
(e.g.120).

  - Clear Session: Determines whether the broker should retain the session state
(subscriptions and messages) when the client disconnects.

  - URL: Enter the hostname or IP address of the MQTT broker.

  - Reconnection Delay:

`o` minTime: Minimum delay before retrying connection attempts (e.g., 1 sec).

`o` maxTime: Maximum delay for retrying connection attempts (e.g., 5 secs).

  - Authentication:

`o` Username: Enter the username for the broker (e.g., mqttUser).

`o` Password: Enter the password for the broker (e.g., password).



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



10


### **RFD40/90 IOTC Features Guide**

##### Publish and Subscribe Topics

_Publish Topic_


In RFD40/90 devices, only a single publish topic is supported. Any commands sent to this
topic will be received by the device. The publish topic can be configured using the 123RFID
Desktop or Mobile applications.

Command Publish topic follows below format

_<Tenant ID>/<User Configured Publish Topic>/<Device Serial No>_

Example:

User configured subscription Tenant ID = > “zebra”

User configured subscription topic => “"CTRL/clients/cmnd”

Device Serial No => “RFD40-212735201D0053”


Publish Topic is: _**“zebra/CTRL/clients/cmnd/RFD40-212735201D0053”**_


_Subscribe Topics_


In RFD40/90 there are four subscribe topics that are supported. Device subscribes
command response, events, alerts, and last will message through these topics.

Below are different types of subscribe topics

1. Command response subscribe topic
2. Alert & Event subscribe topic
3. Data events subscribe topic
4. Last will and Testament subscribe topic


Subscribe topics are configured using 123RFID desktop or Mobile applications.

Subscribe topic follows below format

_<Tenant ID>/<User Configured Subscribe Topic>/<Device Serial No>_



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



11


### **RFD40/90 IOTC Features Guide**

Example:

Tenant ID = > “zebra”

User configured Cmd response subscribe topic => “CTRL/clients/resp”

User configured Events & Alert subscribe topic => “CTRL/clients/event”

User configured LWT subscribe topic => “CTRL/clients/rfid”

User configured Data event topic => “DATA/clients/data1event”

Device Serial No => “RFD40-212735201D0053”

Command Response Topic: _**“zebra/CTRL/clients/resp/RFD40-212735201D0053”**_

Alert & Event publish topic: “ _**zebra/CTRL/clients/event/RFD40-212735201D0053**_ ”

Data Events: “ _**zebra/DATA/clients/data1event/ RFD40-212735201D0053**_ ”

Last will and Testament publish topic: “ _**zebra/CTRL/clients/rfid/RFD40-**_
_**212735201D0053**_ ”



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



12


### **RFD40/90 IOTC Features Guide**

##### Configure Control & Data Endpoint using utility app

Download the IOTC_DataCtrlUtil.zip to configure IOT Data & Control endpoint.


Launch the utility by running the executable file. The interface appears as shown below:


     - Select the Serial Number of the device.

     - If the Serial Number is not identified, click on refresh button to refresh the
Device Serial number list in the dropdown menu

     - Click on the **Connect** button to connect to the Device.

     - Once connected, you will receive a success notification.


EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



13


### **RFD40/90 IOTC Features Guide**


    - After successful connection, user can install necessary certificates for secure
MQTT & Wi-Fi connection.

`o` Navigate to **Add Certificates** section to upload Wi-Fi and MQTT
certificates for a secure connection.

`o` If the certificates are already added for different configurations, delete
them before adding the new certificates. This can be done by using the
button **Delete All Certificates.**

`o` Click on each button to upload the respective certificates.

`o` After uploading all certificates, click on the **Add Certificates** to add all
certificates to the device.


`o` The uploaded certificates can be listed by clicking the **Get Certificates**
button.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



14


### **RFD40/90 IOTC Features Guide**


`o` This step can be skipped, if secure connection is not necessary.


Navigate to the **Add Endpoint Configuration** section. The interface appears
as shown below:


    - Enter all the endpoint configuration details such as name, endpoint type,
[protocol etc. To understand more about these parameters, refer end point](https://docs.zebra.com/us/en/rfid/123rfid-desktop/c-123rfid-desktop-application-features/c-123rfid-desktop-online-reader-configuration/g-123rfid-desktop-fx75-network-settings/t-123rfid-desktop-end-point-configuration.html)
[confguration](https://docs.zebra.com/us/en/rfid/123rfid-desktop/c-123rfid-desktop-application-features/c-123rfid-desktop-online-reader-configuration/g-123rfid-desktop-fx75-network-settings/t-123rfid-desktop-end-point-configuration.html) .

    - After filling in all the fields, click on the **Add Endpoint** button to add the
endpoint.

    - The added endpoint can be activated using the Activate Endpoint section. Select
the endpoint name in the dropdown list and click on the **Activate Endpoint** to
activate the endpoint.

    - Once the activation is completed, reboot the device to apply the endpoint
configuration and trigger the connection with broker. The device can be
rebooted using the **Reboot Device** button and after the reboot, connection to
the device happens automatically and user is notified after the reconnection as
shown below:



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



15


### **RFD40/90 IOTC Features Guide**


    - To view the details of the configured endpoint, including publish and subscribe
topics, navigate to the **Get Endpoint Configuration** section.

    - Select the endpoint from the drop-down menu and click on the **Get**
**Endpoint** button. You will see all the configuration details as shown below:


    - This section can also be used to delete the stored endpoint configuration


    - To trigger the connection with the broker, connect to the same network as the
broker (for local testing)

    - Wi-Fi configuration can be performed using 123RFID tool or test utility. Refer
[WiFi Confguration .](https://docs.zebra.com/us/en/rfid/123rfid-desktop/c-123rfid-desktop-application-features/c-123rfid-desktop-online-reader-configuration/g-123rfid-desktop-fx75-network-settings/t-123rifd-desktop-wi-fi-configuration.html)

    - Navigate to the **Wi-Fi Configuration** section to configure the Wi-Fi.

    - To add a new profile, enter the SSID and password, then click on **Add SSID** to
add the profile.


    - Once the profile has been added, connect to the profile by selecting the SSID
from the drop-down menu and clicking on the **Connect** button.

    - Once the connection is successful, you will receive a notification, and the status
will be updated as shown below:



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



16


### **RFD40/90 IOTC Features Guide**

To check the endpoint connection status, navigate to **Get IOT Connection Status**
section and click the **Get Status** button to get the IOT Connection Status as shown
below:



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



17


### **RFD40/90 IOTC Features Guide**

At every step, all debug and error logs can be viewed in the terminal associated with
the utility, as shown below:

##### Configure Control & Data Endpoint using ZETI commands

Connect the device through tera term. The command endpointconfig (epcf) allows
setting of following parameters required for MQTT connection.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



18


### **RFD40/90 IOTC Features Guide**

Add a new control and data1 endpoint configuration and the added configurations
must be saved.


The command getendpointnames (epn) will fetch all the save endpoint names. The
maximum number of endpoints allowed is 10.


The command iotconfig (iotc) is used to activate the configured endpoints. The
device must be reset after activating the necessary endpoints for the MQTT
connection process.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



19


### **RFD40/90 IOTC Features Guide**

We can view the endpoint information using the commands shown below.


We can get the endpoints connection status using the command below.


EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



20


### **RFD40/90 IOTC Features Guide**

In addition, we can verify the connection status by enabling the debug logs using **sa .dp 1**
command.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



21


### **RFD40/90 IOTC Features Guide**

##### Testing Control & Data Endpoints

When an MQTT endpoint is configured, command and response topics must be specified
to perform the configured endpoint functions. Refer RFD4090 MQTT Schemas on how to
perform these operations over MQTT.


_**Example to Start & Stop Inventory**_


Start and stop inventory can be performed using “control_operation” command through
the control interface and tags read will be reported as events from the data interface as
shown in the below example.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



22


### **RFD40/90 IOTC Features Guide**

_**Example to Set RFID parameters**_

1. Profile Setting

    - Setting to CYCLE COUNT profile


EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



23


### **RFD40/90 IOTC Features Guide**


  - ADVANCED profile setting


2. Access operations


After sending the set operating mode command to configure required access operations,
we must send control operation start inventory command to perform the access
operations. To stop the inventory, we send control operation stop command.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



24


### **RFD40/90 IOTC Features Guide**

EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



25


### **RFD40/90 IOTC Features Guide**

3. Radio start and stop conditions


EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



26


### **RFD40/90 IOTC Features Guide**

4. Query and Select pre-filters


EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



27


### **RFD40/90 IOTC Features Guide**

5. Tag meta data


_**Example to Set Post Filters**_


1. A filter is added (operation: ADD) to the DATA_EP1 endpoint and is set to include

(reportOperation: INCLUDE) only tags that match the regular
expression B22F (matchPatternMethod: REGEX). The filter also specifies an RSSI
threshold of -88 dBm to include tags with sufficient signal strength. Parameters
like reportDuration and seenCount are set to 0, indicating no specific duration or
minimum tag visibility count is required for reporting. This configuration helps
refining the tag data by including only relevant tags based on the defined criteria.


EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



28


### **RFD40/90 IOTC Features Guide**

EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



29


### **RFD40/90 IOTC Features Guide**

2. A post filter is added (operation: ADD) to the DATA_EP1 endpoint and is set to

exclude (reportOperation: EXCLUDE) tags that match the
prefix B22F (matchPatternMethod: PREFIX). This configuration helps refine the tag
data by excluding unwanted tags based on the defined criteria.



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



30


### **RFD40/90 IOTC Features Guide**

## Support

We are excited to share these early access features – and while we usually recommend
contacting Zebra support as the best and fastest way to get help (and we still do for ANY
other topic!) - as part of this early access program, we ask that you reach out to
[ZebraRFIDEarlyAccess@zebra.com](mailto:ZebraRFIDEarlyAccess@zebra.com)

## Document Revision History

|Revision Data|Changes/History|Comments|
|---|---|---|
|May 9, 2025<br>|Initial version<br>||
|May 21, 2025<br>|Updated document based on review<br>comments<br>|Updated below sections -<br>Supported Features, Annexture -><br>Confgure Control & Data Endpoint|
|June 6, 2025|Formatting Updates||



EARLY ACCESS DRAFT – ZEBRA CONFIDENTIAL



31


