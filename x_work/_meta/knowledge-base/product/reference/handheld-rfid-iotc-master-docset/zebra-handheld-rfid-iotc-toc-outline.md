# Zebra Handheld RFID IoT Connector Documentation Architecture

# Unit 1 Foundations

## Purpose

Build foundational mental models and conceptual understanding

## Explanation

### 1 Introduction to Zebra Handheld RFID IoT Connector

1.1 What the connector is

1.2 The problem space it solves

1.3 Why handheld RFID requires a different architecture

1.4 System goals and constraints

1.5 Reader host broker and application roles

### 2 Core System Architecture

2.1 Physical topology

2.2 Logical topology

2.3 Reader Host Broker Application flow

2.4 Control plane versus observation plane

2.5 Data flow lifecycle

2.6 Command lifecycle

2.7 Event lifecycle

### 3 Mental Models for Distributed RFID Systems

3.1 Fixed reader versus handheld reader thinking

3.2 MQTT thinking versus REST thinking

3.3 Distributed system thinking versus peripheral device thinking

3.4 Common incorrect mental models

3.5 Correct operational mental models

### 4 Domain Language and System Boundaries

4.1 Canonical terminology

4.2 Bounded contexts

4.3 TRANSPORT context

4.4 RFID context

4.5 CONFIGURATION context

4.6 DEVICE and FLEET contexts

4.7 Semantic consistency rules

# Unit 2 Getting Started

## Purpose

Enable fast onboarding and early success

## Tutorials

### 5 First Time Setup

5.1 Prerequisites

5.2 Minimal hardware setup

5.3 Required software components

5.4 Establishing the first connection

5.5 Verifying successful setup

### 6 First Tag Read

6.1 Connecting the reader

6.2 Configuring MQTT

6.3 Starting a read operation

6.4 Receiving tag data

6.5 Validating end to end operation

### 7 First Secure Deployment

7.1 Configuring authentication

7.2 Applying TLS certificates

7.3 Validating secure communication

7.4 Testing reconnection behavior

## How To Guides

### 8 Common Startup Tasks

8.1 How to connect a reader

8.2 How to verify MQTT connectivity

8.3 How to validate endpoint configuration

8.4 How to confirm data flow

8.5 How to recover from initial setup failures

# Unit 3 Connectivity and Infrastructure

## Purpose

Understand and operate the transport and integration infrastructure

## Explanation

### 9 MQTT as a Distributed Control Plane

9.1 Publish subscribe semantics

9.2 Topic hierarchy

9.3 QoS behavior

9.4 Session persistence

9.5 Reconnect semantics

9.6 Delivery guarantees and limitations

### 10 Endpoint Architecture

10.1 Endpoint taxonomy

10.2 Control endpoints

10.3 Data endpoints

10.4 Event endpoints

10.5 Endpoint dependency rules

10.6 Topic routing semantics

## How To Guides

### 11 Connectivity Configuration

11.1 How to configure MQTT brokers

11.2 How to configure endpoint mappings

11.3 How to configure reconnection policies

11.4 How to validate topic routing

### 12 Cloud and Enterprise Integration

12.1 How to integrate with cloud systems

12.2 How to implement high availability

12.3 How to support multi broker architectures

12.4 How to build event pipelines

# Unit 4 RFID Operations

## Purpose

Operate and optimize RFID reading workflows

## Explanation

### 13 RFID Operational Concepts

13.1 Operating modes

13.2 Profiles and sessions

13.3 Trigger based operation

13.4 Read rate versus battery tradeoffs

13.5 Handheld operational constraints

### 14 Tag Data and Filtering

14.1 Tag observation lifecycle

14.2 Metadata enrichment

14.3 Air protocol filtering

14.4 Post read filtering

14.5 Reliable stream design

## How To Guides

### 15 Reader Operation Tasks

15.1 How to start and stop read sessions

15.2 How to optimize read performance

15.3 How to tune filtering behavior

15.4 How to minimize battery impact

15.5 How to select the correct operating mode

# Unit 5 Events State and Observability

## Purpose

Understand runtime behavior lifecycle transitions and operational visibility

## Explanation

### 16 Event Driven System Behavior

16.1 Event taxonomy

16.2 Management events

16.3 Data events

16.4 Heartbeats and alerts

16.5 Event reliability considerations

### 17 State Machines and Lifecycle Models

17.1 Reader lifecycle

17.2 MQTT connection lifecycle

17.3 RFID operation lifecycle

17.4 Configuration lifecycle

17.5 Firmware lifecycle

17.6 State drift and reconciliation

## How To Guides

### 18 Observability Tasks

18.1 How to monitor reader health

18.2 How to observe operational state

18.3 How to trace event flows

18.4 How to detect drift conditions

# Unit 6 Security and Configuration

## Purpose

Manage trust identity persistence and operational consistency

## Explanation

### 19 Security Architecture

19.1 Authentication models

19.2 TLS trust architecture

19.3 Credential lifecycle

19.4 Tenant isolation

19.5 Security failure modes

### 20 Configuration Architecture

20.1 Persistent versus runtime configuration

20.2 Configuration drift

20.3 Reconciliation strategies

20.4 Bootstrap constraints

20.5 Region configuration semantics

## How To Guides

### 21 Security and Configuration Tasks

21.1 How to configure TLS

21.2 How to rotate certificates

21.3 How to manage persistent configuration

21.4 How to recover from configuration drift

# Unit 7 Fleet and Enterprise Operations

## Purpose

Scale the system safely across enterprise environments

## Explanation

### 22 Fleet Architecture

22.1 Fleet provisioning models

22.2 MDM and SOTI integration

22.3 Multi tenant operation

22.4 Fleet health management

22.5 Bulk configuration semantics

22.6 Firmware rollout strategies

### 23 Enterprise Scaling Patterns

23.1 High availability architectures

23.2 Failure blast radius management

23.3 Retry and backoff strategies

23.4 Data retention patterns

23.5 AI and RAG consumption considerations

## How To Guides

### 24 Fleet Operations Tasks

24.1 How to provision fleets

24.2 How to deploy firmware updates

24.3 How to perform bulk configuration

24.4 How to monitor fleet health

# Unit 8 Troubleshooting and Recovery

## Purpose

Support diagnosis isolation recovery and operational resilience

## Explanation

### 25 Failure Mode Architecture

25.1 Reader Host failures

25.2 Host Broker failures

25.3 Connection failures

25.4 Event loss patterns

25.5 Firmware failures

25.6 Configuration failures

## How To Guides

### 26 Recovery Procedures

26.1 How to recover connectivity

26.2 How to recover from state drift

26.3 How to recover endpoint configuration

26.4 How to restore failed firmware updates

26.5 How to implement graceful degradation

# Unit 9 Reference

## Purpose

Provide atomic lookup and machine consumable technical details

## Reference

### 27 MQTT Topic Reference

27.1 Topic hierarchy

27.2 Topic naming conventions

27.3 QoS mappings

### 28 Endpoint Reference

28.1 Endpoint catalog

28.2 Capability matrix

28.3 Dependency matrix

### 29 Event Reference

29.1 Event catalog

29.2 Event schemas

29.3 Ordering semantics

### 30 Payload and Schema Reference

30.1 Request schemas

30.2 Response schemas

30.3 Configuration schemas

30.4 Tag data schemas

### 31 Error and Status Reference

31.1 Error codes

31.2 Status codes

31.3 Failure classifications

31.4 Recovery mappings

### 32 Configuration Parameter Reference

32.1 RFID settings

32.2 Security settings

32.3 Wi Fi settings

32.4 Fleet settings
