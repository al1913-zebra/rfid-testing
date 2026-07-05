**Key Takeaways from this Blog**

-   QoS 0 (At most once): A "fire and forget" method with no delivery guarantee; best for stable connections and non-critical data.
    
-   QoS 1 (At least once): Guarantees message delivery but may result in duplicates; the most common choice for general IoT reliability.
    
-   QoS 2 (Exactly once): The highest reliability level, ensuring a message is delivered exactly one time via a four-step handshake.
    
-   Negotiation: The final QoS level is determined by the lower of the publisher's defined QoS and the subscriber's requested QoS.
    
-   Efficiency vs. Reliability: Higher QoS levels provide better guarantees but increase network overhead and latency.
    

Here’s Part 6 of [MQTT Essentials](https://www.hivemq.com/mqtt/), where we will look deeper at the different Quality of Service (QoS) levels in MQTT. If you are looking to understand [MQTT Topics, Wildcards, & Best Practices](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices), check out Part 5 of the series. Else, let’s dive in.

## MQTT QoS Meaning: Definition and Importance in IoT Messaging

The term "Quality of Service" in MQTT defines the reliability guarantee level for message delivery between devices. QoS represents a formal agreement between the sender and receiver about how message delivery will be handled and acknowledged. In IoT environments where connectivity can be unpredictable, QoS provides critical mechanisms to ensure that messages reach their destination appropriately, based on their importance. This may involve sacrificing some reliability for speed or ensuring that critical commands are delivered exactly once without duplication.

## What is the Difference Between QoS 0, 1, and 2 in MQTT?

MQTT's Quality of Service framework offers three distinct reliability levels, catering to various IoT use cases that require different levels of reliability based on their specific requirements.

| QoS Level | Guarantee | Handshake Steps | Use Case |
|-----------|---------------|---------------------------------------|-----------------------------------------------|
| QoS 0 | At most once | 1 (Fire and forget) | Frequent, non-critical data (e.g., telemetry) |
| QoS 1 | At least once | 2 (PUBACK) | Critical data where duplicates are acceptable |
| QoS 2 | Exactly once | 4 (PUBLISH, PUBREC, PUBREL, PUBCOMP). | Mission-critical commands (e.g., alarms) |

This tiered approach allows developers to make deliberate tradeoffs between message delivery guarantees, network bandwidth consumption, and processing overhead. By selecting the appropriate QoS level for each message type, IoT applications can optimize their communication patterns—using lightweight QoS 0 for frequent, non-critical data and reserving the more robust QoS 1 and 2 for messages where delivery confirmation is essential.

## MQTT QoS Message Delivery Explained

When discussing QoS in MQTT, it’s important to consider message delivery from the publishing client to the broker and from the broker to the subscribing client. These two aspects of message delivery have subtle differences.

The client that publishes a message to the broker defines the QoS level for the message during transmission. The broker then transmits the message to subscribing clients using the QoS level defined by each subscribing client during the subscription process. If the subscribing client defines a lower QoS level than the publishing client, the broker will transmit the message with the lower QoS level.

Understanding how message delivery works in MQTT sets the foundation for appreciating the significance of Quality of Service (QoS) levels in ensuring reliable communication between the publishing client, broker, and subscribing client.

## Benefits of MQTT QoS for Reliable IoT Communication

Quality of Service (QoS) is crucial in MQTT due to its role in providing the client with the ability to select a service level that aligns with both the network reliability and the application’s requirements. MQTT’s inherent capability to handle message re-transmission and ensure delivery, even in unreliable network conditions, makes QoS essential for facilitating seamless communication in such challenging environments. By offering different QoS levels, MQTT empowers clients to optimize their network usage and achieve the desired balance between reliability and efficiency.

Now that we understand the significance of Quality of Service (QoS) in MQTT, let’s delve into the inner workings of QoS and explore how it operates to ensure reliable message delivery in varying network conditions.

### How does QoS 0 work in MQTT?

At the lowest level, QoS 0 in MQTT offers a best-effort delivery mechanism where the sender does not expect an acknowledgment or guarantee of message delivery. This means that the recipient does not acknowledge receiving the message, and the sender does not store or re-transmit it. QoS 0, commonly called “fire and forget,” functions akin to the underlying TCP protocol, where the message is sent without further follow-up or confirmation.

![Quality of Service level 0: delivery at most once](https://www.hivemq.com/sb-assets/f/243938/1024x360/41d4e98134/qos-levels_qos0.webp/m/ "Quality of Service level 0: delivery at most once")_Quality of Service level 0: delivery at most once_

### How does QoS 1 work in MQTT?

In QoS 1 of MQTT, the focus is on ensuring message delivery at least once to the receiver. When a message is published with QoS 1, the sender keeps a copy of the message until it receives a [PUBACK](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718043) packet from the receiver, confirming the successful receipt. If the sender doesn’t receive the [**PUBACK**](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718043) packet within a reasonable time frame, it re-transmits the message to ensure its delivery.

![Quality of Service level 1: delivery at least once](https://www.hivemq.com/sb-assets/f/243938/1024x360/529ab80be0/qos-levels_qos1.webp/m/ "Quality of Service level 1: delivery at least once")_Quality of Service level 1: delivery at least once_

Upon receiving the message, the receiver can process it immediately. For example, if the receiver is an MQTT broker, it distributes the message to all subscribing clients and responds with a PUBACK packet to acknowledge the receipt of the message.

![MQTT PUBACK packet](https://www.hivemq.com/sb-assets/f/243938/490x291/335995b671/puback_packet.webp/m/ "MQTT PUBACK packet")_MQTT PUBACK packet_

It’s important to note that in QoS 1, if the publishing client sends the same message again, it sets a duplicate (DUP) flag. However, this flag is used for internal purposes and is not processed by the broker or client. Regardless of the DUP flag, the receiver still sends a PUBACK packet to acknowledge the receipt of the message, ensuring the sender is aware of the successful delivery.

This approach of QoS 1 strikes a balance between reliability and efficiency, guaranteeing that the message reaches the receiver at least once while allowing for potential duplicates to be handled appropriately.

If you are looking to understand MQTT control packets and their structure at a granular level in order to design and test MQTT-based systems, read our blog [MQTT Packets: A Comprehensive Guide](https://www.hivemq.com/blog/mqtt-packets-comprehensive-guide). 

#### How does QoS 2 work in MQTT?

QoS 2 offers the highest level of service in MQTT, ensuring that each message is delivered exactly once to the intended recipients. To achieve this, QoS 2 involves a four-part handshake between the sender and receiver.

![MQTT Quality of Service level 2: delivery exactly once](https://www.hivemq.com/sb-assets/f/243938/1024x360/3b314a5496/qos-levels_qos2.webp/m/ "MQTT Quality of Service level 2: delivery exactly once")_MQTT Quality of Service level 2: delivery exactly once_

When a receiver gets a QoS 2 PUBLISH packet from a sender, it processes the publish message accordingly and replies to the sender with a [PUBREC](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718048) packet that acknowledges the PUBLISH packet. If the sender does not get a PUBREC packet from the receiver, it sends the PUBLISH packet again with a duplicate (DUP) flag until it receives an acknowledgment.

![MQTT PUBREC Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/dcb1eb7d0e/pubrec_packet.webp/m/ "MQTT PUBREC Packet")_MQTT PUBREC Packet_

Once the sender receives a PUBREC packet from the receiver, the sender can safely discard the initial PUBLISH packet. The sender stores the PUBREC packet from the receiver and responds with a [PUBREL](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718053) packet, the receiver discards all stored states and replies with a PUBCOMP packet.

![MQTT PUBREL Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/e9cf421ae9/pubrel_packet.webp/m/ "MQTT PUBREL Packet")_MQTT PUBREL Packet_

After the receiver gets the PUBREL packet, it can discard all stored states and answer with a [PUBCOMP](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718058) packet (the same is true when the sender receives the PUBCOMP). Until the receiver completes processing and sends the PUBCOMP packet back to the sender, the receiver stores a reference to the packet identifier of the original PUBLISH packet. This step is important to avoid processing the message a second time.

After the sender receives the PUBCOMP packet, the packet identifier of the published message becomes available for reuse.

![MQTT PUBCOMP Packet](https://www.hivemq.com/sb-assets/f/243938/490x291/04dcb1c8d9/pubcomp_packet.webp/m/ "MQTT PUBCOMP Packet")_MQTT PUBCOMP Packet_

When the QoS 2 flow is complete, both parties are sure that the message is delivered and the sender has confirmation of the delivery.

If a packet gets lost along the way, the sender is responsible to retransmit the message within a reasonable amount of time. This is equally true if the sender is an MQTT client or an [MQTT broker](https://www.hivemq.com/blog/mqtt-brokers-beginners-guide). The recipient has the responsibility to respond to each command message accordingly.

## What are the Key Considerations for QoS in MQTT?

While understanding QoS in MQTT, there are several important aspects to keep in mind:

### Downgrade of QoS

The QoS levels defined by the sender and receiver can differ. The client sending the message to the broker defines the QoS level, while the broker uses the QoS defined by the receiver during subscription. For example, if the sender uses QoS 2 and the receiver subscribes with QoS 1, the broker delivers the message to the receiver with QoS 1. This can result in multiple deliveries of the same message to the receiver.

#### Packet identifiers are unique per client

Packet identifiers used for QoS 1 and 2 are unique between a specific client and a broker within an interaction. However, they are not unique across all clients. Once a flow is complete, the packet identifier becomes available for reuse. This is why the packet identifier does not need to exceed 65535 , as it is unrealistic for a client to send more messages than that without completing an interaction

## MQTT QoS 0,1,2 Best Practices

We are often asked for advice about how to choose the correct QoS level. Selecting the appropriate QoS level depends on your specific use case. Here are some guidelines to help you make an informed decision:

#### Use QoS 0 when:

-   You have a completely or mostly stable connection between sender and receiver. A classic use case for QoS 0 is connecting a test client or a front end application to an MQTT broker over a wired connection.
    
-   You don’t mind if a few messages are lost occasionally. The loss of some messages can be acceptable if the data is not that important or when data is sent at short intervals
    
-   You don’t need message queuing. Messages are only queued for disconnected clients if they have QoS 1 or 2 and a [persistent session](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages).
    

#### Use QoS 1 when:

-   You need to get every message and your use case can handle duplicates. QoS level 1 is the most frequently used service level because it guarantees the message arrives at least once but allows for multiple deliveries. Of course, your application must tolerate duplicates and be able to process them accordingly.
    
-   You can’t bear the overhead of QoS 2. QoS 1 delivers messages much faster than QoS 2.
    

#### Use QoS 2 when:

-   It is critical to your application to receive all messages exactly once. This is often the case if a duplicate delivery can harm application users or subscribing clients. Be aware of the overhead and that the QoS 2 interaction takes more time to complete.
    

## Queuing of QoS 1 and 2 messages

All messages sent with QoS 1 and 2 are queued for offline clients until the client is available again. However, this queuing is only possible if the client has a [persistent session](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages).

## Conclusion

MQTT Quality of Service (QoS) levels offer essential flexibility for IoT applications, allowing developers to make informed trade-offs between reliability and efficiency. QoS 0 provides lightweight "fire and forget" messaging ideal for stable connections, while QoS 1 ensures delivery at least once for important messages where occasional duplicates are acceptable. For critical communications requiring exactly-once delivery, QoS 2's four-step handshake provides the highest guarantee, albeit with additional overhead. By understanding these options and following best practices—using QoS 0 for non-critical frequent updates, QoS 1 for general reliability, and QoS 2 for mission-critical commands—developers can optimize their MQTT implementations for both performance and reliability across various network conditions. Remember that persistent sessions are required for message queuing with QoS 1 and 2, ensuring offline clients receive their messages when they reconnect.

If you are looking to master MQTT QoS, get your copy of [Quality of Service levels: persistent sessions in MQTT.](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages)

[Download the Guide](https://www.hivemq.com/resources/quality-of-service-in-mqtt-the-ultimate-guide)

**Are you enjoying our content? Then sign up for our newsletter below.** Subscribe to our [RSS feed here](https://www.hivemq.com/feed.xml) to stay updated. Do check out [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) and [MQTT Glossary](https://www.hivemq.com/mqtt/) to know all the key MQTT terminologies.