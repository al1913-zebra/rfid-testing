Keep Alive is a feature of the MQTT protocol that allows an MQTT client to maintain its connection with a broker by sending regular control packets called PINGREQ to the broker. Here’s Part 10 of [MQTT Essentials](https://www.hivemq.com/mqtt/), a ten-part blog series on the core features and concepts of the [MQTT protocol](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt), where we focus on Keep Alive feature of MQTT. If you are looking to understand [what is MQTT Last Will and Testament (LWT),](https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament) check out Part 9 of this series. Else, let’s dive into MQTT Keep Alive’s critical role in mobile networks, and in maintaining a robust and efficient MQTT connection.

## What is MQTT Keep Alive and Why It’s Important?

The Keep Alive mechanism in MQTT ensures the connection’s liveliness and provides a way for the broker to detect if a client becomes unresponsive or disconnected.

When a client establishes a connection with an MQTT broker, it negotiates a Keep Alive value, which is a time interval expressed in seconds. The client must send a PINGREQ packet to the broker at least once within this interval to indicate its presence and keep the connection alive. Upon receiving a PINGREQ packet, the broker responds with a PINGRESP packet, confirming that the connection is still active.

Now, let’s establish why the kept alive feature is so important by delving into the issue of half-open TCP connections and how it poses a challenge within MQTT, particularly in mobile networks.

### The Problem of Half-Open TCP Connections in MQTT

The problem of half-open TCP connections arises within [MQTT, which relies on the Transmission Control Protocol (TCP)](https://www.hivemq.com/blog/mqtt-essentials-part-3-client-broker-connection-establishment) to ensure [“reliable, ordered, and error-checked”](http://en.wikipedia.org/wiki/Transmission_Control_Protocol) packet transfer over the internet. Despite TCP’s robustness, there are instances where the synchronization between communicating parties can falter due to crashes or transmission errors.

In TCP, this state of an incomplete connection is referred to as a [half-open connection](http://en.wikipedia.org/wiki/TCP_half-open), where one side of the communication remains unaware of the other side’s failure. The connected side persistently attempts to send messages while eagerly awaiting acknowledgments.

Andy Stanford-Clark, the inventor of the MQTT protocol, highlights that the issue of half-open connections becomes more pronounced in mobile networks. While TCP/IP theoretically notifies users when a socket breaks, practical scenarios, particularly on mobile and satellite links, involve the “faking” of TCP over the air with added headers at each end. This practice can lead to a phenomenon known as a “black hole” TCP session, where the connection appears open but, in reality, discards any transmitted data.

[_Source_](https://groups.google.com/forum/#!msg/mqtt/zRqd8JbY4oM/XrMwlQ5TU0EJ).

## How Does MQTT Keep Alive Work?

To address the challenge of half-open connections and enable continuous assessment of connection status, MQTT incorporates a vital feature called Keep Alive. This mechanism guarantees that the connection between the MQTT broker and client remains active and that both parties know their connection status.

When a client establishes a connection with the broker, it specifies a time interval in seconds known as the Keep Alive duration. This duration sets the maximum allowed time gap during which the broker and client may not exchange any communication. According to the MQTT specification, the Keep Alive interval is defined as follows:

> "The Keep Alive ... is the maximum time interval permitted to elapse between the point at which the Client finishes transmitting one Control Packet and the point it starts sending the next. It is the responsibility of the Client to ensure that the interval between Control Packets being sent does not exceed the Keep Alive value. In the absence of sending any other Control Packets, the Client MUST send a PINGREQ Packet."

As long as messages are transmitted frequently within the Keep Alive interval, there is no need to send an additional message to verify the connection status. However, **if the client remains inactive during the Keep Alive period, it must send a PINGREQ packet to the broker as a confirmation of its availability and to ensure that the broker is still accessible.**

If a client fails to send any messages or a PINGREQ packet within one and a half times the Keep Alive interval, the broker is responsible for disconnecting the client. Likewise, the client should close the connection if it does not receive a response from the broker within a reasonable timeframe.

By employing the Keep Alive mechanism, MQTT enhances connection stability, mitigates the risks associated with half-open connections, and facilitates efficient communication between brokers and clients in various network conditions.

## How Does Keep Alive Ensure Connection Vitality?

Let’s examine the flow of Keep Alive messages to gain a deeper understanding of the Keep Alive mechanism. **The Keep Alive feature utilizes two packets: PINGREQ and PINGRESP.**

#### What is PINGREQ in MQTT Keep Alive?

![What is PINGREQ in MQTT Keep Alive?](https://www.hivemq.com/sb-assets/f/243938/490x291/45491be72f/pingreq.webp/m/ "What is PINGREQ in MQTT Keep Alive?")When a client wants to signal its continued presence and activity to the broker, it sends a PINGREQ packet. This packet is a “heartbeat” message indicating that the client is still alive. If the client has not sent any other type of packet, such as a PUBLISH or SUBSCRIBE packet, it must send a PINGREQ packet to the broker. The client can choose to send a PINGREQ packet at any time to verify the ongoing vitality of the network connection. Notably, the PINGREQ packet does not contain any payload.

#### **What is PINGRESP in MQTT Keep Alive?**

![What is PINGRESP in MQTT Keep Alive?](https://www.hivemq.com/sb-assets/f/243938/490x291/0e07825f98/pingresp.webp/m/ "What is PINGRESP in MQTT Keep Alive?")Upon receiving a PINGREQ packet from a client, the broker is obligated to respond with a PINGRESP packet. The PINGRESP packet serves as an acknowledgment from the broker to the client, confirming its availability and continued connection. Like the PINGREQ packet, the PINGRESP packet does not include a payload.

## How Can I Customize Keep Alive Settings for Optimal Performance?

-   If the broker does not receive a PINGREQ packet or any other packet from a client within the expected time frame, the broker will close the connection and dispatch the [last will and testament message(LWT)](https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament) message if the client has specified one.
    
-   The [MQTT client](https://www.hivemq.com/blog/seven-best-mqtt-client-tools/) is responsible for setting an appropriate keep alive value. For instance, the client can adjust the keep-alive interval based on its current signal strength, optimizing the connection for its specific circumstances.I.
    
-   Importantly, the maximum Keep Alive interval is 18 hours, 12 minutes, and 15 seconds. Conversely, setting the Keep Alive interval to 0 effectively deactivates the Keep Alive mechanism, removing its influence on the connection’s stability and management.
    

## What is Client Take-Over in MQTT?

In the MQTT protocol, when a client becomes disconnected, it typically attempts to reconnect. However, there are instances when the broker still maintains a half-open connection for that client. In such cases, when a client, which the MQTT broker perceives as online, initiates a reconnection and performs a \`client take-over, the broker takes necessary action. It promptly terminates the previous connection associated with the same client (identified by the client identifier) and establishes a fresh connection with the client. This intelligent behavior ensures that half-open connections do not impede the disconnected client from successfully re-establishing its connection. By seamlessly managing client take-over, MQTT guarantees smooth connectivity and resilient communication in the face of intermittent network interruptions.

## Conclusion: Keep Alive and Client Take-Over Enhancing MQTT Performance

The keep alive feature and client take-over mechanism are vital components of MQTT that ensure reliable and efficient communication in various scenarios. By implementing Keep Alive messages through PINGREQ and PINGRESP packets, MQTT enables clients to actively signal their presence and verify network connectivity. This mechanism prevents half-open connections and allows for timely detection of inactive or lost connections.

Furthermore, client take-over facilitates seamless reconnection for disconnected clients. When a client initiates a reconnection, the MQTT broker intelligently closes any existing half-open connection associated with that client and establishes a fresh connection. This process ensures that disconnections do not hinder the client’s ability to regain connectivity and resume communication smoothly.

MQTT clients must set appropriate keep alive values, considering factors such as signal strength and network conditions. This allows for optimal management of the keep alive mechanism and ensures efficient resource utilization.

Understanding the intricacies of the keep alive feature and client take-over in MQTT empowers developers to build robust and resilient MQTT applications. By leveraging these capabilities, MQTT facilitates the creation of reliable, real-time IoT and messaging solutions that thrive even in challenging network environments.

Watch the video below that complements the concepts discussed in this article.

Thank you for joining us on this MQTT journey, and we look forward to continuing to provide valuable insights and resources in the world of MQTT.