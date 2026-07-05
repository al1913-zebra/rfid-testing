![](https://cdnintech.com/web/frontend/www/assets/06.115/journals/OpenAccessLock.svg)Open access

Written By

Huibin Sun

Submitted: 14 October 2010 Published: 15 June 2011

DOI: 10.5772/16610

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18088/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18088/#)

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

## Author Information

-   #### Huibin Sun \*
    
    #### Huibin Sun \*
    
    -   Key Laboratory of Contemporary Design and integrated Manufacturing Technology (Northwestern Polytechnical University), Ministry of Education, China
    

\*Address all correspondence to:

## 1\. Introduction

As we know, a complex product assembly process involves numerous parts, complex processes and high precision demands. But most assembly operation is carried out manually, and on-site assembly data is recorded on paper. Due to lack of advanced technology methods, some shortness exists as follows:

1.  Because of the asynchrony problem lies between the logistics stream and the information stream, assembly tasks are always assigned prior to materials’ preparation and transportation. Then the need of adjusting assembly task assignments according to materials’ state dynamically can’t be met.
    
2.  The associated relationship between materials and assembly tasks can’t be established automatically. Then operators are in charge of determining relationship between them. And parts are often misassembled, especially in the mixed flow production mode.
    
3.  The assembly executive process is a collaborative process among different operators and assembly workstations. And the operation order is established on operators’ work habit or spontaneity, which throws impediments in the way of assembly executive process monitoring, controlling and tracing.
    

Although adoption of barcodes can solve these problems to some certain extend, but they are difficult to be read, easy to be destroyed and unable to be rewritten. Therefore, barcode technology can’t meet the need of automatic, fast and smart material identifying. Due to the advantage of non-contact far distance reading/writing, RFID (Radio Frequency Identification) technology can not only make material identifying more convenient, but also turn real-time on-site monitoring into reality. On the other hand, because of the outstanding autonomy and collaboration characters, multi agent technology is widely used in manufacturing resource encapsulation and integration in the agile manufacturing system, manufacturing task scheduling in the collaborative design system, etc.

Under this circumstance, if we use the mobile agent technology to dispatch and recall assembly task, and use the RFID technology to identify material automatically, assembly executive process monitoring and controlling dynamically in real time will be enhanced, and misassembling phenomenon will be eliminated furthest. Therefore, based on multi agent technology and RFID technology, this paper aims to propose a complex product assembly executive monitoring and controlling method to achieve synchrony between the logistics stream and the information stream, and to match materials with assembly tasks dynamically. Then the automatic level and intelligent level of complex the product assembly executive process can both be improved.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 2\. Literature review

In recent years, more and more attention has been paid into manufacturing system monitoring and controlling related fields. Some of strong correlation researches are cited as follows.

The multi agent technology’s usage in advance manufacturing system was a hot topic. Many researchers focused on agent-based task scheduling, resource integration, workshop management, cell controlling, etc. Among them, Kyung-Hyun [Choi et al. (2007](https://www.intechopen.com/chapters/18088#B9)) proposed a multi-agent-based task assignment system for virtual enterprises, which attempted to address the selection of partners and the process of assigning tasks to them. Jose [Barata et al. (2008](https://www.intechopen.com/chapters/18088#B8)) discussed the design and implementation of a multi agent-based control architecture to support modular reconfigurable production systems. Moreover, the mobile agent technology could enhance the flexibility and adaptability of multi agent-based system. In this field, Guanghui [Zhou and Pingyu Jiang (2005](https://www.intechopen.com/chapters/18088#B4)) put forward a mobile agent-based framework for the manufacturing resource encapsulation and integration. They implemented the re-configuration and encapsulation for legacy manufacturing resources, and realized information interaction and acquirement. Hossein Tehrani Nik [Nejad et al. (2008](https://www.intechopen.com/chapters/18088#B5)) put forward an agent-based architecture for process planning and scheduling in the flexible manufacturing systems. Coordination agents were adopted to generate a suitable job assignment to the machine tool agents at each step of the negotiation. In summary, most researches listed above used agent technology in task scheduling, resources integration and encapsulation. These agents executed there logic individually. Without a whole process management model, the dynamic triggering mechanism among agents was unable to come into being. This weak point prevented multi agent technology, especially mobile agent technology, from using in more practical fields.

Petri net is suitable to describe and analyze systems’ asynchrony, concurrency, competition and randomicity characters. It is widely used in modeling, simulating and scheduling of discrete event dynamic systems (DEDSs). For example, some researchers adopted it to model and schedule the assembly and disassembly process. Among them, Fu-Shiung [Hsieh (2006](https://www.intechopen.com/chapters/18088#B1)) studied the robustness of a class of controlled Petri nets, called controlled assembly/disassembly Petri net (CADPN), for assembly/disassembly processes with unreliable resources. He characterized different types of tolerable resource failures allowed for a nominal marking of a live CADPN. Weijun [Zhang, et al. (2005](https://www.intechopen.com/chapters/18088#B13)) proposed a scheduling model for optimal production sequencing in a flexible assembly system. The assembly process was modeled using timed Petri nets and task scheduling was solved with a dynamic programming algorithm. [Tang Xinmin et al. (2006](https://www.intechopen.com/chapters/18088#B12)) and [Zhong Shisheng et al. (2006](https://www.intechopen.com/chapters/18088#B14)) put forward a timed colored Petri net to model the aero-engine assembly procedure. Based on the notion that assembly Petri net was reversed disassembly Petri net, they also proposed a Petri net reduction method for the disassembly Petri net. In summary, researches cited above adopted Petri net in assembly/disassembly process modeling and simulating. Only assembly/disassembly nodes were involved in the model, but logistics modes were excluded. Relationship between assembly/disassembly nodes and logistics nodes were also ignored. Such a model was unable to support the whole assembly/disassembly process. Moreover, besides modeling and simulating, how to use these models to monitor and control the assembly/disassembly process in practice was still a pendent problem.

The RFID technology is changing our life and production remarkably. Its usage in manufacturing system will benefit building of real time factory. In this field, George Q. [Huang (2007a](https://www.intechopen.com/chapters/18088#B2), [2007b](https://www.intechopen.com/chapters/18088#B3)) presented an approach to shop-floor performance improvement by using RFID technology for the collection and synchronization of the real-time field data from manufacturing workshops. His emphasis was placed upon how to deploy RFID technology for managing work-in progress (WIP) inventories in manufacturing job shops with typical functional layouts. He also studied how to deploy RFID technology in a walking-worker fixed-position flexible assembly islands where products were placed at fixed position work centers in the shop-floor, the workers moved from one work centre to another, and tools and components were brought to the work centre for assembly according to the process and production plan. To bridge the gap between shop floor automation and factory information systems, Robin G (2007) proposed an RFID-based framework to enable the instant delivery of pertinent data and information on a uniquely identifiable job/product at point-of-need across factories. [Lu B. H. et al. (2006)](https://www.intechopen.com/chapters/18088#B10) reviewed the fundamental issues, methodologies, applications and potential of RFID enabled manufacturing, outlined a simulated RFID machining process application case study, and discussed a proposed methodology, framework and five-step deployment process aimed at developing a holistic approach to implementing RFID enabled manufacturing in manufacturing enterprises in detail. In summary, these researches used RFID technology to implement real time manufacturing workshops. RFID tags’ wireless, long distance properties were fully exerted. But RFID tags can also be a carrier of manufacturing executive state. They can be a bridge between the information stream and the logistics stream. According to information taken back by them, triggering and controlling of manufacturing executive process can be implemented in a more automatic mode.

As discussed above, many researchers have studied assembly executive process modeling, monitoring and controlling methods. Petri net, multi agent technology and RFID technology have been adopted to solve the problem to a certain extent respectively. But each of them can’t solve all problems individually. As a result, compound of these technologies may break a new path for implementation of a timely and intelligent complex product assembly digitalization system.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 3\. Assembly executive process control ([huibin sun, 2009a](https://www.intechopen.com/chapters/18088#B6))

### 3.1. Assembly executive process petri nets model

In the complex product assembly executive process, materials’ states belong to the discrete set {assembly state, transport state}. Conversion between these two states is determined and triggered by events as “material drawn“, “transport finished”, “assembly finished”, and so on. From this perspective, the complex product assembly executive process is a discrete event dynamic system. And it is suitable to be modeled, analyzed, and controlled via Petri net theories and methods. Therefore, an assembly executive process Petri net (AEPPN) will be proposed and discussed in detail here.

Definition: AEPPN is a 7-element set as AEPPN={P, T, C, I, O, m<sub>0</sub>, D}. Among them, T={t<sub>1</sub>, t<sub>2,</sub> …, t<sub>m</sub>} is the transition set, which is composed by assembly transitions and logistics transitions. An assembly transition refers to a group’s activity of executing and finishing an assembly task. A logistics transition refers to the logistics operators’ activity of executing and finishing a transport task. P={p<sub>1</sub>, p<sub>2,</sub> …, p<sub>n</sub>} is the set of places, which describes events in the assembly executive process. C is the color set of transitions and places. It is used to distinguish products. Assuming s stands for the amount of products, then,

∀pi∈P:C(pi)\={a1,a2,⋯,as},i\=1,2,⋯,n$$
\forallp_{i}\inP:C(p_{i})=\{a_{1},a_{2},⋯,a_{s}\},i=1,2,⋯,n
$$

E1

∀tj∈T:C(tj)\={a1,a2,⋯,as},j\=1,2,⋯,m$$
\forallt_{j}\inT:C(t_{j})=\{a_{1},a_{2},⋯,a_{s}\},j=1,2,⋯,m
$$

E2

while a<sub>1</sub>, a<sub>2</sub>, …, a<sub>s</sub> are color types. In practice, each of them can be replaced by a product’s unique ID code. The mapping relationship between the product set and the color set is 1:1.

I (p, t) is the input function from place p to transition t: C(p)×C(t)→N (non-negative integer). It corresponds to the colored directional line from p to t. I (p, t) is an s-by-s matrix here. O (p, t) is the output function from transition t to place p: C(t)×C(p)→N (non-negative integer). It corresponds to the colored directional line from t to p. O (p, t) is an s-by-s matrix here too. M<sub>0</sub> is the initial mark, which stands for the amount of token with certain color in the place p. D={d<sub>1</sub>, d<sub>2,</sub> …, d<sub>m</sub>} is the time delay set of all transitions’. For example, d<sub>j</sub> stands for time delay of transition t<sub>j</sub>. If t<sub>j</sub> is an assembly transition, d<sub>j</sub> equals to the correspondent assembly task’s time consumption. If t<sub>j</sub> is a logistics transition, d<sub>j</sub> equals to the correspondent logistics task’s time consumption. Every transition has a constant time delay, and there is no correlativity relationship lies between a transition’s color and its time delay, as

∀tj∈T:D(tj)\=dj,j\=1,2,⋯,m$$
\forallt_{j}\inT:D(t_{j})=d_{j},j=1,2,⋯,m
$$

E3

The input line from the place p<sub>i</sub> with the color a<sub>h</sub> to the transition t<sub>j</sub> with the color a<sub>k</sub> can be expressed by the scalar quantity I(a<sub>i,h</sub>, a<sub>j,k</sub>). Similarly, the scalar quantity O(a<sub>i,h</sub>, a<sub>j,k</sub>) expresses the correspondent output line.

In each place, the amount of token with certain color is no more than 1, as

∀pi∈P,aj∈C(pi):m(ai,j)≤1,i\=1,2,⋯,n$$
\forallp_{i}\inP,a_{j}\inC(p_{i}):m(a_{i,j})\le1,i=1,2,⋯,n
$$

E4

Under the mark M, the transition t<sub>j</sub> is enabled by the color a<sub>k</sub>, if and only if

∀pi∈•tj:M(ai,h)≥I(ai,h,aj,k)$$
\forallp_{i}\in•t_{j}:M(a_{i,h})\geI(a_{i,h},a_{j,k})
$$

E5

When the transition t<sub>j</sub> is just triggered, comes out a new mark M’ as

∀pi∈•tj:M'(ai,h)\=M(ai,h)−I(ai,h,aj,k)$$
\forallp_{i}\in•t_{j}:M'(a_{i,h})=M(a_{i,h})-I(a_{i,h},a_{j,k})
$$

E6

After the transition t<sub>j</sub> has been triggered for time delay d<sub>i</sub>, comes out a new mark M” as

∀pi∈tj•:M"(ai,h)\=M(ai,h)+O(ai,h,aj,k)$$
\forallp_{i}\int_{j}•:M"(a_{i,h})=M(a_{i,h})+O(a_{i,h},a_{j,k})
$$

E7

### 3.2. Multiple agent-based Implementation model

Assembly transitions and logistics transitions in the AEPPN model are distributed, dynamic and autonomy. And they are suitable to be implemented and controlled through agent technology. Therefore, these two types of transition are regarded as self-governed entities that are entitled to certain privileges and can intercommunicate with each other. Each of them has its own structure and mode, and can finish its task driven by local data. On the other hand, RFID tags can not only be used to identify materials. When a batch of material is drawn from the inventory, or an assembly task is finished, a new RFID tag is created to identify the material or the new assembly. When the assembly task or the material’s transport task is finished, the RFID tag is updated. RFID tags’ state changes are in line with the assembly executive process events, and RFID tags’ states can be used to describe the assembly executive process states. Therefore, the AEPPN model can be implemented by an RFID-based multi agent system, in which assembly agents and logistics agents are included. Function model of these two types of agent is shown in [figure 1](https://www.intechopen.com/chapters/18088#F1). The main functions of assembly agents are listed as follows:

1.  Get information from RFID tags, and promote task information;
    
2.  Clean information saved in RFID tags that identify materials;
    
3.  Get task information and 3D assembly process from database;
    
4.  Guide the assembly operation process and control the quality check process;
    
5.  Update task information in database, and create new RFID tag to identify the new assembly.
    

Main functions of logistics agent are listed as follows:

1.  Get information from RFID tags, and promote task information;
    
2.  Get task information and material information from database;
    
3.  Guide the transportation process;
    
4.  Update information saved in database and RFID tags.
    

![Figure 1.Function model of assembly agent and logistics agent](https://cdnintech.com/media/chapter/18088/1512345123/media/image9.jpg)

#### Figure 1.

Function model of assembly agent and logistics agent

As shown in [figure 1](https://www.intechopen.com/chapters/18088#F1), there is no direct communication channel lies between assembly agents and logistics agents. And RFID tags and database play the role of sharing blackboard between them. Each RFID tag has it unique Electronic Product Code (EPC), and saves encoded information, such as material’s current state, the next operation instruction, in its storage space. For example, when an assembly task is finished, a new RFID tag is used to identify the new assembly. An ASCII string is saved in the tag’s storage space, and what it means is decomposed as [table 1](https://www.intechopen.com/chapters/18088#T1) shows.

|   Information Type    |            Content             |
|-----------------------|--------------------------------|
|     Current state     |       Assembly finished        |
|    Current station    | Accessory assembly workstation |
|    Next operation     |           Transport            |
| Next operation method |            Manually            |
|     Next station      |   Final assembly workstation   |
|    Related process    |              None              |
|       Deadline        |      2008-04-09 10:22:00       |

### Table 1.

A data structure example

All data related to the assembly process and associated relationship between RFID tags and material ID are stored in the database. Communication types among agents, RFID tags and database include “Get”, “Create”, “Update” and “Delete”. Along a typical assembly executive process, what these communication types do is listed in [figure 2](https://www.intechopen.com/chapters/18088#F2). In each communication type, every arrow indicates the direction of information transmission.

![Figure 2.Communication types](https://cdnintech.com/media/chapter/18088/1512345123/media/image10.jpg)

#### Figure 2.

Communication types

### 3.3. Mobile agent-based assembly digitalization framework

Agents can be decomposed into agent templates and agent instances. An agent template is product type-related. It defines every agent’s default process, check rule, assembly group, sequence, and so on. An agent instance results from an agent template’s instantiation. It describes practical process, check rule, assembly group, material RFID tag, triggering relationship among agent instances, and so on. If an agent instance’s all parameters are satisfied, it will be dispatched to the correspondent assembly workstation to guide the assembly operation. When the assembly task is finished, the agent returns to the server side with dynamic data included.

Based on above analysis, the mobile agent-based assembly digitalization framework is shown in [figure 3](https://www.intechopen.com/chapters/18088#F3). The framework can be divided into the server layer and the assembly workstation layer. They are interconnected via computer network.

The server layer includes the ADS (Assembly Digitalization System) server and the mobile agent server. The ADS server’s main functions include maintaining ADS’s logic, providing agent information about task, process, users, manufacturing resources, etc, receiving and saving dynamic data from agents. The mobile agent server’s main functions include providing running environment for agent instances, maintaining logic sequence among agents, triggering, dispatching, retracting and destroying agents.

The assembly workstation layer is composed by the mobile agent server and the RFID R/W equipments. The mobile agent server provides running time environment for agent instances, and the RFID R/W equipment is in charge of identifying materials and editing information saved in RFID tags’ storage space.

![Figure 3.The mobile agent-based assembly digitalization framework](https://cdnintech.com/media/chapter/18088/1512345123/media/image11.jpg)

#### Figure 3.

The mobile agent-based assembly digitalization framework

Here, RFID tags’ main functions include:

1.  Identify part set, subassembly, assembly and product. Quantity relationship between RFID tag and subassembly, assembly or product is 1:1. And quantity relationship between RFID tag and part is 1:n, which means a tag can be used to identify a set of parts.
    
2.  Mark the assembly executive state. For example, when parts for an assembly task are obtained from the inventory, the RFID tag’s state changes to “material drawn”. When an RFID tag is created to identify the new assembly, its state is set as “assembly finished”.
    
3.  Trigger the assembly agent instance. An agent can obtain the assembly executive state by reading the RFID tags’ state. When material for an assembly task is all ready, the correspondent assembly agent instance is triggered and dispatched to the assembly workstation. When the material is transported to the assembly workstation, the agent instance is triggered to guide the assembly operation process and quality check process. When the assembly task is finished, the agent’s retraction event is triggered.
    
4.  Guide and trace the work-in-progress logistics. Exact position of material can be traced through RFID tags. Comparison between practical route and expected route is helpful for transportation guide.
    
5.  Save and exchange information. A communication channel can be established among assembly workstations through RFID tags’ storage space. It is very important for offline information exchanging.
    

In summary, RFID tags can be adopted to not only identify materials, but also describe assembly executive states. They can be used to guide and trace WIP logistics, or save and exchange information too. Compared with barcode technology, RFID tags have prominent technological advantages.

As discussed above, assembly tasks’ logic and data can be encapsulated by assembly agents. Assembly tasks’ execution and control, assembly operation’s guide and trace, on-site data’s collection and exchange, can also be implemented by assembly agents. As to a practical complex product assembly task, assembly agents’ flow includes.

1.  Create assembly agent templates for the product type,
    
2.  Instantiate the assembly agent templates, and create assembly agent instances for the product.
    
3.  Dispatch the agent to assembly workstation, if the necessary RFID tags and other parameters are satisfied.
    
4.  At the assembly workstation, check material state through identifying RFID tags. If the answer is OK, trigger the assembly operation guide process.
    
5.  The operators execute the assembly operation guided by the assembly agent’s 3D assembly process.
    
6.  Operators, assembly group leaders and checkers execute quality check process guided by the assembly agent.
    
7.  Create a new RFID tag to identify the new assembly when the assembly task is finished.
    
8.  Retract the assembly agent, and save assembly process data, quality check data and new RFID tag’s EPC in the database.
    
9.  Write new RFID tag’s EPC into the next agent according to the logic sequence among agents.
    
10.  Dispatch the agent to the correspondent assembly workstation if necessary condition is all ready.
    
11.  Repeat above steps, until the complex product assembly task is finished.
    

To implement above flow, assembly agents must encapsulate some basic data and extending data involved in the assembly executive process. Among them, extending data is used to describe user defined information, and basic data is composed of basic parameters, input parameters and output parameters. Basic parameters describe assembly agents’ basic attributions; input parameters define input information of certain assembly task. Output parameters encapsulate dynamic information produced in the assembly executive process. For example, an assembly agent’s input/output parameters are listed in [figure 4](https://www.intechopen.com/chapters/18088#F4).

![Figure 4.A mobile agent’s input/output parameters](https://cdnintech.com/media/chapter/18088/1512345123/media/image12.jpg)

#### Figure 4.

A mobile agent’s input/output parameters

### 3.4. An example

The aero-engine is a typical complex product. Commonly, its final assembly task is carried out at the final assembly workstation, which assembles the splitter lip, the lube pump and other assemblies together. Among them, the splitter lip is composed of three subassemblies as the upper gearing, middle gearing and lower gearing. Its assembly task and its subassemblies’ assembly tasks are carried out at the splitter lip assembly workstation. And the lube pump assembly task is carried out at the accessory assembly workstation. All these assembly tasks are executed in a mixed flow production factory. An AEPPN model is established as [figure 5](https://www.intechopen.com/chapters/18088#F5) shows. To explain the issue without loss of generality, other assembly tasks have been simplified. Meanings of places and transition in the model are listed in [table 2](https://www.intechopen.com/chapters/18088#T2) and [3](https://www.intechopen.com/chapters/18088#T3).

Now, two aero-engines are being assembled. They are numbered 0295 and 0318 respectively. Therefore, transitions and places have and only have two color types: 0295 and 0318, as

∀pi∈P:C(pi)\={0295,0318},i\=1,2,⋯,17$$
\forallp_{i}\inP:C(p_{i})=\{0295,0318\},i=1,2,⋯,17
$$

E8

∀tj∈T:C(tj)\={0295,0318},j\=1,2,⋯,12$$
\forallt_{j}\inT:C(t_{j})=\{0295,0318\},j=1,2,⋯,12
$$

E9

And current state is marked by M. Because of

∀pi∈•t7:M(0318)\=1≥I(0318,0318)\=1$$
\forallp_{i}\in•t_{7}:M(0318)=1\geI(0318,0318)=1
$$

E10

Transition t<sub>7</sub> is enabled by color 0318. It aims to assemble the splitter lip assembly, and can be carried out assisted by the splitter lip assembly agent. The agent obtains information saved in every tag’s storage space by the “get” method at first. Then it cleans information saved in these tags by the “delete” method. And it also sets the splitter lip assembly task’s state as “assembling” in the database. Here, the mark M’ comes out. When the splitter lip assembly task is finished, the transition t<sub>7</sub> creates a new tag to identify the splitter lip assembly by the “create” method. At the same time, it sets the splitter lip assembly task’s state as “assembled”. Here, the mark M” comes out.

![Figure 5.The AEPPN model of an aero-engine assembly task](https://cdnintech.com/media/chapter/18088/1512345123/media/image16.jpg)

#### Figure 5.

The AEPPN model of an aero-engine assembly task

M\=p7p8p9p12⎡⎣⎢⎢⎢⎢⎢⎢⎢⎢⎢...031803180318...0...⎤⎦⎥⎥⎥⎥⎥⎥⎥⎥⎥         M'\=p7p8p9p12⎡⎣⎢⎢⎢⎢⎢⎢⎢⎢⎢...000...0...⎤⎦⎥⎥⎥⎥⎥⎥⎥⎥⎥         M"\=p7p8p9p12⎡⎣⎢⎢⎢⎢⎢⎢⎢⎢⎢...000...0318...⎤⎦⎥⎥⎥⎥⎥⎥⎥⎥⎥$$
M=\begin{matrix}p_{7} \\ p_{8} \\ p_{9} \\ p_{12}\end{matrix}[\begin{matrix}... \\ 0318 \\ 0318 \\ 0318 \\... \\ 0 \\...\end{matrix}]M'=\begin{matrix}p_{7} \\ p_{8} \\ p_{9} \\ p_{12}\end{matrix}[\begin{matrix}... \\ 0 \\ 0 \\ 0 \\... \\ 0 \\...\end{matrix}]M"=\begin{matrix}p_{7} \\ p_{8} \\ p_{9} \\ p_{12}\end{matrix}[\begin{matrix}... \\ 0 \\ 0 \\ 0 \\... \\ 0318 \\...\end{matrix}]
$$

E11

Based on the aglets toolkit of IBM Japan, an aglet-based aero-engine assembly digitalization prototype is developed. Its user interfaces and flow are shown in [figure 6](https://www.intechopen.com/chapters/18088#F6). In step 1, the user sets the basic information and triggering condition for the product type’s aglet templates. Among them, the relationship among assembly tasks, assembly processes and assembly groups are defined in the basic information section. Sequences among assembly aglets are also defined. And the triggering condition section defines associated relationship between assembly tasks and materials, especially necessary materials to trigger the assembly tasks’ assignment and execution event. In step 2, the user sets the basic information and triggering condition for the product’s aglet instances. Among them, the basic information section confirms information in the aglet templates, and the triggering condition section records the RFID tags’ EPC (96 bits). When materials for the assembly task is drawn, the correspondent aglet is dispatched to the assembly workstation. The material’s transportation state is monitored by the RFID reader. Here, the RFID tags’ frequency is 13.56MHz, and their storage space is 8KB. When the material is arrived, the aglet starts the assembly operation process. And guided by the 3D process and check flow provided by the aglet, operators can finish assembling, checking and data recording. When the assembly task is finished, the aglet creates a new RFID tag to identify the new assembly. Then the aglet is retracted, and on-site data will be carried back to update the database. When necessary condition for another aglet is satisfied, the flow from step 3 to step 10 will run again.

| Place |                                 Meanings                                  |                               State of RFID tag                               |
|-------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------|
|  p1   |           Material for the upper gearing assembly task is drawn           |  A tag is created to identify materials for the upper gearing assembly task.  |
|  p2   |          Material for the middle gearing assembly task is drawn           |  A tag is created to identify materials for the middle gearing assembly task  |
|  p3   |           Material for the splitter lip assembly task is drawn.           |  A tag is created to identify materials for the splitter lip assembly task.   |
|  p4   | Material transportation for the upper gearing assembly task is finished.  |   The tag of materials for the upper gearing assembly task has been updated   |
|  p5   | Material transportation for the middle gearing assembly task is finished. |  The tag of materials for the middle gearing assembly task has been updated.  |
|  p6   |             Material for the lube pump assembly task is drawn             | A tag has been created to identify materials for the lube pump assembly task. |
|  p7   |  Material transportation for the splitter lip assembly task is finished   |   The tag of materials for the splitter lip assembly task has been updated    |
|  p8   |                The upper gearing assembly task is finished                |       A tag has been created to identify the upper gearing subassembly        |
|  p9   |               The middle gearing assembly task is finished                |       A tag has been created to identify the middle gearing subassembly       |
|  p10  |    Material transportation for the lube pump assembly task is finished    |     The tag of materials for the lube pump assembly task has been updated     |
|  p11  |            Material for the aero-engine assembly task is drawn            | A tag has been created to identify material of the aero-engine assembly task. |
|  p12  |                The splitter lip assembly task is finished                 |      A tag has been created to identify the splitter lip assembly task.       |
|  p13  |                  The lube pump assembly task is finished                  |        A tag has been created to identify the lube pump assembly task.        |
|  p14  |   Material transportation for the aero-engine assembly task is finished   |    The tag of materials for the aero-engine assembly task has been updated    |
|  p15  |        The splitter lip arrived at the final assembly workstation.        |                 The tag of the splitter lip has been updated                  |
|  p16  |         The lube pump arrived at the final assembly workstation.          |                   The tag of the lube pump has been updated                   |
|  p17  |                 The aero-engine assembly task is finished                 |            A tag has been created to identify the new aero-engine             |

### Table 2.

Place list

| Transition |                                                  Meanings                                                  |   Agent Type    |
|------------|------------------------------------------------------------------------------------------------------------|-----------------|
|     t1     | Move materials for the upper gearing assembly task from inventory to the splitter lip assembly workstation | Logistics Agent |
|     t2     |   Move materials for the middle gearing assembly from inventory to the splitter lip assembly workstation   | Logistics Agent |
|     t3     | Move materials for the splitter lip assembly task from inventory to the splitter lip assembly workstation  | Logistics Agent |
|     t4     |                                   Assemble the upper gearing subassembly                                   | Assemble Agent  |
|     t5     |                                  Assemble the middle gearing subassembly                                   | Assemble Agent  |
|     t6     |    Move materials for the lube pump assembly task from inventory to the accessory assembly workstation     | Logistics Agent |
|     t7     |                                    Assemble the splitter lip assembly.                                     | Assemble Agent  |
|     t8     |                                      Assemble the lube pump assembly.                                      | Assemble Agent  |
|     t9     |     Move materials for the aero-engine assembly task from inventory to the final assemble workstation.     | Logistics Agent |
|    t10     |    Move the splitter lip from the splitter lip assembly workstation to the finial assemble workstation     | Logistics Agent |
|    t11     |       Move the lube pump from the accessory assembly workstation to the finial assemble workstation        | Logistics Agent |
|    t12     |                                         Assemble the aero-engine.                                          | Assemble Agent  |

### Table 3.

Transition list

![](https://cdnintech.com/media/chapter/18088/1512345123/media/image18.jpg)

#### Figure 6.

The prototype’s user interfaces and flow

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 4\. Interactive 3D assembly operation guide ([huibin sun, 2009b](https://www.intechopen.com/chapters/18088#B7))

In the virtual assembly environment, the assembly sequence is designed, simulated and validated in 3D mode. As a result, the 3D assembly process can be wizard for operators at the assembly workstation. But mistakes couldn’t be eliminated, because there is no relationship lies between models in the 3D assembly process and real manufacturing resources. Whether a part is assembled correctly or not can’t be recognized automatically, and key parts’ assembly history can’t be traced under the repeatable assembly condition. To overcome above section, this paper aims to enhance the 3D assembly process’s guide ability via establishing interactive mechanism between virtual models and real manufacturing resources. Then each manufacturing resource can be validated and checked automatically. And misassembly phenomenon can be avoided furthest.

### 4.1. The extended assembly step model

In traditional 3D assembly process model, detailed assembly operation order is encapsulated by steps. Manufacturing resources as operator, part, equipment and clamp are modeled. But traditional 3D assembly process is product type related. The same assembly process is referred by all products’ assembly executive process with the same product type. But in fact, two manufacturing resources with the same type may differ from each other in different product assembly executive processes. Then the mapping relationship between a manufacturing resource and its model in traditional 3D assembly process is not 1:1. Several manufacturing resources with the same type may share the same model in the 3D assembly process. This fact prevents the traditional 3D assembly process from guiding each product executive process individually and interactively. Complex and important parts’ assembly history can’t be recorded and traced. To overcome the problem, an extended assembly step model is proposed here. Its components and structure are shown in [figure 7](https://www.intechopen.com/chapters/18088#F7).

![](https://cdnintech.com/media/chapter/18088/1512345123/media/image19.jpg)

#### Figure 7.

The extended assembly step model

As shown in [figure 7](https://www.intechopen.com/chapters/18088#F7), the extended assembly step model is composed of step basic information section and manufacturing resource information section. The step basic information section describes the step’s process code, procedure code and step content. The manufacturing resource information section describes manufacturing resources, such as part, equipment, clamp, tool, operator, and so on. Each manufacturing resource involves three kinds of information, static information, check item and check result. Static information describes a manufacturing resource type’s general information, such as name and 3D model. It is unchangeable for all manufacturing resources with the same type whenever. A check item involves some information that can be checked, which means a check operation can be acted to validate individual manufacturing resource’s validity. Whether an item should be checked is configurable. Some check items are changeable, such as drawing code. Others may vary in different assembly executive process, such as batch code. The check result encapsulates each manufacturing resource’s identity information and other dynamic. It is used to feed back each manufacturing resource’s assembly operation history.

### 4.2. Automatic matching mechanism between virtual models and real materials

In the extended assembly step model, the 3D model is a necessary attribute in the manufacturing resource section. This means that each manufacturing resource is mapped to a virtual solid model in the 3D assembly process. The manufacturing section also defines some check items. They are used to find out a manufacturing resource that fulfills the check conditions. If necessary check items are satisfied, a manufacturing resource is chosen and its ID will be record in the check result section. Then the virtual manufacturing resource model in the 3D assembly process is instanted by a real manufacturing resource. In practice, an automatic match mechanism can be implemented by a flow as [figure 8](https://www.intechopen.com/chapters/18088#F8) shows. In the flow, the assembly spot wizard is triggered by the assembly executive system, a software system in charge of assembly executive process monitoring and controlling. The assembly operation is guided by the 3D assembly process. When a 3D model of a manufacturing resource appears, the extended step model is introduced to decide whether a check operation is needed. If the answer is true, the 3D model is highlighted to wait for the check result. The automatic identification system (RFID technology) is started by the assembly executive system, and information about current manufacturing resource is obtained. Whether the check operation is passed is determined by the extended assembly step model via judging each check item is satisfied by current manufacturing resource information. For a passed check operation, the assembly executive system will fill the check result into the extended assembly step model, and the 3D model of the manufacturing resource will appear normally to guide sequent assembly operations. Otherwise, the flow is pending until the check operation is passed or the flow is stopped. As to a non check operation needed manufacturing resource model, it will appear normally to guide sequent assembly operations. The above steps will be executed again and again until the 3D assembly process finishes.

As shown in [figure 9](https://www.intechopen.com/chapters/18088#F9), the framework is composed of the server layer and the assembly workstation layer. At the server side, an assembly executive system server is in charge of assembly executive scheduling and monitoring, and on-spot data management. It gets the 3D assembly process from the MPM (Manufacturing Process Management) system and manufacturing resource information from ERP (Enterprise Resources Planning) system. At the workstation side, an assembly executive system client is in charge of assembly operation guide, manufacturing resource validation and on-spot data collection. To obtain the manufacturing resource information automatically, the RFID (Radio Frequency Identification) technology is adopted. Each RFID tag is used to identify a manufacturing resource, such as operator, part, equipment and clamp. Additional information for check operation is saved in the RFID tag’s storage space. Therefore, a manufacturing resource’s check operation can be acted offline without communicating with database. Although barcode technology can also be used to identify manufacturing resource automatically, an online check operation is necessary because more information must be saved in the database other than the barcode tag.

![](https://cdnintech.com/media/chapter/18088/1512345123/media/image20.jpg)

#### Figure 8.

The automatic matching flow

![](https://cdnintech.com/media/chapter/18088/1512345123/media/image21.jpg)

#### Figure 9.

The implementation framework

### 4.3. An example

To illustrate the method discussed above, we developed a prototype system. As the core product in the Dassault Systemes’ 3DVIA Composer solution, the 3DVIA Composer is chosen to implement extended assembly steps. It is a desktop application for the creation of highly compressed lightweight product documentation contents directly from 3D digital product data. The ThingMagic’s M5E-MF4E RFID UHF reader and Psion Teklogix’s 7527C mobile terminal are used to read RFID tags. Some metal proof RFID tags are used to identify physical parts.

As shown in [figure 10](https://www.intechopen.com/chapters/18088#F10), this example covers two scenes.

![](https://cdnintech.com/media/chapter/18088/1512345123/media/image22.jpg)

#### Figure 10.

An example of interactive 3D assembly operation guide

The first one is part check before the assembly operation. When parts related to an assembly task arrives, the assembly executive system triggers the RFID reader to identify all parts. After matching with the BOM tree, a result comes out. If a part is not included, a shortage alarm is displayed. Then the operator should start a shortage report workflow to ensure all parts are provided.

The second one is assembly operation guide during the assembly operation. Guided by extended 3D assembly steps, the operator carry out assembly operations. When a part is needed, its model is highlighted and the animation pauses. And RFID reader is triggered to wait for the operator to pick up the right part. When a part is provided, the assembly executive system get the model’s unique ID by reading the RFID tag’s storage space or get information from database. If the physical part matches with the highlighted model, the system record the part’s ID and continues the extended 3D assembly step. Otherwise, the system keeps on waiting, until the queried part arrives. Under such circumstance, wrongness and missing in the assembly operation can be eliminated mostly.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 5\. Conclusion

This chapter presents two typical application cases of RFID Technology in the complex product assembly executive process. The first one solves the asynchrony problem between the logistics stream and the information stream in the complex product assembly executive process. The second one associates with the on-spot assembly operation guidance, and achieves dynamic matching mechanism between 3D models and physical parts. Both of them are discussed from methodology and implementation. These two cases illustrate potential of RFID technology’s application in enhancing controlling and monitoring methods of complex product assembly executive process.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## Acknowledgments

The research is under the support of the "National Natural Science Foundation of China" (NSFC, No.: 50805122) and the Science and Technology Innovation Foundation of Northwestern Polytechnical University (No. 2008KJ02017). Authors hereby thank them for the financial supports.

## References

1.  1. HsiehF. S.2006Robustness analysis of Petri nets for assembly/disassembly processes with unreliable resources. Automatica, 4211591166
2.  2. HuangG. Q.ZhangY. F.JiangP. Y.2007aRFID-based wireless manufacturing for walking-worker assembly islands with fixed-position layouts. Robotics and Computer-Integrated Manufacturing, 23469477
3.  3. HuangG. Q.ZhangY. F.JiangP. Y.2007bRFID-based wireless manufacturing for real-time management of job shop WIP inventories. The International Journal of Advanced Manufacturing Technology, DOIs00170-006-0897-4
4.  4. ZhouG.JiangP.2005Using Mobile Agents to Encapsulate Manufacturing Resources over Internet. The International Journal of Advanced Manufacturing Technology, 251189197
5.  5. NejadH. T. N.SugimuraN.IwamuraK.et al.2008Agent-based Dynamic Process Planning and Scheduling in Flexible Manufacturing System. Manufacturing Systems and Technologies for the New Frontier, 269274
6.  6. SunH.ChangZ.MoR.2009aMonitoring and controlling the complex product assembly executive process via mobile agents and RFID tags. Assembly Automation，293263271
7.  7. SunH.ChangZ.MoR.2009bAn interactive 3D assembly process model. Applied Mechanics and Materials, Vols. 16-19, 10871090
8.  8. BarataJ.Camarinha-MatosL.CandidoG.2008A multi agent-based control system applied to an educational shop floor. Robotics and Computer-Integrated Manufacturing, 24597605
9.  9. ChoiK. H.KimD. S.DohY. H.2007Multi-agent-based task assignment system for virtual enterprises. Robotics and Computer-Integrated Manufacturing, 23624629
10.  10. LuB. H.BatemanR. J.ChengK.2006RFID enabled manufacturing: fundamentals, methodology and applications. Int. J. Agile Systems and Management, 117392
11.  11. QiuaR. G.2007RFID-enabled automation in support of factory integration. Robotics and Computer-Integrated Manufacturing, 23677683
12.  12. TangX.ZhongS. S.2006Petri Nets Based Air craft Maintenance Disassembly and Assembly Process Planning. Journal of Civil Aviation University of China, 2452125in Chinese).
13.  13. ZhangW.FreiheitT.YangH.2005Dynamic scheduling in flexible assembly system based on timed Petri nets model. Robotics and Computer-Integrated Manufacturing, 216550558
14.  14. ZhongS.TangX.ChiS.2006Conflict of Shared Resource Oriented Modelling and Scheduling of Aero- engine Assembly Using Petri Nets. Aviation Precision Manufacturing Technology, 4265255in Chinese).

Written By

Huibin Sun

Submitted: 14 October 2010 Published: 15 June 2011

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18088/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS Download citation

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

© 2011 The Author(s). Licensee IntechOpen. This chapter is distributed under the terms of the [Creative Commons Attribution-NonCommercial-ShareAlike-3.0 License](https://creativecommons.org/licenses/by-nc-sa/3.0/), which permits use, distribution and reproduction for non-commercial purposes, provided the original is properly cited and derivative works building on this content are distributed under the same license.

### Continue reading from the same book

[View All](https://www.intechopen.com/books/445)

    [![Designing and Deploying RFID Applications](https://cdnintech.com/books/445/1713431904-1992221893/cover.jpg)    IntechOpen

Designing and Deploying RFID Applicatio... Edited by Cristina Turcu](https://www.intechopen.com/books/445)

#### [Designing and Deploying RFID Applications](https://www.intechopen.com/books/445)

Edited by [Cristina Turcu](https://www.intechopen.com/profiles/9302)

Published: 15 June 2011

Previous slide Next slide