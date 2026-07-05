# ⚠️ Deprecated draft — superseded by [OPTIMIZED_PROMPT.md](OPTIMIZED_PROMPT.md)

> **The canonical prompt is [OPTIMIZED_PROMPT.md](OPTIMIZED_PROMPT.md).** Paste that file's
> contents into Claude Code to run the workflow. It corrects this draft's factual errors
> (`openapi.json`/`index.html` are generated artifacts — edit the source files and regenerate;
> the error-code set is fixed at 0–30 in `refrence/response/response.yaml`; the real message
> envelope is `command`/`requestId`/`<payloadKey>` + `response{code,description}` with no
> per-message `auth` block; `_meta/` is a non-shipping knowledge workspace) and restructures
> the work into ordered, verifiable phases with acceptance criteria and stop-and-report
> checkpoints. Everything below is retained only as the original historical draft.

---

"# Objective
We need to validate the MQTT API schema (`openapi.json`) for Zebra's Handheld RFID Reader IoT Connector, test and validate each command using a local Mosquitto broker, identify all possible error codes, update the schema with validated payloads, and write comprehensive conceptual documentation.

# Domain Prerequisites
To successfully execute this task, you must rely on:
1. Detailed analysis of the attached `openapi.json` MQTT API schema.
2. In-depth understanding of the MQTT protocol (topics, pub/sub architecture, wildcards, QoS, and payloads).
3. The RFID reader ecosystem, focusing on the RFID IoT Connector API architecture.
4. Zebra Handheld RFID reader capabilities, constraints, and physical behavior.
5. In-depth study of the `./_meta` configuration folder content.
6. The exact relationship between 123RFID Desktop and the Mobile Device Management (MDM) endpoint, specifically why the MDM endpoint must be provisioned first before other endpoints (commands, notifications, data) can be managed.

# Sequential Execution Steps
1. **Analyze Schema & Meta:** Review `./openapi.json` and `./_meta` to map all endpoints, commands, and events to their designated publish, response, and event topics.
2. **Local Broker Setup:** Deploy a local Mosquitto broker to act as the communication hub.
3. **Command Validation & Testing:** Test every endpoint listed in the schema. Validate:
   - Request and response payloads.
   - Evoked error codes and error payload structures.
   - Strict consistency with the documented schema.
4. **Schema Update:** Update `./openapi.json` to reflect firmware-validated requests, responses, and newly discovered error payloads.
5. **Draft Reference Documentation:** Write structured, deep-dive conceptual documentation for each command and event.
6. **Gap Analysis:** Create a dedicated log detailing any missing information, engineering blockers, schema inconsistencies, or hardware-firmware inaccuracies found during testing.


### Strategy Comparison

| Optimization Dimension | Original Prompt Strategy | Optimized Claude Code Strategy | Rationale |
|---|---|---|---|
| **Actionability** | Relies on passive instructions like "thoroughly understand" or "study." | Employs execution-focused verbs such as "Parse," "Simulate," "Verify," "Draft," and "Run." | Claude Code is an execution-oriented terminal agent. It excels when given concrete programmatic actions. |
| **Contextual Grounding** | References general concepts (MQTT, RFID, Zebra) in the abstract. | Anchors operations to exact local paths (`./openapi.json`, `./_meta/`). | Explicit paths prevent LLM hallucination and force the agent to use local workspace files. |
| **Testing Realism** | Asks to "create a broker and test" without execution guidelines. | Instructs the agent to deploy a local Mosquitto docker/process and write a Python automation harness. | Guiding Claude to write an automated script ensures reproducible testing of all endpoints. |
| **Diagnostic Depth** | Missing active troubleshooting strategies. | Mandates subscribing to the multi-level wildcard (`#`) topic on connection. | Subscribing to `#` exposes undocumented/transient topics and catches hidden validation errors. |
| **Output Standard** | Vaguely requests a structured template for commands and events. | Provides pre-defined, concrete Markdown blueprints with specific keys. | Explicit templates force formatting and vocabulary consistency across all generated files. |

---

### Part 1: Properly Structured Prompt

The table below outlines the sequential execution workflow for the task, incorporating your diagnostic and domain requirements.

| Sequence | Phase | Technical Objective |
|---|---|---|
| **1** | Analyze Schema & Meta | Inspect `./openapi.json` and `./_meta/` to map endpoints, commands, and events to their designated publish, response, and alert topics. |
| **2** | Local Broker Setup | Spin up a local Mosquitto broker to serve as the integration and testing hub. |
| **3** | Wildcard Diagnostic | Subscribe to the multi-level wildcard topic (`#`) immediately to log transient messages, catch responses, and diagnose routing discrepancies. |
| **4** | Command Validation | Programmatically test every schema endpoint. Validate request payloads, response structures, and evoked error codes. |
| **5** | Schema Update | Refine `./openapi.json` to accurately reflect firmware-validated schemas and captured error payloads. |
| **6** | Reference Draft | Produce granular conceptual documentation explaining every key-value pair, authentication block, and trigger. |
| **7** | Gap Analysis | Record all missing details, engineering blockers, schema inconsistencies, and firmware anomalies. |

---

### Part 2: Fully Optimized Prompt for Claude Code

Copy and paste the template below directly into your terminal workspace with Claude Code:

```markdown
You are acting as a Lead Embedded Systems & RFID Engineer specializing in Zebra RFID IoT Connectors, MQTT architectures, and technical API documentation. 

Your objective is to validate, test, update, and fully document the MQTT API schema for Zebra's Handheld RFID Reader IoT Connector in the current workspace.

### Workspace Context & Resources
- **MQTT Schema:** `./openapi.json` (The base OpenAPI specification defining the MQTT topics and payloads).
- **Metadata Folder:** `./_meta/` (Contains underlying configuration structures and environment constraints).
- **Core Architecture Constraint:** All device operations rely on a foundational MDM (Mobile Device Management) endpoint. 123RFID Desktop must first provision this MDM endpoint. All subsequent endpoints (Data, Events, Commands) are dynamically managed, updated, added, or deleted via commands routed through this initial MDM connection.

---

### Phase 1: Environment Reconnaissance & Mapping
1. Parse `./openapi.json` and all files in `./_meta/`.
2. Generate an internal map of all commands, responses, and events. Group them clearly by:
   - Command Publish Topic
   - Command Response Topic
   - Event/Alert Notification Topic
3. Document the structural mapping internally before starting any active testing.

---

### Phase 2: Mock Testing & Error Extraction
Because physical RFID hardware may not be directly attached to this CLI environment, write an automated test harness to simulate the environment:
1. Draft a Python script (`test_mqtt_connector.py`) using `paho-mqtt` to simulate both the Zebra Handheld Reader IoT Connector and an active application.
2. **Wildcard Diagnostic Listener:** Program the test harness to subscribe to the multi-level wildcard topic (`#`) immediately upon connection. Use this global subscription to catch all outgoing responses, alerts, and heartbeats to diagnose routing issues, expose undocumented/transient topics, and log unexpected broker traffic.
3. If a local Mosquitto broker is not currently running, check for local installation or use a Docker container command (`docker run -d -p 1883:1883 eclipse-mosquitto`) to spin up a broker.
4. Run automated tests against every endpoint found in `openapi.json` to validate:
   - Authentication blocks in payloads.
   - Request payloads vs. response payloads.
   - Structural correctness and consistency with the schema.
5. Systematically trigger failures (e.g., sending invalid payloads, bad authentication, missing parameters, out-of-bounds parameters) to capture and log every possible error code and error response payload the firmware or connector evokes.

---

### Phase 3: Schema Refinement
1. Modify `./openapi.json` in-place based on the test results.
2. Ensure all requests, responses, and error payload definitions match the real-world firmware-validated structures captured in Phase 2.
3. Add any missing parameters, correct mismatched data types, and explicitly document all captured error schemas in the spec.

---

### Phase 4: Production-Grade Documentation Synthesis
Generate a comprehensive markdown document named `MQTT_API_REFERENCE.md` detailing every command and event. You must strictly follow the structured markdown layout below for each entry:

#### [Use This Template for Commands (Requests/Responses)]
# Command: [Command Name]

## 1. Intent & Objective
[Provide an exceptionally detailed explanation of what this command does, when it should be used, physical reader behaviors it triggers, and its architectural context.]

## 2. Topic Mapping
| Direction | Topic Path | QoS | Retain |
|---|---|---|---|
| Publish (Request) | `[Insert exact topic string/pattern]` | `[QoS level]` | `[True/False]` |
| Subscribe (Response) | `[Insert exact topic string/pattern]` | `[QoS level]` | `[True/False]` |

## 3. Request Payload Breakdown
[Provide a table detailing every parameter in the auth and request body]
| Field Name | Location | Type | Required/Optional | Allowed Enums / Constraints | Description & Purpose |
|---|---|---|---|---|---|
| `auth.user` | Auth | String | Required | N/A | Username for MQTT authentication. |
| `[parameter]` | Body | `[Type]` | `[Req/Opt]` | `[Enums]` | `[Description]` |

### Request Example
```json
[Insert realistic, formatted JSON payload]
```

## 4. Response Payload Breakdown
| Field Name | Location | Type | Description |
|---|---|---|---|
| `[parameter]` | Body | `[Type]` | `[Description]` |

### Response Example
```json
[Insert realistic, formatted JSON response payload]
```

## 5. Associated Error Codes
| Error Code | HTTP/MQTT Status | Error Name | Triggering Condition | Error Response Example |
|---|---|---|---|---|
| `[Code]` | `[Status]` | `[Name]` | [Explain exactly what causes the connector to evoke this code] | `[Compact JSON]` |

---

#### [Use This Template for Events & Alerts]
# Event: [Event Name]

## 1. Triggering Conditions
[Explain in extreme technical depth what causes the handheld reader or connector firmware to emit this notification or event (e.g., battery drops below threshold, tag read inventory completes, connection loss).]

## 2. Topic Mapping
| Direction | Topic Path | QoS | Retain |
|---|---|---|---|
| Publish (Event) | `[Insert exact topic string/pattern]` | `[QoS level]` | `[True/False]` |

## 3. Payload Breakdown
| Field Name | Type | Required/Optional | Allowed Enums | Description & Purpose |
|---|---|---|---|---|
| `[parameter]` | `[Type]` | `[Req/Opt]` | `[Enums]` | `[Description]` |

### Event Payload Example
```json
[Insert realistic, formatted JSON event payload]
```

---

### Phase 5: Gap & Blockers Log
At the very end of your execution, generate a gap analysis report in `BLOCKERS_AND_INCONSISTENCIES.md` containing:
- Discrepancies between the original `openapi.json` spec and the actual firmware behavior verified during testing.
- Any undocumented fields, parameters, or hidden enums discovered via the `#` wildcard subscription.
- Unknown or unexplained error codes that were evoked but lack clear logical triggers in the source code.
- Operational blockers encountered during testing (such as MDM provisioning quirks or physical connection constraints).

Let's begin. Execute Phase 1 first and share the internal map you generate before proceeding to write the Phase 2 test script."