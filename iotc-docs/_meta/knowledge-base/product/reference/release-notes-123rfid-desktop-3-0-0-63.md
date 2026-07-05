# **_Release Notes – 123RFID Desktop v3.0.0.63_**

Introduction
Description
Contents
Components
Device Compatibility
Installation Requirements
Part Number and Release Date

## **Introduction**


123RFID Desktop is a unique no-cost Windows utility that simplifies the process of deploying
Zebra fixed readers (FX9600, FX7500, FXR90), Zebra ATR7000 Array Reader, RE40 RFID
Module, RFD40, RFD90, ET6xW and FXP20 handheld readers. It can be used to discover and
connect to one or more readers and  allows full access to configure readers, update readers’
firmware, read, write and report tag data. The intuitive wizard presents easy-to-understand
options in drop-down menus, radio buttons and sliders.

## **Description**


This package contains the installer required to install 123RFID Desktop version 3.0.0.63. It can
be used on a 64-bit Windows system.

## _Supported Features over Version 3.0.0.55_

✓ Allow transmit power below 10dBm for FXP20 and SRV.
✓ Secure LLRP connection support for FX readers.
✓ Support for additional Wi-Fi Protocols for RFD40&90 devices.
✓ Support for new PID -1703 and multiple connections for FXP20 device.
✓ Support for enabling/disabling eConnex mode and USB DataWedge mode for RFD40&90

readers.
✓ ATL Bug fixes
Note: 
1. FXP20-Firmware update is supported on only one device at a time.
2. RFD40&90 - Since the latest configuration file is being generated using SHA256, the

configuration file generated from the latest version 3.0.0.63 cannot be opened and loaded
using older versions of 123RFID Desktop Tool.
3. Discovery of the RE40 reader is not supported. The user can manually connect the RE40 by

selecting RE40 as the reader type and providing the COM port.


## _Supported Features over Version 3.0.0.45_

✓ New features, additions and changes for RFD40 and RFD90 - EU Red

certification features

                    - Support for Admin login authentication for applicable UI tabs.

                    - Support for device authorization while region change for EU
compliance

                    - Support for device authorization while firmware update for EU
compliance.

                    - Support to change default password.

                    - Support for a unified login mechanism across different UI
screens under reader configuration for selected device.

                    - Online\Offline Region configuration disclaimer message
clearly outlining the implications and regulatory requirements.

                    - Help section modifications for new features.
Notes: 
1. By default, LLRP operates in secure mode in FX Series readers from V3.31.14. To connect to

the FX Series readers using 123Desktop reader, LLRP must be switched to non-secure mode
from the web page interface.
2. By default, SSH is disabled in FX Series readers from V3.31.14, preventing file upload and

firmware updates through 123Desktop. To update the reader firmware or upload files, SSH
must be enabled in the reader via the web page interface.
3. Fixed readers- License Manager is no longer supported from the firmware v3.31.14 and later.
4. FXP20- Application supports firmware update one device at a time.

## _Supported Features over Version 3.0.0.36_

      - New features additions for RFD40 and RFD90
✓ Support to upload larger certificate
✓ Offline DFS support
✓ Support to show Endpoint status

      - New features additions for FXP20
✓ Support for GPI based Start\Stop trigger
✓ Multiple antenna support

      - Default password change support for FXR90 and Fixed readers

      - ATL bug fixes


## _Supported Features over Version 3.0.0.28_




- Support for FXP20
✓ Discover and connect FXP20 over COM por
✓ Manual connect
✓ Configure FXP20 via the Configuration wizard




- Antenna configuration

- Advance reader configuration


            - Region configuration

            - Pre-filter configuration

            - Trigger configuration

            - Save configuration to PC

            - Reset reader configuration

            - Print configuration report
✓ Perform inventory and Access operations
✓ Perform FW update via local file-based method
✓ Load a saved configuration

- New features additions for RFD40 and RFD90
✓ Support for configuring BT security Level online\offline
✓ Support for DFS channels enable\disable

            - 2.4Ghz WLAN channels

            - 5Ghz WLAN channels

            - 5Ghz DFS WLAN channels (Dynamic frequency selection)


## _Supported Features over Version 3.0.0.22_




- Support for ET6xW
✓ Discover and connect ET6xW over COM port
✓ Manual connect
✓ Configure ET6xW via the Configuration wizard




      - Antenna configuration

      - Advance reader configuration

      - Region configuration

      - Pre-filter configuration

      - Trigger configuration

      - Save configuration to PC

      - Reset reader configuration

      - Print configuration report
✓ Perform smart inventory (read tags in the field of view) and Access

operations
✓ Perform FW update via local file-based method
✓ Read Profiles support
✓ Support battery status monitoring - query battery status periodically
✓ Load a saved configuration
✓ Power Management support




                    - Devices disconnect on low Battery

                    - Devices disconnect on Battery charging

                    - Sleep\Wake up support- The reader goes to sleep after 20
seconds of inactivity.

Note:-Windows system does not provide airplane mode event hence it is not supported. .

- For optimal battery performance, recommend using the latest BIOS version MLX29 or above.

## _Supported Features over Version 3.0.0.16_

      - New features additions for RFD40 and RFD90
✓ Support for multiple End Point configurations


✓ Support for hidden Wi-Fi profile
✓ Wi-Fi Preferred SSID UI support
✓ Certificate management UI Changes for MDM
✓ Support for secure FCDAT (EDAT) and RFIDCFG loading
✓ Support for offline Wi-Fi configuration.
✓ Support for offline Endpoint configuration.
✓ Support for offline Certificate management.
✓ Support for creating secure offline configuration files (EDAT and rfdcfg)
✓ Removed Export\Import BIN package.

**Note:** Below are the maximum limits for offline configuration for certificates, endpoints, and
Wi-Fi configuration:

         - Up to 15 certificates can be added with each size of less than 4063 bytes.

         - Maximum 10 Wi-Fi configurations can be created

         - Maximum 10 endpoints’ configurations can be added with each Maximum size up
to 480 bytes.

         - Maximum size of offline config rfdcfg file can be up to 28KB

## _Supported Features over Version 3.0.0.9_

      - New features additions for RFD40 and RFD90
✓ Support for reader reboot
✓ Support for Wi-Fi configuration.
✓ Support for Endpoint configuration.
✓ Support for Certificate management.
✓ Support for NTP server name and time setup.
✓ Support to export certificates, Wi-Fi and End point configurations to BIN

package and import the same to all the connected readers.

## _Supported Features over Version 2.0.1.37_

      - Support for Zebra Fixed Reader over Zebra IoT connector (FXR90, FX9600 and
FX7500)

✓ Discover and Connect

                    - Discover readers on the same subnet.

                    - Discover reader directly connected to PC via either USB or
Ethernet cable.

                    - Connect discovered readers or manually connect reader by
hostname/IP.

                    - Display asset information on discovered/connected readers.

                    - Support to toggle between FX LLRP and FX-IoTC reader after
discovery.
✓ Read tags

                    - Run inventory and display tag data on a single reader or
multiple readers.

                    - Customize Read Tags display fields.

                    - Specify tag data filter – by reader(s), RSSI, EPC pattern, time


last seen.

                   - Export tag data in csv format

                   - Access tag′s sequence- USER and TID memory bank data

                   - Access operations (Read\Write) UI
✓ Configure Reader

                   - Reader Name configuration

                   - Region configurations

                   - GPO rules configurations

                   - Operating mode configurations

                   - Support for Cellular Band Filter under Mode configuration for
FXR90 reader

                   - Antenna configuration

                   - Singulation configuration

                   - Trigger configuration

                   - User application UI

                   - Network configuration UI-Ethernet settings

                   - Save configuration for connected readers to PC.

                   - Load/Import saved settings from PC to a reader.

                   - Support printing the summary of the configuration settings of a
reader.

                   - Reboot reader support
✓ Firmware Update

## _Supported Features over Version 2.0.1.28_

     - New features additions for RFD40 and RFD90
✓ Online\Offline Support for the following countries for EU SKU

                   - Guernsey

                   - Jersey

                   - Namibia
✓ Online\Offline configuration Support for Datawedge mode for
RFD40 premium plus and RFD90 devices.

## _Supported Features over Version 2.0.1.22_

     - New features additions for RFD40 and RFD90
✓ Support for parameter Barcode configuration.
✓ Support to show additional memory back (USER and TID) in
read-Data view.
✓ Issues fixes.


 - New features additions for FX models (FX9600, FX 7500) and ATR7000 readers
✓ Support for connecting the FX reader's using FQDN, entered by the

user.

## _Supported Features over Version 2.0.1.6_


    - New features additions for RFD40 and RFD90
✓ Support for United Kingdom_900M region for WR SKU
✓ Support for Ukrain_License region for ETIS SKU


- New features additions for FX models (FX9600, FX 7500) and ATR7000 readers
✓ Support for exporting IOT Connector

configurations.
Removed FX Connect and Cloud connect configuration.


## _Supported Features over Version 2.0.1.2_




- Support for RFD40 and RFD90 over Multi-Slot Communication Cradle
✓ Discover and connect RFD40&90 over Multi-Slot



Communication Cradle
✓ Perform FW update via local file-based method
✓ Support for RFID and Scanner configurations settings
✓ Support battery status monitoring - query battery status periodically



✓ Additional configuration support- BT discoverable

timeout, Off mode timeout (also available to be
configured over BT and USB connection)
✓ Load a saved configuration.
✓ Support for Offline configuration




- Configure offline settings

- Save configurations

      - DAT is staging file used to push configuration and
firmware files.

      - The configuration is stored in PC as local file .rfdcfg.




- New features additions for FX models (FX9600, FX 7500) and ATR7000 readers


✓ Support for reader level RSSI filter under Configuration->Advanced Settings


## _Supported Features over Version 2.0.1.0_




- Support for RFD90
✓ Discover and connect RFD90 over  Bluetooth



communication
✓ Perform Inventory (read tags in the field of view) and Access operations
✓ Perform single tag locate
✓ Perform FW update via local file-based method on up to 20 readers at a time.
✓ Scan Tab to scan and display scanned data
✓ Scanner configuration UI-to configure scanner settings.
✓ Support battery status monitoring - query battery status periodically
✓ Support for General settings configuration under Configuration wizard.
✓ Load a saved configuration.
✓ Switch Host mode (CDC, HID)
✓ Support for Offline configuration




- Configure offline settings

- Save configurations




- DAT is staging file used to push configuration and
firmware files.

- The configuration is stored in PC as local file .rfdcfg.


## _Supported Features over Version 2.0.0.6_




- Support for RFD40 Premium/Premium Plus model
✓ Discover and connect RFD40 premium plus over



USB CDC and Bluetooth communication
✓ Perform Inventory (read tags in the field of view) and Access operations
✓ Perform single tag locate
✓ Perform FW update via local file-based method on up to 20 readers at a time.
✓ Support battery status monitoring - query battery status periodically
✓ Support for General settings configuration under Configuration wizard.
✓ Load a saved configuration.
✓ Switch Host mode (CDC, HID)
✓ Support for Offline configuration




             - Configure offline settings

             - Save configurations

                  - DAT is staging file used to push configuration and
firmware files.

                  - The configuration is stored in PC as local file .rfdcfg.

The following features applicable only to Premium Plus Model
✓ Scan Tab to scan and display scanned data
✓ Scanner configuration UI-to configure scanner settings.


## _Supported Features over Version 2.0.0.0_

    - New features addition for RFD40 Standard
✓ Switch Host mode (CDC, HID)
✓ Firmware update support has been extended to up to 20 readers at a time.
✓ Bug fixes and stability


   - New features additions for FX models (FX9600, FX 7500) and ATR7000 readers
✓ Firmware update support has been extended to up to 20 readers at a time.
✓ SPR and bug fixes as mentioned below:

             - App should be able to run as a standard user

             - ATL sample folder shall be included as part of installation package

             - The tag ID field can only be sized when the reader is not reading tags.
As soon as you start to read you can’t read the tag ID because the field
narrows so we can’t see the entire tag ID.

             - User can discover USB connected FX reader but cannot connect to LLRP
server.

             - “GPO Reset Duration" doesn't work if reader is discovered then connected
in 123RFID tool

## _Supported Features over Version 1.3.0_

   - Support for RFD40 handheld reader
✓ Discover and connect RFD40 module over COM port
✓ Configure RFD40 via the Configuration wizard
✓ Perform Inventory (read tags in the field of view) and Access operations
✓ Perform single tag locate


✓ Perform FW update via local file-based method
✓ Support battery status monitoring - query battery status periodically
✓ SupportforPre-FilterconfigurationunderConfiguration wizard
✓ Support for General settings configuration under Configuration wizard
✓ Load a saved configuration
✓ Support for Offline configuration




- Configure offline settings

- Save configurations




             - DAT is staging file used to push configuration and firmware files.

             - The configuration is stored in PC as local file .rfdcfg.

- Support for ATR7000 reader
✓ Discover and connect ATR reader
✓ Configure ATR reader via the Configuration wizard
✓ Perform Inventory (read tags in the field of view) and Access operations
✓ Perform FW update via local file-based or FTP/FTPS/SCP server.




- New features additions for FXSeries
readers

### ✓ Support for Dwell time option of N_Millisecs_1_Rnd under Antenna Port settings.


✓ **Network configuration:** Configure Ethernet, Bluetooth, and Wi-Fi settings.

       - **Ethernet:** This feature allows user to configure network settings and
the IP of the reader automatically via DHCP or static IP
configuration.

       - **Bluetooth:** This feature allows user to configure Bluetooth settings for
connecting PC/Laptop via PAN profile to the reader.

       - **Wi-Fi:** This feature allows users to scan, connect and disconnect to WiFi networks.


✓ **Serial Port Configuration:** This feature enables user to configure serial port

to modes below:

       - **Debug Port:** This is the default out of the box configuration enabled on
FX9600 readers. In this configuration RS232 port is configured as
Debug port to get kernel and system debug messages


       - **Push Data Port:** Once configured in this mode, it is enabled to run
inventory operation and the Tag report will be pushed over the serial
console.


       - **Free Port** : This option frees the serial port from internal usage and
exposes the serial port for user application


✓ **License Manager:** This feature enables user to acquire, release and view

the available licenses for various licensed features for FXSeries readers
(i.e. FX Connect, Network Connect)


✓ **FX Connect:** FX Connect is a feature that allows the FXSeries readers to be

configured to perform inventory and push tag data to the specified endpoint.
This is a licensed feature and user must activate FX-connect license to use this


feature.


✓ Network Connect: Network Connect feature supports industrial

ethernet protocols like EtherNet/IP & Profinet.


✓ **Cloud Connect:** Cloud connect allows user to connect to Zebra Data

Services and push inventory data to the connected Zebra Data Services.


✓ **Application:** This feature allows user to install, remove and view

installed applications on the readers.


## _Supported Features over Version 1.2.0_




- Support for RE40 RFID Module
✓ Discover and connect RFID module over COM port
✓ Configure RFID module via the Configuration wizard
✓ Perform inventory and access operations on RFID module and receive tag data
✓ Perform FW update on RFID module via local file-based method
✓ Support temperature monitoring - query RFID module temperature periodically



if this feature is enabled

- Show user memory bank data from tags (if supported) on Read screen

- Change the tag data column name from TagID to “EPC ID”

- Support for customization of ATL image window
✓ The ATL file can include columns to allow user to customize item image file, item



friendly name, item title, custom item text, logo image, background & foreground
color of the image window




- Specify time duration in seconds to reset GPO (General Purpose Output) pin if it
was activated by a GPO programming rule. This will reset all GPO accessories,
irrespective of their state

- Support for changing reader's region configuration within reader configuration settings

- Update the built-in help contents on the new features implemented in version 1.3.0


## _Supported Features over Version 1.1.0_




- Save antenna settings on the reader and persist them across reader shutdown and reboot

- Reset antenna settings to factory defaults

- Support for reader reboot

- Support for “Tag Focus” feature for Impinj’s Monza 4, Monza 5, and Monza
R6tag chips

- Display a set of supported reader profiles from the reader and activate the selected one
✓ This feature is supported by SW version 3.0.35 and above for FXSeries (FX7500



& FX9600) readers

- Display the “Edit Tag Detail” window by double clicking TagID of a tag item

- Support for accessing (read & write) multiple tags (up to 5 tags) without leaving the “Edit Tag
Details” window

- Support for creating EPC filter in Hex and ASCII format

- Simplify the display format of RF Mode

- Support for firmware update (upgrade/downgrade) on a single or
multiple FX7500/FX9600 devices at a time using the ftp-based method.


## _Supported Features over Version 1.0.0_

   - Change the utility name from “123RFID” to “123RFID Desktop”

   - Support for region configuration in the event of connecting to a reader whose region
hasn’t been configured

   - Update the help contents of Discovery, Region Setup, Reading, Reader
Configuration, and Firmware Update

   - Alert options for the tag items that have not been seen in a certain length of time

   - Support for absolute and relative path to the image file for picture in ATL file

   - Display of ATL image window

   - Expose 4 simple RF Profiles on top of the list of all available RF Modes under the
Antenna Port settings

   - Read EPC, TID and User (if supported) memory banks on a select tag

   - Write EPC and User (if supported) memory banks on a selected tag

   - Support for displaying Tag manufacturer information (below TID memory)

   - Show/Write EPC and User (if supported) memory banks in Hex and ASCII format
(ifthe tag data is convertible to ASCII format)

   - Support for multiple prefix, suffix matches on EPC filter settings (separated via comma)

   - Added 2 new GPO programming rules:
✓ Some tags are missing from ATL
✓ Found tags do not include

   - Support for reader’s cable compensation setting (read & write)

✓ Support for auto-save cable compensation setting when users edit cable

compensation setting value without pressing Enter key to apply the changes
and leave the Advanced configuration page

   - Support for firmware update (upgrade/downgrade) on a single ormultiple
FX7500/FX9600 devices at a time using the local file-based method

✓ By default, the Image folder selector will open to the

C:\Users\Public\Documents\123RFID\Firmware

Files\directory
✓ Support for fail-safe mechanism – the tool is able to properly handle any

firmware update failure with appropriate status update text


## _Supported Features in Version 1.0.0 (Initial Release Version)_

  - Built-in screen-by-screen help including how-to-videos link

  - Discover readers on the same subnet or manually discover/connect reader by hostname/IP

  - Discover reader directly connected to PC via either USB or Ethernet cable

  - Display asset information on discovered/connected readers

  - Run inventory and display tag data on a single reader or multiple readers at one time

  - Customize Read Tags display fields

  - Specify tag data filter – by reader(s), RSSI, EPC pattern, time last seen

  - Analyze tag reading performance using Antenna and RSSI chartsview

  - Export tag data in csv format

  - Provision of asset tag items to read against – import asset tag list (ATL) file

  - Access tag′s EPC and TID memory bank data

  - Easily configure reader′s settings via the Configuration Wizard

  - Easily program GPIO accessories via the GPIO Wizard

  - Save configuration for connected readers to PC

  - Load/Import saved settings from PC to a reader

  - Support printing the summary of the configuration settings of a reader

## **Contents**


The zip file contains the following components:


  - Zebra_123RFID_Desktop_(64bit)_v3.0.0.63.exe: Installer for 123RFID Desktop
v3.0.0.63.

  - ATL_Sample Folder: Sample Asset Tag List (ATL) file folder


[For more information on 123RFID, including how to videos, go to www.zebra.com/123RFID](http://www.zebra.com/123RFID)
[For support, please visit www.zebra.com/support](http://www.zebra.com/support)

## **Components**


The components are installed and stored in the following folders:


Component Location
Application C:\Program Files\Zebra Technologies\123RFID Desktop
Configuration Files C:\Users\Public\Documents\123RFID\Configuration Files
Data Files C:\Users\Public\Documents\123RFID\Data Files
Firmware Files C:\Users\Public\Documents\123RFID\Firmware Files


## **Device Compatibility**

This software release has been approved for use with the following Zebra devices.


**Device** **Operating System**
FXR90 Linux
FX7500 Linux

FX9600 Linux
RE40 RFID Module Not applicable
RFD40 & RFD90 ThreadX RTOS


Note:


   - The minimum recommended SW version for FXR90 reader is ver 1.0.4

   - The minimum recommended SW version for IOTC mode with FX reads is ver 3.25.70

   - The minimum recommended SW version for FXSeries (FX7500 & FX9600) readers is
ver 2.7.19. Also validated with firmware version 3.7.28 and 3.8.22.

   - The minimum recommended SW version for RE40 RFID Module is ver R00

   - The minimum recommended SW version for RFD40 readers is ver SAAFKS00-001R03E0.DAT

   - The minimum recommended SW version for ATR7000 reader is ver 2.16.29.0

   - The minimum recommended SW version for ET6xW reader is ver CAAHFS00-001-R09D0
.DAT.

## **Installation Requirements**


123RFID Desktop has been approved for use with the following OS:


   - Windows 10 (64-bit)


   - Windows 11


Note:


   - 123RFID Desktop requires the .NET Framework 4.5.8 or higher to be installed. If not
present in the system, the installer will install the .NET Framework 4.5.8 during the
installation process.


   - 123RFID desktop might not work if CoreScanner is running, make sure to uninstall
or Stop CoreScanner service before running 123RFID desktop.


## Known Issues :


`o` **FXP20**


  - Firmware update is supported on only one device at a time.


`o` **ET6xW**


  - Windows system does not provide airplane mode event hence it is not supported


  - For optimal battery performance, recommend using the latest BIOS version MLX29 or above.


`o` **Zebra IoT Connector Devices (FXR90, FX9600 and FX7500)**


  - When connected to FX9600 or FX7500, Model name is always getting suffix with “-00”
instead of number of antennas.


  - Under Configuration>Communication>Network settings, DHCP values is always getting
rendered as Off even though functionally enabled. However, user can enable\disable dhcp
from UI.


  - FX9600 and FX7500 do not support setting the region. However, region information will be
displayed.


`o` **RFD40 & RFD90**


  - Since the latest configuration file is being generated using SHA256, the configuration
file generated from the latest version 3.0.0.63 cannot be opened and loaded using older
versions of 123RFID Desktop Tool


  - Maximum limits for offline configuration for certificates, endpoints, and Wi-Fi
configuration:

         - Up to 15 certificates can be added with each size of less than 4063 bytes.

         - Maximum 10 Wi-Fi configurations can be created

         - Maximum 10 endpoints’ configurations can be added with each Maximum size up
to 480 bytes.

         - Maximum size of offline config rfdcfg file can be up to 28KB


  - Switching back to 'SPP and MFi combo' is not available over Bluetooth. It is
recommended to connect the device using USB and switch the BT host type to 'SPP
and MFi combo'.


  - Sometimes the Scan tab does not appear, or the device doesn't show up in the Scan tab
or SSI scanner issue occurs, because of SSI connect failure. It is recommended to
disconnect the reader, click on find readers, connect the reader when the reader is
found. If the problem persists, close and restart the 123RFID desktop.


  - Sometime read and write access operations failures are seen with longer memory bank data.
Recommended to write few words and adjust writing with offset.


 - It is recommended to update firmware over USB CDC instead of Bluetooth communication
because firmware update takes longer than expected time over Bluetooth communication.


 - It is recommended to reboot the device if any failure on scanning the data to recover the device
to usable state.


 - 123RFID desktop application allows to select only .pem certificate file to install.

 - Parameter barcodes report dose not support end point, Wi-Fi and certificate configurations.


`o` **Fixed Readers (FX7500, FX9600 and ATR7000)**


 - By default, LLRP operates in secure mode in FX Series readers from V3.31.14. To connect
to the FX Series readers using 123Desktop reader, LLRP must be switched to non-secure
mode from the web page interface.

 - By default, SSH is disabled in FX Series readers from V3.31.14, preventing firmware
updates through 123Desktop. To update the reader firmware, SSH must be enabled in the
reader via the web page interface.


 - License Manager is no longer supported from the firmware v3.31.14 and later.


 - Though LLRP is not connected, 123RFID application says LLRP is already connected. It is
recommended to wait for few seconds and connect the reader. If it is not resolved, Power
cycle the reader.


 - Although a maximum of 20 devices can be connected, it is strongly recommended to
perform the inventory only on a maximum of 5 devices at the same time to achieve the
best performance.


`o` **RE40**

 - Discovery of the RE40 reader is not supported. The user can manually connect the RE40
by selecting RE40 as the reader type and providing the COM port.

 - After firmware upgrade, sometime the start read fails to read tags. The recommended work
around is to restart the 123RFID Desktop.


 - In Antenna Port Settings, Dwell time option of N_Millisecs_1_Rnd is not supported


 - Tags are not reported in read data view after setting "Report after each tag being read for
greater than 0 secs".

`o` While running inventory for longer time, It is recommended to clear Data view -Tag list grid by

clicking on “Clear” button, In case system memory increase is observed.


