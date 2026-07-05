#### Explore Advanced Windows Development for RFID Readers and POS Integration

**Suresh Ramamoorthy**

Senior Manager
Software Engineering


Advanced Location
Technologies


## Agenda

ZEBRA TECHNOLOGIES


#### Agenda
##### RFID Windows Development

**1** **SDK/Tools**


        - Architecture


        - Windows

       - RFID .NET SDK

       - 123RFID Desktop


        - JPOS

       - RFID Scanner Driver

      - Demo App


**2** **New Products**


        - FXP20 POS Reader

        - RFID Accessory for ET6xW


**3** **Technical Resources**


**4** **Best Practices**


ZEBRA TECHNOLOGIES


## SDK/Tools

ZEBRA TECHNOLOGIES


#### RFID System
##### Physical View

###### Identify and track objects wirelessly. Operates at a frequency of 860-930 MHz (Ultra High Frequency). Read range up to 20 meters












|Col1|Col2|Col3|Col4|Col5|Col6|Col7|Col8|Col9|
|---|---|---|---|---|---|---|---|---|
|Manages and Controls the reader for<br>reading tags orprogrammingtag.<br>Computer, Server or Cloud<br>based platform|Manages and Controls the reader for<br>reading tags orprogrammingtag.<br>Computer, Server or Cloud<br>based platform|Transmitting the radio frequency to<br>activate the tag for receiving,<br>decoding/encoding the tag|Transmitting the radio frequency to<br>activate the tag for receiving,<br>decoding/encoding the tag|Transmitting the radio frequency<br>to the tag andreceiving data from<br>the tag<br>Polarization<br>Linear Tag placement is known<br>Circular Placement of tag is<br>unpredictablec|Transmitting the radio frequency<br>to the tag andreceiving data from<br>the tag<br>Polarization<br>Linear Tag placement is known<br>Circular Placement of tag is<br>unpredictablec|Attached to theasset / itembeing<br>tracked<br>Contain Microchip and antenna<br>Types:<br>Passive: Rely energy from reader.<br>Less expensive. Reading range up<br>to 20m<br>Active: Tags have an internal power<br>source (battery) for longer distance.<br>(up to 100m reading range)|Attached to theasset / itembeing<br>tracked<br>Contain Microchip and antenna<br>Types:<br>Passive: Rely energy from reader.<br>Less expensive. Reading range up<br>to 20m<br>Active: Tags have an internal power<br>source (battery) for longer distance.<br>(up to 100m reading range)|RFID Standards (GS1)<br>EPC UHF Gen2 Air interface<br>Protocol<br>Physical and logical requirements<br>for an RFID System<br>https://www.gs1.org/standards/rfid/<br>uhf-air-interface-protocol|



Images Source: Avery Dennison,
https://rfid.averydennison.com/en/home/explore-rfid/rfid-technology-basics.html


ZEBRA TECHNOLOGIES


#### RFID Tag
##### Logical View






- **Reserved** :


  - Kill (1st and 2nd word)


  - access passwords (3rd and 4th word)


- **EPC** : Identifies the asset/item beginning from 4th byte or 2nd
word


- **TID:** Tag manufacturer specific information (Tag Model, serial
number). Perma Locked during tag manufacturing.


- **USER** : Allows user-specific data storage.


- **Tag States**


  - **Sessions** : Tag support four sessions. Tag participate in one and
only session during inventory round. Inventoried flag can be A or B.




                                                 - **Select Flag** : SL flag can be asserted or deasserted

|Memory Bank|USER (optional<br>TID<br>EPC<br>RESERVED|Col3|Col4|Col5|Col6|
|---|---|---|---|---|---|
|Target<br>Inventoried Flag<br>Default<br>Persistence|**Sessions **<br> <br>|**Sessions **<br> <br>|**Sessions **<br> <br>|**Sessions **<br> <br>|**Select Flag**|
|Target<br>Inventoried Flag<br>Default<br>Persistence|**Sessions **<br> <br>|**500ms to 5s**<br>**S1**<br>**A **<br>**500ms to 5s**|**2s**<br>**S2**<br>**A **<br>**Indefinite**|**2s**<br>**S3**<br>**A **<br>**Indefinite**|**2s**<br>**SL Flag**<br>**Deasserted**<br>**Indefinite**|



ZEBRA TECHNOLOGIES


#### Manage Tag Population
##### C1G2 Standard


|Action|Matching|Non-Matching|
|---|---|---|
|**0**|assert SL or inventoried -> A|deassert SL or inventoried -> B|
|**1**|Assert SL or inventoried -> A|do nothing|
|**2**|do nothing|deassert SL or inventoried -> B|
|**3**|negate SL or (A->B, B->A)|do nothing|
|**4**|assert SL or inventoried -> B|deassert SL or inventoried -> A|
|**5**|assert SL or inventoried -> B|do nothing|
|**6**|do nothing|assert SL or inventoried -> A|
|**7**|do nothing|negate SL or A -> B, B->A)|



**Select Tags Matching with EPC “3074”**
Target: S0, Action: 4
Mem Bank: EPC
Start Location: 32
Length: 16
Mask: “3074”







**Selects the tag population**

- Target indicates whether Tag’s SL or inventoried flag

- Action indicates whether matching tags

  - modify SL (Assert SL or Deassert SL)or inventoried flag
(A or B)

- Memory Bank (EPC, TID or User Memory)

- Start Location, Length, Mask (bit string that tag compares)


**Determines which tags to be participated**

- Sel - which tags to respond based on SL flag

0: ALL, 1: ALL, 2: ~SL, 3: SL

- Session - choose the session for the inventory round.

0: S0, 1: S1, 2: S2, 3: S3

- Target (inventoried flag)

0: A, 1: B
Q - Tag population in the range of antenna.


**Access commands**

- Read – Reads memory bank

- Write – Writes memory bank

0-Reserved, 1-EPC, 2-TID, 3-User

- Kill – Permanently disable the tag (Kill password)

- Lock – Access/Kill Password (Prevent read/write),

Individual memory banks (prevent write),
Permalock lock status password or memory bank







**Inventory (Singulation)**
Sel: 0
Session S0
Target: B
Q: 8



ZEBRA TECHNOLOGIES


#### 3C Framework









ZEBRA TECHNOLOGIES


#### RFID API
##### Structure

ZEBRA TECHNOLOGIES


## Windows SDK/Tool

ZEBRA TECHNOLOGIES


#### RFID Windows SDK
##### Architecture





30 Short range
90 Long Range



ET60W Wi-Fi ET65W WAN FXP20


USB/Bluetooth: Serial
Ethernet: TCP/IP





RFD40
Premium+



RFD40
Standard



RFD40
Premium



ZEBRA TECHNOLOGIES


#### RFID Handheld Reader SDK
##### Windows


  - RFID Handheld Reader SDK for Windows

  - Same SDK that supports handheld RFID readers (RFD40/90, RFD8500, ET6xW, FXP20)

  - Tools

  - 123RFID Desktop - GUI based Demo Tool

  - Prerequisites

  - Host Platform: Microsoft Windows 11 64-bit and above

  - Microsoft .NET Framework: 4.8 for Windows

  - Visual Studio

  - Release Package

  - Demo App: Windows.RFID.DemoApp_3.0.33.zip

  - Demo Source: Windows.Desktop.DemoApp.Src_v3.0.33.zip

  - RFID SDK: Windows.RFID.SDK_3.0.33.zip. Includes Libraries and config files are to be added in the project.


ZEBRA TECHNOLOGIES


#### RFID .NET SDK
##### Generic Reader



|Connect|Configure|Control|
|---|---|---|
|Discover & Connect<br>-<br>Create Reader Instance<br>-<br>Transport: USB<br>-<br>ReaderType.FXP<br>-<br>**Connect**()|Settings<br>-<br>Antenna (Power, Pre-filter,<br>Singulation, RF Mode)<br>Configurations.Antennas[index].<br>**Configuration** (getter/setter)<br>TransmitPowerIndex<br>RFMode<br>SingulationControl<br>Setup Event Streaming using .NET event<br>handler (+=)<br>-<br>Read Notification<br>-<br>Status Notification<br>Profiles (ET6xW)<br>-<br>Configurations.**GetRFIDProfiles()**<br>-<br>Configurations.**SetRFIDProfile**(Profi<br>le)|Reading Tags<br>-<br>Read tags (Start/Stop Conditions)<br>-<br>Inventory.**Perform**()<br>-<br>Continuous Read<br>-<br>Inventory.**Perform**(), Inventory.**Stop**()<br>Tag Queue<br>-<br>Inventory.**GetReadTags**(Number of tags)<br>Programming Tag (Set Tag ID, data, password as properties)<br>Write a Tag<br>-<br>AccessOperations.TagWrite.**Write**()<br>Lock a Tag<br>-<br>AccessOperation.TagLock.**Lock**()<br>Kill a Tag<br>-<br>AccessOperation.TagKill.**Kill**()<br>Events<br>-<br>TagDataReceived, InventoryStarted, InventoryStopped<br>Disconnect<br>-<br>**Disconnect**()|


ZEBRA TECHNOLOGIES






#### RFID .NET SDK
##### Reader Management



|Connect|Configure|Control|
|---|---|---|
|Discover & Connect<br>-<br>Create Reader Instance<br>-<br>Transport: USB<br>-<br>ReaderType.FXP<br>-<br>**Connect**()|Region (Persistent)<br>-<br>Configurations.**RegulatoryConfig**<br>(getter/setter)<br>-<br>**Region**<br>-<br>**Hopping**<br>-<br>**Channels**<br>Setup Event Streaming<br>•<br>**N/A**|Monitor<br>-<br>**N/A**<br>Software Update<br>-<br>**SoftwareUpdate.Update** (firmwareFileName)<br>-<br>Poll Update progress status<br>-<br>SoftwareUpdate.UpdateStatus.**Percentage**<br>-<br>SoftwareUpdate.UpdateStatus.**UpdateInfo**<br>Factory Reset<br>-<br>**ResetFactoryDefaults**()<br>Disconnect<br>-<br>**Disconnect**()|


ZEBRA TECHNOLOGIES






Read Tags Demo

```
     using Symbol.RFID.SDK.Domain.Reader;

     using Symbol.RFID.SDK;

     using System.Collections.Generic;

     using System;

     using System.Linq;

     using System.Threading;

     //CONNECT: Discover and connect to the reader

     Console.WriteLine("Finding readers....");

     //Initialize reader management and reader info list.

     var readerInfoList = new List<IRfidReaderInfo>();

     var readerManager = RfidSdk.ReaderManagementServicesFactory.Create(ReaderCommunicationMode.USB);

     //get available readers list

     readerInfoList = readerManager.GetReaders(ReaderSearchOptions.AllReaders);

     foreach (IRfidReaderInfo readerInfo in readerInfoList.OrderBy(o => o.FriendlyName))

     {

      //create reader instance based on reader information.

       var reader = RfidSdk.RfidReaderFactory.Create(readerInfo);

       Console.WriteLine("Found reader:-"+ reader.FriendlyName);

       readerList.Add(reader);

     }

     if(readerList!=null && readerList.Count>0)

     {

       var fxp20Reader=readerList.FirstOrDefault(ee=>ee.ReaderType==ReaderType.FXP);

       if(fxp20Reader!=null)

      {

           Console.WriteLine("Connecting FXP20 reader-" + fxp20Reader.FriendlyName);

           fxp20Reader.Connect();

           Console.WriteLine("Connected-"+ fxp20Reader.FriendlyName+ "\n");

     }

     }
```

ZEBRA TECHNOLOGIES


```
// CONFIG: Setup Events

fxp20Reader.Inventory.AttachTagDataWithTagDataReceivedEvent = false;

//register for events

fxp20Reader.Inventory.InventoryStarted += Inventory_InventoryStarted;

fxp20Reader.Inventory.InventoryStopped += Inventory_InventoryStopped;

// CONTROL: Read tags for 2s

Console.WriteLine("Performing Inventory for 2 sec...");

//perform Inventory for 2 sec

fxp20Reader.Inventory.Perform();

Thread.Sleep(2000);

//stop Inventory

fxp20Reader.Inventory.Stop();

// read tags

var tagDataArr = fxp20Reader.Inventory.GetReadTags(1000);

foreach (ITagData dataReceived in tagDataArr)

  Console.WriteLine("Tag ID:"+ dataReceived.EPCId);

// Disconnect reader

fxp20Reader.Disconnect();

// Event Notifications

private static void Inventory_InventoryStarted(object sender, EventArgs e)

  Console.WriteLine("Event: Inventory started.\n");

private static void Inventory_InventoryStopped(object sender, EventArgs e)

  Console.WriteLine("Event: Inventory stopped.\n");

```

#### 123RFID Desktop
##### Demo

ZEBRA TECHNOLOGIES


## JPOS Driver for FXP20

ZEBRA TECHNOLOGIES


#### POS Standards
##### Overview

###### • What is JPOS?


   - JavaPOS (JPOS) is a free, open-source software framework


   - Provides a standard interface for point of sale (POS) devices (including RFID readers).

   - JPOS is based on the International Organization for Standardization transaction card originated messages standard (ISO-8583)
###### Please see http://www.jpos.org/ for more info • What is UPOS?


   - UPOS (Unified Point of Service) is a standard specification used in retail and point-of-sale (POS) systems that defines a common

programming interface for various types of POS devices.

   - UPOS is part of the broader JavaPOS and OPOS standards, which are often used in retail environments to interface with hardware like

barcode scanners, receipt printers, cash drawers, and RFID readers.
###### Please see https://www.omg.org/retail/unified-pos.htm for more info • Provides consistent framework that is Platform-independent and vendor-neutral for POS devices


ZEBRA TECHNOLOGIES


#### JPOS/UnifiedPOS
##### Architecture















ZEBRA TECHNOLOGIES


#### JPOS RFID Scanner
##### Capabilities

###### • Reading Tags (Continuous / timer based)

  - Reads TagID and UserData

  - Reads Partial UserData

###### • Writing a Tag

  - Writes TagID

  - Writes UserData / Partial UserData

###### • Locking a Tag • Disables (kills) RFID tag


ZEBRA TECHNOLOGIES


























#### JPOS RFID Driver
##### Windows

###### • JPOS RFID Driver

  - Develop applications using the JPOS RFID

Scanner Interface for FXP20 RFID POS Reader

###### • Demo Tools

  - JPOS Sample App

###### • Prerequisites

  - Host Platform: Microsoft Windows 11 64-bit and

above

  - Java: Oracle JDK 1.8 or above

  - IDE: NetBeans IDE 8.2 or above [64-bit]


ZEBRA TECHNOLOGIES


###### • Release Package

 - Extract the zip file on host system. The following

are included in the java folder:

 - Lib: Service Class library and other JPOS

dependent libraries

   - Zebra: jpos-rfidscanner-svc-3.0.2.jar

   - UPOS: jcl.jar, javapos-controls.jar,
JavaCoreLogger.jar, jpos_trace.properties

 - jpos-rfidscanner-test.jar: Contains sample app

to demonstrate

 - jpos.xml: Jpos configuration file contains the

logical device name

 - javapostest.bat: Batch file to run the sample app

(Windows)


#### RFID Reader
##### Generic Reader



|Connect|Configure|Control|
|---|---|---|
|Discover & Connect<br>- **Open**()<br>- **Claim**()|Settings<br>-<br>Read Timer Interval<br>Setup Event Streaming<br>-<br>**addDataListener**<br>-<br>**addOutputCompleteListener**<br>-<br>**addErrorListener**|Reading Tags<br>-<br>**readTags** (filter, timeout, password)<br>-<br>Continuous Read<br>-<br>**StartReadTags**(),**StopReadTags**()<br>Tag Queue<br>-<br>**firstTag**(),**nextTag**(),**PreviousTag**()<br>Write a Tag<br>-<br>**writeTagID**(),**writeTagData**()<br>Lock a Tag<br>-<br>**lockTag** (tagID, password)<br>Kill a Tag<br>-<br>**disableTag** (tagID, password)<br>Events<br>-<br>DataEvent, ErrorEvent, OutputCompleteEvent<br>Disconnect<br>-<br>**Release()**, **Close()**|


ZEBRA TECHNOLOGIES






#### RFID Reader
##### Reader Management



|Connect|Configure|Control|
|---|---|---|
|Discover & Connect<br>- **Open**()<br>- **Claim**()|Setup Event Streaming<br>•<br>**addStatusUpdateListener** for<br>firmware update<br>JPOS.XML<br>-<br>Default Transmit Power|Monitor<br>-<br>**checkHealth**<br>Software Update<br>-<br>**updateFirmware** (firmwareFileName)<br>Disconnect<br>-<br>**Release**(),**Close**()|


ZEBRA TECHNOLOGIES






Read Tags Demo

```
     import jpos.JposException;

     import jpos.RFIDScanner;

     import jpos.events.*;

     // Read Tags Demo Sample Code

     public class JavaPosReadTagsDemo {

       static String logicalName = "ZebraRFIDScanners";

       static RFIDScanner reader = null;

       static private DataListener dataListener;

       public static void main(String[] args) throws JposException {

         // Create Reader Instance

      reader = new RFIDScanner();

         // 1. CONNECT

         // Establish connection to the reader (Discover and connect automatically)

         reader.open(logicalName);

         reader.claim(1000);

         // 2. CONFIGURE

         // Enable Device

         reader.setDeviceEnabled(true);

         // Enable Data Event

         reader.addDataListener(dataEventListener);

         // 3. CONTROL

         // Reading tags for 5 Seconds

         reader.readTags(RFID_RT_ID, new byte[0], new byte[0], 0, 0, 5000, new byte[0]);

```

ZEBRA TECHNOLOGIES


```
    // Wait for a seconds

    try{

      Thread.sleep(1000);

} catch ( InterruptedException jposException) {

      jposException.printStackTrace();

}

    try{

      // Fetch first tag if read

      reader.firstTag();

      for(int index = 0; index < reader.getTagCount()-1;index++){

        String tagID = new String(reader.getCurrentTagID());

        System.out.println("Tag ID "+tagID);

        // move iterator to next if tag enqueued

        reader.nextTag();

}

} catch (JposException e) {

      e.printStackTrace();

}

    // Dispose Reader

    reader.release();

    reader.close();

}

  static DataListener dataEventListener = new DataListener() {

@Override

    public void dataOccurred(DataEvent dataEvent) {

      System.out.println("dataOccurred STATUS : " + dataEvent.getStatus());

}

};

```

```
}

```

#### JPOS Sample App
##### Demo: Run JavaPOSTest.bat

ZEBRA TECHNOLOGIES


## FXP20 POS Reader

ZEBRA TECHNOLOGIES


#### FXP20 Fixed RFID Reader
##### Specification

|Power|12VDC, 2A with lockable connector|
|---|---|
|Internal worldwide Antenna|1 dBic – Circular Polarized|
|RFID Power|Scalable from -10 to 27 dBm|
|External Antenna|3x SMA connector|
|Visual Status Indicators|3 LED indicator multicolor lights (green, blue, orange)|
|Audible Status Indicators|Buzzer adjustable from 0 to 95dB (4 levels)|
|Connectivity|1 x USB Host Type-B Lockable|
|GPIO port (input)|1 – 12 volts/50 ma|



ZEBRA TECHNOLOGIES


#### FXP20 Fixed RFID Reader
##### External Interfaces


###### • Front View

|#|Description|
|---|---|
|1|RFID Reading Area|
|2|Power LED|
|3|COM LED|
|4|RFID LED|
|5|Internal buzzer|
|6|ABS UL94V0 case|



ZEBRA TECHNOLOGIES


###### • Side View




|#|Description|
|---|---|
|1|DC Power connector|
|2|GPI connector|
|3|USB connector|
|4|Reset Button|
|5|Antenna Port 2|
|6|Antenna Port 3|
|7|Antenna Port 4|


## ET6xW Tablet

ZEBRA TECHNOLOGIES


#### ET6xW Tablet
##### Specification


   - SKU: XBK-ET6X-RFID-X-01 (X➔N – North America, E-EMEA, A-AU/NZ)

   - Easy to install. Attaches to the back side of the ET6x

   - Hand Strap

   - EPC Class1 Gen2 UHF RFID protocol

   - North America: 902-928 MHz

   - EU: 865-867 MHz

   - Read range: > 1 meter (3 feet)

   - Multiple tags reading: min 10 tags per second

   - Circular polarized antenna• Max. USB 5V/750mA

   - RF max power: 24 dBM

   - IP66 sealed

   - Operating Temperature: -20 to +60 C

   - Drop rating: 4 feet on concrete


ZEBRA TECHNOLOGIES


#### Smart Inventory
##### Profiles



|For Best battery life|20dBm|15%<br>RF ON: 100ms<br>Period: 667ms|S0|3|
|---|---|---|---|---|
|Maintains Balance<br>between<br>performance and<br>battery life|20dBm|25%<br>RF ON: 150ms<br>Period: 600ms|S0|3|
|Reads as many tags<br>as fast as possible in<br>longer range|24dBm|30%<br>RF ON: 150ms<br>Period: 500ms|S0|10|
|Reads as many tags<br>as fast as possible<br>in shorter range|20dBm|35%<br>RF ON: 175ms<br>Period: 500ms|S0|10|


Link Profile table
0: M=4/240, PIE=2, Tari=25us
**1: M=2/320, PIE=2, Tari=18.8us**
2: M=4/320, PIE=2, Tari=18.8us

















ZEBRA TECHNOLOGIES


## Technical Resources

ZEBRA TECHNOLOGIES


#### Resources
##### SDK/Tools/Documentation

###### • SDK/Tool


   - RFID Reader SDK for Windows (.NET) – includes Demo App (Exe, Source), SDK

[•](https://www.zebra.com/us/en/support-downloads/software/rfid-software/zebra-rfid-sdk-for-windows.html) [https://www.zebra.com/us/en/support-downloads/software/rfid-software/zebra-rfid-sdk-for-windows.html](https://www.zebra.com/us/en/support-downloads/software/rfid-software/zebra-rfid-sdk-for-windows.html)


   - RFID Reader Tech Docs

[•](https://techdocs.zebra.com/dcs/rfid/) [https://techdocs.zebra.com/dcs/rfid/](https://techdocs.zebra.com/dcs/rfid/)


   - 123RFID Desktop v3.0.0.33 or above

[•](https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html) [https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html](https://www.zebra.com/us/en/support-downloads/software/rfid-software/123rfid.html)


   - JPOS RFID Scanner Driver (Java)

###### • FXP20 POS RFID Reader Product Info


[–](https://www.zebra.com/us/en/support-downloads/rfid/rfid-readers/fxp20.html) [https://www.zebra.com/us/en/support-downloads/rfid/rfid-readers/fxp20.html](https://www.zebra.com/us/en/support-downloads/rfid/rfid-readers/fxp20.html)


   - Quick Reference Guide


   - Integration Guide

###### • Contact Zebra for the best and quickest way to get support for any questions or issues:


[–](https://www.zebra.com/us/en/about-zebra/contact-zebra/contact-tech-support.html) [https://www.zebra.com/us/en/about-zebra/contact-zebra/contact-tech-support.html](https://www.zebra.com/us/en/about-zebra/contact-zebra/contact-tech-support.html)


ZEBRA TECHNOLOGIES


#### RFID
##### Best Practices

###### • JPOS RFID

    - JPOS does not support Region Settings, write a Tag Access or Kill Password.

    - 123RFID Desktop or .NET SDK can be used to set the region
###### • Read Range

    - Adjust transmit power to avoid reading the tags in nearby RFID reader
###### • Events Handling

    - No Blocking functions in events handler / callback functions

    - Enqueue the tags and release immediately
###### • Reliable Encoding tag

    - Tags must be closer the antenna and transmit power can be maximum
###### • Optimal Performance

    - 123RFID Desktop tool can be used to verify and identify the right settings


ZEBRA TECHNOLOGIES


#### SDK/Tool
##### Upcoming features (FXP20)

###### • Windows SDK/JPOS

  - Beeper

  - External Antenna

  - GPI

###### • JPOS

  - Region setting

     - For now, Region must be configured using 123RFID Desktop or Windows RFID SDK.


ZEBRA TECHNOLOGIES


# Questions?


# Thank You

ZEBRA and the stylized Zebra head are trademarks of Zebra Technologies Corp., registered in many jurisdictions worldwide.
All other trademarks are the property of their respective owners. ©2025 Zebra Technologies Corp. and/or its affiliates. All rights reserved.


ZEBRA TECHNOLOGIES


