**RFD40 / RFD90 MQTT API Reference** **Get Eth**

# **Get Eth**


**Description**
**1. Description**


The get_eth command retrieves Ethernet interface configuration and connection state from the reader.


This command returns:


 - Ethernet interface status and link state details

 - DHCP enablement and IPv4 addressing information

 - Interface-level network parameters and connectivity metadata

 - Response metadata for command execution


No additional payload fields are required beyond command and requestId.


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Ethernet Configuration Query|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_wifi, get_config, set_config|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve Ethernet network configuration and interface status|



**3. When to Use This Command**


Use get_eth to:


 - Verify Ethernet connectivity and link speed

 - Check interface status and network addressing

 - Confirm DHCP-based IPv4 network configuration

 - Troubleshoot wired network availability


Key fields to check in the response:













|Field|What to Check|Why It Matters|
|---|---|---|
|interfaceDetails.status|Is the Ethernet interface<br>enabled?|If disabled, no wired network traffic is possible regardless of link state.|
|linkStatus.status|Is the physical link connected?|Confirms a cable is plugged in and the switch port is active.|
|linkStatus.linkSpeed|What speed is the link<br>negotiated at?|Unexpected speeds (e.g., 10Mbps instead of 100Mbps) can indicate cable or<br>switch issues.|
|ipv4Configuration.ipAddress|Has the device received an IP<br>address?|No IP address means DHCP failed or static addressing is not configured.|
|ipv4Configuration.enableDhcp|Is DHCP enabled or static?|Determines whether the IP address is assigned automatically or must be<br>configured manually.|
|ipv4Configuration.gateway|Is the gateway correct?|An incorrect gateway prevents the device from reaching external networks or<br>the MQTT broker.|


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Eth**


_Note: When the Ethernet interface is disabled, the response only contains interfaceName and status. Fields such as linkStatus and_

_ipv4Configuration are not present in the response._


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_eth",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to get the ethernet configuration|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example: Ethernet config info**




**RFD40 / RFD90 MQTT API Reference** **Get Eth**

```
 }

```

**Example: Ethernet interface disabled**

```
 {
 "command": "get_eth",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "ethConfig": {
 "interfaceDetails": {
 "interfaceName": "eth0",
 "status": "Disabled"
 }
 },
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command`**|string|The command that was executed to retrieve the ethernet configuration.|
|**`requestId`**|string|The unique identifier of the original request.|
|**`apiVersion`**|enum|Allowed: V1.0 | V1.1|
|**`ethConfig`**|object|Detailed schema for Ethernet configuration.|
|**` interfaceDetails`**|object||
|**`  interfaceName*`**|string|Name of the network interface.|
|**`  status*`**|enum|Status of the network interface. | Allowed: enabled | disabled|
|**`  hostname*`**|string|Hostname assigned to the device.|
|**`  macAddress*`**|string|MAC address of the network interface.|
|**`  linkStatus`**|object||
|**`   status*`**|enum|Current status of the network link. | Allowed: Connected | Disconnected|
|**`   linkSpeed*`**|string|Speed of the network link.|
|**`  ipv4Configuration`**|object||
|**`   ipAddress`**|string|IPv4 address of the network interface. | Format: ipv4|
|**`   subnetMask`**|string|Subnet mask for the IPv4 configuration. | Format: ipv4|
|**`   gateway`**|string|Gateway address for the IPv4 configuration. | Format: ipv4|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Get Eth**







|Field|Type|Description|
|---|---|---|
|**`   enableDhcp`**|enum|Indicates if DHCP is enabled for IPv4 configuration. | Allowed: enabled | disabled|
|**`   dnsServer`**|string|DNS server address for the IPv4 configuration. | Format: ipv4|
|**`   domainName`**|string|Domain name for the IPv4 configuration.|
|**`  security`**|object||
|**`   securityStatus`**|boolean|Indicates if security features are enabled.|
|**`   EAP802_1X`**|object||
|**`    authentication`**|enum|Authentication method for 802.1X security. | Allowed: EAP-MD5 | LEAP | PEAP |<br>EAP-SIM | EAP-AKA | EAP-TLS | EAP-TTLS | EAP-FAST|
|<br>**`innerAuthentication`**|enum|Inner authentication method for 802.1X security. | Allowed: EAP-MS-CHAPv2 |<br>EAP-TLS | EAP-GTC|
|**`    certificate`**|string|Certificate used for 802.1X authentication.|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|


**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


