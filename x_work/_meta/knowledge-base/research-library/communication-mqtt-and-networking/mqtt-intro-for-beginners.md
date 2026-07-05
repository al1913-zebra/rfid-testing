# An Introduction to MQTT For Complete Beginners

© 2019 by Stephen Cope. All rights reserved.


**Website:** www.steves-internet-guide.com


Every precaution has been taken to ensure that the information presented in this book is
accurate. However, neither the author nor the publisher shall have any liability to any
person or entity with respect to any loss or damage caused or alleged to be caused
directly or indirectly by the information contained within this work.


The information is presented on an “as is” basis, there is no warranty.


## **1 Table of Contents**

**1** **Table of Contents..........................................................................................................................2**


**2** **Preface............................................................................................................................................4**


**3** **An Introduction to MQTT ...........................................................................................................4**


_3.1_ _MQTT Versions .....................................................................................................................4_


_3.2_ _How MQTT Works.................................................................................................................5_
3.2.1 Introductory Video ...........................................................................................................6


_3.3_ _MQTT Client-Broker Connections ........................................................................................6_
3.3.1 MQTT Client Name or Client ID .....................................................................................7
3.3.2 Clean Sessions- What Are They? .....................................................................................8
3.3.3 Last Will Messages...........................................................................................................8


**4** **MQTT Topics................................................................................................................................9**


_4.1_ _The $SYS topic.......................................................................................................................9_


_4.2_ _Subscribing to Topics ..........................................................................................................10_
4.2.1 Examples: -Valid Topic Subscriptions ...........................................................................10
4.2.2 Using Wildcards .............................................................................................................10
4.2.3 Invalid Topic Subscriptions............................................................................................11


_4.3_ _Publishing to Topics............................................................................................................11_
4.3.1 When are Topics Created................................................................................................11
4.3.2 When are Topics Removed from a Broker .....................................................................11
4.3.3 Republishing Topic Data ................................................................................................11


_4.4_ _Common Questions and Answers ........................................................................................12_


**5** **MQTT Publish and Subscribe ...................................................................................................12**


_5.1_ _MQTT Publishing Basics.....................................................................................................12_
5.1.1 Message Flow and QOS on Published Messages ...........................................................13
5.1.2 Publishing Messages and The Retained Message Flag...................................................15
5.1.3 What Happens to Published Messages?..........................................................................15


_5.2_ _Subscribing To Topics.........................................................................................................16_
5.2.1 Publish and Subscribe Questions and Answers ..............................................................16


**6** **MQTT Security...........................................................................................................................17**


_6.1_ _Authentication mechanisms.................................................................................................17_
6.1.1 Client Authentication......................................................................................................17
6.1.2 Client ids.........................................................................................................................17
6.1.3 Username and Password.................................................................................................17
6.1.4 x509 Client Certificates ..................................................................................................18
6.1.5 Restricting Access to topics............................................................................................18


_6.2_ _Securing Data......................................................................................................................18_
6.2.1 TLS Security...................................................................................................................18
6.2.2 Payload Encryption.........................................................................................................19


_6.3_ _Common Questions and Answers ........................................................................................19_


**7** **MQTT Over Websockets............................................................................................................19**


7.1.1 What is Websockets and How Does it Work? ................................................................20
7.1.2 MQTT Over Websockets vs MQTT...............................................................................20


## **2 Preface**

The IOT (Internet of things) is fast becoming a reality and one of the main protocols
of the Internet of things is MQTT.

MQTT will become as important to IOT developers as HTTP is to web developers
and having a working knowledge of MQTT will be crucial in IOT projects.

The aim of this tutorial is to teach you the basics of the MQTT protocol so you
understand what it is and how it works.

## **3 An Introduction to MQTT**


MQTT is a lightweight **publish/subscribe** messaging protocol designed for M2M
(machine to machine) telemetry in low bandwidth environments.


It was designed by Andy Stanford-Clark (IBM) and Arlen Nipper in 1999 for
connecting Oil Pipeline telemetry systems over satellite.


Although it started as a proprietary protocol it was released Royalty free in 2010 and
became an OASIS standard in 2014.


**MQTT** stands for **MQ** Telemetry Transport but previously was known as Message
Queuing Telemetry Transport.


**MQTT** is fast becoming one of the main protocols for **IOT** (internet of things)
deployments.

### **_3.1 MQTT Versions_**


There are two different variants of MQTT and several versions.


  - MQTT v3.1.0 –

  - MQTT v3.1.1 – In Common Use

  - MQTT v5 – Currently Limited use

  - **MQTT-SN**   - See notes later


The original **MQT** T which was designed in 1999 and has been in use for many years
and is designed for **TCP/IP networks** .


MQTTv3.1.1 is version in common use.


There is very little difference between v3.1.0 and 3.1.1.


The latest MQTT version(v5) is not currently (December 2019) in widespread use but
has a lot of new features.


For More Information see MQTT v 5.0 New Features Overview


There is no version four and if you are wondering what happened to 4 then see here.

This tutorial will focus on MQTT v3.1.1 as all of the features in 3.11 are available in
v5 and 3.1.1 is the version currently in widespread use.

### **_3.2 How MQTT Works_**


MQTT is a messaging protocol i.e it was designed for transferring messages, and uses
a publish and subscribe model.


This model makes it possible to send messages to 0,1 or multiple clients.


A useful analogy is TV or radio.


A TV broadcaster broadcasts a TV program using a specific channel and a viewer
tunes into this channel to view the broadcast.


There is no direct connection between the broadcaster and the viewer.


In MQTT a publisher publishes messages on a topic and a subscriber must subscribe
to that topic to view the message.


MQTT **requires the use of a central Broker** as shown in the diagram below:


**Important Points to Note**


1. Clients **do not have addresses** like an email system, and messages are not

sent to clients.
2. Messages are **published to a broker on a topic** .


3. The job of an MQTT broker is to **filter messages** based on topic, and then

**distribute them to subscribers** .
4. A client can receive these messages by subscribing to that topic on the same

broker
5. There is **no direct connection** between a publisher and subscriber.
6. **All clients** can publish (broadcast) and subscribe (receive).
7. MQTT brokers do not normally store messages.

#### **3.2.1 Introductory Video**


This video takes you through the basics of MQTT.

### **_3.3 MQTT Client-Broker Connections_**


MQTT uses **TCP/IP** to connect to the broker.


TCP is a **connection orientated** protocol with error correction and guarantees that
packets are received in order.


You can consider a TCP/IP connection to be **similar to a telephone connection** .


Once a telephone connection is established you can talk over it until **one party hangs**
**up** .


Most MQTT clients will connect to the broker and remain connected even if they
aren’t sending data.


Connections are acknowledged by the broker using a **Connection acknowledgement**
**message** .


You cannot publish or subscribe unless you are connected.


MQTT clients publish a **keepalive message** at regular intervals (usually 60 seconds)
which tells the broker that the client is still connected.

#### **3.3.1 MQTT Client Name or Client ID**


All clients are required to have a **client name** or ID.


The client name is used by the MQTT broker to track subscriptions etc.


Client names **must also be unique.**


If you attempt to connect to an MQTT broker with the same name as an existing client
then the **existing client connection is dropped.**


Because most MQTT clients will **attempt to reconnect** following a disconnect this
can result in a loop of **disconnect and connect.**


The screen shot below show what happens when I try and connect a client to the
broker using the same client id as an existing connected client.


#### **3.3.2 Clean Sessions- What Are They?**

MQTT clients by default establish a clean session with a broker.


A **clean session** is one in which the broker isn’t expected to remember anything about
the client when it disconnects.


With a **non clean session** the broker will **remember client subscriptions** and **may**
**hold** undelivered messages for the client.


However, this depends on the **Quality of service** used when subscribing to topics and
the quality of service used when publishing to those topics.

#### **3.3.3 Last Will Messages**


The idea of the **last will message** is to notify a subscriber that the publisher is
unavailable due to network outage.


The last will message is set by **the publishing client** and is set on a per topic basis
which means that each topic can have its own last will message.


This means that each topic can have its own last will message associated with it.


The message is stored on the broker and sent to any subscribing client (to that topic) if
the connection to the publisher fails.


If the publisher disconnects normally the last Will Message is not sent.


The actual will messages is including with the **connect request message.**


The basic process is.


1. The publisher tells the broker to notify all **subscribers to a topic**, using the

**last will message**, in the event that the connection breaks.
2. If the broker **detects a connection break** it sends the **last will message** to all

subscribers of that topic.


Python Code Snippet

```
lwm="Bulb1 Gone Offline" # Last will message
topic1="bulb1"
print("Setting Last will message=",lwm,"topic is",topic1
)
client.will_set("topic1",lwm,QOS1,retain=False)

### **4 MQTT Topics**

```

MQTT topics are a form of addressing that allows MQTT clients to share information.


MQTT Topics are structured in a hierarchy similar to folders and files in a file system
using the forward slash ( / )as a delimiter.


Using this system you can create a user friendly and self descriptive naming structures
**of you own choosing** .


Topic names are:


  - Case sensitive

  - use UTF-8 strings.

  - Must consist of at least **one character** to be valid.


Except for the **$SYS topic** there is no default or standard topic structure.


That is; there are no **topics** created on a broker by default, except for the **$SYS topic** .


**All topics** are created by a subscribing or publishing client, and they are not
permanent.


A topic only exists if a client has subscribed to it, or a broker has a **retained** or **last**
**will messages** stored for that topic.

### **_4.1 The $SYS topic_**


This is a reserved topic and is used by most MQTT brokers to publish information
about the broker.


They are read-only topics for the MQTT clients. There is no standard for this topic
structure but there is a guideline here that most broker implementations seem to
follow.


I have created a node-red dashboard that monitors the $SYS topic and produces a
display as shown below:


Here is the flow :

### **_4.2 Subscribing to Topics_**


A client can subscribe to individual or multiple topics.


When subscribing to multiple topics two **wildcard** characters can be used. They are:


  - **# (hash character)**   - multi level wildcard

  - **+** **(plus character)** -single level wildcard


**Wildcards** can only be used to **denote a level** or multi-levels i.e /house/# and not as
part of the name to denote multiple characters e.g. hou# **is not valid**

#### **4.2.1 Examples: -Valid Topic Subscriptions**


Single topic subscriptions


  - /

  - /house

  - house/room/main-light

  - house/room/side-light

#### **4.2.2 Using Wildcards**


Subscribing to topic house/#


Covers


  - house/room1/main-light

  - house/room1/alarm

  - house/garage/main-light

  - house/main-door

  - etc


Subscribing to topic house/+/main-light


Covers


  - house/room1/main-light

  - house/room2/main-light

  - house/garage/main-light


but doesn’t cover


  - house/room1/side-light

  - house/room2/side-light

#### **4.2.3 Invalid Topic Subscriptions**


  - house+ – Reason- **no topic level**

  - house# – Reason- **no topic level**

### **_4.3 Publishing to Topics_**


A client can only publish to an individual topic. That is, **using wildcards** when
publishing is not allowed.


E.G- To publish a message to two topics you need to publish the message twice

#### **4.3.1 When are Topics Created**


Topics are created dynamically when:


  - Someone subscribes to a topic

  - Someone publishes a message to a topic with the retained message set to True.

#### **4.3.2 When are Topics Removed from a Broker**


  - When the last client that is subscribing to that broker disconnects, and clean
session is true.

  - When a client connects with clean session set to True.

#### **4.3.3 Republishing Topic Data**


This is likely to be done when changing or combining naming schemes.


The idea is that a client would subscribe to a topic, e.g.


hub1/sensor1 and **republish** the data using a new topic naming of house1/main-light.


**Video :** A Beginners Guide to MQTT Topics

#### **_4.4 Common Questions and Answers_**


**Q-** How do I subscribe to all topics?


**A-** Subscribe to #


**Q-** How Do I subscribe to all **$SYS** topics?


**A-** Subscribe to **$SYS/** #


**Q-** Should I start my Topic hierarchy with a /.


**A-** It is not necessary and just adds another level to the structure.


**Q-** Can I get list of all topics on a broker?


**A-** Not unless you subscribe to all topics and scan them.


**Q-** Can I tell who is subscribed to a topic?


**A** - No


**Q-** How do I discover topics?


A- There is currently no mechanism for that except as described in list all topics.

### **5 MQTT Publish and Subscribe**


In MQTT the process of sending messages is called publishing, and to receive
messages an MQTT client must subscribe to an MQTT topic.

#### **_5.1 MQTT Publishing Basics_**


A client is free to publish on any topic it chooses. Currently there are **no reserved**
**topics** . However brokers can restrict access to topics.


A client can only publish messages to a single topic, and **cannot publish** to a **group**
**of topics** .


However a message can be received by a group of clients if they subscribe to the same
topic.

#### **5.1.1 Message Flow and QOS on Published Messages**


MQTT supports 3 **QOS** (Quality of Service) levels 0,1,2.


  - **QOS -0**   - **Default** and doesn’t guarantee message delivery.

  - **QOS -1**   - Guarantees message delivery but could get duplicates.

  - **QOS -2** -Guarantees message delivery with no duplicates.


A message is published using one of these levels with **QOS level 0** being the **default** .


If you want to try and ensure that the subscriber gets a message even though they
might not be online then you need to publish with a quality of service of 1 or 2.


The schematic below shows the message flow between client and broker for messages
with QOS of 0, 1 and 2.


Messages published with a QOS of 1 and 2 are acknowledged by the server.


This results in several messages being sent.


Messages published with a QOS of 0 require only 1 message and are **not**
**acknowledged** by the server


Published messages with a **QOS** of 1 or 2 also have a **Message ID number** which can
be used to track the message.


#### **5.1.2 Publishing Messages and The Retained Message Flag**

When a client publishes a message to a broker it needs to send:


  - The message topic

  - The message QOS

  - Whether the message should be retained.- **Retain Flag**


The retain Flag is normally **set to False** which means that the broker doesn’t keep the
message.


If you set the retain flag to True then the **last message** received by the broker on that
topic with the **retained flag set** will be kept.


The **QOS** of the published message has no effect on the retained message.


The main use of this is for sensors that don’t change very much, and publish their
status infrequently.


If you have a door sensor, for example, then it doesn’t make much sense publishing
it’s status every second when it is almost always the same.


However, if it only publishes it’s status when it changes what happens when a
subscriber subscribes to the sensor.


In this case if the last status was published without the retain flag set then the
subscriber wouldn’t know the status of the sensor until it published it again.

#### **5.1.3 What Happens to Published Messages?** **5.1.3.1 Questions –**


1 .What happens to the published message after the subscriber receives it?


2. What happens to the published message if there are no subscribers?


To answer these questions just think of a TV or radio broadcast.


If you aren’t tuned into the broadcast you simply miss it!


So for question 1 and question 2 the answer is- The message is deleted from the
broker.


**Explanation**


When a client publishes a message on a topic then the broker will distribute that
message to any connected clients that have **subscribed to that topic** .


Once the message has been sent to those clients it is removed from the broker (see
note below).


If no clients have subscribed to the topic or they aren’t currently connected, then the
message is removed from the broker. (see note)


In general **the broker doesn’t store messages** .


**Note:** Retained messages, persistent connections and QOS levels can result in
messages being stored temporarily on the broker/server.

### **_5.2 Subscribing To Topics_**


To receive messages on a topic you will need to subscribe to the topic or topics.


When you subscribe to a topics you also need to set the QOS of the topic subscription.


The QOS levels and their meaning are the same as those for the published messages.


When you subscribe to a topic or topics you are effectively telling the broker to send
you messages on that topic.


To send messages to a client the broker uses the same publish mechanism as used by
the client.


You can subscribe to multiple topics using two **wildcard** characters (+ and #) as
discussed earlier,


All subscriptions are acknowledged by the broker using a **subscription acknowledge**
**message** that includes a packet identifier that can be used to verify the success of the
subscription.

#### **5.2.1 Publish and Subscribe Questions and Answers**


**Q-** Can I publish and subscribe to the same topic?


**A** - Yes.


**Q-** Can a MQTT broker subscribe to an MQTT client?


**A-** No


**Q-** Will received messages have the same QOS as the QOS of the subscription.


**A-** Not necessarily as it depends on the QOS of the published message.


**Q-** Can I subscribe to messages from a particular client?


**A-** No you can only subscribe to topics.

### **6 MQTT Security**

#### **_6.1 Authentication mechanisms_**


MQTT supports various authentications and data security mechanisms.


It is important to note that these security mechanisms are configured on the MQTT
broker, and it is up to the client to comply with the mechanisms in place.


The mecahnisms discussed here are those provided by the free open source mosquitto
broker.

#### **6.1.1 Client Authentication**


There are three ways that a Mosquitto broker can verify the identity of an MQTT
client:


  - Client ids

  - Usernames and passwords.

  - Client Certificates

#### **6.1.2 Client ids**


All MQTT clients must provide a **client id.**


When a client subscribes to a topic/topics the **client id** links the topic to the client and
to the TCP connection.


With persistent connections the broker remembers the client id and the subscribed
topics.


When configuring an MQTT client you will need to assign a name/id to the client
generally that name is unimportant as long as it is unique.


However the Mosquitto Broker allows you to impose **client id prefix** restrictions on
the client name, and this provides some **basic client security.**


You could,for example, choose a prefix of **C1-** for your **client ids** and so a client with
client id of **C1-python1** would be allowed but a client with id of **python2** would not
be allowed.


You will find this setting in the security settings section of the **mosquitto.conf** file.

#### **6.1.3 Username and Password**


An MQTT broker can require a **valid username and password** from a client before a
connection is permitted.


The username/password combination is transmitted in **clear text** and is **not secure**
without some form of **transport encryption** .


However it does provide an easy way of restricting access to a broker and is probably
the most common form of identification used.


The **username** used for authentication can also used in **restricting access to topics.**


On the Mosquitto broker you need to configure two settings for this to work.


Again you will find these settings in the security section of the **mosquitto.conf** file.


They are **allow_anonymous** and **password_file.**


To require username/password then **allow_anonymous** should be **false** and
**password_file** should contain a valid passwords file **.Example settings**


To create the passwords you will need to use the **mosquiito_passwd** utility that
comes with the Mosquitto broker.

#### **6.1.4 x509 Client Certificates**


This is the most secure method of client authentication but also the most difficult to
implement because you will need to deploy and manage certificates on many clients.


This form of authentication is really only suited to a small number of clients that need
a high level of security.

#### **6.1.5 Restricting Access to topics**


You can control which clients are able to **subscribe and publish** to topics.


The main control mechanism is the **username** . ( **note:** password not required), but you
can also use the **client id** .


Unless you are running an open broker then this type of restriction will be common.

#### **_6.2 Securing Data_**


To protect the contents of your MQTT messages you can use:


  - TLS or SSL Security

  - Payload encryption

#### **6.2.1 TLS Security**


TLS security or as it is more commonly known **SSL security** is the technology that is
used on the web.


This security is part of the **TCP/IP protocol** and not MQTT.


**TLS security** will provide an **encrypted pipe** down which your MQTT messages can
flow.


This will protect all parts of the MQTT message, and not just the message payload.


The problem with this is that it requires client support, and it is unlikely to available
on simple clients.

#### **6.2.2 Payload Encryption**


This is done at the application level and not by the broker. This means that you can
have **encrypted data** without having to configure the broker.


It also means that data is encrypted **end to end** and not just between the broker and
the client.


MQTT is after all a messaging protocol.


However this type of encryption doesn’t protect passwords (if used) on the connection
itself.


Because it doesn’t involve any broker configuration or support this is likely to be a
very popular method of protecting data.

#### **_6.3 Common Questions and Answers_**

Q- Can I use TLS with payload encryption?


**A-** Yes.


**Q- To implement payload encryption do I need certificates?**


**A-** No. You can use **shared keys** which is easier to implement.


**Q- How do I know if the message is genuine and hasn’t been changed?**


**A-** **Digital signatures** are the best way of doing this but they rely on a public/private
key infrastructure and are unlikely to be implemented on constrained clients like
sensors.

### **7 MQTT Over Websockets**


**Websockets** allows you to receive MQTT data directly into a web browser.


This is important as the web browser may become the DE-facto interface for
displaying MQTT data.


MQTT websocket support for web browsers is provided by the **JavaScript client** .

#### **7.1.1 What is Websockets and How Does it Work?**


**WebSocket** is a computer communications protocol, providing **full-duplex**
**communication** channels over a single TCP/IP connection. Wiki


It is closely associated with **http** as it uses **http** for the initial connection
establishment..


The client and server connect using http and then negotiate a connection upgrade to
websockets, the connection then **switches** from http to websockets.


The client and server can now exchange full duplex **binary data** over the connection.

#### **7.1.2 MQTT Over Websockets vs MQTT.**


In the case of **MQTT over Websockets** the websockets connection forms an outer
pipe for the MQTT protocol.


The MQTT broker places the MQTT packet into a websockets packet, and sends it to
the client.


The client unpacks the MQTT packet from the websockets packet and then processes
it as a normal MQTT packet.


This is illustrated in the diagram below:


With MQTT the MQTT Packet is placed directly into the TCP/IP Packet.

#### **7.1.3 MQTT and Mosquitto**


Mosquitto broker as websockets support compiled in and so is useable without any
need for recompiling.


You will need to edit the configuration file to enable support.

#### **7.1.4 MQTT Clients**


The Python client supports web sockets and it is very easy to use.


To tell the client to use websockets instead of MQTT use the command


**client= paho.Client(“control1”,transport=’websockets’)**


instead of simply


**client= paho.Client(“control1”)**


When you create the client object.

However the main use of websockets is for the browser and so you will use the
JavaScript client. I have detailed tutorials here.


#### **_7.2 MQTT Tools_**

Although MQTT is releatively new there are a number of testing tools available.
The ones I use the most are the commnd line tools (mosquitto_sub and
mosquitto_pub) that come with the mosquitto broker.
Another popular tool is MQTTLENS which is a chrome browser add-on and there are
alos several Android App tools.
See the MQTT Tools Page

### **8 Feedback**


This introductory book is in draft and I welcome suggestions on how to improve it.
Please go here and let me know.


