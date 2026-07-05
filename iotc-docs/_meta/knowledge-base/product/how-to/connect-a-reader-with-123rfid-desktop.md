# Connecting a Zebra Handheld RFID Device using 123RFID Desktop
## Introduction

This comprehensive guide provides step-by-step instructions on how to discover, connect, and
configure a Zebra handheld RFID reader (such as the RFD40 or RFD90) using the 123RFID
Desktop utility. The guide covers establishing a direct connection via Bluetooth or USB,
configuring a stable Wi-Fi network connection, and setting up an MQTT endpoint for data
communication.


123RFID Desktop is a unique Windows utility that makes deploying a Zebra RFID reader simple
and intuitive without requiring expert-level knowledge.
## Prerequisites


- A Zebra handheld RFID device (e.g., RFD40 or RFD90).

- A PC with Windows OS and the 123RFID Desktop application installed.

- Wi-Fi network credentials (SSID, protocol type, passkey).

- MQTT broker connection details (URL, port, etc.).
## Phase 1: Discover and Connect the Reader


Before configuring Wi-Fi or MQTT, you must first discover and connect the reader to your PC via
a direct connection.


1. **Launch the Application** : Open the **123RFID Desktop** application. The Welcome screen will
appear.
2. **Initiate Discovery** : Click the **FIND READERS** button on the main screen.


3. **Select Connection Type** : In the Reader Discovery screen, click the **Bluetooth icon** (or USB if
connecting directly via cable) to scan for nearby devices.


4. **Choose Your Device** : An "Add a device" pop-up window will open. Select the correct
handheld reader from the list. Verify that the serial number displayed matches the serial
number printed on your physical device.
5. **Confirm Selection** : Click **Next** .


6. **Connect** : Locate your device in the "Available Readers" list and click the green **CONNECT**
button next to it.


7. **Verify Connection** : Once connected, the handheld reader will move from the bottom list to
the **Connected Readers** section at the top of the interface.


## Phase 2: Configure Wi-Fi Connectivity

For MQTT and other network-dependent protocols to function in a production environment, the
reader requires a stable network connection. Wi-Fi is the simplest way to provide this
connectivity.


8. **Open Configuration** : Click the **Configure** icon (gear symbol) from the left-hand navigation
panel.
9. **Select Reader** : The Reader Configuration window will appear. Click on the picture of the
connected reader to edit its settings.


10. **Edit Configuration** : A page will open with two buttons. Click the **Edit Configuration on**

**Reader** button.


11. **Navigate to Communication** : From the left-hand menu in the settings view, select

**Communication** .


12. **Access Wi-Fi Settings** : The Wi-Fi Configuration window will open by default.
13. **Add Network** : Select the **Scan and Choose Network** radio button to search for available

networks. Select your desired network's SSID from the drop-down list. Alternatively, you can
use "Enter SSID" to input a hidden network manually.


14. **Enter Credentials** : Choose the appropriate protocol (e.g., WPA2_Personal_CCMP) and enter

the correct passkey.
15. **Connect to Wi-Fi** : Click **Add**, and then click **Connect** .


16. **Verify Network** : Check the "Existing Connection" section. It should now display the

Connected network name (SSID), assigned IP Address, MAC Address, and the Status should
show as "Connected".
## Phase 3: Add an MQTT Endpoint


Configure the MQTT broker to send and receive commands using the End Point Configuration
screen.


17. **Navigate to End Point Tab** : While still in the Communication section, click on the **End Point**

tab at the top.


18. **Create New Endpoint** : Select the **New** button on the right side of the screen.


19. **Fill in Configuration Details** : Enter the required connection details for your MQTT broker.

Below is a reference table for the configuration fields:


|Field|Description|
|---|---|
|**Type**|Select MQTT (other optons may include SOTI<br>or MDM).|
|**Protocol**|The transport protocol (MQTT or MQTTS).|
|**URL**|The broker URL or IP hostname.|
|**Port**|1883 for standard MQTT or 8883 for<br>TLS/secure MQTT.|
|**Keep Alive**|Interval (in seconds) used to keep the<br>connecton actve.|
|**Tenant ID**|Prefx applied to all MQTT topics.|
|**Clean Session**|Check to start a fresh session on each<br>connecton.|
|**Host Verify**|Validates the broker hostname (used for TLS<br>connectons).|
|**Command Topic**|Topic where the device receives commands<br>(default: MDM/clients/cmnd).|
|**Response Topic**|Topic where the device publishes responses|


|Col1|(default: MDM/clients/resp).|
|---|---|
|**Event Topic**|Topic where the device publishes alerts/tags<br>(default: MDM/clients/event).|


_Note: Command Topic, Response Topic, and Event Topic are optional. If left blank, default values_
_are automatically populated when you select Add._


20. **Add Endpoint** : Once all required fields are filled, click **Add** . The newly created endpoint will

appear in the endpoint list at the bottom of the screen.


21. **Activate Endpoint** : Select the **Activate** checkbox in the row corresponding to your new

endpoint.


22. **Verify Status** : Under the "Endpoint Status" section, select **Refresh** to confirm that the

connection has been successfully established and reads "Connected".


23. **Save** : Click **Save** to commit all your new configurations to the reader.


Your Zebra handheld RFID reader is now successfully connected to your network and actively
communicating with your MQTT broker.


