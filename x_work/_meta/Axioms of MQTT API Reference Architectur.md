Axioms of MQTT API Reference Architecture

📌 Key Takeaway
Traditional HTTP/REST documentation frameworks fail when applied to MQTT. Because MQTT uses a bi-directional, stateful publish/subscribe model, an effective reference must be built around topic hierarchies, client roles, and asynchronous interaction patterns rather than request-response URI paths and HTTP verbs.

I. Connection & Global Configuration Axioms
Before interacting with individual channels, a client must successfully establish and maintain a connection to the broker.

1. Unified Endpoint and Broker Discovery
The Port-Protocol Bindings Rule: Explicitly publish DNS endpoints mapped to mandatory protocol-port assignments. Standardized defaults must be documented:

1883 for unencrypted TCP connection.

8883 for secure TLS/SSL encryption.

443 (or other designated port) for WebSockets over TLS (wss://).

Environment Segregation: Separate endpoints and client credential sets must be explicitly provisioned and documented for staging/sandbox and production environments.

2. Standardized Authentication Handshake
Credential Multi-tenancy: Detail the exact method of authorization. Documentation must explicitly state which of the following is utilized and how to configure them:

Basic Authentication: Username and Password credentials.

Token-based Auth: Passing a bearer or access token within the Username field or within MQTT v5.0 User Properties.

Mutual TLS (mTLS): Client certificate requirements (X.509) and CA trust chain setups.

3. Protocol Version Specification
Feature-Level Support: Explicitly state the supported protocol versions (e.g., MQTT v3.1.1 vs. MQTT v5.0).

V5.0 Feature Exploitation: If v5.0 is supported, document its specific enhancements in use, such as:

User Properties: Custom metadata key-value pairs.

Topic Aliases: Reducing payload overhead.

Payload Format Indicators: Explicitly indicating if the payload is UTF-8 text or binary data.

4. Connection State Management
Keep-Alive Intervals: Define the expected, minimum, and maximum Keep Alive timeouts (in seconds) to prevent premature connection drops.

Last Will and Testament (LWT): Document the default LWT topic and payload schema that the broker will publish automatically if the client abruptly disconnects.

QoS (Quality of Service) Boundaries: Clearly specify the supported QoS tiers (QoS 0: At most once, QoS 1: At least once, or QoS 2: Exactly once) allowed globally or per topic space.

II. Topic Architecture Overview Axioms
Developers need a macro-level understanding of the namespace semantics to avoid message storms, structural conflicts, or parsing failures.

                  [Global Prefix] / [Contextual Variables] / [Logical Action]
Example Topic:       telemetry    /  {tenant} / {device}   /     status
5. Semantic Namespace Consistency
Hierarchical Cohesion: Structure topic patterns using a predictable, slash-delimited (/) hierarchy proceeding from general context to specific action (e.g., [domain]/[identifier]/[operation]).

Naming Conventions: Document standard casing rules (typically lower-case to avoid case-sensitivity bugs) and illegal character exclusions.

6. Wildcard Subscription Constraints
Wildcard Application: Provide clear rules on how and where clients can use wildcards:

+ (Single-level): To replace a single dynamic segment (e.g., telemetry/+/status).

# (Multi-level): To match all sub-topics at the end of a path (e.g., telemetry/{tenant_id}/#).

Subscription Performance Limits: Explicitly state any limitations or broker performance penalties associated with broad wildcard subscriptions.

7. Explicit Variable Definitions
Segment Bracketing: All dynamic segments in template strings must be visually distinct using brackets (e.g., {device_id} or {tenant_id}).

Variable Extraction Rules: Detail the data types, format constraints (e.g., UUIDv4, alphanumeric), and maximum lengths of every dynamic segment.

III. Direct Topic Reference Axioms
The core of the documentation must treat each topic as a standalone API contract. Every individual topic block must possess the following five elements:

Component	Axiomatic Documentation Rule
Topic String	Use standard bracketed dynamic variables (e.g., devices/{device_id}/attributes/request) so developers can easily tokenize the string.
Role & Action	Every topic must explicitly declare the data flow: Client-to-Broker (Publish), Broker-to-Client (Subscribe), or bi-directional.
Payload Schema	Define the exact payload format (e.g., JSON Schema) outlining types, required properties, and string formatting constraints.
MQTT v5 Properties	Enumerate required metadata keys, such as Response-Topic, Correlation-Data, and specific key-value User Properties.
Code Payload Example	Provide clean, minified-ready, syntactically valid JSON/binary samples that reflect real-world runtime states.
 
IV. Asynchronous Interaction Pattern Axioms
Unlike REST, MQTT interactions do not inherently link request and response. The documentation must make these implicit, asynchronous relationships explicit.

8. Request-Response Correlation
Coupled Topic Mapping: If the API uses a request-response design, you must document the twin topics side-by-side.

Correlation Tokens: Detail how clients must pass correlation identifiers (e.g., a $request_id segment in the topic path, or the Correlation-Data property in MQTT v5.0) to trace and associate the subsequent reply.

Client                             Broker                             Server
  │                                  │                                  │
  │─── Publish Request ─────────────>│─── Forward Request ─────────────>│  [Topic: .../request/{request_id}]
  │    (with correlation token)      │                                  │
  │                                  │                                  │  [Compute Reply]
  │                                  │<── Publish Response ─────────────│  [Topic: .../response/{request_id}]
  │<── Forward Response ─────────────│                                  │
  │    (matching correlation token)  │                                  │
9. Asynchronous Error and Fault Handling
Error Routing Channels: Document how and where errors are routed when an action fails. Specify if:

Errors are published to a dedicated error topic (e.g., .../errors).

Errors are returned on the normal response topic with error payload keys (e.g., a JSON { "status": "error", "code": 400, "message": "..." }).

Error Code Dictionary: Provide an exhaustive list of error codes, physical meaning, and recommended developer remediation actions.

V. Automated Specifications & Tooling Axioms
10. Schema-as-Code (The AsyncAPI Standard)
Single Source of Truth: Do not write reference documentation entirely by hand. Use AsyncAPI specifications (the event-driven equivalent of OpenAPI/Swagger) to maintain the API lifecycle programmatically.

Interactive Generation: Utilize tools like AsyncAPI Studio to compile machine-readable YAML/JSON specs into searchable, interactive, and consistent developer portals containing auto-generated SDK code-snippets.

⚠️ Common Pitfalls to Watch Out For
Assuming REST Paradigms: Treating topic hierarchies as REST endpoints. Remember, MQTT topics are not physical endpoints but logical message buses.

Undocumented Broker-Level Disconnections: Forgetting to document the maximum size of payloads or missing rate-limit boundaries, leading to unexplained client drops at runtime.

Improper JSON/Markdown Escaping: Creating visual clutter in your schemas. Keep schemas highly legible, utilizing backslashes (\) where needed to preserve formatting in markdown tables.