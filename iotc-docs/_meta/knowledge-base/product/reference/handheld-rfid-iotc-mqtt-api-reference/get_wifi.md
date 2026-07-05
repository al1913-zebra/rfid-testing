**RFD40 / RFD90 MQTT API Reference** **Get Wifi**

# **Get Wifi**


**Description**
**1. Description**


The get_wifi command retrieves saved and active Wi-Fi configuration details from the reader.


This command returns:


 - Saved and active Wi-Fi profile configuration details

 - Interface network settings and DHCP addressing state

 - Access point and security configuration parameters

 - Response metadata for command execution


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Wi-Fi Configuration Retrieval|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|set_wifi, delete_wifi_profile, get_eth, get_config|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve Wi-Fi interface and profile configuration details|



**3. When to Use This Command**


Use get_wifi to:


 - Verify connected and saved Wi-Fi profiles

 - Check interface addressing and DHCP state

 - Validate security setup and profile preference behavior

 - Troubleshoot Wi-Fi availability and profile issues


Key fields to check in the response:


















|Field|What to Check|Why It Matters|
|---|---|---|
|accessPoint.status|Is the desired profile<br>CONNECTED?|Confirms the reader is actively using that Wi-Fi network.|
|accessPoint.essid|Is it the correct network?|Multiple profiles can be saved — verify the active one is as expected.|
|accessPoint.isPreferred|Is the preferred profile set correctly?|The preferred profile is the one the reader always connects to when in<br>range.|
|accessPoint.securityType|Does the security type match the<br>AP?|A mismatch prevents connection even if the password is correct.|
|ipv4Configuration.ipAddress|Has the device received a valid IP?|No IP address means DHCP failed or the network is unreachable.|
|ipv4Configuration.enableDhcp|Is DHCP or static addressing in<br>use?|Determines how the IP address is assigned.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Wifi**


_Note: The response contains an array of all saved Wi-Fi profiles under wifiProfiles.wifiConfig. Only the currently connected profile_

_includes interfaceName, macAddress, hostname, and ipv4Configuration. Disconnected saved profiles contain only accessPoint and_

_securityDetails._


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_wifi",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to get all the wifi profiles saved in device|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example: WPA2 Personal connection**




**RFD40 / RFD90 MQTT API Reference** Get Wifi

```
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Example: WPA2 Enterprise connection**

```
 {
 "command": "get_wifi",
 "requestId": "abc002",
 "apiVersion": "V1.1",
 "wifiProfiles": {
 "wifiConfig": [
 {
 "interfaceDetails": {
 "interfaceName": "wlan0",
 "status": "ENABLED",
 "hostname": "RFD40-22326520100477",
 "macAddress": "E0-D0-45-3D-38-3F",
 "accessPoint": {
 "essid": "SECURE_AP",
 "status": "CONNECTED",
 "securityType": "WPA2Enterprise",
 "isPreferred": true,
 "autoConn": true
 },
 "ipv4Configuration": {
 "ipAddress": "172.16.10.88",
 "subnetMask": "255.255.255.0",
 "gateway": "172.16.10.1",
 "enableDhcp": true,
 "dnsServer": "172.16.10.5",
 "domainName": "secure.corp"
 },
 "securityDetails": {
 "WPA2Enterprise": {
 "authentication": "tls",
 "passphrase": "XXXXXXXX",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "wifi_root_certificate"
 },
 {
 "key": "client_cert",
 "value": "wifi"
 },
 {
 "key": "client_key",
 "value": "wifi"
 }
 ],
 "protocol": "WPA2_Enterprise_CCMP"

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Get Wifi

```
 }
 }
 }
 }
 ]
 },
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Example: WPA3 Enterprise connection**

```
 {
 "command": "get_wifi",
 "requestId": "abc003",
 "apiVersion": "V1.1",
 "wifiProfiles": {
 "wifiConfig": [
 {
 "interfaceDetails": {
 "interfaceName": "wlan0",
 "status": "ENABLED",
 "hostname": "RFD40-22326520100477",
 "macAddress": "E0-D0-45-3D-38-4A",
 "accessPoint": {
 "essid": "WPA3_ENTERPRISE",
 "status": "CONNECTED",
 "securityType": "WPA3Enterprise",
 "isPreferred": false,
 "autoConn": false
 },
 "ipv4Configuration": {
 "ipAddress": "192.168.100.200",
 "subnetMask": "255.255.255.0",
 "gateway": "192.168.100.1",
 "enableDhcp": true,
 "dnsServer": "192.168.100.10",
 "domainName": "wpa3.enterprise.com"
 },
 "securityDetails": {
 "WPA3Enterprise": {
 "authentication": "ttls",
 "innerAuthentication": "mschapv2",
 "identity": "XXXXXXXX",
 "anonymousIdentity": "XXXXXXXX",
 "password": "XXXXXXXX",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "wpa3_ca_cert"
 }
 ],

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** **Get Wifi**

```
 "protocol": "WPA3_Enterprise_GCMP_256_SHA256"
 }
 }
 }
 }
 ]
 },
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Example: WiFi interface disabled**

```
 {
 "command": "get_wifi",
 "requestId": "abc005",
 "apiVersion": "V1.1",
 "wifiConfig": {
 "interfaceDetails": {
 "interfaceName": "wlan0",
 "status": "DISABLED",
 "hostname": "RFD40-22326520100477",
 "macAddress": "E0-D0-45-3D-38-3F"
 }
 },
 "response": {
 "code": 7,
 "description": "Interface is not available"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to retrieve the WiFi configuration.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`wifiProfiles`**|object|Contains the list of WiFi profiles and their connection status.|
|**` wifiConfig`**|array|Array items: Contains the SOTI-specific WiFi configuration and interface details.|
|**`  interfaceDetails`**|object||
|**`   interfaceName*`**|string|The name of the network interface (e.g., wlan0).|
|**`   status*`**|enum|The status of the network interface, either "ENABLED" or "DISABLED". | Allowed:<br>ENABLED | DISABLED|
|**`   hostname*`**|string|The hostname of the device.|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 5


**RFD40 / RFD90 MQTT API Reference** Get Wifi







|Field|Type|Description|
|---|---|---|
|**`   macAddress*`**|string|The MAC address of the network interface.|
|**`   accessPoint`**|object||
|**`    essid*`**|string|The ESSID (network name) of the access point.|
|**`    status*`**|enum|The connection status to the access point, either "CONNECTED" or "DISCONNECTED".<br>| Allowed: CONNECTED | DISCONNECTED|
|**`    securityType*`**|enum|The security type used by the access point. | Allowed: WPA2personal | WPA3Personal |<br>WPA2Enterprise | WPA3Enterprise | OWEPublic | Open|
|**`    isPreferred*`**|boolean|Indicates whether this access point is preferred for connection.|
|**`    autoConn`**|boolean|This field is deprecated and kept for backward compatibility.|
|**`   ipv4Configuration`**|object||
|**`    ipAddress`**|string|The IPv4 address of the device. | Format: ipv4|
|**`    subnetMask`**|string|The subnet mask of the network. | Format: ipv4|
|**`    gateway`**|string|The IPv4 gateway address. | Format: ipv4|
|**`    enableDhcp`**|boolean|Indicates if DHCP is enabled for IPv4 configuration.|
|**`    dnsServer`**|string|The IPv4 address of the DNS server. | Format: ipv4|
|**`    domainName`**|string|The domain name of the network.|
|**`   ipv6Configuration`**|object||
|**`    ipAddress`**|string|The IPv6 address of the device. | Format: ipv6|
|**`    prefix`**|integer|The prefix length of the IPv6 address.|
|**`    gateway`**|string|The IPv6 gateway address. | Format: ipv6|
|**`    enableAuto`**|enum|Specifies if automatic IPv6 configuration is enabled. | Allowed: enabled | disabled|
|**`    dnsServer`**|string|The IPv6 address of the DNS server. | Format: ipv6|
|**`    domainName`**|string|The domain name of the IPv6 network.|
|**`   securityDetails`**|object||
|**`    WPA2Personal`**|object||
|**`     password`**|string|The password used for WPA2-Personal security. | Format: password|
|**`    WPA3Personal`**|object||
|**`     password`**|string|The password used for WPA3-Personal security. | Format: password|
|**`    WPA2Enterprise`**|object||
|**`     authentication`**|enum|The authentication method for WPA2-Enterprise. | Allowed: tls | ttls | peap|
|<br>**`innerAuthentication`**|enum|The inner authentication protocol for WPA2-Enterprise. | Allowed: none | tls | mschapv2|
|**`     identity`**|string|The identity used for WPA2-Enterprise authentication.|


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 6


**RFD40 / RFD90 MQTT API Reference** **Get Wifi**



















|Field|Type|Description|
|---|---|---|
|<br>**`anonymousIdentity`**|string|The anonymous identity used for WPA2-Enterprise authentication.|
|**`     password`**|string|The password for WPA2-Enterprise authentication. | Format: password|
|**`     passphrase`**|string|The passphrase for WPA2-Enterprise.|
|**`     certificate`**|array|The certificates used for WPA2-Enterprise.|
|**`      key`**|enum|The type of certificate (e.g., ca_cert, client_key). | Allowed: ca_cert | client_key |<br>client_cert | cert_key_password|
|**`      value`**|string|The value of the certificate.|
|**`     protocol`**|enum|The protocol used for WPA2-Enterprise. | Allowed: WPA2_Enterprise_CCMP|
|**`    WPA3Enterprise`**|object||
|**`     authentication`**|enum|The authentication method for WPA3-Enterprise. | Allowed: tls | ttls | peap|
|<br>**`innerAuthentication`**|enum|The inner authentication protocol for WPA3-Enterprise. | Allowed: none | tls | mschapv2|
|**`     identity`**|string|The identity used for WPA3-Enterprise authentication.|
|<br>**`anonymousIdentity`**|string|The anonymous identity used for WPA3-Enterprise authentication.|
|**`     password`**|string|The password for WPA3-Enterprise authentication. | Format: password|
|**`     passphrase`**|string|The passphrase for WPA3-Enterprise.|
|**`     certificate`**|array|The certificates used for WPA3-Enterprise.|
|**`      key`**|enum|The type of certificate (e.g., ca_cert, client_key). | Allowed: ca_cert | client_key |<br>client_cert | cert_key_password|
|**`      value`**|string|The value of the certificate.|
|**`     protocol`**|enum|The protocol used for WPA3-Enterprise. | Max length: 3 | Allowed:<br>WPA3_Enterprise_CCMP | WPA3_Enterprise_CCMP_256 |<br>WPA3_Enterprise_GCMP_128 | WPA3_Enterprise_GCMP_256_SHA256 |<br>WPA3_Enterprise_GCMP_256_SUITEB_192|
|**`    OWEPublic`**|object||
|**`     authentication`**|string|The authentication method for OWE-Public access.|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information | Min: 0 | Max: 3|
|**` description*`**|string|response description in detail|


**Error Codes**


**Code** **Description** **Cause** **Action**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 7**


**RFD40 / RFD90 MQTT API Reference** Get Wifi






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 8**


