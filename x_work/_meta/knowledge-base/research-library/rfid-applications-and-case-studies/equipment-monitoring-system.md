![](https://cdnintech.com/web/frontend/www/assets/06.115/journals/OpenAccessLock.svg)Open access

Written By

Mohd Helmy Abd Wahab, Herdawatie Abdul Kadir, Zarina Tukiran, Noraisah Sudin, Mohd Hafizz Ab. Jalil and Ayob Johari

Submitted: 29 October 2010 Published: 15 June 2011

DOI: 10.5772/18776

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18092/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18092/#)

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## Author Information

Show +

-   #### Mohd Helmy Abd Wahab \*
    
    -   Universiti Tun Hussein Onn Malaysia,, Malaysia
    
-   #### Herdawatie Abdul Kadir \*
    
    -   Universiti Tun Hussein Onn Malaysia,, Malaysia
    
-   #### Zarina Tukiran \*
    
    -   Universiti Tun Hussein Onn Malaysia,, Malaysia
    
-   #### Nor’aisah Sudin \*
    
    -   Universiti Tun Hussein Onn Malaysia,, Malaysia
    
-   #### Mohd Hafiz A. Jalil \*
    
    -   Universiti Tun Hussein Onn Malaysia,, Malaysia
    
-   #### Ayob Johari \*
    
    -   Universiti Tun Hussein Onn Malaysia,, Malaysia
    

\*Address all correspondence to:

## 1\. Introduction

Automated monitoring systems are becoming trends, creating easier method to identify item, tracking, monitoring and add on security values. In places where there are lots of items accessed by many users, the tendency of loss is high due to weakness in items monitoring. Here, we briefly describe our research on the university’s laboratory perspectives. The main aim of the research is to work out a generic approach of monitoring items in a place with several rooms. For example, there are laboratories with expensive equipments are available in a university to support teaching and learning session. Conventional approach of checking items for every session is difficult for lab administrator as most libraries are being used by more than 20 students per session.These leads to a challenge for lab administrator to monitor the flow of these items are always in place. Currently, the monitoring of laboratory equipments is performed manually by the lab administrator during each laboratory sessions. For every loan of equipment, a log book needs to be filled up in order to keep track the transaction information.This system was found to have a lot of weaknesses such as misuse of the equipment log records, losses of equipment, no in-out transaction record and misplace of equipments. To automate the process, Radio Frequency Identification (RFID) is identified as one of the most practical and applicable in real time implementation in-line with the nature where most of the systems are made computerized. In this paper, a solution has been provided for the problem encountered in laboratory equipment monitoring system using RFID technology. Therefore RFID-based monitoring system has been designed and developed to solve the problem associated with the handling of laboratory equipments. This chapter is organised as follows. Section 2 describes related works on RFID-based monitoring system. The architecture of the system is mentioned in section 3. Application scenario and the implementation are briefly explained in section 4 and 5 respectively. Finally, the chapter is concluded in Chapter 6.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 2\. Related work on RFID in monitoring

RFID is a wireless automatic identification that is gaining attention and is considered by some to emerge as one of the pervasive computing technologies in history (Roberts, 2006). As the technology grows very rapidly, RFID has received considerable worldwide attention and widely used in monitoring and tracking ranging from human identification to product identification. Previous research has successfully indicated that RFID has been increasingly expanded in various fields such as retail supply chain, asset tracking, postal and courier services, education, construction industry, medical, and etc.

The work presented by [Tan and Chang (2010](https://www.intechopen.com/chapters/18092/#B12)) who had developed an RFID-based e-restaurant system to change the traditional restaurant services which is considered as passive. The utilization of RFID is to improve the service quality which is customer-centered that enable waiters to immediately identify customers via their own RFID-based membership card. It can also provide customized services such as enhanced dining table service; pay the bills, instant transmission of customer orders to kitchens and flexibility of managing payments of bills and discounts. However, in [Ngai et. al. (2008](https://www.intechopen.com/chapters/18092/#B7)), designed and developed RFID-based sushi management system to help a conveyor belt sushi restaurant to achieve better inventory control, responsive replenishment, and food safety control, as well as to improve its quality of service.

In the perspective of animal tracking or livestock monitoring management system, [Vouldimos et. al. (2010](https://www.intechopen.com/chapters/18092/#B13)) developed FARMA project which combined with RFID technology and mobile wireless networking to track animal and the data in repository which contains animal data records. The purposes of the system are to identify animal in case it gets lost and identify some basic information about particular animals. A similar work done by [Nor Suryani Bakeri et. al. (2007](https://www.intechopen.com/chapters/18092/#B7)) and [Ahmad Rafiq Adenan et. al. (2006](https://www.intechopen.com/chapters/18092/#B1)) developed a livestock monitoring system using RFID. An RFID tag is used and attached to each livestock to monitor its movement in and out as well as the basic information about any particular animals.

The use of RFID also could assist in customs clearance process by reducing the delay time. According to [Hsu, Shih and Wang (2009](https://www.intechopen.com/chapters/18092/#B5)), the use of RFID can improve the efficiency of cargo process, and reduce the inventory and labor cost. The work presented based on the mathematical model of the customs clearance process-delay and the network of customs delay is reconstructed based on the use of RFID. RFID also has been successfully applied in global postal and courier services in monitoring the parcel delivery. One of the well known courier service company is DHL which has been using RFID in their services since 1988 and carried out 20 trials on active and passive technology and successfully proved it improved the service and reduce the costs ([EPC Global, 2005](https://www.intechopen.com/chapters/18092/#B2)). The application of RFID in global market in postal and courier services contribute 650 billion per year and Europe was the leader in utilizing RFID in postal and courier services ([Zhang, et. al., 2006](https://www.intechopen.com/chapters/18092/#B15)).

High quality service lead to customer satisfaction, increase market share, and enhance profitability of service organizations (Hoffman and Bateson, 1997). [Oztaysi, Baysan, and Akpinar (2009](https://www.intechopen.com/chapters/18092/#B10)) have done a study to investigate the possibility of using RFID as a tool for improving service quality in hospitality industry and primarily concern in tourism industry.

In monitoring of asset tracking, an effective and efficient managing the tracking of medical-assets in healthcare facilities can be performed by the means of RFID. [Oztekin et. al. (2010](https://www.intechopen.com/chapters/18092/#B9)) has done a study using enhanced maximal covering location problem along with critical index analysis metric to optimize the design of a medical-asset tracking system constrained by a limited number of RFID readers. Results indicate that the proposed technique has improved by 72% compared to the currently utilized expert placement strategy.

[Yan and Lee (2009](https://www.intechopen.com/chapters/18092/#B14)) developed RFID application in Cold Chain monitoring system to track the cold-chain product flowing in supply chain, ensure the products’ quality and comply with relevant provisions during transportation. The system executes in real-time environment and can track the location and monitor the temperature of cold-chain products to ensure the quality. However, according to [Loebbecke (2005](https://www.intechopen.com/chapters/18092/#B6)) has done a research regarding the application of RFID in retail supply chain at a brink-and-mortar supermarket to investigate the advantages and challenges with the early RFID applications in terms of technological issue such as standardization, challenges on the data, network and application layers.

[Haron, et. al. (2010)](https://www.intechopen.com/chapters/18092/#B3), designed and developed of a context aware notification system for university students using RFID. The system aims to deliver urgent notifications to the intended students immediately at their respective locations. A quite similar work done by [Herdawatie et. al. (2010](https://www.intechopen.com/chapters/18092/#B4)) which integrates RFID and biometric sensor to track students in a boarding school of their location at the selected restricted area.

As summary, based on the successful of RFID applications in various fields as discussed above, it shows that its application is endless. This section onwards explains the RFID application in tracking of laboratory equipments movement to ensure its availability. It also aims at helping the lab administrator in monitoring the equipment from lost or misplaced. The monitoring of equipments movement is not only being monitored by the lab administrator but also by the top management through online databases.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 3\. System architecture

Building an automated tracking applications by integrating web services guarantee many benefits, such as reduce clerical task and ease the management burden. The RFID-based Equipment Tracking System is an integrated system that offers an effective solution of managing items especially for large scale environment. It combines the RFID technology and security devices to ensure the items are always been monitored and secured. The system enable the university to give admission to selected individual to access locations, permit movement of items, record the important data and also enable the viewing of record via internet.

A faculty usually has a number of laboratories. Faculties with technical courses such as Information Technology and Engineering usually have more laboratories. To implement the system, an appropriate design is required to make sure it is suitable for the number of laboratories and equipments in all laboratories. In this study, the design of the system which utilizes RFID is divided into two; hardware design and software design as shown in the architecture diagram in [Figure 1](https://www.intechopen.com/chapters/18092/#F1).

There are six important components involved as illustrated in [Fig. 1](https://www.intechopen.com/chapters/18092/#F1), (1) RFID Tag, (2) RFID Reader, (3) Personal Computer, (4) RS232 Cable, and (5) LAN HUB and 6) CCTV Camera The master server contains the database which is used to store all data collected from RFID reader where user can read or change information in the database. The RFID tags contain antennas to enable the receiving and transferring data. The passive RFID tag creates power from magnetic field and use it to energize the circuits of the RFID chip and sends information back to the reader in the form of radio-frequency waves. The physical layer of the system is depicted in [Figure 2](https://www.intechopen.com/chapters/18092/#F2). It shows how the computers and the master server are connected. The software involved in developing the system is also outlined.

In the system, RFID technology were implemented to enable data to be automatically recorded where each tag is embedded in the metric card (working pass) for individual and attached to each equipments. The lab administrator will grant an access to selected individual to enter a laboratory and also enable selected individual to move items out from the lab and within the organization. Upon the individual is found attempt to force the process the camera is triggered and activated to document the image of intended person and buzz the alarm system and notify the person-in-charge.

![Figure 1.System Architecture](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image2.jpeg)

#### Figure 1.

System Architecture

![Figure 2.Physical layer of the system](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image3.jpeg)

#### Figure 2.

Physical layer of the system

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 4\. Application scenarios

The developed prototype is an online laboratory monitoring system that has three purposes; which typically composed of (1) Laboratory grant access (2) Inventory control, and (3) Online data viewing. The prototype has been applied at the UTHM research project lab. To illustrate the concept, a sample of layout of application was provided in [Figure 3](https://www.intechopen.com/chapters/18092/#F3).

![Figure 3.Application scenario layout](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image4.jpeg)

#### Figure 3.

Application scenario layout

In the system, RFID tag is attached to both users and equipments. The RFID reader is located at each Laboratory to record and verify the RFID tags in the area. Each laboratory is equipped with a surveillance camera and an alarm indicator to deal with unforeseen circumstance events. The recorded data is stored and managed by a central computer whereby each laboratory computer is connected via intranet connection to ease any information received from computer lab can be easily transmitted to central computer. The main purpose of data, which is stored at the central computer, is to ease the management to have a look the whereabouts of equipment and record of in-out information. The administrator will grant the personal level access, equipment status and also permit online monitoring to authorize individual.

Legally attempt to enter a laboratory with authorize RFID identification (id), lead the magnetic door to unlock (door open) and record the entry information. Illegally attempt to access the laboratory, the door keep locked and activate the camera and warning sign is indicated to the system.Once the system detects a forceful behavior such as shaking the door, the system triggers an alarm to notify the security. In side of inventory control, intended user must be registered with authorized id before granted to move or lend the equipments, once verified, magnetic door will unlock and information is recorded. Otherwise, the registered id requires re-verification.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 5\. Implementation

As mentioned in previous section, the RFID-based Equipment Monitoring System is used to keep track the record on laboratory equipment. Hence, the laboratory, its equipments and users who use the equipment in the laboratory need to be part of the system entities. This can be done by enrolling these entities in the system.

![Figure 4.Access laboratories and equipments flowchart](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image5.jpeg)

#### Figure 4.

Access laboratories and equipments flowchart

At this moment, only three (3) laboratories have used the system and only authorised personnel are allowed to access the labs. In order to ensure only the authorised user login to the labs, they need to present their RFID card. Each laboratory is equipped with magnetic door. Therefore, the RFID card acts as a key to unlock the magnetic door. All equipments placed in the labs are tagged with RFID and registered in the system. This equipment can be used and borrowed by the user either in the same laboratory or in other laboratories. For the latter the user’s RFID card and the equipment’s tag should be readable by the RFID reader. Once the information is successfully matched by the system, the magnetic door will be unlocked. Otherwise, the door remain locked if only the reader able to read equipment’s information but not the user’s information. [Figure 4](https://www.intechopen.com/chapters/18092/#F4) illustrates the flow to access laboratories and equipments.

![Figure 5.The main GUI of RFID-based Equipment Tracking System](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image6.png)

#### Figure 5.

The main GUI of RFID-based Equipment Tracking System

![Figure 6.The system flow of data management module](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image7.jpeg)

#### Figure 6.

The system flow of data management module

The system has two main purposes; first is to register user, equipment and laboratories to be part of the system entities. This is done by the system administrator through data management module. The second is to keep track the equipment and to monitor the activities of the user. The latter can be accessed through monitoring module. These two main purposes are presented in the form of graphical user interface as shown in [Figure 5](https://www.intechopen.com/chapters/18092/#F5).

The data management module system flow is illustrated in [figure 6](https://www.intechopen.com/chapters/18092/#F6). This module can only be accessed by authorised personnel to maintain the integrity of the data. Thus, system administrator needs to enter the correct password in login page as shown in [Figure 7](https://www.intechopen.com/chapters/18092/#F7). Users are allowed to re-enter the password up to three (3) times for invalid password before the system activates the alarm system.

![Figure 7.System administrator’s (a) entering the password and (b) warning message for invalid access](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image8.jpeg)

#### Figure 7.

System administrator’s (a) entering the password and (b) warning message for invalid access

![Figure 8.Data Management Module](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image9.png)

#### Figure 8.

Data Management Module

![Figure 9.Authorised user](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image10.png)

#### Figure 9.

Authorised user

![Figure 10.The system flow of data monitoring module](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image11.jpeg)

#### Figure 10.

The system flow of data monitoring module

Then system administrator is able to view the data if the administrator is the authorized personnel. The data management module handles four (4) sub-modules which are described as [Figure 8](https://www.intechopen.com/chapters/18092/#F8). According to [Figure 8](https://www.intechopen.com/chapters/18092/#F8)_, Equipment_ sub module allows the system administrator to add new equipment and maintain the equipment record that is assigned in the laboratory. RFID tag is attached on the equipment to track down its status. _Lab_ sub module allows the system administrator to enroll any laboratory to the system. _User_ sub module allows the system administrator to enrol any user that wants to be in the system. After the user has been registered in the system, each will be given an RFID card. This card is used to authorise access the intended laboratory. The user needs to bring along the card to enter or to leave the laboratory. If user brings in/out any equipment to/from its registered laboratory, the card and the equipment’s tag should be read by the RFID reader without fail in order to unlock the magnetic door. [Figure 9](https://www.intechopen.com/chapters/18092/#F9) shows an example of successful login to laboratory.

_On-loan equipment_ sub module allows the system administrator to register the status of equipment; whether it is in place or it is circulated around laboratory under an authorised user.

The system flow of monitoring module is shown in [Figure 10](https://www.intechopen.com/chapters/18092/#F10). The module allows the administrator to monitor on-loan equipment, users’ activity and their status. This module is designed so that it can be viewed by the administrator internally (intranet access) or remotely (internet access). Here, the discussion is focused on remote access. In order to use this module either internally or remotely, the administrator needs to log-in to the system as shown in [Figure 11](https://www.intechopen.com/chapters/18092/#F11).

![Figure 11.The login page of system](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image12.png)

#### Figure 11.

The login page of system

![Figure 12.On-loan equipment page](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image13.png)

#### Figure 12.

On-loan equipment page

![Figure 13.Monitoring user’s activity remotely](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image14.png)

#### Figure 13.

Monitoring user’s activity remotely

For successful login, the administrator is allowed to view and find a specific record on on-loan equipment. [Figure 12](https://www.intechopen.com/chapters/18092/#F12) shows on-loan equipment based on laboratory and specific date. As shown below, the following on-loan information is taken from instrumentation lab for Jan 5, 2011. The system is also designed so that the administrator could click on _Equip ID to_ view equipment details borrowed by the user.

[Figure 13](https://www.intechopen.com/chapters/18092/#F13) shows that the administrator is able to view user’s activity at each laboratory. In the following example, it shows who has used the instrumentation lab on Jan 5, 2011. The user status tab contains information on which laboratory is allowed and the valid period as shown in [Figure 14](https://www.intechopen.com/chapters/18092/#F14). By default, this page displays the status of all users. It also could display the status of certain user by selecting specific information, for instance _UserID_ keyword to perform the searching process.

![Figure 14.Viewing user’s status](https://www.intechopen.com//cdnintech.com/media/chapter/18092/1512345123/media/image15.png)

#### Figure 14.

Viewing user’s status

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 6\. Conclusion

Laboratory equipment monitoring system using RFID is proposed to effectively monitor the in-out equipment from the laboratory. Via this system, every activity involving laboratory equipment can be monitored and updated through web based environment. For security purpose, only authorized personnel have the permit to monitor the transaction activities of laboratory equipment in real-time. The adaptation of RFID-based Equipment Monitoring System also would promote diversity on laboratory management which previously are handled manually.

## References

1.  1. Ahmad Rafiq Adenan, Siti Zarina Mohd Muji, Mohd Helmy Abd Wahab.Automated Animal Tracking System using Radio Frequency Identification Tags. Proceeding of Computer Science and Mathematics Symposium 2006KUSTEM, Kuala Terengganu, Terengganu, Malaysia, 89November 2006
2.  2. EPC Global. RFID smart label practice experience.2005http://www.rfidi--nfo.com. cn/report/dissertation/2OoS08/1655.html
3.  3. HaronN. S.SaleemN. S.HassanM. H.AriffinM. M.AzizI. A. A. R. I.D-basedCampus.Context-AwareNotification.SystemJournal of Computing. 23
4.  4. Herdawatie Abdul Kadir, Mohd Helmy Abd Wahab, Zarina Tukiran Mohd Razali Mohd Tomari and Mohd Norzali Hj. 2010, Fusion of Radio Frequency Identification (RFID) and Fingerprint in Boarding School Monitoring System (BoSs), Sustainable Radio Frequency Identification Solutions, Cristina Turcu (Ed.), 978-9-53761-974-9InTech
5.  5. Hsu-IC.Shih-HH.Wang-CW.2009Applying RFID to Reduce Delay in Import Cargo Customs Clearance Process. Computers & Industrial Engineering. 57506519
6.  6. LoebbeckeC.2005RFID Technology and Applications in Retail Supply Chain: The Early Metro Group Pilot. 18<sup>th</sup> Bled eConference on eIntegration in Action, June 6- 8, 2005, Bled, Slovenia.
7.  7. NgaiE. W. T.LoS. Y. Y.2008Development of an RFID-based sushi management system: The case of a conveyor-belt sushi restaurant. International Journal of Production Economics, 1122630645
8.  8. Nor Suryani Bakery, Ayob Johari, Mohd Helmy Abd Wahab, Danial, Md.Nor. RFID Application in Farming Management System. In Proceeding of 3<sup>rd</sup> International Conference on Robotics, Vision, Information and Signal Processing 2007ROVISP2007), Penang, 2830November 2007
9.  9. OztekinA.PajouhF. M.DelenD.SwimL. K.2010An RFID Network Design Methodology for Asset Tracking in Healthcare. Decision Support Systems. 49100109
10.  10. OztaysiB.BaysanS.AkpinarF.2009Radio Frequency Identify (RFID) in hospitality. Technovation. 29618624
11.  11. RobertC. M.2006Radio Frequency Identification (RFID). Computers & Security, 251826
12.  12. Tan-HT.Chang-SC.2010Development and Evaluation of an RFID-based e-Restaurant System for Customer Centric Service. Expert System with Applications. 379
13.  13. VoulodimosA. S.PatrizakisC. Z.SideridisA. B.NtafisV. A.XylouriE. M.2010A Complete Farm Management System based on Animal Identification using RFID Technology. Computers and Electronics in Agriculture. 70380388
14.  14. YanB.LeeD.2009Application of RFID in Cold Chain Temperature Monitoring System. 2009 ISECS International Colloqium on Computing, Communication, Control, and Management. Aug. 89Sanya, China.
15.  15. ZhangX.YueS.WangW.2006The Review of RFID Applications in Global Postal and Courier. The Journal of China Universities of Post and Telecommunications. 134

### Sections

Author information

-   1.Introduction
-   2.Related work on RFID in monitoring
-   3.System architecture
-   4.Application scenarios
-   5.Implementation
-   6.Conclusion

References

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18092/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS Download citation

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-open-book.svg) View Book Chapters [![IntechOpen](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/svg/logoSmall_red.svg) Publish with IntechOpen](https://www.intechopen.com/publish)

Next chapter

#### Developing RFID-Based Instruments Maintenance Management in Construction Lab

By Yu-Cheng Lin, Weng-Fong Cheung, Yi-Chuan Hsieh, Fu-Cih Siao and Yu-Chih Su

3,403 downloads

Written By

Mohd Helmy Abd Wahab, Herdawatie Abdul Kadir, Zarina Tukiran, Noraisah Sudin, Mohd Hafizz Ab. Jalil and Ayob Johari

Submitted: 29 October 2010 Published: 15 June 2011

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18092/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18092/#)

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