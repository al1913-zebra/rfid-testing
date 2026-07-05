![](https://cdnintech.com/web/frontend/www/assets/06.115/journals/OpenAccessLock.svg)Open access

Written By

Yu-Cheng Lin, Weng-Fong Cheung, Yi-Chuan Hsieh, Fu-Cih Siao and Yu-Chih Su

Submitted: 17 March 2011 Published: 15 June 2011

DOI: 10.5772/17493

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18093/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18093/#)

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## Author Information

Show +

-   #### Yu-Cheng Lin \*
    
    -   National Taipei University of Technology/ Civil Engineering,, Taiwan
    
-   #### Weng-Fong Cheung \*
    
    -   National Taipei University of Technology/ Civil Engineering,, Taiwan
    
-   #### Yi-Chuan Hsieh \*
    
    -   National Taipei University of Technology/ Civil Engineering,, Taiwan
    
-   #### Fu-Cih Siao \*
    
    -   National Taipei University of Technology/ Civil Engineering,, Taiwan
    
-   #### Yu-Chih Su \*
    
    -   National Taipei University of Technology/ Civil Engineering,, Taiwan
    

\*Address all correspondence to:

## 1\. Introduction

Maintenance management is very important subject special in construction lab. To manage related information of equipments and instruments plays an important role in the view of construction lab management. Those equipments and instruments need high standard and requirement in precision and accuracy of tests. Managing maintenance work effectively is extremely difficult in construction lab owing to various equipments and instruments with different specification. Furthermore, it will take high cost to maintain those instruments in the good conditions for the test correctness. With the advent of the Internet, web-based information management solutions enable information dissemination and information sharing among related maintenance staff members. Generally, maintenance managers and staffs require access to the equipments and instruments location to handle inspection and maintenance work in construction lab. Usually, maintenance staffs generally use sheets of paper to handle various types of maintenance information, including checklists, specification, and maintenance procedure. Consequently, there is serious rework progress regarding the data capture and entry in maintenance progress. In order to enhance the effectiveness of inspection and maintenance work in construction lab, this study presents a novel system called Mobile RFID-based Maintenance Management (M-RFIDMM) system for the acquisition and tracing of lab equipments and instruments maintenance information on locations and providing an equipments and instruments maintains information sharing platform among all participants using web technology and RFID-enabled PDAs. Integrating promising information technologies such as RFID-enabled PDAs, Radio Frequency Identification (RFID) scanning and data entry mechanisms, can help improve the effectiveness and convenience of information flow in the maintenance management. The primary objectives of this study include (1) applying such a system that integrates RFID technology with RFID-enabled PDAs to increase the efficiency of equipments and instruments inspection and maintenance data collection, and (2) designing a web-based portal for equipments and instruments management and control, providing real-time information and wireless communication between offices and instruments locations. The M-RFIDMM is then applied in a construction lab in Taiwan to verify our proposed methodology and demonstrate the effectiveness of maintenance progress in construction lab. The combined results demonstrate that, an M-RFIDMM system can be a useful web-based lab maintenance management platform by utilizing the RFID approach and web technology. With appropriate modifications, the M-RFIDMM system can be utilized at any instruments inspection and maintenance service for maintenance management divisions or suppliers in support of the M-RFIDMM system.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 2\. Problem statement

Maintenance management performance can be enhanced by using web technology for information sharing and communication. Information acquisition problems in instruments management follow from most of the data and information being gathered from the instruments location in construction lab. The effectiveness of information and data acquisition influences the efficiency of maintenance execution. Usually, maintenance managers and staff members generally use sheets of paper and/or field notes for maintenance progress in Taiwan construction lab. Restated, existing means of processing information and accumulating data are not only time-consuming and ineffective, but also compromise maintenance management in information acquisition. Such means of communicating information between instruments location and office, and among all participants, are ineffective and inconvenient. According to the questionnaire survey, the primary problems in inspection and maintenance regarding to data capture and sharing are as follows: (1) the efficiency and quality are low, especially in the inspection and maintenance progress in instruments management through document-based media, and (2) there are serious rework progress regarding the data capture and input in inspection and maintenance progress. However, few suitable platforms are developed to assist maintenance staff members with capturing and sharing the inspection and maintenance information when maintenance staff members need to handle inspection and maintenance work. Therefore, to capture data effective and enhance information communication in construction lab will be primary and significant challenge in the study.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 3\. Research objectives

This study utilizes the RFID and web technology to enhance the maintenance progress and effectiveness in instruments management service. This system is controlled by the management division, and provides maintenance managers and maintenance staff members with real-time instruments-related information-sharing services, enabling them to dynamically respond to the entire maintenance management network. This study develops Mobile RFID-based maintenance management (M-RFIDMM) system to improve efficiency and cost-effectiveness of instruments management, improve practical communication among participants, and increase flexibility in terms of service delivery and response times. M-RFIDMM system is a web-based system for effectively integrating maintenance managers, maintenance staff members and relative members, to enhance the instruments maintenance management in the construction lab. PDAs can extend M-RFIDMM systems from offices to instruments locations. Data collection efficiency can also be enhanced using RFID-enabled PDAs to enter and edit data on the instruments location. By using web technology and mobile devices, the M-RFIDMM system for the management division has tremendous potential to increase the efficiency and effectiveness of information flow, thus streamlining services processes with other participants. Maintenance managers and staff members frequently waste time by travelling to obtain information in the absence of other efficient means of communication. The portal and PDAs enable maintenance staff members to update data from the instruments location and immediately upload it to the system; Maintenance managers can receive maintenance information and make better decisions regarding future instruments management and control.

The main purposes of this study include (1) developing a framework for a mobile maintenance management system for instruments in the lab; (2) applying such a system that integrates RFID technology with PDA technology to increase the efficiency of instruments inspection and maintenance data collection in the lab; (3) designing a web-based portal for maintenance management and control, providing real-time information and wireless communication between offices and instruments locations, and (4) Evaluating the effectiveness of the proposed system in construction lab. [Figure 1](https://www.intechopen.com/chapters/18093/#F1) illustrates solutions used in a real case utilized M-RFIDMM system in Taiwan construction lab. With appropriate modifications, the M-RFIDMM system can be utilized at any instruments inspection and maintenance service for maintenance management divisions or managers in support of the M-RFIDMM system.

![Figure 1.M-RFIDMM System Framework Overview](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image2.png)

#### Figure 1.

M-RFIDMM System Framework Overview

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 4\. Background research

RFID is an automatic identification solution that streamlines identification and data acquisition, operating similarly to bar codes. Automatic identification procedures have recently become very popular in numerous service industries for purchasing and distribution logistics, and in manufacturing companies and material flow systems. [Jaselskis and Anderson (1995](https://www.intechopen.com/chapters/18093/#B8)) investigated the applications and limitations of RFID technology in the construction industry, and attached read/write RFID tags to the surfaces of concrete test that were cast from the job site to test lab. This RFID technology has been widely applied in many areas in the construction industries for the following reasons: (1) to provide owners and contractors with information to enhance operation using RFID technology ([Jaselskis and Tarek, 2003](https://www.intechopen.com/chapters/18093/#B9)); (2) to propose a novel concept of “parts and packets unified architecture” in order to handle data or information related to a product carried by product itself by utilizing RFID technology ([Yagi et al., 2005](https://www.intechopen.com/chapters/18093/#B21)); (3) to apply RFID technology as a solution to problems in pipe spools, and identify potential economic benefits from adopting RFID technology in automated tracking ([Song et al., 2006](https://www.intechopen.com/chapters/18093/#B15)); (4) to apply RFID combined with GIS technology in order to locate precast concrete components with minimal worker input in the storage yard ([Ergen et al., 2006](https://www.intechopen.com/chapters/18093/#B5)); (5) to improve the efficiency of tracing tools and tool availability using RFID ([Goodrum et al., 2006](https://www.intechopen.com/chapters/18093/#B7)); (6) to develop mobile construction supply chain system integrated with RFID technology ([Wang et al., 2006](https://www.intechopen.com/chapters/18093/#B19)); (7) to describe a prototype of an advanced tower crane equipped with wireless video control and RFID technology ([Lee et al., 2006](https://www.intechopen.com/chapters/18093/#B11)); (8) to improve tracing of material on construction using materials tagged with RFID tags ([Song et al., 2006](https://www.intechopen.com/chapters/18093/#B15)); (9) to present strategy and information system to manage the progress control of structural steel works using RFID and 4D CAD ([Chin et al., 2008](https://www.intechopen.com/chapters/18093/#B2)); (10) to enhance precast production management system integrated with RFID application ([Yin et al., 2009](https://www.intechopen.com/chapters/18093/#B22)), and (11) to present a new methodology for managing construction document information using RFID-based semantic contexts ([Elghamrawy and Boukamp, 2010](https://www.intechopen.com/chapters/18093/#B3)).

The use of technology to improve delivery process control is not a novel concept. Many industries have applied barcodes to track materials for many years. Construction companies began to examine the use of barcodes for tool management in the early 1990s. Although barcode is an established and affordable technology, it has presented problems in the construction industry due to the short read range and poor durability of barcodes — a barcode requires a line of sight, and becomes unreadable when scratched or dirty.

An RFID system is composed of an RFID tag and an RFID reader. The RFID tag comprises a small microchip and an antenna. Data are stored in the tag, generally as a unique serial number. The RFID tags can be either passive (no battery) or active (battery present). Active tags are more expensive than passive tags and have a read range of 10–100 meters. Passive tags have a read range of 10mm to approximately 5m ([Manish and Shahram, 2005](https://www.intechopen.com/chapters/18093/#B12)). The vast majority of RFID tags applied in the construction industries are passive.

The RFID reader functions as a transmitter/receiver. The reader transmits an electromagnetic field that “wakes up” the tag and provides the power required for it to operate ([Lahiri, 2005](https://www.intechopen.com/chapters/18093/#B10)). The tag then transfers data to the reader via the antenna. This data are then read by the RFID reader, and transferred to a Pocket PC or computer. Unlike barcodes, RFID tags do not require line-of-sight to be read; they only need to be within the reader’s radio range. Additionally, RFID tags, unlike barcodes, can be read through most materials. RFID tags are shrinking, with some measuring only 0.33mm across. Although RFID systems can apply different frequencies, the most common frequencies are low (125KHz), high (13.56MHz) and ultra-high (UHF) (850–900MHz) ([Lahiri, 2005](https://www.intechopen.com/chapters/18093/#B10)).

Notably, RFID systems are one of the most anticipated technologies that will potentially transform processes in the engineering and construction industries. In the construction industry, RFID technology can be utilized with PDAs, thereby allowing staff members to integrate seamlessly work processes at labs and sites, due to the ability to capture and carry data. With a RFID scanner plugged into a PDA, the RFID-enabled PDA is a powerful portable data collection tool. Additionally, RFID readings increase the accuracy and speed of information communication, indirectly enhancing performance and productivity.

The advantages of using mobile devices in the construction industry are well documented ([Baldwin et al., 1994](https://www.intechopen.com/chapters/18093/#B1); [Fayek et al., 1998](https://www.intechopen.com/chapters/18093/#B6); [McCullough, 1997](https://www.intechopen.com/chapters/18093/#B13)). Moreover, mobile devices have been applied in numerous construction industries, to provide the following support: (1) providing wearable field inspection systems ([Sunkpho and Garrett, 2003](https://www.intechopen.com/chapters/18093/#B17)); (2) supporting pen-based computer data acquisition for recording construction surveys ([Elzarka and Bell, 1997](https://www.intechopen.com/chapters/18093/#B4)); (3) supporting collaborative and information-sharing platforms ([Pena-Mora and Dwivedi, 2002](https://www.intechopen.com/chapters/18093/#B14)); (4) using mobile computers to capture data for piling work ([Ward et al., 2003](https://www.intechopen.com/chapters/18093/#B20)), and (5) utilizing mobile devices in construction supply chain management systems ([Tserng et al., 2005](https://www.intechopen.com/chapters/18093/#B18)).

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 5\. System implementation

### 5.1. System architecture

The M-RFIDMM system has three main components, a PDA, RFID and a portal. Significantly, both the PDA and RFID components are located on the client side, while the portal is on the server side. All instruments-related information acquired by maintenance staff members within the M-RFIDMM system is recorded in a centralized M-RFIDMM system database. All staff members can access required information via the portal based on their access privileges. Moreover, the portal is limited by design to thirty persons logging in when all participants acquire the same case information at same time. The M-RFIDMM system extends the RFID-based instruments management system from the office to instruments locations to assist with inspection and maintenance services, while the M-RFIDMM system primarily deals with data transactions in all departments or systems integration. When the data are updated on the M-RFIDMM system, e-mails are automatically sent from the server to the maintenance managers of the management division and to staff members involved in the relevant activity. The M-RFIDMM system consists of an inspection and management portal integrated with mobile devices and RFID technology (RFID-enabled PDA). Each module is briefly described below.

RFID Module of M-RFIDMM System

The RFID technology can be either a passive or active system. The major difference between an active and a passive RFID system is that an active tag contains a battery, and can transmit information to the reader without the reader generating an electromagnetic field. The case study uses UHF passive RFID technology due to budget restrictions and long distance read range requirement.

Mobile Device (PDA) Module of M-RFIDMM System

The M-RFIDMM system adopts a Unitech RH676 with an UHF RFID Reader as the RFID-enabled PDA hardware. Unitech RH676 PDA is operated on Windows CE. All data files in the PDA module are transmitted to the server directly through the web. The Internet explorer 6 was chosen as web browser in the RFID-enabled PDA hardware system.

Web Portal Module of M-RFIDMM System

The web portal is an information hub in the M-RFIDMM system for an instruments management. The web portal enables all participants to log onto a single portal, and immediately obtain information required for planning. The users can access different information and services via a single front-end on the Internet. For example, a customer can log onto the portal, enter an assigned security password, and access real-time inspection schedule information. A general contractor can check the test or inspection status, availability of reports and various other case-related data. The web portal of M-RFIDMM system is based on the Microsoft Windows 2000 operating system with Internet Information Server (IIS) as the web server. The prototype was developed using ASP.NET, which are easily combined with HTML and JavaScript technologies to transform an Internet browser into a user-friendly interface. The web portal provides a solution involving a single, unified database linked to all functional systems with different levels of access to information, based on user role, both within an organization and across organizations and other members.

### 5.2. Modules of system functions

This section describes the implementation of each module in the M-RFIDMM system.

Test Report Module:

The report module provides maintenance staff members with a complete record of inspection and maintenance performed in the maintenance management.

Inspection and Maintenance Module:

Maintenance staff members can download the most up-to-date maintenance schedule from the Internet, and enter instrument maintenance results directly via a PDA. Additionally, PDAs display the checklist for every instrument maintenance task. Maintenance staff members can record instrument information for dates, conditions, inspection result, descriptions of problems and suggestions that have arisen during maintenance. Furthermore, maintenance staff members can also mark unacceptable tasks, and select relevant tasks from lists in the PDA. The module has the benefit that maintenance staff members can enter/edit inspection and maintenance test results, and all test records can be transferred between the PDA and portal by real-time synchronization, eliminating the need to enter the same data repeatedly.

Progress Monitor Module:

This module is designed to enable maintenance staff members to monitor the progress of inspections and maintenance. Additionally, maintenance managers and staff members can access the progress or condition of inspection and maintenance tasks. The progress monitor module provides an easily accessed and portable environment where maintenance staff members can trace and record all information regarding the status of inspections delivered to the maintenance or scheduled for repair.

E-Documents Module:

This module allows maintenance staff members to download manuals and specifications in advance, and reference them during inspection. This module also has a search function that enables the information to be found and retrieved easily, which is a valuable feature in dynamic environments. Moreover, maintenance staff members who do not need paper-based manuals or specifications can download e-manuals or e-specifications and access them directly using their PDAs.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 6\. Case study

This study is applied in Taiwan construction lab for the case study. This study utilizes an M-RFIDMM system in the instruments maintenance management in construction lab. Existing approaches for tracking and managing instruments maintenance adopt manually updated paper-based records. The most of inspection in maintenance work were paper-based work by manual entry although instruments maintenance management system was developed for information management. However, information collected by staff members using such labor-intensive methods is rework and ineffective in the maintenance results entry. Therefore, maintenance management division and maintenance staff members utilized the M-RFIDMM system to enhance instruments inspection and maintenance management in the case study. UHF Passive read/write RFID tags were used in the case study. After the critical instruments were selected, each UHF RFID tag for the instruments was made, and the unique ID of the instrument was entered into the M-RFIDMM system database. After the instrument was assigned to be monitored for maintenance, the instrument was scanned with a RFID tag to enter the M-RFIDMM system.

![Figure 2.Displayed the UHF RFID tags using in the case study.](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image3.jpeg)

#### Figure 2.

Displayed the UHF RFID tags using in the case study.

![Figure 3.Displayed the instrument attached UHF RFID tag in the case study (1).](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image4.jpeg)

#### Figure 3.

Displayed the instrument attached UHF RFID tag in the case study (1).

During the setup phase, all the ID of instrument in the RFID tag had been determined and entered the database for system, and then the RFID tag was attached in the instrument. Finally, the tag will be scanned and checked before the maintenance work. Furthermore, the tag suggested to be attached on the non-metal surface (like wooden box) or placed a formcore (about 5 mm) for the interface for decreasing the influence because the RFID tag will be influenced by metal facilities (see [Fig. 2](https://www.intechopen.com/chapters/18093/#F2)\-[Fig.4)](https://www.intechopen.com/chapters/18093/#F4).

![Figure 4.Displayed the instrument attached UHF RFID tag in the case study (2).](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image5.jpeg)

#### Figure 4.

Displayed the instrument attached UHF RFID tag in the case study (2).

![Figure 5.Displayed maintenance staff member used RFID-enabled PDA to scan RFID tags (1).](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image6.jpeg)

#### Figure 5.

Displayed maintenance staff member used RFID-enabled PDA to scan RFID tags (1).

![Figure 6.Displayed maintenance staff member used RFID-enabled PDA to scan RFID tags (2).](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image7.jpeg)

#### Figure 6.

Displayed maintenance staff member used RFID-enabled PDA to scan RFID tags (2).

![Figure 7.Displayed maintenance staff member entered the result of inspection, edited the description in the PDA.](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image8.jpeg)

#### Figure 7.

Displayed maintenance staff member entered the result of inspection, edited the description in the PDA.

Before the inspection/maintenance work, the instruments staff members can check the instrument list from PDA, refer the relative information and can make the preparation work without printing any paper document. During the inspection/maintenance progress, the instruments staff member scanned the RFID tag first and to confirm the instrument, then checked the further detail information like maintain procedure, notification, and fittings (see [Fig. 5](https://www.intechopen.com/chapters/18093/#F5) and [6](https://www.intechopen.com/chapters/18093/#F6)). The system would support any information of instrument via browser under wireless circumstance. After the instruments were inspected, staff members recorded the status and execute the work by procedure. After the operation, instruments staff member entered the result of inspection, edited the description in the PDA, and provided the updated information to the system (see [Fig. 7)](https://www.intechopen.com/chapters/18093/#F7). Once the instrument was break and need to be repaired, the system also can provide the supplier information and handle the problem immediately. Finally, the instruments manager and the authorized staff members accessed the updated information from office synchronously.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 7\. Field tests and results

Overall, the field test results indicate that UHF passive RFID tags are effective tools for instruments maintenance management in construction lab. All tags survived use in the instruments environment over one month testing period. The number of instruments for inspection and maintenance progress in field trials was around fifty. The M-RFIDMM system was installed on main server in the instruments management division of the construction lab. During the field trials, verification and validation tests were performed to evaluate the system. The verification aims to evaluate whether the system operates correctly according to the design and specification; and validation evaluates the usefulness of the system. The verification test was carried out by checking whether the M-RFIDMM system can perform tasks as specified in the system analysis and design. The validation test was undertaken by asking selected case participators to use the system, and provide feedback by answering a questionnaire. The case participators consisted of two maintenance managers with 6 years of experience; six maintenance staff members with 5 years of experience above in the case study. To evaluate system function and the level of system capability satisfaction, we distributed questionnaires, and the users of the system were asked to grade the conditions of system testing, system function, and system capability separately, compared with the typical paper-based maintenance method, on the five Likert scale. Some comments for future improvements of M-RFIDMM system were also obtained from the case participators through user satisfaction survey. [Table 1](https://www.intechopen.com/chapters/18093/#T1) shows a comparison of the approximate time required for a typical instruments maintenance service using a traditional paper-based inspection approach and the proposed system. The next section presents the detailed results of the performance evaluation and the user survey conducted during the field trials.

![Table 1.System Evaluation Result](https://www.intechopen.com//cdnintech.com/media/chapter/18093/1512345123/media/image9_w.jpg)

#### Table 1.

System Evaluation Result

The 88% obtained from user satisfaction survey indicates that the M-RFIDMM system is quite adaptable to the current instruments maintenance management practices in construction lab, and is attractive to users. This result implies that the M-RFIDMM system was well designed, and could enhance the current time-consuming instruments maintenance process.

The 88 % obtained from maintenance staff members satisfaction survey indicates that the system automatically generated all documentation, and accumulated the related historical data in the central database server. The maintenance staff members could thus collect maintenance data, and send them electronically to the M-RFIDMM system. No additional work was required for any documentation or maintenance analysis after the data collection.

The 25% user shows the PDA is not so easy to operate because some of staff members are not used to use PDA in the beginning.

The advantages and disadvantages of M-RFIDMM system identified from the real case studies application are identified. However, over 80% of users obtained from maintenance staff members’ satisfaction survey agree that the M-RFIDMM system is useful for improving the efficiency and effectiveness of automated data acquisition and information sharing in instruments maintenance service, thus assisting maintenance managers and maintenance staff members in managing and monitoring the maintenance progress of instruments in the building. UHF Passive tags are less expensive than active tags. Thus, UHF passive tags are suited to instruments maintenance management.

The use of RFID and web technology to collect and capture information significantly enhanced the efficiency of inspection and maintenance processes of instruments. RFID readers and tags are widely thought likely to improve in the future and significantly improving the maintenance processes efficiency.

In the cost analysis, the UHF tags adopted in this study cost under $0.2 US dollars each in 2010. The cost of these tags is decreasing every year. The total cost of the equipment applied in this study was $3250 US dollars (including RFID-enabled PDA reader and one server personal computer). Even the reader initial cost is higher, but it is function expandable and really decreases human work. Experimental results demonstrate that M-RFIDMM system can significantly enhance the instruments maintenance progresses. The use of RFID significantly decreases the overall maintenance operation time and human cost.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 8\. Conclusions

This study presents a Mobile RFID-based Maintenance Management (M-RFIDMM) system that incorporates RFID technology and mobile devices to improve the effectiveness and convenience of information flow during maintenance phase in construction lab. The M-RFIDMM system not only improves the acquisition of data on instruments maintenance efficiency using RFID-enabled PDA, but also provides a real time service platform during instruments maintenance progress. In the case study, plugging a RFID scanner into a PDA creates a powerful portable data collection tool. Additionally, RFID readings increase the accuracy and speed of information search, indirectly enhancing performance and productivity. Maintenance staff members use RFID-enabled PDAs to enhance seamlessly maintenance work processes at instruments locations, owing to its searching speed and ability to support any information during the process. Meanwhile, on the server side, the M-RFIDMM system offers a hub center to provide instruments management division with real-time to monitor the maintenance progress. In the case study, the application of the M-RFIDMM system helps to improve the process of inspection and maintenance work for the construction lab in Taiwan. Based on experimental result, this study demonstrated that UHF passive RFID technology has significant potential to enhance inspection and maintenance work in instruments management. The integration of real-time maintenance information from instruments helps maintenance staff members to track and control the whole inspection and maintenance progress. Compared with current methods, the combined results demonstrate that, an M-RFIDMM system can be a useful web-based lab maintenance management platform by utilizing the RFID approach and web technology.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 9\. Recommendations

Recommendations for implementing the proposed system in the future are given below.

-   Cost is a currently significant factor limiting the widespread use of RFID tags in the construction industry. Passive tags are cheaper than active tags. Therefore, passive tags are suited to the instruments management.
    
-   If the RFID tag needs to be placed the interface of the metal instruments, the RFID tag should be isolated by formcore (over 3mm) or other non-metal formcore to avoid influence from metal instruments.
    
-   The PDA screen is not large enough for operating the M-RFIDMM system fluently. The system should be redesigned and developed to be suitable for the PDA screen.
    
-   It is necessary to consider the usage time of RFID. Currently, the average of longest time regarding to RFID tags is ten year. Therefore, if the instruments need to track over ten years then the RFID tag should be attached to replace easily and workable.
    

## References

1.  1. BaldwinA. N.ThorpeA.AlkaabiJ. A.1994Improved material management through bar-code: results and implications of a feasibility study,” Proceedings of the institution of Civil Engineers, Civil Engineering, 102(6), 156-162.
2.  2. ChinS.YoonS.ChoiC.ChoC.2008RFID+4D CAD for progress management of structural steel works in high-rise buildings,”Journal of Computing in Civil Engineering, ASCE, 22(2), 74-89.
3.  3. ElghamrawyT.BoukampF.2010Managing construction information using RFID-based semantic contexts,” International Journal of Automation in Construction, 19(8), 1056 EOF1066 EOF
4.  4. ElzarkaH. M.BellL. C.1997Development of Pen-Based Computer Field Application,” Journal of Computing in Civil Engineering, ASCE, 11(2), 140 EOF
5.  5. ErgenE.AkinciB.SacksR.2006Tracking and locating components in a precast storage yard utilizing radio frequency identification technology and GPS,” International Journal of Automation in Construction,doi:10.1016/j.autcon.2006.07.004.
6.  6. FayekA.AbouRizk. S.BoydB.1998Implementation of automated site data collection with a medium-size contractor,” in Proc. ASCE Computing in Civil Engineering, Boston, MA, 4546
7.  7. GoodrumP. M.Mc LarenM. A.DurfeeA.2006The application of active radio frequency identification technology for tool tracking on construction job sites,” International Journal of Automation in Construction, 15(3), 292 EOF302 EOF
8.  8. JaselskisE. J.AndersonM. R.1995Radio-Frequency Identification Applications in Construction Industry," Journal of Construction Engineering and Management, 121(2), 189 EOF
9.  9. JaselskisE. J.El -MisalamiTarek.2003Implementing Radio Frequency Identification in the Construction Process," Journal of Construction Engineering and Management, 129(6), 680 EOF688 EOF
10.  10. Lahiri, Sandip2005RFID Sourcebook, Prentice Hall PTR.
11.  11. Lee-KyunUng.Kang-InKyung.Kim-HeeGwang.2006Improving Tower Crane Productivity Using Wireless Technology.” Journal of Computer-Aided Civil and Infrastructure Engineering, 21594604
12.  12. Manish Bhuptani and Shahram Moradpour2005RFID Field Guide : Deploying Radio Frequency Identification Systems, Prentice Hall PTR.
13.  13. Mc CullouchB. G.1997Automating field data collection in construction organizations,” in Proc. ASCE Construction Congress V, Minneapolis, MN, 95763
14.  14. Pena-MoraF.DwivediG. D.2002Multiple Device Collaborative and Real Time Analysis System for Project Management in Civil Engineering,” Journal of Computing in Civil Engineering, ASCE, 16(1), 23 EOF38 EOF
15.  15. SongJ.HaasC. T.CaldasC.2006Tracking the Location of Materials on Construction Job Sites,” Journal of Construction Engineering and Management, 132(9), 680-688.
16.  16. SongJ.HaasC. T.CaldasC.ErgenEsin.AkinciB.2006Automating the task of tracking the delivery and receipt of fabricated pipe spools in industrial projects,” International Journal of Automation in Construction, 15(2), 166177
17.  17. SunkphoJirapon.GarrettJ. H.Jr 2003Java Inspection Framework: Developing Field Inspection Support System for Civil Systems Inspection,” Journal of Computing in Civil Engineering, ASCE, 17(4), 209 EOF218 EOF
18.  18. TserngH. P.DzengR. J.LinY. C.LinS. T.2005Mobile Construction Supply Chain Management Using PDA and Bar Codes.” Journal of Computer-Aided Civil and Infrastructure Engineering, 20242264
19.  19. WangL. C.LinY. C.LinP. H.2006Dynamic Mobile RFID-based Supply Chain Control and Management System in Construction.” International Journal of Advanced Engineering Informatics- Special Issue on RFID Applications in Engineering, 21377390
20.  20. WardM. J.ThorpeA.PriceA. D. F.2003SHERPA: mobile wireless data capture for piling works, “Computer-Aided Civil and Infrastructure Engineering, 18299314
21.  21. Yagi, Junichi, Arai, Eiji and Arai, Tatsuo2005Construction automation based on parts and packets unification," International Journal of Automation in Construction, 12(1), 477-490.
22.  22. YinY. L.TserngH. P.WangJ. C.TsaiS. C.2011Developing a precast production management system using RFIF Technology,” International Journal of Automation in Construction, 18(5), 677-691.

### Sections

Author information

-   1.Introduction
-   2.Problem statement
-   3.Research objectives
-   4.Background research
-   5.System implementation
-   6.Case study
-   7.Field tests and results
-   8.Conclusions
-   9.Recommendations

References

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18093/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS Download citation

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-open-book.svg) View Book Chapters [![IntechOpen](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/svg/logoSmall_red.svg) Publish with IntechOpen](https://www.intechopen.com/publish)

Next chapter

#### What are Authentic Pharmaceuticals Worth?

By Matthieu Schapranow, Jürgen Müller, Martin Lorenz, Alexander Zeier and Hasso Plattner

2,156 downloads | 3 cites

Written By

Yu-Cheng Lin, Weng-Fong Cheung, Yi-Chuan Hsieh, Fu-Cih Siao and Yu-Chih Su

Submitted: 17 March 2011 Published: 15 June 2011

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18093/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18093/#)

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