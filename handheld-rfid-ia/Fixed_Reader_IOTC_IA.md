**ZEBRA TECHNOLOGIES**

**FXR90 Ultra-Rugged Fixed RFID Reader**

Developer Manual

Information Architecture & Structural Blueprint

_Document Type: Structural Plan (No Content Generation)_

Version 1.0 | March 2026

**CONFIDENTIAL**

[1\. Executive Summary 4](#_Toc231811089)

[1.1 Scope of This Blueprint 4](#_Toc231811090)

[1.2 Key Design Decisions 4](#_Toc231811091)

[2\. Audience Analysis & Developer Personas 5](#_Toc231811092)

[2.1 Primary Personas 5](#_Toc231811093)

[2.2 Persona-to-Content Mapping 5](#_Toc231811094)

[3\. Content-Type Taxonomy 7](#_Toc231811095)

[4\. Detailed Table of Contents 8](#_Toc231811096)

[PART I - Foundations 8](#_Toc231811097)

[1\. Introduction ★ 8](#_Toc231811098)

[2\. RFID Fundamentals ★ 8](#_Toc231811099)

[3\. System Architecture Overview ★ 9](#_Toc231811100)

[4\. Quick Start Guide ★ 9](#_Toc231811101)

[PART II - Configuration & Operation 10](#_Toc231811102)

[5\. Authentication & Security ★ 10](#_Toc231811103)

[6\. Operating Modes ★ 10](#_Toc231811104)

[7\. Communication Protocols ★ 10](#_Toc231811105)

[8\. Connectivity 11](#_Toc231811106)

[PART III - Tutorials 12](#_Toc231811107)

[9\. Tutorial: Reading Tags via REST API ★ 12](#_Toc231811108)

[10\. Tutorial: Reading Tags via MQTT 12](#_Toc231811109)

[11\. Tutorial: Portal Mode with GPI Triggers 12](#_Toc231811110)

[12\. Tutorial: Writing Tags 12](#_Toc231811111)

[13\. Tutorial: Building a Data Analytics (DA) App 13](#_Toc231811112)

[14\. Tutorial: Streaming Tag Data to AWS / Azure 13](#_Toc231811113)

[PART IV - API Reference 14](#_Toc231811114)

[15\. REST API Reference ★ 14](#_Toc231811115)

[16\. MQTT API Reference 15](#_Toc231811116)

[17\. Data Schemas & Event Payloads ★ 15](#_Toc231811117)

[18\. Error Reference 16](#_Toc231811118)

[PART V - Advanced Topics 17](#_Toc231811119)

[19\. Advanced RFID Configuration 17](#_Toc231811120)

[20\. GPIO, LED, and Event-Driven Automation 17](#_Toc231811121)

[21\. Deployment Best Practices 17](#_Toc231811122)

[22\. Logging, Monitoring, and Diagnostics 17](#_Toc231811123)

[PART VI - Migration & Appendices 19](#_Toc231811124)

[23\. Migration Guide: FX9600 to FXR90 ★ 19](#_Toc231811125)

[24\. Troubleshooting 19](#_Toc231811126)

[25\. Glossary 19](#_Toc231811127)

[26\. Changelog 19](#_Toc231811128)

[Appendices 19](#_Toc231811129)

[5\. Information Design Principles 21](#_Toc231811130)

[5.1 Modularity 21](#_Toc231811131)

[5.2 Progressive Disclosure 21](#_Toc231811132)

[5.3 Visual Hierarchy & Scannability 22](#_Toc231811133)

[5.4 Task Orientation 22](#_Toc231811134)

[5.5 Consistency & Convention 22](#_Toc231811135)

[6\. Navigation Model & Cross-Reference Strategy 24](#_Toc231811136)

[6.1 Cross-Reference Patterns 24](#_Toc231811137)

[6.2 Content Dependency Map 25](#_Toc231811138)

[7\. Format Specifications & Conventions 26](#_Toc231811139)

[7.1 Reference Page Template 26](#_Toc231811140)

[7.2 Tutorial Template 26](#_Toc231811141)

[7.3 Code Example Standards 26](#_Toc231811142)

[8\. Implementation Priorities 28](#_Toc231811143)

[8.1 Phase 1: Minimum Viable Documentation (MVD) 28](#_Toc231811144)

[8.2 Phase 2: Full Coverage 28](#_Toc231811145)

[8.3 Phase 3: Advanced & Polish 28](#_Toc231811146)

[9\. Quality Evaluation Framework 29](#_Toc231811147)

# 1\. Executive Summary

This document presents the complete information architecture and structural blueprint for the new FXR90 Ultra-Rugged Fixed RFID Reader Developer Manual. It synthesizes analysis of the existing Zebra IoT Connector documentation, the FXR90 product specifications, and established best practices from the field of API documentation design.

The blueprint defines the high-level Table of Contents, the logical content flow, content-type taxonomy, audience segmentation, navigation model, and information design principles that will govern the production of the final developer manual. It does not contain the manual's actual content.

## 1.1 Scope of This Blueprint

Detailed Table of Contents with three levels of hierarchy

Content-type classification for every section (Conceptual, Tutorial, Reference, Guide)

Audience mapping against defined developer personas

Logical flow and dependency map between sections

Information design principles: modularity, progressive disclosure, visual hierarchy

Navigation model and cross-referencing strategy

Recommendations for format conventions, code samples, and interactive elements

## 1.2 Key Design Decisions

Hybrid organization: Task-oriented top-level navigation with a comprehensive API Reference section organized by resource, avoiding duplication while supporting both exploration and lookup workflows.

Progressive disclosure: Content layered from Quick Start through Advanced Topics, allowing developers at different skill levels to enter the documentation at their appropriate depth.

Protocol-agnostic core with protocol-specific branches: Since the IoT Connector supports REST, MQTT, and WebSocket, the architecture treats protocol selection as a cross-cutting concern documented once and referenced throughout, rather than duplicating content per protocol.

Modular content types: Each section follows a defined content-type template (Conceptual, Tutorial, Reference, or Guide) ensuring consistency across the documentation set.

# 2\. Audience Analysis & Developer Personas

Effective information architecture begins with a precise understanding of who will use the documentation and what they need to accomplish. The FXR90 developer manual serves four distinct personas, each with different entry points, reading patterns, and success criteria.

## 2.1 Primary Personas

| **Persona**             | **Description**                                                                                                                                                                        | **Primary Need**                                                                            | **Entry Point**                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------- |
| The New Integrator      | First time integrating with a Zebra RFID reader or the IoT Connector interface. May have general development experience but lacks RFID domain knowledge.                               | Understand RFID fundamentals, get the reader operational, make a first successful API call. | Quick Start Guide, RFID Basics           |
| The Solution Builder    | Experienced developer building a production RFID solution. Understands RFID concepts but needs to configure the FXR90 for specific deployment scenarios (portal, conveyor, inventory). | Configure operating modes, set up endpoints, deploy DA apps, optimize for their use case.   | Operating Modes, Tutorials, DA App Guide |
| The API Consumer        | Experienced developer who primarily needs endpoint reference information. Already has a working integration and needs to look up specific parameters, payloads, or error codes.        | Find precise request/response details for specific endpoints quickly.                       | REST API Reference, MQTT API Reference   |
| The Migration Developer | Currently operating on the FX9600 platform and migrating to FXR90. Needs to understand differences, new capabilities, and required code changes.                                       | Identify breaking changes, map old commands to new, validate migration completeness.        | Migration Guide (FX9600 to FXR90)        |

## 2.2 Persona-to-Content Mapping

Each persona follows a different path through the documentation. The architecture must support all four paths simultaneously without creating redundancy.

| **Documentation Section**       | **New Integrator** | **Solution Builder** | **API Consumer** | **Migration Dev** |
| ------------------------------- | ------------------ | -------------------- | ---------------- | ----------------- |
| RFID Fundamentals               | PRIMARY            | Skim / Skip          | Skip             | Skip              |
| Quick Start Guide               | PRIMARY            | Skim                 | Skip             | Reference         |
| System Architecture Overview    | Read               | PRIMARY              | Skim             | Read              |
| Operating Modes & Configuration | Reference          | PRIMARY              | Reference        | PRIMARY           |
| Tutorials (Task-Oriented)       | PRIMARY            | PRIMARY              | Skip             | Selective         |
| REST API Reference              | Reference          | PRIMARY              | PRIMARY          | PRIMARY           |
| MQTT API Reference              | Skip               | PRIMARY              | PRIMARY          | PRIMARY           |
| DA App Development Guide        | Skip               | PRIMARY              | Skip             | Reference         |
| Advanced Topics                 | Skip               | Selective            | Selective        | Selective         |
| Migration Guide (FX9600)        | N/A                | N/A                  | N/A              | PRIMARY           |
| Error Reference                 | Reference          | Reference            | PRIMARY          | Reference         |
| Troubleshooting                 | PRIMARY            | Reference            | Reference        | PRIMARY           |

# 3\. Content-Type Taxonomy

Every section in the developer manual is classified into one of four content types. Each type follows a defined template, serves a distinct purpose, and answers a different category of developer question. This taxonomy ensures structural consistency and prevents content drift.

| **Content Type** | **Developer Question**                                                    | **Characteristics**                                                                                                | **Template Pattern**                                                                          |
| ---------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Conceptual       | What is this? Why does it exist? How does it work at a high level?        | Explanatory prose, diagrams, architectural overviews. No executable code. Builds mental models.                    | Title → Overview paragraph → Diagram → Key concepts → How it fits together → What's next      |
| Tutorial         | How do I accomplish this specific task end-to-end?                        | Step-by-step instructions with prerequisites, numbered steps, expected outcomes. Runnable code at every step.      | Title → Goal statement → Prerequisites → Numbered steps → Verification → Next steps           |
| Reference        | What are the exact parameters, payloads, and responses for this endpoint? | Exhaustive, scannable, structured. Every field documented. No narrative. Optimized for lookup.                     | Endpoint header → Description → Parameters → Request body → Response → Error codes → Examples |
| Guide            | How do I think about this domain area and make good decisions within it?  | Combines conceptual explanation with practical recommendations. May include code snippets but is not step-by-step. | Title → Context → Decision framework → Options with trade-offs → Recommendations → Examples   |

**Design Principle: One Page, One Content Type**

Each page in the documentation should be classified as exactly one content type. Mixing tutorial steps into a reference page, or embedding conceptual explanations inside API endpoint documentation, degrades both discoverability and maintenance. Cross-references connect the types; they do not merge them.

# 4\. Detailed Table of Contents

The following TOC represents the complete information architecture for the FXR90 Developer Manual. Each entry includes its content type classification and a brief structural note. The TOC uses three levels of hierarchy maximum, consistent with navigation usability best practices.

**Reading This TOC**

Content type labels are shown in brackets: \[Conceptual\], \[Tutorial\], \[Reference\], \[Guide\]. Entries marked with ★ are high-priority for the Minimum Viable Documentation (MVD) release.

## PART I - Foundations

_Establishes the conceptual and practical foundation required before any API interaction. Targeted primarily at the New Integrator persona, but also serves as an orientation for all other personas._

### 1\. Introduction ★

\[Conceptual\] Product overview, document purpose, supported reader model, related documents, and service support contact information. Establishes the scope of the IoT Connector as the primary programmatic interface for the FXR90.

1.1 About This Document

1.2 Supported Hardware (FXR90 specifications and capabilities)

1.3 Related Documents and Resources (Quick Reference Guide, Integration Guide, Product Reference)

1.4 How to Use This Manual (skill-level pathways, conventions, iconography)

1.5 Service Support and Contact Information

### 2\. RFID Fundamentals ★

\[Conceptual\] Primer on UHF RFID technology per the GS1 EPC C1G2 specification. Required reading only for developers new to RFID. Other personas may skip.

2.1 What Is RFID? (Radio-frequency identification overview, UHF frequency range 860-960 MHz)

2.2 Building Blocks: Readers, Antennas, and Tags

2.3 Tag Types: Passive vs. Battery Assisted Passive (BAP)

2.4 Tag Memory Map (Reserved, EPC, TID, User memory banks)

2.5 Sessions, Inventoried Flags, and Tag Persistence

2.6 Managing Tag Populations: Select, Inventory, and Access Operations

2.7 Access Commands: Read, Write, Kill, Lock

### 3\. System Architecture Overview ★

\[Conceptual\] How the FXR90 software stack is organized and how the IoT Connector mediates between the reader hardware and external applications.

3.1 What Is the Zebra IoT Connector?

3.2 Architecture Diagram: Reader → IoT Connector → External Systems

3.3 Interface Model (Management, Control, Data, Management Events)

3.4 Supported Communication Protocols (REST, MQTT, WebSocket, HTTP POST)

3.5 Data Flow: Tag Read → Processing → Event Delivery

3.6 Batching and Retention (default: 150,000 tag events; 500 tags/sec stream-back)

3.7 Endpoint Configuration Model (Data endpoints, Management Event endpoints)

### 4\. Quick Start Guide ★

\[Tutorial\] Gets the reader operational from unboxing to first successful tag read in the shortest path possible. Every step is verifiable.

4.1 Prerequisites (hardware, network, antenna, tags)

4.2 Step 1: Power Up and Connect

4.3 Step 2: Access the Reader Web UI (<https://fxr90AABBCC>)

4.4 Step 3: Change the Default Password

4.5 Step 4: Set the Regulatory Region

4.6 Step 5: Run the Tag Reading Demo

4.7 Step 6: Make Your First REST API Call (GET /cloud/status)

4.8 Verify Your Setup Checklist

4.9 What's Next (links to Operating Modes, Tutorials, API Reference)

## PART II - Configuration & Operation

_Covers the primary configuration and operational concepts developers need to deploy the FXR90 in real-world scenarios. Targeted at the Solution Builder persona._

### 5\. Authentication & Security ★

\[Guide\] How to authenticate with the reader and secure communications.

5.1 Authentication Model: Basic Auth and Bearer Tokens

5.2 Login Flow: /cloud/localRestLogin

5.3 Password Management: /cloud/updatePassword

5.4 Certificate Management (Server, Client, App certificate types)

5.5 Supported Certificate Formats (PFX) and Installation Methods (HTTPS, FTPS, SFTP)

5.6 TLS Configuration and Secure Endpoints

### 6\. Operating Modes ★

\[Guide\] The central configuration concept of the IoT Connector. Defines how the reader performs RFID operations.

6.1 Operating Mode Overview (what modes are and why they matter)

6.2 Simple Mode (report all unique tags across all antennas)

6.3 Inventory Mode (report unique tags per antenna at periodic intervals)

6.4 Portal Mode (GPI-triggered reads with stop conditions)

6.5 Conveyor Mode (continuous reporting per antenna)

6.6 Custom Mode (advanced parameter control)

6.7 Environment Configuration (Low/High/Very High Interference, Auto Detect, Demo)

6.8 Antenna Selection and Transmit Power

6.9 Tag Reporting Options (unique, per-interval, per-antenna)

6.10 C1G2 Commands Within Modes (Select, Query, Access)

6.11 Mode Selection Decision Matrix

### 7\. Communication Protocols ★

\[Guide\] How to choose and configure the protocol for each interface (Management, Control, Data, Events).

7.1 Protocol Overview: REST vs. MQTT vs. WebSocket vs. HTTP POST

7.2 Protocol Comparison Matrix (pros, cons, and use-case fit)

7.3 Endpoint Configuration for Each Protocol

7.4 MQTT Topics and QoS Levels (0, 1, 2 with trade-off guidance)

7.5 MQTT Command/Response Format

7.6 WebSocket Connection Management

7.7 HTTP POST Limitations and When to Avoid It

7.8 MQTT over WebSockets

7.9 Cloud Integration: AWS and Azure Endpoint Configuration

7.10 Protocol Selection Decision Flowchart

### 8\. Connectivity

\[Guide\] Configuration of the FXR90's network and wireless interfaces.

8.1 Ethernet Configuration

8.2 WiFi Setup (Indoor and Outdoor antennas, WiFi 6 support)

8.3 Bluetooth Configuration

8.4 Cellular / WAN (5G, physical SIM, eSIM configuration)

8.5 WiFi Hotspot (WPA2/3, WAN tethering)

8.6 GPS and Location Services (reader location, tag-data GPS enrichment)

8.7 Antenna Accessories and Port Mapping (cellular, WiFi, GPS antenna specs)

8.8 Network Interface Priority and Failover

## PART III - Tutorials

_Task-oriented, end-to-end walkthroughs for the most common integration scenarios. Each tutorial is self-contained with prerequisites, numbered steps, and verifiable outcomes._

### 9\. Tutorial: Reading Tags via REST API ★

\[Tutorial\] Complete walkthrough from authentication to receiving tag data over REST.

9.1 Prerequisites and Setup

9.2 Authenticate and Obtain a Bearer Token

9.3 Set the Operating Mode to Simple

9.4 Start the Inventory

9.5 Consume Tag Data Events

9.6 Stop the Inventory

9.7 Full Working Code Example (cURL + Python)

### 10\. Tutorial: Reading Tags via MQTT

\[Tutorial\] End-to-end tag reading using MQTT protocol with a broker.

10.1 Prerequisites (MQTT broker setup)

10.2 Configure MQTT Endpoints on the Reader

10.3 Subscribe to Tag Data Topics

10.4 Send Control Commands via MQTT

10.5 Process Tag Events

10.6 Full Working Code Example

### 11\. Tutorial: Portal Mode with GPI Triggers

\[Tutorial\] Setting up a dock-door or portal scenario with GPI-triggered reads.

11.1 Hardware Setup (GPI wiring, antenna placement)

11.2 Configure Portal Mode with Start/Stop Triggers

11.3 Configure GPO Actions on Tag Events

11.4 Test and Validate the Portal Workflow

### 12\. Tutorial: Writing Tags

\[Tutorial\] Writing data to tag memory banks using the Access API.

12.1 Understanding Tag Memory Banks for Writes

12.2 Configure Custom Mode with Write Access Commands

12.3 Execute the Write Operation

12.4 Verify the Written Data

### 13\. Tutorial: Building a Data Analytics (DA) App

\[Tutorial\] Developing and deploying an edge-computing application on the reader.

13.1 DA App Architecture and Lifecycle Overview

13.2 Python DA App: Setting Up the pyziotc Module

13.3 Implementing the Message Callback (filter, analyze, act)

13.4 Controlling GPO and LED from a DA App

13.5 Pass-Through Messaging for DA App Configuration

13.6 Sending Asynchronous Management Events

13.7 Packaging, Installing, and Managing the DA App via REST

13.8 Node.js DA App Development

### 14\. Tutorial: Streaming Tag Data to AWS / Azure

\[Tutorial\] Configuring the reader to publish tag events to cloud IoT services.

14.1 AWS IoT Core Endpoint Configuration

14.2 Azure IoT Hub Endpoint Configuration

14.3 Certificate Setup for Cloud Authentication

14.4 Verify Cloud Data Delivery

## PART IV - API Reference

_Exhaustive, specification-grade reference for every endpoint and command supported by the IoT Connector. Organized by functional resource group. Each endpoint follows the standardized reference template._

**Reference Page Template (applied to every endpoint)**

Endpoint Header (method + path + summary) → Description → Authentication requirement → Request Parameters → Request Body (JSON schema with field descriptions) → Response Body (JSON schema) → Status Codes & Error Responses → cURL Example → MQTT Equivalent Command

### 15\. REST API Reference ★

\[Reference\] Complete REST endpoint documentation.

**15.1 Authentication**

GET /cloud/localRestLogin

**15.2 Control** (RFID operation lifecycle)

PUT /cloud/start

PUT /cloud/stop

GET /cloud/mode

PUT /cloud/mode

GET /cloud/preSelection

PUT /cloud/preSelection

**15.3 System** (reader status, configuration, capabilities)

GET /cloud/version | GET /cloud/status | GET /cloud/config | PUT /cloud/config

GET /cloud/readerCapabilities | PUT /cloud/pass-through | PUT /cloud/cloudConfig

GET|PUT /cloud/cableLossCompensation | PUT /cloud/reboot | PUT /cloud/updatePassword

**15.4 GPIO & LED**

GET|PUT /cloud/gpo | GET /cloud/gpi | GET|PUT /cloud/app-led

**15.5 Region & Regulatory**

GET|PUT /cloud/region | GET /cloud/supportedRegionList | GET /cloud/supportedStandardList

**15.6 Network & Connectivity**

GET|PUT /cloud/network | GET /cloud/wifiNetworks | GET /cloud/networkInterfaces

GET /cloud/readPoints | GET /cloud/readerLocation | GET|PUT /cloud/eSimConfig

**15.7 Date, Time & NTP**

GET|PUT /cloud/timeZone | GET|PUT /cloud/ntpServer

**15.8 Certificates**

GET|PUT /cloud/certificates | PUT|DELETE /cloud/certificates/&lt;certname&gt; | PUT /cloud/certificates/client

**15.9 Logs**

GET|PUT /cloud/logs | GET|DELETE /cloud/logs/syslog | GET /cloud/logs/RcLog

GET /cloud/logs/RgWarningLog | GET /cloud/logs/RgErrorLog | GET|DELETE /cloud/logs/radioPacketLog

**15.10 Firmware**

PUT /cloud/os | PUT /cloud/revertbackOS

**15.11 User Applications (DA Apps)**

PUT /cloud/apps/install | PUT /cloud/apps/{appname}/start | PUT /cloud/apps/{appname}/stop

PUT /cloud/apps/{appname}/autostart | GET /cloud/apps | PUT /cloud/apps/{appname}/uninstall

PUT /cloud/apps/{appname}/pass-through | PUT /cloud/setdataToRG | PUT /cloud/setdataToUserapp

### 16\. MQTT API Reference

\[Reference\] MQTT command format, topic structure, and every supported command mapped from the REST API with MQTT-specific payload examples.

16.1 MQTT Command Format (command, command_id, payload)

16.2 Topic Configuration (command, response, tag data, management events)

16.3 Complete Command Map (REST-to-MQTT equivalents)

16.4 QoS Configuration Per Topic

### 17\. Data Schemas & Event Payloads ★

\[Reference\] JSON schema documentation for all request/response objects and event payloads.

17.1 Operating Mode Schemas (operatingModes, InventorySettings, PortalSettings, etc.)

17.2 Tag Data Event Schema (idHex, antenna, RSSI, timestamp, GPS enrichment)

17.3 Management Event Schema (heartbeat, GPI events, status changes)

17.4 Configuration Schemas (ReaderConfiguration, NetworkConfig, RegionConfig)

17.5 GPIO/LED Configuration Schema

17.6 Error Response Schema

### 18\. Error Reference

\[Reference\] Comprehensive error code listing with causes, diagnostics, and resolution steps.

18.1 HTTP Status Code Usage (400, 401, 403, 404, 409, 500 pattern)

18.2 IoT Connector Error Codes (categorized by subsystem)

18.3 MQTT Error Responses

18.4 Common Error Scenarios and Diagnostic Steps

## PART V - Advanced Topics

_Deep-dive content for experienced developers and complex deployment scenarios._

### 19\. Advanced RFID Configuration

\[Guide\] Fine-tuning RFID operations beyond the standard operating modes.

19.1 Pre-Selection (Cellular Band Filter / rxSawFilter)

19.2 Advanced Select and Query Parameter Tuning

19.3 Cable Loss Compensation Configuration

19.4 Tag Metadata Configuration (READERLOCATION, RSSI, antenna ID)

19.5 Directionality Settings

19.6 Tag ID Filtering and Report Filtering

### 20\. GPIO, LED, and Event-Driven Automation

\[Guide\] Configuring rule-based GPIO/LED behavior and event-driven actions.

20.1 GPI/GPO Pin Overview (GPI 1-4, GPO ports)

20.2 Rule-Based GPO Configuration (conditions and actions)

20.3 Application LED Control (LED 3)

20.4 Blink Configuration

20.5 GPI as Radio Start/Stop Trigger (GPI 1-4 support on FXR90)

### 21\. Deployment Best Practices

\[Guide\] Operational assessment framework and deployment guidance.

21.1 Pre-Deployment Assessment Checklist (tag population, arrival rate, payload sizing)

21.2 Bandwidth and Capacity Planning

21.3 Batching and Retention Tuning

21.4 Multi-Reader Dense Deployments (environment configuration)

21.5 Firewall and Port Configuration

21.6 Cloud Cost Optimization (message volume, connection management)

### 22\. Logging, Monitoring, and Diagnostics

\[Guide\] Instrumenting the reader for observability and troubleshooting.

22.1 Log Types and Levels (syslog, RcLog, RgWarningLog, RgErrorLog, radioPacketLog)

22.2 Configuring Log Levels via REST

22.3 Management Event Monitoring (heartbeat, status changes)

22.4 Reader Status and Health (CPU, memory, temperature, uptime)

## PART VI - Migration & Appendices

_Reference material for migration and supplementary information._

### 23\. Migration Guide: FX9600 to FXR90 ★

\[Guide\] Complete migration reference for developers transitioning from the FX9600 platform.

23.1 Key Architectural Differences (ZIOTC always running, no RM calls, no enrollment)

23.2 API Compatibility Matrix (supported, removed, changed, new commands)

23.3 Response Payload Differences (get_version, get_status, heartbeat changes)

23.4 New Capabilities (set_region, eSIM, GPS, WiFi, Bluetooth, GPI 3 & 4)

23.5 Endpoint Configuration Changes (set_importCloudConfig replaces RM commands)

23.6 Migration Checklist and Validation Steps

### 24\. Troubleshooting

\[Reference\] Symptom-based troubleshooting organized by problem category.

24.1 Connectivity Issues (Ethernet, WiFi, Cellular, MQTT broker)

24.2 RFID Read Issues (no tags, intermittent reads, low range)

24.3 API Errors (authentication failures, invalid payloads)

24.4 DA App Issues (installation failures, callback errors)

24.5 Firmware Update Issues

### 25\. Glossary

\[Reference\] Alphabetical listing of all technical terms used in the documentation, including RFID-specific terminology, IoT Connector terminology, and protocol terminology.

### 26\. Changelog

\[Reference\] Version history for both the documentation and the IoT Connector firmware, organized chronologically with clear categorization of additions, changes, deprecations, and fixes.

### Appendices

A. OpenAPI Specification File (YAML download link)

B. Complete MQTT Topic Reference Table

C. Reader Hardware Specifications Quick Reference

D. Regulatory Region Codes and Frequency Tables

E. Tag Metadata Field Reference

# 5\. Information Design Principles

The following principles govern the visual, structural, and navigational design of the FXR90 Developer Manual. These are prescriptive guidelines for all content authors.

## 5.1 Modularity

Every page is self-contained and independently addressable. A developer who lands on any page from a search engine must be able to understand the page's scope, determine if it answers their question, and navigate to related content without reading preceding pages.

| **Principle**          | **Implementation**                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Self-contained pages   | Each page states its purpose, prerequisites, and scope in the first two paragraphs. No page requires reading a previous page to be useful.                    |
| Reusable fragments     | Common patterns (authentication flow, error schema, MQTT command format) are documented once in dedicated sections and linked from every page that uses them. |
| No content duplication | If the same information appears in two places, one of them becomes the canonical source and the other becomes a cross-reference link.                         |
| Versioned independence | Each page carries its own 'last updated' date. Content can be updated per-page without requiring a full documentation release.                                |

## 5.2 Progressive Disclosure

Content is layered from simple to complex. Developers are never confronted with advanced detail before they have the foundational context to understand it.

Layer 1 - Orientation: Title, one-sentence description, and visual summary (diagram or table). Answers: "Is this the right page?" in under 5 seconds.

Layer 2 - Essential Detail: Core parameters, required fields, primary use case. Answers: "How do I use this for the common case?"

Layer 3 - Advanced Detail: Optional parameters, edge cases, performance tuning, environment-specific configuration. Accessed via expandable sections, "Advanced" toggles, or linked sub-pages.

**Implementation Pattern: Expandable Detail Blocks**

Advanced parameters, optional configuration, and edge-case documentation should be placed in collapsible/expandable sections (e.g., HTML &lt;details&gt; elements or equivalent in the publishing platform). This keeps the primary content scannable while making advanced detail one click away.

## 5.3 Visual Hierarchy & Scannability

Developers scan before they read. The visual design must support rapid scanning and information extraction.

| **Element**      | **Guideline**                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headings         | Maximum three levels (H1, H2, H3). H1 is the page title. H2 marks major sections. H3 marks sub-sections. No H4 or deeper.                                                                      |
| Endpoint headers | Display HTTP method + path + summary in a visually distinct code block at the top of every reference page. Method badges should be color-coded (GET=green, PUT=blue, POST=yellow, DELETE=red). |
| Parameter tables | Every parameter documented in a structured table with columns: Name, Type, Required, Description, Default, Example. Never in prose paragraphs.                                                 |
| Code examples    | Appear in syntax-highlighted monospace blocks. Every example is complete and runnable. cURL is the baseline format; Python and Node.js are provided where the DA App SDK is involved.          |
| Callout boxes    | Four types: Note (informational), Tip (practical advice), Warning (common pitfalls), Important (critical requirements). Visually distinct with color coding and icons.                         |
| Diagrams         | System architecture, data flow, and protocol decision flowcharts use consistent visual language. Diagrams carry captions and alt text.                                                         |

## 5.4 Task Orientation

Wherever possible, documentation is organized around what the developer is trying to accomplish, not around the internal structure of the API.

Section titles use verb phrases for tutorials: "Reading Tags via REST API" not "REST API Usage."

Reference pages include a "Common use cases" link at the top, pointing to relevant tutorials.

The Operating Modes section includes a decision matrix that maps deployment scenarios to recommended mode configurations.

The Protocol Selection section includes a decision flowchart, not just a comparison table.

## 5.5 Consistency & Convention

Rigorous consistency reduces cognitive load and builds developer trust.

| **Convention**     | **Standard**                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Terminology        | One term per concept (e.g., always "operating mode" not sometimes "run mode" or "read mode"). Controlled vocabulary maintained in the Glossary. |
| Endpoint naming    | Always shown as METHOD /path (e.g., GET /cloud/status). Never paraphrased as "the status endpoint" without the formal notation nearby.          |
| JSON examples      | All JSON examples are valid, parseable JSON. Field order matches the schema documentation. Optional fields are clearly marked.                  |
| MQTT examples      | Every REST endpoint also shows its MQTT equivalent command format in a paired code block.                                                       |
| Code language      | cURL for all REST examples. Python for DA App examples. Node.js for Node DA App examples. No mixing of languages within a single tutorial.      |
| Version references | All content references the IoT Connector version (e.g., 3.0.0). Version-specific behavior is flagged with "Since version X.Y" badges.           |

# 6\. Navigation Model & Cross-Reference Strategy

The documentation employs five complementary navigation mechanisms to support different access patterns.

| **Mechanism**         | **Purpose**                                                                                                | **Implementation**                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Sidebar navigation    | Primary hierarchical navigation. Persistent across all pages. Shows the full TOC with expandable sections. | Three-level tree. Part > Chapter > Sub-section. Current page highlighted. Expand/collapse state preserved. |
| Breadcrumbs           | Show the developer's current position in the hierarchy.                                                    | Always visible below the header. Format: Home > Part > Chapter > Section.                                  |
| In-page anchor links  | Jump to sections within long pages (especially reference pages).                                           | Auto-generated from H2/H3 headings. Sticky "On This Page" sidebar on reference pages.                      |
| Cross-reference links | Connect related content across content types (e.g., reference page links to relevant tutorial).            | Standardized link blocks: "Related Tutorials," "See Also," "Next Steps."                                   |
| Search                | Full-text search with faceted results.                                                                     | Search results grouped by content type (Tutorials, Reference, Guides). Code snippets searchable.           |

## 6.1 Cross-Reference Patterns

The following cross-reference patterns are mandated for every applicable page:

| **From (Content Type)** | **To (Content Type)** | **Link Label Pattern**                                                  |
| ----------------------- | --------------------- | ----------------------------------------------------------------------- |
| Reference page          | Tutorial              | "Tutorial: \[Task Name\] →" at the top of the reference page            |
| Tutorial step           | Reference page        | "API Reference: METHOD /path →" inline where the endpoint is first used |
| Guide section           | Reference pages       | "Related Endpoints" block at the end of each guide section              |
| Conceptual page         | Tutorial              | "Get Started" call-to-action at the bottom of every conceptual page     |
| Error reference         | Troubleshooting       | Each error code links to its corresponding troubleshooting entry        |
| Migration guide         | Reference pages       | Each changed/new command links to its full reference page               |

## 6.2 Content Dependency Map

The following diagram specification defines the reading-order dependencies between major sections. Arrows indicate "should be read before" relationships. This map informs the "Prerequisites" and "Next Steps" links on each page.

**Introduction → RFID Fundamentals → System Architecture Overview → Quick Start Guide**

**Quick Start Guide → \[Authentication | Operating Modes | Communication Protocols\]**

**Authentication + Operating Modes → All Tutorials**

**All Tutorials ↔ REST API Reference ↔ MQTT API Reference (bidirectional lookup)**

**Operating Modes + Communication Protocols → Advanced RFID Configuration + Deployment Best Practices**

# 7\. Format Specifications & Conventions

## 7.1 Reference Page Template

Every REST endpoint reference page follows this exact structure:

Endpoint Header: HTTP method badge + path + one-line summary

Description: 2-3 sentence explanation of what the endpoint does and when to use it

Authentication: Required auth method (Basic Auth or Bearer Token)

Path Parameters: Table (if applicable)

Query Parameters: Table (if applicable)

Request Body: JSON schema with field-level descriptions, types, required flags, defaults, and constraints

Response Body: JSON schema for success responses

Status Codes: Table of all possible HTTP status codes with descriptions

Error Responses: Error payload examples for common failure modes

Examples: Complete, runnable cURL example + MQTT equivalent

Related: Links to relevant tutorials, guides, and related endpoints

## 7.2 Tutorial Template

Every tutorial follows this structure:

Title: Verb phrase describing the task ("Reading Tags via REST API")

Goal Statement: One sentence describing what the developer will have accomplished by the end

Prerequisites: Explicit list of required setup, knowledge, and access

Time Estimate: Expected duration ("~15 minutes")

Numbered Steps: Each step has a heading, instruction, code block, and expected result

Verification: How to confirm the task succeeded

Next Steps: Links to related tutorials and deeper reference material

## 7.3 Code Example Standards

| **Standard**       | **Requirement**                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Completeness       | Every code example must be copy-pasteable and runnable with only credential substitution required. |
| Baseline language  | cURL for all REST API examples. No proprietary SDK dependencies for core examples.                 |
| DA App examples    | Python (pyziotc module) as primary. Node.js (ziotc.node module) as secondary.                      |
| Placeholder syntax | {curly_braces} for values the developer must replace. Clearly labeled.                             |
| Error handling     | All examples beyond Quick Start include basic error handling.                                      |
| Dual format        | Every REST example is paired with its MQTT command equivalent in an adjacent code block.           |

# 8\. Implementation Priorities

Given resource constraints, the documentation should be developed in phases aligned with developer impact.

## 8.1 Phase 1: Minimum Viable Documentation (MVD)

Sections marked with ★ in the TOC. Enables a developer to go from unboxing to a working REST-based tag-reading integration.

Introduction + RFID Fundamentals + System Architecture Overview

Quick Start Guide

Authentication & Security (core flow only)

Operating Modes (Simple + Inventory modes)

Communication Protocols (REST focus)

Tutorial: Reading Tags via REST API

REST API Reference (Control + System groups)

Data Schemas & Event Payloads (tag data events)

Migration Guide: FX9600 to FXR90

## 8.2 Phase 2: Full Coverage

Completes all tutorials, all endpoint reference pages, MQTT API reference, and the DA App development guide.

## 8.3 Phase 3: Advanced & Polish

Advanced configuration topics, deployment best practices, complete troubleshooting guide, and full cross-reference link network.

# 9\. Quality Evaluation Framework

The final documentation will be evaluated against six quality attributes, derived from established API documentation best practices.

| **Quality Attribute** | **Definition**                                                                                                                     | **Measurement Method**                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Accuracy              | Every code example runs. Every parameter description matches the actual API behavior. Every schema matches the actual payload.     | Automated testing: cURL examples executed against a live reader. Schema validation against OpenAPI spec.                |
| Completeness          | Every endpoint documented. Every field described. Every error code listed. No undocumented behavior.                               | Audit against OpenAPI spec (openAPISpec.yaml). Gap analysis between spec and documentation.                             |
| Clarity               | A developer with general programming experience but no RFID knowledge can follow any tutorial to completion without external help. | Usability testing: New developer completes Quick Start + Tutorial 9 unassisted. Time-to-first-successful-call measured. |
| Findability           | Any piece of information can be located within three clicks or one search query.                                                   | Navigation testing: Developers given 10 lookup tasks. Success rate and time measured.                                   |
| Currency              | Documentation matches the latest firmware version. No stale references.                                                            | Release process: Documentation update is a required step in the firmware release checklist.                             |
| Consistency           | Terminology, formatting, and structure are uniform across every page.                                                              | Style guide compliance audit. Automated linting for terminology and formatting violations.                              |

**END OF BLUEPRINT**

_This document defines the structural plan only. Content production should follow the templates, conventions, and priorities specified herein._