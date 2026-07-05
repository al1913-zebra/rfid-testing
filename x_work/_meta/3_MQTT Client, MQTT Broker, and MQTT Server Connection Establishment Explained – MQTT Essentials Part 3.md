MQTT follows the publish-subscribe model, where clients communicate with a central server called a broker. This architecture powers HiveMQ's IoT data streaming platform, creating the reliable foundation needed for enterprise data exchange.

Welcome to Part 3 of [MQTT Essentials](https://www.hivemq.com/mqtt/), a blog series on the core features and concepts of the [MQTT protocol](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt). In this article, we will discuss the MQTT client, the [MQTT broker](https://www.hivemq.com/blog/mqtt-brokers-beginners-guide), and explain the process of establishing a connection between an MQTT Client and an MQTT broker.

In Part 2 of this series, [Publish/Subscribe Architecture (Pub/Sub)](https://www.hivemq.com/blog/mqtt-essentials-part2-publish-subscribe), we discussed Publish/Subscribe (Pub/Sub) architecture and how MQTT uses this model to exchange messages.

Let’s now dive deeper into the world of MQTT.

## Introduction to MQTT Client and MQTT Broker

The two main components of the MQTT protocol are the client and the broker. An MQTT client can be any device that runs an MQTT library and connects to an [MQTT broker](https://www.hivemq.com/blog/mqtt-brokers-beginners-guide) over a network. The publisher and subscriber labels refer to whether the client is publishing or subscribed to receive messages. The MQTT broker, on the other hand, is responsible for receiving all messages, filtering them, and sending them to subscribed clients. The broker also handles client authentication and authorization and holds all clients’ session data with persistent sessions. Let’s dive deeper into foundational MQTT components.

## What is an MQTT Client?

In IoT, an [MQTT client](https://www.hivemq.com/mqtt/mqtt-client-library-encyclopedia) usually refers to publishers and subscribers. A publisher is a client that sends messages, while a subscriber is a client that receives messages. However, an MQTT client can also be a publisher and a subscriber.

An MQTT client can be any device, ranging from a tiny microcontroller to a gigantic server, that runs an MQTT library and connects to an [MQTT broker](https://www.hivemq.com/blog/mqtt-brokers-beginners-guide) over a network.

An [MQTT client library](https://www.hivemq.com/mqtt/mqtt-client-library-encyclopedia) is a software module or package that implements the MQTT protocol and provides an interface for devices or applications to communicate using MQTT. These libraries make it easier to add MQTT support to applications or devices without implementing the protocol from scratch.

MQTT client libraries are available for various programming languages and platforms, such as Android, Arduino, C, C++, C#, Go, iOS, Java, JavaScript, .NET, and more. You can find a complete list of available libraries on the [MQTT wiki](https://github.com/mqtt/mqtt.github.io/wiki/libraries). Do check out our [MQTT Client Libraries](https://www.hivemq.com/mqtt/mqtt-client-library-encyclopedia) too.

The MQTT client can be a typical computer running a graphical MQTT client used for testing purposes. Any device that uses the TCP/IP network protocol and has software that implements MQTT client functionality can be called an MQTT client. MQTT is designed to work on top of the TCP/IP protocol, so any device that speaks TCP/IP and implements the MQTT protocol can be an MQTT client. The client implementation of the MQTT protocol is straightforward and streamlined, making it ideally suited for small devices.

## What is an MQTT Broker?

An MQTT broker is a central hub in the publish/subscribe messaging system that receives messages from publishers and distributes them to subscribers. It plays a critical role in managing the communication flow between MQTT clients and ensuring reliable message delivery.

The functionality of an MQTT Broker includes the following:

1.  **Handling large numbers of concurrent connections**: Depending on the implementation, a broker can handle millions of concurrently connected MQTT clients. It enables communication between different devices, networks, and software systems by bridging the gap between them.
    
2.  **Filtering and routing messages**: The broker filters the messages based on the subscription topic and determines which client(s) should receive the message.
    
3.  **Session management**: The broker maintains session data of all connected clients, including subscriptions and missed messages, for clients with persistent sessions.
    
4.  **Authentication and Authorization**: The broker is responsible for authenticating and authorizing clients based on credentials provided by the client. The broker is extensible, facilitating custom authentication, authorization, and integration into backend systems. In addition to authentication and authorization, brokers may provide other security features, such as encryption of messages in transit and access control lists.
    
5.  **Scalability, integration, and monitoring**: An MQTT broker must be scalable to handle large volumes of messages and clients, integrate into backend systems, be easy to monitor, and be failure-resistant. To meet these requirements, the MQTT broker must use state-of-the-art event-driven network processing, an open extension system, and standard monitoring providers. Brokers may also provide advanced features for managing and monitoring the MQTT system, such as message filtering, message persistence, and real-time analytics.
    

In addition, some MQTT brokers support clustering, which allows multiple instances of the broker to work together to handle large numbers of clients and messages. Beyond message routing, the broker also serves as the crucial integration point between operational technology and IT systems.

HiveMQ is an IoT Data Streaming platform, built on MQTT, that meets all of these requirements, providing a robust and scalable solution for the MQTT messaging system.

Now that we have discussed the MQTT broker and its responsibilities, let’s take a closer look at how MQTT clients establish connections with the broker.

## How to Establish Communication Between MQTT Clients and MQTT Broker?

One of the key features of the MQTT protocol is its efficient and lightweight approach to exchanging messages between IoT devices. The foundation of this communication is the MQTT connection, which enables devices to securely and reliably exchange data with the MQTT broker. In this section, we will explore the process of establishing an MQTT connection and the different parameters involved. By understanding how MQTT connections work, you can optimize your IoT deployment for better performance, security, and scalability.

The MQTT protocol is based on TCP/IP, meaning the client and the broker must have a TCP/IP stack.

![How to Establish Communication Between MQTT Clients and MQTT Broker?](https://www.hivemq.com/sb-assets/f/243938/350x169/b4a6738fab/mqtt-tcp-ip-stack.webp/m/ "How to Establish Communication Between MQTT Clients and MQTT Broker?")MQTT connections are always between one client and one broker, and clients never connect directly to other clients. To initiate a connection, the client sends a CONNECT message to the broker, which responds with a CONNACK message and a status code. Once the connection is established, the broker keeps it open until the client sends a disconnect command or the connection breaks.

![CONNACK in MQTT](https://www.hivemq.com/sb-assets/f/243938/550x171/81094f3d9d/connect-flow.gif/m/ "CONNACK in MQTT")The CONNECT message contains the following information:

-   ClientId: A client identifier used by the broker to identify the client. This identifier helps track device state and manage authentication throughout your IoT architecture.
    
-   CleanSession: A flag for session handling. This setting determines whether subscriptions and queued messages persist across disconnections, which is critical for devices with spotty connectivity.
    
-   Username/Password: Optional credentials for client authentication. Enterprise deployments need robust security. HiveMQ supports multiple authentication approaches, including traditional credentials, certificates, and integration with existing security infrastructure.
    
-   Will Message: Optional message for the broker to send to other clients in case this client disconnects ungracefully. This feature enables sophisticated monitoring capabilities essential for high-availability systems at scale.
    
-   KeepAlive: Time interval in seconds used to detect if the connection is still viable. Properly tuned keep-alive settings maintain optimal network performance while quickly detecting failed connections.
    

In the following section, we will explore the MQTT connection through a NAT and how the MQTT client initiates a connection by sending a CONNECT message to the broker. We will delve into the details of the MQTT CONNECT command message and focus on some essential options, including ClientId, Clean Session, Username/Password, Will Message, and Keep Alive. Moreover, we will discuss the broker’s response to a CONNECT message, which is a CONNACK message containing two data entries: the session present flag and a connect return code.

### MQTT Connection Through a NAT

In many cases, MQTT clients live behind routers that use network address translation (NAT) to convert private network addresses (such as 192.168.x.x or 10.0.x.x) to public-facing addresses. As mentioned, the MQTT client starts the connection by sending a CONNECT message to the broker. Since the broker has a public address and maintains the connection open to enable bidirectional sending and receiving of messages (after the initial CONNECT), MQTT clients located behind NAT routers will have no difficulties.

For those unaware, NAT is a common networking technology that routers use to allow devices on a private network to access the internet through a single public IP address. NAT works by translating the IP addresses of devices on the private network to the public IP address of the router and vice versa.

In the case of MQTT, clients behind a NAT router can still communicate with the MQTT broker because the broker has a public IP address and can connect with the client through the NAT. However, some potential issues can arise with NAT, such as configuring port forwarding or opening firewall ports to allow incoming traffic to reach the MQTT broker. Additionally, some NAT implementations may have limitations on the number of concurrent connections that can be established, which could affect the scalability of the MQTT system.

Now that we understand how MQTT clients behind a NAT establish a connection with the broker, let’s take a closer look at the MQTT CONNECT command message and its contents.

### How Does MQTT Client Initiate a Connection with the CONNECT Message?

Now let’s examine the [**MQTT CONNECT**](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718028) command message, which the client sends to the broker to initiate a connection. If this message is malformed or too much time elapses between opening a network socket and sending the CONNECT message, the broker terminates the connection to deter malicious clients that can slow the broker down. In addition to other details specified in the MQTT 3.1.1 specification, a good-natured MQTT 3 client sends the following content.

Let’s focus on some of the essential options:

![MQTT Connect Packet showing ClientID](https://www.hivemq.com/sb-assets/f/243938/490x308/106aa2789f/connect.webp/m/ "MQTT Connect Packet showing ClientID")While users of an MQTT library may find some of the information in a CONNECT message useful, certain details may be more relevant to implementers of the library. For a complete understanding of all the information contained in the message, refer to the [MQTT 3.1.1 specification](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html).

**Let’s look at some of the elements the MQTT CONNECT packet contains, such as ClientId, Clean Session, Username/Password, Will Message, Keep Alive, etc.**

#### What is ClientId in CONNECT MQTT Packet?

The ClientId is a unique identifier that distinguishes each MQTT client connecting to a broker and enables the broker to keep track of the client’s current state. To ensure uniqueness, the ClientId should be specific to each client and broker. MQTT 3.1.1 allows for an empty ClientId if no state needs to be maintained by the broker. However, this connection must have the clean session flag set to true, or the broker will reject the connection.

#### What is CleanSession in CONNECT MQTT Packet?

The CleanSession flag indicates whether the client wants to establish a persistent session with the broker. When CleanSession is set to false (CleanSession = false), considered a persistent session, the broker stores all subscriptions for the client and all missed messages for the client that subscribed with a [Quality of Service (QoS) level 1 or 2](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels). In contrast, when CleanSession is set to true (CleanSession = true), the broker doesn’t retain any information for the client and discards any previous state from any persistent session.

#### What is Username/Password in CONNECT MQTT Packet?

MQTT provides the option to include a username and password for client authentication and authorization. However, it’s important to note that sending this information in plain text poses a security risk. To mitigate this risk, we highly recommend using encryption or hashing (such as through TLS) to protect the credentials. We also recommend using a secure transport layer when transmitting sensitive data.

Alternatively, some brokers like HiveMQ offer SSL certificate authentication, eliminating the need for username and password credentials altogether. Taking these precautions ensures that your MQTT communication remains secure and protected from potential security threats.

#### What is Will Message in CONNECT MQTT Packet?

The MQTT Last Will and Testament (LWT) feature includes a last will message that notifies other clients when a client disconnects unexpectedly. This message can be specified by the client within the CONNECT message as an MQTT message and topic. When the client disconnects abruptly, the broker sends the LWT message on the client’s behalf. Learn more about [MQTT Last Will and Testament](https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament) in Part 9 of this series.

#### What is Keep Alive in CONNECT MQTT Packet?

The MQTT keep alive feature allows the client to specify a time interval in seconds and communicate it to the broker when establishing a connection. This interval determines the longest period the broker and client can communicate without sending a message. To ensure the connection remains active, the client sends regular PING Request messages, and the broker responds with a PING response. This method allows both sides to determine if the other is still available. Learn more about [MQTT Keep Alive](https://www.hivemq.com/blog/mqtt-essentials-part-10-alive-client-take-over) functionality in Part 10 of this series.

When connecting to an MQTT broker from an MQTT 3.1.1 client, the keep alive interval is essential. However, some MQTT libraries have additional configuration options, such as the way queued messages are stored in a specific implementation.

### MQTT Broker Response With a CONNACK Message

When a broker receives a CONNECT message, it is obligated to respond with a CONNACK message.

![CONNACK MQTT packet showing sessionPresent and returnCode](https://www.hivemq.com/sb-assets/f/243938/490x291/2308f5c142/connack1.webp/m/ "CONNACK MQTT packet showing sessionPresent and returnCode")The CONNACK message contains two data entries:

-   The session present flag
    
-   A connect return code
    

#### What is sessionPresent Flag in a CONNACK Message?

The sessionPresent flag informs the client whether a previous session is still available on the broker. If the client has requested a clean session, the flag will always be false, indicating there is no previous session.

However, if the client requests to resume a previous session, the flag will be true if the broker still has stored session information. This flag helps clients determine whether they need to re-subscribe to topics or if the broker still has the subscriptions from the previous session.

#### What is returnCode Flag in a CONNACK Message?

The returnCode is a status code that informs the client about the success or failure of the connection attempt. This code can indicate various types of errors, such as invalid credentials or unsupported protocol versions.

Here are the returnCodes at a glance:

| Return Code | Return Code Response |
|-------------|---------------------------------------------------|
| 0 | Connection accepted |
| 1 | Connection refused, unacceptable protocol version |
| 2 | Connection refused, identifier rejected |
| 3 | Connection refused, server unavailable |
| 4 | Connection refused, bad user name or password |
| 5 | Connection refused, not authorized |

For a more detailed explanation of each of these codes, see [the MQTT specification](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718035).

It’s essential to pay attention to the connect returnCode, as it can help diagnose connection issues. For example, if the returnCode indicates an authentication failure, the client can attempt to reconnect with the correct credentials. Understanding the sessionPresent flag and connect returnCode is crucial for successful MQTT connections.

### How Does MQTT Maintain a Connection?

If you’re wondering how MQTT maintains a connection even when there are no messages being sent or how to determine when a connection is lost, don’t worry. We’ll be covering these topics in-depth further in this series.

## Conclusion

To summarize, understanding the roles of MQTT clients and the broker and the connection establishment process is essential for anyone interested in working with the MQTT protocol. MQTT client libraries make adding MQTT support to applications and devices easy without implementing the protocol from scratch. MQTT brokers are responsible for receiving, filtering, and sending messages to subscribed clients and handling client authentication and authorization.

With this knowledge, you can build scalable and efficient IoT systems using MQTT. If you want to learn more about the MQTT protocol, we highly recommend that you check out the other articles in the MQTT Essentials series and explore the available libraries and resources.

In our next article of this series, we’ll discuss more advance topics on [publishing, subscribing, and unsubscribing in MQTT.](https://www.hivemq.com/blog/mqtt-essentials-part-4-mqtt-publish-subscribe-unsubscribe)

Subscribe to our [RSS feed here](https://www.hivemq.com/feed.xml) to stay updated. Do check out [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) and [MQTT Glossary](https://www.hivemq.com/mqtt/) to know all the key MQTT terminologies. Watch the video below that complements the concepts discussed in this article.