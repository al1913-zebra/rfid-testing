---
title: 123RFID Mobile app reference
diataxis: reference
audience: [DEV, OPS]
product: 123RFID Mobile (Android companion app)
source: Zebra 123RFID Mobile Application User Guide
---

# 123RFID Mobile app reference

> **Diátaxis — Reference (information-oriented).** RFID operations and features: Rapid Read, Inventory, tag-list match/color modes, Brand ID, Locate Tag, memory-bank reads, settings, and data export. New here? Start with [Getting started with the 123RFID Mobile app](../tutorials/123rfid-mobile-app-getting-started.md).
>
> _Provenance: extracted verbatim from the Zebra 123RFID Mobile Application User Guide and split into Tutorial + Reference during the Diátaxis reorganization._

---

## **RFID Operations** 

**NOTE:** Tap the Rocket icon to initiate rapid read. 

Access RFID operations for the following: 

- Rapid Read - Displays a view of the inventory operation on the reader, including total reads, unique tag count, tag read rate, and read time. 

- Inventory - Displays tag details when tag reading begins. 

- Locate Tag - Locates a single tag or multiple tags. Can be accessed from the Inventory screen. 

- Tag Write - Allows you to write data to specified tags. Can be accessed from the Inventory screen. 

- Pre-Filters - Allows you to set filters for tag data. Can be accessed from the Inventory screen. 

- RFID Settings - Allows you to configure specific reader and antenna settings. Can be accessed from the Rapid Read and Inventory screens, as well as from Settings. 

## **Rapid Read** 

**NOTE:** Tap the Inventory Screen icon to begin inventory. 

The Rapid Read screen displays the following data: 

- Total Reads 

- Unique tag count 

- Read time (mm:ss) 

- Tag read rate (tags/sec). 

30 

123RFID Mobile Application 

The **Rapid Read** and **Inventory** screens present two different views of the inventory operation on the reader. The **Start/Stop** functionality can be used interchangeably on both screens. For example, when operation starts on the **Rapid Read** screen and you navigate to the **Inventory** screen, the button available on the **Inventory** screen is **Stop** . The same is true when the operation starts on the **Inventory** screen. During the rapid read process, you can navigate to the **Inventory** screen to view tag details along with tag counts for each tag. The statistics displayed are maintained on the **Rapid Read** and **Inventory** screens regardless of the screen used to start the process. 

## **View Rapid Read Results** 

To view Rapid Read results: 

**1.** Tap **Rapid Read** from the Home or Menu screen. 

**2.** Tap **Start** to start the rapid read inventory operation. 

**3.** Tap **Stop** to stop the inventory operation. 

**NOTE:** The scan trigger on the device can also start and stop the inventory operation. Press the trigger to start, continue to hold and release to stop. 

Progressing to another screen does not halt the operation. However, attempting to make changes or perform another operation while rapid read is in process results in an error. 

31 

123RFID Mobile Application 

## **Inventory** 

Once tags begin reading, the tag details populate the **Inventory** screen. Tag reading starts and stops on this screen as well as on the **Rapid Read** screen. When the process starts, tag information displays on the screen. 

**NOTE:** When the tag does not have printable ASCII data when in ASCII mode, a yellow highlighted background displays on the Inventory screen. 

## **View Inventory Results** 

To view Inventory results: 

**1.** Tap **Inventory** from the Home or Menu screen. 

**2.** Tap **Start** to start the rapid read inventory operation. 

The **Start** button changes to **Stop** . 

**3.** Tap **Stop** to stop the read inventory operation. 

**NOTE:** The scan trigger on the device can also start and stop the inventory operation. Press the trigger to start, continue to hold and release to stop. 

**4.** To filter information by type, tap the Memory Bank dropdown menu and select User, Reserved, TID, or EPC. 

32 

123RFID Mobile Application 

**5.** The tag ID selected can be used to locate, set pre-filters and tag write. After selecting a tag, tap H and select **Locate Tag** , **Pre Filters** , or **Tag Write** . 

Progressing to another screen does not halt the operation. However, attempting to make changes or perform another operation while this operation is in process results in an error. 

- **NOTE:** Tags are fully convertible to ASCII format. ASCII mode may be enabled by selecting **Settings** > **Application Settings** > **ASCII Mode** . 

33 

123RFID Mobile Application 

**See Also** Rapid Read 

34 

123RFID Mobile Application 

## **Inventory Screen Features** 

The following table provides information on various metrics that can be captured using the Inventory feature. 

**Table 1** Inventory Screen Features 

|**Item**|**Description**|
|---|---|
|Tags|Tap**Memory Bank**to select one of the following memory bank options from the<br>drop-down menu:<br>•<br>**None**- Defaults to EPC.<br>•<br>**User**- Allows reading user memory bank data when the tag is inventoried.<br>•<br>**Reserved**- Allows reading reserved memory bank data when the tag is<br>inventoried.<br>•<br>**TID**- Allows reading TID memory bank data when the tag is inventoried.<br>•<br>**EPC**- Allows reading EPC memory bank data when the tag is inventoried.<br>When the next inventory operation starts, the details from the selected<br>memory bank displays. This menu is inactive if there is an ongoing operation<br>on the connected reader.<br>•<br>**Default Display**- None.|
|Search|Tap the**Search**icon and enter a tag ID. Tags that match the entry display in the<br>content area.|
|Power Management|Icon indicates if Dynamic Power is on. Tap the**Power Management**icon to open<br>the Battery Status screen.|
|Content Area<br>(select a tag)|Tapping a**Tag ID**highlights the tag. The highlighted Tag ID is populated on the<br>Tag Location text area as well as the Tag Pattern area in the Access Control<br>screen. Tap Start to start searching for the tag. From this screen, return to the<br>**Menu**or go to the**Home**screen and select**Locate Tag**.|
|Content Area<br>(select a tag)|The tags displayed in this area are based on the option selected from**RFID**><br>**RFID Advanced Settings**>**Tag Reporting**. Tap the tag ID to expand details about<br>the tag. Tap the tag ID again to collapse details.|



35 

123RFID Mobile Application 

36 

123RFID Mobile Application 

## **Word Count Support for Optional Memory Bank** 

For the optional memory bank, the user can select the number of words to be read. 

The default value is 0, which results in reading the entire memory bank. 

## **Tag List Match Mode Operation** 

When **Tag List Match Mode** is checked on the **Application Settings** screen, the application identifies tags from a given set of tags in csv tag list format (comma-separated values file). Browse to choose the csv file. The contents of the csv file displays on the **Inventory** screen. By default, the application displays friendly names from csv files, if **Tag List Match Mode** is enabled. If you do not want to show friendly names, the setting can be disabled in Settings to show only EPC. 

37 

123RFID Mobile Application 

## **Tag List Color Mode** 

First, the Brand ID tag will be identified and the tag ID text color changes accordingly. Second, the nonBrand ID tag will be identified and the tag ID text color changes accordingly. Last, if Match Mode = Enable, then the text color changes accordingly to Match, Expected, or Unknown. 

## **Brand ID Tag** 

- Blue: ASCII = Enable or ASCII = Disable, Tag List Match Mode = Disable. 

## **Normal Tag (Brand ID = Disable)** 

Read both Brand ID and Non-Brand ID tags 

- Black: ASCII = Enable or ASCII = Disable, Tag List Match Mode = Disable 

38 

123RFID Mobile Application 

## **Sample Contents of Taglist.csv File** 

The csv file should contain only alphanumeric characters in the tag column. If there are any special characters, the row is discarded. When entering data into the **Taglist** , Column A of the csv file should match the EPC tag ID, Column B should include the friendly name or a description of the tag to display when reading. 

The following displays a sample **Taglist** csv: 

Before the inventory starts, the count is zero. After the inventory starts, the tag list is imported into either the inventory or **RapidRead** screen. The tag list can be sorted using the menu choices. Select an option to display the type of tags to show when the inventory starts. 

If **Tag List Match Mode** is enabled, the text color changes accordingly: 

- Matching = Green 

- Missing/Expected = Red 

39 

123RFID Mobile Application 

- Unknown = Gray 

## **Sample 1 Inventory List: Tag List Enabled; Matching Tag Option Selected** 

When inventory starts, the application only displays the tag reads that match the tags in the taglist.csv file. Matching tags display in green. Select any tag read to show the matching tag details in the csv file. 

## **Sample 2 Inventory List: Tag List Enabled, Missed Tag Option Selected** 

When inventory starts, the application only displays the tag reads that are missed and included in the taglist.csv file. Missed tags display in red. Select any tag to show the missed tag details in the csv file. 

## **Sample 3 Inventory List: Tag List Enabled, Unknown Tag Option Selected** 

When inventory starts, the application only displays tags that were read but not included in the taglist.csv file, Unknown tags display in gray. Select any tag to show the unknown tag details. 

## **Sample 4 Inventory List: Tag List Enabled, All Tag Option Selected** 

When inventory starts, the application displays the tags for all the options: 

- Tag reads that match the tags in the taglist.csv file. Matching tags display in green. Select any tag read to show the matching tag details in the csv file. 

- Tag reads that are missed and included in the taglist.csv file. Missed tags display in red. Select any tag to show the missed tag details in the csv file. 

- Tags that were read but not included in the taglist.csv file. Unknown tags display in gray. Select any tag to show the unknown tag details. 

40 

123RFID Mobile Application 

## **Sample 5 Tag List Matching Selected; Show Friendly Names** 

When inventory starts, the application displays the tags for selected options from All, Matching, Missing, or Unknown. Application shows friendly names (i.e. Tag details instead of EPC) on screen. 

## **Sample 6 Exporting Data - Tag List Matching Selected** 

The application settings sceen has the option to Export Data. If the option is checked, data is exported when the inventory stops. The tag content area is exportable to a file. For example, when **Matching** is selected from the menu to display only matching tags in the tag content area, the matching data can be exported to a file. The exported csv file includes the matching, missing, and unknown tag count. 

## **Unique Tag Reporting** 

When **Report Unique Tags** is enabled on the Tag Reporting screen, the reader reports unique tags based on the options below. 

**NOTE:** The reader beeps when a unique tag is observed. 

- When the **Matching** option is selected (See **Sample 1 Inventory List: Tag List Enabled; Matching Tag Option Selected** ) the tag count cannot exceed one because the unique tags are only reported once. 

- When the **Matching** option is not selected, the list displays unique and total reads. The tag count cannot exceed one because the unique tags are only reported once. 

To export data, from the bottom navigation bar, tap **Settings** > **Application** and enable **Export Data** or tap > **Settings** > **Application** and enable **Export Data.** 

Exported files are saved under /sdard/inventory/RFID_2022-01-24_15-59-38.131.csv 

Each exported file is named using the date and timestamp. 

41 

123RFID Mobile Application 

## **NXP BrandID Check** 

When **Check BrandID** is enabled on the Tag Reporting screen, the reader reports only tags based on the brand options below. 

- Brand ID 

- EPC Length 

After enabling the **Check BrandID** settings, you can start the inventory. If the tag has a matching brand ID, the inventory list displays tag data in blue. 

42 

123RFID Mobile Application 

## **Locate Tag** 

Use Locate Tag to locate a single tag or multiple tags (Multi Tag). From the Inventory screen, tap .* and select **Locate Tag** . 

## **Locate a Single Tag** 

To locate a single tag: 

**1.** Tap **Locate Tag** from the **Home** or Menu screen. 

**2.** Enter the Tag ID in the text area or select a tag from the Inventory screen to pre-populate the Tag ID to search. 

**3.** Tap **Start** to start the locate tag operation. 

**4.** Tap **Stop** to stop the locate tag operation. 

**NOTE:** The scan trigger on the device can also start and stop the locate tag operation. Press the trigger to start, continue to hold and release to stop. 

The **Locate Tag** screen displays a color bar graph showing the proximity percentage (relative distance) of the tag. The percentage provides the relative distance from 0% to 100% where the tag is. The higher the percentage, the closer the tag is to the scanner. 

43 

123RFID Mobile Application 

Progressing to another screen does not halt the operation, until **Stop** is selected. However, attempting to make changes or perform another operation while the locate tag operation is in process results in an error. 

## **Locate Multiple Tags (Multi Tag)** 

Locate multiple tags by importing a csv file. 

**NOTE:** Multi Tag Locate supports ASCII mode. Enable ASCII mode from **Settings** > **Application** > **Global Settings** > **Enable ASCII Mode** . 

To locate and track multiple tags: 

**1.** Tap **Locate Tag** from the Home or Menu screen. 

**2.** Select the **Import csv file** on the Multi Tag panel. 

The csv file holds the EPC ID and RSSI value. The default RSSI for the EPC will be -33. 

**3.** Select the file containing the specific tag information from the file manager to bring the file into the application. 

**4.** Tap the **Reset Data** icon to reset the tag count and RSSI proximity %. 

44 

123RFID Mobile Application 

**5.** Tap the **Add Tag ID** icon to add the EPC value of interest to the dynamic list of EPC's. It can only add the value which is present in the imported csv file. 

**6.** Tap the **Remove Tag ID** icon to remove the EPC value of non-interest from the dynamic list of EPC's. It can only remove the value which is present in the csv file. 

**NOTE:** Once you re-access the **MultiTag Locate** screen, the entire tag list from the csv file displays, if values were deleted dynamically. 

## **Basic Pre Filters** 

**1.** From the **Inventory** screen, tap 

   - and select **Pre Filters** . 

**2.** Select **Basic** . 

**3.** Slide the **Offset** and **Length** to select the different portions of the tag to filter from while performing an inventory. 

45 

123RFID Mobile Application 

## **4.** Select **Enable Filter** . 

## **Tag Write** 

**1.** From the Inventory screen, tap and select **Tag Write** . 

**2.** Select **Read/Write tags** 

## **Read/Write** 

The Tag Pattern area is automatically filled in when a tag is selected in the Inventory screen. The Read/ Write access operation is simplified with offset and length fields are hidden. The user can tap the more/ advanced options icon to see offset and length fields. Tap the icon again to hide the advanced options. 

Memory Bank options now have extended menu options to choose directly interested area of memory bank. This avoids typing of offset and length etc. 

**NOTE:** SDK 2.0.49 enabled with the Write + 1 retry feature, improves the efficiency during the Tag Write operation. 

Read/Write options are: 

- **Tag ID and Password** values are in hex. Tag ID is edited. 

46 

123RFID Mobile Application 

- **Memory Bank options** - EPC, TID, USER, PC and CRC, Access Password, Kill Password. 

- **Offset** and **Length** values are in 16-bit words. This is only available after tapping the **Advanced Options** icon. To toggle visibility, tap **Advanced Options** again. 

- **Access operation** screen maintains edited tag ID. 

- **NOTE:** The user can read/write to/from tags in ASCII mode. 

**Figure 1** Read/Write Basic 

47 

123RFID Mobile Application 

## **Figure 2** Read/Write Advanced 

## **Lock** 

**NOTE:** U9 NXP tags are not supported. 

Lock privilege options are as follows: 

- Read and Write 

- Permanent Lock 

- Permanent Unlock 

- Unlock 

48 

123RFID Mobile Application 

## **Kill** 

Permanently renders the tag unusable. A **Kill Password** must be provided. 

49 

123RFID Mobile Application 

## **Settings** 

To access Settings, tap **Settings** from the bottom navigation bar or tap > **Settings** . Settings are divided into four types: 

- **General** - allows you to configure settings on the device. 

- **RFID** - allows you to configure specific reader and antenna settings. 

- **Application** - allows you to make changes to the 123RFID Mobile Application settings. 

- **SCAN** - allows you to configure settings for the scanner. 

50 

123RFID Mobile Application 

## **See Also** 

General Settings RFID Settings Application Settings Scan Settings 

## **General Settings** 

To access General Settings, from the bottom navigation bar, tap **Settings** > **General** or tap > **Settings** > **General** . 

51 

123RFID Mobile Application ~~ee~~ 

The General Settings screen options include: 

- **Firmware Update** - Update the firmware on the reader. 

- **Factory Reset** - Reset file settings on the reader to factory defaults. 

- **Enable Logging** - Enable the logging of tag reads. 

- **Device Info** - View information such as friendly name, serial number, and RFID/scan settings. 

- **Battery Settings** - View Information about Battery, such as Manufacturing Date, Battery Model, Battery ID, State of Health, Charge Cycles, Battery Temperature. 

- **Share File** - Share a file with a paired device. 

- **Trigger Mapping** - Change the mapping for the upper and lower trigger and designate the Upper Trigger for RFID decode and the Lower Trigger for Host Scan or the Upper Trigger for Host Scan and the Lower Trigger for RFID decode. 

- **NOTE:** Tap the battery icon in the top right corner of the screen to view battery statistics. 

**See Also** Firmware Update Factory Reset Enable Logging Device Info Battery Statistics Share File 

52 

123RFID Mobile Application 

Trigger Mapping 

## **Update the Device Firmware** 

To update device firmware: 

**1.** Tap Update Firmware. 

Go to zebra.com/support to download the latest firmware. 

**2.** Ensure that the terminal is connected to the device. 

**3.** Copy the .DAT file to /SD card/. 

Do not use the folder shortcut. 

**4.** To access Firmware Update, from the bottom navigation bar, tap **Settings** > **General** > **Firmware Update** or tap > **Settings** > **General** > **Firmware Update** . 

**5.** Select the firmware version to be loaded onto the device. 

53 

123RFID Mobile Application 

**6.** When selecting EDAT file, enter the password that was used to generate the encrypted offline package using 123RFID Desktop. 

54 

123RFID Mobile Application 

**7.** The update path displays starting from firmware to newly selected version. The update percentage increases as the sled device updates. 

## **Factory Reset** 

Performing a factory reset clears any saved settings and restarts the reader. The region needs to be set again. 

**1.** To reset to factory defaults, from the bottom navigation bar, tap **Settings** > **General** > **Factory Reset** or tap > **Settings** > **General** > **Factory Reset** . 

55 

123RFID Mobile Application 

**2.** Select one of the following: 

   - **a) FactoryReset** to perform a factory reset. 

**b) DeviceReset** to perform a device reset, which reboots the device. 

56 

123RFID Mobile Application 

**3.** Tap **RESET** . 

## **Enable Logging** 

**1.** To enable logging, from the bottom navigation bar, tap **Settings** > **General** > **Enable Logging** or tap > **Settings** > **General** > **Enable Logging** .  All the enabled logs are captured in logcat which can be 

retrieved through RxLogger. 

57 

123RFID Mobile Application 

## **2.** Specify the following: 

- Tap **Enable real time Logs** to toggle on or off. 

- Tap **Enable NGE Error Logs** to select. 

- Tap **Enable NGE Event Logs** to select. 

- Tap **NGE packet Logs** to select. 

- Tap **RETRIEVE LOGS FROM RAM** or **RETRIEVE LOGS FROM FLASH** . 

- Tap **Enable Debug logs** to toggle on or off. 

## **Device Info** 

To access Device Into, from the bottom navigation bar, tap **Settings** > **General** > **Device Info** or tap > **Settings** > **General** > **Device Info** . 

Device Info displays the following: 

- Model Number 

- Serial Number 

- Firmware 

- RFID Radio 

- Manufacture Date 

- Application Version 

58 

123RFID Mobile Application ~~ee~~ 

- 

## SDK Version 

- Connection Type 

## **Share File** 

**1.** To share a file, from the bottom navigation bar, tap **Settings** > **General** > **Share File** or tap > **Settings** > **General** > **Share File** . 

File Explorer opens. 

59 

123RFID Mobile Application 

**2.** Select a single file or multiple files. 

User has an option to share the file(s) to a nearby device via Bluetooth or any other file sharing supported app. 

**3.** Select from the provided options. 

## **Trigger Mapping** 

To map a trigger: 

**1.** Tap **Settings** > **General** > **Trigger Mapping** or tap > **Settings** > **General** > **Trigger Mapping** . 

60 

123RFID Mobile Application 

**2.** Select one of the following options for each trigger: 

   - RFID Start/Stop - start and stop RFID decode operations. 

   - Sled Scanner - barcode decode from the sled. 

   - Terminal Scanner -  barcode decode from the mobile computer. Feature support is determined by the mobile computer being used with the sled. 

   - Scan Notification - scan trigger press notification. 

   - No Action - No action when the trigger is pressed. 

**3.** 

## **Creating a WPA Profile** 

Create and configure a personal or enterprise WPA profile by selecting its protocol, authentication network, certificate, and autonomous identity. 

123RFID Mobile supports the following profile configurations: 

- WPA Personal 

- WPA2 Personal 

- WPA2 Enterprise 

- WPA3 Enterprise 

61 

123RFID Mobile Application 

**NOTE:** The certificate must be installed on the reader using 123RFID Desktop. 

Configure the following fields to create a WPA/WPA2 personal profile. 

**1.** Select the protocol. 

**2.** Enter the password. 

Configure the following fields to create a WPA/WPA2 personal profile. 

**1.** Select the protocol. 

**2.** Select the Extended Authentication Framework. 

**3.** Select the CA certificate. 

**4.** Enter an Identity (optional). 

**5.** Enter an Autonomous Identity. 

**6.** Enter the password. 

62 

123RFID Mobile Application 

Navigate to the reader WiFi settings using the **Connected Readers** menu. 

63 

123RFID Mobile Application 

## **RFID Settings** 

To access RFID Settings from the bottom navigation bar, tap **Settings** > **RFID** or tap = > **Settings** > **RFID** or ; from the Rapid Read or Inventory screens, tap Hi > **RFID Settings** . 

RFID Settings include: 

- **Profiles** - Displays **Fastest Read** , **Cycle Count** , **Dense Readers** , **Optimal Battery** , **Balanced Performance** , **User Defined** and **Reader Defined** profiles. 

- **Advanced Reader Settings** - Antenna, Singulation Control, Start/Stop Triggers, Tag Reporting, Power Management, and Save Configuration. 

- **Regulatory** - Allows selection of region and available channels. 

- **Beeper** - Provides the option to change the volume of both the host and sled device. 

- **LED** - Enables or disables Terminal/Host tag read LED for inventory indications. 

- Charge Terminal - Enables or disables charging the mobile device using the I/O pins on the adaptor. 

64 

123RFID Mobile Application 

## **Profiles** 

- To display the list of profiles, from the bottom navigation bar, tap **Settings** > **RFID** > **Profiles** . 

- The currently selected profile is highlighted in orange. 

- Tap a profile item to expand the profile and view applicable configurations. 

- Profiles can be selected or disabled by using the slider switch to the right of the profile name. 

**NOTE:** If Power Level, Link Profile, Session, or Dynamic Power are modified from each respective screen, then the currently selected profile changes to User Defined profile, and profile item values are modified with the same values. 

65 

123RFID Mobile Application 

Profile setting options include: 

- Fastest Read - Read as many tags as fast as possible. 

**NOTE:** By default, the fastest read profile is selected and configures the reader for the maximum power level allowed based on the read profile. However, the dBm can be limited due to the regulatory requirements of the specified region in which the sled is being used. 

66 

123RFID Mobile Application 

- Cycle Count - Read as many unique tags as possible. 

**NOTE:** This profile uses a Singulation S2 setting that puts tags to sleep for a period of time, so the application can focus on unseen tags. use caution when using this profile. 

67 

123RFID Mobile Application 

- Dense Readers - Use when there are multiple readers within close proximity. 

68 

123RFID Mobile Application 

- Optimal Battery - Provides optimal battery life. 

69 

123RFID Mobile Application 

- Balanced Performance - Maintains balance between performance and battery life. 

70 

123RFID Mobile Application 

- User Defined - Custom profile used for custom requirements. 

71 

123RFID Mobile Application 

- Reader Defined - Maintains reader configurations. 

**NOTE:** Profile settings in orange are enabled. 

## **Advanced Reader Options** 

To set advanced reader options, from the bottom navigation bar, tap **Settings** > **RFID** > **Advanced Reader Options** . Advanced Reader Options include: 

- Antenna 

- Singulation Control 

- Start/Stop Triggers 

- Tag Reporting 

- Save Configuration 

- Power Management 

72 

123RFID Mobile Application 

## **See Also** 

Antenna Singulation Control Start/Stop Triggers Tag Reporting Save Configuration Power Management 

## **Antenna** 

To access the Antenna screen, from the bottom navigation bar, tap **Settings** > **RFID** > **Advanced Reader Options** > **Antenna** .  The Antenna screen displays the following: 

- **Power Level** - Displays the current selection and a text box for available power levels (as reported by the device). The default setting is 27.0 dBm (shown as 270; the value displayed is in units of tens of dBm). Japan units are set to a different default power level depending on the SKU type. The minimum power level when DPO is enabled is 3.1 dBm. When DPO is disabled, the minimum power level is 0 dBm. 

- **Link Profile** - Displays the current selection and includes a drop-down list of available link profiles (reported by the device). Link Profile display format is as follows: Return link bit data rate in bis per second (e.g., 60000 -> 60 Kbs); Miller Value (e.g., MV_4 -> Miller 4); thus profile name M4 240K (240K becomes BLF) modulation type (PR ASK is the only one supported). 

- **PIE** - This value has no units and is either 1500 and 2000 minimum. 

- **Tari** - The applicable Tari value in thousands of microseconds (e.g., 6250 -> 6.25 microseconds). 

73 

123RFID Mobile Application 

**NOTE:** The Antenna Power Level and Link Profile are blank when there is no connection to the reader. 

## **Singulation Control** 

To access Singulation Control, from the bottom navigation bar, tap **Settings** > **RFID** > **Advanced Reader Options** > **Singulation Control** .  View or configure the singulation control settings for each antenna. 

- **Session** - The drop-down list includes the available session options (S0, S1, S2, S3). 

- **Tag Population** - A numeric value of the estimated number of tags in the Field of View (FOV). Values shown are 30, 100, 200, 300, 400, 500, 600. 

- **Inventory State** - State A, State B, AB Flip. 

- **SL flag** - ALL, DEASSERTED, ASSERTED. 

74 

123RFID Mobile Application 

## **Start and Stop Triggers** 

To access the Start and Stop Triggers screen, from the bottom navigation bar, tap **Settings** > **RFID** > **Advanced Reader Options** > **Start/Stop Triggers** . 

**Start Trigger Periodic** displays the **Period** input box (in milliseconds). 

The **Stop Trigger Duration** , **Tag Observation** and **N attempts** display numeric value input boxes. 

All time entries are in milliseconds, and all required details for saving triggers to the reader must be entered, or the application does not save the trigger settings to the reader. 

Required input for **Start/Stop Trigger** settings are as follows: 

- Start Trigger 

   - **Immediate** (default) 

   - **Handheld** - Select either the **Trigger Pressed** or **Trigger Released** check box. 

   - **Periodic** - Enter the period of time in milliseconds. 

- Stop Trigger 

   - **Immediate** (default) 

   - **Hand-held** - Select either the **Trigger Pressed** or **Trigger Released** check box along with Timeout in milliseconds. 

   - **Duration** - Enter duration in milliseconds. 

   - **Tag Observation** - Enter the tag count along with timeout in milliseconds. 

   - **N Attempts** - Enter the number of attempts along with timeout in milliseconds. 

75 

123RFID Mobile Application 

If the **Start Trigger** type is set to Hand-held trigger (pressed or released), the application sets the repeat for the operation to ensure the use case if repeated operations can be demonstrated. 

If any trigger is defined as **Hand-held** , the application does not act on immediate trigger type for a handheld trigger action. 

## **Tag Reporting** 

To access Tag Reporting, from the bottom navigation bar, tap **Settings** > **RFID** > **Advanced Reader Options** > **Tag Reporting** . 

Tag Reporting screen options include: 

- **PC** - Select to allow reporting the PC as part of the Tag Data. 

- **RSSI** - Selection indicates whether or not the RSSI (Received Signal Strength Indication) is reported as part of the Tag Data. 

- **Phase** - Select to indicate whether or not the Phase is reported as part of the Tag Data. 

- **Channel Index** - Select to indicate whether or not the Regulatory Channel Index is reported as part of the Tag Data. 

- **Tag Seen Count** - Select to indicate whether or not the Tag Seen Count is reported as part of the Tag Data. 

- **BT Batchmode** - Select to enable Bluetooth batchmode. 

- **USB Batchmode** - Select to enable USB batchmode 

- **Report Unique Tags** - When this option is enabled, the reader reports only unique tag reads. The Unique Tag reporting feature can be enabled when using Tag List Match mode. 

76 

123RFID Mobile Application 

- **Check BrandID** - Check box to enable the Brand ID option. 

- **Brand ID** - Perform NXP BrandID check (supported only on NXP U-Code 8 and above tags that supports this functionality). Brand ID check can be initiated by enabling BrandID. Reader performs an inventory operation with additional verification on whether or not the tag inventoried matches the BrandID and reports. 

- **EPC Length** - The EPC length provided will consider the length of EPC data to be matched for Brand ID tags from offset 0. 

## **Save Configuration** 

To access Save Configuration, from the bottom navigation bar, tap **Settings** > **RFID** > **Advanced Reader Options** > **Save Configuration** . 

The settings are saved on the device until a reset to factory defaults is performed on the device. 

**Save** provides an overview of all current settings on the device. 

77 

123RFID Mobile Application 

## **Power Management** 

To access Power Management from the bottom navigation bar,  tap **Settings** > **RFID** > **Advanced Reader Options** > **Power Management** . 

Enable Dynamic Power Optimization (DPO) to enhance battery life during inventory operations. 

78 

123RFID Mobile Application 

## **Setting a Charge Terminal** 

To set Charge Terminal options: 

79 

123RFID Mobile Application 

**1.** Tap Settings from the bottom navigation bar. 

80 

123RFID Mobile Application 

**2.** Enable or disable the Charge Terminal option from the checkbox. 

## **Regulatory** 

**1.** To set regulatory options, from the bottom navigation bar, tap **Settings** > **RFID** > **Regulatory** . 

**WARNING:** Select only the country in which you are using the reader. 

**2.** Select the region from the drop-down list. 

81 

123RFID Mobile Application 

**3.** Select from the available channels. 

## **Beeper** 

**1.** To set beeper options, from the bottom navigation bar, tap **Settings** > **RFID** > **Beeper** . 

**2.** Enable/disable the beeper on the sled. 

**3.** Enable/disable the beeper on the host. 

82 

123RFID Mobile Application 

**4.** Select the volume: 

   - High 

   - Medium 

   - Low 

## **LED** 

**1.** To set LED options, from the bottom navigation bar, tap **Settings** > **RFID** > **LED** . 

83 

123RFID Mobile Application 

**2.** Enable/disable the LED on the host. 

## **Application Settings** 

To access Application Settings, from the bottom navigation bar, tap **Settings** > **Application** or tap > **Settings** > **Application** . 

The Application Settings screen includes: 

- **Auto Reconnect Reader** - When checked, the device connects to the RFID service which manages the connection to the reader. 

- **Reader Connection Notification** - When checked, the application notifies the user when the reader is connected or disconnected. 

- **Reader Battery Status Notification** - When checked, the application notifies the user when the battery has reached specific critical states. 

- **Export Data** - When checked, the application writes the inventoried RFID data to a file when the inventory operation stops. On Android platforms the file is saved in a fixed directory. Check the files in file browsing in the Inventory directory (Sdcard/inventory/<files>). The files may be copied to a PC. 

When **Profile** is set to **Cycle Count** and **Export Data** is enabled: If you start/stop inventory multiple times from the same screen, it will append cycle count data to existing data and generate a csv file (delete old csv) rather that creating a new csv file on each start/stop. 

- **Tag List Match Mode** - Check to enable matching mode. 

- **Show Friendly Names** - Check to show the tag's friendly names instead of EPC ID. **Show friendly names** is only available when **Tag List Match Mode** is enabled. 

84 

123RFID Mobile Application 

- **ASCII Mode** - Displays tag ID in ASCII format. If the full tag ID or memory bank data is convertible to ASCII format, then the application only shows the same. Inventory, Locate, Access, and Pre Filters show ASCII mode represented data in respective sections. 

## **Enabling SGTIN-96** 

To enable SGTIN-96 tag format: 

**1.** Tap **Settings** > **Application** from the bottom navigation bar. 

85 

123RFID Mobile Application ~~ee~~ 

## **2.** Select the corresponding checkbox to enable SGTIN-96 Mode. 

86 

123RFID Mobile Application 

**3.** Next, run the inventory to confirm that the changes were implemented successfully. 

## **U9 Tags** 

87 

123RFID Mobile Application 

## **1.** Run the inventory and select the U9 tag. 

88 

123RFID Mobile Application 

**2.** Tap and select Tag Write. 

89 

123RFID Mobile Application 

**3.** Select all from the Memory Bank drop-down menu on the Lock tab. 

**4.** Click Lock to lock the tag permanently. 

90 

123RFID Mobile Application 

## **Scan Settings** 

To access Scan Settings, from the bottom navigation bar, tap **Settings** > **SCAN** or tap > **Settings** > **SCAN** . Scan Settings options include: 

- **Beeper** - Provides the option to change the scanner beeper volume to high, medium, or low. 

**NOTE:** Available only on sleds with an imager. 

- **Symbologies** - Allows users to select/enable specific barcode types. Supported symbologies include UPC-A, UPC-E, UPC-E1, EAN-8/JAN8, EAN-13/JAN13, Bookland EAN, Code 128, GS1-128, Code 39, Code 93, Code 11, Interleaved 2 of 5, Discrete 2 of 5, Chinese 2 of 5, Codabar, MSI, Code 32, Data Matrix, PDF417, ISBN, UCC Coupon Extended Code, ISSN EAN, ISBT 128, Trioptic Code 39, Matrix 2 of 5, Korean 3 of 5, GS1 DataBar-14, GS1 DataBar Limited, GS1 DataBar Expanded, MicroPDF417, Maxicode, QR Code, Aztec, Han Xin Code, Australian Post, US PLANET, US POSTNET, Netherlands KIX, USPS 4CB, UK Postal, Japan Post, UPU FICS, MicroQR, Composite C, Composite AB, TLC39, Dot Code. 

- **Picklist Mode** - Toggle to turn picklist mode on or off. The default is Off. 

- **Aim Guide** - Provides an aimer light that can be switched on or off. 

91 

123RFID Mobile Application 

## **Certificates Management Settings** 

Configure the Certificates Management settings using 123RFID Mobile. 

To access Certificates Management settings, from the bottom navigation bar, tap **Settings** > **Certificates Management** or tap > **Settings** > **Certificates Management** . 

**NOTE:** This feature can be accessed by logging in as an Admin to the RFD40/90 EU devices. 

The Certificates Management settings options include: 

- **Add New** - Add new certificates to the reader. 

- **Remove All** - Remove all the certificates in the reader. 

92 

123RFID Mobile Application 

**1.** To add a new certificate, tap **Add New** . 

**2.** Select one of the following interface: 

   - Wi-Fi 

   - MQTT 

   - Filestore 

   - Others 

**3.** Select the type of certificate: 

   - Ca_sert 

   - Client_cert 

   - Client_key 

**4.** Browse and select the required certificate. 

93 

123RFID Mobile Application 

**5.** Tap **Upload Certificate** to upload the certificate. 

## **Endpoint Configuration Settings** 

To access Endpoint Configuration settings, from the bottom navigation bar, tap **Settings** > **Endpoint Configuration** or tap > **Settings** > **Endpoint Configuration** . 

**NOTE:** This feature can be accessed by logging in as an Admin to the RFD40/90 EU devices. 

94 

123RFID Mobile Application 

**Endpoint Status** - Provides the status of the active endpoint. 

95 

123RFID Mobile Application 

**Configuration:** 

96 

123RFID Mobile Application 

**1.** To add a new endpoint configuration, tap **Add New** . 

**2.** Enter the endpoint name. 

**3.** Select the type of endpoint: 

   - SOTI 

   - MDM 

## **4.** Select the protocol: 

   - MQTT 

   - MQTT_TLS 

**5.** Enter the URL or server address, Port, Keep Alive, and Tenant ID. 

**6.** Enter the minimum delay time to reconnect in the Min Reconnect Delay setting. 

**7.** Enter the maximum delay time to reconnect in the Max Reconnect Delay setting. 

97 

123RFID Mobile Application 

## **8.** Enter the Username and Password. 

98 

123RFID Mobile Application 

**9.** Check the checkbox to activate the endpoint configuration and uncheck it to deactivate it. 

Tap to modify or edit the endpoint configuration. 

Tap to delete the corresponding endpoint configuration. 

## **WLAN Settings** 

Configure WLAN settings and status using 123RFID Mobile. 

Access WLAN Settings from the bottom navigation bar by tapping **Settings > WIFI.** 

99 

123RFID Mobile Application 

**Wi-Fi Status** - provides the current reader status for the Wi-Fi connection state, enables channel bands, and connection details when connected. 

## **Select Channel List Band** 

- Tap 2.4GHz to enable/disable the 2.4GHz channel. 

- Tap 5GHz NON DFS to enable/disable the 5GHz NON DFS channel. 

- Tap 5GHz DFS to enable/disable the 5GHz DFS channel. 

100 

123RFID Mobile Application 

**Wi-Fi Settings** - initiates Wi-Fi scanning and lists available SSIDs. 

101 

123RFID Mobile Application 

**1.** After scanning is complete, observe the available SSIDs listed. 

102 

123RFID Mobile Application 

**2.** Create a WLAN profile for the selected SSID and save it to the reader. 

Observe the saved profile is listed in the **Saved Networks** section. 

103 

123RFID Mobile Application 

104 

123RFID Mobile Application 

**3.** Tap the WLAN profile list to connect to the saved profile. 

   - Tap **Share Access** to connect to the WLAN profile. 

   - Tap **Delete Profile** to delete the saved profile from **Saved Networks** . 

105 

123RFID Mobile Application 

## **Wi-Fi Configuration** 

This section provides information on the Wi-Fi configuration and supported security protocols. 

**WARNING:** Users are responsible for configuring Wi-Fi security modes on RFD40/90 devices for their own individual security requirements. To ensure compliance with the cybersecurity requirements of the EU Radio Equipment Directive (RED) Article 3.3 (d), use secure settings such as **WPA3 Standard** , **WPA3_Personal_SAE** , or **WPA3_Enterprise_GCMP_256_SUITEB_192** to protect against security threats. Improper configuration may lead to vulnerabilities, and the manufacturer is not liable for any resulting damages or breaches. 

**NOTE:** Recommended Security Mode: General recommendation for wireless security is to use the WPA3 Standard. 

- For **Personal Networks** , the preferred security mode is **WPA3_Personal_SAE** . 

- For **Enterprise-Grade Networks** , the preferred security mode is **WPA3_Enterprise_GCMP_256_SUITEB_192** , which offers the highest level of security. 

RFD40/90 supports WPA2/WPA3 Personal and WPA2/WPA3 Enterprise security modes. 

106 

123RFID Mobile Application 

The following table outlines the supported protocols. 

|**Protocol**|**Description**|**Support**|
|---|---|---|
|WPA2_Personal_CCMP|•<br>Uses the CCMP-128 AES<br>Encryption with PSK.<br>•<br>Hashing Algorithm used is HMAC-<br>SHA1.<br>•<br>802.11w for WPA2 Personal is<br>supported.|Supported|
|WPA3_Personal_SAE|•<br>Uses the CCMP-128 AES<br>Encryption with PSK (SAE).<br>•<br>Hashing Algorithm used is HMAC-<br>SHA256.|Supported|
|WPA2_Enterprise_CCMP|•<br>Uses the CCMP-128 AES<br>Encryption with PMK derived from<br>the EAP Authentication exchange<br>with the RADIUS server.<br>•<br>Hashing Algorithm used is HMAC-<br>SHA1.<br>•<br>Protected Management Frames<br>(PMF) are optional.|Supported|
|WPA3_Enterprise_CCMP|•<br>Uses the CCMP-128 AES<br>Encryption with PMK derived from<br>the EAP Authentication exchange<br>with the RADIUS server.<br>•<br>Hashing Algorithm used is HMAC-<br>SHA256.<br>•<br>Protected Management Frames<br>(PMF) are mandatory.|Supported|
|WPA3_Enterprise_GCMP_256_SHA256|•<br>Uses the GCMP-256 AES<br>Encryption with PMK derived from<br>the EAP Authentication exchange<br>with the RADIUS server.<br>•<br>Hashing Algorithm used is HMAC-<br>SHA256.<br>•<br>Protected Management Frames<br>(PMF) are mandatory.|Supported|



107 

123RFID Mobile Application 

|**Protocol**|**Description**|**Support**|
|---|---|---|
|WPA3_Enterprise_GCMP_256_SUITEB_192|•<br>Uses the GCMP-256 AES<br>Encryption with PMK derived from<br>the EAP Authentication exchange<br>with the RADIUS server.<br>•<br>Hashing Algorithm used is HMAC-<br>SHA384<br>•<br>Protected Management Frames<br>(PMF) are mandatory.|Supported|



## **Admin Login** 

Admin authentication is required to access Certificates, Endpoint Configuration, and WLAN Settings for RFD40/90 EU devices. 

To access the Admin Login page, from the bottom navigation bar, tap **Settings** > **Admin Login** . 

108 

123RFID Mobile Application 

**1.** Enter the Admin password and tap **LOGIN** to authenticate. 

**2.** Tap **CHANGE PASSWORD** to navigate to the Change Admin Password page. 

## **Change Admin Password** 

To access the Change Admin Password page, from the bottom navigation bar, tap **Settings** > **Admin Login** > **Change Password** . 

109 

123RFID Mobile Application ~~ee~~ 

110 

123RFID Mobile Application 

**1.** Enter the old password and new password, and re-enter the new password. 

**2.** Tap to show the password criteria. 

**3.** Tap **SAVE NEW PASSWORD** to change the password. 

After successfully changing the password, log in again with the new password. 

**NOTE:** By default, the authorization password is set to “zebraRfid@1111”, which needs to be changed before accessing any of the above features. 

## **Getting Help** 

On-screen help is available within 123RFID Mobile Application. 

To access the Help screen, tap > **Settings** > **Help** or when available, tap the question mark icon in the upper right screen. 

111 

123RFID Mobile Application 

112 

www.zebra.com 

