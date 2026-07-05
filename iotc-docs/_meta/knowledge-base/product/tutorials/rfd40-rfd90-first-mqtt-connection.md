# Get started

This guide shows you how to connect a Zebra RFD40 or RFD90 handheld RFID reader to an
MQTT broker, then send your first command. Follow the steps in order. If your reader is
already provisioned, skip to [Topic structure.](https://markdowntohtml.com/#topic-structure)


**Discover and connect the reader**


Before configuring Wi-Fi or MQTT, first discover and connect the reader using a direct
connection (USB or Bluetooth).


_Figure: Discovery screen showing available readers before connection._


1. Open **123RFID Desktop** and go to the **Discovery** screen.


2. Select **Find Reader** to scan for readers connected to your PC (USB or Bluetooth).


3. In the **Available Readers** list:


`o` Each reader shows the Reader Name, Model, and COM Port


4. Identify your device and select **Connect** next to the reader you want to connect.


`o` After selecting **Connect**, the reader moves to the **Connected**
**Readers** panel.


_Figure 2. Reader connected successfully and displayed in the Connected Readers_

_panel._


**Connect to Wi-Fi**


For MQTT to work in production, the reader requires a stable network connection. Wi-Fi is
the simplest way to provide this connectivity.


_Figure: Configure tab showing the connected reader available for configuration._


1. Click **Configure** from the left navigation panel.
2. In the **Reader Configuration** screen, click the reader image to edit its

configuration.


_Figure: Select "Edit Configuration on Reader" to modify reader settings._


3. Select **Edit Configuration on Reader** .


_Figure: Communication section with Wi-Fi configuration tab and network_

_settings._


4. Go to **Communication** section. Select the **Wi-Fi** tab.
5. Select your network using one of the following options:


       - **Scan and choose network**       - Select an SSID from the available list


       - **Enter SSID**       - Enter a hidden or known network name manually


       - **Choose existing SSID**       - Select a previously saved network profile


6. Enter credentials based on your network type:


       - **WPA / WPA2 Personal** → Enter the passkey


       - **WPA / WPA2 Enterprise (EAP)** → Enter identity, password, and
required certificates


7. Select **Add**, and then select **Connect** .


      - After connecting, verify that the reader is successfully connected to
the network.


      - You should see:


`o` **SSID** → Connected network name


`o` **IP Address** → Assigned IP address


`o` **Status** → Connected


_Figure: Wi-Fi connection details showing successful connection (SSID, IP address,_

_and status)._


**Add an MQTT endpoint**


Configure the MQTT broker using the **End Point Configuration** screen.


_Figure: End Point Configuration screen used to create and configure an MQTT endpoint._


1. Navigate to the **Communication** section.
2. Select the **End Point** tab.
3. Select **New** to create a new endpoint.
4. Enter the required connection details:


**Field** **Description**


|Type|Select MQTT (other options may include SOTI or MDM)|
|---|---|
|**Protocol**<br>|The transport protocol (**MQTT** or**MQTTS**)<br>|
|**URL**<br>|The broker URL or hostname<br>|
|**Port**<br>|1883 for MQTT or 8883 for TLS<br>|
|**Keep Alive**<br>|Interval (in seconds) used to keep the connection<br>active<br>|
|**Tenant ID**<br>|Prefx applied to all MQTT topics<br>|
|**Clean Session**<br>|Starts a fresh session on each connection<br>|
|**Reconnect**<br>**Delay**<br>|Minimum and maximum delay between reconnect<br>attempts<br>|
|**Host Verify**<br>|Validates the broker hostname (for TLS connections)<br>|
|**Username /**<br>**Password**<br>|Authentication credentials (if required)<br>|
|**CA Certifcate**<br>|Verifes the broker identity<br>|
|**Client**<br>**Certifcate +**<br>**Private Key**<br>|Authenticates the reader (mutual TLS)<br>|
|**Command**<br>**Topic**<br>|Topic where the device receives commands<br>|
|**Response Topic**<br>|Topic where the device publishes responses<br>|
|**Event Topic**|Topic where the device publishes alerts and tag data|


Note: _The_ _**Command Topic**_ _,_ _**Response Topic**_ _, and_ _**Event Topic**_ _are optional. If_
_left blank, default values are automatically populated when you select_ _**Add**_ _. You_
_can modify these values before or after adding the endpoint._


**Default values:**


   - Command Topic: MDM/clients/cmnd


   - Response Topic: MDM/clients/resp


     - Event Topic: MDM/clients/event


Figure: Select **Add** to create the endpoint using the entered configuration.


5. Select **Add** .


a. The endpoint is added to the list.


_Figure: Newly added endpoints are displayed in the endpoint list._


6. Select the **Activate** checkbox for the endpoint.


7. Under **Endpoint Status**, select **Refresh** to confirm that the connection is

established.


