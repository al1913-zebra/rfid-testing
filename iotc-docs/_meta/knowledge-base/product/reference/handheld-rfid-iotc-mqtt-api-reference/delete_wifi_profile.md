**RFD40 / RFD90 MQTT API Reference** **Delete Wifi Profile**

# **Delete Wifi Profile**


**Description**
**1. Description**


The delete_wifi_profile command removes a saved Wi-Fi profile from the reader. When you run this command, the profile identified by

ESSID is deleted from stored Wi-Fi configurations.


Use this command to:


 - Remove obsolete or incorrect Wi-Fi profiles

 - Clean up profile lists before adding updated configurations

 - Manage active and fallback network profile sets


**2. Command Details**

|Property|Value|
|---|---|
|Pattern Name|Wi-Fi Profile Deletion|
|Applies To|RFD40 Series, RFD90 Series|
|Related Commands|set_wifi, get_wifi, delete_certificate|
|Required Request Fields|command, requestId, wifiProfileInfo|
|Supported Identifier|essid|



**3. Before You Begin**


Gather Wi-Fi profile information before sending this command. An invalid SSID or attempting to delete an active connection will cause

the command to fail.

|What You Need|Details|
|---|---|
|SSID|Identify the exact ESSID of the Wi-Fi profile you want to delete. The profile must exist in the saved Wi-Fi configurations.|
|Connection Status|Verify the profile is not currently active. You cannot delete a profile that the device is actively connected to.|



_Important: Before deleting a Wi-Fi profile, ensure you are not currently connected to that network. Attempting to delete an active_

_SSID will result in error code 16._


**MQTT Command Payload**


**Example**

```
 {
 "command": "delete_wifi_profile",
 "requestId": "abc123",
 "wifiProfileInfo": {
 "essid": "TestAP2"
 }

```

**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 1**


**RFD40 / RFD90 MQTT API Reference** **Delete Wifi Profile**

```
 }

```

**Command Schema**

|Field|Type|Description|
|---|---|---|
|**`command*`**|string|Specifies the operation being performed, in this case, deleting wifi profile. | Default:<br>"delete_wifi_profile"|
|**`requestId*`**|string|A unique identifier for the request, allowing tracking and debugging of the operation.|
|**`wifiProfileInfo`**|object|Identifies the WiFi profile to be deleted from the device.|
|**` essid`**|string|SSID of the wifi profile to be deleted|



**MQTT Response Payload**


**Example: Successful deletion**

```
 {
 "command": "delete_wifi_profile",
 "requestId": "abc345",
 "response": {
 "code": 0,
 "description": "Success"
 }
 }

```

**Example: Cannot delete active SSID**

```
 {
 "command": "delete_wifi_profile",
 "requestId": "1235",
 "apiVersion": "V1.1",
 "response": {
 "code": 16,
 "description": "WIFI Error - Cannot delete active SSID"
 }
 }

```

**Example: SSID not found**




**RFD40 / RFD90 MQTT API Reference** **Delete Wifi Profile**


**Response Schema**

|Field|Type|Description|
|---|---|---|
|**`command`**|string|The command that was executed to delete a WiFi profile. | Default: "delete_wifi_profile"|
|**`requestId`**|string|The unique identifier of the original request. | Default: 1235|
|**`response`**|object|Standard response object containing the status code and description of the operation<br>result.|
|**` code*`**|integer|Response code indicating success or failure.<br>- 0 — Success<br>- 2 — Invalid payload<br>- 15 — WIFI Error - SSID not found<br>- 16 — WIFI Error - Cannot delete active SSID<br>- 17 — WIFI Error - SSID missed | Min: 0 | Max: 17|
|**` description*`**|string|response description in detail|



**Error Codes**






|Code|Description|Cause|Action|
|---|---|---|---|
|0|Success|Command executed successfully|No action required|
|2|Invalid payload|The JSON payload is malformed or<br>contains invalid field values|Validate the payload against the command schema and correct<br>any errors|
|15|WIFI Error - SSID not found|The specified Wi-Fi SSID does not<br>exist in saved profiles|Verify the SSID name is correct and that the profile has been<br>saved|
|16|WIFI Error - Cannot delete active SSID|The Wi-Fi profile being deleted is<br>the currently connected network|Disconnect from the network or connect to a different SSID before<br>deleting|
|17|WIFI Error - SSID missed|The required SSID field is missing<br>from the payload|Include the SSID field in the command payload|



**RFD40 / RFD90 MQTT API Reference | Zebra Technologies** **Page 3**


