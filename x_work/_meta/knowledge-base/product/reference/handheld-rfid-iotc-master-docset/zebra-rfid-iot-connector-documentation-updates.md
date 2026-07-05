# **Zebra RFID IoT Connector** **Documentation Updates**

#### Gen2X APIs, Platform Strategy, and Handheld Reader Progress April 2026


### **Agenda**


- **Part 1:** Gen2X API Documentation for Fixed Readers

- **Part 2:** Platform Choice: Docusaurus vs Original Tooling

- **Part 3:** IoTC APIs Documentation Progress and Deadline for
Handheld Readers


# Part 1: Gen2X API Documentation for Fixed Readers


### **Gen2X API Documentation Status**


- The Impinj Gen2X API Reference documentation has undergone
thorough review and all feedback has been addressed.

- Assuming the latest updates are final and approved, as all
stakeholder clarifications have been resolved.

- Both REST and MQTT protocols are fully documented.


### **Resolved Feedback & Clarifications**


- **Feature Scope:** Clarified that only one Gen2X feature can be active
at a time.

- **Schema Consistency:** REST responses are now consistent across
all PUT /cloud/impinjGen2X operations. Start/Stop responses and
empty payloads (e.g., Get Gen2X Config) are clearly documented.

- **Validation Alignment:** tagID validation is now aligned between
MQTT and REST (^[0-9A-Fa-f]+$).

- **Device Support:** Explicitly highlighted in the introduction that these
APIs are _currently_ for the FXR90 device.

- **Naming Consistency:** Removed "Impinj" from section titles for a
cleaner, consistent look.


### **Publishing Strategy for Gen2X APIs**


- **Action Item:** Publish the finalized Gen2X APIs on the Zebra Tech
Docs portal.

- **Housekeeping:** The new Gen2X API documentation will replace the
deprecated "Xamarin for RFID SDK (iOS)" and "Xamarin for RFID
SDK (Android)" documentation on the portal.


# Part 2: Platform Choice: Docusaurus vs Original Tooling


### **Documentation Platform Strategy**


- We have evaluated the feedback comparing the Docusaurus
prototype with the original tooling.

- We understand the preference for the original version's features, but
Docusaurus is highly customizable and can accommodate all
requested functionalities.


### **Addressing Feedback in Docusaurus**


- **Search:** Docusaurus supports robust search using Algolia (paid) or
Docfind (free/open source).

- **PDF Download:** Can be fully implemented in Docusaurus.

- **Layout Preferences:**

  - Easier side-by-side access for MQTT and REST can be implemented

(though not standard practice).

  - "Expand all" and "Collapse all" for tables/code and preferred table

formatting can be achieved via custom schema rendering.

- **Elements to Avoid:** Right-hand navigation and "Use cases" can be
easily removed per the team's request.


## Part 3: IoTC APIs Documentation Progress and Deadline for Handheld Readers


### **Current Progress on Handheld Readers**


- **Conceptual Documentation:** The first draft of the conceptual docs
is 100% finished.

- **API Reference Schema:** The first draft of the API reference
schema is complete (pre-testing and validation phase).

- **Validation Phase:** Immanuel and I are currently validating each of
the 28 commands.


### **Handheld Readers Validation & Deadline**


- **Remaining Work:** We have 14 more endpoints left to validate out of
the total 28 commands.

- **Deadline:** We are on track to complete the full validation and
finalize the handheld readers documentation by Friday, May 8th,
2026.


