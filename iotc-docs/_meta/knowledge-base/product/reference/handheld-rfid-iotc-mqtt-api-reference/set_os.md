**RFD40 / RFD90 MQTT API Reference** **Set Os**

# **Set Os**


**Description**
**1. Description**


The set_os command starts a firmware update workflow on the reader using a provided firmware source URL and

connection/authentication settings.


This command allows you to configure:


 - Firmware download source URL

 - Authentication mode for firmware access

 - TLS verification mode

 - Optional certificate material


Use this command to:


 - Roll out firmware upgrades to devices

 - Apply maintenance and security firmware releases

 - Control how firmware is downloaded and verified


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Firmware Update|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|get_version, reboot, install_certificate|
|Required Request Fields|command, requestId, OSUpdateDetails|
|Supported Operations|Start firmware update using URL, authentication, and verification settings|
|Supported Authentication Types|NONE, CERTIFICATE|
|Supported Verification Types|NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER|
|Supported Protocols|URI-based firmware source URLs|



**3. Before You Begin**


Prepare your firmware source and access credentials before sending this command. An incorrect URL, authentication mismatch, or

missing certificate will cause the update to fail.












|What You<br>Need|Details|
|---|---|
|Firmware URL|Have the full, valid URI to the firmware file ready. The device will download from this URL directly. Verify the URL is reachable<br>from the device's network.|
|Authentication<br>type|Know which authentication method the firmware server requires — NONE for open access or CERTIFICATE for certificate-based<br>access.|
|Certificate<br>material|For CERTIFICATE authentication: either provide the CA certificate content inline as a PEM-formatted string in<br>caCertificateFileContent, or provide the file path to a preinstalled certificate in caCertificateFile.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Set Os**






|What You<br>Need|Details|
|---|---|
|Verification<br>type|Decide the TLS verification level — NONE to skip verification, VERIFY_PEER to verify the server's certificate, VERIFY_HOST to<br>verify the hostname, or VERIFY_HOST_PEER to verify both.|
|Device battery<br>level|Ensure the device is sufficiently charged or connected to external power before initiating a firmware update. A low battery will<br>cause the update to be rejected with error code 14.|
|Flash<br>availability|Confirm there is enough free flash storage on the device to hold the firmware file. Insufficient space returns error code 8.|



**4. Authentication Types**


The authenticationType field defines how the device authenticates to the firmware source server.



|authenticationType|Description|Required Fields|
|---|---|---|
|NONE|No authentication. The firmware URL is publicly accessible.|None|
|CERTIFICATE|Certificate-based authentication. Supply CA certificate content inline or as a file<br>reference.|caCertificateFileContent or<br>caCertificateFile|


**5. Verification Types**





The verificationType field controls the TLS verification behavior during the firmware download connection.

|verificationType|Description|
|---|---|
|NONE|No TLS verification is performed. Use only in trusted network environments.|
|VERIFY_PEER|Verifies the server's certificate against trusted CAs.|
|VERIFY_HOST|Verifies that the server's hostname matches the certificate.|
|VERIFY_HOST_PEER|Verifies both the hostname and the server's certificate. Recommended for production environments.|



**6. Rules and Constraints**


Violating any of these rules will cause the command to fail or the firmware update to not complete.


**Firmware URL**


 - url must be a valid URI. The device will attempt to download the firmware directly from this address.

 - Ensure the URL is reachable from the device's active network interface before sending the command.


**Device State**


 - A firmware update cannot be started while another update is already in progress. Sending set_os during an active update returns

error code 4. Wait for the current update to complete before retrying.

 - The device must have sufficient battery charge before initiating a firmware update. A low battery returns error code 14. Connect to

external power or charge the device before retrying.

 - The device must have sufficient free flash storage to hold the firmware file. Insufficient space returns error code 8.


**MQTT Command Payload**


**Example: No authentication HTTP**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** **Set Os**

```
 {
 "command": "set_os",
 "requestId": "abc123",
 "OSUpdateDetails": {
 "url": "https://192.168.29.39:8000/Build-3.10.27/Firmware",
 "authenticationType": "NONE"
 }
 }

```

**Example: Pre-installed CA certificate HTTPS**

```
 {
 "command": "set_os",
 "requestId": "abc124",
 "OSUpdateDetails": {
 "url": "https://192.168.29.39:8000/Build-3.10.27/Firmware/PAAFKS00-013-R01E0.DAT",
 "authenticationType": "CERTIFICATE",
 "verificationType": "VERIFY_PEER",
 "caCertificateFile": "filestore_ca_cert"
 }
 }

```

**Example: Inline CA certificate HTTPS**

```
 {
 "command": "set_os",
 "requestId": "abc125",
 "OSUpdateDetails": {
 "url": "https://fwserver.example.com/firmware/PAAFKS00-012-R02E0.DAT",
 "authenticationType": "CERTIFICATE",
 "verificationType": "VERIFY_PEER",
 "caCertificateFileContent": "-----BEGIN CERTIFICATE-----\r\nMIID...base64...\r\n-----END CERTIFICATE-----"
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the operation being performed, in this case, setting the reader operating<br>system.|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`OSUpdateDetails`**|object|Defines the firmware update details including the source URL and authentication<br>parameters.|
|**` url*`**|string|The URL where the OS update can be downloaded. Must be a valid URI. | Format: uri|
|**` authenticationType*`**|enum|Specifies the type of authentication required for accessing the URL. NONE - No<br>authentication is needed. CERTIFICATE - A valid inline certificate or preinstalled<br>certificate is required. | Allowed: NONE | CERTIFICATE|
|**` verificationType`**|enum|Specifies the type of verification to perform during the connection. NONE - No|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** **Set Os**







|Field|Type|Description|
|---|---|---|
|||verification. VERIFY_PEER - Verify the peer's certificate. VERIFY_HOST - Verify the<br>host's certificate. VERIFY_HOST_PEER - Verify both the host and peer certificates. |<br>Allowed: NONE | VERIFY_PEER | VERIFY_HOST | VERIFY_HOST_PEER|
|<br>**`caCertificateFileContent`**|string|The content of the CA certificate in PEM format, required for certificate-based<br>authentication.|
|**` caCertificateFile`**|string|The file path to the CA certificate, required for certificate-based authentication.|


**MQTT Response Payload**


**Example**

```
 {
 "command": "set_os",
 "requestId": "18996",
 "apiVersion": "V1.1",
 "response": {
 "code": 1,
 "description": "Command payload is accepted"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to set the operating system configuration.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 1 — Command payload is accepted<br>- 4 — Firmware update in progress<br>- 8 — Insufficient flash size<br>- 9 — File not found<br>- 13 — Firmware update Failed<br>- 14 — Battery is low, Cannot update firmware | Min: 0 | Max: 14|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|1|Command payload is accepted|The device accepted the payload<br>and is processing it<br>asynchronously|Wait for a follow-up event or poll status to confirm completion|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 4**


**RFD40 / RFD90 MQTT API Reference** Set Os






|Code|Description|Cause|Action|
|---|---|---|---|
|4|Firmware update in progress|A firmware update is already<br>running on the device|Wait for the current update to complete before sending another<br>set_os command|
|8|Insufficient flash size|Not enough free flash storage to<br>download the firmware file|Free up flash space or use a smaller firmware package|
|9|File not found|The specified file or certificate<br>could not be found on the device or<br>server|Verify the file path or URL is correct and the file exists|
|13|Firmware update Failed|The firmware download or<br>installation failed|Check the firmware URL, network connectivity, and retry the<br>update|
|14|Battery is low, Cannot update firmware|Battery charge is too low to safely<br>perform a firmware update|Charge the device or connect to external power before retrying|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 5**


