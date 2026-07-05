---
title: MDM and SOTI interfaces for RFD40/RFD90
diataxis: reference
audience: [FLEET-IT, OPS, DEV]
product: RFD40/RFD90 IoT Connector (IOTC) — device management surface
source: "RFD40/90 – MDM Deep Dive" capability briefing
---

# MDM and SOTI interfaces for RFD40/RFD90

> **Diátaxis — Reference (information-oriented).** What Mobile Device Management (MDM) means for RFD40/RFD90 sleds: Generic MDM via the documented IOTC APIs, SOTI Connect integration, and the device/radio/data management capabilities exposed over MQTT.
>
> _Provenance: converted from the "RFD40/90 – MDM Deep Dive" capability briefing (slide export). Slide-number markers and empty speaker-note placeholders were stripped during the Diátaxis reorganization; all substantive text is retained verbatim._

---

RFD40/90 – MDM  Deep Dive

What is MDM ?
Mobile Device Management (MDM) is a type of software solution designed to manage, monitor, and secure mobile devices such as smartphones, tablets, laptops,  handheld-IOT enabled devices within an organization.
MDM plays a critical role in ensuring devices are used securely and efficiently. The main goal of MDM is to optimize the functionality and security of mobile devices within the corporate environment

Purpose of MDM
Security
Device Management
Policy Enforcement
Operational Efficiency
User Experience

1


RFD40/90 – MDM  Deep Dive

RFD40/90 IoT Connectivity
The RFD40/90 devices enhance IoT connectivity by utilizing the MQTT protocol through a predefined set of APIs. These devices support various IoT solutions to optimize device and data management:

Device Management:
Generic MDM: Offers robust device management capabilities through a standardized set of APIs.
SOTI Integration: Seamlessly integrates with SOTI MDM solutions for enhanced device control and security.

Device Control: (Proof of Concept scheduled for release in Q2 2025)
Radio Configuration: Allows users to configure various operating modes and radio parameters, ensuring optimal performance.
Inventory Management: Provides the ability to start and stop inventory processes as needed.
Filter Configuration: Supports the setup of pre- and post-filters to refine data collection and processing.

Data Management: (Proof of Concept scheduled for release in Q2 2025)
RFID Data Configuration: Facilitates the configuration of IoT endpoints for RFID tag data, ensuring efficient data flow and management.

These capabilities position the RFD40/90 as a comprehensive solution for IoT connectivity, offering flexible and configurable options to meet diverse operational needs.

RFD40/90 – MDM  Deep Dive

Generic MDM Overview
Generic MDM is a versatile device management solution designed to support a wide range of devices through a defined set of IoT Connector (IOTC) APIs. These APIs have been meticulously documented to facilitate integration and management tasks.
Device Management APIs: A comprehensive set of IOTC APIs has been developed and documented to streamline device management processes.
Sled Enrollment: Detailed procedures for creating and enrolling sleds are available, and these processes are supported by the 123RFID applications, ensuring seamless integration.
Current Implementations: The company 42 Gears has implemented these generic MDM APIs, showcasing their practical application and effectiveness.


RFD40/90 – MDM  Deep Dive

Generic MDM Overview
API Documentation: Currently, the API documentation is not publicly hosted online. Instead, it is shared with MDM partners upon request. However, there are plans to make this documentation available on the website in the future.
Ease of Use: Generic MDM offers a set of simple, lightweight APIs that are user-friendly and designed for ease of implementation. These APIs are continually refined based on user feedback to improve functionality.
User Configurability: Most parameters within the Generic MDM are highly configurable, allowing users to tailor the solution to their specific needs. These configurations can be managed through the 123RFID applications.
This approach to device management ensures flexibility and adaptability, catering to a wide range of organizational needs while maintaining ease of use and configurability

RFD40/90 – MDM  Deep Dive

SOTI MDM Overview
SOTI MDM is a comprehensive device management solution tailored for SOTI, offering functionality similar to Generic MDM but with slight variations in API definitions and configuration parameters.
API and Configuration Adaptations:
While maintaining core functionalities akin to Generic MDM, SOTI MDM includes specific modifications to API definitions and configuration settings to enhance its integration capabilities.
Sled Enrollment:
The 123RFID applications facilitate the enrollment of sleds into the SOTI cloud, streamlining the process and ensuring seamless connectivity.
User Configuration:
In SOTI MDM, the majority of parameters are pre-configured for user convenience. Users are required to set only a few essential parameters, simplifying the setup process and enhancing user experience.
This approach ensures that SOTI MDM provides a robust and user-friendly solution for managing devices efficiently within an organizational context.

1. IOTC APIs documentation https://friendly-adventure-3jvjew4.pages.github.io/#
2.

RFD40/90 – MDM  Deep Dive

SOTI Demo
To connect to the SOTI cloud, the following information is required:
SOTI MQTT Broker URL
Port Number
MQTT Broker Username & Password
Certificates
SOTI Identity Login Credentials (accessible at https://identity.soti.net )
Tenant ID (optional)

For assistance with obtaining SOTI login credentials, please contact:
	Zebra: Mary Jo (mary.jo.serrino@zebra.com)
	SOTI: Johann (Johann.Thalakada@soti.net)

1. IOTC APIs documentation https://friendly-adventure-3jvjew4.pages.github.io/#
2.

RFD40/90 : WiFi Overview

RFD40/90 WiFi Specifications
The RFD40/90 series UHF RFID sleds are equipped with advanced Wi-Fi 6 connectivity, supporting a range of IEEE protocols including802.11ax/ac/a/b/g/n in a 2x2 MU-MIMO configuration, and IPv4 compatibility. This ensures robust and efficient wireless performance suitable for high-demand environments.

Data Rates:
5 GHz Band: Achieves PHY data rates up to 1.2 Gbps, providing high-speed connectivity for demanding applications.
2.4 GHz Band: Supports PHY data rates up to 458 Mbps, ensuring reliable performance in various operational settings.
Security Protocols:
Personal Security: Supports WPA, WPA2, and WPA3 Personal protocols for enhanced security in personal network configurations.
Enterprise Security: Offers WPA, WPA2, and WPA3 Enterprise protocols, including advanced features such as GCMP 256 encryption with SHA256 and Suite B 192 support for robust enterprise-level security.

These specifications highlight the RFD40/90’s capability to deliver high-speed, secure wireless connectivity, making them ideal for modern IoT and enterprise applications.

RFD40/90 : WiFi Configuration

As a headless device, the RFD40/90 series utilizes the 123RFID companion applications or applications developed with the 123RFID SDK to configure WiFi settings. These applications offer a robust set of options to manage connectivity:

Network Scanning and Selection: Easily scan for and connect to available WiFi networks, streamlining the setup process.
Profile Configuration: Manually configure WiFi profiles for personal, enterprise, and hidden networks, ensuring comprehensive connectivity support.
Profile Retrieval: Access and manage saved WiFi profiles directly from the device, facilitating seamless network management.
Protocol Selection: Choose the appropriate security protocol to ensure compatibility and security across various network types.
Preferred Profile Selection: Designate preferred WiFi profiles to prioritize connections according to your specific operational requirements.
Dynamic Frequency Selection (DFS): DFS is a Wi-Fi technology feature that enables devices to automatically switch to a different radio frequency channel when a radar signal is detected, ensuring minimal interference and optimal performance. Users have the flexibility to select from the following channel options:
2.4 GHz WLAN Channels: Offers a range of channels suitable for standard wireless networking needs.
5 GHz WLAN Channels: Provides a broader spectrum of channels, ideal for high-performance applications and environments requiring reduced interference.
These features provide the flexibility and control needed to optimize WiFi connectivity for the RFD40/90 series, making it adaptable to a wide range of network environments.


Configuring WiFi Profile using 123RFID desktop application
Open the 123RFID Desktop Application and connect your RFD40/90 device.
Navigate to the Configuration section and select the Communication option.
Click on the WiFi tab to access WiFi settings.

*(figure omitted — image not bundled with this corpus; see the original slide deck)*

Configuring WiFi Profile using 123RFID desktop application
Choose the “Scan & Choose Network” option to search for available WiFi networks. Once the scan is complete, use the dropdown menu to select your desired network.

*(figure omitted — image not bundled with this corpus; see the original slide deck)*

Configuring WiFi Profile using 123RFID desktop application
Choose the appropriate WiFi SSID and select the correct security protocol. Enter the network password, then click “Add” to save the profile to the device. To save the profile configuration and connect to the SSID, click “Connect.”

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


Configuring WiFi Profile using 123RFID desktop application
After the device connects to the selected WiFi profile, you can view the connection details, including the SSID name, MAC address, connection status, and IP address, as shown below.

If the connection details do not appear, you can retrieve them by selecting the “Get Details” option.

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


Configuring WiFi Profile using 123RFID desktop application
To disconnect from the current WiFi profile, select the “Disconnect” option.
User can switch to previously saved profile by selecting existing saved profile & selecting “Connect option”

*(figure omitted — image not bundled with this corpus; see the original slide deck)*

Configuring WiFi Profile using 123RFID desktop application
Once Device gets connected to selected WiFi Profile, User can select the option “Preferred WiFi” option to configure selected SSID as default one, to which device tries to connect always upon device reboot

Configuring the preferred SSID enables faster wifi connection with minimal delay, by eliminating the delay involved in selecting the one of profile with best RSSI among the saved profiles

*(figure omitted — image not bundled with this corpus; see the original slide deck)*

RFD40/90 : WiFi DFS channels, Hidden Profile Configuration
Dynamic Frequency Selection (DFS) channels are specific channels within the 5 GHz band that are also used by radar systems (e.g., weather radars, military applications). DFS is a regulatory requirement designed to prevent WiFi networks from interfering with these radar systems.

Utilizing DFS channels can optimize network performance by taking advantage of less crowded frequencies, but it requires devices and access points that support DFS functionality. When setting up a WiFi network, understanding and configuring both standard and DFS channels can help maximize performance and reliability.

The DFS channel numbers and frequencies differ by region and are selected according to the sled’s regional configuration settings.

Users can choose from the following options:
2.4 GHz: Enable all 2.4 GHz WiFi channels (enabled by default).
5 GHz Non-DFS: Enable all 5 GHz non-DFS WiFi channels (enabled by default).
5 GHz DFS: Enable all 5 GHz DFS WiFi channels (disabled by default).

Hidden Profile Configuration:
A WiFi hidden profile is a network setup where the SSID is not broadcasted, meaning the network does not appear in the scanned list of available networks. To connect, users must manually enter the network details and designate the profile as hidden during configuration.

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


RFD40/90 : Enterprise WiFi Profile configuration

Steps to configure the enterprise wifi profiles is almost same as that of personal profiles,  with some additional details.

If user selects the enterprise protocol, then additional fields to input the certificate details will be shows up, where user needs to configure appropriate certificate details

RFD40/90 : WiFi connection Troubleshooting

Case 1: When the Required WiFi Profile Is Not Listed in the Available Networks
Potential Issues and Solutions:
Hidden Network:
Explanation: The WiFi profile may be part of a hidden network, meaning its SSID is not broadcasted and will not appear in the scanned list.
Solution: Manually enter the network details, including the SSID and security credentials, to connect to the hidden network.
Weak Signal Strength:
Explanation: The WiFi network’s signal may be too weak to be detected during the scan, possibly due to distance from the access point or obstructions.
Solution: Move closer to the WiFi access point and rescan to improve detection. Consider checking for physical barriers or interference sources.
Access Point Turned Off:
Explanation: The WiFi access point might be powered off or experiencing a malfunction, preventing it from broadcasting the network.
Solution: Verify that the access point is powered on and functioning correctly. If possible, restart the access point to reset the broadcast.
Profile Detected on Other Devices:
Explanation: If the WiFi profile is visible on other devices, such as a smartphone, but not on your current device, it may indicate a temporary scanning issue.
Solution: Re-initiate the network scan multiple times to ensure the profile is detected. It may take several attempts for the device to recognize the network, especially if it was recently added or changed.
By systematically checking these points, you can diagnose and resolve the issue of a missing WiFi profile, ensuring successful connectivity.

RFD40/90 : WiFi connection Troubleshooting

Troubleshooting Steps for Connection Issues with Saved  WiFi Profile

Step 1: Verify Network Credentials
Correct Password & certificates: Ensure the saved password & certificates are  correct. A change in the network password requires updating the saved profile. If there any change in WiFi certificates, then new set of certificates needs to be uploaded to device
SSID Check: Confirm that the SSID in the saved profile matches the network name exactly, including any letter case differences.

Step 2: Signal Strength and Interference
Signal Quality: Check the signal strength. If weak, try moving closer to the router to improve connection stability.
Interference Sources: Identify and reduce interference from other electronic devices, such as microwaves or cordless phones, which can disrupt the WiFi signal.

Step 3: Network Settings and Configuration
Network Status: Verify that the WiFi network is active and operational by checking with another device.
Router Configuration: Ensure that the router is configured to allow connections from your device. Some routers have settings that restrict access based on MAC address or other criteria.

Step 4: Device Configuration
Profile Accuracy: Review the saved WiFi profile settings on your device for accuracy. Any discrepancies, especially in security settings, can prevent connection.
Network Selection: Make sure the device is attempting to connect to the correct SSID, especially in environments with multiple networks.

RFD40/90 : WiFi connection Troubleshooting

Troubleshooting Steps for Connection Issues with Saved WiFi Profile

Step 5: Restart and Reset
Reconnect: Disconnect from the network and reconnect or restart the device to reset the network connection.
Router Restart: Consider restarting the router to resolve any temporary issues affecting connectivity.

Step 6: Update Software and Firmware
Device Updates: Check if there are any available updates for RFD40/90, as these can fix bugs affecting network connectivity.
Router Firmware: Ensure the router firmware is up-to-date, as updates can enhance performance and fix connectivity issues.

Step 7: DHCP server related issues
Issue : When RFD40/90 device does not assigned with correct IP address, user can see blinking Amber WiFi LED light
Solution: Restart sled, Check DHCP server status, check for IP conflicts

RFD40/90 : WiFi connection Troubleshooting

Troubleshooting Steps for WiFi Profile not saved

Step 1:  Check the SSID length
Limitation: Sled restricts the SSID length to 32 characters only.
Solution: Limit the SSID length to 32 characters only

Step 2: WiFi Profile not saving
Limitation: In RFD40/90 user can tore up to 10 WiFi profiles only. Size of wifi certificates is limited to 4K
Solution: Check no of profiles stored and delete unused profiles if not required

RFD40/90 : SOTI connection Troubleshooting

Troubleshooting the Network Connectivity
Make sure the Sled connected to WiFi
Check is it endpoint URL is resolvable or not.
Connect laptop /desktop to same network to which Sled is connected
Open command prompt and ping to URL
Ping should be successful
Make sure the is no firewall or MAC based blacklisting configuration is enabled
Make sure the ports used in MQTT connection are open – Check with network system admins or use command “netsh advfirewall firewall show rule name="Allow MQTT"”

To confirm if it not network issue - use mobile hotspot to verify if end to end connectivity works.

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


RFD40/90 : SOTI connection Troubleshooting

Troubleshooting the TLS verification failure due to invalid time
Since RFD40/90 does not have on device cell for RTC backup, time will be reset to default when performed factory reset. Time will be updated through SNTP if sled connected to network & configured timeservers are reachable.
Check device time using 123desktop app: Connect to the device using 123RFID, navigate to Configure in the sidebar, and select General Settings under NTP Server Settings to check the time
If time is not up to date use different time servers if available or update time using 123 RFID app

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


RFD40/90 : SOTI connection Troubleshooting

Troubleshooting Certificate-Related Issues for the RFD4090

When dealing with certificate-related issues on the RFD4090, it’s essential to ensure proper format and configuration settings. The device supports specific certificate formats and configurations, which must be adhered to for successful connectivity and authentication. Here’s a detailed guide to troubleshooting these issues:

Certificate Size Limitations:
The RFD4090 supports certificates with a maximum size of up to 4K. Ensure that your certificates do not exceed this size to prevent loading errors or connectivity issues.

Supported Certificate Format:
The device exclusively supports certificates in PEM format. This format is widely used for encoding digital certificates and includes headers and footers (e.g., -----BEGIN CERTIFICATE----- and -----END CERTIFICATE-----).

Required Certificate Components:
Make sure you have the necessary certificate components:
CA Certificate: The Certificate Authority (CA) certificate that authenticates the identity of the server.
Client Certificate: This certificate identifies the client device to the server.
Client Key: The private key associated with the client certificate, used for encryption and decryption processes.
Encoding Format:
Certificates must be encoded using the PKCS1 format. PKCS1 is a standard that specifies the syntax for public-key cryptography, particularly RSA cryptography, which must be used for the RFD4090.

Correct Naming in Configuration:
Ensure that the correct certificate names are used in the Generic MDM endpoint configuration. Incorrect naming can lead to authentication failures or inability to establish secure connections.
By verifying these aspects, you can effectively troubleshoot and resolve any certificate-related issues on the RFD4090, ensuring secure and reliable device communication.


RFD40/90 : SOTI connection Troubleshooting

Troubleshooting the connection related issues – Using MQTT client tools
If RFD4090 is not connecting to SOTI cloud, please use below method to verify the connection parameters.
Use tools  like MQTTX mqtt client tools to connect to SOTI cloud
Enter details like URL, Port, And provide path to CA or Self sighed certificate provided by SOTI & try to connect

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


RFD40/90 : SOTI connection Troubleshooting

Troubleshooting the connection related issues – Using MQTT client tools
If RFD4090 is not connecting to SOTI cloud, please use below method to verify the connection parameters.
Use tools  like MQTTX mqtt client tools to connect to SOTI cloud
Enter details like URL, Port, And provide path to CA or Self sighed certificate provided by SOTI & try to connect
Check is it connection is going through or not.
If connection is not going through, then there is issue with connection parameters or certificate. Inform to SOTI/Zebra support team
Meanwhile check for network related issues described in previous slides
If connection is successful user will see get connected notification

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


RFD40/90 : SOTI connection Troubleshooting

Troubleshooting the connection related issues – Using MQTT client tools
If connection is successful user will see get connected notification
Add MQTT subscription topic using wild card like “<Tenant ID>/#”
Ex : “1c385328-0466-4c69-ad8f-a27fe51d713a/#”
If Sled connected to soti cloud we can see CONNECT message sent out from device.
Use the device serial number to identify the messages

*(figure omitted — image not bundled with this corpus; see the original slide deck)*


RFD40/90 : SOTI connection Troubleshooting

Troubleshooting commands
1. Login to device ZETI console using TeraTerm/Putty/MobaXterm/ ( Find the com port number using 123 desktop app & close the application)
2. Enter below commands
	cn 	## Command to login to device console
	sa .ee 	## To echo back user entered text
	gd .iot	## To Check IOT connection status
Below is the output of command gd .iot

*(figure omitted — image not bundled with this corpus; see the original slide deck)*

RFD40/90 : SOTI connection Troubleshooting

Troubleshooting commands continued
To verify the endpoint configurations

Login to device ZETI console using TeraTerm/Putty/MobaXterm/ ( Find the com port number using 123 desktop app & close the application)

Enter below commands
	cn 	## Command to login to device console
	sa .ee 	## To echo back user entered text
	epcf .n	## To retrieve active management endpoint configuration details
	epn	## To list all the stored endpoint names
	epcf .n .epname <end point name> ## To retrieve details of specific endpoint
	iotconfig .n  ## to get the current active endpoint names

	To get more details about each command use help <command_name>

	help  epcf
	help iotconfig

Below is the command output, which shows that MGMT endpoint SOTI_ACTIVE configuration details. Passwords are not displayed for security reason

RFD40/90 : SOTI connection Troubleshooting

Troubleshooting commands
Below is the O/P from the above-mentioned commands
Command “epcf .n” grabs the MGMT endpoint configuration details in this case it is SOTI endpoint
Command “epn” displays all saved endpoints
Command “iotconfig .n” shows active endpoint configuration. In SOTI case SOTI_ACTIVE endpoint is marked as active management endpoint

*(figure omitted — image not bundled with this corpus; see the original slide deck)*

RFD40/90 : SOTI connection Troubleshooting

Troubleshooting commands
If connection is not going through use below commands to capture debug information & same for further debugging
	cn 	## Command to login to device console
	sa .ee 	## To echo back user entered text
	epcf .n	## To retrieve active management endpoint configuration details
	epn	## To list all the stored endpoint names
	epcf .n .epname <end point name> ## To retrieve details of specific endpoint
	iotconfig .n  ## to get the current active endpoint names
	as .a 2280 .t B .u 0		## Enable debugginhg logs
	cc .m saveconfig 		## Save above configuration
	rs	## Reboot device

	## After device reboots connect to com port again and capture logs using below commands
	log .o 2 .c 3  	## Capture logs & share for further debugging

	To get more details about each command use help <command_name>

	help  epcf
	help iotconfig

RFD40/90 : Resources
Troubleshooting commands
SOTI IOT APIs documentation
Generic IOT APIs documentation
