O’Reilly Ebooks—Your bookshelf on your devices!


When you buy an ebook through oreilly.com, you get lifetime access to the book, and

whenever possible we provide it to you in four, DRM-free file formats—PDF, .epub,

Kindle-compatible .mobi, and Android .apk ebook—that you can use on the devices of

your choice. Our ebook files are fully searchable and you can cut-and-paste and print

them. We also alert you when we’ve updated the files with corrections and additions.


**Learn more at http://oreilly.com/ebooks/**


You can also purchase O’Reilly ebooks through iTunes,

the Android Marketplace, and Amazon.com.


# **Getting** **Started with** **the Internet** **of Things**
##### **Cuno Pfister**


**Getting Started with the**
**Internet of Things**
**by Cuno Pfister**


Copyright © 2011 Cuno Pfister. All rights reserved.
Printed in the United States of America.


Published by O’Reilly Media, Inc.
1005 Gravenstein Highway North, Sebastopol, CA 95472


O’Reilly books may be purchased for educational, business, or
sales promotional use. Online editions are also available for most
titles ( _http://my.safaribooksonline.com_ ). For more information,
contact our corporate/institutional sales department:
800-998-9938 or _corporate@oreilly.com_ .


**Print History:** May 2011: First Edition.


**Editor:** Brian Jepson
**Production Editor:** Jasmine Perez
**Copyeditor:** Marlowe Shaeffer
**Proofreader:** Emily Quill
**Compositor:** Nancy Wolfe Kotary
**Indexer:** Angela Howard
**Illustrations:** Marc de Vinck
**Cover Designer:** Marc de Vinck


The O’Reilly logo is a registered trademark of O’Reilly Media, Inc.
The Make: Projects series designations and related trade dress
are trademarks of O’Reilly Media, Inc. The trademarks of third
parties used in this work are the property of their respective
owners.


Many of the designations used by manufacturers and sellers to
distinguish their products are claimed as trademarks. Where
those designations appear in this book, and O’Reilly Media, Inc.
was aware of a trademark claim, the designations have been
printed in caps or initial caps.


While every precaution has been taken in the preparation of
this book, the publisher and author assume no responsibility
for errors or omissions, or for damages resulting from the use
of the information contained herein.


ISBN: 978-1-4493-9357-1


[LSI]


### **Contents**

**Preface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** v


**I** / **Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 1


**1** / **Hello World . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 3

Setting Up the Development Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
HelloWorld . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
Building the Program in Visual Studio . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
Deploying to the Device . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6


**2** / **Writing to Actuators . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 11

BlinkingLed . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11


**3** / **Reading from Sensors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 15

LightSwitch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
VoltageReader . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .20


**II** / **Device as HTTP Client . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 27


**4** / **The Internet of Things . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 29

HTTP . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .30
Push Versus Pull . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .34


**5** / **Pachube . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 37


**6** / **Hello Pachube . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 43

Setting Up the Network Configuration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .43
HelloPachube . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .48
What Netduino Said to Pachube . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55
What Pachube Said to Netduino . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57


**7** / **Sending HTTP Requests—The Simple Way . . . . . . . . . . . . . . . . . . . . . . . . . . .** 61

SimplePutRequest . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61
Making Web Requests . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .64


**8** / **Sending HTTP Requests—The Efficient Way . . . . . . . . . . . . . . . . . . . . . . . . . .** 71

EfficientPutRequest . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 71


**9** / **Hello Pachube (Sockets Version) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 77

PachubeClient . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 77


��������������� **�**


**III** / **Device as HTTP Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 83


**10** / **Hello Web . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 85

Relaying Messages to and from the Netduino . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 85
HelloWeb . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 87
Request Handlers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 92
HelloWebHtml . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 93
What You Should Know About Ports . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .94


**11** / **Handling Sensor Requests . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 97

From Sensor Readings to HTTP Resources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .98
URIs of Measured Variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .98
VoltageMonitor . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .99
What You Should Know About HTTP GET . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .103


**12** / **Handling Actuator Requests . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 105

From HTTP Resources to Controlling Things . . . . . . . . . . . . . . . . . . . . . . . . . . . . .106
URIs of Manipulated Variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .106
LedController . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
Test Client in C# . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 111
Embed a JavaScript Test Client on the Netduino . . . . . . . . . . . . . . . . . . . . . . . . . 114
What You Should Know About HTTP PUT . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 118


**13** / **Going Parallel . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 121

Multithreading . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 122
ParallelBlinker . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 132
What You Should Know About Multithreading . . . . . . . . . . . . . . . . . . . . . . . . . . . .136


**14** / **Where Can I Go from Here? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 137

Recipes for Modifying a Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
Server Versus Client? When to Push, When to Pull? . . . . . . . . . . . . . . . . . . . . . . .143
Taking a REST . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .144
Communities . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .145
Other Hardware . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .145
The Sky Is the Limit . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .148


**A** / **Test Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 149


**B** / **.NET Classes Used in the Examples . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 153


**C** / **Gsiot.Server Library . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 155


**Index . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .** 169


��������������


### **Preface**

One of the most fascinating trends today is the emergence of low-cost
_microcontrollers_ that are sufficiently powerful to connect to the Internet.
They are the key to the _Internet of Things_, where all kinds of devices
become the Internet’s interface to the physical world.


Traditionally, programming such tiny _embedded_ devices required
completely different platforms and tools than those most programmers
were used to. Fortunately, some microcontrollers are now capable of
supporting modern software platforms like .NET, or at least useful
subsets of .NET. This allows you to use the same programming language
(C#) and the same development environment (Visual Studio) when
creating programs for small embedded devices, smartphones, PCs,
enterprise servers, and even cloud services.


So what should you know in order to get started? This book gives one
possible answer to this question. It is a _Getting Started_ book, so it is
neither an extensive collection of recipes (or design patterns for that
matter), nor a reference manual, nor a textbook that compares
different approaches, use cases, etc. Instead, its approach is “less is
more,” helping you to start writing Internet of Things applications with
minimal hassle.

#### The Platforms


The _.NET Micro Framework_ (NETMF) provides Internet connectivity, is
simple and open source (Apache license), has hardware available from
several vendors, and benefits from the huge .NET ecosystem and available know-how. Also, you can choose between Visual Studio (including
the free Express Edition) on Windows, and the open source Mono toolchain on Linux and Mac OS X.


There is an active community for NETMF at _[http://www.netmf.com/](http://www.netmf.com/Home.aspx)_
_[Home.aspx](http://www.netmf.com/Home.aspx)_ . The project itself is hosted at _[http://netmf.codeplex.com/](http://netmf.codeplex.com/)_ .


_Netduino Plus_ ( _[http://www.netduino.com/netduinoplus](http://www.netduino.com/netduinoplus)_ ) is an inexpensive
NETMF board from _Secret Labs_ ( _[http://www.secretlabs.com](http://www.secretlabs.com)_ ). This board
makes Ethernet networking available with a price tag of less than $60.
It has the following characteristics:


**»** A 48 MHz Atmel SAM7 microcontroller with 128 KB RAM and 512 KB
Flash memory


**»** USB, Ethernet, and 20 digital I/O pins (six of which can be configured
optionally for analog input)


**»** Micro SD card support


**»** Onboard LED and pushbutton


**»** Form factor of the Arduino ( _[http://www.arduino.cc/](http://www.arduino.cc/)_ ); many Arduino
_shields_ (add-on boards) can be used


**»** .NET Micro Framework preprogrammed into Flash memory


**»** All software and hardware is open source


There is an active community for the Netduino Plus (and NETMF) at
_[http://forums.netduino.com/](http://forums.netduino.com/)_ . All the examples in this book use the
Netduino Plus.

#### How This Book Is Organized


The book consists of three parts:


**»** Part I, Introduction


The first part tells you how to set up the development environment and
write and run a “Hello World” program. It shows how to write to output
ports (for triggering so-called _actuators_ such as LED lights or motors)
and how to read from input ports (for _sensors_ ). It then introduces the
most essential concepts of the Internet of Things: HTTP and the division
of labor between clients and servers. In the Internet of Things, devices
are programmed as clients if you want them to push sensor data to
some service; they are programmed as servers if you want to enable
remote control of the device over the Web.


�������������


**»** Part II, Device as HTTP Client


The second part focuses on examples that send HTTP requests to
some services—e.g., to push new sensor measurements to the Pachube
service ( _[http://www.pachube.com](http://www.pachube.com)_ ) for storage and presentation.


**»** Part III, Device as HTTP Server


The third part focuses on examples that handle incoming HTTP
requests. Such a request may return a fresh measurement from
a sensor, or may trigger an actuator. A suitable server-side library
is provided in order to make it easier than ever to program a small
device as a server.


**»** Appendix A, Test Server


This contains a simple test server that comes in handy for testing and
debugging client programs.


**»** Appendix B, .NET Classes Used in the Examples


This shows the .NET classes that are needed to implement all examples,
and the namespaces and assemblies that contain them.


**»** Appendix C, Gsiot.Server Library


This summarizes the interface of the helper library ������������ that
we use in Part III.

#### Who This Book Is For


This book is intended for anyone with at least basic programming skills
in an object-oriented language, as well as an interest in sensors, microcontrollers, and web technologies. The book’s target audience consists
of the following groups:


**»** Artists and designers


You need a prototyping platform that supports Internet connectivity,
either to create applications made up of multiple communicating devices,
or to integrate the World Wide Web into a project in some way. You want to


�������������� **�**


turn your ideas into reality quickly, and you value tools that help you get
the job done. Perhaps you have experience with the popular 8-bit Arduino
platform ( _[http://www.arduino.cc/)](http://www.arduino.cc/)_, and might even be able to reuse some
of your add-on hardware (such as shields and _breakout boards_ ) originally
designed for Arduino.


**»** Students and hobbyists


You want your programs to interact with the physical world, using
mainstream tools. You are interested in development boards, such as the
Netduino Plus, that do not cost an arm and a leg.


**»** Software developers or their managers


You need to integrate embedded devices with web services and want
to learn the basics quickly. You want to build up an intuition that ranges
from overall system architecture to real code. Depending on your prior
platform investments, you may be able to use the examples in this
book as a starting point for feasibility studies, prototyping, or product
development. If you already know .NET, C#, and Visual Studio, you can
use the same programming language and tools that you are already
familiar with, including the Visual Studio debugger.


To remain flexible, you want to choose between different boards from
different vendors, allowing you to move from inexpensive prototypes
to final products without having to change the software platform. To
further increase vendor independence, you probably want to use open
source platforms, both for hardware and software. To minimize costs,
you are interested in a platform that does not require the payment of
target royalties, i.e., per-device license costs.


If your background is in the programming of PCs or even more powerful
computers, a fair warning: embedded programming for low-cost devices
means working with very limited resources. This is in shocking contrast
with the World Wide Web, where technologies usually seem to be created
with utmost inefficiency as a goal. Embedded programming requires
more careful consideration of how resources are used than what is
needed for PCs or servers. Embedded platforms only provide small subsets of the functionality of their larger cousins, which may require some
inventiveness and work where a desired feature is not available directly.
This can be painful if you feel at home with “the more, the better,” but it
will be fun and rewarding if you see the allure of “small is beautiful.”


���������������


#### What You Need to Get Started

This book focuses on the interaction between embedded devices and other
computers on the Internet, using standard web protocols. Its examples
mostly use basic sensors and actuators, so it is unnecessary to buy much
additional hardware besides an inexpensive computer board. Here is a list
of things you need to run all the examples in this book:


**»** A Netduino Plus board ( _[http://www.netduino.com/netduinoplus](http://www.netduino.com/netduinoplus)_ )


**»** A micro USB cable (normal male USB-A plug on PC side, male micro
USB-B plug on Netduino Plus side), to be used during development and
for supplying power


**»** An Ethernet router with one Ethernet port available for your Netduino
Plus


**»** An Internet connection to your Ethernet router


**»** An Ethernet cable for the communication between Netduino Plus and
the Ethernet router


**»** A potentiometer with a resistance of about 100 kilohm and throughhole connectors


**»** A Windows XP/Vista/7 PC, 32 bit or 64 bit, for the free Visual Studio
Express 2010 development environment (alternatively, you may use
Windows in a virtual machine on Mac OS X or Linux, or you may use the
Mono toolchain on Linux or Mac OS X)


NOTE: There are several sources where you can buy the hardware
components mentioned above, assuming you already have a router
with an Internet connection:


**»** Maker SHED ( _[http://www.makershed.com/](http://www.makershed.com/)_ )


**»** Netduino Plus, part number MKND02
**»** Potentiometer, part number JM2118791


**»** SparkFun ( _[http://www.sparkfun.com/](http://www.sparkfun.com/)_ )


**»** Netduino Plus, part number DEV-10186


������������� **�**


**»** Micro USB cable, part number CAB-10215 (included with Netduinos
for a limited time)
**»** Ethernet cable, part number CAB-08916
**»** Potentiometer, part number COM-09806

For more sources in the U.S. and in other world regions, please see
_[http://www.netduino.com/buy/?pn=netduinoplus](http://www.netduino.com/buy/?pn=netduinoplus)_ .


It is also possible to add further sensors and actuators.

#### Conventions Used in This Book


The following typographical conventions are used in this book:


**»** _Italic_


Indicates new terms, URLs, email addresses, filenames, and file
extensions.


**»** ��������������


Used for program listings, as well as within paragraphs to refer to
program elements such as variable or function names, data types,
statements, and keywords.


**»** _**�������������������**_


Shows commands or other text that should be typed literally by the user.


**»** _���������������������_


Shows text that should be replaced with user-supplied values or by
values determined by context.


NOTE: This style signifies a tip, suggestion, or general note.


������������


#### Using Code Examples

This book is here to help you get your job done. In general, you may use the
code in this book in your programs and documentation. You do not need to
contact us for permission unless you’re reproducing a significant portion of
the code. For example, writing a program that uses several chunks of code
from this book does not require permission. Selling or distributing a CDROM of examples from O’Reilly books does require permission. Answering
a question by citing this book and quoting example code does not require
permission. Incorporating a significant amount of example code from this
book into your product’s documentation does require permission.


We appreciate, but do not require, attribution. An attribution usually
includes the title, author, publisher, and ISBN. For example:
“ _Getting Started with the Internet of Things_, by Cuno Pfister.
Copyright 2011 Cuno Pfister, 978-1-4493-9357-1.”


If you feel your use of code examples falls outside fair use or the permission given here, feel free to contact us at _[permissions@oreilly.com](mailto:permissions@oreilly.com)_ .

#### How to Contact Us


Please address comments and questions concerning this book to the
publisher:


O’Reilly Media, Inc.
1005 Gravenstein Highway North
Sebastopol, CA 95472
800-998-9938 (in the United States or Canada)
707-829-0515 (international or local)
707-829-0104 (fax)


We have a web page for this book, where we list errata, examples, and any
additional information. You can access this page at:


_[http://oreilly.com/catalog/0636920013037](http://oreilly.com/catalog/0636920013037)_


To comment or ask technical questions about this book, send email to:


_bookquestions@oreilly.com_


For more information about our books, conferences, Resource Centers,
and the O’Reilly Network, see our website at:


_[http://oreilly.com](http://oreilly.com/)_


������������� **�**


#### Safari® Books Online

Safari Books Online is an on-demand digital library
that lets you easily search over 7,500 technology
and creative reference books and videos to find the
answers you need quickly.


With a subscription, you can read any page and watch any video from our
library online. Read books on your cell phone and mobile devices. Access
new titles before they are available for print, and get exclusive access to
manuscripts in development and post feedback for the authors. Copy
and paste code samples, organize your favorites, download chapters,
bookmark key sections, create notes, print out pages, and benefit from
tons of other time-saving features.


O’Reilly Media has uploaded this book to the Safari Books Online service. To
have full digital access to this book and others on similar topics from O’Reilly
and other publishers, sign up for free at _[http://my.safaribooksonline.com](http://my.safaribooksonline.com)_ .

#### Acknowledgments


My thanks go to Brian Jepson, Mike Loukides, and Jon Udell, who made it
possible to develop this mere idea into an O’Reilly book. It was courageous
of them to take on a book that uses a little-known software platform, bets
on a hardware platform not in existence at that time, and addresses a field
that is only now emerging. Brian not only edited and contributed to the
text, he also tried out all examples and worked hard on making it possible
to use Mac OS X and Linux as development platforms.


I would like to thank my colleagues at Oberon microsystems for their
support during the gestation of this book. Marc Frei and Thomas Amberg
particularly deserve credit for helping me with many discussions, feedback, and useful code snippets. Their experience was invaluable, and
I greatly enjoyed learning from them. Marc’s deep understanding of REST
architecture principles and its implementation for small devices was
crucial to me, as was Thomas’s insistence on “keeping it simple” and his
enthusiasm for maker communities like those of Arduino and Netduino.
Both showed amazing patience whenever I misused them as sounding
boards and guinea pigs. I could always rely on Beat Heeb for hardware
and firmware questions, thanks to his incredible engineering know-how,
including his experience porting the .NET Micro Framework to several
different processor architectures.


��������������


Corey Kosak’s feedback made me change the book’s structure massively
when most of it was already out as a Rough Cut. This was painful, but the
book’s quality benefited greatly as a result.


I have profited from additional feedback by the following people:
Chris Walker, Ben Pirt, Clemens Szyperski, Colin Miller, and Szymon
Kobalczyk. I am profoundly grateful because their suggestions
definitely improved the book.


The book wouldn’t have been possible without the Netduino Plus, and Chris
Walker’s help in the early days when there were only a handful of prototype
boards. Whenever I had a problem, he responded quickly, competently, and
constructively. I have no idea when he finds time to sleep.


Last but not least, many thanks go to the team at Microsoft—in particular
Lorenzo Tessiore and Colin Miller—for creating the .NET Micro Framework in
the first place. Their sheer tenacity to carry on over the years is admirable,
especially that they succeeded in turning the platform into a true open
source product with no strings attached.


��������������� **�**


### 4 / The Internet of Things

Now that you have seen how to work with simple sensors and actuators,
it is time to take the next step toward an Internet of Things application.
In this chapter, I will briefly introduce the Internet of Things, and the
related _Web of Things_ .


The Internet of Things is a global network of computers, sensors, and
actuators connected through Internet protocols.


A most basic example is a PC that communicates over the Internet with a
small device, where the device has a sensor attached (e.g., a temperature
sensor), as shown in Figure 4-1.


_Figure 4-1. A PC and a device connected through the Internet_


The _TCP/IP_ protocol is the key Internet protocol for such communication
scenarios. It enables the transfer of byte streams between two computers
in either direction. For example, using the TCP/IP protocol, the device in
Figure 4-1 may periodically deliver temperature measurements to a
program running on the PC.


�� **�**


#### HTTP

While it is possible to run any kind of proprietary protocol on top of TCP/
IP, there are a few popular and widely supported standard protocols. If
you use a standard protocol to deliver your sensor data, you’ll be able to
work with many more devices and applications than if you developed your
own proprietary protocol.


The most important standard protocol by far is the _Hypertext Transfer_
_Protocol_ (HTTP), the protocol of the World Wide Web. HTTP describes
how a client interacts with a server, by sending _request messages_ and
receiving _response messages_ over TCP/IP, as diagrammed in Figure 4-2.


_Figure 4-2. Client sends request message, server answers with response_
_message_


Web browsers are the most popular HTTP clients, but you can easily
write your own clients—and your own servers. If you use a web browser to
access a device, the device has the role of a web server, providing a _web_
_service_ over the Internet.


A server contains _resources_, which can be anything of interest, e.g., a
document (typically an HTML web page), the most current measurement of a sensor, or the configuration of a device. When you design a
web service, you need to decide which resources it should expose to
the world.


�������������������������������������������������


HTTP uses _Uniform Resource Identifiers_ (URIs) to tell the server which
resource the client wants to read, write, create, or delete. You know URIs
from web browsing; they look something like these: [1]


[���������������������������������](http://www.example.com/index.html)

[�����������������������������������](http://www.example.com/temperatures)

[������������������������������������������](http://www.example.com/temperatures/actual)

[������������������������������������������������](http://www.example.com:50000/temperatures/actual)

[����������������������������������������������](http://www.example.com/temperatures?alarm=none')

[����������������������������������������������](http://www.example.com/temperatures?alarm=high)

[���������������������������������������������](http://www.example.com/temperatures?alarm=low)

[�����������������������������������](http://www.example.com/valve/target)


A URI indicates the _scheme_ (e.g., ���� ), the _host_ (e.g., [���������������](http://www.example.com) ),
optionally the _port_ (e.g., ����� ), and the _path_ (e.g., �������������������� )
to the resource owned and managed by this host, as shown in Figure 4-3.
Optionally, a URI may also contain a _query_ (e.g., ���������� ) after a character that follows the path.


For the HTTP protocol, port 80 is used by default unless another port is
chosen explicitly, perhaps for testing purposes. The path is called _request_
_URI_ in HTTP; it denotes the target resource of an HTTP request.


NOTE: URIs that start with a scheme are _absolute URIs_ . URIs without a
scheme are _relative URIs_ . A request URI is a relative URI that starts with - .
Sometimes you will have to work with absolute URIs and other times with
relative URIs, as you will see in the examples.


_Figure 4-3. URI that addresses a resource managed by a host_


1 These URIs are URLs ( _Uniform Resource Locators_ ) as well. A URL is a URI that also indicates a specific location of a resource, in addition to its identity. I will use the more general term URI throughout this book.


������������������������������ **�**


There are several kinds of HTTP requests that a client can send, but the
most popular are _GET_ for reading a resource, _PUT_ for writing to a resource,
_POST_ for creating a resource, and _DELETE_ for deleting a resource. Web
browsers mostly issue GET requests, which make up the vast majority of
HTTP requests. In a Web of Things application, a GET request to a URI,
such as:


[������������������������������������������](http://www.example.com/temperatures/actual)


may return the most recent measurement of a temperature sensor, while
a PUT to a URI, such as:


[�����������������������������������](http://www.example.com/valve/target)


may change the setting of an actuator—in this case, a valve. POST requests
add sub-resources to a resource, which is similar to putting a file into a
directory. For example, a POST of a measurement to the following resource:


[�����������������������������������](http://www.example.com/temperatures)


may create a new resource:


[������������������������������������������](http://www.example.com/temperatures(42135))


A DELETE request removes a resource—e.g., it may remove the
������������� resource:


[�����������������������������������](http://www.example.com/temperatures)


from the server. (Of course, this would not physically remove the
temperature sensor from the hardware.)


PUT requests, POST requests, and GET responses carry _representations_
of the addressed resource. The best-known representation is the _Hyper-_
_text Markup Language_, better known as HTML. A web browser is an HTTP
client that knows how to render HTML pages on the screen. There are other
popular representations: PDF, JPEG, XML-based data formats, etc. A web
service may support _one or several representations_ for a single resource.
For example, a temperature measurement may be represented in a plaintext representation, like this:


��������


or in an XML representation, like this:


��������

�����������������������

��������������������

���������


�������������������������������������������������


Some representations are standardized, like HTML, but you may also
define your own representations, like those above. Some representations
are self-contained documents; others support _links_ to other resources.
You know the hypertext links from HTML, which use URIs to address
other resources. By clicking on a link, you cause the browser to send a
GET request to obtain a representation of that resource. This request is
sent to the host contained in the link’s URI.


Let’s look at a complete example of an HTTP request/response interaction
(Figure 4-4):


1. This diagram shows a GET request, as it may be sent by a web browser

or your own client program. The client requests a representation of the
resource’s “actual temperature as measured by the temperature sensor,”
whose URI consists of the host [���������������](http://www.example.com) and the request URI
�������������������� .


2. The service at host [���������������](http://www.example.com) receives the request, measures

the temperature, and returns a response message. In this example, the
response indicates success ( ��� �� ) and a plain-text representation that
is 8 bytes long. The representation is ���� ��� .


_Figure 4-4. HTTP request and response_


������������������������������ **�**


Even the most complex web interactions consist of such message
exchanges. The Web includes several hundred million clients and several
hundred thousand servers with their resources, and it produces a torrent
of messages that carry resource representations. The technical term
for this architecture is _representational state transfer_, or _REST_ . For more
information on REST, see _RESTful Web Services_ by Leonard Richardson
and Sam Ruby (O’Reilly).


The focus of _Getting Started with the Internet of Things_ is to show how
REST and common web standards can be used as the preferred way of
creating Internet of Things applications. Such applications are sometimes
called Web of Things applications, to emphasize the use of web standards
on top of the basic Internet protocols.


The Web of Things consists of RESTful web services that measure or
manipulate physical properties.


Thus, the term Web of Things focuses on the application layer and the
real-world “things” that are measured or manipulated. The term Internet
of Things focuses on the underlying network layers and the technical
means for measuring and manipulating the physical environment—i.e.,
sensors and actuators.

#### Push Versus Pull


There are four basic ways in which your device may communicate with
another computer on the Web:


1. Device is the _client_, pushing data _to_ a server


2. Device is the _client_, pulling data _from_ a server


3. Device is the _server_, providing data _to_ clients


4. Device is the _server_, accepting data _from_ clients


These patterns can be visualized as shown in Figure 4-5. A black arrow
indicates the direction of a request message and a dotted arrow indicates
the direction in which data flows, i.e., in which direction a resource
representation is sent.


�������������������������������������������������


_Figure 4-5. Four basic web interaction patterns_


In monitoring applications, a device _produces_ data, i.e., measurements
from its attached sensors. For such applications, the interaction patterns
1 and 3 are suitable: data flows from the device _to_ another computer; the
device is either client (1) or server (3).


In control applications, a device _consumes_ data, i.e., commands from
a web browser or other client. For such applications, the interaction
patterns 2 and 4 are suitable: data flows to the device _from_ another
computer; the device is either client (2) or server (4).


NOTE: A web browser is a client that mainly pulls data from web servers
by sending GET requests to them. So you are probably most familiar with
interaction pattern 2 because this is the way web browsers work.


In Part II, I will focus on the device as client (i.e., on scenarios 1 and 2).
Since in general, a device cannot know in advance when you want to send
it a command (e.g., to set up an actuator or to reconfigure a sensor), it
makes sense to support devices as servers as well. Therefore, I will discuss
scenarios 3 and 4 in Part III. I believe that the potential of the Internet of
Things will only be realized if devices can become clients, servers, or both.


������������������������������ **�**


### 5 / Pachube

Imagine that your Netduino Plus uses a sensor to take measurements
periodically. After each measurement, the Netduino Plus immediately
sends the sample to a server for storage and later retrieval. This server
effectively provides a _feed_ resource to which you publish your data
samples. You may already know the concept of feeds from RSS feed
readers. A feed entry can be anything of interest, from political news to
blog entries to measurements, as in the case of your Netduino Plus. In
a way, a feed that contains measurements can be thought of as a news
source about the physical world.


For such an example, you need a suitable web service to which your
device can send its measurements. Conveniently, there’s a free service,
Pachube, which does exactly this. It provides web-based interfaces for
storing and for accessing feeds, as shown in Figure 5-1.


_Figure 5-1. Example of a Pachube feed_


�� **�**


NOTE: The example in Figure 5-1 is a NASA feed. It is atypical insofar as
the source of its data is a multimillion dollar space probe—not exactly a
low-cost device. Nevertheless, you can use Pachube just as well with your
$60 Netduino Plus.


To use Pachube, you need a free account and a feed to which you can
send your own data. Follow these steps to create both the account and a
first feed:


1. Sign up for a free account at _[http://www.pachube.com/signup.](http://www.pachube.com/signup)_


2. On the “my settings” page ( _http://www.pachube.com/users/_

_<your account name>/settings_ ), you will find the private master
API key that you will need later on in your Pachube client programs.


NOTE: Your Netduino Plus programs will send the API key along with
every HTTP request to Pachube. The API key tells Pachube that your
client program is authorized to add new measurements to your feeds.
You’ll see how to use this in Chapter 6.


Pachube also supports more advanced _secure sharing keys_ as a more
secure and fine-grained mechanism where you can, for example, use
keys specifically for particular applications, limit the actions possible with
these keys, control how long they remain valid, etc.


3. Set up your first feed at _[http://www.pachube.com/feeds/new.](http://www.pachube.com/feeds/new)_


4. For the Feed type, click on “manual”.


5. For the Feed title, type in a suitable name, such as “My first feed”.


6. For the Feed tags, you could type in “gsiot” so that other readers of this

book can find it.


7. For the Exposure, click on “indoor”.


8. For the Disposition, click on “fixed”.


�������������������������������������������������


9. For the Domain, click on “physical”.


10. You may enter other information if you want, such as a location name and

the location itself (click on the Google map to define the location). If you
choose to provide a location, I suggest you pick a well-known public point
of interest near you rather than your actual home address.


11. Note the ID of this feed. It is part of the web page URI (circled in

Figure 5-2).


_Figure 5-2. Editing the properties of a Pachube feed_


NOTE: A Pachube feed contains one or several _data streams_ ; for example,
a feed may contain one data stream for every sensor in a building. In the
simplest case, a feed has only one data stream—for the measurements of
one sensor. In our examples, we will use two data streams: one for voltage
values, the other for simple integer numbers.


��������������� **�**


12. Click on “+ Add a new datastream”. Enter “voltage” as the ID, enter

“Volt” in the Units field, and enter V in the Symbol field. In Type, select
“derived SI”, which means that this is a unit derived from some other
physical units that are considered more basic.


13. Click on “+ Add a new datastream” again. Enter “number” as the ID and

leave all other properties as they are.


14. Click on Save Feed.


15. Given your Pachube feed ID, look at the feed’s home page by typing in its

URI. For example, for the feed ���, use the URI [�����������������������](http://www.pachube.com/feeds/256)
[���������](http://www.pachube.com/feeds/256) .


Pachube supports a number of URIs for accessing a given feed or data
stream. Table 5-1 shows the most important URIs, using the feed ID ���
and the data stream ID - as examples.


Table 5-1. Most important URIs for accessing Pachube feeds






|Pachube URI|Description|
|---|---|
|_http://www.pachube.com/feeds/256_|HTML home page of feed.|
|_http://api.pachube.com/v2/feeds/256._<br>_json_|JSON (_http://www.json.org_) <br>representation of feed, <br>providing maximum, minimum, and<br>current measurement values, plus<br>some metadata that describes the<br>feed.<br>It is also possible to request the data in<br>XML or CSV formats by using the[PO <br>orFVY suffixes respectively, instead<br>ofMVRQ.|
|_http://api.pachube.com/v2/feeds/256/_<br>_datastreams/0.csv?duration=24hours&_<br>_interval=900_|History of measurements in data<br>stream of feed, represented<br>as comma-separated values. Can be<br>imported directly into a spreadsheet.<br>All measurements of the last 24 hours<br>are given, in 15-minute intervals. You<br>can vary the arguments to adjust the<br>time period and the minimum interval<br>between the points.|
|_http://api.pachube.com/v2/feeds/256/_<br>_datastreams/0.png?duration=24hours&_<br>_interval=900_|Same data as in the above example,<br>but represented as a diagram.|



�������������������������������������������������


In Chapter 6, you will learn how to send data to your Pachube feed from a
program that runs on your Netduino Plus.


JSON


_JSON_, which stands for _JavaScript Object Notation_, is a textual
format for representing arbitrary data. In this respect, it is similar
to the often-used XML representation. JSON is popular for web
applications since its text is simpler and usually less verbose
than equivalent XML text. While JSON is part of the JavaScript
language, it is supported by libraries for practically all programming languages today, and has thereby gained “a life of its own.”
Here is an example of JSON text:


  �������������������������������������������
�����������������������
����������������������
�����������������

  

��������������� **�**


**About the Author**


Dr. Cuno Pfister studied computer science at the Swiss Federal Institute
of Technology in Zürich (ETH Zürich). His PhD thesis supervisor was
Prof. Niklaus Wirth, the designer of the Pascal, Modula-2, and Oberon
programming languages. Dr. Pfister is the Managing Director of Oberon
microsystems, Inc., which has worked on various projects related to the
Internet of Things, from mobile solutions to a large hydropower-plant
monitoring system with 10,000 sensors.


**Colophon**


The cover, heading, and body font is BentonSans, and the code font is
Bitstreams Vera Sans Mono.


