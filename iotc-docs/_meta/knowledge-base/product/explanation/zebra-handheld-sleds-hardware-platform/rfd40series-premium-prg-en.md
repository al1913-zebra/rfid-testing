# **RFD40 Series** **Premium and** **Premium Plus RFID** **Sleds**

## **Product Reference Guide**

MN-004373-07EN Rev. B1


Zebra Technologies | 3 Overlook Point | Lincolnshire, IL 60069 USA
##### **zebra.com**


Copyright


2026/03/04


The Zebra wordmark and logo are trademarks of Zebra Technologies Corp., registered in many
jurisdictions worldwide. All other trademarks are the property of their respective owners. ©2026 Zebra
Technologies Corp. and/or its affiliates.


Information in this document is subject to change without notice. The software described in this
document is furnished under a license agreement or nondisclosure agreement. The software may be
used or copied only in accordance with the terms of those agreements.


For further information regarding legal and proprietary statements, please go to:


[SOFTWARE: zebra.com/informationpolicy.](http://zebra.com/informationpolicy)
[COPYRIGHTS: zebra.com/copyright.](http://www.zebra.com/copyright)
[PATENTS: ip.zebra.com.](http://ip.zebra.com/)
[WARRANTY: zebra.com/warranty.](http://www.zebra.com/warranty)
[END USER LICENSE AGREEMENT: zebra.com/eula.](http://www.zebra.com/eula)

#### **Terms of Use**

##### **Proprietary Statement**


This manual contains proprietary information of Zebra Technologies Corporation and its subsidiaries
(“Zebra Technologies”). It is intended solely for the information and use of parties operating and
maintaining the equipment described herein. Such proprietary information may not be used,
reproduced, or disclosed to any other parties for any other purpose without the express, written
permission of Zebra Technologies.

##### **Product Improvements**


Continuous improvement of products is a policy of Zebra Technologies. All specifications and designs
are subject to change without notice.

##### **Liability Disclaimer**


Zebra Technologies takes steps to ensure that its published Engineering specifications and manuals are
correct; however, errors do occur. Zebra Technologies reserves the right to correct any such errors and
disclaims liability resulting therefrom.

##### **Limitation of Liability**


In no event shall Zebra Technologies or anyone else involved in the creation, production, or delivery of
the accompanying product (including hardware and software) be liable for any damages whatsoever
(including, without limitation, consequential damages including loss of business profits, business
interruption, or loss of business information) arising out of the use of, the results of use of, or inability
to use such product, even if Zebra Technologies has been advised of the possibility of such damages.
Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so
the above limitation or exclusion may not apply to you.


### **Contents**

**About this Document................................................................................................................................................................................................................... 5**


Related Documents............................................................................................................................................ 5


Notational Conventions.................................................................................................................................... 5


Service Information.............................................................................................................................................6


**Getting Started with the RFD40/RDF40-M........................................................................................................................................................................ 7**


Unpacking................................................................................................................................................................ 7


Adaptor Installation.............................................................................................................................................8


Device Installation............................................................................................................................................. 10


Device Removal..........................................................................................................................................12


Battery Replacement........................................................................................................................................12


Battery Removal..................................................................................................................................................13


Pairing the Sled with a Mobile Computer.............................................................................................14


Disconnect Bluetooth Devices From RFD40 Using Parameter Barcode.............................16


Using the Rubber Locking Foot..................................................................................................................16


Charging.................................................................................................................................................................. 17


Charging using the eConnex Interface.................................................................................................. 18


Option to Enable/Disable eConnex..........................................................................................................18


UI Indicators...........................................................................................................................................................18


LED Definitions........................................................................................................................................... 19


Beeper Indications...................................................................................................................................20


Trigger Mapping Modes....................................................................................................................... 22


Wireless and Connectivity Functionality..............................................................................................23


Wi-Fi Overview...........................................................................................................................................23


Bluetooth Overview.................................................................................................................................25


3


Contents


Mobile Device Management Overview........................................................................................25


Performing a Factory Default Reset on the Sled............................................................................ 26


Performing a Factory Reset By Scanning a Barcode................................................................... 26


**Maintenance.................................................................................................................................................................................................................................27**


Harmful Ingredients..........................................................................................................................................27


Approved Cleaners...........................................................................................................................................28


Cleaning the Sled............................................................................................................................................. 28


**Technical Specifications...........................................................................................................................................................................................................30**


**Compliance and Implications of EU RED for the RFD40/RFD40-M......................................................................................................................... 32**


About BS EN 18031-1 & The EU Radio Equipment Directive (RED)........................................ 32


Applicability of BS EN 18031-1 for the RFD40 Sled...............................................................32


Applicability of BS EN 18031-1................................................................................................................... 33


Parameters Protected by Authorization Password..........................................................................33


Default Authorization Password & Update.................................................................................33


About the Authorization Session & Password Criteria......................................................... 34


Bluetooth Settings....................................................................................................................................34


Wi-Fi Settings............................................................................................................................................. 35


IoT Endpoint Configuration.................................................................................................................35


Certificate Management.......................................................................................................................35


Firmware & Configuration file Update..........................................................................................35


Device Authorization Using Authorization Password....................................................................36


Impact on IoT Connectivity..........................................................................................................................37


Impact on Current Applications & Best Migration Approaches...............................................38


Suggested Migration Approaches...................................................................................................38


Annexure 1.............................................................................................................................................................38


**Troubleshooting............................................................................................................................................................................................................................41**


4


### **About this Document**

**About this Document**


This guide provides information about setting up and using the RFD40 UHF RFID Premium/Premium
Plus/RFD40-M Premium Plus Sled. Some screens shown in this guide may differ from the actual
screens shown on the device.

#### **Related Documents**


The following documents provide additional information about the RFD40 Series sleds:


              - RFD40 Series Premium and Premium Plus RFID Sleds Quick Start Guide, p/n MN-004375-xx.

#### **Notational Conventions**


The following conventions are used in this document:


Bold text is used to highlight the following:


              - Dialog box, window, and screen names.


              - Drop-down list and list box names.


              - Checkbox and radio button names.


              - Icons on a screen.


              - Key names on a keypad.


              - Button names on a screen.


Bullets (•) indicate:


              - Action items


              - List of alternatives


              - Lists of required steps that are not necessarily sequential


Sequential lists (for example, those that describe step-by-step procedures) appear as numbered lists.


5


About this Document

#### **Service Information**


If you have a problem with your equipment, contact Zebra Global Customer Support for your region.
Contact information is available at: zebra.com/support.


When contacting support, please have the following information available:


              - Serial number of the unit


              - Model number or product name


              - Software type and version number


Zebra responds to calls by email, telephone, or fax within the time limits set forth in support agreements.


If your problem cannot be solved by Zebra Customer Support, you may need to return your equipment
for servicing and will be given specific directions. Zebra is not responsible for any damages incurred
during shipment if the approved shipping container is not used. Shipping the units improperly can
possibly void the warranty.


If you purchased your Zebra business product from a Zebra business partner, contact that business
partner for support.


6


### **Getting Started with the RFD40/** **RDF40-M**

**Getting Started with the RFD40/RDF40-M**


The RFD40 UHF RFID Premium sled provides RAIN Radio Frequency Identification (RFID) tag reading,
writing, and locating capability to supported Zebra mobile computers and other host devices.


To use the RFD40 sled for the first time with a mobile computer:


**1.** Insert the battery into the device.


**2.** Charge the RFD40 sled using the charging cradle, charging cup, or USB-C cable.


**3.** Replace the cover with the adaptor that is specific to the mobile computer to be used with the sled.


**4.** Place the mobile computer into the adaptor headfirst.


**5.** Secure the mobile computer into the adaptor by pressing down on the bottom of the mobile

computer.


**6.** Set the region using 123RFID Desktop or 123RFID Mobile.


[For the latest versions of guides and software, go to: zebra.com/support.](http://zebra.com/support)


[For detailed information, refer to the Product Reference Guide at: zebra.com/support.](http://zebra.com/support)


[For a detailed configuration of the sleds, refer to the 123RFID Desktop User Guide.](https://docs.zebra.com/us/en/rfid/123rfid-desktop/c-123rfid-desktop.html)

#### **Unpacking**


This chapter provides information on RFD40 RFID Premium sled parts, battery installation, mobile
device attachment, LED indications, and charging. Carefully remove all protective material from the
RFD40 RFID sled and save the shipping container for later storage and shipping.


Verify the following items are in the box:


              - RFD40 RFD Premium or Premium Plus or RFD40-M Premium Plus Sled


              - Battery


              - Lanyard


              - Quick Start Guide


Inspect the equipment for damage. If any equipment is missing or damaged, contact the Zebra Support
Center immediately.


For a full list of accessories that can be used with the RFD40 Premium/Premium Plus/RFD40-M
[Premium Plus Sled, refer to the product specific Technical Accessory Guide available at zebra.com/](http://zebra.com/support)
[support.](http://zebra.com/support)


7


Getting Started with the RFD40/RDF40-M

#### **Adaptor Installation**


RFD40 Ultra-Rugged UHF RFID sleds can be used with various mobile devices by using an adaptor to
mount the device onto the sled.


To install the adaptor:


**1.** Remove the cover of the sled by pulling up on the lip.


**2.** Ensure that the pogo pins are aligned and insert the adaptor into the sled.


**NOTE:** When installing the adaptor, use caution and ensure that the pogo pins are lined up
directly prior to insertion into the sled.


8


Getting Started with the RFD40/RDF40-M


**3.** Secure the adaptor onto the RFD40 by fastening the four coin screws into the sled.


9


Getting Started with the RFD40/RDF40-M

#### **Device Installation**


To secure a mobile computer to the RFD40 sled, place the top of the device fully forward into the
RFD40 sled adaptor and push down on the bottom of the mobile computer.


**NOTE:** Refer to the installation visual aid on the adaptor to view the correct device orientation
for installation. For additional installation information, scan the QR code on the label to view
the installation video.


**NOTE:** Use caution while installing the mobile computer into the adaptor, and do not collide with
the eConnex Communication Port.


10


Getting Started with the RFD40/RDF40-M


**Figure 1** Device Insertion


**NOTE:** The insertion method varies from device to device. Please refer to the adaptor label for
the proper insertion method.


11


Getting Started with the RFD40/RDF40-M

##### **Device Removal**


To remove the mobile computer from the RFD40 sled, firmly hold the sled handle and lift the device off
of the sled adaptor.


**Figure 2** Device Removal

#### **Battery Replacement**


The following section outlines the procedure for replacing the battery in the RFD40.


To install the battery:


12


Getting Started with the RFD40/RDF40-M


**Figure 3** Battery Insertion


**1.** Align the battery with the notch facing the back of the device


**2.** Slide the battery into the handle of the device.


**3.** Snap the battery into the place.

#### **Battery Removal**


To remove the battery:


13


Getting Started with the RFD40/RDF40-M


**Figure 4** Battery Removal


**1.** Pinch the clips on the battery to unlock.


**2.** Slide downwards to remove the battery from the device.

#### **Pairing the Sled with a Mobile Computer**


Pair the sled with a mobile computer by connecting directly with the communication port, scanning the
barcode on the device, or by using the NFC feature on the RFD40 to activate NFC Bluetooth pairing
and facilitate Bluetooth communication between the sled and the mobile computer.


              - To connect via scan, scan the code on the sled using the mobile computer to obtain the Bluetooth
MAC address to pair the device to the sled.


14


Getting Started with the RFD40/RDF40-M


**Figure 5** Scan Bluetooth MAC Address


- To connect via NFC, align the NFC area behind the handle of the sled with the NFC area on the back
of the mobile computer to pair.


**Figure 6** Scan NFC Area to Pair Device


Once the sled has paired with a mobile computer, the sled recognizes the device going forward and
automatically connects using the 123RFID Mobile or 123RFID Desktop Reader Discovery feature.


15


Getting Started with the RFD40/RDF40-M

#### **Disconnect Bluetooth Devices From RFD40 Using Parameter Barcode**


Users can disconnect a terminal/phone from an RFD40 sled by scanning the barcode provided below.

#### **Using the Rubber Locking Foot**


The RFD40 comes with a standard rubber foot on the bottom of the sled. An optional locking foot
that is used in place of the standard locking foot and secures the battery of the sled is available as a
purchasable accessory. For a full list of accessories that can be used with the RFD40 RFID Premium
or RFD40-M Premium Plus Sled, refer to the product-specific Technical Accessory Guide available at:
[zebra.com/support.](http://zebra.com/support)


**Figure 7** Rubber Locking Foot


1 Rubber Locking Foot


16


#### **Charging**



Getting Started with the RFD40/RDF40-M


Before using the RFD40 for the first time, fully charge the battery by placing it in the charging cradle
until the LED Power/Charging indicator turns solid green. The RFD40 RFID sled and mobile computer
may be charged in the charging cradle individually or attached together.


When an RFD40 RFID sled is removed from a charging cradle, it is automatically powered on. If a reader
is not used for a duration of thirty minutes, the reader enters Off mode.


**NOTE:** The Charge Terminal parameter must be enabled to charge the mobile computer.


**NOTE:** A 12V power supply must be connected to the power jack when charging the sled using
the cable cup accessory.


**NOTE:** The cradle does not charge the mobile computer if the battery is completely depleted or
if it is not powered on.


**Figure 8** Single-Slot Charging Cradle


17


Getting Started with the RFD40/RDF40-M

#### **Charging using the eConnex Interface**


The mobile computer can be charged using the eConnex interface when connected to the sled. Before
attempting to charge a mobile computer using the eConnex interface, verify that the mobile computer
is compatible with pass-through charging by viewing the Technical Accessory Guide available at
[zebra.com/support.](http://zebra.com/support)


**NOTE:** The cradle does not charge the device if the battery is completely depleted or if it is
not powered on.


**NOTE:** The Charge Terminal parameter must be enabled to charge the mobile computer.


**NOTE:** A 12V power supply must be connected to the power jack when charging the sled using
the cable cup accessory.

#### **Option to Enable/Disable eConnex**


Users have the option to enable or disable the eConnex port. This allows the use of the EMC Terminal
with either the eConnex adapter for a wired connection or with Bluetooth for a wireless connection,
making it easier to share RFD40 sleds between users.


By default, the RFD40's factory settings enabled the eConnex connectivity. The eConnex port can be
disabled by using the 123RFID utility, as shown below.


Users can still use the triggers on the RFD40 to operate the terminal's scanner, even when the sled is
docked in an eConnex adapter while using a Bluetooth connection.

#### **UI Indicators**


The sled presents multiple forms of feedback to inform the user of various device states. The sled
provides LED definitions for decode and battery status as well as beeper indications to indicate battery
charge progress.


18


Getting Started with the RFD40/RDF40-M

##### **LED Definitions**


The sled provides user feedback in the form of LED indications for decode, battery, Bluetooth, and Wi-Fi
states.


**Decode LED Definitions**


The following table outlines the context in which decode LED feedback is provided and the indication
that is presented for a given device state.


**NOTE:** The LED indicators on the sled differ from the LED indicators on the mobile computer
being used with the sled.


**Table 1** Decode LED Indicators

|Condition|Indication|
|---|---|
|Barcode Decode|Solid Green|
|Scan Error|Solid Red for two seconds.|
|RFID Decode|Solid Green|
|RFID Error|Solid Red for two seconds.|
|Read Error|Solid Red|



**Battery LED Definitions**


The following table outlines the context in which battery LED feedback is provided and the indication
that is presented for a given device state.


**Table 2** Battery LED Definitions While Charging







|Conditions|Indications|
|---|---|
|Charging|Amber (Blinking)|
|Battery Level Over 50%|Solid Green|
|Battery Level Over 20%|Solid Amber|
|Battery Level Under 10%|Solid Red|
|Battery Level Under 5% (entering Low Power<br>Mode)|No LED|
|Suspend/Low Power Mode|No LED|
|Fully Charged|Solid Green|
|Charging Error|Amber (Fast Blinking)|


**Bluetooth LED Definitions**


The following table outlines the context in which Bluetooth LED feedback is provided and the indication
that is presented for a given device state.


19


Getting Started with the RFD40/RDF40-M


**Table 3** Bluetooth LED Definitions

|Condition|Indication|
|---|---|
|Off|Off|
|On/Not Connected|Off|
|Discoverable|LED Blinking|
|Reconnect/Pairing in Process|LED Fast Blinking|
|Paired/Connected|Solid Blue|
|Out of Range|Off|



**Wi-Fi LED Definitions**


The following table outlines the context in which Wi-Fi LED feedback is provided and the indication that
is presented for a given device state.


**Table 4** Wi-Fi LED Definitions

|Condition|Indication|
|---|---|
|Connecting|Green (Blinking)|
|Connected|Green (Stays On)|
|Transmission Error/Out of Range|Red (Stays On)|


##### **Beeper Indications**


The sled provides user feedback in the form of beeper tones for decode, battery, Bluetooth, and Wi-Fi
states.


**Decode Beeper Indications**


The following table outlines the context in which beeper feedback is provided and the indication that is
presented for a specific decode event


**Table 5** Decode Beeper Indications

|Condition|Tone|
|---|---|
|Good Barcode Decode|Short high beep|
|Decode Transmission Error|Four long low beeps|
|Good RFID Decode|Short medium tone|
|RFID Error|Four long low beeps|
|Error Message (Other)|No beep|
|Sled Memory Full (Batch Mode)|Long tones for 5 seconds|



**Battery Beeper Indications**


The following table outlines the context in which decode LED feedback is provided and the indication
that is presented for a given device state.


20


Getting Started with the RFD40/RDF40-M


**Table 6** Battery Beeper Indications







|Condition|Tone|
|---|---|
|Battery Level Over 50%|No beep|
|Battery Level Over 20%|No beep|
|Battery Level Under 10%|No beep|
|Battery Level Under 5% (entering Low Power<br>Mode)|One beep|
|Suspend/Low Power Mode|Low/medium/high beeps|
|Fully Charged|One beep|
|Charging Error|Three beeps|


**Bluetooth Beeper Indications**


The following table outlines the context in which beeper feedback is provided and the indication that is
presented for a specific Bluetooth state.


**Table 7** Bluetooth Beeper Indications

|Condition|Tone|
|---|---|
|Off|No beep|
|On/Not Connected|No beep|
|Discoverable|No beep|
|Reconnect/Pairing in Process|No beep|
|Paired/Connected|Short Low/High beep|



**Wi-Fi Beeper Indications**


The following table outlines the context in which beeper feedback is provided and the indication that is
presented for specific Wi-Fi states.


**Table 8** Wi-Fi Beeper Indications

|Condition|Tone|
|---|---|
|On/Not Connected|No beep|
|On/Pairing in Process|No beep|
|On/Connected|Short/Low/High beep|
|Out of Range|Short/High/Low beep|
|Pairing Error|No beep|
|Off|No beep|



21


Getting Started with the RFD40/RDF40-M

##### **Trigger Mapping Modes**


The following table outlines the supported modes that can be mapped to the upper or lower trigger of
the RFID sled.


Access Trigger Mapping using 123RFID Mobile from the Settings menu. For additional information, visit
[zebra.com/123RFID.](https://www.zebra.com/us/en/support-downloads/software/demo/123rfid-mobile.html)


**Table 9** Mappable Trigger Modes

|Condition|Description|
|---|---|
|RFID Start/Stop|Start and stop RFID decode operations.|
|Sled Scanner|Barcode decode from the sled.|
|Terminal Scanner|Barcode decode from the mobile computer.<br>Feature support is determined by the mobile<br>computer being used with the sled.|
|Scan Notiﬁcation|Scan trigger press notiﬁcation.|
|No Action|No action when the trigger is pressed.|



22


Getting Started with the RFD40/RDF40-M

#### **Wireless and Connectivity Functionality**


The RFD40 Premium and Premium+ sleds integrated Wi-Fi 6 capability allows for easy over-theair (OTA) device management, while Bluetooth 5.3 and NFC tap-to-pair make it easier to connect to
current and future Zebra mobile computers and third-party smartphones.

##### **Wi-Fi Overview**


The RFD40 Premium and Premium+ sleds have advanced Wi-Fi 6 connectivity, supporting a range of
IEEE protocols including 802.11ax/ac/a/b/g/n, and IPv4 compatibility. This ensures efficient wireless
performance that is suitable for high-demand environments.


**Data Rates**


              - 5 GHz Band - Achieves PHY data rates up to 1.2 Gbps, providing high-speed connectivity for
demanding applications.


              - 2.4 GHz Band - Supports PHY data rates up to 458 Mbps, ensuring reliable performance in various
operational settings.


**Security Protocols**


**WARNING:** Users are responsible for configuring Wi-Fi security modes on RFD40 devices for
their own individual security requirements. To ensure compliance with the cybersecurity
requirements of the EU Radio Equipment Directive (RED) Article 3.3 (d), use secure settings
such as **WPA3 Standard**, **WPA3_Personal_SAE**, or **WPA3_Enterprise_GCMP_256_SUITEB_192** to protect
against security threats. Improper configuration may lead to vulnerabilities, and the
manufacturer is not liable for any resulting damages or breaches.


For more information about the implications of the EU Radio Equipment Directive (RED) for
the RFD40/90, refer to the RFD40 Product Reference Guide.


**NOTE:** Recommended Security Mode: General recommendation for wireless security is to use
the WPA3 Standard.


              - For **Personal Networks**, the preferred security mode is **WPA3_Personal_SAE** .


              - For **Enterprise-Grade Networks**, the preferred security mode is
**WPA3_Enterprise_GCMP_256_SUITEB_192**, which offers the highest level of security.


RFD40 supports WPA2/WPA3 Personal and WPA2/WPA3 Enterprise security modes.


23


Getting Started with the RFD40/RDF40-M


The following table outlines the supported protocols.



|Protocol|Description|Support|
|---|---|---|
|WPA2_Personal_CCMP|•<br>Uses the CCMP-128 AES<br>Encryption with PSK.<br>•<br>Hashing Algorithm used is<br>HMAC-SHA1.<br>•<br>802.11w for WPA2 Personal is<br>supported.|Supported|
|WPA3_Personal_SAE|•<br>Uses the CCMP-128 AES<br>Encryption with PSK (SAE).<br>•<br>Hashing Algorithm used is<br>HMAC-SHA256.|Supported|
|WPA2_Enterprise_CCMP|•<br>Uses the CCMP-128 AES<br>Encryption with PMK derived<br>from the EAP Authentication<br>exchange with RADIUS server.<br>•<br>Hashing Algorithm used is<br>HMAC-SHA1.<br>•<br>Protected Management Frames<br>(PMF) are optional.|Supported|
|WPA3_Enterprise_CCMP|•<br>Uses the CCMP-128 AES<br>Encryption with PMK derived<br>from the EAP Authentication<br>exchange with RADIUS server.<br>•<br>Hashing Algorithm used is<br>HMAC-SHA256.<br>•<br>Protected Management Frames<br>(PMF) are mandatory.|Supported|
|WPA3_Enterprise_GCMP_256_SHA256|•<br>Uses the GCMP-256 AES<br>Encryption with PMK derived<br>from the EAP Authentication<br>exchange with RADIUS server.<br>•<br>Hashing Algorithm used is<br>HMAC-SHA256.<br>•<br>Protected Management Frames<br>(PMF) are mandatory.|Supported|


24




Getting Started with the RFD40/RDF40-M



|Protocol|Description|Support|
|---|---|---|
|WPA3_Enterprise_GCMP_256_SUITEB_192|•<br>Uses the GCMP-256 AES<br>Encryption with PMK derived<br>from the EAP Authentication<br>exchange with RADIUS server.<br>•<br>Hashing Algorithm used is<br>HMAC-SHA384<br>•<br>Protected Management Frames<br>(PMF) are mandatory.|Supported|


These specifications emphasize the sled's capabilities to deliver high-speed, secure wireless
connectivity, making them ideal for modern IoT and enterprise applications.





As a headless device, these sleds use the 123RFID companion applications or applications developed
with the Zebra RFID SDK to configure Wi-Fi settings. These applications offer a set of options to
manage connectivity.


Refer to [Wi-Fi Confguration](https://docs.zebra.com/us/en/rfid/123rfid-desktop/c-123rfid-desktop-application-features/c-123rfid-desktop-online-reader-configuration/g-123rfid-desktop-fx75-network-settings/t-123rifd-desktop-wi-fi-configuration.html) in the 123RFID Desktop user guide for more details.

##### **Bluetooth Overview**


The RFD40 Premium and Premium+ sleds include Bluetooth 5.3 and offer enhanced connectivity,
efficiency, and durability. Key features include a high tag read rate, a wider read range, increased
battery capacity, and support for various Zebra mobile computers. Bluetooth 5.3 allows for easy pairing
with Zebra mobile computers and third-party devices.


[Different Bluetooth security features are offered in these sleds as per NIST.SP.800-121r2.pdf.](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-121r2.pdf)


           - Low Bluetooth Security (default) - The low security setting is designed for ease of connection
with most devices and minimal user interaction. It uses the Just Works secure and simple pairing
method with no Man-in-the-Middle (MITM) protection. It provides level 2 security (as per the Guide
to Bluetooth Security).


           - Medium Bluetooth Security - The medium security setting requires a passkey for the initial
connection to pair the scanner to the remote host unless using NFC Out-of-Band (OOB). It uses
the Passkey Entry secure and simple pairing method with MITM protection, which provides level 3
security (as per the Guide to Bluetooth Security).


           - High Bluetooth Security - The high security setting requires Secure Connections (AES-128) between
the sled (with scanner) and the remote host. A passkey must be scanned in unless using NFC OOB. It
provides level 4 security (as per the Guide to Bluetooth Security).

##### **Mobile Device Management Overview**


This section provides information about the supported Mobile Device Management (MDM) partners.


The RFD40 Premium and Premium+ sleds are designed to enhance Internet of Things (IoT) connectivity
by leveraging the Message Queuing Telemetry Transport (MQTT) protocol, accessed through a
predefined set of Application Programming Interfaces (API). This setup enables seamless integration
with various IoT solutions, optimizing both device and data management processes. The connectivity
provided by these devices supports real-time data exchange, efficient monitoring, and streamlined
operations within the IoT ecosystems.


25


Getting Started with the RFD40/RDF40-M


The partners involved in these IoT solutions are:


              - [42Gears - 42gears.com](https://www.42gears.com/blog/simplifying-rfid-management-suremdm-now-supports-zebra-rfd40-and-rfd90-sleds/)


              - [SOTI - soti.net](https://www.soti.net/resources/blog/2024/soti-connect-now-supports-zebra-rfid-sleds/)

#### **Performing a Factory Default Reset on the Sled**


The below function can be performed using a USB cable, cable cup or USB single slot cradles with a
PC:


**1.** Disconnect and remove the battery and power sources from the sled.


**2.** Connect the sled to a power source using a USB cable, cable cup, or cradle. Observe the flashing

battery LED.


**3.** Press and hold the upper trigger immediately within 5 seconds of connecting the sled to the power

source. Insert the battery into the device within 30 seconds of connecting the sled to the power
source.


**4.** Listen for the confirmation beep indicating that the factory default reset is about to begin and

release the trigger.


The sled reboots with a factory reset default configuration.

#### **Performing a Factory Reset By Scanning a Barcode**


**1.** Pull the trigger to scan the Restore Defaults barcode:


**2.** Allow the sled to reboot.


The default factory settings are in place when the sled powers back on.


**See Also**
Factory Reset
Saving an Online Configuration


26


### **Maintenance**

**Maintenance**


This chapter provides suggested sled maintenance, troubleshooting, and technical specifications.


**CAUTION:** Always wear eye protection. Read warning label on compressed air and alcohol
product before using. If you have to use any other solution for medical reasons please contact
Zebra for more information.


**WARNING:** Avoid exposing this product to contact with hot oil or other flammable liquids. If such
exposure occurs, unplug the device and clean the product immediately in accordance with
these guidelines.


**IMPORTANT:** Use pre-moistened wipes and do not allow liquid cleaner to pool. Ensure the
following items are addressed when using sodium hypochlorite (bleach) based cleaners:


              - For device only. Do not use on cradle.


              - Always follow the manufacturer’s recommended instructions: use gloves during application
and remove the residue afterwards with a damp cloth to avoid prolonged skin contact
while handling the device.


              - Due to the powerful oxidizing nature of sodium hypochlorite, the metal surfaces, including
electrical contacts on the device, are prone to oxidation (corrosion) when exposed to this
chemical in the liquid form (including wipes) and should be avoided. In the event that these
type of disinfectants come in contact with metal on the device, prompt removal with a
dampened cloth after the cleaning step is critical.


**IMPORTANT:** To avoid damage to the device, use only approved cleaning and disinfecting agents
listed below. The use of non-approved cleaning or disinfecting agents may void the warranty.

#### **Harmful Ingredients**


The following chemicals are known to damage the plastics on Zebra devices and should not come in
contact with the device:


              - Acetone


              - Ammonia solutions


              - Aqueous or alcoholic alkaline solutions


              - Aromatic and chlorinated hydrocarbons


              - Benzene


              - Carbolic acid


27


Maintenance


              - Compounds of amines or ammonia


              - Ethanolamine


              - Ethers


              - Ketones


              - TB-lysoform


              - Toluene


              - Trichloroethylene.

#### **Approved Cleaners**


The following solutions are approved for cleaning the sled.


              - Isopropyl alcohol 70% (including wipes)


              - 10% Bleach (Sodium Hypochlorite 0.55%) and 90% Water solution


              - 3% Hydrogen Peroxide and 97% Water solution


              - Mild dish soap.

#### **Cleaning the Sled**


Routinely cleaning the exit window is required. A dirty window may affect scanning accuracy. Do not
allow any abrasive material to touch the window.


To clean the device:


**1.** Dampen a soft cloth with one of the approved cleaning agents listed above or use pre-moistened
wipes.


**2.** Gently wipe all surfaces, including the front, back, sides, top and bottom. Never apply liquid directly

to the device. Be careful not to let liquid pool around the device window, trigger, cable connector or
any other area on the device.


**3.** Be sure to clean the trigger and in between the trigger and the housing (use a cotton-tipped

applicator to reach tight or inaccessible areas).


**4.** Do not spray water or other cleaning liquids directly into the exit window.


**5.** Wipe the device exit window with a lens tissue or other material suitable for cleaning optical material

such as eyeglasses.


**6.** Immediately dry the device window after cleaning with a soft non-abrasive cloth to prevent

streaking.


**7.** Allow the unit to air dry before use.


**8.** Connectors:


                 - Dip the cotton portion of a cotton-tipped applicator in isopropyl alcohol.


                 - Rub the cotton portion of the cotton-tipped applicator back-and-forth across the connector on
the Zebra sled at least 3 times. Do not leave any cotton residue on the connector.


                 - Use the cotton-tipped applicator dipped in alcohol to remove any grease and dirt near the
connector area.


28


Maintenance


- Use a dry cotton tipped applicator and rub the cotton portion of the cotton-tipped applicator
back-and-forth across the connectors at least 3 times. Do not leave any cotton residue on the
connectors.


29


### **Technical Specifications**

**Technical Specifications**


The following table outlines the physical characteristics and user environment of the RFD40 RFID
Premium/Premium+ sled.


**Table 10** RFD40 RFID Premium/Premium+ Technical Specifications

|Item|Description|
|---|---|
|**Physical Characteristics**|**Physical Characteristics**|
|Dimensions|Height: 15.6 cm (5.94 in.)<br>Width: 8.4 cm (3.3 in.)<br>Length: 16.6 cm (6.5 in.)|
|Weight|Premium: ~18.8 oz./~544 grams (sled with<br>battery)<br>Premium+: ~19.4 oz./~550 grams (sled with<br>battery)|
|Power|PowerPrecision+ 7000 mAh Li-Ion battery|
|Frequency Range/RF Output|US: 902-928 MHz; 0 - 30 dBm (EIRP)<br>EU: 865-868 MHz; 0 - 30 dBm (EIRP)<br>Japan: 916-921 MHz (w LBT); 0 - 30 dBm (EIRP)|
|**User Environment**|**User Environment**|
|Operating Temperature|-10°C to 50°C (14°F to 122°F)|
|Storage Temperature|-40°C to 70°C (-40°F to 158°F)|
|Charging Temperature|0°C to 40°C (32°F to 104°F)|
|Relative Humidity|Operating: 5 to 85% non-condensing|
|Sealing|IP54|
|Drop Speciﬁcation|Multiple 5 ft./1.8 m drops onto concrete|
|Tumble Speciﬁcation|500 1/2 meter tumble cycles (1000 drops) at<br>20°C|
|Electrostatic Discharge|± 15 kV air discharge<br>± 8 kV direct discharge<br>± 8 kV indirect discharge|



30


Technical Specifications


**Table 11** RFD40-M Premium Plus Technical Specifications

|Item|Description|
|---|---|
|**Physical Characteristics**|**Physical Characteristics**|
|Dimensions|Height: 15.6 cm (6.14 in.)<br>Width: 8.4 cm (3.31 in.)<br>Length: 17.5 cm (6.89 in.)|
|Weight|Premium+: ~19.6 oz./~556 grams (sled with<br>battery)|
|Power|PowerPrecision+ 7000 mAh Li-Ion battery|
|Frequency Range/RF Output|US: 902-928 MHz; 4 - 34 dBm (EIRP)<br>EU: 865-868 MHz; 1.85 - 31.85 dBm (ERP)<br>EU: 916.3, 917.5, 918.7 MHz; 1.85 - 31.85 dBm (ERP)<br>Japan: 916-921 MHz (w LBT); 4 - 34 dBm (EIRP)|
|**User Environment**|**User Environment**|
|Operating Temperature|-10°C to 50°C (14°F to 122°F)|
|Storage Temperature|-40°C to 70°C (-40°F to 158°F)|
|Charging Temperature|0°C to 40°C (32°F to 104°F)|
|Relative Humidity|Operating: 5 to 85% non-condensing|
|Sealing|IP54|
|Drop Speciﬁcation|Multiple 5 ft./1.5 m drops onto concrete|
|Tumble Speciﬁcation|500 cycles (1000 hits, 1.6 ft./0.5 m) at room<br>temperature|
|Electrostatic Discharge|± 15 kV air discharge<br>± 8 kV direct discharge<br>± 8 kVdc indirect discharge|



31


### **Compliance and Implications of EU** **RED for the RFD40/RFD40-M**

**Compliance and Implications of EU RED for the RFD40/RFD40-M**


This chapter provides detailed information on the definition of BS EN 18031-1 and the EU Radio
Equipment Directive (RED). It also addresses the compliance and implications for RFD40 devices.

#### **About BS EN 18031-1 & The EU Radio Equipment Directive (RED)**


BS EN 18031-1 is a technical standard that provides a detailed cybersecurity checklist for any "internetconnected radio equipment" sold in the EU.


It was created to enforce the EU's Radio Equipment Directive (RED), which made cybersecurity a
mandatory legal requirement for these devices. The standard translates the broad legal goal of "not
harming the network" into specific, testable engineering requirements.


For manufacturers, complying with this standard provides a **"presumption of conformity"** . It means their
product is legally presumed to meet the cybersecurity obligations of the RED, which is essential for
placing the CE mark on the product and selling it in the EU market.

##### **Applicability of BS EN 18031-1 for the RFD40 Sled**


The RFD40 sled is subject to this standard. It contains Wi-Fi and Bluetooth radios, and it is designed to
be internet-connected, placing it directly in the scope of the RED cybersecurity regulation. Compliance
is a mandatory requirement for market access.


**Security is Based on "Environmental Controls"**


The key to the RFD40/90's compliance strategy is that it is an enterprise device, not a standalone
consumer product. Its security model relies heavily on its intended operational environment. The
standard is designed to accommodate this through its "except for" clauses.


**How Compliance is Justified**


              - **Access Control (ACM) & Authentication (AUM)**


To view/modify any sensitive security parameters listed below, the user needs to enter a valid
authorization password.


                 - Endpoint configuration


                 - Active endpoint configuration


                 - Endpoint names


                 - configuration


                 - Certificate configuration


32


Compliance and Implications of EU RED for the RFD40/RFD40-M


                 - NTP server details


                 - Sled time


                 - Bluetooth Security level


              - **Secure Communication (SCM)**


This is applicable because Wi-Fi & Bluetooth are wireless. The sled **PASSES** by implementing strong,
authenticated encryption protocols such as **WPA2**, **WPA3**, and **Bluetooth 5.1** standards.


              - **Best Practice Cryptography (CRY)**


This is applicable. The sled **PASSES** by demonstrating that its WPA3 modes are the "best practice",
while its older WPA2 modes are included as a "justified deviation for interoperability" to support
legacy enterprise networks.


The standard provides the mandatory rulebook, and Zebra justifies the RFD40/90's compliance by
demonstrating how it meets those rules. Either directly on the device or through the mandatory security
of the host computer and the operating environment.

#### **Applicability of BS EN 18031-1**


Currently, the changes related to BS EN 18031-1 are applicable only to European Union countries that
adhere to the BS EN 18031-1 standards. For a comprehensive list of these countries, refer to Annexure 1.

#### **Parameters Protected by Authorization Password**


As per the principles of BS EN 18031-1, the protected parameters are as follows:


              - Configuration – Includes SSID, Security Type (WPA2/WPA3), Pre-Shared Keys (Passwords), and
Enterprise Credentials (usernames, passwords, and certificates for 802.1X).


              - NTP Server Details – Includes information about the time server URL, from which the device
retrieves updated time.


              - Bluetooth Security Level - These levels correspond to different security protections against attacks,
such as Man-in-the-Middle and DDoS.


              - IOT Endpoint configuration includes MQTT broker address, port, username, password, endpoint
name, and certificates.


              - Sled Time – RFD40 does not include RTC, the authorized user can update time using 123RFID tools/
SDK, or the Same will be updated using NTP.


              - Bluetooth Security Level - These levels correspond to different security protections against attacks
such as Man-in-the-Middle and DDoS.


              - Authorization Password – Password used for device authorization.

##### **Default Authorization Password & Update**


Users can connect to the sled and perform basic operations, such as setting the region, performing
inventory, scanning operations, and more. Without authorization, a password is required to view or
modify sensitive security & network assets authorization.


By default, the authorization password is set to “ _zebraRfid@1111_ ”, which needs to be changed before
accessing any of the listed protected parameters. The user can utilize the Change Password option to
change the default password.


33


Compliance and Implications of EU RED for the RFD40/RFD40-M


After changing the password, the user can use the Login option for authorization.

##### **About the Authorization Session & Password Criteria**


           - RFD40 sleds admin login session expires after 10 minutes if there is no user activity.


             - The desktop application maintains probes for IoT status, Wi-Fi status, and battery status when the
application is on the READ page and the Communication page, which keeps the authorization
session active.


           - If there is any interface change (Connect/disconnect USB, switch between USB/eConnex/
Bluetooth), then the login session expires.


           - The brute force mechanism is in place as follows:


             - Allow up to five incorrect login sessions.


             - After the sixth unsuccessful login attempt, each subsequent attempt will be delayed by 30
seconds.


             - The password must contain one uppercase letter, one lowercase letter, one special character, and
one numeric value.

##### **Bluetooth Settings**


The Bluetooth settings remain unchanged for regions that do not adhere to the 10831-1 standards.
However, in regions where compliance with the 10831-1 norms is mandatory, the default Bluetooth
security level is automatically set to ' **User Authorization** '. In this mode, when the user initiates pairing from the
mobile terminal, they must press the upper trigger on the Sled within 15 seconds to complete the pairing
process. If the trigger is not pressed within the specified time, the pairing attempt will fail.


This requirement ensures physical intervention, aligning with the 10831-1 compliance standards.


The different security levels are as follows:


**1.** Low - Only works in pairing mode without any authorization.


**2.** Medium - With a numeric pass key, users must scan numeric codes using the sled scanner

(applicable only to sleds with scanner support).


34


Compliance and Implications of EU RED for the RFD40/RFD40-M


**3.** High – With a numeric pass key, users need to scan a numeric code using the sled scanner

(applicable only to sleds with scanner support).


**4.** User Authorization – Only works with the upper trigger press to confirm the pairing request from a

Bluetooth terminal.

##### **Wi-Fi Settings**


The wi-fi settings remain unchanged for regions that do not adhere to the 10831-1 standards. However,
in regions where compliance with the 10831-1 norms is mandatory, users need to enter authorization
passwords to view or configure the wi-fi profiles.

##### **IoT Endpoint Configuration**


The IoT endpoint configurations remain unchanged for regions that do not adhere to the 10831-1
standards. However, in regions where compliance with the 10831-1 norms is mandatory, users need to
enter authorization passwords to view or configure the IoT endpoint configuration.

##### **Certificate Management**


The certificate management remains unchanged for regions that do not adhere to the 10831-1
standards. However, in regions where compliance with the 10831-1 norms is mandatory, users need to
enter authorization passwords to view, modify, or delete certificates.

##### **Firmware & Configuration file Update**


The firmware and configuration file update process remains unchanged for regions that do not adhere
to the 10831-1 standards. However, in regions where compliance with the 10831-1 norms is mandatory,
users need to enter authorization passwords to perform a firmware update.


Example:


35


Compliance and Implications of EU RED for the RFD40/RFD40-M

#### **Device Authorization Using Authorization Password**


If the user tries to access the protected parameters, then RFD40 sled reports an authorization error. In
the 123RFID application, the authorization password prompt will be displayed as shown below.


To view wi-fi status


To view configured endpoints


36


Compliance and Implications of EU RED for the RFD40/RFD40-M


Users can enter the authorization password when they have an authorization password prompt, or can
log in directly using the login option, as shown below.

#### **Impact on IoT Connectivity**


The IoT endpoint configurations remain unchanged in regions that do not require adherence to the
10831-1 standards. However, in regions where compliance with the 10831-1 norms is mandatory, users
must provide authorization passwords to access or modify the IoT endpoint configurations.


The IoT APIs and their functionality remain unaffected because the IoT system employs secure TLS/
MTLS-based connections, ensuring that the communication channel is secure and fully compliant with
the 10831-1 standards.


37


Compliance and Implications of EU RED for the RFD40/RFD40-M

#### **Impact on Current Applications & Best Migration Approaches**


The authorization password is mandatory in regions where compliance with the 10831-1 norms is
mandatory. Users in these regions are impacted by 108131-1 related sled firmware & SDK/Tools related
changes.


**NOTE:** This is based on the consideration that the firmware update is performed from 007-R00
onwards.

##### **Suggested Migration Approaches**


The following are the suggested approaches to adopt to new changes.


              - If the Sled's Wi-Fi, Bluetooth, Certificates, or IoT features are not utilized:


                 - No impact, users can still use older applications as it is.


                 - Bluetooth pairing needs a user authorization (Upper trigger press confirmation for new pairing –
Refer to Bluetooth settings section).


              - For firmware update or loading configuration file, use the following flow:


                 - Change default authorization password (one-time process).


                 - using the new updated authorization password.


                 - Perform a firmware update or load the configuration file.


              - Sled's Wi-Fi, Bluetooth, certificates, or IoT features are used:


                 - Change default authorization password (one-time process).


                 - Connect to the sled and log in using the new, updated authorization password, or perform an
admin connection to the sled.


                 - Bluetooth pairing needs a user authorization (Upper trigger press confirmation for new pairing –
Refer to Bluetooth settings section).


**NOTE:** For details, refer to SDK & Tools/API documentation:


**1.** [123RFID Desktop Guide](https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html#Ta-item-e0db3cabd0-tab)


**2.** [123RFID Mobile Guide](https://www.zebra.com/ap/en/support-downloads/software/rfid-software/123rfid-mobile.html#Ta-item-085b329d72-tab)

#### **Annexure 1**


The following is the list of European Union countries where BS EN 18031-1 standards are applicable.







|SL NO|EU RED Country list|WR SKU with<br>900M Support|E8 SKU Support|Remarks|
|---|---|---|---|---|
|1|Austria|Yes|Yes||
|2|Belgium|Yes|Yes||
|3|Bulgaria|Yes|Yes||
|4|Croatia|Yes|Yes||
|5|Cyprus|Yes|Yes||
|6|Czech Republic|Yes|Yes||


38


Compliance and Implications of EU RED for the RFD40/RFD40-M







|SL NO|EU RED Country list|WR SKU with<br>900M Support|E8 SKU Support|Remarks|
|---|---|---|---|---|
|7|Denmark|Yes|Yes||
|8|Estonia|Yes|Yes||
|9|Finland|Yes|Yes||
|10|France|Yes|Yes||
|11|Germany|No|Yes||
|12|Greece|No|Yes||
|13|Hungary|Yes|Yes||
|14|Iceland|Yes|Yes||
|15|Ireland|Yes|Yes||
|16|Italy|No|Yes||
|17|Latvia|Yes|Yes||
|18|Liechtenstein|Yes|Yes||
|19|Lithuania|Yes|Yes||
|20|Luxembourg|No|Yes||
|21|Malta|No|Yes||
|22|Netherlands|No|Yes||
|23|Norway|Yes|Yes||
|24|Poland|No|Yes||
|25|Portugal|Yes|Yes||
|26|Romania|Yes|Yes||
|27|Slovakia|Yes|Yes||
|28|Slovenia|Yes|Yes||
|29|Spain|Yes|Yes||
|30|Sweden|Yes|Yes||
|31|Switzerland|Yes|Yes||
|32|Turkeye|No|Yes||
|33|Albania|No|Yes||
|34|Andorra|No|Yes||
|35|Bosnia Herzegovina|No|Yes||
|36|French Guiana|No|Yes||
|37|Georgia|No|Yes||
|38|Guadeloupe|No|Yes||
|39|Macedonia|No|Yes||
|40|Martinique|No|No|Not supported by RFD40|
|41|Monaco|No|Yes||


39


Compliance and Implications of EU RED for the RFD40/RFD40-M







|SL NO|EU RED Country list|WR SKU with<br>900M Support|E8 SKU Support|Remarks|
|---|---|---|---|---|
|42|Montenegro|No|Yes||
|43|Reunion Isl.|No|No|Not supported by RFD40|
|44|San Marino|No|No|Not supported by RFD40|
|45|Sao Tome and Principe|No|No|Not supported by RFD40|
|46|St Pierre & Miquelon|No|No|Not supported by RFD40|
|47|Vatican City|No|No|Not supported by RFD40|


40


### **Troubleshooting**

**Troubleshooting**


The following table outlines possible troubleshooting cases when using the sled related to data
communication, barcode decode, and Bluetooth.


**Table 12** Troubleshooting the RFD40







|Problem|Cause|Solution|
|---|---|---|
|The RFID sled does not read<br>tags.|The RF region conﬁguration is<br>not set.|Use the 123RFID Desktop or<br>123RFDID Mobile application<br>to set the regulatory region<br>or country operation per the<br>application instructions.|
|The RFID sled is attached<br>to the mobile device and is<br>not responsive to an RFID<br>application, even after the<br>trigger is pressed.|The battery is too low and not<br>able to power the RFID sled.|Press the trigger for a few<br>seconds to power the RFID sled<br>On. The RFID sled LED blinks<br>amber when it is turned On. (By<br>default, pressing the trigger<br>turns On the RFID sled if it is in<br>Off mode. However, the RFID<br>sled can be disabled, in which<br>case this step is unnecessary.)<br>Place the RFID sled in the<br>charging cradle. The RFID sled<br>blinks amber LEDs, indicating<br>charging has commenced.|
|The RFID sled is attached<br>to the mobile device and is<br>not responsive to an RFID<br>application, even after the<br>trigger is pressed.|The zebra-supported mobile<br>computer is not inserted<br>correctly in the RFID Sled.|Reinsert the Zebra-supported<br>mobile device securely in the<br>RFID sled and ensure the USB<br>cable is correctly inserted.|
|The RFID sled is attached<br>to the mobile device and is<br>not responsive to an RFID<br>application, even after the<br>trigger is pressed.|Damaged battery.|If the RFD40 RFID sled LED<br>does not blink amber after<br>sitting on the charging cradle,<br>request the service to replace<br>the battery.|
|The RFID40 sled is responsive<br>but cannot read tags.|The battery is critically low.|Place the RFID sled in the<br>charging cradle. The RFID Sled<br>LED blinks amber. The RFID<br>sled can be used when its LED<br>turns on momentarily amber or<br>green upon removal from the<br>charging cradle.|


41




Troubleshooting


**Table 12** Troubleshooting the RFD40 (Continued)

































|Problem|Cause|Solution|
|---|---|---|
|The RFD40 RFID sled LED<br>blinks fast amber when in the<br>cradle.|Charging error.|Restart charging by removing<br>the RFID sled from the cradle<br>and inserting it back into it.<br>If the issue persists, request<br>service to replace the battery.|
|The RFID sled LED blinks red, or<br>LED blinks red alternating with<br>green or amber while in use (not<br>while charging).|Battery end-of-life indication.|Request service to replace the<br>battery.|
|Zebra-supported mobile<br>computer battery is not<br>charging.|The charging cradle was<br>unplugged from AC power.|Ensure the charging cradle is<br>receiving power.|
||The Zebra-supported mobile<br>computer is not fully seated in<br>the cradle.|Remove and reinsert the zebra-<br>supported mobile computer into<br>the cradle, ensuring it is ﬁrmly<br>seated in the charging cradle.|
|**Data Communication**|**Data Communication**|**Data Communication**|
|During data communication<br>with a host computer, no data<br>transmitted or transmitted data<br>was incomplete.|Sled removed from cradle<br>during communication.|Replace the sled in the cradle<br>and re-transmit.|
|During data communication<br>with a host computer, no data<br>transmitted or transmitted data<br>was incomplete.|Incorrect cable conﬁguration.|See the system administrator.|
|During data communication<br>with a host computer, no data<br>transmitted or transmitted data<br>was incomplete.|Communication software<br>was incorrectly installed or<br>conﬁgured.|Perform setup.|
|During data communication<br>over Wi-Fi, no data was<br>transmitted, or transmitted data<br>was incomplete.|The Wi-Fi radio is not on.|Turn on the Wi-Fi radio.|
|During data communication<br>over Wi-Fi, no data was<br>transmitted, or transmitted data<br>was incomplete.|The user moved out of the<br>range of an access point.|Move closer to an access point.|
|During data communication<br>over Bluetooth, no data<br>transmitted or transmitted data<br>was incomplete.|The Bluetooth radio is not on.|Turn on the Bluetooth radio.|
||You moved out of range of<br>another Bluetooth device.|Move within 10 meters (32.8<br>feet) of the other device.|
|**Decode**|**Decode**|**Decode**|
|The sled does not decode with<br>a reading barcode.|The scanning application is not<br>loaded.|Load 123RFID Mobile on the<br>device or 123RFID Desktop<br>on the PC. See the system<br>administrator.|
|The sled does not decode with<br>a reading barcode.|Unreadable barcode.|Ensure the symbol is not<br>defaced.|
|The sled does not decode with<br>a reading barcode.|The distance between the<br>exit window and barcode is<br>incorrect.|Place the device within the<br>proper scanning range.|
|The sled does not decode with<br>a reading barcode.|The device is not programmed<br>to generate a beep.|If the sled does not beep<br>on a good decode, set the<br>application to generate a beep<br>on a good decode.|


42




Troubleshooting


**Table 12** Troubleshooting the RFD40 (Continued)





|Problem|Cause|Solution|
|---|---|---|
||The battery is low.|Check the battery level if the<br>sled stops emitting a laser beam<br>upon a trigger press. When the<br>battery is low, the sled shuts off<br>before the low battery condition<br>notiﬁcation.|
|**Bluetooth**|**Bluetooth**|**Bluetooth**|
|The device cannot ﬁnd any<br>Bluetooth devices nearby.|Too far from other Bluetooth<br>devices.|Move closer to the other<br>Bluetooth device(s) within a<br>range of 10 meters (32.8 feet).|
|The device cannot ﬁnd any<br>Bluetooth devices nearby.|The Bluetooth device(s) nearby<br>are not turned on.|Turn on the Bluetooth device(s)<br>to ﬁnd.|
|The device cannot ﬁnd any<br>Bluetooth devices nearby.|The Bluetooth device(s) are not<br>in discoverable mode.|Set the Bluetooth device(s) to<br>discoverable mode.|


43




www.zebra.com


