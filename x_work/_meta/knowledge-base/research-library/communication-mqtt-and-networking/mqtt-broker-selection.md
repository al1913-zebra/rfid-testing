1


## **Tables of Content**

**Introduction .................................................................................................................. 1**


**Questions to Start: Identify the Requirements of Your Project.......................................... 2**


**Factors to Consider When Choosing MQTT Broker.......................................................... 4**


Security..................................................................................................................................4


Clustering and Auto-Scaling................................................................................................ 7


Data Integration and Rule Engine........................................................................................ 9


Performance........................................................................................................................11


Cloud Native........................................................................................................................12


Support Extensions.............................................................................................................13


Cost......................................................................................................................................13


Additional Considerations..................................................................................................14


**Overview of Popular Open-Source MQTT Brokers ..........................................................15**


EMQX................................................................................................................................... 15


Mosquitto............................................................................................................................ 16


NanoMQ...............................................................................................................................18


VerneMQ..............................................................................................................................19


**Side-by-Side Comparison ............................................................................................21**


Scalability, Performance, and Reliability........................................................................... 21


MQTT Protocol and Connectivity.......................................................................................22


Security, Authentication & Authorization.......................................................................... 23


Data Integrations (Out-of-the-Box)...................................................................................24


Operability, Observability, and Compatibility.................................................................... 25


**Conclusion ..................................................................................................................27**


## **Introduction**

[The MQTT Broker plays a crucial role in facilitating messaging between IoT devices,](https://www.emqx.io/)

making it a key component in IoT applications. As such, selecting the appropriate MQTT

Broker serves as the initial and most critical step in an IoT project.


This eBook offers a comprehensive guide to MQTT broker selection for IoT service

providers. We will begin by discussing important factors to consider and potential

concerns based on typical requirements and scenarios in IoT projects. Next, we will

explore popular MQTT brokers in detail, examining their advantages and disadvantages.

To assist you further, we will include a side-by-side comparison, allowing you to

determine the best-suited broker for your specific projects.


You will understand how to choose an MQTT Broker that aligns with your unique needs

and requirements through this eBook. Join us as we navigate the world of MQTT brokers

and empower you to make informed decisions.


**eBook |** A Practical Guide to MQTT Broker Selection 1


## **Questions to Start: Identify the Requirements of** **Your Project**

Before embarking on the selection process, we recommend you have the following

questions firmly answered in your mind:


- What is the expected scale of devices of your project in the long run?


- What are the necessary performance metrics? How essential are message latency and


reliability for your project?


- Where will the MQTT Broker be located? How will you leverage the data?


- Where your users and IoT devices are geographically located?


- What are the characteristics of your data? Is message size and frequency a necessary


consideration?


- How do you process IoT data in your application, including the preferred programming


language and the data storage and analysis components?


- Is there a widely used MQTT Broker in the relevant industry?


- Do you have a budget for paid services?


These questions will help you identify the features and functionalities that you need from

the MQTT Broker.


If the MQTT Broker is like a port, message delivery is only the transportation of goods. In

fact, to ensure the transportation of goods, a complete logistics system and storage

facilities are required to provide essential support. To send goods from various places to

different destinations, it is necessary to unpack and repack the goods and use different

logistics methods to deliver them. In the off-season and peak season of logistics, it is

necessary to adjust the scale of port facilities and personnel dynamically and flexibly to


**eBook |** A Practical Guide to MQTT Broker Selection 2


meet demand while maximizing efficiency.


In the context of MQTT Broker, these requirements correspond to security, fault handling,

and metrics monitoring for basic operation, data processing and integration capabilities

for MQTT messaging, and scalability for the entire service.


Next, we will discuss these features in more detail to help you choose the most suitable

MQTT Broker for your project.


We assume that you already possess a foundational understanding of MQTT brokers. If

[not, you can refer to this blog](https://www.emqx.com/en/blog/the-ultimate-guide-to-mqtt-broker-comparison) to learn more.


**eBook |** A Practical Guide to MQTT Broker Selection 3


## **Factors to Consider When Choosing MQTT Broker**

### **Security**

Security is a key factor to consider when choosing an MQTT Broker, and the following

aspects are important to keep in mind.

#### **Client Authentication**


The MQTT client authentication requires clients to provide specific credentials to confirm

their identity when connecting to the MQTT Broker. Here are the commonly used

authentication methods and their requirements for the MQTT Broker:








|Authentication Method|Description|Functional Requirement|
|---|---|---|
|Username/Password|When the client connects, it provides<br>a specific username and password.<br>After receiving it, the server will<br>verify and decide whether to allow<br>the connection.|Compatible with multiple<br>databases and existing data.<br>Support custom authentication<br>and integration with existing<br>enterprise authentication<br>services.|



**eBook |** A Practical Guide to MQTT Broker Selection 4


|JWT Authentication|The server does not store client<br>authentication or session<br>information. The client provides a<br>signed token for authentication.|Support JWKs and a complete<br>set of encryption algorithms.|
|---|---|---|
|X.509 Certificate|The client and server use the<br>TLS/SSL protocol for secure<br>communication to avoid<br>eavesdropping and data loss, while<br>using X.509 client certificates for<br>authentication.|Provide secure communication<br>with SSL/TLS protocols. Offer<br>low-cost certificate checking<br>with OCSP Stapling/CRL<br>validation.|


#### **Authorization for Publishing and Subscribing**

Authorization is the process of verifying the operational privileges of clients for a specific

topic before they can publish or subscribe. Permission lists are usually stored in

databases, either internal or external, and need to be updated in real time to reflect

business changes.


The following are some typical requirements for the authorization function:

|Functional Requirement|Description|
|---|---|
|Fine-grained access control|Able to meet the access control needs of various levels.|



**eBook |** A Practical Guide to MQTT Broker Selection 5


|Support caching|As publishing and subscribing are high-frequency operations,<br>a caching mechanism can effectively alleviate pressure during<br>peak hours.|
|---|---|
|Support integration with multiple<br>databases|Users can flexibly choose their own familiar technology stack.|
|Compatible with the data present<br>in the current database|Consider this when migrating from an old system.|


#### **Software Vulnerabilities and Enterprise IT Security**

The software industry has gained valuable insights from past experiences, recognizing

that security vulnerabilities in software can substantially affect an enterprise's operations.


If you plan to use an MQTT Broker in a production environment, it is vital to conduct a

rigorous security evaluation using the widely accepted security validation methods to

ensure its compliance with security standards:


- Open source validation: check the Broker's code openness and the level of its


validation by the open source community;


- Security integration: check the sufficiency of security testing and protection, and the


adoption of professional security solutions.


Enterprise IT security is essential to safeguard enterprise data from various security

threats such as data leakage, destruction, theft, and abuse. To ensure optimal security,

password policies, security audits, data encryption, and other relevant security features

must be offered by MQTT Brokers.


**eBook |** A Practical Guide to MQTT Broker Selection 6


### **Clustering and Auto-Scaling**

An MQTT Broker cluster is a system that distributes the workload of connecting and

messaging among multiple MQTT Brokers (also known as nodes).


Clients can interact with the cluster as a unified entity without being aware of the internal

workings or any changes in the number of nodes. The cluster handles connections and

also publishes and subscribes messages, just like a single node.

#### **Why Do We Need MQTT Broker Cluster?**


**Ensure Larger Connections and Higher Scalability**


Imagine that you have a car equipped with IoT capabilities. As it floods the market, with

monthly sales reaching thousands to tens of thousands of units, your MQTT Broker needs

to prepare for a potential surge in connections, ranging from tens of thousands to millions,

in the coming years. With the OTA upgrades of the vehicle system, more data is expected


**eBook |** A Practical Guide to MQTT Broker Selection 7


to be transmitted to the cloud, causing a significant increase in message throughput for

your MQTT Broker.


With a cluster-supported MQTT Broker, you have the ability to add nodes to the cluster at

runtime, enabling easy horizontal scaling to accommodate an increasing number of MQTT

messages and client connections.


**Guarantee high availability of services**


Not every application is required to handle the demands of business expansion. For

instance, if your business is solely focused on environmental monitoring in a particular

school or manufacturing facility, the volume of clients and messages can be anticipated to

remain consistent for several years, even without any alterations.


You might have noticed that a solitary MQTT broker has the capacity to accommodate

tens of thousands of clients, which is adequate for the majority of IoT applications. In light

of this, is it essential to implement clustering?


Indeed, it is. An MQTT Broker cluster can persist in functioning even when certain node

failures, guaranteeing that there is no single point of failure and that the service remains

accessible at all times.


Therefore, if you need your application to be reliable, you should select an MQTT Broker

that supports clustering.

#### **Only a Few MQTT Brokers Support Clustering**


An MQTT Broker cluster's main responsibility is to synchronize and replicate MQTT

session state, such as subscribed messages and pending message transfers, among

cluster nodes in an efficient and reliable way. It also aims to balance the load of

connections, manage devices centrally, and ensure the scalability and high availability of


**eBook |** A Practical Guide to MQTT Broker Selection 8


the whole cluster.


Implementing all these features is a complex undertaking, which is why the deployment of

most MQTT Brokers is restricted to a single node. However, recognizing the significance of

scalability and high availability, some of these Brokers offer specialized implementation

solutions.


**Use MQTT Bridging Feature to Link Multiple Brokers**


Using MQTT message publishing and subscribing to exchange messages among multiple

Brokers provides some level of scalability, allowing more clients to connect and interact

with each other. However, this mode of communication is known to be highly inefficient

and does not ensure high availability.


**Synchronize Full Session State Between Multiple Nodes**


One way to achieve high availability of MQTT Brokers is to run multiple instances

simultaneously and perform full synchronization of session state among nodes. If a node

fails, load balancing can quickly switch to another node, providing single-machine hot

backups and avoiding any disruption to IoT applications. However, it is important to note

that this method may not be the best choice for scaling and can lead to increased costs.


Although the above solutions are functional, it does not provide both scalability and high

availability at the same time, and can also complicate the deployment process. To simplify

the creation of reliable IoT services that can scale as needed, it is recommended to choose

MQTT Brokers that support clustering themselves.

### **Data Integration and Rule Engine**


When developing IoT applications, it's often essential to enable data exchange among


**eBook |** A Practical Guide to MQTT Broker Selection 9


multiple systems, not only between devices.


For instance, data collected from sensors on a factory line can be sent to accompanying

MES and ERP systems via an MQTT Broker. To establish a reliable connection between the

two systems, a database or an event-driven message queue like Apache Kafka can serve

as a bridge.


Similarly, weather sensor data scattered across a city can be gathered and stored in a

time-series database like InfluxDB for thorough analysis, enabling the data's full potential

to be realized.


A simple way to do this is to create an application that subscribes to messages from an

[MQTT topic and sends them to the relevant data integration. Some MQTT Brokers offer](https://www.emqx.com/en/blog/advanced-features-of-mqtt-topics)

this functionality as plugins or extensions, since this is a common requirement.


You may also need to filter, encode, or otherwise process the data before saving it to meet

the actual business needs.


Some MQTT Brokers offer a built-in rule engine that facilitates data processing by

enabling users to create data-driven rules on the Broker and send results to data

integration. Typically, this functionality can be configured using low-code tools such as

SQL or form.


The entire process is shown in the following diagram:


**eBook |** A Practical Guide to MQTT Broker Selection 10


For IoT applications that require integration with external data systems, having a built-in

data integration and rule engine can be a major advantage of MQTT Brokers. This feature

reduces the need for additional development work and can speed up business delivery,

while also enabling auto-scaling within the cluster for high availability.

### **Performance**


MQTT Broker is used to connect a large number of clients and enable massive messaging,

where the following performance metrics need to be considered:


1. Maximum number of connections: This refers to the maximum number of client

connections that the MQTT Broker can support.


2. Message transmission latency: The time it takes for a message to be sent from the

sender to the receiver, and is primarily dependent on the performance of the MQTT

Broker, assuming a consistent network environment.


3. Message send/receive rate: The number of messages that can be sent or received per

second by the MQTT Broker.


**eBook |** A Practical Guide to MQTT Broker Selection 11


4. Message storage performance: This metric is relevant for MQTT Brokers that support

message persistence with external data integration, as it measures the performance of

the message storage functionality.


While performance is essential, it's not the only thing to look for in an MQTT Broker. A

high-performing broker usually excels in other areas too, but don't rely solely on

performance metrics to evaluate it, unless it's significantly underperforming.


Besides, it is important to note that the performance metrics reported by an MQTT Broker

are based on a specific scenario, and various factors such as message rate, topic level,

message QoS, message payload size, and the status of the rule engine can influence the

outcomes.


Moreover, any Broker can claim a performance metric that is hard to replicate and

irrelevant to the users. If you have high performance demands, please carefully examine

whether its technology can deliver the expected results and whether its test results can be

reproduced. Real knowledge comes from practice, so it is best to conduct a stress test

based on your own application scenarios.

### **Cloud Native**


Cloud-Native is a modern software architecture and delivery approach specifically

designed to facilitate the efficient and reliable creation and deployment of cloud-based

applications.


By leveraging Cloud-Native technology, MQTT Broker and infrastructure can be

seamlessly integrated to enable efficient, flexible, and reliable deployment through the use

of containers, microservices, and automated operations and maintenance.


Additionally, Cloud-Native technology offers management capabilities such as

configuration management, cluster scaling, seamless upgrades, fault handling, and unified


**eBook |** A Practical Guide to MQTT Broker Selection 12


monitoring to enhance the development and operation of large-scale IoT applications.


To achieve these goals, it is crucial for the scalability and management functionalities of

the MQTT Broker to be tightly integrated with the underlying capabilities of the cloud

infrastructure. However, in reality, the level of Cloud-Native implementation varies among

different Brokers.

### **Support Extensions**


A single software solution cannot fulfill the requirements of all users. To accommodate

specific requirements, such as support for multiple message transfer protocols, custom

authentication and authorization, specialized data encryption methods, and monitoring

and alert capabilities, it may be necessary to extend the functionality of the MQTT Broker.


To facilitate this, the MQTT Broker must provide an appropriate extension mechanism,

such as a plugin architecture, to enable customization when needed. Additionally, it should

support mainstream programming languages for extension development.

### **Cost**


Cost is a multifaceted consideration that must be evaluated in relation to your budget.


Depending on your needs, you may opt for enterprise services or an open-source MQTT

Broker. There are many open-source MQTT Brokers available, which can typically be

deployed without incurring any licensing fees if the open-source license allows it. However,

installation, maintenance, and extension development may require additional resources.


When deploying MQTT Brokers for large-scale applications, it's essential to assess their

performance and consider the costs associated with them. High-performance MQTT

Brokers can significantly reduce the overheads associated with hardware, network, and


**eBook |** A Practical Guide to MQTT Broker Selection 13


maintenance, resulting in lower overall costs.


When choosing a managed [MQTT cloud service, it is essential to understand how billing](https://www.emqx.com/en/cloud)

works, as it usually depends on the number of connections and the amount of traffic. You

should review the details of each billing option carefully and select the most cost-effective

option for your specific use case.

### **Additional Considerations**


In addition to the MQTT Broker itself, there are several other factors to consider:


- **Provide** **Enhanced** **and** **Localized** **Services**


Choose MQTT Broker providers who deliver regional or global services, as they help

enterprises to get quicker technical support, accelerate delivery and cut costs

substantially.


- **Avoid** **Building** **Systems** **From** **Scratch**


To minimize investment risks and costs when selecting MQTT Brokers or technologies

for IoT projects, it is advisable to opt for established solutions with a proven track

record in the industry. Developing systems from scratch should be avoided as it can be

time-consuming, costly, and potentially risky.


- **Support** **Seamless** **Integration** **of** **Edge** **and** **Cloud**


When deploying at the edge, it is important to select an MQTT Broker that has low

resource consumption, is optimized for edge environments, or has a proven cloud-edge

solution.


**eBook |** A Practical Guide to MQTT Broker Selection 14


## **Overview of Popular Open-Source MQTT Brokers**

### **EMQX**

[EMQX](https://www.emqx.io/) is one of the most popular MQTT brokers and has 11.5k stars on GitHub. The EMQX

project was launched in 2012 and is licensed under Apache version 2.0. EMQX is written in

Erlang/OTP, a programming language for building massively scalable soft real-time

systems.


EMQX is the world's most scalable MQTT broker that supports advanced features such as

MQTT 5.0, MQTT-SN, and MQTT over QUIC. It supports masterless clustering for high

availability and horizontal scalability. EMQX 5.0, the latest version, scales to establish 100

million concurrent MQTT connections with a single cluster of 23 nodes.





EMQX offers rich enterprise features, data integration, cloud hosting services, and

[commercial support from EMQ Technologies Inc. Over the years, EMQX has gained](https://www.emqx.com/en)

popularity among enterprises, startups, and individuals due to its performance, reliability,

and scalability. EMQX is widely used for business-critical applications in various

[industries, such as IoT, industrial IoT, connected cars, manufacturing, and](https://www.emqx.com/en/use-cases/industrial-iot)

telecommunications.


**eBook |** A Practical Guide to MQTT Broker Selection 15


**Pros:**


- Supports large-scale deployments


- High availability


- Horizontal scalability


- High-performance and low-latency


- Rich enterprise features


- Pioneering [MQTT over QUIC](https://www.emqx.com/en/blog/mqtt-over-quic)


**Cons:**


- Complex to set up and configure


- Difficult to manage effectively for beginners


- Logs may be confusing

### **Mosquitto**


The Mosquitto project was initially developed by Roger Light in 2009 and later donated to

the Eclipse Foundation, licensed under the Eclipse Public License (EPL/EDL license). As of

March 2023, it is the most widely deployed open-source MQTT broker with a large

community and over 7k GitHub stars.


Mosquitto is written in C/C++ and uses a single-threaded architecture. Mosquitto

implements MQTT protocol versions 5.0, 3.1.1, and 3.1, and supports SSL/TLS and


**eBook |** A Practical Guide to MQTT Broker Selection 16


WebSocket. Its lightweight design makes Mosquitto suitable for deployment on embedded

devices or servers with limited resources.


Mosquitto is known for its small booting footprint of about 200k. However, it does not

provide native support for multi-threading or clustering. Mosquitto is available for various

platforms, including Linux, Windows, and macOS.


**Pros:**


- Easy to setup and use


- MQTT 5.0 protocol support


- Lightweight and small footprint


- Active community support


**Cons:**


- Single-threaded architecture


- Limited scalability in production ( <100k )


**eBook |** A Practical Guide to MQTT Broker Selection 17


- No clustering support


- Lacking enterprise features


- Limited cloud-native support

### **NanoMQ**


[NanoMQ, an open-source project released in 2020, is a lightweight and fast MQTT](https://nanomq.io/)

messaging broker designed for edge computing scenarios in the Internet of Things (IoT).


NanoMQ is implemented in purely C, based on NNG's asynchronous I/O with a

[multi-threading Actor Model. It fully supports MQTT 3.1.1 and MQTT 5.0 protocol versions](https://en.wikipedia.org/wiki/Actor_model)

and pioneers MQTT over QUIC.


NanoMQ is lightweight and high-performance, making it suitable for various edge

computing platforms. It is highly compatible and portable, relying solely on the native

POSIX API. This makes it easy to deploy on any POSIX-compatible platform and runs

smoothly on various CPU architectures, including x86_64, ARM, MIPS, and RISC-V.


**eBook |** A Practical Guide to MQTT Broker Selection 18


**Pros:**


- Lightweight design


- Multi-threading and Async IO


- Highly portable


- Small booting footprint


- Easy to deploy


- Bridging with brokerless protocols


**Cons:**


- No clustering support


- Small community and user base as an early project


- Lack of documentation and tutorials


- Lack of enterprise features (data Integrations)

### **VerneMQ**


[The VerneMQ project was launched in 2014](https://github.com/vernemq/vernemq/tree/3c7703f0d62e758ba22a34ceb756f2ac2a4da44a) [and initially developed by Erlio GmbH. The](https://vernemq.com/company.html)

project is licensed under Apache Version 2.0. It supports MQTT versions 3.1, 3.1.1, and 5.0.

[As the second broker wrote in Erlang/OTP, it borrowed some code from the EMQX project.](https://github.com/vernemq/vernemq/blob/ff75cc33d8e1a4ccb75de7f268d3ea934c9b23fb/apps/vmq_commons/src/vmq_topic.erl)


Regarding architectural design, VerneMQ is designed to handle millions of concurrent

connections and messages with low latency and high throughput. It supports MQTT


**eBook |** A Practical Guide to MQTT Broker Selection 19


[message persistence in LevelDB and uses a clustering architecture based on the Plumtree](https://github.com/lasp-lang/plumtree)

[library, which implements the Epidemic Broadcast Trees](https://asc.di.fct.unl.pt/~jleitao/pdf/srds07-leitao.pdf) algorithm.


Unfortunately, this Plumtree cluster architecture has not proven to work, even though it

seems perfect in theory. The VerneMQ team and community have spent many years trying

to make it work, fixing problems such as network split, data inconsistency, and crash

recovery.


Finally, the project has stopped being actively developed and maintained, with only about

50 commits in the last 12 months.


**Pros:**


- High availability


- Horizontal scalability


- Message persistence


**Cons:**


- Not proofed clustering


- Limited documentation


- Limited enterprise features


- Not actively developing


**eBook |** A Practical Guide to MQTT Broker Selection 20


## **Side-by-Side Comparison**

### **Scalability, Performance, and Reliability**











|Col1|EMQX|Mosquitto|NanoMQ|VerneMQ|
|---|---|---|---|---|
|**Scalability**|**Scalability**|**Scalability**|**Scalability**|**Scalability**|
|Multi-threading|Yes|No|Yes|Yes|
|Asynchronous I/O|Yes|Yes|Yes|Yes|
|Clustering|Yes (over 20<br>nodes cluster)|No|No|Yes|
|MQTT connections<br>per node|4M|100k|100k|1M|
|MQTT connections<br>per cluster|100M|N/A|N/A|?|
|**Availability**|**Availability**|**Availability**|**Availability**|**Availability**|
|Masterless<br>Clustering<br>Architecture|Yes|No|No|Yes|
|Elastic and Resilient<br>scaling at runtime|Yes|No|No|Yes|
|Auto Clustering|Yes|No|No|No|
|Overload Protection|Yes|No|No|Yes|
|Fault tolerance|Yes|No|No|?|
|**Performance (per node)**|**Performance (per node)**|**Performance (per node)**|**Performance (per node)**|**Performance (per node)**|
|QoS0 msgs/sec|2 million|120k|500k|?|


**eBook |** A Practical Guide to MQTT Broker Selection 21


|QoS1 msgs/sec|800k|80k|400k|?|
|---|---|---|---|---|
|QoS2 msgs/sec|200k|40k|200k|?|
|**Latency**|**Latency**|**Latency**|**Latency**|**Latency**|
|Latency (varies on<br>different scenarios)|Single-digit<br>millisecond<br>latency at scale|Up to seconds<br>latency in some<br>scenarios|Less than 10<br>milliseconds in<br>most<br>scenarios|Up to seconds<br>latency in some<br>scenarios|
|**Reliability**|**Reliability**|**Reliability**|**Reliability**|**Reliability**|
|Message<br>Persistence|In RocksDB and<br>External<br>Databases|In Files|In SQLite|In LevelDB|
|Zero Downtime/Hot<br>Upgrade|Yes|No|No|No|
|Hot Patch|Yes|No|No|No|

### **MQTT Protocol and Connectivity**

|Col1|EMQX|Mosquitto|NanoMQ|VerneMQ|
|---|---|---|---|---|
|MQTT 3.1/3.1.1|Yes|Yes|Yes|Yes|
|MQTT 5.0|Yes|Yes|Yes|Yes|
|MQTT-SN 1.2|Yes|No|No|No|
|MQTT over TCP|Yes|Yes|Yes|Yes|



**eBook |** A Practical Guide to MQTT Broker Selection 22


|MQTT over SSL/TLS|Yes|Yes|Yes|Yes|
|---|---|---|---|---|
|MQTT over WebSocket|Yes|Yes|Yes|Yes|
|MQTT over QUIC|Yes|No|Yes|No|
|MQTT Bridging|Yes|Yes|Yes|Yes|
|Shared Subscription|Yes|Yes|Yes|Yes|
|Retained Message|Yes|Yes|Yes|Yes|
|Will Message|Yes|Yes|Yes|Yes|
|MQTT Request/Response|Yes|Yes|Yes|Yes|
|LB (Proxy Protocol)|Yes|No|No|Yes|
|Multi-protocol Gateway|Yes|No|No|No|
|CoAP|Yes|No|No|No|
|LwM2M|Yes|No|No|No|
|DDS Gateway|No|No|Yes|No|
|ZeroMQ Gateway|No|No|Yes|No|
|Nanomsg/NNG|No|No|Yes|No|

### **Security, Authentication & Authorization**






|Col1|EMQX|Mosquitto|NanoMQ|VerneMQ|
|---|---|---|---|---|
|TLS/SSL|Yes|Yes|Yes|Yes|
|OCSP Stapling|Yes|Yes|No|No|
|Username/Password<br>Authentication|Yes|Yes|Yes|Yes|



**eBook |** A Practical Guide to MQTT Broker Selection 23


|X.509 Certificates<br>Authentication|Yes|Yes|Yes|Yes|
|---|---|---|---|---|
|JWT Authentication|Yes|Yes (via auth plugin)|No|?|
|LDAP Authentication|Yes|Yes (via auth plugin)|No|Yes (via plugin)|
|Fine-grained Access<br>Control|Yes|Yes|Yes|Yes|
|Authorization using<br>Databases|Yes(built-in)|Yes (via auth plugin)|No|Yes (via auth<br>plugin)|
|Flapping Detection|Yes|No|No|No|
|Audit Logs|Yes|No|No|No|

### **Data Integrations (Out-of-the-Box)**

|Col1|EMQX|Mosquitto|NanoMQ|VerneMQ|
|---|---|---|---|---|
|WebHook|Yes|Yes|Yes|Yes|
|Rule Engine|Yes|No|Yes (limited)|No|
|Message Codec|Yes|No|No|No|
|Schema Registry|Yes|No|No|No|
|Data Bridge|Yes|No|No|No|
|Confluent/Kafka|Yes (Enterprise Edition)|No|No|No|
|SAP Event Mesh|Yes (Enterprise Edition)|No|No|No|
|Apache Pulsar|Yes (Enterprise Edition)|No|No|No|
|RabbitMQ|Yes (Enterprise Edition)|No|No|No|
|MySQL|Yes (Enterprise Edition)|No|No|No|



**eBook |** A Practical Guide to MQTT Broker Selection 24


|PostgreSQL|Yes (Enterprise Edition)|No|No|No|
|---|---|---|---|---|
|SQL Server|Yes (Enterprise Edition)|No|No|No|
|MongoDB|Yes (Enterprise Edition)|No|No|No|
|AWS DynamoDB|Yes (Enterprise Edition)|No|No|No|
|ClickHouse|Yes (Enterprise Edition)|No|No|No|
|InfluxDB|Yes (Enterprise Edition)|No|No|No|
|TimeScaleDB|Yes (Enterprise Edition)|No|No|No|
|Oracle|Yes (Enterprise Edition)|No|No|No|
|Redis|Yes (Enterprise Edition)|No|No|No|
|Cassandra|Yes (Enterprise Edition)|No|No|No|

### **Operability, Observability, and Compatibility**











|Col1|EMQX|Mosquitto|NanoMQ|VerneMQ|
|---|---|---|---|---|
|Dashboard|Yes|No|No|No|
|Configuration|HOCON Format|Key-value<br>Format|HOCON<br>Format|Key-value<br>Format|
|Config Hot update|Yes|No|Yes (Limited)|No|
|REST API|Yes|Yes|Yes|Yes|
|CLI|Yes|Yes|Yes|Yes|
|Remote Console|Yes|No|No|Yes|
|Metrics|Yes|Yes|Yes|Yes|
|Grafana Integration|Yes|Yes|Yes|Yes|


**eBook |** A Practical Guide to MQTT Broker Selection 25


|Prometheus|Yes|Yes|Yes|Yes|
|---|---|---|---|---|
|Docker|Yes|Yes|Yes|Yes|
|Kubernetes Operator|Yes(EMQX Kubernetes<br>Operator)|No|No|No|
|Terraform|Yes(EMQX Terraform)|No|No|No|


**eBook |** A Practical Guide to MQTT Broker Selection 26


## **Conclusion**

The MQTT broker serves as the backbone of your IoT communication infrastructure,

facilitating reliable and efficient messaging between devices and applications. Selecting

the right MQTT broker is of utmost importance for the success of your IoT business. An

unsuitable MQTT broker can lead to a range of challenges and limitations, such as

performance bottlenecks, unreliable message delivery, data integrity issues, or

compatibility problems with other components of your IoT ecosystem. Additionally,

migrating from one MQTT broker to another can be a complex and time-consuming

process. Therefore, investing time and effort into selecting the most suitable MQTT broker

from the outset can save you significant headaches and costs in the long run.


Whether you're a seasoned IoT professional or just starting your IoT journey, we believe

that the information provided here will assist you in choosing the right MQTT broker and

unlocking the full potential of your IoT projects. We wish you the best of luck in your MQTT

broker selection and future IoT endeavors!


**eBook |** A Practical Guide to MQTT Broker Selection 27


# **Next Steps**

Read our MQTT benchmark testing reports to learn more details about the performance of


popular brokers：


**Open MQTT Benchmarking Comparison**








EMQ is the world's leading software provider of open-source IoT data

infrastructure. We are dedicated to empowering future-proof IoT applications

through one-stop, cloud-native products that connect, move, process, and

integrate real-time IoT data—from edge to cloud to multi-cloud.


Our core product EMQX, the world's most scalable and reliable open-source

MQTT messaging platform, supports 100M concurrent IoT device connections per

cluster while maintaining 1M message per second throughput and

sub-millisecond latency. It boasts more than 20K+ enterprise users, connecting

100M+ IoT devices, and is trusted by over 400 customers in mission-critical IoT

scenarios, including well-known brands like HPE, VMware, Verifone, SAIC

Volkswagen and Ericsson.


[To learn more, please visit: https://www.emqx.com/en](https://www.emqx.com/en)


