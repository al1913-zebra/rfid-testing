**RFD40 / RFD90 MQTT API Reference** **Install Certificate**

# **Install Certificate**


**Description**
**1. Description**


The install_certificate command installs certificates on the device for authentication purposes. Certificates can be downloaded from

HTTP sources or provided inline, and stored for WiFi, MQTT, and file store authentication. This command supports various certificate

types including CA certificates, client certificates, and client keys.


Use this command to:


 - Install WiFi authentication certificates

 - Deploy MQTT client and CA certificates

 - Configure file store authentication certificates

 - Update device security credentials

 - Establish secure communication channels


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Certificate Installation|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|delete_certificate, get_installed_certificate, config_endpoint|
|Required Request Fields|command, requestId, certDetails|
|Supported Certificate Types|client, server, mqtt, wifi, filestore|
|Supported Authentication Types|NONE, CERTIFICATE|
|Supported Certificate Sources|HTTP, DIRECT|
|Supported Verification Types|NONE, VERIFY_PEER, VERIFY_HOST, VERIFY_HOST_PEER|



**3. Before You Begin**


Gather certificate details and source information before sending this command. A missing URL, incorrect certificate type, or

unsupported authentication method will cause installation to fail.






|What You<br>Need|Details|
|---|---|
|Certificate<br>type|Identify where the certificate will be used — wifi for WiFi network authentication, mqtt for MQTT client and CA certificates, filestore<br>for file store authentication, client for client certificates, or server for server certificates.|
|Certificate<br>source|Decide how the certificate content is supplied — HTTP to download from a remote URL, or DIRECT to provide content inline in<br>certificateBundle. If certSource is omitted, the device defaults to HTTP.|
|Certificate<br>URLs|For HTTP source: have the full URLs ready for each certificate component (ca_cert, client_cert, client_key). Verify the URLs are<br>reachable from the device's network.|
|Inline<br>certificate<br>content|For DIRECT source: have the PEM or base64-encoded certificate content ready to supply in certificateBundle.|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** Install Certificate







|What You<br>Need|Details|
|---|---|
|Authentication<br>type|Decide how the certificate download server is secured — NONE for open servers, or CERTIFICATE for certificate-based download<br>authentication.|
|TLS<br>verification<br>type|Decide the verification level for the remote certificate source connection — NONE, VERIFY_PEER, VERIFY_HOST, or<br>VERIFY_HOST_PEER.|
|Logical name|Assign a meaningful logical name for the certificate entry via the name field. This name is used when referencing the certificate in<br>other commands such as set_wifi and config_endpoint.|


**4. Certificate Types**


The type field in certDetails defines where the certificate will be used. Choose the correct type based on the service that will consume

the certificate.


 - filestore — File store authentication certificates used for authenticating certificate downloads.

 - wifi — WiFi network authentication certificates for enterprise wireless connections.

 - mqtt — MQTT client certificates and CA certificates used for TLS-secured broker connections.

 - client — Client-side certificates for general authentication.

 - server — Server-side certificates.


**5. Authentication and Verification Options**


**Authentication Types (`authenticationType`)**


Specifies the authentication method used to access the remote certificate source when certSource is HTTP.


 - NONE — No authentication is used when downloading certificates.

 - CERTIFICATE — Certificate-based authentication used to download or retrieve certificates. Supply inline CA cert via

caCertificateFileContent, or leave empty to use an already installed filestore certificate.


**Certificate Sources (`certSource`)**


Specifies how the certificate content is supplied. This field is optional — if omitted, the device defaults to HTTP.


 - HTTP — Certificate content is downloaded from remote URLs specified in the url array. This is the default when certSource is

omitted.

 - DIRECT — Certificate content is provided inline in the certificateBundle object. No network download occurs.


**Verification Types (`verificationType`)**


Specifies the TLS verification mode used when validating remote endpoints during certificate download.


 - NONE — No TLS verification is performed.

 - VERIFY_PEER — Verifies the peer's certificate.

 - VERIFY_HOST — Verifies the host name matches the certificate.

 - VERIFY_HOST_PEER — Verifies both the host name and the peer certificate. Recommended for production.


**6. Rules and Constraints**


Violating any of these rules will cause the command to fail or the certificate to be installed incorrectly.


**certSource Defaults**


 - If certSource is omitted, the device defaults to HTTP and attempts to download from the URLs in the url array.

 - If certSource is DIRECT, the url array is ignored — provide content in certificateBundle instead.

 - DIRECT and HTTP cannot be combined in the same request.


**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 2**


**RFD40 / RFD90 MQTT API Reference** Install Certificate


**Authentication**


 - CERTIFICATE authentication can use inline CA certificate content in caCertificateFileContent, or an already installed filestore

certificate if that field is empty.


**MQTT Command Payload**


**Example: MQTT certificates with certificate authentication**

```
 {
 "command": "install_certificate",
 "requestId": "cert-test-001",
 "certDetails": {
 "type": "mqtt",
 "name": "testMqttCert",
 "authenticationType": "CERTIFICATE",
 "certSource": "HTTP",
 "verificationType": "VERIFY_PEER",
 "caCertificateFileContent": "-----BEGIN CERTIFICATE-----\nMIIDPTCCAiWgAwIBAgIUHtj1WDceNR9Nf+vZBB1Ne7sFmHkwDQYJKoZIhvcNAQEL\nB
 "url": [
 {
 "key": "ca_cert",
 "value": "https://192.168.0.104:8443/mqtt_ca_cert.pem"
 },
 {
 "key": "client_cert",
 "value": "https://192.168.0.104:8443/mqtt_client_cert.pem"
 },
 {
 "key": "client_key",
 "value": "https://192.168.0.104:8443/mqtt_client_key.pem"
 }
 ]
 }
 }

```

**Example: Filestore certificate with certificate authentication**

```
 {
 "command": "install_certificate",
 "requestId": "19001",
 "certDetails": {
 "name": "root_certs",
 "type": "filestore",
 "authenticationType": "CERTIFICATE",
 "certSource": "HTTP",
 "url": [
 {
 "key": "ca_cert",
 "value": "http://192.168.0.107:8080/filestore_ca_cert.pem"
 }
 ],
 "verificationType": "VERIFY_HOST_PEER"
 }

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 3


**RFD40 / RFD90 MQTT API Reference** Install Certificate

```
 }

```

**Example: MQTT certificates without authentication**

```
 {
 "command": "install_certificate",
 "requestId": "19001",
 "certDetails": {
 "name": "mqtt_certs",
 "type": "mqtt",
 "authenticationType": "NONE",
 "certSource": "HTTP",
 "url": [
 {
 "key": "client_cert",
 "value": "http://192.168.0.107:8080/mqtt_client_cert.pem"
 },
 {
 "key": "client_key",
 "value": "http://192.168.0.107:8080/mqtt_client_key.pem"
 },
 {
 "key": "ca_cert",
 "value": "http://192.168.0.107:8080/mqtt_ca_cert.pem"
 }
 ],
 "verificationType": "VERIFY_HOST_PEER"
 }
 }

```

**Example: WiFi certificates without authentication**

```
 {
 "command": "install_certificate",
 "requestId": "abc456",
 "certDetails": {
 "name": "wifi_test",
 "type": "wifi",
 "authenticationType": "NONE",
 "url": [
 {
 "key": "client_cert",
 "value": "http://192.168.0.107:8080/wifi_client_cert.pem"
 },
 {
 "key": "ca_cert",
 "value": "http://192.168.0.107:8080/wifi_ca_cert.pem"
 },
 {
 "key": "client_key",
 "value": "http://192.168.0.107:8080/wifi_client_key.pem"
 }

```

RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 4


**RFD40 / RFD90 MQTT API Reference** **Install Certificate**

```
 ],
 "verificationType": "NONE"
 }
 }

```

**Example: WiFi CA certificate using direct content**

```
 {
 "requestId": "0001",
 "command": "install_certificate",
 "certDetails": {
 "type": "wifi",
 "authenticationType": "NONE",
 "certSource": "DIRECT",
 "certificateBundle": {
 "ca_cert": "-----BEGIN CERTIFICATE-----\nMIIGDTCCA/WgAwIBAgIIfRvFn+r/D1YwDQYJKoZIhvcNAQELBQAwaTELMAkGA1UE\nBhMCQ0ExEDAOBgNV
 }
 }
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Command issued to install new certificate|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`certDetails`**|object|Defines the certificate details required for installation on the device.|
|**` name`**|string|A logical name for the certificate entry, typically representing the application, service, or<br>agent.|
|**` type*`**|enum|Certificate category that identifies where the certificate is used. | Allowed: client | server |<br>mqtt | wifi | filestore|
|**` authenticationType*`**|enum|Specifies the authentication method used to access the remote certificate source.<br>- `NONE`: No authentication is used.<br>- `CERTIFICATE`: Certificate-based authentication used to download or retrieve<br>certificates. | Allowed: NONE | CERTIFICATE|
|**` certSource`**|enum|Specifies how certificate content is supplied for installation. This field is optional.<br>If omitted, the default behavior is `HTTP`, and the device attempts to download<br>certificate content from the URLs provided in `url`.<br>- `DIRECT`: Certificate content is provided inline in `certificateBundle`.<br>- `HTTP`: Certificate content is downloaded from remote URLs in `url`.<br>For `HTTP` with `authenticationType` set to `CERTIFICATE`, authentication can use<br>inline certificate content in `caCertificateFileContent` or an already installed filestore<br>certificate. | Allowed: HTTP | DIRECT|
|**` url`**|array|A list of key-value entries that map certificate components to downloadable URLs.|
|**`  key`**|enum|The certificate component identifier. | Allowed: ca_cert | client_key | client_cert |<br>cert_key_password|
|**`  value`**|string|The URL for the specified component. For `cert_key_password`, this is the key<br>password value.|
|**` verificationType`**|enum|Specifies the TLS verification mode used when validating remote endpoints. | Allowed:<br>NONE | VERIFY_PEER | VERIFY_HOST | VERIFY_HOST_PEER|



RFD40 / RFD90 MQTT API Reference | Zebra Technologies Page 5


**RFD40 / RFD90 MQTT API Reference** **Install Certificate**



|Field|Type|Description|
|---|---|---|
|**` certificateBundle`**|object|Optional inline certificate payload used when `certSource` is `DIRECT`.<br>Provide certificate content for one certificate `type`: `client`, `server`, `mqtt`, `wifi`, or<br>`filestore`.|
|**`  ca_cert`**|string|Inline CA certificate content, typically in PEM or base64-encoded form.|
|**`  client_key`**|string|Inline client private key content, typically in PEM or base64-encoded form.|
|**`  client_cert`**|string|Inline client certificate content, typically in PEM or base64-encoded form.|
|**`  cert_key_password`**|string|Password used to decrypt an encrypted client private key, when required.|
|<br>**`caCertificateFileContent`**|string|Optional inline certificate content used only for remote certificate download<br>authentication.<br>- Not applicable when `certSource` is `DIRECT`.<br>- Applicable only when `certSource` is `HTTP` and `authenticationType` is<br>`CERTIFICATE`.<br>- If applicable and this field is empty, the device uses an already installed filestore<br>certificate for authentication.|


**MQTT Response Payload**


**Example**

```
 {

```



```
 "command": "install_certificate",
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
|**`command*`**|string|The command that was executed to install a certificate.|
|**`requestId*`**|string|The unique identifier of the original request.|
|**`apiVersion*`**|enum|Allowed: V1.0 | V1.1|
|**`response*`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 1 — Command payload is accepted<br>- 9 — File not found<br>- 21 — Certificate not found<br>- 23 — Invalid enum value | Min: 0 | Max: 23|
|**` description*`**|string|response description in detail|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 6**


**RFD40 / RFD90 MQTT API Reference** **Install Certificate**


**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|1|Command payload is accepted|The device accepted the payload<br>and is processing it<br>asynchronously|Wait for a follow-up event or poll status to confirm completion|
|9|File not found|The specified file or certificate<br>could not be found on the device or<br>server|Verify the file path or URL is correct and the file exists|
|21|Certificate not found|The specified certificate is not<br>installed on the device|Verify the certificate name and install it using install_certificate if<br>needed|
|23|Invalid enum value|A field value does not match any of<br>the allowed enum options|Check the schema for allowed values and correct the field|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 7**


