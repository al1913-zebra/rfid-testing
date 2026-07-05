##### Preparation for RFID Certification Exam

## Cheat Sheet – RFID Deployment Steps

### MAIN OBJECTIVES

### MAIN OBJECTIVES

-   Know the steps to deploy RFID Solution
-   The basic steps that should be taken to ensure that other radio equipment will not interfere with an RFID deployment?
-   The basic steps that should be taken to ensure that other electrical equipment will not interfere with an RFID deployment?
-   Understand the role of “middleware” in retrieving RFID data from the reader and passing it on to the system that will eventually process or use it.

Download the Cheat Sheet in PDF

### 1\. SITE ASSESSMENT AND SITE SURVEY

### 1\. SITE ASSESSMENT AND SITE SURVEY

All the needs are determined during a site and workflow assessment:

-   Current data collection **system assessment and business process analysis** – determines the current systems used and processes deployed, their strengths and weaknesses
-   **A site survey** – provides a physical review, analysis, recommendations and report by qualified RFID Engineers of the site where RFID infrastructure and equipment will be installed so that the RFID processes work 100% of the time

**The basic steps that should be taken to ensure that other radio equipment will not interfere with an RFID deployment?**

-   A “Site Survey” to establish what other radio equipment may be in use
-   Figure out which part of the RFID radio spectrum in use may be impacted

**The basic steps that should be taken to ensure that other electrical equipment will not interfere with an RFID deployment?**

-   A “Site Survey” to establish what electrical equipment may be in use and whether or not it is creating Electromagnetic Interference (EMI)
-   Assess if any EMI present is sufficient to degrade the RFID system performance

Site survey describes the whole process of site assessment that determines the needs of the customers, and provides information based upon the system will be designed and deployed.

Some, call a site survey only the part of the whole site assessment where the possible radio or EMI interference is determined, which is performed by using **a spectrum analyzer.**

**The Site Assessment also includes review of environmental conditions:**

-   **Weather** (outside) – rain, snow, wind, temperature, humidity
-   **Type of Facility** – industrial / business, Store front, Clean room
-   **Condition within the Facility** – temperature extremes, humidity, chemicals, industrial dust / lint, vibration, motion / movement
-   **Location of –** heavy machinery, conveyor belts, restricted zones by machines
-   **Emissions from Machines:**
    -   Heat, steam, chemicals – will damage hardware
    -   Electromagnetic Field (EMF) and Electromagnetic Interference (EMI) – will affect system performance and reading tags by interfering with the RF signal
-   **Type of storage shelves and cabinets** (metal shelving will block/reflect RF)

### 2\. PRE-INSTALLATION

### 2\. PRE-INSTALLATION

-   Preassemble portals and other RFID and mounting hardware before arriving on site if possible
-   An installer will need basic hand tools, power tools, tie wraps, beam clamps and fasteners, etc.
-   Check equipment inventory – Hardware, cables, mounting devices
-   Provide RFID Fixed Reader protection
    -   Using a NEMA-4
    -   Using only light plastic enclosures
    -   Reader embedded in a portal
-   Verify cable lengths for antenna at each read point
-   Confirm antenna, power and network cabling for each read point are correct
-   Ensure reader accessibility for maintenance checks
-   Verify multiplexing sequences of readers
-   Confirm criteria for determining a tag is read
-   Review reader placement to ensure close proximity to the antennas they power
-   Position triggering devices – Where are they to be mounted?
-   Verify
    -   Power and ground connections
    -   Environmental protection
-   Any facilities work must be completed prior to the scheduled installation date:
    -   Holes in walls for cables
    -   Special brackets or antenna masts
    -   Enclosures
    -   Bollards
-   Network cabling/infrastructure must meet industry standards
    -   Ensure reader’s status indicator LEDs are easily visible to an operator
    -   Validate fixed reader status indicators: green for success, amber for on-going and red for failure
    -   Check for environmental conditions (even though this has been done at the site survey, something could have changed or not have been accounted for)

### 3\. INSTALLATION

### 3\. INSTALLATION

**Antenna**

-   Connect an antenna to a reader only when it is powered off
-    Do not disconnect the antenna when ‘read’ is on
-    Protect antenna installations with a guard
-   Tilt the antenna to extend the read zone

**Reader**

-   Mount readers securely so that they are not disturbed, bumped or damaged
-   As a rule of thumb leave 5 to 6 inches of clearance on all sides of a reader (for ventilation and access purposes)
-   Place/orient readers correctly, according to the recommendations of manufacturers
-   Some readers may have environmental enclosures for protection. Place them accordingly
-   Place readers so that its status indicator lights or LEDs are easily visible to an operator
-   Reader ports that are not in use, should not be activated
-   Never power up an antenna port when not in use
-   Use surge protector for power

**Cables**

-   Select the best RF cables for the application
-   Know cable attenuation in dB/m
-   Impedance has to match antenna and reader impedance
-   If RF cables are stiff/inflexible, secure them correctly so that they are not under mechanical stress
-   Coil up extra cable lengths
-   Place equal cable lengths from reader to antenna pairs

**Tagged items**

-   Ensure that the tagged item does not travel too close to an antenna; it should avoid antenna near fields.
-   Place markers/guards accordingly, near the antenna positions
-   Ensure that the tag and the reader have direct line of sight for UHF. Tags in between cartons may not be detected
-   Position the tags on the outside of the pallet load. Avoid overlapping labels.

### 4\. MIDDLEWARE

All readers have to be connected to the network and configured properly to communicate with the middleware and back-end systems.

-   Manages hardware devices and communicates between readers and business applications.
-   It’s a set of many different distributed software elements: Event Management, Data Conversion, Database Management, Data Consolidation, Data Reporting, etc.
-   Refers to all the software between the on-device software and the business applications.

##### MIDDLEWARE FUNCTIONS

#### SUPPORT READ/WRITE DEVICES

-   Tag/reader agnostic
-   Management console

#### EVENT DATA MANAGEMENT

Retrieve data from the readers, perform light processing, and pass the data to the back-end system. Data processing involves:

-   Cleanse data – eliminate redundancy and smooth missed reads
-   Filter data – based on product or time stamp
-   Massage data – aggregate, summarize, correlate

#### EPC HANDLING

-   Provisioning
-   Format negotiation

#### EVENT RECOGNITION

-   Rules based
-   Exception driven

#### TASK MANAGEMENT

-   Directed activity
-   Light logic

#### BUFFER I/O ACTIVITY

-   Cluster reads
-   Tag data updates

##### What type of data could be available from the reader:

-   Identity of the item observed by the RFID system
-   The reader/antenna combination that observed the item
-   When the observation was made (date and time stamp)
-   The strength of the signal that was returned by the item
-   How many times the item’s RFID tag was read
-   Protocol of the tag
-   Tag ID

Let's Talk!

Please complete the form below and one of our RFID subject matter experts will reach out to assist you

  
  
  
  
  

Preferred Contact MethodPreferred Contact Method (Any)EmailPhone CallText

        

Δ

By submitting this form, you acknowledge that RFID4U collects and processes the information you provide for the purpose of responding to your inquiry, improving our services, and protecting our website from spam and misuse. We do not sell or share your information for marketing purposes. For more details, please review our [Privacy Policy.](https://rfid4u.com/privacy)