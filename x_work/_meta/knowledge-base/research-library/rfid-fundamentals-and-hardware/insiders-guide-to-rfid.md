###### **T H E I N S I D E R ’ S**
## GUIDE

###### **TO WO R K I N G W I T H**
# RFID

#### ��������������

atlasRFIDstore Books


atlasRFIDstore.com


### **The Insider’s Guide to** **Working with RFID**

##### **SUZANNE SMILEY**

atlasRFIDstore Books


Copyright © 2020 atlasRFIDstore


All rights reserved. No part of this book may be
reproduced or used in any manner without written
permission of the copyright owner except for
the use of quotations in a book review. For more
information, contact atlasRFIDstore.


First paperback edition February 2020


Author Suzanne Smiley
Book design by Kate Dozier Daniels


atlasRFIDstore
2014 Morris Avenue
Birmingham, AL 35203
United States of America


www.atlasRFIDstore.com


Preface


This book is a collection of RFID eBooks, guides, and articles
that were irst published on atlasRFIDstore’s Resources page
or atlasRFIDstore’s blog, RFID Insider. We’ve taken our
most popular and informative content and combined them
into an easy-to-read RFID guide. The chapters and concepts
we’ve selected range from RFID basics to intermediate topics,
from RFID concepts to frequently asked questions. We’ve
arranged the topics in an order that makes sense for readers
new to the technology, but, they don’t have to be read in any
certain order.


This guide does not cover every aspect of RFID technology,
but instead is intended to walk you through RFID basics
and key concepts. At the end of each chapter, a worksheet is
included to test reading comprehension and RFID knowledge.


For more information about RFID and related technologies,
please contact us or check out our educational resources.


Contents


Preface 6


Introduction to RFID 10


Electromagnetic Spectrum 11


Main Types of RFID 15


Low Frequency 15
High Frequency & Near-Field Communication 17
Ultra-High Frequency 20
Types of RFID Worksheet 28


RFID Tags 31

What are RFID tags and how do they work? 31
What’s Inside an RFID tag? 32
Types of Tags 34
Positioning RFID Tags – SOAP Method 35
Size 36
Tag Attachment Methods 37
Application Surface Materials 38
Tag Special Features 39
The Relationship Between Tag Read Range and Size 42
Tag Customization Options 44
Customizable Features 44
Encoding RFID Tags 47
Conversions – Bits > Hex > ASCII 50
RFID Tag Worksheet 54


RFID Antennas 57


Size: Large or Small 58
Ruggedness: Indoor or Outdoor 59
Form Factor: External or Integrated 60
Frequency Range: US, EU, or Global 61


Polarization: Circular or Linear 62
Read Range: Far-Field or Near-Field 64
Strength: High or Low Gain 65
Coverage: Wide or Narrow Beamwidth 66
Direction: Directional or Omni-Directional 68
RFID Antenna Worksheet 70


RFID Readers 72


Types of Readers 72
RFID Reader Worksheet 84


RFID Cables, Connectors, & Adapters 87


Components of Coaxial Cables 87
RFID Cable Worksheet 99


RFID Printers 102

When to Invest in an RFID Printer 102
Types of RFID Printers 104
RFID Printer Worksheet 118


RFID Software 121


Software, Firmware, Middleware 121
RFID Software Worksheet 123


Important RFID Concepts 124


Regional Regulations 124
Frequency Hopping 130
UHF Security Measures 131
Custom Protocols & Interfaces 135
Factoring in the Environment 139
GPIO Capabilities 144
Multipath 146
Testing 151
Challenges 153


RFID Concepts Worksheet 159


Deploying RFID: 20 Questions & Answers 165

How do I know if RFID is right for my application? 165
Is there a chance RFID won’t work for me? 167
How much will an RFID system cost? 167
Can I try RFID before investing in a full system? 168
How do I choose my RFID hardware? 170
How do I choose my RFID tags? 170
Can I get RFID Tags pre-printed and pre-encoded? 170
What sort of software will I need for my RFID system? 170
Can I setup an RFID system without software? 171
Do I need a software engineer on staff? 171
Who installs the RFID system? 172
Is there a recommended way to set up RFID hardware and
get started? 172
How many read zones are needed and where will they be
located? 173
There are items in my facility that contain liquids/metals;
does that mean RFID will not work for me? 174
What if I want to use RFID in my facility for more than one
application? Should I have separate RFID systems? 175
How long does a typical RFID system take to deploy? 175
How do I train my employees on RFID? 176
Where can I learn more about RFID? 177
Deploying RFID Worksheet 178


Learn more about RFID and Other Topics 181


Introduction to RFID


Radio Frequency Identiication (RFID) is the wireless
non-contact use of radio frequency waves to transfer data.
Tagging items with RFID tags allows users to automatically
and uniquely identify and track inventory and assets. RFID
takes auto-ID technology to the next level by allowing tags to
be read without line of sight and, depending on the type of
RFID, having a read range between a few centimeters to over
20+ meters.

RFID has come a long way from its irst application of
identifying airplanes as friend or foe in World War II. Not
only does the technology continue to improve year over year,
but the cost of implementing and using an RFID system
continues to decrease, making RFID more cost-effective and
eficient.


The ability to identify and track individual items, as well as
crates of items, without line of sight can be an advantage for
many companies across almost any vertical. For example, if a
company has 5,000 identical plastic crates, an RFID tag can
be placed on each one in order to recognize crate 1,948 from
crate 3,097 without requiring line of sight. Identifying these


12


crates can be crucial to the company’s bottom line when one
is carrying valuable merchandise or a customer’s order. That
company needs to not only keep track of that merchandise
or order, but also potentially the crate itself, if it is one of the
company’s assets. RFID can be used to locate and track these
assets. Below are some additional beneits of using RFID:


- RFID doesn’t need line of sight

- RFID tags are able to be rewritten and reused

- RFID tags can be extremely durable against impact and
environmental factors

- RFID tag data is encrypted and can also be locked for
extra security

- RFID tags can hold more data than other types of tags
or labels

- RFID readers can read hundreds of tags within seconds

- RFID tags can have information printed on them like
instructions, barcodes, or company names

- RFID systems can be integrated with other internal
systems or processes


Electromagnetic Spectrum


The electromagnetic spectrum is composed of various
frequencies of waves that are produced using electromagnetic
energy. A radio wave is essentially a disturbance through space
that carries energy from one place to another. Radio waves
oscillate, in that, while traveling the energy continuously
rises and falls in intensity. This oscillation is what is typically
depicted as a wave pattern consisting of peaks (highs) and
troughs (lows). The path from trough to trough, or peak to
peak, is considered a full wave cycle, and the number of cycles
that take place in one second is known as the wave’s rate of


13


oscillation.


Radio Waves


Radio waves are characterized by frequency and wavelength.
Frequency is measured in Hertz, and one Hertz is equal to
one full wave cycle per second; so, frequency is dependent
upon the wave’s oscillation rate.


Equation for a wave’s oscillation rate:


Frequency = 865 MHz


Constant: 1 Megahertz = 1,000,000 Hertz


865 MHz is equal to 865,000,000 Hertz which means the
oscillation rate is 865,000,000 cycles per second.


Wavelength is measure in meters and is found using the
formula below.


Frequency = 865 MHz


Constant: 1 Megahertz = 1,000,000 Hertz


Speed of Light: 299,792,458 Meters/Second


14


Wavelength = Speed of Light (m/s) / Frequency in Hertz


299,792,458 / 865,000,000 = .3468 Meters = 34.68
Centimeters


For quick calculations, most round like below:


300/865 = .3468 Meters = 34.68 Centimeters


Wavelength

Within the radio wave subset of the RF spectrum, there are
eight designated frequency bands:


- Very low frequency

- Low frequency

- Medium frequency

- High frequency

- Very high frequency

- Ultra-high frequency

- Super high frequency

- Extremely high frequency


Starting at the left side of the spectrum and moving right, the
wavelength gradually decreases. Very low frequency (VLF),
the irst frequency range on the left side of the spectrum, has
an average wavelength of around 55,000 meters. That means
that a VLF wave, from one peak to another (or one trough
to another), has an average distance of 55,000 meters, or
around 500 U.S. football ields stacked together. Because radio
wavelengths correlate with the speed of data transmission (i.e.
the longer the wavelength, the slower the data transmission
and vice-versa), VLF waves result in very low read rates;
therefore, VLF is not used commonly for RFID applications.


Of the eight frequencies on the radio wave band, there are


15


three that are typically used for RFID applications:

- Low frequency (LF)

- High frequency (HF)

- Ultra-high frequency (UHF)


16


Main Types of RFID


Low Frequency


The Low Frequency, or LF band, is between 30 kHz and 300
kHz with long wavelengths of around 2,400 meters. Because
there are multiple types of signals communicating on this
band, LF RFID systems are only allowed to use the small
range between 125 – 134 kHz. The large wave size allows LF
waves to penetrate metal and water which is unique to this
frequency band.


Although LF RFID has a long wavelength, the read range
is shorter than both HF and UHF RFID – only extending


17


from a couple centimeters, up to about 50 centimeters in ideal
conditions. The short read range is due to dependence on
magnetic coupling.


LF tags are generally more expensive than HF and UHF
RFID tags, but vary in cost depending on the type and the
application. Usually, they cost anywhere from $0.70 - $20.00
per tag, and are powered solely via magnetic coupling –
meaning they could last indei nitely depending on the wear
and tear of the application. They come in a variety of shapes
and sizes, but all tags use the same type of magnetic coupling
for power and communication. These tags also have relatively
slow read rates because the data rate of transmission is very
low and it takes longer for the reader to receive and decode
the tag’s signal.


LF antenna/RFID reader combinations are available
depending on the application, and generally cost anywhere
from a couple hundred dollars up to a thousand dollars
(USD). Unlike other RFID tags, LF tags do not have security
standards, so they are not recommended for applications
where encrypted communication is a requirement.


Low Frequency Applications & Facts


LF RFID systems are used most often for animal tracking
applications (e.g. pet tagging and livestock identii cation), but
are also used in some access control applications. LF tags are
ideal for animal tracking applications because they are easily
read through the animal’s body (containing water).


18


**General Frequency Range:** 30 - 300 kHz


**Primary Frequency Range:** 125 - 134 kHz


**Read Range:** Contact - 10 Centimeters


**Average Cost Per Tag:** $0.75 - $5.00


**Applications:** Animal Tracking, Access Control, Car KeyFob, Applications with High Volumes of Liquids and Metals

**Pros:** Works well near Liquids & Metals, Global Standards


**Cons:** Very Short Read Range, Limited Quantity of Memory,
Low Data Transmission Rate, High Production Cost


High Frequency & Near-Field Communication

The high frequency (HF) band on the RF spectrum extends
from 3 MHz to 30 MHz. The wavelength of a high frequency
wave is much shorter than an LF wave – only around 22 meters,


19


or a little less than 2 school buses in length. High frequency,
like low frequency, uses magnetic coupling to communicate
between the tags and the RFID reader/antenna. HF waves
can pass through most materials except for water and dense
metals. Thin metals, like aluminum, can still be tagged with
HF tags and function normally.


HF RFID tags usually have a general read range of a few centimeters up to about a meter in length depending on the setup
of the system.

Within the high frequency band of the RF spectrum, neari eld communication, or NFC, is a communication protocol
approved by the International Organization of Standardization, or ISO (ISO 14443 & ISO 18000-3). Because NFC is
a global communication standard, and therefore regulated, it
operates on a single frequency - 13.56 MHz. Being approved
as a global communication standard and operating only on
one frequency makes NFC easily adaptable for hundreds of
applications.


HF and NFC tags are relatively inexpensive but can range in
cost depending on the size and form factor from about $0.35

- $10.00 per tag. The tags are usually delivered as labels, cards,
or plastic encased tags and are generally small in size so that
they can be applied to many different types of items. HF tags


20


rely on magnetic coupling as their power source so they tend
to last the lifespan of the application unless damaged by wear
and tear to the tag.


HF RFID readers are used with HF tags and are relatively low
in cost, generally not more than a few hundred USD. NFC
tags can be read with the same HF readers, including any
smartphones that contain HF/NFC readers. The ability to be
read by smartphones give HF/ NFC tags the ability to gain
widespread popularity in countless applications.


High Frequency Applications & Facts


HF and NFC RFID applications are continuously emerging
from numerous companies looking to solve business
problems using RFID technology. NFC is particularly popular
in marketing applications like advertising posters, smart items,
and brand/item interactive experiences. The most used
applications for HF RFID are access control applications,
data transfer applications, and some ticketing applications.


HF RFID tags are also used in passports across the world
in countries like the United States, Norway, Japan, Australia,
India, and more. There has been criticism in the past about the
security of these tags in passports which was later addressed
by adding both a metal lining to lower the read range, and a
password that has to be keyed into the RFID reader to read
the tag.


**Primary Frequency Range:** 13.56 MHz


**Read Range:** Near Contact - 30 Centimeters


21


**Average Cost Per Tag:** $0.20 - $10.00


**Applications:** DVD Kiosks, Library Books, Personal ID
Cards, Poker/Gaming Chips, NFC Applications


**Pros:** NFC Global Protocols, Larger Memory Options,
Global Standards


**Cons:** Short Read Range, Low Data Transmission Rate


Ultra-High Frequency


Passive

The dei ning quality of passive UHF RFID systems (when
compared to active UHF RFID systems) is the way in which
the RFID tags function. Passive UHF RFID tags rely on
passive backscatter modulation to function and have no
additional power source. In short, this means that the RFID
reader sends its energy through the antenna as RF waves to the
UHF RFID tags in order for them to become energized and


22


respond back to the reader. The response is called backscatter
because the tag scatters back a portion of the energy that it
receives from the reader. Because there is no additional power
available to the tag other than what is provided by the reader,
these systems have a maximum read range of around 30
meters.


UHF RFID passive tags have some of the lowest costs due
to widespread adoption. Volume quantities of UHF RFID
tags can dip as low as $0.10 cents a tag while maintaining an
average read range of 2-5 meters. UHF RFID passive tags
have decreased in cost substantially over the years allowing
companies and individuals to use low-cost, label tags as
disposable asset identii ers.


Passive UHF tags are very sensitive to both liquids and metal.
This is because the UHF waves rel ect off, refract within, or
absorb into non-RF-friendly materials. Though performance
degradation in the presence of liquids and metals may
be difi cult to overcome, interference can be mitigated
by analyzing the application environment and employing
techniques to overcome obstacles, such as installing RF
shielding and/or using metal-mount RFID tags.


Passive UHF tags come in many form factors and are usually


23


subdivided into categories like rugged, high-temperature, label
tags, high memory, etc. The tags tend to last the lifespan of
the application unless damaged by wear and tear, and because
they do not have batteries, their lifespan is not dependent on
a power source.


The hardware for UHF RFID system requires a more
signii cant investment than HF and LF system equipment.
Readers range between $450 for a low-cost reader up to over
$2,500 for a rugged handheld RFID reader.


UHF Passive Applications & Facts


UHF Passive UHF RFID systems are used in hundreds of
different applications such as tool tracking, IT asset tracking,
race timing, and laundry management. New applications for
these tags are being discovered frequently due primarily to the
tags’ long read range and low cost. Examples of applications
that benei t from RFID are endless. Applications extend
from broad areas like inventory tracking to supply chain
management and can become more specialized depending
on the company or industry. Types of RFID applications can
span from IT asset tracking to textile tracking and even into
specii cs like rental item tracking.


What sets a potential RFID application apart from applications
that can use other types of systems is the need to uniquely
identify individual items quickly and more efi ciently where
traditional systems fall short. Below are a few applications that
are successfully using RFID technology.


24


- Race Timing

- Supply Chain Management

- Pharmaceutical Tracking

- Inventory Tracking

- IT Asset Tracking

- Laundry & Textile Tracking

- File Tracking

- Returnable Transit Item (RTI) Tracking

- Event & Attendee Tracking

- Access Control

- Vehicle Tracking

- Tolling

- Hospital Infant Tracking

- Animal Tracking

- Tool Tracking

- Jewelry Tracking

- Retail Inventory Tracking

- Pipe and Spool Tracking

- Logistics Tracking (Materials Management)

- DVD Kiosks


25


- Library Materials Tracking

- Marketing Campaigns

- Real-Time Location Systems


Facts


**Primary Frequency Ranges:** 860 - 960 MHz


**Read Range:** Near Contact - 25 Meters


**Average Cost Per Tag:** $0.09 - $20.00


**Applications:** Supply Chain Tracking, Manufacturing,
Pharmaceuticals, Electronic Tolling, Inventory Tracking, Race
Timing, Asset Tracking

**Pros:** Long Read Range, Low Cost Per Tag, Wide Variety
of Tag Sizes and Shapes, Global Standards, High Data
Transmission Rates


**Cons:** High Equipment Costs, Moderate Memory Capacity,
High Interference from Metal and Liquids


Primary Subsets of Passive RFID


The relatively wide range of 860 - 960 MHz is recognized as
the ‘Global Standard’ for UHF Passive RFID; however, its
late adoption led to the range being further divided into two
primarily subsets – 865 – 868 MHz and 902 - 928 MHz.


865 - 868 MHz - ETSI


The European Telecommunications Standards Institute
(ETSI) is the governing body in Europe that sets and upholds
country-wide standards for communicating via multiple
channels, including Radio Waves. By ETSI’s regulations,
RFID equipment and tags are only allowed to communicate
on the smaller frequency range of 865 - 868 MHz because
other types of radio communications are allocated to subsets
of the larger range of 860 - 960 MHz.


26


Because ETSI sets the standards for Europe, but when
purchasing tags and equipment, the standard can be called
either ETSI or EU denoting Europe.


902 - 928 MHz - FCC

The Federal Communications Commission (FCC) is the
governing body in the United States that sets and upholds
country-wide standards for communicating via multiple
channels including Radio Waves. The FCC regulations state
that RFID tags and equipment can only operate between 902

- 928 MHz, because, like Europe, other communication types
are allocated to the remaining portions of the larger range of
860 - 960 MHz.

RFID Equipment or Tags that are FCC certiied or on the
North American Frequency Range, or NA, can be used
throughout North America.


Other

Because both ETSI and FCC were the irst major standards to
be approved, many countries either adopted one or the other,
or created their own standards* within a subset of either
frequency range. For example, Argentina chose to adopt
the FCC range of 902 – 928 MHz, while Armenia chose to
implement its own, smaller band of 865.6 – 867.6 MHz within
the ETSI range.


Although regional regulations like FCC and ETSI are typically
discussed using frequency ranges, there are other speciics that
each country regulates such as the amount of radiated power
(ERP or EIRP). Certain countries are stricter and regulate
where RFID can be used, the amount of frequency “hopping”
that must be used, or that a license is required to use RFID.
For more information on each country’s regulations – read “
How to Conform to Regional Regulations when using RFID”.


27


Active UHF RFID


Active UHF RFID systems do not rely on passive backscatter
to function; instead, they use an internal battery as a power
source. Because these tags contain a battery, they do not need
to be energized by an RFID reader; instead, they proactively
beacon at predetermined intervals. These beacons announce
the presence of the tag to any readers that are within range of
the tag. Active RFID readers detect the beacons from the tags
and pass them on to a host system for processing.


Active UHF RFID tags can have a very long read range due
to the internal battery, with beacons that can be detected by
readers over 100 meters away. The signal boosting power
received from the internal battery also helps these tags to
overcome any materials that usually hinder RF waves like
metal and water. Certain active RFID tags are engineered to
withstand harsh environments like extremely low temperatures
and rugged applications, including being able to continue
beaconing while being buried in snow or dirt.


Active RFID tags are relatively expensive because they
contain an internal battery and other electronics components.
Depending on their features (e.g. Wi-Fi, Bluetooth, GPS),
these tags cost $20 per tag and up. One drawback of active
tags is their limited lifespan. Because they rely on a battery for
power, these tags (like their batteries) can only last about 3-5
years (depending on beacon rate). While that timeframe works
well for some applications, other applications may require the
tags to be replaced.


Active UHF Applications & Facts


Active UHF RFID applications are frequently used in industries
like oil and gas, transportation, and vehicle tracking. Because
active tags beacon, they are easier to read while moving and are
ideal for tracking cargo containers and vehicles. Additionally,


28


tracking items like pipes and construction equipment is one
of the more popular uses for active RFID because laydown
yards encompass very large areas. Active tags can be installed
on materials and large assets outdoors and read by handheld
or vehicle mounted readers in order to obtain their location
information.

**Primary Frequency Range:** 433 MHz, (Can use 2.45 GHz

- under the Extremely High Frequency Range)


**Read Range:** 30 - 100+ Meters


**Average Cost Per Tag:** $25.00 - $50.00


**Applications:** Vehicle Tracking, Auto Manufacturing, Mining,
Construction, Asset Tracking


**Pros:** Very Long Read Range, Lower Infrastructure Cost
(vs. Passive RFID), Large Memory Capacity, High Data
Transmission Rates

**Cons:** High Per Tag Cost, Shipping Restrictions (due
to batteries), Complex Software may be Required, High
Interference from Metal and Liquids; Few Global Standards


29


Types of RFID Worksheet


1. RFID stands for:


a. Radio Frequency Identifying Detail
b. Radio Frequency Intricate Deployment
c. Radio Frequency Identiication
d. Radio Frequency Interrogation and Deployment


2. What is an advantage of RFID over barcodes?


a. No need for line of sight
b. Read many tags per second
c. Increased data storage capacity
d. Data can be encrypted
e. All the above


3. The three frequencies most commonly used for
RFID are:

a. Low Frequency (LF)
b. High Frequency (HF)
c. Super High Frequency (SHF)
d. Ultra-High Frequency (UHF)
e. A, B, and D
f. A, B, and C


4. Low Frequency is:


a. Between 30 kHz and 300 kHz
b. Able to penetrate most metals and water
c. Frequently used in Animal Tracking and
Access Control
d. Known for a very long read range
e. A, B, and C
f. All the above


30


5. High Frequency RFID is commonly used for:


a. Access Control
b. Animal Tracking
c. Race Timing
d. Railway Management


6. NFC is a global communication standard that operates
on a frequency of ________ within the __________
range.


a. 13.56 MHz; High Frequency
b. 13.00 MHz; High Frequency
c. 13.40 kHz; Low Frequency
d. 130.8 kHz; Low Frequency


7. Match each Frequency Range with its typical
Read Range:


a. LF d.  Near Contact to 30 Centimeters
b. HF e.  Near Contact to 25+ Meters
c. UHF f.  Contact to 10 Centimeters


8. Which of these are typical UHF applications?


a. Asset Tracking
b. Race Timing
c. Laundry Management
d. Inventory Tracking
e. All the above


9. What is the **main** difference between Passive and
Active RFID?


a. They operate on different frequency ranges
b. Active tags have batteries and passive tags do not


31


c. Active tags include Bluetooth and Passive tags do
not
d. Passive tags have a longer read range than Active
tags


10. Which of the following Frequency Ranges is best for
tracking steel pipes outside in a 40-acre area?


a. LF RFID
b. HF RFID
c. Passive UHF RFID
d. Active UHF RFID


Answers: 1) C; 2) E; 3) E; 4) E; 5) A; 6) A; 7)
A&F, B&D, C&E; 8) E; 9) B; 10) D


32


RFID Tags


What are RFID tags and how do they work?


RFID tags are placed on items to identify or track those items
over time or throughout their lifecycle. RFID tags can be used
to track all types of objects in industries like healthcare, retail,
and manufacturing, to keep track of assets or inventory. This
guide covers the main aspects to consider before deciding on
or purchasing an RFID tag. Each tag may vary signiicantly
from another, which makes choosing one that has been
designed to work in environments and applications similar to
your application essential in order to achieve the best results.


RFID tags communicate with RFID readers and antennas
via electromagnetic waves. The reader/ antenna combination
directs electromagnetic radio waves to the RFID tags in the
vicinity. The energy from the waves, harnessed by the RFID
tag’s antenna, forms a current moving towards the center of
the tag energizing the integrated circuit (IC). The IC turns
on, modulates the energy with data from its memory banks,
and directs a signal back out through the tag’s antenna. The
remaining, modulated energy that replies to the reader/
antenna is known as “backscatter”.


33


Quick Facts About UHF RFID Tags:


- Most do not have a battery, and are powered exclusively
by electromagnetic waves.

- Those with batteries (Battery-Assist Passive RFID Tags
and Active RFID Tags) can achieve much longer read
ranges.

- They do not require line of sight, unlike barcodes.

- The way that tags couple, or talk to, the RFID reader is
called “backscatter”.

- An algorithm on each tag called “Anti-Collision” deines
the order in which to reply if multiple tags are in the read
area.

- The read range can vary from inches to over 120 feet
depending on the tag.

- The integrated circuit (IC) has four memory banks –
EPC, TID, User, Reserved.

- Each type of tag has a uniquely shaped antenna to ensure
the best reactance.


What’s Inside an RFID tag?


A basic UHF RFID tag is comprised of an antenna and the
IC.


**Antenna** - A tag’s antenna is unique to that speciic type of
tag and its job is to receive RF waves, energize the IC, and
then backscatter the modulated energy to the RFID antenna.


**Integrated Circuit (IC)/Chip** - the integrated circuit, also
called the chip, contains four memory banks, processing
information, send and receive information, and anti-collision
protocols. Each IC type is unique, and there are only a handful
of manufacturers. The main variation between ICs is the
number of bits in the respective memory banks.


34


The Four Memory Banks are as Follows:


**EPC Memory Bank** - contains the Electronic Product
Code which can vary in length from 96 to 496 bits. Some
manufacturers use a randomized, unique number, while others
use random repeating numbers.


**User Memory Bank** - the User memory bank can range from
32 bits to over 64k bits and is not included on every IC. If the
tag does possess a User memory bank, it can be used for user
deined data about the item. This could be information like
item type, last service date, or serial number.


**Reserved Memory Bank** - the Reserved memory bank
contains the access and lock passwords which enable the tag
memory to be locked by the user and require a password to
view or edit.


**TID Memory Bank** - the TID memory bank contains the
Tag Identiier which is a randomized, unique number that is
set by the manufacturer and cannot be changed. In order for
the reader to read this number instead of the EPC, the reader
settings must be changed to accommodate.

Because there is a chance that a tag’s EPC number is not
unique, it is imperative to check before purchasing. Speciica

35


tions may denote either “unique, randomized EPC number”
or “Not guaranteed to be unique” (or some similar phrase). If
you purchase a tag without a unique randomized EPC number, it may need to be reencoded with a new, speciic number.
RFID readers are not able to differentiate between two tags
that share the same EPC value.


The EPC number of each tag is read to identify the tag as well
as the item that is tagged. If no software is used, the tag will
simply read the EPC number; but, by incorporating software,
it is possible to associate that number with a name, serial number, or even a picture on a database.


Types of Tags


Labels/Inlays


Labels and Inlays are two types of RFID tags that are
characterized by being paper thin and lexible. The main
difference in labels vs. inlays is that inlays are typically clear
and can be manufactured with or without adhesive. Labels
have a paper or poly (plastic) face so that that graphics or text
can be printed on them and read clearly.


Usually grouped together because of form factor and cost,
labels and inlays are cost effective and can be purchased as low
as $0.10 per tag when purchased in higher quantities. These
tags are manufactured on rolls of a few thousand and can be
run through an RFID printer to be printed and encoded.


36


Labels and inlays usually weigh less than a gram and vary
in length and width from about less than ½ an inch to over
several inches.


Hard Tags

UHF RFID hard tags are classiied as such because they are
rigid and thicker than the paper-thin labels/inlays. Hard tags
are made from many types of materials such as polycarbonate,
ceramic, ABS, steel, polystyrene, and polypropylene.


Because of the tougher exterior and larger size, these tags are
more expensive than labels and inlays. Depending on special
features, hard tags can range from just under $1 per tag to
over $15 per tag. Just like labels and inlays, these tags can also
be less expensive when purchased in higher quantities.


Hard tags vary greatly in size and weight. The smallest tags
are around 0.2 grams and the largest, rugged hard tags can
be over 250 grams. Shapes and sizes of hard tags vary greatly,
and can range from the size of a small pencil eraser to as large
as a license plate.


Positioning RFID Tags – SOAP Method


Although tag positioning sounds like something to consider
after a tag purchase, it is important at both the decisionmaking stage, as well as the post-purchase stage.


The key to tag positioning is the acronym SOAP – which
represents the four main aspects of tag positioning – Size,
Orientation, Angle, and Placement. Below is information
about each, how to use them to select the ideal tag, and when


37


to consider them.


Size


The size of the tag is an important consideration when
purchasing. Not only does tag size matter because it needs
to it the size of the object being tagged, but also because of
the correlation between tag size and read range. In short, the
larger the tag, the longer the read range.


**Most Important:** Pre-purchasing


Orientation

The tag’s orientation, vertical or horizontal or otherwise, in
relation to the RFID system’s antenna is a critical factor in
achieving ideal read rates. To ind the orientation of the tag
that produces the best read rates, rotate the tag on a lat surface
and test it at different orientations. Of note, using circularly
polarized antennas helps to mitigate any issues caused by tag
orientation.


**Most Important:** Pre-purchasing, Post-purchasing, Testing


Angle


The steeper the angle of the tag, the shorter the read range.
When possible, ensure that the front of the tag directly faces
the antenna. Even a small angle could cause a decrease in the
tag’s read range. To mitigate this issue, it is best to an array of
antennas to cover tags from multiple angles.


Pitch, Yaw, & Roll are three additional aspects to consider that
fall under both orientation and angle. Testing to cover these
positions, will ensure the best read range is received with the
selected tag and system.


**Most Important:** Post-purchasing, Testing


38


Placement

Test readability in a variety of spots on the item to ind the
“sweet spot” that generates the best reads. On a cardboard
box for example, ind the side that will face the antenna/
reader and then test in various places on that face to ind the
one that produces the best results.


**Most Important:** Post-purchasing, Testing


Tag Attachment Methods


Dependent on the exact tag, attachment methods can vary
from common forms like adhesive to unique ways such as
shrink wrap. Inlays and labels use a permanent type of adhesive
in most applications, while hard tags vary depending on the
tag type, weight, application, and application environment.
Below is a list of commonly used attachment methods for
RFID tags.


Deciding which attachment method to use will depend on
the tag, item, and application. In all applications, choosing an
attachment method can be just as important as choosing a tag.
If an attachment method fails, the tag will fall off the item
making it no longer trackable, and the application no longer
accurate.

Below are a few speciic aspects to think about before choosing
the right attachment method for your application.


**Surface Area** - Just like prepping a car for a window or bumper
sticker, the surface area of the item should be prepped for the
attachment of the tag. Depending on the method, make sure
the surface is smooth, dust and water free, and clean.


**Exposure** - If the tag will be exposed to prolonged UV light,
moisture, vibration, pressure, or chemicals, its attachment
method will be exposed as well. Certain environmental


39


conditions like the ones listed above will need special
attachment methods that have been proven reliable in similar
circumstances.


**Temperature** - As mentioned above in the exposure section,
make sure that the attachment method chosen has been tested
in similar conditions as your tagging environment. Extreme
temperatures will have different effects on the compound or
object used for attachment than the tag, like melting and/or
becoming brittle and breaking.


**Application Lifespan** - Choose a tag as well as attachment
method that will hold up the length of time that the item needs
to be tagged. Some attachment methods will slowly degrade
over time, depending on the chemical makeup. Evaluate the
attachment method chosen to ensure it can last the amount of
time the tag needs to stay on the item.


Application Surface Materials

The surface of the item to be tagged will greatly inluence tag
selection, and, if there is more than one item surface type, a
different tag should be chosen for each. For example, if an
application is taking inventory of assets and one asset is metal
and another is plastic, then those two items will likely need to
be tagged with two different RFID tags.

An object’s surface material is important because most tags
have been tuned by the manufacturer to perform better when
used on certain materials. The tag’s antenna is very sensitive to
the type of material it is placed on because of the way it sends
and receives signals. Attaching a tag to an incompatible type
of surface material could result in a lower read range, lower
read rate, or no reading at all.


The most well-known surface material for crippling read
range when tagged with the wrong type of RFID tag is


40


metal. Metal causes problems with RFID for two reasons –
irst, metal relects RFID waves and, second, RFID tags are
manufactured to perform on low-dielectric surfaces (plastic,
wood, cardboard) not high-dielectric surfaces like metal.
There are two easy ways to solve this issue, either purchase
a metal-mount tag that has a built-in, low-dielectric backing
or is tuned accordingly, or purchase a tag and place a lowdielectric material such as foam, in between the tag and the
metal object.


Tag Special Features


Nearly all UHF RFID tags have special features that make
them attractive to certain applications or environments. Most
of the time, these special features will help narrow down the
search for the ideal tag.

While labels/inlays only have a few feature options, hard tags
have quite a few, which usually explains their higher cost.
Below are special features that can be found on labels/inlays
or hard tags, and information about how they are used.


**Resistance to extreme temperatures** - Tags with this ability
can be used for tagging items in freezers or cold temperature
environments (as low as -50° C), or with high-temperature
environments (up to 250° C).


_Availability:_ Hard Tags


**Metal-mountable** - A few label/inlays exist that are metalmountable, but the majority of metal-mount RFID tags are
hard tags. These tags are tuned to work well on metal and
must be used when tagging metal items unless a spacer is used
to separate the metal object from the non-metal mountable
tag. Of note, tags made speciically for on-metal applications
tend to get better read range than those with spacers added
post-manufacturing.


41


_Availability:_ Hard Tags, All-Surface Label Tags


**Printability** - The ability to print directly onto a tag’s face is
a unique feature of inlays/labels, which allows the tags to be
identiied visually, or support marketing/branding purposes.
Most RFID inlays/labels can be run through an RFID printer
which is very convenient for large scale operations. Of note,
while it isn’t possible to print directly onto hard RFID tags,
most still are able to support a manually applied label or
sticker.


_Availability:_ Labels/Inlays


**Embeddability** - The ability to be embedded within an item
is very useful in some rugged applications where the tag could
potentially get knocked off or be in the way of the item’s use.
Most embeddable applications involve wood or metal. The
key to embedding tags in metal is to make sure that only three
sides of the tag are covered with metal while one side is left
open to allow for reader/tag communication. Epoxy can be
used to cover the open side to seal the tag in place.


_Availability:_ Hard Tags


**Impact resistance** - Some rugged application environments,
like construction yards, need tags that can withstand impact
from other objects. Non-impact resistant hard tags will not be
able to withstand much shock before the enclosure breaks and
the tag stops functioning.


_Availability:_ Hard Tags


**Vibration resistance** - The vibration in vehicles, trains, and
certain types of machinery can be problematic for not only
RFID readers, but tags as well. Intense, constant vibrations
need to be mitigated by using a tag that can stand up to that
type of repetitive, high-intensity motion.


42


_Availability:_ Hard Tags


**Customizable** - Most labels/inlays can be customized with
graphics, text, or colors, but other labels can be customized
to a speciic shape and form factor, material type, or given
a specialty adhesive depending on the item being tagged.
Some hard tags can also be given a specialty adhesive, have
labels manually applied, or be produced in certain colors. A
minimum order quantity usually exists, but truly customizable
tags can be designed and shaped according to the application’s
needs.


_Availability:_ Labels/Inlays, Hard Tags


**Autoclavable** - The autoclave is a piece of machinery that
is used often in the healthcare ield to sterilize instruments
after use. Normal RFID tags cannot withstand the heat of the
sterilization process, so it is necessary to choose a tag that is
autoclavable for these applications.


_Availability:_ Hard Tags


**UV resistance** - In applications where the tagged item will
spend a signiicant time subjected to UV (or Ultra-Violet)
waves, if the tag contains printed information on its face, the
chosen tag will need to be resistant to the UV exposure. This
includes printed tags that will be unprotected from sunlight
(through a window or door) for long periods of time.


_Availability:_ Hard Tags, Label Tags


**ATEX certiied** - ATEX certiication means that the
RFID tags are approved for use in environments with an
explosive atmosphere. These tags are used for applications
in environments like mines or workplaces with activities that
release lammable gases or vapors.


_Availability:_ Hard Tags


43


**Chemical Resistance** - Chemical resistance is a feature that
is used in the presence of airborne and water-based chemicals
so that the tag does not breakdown or corrode from exposure.


_Availability:_ Hard Tags


**Ingress Protection** - For applications around dust/dirt or
water, ingress protection ratings (or IP ratings) are incredibly
important to check before selecting a tag. The irst digit of
the IP rating will be 0 - 6 and indicates the protection against
solids like dirt and dust. The second digit of the IP rating
will be 0 – 9 and is the level of protection against liquids, like
water. The highest IP ratings for tags would be a rating of 67,
68, or 69 depending on direct or indirect contact with liquids.


_Availability:_ Hard Tags


**High Memory** - Tags that are available with a higher User or
EPC memory can be used to store increased data on the tag,
such as service dates and complete item identiication. While
high memory is good for some applications, most RFID
systems associate the tag ID in a database containing the same
information by way of software. This frees up the memory on
the tag and allows the tag to be read quicker.


_Availability:_ Hard Tags, Inlays/Labels


The Relationship Between Tag Read Range
and Size


One of the biggest misconceptions about UHF RFID tags
is that all tags get about the same read range regardless of
the size, materials, or tagged items. In truth, all those factors
combine to determine a tag’s general read range, but the tag’s
size is the most inluential component.

Because of how small antennas must be to it within small


44


tags, they can only send and receive data at just a fraction
of the distance of typical large tags. Some of the smallest
UHF tags can only be read from a few inches away. Generally
speaking, read range increases as the size of the tag increases,
with some of the biggest passive tags being able to read over
35 meters (115 feet).


The correlation between read range and size suggests that, for
each application, there must be a compromise between the
two in order to i nd the ideal tag. In some applications, such
as tool tracking, the objects to be tagged can be so small, that
size isn’t negotiable; therefore, tags for that application will
have only a short read distance. When tracking items that are
more accommodating with regard to surface area – a medium
to long range tag can be chosen and provide a better balance
between size and read range.


Tag Customization Options


Contrary to off-the-shelf RFID tags, custom RFID tags can
be created with unique features for an application such as a
special adhesive backing, specii c data printed and encoded on
the tag, as well as a custom size and shape. Custom RFID tags
can be an advantage especially for applications that require
a large number of tags because the additional cost per tag
for customization can be offset by volume pricing. When
purchasing RFID tags, there are three levels of customization
available:


45


High Customization

Constructed from scratch to it a speciic application, these
tags have unique variables for almost all the options deined
below.


Semi-Customization


A semi-custom tag is usually an off-the-shelf tag that has
an increased level of customization from one or all of the
following: custom printing, encoding, or speciic backings or
attachment methods.


Low to No Customization


An off-the-shelf tag is basically a ready-to-go tag with the
possibility of some custom printing and encoding speciic to
the application.


Customizable Features


Detailed next are some of the options available for the varying
customization levels for RFID tags.


Attachment Methods


Many RFID applications require unique attachment methods
to best it the item to be tracked. While many off-the-shelf
RFID tags come standard with adhesive, customizable tags
can be created or purchased with attachment methods such as
extra strength adhesive, epoxy, or holes for mounting with zip
ties, or even screws.


Backings/Encasement


The material or substrate that makes up the back of an RFID


46


tag usually determines the ruggedness of an RFID tag. Most
inlays and labels have a PET or plastic backing followed
by a layer of adhesive. Because hard tags typically have an
external layer of encasement around them, a durable plastic,
or sometimes metal, makes up the backing in order to hold up
to more rugged applications.


Other backings can be used to create a special effect on how
the RFID tags behave. Metal-mount tags are afixed with
a special backing that provides separation from the metal
surface, absorbs RF energy, and then uses the metal surface as
a backplane to amplify the RF waves, thus enabling the tag to
work better on or in metal.


Another example is foam-backed RFID tags used for mounting
on metal or items with a large water content, such as the
human body. The foam spacer in between the tag’s antenna
and the mounting surface helps to minimize effects usually
present when mounting on these RF-unfriendly materials.


Face Stock


For inlays and labels, there are a few different types of material
that make up the front of the tag, or the tag’s face. The most
often used materials are clear PET (polyethylene terephthalate,
a type of plastic), white PET, and paper. Clear and white PET
can stand up to a few more environmental factors than paper,
and PET also keeps the printed text from fading quicker than
paper. However, paper is generally a cheaper face stock than
PET and is great for short-term applications like race timing.

When printing data onto the inlays or labels, the chosen face
stock will affect the printer ribbon as well. While paper face
stocks can accommodate a more economical wax or wax-resin
blend ribbon, PET face stocks require a more costly (and
more durable) full resin ribbon.


47


Data – Encoded


Customizing the encoded information on each tag is one of
the biggest advantages of using customizable tags. Off-theshelf tags are usually shipped from production pre-encoded
with either a random repeating number or random unique
number, but custom encoding can ensure that the data on the
tag is relevant to a speciic application.


Data – Printed


Printing custom information on an RFID tag, like human
readable text, 1D or 2D barcodes, or logos can be a great
way to visually customize tags for ease of use, additional
functionality, or marketing purposes. Printed data on tags is
a great way to quickly tell the difference between two tags or
visually gather information about the item that is tagged.


Memory


The memory size affects the amount of data that can be stored
on the RFID tag. Memory is expensive and most applications
don’t require extended memory, so most RFID tags have
similar memory sizes. However, it is possible to customize
the amount of memory on RFID tags – either by re-allocating
speciic bits to certain memory banks (depending on the tag’s
integrated circuit, or IC), or by customizing a tag with a highmemory IC.


Size & Shape


Most often, tags are designed with a simple shape and size
to match the internal antenna; however, different sizes and
shapes can be created in order to best suit the intended
application and asset to be tagged. An example of a tag with a
customized size and shape (and attachment method) to make
it an ideal tag for a speciic application is the RFID hang tag.


48


Encoding RFID Tags


All UHF RFID tags are delivered from each manufacturer
with a string of characters already encoded to the EPC memory bank. However, just because the EPC memory for each
tag is delivered encoded, that doesn’t mean the tag’s memory
shouldn’t be rewritten when the tag is being deployed. In fact,
in many applications, the EPC memory needs to be rewritten
as tags are deployed.


The Importance of Encoding


Some UHF RFID tags are delivered from the manufacturer
with a unique, randomized number on the EPC memory
bank; however, many shipments are delivered where each tag
has the exact same EPC number.


RFID is used to uniquely identify items; so, when a tag is
assigned to an asset, person, or item, each tag ID should be
unique. For example, if two identical red cars are on a lot (i.e.
only the VINs are different), each must have a tag with unique
EPC number so they be differentiated from one another. If
there is no guarantee that a EPC number is unique from the
manufacturer, the tag must be encoded with a unique number
before deploying it.

Whether the EPC memory bank is delivered encoded with a
unique, or serialized, number depends on the tag’s integrated
circuit (IC), or chip.


Tags that ARE encoded with a unique, randomized EPC
number can potentially be used without re-encoding them
because the chances of repeating that number are slim to
none. For example, the EPC number on an Alien tag is created
by using a combination of the IC’s wafer ID, wafer position,
as well as a portion of the latter 35 bits of the TID number.
Together, these elements create a unique 32-bit serialization
factor at the end of the EPC number.


49


Tags that are NOT encoded with a unique, randomized EPC
number must be re-encoded before use. Some tags are sold
with every tag on the roll having identical EPC numbers;
others have purely randomized EPCs that are not guaranteed
unique.


To Do:


Determine if your tags have a unique, randomized, or
serialized EPC number. This can be done by checking the IC
speciications of the tag.


What to Encode


Regardless if the tag has a unique EPC or not, there are a
few reasons to re-encode the EPC number with unique
information. Below are a few common scenarios.


Encode the EPC number as an item’s serial number
or unique product number

Working with an item’s serial number or unique product
number helps to cut down the complexity of associating two,
seemingly random numbers. This is commonly done in race
timing applications by encoding the runner’s bib number as
the EPC number, or, in inventory applications, by encoding
the item’s unique serial number.


Generate an EPC number per one of the
speciications devised by GS1

GS1 devised speciications called Identiication Schemes in
order for UHF RFID to be universally compatible for global
trade. These schemes explain how to encode the EPC number
depending on the item and use of the item. Each scheme
deines the number of bits overall, and within a speciic
section of the string. Different segments that form the EPC
number include the Header, Filter Value, the GS1 Company


50


Preix, Item Reference, Partition, and Serial Number. The
most commonly used Identiication Scheme is SGTIN-96
which stands for Serialized Global Trade Item Number, 96bits.


Encode the EPC incrementing from “…1”


Incorporating header numbers and/or leading zeros and
incrementing “from one” (or some beginning number) can
be advantageous in many applications where other numbering
schemes don’t it. This encoding scheme is common for
applications that don’t require speciic numbers or product
information available on each RFID tag.


To Do:

Determine which of the above encoding styles will best it
your application


Conversions – Bits > Hex > ASCII


Bits


Bits are basic units of information and are what is being
transmitted between the reader and the tag. Bits are coded in
strings of 4, using only ones or zeros. Overall, using strings
of bits to communicate data is referred to as Binary Coding.
Below is a string of bits.


**0010 1101 0100 1001 0100**


When a tag’s speciications indicate that its EPC memory
bank has 96 available bits, it means that a combination of 96
ones and zeros are backscattered to the reader. Below is an
example of a 96-bit string.


**0100 1111 0100 0010 0010 0010 0111 0101 0011 0011 0100**


51


**1000 0011 0101 0100 0010 0011 11110101 0011 0010 1100 0011**
**0101**


Understanding bits is the irst step in learning about the
two most common encoding formats for UHF RFID tags –
Hexadecimal and ASCII.


Hex

Hex, or hexadecimal coding (also called base 16), is a method
that utilizes only 16 types of characters – letters A-F and
numbers 0-9. Each hexadecimal character represents a string
of four bits. Below is the same string of 96-bits above,
represented in hex.


**0100 1111 0100 0010 0010 0010 0111 0101 0011 0011**


**4   F   4   2   2   2   7   5   3   3**
**0100 1000 0011 0101 0100 0010 0011 1111 0101 0011**


**4   8   3   5   4   2   3   F   5   3**


**0010 1100 0011 0101**


**2   C   3   5**


**The entire string in Hex:**
**“4F422275334835423F532C35”**


A 32-bit memory bank can hold 8 hexadecimal characters.


A 64-bit memory bank can hold 16 hexadecimal characters.


A 96-bit memory bank can hold 24 hexadecimal characters.


A 128-bit memory bank can hold 32 hexadecimal characters.


A 256-bit memory bank can hold 64 hexadecimal characters.


52


ASCII


ASCII, or American Standard Code for Information
Interchange, is an encoding method that uses 128 speciic
characters, each represented by two strings of four bits.
ASCII can represent the entire alphabet (lower case and upper
case), numbers 0-9, as well as some special characters, such as
asterisks, question marks, and parenthesis. Below is the same
string of 96-bits above, represented in ASCII.


**0100 1111 0100 0010  0010 0010  0111 0101  0011 0011**


**O       B       “       u        3**


**0100 1000  0011 0101 0100 0010 0011 1111  0101 0011**


**H       5       B       ?       S**


**0010 1100  0011 0101**


**,        5**


**The entire string in ASCII: “OB”u3H5B?S,5”**


A 32-bit memory bank can hold 4 ASCII characters.


A 64-bit memory bank can hold 8 ASCII characters.


A 96-bit memory bank can hold 12 ASCII characters.


A 128-bit memory bank can hold 16 ASCII characters.


A 256-bit memory bank can hold 32 ASCII characters.*


_*Of note, a tag’s EPC memory is ALWAYS encoded using hexa-_
_decimal format. So, if ASCII characters are desired, an ASCII – hex_
_conversion formula must be used when encoding to and reading back from_
_the RFID tag._


53


To Do:


Determine which encoding format is best for your application

- hexadecimal or ASCII.


54


55


RFID Tag Worksheet


1. RFID tags communicate with RFID readers and
antennas via _______________ waves.


a. Electromagnetic
b. Refracted
c. Active
d. Passive


2. The energy that a UHF passive tag sends to the reader/
antenna as the reply is known as:


a. Back Coupling
b. Backscatter
c. Battery-Assisted
d. Back Current


3. Which two types of tags contain batteries? (Choose 2)


a. Passive Tags
b. Active Tags
c. Battery-Assisted Passive Tags


4. A basic tag is comprised of two parts - (Choose 2)


a. An Antenna
b. ASCII Data
c. A Memory Bank
d. An IC


5. Which answer choice correctly lists a tag’s four memory
banks?


a. EPC, User, Registered, TID
b. EPC, User, Registered, DIT
c. EPC, User, Reserved, DIT
d. EPC, User, Reserved, TID


56


6. The SOAP Method is very important for
understanding 

a. Tag Memory
b. Tag Read Range
c. Tag Attachment Methods
d. Tag Types


7. Which one of the following answers is not important for
choosing the ideal tag attachment method?


a. Surface Area
b. Customization
c. Exposure
d. Temperature
e. Application Lifespan


8. Which surface material is known for crippling UHF
Passive tag* read range? (*In this scenario, the tag has no
special modiications.)


a. Plastic
b. Cardboard
c. Metal
d. Foam


9. For most applications, the larger the tag, the
__________ the read distance.


a. Longer
b. Shorter


10. When you purchase a tag, you should:


a. Automatically re-encode the tag
b. Do nothing; use the pre-encoded number
c. Convert the encoded number to a different format


57


d. Check to see if the encoded number is unique and
randomized
e. Any of the above, depending on your application


11. Which of the following is not a common encoding
method?


a. Encode the EPC the same number as on the TID
Memory Bank
b. Encode the EPC incrementing from “...1”
c. Generate an EPC per one of the speciications
devised by GS1
d. Encode the EPC number as an item’s serial number
or unique product number


Answers: 1) A; 2) B; 3) B&C; 4) A&D; 5) D; 6)
B; 7) B; 8) C; 9) A; 10) E; 11) A


58


RFID Antennas


In short, RFID Antennas take energy from an RFID reader
and transmit it in the form of RF waves to RFID tags in the
vicinity. If RFID Readers are the “brains” of an RFID system,
RFID antennas are the arms because they actually transmit
RF waves to the tags.


59


In addition to transmitting, antennas also receive the
information sent from the tags so the reader can decode it.
While antennas are usually described as “dumb devices” in
an RFID system, there are many different types, each with
distinguishing characteristics, which makes selecting the right
antenna extremely important.

Before selecting an RFID antenna for a specii c application,
consider the information below about antenna types and
options in order to make the right choice.


Size: Large or Small


RFID Antennas range in size from smaller than a standard
cell phone, to as large as a TV. The difference in size is usually
indicative of the read range – the bigger the antenna, the
higher the gain, the longer read range and vice versa. Some
antennas, however, are exceptions to the rule because they
were built for a specii c application; one example is the large
Impinj Guardwall antenna. Built for tightly controlled read
spaces, the Guardwall antenna only has a gain of 6 dBi because
it is designed to be mounted across from another Guardwall
to create a small, accurate read zone.


Size constraints may also factor into the decision making
process because some applications do not allow for much
available space in the area where the antenna will be placed.
Certain environments, like retail stores, may not have the space
for a bulky 15 x 15-inch antenna, nor will such an antenna


60


it in aesthetically. Small antennas are optimal for item level
reading and writing as well as for applications that require
smaller read zones like conveyor belt reading and personnel
access control applications.


**Key takeaway:** The size of the antenna should depend on
the space available in the application environment. Also
remember, generally the smaller the antenna, the shorter the
read range.


Ruggedness: Indoor or Outdoor


Because RFID applications can be implemented in almost any
environment, each part of an RFID system must be reviewed
or tested for ingress protection against water and dust. Just as
most personal phones are not designed for use outside in a
rain storm, most RFID technology is not either. All electronic
devices are rated on ingress protection (IP) from dust and
water, by the US IEC standard 60529 and the British standard
EN 60529 ranging from IP 00 to IP 69.

The irst digit in the IP rating can be between 0 – 6 and
describes the level of protection against solids – like objects or
dust. Zero speciies not protected at all against solid objects,
and six speciies that the piece of equipment is completely
protected from dust. The second digit in the IP rating can be
between 0 – 9 and indicates the level of protection against
liquids. Zero indicates not protected at all from any liquid, and
9 indicates protected from continuous immersion in liquids
that the manufacturer deems safe for the product. IP69 exists
and describes a product protected completely from dust and
from high pressure liquid, and is the only IP rating that ends
in a nine.

The antenna’s operating temperature range is not just
important for extreme temperature applications; it also
should be checked for outdoor or non climate controlled


61


indoor applications. All RFID equipment has an operating
temperature range that should be strictly followed, otherwise
the equipment could work slowly, stop working, or react
negatively to temperatures outside of the specii ed range.


For extreme temperature applications and/or low IP-rated
equipment, solutions exist as a “work around” – for example,
weatherproof enclosures and temperature-controlled
enclosures.


**Key takeaway:** Outdoor, non-climate controlled indoor, and
extreme temperature applications will require an antenna with
a high IP rating and/or a wide operating temperature range.


Form Factor: External or Integrated


RFID antennas can either be integrated within a reader as
one device, or purchased separately as an external piece of
hardware. Integrating a reader and antenna saves space and
provides a more mobile system without worrying about
lengthy cabling. Integrated reader antennas are also optimum
for retail or desktop applications because they are usually
compact, easy to use, and more visually appealing than two
bulky external devices. External antennas, on the other hand,
provide for many more options and l exibility within any
given application.


62


**Key takeaway:** Before purchasing a reader or antenna, decide
if the application is small enough or customer facing where it
would benei t from an integrated reader and antenna.


Frequency Range: US, EU, or Global


Just like RFID readers and RFID tags, RFID antennas are
designed for use within specii c frequency ranges. Without
being tuned to a specii c frequency range, antennas would
not be able to transmit or receive information from either the
reader or the tag. Most RFID antennas fall into one of the
following operating regions:


- US or FCC (902 – 928 MHz)

- EU or ETSI (865 – 868 MHz)

- Global (860 – 960 MHz)


The Global operating region is a good “catch all” for
applications that run in multiple countries, or for applications
that will be tested in both the US and Europe. Otherwise,
it is better to choose an antenna with a narrower frequency
range; doing so will result in better performance and, all
things being equal, a longer read range. Of note, all RFID
equipment working together within any given system must be
tuned to the same frequency range in order to communicate
successfully.


In order to decide which frequency or operating region is
appropriate for an application, double check the frequency


63


guide provided by GS1 and ensure that all parts of the RFID
system (tags, reader, and antenna) are all compliant within the
country they are operating.


**Key takeaway:** If the system will be operating somewhere
other than the US or Europe, double check the frequency guide
for each country’s speciic regulations. A global frequency
range antenna is a good fall back if the exact regulations aren’t
speciied.


Polarization: Circular or Linear


Because RFID antennas radiate and receive RF waves,
polarization is an important factor to consider when choosing
an RFID antenna. Polarization applies to waves and is
basically the geometrical direction of the wave’s oscillation.
RF waves generally oscillate in a single direction which can
be described as linear, or in a rotating pattern which can be
described as circular. Below is an illustration that shows the
difference between radiating waves linearly and radiating
waves circularly.


LINEAR

POLARIZATION


CIRCULAR

POLARIZATION


64


Where this is important for an RFID application is how the
waves radiate and line up with an RFID tag’s antenna. A
circularly polarized antenna works well for applications where
the tagged item’s location will not be known or will be at
different angles and heights. Because the ield rotates, it allows
for a little more positional uncertainty for the tagged items
(e.g. reading tags on palletized boxes moving through a dock
door portal). Linearly polarized antennas are not as lexible
with tag angles and heights. If a linearly polarized antenna is
radiating waves on a horizontal plane, the receiving tag should
be horizontal as well and at a consistent height (e.g. reading
tags on rail cars). The same idea applies for linearly polarized
antennas that radiate waves on vertical planes.


Two types of circularly polarized antennas exist and are
differentiated by the way that they rotate: Right-Hand
Circularly Polarized (RHCP) antennas rotate counter-clock
wise, and Left-Hand Circularly Polarized (LHCP) antennas
rotate clockwise. The choice between LHCP and RHCP only
matters when there are two RFID systems with two separate
RFID readers in a small area. If two RHCP antennas are
facing each other in two separate systems, the waves could
collide and cause a large null zone in the middle where no tags
will be read. In this case, when these are facing, it would be
important to choose one LHCP and one RHCP in order to
create the best RF environment.


**Key takeaway:** Choosing a linearly polarized antenna or a
circularly polarized antenna depends on the environment of
the application and how the tagged items will pass by the
speciic antenna. If the tags will be at a constant height and
orientation, linear works well, if there is some unknown about
the heights and angles, circularly polarized antennas are better.
When in doubt, choose a circularly polarized antenna.


65


Read Range: Far-Field or Near-Field


The most important characteristic of an RFID antenna from
a user’s standpoint is usually the read range – i.e. how far the
RF waves will radiate in a geometric ield. Several factors
determine the read range generated by an RFID antenna
such as reader transmit power, amount of cable loss, coupling
technique, antenna gain, and antenna beamwidth.







A key aspect of any RFID antenna is whether it is a far-ield
or near-ield antenna. The difference in the two is the way in
which they communicate with an RFID tag.

Near-ield RFID antennas typically use magnetic or inductive
coupling to communicate with the tag when it is the near
vicinity. Near-ield antennas usually cannot read more than
a foot away at the most because their magnetic ield and the
tag antenna’s magnetic ield must be close enough to send and
receive information.

Far-ield antennas use backscatter to communicate.
Backscatter is a communication method in which the antenna
sends energy to the tag, which powers the integrated circuit
(IC). The IC then modulates the information and sends
it back using the remaining energy. Far-ield antennas can


66


communicate with passive RFID tags up to 30 feet or more in
an optimal environment.


Long read range is not always optimal. In an application with
limited space, a greater read range could cause problems due
to reading too many tags at once (i.e. “stray” tag reads), instead
of one speciic tag or group of tags.


**Key takeaway:** Determine how far away the tagged items will
be from the antenna in order to establish if a far ield or near
ield antenna would be best for an application. An application
requiring proximity reads will generally beneit from a near
ield antenna.


Strength: High or Low Gain

Antenna gain is expressed in decibels (dB) and is a logarithmic
unit of measurement of the ratio of two powers. Gain can be
expressed as a few different units of measure such as dB, dBi,
dBd, dBm, or dBW which makes it a little more complicated
to deine. The difference in the unit conveyed (dB, dBi, etc.)
explains which two ratios are being measured. Antenna gains
cannot be adequately compared in two different units of
measure.


**dB** –The antenna’s power output measured against the power
input into the antenna.

**dBm** –The antenna’s power output measured against 1
milliwatt of power

**dBW** –The antenna’s power output measured against 1 Watt
of power.


**dBi** –Antenna gain expressed in dBi and is basically the
measurement of the amount of power required to produce
a certain ield of electromagnetic waves in comparison to a
“perfect” (no loss, isotropic) antenna’s ability to produce the


67


same ield. (dBi = dBd + 2.15)


**dBd** –The antenna’s power output measured against the gain
of a halfwave dipole antenna.


Antenna gain is expressed in decibels (dB) and is a logarithmic
unit of measurement of the ratio of two powers. Gain can be
expressed as a few different units of measure such as dB, dBi,
dBd, dBm, or dBW which makes it a little more complicated
to deine. The difference in the unit conveyed (dB, dBi, etc.)
explains which two ratios are being measured. Antenna gains
cannot be adequately compared in two different units of
measure.


**Key takeaway:** Decide how much read range is required in
order to fulill your application’s needs. Factor in antenna gain
accordingly, and be sure to compare antenna gains with like
units of measure.


Coverage: Wide or Narrow Beamwidth


Beamwidth is very closely related to gain and is exactly what
the name implies – the width of the beam or RF ield. Two
ields exist - the azimuth and elevation ields - and they each
have a beamwidth which is crucial to understanding where the
RF waves will be directed. Linearly polarized antennas have a
relatively small beamwidth in one ield, and, depending on the
gain, between 30 degrees and 360 degree beamwidth in the
other. Most linear antennas’ speciications note the elevation
and azimuth beamwidths as the same degree due to the fact
that the antenna can be physically turned 90 degrees to show
the opposite beamwidth.


Generally speaking, the higher the gain, the smaller the
beamwidth. most users have to decide what is more important
for their application, a greater length of read with a small
width, or a shorter read length and wider RF ield.


68


Some examples are included below.


2D and 3D radiation graphs are illustrations that manufacturers
provide and are a “map” of the RF i eld produced by the
antenna. These maps are very helpful in choosing an antenna
for a specii c application. 2D radiation graphs will have two
images – one of the horizontal or azimuth plane and one of
the vertical or elevation plane. 3D radiation graphs provide a
3D mapped image of the exact beam pattern in both i elds.


69


**Key takeaway:** An antenna with a wide beamwidth will
generally have a lower gain and cover more area either
vertically or horizontally (or both); while a narrow beamwidth
will generally have a higher gain and read farther, but cover a
smaller area.


Direction: Directional or Omni-Directional


Closely related to both gain and beamwidth, directivity
is dei ned as the antenna’s ability to focus in a particular
direction to transmit or receive energy. Two different types of
antennas exist in relation to directivity: directional and omnidirectional. Directional antennas, like the name suggests, have
a concentrated beam in one direction. Whether the beamwidth
is 25 degrees or 75 degrees, directional antennas focus their
gain into a specii c direction to pick up tag reads.


Omni-directional antennas provide a wide range of coverage
in one plane. Instead of producing a cone-like beam of
coverage like directional antennas, omni-directional antennas
usually cover one entire plane. Their 3D radiation patterns
look similar to doughnuts because they typically have coverage
of 360 degrees in one plane and around 20 to 65 degrees in
the opposite i eld. These antennas are made for environments
that will see tagged items all at the same height, but may pass
the antenna at different angles. Unfortunately, because these
antennas have to cover such a large plane, their gain is usually
low to lower mid-range.


70


**Key takeaway:** Directional antennas read in one direction
and produce a cone-like ield, while omni-directional antennas
read 360 degrees on one plane.


71


RFID Antenna Worksheet


1. RFID Antennas are the _____________ of an RFID
system.


a. Brain
b. Arms
c. Heart
d. Eyes


2. When choosing an RFID Antenna, which IP rating is
more protected from dust and liquids?


a. IP 50
b. IP 55
c. IP 60
d. IP 68


3. If the tagged item’s location will be unknown, or
at different heights and angles, it is best to use a
___________________ polarized antenna.


a. Circularly
b. Linearly


4. Near-ield antennas use _______________ to
communicate with tags, while far-ield antennas use
____________________.

a. Backscatter, RF Waves
b. Backscatter, Coupling
c. Coupling, Backscatter
d. RF Waves, Backscatter


72


5. Which of these is not a unit of measurement for
Antenna Gain?


a. dB
b. dBi
c. dBd
d. dBc


6. Generally speaking, the ________________ the gain,
the _________________ the beamwidth.


a. Higher, Narrower
b. Higher, Wider
c. Lower, Narrower
d. Lower, Lower


7. Which type of antenna produces a doughnut-shaped
radiation pattern?


a. Directional
b. High Gain
c. Omni-Directional
d. Low Gain


Answers: 1) B; 2) D; 3) A; 4) C;
5) D; 6) A; 7) C


73


RFID Readers


Types of Readers


Every year, new RFID readers hit the market with improved
usability and features, so it is important to know the pros and
cons of each reader as well as any additional features that
could make an impact on an RFID application. Before diving
into the features available on RFID readers, irst it is necessary
to understand the two major classes of readers recognized in
the industry.


Fixed Readers


Fixed readers are generally two-port, four-port, or eight-port,
high performance readers. These readers are the ‘workhorses’
in the industry because they provide high power and receive
sensitivity to non-mobile applications. Integrated readers
are a subset of ixed readers and are unique because they
are a reader and antenna combined into one unit. Integrated
readers may have one additional port, are usually non-mobile,
and are medium- to high-performance readers depending on
the speciic unit.


Mobile Readers

The irst subset of mobile readers can be classiied as mobile


74


computers, which also have an integrated antenna. No
additional antenna ports are available on these readers, but
there are plenty of other features, like onboard processing,
that enable these readers to run various programs while
maintaining high read rates. Sleds, a second subset of mobile
readers, are small RFID readers that connect to a smart device
through Bluetooth or an auxiliary port and use a downloaded
or custom-developed mobile application in order to function.

Most RFID readers are made with certain speciications,
options, and features that make them unique in comparison
to other readers on the market. Below is an outline of general
reader features followed by a break out of speciic options
and some information about each one.


Power Options

How the reader is powered is one of the irst things to note
when purchasing an RFID reader. In certain applications,
such as mobile, manufacturing, or warehouse-based, outlets
are limited or unavailable, which narrows down the power
options. Four options are available when deciding how to
power an RFID reader.


Power Adapter


The most common way to power an RFID reader is plugging
it into an outlet via a power adapter. Before using this method,
ensure that an outlet is in close proximity to where the reader
will be installed.


PoE


Another popular way to power an RFID reader is PoE, or
Power over Ethernet. PoE uses an Ethernet cable to both
power the reader and send/receive data. After setting up a
reader via PoE, cabling can be run up to 100 feet and still
reliably provide power to the reader. The advantage of using


75


PoE (vs. a power adapter) is the elimination of the need to
run AC power to a reader’s location, which may add up to
considerable savings in moderate to large deployments.


Battery

Generally speciic to mobile readers, batteries provide power
while allowing the reader to be cordless and mobile. Batteries
are very convenient but they still must be charged, usually
after several hours of continuous use. A best practice is to
have spare batteries along with a charging station that can
charge multiple batteries at once.


In-Vehicle

Applications that require an RFID reader within a vehicle (e.g.
truck, forklift, etc.) should consider a reader that has been
developed speciically for use in vehicles. Powering an RFID
reader through a vehicle is a great solution for reading RFID
tags while driving around large areas like laydown yards or for
reading pallets as a forklift picks them up. Not many readers
on the market have been designed speciically for such use,
but the ones that have are ruggedized and contain loose wires
that can be connected directly to the vehicle’s wiring.


Interconnectivity


RFID readers connect to host computers or networks and
communicate data in a variety of ways. Connecting to a
network allows readers more lexibility than being connected
directly to a computer; instead, they are able to communicate
with other programs and readers to create a connected and
resolute system.


Wi-Fi


Connecting to a network or a host computer can be done
via Wi-Fi for applications in a setting with a strong Wi-Fi


76


connection. Wi-Fi connectivity provides a cordless, lexible
option for RFID solutions. Wi-Fi and LAN ports are generally
the only options if the application needs to be connected to
a network. An additional advantage to an RFID reader on
a network is the ability to connect a printer or other smart
device to the reader.


Bluetooth


Bluetooth allows the reader to connect to a host computer
while remaining wireless. Bluetooth options are generally
available on handhelds - especially sleds - for connecting to
smart devices like phones and tablets.


LAN


A LAN, or Local Area Network, connection uses an Ethernet
cable to join a network. Once on the network, the reader can
interact with programs and other connected devices. If an
application’s needs change and a Wi-Fi connection is required
with a reader that is not Wi-Fi enabled, an Ethernet cable can
be used to connect the reader to a wireless bridge, allowing
the reader to have a Wi-Fi connection.


Serial


Serial ports use either a 9 pin serial or USB cable to connect
directly to a host computer. A serial connection is optimal for
simple applications with one reader and host computer and
no need for additional network capabilities.


Auxiliary Port


Some handheld sleds have the ability to connect either by
Bluetooth connection or by using the audio port (or auxiliary
port) on smart phones and tablets. Using the auxiliary port to
connect to the smart device frees up the Bluetooth connection
for the host device in case it needs to be used to connect to


77


another device.


Antenna Ports

When choosing a reader for an application, the user should
always check the amount of available antenna ports. Typically,
readers are available with two-ports, four-ports, and eightports (without any additional devices, such as multiplexers).
Antenna hubs, or multiplexers, are available that can connect
up to 32 antennas to a single reader. When determining the
amount of antenna ports (or antennas) that an application
requires, irst decide upon the number of read zones required,
and, within each read zone, determine how much coverage is
needed in order to achieve the desired read rates.


Fixed Readers


Fixed readers usually come with two-ports, four-ports, or
eight-ports, depending on the reader. These readers can be set
up to cover one read zone or a few different ones, depending
on the speed and amount of tagged items.


Integrated Readers


Integrated readers are ideal for applications with a small read
zone and are usually more aesthetically pleasing so they can be
used in applications like retail or ile tracking. These readers
usually have one integrated antenna and one open antenna
port for connecting an additional antenna if needed.


Mobile/Handheld Readers


Typical mobile/handheld readers have one integrated antenna
and no additional antenna ports.


**Multiplexers** - Multiplexers, also called antenna hubs, can
be used in conjunction with RFID readers to increase the
amount of antennas able to connect to a single reader. With
certain conigurations, a single four-port ixed reader can


78


connect to up to 32 antennas. Of note, most multiplexers are
only designated for use with very speciic RFID readers.


GPIO Options


General Purpose Input/Output connections on RFID readers
are used for optional devices like light stacks and motion
detectors. Generally, readers read and write tags, but with the
addition of an auxiliary device connected through a GPIO
port, certain tag reads (or lack thereof) can be programmed
to trigger an event. These events, like turning on a green light
when a tag is read, provide audio or visual cues that can help
an application run smoothly and effectively. When deciding
to add an auxiliary device, it is important to understand the
amount of voltage it will need in order to perform effectively.
Some devices use much more voltage than the reader is able
to supply; in those cases, a GPIO box is required to provide
the extra power to the auxiliary device.


Inputs


GPI devices or General Purpose Input devices are connected
through the GPIO port and include items like motion
detectors and light-break sensors. GPI devices use electrical
signals to communicate with the reader. If the device sends a
signal to the reader, software commands the reader to perform
a function speciic to the application.


Outputs


GPO devices or General Purpose Output devices are
connected through the GPIO port and include items like
light stacks and annunciators. For example, if a reader
reads a certain tag, software can then tell the reader to send
an electrical signal telling the auxiliary device to perform a
speciic function, such as turning on a light.


79


Additional Utilities


On some RFID readers, additional ports or utilities are added
in order to provide new functionality that can either simplify
or enhance the current system. Below are a few common
examples of additional features on RFID readers and how
they can be used.


HDMI


One of the newest features on RFID readers is the addition
of an HDMI port. HDMI ports allow a display or monitor to
be directly plugged into the reader.


USB


USB ports are multifunctional on RFID readers and their
exact functionality is explained within each individual reader’s
speciications. While the USB port may function differently
on each reader, it can be used for data storage, data transfer,
powering, or for additional ancillary capabilities such as adding
a Wi-Fi dongle.


GPS


A mobile RFID reader with GPS capabilities is very useful
in large deployments, especially those spanning hundreds of
meters. GPS coordinates can be associated with the tag read,
allowing users to note a deined location of the asset.


Camera


In some applications, especially in remote areas, it is convenient
to have a camera outitted in a mobile reader in order to
document a tagged item’s status. This is especially helpful if
the handheld also has GPS capabilities that may enable the
tag read, photo, and GPS coordinates to be associated (geotagged) and sent back for analysis. Pictures of tags can also be
stored for any needed inspection recording purposes.


80


1D/2D Barcode


The most common addition to a traditional mobile reader, 1D
and 2D barcode readers, are used in conjunction with the tag
read typically in applications like supply chain management.
They can be used in conjunction with RFID tags or, if a part
of the supply chain does not use RFID, the barcodes can be
used in lieu of RFID in small shipments.


Cellular Capabilities


Mobile RFID readers with cellular capabilities are used
frequently in remote sites that do not have access to Wi-Fi or
other connection alternatives. A cellular connection provides
an alternative method to transport tag reads or locations when
other connections aren’t readily available.


Onboard Processing


Onboard processing is typically associated with mobile
computing RFID readers, but is also available on many ixed
readers. A reader with a processor can run applications on the
reader instead of running them on a computer. This reduces
the need for a host computer in networked applications.
Readers with onboard processing typically have their memory
capacity outlined in the speciications, which is important to
note when developing an application. If the RFID reader
does not have the memory capacity to handle all the added
programs, SD card slots are featured on some readers for
expansion purposes.

Applications can take up most of an RFID reader’s memory,
but memory can also be used to store read data on the reader
itself. The ability to store and buffer tag read data is a great
beneit when a network connection is not available. By storing
tag reads, the data can later be uploaded to a network or host
computer when available.


81


API Options


An API, or Application Program Interface, is an important
facet to consider before purchasing an RFID reader, especially
before developing software. A carefully selected API allows
for more seamless communication between the hardware and
software/middleware.


Each manufacturer has its own API, so it is important
to investigate which API may be the best it for a speciic
development environment.


Reader Modules

Unlike inished RFID readers that can be deployed right out
of the box, reader modules are associated with a product
development cycle. This document is intended to guide you
through the development cycle and to help you understand
how inished readers differ from RFID reader modules.


Differences Between Finished Readers and Reader
Modules

At the most basic level, a inished RFID reader will include
a processor, memory, power supply, antenna connectors, and
a durable case built around an RFID reader module. Out of
the box, a inished RFID reader is ready for deployment and,
when paired with an RFID antenna, is capable of reading
RFID tags.


Reader modules are components of custom developed RFID
readers (requiring custom engineering) that must be paired
with a motherboard, provided with a power source, as well as
be connected to an antenna in order to read RFID tags.


Ideal Customer Proile for RFID Reader Modules

Where the ideal customer for a inished reader is an individual
who may lack either signiicant hardware engineering


82


experience or the time to spend on product design and
development, module customers have both hardware
engineering experience AND a inancial incentive to develop
from the modular level up. Most module customers fall into
one of two categories:


RFID enabling an existing product - Some customers already
have an electronic device (or a product that contains an
electronic device) into which they want to integrate RFID
technology. Examples might include a tablet, a smart cabinet,
or a thermal transfer printer.


Developing a new product with RFID capability - Some
customers are creating an entirely new product into which
they want to design RFID capability.


Advantages of RFID Reader Modules


For both of the customers mentioned above, reader modules
provide several advantages:


**Price** - Because the customer only pays for the hardware that
the application requires, mass scale implementations are often
much more cost-effective when the project leverages RFID
reader modules. In this case, the customer can avoid readers
that are otherwise “over-engineered” for the application in
question.


**Flexibility** - when developing using RFID reader modules,
the customer has greater lexibility to specify the module’s
frequency ranges, sensor options (Bluetooth/WiFi/GPS/
PoE), and processing power instead of being limited to a
inished reader’s existing design.

**Form Factor** - Where inished reader come with an existing
case, RFID modules enable customers to tailor it the RFID
reader’s inished dimensions based on the application’s needs.


83


Product Development Cycle for UHF Reader
Modules


ThingMagic recommends a three-step process as customers
move from proof-of-concept to full scale deployment using
RFID reader modules.


1. **Module Development Kit (Software):** The irst step for
customers is to interact with the Development Kit. Customers
can use the basic module, chassis, and power adapter to
attach antennas and begin reading tags in about an hour. The
Mercury API is ready for download to enable a developer to
begin writing code and interfacing with the reader module.
The module development kit is ideal for:


- Testing different antennas without breaking delicate ports

- Connecting to a PC and run URA (Universal Reader
Assistant) to test in various environments

- Technical Support - 60 days of tech support is provided
as standard.


2. **Sensor Hub (Hardware):** Once the software is developed,
it is ready to be loaded onto the sensor hub. The Mercury
xPRESS Sensor Hub’s ARM Processor allows for compiled
code to be tested in a demo or proof-of-concept environment.
The xPRESS Sensor Hub comes with the appropriate
engineering iles that may be needed to select appropriate
form features. The xPRESS Sensor Hub is ideal for:


- Sensor Hub Hardware: Microcontroller based
motherboard with any of the optional modules –
Bluetooth, Wi-Fi, PoE, GPS – as well as pre-screening
for regulatory compliance

- Loading Compiled Software Code: Developed software

  - for demonstrations or ready-for-customer use – can be
compiled and loaded onto the sensor hub


84


- Documentation and Design: Quick-start guide, access
to reference design H/W S/W iles, schematics, layout
iles, and Gerber iles/BOM component data sheets
are accessible in order to provide printed circuit board
manufacturers with detailed speciications


3. **Modules at Scale (Mass Production):** The xPRESS
Sensor Hub allows the end user to design an appropriate
printed circuit board that can replace the Sensor Hub inside
the inished product. At this point, customers would begin
purchasing reader modules themselves in volume.


85


RFID Reader Worksheet


1. Without the addition of an antenna multiplexer, most
RFID readers can have 

a. Two antenna ports
b. Four antenna ports
c. Ten antenna ports
d. Eight antenna ports
e. A, B, & C
f. A, B, & D


2. Mobile readers can be broken up into two different
categories 

a. Mobile Computers and Integrated Readers
b. Mobile Computers and Fixed Readers
c. Mobile Computers and Sleds
d. Integrated Readers and Fixed Readers


3. PoE is a common way to __________________ a
reader.


a. Integrate
b. Provide power and connectivity to
c. Connect an antenna to
d. Expand the memory of


4. Connecting an RFID reader to a network instead of
directly to a computer allows readers:

a. More lexibility
b. More antenna ports
c. More tag options
d. More read range


86


5. What is an antenna multiplexer?


a. A device that allows a reader to connect to more
than one computer
b. A device that allows a reader to connect to another
reader
c. A device that allows a reader to connect to up to 32
antennas
d. A device that allows a reader to connect to up to 10
auxiliary devices


6. What is another name for auxiliary devices like light
stacks, motion detectors, and annunciators?


a. Multiplexers
b. GPIO devices
c. API devices
d. Reader modules


7. Which of the following is not an additional port or
utility available on select RFID readers?


a. HDMI Port
b. GPS Capabilities
c. 1D/2D Barcode Scanning
d. Cellular Capabilities
e. Vibration Sensors


8. Reader Modules are ideal for 

a. Enabling RFID capabilities in an existing product
b. Developing a new product with RFID capabilities
c. Adding additional power to a inished reader
d. A & B
e. A & C


87


9. API stands for a. Applicable Programming Interference
b. Applicable Programming Interface
c. Application Programming Interface
d. Application Programming Interference


10. True or False. Reader Modules are generally cheaper,
more lexible, and smaller than Finished Readers.


Answers: 1) F; 2) C; 3) B; 4) A; 5) C; 6) B; 7) E;
8) D; 9) C; 10) True


88


RFID Cables, Connectors, &
Adapters


Coaxial cables provide the essential link between an RFID
reader and an antenna. They can also be used to connect
auxiliary devices like antenna hubs and multiplexers in certain
applications. Coaxial cables are energy conductors consisting
of a copper core that is insulated by both metal and rubber.
The energy generated by the RFID reader is sent via the
antenna port of the reader, into the irst connector, through
the cable, out the other connector, and into the antenna. The
better insulated the cable is, the less energy lost during the
process.


Antenna cables terminate at both ends in a connector; but,
connectors, as well as adapters, can also be sold separately.


Components of Coaxial Cables

Cables have one job – to transfer energy; but, just as
important, cables must be properly built to combat potential
energy loss. Energy loss happens in every system; the key here
is to understand how it is lost from a cable in order to ight it.


Three components make up a coaxial cable, and are important
to understand in order to select the correct cable for an
application.


89


**Length** - The longer the cable, the farther the energy has to
travel. No antenna cable is perfectly insulated; so, the farther
the energy travels, the more energy it will lose. In some
applications, the reader is farther from the antenna due to the
nature of the application. If a long cable must be used, it is
important to use the appropriate level of insulation required
to combat loss.


**Insulation Rating** - The higher the insulation rating, the
thicker and more protected the cable. The most common
ratings used with UHF coaxial cables are 195 series, 240 series,
and 400 series. The downside to a thicker, more insulated
cable is that the cable is less pliable and could be difi cult to
position in a tight space.


**Connectors** - Connectors are located at both ends of a cable,


90


and their type is determined by the connectors on the reader
and antenna being used in the application. Later, this guide
will walk through what types of connectors are compatible
with each other.


Cable Loss


Cable loss is the amount of power lost from the cable and is
determined by the insulation rating and length of the cable. For
applications that need a system running at maximum power
to provide long read range or for tracking at high speeds - the
reader’s transmit power, cable loss, and antenna gain will play
key roles. Below is a chart documenting cable loss by length
for each insulation rating. This chart shows the correlation
between the two so that, if the cable must be lengthened, a
higher insulation rating can be used to offset the loss.


91


_reduction, the power is cut in half. A reduction of 6 dB would be only 25%_
_of the original power setting, and so on. Likewise, for every 3 dB increase, the_
_transmitted power doubles._


If an application isn’t getting the desired read range, transmit
power on the reader and cable loss can easily be calculated and
adjusted. If the application is losing too much energy from
the cable, consider decreasing the length and/or increasing
the insulation rating to ensure more energy is received by the
antenna.


To easily calculate the amount of power that the RFID
antenna is receiving, see the equation below.


**Transmit Power (dBm) - Cable Loss (dB) =**
**Antenna Input**


92


Additionally, if the power entering the antenna isn’t quite
enough, a higher gain antenna can be used. To calculate the
total system output of power at the antenna, the following
equation can be used:


**Transmit Power (dBm) - Cable Loss (dB) + Antenna**
**Gain (dB) = System Output**


**30 dBm - 3 dB + 6 dB = 33 dBm**


Please note that most regions limit the total power output
from the point of the antenna. For example, FCC regulations
limit the total power output to 4 watts or 36 dBm. Be sure to
check the regulations for your region to ensure your system is
in compliance.


Determining the Correct Connector


Types of Connectors


Connecting a cable from the antenna to the reader in an RFID
system isn’t dificult – but purchasing the correct cable that
will join the hardware together can be a tedious task. Quite a
few types of cable connectors can be used, and each one is
dictated by the connectors on the hardware. The chart below
walks through the most popular types of coaxial connectors
with a little information about each.


**RP-TNC** - A derivative of a TNC connector, the RP-TNC
connector is one of the most frequently used cable connectors for a UHF RFID system.


**SMA** - SMA connectors are known for their small size in
comparison to other typical UHF connectors, and are about
the size of a pencil eraser.


**N-Type** - N-Type connectors are almost twice as big as an


93


RP-TNC connector, so they are the largest connectors commonly used in UHF RFID systems.


**TNC** - A relative of RP-TNC, the TNC connector is the
normal polarity version.


**RP-SMA** - A derivative of an SMA connector, an RP-SMA is
simply an SMA connector with the polarity reversed.


**BNC** - BNC is a less commonly used connector in UHF
RFID systems but is similar in size to a TNC connector. BNC
connectors allow for quicker attachment than most others,
but they are more likely to loosen over time.


94


The Threading


On a coaxial cable connector or adapter, the threading is either on the outside of the connector in plain view, or on the
inside of the connector. Two terms are used for each of these
types of connectors.


**Female/Jack** - A Female, or Jack, connector is characterized
by having the threading on the OUTSIDE of the connector


**Male/Plug** - A Male, or Plug, connector is characterized by
having the threading on the INSIDE of the connector.


95


The Center Pin


The center pin of a coaxial connector is the component that
conducts the RF energy and is one key to identifying what
type it is and with what it is compatible. There are two options
when it comes to the center pin of a connector, normal
polarity or reverse polarity.


**Normal Polarity**


Examples include: TNC, SMA, N-TYPE, BNC

Female/Jack - A normal female/jack connector has the
threading on the outside and a hole in the center to receive
the male/plug’s center pin.


Male/Plug - A male/plug connector has the threading on
the inside and a metal center pin to insert into a female/jack
connector.


Key takeaway: Normal polarity = center pin is in the MALE
connector.


96


**Reversed (RP) Polarity**


Examples include: RP-TNC, RP-SMA

Female/Jack - A reverse-polarity female/jack connector still
has the threading on the outside, but, because the polarity has
been reversed, the center pin is on the inside of this connector.


Male/Plug - A reverse-polarity male/plug connector still has
the threading on the inside, but because the polarity as been
reversed, the hole is on the inside of this connector.


Key takeaway: Reverse polarity = center pin is in the FEMALE connector.


97


Connections

Ensuring two connectors will properly join and work as
expected can sometimes be a confusing and tedious task.
For example, if an RFID reader has an RP-TNC Female
connector, should it connect to a RP-TNC Male, a TNC
Female, or a TNC Male? These four types have similar names
and sizes, and ordering the incorrect type can add several days’
worth of delay to a project. Below are a few rules to go by, for
matching up the correct connectors.


**Rule #1** - Similar types connect.


Example: TNC connects to a TNC; SMA


**Rule #2** - Similar polarities connect.


Example: RP-SMA connects to an RP-SMA; RP-TNC connects to an RP-TNC


**Rule #3** - Opposite genders/threading types connect.


Example: SMA Male connects to an SMA Female, RP-TNC
Male connects to an RP-TNC Female


98


Adapters vs. Cables

An adapter is used to join any two coaxial connectors that
would otherwise be incompatible. There are two scenarios
where a coaxial adapter may be required:


1. If one or both connectors on a cable is incompatible with
the RFID reader or antenna.


Purchasing a cable with the incorrect connectors can happen


99


easily; not only are some of them similarly named, but they
appear similar in pictures as well.


2. To save money when experimenting with different antennas
and readers.


If an application is still in the testing phase, several different
antennas and/or readers can be purchased for experimentation.
Instead of purchasing several cables with different connectors
to match each reader/antenna combination, one cable and a
few different adapters can be purchased instead. This can save
time and money during testing.


100


RFID Cable Worksheet


1. What is the difference between a connector and an
adapter?


a. A connector is at the end of a cable and an adapter
is a standalone piece with two sides.
b. An adapter is at the end of a cable and a connector
is a standalone piece with two sides.
c. An adapter connects the cable to a reader and a con
nector connects the cable to an antenna.
d. A connector connects the cable to a reader and an
adapter connects the cable to an antenna.


2. What are the three components that make up a coaxial
cable?


a. Length, Flexibility, Connectors
b. Length, Flexibility, Adapters
c. Length, Insulation Rating, Connectors
d. Length, Insulating Rating, Adapters


3. Cable loss is the amount of power lost from the cable
and is determined by the __________________ and
____________________ of the cable.


a. Insulation Rating, Length
b. Flexibility, Length
c. Length, Connectors
d. Length, Adapters


4. If a connector type, like TNC, is preceded by “RP”,
what does that mean?


a. Regular Polarity
b. Reverse Polarity


101


c. Regulated Polarity
d. Renewed Polarity


5. Which of the following is not a type of cable connector?
a. BNC
b. SMA
c. N-Type
d. RP-TNC
e. RP-ICA


6. If the connector is TNC, and the threading is on the
inside of the connector, what does that indicate?


a. The connector is Female
b. The connector is a Jack
c. The connector is Male
d. The connector is a Jill


7. If the connector is TNC, and the threading is on the
outside of the connector, what does that indicate?


a. The connector is Female
b. The connector is a Plug
c. The connector is Male
d. The connector is a Jill


8. If the connector is SMA, and does not have a center pin,
what does that indicate?


a. The connector is Female
b. The connector is a Plug
c. The connector is Male
d. The connector is a Jill


102


9. If the connector is SMA, and does have a center pin,
what does that indicate?


a. The connector is Female
b. The connector is a Jack
c. The connector is Male
d. The connector is a Jill


10. If the connector is SMA with threading on the outside
and no center pin, what is the connector’s identity?


a. SMA Male
b. SMA Female
c. RP-SMA Male
d. RP-SMA Female


11. If the connector is SMA with threading on the outside
and has a center pin, what is the connector’s identity?


a. SMA Male
b. SMA Female
c. RP-SMA Male
d. RP-SMA Female


12. If a reader terminates in an RP-TNC Female, what
connector should your cable terminate in?


a. RP-TNC Male
b. TNC Male
c. RP-TNC Female
d. TNC Female


Answers: 1) A; 2) C; 3) A; 4) B; 5) E; 6) C; 7)
A; 8) A; 9) C; 10) B; 11) D; 12) A


103


RFID Printers


RFID Printers are devices that simultaneously print and
encode information on RFID inlays or labels. These devices
are the only way to print on labels, and they also save time by
automating the manual process of encoding each tag. RFID
Printers have the ability to print not only human readable
numbers and information, but graphics and 1D and 2D
barcodes as well.


Even for applications that do not require printing, RFID
Printers can add value by saving time on encoding. Industrial
printers, for example, can print up to 14 inches per second
in certain operations, which would be a little over 6 tags per
second for 2-inch tags (including breaks).


When to Invest in an RFID Printer


RFID printers are not for everyone, especially since the cost
can be relatively high. In order to decide if and when it is time
to buy an RFID printer, you must irst determine whether it
would be a good return on investment.


If you are getting to the point where you are spending too
much time (because time is money), or you are paying someone
too much to hand-encode tags, you should consider the


104


benei ts of an RFID printer.


An RFID printer can quickly encode tags as well as print a
human readable number, logo, or barcode on the face of the
tag. Also, It’s much more accurate than hand-encoding tags as
it removes the element of human error.


If you assign a value to each hour devoted to manually
encoding tags, then add up the value of the hours over a year’s
period, as well as errors made, you can then determine if it is
worth investing in an RFID printer. If the manual encoding
costs are higher than the cost of the RFID printer, it may be
time to invest in an RFID printer.


In the event that you are buying tags pre-encoded, the situation is a little different. To calculate the ROI in this case,
you must take the difference between the cost of pre-encoded


105


tags and unencoded tags. In low volumes, it typically pays to
NOT invest in an RFID printer; however, in higher volumes,
investing in an RFID printer is usually the wise choice.


As with the manual encoding process, you should calculate
the difference in cost across an entire year in order to obtain
a worthwhile igure. If the difference is higher than the cost
of the RFID printer, then it may be time to invest in an RFID
printer.


Types of RFID Printers


There are several different ways to breakout and differentiate
types of RFID printers. The most common is by the usage
of the printer. Under printer usage there are three main
categories: Industrial, Desktop, and Mobile. Another common
way that RFID printers are categorized is according to RFID
tag compatibility, usually by tag frequency or, sometimes,
specialized tag types.


Printer Usage


Industrial (10,000+ tags per day)


Industrial printers are manufactured to be durable and able to
be used in most application environments. Industrial printers
stand out because of the sheer volume of labels they can print
in a day, week, or month. For demanding applications with a
large volume of labels, an industrial printer is the best-suited
option.


Desktop (500+ tags per day)


As the name implies, Desktop printers are designed to be used
in ofice-like environments. Typically, desktop printers are
used to print a low-volume of labels a day and keep up with a
mid-level quantity of items to be tagged. Desktop printers are


106


also designed to be aesthetically pleasing, so they can be used
in customer-facing applications.


Mobile (200+ tags per day)


Mobile RFID printers are not as common as Desktop and
Industrial printers, but they can be very convenient, especially
in large spanning applications such as warehouses or shipping
yards. The availability of using a mobile printer when covering
a large space is much more convenient than relying on a
printer in a central location. Due to their compact size, mobile
printers typically require specialized media.


Tag Type


Frequency


The most common type of RFID printer is a UHF Passive
RFID printer. UHF Passive RFID printers have an encoder
that operates at the 860-960 MHz frequency range. However,
there are also NFC and HF printers available. These printers
often look visually identical to their UHF Passive counterparts,
but they have an encoder that operates at the 13.56 MHz
frequency range.


Specialized Printers


Another tag-based printer option is a specialized printer for
tags like RFID cards and badges, foam backed tags, and allsurface labels that have a metal backing. RFID cards and
badges generally aren’t on a roll, but sold individually; so,
normal RFID printers will not be able to read, write, or print
on these. Instead, a specialized card printer is required along
with specialized ribbon to print on the thick, plastic cardstock.
Because the industry is growing and new types of tags are


107


being made, new specialized printers and printer settings are
being released to keep up with demand (e.g. printers designed
for foam-backed and metal-mount tags).


Types of Printing – Direct vs. Thermal Transfer


Direct Thermal


Direct Thermal printing is the standard in many industries
that need to consistently print text or images, the best example
being printing receipts. The Direct Thermal process involves
two steps: heating up the printhead, and the printhead coming
into contact with the heat-sensitive paper. The paper type is
the key in this process because, if the paper is not chemicallycoated to be heat sensitive, the printhead will not be able to
produce the color change that occurs when the paper is in
contact with heat.


Direct Thermal printers are more expensive when compared
to generic ink or LaserJet printers; however, because direct
thermal printers do not require a regular ink supply the
investment over the long term is typically much lower. The
downside to direct thermal printing is that the paper used is
very sensitive to light, heat, and abrasion, so if the label is
exposed to any of those elements for too long, the printed
information may become unreadable.


Direct thermal printing is also not recommended for items
that need to be labeled for a long-time period because the text
will begin to fade over time.


Barcodes on shipping labels, receipts, parking tickets, and
some logistics applications use direct thermal printing because
the labels do not need to have a long lifespan. Mobile printers
typically use direct thermal as well, because of the transient
nature of the barcode printed labels.


Thermal Transfer


108


Thermal Transfer printing is typically used in RFID label
printing because of its general resistance to environmental
elements and longer lifespan. Thermal Transfer printing
requires purchasing a thermal transfer ribbon which is an
added cost associated with this type of printing (in comparison
to direct thermal). Thermal transfer involves the process of
heating up the printhead and pressing it to the back of the
thermal ribbon. The heated printhead melts the ribbon and
transfers the color to the front of the label, which creates the
printed text or image.


The pros of thermal transfer printing are long ink lifespan
and little reactance to heat, light, or abrasions. Another
positive aspect of this printing process is that there is a ribbon
in between the printhead and label, which acts as a buffer for
foreign items like dust and dirt. The ribbon helps keeps these
impurities out of the printed text or image as well as expands
the lifespan of the printhead. A negative aspect of printing
via thermal transfer is the reoccurring ribbon cost.


Due to the heavy use of Thermal Transfer printer with RFID
tags, the remainder of this guide will focus solely on Thermal
Transfer printing.


Printer Ribbon


For Thermal Transfer printing, the printer must be equipped
with a ribbon. Three groupings of ribbon are available for
printing on RFID labels: Wax Ribbon, Wax-Resin Ribbon,
and Resin Ribbon. Each of these ribbon types has its pros
and cons as outlined below.


Wax vs. Resin vs. Wax Resin

Facts about Wax Ribbon


- Low melting point

- Most commonly used ribbon


109


- Should be used on paper labels, coated or non-coated

- Produces softer images

- Inexpensive

- Susceptible to smudges, scratches, and abrasions

- Printed images have a shorter lifespan

Facts about Wax-Resin Ribbon


- Mid-level melting point

- Should be used on coated paper labels like, glossy, smooth
surfaces, and synthetic labels

- Clear, sharp image

- Mid-level price point

- Resistant to certain chemicals, abrasions, smudges, and
scratches

- Printed images have a long lifespan


Facts about Resin Ribbon


- High melting point

- Should be used on synthetic labels and garment labels

- Clear, sharp images

- High price point

- Highest resistance against chemicals, abrasions, smudges,
and scratches

- Printed images have a very long lifespan


Performance & Resistance Levels


After choosing what type of ribbon will work best for your
media and application, there are still a few more choices to
make before purchasing. Within each category (Wax, WaxResin, Resin), an array of different ribbons can be selected
depending on application speciics. In order to decide the best
within the class of ribbon, it is important to read each ribbon’s
qualities front to back. If you are unsure which ribbon is right
for your application, contact us and we’ll be happy to assist.


110


Card Printer Ribbon


Card Printer ribbon is a separate type of ribbon that is shaped
and spooled differently than ribbon for typical label printers.
These ribbons are available in solid black, monochrome, and
color varieties and can be purchased in the form of a cartridge
for ease-of-use.


Media


Media Types


As a general rule, there are two types of RFID tags: inlays/
labels and hard tags.


Hard tags can be encoded, but, because they are not on a roll
and generally thick, hard tags are usually encoded manually
(one of the main exceptions is cards/badges.)

Wet inlays and RFID labels can be run through an RFID
printer for encoding and printing purposes. The speciications
relating to media size and roll size are imperative to take into
consideration when purchasing a printer, as well as when
purchasing tags for that printer. Most printer data sheets have
a Media section that speciies the different sizes that can be
used with the printer. Below are a few facts about each.


Media Size


**Width**


Most printers use media width as one of the key features of
the printer. The media widths usually vary between 4 and 6
inches, depending on the printer.


**Length**


In printer data sheets, some manufacturers display the
maximum label length and others denote the minimum label
length. Generally, labels should be a minimum of 0.35” and
a maximum of 157” long; but, the speciic range depends on


111


the exact printer and the printer’s dots-per-inch, or DPI (a
measurement of the printer’s image resolution).


**Thickness**


Most labels will be in between 0.002” and 0.010” thick. For
thicker labels, an exact printer coniguration or special type
of printer will be required. Tags/labels with special backing
like foam or metal for metal-mount tags are prime examples
of tags that cannot be printed with a typical printer or printer
setting (see image on page 11).


Media Separation


Because tags are manufactured on a single long liner, backto-back, manufacturers created a way for RFID printers to
determine where one tag ends and the other begins. There are
a few of these separation indicators, and the one that is used
varies depending on manufacturer and tag type. The three
most common are called continuous, notch, and black-mark.
Before an RFID printer starts encoding/printing, it must
know what the separation indicator is in order to know when
to encode/ print.


**Continuous**


Like it sounds, continuous means that there is no separation
between each tag. For this type, the only way that the printer
knows one tag from the other is pre-entered tag measurements
during calibration.


**Notch**


Notch, or gap, separation is fairly common on tag rolls and
simply means there is a small area between each tag that the
printer uses to identify one tag from another. The printer can
tell from the reduction in thickness that no tag is in the space
between tags.


112


**Black-Mark Separation**


Black-Mark separation means that there is a black line that
varies in thickness indicating the area between two tags. The
printer identiies the color change and is able to use that as
the indicator that there is no tag in that space. (These blackmarks used for separation indicators between tags should not
be confused with black marks that some manufacturers use to
denote bad RFID tags.)


Special Media Indicators

Tags can have identiiers for various reasons that can be
important to the printer during the calibration process. The
most common special tag identiiers are die-cut tags and linerless tags.


Die-cut indicates that the tag was cut with a “cookie-cutter”
type instrument and is most easily recognized when tags
are cut in special shapes or have rounded-edges. Liner-less
indicates that the tag has no paper on the back or “liner”,
meaning there is no waste during the printing process.


Outer Roll & Inner Core Diameter


A common problem that occurs when printing with RFID
printers is purchasing a roll of tags that is physically too large
to it in the printer. While tags are usually cheaper purchased
in bulk, the diameter of the roll can be too big to it into the
printer enclosure. Each printer has speciications for roll size
in order to minimize the risk of purchasing a roll that cannot
be used. Another issue is the roll of tags might have a too
large or too small diameter core that doesn’t it, or doesn’t it
properly, on the printer arm.


Tag roll cores vary in size depending on the type of tag,
amount of tags, and tag manufacturer. If the core diameter
is too large or small to it on a printer arm, the best idea is


113


to re-roll the tags on a different size core. Both the outer roll and
inner core diameter specii cations are available on most printer
data sheets.


_*These different media types are important to understand in order to properly_
_calibrate a printer for a specifi c roll of RFID tags. If a printer is not properly_
_calibrated, it could print in-between tags and not properly encode the tags_
_resulting in a waste of resources. For more information on printer calibration,_
_see Printer Maintenance._


Printer Specs to Know (And Why They Matter)

Printer specii cations are the best tools for choosing the ideal
printer for an application.


114


Operating Frequency


RFID printers have an RFID reader inside of them, so it is
imperative to check which operating frequency the printer
uses. Most printers are set to the Global standard of 865 –
960 MHz, while others can be set to the US (902 – 928 MHz)
range, the EU (865 – 868 MHz) range, or even set to print and
encode HF and NFC tags (13.56 MHz).


Data Interface


Data Interface explains how the printer connects to a
computer or network. The most common data interfaces are
Wi-Fi, USB, RS-232, Ethernet, and Bluetooth.


For placing a printer on a network so that more than one
computer can print to it, you can use Wi-Fi, Bluetooth, or
Ethernet connections. To connect a printer with a single
computer directly, USB, RS232 (Serial Connection), Ethernet,
and Bluetooth can be used.


Power Source


Most RFID printers are powered by an AC cord, but mobile
printers are powered using rechargeable batteries that must be
charged every few hours depending on the size and type of
battery, as well as printer usage. For battery-operated printers,
it is useful to purchase additional batteries and a charging
cradle so that the application is not interrupted due to a
drained battery.


Operating Temperature


If the application is outside, or in a non-temperature controlled
environment, the printer’s operating temperature will be
important to consider. Most printers have similar operating
temperature ranges as RFID readers, unless the printer


115


speciically states that it can withstand harsh environments
and extreme temperatures. Printers, like RFID readers, can
overheat and shut down if they are not stored properly
according to their operating temperature speciications.


Host API


Application Programming Interface, or API, is a set of
protocols and tools on a device that allow a programmer to
build software to interact with that device. Manufacturers
create APIs in speciic programming languages such as
C#, Java, or their own, unique programming language. The
programming language in which the API is available can
be a signiicant advantage for a software programmer that
is proicient in that language. For users looking to create a
custom software for their RFID printer application, the Host
(or manufacturer’s) API programming language could be the
deciding factor between two or more devices.


Printer Options That Affect Pricing


Resolution/DPI


The resolution, or clarity of the text or image printed on the
RFID tag, can be important in certain applications, especially
when printing barcodes that will be scanned with a 1D or 2D
barcode scanner. If the resolution is not clear, the barcode
scanner may not retrieve the correct information for the user’s
application. On RFID printers, the resolution is described as
DPI, or Dots Per Inch. The higher the DPI value, the clearer
resolution of the printed text or image. Printers with higher
options of DPI cost more because of the more sophisticated
printhead required to produce enhanced clarity.


Print Width


Most printers are available with either a 4 or 6-inch maximum


116


print width, which is important to note to ensure that the tag
isn’t too wide to be encoded and printed with the selected
RFID printer. If the tag width is smaller than 4 inches, it
can be used with any supported printer. Printers that have
a 6-inch print width will generally be more expensive than
printers with a 4-inch print width and allow more lexibility
when choosing media.


Cutter/Rewinder/Peeler/Auto-applicator


Some printer manufacturers can provide optional, userfriendly capabilities that can be purchased on, or in addition
to, the printer. Below is a list of some of the more common
options.


**Cutter** - a cutter is positioned on the front of the RFID
printer at the bottom of the opening where the tags are
expelled. The cutter is used to cut the tags for you, instead of
having to use scissors or additional equipment.


**Rewinder** - a rewinder is a separate element that is very useful
when printing hundreds of tags because it carefully winds the
printed and encoded tags coming from the printer, onto a new
roll for ease-of-use.


**Peeler** - a peeler peels the tags off the liner as they come out
of the printer for more automated applications and ease-ofuse.


**Auto-applicator** - an auto-applicator is used in peel and stick
applications on conveyor belts, usually in conjunction with a
cutter and peeler, to replace the human element in the labeling
process.


Printer Software


A few different boxed printer software options are available to
use with an RFID printer. Printer software allows a computer


117


to interface with an RFID Printer in order to create and send
data for printing and encoding tags. Without out-of-thebox software, tags can be printed and encoded by creating a
script in the printer’s programming language and sending it
to the RFID printer. Creating a script requires knowledge of
programming in the printer’s native language.


In order to print and encode tags without programming
knowledge, printer software can be purchased making
communication between the computer and printer seamless.
Each boxed printer software is different, but the basic
functionalities include creating or importing encoding data as
well as the data to be printed on the tag face. Boxed printer
software is designed to be easy to use, but can vary in price
depending on features and the number of printers licensed to
use the software.


Another option for interfacing with RFID Printers is to
design a custom software using the printer’s Host API and
programming language. Custom software is a good option
for companies that want to automate their printing or
create a piece of software with additional capabilities like
communication with other pieces of software or databases.


Printer Maintenance


Calibration


Because different RFID tags are used with RFID printers,
the printer must be calibrated for a speciic piece of media.
Calibrating is basically coniguring the printer settings to
operate with a speciic tag. There are two different types
of calibrating when talking about RFID Printers – RFID
Calibration and Media Calibration.


RFID Calibration refers to when the printer reads the tag and
determines the best antenna position and read/write power
for encoding to that particular tag.


118


Media Calibration refers to when the printer prints a few tags
in order to adjust settings to accommodate for the tag’s size
and the gap in between each tag.


Both types of calibration must be completed each time a new
tag/piece of media is placed inside the printer to be printed
and encoded. Typically, each printer is shipped with either a
booklet or loaded information about all the tags that can be
printed on that printer and their calibration settings.


Cleaning


Cleaning is an important part of upkeep with an RFID
printer. Printers in environments that produce a lot of dust,
ash, or dirt will start to slow down or stop working due to an
accumulation of debris inside the unit. For printers in this type
of environment, it’s important to clean the unit every couple
of weeks to a month depending on the accumulation. Once
every few months, even printers in cleaner environments will
need to be cleaned so that dust does not affect printing speed
or quality.


Cleaning a printer can be done carefully like any other
piece of equipment using cleaning cloths and/ or dusters.
Alternatively, a specialized cleaning kit can be purchased for
supported printers.S


Recurring Costs


Besides the obvious recurring costs of tags and ribbons, printers
may have a few maintenance or equipment replacement costs.
In addition to the cost of printer cleaning supplies, printheads
may sometimes need to be replaced (although this is rare).
Today’s printers are built with high-quality materials and are
made to last.


119


RFID Printer Worksheet


1. Typical RFID Printers print and encode which types of
RFID tags?


a. Hard tags and inlays
b. Labels and inlays
c. Cards and labels
d. Inlays and Badges


2. What are the three most common types of RFID
Printers?


a. Industrial, Commercial, Business
b. Industrial, Commercial, Desktop
c. Industrial, Business, Desktop
d. Industrial, Desktop, Mobile


3. What is the difference between Direct Thermal and
Thermal Transfer printing?


a. Direct Thermal involves printing on heat-sensitive
paper, while Thermal Transfer melts ribbon which
transfers color on a regular label.
b. Thermal Transfer involves printing on headsensitive paper, while Direct Thermal melts ribbon
which transfers color on a regular label.
c. Direct Thermal involves melting ribbon on heatsensitive paper, while Thermal Transfer involves
heat-sensitive ink on a regular label.
d. Thermal Transfer involves melting ribbon on heatsensitive paper, while Direct Thermal involves heatsensitive ink on a regular label.


4. Which type of Ribbon is the most commonly used and
why?


120


a. Wax-Resin Ribbon because it has a mid-level
melting point and price point
b. Resin Ribbon because of the clear, sharp images and
high chemical resistance
c. Wax Ribbon because of its low price point
and ability to be used on coated and non-coated
paper labels
d. None of the above


5. Which of the following is not considered a method of
separation between tags on a roll?


a. Continuous
b. Notch
c. Dip
d. Black Mark Separation


6. Which types of inlays must be printed using a
specialized RFID printer?


a. Foam Backed Inlays
b. Dry Inlays
c. Wet Inlays
d. Round Inlays


7. The higher the DPI, which stands for
__________________, the __________________ the
resolution of the printed text.


a. Digits per Inch, straighter
b. Dots per Inch, clearer
c. Decibels per inch, straighter
d. Deinition per inch, clearer


8. True or False. A single printer can print and encode tags
in any RFID frequency.


121


9. Which RFID Printer components will contribute the
most to your recurring costs if you’re consistently
printing tags?


a. Tags and Ribbon
b. Ink Cartridges and Tags
c. Printer Heads and Tags
d. Data Plans and Tags


10. True or False. A printer calibration must be completed
each time a new tag or piece of media is placed inside an
RFID printer.


Answers: 1) B; 2) D; 3) A; 4) C; 5) C; 6) A; 7)
B; 8) False; 9) A; 10) True


122


RFID Software


Software, Firmware, Middleware


A few different types of software are common components of
most RFID systems – irmware, middleware, and application
software. Though all of these components are technically
software, their individual functions differentiate them into
one of the aforementioned three categories.


Application Software

By deinition, software is any set of machine-readable
instructions that directs a computer’s processor to perform
speciic operations. Thousands of software applications are
accessed daily by end-users, ranging from apps on our phones,
to some more specialized applications such as software built
for accessing and analyzing data collected by RFID systems.
Speedway Connect Software is an example of a software
application that provides a graphical user interface which
allows users to interact directly with RFID hardware. Generally
speaking, application software gives you the ability to get the
data that you are looking for, how and when you need it.


123


Firmware

Software that resides speciically on a hardware component
is called irmware. Firmware controls the operation of the
device on which it is hosted and does not typically initiate
communication with external devices, such as PCs. Device
irmware may be upgraded periodically to ix bugs and to add
new functionality to the hardware component. An example of
irmware is the Astra-Ex v4.19.2 for the ThingMagic AstraEx reader. This particular irmware version contained no new
features; instead, its focus was on ixing bugs and improving
stability.


Middleware


Middleware is a piece of software that usually runs in the
background. It essentially is the “glue” that holds two other
pieces of software together and allows them to effectively
communicate. A common use of RFID middleware is a
service that communicates with and controls RFID readers in
order to gather data, which then may be analyzed and stored
in a database for consumption by a different user-facing
application.


124


RFID Software Worksheet


1. Software that resides on a hardware component is
called 

a. Application Software
b. Firmware
c. Middleware
d. API


2. Speedway Connect Software is an example of 

a. Application Software
b. Firmware
c. Middleware
d. API


3. The type of software that acts as “glue” that holds
together two pieces of software is called 

a. Application Software
b. Firmware
c. Middleware
d. API


4. An error has occurred in my RFID system and it seems
like there may be a bug. Regarding software, what is
usually the irst thing to check when troubleshooting?


a. Check for a Software Update
b. Check for a Firmware Update
c. Check for a Middleware Malfunction
d. Unplug all antennas from your device


Answers: 1) B; 2) A; 3) C; 4) B


125


Important RFID Concepts


Regional Regulations


Regional regulations are rules put in place by individual
countries to regulate the transmit frequency and output
power of RFID systems. In any country, these regulations
are important to know and abide by when purchasing and
deploying an RFID system.
Here are the most common questions and the relevant answers
about RFID power regulations.


In terms of RFID, what is regulated?


- Frequency or frequency range of transmissions

- Power levels of RF Emissions

- RFID Readers, Active Tags, and Certain Passive Tags


Why are regulations put in place?


Most governments have regulating bodies, or commissions
that create and oversee regulations involving country-wide
standards relating to radio communications. For the RFID
portion of this, these commissions oversee RF frequency,
power emissions, and ensure that the RFID equipment
manufactured or imported in the country is certiied for use.


126


The Federal Communications Commission or the FCC, is the
governing body that oversees these standards for the United
States in accordance with the Federal Communications Act.
The European Telecommunications Standards Institute better
known as ETSI, sets the standards for the European Union
for all Information and Communication Technologies which
includes RFID.


Frequency or Frequency Range of Transmissions


Frequency ranges are regulated because each country allocates
speciic frequency bands to certain types of communication.
If communication types are ixed to one speciic range and
monitored, it reduces interference. Radiating RF waves on the
wrong frequency range in a country produces interference
with other channels that could be allocated to more critical
communications like military transmissions, aviation
transmissions, or satellite communications.


Power levels of RF Emissions


Regulations on reader emissions are put in place to ensure
the power output from the RFID reader does not exceed a
predeined level that can interfere with other radio waves in
the vicinity. If an RF system is in close proximity to another
while exceeding the maximum permitted power level, it most
likely will interfere with the other system causing missed
reads, lost reader to tag or tag to reader communication, or
application failure, and also may cause unintended operation
in the other system.


RFID Readers, Active Tags, and Certain Passive Tags

Most devices that radiate RF waves must be certiied by each
country’s government in order for it to be used, manufactured,
or imported into that country. Certiications enable countries
to enforce communication standards, especially for validating


127


that the reader or tag cannot output more power than the
country allows.

Certain passive tags are also subjected to federal certiication
in order to be sold for and used in hazardous environments or
to pass unique, application-based speciications.


How do regulations differ from country to
country?


Frequency


Countless variables go into approving a frequency range and a
maximum output power for each country, which is why it can
vary greatly between countries.


Speaking strictly in terms of frequency ranges, it would be
incredibly dificult to have a set, universal frequency band
for UHF RFID. This is mostly due to the late adoption of
UHF RFID and the limited amount of space still available
in the mid-range of the Electromagnetic Spectrum. One
example of this is that North America uses 902-928 MHz, but
Europe already uses parts of that frequency range for military
communications, meaning that it had to determine another
frequency range for RFID.


Most countries choose and adopt one of the two common,
pre-existing ranges – either 865 – 868 MHz or 902 – 928 MHz,
and enable the use of that range country-wide. However, there
are a few countries that have more distinct regulations that
must be followed, below are the two most common outliers.


1. A common frequency outlier in some countries is to
have two speciic smaller bands allocated for UHF RFID.
Generally, like above, this is due to another communication
channel being allocated in the middle of a larger band such as
902 – 928 MHz.


2. Some countries allow for UHF RFID systems to be used,


128


but only after obtaining a license through the government.
More commonly, countries only require licenses for certain
bands in the frequency range or for using a certain frequency
band at or over a speciic output power. If an UHF RFID
user does not get a license before going forward, they could
be subjected to large ines or company shut downs.


Output Power

Power output in dBm or watts varies per country and just
depends on what the government has decided works best with
their country’s pre-existing standards. Power in watts is usually
either 2 watts ERP or 4 watts EIRP.


How do I know if I am within regional regulations?

First and foremost, check GS1’s UHF frequency regulations
to determine your country’s exact speciications. Their
document contains a list of each country that has adopted
GS1 regulations and documents each country’s allocated
frequency range, output power, and any other speciics that
might be needed to set up an RFID system in that country.


Frequency range will be easy to determine because the reader
or receipt from the purchase of any RFID equipment should
denote the frequency range. Most often, readers cannot be
sent to countries that they are not certiied in, but it is still
important to double check that you are using the correct
frequency for your country.

When it comes to output power, once you have determined
what the regulations are in your country, the next step is to
calculate your system’s output power.


Principle to Know


**Effective Radiated Power (ERP) vs. Effective Isotropic**
**Radiated Power (EIRP)**


129


The technical difference in the two is that ERP refers to the
gain in relation to a half-wave dipole antenna and EIRP refers
to the gain in relation to an ideal isotropic antenna. Some
countries provide output power in ERP and some provide it
in EIRP, and there is a big difference between them in terms
of how they are calculated.


Below is the relation between ERP and EIRP in terms of
Watts, and dBm.


**EIRP (W) = 1.64 * ERP (W)**


**EIRP (dBm) = ERP (dBm) + 2.15**


Calculating Output Power


To calculate output power, you need the following information:


Reader Transmit Power in Watts, mW, or dBm


Radiated power can be expressed multiple ways, but for RFID,
the most common ways are Watts, milliwatts (mW), and dB
referenced to one milliwatt (dBm).


Cable Loss in dB


To calculate output power in ERP or EIRP the cable loss in
dB is required. To learn more about cable loss check out this
article.


Antenna Gain in dBd or dBi


Antenna gain can be expressed in a few different ways
depending on the antenna and the manufacturer. The most
common ways to express gain are dBi, dBic, dBd, and dbiL.


Use the following equations to calculate the EIRP or ERP
of your system. Decide which to calculate (ERP or EIRP) by
checking your country’s frequency regulations, as noted above.


130


**_____ dBm – _____ dB + _____ dBi = _____ dBm EIRP**


**_____ dBm – _____ dB + _____ dBd = _____ dBm ERP**


Below is an example of calculating EIRP and ERP.


**Transmit Power = 31.5   Cable Loss = 3 dB**
**Antenna Gain = 6 dBi**


**31.5 dBm – 3 dB + 6 dBi = 34.5 dBm = 2.82 W EIRP**


**31.5 dBm – 3 dB + (6 dBi – 2.15 dB = 3.85 dBd) =**
**32.35 dBm = 1.78 W ERP**


How can I make sure to stay within regulations?
What if I’m over?


If you use the calculations above to determine output power
and it is higher than what is allowed in your country/area,
there are a few different ways you can adjust your system to
stay within regulations. The irst, and easiest, way is to simply
reduce the transmit power on your RFID reader. Turning
down the transmit power, depending on how far over
regulations the system currently is, can keep your system from
violating the ERP or EIRP maximum.


Two other ways to reduce the output power are:


1. Use a lower gain antenna
2. Use a cable with appropriate attenuation loss to
compensate for the power level.

Exceeding a country’s regulations can cause problems with
other RF systems in the area and call government attention to
your system. If you are exceeding the regulated power output,
you or your company could be ined or the application could
be shut down depending on the country.


131


Remember to check and see if your country has any further
instructions on using RFID in that area, like special licenses.


Frequency Hopping


There are many issues that can arise during the testing phase
of an RFID system. One of the most common issues people
face is called reader collision. Reader collision occurs when two
readers transmit the same frequency at the same time, causing
interference in one another’s read zones. RFID readers utilize
“Dense Reader Mode” to coordinate with other readers so
no two readers interfere with each other. Dense Reader Mode
uses a technique known as “Frequency Hopping” in order to
achieve this. This is extremely useful for environments that
have multiple readers located closely within a facility.

Frequency Hopping Spread Spectrum (FHSS) is a method
used to rapidly switch transmitting radio signals among several
frequency channels.


The FCC has certain regulations in place with which RFID
readers must comply in order to transmit 1 W of output
power. The FCC allows high output power if the system:


- Uses FHSS

- Supports hopping across 50 channels (500 kHz wide)
between the operating frequencies of 902 - 928 MHz

- Transmits no longer than 0.4 seconds per channel


Frequency hopping is a technique mainly used to keep two
or more RFID readers from interfering with each other while
reading RFID tags in the same area. Each reader initiates its
operating program, and, once it receives a frequency hop
trigger signal, a frequency hopping sequence is then selected
from the available operating frequencies. The reader then
prompts the RF module to switch to a frequency channel
described in the hopping sequence and stays there for 0.4


132


seconds. Once completed, the reader will stop transmitting and
store the channel it was using. The reader will then continue
to use the same sequence if a new trigger signal arrives in
less than 30 seconds. Because of this rapid hopping among
various frequencies, multiple readers and tags are allowed to
communicate with one another with minimal, if any, reader
collision.


The nature of this technique allows for very minimal
interference since the probability of two readers transmitting
at the exact same frequency is very low. This comes in handy
when using multiple readers that have overlapping read zones.
The technique can be better illustrated in Figure 1 shown
below, where three readers are able to transmit signals within
a certain range of frequencies without any reader collision.


UHF Security Measures


Class 1 Gen 2 UHF RFID Tags. The gaps in usage of UHF
tags were even more pronounced before the release of Class 1
Gen 2 in 2004, because previous versions such as Class 1 Gen
1 contained virtually no security features.


Called “Gen 2” for short, the Class 1 Gen 2 protocol was
released in order to create a single global standard for
interoperability. Because the standard was created primarily
to unify tag and hardware manufacturers under one global
standard, security measures were auxiliary in production, but
still managed to answer to newly emerging issues. A burst of
security and authentication problems arose some pre- but
mostly post-2004, forcing EPCglobal and ISO to respond
with increased security measures on UHF tags in both the
Gen 2 standard and the newly released G2V2 standard.


Security Breaches
Security breaches started as low-scale threats like hackers


133


reading tags and obtaining private information, but they
have grown into seven large global threats to UHF RFID
security. To be addressed in a later post, these seven threats
include hacking events like spooing, reverse engineering, and
eavesdropping.


Current Gen 2 tags do not have the capability to thwart all
threats, but two security measures in particular were developed
and applied to UHF Gen 2 tags in order to provide the irst
layer of protection against hackers – serialized TID numbers
and passwords.


TID Numbers

When the Gen 2 standard was released, it introduced serialized
Transponder ID (TID) numbers for identiication purposes.
While initially the concept of serialized TID numbers was
intended for identiication purposes (manufacturer’s codes,
etc.), the TID became widely used for the purpose of
authentication once cloning tags became achievable. TID
numbers, unlike EPC numbers, are locked after being written
at the factory and as a general rule cannot be tampered with.
Generally, to authenticate a tag that is suspected to be fake,
read the EPC memory bank and the TID memory bank and
record both numbers.


Passwords


Two password functionalities are currently available on Class
1 Gen 2 tags: the access password and the kill password. Both
passwords are stored on the reserved memory block and
come pre-encoded with zeros, which do not function as an
access or kill code.


**Access Code**
The access code on UHF Gen 2 tags must be written in order
to be used. Once written, the access code is stored on the


134


reserved memory bank along with the kill code and prevents
anyone from changing the ‘lock’ state without irst sending
the 32-bit code. Four lock states exist on each memory bank:


- Unlocked

- Perma-unlocked (can never be locked)

- Locked

- Perma-locked (can never be unlocked)


The access code can also prevent readers from reading the
reserved memory bank if it is locked. “Locking” the memory
bank enables it only to be read when the reader interrogates
it irst with the access code, and is the irst layer of security
generally used with UHF tags. After the access code has been
written and the selected memory bank has been locked, the
next step is to lock the access password so that users cannot
simply re-write it. It is important to note that a small piece
of software is usually required in order for the reader to
interrogate the tag using the access password. For speciics
on locking RFID tags, read Locking Memory on EPC Gen2
RFID Tags.


**Kill Code**
The kill code is used primarily for applications that require
tags to change state (or phase) to indicate a speciic event
has occurred. Applications like retail beneit from the kill
code because once an item is purchased the tag can be killed,
making it permanently unreadable. If this method is used, a
reader is generally set up at the register to send the kill code
after checkout. Using this state change, retailers are able to
know if an item was actually purchased versus stolen if it is
returned.


The Future – G2V2

Ever since the irst details were released about the new G2V2


135


standard, the idea of security with UHF RFID tags has
changed drastically. The new standard takes UHF tags into
the 21st century - from two small security measures on Gen
2 tags, to intricate anti-counterfeiting measures and security
privileges on G2V2. EPCglobal and ISO were able to step up
security and anti-counterfeiting for this new standard by using
encryption and cryptologic keys.

While enhanced security measures along with the other
three new features are revolutionary, these features are not
required on all G2V2 tags. The chips will be customizable
based on which features the application needs. For example,
if a manufacturing application needed enhanced user memory
on tags in order to store increased information but did not
need cryptographic authentication, EAS functionality, or the
ability to be untraceable, the users can purchase the tag with
that one feature alone. Allowing these tags to be customizable
(16 combinations) enables them to be cheaper because onefeature chips will be cheaper than chips with all four features.


Even though allowing the chips to be customizable is costeffective, it adds a huge barrier in the production timeline
and availability. Because manufacturers cannot predict which
combination will produce the biggest return-on-investment,
virtually no G2V2 chips have been put into production as of
mid-2016. Back in 2014, it was estimated these chips would be
put into production and available in different tag formats for
purchase by early 2016; but until the demand grows and large
companies place signiicant orders, these tags will not likely be
available in the near future.


Custom Protocols & Interfaces


Protocols


136


Protocols are a certain set of rules that govern the exchange
of data through a communication connection. Most widely
used protocols deine small data exchanges that occur millions
of times a day like the Hypertext Transfer Protocol (HTTP)
or File Transfer Protocol (FTP). It is fair to say that most
people use protocols on a daily basis. Because RFID is built on
communication exchange, there are multiple protocols speciic
to RFID systems. Some higher-level, complex protocols are
constructed of component protocols; a common example of
that is the EPC Gen2 protocol.


The EPC Gen2 protocol is comprised of other protocols
like anti-collision protocols, air interface protocols, and
authorization protocols – just to name a few. Each exchange
of data must be deined in a protocol in order to not only
comply with rules set by the FCC and other regulatory bodies,
but also to gain widespread acceptance and usage. Protocols
can be created by a company a manufacturer, or a committee,
but must be approved by a governing body to be used.


Industry Speciic Protocols


Because the popularity of RFID tracking is becoming more
widespread, industries as a whole are starting to use RFID and
are invested in creating standards and protocols speciic to
their use cases. They also have broad applications which will
foster easier data exchange between diverse entities who do
business with each other. Two common examples of this are
the ATA protocol created for the transportation industry, and
the AAR protocol created for the railway industry.


The ATA protocol was created for the transportation industry;
it was set by the American Trucking Association or (ATA)
who created a standard to deine and set protocols for using
RFID in the industry. The ATA protocol deines the way that


137


the communication will take place between tag and reader,
while the standard deines items like memory allocation and
security methods.


Industries like these create standards and protocols in order to
create speciications to work toward universal adoption. This
allows users from all across the industry to read RFID tags
and ind tracking information in the same uniform way, and,
in this case, there is the added beneit of cost competition
between RFID vendors.

**Added Beneit:** Ease of use, and Potential Widespread
Adoption


TransCore’s eGo & SeGo Protocols


TransCore, an RFID manufacturer that specializes in
Automatic Vehicle Identiication (AVI) and tolling applications,
owns two speciic protocols that can provide beneits to
automotive applications. eGo and SeGo are two protocols
under ISO 18000-6B that are currently used in applications
like access control, tolling, and AVI. SeGo – also known as
“SuperEgoTM”, differs from eGo in that it has higher tag-toreader data exchange rates.


Both of these protocols provide advanced security
procedures to customers that ensure a tag’s authenticity while
preventing data corruption and/or alteration. In addition,
tag cloning, spooing, copying, or duplicating is prevented1.
Because vehicles are high-cost assets, these advanced security
techniques are valued in AVI applications. In addition, these
tags offer 3x the amount of read/write memory than standard
RFID tags – up to 2048 bits.

**Added Beneit:** Advanced Security Measures, and Increased
Memory


Wiegand Protocol


138


The Wiegand Protocol is another example of a custom
protocol that can be used for added beneits. Wiegand is built
upon the Wiegand effect, discovered by John R. Wiegand,
which uses wires and magnetic properties to encode and
decode cards. Because this can be used with RFID, and not
just magnetic key cards – a protocol was created to describe
the communication between tag and reader with Wiegand
capabilities. The most common use for a Wiegand system is
in electronic access systems to enter gates or buildings.


In order to setup an electronic access system using RFID with
doors, locks, and gates, the readers most likely will need to
have Wiegand output capabilities. Wiegand output capabilities
on RFID readers are similar to GPIO abilities in that they
provide information to other Weigand protocol compatible
accessories like control systems for gates or magnetic locks
for door entry. The RFID tags used in the system will also
have to be programmed with Wiegand speciic coding.

**Added Beneit:** Enable Use with Wiegand systems/devices


Reader Interfaces


Reader manufacturers usually offer software Application
Program Interfaces (APIs) for RFID readers so that custom
software can be developed by end users to integrate the reader
into their business processes. Reader manufacturers may also
provide Software Development Kits (SDKs) which provide
sample code examples and other helpful documentation to
speed up the development and integration process of RFID
readers into their environment.


Two Gen2 interfaces exist that can help users integrate directly
with RFID readers and start reading and writing as well as
building custom applications.


**API** - Application programming interfaces are provided by
reader manufacturers and the functions of each may vary.


139


The primary disadvantage to using an API to build custom
software is if the application changes to a reader made by
another manufacturer. If this occurs, then the code will need
to be modiied using the new manufacturer’s API commands.

**ALE** - Application level events speciies an interface that
is basically a starting point for creating and writing custom
software. It gives users iltered and consolidated data capture
information for physical events and other related data.


Other custom interfaces exist on the market that provide
added beneits, such as Kathrein’s KRAI Interface.


Kathrein’s KRAI Interface


Kathrein is one of the few companies that created an interface
that works through the reader to manipulate connected, smart
RFID antennas. The KRAI, or Kathrein RFID Antenna Interface, is a selectable option when purchasing certain Kathrein manufactured antennas and readers. The KRAI interface
actually takes the place of choosing a polarization – whether
RHCP, LHCP, or linear polarization that can be horizontal or
vertical.

This conigurable reader deployment is due to the innovative
way that the reader and antenna modules communicate. Working together, a KRAI reader and antenna toggle between the
four different polarization methods and then choose (through
internal testing) which is best suited for the read area. This
unique feature allows for the optimum antenna polarization
and changes depending on the site performance requirements.

On one speciic KRAI antenna, the Wide Range UHF RFID
Antenna, the interface allows the antenna to switch between
three read ields in order to enable coverage in speciic areas.
This antenna is typically used for logistics, AVI, and general
portal applications. This vendor speciic interface provides
abilities that can greatly increase the success of an application.


140


**Added Beneits:** Optimized Antenna Polarization / Optimized Read Field


Factoring in the Environment


Deploying an RFID application without consideration of
the environment can potentially lead to thousands of dollars
spent with less than stellar read rates. If positive results cannot be provided within the required timeframe, the project
may be abandoned and the organization deprived of potential
time and cost savings.

Whether the RF waves are absorbed (as with liquids) or relected (as with metals), any source of interference in the environment may cause problems unless properly mitigated.


Liquids and RFID


Liquids absorb RF energy.


What’s the Problem?


Tagging Liquid-Filled Containers


In the past, it was nearly impossible to tag liquid-illed containers because the absorption of RF energy by the liquid would
leave little RF energy for the RFID tag to receive, much less to
backscatter in reply to the RFID reader. Now, there are quite a
few options for tagging liquid-illed containers.


How can you mitigate it?

**Option:** Use Low Frequency (LF) RFID instead of High
or Ultra-High Frequency. LF RFID does not have the issues
with water that higher frequencies struggle with, so it can be
used for animal tracking or water-illed items. The downside
is slower data transmission speeds and shorter read ranges
relative to the higher frequencies.


141


**Option:** Use UHF labels approved speciically for use on
water-illed containers like the Omni-ID IQ 600 Labels and
the Conidex Silverline.


**Option:** Use UHF Near-Field tags approved for use on waterilled containers like the Alien SIT tag and the SMARTRAC
Trap.


**Option:** Use regular UHF inlays or labels and place a spacer
between the liquid and the tag made from foam, silicon, or
another thick material (e.g. the Foam-Backed ShortDipole).


What’s the Problem?


Tagging Items in Liquids


Impossible with UHF until a few years ago, tagging items in
liquids can now be done thanks to the better tag construction
and design.


How can you mitigate it?

**Option:** Use Low Frequency (LF) RFID instead of High or
Ultra-High Frequency. LF RFID does not have the issues with
water that higher frequencies struggle with, so it can be used
for animal tracking or water-illed items. Again, the downside
is slower data transmission speeds and shorter read ranges
relative to the higher frequencies.


**Option:** Use UHF Near-Field tags approved for use in waterilled containers like the Alien SIT tag. The read range will be
very short, but these tags will still read. NOTE: there is no
guarantee that this will work consistently for an application;
testing is always key.


What’s the Problem?


Liquid in the Environment


142


Whether the application is outdoors near lakes or ponds, or
indoors around water tanks or water-illed machinery, liquid
can play a role in an RFID application because it absorbs RF
energy.


How can you mitigate it?

**Option:** Use Low Frequency (LF) RFID instead of High or
Ultra-High Frequency. LF RFID does not have the issues with
water that higher frequencies struggle with, so it can be used
for animal tracking or water-illed items. Again, the downside
is slower data transmission speeds and shorter read ranges
relative to the higher frequencies.


**Option:** Set up the RFID system with extra hardware to
ensure that the necessary RF energy gets to the tagged objects
and not signiicantly absorbed by the liquid. RFID Power
Mappers are a great tool for measuring UHF RF energy in
any given area and determining if enough energy is reaching
the designated read zone.


Metals and RFID

Metal relects RF waves.


What’s the Problem?

Tagging Metal Objects


How can you mitigate it?


**Option:** Use metal-mount RFID tags which are produced
speciically for tagging metal surfaces. Examples of metalmount tags are the Omni-ID Exo 750, Xerafy Micro XII, and
the Vulcan Custom Universal Asset Tag.


**Option:** Place an embeddable, metal-mount tag into a
drilled or pre-made hole in the object. In some applications,
embedding works even better than adhering on the object


143


(such as in rugged environments). When embedding an RFID
tag, always leave one side with no metal covering and protect
it with epoxy or something similar to ensure it can be read.
(NOTE: an RFID tag completely encased in metal cannot be
read).


What’s the Problem?


Metal in the Environment


Metal in the environment relects RF waves, potentially
creating null zones where the RFID tag cannot be detected.
More metal in an environment will lead to an increased
number relections, ultimately causing multiple null zones.


How can you mitigate it?


**Option:** Place RF absorbing materials in front of metal
objects to absorb the RF waves instead of relecting them
back into the environment. RF absorbing materials can be
substances like carbon-loaded foam and polyurethane foam.


**Option:** Set up the system with extra hardware to ensure that
the necessary RF energy gets to the tagged objects. RFID
Power Mappers are a great tool for measuring UHF RF
energy in any given area and determining if enough energy is
reaching the designated read zone.


Fluorescent Lighting and RFID

Fluorescent lights can relect RF waves, but only when the
lights are on.


What’s the Problem?


Fluorescent Lighting in the Environment

Fluorescent lights can, in some instances, relect RF waves


144


causing null zones. Fluorescent lights become more of a
problem the closer they are to the RFID system or tagged
object.


How can you mitigate it?


**Option:** Using RF absorbing materials, such as carbon-loaded
foam, between the luorescent lights and the RFID system will
allow the RF waves from the lights to be absorbed effectively
negating interference.

**Option:** Because luorescent lights only affect an RFID
system in close proximity, the lighting could be moved or
replaced with LED or incandescent lighting (if possible).


**Option:** Set up the system with extra hardware to ensure that
the necessary RF energy gets to the tagged objects. RFID
Power Mappers are a great tool for measuring UHF RF
energy in any given area and determining if enough energy is
reaching the designated read zone.


RF Waves and RFID

Additional RF waves can cause relection and null zones.


What’s the Problem?


Additional RF waves in the environment
Other RFID applications or machinery that emit
electromagnetic waves can create additional RF waves in the
environment that create null zones and dificulty reading
RFID tags.


How can you mitigate it?


**Option:** RF shielding or absorbing material like carbonloaded foam can be used to separate the waves from the
two systems so that there is little to no interference. To ind
out if there are existing UHF electromagnetic waves in the


145


application environment, try using an RF Power Mapper that
detects RF energy and then map out where exactly it is. Then
shielding can be installed to keep the waves from interfering
with the RFID system.


GPIO Capabilities

Most ixed RFID readers have a GPIO port, or General
Purpose Input / Output port, that enables additional
functionality, such as visual or audio signals. Unlike other
ports on RFID readers, the GPIO port has only two settings

- high (i.e. “on”), or nothing. The high signal acts as a trigger
for GPO devices because it sends voltage through the port to
trigger them to perform a certain action; likewise, an incoming
high signal from a GPI device can act as a trigger the reader
uses to perform a predetermined action.


What is a GPIO device?


A GPIO device is a device that performs actions based
upon triggers sent by the RFID reader, providing additional


146


functionality like audio or visual signals. Most ixed RFID
readers have GPIO ports that allocate certain voltage levels
to input and output electric signals. Within each GPIO port
are several pins and each pin either outputs or inputs a trigger
signal.


The number of pins in a GPIO port varies with the RFID
reader, and it is important to note how many pins exist
because most GPIO devices require 3, 4, or more pins in
order to operate. It is also crucial to understand the amount
of voltage each pin will provide to the GPIO device. Some
readers’ GPIO ports do not allocate enough voltage to power
a GPIO device. In those cases, even though the reader has a
GPIO port, a GPIO box is necessary to power to the device.


When to use GPIO Devices and GPIO Boxes


GPIO boxes provide convenient access and power from a
reader’s GPIO port to a GPO, or General Purpose Output
device. Like a GPIO device, the GPIO box wires directly into
the GPIO port on an RFID reader, the GPIO box itself does
not provide any additional functionality. GPIO boxes provide
AC/DC power if the RFID reader does not provide enough
voltage to power the allotted GPO device and it provides the
user an easier way to hardwire the GPIO device. Unless the
GPO device is small and uses minimal voltage such as a small
LED light, an RFID system using GPO devices will likely
need a GPIO box.


GPI devices, or General Purpose Input devices may not
require a GPIO box because they utilize a different source of
AC/DC power to operate. Because these devices perform an
action before the reader is involved, they must be powered by
a source other than a reader or GPIO box. However, some
RFID systems might use a GPIO box for GPI devices for the
ease of access that GPIO boxes provide for wiring.


147


Why use a GPIO device?


As mentioned above, GPIO devices provide additional
functionality that can improve an application. Many different
types of devices can be added to an RFID system by way of
a GPIO port such as stack lights, motion detectors, buzzers,
and indicators. Below are examples of where an application
could beneit from a GPIO device.


**Stack Lights** - GPO, Output - Because there are a variety of
available colors in most stack lights, these devices can often
be seen in a security or access control application. In a high
security area, the ability to have one light turn green when the
reader detects a valid RFID tag/card and one light turn red if
it doesn’t, adds easy visibility for staff.


**Motion Detectors** - GPI, Input – For RFID systems
in manufacturing or warehousing applications, a motion
detector can be used to send an input signal to tell the reader
when to begin transmitting in order to read RFID tags. Such
functionality works well in applications with randomly timed
tagged objects moving through a certain area like a dock door.


Who uses a GPIO device?

Anyone that uses an RFID system that would beneit from
alerts or indicators no matter the application can use a GPIO
device. If additional voltage is needed to drive a device, or
a user would like an easier way to work with device wiring,
external GPIO boxes are available.


Multipath


If you currently have an RFID system, or are thinking about
purchasing one, there are a few terms that should be in the
back of your mind when you start setting up your system.
The RF energy that your reader generates is sent out


148


in electromagnetic (EM) waves and like any wave, their
propagation is impacted greatly by their surroundings. Some
travel in direct lines, and some move out at different angles
from the bore sight (or center of the antenna). In order to
better anticipate the paths RF waves travel in your system, you
need to have a deeper understanding of EM waves.


EM waves, just like light waves, water waves, and sound
waves react very differently in diverse settings. Below are a
few reactions that these waves have with specii c objects and
materials which could drastically impact the performance of
your RFID system.


Common Wave Reactions


Rel ection

Like all waves, EM waves rel ect off of specii c materials at
the same angle (angle of rel ection) that they approached the
material (angle of incidence). EM waves are rel ected from
metallic surfaces, as well as dielectric surfaces such as dirt,
wood, ice, asphalt, cardboard, paper, glass and concrete. Wet
surfaces also provide better rel ection such as pools, oceans,
lakes, or even pitchers of water. Rel ection can be avoided by
blocking any metallic or dielectric surfaces, or adjusting your
read range sensitivity on your reader.


149


Refraction

Not as big of a concern as relection in RFID systems, refraction
is when the EM waves pass through a speciic material at an
angle and changes angles when it passes through. A typical
example of refraction is when light waves pass through water
and propagates at a different angle through the water. Water
and other dielectric materials between the tag and antenna can
refract the EM wave.


Diffraction

When RF waves seem to bend around objects instead of
passing through them, it is called diffraction. Metal poles,
corners of buildings, and other corners of metallic objects
are where this is seen the most.


Absorption

When an EM wave is absorbed by the object that it is sent
toward it is called absorption. Specialized absorbent material
like carbon loaded foam for example work well to absorb
EM waves. Water and most materials absorb RF waves to an
extent as well as refracting, relecting or diffracting.


Multipath

The deinition of multipath is “when two or more favorable
radio paths exist between the reader antenna and the tag.”
When the reader sends a signal to the antenna to ‘ping the
tag’ the antenna doesn’t just send one beam of RF waves
straight forward. The reader antenna sends waves on several
different paths in order to pick up the tag’s signal. This is
where relection, refraction diffraction and absorption come
into play.


Each path besides the direct path is at a small angle from the
center and has a high probability of experiencing relection,


150


refraction, diffraction or absorption depending on the
materials or objects in the vicinity. That poses a problem when
you have more than one tag in the read i eld, and you only
want to read a specii c subset of tags. One way to mitigate this
problem would be creating a tunnel type of enclosure with RF
shielding materials. For example, if you were using a conveyor
belt RFID system to read tagged boxes on the warehouse
l oor, but only want to read the specii c set of tags coming
through the conveyor belt, installing the reader antennas in a
contained tunnel will create a boundary from the effects of
multipath.
Another problem area with multipath is if the direct RF wave
intersects with another RF wave with a different phase, it
will create a null spot in your read i eld. Null spots can occur
multiple times in your read zone. In a null spot, your RFID
tag will not be read by the antenna because the out of phase
waves will cancel each other out.

The phase of a wave is dei ned as the distance between the
i rst zero-crossing and the point in space dei ned as the origin.
That basically states that if the waves have the same frequency
and do not intersect each other, the waves are ‘in phase’. If
you have two waves that either have two different frequencies
or do intersect each other, these waves are called ‘out of
phase’. See the drawing below for more information.


The waves above are ‘in phase’ waves


151


The waves above are ‘out of phase’ waves


In-phase waves will intersect in the same phase, thus creating
constructive interference. You can see below that constructive
interference strengthens the wavelength making it possible
to read well outside the normal read range of that antenna.
An example of that would be if your antenna typically reads
around 6 feet, in one area where two RF waves come together
at the same phase, your antenna would be able to read a few
feet more.


**Above:** Constructive interference of ‘in phase’ waves,
increasing read range

**Below:** Destructive interference of ‘out of phase’ waves,
causing a null area in the read zone


152


Determining the exact area that is a null zone or an extended
read zone is not a trivial process. In order to determine these
areas, you would have to move the tag around on the x, y, and
z axis.


All of the information about EM waves and multipath above
can help you to anticipate how to get the most out of your
RFID system. If you effectively design the area surrounding
your system, you can avoid the different effects of multipath.


Testing


Testing is key to launching a successful RFID implementation.
While RFID works well in a wide variety of environments,
testing is necessary to ind the optimum RFID tags, readers,
and antennas for your application and environment.


Testing is a simple, low-cost, and effective way to see if your
idea for your business can improve your operations without
having to make a major purchase decision.


Testing is extremely important because there are many factors
that can affect the ability to read RFID tags consistently – the
environment in which the tag is being read, the orientation of
the tag on the object, the antenna gain, and reader settings are
just a few of the factors that can affect your ability to capture
reads.


There is not one RFID tag, reader, or antenna that works best
for every situation. Most products have been created to it a
speciic need because every business situation will be unique
in some way. For example, if you are tagging a cardboard box,
you’ll use a very different tag than if you are tagging a steel
beam.


So, before assuming RFID is right for you and spending a
lot of money on readers, tags, antennas, and the software
necessary to bring it all together, start small.


153


Customizable RFID tag sample packs and development kits
are a great place to begin. Tag sample packs can be customized
speciically for your application – combining an assortment
of tags that should perform well in your situation. During
your testing, a customized sample pack will make it easier to
select the tag that works best with your operation.


An RFID development kit is a low-cost and effective way of
testing your idea before you make a major purchase decision.
Each development kit is a little different, but all development
kits include:


- An RFID reader

- An antenna (which is sometimes integrated directly into
the device)

- An antenna cable (if the antenna isn’t directly integrated)

- Tag samples, and

- Access to the testing software you will need to get started.

The four major categories of RFID Development Kits are
4-port reader development kits, integrated reader development
kits, USB reader development kits, and handheld reader
development kits. Each type of development kit has its own
pros & cons and some it certain applications better than
others.
The four-port reader is great for applications where you will
need lots of coverage. The four ports allow users to attach
multiple antennas to a single reader (depending on the reader
and setup, the number can range from 4 to 32 antennas).
With the ability to attach additional antennas, users can cover
more ground and have the added lexibility of being able to
choose from a wide array of antenna options. Depending on
the kit selected, you have options for Wi-Fi and Power-overEthernet.


The integrated reader is a lower-cost option than the fourport reader. It has an antenna integrated inside of it, as well


154


as an additional antenna port which gives users the option to
add another antenna if needed. If you only need one or two
antennas, this may be the best option for you. Like the fourport readers, you also have Wi-Fi and Power over Ethernet
options.


The USB reader is the least expensive of the RFID readers
and is a great it for desktop and close proximity applications.
It is also a great it if you are just getting into RFID and
want to start with an inexpensive option. Because of its size
and power output, its read range is much less than any other
reader. Additionally, due to having a serial connection, USB
readers must be connected to a host computer and cannot be
placed on a network like other RFID readers.


The handheld reader is a mobile RFID reader with an
integrated antenna. It is great for applications where you are
on the move, and don’t want to be restricted to a single point
for reading tags. Most handheld readers also have the ability
to read various types of barcodes. Because many units are
also full-ledge mobile computers, they are typically the most
expense type of RFID reader you can buy.


As I mentioned earlier, a development kit is great for testing
because it allows users to try out different approaches to
various applications. With the ability to test multiple types of
antennas and tags, an RFID Development kit can help you
asses your business idea to see if RFID can improve your
operation without spending a tremendous amount of money.


Challenges


Facing challenges when installing a new system or procedure
is expected, but it helps to consider potential problems
before installation. Large and small companies, as well as
individuals, thinking about installing an RFID system have
numerous things to consider before making a purchase. If


155


the potential user prepares thoroughly and completes enough
due diligence up front, it should reduce unplanned issues mid
and post-installation. Unfortunately, even the most prepared
organization might run into a few issues during installation
due to the unpredictable nature of RFID when implemented
in a new environment.


Deploying an RFID system can present many challenges;
below are the four most common challenges (and ways to
mitigate them).


1. When your business problem is non-existent


One of the most important things to consider when thinking
about RFID is – be realistic when it comes to the problem that
needs to be solved. When considering automating a process,
the irst step is to take time to understand what the business
problem is currently and how the business would be affected
if a part of the process, or the entire process, were automated.
Would it save time, money, or both, and what would those
savings mean in terms of a return?


Other important factors to consider are the advantages that
RFID has to offer and if RFID technology is necessary for
the application to accomplish its goals. One of RFID’s most
important characteristics is that the technology uniquely
identiies items (or crates of items) without requiring line of
sight, making it exceptionally productive in applications like
inventory and asset tracking. For example, inding a particular
wrench, or group of wrenches, in a truck illed with hundreds
of tools can be invaluable.


Understanding that a process is in need of automation is
step one, but step two is asking the question “Do I need to
uniquely identify items in my application, or is item 100006
any different from item 1555562?”

While problems can start out as small and grow until they


156


reach a substantial size, generally speaking, small problems
usually do not receive the return on investment (ROI) needed
to offset the initial (and potentially ongoing) cost of installing
an RFID system. Sometimes, automating a personal (i.e. nonbusiness related) problem may lead to a very lucrative product
or process, but because RFID systems are still relatively
expensive, careful analysis should be undertaken in order to
ensure RFID will produce a signiicant ROI.


2. When you are working in an extremely non-RFfriendly environment


The most common dilemma with RFID is environmental
issues – whether that be non-RF-friendly substances like
metal or water, or a generally unconducive environment.
Environmental considerations can impose many limitations
when discussing an RFID system deployment, but these
considerations don’t necessarily erase any chance of RFID
success. Depending on the speciic environmental concerns,
there are usually a few ways to mitigate the problems and
ensure a successful RFID application.

**Mitigating Metal** - Metal relecting RF waves is one of
the most common sources of interference experienced with
RFID. The interference occurs because of the movement
and reaction of electromagnetic waves with other surfaces,
also called multipath. In other words, RF waves sent from the
reader/antenna to the tag collide with objects or other RF
waves causing refraction, diffraction, absorption, null zones,
or extended read zones.

If a long read range isn’t necessary, Low-Frequency (LF)
or High Frequency (HF) RFID may be a solution instead
of Ultra-High Frequency (UHF) RFID because these
two frequency ranges perform better around metal (this
is especially true with LF RFID). If longer read ranges are


157


necessary, incorporating metal-mount tags onto metal items
and introducing RF blocking materials or shielding are two
ways to improve the functionality of an RFID system.

**Mitigating Water** - Mitigating problems with water-illed
items is less complex than mitigating RFID applications that
are exposed to water. Tracking items that are illed with liquid
including bottles, barrels, and even the human body can be
done if the right precautions are taken. For example, adding a
small piece of foam between the tag and the water-illed item
can usually improve read range signiicantly.


RFID tags and equipment that are exposed to water pose an
entirely different problem. Hardware exposed to water will
typically need a higher IP rating and, if an RFID reader is
involved, sheltered from direct water exposure. This can
be accomplished with the use of antennas and cables rated
for outdoor use and, for readers, weatherproof enclosures.
Additionally, RFID tags exist that are rugged enough to be
exposed to water, like rain and snow, without a problem, but
they are more expensive than inlays or paper RFID tags.


Underwater RFID applications are few and far between. The
only type of RFID tag that can be read through water is a tag
that uses magnetic coupling to communicate with the reader,
such as LF technology. Even then, the read range will not
exceed more than a few centimeters and should be thoroughly
tested before implementation.

Besides water and metal, other factors, such as magnetic ields,
may also play a major role in affecting an RFID system. The
best way to determine how much read range an RFID system
will receive is through thorough testing. It is also a smart idea
to map out the area to get a better understanding of where RF
waves might relect, refract, or absorb.


3. When your budget is below a certain threshold


158


RFID is a technology that has the ability to change the way
that people interact with items, but it comes with a cost. Over
the years, RFID tags and hardware have gone down in price
and have become more accessible to consumers; however, the
technology is still not inexpensive enough to justify buying
a system without irst calculating the potential return on
investment.


Most RFID systems are different and can include an array of
hardware options, from a couple of ixed readers, antennas,
and GPIO adapters, to one handheld reader with a built-in
antenna. Before purchasing any system, it is important to
understand the general cost breakdown for an RFID system.

Start-up (i.e. near-term) costs and recurring (i.e. long-term)
costs are both very important to consider. Start-up costs are
described as the amount spent to get an RFID system up
and running as well as integrated with current systems. Startup costs include readers, tags, software, and other hardware
equipment. Recurring costs such as software contracts, and
consumables are costs that reoccur monthly or yearly that
keep an RFID system up and running.


Development kits and sample packs of tags are a good way
to get started with RFID before investing too much money.
Purchasing a development kit and sample pack is a costeffective way to see if an RFID system could be the solution
to the business problem at hand.


4. When the new system needed to be installed
yesterday


Unfortunately, RFID is not exactly a “setup and go”
technology; so, if an organization determines that RFID is a
good it, then it needs to plan ahead. Failing to plan ahead will
usually lead to project delays and increased costs. In the worst
case, the project could be ‘scrapped’ altogether if expectations


159


aren’t met quickly enough.


In order to properly implement RFID, consumers must choose
the best it equipment and tags and then test thoroughly. As a
best practice, time should be spent before purchasing to fully
vet the hardware and tag options available in order to learn
about potential pros and cons. After readers and antennas are
selected, purchasing a few different types of tags for testing
is strongly recommended. Ordering various types in small
quantities allows for lexibility during the testing process.


Rushing through purchasing and testing could lead to larger
problems down the road. Sometimes the installation and
testing can take several weeks or months, but that extra time
will pay dividends later.


160


RFID Concepts Worksheet


1. In terms of RFID, what is regulated?


a. Frequency range of transmissions
b. Power levels of emissions
c. Antenna Gain
d. RFID Readers, Active Tags, and Certain Passive
Tags
e. A, B, & C
f. A, B, & D


2. Which of the following frequencies within the UHF
RFID range is certiied for use in North America?


a. 865 - 960 MHz
b. 865 - 868 MHz
c. 902 - 928 MHz
d. 956 - 965 MHz


3. What is the difference between Effective Radiated Power
(ERP) and Effective Isotropic Radiated Power (EIRP)?


a. ERP refers to gain in relation to a half-wave dipole
and EIRP refers to gain in relation to an ideal
isotropic antenna
b. EIRP refers to gain in relation to a half-wave dipole
and EIRP refers to gain in relation to an ideal
isotropic antenna
c. ERP refers to gain in relation to a full-wave dipole
and EIRP refers to gain in relation to an ideal
isotropic antenna
d. ERP and EIRP are pretty much the same thing


4. Why is it important to calculate output power?


a. To ensure that you are getting the right read range


161


b. To ensure that you are on the right frequency
c. To ensure that you are receiving backscatter from
the tag
d. To ensure that you are not violating regional
regulations


5. If your system’s output power is too high, you can
reduce it by:


a. Using a longer and less insulated cable
b. Using a smaller tag
c. Using a reader with less antenna ports
d. Using an antenna with a lower gain
e. A & C
f. A & D


6. How do you avoid Reader Collision?


a. Frequency Interaction
b. Frequency Hopping
c. Reverse Engineering
d. Increase Security Measures


7. What is Gen2 short for?


a. Class 2 Generation 2
b. Class 2 Generation 1
c. Class 1 Generation 2
d. None of the above


8. Which of the following is not a security feature on Gen2
Tags?


a. Serialized TID numbers
b. Serialized EPC numbers
c. Access Code
d. Kill Code


162


9. Which of the following is the correct order of steps for
locking Gen2 tags?

a. Lock the selected memory bank, Write the access
password, Lock the access password
b. Write the access code, Perma-lock the access code,
Lock the kill code
c. Write the access code, Read the access code, Lock
the selected memory banks
d. Write the access code, Lock both the kill and access
codes, Try to read the tag


10. ____________________ are a certain set of rules that
govern the exchange of data through a communication
connection.


a. Readers
b. Reader Interfaces
c. Proprietary Interfaces
d. Protocols


11. What is the difference between an API and an ALE?

a. API’s are interfaces while ALE’s are events and
other related data
b. API’s are integrations while ALE’s are events and
other related data
c. API’s occur within ALE’s and basically jump start
the coding process
d. API’s occur within ALE’s and ilter out repeated
data


12. Which four environmental elements cause problems
with UHF RFID?

a. Liquids, Metals, All Lights, and Additional RF Waves
b. Liquids, Metals, Fluorescent Lights, and Additional


163


RF Waves
c. Liquids, Metals, UV Lights, and Additional RF
Waves
d. Liquids, Metals, Halogen Lights, and Additional RF
Waves


13. Which of these is not a reason to use a GPIO Box and/
or Device?


a. Provide additional functionality
b. Provide additional power
c. Provide additional visibility
d. All the above are valid reasons
e. None of the above are reasons


14. How does Multipath affect an RFID System?


a. By creating multiple paths of resistance between the
reader and antenna
b. By creating multiple paths of resistance between
two readers
c. Waves propagate between the reader and the tag in
multiple paths, reacting to their surroundings and
causing a variety of consequences.


15. Which one of the following is not a result of multipath?


a. Destructive Interference
b. Constructive Interference
c. Angle of Incidence
d. Null Zones


16. What is the most important part of launching a
successful RFID implementation?


a. Testing
b. Using UHF RFID


164


c. Accounting for Cable Loss
d. Staying under budge


17. What are the four most commonly faced problems when
deploying an RFID system?

a. Being Unrealistic, Wasting Time & Products, the
Environment, Testing Procedures
b. Being Unrealistic, the Environment, Budget
Restrictions, Testing Procedures
c. Being Unrealistic, the Environment, Budget
Restrictions, Lack of Proper Planning
d. Being Unrealistic, Saving Time, the Environment,
Lack of Advanced RFID Knowledge


18. Is RFID necessary for every business problem?


a. No, RFID cannot solve all problems and have a
return on investment
b. No, RFID cannot solve all problems without an
additional integrated technology
c. Yes, automation is the future
d. Yes, RFID varies in cost - small systems for small
problems


19. Which of the following is a way to mitigate
environmental issues?


a. Using a different type of RFID
b. Incorporating specialty tags
c. Introducing shielding and RF block materials
d. All the above
e. None of the above


165


20. What two items are a good way to get started with RFID
before investing too much money?


a. Readers & Antennas
b. USB Reader & Sample Tags
c. Development Kits & Sample Tags
d. An Integrated Reader & Sample Tags


Answers: 1) F; 2) C; 3) A; 4) D; 5) F; 6) B; 7) C; 8) B;
9) A; 10) D; 11) A; 12) B; 13) D; 14) C; 15) C; 16) A;
17) C; 18) A; 19) D; 20) C


166


Deploying RFID: 20 Questions &
Answers


How do I know if RFID is right for my
application?


There are several steps required to answer this question.


1.) Deine the Business Problem


Before considering RFID as a potential solution, a company
should irst seek to understand its business problem. The
problem may be as simple as “I can’t ind my items when I
need them”; however, pinpointing the root of the problem
and considering all the various associated pain points is
a critical irst step. A well-deined problem leads to a welldeined solution, including any goals a company is looking to
achieve. Properly deined problems are easier to scope and
solve, which leads to saving time, money, and resources, and
allows for determining if RFID will be a necessary part of the
solution (or not).


2.) Complete Internal RFID Testing (or hire an RFID
expert to complete a site survey)


All facilities are different, especially when considering the


167


environmental factors which play an important role in the
success of an RFID system. Through individual testing or
consulting with an RFID expert to conduct a site survey, each
potential read zone in a facility should be examined in order
to determine:

- Which challenges exist that would never need to be
overcome if an RFID system were to be deployed?

- Which speciic types of readers, tags, and antennas would
be required in order to achieve a company’s goals?

- Which process changes (if any) would be required in
order to ensure RFID tags can successfully be read?


3.) Establish a Business Case (i.e. determine the
cost of an RFID solution and complete an ROI
assessment)

After deining the business problem to be solved, setting related
goals, and thorough testing or site survey analysis, a company
should have enough information in order to estimate how
much a system should roughly cost. Whether borne internally
or purchased externally from a third party, estimated costs
should cover all necessary hardware, software, installation,
and support, as well as any ancillary services that may be
required to get a system up and running (e.g. running network
and power drops, installing bollards to protect equipment,
etc.). Special attention should be paid to initial system setup
costs vs. potential on-going costs (e.g. consumable RFID tags,
annual support) when calculating all costs for an ROI analysis.
From there, a company should complete an ROI assessment,
effectively weighing the costs of implementing a system vs.
the expected return on investment (assuming the given system
will achieve the predeined goals).


4.) Determine Feasibility


There are two main reasons that RFID might not be suitable


168


for a speciic application:


1. **Application Feasibility** - from an environmental or pure
physics standpoint, it may not be possible to deploy an RFID
system that is able to capture RFID tags reads with enough
success to meet a company’s goals.


2. **Cost/ROI Feasibility** - RFID might work well for the
application, but the ROI isn’t signiicant enough to justify
implementation of the technology.


Is there a chance RFID won’t work for me?


Yes, RFID is not the answer for every application. The
application itself must be feasible from an environmental
perspective as well as a cost perspective. For example, if
there are temperature or pressure extremes that could destroy
RFID tags, or if an RFID system’s costs outweigh the value
added, then RFID shouldn’t be implemented. Ideally, such
aspects would be determined during the business deinition
and scoping process.


How much will an RFID system cost?


Because RFID systems can differ greatly in size from one
handheld reader and a few tags to hundreds of readers and
antennas and thousands of tags, there isn’t a particular cost
(or range of costs) that can be determined without some sort
of analysis. In order to get an estimate for a speciic system, it
is important to consider both near-term and long-term costs.

There are two different classiications of costs for just
about any RFID system – start-up (i.e. near-term) costs and
recurring (i.e. long-term) costs. Start-up costs can be deined
as the amount of money spent in order to get an RFID
system up and running and integrated with any other current


169


systems. Recurring costs are ongoing costs that are needed
in order to keep a system functional; these costs can recur
weekly, monthly, or yearly.


Some examples of start-up costs might include:


- RFID Hardware - Readers, antennas, cables, etc.

- RFID Tags - Reusable tags for ixed assets or tags for
one-time purchase

- Software - Custom development costs and/or initial
license cost

- Services - Installation and testing/tuning

- A few examples of recurring costs could include:

- Support Contract - For additional support for a deined
period of time for the system

- Software - Annual maintenance fees

- Consumable Supplies - RFID tags (if they can’t be
reused), printer ribbon, etc.)


Can I try RFID before investing in a full
system?


Yes, RFID development kits and RFID tag sample packs
are an ideal way to test RFID and see if it will work well
for a speciic application. Complete RFID solutions can be
expensive, so starting small and thoroughly testing is a best
practice before investing a lot of time or money.


Development kits include all the basic RFID equipment
needed in order to set-up and test an RFID system. Most
RFID development kits come with a reader, one or more
antennas, some sample tags, a sample program for reading,
encoding, and testing RFID tags, as well as access to the
reader’s SDK (i.e. software development kit –documentation,
API access, and code samples).


RFID tag sample packs provide a cost-effective way to test


170


different RFID tags and ind the ideal one for each application.
Testing multiple tag types and sizes is an important and
necessary task to ensure optimum performance from the
RFID system.


What do I need for a full system?


Most RFID systems consist of the same basic elements:


- Readers - An RFID reader is the “brain” of the RFID
system and necessary for any system to function. Readers,
also called interrogators, are devices that transmit and
receive radio waves in order to communicate with RFID
tags.

- Antennas - RFID Antennas are a necessary element in
any RFID system; however, they are “dumb devices”
which use power from the reader to generate an RF ield
allowing the reader to transmit and receive signals from
the RFID tags.

- Tags - An RFID tag, in its most simplistic form, is
comprised of two parts – an antenna for transmitting and
receiving signals, and an RFID chip (or integrated circuit)
which stores the tag’s ID and other information.

- Software - Software is essential to all RFID systems.
Software allows the reader to operate and communicate
with RFID tags, the data collected from tag reads to
shown, sent, stored, etc. so that users can make informed
decisions and take actions, or can trigger other systems to
take preprogrammed actions. Ultimately, software can be
as simple or complex as required by the application.


In addition to the basic elements, some systems may also
require ancillary devices, such as stack lights, motion sensors,
and other GPIO devices. The total amount of hardware and
software required will ultimately depend upon the system
requirements.


171


How do I choose my RFID hardware?

A large selection of RFID hardware is available and speciic
types of RFID equipment are better suited for certain
environments; so, choosing the right hardware for any given
application can be a tedious process. In any situation, once a
selection is made, rigorous testing is key to ensure success.


How do I choose my RFID tags?


There are hundreds of passive RFID tags on the market, so
choosing the right tag (or set of tags) for any given application
can seem like a daunting task. Similar to choosing RFID
hardware, selecting the right RFID tag can be accomplished
by narrowing down options using certain criteria. Once a set
of tags is selected, thorough testing is necessary to ensure
success.


Can I get RFID Tags pre-printed and
pre-encoded?


Yes, most RFID tags can be pre-printed and pre-encoded,
which saves a company time and money. Printing and encoding
RFID tags is a custom process and usually adds additional
lead time to an order.


What sort of software will I need for my RFID
system?

Few off-the-shelf (OTS) software packages speciically geared
towards RFID solutions are available for purchase. As the
market matures, more OTS software options will become
available for various RFID applications. Until then, most
companies will likely need a software solution customized to
meet their needs.


Custom software can be as simple or complex as the company


172


desires. In many cases, it makes sense to start small with the
basic necessary functionality, while architecting the software
to accommodate for future expansion of all desired features
and functionality. As the RFID application matures, so can
the software. This crawl-walk-run methodology allows a
company time to become familiar with the ins and outs of
its application and better determine exactly what features and
functionality will be of most use.


Can I setup an RFID system without
software?


In short, no. Even on a small scale, software must be
incorporated in some fashion. For example, basic functions
such as reading and writing tags will require software;
otherwise the reader will not know which tags to write, or
which tag reads to report to the system.


Software can be as simple or as complex as needed. As part
of the initial project scoping process, deining software
requirements should be one of the top priorities. Depending
on requirements, some commercially available off-the-shelf
software (such as the Impinj Speedway Connect Software)
may be all that is needed. Other times, the project may require
custom software development to meet all speciications.


Do I need a software engineer on staff?


Every company looking to implement RFID does not
necessarily need a software engineer on staff. If a company
has deined its business problem and successfully deined the
project scope (including software requirements), it can begin
to look into commercially available software options.


If requirements are not met by commercially available
software, utilizing a software engineer may be the next best


173


step. Whether allocating an existing internal resource or hiring
an outside resource, a company will need to employ a software
engineer (or engineers) to develop a custom software solution
for its RFID system.


Who installs the RFID system?


If the purchasing company has a technical team with RFID
experience (or, at least, superior technical abilities with the
time and ability to learn about RFID), that team should be
capable of testing and installing an RFID system. Without
suficient RFID experience or superior technical knowledge
and ability, there is a strong likelihood that an RFID system
could be setup incorrectly and not provide the desired results.

If a company isn’t 100% conident in its ability to provide
the necessary RFID implementation team, then that company
should partner with an RFID professional (or team of
professionals) in order to ensure the RFID installation is a
success.


Is there a recommended way to set up RFID
hardware and get started?

Because every facility is different, there isn’t a speciic way to
set up an RFID system and guarantee that it will provide the
desired results. A best practice when setting up each and every
read zone is to spend time testing and tuning until:
a.) 100% (or near 100%) of RFID tags are read when they
should be read.

b.) Stray reads are avoided (i.e. unintended tag reads from
another area being captured in the zone being tested).

Deining the ideal read zone for any given application is
dependent upon many factors including reader settings,
antenna gain, and RFID tag selection. Learn more by reading


174


about the 6 factors that affect read range.


Because even small changes in an environment can have
large effects on an RFID system, there is no guarantee that
a particular zone (once tuned) can simply be replicated
throughout a facility. Ideally, the settings for a well-tuned
read zone setup can act as a starting point from which each
additional read zone can be tested and tuned.


In short, no – there is no ideal recommended way to setup
RFID hardware. Each case is different and requires thorough
testing. Below are a few helpful tips when setting up an RFID
system for the irst time.

- Keep the RFID reader and antenna(s) as close as possible
in order to reduce the length of antenna cabled needed
and, thus, cut down on cable loss.

- When mounting RFID antennas, test different locations
and antenna angles in order to get the best results. Also,
testing different types of antennas may be beneicial.
During tag selection, do not simply settle for a tag that
works. Test different types in order to ind the ideal RFID
tag (or tags) for your application.

- Test different settings on the reader (e.g. transmit power,
search modes/sessions, etc.) in order to ensure best
results.


How many read zones are needed and where
will they be located?


In short, an RFID read zone should be located at every point
it is necessary to gather data (i.e. every point where reading
RFID tags is required).


In some cases, a portal-type setup at a dock door to read items
going in and out may be the appropriate solution; in another,
a single handheld RFID reader may be the best it in order


175


to scan items within an inventory closet. Moreover, installing
read zones at various stages of a manufacturing process
allows a user to know exactly where any given (tagged) item is
on the facility loor. Some companies may only be interested
in knowing if an item is in the facility. In these cases, read
zones would only be necessary at the facility’s entrances/exits.


Ultimately, the amount of read zones required and where those
zones should be located depends on the type of application
as well as the amount of data needed to achieve the desired
results.


There are items in my facility that contain
liquids/metals; does that mean RFID will not
work for me?


As with any RFID application, thorough testing is key. There
are certain methods and measures that can be put in place to
mitigate potential interference caused by metal and water (as
well as other interference causing elements).


If a company has limitations within the facility, environment,
or items being tagged, it should not discount RFID as the
solution entirely. Instead, limitations should be noted and
thorough testing should be executed in order to see if such
obstacles can be overcome using speciic equipment or
techniques. Each type of item to be tagged will have different
speciications that should be noted when choosing the ideal
tag. Some applications might require the use of several
different types of RFID tags in order to get the best results.


What if I want to use RFID in my facility for
more than one application? Should I have
separate RFID systems?


The answer ultimately depends on the business case at hand.


176


If it makes more sense (from a business perspective – data
access, user access, etc.) for the systems to be combined, then
they should be combined. If the business case dictates that the
systems should be separate or standalone, then they should be
separate. The answer to whether a new RFID system should
be combined with an existing one or a separate standalone
system should be created, should be determined during the
business problem deinition and scoping phase of the project.


How long does a typical RFID system take to
deploy?


The timeline for an RFID deployment can vary greatly based
upon the type and complexity of an RFID application. A
commercially available all-in-one RFID hardware and software
solution could potentially be purchased and deployed within a
few weeks. A custom RFID solution that addresses complex
business problems and requires much testing and custom
software development may take 6 to 12 months to fully deploy.


Below are the typical stages when deploying an RFID system:

- Deine the business problem

- Establish the Business Case
»
Project Scoping

      - Understand the potential and limitations of
RFID technology

      - Deine the project objectives

- Analysis of the Existing System
» Collect information
» Information analysis

- Develop a Project Road Map

- System Design
» Requirement analysis

   - Hardware/software selection


177


   - Develop a new process

- Proof of Concept
» Prototype Testing

      - Debug

      - System Adaptation

- Pilot Implementation

- Full Implementation
» System deployment
» Training

- Continuous Improvement
» Monitoring
» Collect feedback from users


How do I train my employees on RFID?


If a company decides to implement RFID within a facility, key
employees should be trained on the basics of RFID – what it
is, how it works, key limitations, etc. In addition, one or two
persons should be designated as RFID “experts” and receive
more in-depth training on RFID, such as classes offered by
3rd party companies.

The more employees are educated about RFID (and, in
particular, the actual system being deployed), the more
effective the system will be and a company should see fewer
issues and errors.

When will I see a return on investment from my RFID system?


The amount of time between purchasing an RFID system
and seeing a return on investment (ROI) will be different for
each company and application. Ideally, a company will have
already completed a feasibility analysis and ROI assessment
before deciding to install an RFID system.


Depending on the value the system provides, a company may
start seeing an ROI immediately. Full system payback depends


178


on the cost of the system as well as the rate of return on
investment; however, properly implemented RFID systems
tend to fully pay back within 1 to 3 years.


Where can I learn more about RFID?


There are a few RFID books on the market that can be
purchased in order to gain a better understanding of how
RFID works. Additionally, there are multiple sources online
dedicated to helping customers learn more about RFID:

- RFIDjournal.com - RFID Journal is a news website
covering companies and applications around the world
deploying RFID.


- RFIDinsider Blog - A go-to blog on all things RFID,
specializing in news and knowledge for the beginner,
intermediate, and advanced RFID enthusiasts.


- RFID Resources - An atlasRFIDstore webpage dedicated
to eBooks, customer proiles, and videos for enhancing
RFID knowledge.

- RFID Videos - atlasRFIDstore’s YouTube page containing
videos about how RFID works, RFID products, and
tutorials.


179


Deploying RFID Worksheet


1. What are the two main reasons that RFID would not be
suitable for an application?


a. Application Feasibility
b. Read Range Feasibility
c. Integration Feasibility
d. Cost/ROI Feasibility
e. A & D
f. A & B
g. A & C


2. Which of the following is not an example of a Start-Up
Cost?


a. RFID Hardware
b. Software
c. RFID Tags
d. Support Contracts


3. Which of the following is not an example of a Recurring
Cost?


a. RFID Hardware
b. Software Licenses
c. Support Contracts
d. Consumable Supplies


4. True or False. RFID tags, like inlays and labels, can be
pre-printed and encoded for my application.


5. True or False. RFID systems can be setup without
software.


180


6. Where are the best places for RFID Read Zones within
an application?


a. At every entrance and exit
b. At every point it is necessary to gather data
c. At every 20 to 30 feet, dependent on read range
d. It depends on the square footage of your warehouse


7. If the items you wish to tag have an element that is
typically not RFID friendly, should you move on to a
different technology/system?


a. Yes, RFID will not be possible
b. Yes, RFID will cost too much and take too much
time
c. Yes, RFID hasn’t come far enough to mitigate this
problem.
d. No, RFID is evolving and metal mount tags and tags
for tagging liquid-illed items are now offered - test
RFID or speak to an RFID expert before moving
on.


8. True or False. In general, a DIY RFID system can be
fully deployed relatively quickly, only in a few weeks.


9. True or False. The more educated employees are on an
RFID system, the more effective the system will be.


Answers: 1) E; 2) D; 3) A; 4) True; 5) False; 6)
B; 7) D; 8) False; 9) True;


181


We’re atlasRFIDstore

atlasRFIDstore was founded in 2008. We started out as one
person with a vision, and today our team numbers just over
35 talented individuals. We began life as part of a startup
in Birmingham, Alabama’s burgeoning tech scene, and
we’re proud to remain and participate in the revitalization of
Downtown Birmingham.


Over a Decade in the RFID Industry

It probably comes as no surprise to you, but we’re big believers
in RFID. We’ve been fortunate to ride the wave of RFID’s
success and adoption across a number of industries. In that
success, we see a lot of responsibility. We need to be good,
honest ambassadors of RFID, which means we need to be
experts in our ield. Come to us with your questions, and
we’ll provide you with answers.


We care about one thing: Our Partners (That’s You).

We’ve built our business around one core tenet, and that’s
providing a superior customer experience. It doesn’t mean
we’re perfect 100% of the time, but we’ll always take care of
you. We take a lot of pride in helping both small businesses
and huge, multi-national organizations alike. Our efforts go
toward making sure your projects are as successful as possible.


We’re here to serve.

We try to be as accessible as possible, so you can contact us
via phone, email, or chat. We’re typically in ofice during
standard business hours (Birmingham is in the North
American Central Time Zone). Even if we’re not online or in
ofice, drop us an email, and we’ll respond within a business
day.


**Phone:** +1 (205) 383-2244
**Email:** info@atlasRFIDstore.com
**Website:** www.atlasRFIDstore.com


Learn more about RFID
and Other Topics


Download free guides and
worksheets at

ridatl.as/rid-book


Interested in regular updates about
RFID and other IoT technologies?


Subscribe to RFID Insider, a weekly blog, at
ridatl.as/insider


Would you like to speak with an RFID
expert for free?


Speak to an RFID consultant at
ridatl.as/consult


