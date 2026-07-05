**RFD40 / RFD90 MQTT API Reference** **Set Wifi**

# **Set Wifi**


**Description**
**1. Description**


The set_wifi command configures or updates Wi-Fi interface and access point profile settings on the reader.


This command allows you to configure:


 - Wi-Fi profile create and modify operations

 - Interface enablement and preferred connection behavior

 - Access point ESSID and connection settings

 - Security type and authentication details for protected networks


Use this command to:


 - Provision new Wi-Fi profiles during device onboarding

 - Update existing Wi-Fi settings for network changes

 - Control security and connection behavior for wireless access


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Wi-Fi Configuration|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_wifi, delete_wifi_profile, set_config, install_certificate|
|Required Request Fields|command, requestId, wifiConfig|
|Supported Operations|CREATE, MODIFY|
|Supported Security Types|WPA2Personal, WPA3Personal, WPA2Enterprise, WPA3Enterprise|
|Enterprise Auth Methods|tls, ttls, peap|
|Supported Profiles|ESSID-based Wi-Fi access point profiles with optional preferred and autoconnect behavior|



**3. Before You Begin**


Gather the access point details and security credentials before sending this command. An incorrect ESSID or security mismatch will

result in a saved but non-functional profile, and the reader will not connect.












|What You<br>Need|Details|
|---|---|
|Operation type|Decide whether you are creating a new profile (CREATE) or updating an existing one (MODIFY). Use CREATE for first-time<br>provisioning. Use MODIFY to update the password, security settings, or connection behavior of an existing profile.|
|ESSID|Have the exact access point network name (ESSID/SSID). The value is case-sensitive. A mismatch results in error code 15 (SSID<br>not found) for MODIFY, or creates an unreachable profile for CREATE.|
|Security type|Know which security protocol the access point uses — WPA2Personal, WPA3Personal, WPA2Enterprise, or WPA3Enterprise.<br>Must match the AP configuration exactly.|
|Security<br>credentials|For Personal networks: have the passphrase ready. For Enterprise networks: know the authentication protocol (tls, ttls, peap),<br>identity, password, and certificate names already installed on the device.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Set Wifi**









|What You<br>Need|Details|
|---|---|
|Certificate<br>names<br>(Enterprise)|For WPA2/WPA3 Enterprise with TLS authentication, the ca_cert, client_cert, and client_key must already be installed on the<br>device via install_certificate. Have their logical names ready to reference in the certificate array.|
|IPv4 strategy|Decide whether the reader will use DHCP (enableDhcp: true) or a static IP address. For static, have the IP address, subnet mask,<br>gateway, and DNS server ready.|
|Connection<br>behavior|Decide whether the command should immediately connect (connect: true) and whether this profile should always be preferred<br>(isPreferred: true).|


**4. Operations**





The operation field inside wifiConfig determines whether you are creating a new Wi-Fi profile or modifying an existing one.


 - CREATE — Creates a new Wi-Fi access point profile on the device. The ESSID must not already exist. If a profile with the same

ESSID already exists, the command returns error code 18.

 - MODIFY — Updates an existing Wi-Fi access point profile. The ESSID must already exist on the device. If the ESSID is not found,

the command returns error code 15.


**5. Security Types**


The securityType field in the security object defines the authentication and encryption method for the access point. Choose the type

that matches your network's security configuration.

|securityType|Description|Authentication|
|---|---|---|
|WPA2Personal|WPA2 with Pre-Shared Key. Standard password-protected home and office Wi-Fi.|Password|
|WPA3Personal|WPA3 with Simultaneous Authentication of Equals (SAE). More secure than WPA2.|Password|
|WPA2Enterprise|WPA2 with 802.1X authentication. Used in corporate and institutional networks.|tls | ttls | peap|
|WPA3Enterprise|WPA3 with 802.1X authentication. Higher security for enterprise environments.|tls | ttls | peap|



**6. Rules and Constraints**


Violating any of these rules will cause the command to fail or the Wi-Fi profile to be configured incorrectly.


**Profile Operations**


 - CREATE fails with error code 18 if a profile with the same ESSID already exists. Delete the existing profile first, or use MODIFY to

update it.

 - MODIFY fails with error code 15 if the ESSID does not exist. Use CREATE for new profiles.


**Connection Behavior**


 - connect: true — The device disconnects from the currently active profile and immediately connects to the specified ESSID.

 - connect: false — The profile is saved but the device does not switch connections. Use this for pre-provisioning profiles.

 - isPreferred: true — The device will always attempt to connect to this ESSID when it is in range.


**Enterprise Authentication**


 - Certificates referenced in the certificate array must already be installed on the device using install_certificate before this command

is sent.

 - innerAuthentication is optional for ttls and peap authentication methods.


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Set Wifi


**Profile Limits**


 - The device has a maximum number of saved Wi-Fi profiles. Exceeding this limit returns error code 19. Maximum 10 profiles.


 - Delete unused profiles using delete_wifi_profile before adding new ones when the limit is reached.


**MQTT Command Payload**


**Example: Create WPA2 personal**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "TestAP1",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA2Personal",
 "securityDetails": {
 "WPA2Personal": {
 "password": "test@123"
 }
 }
 }
 }
 }
 }

```

**Example: Modify WPA2 personal**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "MODIFY",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "TestAP1",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA2Personal",
 "securityDetails": {
 "WPA2Personal": {
 "password": "test@12345678"

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Set Wifi

```
 }
 }
 }
 }
 }
 }

```

**Example: Set preferred AP**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "operation": "MODIFY",
 "accessPoint": {
 "isPreferred": true,
 "essid": "TestAP1"
 }
 }
 }

```

**Example: Create WPA2 enterprise TLS**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "TestAP2",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA2Enterprise",
 "securityDetails": {
 "WPA2Enterprise": {
 "authentication": "tls",
 "innerAuthentication": "tls",
 "identity": "test",
 "anonymousIdentity": "test",
 "password": "test@123",
 "passphrase": "test@123",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "gen_cert"
 },
 {

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** Set Wifi

```
 "key": "client_key",
 "value": "gen_cl_key"
 },
 {
 "key": "client_cert",
 "value": "gen_cl_cert"
 }
 ],
 "protocol": "WPA2_Enterprise_CCMP"
 }
 }
 }
 }
 }
 }

```

**Example: Create WPA2 enterprise TTLS**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "Vulcan_WPA2_2_4_ENT_802.1x",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA2Enterprise",
 "securityDetails": {
 "WPA2Enterprise": {
 "authentication": "ttls",
 "innerAuthentication": "mschapv2",
 "identity": "steve",
 "anonymousIdentity": "none",
 "password": "1234567890",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "wifi_ca_cert"
 }
 ],
 "protocol": "WPA2_Enterprise_CCMP"
 }
 }
 }
 }
 }
 }

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 5


**RFD40 / RFD90 MQTT API Reference** Set Wifi


**Example: Create WPA2 enterprise PEAP**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "Vulcan_WPA2_24_5_ENT_SHA256",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA2Enterprise",
 "securityDetails": {
 "WPA2Enterprise": {
 "authentication": "peap",
 "innerAuthentication": "mschapv2",
 "identity": "steve",
 "anonymousIdentity": "none",
 "password": "1234567890",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "wifi_ca_cert"
 }
 ],
 "protocol": "WPA2_Enterprise_CCMP"
 }
 }
 }
 }
 }
 }

```

**Example: Create WPA3 enterprise TLS**

```
 {
 "command": "set_wifi",
 "requestId": "aa483090-c0d0-4ab3-b7e5-233586918a13",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "essid": "TestAp4",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA3Enterprise",
 "securityDetails": {
 "WPA3Enterprise": {

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 6


**RFD40 / RFD90 MQTT API Reference** Set Wifi

```
 "authentication": "tls",
 "innerAuthentication": "tls",
 "identity": "steve",
 "anonymousIdentity": "none",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "wifi_ca_cert"
 },
 {
 "key": "client_cert",
 "value": "wifi_client_cert"
 },
 {
 "key": "client_key",
 "value": "wifi_client_key"
 }
 ],
 "passphrase": "whatever",
 "protocol": "WPA3_Enterprise_GCMP_128"
 }
 }
 }
 }
 }
 }

```

**Example: Create WPA3 enterprise TTLS**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "Vulcan_WPA2_24_ENT_SHA256",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA3Enterprise",
 "securityDetails": {
 "WPA3Enterprise": {
 "authentication": "ttls",
 "innerAuthentication": "mschapv2",
 "identity": "steve",
 "anonymousIdentity": "none",
 "password": "1234567890",
 "certificate": [
 {
 "key": "ca_cert",

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 7


**RFD40 / RFD90 MQTT API Reference** **Set Wifi**

```
 "value": "wifi_ca_cert"
 }
 ],
 "protocol": "WPA3_Enterprise_GCMP_256_SHA256"
 }
 }
 }
 }
 }
 }

```

**Example: Create WPA3 enterprise PEAP**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "wifiConfig": {
 "interfaceName": "wlan0",
 "enableInterface": true,
 "operation": "CREATE",
 "accessPoint": {
 "connect": false,
 "isPreferred": false,
 "autoConn": true,
 "essid": "VULCAN_WPA3_24_ENT_SUITE192",
 "enableSecurity": true,
 "security": {
 "securityType": "WPA3Enterprise",
 "securityDetails": {
 "WPA3Enterprise": {
 "authentication": "peap",
 "innerAuthentication": "mschapv2",
 "identity": "steve",
 "anonymousIdentity": "none",
 "password": "1234567890",
 "certificate": [
 {
 "key": "ca_cert",
 "value": "wifi_ca_cert"
 }
 ],
 "protocol": "WPA3_Enterprise_GCMP_256_SUITEB_192"
 }
 }
 }
 }
 }
 }

```

**Command Schema**


**Field** **Type** **Description**


RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 8


**RFD40 / RFD90 MQTT API Reference** Set Wifi






|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the operation being performed, in this case, setting the wifi configuration.|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`wifiConfig`**|object|Defines the WiFi profile configuration including network credentials and security settings.|
|**`  interfaceName*`**|string|The name of the network interface for which the Wi-Fi configuration is being set.|
|**`  enableInterface*`**|boolean|Specifies whether the network interface should be enabled or disabled.|
|**`  operation*`**|enum|The operation to be performed on the Wi-Fi configuration. It can either create a new<br>configuration or modify an existing one. | Allowed: CREATE | MODIFY|
|**`  accessPoint*`**|object||
|**`    connect*`**|boolean|Indicates whether to connect to this profile. If true, disconnects the currently connected<br>profile and connects to the specified one; if false, just saves the profile.|
|**`    isPreferred*`**|boolean|Marks this profile as the preferred one to always connect to when available.|
|**`    autoConn`**|boolean|Reserved for backward compatibility. It will be removed in the future.|
|**`    essid*`**|string|The ESSID (network name) of the access point.|
|**`    enableSecurity*`**|boolean|Indicates whether security is enabled for this access point.|
|**`    ipv4Configuration`**|object||
|**`      ipAddress`**|string|The IPv4 address to assign to the interface. | Format: ipv4|
|**`      subnetMask`**|string|The IPv4 subnet mask. | Format: ipv4|
|**`      gateway`**|string|The IPv4 gateway address. | Format: ipv4|
|**`      enableDhcp`**|boolean|Specifies whether DHCP is enabled for automatic IP address assignment.|
|**`      dnsServer`**|string|The IPv4 address of the DNS server. | Format: ipv4|
|**`      domainName`**|string|The domain name for the network.|
|**`    security`**|object||
|**`      securityType*`**|enum|The security type for the access point, specifying the authentication and encryption<br>method. | Allowed: WPA2Personal | WPA3Personal | WPA2Enterprise | WPA3Enterprise|
|**`      securityDetails*`**|object||
|**`        WPA2Personal`**|object||
|**`          password*`**|string|The password for WPA2-Personal authentication.|
|**`        WPA3Personal`**|object||
|**`          password*`**|string|The password for WPA3-Personal authentication.|
|**`        WPA2Enterprise`**|object|WPA2-Enterprise security configuration with optional certificate parameters.|
|**`          authentication*`**|enum|Authentication protocol for WPA2-Enterprise. | Allowed: tls | ttls | peap|
|<br>**`innerAuthentication`**|enum|Inner authentication method to be used within the outer authentication protocol. |<br>Allowed: none | tls | mschapv2|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 9


**RFD40 / RFD90 MQTT API Reference** Set Wifi



















|Field|Type|Description|
|---|---|---|
|**`     identity`**|string|The identity (username) for WPA2-Enterprise authentication.|
|<br>**`anonymousIdentity`**|string|The anonymous identity for WPA2-Enterprise authentication.|
|**`     password`**|string|The password for WPA2-Enterprise authentication.|
|**`     passphrase`**|string|The passphrase for WPA2-Enterprise.|
|**`     certificate`**|array|Array of object|
|**`      key`**|enum|The type of certificate to be used. | Allowed: ca_cert | client_key | client_cert |<br>cert_key_password|
|**`      value`**|string|The name of the specific certificate.|
|**`     protocol`**|enum|The encryption protocol for WPA2-Enterprise. | Allowed: WPA2_Enterprise_CCMP|
|**`    WPA3Enterprise`**|object|WPA3-Enterprise security configuration with optional certificate parameters.|
|**`     authentication*`**|enum|Authentication protocol for WPA3-Enterprise. | Allowed: tls | ttls | peap|
|<br>**`innerAuthentication`**|enum|Inner authentication method to be used within the outer authentication protocol. |<br>Allowed: none | tls | mschapv2|
|**`     identity`**|string|The identity (username) for WPA3-Enterprise authentication.|
|<br>**`anonymousIdentity`**|string|The anonymous identity for WPA3-Enterprise authentication.|
|**`     password`**|string|The password for WPA3-Enterprise authentication.|
|**`     passphrase`**|string|The passphrase for WPA3-Enterprise.|
|**`     certificate`**|array|Array of object|
|**`      key`**|enum|The type of certificate to be used. | Allowed: ca_cert | client_key | client_cert |<br>cert_key_password|
|**`      value`**|string|The name of the specific certificate.|
|**`     protocol`**|enum|The encryption protocol for WPA3-Enterprise. | Allowed: WPA3_Enterprise_CCMP |<br>WPA3_Enterprise_CCMP_256 | WPA3_Enterprise_GCMP_128 |<br>WPA3_Enterprise_GCMP_256_SHA256 | WPA3_Enterprise_GCMP_256_SUITEB_192|
|**`    OWEPublic`**|object||
|**`     authentication*`**|string|Authentication protocol for OWE-Public.|


**MQTT Response Payload**


**Example**

```
 {
 "command": "set_wifi",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "response": {
 "code": 0,

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 10**


**RFD40 / RFD90 MQTT API Reference** **Set Wifi**

```
 "description": "Success"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to set the WiFi configuration.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 2 — Invalid payload<br>- 15 — WIFI Error - SSID not found<br>- 17 — WIFI Error - SSID missed<br>- 18 — WIFI Error - SSID already exist<br>- 19 — WIFI Error - SSID count overflow<br>- 20 — Wifi is not supported<br>- 23 — Invalid enum value | Min: 0 | Max: 23|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|2|Invalid payload|The JSON payload is malformed or<br>contains invalid field values|Validate the payload against the command schema and correct<br>any errors|
|15|WIFI Error - SSID not found|The specified Wi-Fi SSID does not<br>exist in saved profiles|Verify the SSID name is correct and that the profile has been<br>saved|
|17|WIFI Error - SSID missed|The required SSID field is missing<br>from the payload|Include the SSID field in the command payload|
|18|WIFI Error - SSID already exist|A Wi-Fi profile with this SSID is<br>already saved on the device|Delete the existing profile first or update it instead of creating a<br>new one|
|19|WIFI Error - SSID count overflow|The maximum number of saved<br>Wi-Fi profiles has been reached|Delete an unused Wi-Fi profile before adding a new one|
|20|Wifi is not supported|The device hardware does not<br>have a Wi-Fi interface|Use Ethernet or another supported interface for network<br>connectivity|
|23|Invalid enum value|A field value does not match any of<br>the allowed enum options|Check the schema for allowed values and correct the field|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 11**


