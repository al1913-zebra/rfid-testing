# **Zebra RFID IoT Connector: Getting Started** **Guide**

## **Introduction**

This guide provides a highly detailed, step-by-step walkthrough for deploying a Zebra handheld
RFID reader (such as the RFD40 or RFD90) using the MQTT-based IoT Connector. It covers
everything from establishing a local testing environment using MQTTX, bootstrapping the device
via 123RFID Desktop, validating the network connection, and successfully executing your first
MQTT command.


This guide focuses specifically on Phases 1 through 4, establishing a stable Management (MDM)
lifeline before proceeding to advanced data capture.

## **Phase 1: Environment and Network Baseline**

Before configuring any Zebra hardware, you must ensure your testing environment allows raw
TCP/IP MQTT traffic. Corporate IT firewalls frequently block traffic between different subnets
(e.g., an Employee Wi-Fi vs. an IoT Wi-Fi).

### **Step 1.1: Unify the Subnet**

To prevent corporate AP Isolation or firewall rules from dropping your packets:


1. Connect your PC (which will run the MQTTX software) to your local Wi-Fi network.
2. Note the exact SSID (Network Name) and password. You will need to connect the Zebra
reader to this exact same SSID in Phase 2.


**Note:** _If corporate policies prevent the reader from joining the employee network, use a Mobile_
_Hotspot on your smartphone to bypass the corporate firewall entirely for testing._

### **Step 1.2: Find the Host IP Address**

Your PC will act as the target destination for the RFID reader. You must find its local IP address.


3. On Windows, open the Command Prompt (Press Win + R, type cmd, and hit Enter).
4. Type ipconfig and press Enter.
5. Look for your active Wireless LAN adapter and note the IPv4 Address (e.g., 10.233.46.53).

### **Step 1.3: Set Up MQTTX**

MQTTX is an elegant, cross-platform MQTT desktop client that we will use to listen and publish
messages.


6. Download and open the MQTTX application.


7. Click the + New Connection button.
8. In the configuration panel:


- **Name:** Zebra Local Test (or any preferred name)

- **Client ID:** Leave as the randomly generated default.

- **Host:** Enter the IPv4 address you retrieved in Step 1.2 (e.g., mqtt://10.233.46.53).

- **Port:** 1883 (for unencrypted testing).


9. Click Connect in the top right corner. MQTTX is now actively listening on your PC's IP
address.

## **Phase 2: The Bootstrap Provisioning (123RFID Desktop)**

Out of the box, you must bootstrap the device using a direct USB connection to give it its initial
Wi-Fi credentials and endpoint instructions. 123RFID Desktop automatically creates a Hybrid
Management (MDM) Endpoint, which handles management commands, alerts, and RFID data
until you are ready to break them apart.

### **Step 2.1: Discover and Connect**

10. Connect the Zebra reader to your PC via a USB cable.
11. Open 123RFID Desktop.
12. Click FIND READERS.
13. In the Reader Discovery screen, click the CONNECT button next to your specific reader's

serial number.

### **Step 2.2: Configure Wi-Fi**

14. Click the Configure gear icon on the left navigation panel, then click the picture of your

connected reader.
15. Click Edit Configuration on Reader and navigate to Communication in the left menu.
16. On the Wi-Fi tab, select Scan and Choose Network.
17. Select the exact same SSID your PC is connected to.
18. Enter the network password/passkey and click Connect. Ensure the status changes to

Connected and it pulls a valid IP address.

### **Step 2.3: Configure the MDM Endpoint**

19. While still in the Communication section, click the End Point tab at the top.
20. Click New on the right side.
21. Fill out the endpoint details meticulously:


- **Type:** MDM

- **Name:** Primary_MDM_Broker

- **Protocol:** MQTT

- **URL:** Your PC's IPv4 Address (e.g., 10.233.46.53)


- **Port:** 1883

- **Tenant ID:** zebra (Note: MQTT is strictly case-sensitive. Use lowercase zebra)

- **Clean Session:** Checked (Enabled)

- **Command Topic:** zebra/MDM/clients/cmnd

- **Response Topic:** zebra/MDM/clients/resp

- **Event Topic:** zebra/MDM/clients/event


22. Check the Activate box on the new endpoint row.
23. Click Save to commit the settings to the reader, and disconnect the USB cable. The reader

will join the Wi-Fi and attempt to connect to MQTTX.

## **Phase 3: Connection Validation and Topic Architecture**

The Zebra firmware dynamically appends the device's Serial Number to the end of the topics
you configured. You must intercept the first message to identify this exact string.

### **Step 3.1: Subscribe to the Wildcard Topic**

24. In your active MQTTX connection, click New Subscription.
25. In the Topic field, enter the wildcard path: zebra/MDM/clients/#
26. Click Confirm. MQTTX will now catch any message published under that directory tree.

### **Step 3.2: Spot the Connection Event**

27. Watch the MQTTX message feed. Within a few seconds of the reader booting up on Wi-Fi,

you will see a message pop up.
28. The payload will be an mqttConnEVT (MQTT Connection Event), containing a

connectionState: CONNECTED status.
29. **Crucial Step:** Look at the exact topic path where that event was published. It will look like:

_zebra/MDM/clients/event/RFD40-24190525100255_
30. Note your exact Serial Number (e.g., RFD40-24190525100255).


Your dedicated Inbox and Outbox topics are now officially established:


- **Inbox (Commands):** zebra/MDM/clients/cmnd/[Your_Serial_Number]

- **Outbox (Responses):** zebra/MDM/clients/resp/[Your_Serial_Number]

## **Phase 4: Sending the First API Command (Read-Only)**

Now that the connection is validated, we will test the Command/Response loop using a
harmless read-only command.

### **Step 4.1: Prepare the Target Topic**

31. In MQTTX, locate the Publish pane at the bottom of the screen.


32. In the Topic input field, carefully type out your specific Command Inbox topic.

(Example: zebra/MDM/clients/cmnd/RFD40-24190525100255). Ensure there are no typos,
or the reader will never see the message.

### **Step 4.2: Draft the JSON Payload**

33. In the MQTTX payload box, enter the following native MQTT JSON format.
34. Notice the flattened architecture; we do not use REST-style params wrappers for core

commands.

```
    {
    "command": "get_version",
    "requestId": "test_version_req_001"
    }

### **Step 4.3: Execute and Verify**
```

35. Click the Publish button in MQTTX.
36. Immediately look at your subscription feed.
37. The reader will process the command and fire back a response to your resp topic (e.g.,

zebra/MDM/clients/resp/RFD40-24190525100255).
38. The response payload will contain code: 0 (Success), your echoed requestId (to help your

system match the answer to the question), and a readerVersion object detailing the exact
OS and Radio firmware versions installed on your hardware.


**Congratulations!** You have successfully bypassed network firewalls, bootstrapped your device,
mapped its dynamic topic architecture, and executed a two-way MQTT command loop. You are
now ready to proceed to starting the RFID inventory and capturing data streams.

## **Phase 5: Adding Dedicated DATA and CTRL Endpoints (Advanced** **Architecture)**

If your architecture requires routing RFID tags to a different server than IT traffic (Dual Routing),
you must provision dedicated endpoints remotely using MQTT.


**Note:** The RFD40 only supports two data pipes at a time. Factory defaults often include a hidden
"RF90_DATA_BROKER" taking up a slot. You must delete it first before adding a new one.

### **Step 5.1: Clean the Memory Slot**

To free up the memory slot, send a delete command to your existing MDM cmnd topic (e.g.,

**`zebra/MDM/clients/cmnd/[Your_Serial_Number]`** ).


Send the following JSON payload:

```
    {
    "command": "config_endpoint",

```

```
    "requestId": "delete_phantom_01",
    "epConfig": {
    "operation": "delete",
    "configuration": {
    "endpointName": "RF90_DATA_BROKER"
    }
    }
    }

```

Wait for the **`{"code": 0, "description": "Success"}`** response on your resp topic.

### **Step 5.2: Provision the DATA Endpoint**

Now, send the payload to build the new data pipe. Notice the use of **`VERIFY_NONE`**, the epType
set strictly to **`DATA`**, and the flattened topic structure.


Send the following JSON payload to your cmnd topic:

```
    {
    "command": "config_endpoint",
    "requestId": "create_data_pipe_01",
    "epConfig": {
    "operation": "add",
    "configuration": {
    "endpointName": "MY_DATA_BROKER",
    "epType": "DATA",
    "protocol": "MQTT",
    "activate": true,
    "url": "10.233.46.53",
    "verificationType": "VERIFY_NONE",
    "port": 1883,
    "qosCommon": 0,
    "tenantId": "zebra",
    "mqttParams": {
    "keepAlive": 40,
    "cleanSession": false,
    "reconnectDelayMin": 5,
    "reconnectDelayMax": 500,
    "publishTopics": [
    { "topic": "DATA/clients/resp", "qos": 0, "retain": false },
    { "topic": "DATA/clients/event", "qos": 0, "retain": false },
    { "topic": "DATA/clients/rfid", "qos": 0, "retain": false }
    ],
    "subscribeTopics": [
    { "topic": "DATA/clients/cmnd", "qos": 0, "retain": false }
    ]
    },
    "securityParams": {
    "format": "PEM",
    "algorithm": "ToDo"
    },
    "eventConfiguration": {
    "terminalConnection": false,
    "firmwareUpdate": false,
    "network": false,

```

```
    "ntp": false,
    "heartbeat": false,
    "power": false,
    "battery": false,
    "fileDownload": false
    }
    }
    }
    }

```

Once executed, look for the Success response. A brand new connection will securely hit your
MQTTX Broker dedicated entirely to your DATA stream.


## **Phase 6: Starting Inventory and Capturing Data**

**Warning: The OpenAPI Illusion.** When observing the schema, do not use nested REST
parameters like ctrlOprPayload or params for core operations via MQTT. Native MQTT expects
flattened, simple commands.

### **Step 6.1: Subscribe to Data Outbox**

In MQTTX, ensure you are subscribed to your RFID data outbox.


If you are using the hybrid MDM endpoint from Phase 2, subscribe to:
```
zebra/MDM/clients/rfid/[Your_Serial_Number]

```

If you are using the newly created DATA endpoint from Phase 5, subscribe to:
```
DATA/clients/rfid

### **Step 6.2: Start the Radio**
```

To activate the RFID inventory read, send this simple, flattened payload to your active cmnd
topic:

```
    {
    "command": "start",
    "requestId": "start_inventory_001"
    }

### **Step 6.3: Capture Data**
```

Once the start command is accepted, hold RFID tags near the reader antenna (or press the
physical trigger if manual mode is enabled).


You will instantly see a massive flood of dataEVT JSON payloads streaming into your rfid topic.
These payloads will contain the EPCs (Electronic Product Codes), RSSI signal strengths, and
timestamps for every tag scanned.

### **Step 6.4: Stop the Radio**

To halt the inventory process and conserve battery, send the stop command to your cmnd topic:

```
    {
    "command": "stop",
    "requestId": "stop_inventory_001"
    }

```

_**Congratulations! You have completely configured, managed, and executed an RFID inventory**_

_**operation using the Zebra IoT Connector over native MQTT.**_


