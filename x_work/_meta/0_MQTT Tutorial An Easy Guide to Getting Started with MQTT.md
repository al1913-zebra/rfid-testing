## What is MQTT?

[MQTT](https://www.hivemq.com/mqtt/) (formerly short for ‘Message Queuing Telemetry Transport’) is a [publish/subscribe protocol](https://www.hivemq.com/blog/mqtt-essentials-part2-publish-subscribe) designed for connecting IoT devices. It remains the definitive standard for messaging and data exchange in the Internet of Things (IoT) ecosystem. Standardized by OASIS and ISO (ISO/IEC 20922:2016), this lightweight, publish/subscribe protocol provides a scalable and reliable means of connecting devices over the Internet.

Unlike HTTP’s request/response paradigm, MQTT operates in an event-driven manner, allowing messages to be pushed to clients. This architectural approach enables highly scalable solutions by decoupling data producers and data consumers, eliminating dependencies between them. Two key components to establish MQTT connection for publishing and subscribing of the messages are **MQTT Clients** and [**MQTT Broker**](https://www.hivemq.com/blog/mqtt-brokers-beginners-guide) as shown in the diagram below.

![MQTT Publish Subscribe](https://www.hivemq.com/sb-assets/f/243938/1920x1080/d2bbcc60d9/mqtt-overview.webp/m/ "MQTT Publish Subscribe")_MQTT Publish/Subscribe Architecture_

## Benefits of MQTT Protocol

MQTT offers several key benefits:

1.  **Lightweight and efficient**: Requires minimal device resources and network bandwidth
    
2.  **Bidirectional communication**: Enables communication between devices and servers, supporting publishing and subscribing. It also allows broadcasting messages to groups of devices
    
3.  **Scalability**: Supports millions of connected devices in IoT/IIoT systems
    
4.  **Quality of Service (QoS) levels**: Ensures reliable message delivery
    
5.  **Persistent sessions**: Reduces reconnection time over unreliable networks
    
6.  **Security features**: Supports TLS encryption for message confidentiality and authentication protocols for client verification.
    

## From Automotive to Energy: Real-World Applications and Use Cases of MQTT

MQTT finds applications across various industries and domains. It has been adopted by companies such as [BMW](https://www.hivemq.com/case-studies/bmw-mobility-services), [Liberty Global](https://www.hivemq.com/case-studies/liberty-global), [Fortum](https://www.hivemq.com/case-studies/fortum-spring), [Hytera](https://www.hivemq.com/case-studies/hytera), [Awair](https://www.hivemq.com/case-studies/awair), and [Matternet](https://www.hivemq.com/case-studies/matternet), as showcased in [HiveMQ’s customer success stories](https://www.hivemq.com/case-studies/). These companies have successfully leveraged MQTT in automotive, telecommunications, energy, public safety, and connected product domains.

## MQTT Basics and MQTT Architecture Components

At the core of MQTT are [MQTT brokers](https://www.hivemq.com/blog/mqtt-brokers-beginners-guide) and MQTT clients. `The MQTT broker is an intermediary between senders and receivers, dispatching messages to the appropriate recipients. MQTT clients publish messages to the broker, and other clients subscribe to specific topics to receive messages.` Each MQTT message includes a topic, and clients subscribe to topics of their interest. The MQTT broker maintains a subscriber list and uses it to deliver messages to the relevant clients.

An MQTT broker can also buffer messages for disconnected clients, ensuring reliable message delivery even in unreliable network conditions. To achieve this, MQTT supports three different [Quality of Service](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/) (QoS) levels: 0 (at most once), 1 (at least once), and 2 (exactly once).

There are two versions of the MQTT specification: MQTT 3.1.1 and MQTT 5. While most commercial MQTT brokers now support MQTT 5, some IoT-managed cloud services still primarily support MQTT 3.1.1. We [highly recommend using MQTT 5](https://www.hivemq.com/mqtt/mqtt-5) for new IoT deployments due to its enhanced features that focus on robustness and cloud-native scalability.

### MQTT Clients

Many open source clients are available in a variety of programming languages. HiveMQ provides its own MQTT clients through [HiveMQ MQTT Client Libraries](https://www.hivemq.com/mqtt/mqtt-client-library-encyclopedia), which are designed to simplify the deployment and implementation of MQTT clients and offer users top-notch functionality, performance, security, and reliability. Some of the programming languages supported include C#, C++, Java, [Websockets](https://www.hivemq.com/blog/mqtt-essentials-special-mqtt-over-websockets), Python, and more. [Eclipse Paho](https://www.eclipse.org/paho/) also offers MQTT client libraries for languages like C/C++ and Python.

### MQTT Brokers

MQTT Brokers come in various implementations, catering to different needs, such as open-source, commercial, and managed cloud services. HiveMQ offers commercial editions: [HiveMQ Self-Managed](https://www.hivemq.com/products/hivemq-platform). and [HiveMQ Cloud](https://www.hivemq.com/products/mqtt-cloud-broker), a managed cloud MQTT service, and [HiveMQ Community Edition](https://www.hivemq.com/community/open-source), an open-source version. For an extensive list of MQTT brokers, please visit [mqtt.org](https://mqtt.org/).

**If you are looking to find the ideal MQTT broker for your IoT or industry 4.0 use case, read our article** [MQTT Broker Comparison – Which is the Best for Your IoT Application?](https://www.hivemq.com/blog/mqtt-broker-comparison-iot-application/)

## Example Implementation of MQTT

To illustrate how MQTT works, below is a simple example that utilizes HiveMQ Cloud. To test this implementation on a live cluster, [sign-up for HiveMQ Cloud Serverless plan](https://console.hivemq.cloud/?utm_source=hivemq-com&utm_medium=getting-started-post&utm_campaign=cloud&__hstc=184124345.9ec222da250c0a2391a8f1d5693d4452.1616495678251.1681720101806.1681725440885.2625&__hssc=184124345.8.1681725440885&__hsfp=1483712317), which allows you to connect up to 100 IoT devices at no cost. Sign-up without credit card information.

As a first-time user, HiveMQ Cloud seamlessly redirects you to the dedicated “Getting Started” section within the management view of your cluster, ensuring a smooth and hassle-free onboarding experience. To get you started, refer the below use case example that was tested on Java 11. This example serves as a valuable resource to help you get up and running quickly. We’ve also prepared a publicly hosted example in our ready-to-go [Github repository](https://github.com/hivemq/hivemq-examples/tree/master/hivemq-getting-started-hivemq-cloud), along with an example tailored for our public broker.

## MQTT Use Case Example:

### IoT Application Built Using Raspberry Pi, MQTT, and Temperature Sensor

In this example, we explore the connection of a temperature and brightness sensor to a Raspberry Pi, leveraging the power of MQTT to transmit sensor data to a designated MQTT broker effortlessly. Discover how another device, acting as a control center, can effortlessly receive and process the MQTT data, enabling efficient monitoring and control of your IoT ecosystem.

![MQTT Pub/Sub](https://www.hivemq.com/sb-assets/f/243938/1903x535/a2ba12e861/pub-sub-architecture.webp/m/ "MQTT Pub/Sub")_Communication between the sensor client and the control center over MQTT_

### Step 1 - Use the Raspberry Pi as an MQTT Client Connected to Sensors

Let’s begin your MQTT journey by creating a powerful MQTT client to publish sensor data. In this step, we’ll utilize a thermometer, brightness sensor, and the robust HiveMQ Cloud as our MQTT broker. Once you’ve successfully [signed up for HiveMQ Cloud](https://console.hivemq.cloud/?utm_source=hivemq-com&utm_medium=getting-started-post&utm_campaign=cloud), head to the _Details_ section on the _Overview_ tab of your cluster. There, you’ll discover your unique hostname. Copy this hostname and replace it in the code snippet provided below. There you will find your hostname. Copy this hostname to replace it in the example code snippet below.

![HiveMQ Cloud Serverless Cluster Details Overview](https://www.hivemq.com/sb-assets/f/243938/1200x648/7204f89d25/hivemq-cloud-serverless-cluster-overview.webp/m/ "HiveMQ Cloud Serverless Cluster Details Overview")Creating MQTT credentials is essential to establishing a secure connection between your MQTT client and the cluster.

Navigate to the Access Management tab of your HiveMQ Cloud Basic Serverless cluster and define your MQTT credentials. This can be done by defining `Username`, `Password` and assigning specific `Permissions` to those credentials.

![HiveMQ Cloud Cluster Access Management](https://www.hivemq.com/sb-assets/f/243938/1200x527/c8e5e4cfb3/hivemq-cloud-serverless-access-management.webp/m/ "HiveMQ Cloud Cluster Access Management")By default, all available credentials are assigned the publish and subscribe role. The list of the credentials created and their permission are displayed as shown in the screenshot above.  
![HiveMQ Cloud Serverless Access Management's Permission dashboard](https://www.hivemq.com/sb-assets/f/243938/1200x647/1aa103b018/hivemq-cloud-serverless-credentials-permissions.webp/m/ "HiveMQ Cloud Serverless Access Management's Permission dashboard")If you want to change the role assigned to a credential pair, you can do so during creation. To update the role assigned to a credential, delete the existing credential pair and create a new one. To apply the new role to your clients, reconnect them after creating credentials with an updated role. You can also create custom permissions with specific topic filters and assign them to your credentials.

Let’s dive into the exciting world of MQTT with confidence and efficiency. Once you have created your HiveMQ Cloud cluster, copy the hostname as suggested above and replace it in the code snippet.

```java
public class Sensor {

    public static void main(String[] args) throws InterruptedException {
        final String host = "<your_host>"; // use your host-name, it should look like '<alphanumeric>.s2.eu.hivemq.cloud'
        final String username = "<your_username>"; // your credentials
        final String password = "<your_password>";

        // 1. create the client
        final Mqtt5Client client = Mqtt5Client.builder()
                .identifier("sensor-" + getMacAddress()) // use a unique identifier
                .serverHost(host) 
                .automaticReconnectWithDefaultConfig() // the client automatically reconnects
                .serverPort(8883) // this is the port of your cluster, for mqtt it is the default port 8883
                .sslWithDefaultConfig() // establish a secured connection to HiveMQ Cloud using TLS
                .build();


        // 2. connect the client
        client.toBlocking().connectWith()
                .simpleAuth() // using authentication, which is required for a secure connection
                .username(username) // use the username and password you just created
                .password(password.getBytes(StandardCharsets.UTF_8))
                .applySimpleAuth()
                .willPublish() // the last message, before the client disconnects
                    .topic("home/will")
                    .payload("sensor gone".getBytes())
                    .applyWillPublish()
                .send();

        // 3. simulate periodic publishing of sensor data
        while (true) {
            client.toBlocking().publishWith()
                    .topic("home/brightness")
                    .payload(getBrightness())
                    .send();

            TimeUnit.MILLISECONDS.sleep(500);

            client.toBlocking().publishWith()
                    .topic("home/temperature")
                    .payload(getTemperature())
                    .send();

            TimeUnit.MILLISECONDS.sleep(500);
        }
    }
        //4. Simulate Temperature and Brightnes sensor data
    private static byte[] getBrightness() {
        // simulate a brightness sensor with values between 1000lux and 10000lux
        final int brightness = ThreadLocalRandom.current().nextInt(1_000, 10_000);
        return (brightness + "lux").getBytes(StandardCharsets.UTF_8);
    }

    private static byte[] getTemperature() {
        // simulate a temperature sensor with values between 20°C and 30°C
        final int temperature = ThreadLocalRandom.current().nextInt(20, 30);
        return (temperature + "°C").getBytes(StandardCharsets.UTF_8);
    }
}
```

Let’s dissect the code snippet provided above to understand its functionality:

1.  **Creating the MQTT Client**: The code initializes the MQTT client, ensuring a unique identifier is used. An automatic reconnect feature is also enabled to handle potential instability in the sensor’s internet connection.
    
2.  **Establishing Connection to** `"<your_host>"`: The client connects to the specified host. Notably, a “will” message is set, allowing the broker to automatically publish a “sensor gone” notification if the sensor loses its connection.
    
3.  **Periodic Publication of Simulated Sensor Data**: The code periodically publishes simulated brightness and temperature data using the methods _getBrightness()_ and _getTemperature()_ methods, ensuring a steady stream of information for further processing.
    

`With this code snippet, you can confidently create an MQTT client, establish a stable connection, and regularly transmit vital sensor data.`

Now, let’s move on to the next step in our implementation process:

### Step 2 - Implementing the Subscribing Client

In this crucial step, we focus on creating the subscribing client responsible for consuming the values published on the topics `home/temperature` and `home/brightness`.

Implementing the subscribing client enables the reception of sensor data transmitted via MQTT. This functionality allows you to process and utilize the received information for various applications efficiently.

```java
public class ControlCenter {

    public static void main(String[] args) {
        final String host = "<your_host>"; // use your host-name, it should look like '<alphanumeric>.s2.eu.hivemq.cloud'
        final String username = "<your_username>";  // your credentials
        final String password = "<your_password>";

        // 1. create the client
        final Mqtt5Client client = Mqtt5Client.builder()
                .identifier("controlcenter-" + getMacAddress()) // use a unique identifier
                .serverHost(host) 
                .automaticReconnectWithDefaultConfig() // the client automatically reconnects
                .serverPort(8883) // this is the port of your cluster, for mqtt it is the default port 8883
                .sslWithDefaultConfig() // establish a secured connection to HiveMQ Cloud using TLS
                .build();

        // 2. connect the client
        client.toBlocking().connectWith()
                .simpleAuth() // using authentication, which is required for a secure connection
                .username(username) // use the username and password you just created
                .password(password.getBytes(StandardCharsets.UTF_8))
                .applySimpleAuth()
                .cleanStart(false)
                .sessionExpiryInterval(TimeUnit.HOURS.toSeconds(1)) // buffer messages
                .send();

        // 3. subscribe and consume messages
        client.toAsync().subscribeWith()
                .topicFilter("home/#")
                .callback(publish -> {
                    System.out.println("Received message on topic " + publish.getTopic() + ": " +
                            new String(publish.getPayloadAsBytes(), StandardCharsets.UTF_8));
                })
                .send();
    }
}
```

The code snippet above performs the following actions:

1.  Creates an MQTT client instance, similar to the sensor client, with the client ID prefixed as `controlcenter-`.
    
2.  Establishes a connection between the client and the specified host in `<your_host>`. To ensure message buffering when the control center is offline, a session expiry interval of 1 hour is set.
    
3.  Subscribes the client to all topics starting with `home` using the multi-level wildcard `#` in the topic filter. Any incoming messages with their corresponding topic and payload are printed. If the sensor loses connection, the topic `home/will` and the payload “sensor gone” are printed.
    

By implementing both the sensor client and the subscribing client, you can establish a seamless MQTT communication system where sensor data is published and consumed by the control center, enabling efficient monitoring and control of devices.

## Next Steps

Now that you’ve gained a basic understanding of MQTT, congratulations! However, the world of MQTT is vast, and there’s always room for more knowledge. To fuel your ongoing learning journey, we highly recommend exploring these additional resources:

Dive deeper into the MQTT protocol by exploring our resources that offer a wealth of technical details to enhance your understanding.

1.  Take a glance at [MQTT FAQs](https://www.hivemq.com/mqtt/mqtt-faqs) and [MQTT Glossary](https://www.hivemq.com/mqtt/), which provides a concise overview of key MQTT terminologies, allowing you to grasp them quickly and easily.
    
2.  Read the [MQTT Essentials](https://www.hivemq.com/mqtt/) and [MQTT 5 Essentials](https://www.hivemq.com/mqtt/mqtt-5) series of articles to learn more technical details about the protocol.
    
3.  Read our blog, [MQTT Packets: A Comprehensive Guide](https://www.hivemq.com/blog/mqtt-packets-comprehensive-guide), if you are looking to understand MQTT control packets and their structure to design and test MQTT-based systems.
    
4.  For those who prefer a locally-hosted solution, you can explore the evaluation license of our [HiveMQ Platform.](https://www.hivemq.com/products/hivemq-platform) This option allows you to experience the benefits of HiveMQ while running it on your infrastructure.
    
5.  We also have the HiveMQ MQTT Client and the [MQTT CLI](https://github.com/hivemq/mqtt-cli) for easy testing of MQTT systems.
    
6.  To learn how to secure your MQTT communication, read our [MQTT Security Fundamentals](https://www.hivemq.com/mqtt/mqtt-security-fundamentals) series.
    
7.  If you have specific requirements or need guidance regarding MQTT and IoT messaging, feel free to [Contact HiveMQ](https://www.hivemq.com/contact/). Our team of experts has extensive experience in assisting companies with developing reliable and scalable IoT applications. We’ll be more than happy to discuss your unique needs and provide tailored solutions.
    

Remember, MQTT is an exciting and evolving field; there’s always more to explore and discover.

#### Browse the MQTT Series

[MQTT Essentials](https://www.hivemq.com/mqtt/)

[MQTT 5 Essentials](https://www.hivemq.com/mqtt/mqtt-5)

[MQTT Security Fundamentals](https://www.hivemq.com/mqtt/mqtt-security-fundamentals)