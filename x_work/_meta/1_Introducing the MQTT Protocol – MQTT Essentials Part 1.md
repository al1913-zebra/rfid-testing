[Skip to content](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt/#page-content)

# Introducing the MQTT Protocol – MQTT Essentials: Part 1

2.  [Home](https://www.hivemq.com/)

4.  Introducing the MQTT Protocol – MQTT Essentials: Part 1
    

# Introducing the MQTT Protocol – MQTT Essentials: Part 1

by HiveMQ Team

Feb 9, 2026 28 min read

Welcome to MQTT Essentials: A ten-part series on the MQTT protocol’s core features, concepts, and benefits. In the [MQTT Essentials series](https://www.hivemq.com/mqtt/), we explain the fundamentals of [MQTT](https://www.hivemq.com/blog/how-to-get-started-with-mqtt/) and offer an easily accessible reference guide for users of all kinds. MQTT is an open protocol, and we believe information on how to use it must also be open.

This first article is an introductory guide to the MQTT protocol. It will cover everything you need to know about MQTT basics to get started. We will review the core functionality, key terms, and definitions associated with this technology, its interesting history, and answer the most common questions that arise when learning about this protocol. Whether you are new to MQTT or familiar with this tech, our goal is for you to walk away with a deeper understanding or a renewed sense of respect and intrigue for this technology. We hope that these articles will make it easier for you to understand and implement MQTT quickly and successfully.

First, we’ll explore the basic concepts ([publish/subscribe, client/broker](https://www.hivemq.com/blog/mqtt-essentials-part2-publish-subscribe)) and basic functionality ([Connect, Publish, Subscribe](https://www.hivemq.com/blog/mqtt-essentials-part-3-client-broker-connection-establishment)) of MQTT. Then, we’ll touch upon some of the MQTT features, such as [Quality of Service](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels), [Retained Messages](https://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages), [Persistent Session](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages), [Last Will and Testament](https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament), [Keep Alive](https://www.hivemq.com/blog/mqtt-essentials-part-10-alive-client-take-over), and more.

What you won’t find in the Essentials series is security information. Security is a big topic in MQTT. In fact, it is such an important topic that we have developed a completely separate series about [MQTT security](https://www.hivemq.com/blog/introducing-the-mqtt-security-fundamentals). Now, let’s jump into the basics.

## What is MQTT?

The best way to open up this discussion about MQTT is by sharing the official abstract of the specification:

> “MQTT is a Client Server publish/subscribe messaging transport protocol. It is lightweight, open, simple, and designed so as to be easy to implement. These characteristics make it ideal for use in many situations, including constrained environments such as for communication in Machine to Machine (M2M) and Internet of Things (IoT) contexts where a small code footprint is required and/or network bandwidth is at a premium."
> 
> _Citation from the official_ [_MQTT 3.1.1 specification_](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html)

When MQTT is described as “lightweight,” it means that it has been designed to be simple, efficient, and not resource-intensive. MQTT was created with a focus on sending small amounts of data over unreliable networks with limited bandwidth and connectivity. Compared to other protocols, MQTT has a small code footprint, low overhead, and low power consumption. Due to its minimal packet overhead, MQTT excels when transferring data over the wire compared to protocols like HTTP. This also makes it ideal for use in devices with limited processing power, memory, and battery life, such as sensors and other IoT devices.

MQTT uses a binary message format for communication between clients and brokers. This is in contrast to other protocols that use text-based formats, such as HTTP or SMTP.

The binary format used by MQTT is designed to reduce the size of messages and increase the efficiency of communication. By using a binary format, the protocol can minimize the amount of data that needs to be transmitted and reduce the processing power required to interpret messages. This makes MQTT well-suited for use in low-bandwidth or low-power environments, such as IoT devices with limited resources. It’s also used in enterprise systems, where real-time data communication is necessary.

Another important aspect of the protocol is that MQTT is extremely easy to implement on the client side. Ease of use was a key concern in the development of MQTT and this makes it a perfect fit for constrained devices with limited resources.

MQTT is used extensively in IoT, Industrial IoT (IIoT), and M2M applications.

Here are a few examples:

1.  **Smart homes**: MQTT is used to connect various devices in a smart home, including smart thermostats, light bulbs, security cameras, and other appliances. This allows users to control their home devices remotely using a mobile app.
    
2.  **Industrial automation**: MQTT is used to connect machines and sensors in factories and other industrial settings. This allows for real-time monitoring and control of processes, which can improve efficiency and reduce downtime.
    
3.  **Agriculture**: MQTT is used in precision agriculture to monitor soil moisture levels, weather conditions, and crop growth. This helps farmers optimize irrigation and other crop management practices.
    
4.  **Healthcare**: MQTT is used to connect medical devices and sensors, such as glucose meters and heart rate monitors, to healthcare providers. This allows for remote monitoring of patients, which can improve patient outcomes and reduce healthcare costs.
    
5.  **Transportation**: MQTT is used in connected cars and other transportation systems to enable real-time tracking and monitoring of vehicles. This can improve safety and help optimize traffic flow.
    

Now that we have a general understanding of what MQTT is and its characteristics, let’s dive into its history and how it came to be a popular messaging protocol. We will explore some of the elements and characteristics of MQTT after learning about its origins.

## The Origin of MQTT

In 1999, Andy Stanford-Clark of IBM and Arlen Nipper of Arcom (now Cirrus Link) developed the MQTT protocol to enable minimal battery loss and bandwidth usage when connecting with oil pipelines via satellite. The inventors specified several requirements for the protocol, including:

-   Simple implementation
    
-   Quality of Service data delivery
    
-   Lightweight and bandwidth-efficient
    
-   Data agnostic
    
-   Continuous session awareness
    

These goals are still at the core of MQTT. However, the primary focus of the protocol has changed from proprietary embedded systems to open Internet of Things (IoT) use cases.

Over the next ten years, IBM used the protocol internally until they released MQTT 3.1 as a royalty-free version in 2010. This shift in focus from proprietary embedded systems to open IoT use cases created confusion about the acronym MQTT. While it formerly stood for MQ Telemetry Transport, where MQ referred to the MQ Series, a product IBM developed to support MQ telemetry transport, MQTT is no longer an acronym. It is now simply the name of the protocol.

When Andy and Arlen created this protocol in 1999, they named it after the IBM product. Although many sources label MQTT as a message queue protocol, this is not entirely accurate. While it is possible to queue messages in certain cases, MQTT is not a traditional message queuing solution.

In 2011, IBM contributed MQTT client implementations to the newly founded Paho project of the [Eclipse Foundation](https://www.eclipse.org/), an independent, non-profit corporation that provides a community for open-source software projects. This was a significant development for the protocol because it created a more supportive ecosystem for MQTT. By contributing MQTT client implementations to an open-source project like Paho, IBM allowed developers to access the protocol and build their applications on top of it. This move helped to increase the visibility and adoption of MQTT among the developer community.

In 2012, HiveMQ became acquainted with MQTT and built the first version of their software that same year. In 2013, HiveMQ released their software to the public.

###### ![Timeline of MQTT evolution](https://www.hivemq.com/sb-assets/f/243938/600x1200/dd67e69190/when-was-mqtt-discovered.webp/m/ "Timeline of MQTT evolution")_Timeline of how MQTT evolved and when HiveMQ released an earlier version of its MQTT Broker_

### The Role of OASIS in Standardizing MQTT

In 2014, OASIS announced that it would take over the standardization of MQTT, with the goal of making it an open and vendor-neutral protocol. Founded in 1993 as a non-profit, OASIS (Organization for the Advancement of Structured Information Standards) is an international consortium that develops open standards for the Internet and related technologies.

It has developed numerous important standards for industries such as cloud computing, security, and IoT, including AMQP, SAML, and DocBook. The standardization process took around one year, and on October 29, 2014, MQTT became an officially approved OASIS standard.

OASIS’ involvement in MQTT has been critical to its success as a widely adopted IoT protocol. As a neutral, third-party organization, OASIS ensures that the protocol is maintained as an open standard that can be implemented by anyone without licensing fees or proprietary restrictions.

Additionally, OASIS provides a forum for the community to come together and collaborate on improvements to the protocol, which has resulted in the development of MQTT 5, the latest version of the protocol with new features for improved reliability and scalability.

In March 2019, OASIS ratified the new MQTT 5 specification. This version introduced new features to MQTT that are required for IoT applications deployed on cloud platforms, and cases that require more reliability and error handling to implement mission-critical messaging. To learn more about MQTT 5, please check out our [MQTT 5 Essentials](https://www.hivemq.com/mqtt/mqtt-5) article series.

## Exploring MQTT: Topics, Subscriptions, QoS, Persistent Messaging, and More

### MQTT's Messaging Model: How It Works and Why It Matters for IoT & IIoT

MQTT’s messaging model is based on topics and subscriptions. Topics are strings that messages are published to and subscribed to. Topics are hierarchical and can contain multiple levels separated by slashes, like a file path as shown below.

```bash
myhome/kitchen/smartdishwasher
```

Subscriptions are used to specify which topics a client is interested in receiving messages from.

When a client subscribes to a topic, it is essentially telling the broker that it is interested in receiving messages published to that topic. The broker then keeps track of the subscription and forwards any messages published to that topic to the subscribed client.

###### ![MQTT request response example](https://www.hivemq.com/sb-assets/f/243938/850x350/31f395bf44/request-response-smart-door.gif/m/ "MQTT request response example")_Example: Smart door opening with a mobile device using MQTT_

It’s important to note that a client can subscribe to multiple topics at once, and a topic can have multiple subscribers. This allows for a flexible and scalable messaging system. To learn more, read our article [Publish & Subscribe - MQTT Essentials: Part 2.](https://www.hivemq.com/blog/mqtt-essentials-part2-publish-subscribe)

In addition to topics and subscriptions, MQTT also supports wildcards, which can be used to subscribe to multiple topics that match a certain pattern. The two types of wildcards are the single-level wildcard (+), which matches a single level in a topic, and the multi-level wildcard (#), which matches all levels after the specified level in a topic.

Overall, MQTT’s messaging model provides a flexible and scalable way to publish and subscribe to messages using topics and subscriptions. The use of wildcards adds an additional layer of flexibility, allowing for subscriptions to multiple related topics using a single subscription. To learn more, read our article [MQTT Topics, Wildcards, & Best Practices - MQTT Essentials: Part 5.](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices)

Understanding MQTT’s messaging model is crucial, but equally important is the quality of service (QoS) level that you choose to ensure reliable message delivery.

### Understanding MQTT Quality of Service (QoS) Levels for IoT Applications

MQTT supports three levels of Quality of Service (QoS): QoS 0, QoS 1, and QoS 2. Here is the breakdown of each level:

-   **QoS 0**: This level provides “at most once” delivery, where messages are sent without confirmation and may be lost. This is the lowest level of QoS and is typically used in situations where message loss is acceptable or where the message is not critical. For example, QoS 0 might be appropriate for sending sensor data where occasional data loss would not significantly impact the overall results.
    
-   **QoS 1**: This level provides “at least once” delivery, where messages are confirmed and re-sent if necessary. With QoS 1, the publisher sends the message to the broker and waits for confirmation before proceeding. If the broker does not respond within a set time, the publisher re-sends the message. This level of QoS is typically used in situations where message loss is unacceptable, but message duplication is tolerable. For example, QoS 1 might be appropriate for sending command messages to devices, where a missed command could have serious consequences, but duplicated commands would not.
    
-   **QoS 2**: This level provides “exactly once” delivery, where messages are confirmed and re-sent until they are received exactly once by the subscriber. QoS 2 is the highest level of QoS and is typically used in situations where message loss or duplication is completely unacceptable. With QoS 2, the publisher and broker engage in a two-step confirmation process, where the broker stores the message until it has been received and acknowledged by the subscriber. This level of QoS is typically used for critical messages such as financial transactions or emergency alerts.
    

It’s important to note that higher QoS levels typically require more resources and can result in increased latency and network traffic. As a result, it’s important to choose the appropriate QoS level based on the specific needs of your application. To learn more, read our article [MQTT Quality of Service (QoS) 0,1, & 2 – MQTT Essentials: Part 6.](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels)

In addition to the three levels of Quality of Service, MQTT also supports message persistence, which ensures that messages are not lost in the event of a network or server failure.

### Understanding MQTT Message Persistence for Reliable IoT Communication

Message persistence is an important feature in MQTT. It ensures messages are not lost in the event of a network or server failure. In MQTT, message persistence is achieved by storing messages on the server until they are delivered to the subscriber.

MQTT provides three types of message persistence options:

-   **Non-persistent**: This is the default option in MQTT. In this mode, messages are not stored on the server and are lost if the server or network fails. This mode is suitable for situations where messages are not critical and can be easily regenerated.
    
-   **Queued persistent**: In this mode, messages are stored on the server until they are delivered to the subscriber. If the subscriber is not available, messages are queued until the subscriber reconnects. Queued persistence is useful when the subscriber is not always connected to the network, or if the subscriber needs to receive all messages, even if they are sent when the subscriber is offline.
    
-   **Persistent with acknowledgment**: This mode provides the highest level of message persistence. In this mode, messages are stored on the server until they are delivered to the subscriber, and the subscriber must acknowledge receipt of the message. If the subscriber does not acknowledge receipt, the message is re-sent until the subscriber acknowledges receipt. This mode is useful when it is critical to ensure that messages are received and processed by the subscriber.
    

To configure message persistence in MQTT, the broker software used for handling MQTT connections must support the chosen persistence option. The configuration can be done through the broker’s configuration files or through its web interface.

It is important to note that message persistence comes with a trade-off in terms of performance and storage. The more persistent the messages, the more storage and processing resources are required by the broker. Therefore, it is important to choose the appropriate persistence level based on the specific requirements of the application. To learn more, read our article [Persistent Session and Queuing Messages - MQTT Essentials: Part 7.](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages)

### MQTT Security: Protecting Your IoT Devices from Cyber Attacks

In terms of security, MQTT supports TLS encryption for secure communication between clients and the server. There are several strategies for securing MQTT deployments, such as encrypting communications, implementing strong authentication and access controls, etc. To learn more, read our article [Mitigate IoT Attacks with Key MQTT Security Principles](https://www.hivemq.com/article/mqtt-security-principles-mitigate-iot-attacks/) to understand the strategies for securing MQTT deployments.

MQTT security is a complex topic that is beyond the scope of this article. If you are implementing MQTT in your own application, it is important to consult a security expert and follow best practices for securing your MQTT deployment.

Overall, MQTT’s architecture, messaging model, and features make it a powerful and flexible protocol for IoT and M2M applications. Its lightweight design and support for QoS levels and message persistence make it an ideal choice for constrained devices and networks.

## Conclusion

You now know about MQTT as a lightweight and efficient protocol that has become a popular choice for IoT and M2M applications. With its simple publish/subscribe messaging model, it allows for flexible communication between devices and systems. MQTT’s history shows its evolution from IBM’s need for a reliable messaging protocol to a widely adopted standard that is now maintained by OASIS. We’ve covered MQTT’s features and characteristics, including its QoS levels and security considerations, and explored real-world applications where MQTT is used. That brings us to the end of part 1 in our multi-part series of [MQTT Essentials](https://www.hivemq.com/mqtt/). In part 2, we cover the [publish and subscribe pattern of MQTT](https://www.hivemq.com/blog/mqtt-essentials-part2-publish-subscribe). Subscribe to our [RSS feed here](https://www.hivemq.com/feed.xml) to stay updated. Do check out [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) and [MQTT Glossary](https://www.hivemq.com/mqtt/) to know all the key MQTT terminologies. Watch the video below that complements the concepts discussed in this article.

### Watch the Video

### Watch the Video

Chapters

-   00:00 - Introduction
-   00:24 - Main features of MQTT
-   01:27 - Characteristics of MQTT
-   04:41 - Built on top of TCP
-   06:37 - Announcing Part 3: Publish-Subscribe Pattern

![HiveMQ Team](https://www.hivemq.com/sb-assets/f/243938/48x48/bd9b3af11a/hivemq-bee-logo.svg)

## HiveMQ Team

Team HiveMQ brings together deep expertise in [<u>MQTT</u>](https://www.hivemq.com/mqtt/), Industrial AI, IoT data streaming, [<u>UNS</u>](https://www.hivemq.com/mqtt/unified-namespace-uns-essentials-iiot-industry-40), and Industrial IoT protocols. Follow us for practical deployment guidance, best practices for building a secure, reliable data backbone, and insights into how we are shaping the future of connected industries.

Our mission is to transform industrial data into real-time intelligence, actionable insights, and measurable business outcomes.

Have questions or need support? [<u>Contact us</u>](https://www.hivemq.com/contact/)[.](https://www.hivemq.com/contact/) Our experts are ready to help.

[![HiveMQ logo](https://www.hivemq.com/_app/immutable/assets/hivemq-light.BO4g5wq0.svg)](https://www.hivemq.com/)

[![HiveMQ Reviews](https://b.sf-syn.com/badge_img/3556813/light-default?&variant_id=sf&r=https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt/)](https://sourceforge.net/software/product/HiveMQ/?pk_campaign=badge&pk_source=vendor)

[![Review HiveMQ on G2](https://www.hivemq.com/_app/immutable/assets/review-widget.D0R580zm.png)](https://www.g2.com/contributor/hivemq25-5340bcdd-df24-41a7-ad17-487c6f7f2737?secure%5Bpage_id%5D=hivemq25-5340bcdd-df24-41a7-ad17-487c6f7f2737&secure%5Brewards%5D=true&secure%5Btoken%5D=45a06cf9b888a650c5c3ff38caab614826f4f204b7286b7a975c40445d8ab233 "Write a review of HiveMQ on G2")

Newsletter sign up

By clicking the subscribe button you give your consent to the use of your data according to our [Privacy Policy](https://www.hivemq.com/legal/privacy-policy/). You can withdraw your consent at any time with future effect.