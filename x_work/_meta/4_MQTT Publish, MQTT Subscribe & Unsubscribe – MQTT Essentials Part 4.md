Welcome to Part 4 of [MQTT Essentials](https://www.hivemq.com/mqtt/), a blog series on the core features and concepts of the [MQTT protocol](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt)[.](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt) In this article, we’ll dig deeper into publishing, subscribing, and unsubscribing in MQTT. If you’re new to the publish/subscribe model, we encourage you to read our earlier article on the [basics of the pub/sub pattern](https://www.hivemq.com/blog/mqtt-essentials-part2-publish-subscribe) before proceeding. In part 3 of this series, we covered the [process of establishing a connection between the MQTT client and broker](https://www.hivemq.com/blog/mqtt-essentials-part-3-client-broker-connection-establishment). Now, we’ll take things a step further by discussing how to send and receive messages using MQTT.

## What is an MQTT PUBLISH Message?

In MQTT, a client can publish messages immediately when it connects to a broker. The messages are filtered based on topics, and each message must contain a topic that the broker can use to forward the message to interested clients. The payload of each message includes the data to transmit in byte format, and the sending client can choose to send any type of data, including text, numbers, images, binary data, and even full-fledged XML or JSON.

![What is an MQTT PUBLISH Message?](https://www.hivemq.com/sb-assets/f/243938/490x291/a8acf37894/publish_packet.webp/m/ "What is an MQTT PUBLISH Message?")_Example of MQTT Payload Format_

A PUBLISH message in MQTT has several attributes that determine its behavior including the packet identifier, topic name, quality of service, retain flag, payload, and DUP flag. Let’s take a look at each.

### What is MQTT PacketId or Packet Identifier?

The Packet Identifier (PacketId) is an essential attribute in MQTT. It is used to identify the specific message and to ensure that messages are delivered in the order they were sent, particularly when QoS levels greater than zero are used. The Packet ID is assigned by the client and is included in the PUBLISH, PUBREL, PUBREC, and PUBCOMP messages. When the broker receives a PUBLISH message, it assigns a Packet ID to the message and sends a PUBACK message to the client containing the Packet ID of the PUBLISH message. The client uses the PUBACK message to confirm that the broker has received the message.

These four messages are part of the MQTT protocol’s Quality of Service (QoS) mechanisms, which ensure reliable message delivery. The QoS level determines the number of messages exchanged between the client and the broker.

**It’s worth noting that the packet identifier uniquely identifies a message as it flows between the client and broker. The packet identifier is only relevant for QoS levels greater than zero. This holds true not only for PUBLISH, but for SUBSCRIBE, UNSUBSCRIBE and CONNECT message.**

The client library and/or the broker is responsible for setting this internal MQTT identifier. When a QoS level greater than zero is used, the client must wait for a PUBACK or PUBREC message from the broker before it can send the next message. The client should also keep track of the Packet IDs it has sent and received to ensure that messages are not lost or duplicated. Overall, the Packet ID is essential to MQTT’s reliability mechanism and helps ensure that messages are delivered correctly and efficiently.

### What is MQTT Topic Name?

MQTT uses the topic name as a fundamental concept. It structures this name hierarchically using forward slashes as delimiters and creates a simple string. It’s similar to a URL path but without the protocol and domain components. MQTT topics are used to label messages and provide a way for clients to subscribe to specific messages.

For example, a device that measures temperature might publish its readings to the topic `"sensors/temperature/livingroom"`. A client interested in these readings can subscribe to this topic and receive updates as they’re published.

MQTT provides two types of wildcards to use with topic subscriptions:

-   **"+" (plus sign)** is used to match a single level in the hierarchy. For example, a subscription to `"sensors/+/livingroom"` would match “sensors/temperature/livingroom” and “sensors/humidity/livingroom”, but not “sensors/temperature/kitchen”.
    
-   **"#" (hash sign)** is used to match multiple levels in the hierarchy. For example, a subscription to “sensors/#” would match “sensors/temperature/livingroom”, “sensors/humidity/kitchen”, and “sensors/power/meter1”.
    

Subscribing to a large number of topics can have a significant impact on broker performance. This is because every message that is published to a topic subscribed by a client must be delivered to that client. If many clients subscribe to many topics, this can quickly become a heavy burden on the broker.

Using wildcards to subscribe to multiple topics with a single subscription can also impact performance. When a client subscribes to a topic with a wildcard, the broker must evaluate every message published to a matching topic and determine whether to forward it to the client. If the number of matching topics is large, this can strain the broker’s resources.

To avoid performance issues, it’s important to use topic subscriptions efficiently. One approach is to use more specific topic filters whenever possible, rather than relying on wildcards. Another approach is to use shared subscriptions, which allow multiple clients to share a single subscription to a topic. This can help reduce the number of subscriptions and messages that the broker must handle. Finally, monitoring the broker’s performance and adjusting its configuration as necessary is important to ensure optimal performance.

For more [best practices on MQTT Topicname and wildcards, see Part 5 of MQTT Essentials.](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices)

### What is Quality of Service (QoS) in MQTT?

We touched upon Quality of Service Level (QoS) of an MQTT message in our [Introducing the MQTT Protocol](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt) article. To refresh, QoS is indicated by a number that ranges from 0 to 2. Each level provides a different level of reliability and assurance for message delivery.

-   **QoS 0 (at most once)**: This level provides no guarantee that a message will be delivered. The message is sent once, and if it is lost or not received by the recipient, it will not be resent.
    
-   **QoS 1 (at least once)**: This level ensures that a message is delivered at least once, but it may be delivered multiple times in the case of network issues or failures.
    
-   **QoS 2 (exactly once)**: This level provides the highest level of assurance for message delivery. The message is guaranteed to be delivered exactly once, but this level requires more communication between the sender and receiver, which can increase latency and network traffic.
    

Choosing the appropriate QoS level depends on the specific use case. For example, QoS 0 might be suitable for non-critical data, while QoS 2 might be necessary for critical data requiring high-reliability levels.

It’s important to note that the QoS level can impact the performance of the broker and network, so it’s recommended to use the appropriate level for the specific use case. For more information, read our article [MQTT Quality of Service (QoS) 0,1, & 2](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels) or other resources such as the [MQTT 5 Essentials](https://www.hivemq.com/mqtt/mqtt-5).

### What is MQTT Retain Flag?

The Retained Flag is an important feature that determines whether the broker saves a message as the last known good value for a specified topic. When the retained flag is set to true, the broker will save the most recent message that matches the specified topic, regardless of whether there are any subscribed clients.

When a new client subscribes to a topic with a retained message, the broker sends the last retained message (on that topic) to the client. This allows clients to receive the most recent and relevant information even if they have not subscribed to that topic before.

It’s important to note that, like many of the other elements, the use of retained messages can also impact the broker’s performance, especially if there are many retained messages. Additionally, if a retained message is updated frequently, it can result in increased network traffic and potentially affect the network’s performance.

For more information on retained messages and how to use MQTT Retain Flag effectively, read [MQTT Retained Messages - MQTT Essentials: Part 8.](https://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages)

### What is MQTT Payload?

The payload is the actual content of the message and can contain any kind of data. MQTT is data-agnostic, meaning it can handle different data types, including images, text in any encoding, encrypted data, and binary data. However, it’s important to note that the payload size can impact network performance and memory usage on the client and broker. Therefore, keeping payloads as small as possible is recommended, especially when publishing messages with a high frequency.

### What is MQTT DUP Flag?

The MQTT DUP Flag indicates that a message is a duplicate and has been resent because the intended recipient (client or broker) did not acknowledge the original message. It is only relevant for messages with QoS greater than 0. When a client or broker receives a message with the DUP flag set, it should ignore the message if it has already received a message with the same message ID. The client or broker should process the message normally if they have not previously received it.

The MQTT protocol (MQTT client library or broker) handles resend and duplicate mechanism automatically, but it’s important to note that this can impact network performance and increase network traffic. For more information on MQTT DUP Flag, read our article [MQTT Quality of Service (QoS) 0,1, & 2 – MQTT Essentials: Part 6.](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels)

### How MQTT brokers handle messages from clients?

When a client publishes a message to an MQTT broker, the broker performs several tasks to ensure the message is delivered according to the QoS level specified by the client. Here’s what happens:

1.  **Message reception**: The broker reads the message sent by the client and verifies its syntax and format.
    
2.  **Acknowledgment**: The broker sends an acknowledgment message to the client to confirm receipt of the message. The level of acknowledgment depends on the QoS level requested by the client.
    
3.  **Processing**: The broker determines which clients have subscribed to the topic of the message and sends a copy of the message to each of them. The broker may also retain the message as the last known good value for that topic, depending on the value of the Retained flag.
    
4.  **Feedback**: The publishing client receives a confirmation message from the broker indicating that the message was published successfully. However, the client does not receive feedback on how many subscribers received the message or whether anyone is interested in it.
    

![How MQTT PUBLISH works](https://www.hivemq.com/sb-assets/f/243938/640x212/074eebb5a6/publish_flow.gif/m/ "How MQTT PUBLISH works")_How MQTT PUBLISH works_

The client that initially publishes the message is only concerned about delivering the PUBLISH message to the broker. Once the broker receives the PUBLISH message, it is the responsibility of the broker to deliver the message to all subscribers. The publishing client does not get any feedback about whether anyone is interested in the published message or how many clients received the message from the broker.

## How to Subscribe to MQTT Topics?

Publishing a message doesn’t make sense if no one ever receives it. This is where subscribing comes into play. Once a client publishes a message to an MQTT broker, the message must be delivered to interested clients. Clients that want to receive messages on topics of interest send a [SUBSCRIBE](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718063) message to the broker. The SUBSCRIBE message is simple and contains a unique packet identifier and a list of subscriptions.

![Example of MQTT SUBSCRIBE Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/683f163f34/subscribe_packet.webp/m/ "Example of MQTT SUBSCRIBE Packet")_Example of MQTT SUBSCRIBE Packet_

**Packet Identifier**: The packet identifier is unique and identifies a message as it flows between the client and broker. The client library or the broker is responsible for setting this internal MQTT identifier.

**List of Subscriptions**: A SUBSCRIBE message can contain multiple subscriptions for a client. Each subscription includes a topic and a QoS level. The topic in the SUBSCRIBE message can contain wildcards that make it possible to subscribe to a topic pattern instead of a specific topic. If there are overlapping subscriptions for one client, the broker delivers the message with the highest QoS level for that topic.

Overall, MQTT allows clients to subscribe to specific topics, receive messages published to those topics, and process the payloads according to their specific use case. The packet identifier and QoS level in the SUBSCRIBE message ensure that messages are delivered reliably and with the appropriate level of quality.

Once a client sends a SUBSCRIBE message with the list of desired topics and QoS levels to an MQTT broker, the broker responds with a SUBACK message that confirms the subscription and indicates the maximum QoS level that the broker will deliver. Let’s look deeper into SUBACK.

## What is MQTT SUBACK?

Once the client sends a SUBSCRIBE message to the broker with the topics and corresponding QoS levels, the broker acknowledges the subscription request by sending a [SUBACK](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718068) message to the client. The SUBACK message confirms the receipt of the SUBSCRIBE message and indicates whether the broker has accepted or rejected each subscription.![Example of MQTT SUBACK Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/be336d46a5/suback_packet.webp/m/ "Example of MQTT SUBACK Packet")_Example of MQTT SUBACK Packet_

**Packet Identifier**: The SUBACK message includes the same packet identifier that the client included in the SUBSCRIBE message, which enables the client to match the acknowledgment to the original request.

**Return Code**: The SUBACK message also includes one return code for each topic/QoS-pair specified in the SUBSCRIBE message. The return codes are binary values that indicate whether the broker has granted or rejected the subscription request for each topic.

The return codes for QoS levels are as follows:

-   **QoS 0**: This means the subscription request has been granted at QoS 0. The broker delivers the messages to the client as soon as they are available and with no quality guarantees.
    
-   **QoS 1**: This means the subscription request has been granted at QoS 1. The broker delivers messages at least once, meaning that the broker sends the message to the client at least one time. The client sends a PUBACK message back to the broker after receiving the message, which acts as an acknowledgment.
    
-   **QoS 2**: This means the subscription request has been granted at QoS 2. The broker delivers messages exactly once, which means that the broker guarantees that the message is delivered once and only once to the client. The client sends a PUBREC message back to the broker after receiving the message, which acts as an acknowledgment. The broker sends a PUBREL message to the client after receiving the PUBREC message, and the client sends a PUBCOMP message to the broker after receiving the PUBREL message.
    

If the broker rejects any of the subscriptions in the SUBSCRIBE message, the SUBACK message contains a failure return code for that specific topic. The reason for the failure could be that the client has insufficient permission to subscribe to the topic, the topic is malformed, or another reason.

The failure return code is represented by 0x80 and indicates that the subscription is not accepted by the broker. This can happen if the client does not have sufficient permission to subscribe to the topic, the topic is malformed, or there is another issue with the subscription request. When a client receives a failure return code, it should retry the subscription with a different topic or QoS level or take appropriate action to address the issue with the subscription request.

![How MQTT SUBSCRIBE, SUBACK, and PUBLISH work](https://www.hivemq.com/sb-assets/f/243938/613x219/759ed3fb1d/subscribe_flow.gif/m/ "How MQTT SUBSCRIBE, SUBACK, and PUBLISH work")_How MQTT SUBSCRIBE, SUBACK, and PUBLISH work_

The SUBACK message is an acknowledgment message from the broker to the client to confirm the subscriptions that have been granted or rejected. The packet identifier enables the client to match the acknowledgment to the original request, while the return codes indicate the QoS levels at which the broker has granted the subscriptions.

After a client has subscribed to topics of interest and received messages published to those topics, it may eventually need to unsubscribe. Let’s now explore the counterpart of the SUBSCRIBE message, the UNSUBSCRIBE message, and the corresponding UNSUBACK message that confirms the unsubscription.

## How to use Unsubscribe in MQTT to Revoke Subscriptions?

In MQTT, clients can unsubscribe from the topics they have subscribed to by sending an [UNSUBSCRIBE](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718072) message to the broker. Similar to SUBSCRIBE, this message includes a packet identifier to uniquely identify it and a list of topics to unsubscribe from.

![Example of MQTT UNSUBSCRIBE Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/5878803e52/unsubscribe_packet.webp/m/ "Example of MQTT UNSUBSCRIBE Packet")_Example of MQTT UNSUBSCRIBE Packet_

**Packet Identifier**: Similar to the SUBSCRIBE message, the packet identifier in the UNSUBSCRIBE message serves as an internal MQTT identifier for message flow between the client and broker. It ensures that the client and broker can keep track of the message and its corresponding acknowledgment messages.

**List of Topics**: The list of topics in the UNSUBSCRIBE message can contain one or multiple topics from which the client wants to unsubscribe. It is not necessary to specify the QoS level since the broker will unsubscribe the topic regardless of the QoS level with which it was originally subscribed.

## What is MQTT Unsuback?

After receiving the UNSUBSCRIBE message, the broker sends an [UNSUBACK](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718077) acknowledgment message to confirm the removal of the client’s subscriptions. This message includes the packet identifier of the UNSUBSCRIBE message and serves as an acknowledgment that the broker has successfully removed the topics from the client’s subscription list.

![Example of MQTT UNSUBACK Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/39093abdcc/unsuback_packet.webp/m/ "Example of MQTT UNSUBACK Packet")_Example of MQTT UNSUBACK Packet_

**Packet Identifier**: The packet identifier in the UNSUBACK message is the same as the one in the corresponding UNSUBSCRIBE message. This ensures that the client can identify the acknowledgment message and correlate it to the original UNSUBSCRIBE message.

**Return Codes**: The UNSUBACK message includes a list of return codes for each topic/QoS-pair that was unsubscribed. A return code of 0 indicates a successful removal, while a return code of 17 indicates an unsuccessful removal due to an invalid or malformed topic. Other return codes may also be specified for different error scenarios.

![How MQTT UNSUBACK Works](https://www.hivemq.com/sb-assets/f/243938/580x201/9769c540db/unsubscribe_flow.gif/m/ "How MQTT UNSUBACK Works")_How MQTT UNSUBACK Works_

After receiving the UNSUBACK from the broker, the client can assume that the subscriptions in the UNSUBSCRIBE message are deleted.

These details provide a comprehensive understanding of how clients can unsubscribe from topics and how brokers confirm the removal of those subscriptions through the UNSUBSCRIBE and UNSUBACK messages, respectively.

## Conclusion

That’s the end of Part 4 of our MQTT Essentials series. Here is a quick recap: MQTT provides a flexible and data-agnostic approach to publishing messages between clients and brokers. By using topics to filter messages, clients can quickly and easily subscribe to the content that interests them. The payload of each message can be customized to meet each client’s specific needs, and MQTT’s support for various data types makes it a versatile solution for many use cases. Additionally, understanding the attributes of a PUBLISH message, such as the QoS level and retain flag, can help clients and brokers ensure that messages are delivered efficiently and reliably.

In our next article, we dig deeper into how [**MQTT topics**](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices) [](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices)are used. We’ll cover topic basics, how to use wildcards, and provide plenty of practical examples.

**Are you enjoying our content? Then sign up for our newsletter below.** Do check out [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) page and [MQTT Glossary](https://www.hivemq.com/mqtt/#glossary) to know all the key MQTT terminologies. Watch the video below that complements the concepts discussed in this article.