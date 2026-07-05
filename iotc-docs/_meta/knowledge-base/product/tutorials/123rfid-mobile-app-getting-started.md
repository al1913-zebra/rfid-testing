---
title: Getting started with the 123RFID Mobile app
diataxis: tutorial
audience: [OPS, NEWCOMER, DEV]
product: 123RFID Mobile (Android companion app)
source: Zebra 123RFID Mobile Application User Guide
---

# Getting started with the 123RFID Mobile app

> **Diátaxis — Tutorial (learning-oriented).** Install the Android app, navigate it, and pair your first RFD40/RFD90/RFD8500 reader (USB, Bluetooth, NFC tap-and-pair, or barcode). For day-to-day RFID operations and feature details, see the [123RFID Mobile app reference](../reference/123rfid-mobile-app-reference.md).
>
> _Provenance: extracted verbatim from the Zebra 123RFID Mobile Application User Guide and split into Tutorial + Reference at the "RFID Operations" boundary during the Diátaxis reorganization._

---

**==> picture [126 x 756] intentionally omitted <==**

## **123RFID** 

## Mobile Application 

## **User Guide** 

MN-003765-09EN Rev A 

Copyright 

2025/10/16 

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

**About this Document...................................................................................................................................... 5** Related Documents................................................................................................................................ 5 Notational Conventions......................................................................................................................... 5 Service Information.................................................................................................................................6 **123RFID Mobile Application........................................................................................................................... 7** Requirements............................................................................................................................................ 7 Installing the 123RFID Mobile Application for Android................................................................. 7 123RFID Mobile Application for Android.......................................................................................... 8 Using the 123RFID Mobile Application for Android.......................................................................8 Navigating 123RFID Mobile...........................................................................................................8 Accessing Battery Statistics........................................................................................................10 Renaming a Reader.......................................................................................................................13 Readers List (Available vs. Connected)...........................................................................................16 Connect a Reader..................................................................................................................................19 Connect to Reader Directly Using USB/Common IO..........................................................20 Connect to Reader Using Bluetooth.......................................................................................20 RFID Operations....................................................................................................................................30 Rapid Read......................................................................................................................................30 Inventory.......................................................................................................................................... 32 Locate Tag...................................................................................................................................... 43 Basic Pre Filters.............................................................................................................................45 Tag Write......................................................................................................................................... 46 Settings.................................................................................................................................................... 50 General Settings.............................................................................................................................51 

3 

Contents 

RFID Settings..................................................................................................................................64 Application Settings......................................................................................................................84 Enabling SGTIN-96....................................................................................................................... 85 U9 Tags............................................................................................................................................87 Scan Settings...................................................................................................................................91 Certificates Management Settings...........................................................................................92 Endpoint Configuration Settings...............................................................................................94 WLAN Settings...............................................................................................................................99 Admin Login..................................................................................................................................108 Getting Help............................................................................................................................................111 

4 

## **About this Document** 

This guide provides detailed information about the 123RFID Mobile Application for Android. 

## **Related Documents** 

The following documents provide more information about RFID products that support 123RFID Mobile Application for Android: 

- MC3300R RFID Mobile Computer Integrator Guide Supplement, p/n MN-003180-xx 

- RFD2000 RFID Sled User Guide, p/n MN-003128-xx 

- RFD8500 User Guide, p/n MN002065Axx 

- RFD40 Product Reference Guide, p/n MN-004189-xx 

- RFD4031 Product Reference Guide, p/n MN-004373-xx 

## **Notational Conventions** 

The following notational conventions make the content of this document easy to navigate. 

- **Bold** text is used to highlight the following: 

   - Dialog box, window, and screen names 

   - Dropdown list and list box names 

   - Checkbox and radio button names 

   - Icons on a screen 

   - Key names on a keypad 

   - Button names on a screen 

- Bullets (•) indicate: 

   - Action items 

   - List of alternatives 

   - Lists of required steps that are not necessarily sequential 

- Sequential lists (for example, those that describe step-by-step procedures) appear as numbered lists. 

5 

About this Document 

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

## **123RFID Mobile Application** 

This chapter describes the enhanced version of the 123RFID Mobile Application for Android which demonstrates the device's capability and tag operation functionality. 

This application is also available as part of Google Play store at: play.google.com/store/apps/details? id=com.zebra.rfidreaderAPI.demo&hl=en. 

## **Requirements** 

Requirements for the 123RFID Mobile Application for Android are as follows: 

- The recommended Android version on the mobile computer is Nougat version 7 and above. 

- Zebra Enterprise RFID mobile computer and Android devices, such as the MC3300xR, compatible with RFD8500 or Zebra approved mobile computer compatible with the RFD40 Standard RFID and RFD4031 Premium/Premium+ sleds. 

- Zebra RFID Manager APK. **NOTE:** The Zebra RFID Manager APK is only required when using RFD2000 products. Refer to the appropriate guide for more information. 

- 123RFID Mobile Application APK. 

## **Installing the 123RFID Mobile Application for Android** 

Install the 123RFID Mobile Application on the mobile computer from zebra.com/support or from the Google Play Store. The procedure to install the software on an Android device is dependent upon the Android version. 

To install the software: 

**1.** Connect the Android device to your computer. It is connected as MTP Device and shown as a drive on the computer. 

For information on transferring files using Media Transfer Protocol, refer to the Mobile Computer Integrator Guide at: zebra.com/support. 

**2.** Navigate to **Device Settings > Security** and check **Unknown Sources** to allow installation of applications from unknown sources. 

**3.** Copy the 123RFID_Mobile_1.0.x.x.apk file to the mobile device. 

**4.** Use the File Manager to locate the 123RFID_Mobile_1.0.x.x.apk file in the folder to which it is copied in Step 3 and select it. 

7 

123RFID Mobile Application 

**5.** In the pop-up window, select the Android App installer to begin installation. 

## **123RFID Mobile Application for Android** 

This application runs on Android mobile devices and demonstrates capability and tag operation functionality. 

The application allows for navigating to all screens at any time, however, some actions are not permitted while the device is charging. These actions include any operation that involves Tag reading or writing (for example: Rapid Read, Inventory, Locate Tag, etc.). 

Navigate to all screens when the inventory/locate operation is in progress. When the operation is in progress, the device displays Operation in Progress if additional operations are initiated. 

## **Using the 123RFID Mobile Application for Android** 

**NOTE:** By default, the fastest read profile is selected to configure the reader for the maximum power allowed based on the read profile.  However, the dBm can be limited due to the regulatory requirements of the specified region in which the sled is being used. 

To use the application for RFID operations: 

**1.** Launch the 123RFID Mobile Application for Android on the mobile device. 

**2.** Select **Regulatory** to set the region where the device is operating. 

**3.** From the **Readers** list, tap the available device listed under **Available Readers** to connect and view the Rapid Read screen. 

**4.** Tap **Settings > RFID > Advanced Reader Options > Antenna** . 

## **Navigating 123RFID Mobile** 

Use the **Home** screen, menu, or bottom navigation bar to navigate. You can switch between the **Inventory** , **Locate** , or **Rapid Read** screens by tapping the appropriate icon. 

To exit the application, tap **Back** on the confirmation screen and click **OK** . 

## **Home Screen** 

To access the 123RFID Mobile Application for Android, touch the **Zebra RFID Reader** icon on the mobile device to display the Home screen. 

## **Menu** 

To access the menu, tap . The menu options include: 

- Readers 

- Battery Statistics 

- Firmware Update 

- Help 

8 

123RFID Mobile Application 

- Settings 

To disconnect the connected reader, tap the **Disconnect** reader button. 

**NOTE:** The battery life (percentage charged) displays on the menu. Tap the battery icon to access battery statistics. 

## **Navigation Bar** 

The Navigation Bar consists of the following tabs: 

- **Readers** - displays a list of connected readers and available readers. Upon initial launch of the application, this is the tab that displays, unless the connection to the reader is over USB/CommonIO. 

- **RFID** - select from RFID Settings, Locate Tag, Pre Filters, and Tag Write. This is the tab that displays most of the time when launching the application. If the reader has been previously connected to the app or the reader is connected over USB/Common IO. 

- **Scan** - scan barcodes, view the list of scanned barcodes, or clear the scanned list. 

**NOTE:** Available only on RFID sleds with a built-in imager. 

- **Settings** - configure General, RFID, Application, and Scan settings. 

9 

123RFID Mobile Application 

## **Accessing Battery Statistics** 

There are multiple ways to access Battery Statistics. 

- Tap **Settings** > **General Settings** and tap **Battery Settings** or tap on the navigation bar and click **Battery Statistics** . 

10 

123RFID Mobile Application 

- Tap the menu icon from the top left and tap **Battery Statistics** . 

11 

123RFID Mobile Application ~~ee~~ 

• 

Tap the **Battery** icon from the top right corner. 

Observe the **Battery Statistics** screen for details on the state of health, charge capacity, charge status, and temperature. 

12 

123RFID Mobile Application 

## **Renaming a Reader** 

To rename a reader: 

13 

123RFID Mobile Application 

**1.** Tap and select Rename Reader. 

14 

123RFID Mobile Application 

**2.** Update the new name and click OK. 

Observe the rename success message. 

15 

123RFID Mobile Application 

**NOTE:** Repair or reattach the device to the corresponding Bluetooth or CIO connections to reflect the changes. 

## **Readers List (Available vs. Connected)** 

The **Readers** list displays connected readers and available readers. After accessing 123RFID Mobile application for the first time, when no readers are available or connected, the following screen displays. 

16 

123RFID Mobile Application 

- **Available Readers** - Lists the already paired devices that the user can choose to connect from. 

17 

123RFID Mobile Application 

- Available options include: 

   - Connect 

   - Unpair 

**NOTE:** Tap the ellipses on an **Available Reader** to connect, unpair or view reader details. 

- **Connected Readers** - Lists the readers that are already connected and ready for use. 

18 

123RFID Mobile Application 

- Available options include: 

   - Disconnect 

   - Perform a firmware update 

   - View reader details for a connected reader. 

**IMPORTANT:** Tap the **+** button to connect to a reader. You can only connect to one device at a time. 

**NOTE:** The model name and description display under the reader's name. To view the serial number, tap **Show Serial No** . Tap a second time to hide the serial number. 

## **Connect a Reader** 

**NOTE:** A reader can be connected directly to the 8 pin common IO port (RFD40/RFD90 sleds only) or by using one of the three Bluetooth options. 

To connect a reader: 

**1.** From the bottom navigation bar, tap the **Readers** icon. 

**2.** Tap a reader name from the **Available Readers** list to establish a session with the selected reader. 

**3.** Tap again to terminate the session. 

**4.** To obtain additional information about the device, tap .. **Reader Details** within Connected Readers or Available Readers. 

19 

123RFID Mobile Application 

## **See Also** 

Connect to Reader Directly Using USB 

Connect to Reader Using Bluetooth 

## **Connect to Reader Directly Using USB/Common IO** 

There is no need to go through any manual steps or pairing. When connecting the RFD40 using USB, it connects directly. 

**NOTE:** Use a USB eConnex pin if using the RFD40, or USB Serial connection if using the RFD2000. 

**1.** Connect the RFD40 to USB. 

**2.** Launch 123RFID Mobile App. 

The RFID Rapid Read screen displays. 

The RFD40 is directly connected. 

## **Connect to Reader Using Bluetooth** 

Using Bluetooth, you can pair and connect to a reader in the following ways: 

- Tap and Pair 

- Scan and Pair 

- Pair using Barcode 

## **Pair Reader Using NFC Tag (Tap and Pair)** 

**NOTE:** Available only on RFD40 Premium and Premium +. 

To pair a reader using the  NFC tag: 

**1.** From the bottom Navigation Bar, tap **Readers** . 

**2.** Tap + icon. 

20 

123RFID Mobile Application 

**3.** To connect via NFC, align the NFC area behind the handle of the sled with the NFC area on the back of the mobile computer to pair. 

**4.** On the **Pair with** screen: 

   - **a)** (Optional) Check **Allow access to your contacts and call history** . 

   - **b)** Tap **PAIR** . 

The reader is paired with the mobile computer and the reader displays in the **Available Readers** list.. 

Once the sled has paired with a mobile computer, the sled recognizes the device going forward and automatically connects using the 123RFID Mobile Reader Discovery feature. 

From the Readers list, select the checkbox for the paired reader and tap **UNPAIR** to unpair the reader from the mobile computer. 

21 

123RFID Mobile Application 

## **Scan and Pair - RFD40** 

- **NOTE:** Available only for Zebra Enterprise Mobile Computing devices and not third party Android devices. 

The RFD40 Premium + can connect to a host device over Bluetooth via Scan & Pair. 

**1.** From the bottom Navigation Bar, tap **Readers** . 

**2.** Tap + icon > Scan. 

**3.** To connect via scan, scan the code on the sled using the mobile computer to obtain the Bluetooth MAC address to pair the device to the sled or you can scan the serial number of the device. 

22 

123RFID Mobile Application 

**4.** To connect manually, enter the Bluetooth MAC ID. 

**5.** Tap **PAIR** . 

**6.** On the **Pair with** screen: 

   - **a)** (Optional) Check **Allow access to your contacts and call history** . 

   - **b)** Tap **PAIR** . 

The reader is paired with the mobile computer and the reader displays in the **Available Readers** list.. 

Once the sled has paired with a mobile computer, the sled recognizes the device going forward and automatically connects using the 123RFID Mobile Reader Discovery feature. 

From the Readers list, select the checkbox for the paired reader and tap **UNPAIR** to unpair the reader from the mobile computer. 

23 

123RFID Mobile Application 

## **Scan and Pair - RFD8500** 

Pairing with the RFD8500 is completed from the Android platform via Bluetooth Settings on the mobile device. 

Prior to pairing the RFD8500 with another device ensure the RFD8500 is charged. 

**IMPORTANT:** For successful pairing of the RFD8500 to an Android device, the yellow trigger on the RFD8500 must be pressed when the RFD8500 displays in the list of available discoverable devices, and the RFD8500 Bluetooth LED starts flashing fast. 

To pair with an Android device: 

**1.** Power on the device. 

**2.** Touch **Settings** > **Connected devices** . 

**3.** Turn Bluetooth on. 

**4.** Touch **Search for Devices** to display the available discoverable devices. 

**5.** Turn the RFD8500 on and ensure Bluetooth is enabled. If not, press the Bluetooth button on the RFD8500 for one second to make it discoverable. When discoverable, the Bluetooth LED flashes blue. 

**NOTE:** The RFD8500 is discoverable over Bluetooth for 40 seconds after start up. After that time Bluetooth suspends and is no longer discoverable. To restart discovery, press the Bluetooth button for one second. 

**6.** When the RFD8500 displays in the list of available discoverable devices, tap the RFD8500 device in the list and press the RFD8500 trigger to pair when the Bluetooth LED starts flashing fast. A beep sounds when pairing completes successfully. 

**NOTE:** Ensure you choose the correct RFD8500 serial number from the list of discoverable devices. 

**7.** Exit the Device Settings screen and run the application. 

**8.** From the application, select **Readers** and confirm that the RFD8500 serial number you paired with is displayed. Select it in the list of Available Readers. This connects the RFD8500 to the mobile device. 

## **Pair Reader By Scanning a Barcode** 

**NOTE:** Available only on RFD40 Premium +. 

To pair a reader by scanning a barcode: 

**1.** From the bottom Navigation Bar, tap **Readers** . 

**2.** Tap + icon > Barcode. 

24 

123RFID Mobile Application 

**3.** The very first time after you install the application, you will need to provide the Bluetooth address of the mobile computer. Navigate to **Settings** > **About Phone** > **Status** > **Bluetooth Address** or click the **click here** link on the **Please Enter Your Bluetooth Address** screen. 

The **Settings** screen displays where you can locate the **Bluetooth address** . 

**4.** Tap **Bluetooth address** and tap **Copy** . 

**5.** Paste the Bluetooth address in the **Bluetooth Address** field on the **Please Enter Your Bluetooth Address** screen. 

**6.** Tap **Continue** . 

Once you do that, it sets the Bluetooth address barcode for you. 

25 

123RFID Mobile Application 

**7.** Scan the barcode using the sled. 

**8.** Tap **PAIR** . 

**9.** On the **Pair with** screen: 

   - **a)** (Optional) Check **Allow access to your contacts and call history** . 

   - **b)** Tap **PAIR** . 

The reader is paired with the mobile computer and the reader displays in the **Available Readers** list.. 

26 

123RFID Mobile Application 

Once the sled has paired with a mobile computer, the sled recognizes the device going forward and automatically connects using the 123RFID Mobile Reader Discovery feature. 

From the Readers list, select the checkbox for the paired reader and tap **UNPAIR** to unpair the reader from the mobile computer. 

## **Pairing with the Camera** 

Use the camera on the mobile computer to pair the device to the sled. 

**1.** Pair the sled using the camera on the mobile computer by tapping the **Camera** tab. 

27 

123RFID Mobile Application 

**2.** On the Camera tab, tap **Scan** to access the camera on the mobile computer. 

**3.** Once the camera is activated, tap the screen on the mobile computer to capture the barcode on the sled. 

28 

123RFID Mobile Application 

## **Pair Reader Manually** 

If you do not use the Tap and Pair, Scan and Pair, or Scan a Barcode method to pair the reader, you can pair it manually. 

**1.** Enable Bluetooth. 

**2.** Discover Bluetooth devices. 

**3.** Connect to a Bluetooth device. 

## **See Also** 

Enabling Bluetooth Discovering Bluetooth Devices Connecting to a Bluetooth Device 

## **Enabling Bluetooth** 

This section describes the method for enabling Bluetooth. 

**1.** Swipe down from the Status bar to open the Notification panel. 

**2.** Touch to turn Bluetooth on. 

## **Discovering Bluetooth Device(s)** 

The device can receive information from discovered devices without pairing. However, once paired, the device and a paired device exchange information automatically when the Bluetooth radio is on. 

**1.** Ensure that Bluetooth is enabled on both devices. 

**2.** Ensure that the Bluetooth device to discover is in discoverable mode. 

**3.** Ensure that the two devices are within 10 m (32.8 ft) of one another. 

**4.** Swipe down from the Status bar to open the Quick Access panel. 

**5.** Touch and hold **Bluetooth** . 

**6.** Touch **Pair new device** . The device begins searching for discoverable Bluetooth devices in the area and displays them under **Available devices** . 

**7.** Scroll through the list and select a device. The Bluetooth pairing request dialog box appears. 

**8.** Touch **Pair** on both devices. 

**9.** The Bluetooth device is added to the **Paired devices** list and a trusted (“paired”) connection is established. 

## **Connecting to a Bluetooth Device** 

Once paired, connect to a Bluetooth device. 

**1.** Go to **Settings** . 

**2.** Touch **Connected devices** > **Connection preferences** > **Bluetooth** . 

**3.** In the list, touch the unconnected Bluetooth device. 

When connected, **Connected** appears below the device name. 

29 

123RFID Mobile Application 

