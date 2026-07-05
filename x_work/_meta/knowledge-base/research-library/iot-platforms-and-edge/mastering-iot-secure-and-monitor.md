Mastering IOT





Build modern IoT solutions that secure and monitor your IoT infrastructure





Colin Dow

Perry Lea





BIRMINGHAM - MUMBAI





Mastering IOT




Copyright © 2019 Packt Publishing

All rights reserved. No part of this book may be reproduced, stored in a retrieval system, or transmitted in any form or by any means, without the prior written permission of the publisher, except in the case of brief quotations embedded in critical articles or reviews.

Every effort has been made in the preparation of this book to ensure the accuracy of the information presented. However, the information contained in this book is sold without warranty, either express or implied. Neither the authors, nor Packt Publishing or its dealers and distributors, will be held liable for any damages caused or alleged to have been caused directly or indirectly by this book.

Packt Publishing has endeavored to provide trademark information about all of the companies and products mentioned in this book by the appropriate use of capitals. However, Packt Publishing cannot guarantee the accuracy of this information.

First published: April 2019

Production reference: 1150419

Published by Packt Publishing Ltd.

Livery Place

35 Livery Street

Birmingham

B3 2PB, UK.

ISBN 978-1-83864-543-4

www.packtpub.com





mapt.io

Mapt is an online digital library that gives you full access to over 5,000 books and videos, as well as industry leading tools to help you plan your personal development and advance your career. For more information, please visit our website.





Why subscribe?


Spend less time learning and more time coding with practical eBooks and Videos from over 4,000 industry professionals



Improve your learning with Skill Plans built especially for you



Get a free eBook or video every month



Mapt is fully searchable



Copy and paste, print, and bookmark content





Packt.com





Did you know that Packt offers eBook versions of every book published, with PDF and ePub files available? You can upgrade to the eBook version at www.packt.com and as a print book customer, you are entitled to a discount on the eBook copy. Get in touch with us at customercare@packtpub.com for more details.

At www.packt.com, you can also read a collection of free technical articles, sign up for a range of free newsletters, and receive exclusive discounts and offers on Packt books and eBooks.





Contributors





About the authors


Colin Dow is the owner and chief engineer of Sigma Rockets and Aerospace Inc., a model aerospace business. He has enjoyed working with numerous educational facilities and hobbyists in delivering product sales, presentations, and aerospace workshops over the years. Colin has extensive experience of creating website content, educational documentation, and instructional videos. He has been a programmer since early home computers first caught his eye. He has worked as a software developer for some of Canada's largest companies, using technologies, such as Python, Java, J2EE, PHP, Pearl, Ruby on Rails, Apache, and SOAP web services. Colin has extensive experience of creating website content, educational documentation, and instructional videos.



Perry Lea has spent 21 years at Hewlett Packard as a distinguished technologist and chief architect. Then, he served as a member of technical staff and strategic director at Micron Technologies leading a team working on advanced computing devices. Currently, he is a technical director at Cradlepoint where he leads advancement and research in IoT and fog compute. Perry has degrees in computer science, computer engineering, and an EE degree from Columbia University. He is a senior member of IEEE and a senior member and distinguished speaker of ACM. He has 8 patents with 40 pending.





Packt is searching for authors like you





If you're interested in becoming an author for Packt, please visit authors.packtpub.com and apply today. We have worked with thousands of developers and tech professionals, just like you, to help them share their insight with the global tech community. You can make a general application, apply for a specific hot topic that we are recruiting an author for, or submit your own idea.





Table of Contents





Title Page





Copyright



Mastering IOT





About Packt



Why subscribe?





Packt.com





Contributors



About the authors





Packt is searching for authors like you





Preface



Who this book is for





What this book covers





To get the most out of this book



Download the example code files





Download the color images





Conventions used





Get in touch



Reviews





The IoT Story



History of the IoT





IoT potential



Industrial and manufacturing



Industrial and manufacturing&#xA0;IoT use cases and impact





Consumer



Consumer&#xA0;IoT use cases





Retail, financial, and marketing



Retail IoT use cases





Healthcare



Healthcare IoT use cases





Transportation and logistics



Transportation and logistics &#xA0;IoT use cases





Agricultural and environmental



Agricultural and environmental &#xA0;IoT use cases





Energy



Energy IoT use cases





Smart city



Smart city&#xA0;IoT use cases





Government and military



Government and military&#xA0;IoT use cases





Summary





IoT Architecture and Core IoT Modules



IoT ecosystem



IoT versus machine to machine





The value of a network and Metcalfe's and Beckstrom's law





IoT architecture





Role of an architect





Part 1 &#x2013; Sensing and power





Part 2&#xA0;&#x2013; Data communication





Part 3&#xA0;&#x2013; Internet routing and protocols





Part 4&#xA0;&#x2013; Fog and edge compute, analytics, and machine learning





Part 5&#xA0;&#x2013; Threat and security in IoT





Summary





Sensors, Endpoints, and Power Systems



Sensing devices



Thermocouples and temperature sensing



Thermocouples





Resistance Temperature Detectors





Thermistors





Temperature sensor summary





Hall effect sensors and current sensors





Photoelectric sensors





PIR sensors





LiDAR and active sensing systems





MEMS sensors



MEMS accelerometers and gyroscopes





MEMS microphones





MEMS pressure sensors





Smart IoT endpoints



Vision system





Sensor fusion





Input devices



Output devices





Functional examples (putting it all together)



Functional example &#x2013; TI SensorTag CC2650





Sensor to controller





Energy sources and power management



Power management





Energy harvesting



Solar harvesting





Piezo-mechanical harvesting





RF energy harvesting





Thermal harvesting





Energy storage



Energy and power models





Batteries





Supercapacitors





Radioactive power sources





Energy storage summary and other forms of power





Summary





Communications and Information Theory



Communication theory



RF energy and theoretical range





RF interference





Information theory



Bitrate limits and the Shannon-Hartley theorem





Bit error rate





Narrowband versus wideband communication





The radio spectrum



Governing structure





Summary





Non-IP Based WPAN



Wireless personal area network standards



802.15 standards





Bluetooth



Bluetooth history





Bluetooth 5 communication process and topologies





Bluetooth 5 stack





Bluetooth 5 PHY and interference&#xA0;





Bluetooth packet structure





BR/EDR operation





BLE operation





Bluetooth profiles





BR/EDR security





BLE security





Beaconing





Bluetooth 5 range and speed enhancement





Bluetooth&#xA0; mesh introduction





Bluetooth mesh topology





Bluetooth mesh addressing modes





Bluetooth&#xA0; mesh provisioning





IEEE 802.15.4



IEEE 802.15.4 architecture





IEEE 802.15.4 topology





IEEE 802.15.4 address modes and packet structure





IEEE 802.15.4 start-up sequence





IEEE 802.15.4 security





Zigbee



Zigbee history





Zigbee overview





Zigbee PHY and MAC (and difference from IEEE 802.15.4)





Zigbee protocol stack





Zigbee addressing and packet structure





Zigbee mesh routing





Zigbee association





Zigbee security





Z-Wave



Z-Wave overview





Z-Wave protocol stack





Z-Wave addressing





Z-Wave topology and routing





Summary





IP-Based WPAN and WLAN



Internet protocol and&#xA0;transmission control protocol



IP role in IoT





WPAN with IP &#x2013; 6LoWPAN



6LoWPAN topology





6LoWPAN protocol stack





Mesh addressing and routing





Header compression and fragmentation





Neighbor discovery





6LoWPAN security





WPAN with IP &#x2013; Thread



Thread architecture and topology





Thread protocol stack





Thread routing





Thread addressing





Neighbor discovery





IEEE 802.11 protocols and WLAN



IEEE 802.11 suite of protocols and comparison





IEEE 802.11 architecture





IEEE 802.11 spectrum allocation





IEEE 802.11 modulation and encoding techniques





IEEE 802.11 MIMO





IEEE 802.11 packet structure





IEEE 802.11 operation





IEEE 802.11 security





IEEE 802.11ac





IEEE 802.11p vehicle-to-vehicle





IEEE 802.11ah





Summary





Long-Range Communication Systems and Protocols (WAN)



Cellular connectivity



Governance models and standards





Cellular access technologies





3GPP user equipment categories





4G-LTE spectrum allocation and bands





4G-LTE topology and architecture





4G-LTE E-UTRAN protocol stack





4G-LTE geographical areas, dataflow, and handover procedures





4G-LTE packet structure





Cat 0, Cat 1, Cat M1, and NB-IoT



LTE Cat-0





LTE Cat-1





LTE Cat-M1 (eMTC)





LTE Cat-NB





5G





LoRa and LoRaWAN



LoRa physical layer





LoRaWAN MAC layer





LoRaWAN topology





LoRaWAN summary





Sigfox



Sigfox physical layer





Sigfox MAC layer





Sigfox protocol stack





Sigfox topology





Summary





Routers and Gateways



Routing functions



Gateway functions





Routing





Failover and out-of-band management





VLAN





VPN





Traffic shaping and QoS





Security functions





Metrics and analytics





Edge processing





Software-Defined Networking



SDN architecture





Traditional internetworking&#xA0;





SDN benefits





Summary





IoT Security



Cyber security vernacular



Attack and threat terms





Defense terms





Anatomy of IoT cyber attacks



Mirai





Stuxnet





Chain Reaction





Physical and hardware security



Root of Trust





Key management and trusted platform modules





Processor and memory space





Storage security





Physical security





Cryptography



Symmetric cryptography





Asymmetric cryptography





Cryptographic hash (authentication and signing)





Public Key Infrastructure&#xA0;





Network stack &#x2013; Transport Layer Security





Software defined perimeter



Software-Defined Perimeter architecture





Blockchains and cryptocurrencies in IoT



Bitcoin (blockchain-based)





IOTA (directed acyclical graph-based)





Government regulations and intervention



US Congressional Bill &#x2013;Internet of Things (IoT) Cybersecurity Improvement Act of 2017





Other governmental bodies





IoT security best practices



Holistic security





Security checklist





Summary





Installing Raspbian on the Raspberry Pi



A brief history of the Raspberry Pi





A look at operating systems for the Raspberry Pi





Project overview





Getting started





Installing the Raspbian OS



Formatting a microSD card for Raspbian





Copying the NOOBS files to the microSD RAM





Running the installer





A quick overview of the Raspbian OS



The Chromium web browser





The home folder





The Terminal





Mathematica





Sonic Pi





Scratch and Scratch 2.0





LibreOffice





Summary





Writing Python Programs Using Raspberry Pi



Project overview





Technical requirements





Python tools for Raspberry Pi



The Terminal





Integrated Development and Learning Environment





Thonny





Using the Python command line





Writing a simple Python program



Creating the class





Creating the object





Using the object inspector





Testing your class





Making the code flexible



Example one





Example two





Summary





Using the GPIO to Connect to the Outside World



Project overview





Technical requirements





Python libraries for the Raspberry Pi



picamera





Pillow&#xA0;





sense-hat and sense-emu





Accessing Raspberry Pi's GPIO



Pibrella





RPi.GPIO





GPIO zero





Setting up the circuit



Fritzing





Building our circuit





Hello LED



Blink LED using gpiozero





Morse code weather data





Summary





Subscribing to Web Services



Prerequisites





Project overview





Getting started





Cloud services for IoT



Amazon Web Services IoT





IBM Watson platform





Google Cloud platform





Microsoft Azure





Weather Underground





A basic Python program to pull data from the cloud



Accessing the web service





Using the Sense HAT Emulator





Summary





Controlling a Servo with Python



Knowledge required to complete this chapter





Project overview





Getting started





Wiring up a servo motor to the Raspberry Pi



Stepper motors





DC motors





Servo motors





Connecting the servo motor to our Raspberry Pi





Control the servo through the command line





Write a Python program to control the servo





Summary





Working with the Servo Control Code to Control an Analog Device



Knowledge required to complete this chapter





Project overview





Getting started





Accessing weather data from the cloud





Controlling the servo using weather data



Correcting for servo range





Changing the position of the servo based on weather data





Enhancing our project



Printing out the main graphic





Adding the needle and LED





Summary





Setting Up a Raspberry Pi Web Server



Knowledge required to complete this chapter





Project overview





Getting started





Introducing CherryPy &#x2013;&#xA0;a minimalist Python web framework



What is CherryPy?



Who uses CherryPy?





Installing CherryPy





Creating a simple web page using CherryPy



Hello Raspberry Pi!





Say hello to myFriend





What about static pages?





HTML weather dashboard





Summary





Reading Raspberry Pi GPIO Sensor Data Using Python



Project overview





Getting started





Reading the state of a button



Using GPIO Zero with a button





Using the Sense HAT emulator and GPIO Zero button together





Toggling an LED with a long button press





Reading the state from an infrared motion sensor



What is a PIR sensor?





Using the GPIO Zero buzzer class





Building a basic alarm system





Modifying Hello LED using infrared sensor



Configuring a distance sensor





Taking Hello LED to another level





Summary





Building a Home Security Dashboard



Knowledge required to complete this chapter





Project overview





Getting started





Creating our dashboard using CherryPy



Using the DHT11 to find temperature and humidity





Using the Pi camera to take a photo





Creating our dashboard using CherryPy





Displaying sensory data on our dashboard



Home security dashboard with a temperature sensor





Home security dashboard with quick response





Summary





Publishing to Web Services



Project overview





Getting started





Publishing sensory data to cloud-based services



Install the MQTT library





Set up an account and create a device





Reading sensory data and publishing to ThingsBoard





Creating a dashboard in ThingsBoard





Sharing your dashboard with a friend





Setting up an account for text message transmission



Setting up a Twilio account





Installing Twilio on our Raspberry Pi





Sending a text through Twilio





Creating a new home security dashboard





Summary





Creating a Doorbell Button Using Bluetooth



Project overview





Getting started





Introducing Blue Dot



Installing the bluedot library on the Raspberry Pi





Pairing Blue Dot with your Raspberry Pi





Wiring up our circuit



What is an RGB LED?





Testing our RGB LED





Completing our doorbell circuit&#xA0;





Reading our button state using Bluetooth and Python



Reading button information using Python





Creating a Bluetooth doorbell





Creating a secret Bluetooth doorbell





Summary





Enhancing Our IoT Doorbell



Project overview





Getting started





Sending a text message when someone is at the door



Creating a simple doorbell application with text messaging





Creating a secret doorbell application with text messaging





Summary





Introducing the Raspberry Pi Robot Car



The parts of the robot car





Building the robot car



Step 1 &#x2013; Adafruit 16-Channel PWM/Servo HAT for Raspberry Pi





Step 2 &#x2013; Wiring up the motors





Step 3 &#x2013; Assembling the servo camera mount





Step 4 &#x2013;&#xA0;Attaching the head





Step 5 &#x2013; Assembling the DC motor plate





Step 6 &#x2013; Attaching the motors and wheels





Step 7 &#x2013; Wiring up the motors





Step 8 &#x2013; Attaching the camera mount, Raspberry Pi, and Adafruit servo board





Step 9 &#x2013;&#xA0;Attaching the buzzer and voltage divider





Step 10 &#x2013; Wiring up T.A.R.A.S





Learning how to control the robot car



Configuring our Raspberry Pi





Python library for Adafruit Servo HAT





Summary





Controlling the Robot Car Using Python



Knowledge required to complete this chapter





Project overview





Getting started





Taking a look at the Python code



Controlling the drive wheels of the robot car





Moving the servos on the robot car





Taking a picture





Making a beep noise





Making the LEDs blink





Modifying the robot car Python code



Move the wheels





Move the head





Make sounds





Enhancing the code



Stitching our code together





Summary





Connecting Sensory Inputs from the Robot Car to the Web



Knowledge required to complete this chapter





Project overview





Getting started





Identifying the sensor on the robot car



Taking a closer look at the HC-SR04





Reading robot car sensory data with Python





Publishing robot car sensory data to the cloud





Create a ThingsBoard device





Summary





Controlling the Robot Car with Web Service Calls



Knowledge required to complete this chapter





Project overview





Technical requirements





Reading the robot car's data from the cloud



Changing the look of the distance gauge





Changing the range on the distance gauge





Viewing the dashboard outside of your account





Using a Python program to control a robot car through the cloud



Adding a switch to our dashboard





Controlling the green LED on T.A.R.A.S





Using the internet to make T.A.R.A.S dance





Summary





Building the JavaScript Client



Project overview





Getting started





Introducing JavaScript cloud libraries



Google Cloud





AWS SDK for JavaScript





Eclipse Paho JavaScript client





Connecting to cloud services using JavaScript



Setting up a CloudMQTT account





Setting up an MQTT Broker instance





Writing the JavaScript client code





Running the code





Understanding the JavaScript code





Publishing MQTT messages from our Raspberry Pi





Summary





Putting It All Together



Project overview





Getting started





Building a JavaScript client to connect to our Raspberry Pi



Writing the HTML code





Writing the JavaScript code to communicate with our MQTT Broker





Creating a JavaScript client to access our robot car's sensory data



Writing the code for T.A.R.A.S





Livestreaming videos from T.A.R.A.S





Enhancing our JavaScript client to control our robot car



Nipple.js





HTML5 Gamepad API





Johnny-Five





Summary





Other Books You May Enjoy



Leave a review - let other readers know what you think





Preface


The Internet of Things (IoT) is the fastest growing technology market. Industries are embracing IoT technologies to improve operational expenses, product life, and people's well-being.

We’ll begin our journey with an introduction to Raspberry Pi and quickly jump right into Python programming. We’ll learn all concepts through multiple projects, and then reinforce our learnings by creating an IoT robot car. We’ll examine modern sensor systems and focus on what their power and functionality can bring to our system. We’ll also gain insight into cloud and fog architectures, including the OpenFog standards. The Learning Path will conclude by discussing three forms of prevalent attacks and ways to improve the security of our IoT infrastructure.

By the end of this Learning Path, we will have traversed the entire spectrum of technologies needed to build a successful IoT system, and will have the confidence to build, secure, and monitor our IoT infrastructure.





This Learning Path includes content from the following Packt products:

Internet of Things Programming Projects by Colin Dow

Internet of Things for Architects by Perry Lea





Who this book is for





This Learning Path is designed for developers, architects, and system designers who are interested in building exciting projects with Python by understanding the IoT ecosphere, various technologies, and tradeoffs. Technologists and technology managers who want to develop a broad view of IoT architecture, will also find this Learning Path useful. Prior programming knowledge of Python is a must.





What this book covers


Chapter 1, The IoT Story, introduces us to the growth, the importance, and the impact of the IoT from a narrative and historical perspective. We will also learn of use cases in various areas including industrial IoT, smart cities, transportation, and healthcare.

Chapter 2, IoT Architecture and Core IoT Modules, presents the overall picture of the combination of technologies covered in this book. Each segment has a purpose and can unknowingly affect each other. This is an important chapter for an architect to under the “big picture” of inter-related technologies. This chapter also explores the ways to place a value on IoT.

Chapter 3, Sensors, Endpoints, and Power Systems, explores billions of edge endpoints and sensor technologies that will be placed on the internet. Fundamentals of sensor designs, architectures, and power systems are taught.

Chapter 4, Communications and Information Theory, will review important material on the dynamics and mathematical models that define communication systems important to IoT. We will understand the theory behind architectural decisions in selecting the proper forms of telecommunication.

Chapter 5, Non-IP-Based WPAN, discusses all the major non-IP-based protocols and technologies at the IoT Edge. This chapter includes a deep review of the new Bluetooth 5 architecture, Zigbee, Z-Wave, and mesh topologies for sensor networks.

Chapter 6, IP-Based WPAN and WLAN, will complete the near-range communication with a treatment of IP-based communication, including 6LoWPAN, Thread, and IEEE 802.11 standards. This chapter also details new 802.11 protocols such as 802.11p for vehicular communication and 802.11ah for IoT.

Chapter 7, Long-Range Communication Systems and Protocols (WAN), covers wide area network and long-range communication transport data from things to the cloud. This chapter covers in detail all the cellular LTE standards, LoRaWAN, Sigfox, as well as new LTE narrowband and 5G architectures.

Chapter 8, Routers and Gateways, discusses the importance of edge routing and gateway functions. This chapter explores routing systems, gateway functions, VPNs, VLANs, and traffic shaping, and it covers software-defined networking.

Chapter 9, IoT Security, covers security from a holistic view for every IoT component covered in this book. We will understand the theory and architecture of protocol, hardware, software-defined perimeter, and block-chain security.

Chapter 10, Installing Raspbian on the Raspberry Pi, sets us off on our Raspberry Pi IoT journey by installing the Raspbian OS on our Raspberry Pi. We will then take a look at some of the programs that come pre-installed with Raspbian.

Chapter 11, Writing Python Programs Using Raspberry Pi, covers how Windows, macOS, and Linux are operating systems that are familiar to developers. Many a book on developing the Raspberry Pi involves using one of these operating systems and accessing the Raspberry Pi remotely. We will take a different approach in this book. We will use our Raspberry Pi as a development machine. In this chapter, we will get our feet wet with using the Raspberry Pi as a development machine.

Chapter 12, Using the GPIO to Connect to the Outside World, explains how, if the Raspberry Pi was just a $35 computer, that would be enough for many of us. However, the real power behind the Raspberry Pi is the ability of the developer to access the outside world through the use of the General Purpose Input Output (GPIO) pins. In this chapter, we will delve into the GPIO and start to connect the Raspberry Pi to the real world. We will create a Morse code generator for our project using an outside LED and then use this generator to blink out simulated weather information.

Chapter 13, Subscribing to Web Services, explores a few web services offered by some of the biggest companies in the world. Our project will use the virtual version of the Raspberry Pi Sense HAT as a ticker to display current weather information from the Yahoo! Weather web service.

Chapter 14, Controlling a Servo with Python, introduces the concept of creating an analog meter needle using a servo motor connected to the Raspberry Pi.

Chapter 15, Working with the Servo Control Code to Control an Analog Device, continues the theme of working with servo motors as we build our first real IoT device, a weather dashboard. Not only will this weather dashboard feature an analog needle; it will use the needle to point to a picture of a suggested wardrobe based on the weather conditions.

Chapter 16, Setting Up a Raspberry Pi Web Server, goes into how to install and configure the web framework CherryPy. We will conclude the chapter by building a local website that displays weather information.

Chapter 17, Reading Raspberry Pi GPIO Sensor Data Using Python, covers how to read the state of a button before moving on to a PIR sensor and distance sensor. We will conclude the chapter by building simple alarm systems.

Chapter 18, Building a Home Security Dashboard, explains how to build a home security dashboard using the Raspberry Pi as a web server serving up HTML content containing sensory data collected from the GPIO.

Chapter 19, Publishing to Web Services, goes into how to measure room temperature and humidity and publish these values to the web through the use of an IoT dashboard. We will also set up and run a text messaging alert using the service Twilio.

Chapter 20, Creating a Doorbell Button Using Bluetooth, turns our focus to using Bluetooth in this chapter. Bluetooth is a wireless technology that allows for transmission of data over short distances. For our project we will explore the BlueDot app from the Android Play Store. We will use this app to build a simple Bluetooth connected doorbell.

Chapter 21, Enhancing Our IoT Doorbell, will take the simple doorbell we created in Chapter 20, Creating a Doorbell Button Using Bluetooth, and turn it into an IoT doorbell using the knowledge we learned in Chapter 19, Publishing to Web Services.

Chapter 22, Introducing the Raspberry Pi Robot Car, starts us off on our journey into the IoT robot car by introducing This Amazing Raspberry-Pi Automated Security Agent (T.A.R.A.S). This chapter will begin by outlining the components we need to build

T.A.R.A.S and then we will proceed to putting it all together.

Chapter 23, Controlling the Robot Car Using Python, goes into how to write Python code for our robot car. We will utilize the GPIO Zero library to make the car wheels move forward, move the servo motors holding the camera, and light up the LEDs at the back of the robot car.

Chapter 24, Connecting Sensory Inputs from the Robot Car to the Web, helps us understand that in order to turn our robot car into a true IoT device we have to connect it to the internet. In this chapter, we will connect the distance sensor from our robot car to the internet.

Chapter 25, Controlling the Robot Car with Web Service Calls, continues to turn our robot car into an Internet of Things device by taking a deeper look at the internet dashboard we created for the robot car.

Chapter 26, Building the JavaScript Client, moves our attention away from Python, switching our focus to JavaScript instead. We will use JavaScript to build a web-based client that communicates over the internet using the MQTT protocol.

Chapter 27, Putting It All Together, covers how we will connect our robot car, T.A.R.A.S, to a JavaScript client, and control it over the internet using the MQTT protocol.





To get the most out of this book





There are several examples of hardware design and coding examples in this book. Most of the coding examples are pseudo-code based on Python syntax. Having familiarity with some foundational calculus, information theory, electrical properties, and computer science can only help us gain a deeper insight into IoT from an architectural perspective. To get the most out of this book, you should have a Raspberry Pi Computer, preferably a 2015 model or newer and basic electronic components. You have a basic familiarity with electronic components and how to use a breadboard.





Download the example code files


You can download the example code files for this book from your account at www.packt.com. If you purchased this book elsewhere, you can visit www.packt.com/support and register to have the files emailed directly to you.

You can download the code files by following these steps:

Log in or register at www.packt.com.

Select the SUPPORT tab.

Click on Code Downloads & Errata.

Enter the name of the book in the Search box and follow the onscreen instructions.



Once the file is downloaded, please make sure that you unzip or extract the folder using the latest version of:

WinRAR/7-Zip for Windows

Zipeg/iZip/UnRarX for Mac

7-Zip/PeaZip for Linux





The code bundle for the book is also hosted on GitHub at https://github.com/PacktPublishing/Mastering-IOT. In case there's an update to the code, it will be updated on the existing GitHub repository.

We also have other code bundles from our rich catalog of books and videos available at https://github.com/PacktPublishing/. Check them out!





Download the color images


We also provide a PDF file that has color images of the screenshots/diagrams used in this book. You can download it here: https://www.packtpub.com/sites/default/files/downloads/9781838645434_ColorImages.pdf.





Conventions used


There are a number of text conventions used throughout this book.

CodeInText: Indicates code words in text, database table names, folder names, filenames, file extensions, pathnames, dummy URLs, user input, and Twitter handles. Here is an example: "It's a good idea to run both of these commands right after installing Raspbian using the sudo command."

A block of code is set as follows:

from time import sleep

import Adafruit_DHT

import paho.mqtt.client as mqtt

import json

Any command-line input or output is written as follows:

pip3 install weather-api

Bold: Indicates a new term, an important word, or words that you see onscreen. For example, words in menus or dialog boxes appear in the text like this. Here is an example: "In the previous screenshot, we clicked on the Language option."



Warnings or important notes appear like this.

Tips and tricks appear like this.





Get in touch


Feedback from our readers is always welcome.

General feedback: If you have questions about any aspect of this book, mention the book title in the subject of your message and email us at customercare@packtpub.com.

Errata: Although we have taken every care to ensure the accuracy of our content, mistakes do happen. If you have found a mistake in this book, we would be grateful if you would report this to us. Please visit www.packt.com/submit-errata, selecting your book, clicking on the Errata Submission Form link, and entering the details.

Piracy: If you come across any illegal copies of our works in any form on the Internet, we would be grateful if you would provide us with the location address or website name. Please contact us at copyright@packt.com with a link to the material.

If you are interested in becoming an author: If there is a topic that you have expertise in and you are interested in either writing or contributing to a book, please visit authors.packtpub.com.





Reviews





Please leave a review. Once you have read and used this book, why not leave a review on the site that you purchased it from? Potential readers can then see and use your unbiased opinion to make purchase decisions, we at Packt can understand what you think about our products, and our authors can see your feedback on their book. Thank you!

For more information about Packt, please visit packt.com.





The IoT Story


You wake up Tuesday, May 17, 2022, around 6:30 AM PST, as you always do. You never really needed an alarm clock, you are one of those types with some form of physiological clock. Immediately after, your eyes open to a fantastic sunny morning as it's approaching 70° C outside. You will take part in a day that will be completely different than the morning of Wednesday, May 17, 2017. Everything about your day, your lifestyle, your health, your finances, your work, your commute, even your parking spot will be different. Everything about the world you live in will be different: energy, healthcare, farming, manufacturing, logistics, mass transit, environment, security, shopping, and even clothing. This is the impact of connecting ordinary objects to the Internet, or the Internet of Things (IoT). I think a better analogy is the Internet of Everything.

Before you even awakened, a lot has happened in the IoT that surrounds you. Your sleep behavior has been monitored by a sleep sensor or smart pillow. Data was sent to an IoT gateway and then streamed to a cloud service you use for free that reports to a dashboard on your phone. You don't need an alarm clock, but if you had another 5 A.M. flight you would set it—again, controlled by a cloud agent using if this, then that (IFTTT) protocol. Your dual zone furnace is connected to a different cloud provider and is on your home 802.11 Wi-Fi, as are your smoke alarms, doorbell, irrigation systems, garage door, surveillance cameras, and security system. Your dog is chipped with a proximity sensor using an energy harvesting source that lets him open the doggy door and tell you where he is.

You don't really have a PC anymore. You certainly have a tablet-style computer and a smartphone as your central creation device, but your world is based on using VR/AR Goggles since the screen is so much better and larger. You do have a fog computing gateway in your closet. It's connected to a 5G service provider to get you on the Internet and WAN because wired connections don't work for your lifestyle—you are mobile, connected, and online no matter where you are, and 5G and your favorite carrier make sure your experience is great in a hotel room in Miami or your home in Boise, Idaho. The gateway also performs a lot of actions in your home for you, such as processing video streams from those webcams to detect if there's been a fall or an accident in the house. The security system is being scanned for anomalies (strange noises, possible water leaks, lights being left on, your dog chewing on the furniture again). The edge node also acts as your home hub, backing up your phone daily because you have a tendency to break them, and serves as your private cloud even though you know nothing about cloud services.

You ride your bike to the office. Your bike jersey uses printable sensors, and monitors your heart rate and temperature. That data is streamed over Bluetooth Low Energy to your smartphone simultaneously while you listen to Bluetooth audio streamed from your phone to your Bluetooth earphones. On the way there, you pass several billboards all displaying video and real-time ads. You stop at your local coffee shop and there is a digital signage display out front calling you out by name and asking if you want the last thing you ordered yesterday: a 12 oz Americano with room for cream. It did this by a beacon and gateway recognizing your presence within 5 feet and approaching the display. You select yes, of course. Most people arrive at work via their car and are directed to the optimal parking space via smart sensors in each parking slot. You, of course, get the optimal parking space right out front with the rest of the cyclists.

Your office is part of a green energy program. Corporate mandated policies on a zero-emission office space. Each room has proximity sensors to detect not only if a room is occupied, but who is in the room. Your name badge to get in the office is a beaconing device on a 10-year battery. Your presence is known once you enter the door. Lights, HVAC, automated shades, ceiling fans, even digital signage is connected. A central fog node monitors all the building information and syncs it to a cloud host. A rules engine has been implemented to make real-time decisions based on occupancy, time of day, and the season of the year, as well as inside and outside temperatures. Environmental conditions are ramped up or down to maximize energy utilization. There are even sensors on the main breakers listening to the patterns of energy and making a decision on the fog nodes if there are strange patterns of energy usage that need examination.

It does all this with several real-time streaming edge analytics and machine learning algorithms that have been trained on the cloud and pushed to the edge. The office hosts a 5G small cell to communicate externally to the upstream carrier, but they also host a number of small-cell gateways internally to focus signals within the confines of the building. The internal 5G acts as a LAN as well.

Your phone and tablet have switched to the internal 5G signal, and you switch on your software-defined network overlay and are instantly on the corporate LAN. Your smartphone does a lot of work for you; it is essentially your personal gateway to your own personal area network surrounding your body. You drop into your first meeting today, but your co-worker isn't there and arrives a few minutes late. He apologizes, but explains his drive to work was eventful. His newer car informed the manufacturer of a pattern of anomalies in the compressor and turbocharger. The manufacturer was immediately informed of this and called the owner to inform him that the vehicle has a 70 percent chance of having a failed turbo within two days of his typical commute. They scheduled an appointment with the dealership, and have the new parts arriving to fix the compressor. This saved him considerable cost in replacing the turbo and a lot of aggravation.

For lunch, the team decides to go out to a new fish taco place downtown. A group of four of you manage your way into a coupe more comfortable for two than four and make your way. Unfortunately, you'll have to park in one of the more expensive parking structures. Parking rates are dynamic and follow a supply and demand basis. Because of some events and how full the lots are, the rates doubled even for mid-day Tuesday. On the bright side, the same systems raising the parking fees also inform your car and smartphone exactly which lots and which space to drive to. You punch in the fish taco address, the lot and capacity pop up, and you reserve a spot before you arrive. The car approaches the gate, which identifies your phone signature and opens up. You drive to the spot and the application registers with the parking cloud that you are in the right spot over the correct sensor.

That afternoon, you need to go to the manufacturing site on the other side of town. It's a typical factory environment: several injection molding machines, pick-and-place devices, packaging machines, and all the supporting infrastructure. Recently, the quality of the product has been slipping. The final product has joint connection problems and is cosmetically inferior to last month's lot. After arriving at the site, you talk to the manager and inspect the site. Everything appears normal, but the quality certainly has been marginalized. The two of you meet and bring up the dashboards of the factory floor.

The system uses a number of sensors (vibration, temperature, speed, vision, and tracking beacons) to monitor the floor. The data is accumulated and visualized in real time. There are a number of predictive maintenance algorithms watching the various devices for signs of wear and error. That information is streamed to the equipment manufacturer and your team as well. The logs and trend analysis didn't pick up any abnormal behavior, and had been trained by your best experts. This looks like the type of problem that would turn hours into weeks and force the best and brightest in your organization to attend expensive daily SWOT team meetings. However, you have a lot of data. All the data from the factory floor is preserved in a long-term storage database. There was a cost to that service, and at first it was difficult to justify, but you think it may have paid for itself a thousandfold. Taking all that historical data through a complex event processor and analytics package, you quickly develop a set of rules that model the quality of your failing parts. Working backward to the events that led to the failures, you realize it is not a point failure, but several aspects:

The internal temperature of the working space rose 2° C to conserve energy for the summer months

The assembly slowed down output by 1.5 percent of due to supply issues

One of the molding machines was nearing a predictive maintenance period and the temperature and assembly speed pushed its failing case over the predicted value



You found the issue, and retrained the predictive maintenance models with the new parameters to catch this case in the future. Overall, not a bad day at work.

While this fictional case may or may not be true, it's pretty close to reality today. The IoT is defined by Wikipedia: https://en.wikipedia.org/wiki/Internet_of_things as The Internet of things (IoT) is the inter-networking of physical devices, vehicles (also referred to as "connected devices" and "smart devices"), buildings, and other items embedded with electronics, software, sensors, actuators, and network connectivity which enable these objects to collect and exchange data.





History of the IoT


The term IoT can most likely be attributed to Kevin Ashton in 1997 with his work at Proctor and Gamble using RFID tags to manage supply chains. The work brought him to MIT in 1999 where he and a group of like-minded individuals started the Auto-ID center research consortium (for more information, visit http://www.smithsonianmag.com/innovation/kevin-ashton-describes-the-internet-of-things-180953749/). Since then, IoT has taken off from simple RFID tags to an ecosystem and industry that by 2020 will cannibalize, create, or displace five trillion out of one hundred trillion global GDP dollars, or 6% of the world GDP. The concept of things being connected to the Internet up through 2012 was primarily connected smartphones, tablets, PCs, and laptops. Essentially, things that first functioned in all respects as a computer. Since the humble beginnings of the Internet starting with ARPANET in 1969, most of the technologies surrounding the IoT didn't exist. Up to the year 2000, most devices that were associated with the Internet were, as stated, computers of various sizes. The following timeline shows the slow progress in connecting things to the Internet:

Year

Device

Reference



1973

Mario W. Cardullo receives the patent for first RFID tag

US Patent US 3713148 A



1982

Carnegie Mellon internet-connected soda machine

https://www.cs.cmu.edu/~coke/history_long.txt

1989

Internet-connected toaster at Interop '89

IEEE Consumer Electronics Magazine (Volume: 6, Issue: 1, Jan. 2017)



1991

HP introduces HP LaserJet IIISi: first Ethernet-connected network printer

http://hpmuseum.net/display_item.php?hw=350



1993

Internet-connected coffee pot at University of Cambridge (first internet-connected camera)

https://www.cl.cam.ac.uk/coffee/qsf/coffee.html



1996

General Motors OnStar (2001 remote diagnostics)

https://en.wikipedia.org/wiki/OnStar



1998

Bluetooth SIG formed

https://www.bluetooth.com/about-us/our-history

1999

LG Internet Digital DIOS refrigerator

https://www.telecompaper.com/news/lg-unveils-internetready-refrigerator--221266

2000

First instances of Cooltown concept of pervasive computing everywhere: HP Labs, a system of computing and communication technologies that, combined, create a web-connected experience for people, places, and objects

https://www.youtube.com/watch?v=U2AkkuIVV-I

2001

First Bluetooth product launched: KDDI Bluetooth-enabled mobile phone

http://edition.cnn.com/2001/BUSINESS/asia/04/17/tokyo.kddibluetooth/index.html

2005

United Nation's International Telecommunications Union report predicting the rise of IoT for the first time

http://www.itu.int/osg/spu/publications/internetofthings/InternetofThings_summary.pdf

2008

IPSO Alliance formed to promote IP on objects, first IoT-focused alliance

https://www.ipso-alliance.org

2010

The concept of Smart Lighting formed after success in developing solid-state LED light bulbs

https://www.bu.edu/smartlighting/files/2010/01/BobK.pdf

2014

Apple creates iBeacon protocol for beacons

https://support.apple.com/en-us/HT202880



Certainly, the term IoT has generated a lot of interest and hype. One can easily see that from a buzzword standpoint, the number of patents issued (https://www.uspto.gov) has grown exponentially since 2010. The number of Google searches (https://trends.google.com/trends/) and IEEE peer-reviewed paper publications hit the knee of the curve in 2013:



Analysis of keyword searches for IoT, patents, and technical publications





IoT potential


The IoT will touch nearly every segment in industrial, enterprise, health, and consumer products. It is important to understand the impact, as well as why these disparate industries will be forced to change in the way they build products and provide services. Perhaps your role as an architect forces you to focus on one particular segment; however, it is helpful to understand the overlap with other use cases.

As previously mentioned, there is an opinion that the impact of IoT-related industries, services, and trade will affect three percent (The route to a trillion devices, ARM Ltd 2017: https://community.arm.com/cfs-file/__key/telligent-evolution-components-attachments/01-1996-00-00-00-01-30-09/ARM-_2D00_-The-route-to-a-trillion-devices-_2D00_-June-2017.pdf) to four percent (The Internet of Things: Mapping Value Beyond the Hype, McKinsey and Company 2015: https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/McKinsey%20Digital/Our%20Insights/The%20Internet%20of%20Things%20The%20value%20of%20digitizing%20the%20physical%20world/Unlocking_the_potential_of_the_Internet_of_Things_Executive_summary.ashx) of global GDP by 2020 (extrapolated). Global GDP for 2016 was $75.64 trillion dollars, with an estimate that by 2020 it will rise to $81.5 trillion. That provides a range of value from IoT solutions of $2.4 trillion to about $4.9 trillion.

The scale of connected objects is unprecedented. Speculation of industry growth is imperiled with risks. To help normalize the impact, we look at several research firms and reports on the number of connected objects by the year 2020. The range is large, but still in the same order of magnitude. The average of these 10 analyst forecasts is about 33.4 billion connected things by 2020-2021. ARM recently conducted a study and forecast that by 2035 one trillion connected devices will be operational. By all accounts, the projects growth rate in the near term is about 20 percent year over year.



Different analyst and industry claims on the number of connected things

These numbers should impress the reader. For example, if we took a very conservative stance and predict that only 20 billion newly connected devices will be deployed (excluding the traditional computing and mobile products), we would be saying that 211 new Internet connected objects will come online every second.

Why this is of significance to the technology industry and IT sector is the fact that world population currently has a growth rate of roughly 0.9 percent to 1.09 percent per year (https://esa.un.org/unpd/wpp/). World population growth rate peaked in 1962 at 2.6 percent year over year, and has steadily been declining due to a number of factors. First and foremost, improvement in world GDP and economies has a propensity to reduce birth rates. Other factors include wars and famine. That growth implies that human-connected objects will plateau and machine to machine and connected objects will be represent the majority of devices connected to the internet. This is important because the IT industry applies value to a network not necessarily by how much data is consumed, but by how many connections there are. This, generally speaking, is Metcalfe's law, and we will talk about that later in this book. It is also worth noting that after the first public website went live at CERN in 1990, it took 15 years to reach 1 billion people on Earth over the Internet. IoT is looking to add 6 billion connected devices per year. This, of course, is swaying the industry:



The disparity between human population growth versus connected thing growth.The trend has been a 20 percent growth of connected objects versus a nearly flat 0.9 percent human growth. Humans will no longer drive network and IT capacity.

It should be noted that economic impact is not solely revenue generation. The impact from IoT or any technology comes in the form of:

New revenue streams (green energy solutions)

Reducing costs (in-home patient healthcare)

Reducing time to market (factory automation)

Improving supply chain logistics (asset tracking)

Reducing production loss (theft, spoilage of perishable)

Increasing productivity (machine learning and data analytics)

Cannibalization (Nest replacing traditional thermostats)



In our discussion throughout this book, it should be at the top of our minds as to what value an IoT solution delivers. If it is simply a new gadget, there will be a limited market scope. Only when the foreseeable benefit outweighs the cost will an industry thrive. Generally speaking, the target used should be a 5x improvement over a traditional technology. That has been my goal in the IT industry. When considering the cost of change, training, acquisition, support, and so on, a 5x differential is a fair rule of thumb.

We now detail the sectors of industry and how IoT will affect them.





Industrial and manufacturing





Industrial IoT (IIoT) is one of the fastest and largest segments in the overall IoT space by the number of connected things and the value those services bring to manufacturing and factory automation. This segment has traditionally been the world of operations technology (OT). This involves hardware and software tools to monitor physical devices. Traditional information technology roles have been administered differently than OT roles. OT will be concerned with yield metrics, uptime, real-time data collection and response, and systems safety. The IT role will concentrate on security, groupings, data delivery, and services. As the IoT becomes prevalent in industry and manufacturing, these worlds will combine especially with predictive maintenance from thousands of factory and production machines to deliver an unprecedented amount of data to private and public cloud infrastructure.

Some of the characteristics of this segment include the need to provide near real-time or at real-time decisions for OT. This means latency is a major issue for IoT on a factory floor. Additionally, downtime and security are a top concern. This implies the need for redundancy, and possibly private cloud networks and data storage. The industrial segment is one of the fastest-growing markets. One nuance of this industry is the reliance of brownfield technology, meaning hardware and software interfaces that are not mainstream. It is often the case that 30-year-old production machines rely on RS485 serial interfaces rather than modern wireless mesh fabrics.





Industrial and manufacturing IoT use cases and impact





Following are the industrial and manufacturing IoT use cases and their impact:





Preventative maintenance on new and pre-existing factory machinery

Throughput increase through real-time demand

Energy savings

Safety systems such as thermal sensing, pressure sensing, and gas leaks

Factory floor expert systems





Consumer


Consumer-based devices were one of the first segments to adopt things being connected on the internet. Consumer IoT came into form as a connected coffee pot at a university in the 1990s. It flourished with the adoption of Bluetooth for consumer use in the early 2000s. Now millions of homes that have Nest thermostats, Hue lightbulbs, Alexa assistants, and Roku set-top boxes. People too are connected with Fitbits and other wearable technology. The consumer market is usually first to adopt these new technologies. We can also think of these as gadgets. All are neatly packaged and wrapped devices that are essentially plug and play.

One of the constraints in the consumer market is the bifurcation of standards. We see, for example, several WPAN protocols have a footing like Bluetooth, Zigbee, and Z-wave (all being non-interoperable).

This segment also has common traits in the healthcare market, with wearable devices and home health monitors. We keep them separate for this discussion, and healthcare will grow beyond simple connected home health devices (for example, beyond the functionality of a Fitbit).





Consumer IoT use cases


The following are some of the consumer IoT use cases:

Smart home gadgetry: Smart irrigation, smart garage doors, smart locks, smart lights, smart thermostats, and smart security.

Wearables: Health and movement trackers, smart clothing/wearables.

Pets: Pet location systems, smart dog doors.





Retail, financial, and marketing





This category refers to any space where consumer-based commerce transacts. This can be a brick and mortar store or a pop-up kiosk. Additionally, this category refers to why we include financial institutions and marketing fields in this area. These include traditional banking services and insurers, but also leisure and hospitality services. Retail IoT impact is already in process, with the goal of lowering sales costs and improving customer experience. This is done with a myriad of IoT tools. For simplicity in this book, we also add advertising and marketing to this category.

This segment measures value in immediate financial transactions. If the IoT solution is not providing that response, its investment must be scrutinized. This drives constraints on finding new ways to either save costs, or drive revenue. Allowing customers to be more efficient allows retailers and service industries to move customers quickly, and to do so with less staffing resources.





Retail IoT use cases





Some of the retail IoT use cases are as follows:





Targeted advertising, such as locating known or potential customers by proximity and providing sales information.

Beaconing, such as proximity sensing customers, traffic patterns, and inter-arrival times as marketing analytics.

Asset tracking, such as inventory control, loss control, and supply chain optimizations.

Cold storage monitoring, such as analyze cold storage of perishable inventory. Apply predictive analytics to food supply.

Insurance tracking of assets.

Insurance risk measurement of drivers.

Digital signage within retail, hospitality, or citywide.

Beaconing systems within entertainment venues, conferences, concerts, amusement parks, and museums.





Healthcare





The healthcare industry will contend with industrial and logistics for the top spot in revenue and impact on IoT. Any and all systems that improve the quality of life and reduce health costs is a top concern in nearly every developed country. The IoT is poised to allow for remote and flexible monitoring of patients wherever they may be. Advanced analytics and machine learning tools will observe patients in order to diagnose illness and prescribe treatments. Such systems will also be the watchdogs in the event of needed life-critical care. Currently, there are about 500 million wearable health monitors, with double-digit growth in the years to come.

The constraints on healthcare systems are significant. From HIPAA compliance to the security of data, IoT systems need to act like hospital quality tools and equipment. Field systems need to communicate with healthcare centers 24/7, reliably and with zero downtime if the patient is being monitored at home. Systems may need to be on a hospital network while monitoring a patient in an emergency vehicle.





Healthcare IoT use cases


Some of the healthcare IoT use cases are as follows:

In-home patient care

Learning models of predictive and preventative healthcare

Dementia and elderly care and tracking

Hospital equipment and supply asset tracking

Pharmaceutical tracking and security

Remote field medicine

Drug research

Patient fall indicators





Transportation and logistics





Transportation and logistics will be significant, if not the leading driver in IoT. The use cases involve tracking the asset on devices being delivered, transported, or shipped, whether that's on a truck, train, plane, or boat. This is also the area of connected vehicles that communicate to offer assistance to the driver, or preventative maintenance on behalf of the driver. Right now, an average vehicle purchased new off a lot will have about 100 sensors. That number will double as vehicle-to-vehicle communication, vehicle-to-road communication, and automated driving become must-have features for safety or comfort. This has important roles beyond consumer vehicles, and extends to rail lines and shipping fleets that cannot absorb any downtime. We will also see service trucks that can track assets within a service vehicle. Some of the use cases can be very simple, but also very costly, such as monitoring the location of service vehicles in the delivery of stock. Systems are needed to automatically route trucks and service personnel to locations based on demand versus routine.

This mobile-type category has the requirement of geolocation awareness. Much of this comes from GPS navigation. From an IoT perspective, the data analyzed would include assets and time, but also spatial coordinates.





Transportation and logistics IoT use cases


Following are some of the transportation and logistics IoT use cases:

Fleet tracking and location awareness

Railcar identification and tracking

Asset and package tracking within fleets

Preventative maintenance of vehicles on the road





Agricultural and environmental





Farming and environmental IoT includes elements of livestock health, land and soil analysis, micro-climate predictions, efficient water usage, and even disaster predictions in the case of geological and weather-related disasters. Even as the world population growth slows down, world economies are becoming more affluent. Hunger and starvation crises are rare. That said, the demand for food production is set to double by 2035. Significant efficiencies in agriculture can be achieved through IoT. Using smart lighting to adjust the spectrum frequency based on poultry age can increase growth rates and decrease mortality rates based on stress on chicken farms. Additionally, smart lighting systems could save $1 billion annually on energy versus the common dumb incandescent lighting currently used. Other uses include detecting livestock health based on sensor movement and positioning. A cattle farm could find animals with the propensity of sickness before a bacterial or viral infection were to spread. Edge analysis systems could find, locate, and isolate heads of cattle in real time, using data analytics or machine learning approaches.

This segment also has the distinction of being in remote areas (volcanoes) or sparse population centers (corn field). This has impacts on data communication systems that we will need to consider in later Chapter 5, Non-IP Based WPAN and Chapter 7, Long-Range Communication Systems and Protocols (WAN).





Agricultural and environmental IoT use cases





Some of the agricultural and environmental IoT use cases are as follows:





Smart irrigation and fertilization techniques to improve yield

Smart lighting in nesting or poultry farming to improve yield

Livestock health and asset tracking

Preventative maintenance on remote farming equipment via manufacturer

Drones-based land surveys

Farm-to-market supply chain efficiencies with asset tracking

Robotic farming

Volcanic and fault line monitoring for predictive disasters





Energy





The energy segment includes the monitoring of energy production at source to and through the usage energy at the client. A significant amount of research and development has focused on consumer and commercial energy monitors such as smart electric meters that communicate over low-power and long-range protocols to reveal real-time energy usage.

Many energy production facilities are in remote or hostile environments such as desert regions for solar arrays, steep hillsides for wind farms, and hazardous facilities for nuclear reactors. Additionally, data may need real-time or near real-time response for critical response to energy production control systems (much like manufacturing systems). This can impact how an IoT system is deployed in this category. We will talk about issues of real-time responsiveness later in this book.





Energy IoT use cases





The following are some of the use cases for energy IoT:





Oil rig analysis of thousands of sensors and data points for efficiency gains

Remote solar panel monitoring and maintenance

Hazardous analysis of nuclear facilities

Smart electric meters in a citywide deployment to monitor energy usage and demand

Real-time blade adjustments as a function of weather on remote wind turbines





Smart city





Smart city is a phrase used to imply connecting intelligence to what had been an unconnected world. Smart cities are one of the fastest growing segments, and show substantial cost/benefit ratios especially when we consider tax revenues. Smart cities also touch citizens' lives through safety, security, and ease of use. For example, several cities such as Barcelona are fully connected and monitor trash containers and bins for pickup based on the current capacity, but also the time since the last pickup. This improves the trash collection efficiency allowing the city to use fewer resources and tax revenue in transporting waste, but also eliminates potential smells and odors of rotting organic material. Smart cities are also impacted by government mandates and regulations (as we will explore later), therefore there are ties to the government segment.

One of the characteristics of smart city deployment may be the number of sensors used. For example, a smart camera installation on each street corner in New York would require over 3,000 cameras. In other cases, a city such as Barcelona will deploy nearly one million environmental sensors to monitor electric usage, temperature, ambient conditions, air quality, noise levels, and parking spaces. These all have low bandwidth needs versus a streaming video camera, but the aggregate amount of data transmitted will be nearly the same as the surveillance cameras in New York. These characteristics of quantity and bandwidth need to be considered in building the correct IoT architecture.





Smart city IoT use cases





Some of the smart city IoT use cases are as follows:





Pollution control and regulatory analysis through environmental sensing

Microclimate weather predictions using citywide sensor networks

Efficiency gains and improved costs through waste management service on demand

Improved traffic flow and fuel economy through smart traffic light control and patterning

Energy efficiency of city lighting on demand

Smart snow plowing based on real-time road demand, weather conditions, and nearby plows

Smart irrigation of parks and public spaces, depending on weather and current usage

Smart cameras to watch for crime and real-time automated AMBER Alerts

Smart parking lots to automatically find best space parking on demand

Bridge, street, and infrastructure wear and usage monitors to improve longevity and service





Government and military





City, state, and federal governments, as well as the military, have a keen interesting in IoT deployments. Take California's executive order B-30-15 (https://www.gov.ca.gov/news.php?id=18938), which states that by 2030 greenhouse gas emissions affecting global warming will be at levels 40 percent below 1990 levels. To achieve aggressive targets like this, environmental monitors, energy sensing systems, and machine intelligence will need to come into play to alter energy patterns on demand while still keeping the California economy breathing. Other cases include projects like the Internet Battlefield of Things, with the intent of providing efficiencies for friendly, personal, and counter-attacks on enemies. This segment also ties into the smart city category when we consider the monitoring of government infrastructures like highways and bridges.

The government's role in the IoT also comes into play in the form of standardization, frequency spectrum allocation, and regulations. Take, for example, how the frequency space is divided, secured, and portioned to various providers. We will see throughout this text how certain technologies came to be through federal control.





Government and military IoT use cases





Following are some of the government and military IoT use cases:





Terror threat analysis through IoT device pattern analysis and beacons

Swarm sensors through drones

Sensor bombs deployed on the battlefield to form sensor networks to monitor threats

Government asset tracking systems

Real-time military personal tracking and location services

Synthetic sensors to monitor hostile environments

Water level monitoring to measure dam and flood containment





Summary


Welcome to the world of the IoT. As an architect in this new field, we have to understand what the customer is building, and what the use cases require. IoT systems are not a fire-and-forget type of design. A customer expects several things from jumping on the IoT train.

First, there must be a positive reward. That is dependent on your business, and your customer's intent. From my experience, a 5x gain is the target and has worked well for the introduction of new technologies to pre-existing industries. Second, IoT design is, by nature, a plurality of devices. The value of IoT is not a single device or a single location broadcasting data to a server. It's a set of things broadcasting information and understanding the value the information in aggregate is trying to tell you. Whatever is designed must scale or will scale, therefore that needs attention in upfront design.

We now start exploring the topology of an IoT system as a whole then break down individual components throughout the rest of the book.

Remember, data is the new oil.





IoT Architecture and Core IoT Modules


The IoT ecosphere starts with the simplest of sensors located in the remotest corners of the earth, and translates analog physical effects into digital signals (the language of the internet). Data then takes a complex journey through wired and wireless signals, various protocols, natural interference, and electromagnetic collisions, before arriving in the ether of the internet. From there, packetized data will traverse various channels arriving at a cloud or large data center. The strength of IoT is not just one signal from one sensor, but the aggregate of hundreds, thousands, potentially millions of sensors, events, and devices.

This chapter starts with a definition of IoT versus machine-to-machine architectures. It also addresses the architect's role in building a scalable, secure, and enterprise IoT architecture. To do that, an architect must be able to speak to the value the design brings to a customer. The architect must also play multiple engineering and product roles in balancing different design choices.

This book will cover everything from the transformation of physical to digital sensing, power systems and energy storage, to manage billions of devices to near meter, near kilometer, and extreme range communication systems and protocols, to network and information theory, to internet protocols for the IoT, to the role of edge routing and gateways. The book then turns to the application of data through cloud and fog computing, as well as advanced machine learning and complex event processing. The final content investigates security and the vulnerability of the largest attack surface on earth.





IoT ecosystem





These industries will rely on the hardware, software, and services provided by the bulk of the IT industry. Nearly every major technology company is investing or has invested heavily in IoT space. New markets and technologies have already formed (and some have collapsed or been acquired). Throughout this book, we will touch on nearly every segment in information technology, as they all have a role in IoT:





Sensors: Embedded systems, real-time operating systems, energy-harvesting sources, Micro-Electro-Mechanical Systems (MEMs).

Sensor communication systems: Wireless personal area networks reach from 0 cm to 100 m. Low-speed and low-power communication channels, often non-IP based have a place in sensor communication.

Local area networks: Typically, IP-based communication systems such as 802.11 Wi-Fi used for fast radio communication, often in peer-to-peer or star topologies.

Aggregators, routers, gateways: Embedded systems providers, cheapest vendors (processors, DRAM, and storage), module vendors, passive component manufacturers, thin client manufacturers, cellular and wireless radio manufacturers, middleware providers, fog framework providers, edge analytics packages, edge security providers, certificate management systems.

WAN: Cellular network providers, satellite network providers, Low-Power Wide-Area Network (LPWAN) providers. Typically using internet transport protocols targeted for IoT and constrained devices like MQTT, CoAP, and even HTTP.

Cloud: Infrastructure as a service provider, platform as a service provider, database manufacturers, streaming and batch processing manufacturers, data analytics packages, software as a service provider, data lake providers, Software-Defined Networking/Software-Defined Perimeter providers, and machine learning services.

Data analytics: As the information propagates to the cloud en-mass. Dealing with volumes data and extracting value is the job of complex event processing, data analytics, and machine learning techniques.

Security: Tying the entire architecture together is security. Security will touch every component from physical sensors to the CPU and digital hardware, to the radio communication systems, to the communication protocols themselves. Each level needs to ensure security, authenticity, and integrity. There cannot be the weak link in a chain, as the IoT will form the largest attack surface on earth.



This ecosystem will need talents from the body of engineering disciplines, such as device physics scientists developing new sensor technologies and many-year batteries. Embedded system engineers working on driving sensors at the edge. Network engineers capable of working in a personal area network or wide area network as well as a Software-Defined Networking. Data scientists working on novel machine learning schemes at the edge and in the cloud. DevOps engineers to successfully deploy scalable cloud solutions as a well as fog solutions. IoT will also need service vendors such as solution provision firms, system integrators, value-added resellers, and OEMs.





IoT versus machine to machine





One common area of confusion in the IoT world is what separates it from the technologies that defined machine to machine (M2M). Before IoT became part of the mainstream vernacular, M2M was the hype. M2M and IoT are very similar technologies, but there is a significant difference:





M2M: It is a general concept involving an autonomous device communicating directly to another autonomous device. Autonomous refers to the ability of the node to instantiate and communicate information with another node without human intervention. The form of communication is left open to the application. It may very well be the case that an M2M device uses no inherent services or topologies for communication. This leaves out typical internet appliances used regularly for cloud services and storage. An M2M system may communicate over non-IP based channels as well, such as a serial port or custom protocol.

IoT: IoT systems may incorporate some M2M nodes (such as a Bluetooth mesh using non-IP communication), but aggregates data at an edge router or gateway. An edge appliance like a gateway or router serves as the entry point onto the internet. Alternatively, some sensors with more substantial computing power can push the internet networking layers onto the sensor itself. Regardless of where the internet on-ramp exists, the fact that it has a method of tying into the internet fabric is what defines IoT.



By moving data onto the internet for sensors, edge processors, and smart devices, the legacy world of cloud services can be applied to the simplest of devices. Before cloud technology and mobile communication became mainstream and cost-effective, simple sensors and embedded computing devices in the field had no good means of communicating data globally in seconds, storing information for perpetuity, and analyzing data to find trends and patterns. As cloud technologies advanced, wireless communication systems became pervasive, new energy devices like lithium-ion became cost-effective, and machine learning models evolved to produce actionable value. This greatly improved the IoT value proposition. Without these technologies coming together when they did, we would still be in an M2M world.





The value of a network and Metcalfe's and Beckstrom's law


It has been argued that the value of a network is based on Metcalfe's law. Robert Metcalfe in 1980 formulated the concept that the value of any network is proportional to the square of connected users of a system. In the case of IoT, users may mean sensors or edge devices. Generally speaking, Metcalfe's law is represented as:



Where:

V = Value of the network

N = Number of nodes within the network



A graphical model helps to understand the interpretation as well as the Crossover Point, where a positive return on investment (ROI) can be expected:





Metcalfe's Law. Value of a network is represented as proportional to N2. The cost of each node is represented as kN where k is an arbitrary constant. In this case, k represents a constant of $10 per IoT edge sensor. The key takeaway is the crossover point occurs rapidly due to the expansion of value and indicates when this IoT deployment achieves a positive ROI.

A recent example validating Metcalfe's law to the value of blockchains and cryptocurrency trends was recently conducted. We will go much deeper into blockchains in the security chapter.

A recent white paper by Ken Alabi finds that blockchain networks also appear to follow Metcalfe’s law, Electronic Commerce Research and Applications, Volume 24, C (July 2017), page number 23-29.

Metcalfe's law does not account for service degradation in the event of service degradation as the number of users and/or data consumption grows, but the network bandwidth does not. Metcalfe's law also doesn't account for various levels of network service, unreliable infrastructure (such as 4G LTE in a moving vehicle), or bad actors affecting the network (for example, denial of service attacks).

To account for these circumstances, we use Beckstrom's law:



Where:

Vi,j: Represents the present value of the network for device i on network j

i: An individual user or device on the network

j: The network itself

k: A single transaction

Bi,j,k: The benefit that value k will bring to device i on network j

Ci,j,k: The cost of a transaction k to a device i on network j

rk: The discount rate of interest to the time of transaction k

tk: The elapsed time (in years) to transaction k

n: The number of individuals

m: The number of transactions



Beckstrom's law teaches us that to account for the value of a network (for example, an IoT solution), we need to account for all transactions from all devices and sum their value. If the network j goes down for whatever reason, what is the cost to the users? This is the impact an IoT network brings and is a more representative real-world attribution of value. The most difficult variable to model in the equation is the benefit of a transaction B. While looking at each IoT sensor, the value may be very small and insignificant (for example, a temperature sensor on some machine is lost for an hour). At other times, it can be extremely significant (for example, a water sensor battery died and a retailer basement is flooded, causing significant inventory damage and insurance adjustments).

An architect's first step in building an IoT solution should be to understand what value they are bringing to what they are designing. In the worst case, an IoT deployment becomes a liability, and actually produces negative value for a customer.





IoT architecture


An IoT architecture as we have eluded to will span many technologies. As an architect, one needs to understand the impact choosing a certain design aspect will have on scalability and other parts of the system. The complexities and relationships of the IoT because significantly more complex than traditional technologies because of the scale but also due to the disparate types of architecture. There is a bewildering number of design choices. For example, as of this writing, there are over 700 IoT service providers alone offering cloud-based storage, SaaS components, IoT management systems, IoT security systems, and every form of data analytics one can imagine. Add to that the number of different PAN, LAN, and WAN protocols that are constantly changing and varying by region. Choosing the wrong PAN protocol could lead to poor communications and significantly low signal quality that can only be resolved by adding more nodes to complete a mesh. The architect needs to consider interference effects in the LAN and WAN—how will the data get off the edge and on the internet? The architect needs to consider resiliency and how costly the loss of data is. Should resiliency be managed within the lower layers of the stack, or in the protocol itself? The architect must also make choices of internet protocols such as MQTT versus CoAP and AMQP, and how that will work if he or she decides to migrate to another cloud vendor. Choices also need consideration with regards to where processing should reside. This opens up the notion of fog computing to process data close to its source to solve latency problems, but more importantly to reduce bandwidth and costs moving data over WANs and clouds. Next, we consider all the choices in analyzing the data collected. Using the wrong analytic engine may result in useless noise or algorithms that are too resource intensive to run on edge nodes. Next, how will queries from the cloud back to the sensor affect the battery life of the sensor device itself? Add to this litany of choice, and we have to layer on security as the IoT deployment we have built is now the largest attack surface in our city. As you can see, the choices are many and have relationships with one another.

There are now over 1.5 million different combinations of architectures to choose from:



IoT Design Choices. The full spectrum of various levels of IoT architecture from the sensor to cloud and back.





Role of an architect


The term architect is often used in technical disciplines. There are software architects, system architects, and solution architects. Even within specific domains such as computer science and software engineering, you may see people with the title SaaS architect, cloud architect, data science architect, and so on. These are individuals that are recognized experts with tangible skills and experience in a domain. These types of specialized vertical domains cross a number of horizontal technologies. In this book, we are targeting the IoT architect. This is a horizontal role, meaning it will touch a number of these domains and bring them together for a usable, secure, and scalable system.

We will go as deep as necessary to understand an entire IoT system to bring a system together. At times, we will go into pure theory, such as information and communication theory. Other times, we will brush on topics that are on the periphery of IoT systems, or are rooted in other technologies. By reading and referencing this book, the architect will have a go-to guide on different aspects of IoT that are all needed to build a successful system. Whether you are disciplined in EE or CS, or have domain expertise in cloud architectures, this material will help you understand a holistic system—which should be, by definition, part of the role of an architect.

This book is also intended for global and mass scaling. While every topic can be used for hobbyist and maker movements, this is intended to scale to global enterprise systems on the order of thousands to millions of edge devices.





Part 1 – Sensing and power





The internet starts or ends with an event: a simple motion, a temperature change, perhaps an actuator moving on a lock. Unlike many IT devices in existence, IoT in a large part is about a physical action or event. It responds to affect a real-world attribute. Sometimes this involves considerable data being generated from a single sensor, such as auditory sensing for preventative maintenance of machinery. Other times, it's a single bit of data indicating vital health data from a patient. Whatever the case may be, sensing systems have evolved and made use of Moore's law in scaling to sub-nanometer sizes and significantly reduced costs. When one talks about the billions of devices in IoT, this is what they are referring to and why there will be billions of devices in reality. This chapter explores the depths of MEMs, sensing, and other forms of low-cost edge devices from a physical and electrical point of view. The chapter also details the necessary power and energy systems to drive these edge machines. We can't take power for granted at the edge. Collections of billions of small sensors will still require a massive amount of energy in whole to power. We will revisit power throughout this book, and how innocuous changes in the cloud can severely impact the overall power architecture of a system.





Part 2 – Data communication


A significant portion of this book surrounds connectivity and networking. There are countless other sources that dive deep into application development, predictive analytics, and machine learning. This book too will cover those topics, but an equal amount of emphasis is given to data communications.





The IoT wouldn't exist without significant technologies to move data from the remotest and most hostile environment to the largest data centers at Google, Amazon, Microsoft, and IBM. The acronym IoT contains the word internet, and because of that, we need to dive deep into networking, communications, and even signal theory. The starting point for IoT isn't sensors or the application; it's about connectivity, as we will see throughout this book. A successful architect will understand the constraints of internetworking from a sensor to a WAN and back again.

This communication and networking section starts with theory and mathematical foundations of communication and information. Preliminary tools and models are needed by a successful architect not only to understand why certain protocols are constrained, but also to design future systems that scale successfully at IoT levels. These tools include wireless radio dynamics like range and power analysis, signal-to-noise ratio, path loss, and interference. The chapter also details foundations of information theory and constraints that affect overall capacity and quality of data. The foundations of Shannon's law will be explored. The wireless spectrum is also finite and shared, as an architect deploying a massive IoT system will need to understand how the spectrum is allocated and governed. Theory and models explored in this chapter will be reused in other sections of the book.

Data communication and networking will then build up from the near-range and near-meter communication systems known as personal area networks (PANs), typically using non-internet protocol messages. The chapter on PAN will include the new Bluetooth 5 protocol and mesh, as well as Zigbee and Z-Wave in depth. These represent the plurality of all IoT wireless communication systems. Next, we explore wireless local area networks and IP-based communication systems including the vast array of IEEE 802.11 Wi-Fi systems, thread, and 6LoWPAN. The chapter also investigates new Wi-Fi standards such as 802.11p for in-vehicle communication.

The section concludes with long-range communication using cellular (4G LTE) standards, and dives deep into the understanding and infrastructure to support 4G LTE and new standards dedicated to IoT and machine to machine communication, such as Cat-1 and Cat-NB. The chapter also details the most promising features of the new 5G standard being ratified and designed to prepare the architect for future long-range transmissions where every device is connected in some capacity. A proprietary protocol like LoRaWAN and Sigfox are also explored to understand the differences between architectures.





Part 3 – Internet routing and protocols





To bridge data from sensors to the internet, two technologies are needed: gateway routers and supporting IP-based protocols designed for efficiency. This section explores the role of router technologies at the edge for bridging sensors on a PAN network to the internet. The role of the router is especially important in securing, managing, and steering data. Edge routers orchestrate and monitor underlying mesh networks and balance and level data quality. The privatization and security of data is also critical. The chapter will explore the router role in creating virtual private networks, virtual LANs, and software-defined wide-area networks. There literally may be thousands of nodes serviced by a single edge router, and in a sense, it serves as an extension to the cloud, as we will see in the Chapter 10, Cloud and Fog Topologies.

The section continues with the protocols used in IoT communication between nodes, routers, and clouds. The IoT has given way to new protocols rather than the legacy HTTP and SNMP type of messaging used for decades. IoT data needs efficient, power-aware, and low-latency protocols that can be easily steered and secured in and out of the cloud. This chapter explores protocols such as the pervasive MQTT, as well as AMPQ and CoAP. Examples are given to illustrate their use and efficiency.





Part 4 – Fog and edge compute, analytics, and machine learning





At this point, we must consider what to do with the data streaming in from edge nodes into a cloud service. First, we begin by talking about the aspects of cloud architectures such as SaaS, IaaS, and PaaS systems. An architect needs to understand the data flow and typical design of cloud services (what they are and how they are used). We use OpenStack as a model of cloud design and explore the various components from ingestor engines, to data lakes, to analytics engines. Understanding the constraints of cloud architectures is also important to make a good judgment on how a system will deploy and scale. An architect must also understand how latency can affect an IoT system. Alternatively, not everything belongs in the cloud. There is a measurable cost in moving all IoT data to a cloud versus processing it at the edge (edge processing), or extending cloud services downward into an edge router (fog computing). The section dives deep into new standards of fog compute, such as the OpenFog architecture.

Data that has been transformed from a physical analog event to a digital signal may have actionable consequences. This is where the analytics and rules engines of the IoT come in to play. The level of sophistication for an IoT deployment is dependent on the solution being architected. In some situations, a simple rules engine looking for anomalous temperature extremes can easily be deployed on an edge router monitoring several sensors. In other situations, a massive amount of structured and unstructured data may be streaming in real time to a cloud-based data lake, and require both fast processing for predictive analytics, and long-range forecasting using advanced machine learning models, such as recurrent neural networks in a time-correlated signal analysis package. This chapter details the uses and constraints of analytics from complex event processors, to Bayesian networks, to the inference and training of neural networks.





Part 5 – Threat and security in IoT





We conclude the book with a survey of IoT compromises and attacks. In many cases, IoT systems will not be secured in a home, or in a company. They will be in the public, in very remote areas, in moving vehicles, or even inside a person. The IoT represents the single biggest attack surface for any type of cyber attack. We have seen countless academic hacks, well-organized cyber assaults, and even nation-state security breaches with IoT devices being the target. This chapter will detail several aspects of such breaches and types of remediation any architect must consider to make a consumer or enterprise IoT deployment a good citizen of the internet. We explore the proposed Congressional Act to secure the IoT, and understand the motivation and impact of such government mandate.

The chapter will checklist the typical security provisions needed for IoT, or any network component. Details of new technologies such as blockchains and Software Defined Perimeters will also be explored to provide insight into future technologies that will be needed to secure the IoT.





Summary





This book will bridge the spectrum of technologies that comprise the IoT. We summarized the domains and topics covered in this chapter. An architect must be cognizant of the interactions between these disparate engineering disciplines to build a system that is scalable, robust, and optimized. An architect will also be called upon to provide supporting evidence that the IoT system provides a value to the end user or the customer. Here, we learned about the application of Metcalfe's and Beckstrom's laws as tools for supporting an IoT deployment.

In the next chapter and those that follow, we will dive into IoT architecture from the sensor to the cloud, and everything in between.





Sensors, Endpoints, and Power Systems





The Internet of Things (IoT) begins with sources of data or devices that perform an action. These we call endpoints, and they are the things associated with the internet. When one discusses IoT, in general, the actual sources of data are often overlooked. These sources are sensors outputting a stream of time-correlated data that must be transmitted securely, possibly analyzed, and possibly stored. The value of IoT is in the data in aggregate. Therefore, the data a sensor provides is crucial. However, for an architect, it is critical to understand the data as well as how the data is interpreted. Besides understanding what data is collected and how it is acquired, in a massive IoT deployment, it is useful to know what can be sensed, and what the constraints are for various sensors. For example, a system must account for lost devices and erroneous data. An architect must understand the reasons why data may not be reliable from sensors, and how a sensor can fail in the field. Essentially, we are connecting the analog world to the digital. The majority of connected things will be sensors, so it is important to understand their role.

This is what the IoT is in a nutshell. The massive growth of connected things and objects will be sensors and actuators, so it is important to understand their relationship in the architecture. This chapter will highlight sensor devices from an electronics and system point of view. It is important to understand the principles of what is being measured, and why. One should ask, "What type of sensor or edge device should I consider for the problem I'm trying to solve?" An architect should consider aspects of cost, features, size, usable life, and precision when deploying an IoT solution. Additionally, the power and energy of edge devices are rarely addressed in IoT literature, but are critical to building reliable and long-lasting technology. The reader should leave this chapter with a high-level grasp of sensor technology and its constraints.

In this chapter, we will cover the following topics:





Sensing devices from thermocouples to MEMS sensors to vision systems

Energy generation systems

Energy storage systems





Sensing devices





We begin by focusing on the sensing or input devices. These come in a variety of forms and complexities, from simple thermocouples to advanced video systems. When one refers to the "billions of IoT things", this section will represent a broad range of sensing things. One reason IoT is a large growth area is the fact that these sensing systems have been reduced in size and cost substantially, with advances in semiconductor fabrication and micromachining.





Thermocouples and temperature sensing





Temperature sensors are the most prevalent form of sensor products. They exist just about everywhere. From smart thermostats to IoT cold storage logistics, from refrigerators to industrial machinery, they are prevalent, and are most likely the first sensing device you will be exposed to in an IoT solution.





Thermocouples


A thermocouple (or TC) is a form of temperature-sensing apparatus that doesn't rely on an excitation signal to operate. Therefore, they produce very small signals (often microvolts in amplitude). Two wires of two different materials meet where a temperature measurement is to be sampled. Each metal develops a voltage differential independently of each other. This effect is known as the Seebeck electromotive effect, in which the difference between the voltage of the two metals has a nonlinear relationship to the temperature.

The magnitude of the voltage depends on the metal material chosen. It is critical that the ends of the wires are thermally isolated from the system (and the wires need to be at the same controlled temperature). In the following diagram, you will see a thermal block whose temperature is controlled with a sensor. This is usually controlled via a technique called the cold junction compensation, where the temperature can vary, but is measured by the block sensor accurately.

When sampling the voltage differential, the software will usually have a look-up table to derive the temperature based on the nonlinear relationship of the metals chosen:



Thermocouple Schematic

Thermocouples should be used for simple measurements. The system can vary in accuracy as well, since subtle impurities can affect the wire composition and cause a mismatch in the lookup tables. Precision-grade thermocouples may be needed, but come at a higher cost. Another effect is aging. Since thermocouples are often used in industrial settings, high-heat environments can degrade the accuracy sensors over time. Therefore, IoT solutions must account for changes over the life of a sensor.

Thermocouples are good for wide temperature ranges, are color-coded for different metal combinations, and labeled by type (for example, E, M, PT-PD, to name a few). In general, these sensors are good for long distance measurements with long leads, and are often used in industrial and high-temperature environments.

Shown below are various thermocouple metal types and their respective energy linearities across a range of temperatures.



Thermocouple Type Characterization E(T):T





Resistance Temperature Detectors


Resistance Temperature Detectors (RTDs) operate within a narrow range of temperatures, but have much better accuracy than thermocouples (below 600 degrees Celsius). These are usually constructed with very fine platinum wire tightly wrapped around ceramic or glass. This produces a resistance-to-temperature relationship. Because it is a resistance-based measurement, an excitation current is needed to operate an RTD (1 mA).

The resistance of an RTD follows a predefined slope. RTDs are specified with a base resistance. A 200 PT100 RTD has a slope of 0.00200 Ohms/degrees Celsius from 0 to 100 degrees Celsius. Within that range (0 to 100 degrees Celsius), the slope will be linear. RTDs come in two, three, and four-wire packages, with four-wire models used for high-accuracy calibration systems. RTDs are often used with bridge circuits to increase resolution, with software linearizing the results:

Wire-wound RTD

RTDs are rarely used above 600 degrees Celsius, which limits their application in industry. At high temperatures, the platinum can become contaminated, leading to incorrect results; however, when measuring within their specified range, RTDs are fairly stable and accurate.





Thermistors





The last temperature sensing device is the thermistor. These are also resistance-based relationship sensors like RTDs, but produce a higher degree of change for a given temperature than an RTD. Essentially, these are resistors that vary based on temperature. They are also used in circuits to alleviate in-rush currents. Whereas an RTD has a linear relationship with a change in temperature, thermistors have a highly nonlinear relationship, and are suitable where a high resolution is needed for a narrow temperature range. There are two types of thermistors: NTC, where resistance decreases as temperatures rise; and PTC, where resistance increases with rising temperatures. The main difference from an RTD materially is the use of ceramics or polymers, whereas metals are the basis of RTDs.

Thermistors are found in medical devices, scientific equipment, food handling equipment, incubators, and home appliances such are thermostats.





Temperature sensor summary


In summary, the following table highlights the use cases and benefits of particular temperature sensors:

Category

Thermocouples

Resistance Temperature Detectors

Thermistors



Temperature Range (degrees Celsius)

-180 to 2,320 -200 to 500

-90 to 130



Response Time

Fast (microseconds)

Slow (seconds)

Slow (seconds)



Size

Large (~1 mm)

Small (5 mm)

Small (5 mm)



Accuracy

Low

Medium

Very high





Hall effect sensors and current sensors


A hall effect sensor consists of a strip of metal that a current runs across. A stream of charged particles passing through a magnetic field will cause the beam to deflect from a straight line. If a conductor is placed in the magnetic field perpendicular to the electron flow, it will gather charge carriers and produce a voltage differential between the positive side of the metal strip and the negative side. This will produce a voltage differential that can be measured. The differential is called the Hall voltage, which is responsible for the phenomenon known as the Hall effect. This is illustrated in the following image. If a current is applied to a metal strip (as shown in the diagram) within a magnetic field, electrons will be attracted to one side of the strip, and holes to the other (see the curved line). This will induce an electric field that can be measured. If the field is strong enough, it will cancel out the magnetic force, and electrons will follow the straight line:



Example of the Hall effect.

Current sensors use the Hall effect for measuring the AC and DC currents of a system. There are two forms of current sensors: open loop, and closed loop. Closed loops are more expensive than open loop sensors, and are often used in battery-powered circuits.

Typical uses of Hall sensors include position sensing, magnetometers, highly reliable switches, and water level detection. They are used in industrial sensors to measure the rotational velocity of different machines and motors. Additionally, these devices can be created very inexpensively, and can tolerate harsh environmental conditions.





Photoelectric sensors


The detection of light and light intensity is used in many IoT sensor devices, such as security systems, smart switches, and smart street lighting. As the name implies, a photoresistor varies in resistance depending on light intensity, while photodiodes convert light into an electrical current.

Photoresistors are manufactured using a high-resistance semiconductor. The resistance decreases as more light is absorbed. In the dark, a photoresistor can have quite a high resistance (in the megaohm range). Photons absorbed by the semiconductor allow electrons to jump to the conduction band and conduct electricity. Photoresistors are wavelength sensitive, depending on their type and manufacturer; however, photodiodes are true semiconductors with a p-n junction. The device responds to light by creating an electron-hole pair. The holes move towards an anode, the electrons migrate to a cathode, and a current is produced. Traditional solar cells operate in this photovoltaic mode, producing electricity. Alternatively, a reverse bias can be used on the cathode to improve the latency and response time if needed:

Category

Photoresistor

Photodiode



Light Sensitivity

Low

High



Active/Passive (Semiconductor)

Passive

Active



Temperature Sensitivity

Highly sensitive

Low



Latency to Light Changes

Long (10 milliseconds on, 1 second off)

Short





PIR sensors


Pyroelectric Infrared (PIR) sensors contain two slots filled with material that reacts to IR radiation and heat. Typical use cases are security, or warm-body movement. In its simplest form, a Fresnel lens sits on top of the PIR sensor, allowing both slots to form a widening arc outward. These two arcs create detection zones. When a warm body enters one of the arcs, or leaves one, it generates a signal that is sampled. The PIR sensors use a crystalline material that generates current when subjected to IR radiation. A Field Effect Transistor (FET) detects the change in current, and sends the signal to an amplification unit. PIR sensors respond well in the 8 to 14 um range, which is typical of a human body.

The following diagram illustrates two IR regions detecting two zones. While this is fine for some purposes, generally we need to inspect an entire room or area for movement or activity:

PIR Sensor. Two elements responding to a source of IR moving across its field of view.

To scan a larger area with a single sensor requires multiple Fresnel lenses that condense light from regions of the room to create distinct regions on the PIR array. This also has the effect of condensing the infrared energy to discrete FET areas. Typically, such devices allow the architect to control the sensitivity (range) as well as the hold time.

The hold time specifies for how long to output a motion event after an object has been detected moving across the path of the PIR. The shorter the hold time, the more events may be output. Below is a diagram of a typical PIR sensor with a Fresnel lens focusing on the substrate by a fixed focal length:

Left: Fresnel Lens condensing IR region onto PIR sensor. Cypress Microsystems Application Note AN2105.





LiDAR and active sensing systems


This section will cover active sensing systems. We have discussed many passive sensors that simply respond to environmental changes. Active sensing involves broadcasting a signal that is referenced to measure the environment either spatially or sensorily. While this area is broad, we will concentrate on LiDAR as a basis for active sensing systems.

LiDAR stands for Light Detecting and Ranging. This type of sensor measures the distance to a target by measuring a laser pulse reflection on the target. Where a PIR sensor will detect movement within a range, LiDAR is capable of measuring a range. The process was first demonstrated in the 1960s, and is now used pervasively in agriculture, automated and self-driving vehicles, robotics, surveillance, and environmental studies. This type of active sensing machine is also capable of analyzing anything that crosses its path. They are used to analyze gases, atmospheres, cloud formations and compositions, particulates, the speed of moving objects, and so on.

LiDAR is an active sensor technology, and broadcasts laser energy. As a laser hits an object, some of the energy will be reflected back towards the LiDAR emitter. The lasers used are typically in the 600 to 1000 nm wavelength, and are relatively inexpensive. Power is constrained for safety reasons to prevent eye damage. Some LiDAR units operate in the 1550 nm range, as that wavelength cannot be focused by the eye, rendering them harmless even at high energy. LiDAR systems are capable of very long ranging and scanning, even from satellites. The laser will pulse up to 150,000 pulses per second, which can reflect off an object back to a photodiode array. The laser apparatus can also sweep the scene via a rotating mirror to build a comprehensive 3D image of the environment. Each beam that is broadcast represents an angle, Time of Flight (TOF) measurement, and a GPS location. This allows the beams to form a representative scene.

To calculate the distance to an object, the equation is relatively simple:



LiDAR and other active sensors behave in a similar manner. Each has a representative broadcasting signal that returns to a sensor to build an image, or indicate that an event has occurred. These sensors are much more complex than simple passive sensors, and also take more power, cost, and area:



LiDAR: An example of a LiDAR image used to analyze atmospheric wind gusts to protect wind turbines. Image courtesy of NASA.





MEMS sensors


Micro-electromechanical systems (MEMS) have been in the industry since they were first produced in the 1980s; however, the origin of the first MEMS pressure sensor dates back to the 1960s at Kulite Semiconductor, who developed a piezoresistive pressure sensor. Essentially, they incorporate miniaturized mechanical structures that interact with electronic controls. Typically, these sensors are in the 1 to 100 um geometry range. Unlike the other sensors mentioned in this chapter, MEMS mechanical structures can spin, stretch, bend, move, or alter form, which in turn affects an electrical signal. This is the signal captured and measured by one particular sensor.

MEMS devices are manufactured in a typical silicon fabrication process using multiple masks, lithography, deposition, and etching processes. MEMS silicon dies are then packaged with other components such as operational amplifiers, analog to digital converters, and support circuitry. Typically, MEMS devices will be fabricated in the relatively large 1 to 100-micron range, whereas typical silicon structures are fabricated at 28 nm or below. The process involves a thin layer deposition and etching to create the 3D structures for a MEMS device.

Besides sensor systems, MEMS devices can be found in the heads of inkjet printers and modern overhead projectors such as digital light processor (DLP) projectors. The ability to synthesize MEMS sensing devices into packages as small as a pinhead has and will allow IoT growth into billions of connected things.





MEMS accelerometers and gyroscopes


Accelerometers and gyroscopes are common in many mobile devices today, and are used in positioning and movement tracking, such as with pedometers and fitness trackers. These devices will use a MEMS piezoelectric to produce a voltage in response to movement. Gyroscopes detect rotational motion, and accelerometers respond to changes in linear motion. The following diagram illustrates the basic principle of an accelerometer. Typically, a central mass that is fixed to a calibrated location via a spring will respond to changes in acceleration that are measured by varying capacitance in a MEMS circuit. The central mass will appear to be stationary in response to acceleration in one direction.

An accelerometer will be synthesized to respond to multiple dimensions (X, Y, Z) rather than one dimension, as shown in this illustration:



Accelerometer: The principle of acceleration measurement using a central mass suspended by a spring. Typically, these will be used in multiple dimensions.

Gyroscopes operate slightly differently. Rather than relying on the motion response to a central mass, gyros rely on the Coriolis effect of a rotating reference frame. The following figure demonstrates the concept. Without increasing velocity, the object would move in an arc, and not reach the northbound target. Moving towards the outer edge of the disk requires additional acceleration to maintain a northbound course.

This is the Coriolis acceleration. In a MEMS device, there is no spinning disk; rather, there is a resonant frequency applied to a series of MEMS-fabricated rings on a silicon substrate:



Accelerometer: Effect of a rotating disk on a path moving northward.

The rings are concentric, and cut into small arcs. Concentric rings allow for more area to gauge the accuracy of rotational movement. Single rings would require rigid support beams, and are not as reliable. By bifurcating the rings into arcs, the structure loses rigidity, and is more sensitive to rotational forces. The DC source creates an electrostatic force that resonates within the ring, while the electrodes attached to the rings detect the changes in the capacitor. If the resonating rings are perturbed, the Coriolis acceleration is detected. The Coriolis acceleration is defined by the following equation:



This equation states that the acceleration is a product of the rotation of the system and the velocity of the rotating disk, as shown in the preceding diagram, or the resonant frequency of the MEMS device, as shown in the following diagram. Given a DC power source, a force changes the gap size and the overall capacitance of the circuit. The outer electrodes detect deflection in the ring, while inner electrodes provide capacitance measurements:



Right: Concentric cut rings representing the gyro sensor sitting upon a silicon substrate. Left: the disk gap connected to a corresponding.

Both gyroscopes and accelerometers will require power supplies and an op-amp for signal conditioning. After conditioning, the output is ready to be sampled by a digital signal processor.

These devices can be synthesized in very small packages, such as the Invensense MPU-6050, which includes a 6-axis gyro and accelerometer in a small 4 mm x 4 mm x 1 mm package. The device draws on 3.9 mA of current, and is good for low power sensing.





MEMS microphones


MEMS devices can also be used for sound and vibration detection. These types of MEMS devices are related to the accelerometers previously covered. For IoT deployments, sound and vibration measurements are common in the industrial IoT and predictive maintenance applications. For example, an industrial machine that rotates or mixes a load of material in chemical manufacturing, or in centrifuges to separate mixtures, needs precise leveling. A MEMS sound or vibration unit will typically be used to monitor the health and safety of such equipment.

This type of sensor will require an analog-to-digital converter of sufficient sampling frequency. Additionally, an amplifier is used to strengthen the signal. The impedance of a MEMS microphone is in the order of several hundred ohms (which requires careful attention to the amplifier used). A MEMS microphone can be analog or digital. An analog variety will be biased to some DC voltage, and will be attached to a codec for analog-to-digital conversion. A digital microphone has the ADC close to the microphone source. This is useful when there is signal interference from cellular or Wi-Fi signals near the codec.

The output of a digital MEMS microphone can either be pulse density modulated (PDM), or sent over I2S format. PDM is a high sampling rate protocol that has the ability to sample from two microphone channels. It does this by sharing a clock and data line, and sampling from one of the two microphones on different clock periods. I2S doesn't have a high sampling rate, and the decimation at audio rates (Hz to kHz range) results in fair quality. This still allows multiple microphones to be used in sampling, but may not require an ADC at all, since the decimation is happening in the microphone. A PDM, with its high sampling rate, will need to be decimated by a digital signal processor, or DSP.





MEMS pressure sensors


Pressure and strain gauges are used in a variety of IoT deployments, from smart cities monitoring infrastructure to industrial manufacturing. These are typically used to measure fluid and gas pressures. The heart of the sensor is a piezoelectric circuit. A diaphragm will be placed above or below a cavity on the piezoelectric substrate. The substrate is flexible, and allows the piezo crystals to change shape. This change in shape results in a directly correlated resistance change in the material:

PressureSensor Anatomy

This type of sensor, as well as others listed in this chapter based on an excitation current, relies on a Wheatstone bridge to measure changes. Wheatstone bridges may come in two, four, or six-wire combinations. The change in voltage is measured across the bridge as the piezoelectric substrate flexes and changes resistance:



Wheatstone Bridge used for amplification of MEMS pressure sensor





Smart IoT endpoints





So far, we have examined very simple sensors that simply return information in a binary or analog form that must be sampled. There are, however, IoT devices and sensors that have substantial processing power and performance for the tasks they undertake. Smart sensors include devices such as video cameras and vision systems. Smart sensors can include substantial amounts of processing in the form of high-end processors, digital signal processors, FPGAs, and custom ASICs. In this section, we will explore the details of one form of smart sensor: a vision system.





Vision system


In contrast with the simple sensors explored earlier, vision systems are much more complex, which results in substantial hardware, optics, and imaging silicon. Vision systems start with a lens that observes a scene. A lens provides focus, but also provides more light saturation to the sensing element. In modern vision systems, one of two types of sensing elements is used: charge-coupled devices (CCD), or complementary metal-oxide (CMOS) devices. The difference between CMOS and CCD can be generalized as:

CCD: Charge is transported from the sensor to the edge of the chip to be sampled sequentially via an analog-to-digital converter. CCDs create high-resolution and low-noise images. They consume considerable power (100x that of CMOS). They also require a unique manufacturing process.

CMOS: Individual pixels contain transistors to sample the charge and allow each pixel to be read individually. CMOS is more susceptible to noise, but uses little power.



Most sensors are built using CMOS in today's market. A CMOS sensor is integrated into a silicon die that appears as a two-dimensional array of transistors arranged in rows and columns over a silicon substrate. A series of microlenses will sit upon each red, green, or blue sensor focusing incidental rays onto transistor elements. Each of these microlenses attenuates a specific color to a specific set of photodiodes (R, G, or B) that respond to the level of light; however, lenses are not perfect. They can add chromatic aberrations where different wavelengths refract at different rates, which leads to different focal lengths and blur. A lens can also distort an image, causing pincushioning effects.

Next will come a series of steps to filter, normalize, and convert the image several times into a usable digital image. This is the heart of the image signal processor (ISP), and the steps may be followed in this order:



Image Sensor: Typical image signal processor pipeline for color video.

Note the numerous conversions and processing of each stage of the pipeline for each pixel in the image. The amount of data and processing requires substantial custom silicon or digital signal processors. The following lists the functional block responsibilities in the pipeline:

Analog-to-digital conversion: Amplification of sensor signal then converted to digital form (10-bit). Data is read in from the photodiode sensor array as a flattened series of rows/columns representing the image just captured.

Optical clamp: Removes sensor biasing effects due to sensor black level.

White balance: Mimics chromatic display in the eye for different color temperatures, and neutral tones appear neutral. Performed using matrix conversions.

Dead pixel correction: Identifies dead pixels, and compensates for their loss using interpolation, dead pixels are replaced with the average of neighboring pixels.

Debayer filtering and demosaicing: Arranges RGB data to saturate green over red and blue content for luminance sensitivity adjustment. Also creates a planar format of images from sensor-interlaced content. More advanced algorithms preserve edges in images.

Noise reduction: All sensors introduce noise. Noise can be associated with the non-uniformity of pixel sensitivity at a transistor level, or leakage of the photodiode, revealing dark regions. Other forms of noise exist as well. This phase removes white and coherent noise introduced in the image capture through a median filter (3 x 3 array) across all pixels. Alternatively, a despeckle filter can be used, requiring pixels to be sorted, and other methods exist as well. However, they all walk the pixel matrix.

Sharpening: Applies a blur to an image using a matrix multiplication, then combines the blur with detail in content regions to create a sharpening effect.

Color space conversion 3 x 3: Color space conversion to RGB data for RGB particular treatments.

Gamma Correction: Corrects for CMOS image sensor nonlinear response on RGB data to different irradiance. Gamma correction uses a look-up table (LUT) to interpolate and correct an image.

Color Space Conversion 3 x 3: Additional color space conversion from RGB to Y'CbCr format. YCC was chosen, since Y can be stored at a higher resolution than CbCr without the loss of visual quality. 4:2:2 bit representation.

Chroma subsampling: Due to nonlinearities in RGB tones, this phase corrects images to mimic other media such as film for tonal matching and quality.

JPEG encoder: Standard JPEG compression algorithm.



It should be emphasized here that this is a good example of how complex a sensor can be, and how much data, hardware, and complexity can be attributed to a simple vision system. The amount of data passing through a vision system or camera at a conservative 60 frames per second at 1080p resolution is massive. Assuming all the phases (except JPEG compression) move through an ISP in fixed-function silicon (as in an ASIC) one cycle at a time, the total amount of data processed is 1.368 GBpsec. Accounting for JPEG compression as the last step brings the amount of data to well over 2GB/sec in processing through custom silicon and CPU/DSP cores. One would never stream raw Bayer image video to the cloud for processing - this work must be performed as close to the video sensor as possible.





Sensor fusion


One aspect that needs consideration with all the sensor devices described in this chapter is the concept of sensor fusion. Sensor fusion is the process of combining several different kinds of sensor data to reveal more about context than a single sensor can provide. This is important in the IoT space, since a single thermal sensor has no notion of what causes a rapid temperature change. However, when combined with data from other sensors nearby that look at PIR motion detection and light intensity, an IoT system could discern that a large number of people are congregating in a certain area while the sun is shining, and could then make the decision to increase air circulation in a smart building. A simple thermal sensor only records the current temperature value, and has no contextual awareness that the heat is rising due to people congregating and sunlight shining.

With time-correlated data from multiple sensors (edge and cloud), processing can make better decisions based on more data. This is one of the reasons that there will be a large influx of data from sensors to the cloud, and this is causing big data growth. As sensors become cheaper and easier to integrate, as with the TI SensorTag, we will see more combined sensing to provide contextual awareness.

There are two modes of sensor fusion:

Centralized: Where raw data is streamed and aggregated to a central service and fusion occurs there (cloud-based, for example)

De-centralized: Where data is correlated at the sensor (or close to it)



The basis of correlating sensor data is usually expressed through the central limit theorem, where two sensor measurements, x1 and x2, are combined to reveal a correlated measurement, x3, based on the combined variances. This is simply adding two measures, and weighting the sum by the variances:



Other sensor fusion methods used are Kalman filters and Bayesian networks.





Input devices





There are many other forms of sensing devices we haven't talked about in this chapter, including various gas sensors, humidity sensors, radon and radiation sensors, smoke sensors, ultrasonic sensors, and so on. This chapter, however, should give the reader a working knowledge of the sensor input fundamentals and challenges in choosing the correct sensing options.

Up to this point, we have discussed endpoint devices such as sensors. These devices send a constant stream of data to an edge device, or the cloud. The IoT consists of bi-directional systems. Input may arrive at an endpoint from the cloud, or data may be sent from an endpoint to multiple subscribers in the cloud. This short section covers basic actuators and output devices.





Output devices





Output devices in the IoT ecosphere can be just about anything, from a simple LED to a full video system. Other types of output include actuators, stepper motors, speakers and audio systems, industrial valves, and so on. It stands to reason that these devices need various control systems of differing complexity. Depending on the type of output and the use case they serve, it also should be expected that much of the control and processing needs to be located at the edge, or close to the device (versus complete control in the cloud). A video system, for example, can stream data from cloud providers, but needs output hardware and buffering capabilities at the edge.

In general, output systems can require substantial energy to convert to mechanical movement, thermal energy, or even light. A small hobbyist solenoid to control fluid or gas flow can require 9 to 24 VDC and draw 100 mA to operate reliably and produce five Newton's of force. Industrial solenoids operate in hundreds of volts.





Functional examples (putting it all together)





A collection of sensors is fairly useless unless the data they collect can be transmitted and processed. Whether that is a local embedded controller or sent upstream to a cloud, more hardware is needed to build the system. Typically, the sensors will use established IO interface and communication systems, such as I2C, SPI, UART, SPI, or other low-speed IOs. Other devices such as video systems will need much faster IO to maintain high resolution and fast video frame rates such as MIPI, USB, or even PCI-Express. To communicate wirelessly, the sensors will need to be used with wireless transport hardware like Bluetooth, Zigbee, or 802.11. All this requires extra componentry, which we will cover in this section.





Functional example – TI SensorTag CC2650


The Texas Instruments CC2650 SensorTag is a good example of an IoT sensor module for development, prototyping, and design. SensorTag has the following features and sensors in the package:

Sensor input Ambient light sensor (TI Light Sensor OPT3001)

Infrared temperature sensor (TI Thermopile infrared TMP007)

Ambient temperature sensor (TI light sensor OPT3001)

Accelerometer (Invensense MPU-9250)

Gyroscope (Invensense MPU-9250)

Magnetometer (Bosch SensorTec BMP280)

Altimeter/Pressure sensor (Bosch SensorTec BMP280)

Humidity sensor (TI HDC1000)

MEMS microphone (Knowles SPH0641LU4H)

Magnetic sensor (Bosch SensorTec BMP280)

2 Push-button GPIOs

Reed relay (Meder MK24)





Output devices Buzzer/speaker

2 LEDs





Communications Bluetooth Low Energy (Bluetooth Smart)

Zigbee

6LoWPAN





This package is powered by a single CR2032 coin cell battery. Finally, the device can be placed into beacon mode (iBeacon), and used as a message broadcaster. Following is the block diagram of the CC2650 SensorTag module:

TI CC2650 SensorTag. Courtesy of Texas Instruments, TI Multi-Standard CC2650 SensorTag Design Guide. Texas Instruments Incorporated, 2015.

The next image is of the block diagram of the MCU. The MCU provides the IO and processing ability using an ARM Cortex M4, and connects over various bus interfaces to sensor components on the module:

TI CC2650 MCU Block Diagram. Courtesy of Texas Instruments, TI Multi-Standard CC2650 SensorTag Design Guide. Texas Instruments Incorporated, 2015.

This device is packed with a number of sensors, communication systems, and interfaces, but the amount of processing power is limited. The device uses a processing module from TI (MCU CC265), which includes a small ARM Cortex M3 CPU with only 128 KB of flash memory and 20 KB of SRAM. This was chosen for its extremely low power consumption. While power-efficient, this limits the amount of processing and resources on this system. Typically, components like these will need to be accompanied by a gateway, router, cell phone, or some other smart device. Sensor devices such as these that are built for low power and low cost would not have the resources for more demanding applications such as MQTT protocol stacks, data aggregation, cellular communication, or analytics. For that matter, most endpoint sensing devices one will see in the field are simpler than this component, to further reduce cost and power.





Sensor to controller


In many of the preceding examples for sensing components, the signal will require amplification, filtering, and calibration before going anywhere. Typically, the hardware will need an analog-to-digital converter of some resolution. The following is a simple 24-bit ADC that outputs a 5V signal:



Wheatstone Bridge: connected to AD7730 analog to digital converter as input to a microcontroller or system on a chip

The output can then be raw pulse-modulated data, or a serial interface such as I2C, SPI, or UART to a microcontroller or digital signal processor. A good example of this in a real system is the Texas Instruments infrared thermopile sensor (TMP007). This is a contactless MEMS temperature sensor that absorbs infrared wavelengths and converts them to a reference voltage while using a cold junction reference temperature. It is rated for accurately detecting temperatures in environments between -40 degrees Celsius to +125 degrees Celsius. We can see the components covered in this chapter for this part in the following figure:



TI TMP007Courtesy of Texas Instruments. TI Multi-Standard CC2650 SensorTag Design Guide. Texas Instruments Incorporated, 2015.





Energy sources and power management





Powering sensors and edge devices reveal a significant problem. When we consider that sensors and edge devices number in the billions, and the fact they will be used in very remote areas, power becomes a challenge. Furthermore, there will be IoT deployments where sensors will be buried undersea, or embedded into concrete infrastructures, further complicating power sources. In this section, we will explore the concepts of energy harvesting and power management. Both are very important concepts in the overall IoT story.





Power management


Managing power is a very broad topic, and spans software and hardware. It is important to understand the role of power management in a successful IoT deployment, and how to manage power efficiently for remote devices and long-lived devices. The architect must build a power budget for the edge device, which includes:

Active sensor power

Frequency of data collection

Wireless radio communication strength and power

Frequency of communication

Microprocessor or microcontroller power as a function of core frequency

Passive component power

Energy loss from leakage or power supply inefficiency

Power reserve for actuators and motors



The budget simply reflects the sum of these power contributors subtracted from the source of power (battery). Batteries also do not have a linear power behavior over time. As the battery loses energy capacity while discharging, the amount of voltage will drop curvilinearly. This poses problems for wireless communication systems. If the battery drops below a minimum voltage, a radio or microprocessor will not reach the threshold voltage and brown out.

For example, the TI SensorTag C2650 has the following power characteristics:

Standby mode: 0.24 mA

Running with all sensors disabled: 0.33 mA

LEDs

All sensors on at 100 ms/sample data rate and broadcasting BLE: 5.5 mA: Temperature sensor: 0.84 mA

Light sensor: 0.56 mA

Accelerometer and gyros: 4.68 mA

Barometric sensor: 0.5 mA





The TI SensorTag uses a standard CR2032 coin cell battery rated at 240 mAh. Therefore, the maximum life is expected to be about 44 hours. However, the rate of decline changes, and is not linear for battery-based devices, as we will see when we cover Peukert's capacity.

Many power management practices are employed, such as clock gating components not being used in silicon, reducing the clock rates of processors or microcontrollers, adjusting the sensing frequency and broadcast frequency, back-off strategies to reduce communication strength, and various levels of sleep modes. These techniques are widely used in the computing business as a general practice.

The techniques described here reflect reactionary power management techniques. They try to minimize energy usage based on dynamic voltage, frequency scaling, and other schemes. New techniques to consider on the horizon include approximate computing and probabilistic design. Both of these schemes rely on the fact that absolute precision is not necessary at all times in a sensor environment running at the edge, especially in use cases involving signal processing and wireless communication. Approximate computing can be done in hardware or software, and simply reduces the level of precision in integers when used with functional units such as addresses and multipliers (for example, the value 17,962 is fairly close to 17,970). Probabilistic design realizes many IoT deployments can tolerate certain degrees of faultiness to relax design constraints. Both techniques can reduce the number of gates and power to an almost exponential drop over regular hardware designs.





Energy harvesting


Energy harvesting is not a new concept, but is an important concept for IoT. Essentially, any system that represents a change in state (for example, hot to cold, radio signals, light) can convert its form of energy into electrical energy. Some devices use this as their sole form of energy, while others are hybrid systems that use harvesting to augment or extend the life of a battery. In turn, energy harvested can be stored and used (sparingly) to power low-energy devices such as sensors in IoT. Systems must be efficient in capturing energy and storing power. Therefore, advanced power management is needed. For example, if an energy harvesting system uses a piezoelectric mechanical harvesting technique embedded in a sidewalk, it will need to compensate when there is not enough foot traffic to keep the unit charged. Constant communication with energy harvesting systems can further drain the power. Typically, these IoT deployments will use advanced power management techniques to prevent complete loss of functionality. Techniques such as low standby currents, low-leakage circuits, and clock throttling are frequently used.

The following figure illustrates the area where energy harvesting is ideal, and the technology that it can power. Care must be taken by the architect to ensure the system is not underpowered, nor overpowered.

Harvesting systems, in general, have a low energy potential and low conversion efficiency. An architect should consider energy harvesting in situations where there is a large supply of untapped waste energy, such as in industrial settings:

Energy harvesting sweet spots. The figure illustrates typical energy consumption for various devices.





Solar harvesting


Energy from light, whether it is natural or artificial, can be captured and used as an energy source. Earlier in this chapter, we discussed photodiodes and their relationship to sensing light. The same diode can be used in greater quantities to build a traditional solar array. The capacity of energy generation is a function of the area of the solar array. In practice, indoor solar generation is not as efficient as direct sunlight. Panels are rated by their maximum power output in the form of watts.

Solar harvesting is only as effective as how much the sun shines, which varies seasonally and geographically. A region such as the Southwestern US can reclaim considerable energy from direct photovoltaic sources. The Photovoltaic Solar Resource of the United States map was created by the National Renewable Energy Laboratory for the U.S. Department of Energy www.nrel.gov shown as follows:



Solar energy map of United States in energy density of kWh/m2 1998-2009.

In the United States, Southwest regions fare particularly well with sun intensity, generally lack cloud light barriers, and have good atmospheric conditions. Whereas, Alaska has the weakest energy density. Solar photovoltaics are not typically efficient. One can expect an 8% to 20% efficiency, with 12% being typical. Regardless, a 25 cm2 solar array could produce 300 mW at peak power. Another factor is the incidence of light. For a solar collector to achieve such efficiency, the light source must be perpendicular to the array. If the angle of incidence changes as the sun moves, the efficiency drops further. A 12% efficiency collector when the sun is perpendicular will be roughly 9.6% efficient when the sun is 30 degrees from being perpendicular.

The most basic solar collector is the solar cell that is a simple p-n semiconductor, and similar to the photoelectric sensors discussed earlier. As explained earlier, an electric potential is generated between the p and n material when a photon is captured.





Piezo-mechanical harvesting


As mentioned earlier in this chapter, piezoelectric effects can be used as sensors, but they can also be used to generate power. Mechanical strains can be converted to energy through motion, vibration, and even sound. These harvesters could be used in smart roadways and infrastructures to harvest and change systems based on traffic movement, even when embedded in concrete. These devices produce currents on the order of milliwatts, and thus are suitable for very small systems with some form of energy collection and storage. This process can be performed using MEMS piezo-mechanical devices, electrostatic, and electromagnetic systems.

Electrostatic harvesting incorporates Faraday's law, which basically states that one can induce an electric current by changing the magnetic flux across a coil of wire. Here, the vibration is coupled either to the coil or a magnet. Unfortunately, this scheme in the IoT sensor area provides too little voltage for rectification.

Electrostatic systems use the change in distance between two capacitive plates held at a constant voltage or charge. As the vibration causes the distance to change between the plates, energy (E) can be harvested based on the following model:



Here, Q is the constant charge on the plates, V is the constant voltage, and C represents capacitance in the preceding equation. Capacitance can also be represented by the length of the plate Lw, the relative static permittivity as ε0, and the distance between plates d as shown:



An electrostatic conversion has the advantage of being scalable and cost-efficient to produce through micromachining and semiconductor fabrication.

The last method for mechanical-to-electrical conversion is piezo-mechanical, which was talked about earlier in this chapter when discussing sensor input. The same basic concept applies to energy generation. As the piezo-mechanical MEMS device attempts to dampen the mass attached to it, the oscillations will be converted into an electrical current.

Another consideration for the capture and conversion of vibrational or mechanical energy is the need for conditioning before the energy is used or stored. Normally, a passive rectifier is used for conditioning by incorporating a large filtering capacitor. Other forms of energy harvesting do not need such conditioning.





RF energy harvesting





Radiofrequency (RF) energy harvesting has been in production for years in the form of RFID tags. RFID enjoys the benefit of being a near-field communication that uses a transceiver that essentially powers the RFID tag due to its close proximity.

For far-field applications, we need to harvest energy from broadcast transmissions. Broadcast transmissions are nearly everywhere, with service from televisions, cell signals, and radio. Capturing energy from radio frequencies versus other forms is particularly difficult, as RF signals have the smallest energy density of all harvesting techniques. The capturing of RF signals is based on having the appropriate antenna to capture a frequency band. Typical frequency bands used are in the 531 to 1611 kHz range (all in the AM radio range).





Thermal harvesting


Thermal energy can be converted into an electric current for any device exhibiting heat flow. Thermal energy can be converted into electrical energy by two basic processes:

Thermoelectric: Direct conversion of thermal energy into electrical energy through the Seebeck effect.

Thermionic: Also known as thermotunneling. Electrons are ejected from an electrode that is heated, and into an electrode that is cool.



The thermoelectric effect (Seebeck effect) is produced when a gradient of temperature exists in conducting materials. The flow of carriers from a hot to a cold region between two dissimilar electrical conductors creates a voltage differential. A thermocouple, or thermoelectric generator (TEG), could effectively produce voltage simply based on the temperature difference of a human, based on their core body temperature and outside temperature. A temperature difference of 5 degrees Celsius could generate 40 uW at 3V. As heat flows through the conduction material, a hot-side electrode induces electron flow to a cold-side electrode-producing current. Modern thermoelectric devices use n or p-type bismuth telluride in series. One side is exposed to the source of heat (called the thermocouple), and the other is isolated. The energy harvested by the thermopile is proportional to the square of the voltage and equivalent to the temperature difference between the electrodes. One can model the energy harvested by a thermocouple by the following equation:



Here S1 and S2 represent the different Seebeck coefficients for each of the two materials (n and p-type) in the thermopile when there is a temperature differential, TH -TL. Since the Seebeck coefficients are functions of temperature and there exists a temperature difference, the result is a voltage difference. This voltage is generally very small, so many thermocouples are used in series to form a thermopile.

One substantial problem with current thermocouples is the poor efficiency of the energy conversion (less than 10%); however, their advantages are notable, including their small size and ease of manufacturing, resulting in fairly low costs. They also have a very long lifetime of over 100,000 hours. The main problem, of course, is finding a relatively constant source of thermal variance. Using such a device in an environment throughout multiple seasons and temperatures is challenging. For IoT devices, thermoelectric generation typically resides in the 50 mW range.

Thermionic generation is based on the ejection of electrons from a hot electrode to a cold electrode over a potential barrier. The barrier is the work function of the material, and is best used when there is a significant source of heat energy. While its efficiencies are better than thermoelectric systems, the energy required to jump the potential barrier makes it generally unsuitable for IoT sensor devices. Alternative schemes such as quantum tunneling could be considered, but it currently remains a research activity.





Energy storage





Typical storage for an IoT sensor will be a battery or supercapacitor. When considering the architecture for sensor power, one must consider several aspects:





Volume allowance for a power subsystem. Will a battery even fit?

The battery energy capacity.

Accessibility. If the unit is embedded in concrete, limited forms of energy regeneration can be used, and the difficulty of replacing batteries can be costly.

Weight. Is the unit intended to fly as a drone, or float on water?

How often will the battery be recharged?

Is the renewable form of energy constantly available, or intermittent, as in solar?

The battery power characteristics. How the battery's energy will vary over time as it's discharged.

Is the sensor in a thermally constrained environment that can affect battery life and reliability?

Does the battery have a profile that guarantees minimum current availability?





Energy and power models


Battery capacity is measured in amp-hours. A simplified equation to estimate the life of a battery power source is given as:



In the equation, Cp is Peukert's capacity, I represents the discharge current, and n is Peukert's exponent. The Peukert effect, as it's known, helps predict the life of a battery where the capacity of a battery decreases at a different rate as discharge increases. The equation shows how discharging at higher rates removes more power from the battery. Alternatively, discharging at lower rates will increase the effective runtime of the battery. One way of thinking of this phenomenon is a battery manufacturer rated at 100 Ah, and discharging it fully in 20 hours (5A, for this example). If one were to discharge it faster (say, in 10 hours), the capacity would be lower. If one were to discharge it more slowly (say, over 40 hours), it would be greater. However, when represented on a graph, the relationship is nonlinear. Peukert's exponent usually lies between 1.1 and 1.3. As n increases, we move further from a perfect battery to one that discharges faster as the current increases. Peukert's curve applies to lead-acid battery performance, and an example is shown in this next graph:



Peukert curves from 1.1 to 1.5 for a battery rated at 100A over 20 hours. The curves show the declining capacity as the Peukert coefficient grows.

One can see the difference in discharge rates for various types of batteries. One advantage of alkaline batteries is that the discharge rate is almost linear in a large portion of the graph. Lithium-ion has a stair-step function in performance, thus making battery charge predictions more difficult. That said, Li-ion provides a near steady and continuous voltage level over the life of the charge, and consistently powers electronics over the span of its charge:



Example of relative discharge rates for various batteries. Li-ion provides a nearly constant voltage over its life, but has a precipitous drop towards the end of its storage capacity.

The graph also illustrates that lead acid and Ni-Cd have less voltage potential and a curvilinear degradation in power that can be computed more reliably. The trailing slopes are also indicative of Peukert's capacity.

Temperature greatly affects battery life, and specifically the electro-active carriers in a cell. As temperature increases, the internal resistance of a battery decreases when being discharged. Even when batteries are stored, they can self-discharge, which impacts the total lifetime of a battery.

A Ragone plot is a useful way to show the relationship between energy storage systems when trading off energy capacity and power handling. It is a log-based scale where the energy density (Wh/kg) of a power source is plotted against the power density (W/kg). This relationship shows devices that tend to have a greater lifetime (batteries) versus devices that tend to store more energy (supercapacitors):



Ragone plot depicting capacitor, supercapacitors, battery, and fuel cell differences in energy capacity versus lifetime supply of energy.

Batteries like Li-ion have higher energy density and discharge rates than nickel-cadmium and nickel-hydride batteries. Capacitors produce very high-power densities, but are relatively weak energy density. Note the plot is log-based, and also shows the discharge time for various storage systems. Image courtesy of C Knight, J. Davidson, S. Behrens "Energy Options for Wireless Sensor Nodes", Sensors, 2008, 8(12), 8037-8066.





Batteries


Typically, a lithium-ion (Li-ion) battery is the standard form of power in mobile devices due to its energy density. In such a battery, lithium-ions physically move from the negative electrode to the positive. During recharge, the ions move back to the negative region. This is known as an ionic movement.

Batteries also develop memories with many charge-discharge cycles. This capacity loss is expressed as a measure of the initial capacity (for example, 30% loss after 1,000 cycles). This degradation is almost directly correlated to environmental temperature, and loss will increase in a high-temperature environment. Therefore, it is imperative that the architects manage thermals in a constrained environment if lithium-ion is to be used.

Another factor in battery life is self-discharge. When unwanted chemical reactions occur in a battery cell, energy will be lost. The rate of loss depends on chemistry and temperature. Typically, a Li-ion can last for 10 years (at ~2% loss per month), while an alkaline battery will only last 5 years (15% to 20% loss per month).





Supercapacitors





Supercapacitors (or supercaps) store energy at significantly higher volumes than typical capacitors. A typical capacitor will have an energy density of somewhere between 0.01 Watt-hours/kg. A supercap has an energy density of 1 to 10 Watt-hours/kg, thus placing them closer to the energy density of a battery that can be on the order of 200 Watt-hours/kg. Like a capacitor, energy is stored electrostatically on a plate, and doesn't involve the chemical transfer of energy like a battery. Usually, supercaps are made of fairly exotic materials like graphene, which can impact on overall cost. Supercaps also have the advantage of charging to their full potential in seconds, whereas Li-ion batteries will charge within minutes to approximately 80%, but require a trickle current to safely get higher. Additionally, supercaps can't be overcharged, whereas Li-ion can be overcharged and can result in serious safety concerns. Supercaps come in two forms:





Electric double-layer capacitors (EDLC): Use an activated carbon electrode and store energy electrostatically

Psuedocapacitors: Use a transition metal oxide and electrochemical charge transfer



Supercaps have an advantage over batteries in predicting the remaining time power will be available. The remaining energy can be predicted from the terminal voltage, which changes over time. Lithium-ion batteries have a flat energy profile from fully charged to discharged, thus rendering time estimation difficult. Since the voltage profile of a supercap changes over time, a DC-DC converter is needed to compensate for wide variations in voltage.

In general, the main issues with supercaps or capacitors are the leakage current and the cost. As can be seen in the following table, supercaps have their place. One will often see them in a hybrid solution with regular batteries to provide instantaneous power (for example, electric vehicle acceleration), while the battery supply sustains running power.





Radioactive power sources





A radioactive source with a high energy density (105kJ/cm3) can generate thermal energy due to the kinetic energy of emitted particles. Sources such as cesium-137 have a half-life of 30 years and a power capacity of 0.015 W/gm. This method can generate power in the Watt-to-kW range, but isn't practical in low-power sensor levels for IoT deployments. Space vehicles have used this technology for decades. Promising developments using MEMS piezoelectronics that capture electrons and force a micro-armature to move can create mechanical energy that may be harvested. A secondary effect of radioactive decay is the relatively weak power density profile. A radiation source with a long half-life will have weaker power density. Thus, they are suitable for bulk-charging supercaps to provide momentary energy when needed. The final issue with radioactive sources is the significant weight of lead shielding required. Cesium-137 requires 80 mm/W of shielding, which can add significant cost and weight to an IoT sensor.





Energy storage summary and other forms of power


Choosing the correct power source is critical, as mentioned earlier. The following table provides a summary comparison of different components in a system to be considered when picking the correct power source:

Category

Li-ion Battery

Supercap



Energy density

200 Wh/kg

8-10 Wh/kg



Charge-discharge cycles

Capacity drops after 100 to 1,000 cycles

Nearly infinite



Charge-discharge time

1 to 10 hours

Milliseconds to seconds



Operational temperature

-20oC to +65oC

-40 degrees Celcius to +85 degrees Celsius



Operational voltage

1.2 V to 4.2 V

1 V to 3 V



Power delivery

Constant voltage over time

Linear or exponential decay



Charge rate

(Very slow) 40 C/x

(Very fast) 1,500 C/x



Operational life

0.5 to 5 years

5 to 20 years



Form factor

Very small

Large



Cost ($/kWh)

Low ($250 to $1000)

High ($10,000)





Summary





This chapter summarized several different sensors and endpoints used in IoT deployments. The IoT isn't about simply connecting a device to the internet. While that is a key component, the essence of IoT is connecting the analog world to the digital. Essentially, things and devices previously unconnected now have the opportunity to collect information and communicate it to other devices. This is powerful because data that had never been captured now has value. The ability to sense the environment will lead to more efficiencies, revenue streams, and value for customers. Sensing allows for smart cities, predictive maintenance, tracking assets, and analyzing the hidden meaning in massive aggregates of data. Powering such systems is also critical, and must be understood by architects. A poorly designed system can lead to too short a battery life, which will end in substantial costs to remediate.

The next chapter will bridge the endpoints to the internet through non-IP communication. We will explore various wireless personal area networks, and their various traits and functions that are prevalent in the IoT space.





Communications and Information Theory


The IoT is more than simply the data from a sensor. We must first understand and architect the transport of moving sensor data from the remotest places on Earth to the cloud. There are a significant number of technologies and data paths to move data, and a bulk of the material in this book will investigate the aspects, constraints, and comparisons of communication choices for the architect.

We begin the WAN discussion with a review of wireless RF signals and the contributing factors that impact signal quality, limitations, interference, models, bandwidth, and range. There are many WAN communication protocols to choose from in different bands, and the architect must understand the pros and cons of choosing one radio spectrum over the other.

The following graphic helps delineate the various range and data rates for wireless protocols we will cover in later chapters. WPAN is often used with other near-range communication acronyms such as wireless Field Area Network (FAN), Wireless Local Area Network (WLAN), wireless Home Area Network (HAN), wireless Neighborhood Area Network (NAN), and Wireless Body Area Network (WBAN):

Various wireless communication protocols and categories designed for different ranges, data rates, and use cases (power, vehicular, and so on.)

This chapter will provide foundational models and theory on communication systems, frequency spaces, and information theory. Communication constraints and comparison models will be provided to allow the architect to understand how and why certain types of data communication work, and where they won't work.

Next, we start with communication theory as it plays a fundamental part in choosing the correct mix of wireless technologies to deploy an IoT solution.





Communication theory





The IoT is a conglomeration of many disparate devices autonomously producing and/or consuming data on the very far edge of layers of networks and protocols. It is important to understand the constraints in building communication systems for the IoT or any form of networking. The internet of things will combine personal area networks, local area networks, and long-range wide area networks into a web of communication channels. Most of what makes the IoT possible is built around communication fabric; therefore, this chapter is dedicated to reviewing the fundamentals of network and communication systems. We will now focus on communication and signaling systems. We will explore the range, energy, and limitations of communication systems and how the architect will use these tools to develop a successful IoT solution.





RF energy and theoretical range


It is important when talking about wireless personal area networks, or any RF wireless protocol, to consider the range of transmission. Competing protocols use range, speed, and power as differentiators. As architects, we need to consider different protocols and design choices when implementing a complete solution. The range of transmission is based on the distance between transmitter and receiver antennas, the frequency of transmission, and the power of transmission.

The best form of RF transmission is unobstructed line-of-sight in a radio signal-free area. In most situations, this ideal model will not exist. In the real world, there are obstructions, reflections of signals, multiple wireless RF signals, and noise.

When considering a particular WAN and either a slower speed signal like 900 MHz versus a 2.4 GHz carrier signal, you can derive the attenuation of a function of wavelength for each frequency. This will provide guidance as to the signal strength at any range. The general form of the Friis transmission equation helps us here:



The decibel (dB) variant of the Friis equation is given as:

Where GTx and GRx are the transmitter and receiver antenna gains, R is the distance between the transmitter and receiver, and PR and PT are the receiver and transmitter power respectively.

>

Friis equation graphical representation.

A 900 MHz signal at 10 meters will have a loss of 51.5 dB and a 2.4 GHz signal at 10 meters will have a 60.0 dB loss.

We can prove how power and range affect the quality of a signal by using a ratio referred to as the link budget. This is a comparison of the transmission power to sensitivity level and is measured in the logarithmic (dB) scale. One may simply want to increase power level to meet range requirements, but in many instances, this violates regulatory compliance or affects battery life. The other option is to improve the receiver's sensitivity level, which is exactly what Bluetooth 5 did in the latest specification. The link budget is given by the ratio of transmitter power over the receiver sensitivity as shown.



The link budget is measured in the dB log scale; therefore, adding decibels is equivalent to multiplying the numeric ratios, which give us the equation:

Assuming there is no factor contributing to any signal gains (for example, antenna gains), the only two ways of improving reception is increasing the transmission power or decreasing the loss.

When an architect must model the maximum range of a particular protocol, he or she will use the Free Space Path Loss (FSPL) formula. This is the amount of signal loss of an electromagnetic wave over a line of sight in free space (no obstacles). The contributing factors of FSPLF are the frequency (f) of the signal, the distance (R) between transmitter and receiver, and the speed of light (c). In terms of calculating FSPLF in decibels, the equation is:

The FSPL formula is a simple first-order calculation. A better approximation takes into account reflections and wave interference from the earth ground plane, such as the plane earth loss formula. Here, ht is the height of the transmitting antenna and hr is the height of the receiving antenna. k represents the free space wave number, and is simplified as shown. We convert the equation to use dB notation:

What is notable of the plane earth loss is the fact that the distance affects the loss by 40 dB per decade. Increasing the antenna height helps. The types of interference that can naturally occur include:

Reflections: When a propagating electromagnetic wave strikes an object and results in multiple waves

Diffraction: When a radio wave path between a transmitter and receiver is obstructed by objects with sharp edges

Scattering: When the medium the wave travels through is comprised of objects smaller than the wavelength and the number of obstacles is large



This is an important concept since the architect must choose a WAN solution whose frequency balances the data bandwidth, the ultimate range of the signal, and the ability of the signal to penetrate objects. Increasing frequency naturally increases free space loss (for example, a 2.4 GHz signal has 8.5 dB less coverage than a 900 MHz signal). Generally speaking, 900 MHz signals will be reliable at twice the distance of 2.4 GHz signals. 900 MHz has a wavelength of 333 mm versus 125 mm for a 2.4 GHz signal. This allows a 900 MHz signal to have better penetration ability and not as much effect from scattering.

Scattering is a significant issue for WAN systems as many deployments do not have a free line of sight between antennas—instead the signal must penetrate walls and floors. Certain materials contribute differently to the attenuation of a signal.

A 6 dB loss equates to a 50% reduction in signal strength, while a 12 dB loss equates to a 75% reduction.

We see that 900 MHz has an advantage over 2.4 GHz in material penetration:

Material

Loss (dB)

900 MHz

Loss (dB)

2.4 GHz



0.25" Glass

-0.8 dB

-3 dB



Brick or Masonry Block Wall (8")

-13 dB

-15 dB



Sheet Rock

-2 dB

-3 dB



Solid Wood Door

-2 dB

-3 dB





Free Space Loss versus Plane Earth Loss (in dB) using a 2.4 GHz signal with antennas at 1 meter high.

As we will see, many protocols are commercially available and used globally in the 2.4 GHz spectrum. 2.4 GHz provides up to five times the data bandwidth as a 900 MHz signal and can have a much smaller antenna. Additionally, the 2.4 GHz spectrum is unlicensed and available for use in multiple countries.

900 MHz

2.4 GHz



Signal strength

Generally reliable

Crowded band subject to interference



Distance

2.67x further than 2.4 GHz

Shorter, but can compensate with improved encoding (Bluetooth 5)



Penetration

Long wavelength can penetrate most materials and vegetation

Potential for interference with some building material



Data rate

Limited

About 2x to 3x faster than 900 MHz



Signal interference

Signal can be affected by tall objects and obstructions, better through foliage

Less chance of channel interference with certain objects



Channel interference

Interference with 900 MHz cordless phones, RFID scanners, cell signals, baby monitors

Interference with 802.11 Wi-Fi



Cost

Medium

Low





These equations provide a theoretical model; no analytical equations give an accurate prediction for certain real-world scenarios such as multi-path losses.





RF interference


We will see throughout this chapter several novel schemes to reduce interference of signals. This is an issue for many forms of wireless technology as the spectrum is unlicensed and shared ( we will discuss this more in the next section). Because of the fact that there may be several devices emanating RF energy in a shared space, interference will occur.

Take Bluetooth and 802.11 Wi-Fi; both operate in the shared 2.4 GHz spectrum but remain functional even in congested environments. Bluetooth Low Energy (BLE), as we will see, will randomly select one of 40-2 MHz channels as a form of frequency hopping. We see in the following figure eleven free channels (three being advertising) on BLE that have a 15% chance of collision (especially since 802.11 does not hop between channels). The new Bluetooth 5 specification provides techniques such as slot availability masks to lock out Wi-Fi areas from the frequency hop list. Other techniques exist as well, which we will explore later. Here we show the ILM band for Zigbee and Bluetooth Low Energy. Also shown is a possible contention with three Wi-Fi channels in the 2.4 GHz spectrum.



Comparison of Bluetooth Low Energy (BLE) and Zigbee Interference with 802.11 Wi-Fi signals in the 2.4 GHz band. BLE provides more slots and frequency hopping to communicate in the event of Wi-Fi collisions.





Information theory





There are preliminary theories that need to be understood before detailing WAN specifics. Two areas that are germane to communication is how bitrate affects transmission power, which in turn affects range. There are limits to the integrity of data and bitrates, as we will learn. Additionally, we need to classify narrowband versus wideband communication.





Bitrate limits and the Shannon-Hartley theorem


In long-range communication and short-range communication, the goal is to maximize bitrate and distance within the constraints of spectrum and noise. The Shannon-Hartley theorem is composed of work from Claude Shannon of MIT in the 1940s (C. E. Shannon (1949/1998). The Mathematical Theory of Communication. Urbana, IL: University of Illinois Press) and Ralph Hartley from Bell Labs in the 1920s (R. V. L. Hartley (July 1928). "Transmission of Information" (PDF). Bell System Technical Journal). Foundational work was developed by Harry Nyquist, also of Bell Labs, who determined the maximum number of pulses (or bits) that could travel in a telegraph in a unit of time (H. Nyquist, Certain Topics in Telegraph Transmission Theory, in Transactions of the American Institute of Electrical Engineers, vol. 47, no. 2, pp. 617-644, April 1928).

Essentially, Nyquist developed the sampling limit that determines how much theoretical bandwidth one has at a given sample rate. This is called the Nyquist rate, and is shown in the following equation:



Here, fp is the pulse frequency and B is the bandwidth in Hertz. This states that the maximum bitrate is limited to twice the sampling rate. Looking at it another way, the equation identifies the minimum bitrate at which a finite bandwidth signal needs to be sampled to retain all information. Undersampling leads to aliasing effect and distortion.

Hartley then devised a way to quantify the information in what is called the line rate. The line rate can be thought of as bits per second (for example, Mbps). This is known as Hartley's law and is the precursor to Shannon's theorem. Hartley's law simply states the maximum number of distinguishable pulse amplitudes that can be transmitted reliably is limited by the dynamic range of the signal and the precision with which a receiver can accurately interpret each individual signal. Shown is Hartley's law in terms of M (number of unique pulse amplitude shapes) which is equivalent to the ratio of the number of voltage:



Converting the equation to a base-2 log gives us the line rate R:



If we combine this with the preceding Nyquist's rate, we get the maximum number of pulses that can be transmitted over a single channel of bandwidth B. Hartley, however, did not work out with precision; the value of M (number of distinct pulses) could be affected by noise.



Shannon reinforced Hartley's equation by considering the effects of Gaussian noise and completes Hartley's equation with a signal-to-noise ratio. Shannon also introduced the concept of error correction coding instead of using individually distinguishable pulse amplitudes. This equation is affectionately known as the Shannon-Hartley theorem:



Here, C is the channel capacity in bits per second, B is the channel bandwidth in Hertz, S is the average received signal measured in watts, and N is the average noise on the channel measured in watts. The effect of this equation is subtle but important. For every decibel level increase in noise to a signal, capacity drops precipitously. Likewise, improving the signal-to-noise ratio will increase capacity. Without any noise, the capacity would be infinite.

It is also possible to improve the Shannon-Hartley theorem by adding a multiplier n to the equation. Here, n represents additional antennas or pipes. We have reviewed this previously as multiple input, multiple output (MIMO) technology.



To understand how Shannon's rule applies to the limits of wireless systems mentioned in this book, we need to express the equation in terms of energy per bit rather than the signal-to-noise ratio (SNR). A useful example in practice is to determine the minimum SNR needed to achieve a certain bitrate. For example, if we want to transmit C=200 kbps over a channel with a bandwidth capacity of B=5000 kbps, then the minimum SNR required is given as:



This shows that it is possible to transmit data using a signal that is weaker than the background noise.

There is a limit to data rate, however. To show the effect, let Eb represent the energy of a single bit of data in joules. Let No represent the noise spectral density in watts/hertz. Eb/No is a dimensionless unit (however usually expressed in dB) that represents the SNR per bit, or commonly known as the power efficiency. Power efficiency expressions remove biases of modulation techniques, error coding, and signal bandwidth from the equation. We assume that the system is perfect and ideal such that the RB=C where R is the throughput. The Shannon-Hartley theorem can be rewritten as:



This is known as the Shannon limit for an Additive White Gaussian Noise (AWGN). An AWGN is a channel and is simply a basic form of noise used commonly in information theory to express the effects of random processes in nature. These noise sources are always present in nature and include things such as thermal vibrations, black body radiation, and the residual effects of the Big Bang. The "white" aspect of noise implies equal amounts of noise are added to each frequency.

The limit can be drawn on a graph showing spectral efficiency versus SNR per bit:



Spectral efficiency to SNR (power efficiency) curve. The dotted line represents Shannon Limit which converges at ln(2)=-1.6. Various modulation schemes are shown under the Shannon Limit with the typical range of 4G-LTE signals).

Regions of interest in the figure include the R>B "Impossible Region". This region is above the Shannon limit of the curve. It states that no reliable form of information exchange can be above the limit line. The region below the Shannon limit is called the "Realizable Region" and is where R<B. Every protocol and modulation technique in any form of communication attempts to approach as close as possible to the Shannon limit. We can see where typical 4G-LTE using various modulation forms exist.

There are two other regions of interest. A "Bandwidth Limited" region toward the upper-right allows for high spectral efficiency and good Eb/No SNR values. The only constraint in this space is trading off a fixed or mandated spectral efficiency against the unconstrained power of transmission P, meaning the capacity has grown significantly over the available bandwidth. The opposite effect is called the power limited region towards the bottom-left of the chart. The Power Limited region is where the Eb/No SNR is very low, therefore Shannon's limit forces us down to low values of spectral efficiency. Here, we sacrifice spectral efficiency to get a given transmission quality P.

An example of a power limited use case is a space flight vehicle, such as the Cassini probe to Saturn. In that case, the free path space loss of signal is extremely large and the only way to get reliable data is to drop the data rate to very low values. We also see this in Bluetooth 5 using the new BLE Coded PHY. In that case, Bluetooth drops from 1 or 2 Mbps to as low as 125 kbps to improve range and data integrity.

The chart also shows some typical modulation schemes used today such as phase shifting, QAM, and others. The Shannon limit also shows that arbitrarily improving a modulation technique such as quadrature amplitude modulation for 4-QAM to 64-QAM doesn't scale linearly. The benefit of higher orders of modulation (for example, 4-QAM versus 64-QAM) is the fact that you can transmit more bits per symbol (two versus six). The main disadvantage with higher orders of modulation are:

Using higher order modulations requires ever greater SNR to operate.

Higher orders of modulation require much more sophisticated circuitry and DSP algorithms contributing to complexity

Increasing the transfer of bits per symbol will increase the error rate



The Shannon theorem states that there is a maximum rate of information that can be transmitted over a communication channel in the presence of additive Gaussian white noise. As the noise decreases, the rate of information will increase but has an ultimate bound that cannot be breached. In any situation, if the transmission rate R is less than the channel capacity C, then there should be a method or technology to transmit the data without error.





Bit error rate


Another important characteristic of data transmission is the Bit error rate (BER). BER refers to the number of bit errors received over a communication channel. BER is a unitless measurement expressed as a ratio or percentage. For example:

If an original transmission sequence is: 1 0 1 0 1 1 0 1 0 0

And the received sequence is: 0 0 1 0 1 0 1 0 1 0 (differences in bold)

Then the BER is 5 errors / 10 bits transferred = 50%

BER is affected by channel noise, interference, multipath fading, and attenuation. Techniques to improve BER include increasing transmission power, improving receiver sensitivity, using less dense/lower order modulation techniques, or adding more redundant data. The last technique is typically referred to as forward error correction (FEC). FEC simply adds extra information to a transmission. In the most basic sense, one would add triple redundancy and a majority vote algorithm; however, this would reduce bandwidth by 3x. Modern FEC techniques include hamming codes and Reed-Solomon error correct codes. The BER can be expressed as a function of Eb/No SNR.

The following diagram shows a variety of modulation techniques and their respective BERs for various SNRs:



Bit error rates (Pb) versus power efficiency (Eb/No) SNR for various modulation schemes. As the SNR increases towards the right the BER naturally decreases.

What should be understood at this point is the following:

We can now calculate the minimum SNR needed to achieve a certain data rate for a system

The only way to add more capacity or bandwidth to a wireless service is to: Add more spectrum and channel capacity, which improves the bandwidth linearly

Add more antennas (MIMO), which improves the bandwidth linearly

Improve the SNR with advanced antennas and receivers, which only improves the equation logarithmically





The Shannon limit is the ultimate bound of digital transmission; exceeding the limit is possible, but the data integrity will be lost

Factors that contribute to noise

One cannot simply increase modulation levels without incurring costs to error rates and complexity



For 4G-LTE cellular signals, which are covered later in this book, it operates in the 700 MHz to 5 GHz spectrum with dozens of segregated bands within that range. A cell phone (or battery-based IoT device) has substantially less power than a cell tower, but it is often the case that an IoT device will be transmitting sensor data to the cloud. The uplink from the IoT device is what we examine here. The limit to uplink power is 200mW maximum, which is 23 dBm. This limits the overall range of the transmission; that limit, however, is dynamic and will vary based on the bandwidth of the channel and the data rate. 4G systems, like several WPAN and WLAN devices, use orthogonal frequency-division multiplexing. Each channel has many sub-carriers to address the multipath fading problems. If you sum all the data transmitting over sub-carriers, you achieve high data rates.

4G-LTE generally uses 20 MHz channels and LTE-A can use 100 MHz channels. These wide channels are limited by the overall spectrum of availability and are in contention with multiple carriers (ATT, Verizon, and so on) and other technologies sharing the spectrum. An additional complexity of cellular communication is that a carrier may have portions of the spectrum divided up and disjoint from each other.

Cat-3 LTE can use five, 10, or 20 MHz channels. The smallest channel granularity is 1.4 MHz. LTE-A is allowed to aggregate up to five 20-MHz channels for an aggregate bandwidth of 100 MHz.

A method to measure the distance a wireless device is functional is the Maximum coupling loss (MCL). The MCL is the maximum distance at which total channel loss occurs between a transmitter and a receiving antenna but data service can still be delivered. MCL is a very common way to measure the coverage of a system. MCL will include antenna gains, path loss, shadowing, and other radio effects. Generally, a 4G-LTE system will have an MCL of about 142 dB. We will revisit MCL when examining the cellular IoT technologies such as Cat-M1.

What we should grasp at this point is that if we increase the listening time per bit, the noise level will go down. If we reduce the bitrate by 2x, then the following is true: (Bit_Rate / 2) = (Bit_Duration * 2). Additionally, energy per bit increases by 2x and noise energy increases by sqrt(2). For example, if we reduce the Bit_Rate from 1 Mbps to 100 kbps, then Bit_Duration = increases by 10x. The range improves by the sqrt(10) = 3.162x.





Narrowband versus wideband communication


Many of the wireless protocols that we will cover are known as wideband. We will see that the converse (narrowband) also has a place, especially for LPWAN. The differences between narrowband and wideband are as follows:

Narrowband: A radio channel whose operational bandwidth does not exceed the channel's coherence bandwidth. Generally, when we talk about narrowband, we speak to signals that are 100 kHz or smaller in bandwidth. In narrowband, multipath causes amplitude and phase changes. A narrowband signal will fade uniformly, so adding more frequencies does not benefit the signal. Narrowband channels are also called flat fading channels because they usually will pass all spectral components with equal gain and phase to one another.

Wideband: A radio channel whose operation bandwidth may significantly exceed its coherence bandwidth. These are generally greater than 1 MHz in bandwidth. Here, multipath causes the "self-interference" problem. Wideband channels are also called frequency-selective since different parts of the overall signal will be affected by the different frequencies in wideband. This is why wideband signals use a diverse range of frequencies to distribute power across many coherence bands to reduce fading effects.



Coherence time is a measure of the minimum time required for an amplitude or phase change to become uncorrelated from the previous value.

We have covered some forms of fading effects; however, there are many more. Path loss is a typical case where the loss is proportional to distance. Shadowing is where terrain, buildings, and hills create signal obstructions versus free space, and multipath fading occurs with the recombined scattering and wave interference of a radio signal on objects (due to diffraction and reflections). Other loss includes doppler shifts if the RF signal is in a moving vehicle. There are two categories of the fading phenomenon:

Fast fading: This is characteristic of multipath fading when the coherence time is small. The channel will change every few symbols; therefore, coherence time will be low. This type of fading is also known as Rayleigh fading, which is the probability of random variances that cause an RF signal due to atmospheric particles or heavily built-up metropolitan areas.

Slow fading: This occurs when the coherence time is long and there is movement over long distances usually due to doppler spreading or shadowing. Here, the coherence time is long enough to successfully transmit significantly more symbols than a fast fade path.



The following figure illustrates the difference between fast and slow fading paths.



Different RF Signal Fading Effects. From left to right: General path loss across a line of sight. Middle: Effects of slow fading due to large structures or terrains. Right: Combined effects of distance, slow fading, and fast fading.

We will see that technologies employing narrowband signals use what is known as time diversity to overcome issues with fast fading. Time diversity simply means the signal and payload are transmitted multiple times in the hope that one of the messages gets through.

In a multipath scenario, the delay spread is the time between pulses from various multipath signals. Specifically, it is the delay between the first arrival of a signal and the earliest arrival of a multipath component of the signal.

The coherence bandwidth is defined as the statistical range of frequencies in which a channel is considered flat. This is a period of time when two frequencies are likely to have comparable fading. The coherence bandwidth Bc is inversely proportional to the delay spread D:



The time at which a symbol can be transmitted without intersymbol interference is 1/D. The following figure illustrates coherence bandwidth for narrowband and wideband communication. Since wideband is larger than the coherence bandwidth Bc it is more likely to have independent fading attributes. That implies different frequency components will experience uncorrelated fading. Whereas, narrowband frequency components all fit within Bc and will experience uniform fading.



Coherence bandwidth and effects on narrowband and wideband. Frequencies f1 and f2 will fade independently if |f1 - f2| Bc. Here narrowband is clearly shown to reside within Bc and wideband clearly exceeds the range of Bc by some margin.

One must ensure that the time between sending multiple signals from a multipath scenario. is spread far enough as not to interfere with symbols. This is called Inter-Symbol Interference (ISI). The following figure illustrates a delay spread being too short as to cause ISI. Given that the overall bandwidth B>> 1/T (where T is the pulse width time) and B1/D is implied, we can then generally state that bandwidth must be much larger than the coherence bandwidth: B>>Bc.





Delay spread example. Here 2 signals from a form a multipath event. If the delay spread D is less than the pulse width T then the signals may not be spread far enough to override another multipath component. Whereas if the delay spread is large enough there may be no multipath conflict.

Generally, lower frequencies have a greater penetrating ability and less interference, but require larger antennas and have less available bandwidth for transmission. Higher frequencies have greater path loss but smaller antennas and more bandwidth.

The overall bitrate will be impacted by the delay spread. For example, say we use QPSK modulation and the BER is 10-4, then for various delay spreads (D) we have:

D= 256μS: 8 KBps

D=2.5 μS: 80 KBps

D=100 ns: 2 Mbps





The radio spectrum





Wireless communication is based on radio waves and bands of frequencies within the overall radio spectrum. We will cover long-range communication in the next chapter for cellular and other long-range mediums, here we focus on the 1000 meter range or less. Here, we will look at the spectrum allocation process as well as the typical frequency uses for WAN devices.





Governing structure


The spectrum ranges from 3 Hz to 3 THz, and allocation within the spectrum is governed by the International Telecommunication Union (ITU). A band is considered a portion of the spectrum that can be allocated, licensed, sold, or freely used depending on the frequency. From an ITU perspective, the bands are categorized as follows:



Within the United States, the Federal Communications Commission (FCC) and the National Telecommunications and Information Administration (NTIA) control the frequency spectrum usage rights. The FCC administrates the non-Federal spectrum usage, while the NTIA administers the Federal usage (army, FAA, FBI, and so on).

The overall spectrum managed by the FCC ranges from the KHz spectrum through and including the GHz frequencies. The overall frequency distribution and allocation is shown below. Highlighted are the interesting frequencies that will be discussed in this book.



Full frequency allocation spectrum of the FCC with highlights of ranges covered in this book.

The following figure shows a small portion of the allocation of frequencies within the 900 MHz to 2.7 GHz range (common for WPAN signals) and how the frequencies are currently allocated and distributed. In many areas, the usage is multi-purpose and shared:



FCC and NTIA frequency allocation chart between 300 MHz and 3GHz. The chart represents a small portion of the overall frequency allocation. Source: FCC, "United States Frequency Allocations The Radio Spectrum", October 2003

The FCC also assigns frequencies in licensed and unlicensed spectrums. In the "unlicensed" or "licensed exempt" areas, users can operate without an FCC license but must use certified radio equipment and comply with technical requirements such as power limits and duty cycles. These are detailed in the FCC Part 15 Rules document. Users can operate within these spectrums but are subject to radio interference.





The licensed areas of the spectrum allow for exclusive usage for particular areas/locations. The allocation may be granted on a national basis or in discrete segments site by site. Since 1994, exclusivity and rights to these areas of the spectrum have been granted by auction for particular areas/segments/markets (for example, cellular market areas, economic areas, and so on). Some bands can be a hybrid of the two models, where bands may have been licensed on a site-by-site basis and later bands surrounding those licenses were auctioned for larger geographic or national areas. The FCC also allows for a secondary market and has established policies and procedures through spectrum leasing and transfer of control.

IoT deployments will typically use the licensed regions for long-range communication, which is covered in the next chapter. The unlicensed spectrum is typically used for Industrial, Scientific and Medical (ISM) devices. For IoT, IEEE 802.11 Wi-Fi, Bluetooth, and IEEE 802.15.4 protocols all reside in the 2.4 GHz unlicensed spectrum.





Summary





This chapter has provided foundation material to understand the theory and limitations of wireless communication. More information and deeper study are encouraged to understand the second and third order constraints of data transport. The architect should understand different models and constraints of wireless signals, RF energy dispersion, range, and the fundamental limits of information theory provided by Shannon's law. The architect should also understand the frequency space governance and allocation strategy. This chapter also provides a dialog and vernacular that will be reused in the upcoming chapters on WPAN, WLAN, and WAN.

The next chapter will start the journey of IoT data from the sensor to the cloud on its first hop across a near range personal area network. We build up from there to WLAN and WAN systems.





Non-IP Based WPAN


Sensors, and other things connected to the internet, need a method of transmitting and receiving information. This is the topic of personal area network (PAN) and near-range communication. In an IoT ecosphere, communication to a sensor or actuator can be a copper wire or a Wireless Personal Area Networks (WPANs). In this chapter, we concentrate on the WPAN as that is the prevalent method for industrial, commercial, and consumer connections to the things of the internet. Wire-based connectivity is still used, but primarily in legacy industries and areas that are not radio-frequency friendly. There is a wide variety of different communication channels between the endpoint and the internet; some may be built on a traditional IP stack (6LoWPAN) and others use non-IP (internet protocol) communication to maximize energy savings (BLE).

We separate out IP and non-IP, as IP-based communication systems need further detail that non-IP communication doesn't necessarily need. Non-IP communication systems are optimized for cost and energy usage, whereas IP-based solutions usually have fewer constraints (for example, 802.111 Wi-Fi). The next chapter will detail the overlap of IP on the WPAN and WLAN.

This chapter will cover non-IP standards of communication, various topologies of WPAN networks (mesh, star), and constraints and goals of WPAN communication systems. These types of communication systems operate in the near meter to about 200-meter range (although some can reach much further). We will go deep into the Bluetooth® wireless protocol and the new Bluetooth 5.0 specification, as it sets a foundation to understand other protocols and is a prevalent and powerful part of IoT solutions.

This chapter will include technical details on proprietary and open standards. Each communication protocol has been adopted for certain reasons and use cases; they too will be covered in this chapter. Focus topics of this chapter include:

RF signal quality and range

Wireless spectrum allocation

Bluetooth wireless protocol with special focus on the new Bluetooth 5 specification

802.15.4

Zigbee®

Z-Wave®





Wireless personal area network standards





This section will explore three relevant wireless personal area networks in the IoT space. A good portion of this section will be dedicated to Bluetooth as it provides a significant number of features and has a very deep presence in the IoT ecosphere. Additionally, Bluetooth 5.0 adds many features and abilities not seen before in the Bluetooth specification and provides range, power, speed, and connectivity that make it the strongest WPAN solution for many use cases. Zigbee, Z-Wave, and IEEE 802.15.4-based networks will also be investigated.

It is also helpful to know that the term WPAN is overloaded. Originally, it was to be a literal body and personal area network on a specific individual connected to wearable devices, but it has now extended its meaning.





802.15 standards





Many of the protocols and network models described in this section are based upon or have a foundation in the IEEE 802.15 working groups. The 802.15 group was initially formed to focus on wearable devices (coining the phrase personal area network). Their work has expanded significantly and now focuses on higher data rate protocols, meter to kilometer ranges, and specialty communications. Over one million devices are shipped each day using some form of 802.15.x protocol.

The following is a list of the various protocols, standards, and specifications that the IEEE maintains and governs:





802.15: Wireless personal area network definitions

802.15.1: Original foundation of the Bluetooth PAN

802.15.2: Coexistence specifications for WPAN and WLAN for Bluetooth

802.15.3: High data rate (55 Mbps+) on WPAN for multimedia



802.15.3a: High-speed PHY enhancements

802.15.3b: High-speed MAC enhancements

802.15.3c: High-Speed (>1 GBps) using mm-wave (millimeter wave) technology





802.15.4: Low data rate, simple, simple design, multi-year battery life specifications (Zigbee)



802.15.4-2011: Rollup (specifications a-c) includes UWB, China, and Japan PHYs

802.15.4-2015: Rollup (specifications (d-p) includes RFID support, medical-band PHY, low energy, TV white spaces, rail communications

802.15.4r (on hold): Ranging protocol

802.15.4s: Spectrum Resource Utilization (SRU)

802.15.t: High rate PHY of 2 Mbps





802.15.5: Mesh networking

802.15.6: Body area networking for medical and entertainment

802.15.7: Visible light communications using structured lighting



802.15.7a: Extends range to UV and near-IR, changed name to optical wireless





802.15.8: Peer Aware Communications (PAC) infrastructure-less peer to peer at 10 Kbps to 55 Mbps

802.15.9: Key Management Protocol (KMP), management standard for key security

802.15.10: Layer 2 mesh routing, recommend mesh routing for 802.15.4, multi PAN

802.15.12: Upper layer interface, attempts to make 802.15.4 easier to use 802.11 or 802.3



The consortium also has working groups investigating dependability (IG DEP) to address wireless reliability and resilience, high data rate communications (HRRC IG), and terahertz communications (THz IG).





Bluetooth





Bluetooth is a low-power wireless connectivity technology used pervasively in technology from cell phones sensors, and keyboards to video game systems. The name Bluetooth refers to King Harald Blatand in the region of what is now Norway and Sweden in around 958AD. King Blatand got his name from his liking of blueberries and/or the eating of his frozen enemies. Regardless, Bluetooth is derived from his name because King Blatand brought together warring tribes, and the same could be said for the formation of the initial Bluetooth SIG. Even the Bluetooth logo is a combination of runes from an ancient Germanic alphabet used by the Danes. Today, Bluetooth is prevalent and this section will focus on the new Bluetooth 5 protocol ratified by the Bluetooth SIG in 2016. Other variants will be called out as well.

This section will detail Bluetooth technology with special emphasis on the new Bluetooth 5.0 specification. To learn more about older Bluetooth technologies, refer to the Bluetooth SIG at www.bluetooth.org.





Bluetooth history


Bluetooth technology was first conceived at Ericsson in 1994 with the intent to replace the litany of cables and cords connecting computer peripherals with an RF medium. Intel and Nokia also joined in with the intent to wirelessly link cell phones to computers in a similar manner. The three formed an SIG in 1996 at a conference held at the Ericsson plant in Lund, Sweden. By 1998, there were five members of the Bluetooth SIG: Intel, Nokia, Toshiba, IBM, and Ericsson. That year, version 1.0 of the Bluetooth specification was released. Version 2.0 was later ratified in 2005 when the SIG had over 4000 members. In 2007, the Bluetooth SIG worked with Nordic Semiconductor and Nokia to develop Ultra Low Power Bluetooth, which now goes by the name Bluetooth Low Energy (BLE). BLE brought an entirely new segment to the market in devices that could communicate using a coin cell battery. By 2010, the SIG released the Bluetooth 4.0 specification, which formally included BLE. Currently, there are over 2.5 billion shipping Bluetooth products and 30,000 members in the Bluetooth SIG.

Bluetooth has been used extensively in IoT deployments for some time, being the principal device when used in low energy mode (LE) for beacons, wireless sensors, asset tracking systems, remote controls, health monitors, and alarm systems.

Throughout its history, Bluetooth and all the optional components have been under GPL license and are essentially open source.

The revision history of Bluetooth as it has grown in features and abilities is shown in the following table:

Revision

Features

Release date



Bluetooth 1.0 and 1.0B

Basic rate Bluetooth (1 Mbps)



Initial version released.

1998



Bluetooth 1.1

IEEE 802.15.1-2002 standardized

1.0B specification defects resolved

Non-encrypted channel support



Received Signal Strength Indicator (RSSI)

2002



Bluetooth 1.2

IEEE 802.15.1-2005



Rapid connection and discovery

Frequency hopping spread spectrum (AFH)

Host controller interface (three-wire UART)



Flow control and retransmission modes

2003



Bluetooth 2.0

(+EDR optional)

Enhanced Data Rate Mode (EDR): 3 Mbps

2004

Bluetooth 2.1

(+EDR optional)

Secure Simple Pairing (SSP) using public key cryptography with four unique authentication methods Extended Inquiry Response (EIR) allows for better filtering and reduced power

2007



Bluetooth 3.0

(+ EDR optional)

(+HS optional)

L2CAP enhanced retransmission mode (ERTM) for reliable and unreliable connection states

Alternate MAC/PHY (AMP) 24 Mbps using 802.11 PHY



Unicast connectionless data for low latency

Enhanced power control

2009



Bluetooth 4.0

(+ EDR optional)

(+HS optional) (+LE optional)

AKA BluetoothSmart



Introduced Low Energy mode (LE)

Introduced ATT and GATT protocols and profiles

Dual mode: BR/EDR and LE mode



Security manager with AES encryption

2010



Bluetooth 4.1

Mobile wireless service (MWS) coexistence

Train nudging (coexistence feature)

Interlaced scanning (coexistence feature)

Devices support multiple simultaneous roles

2013



Bluetooth 4.2

LE secure connections



Link layer privacy



IPv6 support profile

2014



Bluetooth 5.0 Slot availability masks (SAM) 2 Mbps PHY and LE

LE long range mode

LE extended advertising modes

Mesh networking

2016





Bluetooth 5 communication process and topologies


Bluetooth wireless is comprised of two wireless technology systems: Basic Rate (BR) and Low Energy (LE or BLE). Nodes can either be advertisers or scanners by this definition:

Advertiser: Devices transmitting advertiser packets

Scanner: Devices receiving advertiser packets without the intention to connect

Initiator: Devices attempting to form a connection



There are several Bluetooth events that transpire in a Bluetooth WPAN:

Advertising: Initiated by a device to broadcast to scanning devices to alert them of the presence of a device wishing to either pair or simply relay a message in the advertisement packet.

Connecting: This event is the process of pairing a device and a host.

Periodic advertising: (for Bluetooth 5) allows an advertising device to periodically advertise over the 37 non-primary channels by channel hopping at an interval of 7.5ms to 81.91875s.

Extended advertising: (for Bluetooth 5) allows for extended PDUs to support advertisement chaining and large PDU payloads, possibly as well as new use cases involving audio or other multimedia (covered in the Beaconing section of this chapter).



In LE mode, a device may complete an entire communication by simply using the advertising channel. Alternatively, communication may require pair-wise bi-directional communication and force the devices to formally connect. Devices that must form this type of connection will start the process by listening to advertising packets. The listener is called an initiator in this case. If the advertiser issues a connectable advertising event, the initiator can make a connection request using the same PHY channel it received the connectable advertising packet on.

The advertiser can then determine if it wishes to form a connection. If a connection is formed, the advertising event ends and the initiator is now called the master and the advertiser is called the slave. This connection is termed a piconet in Bluetooth jargon and connection events transpire. The connection events all take place on the same starting channel between the master and slave. After data has been exchanged and the connection event ends, a new channel can be chosen for the pair using frequency hopping.

Piconets form in two different fashions depending on BR/EDR mode or BLE mode. In BR/EDR, the piconet uses three-bit addressing and can only reference seven slaves on one piconet. Multiple piconets can form a union and then be called a scatternet, but there must be a second master to connect to and manage the secondary network. The slave/master node takes on the responsibility of bridging two piconets together. In BR/EDR mode, the network uses the same frequency hopping schedule and all the nodes will be guaranteed to be on the same channel at a given time. In BLE mode, that system uses 24-bit addressing so the number of slaves associated with a master is in the millions. Each master-slave relationship is itself a piconet and can be on a unique channel. In a piconet, nodes may be a master (M), slaves (S), standby (SB), or parked (P). Standby mode is the default state for a device. In this state, it has the option to be in a low-power mode. Up to 255 other devices can be in an SB or P mode on a single piconet.

Note that Bluetooth 5.0 has deprecated and removed parked states in piconets; only Bluetooth devices up to version 4.2 will support a parked state. Standby state is still supported by Bluetooth 5.0.

A piconet topology is illustrated in the following diagram:



The difference between classic (BR/EDR) Bluetooth and BLE piconets. In BR/EDR mode up to seven slaves can be associated on a single piconet due to 3-bit addressing. They all share a common channel between the seven slaves. Other piconets can join the network and form a scatternet only if an associated master on the secondary network is present. In BLE mode millions of slaves can join in multiple piconets with a single master due to 24-bit addressing. Each piconet can be on a different channel but only one slave can associate with the master in each piconet. Practically speaking, BLE piconets tend to be much smaller.





Bluetooth 5 stack


Bluetooth has three basic components: a hardware controller, host software, and application profiles. Bluetooth devices come in single and dual-mode versions, which means they either support only the BLE stack or they support classic mode and BLE simultaneously. In the following figure, one can see the separation between the controller and host at the Host Controller Interface (HCI) level. Bluetooth allows for one or more controllers to be associated with a single host.

The stack consists of layers, or protocols and profiles:

Protocols: Horizontal tiers and layers representing functional blocks. The following diagram represents a stack of protocols.

Profiles: Represent vertical functions that use protocols. Profiles will be detailed in a later section, but cover generic attribute profiles and generic access profiles.



The following figure represents a comprehensive architectural diagram of the Bluetooth stack. Including BR/EDR and BLE modes as well as AMP mode.



Bluetooth Single Mode (BLE only) and Dual Mode (Classic and BLE) versus a comparison to simplified OSI stack. The right-side diagram illustrates the AMP mode. Note the separation of responsibilities between the host software platform with the upper stack and the controller hardware for the bottom stack. HCI is the transport channel between the hardware and the host.

There are essentially three Bluetooth modes of operation shown in the preceding figure (each requiring a different PHY):

Low Energy (LE) mode: This uses the 2.4 GHz ISM band and employs FHSS for interference protection. The PHY differs from BR/EDR and AMP radios by modulation, coding, and data rates. LE operates at 1 Msym/s at a bit rate of 1 Mbps. Bluetooth 5 allows for multiple configurable data rates of 125 Kbps, 500 Kbps, 1 Mbps, and 2 Mbps (more on this later).

Basic Rate/Enhanced Data Rate mode (BR/EDR): This uses a different radio than LE and AMP but operates in the ISM 2.4 GHz band. Basic radio operation is rated at 1 Msym/s and supports a bit rate of 1 Mbps. EDR sustains a data rate of 2 or 3 Mbps. This radio uses FHSS for interference protection.

Alternative MAC/PHY (AMP): This is an optional feature that uses 802.11 for high-speed transport up to 24 Mbps. This mode requires both the master and slave device to support AMP. This is a secondary physical controller, yet requires the system to have a BR/EDR controller to establish initial connection and negotiation.



We will now detail the function of each element of the stack. We start with the common blocks of BR/EDR and LE then list details for AMP. In all three cases, we will start with the physical layer and move up the stack towards the application layer.

Core architectural blocks:

Controller level: BR/EDR PHY (controller block): Responsible for transmitting and receiving packets through a physical channel on 79 channels.

LE PHY: Low energy physical interface responsible for managing 40 channels and frequency hopping.

Link controller: Encodes and decodes Bluetooth packets from the data payload.

Baseband resource manager: Responsible for all access to the radio from any source. Manages the scheduling of physical channels and negotiates access contracts with all entities to ensure QoS parameters are met.

Link manager: Creates, modifies, and releases logical links and updates parameters related to physical links between devices. It is reused for BR/EDR and LE modes using different protocols.

Device manager: Block in the controller baseband level that controls the general behavior of Bluetooth. Responsible for all operations not related to data transmission, including making devices discoverable or connectable, connecting to devices, and scanning for devices.

Host Controller Interface (HCI): This is a separation between the host and the silicon controller in layer four of the network stack. It exposes interfaces to allow a host to add, remove, manage, and discover devices on the piconet.





Host level: L2CAP: This is the logical link control and adaptation protocol. It is used to multiplex logical connections between two different devices using higher level protocols than the physical layer. It can segment and reassemble packets.

Channel manager: Responsible for creating, managing, and closing L2CAP channels. A master will use the L2CAP protocol to communicate to a slave channel manager.

Resource manager: Responsible for managing the ordering of submission of fragments to the baseband level. Helps ensure the quality of service conformance.

Security Manager Protocol (SMP): Also known as security manager protocol. This block is responsible for generating keys, qualifying keys, and storing keys.

Service Discovery Protocol (SDP): Discovers services offered on other devices by UUID.

Audio: An optional efficient streaming audio playback profile.

RFCOMM: This block is responsible for RS-232 emulation and interfacing and is used for supporting telephony functionality.

Attribute protocol (ATT): A wire application protocol used mainly in BLE (but can apply to BR/EDR). Optimized to run on BLE low power battery-based hardware. ATT is tightly coupled to GATT.

Generic Attribute Profile (GATT): This block represents the functionality of the attribute server and, optionally, the attribute client. The profile describes the services used in the attribute server. Every BLE device must have a GATT profile. Principally, if not exclusively, used for BLE but could be used on a vanilla BR/EDR device.

Generic Access Profile (GAP): Controls connections and advertising states. Allows a device to be visible to the outside world and forms the basis of all other profiles.





AMP-specific stack: AMP (PHY): Physical layer responsible for transmission and reception of data packets up to 24 Mbps.

AMP MAC: This is the media access control layer as defined in the IEEE 802 reference layer model. It provides address methods for the device.

AMP PAL: Layer interfacing the AMP MAC with the host system (L2CAP and AMP manager). This block translates commands from the host into specific MAC primitives and vice versa.

AMP manager: Uses L2CAP to communicate with a peer AMP manager on a remote device. Discovers remote AMP devices and determines their availability.





Bluetooth 5 PHY and interference


Bluetooth devices operate in the 2.4000 to 2.4835 GHz industrial, scientific, and medical (ISM) unlicensed frequency band. As mentioned earlier in this chapter, this particular unlicensed area is congested with a number of other wireless media, such as 802.11 Wi-Fi. To alleviate interference, Bluetooth supports frequency-hopping spread spectrum (FHSS).

When having a choice between Bluetooth classic modes of BR/EDR, EDR will have less of a chance of interference and better coexistence with Wi-Fi and other Bluetooth devices since the on-air time is shorter due to its speed.

Adaptive Frequency Hopping (AFH) was introduced in Bluetooth 1.2. AFH uses two types of channels: used and unused. Used channels are in-play as part of the hopping sequence. Unused channels are replaced in the hopping sequence by used channels when needed in a random replacement method. BR/EDR mode has 79 channels and BLE has 40 channels. With 79 channels, BR/EDR mode has less than a 1.5 percent chance of interfering with another channel. This is what allows an office setting to have hundreds of headphones, peripherals, and devices all in the same range contending for frequency space (for example, fixed and continuous use sources of interference).

AFH allows a slave device to report channel classification information to a master to assist in configuring the channel hopping. In situations where there is interference with 802.11 Wi-Fi, AFH is used with a combination of proprietary techniques to prioritize traffic between the two networks. For example, if the hopping sequence regularly collides on channel 11, the master and slaves within the piconet will simply negotiate and hop over channel 11 in the future.

In BR/EDR mode, the physical channel is divided into slots. Data is positioned for transmission in precise slots and consecutive slots can be used if needed. By using this technique, Bluetooth achieves the effect of full-duplex communication through Time Division Duplexing (TDD). BR uses Gaussian Frequency-Shift Keying (GFSK) modulation to achieve its 1 Mbps rate, while EDR uses Differential Quaternary Phase Shift Keying (DQPSK) modulation to 2 Mbps and 8-phase differential phase-shift keying (8DPSK) at 3 Mbps.

LE mode, on the other hand, uses Frequency Division Multiple Access (FDMA) and Time Division Multiple Access (TDMA) access schemes. With 40 channels rather than 79 for BR/EDR and each channel separated by 2 MHz, the system will divide the 40 channels into three for advertising and the remaining 37 for secondary advertising and data. Bluetooth channels are chosen pseudorandomly and are switched at a rate of 1600 hops/second. The following figure illustrates BLE frequency distribution and partitioning in the ISM 2.4 GHz space.



BLE frequencies partitioned into 40 unique bands with 2MHz separation. 3 Channels dedicated to advertising the remaining 37 dedicated to data transmission.

TDMA is used to orchestrate communication by requiring one device to transmit a packet at a predetermined time and the receiving device to respond at another predetermined time. The physical channels are subdivided into time units for particular LE events such as advertising, periodic advertising, extended advertising, and connecting. In LE, a master can form a link between multiple slaves. Likewise, a slave can have multiple physical links to more than one master and a device can be both a master and slave simultaneously. Role changes from master to slave or vice versa are not permitted.

As noted previously, 37 of the 40 channels are for data transmission but three are dedicated for advertising. Channels 37, 38 and 39 are dedicated to advertising GATT profiles. During advertising, a device will transmit the advertising packet on all three channels simultaneously. This helps increase the probability that a scanning host device will see the advertisement and respond.

Other forms of interference occur with mobile wireless standards in the 2.4 GHz space. Here, a technique called train nudging was introduced in Bluetooth 4.1.

Bluetooth 5.0 introduced Slot Availability Masks (SAM). SAM allows two Bluetooth devices to indicate to each other the time slots that are available for transmission and reception. A map is built, indicating time slot availability. With the mapping, the Bluetooth controllers can refine their BR/EDR time slots and improve overall performance.

For BLE modes, SAM is not available. However, an overlooked mechanism in Bluetooth called Channel Selection Algorithm 2 (CSA2) can help with frequency hopping in noisy environments susceptible to multipath fading. CSA2 was introduced in Bluetooth 4.1 and is a very complex channel mapping and hopping algorithm. It improves the interference tolerance of the radio and allows the radio to limit the number of RF channels it can use in high interference locations. A side effect of limiting channels with CSA2 is it allows the transmit power to increase to +20dBm. As mentioned, there are limits to transmitting power imposed by governing regulatory bodies since BLE advertising channels and connected channels are so few. CSA2 allows for more channels to be available in Bluetooth 5 than in previous versions, which may open up regulatory restrictions.





Bluetooth packet structure


Every Bluetooth device has a unique 48-bit address called the BD_ADDR. The upper 24 bits of the BD_ADDR refer to the manufacturer specific address and are purchased through the IEEE Registration Authority. This address includes the Organization Unique Identifier (OUI), also known as the company ID, and is assigned by the IEEE. The 24 least significant bits are free for the company to modify.

Three other secure and randomized address formats are available but will be discussed in the BLE security portion of this chapter. The following diagram shows the BLE advertising packet structure and various PDU types. This represents some of the most commonly used PDUs.



Common BLE Advertising and data packet formats. Several other packet types exist and should be referenced in the Bluetooth 5.0 Specification.





BR/EDR operation


Classic Bluetooth (BR/EDR) mode is connection-orientated. If a device is connected, the link is maintained even if no data is in being communicated. Before any Bluetooth connection transpires, a device must be discoverable for it to respond to scans of a physical channel and subsequently respond with its device address and other parameters. A device must be in a connectable mode to monitor its page scan.

The connection process proceeds in three steps:

Inquiry: In this phase, two Bluetooth devices have never associated or bonded; they know nothing of each other. The devices must discover each other through an inquiry request. If the other device is listening, it may respond with its BR_ADDR address.

Paging: Paging or connecting forms a connection between the two devices. Each device knows the BD_ADDR of each other at this point.

Connected: There are four sub-modes of the connection state. This is the normal state when two devices are actively communicating: Active mode: This is the normal mode of operation for transmission and receiving of Bluetooth data or waiting for the next transmission slot.

Sniff mode: This is a power saving mode. The device is essentially asleep but will listen for transmissions during specific slots that can be changed programmatically (for example, 50 ms).

Hold mode: This is a temporary low power mode initiated by the master or slave. It will not listen for transmissions like sniff mode, and the slave temporarily ignores ACL packets. While in this mode, switching to the connected state occurs very quickly.

Park mode: As stated earlier, this mode is deprecated in Bluetooth 5.





A state diagram of these phases is as follows:

Connection process for Bluetooth from the unconnected device in standby mode, device query, and discovery, connected/transmitting mode, and low-power modes.

If this process completes successfully, the two devices can be forced to automatically connect when they are in range. The devices are now pairing. The one-time pairing process is most common in connecting smartphones to a vehicle stereo, but it can apply anywhere in the IoT as well. Paired devices will share a key that is used in the authentication process. More will be covered on keys and authentication in the security section of Bluetooth.

Apple recommends using a sniff mode set at a 15 ms interval. This saves significant power over keeping the device in an active mode, but also allows for better sharing of the spectrum with Wi-Fi and other Bluetooth signals in the area. Additionally, Apple recommends a device should first set an advertising interval for initial discovery by a host to 20 ms and broadcast that for 30 seconds. If the device still can't connect to the host, the advertising interval should be increased programmatically to increase the chance of completing the connection process. See Bluetooth Accessory Design Guidelines for Apple Products Release 8, Apple Computer, June 16, 2017.





BLE operation


In Bluetooth Low Energy mode, there are five link states that are negotiated by the host and device:

Advertising: Devices that transmit the advertising packets on the advertising channels.

Scanning: Devices that receive advertising on the advertising channels without intention to connect. Scanning can be active or passive: Active scanning: Link layer listens for advertising PDUs. Depending on the received PDU, it may request an advertiser to send additional information.

Passive scanning: Link layer will only receive packets, transmission disabled.





Initiating: Devices that need to form a connection to another device listen for connectable advertising packets and initiate by sending a connect packet.

Connected: There is a relationship between master and slave in the connected state. The master is the initiator and the slave is the advertiser: Central: An initiator transforms the role and title to the central device.

Peripheral: Advertising device becomes the peripheral device.





Standby: Device in the unconnected state.



The advertising state has several functions and properties. Advertisements can be general advertisements where a device broadcasts a general invitation to some other device on the network. A directed advertisement is unique and designed to invite a specific peer to connect as fast as possible. This advertisement mode contains the address of the advertising device and the invited device.

When the receiving device recognizes the packet, it will immediately send a connect request. The directed advertisement is to get fast and immediate attention and the advertisements are sent at a rate of 3.75 ms, but only for 1.28 seconds. A non-connectable advertisement is essentially a beacon (and may not even need a receiver). We will describe beacons later. Finally, the discoverable advertisement can respond to scan request, but it will not accept connections. Shown in the following state diagram are the five link states of BLE operation.



The BLE Link States.

A BLE device that has not previously bonded with a host initiates communication by broadcasting advertisements on the three advertising channels. The host can respond with a SCAN_REQ to request more information from the advertising device. The peripheral device responds with a SCAN_RSP and includes the device name or possibly services.

The SCAN_RSP can affect power usage on a peripheral device. If the device supports scan responses it must keep its radio active in receive mode, consuming power. This occurs even if no host device issues a SCAN_REQ. It is advisable to disable scan responses on IoT peripherals that are under power constraints.

After scanning, the host (scanner) initiates a CONNECT_REQ, at which point the scanner and advertiser will send empty PDU packets to indicate acknowledgment. The scanner is now termed the master and the advertiser is termed the slave. The master can discover slave profiles and services through the GATT. After discovery is complete, data can be exchanged from the slave to the master and vice versa. Upon termination, the master will return to a scanning mode and the slave will return to an advertiser mode. The following figure illustrates the BLE pairing process from advertising through data transmission.



Phases of BLE advertising, connecting, GATT service query and data transmission.





Bluetooth profiles


Applications interface with various Bluetooth devices using profiles. Profiles define the functionality and features for each layer of the Bluetooth stack. Essentially, profiles tie the stack together and define how layers interface with each other. A profile describes the discovery characteristics that the device advertises. They are also used to describe the data formats of services and characteristics that applications use to read and write to devices. A profile doesn't exist on a device; rather, they are predefined constructs maintained and governed by the Bluetooth SIG.

The basic Bluetooth profile must contain a GAP as stated by the specification. The GAP defines the radio, baseband layer, link manager, L2CAP, and service discovery for BR/EDR devices. Likewise, for a BLE device, the GAP will define the radio, link layer, L2CAP, security manager, attribute protocol, and generic attribute profile.

The ATT attribute protocol is a client-server wire protocol optimized for low-power devices (for example, the length is never transmitted over BLE, it is implied by the PDU size). ATT is also very generic and much is left to the GATT to provide assistance. The ATT profile consists of:

A 16-bit handle

A UUID to define the attribute type

A value containing the length



The GATT logically resides on top of ATT and is used primarily, if not exclusively, for BLE devices. The GATT specifies the roles of the server and client. A GATT client is usually a peripheral device and the GATT server is the host (PC, smartphone). A GATT profile contains two components:

Services: A service breaks up data into logical entities. There can be multiple services in a profile and each service has a unique UUID to distinguish it from others.

Characteristics: A characteristic is the lowest level of a GATT profile and contains raw data associated with the device. Data formats are distinguished by 16-bit or 128-bit UUIDs. The designer is free to create their own characteristics that only their application can interpret.



The image below represents an example of a Bluetooth GATT profile with corresponding UUIDs for various services and characteristics.



GATT Profile Hierarchy and example GATT used on Texas Instruments CC2650 SensorTag

The Bluetooth SIG maintains a collection of many GATT profiles. At the time of writing, there are 57 GATT profiles supported on the Bluetooth SIG: https://www.bluetooth.com/specifications/gatt. Profiles supported by the SIG include everything from health monitors, cycling and fitness devices, environmental monitors, human interface devices, indoor positioning, object transfer, and location and navigation services, along with many others.





BR/EDR security


Bluetooth security has existed as part of the protocol since 1.0 in some form. We discuss security for BR/EDR mode and BLE separately as the mechanisms are different. Starting with BR/EDR mode, there are multiple modes of authenticating and pairing. For both BR/EDR and BLE security, it is recommended to read and follow the latest security guide provided by the US National Institute of Standards and Technology: Guide to Bluetooth Security, NIST Special Publication (SP) 800-121 Rev. 2, NIST, 5/8/2017.

Pairing requires the generation of a secret symmetric key. In BR/EDR mode, this is called the link key, while in BLE mode it's termed the long-term key. Older Bluetooth devices used a Personal Identification Number (PIN) pairing mode to initiate link keys. Newer devices (4.1+) use secure simple pairing.

Secure Simple Pairing (SSP) provides a pairing process with a number of different association models for various use cases. SSP also uses public key cryptography to protect from eavesdropping and Man-in-the-Middle attacks (MITM). The models supported by SSP include:

Numeric comparison: For use cases where both Bluetooth devices can display a six-digit numeric value allowing a user to enter a yes/no response on each device if the numbers match.

Passkey entry: Used in situations where one device has a numeric display and the other only has a numeric keyboard. In this case, the user enters the value seen on the first device's display on the second device's keyboard.

Just WorksTM : For situations where one device is headless and has no keyboard or display. It only provides minimal authentication and will not thwart a MITM attack.

Out-of-band (OOB): This is used when the device has a secondary form of communication such as NFC or Wi-Fi. The secondary channel is used for discovery and cryptographic value exchange. It will only protect from eavesdropping and MITM if the OOB channel is secure.



Authentication in BR/EDR mode is a challenge-response action; for example, entering a PIN on a keypad. If the authentication fails, the device will wait for an interval before allowing a new attempt. The interval grows exponentially with each failed attempt. This is simply to frustrate the individual attempting to manually break a key code.

Encryption in BR/EDR mode can be set so that it is disabled for all traffic, so that it is encrypted for data traffic but broadcast communication will be raw, or so that all communication is encrypted. The encryption uses AES-CCM cryptography.





BLE security





BLE pairing (explained earlier in this chapter) starts by a device initiating a Pairing_Request and exchanging capabilities, requirements, and so on. Nothing involving security profiles occurs at the initial phase of a pairing process. For that matter, the pairing security is similar to the BR/EDR four methods (also known as association models), but differs slightly in Bluetooth BLE 4.2:





Numeric comparison: This is the same as Just Works, but at the end, both devices will generate a confirmation value that is displayed on the host and device screens for the user to validate the match.

Passkey entry: Similar to BR/EDR mode, except that the non-initiating device creates a random 128-bit seed called a nonce to authenticate the connection. Every bit of the passkey is authenticated separately on each device by generating a confirmation value for that bit. The confirmation values are exchanged and should match. The process continues until all bits are processed. This provides a fairly robust solution for MITM attacks.

Just WorksTM : After devices exchange public keys, the non-initiating device creates a nonce to generate a confirmation value Cb. It transmits the nonce and Cb to the initiating device, which in turn generates its own nonce and transmits it to the first. The initiating device will then confirm the authenticity of the non-initiating nonce by generating its own Ca value which should match Cb. If it fails to match, the connection is corrupt. This again is different to BR/EDR mode.

Out-of-band (OOB): This is the same as in BR/EDR mode. It will only protect from eavesdropping and MITM if the OOB channel is secure.



In BLE, (as of Bluetooth 4.2) key generation uses LE secure connections. LE secure connection was developed to resolve the security hole in BLE pairing that allowed an eavesdropper to see the pairing exchange. This process uses a long-term key (LTK) to encrypt the connection. The key is based on an elliptical-curve Diffie-Hellman (ECDH) public key cryptography. Both the master and slave will generate ECDH public-private key pairs. The two devices will exchange their public portion of their respective pairs and process the Diffie-Hellman key. At this point, the connection can be encrypted using AES-CCM cryptography.

BLE also has the ability to randomize its BD_ADDR. Remember, the BD_ADDR is a 48-bit MAC-like address. Rather than a static address for the value, as mentioned earlier in this chapter, there are three other options:





Random static: These addresses are either burned into the device’s silicon during manufacture or generated when the device power cycles. If a device routinely power cycles, a unique address will be generated and this remains secure as long as the frequency of power cycling is high. In an IoT sensor environment, that may not be the case.

Random private resolvable: This addressing method can only be used if the Identity Resolving Key (IRK) is exchanged between the two devices during the bonding process. The device will use the IRK to encode its address into a random address in the advertisement packet. A second device that also possesses the IRK will convert the random address back into the authentic address. In this method, the device will periodically generate a new random address based off the IRK.

Random private non-resolvable: The device address is simply a random number and a new device address can be generated at any time. This offers the highest level of security.





Beaconing


Bluetooth beaconing is a secondary effect of BLE; however, it is an important and significant technology for IoT. Because beacons are not necessarily sensors, we didn't cover them explicitly in the Chapter 3, Sensors, Endpoints, and Power Systems (although some do provide sensing information in an advertisement packet). Beaconing is simply using Bluetooth devices in LE mode to advertise on some periodic basis. Beacons never connect or pair with a host. If a beacon were to connect, all advertisements would stop and no other device could hear that beacon. The three use cases important to retail, healthcare, asset tracking, logistics, and many other markets are:

Static point of Interest (POI)

Broadcasting telemetry data

Indoor positioning and geolocation services



Bluetooth advertising uses a message to contain further information in the broadcast UUID. An app on a mobile device can respond to this advertisement and perform some action if the correct advertisement is received. A typical retail use case would make use of a mobile app that would respond to the presence of a beacon advertisement in the vicinity and pop up an ad or sale information on the user's mobile device. The mobile device would communicate over Wi-Fi or cellular to retrieve additional content as well as provide critical market and shopper data to the company.

Beacons can transmit their calibrated RSSI signal strength as an advertisement. The signal strength of beacons is calibrated by manufacturers typically at a one-meter length. Indoor navigation can be performed in three different ways:

Multiple beacons per room: This is a simple triangulation method to determine a user's location-based on the advertised RSSI signal strength collected from numerous beacons in a room. Given the advertised calibrated level from each beacon and the received strength from each beacon, an algorithm could determine the approximate location of a receiver in a room. This assumes all beacons are in a fixed place.

One beacon per room: In this scheme, one beacon is placed in each room, allowing a user to navigate between rooms and halls with the fidelity of the location being a room. This is useful in museums, airports, concert venues, and so on.

Few beacons per building: In combination with accelerometers and gyros in a mobile device, multiple beacons in a building can allow for dead reckoning ability in a large open space. This allows a single beacon to set a starting location and the mobile device to reckon its location based on user movement.



There are two fundamental beaconing protocols used: Eddystone by Google and iBeacon by Apple. Legacy Bluetooth devices can only support a beacon message of 31 bytes. This restricts the amount of data a device can convey. Elaborate schemes have been used to help reduce the packet size and encode the message.

An entire iBeacon message is simply a UUID (16 bytes), a major number (two bytes), and minor number (two bytes). The UUID is specific to the application and use case. The major number further refines the use case and minor extends the use case to an even narrower case.

iBeacons provide two ways to detect devices:

Monitoring: Monitoring works even if the associated smartphone application is not actively running

Ranging: Ranging works only if the application is active



Eddystone (also know as UriBeacons) can transmit four different types of frames with varying length and frame encoding:

Eddystone-URL: This is the uniform resource location. This frame allows a receiving device to display web content based on the location of the beacon. An app does not need to be installed to activate the content. The content is variable in length and applies unique compression schemes to reduce the size of the URL to a limit of 17 bytes.

Eddystone-UID: 16-byte unique beacon ID with a 10-byte namespace and six-byte instance. Uses Google Beacon Registry to return attachments.

Eddystone-EID: A short-lived identifier for beacons requiring higher levels of security. No fixed namespace and ID, the identifiers constantly rotate and require an authorized app to decode. Uses Google Beacon Registry to return attachments.

Eddystone-TLM: Broadcasts telemetry data about the beacon itself (battery level, time since power-on, advertisement count). Broadcasts alongside URI or URL packets.



The following diagram illustrates the Bluetooth BLE advertisement packet structure for Eddystones and iBeacons. The iBeacon is simplest with a single type of frame of consistent length. Eddystone consists of four different types of frames and has variable lengths and encoding formats. Note that some fields are hard-coded such as the length, type, and company ID for iBeacon, as well as the identifier for Eddystone.



Example difference between iBeacon and Eddystone advertising packets (PDU).

The scanning intervals and advertising intervals attempt to minimize the number of advertisements necessary to convey useful data within a period of time. The scanning window is usually a longer duration than the advertisement as scanners essentially have more power than a coin cell battery in a beacon. The following figure shows a process of a beacon advertising every 180 ms while the host scans every 400 ms.



An example of a host scanning with a scan interval of 400 ms and a scan window of 180 ms.

The beacon advertises every 150ms on the dedicated channels 37,38,39. Notice the ordering of the advertising channels isn't consecutive as frequency hopping may have adjusted the order. Some advertisements have failed to reach the host since the scan interval and advertising interval is out of phase. Only a single advertisement in the second burst reach the host on channel 37, but by design, Bluetooth advertises on all three channels in an attempt to maximize the chance of success.

There are two fundamental challenges with architecting a beacon system. The first is the effect of advertising intervals versus the fidelity of location tracking. The second is the effect of advertising intervals versus the longevity of the battery powering the beacon. Both effects balance each other and careful architecture is needed to deploy correctly and extend the life of the battery.

The longer the interval between beacon advertisements, the less accuracy a system will have on a moving target. For example, if a retailer is tracking the location of patrons in a store and the patrons move at walking speed of 4.5 feet/second and a set of beacons advertises every four seconds versus another deployment that advertises every 100 ms, it will reveal different paths of motion to the retailer gathering market data. The following figure illustrates the effects of slow and fast advertising in a retail use case.



The effects of high-frequency advertising versus low-frequency advertising on location fidelity. The integers represent customer time spent at a particular point in the store.

A four-second advertising interval loses accuracy of the customer as they move about a store. Additionally, the amount of time spent at a particular point can only be tracked at discrete intervals of 4 seconds. The time spent at position B and C (as the customer leaves the store) may be lost. In this case, the retailer may want to understand why the customer spent 7.8 seconds at location B and why the customer went back to point C on their way out.

The counter effect of frequent advertising is the impact on beacon battery life. Typically, the batteries in beacons are Li-ion CR2032 coin cells. The Hitchhikers Guide to iBeacon Hardware: A Comprehensive Report by Aislelabs. Web 14 March, 2016 (https://www.aislelabs.com/reports/beacon-guide/) has performed an analysis of battery life for some common beacons and altered their advertising interval (100 ms, 645 ms, and 900 ms). They also used different batteries with increasing stored energy. The results show that the average life ranges from 0.6 months to over one year depending on the chipset, but more importantly on the advertising interval. Along with the advertising interval, Tx power certainly affects the overall battery life, but so does the number of frames transmitted.

Setting advertising intervals too long, while beneficial for battery life and bad for location awareness, has a secondary effect. If the beacon is operating in a noisy environment and the interval is set high (>700 ms), the scanner (smartphone) will have to wait another full period to receive the advertisement packet. This can lead to apps timing out.

A fast 100 ms interval is useful to track fast-moving objects (such as asset tracking in fleet logistics or drone-based beacon harvesting). If the architect is designing to track human movement at a typical rate of 4.5 feet/second, then a 250 ms to 400 ms is adequate.



A valuable exercise for the IoT architect is to understand the cost of transmission in terms of power. Essentially, the IoT device has a limited number of PDUs it can send out before the battery reaches a point where it will not be able to power the device unless refreshed or energy is harvested (Chapter 4, Communications and Information Theory). Assume an iBeacon is advertised every 500 ms and the packet length is 31 bytes (it may be longer). Additionally, the device uses a CR2032 coin cell battery rated at 220mAh at 3.7V. The beacon electronics consume 49uA at 3V. We can now predict the life of the beacon and the efficiency of the transmission:

Power consumption = 49uA x 3V = 0.147mW

Bytes per second = 31 x (1 second/500 ms) x 3 channels = 186 bytes/second

Bits per second = 186 bytes/second x 8 = 1488 bits/second

Energy per bit = 0.147 mW / (1488 bits/second) = 0.098 uJ/bit

Energy used for each advertisement = 0.098 uJ/bit x 31 bytes x 8 bits/byte = 24.30 uJ/advertisement

Energy stored in battery: 220mAh x 3.7V x 3.6 seconds = 2930 J

Life of battery = (2930 J x (1,000,000 uJ/J)) / ((24.30 uJ/advertisement) x (1 advertisement / 0.5 seconds)) x 0.7 = 42,201,646 seconds = 488 days = 1.3 years



The constant 0.7 is used for allowances in the decline of battery life, as described in Chapter 4, Communications and Information Theory. 1.3 years is a theoretical limit and most likely will not be obtained in the field due to factors such as leakage current as well as other functionalities of the device that may need to run periodically.

A final note on beacons with respect to Bluetooth 5. The new specification extends the length of beacon advertisements by allowing for advertisement packets to be transmitted in the data channels as well as the advertisement channels. This fundamentally breaks the limit of an advertisement being limited to 31 bytes.

With Bluetooth 5, the message size can be 255 bytes. The new Bluetooth 5 advertisement channels are called secondary advertisement channels. They ensure backward compatibility with legacy Bluetooth 4 devices by defining a specific Bluetooth 5 extended type in the header. Legacy hosts will throw out the unrecognized header and simply not listen to the device.





If a Bluetooth host receives a beacon advertisement that indicates there is a secondary advertisement channel, it recognizes that more data will need to be found in the data channels. The payload of the primary advertisement packet no longer contains beacon data, but a common extended advertising payload that identifies a data channel number and a time offset. The host will then read from that particular data channel at the indicated time offset to retrieve the actual beacon data. The data could also point to another packet (this is referred to as multiple secondary advertisement chains).

This new method of transmitting very long beacon messages ensures large amounts of data could be sent to customer smartphones. Other use cases and features are now enabled as well, such as the advertisement being used to transmit synchronous data such as audio streams. A beacon could send audio lectures to a smartphone as a visitor walks around a museum and looks at various art pieces.

Advertisements can also be anonymized, meaning the advertisement packet does not need to have the transmitter's address bound to it. Thus, when a device produces an anonymous advertisement, it does not transmit its own device address. This can improve privacy and reduce power consumption.

Bluetooth 5 can also transmit multiple individual advertisements (with unique data and different intervals) nearly simultaneously. This will allow Bluetooth 5 beacons to transmit Eddystone and iBeacon signals at nearly the same time without any reconfiguration. Additionally, the Bluetooth 5 beacon can detect if it is scanned by a host. This is powerful because the beacon can detect if a user received an advertisement and then stop transmitting to conserve power.





Bluetooth 5 range and speed enhancement


Bluetooth beacon strength is constrained and can be affected by limits placed on the transmitter power to preserve battery life. Usually, a line of sight is needed for optimal beacon range and signal strength. Shown below is the signal strength to distance curve for typical line-of-sight Bluetooth 4.0 communication.



Beacon strength is limited. Often a manufacturer limits the Tx power of a beacon to preserve battery life. As one move from the beacon, the signal strength drops as expected. Typically a 30-foot range is a usable beacon distance (Bluetooth 4.0) Bluetooth also has different power levels, ranges, and transmission power based on a classification for each device: Class number

Max output level (dBm)

Max output power (mW)

Max range

Use case



1

20 dBm

100 mW

100 m

USB adapter, access points



1.2

10 dBm

10 mW

30 m (typical 5 m)

Beacons, wearables



2

4 dBm

2.5 mW

10 m

Mobile devices, Bluetooth adapters, smart card reads



3

0 dBm

1 mW

10 cm

Bluetooth adapters





Bluetooth 5 has improved the range as well as data rate beyond legacy Bluetooth limits. A new radio PHY is available with Bluetooth 5 called LE2M. This doubles the raw data rate of Bluetooth from 1M symbol/second to 2M symbols/second. To transfer an equal amount of data on Bluetooth 5 as opposed to Bluetooth 4, less time will be needed for transmission. This is particularly relevant for IoT devices that operate on coin cells. The new PHY also increases the power from +10 dBm to +20 dBm, allowing for greater range.

With respect to range, Bluetooth 5 has another optional PHY for extended range transmission in BLE. This auxiliary PHY is labeled LE coded. This PHY still uses the 1M symbol/second rate as in Bluetooth 4.0, but reduces lower packet coding of 125 Kb/s or 500 Kb/s and increases the transmission power by +20dBm. This has the effect of increasing the range by 4x over Bluetooth 4.0 and having better penetration within buildings. The LE coded PHY does increase power consumption for the benefit of increased range.





Bluetooth mesh introduction


After the Bluetooth 5 specification was released the SIG focused on formalizing mesh networking in Bluetooth. The Bluetooth SIG published the mesh profile, device, and model specification 1.0 on July 13, 2017. This comes six months after the Bluetooth 5.0 specification was released. Before the official specification with Bluetooth 5 by the Bluetooth SIG, there had existed proprietary and ad hoc schemes using older Bluetooth versions to build mesh fabrics. The three specifications published by the Bluetooth SIG are as follows:

Mesh profile specification 1.0: Defines the fundamental requirements to enable an interoperable mesh networking solution

Mesh model specification 1.0: Basic functionality of nodes on the mesh network

Mesh device properties 1.0: Defines the device properties required for the mesh model specification



It is not yet known if there is any limit to the size of the mesh network. There are some limits built into the specification. As of the 1.0 specification, there can be up to 32,767 nodes in a Bluetooth mesh and 16,384 physical groups. The maximum time-to-live, which is indicative of the depth of the mesh, is 127.

Bluetooth 5 mesh theoretically allows for 2128 virtual groups. Practically, grouping will be much more constrained.

Bluetooth mesh is based on BLE and sits on the BLE physical and link layer described earlier. On top of that layer is a stack of mesh-specific layers:

Models: Implements behaviors, states, and bindings on one or more model specifications.

Foundation models: Configuration and management of the mesh network.

Access layer: Defines format of application data, encryption process, and data verification.

Upper transport layer: Manages the authentication, encryption, and decryption of data passing to and from the access layer. Transports control messages such as friendships and heartbeats.

Lower transport layer: Performs segmentation and reassembly (SAR) of fragmented PDUs if necessary.

Network layer: Determines which network interface to output messages on. Manages the various address types and supports many bearers.

Bearer layer: Defines how mesh PDUs are handled. Two types of PDUs are supported: advertising bearer and GATT bearer. The advertising bearer handles the transmission and reception of mesh PDUs, while the GATT bearer provides a proxy for devices that don't support the advertising bearer.

BLE: The complete Bluetooth LE specification.



Bluetooth mesh can incorporate mesh networking or BLE functions. A device that is capable of mesh and BLE support can communicate to other devices like smartphones or have beacon functions. Shown below is the Bluetooth mesh stack. What is important to realize is the replacement of the stack above the link layer.



Bluetooth Mesh Specification 1.0 Stack





Bluetooth mesh topology


Bluetooth mesh uses the concept of a flood network. In a flood network, each incoming packet received by a node in the mesh is sent through every outgoing link, except the link to the parent of the message. Flooding has the advantage that if a packet can be delivered, it will be delivered (albeit probably many times via many routes). It will automatically find the shortest route (which can vary by signal quality and distance in a dynamic mesh). The algorithm is the simplest to implement as far as routing protocols are concerned. Additionally, it requires no central manager such as a Wi-Fi network based around a central router. For comparison, the alternate types of mesh routing include tree-based algorithms. With tree algorithms (or cluster-tree algorithms), a coordinator is necessary to instantiate the network and becomes the parent node. Trees aren't necessarily true mesh networks, however. Other mesh routing protocols include proactive routing, which keeps up-to-date routing tables on each node, and reactive routing, which only updates routing tables on each node on demand; for example, when data needs to be sent through a node. Zigbee (covered later) is a form of proactive routing called an Ad Hoc On-Demand Distance Vector (AODV). The following figure illustrates a flood broadcast. The time arrival at each level can vary dynamically from node to node. Additionally, the mesh network must be resilient to duplicate messages arriving at any node as in the case of node 7 and node D.



Flood Mesh Architecture. S= Source, D=Destination.Source produces data which propagates and flows through every node in the mesh.

The main disadvantage with a flood network is bandwidth waste. Depending on the fan out from each node, the congestion on a Bluetooth mesh can be significant. Another issue is a denial-of-service attack. If the mesh simply fans out messages, a facility is needed to know when to stop transmissions. Bluetooth accomplishes this through time-to-live identifiers, which we will cover later.

The nodes in a Bluetooth mesh include the following:

Nodes: These are Bluetooth devices that have been previously provisioned and are members of a mesh.

Unprovisioned devices: These are devices with the potential to join a mesh fabric that is not yet part of a mesh and has not been provisioned.

Elements: A node with multiple constituent parts. Each part can be independently controlled and addressed. An example could be a Bluetooth node with temperature, humidity, and lumens sensors. This would be a single node (sensor) with three elements.

Mesh gateway: A node that can translate messages between the mesh and a non-Bluetooth technology.



Once provisioned, a node may support an optional set of features, which include:

Relay: A node that supports relay is termed a relay node and can retransmit messages received.

Proxy: Allows for Bluetooth LE devices that do not support Bluetooth mesh natively to interact with nodes on the mesh. This is performed using a proxy node. The proxy exposes a GATT interface with the legacy Bluetooth device, and a proxy protocol based on a connection-oriented bearer is defined. The legacy device reads and writes to the GATT proxy protocol and the proxy node transforms the messages into true mesh PDUs.

Low power: Some nodes on the mesh need to obtain extremely low levels of power consumption. They may serve up environmental sensor information (such as temperature) once an hour and be configured by a host or cloud managed tool once a year. That type of device cannot be placed in a listening mode when a message will only arrive once a year. The node enters a role termed the low power node (LPN), which pairs it with a friend node. The LPN enters a deep sleep state and polls the associated friend for any messages that may have arrived while it was sleeping.

Friend: The friend node is associated with the LPN but is not necessarily power constrained like an LPN. A friend may use a dedicated circuit or wall power. The friend's duty is to store and buffer messages destined for the LPN until the LPN wakes and polls it for messages. Many messages may be stored and the friend will transmit them in order using a more data (MD) flag.



The following diagram illustrates a Bluetooth mesh topology with the various components as they would be associated with one another in a real mesh.



Bluetooth Mesh Topology. Note the classes including Nodes, LPNs, Friends, Gateways, Relay Nodes, and Unprovisioned Nodes.

A Bluetooth mesh will cache messages on each node; this is crucial in a flood network. As the same message may arrive at different times from different sources, the cache provides a lookup of recent messages received and processed. If the new message is identical to one in the cache, it is discarded. This ensures system idempotence.

Each message carries a time-to-live field (TTL). If a message is received by a node and then re-transmitted, the TTL is decremented by one. This is a safety mechanism to prevent endless loops, and networks create amplifying denial-of-service attacks internal to the mesh.

A heartbeat message is broadcast periodically from each node to the mesh. The heartbeat informs the fabric that the node is still present and healthy. It also allows the mesh to know how far away the node is and if it has changed distance since the last heartbeat. Essentially, it is counting the number of hops to reach the node. This process allows the mesh to re-organize and self-heal.





Bluetooth mesh addressing modes


Bluetooth mesh uses three forms of addressing:

Unicast addressing: Uniquely identifies a single element in the mesh. The address is assigned during the provisioning process.

Group addressing: This is a form of multicast addressing that can represent one or more elements. These are either predefined by the Bluetooth SID as SIG fixed group addresses or assigned on the fly.

Virtual addressing: An address can be assigned to more than one node and more than one element. Virtual addressing uses a 128-bit UUID. The intent is the UUID can be preset by a manufacturer to allow them to address their product globally.



The Bluetooth mesh protocol starts with 384-byte long messages that are segmented into 11-byte parcels. All communication in a Bluetooth mesh is message-orientated. There are two forms of messages that can be transmitted:

Acknowledged messages: These require a response from node(s) that receive the message. The acknowledgment also includes data that the originator requested in the original message. Therefore, this acknowledged message serves dual purposes.

Unacknowledged messages: These do not require a response from the receiver.



To send a message from a node is also known as publishing. Nodes configured to process select messages sent to particular addresses is termed subscribing. Each message is encrypted and authenticated using a network key and an application key.

The application key is particular to an app or use case (for example, turning a light on versus configuring the color of an LED light). Nodes will publish events (light switches) other nodes will subscribe to those events (lamps and lightbulbs). The following figure illustrates a Bluetooth mesh topology. Here, nodes can subscribe to multiple events (lobby lights and hallway lights). The circles represent group addresses. A switch would publish to a group.



Bluetooth Mesh Publish-Subscribe model.

Bluetooth mesh introduces the concept of group messaging. In a mesh, you may have a grouping of similar objects such as bath lights or lobby lights. This aids in usability; for example, if a new light is added, only that light needs to be provisioned, and the rest of the mesh doesn't need any change.

The light switches in the preceding example have two states: on and off. Bluetooth mesh defines states and in this case, they are labeled generic OnOff. Generic states and messages support many types of devices from lights to fans to actuators. They are a quick way to reuse a model for a general (or generic) purpose. As the system moves from one state to another, this is termed a state transition on the mesh. States can also be bound to each other. If a state changes, it can affect the transition to another state. As an example, a mesh controlling a ceiling fan may have a speed control state which, when it gets to a value of zero, changes the generic On-Off state to off.

Properties are similar to states but have more than binary values. For example, a temperature sensor may have a state Temperature 8 to signify and publish an eight-bit temperature value. A property can either be set as manufacturer (read-only) by the supplier of the element or admin, which allows read-write access. Both states and properties are communicated through messages on the mesh. Messages come in three types:

Get: Requests a value of a given state from one or more nodes

Set: Changes a value of a state

Status: Is a response to a get that contains the data



All of these concepts of states and properties ultimately form a model (the highest level of the Bluetooth mesh stack). A model can be a server, in which case it defines states and state transitions. Alternatively, a model can be a client which doesn't define any states; rather, it defines state interaction messages to use with get, set, and status. A control model can support a hybrid of server and client models.

Mesh networking can also make use of Bluetooth 5 standard features such as anonymous advertisements and multiple advertisement sets. Take the case of a mesh that connects to a phone for voice communication, yet simultaneously is relaying packets for other uses. By using multiple advertisement sets, both use cases can be managed simultaneously.





Bluetooth mesh provisioning





A node may join a mesh by the act of provisioning. Provisioning is a secure process that takes an unprovisioned and insecure device and transforms it into a node in the mesh. The node will first secure a NetKey from the mesh. At least one NetKey must be on each device in the mesh to join. Devices are added to the mesh through a provisioner. The provisioner distributes the network key and a unique address to an unprovisioned device. The provisioning process uses elliptical-curve Diffie-Hellman key exchange to create a temporary key to encrypt the network key. This provides security from a man-in-the-middle attack during provisioning. The device key derived from the elliptical curve is used to encrypt messages sent from the provisioner to the device.

The provisioning process is as follows:





An unprovisioned device broadcasts a mesh beacon advertising packet.

The provisioner sends an invitation to the device. The unprovisioned device responds with a provisioning capabilities PDU.





The provisioner and device exchange public keys.

The unprovisioned device outputs a random number to the user. The user enters the digits (or identity) into the provisioner and a cryptographic exchange starts to complete the authentication phase.

A session key is derived by each of the two devices from the private key and the exchanged public keys. The session key is used to secure the data needed to complete the provisioning process, including securing the NetKey.

The device changes state from an unprovisioned device to a node and is now in possession of the NetKey, a unicast address, and a mesh security parameter called the IV index.





IEEE 802.15.4





The IEEE 802.15.4 is a standard wireless personal area network defined by the IEEE 802.15 working group. The model was ratified in 2003 and forms the basis of many other protocols including Thread (covered later), Zigbee (covered later), WirelessHART, and others. 802.15.4 only defines the bottom portion (PHY and data link layer) of the stack and not the upper layers. It is up to other consortiums and working groups to build a full network solution. The goal of 802.15.4 and the protocols that sit on it are low-cost WPAN with low power consumption. The latest specification is the IEEE 802.15.4e specification ratified on February 6, 2012, which is the version we will discuss in this chapter.





IEEE 802.15.4 architecture


The IEEE 802.15.4 protocol operates in the unlicensed spectrum in three different radio frequency bands: 868 MHz, 915 MHz, and 2400 MHz. The intent is to have as wide a geographical footprint as possible, which implies three different bands and multiple modulation techniques. While the lower frequencies allow 802.15 to have fewer issues with RF interference or range, the 2.4 GHz band is by far the most often used 802.15.4 band worldwide. The higher frequency band has gained its popularity because the higher speed allows for shorter duty cycles on transmitting and receiving, thus conserving power.

The other factor that has made the 2.4 GHz band popular is its acceptance in the market due to the popularity of Bluetooth. The table blow lists various modulation techniques, geographical area, and data rates for various 802.15.4 bands.

Frequency range (MHz)

Channel numbers

Modulation

Data rate

(Kbps)

Region



868.3

1 channel: 0

BPSK

O-QPSK

ASK

20

100

250

Europe



902-928

10 channels: 1-10

BPSK

O-QPSK

ASK

40

250

250

North America, Australia



2405-2480

16 channels: 11-26

O-QPSK

250

Worldwide





The typical range of an 802.15.4-based protocol is roughly 200 meters in an open-air, line-of-sight test. Indoors, the typical range is roughly 30 m. Higher power transceivers (15 dBm) or mesh networkinmg can be used to extend the range. The following graphiuc shows the three bands used by 802.15.4 and the frequency distribution.



IEEE 802.15.4 bands and frequency allocations. 915 MHz band uses a 2MHz frequency separation and the 2.4GHz band uses a 5 MHz frequency separation.

To manage a shared frequency space, 802.15.4 and most other wireless protocols use some form of Carrier Sense Multiple Access Collision Avoidance (CSMA/CA). Since it is impossible to listen to a channel while transmitting on the same channel, collision detection schemes don't work; therefore, we use collision avoidance. CSMA/CA simply listens to a specific channel for a predetermined amount of time. If the channel is sensed "idle", then it transmits by first sending a signal telling all other transmitters the channel is busy. If the channel is busy, then the transmission is deferred for a random period of time. In a closed environment, CSMA/CA will provide 36 percent channel usage; however, in real-world scenarios, only 18 percent of the channels will be usable.

The IEEE 802.15.4 group defines the operational transmit power to be capable of at least 3 dBm and the receiver sensitivity to be -85 dBm at 2.4 GHz and -91 dBm at 868/915 MHz. Typically, this implies a 15 mA to 30 mA current for transmission and a 18mA to 37mA current for the reception.

The data rate as state peaks at 250 kbps, as stated using the offset quadrature phase shift key.

The protocol stack only consists of the bottom two layers of the OSI model (PHY and MAC). The PHY is responsible for symbol encoding, bit modulation, bit demodulation, and packet synchronization. It also performs transmit-receiving mode switching and intra-packet timing/acknowledgment delay control. Shown below is the 802.15.4 protocol stack as a comparison to the OSI model.



IEEE 802.15.4 Protocol Stack. Only PHY and MAC layers are defined, other standards and organizations are free to incorporate layers 3 to 7 above the PHY and MAC.

On top of the physical layer is the data link layer responsible for detecting and correcting errors on the physical link. This layer also controls the media access layer (MAC) to handle collision avoidance using protocols such as CSMA/CA. The MAC layer is typically implemented in software and runs on an MCU such as the popular ARM Cortex M3 or even an 8-bit ATmega core. There are a few silicon vendors that have incorporated the MAC in pure silicon, such as Microchip Technology Inc.

The interface from the MAC to the upper layers of the stack are provided through two interfaces called the Service Access Points (SAP):

MAC-SAP: For data management

MLME-SAP: For control and monitoring (MAC layer management entity)



There are two types of communication in IEEE 802.15.4: beacon and beaconless communication.

For a beacon-based network, the MAC layer can generate beacons that allow a device to enter a PAN as well as provide timing events for a device to enter a channel to communicate. The beacon is also used for battery-based devices that are normally sleeping. The device wakes on a periodic timer and listens for a beacon from its neighbors. If a beacon is heard, it begins a phase called a SuperFrame Interval where time slots are pre-allocated to guarantee bandwidth to devices, and devices can call for a neighbor node attention. The SuperFrame Interval (SO) and Beacon Interval (BO) are fully controllable by the PAN coordinator. The SuperFrame is divided into sixteen equally sized time slots with one dedicated as the beacon of that SuperFrame. Slotted CSMA/CA channel access is used in beacon-based networks.

The guaranteed time slots (GTS) can be assigned to specific devices preventing any form of contention. Up to seven GTS domains are allowed. The GTS slots are allocated by the PAN coordinator and announced in the beacon it broadcasts. The PAN coordinator can change the GTS allocations on the fly dynamically based on system load, requirements, and capacity. The GTS direction (transmit or receive) is predetermined before the GTS starts. A device may request one transmit and/or one receive GTS.

The SuperFrame has contention access periods (CAP) where there is crosstalk on the channel and contention free periods (CFP) where the frame can be used for transmission and GTS. The following figure illustrates a superframe consisting of 16 equal time slots bounded by beacon signals (one of which must be a beacon). Contention Free Period will be further divided into Guaranteed Time Slots (GTS) and one or more GTSW may be allocated to a particular device. No other device may use that channel during a GTS.



IEEE 802.15.4 SuperFrame Sequence.

In addition to beacon-based networking, IEEE 802.15.4 allows for beacon-less networking. This is a much simpler scheme where no beacon frame is transmitted by the PAN coordinator. It implies, however, that all nodes are in a receiving mode all the time. This provides full-time contention access through the use of unslotted CSMA/CA. A transmitting node will perform a clear channel assessment (CCA) in which it listens to the channel to detect if it's used and then transmit if clear. CCA is part of a CSMA/CA algorithm and is used to "sense" if a channel is used. A device can receive access to a channel if it is clear of other traffic from other devices (including non-802.15.4 devices). In the event a channel is busy, the algorithm enters a "back-off" algorithm and waits a random amount of time to retry the CCA. The IEEE 802.15.4 group specifies the following for CCA usage:

CCA mode 1: Energy above threshold (lowest). The CCA will report a busy medium on detecting any energy greater than a threshold value (ED).

CCA mode 2: Carrier sense only (medium - default). This mode causes CCA to report a busy medium only if a direct-sequence spread spectrum (DSSS) signal is detected. The signal may be above or below the ED threshold.

CCA mode 3: Carrier sense with energy above threshold (strongest). In this mode, the CCA reports busy if it detects a DSSS signal with an energy above the ED threshold.

CCA mode 4: This mode is a carrier sense detection mode with a timer. The CCA starts a timer of some number of milliseconds and will report busy only if it detects a high-rate PHY signal. CCA will report the medium is idle if the timer expires and no high-rate signal is observed.

CCA Mode 5: This is a combination of carrier sense and energy above a threshold mode.



To note regarding CCA modes:

Energy detection will be at most 10 dB above specified receiver sensitivity

CCA detection time will equal eight symbol periods

It should be noted that CCA modes that are based on energy detection consume the least amount of energy for the device.



This mode will consume much more power than beacon-based communication.





IEEE 802.15.4 topology


There are two fundamental device types in IEEE 802.15.4:

Full function device (FFD): Supports any network topology, can be a network (PAN) coordinator and can communicate to any device PAN coordinator

Reduced function device (RFD): Limited to only a star topology, cannot perform as a network coordinator, can only communicate with a network coordinator



The star topology is the simplest but requires all messages between peer nodes to travel through the PAN coordinator for routing. A peer-to-peer topology is a typical mesh and can communicate directly with neighbor nodes. To build more complicated networks and topologies is the duty of the higher level protocols, which we will discuss in the Zigbee section.

The PAN coordinator has a unique role that is to set up and manage the PAN. It also has the duty of transmitting network beacons and storing node information. Unlike sensors that may use battery or energy harvesting power sources, the PAN coordinator is constantly receiving transmissions and is usually on a dedicated power line (wall power). The PAN coordinator is always an FFD.

The RFD or even low power FFDs can be battery based. Their role is to search for available networks and transfer data as necessary. These devices can be put into a sleep state for very long periods of time. Shown below is a diagram of a star versus peer-to-peer topology.



IEEE 802.15.4 guidance on network topologies. Implementer of 802.15.4 is free to build other network topologies

Within the PAN, broadcast messages are allowed. To broadcast to the entire fabric, one only needs to specify the PAN ID of 0xFFFF.





IEEE 802.15.4 address modes and packet structure


The standard dictates that all addresses are based on unique 64-bit values (IEEE address or MAC address). However, to conserve bandwidth and reduce the energy of transmitting such large addresses, 802.15.4 allows a device joining a network to "trade-in" their unique 64-bit address for a short 16-bit local address, allowing for more efficient transmission and lower energy.

This "trade-in" process is the responsibility of the PAN coordinator. We call this 16-bit local address the PAN ID. The whole PAN network itself has a PAN identifier, as multiple PANs can exist. The following figure is a diagram of the 802.15.4 packet structure.



IEEE 802.15.4 PHY and MAC packet encoding.

Frames are the basic unit of data transport, and there are four fundamental types (some of the underlying concepts were covered in the last section):

Data frame: Application data transport

Acknowledgement frame: Confirmation of reception

Beacon frame: Sent by PAN coordinator to set up a SuperFrame structure

MAC command frame: MAC layer management (associate, disassociate, beacon request, GTS request)





IEEE 802.15.4 start-up sequence





IEEE 802.15.4 maintains a process for startup, network configuration, and joining of existing networks. The process is as follows:





Device initializes its stack (PHY and MAC layers).

PAN coordinator is created. Each network has only one PAN coordinator. The PAN coordinator must be assigned at this phase before proceeding.





The PAN coordinator will listen to other networks it has access to and derives a PAN ID that is unique to the PAN it will administer. It can do this over multiple frequency channels.

The PAN coordinator will choose a specific radio frequency to use for the network. It will do this using an energy detection scan where it scans the frequencies the PHY can support and listens to find a quiescent channel.

The network will be started by configuring the PAN coordinator and then starting the device in coordinator mode. At this point, the PAN coordinator can accept requests.

Nodes can join the network by finding the PAN coordinator using an active channel scan where it broadcasts a beacon request across all its frequency channels. When the PAN coordinator detects the beacon, it will respond back to the requesting device. Alternatively, in a beacon-based network (detailed earlier), the PAN coordinator will routinely send out a beacon and the device can perform a passive channel scan and listen for the beacon. The device will then send an association request.

The PAN coordinator will determine if the device should or can join the network. This could be based on access control rules, or even if the PAN coordinator has enough resources to manage another device. If accepted, the PAN coordinator will assign a 16-bit short address to the device.





IEEE 802.15.4 security


The IEEE 802.15.4 standard includes security provisions in the form of encryption and authentication. The architect has flexibility in the security of the network based on cost, performance, security, and power. The different security suites are listed in the following table.

AES-based encryption uses a block cipher with a counter mode. The AES-CBC-MAC provides authentication-only protection, and the AES-CCM mode provides the full suite of encryption and authentication. The 802.15.4 radios provide an access control list (ACL) to control which security suite and keys to use. Devices can store up to 255 ACL entries.

The MAC layer also computes "freshness checks" between successive repetitions to ensure old frames or old data is no longer considered valid and will stop those frames from proceeding up the stack.

Each 802.15.4 transceiver must manage its own ACL and populate it with a list of "trusted neighbors" along with the security policies. The ACL includes the address of the node cleared to communicate with, the particular security suite to use (AES-CTR, AES-CCM-xx, AES-CBC-MAC-xx), the key for the AES algorithm, and the last initial vector (IV) and replay counter. The table below lists the various 802.15.4 security modes and features.

Type

Description

Access control

Confidentiality

Frame integrity

Sequential freshness



None

No security



AES-CTR

Encryption only, CTR

X

X

X



AES-CBC-MAC-128

128-bit MAC

X

X



AES-CBC-MAC-64

64-bit MAC

X

X



AES-CBC-MAC-32

32-bit MAC

X

X



AES-CCM-128

Encryption and 128-bit MAC

X

X

X

X



AES-CCM-64

Encryption and 64-bit MAC

X

X

X

X



AES-CCM-32

Encryption and 32-bit MAC

X

X

X

X





Symmetric cryptography relies on both endpoints using the same key. Keys can be managed at a network level using a shared network key. This is a simple approach where all nodes possess the same key but are at risk of insider attacks. A pairwise keying scheme could be used where unique keys are shared between each pair of nodes. This mode adds overhead, especially for networks where there is a high fan out from nodes to neighbors. Group keying is another option. In this mode, a single key is shared among a set of nodes and is used for any two nodes of the group. Groups are based on device similarities, geographies, and so on. Finally, a hybrid approach is possible, combining any of the three schemes mentioned.





Zigbee





Zigbee is a WPAN protocol based on the IEEE 802.15.4 foundation targeted for commercial and residential IoT networking that is constrained by cost, power, and space. This section details the Zigbee protocol from a hardware and software point of view. Zigbee got its name from the concept of a bee flying. As a bee flies back and forth between flowers gathering pollen, it resembles a packet flowing through a mesh network - device to device.





Zigbee history





The concept of the low-power wireless mesh networking became standard in the 1990s and the Zigbee Alliance was formed to address this charter in 2002. The Zigbee protocol was conceived after the ratification of IEEE 802.15.4 in 2004. That became the IEEE 802.15.4.-2003 standard on December 14, 2004. Specification 1.0, also known as the Zigbee 2004 Specification, was brought public on June 13, 2005. The history can be profiled as:





2005 - Zigbee 2004 released

2006 - Zigbee 2006 released

2007 - Zigbee 2007 released, also known as Zigbee Pro (introduced cluster libraries, some backward compatibility constraints with Zigbee 2004 and 2006)



The alliance's relation to the IEEE 802.15.4 working group is similar to the IEEE 802.11 working group and the Wi-Fi Alliance. The Zigbee Alliance maintains and publishes standards for the protocol, organizes working groups, and manages the list of application profiles. The IEEE 802.15.4 defines the PHY and MAC layers, but nothing above. Additionally, 802.15.4 doesn't specify anything about multi-hop communications or application space. That is where Zigbee (and other standards built on 802.15.4) comes into play.

Zigbee is proprietary and closed standard. It requires a licensing fee and agreement provided by the Zigbee Alliance. Licensing grants the bearer Zigbee compliance and logo certification. It guarantees interoperability with other Zigbee devices.





Zigbee overview


Zigbee is based on 802.15.4 but layers on network services similar to TCP/IP. It can form networks, discover devices, provide security, and manage the network. It does not provide data transport services or an application execution environment. Because it is essentially a mesh network, it is self-healing and ad hoc in form. Additionally, Zigbee prides itself on simplicity and claims a 50% reduction in software support by using a lightweight protocol stack.

There are three principal components in a Zigbee network.

Zigbee controller (ZC): Highly capable device on a Zigbee network that is used to form and initiate network functions. Each Zigbee network will have a single ZC that fulfills the role of an 802.15.4 2003 PAN coordinator (FFD). After the network is formed, the ZC can behave as a ZR (Zigbee router). It can assign logical network addresses and permit nodes to join or leave the mesh.

Zigbee router (ZR): This component is optional but handles some of a load of mesh network hopping and routing coordination. It too can fulfill the role of an FFD and has an association with the ZC. A ZR participates in multi-hop routing of messages and can assign logical network addresses and permit nodes to join or leave the mesh.

Zigbee end device (ZED): This is usually a simple endpoint device such as a light switch or thermostat. It contains enough functionality to communicate with the coordinator. It has no routing logic; therefore, any messages arriving at a ZED that are not targeted to that end device are simply relayed. It also can not perform associations (detailed later).



Zigbee targets three different types of data traffic. Periodic data is delivered or transmitted at a rate defined by the applications (for example, sensors periodically transmitting). Intermittent data occurs when an application or external stimulus occurs at a random rate. A good example of intermittent data suitable for Zigbee is a light switch. The final traffic type Zigbee serves is repetitive low latency data. Zigbee allocates time slots for transmission and can have very low latency, which is suitable for a computer mouse or keyboard.

Zigbee supports three basic topologies:

Star network: A single ZC with one or more ZEDs. Only extends two hops and is therefore limited in node distance. It also requires a reliable link with a single point of failure at the ZC.

Cluster tree: A multi-hop network that employs beaconing and extends the network coverage and range over a star network. ZC and ZR nodes can have children, but ZEDs remain true endpoints. Child nodes only communicate with their parent (like a small star network). Parents can communicate downstream to its children or upstream to its parent. The problem still exists with a single point of failure at the center.

Mesh network: Dynamic path formation and morphing. Routing can occur from any source device to any destination device. Uses tree and table-driven routing algorithms. ZC and ZR radios must be powered at all times to perform routing duties, consuming battery life. Additionally, calculating the latency in a mesh network can be difficult if not non-deterministic. Some rules are relaxed; however, routers within a certain range of each other can communicate directly with one another. The main advantage is the network can grow beyond the line of sight and has multiple redundant paths.



Zigbee, in theory, can deploy up to 65,536 Zigbee End Devices (ZED).



Three forms of Zigbee network topologies from the simplest star network, to the cluster tree, to a true mesh.





Zigbee PHY and MAC (and difference from IEEE 802.15.4)


Zigbee, like Bluetooth, operates primarily in the 2.4 GHz ISM band. Unlike Bluetooth, it also operates at 868 MHz in Europe and 915 MHz in the USA and Australia. Because of the lower frequency, it has better propensity to penetrate walls and obstacles over traditional 2.4 GHz signals. Zigbee does not use all of the IEEE802.15.4 PHY and MAC specifications. Zigbee does make use of the CSMA/CA collision avoidance scheme. It also uses the MAC level mechanism to prevent nodes from talking over each other.

Zigbee does not use the IEEE802.15.4 beaconing modes. Additionally, the guaranteed time slots (GTS) of SuperFrames are also not used in Zigbee.

The security specification of 802.15.4 is slightly modified. The CCM modes that provide authentication and encryption require a different security for every layer. Zigbee is targeted for severely resource-constrained and deeply-embedded systems and does not provide the level of security as defined in 802.15.4.

Zigbee is based on the IEEE 802.15.4-2003 specification before enhancements with two new PHYs and radios were standardized in the IEEE 802.15.4-2006 specification. This implies that the data rates are slightly lower than they could be in the 868 MHz and 900 MHz bands.





Zigbee protocol stack


The Zigbee protocol stack includes a network layer (NWK) and an application layer (APS). Additional components include a security service provider, a ZDO management plane, and a Zigbee device object (ZDO). The structure of the stack illustrates genuine simplicity over the more complex but feature filled Bluetooth stack.



Zigbee protocol stack and the corresponding simplified OSI model as a frame of reference.

The NWK is used for all three principal Zigbee components (ZR, ZC, ZED). This layer performs device management and route discovery. Additionally, since it administers a true dynamic mesh, it is also responsible for route maintenance and healing. As the most basic function, the NWK is responsible for transferring network packets and routing of messages. During the process of joining nodes to a Zigbee mesh, the NWK provides the logical network address for the ZC and secures a connection.

The APS provides an interface between the network layer and application layer. It manages the binding table database, which is used to find the correct device depending on the service that is needed versus a service that is offered. Applications are modeled by what are termed application objects. Application objects communicate with each other through a map of object attributes called clusters. Communication between objects is created in a compressed XML file to allow for ubiquity. All devices must support a basic set of methods; however, a total of 240 endpoints can exist per Zigbee device.

The APS interfaces the Zigbee device to a user. The majority of components in the Zigbee protocol reside here, including the Zigbee device object (ZDO). Endpoint 0 is called the ZDO and is a critical component that is responsible for overall device management. This includes managing keys, policies, and roles of devices. It can also discover new (one-hop-away) devices on the network and the services those devices offer. The ZDO initiates and responds to all binding requests for the device. It also establishes a secure relationship between network devices by managing the security policy and keys for the device.

The bindings are connections between two endpoints with each binding supporting a particular application profile. Therefore, when we combine the source and a destination endpoint, the cluster ID, and profile ID, we can create a unique message between two endpoints and two devices. Bindings can be one-to-one, one-to-many, or many-to-one. An example of this binding in action would be multiple light switches connected to a set of light bulbs. The switch application endpoints will associate with light endpoints. The ZDO provides the binding management by associating the switch endpoints to light endpoints using application objects. Clusters can be created, allowing one switch to turn on all the lights while another switch is only able to control a single light.

An application profile delivered by the OEM will describe a collection of devices for specific functions (for example, light switches and smoke alarms). Devices within an application profile can communicate with each other through clusters. Each cluster will have a unique cluster ID to identify itself within the network.





Zigbee addressing and packet structure


The Zigbee protocol, as shown, resides on top of the 802.15.4 PHY and MAC layers and reuses its packet structures. The network diverges at the network and application layers.

The following figure illustrates breaking down one of the 802.15.4 PHY and MAC packets into the corresponding network layer frame packet (NWK) as well as the application layer frame (APS):

Zigbee Network (NWK) and Application Layer (APS) frames residing over 802.15.4 PHY and MAC packets.

Zigbee uses two unique addresses per node:

Long address (64 bit): Assigned by the manufacturer of the device and is immutable. Uniquely identifies the Zigbee device from all other Zigbee devices. This is the same as the 802.15.4 64-bit address. The top 24 bits refer to the organizational unique identifier (OUI) and the bottom 40 bits are managed by the OEM. The addresses are managed in blocks and can be purchased through IEEE.

Short address (16 bit): This too is the same as the PAN ID of the 802.15.4 specification and is also optional.





Zigbee mesh routing


Table routing uses Ad Hoc On-Demand Distance Vector Routing (AODV) and the Cluster Tree Algorithm. AODV is a pure on-demand routing system. In this model, nodes don't have to discover one another until there is some association between the two (for example, two nodes need to communicate). AODV also doesn't require nodes that aren't in the routing path to maintain routing information. If a source node needs to communicate to a destination and a path doesn't exist, then a path discovery process starts. AODV provides both unicast and multicast support. It is a reactive protocol; that is, it only provides a route to a destination on demand and not proactively. The entire network is silent until a connection is needed.

The cluster tree algorithm forms a self-organizing network capable of self-repair and redundancy. Nodes in the mesh select a cluster head and create clusters around a head node. These self-forming clusters then connect to each other through a designated device.

Zigbee has the ability to route packets in multiple manners:

Broadcasting: Transmit packet to all other nodes in the fabric.

Mesh routing (table routing): If a routing table for the destination exists, the route will follow the table rules accordingly. Very efficient. Zigbee will allow a mesh and table to route up to 30 hops away.

Tree routing: Unicast messaging from one node to another. Tree routing is purely optional and can be disallowed from the entire network. It provides better memory efficiency than mesh routing since a large routing table doesn't exist. Tree routing does not have the same connection redundancy as a mesh, however. Zigbee supports tree routing hops up to 10 nodes away.

Source routing: Used primarily when a data concentrator is present. This is how Z-Wave provides mesh routing.





Zigbee Routing Packet to issue a Route Request Command Frame and subsequent reply with a Route Reply Command Frame.

Route discovery or path discovery is the process of discovering a new route or repairing a broken route. A device will issue a route request command frame to the entire network. If and when the destination receives the command frame, it will respond with at least one route reply command frame. All the potential routes returned are inspected and evaluated to find the optimal route.

Link costs that are reported during path discovery can be constant or based on the likelihood of reception.





Zigbee association





As previously mentioned, Zigbee end devices (ZED) do not participate in routing. End devices communicate with the parent, who is also a router. When a Zigbee coordinator (ZC) allows for a new device to join a network, it enters a process known as an association. If a device loses contact with its parent, the device can at any time rejoin through the process known as orphaning.

To formally join a Zigbee network, a beacon request is broadcast by a device to ask for subsequent beacons from devices on the mesh that are authorized to allow new nodes to join. At first, only the PAN coordinator is authorized to provide such a request; after the network has grown, other devices may participate.





Zigbee security


Zigbee builds off the security provisions of IEEE 802.15.4. Zigbee provides three security mechanisms: access control lists (ACL), 128-bit AES encryption, and message freshness timers.

The Zigbee security model is distributed across several layers:

Application layer provides key creation and transport services to ZDO

Network layer manages routing, and outgoing frames will use the link key defined by the routing if available; otherwise, a network key is used

MAC layer security is managed through an API and controlled by the upper layers



There are multiple keys that are managed by a Zigbee network:

Master key: The master key may be pre-installed by a manufacturer or entered by a manual process with the user. It forms the basis of security of the Zigbee device. Master keys are always installed first and transmitted from the trust center.

Network key: This key will provide protection at a network level for outside attackers.

Link key: This forms a secure binding between two devices. If two devices have a choice between using installed link keys or network keys, they will always default to link keys to provide more protection.



Link keys are resource heavy in the sense of key storage on constrained devices. Network keys can be used to alleviate some of the storage cost at the risk of decreased security.

Key management is critical for security. The distribution of keys is controlled by establishing a trust center (one node to act as the distributor of keys to all other nodes in the fabric). The ZC is assumed to be the trust center. One may implement a Zigbee network with a dedicated trust center outside of the ZC. The trust center performs the following services:

Trust management: Authenticates devices joining the network

Network management: Maintains and distributes keys

Configuration management: Enables device to device security



In addition, the trust center can be placed in a residential mode (it will not establish keys with network devices) or it can be in commercial mode (establishes keys with every device on the network).

Zigbee uses 128-bit keys as part of its specification within the MAC and NWK layers. The MAC layer provides three modes of encryption, AES-CTR, AES-CBC-128, and AES-CCM-128 (all defined in the IEEE 802.15.4 section). The NWK layer, however, only supports AES-CCM-128 but is tweaked slightly to provide encryption-only and integrity-only protection.

Message integrity ensures messages have not been modified in transit. This type of security tool is used for man-in-the-middle attacks. Referring back to the Zigbee packet structure, the message integrity code and auxilliary header provide fields to add extra checks for each application message sent.

Authentication is provided through a common network key and individual keys between pairs of devices.

Message freshness timers are used to find messages that have timed-out. These messages are rejected and removed from the network as a tool to control replay attacks. This applies to incoming and outgoing messages. Any time a new key is created, the freshness timers are reset.





Z-Wave


Z-Wave is a WPAN protocol used for consumer and home automation primarily, and has about 2100 products using the technology. It has found its way into commercial and building segments in the areas of lighting and HVAC control. In terms of market share, Z-Wave is not at the market cap like Bluetooth or Zigbee. Z-Wave is another mesh technology in the 900 MHz band. Its first manifestation was in 2001 at Zensys, a Danish company developing light control systems. Zensys formed an alliance with Leviton Manufacturing, Danfoss, and Ingersoll-Rand in 2005, formally known as the Z-Wave Alliance. The alliance acquired Sigma Designs in 2008 and Sigma is now the sole provider of Z-Wave hardware modules.

Z-Wave Alliance member companies now include SmartThings, Honeywell, Belkin, Bosch, Carrier, ADT, and LG.

Z-Wave is a closed protocol for the most part with limited hardware module manufacturers. The specification is starting to open up more in the public domain but a substantial amount of material is not disclosed.





Z-Wave overview


Z-Wave's design center is home and consumer lighting/automation. It is intended to use very low bandwidth for communication with sensors and switches. The design is based on the ITU-T G.9959 Standard at the PHY and MAC level. The ITU-T G.9959 is the International Telecommunications Union specification for short-range narrow-band radio-communication transceivers in the sub-1 GHz band.

There are several bands in the sub-1 GHz range that are used for Z-Wave depending on the country of origin. In the US, the 908.40 MHz center frequency is the standard. There are three data rates that Z-Wave is capable of with varying frequency spread for each:

100 Kbps: 916.0 MHz with a 400 KHz spread

40 Kbps: 916.0 MHz with a 300 KHz spread

9.6 Kbps: 908.4 MHz with a 300 KHz spread



Each band operates on a single channel.

Modulation performed at the PHY level uses frequency shift keying for data rates at 9.6 Kbps and 40 Kbps. At the fast 100 Kbps rate, Gaussian frequency shift keying is used. The output power will be roughly 1mW at 0 dB.

Channel contention is managed using CSMA/CA, as described in other protocols previously covered. This is managed in the MAC layer of the stack. Nodes start in receive mode and wait a period of time before transmitting data if there is data being broadcast.

From a role and responsibility point of view, the Z-Wave network is composed of different nodes with specific functions:

Controller device: This top-level device provides the routing table for the mesh network and is the host/master of the mesh under it. There are two fundamental types of controllers: Primary controller: The primary controller is the master, and only a single master can exist in a network. It has the ability to maintain the network topology and hierarchy. It can also include or exclude nodes from the topology. It also has the duty of allocating node IDs.

Secondary controller: These nodes assist a primary controller with routing.





Slave device/node: These devices perform actions based on commands they receive. These devices cannot communicate with neighbor slave nodes unless instructed to do so via a command. Slaves can store routing information but do not compute or update routing tables. Typically, they will act as a repeater in a mesh.



Controllers can also be defined as portable and static. A portable controller is designed to move like a remote control. Once it has changed position, it will recalculate the fastest routes in the network. A static controller is intended to be fixed, such as a gateway plugged into a wall outlet. The static controller can always be "on" and receiving slave status messages.

Controllers can also have different attributes within the network:

Status update controller (SUC): The static controller also has the advantage of taking the role of status update controller. In this case, it will receive notifications from a primary controller regarding topology changes. It can also assist in the routing of slaves.

SUC ID server (SIS): An SUC can also assist in including and excluding slaves for the primary.

Bridge controller: This essentially is a static controller that has the ability to act as a gateway between the Z-Wave mesh and other network systems (for example, WAN or Wi-Fi). The bridge is allowed to control up to 128 virtual slave nodes.

Installer controller: This is a portable controller that can assist in network management and quality-of-service analysis.



Slaves also support different attributes:

Routing slave: Fundamentally a slave node but with the ability to send unsolicited messages to other nodes in the mesh. Typically, slaves are not allowed to send a message to another node without the command of a primary controller. The node stores a set of static routes that it uses when a message is sent.

Enhanced slave: These have the same abilities as a routing slave with the addition of a real-time clock and persistent storage for application data. An example might be a gas meter.



Slave nodes/devices may be battery based, such as a motion sensor in a home. For a slave to be a repeater, it would always have to be functional and listening for messages on the mesh. Because of this, battery-based devices are never used as repeaters.





Z-Wave protocol stack


Because Z-Wave is a very low bandwidth protocol that is intended to have a sparse network topology, the protocol stack attempts to communicate in as few bytes per message as possible. The stack consists of five layers, as shown in the following figure:

Z-Wave Protocol Stack and OSI model comparison. Z-Wave uses a five-layer stack with the bottom two layers (PHY and MAC) defined by the ITU-T G.9959 Specification.

The layers can be described as follows:

PHY layer: Defined by the ITU-T G.9959 Specification. This layer manages the signal modulation, channel assignment, and preamble binding at the transmitter and preamble synchronization at the receiver.

MAC layer: This layer manages the HomeID and NodeID fields, as defined in the previous section. The MAC layer also uses a collision avoidance algorithm and backoff strategy to alleviate congestion and contention on the channel.

Transfer layer: Manages the communication of Z-Wave frames. This layer is also responsible for the retransmission of frames as needed. Additional tasks include acknowledgment of transmissions and checksum binding.

Routing layer: This provides routing services. Additionally, the network layer will perform a topology scan and update of the routing tables.

Application layer: Provides the user interface to applications and data.





Z-Wave addressing


Z-Wave has a fairly simple addressing mechanism compared to Bluetooth and Zigbee protocols. The addressing scheme is kept simple because all attempts are made to minimize traffic and conserve power. There are two fundamental addressing identifiers that need definition before proceeding:

Home ID: This is a 32-bit unique identifier that is preprogrammed in controller devices to assist with identifying Z-Wave networks from each other. During network start, all Z-Wave slaves have a home ID of zero and the controller will systematically populate the slave nodes with the correct home ID.

Node ID: This is an 8-bit value that is assigned to each slave by the controller and provides addressing of slaves in the Z-Wave network.





Z-Wave packet structure from PHY to MAC to the Application layer. Three packet types are defined as well: singlecast, routed, and multicast).

The transport layer provides several frame types to assist with retransmission, acknowledgment, power control, and authentication. The four types of network frames include:

Singlecast frame: This is a packet sent to a single Z-Wave node. This type of packet must be followed by an acknowledgment. If the ACK doesn't occur, a retransmission sequence transpires.

ACK frame: This is the acknowledgment response to a singlecast frame.

Multicast frame: This message is transmitted to more than one node (up to 232). No acknowledgment is used for this type of message.

Broadcast frame: Similar to a multicast message, this frame is transmitted to all nodes in the network. Again, no ACK is used.



For a new Z-Wave device to be used on the mesh, it must undergo a pairing and adding process. The process is usually started by a mechanical or user instantiated keypress on the device. As mentioned, the pairing process involves the primary controller assigning a home ID to the new node. At this point, the node is said to be included.





Z-Wave topology and routing


The topology of the Z-Wave mesh is shown in the following figure using some of the device types and attributes associated with slaves and controllers. A single primary controller manages the network and establishes the routing behaviors:



Z-Wave topology including the single Primary Controller and four slaves and one enhanced slave. The bridge controller acts as a gateway to a WiFi network. A Portable Controller and Secondary Controller also sits on the mesh for assistance to the Primary Controller.

The routing layer of the Z-Wave stack manages the frame transport from one node to another. The routing layer will set up the correct repeater list if one is needed, scan the network for topology changes, and maintain the routing table. The table is fairly simple and simply specifies which neighbor is connected to a given node. It only looks forward one immediate hop. The table is built by the primary controller by asking each node in the mesh what devices are reachable from its location.

The use of source routing to navigate the mesh implies that as the message makes its way through the fabric, for every hop that receives the frame, it will forward the packet to the next node in the chain. As an example, in the following routing table, the shortest path from "Bridge" to "Slave 5" follows this logical path: Bridge | Slave 3 | Slave 2 | Slave 5.

Z-Wave limits the routing hops to a maximum of four.

A routing table of the preceding sample topology is given as:



Z-Wave Source-Routing Algorithmic Example

Portable controllers have a challenge in maintaining an optimal routing path; therefore, portable controllers will use alternative techniques to find the best route to a destination node.





Summary





This chapter has covered the first step in delivering IoT data from devices to the internet. The first step in connecting billions of devices is using the correct communication medium to reach sensors, objects, and actuators to cause some action. This is the role of the wireless personal area network. We have explored the basis of the unlicensed spectrum and how as an architect we will measure the performance and behavior of a WPAN. The chapter went deep into the new Bluetooth 5 protocol and compared it to other standards such as the IEEE 802.15.4 basis protocol, Zigbee, and Z-Wave. We explored beaconing, various packet and protocol structures, and mesh architectures. An architect should have an understanding of how these architectures compare and contrast at this point.

The next chapter will explore IP-based PAN and LAN networks such as the ubiquitous 802.11 Wi-Fi network, Thread, and 6LoWPAN, as well as future Wi-Fi communication standards. These networking chapters exploring WPAN, WLAN, and WAN architectures will routinely go back to the fundamentals, such as signal strength measures and range equations taught early in this chapter, and should be used as a reference going forward.





IP-Based WPAN and WLAN





WPAN networks have adopted protocols that are typically not TCP/IP, at least from the outset. The protocol stacks for Bluetooth, Zigbee, and Z-Wave have similarities to a true TCP/IP protocol but don't inherently communicate over TCP/IP. There are adaptions of IP on Zigbee (using Zigbee-IP) and IP over Bluetooth (using IPSP to support 6LoWPAN) that do exist. Later in this chapter, we will cover an example of a WPAN using the 802.15.4 protocol with a true IPv6 (thread) compatible layer capable of joining any IPv6 network.

This chapter will also cover the standards around Wi-Fi™ using the IEEE 802.11 protocols. While typically thought of as a wireless LAN (WLAN), 802.11 protocols are pervasive and of use in IoT deployments especially in smart sensors and gateway hubs. This chapter will provide a formal treatment of the 802.11 Wi-Fi catalog of standards including the new IEEE802.11ac high-speed protocol. 802.11 also extends into the world of IoT for the vehicle-to-vehicle and transportation market using the 802.11p protocol which will also be covered. Finally, this chapter will explore the IEEE 802.11ah specification, which is a wireless LAN solution built on the 802.11 protocol but targeted explicitly for power and cost-constrained IoT sensor devices.

The following topics will be covered in the chapter:





Internet protocol and transmission control protocol

WPAN with IP – 6LoWPAN

WPAN with IP – thread

IEEE 802.11 protocols and WLAN





Internet protocol and transmission control protocol





Supporting an IP layer in a protocol stack does consume resources that could be applied elsewhere. However, there are key benefits in building an IoT system that allows devices to communicate over TCP/IP (transmission control protocol/internet protocol). We will begin by enumerating these benefits; however, it is the role of the architect to balance the cost of these services and features against the impact on a system.





IP role in IoT


From an ecosystem point of view, regardless of the protocol used at a sensor level, the sensor data will ultimately be fed into a public, private, or hybrid cloud for analysis, control, or monitoring. Outside of the WPAN, the world is TCP/IP-based, as we see in WLAN and WAN configurations.

IP is the standard form of global communication for various reasons:

Ubiquity: IP stacks are provided by nearly every operating system and every medium. IP communication protocols are capable of running on various WPAN systems, cellular, copper wire, fiber-optic, PCI Express, and satellite systems. IP specifies the exact format for all data communications and the rules used to communicate, acknowledge, and manage connectivity.

Longevity: TCP was established in 1974, and the IPv4 standard still in use today was designed in 1978. It has withstood the test of time for 40 years. Longevity is paramount for many industrial and field IoT solutions that must support devices and systems for decades. Various other proprietary protocols have been designed by various manufacturers in those 40 years, such as AppleTalk, SNA, DECnet, and Novell IPX, but none have gained the market traction as well as IP.

Standards-based: TCP/IP is governed by the Internet Engineering Task Force (IETF). The IETF maintains a set of open standards focused on the internet protocol.

Scalability: IP has demonstrated scale and adoption. IP networks have demonstrated massive scaling to billions of users and many more devices. IPv6 could provide a unique IP address to every atom comprising Earth and still support 100 more worlds.

Reliability: IP at its heart is a reliable protocol for data transmission. It accomplishes this through a packet delivery system based on a connectionless network. The service is considered unreliable from conception, meaning the data is not guaranteed to be delivered. IP is connectionless because each packet is treated independently from one another. The IP is also referred to as best-effort delivery because all attempts will be made to transmit a packet through various routes. The strength of this model allows an architect to replace the delivery mechanism with another—essentially replacing layers one and two of the stack with something else (for example, Wi-Fi with cellular).

Manageability: Various tools exist to manage IP networks and devices on an IP network. Modeling tools, network sniffers, diagnostic tools, and various appliances exist to assist in building, scaling, and maintaining networks.



The transport layer is also worth considering. While IP addresses the need for a well supported and robust network layer, TCP and Universal Datagram Protocol (UDP) are needed for the transport layer. The transport layer is responsible for end-to-end communication. The logical communication between different hosts and various network components is governed at this level. TCP is used for connection-oriented transmissions, whereas UDP is used for connectionless transmissions. UDP is naturally much simpler to implement than TCP, but not as resilient. Both services provide segment reordering as packets are not guaranteed to be delivered in order using an IP protocol. TCP also provides the layer of reliability to an unreliable IP network layer through the use of acknowledgment messages and retransmissions of lost messages. Additionally, TCP provides flow control using sliding windows and congestion avoidance algorithms. UDP provides a lightweight, high-speed method to broadcast data to various devices that may or may not be present or reliable.

The following is the standard 7-layer Open Source Interconnection Model stack.



Full seven-layer OSI model. TCP/IP represent layers three and four.

From an IoT perspective, bringing IP close to the source of data bridges two worlds of data management. The Information Technology (IT) role manages the infrastructure, security, and provisioning of networks and things on the network. The Operational Technology (OT) role manages the health and throughput of the system that functions to produce something. These two roles have traditionally been separated, as things such as sensors, meters, and programmable controllers have not been connected, at least directly. Proprietary standards have governed the OT systems, at least from an industrial IoT perspective.





WPAN with IP – 6LoWPAN





In an effort to bring IP addressability to the smallest and most resource-constrained devices, the concept of 6LoWPAN was formed in 2005. A working group formalized the design in the IETF under the specification RFC 4944 (request for comment) and later updated with RFC 6282 to address header compression and RFC 6775 for neighbor discovery. The consortium is closed, however, the standard is open for anyone to use and implement. 6LoWPAN is an acronym that stands for IPV6 over low power WPANs. The intent is for IP networking over low-power RF communication systems for devices that are power and space constrained and do not need high bandwidth networking services. The protocol can be used with other WPAN communications such as 802.15.4 as well as Bluetooth, sub-1 GHz RF protocols, and power line controller (PLC). The principal advantage of 6LoWPAN is that the simplest of sensors can have IP addressability and act as a network citizen over 3G/4G/LTE/Wi-Fi/Ethernet routers. A secondary effect is that IPV6 provides significant theoretical addressability of 2128 or 3.4x1038 unique addresses. This would sufficiently cover the estimates of 50 billion internet-connected devices by 2020 and continue to cover those devices well beyond that. Therefore, IPV6 is well-suited for IoT growth.





6LoWPAN topology


6LoWPAN networks are mesh networks residing on the periphery of larger networks. The topologies are flexible, allowing for ad hoc and disjointed networks without any binding to the internet or other systems, or they can be connected to the backbone or the internet using edge routers. 6LoWPAN networks can be conjoined with multiple edge routers; this is called multi-homing. Additionally, ad-hoc networks can form without requiring an Internet connectivity of an edge router. These topologies are shown below:



6LoWPAN Topologies.

An edge router (also known as border router) is necessary for a 6LoWPAN architecture as it has four functions:

Handles the communication to the 6LoWPAN devices and relays data to the internet.

Performs compression of IPv6 headers by reducing a 40-byte IPv6 header and 8-byte UDP headers for efficiency in a sensor network. A typical 40-byte IPv6 header can compress to two to 20-bytes depending on usage.

Initiates the 6LoWPAN network.

Exchanges data between devices on the 6LoWPAN network.



Edge routers form 6LoWPAN mesh networks on larger traditional network perimeters. They can also broker exchanges between IPV6 and IPV4 if necessary. Datagrams are handled in a similar manner as in an IP network, which has some advantages over proprietary protocols. All nodes within a 6LoWPAN network share the same IPv6 prefix that the edge router establishes. Nodes will register with the edge routers as part of the Network Discovery (ND) phase.

ND controls how hosts and routers in the local 6LoWPAN mesh will interact with each other. Multi-homing allows for multiple 6LoWPAN edge routers to manage a network; for example, when there is a need for multiple media (4G and Wi-Fi) for failover or fault tolerance.

There are three types of nodes within the 6LoWPAN mesh:

Router nodes: These nodes marshal data from one 6LoWPAN mesh node to another. Routers can also communicate outward to the WAN and internet.

Host nodes: Hosts in the mesh network cannot route data in the mesh and are simply endpoints consuming or producing data. Hosts are allowed to be in sleep states, occasionally waking to produce data or receive data cached by their parent routers.

Edge routers: As stated, these are the gateways and mesh controllers usually at a WAN edge. A 6LoWPAN mesh would be administered under the edge router.



Nodes are free to move and reorganize/reassemble in a mesh. For that matter, a node can move and associate with a different edge router in a multi-home scenario or even move between different 6LoWPAN meshes. These changes to the topology can be caused for various reasons, such as changes in signal strength or physical movement of nodes. When a topology change occurs, the IPv6 address of the associated nodes will also naturally change.

In an ad hoc mesh without an edge router, a 6LoWPAN router node could manage a 6LoWPAN mesh. This would be the case when WAN connectivity to the internet is not necessary. Typically, this is seldom seen as IPv6 addressability for a small ad hoc network isn't necessary.

The router node would be configured to support two mandatory functions:

Unique local unicast address generation

Performing neighbor discovery ND registration





The ad hoc mesh IPv6 prefix would be a local prefix rather than the larger global WAN IPv6 prefix.





6LoWPAN protocol stack


To enable 6LoWPAN on a form of communication media such as 802.15.4 there is a set of recommended features necessary to support an IP protocol. These features include framing, unicast transmission, and addressing. As shown in the following figure, the physical layer is responsible for receiving and converting data bits over the air. For this example, the link layer we speak to is IEEE 802.15.4. On top of the physical layer is the data link layer, responsible for detecting and correcting errors on the physical link. Detailed information on the physical and data link layer of 802.15.4 are covered earlier in this chapter. Here is the comparison between the 6LoWPAN stack and the OSI model:



6LoWPAN Protocol Stack Comparison to the simplified OSI model. 6LoWPAN resides on top of other protocols like 802.15.4 or Bluetooth to provide the physical and MAC address.

By enabling IP traffic at a sensor level, the relationship between the device and the gateway would use some form of application layer to convert data from the non-IP protocol to and IP-protocol. Bluetooth, Zigbee, and Z-Wave all have some form of conversion from their base protocol to something that can communicate over IP (if the intent is to route the data). The edge routers forward datagrams at a network layer. Because of this, the router does not need to maintain application state. If an application protocol changes, a 6LoWPAN gateway doesn't care. If an application protocol changes for one of the non-IP protocols, the gateway will need to change its application logic as well. 6LoWPAN provides an adaptation layer within layer three (network layer) and on top of layer two (data link layer). This adaptation layer is defined by the IETF.





Mesh addressing and routing


Mesh routing operates in the physical and data link layers to allow packets to flow through a dynamic mesh using multiple hops. We previously talked about mesh-under and route-over routing, but we will go somewhat deeper in this section on that form of routing.

6LoWPAN mesh networks utilize two schemes for routing:

Mesh-under network: In a mesh-under topology, routing is transparent and assumes a single IP subnet representing the entirety of the mesh. A message is broadcast in a single domain and is sent to all devices in the mesh. As previously mentioned, this generates considerable traffic. Mesh-under routing will move from hop to hop in the mesh but only forward packets up to layer two (data link layer) of the stack. 802.15.4 handles all the routing for each hop in layer two.

Route-over network: In a route-over topology, networks will incur the charge of forwarding packets up to layer three (network layer) of the stack. Route-over schemes manage routes at an IP level. Each hop represents one IP router.



The following graphic depicts the difference between mesh-under and route-over routing:



The difference between mesh-under and route-over networking. The intermediary hops reveal how far up each stack the packet is delivered before moving to the next node in the mesh.

A route-over network implies that every router node is equally capable and can perform the larger set of functions as a normal IP router, such as duplicate address detection. RFC6550 formally defines the route-over protocol RPL (ripple). The advantage of the route-over architecture is the similarity with traditional TCP/IP communication. RPL provides multipoint-to-point communication (where traffic from devices in a mesh communicate to a central server on the internet) and point-to-multipoint communication (central service to the devices in the mesh).

The RPL protocol has two modes for managing the route tables:

Storing mode: All devices configured as routers in a 6LoWPAN mesh maintain routing and neighbor tables.

Non-storing mode: Only a single device, such as the edge router, maintains the routing and neighbor tables. To transmit data from one host to another in a 6LoWPAN mesh, the data is sent up to the router where its route is calculated then transmitted to the receiver.



The routing table, as the name implies, contains the mesh routing paths, while the neighbor table maintains each node's directly connected neighbors. This implies that the edge router will always be referenced to deliver packets in the mesh. This allows the router nodes the freedom of not managing large routing tables to manage, but does add some latency in moving packets since the edge router must be referenced. Storing mode systems will have higher processing and memory requirements to manage routing tables stored on each node, but will have a more efficient path to establishing a route.

Note in the following figure the hop count, source address, and destination address fields. These fields are used during the address resolution and routing phase. The hop count is set to an initial high value and then decremented each time the packet propagates from node to node in the mesh. The intent is when the hop limit reaches zero, the packet is dropped and lost from the mesh. This provides a way to prevent runaway networks in the case a host node removes itself from the mesh and is no longer reachable. The source and destination address are 802.15.4 addresses and may be in short or extended format, as 802.15.4 allows. The header is constructed as:



6LoWPAN Mesh Addressing Header





Header compression and fragmentation


While the advantage of having virtually unlimited IP addresses for things is a significant milestone, placing IPv6 on an 802.15.4 link poses some challenges that must be overcome to make 6LoWPAN usable. First is the fact that IPv6 has a Maximum Transmission Unit (MTU) size of 1280 bytes, while 802.15.4 has a limit of 127 bytes. The second issue is that IPv6 in general adds significant girth to an already bloated protocol. For example, in IPv6 headers are 40 bytes long.

Note IEEE 802.15.4g does not have a limitation of 127 bytes for a frame length.

Header compression is a means to compress and remove redundancy in the IPv6 standard header for efficiency reasons. Normally, header compression is status-based, meaning in a network with static links and stable connections, it works reasonably well. In a mesh network such as 6LoWPAN, this will not work. Packets hop between nodes and would require compression/decompression on each hop. Additionally, the routes are dynamic and allowed to change and transmissions may not be present for long duration. Therefore, 6LoWPAN adopted stateless and shared-context compression. The type of compression can be affected by whether or not certain specifications are met, such as using RFC4944 over RFC6922, as well as where the source and destination of a packet reside, shown as follows:



Header Compression in 6LoWPAN.

The three cases of header compression for 6LoWPAN based on whether the route is within the local mesh, outside of mesh but to a known address, or outside of mesh to an unknown address. Compared to standard IPv6 with a 40-byte header, 6 LoWPAN can compress between 2 to 20 bytes.

Case one (in the preceding figure) is the best case communication between nodes in a local mesh. No data is sent outward to the WAN with this compressed header format. The second case implies data is sent outward to the WAN to a known address, and the last case is similar but to an address that is known. Even in the third case, which is the worst case, compression still accounts for a 50 percent reduction in traffic. 6LoWPAN also allows for UDP compression, which is beyond the scope of this book.

Fragmentation is a secondary issue, due to the fact that the MTU sizes are incompatible between 802.15.4 (127 bytes) and IPv6 at 1280 bytes. The fragmentation system will divide each IPv6 frame into smaller segments. On the receiving side, the fragments will be reassembled. Fragmentation will differ depending on the type of routing elected during mesh configuration (we will discuss mesh-under and route – over routing later). The types of fragmentation and constraints are given as:

Mesh-under routing fragmentation: Fragments will be reassembled only at the final destination. All fragments need to be accounted for during re-assembly. If any are missing, the entire packet needs retransmission. As a side note, mesh-under systems require all fragments to be transmitted immediately. This will generate a burst of traffic.

Route-over routing fragmentation: Fragments will be reassembled at every hop in the mesh. Each node along the route carries enough resources and information to rebuild all fragments.



The fragmentation header includes a Datagram Size field, which specifies the total size of the unfragmented data. The Datagram Tag field identifies the set of fragments belonging to a payload, and the Datagram Offset indicates where the fragment belongs in a payload sequence. Note, the datagram offset is not used for the first fragment sent as the offset of a new fragment sequence should start at zero.



6LoWPAN Fragmentation Header

Fragmentation is a resource-heavy task that demands processing and energy ability that can tax a battery-based sensor node. It is advisable to limit the data sizes (at an application level) and use header compression to reduce the power and resource constraints in a large mesh.





Neighbor discovery


Neighbor discovery (ND) is defined by RFC4861 as a one-hop routing protocol. This is a formal contract between neighbor nodes in the mesh and allows nodes to communicate with each other. ND is the process of discovering new neighbors, as a mesh can grow, shrink, and transform, resulting in new and changing neighbor relations. There are two basic processes and four basic message types in ND:

Finding neighbors: This includes Neighbor Registration (NR) and Neighbor Confirmation (NC) phases

Finding routers: This includes Router Solicitation (RS) and Router Advertisement (RA) phases



During ND, there can be conflicts that arise. For example, if a host node disassociates with a router and establishes a link with a different router in the same mesh. ND is required to find duplicate addresses and unreachable neighbors as part of the specification. DHCPv6 can be used in conjunction with neighbor discovery.

After an 802.15.4-capable device has bootstrapped through the physical and data link layers, 6LoWPAN can perform neighbor discovery and grow the mesh. This process will proceed as follows and as shown in the subsequent figure:

Finding an appropriate link and subnet for low-power wireless.

Minimizing node-initiated control traffic.

The host sending out RS message to request the mesh network prefix.

The router responding with prefix.

The host assigning itself a link-local unicast address (FE80::IID).

The host transmiting this link-local unicast address in an NR message to the mesh.

Performing Duplicate Address Detection (DAD) by waiting for an NC for a set time. If the timeout expires, assumes the address is unused.





Simplified neighbor discovery sequence from a 6LoWPAN mesh node through a mesh router to the edge router and then off to the wide area network.

After the host is configured, it can begin communicating over the internet with a unique IPv6 address.

If mesh-under routing is used, the link-local address retrieved in step five can be used to communicate to any other node in the 6LoWPAN mesh. In a route-over scheme, the link-local address can be used to communicate only with nodes that are a single hop away. Anything greater than one hop will require a full routable address.





6LoWPAN security


Since, in a WPAN system, it is easy to sniff and overhear communication, 6LoWPAN provides for security at multiple levels. At the 802.15.4 level two of the protocol, 6LoWPAN relies on AES-128 encryption of data. Additionally, 802.15.4 provides a counter with CBC-MAC mode (CCM) to provide encryption and an integrity check. Most chipsets that provide an 802.15.4 network block also include a hardware encryption engine for performance improvement.

At layer three (the network layer) of the protocol, 6LoWPAN has the option to use IPsec standard security (RFC4301). This includes:

Authentication Handler (AH): As defined in RFC4302 for integrity protection and authentication

Encapsulating Security Payload (ESP): In RFC4303, adds encryption to secure confidentiality in packets



ESP is by far the most common layer-three secure packet format. Additionally, a mode of ESP defines reusing AES/CCM used in layer-two hardware for layer-three encryption as well (RFC4309). This makes layer three security suitable for constrained 6LoWPAN nodes.

In addition to link layer security, 6LoWPAN also utilizes Transport Layer Security (TLS) for TCP traffic and Datagram Transport Layer Security (DTLS) for UDP traffic.





WPAN with IP – Thread





Thread is a relatively new networking protocol for IoT and is based on IPV6 (6LoWPAN). Its principal target is home connectivity and home automation. Thread was launched in July of 2014 with the formation of the Thread Group Alliance, which includes companies such as Alphabet (Google holding company), Qualcomm, Samsung, ARM, Silicon Labs, Yale (locks), and Tyco.

Based on the IEEE 802.15.4 protocol and 6LoWPAN, it has commonality with Zigbee and other 802.15.4 variants, but with a significant difference being Thread is IP addressable. This IP protocol builds on the data and physical layers provided by 802.15.4 and the features such as security and routing from 6LoWPAN. Thread is also mesh-based, making it attractive for home lighting systems with up to 250 devices in a single mesh. The philosophy with Thread is that by enabling IP addressability in the smallest of sensors and home automation systems, one can reduce power because it doesn't need to persist application state since the protocol uses datagrams at the network layer. This also implies that the edge router hosting a Thread mesh network doesn't need to process application layer protocols and can lower its power and processing needs. Finally being IPV6 compliant, it is inherently is secure with all communications being encrypted using the Advanced Encryption Standard (AES). Up to 250 nodes can exist on a Thread mesh all with fully encrypted transport and authentication. A software upgrade allows a pre-existing 802.15.4 device to be Thread compatible.





Thread architecture and topology


Based on the IEEE 802.15.4-2006 standard, Thread uses the specification to define the Medium Access Controller (MAC) and physical (PHY) layers. It operates at 250 Kbps in the 2.4 GHz band.

From a topology point of view, Thread establishes communications with other devices through a border router (usually a Wi-Fi signal in a household). The rest of the communication is based on 802.15.4 and forms a self-healing mesh. An example of such a topology is shown as follows:

Example Thread network topology containing border routers, Thread routers, lead devices, and eligible IoT devices that can combine in the mesh. Interconnections are variable and self-healing.

The following are the roles of various devices in a Thread architecture.

Border router: A border router is essentially a gateway. In the home network, this would be a communications crossover from Wi-Fi to Thread and forms the entry point to the internet from a Thread mesh running underneath a border router. Multiple border routers are allowable under the Thread specification.

Lead device: The lead device manages a registry of assigned router IDs. The lead also controls the requests for Router-eligible End Devices (REED) to be promoted to routers. A leader can also act as a router and have device-end children. The protocol for assignment of router addresses is the Constrained Application Protocol (CoAP). The state information a lead device manages can also be stored in the other thread routers. This allows for self-healing and failover in case the leader loses connectivity.

Thread routers: Thread routers manage the routing services of the mesh. Thread routers never enter a sleep state but are allowed by the specification to downgrade themselves to become a REED.

REEDs: A host device that is a REED can become routers or a leader. REEDs are not responsible for routing in the mesh unless they are promoted to a router or leader. REEDs also cannot relay messages or join devices to the mesh. REEDs essentially are endpoints or leaf nodes in the network.

End devices: Some endpoints cannot become routers. These types of REEDs have two other categories that they can subscribe to: full end devices (FEDs) and minimal end devices (MEDs).

Sleepy end devices: Host devices that have entered a sleep state communicate only with their associated thread router and cannot relay messages.





Thread protocol stack





Thread will make use of the full benefits of 6LoWPAN and enjoy the benefits of header compression, IPv6 addressing, and security. Thread also uses the fragmentation scheme of 6LoWPAN as described in the previous section, but adds two additional stack components:





Distance vector routing

Mesh link establishment





Thread Protocol Stack





Thread routing


Thread uses route-over routing as described in the previous section, on 6LoWPAN routing. Up to 32 active routers are allowed in a Thread network. Route traversal is based on next-hop routing. The master route table is maintained by the stack. All routers have an up-to-date copy of the routing for the network.

Mesh link establishment (MLE) is a method to update path traversal costs from one router to another in a network. Additionally, MLE provides a way to identify and configure neighboring nodes in the mesh and secure them. As a mesh network can expand, shrink, and change shape dynamically, MLE provides the mechanism to reconstitute the topology. MLE exchanges the path costs with all other routers in a compressed format. MLE messages will flood the network in a broadcast manner by the Multicast Protocol for Low Power and Lossy Networks (MPL).

Typical 802.15.4 networks use on-demand route discovery. This can be costly (bandwidth due to route discovery flooding the network), and Thread attempts to avoid that scheme. Periodically, a Thread network router will exchange MLE advertisement packets with link cost information to its neighbors essentially forcing all routers to have a current path list. If a route terminates (host leaves Thread network) then the routers attempt to find the next best path to a destination.

Thread also measures the link quality. Remember that 802.15.4 is a WPANs and signal strength may change dynamically. Quality is measured by the link cost of incoming messages for a neighbor with a value of zero (unknown cost) to three (good quality). The following table summarizes the quality to cost relation. This quality and cost are continually monitored and, as mentioned, periodically broadcast to the network for self-healing: Link quality

Link cost



0

Unknown



1

6



2

2



3

1





Thread addressing


To find a route to a child node, the path simply inspects the high bits of the child's address to find the parent router address. At this point, the source of transmission knows the cost to reach the child as well as the next-hop information to start the route.

Distance vector routing is used to find paths to routers in the Thread network. The upper 6 bits of the 16-bit address indicate the destination router—this is the prefix. If the lower 10 bits of the destination are set to 0, then the final destination is that router. Alternatively, the destination router will forward the packet on based on the lower 10 bits.



2-Byte Thread Short Address per 802.15.4-2006 specification

If a route extends outside of the Thread network, then a border router will signal to leaders of the particular prefix data, including prefix data, 6LoWPAN context, border routers, and the DHCPv6 server. This information is communicated via MLE packets through the Thread network.

Within the Thread network, all addressing is UDP-based. If a retry is necessary, then the Thread network will rely on:

MAC level retries: Where each device using MAC acknowledgments is an ACK is not received from the next hop

Application retries: Where the application layer will provide its own retry mechanism





Neighbor discovery





Neighbor discovery (ND) in thread decides which 802.15.4 network to join. The process is as follows:





Joining device contacts router for commissioning.

Joining device scans all channels and issues a beacon request on each channel. Waits for beacon response.

If a beacon containing the payload with the network Service Set Identifier (SSID) and permit-joining message is seen, the device will now join the Thread network.

Once a device is discovered, MLE messages will be broadcast to identify a neighbor router to the device. That router will perform commissioning. There are two commissioning modes:



Configuring: Uses an out-of-band method to commission a device. Allows for a device to attach to the Thread network as soon as it is introduced to the network.

Establishing: Creates a commissioning session between the device and a commission application running on a Smartphone, tablet, or web-based.





The device that is joining contacts the parent router and attaches to the network via MLE exchange.



The device will exist as either a REED or an end device and is allocated a 16-bit short address by the parent.





IEEE 802.11 protocols and WLAN


One of the first adopters of the ISM bands that the FCC freed for unlicensed use was the IEEE 802.11 technology. The IEEE 802.11 is a suite of protocols with a rich history and different use cases. 802.11 is the specification defining the Media Access Controller (MAC) and physical layer (PHY) of a networking stack. The definition and specifications are governed by the IEEE LAN/MAN Standards Committee. Wi-Fi is the definition of WLAN based on the IEEE802.11 standards but maintained and governed by the non-profit Wi-Fi Alliance.

802.11 owes its creation to NCR in 1991 who first developed the wireless protocol as a means of networking cash registers. It wasn't until 1999 when the Wi-Fi Alliance was formed that the technology became ubiquitous and pervasive in the burgeoning PC and notebook market. The original protocol is vastly different than modern 802.11 b/g/n/ac protocols. It only supported a 2 Mbps data rate with forward error correction.

The success of IEEE802.11 can be attributed to the layered stack approach of the OSI model. Simply replacing the MAC and PHY layers with IEEE802.11 layers allowed existing TCP/IP infrastructure to seamless be used. Today, nearly every mobile device, notebook, tablet, embedded system, toy, and video game incorporate an IEEE802.11 radio of some kind. That said, 802.11 has had a storied past, particularly in the security model. The original 802.11 security model was based on the UC Berkeley Wired Equivalent Privacy security mechanism that was later proven to be unreliable and easily compromised. Several notable exploits including the TJ Maxx data breach through 802.11 WEP in 2007 resulted in 45 million stolen credit cards. Today, Wi-Fi Protected Access (WPA) and WPA2 using AES 256-bit pre-shared keys have certainly tightened up security and WEP is rarely used.

This section will detail some of the differences in the 802.11 protocols and particular information relevant to the IoT architect. We will detail the current IEEE802.11ac design and then examine 802.11ah HaLow and 802.11p V2V, as all three are relevant to the internet of things.





IEEE 802.11 suite of protocols and comparison


The IEEE LAN/MAN Standards Committee maintains and governs the IEEE 802 specification(s). The original 802.11 goal was to provide a link layer protocol for wireless networking. This evolved from the 802.11 base specification to 802.11ac in 2013. Since then, the working group has focused on other areas, as the following chart illustrates. Specific 802.11 variants have been examined for use cases and segments such as low power/low bandwidth IoT interconnect (802.11ah), vehicle-to-vehicle communication (802.11p), reuse of television analog RF space (802.11af), extreme bandwidth near meter communication for audio/video (802.11ad), and of course the follow-on to the 802.11ac standard (802.11ax).

The new variants are designed for different areas of the RF spectrum or to reduce latency and improve safety for vehicular emergencies. The following table should reflect the tradeoffs between range, frequency, and power. We will cover aspects in the chart such as modulation, MIMO streams, and frequency usage later in this section.



Various IEEE802.11 standards and specifications from the legacy 802.11 original specifications to the yet to be ratified 802.11ax.





IEEE 802.11 architecture


The 802.11 protocol represents a family of wireless radio communications based on different modulation techniques in the 2.4 GHz and 5 GHz ISM bands of the unlicensed spectrum. 802.11b and 802.11g reside in the 2.4 GHz band, while 802.11n and 802.11ac open up the 5 GHz band. The last chapter detailed the 2.4 GHz band and the different protocols that reside in that space. Wi-Fi is susceptible to the same noise and interference as Bluetooth and Zigbee and deploys a variety of techniques to ensure robustness and resiliency.

From a stack perspective, the 802.11 protocols reside in the link layer (one and two) of the OSI model, as shown in the following figure:



IEEE 802.11ac Stack.

The stack includes various PHYs from older 802.11 specifications such as the 802.11 original PHYs (including infrared), a, b, g, and n. This is to ensure backward compatibility across networks. Most chipsets include the entire PHY collection and it is difficult to find a part with an older PHY alone.

802.11 systems support three basic topologies:

Infrastructure: In this form, a Station (STA) refers to an 802.11 endpoint device (like a Smartphone) that communicates with a central access point (AP). An AP can be a gateway to other networks (WAN), a router, or a true access point in a larger network. This is also known as Infrastructure Basic Set Service (BSS). This topology is a star topology.

Ad hoc: 802.11 nodes can form what is called an Independent Basic Set Service (IBSS) where each station communicates and manages the interface to other stations. No access point or a star topology is used in this configuration. This is a peer-to-peer type of topology.

Distribution system (DS): The DS combines two or more independent BSS networks through access point interconnects.



Note: IEEE802.11ah and IEEE802.11s support forms of a mesh topology.

Below are examples of the three basic topologies of an IEEE 802.11 architecture:



802.11 network architectures. BSS, IBSS, and a Distribution System combine two independent BSS.

In total, the 802.11 protocol allows for up to 2007 STAs to be associated with a single access point. This is relevant when we explore other protocols, such as the IEEE 802.11ah for IoT, later in this chapter.





IEEE 802.11 spectrum allocation


The first 802.11 protocol used a spectrum in the 2 GHz and 5 GHz ISM region and evenly spaced channels roughly 20 MHz apart from each other. The channel bandwidth was 20 MHz, but later amendments from IEEE allowed 5 MHz and 10 MHz to operate as well. In the United States, 802.11b and g allow for eleven channels (other countries may support up to fourteen). The following figure depicts the channel separation. Three of the channels are non-overlapping (1,6,11):



802.11 2.4GHz frequency space and non-interfering channel combinations. Note the 5 MHz channel separation across 14 channels each 20 MHz wide.

802.11 specifies a spectral mask, which defines the permitted power distribution across each channel. The spectral mask requires the signal be attenuated to certain levels (from its peak amplitude) at specified frequency offsets. That said, signals will tend to radiate into adjacent channels. 802.11b using Direct Sequence Spread Spectrum (DSSS) has a completely different spectral mask than 802.11n using Orthogonal Frequency Divisional Multiplexing (OFDM). OFDM has a much denser spectral efficiency and therefore also sustains much higher bandwidth.

Shown below are the channel and modulation differences between 802.11 b, g and n. Channel width limits the number of simultaneous channels from 4 to 3 to 1. The shape of the signal also varies between DSSS and OFDM. OFDM being much denser and thus capable of higher bandwidth.



Differences between 802.11b,g, and n using DSSS versus OFDM and carrying channel widths.

While there are 14 channels in the 2.4 GHz range, the usage of the channels is governed by region and country. For example, North America allows the usage of channels 1 through 11, Japan allows all 14 channels for 802.11b and 1 through 13 for 802.11g/n, Spain allows only channels 10 and 11, and France allows 10 through 13. The allocations vary and designers should be aware of country restrictions. IEEE uses the nomenclature regdomain to describe country channel, power, and time restrictions that impact the PHY.





IEEE 802.11 modulation and encoding techniques


This section details the techniques of modulation and encoding in IEEE 802.11 protocol. These techniques are not unique to 802.11; they also apply to 802.15 protocols and, as we will see, to cellular protocols as well. The methods of frequency hopping, modulation, and phase-shift keying are fundamental methods that should be understood by an architect as different techniques balance range, interference, and throughput.

Digital data transmitted by an RF signal must be transformed into analog. This occurs at the PHY no matter what RF signal is being described (Bluetooth, Zigbee, 802.11, and so on). An analog carrier signal will be modulated by a discrete digital signal. This forms what is called a symbol or a modulation alphabet. A simple way to think about symbol modulation is a piano with four keys. Each key represents two bits (00, 01, 10, 11). If you can play 100 keys per second, that implies you can transmit 100 symbols per second. If each symbol (tone from the piano) represents two bits, then it is equivalent to a 200 bps modulator. While there are many forms of symbol encoding to study, the three basic forms include:

Amplitude Shift Keying (ASK): This is a form of amplitude modulation. Binary 0 is represented by one form of modulation amplitude and 1 a different amplitude. A simple form is shown in the following figure, but more advanced forms can represent data in groups using additional amplitude levels.

Frequency Shift Keying (FSK): This modulation technique modulates a carrier frequency to represent 0 or 1. The simplest form shown in the following figure is Binary Frequency Shift Keying (BPSK), which is the form used in 802.11 and other protocols. In the last chapter, we talked about Bluetooth and Z-Wave, those protocols use a form of FSK called Gaussian Frequency Shift Keying (GFSK) that filters the data through a Gaussian filter, which smooths the digital pulse (-1 or +1) and shapes it to limit spectral width.

Phase Shift Keying (PSK): Modulates the phase of a reference signal (carrier signal). Used primarily in 802.11b, Bluetooth, and RFID tags. PSK uses a finite number of symbols represented as different phase changes. Each phase encodes an equal number of bits. A pattern of bits will form a symbol. The receiver will need a contrasting reference signal and calculate the difference to extract the symbols and then demodulate the data. An alternative method requires no reference signal for the receiver. The receiver will inspect the signal and determine if there is a phase change without referencing a secondary signal. This is called Differential Phase Shift Keying (DPSK) and is used in 802.11b.



The following figure pictographically depicts the various encoding methods:



Different forms of symbol encoding using keying techniques: amplitude keying, frequency keying, and phase keying. Note how phase keying changes phase for every "1" encountered.

The next form of modulation technique is hierarchical modulation, specifically Quadrature Amplitude Modulation (QAM). The following constellation diagram represents the encoding in a 2D Cartesian system. The length of any one vector represents the amplitude, and the angle to a constellation point represents the phase. Generally speaking, there are more phases that can be encoded than amplitudes, as shown in the following 16-QAM constellation diagram. The 16-QAM has three amplitude levels and 12 total phases angles. This allows for 16 bits to be encoded. 802.11a and 802.11g can use 16-QAM and even higher density 64-QAM. Obviously, the denser the constellation, the more encoding can be represented and the higher the throughput.

The figure shown illustrates a QAM encoding process pictographically. On the left is a representation of a 16 point (16-QAM) constellation diagram. There are 3 amplitude levels indicated by the length of the vectors and 3 phases per quadrant indicated by the angle of the vector. This allows for 16 symbols to be generated. These symbols are reflected in varying the phase and amplitude of the signal generated. On the right is an 8-QAM example waveform diagram showing the varying phases and amplitudes that represent a 3 bit (8 value) modulation alphabet.



Quadrature Amplitude Modulation (QAM). Left: 16-QAM Constellation. Right: 8-QAM Waveform Encoding.

QAM has practical limits. Later, we will see very dense constellations that radically increase throughput, one can only add a certain amount of phase angles and amplitudes. Noise generated by Analog to Digital Converters (ADC) and Digital to Analog Converters (DAC) will introduce quantization errors and noise and will need to sample signals at very high speeds. Additionally, the Signal to Noise Ratio (SNR) must exceed a certain value to achieve a good Bit Error Rate (BER).

The 802.11 standards employ different interference mitigation techniques that essentially spread a signal across a band:

Frequency Hopping Spread Spectrum (FHSS): Spreads signal over 79 non-overlapping channels that are 1 MHz wide in the 2.4 GHz ISM band. Uses a pseudo-random number generator to start the hopping process. Dwell Time refers to the minimum time a channel is used before hopping (400 ms). Frequency hopping was also described in the last chapter and is a typical scheme for spreading signals.

Direct sequence spread spectrum: First used in 802.11b protocols and has 22 MHz-wide channels. Each bit is represented by multiple bits in the signal transmitted. The data being transmitted is multiplied by a noise generator. This will effectively spread the signal over the entire spectrum evenly using a pseudo-random number sequence (called the Pseudo-Noise PN code). Each bit is transmitted with an 11-bit chipping sequence (phase shift keying). The resulting signal is an XOR of the bit and the 11-bit random sequence. DSSS delivers about 11 million symbols per second when we consider the chipping rate.

OFDM: Used in IEEE 802.11a and the newer protocols. This technique divides a single 20 MHz channel into 52 sub-channels (48 for data and four for synchronization and monitoring) to encode data using QAM and PSM. A Fast Fourier Transform (FFT) is used to generate each OFDM symbol. A set of redundant data surrounds each sub-channel. This redundant band of data is called the Guard Interval (GI) and is used to prevent Inter-symbol Interference (ISI) between neighbor subcarriers. Notice the subcarriers are very narrow and have no guard bands for signal protection. This was intentional because each subcarrier is spaced equally to the reciprocal of the symbol time. That is, all the sub-carriers transport a complete number of sine-wave cycles that when demodulated will sum to zero. Because of this, the design is simple and doesn't need the extra cost of bandpass filters. IEEE 802.11a uses 250,000 symbols per second. OFDM is generally more efficient and dense (hence more bandwidth) than DSSS and is used in the newer protocols.



Fewer symbols per second have an advantage in situations where there are reflections of signals on walls and windows. Since the reflections will cause what is called multi-path distortion (copies of the symbol hit the receiver at different times), a slower symbol rate allows more time to transmit a symbol and there is more resilience to delay spread. However, if a device is moving, there can be Doppler effects that affect OFDM more than DSSS. Other protocols such as Bluetooth use one million symbols per second.

The following figure depicts an OFDM system with 52 subcarriers in two 20-MHz channels:



An example of OFDM. Here a channel is subdivided into 52 smaller slots or subcarriers (each carrying a symbol).

The set of different modulations available for each standard is called the Modulation and Coding Scheme (MCS). The MCS is a table of available modulation types, guard intervals, and coding rates. One references this table with an index.

Since 802.11b entered the market, before 802.11a they used different encoding schemes. Each is incompatible with each other. There is some confusion in the market as to the difference as protocols were released nearly simultaneously.





IEEE 802.11 MIMO


MIMO is the acronym that refers to multiple input multiple output. MIMO exploits a previously mentioned RF phenomenon called multipath. Multipath transmission implies that signals will reflect off walls, doors, windows, and other obstructions. A receiver will see many signals each arriving at different times via different paths. Multipath tends to distort signals and cause interference, which eventually degrades signal quality (this effect is called multipath fading). With the addition of multiple antennas, a MIMO system can linearly increase the capacity of a given channel by simply adding more antennas. There are two forms of MIMO:

Spatial diversity: This refers to transmit-and-receive diversity. A single stream of data is transmitted on multiple antennas simultaneously using space-time coding. These provide improvements in the signal to noise ratio and they are characterized by their improvement of link reliability and coverage of the system.

Spatial multiplexing: Used to provide additional data capacity by utilizing the multiple paths to carry additional traffic; that is, increasing the data throughput capability. Essentially, a single high-rate data stream will be split into multiple separate transmissions on different antennas.



In the previous chapter, we introduced frequency hopping techniques in PAN networks such as Bluetooth. Frequency hopping is one method to overcome the multipath fading problem by constantly changing the angles of the multipath. This has the effect of distorting the RF signal size. Bluetooth systems typically have one antenna, thereby making MIMO difficult. As far as Wi-Fi is concerned, only the original 802.11 standard supported a form of frequency hopping (FHSS). OFDM systems maintain a channel lock, and thus can be subject to the multipath fading problem.

Using multiple streams does impact overall power usage. IEEE 802.11n includes a mode to only enable MIMO when the effect will have a performance benefit, thus saving power at all other times. The Wi-Fi Alliance requires all products to support at least two spatial streams to receive 802.11n compliance.



A WLAN will split data into multiple streams called spatial streams. Each transmitted spatial stream will use a different antenna on the transmitter. IEEE 802.11n allows for four antennas and four spatial streams. By using multiple streams sent separately for antennas spaced apart from each other, spatial diversity in 802.11n gives some confidences that at least one signal will be strong enough to reach the receiver. At least two antennas are needed to support MIMO functionality. Streaming is also modulation agnostic. BPSK, QAM, and other forms of modulation work with spatial streaming. A digital signal processor on the transmitter and receiver will adjust for the multipath effects and delay the line of sight transmission by just enough time to have it line up perfectly with the non-line-of-sight paths. This will cause the signals to reinforce.

The IEEE 802.11n protocol supports a four-stream single user MIMO (SU-MIMO) implementation, meaning that the transmitters would work in unison to communicate to a single receiver. Here 4 transmit and 4 receive antennas deliver multiple streams of data to a single client. Right: the effect of spatial diversity MIMO in 802.11n. Following is an illustration of SU-MIMO and multipath use in 802.11n.



Left: Illustration of SU-MIMO in IEEE 802.11n. Right: the effect of spatial diversity MIMO in 802.11n.

In the figure, four transmit and four receive antennas deliver multiple streams of data to a single client (SU-MIMO). On the right, two transmitters spaced a fixed distance apart communicate to two receivers. Multiple paths exist as reflections from the two transmitters. One line-of-sight path is stronger and will be favored. DSPs on the transmitters and receiver side also mitigate multipath fading by combining signals so the resulting signal exhibits little fading.

The IEEE 802.11 protocol identifies MIMO streams by the notation M x N : Z, where M is the maximum number of transmit antennas and N is the maximum number of receiver antennas. Z is the maximum number of data streams that can be used simultaneously. So, a MIMO of 3 x 2 : 2 implies there are three transmit stream antennas and two receive stream antennas, but can only send or receive two simultaneous streams.

802.11n also introduced the optional feature of beamforming. 80211.n defines two types of beamforming methods: implicit feedback and explicit feedback:

Implicit feedback beamforming: This mode assumes that the channel between the beamformer (AP) and the beamformee (client) are the reciprocal (same quality in both directions). If that is true, the beamformer transmits a training request frame and receives a sounding packet. With the sounding packet, the beamformer can estimate the receiver's channel and builds a steering matrix.

Explicit feedback beamforming: In this mode, the beamformee responds to a training request by computing its own steering matrix, and sends back the matrix to the beamformer. This is a more reliable method.



Below is a diagram illustrating the effects of beamforming in a situation with no line-of-sight communication. In the worst case, the signals arrive 180 degrees out of phase and nullify each other. With beamforming, the signals can be adjusted in phase to strengthen each other at the receiver.



Examples of a system with and without beamforming. In this case, a system has no direct line of sight and relies on reflections to propagate a signal.

Beamforming relies on multiple spaced antennas to focus a signal at a particular location. The signals can be adjusted in phase and magnitude to arrive at the same location and reinforce each other providing better signal strength and range. Unfortunately, 802.11n did not standardize on a single method for beamforming and left that up to the implementor. Different manufacturers used different processes and could only guarantee it would work with identical hardware. Thus, beamforming was not adopted heavily in the 802.11n timeframe.

We will cover MIMO technologies in many other areas, such as 802.11ac, and in the next chapter on long-range communication using cellular 4G LTE radios.





IEEE 802.11 packet structure


802.11 uses the typical packet structure we have seen before with headers, payload data, frame identifiers, and so on. Starting with the PHY frame organization, we have three fields: a preamble, which assists in the synchronization phase, a PLCP header, which describes the packet configuration and characteristics such as data rates, and the MPDC MAC data.

Each IEEE 802.11 specification has a unique preamble and is structured by the number of symbols (described later) and not by the number of bits for each field. Examples of the preamble structures are as follows:

802.11 a/g: Preamble includes a short training field (two symbols) and a long training field (two symbols). These are used by the subcarriers for timing sync and frequency estimation. Additionally, the preamble includes a signal field that describes the data rate, length, and parity. The signal determines how much data is being transmitted in that particular frame.

802.11 b: Preamble will use either a long sequence of 144 bits or a short sequence of 72 bits. The header will include signal rate, service modes, length of data in microseconds, and a CRC.

802.11n: Has two operating modes: Greenfield (HT) and mixed (non-HT). Greenfield can only be used where no legacy systems exist. Non-HT mode is a compatibility mode with 802.11a/g systems and delivers no better performance than a/g. Greenfield mode allows for higher speed transport.



The following illustration is the 802.11 PHY and link layer packet frame structure:

802.11 Generalized PHY and MAC frame structure The MAC frame structure is shown in the preceding figure. The MAC frame contains the plurality of representative fields. The frame control (FC field) subfields are detailed as follows:

Protocol version: Indicates version of the protocol used.

Type: WLAN frame as control, data, or management frame type.

Subtype: Further delineation of frame type.

ToDS and FromDS: Data frames will set one of these bits to 1 to indicate if the frame is headed to a distribution system. IBSS ad hoc network.

More fragments: If a packet is divided into many frames, then every frame except the last will have this bit-set.

Retry: Indicates a frame was resent and assists in resolving duplicate frames being transmitted.

Power management: Indicates the power state of the sender. APs cannot set this bit.

More data: An AP will use this bit to assist when STAs are in a power save mode. This bit is used to buffer frames in a distribution system.

Wired equivalent privacy: Set to a 1 when a frame is decrypted.

Order: If a strict order mode is used in the network this bit will be set. Frames may not be sent in-order and strict order mode forces in-order transmission.



Moving up the MAC frame from the frame control field, we first examine the duration/connection ID bit:

Duration/connection ID: Indicates duration, contention-free period, and association ID. The association ID is registered during Wi-Fi initial handshaking.

Address fields: 802.11 can manage four MAC addresses in the following order: Address 1: Receiver

Address 2: Transmitter

Address 3: Used for filtering





SC: Sequence control is a 16-bit field for message order.



The 802.11 protocol has several types of frames represented by the type and subtype fields. There are three fundamental types: management frames, control frames, and data frames.

Management frames provide network administration, security, and maintenance. The following table defines the types of management frames:

Frame name

Description



Authentication frame

An STA will send an authentication frame to an AP, which responds with its own authentication frame. Here, the shared key is sent and verified using a challenge response.



Association request frame

This is transmitted from an STA to request an AP to synchronize. It contains the SSID the STA wants to join and other information for synchronization.



Association response frame

Transmitted from an AP to a STA contain and acceptance or rejection message to an association request. If accepted, an association ID will be sent in the payload.



Beacon frame This is the periodic beacon broadcast from an AP. Includes the SSID.



Deauthentication frame Transmitted from a STA wishing to leave a connection from another STA.



Disassociation frame

Transmitted from a STA wishing to terminate a connection.



Probe request frame

Broadcast from an STA to another STA.



Probe response frame

Transmitted from an AP in response to a probe request. Contains information such as supported data rates.



Reassociation frame

Used when an STA loses signal strength with one AP but finds another AP associated with the network using a stronger signal. The new AP will attempt to associate with the STA and forward information stored in the original AP buffer.



Reassociation response frame

Transmitted from the AP with acceptance or rejection to a reassociation request.





The next major frame type is the control frame. Control frames help exchange data between STAs:

Frame name

Description



Acknowledgement frame (ACK)

A receiving STA will always ACK received data if no errors have occurred. If the sender does not receive an ACK after a fixed time, the sender will resend the frame.



Request to rend frame (RTS)

This is part of the collision avoidance mechanism. An STA will begin by sending an RTS message if it wishes to transmit some data.



Clear to send frame (CTS)

STA response to an RTS frame. Request STA can now send the data frame. This is a form of collision management. A time value is used to hold off transmissions from other STAs with the requesting STA transmits.





The final frame type is the data frame. This is the bulk of the data-carrying function of the protocol.





IEEE 802.11 operation


As mentioned previously, an STA is considered a device equipped with a wireless network interface controller. An STA will always be listening for active communication in a specific channel. The first phase of connecting to Wi-Fi is the scanning phase. There are two types of scan mechanisms employed:

Passive scanning: This form of scanning uses beacons and probe requests. After a channel is selected, the device performing the scan will receive beacons and probe requests from nearby STAs. An access point may transmit a beacon, and if the STA receives the transmission, it may progress to join the network.

Active scanning: In this mode, the STA will attempt to locate an access point by instantiating probe requests. This mode of scanning uses more power but allows for faster network joins. The AP may respond to a probe request with a probe request response, which is similar to a beacon message.



An access point will typically broadcast a beacon at a fixed time interval called the Target Beacon Transmit Time (TBTT). TBTT is typically once every 100 ms.

Beacons are always broadcast at the lowest basic rates to ensure every STA in the range has the ability to receive the beacon even if it can't connect to that particular network. After a beacon is processed, the next phase of Wi-Fi connectivity is the synchronization phase. This phase is necessary to keep clients attuned to the access point. The beacon packet contains information needed by the STA:

SSID: Service Set ID. 1 to 32-character network name (this field can optionally be hidden by setting the SSID length to zero. Even if it is hidden the other portions of the beacon frame are transmitted as usual. Generally, speaking, using a hidden SSID offers no additional network security.

BSSID: Basic Service Set ID. Unique 48-bit following layer-2 MAC address conventions. Formed by the combination of the 24-bit Organization Unique Identifier and the manufacturer's assigned 24-bit identifier for the radio chipset.

Channel width: 20 MHz, 40 MHz, and so on

Country: List of supported channels (country-specific)

Beacon interval: TBTT time mentioned previously

TIM/DTIM: Wake-up times and intervals to retrieve broadcast messages—allows for advanced power management.

Security services: WEP, WPA, and WPA2 abilities



Beacons are an interesting concept with a likeness to Bluetooth beacons. Bluetooth wireless offers much greater message capabilities and flexibility in beacon broadcasts, but there is a range of products and services that make use of Wi-Fi beaconing as well.

If the STA does find an AP or another STA to make a connection with, it then enters an authentication phase. More will be discussed on the variety of security standards used in 802.11 later in this chapter.

If the security and authentication process succeeds, the next phase is association. The device will send an association request frame to the AP. The AP will subsequently reply with an association response frame that will allow the STA to join the network or be excluded. If the STA is included, the AP will release an association ID to the client and add it to the list of connected clients.

At this point, data can be exchanged with the AP and vice versa. All data frames will be followed by an acknowledgment.





IEEE 802.11 security





In the previous section, we described the association process for a Wi-Fi device to join a network. One of the phases involved was authentication. This section will cover the various types of authentication used on Wi-Fi WLANs and various strengths and weaknesses:





WEP: Wired equivalent privacy. This mode sends a key in plain text from the client. The key is then encrypted and sent back to the client. WEP uses different size keys but they are typically 128 bit or 256 bit. WEP uses a shared key, which means that the same key is available to all clients. It can be easily compromised by simply listening and sniffing for all the authentication frames coming back to clients joining a network to determine the key used for everyone. Due to a weakness in the key generation, the first few bytes of the pseudo-random string may reveal (5% probability) a portion of the key. By intercepting five to 10 million packets, an attacker could with reasonable confidence get enough information to reveal the key.

WPA: Wi-Fi protected access (or WPA-Enterprise) was developed as the IEEE 802.11i security standard to replace WEP and is a software/firmware solution requiring no new hardware. One significant difference is WPA uses a Temporal Key Integrity Protocol (TKIP), which performs per-packet key mixing and re-keying. This means that each packet will use a different key to encrypt itself, unlike in the case of WEP. WPA starts by generating a session key based on the MAC address, temporal session key, and the initialization vector. This is fairly processor-intensive but only performed once per session. The next step is to extract the lowest 16 bits of a received packet with the result of the bits generated in phase one. This is the 104-bit per-packet key. Data can now be encrypted.

WPA-PSK: WPA pre-shared key or WPA-Personal. This mode exists where there is no 802.11 authentication infrastructure. Here, one uses a passphrase as a pre-shared key. Each STA can have their own pre-shared key associated with its MAC address. This is similar to WEP, and weaknesses have already been found if the pre-shared key uses a weak passphrase.

WPA2: This replaces the original WPA design. WPA2 uses AES for encryption, which is much stronger than TKIP in WPA. This encryption is also called CTR mode with CBC-MAC Protocol, or CCMP for short.



To achieve high bandwidth rates in 802.11n, CCMP mode must be used or the data rate will not exceed 54 Mbps. Additionally, WPA2 certification is needed to use the Wi-Fi Alliance trademark logo.





IEEE 802.11ac


IEEE802.11ac is the next generation WLAN and follow-on to the family of 802.11 standards. IEEE802.11ac was approved as a standard in December of 2013 after five years of work. The goal is to deliver multi-station throughput at least 1 GBps and a single link throughput of 500 Mbps. The technology accomplishes this through wider channel bandwidth (160 MHz), more MIMO spatial streams, and extreme density modulation (256-QAM). 802.11ac exists only in the 5 GHz band, yet will coexist with previous standards (IEEE802.11a/n).

Specifics and differences of IEEE802.11ac than IEEE802.11n are:

80 MHz channel width minimum with 160 MHz maximum channel width

Eight MIMO spatial streams: Introduced downlink MU-MIMO with up to four downlink clients

Multiple STAs with multiple antennas can now transmit and receive independently on multiple streams





256-QAM optional modulation with the ability to use 1024-WAM

Standardized beamforming ability





Multi-user MIMO is worth further detail. 802.11ac extends 802.11n from four spatial streams to eight. One of the largest contributing factors to 802.11ac speed is Spatial Division Multiplexing (SDM), referred to earlier. When combined with multi-user or multiple client aspects of 802.11ac, this technique goes by the name Spatial Diversity Multiple Access (SDMA). Essentially, MU-MIMO in 802.11ac is a wireless analog of a network switch. The following illustration depicts an 802.11ac 4 x4: 4 MU-MIMO system with 3 clients.



802.11ac MU-MIMO Usage

80211.ac also extends the modulation constellation from 64-QAM to 256-WAM. This implies there are 16 amplitude levels and 16 phase angles, requiring very precise hardware to implement. 802.11n represented six bits per symbol, while 802.11ac represents a full eight bits per symbol.

Beamforming methods have been formally standardized by the IEEE committee. For example, the committee has agreed that explicit feedback is the standard approach to beamforming association. This will allow beamforming and the performance benefits to be available from multiple vendors.

The increased bandwidth per channel (up to 80 MHz with the option of 160 MHz or two 80 MHz blocks) provides a substantial increase in throughput in the 5 GHz space. Theoretically, using an 8 x 8: 8 device, 160 MHz wide channels, and 256-QAM modulation, one could sustain 6.933 GBps throughput in aggregate.





IEEE 802.11p vehicle-to-vehicle


Vehicular networks (sometimes called vehicular ad hoc networks or VANET) are spontaneous and unstructured, operating as a car moves around a city while interacting with other vehicles and infrastructure. This model of a network makes use of vehicle-to-vehicle (V2V) and vehicle-to-infrastructure (V2I) models.

In 2004, the 802.11p task group formed and developed the first draft by April 2010. 802.11p is considered a Dedicated Short Range Communication (DSRC) within the US Department of Transportation. The goal of this network is to provide a standard and secure V2V and V2I system used for vehicular safety, toll collection, traffic status/warnings, roadside assistance, and e-commerce within a vehicle.

The topology and general use case for an IEEE 802.11p network is shown in the following figure. There are two types of nodes in the network. First is the road-side unit (RSU), which is a fixed location device much like an access point. It services to bridge vehicles and moving devices to the internet for application service usage and access to trust authorities. The other node type is the on-board unit (OBU), which resides in the vehicle. It is capable of communicating to other OBUs and the fixed RSUs when needed.

OBUs can communicate with RSUs and each other to relay vehicle and safety data. RSUs are used to bridge to application services and trust authorities for authentication. The following is an example 802.11p usage and topology:

IEEE 802.11p Use Case. Shown are OBU within vehicles and fixed infrastructure RSU.

For transportation systems, there exist several challenges in wireless communication. There is a heightened level of safety necessary to be used in vehicular communication and control. Physical effects such as Doppler shifts, latency effects, and robust ad-hoc networking are a few issues to consider.

Many of the differences from the 802.11 standards are to ensure quality and range over the speed of transmission. Other factors are changes to reduce the latency to start exchanging data. The following is a summary of the features of IEEE 802.11p and differences with the IEEE 802.11a standards:

Channel width is 10 MHz instead of 20 MHz used in 802.11a.

IEEE 802.11p operates in the 75 MHz bandwidth of the 5.9 GHz space. This implies there are a total of seven channels available (one control channel, two critical, and four services channels).

It supports half of the bit rates as compared to 802.11a; that is, 3/4.5/6/9/12/18/24/27 Mbps.

It has the same modulation schemes such as BPSK/QPSK/16QAM/64QAM and 52 subcarriers.

The symbol duration has become double compared to 802.11a: IEEE 802.11p supports 8 µs while 11a supports 4µs.

Guard time interval is 1.6µs in 802.11p while 11a has 0.8µs.

Techniques such as MIMO and beamforming are not necessary or part of the specification.



The 75 MHz channels are categorized as follows:

Channel

172

174

176

178

180

182

184



Center frequency (GHz)

5.860

5.870

5.880

5.890

5.900

5.910

5.920



Purpose

Critical life safety

Service

Service

Control

Service

Service

High power public safety





The fundamental usage model of 802.11p is to create and associate to ad hoc networks rapidly. This link will come and go as vehicles move at highway speeds in opposite directions. In the standard 802.11 model, a BSS would be the network topology to use, which requires the synchronization, association, and authentication for a wireless network to form. 802.11p provides a wildcard BSSID in the header of all frames exchanged, and are allowed to start exchanging data frames immediately after arriving on a communication channel.

The IEEE 802.11p protocol stack is derived from 802.11a, but makes important changes to address vehicular safety and security. The following figure depicts the protocol stack. A significant departure from other IEEE 802.11 stacks is the use of the IEEE 1609.x standards to address application and security models. The full stack is called the Wireless Access in Vehicular Environments (WAVE) and combines 802.11p PHY and MAC layers with IEEE 1609.x layers:

Specific differences to highlight in the stack include:

1609.1: Wave resource manager. Allocates and provisions resources as needed.

1609.2: Defines security services for application and management messages. This layer also provides two modes of encryption. A public-key algorithm using the signing algorithm ECDSA can be used. Alternatively, a symmetric algorithm based on AES-128 in CCM mode is available.

1609.3: Assists with connection setup and management of WAVE compliant devices.

1609.4: Provides multi-channel operation above the 802.11p MAC layer.



Security is critical in a VANET. There are potential threats that can directly affect public safety. Attacks can occur when bogus information is broadcast affecting how other vehicles react or perform. An attack of this nature could be a rogue device broadcasting a hazard in a road causing vehicles to hard stop. Security also needs to account for private vehicular data, masquerading as other vehicles and causing a denial of services attacks. All these can lead to catastrophic events and need standards such as the IEEE 1609.2.





IEEE 802.11ah


Based on 802.11ac architecture and PHY, 802.11ah is a variant of the wireless protocols targeted for the IoT. The design attempts to optimize for constrained sensor devices that require long battery life and can optimize range and bandwidth. 802.11ah is also referred to as HaLow, which is essentially a play on words with "ha" referring to "ah" backward and low implying low power and lower frequency. Put together, it forms a derivative of "hello".

The intent of the IEEE 802.11ah task group was to create a protocol with extended range for rural communications and offloading cell traffic. The secondary purpose was to use the protocol for low throughput wireless communications in the sub-gigahertz range. The specification was published on December 31, 2016. The architecture is most different from other forms of 802.11 standards, in the following ways, in particular:

Operates in 900 MHz spectrum. This allows for good propagation and penetration of materials and atmospheric conditions.

Channel width varies and can be set to 2, 4, 8, or 16 MHz-wide channels.

The available modulation methods are diverse and include BPSK, QPSK, 16-QAM, 64-WAM, and 256-QAM modulation techniques.

Modulation based on 802.11ac standard with specific changes. A total of 56 OFDM subcarriers with 52 dedicated to data and four dedicated to pilot tones.

Total symbol duration is 36 or 40 microseconds.

Supports SU-MIMO beamforming.

Fast association for networks of thousands of STAs using two different authentication methods to limit contention.

Provides connectivity to thousands of devices under a single access point.

Includes the ability to relay to reduce power on STAs and allow for a crude form of mesh networking using a one-hop reach method.

Allows for advanced power management on each 802.11ah node.

Allows for non-star topology communication through the use of Restricted Access Windows.

Allows for sectorization, which enables antennas to be grouped to cover different regions of a BSS (called sectors). This is accomplished using beamforming adopted from other 802.11 protocols.



The minimum throughput will be 150 kbps, based on BPSK modulation on a single MIMO stream at 1 MHz channel bandwidth. The maximum theoretical throughput will be 347 Mbps based on a 256-WAM modulation using 4 MIMO streams and 16 MHz channels.

The IEEE 802.11ah specification requires that STAs support 1MHz and 2 GHz channel bandwidths. The access points must support 1, 2, and 4 MHz channels. 8Mhz and 16 Mhz channels are optional. The narrower the channel bandwidth, the longer the range but the slower the throughput. The wider the channel bandwidth, the shorter the range but the faster the throughput.

Channel width will vary depending on the region in which 802.11ah is deployed. Some combinations will not work due to regulations in specific regions as shown:



Left: Different channelization options depending on regional regulations. Right: varying bandwidth options and channel bonding within the US region from 1MHz to 16 MHz channels.

Every attempt in the architecture of the IEEE 802.11ah standard is aimed at optimizing overall range and efficiency. This reaches down as far as the length of the MAC headers.

The goal to connect several thousand devices to a single AP is also accomplished using a unique association identifier (AID) assignment of 13 bits. This allows for grouping of STAs based on criteria (hallway lights, light switch, and so on). This allows an AP to connect to over 8191 STAs (802.11 could support only 2007 STAs). That many nodes, however, has the potential to induce a massive number of channel collisions. Even though the number of connected STAs increased, the goal was to reduce the amount of data in transit to address these stations. The IEEE task group accomplished this by removing a number of fields that were not particularly relevant for the IoT use cases, such as the QoS and DS fields. The following figure illustrates the 802.11ah MAC downlink and uplink frames as compared to standard 802.11.



A comparison of the standard 802.11 MAC frame and 802.11ah condensed frames.

Another improvement for power management and channel efficiency is attributed to removing acknowledgment frames. ACKs are implicit for bidirectional data. That is it both devices are sending and receiving data from each other. Normally an ACK would be used after the successful reception of a packet. In this bidi (BDT) mode, reception of the next frame implies that the previous data was successfully received and no ACK packet needs to be exchanged.

To avoid a sea of collisions which would prevent a functional network, 802.11ah uses a Restricted Access Window (RAW). As the STAs are divided into various groups using the AID, channels will be split into time slots. Each group would be assigned a specific time slot and no others. There are exceptions, but for the general case, the grouping forms an arbitrary isolation. The additional benefit of RAW is that devices can enter a hibernation state to conserve power whenever it isn't their time slot for transmission.

Topology-wise, there are three types of stations in an 802.11ah network:

Root access point: The principal root. Typically, serves as a gateway to other networks (WAN).

STA: The typical 802.11 station or end point client.

Relay node: A special node that combines an AP interface to STAs residing to a lower BSS and an STA interface to other relay nodes or a root AP on the upper BSS.



The following figure is the IEEE802.11ah topology. This architecture differs substantially from other 802.11 protocol in the use of a single hop relay nodes that act to create identifiable BSS. The hierarchy of relays forms a larger network. Each relay acts as an AP and STA.



IEEE802.11ah Network Topology.

In addition to the basic node types, there are three power saving states an STA can reside in:

Traffic Indication Map (TIM): Listens to AP for data transfer. Nodes will periodically receive information about data buffered for them from its access point. The message sent is called the TIM Information Element.

Non-TIM stations: Negotiates with AP directly during association to obtain transmission time on Periodic Restricted Access Windows (PRAW).

Unscheduled stations: Does not listen to any beacons and uses polling to access channels.



Power is critical in IoT sensor and edge devices based on coin cell batteries or energy harvesting. 802.11 protocols are notorious for high power demands. To remediate the power of this wireless protocol, 802.11ah uses a Max Idle Period value, which is part of the regular 802.11 specifications. In a general 802.11 network, the Max Idle Period is roughly 16 hours based on a time of 16-bit resolution. In 802.11ah, the first two bits of the 16-bit timer are scaling factor that allows the sleep duration to exceed five years.

Additional power is mitigated through changes to the beacon. As previously covered, beacons relay information on the availability of buffered frames. Beacons will carry a TIM bitmap, which inflates their size since 8191 STAs will cause the bitmap to grow substantially. 802.11ah uses a concept called TIM segmentation where some beacons carry portions of the overall bitmap. Each STA calculates when their respective beacon with bitmap information will arrive and allows the device to enter a power save mode until the moment it needs to wake and receive beacon information.

Another power-save feature is called the Target Wake Time (TWT) and is intended for STAs that rarely transmit or receive data. This is very common in IoT deployments such as temperature sensor data. An STA and its associated AP will negotiate to arrive at an agreed upon TWT and the STA will enter a sleep state until that timer is signaled.0;

The process of implicit ACKs is called a Speed Frame Exchange, and it is shown in the following figure:



IEEE 802.11ah Speed Frame Exchange: Example of Target Wake Time (TWT) used to start an STA communicating. SIFS represents the gap between the AP and STA communicating. No ACKs are used between data pairs. Only a single ACK at the end of transmission is sent before the STA returns to a sleep mode.





Summary


This chapter covered a necessary portion of IoT communication. Using IP-based standard communication greatly simplifies design and allows for rapid and easy scaling. Scaling is critical for IoT deployments that reach into thousands or millions of nodes. Using an IP-based transport allows for common tools to simply just work. 6LoWPAN and Thread demonstrate standards that can be applied to traditionally non-IP protocols such as 802.15.4. Both protocols allow for IPv6 addressing and mesh networking to massive IoT networks. 802.11 is a significant and extremely successful protocol that forms the basis of the WLAN, but can also reach into IoT devices and sensors using 802.11ah or transportation systems using 802.11p. The following table contrasts a non-IP traditional protocol to an IP protocol. Typically, the difference will be in power, speed, and range.

The architect needs to balance these parameters to deploy the correct solution:

802.15.4

802.11ah



IP Base

Non-IP based (need 6LoWPAN or Thread)

IP-based



Range

100 m

Targeted to 1000 m



Network structure

Full mesh

Hierarchical with a single node hop



Channelization

ISM 2.4 GHz with only DSSS

Sub 1 GHz ISM with various modulation coding schemes. Channel bandwidth: 1,2, 4, 8, 16 MHz



Channel interference management

CSMA/CA

RAW mechanism allowing STAs to associate group based time slots



Throughput

250 Kbps

150 kbps to 347 Mbps



Latency

Good

Best (2x better than 802.15.4)



Energy efficiency

Best (17 mJ/Packet)

Good (63 mJ/packet)



Power savings

Sleep-wake mechanisms in frames.

Multiple data structures to control and fine-tune power at various levels



Network size

Possible to 65,000

8192 STAs





The next chapter will go into the very far range protocols or the wide area network. This will include traditional cellular (4G LTE) and IoT cellular models such as Cat1. The chapter will also discuss LPWAN protocols such as Sigfox and LoRa. The WAN is the next necessary component for getting data onto the internet.





Long-Range Communication Systems and Protocols (WAN)





So far, we have discussed Wireless Personal Area Networks (WPAN) and Wireless Local Area Networks (WLAN). These types of communication bridge the sensors to a local net but not necessarily the internet or other systems. We need to remember that the IoT ecosphere will include sensors, actuators, cameras, smart-embedded devices, vehicles, and robots in the remotest of places. For the long haul, we need to address the Wide Area Network (WAN).

This chapter covers the various WAN devices and topologies including cellular (4G-LTE and the upcoming 5G standard) as well as other proprietary systems including Long Range Radio (LoRa) and Sigfox. While this chapter will cover cellular and long-range communication systems from a data perspective, it will not focus on the analog and voice portions of mobile devices. Long-range communication is usually a service, meaning it has a subscription to a carrier providing cellular tower and infrastructure improvements. This is different to the previous WPAN and WLAN architectures as they are usually contained in a device that the customer or developer produces or resells. A subscription or service-level agreement (SLA) has another effect on the architecture and constraints of systems that need to be understood by the architect.





Cellular connectivity


The most prevalent communication form is cellular radio and specifically cellular data. While mobile communication devices, had existed for many years before cellular technology, they had limited coverage, shared frequency space, and were essentially two-way radios. Bell Labs built some trial mobile phone technologies in the 1940s (Mobile Telephone Service) and 1950s (Improved Mobile Telephone Service) but had very limited success. There were also no uniform standards for mobile telephony at the time. It wasn't until the cellular concept was devised by Douglas H. Ring and Rae Young in 1947 and then built by Richard H. Frenkiel, Joel S. Engel, and Philip T. Porter at Bell Labs in the 1960s that larger and robust mobile deployments could be realized. The handoff between cells was conceived and built by Amos E. Joel Jr. also of Bell Labs, which allowed for handoff when moving cellular devices. All these technologies combined to form the first cellular telephone system, first cellular phone, and the first cellular call made by Martin Cooper of Motorola on April 3, 1979. Following is an ideal cellular model where cells are represented as hexagonal areas of optimal placement.



Cellular Theory. The hexagonal pattern guarantees separation of frequencies from the nearest neighbors. No two similar frequencies are within one hex space from each other, as shown in the case of frequency A in two different regions. This allows for frequency reuse.

The technologies and proof of concept designs eventually led to the first commercial deployments and public acceptance of mobile telephone systems in 1979 by NTT in Japan, and then in Denmark, Finland, Norway, and Sweden in 1981. The Americas didn't have a cell system until 1983. These first technologies are known as 1G, or the first generation of cellular technology. A primer for the generations and their features will be detailed next, however, the next section will specifically describe 4G-LTE as that is the modern standard for cellular communication and data. The following sections will describe other IoT and future cellular standards such as NB-IOT and 5G.





Governance models and standards


The International Telecommunication Union (ITU) is a UN specialized agency and was founded in 1865; it took its present name in 1932, before becoming a specialized agency in the UN. It plays a significant role worldwide in wireless communication standards, navigation, mobile, internet, data, voice, and next-gen networks. It includes 193 member nations and 700 public and private organizations. It too has a number of working groups called sectors. The sector relevant to cellular standards is the Radiocommunication Sector (ITU-R). The ITU-R is the body that defines the international standards and goals for various generations of radio and cellular communication. These include reliability goals and minimum data rates.

The ITU-R has produced two fundamental specifications that have governed cellular communication in the last decade. The first was the International Mobile Telecommunications-2000 (IMT-2000), which specifies the requirements for a device to be marketed as 3G. More recently, the ITU-R produced a requirement specification called International Mobile Telecommunications-Advanced (IMT-Advanced). The IMT-Advanced system is based on an all-IP mobile broadband wireless system. The IMT-Advanced defines what can be marketed as 4G worldwide. The ITU was the group that approved of Long-Term Evolution (LTE) technology in the 3GPP roadmap to support the goals of 4G cellular communication in October of 2010. The ITU-R continues to drive the new requirements for 5G.

Examples of the ITU-Advanced set of requirements for a cellular system to be labeled 4G include:

Must be an all-IP, packet-switched network

Interoperable with existing wireless

A nominal data rate of 100 Mbps when the client is moving and 1 GBps while the client is fixed

Dynamically share and use network resources to support more than one user per cell

Scalable channel bandwidth of 5 to 20 MHz

Seamless connectivity and global roaming across multiple networks



The issue is that often the entire set of ITU goals are not met, and there exists naming and branding confusion:

Feature

1G

2/2.5G

3G

4G

5G



First Availability

1979

1999

2002

2010

2020



ITU-R Specification

NA

NA

IMT-2000

IMT-Advanced

IMT-2020



ITU-R Frequency Specification

NA

NA

400 MHZ to 3 GHz

450 MHz to 3.6 GHz

TBD



ITU-R Bandwidth Specification

NA

NA

Stationary: 2 Mbps Moving: 384 Kbps

Stationary: 1 Gbps Moving: 100 Mbps

Min Down: 20 Gbps Min Up: 10 Gbps



Typical Bandwidth



2 Kbps

14.4-64 Kbps

500 to 700 Kbps

100 to 300 Mbps (peak)

TBD?



Usage/Features

Mobile telephony only.

Digital voice, SMS text, caller-ID, one-way data.

Superior audio, video, and data. Enhanced roaming.

Unified IP and seamless LAN/WAN/WLAN.

IoT, ultra density, low latency.



Standards and Multiplexing

AMPS

2G: TDMA, CDMA, GSM

2.5G: GPRS, EDGE, 1xRTT

FDMA, TDMA WCDMA, CDMA-2000

CDMA

CDMA



Handoff

Horizontal

Horizontal

Horizontal

Horizontal and vertical

Horizontal and vertical



Core Network

PSTN

PSTN

Packet Switch

Internet

Internet



Switching

Circuit

Circuit for access network and air network

Packet-based except for air interface

Packet-based

Packet-based



Technology

Analog Cellular

Digital Cellular

Broad bandwidth CDMA, WiMAX, IP-based

LTE Advanced Pro-based

LTE Advanced Pro-based, mmWave





The other standard body in the cellular world, 3GPP, is the acronym for the Third Generation Partnership Project and is the group of seven telecom organizations (also known as the Organizational Partners) from across the globe that manage and govern cellular technology. The group formed in 1998 with the partnership of Nortel Networks and AT&T Wireless and released the first standard in 2000. Organizational Partners and Market Representatives contribute to 3GPP from Japan, the USA, China, Europe, India, and Korea. The overall goal of the group is to recognize standards and specifications for the Global System for Mobile Communications (GSM) in the creation of the 3G specifications for cellular communication. 3GPP work is performed by three Technical Specification Groups (TSG) and six Working Groups (WG). The groups meet several times per year in different regions. The main focus of 3GPP releases is to make the system backward and forward compatible (as much as possible).

There is a degree of confusion in the industry as to the differences between the ITU, 3GPP, and LTE definitions. The easiest way to conceptualize the relationship is that the ITU will define the goals and standards worldwide for a device to be labeled 4G or 5G. The 3GPP responds to goals with technologies such as the family of LTE improvements. The ITU still ratifies that such LTE advancements meet their requirements to be labeled 4G or 5G.

The figure below shows the 3GPP technology releases since 2000. Boxed are the LTE evolution technologies.



3GPP Releases from 2000 to 2020.

LTE and its role in the cellular vernacular are also often confused. LTE stands for Long-Term Evolution and is the path followed to achieve ITU-R speeds and requirements (which are initially quite aggressive). Mobile phone vendors will release new smartphones in an existing cellular neighborhood using legacy backend technology such as 3G. Carriers advertise 4G-LTE connectivity if they demonstrated a substantial improvement in speed and features over their legacy 3G networks. In the mid to late-2000s, many carriers did not meet the ITU-R 4G specification but essentially got close enough. Carriers used legacy technologies and rebranded themselves as 4G in many cases. LTE-Advanced is yet another improvement that gets even closer to ITU-R goals.

In summary, the terminology can be confusing and misleading and an architect needs to read beyond the branding labels to understand the technology.





Cellular access technologies





It is important to understand how cellular systems work with multiple users of voice and data. There are several standards worth reviewing, similar to concepts covered for WPAN and WLAN systems. Before LTE was supported by the 3GPP, there were multiple standards for cellular technology, particularly GSM devices and CDMA devices. It should be noted that these technologies are incompatible with each other, from infrastructure to the device:





Frequency Division Multiple Access (FDMA): Common in analog system systems but rarely used today in digital domains. It is a technique whereby the spectrum is divided up into frequencies and then assigned to users. One transceiver at any given time is assigned to a channel. The channel, therefore, is closed to other conversations until the initial call is finished, or until it is handed off to a different channel. A “full-duplex” FDMA transmission requires two channels, one for transmitting and one for receiving.

Code Division Multiple Access (CDMA): Based on spread spectrum technology. CDMA increases spectrum capacity by allowing all users to occupy all channels at the same time. Transmissions are spread over the whole radio band, and each voice or data call is assigned a unique code to differentiate from the other calls carried over the same spectrum. CDMA allows for a soft hand-off, which means that terminals can communicate with several base stations at the same time. The dominant radio interface for third-generation mobile was originally designed by Qualcomm as CDMA2000 and targeted 3G. Because of its proprietary nature, it didn't achieve global adoption and is used in less than 18% of the global market. It manifested in the US with Verizon and Sprint being strong CDMA carriers.

Time Division Multiple Access (TDMA): In this model, the capacity of the spectrum increases by splitting each frequency into time slots. TDMA allows each user to access the entire radio frequency channel for the short period of a call. Other users share this same frequency channel at different time slots. The base station continually switches from user to user on the channel. TDMA is the dominant technology for second-generation mobile cellular networks. The GSM organization adopted TDMA as a multi-access model. It resides in four distinct bands: 900 MHz/1800 MHz in Europe and Asia and 850 MHz/1900 MHz in North and South America.



Some devices and modems may still support GSM/LTE or CDMA/LTE. GSM and CDMA are incompatible with each other. GSM/LTE and CDMA/LTE can be compatible, however, if they support the LTE bands. In older devices, voice information is delivered on a 2G or 3G spectrum, which are quite different for CDMA and GSM (TDMA). Data, too, is incompatible since LTE data runs on 4G bands.





3GPP user equipment categories


In release 8, there were five types of user equipment categories, each with different data rates and MIMO architectures. Categories allowed 3GPP to differentiate between LTE evolutions. Since release 8, more categories have been added. Categories combine the uplink and downlink capabilities as specified by the 3GPP organization. Typically, you will acquire a cellular radio or chipset that labels the category it is capable of supporting. While user equipment may support a particular category, the cell system (eNodeB, discussed later) must also support the category.

Part of the association process between a cell device and infrastructure is the exchange of capability information such as the category:

3GPP Release

Category

Max L1 Downlink Datarate (Mbps)

Max L1 Uplink Datarate (Mbps)

Max Number of Downlink MIMO



8

5

299.6

75.4

4



8

4

150.8

51

2



8

3

102

51

2



8

2

51

25.5

2



8

1

10.3

5.2

1



10

8

2,998.60

1,497.80

8



10

7

301.5

102

2 or 4



10

6

301.5

51

2 or 4



11

9

452.2

51

2 or 4



11

12

603

102

2 or 4



11

11

603

51

2 or 4



11

10

452.2

102

2 or 4



12

16

979

n/a

2 or 4



12

15

750

226

2 or 4



12

14

3,917

9,585

8



12

13

391.7

150.8

2 or 4



12

0

1

1

1



13

NB1

0.68

1

1



13

M1

1

1

1



13

19

1566

n/a

2, 4, or 8



13

18

1174

n/a

2, 4, or 8



13

17

25,065

n/a

8



Notice Cat M1 and Cat NB1 in release 13. Here the 3GPP organization reduced the data rates significantly to 1 Mbps or lower. These are the categories dedicated to IoT devices that need low data rates and only communicate in short bursts.





4G-LTE spectrum allocation and bands


There are 55 LTE bands in existence, partly due to spectrum fragmentation and market strategies. The proliferation of LTE bands is also a manifestation of government allocation and the auctioning of frequency space. LTE is also split into two categories that are not compatible:

Time Division Duplex (TDD): TDD uses a single frequency space for uplink and downlink data. The transmission direction is controlled via time slots.

Frequency Division Duplex (FDD): In an FDD configuration, the base station (eNodeB) and the user equipment (UE) will open a pair of frequency spaces for uplink and downlink data. An example may be LTE band-13, which has an uplink range of 777 to 787 MHz and a downlink range of 746 to 756 MHz. Data can be sent simultaneously to both the uplink and downlink.





Combination TDD/FDD modules exist that combine both technologies into a single modem allowing for multiple carrier usages.

Note that the downlink will always refer to communication from the eNodeB to the user equipment, and uplink will refer to the opposite direction.

A few other terms specific to LTE are needed to understand the spectrum usage:

Resource Element: This is the smallest transmission unit in LTE. The RE consists of one subcarrier for exactly one unit of symbol time (OFDM or SC-FDM).

Subcarrier spacing: This is the space between subcarriers. LTE uses 15 KHz spacing with no guard bands.

Cyclic prefix: Since there are no guard bands, a cyclic prefix time is used to prevent multipath inter-symbol interference between subcarriers.

Time slot: LTE uses a 0.5 ms time period for LTE frames. That equals six or seven OFDM symbols depending on the cyclic prefix timing.

Resource block: One unit of transmission. Contains 12 subcarriers and seven symbols, which is equal to 84 resource elements.



An LTE frame which is 10 ms long would consist of 10 subframes. If 10% of the total bandwidth of a 20 MHz channel is used for a cyclic prefix, then the effective bandwidth is reduced to 18 MHz. The number of subcarriers in 18 Mhz is 18 MHz/15 kHz = 1200. The number of resource blocks is 18 MHz/180 kHz = 100:



One slot of an LTE frame. A 10ms LTE frame consists of 20 slots. Slots are based on twelve 15 KHz spaced subcarriers and seven OFDM symbols. This combines into 12x7 = 84 resource elements.

The bands allocated for 4G-LTE are specific to regional regulations (North America, Asia-Pacific, and so on). Each band has a set of standards developed and ratified by the 3GPP and ITU. Bands are split between FDD and TDD areas and have common name acronyms routinely used in the industry, such as Advanced Wireless Service (AWS). The following is a table separating the FDD and TDD bands for the North American region only:



4G-LTE Frequency Division Duplex band allocation and North American carrier ownership.



4G-LTE Time Division Duplex band allocation for North America and North American carrier ownership.

LTE also has been developed to work in the unlicensed spectrum. Originally a Qualcomm proposal, it would operate in the 5 GHz band with IEEE 802.11a. The intent was for it to serve as an alternative to Wi-Fi hotspots. This frequency band of between 5150 MHz and 5350 MHz typically requires radios to operate at 200 mW maximum and indoors only. To this date, only T-Mobile supports the unlicensed use of LTE in areas of the USA. AT&T and Verizon are conducting public tests with LAA mode. There are three categories of unlicensed spectrum use for cellular:

LTE Unlicensed (LTE-U): As mentioned, this would coexist in the 5 GHz band with Wi-Fi devices. The control channel of LTE would remain the same while voice and data would migrate to the 5 GHz band. Within LTE-U is the concept that user equipment may only support unidirectional downlinks in the unlicensed band or full duplex.

Licensed-Assisted Access (LAA): This is similar to LTE-U but governed and designed by the 3GPP organization. It uses a contention protocol called listen-before-talk (LBT) to assist in coexisting with Wi-Fi.



A new unlicensed technology called Multifire is also an option in the unlicensed spectrum. Multifire is a form of LTE in the 5GHz space like LTE-U and LAA. Multifire, however, does not need to be anchored in a licensed band. That implies that no commercial carrier (such as AT&T or Verizon) will manage the communication. With the carrier out of the value chain, the economics change for data transport and data ownership since a large company can build and manage their own cellular network using only the unlicensed frequencies.

Multifire uses the same LBT coexistence technology as LAA. In reality, Multifire would need to rely on a blanket of small cells to provide coverage (similar to Wi-Fi access points). Another benefit of Multifire is that the band is globally used by Wi-Fi and allows for consistency between regions.





4G-LTE topology and architecture


The 3GPP LTE architecture is called the System Architecture Evolution (SEA), and its overall goal is to deliver a simplified architecture based on all-IP traffic. It also supports high-speed communication and low latency over Radio Access Networks (RANs). In release 8 of the 3GPP roadmap, LTE was introduced. Since the network is entirely composed of IP packet-switched components, that means that voice data is also sent across as digital IP packets. This is another fundamental difference from the legacy 3G network.

3G topology used circuit switching for voice and SMS traffic and packet switching for data. Circuit switching differs fundamentally from packet switching. Circuit switching manifests from the original telephone switching network. It will use a dedicated channel and path between a source and a destination node for the duration of the communication. In a packet switch network, messages will be broken into smaller fragments (called packets in the case of IP data) and will seek the most efficient route from a source of data to the destination. A header enveloping the packet provides destination information amongst other things.

The typical 4G-LTE network has three components: a client, a radio network, and a core network. The client is simply the user's radio device. The radio network represents frontend communication between the client and the core network and includes radio equipment such as the tower. The core network represents the management and control interface of the carrier and may manage one or more radio networks.

The architecture can be decomposed as follows:

Evolved Universal Terrestrial Radio Access Network (E-UTRAN): This is 4G-LTE air interface to LTE UE devices. E-UTRAN uses OFDMA for the downlink portion and SC-FDMA for the uplink. Subsequently, this makes it incompatible with the legacy 3G W-CDMA technology. The E-UTRAN consists of eNodeBs but can contain several that are interlinked by a channel called the X2 interface.

eNodeB: This is the core of the radio network. It handles communications between the UE and the core (EPC). Each eNodeB is a base station that controls eUEs in one or more cellular zones and allocates resources to a specific client in 1 ms chunks called TTI. It will allocate channel resources based on usage conditions to various UEs in its cell proximity. eNodeB systems also have the responsibility of triggering state transitions from IDLE to CONNECTED. It also handles the mobility of the UE such as the handover to other eNodeBs. It is also responsible for transmission and congestion control. The interface out of the eNodeB and into the EPC is the S1 interface.

User Equipment (UE): This is the client hardware and is composed of Mobile Terminations (MT), which perform all the communication functions, Terminal Equipment (TE), which manages terminating data streams, and the Universal Integrated Circuit Card (UICC), which is the SIM card for identity management.

Evolved Packet Core (EPC): In the design of LTE, the 3GPP decided to build a flat architecture, and separate user data (called the user plane) and control data (called the control plane). This is allowed for more efficient scaling. The EPC has five basic components listed here: Mobility Management Equipment (MME): Responsible for control plane traffic, authentication and security, location and tracking, and mobility issue handlers. The MME also needs to recognize mobility in IDLE mode. This is managed using a Tracking Area (TA) code. The MME also governs the Non-Access Stratum (NAS) signaling and bearer control (described later).

Home Subscriber Server (HSS): This is a central database associated with the MME that contains information about the network operator subscribers. This may include keys, user data, maximum data rates on the plan, subscriptions, and so on. The HSS is a holdover from the 3G UMTS and GSM networks.

Servicing Gateway (SGW): Responsible for user plane and user data flow. Essentially, it acts as a router and forwards packets between the eNodeB and PGW directly. The interface out of the SGW is called the S5/S8 interface. S5 is used if two devices are on the same network and S8 used if they are on different networks.

Public Data Network Gateway (PGW): Connects mobile networks to external sources including the internet or other PDN networks. It also allocates the IP address for the mobile devices connected. The PGW manages the Quality of Service (QoS) for various internet services such as video streaming and web browsing. It uses an interface called the SGi to reach into various external services.

Policy Control and Charging Rules Function (PCRF): This is another database that stores policies and decision-making rules. It also controls the flow-based charging functions.





Public Data Network (PDN): This is the external interface, and for the most part, the internet. It can include other services, data centers, private services, and so on.





In a 4G-LTE service, a customer will have a carrier or operator known as their Public Land Mobile Network (PLMN). If the user is in that carrier's PLMN, he or she is said to be in Home-PLMN. If the user moves to a different PLMN outside their home network (for example, during international travel) then the new network is called the visited-PLMN. The user will connect their EU to a visited-PLMN which requires resources of the E-UTRAN, MME, SGW, and PGW on the new network. The PGW can grant access to a local-breakout (a gateway) to the internet. This, effectively, is where roaming charges start to affect the service plans. Roaming charges are applied by the visited-PLMN and accounted for on the client's bill. Below is a graphic illustrating this architecture. On the left side is a top-level view of the 3GPP System Architecture Evolution for 4G-LTE. In this case, it represents the client UE, the radio node E-UTRAN, and the core network EPC, all residing in a Home-PLMN. On the right is a model of the mobile client moving to a visited-PLMN and distributing the functionality between the visited-PLMN E-UTRAN and EPC, as well as crossing back to the home network. The S5 interconnect is used if the client and carrier reside on the same network and the S8 interface if the client is crossing across different networks.



Right: 3GPP System Architecture. Left: Top-Level View of 4G LTE Architecture.

Non-Access Stratum (NAS) signaling was mentioned in the MME. It is a mechanism for passing messages between UE and core nodes such as switching centers. Examples may include messages such as Authentication Messages, Updates, or Attach Messages. The NAS sits at the top of the SAE protocol stack.



The GPRS Tunneling Protocol (GTP) is an IP/UDP-based protocol used in LTE. GTP is used throughout the LTE communication infrastructure for control data, user data, and charging data. In the figure above, most of the S* channel's connecting components use GTP packets.

The LTE architecture and protocol stack use what is known as bearers. Bearers are a virtual concept used to provide a pipe to carry data from one node to another node. The pipe between the PGW and UE is called the EPS Bearer. As data enters the PGW from the internet, it will package the data in a GTP-U packet and send it to the SGW. The SGW will receive the packet, strip the GTP-U header, and repackage the user data in a new GTP-U packet on its way to the eNB. Again, the eNB repeats the process and will repackage the user data after compressing, encrypting, and routing to logical channels. The message will then transmit to the UE through a radio bearer. One advantage bearers bring to LTE is QoS control. Using bearers, the infrastructure can guarantee certain bitrates dependent on customer, application, or usage.

When a UE attaches to a cellular network the first time, it is assigned a default bearer. Each default bearer has an IP address, and a UE may have several default bearers, each with a unique IP. This is a best-effort-service meaning it wouldn't be used for guaranteed QoS-like voices. A dedicated bearer, in this case, is used for QoS and good user experience. It will be initiated when the default bearer is incapable of fulfilling a service. The dedicated bearer always resides on top of the default bearer. A typical smartphone may have the following bearers running at any time:

Default Bearer 1: Messaging and SIP signaling

Dedicated Bearer: Voice data (VOIP) linked to default bearer 1

Default Bearer 2: All smartphone data services such as email, browser



The switching aspect of LTE is also worth mentioning. We looked at the different generations of 3GPP evolutions from 1G to 5G. One goal of the 3GPP and carriers was to move to a standard and accepted Voice over IP (VOIP) solution. Not only would data be sent over standard IP interfaces but so would voice. After some contention between competing methods, the standards body settled on VoLTE as the architecture. VoLTE uses an extended variant of the Session Initiation Protocol (SIP) to handle voice and text messages. A codec known as the Adaptive Multi-Rate (AMR) codec provides wideband high-quality voice and video communication. Later, we will look at new 3GPP LTE categories that drop VoLTE to support IoT deployments.

It must be noted that LTE is one of two standards for mobile broadband. Wireless Mobility Internet Access (WiMAX) is the alternative. LTE WiMAX is a wideband, IP-based, OFDMA communication protocol. WiMAX is based on the IEEE802.16 standards and managed by the WiMAX Forum. WiMAX resides in the 2.3 and 3.5 GHz range of the spectrum but can reach into the 2.1 GHz and 2.5 GHz range, like LTE. Introduced commercially before LTE took off, WiMAX was the Sprint and Clearwire choice for high-speed data.

WiMAX, however, has only found niche uses. LTE is generally much more flexible and widely adopted. LTE also advanced slowly in an attempt to keep backward compatibility with older infrastructure and technologies in place, while WiMAX was meant for new deployments. WiMAX did have an advantage regarding ease of setup and installation over LTE, but LTE won the bandwidth race and in the end bandwidth defined the mobile revolution.





4G-LTE E-UTRAN protocol stack


The 4G-LTE stack has similar characteristics to other derivatives of the OSI model, however, there are other characteristics of the 4G control plane, as can be seen in the figure. One difference is that the Radio Resource Control (RRC) has extensive reach throughout the stack layers. This is called the control plane. This control plane has two states: idle and connected. When idle, the UE will wait in a cell after associating with it and may monitor a paging channel to detect if an incoming call or system information is targeted at it. In the connected mode, the UE will establish a downlink channel and information on the neighbor cell.



The E-UTRAN will use the information to find the most suitable cell at the time:

E-UTRAN Protocol Stack for 4G-LTE, and comparison to the simplified OSI model.

The control plane and user plane also behave slightly differently and have independent latencies. The user plane typically has a 4.9 ms latency while the control plane will use a 50 ms latency.

The stack is composed of the following layers and features:

Physical Layer 1: This layer is the radio interface also known as the air interface. Responsibilities include link adaption (AMC), power management, signal modulation (OFDM), digital signal processing, searching for cell signals, synchronization with cells, handover control, and cell measurements for the RRC layer.

Medium Access Control (MAC): Similar to other OSI-derived stacks, this performs a mapping between logical channels and transport layers. The MAC layer multiplexes various packets onto transport blocks (TB) for the physical layer. Other responsibilities include scheduling reporting, error correction, channel prioritization, and managing multiple UEs.

Radio Link Control (RLC): RLC transfers upper layer PDUs, performs error correction via ARQ, and handles the concatenation/segmentation of packets. Additionally, it provides a logical channel interface, detection of duplicate packets, and performs re-assembly of received data.

Packet Data Convergence Control Protocol (PDCP): This layer is responsible for packet compression and decompression. The PDCP also manages the routing of user plane data as well as control plane data with feedback into the RRC. The management of duplicate SDUs (such as in a handover procedure) is handled in this layer. Other features include cipher and deciphering, integrity protection, timer-based discarding of data, and re-establishment of channels.

Radio Resource Control (RRC): The RRC layer broadcasts system information to all the layers including Non-Access Stratums (NAS) and Access Stratums (AS). It manages security keys, configurations, and the control of radio bearers.

Non-Access Stratum: This represents the highest level of the control plane and is the main interface between a UE and the MME. The principal role is session management, therefore the mobility of the UE is established at this level.

Access Stratum: This is a layer below the NAS whose purpose is to convey non-radio signals between the UE and radio network.





4G-LTE geographical areas, dataflow, and handover procedures


Before considering the process of cellular handover, we need to first define the vernacular surrounding areas and network identification. There are three types of geographical areas in an LTE network:

MME Pool Areas: This is defined as a region where a UE can move without changing the serving MME.

SGW Service Areas: This is defined as an area where one or more SGW will continue to provide service for a UE.

Tracking Areas (TA): These define sub-areas composed of small MME and SGW areas that don't overlap. They are used to track the location of a UE that is in standby mode. This is essential for handover.



Each network in a 4G-LTE network must be uniquely identifiable for these services to work. To assist with identifying networks, the 3GPP uses a network ID consisting of:

Mobile Country Code (MCC): Three digit identification of the country the network resides within (for example, Canada is 302)

Mobile Network Code (MNC): A two or three digit value indicating the carrier (for example, Rogers Wireless is 720)



Each carrier also needs to uniquely identify each MME it uses and maintains. The MME is needed locally within the same network and globally when a device is moving and roaming to find the home network. Each MME has three identities:

MME Identifier: This is the unique ID that will locate a particular MME within a network. It is composed of the following two fields: MME Code (MMEC): This identifies all the MMEs that belong to the same pool area mentioned previously.

MME Group Identity (MMEI): This defines a group or cluster of MMEs.





Globally Unique MME Identifier (GUMMEI): This is the combination of a PLNM-ID and the MMEI described previously. The combination forms an identifier that can be located anywhere globally from any network.



The Tracking Area Identity (TAI) allows a UE device to be tracked globally from any position. This is the combination of the PLMN-ID and the Tracking Area Code (TAC). The TAC is a particular physical sub-region of a cell coverage area.

The cell ID is constructed from a combination of the E-UTRAM Cell Identity (ECI), which identifies the cell in a network, the E-UTRAN Cell Global Identifier (ECGI), which identifies the cell anywhere in the world, and a physical cell identity (integer value 0 to 503) used to distinguish it from another neighbor EU.

The handover process involves transferring a call or data session from one channel to another in a cell network. The handover most obviously occurs if the client is moving. A handover can also be instigated if the base station has reached its capacity and is forcing some devices to relocate to another base station in the same network. This is called Intra-LTE Handover. Handover can also occur between carriers while roaming, called Inter-LTE Handover. It is also possible to hand over to other networks (Inter-RAT Handover), such as moving between a cellular signal and a Wi-Fi signal.

If the handover exists in the same network (Intra-LTE Handover) then two eNodeBs will communicate through the X2 interface and the core network EPC is not involved in the process. If the X2 isn't available, the handover needs to be managed by the EPC through the S1 interface. In each case, the source eNodeB initiates the transaction request. If the client is performing an Inter-LTE, handover is more complicated as two MMEs are involved: a source (S-MME) and a target (T-MME).

The process allows for seamless handover, as shown in the series of steps in the figure here. First, the source eNodeB will decide to instantiate a handover request based on capacity or client movement. The eNodeB does this by broadcasting a MEASUREMENT CONTROL REQ message to the UE. These are network measurement reports sent out when certain thresholds are hit. A Direct Tunnel Setup (DTS) is created where the X2 transport bearer communicates between the source eNodeB and the destination eNodeB. If the eNodeB determines it is appropriate to launch a handover, it finds the destination eNodeB and sends a RESOURCE STATUS REQUEST over the X2 interface to determine if the target can accept a handover. The handover is launched with the HANDOVER REQUEST message. The destination eNodeB prepares resources for the new connection. The source eNodeB will detach the client UE. Direct packet forwarding from the source eNodeB to the destination eNodeB ensures no packets in flight are lost. Next, the handover completes by using a PATH SWITCH REQUEST message between the destination eNodeB and the MME to inform it that the UE has changed cells. The S1 bearer will be released, as will the X2 transport bearer, because no residue packets should be flowing to the EU client at this time:



An example of Intra-LTE handover between two eNodeBs.

A number of IoT gateway devices using 4G-LTE allow for multiple carriers (such as Verizon and ATT) to be available on a single device gateway or router. Such gateways can switch and handover between carriers seamlessly without data loss. This is an important characteristic for mobile and transportation based IoT systems such as logistics, emergency vehicles, and asset tracking. Handover allows such moving systems to migrate between carriers for better coverage and efficient rates.





4G-LTE packet structure


The LTE packet frame structure is similar to other OSI models. The figure here illustrates the decomposition of the packet from PHY up to the IP layer. The IP packet is enveloped in the 4G-LTE layers:

4G-LTE Packet Structure. IP packets are reformed in the PDCP SDUs and flow through the RLC, MAC, and PHY layers. The PHY creates slots and sub-frames of transport blocks from the MAC layer.





Cat 0, Cat 1, Cat M1, and NB-IoT


The connectivity of an IoT device to the internet is different from typical consumer-based cellular devices like a smartphone. A smartphone mainly pulls information off the internet in a downlink. Often that data is large and streaming in real time, such as video data and music data. In an IoT deployment, the data can be very sparse and arrive in short bursts. More often than not, the majority of data will be generated by the device and travel over the uplink. The LTE evolution has progressed in building a cellular infrastructure and a business model focused and optimized for mobile consumers. The new shift is to satisfy the IoT producers of data at the edge as that will dwarf the number of consumers. The following sections cover Low Power Wide Area Networks (LPWAN) and specifically the LTE variety of LPWAN. These are suitable for IoT deployments and the features vary.

Up until release 13, the lowest data rate suitable for typical IoT devices was Cat-1. As the mobile revolution demanded higher speeds and services, Cat-1 was overlooked in the 3G and 4G timeline. Release 12 and 13 addressed the IoT device requirements for low cost, low power, sparse transmission, and range extensions.

One thing all these protocols share by design is that they are all compatible with the existing cellular hardware infrastructure. However, to enable new features, software changes to the protocol stack are necessary for the infrastructure. Without such changes, Cat-0, Cat-M1, and Cat-NB UEs will not even see the network. The IoT architect needs to ensure that the cellular infrastructure they intend to deploy into has been updated to support these standards.

Cat-1 hasn't gained significant traction in the market and we won't go into the specification here as it is similar to the 4G-LTE material discussed previously.





LTE Cat-0


Cat-0 was introduced in release 12 and was the first architecture outside of Cat-1 targeted to IoT needs. The design, like many other LTE specifications, is IP-based and runs in the licensed spectrum. A significant difference is in the uplink and downlink peak data rates (1 Mbps each), as opposed to Cat-1 at 10 Mbps for the downlink and 5 Mbps for the uplink. While the channel bandwidth stays at 20 MHz, the reduction in data rates greatly simplifies the design and reduces cost. Additionally, moving from a full duplex to a half-duplex architecture further improves cost and power.

Usually, the NAS layer of the LTE stack doesn't have much of a role in servicing UEs. In Cat-0, the 3GPP architects changed the NAS abilities to assist in power saving at the UE level. Cat-0 introduces Power Save Mode (PSM) to the LTE specification to address hard power constraints. In a traditional LTE device, the modem remains connected to a cellular network, consuming power even if the device is active, idle, or sleeping. To prevent connection power overhead a device can disconnect and disassociate from a network, but it would incur a 15 to 30 second reconnect and search phase. PSM allows the modem to enter a very deep sleep state—at any time it is not actively communicating—yet wake quickly. It does this by performing a Tracking Area Update (TAU) periodically and remaining reachable via paging for a programmable period of time. Essentially, an IoT device could enter an idle period of 24 hours and wake once a day to broadcast sensor data all while staying connected. All the negotiations for setting these individual timers are managed via the changes at the NAS level and are relatively simple to enable by setting two timers:

T3324: Time the UE stays in idle mode. If the IoT device application is certain no messages are pending, it can reduce the value of the timer.

T3412: Once the T3324 timer expires, the device will enter PSM for a period of T3412. The device will be at the lowest possible energy state. It cannot participate in paging or network signaling. The device, however, maintains all UE state (bearers, identities). The maximum time allowed is 12.1 days.



When using PSM or other advanced power management modes, it is wise to test compliance with carrier infrastructure. Some cell systems require a ping every 2 to 4 hours to the UE. If the carrier loses connectivity for periods greater than 2 to 4 hours, they may deem the UE unreachable and detach.

There is little coverage and adoption of Cat-0, and it has seen limited growth. Most of the new features of Cat-0 have been included in Cat-1 and other protocols.





LTE Cat-1


LTE Cat-1 reuses the same chipsets and carrier infrastructure as Cat-4, so it can be used throughout the USA on Verizon and AT&T infrastructure. Cat-1 has significant market traction in the M2M industry. The specification was part of release eight and was later updated to support power saving mode and the single LTE antenna of Cat-0.

Cat-1 is considered a medium-speed LTE standard, meaning the downlink is 10 Mbps and the uplink is 5 Mbps. At these rates, it is still capable of transporting voice and video streams as well as M2M and IoT data payloads. By adopting the Cat-0 PSM and antenna design, Cat-1 operates at a with less power than traditional 4G-LTE. It is also significantly less costly to design radios and electronics.

Cat-1 is currently the best choice in cellular connectivity for IoT and M2M devices with the widest coverage and lowest power. While significantly slower than regular 4G-LTE (10 Mbps versus 300 Mbps downlink), the radio can be designed to fall back to 2G and 3G networks as needed. Cat-1 reduces design complexity by incorporating time-slicing, which also reduces the speed considerably.

Cat-1 can be thought of as a complement to newer narrowband protocols, covered next.





LTE Cat-M1 (eMTC)


Cat-M1, also known as enhanced Machine-Type Communication (and sometimes just called Cat-M), was designed to target IoT and M2M use cases with low cost, low power, and range enhancements. Cat-M1 was released in the 3GPP release 13 schedule. The design is an optimized version of the Cat-0 architecture. The single largest difference is that the channel bandwidth is reduced from 20 MHz to 1.4 MHz. Reducing the channel bandwidth from a hardware point of view relaxes timing constraints, power, and circuitry. Costs are also reduced by up to 33% compared to Cat-0 since the circuitry doesn't need to manage a wide 20 Mhz spectrum. The other significant change is in the transmit power, which is reduced from 23 dB to 20 dB. Reducing the transmit power by 50% reduces cost further by eliminating an external power amplifier and enables a single-chip design. Even with the reduction in transmit power, the coverage improves by +20 dB.

Cat-M1 follows other late 3GPP protocols that are IP-based. While not a MIMO architecture, throughput is capable of 375 Kbps or 1 Mbps on the uplink as well as downlink. The architecture allows for mobility and justifiably for in-vehicle or V2V communication. The bandwidth is wide enough to allow for voice communication as well, using VoLTE. Multiple devices are allowed on a Cat-M1 network using the traditional SC-FDMA algorithm. Cat-M1 also makes use of more complex features such as frequency hopping and turbo-coding.

Power is critical in IoT edge devices. The most significant power reduction feature of Cat-M1 is the transmission power change. As mentioned, the 3GPP organization reduced the transmission power from 23 dB to 20 dB. This reduction in power does not necessarily mean a reduction in range. The cell towers will rebroadcast packets six to eight times. This is to ensure reception in particularly problematic areas. Cat M1 radios can turn off reception as soon as they receive an error-free packet.

Another power saving feature is the Extended Discontinuous Receive (eDRX) mode which allows for a sleep period of 10.24 seconds between paging cycles. This reduces power considerably and enables the UE to sleep for a programmable number of hyper-frames (HF) of 10.24 seconds each. The device can enter this extended sleep mode for up to 40 minutes. This allows the radio to have an idle current as low as 15 uA.

Additional power mitigation abilities and features include:

PSM, as introduced in Cat-0 and release 13.

Relaxing neighbor cell measurements and reporting periods. If the IoT device is stationary or slow moving (sensor on a building, cattle in a feedlot) then the call infrastructure can be tuned to limit the control messages.

User and control plane CIoT EPS optimization is a feature that is part of the RRC in the E-UTRAN stack. In normal LTE systems, a new RRC context must be created every time the UE wakes from IDLE mode. This consumes the majority of power when the device simply needs to send a limited amount of data. Using the EPS optimization, the context of the RRC is preserved.

Header compression of TCP or UDP packets.

Reduction of sync time after long sleep periods.



The next section covers Cat-NB. The market has developed a perception that Cat-NB is substantially lower in power and cost over all other protocols such as Cat-M1. That is partially true, and an IoT architect must understand the use cases and carefully choose which protocol is correct. For example, if we hold the transmit power constant between Cat-NB and Cat-M1, we see Cat-M1 has an 8 dB gain in coverage. Another example is power; while Cat-M1 and Cat-NB have similar and aggressive power management features, Cat-M1 will use less power for larger data sizes. Cat-M1 can transmit the data faster than Cat-NB and enter a deep sleep state that much sooner. This is the same concept Bluetooth 5 used to reduce power, simply by sending the data faster and then entering a sleep state. Also, as of the time of writing, Cat-M1 is available today while Cat-NB has not hit USA markets.





LTE Cat-NB


Cat-NB, also known as NB-IoT, NB1, or Narrow Band IoT, is another LPWAN protocol governed by the 3GPP in release 13. Like Cat-M1, Cat-NB operates in the licensed spectrum. Like Cat-M1, the goal is to reduce power (10-year battery life), extend coverage (+20 dB), and reduce cost ($5 per module). Cat-NB is based on the Evolved Packet System (EPS) and optimizations to the Cellular Internet of Things (CIoT). Since the channels are much narrower than even the 1.4 MHz Cat-M1, cost and power can be reduced even further with the simpler designs of the analog-to-digital and digital-to-analog converters.

Significant differences between Cat-NB and Cat-M1 include:

Very narrow channel bandwidth: As with Cat-M1, which reduced the channel width to 1.4 MHz, Cat-NB reduces it further to 180 kHz for the same reasons (reducing cost and power).

No VoLTE: As the channel width is so low, it does not have the capacity for voice or video traffic.

No mobility: Cat-NB will not support handover and must remain associated with a single cell or remain stationary. This is fine for the majority of secured and fastened IoT sensor instruments. This includes handover to other cells and other networks.



Regardless of these significant differences, Cat-NB is based on OFDMA (downlink) and SC-FDMA (uplink) multiplexing and uses the same subcarrier spacing and symbol duration. The E-UTRAN protocol stack is also the same with the typical RLC, RRC, and MAC layers, and remains IP-based but is considered a new air interface for LTE.

Since the channel width is so small (180 kHz), it allows for the opportunity to bury the Cat-NB signal inside a larger LTE channel, replace a GSM channel, or even exist in the guard channel of regular LTE signals. This allows for flexibility in LTE, WCDMA, and GSM deployments. The GSM option is simplest and fastest to market. Some portions of the existing GSM traffic can be placed on the WCDMA or LTE network. That frees up a GSM carrier for IoT traffic. In-band provides a massive amount of spectrum to use as the LTE bands are much larger than the 180 kHz band. This allows for deployments of up to 200,000 devices in theory per cell. In this configuration, the base cell station will multiplex LTE data with Cat-NB traffic. This is entirely possible since the Cat-NB architecture is a self-contained network and interfaces cleanly with existing LTE infrastructure. Finally, using Cat-NB as the LTE guard band is a unique and novel concept. Since the architecture re-uses the same 15 kHz subcarriers and design, it can be accomplished with existing infrastructure.

The following figure illustrates where the signal is allowed to reside:



Cat-NB deployment options as a guard band, within a GSM signal, or in-band with LTE.

Since the Maximum Coupling Loss (MCL) is 164 dB, it allows for deep coverage in basements, tunnels, rural areas, and open environments. The 20 dB improvement over standard LTE is a 7x increase in the coverage area. The data rate obtainable is a function of the SNR and the channel bandwidth, as we have seen in Shannon-Hartley's theorem. For the uplink communication, Cat-NB will assign each UE one or more 15 kHz subcarriers in a 180 kHz resource block. Cat-NB has the option to reduce the subcarrier width to as low as 3.75 kHz, which allows more devices to share the space. However, one must carefully inspect the interference potential between edge 3.75 kHz subcarriers and the next 15 kHz subcarrier.

The data rate, as we have learned, is a function of coverage. Ericcson has conducted tests illustrating the effect of varying coverage and signal strength. The data is revealing and explains why latency may become a significant issue for Cat-NB.

At the cell border: Coverage=+0dB, Uplink Time = 39ms, Total Transmit Time = 1,604 ms.

At medium coverage: Coverage = +10dB, Uplink Time = 553 ms, Total Transmit Time = 3,085 ms.

Worst case: Coverage: +20dB, Uplink Time = 1,923 ms, Total Transmit Time = 7,623 ms.

From: "NB-IOT: a sustainable technology for connecting billions of devices", Ericcson Technology Review Volume 93, Stockholm, Sweden, #3 2016



Power management is very similar to Cat-M1. All the power management techniques in release 12 and 13 apply to Cat-NB as well (PSM, eDRX, and all the other features are included).





5G


5G (or 5G-NR for new radio) is the next generation IP-based communication standard being drafted and designed to replace 4G-LTE. That said, it draws on some technologies of 4G-LTE but comes with substantial differences and new capabilities. So much material has been written on 5G that it dwarfs even current Cat-1 and Cat-M1 material. In part, 5G promises to deliver substantial abilities for IoT, commercial, mobile, and vehicular use cases. 5G also improves bandwidth, latency, density, and user cost. Rather than build different cellular services and categories for each use case, 5G attempts to be a single umbrella standard to serve them all. Meanwhile, 4G-LTE will continue to be the predominant technology for cellular coverage and will continue to evolve. 5G is not a continuing evolution of 4G; it derives from 4G but is a new set of technologies. In this section, we will only discuss elements that pertain to IoT use cases or are of merit and have the potential to become part of the 5G specification.

5G is aiming for initial customer launch in 2020, however, mass deployment and adoption may follow years later in the mid-2020s. The goals and architecture of 5G are still evolving, and have been since 2012. There have been three distinct and different goals for 5G: http://www.gsmhistory.com/5g/. Goals range from converged fiber and cellular infrastructure, ultra-fast mobiles using small cells, and lowered cost barriers of mobile, all part of the 5G story. Again, the ITU-R has approved the international specifications and standards, while the 3GPP is following with a set of standards to match the ITU-R timeline. The 3GPP RAN has already begun analyzing study items as of release 14. The intent is to produce a two-phase release of 5G technologies. Phase one will complete in 2018 with release 15 and phase two is targeted for release 19 in 2019. Both align with the 2020 goal of commercial launch.

Verizon is planning a commercial deployment of 5G by mid-2018 (pre-3GPP specification). 3GPP has accelerated 5G as non-standalone (NSA) and standalone (SA). NSA will use the LTE core while SA will use the 5G Next Generation Core. 5G for IoT-specific use cases is several years out since the initial market focus is mobile and smartphone users.

The general consensus of features in 5G that should be understood and have a good prospect of being in the final release are:

Enhanced Mobile Broadband (eMBB): 1 to 10 GBps connections to UEs/endpoints in the field (not theoretical)

100% coverage across the globe (or perception of)

10 to 100x the number of connected devices over 4G-LTE

Connectivity at a speed of 500 km/h





Ultra-Reliable and Low-Latency Communications (URLLC): Sub < 1 ms end-to-end round-trip latency

99.999% availability (or perception of)





Massive Machine Type Communications (mMTC): 1000x bandwidth per unit area; this implies roughly 1 million nodes in 1 km2

Up to a 10 year battery life on endpoint IoT nodes

90% reduction in network energy usage:





5G Topologies. From left to right: 1 million node density through small cells and macrocell deployment. Indoor and home use of 60 Ghz with macrocell at 4 Ghz backhaul. Dual connectivity example with split control and data planes using two radios for user data and 4 GHz macrocells for the control plane. Device to device connectivity. Massive MIMI with beamforming from a single mmWave antenna. Density increase with a mix of small cells in mmWave for blanket coverage of user data.

Current 4G-LTE systems mainly use frequencies below the 3 GHz range. 5G will radically change the spectrum usage. While the space below 3 GHz is significantly congested and sliced into slivers of bandwidth, 5G may use a multitude of frequencies. Under strong consideration is the use of millimeter waves (mmWave) in the unlicensed 24 to 100 GHz range. These frequencies directly address Shannon's Law by increasing the bandwidth B of the law with extremely wide channels. Since the mmWave space is not saturated or sliced up by various regulatory bodies, channels as wide as 100 MHz in the 30 GHz to 60 GHz frequencies are possible. This will provide the technology to support multi-gigabit per second speeds.

The principal issues with mmWave technology are free space path loss, attenuation, and penetration. If we remember that free space path loss can be calculated as Lfs = 32.4 + 20log10f + 20log10R (where f is the frequency and R is the range), then we can see how the loss is affected by a 2.4, 30, and 60 GHz signal as:

2.4 GHz, 100 m range: 80.1 dB

30 GHz, 100 m range: 102.0 dB

60 GHz, 100 m range: 108.0 dB

2.4 GHz, 1 km range: 100.1 dB

30 GHz, 1 km range: 122.0 dB

60 GHz, 1 km range: 128.0 dB



20 dB is significant, but with mmWave, antennas can accommodate significantly more antenna elements than a 2.4 GHz antenna. Free path loss is significant only if the antenna gain is independent of frequency. If we keep the antenna area constant, it is possible to mitigate the effects of path loss. This requires Massive-MIMO (M-MIMO) technology. M-MIMO will incorporate macrocell towers with 256 to 1024 antennas. Beamforming at the macrocell will be used as well. When combined with mm-Waves, M-MIMO has challenges in terms of contamination from nearby towers, and multiplexing protocols like TDD will need to be re-architected.

Another challenge with 5G is the need for very large antenna arrays to support M-MIMO with hundreds of antennas in a dense tower configuration. Under consideration are tightly packed 3D structures of antennas to support beamforming at the tower. Factors such as wind and storm effects on these towers still need to be resolved.

Attenuation is a very significant issue. At 60 GHz, a signal will be absorbed by oxygen in the atmosphere. Even vegetation and the human body itself will have a serious effect on signals. A human body will absorb so much RF energy at 60 Ghz that it will form a shadow. A signal traveling at 60 GHz will have a loss of 15 dB/km. Thus, long-range communication will be subpar using 5G at 60 GHz and will require either a blanket of small cells or a drop to a slower frequency space. This is one of the reasons the 5G architecture will require multiple bands, small cells, macrocells, and a heterogeneous network.

Finally, material penetration in the mmWave spectrum is challenging. mmWave signals attenuate through drywall at 15 dB and glass windows on buildings contribute to a 40 dB loss. Therefore, indoor coverage with a macrocell is close to impossible. This and other types of signaling issues will be mitigated through the widespread use of indoor small cells:



Various Frequencies Versus Penetration Loss (dB). Typical building composite materials were tested (glass, brick, wood) from external to internal areas. The loss of infrared reduction glass is particularly difficult for mm-Wave frequencies. Source: Aalto University et al., “5G channel model for bands up to 100 GHz,” 3rd Workshop on Mobile Communications in Higher Frequency Bands (MCHFB), White Paper, Dec. 2016.

UEs may use multiple bands simultaneously. For example, an endpoint device may use lower frequencies for long-range communication and switch to mmWave for indoor and personal communication. Another scheme being considered is Dual Connectivity. Dual Connectivity steers data traffic across multiple bands dependent on data type. For example, the control plane and user plane of the stack are already divided. User plane data may steer to a nearby small cell using a 30 GHz frequency while control data may be steered to a long-range eNodeB macrocell tower at the typical 4 Ghz rate.

Another improvement for increased speed is spectral efficiency. The 3GPP is focusing on certain design rules:

15 kHz subcarrier spacing to improve multiplexing efficiency.

Flexible and scalable numerology of symbols from 2M symbols to 1 symbol to reduce latency.



As previously discussed, spectral efficiency is given as bps/Hz, using D2D and M-MIMO to improve spectral efficiency along with changes to the air interface and new radio. 4G-LTE uses OFDM, which works well for large data transmissions. However, for IoT and mMTC, the packets are much smaller. The overhead for OFDM also impacts latency in very dense IoT deployments. Hence, new waveforms are being architected for consideration:



Non-orthogonal Multiple Access (NOMA): Allows multiple users to share a wireless medium.

Filter Bank Multi-Carrier (FBMC): Controls the shape of subcarrier signals to remove side-lobes through DSPs.

Sparse Coded Multiple Access (SCMA): Allows data to be mapped to different code from different codebooks.



Latency reduction is also a goal of the ITU and 3GPP. Latency reduction is crucial for 5G use cases such as interactive entertainment and virtual reality headsets, but also for industrial automation. However, it plays a large role in power reduction (another ITU goal). 4G-LTE can have a latency of up to 15 ms on 1 ms subframes. 5G is preparing for sub-1 ms latency. This too will be accomplished using small cells to route rather than congested macrocells. The architecture also plans for Device to Device (D2D) communication, essentially taking the cell infrastructure out of the data path for communication between UEs.

4G systems will continue to exist, as the rollout of 5G will take several years. There will be a period of coexistence that needs to be established. Release 15 will add further definitions to the overall architecture such as channel and frequency choices. From an IoT architect perspective, 5G is a technology to watch and plan for. IoT devices may predicate a WAN that will need to operate for a dozen years or more in the field. For a good perspective on the key points, constraints, and the detailed design of 5G, readers should refer to 5G: A Tutorial Overview of Standards, Trials, Challenges, Deployment, and Practice, by M. Shafi et al., in IEEE Journal on Selected Areas in Communications, vol. 35, no. 6, pp. 1201-1221, June 2017.





LoRa and LoRaWAN


LPWAN also include technologies that are proprietary and not sponsored by 3GPP. It can be argued that some IEEE802.11 protocols should also be classified in LPWAN, but the next two sections will highlight LoRa and Sigfox. LoRa is a physical layer for a long-range and low-power IoT protocol while LoRaWAN represents the MAC layer.

These proprietary LPWAN technologies and carriers have the advantage of using the unlicensed spectrum and that, simply, is data plan cost. Typically, technologies like Sigfox and LoRaWAN will be 5x to 10x lower in their data rates compared to traditional 3G or LTE connections for large volume deployments (>100,000 units). That may change with more competition from Cat-M1, Cat-NB, and Cat-5 but it is too early to tell.

The architecture was originally developed by Cycleo in France but then acquired by the Semtech Corporation (a French mixed-signal electronics manufacturer) in 2012 for $5 million in cash. The LoRa Alliance was formed in March of 2015. The alliance is the standard body for the LoRaWAN specification and technology. They also have a compliance and certification process to ensure interoperability and conformity to the standard. The alliance is supported by IBM, Cisco, and over 160 other members.

LoRaWAN has gained traction in Europe with network deployments by KPN, Proximus, Orange, Bouygues, Senet, Tata, and Swisscom. Other areas have sparse coverage to date.

One reason for the price difference, besides being in the unlicensed spectrum, is that a single LoRaWAN gateway has the potential to cover a significant amount of area. Belgium, with a land area of 30,500 km2, is completely covered by seven LoRaWAN gateways. Typical range is 2 to 5 km in urban areas and 15 km in suburban areas. This reduction in infrastructure cost is very different than 4G-LTE with much smaller cells.

Since LoRa is the bottom of the stack, it has been adopted in competing architectures to LoRaWAN. Symphony Link, for example, is Link Labs's LPWAN solution based on the LoRa PHY, using an eight-channel, sub-GHz base station for industrial and municipal IoT deployments. Another competitor using LoRa is Haystack, who produces the DASH7 system. DASH7 is a full network stack on the LoRa PHY (not just the MAC layer).

The next section will focus exclusively on LoRaWAN.





LoRa physical layer


LoRa represents the physical layer of a LoRaWAN network. It manages the modulation, power, receiver and transmission radios, and signal conditioning.

The architecture is based on the following bands in ISM license-free space:

915 MHz: In the USA with power limits but no duty cycle limit.

868 MHz: In Europe with a 1% and 10% duty cycle.

433 MHz: In Asia.



A derivative of Chirp Spread Spectrum (CSS) is the modulation technique used in LoRa. CSS balances data rate with sensitivity in a fixed channel bandwidth. CSS was first used in the 1940s for military long-range communication by using modulated chirp pulses to encode data and was found to be especially resilient against interference, Doppler effects, and multipath. Chirps are sinusoidal waves that increase or decrease over time. Since they use the entire channel for communication they are relatively robust in terms of interference. We can think of chirps signals with increasing or decreasing frequencies (sounding like a whale call). The bitrate which LoRa is a function of the chirp rate and the symbol rate. The bitrate is represented by Rb, the spreading factor by S, the bandwidth by B. Therefore the bitrate (bps) can range from 0.3 kbps to 5 kbps and is derived as:

This form of modulation allows for low power over long distances, as the military found. Data is encoded using the increasing or decreasing frequency rate and multiple transmissions can be sent with different data rates on the same frequency. CSS allows signals to be received at 19.4 dB below the noise floor using FEC. The band is also sub-divided into multiple sub-bands. LoRa uses 125 kHz channels and dedicates six 125 kHz channels and pseudo-random channel hopping. A frame will be transmitted with a specific spreading factor. The higher the spreading factor, the slower the transmission but the longer the transmission range. The frames in LoRa are orthogonal, meaning multiple frames can be sent simultaneously as long as each is sent with a different spreading factor. In total there are six different spreading factors (SF = 7 to SF = 12).



The typical LoRa packet contains a preamble, a header, and a 51 to 222-byte payload.

LoRa networks have a powerful feature called Adaptive Data Rate (ADR). Essentially this enables dynamically scalable capacity based on the density of nodes and infrastructure. ADR is controlled by the network management in the cloud. Nodes that are close to a base station can be set to a higher data rate because of signal confidence. Those nodes in close proximity can transmit data, release their bandwidth, and enter a sleep state quickly versus distant nodes which transmit at slower rates.

The table below describes the uplink and downlink features:

Feature

Uplink

Downlink



Modulation

CSS

CSS



Link Budget

156 dB

164 dB



Bit Rate (Adaptive)

0.3 to 5 kbps

0.3 to 5 kbps



Message Size Per Payload

0 to 250 bytes

0 to 250 bytes



Message Duration

40 ms to 1.2 s

20 to 160 ms



Energy Spent Per Message

Etx = 1.2s * 32 mA = 11 uAh at full sensitivity Etx = 40 ms * 32 mA = 0.36 uAh at min sensitivity

Etx=160 ms * 11mA = 0.5uAh





LoRaWAN MAC layer


LoRaWAN represents the MAC that resides on top of a LoRa PHY. The LoRaWAN MAC is an open protocol while the PHY is closed. There are three MAC protocols that are part of the data link layer. These three balance latency with energy usage. Class-A is the best for energy mitigation while having the highest latency. Class-B is between Class-A and Class-C. Class-C has minimum latency but the highest energy usage.

Class-A devices are battery based sensors and endpoints. All endpoints that join a LoRaWAN network are first associated as Class-A with the option of changing class during operation. Class-A optimizes power by setting various Receive Delays during transmission. An endpoint starts by sending a packet of data to the gateway.

After the transmission, the device will enter a sleep state until the Receive Delay timer expires. When the timer expires, the endpoint wakes and opens a receive slot and awaits a transmission for a period of time and then re-enters the sleep state. The device will wake again as another timer expires. This implies that all downlink communication occurs during a short period of time after a device sends a packet uplink. That period can be an extremely long time.

Class-B devices balance power and latency. This type of device relies on a beacon being sent by the gateway at regular intervals. The beacon synchronizes all endpoints in the network and is broadcast to the network. When a device receives a beacon, it creates a ping slot which is a short reception window. During these pin slot periods, messages can be sent and received. At all other times, the device is in a sleep state. Essentially this is a gateway-initiated session and based on a slotted communication method.

Class-C endpoints use the most power but have the shortest latency. These devices open two Class-A receive windows as well as a continuously powered receive window. Class-C devices are usually powered on and may be actuators or plug-in devices. There is no latency for the downlink transmission. Class-C devices cannot implement Class-B.

The LoRa/LoRaWAN protocol stack can be visualized as follows:



LoRa and LoRaWAN Protocol Stack. Comparison to standard OSI model. Note: LoRa/LoRaWAN represents only layer 1 and layer 2 of the stack model.

LoRaWAN security encrypts data using the AES128 model. One difference in its security from other networks is LoRaWAn separates authentication and encryption. Authentication uses one key (NwkSKey), and user data a separate key (AppSKey). To join a LoRa network, devices will send a JOIN request. A gateway will respond with a device address and authentication token. The application and network session keys will be derived during the JOIN procedure. This process is called the Over-the-Air-Activation (OTAA). Alternatively, a LoRa-based device can use Activation by Personalization. In this case, a LoRaWAN carrier/operator preallocates 32-bit network and session keys and a client will purchase a connectivity plan and appropriate set of keys. The keys will be ordered from an endpoint manufacturer with the keys burnt into the device.

LoRaWAN is an asynchronous, ALOHA-based protocol. The pure ALOHA protocol was initially devised at the University of Hawaii in 1968 as a form of multiple access communication before technologies such as CSMA existed. In ALOHA, clients can transmit messages without knowing if other clients are in the process of transmitting simultaneously. There are no reservations or multiplexing techniques. The basic principle is the hub (or gateway in the case of LoRaWAN) immediately retransmits packets it has received. If an endpoint notices one of its packets was not acknowledged then it will wait then retransmit the packet. In LoRaWAN, collisions only occur if transmissions use the same channels and spreading frequency.





LoRaWAN topology


LoRaWAN is based on a star network topology. For that matter, it can be said it supports star of stars topology. Rather than a single hub-spoke model, a LoRaWAn can assume multiple hubs. A node can be associated with more than one gateway.

A critical component of LoRaWAN that sets it apart from most of the transports listed in this book is the fact that user data will be transported from an end-node to the gateway over the LoRaWAN protocol. At that point, the LoRaWAN gateway will forward the packet over any backhaul (such as 4G-LTE, Ethernet, Wi-Fi) to a dedicated LoRaWAN network service in the cloud. This is unique since most other WAN architectures release any control of customer data at the time it leaves their network to a destination on the internet.

The network service has the rules and logic to perform the necessary upper layers of the network stack. A side effect of this architecture is that handoff from one gateway to another isn't necessary. If a node is mobile and moves from an antenna to antenna, the network services will capture multiple identical packets from different paths. These cloud-based network services allow LoRaWAN systems to chose the best route and source of information when an end-node is associated with more than one gateway. Responsibilities of the network services include:

Duplicate packet identification and termination

Security services

Routing

Acknowledgement messages



Additionally, LPWAN systems like LoRaWAN will have 5x to 10x fewer base stations for similar coverage to a 4G network. All base stations are listening to the same frequency set, therefore they are logically one very large base station. This, of course, reinforces the statement that LPWAN systems can be a lower cost point than a traditional cellular network:



LoRaWAN network topology. LoRaWAN is built on a star of star type topology with gateways acting as the hubs as well as communication agents over traditional IP networks to LoRaWAN administration in the cloud. Multiple nodes can associate with multiple LoRaWAN gateways.





LoRaWAN summary





LoRaWAN does have gaps in the architecture and protocols that need careful consideration from the IoT architect:





Some features common in LTE networks are simply not designed into the LoRaWAN architecture. LoRaWAN is not a complete network stack in the OSI model. It lacks the common features of a network layer, session layer, and transport layer: roaming, packetizations, retry mechanisms, QoS, and disconnects. It is up to the developer and integrator to add those services if necessary.

LoRaWAN relies on a cloud-based network interface. At some point in the value chain, a cloud subscription is needed.

The chip vendor is Semtech and is a single source of the technology, although there have been announced partnerships with ST Microelectronics. This is similar to the Z-Wave value chain.

LoRaWAN is based on the ALOHA protocol. ALOHA complicates validation and acknowledgment as well as contributes to error rates over 50%.

Downlink ability is still limited. LoRaWAn is fundamentally a one-way protocol. In certain use cases that is sufficient, but it tempers flexibility.

LoRaWAN has high latency and no real-time ability.

No OTA firmware updates.

Mobility and moving nodes are challenging to manage in LoRaWAN. A 40 to 60 byte message can take 1 to 1.5 s to transmit. This can be problematic for moving vehicles at highway speed. A base station also requires Linear Time Invariant (LTI) which means the radio waveform shouldn't change the time of flight.

Geo-location precision is about 100 m. Using RSSI signal strength measurements or time-of-flight measurements, a degree of accuracy can be obtained. The best solution is if three base stations triangulate a node. More base stations can improve the accuracy.





Sigfox


Sigfox is a narrowband LPWAN (like NB-IOT) protocol developed in 2009 in Toulouse, France. The founding company goes by the same name. This is another LPWAN technology using the unlicensed ISM bands for a proprietary protocol. Sigfox has some traits that significantly narrow its utility:

Up to 140 messages per device daily on uplink (duty cycle of 1%, 6 messages/hour).

A payload size of 12 bytes for each message (uplink) and 8 bytes (downlink).

A throughput of up to 100 bps uplink and 600 bps downlink.



Originally, Sigfox was unidirectional and intended as a pure sensor network. That implies that only communication from the sensor uplink was supported. Since then a downlink channel has become available.

Sigfox is a patented and closed technology. While their hardware is open, however, the network is not and must be subscribed to. Sigfox hardware partners include Atmel, TI, Silicon Labs, and others. Sigfox builds and operates its network infrastructure similar to the arrangement of LTE carriers. This is a very different model than LoRaWAN. LoRaWAN requires a proprietary hardware PHY be used on their network, while Sigfox uses several hardware vendors but a single managed network infrastructure. Sigfox calculates rates by the number of devices that are connected to a customer's network subscription, the traffic profile per device, and the duration of the contract.

While there are strict limitations of Sigfox in terms of throughput and utilization, it is intended for systems sending small and infrequent bursts of data. IoT devices like alarm systems, simple power meters, and environmental sensors would be candidates. Data for various sensors can typically fit within the constraints. (such as temperature/humidity data of 2 bytes at 0.004 degree precision). One must be careful with the degree of precision the sensor provides and the amount of data that can be transmitted. One trick to use is state data; a state or event can simply be the message without any payload. In that case, it consumes 0 bytes. While this doesn't eliminate the restrictions in broadcasting, it can be used to optimize for power.





Sigfox physical layer


As mentioned previously, Sigfox is Ultra Narrow Band (UNB). As the name implies, the transmission uses a very narrow channel for communication. Rather than spreading the energy across a wide channel, a narrow slice of that energy is confined to these bands:

868 MHz: Europe (ETSI 300-200 regulations)

902 MHz: North America (FCC part 15 regulations)



Some regions such as Japan have strict spectral density limitations currently making ultra narrowband difficult to deploy.

The band is 100 Hz in width and uses Orthoganol Sequence Spread Spectrum (OSSS) for the uplink signal and 600 Hz using Gaussian Frequency Shift Keying (GFSK) for the downlink. Sigfox will send a short packet on a random channel at a random time delay (500 to 525 ms). This type of encoding is called Random Frequency and Time Division Multiple Access (RFTDMA). Sigfox, as stated, has strict parameters of use, notably data size limitations. The following table highlights these parameters for the uplink and downlink channels:

Uplink

Downlink



Payload Limit (bytes) 12 8

Throughput (bps) 100 600

Maximum Messages per Day 140 4

Modulation Scheme DBPSK GFSK

Sensitivity (dBm) <14 <27



Bidirectional communication is an important characteristic of Sigfox versus other protocols. However, bidirectional communication in Sigfox does require some explanation. There is no passive reception mode, meaning a base station cannot simply send a message to an endpoint device at any time. A receive window opens up for communication only after the transmission windows complete. The receive window will open only after a 20 second period after the first message was sent by an endpoint node. The window will remain open for 25 seconds allowing reception of a short (4 byte) message from a base station.

333 channels, each 100 Hz in width, are used in Sigfox. The receiver sensitivity is -120 dBm/-142 dBm. Frequency hopping is supported using a pseudo-random method of 3 out of the 333 channels. Finally, the transmission power is specified to be +14 dBm and +22 dBm in North America:



Sigfox transmission timeline. Three copies of the payload are transmitted on three unique random frequencies with various time delays. A window of downlink transmission opens only after the last uplink.





Sigfox MAC layer


Each device in a Sigfox network has a unique Sigfox ID. The ID is used for the routing and signing of messages. The ID is used to authenticate the Sigfox device. Another characteristic of Sigfox communication is that it uses fire and forget. Messages are not acknowledged by the receiver. Rather, a message is sent three times on three different frequencies at three different times by the node. This assists in ensuring the integrity of transmission of a message. The fire and forget model has no way of ensuring the message was actually received, so it is up to the transmitter to do as much as possible to ensure accurate transmission:

Sigfox MAC frame packet Structure for uplink and downlink

The frames contain a preamble of predefined symbols used for synchronization in transmission. The frame sync fields specify the types of frames being transmitted. The FCS is a Frame Check Sequence (FCS) used for error detection.

No packet contains a destination address or other node. All data will be sent by the various gateways to the Sigfox cloud service.

The data limit can be understood and modeled from the MAC layer packet format:



Given each packet is transmitted three times, and we know that European regulations (ETSI) limit transmission to a 1% duty cycle, we can calculate the number of messages per hour using the maximum payload size of 12 bytes:

Even though twelve bytes is the limit of a payload, that message may take over one second to transmit. Early versions of Sigfox were unidirectional but the protocol now supports bi-directional communication.





Sigfox protocol stack


The protocol stack is similar to other stacks following the OSI model. There are three levels, detailed here:

PHY Layer: Synthesizes and modules signals using DBPSK in the uplink direction and GFSK in the downlink direction as previously detailed.

MAC Layer: Adds fields for device identification/authentication (HMAC) and error correcting code (CRC). The Sigfox MAC does not provide any signaling. This implies that devices are not synchronized with the network.

Frame Layer: Generates the radio frame from application data. Also, it systematically attaches a sequence number to the frame:





Sigfox Protocol Stack versus simplified OSI model

With regards to security, messages are not encrypted anywhere in the Sigfox protocol stack. It is up to the customer to provide an encryption scheme to the payload data. No keys are exchanged over a Sigfox network, however, each message is signed with a key unique to the device for identification.





Sigfox topology


A Sigfox network can be as dense as one million nodes per base station. The density is a function of the number of messages sent by the network fabric. All nodes that attach to a base station will form a star network.

All data is managed through the Sigfox backend network. All messages from a Sigfox Base Station must arrive at the backend server through IP connectivity. The Sigfox backend cloud service is the only destination for a packet. The backend will store and send a message to the client after authenticating it and verifying there are no duplicates. If data needs to be transmitted to an endpoint node, the backend server will select a gateway with the best connectivity to the endpoint and forward the message on the downlink. The backend has already identified the device by packet ID and prior provisioning will force the data to be sent to a final destination. In a Sigfox architecture, a device cannot be directly accessed. Neither the backend nor the base station will directly connect to an endpoint device.

The backend is also the administration, licensing, and provide service for customers. The Sigfox cloud routes data to the destination the customer chose. The cloud service offers APIs via a pull model to integrate Sigfox cloud functions in a third-party platform. Devices can be registered through another cloud service. Sigfox also offers callbacks to other cloud services. This is the preferred method to retrieve data:



Sigfox topology. Sigfox utilizes its proprietary non-IP protocol and converges the data to a Sigfox network backend as IP data.

To assist with ensuring data integrity of the fire and forget communication model, multiple gateways may receive a transmission from a node; all the subsequent messages will be forwarded to the Sigfox backend and duplicates will be removed. This adds a level of redundancy to the reception of data.

Attaching a Sigfox endpoint node is intended to ease installation. There is no pairing or signalization.





Summary


While there is some commonality between the types of long-range communication technologies, they also are targeting different use cases and segments. The IoT architect should choose wisely which long-range system they intend to adopt. Like other components of the IoT system, the LPWAN is difficult to change once deployed. Considerations in picking the correct LPWAN include:

What data rate does the IoT deployment need to use?

Can the solution scale with the same LPWAN across regions? Is there proper coverage or does it need to be built?

What range of transmission is appropriate?

Is there any latency requirement for this IoT solution? Can the solution work with very high (multiple seconds) latencies?

Are the IoT endpoints battery powered and what is the cost of servicing them?

What are the cost constraints of the endpoints?



A few other LPWAN technologies also exist such as Ingenu in the USA and the Weightless Technologies (i.e. Weight-N, Weightless-W, and Weightless-P). Weightless is interesting as it is the only LPWAN operating in the television white space. MuLTE Fire is a new technology using unlicensed frequency bands developed and promoted by Qualcomm and Nokia. It provides LTE cellular services with Wi-Fi like deployment, essentially enabling a private LTE operator to deploy a private cellular network.

For reference, the following table details the similarities and differences between the LPWAN protocols highlighted in this chapter:

Specification

Cat 0 (LTE-M)

Release 12

Cat 1 Release 8

Cat M1 Release 13

Cat-NB Release 13

LoRa/LoRaWAN

Sigfox



ISM Bands

No

No

No

No

Yes

Yes



Total Bandwidth

20 MHz

20 MHz

1.4 MHz

180 kHz

125 kHz

100 kHz



Downlink Peak Rate

1 Mbps

10 Mbps

1 Mbps or 375 Kbps

200 Kbps

0.3 to 5 Kbps adaptive

100 bps



Uplink Peak Rate

1 Mbps

5 Mbps

1 Mbps or 375 Kbps

200 Kbps

5 Kbps to 5 Kbps adaptive

600 bps



Range

LTE Range

LTE Range

~4x Cat-1

~7x Cat-1

5 kM urban, 15 kM rural

up to 50 kM



Maximum Coupling Loss (MCL)

142.7 dB

142.7 dB

155.7 dB

164 dB

165 dB

168 dB



Sleep Power

Low

--

High

~2mA idle

Very Low ~15 uA Idle

Very Low ~15 uA Idle

Extremely Low 1.5 uA

Extremely Low 1.5uA



Duplex Configuration

Half/Full

Full

Half/Full

Half

Half

Half



Antennas (MIMO)

1

2 MIMO

1

1

1

1



Latency

50-100 ms

50-100 ms

10-15 ms

1.6-10 s

500 ms to 2 s

up to 60 seconds



Transmit Power (UE)

23 dB

23 dB

20 dB

23 dB

14 dB

14 dB



Design Complexity

50% Cat-1

Complex

25% Cat-1

10% Cat-1

Low

Low



Cost (relative pricing)

~$15

~$30

~$10

~$5

~$15

~$3



Mobility

Mobile

Mobile

Mobile

Limited

Mobile

Limited





Having covered the capture of data from a sensor to the communication of that data through PAN and WAN architecture, it is now time to discuss the marshaling and processing of IoT data. The next chapter is the first treatment of that data to package it, secure it, and route it to the correct location. That location may be an edge/fog node or the cloud. We will discuss the role of the gateway in providing that networking bridge and the ability to process data at the edge. We also will detail the type of IP-based communication protocols like MQTT and CoAP needed to stream data from the edge to the cloud.





Routers and Gateways





IoT receives much industry and economic focus because of the number of devices that will be eventually be deployed and the amount of data these devices will produce. There are two methods regarding how IoT will take form:





Edge-level sensors and devices will provide a direct path to the cloud. This implies that these edge-level nodes and sensors will have enough resources, hardware, software, and service-level agreements to transmit data across the WAN directly.

Edge-level sensors will form aggregations and clusters around gateways and routers to provide staging areas, protocol conversions, and edge/fog processing abilities, and will manage security and authentication between the sensors and the WAN.



The first model is difficult and costly for power and cost-constrained edge-level sensors/actuators/devices. A more logical form will be the latter case. The role of a router or gateway at the edge of sensors/devices includes the formal networking abilities modern routers provide, such as link routing, port forwarding, tunneling, security, and provisioning. Principles of TCP/IP routing and bridging are provided in a plethora of literature and are too broad to study here. This chapter explores the role and necessity for edge-level routers and provides tips and recommendations as to the features to consider when deploying a mass IoT solution.





Routing functions





When considering IoT architecture, the router plays a significant role in the overall management, scaling, and security of a system. Often, it is the case that the role of a router is trivialized to simply act as a gateway from one protocol to another (cellular to Bluetooth converter). For a commercial or industrial deployment, significantly more needs to be considered, especially when devices are in remote and moving systems.





Gateway functions


We have covered several types of wireless communication in this book, all of which require some form of transmitter and receiver as well as a mechanism to bridge traffic to the internet. This is the single most important role of the IoT edge gateway. Whether the medium is a Bluetooth mesh requiring a bridge node or a cellular network eNodeB, the roles are similar. The gateway bridges and marshals data between two dissimilar networks.

A router can be a gateway. Routers manage and steer traffic between similar networks. In IoT architecture, one may have a 6LoWPAN mesh that is IPv6 addressable, communicating to the outside world through a device that acts as a gateway bridging 802.15.4 protocols to Wi-Fi or 802.3 physical transports, but also steering and routing data using the IP layer shared between the internet and the 6LoWPAN mesh.

Often, it is the case that the edge gateway is the central PAN controller as well. This implies that all the functionalities of managing the PAN network, securing, authenticating, and provisioning new nodes, steering data, and power-managing devices, are the responsibility of the edge gateway.





Routing


The basic function of a router is to bridge connections between network segments. Routing is considered a layer-three function of the OSI standard model because it makes use of the IP address layer to guide packet movement. Essentially, all routers rely on a routing table to guide the flow of data. The routing table is used to find the best match to a destination IP address of a packet.

There are several proven algorithms used for efficient routing. One type of routing is dynamic routing, where the algorithms react to changes in the network and topology. Information about the state of the network is shared through a routing protocol on a timed basis or upon a triggered update. Examples of dynamic routing are distance-vector routing and link-state routing. Alternatively, static routing is important and useful for small networks that need specific paths configured between routers. Static routes are non-adaptive, thus have no need to scan topologies or update metrics. These are preset on the router:

Shortest path routing: A graph is constructed representing routers on the network. An arc between nodes represents a known link or connection. The algorithm simply finds the shortest path from any source to any destination.

Flooding: Every packet is repeated and broadcast from every router to every endpoint on its link. This generates a massive number of duplicate packets and requires a hop counter in the packet header to ensure packets have a limited time to live. An alternative is selective flooding, which only floods a network in the general direction of the destination. Flood networks are the basis of Bluetooth mesh networking.

Flow-based routing: Inspects the current flow in the network before determining a path. For any given connection, if the capacity and average flow are known, then compute the mean packet delay on that link. This algorithm finds the minimum average.

Distance-vector routing: The router table contains a best-known distance to each destination. The tables are updated by neighboring routers. The table contains an entry for each router in the subnet. Each entry contains a preferred route/path and the estimated distance to the destination. The distance can be a metric of a number of hops, latency, or queue lengths.

Link-state routing: A router initially discovers all its neighbors through a special HELLO packet. The router measures the delay to each of its neighbors by sending an ECHO packet. That topology and timing information is then shared with all routers on the subnet. A complete topology is built and shared between all routers.

Hierarchical routing: Routers are divided into regions and have a hierarchical topology. Each router maintains an understanding of its own region, but not the entire subnet. Hierarchical routing is also an efficient means of controlling router table size and resources in constrained devices.

Broadcast routing: Each packet carries a list of destination addresses. A broadcast router investigates the addresses and determines the set of output lines to transmit to the packet. The router will generate a new packet for each output line and include only the destinations needed in that newly formed packet.

Multicast routing: The network is partitioned into well-defined groups. An application can send a packet to an entire group rather than a single destination or a broadcast.



An important metric in routing is the time of convergence. Convergence occurs when all routers in a network share the same topological information and state.

Typical edge routers will support routing protocols such as Border Gateway Protocol (BGP), Open Shortest Path First (OSPF), Routing Information Protocol (RIP), and RIPng. An architect using edge routers in the field needs to be aware of the congestion and costs of using a certain routing protocol over others, especially if the interconnection between routers is a data-capped WAN connection:

BGP: BGP-4 is the standard for internet domain routing protocols, and is described in RFC 1771; it is used by most ISPs. BGP is a distance-vector dynamic routing algorithm and advertises entire paths in routing update messages. If routing tables are large this requires substantial bandwidth. BGP will send a 19 byte keep-alive message every 60 seconds to maintain a connection. BGP may be a poor routing protocol for mesh topologies since BGP maintains a connection to neighbors. BGP also struggles with the growth of routing tables in large topologies. BGP is also unique as it's one of the only routing protocols based on TCP packets.

OSPF: This protocol is described in RFC 2328 and provides network scaling and convergence advantages. Internet backbone and enterprise networks use OSPF heavily. OSPF is a link- state algorithm that supports IPv4 and IPV6 (RFC 5340) and operates on IP packets. It has the advantage of detecting dynamic link changes in seconds and responding.

RIP: Version two of RIP is a distance-vector routing algorithm based on hop counts using an interior gateway protocol. Originally based on the Bellman-Ford algorithm, it now supports variable-size subnets, overcoming the limitations in the original version. Loops in a routing table are restricted by limiting the maximum number of hops in a path (15). RIP is UDP- based and supports only IPv4 traffic. RIP has a longer convergence time than protocols such as OSPF but is easy to administer for small edge router topologies. Still, convergence for RIP with only a few routers can take several minutes.

RIPng: RIPng stands for RIP next generation (RFC 2080). This allows for the support of IPv6 traffic and IPsec for authentication.



A typical routing table used in a product like the Cradlepoint IBR900 router is as follows:

[administrator@IBR900-e11: /]$ route

Table: wan

Destination Gateway Device UID Flags Metric Type

default 96.19.152.1 wan onlink 0 unicast



Table: main

Destination Gateway Device UID Flags Metric Type

96.19.152.0/21 * wan 0 unicast

172.86.160.0/20 * iface:pertino0 0 unicast

172.86.160.0/20 None None 256 blackhole

192.168.1.0/24 * primarylan 0 unicast

2001:470:813b::/48 * *iface:pertino0 256 unicast

fe80::/64 * lan 256 unicast



Table: local

Destination Gateway Device UID Flags Metric Type

96.19.152.0 * wan 0 broadcast

96.19.153.13 * wan 0 local

96.19.159.255 * wan 0 broadcast

127.0.0.0 * *iface:lo 0 broadcast

.

.

.

In this example, there are three tables: wan, main, and local. Each table contains particular routing paths particular to that interface:

Destination: The complete or partial IP address of the packet destination. If the table contains the IP, it will reference the rest of the entry to resolve the interface to route to a partial address can be given prefixed by /. This specifies the fix bit positions of the address to resolve. For example, /24 in 192.168.1.0/24 specifies the top 24 bits of 192.168.1 are fixed and the lower 8 bits can resolve any address on the 192.168.1.* subnet.

Gateway: This is the interface to direct packets to that match the destination lookup. In the previous case, the gateway is specified as 96.19.152.1 and the destination is default. This implies the outbound WAN at 96.19.152.1 will be used for all destination addresses. This is essentially an IP passthrough.

Device UID: This is an alphanumeric identifier for the interface to direct data to. For example, any destination in the 172.19.152.0/21 subnet will route packets to an interface labeled iface:pertino0. Often, this field will be expressed with a numeric IP address rather than a symbolic reference.

Flags: Used for diagnostics and indicate route state. States could be route up, use gateway.

Metric: This is the distance to the destination and is usually counted by the number of hops.

Type: Several route types can be used: unicast: The route is a real path to a destination.

unreachable: Destination is unreachable. Packets are discarded and an ICMP message indicating the host is unreachable is generated. The local sender receives an EHOSTUNREACH error.

blackhole: Destinations are unreachable. Unlike prohibit types, packets will drop quietly. Local senders get an EINVAL error.

prohibit: Destinations are unreachable. Packets will be discarded and ICMP messages generated. Local senders receive an EACCES error.

local: Destinations are assigned to this host. The packets are looped back and delivered locally.

broadcast: Packets will be sent as broadcasts over the interface to all destinations.

throw: Special control route to force packets to drop and generate ICMP unreachable messages.





It should also be noted in the preceding example that IPv6 addresses are intermixed with IPv4 addresses. For example, 2001:470:813b::/48 in the main table is an IPv6 address with a /48 bit subnet.





Failover and out-of-band management


Failover is a critical feature for certain IoT edge routers, particularly for moving vehicles and patient care applications. Failover, as the name implies, is switching from one WAN interface to another when a primary source is lost. Loss of WAN could be attributed to the loss of cellular connectivity in a tunnel. A logistics company with a fleet of cold storage trucks may need to guarantee connectivity where cellular service varies nationwide. A failover from one cellular provider to another by use of multiple SIM identities can help mitigate and smooth over connectivity. Another use case could be using customer Wi-Fi as a primary WAN interface for in-home health monitoring, but enabling a failover to cellular WAN if the Wi-Fi signal is lost. Failover should be seamless and automatic without packet loss or a noticeable impact on data latency.

Out-of-Band Management (OOBM) should also be considered for IoT devices. OOBM is useful in fail-safe conditions where a dedicated and isolated channel is needed for the management of equipment. Sometimes this is called light-out management (LOM) if the primary systems are offline, damaged, or have power loss; one is still able to manage and inspect the equipment remotely through a sideband channel. In IoT, this can be useful for situations that need guaranteed uptime and remote management, such as oil and gas monitoring or industrial automation. A well-designed OOBM system should have no reliance on the system being monitored to be functional. Typical management planes such as VNC or SSH tunnels, require the device to be booted and functional.

An OOBM needs to be adjunct and isolated from the system, as shown in the following figure:

Example configuration for out-of-band management.





VLAN


A VLAN functions like any other physical LAN, but it enables computers and other devices to be grouped together even if they are not physically attached to the same network switch. The partitioning occurs in the data link layer (two) of the OSI model. VLANs are a form of network segmentation of devices, applications, or users, although they share the same physical network. A VLAN can also group hosts together, although they are not on the same network switch, essentially easing the burden of partitioning networking without running extra cables. IEEE 802.1Q is the standard by which VLANs are built. Essentially, a VLAN uses an identifier or tag consisting of 12 bits in the Ethernet frame. Therefore, there is a hard limit of 4096 potential VLANs on a single physical network.

A switch can assign a port to directly map to a particular VLAN. Since the VLAN is designed in layer two of the stack, traffic can be tunneled through layer three, allowing for geographically separated VLANs to share a common topology:





An example VLAN architecture in a franchise or retail scenario.



Shown above is a corporate point-of-sale (POS) and a VOIP system that is virtually isolated from a set of IoT devices as well as the guest Wi-Fi. This is done through VLAN addressing although the system shares the same physical network. Here we assume this is a smart IoT deployment where all edge IoT devices and sensors carry an IP stack and are addressable through the LAN.

VLAN design is particularly useful in the IoT space. Isolating IoT devices from other corporate functions is a typical scenario. VLANs are only useful when dealing with IP addressable devices.





VPN


VPN tunnels are used to establish a secure connection to a remote network over a public network. For example, VPN tunnels can be used across the internet by an individual to connect to a secure corporate network while traveling, or by two office networks to function as one network. The two networks set up a secure connection to the (normally) unsecured internet by assigning VPN encryption protocols.

For IoT deployment, a VPN is necessary to move data from remote sensors and edge devices into a corporate or private LAN. Typically, a corporation will be behind a firewall and a VPN is the only means to move data directly into a private on-premises server. In these cases, a VPN may be a necessary component of the router to bridge the networks. Later in this chapter, a discussion of software-defined networks will present an alternative method to securing networks.

Several VPNs exist:

Internet Protocol Security (IPSec) VPN: The traditional form of VPN technology that resides on the network layer of the OSI stack and secures data through a tunnel between two endpoints.

OpenVPN: This is an open source VPN for secure point-to-point and site-to-site connections in routed or bridged configurations. It incorporates a custom security protocol utilizing SSL/TLS (OpenSSL) for key exchanging and encrypting control and data planes. It can run over UDP and TCP transports. SSL is common in most browser applications, therefore, SSL VPN systems can provide secure tunnels on an application basis rather than an entire network.

Generic Routing Encapsulation (GRE): Creates point-to-point connections between endpoints through a tunnel similar to a VPN tunnel but encapsulates its payload. It wraps this inner packet within an outer packet. This allows the data payload to pass across other IP routers and tunnels unperturbed. Additionally, GRE tunnels can transport IPV6 and multicast transmissions.

Layer 2 Tunneling Protocol (L2TP): Creates a connection between two private networks via UDP datagrams typically used for VPNs or as part of the delivery services by ISPs. There is no security or encryption built into the protocol and it often relies on IPsec for that ability.



A VPN must either trust the underlying network protocols or provide for its own security. VPN tunnels typically use IPsec to authenticate and encrypt packets exchanged across the tunnels. To set up a VPN tunnel router on one end, there must be another device (usually a router) that also supports IPsec on the other end. Internet Key Exchange (IKE) is the security protocol in IPsec. IKE has two phases. The first phase is responsible for establishing a secure communication channel, and in the second phase, the established channel is used by IKE peers. The router has several different security protocol options for each phase, but the default selections will be sufficient for most users. Each IKE exchange uses one encryption algorithm, one hash function, and one DH group to make a secure exchange:

Encryption: Used to encrypt messages sent and received by IPsec. Typical encryption standards and algorithms include AES 128, AES 256, DES, and 3DES.

Hash: Used to compare, authenticate, and validate data across the VPN, ensuring it arrives in its intended form, and to derive keys used by IPSec. Typical hash functions one should expect in an enterprise-grade router include MD5, SHA1, SHA2 256, SHA2 384, and SHA2 512. Note that some encryption/hash combinations (such as 3DES with SHA2 384/512) are computationally expensive, impacting WAN performance. AES provides good encryption and performs much better than 3DES.

DH groups: The DH (Diffie-Hellman) group is a property of IKE and is used to determine the length of prime numbers associated with key generation. The strength of the key generated is partially determined by the strength of the DH group. Group 5, for instance, has greater strength than group 2: Group 1: 768-bit key

Group 2: 1024-bit key

Group 5: 1536-bit key





In IKE phase one, you can only select one DH group if you are using an aggressive exchange mode.

The algorithms are listed in order of priority. You can reorder this priority list by clicking and dragging algorithms up or down. Any selected algorithm may be used for IKE, but the algorithms at the top of the list are more likely to be used more often.

A word of caution on mobile and power-constrained IoT deployments. A traditional VPN cannot withstand moving in and out of a persistent network connection (such as cellular roaming, carrier switching, or occasionally-powered devices). If the network tunnel is disrupted, it causes timeouts, disconnects, and failures. Some mobile VPN software, such as Host Identity Protocol (HIP) from the IETF, attempts to resolve the problem by disassociating different IP addresses used when roaming to the VPN logical connection. Another alternative is Software-Defined Networking (SDN), which will be covered later in this book.





Traffic shaping and QoS


Traffic shaping and quality of services (QoS) features are useful in deployments that need a guaranteed level of service when dealing with congestion or variable network loads. For example, in an IoT use case, when mixing live video streams as well as public Wi-Fi, the video feeds may need priority and a guaranteed level of quality, especially in a situation of public safety or surveillance. Left to itself, incoming data from the WAN to an edge router will be serviced on a first-come-first-serve basis:

QoS functions: Allow the administrator to assign levels of priority for a given IP address hosted by the router or a specific port. QoS functions only control the uplink channel. They are particularly useful in cases where the uplink channel has much less capacity than the downlink. Typically, consumer broadband will have something like a 5 Mbps uplink and a 100 Mbps downlink, and QoS does provide a method of load balancing the constrained upstream link. QoS does not assign hard limits nor segment the link like traffic shaping does.

Traffic shaping functions: Traffic shaping is a static form of pre-allocating bandwidth. For example, a 15 Mbps link could be partitioned into smaller 5 Mbps segments. These segments would be pre-assigned. Generally, this is wasteful since that bandwidth would not necessarily be returned back to the aggregate if needed.

Dynamic shaping and packet priority: Modern routers enable dynamic shaping attributes. These allow the administrator to dynamically assign bandwidth segmentation rules to both ingress and egress traffic. It also can manage latency sensitive packets (such as video or user interface) for real-time applications. Dynamic shaping and packet priority allow for rules to be created based on the type of data or application rather than just the IP address or port.



A method to classify and manage network traffic is Differentiated Services (DiffServ). DiffServ uses a 6-bit differentiated service code point (DSCP) in the IP header for packet classification. The concept of DiffServ is that complex functions (such as packet classification and policing) can be carried out at the edge of the network by edge routers which then mark the packet to receive a particular type of per-hop behavior. Traffic entering a DiffServ router is subject to classification and conditioning. Additionally, a DiffServ router is free to change the classification of a previously marked packet by a different router. DiffServ is a coarse-grain tool for traffic management since the chain of routers in a link do not all need to support it. The router will then manage the different packet classes through QoS features. Alternatively, IntServ, which stands for Integrated Services, assists in QoS and mandates all routers in the chain support it. This is a form of fine-grain QoS.

Another aspect of network quality is the Mean Opinion Score (MOS). MOS is the arithmetic mean of individual values on a scale of the quality of a system from a user perspective. This is commonly used in Voice over Internet Protocol (VOIP) applications but certainly can be used for vision systems, imaging, streaming data, and user interface usability. It is based on a subjective rating of one to five (one being the worst quality, five being the best quality), and should be used in a feedback loop to increase capacity or reduce data sizes to match capacity.

An edge router bridging a PAN to an IP-based WAN has several options at its disposal to respond to changes in link quality and degradation of network services, for example, in an IoT deployment for fleet trucking where the carrier signal may degrade. In these situations, the router can employ TCP Performance Enhancing Proxies (PEP) to overcome and compensate for quality changes (RFC 3135). PEPs can be used in the transport layer or application layer of the stack and differ based on the physical medium. Forms of PEP include:

Proxy PEP: Here, the proxy acts as the middle man to mimic an endpoint

Distribution PEP: A PEP can run on one end of the link or both (distribution model)



A PEP consists of the following functions:

Split TCP: The PEP breaks the end-to-end connection into multiple segments to overcome large delay times that affect TCP windows. These are typically used in satellite communication.

ACK filtering: In links where the data rates are not symmetric (such as Cat-1: 10 Mbps down, 5 Mbps up), an ACK filter helps by accumulating or decimating TCP ACKs to improve performance.

Snooping: This is a form of integrated proxy and is used to hide interference and collisions on wireless links. It intercepts duplicate ACKs in the network and drops and replaces them with a lost packet. This prevents the sender from arbitrarily reducing the TCP window size.

D-Proxy: PEP to assist in wireless networks by distributing a TCP proxy to each side of the link. The proxies monitor TCP data packet sequence numbers by looking for packet loss. Upon detection, the proxies open a temporary buffer and absorb packets until the missing one is recovered and re-sequenced.





Security functions


An edge router or gateway fulfills another important role by providing a layer of security between the WAN, internet, and the underlying PAN/IoT devices. Many devices will lack the necessary resources, memory, and computational power to provide robust security and provisioning. Whether the architect is building their own gateway service or purchasing one, the following list of features should be considered to secure IoT components.

Firewall protection is the most basic form of security. There are two basic forms of firewalls for telecommunications. The first is a network firewall which filters and controls information flow from one network to another. The second is a host-based firewall that protects applications and services local to that machine. In the case of IoT edge routers, we focus on network firewalls. By default, a firewall will prevent certain types of network traffic from flowing into a firewall-protected zone, but any traffic originating within that zone is allowed to flow outward. A firewall will find and isolate information based on packets, states, or applications depending on the sophistication of the firewall. Typically, zones will be created around network interfaces with rules designed to control traffic flow between zones. An example would be an edge-router with a guest Wi-Fi zone and a corporate private zone.

A packet firewall can isolate and contain certain traffic based on the source or destination IP, ports, MAC addresses, IP protocols, and other information contained in the packet header. A stateful firewall operates in layer four of the OSI stack. It gathers and aggregates packets looking for patterns and state information such as new connections versus existing connections. Application filtering is yet more sophisticated in that it can search for certain types of application network flows, including FTP traffic or HTTP data.

A firewall can also utilize a demilitarized zone (DMZ). A DMZ is simply a logical zone. A DMZ host is effectively not firewalled, in the sense that any computer on the internet may attempt to remotely access network services at the DMZ IP address. Typical uses involve running a public web server and sharing files. The DMZ host is usually specified by a direct IP address.

Port forwarding is a concept that enables certain ports behind a firewall to be exposed. Several IoT devices need an open port to provide services that are controlled by cloud components. Again, a rule is constructed that allows a specified IP address within the firewalled zone to have an exposed port.

Both DMZs and port forwarding open ports and interfaces within an otherwise protected network. Caution should be exercised to ensure this is the intention of the architect. In a mass IoT deployment with many edge routers, a generic rule to open a port may be useful for one location but a significant security risk for another. Additionally, keeping an audit of DMZ and open ports should be a security process as network topology and configurations change with time. A DMZ, at any one time, could lead to an open hole in the network security later.





Metrics and analytics





In many instances, IoT edge devices will be under service-level agreements or data caps when using metered data such as 4G LTE. In other situations, the edge router or gateway is a host of other PAN networks and IoT devices. It should serve as a central (but local) authority on the health of the PAN network/mesh. Metrics and analytics are useful for collecting and resolving connectivity and cost challenges, especially as the scale of IoT grows. Typical metrics and collections should include the following:





WAN uptime analytics: Historical trends, service levels

Data usage: Ingress, egress, aggregate, per client, per application

Bandwidth: Random or scheduled bandwidth analysis on ingress and egress

PAN health: Bandwidth, abnormal traffic, mesh reorganization

Signal integrity: Signal strength, site survey

Location: GPS coordinates, movement, location changes

Access control: Clients attached, administrator logins, router configuration changes, PAN authentication success/failure

Failover: Number of failover events, time and duration



These types of metrics should be collected and monitored on a scheduled and automatic basis. Additionally, advanced routers should be able to construct rules and alerts when certain events or abnormal behaviors are seen at the edge.





Edge processing


As we will explore later in the chapter regarding cloud and fog computing, edge routers are capable of providing computing resources close to where the data is being generated. This is an important characteristic in edge routers, especially for IoT solutions. As more IoT solutions are built in remote and varied locations, having the ability to compute locally is essential for many use cases. Computing at the edge can involve affecting user data through techniques such as:

Filtering and aggregation

Denaturing data

Security and intrusion detection analysis

Key management

Rules engines/event processors

Caching and storage



Edge routers will vary in size and computational capacity. They are not data center servers or rackmount hardware. Typically, the resources on an edge router will be comparable to the following table:

Feature

Consumer-grade router

Mid-range edge router

High-end fog node



Brand

Apple Airport Extreme

Advantech WISE-3310

HP Edgeline EL20 Gateway



MSRP

~$199

~$547

~$1400



SOC/processor Mfr.

Broadcom 53019

Freescale i.MX6

Intel 4300U



CPU type and speed

2-core ARM A9 @ 1 GHz

ARM A9 @1 GHz

Dual-core Intel Core i5 @1.9GHz



RAM

512 MB DDR3

1 GB DDR3

8 GB DDR3



Storage

32 MB serial flash

4 GB eMMC

64 GB SSD (optional SATA)





The available resources need to be shared with the primary functions of the router as a network agent as well as with whatever the user designs as edge or fog software.

An edge device needs to manage and secure customer-deployed solutions on the edge, as in many situations the device will be very far from the programmer or administrator. The edge needs to be thought of in the same context as cloud-developed software and services. A router that offers edge computing services will provide an API or an SDK interface to use resources on the device and deploy programs.





Software-Defined Networking





Software-Defined Networking (SDN) is a method of decoupling the software and algorithms that define the networking control plane from the underlying hardware that manages the forwarding plane. Additionally, Network Function Virtualization (NFV) is defined as providing network functions that run on vendor-agnostic hardware. NFV describes virtualizing network features typically found in layers four through seven of the stack. These two paradigms provide the industry methods to build, scale, and deploy significantly complex network architecture in a very flexible manner. Preceding all, this greatly reduces enterprise cost in network infrastructure since most of the services can run in the cloud.

Why is this important for devices at the edge and where does it fit in with the IoT? We have spent a good deal of this book detailing data movement from a sensor to a cloud, yet have taken for granted how the overall inter-networking infrastructure will scale to a billion additional nodes on a network. One needs only to ask an IT administrator to put an additional million endpoints on a corporate network where the nodes are heterogeneous, in remote locations, and some moving in vehicles to understand the impact on the overall networking infrastructure. Traditional networking does not scale, and we are forced to consider alternative means for building large networks with minimal impact and cost.





SDN architecture


The journal article Software-Defined Networking: A Comprehensive Survey (D. Kreutz, F. M. V. Ramos, P. E. Veríssimo, C. E. Rothenberg, S. Azodolmolky and S. Uhlig, in Proceedings of the IEEE, vol. 103, no. 1, pp. 14-76, Jan. 2015) defines SDN as having four characteristics:

The control plane is decoupled from the data plane. Data plane hardware becomes simple packet-forwarding devices.

All forwarding decisions are flow-based rather than destination-based. A flow is a set of packets that match a criterion or filter. All packets in a flow are treated with the same forwarding and service policies. Flow programming allows for easy scaling and flexibility with virtual switches, firewalls, and middleware.

The control logic is also known as the SDN Controller. This software version of legacy hardware is capable of running on commodity hardware and cloud-based instances. Its purpose is to command and govern the simplified switching nodes. The reach from the SDN controller abstraction to the switching nodes is the southbound interface.

Network application software can reside over the SDN controller through a northbound interface. This software can interact and manipulate the data plane with services such as deep packet inspection, firewalls, and load balancers.



An SDN's infrastructure is similar to a traditional network since it utilizes similar hardware: switches, routers, and middleboxes. The principal difference, however, is that an SDN utilizes the fast server-class off-the-shelf computing power without complex and unique embedded control hardware. These server platforms are usually in the cloud performing network services in software rather than custom ASICs. The edge routers are essentially dumb without autonomous control. The SDN architecture breaks the control plane (the logic and function control) and the data plane (that executes datapath decisions and forwards traffic). The data plane consists of routers and switches that have an association with an SDN controller.

Everything above the data plane forwarding hardware typically can reside in the cloud or on private data center hardware:



Typical SDN architecture abstraction.

The illustration shows simplified switching and forwarding nodes that reside on the data plane and marshal information along prescribed paths determined by an abstracted SDN Controller that can live in a cloud instance. The SDN Controller manages the control plane via a southbound interface to the forwarding nodes. Network applications can reside on top of the SDN Controller and manipulate the data plane with services such as threat monitoring and intrusion detection. These services typically require custom and unique hardware solutions to be deployed and managed by the customer.





Traditional internetworking


A typical internetworking architecture will use a collection of managed hardware/software components that are single-purposed and contain embedded software/solutions. Often, these use no-commodity hardware and dedicated ASIC designs. Typical functions include routing, managed switches, firewalls, deep packet inspection and intrusion detection, load balancers, and data analyzers. Often, such dedicated appliances need to be managed by the customer and staffed with trained network IT personnel to maintain and administer them. These components may come from multiple vendors and require significantly different methods of management.

In this configuration, the data plane and control plane are unified. When the system needs to add or remove another node or set up a new data path, many of the dedicated systems need to be updated with new VLAN settings, QoS parameters, access control lists, static routes, and firewall pass-throughs. This may be manageable when dealing with several thousand endpoints. However, when we scale to millions of nodes that are remote, moving and connecting/disconnecting such traditional technology regularly becomes untenable:



Traditional networking components. In a typical inter-networking scenarios, systems providing services such as security, deep packet inspection, load balancing, and metric gathering require custom vendor hardware and management systems. This introduces difficulty in management and scaling for large installations, remote devices, and moving systems since the control and data planes are unified.





SDN benefits





An SDN model of networking should be considered for mass IoT deployments, especially when a customer needs to establish the provenance and security of a wide deployment of nodes. An architect should consider the following situations when using an SDN:





Servers and data centers that IoT edge devices must communicate with can be thousands of miles away

The scale of IoT growth from millions of endpoints to billions of endpoints needs appropriate scaling technologies outside of the hub-and-spoke model of current internet infrastructure



Three aspects of SDN makes it attractive to IoT deployments:





Service chaining: This allows a customer or provider to sell services a la carte. Cloud network services such as firewalls, deep packet inspection, VPNs, authentication services, and policy brokers can be linked and used on a subscription basis. Some customers may want a full set of features, others may not choose any or may change their configuration routinely. Service chaining allows for significant flexibility in deployments.

Dynamic load management: An SDN enjoys the flexibility of cloud architecture, and by design it can scale resources dynamically depending on load. This type of flexibility is crucial for the IoT as architects need to plan for capacity and scale as the number of things grows exponentially. Only virtual networking in the cloud provides the ability to scale capacity when needed. An example of this would be people-tracking at amusement parks and other venues. The number of people varies depending on the season, time of day, and weather. A dynamic network can adjust to the number of visitors without any change to the provider's hardware.

Bandwidth calendaring: This allows an operator to partition data bandwidth and usage to specified times and days. This is pertinent to IoT as many edge sensors only report data periodically or at a certain time of day. Sophisticated bandwidth sharing algorithms can be constructed to time slice capacity.



Later in this book, the Chapter 9, IoT Security, will explore Software-Defined Perimeters (SDP) as another example of network function virtualization and how it can be used to create micro-segments and device isolation, which is critical for IoT security.





Summary





Routers and gateway play an integral role in IoT development. The functionality provided by an edge router allows for enterprise-level of security, routing, resiliency, and quality of service. The gateway plays an important role in translating non-IP networks into the IP-based protocols necessary for internet and cloud connectivity. It is also important to realize that the growth of IoT to billions of nodes will take shape with low cost and constrained electronics. Features such as enterprise routing, tunneling, and VPNs require significant hardware and processing capabilities, and it makes sense to use routers and gateways for that service function. Later in this book, we will also look at how edge routers play a vital role in edge processing and fog computing.





IoT Security


The first chapter of this book revealed the size, growth, and potential of the Internet of Things (IoT). There are currently billions of devices, and the double-digit growth of connecting the analog world to the internet also forms the largest attack surface on Earth. Exploits, damage, and rogue agents have already been developed, deployed, and spread globally, disrupting countless businesses, networks, and lives. As architects, we are responsible for understanding the IoT stack of technologies and securing them. As we place devices that have never been connected to the internet, as good citizens, we are accountable for designing them.

This has been particularly difficult for many IoT deployments with security often being thought of last. Often, systems are so constrained that building enterprise-level security that modern web and PC systems enjoy is difficult if not impossible on simple IoT sensors. This book also talks about security after all other technologies have been understood. However, every chapter has touched on the provisions of security at each level.

This chapter will explore some particularly heinous IoT focused attacks and give thought to how weak security is in IoT and how much damage can be done. Later, we discuss the security provisions at each level of the stack: physical devices, communication systems, and networks. We then address software-defined perimeters and blockchains used to secure value in IoT data. The chapter wraps up by examining the United States Cybersecurity Improvement Act of 2017 and what it could mean for IoT devices.

The most important thing in security is to use it at all levels from the sensor to the communication system, router, and cloud.





Cyber security vernacular


Cybersecurity has an associated set of definitions describing different types of attacks and provisions. This section briefly covers the jargon of the industry as presented in the rest of this chapter.





Attack and threat terms





The following are the terms and definitions of different attacks or malevolent cyber threats:





Amplification attack: Magnifies the bandwidth sent to a victim. Often an attacker will use a legitimate service such as NTP, Steam, or DNS to reflect the attack upon a victim. NTP can amplify 556x and DNS amplification can escalate the bandwidth by 179x.

ARP spoof: A type of attack that sends a falsified ARP message resulting in linking the attacker's MAC address with the IP of a legitimate system.

Banner scans: A technique typically used to take inventory of systems on a network that can also be used by an attacker to gain information about a potential attack target by performing HTTP requests and inspecting the returned information of the OS and computer (for example, nc www.target.com 80).

Botnets: Internet-connected devices infected and compromised by malware working collectively by common control, mostly used in unison to generate massive DDoS attacks from multiple clients. Other attacks include email spamming and spyware.

Brute force: A trial and error method to gain access to a system or bypass encryption.

Buffer overflow: Exploits a bug or defect in running software that simply overruns a buffer or memory block with more data than allocated. This overrun can write over other data in adjacent memory addresses. An attacker can lay malicious code in that area and force the instruction pointer to execute from there. Compiled languages such as C and C++ are particularly susceptible to buffer overflow attacks since they lack internal protection. Most overflow bugs are the result of poorly constructed software that does not check the bounds of input values.

C2: Command and control server that marshals commands to botnets.

Correlation power analysis attack: Allows one to discover secret encryption keys stored in a device through four steps. First, examine a target's dynamic power consumption and record it for each phase of the normal encryption process. Next, force the target to encrypt several plaintext objects and record their power usage. Next, attack small parts of the key (subkeys) by considering every possible combination and calculating the Pearson correlation coefficient between the modeled and actual power. Finally, put together the best subkey to obtain the full key.

Dictionary attack: A method of gaining entry to a network system by systematically entering words from a dictionary file containing the username and password pairs.

Distributed Denial of Service (DDoS): An attack attempting to disrupt or make an online service unavailable by overwhelming it from multiple (distributed) sources.

Fuzzing: A fuzzing attack consists of sending malformed or non-standard data to a device and observing how the device reacts. For example, if a device performs poorly or shows adverse effects, the fuzz attack may have exposed a weakness.

Man-in-the-Middle Attack (MITM): A common form of attack that places a device in the middle of a communication stream between two unsuspecting parties. The device listens, filters, and appropriates information from the transmitter and retransmits selected information to the receiver. A MITM may be in the loop acting as a repeater or can be sideband listening to the transmission without intercepting the data.

NOP sleds: A sequence of injected NOP assembly instructions used to "slide" a CPU's instruction pointer to the desired area of malicious code. Usually part of a buffer overflow attack.

Replay attack (also known as a playback attack): A network attack where data is maliciously repeated or replayed by the originator or an adversary who intercepts the data, stores the data, and transmits it at will.

RCE exploit: Remote code execution that enables an attacker to execute arbitrary code. This usually comes in the form of a buffer overflow attack over HTTP or other network protocols that injects malware code.

Return-Oriented Programming (ROP Attack): This is a difficult security exploit an attacker may use to potentially subvert protections with non-executing memory or executing code from read-only memory. If an attacker gains control of a process stack through a buffer overflow or some other means, they may jump to legitimate and unchanged sequences of instructions already present. The attacker looks for sequences of instructions to call gadgets that can be pieced together to form a malevolent attack.

Return-to-libc: A type of attack that starts with a buffer overflow where the attacker injects jumps to libc or other popularly used libraries in the processes' memory space in an attempt to call system routines directly. Bypasses the protection offered by non-executable memory and guard bands. This is a specific form of ROP attack.

Rootkit: Typically malicious software (although often used to unlock smartphones) used to enable other software payloads to be undetectable. Rootkits use several targeted techniques such as buffer overflows to attack kernel services, hypervisors, and user mode programs.

Side Channel Attack: An attack used to gain information from a victim's system by observing the secondary effects of the physical system rather than find runtime exploits or zero-day exploits. Examples of side channel attacks include correlation power analysis, acoustic analysis, and reading data residue after it has been deleted from memory.

Spoofing: Malicious party or device impersonates another device or user on a network.

SYN flood: Occurs when a host sends a TCP:SYN packet which a rogue agent will spoof and forge. This will cause the host to create half-open connections to many non-existent addresses causing the host to exhaust all resources.

Zero-Day exploits: Security defects or bugs in commercial or production software unknown to the designer or manufacturer.





Defense terms





The following are the terms and definitions of different cyber defense mechanisms and technologies:





Address Space Layout Randomization: Also known as ASLR, this defense mechanism protects memory and thwarts buffer overflow attacks by randomizing where an executable is loaded in memory. A buffer overflow injecting malware can not predict where it will be loaded in memory, thus manipulating the instruction pointer will becomes extremely challenging. Protects against return-to-libc attacks.

Black hole (sinkhole): After detecting a DDoS attack, routes are established from the affected DNS server or IP address to force rogue data to a black hole or a non-existent endpoint. Sinkholes perform further analysis to filter out good data.

Data Execution Prevention (DEP): Marks an area as executable or non-executable. This prevents an attacker from running code maliciously injected into such a region via a buffer overflow attack. The result is a system error or exception.

Deep Packet Inspection (DPI): A method of inspecting each packet (data and possibly header information) in a data stream to isolate intrusions, viruses, spam, and other criteria being filtered.

Firewall: A network security construct that grants or rejects network access to packet streams between an untrusted zone and a trusted zone. Traffic can be controlled and managed through access control lists (ACL) on routers. Firewalls can perform stateful filtering and provide rules based on destination ports and traffic state.

Guard bands and non-executable memory: Protects regions of memory that are writeable and not executable. Protects against NOP sleds. Intel: NX bit, ARM XN bit.

Honeypots: Security tool to detect, deflect, or reverse engineer malicious attacks. Honeypots appear as legitimate websites or accessible nodes in a network but are actually isolated and monitored. Data and interactions with the device are logged.

Instruction-Based Memory Access Control: A technique to separate the data portion of a stack from the return address portion. This technique helps protect against ROP attacks and is particularly useful in constrained IoT systems.

Intrusion Detection System (IDS): A network construct to detect threats in a network through the out-of-band analysis of the packet stream therefore not in-line with the source and destination so as to affect real-time response.

Intrusion Prevention System: Blocks threats to a network via true in-line analysis and statistical or signature detection of threats.

Milkers: A defensive tool that emulates an infected botnet device and attaches to its malevolent host allowing one to understand and "milk" the malware commands being sent to the controlled botnet.

Port scanning: A method to find an open and accessible port on a local network.

Public Key Infrastructure (PKI): Provides a definition of hierarchies of verifiers to guarantee the origin of a public key. A certificate is signed by certificate authorities.

Public key: A public key is generated with a private key and is accessible to external entities. A public key can be used to decrypt hashes.

Private key: A private key is generated with a public key, never released externally, and stored securely. It is used to encrypt hashes.

Root of Trust (RoT): Starts execution on a cold booting device from an immutable trusted source of memory (such as ROM). If early boot software/BIOS can be changed without control, then no Root of Trust exists. The Root of Trust is usually the first phase in a multi-phase secure boot.

Secure Boot: A series of boot steps for a device that starts at a Root of Trust and proceeds through OS and application loading where each component signature is verified as authentic. Verification is performed through public keys loaded at previous trusted boot stages.

Stack canaries: Guards process stack space from stack overruns and prevents the execution of code from a stack.

Trusted Execution Environment: A secure area of a processor that ensures code and data residing within this zone is protected. This is usually an execution environment on the main processor core where the code for secure booting, monetary transfers, or private key handling will be executed with a higher level of security than the majority of the code.





Anatomy of IoT cyber attacks





The area of cybersecurity is a broad and massive topic beyond the scope of this chapter. However, it is useful to understand three types of IoT-based attacks and exploits. Since the topology of the IoT consists of hardware, networking, protocols, signals, cloud components, frameworks, operating systems, and everything in-between, we will now detail three forms of prevalent attacks:





Mirai: The most damaging denial of service attack in history that spawned from insecure IoT devices in remote areas.

Stuxnet: A nation-state cyber weapon targeting industrial SCADA IoT devices controlling substantial and irreversible damage to Iran's nuclear program.

Chain Reaction: A research method to exploit PAN area networks using nothing but a lightbulb—no internet needed.



By understanding the behaviors of these threats, the architect can derive preventative technologies and processes to ensure similar events are mitigated.





Mirai


Mirai is the name of malware that infected Linux IoT devices in August of 2016. The attack came in the form of a botnet that generated a massive DDOS storm. High-profile targets included Krebs on Security, a popular internet security blog, Dyn, a very popular and widely used DNS provider for the internet, and Lonestar cell, a large telecom operator in Liberia. Smaller targets included Italian political sites, Minecraft servers in Brazil, and Russian auction sites. The DDOS on Dyn had secondary effects on other extremely large providers that used their services such as Sony Playstation servers, Amazon, GitHub, Netflix, PayPal, Reddit, and Twitter. In total, 600,000 IoT devices were infected as part of the botnet collective.

Mirai source code was released on hackforums.net (a hacker blog site). From the source and through traces and logs, researchers have uncovered how the Mirai attack worked and unfolded:

Scan for victims: Perform a rapid asynchronous scan using TCP SYN packets to probe random IPV4 addresses. It specifically looked for SSH/Telnet TCP port 23 and port 2323. If the scan and port attached successfully, it entered phase two. Mirai included a hardcoded blacklist of addresses to avoid. The blacklist consisted of 3.4 million IP addresses and contained IP addresses belonging to the US Postal Services, Hewlett Packard, Ge, and the Department of Defense. Mirai was capable of scanning at about 250 bytes per second. This is relatively low as far as a botnet is concerned. The attacks like the SQL Slammer generated scans at 1.5 Mbps, the principle reason being that IoT devices typically are much more constrained in processing power than desktop and mobile devices.

Brute Force Telnet: At this point Mirai attempted to establish a functional Telnet session with a victim by sending 10 username and password pairs randomly using a dictionary attack of 62 pairs. If a login was successful, Mirai logged the host to a central C2 server. Later variants of Mirai evolved the bot to perform RCE exploits.

Infect: A loader program was then sent to the potential victim from the server. It was responsible for identifying the operating system and installing device-specific malware. It then searched for other competing processes using port 22 or 23 and killed them (along with other malware that could already be present on the device). The loader binary was then deleted and the process name was obfuscated to hide its presence. The malware did not reside in persistent storage and didn't survive a reboot. The bot now stayed dormant until it received an attack command.



The devices targeted were IoT devices comprising IP cameras, DVRs, consumer routers, VOIP phones, printers, and set-top boxes. These consisted of 32-bit ARM, 32-bit MIPS, and 32-bit X86 malware binaries specific to the IoT device being hacked.



The first scan occurred on August 1, 2016, from a US web hosting site. The scan took 120 minutes before it found a host with an open port and password in the dictionary. After one additional minute, 834 other devices were infected. Within 20 hours, 64,500 devices were infected. Mirai doubles in size in 75 minutes. Most of the infected devices that turned into botnets were located in Brazil (15.0%), Columbia (14.0%), and Vietnam (12.5%), although the targets of the DDOS attacks were in other regions.

The damage was confined to DDOS attacks. The DDOS attacks came in the form of SYN floods, GRE IP network floods, STOMP floods, and DNS floods. Over the course of five months, 15,194 individual attack commands were issued by the C2 servers and hit 5,042 internet sites. On September 21, 2016, the Mirai botnet unleashed a massive DDOS attack on the Krebs on Security blog site and generated 623 Gbps of traffic. That accounted for the single worst DDOS attack of all time. The following is a real-time screenshot captured during the Mirai attack using www.digitalattackmap.com: a collaboration between NETSCOUT Arbor and Google Jigsaw.



A view of the Mirai DDOS attack on the Krebs on Security website; courtesy of www.digitalattackmap.com





Stuxnet


Stuxnet was the first known documented cyber weapon released to permanently damage another nation's assets. In this case, it was a worm that was released to damage SCADA-based Siemens Programmable Logic Controllers (PLC) and used a rootkit to modify the rotational speed of motors under the direct control of the PLC. The designers went out of their way to ensure the virus targeted only devices with rotational spin rates of slave variable frequency drives attached to Siemens S7-300 PLCs rotating at 807 Hz and 1210 Hz, as they are typically used for pumps and gas centrifuges for uranium enrichment.

The attack presumably started in April or March of 2010. The infection process followed these steps:

Initial infection: The worm started by infecting a host Windows machine exploiting vulnerabilities found in previous virus attacks. It is thought to have spread by the insertion of a USB drive in the initial machine. It used four zero-day exploits simultaneously (this is an unprecedented level of sophistication). The exploits used a rootkit attack using user-mode and kernel-mode code and installed a stolen yet properly signed and certified device driver from Realtek. This kernel-mode signed driver was necessary to hide Stuxnet from wary antivirus packages.

Windows attack and spread: Once installed through the rootkit, the worm began to search the Windows system for files typical of a Siemens SCADA controller, WinCC/PCS 7 SCADA, also known as Step-7. If the worm happened to find Siemens SCADA control software, it attempted to access the internet through a C2 using malformed URLs (www.mypremierfutbol.com and www.todaysfutbol.com) to download more recent versions of its payload. It then dug further into the filesystem to search for a file called s7otbdx.dll, which served as a critical communications library between the Windows machine and the PLC. Step-7 included a hardcoded password database which was exploited through another zero-day attack. Stuxnet inserted itself between the WinCC system and the s7otbdx.dll to act as a Man-in-the-Middle attacker. The virus started its operation by recording the normal operation of the centrifuges.





Destruction: When it decided to coordinate the attack, it replayed the pre-recorded data to the SCADA systems which had no reason to believe anything was compromised or behaving erratically. Stuxnet delivered its damage by manipulating the PLCs with two different coordinated attacks to damage the entire array of Iran's facility. The damage to the rotors of the centrifuge occurred slowly over time, running in 15 or 50-minute increments separated by 27 days of normal operation. This resulted in improperly enriched uranium as well as cracked and destroyed rotor tubes in the centrifuges.



It is believed that over 1,000 uranium enrichment centrifuges were crippled and damaged by this attack on Iran's main enrichment facility in Natanz, Iran. Today the Stuxnet code is available online and is essentially an open source playing field to create derivative exploits (https://github.com/micrictor/stuxnet).





Chain Reaction


Chain Reaction is an academic study that shows a new breed of cyber attacks focused on PAN mesh networks which can be executed without any link to the internet. Additionally, it shows how vulnerable remote IoT sensor and control systems can be. The attack vector was Philips Hue light bulbs typically found in consumer homes that can be controlled by the internet and smartphone apps. The exploit can be scaled up to smart city attacks and initiated by simply inserting one single infected smart light.

Philips Hue lights use the Zigbee protocol to establish a mesh. Zigbee lighting systems fall under a program called the Zigbee Light Link (ZLL) to force a standard method for lighting interoperability. ZLL messages are not encrypted or signed but encryption is used to secure keys exchanged if a light is added to the mesh. This master key is known to everyone in the ZLL alliance and was subsequently leaked. ZLL also forces light bulbs joining the mesh to be in very close proximity to the initiator. This prevents one from taking over their neighbor's lights. Zigbee also offers an Over-the-Air (OTA) reprogramming method; however, the firmware bundles are encrypted and signed.

The researchers used a four-phase attack plan:

Break the encryption and signing of the OTA firmware bundle.

Write and deploy a malevolent firmware upgrade to a single light bulb using the broken encryption and signing keys.





The compromised bulb would join the network based on the stolen master key and exploit the proximity security through a found zero-day defect in the popularly used Atmel AtMega part.

After successfully joining a Zigbee mesh, it would then send its payload to neighboring lights and infect them rapidly. This would expand based on Percolation Theory and infect entire city populations of lighting systems.



Zigbee uses AES-CCM (part of IEEE 802.15.4 standard and covered later in this chapter) encryption to encrypt OTA firmware updates. To break the firmware encryption, the attackers used Correlation Power Analysis (CPA) and Differential Power Analysis (DPA). This is a sophisticated form of attack where a device such as the light bulb controller hardware is placed on a bench and the power that it consumes is measured. Given sophisticated control, one can measure the dynamic power used by a CPU executing an instruction or moving data (for example, when an encryption algorithm is executed). This is called simple power analysis, in which it is still be very difficult to crack the key. CPA and DPA extend capabilities beyond simple power analysis by using a statistical correlation. Rather than attempt to determine one bit at a time in cracking a key, CPA can resolve byte-wide quantities. Power traces are captured by an oscilloscope and split into two sets. The first set assumes an intermediate value being cracked is set to 1 and the other set assumes it is set to 0. By subtracting the mean of these sets, the true value of an intermediate value is exposed.

Using both DPA and CPA, the researchers broke the Philips Hue lighting system as follow:

Used the CPA to crack the AES-CBC. The attackers had no key, no nonce, no initialization vector. This resolved the key, which was used in the same manner to attack the nonce.

Used DPA to crack the AES-CTR counter mode to break the firmware bundling encryption. Researchers found 10 locations that the AES-CTR seemed to execute which created 10x the possibilities.

Researchers then focussed on breaking the Zigbee proximity protection for joining a network. The zero-day exploit was the result found by inspecting Atmel's source code for the bootloader on the SOC. Upon reviewing the code, they found that the proximity check was valid when starting a scan request in Zigbee. If they started with any other message, the proximity check was bypassed. This allowed them to join any network.



A true attack could force an infected bulb to infect others within a few hundred meters with a payload to remove the firmware update ability of each bulb so they can never be recovered. The bulbs would effectively be under malicious control and would have to be destroyed. The researchers were able to build a fully automated attack system and attached it to a drone that systematically flew within range of Philips Hue lights in a campus environment and hijacked each one.

More information on the CPA attack on Zigbee can be found here: E. Ronen, A. Shamir, A. O. Weingarten and C. O’Flynn, "IoT Goes Nuclear: Creating a ZigBee Chain Reaction," 2017 IEEE Symposium on Security and Privacy (SP), San Jose, CA, 2017, pp. 195-212. An excellent tutorial and the source code to generate a CPA attack can be found on the ChipWhisperer Wiki: https://wiki.newae.com/AES-CCM_Attack.





Physical and hardware security


Many IoT deployments will be in remote and isolated areas leaving sensors and edge routers vulnerable to physical attack. Additionally, the hardware itself needs modern protection mechanisms common in processors and the circuitry of mobile devices and personal electronics.





Root of Trust


The first layer of hardware security is the establishment of a Root of Trust. The Root of Trust (RoT) is a hardware-validated boot process that ensures the first executable opcode starts from an immutable source. This is the anchor of the boot process that subsequently plays a role in bootstrapping the rest of the system from BIOS to the operating system to the application. A RoT is a baseline defense against a rootkit.

Each phase validates the next phase in the boot process and builds a Chain of Trust. An RoT can have different starting methods such as:

Boot from ROM or a non-writable memory to store the image and root key

One-time programmable memory using fuse bits for root key storage

Boot from a protected memory region that loads code into a protected memory store



An RoT also needs to validate each new phase of boot. Each phase of boot maintains a set of cryptographically signed keys that are used to verify the next phase of boot:

Establishing a Root of Trust. Here is a five-phase boot building up a Chain of Trust and starting with a Boot Loader in immutable read-only memory. Each phase maintains a public key that is used to verify the authenticity of the next component loaded.

Processors that support an RoT are architecturally unique. Intel and ARM support the following:

ARM TrustZone: ARM sells a security silicon IP block for SOC manufacturers that provides a hardware Root of Trust as well as other security services. TrustZone divides hardware into secure and non-secure "worlds". TrustZone is a separated microprocessor from the non-secure core. IT runs a Trusted OS specially designed for security that has a well-defined interface to the non-secure world. Protected assets and functions reside in the trusted core and should be lightweight by design. The switching between worlds is done through hardware context switching, eliminating the need for secure monitor software. Other uses for TrustZone are to manage system keys, credit card transactions, and Digital Rights Management. TrustZone is available for A "application" and M "microcontroller" CPUs. This form of secure CPU, Trusted OS, and RoT is called a Trusted Execution Environment (TEE).

Intel Boot Guard: This is a hardware-based mechanism that provides a verified boot which cryptographically verifies the initial boot block or uses a measuring process for validation. Boot Guard requires a manufacture to generate a 2048-bit key for verifying the initial block. The key is split into a private and public portion. The public key is imprinted by programmatically "blowing" fuse-bits during manufacturing. These are one-time fuses and immutable. The private portion generates the signature of the subsequently verified portion of the boot phase.





Key management and trusted platform modules


Public and private keys are critical to ensuring a secure system. The keys themselves need proper management to ensure their safety. There are hardware standards for key security and one particularly popular mechanism is the Trusted Platform Module (TPM). The specification for TPM was written by the Trusted Computing Group and is an ISO and IEC standard. The current specification is TPM 2.0 released in September of 2016. Computer assets sold to the DoD require TPM 1.2.

A TPM is a discrete hardware component with a secret RSA key burned into the device at manufacturing.

Generally, a TPM is used to hold, secure, and manage other keys for services such as disk encryption, Root of Trust booting, verifying the authenticity of hardware (as well as software), and password management. A TPM can create a hash of the litany of software and hardware in a "known good" configuration that can be used to verify tampering at runtime. Additional services include assisting in SHA-1 and SHA-256 hashing, AES encryption blocks, asymmetric encryption, and random number generation. Several vendors produce TPM devices such as Broadcom, Nation Semiconductor, and Texas Instruments.





Processor and memory space





We have already discussed various exploits and processor technologies that act as countermeasures. Two predominant technologies to look for in CPU and OS facilities include non-execution memory and address space layout randomization. Both types of technologies are meant to burden or prevent buffer-overflow and stack-overrun types of malware injection:





Non-execution or executable space protection: This is a facility enabled by the hardware used by the operating system to mark areas of memory as non-executable. The intent is to map only areas where verified and legitimate code resides to be the only regions of addressable memory that can execute an operation. If an attempt is made to implant malware through a stack-overflow type of attack, the stack will be marked as non-executing and an attempt to force the instruction pointer to execute there would result in a machine exception. Non-executable memory uses an NX bit as a means to map the region as non-executable (through the translation lookaside buffer). Intel uses the XD bit (execute Disable) and ARM uses an XN bit (eXecute Never). Most operating systems such as Linux, Windows, and several RTOSs support such features.

Address space layout randomization: While more of an operating system treatment of virtual memory space than a hardware feature, it is important to consider ASLR. This type of countermeasure targets buffer-overflow as well as return-to-libc attacks. These attacks are based on an attacker understanding the layout of memory and forcing calls to certain benign code and libraries. Calling these libraries becomes particularly laborious if the memory space is randomized on each boot. Linux provides the ASLR ability using the PAX and Exec Shield patches. Microsoft provides protection for heap, stack, and process blocks as well.





Storage security





Often, IoT devices will have persistent storage at the edge node or on a router/gateway. Intelligent fog nodes will require persistent storage of some kind as well. The security of data on the device is imperative to prevent malicious malware from being deployed and to protect the data in the event the IoT device is stolen. Most mass storage devices such as flash modules and rotating disks have models with encryption and security technology.

The FIPS 140-2 (Federal Information Processing Standard) is a government regulation detailing encryption and security requirements for IT devices that manage or store sensitive data. It specifies not only technical requirements but also defines policies and procedures. FIPS 140-2 has several levels of compliance:



Level 1: Software-only encryption. Limited security.

Level 2: Role-based authentication is necessary. Requires the ability to detect physical tampering using tamper-evident seals.

Level 3: Includes physical tamper resistance. If the device is tampered with, it will erase critical security parameters. Includes cryptographic protection and key management. Includes identity-based authentication.

Level 4: Advanced tamper protection for products designed to work in physically unprotected environments.

In addition to encryption, it is also necessary to consider the security of media when it's decommissioned or disposed of. It is fairly easy to retrieve contents from old storage systems. There are additional standards on how to wipe and erase content securely from media (whether it's a magnetically based disk or a phase-change flash component). NIST also publishes documents on securely erasing and wiping content such as the NIST Special Publication 800-88 for Secure Erase.





Physical security


Tamper resistance and physical security are particularly important for IoT devices. In many scenarios, an IoT device will be remote and without the safeguards of on-premises devices. This is analogous to the Enigma machine of World War Two. Retrieving a working machine from the German submarine U-110 helped break the cipher. An attacker with access to the IoT device can use whatever tools are at their leisure to crack the system, as we saw with the Chain Reaction exploit.

Side channel attacks, as shown, deal with power analysis; other forms are timing attacks, cache attacks, electromagnetic field emissions, and scan chain attacks. The common theme of a side-channel attack is the compromised unit is essentially a device under test (DUT). This means the device will be observed and measured in a controlled environment.

Additionally, techniques like DPA use statistical analysis approaches to look for the correlations of random input to output. The statistical analysis only works if the system behaves identically from run to run with the same input:

Methodology



Timing Attacks

Attempts to exploit small differences in the timing of algorithms. For example, measuring the timing of a password decoding algorithm and observing early exits from the routine. Attackers also can observe cache utilization to witness the characteristics of the algorithm.



Simple Power Analysis (SPA)

Similar to a timing attack but measures large changes in dynamic power or current due to the behavior of an algorithm and opcodes. Public keys are particularly susceptible. The analysis needs few traces to work but the traces need a high degree of precision. As most cryptographic algorithms are mathematically intensive, different opcodes will show up as different power signatures in a trace.



Differential Power Analysis (DPA)

DPA measures dynamic power but can observe changes that are too small to be observed directly as in SPA. By injecting random input (such as different random keys) into a system, the attacker can perform thousands of traces to build a data-dependent set. Attacking an AES algorithm, for example, simply means building two sets of traces depending on the value of the bit (0 or 1) being cracked. The sets are averaged and the difference between the 0 and 1 set is plotted to show the effect of the random input to the output.





Methods of prevention are well known and several can be licensed and used in a variety of hardware. Countermeasures for these types of attacks include:

Modify the encryption function to minimize the use of the key. Use a short-lived session key based on a hash of the actual key.

For timing attacks, randomly insert functions that will not perturb the original algorithm. Use different random opcodes to create a large work function for the attacks.

Remove conditional branches that depend on the key.

For power attacks, decrease leakage at every opportunity and limit the number of operations per key. This reduces the attacker working set.

Induce noise into power lines. Use variable timing operations or skew clocks.

Change the order of independent operations. This reduces correlation factors around the S-Box calculation.



Other hardware considerations include:

Preventing access to debug ports and channels. Often these are exposed on the PCA as serial ports and JTAG ports. Headers should be removed and fuse bits blown to prevent debug access in the most hardened cases.

ASICs typically use ball grid array (BGA) pads to attach to a PCA. High-performance adhesives and thermally-resistant glue should be used to surround the package and may cause irreparable damage if tampered with.





Cryptography





Encryption and secrecy are absolute requirements of IoT deployments. They are used for securing communication, protecting firmware, and authentication. Regarding encryption, there are generally three forms to consider:





Symmetric key encryption: Encryption and decryption keys are identical. RC5, DES, 3DES, and AES are all forms of symmetric key encryption.

Public Key encryption: Encryption key is published publicly for anyone to use and encrypt data. Only the receiving party has a private key used to decrypt the message. This is also known as asymmetric encryption. Asymmetric cryptography manages data secrecy, authenticates participants, and forces non-repudiation. Well-know internet encryption and message protocols such as Elliptic Curve, PGP, RSA, TLS, and S/MIME are considered public keys.

Cryptographic hash: Maps data of an arbitrary size to a bit string (called the digest). This hash function is designed to be "one way". Essentially, the only way to recreate the output hash is to force every possible input combination (it cannot be run in reverse). MD5, SHA1, SHA2, and SHA3 are all forms of one-way hashes. These are typically used to encode digital signatures such as signed firmware images, message authentication codes (MAC), or authentication. When encrypting a short message like a password, the input may be too small to effectively create a fair hash; in that case, a salt or non-private string is appended to the password to increase the entropy. A salt is a form of key derivation function (KDF):





Elements of cryptography. Here are the symmetric, asymmetric, and hashing functions. Note the key usage in symmetric and asymmetric cryptography. Symmetric has the requirement of using identical keys to encrypt and decrypt data. While faster than asymmetric encryption, the keys need to be secured.





Symmetric cryptography


In encryption, plaintext refers to the unencrypted input and the output is called ciphertext, as it is encrypted. The standard for encryption is the Advanced Encryption Standard (AES) which replaced older DES algorithms dating from the 1970s. AES is part of the FIPS specification and the ISO/IEC 18033-3 standard used worldwide. AES algorithms use fixed blocks of 128, 192, or 256 bits. Messages larger than the bit width will be split into multiple blocks. AES has four basic phases of operation during the cipher. The pseudo code for a generic AES encryption is shown here:

// Psuedo code for an AES-128 Cipher

// in: 128 bits (plaintext)

// out: 128 bits (ciphertext)

// w: 44 words, 32 bits each (expanded key)

state = in



w=KeyExpansion(key) //Key Expansion phase (effectively encrypts key itself)

AddRoundKey(state, w[0, Nb-1]) //Initial Round



for round = 1 step 1 to Nr–1 //128 bit= 10 rounds, 192 bit = 12 rounds, 256 bit = 14 rounds

SubBytes(state) //Provide non-linearity in the cipher

ShiftRows(state) //Avoids columns being encrypted independently which can weaken the algorithm

MixColumns(state) //Transforms each column and adds diffusion to the cipher

AddRoundKey(state, w[round*Nb, (round+1)*Nb-1]) //Generates a subkey an combines it with state.

end for



SubBytes(state) //Final round and cleanup.

ShiftRows(state)

AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1])



out = state

AES key lengths can be 128, 192, or 256 bits. Generally, the larger the key length the better the protection. The size of the key is proportional to the number of CPU cycles needed to encrypt or decrypt a block: 128 bit needs 10 cycles, 192 bit needs 12 cycles, and 256 bit needs 14 cycles.

Block ciphers represent encryption algorithms that are based on a symmetric key and operate on a single block of data. Modern ciphers are based on Claude Shannon's work on product ciphers in 1949. A cipher mode of operation is an algorithm that uses a block cipher and describes how to repeatedly apply a cipher to transform large amounts of data consisting of many blocks. Most modern ciphers also require an Initialization Vector (IV) to ensure distinct ciphertexts even if the same plaintext is entered repeatedly. There are several modes of operation such as:

Electronic Codebook (ECB): This is the most basic form of AES encryption, but it is used with other modes to build more advanced security. Data is divided into blocks and each is encrypted individually. Identical blocks will produce identical ciphers which makes this mode relatively weak.

Cipher Block Chaining (CBC): Plaintext messages Xored with the previous ciphertext before being encrypted.

Cipher Feedback Chaining (CFB): Similar to CBC but forms a stream of ciphers (the output of the previous cipher feeds into the next). CFB depends on the previous block cipher to provide input to the current cipher being generated. Because of the dependency of previous ciphers, CFB cannot be processed in parallel. Streaming ciphers allows for a block to be lost in transit but subsequent blocks can recover from the damage.

Output Feedback Chaining (OFB): Similar to CFB, this is a streaming cipher but allows for error correcting codes to be applied before encryption.

Counter (CTR): Turns a block cipher into a stream cipher but uses a counter. The incrementing counter feeds each block cipher in parallel allowing for fast execution. The nonce and counter are concatenated together to feed the block cipher.

CBC with Message Authentication Code (CBC-MAC): A MAC (also known as tag or MIC) is used to authenticate a message and confirm the message came from the stated sender. The MAC or MIC is then added to the message for verification by the receiver.



These modes were first constructed in the late 1970s and early 1980s and were advocated by the National Institute of Standards and Technology in FIPS 81 as DES modes. These modes provide encryption for the confidentiality of information but will not protect against modification or tampering. To do that, a digital signature is needed and the security community developed CBC-MAC for authentication. Combining CBC-MAC with one of the legacy modes was difficult until algorithms like AES-CCM were established, which provide both authentication as well as secrecy. CCM stands for Counter with CBC-MAC Mode.

CCM is an important encryption mode used to sign and encrypt data and is used in a plethora of protocols covered in this book including Zigbee, Bluetooth Low Energy, TLS 1.2 (after key exchange), IPSEC, and 802.11 Wi-Fi WPA2.

AES-CCM makes use of dual ciphers: CBC and CTR. AES-CTR or counter mode is used for the general decryption of the ciphertext stream flowing in. The incoming stream contains an encrypted authentication tag. AES-CTR will decrypt the tag as well as the payload data. An "expected tag" is formed from this phase of the algorithm. The AES-CBC phase of the algorithm tags as input the decrypted blocks from the AES-CTR output and the original header of the frame. The data is encrypted; however, the only relevant data needed for authentication is the calculated tag. If the AES-CBC calculated tag differs from the AES-CTR expected tag, then there is the possibility that the data was tampered with in transit.

The figure below illustrates an incoming encrypted stream of data that is both authenticated using AES-CBC and decrypted using AES-CTR. This ensures both the secrecy and authenticity of the origin of a message:



AES-CCM mode.

One consideration for IoT deployments in a fully connected mesh is the number of keys necessary. For n nodes in a mesh that desire bidirectional communication, there are n(n-1)/2 keys or O(n2).





Asymmetric cryptography


Asymmetric cryptography is also called public key cryptography. Asymmetric keys are generated in pairs (encrypting and decrypting). The keys can be interchangeable meaning a key could both encrypt and decrypt, but that is not a requirement. The typical use, however, is to generate a pair of keys and keep one private and the other public. This section describes the three foundational public key cryptograms: RSA, Diffie-Hellman, and Elliptical Curves.

Note that unlike symmetric key counts in a mesh where any node can communicate with any other node, asymmetric cryptography only requires 2n keys or O(n).

The first asymmetric public key encryption method described is the Rivest-Shamir-Adleman algorithm, or RSA, developed in 1978. It is based on a user finding and publishing the product of two large prime numbers and an auxiliary value (public key). The public key can be used by anyone to encrypt a message but the prime factors are private. The algorithm operates as follows:

Find two large primes, p and q

n = pq

φ(n) =(p1)(q-1)

Public key: Choose an integer e so that 1&lt;e&lt;φ(n), e is coprime to φ(n); a typical value is 216 + 1 = 65537

Private key: Compute d to solve the congruence relation de≡1 (mod φ(n))



Therefore, to encrypt a message using the public key (n,e) and to decrypt a message using the private key (n,d):

Encrypt: Ciphertext = (plaintext)e mod n

Decrypt: Plaintext = (ciphertext)d mod n



It is often the case that artificial padding is injected into m before encryption to avoid cases of short messages failing to produce good ciphertext.



Perhaps the best-known form of asymmetric key exchange is the Diffie-Hellman key exchange process (named after Whitfield Diffie and Martin Hellman). Typical of asymmetric cryptography is the notion of a Trapdoor Function which takes a given value A and produces an output B. However, trapdoor function B does not produce A.

The Diffie-Hellman method of key exchange allows two parties (Alice A and Bob B) to exchange keys without any previous knowledge of any shared secret key s. The algorithm is based on the plaintext exchange of a starting prime number, p, and a prime generator. The generator g is a primitive root modulo p. Let Alice's private key be a and Bob's private key be b. Then, A=ga mod p and B=gb mod p. Alice computes the secret key as s=Ba mod p and Bob computes the secret key as s=Ba mod p.

In general, (ga mod p)b mod p = (gb mod p)a mod p:



Diffie-Hellman key exchange. The process begins with the plaintext exchange of an agreed upon prime and generator of prime. With an independent private key generated by Alice and Bob, the public keys are generated and sent in plaintext over the network. This is used to generate a secret key used for encryption and decryption.

The strength of this form of secure key exchange is generating a true random number for each private key. Even the slight predictability of a pseudo-random number generator (PRNG) can lead to breaking the encryption. However, the principal issue is the lack of authentication which can lead to an MITM attack.

The other form of key exchange is Elliptic-Curve Diffie-Hellman (ECDH) and was proposed by Koblitz and Miller in 1985. It is based on the algebra of elliptic curves over a finite field. NIST has endorsed ECDH and the NSA allows ECDH for top-secret material using 384-bit keys. Elliptic Curve Cryptography (ECC) shares these basic tenets regarding the properties of an elliptical curve:

Symmetric about the x-axis

A straight line will intersect the elliptic curve at no more than three points



The process of ECC starts with drawing a straight line from a given point on the edge towards MAX. A line is drawn from point A to B. A dot function is used to draw a line between two points and then to draw a line straight up (or down) from the new unlabelled intersection to its counterpart on the positive or negative y-axis. This process is repeated n times, where n is the key size.

This process is analogous to seeing the end results of a pool table after a ball has been hit and strikes the cushions many times. An observer seeing the ending location of the ball would have a difficult time determining where the original location of the ball was.

MAX corresponds maximum value on the x-axis, placing a limit on how far a vertex will stretch. If by chance the vertex is greater than MAX, the algorithm forces the value that would have extended beyond the MAX limit and sets a new point x-MAX distance away from the origin A. MAX is equivalent to the key size being used. A large key size results in more vertices being constructed and increasing strength of secrecy. Essentially this is a wrap around function:



Elliptical Curve Cryptography (ECC). Here is a standard elliptical curve on an x, y-axis. The process starts by following straight line paths from a given point A to a second point and locating the third new unlabelled intersection. A line is drawn to the opposite but identical y plane coordinate which now becomes a labeled entity. The process continues for n points which correspond to the key length.

Elliptical curves are becoming prevalent over RSA. Modern browsers are capable of supporting ECDH, which is the preferred method of authentication over SLL/TLS. ECDH is also found in Bitcoins, as we will see later, and several other protocols. RSA is only used now if an SSL certificate has a matching RSA key.

The other advantage is that the key lengths can be kept short and still have the same cryptographic strength as a legacy method. For example, a 256-bit key in ECC is equivalent to a 3072-bit key in RSA. The importance of this should be considered for constrained IoT devices.





Cryptographic hash (authentication and signing)


Hashing functions represent the third type of cipher technology to consider. These are typically used to generate a digital signature. They are also considered "one-way" or impossible to invert. To recreate the original data after passing through a hash function would be a brute-force attack of every possible combination of inputs. The key attributes of a hashing function include:

Always generates the same hash from the same input

Quick to compute but not free (see proof of work)

It is non-reversible and cannot regenerate the original message from the hash value

A small change to the input will result in significant entropy or a change in the output

Two different messages will never have the same hash value



The effects of cryptographic hashing functions like SHA1 (Secure Hash Algorithm) can be demonstrated by altering just one character in a longer string:

Input: Boise Idaho

SHA1 Hash Output: 375941d3fb91836fb7c76e811d527d6c0a251ed4

Input: Boise Idaho

SHA1 Hash Output: 82b6109838f8f40dc1d1530e5535908853e3fd5f



SHA algorithms are used extensively in applications such as:

Git repositories

TLS certificate signing for web browsing (HTTPS)

Validating file or disk image content authenticity



Most hash functions are built upon the Merkle-Damgård construction. Here, the input is split into equally sized blocks which are processed serially with a compression function combined with the output of the previous compression. An Initialization Vector (IV) is used to seed the process. By using a compression function, the hash is resistant to collisions. SHA-1 is built upon this Merkle-Damgård construction:



SHA-1 algorithm. Input split into five 32-bit chunks.

In general, the SHA algorithm's input message must be less than 264 bits. The message is processed in 512-bit blocks sequentially. SHA-1 is now superseded with strong kernels such as SHA-256 and SHA-3. SHA-1 was found to have "collision" within the hash. While it would take approximately 251 to 257 operations to find a collision, it would take only a few thousand dollars of rented GPU time to resolve the hash. Thus, the recommendation is to move to the strong SHA models.





Public Key Infrastructure


Asymmetric cryptography (public key) is a mainstay of internet commerce and communication. It has routinely been used for SSL and TLS connection on the web. A typical use is public key encryption, where data in transit is encrypted by anyone holding the public key but can only be decrypted by the holder of the private key. Another use is digital signatures, where a blob of data is signed with a sender's private key and the receiving party can verify the authenticity if they hold the public key.

To assist with providing public keys with confidence, a process known as Public Key Infrastructure (PKI) is used. To guarantee authenticity, trusted third parties known as Certificate Authorities (CA) manage roles and policies to create and distribute digital certificates. Symantec, Comodo, and GoDaddy are the largest public issuers of TLS certificates. X.509 is a standard that defines public key certificate formats. It is the basis of TLS/SSL and HTTPS secure communication. X.509 defines such things as the encryption algorithm used, expiration dates, and the issuer of the certificate.

PKI consists of Registration Authority (RA) that verifies the sender and manages specific roles and policies and can revoke certificates. The RA also communicates with a Validation Authority (VA) to transfer revocation lists. The CA issues the certificate to the sender. When a message is received, the key can be validated by the VA to verify that it hasn't been revoked.

In the following figure, an example of PKI infrastructure is shown. The CA, RA, and VA systems used and the phases of granting and verifying a key granted for encrypting a message are shown:

PKI infrastructure example.





Network stack – Transport Layer Security


Transport Layer Security (TLS) has been covered in many areas of this book, from TLS and DTLS for MQTT and CoAP to network security over the WAN and PAN security. Each has had some form of reliance on TLS. TLS also brings together all the cryptographic protocols and technologies we mention. This section briefly covers the TLS1.2 technology and process.

Originally SSL (Secure Sockets Layer), it was introduced in the 1990s but was replaced by TLS in 1999. TLS 1.2 is the current specification in RFC5246 as of 2008. TLS 1.2 includes an SHA-256 hash generator to replace SHA-1 and to strengthen its security profile.

In TLS encryption, the process is as follows:

The client opens a connection to a TLS-capable server (port 443 for HTTPS)

The client presents a list of supported ciphers that can be used

Service picks a cipher and hash function and notifies the client

The server sends a digital certificate to the client which includes a certificate authority and the server's public key

Client confirms the validity of the secret

A session key is generated either by: A random number being encrypted with the server's public key, and sending the result to the server. Server and client then use the random number to create a session key which is used for the duration of the communication.

Using Dixie-Hellman key exchange to generate a session key used for encryption and decryption. The session key is used until the connection is closed.





Communication starts using the encrypted channel



Shown below is the handshaking process for TLS1.2 communication between two devices:



TLS 1.2 handshake sequence

Datagram Transport Layer Security (DTLS) is a communications protocol at the datagram layer based on TLS (DTLS 1.2 is based on TLS 1.2). It is intended to produce similar security guarantees. The CoAP lightweight protocol uses DTLS for security.





Software defined perimeter





Earlier in the book, in Chapter 8, Router and Gateways, the concept of software-defined networks and overlay networks was discussed. Overlay networks and their ability to create microsegments is extremely powerful especially in mass IoT scaling and situations where a DDOS attack can be mitigated. An additional component of software-defined networking is called Software-Defined Perimeter (SDP) and is worth a discussion in terms of the overall security picture.





Software-Defined Perimeter architecture


A Software-Defined Perimeter (SDP) is an approach to network and communication security where no trust model exists. It is based on the Defense Information Systems Agency (DISA)'s black cloud. Black cloud means information is shared on a need-to-know basis. An SDP can mitigate attacks such as DDOS, MITM, zero-day exploits, and server scanning among others. Along with providing an overlay and micro-segmentation for each attached device, the perimeter creates an invitation-only (identity-based) security perimeter around users, clients, and IoT devices.

An SDP can be used to create an overlay network which is a network, built on top of another network. A historical reference is legacy internet services built upon the pre-existing telephone network. In this hybrid networking approach, the distributed control plane remains the same. Edge routers and virtual switches steer data based on control plane rules. Multiple overlay networks can be built on the same infrastructure. Since an SDN remains persistent in much the same way as a wired network, it is ideal for real-time applications, remote monitoring, and complex event processing. The ability to create multiple overlay networks using the same edge components allows for micro-segmentation where different resources have a direct relationship with different consumers of data. Each resource-consumer pair is a separate immutable network that is only able to see outside of its virtual overlay as the administrator chooses.

The ability to create multiple overlay networks using the same edge components allows for micro-segmentation where each endpoint in a globally distributed IoT network can build individual and isolated network segments over the existing network infrastructure. In theory, every sensor could be isolated from another. This is a powerful tool for enabling enterprise connectivity for IoT deployments as services and devices can be isolated and protected from each other.

The following graphic depicts an SDN overlay example. Here, a corporation has three remote franchises with a number of different IoT and edge devices at each store. The network resides on an SDN overlay network with micro-segments isolating POS and VOIP systems that are corporately managed from various sensors for security, insurance, and cold storage monitoring. Third-party service providers can manage various remote sensors using an isolated and secure virtual overlay network only for the device they manage:



An example SDN Overlay Network.

An SDP can further extend security by developing an invitation system, forcing a pair of devices to authenticate first and connect second. Only a pre-authorized user or client may be added to a network. That authorization is extended by an invitation from the control plane via email or some registration facility. If the user accepts the invitation, client certificates and credentials are extended to that system alone. The resource extending the invitation maintains a record of extended certificates and will only provide an overlay connection when both parties accept the role.

The real-world analogy is how one sends invitations for a party. Invitations are mailed out to selected individuals, with a date, time, address, and other details. Those individuals may or may not want to attend at the party (it is up to them). The alternative is to advertise on the web, TV, and radio that you are having a party and then authenticate each person as they arrive at the door.





Blockchains and cryptocurrencies in IoT


Blockchains are public, digital, and decentralized ledgers or cryptocurrency transactions. The original cryptocurrency blockchain was Bitcoin but there are over 700 new currencies on the market such as Ethereum, Ripple, and Dash. The power of a blockchain is that there is no single entity controlling the state of transactions. It also forces redundancy in the system by ensuring everyone using a blockchain also maintains a copy of the ledger. Assuming there is no inherent trust in blockchain participants, the system must live in consensus.

A good question to ask is if we have solved identity management and security with asymmetric cryptography and key exchanges, why are blockchains needed to exchange data or currency? This is not enough for the exchange of money or data of value. One thing to note is that since the inception of information theory, when two devices communicate, Bob and Alice, they send a message or a bit of data. That information is still retained by Bob even if Alice receives a copy. When exchanging money or contracts, that data must leave one source and arrive at another. There is only a single instance. Authenticity and encryption are tools needed for communication but a new method to transfer ownership had to be invented:



Ledger topologies. A centralized ledger is the typical process of a single controlling agent maintaining "the books". Cryptocurrencies use either decentralized or distributed ledgers

Blockchain secure cryptocurrencies are particularly relevant to IoT. Some example use cases include:

Machine to machine payments: The IoT needs to ready itself for machine exchanging services for currency.

Supply chain management: In this case, the movement and logistics in managing inventory, moving goods, and logistics can replace paper-based tracking with blockchain immutability and security. Every container, movement, location, and state can be tracked, verified, and certified. Attempts to forge, delete, or modify tracking information becomes impossible.

Solar energy: Imagine residential solar as a service. In this case, solar panels installed on a customer home are generating energy for the home. Alternatively, they can also send energy back to the grid to power someone else (perhaps in exchange for carbon credits).





Bitcoin (blockchain-based)


The cryptocurrency portion of Bitcoin is different from the blockchain itself. Bitcoin is an artificial currency. It has no commodity or value backing like gold. It is also not physical; it only exists in a network construct. Finally, the supply or number of Bitcoins is not determined by a central bank or any authority. It is completely decentralized. Like other blockchains, it is built up from public key cryptography, a large and distributed peer-to-peer network, and a protocol that defines the Bitcoin structure. While not the first to conceive of digital cash, Satoshi Nakamoto (alias) posted the paper in 2008 called Bitcoin: A Peer-to-Peer Electronic Cash System to a cryptography list. In 2009, the first Bitcoin network was online and Satoshi mined the first block (Genesis Block).

The concept of a blockchain means that there exists a block representing the current portion of a blockchain. A computer connected to the blockchain network is called a node. Each node participates in validating and relaying transactions by obtaining a copy of the blockchain and is essentially an administrator.

A distributed network based on peer-to-peer topologies exists for Bitcoin. Metcalfe's Law applies here since the value of a cryptocurrency like Bitcoin is based on the size of the network. The network maintains the system of records (the ledger). The problem is, where do you find a source of computing willing to share their compute time for monitoring ledgers? The answer is to build a reward system called Bitcoin mining.

The transaction process is shown in the following figure. It starts with a transaction request. The request is broadcast to a Peer-to-Peer (P2P) network of computers called nodes. The peer network is responsible for validating the authenticity of the user. Upon validation, the transaction is verified and combined with other transactions to create a new block of data for the distributed ledger. When a block is full, it is added to the existing blockchain, making it immutable. The Bitcoin authentication, mining, and validation process is shown below:



Bitcoin blockchain transaction process.

Shown in the graphic is the exchange of 0.000554 Bitcoins between Alice and Bob with a service fee of 0.0001 BTC. Alice initiates the transaction by signing the contents of the transaction with the previous transaction hash against Alice's private key. Alice also includes her public key in the inputScriptSig script. The transaction is then broadcast to the Bitcoin P2P network for inclusion in a block and validation. The network competes to validate and discover a working nonce based on the current strength of complexity. If a block is discovered, the server broadcasts the block to peers for validation and then inclusion in the chain.

What follows is a qualitative analysis of the blockchain and in particular Bitcoin processing. It is important to understand these fundamentals which build on all the security foundations from earlier in this chapter:

Digitally signed transaction: Alice intends to give Bob 1 Bitcoin. The first step is to announce to the world that Alice intends to give Bob 1 Bitcoin. Alice does this by writing this message: "Alice will give Bob 1 Bitcoin," and digitally signing it for authentication with her private key. Anyone can verify the message is authentic given the public key. However, Alice could replay the message and artificially forge money.

Unique identification: To resolve the forgery problem, Bitcoin creates a unique with a serial number. US-issued money has serial numbers and Bitcoins do as well in a general sense. Bitcoin uses a hash rather than a centrally administered serial number. The hash that identifies the transactions are self-generated as part of a transaction.

A serious problem arises with double spending. Even if the transaction is signed and uniquely hashed, Alice could potentially reuse the same Bitcoin with other parties. Bob will check Alice's transaction and everything will verify. If Alice also uses the same transaction but buys something from Charlie, she effectively is cheating the system. The Bitcoin network is very large, but there is still a small chance that theft could occur. Bitcoin users protect against double spending by waiting for a confirmation when receiving payments on the blockchain. As a transaction becomes dated more confirmations arise, validating it becomes more irreversible.

Security through peer validation: To resolve the double spending cheat, what is done in blockchains is that recipients of the transaction (Bob and Charlie) broadcast their potential payment to the network and request the peer network to help legitimize it. This service of requesting assistance in verifying a transaction doesn't come free.



Proof of Work Burden: This still hasn't completely resolved the double spend problem. Alice could simply hijack the network with her own servers and claim all her transactions are valid. To finally resolve this issue, Bitcoin introduced the concept of Proof of Work. There are two aspects to proof-of-work concepts. The first aspect is validating the authenticity of a transaction should to be computationally expensive for a computing device. It must be more computationally burdensome than just verifying keys, logins names, transaction IDs, and other trivial steps in the authentication process. Second, users need to be rewarded to help resolve other people's money exchanges—this is covered in step

The method Bitcoin uses to force a work function on individuals validating transactions is to attach a nonce to the header of the transactions in process. Bitcoin then uses the cryptographically secure SHA-256 algorithm to hash the nonce and header message. The goal is to keep changing the nonce and deliver hash leading values that are less than 256-bit values, known as the target. A low target makes it much more computationally intensive to resolve. Since each hash basically generates a completely random number, many SHA-256 hashes must be performed. On average this takes about 10 minutes to resolve.



The 10-minute proof-of-work also implies that a transaction will take 10 minutes on average to validate. Miners work on blocks which are collections of many transactions. A block is limited (currently) to 1 MB of transactions which implies your transaction will not be processed until the current block is completed. This can have implications for an IoT device with real-time demands.

Bitcoin Mining Incentives: To encourage individuals to build a peer-to-peer network to validate other people's spending, incentives are used to reward those individuals for their service. There are two forms of an reward. The first is Bitcoin Mining, which awards individuals who validate a block of transactions. The other form of award is a transaction fee. The transaction fee is rewarded to a miner who helps validate a block and is taken as part of the transaction. Initially, there was no fee, but as Bitcoins have gained popularity, the fee has grown. On average the fee is about $35 (in Bitcoin currency) for a successful transaction. As a further incentive, fees are dynamic and one can increase fees, which artificially forces the transaction to be processed faster for a user. Even when new Bitcoin generation is exhausted, there is still an incentive to manage transactions.



Initially, the reward was very high (50 Bitcoins) but that reduces by half about every four years after 210,000 blocks have been found. This will continue until the year 2140 when the halving rate will reach a point of exhaustion and rewards will be less than the lowest unit value of a Bitcoin (called a Satoshi or 10-8 Bitcoins).



Given that a block is mined every 10 minutes and the reward is halved every four years, we can come up to the maximum number of Bitcoins in existence. We also know the initial reward for a mined coin is 50 Bitcoins. This produces a series that converges to the Santoshi limit: 50 BTC + 25 BTC + 12.5BTC... = 100 BTC. 210,000 * 100 = 21 million total Bitcoins possible.



Security through chaining order: The order in which transactions occur is also vital to the integrity of a currency. If a Bitcoin is transferred from Alice to Bob and then to Charlie, you don't want the ledgers to record the events as Bob to Charlie then Alice to Bob. Blockchains manage the order by chaining the transactions. All new blocks added to the network contain a pointer to the last block validated in the chain. Bitcoin states that no transaction is valid until it is chained to the longest fork and that at least five blocks follow it in the longest fork.

This provision solves the asynchronous problem of what happens if Alice tries to double spend a Bitcoin with Bob and Charlie. She might try to broadcast the transaction with Bob for one set of the miners and with Charlie on a second set. However, the process will find this fraud when the network converges. Bob may win the transaction but the network will invalidate Charlie's transaction.

Even if Alice attempts to pay herself and attempts to pay Bob, the ordering rules stop her. She does this by sending Bob a Bitcoin and waiting for the moment when the transaction is verified (five blocks follow it). She then immediately pays herself the same Bitcoin which causes a fork in the chain. She now has to validate five additional blocks of Bitcoins. This takes about 50 minutes as stated in step 4. That requires an enormous amount of computing power as she has to process faster than all other miners combined.



Another interesting concept about blockchains is their use in managing the denial of service attacks. A proof-of-work system (or protocol/function) is an economic measure to deter the denial of service attacks. One conducting an attack intends to saturate a network with as much data as possible to overwhelm a system. A blockchain involving a work function reduces the effectiveness of such an attack. A key feature of these schemes is their asymmetry: the work must be moderately hard (but feasible) on the requester side but easy to check with the service provider.





IOTA (directed acyclical graph-based)


An interesting new cryptocurrency has been developed solely for IoT called IOTA. In this case, the IOT devices themselves are the backbone of the trust network and the architecture is based on a Directed Acyclic Graph (DAG). Bitcoin has an associated fee per transaction. IOTA has no fees. This is very important in the world of IoT, which may be serving micro-transactions. For example, a sensor may provide a service reporting to many subscribers of MQTT. The service has value in aggregate terms but is measurably very small per single transaction, so small that a Bitcoin fee to provide that information may be larger than the value of the data.

The IOTA architecture has the following aspects:

No centralization of monetary control; with blockchain, miners can form large groups in order to increase the number of blocks they can mine as well as increase their rewards. This can potentially lead to a concentration of power and possibly harm the network.

No costly hardware equipment. In order to mine Bitcoins. cryptocurrency, powerful processors are necessary due to the complexity of the processing logic required.

Micro and nano transactions at the IoT level of data.

Proven security even against quantum computing brute force attacks.

Data that can be transferred through IOTA just as currency can. The data is fully authenticated and tamper-proof.

Since IOTA is agnostic to the payload of a transaction, a national tamper-proof voting system can be designed.

Anything with a small SOC can become a service. If you own a device such as a drill, personal Wi-Fi, a microwave, or bicycle, the devices with a small SOC or microcontroller can join IOTA and become leasing sources of revenue.



The IOTA DAG is called a tangle and is used store transactions as a distributed ledger. Transactions are issued by nodes (IoT devices) and they constitute a set on the tangle DAG. If there is no directed edge between transaction A and transaction B, but there is a path of at least length two from A to B, it can be said A indirectly approves B.

There is also the notion of a genesis transaction. Since there is no mining for graph edges (and no incentives or fees) to start the tangle, one node contains all tokens. The genesis event sends the tokens to other "founder" addresses. This is the static set of all tokens and no new tokens will ever be created.

When a new transaction arrives, it must approve (or deny) two previous transactions; this is called direct approval. This forms a direct edge on the graph. Anything performing a transaction is required to produce a "work" product on behalf of the tangle. This work involves finding a nonce that works with the hash of a portion of the approved transaction. Thus by using IOTA, the network becomes more distributed and more secure. The transaction may have many approvers. As more transactions occur, the confidence that the transaction is legitimate increases. If a node attempts to approve a transaction that for all intents is not legitimate, it risks having its own transaction be continuously disproved and falling into oblivion.

While still early in the rollout, it is a technology to watch. More information can be found at http://iota.org.





Government regulations and intervention





Government bodies and regulatory agencies have stepped in to recommend and mandate levels of security that must be met by vendors to be considered secure. There has been more interest lately in the US government with regards to ensuring certain security standards are met for connected devices, especially with the growing attacks on IoT systems. It is important to be cognizant of these rules and laws as other countries may adopt similar or, in other cases, completely dissimilar regulations making the job of an IoT architect difficult when scaling globally. These laws affect privacy and security for the individual as well as the nation.





US Congressional Bill –Internet of Things (IoT) Cybersecurity Improvement Act of 2017





IoT security has received attention from various governments. A bipartisan bill (S.1691 – Internet of Things IoT Cybersecurity Improvement Act of 2017 (https://www.congress.gov/bill/115th-congress/senate-bill/1691/text)) was introduced in the Senate on August 1, 2017. The bill's intent is to formalize and regulate the minimal security standards that must be met for internet-connected devices to be sold to US federal agencies. While the bill has yet to become law, the provisions clearly show the degree of regulation for IoT security that is being considered.

The bill specifically calls out the following requirements for a contractor providing federal IoT solutions:





Solutions hardware, software, and firmware must be free of vulnerabilities as stated in the NIST National Vulnerability Database.

Software and firmware must be capable of accepting authenticated updates and patches. Additionally, contractors must patch vulnerabilities in a timely manner. The contractor is also responsible for supporting deployments and stating when support will end and how support will be managed for IoT devices.

Only non-deprecated protocols and technologies for communications, encryption, and interconnection should be used.

No hardcoded credentials installed for remote administration.

A method must be provided for any internet-connected device software or firmware to be updated or patched in any part to fix a vulnerability.

Written certification that the IoT device provides third-party technologies must also comply with these standards.

The Director of Management and Budget may issue deadlines for the removal and replacement of existing IoT devices that are deemed to be insecure.

60 days after becoming law, the National Protection and Programs Director with the assistance of private and academic technologists will issue formal cybersecurity guidelines for any and all IoT devices used by the federal government.



Written into the bill are provisions to allow for agencies to adopt or continue to use better security technologies than what is written into the bill (upon approval from the director of management and budget). Additionally, the bill recognizes some IoT devices are severely constrained in terms of processing power and memory and may not be on parity with the provisions of the bill. Again, in that case, petitions for a waiver would be managed by the Director with a plan to upgrade and replace. For these non-compliant devices, the bill states the following technologies may be approved with coordination between NIST and the director to mitigate the risk:





Software-defined network segmentation and micro-segmentation

Operating system-level controlled containers and microservices for isolating runtimes

Multi-factor authentication

Intelligent network edge solutions such as gateways that can isolate and remediate threats



While the bill is still in committee at the time of writing, it certainly shows the concern of IoT security and vulnerabilities at a federal level. The bill may morph or be killed, but the significance of IoT security has gained the attention of the US government and lawmakers.





Other governmental bodies





Other agencies in the US federal government have already issued guidelines and recommendations for a litany of technologies surrounding IoT. Most notable is the National Institute for Standards and Technology (NIST), which has produced several documents and guides for the security of connected devices. They also maintain national and internationally recognized standards regarding security. Supporting material can be found at http://csrc.nist.gov. Several important documents relating to cryptography and FIPS standards are listed here:





NIST Special Publication 800-121 Revision 2, Guide to Bluetooth Security. This specifies a set of recommended security provisions for Bluetooth Classic and Bluetooth BLE: http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-121r2.pdf.

NIST Special Publication 800-175A, Guidelines for Using Cryptographic Standards in the Federal Government: http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-175A.pdf.

NIST FIPS standards: https://csrc.nist.gov/publications/search?requestSeriesList=3&requestStatusList=1,3&requestDisplayOption=brief&requestSortOrder=5&itemsPerPage=All.



The Department of Homeland Security provides operational binding directives for all federal agencies in terms of national security including in the area of information technology. Recent directives include 18-01, which mandates "cyber hygiene" through email policies, key management, Domain-based Message Authentication, Reporting, and Conformance (DMARC), web security using HTTPS only, and other similar actions. DHS is also involved in prescriptive guidance for Congress, other agencies, and the private sector regarding cybersecurity standards: https://www.dhs.gov/topic/cybersecurity.

The US-CERT or Computer Emergency Response Team is also critical for anyone concerned about security. The US-CERT has been chartered with finding, isolating, informing, and stopping cybersecurity threats on a national basis since 2000. They provide digital forensics, training, real-time monitoring, reports, and actionable defenses for known zero-day exploits and active security threats. Current active alerts and mitigations can be found here: https://www.us-cert.gov/ncas/alerts.





IoT security best practices





Security for IoT needs to be considered from the start of design and not retrofit at the end of a program or in the field. At that point, it is too late. Security also needs to be viewed holistic from the hardware to the cloud. This section illustrates a simple IoT project from the sensor to the cloud and illustrates the "blanket" of security to consider. The intent is to deploy a system with various levels of safeguards, all there to increase the attacker's work function.





Holistic security


Narrowly focusing on one segment of IoT doesn't provide security and establishes a weak link in the security chain. One needs to establish security from the sensor to the cloud and back—a holistic approach. Each component in the chain of control and data should have a checklist of security parameters and enablers. The following diagram illustrates an example of the layers of security from the sensor to the cloud to consider in a deployment:

Sensor to cloud holistic security. Here is an example of Bluetooth-enabled sensors communicating through an edge gateway ultimately to a cloud service. Each layer needs to provide integrity and protection. Security involves both hardware and software components. This includes the security of physical devices to prevent tampering, radio signals to prevent jamming and DOS, Root of Trust hardware and ASLR to prevent malicious code injection, data by use of encryption, pairing and association by use of authentication, network through VPNs and firewalls, and so on.





Security checklist





The following is a list of security recommendations and ideas that have traditionally worked. Again, it is important to have a blanket of security:





Use the most current operating system and libraries with all relevant patches

Use hardware that incorporates security features like Trusted Execution. Environments, Trusted Platform Modules, and non-execute spaces.

Obfuscating code in the hopes a hacker will not reverse engineer it is relatively useless. Sign, encrypt and protect your firmware and software images, especially those freely available on a company website.

Randomize default passwords.

Use a Root of Trust and secure boot to ensure you have a "golden" image of software running on a customer device.

Eliminate hardcoded passwords in ROM images.

All IP ports must remain closed by default.

Use Address Space Layout Randomization, Stack Canaries, and Gaurd bands in memory through modern operating systems.

Use automatic updates. Provide manufacturers with a mechanism to fix and patch bugs and vulnerabilities in the field. This requires a modular software architecture.

Plan for end-of-life. An IoT device may have a long usable life, but it will need to be disposed of eventually. This should include methods to securely wipe and destroy all persistent memory (flash) from the device.

Use bug bounties programs. Reward your customers and users for finding and reporting bugs, especially defects likely to expose a zero-day exploit.

Subscribe and participate in US-CERT active threat management to become immediately aware of active exploits and cyber threats.

As tempting as it is to simply build a project with MQTT, HTTP, or other insecure protocols, only ship with security and authentication enabled through TLS or DTLS. Encrypt data from the sensor to the cloud.

Employ anti-debug fuses on the package. Blow fuses in manufacturing to securely debug channels prior to releasing a product.





Summary





This chapter detailed the risks of security in the IoT. With well-known attacks such as Mirai and Stuxnet, which target IoT devices as their intended hosts, architects should design security into an IoT deployment from the start. The IoT makes for the best play space to launch an attack. The systems are usually less security mature than server and PC systems. IoT devices provide the largest attack surface on the planet. Finally, the remoteness of some IoT systems allows for attackers to be physically present and manipulate hardware, which wouldn't happen in a secure office setting. These threats need to be taken seriously, as the ramifications could have a pronounced impact on a device, a city, or a nation.

Further security links of interest are:





Black hat: https://www.blackhat.com

Defcon: https://www.defcon.org

Digital Attack Map: http://www.digitalattackmap.com

Gattack: http://gattack.io

IDA Pro Interactive Disassembler: https://www.hex-rays.com

RSA Conference: https://www.rsaconference.com&lt;/a&gt;

Shodan: https://www.shodan.io



We conclude the book with a list of consortiums and organizations to assist with IoT development, technologies, regulations, and standards.





Installing Raspbian on the Raspberry Pi





The Raspberry Pi is marketed as a small and affordable computer that you can use to learn programming. At least that was its initial goal. As we will see in this book, it is much more than that.

The following topics will be covered in this chapter:





A brief history of the Raspberry Pi

A look at operating systems for the Raspberry Pi

Installing the Raspbian OS

A quick overview of the Raspbian OS





A brief history of the Raspberry Pi


First released in 2012, the first Raspberry Pi featured a 700 MHz single core processor and 256 MB of RAM. The Raspberry Pi 2 was released in February of 2015 with a 900 MHz quad core processor and 1 GB of RAM. Released in February of 2016, the Raspberry Pi 3 increased the processor speed to 1.2 GHz. This model was also the first one to include wireless LAN and Bluetooth.

Here is an image of a Raspberry Pi 3 B (2015):

This version of the Raspberry Pi features the following parts:

Four USB 2 ports

A LAN port

A 3.5 mm composite video and audio jack

An HDMI port for video and audio

An OTG USB port (which we will use to connect the power)

A microSD slot (to hold our operating system)



A DSI display port for the Raspberry Pi touchscreen

A General Purpose Input Output (GPIO) pins

A camera port for a special Raspberry Pi camera



The Raspberry Pi Zero was released in November of 2015. Here is an image of it:

Although not as powerful as the previous Raspberry Pis, the Zero featured a smaller size (65 mm X 30 mm), perfect for projects with limited physical space (namely, wearable projects). Plus, the Raspberry Pi zero was priced at $5 USD, making it very affordable. The Raspberry Pi zero W was released on February 28, 2017 at double the price ($10 USD) with built-in Wi-Fi and Bluetooth capabilities.

The latest model, as of the time of writing, is the Raspberry Pi 3 B+, which was released on March 14, 2018. The processor speed has been upgraded to 1.4 GHz as well as the wireless LAN now supporting both 2.4 GHz and 5 GHz bands. Another upgrade is the addition of Bluetooth low energy, a technology built for applications that do not require large amounts of data to be exchanged but are required to have a long battery life.

Creators of the Raspberry Pi initially believed that they would sell at most 1,000 units. Little did they know that their invention would explode in popularity. As of March 2018, sales of Raspberry Pi computers has passed the 19 million mark.





A look at operating systems for the Raspberry Pi





There are various operating systems (or system images) that may be installed on the Raspberry Pi. These range from application-specific operating systems, such as audio players, to various general purpose operating systems. The power behind Raspberry Pi is the way it can be used for various applications and projects.

The following is a list of just a few of the operating systems (system images) available for the Raspberry Pi:





Volumio: Do you have a desire to set up a networked audio system where you access your music list using a computer or cell phone? Volumio may be what you are looking for. Installing it on a Raspberry Pi creates a headless audio player (a system that does not require a keyboard and mouse) that connects to your audio files either over USB or a network. A special audio Hardware Added on Top (HAT) may be added to your Pi to provide a pristine audio connection to an amplifier and speakers. There is even a plugin to add Spotify so that you can set up your Raspberry Pi to access this service and play music over your sound system.

PiFM radio transmitter: The PiFM radio transmitter turns your Raspberry Pi into an FM transmitter, which you can use to send audio files over the air to a standard FM radio receiver. Using a simple wire connected to one of the GPIO pins (we will learn more about GPIO later), you can create an antenna for the transmitted FM signal, which is surprisingly strong.

Stratux: ADS-B is the new standard in aviation where geo-location and weather information are shared with ground controllers and pilots. The Stratux image with additional hardware turns the Raspberry Pi into an ADS-B receiver of this information.

RetroPie: RetroPie turns your Raspberry Pi into a retro game console by emulating gaming consoles and computers from the past. Some of the emulations include Amiga, Apple II, Atari 2600, and the Nintendo Entertainment System of the early 1980s.



OctoPi: OctoPi turns your Raspberry Pi into a server for your 3D printer. Through OctoPi, you may control your 3D printer over the network, including viewing the status of your 3D printer using a webcam.

NOOBS: This is arguably the easiest way to install an operating system on the Raspberry Pi. NOOBS stands for New Out-Of-the Box Software, and we will be using NOOBS to install Raspbian.





Project overview





In this project, we will install the Raspbian operating system onto our Raspberry Pi. After installation, we will take a quick tour of the operating system to familiarize ourselves with it. We will start by formatting a microSD card to store our installation files. We will then run the installation from the microSD card. After Raspbian has been installed, we will take a quick look at it in order to familiarize ourselves with it.

This project should take about two hours to complete, as we install the Raspbian operating system and take a quick look at it.





Getting started


The following is required to complete this project:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A microSD RAM card

A Raspberry Pi NOOBS image (https://www.raspberrypi.org/downloads/noobs/)





Installing the Raspbian OS


The Raspbian OS is considered the default or go-to operating system for the Raspberry Pi. In this section, we will install Raspbian using the NOOBS image.





Formatting a microSD card for Raspbian


Raspberry Pi uses a microSD card to store the operating system. This allows you to easily switch between different operating systems (system images) for your Raspberry Pi. We will be installing the default Raspbian OS for our projects using the NOOBS image.

Start by inserting the microSD card into a USB adapter and plug it into your computer:



You may need to format the microSD card. If so, use the utilities appropriate for your computer's operating system to format the card to FAT32. It is recommended that you use a card with a capacity of 8 GB or greater. For Windows OS and cards with 64 GB of capacity or greater, a third-party tool such as FAT32 format should be used for formatting.





Copying the NOOBS files to the microSD RAM


Unzip the NOOBS image that you downloaded. Open up the unzipped directory and drag the files over to the microSD card.

The files should look the same as in the following screenshot:





Running the installer


We will now install Raspbian on our Raspberry Pi. This step should be familiar to those that have previous experience installing operating systems such as Windows or macOS. The Raspbian operating system will be installed and will run off of our microSD card.

To install Raspbian onto our microSD card, do the following:

Start by inserting the microSD card into the appropriate slot on the Raspberry Pi. Be sure to install it so that the label side (opposite side of the exposed contacts) is facing up. Insert it with the metal contacts facing the board. The microSD card should have a slight ridge at the top of the label side, which is good for easy removal using a fingernail.

Insert a keyboard and mouse into the USB slots on the side, a monitor into the HDMI port, and lastly, a USB power cable into the power port. The Raspberry Pi does not have an on/off switch and will power up as soon as the power cable is connected:





After an initial black screen with rolling white text, you should see the following dialog:





In the previous screenshot, we clicked on the Language option. For our purposes, we will keep the default of English (UK). We will also keep the keyboard at the standard gb.

As the Raspberry Pi 3 has wireless LAN, we can set up our Wi-Fi (for older boards, please plug a Wi-Fi dongle into a USB port or use the wired LAN port and skip the next step):





Click on the Wifi networks (w) button. Choose the Authentication method using the radio buttons. Some routers are equipped with a WPS button that allows you to connect directly to the router. To use the password method, choose the Password authentication radio button and enter the password for your network. After connecting to your network, you will notice that there are now more operating system options to select from:





We will go with the top option, Raspbian. Check the box beside Raspbian [RECOMMENDED] and then click on the Install (i) button at the top-left corner of the dialog. Raspbian will start installing on your Raspberry Pi. You will see a progress bar with previous graphics, describing various features of the Raspbian operating system:





After the progress bar hits 100%, the computer will reboot and you will see a screen with text before the default desktop loads up:





A quick overview of the Raspbian OS





The Raspbian desktop is similar to the desktops of other operating systems such as Windows and macOS. Clicking the top-left button drops down the application menu where you may access the various pre-installed programs. We may also shut down the Raspberry Pi from this menu:





The Chromium web browser


The second button from the left loads the Google Chromium web browser for the Raspberry Pi:



The Chromium browser is a lightweight browser that runs remarkably well on the Raspberry Pi:





The home folder


The two-folders button opens up a window showing the home folder:

The home folder is a great place to start when looking for files on your Raspberry Pi. In fact, when you take screenshots using either the scrot command or the Print Screen button, the file is automatically stored in this folder:





The Terminal


The third button from the left opens up the Terminal. The Terminal permits command-line access to Raspberry Pi's files and programs:

It is from the command line where you may update the Raspberry Pi using the sudo apt-get update and sudo apt-get dist-upgrade commands.



apt-get updates the packages list, and apt-get dist-upgrade updates the packages:

It's a good idea to run both of these commands right after installing Raspbian using the sudo command. The default user for Raspbian on the Raspberry Pi is pi, which is part of the Super Users group in Raspbian, and thus must use the sudo command (the default password for the pi user is raspberry):

Mastering the command line is a virtue that many a programmer aspires to acquire. Being able to rapidly type command after command looks so cool that even movie makers have picked up on it (when was the last time you saw the computer wiz in a movie clicking around the screen with a mouse?). To assist you in becoming this uber cool computer wiz, here are some basic Raspbian commands for you to master using the Terminal:

ls: Command to see the contents of the current directory

cd: Command to change directories. For example, use cd to move up a directory from where you currently are

pwd: Command to display the directory you are currently in

sudo: Allows the user to perform a task as the super user

shutdown: Command that allows the user to shut down the computer from the Terminal command line





Mathematica


The third and fourth buttons are for Mathematica, and a terminal to access the Wolfram language, respectively:

Mathematica spans all areas of technical computing and uses the Wolfram language as the programming language. The areas in which Mathematica is used include machine learning, image processing, neural networks and data science:

Mathematica, a proprietary software first released in 1988, can be used free for individuals on the Raspberry Pi through a partnership that was announced in late 2013.

Now let’s take a look at some of the programs that are accessed from the main drop-down menu.





Sonic Pi


Sonic Pi is a live coding environment for creating electronic music. It is accessed from the Programming menu option. Sonic Pi is a creative way to create music as the user programs loops, arpeggios, and soundscapes in real time by cutting and pasting code from one part of the app to another. Synthesizers in Sonic Pi may be configured on a deep level, providing a customized experience for the music coder:

Geared toward an EDM style of music, Sonic Pi may also be used to compose classical and jazz styles of music.





Scratch and Scratch 2.0


Scratch and Scratch 2.0 are visual programming environments designed for teaching programming to children. Using Scratch, the programmer creates their own animations with looping and conditional statements.

Games may be created within the program. The first version of Scratch was released in 2003 by the Lifelong Kindergarten group at the MIT media lab. Scratch 2.0 was released in 2013, and development is currently underway with Scratch 3.0:

Scratch and Scratch 2.0 may be accessed under the Programming menu option.





LibreOffice





LibreOffice is a free and open source office suite that forked over from OpenOffice in 2010. The LibreOffice suite consists of a word processor, a spreadsheet program, a presentation program, a vector graphics editor, a program for creating and editing mathematical formulae, and a database management program. The LibreOffice suite of programs may be accessed through the LibreOffice menu option:





Summary


We started this chapter with a look at the history of the Raspberry Pi. What started as an initiative to promote programming to a new generation has grown into a global phenomenon. We then downloaded the NOOBS image and installed the Raspbian OS, the default operating system for the Raspberry Pi. This involved formatting and preparing a microSD card for the NOOBS files.

It's easiest to think that a computer as inexpensive and small as the Raspberry Pi is not all that powerful. We demonstrated that the Raspberry Pi is indeed a very capable computer, as we took a look at some of the applications that come pre-installed with the Raspbian OS.

In Chapter 11, Writing Python Programs Using Raspberry Pi, we will begin Python coding using the Raspberry Pi and some of the development tools available in Raspbian.





Writing Python Programs Using Raspberry Pi





In this chapter, we will start writing python programs with Raspberry Pi. Python is the official programming language for Raspberry Pi and is represented by the Pi in the name.

The following topics will be covered in this chapter:





Python tools for Raspberry Pi

Using the Python command line

Writing a simple Python program



Python comes pre-installed on Raspbian in two versions, versions 2.7.14 and 3.6.5 (as of this writing) representing Python 2 and Python 3, respectively. The differences between the two versions are beyond the scope of this book. We will use Python 3 in this book unless otherwise stated.





Project overview





In this project, we will become comfortable with Python development on Raspberry Pi. You may be used to development tools or Integrated Development Environments (IDEs) on other systems such as Windows, macOS, and Linux. In this chapter, we will get our feet wet in terms of using Raspberry Pi as a development machine. We will start off slowly with Python as we get our development juices flowing.





Technical requirements


The following is required to complete this project:

Raspberry Pi Model 3 (2015 model or newer)

USB power supply

Computer monitor

USB keyboard

USB mouse





Python tools for Raspberry Pi


The following are pre-installed tools that we may use for Python development on Raspberry Pi using Raspbian. This list is by no means the only tools that we may use for development.





The Terminal


As Python comes pre-installed with Raspbian, an easy way to launch it is to use the Terminal. As we can see in the following screenshot, the Python interpreter can be accessed by simply typing python as the command prompt in a Terminal window:

We may test it out by running the simplest of programs: print 'hello'

Notice the Python version in the line after the command, 2.7.13. The python command in Raspbian is tied to Python 2. In order to access Python 3, we must type the python3 command in a Terminal window:





Integrated Development and Learning Environment


The Integrated Development and Learning Environment (IDLE) has been the default IDE for Python since version 1.5.2. It is written in Python itself using the Tkinter GUI toolkit and is intended to be a simple IDE for beginners:

IDLE features a multi-window text editor with auto-completion, syntax highlighting, and smart indent. IDLE should be familiar to anyone that has used Python. There are two versions of IDLE in Raspbian, one for Python 2 and the other for Python 3. Both programs are accessed from Application Menu | Programming.





Thonny


Thonny is an IDE that comes packaged with Raspbian. With Thonny, we may evaluate expressions by using the debug function. Thonny is also available for macOS and Windows.

To load Thonny, go to Application Menu | Programming | Thonny:

Above is the default screen for Thonny. Panels to view variables in your program, as well as a panel to view the filesystem, are toggled on and off from the View menu. Thonny's compact structure makes it ideal for our projects.

We will be learning a bit more about Thonny as we go through the rest of this book.





Using the Python command line


Let's start doing some coding. Whenever I start using a new operating system for development, I like to go through some basics just to get my mind back into it (I'm speaking particularly to those of us who are all too familiar with coding into the wee hours of the morning).

The simplest way to access Python is from the Terminal. We will run a simple program to get started. Load the Terminal from the main toolbar and type python3 at the prompt. Type the following line and hit Enter:

from datetime import datetime

This line loads the datetime object from the datetime module into our instance of Python. Next type the following and hit Enter:

print(datetime.now())

You should see the current date and time printed to the screen:



Let's try another example. Type the following into the shell:

import pyjokes



This is a library that's used to tell programming jokes. To have a joke printed out, type the following and hit Enter:

pyjokes.get_joke()

You should see the following output:



OK, so this may not be your cup of tea (or coffee, for the Java programmers out there). However, this example demonstrates how easy it is to import a Python module and utilize it.

If you receive an ImportError, it is because pyjokes did not come pre-installed with your version of the OS. Similar to the following example, typing sudo pip3 install pyjokes will install pyjokes onto your Raspberry Pi.

What these Python modules have in common is their availability for our use. We simply need to import them directly into the shell in order to use them, as they are pre-installed with our Raspbian operating system. However, what about libraries that are not installed?

Let's try an example. In the Python shell, type the following and hit Enter:

import weather

You should see the following:



Since the weather package is not installed on our Raspberry Pi we get an error when trying to import. In order to install the package, we use the Python command-line utility pip, or in our case, pip3 for Python 3:

Open up a new Terminal (make sure that you're in a Terminal session and not a Python shell). Type the following:



pip3 install weather-api

Hit Enter. You will see the following:





After the process is finished, we will have the weather-api package installed on our Raspberry Pi. This package will allow us to access weather information from Yahoo! Weather.



Now let's try out a few examples:

Type python3 and hit Enter. You should now be back in the Python shell.

Type the following and hit Enter:



from weather import Weather

from weather import Unit

What we have done is imported Weather and Unit from weather. Type the following and hit Enter:



weather = Weather(unit=Unit.CELSIUS)

This instantiates a weather object called weather. Now, let's make use of this object. Type the following and hit Enter:



lookup = weather.lookup(4118)

We now have a variable named lookup that's been created with the code 4118, that corresponds to the city Toronto, Canada. Type the following and hit Enter:



condition = lookup.condition

We now have a variable called condition that contains the current weather information for the city of Toronto, Canada via the lookup variable. To view this information, type the following and hit Enter:



print(condition.text)

You should get a description of the weather conditions in Toronto, Canada. When I ran it, the following was returned:



Partly Cloudy

Now that we've seen that writing Python code on the Raspberry Pi is just as easy as writing it on other operating systems, let's take it a step further and write a simple program. We will use Thonny for this.

A Python module is a single Python file containing code that may be imported for use. A Python package is a collection of Python modules.





Writing a simple Python program





We will write a simple Python program that contains a class. To facilitate this, we will use Thonny, a Python IDE that comes pre-installed with Raspbian and has excellent debug and variable introspection functionalities. You will find that its ease of use makes it ideal for the development of our projects.





Creating the class





We will begin our program by creating a class. A class may be seen as a template for creating objects. A class contains methods and variables. To create a class in Python with Thonny, do the following:





Load Thonny through Application Menu | Programming | Thonny. Select New from the top left and type the following code:



class CurrentWeather:

weather_data={'Toronto':['13','partly sunny','8 km/h NW'],

'Montreal':['16','mostly sunny','22 km/h W'],

'Vancouver':['18','thunder showers','10 km/h NE'],

'New York':['17','mostly cloudy','5 km/h SE'],

'Los Angeles':['28','sunny','4 km/h SW'],

'London':['12','mostly cloudy','8 km/h NW'],

'Mumbai':['33','humid and foggy','2 km/h S']

}



def __init__(self, city):

self.city = city



def getTemperature(self):

return self.weather_data[self.city][0]



def getWeatherConditions(self):

return self.weather_data[self.city][1]



def getWindSpeed(self):

return self.weather_data[self.city][2]

As you can see, we've created a class called CurrentWeather that will hold weather conditions for whichever city we instantiated the class for. We are using a class as it will allow us to keep our code clean and prepare us for using outside classes later on.





Creating the object


We will now create an object from our CurrentWeather class. We will use London as our city:

Click on the Run Current Script button (a green circle with a white arrow) in the top menu to load our code into the Python interpreter.

At the command line of the Thonny shell, type the following and hit Enter:



londonWeather = CurrentWeather('London')

We have just created an object in our code called londonWeather from our CurrentWeather class. By passing 'London' to the constructor (init), we set our new object to only send weather information for the city of London. This is done through the class attribute city (self.city).

Type the following at the shell command line:



weatherLondon.getTemperature()

You should get the answer '12' on the next line.

To view the weather conditions for London, type the following:



weatherLondon.getWeatherConditions()

You should see 'mostly cloudy' on the next line.

To get the wind speed, type the following and hit Enter:



weatherLondon.getWindSpeed()

You should get 8 km/h NW on the next line.

Our CurrentWeather class simulates data coming from a web service for weather data. The actual data in our class is stored in the weather_data variable.

In future code, whenever possible, we will wrap calls to web services in classes in order to keep things organized and make the code more readable.





Using the object inspector





Let's do a little analysis of our code:





From the View menu, select Object inspector and Variables. You should see the following:





Highlight the londonWeather variable under the Variables tab. We can see that londonWeather is an object of type CurrentWeather. In the Object inspector, we can also see that the attribute city is set to 'London'. This type of variable inspection is invaluable in troubleshooting code.





Testing your class





It is very important to test your code as you write it so that you can catch errors early on:





Add the following function to the CurrentWeather class:



def getCity(self):

return self.city

Add the following to the bottom of CurrentWeather.py. The first line should have the same indentation as the class definition as this function is not part of the class:



if __name__ == "__main__":

currentWeather = CurrentWeather('Toronto')

wind_dir_str_len = 2



if currentWeather.getWindSpeed()[-2:-1] == ' ':

wind_dir_str_len = 1



print("The current temperature in",

currentWeather.getCity(),"is",

currentWeather.getTemperature(),

"degrees Celsius,",

"the weather conditions are",

currentWeather.getWeatherConditions(),

"and the wind is coming out of the",

currentWeather.getWindSpeed()[-(wind_dir_str_len):],

"direction with a speed of",

currentWeather.getWindSpeed()

[0:len(currentWeather.getWindSpeed())

-(wind_dir_str_len)]

)

Run the code by clicking on the Run current script button. You should see the following:



The current temperature in Toronto is 13 degrees Celsius, the weather conditions are partly sunny and the wind is coming out of the NW direction with a speed of 8 km/h

The if __name__ == "__main__": function allows us to test the class in the file directly as the if statement will only be true if the file is run directly. In other words, imports of CurrentWeather.py will not execute the code following the if statement. We will explore this method more as we work our way through this book.





Making the code flexible


Code that is more generic is more flexible. The following are two examples of how we can make the code less specific.





wind_dir_str_len = 2<br/>if currentWeather.getWindSpeed()[-2:-1] == ' ':<br/> wind_dir_str_len = 1

By looking for a space using [-2:-1], we can determine the length of this string and change it to 1 if there is a space (as we are parsing back two characters from the end of the string).





Example two


By adding the getCity method to our class, we are able to create classes with more generic names like currentWeather as opposed to torontoWeather. This makes it easy to reuse our code. We can demonstrate this by changing the following line: currentWeather = CurrentWeather('Toronto')

We will change it to this:

currentWeather = CurrentWeather('Mumbai')

If we run the code again by clicking on the Run button, we get different values for all the conditions in the sentence: The current temperature in Mumbai is 33 degrees Celsius, the weather conditions are humid and foggy and the wind is coming out of the S direction with a speed of 2 km/h





Summary


We began this chapter by discussing the various tools that are available for Python development in Raspbian. The quickest and easiest way to run Python is from the Terminal window. Since Python comes pre-installed in Raspbian, the python command in the Terminal prompt loads Python (Python 2, in this case). There is no need to set environment variables in order to have the command find the program. Python 3 is run from the Terminal by typing python3.

We also took a brief look at IDLE, the default IDE for Python development. IDLE stands for Integrated Development and Learning Environment and is an excellent tool for beginners to use when learning Python.

Thonny is another Python IDE that comes pre-installed with Raspbian. Thonny has excellent debug and variable introspection functionalities. It too is designed for beginning Python developers, however, its ease of use and object inspector make it ideal for the development of our projects. We will be using Thonny more as we progress through the book.

We then jumped right into programming in order to get our development juices flowing. We started out with simple expressions using the Terminal and concluded with a weather data example designed to emulate objects that are used to call web services.

In Chapter 12, Using the GPIO to Connect to the Outside World, we will jump right into the most powerful feature of programming on Raspberry Pi, the GPIO. The GPIO allows us to interact with the real world through the use of devices connected to this port on Raspberry Pi. GPIO programming will take our Python skills to a whole new level.





Using the GPIO to Connect to the Outside World





In this chapter we will start unlocking the real power behind the Raspberry Pi—the GPIO, or General Purpose Input Output. The GPIO allows you to connect your Raspberry Pi to the outside world through the use of pins that may be set to input or output, and are controlled through code.

The following topics will be covered in this chapter:





Python libraries for the Raspberry Pi

Accessing Raspberry Pi’s GPIO

Setting up the circuit

Hello LED





Project overview





In this chapter, we start by exploring Raspberry Pi-specific libraries for Python. We will demonstrate these with a few examples by using the Raspberry Pi camera module and Pibrella HAT. We will try a few coding examples with the Sense Hat emulator before moving on to designing a physical circuit using the Fritzing program. Using a breadboard, we will set up this circuit and connect it to our Raspberry Pi.

We will finish off this chapter by building a Morse code generator that transmits weather data in Morse code from the class we created in Chapter 11, Writing Python Programs Using Raspberry Pi. This chapter should take an afternoon to complete.





Technical requirements





The following is required to complete this project:





A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

Computer monitor

A USB keyboard

A USB mouse

A Raspberry Pi camera module (optional)—https://www.raspberrypi.org/products/camera-module-v2/

A Pribrella HAT (optional)—www.pibrella.com

A Sense HAT (optional, as we will be using the emulator in this chapter)—https://www.raspberrypi.org/products/sense-hat/a

A breadboard

Male-to-female jumper wires

An LED





Python libraries for the Raspberry Pi


We will turn our attention to the Python libraries or packages that come pre-installed with Raspbian. To view these packages from Thonny, click on Tools | Manage Packages. After a short delay, you should see many packages listed in the dialog:

Let's explore a few of these packages.





picamera


The camera port, or CSI, on the Raspberry Pi allows you to connect the specially designed Raspberry Pi camera module to your Pi. This camera can take both photos and videos, and has functionality to do time-lapse photography and slow-motion video recording. The picamera package gives us access to the camera through Python. The following is a picture of a Raspberry Pi camera module connected to a Raspberry Pi 3 Model B through the camera port:



Connect your Raspberry Pi camera module to your Pi, open up Thonny, and type in the following code:

import picamera

import time



picam = picamera.PiCamera()

picam.start_preview()

time.sleep(10)

picam.stop_preview()

picam.close()

This code imports the picamera and time packages, and then creates a picamera object called picam. From there, we start the preview and then sleep for 10 seconds, before stopping the preview and then closing the camera. After running the program, you should see a 10 second preview from the camera on your screen.





from PIL import Image<br/><br/>img = Image.open('image.png')<br/>print(img.format, img.size)

You should see the format and size of the image (in brackets) printed at the commandline that follows.





sense-hat and sense-emu


The Sense HAT is a sophisticated add-on board for the Raspberry Pi. The Sense HAT is the main component in the Astro Pi kit, part of a program to have young students program a Raspberry Pi for the International Space Station.

The Astro Pi competition was officially opened in January of 2015 to all primary and secondary school-aged children in the United Kingdom. During a mission to the International Space Station, British astronaut Tim Peake deployed Astro Pi computers on board the station.

The winning Astro Pi competition code was loaded onto an Astro Pi while in orbit. The data generated was collected and sent back to Earth.



The Sense HAT contains an array of LEDs that can be used as a display. The Sense HAT also has the following sensors onboard:

Accelerometer

Temperature sensor

Magnetometer

Barometric pressure sensor

Humidity sensor

Gyroscope



We can access the sensors and LEDs on the Sense HAT through the sense-hat package. For those that do not have a Sense HAT, the Sense HAT emulator in Raspbian may be used instead. We use the sense-emu package to access the emulated sensors and LED display on the Sense HAT emulator.

To demonstrate this, perform the following steps:

Create a new file in Thonny and name it sense-hat-test.py, or something similar.

Type in the following code:



from sense_emu import SenseHat



sense_emulator = SenseHat()

sense_emulator.show_message('Hello World')

Load the Sense HAT Emulator program from Application Menu | Programming | Sense HAT Emulator.

Arrange your screen so that you can see the LED display of the Sense HAT emulator and the full window of Thonny (see the following screenshot):





Click on the Run current script button.

You should see the Hello World! message scroll across the LED display of the Sense HAT emulator one letter at a time (see the previous screenshot).





Accessing Raspberry Pi's GPIO


Through the GPIO, we are able to connect to the outside world. Here is a diagram of the Raspberry Pi GPIO pins:

The following is an explanation of these pins:

Red pins represent power coming out of the GPIO. The GPIO provides 3.3 Volts and 5 Volts.

Black pins represent pins used for electrical ground. As you can see, there are 8 ground pins on the GPIO.



Blue pins are used for Raspberry Pi Hardware Added on Top (HATs). They allow communication between the Raspberry Pi and the HAT's Electrical Erasable Programmable Read-Only Memory (EEPROM).

Green pins represent the input and output pins that we may program for. Please note that some of the green GPIO pins double up with additional functionality. We will not be covering the additional functionality for this project.



The GPIO is what lies at the heart of the Raspberry Pi. We can connect LEDs, buttons, buzzers, and so on to the Raspberry Pi through the GPIO. We can also access the GPIO through HATs designed for the Raspberry Pi. One of those, called Pibrella, is what we will use next to explore connecting to the GPIO through Python code.

Raspberry Pi 1 Models A and B only have the first 26 pins (as shown by the dotted line). Models since then, including Raspberry Pi 1 Models A+ and B+, Raspberry Pi 2, Raspberry Pi Zero and Zero W, and Raspberry Pi 3 Model B and B+, have 40 GPIO pins.





Pibrella


Pibrella is a relatively inexpensive Raspberry Pi HAT that makes connecting to the GPIO easy. The following are the components on-board of Pibrella:

1 red LED

1 yellow LED

1 green LED

Small speaker

Push button

4 inputs

4 outputs

Micro USB power connector for delivering more power to the outputs



Pibrella was designed for early Raspberry Pi models and thus only has a 26-pin input. It can, however, be connected to later models through the first 26 pins.

To install the Pibrella Hat, line up the pin connectors on the Pibrella with the first 26 pins on the Raspberry Pi, and push down. In the following picture, we are installing Pibrella on a Raspberry Pi 3 Model B:



Pibrella should fit snugly when installed:



The libraries needed to connect to Pibrella do not come pre-installed with Raspbian (as of the time of writing), so we have to install them ourselves. To do that, we will use the pip3 command from the Terminal:

Load the Terminal by clicking on it on the top tool bar (fourth icon from the left). At the Command Prompt, type the following:



sudo pip3 install pibrella

You should see the package load from the Terminal:





With the Pibrella library, there is no need to know the GPIO pin numbers in order to access the GPIO. The functionality is wrapped up in the Pibrella object we import into our code. We will do a short demonstration.

Create a new file in Thonny called pibrella-test.py, or name it something similar. Type in the following code:



import pibrella

import time



pibrella.light.red.on()

time.sleep(5)

pibrella.light.red.off()

pibrella.buzzer.success()

Run the code by clicking on the Run current script button. If you typed everything in correctly, you should see the red light on the Pibrella board turn on for 5 seconds before a short melody is played over the speaker.



Congratulations, you have now crossed the threshold into the world of physical computing.





import RPi.GPIO as GPIO<br/>import time<br/><br/>GPIO.setmode(GPIO.BCM)<br/>GPIO.setup(18, GPIO.OUT)<br/>GPIO.output(18, GPIO.HIGH)<br/>time.sleep(5)<br/>GPIO.output(18, GPIO.LOW)

As you can see, this code seems a little bit confusing. We will step through it:

First, we import the RPi.GPIO and time libraries:



import RPi.GPIO as GPIO

import time

Then, we set the mode to BCM:



GPIO.setmode(GPIO.BCM)

In BCM mode, we access the pin through GPIO numbers (the ones shown in our Raspberry Pi GPIO graphic). The alternative is to access the pins through their physical location (GPIO.BOARD).

To set GPIO pin 18 to an output, we use the following line:



GPIO.setup(18, GPIO.OUT)

We then set GPIO 18 to HIGH for 5 seconds before setting it to LOW:



GPIO.output(18, GPIO.HIGH)

time.sleep(5)

GPIO.output(18, GPIO.LOW)

If we had set up the circuit and run the code, we would see our LED light for 5 seconds before turning off, similar to the Pibrella example.





GPIO zero


An alternative to RPi.GPIO is the GPIO Zero package. As with RPi.GPIO, this package comes pre-installed with Raspbian. The zero in the name refers to zero boilerplate or setup code (code that we are forced to enter every time).

To accomplish the same task of turning an LED on and off for 5 seconds, we use the following code: from gipozero import LED

import time



led = LED(18)

led.on()

time.sleep(5)

led.off()

As with our RPi.GPIO example, this code is for demonstration purposes only as we haven't set up a circuit yet. It's obvious that the GPIO Zero code is far simpler than the RPi.GPIO example. This code is pretty self-explanatory.

In the following sections, we will start building a physical circuit on a breadboard with an LED, and use our code to turn it on and off.





Setting up the circuit





The Pibrella HAT gave us a simple way of programming the GPIO, however, the ultimate goal of Raspberry Pi projects is to create a customized working circuit. We will now take the steps to design our circuit, and then create the circuit using a breadboard.

The first step is to design our circuit on the computer.





Fritzing





Fritzing is a free circuit design software available for Windows, macOS, and Linux. There is a version in the Raspberry Pi store that we will install on our Raspberry Pi:





From the Application Menu, choose Preferences | Add / Remove Software. In the Search box, type in Fritzing:





Select all three boxes and click on Apply, and then OK. After installation, you should be able to load Fritzing from Application Menu | Programming | Fritzing.

Click on the Breadboard tab to access the breadboard design screen. A full size breadboard dominates the middle of the screen. We will make it smaller as our circuit is small and simple.



Click on the breadboard. In the Inspector box, you will see a heading called Properties.

Click on the Size dropdown and select Mini.

To add a Raspberry Pi to our circuit, type in Raspberry Pi in the search box. Drag a Raspberry Pi 3 under our breadboard.

From here, we may drag and drop components onto our breadboard.

Add an LED and 330 Ohm resistor to our breadboard, shown in the following diagram. We use the resistor to protect both the LED and Raspberry Pi from excessive currents that may cause damage:





You will notice that as we hover our mouse over each pin on our Raspberry Pi component, a yellow tip will pop up with the pin's BCM name. Click on GPIO 18 and drag a line over to the positive leg of our LED (the longer one).

Do the same to drag a GND connection to the left-hand side of the resistor.



This is the circuit we will build for our Raspberry Pi.





Building our circuit


To build our physical circuit, start by inserting components into our breadboard. Referring to our diagram from before, we can see that some of the holes are green. This indicates continuity in the circuit. For example, we connect the negative leg of the LED to the 330 Ohm resistor through the same vertical column. Thus, the two component legs are connected together through the breadboard.

We take this into account as we start to place our components on the breadboard:

Insert the LED into our breadboard, as shown in the preceding picture. We are following our Fritzing diagram and have the positive leg in the lower hole.

Follow our Fritzing diagram and wire up the 330 Ohm resistor. Using female-to-male jumper wires, connect the Raspberry Pi to our breadboard.

Refer to our Raspberry Pi GPIO diagram to find GPIO 18 and GND on the Raspberry Pi board.



It is a good practice to have the Raspberry Pi powered off when connecting jumpers to the GPIO.

As you can see in the following image, the complete circuit resembles our Fritzing diagram (only our breadboard and Raspberry Pi are turned sideways):

Connect the Raspberry Pi back up to the monitor, power supply, keyboard, and mouse.



We are now ready to program our first real GPIO circuit.





Hello LED


We will jump right into the code:

Create a new file in Thonny, and call it Hello LED.py or something similar.

Type in the following code and run it:



from gpiozero import LED



led = LED(18)

led.blink(1,1,10)





Blink LED using gpiozero


If we wired up our circuit and typed in our code correctly, we should see our LED blink for 10 seconds in 1 second intervals. The blink function in the gpiozero LED object allows us to set on_time (the length of time in seconds that the LED stays on), off_time (the length of time in seconds that the LED is turned off for), n or the number of times the LED blinks, and background (set to True to allow other code to run while the LED is flashing).

The blink function call with its default parameters looks like this:

blink(on_time=1, off_time=1, n=none, background=True)

Without parameters passed into the function, the LED will blink non-stop at 1 second intervals. Notice how we do not need to import the time library like we did when we used the RPi.GPIO package for accessing the GPIO. We simply pass a number into the blink function to represent the time in seconds we want the LED on or off.





Morse code weather data


In Chapter 2, Writing Python Programs Using Raspberry Pi, we wrote code that simulates calls to a web service that supplies weather information. Taking what we learned in this chapter, let's revisit that code and give it a physical computing upgrade. We will use our LED to flash a Morse code representation of our weather data.

Many of us believe that the world only started to become connected in the 1990s with the World Wide Web. Little do we realize that we already had such a world beginning in the 19th century with the introduction of the telegraph and trans-world telegraph cables. The language of this so-called Victorian Internet was Morse code, with the Morse code operator as its gate keeper.

The following are the steps for flashing Morse code representation of our weather data:

We will first start by creating a MorseCodeGenerator class:



from gpiozero import LED

from time import sleep



class MorseCodeGenerator:



led = LED(18)

dot_duration = 0.3

dash_duration = dot_duration * 3

word_spacing_duration = dot_duration * 7



MORSE_CODE = {

'A': '.-', 'B': '-...', 'C': '-.-.',

'D': '-..', 'E': '.', 'F': '..-.',

'G': '--.', 'H': '....', 'I': '..',

'J': '.---', 'K': '-.-', 'L': '.-..',

'M': '--', 'N': '-.', 'O': '---',

'P': '.--.', 'Q': '--.-', 'R': '.-.',

'S': '...', 'T': '-', 'U': '..-',

'V': '...-', 'W': '.--', 'X': '-..-',

'Y': '-.--', 'Z': '--..', '0': '-----',

'1': '.----', '2': '..---', '3': '...--',

'4': '....-', '5': '.....', '6': '-....',

'7': '--...', '8': '---..', '9': '----.',

' ': ' '

}



def transmit_message(self, message):

for letter in message:

morse_code_letter = self.MORSE_CODE[letter.upper()]



for dash_dot in morse_code_letter:



if dash_dot == '.':

self.dot()



elif dash_dot == '-':

self.dash()



elif dash_dot == ' ':

self.word_spacing()



self.letter_spacing()



def dot(self):

self.led.blink(self.dot_duration,self.dot_duration,1,False)



def dash(self):

self.led.blink(self.dash_duration,self.dot_duration,1,False)



def letter_spacing(self):

sleep(self.dot_duration)



def word_spacing(self):

sleep(self.word_spacing_duration-self.dot_duration)



if __name__ == "__main__":



morse_code_generator = MorseCodeGenerator()

morse_code_generator.transmit_message('SOS')

After importing the gpiozero and time libraries into our MorseCodeGenerator class, we define GPIO 18 as our LED with the line led=LED(18)

We set the duration of how long a dot lasts with the line dot_duration = 0.3

We then define the duration of the dash and spacing between words based on the dot_duration

To speed up or slow down our Morse code transmutation, we may adjust dot_duration accordingly

We use a Python dictionary with the name MORSE_CODE. We use this dictionary to translate letters to Morse code

Our transmit_message function steps through each letter of the message, and then each character in the Morse code, which is equivalent to using the dash_dot variable

The magic of our class happens in the dot and dash methods by using the blink function from the gpiozero library:



def dot(self):

self.led.blink(self.dot_duration, self.dot_duration,1,False)

In the dot method, we can see that we turn the LED on for the duration set in dot_duration, and then we turn it off for the same amount of time. We only blink it once as set it by the number 1 in the blink method call. We also set the background parameter to False.

This last parameter is very important, as if we leave it to the default of True, the code will continue to run before the LED has a chance to blink on and off. Basically, the code won't work unless the background parameter is set to False.

We forgo the usual Hello World for our test message and instead use the standard SOS, which is familiar to the most casual of Morse code enthusiasts. We may test our class by clicking on the Run button and, if all is set up correctly, we will see the LED blink SOS in Morse code.

Now, let's revisit our CurrentWeather class from Chapter 2, Writing Python Programs Using Raspberry Pi. We will make a few minor modifications:

from MorseCodeGenerator import MorseCodeGenerator



class CurrentWeather:



weather_data={

'Toronto':['13','partly sunny','8 NW'],

'Montreal':['16','mostly sunny','22 W'],

'Vancouver':['18','thunder showers','10 NE'],

'New York':['17','mostly cloudy','5 SE'],

'Los Angeles':['28','sunny','4 SW'],

'London':['12','mostly cloudy','8 NW'],

'Mumbai':['33','humid and foggy','2 S']

}



def __init__(self, city):

self.city = city



def getTemperature(self):

return self.weather_data[self.city][0]



def getWeatherConditions(self):

return self.weather_data[self.city][1]



def getWindSpeed(self):

return self.weather_data[self.city][2]



def getCity(self):

return self.city





if __name__ == "__main__":



current_weather = CurrentWeather('Toronto')

morse_code_generator = MorseCodeGenerator()

morse_code_generator.transmit_message(current_weather.

getWeatherConditions())



We start by importing our MorseCodeGenerator class (make sure that both files are in the same directory). As we do not have a Morse code equivalent of /, we take out the km/h in the weather_data data set. The rest of the class remains the same as it did in Chapter 2, Writing Python Programs Using Raspberry Pi. In our test section, we instantiate both a CurrentWeather class and a MorseCodeGenerator class. Using the CurrentWeather class, we pass the weather conditions for Toronto into the MorseCodeGenerator class.

If there aren't any mistakes made in entering the code, we should see our LED blink partly sunny in Morse code.





Summary


A lot was covered in this chapter. By the end of it, you should be feeling pretty good about developing applications on the Raspberry Pi.

The picamera, Pillow, and sense-hat libraries make it easy to communicate with the outside world with your Raspberry Pi. Using the Raspberry Pi camera module and picamera, we open up a whole new world of possibilities with our Pi. We only touched on a small part of what picamera can do. Additionally, we only scratched the surface of image processing with the Pillow library. The Sense HAT emulator allowed us to save spending money on buying the actual HAT and test out our code. With sense-hat and the Raspberry Pi Sense HAT, we truly expand our reach into the physical world.

The inexpensive Pibrella HAT provided an easy way to jump into the physical computing world. By installing the pibrella library, we are giving our Python code access to an assortment of LEDs, a speaker, and a button, all neatly packaged into a Raspberry Pi HAT.

However, the true ultimate goal with physical computing is to build electronic circuits that bridge the gap between our Raspberry Pi and the outside world. We started our journey of building electronic circuits with the Fritzing circuit builder, available from the Raspberry Pi store. From there, we built our first circuit on a breadboard with an LED and resistor.

We concluded this chapter by creating a Morse code generator with our Raspberry Pi and LED circuit. In a twist of old meets new, we were able to transmit weather data in Morse code via a blinking LED.

In Chapter 4, Subscribing to Web Services, we will incorporate web services into our code, thereby connecting the internet world with the real world in a concept called the Internet of Things.





Subscribing to Web Services





Many of us take the technologies that the internet is built on top of for granted. When we visit our favorite websites, we care little that the web pages we are viewing are crafted for our eyes. However, lying underneath is the internet protocol suite of communication protocols. Machines can also take advantage of these protocols and communicate machine to machine through web services.

In this chapter, we will continue our journey toward connecting devices through the Internet of Things (IoT). We will explore web services and the various technologies behind them. We will conclude our chapter with some Python code where we call a live weather service and extract information in real time.

The following topics will be covered in this chapter:





Cloud services for IoT

Writing a Python program to extract live weather data





Prerequisites


The reader should have a working knowledge of the Python programming language to complete this chapter as well as an understanding of basic object-oriented programming. This will serve the reader well, as we will be separating our code into objects.





Project overview





In this project, we will explore the various web services that are available and touch on their core strengths. We will then write code that calls the Yahoo! Weather web service. We will conclude by having a "ticker" display of real-time weather data using the Raspberry Pi Sense HAT emulator.

This chapter should take a morning or afternoon to complete.





Getting started


To complete this project, the following will be required:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor (with HDMI support)

A USB keyboard

A USB mouse

Internet access





Cloud services for IoT


There are many cloud services that we may use for IoT development. Some of the biggest companies in technology have thrown their weight behind IoT and in particular IoT with artificial intelligence.

The following are the details of some of these services.





Amazon Web Services IoT


The Amazon Web Services IoT is a cloud platform that allows connected devices to securely interact with other devices or cloud applications. These are offered as pay-as-you-go services without the need for a server, thereby simplifying deployment and scalability.

Amazon Web Services (AWS) services that may be used by the AWS IoT Core are as follows:

AWS Lambda

Amazon Kinesis

Amazon S3

Amazon Machine Learning

Amazon DynamoDB

Amazon CloudWatch

AWS CloudTrail

Amazon Elasticsearch Service



AWS IoT Core applications allow for the gathering, processing, and analysis of data generated by connected devices without the need to manage infrastructure. Pricing is per messages sent and received.

The following is a diagram of how AWS IoT may be used. In this scenario, road conditions data from a car is sent to the cloud and stored within an S3 Cloud Storage service. The AWS service broadcasts this data to other cars, warning them of potential hazardous road conditions:





IBM Watson platform


IBM Watson is a system capable of answering questions posted in natural language. Originally designed to compete on the TV game show Jeopardy!, Watson was named after IBM's first CEO, Thomas J. Watson. In 2011, Watson took on Jeopardy! champions Brad Rutter and Ken Jennings and won.

Applications using the IBM Watson Developer Cloud may be created with API calls. The potential for processing IoT information with Watson is immense.

To put it bluntly, Watson is a supercomputer from IBM that may be accessed over the web through API calls.

One such use of Watson with IoT is the IBM Watson Assistant for Automotive, an integrated solution provided to manufacturers for use in cars. Through this technology, the driver and passengers may interact with the outside world for such things as booking reservations at restaurants and checking on appointments in their calendars. Sensors in the car may be integrated, providing IBM Watson Assistant with information on the state of the car such as tire pressure. The following is a diagram illustrating a scenario where Watson warns the driver of low tire pressure, suggests having it fixed, and then books an appointment at the garage:

IBM Watson Assistant for Automotive is sold as a white-label service so that manufacturers may label it to suit their needs. The success of IBM Watson Assistant for Automotive will depend on how well it competes with other AI assistant services such as Amazon's Alexa and Google's AI assistant. Integration with popular services such as Spotify for music and Amazon for shopping will also play a role in future success.





Google Cloud platform


Although not as extensive and well-documented as AWS IoT, Google is taking on IoT with a lot of interest. A developer may take advantage of Google's processing, analytics, and machine intelligence technologies through the use of Google Cloud Services.

The following is a list of some of the services offered through Google Cloud Services:

App engine: Application hosting service

BigQuery: Large-scale database analytics service

Bigtable: Scalable database service

Cloud AutoML: Machine learning services that allow developers access to Google's Neural Architecture Search technology

Cloud machine learning engine: Machine learning service for TensorFlow models

Google video intelligence: Service to analyze videos and create metadata

Cloud Vision API: Service to return data on images through the use of machine learning



The following is a diagram of how the Google Cloud Vision API may be used. An image of a dog standing next to an upside-down flowerpot is passed to the service through the API. The image is scanned and, using machine learning, objects are identified in the photo. The returning JSON file contains the results in percentages:



Google's focus on keeping things easy and fast gives developers access to Google's own private global network. Pricing for the Google Cloud Platform is lower than AWS IoT.





Microsoft Azure


Microsoft Azure (known formerly as Windows Azure) is a cloud-based service from Microsoft that allows developers to build, test, deploy, and manage applications using Microsoft's vast array of data centers. It supports many different programming languages, which are both Microsoft-specific and from outside third parties.

Azure Sphere, part of the Microsoft Azure framework, was launched in April of 2018 and is Azure's IoT solution. The following is a scenario where Azure Sphere (or Azure IoT, as shown in the diagram) may be used. In this scenario, a robot arm located in a remote factory is monitored and controlled by a cellphone app somewhere else:



You may have noticed that the previous examples could be set up with any of the competing cloud services, and that really is the point. By competing with each other, the services become better and cheaper, and as a result, more accessible.

With these large companies such as IBM, Amazon, Google, and Microsoft taking on the processing of IoT data, the future of IoT is boundless.





Weather Underground





Although not heavyweight like the Googles and IBMs of the world, Weather Underground offers a web service of weather information that developers may tie their applications into. Through the use of a developer account, IoT applications utilizing current weather conditions may be built.

At the time of writing this chapter, the Weather Underground network offered APIs for developers to use to access weather information. An end-of-service notice has been posted to the Weather Underground API site since. To keep up to date on the state of this service, visit https://www.wunderground.com/weather/api/.





A basic Python program to pull data from the cloud





In Chapter 11, Writing Python Programs Using Raspberry Pi, we introduced a package called weather-api that allows us to access the Yahoo! Weather web service. In this section, we will wrap up the Weather object from the weather-api package in our own class. We will reuse the name CurrentWeather for our class. After testing out our CurrentWeather class, we will utilize the Sense Hat Emulator in Raspbian and build a weather information ticker.





Accessing the web service





We will start out by modifying our CurrentWeather class to make web service calls to Yahoo! Weather through the weather-api package:





Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click on the New icon to create a new file.

Type the following:



from weather import Weather, Unit



class CurrentWeather:

temperature = ''

weather_conditions = ''

wind_speed = ''

city = ''



def __init__(self, city):

self.city = city

weather = Weather(unit = Unit.CELSIUS)

lookup = weather.lookup_by_location(self.city)

self.temperature = lookup.condition.temp

self.weather_conditions = lookup.condition.text

self.wind_speed = lookup.wind.speed



def getTemperature(self):

return self.temperature



def getWeatherConditions(self):

return self.weather_conditions



def getWindSpeed(self):

return self.wind_speed



def getCity(self):

return self.city



if __name__=="__main__":

current_weather = CurrentWeather('Montreal')

print("%s %sC %s wind speed %s km/h"

%(current_weather.getCity(),

current_weather.getTemperature(),

current_weather.getWeatherConditions(),

current_weather.getWindSpeed()))

Save the file as CurrentWeather.py.

Run the code.

You should see weather information from the web service printed to the shell in Thonny. When I ran the program, I saw the following:



Toronto 12.0C Clear wind speed 0 km/h

Now, let's take a closer look at the code to see what is going on. We start off by importing the resources from packages we need for our program:



from weather import Weather, Unit

We then define our class name, CurrentWeather, and set the class variables (temperature, weather_conditions, wind_speed, and city) to initial values:



class CurrentWeather:

temperature = ''

weather_conditions = ''

wind_speed = ''

city = ''

In the init method, we set our class variables based on the city that is passed into the method. We do this by instantiating a variable we call weather as a Weather object with the unit set to CELSIUS. The lookup variable is created based on the city name we pass in. From there, it is a simple matter of setting our class variables (temperature, weather_conditions, and wind_speed) from values we extract from lookup. The weather-api does all of the heavy lifting for us as we are able to access values with dot notation. There is no need for us to parse XML or JSON data:



def __init__(self, city):

self.city = city

weather = Weather(unit = Unit.CELSIUS)

lookup = weather.lookup_by_location(self.city)

self.temperature = lookup.condition.temp

self.weather_conditions = lookup.condition.text

self.wind_speed = lookup.wind.speed

With the class variables set in the init method, we use method calls to return these class variables:



def getTemperature(self):

return self.temperature



def getWeatherConditions(self):

return self.weather_conditions



def getWindSpeed(self):

return self.wind_speed



def getCity(self):

return self.city

Since we are running CurrentWeather.py as a program in Thonny, we are able to use the if __name__=="__main__" method and utilize the CurrentWeather class. Note that the if __name__=="__main__" method has the same indentation as the class name. It would not work if it didn't.



With every module in Python, there is an attribute called __name__. If you were to check this attribute for a module you have imported into your program, you would get the name of the module returned. For example, if we were to put the line print(Weather.__name__) in the preceding code, we would get the name Weather returned. Checking for __name__ in a file we are running returns the __main__ value.





In the if __name__=="__main__" method, we create an object called current_weather of type CurrentWeather, passing in the city name Montreal. We then print out the values for city, temperature, weather conditions, and wind speed using the appropriate method calls:



if __name__=="__main__":

current_weather = CurrentWeather('Montreal')

print("%s %sC %s wind speed %s km/h"

%(current_weather.getCity(),

current_weather.getTemperature(),

current_weather.getWeatherConditions(),

current_weather.getWindSpeed()))





Using the Sense HAT Emulator


Now, let's use the Raspberry Pi Sense HAT Emulator to display weather data. We will utilize the CurrentWeather class we just created. To see weather information displayed in the Sense HAT Emulator, do the following:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file



Type the following:



from sense_emu import SenseHat

from CurrentWeather import CurrentWeather



class DisplayWeather:

current_weather = ''



def __init__(self, current_weather):

self.current_weather = current_weather



def display(self):

sense_hat_emulator = SenseHat()



message = ("%s %sC %s wind speed %s km/h"

%(self.current_weather.getCity(),

self.current_weather.getTemperature(),

self.current_weather.getWeatherConditions(),

self.current_weather.getWindSpeed()))



sense_hat_emulator.show_message(message)



if __name__ == "__main__":

current_weather = CurrentWeather('Toronto')

display_weather = DisplayWeather(current_weather)

display_weather.display()

Save the file as DisplayWeather.py

Load the Sense HAT Emulator from Application Menu | Programming | Sense HAT Emulator

Position the Sense HAT Emulator so that you can see the display

Run the code





You should see a ticker of the weather information for Toronto on the Sense HAT Emulator display, similar to the following screenshot:

So, how did we accomplish this? The init and message methods are at the heart of this program. We initialize the DisplayWeather class by setting the class variable current_weather. Once current_weather is set, we extract values from it in the display method in order to build a message we call message. We then create a SenseHat emulator object in the display method as well and call it sense_hat_emulator. We pass in our message to the show_message method of the SenseHat emulator through the line sense_hat_emulator.show_message(message):

def __init__(self, current_weather):

self.current_weather = current_weather



def display(self):

sense_hat_emulator = SenseHat()



message = ("%s %sC %s wind speed %s km/h"

%(self.current_weather.getCity(),

self.current_weather.getTemperature(),

self.current_weather.getWeatherConditions(),

self.current_weather.getWindSpeed()))



sense_hat_emulator.show_message(message)





Summary


We began this chapter by discussing some of the various web services that are available. We discussed the work of some of the biggest companies in information technology in the fields of artificial intelligence and IoT.

Both Amazon and Google are aiming to become the platforms that IoT devices connect with. Using its vast resources, Amazon, through its Amazon Web Services, provides significant documentation and support for its offerings. Not to be outdone, Google is also building a powerful platform for IoT. Which platform wins out remains to be seen.

IBM's foray into artificial intelligence centers on Watson, their Jeopardy! playing champion. Winning game shows against the best human players is of course not the ultimate goal for Watson. However, the knowledge and technology built from such pursuits will find its way into areas we can only imagine today. Watson may prove to be the so-called killer app for the IoT world.

There is probably nothing that people talk about more than the weather. In this chapter, we used the weather-api package to build a weather information ticker by utilizing the Raspberry Pi Sense HAT Emulator that's built into the Raspbian operating system.

In Chapter 14, Controlling a Servo with Python, we will explore other ways to communicate with the outside world by using servo motors to provide an analog display.





Controlling a Servo with Python





Analog meters and instrumentation were the only ways to display data prior to the rise of digital technologies. Once the move was made to digital, analog meters fell out of vogue. Generations that grew up learning to tell the time on an analog clock may suddenly find this skill to be out of date, as digital displays of time have become the norm.

In this chapter, we will bridge the gap between the digital and analog worlds by changing the position of a servo motor based on a digital value.

The following topics will be covered in this chapter:





Wiring up a servo motor to the Raspberry Pi

Controlling the servo through the command line

Writing a Python program to control the servo





Knowledge required to complete this chapter


The reader will need a working knowledge of the Python programming language to complete this chapter. Knowledge of using a simple breadboard to connect components is also a must.





Project overview


In this project, we will wire up a servo motor and LED, and control it using the GPIO Zero library. We will start by designing the circuit in Fritzing, and then we will assemble it.

We will start controlling the servo using Python shell.

Finally, we will expand on this knowledge by creating a Python class that will turn the servo motor based on a percentage amount, and turn on, turn off, or flash the LED based on a number passed to the class.

This project should take about 2 hours to complete.





Getting started


To complete this project, the following will be required:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A small servo motor

A breadboard

A LED (any color)

Jumper wires for the breadboard





Wiring up a servo motor to the Raspberry Pi


This project involves wiring up a servo motor to our Raspberry Pi. Many people confuse servo motors with stepper and DC motors. Let's take a look at the differences between these types of motors.





Stepper motors


Stepper motors are brushless DC electrical motors that move a full rotation of equal steps. The position of the motor is controlled without the use of a feedback system (open-loop system). This makes stepper motors relatively inexpensive and popular for robotics, 3-D printers, and CNC-type applications.

The following is a crude diagram of the internal workings of a stepper motor:



By turning on and off the coils A and B in sequence, the Permanent Magnet (which is attached to the shaft of the motor) is spun. Precise steps are used, allowing precise control of the motor, as the number of steps may be controlled easily.

Stepper motors tend to be heavier and bulkier than other types of small motors.

The following photo shows a typical stepper motor used in a 3-D printer:





DC motors


DC motors are similar to stepper motors, but do not divide motion into equal steps. They were the first widely used electrical motors, and are in use in electric cars, elevators, and any other application that does not require precise control of the position of the motor. DC motors may be brushed or brushless.

Brushed motors are simpler to operate, but have limitations on revolutions per minute (RPM) and usage life. Brushless motors are more complicated, and require electronics for control—for example, the Electronic Speed Controllers (ESCs) used on some drones. Brushless motors may be operated at a much higher RPM, and have a longer usage life than brushed motors.

DC motors have a much shorter response time than stepper motors, and tend to be lighter than comparable stepper motors.

The following is a photo of a typical small brushed DC motor:





Servo motors


Servo motors use a closed-loop feedback mechanism to provide extremely precise control of the position of the motor. They are considered a high-performance alternative to stepper motors. The range can vary depending on the servo, with some servos limited to 180-degree movement while others can move a full 360 degrees.

Closed-loop control systems, unlike open-loop control systems, maintain an output by measuring the actual condition of the output, and comparing it to the desired outcome. Closed-loop control systems are often called feedback control systems, as it is this feedback that is used to adjust the condition.

The angle of a servo is determined by pulses passed to the control pin on the servo. Different brands of servo have different maximum and minimum values to determine the angle of the servo needle.

The following is a diagram to demonstrate the relationship between pulse width modulation (PWM) and the position of a 180-degree servo:



The following is a photo of the small servo motor that we will be using for our circuit. We are able to connect this servo directly to our Raspberry Pi (this may not be possible with larger servos):



The following is a chart of servo color codes:





Connecting the servo motor to our Raspberry Pi


Our circuit will consist of a simple servo and LED.

The following is the Fritzing diagram of the circuit:

We connect:

The positive power of the servo to the 5V DC supply, and the ground to GND

The control signal from the servo to GPIO 17

The positive end of the LED to GPIO 14, and the resistor to GND



Be sure to use a small servo motor, as larger ones may require more power than the Raspberry Pi is able to supply. The circuit should resemble the following:





Control the servo through the command line


Now that our servo is connected to our Raspberry Pi, let's write some code at the command line to control it. We will use the Raspberry Pi Python library GPIO Zero to do this.

Load up Thonny and click on Shell:



Type the following in the shell:

from gpiozero import Servo

After a short delay, the cursor should return. What we have done here is load the servo object from gpiozero into memory. We will assign pin GPIO 17 with the following statement:

servo = Servo(17)

We will now move the servo motor to the minimum (min) position. Type the following into the command line:

servo.min()

You should hear the servo motor moving, and the needle will go to its farthest position (if it is not already there).

Let's move the servo motor to the maximum ( max) position with the following command:

servo.max()

Now, move the servo to the middle ( mid) position with the following command:

servo.mid()

The servo motor should move to its middle position.

When you place your hand over the servo motor, you may feel a slight jerking motion. To temporarily disable control of the servo, type the following into the command line and press Enter:

servo.detach()

The jerking motion should stop, and the needle indicator attached to the servo should stay in its current position.

As we can see, it is very easy to move the servo motor to its minimum, middle, and maximum values. But what if we want to have more precise control of the servo? For those instances, we may use the value property of the servo object. A value between -1 (minimum) and 1 (maximum) can be used to move the servo motor.

Type the following into the command line:

servo.value=-1

The servo should move to its minimum position. Now, type the following:

servo.value=1

The servo should now move to its maximum position. Let's use the value property to indicate weather conditions. Type the following into the command line:

weather_conditions = {'cloudy':-1, 'partly cloudy':-0.5, 'partly sunny': 0.5, 'sunny':1}

Test the code in the shell with the following:

weather_conditions['partly cloudy']

You should see the following in the shell:

-0.5

With our servo object and our weather_conditions dictionary, we may now use the servo motor to indicate the weather conditions physically. Type the following into the shell:

servo.value = weather_conditions['cloudy']

The servo motor should move to the minimum position to indicate that the weather conditions are cloudy. Now, let's try sunny:

servo.value = weather_conditions['sunny']

The servo should move to the maximum position to indicate sunny weather conditions.

For partly cloudy and partly sunny conditions, use the following:

servo.value = weather_conditions['partly cloudy']

servo.value = weather_conditions['partly sunny']





Write a Python program to control the servo


Jerry Seinfeld once joked that all we need to know about the weather is: Should we bring a coat or not? For the rest of this chapter and the next, we will build an analog meter needle dashboard to indicate the wardrobe needed for the weather conditions.

We will also add an LED that will turn on to indicate that an umbrella is needed, and flash to indicate a very bad storm.

Before we can build the dashboard in Chapter 15, Working with the Servo Control Code to Control an Analog Device, we need code to control the servo and LED. We will start by creating a class to do just that.



This class will set the servo position and LED state on our circuit:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following:



from gpiozero import Servo

from gpiozero import LED



class WeatherDashboard:



servo_pin = 17

led_pin = 14



def __init__(self, servo_position=0, led_status=0):

self.servo = Servo(self.servo_pin)

self.led = LED(self.led_pin)

self.move_servo(servo_position)

self.set_led_status(led_status)



def move_servo(self, servo_position=0):

self.servo.value=self.convert_percentage_to_integer

(servo_position)



def set_led_status(self, led_status=0):

if(led_status==0):

self.led.off()

elif (led_status==1):

self.led.on()

else:

self.led.blink()



def convert_percentage_to_integer(self, percentage_amount):

return (percentage_amount*0.02)-1



if __name__=="__main__":

weather_dashboard = WeatherDashboard(50, 1)

Save the file as WeatherDashboard.py

Run the code

You should see the servo move to the middle position, and the LED should turn on



Experiment with other values and see if you can move the servo to 75% and have the LED blink.

Let's take a look at the code. After defining the class, we set GPIO pin values for the servo and LED with the following:

servo_pin = 17

led_pin = 14

As you saw in the circuit we built, we connected the servo and LED to GPIO 17 and GPIO 14, respectively. GPIO Zero allows us to assign GPIO values easily without boilerplate code.





In our class initialization method, we create Servo and LED objects called servo and led respectively:

self.servo = Servo(self.servo_pin)

self.led = LED(self.led_pin)

From here, we call the methods in our class that move the servo and set the LED. Let's look at the first method:

def move_servo(self, servo_position=0):

self.servo.value=self.convert_percentage_to_integer

(servo_position)

In this method, we simply set the value property in servo object. As this property only accepts values from -1 to 1, and we are passing a value from 0 to 100, we need to convert our servo_position. We do that with the following method:

def convert_percentage_to_integer(self, percentage_amount):

return (percentage_amount*0.02)-1

In order to convert a percentage value to a -1 to 1 scale value, we multiply the percentage value by 0.02, and then subtract 1. It's easy to verify this math by using the percentage value of 50. The value of 50 represents the middle value in a 0 to 100 scale. Multiplying 50 by 0.02 produces the value of 1. Subtracting 1 from this value produces 0, which is the middle value in a -1 to 1 scale.

To set the status of the LED (off, on, or blink) we call the following method from our initialization method:

def set_led_status(self, led_status=0):

if(led_status==0):

self.led.off()

elif (led_status==1):

self.led.on()

else:

self.led.blink()

In set_led_status, we set our LED to off if the value passed in is 0, on if the value is 1, and blink if it is any other value.

We test out our class with the following code:

if __name__=="__main__":

weather_dashboard = WeatherDashboard(50, 1)

In Chapter 15, Working with the Servo Control Code to Control an Analog Device, we will use this class to build our analog weather dashboard.





Summary





As we can see, bridging the gap between the digital and analog worlds for data display is relatively easy using the Raspberry Pi. Its GPIO port allows for easy connection to various output devices such as motors and LEDs.

In this chapter, we connected a servo motor and LED, and controlled them using Python code. We will expand on this in Chapter 15, Working with the Servo Control code to Control an Analog Device, as we build an IoT weather dashboard with an analog meter display.





Working with the Servo Control Code to Control an Analog Device


Continuing our journey to combine the elegance of an analog meter with the accuracy of digital data, we will take a look at what we've learned in the previous two chapters and build an IoT weather dashboard with an analog meter display.

Make sure that you have the circuit from Chapter 14, Controlling a Servo with Python, wired up before you start this chapter.

This dashboard will display wardrobe suggestions based on the outside temperature and wind speed. We will also use an LED on our dashboard to indicate whether or not we should take an umbrella with us.

The following topics will be covered in this chapter:

Accessing weather data from the cloud

Controlling the servo using weather data

Enhancing our project





Knowledge required to complete this chapter





You should have a working knowledge of the Python programming language to complete this chapter. Knowledge of using a simple breadboard that you can connect components to is also a must.

A vinyl or craft cutter may be used in this project. Knowledge of how to use a cutter would be an asset so that you can complete this project.





Project overview


By the end of this chapter, we should have a working IoT analog weather dashboard. We will modify the code written in Chapter 13, Subscribing to Web Services, and Chapter 14, Controlling a Servo with Python, to provide data to our dashboard. A backdrop will be printed and cut out. This backdrop will give our dashboard a cartoon-like look.

We will be using the circuit from Chapter 14, Controlling a Servo with Python. The following is the wiring diagram from this circuit:



This project should take an afternoon to complete.





Getting started





To complete this project, the following will be required:





A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A small servo motor

An LED (any color)

A breadboard

Jumper wires for the breadboard

A color printer

A vinyl or craft cutter (optional)





Accessing weather data from the cloud


In Chapter 13, Subscribing to Web Services, we wrote a Python program to access weather data from Yahoo! Weather. The class, CurrentWeather, from that program returned the temperature, weather conditions, and wind speed for the city value that the class was instantiated with.

We will revisit that code and change the class name to WeatherData. We will also add a method to return a value from 0-100 to indicate the weather. We will take the temperature and wind speed into account when determining this number, with 0 being extreme winter-like conditions and 100 being very hot extreme summer conditions. We will use this number to control our servo. We will also check to see whether it is raining and update our LED to indicate whether or not we need an umbrella:

Open up Thonny from Application Menu | Programming | Thonny Python IDE



Click on the New icon to create a new file



Type the following into the file:



from weather import Weather, Unit



class WeatherData:



temperature = 0

weather_conditions = ''

wind_speed = 0

city = ''



def __init__(self, city):

self.city = city

weather = Weather(unit = Unit.CELSIUS)

lookup = weather.lookup_by_location(self.city)

self.temperature = float(lookup.condition.temp)

self.weather_conditions = lookup.condition.text

self.wind_speed = float(lookup.wind.speed)





def getServoValue(self):

temp_factor = (self.temperature*100)/30

wind_factor = (self.wind_speed*100)/20

servo_value = temp_factor-(wind_factor/20)



if(servo_value >= 100):

return 100

elif (servo_value <= 0):

return 0

else:

return servo_value



def getLEDValue(self):

if (self.weather_conditions=='Thunderstorm'):

return 2;

elif(self.weather_conditions=='Raining'):

return 1

else:

return 0



if __name__=="__main__":



weather = WeatherData('Paris')

print(weather.getServoValue())

print(weather.getLEDValue())

Save the file as WeatherData.py





The heart of our code is in the getServoValue() and getLEDValue() methods:

def getServoValue(self):

temp_factor = (self.temperature*100)/30

wind_factor = (self.wind_speed*100)/20

servo_value = temp_factor-(wind_factor/20)



if(servo_value >= 100):

return 100

elif (servo_value <= 0):

return 0

else:

return servo_value

In the getServoValue method, we set the temp_factor and wind_factor variables to a percentage value based on a minimum of 0 for both of them and a maximum of 30 and 20 for the temperature and wind speeds, respectively. These are arbitrary numbers as we will consider 30 degrees Celsius to be our extreme hot temperature and 20 kph winds as our extreme wind speed. The servo value is set by subtracting the wind speed by 5 percent from the temperature (by dividing it by 20). This, of course, is arbitrary as well. Feel free to adjust the percentage as desired.

To explain this further, consider a temperature of 10 degrees Celsius and a wind speed of 5 km/h. The temperature factor (temp_factor) would be 10 multiplied by 100 and then divided by 30 or 33.33. The wind speed factor (wind_factor) would be 5 multiplied by 100 and then divided by 20 or 25. The value we pass to our servo (servo_value) would be the temperature factor (33.33) minus the wind speed factor (25) after it has been divided by 20. The value of servo_value is 32.08 or roughly 32 percent of the maximum servo value.

We then return the value of servo_value and use it to control our servo. Any value below 0 and above 100 will off our scale and will not work with our servo (as we are moving the servo between 0 and 100 percent). We use an if statement in the getServoValue method to correct such conditions.

The getLEDValue method simply checks the weather conditions and returns code based on whether or not it is raining. Thunderstorm will return a value of 2, Rain and Light Rain will return a value of 1, and anything else will return a value of 0. We will use this value to blink the LED in our dashboard if there is a thunderstorm, keep it solid if it is only raining, and turn it off under all other conditions:

def getLEDValue(self):

if (self.weather_conditions=='Thunderstorm'):

return 2;

elif(self.weather_conditions=='Rain'):

return 1

elif(self.weather_conditions=='Light Rain'):

return 1

else:

return 0

At the time of writing this book, Thunderstorm, Rain, and Light Rain were values that were returned during a search of the weather in world cities. Please feel free to update the if statement to include other descriptions of extreme precipitation. As an added enhancement, you may consider using regular expressions in the if statement.

Run the code in Thonny. You should get a value for the servo and LED based on the weather conditions in Paris. I received the following at the time I ran the code:

73.075

0





Controlling the servo using weather data


We are close to building our IoT weather dashboard. The final steps involve controlling our servo position based on the weather data returned from the Yahoo! Weather web service and physically building a backdrop for our servo needle.





Correcting for servo range





As some of you may have noticed, your servo motor does not move a full 180 degrees from minimum to maximum. This is due to the minimum and maximum pulse widths of 1 ms and 2 ms set in GPIO Zero. To account for this difference, we must adjust the min_pulse_width and max_pulse_width properties accordingly when we instantiate a Servo object.

The following code does just that. The variable, servoCorrection, adds to and subtracts from the min_pulse_width and max_pulse_width values. The following code moves the servo to the minimum position and then the maximum position after 5 seconds:





Open up Thonny from Application Menu | Programming | Thonny Python IDE.



Click on the New icon to create a new file.



Type the following into the file:



from gpiozero import Servo

from time import sleep

servoPin=17



servoCorrection=0.5

maxPW=(2.0+servoCorrection)/1000

minPW=(1.0-servoCorrection)/1000



servo=Servo(servoPin, min_pulse_width=minPW, max_pulse_width=maxPW)



servo.min()

sleep(5)

servo.max()

sleep(5)

servo.min()

sleep(5)

servo.max()

sleep(5)

servo.min()

sleep(5)

servo.max()

sleep(5)



servo.close()

Save the file as servo_correction.py.

Run the code to see if the value of servoCorrection fixes the issue with your servo not turning a full 180 degrees from servo.min to servo.max.

Adjust servoCorrection until your servo does move 180 degrees between servo.min and servo.max. We will use the value of servoCorrection in the code for our weather dashboard.





Changing the position of the servo based on weather data


We are now ready to control the position of our servo based on weather conditions. We will modify the WeatherDashboard class we created in Chapter 14, Controlling a servo with Python; to do this, perform the following steps:

Open up Thonny from Application Menu | Programming | Thonny Python IDE



Click on the New icon to create a new file

Type the following into the file:



from gpiozero import Servo

from gpiozero import LED

from time import sleep

from WeatherData import WeatherData



class WeatherDashboard:



servo_pin = 17

led_pin = 14

servoCorrection=0.5

maxPW=(2.0+servoCorrection)/1000

minPW=(1.0-servoCorrection)/1000



def __init__(self, servo_position=0, led_status=0):

self.servo = Servo(self.servo_pin, min_pulse_width=

self.minPW, max_pulse_width=self.maxPW)

self.led = LED(self.led_pin)



self.move_servo(servo_position)

self.set_led_status(led_status)



def move_servo(self, servo_position=0):

self.servo.value = self.convert_percentage_to_integer(

servo_position)



def turnOffServo(self):

sleep(5)

self.servo.close()



def set_led_status(self, led_status=0):

if(led_status==0):

self.led.off()

elif (led_status==1):

self.led.on()

else:

self.led.blink()



def convert_percentage_to_integer(self, percentage_amount):

#adjust for servos that turn counter clockwise by default

adjusted_percentage_amount = 100 - percentage_amount

return (adjusted_percentage_amount*0.02)-1



if __name__=="__main__":

weather_data = WeatherData('Toronto')

weather_dashboard = WeatherDashboard(

weather_data.getServoValue(),

weather_data.getLEDValue())

weather_dashboard.turnOffServo()

Save the file as WeatherDashboard.py

Run the code and observe that the servo position changes



Let's take a look at the code.

We start out by importing the resources we need:

from time import sleep

from WeatherData import WeatherData

We add time to our project as we will be using it as a delay before we close our Servo object. WeatherData is added to provide the values for our servo and LED based on weather conditions.

The servoCorrection, maxPW, and minPW variables adjust our servo (if needed), as explained in our previous servo correction code:

servoCorrection=0.5

maxPW=(2.0+servoCorrection)/1000

minPW=(1.0-servoCorrection)/1000

The turnOffServo method allows us to close the connection to the servo, stopping any jerking motion that may occur:

def turnOffServo(self):

sleep(5)

self.servo.close()

We use the sleep function to delay closing the servo so that it will not be closed prior to being set to its position.

You may have also noticed a change to the convert_percentage_to_integer method from the code in Chapter 14, Controlling a Servo with Python. The motors tested for this project had a minimum position on the right. This is the opposite of what we need, so the code was changed to subtract the percentage_amount from 100 to reverse this behavior and give us the correct servo position (refer to Chapter 14, Controlling a Servo with Python, for more information on this method and use the convert_percentage_to_integer from this chapter if need be):

def convert_percentage_to_integer(self, percentage_amount):

#adjust for servos that turn counter clockwise by default

adjusted_percentage_amount = 100 - percentage_amount

return (adjusted_percentage_amount*0.02)-1

Run the code in Thonny. You should witness the servo motor moving to a position based on the weather conditions in Toronto, Canada. The LED will either blink, stay solid, or turn off based on whether or not it is raining in Toronto at the time you run the code.

Now, let's enhance our project by building a physical backdrop for our servo and LED.





Enhancing our project


With our code out of the way, it's now time to add a physical backdrop to our servo. With this backdrop, we bring the IoT to life for our weather data. Our dashboard will recommend which wardrobe item we should wear based on the weather.





Printing out the main graphic


The following is the graphic we will be using for our backdrop:

Using a color printer, print out the graphic on printable vinyl (this image file is available from our GitHub repository). Cut out the holes under the umbrella and main graphic.

To add support, cut out the back plate on hard card stock with a cutter or by hand with scissors:

Peel the backdrop off of the printable vinyl sheet and stick it to the backplate. Use the holes to align the backdrop with the back plates:





Adding the needle and LED


Insert the LED into the hole under the umbrella:



Insert the hub of the servo motor through the other hole. Use double-sided foam tape to secure the servo to the backplate if necessary:



Wire up the LED and servo to the breadboard using jumper wires (see the wiring diagram at the start of this chapter). The assembly should sit with a slight slant. Before we run the WeatherDashboard code with our new display, we have to install the needle to the minimum position:

Open up Thonny from Application Menu | Programming | Thonny Python IDE



Click on the New icon to create a new file

Type the following into the file:



from gpiozero import Servo

servoPin=17



servoCorrection=<<put in the correction you calculated>>

maxPW=(2.0+servoCorrection)/1000

minPW=(1.0-servoCorrection)/1000



servo=Servo(servoPin, min_pulse_width=minPW, max_pulse_width=maxPW)



servo.min()

Save the file as servo_minimum.py

Run the code to have the servo position itself to the minimum value



Install the needle so that it points to the left if the servo motor turns counter-clockwise to its minimum, and to the right if the servo motor turns clockwise to its minimum (this will make more sense once you start physically working with the servo).

Run the WeatherDashboard code again. The servo should move according to the weather data, indicating a wardrobe option. If it is raining, the LED should light up. A thunderstorm will flash the LED. Otherwise, the LED will stay off.

In the following picture, the dashboard is recommending a short sleeve shirt for Toronto, Canada. An umbrella is not required for the outside weather conditions:



Congratulations! You've just built an IoT weather dashboard.





Summary


In this project, we used the power of the Raspberry Pi to create an IoT analog weather dashboard. In this case, this involved an internet-controlled servo used as an analog meter. It's not too hard to imagine how we may alter our code to display data other than weather data. Picture an analog meter displaying the tank level from a distant factory, where the level data is communicated over the internet.

The intuitive nature of analog meters makes them perfect for applications where a glance of the data is all that is required. Combining analog meters with data from the internet creates a whole new world of data display.

In Chapter 16, Setting Up a Raspberry Pi Web Server, we will take a step away from the analog world and explore how we may use the Raspberry Pi as a web server and build a web based dashboard.





Setting Up a Raspberry Pi Web Server





We will begin our journey to create an IoT home security dashboard by learning how to use the CherryPy web server framework. Our chapter will start by introducing CherryPy. We will go through a few examples before we create an HTML weather dashboard using a modified version of our CurrentWeather class from Chapter 13, Subscribing to Web Services.

The following topics will be covered in this chapter:





Introducing CherryPy—a minimalist Python Web framework

Creating a simple web page using CherryPy





Knowledge required to complete this chapter


The reader should have a working knowledge of Python in order to complete this chapter. A basic understanding of HTML, including CSS, is also required to complete the project in this chapter.





Project overview


In this chapter, we will build an HTML weather dashboard using the CherryPy and Bootstrap frameworks. Intimate knowledge of these frameworks is not required to complete the project.

This project should take a couple of hours to complete.





Getting started


To complete this project, the following will be required:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse





Introducing CherryPy – a minimalist Python web framework


For our project, we will use the CherryPy Python library (be aware that it is CherryPy with a "y", not CherryPi with an "i").





What is CherryPy?





According to their website, CherryPy is a Pythonic, object-oriented web framework. CherryPy gives developers the power to build web applications as if they were building any object-oriented Python program. In true Python style, CherryPy programs have less code and are developed in less time than other web frameworks.





Who uses CherryPy?





Some of the companies that use CherryPy include the following:





Netflix: Netflix uses CherryPy in its infrastructure through RESTful API calls. Other Python libraries used by Netflix include Bottle and SciPy.

Hulu: CherryPy is used for some of Hulu's projects.

Indigo Domotics: Indigo Domotics is a home automation company that uses the CherryPy framework.





Installing CherryPy


We will use Python's pip3 package management system to install CherryPy.

A package management system is a program that helps install and configure applications. It can also carry out upgrades and uninstalls.

To do this, open up a Terminal window and type in the following: sudo pip3 install cherrypy

Hit Enter. You should see the following in the Terminal:



In Thonny, go to Tools | Manage Packages. You should see that CherryPy is now installed, as shown here:





Creating a simple web page using CherryPy





To get started, let's build the most basic of programs with CherryPy. By this, I mean, of course, the ubiquitous Hello World program that we will use to say Hello Raspberry Pi!. We will work through a few examples before we build a dashboard to display weather data using a modified version of the CurrentWeather class from Chapter 13, Subscribing to Web Services.





Hello Raspberry Pi!


To build the Hello Raspberry Pi! web page, do the following:

Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click on the New icon to create a new file.



Type the following:



import cherrypy



class HelloWorld():



@cherrypy.expose

def index(self):

return "Hello Raspberry Pi!"



cherrypy.quickstart(HelloWorld())





Ensure that the line, cherrypy.quickstart(HelloWorld()), is inline with the import and class statements.

Save the file as HelloRaspberryPi.py.

Run the file by clicking on the green Run current script button.

You should see the CherryPy web server starting up as indicated in the shell:





From the output to the shell you should be able to observe the ip address and port that CherryPy is running on, http://127.0.0.1:8080. You may recognize the ip address as the loopback address. CherryPy uses the port 8080.

Open a web browser on your Raspberry Pi and type in the address from the previous step:





Congratulations, you have just turned your humble Raspberry Pi into a web server.

If you are like me, you probably didn't think a web server could be created with such little code. CherryPy basically focuses on one task, which is to take in an HTTP request and turn it into a Python method.

So how does it work? The decorator in our HelloWorld class, @cherrypy.expose, exposes the method index that happens to correspond to the root of the web server. When we load our web page using the loopback address (127.0.0.1) and port that CherryPy is running on (8080), the index method is served up as the page. In our code we simply return the string Hello Raspberry Pi! which is then displayed as our web page.

The loopback address is an IP number used as the software loopback interface of a machine. This number is generally 127.0.0.1. This address is not physically connected to a network and is used often to test the installation of a web server installed on the same machine.





Say hello to myFriend


So what happens if we expose another method in our Python code? We can check that easily by using the decorator before a method. Let's write some code to do this:

Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click on the New icon to create a new file.



Type the following:



import cherrypy



class HelloWorld():



@cherrypy.expose

def index(self):

return "Hello Raspberry Pi!"



@cherrypy.expose

def sayHello(self, myFriend=" my friend"):

return "Hello " + myFriend



cherrypy.quickstart(HelloWorld())

Save the file as SayHello.py.

Stop and start the CherryPy server by clicking on the Interrupt/Reset button, and then the Run current script button.

Now, type the following into your browser's address bar and press Enter: http://127.0.0.1:8080/sayHello

You should see the following:





So what did we do differently this time? For starters, we didn't just access the root of our server. We added /sayHello to our URL. Usually, when we do that on a web server, we are directed to a subfolder. In this case, we are taken to the method in our HelloWorld class, called sayHello().

If we look closely at the sayHello() method, we can see that it takes a parameter called myFriend: @cherrypy.expose

def sayHello(self, myFriend=" my friend"):

return "Hello " + myFriend

We can see that the myFriend parameter has a default value of my Friend. So, when we run CherryPy and navigate to the URL at http://127.0.0.1:8080/sayHello, the sayHello method is called and the "Hello " + my friend string is returned.

Now, type the following into the the address box and hit Enter: http://127.0.0.1:8080/sayHello?myFriend=Raspberry%20Pi

In this URL, we set the value of myFriend to Raspberry%20Pi (the %20 is used instead of a space). We should get the same result as our first example.

As we can see, it is very easy to connect Python methods to an HTML output.





What about static pages?





Static pages were at one time ubiquitous with the internet. Simple links between static pages made up what was considered a web site at the time. A lot has changed since then, however, being able to serve up a simple HTML page is still a basic requirement of a web server framework.

So, how would we would do that with CherryPy? It's pretty simple actually. We simply open a static HTML page in a method and return it. Let's have CherryPy serve up a static page by doing the following:





Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click on the New icon to create a new file.

Type the following:



<html>

<body>

This is a static HTML page.

</body>

</html>

Save the file as static.html.

In Thonny click on the New icon to create a new file in the same directory as static.html.

Type the following:



import cherrypy



class StaticPage():



@cherrypy.expose

def index(self):

return open('static.html')



cherrypy.quickstart(StaticPage())

Save the file as StaticPage.py.

If CherryPy is still running stop it by clicking on the red button.

Run the file StaticPage.py to start CherryPy.

You should see CherryPy starting up as indicated in the shell.

To view our new static web page, open up a web browser on the Raspberry Pi and type the following into the address bar: http://127.0.0.1:8080

You should see the static page displayed:





So what did we do here? We changed our index method so that it returned an open static.html file with the line return open ('static.html'). This opened up static.html in our browser as our index (or http://127.0.0.1:8080/index). Note that trying to type in the page name static.html in the url (http://127.0.0.1:8080/static.html) will not work. CherryPy serves up the content based on the method name. In this case the method name is index, which is the default.





HTML weather dashboard


Now it's time to add what we learned from the previous chapters. Let's revisit the CurrentWeather class from Chapter 13, Subscribing to Web Services. We will rename it WeatherData, as this name is more appropriate for this project, and change it a little bit.

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file



Type the following:



from weather import Weather, Unit

import time



class WeatherData:



temperature = 0

weather_conditions = ''

wind_speed = 0

city = ''





def __init__(self, city):

self.city = city

weather = Weather(unit = Unit.CELSIUS)

lookup = weather.lookup_by_location(self.city)

self.temperature = lookup.condition.temp

self.weather_conditions = lookup.condition.text

self.wind_speed = lookup.wind.speed





def getTemperature(self):

return self.temperature + " C"



def getWeatherConditions(self):

return self.weather_conditions



def getWindSpeed(self):

return self.wind_speed + " kph"



def getCity(self):

return self.city



def getTime(self):

return time.ctime()





if __name__ == "__main__":



current_weather = WeatherData('London')

print(current_weather.getTemperature())

print(current_weather.getWeatherConditions())

print(current_weather.getTime())

Save the file as WeatherData.py

Run the code



You should see the weather for London, England printed in the following shell:





Let's take a look at the code. Basically WeatherData.py is exactly the same as CurrentWeather.py from Chapter 13, Subscribing to Web Services, but with an extra method called getTime:

def getTime(self):

return time.ctime()

We use this method to return the time when the call is made to the weather web service for use in our web page.

We will now use CherryPy and the Bootstrap framework to create our dashboard. To do this do the following:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following (pay particular attention to the quotation marks):



import cherrypy

from WeatherData import WeatherData



class WeatherDashboardHTML:



def __init__(self, currentWeather):

self.currentWeather = currentWeather



@cherrypy.expose

def index(self):

return """

<!DOCTYPE html>

<html lang="en">



<head>

<title>Weather Dashboard</title>

<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

<style>

.element-box {

border-radius: 10px;

border: 2px solid #C8C8C8;

padding: 20px;

}



.card {

width: 600px;

}



.col {

margin: 10px;

}

</style>

</head>



<body>

<div class="container">

<br/>

<div class="card">

<div class="card-header">

<h3>Weather Conditions for """ + self.currentWeather.getCity() + """

</h3></div>

<div class="card-body">

<div class="row">

<div class="col element-box">

<h5>Temperature</h5>

<p>""" + self.currentWeather.getTemperature() + """</p>

</div>

<div class="col element-box">

<h5>Conditions</h5>

<p>""" + self.currentWeather.getWeatherConditions() + """</p>

</div>

<div class="col element-box">

<h5>Wind Speed</h5>

<p>""" + self.currentWeather.getWindSpeed() + """</p>

</div>

</div>

</div>

<div class="card-footer"><p>""" + self.currentWeather.getTime() + """</p></div>

</div>

</div>

</body>



</html>

"""



if __name__=="__main__":

currentWeather = WeatherData('Paris')

cherrypy.quickstart(WeatherDashboardHTML(currentWeather))



Save the file as WeatherDashboardHTML.py



This may look like a whole lot of code—and it is. If we break it down, though, it's not really that complicated. Basically, we are using CherryPy to return an HTML string, which will be served up in the root of our URL through the index method.

Before we can do that, we instantiate the WeatherDashboardHTML class by passing in a WeatherData object. We give this WeatherData object the name currentWeather, as shown in the init (class constructor) method:

def __init__(self, currentWeather):

self.currentWeather = currentWeather

CherryPy serves up the index method by printing out an HTML string that is sprinkled with parameters from our currentWeather object. We are using the Bootstrap component library in our HTML code. We add it by incorporating the standard Bootstrap boilerplate code:

<link rel="stylesheet"href="https://maxcdn.bootstrapcdn.com

/bootstrap/4.1.0/css/bootstrap.min.css">



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

We use the Bootstrap card component as our content container. card allows us to create a header, body, and footer:

<div class="card">

<div class="card-header">

.

.

.

The header section of the card component features the name of the city. We use the getCity method from our currentWeather object to get the name of the city:

<div class="card-header">

<h3>Weather Conditions for """ + self.currentWeather.getCity() + """</h3>

</div>

In the body section of the card component, we create a row with three columns. Each column contains a title (<h5>), as well as data pulled from our WeatherData object, called currentWeather. You can see the title, Temperature, with the temperature value pulled from the currentWeather method, getTemperature:

<div class="card-body">

<div class="row">

<div class="col element-box">

<h5>Temperature</h5>

<p>""" + self.currentWeather.getTemperature() + """</p>

.

.

.

For the footer we simply return the instantiation time of the currentWeather object. We will take this time as the time the weather information was checked from our program.

<div class="card-footer">

<p>""" + self.currentWeather.getTime() + """</p>

</div>

Our style section at the top allows us to customize the look of our dashboard. We create a CSS class, called element-box, in order to create a silver (#C8C8C8) rounded corner box around our weather parameters. We also limit the width of the card (and thus the dashboard) to 600px. Lastly, we put a margin of 10px around the columns, so that the rounded boxes do not touch each other:

<style>

.element-box {

border-radius: 10px;

border: 2px solid #C8C8C8;

padding: 20px;

}



.card {

width: 600px;

}



.col {

margin: 10px;

}



</style>

Our main method at the bottom instantiates a WeatherData class as an object, called currentWeather. In our example, we are using data from the city of Paris. Our code then passes the currentWeather object to the cherrypy.quickstart() method, as shown here:

if __name__=="__main__":

currentWeather = WeatherData('Paris')

cherrypy.quickstart(WeatherDashboardHTML(currentWeather))

Stop and start the CherryPy server while on the WeatherDashboardHTML.py file. If you do not have any errors in your code, you should see something similar to the following:





Summary


In this chapter, we turned our Raspberry Pi into a web server using the CherryPy HTTP framework. With its minimalist architecture, CherryPy allows the developer to set up a web-enabled Python program in a very short time.

We started this chapter by installing CherryPy on our Raspberry Pi. After a few simple examples, we built an HTML weather dashboard by modifying and utilizing the web service code that we wrote in Chapter 13, Subscribing to Web Services.

In the coming chapters, we will use the knowledge we gained in this chapter to build an IoT home security dashboard.





Reading Raspberry Pi GPIO Sensor Data Using Python





In Chapter 16, Setting Up a Raspberry Pi Web Server, we used the GPIO Zero library to turn on servos and light up LEDs. In this chapter, we will use GPIO Zero to read inputs from the GPIO port. First, we will start with a simple button, before moving on to Passive Infrared (PIR) motion sensors and buzzers.

Having the ability to read sensory data from the GPIO will allow us to build our IoT home security dashboard. By the end of this chapter, we should become very familiar with programming the Raspberry Pi with components connected to the GPIO.

The following topics will be covered in this chapter:





Reading the state of a button

Reading the state from an infrared motion sensor

Modifying Hello LED using an infrared sensor





Project overview





In this chapter, we will create two different types of alarm system. We will start by learning how to read GPIO sensory data from a push-button. We will then learn how to interact with a PIR sensor and distance sensor. Lastly, we will learn how to hook up an active buzzer.

This chapter should take about 3 hours to complete.





Getting started





To complete this project, the following will be required:





A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A breadboard

Jumper wires

A PIR sensor

A distance sensor

A active buzzer

An LED

A push-button (momentary)

A push-button (latching)

A key switch (optional)





Reading the state of a button





Button, from the GPIO Zero library, gives us an easy way to interact with a typical button connected to the GPIO. We will cover the following in this section:





Using GPIO Zero with a button

Using the Sense HAT emulator and GPIO Zero button together

Toggling an LED with a long button press





Using GPIO Zero with a button


Connecting a push-button is relatively easy with the GPIO. The following is the connection diagram showing the process:

Connect the push-button so that one end is connected to ground using a jumper. Connect the other end to GPIO 4 on the Raspberry Pi.

In Thonny, create a new file and call it button_press.py. Then, type following into the file and run it:

from gpiozero import Button

from time import sleep



button = Button(4)

while True:

if button.is_pressed:

print("The Button on GPIO 4 has been pressed")

sleep(1)

You should now see the message "The Button on GPIO 4 has been pressed" in the shell whenever you push the button. The code will run continuously until you click on the Reset button.

Let's take a look at the code. We start by importing Button from GPIO Zero, and sleep from the time library: from gpiozero import Button

from time import sleep

We then create a new button object and assign it to GPIO pin 4 with the following code:

button = Button(4)

Our continuous loop checks to see whether the button is currently pressed, and prints out a statement to our shell if it is: while True:

if button.is_pressed:

print("The Button on GPIO 4 has been pressed")

sleep(1)





Using the Sense HAT emulator and GPIO Zero button together


We use push-buttons every day, whether that be in selecting a floor in an elevator or starting our car. Modern technology allows us to separate the push-button from the physical device that it controls. In other words, pushing a button can set in motion many different events that really have nothing to do with the button. We can emulate this detachment with our push-button and the Sense HAT emulator.

I can just picture some of you wondering what separating a button from what it is controlling actually means. To help you visualize it, picture a latching push-button that controls a light. When the button is pressed down, the circuit is completed and electricity runs through the leads on the push-button. With the use of controllers and computers such as the Raspberry Pi, all that the push-button is required to do is change its state. The controller or computer takes that state and performs actions that are completely separated from the push-button itself.

Load the Sense HAT emulator from the Programming menu in Raspbian. Create a new Python file in Thonny and call it sense-button.py. Enter the following code into the file, and then click on the Run icon when done:



from gpiozero import Button

from sense_emu import SenseHat

from time import sleep



button = Button(4)

sense = SenseHat()



def display_x_mark(rate=1):

sense.clear()

X = (255,0,0)

O = (255,255,255)

x_mark = [

X,O,O,O,O,O,O,X,

O,X,O,O,O,O,X,O,

O,O,X,O,O,X,O,O,

O,O,O,X,X,O,O,O,

O,O,O,X,X,O,O,O,

O,O,X,O,O,X,O,O,

O,X,O,O,O,O,X,O,

X,O,O,O,O,O,O,X

]

sense.set_pixels(x_mark)



while True:

if button.is_pressed:

display_x_mark()

sleep(1)

else:

sense.clear()

If you do not have any errors in your code, you should see that the display on the Sense HAT emulator changes to a red X on a white background when you press the button:

Let's explain the preceding code a bit. We start off by importing the libraries we need for our code:

from gpiozero import Button

from sense_emu import SenseHat

from time import sleep

We then create new button and Sense HAT emulator objects. Our button is once again connected to GPIO pin 4:

button = Button(4)

sense = SenseHat()

The display_x_mark method creates an X in the display by using the SenseHat method set_pixels:

def display_x_mark(rate=1):

sense.clear()

X = (255,0,0)

O = (255,255,255)

x_mark = [

X,O,O,O,O,O,O,X,

O,X,O,O,O,O,X,O,

O,O,X,O,O,X,O,O,

O,O,O,X,X,O,O,O,

O,O,O,X,X,O,O,O,

O,O,X,O,O,X,O,O,

O,X,O,O,O,O,X,O,

X,O,O,O,O,O,O,X

]

sense.set_pixels(x_mark)

The X and O variables are used to hold color codes, with (255,0,0) being red, and (255,255,255) as white. The variable x_mark creates an 8 x 8 pattern that matches the resolution of the Sense HAT emulator screen. x_mark is passed into the set_pixels method of the SenseHAT object.

Our continuous loop checks the is_pressed status of the button and calls the display_x_mark method if the status returns true. This method then prints a red X against a white background.

The display is cleared with sense.clear() when the button is not in the pressed state:

while True:

if button.is_pressed:

display_x_mark()

sleep(1)

else:

sense.clear()





Toggling an LED with a long button press


With the GPIO Zero library, we can not only detect when a button has been pressed, but can also detect how long it has been pressed for. We will use the hold_time property and the when_held method to determine whether the button has been pressed for a certain duration. If this duration time has been exceeded, then we will turn an LED on and off.

The following is the circuit diagram for our program. Keep the push-button wired to GPIO pin 4. Use GPIO pin 17 for the LED, as shown here:

Create a new file in Thonny and call it buttonheld-led.py. Type in the following and click on Run: from gpiozero import LED

from gpiozero import Button



led = LED(17)

button = Button(4)

button.hold_time=5



while True:

button.when_held = lambda: led.toggle()

Hold down the push-button for 5 seconds. You should see the LED toggle on. Now hold it again for another 5 seconds. The LED should toggle off.

We've covered the first four lines of the code in previous examples. Let's look at where the hold time for the button is set:

button.hold_time=5

This line sets the hold time for the button at 5 seconds. The when_held method is called in our continuous loop:

button.when_held = lambda: led.toggle()

Using lambda, we are able to create an anonymous function so that we may call toggle() on the LED object, led. This toggles the LED both on and off.





Reading the state from an infrared motion sensor





Alarm systems using motion sensors are a ubiquitous part of our society. With our Raspberry Pi, they are incredibly easy to build. We will cover the following in this section:





What is a PIR sensor?

Using the GPIO buzzer class

Building a basic alarm system





What is a PIR sensor?


PIR sensors, a type of motion sensor, are used to detect motion. Applications for PIR sensors are pretty much based on detecting motion for security systems. PIR stands for passive infrared, and PIR sensors contain a crystal that detects low-level radiation. PIR sensors are actually constructed in two halves, as it is the difference between the halves that detects motion. The following is a photo of an inexpensive PIR sensor:

In the preceding photo, we can see the positive (+), negative (-), and signal (S) pins. This particular PIR sensor sits well on a breadboard.

The following is the wiring diagram of our PIR circuit. The positive pin connects to the 5 V DC output on the Raspberry Pi. The negative pin connects to ground (GND), and the signal connects to GPIO pin 4:

Create a new Python file in Thonny and call it motion-sensor.py. Type in the following code and run it: from gpiozero import MotionSensor

from time import sleep



motion_sensor = MotionSensor(4)



while True:

if motion_sensor.motion_detected:

print('Detected Motion!')

sleep(2)

else:

print('No Motion Detected!')

sleep(2)

You should see a message reading Detected Motion! when you get close to the PIR sensor. Try staying still and see whether you can get the message No Motion Detected! to display in the shell.

Our code begins by importing the MotionSensor class from the GPIO Zero library:

from gpiozero import MotionSensor

After importing the sleep class, we create a new MotionSensor object, called motion_sensor, with the number 4 appended in order to make our program look for the signal on GPIO pin 4: motion_sensor = MotionSensor(4)

In our continuous loop, we check the motion_sensor for motion with this line:

if motion_sensor.motion_detected:

From here on in the code, we define the messages to print to the shell.





Using the GPIO Zero buzzer class


Generally, there are two types of electronic buzzers: active and passive. An active buzzer has an internal oscillator and will make a sound when a direct current, or DC, is applied to it. A passive buzzer requires an alternating current, or AC, in order for it to make a sound. Passive buzzers are basically small electromagnetic speakers. The easiest way to tell the difference is to apply a DC supply and listen for a sound. For the purposes of our code, we will be using an active buzzer, as shown in the following photo:



There is a buzzer class in the GPIO Zero library. We will use this class to generate a piercing alarm sound with our active buzzer. Configure the circuit as shown in the following diagram. The positive wire on the active buzzer connects to GPIO pin 17:



Create a new Python file in Thonny and call it buzzer-test1.py. Type in the following code and run it:

from gpiozero import Buzzer

from time import sleep



buzzer = Buzzer(17)



while True:

buzzer.on()

sleep(2)

buzzer.off()

sleep(2)

Depending on the active buzzer you chose, you should hear a piercing sound for two seconds followed by 2 seconds of silence. The following line turns on the buzzer:

buzzer.on()

Likewise, this line in the preceding code turns off the buzzer:

buzzer.off()

The code may be simplified by using the toggle method on the buzzer object. Create a new Python file in Thonny. Call it buzzer-test2.py. Type in the following and run it:

from gpiozero import Buzzer

from time import sleep



buzzer = Buzzer(17)



while True:

buzzer.toggle()

sleep(2)

You should get the same results. A third way to do the same thing would be to use the beep method from the buzzer object. Create a new Python file in Thonny. Call it buzzer-test3.py. Type in the following and run it:

from gpiozero import Buzzer



buzzer = Buzzer(17)



while True:

buzzer.beep(2,2,10,False)

The buzzer should turn on for 2 seconds, and then off for 2 seconds, and repeat this for a total of 10 times. The beep method takes the following four parameters:

on_time: This is the number of seconds the sound is on. The default is 1 second.

off_time: This is the number of seconds the sound is off. The default is 1 second.

n: This is the number of times the process will run. The default is None, which means forever.



background: This determines whether or not to start a background thread to run the process. A True value runs the process in a background thread and returns right away. When set to False, return does not happen until the process is finished (please note that when n is None, the method never returns).





Building a basic alarm system


Now let's build a basic alarm system around the buzzer. Hook up the PIR sensor to GPIO pin 4, and a latching push-button to GPIO pin 8. The following is the circuit diagram for our system:



Create a new file in Thonny and call it basic-alarm-system.py. Type in the following and click on Run:

from gpiozero import MotionSensor

from gpiozero import Buzzer

from gpiozero import Button

from time import sleep



buzzer = Buzzer(17)

motion_sensor = MotionSensor(4)

switch = Button(8)



while True:

if switch.is_pressed:

if motion_sensor.motion_detected:

buzzer.beep(0.5,0.5, None, True)

print('Intruder Alert')

sleep(1)

else:

buzzer.off()

print('Quiet')

sleep(1)

else:

buzzer.off()

sleep(1)

What we have done here is create an alarm system with our components. We are using a latching push-button to turn the alarm system on and off. We could easily replace the latching push-button with a key switch. The following picture shows this change:



This circuit can easily be transferred to a project box for use as an alarm system.





Modifying Hello LED using infrared sensor





We will continue our exploration of sensors by modifying our original Hello LED code. In this project, we will combine a distance sensor with our PIR sensor, and flash an LED based on the values of these sensors. This circuit will not only tell us that someone is approaching, but will also give us an indication of how close they are.

We will cover the following in this section:





Configuring a distance sensor

Taking Hello LED to another level





Configuring a distance sensor


We will start by configuring the distance sensor and running some code. The following is a circuit diagram of our distance sensor circuit:

The following are the connections to be made:

VCC from the motion sensor connects to the 5 V DC output from the Raspberry Pi

GPIO pin 17 connects to Trig on the distance sensor

Echo on the distance sensor connects to a 330 Ohm resistor

GND on the distance sensor connects to GND on the Raspberry Pi and a 470 Ohm resistor

The other end of the 330 Ohm resistor, from the echo pin on the distance sensor, connects to the 470 Ohm resistor (the two resistors create a voltage divider circuit)

GPIO pin 18 from the Raspberry Pi connects to the intersection of the resistors



Of note in this circuit is the voltage divider that is created by the two resistors. We use this divider to connect GPIO pin 18.

Create a new Python file in Thonny and call it distance-sensor-test.py. Type in the following code and run it: from gpiozero import DistanceSensor

from time import sleep



distance_sensor = DistanceSensor(echo=18, trigger=17)

while True:

print('Distance: ', distance_sensor.distance*100)

sleep(1)

You should see an output similar to following screenshot. As you place your hand, or any other object, in front of the distance sensor, the value printed to the Shell should change, as shown here:

Be sure to have the distance sensor on a secure, non-moving surface, such as a breadboard.





Taking Hello LED to another level


Our original Hello LED! system was a simple circuit, which involved making an LED, connected to the GPIO port, blink on and off. We have covered so much more since creating that circuit. We will take what we've learned and create a new Hello LED circuit. With this circuit, we will create an alarm system where the distance from the alarm is indicated by the blinking frequency of the LED.

The following is the circuit diagram for our new Hello LED system:



This may look a little complex, with wires going every which way; however, it is quite a simple circuit. The distance sensor part is the same as it was previously. For the other components, connect as follows:

The PIR sensor's positive pin connects to 5V DC on the breadboard

The PIR sensor's negative pin connects to GND on the breadboard

The PIR sensor's signal pin connects to GPIO pin 4

The LED's positive pin connects to GPIO pin 21 through a 220 Ohm resistor

The LED's negative pin connects to GND on the breadboard



Create a new Python file in Thonny and call it hello-led.py. Type in the following code and run it:

from gpiozero import DistanceSensor

from gpiozero import MotionSensor

from gpiozero import LED

from time import sleep



distance_sensor = DistanceSensor(echo=18, trigger=17)

motion_sensor = MotionSensor(4)

led = LED(21)



while True:

if(motion_sensor.motion_detected):

blink_time=distance_sensor.distance

led.blink(blink_time,blink_time,None,True)

sleep(2)

The LED should start blinking as soon as motion is detected. The frequency of the LED's blinking will speed up as you place your hand closer and closer to the distance sensor.





Summary





We should now be quite familiar with interacting with sensors and our Raspberry Pi. This chapter should be considered an exercise in creating sensory circuits using our Raspberry Pi with ease.

We will use this knowledge in Chapter 18, Building a Home Security Dashboard, where we will create an IoT home security dashboard.





Building a Home Security Dashboard





In Chapter 16, Setting Up a Raspberry Pi Web Server, we were introduced to the web framework CherryPy. Using CherryPy, we are able to turn our Raspberry Pi into a web server. In Chapter 17, Reading Raspberry Pi GPIO Sensor Data Using Python, we learned how to read sensory data from the GPIO.

In this chapter, we will take the lessons that we learned from the previous two and create a home security dashboard.

The following topics will be covered in this chapter:





Creating our dashboard using CherryPy

Displaying sensory data on our dashboard





Knowledge required to complete this chapter


The reader will need a working knowledge of the Python programming language to complete this chapter. A basic understanding of HTML, including CSS, is also required.





Project overview


We will build two different home security dashboards in this chapter. The first one will involve the use of a temperature and humidity sensor, and the next one will involve an active buzzer.

This project should take a couple of hours to complete.





Getting started





To complete this project, the following will be required:





A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A breadboard

A DHT11 temperature sensor

A latching push-button, switch, or key switch

A PIR sensor

An active buzzer

A Raspberry Pi camera module





Creating our dashboard using CherryPy





To create our home security dashboard, we will modify the code we wrote in Chapter 7, Setting Up a Raspberry Pi Web Server. These modifications include adding sensory data from the GPIO—something we became very good at by the end of Chapter 17, Reading Raspberry Pi GPIO Sensor Data Using Python.

Two of the inputs, the temperature and humidity sensor and the Pi camera, will require additional steps so that we can integrate them into our dashboard.





Using the DHT11 to find temperature and humidity


The DHT11 temperature and humidity sensor is a low-cost hobbyist-grade sensor, capable of providing basic measurements. The DHT11 comes in two different versions, the four-pin model and the three-pin model.

We will be using the three-pin model for our project (see the following picture):



The library we will be using to read DHT11 data, the Adafruit DHT library, does not come pre-installed on Raspbian (as of the time of writing). To install it, we will clone the library's GitHub project and build it from the source.

Open up a Terminal window, and type the following command to use git and download the source code (at the time of writing, git came pre-installed with Raspbian):

git clone https://github.com/adafruit/Adafruit_Python_DHT.git

You should see the progress of the code downloading. Now, change directories by using the following command:

cd Adafruit_Python_DHT





You will be in the source code directory.

Build the project with the following command:

sudo python3 setup.py install

You should see the progress displayed in the Terminal:



If you do not receive any errors, the Adafruit DHT library should now be installed on your Raspberry Pi. To verify this, open up Thonny and check the packages:



Now, let's wire up the circuit. Connect the DHT11 sensor to the Raspberry Pi as follows:

GND from DHT11 to GND on the Raspberry Pi

VCC on DHT11 to 5V DC on the Raspberry Pi

Signal on the DHT11 to GPIO pin 19



See the following Fritzing diagram for more information:



Once the DHT11 is wired up, it is time to write some code:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on New to create a new file

Type the following into the file:



import Adafruit_DHT



dht_sensor = Adafruit_DHT.DHT11

pin = 19

humidity, temperature = Adafruit_DHT.read_retry(dht_sensor, pin)



print(humidity)

print(temperature)

Save the file as dht-test.py

Run the code

You should see something similar to the following:





Let's take a look at the code. We will start by importing the Adafruit_DHT library. We then create a new DHT11 object, and call it dht_sensor. The humidity and temperature are set from the read_retry method on the Adafruit_DHT class.

We then print out the values of humidity and temperature to the shell.





Using the Pi camera to take a photo


In Chapter 12, Using the GPIO to Connect to the Outside World, we tried out the special Raspberry Pi camera module and wrote code to turn on a camera preview. It's time to put the camera to use.

Install a Raspberry Pi camera module onto the Raspberry Pi through the CSI camera port (be sure to enable the camera in the Raspberry Pi Configuration screen, if it's not already enabled). Let's write some code:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on New to create a new file

Type the following into the file:



from picamera import PiCamera

from time import sleep



pi_cam = PiCamera()



pi_cam.start_preview()

sleep(5)

pi_cam.capture('/home/pi/myimage.png')

pi_cam.stop

Save the file as pi-camera-test.py

Run the code



This program imports PiCamera and sleeps before creating a new PiCamera object called pi_cam. The start_preview method shows us what the camera sees in a full screen.

The capture method creates a new image file called myimage.png, and stores it in the default directory /home/pi.

We have 5 seconds to position our camera before a photo is taken.

The following is a picture of my work area, taken with the Raspberry Pi camera:





Creating our dashboard using CherryPy


In Chapter 16, Setting Up a Raspberry Pi Web Server, we created a weather dashboard using the Bootstrap framework with the WeatherDashboardHTML.py file. We will revisit that code and modify it for our home security dashboard.

To create our home security dashboard, do the following:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on New to create a new file

Type the following into the file:



import cherrypy

from SecurityData import SecurityData



class SecurityDashboard:



def __init__(self, securityData):

self.securityData = securityData



@cherrypy.expose

def index(self):

return """

<!DOCTYPE html>

<html lang="en">



<head>

<title>Home Security Dashboard</title>

<meta charset="utf-8">

<meta name="viewport"

content="width=device-width,

initial-scale=1">



<meta http-equiv="refresh" content="30">



<link rel="stylesheet"

href="https://maxcdn.bootstrapcdn.com

/bootstrap/4.1.0/css/bootstrap.min.css">



<link rel="stylesheet" href="led.css">



<script src="https://ajax.googleapis.com

/ajax/libs/jquery/3.3.1/jquery.min.js">

</script>



<script src="https://cdnjs.cloudflare.com

/ajax/libs/popper.js/1.14.0

/umd/popper.min.js">

</script>



<script src="https://maxcdn.bootstrapcdn.com

/bootstrap/4.1.0/js/bootstrap.min.js">

</script>



<style>

.element-box {

border-radius: 10px;

border: 2px solid #C8C8C8;

padding: 20px;

}



.card {

width: 600px;

}



.col {

margin: 10px;

}

</style>

</head>



<body>

<div class="container">

<br/>

<div class="card">

<div class="card-header">

<h3>Home Security Dashboard</h3>

</div>

<div class="card-body">

<div class="row">

<div class="col element-box">

<h6>Armed</h6>

<div class = """ +

self.securityData

.getArmedStatus() +

""">

</div>

</div>

<div class="col element-box">

<h6>Temp / Humidity</h6>

<p>""" + self.securityData

.getRoomConditions()

+ """</p>

</div>

<div class="col element-box">

<h6>Last Check:</h6>

<p>""" + self

.securityData.getTime()

+ """</p>

</div>

</div>

</div>

<div class="card-footer"

align="center">



<img src=""" + self.securityData

.getSecurityImage() + """/>

<p>""" + self.securityData

.getDetectedMessage() + """</p>

</div>

</div>

</div>

</body>



</html>

"""



if __name__=="__main__":

securityData = SecurityData()

conf = {

'/led.css':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi/styles/led.css'

},

'/intruder.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename':

'/home/pi/images/intruder.png'

},

'/all-clear.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi/images

/all-clear.png'

},

'/not-armed.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi

/images/not-armed.png'

}

}

cherrypy.quickstart(SecurityDashboard(securityData),'/',conf)

Save the file as security-dashboard.py



Do not run the code yet, as we still have to create the SecurityData class.

As you can see, we've made a few changes to WeatherDashboardHTML.py in order to create security-dashboard.py. Before we run the code, let's point out a few of the changes.

The most obvious change is the use of the SecurityData class. As you can imagine, this class will be used to obtain data for our dashboard:

from SecurityData import SecurityData

We use the following line to automatically refresh our page every 30 seconds (we did not automatically refresh our weather dashboard, as weather data does not change often):

<meta http-equiv="refresh" content="30">

For our home security dashboard, we use a bit of CSS magic to represent a blinking LED. This is accomplished by the adding the led.css file:

<link rel="stylesheet" href="led.css">

For the data fields, we will access methods from our SecurityData object. We will go into more detail on these methods in the upcoming section. For our main section, we will create a dictionary called conf:

if __name__=="__main__":

securityData = SecurityData()

conf = {

'/led.css':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi/styles/led.css'

},

'/intruder.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename':

'/home/pi/images/intruder.png'

},

'/all-clear.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi/images

/all-clear.png'

},

'/not-armed.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi

/images/not-armed.png'

}

}

cherrypy.quickstart(SecurityDashboard(securityData),'/',conf)



We use the conf dictionary to pass configuration data to the cherrypy quickstart method. This configuration data allows us to use the static files led.css, intruder.png, all-clear.png, and not-armed.png with our CherryPy server.

The CSS file led.css was mentioned previously. The other three files are self-described images that are used in our dashboard.

In order to use static files or directories with CherryPy, you must create and then pass in configuration information. An absolute path (as opposed to a relative path) must be part of the configuration information.

The configuration information states that the CSS and image files are located in the directories named styles and images, respectively. These directories are both located in the /home/pi directory.

The following is a screenshot of the files in the images directory (be sure to place your files in the correct directories):





Displaying sensory data on our dashboard


To provide our dashboard data, we will create a new Python file called SecurityData.py where we will store the SecurityData class. Before we do that, let's build our circuit.





Home security dashboard with a temperature sensor


We will build our first version of the home security dashboard with a DHT11 temperature and humidity sensor, a PIR sensor, and a latching button (or key switch). The following is the Fritzing diagram for our home security dashboard:



The circuit connects as follows:

GND from DHT11 to GND

VCC on DHT11 to 5V DC

Signal on the DHT11 to GPIO pin 19

GND from PIR sensor to GND

VCC on PIR sensor to 5V DC

Signal on PIR sensor to GPIO pin4

One end of the latching button to GPIO pin 8

The other end of the latching button to GND

Pi camera module to CSI port (not shown)



Following is a photo of our circuit. One thing to note is the separate breadboard for our DHT11 sensor (easier to fit on a micro breadboard), as well as the key switch in place of a latching button:



Now it's time to write the code:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on New to create a new file



Type the following into the file:



from gpiozero import MotionSensor

from gpiozero import Button

from datetime import datetime

from picamera import PiCamera

import Adafruit_DHT



class SecurityData:

humidity=''

temperature=''

detected_message=''





dht_pin = 19

dht_sensor = Adafruit_DHT.DHT11

switch = Button(8)

motion_sensor = MotionSensor(4)

pi_cam = PiCamera()



def getRoomConditions(self):

humidity, temperature = Adafruit_DHT

.read_retry(self.dht_sensor, self.dht_pin)



return str(temperature) + 'C / ' + str(humidity) + '%'



def getDetectedMessage(self):

return self.detected_message



def getArmedStatus(self):

if self.switch.is_pressed:

return "on"

else:

return "off"



def getSecurityImage(self):



if not(self.switch.is_pressed):

self.detected_message = ''

return "/not-armed.png"



elif self.motion_sensor.motion_detected:

self.pi_cam.resolution = (500, 375)

self.pi_cam.capture("/home/pi/images/intruder.png")

self.detected_message = "Detected at: " +

self.getTime()

return "/intruder.png"



else:

self.detected_message = ''

return "/all-clear.png"



def getTime(self):

return datetime.now().strftime('%Y-%m-%d %H:%M:%S')



if __name__ == "__main__":



while True:

security_data = SecurityData()

print(security_data.getRoomConditions())

print(security_data.getArmedStatus())

print(security_data.getTime())

Save the file as SecurityData.py

Run the code



You should get an output to the shell indicating the temperature and humidity level in the room, an on or off indicating the position of the switch, and the current time. Try turning the switch on and off to see if the value changes in the output.

Before we run the dashboard code (security-dashboard.py), let's review the SecurityData class. As we can see, the first part of the code is standard boilerplate code that we have already become familiar with. The getRoomConditions and getDetectedMessage methods are either self-explanatory or something we have already covered.

Our getArmedStatus method does a little trick to keep our code simple and compact:

def getArmedStatus(self):

if self.switch.is_pressed:

return "on"

else:

return "off"

We can see that getArmedStatus returns either on or off, not True or False as most methods with a binary return do. We do this for the armed section of our dashboard code.

Here is the HTML-generated code from the index method of the SecurityDashboard class:

<div class="col element-box">

<h6>Armed</h6>

<div class = """ + self.securityData.getArmedStatus() + """>

</div>

</div>

As we can see, the getArmedStatus method is called during the construction of the a div tag in place of the CSS class name. The words on and off refer to CSS classes in our led.css file. When on is returned, we get a blinking red LED-type graphic. When off is returned, we get a black dot.

Thus, the position of the latching switch (or key switch) determines whether or not the div tag has a CSS class name of on or a CSS class name of off through the getArmedStatus method of the SecurityData class.

Our code gets really interesting with the getSecurityImage method:

def getSecurityImage(self):



if not(self.switch.is_pressed):

self.detected_message = ''

return "/not-armed.png"



elif self.motion_sensor.motion_detected:

self.pi_cam.resolution = (500, 375)

self.pi_cam.capture("/home/pi/images/intruder.png")

self.detected_message = "Detected at: " +

self.getTime()

return "/intruder.png"



else:

self.detected_message = ''

return "/all-clear.png"

Our first conditional statement checks to see whether the circuit is armed (switch is in the on position). If it's not armed, then all that we need to do is set the detected message to nothing, and return a reference to the not-armed.png file (/not-armed.png was defined in the configuration information that we set up in the security-dashboard.py file).

If we take a look at the code in the SecurityDashboard class (security-dashboard.py file), we can see that the getSecurityImage method is called near the bottom of the generated HTML code:

<div class="card-footer" align="center">

<img src=""" + self.securityData.getSecurityImage() + """/>

<p>""" + self.securityData.getDetectedMessage() + """</p>

</div>

If the switch in our circuit is not on, we will get the following in our dashboard footer with no description after it (blank detected_message value):



The second conditional statement in our code is reached when the switch is on and motion has been detected. In this case, we set the resolution of our Pi camera and then take a photo.

We probably could have set the resolution of the Pi camera during the instantiation of the class, and this would probably have made more sense. However, putting this line here makes it easier to adjust the resolution prior to completing the code, as the line exists in the method we are focusing on.

We call the file intruder.png and store it in the location where the configuration code in the security-dashboard.py file can find it.

We also create a detected_message value based on the current time. This message will provide a timestamp to the image we acquire from the Pi camera.

The final else: statement is where we return /all-clear.png. By the time our code has reached this point, we know that the switch is on and there hasn't been any motion detected. The image we will see at the footer of our dashboard will be the following:



As with the NOT ARMED message, there won't be a description after ALL CLEAR. We will only see this graphic when the switch is on and the PIR sensor did not pick up any motion (motion_detected is false).

Now, let's run the dashboard code. If you haven't done so already, stop the SecurityData program by clicking on the red button. Click on the tab for the security-dashboard.py file, and click Run. Wait a few seconds in order to let CherryPy get running.

Open up a web browser, and navigate to the following address:

http://127.0.0.1:8080

With the switch in the off position, you should see the following dashboard screen:



As we can see, the LED under the Armed section is black, and we get a NOT ARMED message in the footer. We can also see that temperature and humidity are displayed, even though the system is not armed.

The Last Check box shows us when the code last checked the status of the switch. If you wait 30 seconds, you should see the page refresh with the same information.

Now, turn on the switch, and stand back so that the PIR sensor does not detect you. You should see a screen similar to the following:



You will notice that the LED in the Armed section now turns to a flashing red, the temperature and humidity readings are either the same or slightly different, the Last Check has been updated to the current time, and the ALL CLEAR message appears in the footer.

Let's see if we can capture an intruder. Point the Pi camera to a doorway, and wait for the PIR sensor to trigger:



It appears that we have caught our intruder!





Home security dashboard with quick response


You may have noticed that it takes a really long time for our page to refresh. This is due to the 30-second refresh time, of course, as well as the long time it takes for the DHT11 to read a value.

Let's change our code to make it quicker, and give it a buzzer to scare away an intruders.

Replace the DHT11 with a buzzer connected to GPIO pin 17 (we shouldn't need a Fritzing diagram for this simple change).

We will start by creating the SecurityDataQuick data class:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on New to create a new file

Type the following into the file:



from gpiozero import MotionSensor

from gpiozero import Button

from datetime import datetime

from picamera import PiCamera

from gpiozero import Buzzer

from time import sleep



class SecurityData:

alarm_status=''

detected_message=''



switch = Button(8)

motion_sensor = MotionSensor(4)

pi_cam = PiCamera()

buzzer = Buzzer(17)



def sound_alarm(self):

self.buzzer.beep(0.5,0.5, 5, True)

sleep(1)



def getAlarmStatus(self):



if not(self.switch.is_pressed):

self.alarm_status = 'not-armed'

return "Not Armed"



elif self.motion_sensor.motion_detected:

self.alarm_status = 'motion-detected'

self.sound_alarm()

return "Motion Detected"



else:

self.alarm_status = 'all-clear'

return "All Clear"



def getDetectedMessage(self):

return self.detected_message



def getArmedStatus(self):

if self.switch.is_pressed:

return "on"

else:

return "off"



def getSecurityImage(self):



if self.alarm_status=='not-armed':

self.detected_message = ''

return "/not-armed.png"



elif self.alarm_status=='motion-detected':

self.pi_cam.resolution = (500, 375)

self.pi_cam.capture("/home/pi/images/intruder.png")



self.detected_message = "Detected at: " +

self.getTime()



return "/intruder.png"



else:

self.detected_message = ''

return "/all-clear.png"



def getTime(self):

return datetime.now().strftime('%Y-%m-%d %H:%M:%S')





if __name__ == "__main__":



while True:

security_data = SecurityData()

print(security_data.getArmedStatus())

print(security_data.getTime())



Save the file as SecurityDataQuick.py

Run the code



In our shell, we should see the values of the switch and current time. Stop the program by clicking on the red button.

As we can see, there have been a few changes. One change we did not make was changing the class name. Keeping it as SecurityData means fewer changes for our dashboard code later on.

We added the library for the GPIO Zero buzzer, and have removed any code relating to the DHT11 sensor. We have also created a new method called sound_buzzer, which we will call in the event that an intruder is detected.

A new variable called alarm_status has been added, with a corresponding getAlarmStatus method. We have moved the core logic of our class to this method (away from getSecurityImage), as it is here where we check on the status of our switch and PIR sensor. The variable, alarm_status, is used elsewhere to determine if a photo is to be taken. We also sound the alarm in this method if an intruder is detected.

As a result of adding the new method, we change getSecurityImage. By using alarm_status in the getSecurityImage method, we do not need to check the status of the sensors. We may now use getSecurityImage for its intended use—taking a photo if an intruder has been detected.

It's now time to change the dashboard code:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on New to create a new file

Type the following into the file:



import cherrypy

from SecurityDataQuick import SecurityData



class SecurityDashboard:



def __init__(self, securityData):

self.securityData = securityData



@cherrypy.expose

def index(self):

return """

<!DOCTYPE html>

<html lang="en">



<head>

<title>Home Security Dashboard</title>

<meta charset="utf-8">



<meta name="viewport" content="width=device-

width, initial-scale=1">



<meta http-equiv="refresh" content="2">



<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com

/bootstrap/4.1.0/css/bootstrap.min.css">



<link rel="stylesheet" href="led.css">



<script src="https://ajax.googleapis.com

/ajax/libs/jquery/3.3.1/jquery.min.js">

</script>



<script src="https://cdnjs.cloudflare.com

/ajax/libs/popper.js/1.14.0

/umd/popper.min.js">

</script>



<script src="https://maxcdn.bootstrapcdn.com

/bootstrap/4.1.0/js/bootstrap.min.js">

</script>



<style>

.element-box {

border-radius: 10px;

border: 2px solid #C8C8C8;

padding: 20px;

}



.card {

width: 600px;

}



.col {

margin: 10px;

}

</style>

</head>



<body>

<div class="container">

<br />

<div class="card">

<div class="card-header">

<h3>Home Security Dashboard</h3>

</div>

<div class="card-body">

<div class="row">

<div class="col element-box">

<h4>Armed</h4>



<div class=""" + self

.securityData

.getArmedStatus()

+ """>

</div>

</div>



<div class="col element-box">

<h4>Status</h4>

<p>""" + self.securityData

.getAlarmStatus()

+ """</p>

</div>



<div class="col element-box">

<h4>Last Check:</h4>



<p>""" + self.securityData

.getTime() + """

</p>

</div>

</div>

</div>

<div class="card-footer" align="center">

<img src=""" + self.securityData

.getSecurityImage() + """ />

<p>""" + self.securityData

.getDetectedMessage() + """</p>

</div>

</div>

</div>

</body>



</html>

"""



if __name__=="__main__":

securityData = SecurityData()

conf = {

'/led.css':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi/styles/led.css'

},

'/intruder.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi

/images/intruder.png'

},

'/all-clear.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi

/images/all-clear.png'

},

'/not-armed.png':{

'tools.staticfile.on': True,

'tools.staticfile.filename': '/home/pi

/images/not-armed.png'

}

}

cherrypy.quickstart(SecurityDashboard(securityData),'/',conf)





Save the file as SecurityDataQuick.py

Run the code

Navigate back to your web browser and refresh the dashboard page



Our dashboard should now match the following screenshots:





Our dashboard should refresh every two seconds instead of 30, and a buzzer should sound when motion is detected in armed mode.

Let's take a look at the code. The changes to our dashboard are pretty self-explanatory. Of note, however, is the change to the middle box on our dashboard:

<div class="col element-box">

<h4>Status</h4>

<p>""" + self.securityData.getAlarmStatus() + """</p>

</div>

We replaced room temperature and humidity with the status of the switch and PIR sensor through the getAlarmStatus method. With this change, we are able to use the getAlarmStatus method as our initialization method where we set the status of the SecurityData class variable alarm_status.

If we really wanted to be sticklers about it, we could change our code so that we initialize the SecurityData class with the values of the switch and PIR sensor. As it stands, SecurityData is more of a utility type class where certain methods must be called before others. We'll let it slide for now.





Summary





As we can see, building a security application with the Raspberry Pi is pretty easy. Although we our viewing our dashboard and hosting our sensors on the same Raspberry Pi, it is not too difficult to set up the Raspberry Pi to serve up the dashboard to other computers in your network (or even the internet). In Chapter 19, Publishing to Web Services, we will take our interaction with

sensory data a step further and publish it to the internet.





Publishing to Web Services





At the heart of the IoT are web services that allow interaction with physical devices. In this chapter, we will explore the use of web services for the purposes of displaying sensory data from our Raspberry Pi. We will also look into Twilio, a text messaging service, and how we can use this service to send ourselves a text message from our Raspberry Pi.

The following topics will be covered in this chapter:





Publishing sensory data to cloud-based services

Setting up an account for text message transmission





Project overview





In this chapter, we will write code to display our sensory data to an IoT dashboard. As well as this, we will also explore Twilio, a text messaging service. We will then put these two concepts together to enhance the home security dashboard that we built in Chapter 18, Building a Home Security Dashboard.





Getting started





To complete this project, the following will be required:





A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse



A breadboard

Jumper wires

A DHT-11 temperature sensor

A PIR sensor

A push-button (latching)

A key switch (optional)





Publishing sensory data to cloud-based services


In this section, we will publish sensory data to an online dashboard using the MQTT protocol. This will involve setting up an account with the ThingsBoard website and making use of the demo environment.





Install the MQTT library





We will use the MQTT protocol in order to communicate with the dashboard in ThingsBoard. To set up the library on the Raspberry Pi, do the following:





Open a Terminal appliance from the main tool bar

Type sudo pip3 install pho-mqtt

You should see the library install





Set up an account and create a device


To start, navigate to the ThingsBoard website at www.thingsboard.io:

Click on the TRY IT NOW button at the top of the screen. Scroll down and click on the LIVE DEMO button under the Thing Board Community Edition section:





You will be presented with a sign-up window. Enter the appropriate information to set up an account. Once your account has been successfully set up, you will see a dialog showing the following:





Click on LOGIN to get into the app. After this, you should see a menu at the left-hand side of the screen:





Click on DEVICES. Look for a round orange graphic with a plus sign at the bottom right-hand side of the screen, as follows:





Click on this orange circle to add a new device. Type Room Conditions for the Name* and select default for the Device type* in the Add Device dialog. Do not select Is gateway. Click on ADD:





You should see a new box under your Devices, named Room Conditions:





Click on this box and a menu should slide from the right. Click on the COPY ACCESS TOKEN button to copy this token to your clipboard:





What we have done here is set up a ThingsBoard account and a new device inside ThingsBoard. We will use this device to retrieve sensory information from our Raspberry Pi and make a dashboard of these values.





Reading sensory data and publishing to ThingsBoard





It's now time to create our circuit and code. Install the DHT-11 sensor using GPIO pin 19 (refer to Chapter 18, Building a Home Security Dashboard, if you are unsure of how to connect the DHT-11 sensor to the Raspberry Pi):





Open up Thonny and create a new file called dht11-mqtt.py. Type the following into the file and run it. Be sure to paste in the access token from your clipboard:



from time import sleep

import Adafruit_DHT

import paho.mqtt.client as mqtt

import json



host = 'demo.thingsboard.io'

access_token = '<<access token>>'

dht_sensor = Adafruit_DHT.DHT11

pin = 19



sensor_data = {'temperature': 0, 'humidity': 0}



client = mqtt.Client()

client.username_pw_set(access_token)



while True:

humidity, temperature = Adafruit_DHT

.read_retry(dht_sensor, pin)



print(u"Temperature: {:g}\u00b0C, Humidity

{:g}%".format(temperature, humidity))



sensor_data['temperature'] = temperature

sensor_data['humidity'] = humidity

client.connect(host, 1883, 20)

client.publish('v1/devices/me/telemetry',

json.dumps(sensor_data), 1)

client.disconnect()

sleep(10)

You should see an output in the shell similar to the following screenshot:





There should be a new line every 10 seconds. As you can see, it's pretty hot and humid in the room.



Let's take a closer look at the preceding code:





Our import statements give us access to the modules needed for our code:



from time import sleep

import Adafruit_DHT

import paho.mqtt.client as mqtt

import json

We are already familiar with sleep, Adafruit_DHT, and json. The Paho MQTT library gives us access to the client object, which we will use to publish our sensory data to the dashboard.





The next two lines in the code are used to set variables for the URL of the demo server and the access token we retrieved from our device previously. We require both of these values in order to connect to the MQTT server and publish our sensory data:



host = 'demo.thingsboard.io'

access_token = '<<access token>>'

We define the dht_sensor variable as a DHT11 object from the Adafruit library. And we use pin 19 for the sensor:



dht_sensor = Adafruit_DHT.DHT11

pin = 19

We then define a dictionary object to store the sensory data that will be published to the MQTT server:



sensor_data = {'temperature': 0, 'humidity': 0}

We then create a client object of the mqtt Client type. The username and password is set with the access_token defined previously in the code:



client = mqtt.Client()

client.username_pw_set(access_token)

The continuous while loop contains the code that reads the sensory data, and then publishes it to the MQTT server. The humidity and temperature are set by reading from the read_retry method, and we set the corresponding sensor_data dictionary values as follows:



while True:

humidity, temperature = Adafruit_DHT

.read_retry(dht_sensor, pin)



print(u"Temperature: {:g}\u00b0C, Humidity

{:g}%".format(temperature, humidity))



sensor_data['temperature'] = temperature

sensor_data['humidity'] = humidity

The following client code is the code responsible for publishing our sensory data to the MQTT server. We connect using the connect method of the client object passing in the host value, the port (default port), and a keepalive time of 20 seconds. Unlike many MQTT examples, we do not create a loop and look for a callback, as we are only interested in publishing the sensory value, and not subscribing to the topic. In this case, the topic we are publishing to is v1/devices/me/telemetry, as per the ThingsBoard documentation example code. We then disconnect from client:



client.connect(host, 1883, 20)

client.publish('v1/devices/me/telemetry',

json.dumps(sensor_data), 1)

client.disconnect()

sleep(10)

We will now create a dashboard in ThingsBoard to display the sensory values sent from our code.





Creating a dashboard in ThingsBoard


The following are the steps to add the humidity value to a dashboard:

Navigate back to ThingsBoard and click on Devices, and then ROOM CONDITIONS. The side menu should slide from the right:





Click on the LATEST TELEMETRY tab.

You should see values for humidity and temperature, and the time when these values were last updated. Select humidity by clicking on the check box to the left. Now, click on SHOW ON WIDGET:





Select the Current bundle to Analogue gauges and cycle through the gauges until you get to the humidity dial widget. Click on the ADD TO DASHBOARD button:





Select Create new dashboard and type in Room Conditions as the name:





Do not select the Open dashboard checkbox. Click on the ADD button.

Repeat the previous steps for the temperature value. Select a temperature widget, and add your widget to the Room Conditions dashboard. This time, select Open dashboard before clicking on ADD:





You should now see a dashboard with the humidity and temperature values shown in analogue dials.





Sharing your dashboard with a friend





If you would like to make this dashboard public, so that others may see it, you need to do the following:





Navigate to the dashboards screen by clicking on DASHBOARDS:





Click on the Make dashboard public option:





You will see the dialog reading Dashboard is now public, as shown in the following screenshot. You may copy and paste the URL, or share it via social media:





Setting up an account for text message transmission





In this section, we will connect to a text message transmission service and send a text message from our Raspberry Pi to our phone. We will use this information, and what we've learned so far about publishing sensory information, to create an enhancement to our security dashboard in Chapter 18, Building a Home Security Dashboard.





Setting up a Twilio account


Twilio is a service that gives software developers the ability to create and receive text and phone calls programmatically through the use of its web service APIs. Let's start by setting up a Twilio account:

In a web browser, navigate to www.twilio.com

Click on the red sign up at the top-right corner of the page

Enter the appropriate personal information and a password, and then select SMS, Arrival Alerts, and Python for the fields below the password:





Provide a phone number to receive an authorization code via SMS, as follows:





Enter the authorization code you receive, as shown here:





The next step is to name the project that you will be working on. We will name it Doorbell. Enter the name and click Continue:





We need a phone number for our account in order to be able to interact with it. Click on Get a Number:





A number will be presented to you. If this number works for you, click on Choose this number:





You are now set up and ready to use Twilio:





Twilio is a paid service. You will be given an initial amount to work with. Please check the costs of using this service before creating your apps.





Installing Twilio on our Raspberry Pi


To access Twilio from Python, we need to install the twilio library. Open up a Terminal and type in the following:

pip3 install twilio

You should see the progress of Twilio being installed in the Terminal.





Sending a text through Twilio


Before sending a text, we need to get credentials. In your Twilio account, click on Settings | General, and scroll down to API Credentials:



We will use both the LIVE Credentials and TEST Credentials values. Open up Thonny and create a new file called twilio-test.py. Type the following code into the file and run it. Be sure to paste in the LIVE Credentials (please note that your account will be charged for sending a text):

from twilio.rest import Client



account_sid = '<<your account_sid>>'

auth_token = '<<your auth_token>>'

client = Client(account_sid, auth_token)



message = client.messages.create(

body='Twilio says hello!',

from_='<<your Twilio number>>',

to='<<your cell phone number>>'

)

print(message.sid)

You should get a text on your cell phone, with the message Twilio says hello!.





Creating a new home security dashboard


In Chapter 18, Building a Home Security Dashboard, we created a home security dashboard using CherryPy. The power behind the IoT is the ability to build an application with devices, located anywhere in the world, that are connected to each other. We will take this idea to our home security dashboard. If not already assembled, build the home security dashboard with the temperature sensor from Chapter 18, Building a Home Security Dashboard:

We will start our code by encapsulating our sensory data in a class container. Open up Thonny and create a new file called SensoryData.py:



from gpiozero import MotionSensor

import Adafruit_DHT



class SensoryData:

humidity=''

temperature=''

detected_motion=''



dht_pin = 19

dht_sensor = Adafruit_DHT.DHT11

motion_sensor = MotionSensor(4)



def __init__(self):

self.humidity, self.temperature = Adafruit_DHT

.read_retry(self.dht_sensor,

self.dht_pin)



self.motion_detected = self.motion_sensor.motion_detected



def getTemperature(self):

return self.temperature



def getHumidity(self):

return self.humidity



def getMotionDetected(self):

return self.motion_detected



if __name__ == "__main__":



while True:

sensory_data = SensoryData()

print(sensory_data.getTemperature())

print(sensory_data.getHumidity())

print(sensory_data.getMotionDetected())



Run the program to test our sensors. There isn't anything here we haven't covered already. We are basically just testing out our circuit and sensors. You should see the sensory data print out in the shell.

Now, let's create our sensory dashboard. Open up Thonny and create a new file called SensoryDashboard.py. The code is as follows:



import paho.mqtt.client as mqtt

import json

from SensoryData import SensoryData

from time import sleep



class SensoryDashboard:



host = 'demo.thingsboard.io'

access_token = '<<your access_token>>'

client = mqtt.Client()

client.username_pw_set(access_token)

sensory_data = ''



def __init__(self, sensoryData):

self.sensoryData = sensoryData



def publishSensoryData(self):

sensor_data = {'temperature': 0, 'humidity': 0,

'Motion Detected':False}



sensor_data['temperature'] = self.sensoryData

.getTemperature()



sensor_data['humidity'] = self.sensoryData.getHumidity()



sensor_data['Motion Detected'] = self.sensoryData

.getMotionDetected()



self.client.connect(self.host, 1883, 20)

self.client.publish('v1/devices/me/telemetry',

json.dumps(sensor_data), 1)

self.client.disconnect()



return sensor_data['Motion Detected']



if __name__=="__main__":



while True:

sensoryData = SensoryData()

sensory_dashboard = SensoryDashboard(sensoryData)



print("Motion Detected: " +

str(sensory_dashboard.publishSensoryData()))



sleep(10)

What we've done here is encapsulate the dht-mqtt.py file, from the previous code, in a class container. We instantiate our object with a SensoryData object in order to obtain data from our sensors. The publishSensoryData() method sends the sensory data to our MQTT dashboard. Notice how it returns the state of the motion sensor? We use this return value in our main loop to print out the value of the motion sensor. However, this return value will be more useful in our future code.

Let's add the motion sensor to our ThingsBoard dashboard:

Open up ThingsBoard in a browser

Click on the Devices menu

Click on the Room Conditions device

Select LATEST TELEMETRY

Select the Motion Detected value

Click on SHOW ON WIDGET

Under Cards, find the widget made up of a big orange square, as shown here:





Click on ADD TO DASHBOARD

Select the existing Room Conditions dashboard

Check off Open Dashboard

Click Add



You should see the new widget added to the Room Conditions dashboard. By clicking on the orange pencil icon at the bottom-right of the page, you are able to move and resize the widgets. Edit the widgets so they look like the following screenshot:



What we have done here is recreate the first version of the home security dashboard from Chapter 18, Building a Home Security Dashboard, with a more distributed architecture. No longer are we relying on our Raspberry Pi to serve up the sensory information via a CherryPy web page. We are able to reduce the role of our Raspberry Pi to a source of sensory information. As you can imagine, it is quite easy to use multiple Raspberry Pis with the same dashboard.

Test out this new dashboard by moving near the PIR sensor. See if you can get the Motion Detected widget to change to true.

To make our new home security dashboard even more distributed, let's add the ability to send a text message whenever the PIR motion sensor is activated. Open up Thonny and create a new file called SecurityDashboardDist.py. The following is the code to insert into the file:

from twilio.rest import Client

from SensoryData import SensoryData

from SensoryDashboard import SensoryDashboard

from gpiozero import Button

from time import time, sleep



class SecurityDashboardDist:

account_sid = ''

auth_token = ''

time_sent = 0

test_env = True

switch = Button(8)



def __init__(self, test_env = True):

self.test_env = self.setEnvironment(test_env)



def setEnvironment(self, test_env):

if test_env:

self.account_sid = '<<your Twilio test account_sid>>'

self.auth_token = '<<your Twilio test auth_token>>'

return True

else:

self.account_sid = '<<your Twilio live account_sid>>'

self.auth_token = '<<your Twilio live auth_token>>'

return False



def update_dashboard(self, sensoryDashboard):

self.sensoryDashboard = sensoryDashboard



motion_detected = self

.sensoryDashboard

.publishSensoryData()



if motion_detected:

return self.send_alert()

else:

return 'Alarm not triggered'



def send_alert(self):

if self.switch.is_pressed:

return self.sendTextMessage()

else:

return "Alarm triggered but Not Armed"



def sendTextMessage(self):

message_interval = round(time() - self.time_sent)



if message_interval > 600:

twilio_client = Client(self.account_sid,

self.auth_token)



if self.test_env:

message = twilio_client.messages.create(

body='Intruder Alert',

from_= '+15005550006',

to='<<your cell number>>'

)

else:

message = twilio_client.messages.create(

body='Intruder Alert',

from_= '<<your Twilio number>>',

to='<<your cell number>>'

)



self.time_sent=round(time())



return 'Alarm triggered and text message sent - '

+ message.sid

else:

return 'Alarm triggered and text

message sent less than 10 minutes ago'



if __name__=="__main__":

security_dashboard = SecurityDashboardDist()



while True:

sensory_data = SensoryData()

sensory_dashboard = SensoryDashboard(sensory_data)

print(security_dashboard.update_dashboard(

sensory_dashboard))



sleep(5)



Utilizing the first version of the home security dashboard circuit from Chapter 18, Building a Home Security Dashboard, this code uses the key switch in order to arm the call to send out a text message if the motion sensor detects motion. With the key switch in the off position, you will get a message, reading Alarm triggered but Not Armed, whenever the motion sensor detects motion.

If not already turned on, turn on the key switch to arm the circuit. Activate the motion sensor by moving around. You should get a notification that a text message was sent. The SID of the message should show as well. You may have noticed that you didn't actually get a text message. This is due to the fact that the code defaults to the Twilio test environment. Before we turn on the live environment, let's go over the code.

We start out by importing the libraries we need for our code:

from twilio.rest import Client

from SensoryData import SensoryData

from SensoryDashboard import SensoryDashboard

from gpiozero import Button

from time import time, sleep

There's not too much here that we haven't seen before; however, take note of the SensoryData and SensoryDashboard imports. As we have encapsulated the code to read sensory data, we can now just look at it as a black box. We know we need sensory data for our security dashboard, but we don't care how we get this data and where it will be displayed. SensoryData gives us access to the sensory data we need, and SensoryDashboard sends it off to a dashboard somewhere. We don't have to concern ourselves with these details in our SecurityDashboardDist.py code.

We create a class called SecurityDashboardDist for our distributed security dashboard. It is important to distinguish our classes by their names, and to pick names that describe what the class is:

class SecurityDashboardDist:

After declaring some class variables that are accessible throughout the class, we then come to our class initialization method:

account_sid = ''

auth_token = ''

time_sent = 0

test_env = True

switch = Button(8)



def __init__(self, test_env = True):

self.test_env = self.setEnvironment(test_env)

In the initialization method, we set our class scoped test_env variable (for the test environment). The default is True, meaning we have to conscientiously override the default in order to run the dashboard live. We use the setEnvironment() method to set test_env:

def setEnvironment(self, test_env):

if test_env:

self.account_sid = '<<your Twilio test account_sid>>'

self.auth_token = '<<your Twilio test auth_token>>'

return True

else:

self.account_sid = '<<your Twilio live account_sid>>'

self.auth_token = '<<your Twilio live auth_token>>'

return False

The setEnvironment() method sets up the class scoped account_id and auth_token values to either the test environment, or the live environment, depending on the value of test_env. We are basically just passing back the state of test_env with the setEnvironment() method, while setting up the variables we need to enable a test or live text message environment.

The update_dashboard() method makes the call to the sensors and sensory dashboard through the use of the SensoryDashboard object that we pass into the method. This here is the beauty of the object-oriented approach we have taken, as we do not need to concern ourselves with how the sensors are read or how the dashboard is updated. We only need to pass in a SensoryDashboard object to get this done:

def update_dashboard(self, sensoryDashboard):

self.sensoryDashboard = sensoryDashboard



motion_detected = self

.sensoryDashboard

.publishSensoryData()



if motion_detected:

return self.send_alert()

else:

return 'Alarm not triggered'

The update_dashboard method is also responsible for determining whether or not a text message will be sent, by checking on the status of the motion sensor. Do you remember how we returned the state of the motion sensor when we called the publishSensoryData() method on our SensoryDashboard class? This is where it comes in really handy. We can use this return value to determine whether or not we should send an alert. We don't have to check on the state of the motion sensor in our class at all, as it is easily available from the SensoryDashboard class.

The send_alert() method checks on the state of the switch in order to determine whether a text message should be sent:

def send_alert(self):

if self.switch.is_pressed:

return self.sendTextMessage()

else:

return "Alarm triggered but Not Armed"

You may be wondering why we are checking on the state of a sensor (a switch, in this case) here, as opposed to checking it from the SensoryDashboard class. The answer? We are building a home security dashboard by encapsulating a sensory data dashboard. There is no need for a switch in the SensorDashboard class, as it is not concerned with turning on and off the reading and transmitting of sensory data from the GPIO to the MQTT dashboard. The switch is the domain of a security system; in this case, the SecurityDashboardDist class.

The heart of the SecurityDasboardDist class is the sendTextMessage() method, outlined here:

def sendTextMessage(self):

message_interval = round(time() - self.time_sent)



if message_interval > 600:

twilio_client = Client(self.account_sid,

self.auth_token)



if self.test_env:

message = twilio_client.messages.create(

body='Intruder Alert',

from_= '+15005550006',

to='<<your cell number>>'

)

else:

message = twilio_client.messages.create(

body='Intruder Alert',

from_= '<<your Twilio number>>',

to='<<your cell number>>'

)



self.time_sent=round(time())



return 'Alarm triggered and text message sent - '

+ message.sid

else:

return 'Alarm triggered and text

message sent less than 10 minutes ago'

We use the message_interval method variable to set the duration of time between texts. We do not want to send a text message every time the motion sensor has detected motion. In our case, the minimum time left between texts is 600 seconds, or 10 minutes.

If this is the first time, or if it has been more than 10 minutes since the time that a text message was last sent, then the code sends the text message in either the test environment, or simply live. Take note of how the 15005550006 phone number is used for the test environment. Your Twilio number is required for the live environment, and your own phone number for the to field. For both the test and live environments, the Alarm triggered and text message sent message is returned, followed by the SID of the message. The difference is that you will not actually receive a text message (although there is a call to Twilio from the code).

If it has been less than 10 minutes since the last time a text message was sent, then the message will read Alarm triggered and text message sent less than 10 minutes ago.

In our main function, we create a SecurityDashboardDist object and call it security_dashboard. By not passing in anything, we allow the dashboard to be set up for the test environment by default:

if __name__=="__main__":

security_dashboard = SecurityDashboardDist()



while True:

sensory_data = SensoryData()

sensory_dashboard = SensoryDashboard(sensory_data)

print(security_dashboard.update_dashboard(

sensory_dashboard))



sleep(5)

The continuous loop that follows creates a SensoryData and SensoryDashboard object every 5 seconds. The SensoryData object (sensory_data) is used to instantiate a SensoryDashboard object (sensory_dashboard), as it is the former that gives us the current sensory data, and the latter that creates the sensory dashboard.

By naming our classes according to what they are, and our methods by what they do, the code becomes pretty self-explanatory.

We then pass this SensoryDashboard object (sensory_dashboard) to the update_dashboard method of the SecurityDashboard (security_dashboard). As the update_dashboard method returns a string, we are able to use it to print to our shell, and thus, see the status of our dashboard printed every 5 seconds. We keep the instantiation of the SecurityDashboardDist object out of the loop, as we only need to set the environment once.

Now that we understand the code, it's time to run it in the live Twilio environment. Please note that the only part of the code that changes when we switch to live is the actual sending of text messages. To turn our dashboard into a live text-sending machine, simply change the first line of the main method to the following:

security_dashboard = SecurityDashboardDist(True)





Summary





After completing this chapter, we should be very familiar with publishing sensory data to an IoT dashboard. We should also be familiar with sending text messages from our Raspberry Pi using the Twilio web service.

We will take a look at Bluetooth libraries in Chapter 20, Creating a Doorbell Button Using Bluetooth, before putting that information and the information we acquired in this chapter together to make an IoT doorbell.





Creating a Doorbell Button Using Bluetooth





In this chapter, we will turn our focus to Bluetooth. Bluetooth is a wireless technology used in the exchange of data over short distances. It operates in the 2.4 to 2.485 GHz frequency band, and generally has a range of up to 10 meters.

We will be utilizing the Blue Dot app on Android for the projects in this chapter, in which we will build a simple Bluetooth doorbell, before building a more advanced one that accepts secret swiping gestures.

The following topics will be covered in this chapter:





Introducing Blue Dot

What is an RGB LED?

Reading our button state using Bluetooth and Python





Project overview


In this chapter, we will build a Bluetooth-enabled doorbell using our Raspberry Pi and an Android phone or tablet. We will use an app on our Android phone or tablet, called Blue Dot, which is designed to work with Raspberry Pi projects.

We will start off by looking at RGB LEDs, wherein we will write a small program to cycle through these three colors. We will then create an alarm using a RGB LED and an active buzzer. We will test out the alarm with Python code.

We will write Python code to read button information from Blue Dot. We will then incorporate the code from both the alarm and Blue Dot to create a Bluetooth doorbell system.

The projects in this chapter should take a morning or afternoon to complete.





Getting started


The following is required to complete this project:

Raspberry Pi Model 3 (2015 model or newer)

USB power supply

Computer monitor

USB keyboard

USB mouse

Breadboard

Jumper wires

330 Ohm resistors (3 of them)

RGB LED

Active buzzer

Android phone or tablet





Introducing Blue Dot


Blue Dot is an Android app available in the Google Play Store. It works as a Bluetooth remote for the Raspberry Pi. When loaded into your Android phone or tablet, it is basically a big blue dot that you press to send a signal to the Raspberry Pi. The following is a picture of the Blue Dot app loaded onto a tablet:



It may be used as a Bluetooth joystick of sorts, as positional, slider, and rotational data may be sent from the app to your Raspberry Pi, depending on how you interact with the dot on the screen. We will add some of this functionality to our doorbell application by creating custom rings based on how the Blue Dot is pressed. To install Blue Dot on your Android phone or tablet, visit the Google Play Store and search for Blue Dot.





Installing the bluedot library on the Raspberry Pi


To install the bluedot library on the Raspberry Pi, do the following:

Open up a Terminal app

Type the following into the Terminal:



sudo pip3 install bluedot

Press Enter to install the library





Pairing Blue Dot with your Raspberry Pi





In order to make use of the Blue Dot app, you must pair it to your Raspberry Pi. To do that, follow these steps:





From the top-right corner of the Raspbian desktop client, click on the Bluetooth symbol:





If Bluetooth is not on, click on the Bluetooth icon and select Turn on Bluetooth

Select the Make Discoverable option from the Bluetooth drop-down menu

On your Android phone or tablet, go to the Bluetooth settings (this may be in different places depending on the particular OS on the phone or tablet)

You should be able to see the Raspberry Pi in the Available Devices list

Click on it to pair your device to the Raspberry Pi

You should get a message on the Raspberry Pi, reading something like Device 'Galaxy Tab E' has requested a pairing. Do you accept the request?

Click OK to accept



You may get a connection failed message. I was able to ignore this message and still have the Blue Dot app work with my Raspberry Pi, so don't worry too much

Load the Blue Dot app onto your Android phone or tablet

You should see a list with the Raspberry Pi as an item

Click on the Raspberry Pi item to connect the Blue Dot application to the Raspberry Pi



To test our connection, do the following:





Open up Thonny by following Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from bluedot import BlueDot

bd = BlueDot()

bd.wait_for_press()

print("Thank you for pressing the Blue Dot!")

Save the file as bluest-test.py and run it

You should get a message in the Thonny shell, reading Server started, followed by the Bluetooth address of the Raspberry Pi

You should then get a message reading Waiting for connection

If your Blue Dot app disconnected from the Raspberry Pi, connect it again by selecting the Raspberry Pi item in the list

Once the Blue Dot app is connected to the Raspberry Pi, you will get the message Client connected, followed by the Bluetooth address of your phone or tablet

Press the big Blue Dot

The Thonny shell should now print the following message: Thank you for pressing the Blue Dot!





Wiring up our circuit





We will create a doorbell circuit using an active buzzer and an RGB LED. Since we have not discussed RGB LEDs before, we will take a quick look at this amazing little electronic component. We then write a simple test program, using our Raspberry Pi, that will light up the RGB LED and sound the active buzzer.





What is an RGB LED?


An RGB LED is really just three LEDs in one unit: a red one, a green one, and a blue one. Almost any color may be achieved by applying electric current at varying power levels across the selection of input pins. The following is a diagram of such an LED:



As you can see there are red, green, and blue pins, plus a negative pin (-) . When an RGB LED has a negative pin (-), it is said to have a common cathode. Some RGB LEDs have a common positive pin (+), and, as such, are referred to as having a common anode. For our circuit, we will use an RGB LED with a common cathode. Both the common cathode and common anode have the longest pins of the RGB LED, and are identified by this characteristic.





Testing our RGB LED


We will now build a circuit with which we can test our RGB LED. The following is a wiring diagram of our circuit:



To build the circuit as shown in the diagram, do the following:

Using a breadboard, insert the RGB LED into the breadboard, such that the common cathode is inserted into the second slot from the left

Connect a 330 Ohm resistor to the red, green, and blue pins across the central gap on the breadboard

Connect a female-to-male jumper wire from GPIO pin 17 to the first slot on the left of the breadboard



Connect a female-to-male jumper wire from GPIO GND to the cathode pin of the RGB LED (the second from the left)

Connect a female-to-male jumper wire from GPIO pin 27 to the third slot on the left of the breadboard

Connect a female-to-male jumper wire from GPIO pin 22 to the fourth slot on the left of the breadboard

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from gpiozero import RGBLED

from time import sleep



led = RGBLED(red=17, green=27, blue=22)



while True:

led.color=(1,0,0)

sleep(2)

led.color=(0,1,0)

sleep(2)

led.color=(0,0,1)

sleep(2)

led.off()

sleep(2)

Save the file as RGB-LED-test.py and run it



You should see the RGB LED light up in red for 2 seconds. The RGB LED should then light up green for 2 seconds, before turning blue for 2 seconds. It will then turn off for 2 seconds, before starting the sequence again.

In the code, we start off by importing RGBLED from the GPIO Zero library. We then set up a variable, called led, by assigning it the pin numbers for the red, green, and blue colors of the RGB LED. From there, we simply turn on each color using the led.color property. It's easy to see that assigning a value of 1, 0, 0 to the led.color property turns on the red LED and turns off the green and blue LEDs. The led.off method turns off the RGB LED.

Try experimenting with different values for led.color. You may even put in a value that is less than 1 to vary the intensity of the color (the range is any value between 0 and 1). If you look closely, you may be able to see the different LEDs lighting up inside the RGB LED.





Completing our doorbell circuit





Now let's add an active buzzer to our circuit to complete the construction of our doorbell system. The following is the diagram for our doorbell circuit:



To build the circuit, follow these steps:





Using our existing circuit, insert an active buzzer into the opposite end of the breadboard

Connect a female-to-male jumper wire from GPIO pin 26 to the positive pin of the active buzzer

Connect a female-to-male jumper wire from GPIO GND to the negative pin of the active buzzer

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from gpiozero import RGBLED

from gpiozero import Buzzer

from time import sleep



class DoorbellAlarm:



led = RGBLED(red=17, green=22, blue=27)

buzzer = Buzzer(26)

num_of_times = 0



def __init__(self, num_of_times):

self.num_of_times = num_of_times





def play_sequence(self):

num = 0

while num < self.num_of_times:

self.buzzer.on()

self.light_show()

sleep(0.5)

self.buzzer.off()

sleep(0.5)

num += 1





def light_show(self):

self.led.color=(1,0,0)

sleep(0.1)

self.led.color=(0,1,0)

sleep(0.1)

self.led.color=(0,0,1)

sleep(0.1)

self.led.off()





if __name__=="__main__":



doorbell_alarm = DoorbellAlarm(5)

doorbell_alarm.play_sequence()

Save the file as DoorbellAlarm.py and run it

You should hear the buzzer go off five times, as well as see the RGB LED go through its light sequence the same number of times



Let's take a look at the code:





We start off by importing the libraries that we need, as follows:



from gpiozero import RGBLED

from gpiozero import Buzzer

from time import sleep

After that, we create our class with the DoorbellAlarm classname, before setting initial values:



led = RGBLED(red=17, green=22, blue=27)

buzzer = Buzzer(26)

num_of_times = 0

The class initialization sets the number of times that the alarm sequence will play, using the num_of_times class variable:



def __init__(self, num_of_times):

self.num_of_times = num_of_times

The light_show method simply flashes each color in the RGB LED in sequence for 0.1 seconds:



def light_show(self):

self.led.color=(1,0,0)

sleep(0.1)

self.led.color=(0,1,0)

sleep(0.1)

self.led.color=(0,0,1)

sleep(0.1)

self.led.off()

The play_sequence method turns the buzzer on and off for the number of times set when the DoorbellAlarm class is initialized. It also runs through the RGB LED light_show function every time the buzzer is sounded:



def play_sequence(self):

num = 0

while num < self.num_of_times:

self.buzzer.on()

self.light_show()

sleep(0.5)

self.buzzer.off()

sleep(0.5)

num += 1

We test out our code by instantiating the DoorbellAlarm class with a value of 5, and assigning it to the doorbell_alarm variable. We then play the sequence by calling the play_sequence method:



if __name__=="__main__":



doorbell_alarm = DoorbellAlarm(5)

doorbell_alarm.play_sequence()





Reading our button state using Bluetooth and Python





As mentioned previously, we are able to interact with the Blue Dot app in more ways than just a simple button press. The Blue Dot app can interpret where on the button a user presses, as well as detect double presses and swipes. In the following code, we will read from the Blue Dot app using Python.





Reading button information using Python





Do the following :





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from bluedot import BlueDot

from signal import pause



class BlueDotButton:



def swiped(swipe):



if swipe.up:

print("Blue Dot Swiped Up")

elif swipe.down:

print("Blue Dot Swiped Down")

elif swipe.left:

print("Blue Dot Swiped Left")

elif swipe.right:

print("Blue Dot Swiped Right")





def pressed(pos):

if pos.top:

print("Blue Dot Pressed from Top")

elif pos.bottom:

print("Blue Dot Pressed from Bottom")

elif pos.left:

print("Blue Dot Pressed from Left")

elif pos.right:

print("Blue Dot Pressed from Right")

elif pos.middle:

print("Blue Dot Pressed from Middle")





def double_pressed():

print("Blue Dot Double Pressed")





blue_dot = BlueDot()

blue_dot.when_swiped = swiped

blue_dot.when_pressed = pressed

blue_dot.when_double_pressed = double_pressed





if __name__=="__main__":



blue_dot_button = BlueDotButton()

pause()

Save the file as BlueDotButton.py and run it



You may have to connect the Blue Dot app to your Raspberry Pi each time you run this program (simply select it from the list in the Blue Dot app). Try pressing the Blue Dot in the middle, on the top, on the left, and so on. You should see messages in the shell that tell you where you've pressed. Now try swiping and double-pressing. The messages in the shell should indicate these gestures as well.

So, what have we done here? Let's take a look at the code:





We start off by importing the libraries that we need:



from bluedot import BlueDot

from signal import pause

We obviously need BlueDot, and we also need pause. We use pause to pause the program and wait for a signal from the Blue Dot app. Since we are using the when_pressed, when_swiped, and when_double_swiped events, we need to pause and wait (as opposed to other methods, such as wait_for_press). I believe using when-instead of wait-type events makes the code a little cleaner.





At the heart of our program is the instantiation of a BlueDot object and its related call back definitions:



blue_dot = BlueDot()

blue_dot.when_swiped = swiped

blue_dot.when_pressed = pressed

blue_dot.when_double_pressed = double_pressed

Please note that these callback definitions have to be put after the methods they are referring to, or you will get an error.





The methods themselves are pretty straightforward. The following is the swiped method:



def swiped(swipe):



if swipe.up:

print("Blue Dot Swiped Up")

elif swipe.down:

print("Blue Dot Swiped Down")

elif swipe.left:

print("Blue Dot Swiped Left")

elif swipe.right:

print("Blue Dot Swiped Right")

We define this method with a variable called swipe inside the method signature. Note that we do not have to use self inside the method signature, as we are not using class variables inside our methods.





Creating a Bluetooth doorbell





Now that we know how to read button information from Blue Dot, we can build a Bluetooth doorbell button. We will rewrite our DoorbellAlarm class, and use a simple button press from Blue Dot to activate the alarm, as follows:





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from gpiozero import RGBLED

from gpiozero import Buzzer

from time import sleep



class DoorbellAlarmAdvanced:



led = RGBLED(red=17, green=22, blue=27)

buzzer = Buzzer(26)

num_of_times = 0

delay = 0



def __init__(self, num_of_times, delay):

self.num_of_times = num_of_times

self.delay = delay





def play_sequence(self):

num = 0

while num < self.num_of_times:

self.buzzer.on()

self.light_show()

sleep(self.delay)

self.buzzer.off()

sleep(self.delay)

num += 1





def light_show(self):

self.led.color=(1,0,0)

sleep(0.1)

self.led.color=(0,1,0)

sleep(0.1)

self.led.color=(0,0,1)

sleep(0.1)

self.led.off()





if __name__=="__main__":



doorbell_alarm = DoorbellAlarmAdvanced(5,1)

doorbell_alarm.play_sequence()

Save the file as DoorbellAlarmAdvanced.py



Our new class, DoorbellAlarmAdvanced, is a modified version of the DoorbellAlarm class. What we have done is basically add a new class property that we call delay. This class property will be used to change the delay time between buzzer rings. As you can see in the code, the two methods modified for the change are __init__ and play_sequence.

Now that we have the changes in place for our alarm, let's create a simple doorbell program as follows:





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from bluedot import BlueDot

from signal import pause

from DoorbellAlarmAdvanced import DoorbellAlarmAdvanced



class SimpleDoorbell:



def pressed():

doorbell_alarm = DoorbellAlarmAdvanced(5, 1)

doorbell_alarm.play_sequence()





blue_dot = BlueDot()

blue_dot.when_pressed = pressed





if __name__=="__main__":



doorbell_alarm = SimpleDoorbell()

pause()

Save the file as SimpleDoorbell.py and run it

Connect the Blue Dot app to the Raspberry Pi, if it is not already connected

Push the big blue dot



You should hear five rings, each lasting one second, from the buzzer in one-second intervals. You will also see that the RGB LED went through a short light show. As you can see, the code is pretty straightforward. We import our new DoorbellAlarmAdvanced class, and then call the play_sequence method after we initialize the class with the doorbell_alarm variable in the pressed method.

The changes we made in creating the DoorbellAlarmAdvanced class are utilized in our code to allow us to set the delay time between rings.





Creating a secret Bluetooth doorbell





Wouldn't it be nice to know who is at the door before we answer it? We can take advantage of the swiping capabilities of the Blue Dot app. To create a secret Bluetooth doorbell (the secret being the way in which we interact with the doorbell, not a secret location for the doorbell), do the following:





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from bluedot import BlueDot

from signal import pause

from DoorbellAlarmAdvanced import DoorbellAlarmAdvanced



class SecretDoorbell:



def swiped(swipe):



if swipe.up:

doorbell_alarm = DoorbellAlarmAdvanced(5, 0.5)

doorbell_alarm.play_sequence()

elif swipe.down:

doorbell_alarm = DoorbellAlarmAdvanced(3, 2)

doorbell_alarm.play_sequence()

elif swipe.left:

doorbell_alarm = DoorbellAlarmAdvanced(1, 5)

doorbell_alarm.play_sequence()

elif swipe.right:

doorbell_alarm = DoorbellAlarmAdvanced(1, 0.5)

doorbell_alarm.play_sequence()





blue_dot = BlueDot()

blue_dot.when_swiped = swiped



if __name__=="__main__":



doorbell = SecretDoorbell()

pause()

Save the file as SecretDoorbell.py and run it

Connect the Blue Dot app to the Raspberry Pi, if it is not already connected

Swipe in the up direction on the Blue Dot



You should hear five short rings, as well as seeing the RGB LED light show. Try swiping in the down, left, and right directions. You should get a different ring sequence each time.

So, what did we do here? Basically, we attached a callback to the when_swiped event, and through if statements, we created new DoorbellAlarmAdvanced objects with varying initial values.

With this project we can now know who is at the door, as we can assign various swipe gestures to our different friends.





Summary


In this chapter, we created a Bluetooth doorbell application using the Raspberry Pi and the Blue Dot Android app. We started out by learning a little bit about RGB LEDs, before incorporating one in an alarm circuit with an active buzzer.

With the Blue Dot app, we learned how to connect a Bluetooth button to our Raspberry Pi. We also learned how to use some of the Blue Dot gestures, and created a doorbell application with various ring durations.

In Chapter 21, Enhancing Our IoT Doorbell, we will extend the functionality of our doorbell, and have a text message sent whenever someone presses the button.





Enhancing Our IoT Doorbell





In Chapter 19, Publishing to Web Services, we explored web services. We then introduced Bluetooth in Chapter 20, Creating a Doorbell Button Using Bluetooth, and built a Bluetooth doorbell using the Android app Blue Dot and our Raspberry Pi.

In this chapter, we will enhance our Bluetooth doorbell by adding the ability to send messages when someone is at the door. We will take what we've learned, and apply it to add text message functionality using the Twilio account we set up in Chapter 19, Publishing to Web Services.

The following topics will be covered in this chapter:





Sending a text message when someone is at the door

Creating a secret doorbell application with text messaging





Project overview


For the two projects in this chapter, we will use the circuit from Chapter 20, Creating a Doorbell Button Using Bluetooth. We will also make use of the Blue Dot app for Android devices as described in Chapter 20, Creating a Doorbell Button Using Bluetooth. The following is a diagram of the application we will create in this chapter:



We will create two versions of this application. The first version of our application will be a simple Bluetooth doorbell, where pressing the blue dot fires off the buzzer and RGB LED light show. After the alarm has been triggered, a text message will be sent using Twilio Cloud Services.

An altered version of the application will use swiping gestures on the Blue Dot app to indicate particular visitors. Each of the four potential visitors will have their own unique swiping gesture with the blue dot. After the custom buzzer ring and RGB LED light show, a text message will be sent informing the recipient of who is at the door. The Twilio Cloud will be used for this as well.

Both projects should take a morning or afternoon to complete.





Getting started


The following is required to complete this project:

Raspberry Pi Model 3 (2015 model or newer)

USB power supply

Computer monitor

USB keyboard

USB mouse

Breadboard

Jumper wires

330 Ohm resistors (3 of them)

RGB LED

Active buzzer

Android device (phone/tablet)





Sending a text message when someone is at the door





In Chapter 19, Publishing to Web Services, we created text messages using a technology called Twilio. In that instance, we used Twilio to send text messages when an intruder was detected. In Chapter 20, Creating a Doorbell Button Using Bluetooth, we created a Bluetooth doorbell using the Blue Dot app on an Android phone or tablet. The doorbell sounded a buzzer and gave a little light show on an RGB LED.

For this project, we will combine Twilio with the Bluetooth doorbell, and have a text message sent when someone pushes the Blue Dot doorbell (refer to Chapter 19, Publishing to Web Services, and Chapter 20, Creating a Doorbell Button Using Bluetooth, to familiarize yourself with these technologies).





Creating a simple doorbell application with text messaging


To create our simple doorbell application do the following:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following:



from twilio.rest import Client

from gpiozero import RGBLED

from gpiozero import Buzzer

from bluedot import BlueDot

from signal import pause

from time import sleep



class Doorbell:

account_sid = ''

auth_token = ''

from_phonenumber=''

test_env = True

led = RGBLED(red=17, green=22, blue=27)

buzzer = Buzzer(26)

num_of_rings = 0

ring_delay = 0

msg = ''



def __init__(self,

num_of_rings = 1,

ring_delay = 1,

message = 'ring',

test_env = True):

self.num_of_rings = num_of_rings

self.ring_delay = ring_delay

self.message = message

self.test_env = self.setEnvironment(test_env)



def setEnvironment(self, test_env):

if test_env:

self.account_sid = '<<test account_sid>>'

self.auth_token = '<<test auth_token>>'

return True

else:

self.account_sid = '<<live account_sid>>'

self.auth_token = '<<live auth_token>>'

return False



def doorbell_sequence(self):

num = 0

while num < self.num_of_rings:

self.buzzer.on()

self.light_show()

sleep(self.ring_delay)

self.buzzer.off()

sleep(self.ring_delay)

num += 1

return self.sendTextMessage()





def sendTextMessage(self):

twilio_client = Client(self.account_sid, self.auth_token)

if self.test_env:

message = twilio_client.messages.create(

body=self.message,

from_= '+15005550006',

to='<<your phone number>>'

)

else:

message = twilio_client.messages.create(

body=self.message,

from_= '<<your twilio number>>',

to='<<your phone number>>'

)

return 'Doorbell text message sent - ' + message.sid





def light_show(self):

self.led.color=(1,0,0)

sleep(0.5)

self.led.color=(0,1,0)

sleep(0.5)

self.led.color=(0,0,1)

sleep(0.5)

self.led.off()





def pressed():

doorbell = Doorbell(2, 0.5, 'There is someone at the door')

print(doorbell.doorbell_sequence())





blue_dot = BlueDot()

blue_dot.when_pressed = pressed





if __name__=="__main__":

pause()

Save the file as Doorbell.py and run it

Open up the Blue Dot app on your Android device

Connect to the Raspberry Pi

Push the big blue dot



You should hear the ring and see the light sequence cycle twice, with a short delay between rings. You should get something similar to the following printed in the shell:

Server started B8:27:EB:12:77:4F

Waiting for connection

Client connected F4:0E:22:EB:31:CA

Doorbell text message sent - SM5cf1125acad44016840a6b76f99b3624

The first three lines indicate that the Blue Dot app has connected to our Raspberry Pi through our Python program. The last line indicates that a text message was sent. As we are using the test environment, an actual text message was not sent, but the Twilio service was called.

Let's take a look at the code. We start by defining our class and giving it the name Doorbell. This is a good name for our class, as we have written our code such that everything to do with a doorbell is contained in Doorbell.py file. This file holds both the Doorbell class, used to alert a user, as well as the Blue Dot code, used to trigger the doorbell. The Blue Dot code actually sits outside of the Doorbell class definition, as we view it as part of the Blue Dot app, not the doorbell itself. We certainly could have designed our code such that the Doorbell class contains code to trigger the alarm; however, this separation of the alarm from the alarm trigger makes it easier to reuse the Doorbell class as an alerting mechanism in the future.

Choosing class names can be tricky. However, it is very important to choose the correct class name, as it will make it easier to build your application with class names that fit the purpose they are intended for. Class names are usually nouns, and the methods inside the classes are verbs. Generally, it is better to have a class represent one thing or idea. For example, we named our class Doorbell, as we have designed it to encapsulate what a doorbell does: alert the user that someone is at the door. Taking that idea into account, it makes sense that the Doorbell class would contain code to light up an LED, sound a buzzer, and send a text message, as those three actions fall under the idea of alerting a user.



After we define our class, we create class variables that are used in our class as follows:

class Doorbell:

account_sid = ''

auth_token = ''

from_phonenumber=''

test_env = True

led = RGBLED(red=17, green=22, blue=27)

buzzer = Buzzer(26)

num_of_rings = 0

ring_delay = 0

msg = ''

The init and setEnvironment methods set the variables we use in our class. The test_env variable determines whether we use the Twilio test or live environments in our code. The test environment is used by default:

def __init__(self,

num_of_rings = 1,

ring_delay = 1,

message = 'ring',

test_env = True):

self.num_of_rings = num_of_rings

self.ring_delay = ring_delay

self.message = message

self.test_env = self.setEnvironment(test_env)



def setEnvironment(self, test_env):

if test_env:

self.account_sid = '<<test account sid>>'

self.auth_token = '<<test auth token>>'

return True

else:

self.account_sid = '<<live account sid>>'

self.auth_token = '<<auth_token>>'

return False

The doorbell_sequence, sendTextMessage, and light_show methods are similar to methods we've covered previously in this book. It is through these three methods that we alert a user that someone is at the door. Of note here is the return value sent from the sendTextMessage method: return 'Doorbell text message sent - ' + message.sid. By having this in the code, we are able to use the sendTextMessage method to provide a printed confirmation in our shell that a text message has been sent.

As mentioned previously, the Blue Dot portion of our code sits outside of the class definition:

def pressed():

doorbell = Doorbell(2, 0.5, 'There is someone at the door')

print(doorbell.doorbell_sequence())



blue_dot = BlueDot()

blue_dot.when_pressed = pressed

The previous code is something we've seen before. We define the pressed method, where we instantiate a new doorbell object, and then call the doorbell_sequence method of doorbell. The blue_dot variable is a BlueDot object, where we are only concerned with the when_pressed event.

Of note here is the line containing the doorbell = Doorbell(2, 0.5, 'There is someone at the door') statement. In this line, we instantiate a Doorbell object, which we call doorbell, with num_of_rings equal to 2; ring_delay (or duration) equal to 0.5; and a message equal to There is someone at the door. We do not pass in a test_env environment value. Thus, the default setting of True is used to set our doorbell object to use the Twilio test environment, where no text message is sent. To change it so that a text message will be sent, change the statement to this:

doorbell = Doorbell(2, 0.5, 'There is someone at the door', False)

Make sure that you set up the Twilio account parameters accordingly. You should get a text message on your cell phone telling you that someone is at the door. The following is the message I received on my iPhone:





Creating a secret doorbell application with text messaging


Now that we have the ability to send a text message whenever someone pushes the big blue button on our Android device, let's make it a bit more complicated. We will modify the SecretDoorbell class we created in Chapter 20, Creating a Doorbell Button Using Bluetooth, and give it the ability to send text messages telling us who is at the door. Like we did previously, we will put all our code into one file to keep it compact:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following:



from twilio.rest import Client

from gpiozero import RGBLED

from gpiozero import Buzzer

from bluedot import BlueDot

from signal import pause

from time import sleep



class Doorbell:

account_sid = ''

auth_token = ''

from_phonenumber=''

test_env = True

led = RGBLED(red=17, green=22, blue=27)

buzzer = Buzzer(26)

num_of_rings = 0

ring_delay = 0

msg = ''



def __init__(self,

num_of_rings = 1,

ring_delay = 1,

message = 'ring',

test_env = True):

self.num_of_rings = num_of_rings

self.ring_delay = ring_delay

self.message = message

self.test_env = self.setEnvironment(test_env)



def setEnvironment(self, test_env):

if test_env:

self.account_sid = '<<test account_sid>>'

self.auth_token = '<<test auth_token>>'

return True

else:

self.account_sid = '<<live account_sid>>'

self.auth_token = '<<live auth_token>>'

return False



def doorbell_sequence(self):

num = 0

while num < self.num_of_rings:

self.buzzer.on()

self.light_show()

sleep(self.ring_delay)

self.buzzer.off()

sleep(self.ring_delay)

num += 1

return self.sendTextMessage()





def sendTextMessage(self):

twilio_client = Client(self.account_sid, self.auth_token)

if self.test_env:

message = twilio_client.messages.create(

body=self.message,

from_= '+15005550006',

to='<<your phone number>>'

)

else:

message = twilio_client.messages.create(

body=self.message,

from_= '<<your twilio number>>',

to='<<your phone number>>'

)

return 'Doorbell text message sent - ' + message.sid





def light_show(self):

self.led.color=(1,0,0)

sleep(0.5)

self.led.color=(0,1,0)

sleep(0.5)

self.led.color=(0,0,1)

sleep(0.5)

self.led.off()





class SecretDoorbell(Doorbell):

names=[['Bob', 4, 0.5],

['Josephine', 1, 3],

['Ares', 6, 0.2],

['Constance', 2, 1]]

message = ' is at the door!'



def __init__(self, person_num, test_env = True):

Doorbell.__init__(self,

self.names[person_num][1],

self.names[person_num][2],

self.names[person_num][0] + self.message,

test_env)



def swiped(swipe):

if swipe.up:

doorbell = SecretDoorbell(0)

print(doorbell.doorbell_sequence())

elif swipe.down:

doorbell = SecretDoorbell(1)

print(doorbell.doorbell_sequence())

elif swipe.left:

doorbell = SecretDoorbell(2)

print(doorbell.doorbell_sequence())

elif swipe.right:

doorbell = SecretDoorbell(3)

print(doorbell.doorbell_sequence())





blue_dot = BlueDot()

blue_dot.when_swiped = swiped



if __name__=="__main__":

pause()

Save the file as SecretDoorbell.py and run it

Open up the Blue Dot app on your Android device

Connect to the Raspberry Pi

Swipe the blue dot downwards from the top position

You should hear the buzzer sound once for about three seconds, and see the RGB LED perform its light show once. Something similar to the following will be displayed at the bottom of the shell:



Server started B8:27:EB:12:77:4F

Waiting for connection

Client connected F4:0E:22:EB:31:CA

Doorbell text message sent - SM62680586b32a42bdacaff4200e0fed78

As in the previous project, we will get a message indicating that a text message was sent, but we will not actually receive a text message, due to being in the Twilio test environment



Before we get our application to send us a text message that will tell us who is at the door based on how they swiped, let's take a look at the code.

Our SecretDoorbell.py file is exactly the same as our Doorbell.py file, with the exception of the following code:

class SecretDoorbell(Doorbell):

names=[['Bob', 4, 0.5],

['Josephine', 1, 3],

['Ares', 6, 0.2],

['Constance', 2, 1]]

message = ' is at the door!'



def __init__(self, person_num, test_env = True):

Doorbell.__init__(self,

self.names[person_num][1],

self.names[person_num][2],

self.names[person_num][0] + self.message,

test_env)



def swiped(swipe):

if swipe.up:

doorbell = SecretDoorbell(0)

print(doorbell.doorbell_sequence())

elif swipe.down:

doorbell = SecretDoorbell(1)

print(doorbell.doorbell_sequence())

elif swipe.left:

doorbell = SecretDoorbell(2)

print(doorbell.doorbell_sequence())

elif swipe.right:

doorbell = SecretDoorbell(3)

print(doorbell.doorbell_sequence())





blue_dot = BlueDot()

blue_dot.when_swiped = swiped

The class, SecretDoorbell, is created as a subclass of Doorbell, thereby inheriting the methods from Doorbell. The names array that we created stores the names and ring properties associated with the names in the array. So, for example, the first element has the name of Bob, a num_of_rings value of 4, and a ring_delay (duration) value of 0.5. When this record is used in a live Twilio environment, you should hear the buzzer and see the RGB LED light show cycle four times, with a short delay between the the rings. The init method of SecretDoorbell collects person_num (or, basically, position information in the names array) and uses it to instantiate the Doorbell parent class. The test_env value is defaulted to True, meaning we can only turn on the live Twilio environment by specifically overriding this value. This keeps us from accidentally using up our Twilio account balance before we are ready to actually deploy the application.

The Blue Dot code in our file sits outside of the SecretDoorbell class definition. We did the same in the previous project, as it allows us to keep the doorbell functionality separate from the doorbell trigger (the Blue Dot app on our Android device).

In our Blue Dot code, we instantiate a BlueDot object that we call blue_dot, before assigning the when_swiped event to swiped. In swiped, we instantiate a SecretDoorbell object with the value of 0 for the swipe.up gesture, 1 for swipe.down, 2 for swipe.left, and 3 for swipe.right. These values correspond to the array positions in the names array of the SecretDoorbell class. We do not pass in a value for test_env when we instantiate a SecretDoorbell object for any of the gestures, thus a text message is not sent. Just as in the previous project, we print to the shell the successful result of running the doorbell_sequence method.

To have a text message sent, we only have to override the default test_env value with the False value. We do this when we instantiate a SecretDoorbell object for our swipe gestures in the swiped method. Our code is designed in such a way that we can have a text message sent for one or many gestures. Modify the following elif statement in swiped:

elif swipe.down:

doorbell = SecretDoorbell(1, False)

print(doorbell.doorbell_sequence())

What we have done here, is turn on the live Twilio environment for the swipe.down gesture by overriding the test_env variable. The 1 value, which we instantiate our SecretDoorbell object with, corresponds to the second element in the names array in SecretDoorbell.

Thus, when you run the app and swipe from top to bottom on the blue dot, you should receive a text message from Twilio saying that Josephine is at the door, as follows:





Summary


In this chapter, we learned how to add text messaging to our doorbell application. This creates a doorbell fit for the age of the Internet of Things. It's easy to see how the concept of the IoT Bluetooth doorbell could be expanded—imagine turning on the porch lights when someone pushes the doorbell.

We can also see how the Blue Dot app could be utilized in other ways as well. We could program a certain swiping sequence with our Blue Dot app, perhaps to unlock the door. Imagine not having to carry around keys!

This is the last chapter before we introduce our robot car. In the following chapters, we will take the concepts we have learned so far and apply them to a robot that we control through the internet.





Introducing the Raspberry Pi Robot Car


I would like to introduce you to T.A.R.A.S, the robot car. T.A.R.A.S is actually a backronym; I took the name from a business mentor of mine who helped me get started. After scratching my head trying to come up with something, I finally figured out how to turn my friend Taras into T.A.R.A.S, this Amazing Raspberry-Pi Automated Security agent. As you can probably tell from the name, T.A.R.A.S will monitor things for us and act as an automated security guard.

T.A.R.A.S will use Raspberry Pi for a brain and motor driver boards to control both the movement of its camera gimbal and wheels. T.A.R.A.S will also have sensory inputs as well as LED and buzzer outputs. T.A.R.A.S will be an aggregation of the skills we have acquired throughout this book.

We will spend this chapter building T.A.R.A.S and writing code to control it.

The following topics will be covered in this chapter:

The parts of the robot car



Building the robot car





The parts of the robot car





I designed T.A.R.A.S to be as simple to put together as possible. T.A.R.A.S consists of a laser cut hardboard chassis, 3D printed wheel, and camera mount parts (there is an option to use laser cut wheel mounts, too). In order for you to build T.A.R.A.S, I have provided SVG files for the chassis and STL files for the 3D printed parts. All other parts may be purchased online. The following is a photo of T.A.R.A.S. before assembly:





Servo camera mount (shown assembled)—search www.aliexpress.com for a camera platform anti-vibration camera mount

3D printed bracket (camera brace)

DC motors for wheels (shown with motor wires and extension wires attached)—search www.aliexpress.com for a smart car robot plastic tire wheel

Wheel mounts (3D printed)

LEDs

LED holders—search www.aliexpress.com for a lamp LED holder black clip

Camera mount brace (laser cut)

Active buzzer—search www.aliexpress.com for a 5V active buzzer

Distance sensor (HC-SR04)—search www.aliexpress.com for an HC-SR04

Alternative wheel mounts (laser cut)



Raspberry Pi camera (long lens version, shown without cable)—search www.aliexpress.com

Motor driver plate (laser cut)

Wheels—search www.aliexpress.com for a smart car robot plastic tire wheel

Robot car chassis (laser cut)

Motor driver board—search www.aliexpress.com for an L298N motor driver board module

DC barrel jack (shown with wires attached)—www.aliexpress.com

Adafruit 16-Channel PWM/Servo HAT—https://www.adafruit.com/product/2327

Raspberry Pi

40-pin single-row male pin header connector strip (not shown)—www.aliexpress.com

Various loose wires and breadboard jumper wires (not shown)—it's a good idea to buy many different wires and breadboard jumper wires; you can search www.aliexpress.com for breadboard jumper wires

Heat shrink (not shown)

7.4V rechargeable battery with DC jack (not shown)—search www.aliexpress.com for a 7.4V 18650 Li-ion lithium ion rechargeable battery pack (be sure to pick one that fits with the DC barrel jack in 16)

Alternatively to part 22, you may use an AA sized power battery storage case box instead of parts 16 and 22—www.aliexpress.com

Mini breadboard (not shown)—search www.aliexpress.com for an SYB-170 mini solderless prototype experiment test breadboard

Various standoffs (not shown)—it should be able to have a standoff height of at least 40 mm; it's a good idea to have as many standoffs as you can as they always seem to come in handy, and you can search www.aliexpress.com for standoffs in electronics

330 and 470 Ohm resistors (not shown)—it's a good idea to buy many resistors as they do indeed come in handy; search www.aliexpress.com for a resistor pack

Portable USB power pack (not shown)—this type is used to charge cell phones on the go; we will use this power pack to power the Raspberry Pi





Building the robot car


The following are the steps to build T.A.R.A.S, our robot car. Your version of T.A.R.A.S may be built close to the one used in this book or you may make modifications as desired. For one thing, I am using a Raspberry Pi camera module with a longer lens (night-vision models have longer lenses). I am also using the Adafruit 16-Channel PWM/Servo HAT to drive the servos for the camera mount. You may choose to use another board or forgo the servos altogether and mount the camera in a fixed position.

One of my favorite robot backronyms is Vincent from the 1980s Disney movie The Black Hole. Vincent, or more accurately, V.I.N.CENT, stands for Vital Information Necessary Centralized. If you know the movie, you will know that V.I.N.CENT is quite clever and very polite. V.I.N.CENT is also a bit of a know-it-all and can be a little irritating at times.

I have included two different ways to mount the wheel motors: using a 3D printed wheel mount or using a laser cut wheel mount. I prefer the 3D printed brace as it allows for the screws to be countersunk, thereby providing more space between the chassis and the wheel.

If you are 3D printing the wheel mounts and camera brace yourself, you may use whichever solid filament type you desire. Personally, I used PETG as I like the way it bends without breaking. PLA is fine as well. Be sure to 3D print the wheel mounts on their sides so that they print wide and not high. This will result in a print that may be a little messy around the holes (for PETG, at least), but it will be a much stronger part. I managed to print a single wheel mount in 30 minutes and the camera brace in about 90 minutes.

Building the robot car should take an afternoon of your time.





Step 1 – Adafruit 16-Channel PWM/Servo HAT for Raspberry Pi


If you haven't heard of it, there is this amazing company in New York City that caters to electronics hobbyists around the world called Adafruit. Adafruit creates many HATs (Hardware Added on Top) for Raspberry Pi, including the one we will use for our robot, the Adafruit 16-Channel PWM/Servo HAT.

With this HAT, the repetitive time pulses needed to control servos are offloaded from Raspberry Pi and onto the HAT. With this HAT, you may control up to 16 servos.

The following is a photo of the HAT and the headers that come with it:

For our purposes, we need to solder headers onto the board:

As we are only using two servos, solder two of the 3 pin servo headers to the board.

Solder the 2 X 20 pin header. A good way to hold the board and pins in place while soldering is to use some Play-Doh! (make sure you don't go too close to the Play-Doh! with the hot soldering iron while soldering):





As we will be using wires from our motor board to power the servo board, solder the power header onto the board.



We need to access GPIO pins from Raspberry Pi, so another pin row must be added. Break off 25 pins from a 40-pin pin header connector. Solder the pins onto the board:





Step 2 – Wiring up the motors


We need to wire up the motors so that two always spin at the same time and in the same direction:

Cut eight equal pieces of wire and strip a little insulation off both ends of all pieces:





Solder an end to each terminal on the motors:





Apply heat shrink to the terminal to insulate it:





Group and connect the wires from each motor so that the wire on the top of one motor connects to the wire on the bottom of the other motor (see photo for clarity):





For extra strength and protection, you may use heat shrink to keep the wires together (in the previous photo, a yellow heat shrink is used).

Extension wires may be added to the ends (I have chosen to do this for my build as the wire length was a little short). The blue labeling tape added to the ends will help out later one when wiring the motors up to the motor driver board:





Step 3 – Assembling the servo camera mount


With our servo camera mount, T.A.R.A.S has the ability to move its head side to side and up and down. This will come in handy for our project in Chapter 23, Controlling the Robot Car Using Python. When you pour the pieces of the servo camera mount onto the table, it may seem a little daunting as to how you are going to assemble it into something useful.

The following is a photo of the parts of the servo camera mount. Rather than try to name the parts, I'll just put letters down and refer to the letters for assembly:

To assemble the servo camera mount do the following:

Place part E inside of part A so that the protruding cylinder from part E is facing up:





Flip over and screw part E to part A by using the smallest screws in the pack:





Screw a servo into part D using small screws (see the following photo):





Place part B over the servo and insert part F into the groove made for it. Screw part F into place. The servo should be able to move freely up and down while attached to parts B and F:





Flip the assembled part over and insert the other servo into part B:





Place part C over the servo. You may have to bend part D a bit to get part C to fit:





Flip the assembled part over and screw parts B and C together:





Insert the assembled part into part E:





Screw part A to the bottom of the assembled part:





Step 4 – Attaching the head


Let's face it. A robot just isn't a robot unless it has a face of some sort (with apologies to R2D2). In this step, we will attach the parts to build the head and face of T.A.R.A.S.

According to Rodney Brooks, founder of Rethink Robotics, robots do not have faces just to make them friendly. Faces on robots are used as visual cues for humans to pick up on. For example, if a robot moves its head in a certain direction, we can safely assume that the robot is analyzing something in that direction. When we move the head of T.A.R.A.S, we are giving cues to those around us that T.A.R.A.S is looking that way.

The following is a photo of the parts needed to complete the head:

We will now assemble the head of T.A.R.A.S. The following is a list of the parts:

A: Raspberry Pi camera module

B: Camera mount brace

C: Assembled camera mount with servos

D: 3D printed bracket

E: Distance sensor

F: Screw



To assemble the head, do the following:

Apply small pieces of double-sided foam tape to the Raspberry Pi camera module and distance sensor:





Stick the Raspberry Pi camera module and distance sensor in place in the appropriate places on the 3D printed bracket (see the following photo for clarification):





Slide the assembly into place on the assembled camera mount and screw it into place (see the following photo for clarification):





Add female-to-female jumpers to the distance sensor's pins. Here, I have used a four-pin connector to 4 individual pins. You may use separate jumpers instead:





Turn the assembled piece around and apply the sticker for teeth:





Step 5 – Assembling the DC motor plate


The DC motor plate is at the back of T.A.R.A.S and houses the DC motor driver that moves the wheels. The DC Barrel Jack and tail light LEDs also sit on the DC motor plate. We will start this step by creating the tail light LEDs.

The following photo shows the parts that are needed to make the tail light LEDs:

The following is a list of the parts:

A: Red jumper wires (one end must be female)

B: Brown jumper wires (one end must be female)

C: Red LED

D: Green LED

E: 330 Ohm resistors

F: Heat shrink



The following are the steps to create the LED tail lights:

Solder a 330 Ohm resistor to the anode (longer leg) of the LED.

Apply heat shrink to the connection to provide strength and insulation.

Strip one end of a red jumper wire (make sure that the other end is female) and solder it to the end of the resistor. This is the positive end of the assembly:





Apply heat shrink over the entire resistor:





Solder a brown wire to the cathode and apply heat shrink (in this photo, we show a red LED with an extended brown wire). This is the negative end of the assembly:





Now that we have completed the assembly of the two tail lights, let's put the DC motor board together. The following is a photo of the pieces we need to put the DC motor board together:





The following is a list of the parts:

A: Red tail light

B: Green tail light

C: Short power wire

D: Motor driver board

E: DC motor plate (laser cut)

F: LED holders

G: DC barrel jack

H: 40 mm standoffs

Eight M3X10 bolts (not shown)

Four M3 nuts (not shown)

Zip ties (not shown)



Let's start putting it together:

Screw the 40 mm standoffs (H) to E using four 10 mm M3 bolts. Refer to the following photo for the proper orientation:





Screw the motor driver board (D) to E using four 10 mm M3 bolts and nuts. Refer to the following photo for the proper orientation:





Here is the side view:

Attach wire C to the DC barrel jack (G) ports. Make sure that the red wire goes to positive and that the black goes to negative. Attach the other end of wire C into the motor driver board (D). Make sure that the red wire goes to VCC and that the black wire goes to GND. Secure the DC barrel jack (G) to the DC motor plate (E) with zip ties. See the following photo for clarification:





Here is the wiring diagram:

Alternatively, you may use an AA battery four-pack for power. Be sure to follow the same wiring with the red wire connected to VCC and the black wire connected to GND:





Thread the tail light (B) through the LED holes and through an LED holder (F):





Push the LED holder (F) into place. If the hole is too tight, use a small file to make the hole a little bigger (the LED holder should fit in tight). Repeat for the red tail light:





Step 6 – Attaching the motors and wheels


In this step, we will begin attaching parts to the chassis. We will start by securing the wheel mounts, followed by the motors. The wheel mounts we will use in this step are the 3D printed ones.

The parts needed for this step are shown in the following photo:

The following is a list of the parts:

A: Wheels

B: Motors

C: Alternative wheel mounts (laser cut)

D: Wheel mounts (3D printed)

E: Robot car chassis (laser cut)

Eight M3 10 mm bolts (not shown)

Eight M3 30 mm bolts (not shown)

16 M3 nuts (not shown)



Let's start putting it together:

Using the 10 mm M3 bolts and nuts, attach each wheel mount (D) to the chassis (E) so that the head of the bolt sinks flat into the wheel mount (D). Refer to the following photo for clarification:





Using 30 mm M3 bolts and M3 nuts, mount the motors (B) onto the chassis (E) by using the wheel mount (D). Ensure that the head of the bolt is sunk flat. Refer to the following photo for clarification:





Alternatively, you may use part C instead of part D to mount the wheels. See the following photo for clarification:





Attach the wheels (A) to the motors (B):





Step 7 – Wiring up the motors





Next, we will attach the motor drive plate assembly and wire up the wheel motors:





Start by securing the DC motor plate assembly from step 5 to the top of the chassis using four M3 10 mm bolts. Be sure to thread the wires from the wheel motors through the central hole. The tail light LEDs should go to the back of the robot car. See the following photo for clarification:





Install the wires from the wheel motors into terminal blocks OUT1, OUT2, OUT3, and OUT4 on the motor driver board. The right wires should be connected to OUT1 and OUT2 and the left wires should be connected to OUT3 and OUT4. At this point, it does not matter which of the right wires goes to OUT1 or OUT2 (or left wires regarding OUT3 and OUT4). See the following photo for clarification:





Step 8 – Attaching the camera mount, Raspberry Pi, and Adafruit servo board


The robot car is starting to look like a robot car. In this step, we will attach the camera mount (or the head of T.A.R.A.S) and Raspberry Pi.

We will start with Raspberry Pi. This is where we must be a little creative in how we mount Raspberry Pi and the Adafruit servo board to the chassis. The Adafruit servo board is an amazing little board, but the kit lacks the standoffs needed to keep part of the board from touching Raspberry Pi. I found it difficult to put an M3 bolt through the mounting holes on the board. My solution was to use 30 mm of female-to-male standoff to attach Raspberry Pi to the chassis and a 10 mm female-to-female standoff to separate Raspberry Pi from the Adafruit servo board.

The following is a photo of Raspberry Pi with some standoffs I gathered:

Here are the components in the above image:

A: 15 mm female-to-male nylon standoff

B: 10 mm female-to-female nylon standoff

C: Raspberry Pi



To create this circuit do the following:

Create four 30 mm female-to-male standoffs by screwing one end of A into another. Screw the B standoffs onto the A standoffs through Raspberry Pi (see the following photo for clarification):





Secure Raspberry Pi to the chassis using four 10 mm M3 bolts:





Now, let's attach the camera mount, hook up the camera, and install the Adafruit servo board:

Attach the camera mount to the front of the chassis using four 10 mm M3 screws and M3 nuts (see the following photo for clarification):





Insert the ribbon cable from the camera module through the appropriate opening of the Adafruit servo board (see the following photo for clarification):





Secure the Adafruit servo board onto Raspberry Pi:





Step 9 – Attaching the buzzer and voltage divider


The final components to install on the chassis are the buzzer and voltage divider. We need the voltage divider so that we can supply 3.3V to the Raspberry Pi from the echo pin of the distance sensor. For the buzzer, we are using an active buzzer.

An active buzzer omits a sound when a DC voltage is applied to it. Passive buzzers require an AC voltage. More coding is required for a passive buzzer. Passive buzzers are more like little speakers and, as such, you can control the sound coming from them.



The following are the components that are needed to complete this step:

A: Mini breadboard

B: Brown female-to female jumper wire

C: Red female-to-female jumper wire

D: 470 Ohm resistor

E: 330 Ohm resistor

F: Active buzzer



Follow the below steps to complete the circuit :

To create a voltage divider, place the 330 Ohm (E) and 470 Ohm (D) resistors in series on the breadboard (A):





Connect the red jumper (C) to the positive terminal of the buzzer and the brown jumper (B) to the other terminal:





Install the buzzer (F) in the appropriate hole on the chassis. Using double-sided foam tape, attach the mini breadboard (A) to the front of the chassis (see the following photo for clarification):





Step 10 – Wiring up T.A.R.A.S


Now for the part you have been waiting for: hooking up all the wires! OK, maybe sorting through a rat's nest of wires to make sense of them is not your idea of a good time. However, with a little patience this step, will be over before you know it.

Referring to the following wiring diagram, connect all the wires to their appropriate places. The power and motor connections to the motor driver board are not included in our wiring diagram as we took care of that in step 7,Wiring up the motors. I have taken care to group wire colors by their uses. Please note that the wiring diagram is not to scale:



To wire up T.A.R.A.S, perform the following connections:

Pin five from Servo HAT to In1 on the L298N (motor board)

Pin six from Servo HAT to In2 on the L298N (motor board)

Pin 27 from Servo HAT to In3 on the L298N (motor board)

Pin 22 from Servo HAT to In4 on the L298N (motor board)

Trig from HC-SR04 (distance sensor) to pin 17 on Servo HAT

Echo from HC-SR04 (distance sensor) to the left-hand side of the 330 Ohm resistor on the mini breadboard

VCC from HC-SR04 (distance sensor) to 5 Volts on Servo HAT

Output from the voltage divider to pin 18 on Servo HAT

GND from HC-SR04 to the right-hand side of the 470 Ohm resistor on the mini breadboard

GND from the mini breadboard to the GND on Servo HAT

+5V from the Servo HAT power terminal (left of the HAT) to +5V on the motor driver board (use a thicker wire)

GND from the Servo HAT power terminal (left of the HAT) to the GND on the motor driver board (use a thicker wire)

Servo from the bottom of the camera mount (pan) to servo zero on Servo HAT

Servo from the middle of the camera mount (tilt) to servo one on Servo HAT

Red wire from green tail light to pin 20 on the Servo HAT

Brown wire from green tail light to GND on Servo HAT

Red wire from red tail light to pin 21 on Servo HAT

Brown wire on red tail light to GND on Servo HAT

Red wire from active buzzer to pin 12 on Servo HAT

Brown wire from active buzzer to GND on Servo HAT



To power up T.A.R.A.S, we will use two portable power supplies. For Raspberry Pi, we will use a standard USB portable power pack. For the motor driver board and Servo HAT, we will use a rechargeable 7.4V battery. To install the batteries, do the following:

The following are the two batteries we will be using for our robot car. The one on the left is for Raspberry Pi and uses a USB-to-micro-USB connector. The one on the right is the motor driver board and uses a standard DC jack:





Apply peel-and-stick velcro strips to both batteries and to the chassis and put the batteries into place on the chassis:





After some much-needed grooming (cleaning up the wires), T.A.R.A.S is ready to go:





Learning how to control the robot car





In Chapter 23, Controlling the Robot Car Using Python, we will start writing code to control T.A.R.A.S. Before we jump into the code, it's a good idea to look at how we may set up Raspberry Pi to access the interfaces that are needed. We should install the libraries we need to use to create the control code.





Configuring our Raspberry Pi





To ensure that we have the inferences that we require enabled for the robot car, do the following:





Navigate to Application Menu | Preferences | Raspberry Pi Configuration

Click on the Interfaces tab



Enable Camera, SSH, and I2C. You may need to restart your Raspberry Pi:





If you haven't changed the default password for the pi user, you may get a warning about it after you enable SSH. It's a good idea to change the password from the default. You may change it under the System tab in the Raspberry Pi Configuration tool.





Python library for Adafruit Servo HAT





In order to access the Adafruit Servo HAT, you must download and install the library:





git is used to download the Adafruit Servo HAT library from the internet. Open up a Terminal in Raspbian and type the following:



sudo apt-get install -y git build-essential python-dev

If git is already installed, you will get a message indicating that. If not, proceed to install git.

Type the following into the Terminal to download the library:



git clone https://github.com/adafruit/Adafruit_Python_PCA9685.git

Type the following to change directories:



cd Adafruit_Python_PCA9685

Install the library with the following command:



sudo python3 setup.py install

The library has been installed successfully to Tools | Manage Packages in Thonny. You should see it listed:





Summary





In this chapter, we built our robot car, T.A.R.A.S. We started by outlining the parts and then proceeded to put it all together. If you have never built a robot before, then congratulations! You've officially entered the world of robotics. Where you take it from here is up to you.

For the rest of this book, we will be programming T.A.R.A.S to perform tasks. In Chapter 23, Controlling the Robot Car Using Python, T.A.R.A.S will be called upon to engage in a secret mission.





Controlling the Robot Car Using Python


In Chapter 22, Introducing the Raspberry Pi Robot Car, we built our T.A.R.A.S robot car. At the end of the chapter, we discussed how we could control T.A.R.A.S through code. In this chapter, we will start writing code to do just that.

We will start out by writing simple Python code, and then utilize the GPIO Zero library to make the car wheels move forward, move the servo motors holding the camera, and light up the LEDs at the back of the robot car.

We will then organize our code using classes, before enhancing it further, as we send T.A.R.A.S off on a secret security mission.

The following topics will be covered in this chapter:

Taking a look at the Python code



Modifying the robot car Python code

Enhancing the code





Knowledge required to complete this chapter


If you have jumped to this chapter without going through the projects in the previous chapters, let me outline the skills you need to complete the following projects. We will, of course, have to know how to get around the Raspbian OS in order to find our Integrated Development Environment (IDE).

After you have finished programming T.A.R.A.S, you may be inclined to take your new skills and compete against other people building Raspberry Pi robots. Pi Wars (https://piwars.org/) is such a place to do just that. Pi Wars is an international robotics competition that takes place in Cambridge in the UK. Up to 76 teams compete in challenge-based robotics competitions over the course of a weekend. Even though it is called Pi Wars, you can rest assured that you will not come back with a box of broken parts, as each of the competitions are non-destructive challenges. Check out https://piwars.org/, or search for Pi Wars videos on YouTube for more information.

As well, a working knowledge of Python is needed, as we will be doing all our coding in this chapter in Python. Since I like to use an object-oriented approach as much as I can, some knowledge of Object-Oriented Programming (OOP) will help you to benefit more from this chapter as well.





Project overview


In this chapter, we will program T.A.R.A.S to dance around the table and take photographs. The projects in this chapter should take a few hours to complete.





Getting started


To complete this project, the following will be required:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A completed T.A.R.A.S robot car kit (see Chapter 22, Introducing the Raspberry Pi Robot Car)





Taking a look at the Python code





In a way, our robot car project is like an overview of the code we've done in previous chapters. Through the use of Python and the amazing GPIO Zero library, we are able to read sensory data from the GPIO and control output devices by writing to GPIO pins. In the following steps, we will start with very simple Python code and the GPIO Zero library. If you have completed some of the earlier projects in the book, the code will seem quite familiar to you.





Controlling the drive wheels of the robot car


Let's see if we can make T.A.R.A.S move a little. We will start by writing some basic code to move the robot car back and forth:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following code into the file:



from gpiozero import Robot

from time import sleep



robot = Robot(left=(5,6), right=(22,27))

robot.forward(0.2)

sleep(0.5)

robot.backward(0.2)

sleep(0.5)

robot.stop()

Save the file as motor-test.py

Run the code



You should see the robot car move forward for 0.5 seconds, before moving backward for the same amount of time. If there was nothing in the way, the robot car should have returned to the same position it started from. The code is pretty self-explanatory; however, we will go over it now.

We start off by importing the libraries we need: Robot and sleep. After that, we instantiate a Robot object, called robot, and configure it to have the 5 and 6 pins for the left-hand side motors, and 22 and 27 for the right-hand side motors. After that, we move the robot forward at a speed of 0.2. In order for the robot to go faster, we increase this value. After a short delay, we return the robot back to its original position with the robot.backward(0.2) command.

One thing to take note of is the way the motors spin, and keep spinning, until they are stopped with the robot.stop() command.

If you found that the motors did not move the way they should, it is because of the wiring. Try experimenting with the wiring and changing the pin numbers for the Robot object (left=(5,6), right=(22,27). It may take a few tries to get it right.





Moving the servos on the robot car





We will now test the servo motors. To do this, we will pan the robot camera mount (the robot's head) from right to left:





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following code into the file:



import Adafruit_PCA9685

from time import sleep



pwm = Adafruit_PCA9685.PCA9685()

servo_min = 150

servo_max = 600



while True:

pwm.set_pwm(0, 0, servo_min)

sleep(5)

pwm.set_pwm(0, 0, servo_max)

sleep(5)



Save the file as servo-test.py

Run the code





You should see the robot head move all the way to the right, wait for 5 seconds, and then move all the way to the left.

In the code, we start by importing the Adafruit_PCA9685 library. After importing the sleep function, we then create a PCA9685 object that we call pwm. This is, of course, an object built with code from Adafruit to support the HAT. We then set the minimum and maximum values that the servo can move, with servo_min and servo_max respectively.

If you are not getting the results you expect, experiment with the servo_min and servo_max values. We touch a bit on servos in Chapter 14, Controlling a Servo with Python.





Taking a picture





You may remember using the Raspberry Pi camera from previous chapters; in particular, Chapter 18, Building a Home Security Dashboard, where we used it to take a picture for our security application. Since T.A.R.A.S will be our trusty security agent, it makes sense for it to have the ability to take pictures. Let's write some code to test out that the camera is working on our robot car:





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Enter the following code:



from picamera import PiCamera

import time



camera = PiCamera()

camera.capture("/home/pi/image-" + time.ctime() + ".png")





Save the file as camera-test.py

Run the code



If everything is set up correctly, you should see an image file in your /home/pi directory, with the name image, followed by today's date.





Making a beep noise





Our security agent is limited to making a noise in order to alert us and scare away potential intruders. In this section, we will test the active buzzer installed on T.A.R.A.S.

The old British police whistle was one of the earliest and trusted pieces of equipment that police officers of the past had to defend themselves. With its unique sound, the police whistle allowed officers to communicate with each other. Despite the fact that police whistles are no longer in use, its legacy has left its impact on society, such that the term 'Whistle Blower' is used to this day to refer to someone exposing hidden injustices or corruption.





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following code into the file:



from gpiozero import Buzzer

from time import sleep



buzzer = Buzzer(12)

buzzer.on()

sleep(5)

buzzer.off()

Save the file as buzzer-test.py

Run the code



You should hear the buzzer sound for 5 seconds, before shutting off.





Making the LEDs blink


On the back of T.A.R.A.S, we have installed two LEDs (preferably, one red one and one green one). We have used simple GPIO Zero library commands to blink LEDs before, so that shouldn't be a challenge for us. Let's take this a step further, and create code that we can use to encapsulate LED blinking patterns:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file



Type the following code:



from gpiozero import LEDBoard

from time import sleep



class TailLights:



led_lights = LEDBoard(red=21, green=20)



def __init__(self):

self.led_lights.on()

sleep(0.25)

self.led_lights.off()

sleep(0.25)



def blink_red(self, num, duration):

for x in range(num):

self.led_lights.red.on()

sleep(duration)

self.led_lights.red.off()

sleep(duration)



def blink_green(self, num, duration):

for x in range(num):

self.led_lights.green.on()

sleep(duration)

self.led_lights.green.off()

sleep(duration)



def blink_alternating(self, num, duration):

for x in range(num):

self.led_lights.red.off()

self.led_lights.green.on()

sleep(duration)

self.led_lights.red.on()

self.led_lights.green.off()

sleep(duration)

self.led_lights.red.off()



def blink_together(self, num, duration):

for x in range(num):

self.led_lights.on()

sleep(duration)

self.led_lights.off()

sleep(duration)



def alarm(self, num):

for x in range(num):

self.blink_alternating(2, 0.25)

self.blink_together(2, 0.5)





if __name__=="__main__":



tail_lights = TailLights()

tail_lights.alarm(20)



Save the file as TailLights.py

Run the code





You should see a 20-second long, blinking display from the LEDs. Of note in our code, however, is the use of the LEDBoard class from the GPIO Zero library, as follows:

led_lights = LEDBoard(red=21, green=20)

In this code, we instantiate an object, called led_lights, from the LEDBoard class, and configure it with the values of red and green, pointing to the 21 and 20 GPIO pins respectively. By using LEDBoard, we are able to control the LEDs separately or as one unit. The blink_together method controls the LEDs as one unit, as follows:

def blink_together(self, num, duration):

for x in range(num):

self.led_lights.on()

sleep(duration)

self.led_lights.off()

sleep(duration)

Our code is rather self explanatory; however, there are few other things we should point out. When we initialize the TailLights object, we give the LEDs a short blink to signify that the object has been initialized. This allows for troubleshooting later on; although, if we feel that the code is redundant, then we can remove it later instead:

def __init__(self):

self.led_lights.on()

sleep(0.25)

self.led_lights.off()

sleep(0.25)

Keeping the initialization code in place may come in handy though when we want to ensure that our LEDs have not been disconnected (after all, who hasn't disconnected something when trying to connect something else?). To do this from the shell, type the following code:

import TailLights

tail_lights = TailLights.TailLights()

You should see the LEDs blink for half a second.





Modifying the robot car Python code


Now that we have tested the motors, servos, camera, and LEDs, it's time to modify the code into classes to give it more unity. In this section, we will make T.A.R.A.S dance.





Move the wheels


Let's start by encapsulating the code that moves the wheels on the robot car:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following code into the file:



from gpiozero import Robot

from time import sleep



class RobotWheels:



robot = Robot(left=(5, 6), right=(22, 27))



def __init__(self):

pass



def move_forward(self):

self.robot.forward(0.2)



def move_backwards(self):

self.robot.backward(0.2)



def turn_right(self):

self.robot.right(0.2)



def turn_left(self):

self.robot.left(0.2)



def dance(self):

self.move_forward()

sleep(0.5)

self.stop()

self.move_backwards()

sleep(0.5)

self.stop()

self.turn_right()

sleep(0.5)

self.stop()

self.turn_left()

sleep(0.5)

self.stop()



def stop(self):

self.robot.stop()



if __name__=="__main__":



robot_wheels = RobotWheels()

robot_wheels.dance()



Save the file as RobotWheels.py

Run the code



You should see T.A.R.A.S do a little dance in front of you. Be sure to keep the wires that connect to T.A.R.A.S loose, so that T.A.R.A.S can do its thing. Who says that robots can't dance?

The code is pretty self explanatory. Of note, though, is the way we call the move_forward, move_backwards, turn_left, and turn_right functions from the dance method. We could actually parameterize the amount of time between the moves, but that would complicate things a little more than need be. The delay of 0.5 seconds (coupled with the hardcoded speed of 0.2) seems to be perfect for a dancing robot that does not fall off the desk. Think of it as T.A.R.A.S being on a very crowded dance floor with little room to move.

But wait, there's more. T.A.R.A.S can also move its head, light up, and make some noise. Let's start to add these moves.





Move the head


Since the camera on T.A.R.A.S is attached to the head, it makes sense to encapsulate the head movements (camera mount servos) with the camera functionality:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following code into the file:



from time import sleep

from time import ctime

from picamera import PiCamera

import Adafruit_PCA9685



class RobotCamera:



pan_min = 150

pan_centre = 375

pan_max = 600

tilt_min = 150

tilt_max = 200

camera = PiCamera()

pwm = Adafruit_PCA9685.PCA9685()



def __init__(self):

self.tilt_up()



def pan_right(self):

self.pwm.set_pwm(0, 0, self.pan_min)

sleep(2)



def pan_left(self):

self.pwm.set_pwm(0, 0, self.pan_max)

sleep(2)



def pan_mid(self):

self.pwm.set_pwm(0, 0, self.pan_centre)

sleep(2)



def tilt_down(self):

self.pwm.set_pwm(1, 0, self.tilt_max)

sleep(2)



def tilt_up(self):

self.pwm.set_pwm(1, 0, self.tilt_min)

sleep(2)



def take_picture(self):

sleep(2)

self.camera.capture("/home/pi/image-" + ctime() + ".png")



def dance(self):

self.pan_right()

self.tilt_down()

self.tilt_up()

self.pan_left()

self.pan_mid()



def secret_dance(self):

self.pan_right()

self.tilt_down()

self.tilt_up()

self.pan_left()

self.pan_mid()

self.take_picture()





if __name__=="__main__":



robot_camera = RobotCamera()

robot_camera.dance()

Save the file as RobotCamera.py

Run the code



You should see T.A.R.A.S move its head to the right, then down, then up, and then all the way to the left, before returning to the middle and stopping.

Again, we try and write our code so that it is simple to figure out. The init method, called when a RobotCamera object is instantiated, ensures that T.A.R.A.S has its head up before moving it:

def __init__(self):

self.tilt_up()

By calling the RobotCamera class, we structure our code to view the servos and movement of the robot car's head as part of operating the camera. Although we don't use the camera in our example, we will be using it soon. The values that are set for the minimum and maximum servo position were determined though trial and error as follows:

pan_min = 150

pan_centre = 375

pan_max = 600

tilt_min = 150

tilt_max = 200

Play around with these values to make it suit your build of the T.A.R.A.S robot car.

The dance and secret_dance methods perform a series of moves with the head of the robot car to simulate dancing. They are basically the same method (with the exception of the take_picture call at the end) of the secret_dance method that takes a picture with the Raspberry Pi camera and stores it in the home directory with a date-based name.





Make sounds


Now that T.A.R.A.S can move its body and head, it's time to make some noise:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following code into the file



from gpiozero import Buzzer

from time import sleep



class RobotBeep:



buzzer = Buzzer(12)

notes = [[0.5,0.5],[0.5,1],[0.2,0.5],[0.5,0.5],[0.5,1],[0.2,0.5]]



def __init__(self, play_init=False):



if play_init:

self.buzzer.on()

sleep(0.1)

self.buzzer.off()

sleep(1)



def play_song(self):



for note in self.notes:

self.buzzer.on()

sleep(note[0])

self.buzzer.off()

sleep(note[1])





if __name__=="__main__":



robot_beep = RobotBeep(True)

Save the file as RobotBeep.py

Run the code



You should hear a short beep coming from the active buzzer on T.A.R.A.S. This seems like a lot of code just to do that, doesn't it? Ah, but wait until the next section, when we take full advantage of the RobotBeep class.

The init function of RobotBeep allow us to turn on and off the initial beep that is heard once the class is instantiated. This is good for testing that our buzzer actually works, which we do by passing True to the class when we are creating the robot_beep object:

robot_beep = RobotBeep(True)

The notes list and play_song methods perform the actual magic of the class. The list is actually a list of lists, as each value represents the time the buzzer plays or rests:

for note in self.notes:

self.buzzer.on()

sleep(note[0])

self.buzzer.off()

sleep(note[1])

Cycling through the notes list, look at the note variable. We use the first element as the length of time for which to keep the buzzer on, and the second element as the amount of time to rest before turning the buzzer back on. In other words, the first element determines the length of the note, and the second the space between that note and the next note. The notes list and play_song method give T.A.R.A.S the ability to sing (albeit without a melody).

We will use the play_song method in our next section.





Enhancing the code





It's a cold, dark, and dreary December night. Not much is known about our adversaries, but we do know that they like to dance. T.A.R.A.S has been assigned to a local dance club located deep into enemy territory. All of the persons of interest are there on this night. Your mission, should you choose to accept it, is to write a program to have T.A.R.A.S take secret photos at the club. However, it must not look like T.A.R.A.S is taking photos. T.A.R.A.S has to dance! If our adversaries found out that T.A.R.A.S was taking photos, that would be bad. Really bad! Think C3PO in the Empire Strikes Back bad.





Stitching our code together


So, we have the ability to make T.A.R.A.S move its head and body, make sounds, light up, and take pictures. Let's put all of this together so that we may complete the mission:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following into the file:



from RobotWheels import RobotWheels

from RobotBeep import RobotBeep

from TailLights import TailLights

from RobotCamera import RobotCamera



class RobotDance:



light_show = [2,1,4,5,3,1]



def __init__(self):



self.robot_wheels = RobotWheels()

self.robot_beep = RobotBeep()

self.tail_lights = TailLights()

self.robot_camera = RobotCamera()





def lets_dance_incognito(self):

for tail_light_repetition in self.light_show:

self.robot_wheels.dance()

self.robot_beep.play_song()

self.tail_lights.alarm(tail_light_repetition)

self.robot_camera.secret_dance()



if __name__=="__main__":



robot_dance = RobotDance()

robot_dance.lets_dance_incognito()





Save the file as RobotDance.py

Run the code



You should see T.A.R.A.S perform a series of moves before secretly taking a picture. If you check the Raspberry Pi home folder after the dance is done, you should see six new photos.

Something of note in our code is the use of the list called light_show. We use this list in two ways. First, the values stored in the list are passed to the alarm method of the TailLights object that we instantiate in our RobotDance class. We do this with the tail_light_repetition variable in the lets_dance_incognito method, as shown here:

def lets_dance_incognito(self):

for tail_light_repetition in self.light_show:

self.robot_wheels.dance()

self.robot_beep.play_song()

self.tail_lights.alarm(tail_light_repetition)

self.robot_camera.secret_dance()

As you can see in the previous code, the variable of the TailLights class for the alarm method is named tail_lights. This will cause the LEDs to go through their sequence a number of times, based on the value of tail_light_repetition. For example, when the value of 2 is passed into the alarm method (the first value in the light_show list), the LED sequence will be performed twice.

We run the lets_dance_incognito method six times. This is based on the number of values in the light_show list. This is the second way in which we use light_show. In order to increase or decrease the number of times that T.A.R.A.S performs the dance, we can either add or subtract some numbers from the light_show list.

As we are calling the secret_dance method on the RobotCamera object named robot_camera, for each value in the light_show list (in this case, six), we should have six photos in our home directory with date-based names after the dance is done.

After T.A.R.A.S performs its dance, check the home directory for pictures T.A.R.A.S took during the dance. Mission accomplished!





Summary





By the end of this chapter, you should be familiar with controlling a Raspberry Pi-powered robot with Python code. We started off by simply getting the various components on the robot car to work using simple code. After we were satisfied that the robot car does indeed move using our Python commands, we encapsulated the code in classes in order to make it easier to work with. This resulted in the RobotDance class, that contained calls to classes, which, in turn, encapsulated the control code for our robot. This allowed us to use the RobotDance class as a black box, abstracting away control code, and allowing us to focus on the task of designing dance steps for T.A.R.A.S.

In Chapter 24, Connecting Sensory Inputs from the Robot Car to the Web, we will pull sensory information from T.A.R.A.S (the distance sensor values) and publish it to the web, before unleashing T.A.R.A.S from the wires on the desktop and setting it free.





Connecting Sensory Inputs from the Robot Car to the Web





In order to make our robot car, T.A.R.A.S, a true IoT thing, we have to connect T.A.R.A.S to the internet. In this chapter, we will start the transformation from desktop robot to internet robot by connecting the distance sensor from T.A.R.A.S to the web.

The following topics will be covered in this chapter:





Identifying the sensor on the robot car

Reading robot car sensory data with Python

Publishing robot car sensory data to the cloud





Knowledge required to complete this chapter





To complete this chapter, you should have built a T.A.R.A.S robot car, as described in detail in Chapter 22, Introducing the Raspberry Pi Robot Car. As with the other chapters in this book, a working knowledge of Python is required, as well as a basic understanding of object-oriented programming.





Project overview


The project in this chapter will involve sending sensory distance data from T.A.R.A.S to the internet. We will create an online dashboard using ThingsBoard, which will display this distance information on an analogue gauge.

This project should take a couple of hours to complete.





Getting started


To complete this project, the following will be required:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A completed T.A.R.A.S robot car kit (see Chapter 22, Introducing the Raspberry Pi Robot Car)





Identifying the sensor on the robot car


Throughout the course of the book, we have used a few input sensors. We have also published data from these sensors to the web. T.A.R.A.S. uses a distance sensor to detect objects close by, as can be seen in the following picture:

Looking at T.A.R.A.S for the first time, you would be forgiven for not knowing where the distance sensor is located. On T.A.R.A.S, and many other robots, this sensor is located in the eyes.

The following is a photo of the HC-SR04 distance sensor—the one used on T.A.R.A.S:

If you do a Google image search for HC-SR04 on robots, you will see many, many robots that use this sensor. It is a very popular choice due to its low cost and wide availability, as well as its handy resemblance to eyes.





Taking a closer look at the HC-SR04


As mentioned, the HC-SR04 is a very popular sensor. It is easy to program, and is available from multiple vendors on www.aliexpress.com. The HC-SR04 provides measurements from 2 cm to 400 cm, and is accurate to within 3 mm.

The GPIO Zero library makes it easy to read data from the HC-SR04. The following diagram is a wiring diagram for using this sensor with the Raspberry Pi:



As you can see, the HC-SR04 has four pins, two of which are used for the signal input and output. The wiring diagram is a subdiagram of the one we used to wire up T.A.R.A.S in Chapter 22, Introducing the Raspberry Pi Robot Car. The connections are as follows:

Trig from HC-SR04 (distance sensor) to pin 17 on the Raspberry Pi

Echo from HC-SR04 (distance sensor) to the left side of the 330 Ohm resistor on the breadboard

VCC from HC-SR04 (distance sensor) to 5V on the Raspberry Pi

Output from voltage divider to pin 18 on the Raspberry Pi

GND from HC-SR04 to the right side of the 470 Ohm resistor on the breadboard



The trig, or trigger, is the input of the HC-SR04, and works with 5V or 3.3V. The Echo pin is the output, and is designed to work with 5V. Since this is a little too much for our Raspberry Pi to handle, we use a voltage divider circuit to reduce the voltage to 3.3V.

We could have added further sensors to T.A.R.A.S to make it more advanced, including line-tracking sensors, temperature sensors, light sensors, and PID sensors. The line-tracking sensor is of particular interest, as a simple line could provide T.A.R.A.S with a route to follow during its security patrol duties—a very useful addition. As the design is already complicated enough, I will leave it to you to add this functionality if you choose.

The following diagram outlines how a line-tracking sensor works:



In the diagram, you will see two sensors at the front of the robot car. When the robot car veers off to the side, one of the sensors picks it up. In the previous example, the car in position B has veered to the right. The left sensor picks this up, and the program makes corrections by turning the robot car to the left until it returns to position A.





Reading robot car sensory data with Python





Although we have covered this before, it's a good idea to familiarize (or re-familiarize) ourselves with the programming of the HC-SR04:





Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click New to create a new file.

Type the following:



from gpiozero import DistanceSensor

from time import sleep



distance_sensor = DistanceSensor(echo=18, trigger=17)



while True:

print('Distance: ', distance_sensor.distance*100)

sleep(1)



Save the file as distance-sensor-test.py.

Run the code.

Place your hand in front of the distance sensor. You should see the following in the shell (depending on how far your hand is from the distance sensor):



Distance: 5.05452024001

As you move your hand closer to, or farther away from, the distance sensor, the value will change. This code is pretty self explanatory. The distance_sensor = DistanceSensor(echo=18, trigger=17) line sets up a distance_sensor object of class type DistanceSensor, with the appropriate pin definitions. We retrieve the distance an object is from the HC-SR04 every time we call the distance method of distance_sensor. To convert the value to centimeters, we multiply it by 100.



Now that we are able to retrieve values from the distance sensor, let's modify the code to make it more object-oriented friendly:





Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click New to create a new file

Type the following:



from gpiozero import DistanceSensor

from time import sleep



class RobotEyes:



distance_sensor = DistanceSensor(echo=18, trigger=17)



def get_distance(self):

return self.distance_sensor.distance*100



if __name__=="__main__":



robot_eyes = RobotEyes()



while True:

print('Distance: ', robot_eyes.get_distance())

sleep(1)

Save the file as RobotEyes.py

Run the code



The code should run in exactly the same way as before. The only thing we did was to wrap it up in a class in order to abstract it. This will make things easier as we write more code. We won't have to remember which pins the HC-SR04 is connected to, and we actually don't need to know that it is a distance sensor that we are getting data from. This code makes more sense visually than the previous code.





Publishing robot car sensory data to the cloud





In Chapter 19, Publishing to Web Services, we set up a ThingsBoard account for publishing sensory data. If you have not already done so, set up an account at www.ThingsBoard.io (refer to Chapter 19, Publishing to Web Services, for instructions on how to do this).





Create a ThingsBoard device


To publish our distance sensor data to ThingsBoard, we first need to create a ThingsBoard Device:

Log in to your account at https://demo.thingsboard.io/login

Click on Devices, and then the large orange + sign at the bottom-right corner of the screen:





Type in RobotEyes for the Name, leave the Device type as default, and put in a meaningful description under Description

Click ADD

Click on RobotEyes to get a menu sliding out from the right

Click COPY ACCESS TOKEN to copy the token onto your clipboard

Paste the token into a text file



For our code, we will be using the MQTT protocol. If the Paho MQTT library has not been installed on your Raspberry Pi, do the following:

Open a Terminal application from the Raspberry Pi main toolbar

Type sudo pip3 install pho-mqtt



You should see the library install.

Now it's time to write the code that will publish the sensory data of T.A.R.A.S to the web. We will modify our RobotEyes class:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click New to create a new file

Type the following:



from gpiozero import DistanceSensor

from time import sleep

import paho.mqtt.client as mqtt

import json



class RobotEyes:



distance_sensor = DistanceSensor(echo=18, trigger=17)

host = 'demo.thingsboard.io'

access_token='<<access token>>'



def get_distance(self):

return self.distance_sensor.distance*100



def publish_distance(self):

distance = self.get_distance()

sensor_data = {'distance': 0}

sensor_data['distance'] = distance

client = mqtt.Client()

client.username_pw_set(self.access_token)

client.connect(self.host, 1883, 20)

client.publish('v1/devices/me/telemetry',

json.dumps(sensor_data), 1)

client.disconnect()



if __name__=="__main__":



robot_eyes = RobotEyes()

while True:

print('Distance: ', robot_eyes.get_distance())

robot_eyes.publish_distance()

sleep(5)



Be sure to paste the access token from the text file to the access_token variable

Save the file as RobotEyesIOT.py

Run the code



You should see the distance value in the shell, just as you did before. However, when you go to ThingsBoard and click on Latest Telemetry, you should see the same value, as follows:



What we have accomplished here, just as in Chapter 19, Publishing to Web Services, is the successful transmission of our distance sensor information to the internet. We can now see how close an object is to our robot car from anywhere in the world. In the previous screenshot, we can see that there is something 3.801 cm away.

Once again, we've written the code to be as self-explanatory as possible. However, we should point out the publish_distance method of the class:

def publish_distance(self):

distance = self.get_distance()

sensor_data = {'distance': 0}

sensor_data['distance'] = distance

client = mqtt.Client()

client.username_pw_set(self.access_token)

client.connect(self.host, 1883, 20)

client.publish('v1/devices/me/telemetry',

json.dumps((sensor_data), 1)

client.disconnect()

In this method, we start by creating a variable called distance, which we populate with the actual distance information from our class get_distance method. A Python dictionary object called sensor_data is created, and is used to store the distance value. From there, we create an MQTT client object called client. We set the password to the access_token we copied from ThingsBoard, and then connect using standard ThingsBoard boilerplate code.

The client.publish method sends our sensor_data to ThingsBoard through a json.dumps method. We then disconnect from client to close the connection.

Now, let's create a dashboard widget using our distance sensory data:

In ThingsBoard, click Latest Telemetry, and check the box in the list next to the distance value:





Click SHOW ON WIDGET

Under Current bundle, select Analogue gauges from the drop-down menu, as follows:





Select the last widget:





Click ADD TO DASHBOARD at the top



Create a new dashboard called RobotEyes, and check the Open dashboard box:





Click ADD

Congratulations! We now have created an IoT dashboard widget for the sensory distance information from T.A.R.A.S. With this, we can go fullscreen and view the information easily:





Summary





In this chapter, we turned T.A.R.A.S into a true IoT thing by publishing the distance data—the distance from the eyes of T.A.R.A.S to any object within its view—to the internet. By encapsulating our code into a class called RobotEyes, we can forget that we are dealing with a distance sensor and just focus on the eyes of T.A.R.A.S as behaving sonar-like.

Through the use of the demo platform in ThingsBoard, we are able to write code that sends the distance information from T.A.R.A.S to a dashboard widget for display. If we really wanted to be creative, we could connect an actual analogue device via a servo and display the distance information that way (as we did in Chapter 15, Working with the Servo Control Code to Control an Analog Device). In Chapter 25, Controlling the Robot Car with Web Service Calls, we will take things a step further and start to control T.A.R.A.S from the internet.





Controlling the Robot Car with Web Service Calls





One day, driverless cars will dominate our streets and highways. Although the sensory information and control algorithms will be located in the car itself, we will have the ability (and it will possibly be a legislative requirement) to control the cars from elsewhere. Controlling driverless cars will require sensory information from the car to be sent to a control station in the form of speed, GPS location, and so on. Conversely, information from the control station will be sent to the car in the form of traffic and directions.

In this chapter, we will explore both the sending of sensory information from T.A.R.A.S and the receiving of control information by T.A.R.A.S.

The following topics will be covered in this chapter:





Reading the robot car's data from the cloud

Using a Python program to control a robot car through the cloud





Knowledge required to complete this chapter





To complete this chapter, you should have a completed T.A.R.A.S robot car, as described in detail in Chapter 22, Introducing the Raspberry Pi Robot Car. As with our other chapters in this book, a working knowledge of Python is required, as well as a basic understanding of object-oriented programming.





Project overview





The projects in this chapter will involve communicating with T.A.R.A.S through the internet. We will take a deeper look at the dashboard analogue dial that we created in Chapter 24, Connecting Sensory Inputs from the Robot Car to the Web, before we create switches on the dashboard that control T.A.R.A.S. These projects should take about 2 hours to complete.





Technical requirements


To complete this project, the following will be required:

A Raspberry Pi Model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A completed T.A.R.A.S robot car kit (see Chapter 22, Introducing the Raspberry Pi Robot Car)





Reading the robot car's data from the cloud





In Chapter 24, Connecting Sensory Inputs from the Robot Car to the Web, we were able to send the distance sensory data to the cloud using the website https://thingsboard.io/. We ended by showing an analogue meter displaying the distance value. In this section, we will dig a little deeper into the analogue widget by customizing it.





Changing the look of the distance gauge





This is how we change the look of the distance gauge:





Log into your ThingsBoard account

Click on DASHBOARDS

Click on the ROBOTEYES title



Click on the orange pencil icon in the bottom-right corner of the screen

You will notice that the distance analogue dial has changed (see the following screenshot)

For one thing, there are three new icons located at the top-right corner of the dial

At the bottom-right corner, the color has changed to light gray as well

You may resize the widget by hovering your mouse over the bottom-right corner

You may also move the widget around the dashboard

The X in the top-right corner allows you to remove this widget from the dashboard

The icon with the underlined arrow allows you to download the widget as a .json file. This file may be used to import the widget into another dashboard on ThingsBoard

Clicking on the pencil icon on the widget produces a menu that slides out from the right-hand side:





As you can see in the previous screenshot, the menu options are DATA, SETTINGS, ADVANCED, and ACTION. The default is DATA

Click on the SETTINGS tab

Under the Title, change the name to RobotEyes:





Click on the Display title check box

Click on the white circle under Background color:





You will see the color selection dialog:





Change the top to rgb(50,87,126)

Click on the orange checkbox to accept the changes

You will notice the distance gauge has a few cosmetic changes (see the following screenshot):





Changing the range on the distance gauge





Looking at the distance analogue gauge, it's pretty obvious that having negative numbers doesn't make a lot of sense for our application. Let's make the range 0 to 100:





Click on the pencil icon on the widget

Click on the ADVANCED tab



Change the Minimum value to 0 and the Maximum value to 100:





Click on the orange checkbox in the top-right corner to accept the changes to the widget

Close the ROBOTEYES dialog

Click on the orange checkbox in the bottom-right corner to accept the changes to the dashboard

You will notice that the distance analogue gauge now shows a range of 0 to 100:





Viewing the dashboard outside of your account





For our final trick, we will display our dashboard outside of our account (we did this in Chapter 19, Publishing to Web Services, as well). This also allows us to send our dashboard to a friend. So, why would we want to view our dashboard outside of the account? At the core of the Internet of Things is the concept that we may take information from one place and show it somewhere else, maybe somewhere on the other side of the world. By making our dashboard accessible outside of our account, we allow dashboards to be set up anywhere without the need to share our account information. Picture a large computer screen somewhere in the world, where a small section of the screen shows our dashboard. Showing distance information from T.A.R.A.S may not be of great interest to many, but the concept is what is important.

To share our dashboard, do the following:





In the ThingsBoard app, click on the DASHBOARDS option

Click on the middle icon under the RobotEyes dashboard:





You will see a dialog similar to the following (the URL has been partially blurred):





Click on the icon beside the URL to copy the URL to the clipboard

To test out the URL, paste it into a completely different browser on your computer (or email it to a friend and have them open it)

You should be able to see the dashboard with our distance analogue gauge





Using a Python program to control a robot car through the cloud


Being able to see sensory data in a dashboard is pretty impressive. However, what if we wanted to actually control something from our dashboard? In this section, we will do just that. We will start by constructing a simple switch to control an LED on T.A.R.A.S. We will then expand on this and have T.A.R.A.S do its dance from a push of a button over the internet.

Let's start by changing the name of the dashboard from RobotEyes to RobotControl:

In the ThingsBoard application, click on the DASHBOARDS option

Click on the pencil icon under the RobotEyes dashboard:





Click on the orange pencil icon

Change the tile from RobotEyes to RobotControl:





Click on the orange check to accept the changes

Exit out of the side dialog



Now let's control an LED on T.A.R.A.S from our ThingsBoard dashboard.





Adding a switch to our dashboard


In order to control an LED, we need to create a switch:

Click on the RobotControl dashboard

Click on the orange pencil icon

Click on the + icon

Click on the Create new widget icon

Select CONTROL WIDGETS and click on Switch control:





Under Target device, select RobotControl

Click on the SETTINGS tab:





Change the title to Green Tail Light and click on Display title

Click on the ADVANCED tab

Change the RPC set value method to toggleGreenTailLight:





Click on the orange check mark icon to accept the changes to the widget

Close the side dialog

Click on the orange check mark icon to accept the changes to the dashboard



So, what did we just do here? We have added a switch to our dashboard that will publish a method called toggleGreenTailLight, which will return a value of either true or false (the default return values as this is a switch).

Now that we have the switch, let's write some code on our Raspberry Pi that will respond to it.





Controlling the green LED on T.A.R.A.S


To control the green LED on T.A.R.A.S, we will need to write some code to the Raspberry Pi on T.A.R.A.S. We will need the access token for our dashboard (see Chapter 24, Connecting Sensory Inputs from the Robot Car to the Web, on how to get that):

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following:



import paho.mqtt.client as mqtt

from gpiozero import LED

import json



THINGSBOARD_HOST = 'demo.thingsboard.io'

ACCESS_TOKEN = '<<access token>>'

green_led=LED(21)



def on_connect(client, userdata, rc, *extra_params):

print('Connected with result code ' + str(rc))

client.subscribe('v1/devices/me/rpc/request/+')



def on_message(client, userdata, msg):

data = json.loads(msg.payload.decode("utf-8"))



if data['method'] == 'toggleGreenTailLight':

if data['params']:

green_led.on()

else:

green_led.off()



client = mqtt.Client()

client.on_connect = on_connect

client.on_message = on_message

client.username_pw_set(ACCESS_TOKEN)

client.connect(THINGSBOARD_HOST, 1883, 60)



client.loop_forever()

Save the file as control-green-led-mqtt.py

Run the code

Go back to our ThingsBoard dashboard (if you haven't been using a computer other than the Raspberry Pi on T.A.R.A.S, now is a good time to do so)

Click on the switch to turn it on

You should see the green LED on T.A.R.A.S turn on and off with the switch



So, what did we just do here? Using boilerplate code taken from the ThingsBoard website, we have built a Message Querying Telemetry Transport (MQTT) client that listens to the dashboard and responds whenever the toggleGreenTailLight method is received. We accomplish this by subscribing to 'v1/devices/me/rpc/request/+' in the on_connect method. We used MQTT in Chapter 19, Publishing to Web Services, as well. However, as this code is pretty much just MQTT code, let's look into it a little closer.

MQTT is a lightweight messaging protocol based on a publisher and subscriber method, perfect for use in the Internet of Things. A good way to understand publishers and subscribers is to relate them to newspapers of the past. The publisher was the entity that produced the newspaper; the subscribers were the people that bought and read the newspaper. The publisher did not know, or even have to know, how many subscribers it had in order to print the newspaper (not taking the cost of publishing into account). Think of the giant newspapers that published every day, not knowing how many people would buy their newspaper. So, the publisher can have many subscribers and, conversely, the subscriber can subscribe to many publishers, as a reader could read many different newspapers.

We start off by importing the libraries we need for the code:

import paho.mqtt.client as mqtt

from gpiozero import LED

import json



THINGSBOARD_HOST = 'demo.thingsboard.io'

ACCESS_TOKEN = '<<access token>>'

green_led=LED(21)

Of note here are the json and pho.mqtt.client libraries, which are needed for communication to the MQTT server. THINGSBOARD_HOST and ACCESS_TOKEN are standard variables needed to connect to the right server and service. Then, of course, there is the GPIO Zero LED class, which sets the green_led variable to GPIO pin 21 (which happens to be the green taillight on T.A.R.A.S).

The on_connect method prints out connection information and then subscribes to the service that will connect us to rpc methods from our ThingsBoard dashboard:

def on_connect(client, userdata, rc, *extra_params):

print('Connected with result code ' + str(rc))

client.subscribe('v1/devices/me/rpc/request/+')

It is the on_message method that allows us to really modify the code for our purposes:

def on_message(client, userdata, msg):

data = json.loads(msg.payload.decode("utf-8"))



if data['method'] == 'toggleGreenTailLight':

if data['params']:

green_led.on()

else:

green_led.off()

We first collect the data from our msg variable and convert it to a json file using the json.loads method. The method declaration, on_message(client, userdata, msg), is again standard boilerplate code from the ThingsBoard website. We are really only concerned with getting the msg value.

The first if statement, if data['method'] == 'toggleGreenTailLight', checks our msg for the toggleGreenTailLight method we set up with our switch on the ThingsBoard dashboard. Once we know that msg contains this method, we extract the other key-value pair in data, using if data['params'] to check for a True value. So, in other words, the json file we get back calling the on_message method will look something like {'params': True, 'method': 'toggleGreenTailLight'}. This is basically a Python dictionary of two key-value pairs. This may seem confusing, but the easiest way to think about it would be to imagine this as a json version of a method (toggleGreenTailLight) with a return value (True).

One way to really understand what is going on is to put a print statement to print data inside of the on_message method, just after data = json.loads(msg.payload.decode("utf-8")). Hence, the method would look something like the following:

def on_message(client, userdata, msg):

data = json.loads(msg.payload.decode("utf-8"))

print(data)

.

.

.



When the value returned from params is True, we simply turn on the LED using standard GPIO Zero code. We turn the LED off when the value returned from params is not True (or False, as there are only two values possible).

Seeing the LED turn on and off by using the internet is pretty impressive. However, that's not enough. Let's utilize some of the code we used in previous chapters and make T.A.R.A.S dance. This time, we will make it dance using the internet.





Using the internet to make T.A.R.A.S dance


To make T.A.R.A.S dance again, we are going to need to ensure that the code from Chapter 23, Controlling the Robot Car Using Python, is in the same directory as the code we are going to write.

We will start by creating a dance switch on our dashboard:

Follow the previous steps 1 through 9 under Adding a switch to our dashboard to create a switch

Change the title to Dance Switch and click on Display title

Click on the ADVANCED tab

Change the RPC set value method to dance

Click on the orange check mark icon to accept the changes to the widget

Close the side dialog

Click on the orange check mark icon to accept the changes to the dashboard



Now that we have the switch, let's modify our code:

Open up Thonny from Application Menu | Programming | Thonny Python IDE

Click on the New icon to create a new file

Type the following from step 4:



import paho.mqtt.client as mqtt

import json

from RobotDance import RobotDance



THINGSBOARD_HOST = 'demo.thingsboard.io'

ACCESS_TOKEN = '<<access token>>'

robot_dance = RobotDance()



def on_connect(client, userdata, rc, *extra_params):

print('Connected with result code ' + str(rc))

client.subscribe('v1/devices/me/rpc/request/+')



def on_message(client, userdata, msg):

data = json.loads(msg.payload.decode("utf-8"))



if data['method'] == 'dance':

if data['params']:

robot_dance.lets_dance_incognito()



client = mqtt.Client()

client.on_connect = on_connect

client.on_message = on_message

client.username_pw_set(ACCESS_TOKEN)

client.connect(THINGSBOARD_HOST, 1883, 60)



client.loop_forever()

Save the file as internet-dance.py

Run the code



Now go to the dashboard and flick on the dance switch (unfortunately, it's a switch and not a button). T.A.R.A.S should start dancing just like it did in Chapter 23, Controlling the Robot Car Using Python.

So, what did we just do? Well, we took simple code, modified it a bit, and through the power of object-oriented programming, we were able to get T.A.R.A.S to dance without having to change or even go through our old RobotDance code (isn't OOP the best thing since whatever you think the best thing is?).

For the MQTT code, all we had to do was add import to the RobotDance class, take away the redundant GPIO Zero import, take away any reference to the LED (as this would cause conflict), and then modify our on_message method to look for dance as the method.

The robot_dance object of the RobotDance class type does all the work. When we call the lets_dance_incognito method on this object, it puts into motion the methods used for movement in the RobotWheels, RobotBeep, TailLights, and RobotCamera classes. The end result is a way to make T.A.R.A.S dance through the use of a switch on the internet.





Summary





In this chapter, we looked a bit further into the dashboard analogue gauge we used for distance sensory information. We modified it cosmetically before changing the range and making it available publicly. We then turned our attention to controlling T.A.R.A.S thorough the internet. Through the use of a simple program, we were able to turn on the green LED on T.A.R.A.S. with a dashboard switch. We took this knowledge and modified our code to make T.A.R.A.S dance via another dashboard switch.

In Chapter 26, Building the JavaScript Client, we will continue with this by writing a JavaScript client to control T.A.R.A.S through the internet.





Building the JavaScript Client





Let's face it. We really wouldn’t have an Internet of Things if it wasn’t for the internet. JavaScript, along with HTML and CSS, is one of the core technologies of the internet. At the heart of the Internet of Things is the protocol for communicating between devices, MQTT.

In this chapter, we will turn our attention away from Python and focus on using JavaScript to build a JavaScript client to subscribe to a topic on an MQTT server.

The following topics will be covered in this chapter:





Introducing JavaScript cloud libraries

Connect to Cloud Services using JavaScript





Project overview





We will start this chapter by creating a simple JavaScript client that connects to an MQTT Broker (server). We will send a test message to the the MQTT Broker and then have that message return to the same page we created the JavaScript client on. We will then publish a message from Raspberry Pi to our MQTT Broker.

It should take a couple of hours to complete this chapter.





Getting started


To complete this project, the following will be required:

Raspberry Pi model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A separate computer for writing and executing the JavaScript client program





Introducing JavaScript cloud libraries





Let's start off by providing a background on JavaScript cloud libraries. JavaScript has been around since the dawn of the internet (1995, for argument's sake). It has become a language that can turn a HTML web page into a fully functioning desktop equivalent app. Personally, I find JavaScript to be one of the most useful programming languages out there (besides Python, of course).

JavaScript was released in 1995 and was designed to work with the most popular web browser at the time, Netscape Navigator. It was originally called livescript, but the name was changed to JavaScript due to the use and support of Java within the Netscape Navigator browser. Despite the similar syntax, Java and JavaScript really have nothing to do with each other—a confusing fact that continues to this day.





Google Cloud





Through google-api-javascript-client, we may access Google Cloud services. Specifically, we may access the Google Compute Engine, which is a component of the Google Cloud platform. With the Google Compute Engine, we may access the infrastructure that runs Gmail, YouTube, the Google search engine, and other Google services through the use of on-demand virtual machines. If this sounds like the type of tech babble that will impress your friends, you may want to dig a little deeper into this JavaScript library. You may find out more about the google-api-javascript-client here: https://cloud.google.com/compute/docs/tutorials/javascript-guide.





AWS SDK for JavaScript





The AWS SDK for JavaScript in Node.js provides JavaScript objects for AWS services. These services include Amazon S3, Amazon EC2, Amazon SWF, and DynamoDB. This library uses the Node.js runtime environment. You may find out more about this library here: https://aws.amazon.com/sdk-for-node-js/.

Node.js was released in May of 2009. The original author was Ryan Dhal and it is currently being developed by the company Joyent. Node.js allows for the execution of JavaScript code outside of the browser, thereby making it a JavaScript everywhere technology. This allows JavaScript to be used both on the server side and client side for web applications.





Eclipse Paho JavaScript client





The Eclipse Paho JavaScript client library is an MQTT browser-based library for JavaScript clients. Paho is itself written in JavaScript and may easily be inserted into a web application project. The Eclipse Paho JavaScript client library uses web sockets to connect to an MQTT Broker. We will be using this library for our projects in this chapter.





Connecting to cloud services using JavaScript


For our project, we will build a JavaScript client and connect it to an MQTT Broker. We will both Publish and Subscribe to a topic named test. We will then write a small simple program on Raspberry Pi to publish to the topic named test. What this code will demonstrate is how easy it is to send and receive messages using MQTT.

Take a look at the following diagram to see what we will accomplish with this project:





Setting up a CloudMQTT account


The first step is to set up an MQTT Broker. We may do this by installing one locally using the Mosquitto platform (www.mosquitto.org). What we will do instead is set up a cloud-based MQTT Broker using the website www.cloudmqtt.com.

To set up an account:

In your browser, navigate to www.cloudmqtt.com.

Click on Log in at the top-right corner.

In the Create an account box, type in your email address:





You will be sent an email to that email address asking you for confirmation. You can complete the confirmation process by clicking on the Confirm email button in the email.





You will then be taken to a page where you need to enter a password. Choose a password, confirm it, and then press Submit:





You will then be taken to the Instances page. This is where we will create an MQTT Broker instance to send and publish MQTT messages.





Setting up an MQTT Broker instance


Now that we have a CloudMQTT account set up, it's time to create an instance to use for our app:

From the Instances page, click on the big green button stating Create new instance.





You will see the following page:





In the Name box, enter T.A.R.A.S (we will name the MQTT Broker instance this as we will consider this broker part of the T.A.R.A.S robot car).

In the Plan dropdown, select Cute Cat (this is the free option that is good for development purposes).

Click on the green Select Region button.





Based on where you are located in the world, select a region that is close to your geographic location. Since I am located in Canada, I will choose US-East-1 (Northern Virginia):





Click on the green Confirm button.

You will see the Confirm new instance page. Review this information before clicking on the green Confirm instance button:





You should see a list of Instances with the T.A.R.A.S instance in the list:





Writing the JavaScript client code


Here is a screenshot of the T.A.R.A.S instance that I set up on my account. Please note the values in the list. These values are from my instance and yours will be different. We will use these values when writing our JavaScript client:



To write our JavaScript client code, we should use a computer other than Raspberry Pi on T.A.R.A.S. You may use whichever OS and HTML editor you desire. I wrote my JavaScript client code using macOS and Visual Studio Code. You will also need the Paho JavaScript library:

Navigate to the Eclipse Paho downloads site at https://projects.eclipse.org/projects/technology.paho/downloads.

Click on the JavaScript client link. It will be marked with the name JavaScript client, followed by a version number. At the time of writing, the version was 1.03.

The JavaScript client library will download as a ZIP file with paho.javascript-1.0.3. Unzip the file.

We will need a folder on our computer to use as a projects folder. Create a new folder on your computer and name it MQTT HTML Client.

Create a subfolder called scripts inside the MQTT HTML Client folder.

Drag and drop the unzipped paho.javascript-1.0.3 folder into the MQTT HTML Client folder.



The directory structure inside of the MQTT HTML Client folder should look like the following:





Now, it's time to write the code. We are going to make our code as simple as possible so that we may gain an understanding of how MQTT works with JavaScript. Our client code will consist of two files, an HTML page and a .js (JavaScript) file. Let's start by creating the HTML page:

Using your favorite HTML editor, create a file called index.html and save it to the project root.

Your project folder should look like the following:





Type the following into the index.html file:



<!DOCTYPE html>

<html>



<head>

<title>MQTT Message Client</title>

<script src="paho.javascript-1.0.3/paho-mqtt.js" type="text/javascript"></script>

<script src="scripts/index.js" type='text/javascript'></script>

</head>



<body>



<h2>MQTT Message Client</h2>

<button onclick="sendTestData()">

<h4>Send test message</h4>

</button>



<button onclick="subscribeTestData()">

<h4>Subscribe to test</h4>

</button>



<div>

<input type="text" id="messageTxt" value="Waiting for MQTT message" size=34 />

</div>



</body>



</html>

Save the changes to index.html.

What we have done here is we have created a simple HTML page and imported two JavaScript libraries, the Paho JavaScript library and a file called index.js, which we haven't created yet:



<script src="paho.javascript-1.0.3/paho-mqtt.js" type="text/javascript"></script>

<script src="scripts/index.js" type='text/javascript'></script>

We then need to create two buttons; on the top button, we set the onclick method to sendTestData. On the bottom button, we set the onclick method to subscribeTestData. These methods will be created in the JavaScript file we will write. For simplicity's sake, we do not assign ID names to these buttons as we will not be referencing them in our JavaScript code:



<button onclick="sendTestData()">

<h4>Send test Message</h4>

</button>

<button onclick="subscribeTestData()">

<h4>Subscribe to test</h4>

</button>

The last element we will create in our index.html page is a textbox. We assign an id of messageTxt and a value of Waiting for MQTT message to the text box:



<div>

<input type="text" id="messageTxt" value="Waiting for MQTT message" size=34 />

</div>

If we were to load index.html into a browser, it would look like as follows:





Running the code





Before we can run our client code, we need to create the JavaScript file that will provide the functionality we require:





Using the HTML editor, create a file called index.js and save it to the scripts folder in our project directory.

Add the following code to index.js and save it. Replace the Server, User, Password, and Websockets Port with values from your instance (shown as "m10.cloudmqtt.com", 38215, "vectydkb", and "ZpiPufitxnnT", respectively):



function sendTestData() {

client = new Paho.MQTT.Client

("m10.cloudmqtt.com", 38215, "web_" +

parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;



var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendTestDataMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendTestDataMessage() {

message = new Paho.MQTT.Message("Hello from JavaScript

client");

message.destinationName = "test";

client.send(message);

}



function doFail() {

alert("Error!");

}



// called when the client loses its connection

function onConnectionLost(responseObject) {

if (responseObject.errorCode !== 0) {

alert("onConnectionLost:" + responseObject.errorMessage);

}

}



// called when a message arrives

function onMessageArrived(message) {

document.getElementById('messageTxt').value = message.payloadString;

}



function onsubsribeTestDataSuccess() {

client.subscribe("test");

alert("Subscribed to test");

}



function subscribeTestData() {

client = new Paho.MQTT.Client

("m10.cloudmqtt.com", 38215, "web_" +

parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

client.onMessageArrived = onMessageArrived;



var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: onsubsribeTestDataSuccess,

onFailure: doFail

}



// connect the client

client.connect(options);

}

Run the code by refreshing the browser, where you have index.html loaded.

Click on the Subscribe to test button. You should get pop-up dialog with the message Subscribed to test.

Close the pop-up dialog.

Click on the Send test message button.

You should see the message Hello from JavaScript client in the text box.



Was this some kind of magic we just performed? Well, in a way, it was. We just accomplished subscribing to a topic on our MQTT Broker and then followed that up by publishing to the same topic and then receiving a message in our same JavaScript client. To witness this from the MQTT Broker, do the following:





Log in to your CloudMQTT account

Click on the T.A.R.A.S instance

Click on the WEBSOCKET UI menu option

You should see the following dialog saying that you are connected:





In another tab or window on your browser, navigate back to the JavaScript client, index.html

Click on the Send test message button again



Navigate back to the CloudMQTT page

Under the Received messages list, you should see a message:





Click on the Send test message button a few more times and you should see a list of the same messages under Received messages.





Understanding the JavaScript code


Before we write code for Raspberry Pi, let's take a look at the JavaScript code from index.js.

We will look at the subscribe code first. The two methods we use to subscribe to a topic from our MQTT Broker are subscribeTestData and onsubsribeTestDataSuccess. subscribeTestData creates a Paho MQTT client object named client. It uses the client object to connect to our MQTT Broker by instantiating the object with Server and Websockets Port values (I've left the values from my account in the code for simplicity's sake):

function subscribeTestData() {

client = new Paho.MQTT.Client

("m10.cloudmqtt.com", 38215, "web_" +

parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

client.onMessageArrived = onMessageArrived;



var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: onsubsribeTestDataSuccess,

onFailure: doFail

}



// connect the client

client.connect(options);

}

We then set the callback handlers with client.onConnectionLost and client.onMessageArrived. The callback handlers link functions in our JavaScript code to events from our client object. In this case, when the connection to the MQTT Broker is lost or when a message has arrived from the MQTT Broker. The options variable sets the use of SSL to true, sets the User and Password settings, and then sets the conditions of a successful connection to the onsubsribeTestDataSuccess method and an unsuccessful connection attempt to the doFail method. We then connect to our MQTT broker through the client.connect method by passing in our options variable.

The onsubsribeTestDataSuccess method is called when there is a successful connection to the MQTT Broker. It sets the client object up to subscribe to the test topic. It then creates an alert with the message Subscribed to test:

function onsubsribeTestDataSuccess() {

client.subscribe("test");

alert("Subscribed to test");

}

The doFail method is called if the connection to the client is unsuccessful. It simply creates a pop-up alert with the message Error!:

function doFail() {

alert("Error!");

}

Now that we understand the code to subscribe to the test topic, let's take a look at the code that publishes to the test topic.

The sendTestData function is very similar to the subscribeTestData function:

function sendTestData() {

client = new Paho.MQTT.Client

("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;



var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendTestDataMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}

A Paho MQTT client object named client is created with the same parameters that were used in the subscribeTestData function. The only callback handler set is onConnectionLost. We do not set onMessageArrived as we are sending a message and not receiving one. The options variable is set with the same values that were used in the subscribeTestData function, with the exception of onSuccess, which we assign to the sendTestDataMessage function.

The sendTestDataMessage function creates a new Paho MQTT Message object with the Hello from JavaScript client value and names it message. The destinationName is the topic we are creating the message for and it is set to the test value. We then send off the message with client.send:

function sendTestDataMessage() {

message = new Paho.MQTT.Message("Hello from JavaScript client");

message.destinationName = "test";

client.send(message);

}

The onConnectionLost function is used for both subscribe and publish and simply creates an alert popup with an error message taken from the JavaScript response object:

// called when the client loses its connection

function onConnectionLost(responseObject) {

if (responseObject.errorCode !== 0) {

alert("onConnectionLost:" + responseObject.errorMessage);

}

}

Now that we have our JavaScript client subscribing and publishing to our MQTT Broker, let's get Raspberry Pi in on it.





Publishing MQTT messages from our Raspberry Pi





Let's return to our Raspberry Pi (if you have been using another computer) and write some code to communicate with our MQTT Broker:





Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click on the New icon to create a new file.

Type the following into the file:



import paho.mqtt.client as mqtt

from time import sleep



mqttc = mqtt.Client()

mqttc.username_pw_set("vectydkb", "ZpiPufitxnnT")

mqttc.connect('m10.cloudmqtt.com', 18215)



while True:

try:

mqttc.publish("test", "Hello from Raspberry Pi")

except:

print("Could not send message!")

sleep(10)



Save the file as CloudMQTT-example.py and run it.

Navigate back to the CloudMQTT page. You should see messages coming from the Raspberry Pi:





Navigate to our JavaScript client, index.html. You should see the message Hello from the Raspberry Pi in the textbox (if you do not see the message, refresh the page and click on Subscribe to test again):





The Raspberry Pi Python code was deliberately kept simple so that the concepts may be understood. We start the code by importing the libraries we need. Then, we create an MQTT client object we call mqttc. The username and password are set using the username_pw_set method. We then connect to the MQTT Broker using the connect method by passing in the Server and Port values (we use Port instead of Websockets Port for the Python client). Inside a continuous loop, we publish to the MQTT Broker through the publish method by passing in the topic, test, and the message Hello from Raspberry Pi.





Summary





In this chapter, we explored JavaScript libraries before using JavaScript to create an MQTT client. We set up a cloud-based MQTT Broker and were able to publish and subscribe to messages using both our JavaScript client and a Python program on our Raspberry Pi.

In Chapter 27, Putting It All Together, we will expand on what we have learned in this chapter and build a JavaScript client that can control T.A.R.A.S over the internet.





Putting It All Together





For our final act, we will get T.A.R.A.S to respond to control signals sent using MQTT from a JavaScript client. We will do this by modifying the code we have wrote up to this point. If you have been reading this book from the start, thank you for your perseverance. It has been a long journey to get here. We have finally made it. By the end of this chapter, we will have finished building the ultimate in IoT devices, an internet-controlled robot car.

Buckle up (pun intended)—it's time to take T.A.R.A.S to the next level.

In this chapter we will cover the following topics:





Build a JavaScript client to connect to our Raspberry Pi

JavaScript client to access our Robot Carʼs sensory data

Enhance our JavaScript client to control our Robot Car





Project overview


In this chapter, we will connect T.A.R.A.S to an MQTT Broker. Through the MQTT messages, we will control the movement of T.A.R.A.S as well as read from the distance sensor on T.A.R.A.S. The following is a diagram of what we are going to build:



We will start off by writing the HTML JavaScript Client (shown as HTML Client in the diagram) and use it to send and receive MQTT messages. We will then turn our attention to writing code on T.A.R.A.S to send and receive messages from the same MQTT Broker. We will use these messages to control T.A.R.A.S using a browser. Finally, we will livestream video from T.A.R.A.S using a browser as well.

This project should take half a day to complete.





Getting started


To complete this project, the following will be required:

A Raspberry Pi model 3 (2015 model or newer)

A USB power supply

A computer monitor

A USB keyboard

A USB mouse

A T.A.R.A.S robot car





Building a JavaScript client to connect to our Raspberry Pi


The following is a screenshot of the HTML JavaScript client we will build to control T.A.R.A.S over the network. The HTML JavaScript client won't win any design awards, but it will serve as an excellent learning platform for sending robot control information over the internet:

The big purple buttons are used to send Forward and Backwards commands to T.A.R.A.S. The smaller green buttons send Turn Left and Turn Right control information to T.A.R.A.S. The small silver buttons at the bottom allow us to take a picture using the camera from T.A.R.A.S, set off an alarm on T.A.R.A.S, and make T.A.R.A.S dance. The Track Distance button connects the HTML JavaScript client to distance information coming from T.A.R.A.S.

We will track control information using the dashboard in CloudMQTT before we build a Python MQTT client for our Raspberry Pi.





Writing the HTML code


We will start by writing the HTML code for our HTML JavaScript client. You may use a computer other than the Raspberry Pi:

Create a project folder on your computer and call it HTML JavaScript Client

Copy the Paho JavaScript library from Chapter 26, Building the JavaScript Client, into the project folder

Using your favorite HTML editor, create a file called index.html and save it inside the folder you created in step 1

Type the following into index.html and save it again:



<html>

<head>

<title>T.A.R.A.S Robot Car Control</title>

<script src="paho.javascript-1.0.3/paho-mqtt.js"

type="text/javascript"></script>

<script src="scripts/index.js"

type='text/javascript'></script>



<link rel="stylesheet" href="styles/styles.css">

</head>

<body>

<h2>T.A.R.A.S Robot Car Control</h2>

<div>

<button onclick="moveForward()"

class="big_button">

<h4>Forward</h4>

</button>

</div>

<div>

<button onclick="turnLeft()"

class="small_button">

<h4>Turn Left</h4>

</button>

<button onclick="turnRight()"

class="small_button">

<h4>Turn Right</h4>

</button>

</div>

<div>

<button onclick="moveBackward()"

class="big_button">

<h4>Backwards</h4>

</button>

</div>

<div>

<button onclick="takePicture()"

class="distance_button">

<h4>Take Picture</h4>

</button>

<button onclick="TARASAlarm()"

class="distance_button">

<h4>T.A.R.A.S Alarm</h4>

</button>

<button onclick="makeTARASDance()"

class="distance_button">

<h4>T.A.R.A.S Dance</h4>

</button>

<button onclick="subscribeDistanceData()"

class="distance_button">

<h4>Track Distance</h4>

</button>

<input type="text" id="messageTxt" value="0"

size=34 class="distance" />

</div>

</body>

</html>



Before we can view index.html in a browser, we must create a .css file for the styles. We will also create a folder for our JavaScript file:

In your project folder, create a new folder and call it styles

Create another folder in the project folder and call it scripts



Your project directory should look the same as the following:





Inside the styles folder, create a file called styles.css using an HTML editor

Type the following into the styles.css file and save it:



.big_button {

background-color: rgb(86, 76, 175);

border: none;

color: white;

padding: 15px 32px;

text-align: center;

text-decoration: none;

display: inline-block;

font-size: 16px;

margin: 4px 2px;

cursor: pointer;

width: 400px;

}

.small_button {

background-color: rgb(140, 175, 76);

border: none;

color: white;

padding: 15px 32px;

text-align: center;

text-decoration: none;

display: inline-block;

font-size: 16px;

margin: 4px 2px;

cursor: pointer;

width: 195px;

}

.distance_button {

background-color: rgb(192, 192, 192);

border: none;

color: white;

padding: 1px 1px;

text-align: center;

text-decoration: none;

display: inline-block;

font-size: 10px;

margin: 2px 2px;

cursor: pointer;

width: 60px;

}

.distance {

background-color: rgb(255, 255, 255);

border: none;

color: rgb(192,192,192);

padding: 1px 1px;

text-align: top;

text-decoration: none;

display: inline-block;

font-size: 20px;

margin: 2px 2px;

cursor: pointer;

width: 300px;

}

Open up a browser and navigate to the index.html file in the project folder

You should see the T.A.R.A.S robot car control dashboard



Before we add the JavaScript code, let's take a look at what we just wrote. We will start off by importing the resources we need. We will need the Paho MQTT library, an index.js file (which we haven't wrote yet), and our styles.css file:

<script src="paho.javascript-1.0.3/paho-mqtt.js"

type="text/javascript"></script>

<script src="scripts/index.js"

type='text/javascript'></script>

<link rel="stylesheet" href="styles/styles.css">

We will then create a series of buttons which we will tie to functions in our soon-to-be-written index.js JavaScript file:

<div>

<button onclick="moveForward()" class="big_button">

<h4>Forward</h4>

</button>

</div>

Since our buttons are pretty much similar, we will only discuss the first one. The first button is tied to the moveForward function in our JavaScript file through the onclick property. The style of the button is set by assigning class to big_button. We use the first button to move T.A.R.A.S forward.





Writing the JavaScript code to communicate with our MQTT Broker


Now that we have our HTML and CSS files, let's create the JavaScript file that will make the magic of MQTT happen:

Inside the scripts folder, create a file called index.js using an HTML editor.

Type the following into the index.js file and save it:



function moveForward() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendMoveForwardMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendMoveForwardMessage() {

message = new Paho.MQTT.Message("Forward");

message.destinationName = "RobotControl";

client.send(message);

}



function moveBackward() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendMoveBackwardMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendMoveBackwardMessage() {

message = new Paho.MQTT.Message("Backward");

message.destinationName = "RobotControl";

client.send(message);

}



function turnLeft() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendTurnLeftMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendTurnLeftMessage() {

message = new Paho.MQTT.Message("Left");

message.destinationName = "RobotControl";

client.send(message);

}



function turnRight() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendTurnRightMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendTurnRightMessage() {

message = new Paho.MQTT.Message("Right");

message.destinationName = "RobotControl";

client.send(message);

}



function takePicture() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendTakePictureMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendTakePictureMessage() {

message = new Paho.MQTT.Message("Picture");

message.destinationName = "RobotControl";

client.send(message);

}



function TARASAlarm() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendTARASAlarmMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendTARASAlarmMessage() {

message = new Paho.MQTT.Message("Alarm");

message.destinationName = "RobotControl";

client.send(message);

}



function makeTARASDance() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: makeTARASDanceMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function makeTARASDanceMessage() {

message = new Paho.MQTT.Message("Dance");

message.destinationName = "RobotControl";

client.send(message);

}





function doFail() {

alert("Error!");

}



// called when the client loses its connection

function onConnectionLost(responseObject) {

if (responseObject.errorCode !== 0) {

alert("onConnectionLost:" + responseObject.errorMessage);

}

}



// called when a message arrives

function onMessageArrived(message) {

document.getElementById('messageTxt').value = message.payloadString;

}



function onsubsribeDistanceDataSuccess() {

client.subscribe("distance");

alert("Subscribed to distance data");

}



function subscribeDistanceData() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

client.onMessageArrived = onMessageArrived;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: onsubsribeDistanceDataSuccess,

onFailure: doFail

}



// connect the client

client.connect(options);

}

I have left the values of my CloudMQTT instance in the code. Just as we did in Chapter 26, Building the JavaScript Client, replace those values with the ones from your instance (Server, Websockets Port, userName, password).

Navigate back to index.html in your browser and refresh the page.

We now have our HTML JavaScript client in place. What we have essentially done is modify the index.js code from Chapter 26, Building the JavaScript Client, so that we may send control messages to our MQTT Broker and ultimately our robot car:



function moveForward() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: sendMoveForwardMessage,

onFailure: doFail

}



// connect the client

client.connect(options);

}



// called when the client connects

function sendMoveForwardMessage() {

message = new Paho.MQTT.Message("Forward");

message.destinationName = "RobotControl";

client.send(message);

}

We have changed the code in the previous example. The moveForward function creates a Paho MQTT Client named client with Server and Websockets Port connection information taken from our CloudMQTT instance. A callback handler to handle when the connection is lost is set to the onConnectionLost function. The options variable is created using our userName and password information, which was taken from our CloudMQTT instance. We set a successful connection to the MQTT Broker to the sendMoveForwardMessage function. We then connect to our client by passing in the options variable.

The sendMoveForwardMessage function creates a new Paho MQTT message called Forward. This message is then assigned to the RobotControl topic and sent using our Paho MQTT Client object, client.

Functions to send messages to move backwards, turn right, turn left, take a picture, set off an alarm, and dance are written in a similar way to the moveForward function.

Now that we have the HTML JavaScript client for controlling T.A.R.A.S over the web built, let's test it out using the WEBSOCKETS UI page on our CloudMQTT instance:

Navigate back to your CloudMQTT account.

Select the instance where you obtained the server, user, password, and web sockets port connection information (in Chapter 26, Building the JavaScript Client, we created the instance called T.A.R.A.S).

Click on the WEBSOCKETS UI menu option on the left-hand side. You should get a notice on the right-hand side indicating a successful connection.

Navigate back to index.html and click on the Forward button.

Now, navigate back to your CloudMQTT instance. You should see a new message in the Received messages list:





Congratulations! You have just connected a HTML JavaScript client to an MQTT Broker and sent a message. We will now develop another client on another device using a completely different programming language and then use that client to subscribe to the messages coming from our HTML JavaScript client.





Creating a JavaScript client to access our robot car's sensory data


The index.js file we created contains functions that subscribe our HTML JavaScript client to the distance topic: function subscribeDistanceData() {

client = new Paho.MQTT.Client("m10.cloudmqtt.com", 38215, "web_" + parseInt(Math.random() * 100, 10));



// set callback handlers

client.onConnectionLost = onConnectionLost;

client.onMessageArrived = onMessageArrived;

var options = {

useSSL: true,

userName: "vectydkb",

password: "ZpiPufitxnnT",

onSuccess: onsubsribeDistanceDataSuccess,

onFailure: doFail

}



// connect the client

client.connect(options);

}



function onsubsribeDistanceDataSuccess() {

client.subscribe("distance");

alert("Subscribed to distance data");

}

Similar to the code we wrote in Chapter 26, Building the JavaScript Client, the subscribeDistanceData function creates a Paho MQTT Client with the connection information from our CloudMQTT instance. Upon successful connection, the onsubscribeDistanceDataSuccess function is called, which subscribes client to the distance topic.

An alert is also created, telling us that the HTML JavaScript client is now subscribed to the distance topic.





Writing the code for T.A.R.A.S


We will now turn our attention back to our Raspberry Pi robot car and write Python code to communicate with our MQTT Broker and ultimately our HTML JavaScript client. The following code should be run directly from T.A.R.A.S. If you'd like to run T.A.R.A.S without tethers, use the USB power supply to power the Raspberry Pi and disconnect the HDMI cable once the following program is run:

Open up Thonny from Application Menu | Programming | Thonny Python IDE.

Click on the New icon to create a new file.

Type the following code into the file:



import paho.mqtt.client as mqtt

from time import sleep

from RobotDance import RobotDance

from RobotWheels import RobotWheels

from RobotBeep import RobotBeep

from RobotCamera import RobotCamera

from gpiozero import DistanceSensor



distance_sensor = DistanceSensor(echo=18, trigger=17)



def on_message(client, userdata, message):

command = message.payload.decode("utf-8")



if command == "Forward":

move_forward()

elif command == "Backward":

move_backward()

elif command == "Left":

turn_left()

elif command == "Right":

turn_right()

elif command == "Picture":

take_picture()

elif command == "Alarm":

sound_alarm()

elif command == "Dance":

robot_dance()



def move_forward():

robotWheels = RobotWheels()

robotWheels.move_forward()

sleep(1)

print("Moved forward")

robotWheels.stop()

watchMode()



def move_backward():

robotWheels = RobotWheels()

robotWheels.move_backwards()

sleep(1)

print("Moved backwards")

robotWheels.stop()

watchMode()



def turn_left():

robotWheels = RobotWheels()

robotWheels.turn_left()

sleep(1)

print("Turned left")

robotWheels.stop()

watchMode()



def turn_right():

robotWheels = RobotWheels()

robotWheels.turn_right()

print("Turned right")

robotWheels.stop()

watchMode()



def take_picture():

robotCamera = RobotCamera()

robotCamera.take_picture()

watchMode()



def sound_alarm():

robotBeep = RobotBeep()

robotBeep.play_song()



def robot_dance():

robotDance = RobotDance()

robotDance.lets_dance_incognito()

print("Finished dancing now back to work")

watchMode()



def watchMode():

print("Watching.....")

mqttc = mqtt.Client()

mqttc.username_pw_set("vectydkb", "ZpiPufitxnnT")

mqttc.connect('m10.cloudmqtt.com', 18215)

mqttc.on_message = on_message

mqttc.subscribe("RobotControl")



while True:

distance = distance_sensor.distance*100

mqttc.loop()

mqttc.publish("distance", distance)

sleep(2)



watchMode()

Save the file as MQTT-RobotControl.py.

Run the code from Thonny.

Navigate to the HTML JavaScript client and click on the Forward button:





T.A.R.A.S should move forward for one second and then stop.

The small grey buttons at the bottom allow you to perform various tasks with T.A.R.A.S:





Explore the functionality of each of these buttons by clicking on them. The Take Picture button will take a picture and store it in the filesystem, T.A.R.A.S Alarm will sound the alarm on T.A.R.A.S, and T.A.R.A.S Dance will make T.A.R.A.S dance.

To subscribe to the distance data coming from the distance sensor on T.A.R.A.S, click on the Track Distance button:





After clicking on the Track Distance button, you should see a popup that tells you that your HTML JavaScript client is now subscribed to the distance data:





Click Close to close out of the popup. You should now see distance data information from T.A.R.A.S displayed beside the Track Distance button.

As with all the code we have written so far, we write it to be as simple and self-explanatory as possible. At the heart of our code is the watch_mode method:



def watchMode():

print("Watching.....")

mqttc = mqtt.Client()

mqttc.username_pw_set("vectydkb", "ZpiPufitxnnT")

mqttc.connect('m10.cloudmqtt.com', 18215)

mqttc.on_message = on_message

mqttc.subscribe("RobotControl")



while True:

distance = distance_sensor.distance*100

mqttc.loop()

mqttc.publish("distance", distance)

sleep(2)

The watch_mode method is the default method in our code. It is called immediately after the code is run and is called whenever another method completes. In watch_mode, we need to create a MQTT client object called mqttc and then use it to connect to our CloudMQTT instance. From there, we set the on_message callback to the on_message method. We then subscribe to the RobotControl topic. The while loop that follows calls the loop method of our MQTT client, mqttc. Since we've set the on_message callback, any time a message is received from the RobotControl topic, the program is taken out of the while loop and the on_message method of our code is executed.

In watch_mode, the distance sensory information is published to the distance topic every 2 seconds. Since our HTML JavaScript client is set up to subscribe to messages on the distance topic, our HTML JavaScript client will update the distance information on the page every two seconds.





Livestreaming videos from T.A.R.A.S


Amazing as it is to be able to control T.A.R.A.S from the web, it wouldn't be of much use if we couldn't see what what we were doing. Streaming live video from Raspberry Pi is actually quite simple if you install RPi-Cam-Web-Interface on your Raspberry Pi. Let's do that now:

If you do not have git installed on your Raspberry Pi, please install it with sudo apt-get install git from a Terminal.

Using the Terminal, get the installation files by running the git clone https://github.com/silvanmelchior/RPi_Cam_Web_Interface.git command.

Change directories with the cd RPi_Cam_Web_Interface command.

Run the installer with the ./install.sh command.

You should see the Configuration Options screen:





Accept all the defaults by hitting Tab on your keyboard until the OK option is highlighted. Hit Enter.

Select Yes when you see the Start camera system now dialog:





We are now ready to livestream video from our Raspberry Pi (T.A.R.A.S). On another computer, open a browser and type in the address http://<<ip address of your raspberry pi>>/html (use ifconfig on your Raspberry Pi in order to find your IP address; in my case, the URL for video streaming is http://192.168.0.31/html).





You should now see the video streaming player load into your browser with live video from your Raspberry Pi. The following is a screenshot of the livestream from T.A.R.A.S in my office, looking up at my drones on display:





The RPi-Cam-Web-Interface utility is an amazing tool. Take some time to experiment with the various options and functions that are available.





Enhancing our JavaScript client to control our robot car





As we've mentioned already, our HTML JavaScript client is the most attractive of interfaces. I designed it to be as simple and straightforward as possible in order to explain various concepts. But what if we want to take it to another level? The following is a list of JavaScript libraries that may be used to enhance our HTML JavaScript client.





Nipple.js


Nipple.js (https://www.bypeople.com/touch-screen-joystick/) is a JavaScript touchscreen joystick library that may be used in the control of robots. Nipple.js is basically an onscreen version of pointing stick controls found on some laptops:



If you are creating a JavaScript client for a touchscreen tablet or laptop, Nipple.js may be a good technology to build it on. Incorporating a technology such as Nipple.js into our design would require a fair bit of coding in order to translate the movements into messages that T.A.R.A.S would understand. A simple forward message might not suffice. The message may be something like Forward-1-Left-2.3 and it would have to be parsed and information taken out to determine how the amount of time to turn the motor and which motors to move.





HTML5 Gamepad API





Would you like to connect a physical joystick to control our robot car? You may do so with the HTML5 Gamepad API (https://www.w3.org/TR/gamepad/). With the HTML5 Gamepad API, you may utilize your standard gaming joystick in web applications you build. Controlling your robot car may be as easy as playing your favorite video game with a HTML5 Gamepad API.





Johnny-Five





Johnny-Five (http://johnny-five.io) is a JavaScript Robotic and IoT platform. It is a completely different platform than what we have developed our robot car on. Now that we have built our robot car from scratch and have coded our control code by hand, we may be interested in trying something new. Johnny-Five may be that next technology you decide to become an expert in.





Summary


We've have done it! We've reached the end of our Raspberry Pi Internet of Things journey. In this chapter, we brought what we've learned together and created our own HTML JavaScript client that we used to control T.A.R.A.S using a web page. Our use of classes to control T.A.R.A.S made creating the control code relatively easy as we only had to call methods on the classes and not create control code from scratch.

We touched briefly on how easy it is to stream live video from our Raspberry Pi. Although we did all of this to control a robot car over our network, it is not too hard to imagine how we may use what we've learned to build any number of different IoT projects using Raspberry Pi.

We live in a very exciting time. Any one of us may build the next killer app using only our intellect and a few relatively inexpensive electronic components. If anything, I hope that I was able to inspire you to use the amazing Raspberry Pi computer to build your next great project.

For those who are questioning how we may view this as an Internet of Things project when we are only using our local network, please do some research into how you can open up ports on your router to the outside world. This is not a task that should be taken lightly, though, as there are security concerns that you must address whenever you do something like that. Please note, too, however, that your Internet Service Provider may not be giving you a static IP address and thus anything you build to access your network from the outside will break every time your IP address changes (I once built a PHP page that checked my IP address periodically, stored the latest address, and had outside clients which would go to that PHP for the address instead of having it hardcoded).





Other Books You May Enjoy


If you enjoyed this book, you may be interested in these other books by Packt:



Analytics for the Internet of Things (IoT)

Andrew Minteer

ISBN: 978-1-78712-073-0

Overcome the challenges IoT data brings to analytics

Understand the variety of transmission protocols for IoT along with their strengths and weaknesses

Learn how data flows from the IoT device to the final data set

Develop techniques to wring value from IoT data

Apply geospatial analytics to IoT data

Use machine learning as a predictive method on IoT data

Implement best strategies to get the most from IoT analytics

Master the economics of IoT analytics in order to optimize business value





Building a Home Security System with Raspberry Pi

Matthew Poole

ISBN: 978-1-78217-527-8

Understand the concepts behind alarm systems and intrusion detection devices

Connect sensors and devices to the on-board digital GPIO ports safely

Monitor and control connected devices easily using Bash shell scripting

Build an I/O port expander using the I2C bus and connect sensors and anti-tamper circuits

Capture and store images using motion detectors and cameras

Access and manage your system remotely from your mobile phone

Receive intrusion alerts and images through your e-mail

Build a sophisticated multi-zone alarm system





Leave a review - let other readers know what you think





Please share your thoughts on this book with others by leaving a review on the site that you bought it from. If you purchased the book from Amazon, please leave us an honest review on this book's Amazon page. This is vital so that other potential readers can see and use your unbiased opinion to make purchasing decisions, we can understand what our customers think about our products, and our authors can see your feedback on the title that they have worked with Packt to create. It will only take a few minutes of your time, but is valuable to other potential customers, our authors, and Packt. Thank you!





