When you’re developing an IoT system, choosing the right protocol for your project can be difficult. After all, there are a lot of choices out there, each with their own features and benefits.

That’s why we’ve put together a comparison of IoT protocols specifically for developers. In this guide, we’ll go over the pros and cons of the different options, plus we include an IoT protocol comparison table that’ll help you identify the right option for you.

Let’s get into it.

**_Learn more by reading our_** [**_complete guide to IoT Protocols and Standards for 2022_**](https://www.nabto.com/guide-iot-protocols-standards/)**_._**

## MQTT (Message Queuing Telemetry Transport)

MQTT features a publisher-subscriber messaging model. This model enables simple data flows between different devices.

### The Pros of MQTT

Here are some of the pros of MQTT as an IoT protocol:

### The Pros of MQTT

-   **Very lightweight –** MQTT’s generic design is both basic and lightweight. As a result, it’s able to provide low power consumption for devices. This is ideal for the number of smaller, lower-powered IoT devices that have appeared on the market over the past five years or so.
-   **Ensures message delivery –** MQTT is designed to ensure a high degree of message reliability, even under the worst network conditions. What’s more, you can add further message delivery reliability through assigning one of three different flags (from highest to lowest), otherwise known as quality of service (QoS) levels. Higher levels ensure higher reliability. 
-   **Battery friendly –** MQTT consumes [170 times less energy on 3G networks and 47 times less energy on Wi-Fi networks](https://medium.com/@esperso/7-benefits-of-mqtt-protocol-for-iot-e463f6a97100) than HTTP. As a result, MQTT is considered a suitable IoT protocol if you’re looking to build devices that won’t require you to constantly be changing batteries.

### The Cons of MQTT

Despite some undeniable positives of using MQTT, there are also some clear disadvantages:

### The Cons of MQTT

-   **Doesn’t support streaming –** MQTT doesn’t support streaming of any kind, either audio or video. Therefore, if you’re looking to stream anything in your IoT system, you need to look elsewhere.
-   **Not developer friendly –** This is the biggest red flag when considering what IoT protocol you want to use. If you’re using an MQTT as a protocol to enable remote control of your IoT devices from, say, a smartphone, it’s not developer friendly at all. Asynchronous publish-subscribe mechanisms in conjunction with user interface programming can be very cumbersome. In other words, when you send a command to your IoT device that can potentially take a long time to get a response to, what do you tell the user? Do you make them wait? And if not, how do you inform the user of actions that didn’t go as expected? You can read more about this [here](https://www.nabto.com/mqtt-protocol-iot/).
-   **Latency issues –** While reliability is one of the MQTT’s main strengths, speed and latency are not. If poor latency could have a detrimental effect on your IoT device functions, it’s best to avoid MQTT. Consider a typical use case for IoT in the manufacturing sector. If an individual comes too close to a machine that is currently operating, the action might trigger a proximity alert. The machine should instantly shut off to avoid injuring the person, but what if the machine takes a few seconds to respond? The result could be dangerous.

For more information, read our blog on the [pros and cons of using MQTT](https://www.nabto.com/mqtt-protocol-iot/) in IoT.

## AMQP (Advanced Message Queuing Protocol)

An Advanced Message Queuing Protocol (AMQP) is an open standard application layer IoT protocol.

Developers primarily use it for transactional messages between servers. Therefore, as you can imagine, it’s primarily used in the banking industry. 

### The Pros of AMQP

Here are some of the pros of the AMQP as an IoT protocol.

### The Pros of AMQP

-   **It uses QoS to ensure message delivery** – Much like MQTT, AMQP is very reliable due to the use of QoS to ensure message delivery. 
-   **Adaptable to other IoT standards** – AMQP is flexible and you can adapt it to work alongside various other IoT standards. That being said, it’s not very easy to do so.

### The Cons of AMQP

Despite its high level of security and its adaptability to other standards, there are some drawbacks of the AMQP. 

### The Cons of AMQP

-   **Heaviness –** The AMQP suffers from being extremely heavyweight. As a result, it can’t be used in smaller or lower-powered IoT devices. This is why its use within IoT remains limited and primarily within the banking industry.
-   **Not user friendly –** Unlike HTTP – more on that later – AMQP is not user friendly. This, along with its heavy processing requirements, puts most developers off using it as an IoT protocol.

## HTTP (Hypertext Transfer Protocol)

HTTP gets a lot of criticism within the IoT world – with some seeing it as outdated when compared to the other [IoT protocols and standards](https://www.nabto.com/guide-iot-protocols-standards/) available.

However, it still has its merits for the right IoT device and industry application.

### The Pros of HTTP

### The Pros of HTTP

-   **Advanced addressing –** HTTP uses an advanced scheme of addressing that’s extremely user friendly. It assigns IoT devices IP addresses with recognizable names. This enables them to be easily identified on the web. This is wildly different from the standard IP address, which is just a series of numbers.
-   **Processing power –** HTTP can process extremely large quantities of data. This makes it an invaluable IoT protocol within the world of data-heavy applications like communication or insurance. 
-   **Flexibility –** HTTP has the capability to download extensions or plugins when required, such as Flash players.

### The Cons of HTTP

As mentioned, some IoT developers believe that HTTP is not suitable as an IoT protocol. Here’s why.

### The Cons of HTTP

-   **Data integrity Issues –** There aren’t any [encryption methods](https://www.nabto.com/iot-data-encryption-algorithm-guide/) used natively in HTTP. This makes HTTP insecure and prone to data integrity issues. Using HTTP Secure (HTTPS) solves this problem, but makes the protocol more energy intensive. 
-   **Data privacy concerns –** If a hacker manages to intercept a request, they can view all the content present on the web page. On top of that, they can also gather confidential information being transferred.
-   **Heavy power consumption –** HTTP uses more system resources, which leads to more power consumption. This is the main reason why developers often recommend going with a different protocol.

## HTTP+Nabto

As you can see, as a standalone IoT protocol, HTTP has significant drawbacks – heavy on resources, unencrypted – which can make it inadequate for many projects. However, [by pairing HTTP with Nabto Edge](https://docs.nabto.com/developer/guides/get-started/tunnels/intro.html), you can circumvent some of these issues. 

For example, [Nabto Edge](https://docs.nabto.com/developer/guides/overview/platform-overview.html) allows secure remote access to your existing HTTP service. In turn, the built-in security that Nabto Edge provides protects your data integrity, resolving any data privacy concerns that come with using HTTP alone. Furthermore, Nabto Edge only requires minimal code changes.

## CoAP (Constrained Application Protocol)

Constrained Application Protocol (CoAP) is an application layer protocol. It was designed to address the needs of HTTP-based IoT systems.

As mentioned before, HTTP is often considered too heavy and power hungry for most IoT applications. CoAP has addressed this by using the HTTP model in restrictive devices and network environments. This gives CoAP lower overhead while still enjoying the easy implementation that HTTP has.

### The Pros of CoAP

We’ve already mentioned some of the pros of choosing CoAP, but there’s more to say about this protocol’s advantages. 

### The Pros of CoAP

-   **Low overhead –** As mentioned before, a significant advantage of using a CoAP as an IoT protocol is its low overhead. This means it uses very little power and enables long battery life.
-   **Encryption –** CoAP uses a more lightweight data encryption model than HTTP and MQTT. CoAP can be combined with the highly-secure DTLS (data transport layer security) encryption layer rather than SSL, which is the typical encryption protocol used for HTTP. As a result, CoAP can provide greater data privacy and protection compared to other IoT protocols.

### The Cons of CoAP

However, despite the above advantages, CoAP still has some weaknesses.

### The Cons of CoAP

-   **Message unreliability –** CoAP adds a method to confirm when messages are received. Unfortunately, this does not verify that a message was received in its entirety and decoded properly.
-   **Issues with NAT and firewalls –** CoAP can have issues communicating with Network Address Translation (NAT) devices because the IP can become dynamic (start to change regularly) over time. Plus, CoAP can have trouble getting through firewalls because of its low power constraints. For this reason, CoAP is only really suited to power-constrained devices with a static IP, such as [IoT microcontrollers](https://www.nabto.com/iot-microcontroller-guide/).

## CoAP+Nabto

If you want to improve your experience using CoAP, Nabto Edge supports CoAP using the Nabto Edge Direct protocol. 

What’s the benefit of this? [Nabto Edge](https://docs.nabto.com/developer/guides/overview/platform-overview.html) makes it possible to develop request/response clients via CoAP. However, it also cuts through firewall configurations set up by either peer. This greatly increases message reliability. Also, Nabto Edge packages CoAP with DTLS (authentication, encryption, etc.), so privacy is ensured out of the box. 

[**_Here’s more information on the benefits of a CoAP and Nabto integration and how it works_**](https://docs.nabto.com/developer/guides/get-started/coap/intro.html)

While we’ve made a comparison of IoT protocols, we’re well aware that it can be difficult to decipher which one is better when they’re not stacked up alongside each other.

So, in case all of this was TL;DR, take a look at this IoT protocols comparison table, which compares each protocol’s strengths, weaknesses, and specifications.

|     **Features**      | **MQTT**  | **AMQP** | **HTTP** | **HTTP+Nabto** | **CoAP** | **CoAP+Nabto**  |
|-------------------|-------|------|------|------------|------|-------------|
|     **Transport**     |  **TCP**  |      | **TCP**  |  **UDP+TCP**   | **UDP**  |     **UDP**     |
|    **Low Latency**    |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)    |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |   ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)      |   ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)       |
|  **Messaging Type**   | **Async** | **Sync** | **Sync** |    **Sync**    | **Sync** | **Synchronous** |
|    **Lightweight**    |   ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)    |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |            |      |             |
| **Build-in Security** |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)    |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)      |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)       |
| **Easy to Build on**  |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)    |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |   ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)      |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)       |
|     **Encrypted**     |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)    |      |   ![](https://www.nabto.com/wp-content/uploads/2020/04/No.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)      |   ![](https://www.nabto.com/wp-content/uploads/2021/02/Yes-no-03.png)   |      ![](https://www.nabto.com/wp-content/uploads/2020/04/Yes.png)       |

## Bottom Line

Choosing the right IoT protocol for your next IoT application is crucial. Hopefully, this article provides you with a useful rundown of the pros and cons of each major protocol.

While each protocol has specific limitations, Nabto can help overcome some specific barriers to implementation. 

Therefore, when choosing an IoT protocol – such as HTTP or CoAP – using Nabto Edge on top of these can help you achieve more. 

**_If you want to learn more about_** [**_Nabto Edge_**](https://docs.nabto.com/developer/guides/overview/platform-overview.html) **_– or any of our other IoT solutions –_** [**_get in touch with us today_**](https://www.nabto.com/consultation/)**_._**

## Read Our Other Resources

We’ve published a wide range of IoT resources for our community, including:

-   [A Guide to IoT Protocols & Standards](https://www.nabto.com/guide-iot-protocols-standards/), which provides a complete overview of all the major protocols and standards available
-   [Buying versus building an IoT platform](https://www.nabto.com/build-your-own-iot-platform-versus-buying/), which discusses how to choose the best option for you
-   Our guide on [how to Develop IoT Apps](https://www.nabto.com/how-to-develop-iot-apps/) and what platforms you can use
-   [What is MQTT in IoT and Should You Use It?](https://www.nabto.com/mqtt-protocol-iot/), which provides an overview of MQTT in IoT
-   [MQTT Versus Websocket versus CoAP](https://www.nabto.com/websocket-vs-mqtt-vs-coap/), which provides a comparison of three major protocols when applied to IoT