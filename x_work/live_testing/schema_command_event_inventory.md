# Command & Event Inventory
## Zebra IoT Connector for Handheld Readers (RFD40 / RFD90) — `openapi.json`

> A complete enumeration of every operation defined in the OpenAPI schema, classified as **Command** or **Event** and grouped by its functional category. Generated from `openapi.json` (`info.title` = "Zebra IoT Connector for Handheld Readers", `info.version` = `v2`, OpenAPI `3.0.0`).

---

## 1. Summary

The schema defines **27 operations** — every path is a single `POST`. Operations tagged **Control** or **Device Management** are request/response **commands** (they declare both a request body and a `200` response schema); operations tagged **Events** are one-way device-to-consumer **event** messages (they declare a payload body only, with no response schema).

| Category | Operation Type | Count |
|---|---|---:|
| Control | Command | 5 |
| Device Management | Command | 17 |
| Events | Event | 5 |
| **Total** | 22 Commands + 5 Events | **27** |

**Classification basis (schema `tags`):**
- **Control** — Control commands are structured APIs that enable users to control Handheld RFID device operations. These commands facilitate actions such as starting or stopping inventory scans, retrieving or setting operating modes, and configuring post-filters, ensuring precise and efficient control over the device's functionality.
- **Device Management** — The Device Management Commands are focused on managing IoT devices by performing tasks like configuration, endpoint management, and operational control. These commands enable efficient device administration, ensuring proper functionality and interaction with the system. They are key to streamlining device operations and maintaining effective management workflows.
- **Events** — The events are triggered by specific occurrences in IoT systems, such as battery status changes, firmware updates, or network events. These events are used for monitoring system health, notifying users, handling exceptions, and logging system activities. They ensure efficient communication, timely interventions, and reliable operation of IoT ecosystems. Their purpose is to centralize event handling and streamline responses to various IoT scenarios.

---

## 2. Master Inventory (all 27 operations)

| # | Operation | Type | Category | OpenAPI Path | Request Schema | Response Schema | Test Doc |
|---|---|---|---|---|---|---|---|
| 1 | `control_operation` | Command | Control | `/control_operation` | `commands/control/control_operation.json` | `response/control/control_operation.json` | `control_operation.md` |
| 2 | `get_operating_mode` | Command | Control | `/get_operating_mode` | `commands/control/get_operating_mode.json` | `response/control/get_operating_mode.json` | `get_operating_mode.md` |
| 3 | `get_post_filter` | Command | Control | `/get_post_filter` | `commands/control/get_post_filter.json` | `response/control/get_post_filter.json` | `get_post_filter.md` |
| 4 | `set_operating_mode` | Command | Control | `/set_operating_mode` | `commands/control/set_operating_mode.json` | `response/control/set_operating_mode.json` | `set_operating_mode.md` |
| 5 | `set_post_filter` | Command | Control | `/set_post_filter` | `commands/control/set_post_filter.json` | `response/control/set_post_filter.json` | `set_post_filter.md` |
| 6 | `config_endpoint` | Command | Device Management | `/config_endpoint` | `commands/dev_mgmt/config_endpoint.json` | `response/dev_mgmt/config_endpoint.json` | `config_endpoint.md` |
| 7 | `config_events` | Command | Device Management | `/config_events` | `commands/dev_mgmt/config_events.json` | `response/dev_mgmt/config_events.json` | `config_events.md` |
| 8 | `delete_certificate` | Command | Device Management | `/delete_certificate` | `commands/dev_mgmt/delete_certificate.json` | `response/dev_mgmt/delete_certificate.json` | — |
| 9 | `delete_wifi_profile` | Command | Device Management | `/delete_wifi_profile` | `commands/dev_mgmt/delete_wifi_profile.json` | `response/dev_mgmt/delete_wifi_profile.json` | `delete_wifi_profile.md` |
| 10 | `get_config` | Command | Device Management | `/get_config` | `commands/dev_mgmt/get_config.json` | `response/dev_mgmt/get_config.json` | — |
| 11 | `get_current_region` | Command | Device Management | `/get_current_region` | `commands/dev_mgmt/get_current_region.json` | `response/dev_mgmt/get_current_region.json` | `get_current_region.md` |
| 12 | `get_endpoint_config` | Command | Device Management | `/get_endpoint_config` | `commands/dev_mgmt/get_endpoint_config.json` | `response/dev_mgmt/get_endpoint_config.json` | `get_endpoint_config.md` |
| 13 | `get_eth` | Command | Device Management | `/get_eth` | `commands/dev_mgmt/get_eth.json` | `response/dev_mgmt/get_eth.json` | `get_eth.md` |
| 14 | `get_installed_certificate` | Command | Device Management | `/get_installed_certificate` | `commands/dev_mgmt/get_installed_certificate.json` | `response/dev_mgmt/get_installed_certificate.json` | `get_installed_certificates.md` |
| 15 | `get_status` | Command | Device Management | `/get_status` | `commands/dev_mgmt/get_status.json` | `response/dev_mgmt/get_status.json` | `get_status.md` |
| 16 | `get_version` | Command | Device Management | `/get_version` | `commands/dev_mgmt/get_version.json` | `response/dev_mgmt/get_version.json` | `get_version.md` |
| 17 | `get_wifi` | Command | Device Management | `/get_wifi` | `commands/dev_mgmt/get_wifi.json` | `response/dev_mgmt/get_wifi.json` | `get_wifi.md` |
| 18 | `install_certificate` | Command | Device Management | `/install_certificate` | `commands/dev_mgmt/install_certificate.json` | `response/dev_mgmt/install_certificate.json` | — |
| 19 | `reboot` | Command | Device Management | `/reboot` | `commands/dev_mgmt/reboot.json` | `response/dev_mgmt/reboot.json` | `reboot.md` |
| 20 | `set_config` | Command | Device Management | `/set_config` | `commands/dev_mgmt/set_config.json` | `response/dev_mgmt/set_config.json` | — |
| 21 | `set_os` | Command | Device Management | `/set_os` | `commands/dev_mgmt/set_os.json` | `response/dev_mgmt/set_os.json` | — |
| 22 | `set_wifi` | Command | Device Management | `/set_wifi` | `commands/dev_mgmt/set_wifi.json` | `response/dev_mgmt/set_wifi.json` | `set_wifi.md` |
| 23 | `alerts` | Event | Events | `/alerts` | `events/alerts.json` | — (none) | — |
| 24 | `alert_short` | Event | Events | `/alert_short` | `events/alert_short.json` | — (none) | — |
| 25 | `dataEVT` | Event | Events | `/dataEVT` | `events/dataEVT.json` | — (none) | `dataEVT.md` |
| 26 | `heartBeatEVT` | Event | Events | `/heartBeatEVT` | `events/heartBeatEVT.json` | — (none) | `heartBeatEVT.md` |
| 27 | `mqttConnEVT` | Event | Events | `/mqttConnEVT` | `events/mqttConnEVT.json` | — (none) | `mqttConnEVT.md` |

---

## 3. Control Commands (5)

### `control_operation`

- **Type:** Command &nbsp;|&nbsp; **Category:** Control &nbsp;|&nbsp; **Path:** `/control_operation`
- **Description:** This command controls device functionality, including RFID operations and scan operations.
- **Request / payload schema:** `commands/control/control_operation.json`
- **Response schema:** `response/control/control_operation.json`
- **Verified test doc:** `control_operation.md`

### `get_operating_mode`

- **Type:** Command &nbsp;|&nbsp; **Category:** Control &nbsp;|&nbsp; **Path:** `/get_operating_mode`
- **Description:** This command is designed to fetch the current operating mode information of RFID device within the IOTC system
- **Request / payload schema:** `commands/control/get_operating_mode.json`
- **Response schema:** `response/control/get_operating_mode.json`
- **Verified test doc:** `get_operating_mode.md`

### `get_post_filter`

- **Type:** Command &nbsp;|&nbsp; **Category:** Control &nbsp;|&nbsp; **Path:** `/get_post_filter`
- **Description:** This operation is used to fetch the post filter applied to filter tag data in RFID devices. The post filter ensures that only relevant tag data is processed based on specified criteria.
- **Request / payload schema:** `commands/control/get_post_filter.json`
- **Response schema:** `response/control/get_post_filter.json`
- **Verified test doc:** `get_post_filter.md`

### `set_operating_mode`

- **Type:** Command &nbsp;|&nbsp; **Category:** Control &nbsp;|&nbsp; **Path:** `/set_operating_mode`
- **Description:** This operation is used to configure the operating mode of RFID devices. Note: When RFD40/90 sled is configured to FAST_READ profile, data events are not currently supported. On reboot the set configurations will be lost and the device will go back to default operating mode.
- **Request / payload schema:** `commands/control/set_operating_mode.json`
- **Response schema:** `response/control/set_operating_mode.json`
- **Verified test doc:** `set_operating_mode.md`

### `set_post_filter`

- **Type:** Command &nbsp;|&nbsp; **Category:** Control &nbsp;|&nbsp; **Path:** `/set_post_filter`
- **Description:** This operation is used to set a post-filter for RFID device, enabling the filtering of tags scanned by the device based on specific criteria.
- **Request / payload schema:** `commands/control/set_post_filter.json`
- **Response schema:** `response/control/set_post_filter.json`
- **Verified test doc:** `set_post_filter.md`

---

## 4. Device Management Commands (17)

### `config_endpoint`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/config_endpoint`
- **Description:** Using config_endpoint user can add/delete/modify the end point configuration
- **Request / payload schema:** `commands/dev_mgmt/config_endpoint.json`
- **Response schema:** `response/dev_mgmt/config_endpoint.json`
- **Verified test doc:** `config_endpoint.md`

### `config_events`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/config_events`
- **Description:** Enables or disables specific device events. To apply the changes, a device reboot is required.
- **Request / payload schema:** `commands/dev_mgmt/config_events.json`
- **Response schema:** `response/dev_mgmt/config_events.json`
- **Verified test doc:** `config_events.md`

### `delete_certificate`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/delete_certificate`
- **Description:** Command issued to delete saved certificate
- **Request / payload schema:** `commands/dev_mgmt/delete_certificate.json`
- **Response schema:** `response/dev_mgmt/delete_certificate.json`
- **Verified test doc:** none — *untested*

### `delete_wifi_profile`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/delete_wifi_profile`
- **Description:** Command issued to delete saved wifi profile
- **Request / payload schema:** `commands/dev_mgmt/delete_wifi_profile.json`
- **Response schema:** `response/dev_mgmt/delete_wifi_profile.json`
- **Verified test doc:** `delete_wifi_profile.md`

### `get_config`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_config`
- **Description:** Command issued to retrieve the complete device configuration such as version details, device status, current region details, ethernet & wifi configuration, end point configuration, details of installed certificates, event and alert configuration
- **Request / payload schema:** `commands/dev_mgmt/get_config.json`
- **Response schema:** `response/dev_mgmt/get_config.json`
- **Verified test doc:** none — *untested*

### `get_current_region`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_current_region`
- **Description:** This command is used to retrieve the current region configuration of the device.
- **Request / payload schema:** `commands/dev_mgmt/get_current_region.json`
- **Response schema:** `response/dev_mgmt/get_current_region.json`
- **Verified test doc:** `get_current_region.md`

### `get_endpoint_config`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_endpoint_config`
- **Description:** Command to get configured endpoints.If API does not included endpointName argument, then  response includes all active endpoints detailed configuration & list of all saved endpoint names otherwise response includes interested endpoints configuration only
- **Request / payload schema:** `commands/dev_mgmt/get_endpoint_config.json`
- **Response schema:** `response/dev_mgmt/get_endpoint_config.json`
- **Verified test doc:** `get_endpoint_config.md`

### `get_eth`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_eth`
- **Description:** This API used to retrieve ethernet configuration details. Security features, static IP configuration, and IPv6 support are not available in the current API version.
- **Request / payload schema:** `commands/dev_mgmt/get_eth.json`
- **Response schema:** `response/dev_mgmt/get_eth.json`
- **Verified test doc:** `get_eth.md`

### `get_installed_certificate`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_installed_certificate`
- **Description:** This API is used to get installed certificates.
- **Request / payload schema:** `commands/dev_mgmt/get_installed_certificate.json`
- **Response schema:** `response/dev_mgmt/get_installed_certificate.json`
- **Verified test doc:** `get_installed_certificates.md` *(filename differs from operation name)*

### `get_status`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_status`
- **Description:** This command used to retrieve the reader status information.
- **Request / payload schema:** `commands/dev_mgmt/get_status.json`
- **Response schema:** `response/dev_mgmt/get_status.json`
- **Verified test doc:** `get_status.md`

### `get_version`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_version`
- **Description:** This command is used to retrieve the reader information like device serial no, model no, sku, and firmware version information.
- **Request / payload schema:** `commands/dev_mgmt/get_version.json`
- **Response schema:** `response/dev_mgmt/get_version.json`
- **Verified test doc:** `get_version.md`

### `get_wifi`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/get_wifi`
- **Description:** This command is used to retrieve wifi configuration details
- **Request / payload schema:** `commands/dev_mgmt/get_wifi.json`
- **Response schema:** `response/dev_mgmt/get_wifi.json`
- **Verified test doc:** `get_wifi.md`

### `install_certificate`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/install_certificate`
- **Description:** This API is used to install certificates.
- **Request / payload schema:** `commands/dev_mgmt/install_certificate.json`
- **Response schema:** `response/dev_mgmt/install_certificate.json`
- **Verified test doc:** none — *untested*

### `reboot`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/reboot`
- **Description:** Reboot command is used to perform warm reset of device. After successful reboot, device will reinitiate the connection to previously connected server. Upon failure notification will be sent.
- **Request / payload schema:** `commands/dev_mgmt/reboot.json`
- **Response schema:** `response/dev_mgmt/reboot.json`
- **Verified test doc:** `reboot.md`

### `set_config`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/set_config`
- **Description:** Command issued to set the complete device configuration such as current region details, ethernet & wifi configuration, end point configuration,  event and alert configuration
- **Request / payload schema:** `commands/dev_mgmt/set_config.json`
- **Response schema:** `response/dev_mgmt/set_config.json`
- **Verified test doc:** none — *untested*

### `set_os`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/set_os`
- **Description:** Command issued to set new firmware & initiate firmware update
- **Request / payload schema:** `commands/dev_mgmt/set_os.json`
- **Response schema:** `response/dev_mgmt/set_os.json`
- **Verified test doc:** none — *untested*

### `set_wifi`

- **Type:** Command &nbsp;|&nbsp; **Category:** Device Management &nbsp;|&nbsp; **Path:** `/set_wifi`
- **Description:** This API is used to set wifi configuration. It currently supports IPv4 addressing with DHCP-based IP assignment only, static IP configuration and IPv6 support is not available in the current API version.
- **Request / payload schema:** `commands/dev_mgmt/set_wifi.json`
- **Response schema:** `response/dev_mgmt/set_wifi.json`
- **Verified test doc:** `set_wifi.md`

---

## 5. Events (5)

*Events are asynchronous messages emitted by the device. In the schema each is modeled by a request-body payload schema and declares **no response**.*

### `alerts`

- **Type:** Event &nbsp;|&nbsp; **Category:** Events &nbsp;|&nbsp; **Path:** `/alerts`
- **Description:** Represents a system-generated alert or notification event. Note: Currently event types such as antenna, temperature, exceptions, CPU usage, GPI, and user app info are not supported.
- **Request / payload schema:** `events/alerts.json`
- **Response schema:** *none (one-way event)*
- **Verified test doc:** none — *untested*

### `alert_short`

- **Type:** Event &nbsp;|&nbsp; **Category:** Events &nbsp;|&nbsp; **Path:** `/alert_short`
- **Description:** Short form of alerts, does not contain details about the alert. This is mainly meant for SOTI.
- **Request / payload schema:** `events/alert_short.json`
- **Response schema:** *none (one-way event)*
- **Verified test doc:** none — *untested*

### `dataEVT`

- **Type:** Event &nbsp;|&nbsp; **Category:** Events &nbsp;|&nbsp; **Path:** `/dataEVT`
- **Description:** Data Events capture and represent the structured information related to various events generated by the system. These events may include tag data, barcode data, and other relevant event-related details. They are utilized for tracking, monitoring, and analyzing system operations and behaviors in real-time or during post-event reviews.
- **Request / payload schema:** `events/dataEVT.json`
- **Response schema:** *none (one-way event)*
- **Verified test doc:** `dataEVT.md`

### `heartBeatEVT`

- **Type:** Event &nbsp;|&nbsp; **Category:** Events &nbsp;|&nbsp; **Path:** `/heartBeatEVT`
- **Description:** This event represents a heartbeat signal sent periodically from a device or system to indicate its active status and provide essential metadata like uptime and event details.
- **Request / payload schema:** `events/heartBeatEVT.json`
- **Response schema:** *none (one-way event)*
- **Verified test doc:** `heartBeatEVT.md`

### `mqttConnEVT`

- **Type:** Event &nbsp;|&nbsp; **Category:** Events &nbsp;|&nbsp; **Path:** `/mqttConnEVT`
- **Description:** This event provides details about the connection state of a device, including its metadata and protocol versions.
- **Request / payload schema:** `events/mqttConnEVT.json`
- **Response schema:** *none (one-way event)*
- **Verified test doc:** `mqttConnEVT.md`

---

## 6. Coverage note

Of the 27 operations, **20 have a verified test-documentation markdown file** and **7 do not** (no matching `.md`): `delete_certificate`, `get_config`, `install_certificate`, `set_config`, `set_os`, `alerts`, `alert_short`.

Naming nuance: the schema path `get_installed_certificate` (singular) is documented by `get_installed_certificates.md` (plural).

---

*End of inventory — 27 operations (22 commands, 5 events).*
