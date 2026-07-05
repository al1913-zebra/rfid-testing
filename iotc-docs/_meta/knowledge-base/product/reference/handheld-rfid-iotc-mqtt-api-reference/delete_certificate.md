**RFD40 / RFD90 MQTT API Reference** **Delete Certificate**

# **Delete Certificate**


**Description**
**1. Description**


The delete_certificate command removes a saved certificate from the reader. When you run this command, the certificate identified by

name and type is deleted from the device's certificate store.


Use this command to:


 - Remove expired or revoked certificates

 - Clean up the certificate store before installing updated certificates

 - Delete certificates that are no longer needed for Wi-Fi, MQTT, or file store authentication


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Certificate Deletion|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|install_certificate, get_installed_certificate|
|Required Request Fields|command, requestId, certificateInfo|
|Required Certificate Fields|type|
|Supported Certificate Types|client, server, mqtt, wifi, filestore|



**3. Before You Begin**


Gather certificate information before sending this command. An incorrect type or name that does not match a stored certificate will

cause the command to fail.

|What You Need|Details|
|---|---|
|Certificate type|Identify the type of certificate to delete — wifi, mqtt, filestore, client, or server. The type field is required.|
|Certificate name|Provide the logical name of the certificate to delete. If name is omitted, all certificates of the matching type are deleted.|



**4. Rules and Constraints**


Violating any of these rules will cause the command to fail.


 - The type field is required. The command will be rejected if type is missing.

 - If name is not provided, all certificates of the specified type are deleted.

 - The certificate must exist on the device. Attempting to delete a certificate that has not been installed will result in an error.

 - Certificates currently in active use (for example, an active Wi-Fi or MQTT connection) should be replaced before deletion.


**MQTT Command Payload**


**Example: Delete wifi ca cert**


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Delete Certificate**

```
 {
 "command": "delete_certificate",
 "requestId": "abc123",
 "certificateInfo": {
 "name": "ca_cert",
 "type": "wifi"
 }
 }

```

**Example: Delete mqtt client cert**

```
 {
 "command": "delete_certificate",
 "requestId": "abc123",
 "certificateInfo": {
 "name": "client_cert",
 "type": "mqtt"
 }
 }

```

**Example: Delete filestore ca cert**

```
 {
 "command": "delete_certificate",
 "requestId": "abc123",
 "certificateInfo": {
 "name": "ca_cert",
 "type": "filestore"
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command`**|string|Specifies the operation being performed, in this case, deleting saved certificates.|
|**`requestId`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`certificateInfo`**|object|Identifies the certificate to be deleted from the device.|
|**` name`**|string|Name of the certificate, If certificate name not provided, then we will delete all the<br>previously installed certificate of matching type.|
|**` type*`**|enum|Different types of supported certificate. | Allowed: server | client | mqtt | wifi | filestore|



**MQTT Response Payload**


**Example**






**RFD40 / RFD90 MQTT API Reference** **Delete Certificate**

```
 "command": "delete_certificate",
 "requestId": "abc123",
 "apiVersion": "V1.1",
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|The command that was executed to delete a certificate.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 9 — File not found<br>- 21 — Certificate not found | Min: 0 | Max: 21|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|9|File not found|The specified file or certificate<br>could not be found on the device or<br>server|Verify the file path or URL is correct and the file exists|
|21|Certificate not found|The specified certificate is not<br>installed on the device|Verify the certificate name and install it using install_certificate if<br>needed|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


