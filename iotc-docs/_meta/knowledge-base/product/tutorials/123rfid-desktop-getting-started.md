---
title: Getting started with 123RFID Desktop
diataxis: tutorial
audience: [OPS, NEWCOMER, DEV]
product: 123RFID Desktop (companion bootstrap tool for RFD40/RFD90/FX readers)
source: Zebra 123RFID Desktop User Guide (MN-004883)
---

# Getting started with 123RFID Desktop

> **Diátaxis — Tutorial (learning-oriented).** The hands-on first run: install, connect a reader, and read your first tags. For the complete configuration surface (operating modes, antenna, trigger, endpoints, certificates, firmware), see the companion [123RFID Desktop feature reference](../reference/123rfid-desktop-feature-reference.md).
>
> _Provenance: extracted verbatim from the Zebra 123RFID Desktop User Guide and split into Tutorial + Reference during the Diátaxis reorganization._

---

**==> picture [126 x 756] intentionally omitted <==**

## **123RFID Desktop** 

## **User Guide** 

MN-004883-07EN Rev A 

Copyright 

2025/12/18 

ZEBRA and the stylized Zebra head are trademarks of Zebra Technologies Corporation, registered in many jurisdictions worldwide. All other trademarks are the property of their respective owners. ©2025 Zebra Technologies Corporation and/or its affiliates. All rights reserved. 

Information in this document is subject to change without notice. The software described in this document is furnished under a license agreement or nondisclosure agreement. The software may be used or copied only in accordance with the terms of those agreements. 

For further information regarding legal and proprietary statements, please go to: 

SOFTWARE: zebra.com/informationpolicy. COPYRIGHTS: zebra.com/copyright. PATENTS: ip.zebra.com. WARRANTY: zebra.com/warranty. END USER LICENSE AGREEMENT: zebra.com/eula. 

## **Terms of Use** 

## **Proprietary Statement** 

This manual contains proprietary information of Zebra Technologies Corporation and its subsidiaries (“Zebra Technologies”). It is intended solely for the information and use of parties operating and maintaining the equipment described herein. Such proprietary information may not be used, reproduced, or disclosed to any other parties for any other purpose without the express, written permission of Zebra Technologies. 

## **Product Improvements** 

Continuous improvement of products is a policy of Zebra Technologies. All specifications and designs are subject to change without notice. 

## **Liability Disclaimer** 

Zebra Technologies takes steps to ensure that its published Engineering specifications and manuals are correct; however, errors do occur. Zebra Technologies reserves the right to correct any such errors and disclaims liability resulting therefrom. 

## **Limitation of Liability** 

In no event shall Zebra Technologies or anyone else involved in the creation, production, or delivery of the accompanying product (including hardware and software) be liable for any damages whatsoever (including, without limitation, consequential damages including loss of business profits, business interruption, or loss of business information) arising out of the use of, the results of use of, or inability to use such product, even if Zebra Technologies has been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to you. 

## **Contents** 

**About This Guide............................................................................................................................................. 5** Icon Conventions.....................................................................................................................................5 Notational Conventions......................................................................................................................... 5 Service Information.................................................................................................................................6 **Application Features........................................................................................................................................7** Connect...................................................................................................................................................... 8 Connecting to the Multi-Slot Cradle..........................................................................................11 Connecting Fixed Reader to 123RFID Desktop.....................................................................13 Read...........................................................................................................................................................19 Filtering Tags..................................................................................................................................22 Editing Tag Details........................................................................................................................23 Online Reader Configuration.............................................................................................................24 Operating Mode Configuration................................................................................................. 24 General Settings............................................................................................................................26 Bluetooth Security Levels............................................................................................................31 Disconnecting Bluetooth Devices from RFD40/RFD90 using Parameter Barcode.......................................................................................................................................33 Region Configuration for Online Devices.............................................................................. 33 Antenna Configuration.................................................................................................................34 Trigger Configuration...................................................................................................................39 GPO Programming.........................................................................................................................41 Configuring Pre-Filters.................................................................................................................42 Configuring Advanced Reader Parameters...........................................................................43 Communication Settings............................................................................................................. 45 

3 

Contents 

Endpoint Status Summary.......................................................................................................... 55 Certificate Management..............................................................................................................55 Configuring Reader Applications..............................................................................................58 Modifying Data...............................................................................................................................58 Scanning Configuration...............................................................................................................60 Offline Reader Configuration..............................................................................................................61 Reader Name................................................................................................................................. 63 RFID Reader Configuration........................................................................................................ 63 Scanning Configuration...............................................................................................................65 General Settings............................................................................................................................66 Modifying Data...............................................................................................................................67 Wi-Fi Configuration.......................................................................................................................68 Certificate Management..............................................................................................................69 End Point Configuration.............................................................................................................. 70 Load and Print Configuration......................................................................................................71 Firmware Management........................................................................................................................72 RFID Sled Support for DataWedge Mode......................................................................................75 Default Password Change..................................................................................................................83 Default Password Change for FX Readers............................................................................83 Default Password Change for FXR90 Readers....................................................................86 **Troubleshooting............................................................................................................................................. 88** 

4 

## **About This Guide** 

The 123RFID Desktop application is a Windows software utility for simplifying the setup, configuration, and optimization of Zebra RFID readers. It provides an intuitive, step-by-step process to discover readers, perform initial configurations, run inventory tests, and update firmware. 

## **Icon Conventions** 

The documentation set is designed to give the reader more visual clues. The following visual indicators are used throughout the documentation set. 

**NOTE:** The text here indicates information that is supplemental for you to know and that is not required to complete a task. 

**IMPORTANT:** The text here indicates information that is important for you to know. 

**CAUTION:** If the precaution is not heeded, you could receive a minor or moderate injury. 

**WARNING:** If danger is not avoided, you CAN be seriously injured or killed. 

**DANGER:** If danger is not avoided, you WILL be seriously injured or killed. 

## **Notational Conventions** 

The following notational conventions make the content of this document easy to navigate. 

- **Bold** text is used to highlight the following: 

   - Dialog box, window, and screen names 

   - Dropdown list and list box names 

   - Checkbox and radio button names 

   - Icons on a screen 

   - Key names on a keypad 

   - Button names on a screen 

5 

About This Guide 

- Bullets (•) indicate: 

   - Action items 

   - List of alternatives 

   - Lists of required steps that are not necessarily sequential 

- Sequential lists (for example, those that describe step-by-step procedures) appear as numbered lists. 

## **Service Information** 

If you have a problem with your equipment, contact Zebra Global Customer Support for your region. Contact information is available at: zebra.com/support. 

When contacting support, please have the following information available: 

- Serial number of the unit 

- Model number or product name 

- Software/firmware type and version number 

Zebra responds to calls by email, telephone, or fax within the time limits set forth in support agreements. 

If your problem cannot be solved by Zebra Customer Support, you may need to return your equipment for servicing and will be given specific directions. Zebra is not responsible for any damages incurred during shipment if the approved shipping container is not used. Shipping the units improperly can possibly void the warranty. 

If you purchased your Zebra business product from a Zebra business partner, contact that business partner for support. 

6 

## **Application Features** 

123RFID Desktop is a software tool that simplifies reader setup. The application finds and connects to a reader with three simple clicks and optimizes Zebra passive RFID fixed and handheld readers. Supported models include FX7500, FX9600, FXR90, ATR7000, RFD40, RFD90, ET6xW and FXP20. 

- **Connect** - allows users to search for readers on the local subnet, USB port, or Bluetooth. 

- **Read** - allows users to start an inventory, view summary metrics on tag reads, and sort, filter, and export tag data. Select an antenna and set the power level to begin building an inventory. 

- **Configure** - allows users to configure reader and scanner settings. Settings can be saved to a file or as a printed report. 

- **Firmware** -  allows users to update the firmware on up to 20 devices. 

**NOTE:** The **Scan** tab is available only for connected sleds that have an imager. 

7 

Application Features 

## **Connect** 

Locate readers on the local subnet or via a USB port by clicking **Find Readers** or by entering the IP, hostname, COM port, or by Bluetooth and clicking **Connect** . 

**Figure 1** Fixed Readers 

**NOTE:** For RFD40 and RFD90, the drop-down under **Connect a Reader by IP or Hostname or COM port** states the model types. 

View the **Available Readers** section and click **Connect** on one of the associated rows to connect to the specified reader. 

8 

Application Features 

## **Figure 2** Connected and Available Readers 

9 

Application Features 

## **Figure 3** Connected and Available Readers - FPX20 

## **Figure 4** Connected and Available Readers - ET6xW 

10 

Application Features 

## **Connecting to the Multi-Slot Cradle** 

The 123RFID Desktop tool discovers, connects, and performs RFID and scanning operations for Zebra UHF RFID sleds using the multi-slot cradle. This section provides the steps necessary to discover and connect to the multi-slot cradle. 

To discover and connect to the device: 

**1.** Keep the device in the cradle and run 123RFID Desktop. 

**2.** Click **Find Readers** to view available devices to connect to. 

**3.** Click **Connect** next to the device to connect to it. 

When connected, the device is listed under the **Connected Readers** section. 

To connect to a device via IP address: 

**1.** Keep the sled docked in the cradle for up to two minutes while the DHCP allocates the IP address. 

**2.** Choose any of the devices from the available readers section and click **Connect** . 

If the connection is successful, the reader is listed in the **Connected Readers** section. 

11 

Application Features 

12 

Application Features 

## **Connecting Fixed Reader to 123RFID Desktop** 

The fixed reader can be connected via a secured or an unsecured connection when connecting the fixed reader to the 123RFID Desktop. 

A secure connection can be established in two ways: with or without a certificate. 

- To connect through a secure connection without a certificate, log in to the reader web page. 

   - **a)** Go to **Communication** > **LLRP** . 

   - **b)** Only select the **Enable Secure mode** . This method does not require certificate validation. 

**c)** Click **Set Properties** . 

13 

Application Features 

- To connect to a secure connection with a certificate, log in to the reader web page. 

   - **a)** Go to **Communication** > **LLRP** . 

   - **b)** Select both **Secure Connection mode** and **Validate peer** . 

   - **c)** Click **Set Properties** . 

   - **d)** Go to **Configure Reader** > **Certificates** to upload the certificates. 

14 

Application Features 

- To connect via an unsecured connection, log in to the reader web page. 

   - **a)** Go to **Communication** > **LLRP** . 

   - **b)** Deselect **Enable Secure mode** and **Validate peer** . 

   - **c)** Click **Set Properties** . 

After the reader is set up on the web page, it is ready to connect to the 123RFID Desktop. 

- To connect the fixed reader to the 123RFID Desktop: 

   - **a)** Enter the IP or hostname. 

   - **b)** Click the lock icon to toggle between secured and unsecured connections. 

   - **c)** Click **Connect** . 

   - Secured connection via the welcome page: 

   - Unsecured connection via the welcome page: 

   - Secured connection via Connect page: 

   - Unsecured connection via Connect page: 

15 

Application Features 

- When connecting in the secure connection mode, the Secure Connection Window displays. 

- To connect through a secure connection without entering the certificate details. 

   - **a)** Select **Secure Mode** and ensure the port number is entered correctly. 

   - **b)** Click **Connect** . 

16 

Application Features 

- To connect through a secure connection with the certificate details. 

   - **a)** Select **Secure Mode** , **Validate Peer Certificate** and ensure the port number is entered correctly. 

   - **b)** Enter the certificate details and click **Connect** . 

The reader would have now connected and populated the connected reader list. 

17 

Application Features 

- Toggle the lock icon to switch to an unsecured connection. 

- Users can toggle between secured and unsecured connections in the available reader list by clicking the lock icon. 

**Figure 5** Secured Connection 

**Figure 6** Unsecured Connection 

18 

Application Features 

## **Read** 

Use the Read feature to manage an inventory. View summary metrics on tag reads by reader or sort, filter, and export tag data to a file. Select the antenna and set the power level to start an inventory. 

**Figure 7** Data View 

**Table 1** Tag Read Options 

|**Feature**|**Description**|
|---|---|
|Start an Inventory|Click**Start**to start reading tags.|
|Highlight Tags|Click the Gear Icon<br>to highlight tags based on the last time seen.|
|Track Tags|Click**Tag Focus**to enable the tracking of applicable tags such as Monza4, 5,<br>and R6.<br>**NOTE:**Tag Focus prevents read redundancy by suppressing tags<br>that have already been read. This capability prevents multiple reads<br>of the same tags, allowing for more accurate reading of hard-to-<br>read tags.<br>~~n~~S|
|Export Tag Data|Click**Export**to download the inventory data for offline viewing.<br>•<br>Export Summary – download a snapshot of all the tag reads on the Read<br>screen.<br>•<br>Export History – download the timeline data for tag reads.|
|View Tag Details|Click the spreadsheet icon.<br>to view tag details such as Tag ID and User<br>Memory data.|



19 

Application Features 

**Table 1** Tag Read Options (Continued) 

|**Feature**<br>So|**Description**<br>“|
|---|---|
|View Performance Data<br>So|Click**Charts**<br>to view tag performance data. Use Pie Charts to visualize<br>a distribution of tag reads across enabled devices.<br>“|



**Figure 8** Data View - FXP20 

20 

Application Features 

**Figure 9** Data View - ET6xW 

The following are the Read profile options for ET6xW: 

- **Fastest Read** - this profile prioritizes the rapid reading of tags within a shorter range, maximizing the number of tags processed in minimal time. It is ideal for scenarios where speed is more critical than range. 

- **Optimal Battery** - this profile prioritizes battery longevity, ensuring the device operates efficiently for extended periods. It is ideal for scenarios where battery conservation is crucial. 

- **Max Range** - this profile is designed to read tags from the longest possible distance, focusing on speed and range. It is perfect for applications where detecting tags over a wide area is necessary. 

- **Balanced Performance** - this profile compromises performance and battery life, providing a moderate level of both. It is suitable for general use where neither extreme performance nor maximum battery life is required. 

- **Cycle Count** - this profile focuses on identifying as many unique tags as possible, emphasizing diversity in tag detection. It is used when the goal is to ensure comprehensive tag coverage. 

- **User Defined** - this profile allows customization based on specific user requirements, offering flexibility to meet unique operational needs where predefined profiles do not fit. 

The power management features for ET6xW: 

- If the battery is at 6% or below, the device won't connect while charging, ensuring safety and preserving device health. 

- The duty cycle is optimized across all profiles to manage power use efficiently, extending battery life. 

- The device enters sleep mode if no radio operations are executed for 20 seconds, conserving power. 

21 

Application Features 

## **Filtering Tags** 

Filter tags based on an Asset Tags List (ATL) or by reader in Data View. Use Data View to filter by EPC pattern, RSSI value, or Last Time Seen. 

**1.** Click **Filters** to select the following filter options. 

**Figure 10** Data View 

**2.** Click **Select a File** to filter tags based on an ATL file. 

**3.** Click **All Readers** to filter by reader. 

**4.** Click the cylinder icon Y to filter tag data at the application level by: 

   - **a)** EPC Pattern - specify whether the filtered EPC data will include/exclude the filter string. 

   - **b)** RSSI Value - filter tags that have RSSI value greater than the RSSI filter specified only. 

   - **c)** Time Last Seen - filter tags that were last seen in the time duration specified only. 

22 

Application Features 

## **Editing Tag Details** 

Access and locate tags based on EPC ID. 

**1.** Select the row and click the Tag Details icon to edit tag details. 

**2.** Next, click the **Tag Locate** tab to start locating tags based on the EPC ID. 

23 

Application Features 

