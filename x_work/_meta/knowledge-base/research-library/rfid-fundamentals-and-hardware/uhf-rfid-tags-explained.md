## Contents

1.  [What Are RFID Tags](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#introduction)
2.  [How Do UHF RFID Tags Work?](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#howdotheywork)
3.  [What's Inside a UHF RFID Tag?](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#whatsinside)
4.  [Tag Form Factors](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#tagformfactors)
5.  [Tag Positioning - SOAP](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#tagpositioning)
6.  [Tag Attachment Methods](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#attachmentmethods)
7.  [Application Surface Materials](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#surfacematerials)
8.  [Tag Special Features](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#specialfeatures)
9.  [The Relationship Between Tag Read Range & Size](https://www.atlasrfidstore.com/rfid-resources/what-are-rfid-tags-uhf-tags-explained/#readrangesize)

## What are RFID Tags?

[RFID tags](https://www.atlasrfidstore.com/rfid-tags/) are placed on items to identify or track those items over time or throughout their lifecycle. RFID tags can be used to track all types of objects in industries like healthcare, retail, and manufacturing, to keep track of assets or inventory. This guide covers the main aspects to consider before deciding on or purchasing an RFID tag. Each tag may vary significantly from another, which makes choosing one that has been designed to work in environments and applications similar to your application essential in order to achieve the best results.

## How Do RFID Tags Work?

RFID tags communicate with RFID readers and antennas via electromagnetic waves. The reader/ antenna combination directs electromagnetic radio waves to the RFID tags in the vicinity. The [energy](https://www.atlasrfidstore.com/rfid-insider/rf-physics) from the waves, harnessed by the RFID tag’s antenna, forms a current moving towards the center of the tag energizing the integrated circuit (IC). The IC turns on, modulates the energy with data from its memory banks, and directs a signal back out through the [tag’s antenna](https://www.atlasrfidstore.com/rfid-insider/rfid-tag-antennas). The remaining, modulated energy that replies to the reader/antenna is known as “backscatter”.

**Quick Facts About UHF RFID Tags:**

-   Most do not have a battery, and are powered exclusively by electromagnetic waves.
-   Those with batteries ([Battery-Assist Passive RFID Tags](https://www.atlasrfidstore.com/rfid-insider/bap-rfid-tags) and [Active RFID Tags](https://www.atlasrfidstore.com/rfid-insider/active-rfid-vs-passive-rfid)) can achieve much longer read ranges.
-   They do not require line of sight, unlike barcodes.
-   The way that tags couple, or talk to, the RFID reader is called “backscatter”.
-   An algorithm on each tag called “[Anti-Collision](https://www.atlasrfidstore.com/rfid-insider/uhf-rfid-tag-communications-protocols-standards)” defines the order in which to reply if multiple tags are in the read area.
-   The read range can vary from inches to over 120 feet depending on the tag.
-   The integrated circuit (IC) has four [memory banks](https://www.atlasrfidstore.com/rfid-insider/17-things-might-not-know-gen-2-rfid-tag-memory-banks) – EPC, TID, User, Reserved.
-   Each type of tag has a uniquely shaped antenna to ensure the best reactance.

## What's Inside a UHF RFID Tag?

A basic UHF RFID tag is comprised of an antenna and the IC.

**Antenna** – A tag’s antenna is unique to that specific type of tag and its job is to receive RF waves, energize the IC, and then backscatter the modulated energy to the RFID antenna.

**Integrated Circuit (IC)/Chip** – the integrated circuit, also called the chip, contains four memory banks, processing information, send and receive information, and anti-collision protocols. Each IC type is unique, and there are only a handful of manufacturers. The main variation between ICs is the number of bits in the respective memory banks.

The four memory banks are as follows:

-   **EPC Memory Bank** – contains the Electronic Product Code which can vary in length from 96 to 496 bits. Some manufacturers use a randomized, unique number, while others use random repeating numbers.
-   **User Memory Bank** – the User memory bank can range from 32 bits to over 64k bits and is not included on every IC. If the tag does possess a User memory bank, it can be used for user defined data about the item. This could be information like item type, last service date, or serial number.
-   **Reserved Memory Bank** – the Reserved memory bank contains the access and lock passwords which enable the tag memory to be locked by the user and require a password to view or edit.
-   **TID Memory Bank** – the TID memory bank contains the Tag Identifier which is a randomized, unique number that is set by the manufacturer and cannot be changed. In order for the reader to read this number instead of the EPC, the reader settings must be changed to accommodate.

Because there is a chance that a tag’s EPC number is [not unique](https://www.atlasrfidstore.com/rfid-insider/encoding-rfid-tags-3-things-to-know), it is imperative to check before purchasing. Specifications may denote either “unique, randomized EPC number” or “Not guaranteed to be unique” (or some similar phrase). If you purchase a tag without a unique randomized EPC number, it may need to be reencoded with a new, specific number. [RFID readers](https://www.atlasrfidstore.com/rfid-readers/) are not able to differentiate between two tags that share the same EPC value.

The EPC number of each tag is read to identify the tag as well as the item that is tagged. If no software is used, the tag will simply read the EPC number; but, by incorporating software, it is possible to associate that number with a name, serial number, or even a picture on a database.

To see a list of UHF RFID IC's in order to compare specifications, check out our [UHF IC Comparison Guide](https://www.atlasrfidstore.com/rfid-resources/chip-comparison-guide/).

## Tag Form Factors

### Labels/Inlays

Labels and Inlays are two types of RFID tags that are characterized by being paper thin and flexible. The main difference in labels vs. inlays is that [inlays](https://www.atlasrfidstore.com/rfid-wet-inlays/) are typically clear and can be manufactured with or without adhesive. [Labels](https://www.atlasrfidstore.com/rfid-labels/) have a paper or poly (plastic) face so that that graphics or text can be printed on them and read clearly

Usually grouped together because of form factor and cost, labels and inlays are cost effective and can be purchased as low as $0.10 per tag when purchased in higher quantities. These tags are manufactured on rolls of a few thousand and can be run through an [RFID printer](https://www.atlasrfidstore.com/rfid-printers/) to be printed and encoded.

Labels and inlays usually weigh less than a gram and vary in length and width from about less than ½ an inch to over several inches.

### Hard Tags

[UHF RFID hard tags](https://www.atlasrfidstore.com/rugged-rfid-tags/) are classified as such because they are rigid and thicker than the paper-thin labels/inlays. Hard tags are made from many types of materials such as polycarbonate, ceramic, ABS, steel, polystyrene, and polypropylene.

Because of the tougher exterior and larger size, these tags are more expensive than labels and inlays. Depending on special features, hard tags can range from just under $1 per tag to over $15 per tag. Just like labels and inlays, these tags can also be less expensive when purchased in higher quantities.

Hard tags vary greatly in size and weight. The smallest tags are around 0.2 grams and the largest, rugged hard tags can be over 250 grams. Shapes and sizes of hard tags vary greatly, and can range from the size of a small pencil eraser to as large as a license plate.

## Tag Positioning - SOAP

Although tag positioning sounds like something to consider after a tag purchase, it is important at both the decision-making stage, as well as the post-purchase stage.

The key to tag positioning is the acronym [SOAP](https://www.atlasrfidstore.com/rfid-insider/improve-rfid-read-range) – which represents the four main aspects of tag positioning – **S**ize, **O**rientation, **A**ngle, and **P**lacement. Below is information about each, how to use them to select the ideal tag, and when to consider them.

### Size

The size of the tag is an important consideration when purchasing. Not only does tag size matter because it needs to fit the size of the object being tagged, but also because of the correlation between tag size and read range. In short, the larger the tag, the longer the read range (for more information, see The Relationship between Size and Read Range, page 13).

**Most Important:** Pre-purchasing

### Orientation

The tag’s orientation, vertical or horizontal or otherwise, in relation to the RFID system’s antenna is a critical factor in achieving ideal read rates. To find the orientation of the tag that produces the best read rates, rotate the tag on a flat surface and test it at different orientations. Of note, using [circularly polarized antennas](https://www.atlasrfidstore.com/circularly-polarized-antennas/) helps to mitigate any issues caused by tag orientation.

**Most Important:** Pre-purchasing, Post-purchasing, Testing

### Angle

The steeper the angle of the tag, the shorter the read range. When possible, ensure that the front of the tag directly faces the antenna. Even a small angle could cause a decrease in the tag’s read range. To mitigate this issue, it is best to an array of antennas to cover tags from multiple angles.

[Pitch, Yaw, & Roll](https://www.atlasrfidstore.com/rfid-insider/rfid-orientation-pitch-yaw-roll) are three additional aspects to consider that fall under both orientation and angle. Testing to cover these positions, will ensure the best read range is received with the selected tag and system.

**Most Important:** Post-purchasing, Testing

### Placement

Test readability in a variety of spots on the item to find the “sweet spot” that generates the best reads. On a cardboard box for example, find the side that will face the antenna/reader and then test in various places on that face to find the one that produces the best results.

**Most Important:** Post-purchasing, Testing

## Tag Attachment Methods

Dependent on the exact tag, attachment methods can vary from common forms like adhesive to unique ways such as shrink wrap. Inlays and labels use a permanent type of adhesive in most applications, while hard tags vary depending on the tag type, weight, application, and application environment. Below is a list of commonly used attachment methods for RFID tags.

![](https://cdn11.bigcommerce.com/s-ka7ofex/product_images/uploaded_images/attachment-methods-chart.png)

Deciding which attachment method to use will depend on the tag, item, and application. In all applications, choosing an attachment method can be just as important as choosing a tag. If an attachment method fails, the tag will fall off the item making it no longer trackable, and the application no longer accurate.

Below are a few specific aspects to think about before choosing the right attachment method for your application.

**Surface Area** – Just like prepping a car for a window or bumper sticker, the surface area of the item should be prepped for the attachment of the tag. Depending on the method, make sure the surface is smooth, dust and water free, and clean. (The tagging surface is further discussed in Application Surface Materials, page 09.)

**Exposure** – If the tag will be exposed to prolonged UV light, moisture, vibration, pressure, or chemicals, its attachment method will be exposed as well. Certain environmental conditions like the ones listed above will need special attachment methods that have been proven reliable in similar circumstances.

**Temperature** – As mentioned above in the exposure section, make sure that the attachment method chosen has been tested in similar conditions as your tagging environment. Extreme temperatures will have different effects on the compound or object used for attachment than the tag, like melting and/or becoming brittle and breaking.

**Application Lifespan** – Choose a tag as well as attachment method that will hold up the length of time that the item needs to be tagged. Some attachment methods will slowly degrade over time, depending on the chemical makeup. Evaluate the attachment method chosen to ensure it can last the amount of time the tag needs to stay on the item.

## Application Surface Materials

The surface of the item to be tagged will greatly influence tag selection, and, if there is more than one item surface type, a different tag should be chosen for each. For example, if an application is taking [inventory of assets](https://www.atlasrfidstore.com/rfid-insider/solving-asset-tracking-problems-with-rfid) and one asset is metal and another is plastic, then those two items will likely need to be tagged with two different [RFID tags](https://www.atlasrfidstore.com/rfid-tags/).

An object’s surface material is important because most tags have been tuned by the manufacturer to perform better when used on certain materials. The tag’s antenna is very sensitive to the type of material it is placed on because of the way it sends and receives signals. Attaching a tag to an incompatible type of surface material could result in a lower read range, lower read rate, or no reading at all.

The most well-known surface material for crippling read range when tagged with the wrong type of RFID tag is metal. [Metal](https://www.atlasrfidstore.com/rfid-insider/rfid-tags-on-metal-surfaces) causes problems with RFID for two reasons – first, metal [reflects RFID waves](https://www.atlasrfidstore.com/rfid-insider/rfid-multipath-em-waves) and, second, RFID tags are manufactured to perform on low-dielectric surfaces (plastic, wood, cardboard) not high-dielectric surfaces like metal. There are two easy ways to solve this issue, either purchase a metal-mount tag that has a built-in, low-dielectric backing or is tuned accordingly, or purchase a tag and place a low-dielectric material such as foam, in between the tag and the metal object.

## Tag Special Features

Nearly all UHF RFID tags have special features that make them attractive to certain applications or environments. Most of the time, these special features will help narrow down the search for the ideal tag.

While labels/inlays only have a few feature options, hard tags have quite a few, which usually explains their higher cost. Below are special features that can be found on labels/inlays or hard tags, and information about how they are used.

-   **Resistance to extreme temperatures** – Tags with this ability can be used for tagging items in freezers or cold temperature environments (as low as -50° C), or with high-temperature environments (up to 250° C).

-   **Availability: Hard Tags**

-   **Metal-mountable** – A few label/inlays exist that are [metal-mountable](https://www.atlasrfidstore.com/metal-mount-rfid-tags/), but the majority of metal-mount RFID tags are hard tags. These tags are tuned to work well on metal and must be used when tagging metal items unless a spacer is used to separate the metal object from the non-metal mountable tag. Of note, tags made specifically for on-metal applications tend to get better read range than those with spacers added post-manufacturing.

-   **Availability: Hard Tags, All-Surface Label Tags**

-   **Printability** – The ability to print directly onto a tag’s face is a unique feature of inlays/labels, which allows the tags to be identified visually, or support marketing/branding purposes. Most RFID inlays/labels can be run through an RFID printer which is very convenient for large scale operations. Of note, while it isn’t possible to print directly onto hard RFID tags, most still are able to support a manually applied label or sticker.

-   **Availability: Labels/Inlays**

-   **Embeddability** – The ability to be [embedded](https://www.atlasrfidstore.com/embeddable-rfid-tags/) within an item is very useful in some rugged applications where the tag could potentially get knocked off or be in the way of the item’s use. Most embeddable applications involve wood or metal. The key to embedding tags in metal is to make sure that only three sides of the tag are covered with metal while one side is left open to allow for reader/tag communication. Epoxy can be used to cover the open side to seal the tag in place.

-   **Availability: Hard Tags**

## Contents

-   **Impact resistance** – Some rugged application environments, like construction yards, need tags that can withstand impact from other objects. Non-impact resistant hard tags will not be able to withstand much shock before the enclosure breaks and the tag stops functioning.

-   **Availability: Hard Tags**

-   **Vibration resistance** – The vibration in vehicles, trains, and certain types of machinery can be problematic for not only RFID readers, but tags as well. Intense, constant vibrations need to be mitigated by using a tag that can stand up to that type of repetitive, high-intensity motion.

-   **Availability: Hard Tags**

-   **Customizable** – Most labels/inlays can be customized with graphics, text, or colors, but other labels can be [customized](https://www.atlasrfidstore.com/custom-rfid-tags/) to a specific shape and form factor, material type, or given a specialty adhesive depending on the item being tagged. Some hard tags can also be given a specialty adhesive, have labels manually applied, or be produced in certain colors. A minimum order quantity usually exists, but truly customizable tags can be designed and shaped according to the application’s needs.

-   **Availability: Labels/Inlays, Hard Tags**

-   **Autoclavable** – The autoclave is a piece of machinery that is used often in the healthcare field to sterilize instruments after use. Normal RFID tags cannot withstand the heat of the sterilization process, so it is necessary to choose a tag that is autoclavable for these applications.

-   **Availability: Hard Tags**

-   **UV resistance** – In applications where the tagged item will spend a significant time subjected to UV (or Ultra-Violet) waves, if the tag contains printed information on its face, the chosen tag will need to be resistant to the UV exposure. This includes printed tags that will be unprotected from sunlight (through a window or door) for long periods of time.

-   **Availability: Hard Tags, Label Tags**

-   **ATEX certified** – ATEX certification means that the RFID tags are approved for use in environments with an explosive atmosphere. These tags are used for applications in environments like mines or workplaces with activities that release flammable gases or vapors.

-   **Availability: Hard Tags**

-   **Chemical Resistance** – Chemical resistance is a feature that is used in the presence of airborne and water-based chemicals so that the tag does not breakdown or corrode from exposure.

-   **Availability: Hard Tags**

-   **Ingress Protection** – For applications around dust/dirt or water, ingress protection ratings (or IP ratings) are incredibly important to check before selecting a tag. The first digit of the IP rating will be 0 - 6 and indicates the protection against solids like dirt and dust. The second digit of the IP rating will be 0 – 9 and is the level of protection against liquids, like water. The highest IP ratings for tags would be a rating of 67, 68, or 69 depending on direct or indirect contact with liquids.

-   **Availability: Hard Tags**

-   **High Memory** – Tags that are available with a higher User or EPC memory can be used to store increased data on the tag, such as service dates and complete item identification. While [high memory](https://www.atlasrfidstore.com/rfid-insider/high-memory-rfid-tags-and-which-applications-need-them) is good for some applications, most RFID systems associate the tag ID in a database containing the same information by way of software. This frees up the memory on the tag and allows the tag to be read quicker.

-   **Availability: Hard Tags, Inlays/Labels**

## The Relationship Between Tag Read Range & Size

One of the biggest misconceptions about UHF RFID tags is that all tags get about the same read range regardless of the size, materials, or tagged items. In truth, all those factors combine to determine a tag’s general read range, but the tag’s size is the most influential component.

Because of how small antennas must be to fit within small tags, they can only send and receive data at just a fraction of the distance of typical large tags. Some of the smallest UHF tags can only be read from a few inches away. Generally speaking, read range increases as the size of the tag increases, with some of the biggest passive tags being able to read over 35 meters (115 feet).

The correlation between read range and size suggests that, for each application, there must be a compromise between the two in order to find the ideal tag. In some applications, such as tool tracking, the objects to be tagged can be so small, that size isn’t negotiable; therefore, tags for that application will have only a short read distance. When tracking items that are more accommodating with regard to surface area – a medium to long range tag can be chosen and provide a better balance between size and read range.

If you have any additional questions about if RFID is right for your application, or about RFID tags, don’t hesitate to [contact us](https://www.atlasrfidstore.com/contact-us/).