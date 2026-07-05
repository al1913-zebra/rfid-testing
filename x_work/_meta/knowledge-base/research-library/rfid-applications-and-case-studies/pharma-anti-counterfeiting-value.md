# **130**

### **What are Authentic Pharmaceuticals Worth?**

Matthieu Schapranow, Jürgen Müller, Martin Lorenz,
Alexander Zeier and Hasso Plattner
_Hasso Plattner Institute, Enterprise Platform and Integration_
_Concepts Chair, Potsdam_
_Germany_


**1. Introduction**


Radio Frequency Identification (RFID) technology is named as a possible basis for future
anti-counterfeiting by providing enhancements of existing business processes [Choi & Poon
(2008)]. Hereby, the use of unique Electronic Product Codes (EPCs) [EPCglobal Inc. (2010)]
for identification improves processing times during goods receipt and enables automated
product tracking and tracing. The EPC is used to refer to a concrete item instance in a software
system. For example, it identifies a concrete bottle of analgesic that was manufactured
on May. 01, 2011 at 07:03 a.m. In contrast, currently used barcodes identify a class of
pharmaceuticals, e.g. all analgesics of a certain manufacturer. RFID technology shows
prevailing advantages in contrast to barcodes, RFID tags can be read without establishing
a direct line of sight, multiple tags can be read simultaneously, and they can cope with dirty
environments [Stiehler & Wichmann (2005); White et al. (2007)].
In the following, we refer to an RFID-aided supply chain when dealing with an supply
chain solution that build on good’s tracking and tracing functionality by integrating RFID
technology [Schapranow et al. (2009)]. In context of the pharmaceutical supply chain, the
integration of tracking functionality is widely considered, e.g. two-dimensional data matrix
or RFID technology, since this specific industry is confronted with increasing counterfeit
rates [European Commission Taxation and Customs Union (2009)]. However, advantages of
using RFID technology only apply when all participants of the supply chain seamlessly
integrate tracking solutions based on it.
Fig. 1 models components within an RFID-enabled company to support anti-counterfeiting
using the Fundamental Modeling Concepts (FMC) [Knöpfel et al. (2005)]. These components
can be established to track and trace goods on item level without media breaks. Since the
depicted architecture switch is connected with high monetary investments, costs have to be
accommodated by all participants of the supply chain [Schapranow, Nagora & Zeier (2010)].
Different levels of technology acceptance to transform towards an RFID-enabled company
can result in exclusion of participants from the supply chain. We expect especially Small
and Mid-sized Enterprises (SMEs) to be confronted with financial barriers to participate
in global RFID-aided supply chains [Müller, Faust, Schwalb, Schapranow, Zeier & Plattner
(2009)]. However, a gap-less integration of RFID technology at all supply chain participant
sites is the basis for consistent tracking and tracing on item level in real time.


www.intechopen.com


2204 Designing and Deploying RFID ApplicationsRFID / Book 2









|Supply Chain<br>Participant<br>R<br>Anti- R<br>Discovery<br>Counterfeiting<br>Service<br>Service Provider<br>R<br>EPCIS<br>EPCIS Repository<br>R<br>Business<br>RFID Systems<br>Middleware (e.g. ERP, OLTP,<br>OLAP, etc.)<br>RR eaea dd erer Ttaagg<br>RFID-enabled Company|Col2|
|---|---|
|RFID-enabled Company<br>RFID<br>Middleware<br>EPCIS<br>EPCIS<br>Repository<br>Reader<br>Reader<br>tag<br>Tag<br>R<br>Business<br>Systems<br>(e.g. ERP, OLTP,<br>OLAP, etc.)|RFID-enabled Company<br>RFID<br>Middleware<br>EPCIS<br>EPCIS<br>Repository<br>Reader<br>Reader<br>tag<br>Tag<br>R<br>Business<br>Systems<br>(e.g. ERP, OLTP,<br>OLAP, etc.)|
|RFID-enabled Company<br>RFID<br>Middleware<br>EPCIS<br>EPCIS<br>Repository<br>Reader<br>Reader<br>tag<br>Tag<br>R<br>Business<br>Systems<br>(e.g. ERP, OLTP,<br>OLAP, etc.)||


|Col1|Col2|
|---|---|
||Reader<br>Reader|


Fig. 1. FMC Block Diagram: Anti-counterfeiting Components of RFID-enabled Companies


We contribute by sharing our research results for enabling an integer RFID-aided supply
chain. We focus on the business perspective and present concrete costs for RFID-enablement
of supply chain participants and for operating a dedicated architecture for anti-counterfeiting.
Our research activities are motivated by concrete requirements of the pharmaceutical industry.
We present operating models to establish an RFID-aided supply chain while keeping initial
infrastructure investments for involved supply chain parties at a moderate level. We discuss
approaches for on-premise and on-demand operating models sharing hardware and software
resources for cost-saving reasons. We identify cost-drivers for the proposed operating models,
discuss cost-saving potentials, and define the amortization by product surcharges.
In the rest of our work we do not focus on how RFID technology may help to improve current
pharmaceutical business processes, such as drug prescription, controlling of medication,
or observation of patients. Instead, we stress on necessary adaptations to perform the
transformation towards an RFID-aided supply chain. It is the key-enabler to observe product
flows and to detect counterfeits by systematically analyzing the recorded movement of goods.
The rest of our contribution is structured as follows: Sect. 2 presents counterfeit challenges
of the pharmaceutical industry from which we draw the motivation of our work. We define
supply chain roles and their tasks within an RFID-aided supply chain to support automated


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 2053


anti-counterfeiting in Sect. 3. In Sect. 4 we perform a quantitative analysis of initial and
operational investments for transforming towards an RFID-aided supply chain. Our work
concludes in Sect. 5 by summarizing our finding and providing an outlook towards possible
payment models.


**2. Challenges in pharmaceutical supply chains**


RFID technology is nowadays named to be the successor of existing tracking techniques
such as scanning of one-dimensional barcodes [White et al. (2007)]. Making use of RFID
tags results in various advantages. Tags can be read without establishing a direct line of
sight, multiple tags can be read simultaneously, and they can cope with dirty environments.
The logistics sector is currently one of the first implementers to guarantee traceability of
fast-moving goods, e.g. life-saving pharmaceuticals, blood preservations, or organ donations.
Tracking goods is an important factor for participants in global supply chains, i.e. RFID
technology helps to keep goods moving on the road instead of keeping them in costly
stocks [Schlitter et al. (2007)]. Compared to existing semi-automatic solution, e.g. scanning
of barcodes, the implementation of RFID technology reduces time to process incoming
and outgoing goods at all involved intermediate stations by enabling automatic product
identification [Bovenschulte et al. (2007)].
Pharmaceutical counterfeits introduce the risk of harming human-beings, e.g. when applying
wrong doses, invalid or missing active ingredients or poison combinations for people
with certain risks [Bos (2009)]. In the context of global pandemic infections, such as
pandemic influenza type H1N1 in 2009 or H5N1 in 2008, the impacts of counterfeits become
visible [World Health Organization (2009)]. Illicit drug use is a major problem in the U.S. for
years, e.g. approx. 20 million people used illicit drugs in 2007 and more than every fifth person
between 18 and 20 contributed to this statistics [Barthwell et al. (2009)]. These drug-abusing
people order prescription-based pharmaceuticals via the Internet without having a valid
prescription of consulting a doctor. In case the expected medical effect does not occur,
therapies are hard to develop, because pharmaceutical ingredients cannot be traced to an
authentic manufacturer.
In terms of intellectual rights and property management new aspects of product tracking such
as counterfeit detection become relevant. Upcoming regulations will force manufacturers,
retailers, and pharmaceutical business partners to be reliable for products showing their
company logo or involvement. Tracking of their products through the entire supply chain
becomes necessary. A reliable tracking mechanism is the first step in fighting counterfeits
of pharmaceutical products. Studies show that expensive products, such as cancer fighting
drugs and drugs for AIDS therapies, suffer from product counterfeits with increasing rates.
But also generic products are increasingly subject to plagiarism.
Pfizer reported experiences with RFID-based implementations to guarantee authenticity of its
Viagra pills already in 2006 [U.S. Pharmaceuticals Pfizer Inc. (2006)]. These activities indicate
ambitions of pharmaceutical manufacturers to validate the use of RFID technology as a
possible way to protect their products.
Product counterfeits arrive in the United States (U.S.) of America and the European Union
(EU) with steady increasing rates. A high level of integrity in the supply chain is the basis for
reliable product tracking to reduce the amount of counterfeit cases. In the following, insights
about the current pharmaceutical market situation in the European Union and the United


www.intechopen.com


4206 Designing and Deploying RFID ApplicationsRFID / Book 2


States are presented. They support the motivation to design innovative RFID implementations
focusing on security aspects to be an integral aspect.


**2.1 Threats in European** **Union**
The EU consists of 27 member states since it has been extended lately in 2007 and the
youngest member states Bulgaria and Romania joined. Its population covers approx.
500 million citizens, which is approx. 7.5 percent of the world’s population. Yearly,
approx. 30 billion packages of pharmaceuticals are manufactured for the entire European
market [Müller, Pöpke, Urbat, Zeier & Plattner (2009)].
In 2007, a total of 43,671 reported counterfeit cases with approx. 80 million involved articles
were reported. In contrast to 2007, a total of 49,381 counterfeit cases, i.e. an increase of 13
percent, with approx. 180 million involved articles, i.e. an increase of 125 percent, were
reported in 2008 (European Commission Taxation and Customs Union). A fraction of 6.5
percent of all reported cases and approx. five percent of all articles were associated with
the pharmaceutical sector. The European Commission reports an increase of 118 percent for
pharmaceutical counterfeits detected at EU borders in 2008 compared to 2007. In addition
to the categories CDs/DVDs and cigarettes, the pharmaceutical sector holds the third place
according to growth rates of intercepted articles.
To stress the increase of detected pharmaceutical counterfeits, we provide the following quote:


In a two-month period, more than 34 million tablets were seized, including fake
antibiotics, anti-cancer, anti-malaria and anti-cholesterol medicines, painkillers and
erectile dysfunction medication. [IP Crime Group (2008)]


The aforementioned quote underlines that by a single joined operation more than 30 million
pharmaceutical counterfeits were detected at the borders of the EU. More than 90 percent of
intercepted articles are suspicious in terms of trademark infringement. More than 50 percent
of all articles were intercepted during import procedures, whereas most articles were detected
in air transportation. The category of life-style drugs is reported to be number one regarding
detected counterfeits [IP Crime Group (2008)].
India is named as the top source of counterfeit pharmaceutical products contributing more
than 50 percent of all detected articles [Shukla & Sangal (2009)]. This development is constant
for years. The example of India shows that counterfeiters in countries with low law regulation
benefit from pandemic diseases, such as influenza H1N1 in 2009, because consumers buy
medicines preventively via the Internet [World Health Organization (2009)].


**2.2 Threats in the United States**
The United States Federal Food and Drug Administration (FDA) detected more than 21
counterfeit cases between 2001 and 2003 [Food and Drug Administration (2004)]; in 2004 this
number almost tripled with 58 confirmed cases [Food and Drug Administration (2005)]. In
contrast to this development, in the years 1997 to 2000 the number of detected counterfeits
did not exceed six per year. This outlines two aspects. On the one hand, the number of
pharmaceutical counterfeits increases. On the other hand, counterfeit detection methods are
continuously improved and former undetected counterfeits can be detected meanwhile.
An estimated number of 7,000 deaths are connected with counterfeit medicines in the United
States per year [Jenkins et al. (2007)]. Health damages result in legal consequences for the
manufacturer and loss of the company’s reputation. To emphasize potential monetary impact,


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 2075













Fig. 2. FMC Block Diagram: Roles in the Pharmaceutical Supply Chain


Merck’s medical vioxx evoked human damages and five billion USD were paid to avoid a
lawsuit [Merck & Co. Inc. (2007)].
In 2004, it was estimated that more than 500 billion USD were traded in counterfeits, i.e. seven
percent of the world trade in the same period [ICC Policy Statement (2004)]. It is stated,
that this equals an increase of 150 billion USD in comparison to 2001 while the worldwide
merchandise trade increased by approx. 50 billion USD in the same time, i.e. only one third
of the increase traded in counterfeits [Staake et al. (2005)].
At this point, it is important to highlight that estimations about the monetary impact of
counterfeits vary drastically. This fact underlines that only a small number of counterfeits can
be detected nowadays and that the number of unreported cases is hard to derive. Technical
improvements in counterfeit detection and goods protection help to increase the amount of
detected cases by implementing new barriers to entrance counterfeits into large markets.


www.intechopen.com


6208 Designing and Deploying RFID ApplicationsRFID / Book 2


**2.3 Sizing details for an RFID-aided** **pharmaceutical** **supply chain**
The given case studies for the pharmaceutical industry in the U.S. and the EU highlight
potential risks introduced by counterfeits and the need for active product protection. A
high level of supply chain integrity is the basis for reliable product tracking and to support
anti-counterfeiting. In the following, we focus on the European pharmaceutical supply chain,
whereas similar conclusions can be drawn for the U.S. market. The European pharmaceutical
supply chain consists of approx. 2,200 pharmaceutical manufacturers, 50,000 wholesalers,
and 140,000 retailers [Müller, Pöpke, Urbat, Zeier & Plattner (2009)]. Every supply chain
participant stores events _e_ [˚] capturing the Electronic Product Code (EPC) [EPCglobal Inc.
(2010)] of a certain item in an EPC Information Services (EPCIS) repository [EPCglobal Inc.
(2007)] for all manufactured and processed goods.
A total amount of more than 30 billion pharmaceutical goods is manufactured in the
pharmaceutical supply chain for the EU on yearly basis, whereas the half of them is available
on prescription [Müller, Pöpke, Urbat, Zeier & Plattner (2009)]. As a result, we can derive
an average daily production/handling rate of approx. 37,879 pharmaceutical goods that are
produced per manufacturer, approx. 1,667 goods are handled per wholesaler, and approx. 595
goods are handled per retailers in the European pharmaceutical supply chain. To determine a
lower threshold for the expected amount of captured EPC events for 30 billion pharmaceutical
goods, we assume a minimal supply chain consisting of a pharmaceutical manufacturer with
360 production days per year and 24/7 manufacturing line, two wholesalers, a single retailer,
and a customer. The manufacturer will capture at least a production and a shipping event for
a certain pharmaceutical good. Both wholesalers will capture one event for goods receipt
and goods shipment and two events that observe product movements within their stock
locations. The retailer will capture a goods receipt event and a selling event, e.g. when a
customer buys a medicine in the pharmacy. The customer will invoke an anti-counterfeiting
check just in the pharmacy before buying the product, which results in a single check event.
Ultimately, it sums up to eleven relevant captured EPC events distributed across the supply
chain. As a result, a lower threshold of approx. 10,610 captured relevant events per second
need to be expected across the entire global supply chain, each with an average size of 182
bytes [Schapranow, Müller, Zeier & Plattner (2010)].
A FMC model depicting the RFID-aided supply chain of the pharmaceutical industry is
drawn in Fig. 2. It contains supply chain roles A to E and the involvement of a dedicated
service provider for anti-counterfeiting. The service provider accesses individual EPCIS
repositories of supply chain participants that are involved in handling a certain good to
derive its virtual product history [Schapranow, Müller, Zeier & Plattner (2010)]. We agree
that reliable product tracking and tracing across the entire supply chain can be implemented
using RFID [Bundesverband Informationswirtschaft, Telekommunikation und neue Medien
(2005)], but this technology is not designed to be immunized against threats, such as cloning,
spoofing or eavesdropping [Schapranow et al. (2009)]. It is very important that customer
profiles cannot be derived, because besides customers’ privacy the entire supply chain would
become vulnerable.
We agree that reliable product tracking and tracing across the entire supply chain can
be implemented with the help of RFID solutions and open interfaces for supply chain
participants [Bundesverband Informationswirtschaft, Telekommunikation und neue Medien
(2005)]. However, RFID was not designed for secured data exchange of confidential details.


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 2097


Hence, security threats exist, e.g. the possibility of cloning, spoofing or eavesdropping
of tag reader communication to inject counterfeits [Schapranow et al. (2009)]. Possible
measures against threats, e.g. mutual authentication, may reduce the probability for a certain
threat [Schapranow, Zeier & Plattner (2010)].
We want to support the usage of RFID by introducing reliable IT infrastructure components
that help to identify counterfeits by analyzing available event data, e.g. analysis of the goods
path through the supply chain, suspicious ordering of actions, and semantic errors. We
consider customer’s privacy worthy of protection. From our perspective, customer profiling
by combining checkout data with captured event data must be prevented to increase the
acceptance of this anti-counterfeiting technique.
On the one hand, the presented scenario of the pharmaceutical industry underlines the
need for reliable anti-counterfeiting mechanisms to prevent counterfeit injection. On the
other hand, the pharmaceutical industry suffers from privacy concerns of end consumers
while implementing RFID technology for tracking and tracing [Schapranow et al. (2009)].
We focus on the pharmaceutical industry in the following to support the fast adoption of
RFID technology. We agree that this technology can contribute to establish an integer global
pharmaceutical supply chain by establishing a permanent product trace. However, automated
anti-counterfeiting is only feasible for expensive pharmaceuticals unless costs for RFID tags
and components exceed an empiric threshold of less than about ten percent of the product’s
retail price.


**3. Impacts of anti-counterfeiting** **for supply chain participants**


The following section outlines our considerations for an anti-counterfeiting architecture based
on location-based event data. The heart of the architecture builds a dedicated service provider
for anti-counterfeiting as depicted in Fig. 1. It performs checks on event data for a given
pharmaceutical good that is uniquely identified by its EPC. Furthermore, the service provider
protects the privacy of inquirers and supply chain participants that handled a certain product
as a kind of facade. On the one hand, queries are not directly sent to supply chain participants,
i.e. the service provider prevents derivation of business relationships. On the other hand,
supply chain participants cannot derive good’s holder identity, e.g. to trace the good’s
complete path in the supply chain once it left the manufacturer.
Fig. 2 depicts the flow of data between roles involved in an RFID-aided supply chain to
support anti-counterfeiting. Supply chain roles are described in further detail in subsequent
sections focusing their business activities as participant of an RFID-aided supply chain.


**3.1 Role A: Manufacturer**
The manufacturer role consists of two separated tasks: product assembly and product
creation. In terms of the product assembly it acts as an end consumer, i.e. consuming partly
assembled products and removing them from the supply chain.
The task product creation is responsible to bring products alive. In this context the task
of the manufacturer involves the creation of the product’s meta data representation for the
RFID-aided supply chain, which is covered by the following tasks.
The following steps are only required once a new product is created and can be considered as
optionally if partially assembled product are consumed by the manufacturer.


www.intechopen.com


8210 Designing and Deploying RFID ApplicationsRFID / Book 2


1. Equip the product with a proper RFID tag to create the handling unit, i.e. the physical
connection between the product and its tag. A handling unit can also be a transportation
unit, such as a box or a container that groups multiple goods together.


2. Determine next available unique EPC for the created product. Therefore, the EPCIS
repository of the manufacturer needs to be contacted.


3. Initialize the RFID with RFID-specific data, i.e. mandatory data, e.g. EPC, and optional
data, e.g. authentication data.


4. Establish the virtual product history for the certain good by storing the creation event in
the manufacturer’s event repository.


Continue the business process on the manufacturer’s site and capture events where the
product’s handling unit is involved. The following task is required for all kinds of products.


5. Capture all events defining the path at manufacturer’s locations.


**3.2 Role B: Wholesaler**
The wholesaler’s receives goods from various manufacturers, disassembles the handling units
partially and reassembles them to new more specific handling units for certain retailers, such
as hospitals or pharmacy chains.
The following tasks are required to contribute to the virtual product history.


1. Capture the goods receipt event.


2. Capture goods movement events within local storage, e.g. unpacking or new placing. All
events are stored in the local event repository.


3. Equally to goods receipt processing the goods shipment is performed and. Corresponding
captured events are stored in the local event repository.


**3.3 Role C: Retailer**
The retailer receives goods packed in so-called handling units, e.g. boxes or pallets. The
latter are delivered by logistics provider from manufacturers, other retailers or wholesalers.
Retailers use their local or more often a hosted event repository for storing captured events.
The latter is available on subscription basis [Müller, Schapranow, Helmich, Enderlein & Zeier
(2009)]. The retailer’s task is to separate goods and sell them either to end consumers or to
other retailers. When a product is sold to the end consumer the product history typically ends
with the deactivation of the RFID tag at the point of sales [Schapranow et al. (2009)].


1. Receive handling unit and capture the goods receipt.


2. Unpack received handling unit recursively and process all contained goods individually,
i.e. store events for all goods in the local event repository.


3. Capture the shipping event at the point of sales.


**3.4 Role D: End consumer**
The supply chain role end consumer occurs only once for a product and defines its sink. The
end consumer in terms of the RFID-aided supply chain performs no additional tasks. In case
of recall actions or warranty services, details about the product’s path in the supply chain can
be used to detect further cases. However, due to customer privacy concerns, we propose to
deactivate tags after the end consumer passes the point of sales [Schapranow et al. (2009)].


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 2119


**3.5 Role E: Service provider**
The service provider performs specific tasks not performed by other supply chain roles. It
is responsible for counterfeit detection, e.g. by performing plausibility checks on the virtual
product history with the help of the EPC of a certain product.
The service provider is provided by a trusted third party and can be contacted by any supply
chain participant. It needs to contact the distributed discovery service to identify supply
chain parties involved in handling a certain item [Müller et al. (2010)]. This requires a set
of subsequent queries to retrieve event data from event repositories of involved parties. The
service provider retrieves all event data via the discovery service and aggregates them to
materialize the virtual product history [Schapranow, Müller, Zeier & Plattner (2010)].
In case of counterfeit detection the service provider returns the value _counter f eit_ and the
product is removed from the supply chain for further investigations.
If the virtual product history is evaluated to be valid _authentic_ is returned. If the outcome of
the counterfeit detection cannot be derived automatically, e.g. in case of network partitioning
or temporary failures, _unknown_ will be returned to indicate the need for manual processing.
We define a function _servicecounter f eit_ in Equation 1 performing checks with the help of a given
_epci_ . It returns either one of the results authentic _a_, counterfeit _c_, or unknown _u_ .


_servicecounter f eit_ : _epci_ ÞÑ p _epci_, t _a_, _c_, _u_ uq (1)


**3.6 Role F: Logistics provider**
Logistics providers are responsible for transportation of handling units, i.e. moving them
from a location to another location. On the route various intermediate locations are passed
while the transportation is performed in a certain transportation time.
The logistics provider exposes details for transported goods, which involves capturing events
at the start and end location of the transport. If the logistics provider additionally exposes
details about intermediate locations, we refer to it as a logistics provider with real-time
tracking capabilities [Zeier et al. (2008)]. A logistics provider in context of an RFID-aided
supply chain performs the following tasks.


1. Capture all events at intermediate locations characterizing the path of a good in this part
of the supply chain.


**4. Quantitative analysis of EPC networks**


After having discussed qualitative requirements in the prior section, we focus on quantitative
considerations for supply chains based on RFID technology in the following. We present
in detail the service provider for anti-counterfeiting and its impact on operative costs. A
dedicated service provider performing anti-counterfeiting checks is anticipated. It provides a
unified way for each supply chain participant to check authenticity of pharmaceutical goods
based on their EPCs stored on RFID tags. From our perspective, an independent party
should provide this service, which is not part of the pharmaceutical supply chain in order to
guarantee trust for all participants. The operation of the service provider implies additional
costs, i.e. surcharges for handled pharmaceuticals have to be considered. We present a model
to identify costs by involving the amount of data transferred via the communication network.


www.intechopen.com


10212 Designing and Deploying RFID ApplicationsRFID / Book 2


200000



180000


160000


140000


120000


100000


80000


60000


40000


20000


0




|Col1|Col2|
|---|---|
|||
|||









Fig. 3. Comparison of Costs for RFID-enablement per Supply Chain Role


Additionally, we compare the two operating models on-premise and on-demand for required
RFID infrastructure components within participating companies.


**4.1 Cost** **drivers for RFID-enablement** **in companies**
For RFID-enablement of companies an initial monetary investment is required depending
on the company’s role within the supply chain. For example, a manufacturer requires both
RFID reading and writing devices being capable to initialize RFID tags when new products
are produced. In contrast, a retailer only needs to be equipped with RFID reading devices.
Detailed results of our research for concrete costs are given in Sect. 6.
The initial investments for RFID-enablement are visualized in Fig. 3. It highlights the potential
cost savings during enablement phase by using an on-demand operating model due to the
reduced setup and implementation costs. In addition, it shows that costs for hardware
components remain almost constant since this is required on-site equipment, e.g. RFID reader
and writer devices. Tab. 1 contains the detailed criteria for comparison of investments for
an on-premise solution with investments for a comparable on-demand solution. We divide
costs accordingly to individual supply chain roles and categorize them using the following
criteria [Schapranow, Nagora & Zeier (2010)].


- **Hardware** describes required investments associated with infrastructure components for
establishing an RFID-aided supply chain, e.g. servers, RFID writing and reading devices,
network components, etc.


- **Software** describes required investments for software operating the hardware, especially
required licenses.


- **EPC Fees** describes required investments to operate as provider for certain EPC intervals,
e.g. license fees for GS1 [GS1 Germany GmbH (2010)].


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 21311


**Costs** **A: Manufacturer** **B: Wholesaler** **C: Retailer**

**[EUR]** **I** **II** **I** **II** **I** **II**
**Hardware** 28,906 17,988 15,339 9,880 7,929 2,470
RFID writers 3,526 3x     -     RFID readers 913 6x 8x 2x
Antennas 161 12x 16x 4x
Workstations 3,261 2x     - 1x     - 1x     Servers 1,898 2x     - 1x     - 1x     Routers 300 2x     - 1x     - 1x     **Software** 908 6x    - 4x    - 2x    **EPC Fees** 2,650 1x 1x 1x
**Implementation** 400 400x 10x 350x 5x 250x 5x
**Total [EUR]** 197,004 24,638 161,621 14,530 112,395 7,120


Table 1. Cost Distribution per Supply Chain Role: On-premise (I), On-demand (II)


- **Implementation** describes required investments for setting up the RFID infrastructure, e.g.
costs for consulting, configuration of software and hardware respectively, implementation
tasks, etc.


**4.2 Role A: Manufacturer**
Tab. 1 shows, that implementation costs contribute by approx. 80 percent to the total costs for
supply chain role manufacturer, followed by hard- and software costs with approx. 15 percent.
Applying a Software-as-a-Service (SaaS) solution results in reduction of costs for hard- and
software components, such as workstations, servers, routers, and special software licenses,
which have no longer to be paid by the manufacturer. Furthermore, the implementation
effort for an on-demand solution is reduced since the configuration of existing hardware
devices with the manufacturer, e.g. RFID reading and writing devices, is only required on-site.
Although these on-site devices are required in a SaaS solution to scan items or write tags, they
are reconfigured in a SaaS solution to transmit all incoming data directly to the on-demand
solution hosted in the provider’s cloud and to receive data from it.
Ultimately, this reduces initial investments for a SaaS solution by approx. 87 percent
compared to an on-premise solution for the supply chain role manufacturer. Nevertheless,
we expect that the SaaS approach to be uninteresting for manufacturers, because of related
monthly rates for the on-demand solution. From our perspective, especially the manufacturer
will benefit from an on-premise solution, because of the bulk amount of manufactured
products per year, which need to be processed. Besides, the manufacturer typically owns
a complex IT infrastructure consisting of enterprise applications, which have to be operated
independently from participating in an RFID-aided supply chain. Its IT landscape consists
of various enterprise systems, such as enterprise resource planning or customer relationship
management systems, which are already administered by trained personnel. Thus, an initial
investment with lower monthly fees will be more attractive for manufacturers.


**4.3 Role B: Wholesaler**
The effort of implementing RFID technology at the wholesaler’s site when applying an SaaS
solution equals less than 1.5 percent of the implementation costs required for an on-premise


www.intechopen.com


12214 Designing and Deploying RFID ApplicationsRFID / Book 2


solution as given in Tab. 1. By eliminating the need for huge on-site hardware investments in
combination with the lower required administration effort, a SaaS solution helps to save more
than 90 percent of the initial investment for the supply chain role wholesaler.
We believe, wholesalers will adopt a SaaS solution, because they primarily belong to the
category of SMEs that these business models address. We expect the savings for initial
investments also to be reflected by monthly saving, since the ratio of manufacturers and
wholesalers in the European pharmaceutical supply chain is approx. 1:25. In other words,
there are 25-times more wholesalers than manufacturers, which also reflect the amount of
handled items.


**4.4 Role C: Retailer**
Comparable saving potentials exist for the supply chain role retailer. Approx. 93 percent
of the implementation costs required for an on-premise solution can be saved when using
an on-demand solution as shown in Tab. 1. Adding the savings introduced by eliminating
investments for local hardware and the reduced on-site implementation effort, the total saving
of initial investments are approx. 93 percent for the supply chain role retailer. This supply
chain role belongs especially to the SMEs within the pharmaceutical supply chain, which
are addressed by a SaaS solution. From our perspective, we expect monthly savings for a
SaaS solution to be comparable to the savings for the initial investments, since the ratio of
wholesalers and retailers in the European pharmaceutical supply chain is approx. 1:3.


**4.5 Cost** **evaluation**
Leveraging on-demand solutions reduces required implementation costs of a comprehensive
and expensive on-premise solution. We compared the setup costs per supply chain role
within the pharmaceutical supply chain between an on-premise and an on-demand solution.
Independent from the role within the supply chain, costs savings for the initial investments
of 80 percent and more can be achieved when applying an on-demand solution. Although
the operation of an on-demand solution will be connected with monthly operational fees, we
believe that the presented reduction for initial investments are the key enabler to increase the
acceptance of RFID technology and supports SMEs to participate in RFID-aided supply chains
without huge financial hurdles.


**4.6 Amortization period**
In the following, we derive required product surcharges to redeem initial investments for
RFID-enablement in the European pharmaceutical supply chain. Let _p_ “ 30 billion products
describe the annual manufacturing rate of pharmaceuticals available on-prescription, _r_
describe the supply chain role, and _xr_ as defined in Equation 2. We assumed _a_ “ 5 years
to describe the amortization period for all initial investments _sr_ .


_xr_ “ _[s][r]_ [ ¨ |] _[r]_ [|] (2)

_a_ ¨ _p_


Tab. 2 compares the required surcharges per product and role for an on-demand and an
on-premise setup [Schapranow, Nagora & Zeier (2010)].
Based on the configuration of the supply chain as given in Sect. 4 the following total costs
arise. Applying a SaaS solution for all roles of the pharmaceutical supply chain will result in


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 21513


**On-demand** **On-premise**
**Supply Chain Role** | _r_ | _xr_ **[EUR]** _xr_ **[EUR]**


**Manufacturer** 2, 200 0.0004 0.0029
**Wholesaler** 50, 000 0.0048 0.0539
**Retailer** 140, 000 0.0066 0.1049


Table 2. Product Surcharges per Supply Chain Role for Amortization, a=5 years


a very low surcharge per item of


0.0004 _EUR_ ` 2 ˚ 0.0048 _EUR_ ` 0.0066 _EUR_ “ 0.0166 _EUR_ .


In comparison, an RFID-aided supply chain built on a purely on-premise solution requires a
surcharge per item of


0.0029 _EUR_ ` 2 ˚ 0.0539 _EUR_ ` 0.1049 _EUR_ “ 0.2156 _EUR_ .


We expect to implement a combined solution of the given examples. A supply chain
configuration consisting of manufacturers applying an on-premise solution and wholesalers
as well as retailers accompanying an on-demand solution, the surcharge per item is given by


0.0029 _EUR_ ` 2 ˚ 0.0048 _EUR_ ` 0.0066 _EUR_ “ 0.0191 _EUR_ .


By applying this combined supply chain configuration it is possible to reduce the surcharge
per item to less than 10 percent of the purely on-premise costs. Assuming an average
pharmaceutical product price of 7.13 EUR. The expected surcharge per item for on-demand
and the combined configuration are of 0.02 EUR resp. 0.22 EUR for on-premise, which
equals 2.7 permille resp. 3.1 percent of the initial product price [European Commission (2008);
Schapranow, Nagora & Zeier (2010)]. In all cases, the surcharge remains below our assumed
empirical threshold of approx. 10 percent of the product’s retail price as stated in Sect. 2.
The given surcharges are required to amortize the initial investment for RFID-enablement
only. Regular costs, such as operational costs, maintenance costs for RFID devices, cost for
RFID tags, monthly fees for subscription in an on-demand solution, etc. need to be added
individually since they are not part of the given calculations.


**5. Conclusions and outlook**


In the given work, we considered RFID technology as the key-enabler for an integer and
counterfeit-resistant pharmaceutical supply chain [Zeier et al. (2009)]. The pharmaceutical
industry draws the motivation for our research activities due to the increasing number
of detected pharmaceutical counterfeits within industry countries. We draw our business
considerations for RFID-enablement of participants in an integer pharmaceutical supply
chain. We shared our qualitative analysis of EPC networks architectures and compared
operative factors. Based on our analysis, we derived costs for operating a dedicated service
provider for anti-counterfeiting within an RFID-aided supply chain and compared possible
models to operate this instance.
We expect that the acceptance of RFID technology depends on costs for RFID-enablement and
its business advantages. For the given pharmaceutical case study, we expect RFID technology


www.intechopen.com


14216 Designing and Deploying RFID ApplicationsRFID / Book 2


to support authentic pharmaceuticals and automatic anti-counterfeiting by evaluating a
good’s product history. Ultimately, we compared required costs for RFID-enablement in
an on-premise setup with an on-demand setup and derived per product surcharges for
amortization of anti-counterfeiting in RFID-aided supply chains. The outcome of our research
activities clearly depicts that initial investments for RFID enablement do no contribute to
major product surcharges.
Our future research activities will focus on payment models for operation of the service
provider for anti-counterfeiting. We will analyze the following payment models:


1. General post-payment models, e.g. once a month for large wholesalers,


2. Individual payment models, e.g. per anti-counterfeiting check for small wholesalers, or


3. Pre-payment models, e.g. for retailers when a predefined balance on an account can be
used for checks.


**6. Appendix A: Component Costs**


Tab. 3 contains selected RFID components for RFID-enablement of a pharmaceutical company.
We selected these components for pricing assumptions [1] . The given assumption can also
be used for further industries. However, components may vary individually for specific
industries and setups, which result in different costs per component and/or total costs.


1 We assume USD 1.4184 = 1.0000 EUR


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 21715


**Component** **Article** **Costs [EUR]**


**Reader Equipment**

Device Alien 9800 [RFIDSupplyChain.com LLC (n.d.b)] 913.00
Antenna Alien 915 MHz Circular 101.00
Antenna [RFIDSupplyChain.com LLC (n.d.a)]

Cable Alien ALX-408 Extension 44.00
Cable [RFIDSupplyChain.com LLC (n.d.d)]

Holder Alien ALX-407 Mounting 16.00
Bracket [RFIDSupplyChain.com LLC (n.d.c)]

**Printer** Zebra R110Xi [IDAutomation.com Inc. (n.d.)] 3,526.00
**Middleware**

Workstation HP Workstation xw9400 [Hewlett Packard (n.d.)] 3,261.00
Software IBM Websphere RFID Premise Server [IBM Corporation 908.00
(n.d.)]

**Internet Access**

Server HP ProLiant DL380 G5 [macle GmbH (n.d.)] 1,898.00
Router 200.00
Network Cable 100.00
**EPCIS**

Fosstrak [Fosstrak (2009)] open-source
Internet Access 2,298.00
EPC Fee [GS1 Germany GmbH (2010)] 2,650.00
**ONS**

Internet Access 2,298.00
**Verification Server**

Internet Access 2,298.00
**Tag** Thin Propeller Label[TAGnology RFID GmbH (n.d.)] 0.37
**Consulting** Man-Day 400.00


Table 3. Costs Per RFID Component


www.intechopen.com


16218 Designing and Deploying RFID ApplicationsRFID / Book 2


**7. References**


Barthwell, A. G., Barnes, M. C., Leopold, V. R. & Wichelecki, J. L. (2009). National Survey
on Drug Use and Health, _Technical_ _report_, Center for Lawful Access and Abuse
Deterrence.
Bos, J. V. D. (2009). Globalization of the Pharmaceutical Supply Chain: What are the Risks? The FDA’s Difficult Task, _Society of Actuaries_, pp. 23–26.
Bovenschulte, M., Gabriel, P., Gaßner, K. & Seidel, U. (2007). RFID: Prospectives for Germany

    - The State of Radio Frequency Identification-based applications and their Outlook
in National and Internat. Markets.
Bundesverband Informationswirtschaft, Telekommunikation und neue Medien (2005).
White Paper RFID Technologie, Systeme und Anwendungen, http://www.
bitkom.org/files/documents/White_Paper_RFID_deutsch_11.08.
2005__final.pdf [2] .
Choi, S. & Poon, C. (2008). An RFID-based Anti-counterfeiting System, _International Journal of_
_Computer Science_ 35(1).
EPCglobal Inc. (2007). EPCIS Standard 1.0.1, http://www.gs1.org/gsmp/kc/
epcglobal/epcis/epcis_1_0_1-standard-20070921.pdf [2] .
EPCglobal Inc. (2010). Tag Data Standard 1.5, http://www.gs1.org/sites/default/
files/docs/tds/tds_1_5-standard-20100818.pdf [2] .
European Commission (2008). Pharmaceutical Sector Inquiry Preliminary Report.
European Commission Taxation and Customs Union (2009). Report on
EU Customs Enforcement of IP Rights, http://ec.europa.
eu/taxation_customs/resources/documents/customs/

customs_controls/counterfeit_piracy/statistics/
2009_statistics_for_2008_full_report_en.pdf [2] .
Food and Drug Administration (2004). Counterfeit Drug Task Force Report.
Food and Drug Administration (2005). Counterfeit Drug Task Force Report.
Fosstrak (2009). Project License, http://www.fosstrak.org/epcis/license.html [2] .
GS1 Germany GmbH (2010). Preise für die Nutzung des Leistungspaketes GS1 Complete,
http://www.gs1-germany.de/service/gs1_complete/preisliste/
index_ger.html [2] .
Hewlett Packard (n.d.). HP Workstation xw9400, http://h20195.www2.hp.com/V2/
GetDocument.aspx?docname=4AA0-4798EEE&doclang=EN_GB [2] .
IBM Corporation (n.d.). Software Pricing, https://
www-112.ibm.com/software/howtobuy/buyingtools/

paexpress/Express?P0=E1&part_number=D0A4DLL,

D0A4QLL,D0A4WLL,D0A4YLL,D0A5LLL,D0A5NLL,
&catalogLocale=de_DE&Locale=de_DE&country=DEU&brand=ws&PT=html [2] .
ICC Policy Statement (2004). The Fight against Piracy and Counterfeiting of Intellectual
Property, http://www.iccwbo.org/home/intellectual_property/
fight_against_piracy.pdf [2] .
IDAutomation.com Inc. (n.d.). Zebra R110Xi RFID Printer Encoder, http://www.
idautomation.com/rfid/Zebra-RFID-Printer.html [2] .
IP Crime Group (2008). IP Crime Report, http://www.ipo.gov.uk/ipcreport08.pdf [2] .


www.intechopen.com


What are Authentic Pharmaceuticals Worth?What are Authentic Pharmaceuticals Worth? 21917


Jenkins, J., Mills, P., Maidment, R. & Profit, M. (2007). Pharma Traceability Business Case
Report.
Knöpfel, A., Gröne, B. & Tabeling, P. (2005). _Fundamental_ _Modeling_ _Concepts._ _Effective_
_Communication of IT Systems_, John Wiley.
macle GmbH (n.d.). HP Proliant DL380 R05, http://www.macle.de/hp.html [2] .
Merck & Co. Inc. (2007). Settlement agreement, http://www.merck.com/newsroom/
vioxx/pdf/Settlement_Agreement.pdf [2] .
Müller, J., Faust, M., Schwalb, D., Schapranow, M.-P., Zeier, A. & Plattner, H. (2009). A
Software as a Service RFID Middleware for Small and Medium-sized Enterprises,
_Proceedings of the 5th European Workshop on RFID Systems and Technologies_, VDE.
Müller, J., Oberst, J., Wehrmeyer, S., Witt, J. & Zeier, A. (2010). An Aggregating Discovery
Service for the EPCglobal Network, _Proceedings_ _of_ _the_ _43th_ _Hawai’i_ _Conference_ _on_
_System Sciences_, Koloa, Hawaii, USA.
Müller, J., Pöpke, C., Urbat, M., Zeier, A. & Plattner, H. (2009). A Simulation of the
Pharmaceutical Supply Chain to Provide Realistic Test Data, _Proceedings_ _of_ _1st_
_International Conference on Advances in System Simulation_, IEEE.
Müller, J., Schapranow, M.-P., Helmich, M., Enderlein, S. & Zeier, A. (2009). RFID Middleware
as a Service     - Enabling Small and Medium-sized Enterprises to Participate in the
EPC Network, _Proceedings_ _of_ _the_ _16th_ _International Conference on_ _Industry_ _Engineering_
_and Engineering Management_, Vol. 2, pp. 2040–2043.
RFIDSupplyChain.com LLC (n.d.a). Alien 915 MHz Circular Antenna
(ALR-9611-CR), http://www.rfidsupplychain.com/-strse-13/
Alien-915-MHz-Circular/Detail.bok [2] .
RFIDSupplyChain.com LLC (n.d.b). Alien 9800 EPC Multiprotocol RFID
Fixed Reader, http://www.rfidsupplychain.com/-strse-98/
Alien-9800-EPC-Multiprotocol/Detail.bok [2] .
RFIDSupplyChain.com LLC (n.d.c). Alien ALX-407 Antenna Mounting
Bracket, http://www.rfidsupplychain.com/-strse-195/
Alien-ALX-dsh-407-Antenna-Mounting/Detail.bok [2] .
RFIDSupplyChain.com LLC (n.d.d). Alien ALX-408 Antenna Extension
Cable, http://www.rfidsupplychain.com/-strse-196/
Alien-ALX-dsh-408-Antenna-Extension/Detail.bok [2] .
Schapranow, M.-P., Müller, J., Zeier, A. & Plattner, H. (2009). Security Aspects in Vulnerable
RFID-Aided Supply Chains, _Proceedings of 5th European Workshop on RFID Systems and_
_Technologies_, VDE.
Schapranow, M.-P., Müller, J., Zeier, A. & Plattner, H. (2010). RFID Event Data Processing: An
Architecture for Storing and Searching, _Proceedings of the 4th International Workshop on_
_RFID Technology - Concepts, Applications, Challenges_ .
Schapranow, M.-P., Nagora, M. & Zeier, A. (2010). CoMoSeR: Cost Model for
Security-Enhanced RFID-Aided Supply Chains, _Proceedings_ _of_ _the_ _18th_ _International_
_Conference on Software Telecommunications and Computer Networks_, IEEE.
Schapranow, M.-P., Zeier, A. & Plattner, H. (2010). A Dynamic Mutual RFID Authentication
Model Preventing Unauthorized Third Party Access, _Proceedings_ _of_ _the_ _4th_
_International Conference on Network and System Security_ .


www.intechopen.com


18220 Designing and Deploying RFID ApplicationsRFID / Book 2


Schlitter, N., Kähne, F., Schilz, S. T. & Mattke, H. (2007). Potentials and Problems
of RFID-based Cooperations in Supply Chains, _Innovative_ _Logistics_ _Management:_
_Competitive Advantages through new Processes and Services_, Erich Schmidt Verlag GmbH
& Co., Berlin, pp. 147–164.
Shukla, N. & Sangal, T. (2009). Generic Drug Industry in India: The Counterfeit Spin, _Journal_
_of Intellectual Property Rights_ 14: 236–240.
Staake, T., Thiesse, F. & Fleisch, E. (2005). Extending the EPC Network: The Potential of
RFID in Anti-Counterfeiting, _Proceedings of the ACM Symposium on Applied Computing_,
ACM, New York, NY, USA, pp. 1607–1612.
Stiehler, A. & Wichmann, T. (2005). RFID im Pharma- und Gesundheitssektor. Vision und
Realität RFID-basierter Netzwerke für Medikamente, Berlecon Report.
TAGnology RFID GmbH (n.d.). Impinj Thin Propeller Label 3.875" x
0.5", http://www.rfid-webshop.com/product_info.php/info/
p482_Impinj-Thin-Propeller-Label.html [2] .
U.S. Pharmaceuticals Pfizer Inc. (2006). Anti-Counterfeit Drug Initiative Workshop and
Vendor Display, http://www.fda.gov/OHRMS/DOCKETS/dockets/05n0510/
05N-0510-EC21-Attach-1.pdf [2] .
White, G. R., Gardiner, G., Prabhakar, G. & Razak, A. A. (2007). A Comparison of Barcode
and RFID Technologies in Practice, _Journal of Information, Information Technology,_ _and_
_Organizations_ 2.
World Health Organization (2009). Warning on purchase of antivirals without a prescription,
including via the Internet, http://www.who.int/medicines/publications/
drugalerts/Alert_122_Antivirals.pdf [2] .
Zeier, A., Hofmann, P., Krüger, J., Müller, J. & Schapranow, M.-P. (2009). Integration of RFID
Technology is a Key Enabler for Demand-Driven Supply Network, _The IUP Journal of_
_Supply Chain Management_ 6(3, 4): 57–74.
Zeier, A., Knolmayer, G., Mertens, P. & Dickersbach, J. (2008). _Supply Chain Management Based_
_on SAP Systems_, Springer.


2 All online references were checked on Apr. 28, 2011.


www.intechopen.com


**Designing and Deploying RFID Applications**

**Edited by Dr. Cristina Turcu**



**ISBN 978-953-307-265-4**



**Hard cover, 384 pages**



**Publisher InTech**



**Published online 15, June, 2011**



**Published in print edition June, 2011**



**RFID tags, brings many real business benefits to today world's organizations. Over the years, RFID research**
**has resulted in many concrete achievements and also contributed to the creation of communities that bring**
**scientists and engineers together with users. This book includes valuable research studies of the experienced**
**scientists in the field of RFID, including most recent developments. The book offers new insights, solutions and**
**ideas for the design of efficient RFID architectures and applications. While not pretending to be**
**comprehensive, its wide coverage may be appropriate not only for RFID novices, but also for engineers,**
**researchers, industry personnel, and all possible candidates to produce new and valuable results in RFID**
**domain.**


**How to reference**

**In order to correctly reference this scholarly work, feel free to copy and paste the following:**


**Matthieu Schapranow, Jurgen Muller, Martin Lorenz, Alexander Zeier and Hasso Plattner (2011). What are**
**Authentic Pharmaceuticals Worth?, Designing and Deploying RFID Applications, Dr. Cristina Turcu (Ed.), ISBN:**
**978-953-307-265-4, InTech, Available from: http://www.intechopen.com/books/designing-and-deploying-rfid-**
**applications/what-are-authentic-pharmaceuticals-worth-**



**InTech Europe**



**University Campus STeP Ri**
**Slavka Krautzeka 83/A**



**InTech China**

**Unit 405, Office Block, Hotel Equatorial Shanghai**
**No.65, Yan An Road (West), Shanghai, 200040, China**

**Phone: +86-21-62489820**

**Fax: +86-21-62489821**



**51000 Rijeka, Croatia**
**Phone: +385 (51) 770 447**
**Fax: +385 (51) 686 166**



**www.intechopen.com**


**© 2011 The Author(s). Licensee IntechOpen. This chapter is distributed**
**under the terms of the** **[Creative Commons Attribution-NonCommercial-](https://creativecommons.org/licenses/by-nc-sa/3.0/)**
**ShareAlike-3.0 License, which permits use, distribution and reproduction for**
**non-commercial purposes, provided the original is properly cited and**
**derivative works building on this content are distributed under the same**
**license.**


