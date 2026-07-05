**RFD40 / RFD90 MQTT API Reference** **Get Installed Certificate**

# **Get Installed Certificate**


**Description**
**1. Description**


The get_installed_certificate command retrieves certificate entries currently installed on the reader.


This command returns:


 - Installed certificate names and certificate types

 - Certificate issuer, serial, and key algorithm details

 - Certificate validity period metadata

 - Response metadata for query execution


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Installed Certificate Query|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|install_certificate, delete_certificate, config_endpoint|
|Required Request Fields|command, requestId|
|Supported Operations|Retrieve installed certificate inventory details|



**3. When to Use This Command**


Use get_installed_certificate to:


 - Audit installed certificate inventory on the device

 - Confirm certificate availability before endpoint or Wi-Fi configuration

 - Verify certificate validity windows for rotation planning


Key fields to check in the response:












|Field|What to Check|Why It Matters|
|---|---|---|
|type|Is the correct certificate type installed?|Certificates are scoped by type (mqtt, wifi, filestore). A certificate installed for one<br>type cannot be used by another.|
|name|Does the name match what config_endpoint<br>or set_wifi expects?|The name is what other commands reference when configuring TLS connections.|
|validTill|Is the certificate still within its validity window?|An expired certificate causes TLS connection failures. Check before configuring or<br>rotating.|
|validFrom|Is the certificate already active?|A future validFrom means the certificate is not yet valid and will be rejected by the<br>broker.|
|issuerName|Does it match the expected CA?|Confirms the certificate chain is from the correct issuer for your environment.|
|serial|Does the serial match the expected<br>certificate?|Used to uniquely identify a certificate when multiple entries share the same name<br>and type.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Get Installed Certificate**


**MQTT Command Payload**


**Example**

```
 {
 "command": "get_installed_certificates",
 "requestId": "abc123"
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to get install certificate|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|



**MQTT Response Payload**


**Example**

```
 {
 "command": "get_installed_certificates",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "installedCerts": {
 "certInfo": [
 {
 "name": "ca_cert",
 "type": "filestore",
 "issuerName": "SotiConnectRoot",
 "publicKeyAlg": "RSA",
 "publicKey": "RSA",
 "serial": "ed:83:dd:4a:47:dd:07:98",
 "subjectName": "SotiConnectRoot",
 "validFrom": "2024-07-01T07:00:00Z",
 "validTill": "2034-02-28T15:18:47Z"
 },
 {
 "name": "ca_cert",
 "type": "wifi",
 "issuerName": "CA",
 "publicKeyAlg": "RSA",
 "publicKey": "RSA",
 "serial": "1e:e0:12:f6:75:68:39:f1",
 "subjectName": "CA",
 "validFrom": "2024-07-01T07:00:00Z",
 "validTill": "2025-04-16T07:26:35Z"
 },
 {
 "name": "ca_cert",
 "type": "mqtt",
 "issuerName": "SOTI-mqtt-ca",

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Get Installed Certificate**

```
 "publicKeyAlg": "RSA",
 "publicKey": "RSA",
 "serial": "7d:1b:c5:9f:ea:ff:0f:56",
 "subjectName": "SOTI-mqtt-ca",
 "validFrom": "2024-07-01T07:00:00Z",
 "validTill": "2038-01-19T03:14:07Z"
 },
 {
 "name": "client_cert",
 "type": "mqtt",
 "issuerName": "RootCA",
 "publicKeyAlg": "RSA",
 "publicKey": "RSA",
 "serial": "1",
 "subjectName": "Client",
 "validFrom": "2024-07-01T07:00:00Z",
 "validTill": "2030-05-06T08:06:57Z"
 },
 {
 "name": "client_cert",
 "type": "wifi",
 "issuerName": "CA",
 "publicKeyAlg": "RSA",
 "publicKey": "RSA",
 "serial": "26:00:16:e0:c4:a1:b5:00",
 "subjectName": "CLIENT",
 "validFrom": "2024-07-01T07:00:00Z",
 "validTill": "2025-04-16T07:27:52Z"
 }
 ]
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
|**`command`**|string|The command that was executed to retrieve the list of installed certificates.|
|**`requestId`**|string|The unique identifier of the original request.|
|**`apiVersion`**|enum|Allowed: V1.0 | V1.1|
|**`installedCerts`**|object|Contains the list of certificates installed on the device.|
|**` certInfo`**|array|A list of installed certificates with their details.|
|**`  name`**|string|The name of the certificate.|
|**`  type*`**|enum|The type of the certificate, such as client, server, or other specified types. | Allowed:<br>client | server | mqtt | wifi | filestore|
|**`  installTime*`**|string|The date and time when the certificate was installed. | Format: date-time|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Get Installed Certificate**

|Field|Type|Description|
|---|---|---|
|**`  issuerName*`**|string|The name of the issuer of the certificate.|
|**`  publicKeyAlg`**|enum|The algorithm used for the public key. | Allowed: RSA256 | RSA512|
|**`  publicKey`**|string|The public key of the certificate in string format.|
|**`  serial`**|string|The serial number of the certificate.|
|**`  subjectName*`**|string|The name of the subject to whom the certificate belongs.|
|**`  validFrom*`**|string|The start date from which the certificate is valid. | Format: date|
|**`  validTill*`**|string|The end date until which the certificate is valid. | Format: date|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 3 — Not able to retrieve information<br>- 9 — File not found<br>- 21 — Certificate not found | Min: 0 | Max: 21|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|3|Not able to retrieve information|The device could not gather the<br>requested information at this time|Retry the command after a short delay; if persistent, reboot the<br>device|
|9|File not found|The specified file or certificate<br>could not be found on the device or<br>server|Verify the file path or URL is correct and the file exists|
|21|Certificate not found|The specified certificate is not<br>installed on the device|Verify the certificate name and install it using install_certificate if<br>needed|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


