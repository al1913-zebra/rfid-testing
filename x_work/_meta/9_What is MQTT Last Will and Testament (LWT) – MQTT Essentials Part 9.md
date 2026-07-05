TL;DR

This blog explains MQTT Last Will and Testament (LWT), showing how clients can notify others when they disconnect unexpectedly. It covers configuration, use cases, and why LWT is critical for reliable IoT systems.

**Who is this blog for:** IoT Developers, MQTT Enthusiasts.

Last Will and Testament (LWT) is a powerful feature in MQTT that allows clients to specify a message that will be automatically published by the broker on their behalf, if or when an unexpected disconnection occurs. It provides a reliable means of communication and ensures that clients can gracefully handle disconnections without leaving topics in an inconsistent state. This feature is particularly valuable when clients must notify others of their unavailability or convey important information upon an unexpected disconnection.

Here’s Part 9 of [MQTT Essentials,](https://www.hivemq.com/mqtt/) a ten-part blog series on the core features and concepts of the [MQTT protocol](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt), where we we will dive into the concept of **Last Will and Testament (LWT) in detail.** If you want to understand [what are Retained Messages in MQTT?,](https://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages) check out Part 8 of this series. Else, let’s dive in to LWT.

## What is the Purpose of Last Will and Testament (LWT) in MQTT?

In scenarios where unreliable networks are prevalent, it is common for MQTT clients to experience occasional unintended breaks, which can happen due to loss of connection or depleted batteries. Understanding the type of disconnection (graceful - with a disconnect message, or ungraceful - without a disconnect message) is crucial for taking appropriate actions.

The LWT allows clients to notify others about their unexpected disconnections. When a client connects to a broker, it can specify a last-will message. **This message follows the structure of a regular MQTT message structure, including a topic, retained message flag, Quality of Service (QoS), and payload.** The broker stores this message until it detects an ungraceful disconnect from the client. Upon detecting the disconnection, the broker broadcasts the last will message to all subscribed clients of the corresponding topic. The broker discards the stored LWT message if the client disconnects gracefully using the DISCONNECT message.

![DISCONNECT MQTT Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/67c4bc137d/disconnect.webp/m/ "DISCONNECT MQTT Packet")_DISCONNECT MQTT Packet_

By utilizing LWT, you can implement various strategies to handle client disconnections and inform other clients about the offline status.

## How to Configure a Last Will and Testament (LWT) Message for an MQTT Client?

To specify an LWT message for an MQTT client, you include it in the CONNECT message, which is used to initiate the connection between the client and the broker.

![CONNECT MQTT Packet](https://www.hivemq.com/sb-assets/f/243938/490x308/1f8afc7b3e/connect.webp/m/ "CONNECT MQTT Packet")_CONNECT MQTT Packet_

For detailed information on establishing the connection between the client and broker, read our article [MQTT Client, MQTT Broker, and MQTT Server Connection Establishment Explained.](https://www.hivemq.com/blog/mqtt-essentials-part-3-client-broker-connection-establishment)

## When does the MQTT Broker Send the LWT Message?

According to the [MQTT 3.1.1 specification,](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html) the broker sends a client’s Last Will and Testament (LWT) message in the following situations:

1.  **I/O error or network failure**: If the broker detects any issues with the input/output or network connection, it will distribute the LWT message.
    
2.  **Failed communication within Keep Alive period**: If the client fails to communicate with the broker within the specified Keep Alive period, the LWT message is sent. In Part-10 of our MQTT Essentials, we will explore the concept of [MQTT Keep Alive](https://www.hivemq.com/blog/mqtt-essentials-part-10-alive-client-take-over) time and delve into its significance it.
    
3.  **Client closes connection without DISCONNECT**: When the client terminates the network connection without sending a DISCONNECT packet, the broker ensures the LWT message is distributed.
    
4.  **Broker closes connection due to protocol error**: If the broker closes the network connection due to a protocol error, it will send the LWT message.
    

Understanding when and why the broker sends the Last Will and Testament (LWT) messages lays the groundwork for implementing best practices in leveraging this feature, which we will delve into in the next section.

## When to Use Last Will and Testament (LWT) in MQTT?

LWT proves invaluable for alerting subscribed clients about an abrupt disconnection of a client. It becomes a powerful tool for storing and communicating client state on specific topics when combined with retained messages.

For instance, by setting a `lastWillMessage` with `Offline` payload, enabling the lastWillRetain flag, and specifying the `lastWillTopic` as _client1/status_, followed by publishing an `Online` retained message to the same topic, client1 can keep newly-subscribed clients informed about its online status. Should client1 disconnect unexpectedly, the broker publishes the LWT message with `Offline` payload as the new [retained message](https://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages), ensuring that clients subscribing to the topic while client1 is offline receive the LWT message and stay up to date on its current status.

LWT not only notifies subscribed clients about unexpected disconnections but also assists in maintaining the system’s integrity by providing valuable information on client states. Combining LWT with retained messages allows you to create a robust solution that stores and communicates the latest client state on specific topics, ensuring reliable updates for all subscribers. This approach enables seamless integration and synchronization between clients, enhancing the overall resilience and functionality of the MQTT network.

## The Importance of Last Will and Testament in MQTT: A Summary

To summarize, the Last Will and Testament (LWT) feature in MQTT is crucial in ensuring efficient communication and maintaining system integrity in the event of unexpected client disconnections. **By combining LWT with retained messages, developers can store and communicate client state on specific topics, providing valuable information to subscribed clients.** LWT empowers MQTT networks with enhanced resilience, seamless integration, and reliable updates, making it a powerful tool for various applications. By understanding the benefits and best practices of LWT, you can leverage this feature to create robust and effective MQTT solutions.

That brings us to the end of Part 9 of our MQTT Essentials series. In the next and the final part of this series, we’ll cover the [MQTT heartbeat mechanism and how the broker knows a client is online or offline.](https://www.hivemq.com/blog/mqtt-essentials-part-10-alive-client-take-over)

**Are you enjoying our content? Then sign up for our newsletter below.** Subscribe to our [RSS feed here](https://www.hivemq.com/feed.xml) to stay updated. Do check out [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) and [MQTT Glossary](https://www.hivemq.com/mqtt/) to know all the key MQTT terminologies. Watch the video below that complements the concepts discussed in this article.