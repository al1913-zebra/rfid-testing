A retained message is a normal MQTT message with the retained flag set to true. The broker stores the last retained message and the corresponding QoS for that topic. Each client that subscribes to a topic pattern that matches the topic of the retained message receives the retained message immediately after they subscribe. The broker stores only one retained message per topic. Here’s Part 8 of [MQTT Essentials](https://www.hivemq.com/mqtt/), a ten-part blog series on the core features and concepts of the [MQTT protocol](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt), where we will discuss what retained messages are, why you should use them, how to use them, and when to use them.

If you are looking to [understand Persistent Sessions and Clean Sessions,](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages) check out Part 7 of this series, where we explore the topics of persistent sessions. Else, let’s dive in to exploring **retained messages.**

## How are Retained Messages Different from Normal MQTT Messages?

In MQTT, it is important to understand that the publisher of a message cannot guarantee that the subscribing client will receive the message. The publisher’s responsibility lies in ensuring the safe delivery of the message to the broker. Similarly, the subscribing client cannot determine when the publishing client will send a new message related to their subscribed topics. The time interval between messages can vary significantly, ranging from a few seconds to several minutes or even hours. As a result, the subscribing client remains unaware of the current topic status until a new message is published. This is where retained messages play a vital role.

Retained messages provide a solution to the challenge mentioned above. When a client publishes a message with the “retained” flag set to true, the broker retains the message. Consequently, any client subscribing to the corresponding topic will receive the most recent retained message, even if no recent publications have occurred.

**In essence, retained messages offer subscribers a snapshot of the last-known state of a topic, ensuring access to the latest relevant information regardless of publishing frequency.**

## What is the Structure of a Retained Message in MQTT?

An MQTT retained message is a standard message that includes the retained flag set to true, signifying its importance. When a client publishes a retained message, the broker stores it along with the corresponding Quality of Service (QoS) for a specific topic. Subscribing clients immediately receive the retained message when they subscribe to a topic pattern that matches the retained message’s topic.

It is worth noting that the broker retains only one message per topic.

Even if a subscribing client uses wildcards in their topic pattern, they can still receive a retained message that may not be an exact match for the topic.

For instance, if _Client A_ publishes a retained message to `myhome/livingroom/temperature` and later _Client B_ subscribes to `myhome/#`, _Client B_ will receive the retained message for `myhome/livingroom/temperature` immediately after subscribing to `myhome/#`. By recognizing the retained flag set to true, the subscribing client can process the retained messages according to its requirements.

Retained messages are crucial in providing newly-subscribed clients with immediate status updates upon subscribing to a topic, eliminating the need to wait for subsequent updates from publishing clients. Essentially, a retained message represents the last known valid value for a particular topic. It does not necessarily have to be the latest value, but it must be the most recent message with the retained flag set to true.

Something else important to emphasize, retained messages operate independently of [persistent sessions,](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages) which we discussed in Part 7 of the series. Once the broker stores a retained message, there’s only one way to remove it. We will discuss that shortly in an upcoming section.

Now that you understand the structure of retained messages, let’s learn more about managing them.

## How to Send a Retained Message in MQTT?

As a developer, sending a retained message is a straightforward process. To mark a message as retained, all you need to do is set the retained flag of your [MQTT publish message](https://www.hivemq.com/blog/mqtt-essentials-part-4-mqtt-publish-subscribe-unsubscribe) to true. This flag signals the broker to retain the message and make it available to subscribers. The good news is that most MQTT client libraries provide a convenient and user-friendly way to enable this flag, streamlining the process. By leveraging this feature, developers can ensure that critical information persists and remains accessible to subscribers, even if they join the network later or experience temporary connectivity issues. Retained messages offer a powerful mechanism for sharing important data and enabling seamless communication in MQTT-based systems.

## How to Delete Retained Messages in MQTT?

There is only one way to delete the retained message of a topic. To achieve this, simply publish a retained message with a zero-byte payload to the topic where the retained message is stored. When the broker receives this special retained message, it identifies it as a request for deletion and promptly removes the retained message associated with that topic. As a result, new subscribers will no longer receive the previously retained message for that particular topic.

It’s worth noting that in many cases, explicitly deleting retained messages may not be necessary. This is because each new retained message automatically overwrites the previous one for the same topic. Therefore, if you publish a new retained message on a topic, it will replace and supersede any existing retained message, effectively achieving the same outcome as deleting the previous message. This behavior ensures that subscribers receive the most up-to-date and relevant information, eliminating the need for manual deletion in most scenarios.

## Why and When Should You Use Retained Messages?

Retained messages offer valuable benefits in various scenarios, particularly when you need newly-connected subscribers to receive messages promptly without waiting for the next message publication.

This is particularly advantageous for delivering real-time status updates of components or devices on specific topics. For instance, let’s consider the example of a device named device1, whose status is published on the topic “myhome/devices/device1/status”. By utilizing retained messages, new subscribers to this topic instantly receive the device’s status (such as online or offline) immediately after subscribing.

Similarly, this applies to clients that transmit data periodically, such as temperature readings, GPS coordinates, and other relevant information. Without retained messages, newly-subscribed clients would remain unaware of the latest updates between message intervals. By leveraging retained messages, you can seamlessly provide connecting clients with the most recent and accurate value, ensuring they have immediate access to critical information.

## Closing the Loop: The Lasting Impression of Retained Messages in MQTT’s Ecosystem

As you can see, retained messages play a crucial role in MQTT communication by addressing the challenge of uncertain message delivery and providing immediate access to the last-known state of a topic. By enabling the retention of the most recent message on a topic, subscribers can stay informed about the current status, even during periods of inactivity.

Retained messages are beneficial for providing status updates, ensuring newly-subscribed clients receive relevant information without having to wait for the subsequent message publication. By leveraging retained messages, MQTT empowers efficient and reliable communication between clients and brokers, enhancing the overall effectiveness of IoT and messaging applications.

In the next article of [MQTT Essentials](https://www.hivemq.com/mqtt/), we delve into the intricacies of [Last Will and Testament](https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament), understanding its implementation, benefits, and best practices for utilizing this feature effectively.

**Are you enjoying our content? Then sign up for our newsletter below.** Subscribe to our [RSS feed here](https://www.hivemq.com/feed.xml) to stay updated. Do check out [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) and [MQTT Glossary](https://www.hivemq.com/mqtt/) to know all the key MQTT terminologies. Watch the video below that complements the concepts discussed in this article.