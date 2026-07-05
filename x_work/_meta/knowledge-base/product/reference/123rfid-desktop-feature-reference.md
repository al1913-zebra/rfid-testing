---
title: 123RFID Desktop feature reference
diataxis: reference
audience: [DEV, OPS, FLEET-IT]
product: 123RFID Desktop (companion bootstrap tool for RFD40/RFD90/FX readers)
source: Zebra 123RFID Desktop User Guide (MN-004883)
---

# 123RFID Desktop feature reference

> **Diátaxis — Reference (information-oriented).** Exhaustive description of every 123RFID Desktop configuration surface: operating mode, general/antenna/trigger/GPO/pre-filter settings, communication (Ethernet, Bluetooth, serial, Wi-Fi), endpoint and certificate management, offline configuration, firmware management, default-password change, and troubleshooting. New here? Start with [Getting started with 123RFID Desktop](../tutorials/123rfid-desktop-getting-started.md).
>
> _Provenance: extracted verbatim from the Zebra 123RFID Desktop User Guide and split into Tutorial + Reference during the Diátaxis reorganization._

---

## **Online Reader Configuration** 

Configure the reader using the 123RFID Desktop configuration wizard or load a saved configuration onto the reader. 

**NOTE:** Reader configurations differ depending on the reader type. Depending on the selected reader types, only the supported configuration tabs will be shown. 

Click **Edit Configuration on Reader** to edit the reader’s settings and use the configuration tool to do the following: 

- Assign names to the reader and the connected antennas. 

- Set reader settings or reset them to factory defaults. 

- Change the reader’s region configuration. 

- Edit the antenna settings, including beam, power, RF modes, and dwell time. 

- Configure when triggering starts and stops on the reader. 

- Create rules for GPO accessories on when to trigger inventory and output results. 

- Configure pre-filters for handheld readers. 

- Configure advanced reader settings such as antenna singulation and state aware. 

- Manage licenses on fixed readers. 

- Edit communication settings based on Ethernet, Bluetooth, Wi-Fi, and Serial Port requirements. 

- Configure reader applications for fixed readers. 

- Export or import certificates for handheld readers. 

- Modify prefix or suffix data for handheld readers. 

- Configure symbology settings for handheld readers. 

- Save or print configurations to a file. 

- Deploy the configuration file to a new device. 

Click **Load a Saved Config File to a Reader** to load a saved configuration file to another connected reader from the PC. 

## **Operating Mode Configuration** 

Use Operating Mode to configure a tag's antenna, trigger, communication settings, and applications. 

**NOTE:** This feature is available for the FXR90 and fixed IoTC readers only. 

24 

Application Features 

**Figure 11** Fixed Reader Operating Mode 

The following settings are available to configure: 

- **Mode** configure tag reporting protocol for different use cases. The options are 

   - **Simple** - report all unique read tags. 

   - **Inventory** - report all unique read tags in a given time interval, default 1 second. 

   - **Portal** - report all unique read tags after the GPI start trigger. 

   - **Conveyer** - report all unique read tags for each antenna. 

   - **Custom** - report tag reads as defined by the user. 

25 

Application Features 

- **Environment** specify the amount of RFID interference in a given environment. 

   - **High Interference (Default)** - operating in the presence of multi or dense readers. 

   - **Low Interference** - operating in the presence of another reader, causing interference for a short time. 

   - **Very High Interface** - the number of readers in the environment is greater than the number of available channels, or multiple readers operating in close proximity. 

   - **Auto Detect** - use the application to access the environment and adjust. 

   - **Demo** - demonstrate maximum reader performance in environments where there are no other readers. 

- **Tag ID Filter** - filter tag reporting by ID defined by the user. 

   - **Operation** - set the operation for the filter: include, exclude, or disable. 

   - **Match** - match tag ID using prefixes, suffixes, or regex. 

- **Tag Reporting** - set tag reporting to continuous, periodic (all antennas), or periodic (per antenna). 

- **Cellular Band Filter** - provide noise cancellation for external non-RFID interference. 

## **General Settings** 

General settings include batch mode, host type, HID keyboard, tag reporting, charging through the terminal (RFID40 and RFID90 UHF RFID handheld readers only), and timeout. 

You will be prompted to provide the administrative credentials before you can view or edit the settings in the European region. 

- **IMPORTANT:** For authorization password changes, refer to Authorization Session and Password Requirements on page 29. 

26 

Application Features 

**NOTE:** Configurable settings may differ depending on the type of handheld reader in use. 

27 

Application Features 

## **Figure 12** Handheld Reader General Settings 

- **Dynamic Power** – enable or disable the optimization of RFID reader power consumption. 

- **Unique Tag** – enable or disable reporting unique tags. 

- **Off-Mode Timeout** – set the timeout duration. 

- **USB Host Mode Switch** – switch the USB host modes between HID keyboard mode and SSI over CDC mode. 

- **Bluetooth Host Mode Switch** – switch the Bluetooth Host Mode between HID Keyboard Mode and Mfi. 

- **Same Tag Reporting Timeout in HID Mode** – set the same Tag Reporting timeout in HID mode. 

- **Bluetooth Batch Mode** – set auto/enable/disable for Bluetooth Batch Mode. 

- **USB Batch Mode** – set enable/disable for USB Batch Mode. 

- **eConnex Mode** – set enable/disable for eConnex Mode. 

- **eConnex Terminal Charge** – set enable/disable for eConnex Terminal Charge. 

- **Key Remapping** – remap the upper and lower triggers to RFID, Sled Scanner, Terminal Scanner, Scan Notification, or No Action. Select the desired functionality under the upper and lower triggers separately. 

- **IOS HID Virtual Keyboard** – set enable/disable for IOS HID Virtual Keyboard. 

Bluetooth settings include: 

- **Bluetooth Discovery** – set enable/disable for Bluetooth discovery. 

28 

Application Features 

- **Discoverable Timeout** – enable Bluetooth discovery above to set the Discoverable timeout value. 

- **Reconnect Attempts** – set Reconnect Attempts value. 

- **Beep on Reconnect** – set enable/disable Beep on Reconnect. 

- **Reconnect to the Bluetooth Host** - set the Bluetooth host to Never Attempt Reconnect, Attempt Reconnect on Data, and Attempt Reconnect Immediately. 

- **NTP Server Setting** – set the primary and secondary NTP server name clock settings. 

- **USB DataWedge Mode** – set enable/disable for USB DataWedge Mode. 

## **Option to Enable or Disable eConnex** 

Users have the option to enable or disable the eConnex port. This allows the use of the EMC Terminal with either the eConnex adapter for a wired connection or with Bluetooth for a wireless connection, making it easier to share RFD40/90 sleds between users. 

By default, the sled's factory settings enabled the eConnex connectivity. The eConnex port can be disabled using the 123RFID utility. 

Users can still use the triggers on the RFD40/90 to operate the terminal's scanner, even when the sled is docked in an eConnex adapter while using a Bluetooth connection. 

## **Authorization Session and Password Requirements** 

This section contains details regarding the authorization session, requirements for passwords, and instructions for changing passwords. 

- The authorization password is set to **zebraRfid@1111** by default, and you need to change it before accessing the settings. The password must consist of one upper-case letter, one lower-case letter, one special character, and one numeric value. 

- The RFD40/90 sleds admin login session times out after 10 minutes of user inactivity. However, the 123RFID Desktop saves the password for the connected session and re-logs in internally if required. 

29 

Application Features 

- If there is any interface change, then the login session expires. 

- A brute force mechanism is implemented during login sessions. 

   - Allow up to five incorrect login sessions. 

   - After the sixth unsuccessful login attempt, each subsequent attempt will be delayed by 30 seconds. 

- You can change the password by navigating to **Configuration** > **Select the Reader** > **Change Password** . 

30 

Application Features 

## **Bluetooth Security Levels** 

This section provides information about Bluetooth security levels. 

- Low Bluetooth Security - This security level uses the Just Works pairing method, requiring no authentication or encryption. 

- Medium Bluetooth Security - The medium security setting requires Man-In-The-Middle (MITM) protection and encryption with acceptable user interaction. If one of the devices is incapable of Secure Simple Pairing, this will result in a pin code exchange, creating a combination of link key and encrypted connection. 

- High Bluetooth Security - This level 4 security level requires MITM protection and 128-bit encryption when linking and generating encryption keys with acceptable user interaction. If one of the devices is incapable of Secure Connections, this will result in a link disconnection with the reason code of **Authentication Failure** . There is no backward compatibility with legacy devices when in this mode. 

- When the Medium or High security level is enabled and paired with an Android device, a pop-up displays on the terminal with a randomly generated passkey value. The passkey is entered via alphanumeric barcode scanning for secure pairing. 

- For the alphanumeric barcodes to be scanned for the pairing, see Alphanumeric Barcodes. 

31 

Application Features 

- If the passkey entry is canceled from the phone, the scanner remains in the passkey entry mode for 30 seconds before timing out. To exit the passkey entry mode, scan the Cancel barcode or any other barcode (such as the End of Message barcode). 

## **Alphanumeric Barcodes** 

**==> picture [86 x 36] intentionally omitted <==**

0 

**==> picture [85 x 37] intentionally omitted <==**

**==> picture [85 x 37] intentionally omitted <==**

**==> picture [6 x 7] intentionally omitted <==**

**----- Start of picture text -----**<br>
2<br>**----- End of picture text -----**<br>


**==> picture [85 x 37] intentionally omitted <==**

**==> picture [6 x 7] intentionally omitted <==**

**----- Start of picture text -----**<br>
4<br>**----- End of picture text -----**<br>


**==> picture [85 x 259] intentionally omitted <==**

**----- Start of picture text -----**<br>
1<br>3<br>5<br>**----- End of picture text -----**<br>


**==> picture [85 x 37] intentionally omitted <==**

**==> picture [6 x 8] intentionally omitted <==**

**----- Start of picture text -----**<br>
6<br>**----- End of picture text -----**<br>


**==> picture [85 x 37] intentionally omitted <==**

**==> picture [6 x 8] intentionally omitted <==**

**----- Start of picture text -----**<br>
7<br>**----- End of picture text -----**<br>


**==> picture [85 x 37] intentionally omitted <==**

**==> picture [6 x 8] intentionally omitted <==**

**----- Start of picture text -----**<br>
8<br>**----- End of picture text -----**<br>


32 

Application Features 

**==> picture [85 x 36] intentionally omitted <==**

9 

**==> picture [73 x 37] intentionally omitted <==**

End of Message 

**==> picture [73 x 37] intentionally omitted <==**

Cancel 

## **Disconnecting Bluetooth Devices from RFD40/RFD90 using Parameter Barcode** 

Users can disconnect a terminal or phone from an RFD40/90 sled by scanning the following barcode. 

**==> picture [193 x 37] intentionally omitted <==**

## **Region Configuration for Online Devices** 

Configure the appropriate settings based on the region where the reader is used. 

Due to differing frequency requirements, there are several versions of the hardware. 

The software limits the list of choices presented to those compatible with the hardware in use. 

**NOTE:** If only one option is compatible with the hardware, that option is selected automatically. 

The following are the definitions of different fields that can be set: 

- **Region of Operation** - choose the region for the country of operation. Select from the drop-down list that presents the regions that have given regulatory approval to be used with the current board. 

**NOTE:** Region of operation configuration is applicable to worldwide readers only. 

- **Communication Standard** - choose the communication standard from the list of standards supported by the chosen region. If a region supports only one standard the same is chosen automatically. 

- **Frequency Hopping** - turn on the frequency hopping option. This option is displayed only if the chosen region of operation supports this. 

- **Selected Channels** - select a subset of channels to operate upon (from the list of supported channels). This option is displayed only if the chosen region of operation supports this. 

After applying region configurations, click **Set** to save the changes to the reader, and then select the **I understand** checkbox to confirm. 

33 

Application Features 

**NOTE:** If the user is asked for administrative credentials, it indicates that only those with administrative privileges can update the region settings. The user cannot update the region settings without these credentials. 

## **Antenna Configuration** 

Configure Antenna Port settings for RFID sleds and fixed readers using 123RFID Desktop. The number of antennas is dependent upon reader type. 

**NOTE:** Antenna configurations differ depending on the reader type. Depending on the selected reader types, only the supported configuration tabs will be shown. 

Configurable antenna settings for RFD40 and RFD90 RFID sleds include: 

- Name and Color 

- Power (dBm) 

- RF Mode 

34 

Application Features 

**Figure 13** RFD90 Antenna Settings 

**NOTE:** Power and RF Mode changes are applied to the device instantly. 

Configurable antenna settings for FX7500 fixed reader settings include: 

- Name and Color 

- Enable/Disable 

- Power (dBm) 

- RF Mode 

- Dwell Time 

35 

Application Features 

**Figure 14** FX75000 Antenna Settings 

Configurable antenna settings for FXR90 fixed reader settings include: 

- Name and Color 

- Enable/Disable 

- Power (dBm) 

- Dwell Time 

**Figure 15** FXR90 Antenna Port Settings 

36 

Application Features 

Configurable ATR7000 advanced array reader settings include: 

- Beam Settings 

- Power (dBm) 

- RF Modes 

- Dwell Time 

**Figure 16** ATR7000 Antenna Settings 

37 

Application Features 

**Figure 17** FXP20 Antenna Settings 

**Figure 18** ET6xW Antenna Settings 

38 

Application Features 

## **Trigger Configuration** 

Configure start and stopping conditions for reading tags and identifying tag reporting parameters. 

**NOTE:** Trigger configurations differ depending on the reader type. Depending on the selected reader types, only the supported trigger configuration will be shown. 

**Figure 19** Fixed Reader Trigger Settings 

Specify the start condition for a read: 

- When **Start** is clicked from the **Read** panel. 

- When **Start** is clicked, and then the GPI trigger of the device is pressed or released. 

- When **Start** is clicked, and the input duration has passed. 

- When the GPI trigger of the handheld device is pressed or released. 

Specify a stopping condition for a read: 

- When **Stop** is clicked from the **Read** panel. 

- After a specified number of total tag reads. 

- After a specified time (ms) has elapsed after tag reading was initiated. 

- After a specified number of inventory rounds. An inventory round consists of reading a tag on each selected antenna port. 

- After the GPI trigger of the device is released. 

Configure Report Tag Data to occur after a specified number of tag reads or after each tag is read for a specified number of seconds. 

39 

Application Features 

When in Autonomous Mode, reports are sent only when a tag is seen for the first time. This setting is helpful in reducing the tag data network traffic by not reporting duplicated tag data. Configurable settings include: 

- Never - reports no tag data. 

- Immediate - reports data for a new tag immediately. 

- Moderated - reports data for a new tag only after the specified moderation time (ms) and that tag was seen for the moderation duration. 

**NOTE:** Report tag data and Autonomous Mode are only available for FX7500 fixed readers. 

**Figure 20** FXP20 Trigger Settings 

40 

Application Features 

**Figure 21** ET6xW Trigger Settings 

## **GPO Programming** 

Select events to start and stop triggering the GPO accessory connected to the reader. 

**NOTE:** This feature is available for fixed readers only. 

41 

Application Features 

**Figure 22** Fixed Reader GPO Programming 

## **Configuring Pre-Filters** 

Use pre-filters to identify tags to compare for tag filtering and determine where tag data is stored. 

**NOTE:** This feature is available for handheld readers only. 

Pre-filtering options include: 

- **Enable Filter** - enable or disable tag pattern pre-options based on standard RFID protocol. 

- **Tag Pattern** - specify the hexadecimal character pattern to compare for tag filtering. Pattern matching is based on the Offset value with a maximum of 64-byte hexadecimal characters. 

- **Target** - indicate which flag shall be affected when pre-filter is applied from the following: SESSION S0, SESSION S1, SESSION S2, SESSION S3, SL FLAG. 

- **Memory Bank** - specify the memory bank to apply the filter as EPC, TID, or User memory. 

- **Action** - indicate whether matching tags assert or de-assert SL (Selected Flag) or set their inventoried flag to A or to B. 

42 

Application Features 

## **Configuring Advanced Reader Parameters** 

Set all the advanced reader parameters, including setting antenna cable compensation values. 

**NOTE:** Advanced configurations differ depending on the reader type. Depending on the selected reader types, only the supported configuration tabs will be shown. 

43 

Application Features 

## **Figure 23** FXR90 Advanced Settings 

**1.** Select the **Enable Editing of Advanced Settings** checkbox to edit any parameter. 

**2.** Select an **Antenna Singulation** setting to specify the reader session. 

**3.** Select **State Aware** settings. 

   - **a.** Select the **Active** checkbox to enable these settings. 

**4.** Enter the expected **Tag Population** in the field of view of the antenna. 

**5.** Set Antenna Cable Compensation values: 

   - **a.** Specify the cable loss in terms of dB per 100 feet for the antenna cable used to connect the antenna port to the antenna. 

   - **b.** Specify the cable length in feet of the cable used to connect this antenna port to the antenna. 

**NOTE:** Setting a non-zero cable loss compensation value enables the reader to automatically increase the transmit power on this antenna port equivalent to the loss value specified. Setting an inappropriate value of cable loss can break the regulatory setting and is illegal. 

- **c.** Press Enter after entering the value in the textbox to set the cable loss compensation value. 

**NOTE:** Setting the cable loss compensation value requires restarting the reader server. The default antenna settings are applied after setting the cable loss compensation value. Accessing cable compensation values requires logging in to the reader. 

**6.** For the RFD40 and RFD90, specify the maximum storage size to allocate for a tag EPC ID. 

44 

Application Features 

## **Communication Settings** 

Configure Ethernet, Wi-Fi, and Bluetooth Settings for connected readers. 

Configurable Ethernet Settings include: 

- IPV Type 

- Obtain IPV4 Address via DHCP 

## **Ethernet** 

When DHCP is enabled the current values IP/IPV6 address, prefix length, subnet mask, default gateway, and DNS server settings are available. These settings are obtained from the DHCP server and cannot be changed manually. 

- **NOTE:** Ethernet configuration is available on fixed readers only. 

**Figure 24** FX Reader Ethernet Configuration 

When DHCP is off, the following fields are configurable for IPV4: 

- **IP Address** - provide the reader's assigned IP address. 

- **Subnet Mask** - provide the Subnet Mask for the network the reader resides in. 

- **Default Gateway** - provide the Default Gateway for the network the reader resides in. 

- **DNS server** - provide the DNS Server appropriate for the network the reader resides in. 

- **MAC Address** - specify the reader's MAC address. 

- **Domain Search** - specify the search domain appropriate for the reader. 

45 

Application Features 

**NOTE:** When DHCP is enabled, changes take effect after setting the properties. When DHCP is disabled, the user must set the appropriate network parameters, and changes take effect after setting the properties. 

When DHCP is off, the following fields are configurable for IPV6: 

- **IPV6 Address** - provide the reader's assigned IP address. 

- **Prefix Length** - provide the Prefix Length for the network the reader resides in. 

- **Default Gateway** - provide the Default Gateway for the network the reader resides in. 

- **DNS server** - provide the DNS Server appropriate for the network the reader resides in. 

- **MAC Address** - specify the reader's MAC address. 

**NOTE:** When DHCP is enabled, changes take effect after setting the properties. When DHCP is disabled, the user must set the appropriate network parameters for changes to take effect after setting the properties. 

## **Bluetooth** 

The reader supports automatic IP configuration of the Bluetooth interface. 

When a Bluetooth client is connected to the reader, the reader's IPV4 address, subnet mask, IPV6 address, and prefix length are viewable. These settings are automatically configured and cannot be changed manually. 

**NOTE:** Bluetooth configuration is available on fixed readers only. 

**Figure 25** FX Reader Network Settings 

46 

Application Features 

If a Bluetooth USB dongle is connected to the reader, the following Bluetooth properties are configurable: 

- **Discoverable** - determine whether the reader is viewable by other Bluetooth-enabled devices in discovery mode. 

- **Use Passkey** – enable the device to supply a predetermined passkey for authentication while pairing. 

- **Passkey** – used for authentication. 

- **DHCP Start Address** - the starting address of the DHCP IP range where an IP is assigned to the connecting device. 

- **DHCP End Address** - the end address of the DHCP IP range out of where an IP is assigned to the connecting device. 

- **NOTE:** The DHCP IP range specified as the DHCP start address and DHCP end address determines the IP of the reader's Bluetooth interface. 

**NOTE:** The first two octets of the reader Bluetooth interface's IP address are taken from the specified IP range, and the last two octets are formed using the reader BD address. 

## **Serial Port Configuration** 

**NOTE:** Serial Port configuration is available for FX9600 fixed readers only. 

Configurable Port Settings include: 

- **Free Port** - when enabled, this setting frees the serial port from internal usage and opens the port to be used by any application to send or receive data over the serial port. 

- **Debug Port (Default Configuration)** - configure the RS232 port as the Debug port to obtain kernel and system debug messages. 

47 

Application Features 

- **Push Data** - enables serial port configuration, inventory operations, and data to push over the serial console. 

## **Wi-Fi Configuration** 

Edit an existing Wi-Fi configuration or create a new one for RFD40 and RFD90 readers. 

**NOTE:** Wi-Fi configuration is available on handheld readers only. 

You will be prompted to provide the administrative credentials before you can view or edit the settings in the European region. 

**IMPORTANT:** For authorization password changes, refer to Authorization Session and Password Requirements on page 29. 

48 

Application Features 

49 

Application Features 

**1.** In the existing connection, click **Get Details** for information on the SSID, Mac Address, IP Address, and the Connection Status of the connected network. Or click **Disconnect** to disconnect from the network. 

**Figure 26** RFD40/90 Wi-Fi Configuration 

50 

Application Features ~~ee~~ 

**2.** To add a Wi-Fi profile and connect to an existing profile, select **Scan and Choose Network** , **Enter SSID** or **Choose existing profiles** and enter the following information: 

   - **SSID** - scan, select or enter the available networks. SSID shall be listed in the drop-down menu and 

      - can be refreshed on clicking . 

   - **Protocol** - the suggested protocol will be set when you select the SSID and can be changed. 

   - **Passkey** - enter the pre shared key for the WPA/WPA2 network. 

   - **EAP** - select the extensible Authentication Protocol. 

   - **CA Certificate** - click to add the installed CA certificate to the network. 

   - **Client Certificate** - click to add the installed Client certificate to the network. 

   - **Identify** - enter the identity/user name configured in the RADIUS server. 

   - **Anonymous Identity** - enter the Anonymous Identity/Username configured in the RADIUS server. 

   - **Password** - enter the password configured in the RADIUS server for the corresponding Identity/ Username. 

   - **Private Key** - click to add the installed private/client key certificate to the network. 

   - **Private Password** - enter the password to decrypt the private/client key. 

   - **Hidden Profile** - this option allows the reader to connect to a Wi-Fi network even if it is not available during scanning. 

   - **Preferred Wi-Fi** - select this option to make this Wi-Fi as the first choice to associate and connect. 

**NOTE:** Only SSID fields are required for the **Choose existing profiles** option. 

**3.** Click **Add** to add a network profile or click **Connect** to connect to a network. 

**4.** Click **Delete** to delete the selected network profile. 

**WARNING:** Users are responsible for configuring the Wi-Fi security modes on the RFD40/90 sleds according to their individual security requirements. To ensure compliance with the cybersecurity requirements of the EU Radio Equipment Directive (RED), Article 3.3 (d), use secure settings such as WPA3 Standard, WPA3_Personal_SAE, or WPA3_Enterprise_GCMP_256_SUITEB_192 to protect against security threats. Improper configuration may lead to vulnerabilities, and the manufacturer is not liable for any resulting damage or security breaches. 

**NOTE:** The recommended security mode for wireless security is to use the WPA3 Standard. 

- For Personal Networks, the preferred security mode is WPA3_Personal_SAE. 

- For Enterprise-Grade Networks, it is recommended to use A3_Enterprise_GCMP_256_SUITEB_192, which offers the highest level of security. 

RFD40/90 supports the following WPA2/WPA3 Personal and WPA2/WPA3 Enterprise protocols. 

51 

Application Features 

|**Protocol**|**Description**|**Support**|
|---|---|---|
|WPA2_Personal_CCMP|Uses the CCMP-128 AES Encryption with<br>PSK.<br>Hashing Algorithm used is HMAC-SHA1.<br>802.11w for WPA2 Personal is supported.|Supported|
|WPA3_Personal_SAE|Uses the CCMP-128 AES Encryption with<br>PSK (SAE).<br>Hashing Algorithm used is HMAC-SHA256.|Supported|
|WPA2_Enterprise_CCMP|Uses the CCMP-128 AES Encryption with<br>PMK derived from the EAP Authentication<br>exchange with RADIUS server.<br>Hashing Algorithm used is HMAC-SHA1.<br>PMF (Protected Management Frames) is<br>optional.|Supported|
|WPA3_Enterprise_CCMP|Uses the CCMP-128 AES Encryption with<br>PMK derived from the EAP Authentication<br>exchange with RADIUS server.<br>Hashing Algorithm used is HMAC-SHA256.<br>PMF (Protected Management Frames) is<br>Mandatory.|Supported|
|WPA3_Enterprise_GCMP_256_SHA256|Uses the GCMP-256 AES Encryption with<br>PMK derived from the EAP Authentication<br>exchange with RADIUS server.<br>Hashing Algorithm used is HMAC-SHA256.<br>PMF (Protected Management Frames) is<br>Mandatory.|Supported|
|WPA3_Enterprise_GCMP_256_SUITEB_192|Uses the GCMP-256 AES Encryption with<br>PMK derived from the EAP Authentication<br>exchange with RADIUS.|Supported|



## **End Point Configuration** 

Create, update, or delete an end point configuration for device management using SOTI and MDM. 

**NOTE:** This feature is available for handheld readers only. 

You will be prompted to provide the administrative credentials before you can view or edit the settings in the European region. 

**IMPORTANT:** For authorization password changes, refer to Authorization Session and Password Requirements on page 29. 

52 

Application Features 

**1.** To add a new end point configuration, click **New** , enter the values and click **Add** to save the values. 

53 

Application Features 

**2.** Create a new end point by providing the following information: 

**Figure 27** RFD40 End Point Configuration 

- **Type** - select the end point type. 

- **Protocol** - select the protocol type. 

- **URL** - provide the end point destination URL. 

- **Port** - enter the port number of the connection. 

- **Keep Alive** - enter the duration (s) to buffer messages when the connection is lost. 

- **Tenant ID** - enter the tenant ID. 

- **Clean Session** - enable or disable cleaning the session data of the connection. 

- **Reconnect Delay** - enter the minimum and maximum seconds before attempting to reconnect. 

- **Host Verify** - enable or disable verifying that the hostname in the certificate is valid for the host. 

- **User name** - enter the Basic Authentication user name, if required. 

- **Password** - enter the Basic Authentication password, if required 

- **CA Certificate** - select and add the CA Certificate. 

- **Client Certificate** - select and add the Client Certificate. 

- **Private Key** - select and add the Private key. 

- **Command Topic** - enter the basic Command topic. 

- **Response Topic** - enter the basic Response topic. 

- **Event Topic** - enter the basic Event topic. 

54 

Application Features 

**NOTE:** The **End point configurations list** shows all existing end point configurations. User can select an end point configuration to update. 

**3.** Click **Save** to save the selected configuration, or **Cancel** to cancel the current operation. 

**4.** Click **Delete** to delete the selected configuration, or **Delete All** to delete all existing configurations. 

**NOTE:** The default end point configuration displays on the application if there is no existing end point configuration. 

## **Endpoint Status Summary** 

This feature shows the status of the management endpoint configured in the reader. You can refresh the status of the endpoint by clicking **Refresh** . 

## **Certificate Management** 

Install or delete certificates on the reader by providing interface and certificate details. 

**NOTE:** This feature is available for handheld readers only. 

You will be prompted to provide the administrative credentials before you can view or edit the settings in the European region. 

**IMPORTANT:** For authorization password changes, refer to Authorization Session and Password Requirements on page 29. 

55 

Application Features 

**1.** Select the required interface. If you select a custom interface, you must provide a custom interface name. 

**2.** Select the required certification type. 

**3.** Click **Browse** and use the File Explorer to select the required certificate. 

56 

Application Features 

**4.** Click **Install** to install the new certificate. 

**Figure 28** Handeld Reader Certificate Management 

**5.** Click **Delete All** to delete all certificates, or click **Delete** to delete the selected certificates from the list. 

- **NOTE:** A maximum of 10 certificates can be installed. 

The 123RFID desktop application allows the user to select only the .pem certificate file for installation. 

57 

Application Features 

## **Configuring Reader Applications** 

Install or remove applications on the reader. 

**Figure 29** Fixed Reader User Applications 

## **Modifying Data** 

Create a data formatting rule to modify scanned and RFID data before its transmission to the host. 

**NOTE:** This feature is available for handheld readers only. 

58 

Application Features 

**1.** Navigate to the **Modify Data** section to access data formatting. 

**Figure 30** Handheld Reader Modify Data 

## **2.** Select **Prefix/Suffix Simple Formatting** 

**3.** Choose one of the following options to add a prefix or suffix to tag data. 

   - <PREFIX><DATA>: Select to append a prefix to the data. 

   - <PREFIX><DATA><SUFFIX1>: Select to append a prefix and suffix to the data. 

   - <PREFIX><DATA><SUFFIX2>: Select to append a prefix and suffix to the data. 

   - <PREFIX><DATA><SUFFIX1><SUFFIX2>: Select to append a prefix and two suffixes to the data. 

   - <DATA><SUFFIX1>: Select to append a suffix to the data. 

   - <DATA><SUFFIX2>: Select to append a suffix to the data. 

   - <DATA><SUFFIX1><SUFFIX2>: Select to append two suffix to the data. 

59 

Application Features 

**4.** Enter the prefix/suffix values: 

   - Prefix: Select the suffix type and enter the value to append to the data as the prefix. 

   - Suffix1: Select the suffix type and enter the value to append to the data as a suffix. 

   - Suffix2: Select the suffix type and enter the value to append to the data as a suffix. 

**NOTE:** Select a formatting setting to enter a value. 

**NOTE:** Data formatting is available in HID mode and applies to HID mode data. HID mode must be enabled after basic data formatting occurs. When the mode is updated, readers on the **Connect** tab are updated simultaneously. 

## **Scanning Configuration** 

Configurable scanning settings include enabling or disabling specific symbologies and enabling/disabling specific settings at the system level, such as transmitting the no-read message or the device’s trigger mode. 

**NOTE:** This feature is available for handheld readers only. 

- **Symbology Settings** – configure and enable/disable specific symbologies. 

- **System Settings** – configure and enable/disable specific settings at the system level, such as transmitting the no-read message or the device’s trigger mode. 

60 

Application Features 

**Figure 31** Handheld Scanning Configuration 

## **Offline Reader Configuration** 

Use the reader configuration wizard to configure RFID, symbology, bluetooth, beeper, and data settings on RFD4030 Standard, RFD40 Premium, RFD40 Premium Plus, and RFD90 readers. Save the configuration to a file on the PC or print a report. 

Click on the device icon to edit the offline reader’s configuration or click **Open configuration file** to load a saved configuration file from the PC to a reader. 

61 

Application Features 

**Figure 32** Configure Device Offline 

- Assign names to the reader and the connected antennas. 

- Set reader settings or reset them to factory defaults. 

- Change the reader’s region configuration. 

- Create rules for your GPIO (General Purpose Input/Output) accessories on when to trigger inventory and output results. 

- Save/print configurations to a file. 

- Deploy the configuration file to a new device. 

**NOTE:** Beeper volume, dynamic power, off mode timeout duration, and Bluetooth discovery settings are configurable for online readers only. 

62 

Application Features 

## **Reader Name** 

Add a description or name the reader by filling out the form fields on the name screen. 

## **RFID Reader Configuration** 

Configurable RFID options for offline readers include regulatory configuration, RFID data reporting, filter and querying options, trigger, and advanced options. 

**NOTE:** Ensure that the reader is configured for the correct region it is used in. Configuring the device for a different region is illegal. 

- Regulatory Configuration options include setting the country of operation and enabling or disabling Channel Hooping and Channel Mask. 

- RFID Data Reporting options include first and last-time-seen time stamps, RSSI, phase difference, unique tag reporting, and the total number of tags seen. 

- Advanced Configuration options include enabling Link Profile, configuring the RFID Transmit Power Level, and enabling dynamic power optimization. 

- Filter Options for up to four filters, including Filter enable, target, action, memory bank, truncate, length, start position, and mask. 

- Query options include selecting which tags, session, and target the query is applied to. 

- Trigger Configuration, such as defining RFID operations and the conditions in which they are initiated and stopped. 

63 

Application Features 

## **Figure 33** RFID Settings (Offline) 

64 

Application Features 

## **Scanning Configuration** 

Configurable scanning settings include enabling or disabling specific symbologies and enabling/disabling specific settings at the system level, such as transmitting the no-read message or the device’s trigger mode. 

**Figure 34** Scanning Configuration (Offline) 

65 

Application Features 

## **General Settings** 

General settings include batch mode, host type, HID keyboard, tag reporting, charging through the terminal (RFID40 and RFID90 UHF RFID handheld readers only), and timeout. 

**Figure 35** General Settings (Offline) 

66 

Application Features 

## **Modifying Data** 

You can create a data formatting rule to modify scanned and RFID data before its transmission to the host. 

**Figure 36** Modify Data (Offline) 

67 

Application Features 

## **Wi-Fi Configuration** 

Configure the Wi-Fi settings on the reader. 

**Figure 37** Wi-Fi Configuration (Offline) 

68 

Application Features 

## **Certificate Management** 

You can install or delete certificates on the reader and provide details of the installed certificates. 

**Figure 38** Certificate Management (Offline) 

69 

Application Features 

## **End Point Configuration** 

End Point Configuration, allows you to add, update or delete end point configurations for SOTI. 

**Figure 39** End Point Configuration (Offline) 

70 

Application Features 

## **Load and Print Configuration** 

- **Save configuration** - Save the configuration in encrypted .rfdcfg format. The user must enter the password to encrypt the file. 

- **Create Giga-DAT package** - Save the configuration to an encrypted Giga-DAT package (.EDAT). The user must enter the password to encrypt the Giga-DAT file. 

- **Email configuration file** - This option allows the user to email a saved configuration file. The user must enter the password to encrypt the file. 

- **Print or export summary report** - This option allows users to print or export summary reports of changed configurations. 

- **Print or export barcode report** - This option allows users to print or export parameter barcode reports of changed configurations. 

71 

Application Features 

## **Firmware Management** 

Update reader firmware on up to 20 devices of the same type simultaneously. 

**NOTE:** Go to zebra.com/support to download the latest device firmware. 

**1.** Select the checkbox of the device(s) and click **Update Firmware** . 

72 

Application Features 

## **2.** Click **Browse** to select the firmware version to enable on the device. 

**Figure 40** Update Reader Firmware 

The progress bar next to the associated reader indicates the completion percentage of the firmware update. 

73 

Application Features 

**NOTE:** The user must enter the password to update the firmware using an encrypted Giga-DAT file (.EDAT file). This applies to RFD40 and RFD90 devices. When asked to log in to the device, it indicates that only users with administrative privileges can perform a firmware update. Go to **Configure** > **Select the Reader** > **Login** to log in and update firmware. 

74 

Application Features 

## **RFID Sled Support for DataWedge Mode** 

The DataWedge mode enables RFD40+ (Premium Plus models) and RFD90 RFID sleds to connect to the scanning framework, making the devices capable of capturing data from various input sources. This section describes how to configure RFID sleds for DataWedge mode. 

Prerequisites: 

- RFID Sled firmware version 006-R01 or higher. 

- 123RFID Desktop version 2.0.1.28 or higher. 

- DataWedge 13.0 or higher. 

**1.** If needed, perform a factory reset to the RFID sled. Pull the trigger to scan the Restore Defaults barcode. 

**2.** Allow the sled to reboot. The default factory settings are in place when the sled powers back on. 

**3.** To configure the country of operation, click **Configure** > **RFID** > **Regulatory Configuration** > **Country of Operation** . Select the country from the drop-down menu. 

75 

Application Features 

**4.** To configure to Datawedge, click **Configure** > **GENERAL** > **General Settings** > **Bluetooth Host Type** > **DataWedge** . 

**5.** Generate the barcode report by clicking **Configure** > **LOAD AND PRINT** > **Print or export barcode report** . 

Example of a generated barcode report. 

**6.** Open the **Bluetooth Pairing Utility** on the Android device (RFID sled). 

76 

Application Features 

**7.** Scan the generated pairing barcode using the RFID sled. 

77 

Application Features 

## **8.** Tap **PAIR** to connect. 

78 

Application Features 

**9.** At this point, the sled is configured to function similarly to a Zebra Bluetooth scanner. 

79 

Application Features 

**10.** For quick testing, open **DWDemo** (or any applications that accept data input) and scan the following sample barcode. 

The barcode result displays. 

**11.** You can also use DWDemo to test RFID function. 

**12.** Open **DataWedge** settings. 

**13.** Select the **DWDemo** profile. 

80 

Application Features 

## **14.** Enable **RFID Input** . 

81 

Application Features 

**15.** Tap on **Reader selection** and enable the RFID sled. 

82 

Application Features 

**16.** Go back to **DWDemo** and scan for RFID tags. 

The RFID result displays. 

## **Default Password Change** 

Enhance security by updating the default credentials to a strong and unique password. 

## **Default Password Change for FX Readers** 

This option allows you to change the default password if you are setting up the reader for the first time or trying to connect after a factory reset. 

## **Changing the Default Password When Reader LLRP is Available** 

If the Low Level Reader Protocol (LLRP) is available and the reader is connected to the 123RFID Desktop application, the change password windows will be accessible under any Reader Management (RM) functionality's User Interface (UI) tab. 

**1.** Connect the reader to the 123RFID Desktop application. 

**2.** Navigate to any RM functionality UI tab, such as the Region, Communication, License, and Applications. 

83 

Application Features 

**3.** Log into the RM, enter the default password, and click **Login** . 

**4.** After logging in, the change password window displays. 

**5.** Enter the old password, the new password, the confirm password, and click **Update** . 

84 

Application Features 

## **Changing the Default Password When Reader LLRP is Not Available** 

If the LLRP is not available, you can change the default password through RM login. 

**1.** When the LLRP is unavailable, connecting to the reader will fail, and you will be given the option to log into RM. 

**2.** Enter the default password and click **Login** . 

85 

Application Features 

**3.** After logging into RM, the change password window displays. Enter the old password, the new password, the confirm password, and click **Update** . 

## **Default Password Change for FXR90 Readers** 

This section describes how to change the default password for FXR90 Readers. 

**1.** Connect to an FXR90 reader by entering the default password. 

86 

Application Features 

**2.** After logging in, the change password window displays. Enter the old password, the new password, the confirm password, and click **Update** . 

87 

## **Troubleshooting** 

This section describes potential issues that could arise while using 123RFID Desktop with Zebra fixed and handheld readers and solutions that could correct the problem. 

**Table 2** Device Troubleshooting 

|**Problem**|**Cause**|**Solution**|
|---|---|---|
|The RFID sled does not read<br>tags.|The RF region configuration is<br>not set.|Use the 123RFID Desktop or<br>123RFDID Mobile application<br>to set the regulatory region<br>or country operation per the<br>application instructions.|
|The RFID sled is attached<br>to a mobile device and is<br>not responsive to an RFID<br>application, even after the trigger<br>is pressed.|The battery is too low and not<br>able to power the RFID sled.|Press the trigger for a few<br>seconds to power the RFID sled<br>On. The RFID sled LED blinks<br>amber when it is turned On. (By<br>default, pressing the trigger turns<br>On the RFID sled if it is in Off<br>mode. However, the RFID sled<br>can be disabled, in which case<br>this step is unnecessary.) Place<br>the RFID sled in the charging<br>cradle. The RFID sled blinks<br>amber LEDs, indicating charging<br>commenced.|
||The Zebra-supported mobile<br>computer is not correctly<br>inserted in the RFID sled.|Ensure the Zebra-supported<br>mobile device is securely in the<br>RFID sled, and the USB cable is<br>correctly inserted.|
||Damaged battery.|If the sled LED does not blink<br>amber after sitting on the<br>charging cradle, contact Zebra<br>Service to request a battery<br>replacement.|
|The sled is responsive but<br>cannot read tags.|The battery is critically low.|Place the RFID sled in the<br>charging cradle. The RFID Sled<br>LED blinks amber. The RFID sled<br>can be used when its LED turns<br>on momentarily amber or green<br>upon removal from the charging<br>cradle.|



88 

Troubleshooting 

**Table 2** Device Troubleshooting (Continued) 

|**Problem**|**Cause**|**Solution**|
|---|---|---|
|The sled LED blinks fast and<br>amber when in the cradle.|Charging error.|Restart charging by removing<br>the RFID sled from the cradle<br>and reinserting it. If the<br>issue persists, contact Zebra<br>Service to request a battery<br>replacement.|
|The sled LED blinks red, or LED<br>blinks red, alternating with green<br>or amber while in use (not while<br>charging).|Battery end-of-life indication.|Contact Zebra Service to request<br>a battery replacement.|
|Zebra-supported mobile<br>computer battery is not charging.|The charging cradle was<br>unplugged from AC power.|Ensure the charging cradle is<br>receiving power.|
||The Zebra-supported mobile<br>computer is not fully seated in<br>the cradle.|Remove and reinsert the Zebra-<br>supported mobile computer into<br>the cradle, ensuring it is firmly<br>seated in the charging cradle.|
|**Data Communication**|||
|During data communication<br>with a host computer, no data<br>transmitted or transmitted data is<br>incomplete.|Sled removed from cradle during<br>communication.|Replace the sled in the cradle<br>and re-transmit.|
||Incorrect cable configuration.|Consult the system<br>administrator.|
||Communication software<br>was incorrectly installed or<br>configured.|Perform setup.|
|During data communication over<br>Bluetooth, no data transmitted or<br>transmitted data was incomplete.|The Bluetooth radio is not on.|Turn on the Bluetooth radio.|
||The sled moved out of range of<br>another Bluetooth device.|Move within 10 meters (32.8 feet)<br>of the other device.|
|**Decode**|||
|The sled does not decode with a<br>reading barcode.|The scanning application is not<br>loaded.|Load 123RFID Mobile on the<br>device or 123RFID Desktop<br>on the PC. See the system<br>administrator.|
||Unreadable barcode.|Ensure the symbol is not<br>defaced.|
||The distance between the exit<br>window and the barcode is<br>incorrect.|Place the device within the<br>proper scanning range.|
||The device is not programmed to<br>generate a beep.|If the sled does not beep on a<br>good decode, set the application<br>to generate a beep on a good<br>decode.|
||The battery is low.|Check the battery level if the<br>sled stops emitting a laser beam<br>upon a trigger press. When the<br>battery is low, the sled shuts off<br>before the low battery condition<br>notification.|



89 

Troubleshooting 

**Table 2** Device Troubleshooting (Continued) 

|**Problem**|**Cause**|**Solution**|
|---|---|---|
|**Bluetooth**|||
|The device cannot find any<br>Bluetooth devices nearby.|Too far from other Bluetooth<br>devices.|Move closer to the other<br>Bluetooth device(s) within a<br>range of 10 meters (32.8 feet).|
||The Bluetooth device(s) nearby<br>are not turned on.|Turn on the Bluetooth device(s).|
||The Bluetooth device(s) are not<br>in discoverable mode.|Set the Bluetooth device(s) to<br>discoverable mode.|



90 

www.zebra.com 

