# Appendix . Appendix A

-   **[Case Study: Michigan Department of Agriculture](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/apa.html#app01lev1sec1 "Case Study: Michigan Department of Agriculture") 190**
    
-   **[Case Study: Sun Microsystems](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/apa.html#app01lev1sec3 "Case Study: Sun Microsystems") 196**
    
-   **[Case Study: Operation Enduring Freedom / Operation Iraqi Freedom (OEF/OIF)](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/apa.html#app01lev1sec4 "Case Study: Operation Enduring Freedom / Operation Iraqi Freedom (OEF/OIF)") 201**
    
-   **[Case Study: Woolworths, Plc.](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/apa.html#app01lev1sec5 "Case Study: Woolworths, Plc.") 208**
    
-   **[Case Study: Smart & Secure Tradelanes—Phase One Review](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/apa.html#app01lev1sec6 "Case Study: Smart & Secure Tradelanes—Phase One Review") 214**
    

# Case Study: Michigan Department of Agriculture

A Case Study on Tracking and Eliminating Tuberculosis (TB) from Animal

Population with RFID Implementation

_Courtesy: Michigan Department of Agriculture_

## The Client

The Animal Industry Division of the Michigan Department of Agriculture (MDA) is responsible for working with a statewide clientele of more than 15,000 beef and dairy producers (the producers) that raise approximately 1.1 million livestock animals. The livestock is worth close to $800 million.

## The Challenge

Free movement and trade of healthy animals is the key to the profit and survival of the livestock business. If a cow cannot be traded in an auction market or sent to a slaughterhouse, the producer is unable to recoup the investment made in the material and infrastructure needed to raise and feed the cow. A widespread disease outbreak that kills the animals or requires the producer to depopulate his herd can have devastating consequences for an individual producer as well as other businesses that depend on healthy livestock industry for their income.

A few years back, the producers and the state of Michigan were looking at this stark scenario. After initial discovery of Tuberculosis (TB) in the tissue samples of a deer herd in Northern Michigan, the Michigan Department of Agriculture (MDA) found the disease present in beef herds in 13 northern counties of the lower peninsula of the state. This led to depopulation of several herds. The neighboring counties and states were also weary about the spread of the disease inside their borders over time. The disease spreads when a healthy animal comes in contact with the saliva or exhaled air of an infected animal—a situation common on farms as well as auction markets where animals share feed and drinking stations. In 2000, the United States Department of Agriculture (USDA), which was monitoring the situation and saw the growing spread of the disease, revoked Michigan’s status as a TB-free state (for animals), triggering various restrictions on animal movements in and out of the Michigan counties. The restrictions included extra TB tests required for the animals, and added overhead per animal in terms of dollars and time spent compared to animals in TB-free states. Clearly, this was not conducive to business for the state’s livestock industry.

To regain the TB-free status, the officials from MDA continued to test the livestock for TB in the affected counties, but they faced several issues. Because the number of animals testing positive was small compared to the number of total animals, it didn’t make sense to depopulate them all or restrict movement of (ability to buy and sell animals) animals from all farms. To complicate matters, TB can remain dormant for a while before surfacing. An animal that tested healthy could, over time, develop TB. This meant uniquely identifying every animal and keeping a very accurate record of its movement. A typical bovine can change hands three times from birth to slaughterhouse. With the large number of animals involved, the paper-based tracking was turning out to be costly, time consuming, and prone to errors.

Faced with these challenges, the MDA looked at deployment of the National Farm Animal Identification Records (FAIR) program. RFID technology was seen as an enabler for this project.

## Scope of the Project

The scope of the initial project, limited to the 13 affected counties, was to develop an Electronic Animal Identification (EID) system with the goal to identify all bovine (cattle) in the affected areas, and track and record their movement to eliminate infected animals. Successful completion of the project would restore Michigan’s status as a TB-free state (for animals) over five years,[<sup class="footnote">[1]</sup>](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/#ftn.app01fn01) provided no more infected animals were found. Of the 15,000+ farms in the state, approximately 1,600 farms located in the affected 13 counties participated in the project. The farms contained approximately 70,000 animals. The project was implemented in four phases:

-   **_Phase 1_:** Obtain and load animal farm location (premises) ID information into FAIR database.
    
-   **_Phase 2_:** Develop an electronic data recording system, incorporating data from the old paper-based system.
    
-   **_Phase 3_:** Record animal movement to and from markets and processing plants.
    
-   **_Phase 4_:** Implement movement permit system to track animals as they moved from one place to another.
    

The USDA provided a grant for this project, which totaled $1.5 million over three years from 2001 to 2004. Most of this money was used to set up the requisite infrastructure for the project. Additionally, the MDA used its own people resources to test and record animals as well as manage the project.

### Hardware and Software Products Used

-   **_National Farm Animal Identification Records (FAIR) program_:** Holstein Association, a non-profit membership organization has tracked animal identification and pedigree information for decades and made it available to its members. It maintains a National FAIR program to enable animal identification and tracking. MDA partnered with National FAIR to use its model to develop the state’s Electronic Animal Identification (EID) tracking system. This central database stores all the information about the animals, including their unique ID number, pedigree, TB test date, and test results.
    
-   **_Tags_:** Close to 180,000 RFID tags made by Allflex were issued to producers at the cost of $400,000.
    
-   **_Handhelds, computers, and printers_:** Fifty Psion handhelds were used as mobile readers at the cost of $120,000. Fifty computers were used at the cost of $50,000, and 30 printers were used at the cost of $9,000.
    
-   **_Stationary readers_:** Readers and antennae made by Allflex were installed at various animal markets and slaughterhouses, averaging $10,000 per facility.
    
-   **_Movement Permit Application_:** A Web-based application was developed, which, based on the animal ID number and certain qualifying questions, can check the FAIR database and, if appropriate, generate a movement permit for an animal that the producer can print on his computer. The permit is required at all animal markets and slaughterhouses in Michigan and surrounding areas.
    

## The Solution: How It Works

The EID (Electronic Animal Identification) system consists of four components:

1.  An RFID ear tag per animal, which sends the specific animal ID number to the reader.
    
2.  _Readers_, which receive the signal from the tag and convert it into a unique number.
    
3.  _Host computers_, which receive information from the reader and deliver to appropriate software program.
    
4.  _Software_, which collects and analyzes the data.
    

For more information about how host computer and software interact, see [Chapter 3](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/ch03.html "Chapter 3. Components of RFID Systems"), “[Components of RFID Systems](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/ch03.html "Chapter 3. Components of RFID Systems").”

All animals are assigned a unique number using the American Identification Numbering (AIN) system. This number and the corresponding information about the animal are loaded in the FAIR database on an on-going basis. This data synchronization step is critical to the proper execution of the system. MDA officials armed with hand-held readers and computers ensure that the correct data is recorded. Farmers are also issued certain tags (with IDs) to be used on newborns. To date, approximately 180,000 RFID tags have been issued to animals on 1,600 farms in the affected counties.

To identify animals as they change hands, RFID readers are installed in 12 live-stock auction markets in Michigan along with seven slaughter plants in Pennsylvania, Wisconsin, Illinois, and Michigan. The majority of Michigan’s livestock passes through these facilities. As animals pass through the narrow animal alleys in these locations, the stationary readers mounted on the side read their IDs from the tags in their ears. These stationary readers can read tags up to 36” away (although the hand-held readers can read tags only 6” away). More than 33,000 animal identifications have been made at these facilities.

To further safeguard the system, the MDA requires movement permits for all animals, moving to any destinations. The system allows farmers to print the permits from their computers using a Web-based application. MDA can also fax a permit to a farmer who doesn’t have access to the Internet. If an animal meets certain criteria, it is issued a movement permit. An animal without a permit is not allowed to be unloaded at the auction markets or slaughterhouses. After an animal is identified at these locations, the computers at these facilities update the animal’s profile in the FAIR database with a new location. After an animal is slaughtered, the corresponding entry is removed from the database.

## Results and Lessons Learned

-   More than 33,000 animal identifications have been made since the start of the project. The accuracy of the handheld readers has been approximately 99% and tag retention has been over 96% (that is, the RFID tag stayed in the ear and was recovered at the market or slaughterhouses), higher than the retention rate for the typical metal tags. Approximately 1,600 farms in the affected counties (out of more than 15,000 farms in the state) have adopted RFID (a little over 10%). A total of 180,000 (estimated) tags have been issued so far.
    
-   Twelve trace-backs have been achieved (that is, animals were traced back to their farm of origin). In May of 2003, an animal tested positive for TB outside of the affected counties. The entire history of the animal, including the farm of origin was traced within 15 minutes. In the past, such tracing would have been either impossible due to incomplete records or taken weeks to complete. The current process is fast enough to stop an infected animal from leaving the restricted area and pose a health hazard to other animals or humans.
    
-   The computer and RFID-based process is more accurate, simpler to use, and easier to maintain than the paper-based system. As a result, 3.5 data entry positions have been saved. The current solution has also reduced the time it takes to retest a herd by 50%. It prevents wrong animals from being tested and possibly killed.
    
-   The resulting superior tracking and elimination of infected animals has enabled Michigan to make progress towards regaining its TB-free status. The progress has ensured continued access to markets for Michigan producers. Over time, such traceable meat can even be marketed at a premium, increasing profits for the producers.
    
-   Successful execution of this project has enabled MDA to lay the groundwork for deploying EID in the rest of the state. The blueprints of this project can also help other states replicate Michigan’s success. A cooperative effort is already underway between the government and the industry in the form of The U.S. Animal Identification Plan (USAIP). It is chartered to define the standards and framework for implementing and maintaining a national animal identification system for the U.S. As part of the project, USDA has established a National Animal Identification Development Team with participation from more than 70 animal associations, organizations, and government agencies. A fully implemented plan could identify all premises that had contact with a foreign animal disease within 48 hours after discovery.
    

# Case Study: Sun Microsystems

A Case Study on RFID Usage in an Inventory Tracking Pilot

_Courtesy: Sun Microsystems_

## The Client

With more than $11 billion in annual revenue, Sun Microsystems is a leading provider of industrial strength computing systems consisting of server, software, storage, and services. The company prides itself on providing innovative solutions to its customers that reduce computing complexity and lower the overall cost of ownership of computing infrastructure for its customers.

## The Challenge

Because Sun designs and builds the majority of its servers, efficient supply chain and manufacturing systems are critical in keeping its operational costs down. Higher operational costs can either make the product less competitive or hurt margins. The company has maintained an on-going focus on streamlining its operations and pursued an aggressive program for process improvement, modeled after the Six Sigma methodology.

Some time back, Sun’s manufacturing plant in California was looking at various ways to further streamline its operations. This plant was responsible for making some of Sun’s mid-range servers and storage systems. Although the manufacturing and sourcing were highly streamlined, it seemed to the plant supervisors that the processes for overall inventory tracking could be improved. RFID technology seemed to be an enabler for this. At the same time, Sun was quite deeply involved in the emerging area of RFID technology through its leadership role in developing standards, as well as middleware software, for RFID. It seemed that a hands-on RFID project to improve internal operations would help Sun stress test the newer versions of its software and create an internal competency of RFID solution architecture and deployment. With these benefits in mind, the company decided to deploy an RFID pilot in its manufacturing operations.

Sun faced several challenges in the selection and design of the RFID pilot. Manufacturing of a mid-range server, the type being manufactured at this plant, requires many distinct steps such as component assembly, testing of sub-assemblies, software installation and customization, and testing of the final product. A pilot that puts RFID tags on every sub-assembly of a machine would require major changes to the manufacturing process and as a result, was considered out of scope. There was another issue as well. Because the pilot would have a fixed start and stop date, followed by a review and possible process improvement phases, if Sun started tagging its production machines during the pilot phase, some customers would have machines with RFID tags and others would not (after the pilot ended). Sun needed to find a pilot in which the tagged objects would remain inside its factories (also known as a closed loop process) and still provide meaningful enough results to make extrapolations about operational savings of a fully deployed RFID system. It found the perfect pilot in its Rotational Capital Process.

### What Is Rotational Capital Process?

Testing a mid-range server (multiprocessor) requires a variety of test components and equipment, including other servers, server chassis, and various I/O cards. The testing could occur at multiple stations during the assembly, and may require more equipment than typically available in the test harnesses at that station. For example, to test a CPU board for a multiprocessor server, a server chassis with a certain configuration of disk drives, memory, power supplies, and CPU boards may be needed. If the right configuration were not available, an operator would borrow the missing items from a pool of capital equipment (known as rotational capital). When the testing was completed, the borrowed capital equipment would be returned to its original location. In this manner, the capital equipment can rotate in and out of the pool.

Though an ERP system-based tracking process was in place for the rotational capital, it was not working well. Sometimes, the operators forgot to return the equipment or made a mistake in entering the data into the ERP system. As a result, data synchronization–reconciliation of data between what was physically available and what was in the ERP system–was an on-going challenge. Several people were working full-time to resolve the arising discrepancies by going around the plant looking for missing equipment and bringing them back to their proper location. Because these were high-value items, the labor cost was justified in terms of not having to keep excessive test inventory.

## Scope of the Project

The scope of the project was limited to showing the viability of using RFID technology in an environment with high metal content, and gaining positive ROI (return on investment). It was broken into several steps:

1.  Define use cases based on existing process discovery
    
2.  Define the architecture and source components
    
3.  Build the pilot, including any custom software and physical setup
    
4.  Deploy the pilot for three months
    
5.  Evaluate the results
    

A virtual team, consisting of members from the manufacturing operations, Sun Professional Service architects, and engineers from the RFID software team was put together to drive the project. Appropriate management approvals were obtained and budget was secured to conduct the pilot. Because the goal was to create a system that can be rolled out across Sun’s supply chain, a standards-based deployment was required. The team decided to use EPCglobal’s UHF specifications to ensure such compliance. The software components were already compliant with Java and Jini standards.

### Hardware and Software Products Used

-   **_Tags_.** UHF tags made by Alien Technology (I-tag).
    
-   **_Readers_.** Stationary readers and linear antenna from Alien Technology.
    
-   **_RFID Middleware_.** Sun EPC Event Manager.
    
-   **_EPC Information Server_.** Sun EPC Information Server.
    
-   **_Tracking Application_.** A custom built tracking application was used to keep a record of location histories of each item and a log of all transactions.
    
-   **_Reporting_.** Brio reporting tool.
    
-   **_Database_.** Oracle.
    
-   **_Application Server_.** Sun JES Application Server.
    

## The Solution: How it Works

The pilot system consists of four components:

1.  _An RFID tag_ per unit of test equipment, containing its EPC, which uniquely identifies it.
    
2.  _Readers and antennae_, which receive signals from the tags and map them to specific entries in the equipment database.
    
3.  _RFID middleware_, which receives information from the reader, filters it, and delivers to the appropriate software program.
    
4.  _Business processing software_, which collects and analyzes the data.
    

For more information about how these different components interact, see [Chapter 3](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/ch03.html "Chapter 3. Components of RFID Systems"), “[Components of RFID Systems](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/ch03.html "Chapter 3. Components of RFID Systems").”

First, all the test equipment was tagged with Alien Technology’s UHF I-tags. Because quite a few items had heavy metal content, the tags were affixed on top of a plastic, which was attached to the metal. Linear antennae were chosen due to their enhanced read performance, requiring that tags be vertically aligned to the antennae. The tags were carefully placed to ensure this orientation. Each tagged object was associated with an EPC and entered into the corresponding Oracle database repository.

The pilot layout was created such that the operators taking equipment from the central location to their station or vice-versa passed through a reader gate. The tagged object(s) were identified at this location. The operators were trained to verify the data read by the reader, manually override any inaccuracies, if needed, and complete the transaction. The transaction triggered several events. For example, the location of this object would change in the central repository and the transaction logs would be updated. When the testing was done, the whole process occurred in reverse, where-by the material going through the reader gate was now added to the inventory.

Due to the scope, budget, and duration of the project, the list of tagged equipment in the database was not synchronized with the master list of equipment in the database. It should be noted that such integration would surely be covered in the full deployment.

## Results and Lessons Learned

The pilot showed that it was possible to track and trace items with heavy metal content using standardized tags and RFID middleware. Here are some of the findings:

-   The accuracy of the system was quite high, approximately 99.5%.
    
-   Operator training turned out to be an issue. The tags were read properly as long as the operators walked through the RFID gate, which did not always happen.
    
-   Linear antennae provided much better response than circular antennae. Tag orientation vis-á-vis the reader was proved critical in such situations.
    
-   Although the pilot project touched upon a very small part of the overall supply chain and manufacturing processes, the ROI analysis showed that if fully implemented, the project would have a positive ROI over a three-year horizon, with break-even point in approximately 2 years.
    
-   Handheld readers were desirable as they could help track inventory in situations where operators took the test components without passing them through a stationary RFID gate.
    

# Case Study: Operation Enduring Freedom / Operation Iraqi Freedom (OEF/OIF)

A Case Study on Support of U.S. Military Operations in Afghanistan & Iraq

_Courtesy: Savi Technology_

## Savi’s Client

U.S. Department of Defense (DoD), U.S. Central Command, and the U.S. Army

Program Manager—Automatic Identification Technology (PM-AIT).

## Client’s Investment

Since 1994, the DoD, through PM AIT, continues to award multi-year procurement contracts to Savi Technology to provide Radio Frequency Identification (RFID) transponder tags; fixed, portable and handheld readers; and associated hardware, software and professional support. These near real-time solutions enable Total Asset Visibility (TAV) for the DoD. In addition to its own products, Savi provides all forms of RFID products and solutions through a full spectrum of RFID partners. The value of the three IDIQ contracts exceeds $250 million.

## Client’s Top Requirement: Total Asset Visibility (TAV)

The genesis of using RFID to obtain TAV came from the inability during Desert Shield and Desert Storm to know the contents of containers and track and locate supplies in the DoD supply chain. Over 40,000 containers were shipped to the Gulf, with redundant materiel and supplies resulting in enormous “iron mountains” of containers staged in ports and holding yards. At least two-thirds of these containers had to be opened to see what was inside.

> **“During the Gulf War, we simply did not have good information on anything. We did not have good tracking; we had no real asset visibility. Materiel would enter the logistics pipeline based on murky requirements, and then it could not really be tracked in the system.... We lacked the necessary priority flows to understand where and when things were moving. It was all done on the fly, on a daily basis... It truly was brute force.**

|  | **Generally speaking, if front-line commanders weren’t sure of what they had or when it would get there, they ordered more... The result was the oft-referenced “iron mountains” of shipping containers. We had too much, and, worse yet, we did not know what was where.”** |  |
|-----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
|  | --**USAF Gen (ret.) Walter Kross Director of Ops & Logistics of the U.S. Transportation Command during the “first” Gulf War** | --**USAF Gen (ret.) Walter Kross Director of Ops & Logistics of the U.S. Transportation Command during the “first” Gulf War** |

To prevent a recurrence of these inefficiencies and lack of visibility, the U.S. Army, through its Logistics Transformation Agency (LTA) and PM AIT worked diligently to install a worldwide RFID infrastructure, called the DoD In-transit Visibility (ITV) Network.

The DoD ITV Network is comprised of more than 800 locations with over 1,300 read and write stations to track and locate the flow of military supplies and equipment ranging from boots and food to bullets and missiles through the supply chain—both in times of peace and conflict. The DoD ITV network is the world’s largest active RFID system that tracks and locates over 300,000 shipments per year in near real-time throughout the global DoD supply chain. In January 2003, the United Kingdom (UK) Ministry of Defence (MOD) elected to extend a like capability throughout the UK MOD supply chain. In November 2003, the DoD Joint Chief of Staffs J4 offered to extend the use of the DoD ITV network to all Coalition Allies.

## RFID Comes of Age and Proliferates

As the DoD and Army’s operational tempo (OPTEMPO) increased in recent years, so too did the use of RFID tagging of containers and Air Lines of Communication (ALOC) pallets. In March 2001, the DoD ITV system recorded 3,148 tag reads by interrogators. In March 2002 more than 28,000 tag reads occurred; however, this massive growth only served as a sentinel of much greater volumes to come. With the deployments and operations in support of Operation Enduring Freedom (OEF) and Operation Iraqi Freedom (OIF) in 2002 and 2003, the tag reports exploded to more than two million tag reports in March 2003. The DoD’s explosive growth in the use of Savi’s RFID tags, interrogators, other products and services was fueled by the U.S. Central Command’s demand for visibility of all materiel and supplies being shipped to support OEF and OIF. As a result of this demand, the use of the ITV network came of age as a standard for end-to-end supply chain visibility. The benefits from the use of Savi’s technology are well documented; however, the OEF and OIF “lessons learned” show that many more returns are yet to be realized from total integration and institutionalization of the near real time event data into the DoD’s logistics systems.

## How It Works

Through the use of Savi’s technology, along with other technology providers, the DoD installed a worldwide RFID infrastructure and network to track and locate materiel and supplies moving through the vast, complex, and multi-national end to end supply chain. The DoD TAV network uses linear and two-dimensional barcodes, optical memory cards, active RFID tags, and GPS systems to track tri-walled shipments, commercial and ALOC pallets, and ISO containers through over 800 checkpoints in more than 45 countries.

Asset tracking begins with the aggregation of item data to case contents, to pallet configuration to visibility inside the shipping container to shipment units in a truck, plane or ship. The DoD uses Savi’s active, data-rich battery-powered tag to provide “in the box,” nodal, “on demand” and “between node” visibility. The “between node” occurs when Savi’s RFID tags are coupled with satellite and GPS technology. The Savi RFID tags can store up 128KB of data (80 pages of text).

The DoD created its own format for the Savi tag. The TAV format provides license plate data, detailed commodity information, and specific transportation transactions. The DoD shipper uses their existing logistics systems coupled with Savi’s TAV Tools and Unisys’ Transportation ITV Processing (TIPS) software and Savi’s Tag Docking Stations (TDS) to write the TAV data to the RFID tag. The write record is automatically sent from the TDS to the DoD TAV servers in the U.S., Europe, Korea, and Southwest Asia. As the RFID tagged shipments travel through the DoD supply chain, the RFID tag identification (ID) number is automatically collected by Savi’s RFID interrogators. The RFID tag IDs are automatically associated with the interrogator’s ID and location and all three data elements are automatically routed to the appropriate DoD TAV server. In addition, at some sites and for some DoD systems, tag data is extracted and automatically populated to existing DoD logistics systems. Through this automatic and near real time data collection, the DoD logistics operators can see the arrival and departure of shipments at any of the over 800 locations. In addition, if there is a crucial requirement to locate a specific item at any of the nodes, the logistics operator can query the TAV system to find all the locations where the item is located.

Finally, and probably most importantly, logistic operators can use Savi’s handheld interrogators to send a query to a RFID tag on a shipment to gain “in the box” visibility without opening the container. Lastly, when required by operational necessity, the RFID tags when coupled with satellite and GPS, can provide “between node” visibility. Deployed units in OEF, OIF, and other locations use Savi’s Mobile RFID Flyaway Kits, also called Early Entry Deployment Support Kits (EEDSK), to provide RFID infrastructure in contingency operational areas. The EEDSK contains hand-held interrogators to read RFID tags, satellite phones for network connections, and solar panels to generate power to allow connection to the DoD TAV servers.

## “Precision-Guided Logistics” in OEF/OIF a Quantum Leap in Efficiency

The application of RFID tracking technology in OEF and OIF benefited war fighters by allowing them to have unprecedented real-time visibility and dynamic routing and management of supplies—a quantum leap over a decade prior.

Numerous accolades came from OEF and OIF logisticians and combatants for the “in the box,” “on demand,” and “nodal” visibility for materiel and supplies. By using handheld interrogators, users could instantly locate needed supplies such as milk or water or avoid opening unmarked containers holding hazardous materials.

Perhaps the bottom line on the cost savings attributable to ITV and RFID-enabled achievements lies in the fact that during OIF 30 percent fewer troops were deployed than in Desert Storm; however, the Army used 90% fewer shipping containers. The use of the RFID tags and the DoD TAV network significantly contributed to the reduced container usages as well as facilitated port clearance and rapid processing of materiel and supplies through theater distribution centers to ultimate consignees. During OIF, USAF GEN John Handy, U.S. TRANSCOM Commander remarked: “In Desert Storm, we had mountains of containers that never even got opened the whole time we were there. That’s not happening this time, and that kind execution of our business will be a significant part of the success of the mission.” The significance of TAV to mission success was pointed out by John Osterholz, Director of Architecture and Interoperability in DOD’s Chief Information Officer’s office. Mr. Osterholz noted that the use of RFID enabled the United States to be fully prepared for war in half the time it took to gear up for Desert Storm, and allowed users to “dive deep” into the information flow and quickly get items to the units that needed them.

|  | **“Whereas during the first Gulf War when we did most of our logistics tracking on paper. This time, with improvements in the tags, readers as the lynchpin of whole information, and software systems to create holistic solutions at the strategic and tactical levels simultaneously, there was in-transit visibility of things that were moving available to certified users—right on the Web.**

**DoD now has clear knowledge of when things are actually going—the planes, the ships, what’s going to be on them, what needs to be moved. TRANSCOM has gone digital and this represents a quantum leap in capability and efficiency from the first desert War. Our operators now get ground truth at ground zero—and everywhere else. And we now have the technology to absorb and to manage and precisely guide materiel.”** |  |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
|  | --**USAF Gen (ret.) Walter Kross Director of Ops & Logistics of U.S. Transportation Command during the “first” Gulf War** | --**USAF Gen (ret.) Walter Kross Director of Ops & Logistics of U.S. Transportation Command during the “first” Gulf War** |

A true boots-on-the-ground perspective on the dramatic efficiency gains associated with the advent of “precision-guided logistics” was provided by U.S. Army Major Forrest Burke, Chief of Logistics Information Management, Coalition Forces Land Component Command (CFLCC). Said Major Burke: “What would have taken several days to locate in the first Gulf war, we can now find in 20 minutes. Back in 1991, I had a clipboard and carbon paper.” According to the National Defense Transportation Association, which honored Savi with its 2003 National Transportation Award in September, “Savi Technology has demonstrably advanced the art and science of defense transportation by providing the DoD the technology to move away from brute force logistics (large stockpiles of materiel) in the operational theater and toward the precise delivery of materiel to the required location at the right time.”

## U.S. Forces... and Beyond

As mentioned earlier, in addition to the deployment of its RFID solutions within the U.S. Department of Defense, OIF also saw Savi Technology’s hardware and software successfully leveraged in support of British forces within the Coalition. The U.K. MOD noted that it recouped its multi-million dollar investment in the technology within two weeks of implementation just prior to OIF. Tracks for tanks were urgently needed in the theater, and the UK MOD was about to lease the costly _Antonov_— the world’s largest air cargo plane—to transport the equipment from the UK to the Middle East. However, after querying the TAV network, British forces found tank tracks with affixed RFID tags already in theater, thus saving the substantial cost of leasing the aircraft for an expedited shipment.

## Building on Success: the DoD RFID Mandate

Based on the logistics tagging and tracking successes of OEF/OIF, on October 2, 2003, the U.S. Department of Defense (DoD) announced a policy to institutionalize and extend the use of Savi’s data-rich active RFID products across the Department to include shipments from DoD vendors. This innovative and overarching RFID policy includes the mandated use in early 2005 of the new Electronic Product Code (EPC) passive RFID tags for product, case lot, and pallet identification and location. During 2004, the DoD will conduct several prototypes to demonstrate the how the EPC can be used to add additional asset visibility for DoD’s supply chain. The EPC when coupled with Savi’s active RFID tags will allow the DoD to gain the much sought after automatic nested visibility to alleviate many of the issues identified as part of the “last ugly mile.” Fulfilling the “nested visibility” mandate, according to DoD, is “critical” to logistics transformation and will help to “improve business functions and facilitate all aspects of the DOD supply chain.” The new RFID policy and the corresponding RFID tagging/labeling of DoD materiel are applicable to all items except bulk commodities such as sand, gravel or liquids. The policy will require suppliers to put passive RFID tags on the lowest possible piece part/case/pallet packaging by January 2005, and immediately affix active, data-rich RFID tags to higher-level assets such as air pallets, containers, equipment and transport modes. DoD has been the primary catalyst for development of state-of-the-art RFID and with this mandate will stimulate even further advancements both throughout the armed forces and the commercial supply chain. In promulgating the policy, the DoD continues to demonstrate its global leadership and foresight in accelerating wider adoption of RFID technologies for supply chain applications. Savi Technology is proud and privileged to have worked closely with the DoD for nearly a decade in designing, developing and providing data-rich active RFID tags, readers and support software. Savi is fully committed to taking lessons learned from OIF to develop the next generation of RFID-enabled solutions that extend the breadth and depth of real-time, total asset visibility of military supplies in times of peace and conflict. By continuing to work with partner solutions, Savi is committed to being the “on ramp” to the TAV system by “nesting” its solutions with EPC-compliant tags and other technologies for both end-to-end and top-to-bottom visibility.

## About Savi

Savi is the proven leader in global supply chain security and real-time asset management with over 14 years of logistics infrastructure experience. Founded in 1989, Savi Technology is headquartered in Sunnyvale, California, with offices in Hong Kong, Johannesburg, London, Brussels, Singapore, Taipei, and Washington D.C.

# Case Study: Woolworths, Plc.

A Case Study on Reducing Shrinkage and Theft in the Supply Chain with Savi’s Asset

Management System and RFID Implementation

_Courtesy: Savi Technology_

**Special Note:**

In 2003, Woolworths won a prestigious European Retail Solutions Award in the category of _Supply Chain Solution of the Year_. Judged by a panel of European retailers, this award recognizes those outstanding retailers who have successfully implemented new information technology (IT) to drive their business forward both economically and operationally. This case study discusses their new awardwinning implementation.

## Challenges Facing Woolworths Leads to “The Chipping of Goods Initiative”

Woolworths’ success depends on its ability to respond to increasing consumer demands. But like most global retailers, Woolworths experiences problems with product “shrinkage” due to lack of asset visibility in the supply chain. Shrinkage problems are due to: incorrect shipment deliveries, stock losses in the distribution center and theft of goods in transit and from the stores themselves. These problems resulting from lack of asset visibility within the supply chain cause many large High Street retailers to lose tens of millions of pounds per year.

Based on these challenges, Woolworths has looked into various measures to resolve their supply chain visibility issues. One such measure is a project based on the introduction of real-time tracking and tracing of goods using radio frequency identification tags.

The project is part of the Chipping of Goods initiative, sponsored by The Home Office to demonstrate how RFID can reduce shrinkage and theft. The Chipping of Goods Initiative is a program that supports innovative demo projects to reduce theft and loss in the supply chain.

## Key Technologies for Woolworths’ Asset Visibility

Two key technologies were selected to address the problems Woolworths faced: RFID technology and asset management software provided by Savi Technology.

Savi Technology is the proven leader in providing of supply chain asset management, security and collaboration software that is uniquely integrated with automatic data collection and identification systems to provide real-time logistics solutions.

## Scope of Initial Project

The initial project was installed at the Primary Woolworths Distribution Center in Swindon, Wiltshire, England. Various other Woolworths retail outlets that are serviced by the Swindon Distribution Center are also set-up with the RFID technology. A total of 900 retails sites across the United Kingdom have been defined for implementation and so far 90 sites have been enabled for the demo project.

The key goal of the project was the integration of Bar Codes, Active RFID and GPS systems into a single supply chain visibility solution.

The implementation from May 2002 to February 2003 included the following Savi products:

### Savi Software Products

-   **_Savi Asset Management System_—.** A full-featured, Web-based software application for managing the complete life-cycle of critical supply chain assets such as dollies, totes, trailers, intermediate bulk containers, pallets and other types of high value mobile assets.
    
-   **_Savi SmartChain Platform_—.** SmartChain is a distributed logistics platform that collects, aggregates and processes data in real-time.
    
-   **_Savi Site Manager_—.** The data is sent to SmartChain from the Savi Readers via the Savi Site Manager. Site Manager provides a local point of presence for data collection.
    

### Savi Hardware Products

-   **_Savi SR-600 Readers_—.** Savi’s fixed Readers have been placed at Woolworths stores to monitor tag activity and communicate tag location and data to the Savi SmartChain platform.
    
-   **_Savi SP-600 Signposts_—.** A total of thirty Savi Signposts have been placed at various distribution centers. Signposts activate tags within their vicinity for enabling precise identification of tagged items at specific locations.
    
-   **_Savi ST-602 Tags_—.** A total of 15,200 Savi Tags have been placed on Woolworths, Plc. containers. The ST-602 tags are small (6.2 cm x 4.3 cm x 1.2 cm), and mountable with dual short range and long range frequency transmission.
    
-   **_Savi SMR-640P Mobile Readers_—.** A total of fifteen Savi Mobile Readers— mobile, lightweight, battery operated reader modules used with an off-theshelf Personal Digital Assistant (PDA) to commission, identify and configure the Savi Tags—are being used by Woolworths personnel.
    

The Savi Series 600 components (Readers, Tags, and Signposts) are built on Savi’s innovative EchoPoint technology. Savi’s EchoPoint technology is a new, innovative technology that uses two operating frequencies. EchoPoint combines long-range communication (at 433.92 MHz) with precise spot-level locating (at 123 kHz and 132 kHz).

## The Solution: How It Works

The RFID supply chain solution developed for Woolworths integrates a comprehensive set of technologies, and provides visibility of conveyances and items throughout the warehouse and retail delivery system. This begins with Savi’s Series 600 RFID hardware -Tags, Signposts, and Readers, which communicate through Savi’s Site Manager to the Savi SmartChain platform and Savi Asset Management System.

It starts with Savi RFID tags on each dolly, and a real-time integration with Woolworths order picking and packaging systems. With the RFID tag identification, Woolworths can identify the location of goods ordered by a store within the distribution center, and track the deliveries, from the picking area, to the marshalling area, Goods-Out bay, Trailer, and to the actual store—complete with a Proof-of-Delivery (POD) delivered wirelessly from the remote store at the time of the delivery.

Within the warehouse distribution center, goods are picked to order and collected in a number of totes. The totes are loaded onto tagged dollies. A real-time interface matches the tote barcode and dolly RFID signals. Later the assembled dolly is moved to a marshalling area where it waits to be aggregated on a trailer route. Route plans sent to the customized Savi system allow the system to determine whether dollies are being loaded onto the correct trailer, and if not, an audible and visual LED messaging system indicates the errant dolly immediately. When the trailer is ready to depart, the system downloads the trailer manifest to a new handheld terminal for drivers, which is fitted with the Savi SMR-640 Mobile Reader module.

As the truck with trailer travels along its route, its position can be dynamically displayed on the Transport Management Centre (TMC) system from Microlise. When the driver has completed the delivery, the POD data, along with GPS, and seal status information, is transported from the remote trailer over a wireless wide area network back to the primary distribution center through the TMC.

At the distribution center, the TMC uploads the information to the Savi Site Manager, which then passes the data along to the Savi SmartChain Platform where it is aggregated and processed. At any time during this process, personnel may view the asset, order, or trailer seal status, and asset location, through their Web browser with the Savi Asset Management System.

Unlike bar codes, RFID tags do not require line of site, and the data stored on them can be updated at various points throughout the supply chain. By associating the orders packed within each tote bin to the RFID tag on the dolly on which they are stacked, Woolworths gains complete visibility of stock movement.

From the mobile terminal POD information, or from fixed RFID readers installed at high volume stores, the system is able to determine if the dollies and associated items in totes have been delivered to the correct store. In the case of stores using fixed technology, this is done instantaneously as the goods are delivered. If the dolly is mis-delivered, a real-time alert is sounded. To complete the cycle, Savi’s fixed signposts and readers are installed at Woolworths Goods-In and Tipping bays to detect the return of empty dollies.

In larger stores, Savi Series 600 equipment has been installed in the goods inwards loading bays. With this system, no user intervention is necessary. Savi 600 Hardware reads the RFID tags as the dollies are unloaded from the vehicle and checks these dollies off against the expected manifest of goods. The data is transmitted back to the Swindon Distribution Centre in real-time using SmartChain and Savi Asset Management System software on a local computer. Again, if dollies are incorrectly unloaded, the driver is informed by flashing lights and a warning siren.

The implementation described here is the first system of its type anywhere in the world combining Bar Codes, Active RFID and GPS in a single supply chain visibility solution. The combination of these technologies was considered by the judges of the European Retail Solutions Awards to be a key factor in selecting Woolworths’ implementation as Supply Chain Solution of the year. Woolworths Plc. was commended for the broad scope of integrating these technologies across the supply chain.

## Return on Investment (ROI)

The Chipping of Goods Initiative covers only a small proportion of the goods delivered from the Woolworth’s Swindon distribution center to the stores. Even though this is a limited trial, it is envisaged that if the same technology were to be rolled out over the full distribution infrastructure a reduction in the order of 10% would see the system pay for itself in the first year.

## The Key Benefits: Complete Supply Chain Visibility & Increased Revenue

Woolworths has benefited on many levels through the Chipping of Goods Initiative and RFID implementation. With the new RFID Supply Chain solution and Savi Asset Management System, Woolworths can now track conveyances and goods throughout the retail distribution system. This will help reduce shrinkage through increased visibility and audit trails. Reduced shrinkage and theft means increased profit margins.

Previously, without accurate knowledge of mis-delivered goods, out-of-stock situations could result in lost sales. Now the increased visibility will help prevent misrouting and mis-deliveries, and will allow store inventory balances to be better managed.

Other benefits to Woolworths include:

-   Improved goods distribution will minimize costs and increase top line revenue
    
-   Increased profit margins means increased shareholder value—stock prices will go up
    
-   Elimination of incorrect deliveries of dollies to the stores involved
    
-   Successfully tracking goods between warehousing and in-store
    
-   Control over the storage and transportation of their goods
    
-   Assurance of a reliable and secure transport system for every shipment—every time
    

In the future, Woolworths expects that RFID systems will play a significant role in the control and tracking of their goods—nationwide.

## About Savi

Savi is the proven leader in global supply chain security and real-time asset management with over 14 years of logistics infrastructure experience. The company’s broad customer base includes the U.S. Department of Defense as well as numerous international ports, terminal operators, carriers, asset owners and third-party logistics providers. Founded in 1989, Savi Technology is privately held, with headquarters in Sunnyvale, California and offices in Hong Kong, Johannesburg, London, Singapore, Taipei, and Washington D.C.

# Case Study: Smart & Secure Tradelanes—Phase One Review

A Case Study on Leveraging Security and Efficiency in Today’s Global Supply Chains via Network Visibility

_Courtesy: Savi Technoloy (Based on “Network Visibility: Leveraging Security and Efficiency in Today’s Global Supply Chains” whitepaper)_

|  | _“The U.S. government needs to focus not merely on security, but all the other economic benefits and efficiency gains enabled by implementing systems like SST—which can dramatically decrease costs in the global supply chain.”_ |  |
|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
|  | --_SST Phase One logistics service provider_ | --_SST Phase One logistics service provider_ |

## Introduction

Smart and Secure Tradelanes (SST) is an industry-funded supply chain security and efficiency initiative. It was founded on the premise that the considerable gaps in global supply chain security put prosperity, free trade, and economic development at risk. These gaps pose the real risk that a terrorist event could lead to a shutdown of ocean ports and a strangling of trade. While industry has become acutely aware of the threat posed by the potential use of a weapon of mass destruction, any source of mass disruption poses an equally grave threat to efficient trade.

SST is a unique and ambitious initiative. Among its distinctions are that it is:

1.  _Industry-directed and funded,_ which demonstrates that industry can work together to voluntarily fund, build, and manage a global supply chain security network.
    
2.  The _largest commercial real-time supply chain security project_ ever undertaken. During Phase One, sixty-five participants across three continents monitored 818 containers through eighteen tradelanes.
    
3.  A _global network_ based on best-of-breed active RFID and other technologies that can become a platform for integration and innovation.
    
4.  _Focused on real-world operational and economic results_—test cases were developed and data gathered using real containers containing real goods bound for destinations in the U.S., Europe, and Asia. Leading authorities on the execution of the supply chain and security analyzed this data.
    

## Assumptions

SST Phase One participants approached the challenges of securing the global inter-modal freight transportation system with some fundamental assumptions:

-   Industry could not be burdened with excessive regulation or cost such that it breaks the back of global trade. Conversely, industry could not afford to delay action in searching for security solutions.
    
-   Real-time visibility into the status and location of shipments increases efficiency in the supply chain, which leads to substantial economic benefits for all participants.
    
-   Information on the execution of the supply chain must be transparent—the physical chain of custody must be tightly linked with a virtual chain of information, and that information must be available to authorized participants on a strict need-to-know basis.
    
-   It is not possible, in terms of time or financial investment, to completely eliminate risk.
    

## Phase One Network Implementation

Implementation of the Smart and Secure Tradelanes initiative is taking place in progressive phases. SST Phase One was initiated in July 2002 and completed in June 2003. SST Phase Two is in its initial phases and is intended to conclude mid-2004.

Among the first objectives of SST Phase One was to design an information network that would:

-   Tightly couple the chain of custody to a chain of information in real time through automated data collection
    
-   Be compatible with legacy systems that were implemented for business or political reasons
    
-   Enable “plug-and-play” of existing and emerging process and technology solutions
    

To build the network, SST adapted active RFID and other technologies already in use by the U.S. Department of Defense (DoD). This solution, called the Total Asset Visibility (TAV) network, has been in active use since 1991 to monitor military shipments around the globe. In addition to the DoD, SST members reviewed best practices developed by freight consolidators, UPS and FedEx.

Leveraging existing technologies and best practices accelerated and simplified network implementations. Concept to implementation of eighteen tradelanes took only three and a half months.

The primary components of the SST Phase One network were:

-   **_Wireless networks_.** The SST wireless networks were based on active RF (Radio Frequency) and GSM (cellular / Global Systems for Mobile communication). The RF networks used the 433.92 MHz frequency, which was selected because of its known performance metrics (based on its use in the DoD TAV network), broad acceptance, and high performance in challenging supply chain environments, where speed, effective propagation around metal, and ruggedness are essential.
    
    The SST network consisted of fixed and mobile RFID readers that covered sixty-four critical nodes across eighteen tradelanes. These critical nodes function as one or more of the following:
    
    -   Point of origin/containerization
        
    -   Port of loading
        
    -   Transshipment port, if applicable
        
    -   Port of discharge
        
    -   Point of destination or deconsolidation
        
    
    Like TAV (see “[Case Study: Operation Enduring Freedom/Operation Iraqi Freedom](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/apa.html#app01lev1sec4 "Case Study: Operation Enduring Freedom / Operation Iraqi Freedom (OEF/OIF)")”), the SST network is extensible and can be device-agnostic, enabling continuous innovation that allows industry to choose a mix of best-available technologies and processes.
    
-   **_Smart Containers_.** Eight hundred and eighteen intermodal containers were affixed with electronic seals that included intrusion/tamper detection sensors (to detect the status of high security bolt seals) and active RFID tags (for two-way system authentication, and communication of location and container status). Each sealing event generated a unique and random sealing event ID that was captured in both the electronic seal on the container and the TSS software (see _Software_, below), making it theoretically impossible to spoof the seal.
    
    Electronic seals automatically reported their identification and security status to stationary or handheld RFID readers at each critical node, which led to a virtual chain of information that was tightly coupled with the physical chain of custody.
    
-   **_Software_.** The Web-based Transportation Security System (TSS) software was used to record container routing and scheduling plans prior to loading. The containers were then monitored in TSS at each of the four (or five) critical nodes using data received by the SST network and EDI feeds. All events were logged in an audit log. Unexpected deviations immediately triggered alerts to notify authorized parties.
    
    Layered security controls were implemented in TSS, including personnel authorization and authentication at the critical point of stuffing, and “virtual border” risk analysis checks at ports of loading. The TSS federated database architecture enabled chain of information sharing on a strict need-to-know basis, and secure (encrypted) connectivity between supply chain participants, who typically would not be readily accessible to each other. TSS was designed for connectivity and collaboration between:
    
    -   Manufacturing and distribution operations
        
    -   Shippers and service providers
        
    -   International terminal operators and domestic terminal operators
        
    -   Shippers and terminal operators
        
    -   All of these participants to domestic and international government entities
        
    -   Potential interagency and government-to-government connectivity
        
    
-   **_Other network components_.** Additional components included: network connectivity using Internet and wireless standards such as 802.11B; computer hardware, such as Unix servers from Sun Microsystems and integrated wireless terminals; and industry-standard network and application software, such as J2EE-based application servers from BEA, and SQL relational databases from Oracle.
    

## Phase One Operational Test Findings

SST Phase One operational tests were launched in November 2002. Within only three and a half months, SST implemented a network that can be a platform for innovation and integration across eighteen tradelanes. By the time operational tests were completed in June 2003, SST demonstrated improvements in both supply chain security and efficiency.

### “As-Is” Process Findings

The following anecdotes were gathered during interviews conducted at the beginning of SST Phase One. They reflect typical operational problems and vulnerabilities associated with “as-is” supply chain processes:

-   One importer stated that it receives only sixty-five percent of the required supply chain data. Of the sixty-five percent, approximately thirty percent was inaccurate, untimely, or incomplete. This significantly impacted the effectiveness of the data for critical operational decision making.
    
-   When using legacy systems to track containers, one large multinational shipper factors in a transit time deviation of six and a half days for a specific tradelane. Only three days are factored in for material deviations, such as a late ship. The other three and a half days compensate for process and information latencies.
    
-   Another participant often receives arrival notices days after a container arrives at a specific inland rail terminal.
    
-   Security experts, government officials, and supply chain operators cited the human element as the greatest vulnerability.
    

SST Phase One operational testing exposed further problems with existing processes:

-   Instructions to check mechanical seals for tampering were correctly followed in only fifteen percent of test cases.
    
-   Five percent of tested containers deviated significantly from their assigned routing.
    
-   Container dwell time at points of origin ranged from 1.5 hours to over 12 hours.
    
-   Shipment manifest data is typically paper based and manually collected well after a container leaves the point of origin.
    

### SST Network Findings

Implementing SST procedures and active RFID technologies had positive effects on supply chain security and efficiency. Analysis of the positive security and operational effects of implementing SST included:

-   **Timeliness:** Information generated by the SST network was more timely than existing processes. In one example, EDI data lagged automated SST data by two days.
    
-   **Accuracy:** Of the containers tracked end-to-end, 100% were found to have correct and accurate container, route, and manifest data associations within the TSS software.
    
-   **Completeness:** A substantial portion of manifest entry was enabled at the point of origin through the Web-based TSS application.
    
-   **Completeness:** The automatic creation of detailed audit logs ensured accountability and created a basis for forensics analysis.
    
-   **Location tracking:** The SST network was able to identify the location of containers in real time. In one example, a shipper was able to locate and reroute recalled products while in-transit.
    
-   **Alerts:** Within three seconds, the TSS network checked for security risks and verified handling instructions. The TSS software was able to deliver a go/no-go signal and alerted relevant participants when there were any discrepancies.
    
-   **Process:** The SST virtual border process eliminated the need for expensive, time-consuming, and unreliable manual checks of high security bolts.
    
-   **Process:** All new point of origin security and business processes (user authentication and access controls, sealing, shipment information, and so on) were completed with minimal incremental delay to existing business processes.
    
-   **Process:** Manifest information was aggregated across all supply chain and logistics partners far upstream.
    
-   **Process.** Manifest information was stored centrally in the TSS software, where it was shared on a strict need-to-know basis with authorized parties.
    
-   **Process:** TSS was shown to be able to automatically transmit 309 manifest information to U.S. CBP’s AMS for 100% compliance with 24-Hour AMR.
    

The initial deployment of SST functionality enabled continuous improvement. Improvements made during the tests were:

-   **Usability:** Training materials for the TSS software were improved early in Phase One, and the software is in the process of being localized for different regions. The menus on handheld readers were simplified with screen icons to make them language independent.
    
-   **Reliability:** False-positive tamper alerts were resolved by optimizing the intrusion/tamper detection sensors, and by prototyping new form factors for the electronic seals that prevent accidental damage.
    
-   **Network availability:** GSM (Global Systems for Mobile Communication) was not widely available in the U.S. This was solved by deploying wireless LANS. GSM availability was not an issue in Europe or Asia, where GSM wireless infrastructures are prevalent.
    
-   **Durability:** Industrial, ruggedized handheld devices replaced commercially available PDAs, which were vulnerable to damage in ports and yards. Electronic seals were prototyped with a new form factor to eliminate the risk of accidental damage.
    
-   **Data integration:** Synchronizing container tracking data from EDI and other sources and modes was addressed by the TSS software, which enabled event and data management and reconciliation through its business logic and realtime event management functions.
    

### Economic Analysis

Since importers and exporters drive typical supply chain service provider relationships, the focus of the analysis was on the costs and benefits to this important constituency. Based on Phase One economic modeling, the general conclusion is that active RFID is a deployable and affordable technology that is suitable for a global supply chain security and efficiency network.

Dr. Hau Lee and his colleagues at the Stanford University Global Supply Chain Management Forum applied proven inventory models and analytic techniques to the data. Methodologies and analyses included: “what if” scenario and sensitivity analysis: best, likely, and worst cases; Stanford University theory of safety stock and inventory; Stanford University theory of inventory visibility; and inventory-customer service tradeoff analysis. When provided the option, analysts used conservative data inputs and variables.

## SST Phase One Estimated Potential Benefits

A single end-to-end SST move of a typical container nets $378-462 of potential value to the shipper when subtracting the operating and variable costs. This amounts to 0.54-0.66% as a percentage of average total container value shipped in SST phase I[<sup class="footnote">[1]</sup>](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/#ftn.app01fn02). The per container potential benefit ranges to a typical shipper in SST Phase One are summarized as follows:

| **Area of Potential Benefit** | **Potential Benefit as a Percentage of Avg Total Container Value** | **Potential Per Container Benefit** |
|---------------------------------|----------------------------------------------------------------|---------------------------------|
| Reduction in Safety Stock | .25 - .30% | $173 - 211 |
| Reduction in Pipeline Inventory | .13 - .16% | $91 - 111 |
| Reduction of Service Charges | .08 - .10% | $56 - 68 |
| Administrative Labor | .04 - .05% | $31 - 38 |
| Reduction of Pilferage, | .04 - .05% | $28 - 34 |
| Inspections, Loss |  |  |
| **Total** | **.54 - .66%** | **$378 - 462** |

This model assumes that the average cargo value of containers routed through the top ten importing tradelanes is $70,000. Operational benefits will be higher for shipments valued over $70,000; low-value commodities might not derive meaningful economic benefit.

The financial model developed for SST concludes that there are significant potential economic benefits derived by the SST security solution for a typical shipper. While the ability for shippers to capture these potential benefits will vary, the model substantiates the hypothesis that security and logistics efficiency are closely associated.

This model also demonstrates that shippers can comply with emerging security requirements while reducing logistics costs and/or increasing profits by optimizing the inventory-customer service tradeoff.

![Improving Service and Inventory](Appendix%20A%20%20RFID%20Field%20Guide%20Deploying%20Radio%20Frequency%20Identification%20Systems/xafig01.jpg)

**Figure 1. Improving Service and Inventory**

The real-time security automation functionality of SST could give shippers the flexibility to decrease inventory safety stocks, increase customer service levels, or both. Shippers in turn could then optimize this tradeoff based on their relative position in the market.

Shippers that are market leaders may be more inclined to leverage SST value by decreasing safety stocks since the opportunity cost of losing an additional customer in such markets is relatively lower. Conversely, a firm in a more competitive environment may attempt to increase market share by providing better customer service and fewer stock-outs.

## About SST Participants

SST Phase One deliberately sought to work with participants from a large number of vertical industries and countries. Sixty-five organizations participated in SST, including nineteen shippers from nine vertical markets.

| **Total Participants** | **65** |
|--------------------|-----|
| Shippers | 19 |
| Ports | 13 |
| Service providers | 12 |
| Carriers | 11 |
| Technology vendors | 10 |

| **Breadth of SST Initiative** |  |
|---------------------------|-----|
| Tradelanes | 18 |
| Continents | 3 |
| Industry segments | 9 |

Port operators included Hutchison Port Holdings, PSA, and P&O Ports, which together account for more than seventy percent of intermodal trade.

| **Seaport operators** | **Ports** |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -   Hutchison Port Holdings
    
-   PSA
    
-   P & O Ports
    
-   China Merchants Holdings International
    
-   Stevedoring Services of America (SSA) | -   Hong Kong
    
-   Singapore
    
-   Rotterdam
    
-   Felixstowe
    
-   Antwerp
    
-   Seattle-Tacoma
    
-   Long Beach
    
-   Los Angeles
    
-   New Jersey
    
-   Charleston
    
-   Savannah
    
-   Houston |

In addition, SST members participate in numerous U.S. government, international, and cross-border programs and pilots. These organizations and programs include:

-   U.S. Bureau of Customs and Border Protection (CBP): Container Security Initiative (CSI)
    
-   CBP: Customs-Trade Partnership Against Terrorism (C-TPAT)
    
-   CBP: 24-Hour Advance Manifest Rule (24-Hour AMR)
    
-   U.S. Transportation Security Administration (TSA): Operation Safe Commerce (OSC)
    
-   Joint Container Working Group (CWG) of the U.S. Department of Transportation and U.S. Customs and Border Protection
    
-   International Standards Organization (ISO): ISO/TC8
    
-   International Maritime Organization (IMO): International Ship and Port Facility Security Code (ISPS)
    
-   Asia-Pacific Economic Cooperation (APEC): Secure Trade in the APEC Region (STAR)
    
-   Container Handling Cooperative Program (CHCP)
    
-   APEC: Bangkok-Laem Chabang Efficient and Secure Trade (BEST)
    
-   World Customs Organization (WCO): various international pilot programs
    
-   European Union: Safe InterModal Transport Across the Globe (SIMTAG)
    

  

___

[<sup class="para">[1] </sup>](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/#app01fn01) The TB-free status is not awarded right away because TB can remain dormant for a while. A 5-year period ensures that multiple generations of animals are tested and the ones with dormant TB are identified and eliminated.

[<sup class="para">[1] </sup>](https://learning.oreilly.com/library/view/rfid-field-guide/0131853554/apa.html/#app01fn02) Based on average container cargo value of $70,000.

table of contents

search

settings

Appendix A

queue

RFID Field Guide: Deploying Radio Frequency Identification Systems