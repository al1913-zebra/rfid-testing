# Final Table of Contents

## Zebra Handheld RFID IoT Connector Documentation

This ToC is organized as a cognitive architecture rather than a simple topic list. It uses Diátaxis as the primary content logic, then layers in first-principles sequencing, JTBD navigation, DDD terminology control, progressive disclosure, systems thinking, and failure-first recovery. The structure reflects the v1.2 dependency-chain discipline and the v2.0 multi-surface model.  

---

## Surface A — Learn the System

**Purpose:** explanation, orientation, conceptual grounding
**Pedagogical mode:** understand → analyze → internalize

### Part I — Foundational Mental Models

#### Chapter 1. What IOTC Fundamentally Is

1.1 What the Zebra Handheld RFID IoT Connector actually is
1.2 The problem space IOTC solves
1.3 Why handheld RFID requires a different architecture
1.4 The reader as the authoritative system state
1.5 Why MQTT is the only transport
1.6 Control plane vs observation plane
1.7 The host device as a mandatory bridge
1.8 System invariants
1.9 Hard constraints of the platform

#### Chapter 2. The End-to-End System Topology

2.1 The physical architecture of the system
2.2 Logical vs physical topology
2.3 Reader ↔ Host ↔ Broker ↔ Application flow
2.4 Bluetooth/USB edge vs MQTT edge
2.5 How data flows through the system
2.6 Command/response lifecycle
2.7 Event lifecycle
2.8 Tag data lifecycle
2.9 Failure propagation across the system

#### Chapter 3. Mental Models and Conceptual Bridges

3.1 Common incorrect mental models
3.2 Fixed-reader thinking vs handheld thinking
3.3 REST thinking vs MQTT thinking
3.4 Peripheral SDK thinking vs distributed-system thinking
3.5 The correct mental model for IOTC
3.6 Mental-model transition maps
3.7 Misconception inventory

### Part II — Domain Language and Semantic Architecture

#### Chapter 4. Ubiquitous Language

4.1 Why terminology discipline matters
4.2 Bounded contexts in IOTC
4.3 TRANSPORT context
4.4 CONFIGURATION context
4.5 RFID context
4.6 DEVICE context
4.7 FLEET context
4.8 Canonical terminology reference
4.9 Endpoint vs operation disambiguation
4.10 Schema sacredness rules
4.11 Term lifecycle rules

### Part III — MQTT and Distributed-System Foundations

#### Chapter 5. MQTT as a Distributed Control Plane

5.1 MQTT as a control plane
5.2 Publish/subscribe semantics
5.3 Topic hierarchy
5.4 Subscription ordering
5.5 Asynchronous command semantics
5.6 `requestId` correlation
5.7 Long-lived sessions
5.8 Retained messages and persistence
5.9 QoS semantics
5.10 Delivery guarantees vs system guarantees
5.11 Reconnect semantics
5.12 Event reliability limitations

#### Chapter 6. Endpoint and Interface Architecture

6.1 The seven endpoint types
6.2 Why control and data are separated
6.3 MGMT vs MGMT_EVT
6.4 CTRL vs DATA
6.5 DATA1 vs DATA2
6.6 MDM and SOTI roles
6.7 Endpoint dependency rules
6.8 Endpoint capability matrix
6.9 Topic taxonomy reference

### Part IV — RFID System Thinking

#### Chapter 7. RFID Operational Concepts

7.1 RFID as a stateful operational system
7.2 What an operating mode represents
7.3 Profiles vs modes
7.4 EPC Gen2 sessions
7.5 Trigger-driven operation
7.6 Start/stop conditions
7.7 Battery-aware operation
7.8 Read rate vs battery tradeoffs
7.9 Handheld constraints
7.10 Operating-mode decision matrix

#### Chapter 8. Tag Data and Filtering Concepts

8.1 What tag data represents
8.2 Lifecycle of a tag observation
8.3 Metadata enrichment concepts
8.4 What filters actually do
8.5 Air-protocol vs post-read filtering
8.6 Data-stream selectivity
8.7 Filtering tradeoffs
8.8 Designing reliable data streams

### Part V — Events, Observability, and System State

#### Chapter 9. Event-Driven System Behavior

9.1 Events as system observability
9.2 Management vs data events
9.3 Heartbeat semantics
9.4 Alert semantics
9.5 Exception events
9.6 MQTT connection events
9.7 Event ordering limitations
9.8 Event reliability model
9.9 Observability coverage matrix

#### Chapter 10. State Machines and Lifecycle Models

10.1 Reader lifecycle state machine
10.2 MQTT connection state machine
10.3 RFID operation lifecycle
10.4 Endpoint configuration lifecycle
10.5 Firmware update lifecycle
10.6 Fleet provisioning lifecycle
10.7 State drift and reconciliation
10.8 Idempotency and retry semantics
10.9 Causal flow maps

### Part VI — Security and Configuration Thinking

#### Chapter 11. Security and Trust Architecture

11.1 Authentication models
11.2 TLS client certificates
11.3 Trust boundaries
11.4 Tenant isolation
11.5 Credential lifecycle
11.6 Security failure modes
11.7 MQTT security tradeoffs

#### Chapter 12. Configuration as System State

12.1 Configuration as persistent state
12.2 Runtime vs persistent configuration
12.3 Endpoint configuration concepts
12.4 Wi-Fi profile concepts
12.5 Configuration drift
12.6 Reconciliation strategies
12.7 Configuration idempotency
12.8 Bootstrap constraints
12.9 Region-configuration constraints

### Part VII — Fleet and Enterprise Architecture

#### Chapter 13. Fleet Architecture

13.1 Single-reader vs fleet thinking
13.2 Fleet provisioning models
13.3 MDM and SOTI architecture
13.4 Multi-tenant architecture
13.5 Fleet health monitoring
13.6 Firmware rollout strategies
13.7 Bulk configuration semantics
13.8 Failure blast radius thinking
13.9 Operational governance models

#### Chapter 14. Scaling and Enterprise Integration

14.1 Multi-broker architectures
14.2 Cloud integration patterns
14.3 Event pipeline architectures
14.4 High-availability design
14.5 Retry and backoff strategies
14.6 Data retention strategies
14.7 AI/RAG consumption patterns
14.8 Retrieval-oriented documentation concepts
14.9 Semantic chunking and atomicity

---

## Surface B — Do and Verify

**Purpose:** task execution and lookup-oriented verification
**Pedagogical mode:** apply → execute → confirm

### Part VIII — Task-Oriented Learning Paths

8.1 Get online: first connection and first read
8.2 Configure endpoints and connectivity
8.3 Read tags and tune operating behavior
8.4 Operate a fleet
8.5 Diagnose and recover
8.6 Integrate at scale

### Part IX — Decision Support

9.1 Which operating mode should I use?
9.2 Which endpoint types do I need?
9.3 Which TLS approach should I use?
9.4 Which event channels should I enable?
9.5 Which data-filter strategy fits my deployment?
9.6 Which fleet pattern fits my operating model?

---

## Surface C — Recover

**Purpose:** symptom-first troubleshooting and resilience
**Pedagogical mode:** diagnose → isolate → restore

### Part X — Failure-Mode and Recovery Architecture

#### Chapter 15. Failure-Mode Thinking

15.1 Why distributed systems fail differently
15.2 Symptom-oriented diagnosis
15.3 Reader ↔ Host failures
15.4 Host ↔ Broker failures
15.5 Connection failure patterns
15.6 Event-loss patterns
15.7 RFID operational failures
15.8 Configuration failures
15.9 Firmware failures
15.10 Failure taxonomy reference

#### Chapter 16. Recovery and Operational Resilience

16.1 State recovery concepts
16.2 Reconnect and resubscribe strategy
16.3 Reader reconciliation strategy
16.4 Recovering from state drift
16.5 Recovering from endpoint misconfiguration
16.6 Firmware recovery
16.7 Graceful degradation patterns
16.8 Operational resilience patterns

---

## Surface D — Reference

**Purpose:** atomic lookup and retrieval
**Pedagogical mode:** remember → verify → reuse

### Part XI — Reference System Architecture

11.1 Endpoint reference model
11.2 Event reference model
11.3 Payload model reference
11.4 Field index
11.5 Enum index
11.6 Error-code index
11.7 Topic index

---

## Surface E — Meta-Architecture

**Purpose:** explain the documentation system itself
**Pedagogical mode:** reflect → evaluate → navigate

### Part XII — Documentation as Cognitive Architecture

12.1 Why this documentation uses multiple surfaces
12.2 Diátaxis in this documentation system
12.3 Cognitive load management strategy
12.4 Progressive disclosure model
12.5 Navigation and information-scent design
12.6 Retrieval-oriented documentation design
12.7 AI-agent consumption considerations
12.8 Documentation governance
12.9 Cross-surface linking strategy

---

## Structural Notes

This ToC intentionally preserves the v1.2 strengths of dependency ordering, schema fidelity, and progressive complexity, while adopting v2.0’s cognitive architecture, bounded contexts, and multi-surface navigation model.  

The result is a documentation system that supports:

* learning,
* doing,
* verifying,
* recovering,
* and architecting,

without collapsing these distinct user needs into a single undifferentiated hierarchy.
