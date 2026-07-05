**Synthesis Lectures on Communications**


###### **Synthesis Lectures on Communications**


This series of short books cover a wide array of topics, current issues, and advances
in key areas of wireless, optical, and wired communications. The series also focuses on
fundamentals and tutorial surveys to enhance an understanding of communication theory
and applications for engineers.


###### Rongrong Zhang · Hao Liu

### RFID Applications

##### Secure and Efficient Backscatter Networking


Rongrong Zhang
Capital Normal University
Beijing, China



Hao Liu
Communication University of China
Beijing, China



ISSN 1932-1244 ISSN 1932-1708 (electronic)
Synthesis Lectures on Communications
ISBN 978-3-031-93033-1 ISBN 978-3-031-93034-8 (eBook)
[https://doi.org/10.1007/978-3-031-93034-8](https://doi.org/10.1007/978-3-031-93034-8)


© The Editor(s) (if applicable) and The Author(s), under exclusive license to Springer Nature
Switzerland AG 2026


This work is subject to copyright. All rights are solely and exclusively licensed by the Publisher, whether the whole
or part of the material is concerned, specifically the rights of translation, reprinting, reuse of illustrations, recitation,
broadcasting, reproduction on microfilms or in any other physical way, and transmission or information storage
and retrieval, electronic adaptation, computer software, or by similar or dissimilar methodology now known or
hereafter developed.
The use of general descriptive names, registered names, trademarks, service marks, etc. in this publication does
not imply, even in the absence of a specific statement, that such names are exempt from the relevant protective
laws and regulations and therefore free for general use.
The publisher, the authors and the editors are safe to assume that the advice and information in this book are
believed to be true and accurate at the date of publication. Neither the publisher nor the authors or the editors give
a warranty, expressed or implied, with respect to the material contained herein or for any errors or omissions that
may have been made. The publisher remains neutral with regard to jurisdictional claims in published maps and
institutional affiliations.


This Springer imprint is published by the registered company Springer Nature Switzerland AG
The registered company address is: Gewerbestrasse 11, 6330 Cham, Switzerland


If disposing of this product, please recycle the paper.


**Preface**


Radio Frequency Identification (RFID)-based backscatter technology boosts battery-free
wireless device development and pushes the large-scale deployment of passive Internet of
Things (IoT) systems. RFID technology has been paid more ever-increasing attention in
a variety of promising applications, such as logistics management, supply chain tracking,
environment sensing, gas/liquid leakage monitoring, material identification, health-care
monitoring, et al. On account of the ultra-lightweight passive RFID tag and large-scale
IoT network deployment, the fundamental problem is to schedule the numerous passive
tags to access the network efficiently and ensure the security of data transmission. Driven
by these requirements, in this book, we provide a systematic treatment of the theoretical
foundations and algorithmic tools necessary in the design and implementation of efficient
and secure backscatter networking for RFID applications.

Specifically, focusing on the missing event detection of RFID applications, we deliver
a comprehensive treatment on the following problems ranging from theoretically efficient
and secure writing scheme and access protocol design to practical system implementation
with Commercial Off-The-Shelf (COTS) RFID tags.


- Efficient multiple group labeling scheme in RFID systems.

- Secure anonymous group-wise writing scheme for RFID systems.

- Compact filter-based access protocol for multi-tagged RFID systems.

- Fast and reliable access protocol for multi-tagged RFID systems.

- Practical hashing-free access implementation with COTS RFID systems.


In the book, we unveil a research and exposition line from theoretical modeling and
algorithm design to practical COTS RFID system implementation and optimization.

In order to reduce the useless transmission in the RFID system, we start by investigating an efficient multi-seed group labeling scheme in Chap. 2. Specifically, we employ a
multi-seed approach to attain efficient group labeling while illuminating the NP-hardness
associated with the use of multiple seeds. Due to the NP-hardness of the problem, we


v


vi Preface


introduce an approximate seed assignment algorithm designed to edge closer to the optimal solution. This algorithm selects the slot that is mapped by the highest number of
tags within the same group and assigns the corresponding seed to that slot. Moreover, we
consolidate the approximation algorithms with a concrete communication mechanism for
both the reader and the tags, thereby developing a unified group labeling protocol.

To further improve the security of data transmission in RFID-enabled multi-task
backscatter systems, we then come up with a secure, anonymous, group-wise writing
scheme in Chap. 3. Specifically, we propose the Overlapped Bloom Filter-based protocol
(OBF) and its enhanced version, OBF+. The core is to construct an approximately random sequence as noise by making transmission data for different tag groups overlap with
each other, thus hiding the original information with a low computational complexity. The
compact filter can guarantee the time efficiency while improving the security of the group
writing. To make tags aware of the correctness of the decoded group data, the enhanced
version introduces the complementary code-based check mechanism to eliminate the fault
data.

We then delve into the issue of missing detection in multi-tagged systems, stemming
from the necessity for heightened security and precise object state sensing. Unlike previous studies on single-tagged systems, the response of just one tag attached to an object
suffices to confirm the presence of that object instead of all tags in the multi-tagged
systems. That said, a pivotal guideline for protocol design is to query a subset of tags
rather than the entirety, as advocated in earlier works. Accordingly, we concentrate on two
unexplored yet rational avenues for designing missing detection protocols in multi-tagged
systems.

Initially, we develop a compact filter-based access protocol for a multi-tagged RFID
system to designate and interrogate the tags in Chap. 4. Specifically, we introduce a twophase Bloom filter-based missing detection protocol, which marks the representative tags
(comprising one tag from each object) and facilitates their responses. To enhance the
temporal efficiency of missing detection, we replace the Bloom filter with a compressive
filter to designate the representative tags and then utilize a composite vector to effectively
coordinate their reporting of presence.

Subsequently, we create a fast and reliable access protocol on hash seed searching in
Chap. 5. Leveraging the properties of hash functions, an appropriate seed can map one tag
from each item to a unique value, thereby enabling the extraction of a subset of tags within
the system and assigning them to singleton slots in the response frame for detecting any
missing items. The reader first broadcasts the selected seed along with the corresponding unique hashing values, allowing the tags to ascertain when and whether to respond
based on the received seed and hashing values. However, the computational complexity
of seed searching escalates exponentially with the increasing number of tags. The disparity between the clock frequency of seed searching and the communication bandwidth
presents an opportunity to strike a balance between computation and communication,


Preface vii


revealing a feasible method for seed searching. Consequently, we design a foundational
protocol alongside an enhanced version aimed at further improving time efficiency.

Finally, we set up the practical hashing-free access of the missing event detection
platform with COTS RFID systems in Chap. 6. Unlike existing research in this domain,
COTS tags lack hashing functionality, rendering them incapable of randomly accessing
the reader through hashing mappings. In this context, we establish a theoretical model
for missing detection specific to COTS tags and utilize the EPC-global Gen2 standard
employed by these systems to devise protocols for missing detection. Specifically, we
leverage the _Q_ -command within the Gen2 standard to query the tags, facilitating their
random access to the reader and enabling a point-to-multipoint communication pathway
from the reader to the tags. To mitigate access collisions in point-to-multipoint scenarios,
we subsequently design a point-to-point protocol that is free from collisions by singularizing the tags in each slot with a selective bitmask, thus enhancing the temporal efficiency
of missing detection.


Beijing, China Rongrong Zhang

Hao Liu


**Competing Interests** The authors have no competing interests to declare that are relevant
to the content of this manuscript.


ix


**Contents**


**1** **Introduction** . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
1.1 The Universality of RFID Technology . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
1.2 The Group Writing of RFID Tags . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
1.3 Missing Event Detection in RFID Systems . . . . . . . . . . . . . . . . . . . . . . . . . . 6
1.4 The COTS Implementation of RFID Systems . . . . . . . . . . . . . . . . . . . . . . . . 7
1.5 Book Organization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8


**2** **Efficient Multiple Group Labeling Scheme in RFID Systems** . . . . . . . . . . . . . 11
2.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
2.2 Problem Formulation and Motivation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
2.2.1 Single-Seed Versus Multi-Seed . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
2.2.2 Motivation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
2.3 Group Labeling Protocol with Multiple Seeds (GLMS) . . . . . . . . . . . . . . . 16
2.4 Seed Assignment Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
2.4.1 Approximation Algorithm . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
2.4.2 Simplified Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
2.5 Parameter Configuration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
2.6 Performance Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
2.6.1 Simulation Settings . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
2.6.2 Simulation Results . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
2.7 Related Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 34
2.8 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 36
2.A Proof of NP-Hardness . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37
2.B Proof of Lemma 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 38
2.C Proof of Lemma 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39


xi


xii Contents


**3** **Secure Anonymous Group-Wise Writing Scheme for RFID Systems** . . . . . . . 41
3.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
3.2 Related Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
3.3 System Model and Problem Formulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44
3.3.1 System Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44
3.3.2 Problem Formulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44
3.3.3 Overview of Our Solutions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
3.4 OBF: Overlapped Bloom Filter-Based Group Writing . . . . . . . . . . . . . . . . . 46
3.4.1 Motivation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46
3.4.2 Protocol Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
3.4.3 Parameters Optimization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
3.5 OBF+: An Enhanced Solution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 53
3.5.1 Motivation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 53
3.5.2 Protocol Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 53
3.5.3 Parameters Optimization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 54
3.6 Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 59
3.6.1 Experimental Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 59
3.6.2 Implementation of the Anonymous Group Writing . . . . . . . . . . . . . 60
3.7 Performance Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 60
3.8 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 70
References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 71


**4** **Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems** . . . 73
4.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 74
4.2 Related Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 74
4.3 System Model and Problem Formulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . 75
4.3.1 System Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 75
4.3.2 Problem Formulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 76
4.3.3 Design Rational . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 76
4.4 Basic Approach: Bloom Filter-Based Protocol . . . . . . . . . . . . . . . . . . . . . . . 79
4.4.1 Protocol Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 79
4.4.2 Parameter Optimization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80
4.5 Advanced Approach: Compressive Filter-Based Protocol . . . . . . . . . . . . . . 83
4.5.1 Protocol Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 83
4.5.2 Parameter Setting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 86
4.6 Performance Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 90
4.7 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 96
References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 97


Contents xiii


**5** **Fast and Reliable Access Protocol for Multi-tagged RFID Systems** . . . . . . . . 99
5.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 99
5.2 Related Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
5.3 System Model and Problem Formulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . 101
5.3.1 System Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 102
5.3.2 Problem Formulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 102
5.3.3 Design Rational . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 103
5.4 M [2] ID: Missing Multi-Tagged Item Detection Protocol . . . . . . . . . . . . . . . . 105
5.4.1 Motivation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 105
5.4.2 Segmentation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 106
5.4.3 Protocol Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
5.4.4 Parameter Optimization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 108
5.5 M [2] ID+: The Improvement of M [2] ID . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 113
5.5.1 Motivation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 113
5.5.2 Protocol Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 114
5.5.3 Parameter Setting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 115
5.6 Performance Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 121
5.7 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 124
References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125


**6** **Practical Hashing-Free Access Implementation with COTS RFID**
**Systems** . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 127
6.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 128
6.2 Related Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 129
6.3 System Model and Problem Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 130
6.4 P2M: Point-to-Multipoint Missing Tag Identification . . . . . . . . . . . . . . . . . . 131
6.4.1 Point-to-Multipoint _Q_ -Query . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 131
6.4.2 Encoding Methods . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 132
6.4.3 Configuration of the Parameter _Q_ . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
6.4.4 Calculation of the Interrogation Duration . . . . . . . . . . . . . . . . . . . . . 134
6.5 P2P: Point-to-Point Missing Tag Identification . . . . . . . . . . . . . . . . . . . . . . . 134
6.5.1 Point-to-Point Selective Query . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 135
6.5.2 Calculation of the Overall P2P Execution Time . . . . . . . . . . . . . . . . 136
6.5.3 _Select_ Function . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 136
6.5.4 Bitmask Selection . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
6.5.5 Missing Tag Identification with New Tags . . . . . . . . . . . . . . . . . . . . 142
6.6 Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
6.6.1 Implementation Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
6.6.2 Implementation Results . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
6.7 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151
References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151


xiv Contents


**7** **Conclusion and Perspective** . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 153
7.1 Book Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 153
7.2 Open Questions and Future Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 154
7.2.1 Energy Utilization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 154
7.2.2 Anonymity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 156
7.2.3 Tag Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 156


**Introduction**
## **1**


**1.1** **The Universality of RFID Technology**


Radio Frequency Identification (RFID) technology has become instrumental in the realms of
automatic identification, data acquisition, and sensing, thereby earning its distinction as one
of the paramount innovations of the twenty-first century [ 1]. Specifically, RFID technology
facilitates the contactless reading and capturing of information from objects by attaching
tags on physical items, thus enabling a unique identification for each entity. This capability fosters global object tracking and seamless information dissemination. Moreover, with
its proficiency in non-line-of-sight communication and extended range, RFID technology
presents a significant advantage over conventional barcode systems [ 2]. Consequently, RFID
technology attracts extensive attention in a variety of applications including industrial manufacturing, logistics management, supply chain tracking [ 3], environment sensing, material
identification, et al. In recent years, with the rapid development of electronic components,
the RFID tags are increasingly becoming intelligent and simultaneously diminishing in size
and cost, which greatly enhances and broadens the prospects of widespread applications and
implementation of the Internet of Things (IoT) [ 4].

Generally speaking, an RFID system typically consists of one or multiple readers and
a vast array of wireless tags. The reader not only functions as a wireless interrogator of
tags by receiving data through its antenna but also serves as a conduit for data transmission
via a data bus, thereby facilitating both communication and computational functionalities.
And the read can adaptively adjust its communication frequency and range. Additionally, it
implements an anti-collision protocol to guarantee precise access and identification of the
tags. On the other hand, an RFID tag can be integrated with a cost-effective microchip and
antenna. And each tag is embedded a unique serial number, i.e., IDentity (ID), stored within
its microchip. Based on whether the tag is equipped with an energy source module, the tags
can be categorized into three types: active tags, semi-active tags, and passive tags. The active
tags, which are equipped with a battery, can periodically monitor wireless communication



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_1](https://doi.org/10.1007/978-3-031-93034-8_1)



1


2 1 Introduction


channels and transmit radio signals. Thanks to the built-in battery, the active tag can work
continuously without external supply. However, they are costly and large in size due to the
embedded batteries which need to be replaced regularly to maintain their functionalities.
Compared to the active tag, the semi-active tag contains a smaller battery which is only
sufficient to support the tag to respond when a reader signal is received. Although batteries are
still needed for the semi-active tags, they have a longer life and are replaced less frequently.
Moreover, they have lower cost and smaller size. Yet, the passive tags are battery free,
which draw energy from the reader’s signal stimulus to enable the microchip to work and
allow the tag to reflect the modulated signal containing its data back to the reader. Without
batteries, the passive tags can be designed smaller and less expensive to manufacture. And,
the maintenance costs are numerously reduced as no need to replace the battery.

The standardization of RFID systems formulates a series of uniform specifications and
guidelines to ensure the compatibility, inter-operability, and efficient application of RFID
technology in the world. In recent years, the International Organization for Standardization
(ISO) and the International Electrotechnical Commission (IEC) have developed a range of
national standards for RFID systems, including the ISO/IEC 18000 series [ 5]. In particular,
the EPC-global standardization emphasizes the integration of RFID systems within the
supply chain, with its EPC-global C1G2 [ 6] becoming the prevalent industrial benchmark
for RFID systems. Similarly, Ubiquitous ID espouses a comparable philosophy with EPCglobal in the development of RFID system standards, utilizing the ucode encoding scheme.
Typically, most researches focused on reader-tag communication conform to the protocols
established by EPC-global C1G2.

RFID systems have been deployed in various applications with real-world scenarios,
primarily for monitoring objects to detect unauthorized movements, such as theft. In these
systems, the readers first interrogate the tags attached to the physical objects within a specific
area. Then, the RFID tags respond to the readers via backscatter communication, which can
indicate the presence of these physical objects. Correspondingly, an absence of responses
manifests a potential missing event. With the deployment of large-scale RFID systems and
the increasing requirements of multi-tasking monitoring, each object with multiple tags
becomes necessary. However, managing exclusive tags for each task can become impractical and complex. To address this problem, grouping tags that divide RFID tags into multiple
groups based on their task requirements is a solution. While this can simplify the tag management, it introduces new challenges in distinguishing tags used for missing event detection
from all tags effectively and scheduling numerous tags to access the backscatter network
to transmit data. Thus, the design of efficient grouping algorithms and scheduling access
protocols is of great importance for missing event detection in RFID systems. This however
faces the following challenges:


- _Multi-task tags and multi-tagged objects_ . In the field of large-scale warehouse management, countless goods need to be carefully managed, and each good is embedded
with tags. With the increasing demands for perception, not only multiple tags are often


1.1 The Universality of RFID Technology 3


attached to each good, but also each tag is used for different tasks. This not only results in
an exponential increase in the number of tags, but also makes it necessary to interrogate
all tags repeatedly. Therefore, the designed protocols must effectively align the tags with
their corresponding tasks and objects to optimize time efficiency.

- _Limited computing and processing capacity on the tag side_ . Passive tags are ideally
suited for large-scale organization due to their cost-effectiveness and minimal maintenance requirements. The limited energy harvested from stimulus signals signifies that
their computational and processing capabilities are constrained, which leads to that the
traditional network access protocols are unsuitable for RFID systems. Thereby, the design
of protocols must prioritize low-complexity computation and processing.

- _Secure group-wise writing_ . Group-wise writing allows the reader to convey its corresponding group data to each tag group. However, due to the sensitivity of group data
such as group IDs, there is a risk of eavesdropping when transmitted in plaintext. Traditional well-established encryption algorithms are not suitable for the low-complexity
computation and processing demands of backscatter tags. Thus, a lightweight anonymous
group writing protocols are urgently needed.

- _Unreliable wireless channel_ . The wireless channel between readers and tags is not errorfee due to the channel fading and environmental noise. On account of the limited computing and processing power of tags, traditional channel estimation methods cannot be
directly applied to RFID systems. Therefore, the design of protocols must strive to balance the reliability of missing event detection with the inherent uncertainty of the wireless
channel.

- _Incompatibility with existing commercial tags_ . Hash-based scheduling access protocols
have been shown to significantly improve the network efficiency. However, due to the
constrained computational capabilities and energy resource limitations of Commercial
Off-The-Shelf (COTS) RFID tags, these devices lack the necessary hash functionality.
This limitation prevents tags from randomly accessing backscatter networks via hashing
mappings. Consequently, in COTS implementation of RFID systems, it is imperative to
develop and implement a series of random access network protocols which do not depend
on hash mapping, thereby guaranteeing the optimal time efficiency.


These challenges give rise to novel concerns on the design of efficient and secure backscatter networking for missing event detection in large-scale multi-task RFID systems. In this
context, this book first introduces a group label scheme that classifies tags into multiple
groups, thereby transforming the large-scale system into a composition of several subsystems and thus reducing the access time cost. On the top of this, this book outlines a secure
group-wise downlink communication scheme that can enable readers to control tag behavior.
Then, the book presents two time-efficient access protocols to improve the missing event
detection performance in grouped RFID systems and provides a solution for hashing-free
implementation of missing event detection with the COTS RFID tags. Systematically, the
book presents state-of-the-art access protocols for missing event detection, highlighting sev

4 1 Introduction


eral significant research problems that are both theoretically and practically important. In
conclusion, this book tackles a spectrum of issues, ranging from theoretical modeling and
analysis to the practical design and optimization of algorithms.


- Efficient group labeling scheme to divide RFID tags into multiple groups, enabling the
group-wise query for missing detection.

- Secure anonymous group-wise writing scheme to protect the reader-to-tag downlink
control query for missing detection from being eavesdropped.

- Compact filter-based access protocol to schedule tags to transmit data in a time-efficient
way guaranteeing the detection accuracy.

- Fast and reliable access protocol to optimize the communication and computation overhead with hash seed searching.

- Practical hashing-free scheduling access implementation with COTS RFID tags.


**1.2** **The Group Writing of RFID Tags**


The group writing serves as a fundamental mechanism for categorizing tags based on usage
requirements. For instance, tags affixed to merchandise enable inventory monitoring, while
those attached to vehicles in a warehouse function as access credentials for designated operational areas. This group writing approach facilitates multifunctional use of identical tags,
thereby significantly reducing management costs. In particular, this book delves into the
RFID group writing challenge, which involves accurately and efficiently disseminating category information to all associated tags within an RFID system. Qiao et al. [ 7] have proposed
a polling method for individual tag identification. However, this approach is inefficient due
to the redundant transmission of numerous tag IDs OR duplicate group data, allowing only
one tag to be labeled per slot. The BIC approach [ 8] utilizes singleton slots for label assignment but suffers from similar inefficiencies. In contrast, the single-seed protocol CCG [ 9]
leverages slots mapped by the multiple tags within the same group to label several tags
simultaneously. Nonetheless, it remains inefficient due to time lost during the transmission
of empty slots and those allocated to tags from different groups, particularly when the probability of generating useful slots in a single indicator vector is low. For example, considering

.10 [3] tags are evenly partitioned into.4 _,_ 8 _,_ 10 groups, the CCG faces an alarming probability of
over 0.6 that a slot fails to label any tags, highlighting a substantial opportunity for enhancement. Consequently, this critical service remains significantly under-explored, presenting
substantial opportunities for optimization.

In this book, we firstly introduce a novel group labeling protocol based on a multi-seed
framework, enabling multiple mappings from tags to slots. This design allows readers to
select the most informative slots from all available mappings, thereby improving the efficiency of data transmission. Specifically, the main context includes the following aspects:


1.2 The Group Writing of RFID Tags 5


(1) A multi-seed approach is adopted to facilitate efficient group labeling and establish the
NP-hardness of the Seed Assignment Problem (SAP) that arises from using multiple seeds
for group labeling. This finding elucidates the inherent challenges associated with the group
labeling problem, which have not previously been addressed. (2) Given the NP-hardness of
the problem, this book proposes an approximate seed assignment algorithm with a competitive ratio of 0.632. This algorithm identifies the slot containing the highest number of tags
from the same group at each iteration and assigns the corresponding seed to that slot. Then,
leveraging the fact that a tag only receives its associated group data from a single slot, this
book develops two simplified algorithms, namely . _c_ -search- **I** and . _c_ -search- **II** . By capitalizing on the potential for previously useless slots to become useful, these algorithms achieve
comparable performance with reduced complexity. (3) Subsequently, this book develops a
unified group labeling protocol, named GLMS, which integrates each of the approximation
algorithms (AA, . _c_ -search- **I**, . _c_ -search- **II** ) with a well-defined communication mechanism
for interactions between the reader and the tags. Additionally, this book investigates optimal
parameter configurations to enhance protocol performance.

The group writing scheme allows the reader to concurrently interrogate all tags within
the same group to retrieve their group data, such as the group ID. However, transmitting
plaintext group data in previous works [ 8– 10] compromises system privacy by exposing sensitive information like the group ID and password, thereby increasing the risk of potential
attacks. In this context, there is a need to facilitate anonymous group writing, which effectively informs each tag of its corresponding group data while ensuring the anonymity of this
information in the presence of an eavesdropper. The conventional encryption algorithms [ 11,
12] utilized for securing group data have two significant drawbacks: First, they require integrating a comprehensive encryption/decryption protocol into the original protocol, thereby
augmenting communication overhead. Second, the tags must be equipped with the requisite decryption modules, which escalates computational complexity and is not suitable for
energy-constrained tags. Consequently, there is an urgent need for a lightweight anonymous
group writing protocol that safeguards the privacy of group data in a time-efficient manner.

To this end, this book further introduces an Overlapped Bloom Filter-based (OBF) protocol, along with its enhanced iteration (OBF+), designed to facilitate efficient anonymous
group writing through the application of simple logical operators such as OR and AND. The
OBF protocol encodes the data of each tag group by applying bit overlapping (logical OR) at
positions corresponding to each tag, thereby generating an approximately random sequence
that acts as noise on the reader’s end. Subsequently, each tag can retrieve the group data
from the received bit sequence using logical AND. Building upon the OBF protocol, the
OBF+ incorporates the capability to verify the recovered group data, addressing instances
of faulty data through the use of data complements. Although augmenting the data with its
complement increases the frame size, which may diminish the transmission’s time efficiency,
this approach effectively eliminates incorrectly recovered group data while simultaneously
bolstering the anonymity and overall reliability of the anonymous group writing process.


6 1 Introduction


**1.3** **Missing Event Detection in RFID Systems**


The missing event detection, one of the most widely adopted applications of RFID systems,
can significantly reduce financial losses by deploying readers to monitor passive tags attached
to products. As RFID systems evolve to meet increasingly complex multi-objective requirements, attaching multiple tags to a single object offers benefits such as enhanced security [ 13,
14] and precise object state sensing [ 15– 17]. However, this practice introduces challenges
related to repeated detection of multi-tagged objects within an expanded system, complicating the swift and reliable identification of missing events. Previous studies [ 18– 27] have
not been specifically tailored for multi-tagged RFID systems and suffer from inefficiencies
in time management. The primary issue stems from the potential need to detect every tag
within the system, which undermines time efficiency in two significant ways: First, current
methodologies fail to distinguish between known tags after confirming the presence of one
tag on an object, leading to redundant checks and wasted time. Second, the responses of
numerous tags on a verified object cause substantial interference with those on other objects.
An alternative strategy to avoid repeated presence checks involves selectively polling one
tag per object. However, this method necessitates querying each tag with a cumbersome
96-bit ID, which can be time-consuming in large-scale systems. Consequently, the efficient detection of missing events in multi-tagged RFID systems remains an open research
question.

Specifically, this book introduces the inaugural formulation and analysis of the missing
event detection problem within multi-tagged RFID systems. As aforementioned discussed,
a fundamental principle for protocol design is to query a subset of tags rather than the entire
collection, as observed in earlier works. Our proposed strategy divides the protocol into two
distinct phases: the Marking phase and the Detection phase. During the Marking phase, the
reader selects one tag from each object at random and utilizes their mappings to create a
filter. This filter effectively identifies the chosen tags, enabling targeted inquiries for further
detection in the subsequent phase while suppressing responses from the remaining tags.
In the Detection phase, the reader then interrogates the marked tags and identifies missing
events based on their responses. Building on this framework, this book will propose two
specific two-phase detection protocols: the Basic Protocol and the Advanced Protocol.

Leveraging the properties of hash functions, an appropriate seed that ensures each tag
from distinct items maps to a unique value allows for the extraction of a subset of tags
within the system. These selected tags are then allocated to singleton slots in the response
frame for the purpose of detecting missing items. Subsequently, the reader broadcasts the
chosen seed from the initial step along with the corresponding unique hashing values. It is
important to note that the disparity between the clock frequency used for seed searching and
the communication bandwidth creates an opportunity to establish a trade-off between computation and communication. Thereby, this book has developed two protocols, designated as

.M [2] ID and .M [2] ID+. Th e .M [2] ID protocol outlines the framework for missing event detection,


1.5 Book Organization 7


incorporating the computation-communication trade-offs. Building upon this foundation,
the .M [2] ID+ protocol aims to further enhance time efficiency.


**1.4** **The COTS Implementation of RFID Systems**


Recently, algorithms for identifying missing tags have garnered significant research attention. However, the current studies on missing tag identification [ 25, 26, 28– 33] often require
hashing functionality to facilitate random access to tags, which is not supported by Commercial Off-The-Shelf (COTS) tags. This mismatch poses challenges for practical implementation in real-world scenarios.

Inspired by the aforementioned considerations, this book proposes a comprehensive
framework for stable and precise missing tag identification schemes specifically tailored
for COTS Gen2 devices. Specifically, we develop two protocols capable of accurately identifying missing tags while remaining fully compatible with the Gen2 standard and existing
COTS devices. First, we introduce a point-to-multipoint protocol, referred to as P2M. P2M
employs . _Q_ -command, which is the de facto random access protocol in the Gen2 standard,
to query the tags. This approach effectively accomplishes its task within a bounded worstcase time by meticulously configuring the interrogation duration to.2 _[Q]_ . To enhance the time
efficiency of P2M, this book subsequently designed a point-to-point protocol, known as
P2P, which can uniquely identify tags in each slot through the use of a selective bitmask,
ensuring reliable communication across all slots. To achieve this, this book further proposes
two methodologies for bitmask selection, balancing the trade-off between communication
overhead and computational complexity. Ultimately, this book implements both P2M and
P2P using COTS RFID devices and rigorously evaluates their performance across various
settings.


**1.5** **Book Organization**


In this book, we delineate a pathway that transitions from theoretical modeling and analysis
to the practical design and optimization of algorithms for RFID systems. The structure of the
book is illustrated in Fig. 1.1. To enhance the reader’s experience, we have adopted a modularized framework, wherein each chapter functions as an independent module dedicated to
a specific topic as previously outlined. Notably, each chapter includes its own introduction
and conclusion sections, which elucidate the relevant work and underscore the significance
of the results within the specific context of that chapter. Consequently, we have chosen
not to provide an extensive background or comprehensive survey of prior research in this
introductory section.


8 1 Introduction


**Fig. 1.1** The arrangement of this book


**References**


1. C. Kaczor, What is an rfid tag? (2024). Available: [https://www.camcode.com/blog/what-are-](https://www.camcode.com/blog/what-are-rfid-tags/)

[rfid-tags/](https://www.camcode.com/blog/what-are-rfid-tags/)
2. Barcode (2016). Available: [https://en.wikipedia.org/wiki/Barcode](https://en.wikipedia.org/wiki/Barcode)
3. SATO Holdings Corporation, Rfid consumables (2019). Available: [https://satoasiapacific.com/](https://satoasiapacific.com/solutions/rfid/)

[solutions/rfid/](https://satoasiapacific.com/solutions/rfid/)
4. TT Electronics, Rfid: The technology making industries smarter (2022). Available: [https://www.](https://www.ttelectronics.com/blog/rfid-technology/)

[ttelectronics.com/blog/rfid-technology/](https://www.ttelectronics.com/blog/rfid-technology/)
5. Joint Technical Committee ISO/IEC JTC 1, ISO/IEC 18000-6:2013 (2013). Available: [https://](https://www.iso.org/standard/59644.html)

[www.iso.org/standard/59644.html](https://www.iso.org/standard/59644.html)
6. EPCglobal Inc, Radio-frequency identity protocols class-1 generation-2 UHF RFID protocol for
communications at 860 mhz–960 mhz version 1.2.0. [Online]. Available: [https://www.gs1.org/](https://www.gs1.org/sites/default/files/docs/epc/uhfc1g2_1_2_0-standard-20080511.pdf)
[sites/default/files/docs/epc/uhfc1g2_1_2_0-standard-20080511.pdf](https://www.gs1.org/sites/default/files/docs/epc/uhfc1g2_1_2_0-standard-20080511.pdf)
7. Y. Qiao, S. Chen, T. Li, S. Chen, Energy-efficient polling protocols in rfid systems, in _ACM_
_MobiHoc_ (2011), p. 25
8. H. Yue et al, A time-efficient information collection protocol for large-scale rfid systems, in _IEEE_
_INFOCOM_ (2012), pp. 2158–2166
9. J. Liu, B. Xiao, S. Chen, F. Zhu, L. Chen, Fast RFID grouping protocols, in _IEEE INFOCOM_
(2015), pp. 1948–1956


References 9


10. J. Yu, J. Liu, R. Zhang, L. Chen, W. Gong, S. Zhang, Multi-seed group labeling in RFID systems.
IEEE Trans. Mobile Comput. **19** (12), 2850–2862 (2019)
11. L. Gao, L. Zhang, M. Ma, Low cost RFID security protocol based on rabin symmetric encryption
algorithm. Wireless Personal Commun. **96** (1), 683–696 (2017)
12. J. Yang, B. Liu, H. Yao, Application of chaotic encryption in RFID data transmission security.
Int. J. Adv. Network Monitor. Controls **4** (1), 90–96 (2019)
13. L. Bolotnyy, G. Robins, Multi-tag rfid systems. Int. J. Internet Protocol Technol. **2** (3), 218–231
(2007)
14. S. Dhal, I. Sengupta, Protocol to authenticate the objects attached with multiple rfid tags, in
_Emerging Trends in Computing and Communication_ (Springer, 2014), pp. 149–156
15. L. Shangguan, Z. Yang, A. X. Liu, Z. Zhou, Y. Liu, Relative localization of . {RFID. } tags using
spatial-temporal phase profiling, in _NSDI’15_ (2015), pp. 251–263
16. J. Liu, H. Dai, Y. Yan, X. Zhang, X. Chen, L. Chen, Is this side up? detecting upside-down
exception with passive rfid, in _IEEE SMARTCOMP_ (2017), pp. 1–2
17. D. Hochhalter, D. Bigelow, N. J. Witchey, C. Milam, Rfid-based rack inventory management
systems (2018). US Patent App. 15/725,638
18. C. C. Tan, B. Sheng, Q. Li, How to monitor for missing RFID tags, in _IEEE ICDCS_ (2008),
pp. 295–302
19. W. Luo, S. Chen, T. Li, Y. Qiao, Probabilistic missing-tag detection and energy-time tradeoff in
large-scale RFID systems, in _ACM MobiHoc_ (2012), pp. 95–104
20. W. Luo, S. Chen, Y. Qiao, T. Li, Missing-tag detection and energy-time tradeoff in large-scale
RFID systems with unreliable channels. IEEE/ACM TON **22** (4), 1079–1091 (2014)
21. M. Shahzad, A. X. Liu, Expecting the unexpected: Fast and reliable detection of missing RFID
tags in the wild, in _IEEE INFOCOM_ (2015), pp. 1939–1947
22. J. Yu, L. Chen, R. Zhang, K. Wang, Finding needles in a haystack: Missing tag detection in large
rfid systems. IEEE TCOM **65** (5), 2036–2047 (2017)
23. J. Yu, L. Chen, R. Zhang, K. Wang, On missing tag detection in multiple-group multiple-region
rfid systems. IEEE TMC **16** (5), 1371–1381 (2017)
24. J. Yu, W. Gong, J. Liu, L. Chen, K. Wang, R. Zhang, Missing tag identification in cots rfid
systems: Bridging the gap between theory and practice, _IEEE TMC_ (2018)
25. T. Li, S. Chen, Y. Ling, Identifying the missing tags in a large RFID system, in _ACM MobiHoc_
(2010), pp. 1–10
26. R. Zhang, Y. Liu, Y. Zhang, J. Sun, Fast identification of the missing tags in a large RFID system,
in _IEEE SECON_ (2011), pp. 278–286
27. X. Liu, K. Li, G. Min, Y. Shen, A.X. Liu, W. Qu, Completely pinpointing the missing RFID tags
in a time-efficient way. IEEE TC **64** (1), 87–96 (2015)
28. W. Luo, S. Chen, T. Li, S. Chen, Efficient missing tag detection in rfid systems, in _2011 Pro-_
_ceedings IEEE INFOCOM_ (IEEE, 2011), pp. 356–360
29. C. Chu, J. Niu, W. Zheng, J. Su, G. Wen, A time-efficient protocol for unknown tag identification
in large-scale rfid systems. IEEE IoT J. **9** (15), 13024–13040 (2022)
30. H. Chen, G. Xue, Z. Wang, Efficient and reliable missing tag identification for large-scale rfid
systems with unknown tags. IEEE IoT J. **4** (3), 736–748 (2017)
31. M. Shahzad, A.X. Liu, Fast and reliable detection and identification of missing rfid tags in the
wild. IEEE/ACM Trans. Netw. **24** (6), 3770–3784 (2016)
32. X. Liu, K. Guo, Z. Liu, X. Zhou, H. Qi, W. Xue, Fast and accurate missing tag detection for
multi-category rfid systems, in _2018 IEEE International Conference on Smart Internet of Things_
_(SmartIoT)_ (2018), pp. 135–142
33. J. Zhao, W. Li, D.-A. Li, Identifying the missing tags in categorized rfid systems. Int. J. Distributed
Sensor Netw. **10** (6), 582951 (2014)


**Efficient Multiple Group Labeling Scheme in RFID**
## **2**
**Systems**


The group labeling, which involves assigning tags to their respective categories, is not well
optimized due to the transmission of redundant data when using only a single seed. In
this chapter, we introduce a unified protocol called GLMS (Group Labeling with Multiple
Seeds), which employs multiple seeds to construct a Composite Indicator Vector (CIV),
thereby reducing useless data transmission. Technically, to address _Seed Assignment Prob-_
_lem_ (SAP) that arises during the construction of CIV, we develop an Approximation Algorithm (AA) with a competitive ratio.0 _._ 632 by globally searching for the seed that contributes
most effectively to the useful slot. We then further design two simplified algorithms through
local searching, namely . _c_ -search- **I** and its enhanced version . _c_ -search- **II** . These algorithms
reduce computational complexity by one order of magnitude while achieving comparable
performance. Extensive simulations demonstrate the superiority of our approaches.


**Chapter roadmap** : The remainder of this chapter is organized as follows. Section 2.1
outlines the motivation for studying the multi-seed-based group labeling and summarizes
the contributions. The system model, including the problem formulation of the group labeling
and the motivation derived from multi-seed hashing, is presented in Sect. 2.2. Section 2.3
details the proposed group labeling protocol utilizing the multiple seeds. In Sect. 2.4, we
describe the seed assignment algorithms used to construct the CIV. Section 2.5 investigates
how to tune the parameters in the protocol to maximize the time efficiency. Section 2.6
evaluates the performance of proposed approaches compared to state-of-the-art solutions.
In Sect. 2.7, we review prior works on group labeling and the existing multi-seed/hash RFID
protocols. Finally, we conclude this chapter in Sect. 2.8.



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_2](https://doi.org/10.1007/978-3-031-93034-8_2)



11


12 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**2.1** **Introduction**


Categorizing the objects (tags) to be monitored into groups is a common practice for efficient
management, especially when the system scales (e.g., libraries, supermarkets). A bootstrapping functionality to enable group-wise object management is to inform each object of its
group data (e.g., group ID, other related group information), which is named _group labeling_ .
For example:


- Over-the-air reprogramming on computational RFID tags [ 1, 2]. These tags work in the
same region on a variety of sensing tasks, e.g., temperature, humidity monitoring, and
intrusion detection. We regard the tags carrying out the same mission as belonging to the
same group. In such a scenario, it is necessary to maintain and upgrade the firmware of
tags wirelessly. Since the firmware for tags in different groups is usually different, the
system administrator must reprogram categorized tags correctly. That is to say, data for
one group should not be received by tags in the other groups.

- Group ID-enabled applications. When the administrator needs to frequently check the
status of the expiry-date-sensitive objects, grouping the objects (tags) with the similar
expiry date is necessary, wherein group IDs play an important role. Specifically, if the tags
with similar expiry dates share the same group ID, the reader can send the required data
together with the group ID once to all group members, which not only sharply reduces
the communication cost in comparison with the traditional unicast transmission, but also
is prerequisite of diverse queries in RFID systems, such as tag estimation [ 3, 4], top-k
query [ 5, 6] and missing tag detection [ 7].


While due to the nature of RFID, a tag has neither information about the other tags nor its
group, it thus does not know which data is only for its group. In this context, group labeling
is called for to correctly tell each tag the data for its group and facilitate the tag management
illustrated above.

This chapter presents a multi-seed-based protocol enabling multiple mappings from tags
to slots so that the reader can pick up the most informative slots among all mappings for
the data transmission and the efficiency is thus improved. The key challenge lies in how to
find these slots while achieving seed assignments with low complexity. The superiority and
novelty of our method compared with the existing ones are four-fold:


1. Empty slots and those mapped by multiple tags from different groups under one seed
which are wasted in [ 8], can be used to label tags with another seed in our method.
2. The impact of multiple mappings on-tag collisions of different groups is weakened. With
different seeds a tag mapped to multiple slots actually receives its group data only in
one slot and will keep silent, reducing the collision probability of different groups in the
subsequent slots.


2.2 Problem Formulation and Motivation 13


3. Collision slots with tags from the same groups instead of only singleton slots or empty
slots in the existing work [ 9, 10] are exploited in our method, improving time efficiency.
Moreover, a . _k_ -good slot that can label . _k_ tags of the same group, can become . _k_ [+] -good
where . _k_ and . _k_ [+] are constant and . _k_ [+] _> k_, significantly reducing the labeling delay.
4. This chapter is the first work formally proving the NP-hardness of the formulated problem arising from the application of multiple seeds and designing the approximation
algorithms for the group labeling problem, which makes the mathematical nature of our
work completely different from the existing ones and more challenging.


Therefore, we first use a multi-seed approach to achieve efficient group labeling in which
we find NP-hardness of the Seed Assignment Problem (SAP) arising from the employment
of multiple seeds. To address this issue, we propose a suboptimal solution that selects
the slot with the most tags from the same group each time among all slots and assigns the
corresponding seed to this slot. Then, we develop another two simplified algorithms, namely

. _c_ -search-I and. _c_ -search-II via converting the originally useless slots to useful. To consolidate
each approximation algorithm (AA),. _c_ -search-I,. _c_ -search-II with a concrete communication
mechanism for the reader and tags, we develop a unified group labeling protocol named
GLMS.

Our multi-seed protocol generalizes the existing single-seed protocols with remarkably
better performance. Our test results show that GLMS achieves a gain of up to .34 _._ 2% in
terms of the group labeling time.


**2.2** **Problem Formulation and Motivation**


We study an RFID system of one or multiple readers and a number of tags, wherein the tags
are partitioned into multiple groups and the readers are connected via high-speed channels
with a back-end server of powerful computing capability. We regard the server and the
reader(s) as a single entity called _the reader_ for simplicity [ 10, 11]. Generally, the tags
have user-defined memory to achieve the writing and storage of the user-defined data [ 12].
Moreover, we assume that the reader has the IDs of all tags in the system, commonly
in designing application-oriented protocols, e.g., missing tag event detection [ 10, 13] and
information collection [9, 14]. To streamline the presentation, we first consider the singlereader case and discuss the multi-reader case later.

Consider a set . _X_ .= .{ _x_ 1 _, x_ 2 _,_   - · · _, x_ _N_ } of . _N_ tags whose IDs are recorded in the reader
divided into . _G_ disjoint groups. Suppose the size of group . _g_ (.1 ≤ _g_ ≤ _G_ ) i s . _Ng_ and we have

. [�] _g_ _[G]_ =1 _[N][g]_ [.][=][ . ] _[N]_ [. We denote by][ .] _[d][g]_ [the data for group][ . ] _[g]_ [(][.][1][ ≤] _[g]_ [≤] _[G]_ [). In this chapter, we are ]
interested in addressing the following problem: _The group labeling problem is to devise a_
_protocol to send each group data correctly to all its members (tags) within the minimum_
_time._ By correctly, we mean that the data for one group should not be received by tags of the


14 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Table 2.1** Main notations

|Symbols|Descriptions|
|---|---|
|._k_-good|Useful slot with. _k_ tags|
|._N_|The number of tags in the system|
|._G_|The number of groups|
|. _g_,._dg_|Group index, data for group. _g_|
|._Ng_|The number of tags of group. _g_|
|. _f_,._l_|Frame size, the number of seeds|
|._si_|The._i_-th seed|
|._Ci j_|The set of tags mapped to._ j_-th slot under. _si_|
|._m_|The number of labeled tags in the current round|
|._z_|The number of chosen useful slots in the current round|
|._u_|Time efﬁciency|
|._N_′|Unlabeled tags in current round|
|._N_′_g_|Unlabeled tags of group. _g_ in the current round|
|._G_′|The number of groups with unlabeled tags|
|._ f_|Upper bound of. _f_|
|._l_|Upper bound of. _l_|



other groups. The performance metric is the communication cost between the reader and
the tags. Table 2.1 summarizes the main notations used in the chapter.


**2.2.1** **Single-Seed Versus Multi-Seed**


The communication between the reader and tags follows the frame-slotted Aloha protocol [ 15]: the reader initiates communication first by broadcasting commands containing the
parameters, such as frame size . _f_, . _l_ random seed(s) . _si_ with . _i_ ≤ _l_ . In the existing single-seed
protocols where . _l_ = 1, each tag uses its ID and the received seed to generate **one** pseudorandom number via hash function . _H_ _(I D, s_ 1 _)_ and then maps itself to the slot . _(H_ _(I D, s_ 1 _)_
mod _f )_ in the frame. On the contrary, in our multi-seed protocol where . _l_ ≥ 1, each tag
holds **multiple** pseudo-random numbers with . _l_ different seeds and is mapped to . _l_ slots in
the frame and the most useful slot will be chosen by the reader to send data as introduced
shortly.

In this chapter, we make the following definitions on slot states: 1. _Empty slot_ : Consider
an arbitrary slot, if no tag is mapped to this slot; 2. _Heterogeneous slot_ : if multiple tags
from different groups are mapped to this slot. 3. _Useless slot_ : if this slot is either empty
or heterogeneous. If the reader sends data in such a slot, either no tag receives data or tags


2.2 Problem Formulation and Motivation 15


from one group receive data of another group, which should be avoided in the group labeling
problem; 4. _Useful slot_ : if tag(s) from the same group is mapped to this slot. In such a slot, the
reader can send data to tag(s) from the same group. 5. _Reparable slot_ : A slot is reparable if it
becomes useful from a heterogeneous slot as the protocol runs, which will happen when tag(s)
blend with the others from another group and stay silent after being assigned useful slots.


**2.2.2** **Motivation**


As an indicator vector constructed from a single mapping generates limited useful slots, much
time is wasted on the transmission in the useless slots. If multiple seeds are used to generate
multiple mappings, the reader can pick up the most informative slots from them to build
a composite indicator vector (CIV), reducing the number of the useless slots. Intuitively,
assume a slot in a single indicator vector is useful with the probability of .0 _._ 5, then wi th

. _l_ seeds used to map the tags this probability is .1 − _(_ 1 − 0 _._ 5 _)_ _[l]_, which quickly approaches

.100% with the increase of . _l_ .

In addition to increase the number of useful slots, using multiple seeds can also contribute
to more labeled tags. Let. _k_ -good define a useful slot with. _k_ tags. A slot may be. _k_ -good under
one seed but . _k_ [+] -good under other seeds where . _k_ [+] _> k_, which can be interpreted from the
following toy example.


Example 1. Consider an RFID system with two tag groups . _G_ 1 = { _x_ 1 _, x_ 2} and . _G_ 2 =
{ _x_ 3 _, x_ 4 _, x_ 5} and suppose a frame of four slots and two seeds . _s_ 1, . _s_ 2. From Fig. 2.1 where
the shaded rectangles stand for the useful slots, we find just partial slots useful after either
mapping, but a CIV of all slots being useful can be built by selecting the most informative
slots from two mappings. Specifically, by designating . _s_ 1 for the first and third slots, and . _s_ 2
for the second and fourth slots, we can build a CIV indicating the seed assignment for each


**Fig. 2.1** Exemplifying the motivation: the shaded rectangles typify useful slots


16 2 Efficient Multiple Group Labeling Scheme in RFID Systems


slot so that all slots to be executed become useless ones (e.g., the 2nd slot under. _s_ 1) to useful
ones (e.g., the 2nd slot under . _s_ 2) and from .1-good one (e.g., the 3rd slot under . _s_ 2) t o .2-good
one (e.g., the 3rd slot under . _s_ 1).

Motivated by the above observation, we design a series of seed assignment algorithms
to build the CIV, and develop a unified group labeling protocol, named GLMS, to consolidate each algorithm with the concrete communication mechanism for the reader and tags,
respectively. Note that the designed seed assignment algorithms are used in the first phase
of the group labeling protocol GLMS. In the following, we first introduce the group labeling
protocol and elaborate on how to build the CIV, subsequently.


**2.3** **Group Labeling Protocol with Multiple Seeds (GLMS)**


The execution of the protocol GLMS consists of multiple rounds, each having three phases
referred to as _initialization phase_, _screening phase_, and _labeling phase_, respectively. The
reader first uses one of the seed assignment algorithms, namely AA, . _c_ -search-I, and . _c_ search-II, to be introduced in Sect. 2.4 to build a CIV that determines a unique tag-seed-slot
relationship. In the screening phase, the reader sends the CIV to inform each active tag of
whether and when it is scheduled to receive its associated group data. In the labeling phase,
the reader transmits group data in the designated slots to the eligible tags. If a tag receives
its associated group data, it will keep silent in the subsequent rounds. The process of GLMS
and the core function of each phase are illustrated in Fig. 2.2.

_Protocol Description._ Consider an arbitrary round in the execution of the protocol GLMS.
Let . _N_ [′] _, Ng_ [′] [denote the number of the remaining overall unlabeled tags and that of unlabeled ]
tags of group . _g_ at the beginning of this round, respectively. And denote by . _G_ [′] the number
of the groups with unlabeled tags. If it is the first round, it holds that . _N_ = _N_ [′] and . _G_ = _G_ [′] .
The . _l_ seeds denoted as . _si_, .1 ≤ _i_ ≤ _l_, are used in this round to generate the CIV of . _f_ slots.
Our multi-seed protocol GLMS is shown in Algorithms 1 and 2.


**(1) Initialization Phase** : Give n . _l_ seeds and the frame size . _f_, the CIV can be compounded
from . _l_ mappings, each involving a different seed. How the values of . _f_ and . _l_ are chosen will
be analyzed in Sect. 2.5 on the parameter optimization. Specifically, in the. _i_ -th mapping, we
employ seed. _si_ to map each active tag to one of. _f_ slots in the frame. With all. _l_ seeds used, the
reader records. _l_ vectors, each consisting of. _f_ cells storing tags mapped to the corresponding


**Fig. 2.2** The process of GLMS: Initialization phase, screening phase, and labeling phase in sequence


2.3 Group Labeling Protocol with Multiple Seeds (GLMS) 17


slots. Using one of the seed assignment algorithms introduced in Sect. 2.4, the reader can
designate one seed for each slot in the CIV maximizing the time efficiency in this round.

More specifically, based on the seed assignment, the reader builds a CIV of . _f_ slots each
of which corresponds to a slot in the frame at the same position and stores the index of the
assigned seed. If designating seed . _si_ for a slot . _j_, the reader stores . _i_ that is the index of . _si_
in the . _j_ -th slot of the CIV. If a slot is still useless after . _l_ mappings, the reader sets its value
in the CIV to zero. Consequently, the positions of non-zero value in the CIV stands for the
useful slots of the frame. As there are . _l_ seeds, we need .⌈log2 _(l_ + 1 _)_ ⌉ bits to record one
seed’s index, that is to say, the length of the CIV is . _f_ - ⌈log2 _(l_ + 1 _)_ ⌉.

Note that if a tag is mapped to a useful slot as specified in the CIV, we refer to this slot
as _the useful slot for this tag_ .


**(2) Screening Phase** : The reader broadcasts a message containing the built CIV, the frame
size . _f_ and . _l_ seeds . _s_ 1 _, s_ 2 _,_ - · · _, sl_ . Upon receiving the message, each tag can extract two
pieces of information from the CIV: One is whether the tag is eligible to receive its group
data in this round. Specifically, each tag can employ the received . _l_ seeds to select . _l_ slots in
the frame and knows the corresponding . _l_ positions it is mapped to in the CIV. Based on the
rule of generating the CIV, if a tag is mapped to the . _j_ -th position in the CIV under seed . _si_
and the value in that position is . _i_, then the tag regards slot . _j_ as the useful slot for it. In case
the conditions can be satisfied under multiple seeds, the tag only selects the slot with the
smallest value of . _j_ . While if a tag fails under all seeds, it does not participate in any activity
until the next round.

The other one is which slot a qualified tag should actually wait for its group data. Because
the CIV may contain zero elements which stand for the useless slots, the reader needs to
remove the corresponding slots before starting the frame to transmit group data for saving
time. The key here is that the tag must know which slots are removed. To that end, we use
the ordering approach [ 14]. Assume slot . _j_ is the useful one for the tag, the tag first checks
every position before the position . _j_ in the CIV. If there exist . _j_ [ˆ] non-zero elements, the tag
will select . _(_ _j_ [ˆ] + 1 _)_ -th slot to receive its group data and . _j_ [ˆ] _<_ _j_ .

Let us see an example shown in Fig. 2.3. Consider an arbitrary tag. _x_ 9. With seeds. _s_ 1 _, s_ 2 _, s_ 3,

. _x_ 9 is mapped to the . 2nd, . 1st and . 4th slots. After checking the corresponding positions in the
CIV,. _x_ 9 finds only the. 4th element equal to. 3 which is the index of. _s_ 3, so it regards slot. 4 as its
useful slot. Furthermore, as there exist two non-zero elements before the . 4th position in the


**Fig. 2.3** Interpreting indicator vector: . _s_ 1 _, s_ 2 _, s_ 3 are the used seeds


18 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Algorithm** **1:** GLMS for the reader


**1** _// Phase one - the CIV construction_

**2** Generate . _l_ seeds . _s_ 1, . _s_ 2,..., . _sl_ randomly

**3** Map the unlabeled tags into . _l_ slots and generate . _f_ × _l_ cells each recording a set of the tags

mapped to the corresponding slot

**4** Build CIV via AA or . _c_ −search-I or . _c_ −search-II; record the number of non-zero slots in the

CIV . _z_

**5** _// Phase two - CIV transmission_

**6** Issue a frame start command, transmit CIV and the corresponding frame size . _f_ and . _l_ seeds

**7** _// Phase three - tags labeling_

**8** **for** . _i_ = 1 _to_ . _z_ **do**

**9** Issue slot-start command

**10** Broadcast the corresponding group ID to the tags mapped to the . _i_ -th homogeneous slot

**11** **end**

**12** Update the set of the unlabeled tags and initiate the next round


CIV, . _x_ 9 will wait for its group data at slot . 3 in the labeling phase. Therefore, only the three
useful slots will be executed in the labeling phase instead of the four in the original frame.


**(3) Labeling Phase** : After the qualification test in the screening phase, only the eligible tags
partake in this phase. By knowing all tag IDs and the CIV, the reader knows the order of
the slots actually selected by the eligible tags. Assume there are . _z_ non-zero positions in the
CIV, the reader initiates a labeling frame of . _z_ slots and sends the corresponding group data
at each slot to the eligible tag(s) for which this slot is useful. As the tag(s) in each slot come
from the same group, they can be labeled simultaneously. On the other hand, each tag learns
from the CIV at which slot the reader will transmit its group data and can thus receive the
data at that slot.

For instance, recall the example in Fig. 2.3, the reader actually initiates a frame containing
three useful slots in Fig. 2.3. It can label tags . _x_ 1 _, x_ 2 _, x_ 3 by sending ID of group . 1 in the slot

. 1, and label tags . _x_ 5 _, x_ 6 and . _x_ 9 _, x_ 10 in the slots . 2 and . 3, respectively.

After the current round, the reader moves to the next round, which is identical except that
the labeled tags will keep silent. That is, only the unlabeled tags attend the next round. The
above process repeats round after round until all tags receive their associated group data.

In what follows, we start formally presenting the seed assignment algorithms used to
build the CIV.


**2.4** **Seed Assignment Algorithms**


The key to our multi-seed method lies in the seed assignment arising in building the CIV.
Specifically, given . _l_ seeds . _si_ (.1 ≤ _i_ ≤ _l_ ) and the frame size . _f_, the reader needs to designate
one seed for each slot in the CIV and inform each tag of the seed assignment by sending the
CIV. Therefore, if the CIV is built the tags mapped to each slot are deterministic.


2.4 Seed Assignment Algorithms 19


**Algorithm 2:** GLMS for tags


**1** Receive the CIV and the corresponding frame size . _f_ and . _l_ random seeds

**2** Compute . _l_ mapped slot number . _sn_ [ _i_ ] = _H_ _( f, I D, si_ _)_

**3** Initialize the current slot number . _csn_ ← 1 and current random seed index . _ci_ ← 0

**4** **while** _TRUE_ **do**

**5** Wait-for-slot-start().

**6** . _j_ ← the number of zeros in the first . _csn_ positions in . _C I V_

**7** . _ci_ ← _C I V_ [ _csn_ + _j_ ]

**8** **if** . _(csn_ + _j)_ == _sn_ [ _ci_ ] **then**

**9** Store the received Group ID.

**10** **end**

**11** . _csn_ ← _csn_ + 1

**12** **end**


More specifically, recall that the CIV of . _f_ slots is compounded from . _l_ mappings, there
are . _l_ × _f_ cells in total each of which records a set of the tags mapped to the corresponding
slot, as shown in Fig. 2.4. . _Ci j_ stands for the set of the tags mapped to slot . _j_ under seed . _si_
for .1 ≤ _i_ ≤ _l_ and .1 ≤ _j_ ≤ _f_, an d .1 ≤ _I j_ ≤ _l_ denotes the index of the seed finally assigned
for slot . _j_ in the CIV, and . _C j_ is the set of tags that will be mapped to slot . _j_ under seed . _sI j_
following the built CIV. Note that since . _l_ seeds are used and zero represents useless slots,
we need .⌈log _(l_ + 1 _)_ ⌉ bits to stand for each seed index . _I j_ . Moreover, it may happen that

. _I j_ = _I j_ ′ for . _j_ ̸= _j_ [′] because a seed may be assigned to multiple slots in the CIV.

As a tag can be mapped to . _l_ positions under . _l_ different seeds, slots from multiple mappings may share the same tags, that is, . _Ci j_ ∩ _Ci_ ′ _j_ ′ ̸= ∅ for . _i_ [′] ̸= _i_ and . _j_ [′] ̸= _j_ . Define a set
comprising tags from the same group as a pure set which is equivalent to a useful slot. Define
the time efficiency . _u_ as the number of tags labeled per unit time. Recall that if a seed is designated for a slot, then the tags mapped to this slot under this seed are deterministic. In this
sense, we should carefully assign seeds such that the time efficiency . _u_ can be maximized.


**Fig. 2.4** Exemplifying the seed assignment problem:. _Ci j_ is the set of the tags mapped to slot. _j_ under
seed . _si_ ; . _I j_ denotes the index of the seed assigned for slot . _j_ in the CIV; . _C j_ is the set of the tags
mapped to slot . _j_ under seed . _sI j_


20 2 Efficient Multiple Group Labeling Scheme in RFID Systems


Given a seed assignment, let. _z_ be the number of yielded useful slots and let. _m_ = | ∪ _j_ _C j_ |
be the size of the union of the tags mapped to the useful slots. Let . _t_ 0 and . _tg_ denote the
time for the reader to transmit one bit and data for group . _g_, respectively. Without loss of
generality, we assume the data size for each group is identical. With (2.2), we formally
define the following seed assignment problem.


**Problem 1** (Seed assignment problem) Given . _l_ × _f_ sets of the tags . _Ci j_ for .1 ≤ _i_ ≤ _l_ and

.1 ≤ _j_ ≤ _f_, and define . _S_ as the collection of the seeds assigned to each slot in the CIV, the
seed assignment problem is to seek . _S_ satisfying



. _S_ = argmax
_sI j_



| ∪ _j_ _C j_ |
_tg(a_ + _z)_ _[,]_



where. _a_ = _f_ ⌈log2 _(l_ + 1 _)_ ⌉ _t_ 0 _/tg_ . That is to say, given the seeds and the frame size, the reader
seeks an optimum collection . _S_ of the seeds which will maximize the time efficiency . _u_ .


Problem 1 performs combinatorially, which is usually NP-hard. The challenge here lies in
how to prove its NP-hardness. In the following, we formally state the NP-hard observation
and its proof.


**Theorem 1** _Problem_ _1_ _is NP-hard._


_**Proof**_ For clarity, we just outline the proof here and the complete proof is provided in
Appendix 2.A. To study the hardness of Problem 1, we prove it polynomially reducible
from the Maximum coverage problem [ 16] which is a classic NP-hard problem. Given . _h_
sets and an integer . _k_ ≤ _h_ with which we need to solve the Maximum coverage problem, the
polynomial reduction comprises three steps: First, we replicate each set . _k_ times and obtain

. _h_ × _k_ sets. Second, we introduce . _k_ dummy sets to guarantee that each slot in the CIV is
assigned only one seed. Third, we prove that . _u_ reaches its maximum only when . _k_ sets are
chosen in Problem 1. 

Due to the NP-hardness of SAP, in what follows, we design a series of algorithms to
approach the optimal time efficiency. Specifically, we first design an approximation algorithm (AA) and develop two simplified algorithms with the less complexity but good performance on the top of AA.


**2.4.1** **Approximation Algorithm**


**Motivation**
Recall the Problem 1 that seeks the seed assignment to maximize time efficiency . _u_, we can
achieve this objective from two directions. On the one hand, we want to use fewer useful


2.4 Seed Assignment Algorithms 21


**Algorithm 3:** Approximation algorithm for Problem 1

**Input** : . _si_, . _f_
**Output** : . _umax_, tags in picked slots . _C_, seed assignment . _S_

**1** **Initialisation:** . _C, S_ ← ∅; _R, z, umax_ ← 0; _H_ ← _(Ci j_ _)l_ × _f_
**2** **while** . _j_ 1 ≤ _f_ **do**

**3** _// Search the most useful slot_

**4** **for** . _j_ = 1 _to_ . _f_ **do**

**5** **for** . _i_ = 1 _to_ . _l_ **do**

**6** **if** . _Ci j_ _is useful and_ .| _Ci j_ | _>_ _R_ **then**

**7** . _R_ ←| _Ci j_ | _, I_ ← _i, J_ ← _j_

**8** **end**

**9** **end**

**10** **end**

**11** _// Select the seed contributing to the most useful slot_

**12** **if** . _tg_ [|] _[C]_ _(a_ [∪] + _[C]_ _z_ _[I J]_ + [ |] 1 _)_ [≥] _[u][max]_ **[then ]**



**13** . _S_ ← _S_ ∪ _(sI, J_ _)_ _/* Assign seed_ . _sI_ _to slot_ . _J_ _*/_ . _C_ ← _C_ ∪ _C_ _I J_, an d . _z_ ← _z_ + 1



**14** . _umax_ ← [|] _[C]_ [∪] _[C][i j]_ [|]



_tg(a_ + _z)_



**15** **else**

**16** Stop

**17** **end**

**18** _// Clear the slots at_ . _J-th column in Fig. 2.4 and deduct the tags in the picked slot from the_
_remaining slots_

**19** **for** . _j_ = 1 _to_ . _f_ **do**

**20** **for** . _i_ = 1 _to_ . _l_ **do**

**21** **if** . _j_ == _J_ **then**

**22** . _H_ ← _H_ _/Ci j_ _, Ci j_ ← ∅

**23** **else**

**24** . _Ci j_ ← _Ci j_ - _C_ _I J_
**25** **end**

**26** **end**

**27** **end**

**28** **if** . _H_ == ∅ **then**

**29** Stop

**30** **end**

**31** **end**

**32** Return . _umax_ _, C, S_


slots, i.e., minimizing . _z_, while maximizing the number of the tags . _m_ involved in these used
useful slots. Observing the waste of heterogeneous slots (c.f. Sect. 2.2.2) in the prior work,
we, on the other hand, hope to design an algorithm that is able to exploit the heterogeneous
slots that can become useful as the algorithm runs.


22 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Overview**
Define the most useful slot as the useful slot with the most tags from the same group. The core
idea of AA lies in that each time the reader selects the seed contributing to the most useful
slot to maximize the time efficiency . _u_ . Note that there is a unique seed-tag-slot mapping,
that is, given any two of them, we can fix the third one. Since a set of the tags (c.f. Fig. 2.4)
is indexed by the used seed and the mapped slot, once a most useful slot is found the reader
assigns the corresponding seed to this slot and knows the tags mapped to this slot, which
are referred to as covered tags here.

Moreover, to enable the utility of heterogeneous slots, the reader first deducts the covered
tags from the remaining non-empty slots including both heterogeneous and useful slots, and
then checks their states and picks the most useful one among them. The rationale behind
this is that each covered tag will stay silent after its corresponding most useful slot so that
actually it will not be blent with tags in the subsequent slots under all mappings, which
enables the conversion of a subsequent heterogeneous slot into a useful one. Note that we
refer to such a heterogeneous slot as _reparable slot_ .


**Algorithm Description**


Formally, we illustrate the AA in Algorithm 3 with the input of. _l_ seeds and the frame size. _f_ .
It is easy to check that the computation complexity of AA is. _O(l_ - _f_ [2] _)_ . The main procedures
of AA are summarized below.


- Each time the reader


  - picks the most useful slot to which the most uncovered tags are mapped and brings
the most gain in time efficiency . _u_ . (Line 4-12 in Algorithm 3)

  - records the subscripts of the chosen slot standing for which seed will be assigned to
this slot. (Line 13)

  - records the tags in the chosen slot, marks them as covered, and removes them from
the remaining slots. Since only one seed should be assigned to each slot in the CIV,
the slots under the other mappings but in the same column (c.f. Fig. 2.4) as the chosen
most useful slot would be emptied. (Line 19-27)


- The algorithm stops if there is no useful slot or no useful slot contributing to the greater
time efficiency.

- The algorithm outputs the seed allocation for each slot in the CIV and a collection of the
covered tags, with which the time efficiency . _u_ is maximized under the given input.


After executing Algorithm 3, the reader builds a CIV and knows which tags can be labeled
in which slots. Specifically, if a set. _Ci j_ in the useful slot is chosen, then the reader designates


2.4 Seed Assignment Algorithms 23


**Fig. 2.5** AA: the streak represents the unselected most useful slot


**Algorithm** **4:** . _c_ -search- **I** for Problem 1

**Input** : . _si_, . _f_, . _c_
**Output** : . _umax_, tags in picked slots . _C_, seed assignment . _S_

**1** **Initialisation:** . _C, S_ ← ∅; _R, z, umax_ ← 0; _H_ ← _(Ci j_ _)l_ × _f_
**2** **while** . _j_ 1 ≤ _f_ **do**



**3** Choose . _c_ columns out of unselected ones randomly



**4** _// Search the most useful slot from the_ . _c columns: define_ . _j_ _j_ ′ _as the_ . _j_ [′] _-th chosen column_



**5** **for** . _j_ [′] = 1 _to_ . _c_ **do**



**6** **for** . _i_ = 1 _to_ . _l_ **do**

**7** . _Ci j_ _j_ ′ ← _Ci j_ _j_ ′  - _C_ _I J, H_ ← _H_ _/Ci J_

**8** **if** . _Ci j_ _j_ ′ _is useful and_ .| _Ci j_ _j_ ′ | _>_ _R_ **then**

**9** . _R_ ←| _Ci j_ _j_ ′ | _, I_ ← _i, J_ ← _j_ _j_ ′

**10** **end**

**11** **end**

**12** **end**

**13** Conduct the operations as lines .12 − 14 in Alg. 3

**14** **end**

**15** Return . _umax_ _, C, S_


seed . _si_ for the slot . _j_ and sets the value of the slot . _j_ in the CIV to . _i_ . In case that all sets in
the column . _j_ in Fig. 2.4 are not chosen, the reader sets the slot . _j_ ’s value to zero in the CIV.

Next, we illustrate AA in Fig. 2.5 with. 2 seeds and a frame of. 3 slots. First, the reader finds

. _C_ 12 the most useful, then it assigns. _s_ 1 to slot. 2 in the CIV and empties. _Ci_ 2 while removing the
tags in the intersections between. _C_ 12 and the others, yielding . _Ci j_ [′] [. Repeating the operations, ]
the reader finds . _C_ 23 [′] [the most useful via searching from the columns][ . ][1 and][ . ][3, and the n][ . ] _[C]_ 21 [∗]
from the columns . 1 in sequence. Finally, the reader builds the CIV as shown in Fig. 2.5. To
evaluate algorithm performance, we derive the competitive ratio of the a lgorithm.


**Lemma 1** _(Competitive ratio of Algorithm_ _3) Le t_ . _uopt_ _denote the optimal time efficiency of_
_Problem_ _1, it holds for the time efficiency_ . _umax_ _of Algorithm_ _3_ _that_ . _umax_ ≥ 0 _._ 632 _uopt_ _._


_**Proof**_ The proof is detailed in Appendix 2.B. 

24 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**2.4.2** **Simplified Algorithms**


For better scalability to the system scale, we here present two simplified algorithms, namely

. _c_ -search- **I** and its improved version: . _c_ -search- **II**, to reduce the complexity of . _AA_ while
achieving the comparable performance.


. _c_ - **search-I**


The key difference of . _c_ -search- **I** from AA consists in locally searching the most useful slot
among the . _c_ columns in Fig. 2.4 chosen _**randomly**_ each time instead of global searching
among all . _f_ columns in AA. At first glance, this simplified operation would degrade the
performance significantly, but besides the less complexity, another advantage of this is
curing more heterogeneous slots, which benefits to the increase in time efficiency. Look at
an example with the frame size . _f_ and . _c_ ≤ _f_ . Assume that the first most useful slot in AA
occurs at one of the mappings in. _f_ -th column of Fig. 2.4, then none of the heterogeneous slots
can become useful. This is because a tag mapped to a heterogeneous slot can be eliminated
from this slot only when this heterogeneous slot is later than the most useful slot for this
tag. While in . _c_ -search- **I**, if we find the first most useful slot in . _f /_ 2-th column by locall y
searching among. _c_ randomly chosen columns, then we can exploit the subsequent reparable
slots.


**Algorithm** **5:** . _c_ -search- **II** at . _c_ = 1 for Problem 1

**1** **while** . _j_ 1 ≤ _f_ **do**

**2** _// Search the most useful slot from the_ . _j_ 1 _-th column_

**3** **for** . _i_ = 1 _to_ . _l_ **do**

**4** . _Ci, j_ 1 ← _Ci, j_ 1  - _C_ _I J, H_ ← _H_ _/Ci J_
**5** **if** . _Ci, j_ 1 _is useless_ **then**

**6** . _Ci, j_ 1 ← ∅

**7** **else if** .| _Ci, j_ 1 | _>_ _R_ **then**

**8** . _R_ ←| _Ci, j_ 1 | _, I_ ← _i, J_ ← _j_ 1
**9** **end**

**10** **end**

**11** The remaining steps are the same as . _c_ -search- **I**

**12** **end**


We list. _c_ -search- **I** in Algorithm 4 with a new input. _c_ and summarize the main procedures
as below: Each time the reader


- chooses . _c_ columns from unselected ones randomly, containing . _c_ - _l_ slots.

- removes the covered tags from these chosen slots.

- picks the most useful slot among the slimmed-down . _c_ - _l_ slots, which achieves the most
gain in time efficiency . _u_ .


2.4 Seed Assignment Algorithms 25


- records the subscripts of the chosen slot standing for which seed will be assigned to which
slot.

- records the tags in the most useful slot picked and marks them as covered.


Next, we illustrate the influence of . _c_ on the performance.


Example 2. In the experiment, we partition .1000 tags evenly into . _G_ = 2 _,_ 4 _,_ 8 _,_ 10 groups
and vary . _c_ from . 1 to .40. Figure 2.6a shows that the time overhead at . _c_ = 40 is the least,
which is very close to AA. For the tradeoff between the complexity and performance, we
will set . _c_ = 40 in the simulation in Sect. 2.6.


. _c_ - **search-II**


As described above, . _c_ -search- **I** achieves the comparable performance with the less complexity, but it may fail to exploit the reparable heterogeneous slots furthest. For example, if
the first most useful slot in . _c_ -search- **I** arises in . _f /_ 2-th column among . _c_ randomly chosen
columns, then we cannot exploit the potential reparable slots in the first . _(_ 2 _[f]_ [−] [1] _[)]_ [ columns. ]

To address the issue in . _c_ -search- **I**, we propose an improved algorithm, named . _c_ -search- **II**,
pursuing less complexity but better performance than . _c_ -search- **I** .

The main difference from . _c_ -search- **I** is that . _c_ -search- **II** chooses . _c_ columns among the
unselected columns _**in the ascending order of the column number**_ instead of randomly. For
instance, assume . _c_ = 10, we choose the columns 1–10 as the candidates (c.f. Fig. 2.4). In
the case that columns .1 _,_ 3 and . 4 have been chosen previously, we will select columns . 2 and
5–13. Next, we would like to take an example to explain the main differences among AA,

. _c_ -search- **I** and . _c_ -search- **II** .


Example 3. We show the first round operation of the three algorithms in Fig. 2.7 where we
suppose . _c_ = 2 in two simplified algorithms. Specifically, AA finds . _C_ 24 the most useful slot


|Col1|Col2|Col3|Col4|Col5|Col6|Col7|Col8|Col9|Col10|Col11|Col12|Col13|Col14|Col15|Col16|Col17|Col18|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||
|||||||||||||||||||


26 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Algorithm 6:** Seeking the optimal . _f_ and . _l_

**Input** : . _N_ [′], . _G_ [′], . _step_, . _t_ 1 and . _tgid_
**Output** : . _u_ [∗], . _f_ [∗], . _l_ [∗]

**1** **Initialisation:** . _f_ = ∞ _,_ _l_ = ∞ _, u_ [∗] = 0 _, Q_ = 0

**2** **while** . _f_ ≤ _f_ _and_ . _l_ ≤ _l_ **do**

**3** Execute Algorithms 3 or 4 or . _c_ -search- **II**

**4** . _u_ = _umax_ returned from the executed algorithm

**5** . _Q_ = _Q_ + 1, fin d . _fq_ ∗, . _lq_ ∗ with . argmax _u( fq_ _,_ _lq_ _)_
1≤ _q_ ≤ _Q_

**6** . _f_ [∗] = _fq_ ∗, . _l_ [∗] = _lq_ ∗, . _u_ [∗] = _u( fq_ ∗ _,_ _lq_ ∗ _)_

**7** Update . _f_ with (2.3) and update . _l_ with (2.4)

**8** . _f_ = _f_ + _step_, . _l_ = _l_ + 1

**9** **if** . _f_ _>_ _f_ **then**

**10** **if** . _l_ ≤ _l_ **then**

**11** . _f_ = 1 : _step_ : _f_

**12** **else**

**13** Stop

**14** **end**

**15** **else if** . _l_ _> l_ **then**

**16** . _l_ = 1 : _l_

**17** **end**

**18** **end**

**19** Return optimum efficiency . _u_ [∗] and the optimum (. _f_ [∗] _,_ _l_ [∗] )


**Fig. 2.7** Difference among three algorithms: . _s_ 1 and . _s_ 2 are two seeds


by globally searching among.2 ∗ 4 cells, while. _c_ -search- **I** first selects two columns randomly
(assume that columns 2 and 4 are chosen), and searches for the most useful slot among. 2 ∗ 2
cells. Differently, . _c_ -search- **II** chooses the first two columns and then searches among the
corresponding.2 ∗ 2 cells. As. _C_ 11 is found the most useful in. _c_ -search- **II**, the reparable slots
in the columns 2–4 can be exploited later.

In this chapter, _we will set_ . _c to_ . 1 _in_ . _c-search-_ _**II**_ and state the seed assignment process in
Algorithm 5. The rationale behind the setting is that with. _c_ = 1 we can employ the potential
reparable slots to the greatest extent, namely those in the columns 2–. _f_ . Besides, the yielded
complexity is . _O(l_ - _f )_ which is less than . _O(c_ - _l_ - _f )_ in . _c_ -search- **I** and . _O(l_ - _f_ [2] _)_ in AA,


2.5 Parameter Configuration 27


**Table 2.2** Algorithm complexity with . _l_ seeds and the frame size . _f_

|Algorithm|AA|.c-search-I|.c-search-II|
|---|---|---|---|
|Complexity|._O(l_ · _f_ 2_)_|._O(c_ ·_ l_ · _f )_|. _O(l_ · _f )_|



which are listed in Table 2.2. Under the settings as in Example 2, we show in Fig. 2.6b that

. _c_ -search- **II** achieves good performance at . _c_ = 1. We will further evaluate the performance
of . _c_ -search- **II** at . _c_ = 1 in Sect. 2.6.


**2.5** **Parameter Configuration**


In this section, we investigate how to tune the used parameters in the protocol to maximize
the time efficiency which is defined as the ratio of the labeled tag population size to the
execution time in each round. The reason for optimizing time efficiency lies in that the
higher time efficiency means that the more tags will be labeled per unit time.

The execution time of the current round, defined as . _T_, comprises the time to transmit
the CIV and group data. Denote by . _z_ the frame size in the labeling phase, for . _f_ slots are
executed in the screening phase, . _T_ can be calculated as


. _T_ = ⌈log2 _(l_ + 1 _)_ ⌉· _f_                                     - _t_ 0 + _z_                                     - _tg,_ (2.1)


where. _t_ 0 and. _tg_ denote the time for the reader to transmit one bit and group data, respectively.

Let . _m_ be the number of tags labeled in the considered round, then the time efficiency in
this round, denoted by . _u_, i s


_m_

. _u_ = _[m]_ _T_ [=] ⌈log2 _(l_ + 1 _)_ ⌉· _f_                                  - _t_ 0 + _z_                                  - _tg_ _._ (2.2)


Given (2.2) o n. _u_, we next need to find such a pair of. _f_ and. _l_ that. _u_ achieves the maximum.
Note that we use . _u_ and . _u( f,_ _l)_ interchangeably in the rest of the chapter. As . _m_ and . _z_ and
their relationship in the protocol cannot be formulated, it is necessary to search the optimal
parameter pair of . _f_ and . _l_ . For this purpose, we propose a dynamic searching algorithm.

Before introducing the searching algorithm, we first establish an upper bound for . _f_ and

. _l_, denoted by . _f_ and . _l_ respectively, in the following lemma.


**Lemma 2** _For_ .∀ _f_ _>_ _f_ _and/or_ . _l_ _> l, it holds that_ . _u_ ˆ _( f,_ _l) <_ _u_ ˆ _( f,_ _l) and_ . _u_ ˆ _( f,_ _l) <_ _u_ ˆ _( f,_ _l)_
_N_ [′]
_where_ . _u_ ˆ _( f,_ _l)_ =
⌈log2 _(l_ +1 _)_ ⌉· _f_            - _t_ 0+ _G_ [′]            - _tg_ _[. ]_


_**Proof**_ The proof is provided in Appendix 2.C. 

28 2 Efficient Multiple Group Labeling Scheme in RFID Systems


Having derived the upper-bounds of . _f_ and . _l_, we get the searching region .[1 _,_ _f_ ] × [1 _,_ _l_ ].
To speed up the searching process, we propose a dynamic searching algorithm updating the
value of . _f_ and . _l_ for the . _(Q_ + 1 _)_ -th search from the observations of the . _Q_ leading searches.
Let . _fq_ _,_ _lq_ with .1 ≤ _q_ ≤ _Q_ denote each pair of . _f_ and . _l_ in the first . _Q_ searches, we can find
the optimal pair . _( fq_ [∗] _,_ _lq_ [∗] _)_ contributing to the greatest . _u_ in the first . _Q_ searches. Given . _f_ and

. _l_, executing any of AA, . _c_ -search- **I** and . _c_ -search- **II** will return . _u_ . With observations above,
we update . _f_ and . _l_ by solving the following equations:


.Update _f_ : _u( fq_ [∗] _,_ _lq_ [∗] _)_ = _u_ ˆ _( f,_ _lq_ [∗] _),_ (2.3)

.Update _l_ : _u( fq_ [∗] _,_ _lq_ [∗] _)_ = _u_ ˆ _( fq_ [∗] _,_ _l)._ (2.4)


Formally, 2.4 the searching process is illustrated in Algorithm 6. With the input of the
number. _N_ [′] of the unlabeled tags, the number. _G_ [′] of groups with unlabeled tags as well as the
step size for . _f_, . _t_ 1 and . _tg_, Algorithm 6 will output the optimal pair (. _f_ [∗],. _l_ [∗] ) and the maximum
time efficiency . _u_ [∗] .

Considering the memory of commercial tags ranges from .32 bits to .8192 bits [ 12], one
cannot use an arbitrary number of seeds, so we denote by . _lact_ the maximum seeds a tag
can store in its memory. Consequently, we need to update . _l_ in Algorithm 6 by choosing
the minimum one between . _lact_ and the solution of (2.4). Note that we set . _lact_ to .10 in the
simulation.

Moreover, we investigate how the frame size . _f_ influences the time efficiency . _u_ via
the experiment where . _lact_ = 10 and . _N_ = 10 [3] tags are evenly partitioned into . _G_ = 4 _,_ 8 _,_ 10
groups. Specifically, we snapshot the first round of GLMS with . _c_ -search- **I** and . _c_ -search- **II** .
Figures 2.8a, b show that the time efficiency . _u_ can be regarded as convex approximately
with respective to. _f_ . It is thus feasible to employ the gradient method to speed up the search
for the optimum . _f_ [∗] .


**Fig. 2.8** . _c_ -search- **I** and . _c_ -search- **II** : . _u_ versus . _f_


2.6 Performance Evaluation 29


Discussion on Multi-reader case. In large-scale RFID systems deployed in a large area,
multiple readers are required to ensure the full coverage for a larger number of tags. To
work with multiple readers, we leverage the same approach as [ 7, 17, 18] that the back-end
server synchronizes and schedules all readers such that a multi-reader RFID system operates
as the single-reader one. Specifically, the back-end server calculates all the parameters and
constructs the CIV involved in the group labeling protocol, and sends them to all readers
such that the readers broadcast the same parameters and CIV to the tags.

Explanation on NP-hardness. When . _lact_ = 1 or the optimum . _l_ [∗] = 1, our protocol is
degraded to the single-seed protocol which does not need to assign seeds and is not NP-hard.
The NP-hard seed assignment problem arises from the employment of multiple seeds. Albeit
NP-hardness brings new challenges, we design a series of algorithms running in polynomial
time to approximate the optimum and confirm their performance theoretically and experimentally. Moreover, the computation is done in the back-end server which is usually of a
high computational capacity.

Potential implementation. Considering the implementation of the proposed protocol,
programmable tags, such as those based on WISP hardware, and a USRP-based SoftwareDefined RFID reader are needed. In order to achieve hashing functionality, hash values are
pre-stored in each tag, which is supported by WISP 4, WISP 5, and MSP430. In the scheme
implementation, two commands need to be added: 1) TRANSIV that is used to transmit the
CIV; 2) QUERPAR that contains the parameters used in the protocol and starts the slot.

Specifically, the reader first sends a TRANSIV commend to broadcast the CIV and
then sends a QUERPAR commend. Consider an arbitrary slot . _j_ . When a tag receives this
command, it starts computing the number by selecting the .⌊log _f_ ⌋-bit string starting from
the . _i_ -th bit in the pre-stored hash value like in [ 9], where . _i_ is the seed value of the . _j_ -th
position in the CIV. If the number equals to the current slot number, then the tag waits and
receives the data sent from the reader.


**2.6** **Performance Evaluation**


**2.6.1** **Simulation Settings**


We evaluate the performance of proposed approaches in comparison with the state-of-theart solution CCG [ 8]. We conduct the experiments under both symmetric and asymmetric
scenarios with various numbers of groups and group sizes. By symmetric/asymmetric, we
mean that the tag population size in each group is identical/different. We use the communication parameters specified in the EPC-global C1G2 standard [ 15]. Specifically, the data
rate from the reader to tags is.26 _._ 7 kbps, meaning it takes.37 _._ 45. _μs_ for the reader to transmit
one bit, so we have . _t_ 1 = 37 _._ 45 . _μs_ . We take group ID of .⌈log2 _G_ ⌉ bits as group data, so
we have . _tg_ = 37 _._ 45 ∗⌈log2 _G_ ⌉. Besides, we consider the time interval of .302 . _μs_ between


30 2 Efficient Multiple Group Labeling Scheme in RFID Systems


any two consecutive communications between the reader and tags in the computation of the
execution time.

Due to the complexity of AA, we will focus on evaluating the GLMS running the simplified algorithms, namely GLMS with . _c_ -search- **I** and GLMS with . _c_ -search- **II**, but we can
measure the performance of AA from Fig. 2.6a in the RFID system of .1000 tags. As discussed in Sects. 2.4.2 and 2.5, we s et . _c_ = 40 for . _c_ -search- **I**, and set . _c_ = 1 and . _lact_ = 10
for . _c_ -search- **II** . Albeit using . _lact_ = 10, we also evaluate its impact on the performance. For
simplification, we will use. _c_ -search- **I** and. _c_ -search- **II** in the figures below to stand for GLMS
with . _c_ -search- **I** and . _c_ -search- **II**, respectively.


**2.6.2** **Simulation Results**


The performance metric is the communication cost in terms of execution time. We first show
the influence of . _lact_ with a diverse number of groups . _G_ and tags . _N_ in the system, and simulate symmetric scenarios with . _G_ and the group size varied and proceed to its asymmetric
counterparts, subsequently.


**Performance evaluation under different** . _lact_


Here, we conduct experiments to investigate the impact of. _lact_ on GLMS with. _c_ -search- **I** and
GLMS with. _c_ -search- **II** . To that end, we simulate scenarios with. _N_ = 100 _,_ 1000 _,_ 2000 _,_ 5000
tags in the system where the tags are evenly partitioned into . _G_ = 4 _,_ 8 _,_ 10 groups, respectively. And the value of. _lact_ are set to.10 _,_ 15 _,_ 20. The simulation results are listed in Table 2.3.

As shown in Table 2.3, the increase in the value of . _lact_ reduces the execution time under
all settings. Specifically, the performance difference between. _lact_ = 10 and. _lact_ = 20 is bigger than that between . _lact_ = 15 and . _lact_ = 20 which is less than .3%. More specifically, we
observe from the results that the most significant performance difference is about.11% arising
between . _lact_ = 10 and . _lact_ = 20 for GLMS with . _c_ -search- **II** when . _G_ = 4 and . _N_ = 2000.
Considering the constraint on the memory capacity of commercial tags as discussed in
Sect. 4.4.2 and the tradeoff between the computational complexity and the execution time,
we set . _lact_ = 10 in the subsequent simulations.


**Performance comparison under symmetric scenario**


This scenario consists of two cases: one is varying the number of the groups and the other
is varying the group size.

**Case 1.** Here we set the total number of the tags . _N_ = 12000 and . _G_ = 2 : 2 : 10 with the
identical group size. From the results shown in Fig. 2.9a, we can observe that GLMS with

. _c_ -search- **II** and GLMS with. _c_ -search- **I** perform better than CCG, with the performance gain
of up to.26 _._ 8% and.15 _._ 9%, respectively. This is because we employ multiple seeds to reduce
the transmission of useless slots and. _c_ -search- **II** can furthest exploit the heterogeneous slots


2.6 Performance Evaluation 31


**Table 2.3** Execution time under diverse . _N_ _, G,_ _lact_ : studying the impact of . _lact_






|Protocol|Col2|Vary the number of groups.G and.lact:.( G,lact)|Col4|Col5|Col6|Col7|Col8|Col9|Col10|Col11|
|---|---|---|---|---|---|---|---|---|---|---|
|**Protocol**|**Protocol**|(4,10)|(4,15)|(4,20)|(8,10)|(8,15)|(8,20)|(10,10)|(10,15)|(10,20)|
|._c_-search-**I**|._N_ =<br>100|.0_._025|.0_._025|.0_._025|.0_._039|.0_._037|.0_._036|.0_._042|.0_._041|. 0_._039|
|._c_-search-**I**|._N_ =<br>1000|0.333|0.311|0.31|0.444|0.426|0.424|0.473|0.456|0.449|
|._c_-search-**I**|._N_ =<br>2000|0.680|0.636|0.623|0.935|0.877|0.871|0.982|0.928|0.917|
|._c_-search-**I**|._N_ =<br>5000|1.700|1.647|1.622|2.260|2.240|2.204|2.385|2.287|2.282|
|._c_-search-**II**|._N_ =<br>100|.0_._024|.0_._024|.0_._024|.0_._037|.0_._035|.0_._035|.0_._041|.0_._038|. 0_._037|
|._c_-search-**II**|._N_ =<br>1000|0.32|0.285|0.282|0.431|0.407|0.391|0.455|0.425|0.421|
|._c_-search-**II**|._N_ =<br>2000|0.629|0.572|0.562|0.890|0.813|0.801|0.946|0.880|0.860|
|._c_-search-**II**|._N_ =<br>5000|1.581|1.459|1.433|2.209|2.001|1.978|2.331|2.127|2.204|



that will become useful. Besides, increasing the number of groups renders more execution
time, as more groups reduce the useful slot probability.

**Case 2.** Here we set . _G_ = 3 _,_ 6 while varying the group size from .500 to .2000, and show
the results in Figs. 2.9b, c, respectively. As shown in the pictures, GLMS with . _c_ -search- **I**
and GLMS with . _c_ -search- **II** can still finish the group labeling task within the less time than
CCG. Especially, with . _c_ -search- **II**, GLMS can save time, under all group size settings, at
least .22 _._ 5% when . _G_ = 3, and at least .14 _._ 8% when . _G_ = 6.


**Performance comparison under asymmetric scenario**


This scenario consists of three cases: the first two cases are the asymmetric counterparts of the
symmetric scenarios, i.e., varying the number of the groups and the group size, respectively,
and we increase the asymmetry in the third case.

**Case 1.** In this case, we choose each group size randomly from.[100 _,_ 2000] while varying

. _G_ from . 2 to .10, and depict the results in Fig. 2.10a. It can be drawn from Fig. 2.10a that . _c_ search- **II** achieves the best time efficiency and . _c_ -search- **I** performs better than CCG, which
results from the ability of our approaches of exploiting more useful slots. Specifically, . _c_ search- **II** and. _c_ -search- **I** reduce the time up to.34 _._ 2% and.24 _._ 3%, respectively, in comparison
with CCG.

**Case 2.** In this case, we set the number of the groups to . _G_ = 3 _,_ 6, and choose the group
size randomly from .[ _a,_ 5000] with . _a_ = 125 _,_ 625 _,_ 1250 _,_ 2500. Figures 2.10b, c depict the
simulation results, from which we observe that . _c_ -search- **II** performs best and . _c_ -search- **I** is
also better than CCG. Specifically, . _c_ -search- **II** and . _c_ -search- **I** reduce the time cost up to


32 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Fig. 2.9** Performance
comparison in the symmetric
scenario with the various
number of groups and group
sizes: smaller execution time
means better performance


2.6 Performance Evaluation 33


**Fig. 2.10** Performance
comparison in an asymmetric
scenario with the various
number of groups and group
sizes: smaller execution time
means better performance


34 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Table 2.4** Performance evaluation in case 3

|Protocol|Subcase 1|Subcase 2|Subcase 3|Subcase 4|
|---|---|---|---|---|
|CCG|1.1971|2.9932|1.429|3.1914|
|._c_-search-**I**|0.9567|2.5905|1.1704|2.7825|
|._c_-search-**II**|0.8719|2.3832|1.0496|2.6052|



.23 _._ 5% and .18 _._ 3% when . _G_ = 3, and up to .17 _._ 2% and .12 _._ 1% when . _G_ = 6, respectively, in
comparison with CCG.

**Case 3.** In this case, we also set . _G_ = 3 _,_ 6, but we synthesize the following four subcases
by choosing the group size from different ranges: Subcase 1: . _G_ = 3, we choose the group
size randomly for the first group from .[100 _,_ 500], and from .[2000 _,_ 3000] for the others.
Subcase 2:. _G_ = 6, we choose the group size randomly for the three groups from.[100 _,_ 500],
and from .[2000 _,_ 3000] for the others. Subcase 3: . _G_ = 3, we choose group size randomly
for the three groups from .[100 _,_ 500], .[1000 _,_ 2000], an d .[2000 _,_ 3000], respectively. Subcase
4: . _G_ = 6, we choose the group size randomly for the first two groups from.[100 _,_ 500], from

.[2000 _,_ 3000] for the last two groups, and.[1000 _,_ 2000] for the others, respectively. As shown
in Table 2.4, . _c_ -search- **II** and . _c_ -search- **I** always outperform CCG. Specifically, CCG spends
up to .27 _._ 6% and .20 _._ 1% time more than ours, respectively, for the transmission of useless
slots.


**Performance comparison under asymmetric scenario with other distributions**


Normal distribution: We consider three cases, each of which has the same number of the
groups but has the different group sizes. Specifically, we set . _G_ = 2 : 2 : 10 in all cases, and
each group size follows the normal distribution . _N_ _(_ 1000 _, δ_ [2] _)_ with the standard deviation . _δ_
varied from 200 in Case 1 to 400 in Case 2 and to 800 in Case 3. As shown in Fig. 2.11,
GLMS with . _c_ -search- **II** is the fastest with the less complexity than . _c_ -search- **I**, and saves
time of up to .27% _,_ 23% _,_ 28% in the three cases, respectively, compared with CCG. Zipfian
distribution: Each group size is sampled from .[1 _,_ 1000] following the Zipfian distribution

. _Z_ _(_ 1000 _,_ 1 _, G)_ with the number of groups G set to .{10 _,_ 20 _,_ 50 _,_ 100}. The performance gain
of . _c_ -search- **II** over CCG is .31%, .27%, .20%, an d .8%, respectively.


**2.7** **Related Work**


Group labeling is a common functionality for many RFID applications. This section presents
the prior works on group labeling and the existing multi-seed/hash RFID protocols.

The feasible solutions to the group labeling problem. One straightforward solution is to
use the basic polling protocol (BP) [ 14] where each tag is polled with its group data by the
reader one by one. And BIC [ 19] can label each tag with its group data by informing each


2.7 Related Work 35


**Fig. 2.11** Performance
comparison in an asymmetric
scenario with the normally
distributed group size: smaller
execution time means better
performance


36 2 Efficient Multiple Group Labeling Scheme in RFID Systems


tag of the singleton slot when the tag should wait for its group data. These methods only
employ singleton slots such that only one tag can be labeled per slot, as a result, they spend
too much time either sending many tag IDs or group data and are thus time-consuming.

To improve time efficiency, the authors in [ 8] devise three protocols, namely EPG, FIG,
and CCG. In EPG, the reader first polls all tags in the same group and sends the group data
once. EPG is better than BP for less transmission of group data, however, it still wastes time
sending many tag IDs. In FIG, the reader builds a Bloom filter for each group from its tags
to filter out the tags of the other groups. Although outperforming EPG, FIG suffers from the
false positives of the Bloom filter and has to deactivate the wrong tags by polling, which
increases the time cost. To address this problem, CCG allows the reader to send different
group data to tags of multiple groups in one round. The reader sends a single indicator vector
to inform tags of each slot state such that only the tags in the useful slots will receive their
respective group data. Instead of using one seed in CCG, this chapter employs multiple seeds
to build a composite indicator vector to further improve the time efficiency.

Multi-seed/hash-based protocols in RFID systems. The multi-seed/hash methods are
used to address the information collection and tag monitoring tasks in RFID systems. Chen
et al. [ 9] employs multiple hashes to enable fast information collection. Then, the multiseed/hash method is used in monitoring the missing tag event and unknown tag event.
Specifically, Luo et al. [ 10] introduce the multi-seed method to detect missing tags in an
RFID system. The works [ 7, 20, 21] address the missing tag detection and identification with
multiple hashes. Recently, Gong et al. [ 11] combined the Bloom filter with the multi-seed
method in order to detect the unknown tags fast and reliably. The main novelty of our work is
exploiting collision slots instead of only singleton or empty slots in these works. Moreover,
we address a different group labeling problem, making the theoretical analysis completely
new. We would like to emphasize that this chapter is the first work proving the NP-hardness
of SAP arising from the application of multiple seeds and designing the approximation
algorithms, which makes our work more challenging.


**2.8** **Conclusion**


This chapter investigates the methods for achieving efficient group labeling. To this end,
we proposed a novel multi-seed group labeling protocol GLMS. We found an NP-hard seed
assignment problem that arises from the use of multiple seeds. To address this problem,
we first introduced an approximation algorithm with a proven competitive ratio and subsequently designed two simplified algorithms that offer lower complexity while maintaining
comparable performance. The simulation results demonstrate the superiority of the proposed
approaches.


2.A Proof of NP-Hardness 37


**2.A** **Proof of NP-Hardness**


_**Proof**_ To show the NP-hardness of Problem 1, we prove it reducible from the Maximum
coverage problem that is a classic NP-hard problem in polynomial time. Before the formal
proof, we first introduce the Maximum coverage problem.


**Problem 2** (Maximum Coverage Problem) Consider a set. U of. _n_ elements, and a collection

.S = {S1 _,_ S2 _,_ - · · _,_ S _h_ } of. _h_ subsets of. U such that.∪ _r_ S _r_ = U where. _r_ = {1 _,_ 2 _,_ - · · _, h_ }. Given
an integer . _k_ ≤ _h_, the Maximum coverage problem seeks . _k_ subsets from . S maximizing the
cardinality of their union.

Next, we show the polynomial reduction by three steps. Given . _h_ subsets .S _r_ of .U and
integer . _k_ ≤ _h_ with which we need to solve Problem 2, we instantiate Problem 1 as below.
**Step 1.** We first replicate each set .S _r_ . _k_ times and obtain . _h_ × _k_ sets as shown in Fig. 2.12
and .1 ≤ _r_ ≤ _h_ .
**Step 2.** Since in Problem 1, a slot in the CIV should only be assigned one seed, that is, just
one set should be selected in each column in Fig. 2.12. To this end, we introduce . _k_ dummy
sets .U1 _,_ U2 _,_ - · · _,_ U _k_ such that .∩ _r_ ′ U _r_ ′ = ∅ and .U _r_ ′ ∩ S _r_ = ∅ and .|U _r_ ′ | ≫ max _r_ |S _r_ | where

.1 ≤ _r_ [′] ≤ _k_ and .| · | represents the cardinality of a set. Moreover, we assume that all dummy
sets have the same cardinality for simpleness.

Subsequently, let .U _r_ ′ unite each set in column . _r_ [′] as shown in Fig. 2.13. A s . ∩ _r_ ′ U _r_ ′ = ∅
and.U _r_ ′ ∩ S _r_ = ∅ and.|U _r_ ′ | ≫ max _r_ |S _r_ |, if a set in column. _r_ [′] is picked, then only choosing
a set from another column . _r_ 1 [′] [will contribute to more new elements and can thus lead to a ]
greater .| _(_ S _r_ ∪ U _r_ ′ _)_ ∪ _(_ S _r_ 1 ∪ U _r_ 1′ _[)]_ [|][ where][ .] _[r]_ [′] [̸=] _[ r]_ 1 [′] [and][ .][1][ ≤] _[r]_ [1] [≤] _[h]_ [. ]
**Step 3.** Recall the objective in Problem 1 that we would like to designate seeds for . _z_ useful
slots to maximize . _u_ = _t_ [|∪] _g(a_ _[j]_ _[C]_ + _[ j]_ _z_ [|] _)_ [where ] [.] _[a]_ [= ⌈][log][2] _[(][l]_ [ +][ 1] _[)]_ [⌉·] _[f]_ [·] _[ t]_ [0] _[/][t][g]_ [is a constant. To reduce ]

Problem 2 to Problem 1, we proceed in this step to prove that . _u_ reaches its maximum only
if . _k_ sets are chosen in Problem 1.


**Fig. 2.12** Instantiation of
Problem 1


38 2 Efficient Multiple Group Labeling Scheme in RFID Systems


**Fig. 2.13** Construction of
dummy sets


To that end, suppose . _u_ reaches its maximum in the case that . _k_ [′] _< k_ sets . _(_ S _r_ ∪ U _r_ ′ _)_ in
Fig. 2.13 have been selected and the selected . _k_ [′] subsets .S _r_ covers . _X_ elements, the time
efficiency . _u_ is thus computed as:

. _u_ = _[k]_ [′][|][U] _[r]_ [′] [| +] _[ X]_

_tg(a_ + _k_ [′] _)_ _[.]_


Adding one more set to the supposed case, we have


[+][ 1] _[)]_ [|][U] _[r]_ [′] [| +] _[ X]_ [+] _[ Y]_
. _u_ [′] = _[(][k]_ [′] _,_

_tg(a_ + _k_ [′] + 1 _)_


where . _Y_ means the number of new elements contributed by the newly selected . S _r_ . If we
can prove that . _u_ [′] _> u_, then the optimum of . _u_ achieves if and only if . _k_ sets are selected. Let

. _u_ _< u_ [′], algebraically, we derive the following condition:



. _[X]_ _[(][a]_ [ +] _[ k]_ [′] _[)][Y]_

|U _r_ ′ | _[<][ a]_ [ +] |U _r_ ′ |



. _[X]_



_._
|U _r_ ′ |



Since .|U _r_ ′ | is supposed to be large enough, it is easy to check that the condition in the
equation above is established.

After three steps, Problem 1 is polynomially reduced from Problem 2 which is NP-hard,
Problem 1 is thus NP-hard. 

**2.B** **Proof of Lemma** **1**


_**Proof**_ Let . _uopt_ denote the optimal time efficiency of Problem 1 and define . _mopt_ and . _zopt_ as
the optimum for. _uopt_ . That is, in the optimal case, there are. _mopt_ tags covered by. _zopt_ useful
slots. For simpleness, we define a function . _�(m, z)_ = _m_ as the number of the tags covered
by . _z_ slots and use . _φ(z)_ to stand for . _tg(a_ + _z)_, thus . _u_ can be expressed as . _u_ = _[�(]_ _φ(_ _[m]_ _z_ _[,]_ _)_ _[z][)]_ [.]


References 39


Consider that . _zopt_ useful slots are selected, we have



. _uopt_ = _[�(][m]_ _φ(_ _[opt]_ _zopt_ _[,][ z]_ _)_ _[opt]_ _[)]_ ≤


≤




1



1 − [1] _e_



1 − [1]




_�(m, zopt_ _)_
_φ(zopt_ _)_



_umax_ _,_




1



_e_



where the first inequality is established by the fact that the number of the tags covered
by the greedy approximation algorithm is at least . _(_ 1 − [1] _e_ _[)]_ [of the optimal solution to the ]

Maximum coverage problem, and the second inequality holds since . _umax_ is the maximum
time efficiency for any . _z_ .

With algebraic operation, Lemma 1 is thus proven.  

**2.C** **Proof of Lemma** **2**


_**Proof**_ We employ. _u_ ˆ _( f,_ _l)_ to define the function for time efficiency. _u_ with respect to. _f_ and. _l_
in the case that all . _N_ [′] unlabeled tags from . _G_ [′] groups in the considered round can be labeled
within . _G_ [′] slots. Given either . _f_ or . _l_, it is easy to check from . _u_ ˆ _( f,_ _l)_ that we cannot enhance

. _u_ ˆ _( f,_ _l)_ or . _u_ ˆ _( f,_ _l)_ by increasing . _l_ or . _f_ . Therefore, the lemma is proven. 

**References**


1. D. Wu, M. J. Hussain, S. Li, L. Lu, R. [2] : Over-the-air reprogramming on computational rfids, in
_IEEE RFID_ (2016), pp. 1–8
2. D. Wu, L. Lu, M.J. Hussain, S. Li, M. Li, F. Zhang, R. [3] : Reliable over-the-air reprogramming on
computational rfids. ACM Trans. Embedded Comput. Syst. **17** (1), 9 (2017)
3. M. Chen, J. Liu, S. Chen, Q. Xiao, Efficient anonymous category-level joint tag estimation, in
_IEEE ICNP_ (2016), pp. 1–10
4. X. Liu, K. Li, A. X. Liu, S. Guo, M. Shahzad, A. L. Wang, J. Wu, Multi-category RFID estimation,
_IEEE/ACM TON_ (2016)
5. X. Liu et al., Top-k queries for multi-category RFID systems, in _IEEE Infocom_ (2016), pp. 1–9
6. B. Sheng, C.C. Tan, Q. Li, W. Mao, Finding popular categories for RFID tags, in _ACM MobiHoc_
(2008), pp. 159–168
7. J. Yu, L. Chen, R. Zhang, K. Wang, On missing tag detection in multiple-group multiple-region
rfid systems. IEEE TMC **16** (5), 1371–1381 (2017)
8. J. Liu, B. Xiao, S. Chen, F. Zhu, L. Chen, Fast RFID grouping protocols, in _IEEE Infocom_ (2015),
pp. 1948–1956
9. S. Chen, M. Zhang, B. Xiao, Efficient information collection protocols for sensor-augmented
RFID networks, in _IEEE Infocom_ (2011), pp. 3101–3109
10. W. Luo, S. Chen, T. Li, Y. Qiao, Probabilistic missing-tag detection and energy-time tradeoff in
large-scale RFID systems, in _ACM MobiHoc_ (2012), pp. 95–104


40 2 Efficient Multiple Group Labeling Scheme in RFID Systems


11. W. Gong, J. Liu, Z. Yang, Fast and reliable unknown tag detection in large-scale RFID systems,
in _ACM MobiHoc_ (2016), pp. 141–150
12. IMPINJ, RFID tag chips. Available: [http://www.impinj.com/products/](http://www.impinj.com/products/)
13. Y. Zheng, M. Li, P-mti: Physical-layer missing tag identification via compressive sensing.
IEEE/ACM TON **23** (4), 1356–1366 (2015)
14. Y. Qiao, S. Chen, T. Li, S. Chen, Energy-efficient polling protocols in rfid systems, in _ACM_
_MobiHoc_ (2011), p. 25
15. EPCglobal Inc., Radio-frequency identity protocols class-1 generation-2 UHF RFID protocol
for communications at 860 mhz–960 mhz version 1.0.9, 2005. Available: [http://www.gs1.org](http://www.gs1.org)
16. V.V. Vazirani, _Approximation algorithms_ (Springer-Verlag, Berlin Heidelberg, 2003)
17. M. Kodialam, T. Nandagopal, W. C. Lau, Anonymous tracking using RFID tags, in _IEEE Infocom_
(2007), pp. 1217–1225
18. M. Shahzad, A. X. Liu, Expecting the unexpected: Fast and reliable detection of missing RFID
tags in the wild, in _IEEE Infocom_ (2015), pp. 1939–1947
19. H. Yue et al, A time-efficient information collection protocol for large-scale rfid systems, in _IEEE_
_Infocom_ (2012), pp. 2158–2166
20. X. Liu et al., A multiple hashing approach to complete identification of missing RFID tags. IEEE
TCOM **62** (3), 1046–1057 (2014)
21. J. Yu, L. Chen, R. Zhang, K. Wang, Finding needles in a haystack: Missing tag detection in large
rfid systems. IEEE TCOM **65** (5), 2036–2047 (2017)


**Secure Anonymous Group-Wise Writing Scheme**
## **3**
**for RFID Systems**


This chapter is devoted to providing anonymous group writing. Our solution involves constructing an approximately random sequence as noise by overlapping transmission data from
different tag groups, thereby hiding the original information with low computational complexity. In this context, we propose an Overlapped Bloom Filter (OBF), a compact filter that
guarantees time efficiency while improving the security of the group writing. To ensure tags
can verify the correctness of decoded group data, the enhanced version, OBF+, introduces
the complementary code-based check mechanism to eliminate faulty data. We prototype
the system with USRP and programmable WISP tags and conduct extensive simulations to
evaluate our approaches in terms of time efficiency, accuracy, and data anonymity.

**Chapter roadmap:** The rest of this chapter is organized as follows. Section 3.1 explains
the motivation for studying the efficiently anonymous group writing and summarizes the
contributions. Section 3.2 reviews prior works on group writing and existing approaches to
achieving anonymity in RFID transmission. In Sect. 3.3, the system model, including the
problem formulation of the anonymous group writing and the motivation from overlapping
group data is presented. We then detail the proposed OBF and the advanced OBF+ in Sects.
3.4 and 3.5, respectively. Section 3.6 describes the implementation of the proposed OBF+
for the anonymous group writing using USRP software-defined radio and programmable
WISP tags. In Sect. 3.7, we evaluate the performance of proposed approaches in different
scenarios. Finally, we conclude this chapter in Sect. 3.8.



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_3](https://doi.org/10.1007/978-3-031-93034-8_3)



41


42 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**3.1** **Introduction**


One of the fundamental functions in RFID-based systems is group writing, which is to inform
each group of the tags of their group data (e.g., group ID). Yet, sending plaintext group data
in the prior works discloses the privacy of the systems such as the group ID and password,
introducing the risk of being attacked. In this context, one would like to conduct anonymous
group writing, which can correctly inform each tag of its group data while guaranteeing the
anonymity of the group data against an eavesdropper.

One intuitive solution is to introduce mature encryption algorithms [ 1] into the existing
group writing [ 2– 4] via encrypting the group data. However, the direct encryption has two
disadvantages: On the one hand, it needs to embed an integrated encryption/decryption
protocol into the original protocol increasing the communication overhead. On the other
hand, the tags have to be equipped with the corresponding decryption module increasing the
computational complexity, which is unsuitable for the tags of limited energy. Therefore, it
is called for a lightweight anonymous group writing protocol to protect the privacy of group
data in a time-efficient way.

In this chapter, we propose an Overlapped Bloom Filter-based (OBF) protocol and its
enhanced version (OBF+) to achieve efficient anonymous group writing. The two protocols
hide the group data to be sent with simple logical operators, e.g., OR and AND. The OBF
encodes the data of each tag group with bit overlapping allowed (logical ‘OR’) at the positions
where each tag is mapped, forming an approximately random sequence as a noise at the reader
side, and then allows each tag to recover the group data from the received bit sequence via
logical ‘AND’. On top of the OBF, the OBF+ brings the ability to check the recovered
group data to address the fault data by using the complement of the group data. Although
expanding the data with its complement increases the frame size reducing the time efficiency
of the transmission, this eliminates the incorrectly recovered group data while improving
the anonymity of the group data, enhancing the reliability of the anonymous group writing.
Our contribution can be summarized as follows.

- We formulate the largely unaddressed anonymous group writing problem in RFID systems and provide solutions from the perspective of initiatively adding harass via bit
overlapping into the transmission bit sequence.

- We present two concrete protocols namely OBF and the enhanced version OBF+ to construct and recover the ‘noise’ sequence. Both of them can achieve the required accuracy
of the recovered data under anonymous transmission, and the OBF+ achieves higher
reliability and stronger anonymity.

- We optimize the protocol performance by the optimum parameters derivation. The analytical results reveal the relationship among the time efficiency, the accuracy of the recovered
group data, and the transmission anonymity.

- We prototype the system with the software-defined radio reader and programmable WISP
tags. The experimental results confirm the feasibility of our protocol in practice.


3.2 Related Work 43


- We conduct extensive simulations to evaluate the performance of the proposed protocols.
The results show that the time cost of the OBF+ is about twice as the OBF, but there is
no fault data and the crack probability decreases by two orders of magnitude when there
are 5000 tags.


**3.2** **Related Work**


Group writing is an important functionality for managing multi-task backscatter systems
with different types of RFID tags. In this section, we present the prior works about group
writing and the existing anonymity of RFID transmission.

Polling protocol [ 5] can access the targeted tags thus the reader directly transmits the
group data to the tags one by one. The BIC [ 2] can transmit the group data to each tag at
the singleton slot mapped by the tag. The above methods address the problem of group data
transmission, but they only just achieve one tag per slot in the transmission instead of a batch
of the tags, leading to low time efficiency and low privacy. To improve the time efficiency,
Liu et al. [ 3] employ the slots mapped by the tags from the same group, thus not only the
singleton slots but also some collision slots can be used for group data transmission. Yu et
al. [ 6] pick multiple seeds to build a composite indicator vector to further reduce the useless
slots in the transmission. Liu et al. [ 7] design a writing bundling scheme to bundle multiple
writes up and execute them together in a burst mode, which greatly reduces the number
of selects and thereby amplifies the write throughput. Liu et al. [ 8] prove an algorithmindependent bound of time efficiency in terms of the minimum number of needed ‘Select’
commands and propose a writing scheme based on the designed pseudo-ID of tags. None
of these works can achieve the anonymity of the data transmission.

To protect the data transmission between the readers and the tags, Gao et al. [ 1] use the
Rabin public key cryptography algorithm, which verifies the signature process via square
multiplication and modulo operations to prevent eavesdropping by unauthorized users. Yang
et al. [9] introduce the chaotic sequences to encrypt/decrypt transmission data so that the
transmitted data after the encryption is similar to the white noise sequence improving the
anonymity of the data transmission. Each tag has its unique chaotic key stream sequence to
encrypt the data. Regrettably, it only just achieves one tag per slot in the transmission reducing the time efficiency. Conducting these protocols requires more computation resources
beyond the capability of tags. The main novelty of our work is to introduce interference
via overlapping the data of different groups to improve the anonymity of each group without adding new special modules like encryption/decryption as the conventional anonymity
methods in RFID systems. Moreover, we address a different group writing problem, making
the theoretical analysis new.


44 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**3.3** **System Model and Problem Formulation**


**3.3.1** **System Model**


We consider an RFID system consisting of one reader [1] and a large number of tags. The
reader is connected with a back-end server which has a powerful computational capability.
For the purpose of simplification, we treat the reader and the server as an entity and just
call it the reader. Moreover, each tag has a unique ID and performs computations such as
hashing function. All tags’ IDs in the system are recorded by the reader.

The communication between the reader and tags follows the rule of ‘Listen-before-talk’.
At the beginning of the communication, the reader broadcasts the commands containing
the parameters such as the seed to the tags, and each tag conducts specified operations
according to the received commands. In the data transmission, for example, the reader
broadcasts the commands and the parameters including the frame size. _f_ and a seed. _s_ at first
and constructs the data frame such as the bloom filter . **BF** to transmit. Then, each tag uses
its ID and the received seed . _s_ to generate one pseudo-random value via the hash function as

. _h_ = _(H (_ **ID** _, s)_ mod _f )_ . The random value from the hash function shows the start point
where to read in the bloom filter. Finally, the tags execute the next step according to the
received commands (i.e., compare, respond, or wait for the next commands). Note that the
hash function used in our study is ideal and its output obeys uniform distribution and is
nonreversible.

The downlink (i.e., reader-to-tags) transmission is continuous [ 14]. For simplicity, we
denote. _Td_ as the time duration of a one-bit broadcasting slot. Consider an arbitrate broadcasting slot, it conveys either ‘1’ or ‘0’. We assume that the unauthorized users do not have any
prior knowledge of the tag’s ID and the transmission data but they can perfectly synchronize
with the reader’s transmission thus eavesdropping the data broadcasted from the reader.


**3.3.2** **Problem Formulation**


We are interested in anonymous group writing in an RFID system. In this chapter, . _n_ tags
belong to. _g_ groups and each group has its corresponding group data, i.e.,. **GD** _j_ for.1 ≤ _j_ ≤ _g_,
and the length of the group data is . _l_ -bit.

The problem of the anonymous group writing over multiple tag categories is to make an
arbitrary tag success in recovering . _l_ -bit group data from the transmission sequence under
the accuracy requirement and an anonymity requirement within the minimum time. The
accuracy of the group writing in the system is defined as


1 For multiple readers, we treat them as a single virtual reader as in [ 10– 13]. Specifically, the back-end
server configures the parameters and sends them to all readers. Consequently, the back-end server
can synchronize the readers and we can logically consider them as a whole.


3.3 System Model and Problem Formulation 45




 _ncor_
.E
_n_




≥ _α,_ (3.1)



where . _ncor_ is the number of the tags correctly recovering group data and . _α_ is the required
accuracy. The execution time of the protocol is related to the frame size . _f_, i.e., the length
of the transmitting bit sequence, so we should minimize the frame size under the required
accuracy, i.e., . _fopt (α)_ .

For the anonymity of the group data, on the one hand, the constructed sequence for
the transmission should approach a binomial distribution sequence where each bit in the
sequence is nearly irrelevant to prevent from cracking, i.e., the probability of a bit being ‘1’
or ‘0’ in the transmission sequence should be . 2 [1] [. We denote by ] [.] _[P][un]_ [the anonymity which ]

measures the probability of incorrect crack from the transmission sequence. Intuitively,. _Pun_
is positively related to the frame size and the group data length, that said




- _l_
_._ (3.2)



1
. _Pun_ ∝
_fopt (α)_




1

2



In this context, we would like to maximize . _Pun_ . Therefore, there exists a trade-off between
the time efficiency and the anonymity. Table 3.1 summarizes the used main notations.


**3.3.3** **Overview of Our Solutions**


In the scene of the anonymous group writing, the reader should not only support the simultaneous data transmission for the multiple groups of the tags but also prevent unauthorized
users from cracking the group data from the transmitted data.

At the reader side, we directly hash the group data in bits and record them at the positions
of a bloom filter where each tag is mapped by ORing with the bits that were recorded in
these positions. As a result, the different group data will overlap with each other, achieving
simultaneous writing for multiple groups while hiding the original information. At the tag
side, they conduct an ‘AND’ operation to recover the original tag of each group from the
received overlapped sequence. We refer to this new bloom filter as the Overlapped Bloom
Filter.

Moreover, motivated by the feature of the complement in binary sequence and the bitwise
‘OR’ and ‘AND’, we could construct a special sequence that consists of a number and its
complement number to be a judgment factor to remove the fault data resulting from incorrectly recovered group data due to the false positives of the bloom filter and the overlapping
of the data. The extended length of the data also increases the anonymity of the data.


46 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**Table 3.1** Main notations

|Symbols|Description|
|---|---|
|._n_|The number of the tags in our system|
|._g_|The number of the groups in our system|
|._ f_|The frame size of hashing|
|._s_|The seed used in hash fun ction|
|._k_|The number of hash mappings conducted by each tag|
|._hi,m_|The._m_-th hash value of the._i_-th tag|
|.**BF**[_a_]|The content of the._a_-th element in the bloom ﬁlter. **BF**|
|._l_|The bit length of each group data|
|.**GD**_ j_|The group ID of the._ j_-th group|
|._ fo_<br>|The frame size of the hashing in the OBF|
|._P( j)_<br>_wrg_|The probability of writing the fault group data in the<br>._ j_-th group in the OBF|
|._Pcor_|The expected rate of recovering the correct group data<br>in OBF|
|._ feo_|The frame size of the hashing in the OBF+|
|._q_|The._q_-th round of multi-round writing in the OBF+|
|._kq_|The number of hash mappings for a tag in the._q_-th<br>round with the OBF+|
|._Pce_|The probability of recovering the correct group data for<br>each round in the OBF+|
|._Td_|The period of broadcasting in a bit|



**3.4** **OBF: Overlapped Bloom Filter-Based Group Writing**


In this section, we first introduce the OBF and analyze how to tune the parameters for
performance optimization.


**3.4.1** **Motivation**


Inspired by the variant of the bloom filter which consists of an array of cells each containing
a fixed number of bits, we achieve group writing by hashing the group data into cells, leading
to the simultaneous writing for multiple groups. The major shortage of this variant is its time
inefficiency as the minimum unit is a cell (i.e., multiple bits) instead of one bit. Therefore,
one intuition is storing group data in bits instead of cells, that said, different group data will
overlap with each other by bitwise ‘OR’ operation, hiding the original information. The


3.4 OBF:Overlapped Bloom Filter-Based Group Writing 47


advantage also lies in that each tag can conduct an ‘AND’ operation to recover its group
data from the overlapped bit sequence. Now, we verify the feasibility of our idea. Let get
start with the rule of Boolean Algebra.


**Lemma 1** . **A** _,_ . **B** _and_ . **C** _are the binary sequence with identical length. According to the_
_distributive law, we have_

. **A** & _(_ **B** | **C** _)_ = _(_ **A** & **B** _)_ | _(_ **A** & **C** _),_ (3.3)


_where ‘_ . & _’ means the logical bitwise ‘AND’ operator, and ‘_ . | _’ means the logical bitwise ‘OR’_
_operator._


Following the above law, we can conduct a conclusion.


**Theorem 2** _Denote an_ . _l-bit binary sequence by_ . **D** _, and_ . _k_ _random_ . _l-bit binary sequences_
_by_ . **c** _m_ _for_ . _m_ = 1 _,_ 2 _,_ - · · _, k. We construct new sequences_ .{ **e** 1 _,_ **e** 2 _,_ - · · _,_ **e** _k_ } _via making_
_the sequence_ . **D** _and each random sequence_ . **c** _m_ _to do operator_ . | _, i.e.,_ . **e** 1 = **D** | **c** 1 _,_ **e** 2 =
**D** | **c** 2 _,_ - · · _,_ **e** _k_ = **D** | **c** _k. The result of all these sequences_ . **e** _m_ _doing operator_ . & _can be written_
_as_


. **F** = **e** 1& **e** 2& · · · & **e** _k_ = _(_ **D** | **c** 1 _)_ & _(_ **D** | **c** 2 _)_ & · · · & _(_ **D** | **c** _k)_

= **D** | _(_ **c** 1& **c** 2& · · · & **c** _k)._ (3.4)


_Thus, the original sequence_ . **D** _can be correctly recovered when the_ . _(_ **c** 1& **c** 2& · · · & **c** _k) equals_
_all zero sequence or the sequence whose bit ‘1’ position is the subset of bit ‘1’ positions_
_in the sequence_ . _D. For instance, for the sequence_ . **D** = _(_ 111001 _)_ 2 _, if the_ . _(_ **c** 1& **c** 2& · · · & **c** _k)_
_equals each case of_ . _(_ 110000 _)_ 2 _,_ . _(_ 001000 _)_ 2 _,_ . _(_ 111001 _)_ 2 _, the sequence_ . **D** _can be correctly_
_recovered as_ . **D** = _(_ 111001 _)_ 2 _._


_**Proof**_ For the first two sequences . **e** 1 and . **e** 2, we ha ve


. **F** 1 = **e** 1& **e** 2 = _(_ **D** | **c** 1 _)_ & _(_ **D** | **c** 2 _)_ = **D** | _(_ **c** 1& **c** 2 _)._ (3.5)


Then, ANDing . **F** 1 with . **e** 3, yields . **F** 2 = **F** 1& **e** 3. Similarly, after . _k_ ‘AND’ operations, we can
eventually get


. **F** = **F** _k_ −1 = **F** _k_ −2& **e** _k_ = **D** | _(_ **c** 1& **c** 2& · · · & **c** _k)._ (3.6)


Here, we prove the feasibility of hiding the sequence . **D** via logical operator ‘OR’ and
recovering the sequence . **D** via logical operator ‘AND’. 

Since the mapping in the bloom filter by the hash function is random, the inserted
sequence might randomly overlap with each other, which is regarded as the target sequence. **D**
overlapped by a random sequence. **c** _m_ . Therefore, the overlapped data is recoverable for each


48 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


tag. So far, we proved the effectiveness of our idea by inserting group data into the bloom
filter.

Obviously, the tags can decode the correct group data if . _(_ **c** 1& **c** 2& · · · & **c** _k)_ is a sequence
of full zeros or the positions of the bit ‘1’ in the . _(_ **c** 1& **c** 2& · · · & **c** _k)_ is the subset of that in
the . **D** . Note that the . **c** _m_ approaches a random sequence and the . _(_ **c** 1& **c** 2& · · · & **c** _k)_ is near
a full-zero sequence with the increasing of the . _k_ . Therefore, the key to improving writing
accuracy lies in increasing the probability that . _(_ **c** 1& **c** 2& · · · & **c** _k)_ is a zero sequence. The
configuration of the parameters satisfying the required accuracy of the group writing will
be discussed in Sect. 3.4.3.


**3.4.2** **Protocol Description**


Our proposed Overlapped Bloom Filter can be described as follows. We start at the view of
the reader.

First, the reader updates grouping rules through the users’ requirement and then groups

. _n_ tags into their corresponding groups and allows each group a group data such as Group
ID (c.f. . **GD** _j_ for .1 ≤ _j_ ≤ _g_ ).

Second, the reader constructs an . _fo_ -bit bloom filter . **BF** that all bits are initialized
to ‘0’. For the . _i_ -th tag of the . _j_ -th group in the system where .1 ≤ _i_ ≤ _n_, each hashing value from the hash functions with the seed . _s_, ID, and the frame size . _fo_ is . _hi,m_ for

.1 ≤ _m_ ≤ _k_ . Th e . _hi,m_ points out the starting position to insert in the bloom filter for this tag, � - ��
and we update the content of the bloom filter via � - �� . **BF** _hi,m_ : mod _hi,m_ + _l_ - 1 _,_ _fo_ =
**BF** _hi,m_ : mod _hi,m_ + _l_ - 1 _,_ _fo_ | **GD** _j_ . Afte r . _k_ insertions, we complete the encoding
of the . _i_ -th tag’s group data into the bloom filter via the operator ‘OR’.

Third, once the overlapped bloom filter is constructed from the mapping of all tags, the
reader broadcasts the seed . _s_, the frame size . _fo_, and the overlapped bloom filter to tags.

At the tag side, each tag receives the parameters from the reader and uses them to calculate
its . _k_ hashing values under the seed . _s_, ID and the frame size . _fo_ . The tag then extracts each

. _l_ -bit binary sequence starting from its mapped positions from the received overlapped bloom
filter. The tag obtains a sequence by combining these. _k_ . _l_ -bit sequences via the bitwise ‘AND’.
This recovered sequence is regarded as the group data for this tag.

Note that the accuracy of group writing is not .100% after the above steps since the OBF
is a probabilistic algorithm. The reader can predict the tags that received the incorrect group
data. To inform the left tags of their group data, the reader has to conduct multi-round writing.
Specifically, the reader informs each tag of the wrong data with the ‘select’ command and
conducts a new round of writing with OBF. The time cost is acceptable since the number of
the incorrectly received tags is small with the required writing accuracy.

One of the challenges in the overlapped bloom filter is how to tune the frame size . _fo_ and
the number of the mapping positions . _k_ to optimize the time efficiency and anonymity given
the required rate of recovering the correct group data. We will address this in the Sect. 3.4.3.


3.4 OBF:Overlapped Bloom Filter-Based Group Writing 49


**3.4.3** **Parameters Optimization**


We here introduce how to set the parameters used in the overlapped bloom filter so that
the reliability of recovering group data can be satisfied while the overall execution time is
minimal and then analyze the anonymity of the transmission.

In our system, there exists. _n_ tags and. _g_ groups in our system. In the. _j_ -th group, it involves

. _n j_ tags, and its corresponding . _l_ -bit group data is . **GD** _j_ . We assume . _w j_ as the number of ‘1’
in the . **GD** _j_ . The length of the bloom filter . **BF** is . _fo_ and all bits in this filter are initialized
to ‘0’. The time cost of transmitting the seed value and the frame size can be negligible
compared with the time cost of transmitting the bloom filter. Therefore, the total execution
time is determined by the overlapped bloom filter transmission duration, which is expressed
as

. _Twhole_ 1 = _foTd_ _._ (3.7)


Obviously, the key to minimizing the total execution time is to find the minimum frame size
under the constrain of . _Pcor_ ≥ _α_, wher e . _Pcor_ is the expected rate of recovering the correct
group data in our system and it is expressed as

                    -                    . _Pcor_ = 1 − E _Pw_ _[(][ j]_ _rg_ _[)]_ ≥ _α,_ (3.8)


where. _Pw_ _[(][ j]_ _rg_ _[)]_ [is the probability of incorrectly decoding the group data. Now, the goal is to find ] - 
the minimum frame size. _fo_ to satisfy.1 − E _Pw_ _[(][ j]_ _rg_ _[)]_ ≥ _α_ . Let’s start with the first group. The



probability of an arbitrary bit in. **BF** mapped by a tag in the first group is. [1]



probability of an arbitrary bit in. **BF** mapped by a tag in the first group is. _fo_ [. Considering we ]

will insert . _l_ -bit sequence into . **BF** via the operator ‘OR’, the probability of an arbitrary bit
in . **BF** covered by a tag in the first group is . _[l]_ [. Furthermore, the probability of an arbitrary ]



_fo_ [. Furthermore, the probability of an arbitrary ]




_[l]_ _[w]_ [1]

_fo_ [·] _l_



bit holding ‘0’ after once mapping is .1 − _[l]_




[1]

_l_ [=][ 1][ −] _[w]_ _fo_ [1]




[1] [1]

bit holding ‘0’ after once mapping is .1 − _fo_ [·] _l_ [=][ 1][ −] _fo_ [. Hence, the probability of an ]

arbitrary bit in . **BF** still being ‘0’ after mapping of all tags of the first group is




   . _Pgrp_ 1 = 1 − _[w]_ _fo_ [1]




- _kn_ 1
_._ (3.9)



After the entire tag set has been inserted their group data into the overlapped bloom filter,
the probability of an arbitrary bit in . **BF** maintaining ‘0’ is




- _kn j_
_._ (3.10)




- _g_ 
1 − _[w][ j]_

_j_ =1 _fo_



. _P_ 0 =




- _g_

_Pgrp j_ =
_j_ =1



Thus, the probability that an arbitrary bit is ‘1’ after bitwise ‘AND’ of the . _k_ . _l_ -bit binary
sequences extracted from the overlapped bloom filter can be expressed as


50 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems




- _g_


_j_ =1



_._ (3.11)



⎞

- _kn j_

⎠



_k_




1 − _[w][ j]_

_fo_



. _P_ 1 = _(_ 1 − _P_ 0 _)_ _[k]_ =



⎛


⎝1 −



Decoding fails when some ‘0’ bits change to ‘1’ after the bitwise operation ‘OR’ and
‘AND’. Hence, the probability of the fault data for the . _j_ -th group can be expressed as


. _Pw_ _[(][ j]_ _rg_ _[)]_ [=][ 1][ −] _[(]_ [1][ −] _[P]_ 1 _[)][l]_ [−] _[w][ j]_ _[,]_ (3.12)


where . _l_ - _w j_ represents the number of the zero bits in . **GD** _j_, an d . _(_ 1 − _P_ 1 _)_ _[l]_ [−] _[w][ j]_ means that
these zero bits in . **GD** _j_ do not change after bitwise ‘OR’ and ‘AND’ operation.

According to the (3.12),. _Pw_ _[(][ j]_ _rg_ _[)]_ [is positively related to][.] _[P]_ 1 [with the fixed][.] _[w]_ _j_ [. In other words, ]
we will get the minimum value of . _Pw_ _[(][ j]_ _rg_ _[)]_ [when we minimize][ .] _[P]_ 1 [. ]


**Theorem 3** _Given the number of the tags_ . _n j_ _in each group, the number of bit ‘1’_ . _w j_ _in_
_each_ . **GD** _j_ _, the number of groups_ . _g, the relationship between the_ . _k and the_ . _fo should satisfy_


. _k_ = − [ln 2] (3.13)

ln _b_ _[,]_




       _where_ . _b_ = [�] _[g]_ _j_ =1 1 − _[w]_ _fo_ _[ j]_




- _n j ._




           _**Proof**_ We donate . _b_ = [�] _[g]_ _j_ =1 1 − _[w]_ _fo_ _[ j]_




           -            - _n j_            _**Proof**_ We donate . _b_ = [�] _[g]_ _j_ =1 1 − _[w]_ _fo_ _[ j]_ and . _P_ 1 = 1 − _b_ _[k]_ [�] _[k]_ . To minimize the . _P_ 1, we

derive the partial differential function o f .ln _P_ 1 with respect to the . _k_ . This partial differential
function can be expressed as



_fo_



. _[∂]_ [ln] _[ P]_ [1]




   
_[∂]_ 1 − _b_ _[k]_ [�]

_∂k_ _[k]_ [ ln]




[ln] _[ P]_ [1] = _[∂]_

_∂k_ _∂_




  = ln 1 − _b_ _[k]_ [�] - _[b][k]_ [ ln] _[ b][k]_



1 − _b_ _[k]_ _[.]_ (3.14)




[ln] _[ P]_ [1]

_∂k_ = 0 under . _b_ _[k]_ = 2 [1]



We will get the minimum values of . _P_ 1 when the . _[∂]_ [ln] _∂_ _[ P]_ [1]



_∂k_      
ln [ln 2] _b_ [where][ .] _[b]_ [ =][ �] _[g]_ _j_ =1 1 − _[w]_ _fo_ _[ j]_



2 [. Thus, the rela-]



tionship between . _k_ and . _fo_ satisfies . _k_ = − [ln 2]



_fo_



�2 _n j_
.    


Recall (3.8), we substitute (3.12) into it and rewrite as

                -                . _Pcor_ = 1 − E _Pw_ _[(][ j]_ _rg_ _[)]_ = _(_ 1 − _P_ 1 _)_ _[l]_ [−][E][[] _[w][ j]_ []] ≥ _α,_ (3.15)


   -    and .E _w j_ can be expressed as




  -  .E _w j_ = [1]

_n_




- _g_

_n j_ _w j_ _._ (3.16)
_j_ =1


3.4 OBF:Overlapped Bloom Filter-Based Group Writing 51


Substituting (3.11) and (3.13) into (3.15) thus yields




- _g_



1 ~~�~~ _._ (3.17)
_l_ −E[ _w j_ ]



.




- _g_ 
_n j_ ln 1 − _[w][ j]_
_j_ =1 _fo_



_fo_




_(_ ln 2 _)_ [2]
≥ ~~�~~




~~�~~
ln 1 − _α_



The key is to find the minimum value of . _fo_ making the above inequality hold. Therefore,
we obtain the minimum frame size . _fo_ for the group data transmission, which minimizes the
total execution time of the protocol.

Now, we analyze the anonymity of the overlapped bloom filter-based protocol. On the
one hand, . _P_ 0 = 2 [1] [under the optimum configuration means that the overlapped bloom filter ]

approaches a binomial distribution sequence that each bit is independent, increasing the
concealment of the transmission. On the other hand, the unauthorized users can obtain the
frame size of the bloom filter, the seed, and the data size since the reader broadcasts these
parameters with plaintext. But, the critical of the problem is to stop the group data from being
cracked. For the . _l_ -bit sequence, the number of the possible sequences is . 2 _[l]_ . The expected
ratio of the number of ‘0’ and ‘1’ in the sequence is 1, hence the expected number of the ‘0’
and the ‘1’ in any sequence is. _l/_ 2. For a tag’s any. _l_ -bit sequence which would be inserted into
the overlapped bloom filter, the probability of this inserted sequence remaining unchanged
after overlapping, i.e., the probability of this inserted sequence being cracked, is


_l_ _l_

. _Pun_ 1 = _Pa_ _[l]_ 0 [+] _[P]_ _a_ 20 _[(]_ [1][ −] _[P][a]_ [0] _[)]_ 2 _,_ (3.18)



where . _Pa_ _[l]_ 0 [means the inserted position of the tag’s group data in the overlapped bloom filter ]

_l_ _l_

is . _l_ -bit zero sequence after the other sequences inserted and . _Pa_ 20 _[(]_ [1][ −] _[P][a]_ [0] _[)]_ 2 means that

the inserted position is the identical sequences as this tag’s group data after the other tags
inserted. . _Pa_ _[l]_ 0 [can be expressed as ]



_P_ 0
. _Pa_ 0 = ~~�~~
1 − [E][[] _f_ _[w]_ _o_ _[ j]_ []]



1

~~�~~ = ~~�~~



_fo_




~~�~~
2 1 − [E][[] _[w][ j]_ []]




~~�~~ _._ (3.19)




                                      -                                      Recall (3.13), we have . _Pa_ 0 ≈ _P_ 0 = 1 _/_ 2 since . _fo_ is much larger than .E _w j_ . Therefore,
the anonymity of the overlapped bloom filter-based protocol, i.e., the probability of the
unauthorized users being unable to crack the group data from the overlapped bloom filter is




- _l_ −1
_._ (3.20)



. _Pano_ 1 = 1 − [1]




[1] _Pun_ 1 ≈ 1 − [1]

_fo_ _fo_



_fo_




1

2



From the above analysis, the anonymity of the overlapped bloom filter is determined once
the frame size . _fo_ is determined given the required rate of correctly recovering the group
data.


52 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


Let us take an example to interpret the overlapped bloom filter where we aim to transmit
group IDs to tags. There exists . _n_ = 3 tags and . _g_ = 3 groups. The length of each group ID
is . _l_ = 3 and they are . _(_ 110 _)_ 2 _, (_ 101 _)_ 2 _, (_ 011 _)_ 2 (c.f. Fig. 3.1a). The elements of each group is
shown as Fig. 3.1a. Following Theorem 1 to configure the parameters, we have . _fo_ = 20
and . _k_ = 3 and the anonymity of the overlapped bloom filter is .0 _._ 9688 since the expected
ratio of the number of ‘0’ and ‘1’ in these group IDs is .1 _/_ 2. First, the reader constructs the
overlapped bloom filter based on inserting all group IDs into the overlapped bloom filter
via operator ‘OR’ (c.f. Fig. 3.1b). Each tag calculates . _k_ = 3 positions with the received
parameters and combines 3 3-bit sequences extracted from the received bloom filter through
bitwise operator ‘AND’ (c.f. Fig. 3.1d). The result is regarded as its group ID by each tag
(c.f. Fig. 3.1e).


**Fig. 3.1** Illustrating the anonymous group writing with OBF


3.5 OBF+:An Enhanced Solution 53


**3.5** **OBF+: An Enhanced Solution**


In this section, we introduce the enhanced version of the OBF to further improve the accuracy
of the recovery data and the anonymity of the transmission.


**3.5.1** **Motivation**


As mentioned in (3.4), our overlapped bloom filter suffers from fault recovery data due to
that . _(_ **c** 1& **c** 2& · · · & **c** _k)_ cannot always be a zero sequence or be the sequence whose 1-bit
positions are the subsets of those of . **D** . In the OBF, tags cannot actively know whether
their recovered group data is correct, so the reader has to spend extra time executing the
command ‘select’ to inform these tags before conducting a new round of writing. To address
this limitation, we need a mechanism to enable each tag to verify the correctness of its
recovered group data, improving the reliability of the group data transmission. Our solution
is to add a check part to the group data. Considering the characteristics of the fault data, we
construct a newly inserted sequence by adding the complement of the group data behind
itself. If the ratio of the number of the recovered bit ‘1’ and bit ‘0’ in the recovered sequence
equals 1, then the decoded group data is correct. Each tag would find the data incorrect once
the ratio is not equal to 1.

The advantages of extending the group data with its complement are three-fold. (1) Due
to the complement of each group’s data, the tags can judge the validity of the recovered
sequence, thus enabling multi-round writing operations to improve the accuracy of the
writing. (2) The new sequence removes the difference in the accuracy across groups since
the number of bit ‘1’ in the new sequence of each group is identical, simplifying the parameter
optimization. (3) The probability of the transmission data being cracked decreases because
of the increased length of the inserted sequence, improving the transmission anonymity.

Specifically, Let us take an example to illuminate the group data extended with its complement. For a binary sequence . _(_ 11010101 _)_ 2, its complement sequence is . _(_ 00101010 _)_ 2.
Therefore, our extended sequence is . _(_ 11010101 00101010 _)_ 2. If the recovered sequence
after a bitwise ‘OR’ and ‘AND’ is . _(_ 11010101 00101010 _)_ 2, we will treat the former .8-bit

. _(_ 11010101 _)_ 2 as the group data. If the recovered sequence after a bitwise ‘OR’ and ‘AND’
is . _(_ 11010111 00101010 _)_ 2 where the .7-th bit and the .15-th bits are both ‘. 1’, the tag could
detect fault data and abandon it.


**3.5.2** **Protocol Description**


Our OBF+ can be described as follows. First, the reader groups . _n_ tags into . _g_ groups and
allows each group an. _l_ -bit group data (c.f.. **GD** _j_ for.1 ≤ _j_ ≤ _g_ ) according to the requirement
of the users.


54 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


Second, the reader constructs the enhanced overlapped Bloom filter namely OBF+.
The rule of deciding the starting position to insert a binary sequence is the same as the
OBF does. The difference is that we insert each group data with its complement followed. Hence, the length of the inserted whole binary sequence is .2 · _l_ rather than . _l_

                           -                           - ��
in the OBF. The insertion can be expressed as � - �� - . **BF** _h_ - _i,m_ : mod _hi,m_ + 2 _l_ - 1 _,_ _feo_ =
**BF** _hi,m_ : mod _hi,m_ + 2 _l_ - 1 _,_ _feo_ | **GD** _j_ _,_ **GD** _j_, wher e . _feo_ is the frame size of the
OBF+, and . _hi,m_ is the . _m_ -th hashing values of . _i_ -th tag, and . **GD** _j_ means the complement
sequence of . **GD** _j_ . Therefore, we insert the . _i_ -th tag’s group data and its complement into
the OBF+ via the operator ‘OR’. After the OBF+ has been built, the reader broadcasts the
seed . _s_, the frame size . _feo_, and the OBF+ to the tags. Since the reader has all tags’ IDs, the
reader can predict the tags that fail to correctly recover the group data by checking whether
the former . _l_ -bit and the latter . _l_ -bit are complementary. For these tags whose group data
are unsuccessfully recovered, the reader repeats the above steps to construct another bloom
filter from the mapping of these tags with unsuccessful group data.

At the tag side, each tag’s group data is initialized to a zero sequence. After receiving
the parameters from the reader, each tag first calculates its . _k_ hashing values with its ID, the
seed . _s_, and the frame size . _feo_ . The tag then extracts . _(_ 2 _l)_ -bit binary sequences starting from
its corresponding hashing values in the received bloom filter. The tag obtains a recovered
sequence after conducting the bitwise ‘AND’ among these . _k_ sequences. It then checks
whether the former. _l_ -bit and the latter. _l_ -bit are complementary. If this holds, the former. _l_ -bit
is recognized as the group data. Otherwise, the tag knows that the decoded group data is
wrong, and would wait for the next writing.

We set a threshold for the maximum writing rounds of the reader since each tag can judge
the validity of the recovered group data, enabling the multi-round writing to improve the
accuracy. When the writing finishes, the reader would report the IDs of the left tags that fail
to recover their group data correctly. The key left here is to configure such parameters as
the number of writing rounds and the frame size.


**3.5.3** **Parameters Optimization**


After the multi-round writing, the probability of recovering the correct group data at each
round . _Pce_ could be smaller than the requirement . _α_, so it is adequate to set the smaller frame
size at each round, this however would degrade the anonymity. Therefore, we can proceed
in two cases: Optimizing the time efficiency and optimizing the anonymity.

In case 1, we need to find out the minimum frame size of the transmission improving
the time efficiency. The time cost of transmitting the seed values and the frame sizes can be
negligible compared with that of transmitting the bloom filter. Thus, the overall execution
time of the OBF+ is


3.5 OBF+:An Enhanced Solution 55



. _Twhole_ 2 =




- _r_

_feq_ _Td_ _,_ (3.21)
_q_ =1



where . _r_ is the maximum rounds for bloom filter transmission and . _feq_ is the frame size for
the . _q_ -th transmission. The key is to configure . _r_ and . _feq_ to minimize execution time, and
both of them are related to the probability of recovering the correct group data . _Pce_ for each
round.


**Theorem 4** _Given the required accuracy of recovering the correct group data, the maximum_
_rounds for the reader’s transmission_ . _r_ _and the probability of recovering the correct group_
_data_ . _Pce_ _for each round satisfies_


. _r_ ≥ [ln] _[ (]_ [1][ −] _[α][)]_ (3.22)

ln _(_ 1 − _Pce)_ _[.]_


_**Proof**_ The number of the tags that unsuccessfully recover their group data after the . _q_ -th
transmission under the same probability of recovering the correct group data . _Pce_ for each
round is . _neq_ = _n(_ 1 − _Pce)_ _[q]_ . Thus, the number of the left tags after . _r_ -round transmission
ln _(_ 1− _α)_
should satisfy . _ner_ ≤ _n (_ 1 − _α)_ . Therefore, we obtain . _r_ ≥ ln _(_ 1− _Pce)_ [.] 

This theorem shows the relationship between . _r_ and . _Pce_ under the requirement of accuracy in our protocol. Now the problem is to find the relationship between the . _Pce_ and its
corresponding frame size . _feq_ for the . _q_ -th transmission.

_l_

The probability of an arbitrary bit holding ‘0’ after once hashing is. 1 − _f_ [2] _eq_ _[l]_ [·] 2 _[l]_ _l_ [=][ 1][ −] _feq_

since the number of bit ‘1’ and the number of bit ‘0’ are identical in the inserted sequence.
Hence, the probability of an arbitrary bit in the . _q_ -th bloom filter maintaining ‘0’ after all
sequences inserted can be written as



The probability of an arbitrary bit holding ‘0’ after once hashing is. 1 − [2] _[l]_




[2] _[l]_ _[l]_

_feq_ [·] 2




- _kq_ _n(_ 1− _Pce)q_ −1
_._




   _l_
. _Pe_ _[(]_ 0 _[q][)]_ = 1 − _feq_




- _kq_ _neq_ - _l_
= 1 −
_feq_



Thus, the probability that an arbitrary bit is ‘1’ after bitwise ‘AND’ operation of the . _kq_

.2 _l_ -bit binary sequences extracted from the bloom filter can be expressed as



. _Pe_ _[(]_ 1 _[q][)]_ = _(_ 1 − _Pe_ 0 _[(][q][)][)][k][q]_








- _kq_ _n(_ 1− _Pce)q_ −1 [�] _[k]_ _q_
_._ (3.23)



=




  _l_
1 − 1 −
_feq_



The unsuccessful recovery happens when the former . _l_ -bit sequence and the latter . _l_ -bit
sequence are not complementary in the recovered sequence. That said, there are bits ‘0‘
changing to bit ‘1’. Recall that . _l_ bit ‘0’ in the correctly recovered sequence, the probability


56 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


              -              - _l_

that none of them has been changed is. 1 − _Pe_ 1 _[(][q][)]_ . Therefore, recovering the correct group

data . _Pce_ for the . _q_ -th round can be expressed as

           -           - _l_
. _Pce_ = 1 − _Pe_ 1 _[(][q][)]_




  _l_
1 − 1 −
_feq_








- _kq_ _n(_ 1− _Pce)q_ −1 [�] _[k]_ _q_ [⎞] _l_



_l_



_._ (3.24)



=



⎛


⎝1 −



⎠



Due to the same solution described in Sect. 3.4.3, we obtain the relationship between . _kq_
and . _feq_ as




[ln 2] _feq_ ln 2

ln _b_ [≈] _n (_ 1 − _P_ _)_ _[q]_



. _kq_ = − [ln 2]



_,_ (3.25)
_n (_ 1 − _Pce)_ _[q]_ [−][1] _l_




- _n(_ 1− _Pce)q_ −1
≈ _e_ [−] _[nl][(]_ [1][−] _[Pce]_ _feq_ _[)][q]_ [−][1]




    _l_
where. _b_ = 1 − _feq_




- _n(_ 1− _Pce)q_ −1
, and we have.




_l_

. 1 − _feq_



where. _b_ = 1 − _feq_, and we have. 1 − _feq_ ≈ _e_ _feq_ . (3.24)

can be rewritten as




      -       1
. _(_ 1 − _Pce)_ _[q]_ [−][1] ln 1 − _(Pce)_ _l_



_nl_ _[eq]_ _[(]_ [ln 2] _[)]_ [2] _[ .]_



⎛



⎞

- _[feq]_ [ln 2]
_l_



= _[f][eq]_ [ ln 2] ln

_nl_



= _[f][eq]_ [ ln 2]




  _l_
⎝1 − 1 −
_feq_



⎠ ≈− _[f][eq]_



Then, we have




            -             
_nl_ 1
. _feq_ = − 1 − _(Pce)_ _l_ _._ (3.26)

_[(]_ [1][ −] _[P][ce][)][q]_ [−][1][ ln]
_(_ ln 2 _)_ [2]



Substituting (3.26) into (3.21) yields



. _Twhole_ 2 =




- _r_ _αnlTd_ - 1 
_feq_ _Td_ = − 1 − _(Pce)_ _l_ _._

[ln]
_q_ =1 _Pce (_ ln 2 _)_ [2]



2

Obviously, we can obtain the minimum execution time when we have . d _Pce_ = 0. Thus,

the optimum value of . _Pce_ should be satisfy that



Obviously, we can obtain the minimum execution time when we have .



d _Twhole_ 2




_._ (3.27)




- 
1

ln 1 − _Pcel_




- ln 1 − _P_



. − [1]




  1
_cel_ = 1 − _P_



_l_ _[P]_



1
_l_
_ce_



**Theorem 5** _There is only one non-zero solution to the equation expressed as follows, and_

      -       
_it falls into_ . 1 − _e_ _[a]_ [−][1] _,_ 1 _._


. _F (x)_ = _ax_ + _(_ 1 − _x)_ ln _(_ 1 − _x)_ = 0 _,_ (3.28)


_where_ .0 _< a_ ≤ 0 _._ 5 _and_ .0 _<_ _x_ _<_ 1 _._


3.5 OBF+:An Enhanced Solution 57


_**Proof**_ The first-order and the second-order derivation of Eq. (3.28) can be written as


. [d] _[F][ (][x][)]_ = _a_                                                                                  - ln _(_ 1 − _x)_                                                                                  - 1 _,_

d _x_

d [2] _F (x)_ 1

=
d _x_ [2] 1 − _x_ _[>]_ [ 0] _[.]_




_[(][x][)]_

d _x_ = 0 when . _x_ = 1 − _e_ _[a]_ [−][1] and . [d] _[F]_ d _[(]_ _x_ _[x][)]_



We have . [d] _[F][(][x][)]_



We have . [d] _[F]_ d _[(]_ _x_ _[x][)]_ = 0 when . _x_ = 1 − _e_ _[a]_ [−][1] and . [d] _[F]_ d _[(]_ _x_ _[x][)]_ _>_ 0 when . _x_ _>_ 1 − _e_ _[a]_ [−][1] . Substituting

this value into (3.28) yields . _a_ - _e_ _[a]_ [−][1] _<_ 0. Since we hav e . _F (x) >_ 0 when . _x_ approaches 1,

                -                 
the non-zero solution falls into . 1 − _e_ _[a]_ [−][1] _,_ 1 . 



- 1 − _e_ _[a]_ [−][1] _,_ 1 . 


Following the theorem, we can obtain the proper value of � . _Pce_ in the range of



�� - .
1

. 1 − _e_ _l_ [−][1][�] _[l]_ _, α_ which minimizes the time cost of the transmission.



.



Next, we analyze the anonymity of the OBF+. Although the size of the sequence expands
to . 2 _l_, the number of the possible sequences is also .2 _[l]_ since the latter . _l_ -bit is the complement
of the former . _l_ -bit. As the same as the OBF, the bloom filter in the OBF+ also approaches
a binomial distribution sequence under the above configuration and each bit in the bloom
filter is independent. The ratio of the number of the ‘0’ and the ‘1’ in the sequence holds 1,
and the number of the ‘0’ and the ‘1’ in any sequence is . _l_ . The probability of a bit being ‘0’
in the . _q_ -th bloom filter excluding a tag’s sequence inserted can be expressed as



≈ [1] (3.29)

2 _[.]_




   _l_
. _Pea_ _[(][q]_ 0 _[)]_ [=] 1 −
_feq_




- _kq_ - _n(_ 1− _Pce)_ _[q]_ [−][1] −1�



Thus, the probability of the sequence being cracked is

          - �2 _l_          -          - _l_          -          - _l_          - 1
. _Pun_ _[(][q]_ 2 _[)]_ [=] _Pea_ _[(][q]_ 0 _[)]_ + _Pea_ _[(][q]_ 0 _[)]_ 1 − _Pea_ _[(][q]_ 0 _[)]_ =
2



�2 _l_ −1
_._



Therefore, the anonymity of the enhanced overlapped bloom filter, i.e., the probability of the
unauthorized users being unable to crack the group data from the . _q_ -th enhanced overlapped
bloom filter is



. _Pano_ _[(][q][)]_ 2 [=][ 1][ −] [1]




[1] _Pun_ _[(][q]_ 2 _[)]_ [=][ 1][ −] [1]

_feq_ _f_



_feq_




- 1 �2 _l_ −1

_._ (3.30)

2



From the above analysis, the anonymity of the OBF+ is determined by. _Pce_ since. _feq_ is determined by . _Pce_ . Therefore, we can select the proper value of . _Pce_ maximizing the frame size
for the anonymity preference. We use the mean value of . _Pano_ _[(][q][)]_ 2 [measuring the transmission ]
anonymity.


58 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**Fig. 3.2** The example of finding proper value of . _Pce_ with . _α_ = 95%


We will take an example to explain how to select parameters with different preferences
in a system consisting of .100 groups and 10 tags in each group (i.e., total 1000 tags in
the system), as shown in Fig. 3.2. The downlink transmission rate is .40 _._ 97kb/s and the
required accuracy of recovering the group data is . _α_ = 0 _._ 95. For each . _Pce_, we obtain its
corresponding rounds . _r_ and the frame size . _feq_ for the . _q_ -th round. For minimizing the time
cost, the optimum value of . _Pce_ is . _Pce_ [∗] [=][ 0] _[.]_ [78, the number of wring rounds is ] [.] _[r]_ [=][ 2,] [ and]
the frame sizes are . _feo_ [∗] 1 [=][ 48677] [and ] [.] _[ f]_ [ ∗] _eo_ 2 [=][ 10855, respectively. Under this setting, the ]
mean anonymity is . _Pano_ 2 = 1 − 6 _._ 9 × 10 [−][9] . For maximizing the anonymity, the required
probability of recovering the correct group data is . _Pce_ [∗] [=][ 0] _[.]_ [95, and its corresponding frame ]
size is . _feo_ [∗] [=][ 71679 and the corresponding anonymity is][ .] _[P][ano]_ [2] [=][ 1][ −] [1] _[.]_ [7][ ×][ 10][−][9][. ]
Let us take an example to summarize the process of the OBF+. Consider an RFID system
of . _g_ = 3 groups each having one tag. The reader would transmit the group ID to each tag.
The length of each group ID is set to . _l_ = 2, namely . _(_ 01 _)_ 2 _, (_ 10 _)_ 2 _, (_ 11 _)_ 2 (c.f. Fig. 3.3a). The
elements of each group is shown as Fig. 3.3a. Following the parameter configuration rule,
we have. _r_ = 1,. _feo_ = 20 and. _k_ = 3. First, the reader constructs the OBF+ by inserting group
IDs and their complements (c.f. Fig. 3.3b) via operator ‘OR’ (c.f. Fig. 3.3c). Receiving the
OBF+, each tag maps itself to. _k_ = 3 positions, and combines these 3 4-bit sequences through
the bitwise operator ‘AND’ (c.f. Fig. 3.3e). Before acknowledging its group ID, each tag
checks whether the former .2-bit and the latter .2-bit are complementary (c.f. Fig. 3.3f). If so,
the former . 2 bits are the group ID of the tag (c.f. Fig. 3.3g). Otherwise, the tag will regard
the recovered group ID . _(_ 00 _)_ 2 as wrong.


3.6 Implementation 59


**Fig. 3.3** The example of group data transmission based on the OBF+


**3.6** **Implementation**


In this section, we implement our prototype for anonymous group writing using USRP
software-defined radio and programmable WISP tags. We select the OBF+ as the protocol
used in the prototype since the OBF+ is more reliable thus being more appropriate in practice.


**3.6.1** **Experimental Setup**


As the commodity readers do not transmit a specific binary sequence for the transmission
of group data, we customize the Software-Define-Radio(SDR) reader based on NI USRP2920 software radio to broadcast the bloom filter to tags. The SDR reader uses a USRP
WBX daughterboard as the front end, which operates at the center frequency of 915 MHz.
Besides, the daughterboard is connected to two Laird S9028PCR circular polarized antennas
for receiving and transmitting radio frequency signals respectively. Then We connect the


60 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


NI USRP-2920 to a laptop and send the PHY layer symbols to the laptop for the software
processing based on the GNURadio. The operating system is Ubuntu 16.04.2 LTS.

Since the tags need to decode the bloom filter from the SDR reader, we implement the tags
based on the WISP hardware. The WISP tag is equipped with an ultra-low power MSP430
microcontroller which is able to store the bloom filter and complete the operator ’AND’ to
decode the bloom filter.

We have an SDR reader and four WISP tags. We divide these tags into two groups each
containing two tags. The group data are ‘01’ and ‘10’, respectively. We conduct experiments
in our lab and arrange the distance between WISP tags and the SDR reader within 20cm.
Moreover, the communication between the WISP tags and the SDR reader still follows the
C1G2 standard, we only extend the WISP tags and the SDR reader with the functions of
group data transmission. For example, we add new fields into the query command including
the number of the hash functions (set to 3), the length of the bloom filter (set to 12), and the
constructed bloom filter.


**3.6.2** **Implementation of the Anonymous Group Writing**


The SDR reader broadcasts the modified query command including the bloom filter constructed according to the Sect. 3.5.2. The WISP tags enter the inventory round after receiving
the modified query command. For the original fields, the WISP tags follow the C1G2 standard [ 14]. Then, each WISP tag correctly extracts its own group data if the former part and
the latter part of the recovered sequence are complements. Otherwise, the tags will keep
silent and wait for the next round. Figure 3.4a plots the PHY layer symbols observed at the
SDR reader. Figure 3.4b shows the detail of the bloom filter in the modified query command
and Fig. 3.4c shows the details of the four busy slots. Obviously, the ratio of the number of
bit ‘1’ and bit ‘0’ approaches . 2 [1] [and the anonymity is more than ] [.][0] _[.]_ [99 according to (][3.30][). ]

As shown in Fig. 3.4c, these four WISP tags successfully recover the group data. Therefore,
the OBF+ achieves anonymous group writing in the practical system.


**3.7** **Performance Evaluation**


In this section, we evaluate the performance of the proposed OBF and OBF+ in terms of the
accuracy, the execution time, and the anonymity. The timing parameters in the simulation
follow the C1G2 standard [ 14]. Specifically, the communication from the reader to the tags
is consecutive transmission. The transmission rate is .40 _._ 97kb/s hence a broadcast slot is

. _Td_ = 24 _._ 4 _μ_ s. Each group ID is the binary sequence of its serial number, e.g., the. _j_ -th group
ID . **GD** _j_ = _j_, and the length of the binary sequence is determined by the number of groups

. _g_, e.g., . _l_ = ⌈log2 _(g_ + 1 _)_ ⌉. The parameters like the frame size of the bloom filter are set
according to the theoretical analysis. In the simulation, we verify the effectiveness of these


3.7 Performance Evaluation 61


**Fig. 3.4** The signal pattern of
our prototype


62 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


two protocols in addressing the anonymous group writing problem. The results are obtained
from 1,000 independent runs.

**Performance Verification:** We here verify the time efficiency, the recovery accuracy,
the rate of the incorrect group ID, and the anonymity of the proposed protocols under
five scenarios. In the simulation, the required recovery accuracy varies from . _α_ = 95% to

. _α_ = 99% in the first two scenarios and is fixed to . _α_ = 95% in the latter three scenarios. We
use the cracking probability of group data as the metric to gauge the anonymity. The lower
the cracking probability means the greater the anonymity. We also show the performance of
the OBF+ with different optimization objectives, i.e., time efficiency and anonymity, in the
last scenario.

In the first scenario, we study the impacts of the number of overall tags in the system.
There are 10 tags in each group, and the number of the total tags varies from 1,000 to 5,000.
The simulation results under different required accuracies are depicted in Figs. 3.5 and
3.6. The results show that the proposed OBF and OBF+ can satisfy the required accuracy
rate. Yet, these two protocols have to spend more time on group ID transmission as the
number of tags increases when there would be more groups. Although the OBF is more
time-efficient, the fault data degrades the reliability of the transmission. On the contrary,
the rate of recovering incorrect group ID from the OBF+ is always 0 since the OBF+ can
detect the error and then abandon the fault data. Moreover, the OBF+ has a lower cracking
probability, leading to stronger anonymity of the group data transmission.

In the second scenario, we investigate the impact of the number of tags in each group. To
this end, we set the total number of the tags in the system as 1,000 and vary the number of
the tags in each group from 1 to 100. Each group size is identical. We can draw from Fig. 3.7
and Fig. 3.8 the similar conclusions as in the first scenario that both OBF and OBF+ can
achieve the required accuracy of recovering group ID, but OBF+ is more reliable and more
anonymous.

In the third scenario, we further investigate the impact of the random number of the tags
in each group under. _α_ = 95%. We also set the total number of the tags in the system as 1,000
varying the number of the groups in the system from 5 to 100. Specifically, We randomly
classify the tags into . _gr_ groups each consisting of a random number of the tags. We run 100
times and obtain the mean value as the evaluated results with the . _gr_ groups. We can draw
a similar conclusion as the second scenario from Fig. 3.9 that both the OBF and the OBF+
can achieve the required accuracy of recovering group ID, but the OBF+ is more reliable
and more anonymous.

In the fourth scenario, we verify the OBF and the OBF+ in a large-scale system under

. _α_ = 95%. Figure 3.10 shows the performance of our two proposed protocols with the number
of overall tags in the system given the identical group size (i.e., 10 tags in each group).
Moreover, Fig. 3.11 depicts the execution time when the total number of the tags is . 30000
and the number of the tags in each group is random. It can be observed that the execution
time increases but the cracking probability decreases when the system scale extends.


3.7 Performance Evaluation 63


**Fig. 3.5** The performance of
the OBF and the OBF+ with

. _α_ = 95% and the number of
the overall tags in the system
varied


64 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**Fig. 3.6** The performance of
the OBF and the OBF+ with

. _α_ = 99% and the varying
number of the overall tags in
the system


3.7 Performance Evaluation 65


**Fig. 3.7** The performance of
the OBF and the OBF+ with

. _α_ = 95% and the number of
the tags in each group varied
from 1 to 100


66 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**Fig. 3.8** The performance of
the OBF and the OBF+ with

. _α_ = 99% and the number of
the tags in each group varied
from 1 to 100


3.7 Performance Evaluation 67


**Fig. 3.9** The performance of
the OBF and the OBF+ with
the random number of tags in
each group under the accuracy
of . _α_ = 95% and the number of
total tags is fixed to 1000


68 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**Fig. 3.10** The performance in
the large-scale system where
30000 tags are grouped evenly
under . _α_ = 95%


3.7 Performance Evaluation 69


**Fig. 3.11** The performance on
the random number of the tags
in each group under . _α_ = 95%
and 30000 tags in total


70 3 Secure Anonymous Group-Wise Writing Scheme for RFID Systems


**Fig. 3.12** The performance when . _α_ = 95% and each group contains 10 tags


In the fifth scenario, we evaluate the OBF and the OBF+ that work with different optimum
strategies (i.e., time cost or anonymity). The rate of recovering the correct group ID is set to

. _α_ = 95. Figure 3.12a illustrates the execution time where the number of tags in each group
is identity(i.e., 10 tags in each group). Figure 3.12b depicts the cracking probability. Obviously, the OBF+ improves the anonymity of the protocol at the expense of time efficiency.
Therefore, we can make a trade-off between the time cost and anonymity according to the
requirements of the users.


**3.8** **Conclusion**


This chapter has addressed an anonymous group data transmission problem arising from
multi-group RFID systems. The prior works suffer low security due to transmitting group
data with plaintext, or low time efficiency due to renewing the keys for encryption. To
overcome these drawbacks, we have provided a solution and its enhanced version, namely
OBF and OBF+. They use the novel bloom filter where the group data is inserted into the
bloom filter in bits thus being overlapped with each other. The OBF shows the feasibility of
our idea, and the OBF+ further improves the reliability and the anonymity of the protocol. We
also have derived the optimum parameters used in the protocols. We have also implemented
the OBF+ in the practical systems and conducted extensive simulations. The results confirm
the effectiveness of protocols and the superiority of the OBF+ in terms of reliability and
anonymity.


References 71


**References**


1. L. Gao, L. Zhang, M. Ma, Low cost RFID security protocol based on rabin symmetric encryption
algorithm. Wireless Personal Commun. **96** (1), 683–696 (2017)
2. H. Yue, C. Zhang, M. Pan, Y. Fang, S. Chen, A time-efficient information collection protocol for
large-scale RFID systems, in _2012 Proceedings IEEE INFOCOM_ (IEEE, 2012), pp. 2158–2166
3. J. Liu, B. Xiao, S. Chen, F. Zhu, L. Chen, Fast RFID grouping protocols, in _2015 IEEE Conference_
_on Computer Communications (INFOCOM)_ (IEEE, 2015), pp. 1948–1956
4. J. Yu, J. Liu, R. Zhang, L. Chen, W. Gong, S. Zhang, Multi-seed group labeling in RFID systems.
IEEE Trans. Mobile Comput. **19** (12), 2850–2862 (2019)
5. Y. Qiao, S. Chen, T. Li, S. Chen, Energy-efficient polling protocols in RFID systems, in _ACM_
_MobiHoc_ (2011), p. 25
6. J. Yu, J. Liu, R. Zhang et al., Multi-seed group labeling in RFID systems. IEEE TMC **19** (12),
2860–2862 (2019)
7. J. Liu, X. Chen, X. Liu, X. Zhang, X. Wang, L. Chen, On improving write throughput in commodity RFID systems, in _IEEE INFOCOM 2019-IEEE Conference on Computer Communications_
(IEEE, 2019), pp. 1522–1530
8. K. Liu, L. Chen, J. Yu, C. Haochen, On batch writing in COTS RFID systems, _IEEE Transactions_
_on Mobile Computing (Early Access)_ (2023)
9. J. Yang, B. Liu, H. Yao, Application of chaotic encryption in RFID data transmission security.
Int. J. Adv. Network Monitor. Controls **4** (1), 90–96 (2019)
10. J. Yu, W. Gong, J. Liu, L. Chen, K. Wang, On efficient tree-based tag search in large-scale RFID
systems. IEEE/ACM ToN **27** (1), 42–55 (2019)
11. J. Yu, L. Chen, R. Zhang, K. Wang, On missing tag detection in multiple-group multiple-region
RFID systems. IEEE TMC **16** (5), 1371–1381 (2016)
12. H. Liu, R. Zhang, L. Chen, J. Yu, J. Liu, J. An, On fast and reliable missing event detection
protocol for multitagged RFID systems. IEEE IoT J. **7** (10), 10324–10335 (2020)
13. H. Liu, R. Zhang, L. Chen, J. Yu, J. Liu, J. An, Q. Chen, Computation-communication trade-offs
for missing multi-tagged item detection in RFID networks, _IEEE Internet of Things Journal_
(2021)
14. _EPC radio-frequency identity protocols Class-1 Generation-2 UHF RFID Protocol for commu-_
_nication at 860 MHz - 960 MHz_ . EPC, 2.0.1 ed. (2015)


**Compact Filter-Based Access Protocol**
## **4**
**for Multi-Tagged RFID Systems**


Prior detection protocols are limited to single-tagged RFID systems and would waste considerable time on repeated checks of individual objects in emerging multi-tagged systems,
where each object is attached by multiple tags. This inefficiency leaves the challenge of
efficient detection in multi-tagged scenarios unaddressed. To bridge the gap, this chapter
focuses on detecting missing multi-tagged objects. The key technicality is to build a filter
from a subset of tags rather than the entire set, as in previous works, to avoid redundant detection of individual objects and reduce overall detection time. Specifically, we first provide a
basic solution based on the Bloom filter which can specify only tags in the chosen subset to
participate in final detection. To further improve time efficiency, we propose an advanced
protocol that exploits tag ID knowledge and sparsity of slots mapped by the chosen subset to
build a more compact compressive filter. Moreover, a composite vector is used to efficiently
coordinate tags to report their presence. We further conduct theoretical analysis to determine
the optimal protocol parameters and perform extensive simulations to verify the feasibility
of the protocols. The results demonstrate that the advanced protocol achieves more than
2x performance gain in terms of time efficiency compared to the Bloom filter-based basic
protocol.

**Chapter roadmap:** The remainder of this chapter is organized as follows. Section 4.1
outlines the motivation for studying the multi-tagged detection RFID systems and summarizes our contributions. Section 4.2 reviews the prior works on missing event detection.
The traditional bloom filter used in both marking and detection is described in Sect. 4.4.
In Sect. 4.5, we introduce our marking method with a compressed filter and the detection
method based on multiple seed detecting. Section 4.6 discusses the simulation results of the
proposed protocols in different scenes. Finally, we conclude this chapter in Sect. 4.7.



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_4](https://doi.org/10.1007/978-3-031-93034-8_4)



73


74 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


**4.1** **Introduction**


This chapter focuses on a variation on missing event detection problems different from
prior works, motivated by the emerging deployment of multi-tagged RFID systems where
each object in the coverage is attached with multiple tags. In this chapter, we use filters to
mark a subset of the entire tags and conduct the marked tags to access the reader. The main
contributions of this chapter are articulated as follows.


- First, we provide an efficient solution to the missing event detection problem in multitagged RFID systems, named basic protocol. In the first phase, we leverage the Bloom
filter to represent the chosen tags so that they can pass the membership test while the
others are sifted out. A virtual Bloom filter is constructed from responses of the tags in
the second phase, enabling missing tag detection.

- Second, we design an advanced protocol that is more time efficient. Exploiting properties
of full knowledge of tags’ IDs and sparsity of slots mapped by the chosen tags compared
with the others, we propose a compressive filter that only needs one hashing operation
for a tag but can achieve better marking efficiency than the Bloom filter. A composite
vector built from multiple mappings of the marked tags is then used for the detection.

- Third, we investigate the performance of the proposed protocols both theoretically and
experimentally. We derive optimum parameters used in the protocols that minimize communication overhead under the constraint of required detection reliability. On the other
hand, extensive simulation results verify the effectiveness of both protocols on missing
event detection and show that the advanced protocol achieves a time efficiency gain of at
least 2x over the Bloom filter-based basic one.


**4.2** **Related Work**


Missing tag detection plays a crucial role in RFID-enabled applications since it can monitor
the state (normal or broken) of tags and quickly detect illegal movement of objects in
work regions such as misplacement and theft. The works on missing tag detection could be
separated into two categories: probabilistic [ 1, 2, 2– 7] or deterministic protocols [ 8– 10].

Probabilistic protocols detect a missing tag event with a predefined probability. Tan et
al. initiate the study of probabilistic detection and propose a solution called Trusted Reader
Protocol (TRP) in [ 1]. TRP detects a missing tag event by comparing the pre-computed slots
with those picked by the tags in the population. If an expected singleton slot turns out to be
an empty slot, then the missing event is detected. Follow-up works [ 2, 3] employ multiple
seeds to increase the probability of the singleton slot, which reduces the useless empty and
collision slots and thus achieves better performance. RUN [ 4] and BMTD [ 5] are proposed
to address the influence of unknown tags. Yu et al. [ 6] design a suit of detection protocols


4.3 System Model and Problem Formulation 75


for multi-categories and multi-region RFID systems and study how to detect missing tags
by using COTS RFID devices [ 7].

Deterministic protocols, on the other hand, are able to exactly identify which tags are
absent. Li et al. develop a series of deterministic protocols in [ 8] to reduce the radio collision
by reconciling collision slots and finally iron out a bit-level tag identification method by
iteratively deactivating the tags of which the presence has been verified. Subsequently,
Zhang et al. propose identification protocols in [ 9] which store and compare the bitmap of
tag responses in all rounds and observe the change among the corresponding bits among all
bitmaps to determine the present and absent tags. However, how to configure the protocol
parameters is not theoretically analyzed. More recently, Liu et al. [ 10] enhanced the work by
reconciling both 2-collision and 3-collision slots and filtering the empty and unreconcilable
collision slots to improve time efficiency.

We would like to emphasize that none of the prior works is designed to detect missing
events in a multi-tagged RFID system. In this scenario, all existing missing tag detection
protocols cannot work effectively, because they have to detect all tags whose IDs are recorded
in the reader, wasting too much time. In contrast, our work chooses a subset of these tags
for detection, avoiding repeated checks of one object and its interferences with the other
tags. Moreover, this chapter exploits tag knowability and slot sparsity jointly to improve
time efficiency, which completely differs our work from the existing ones.


**4.3** **System Model and Problem Formulation**


**4.3.1** **System Model**


We consider an RFID system of one reader [1] and a large number of tags where each physical
object is attached by multiple tags [ 12, 13]. The reader is connected via high-speed channels
with a back-end server of powerful computing capability. We regard the server and the
reader as a single entity called _the reader_ for simplicity [ 14, 15]. Generally, each tag has
a unique ID and user-defined memory to achieve storage of the user-defined data while
capable of performing certain computations like hashing functions. Moreover, we assume
that the reader has the IDs of all tags in the system.

The downlink (i.e., reader-to-tags) and uplink (i.e., tags-to-reader) communications experience different slot duration: (1) 96-bit downlink slot duration from the reader to tags; (2)
1-bit response slot from tags to the reader. We denote. _Tid_ and. _Tshort_ as the length of a downlink slot and response slot, respectively. For an arbitrate response slot, there are three types
of slot states. If no tag relies on this slot, it is called an empty slot; if a single tag replies,


1 For multiple readers, we can treat them as a single virtual reader as in [ 6, 11]. Specifically, the backend server calculates all the parameters constructs the filter vectors, and sends them to all readers such
that the readers broadcast the same parameters and filters to the tags. Consequently, the back-end
server can synchronize the readers and we can logically consider them as a whole.


76 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


it is called a singleton slot; if multiple tags respond simultaneously, it is called a collision
slot. The latter two states are referred to as non-empty slots.


**4.3.2** **Problem Formulation**


In this chapter, we are interested in detecting missing object events in a multi-tagged RFID
system where . _n_ tags monitor . _g_ objects, and each object is tagged by multiple tags, i.e.,

. _g_ _< n_ . Let . _ma_ denote the number of missing objects, a missing event denotes the event
that . _ma_ exceeds a threshold . _Ma_ . Let . _Pd_ define the probability that the reader can find
a missing event, we formulate the optimum missing event detection problem as follows:
_The missing multi-tagged object detection problem is to devise an algorithm of minimum_
_execution time to find a missing event with probability_ . _Pd_ ≥ _α when_ . _ma_ ≥ _Ma_, _where_ . _α is_
_the required detection reliability._ Given the required probability, the key performance metric
is communication overhead between the reader and tags spent in completing the detection
task. In this chapter, the communication overhead means the execution time.

We would like to emphasize the main difference between the problem in this chapter and
those in the prior works: In our problem, one missing object leads to multiple tags absent
from the interrogation of the reader. Instead, an object and its attached tag are injective in the
prior work. This difference makes the algorithm design in this chapter completely different,
which can be interpreted as follows: If a tag is absent from the interrogation of the reader, the
corresponding attached object can be regarded as missing in the prior work. This, however,
does not hold for the multi-tagged system here. In the new scenario, the reader learns a
missing object only when all its attached tags are absent. If we still use the prior algorithms
to deal with the new problem, all tags on an object would respond to the interrogation,
leading to severe interference and thus considerably degrading time efficiency.

Take an example to explain the difference. Consider .10 _,_ 000 objects, there will be then

.10 _,_ 000 tags detected by the reader in an injective RFID system. Yet, the number will soar
to .30 _,_ 000 in a multi-tagged system where each object is attached by 3 tags if the existing
algorithms are used, sharply increasing communication overhead. This urges us to investigate
the following problem: can we design detection algorithms that can achieve the required
detection reliability by interrogating only part of the tags in the system? We shall answer
this question later in this chapter with a comprehensive investigation. Table 4.1 summarizes
main notations used in the chapter.


**4.3.3** **Design Rational**


Recall the missing multi-tagged object detection problem, an object is missing if all of its
attached tags are absent, but the absence of one tag indicates the potential missing object.
Consequently, it is adequate to first probe one of the tags on an object instead of all for


4.3 System Model and Problem Formulation 77


**Table 4.1** Main parameter notation

|Symbols|Description|
|---|---|
|._GA_|Set of representative tags|
|._GB_|Set of pending tags|
|._n_|Number of tags in our system|
|._g_|Number of objects in our work region|
|._Pd_|Achieved detection probability|
|._α_|Requirement of detection probability|
|._ma_|Number of actual missing representative tags|
|._Ma_|Least number of missing representative tags to satisfy detection requirement|
|._ f_1|Length of ﬁlter in marking via bloom ﬁlter|
|._k_1|Number of mapping in marking via bloom ﬁlter|
|._Pf p_1|Probability of false positives in marking|
|._ f_2|Length of ﬁlter in detection via bloom ﬁlter|
|._k_2|Number of mapping in detection via bloom ﬁlter|
|._Pf p_2|Probability of false positives in detection|
|._λ_|Marking Efﬁciency in the advanced protocol|
|._ fd_|The response frame length in the second phase of the advanced protocol|



missing object event detection. If the probed tag is present, the tagged object must still be
located in the coverage of the RFID system and we do not need to interrogate the other
tags on this object, which reduces communication overhead. Otherwise, we would further
poll the Big tags on the object, and a missing object can be found if all of them are absent.
Since the percentage of missing objects is usually small, the idea above can improve time
efficiency.

Following the guideline, we randomly choose a tag from each object, which is referred
to as **representative tag** . Thes e . _g_ tags constitute the representative tag set defined as . _GA_ =
{ _tag_ 1 _, tag_ 2 _, ..., tagg_ } where . _tagi_ is a tag on the object . _i_ for .1 ≤ _i_ ≤ _g_ . The set of the
remaining tags named **pending tags** is denoted by. _GB_ . We then are interested in interrogating
the representative tags to detect potential missing object events. Yet the pending tags in

. _GB_ would cause severe interference to representative tag detection. Therefore, an efficient
scheme should be able to eliminate this negative impact.

In this chapter, we design two-phase protocols to address the problem: (1) Marking phase:
The task of Phase 1 is to mark the representative tags for further detection while depressing
the pending tags to abate their interference. The key to answering this question lies in
designing a filter that is able to filter out the pending tags while ensuring all representative tags
pass the test; (2) Detecting phase: The reader then conducts missing object event detection
in Phase 2 by interrogating the remaining tags after the execution of Phase 1. Therefore,


78 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


we should ensure the efficiency of the two phases so that the overall time cost can be
minimized. To this end, we propose two approaches. Note that a filter is an indicator vector
with a certain number of elements each being either ‘0’ or ‘1’, and a position in an offline built
filter corresponds to the slot in the same sequence of a frame during the online execution.

**Basic approach: Bloom filter-based algorithm.** Bloom filter is a space-efficient probabilistic data structure for representing a set and supporting set membership queries. Its
property can meet the design requirements analyzed above. Specifically, the reader first
constructs a bloom filter with the optimum parameters by encoding each tag in . _GA_ and
transmits parameters and the filter to all tags. On the tag side, each tag uses the hash functions and the received parameters to map itself to several positions in the received filter. If all
the value of these positions is ‘1’, the tag knows it is a representative tag and will participate
in the detection in Phase 2. Otherwise, the tag is a pending tag and should turn to sleep and
wait for the next activation command. This method is a direct application of a bloom filter
to achieve the marking task. After the marking phase, the reader detects missing tags by
constructing a virtual bloom filter from the responses of the active tags. Since the reader can
predict slot states, it can find a tag missing if there exists at least one of its mapped slots
which is supposed to be busy but turns out empty.

**Advanced approach: Compressive filter-based algorithm.** Bloom filter can effectively
complete the marking task, yet its performance is hindered by the tradeoff between filter
length (i.e., frame size) and false positive ratio that tags in . _GB_ are mistakenly marked with
a certain probability. Specifically, reducing the false positive ratio is at the price of a longer
filter. Especially, when.| _GB_ | is considerably larger than.| _GA_ |, we should accordingly increase
filter length to reduce the false positive ratio, and a higher false positive ratio leads to severe
interference to the representative tags, otherwise.

To tackle the drawback of the basic approach, we develop a new filter that only needs one
hash function rather than multiple ones in the Bloom filter but can achieve better performance.
First, the reader employs one hash function to construct a filter where all positions are
initialized to ‘0’ and only those mapped by tag(s) from . _GA_ are set to ‘1’. Such a filter can
mark tags in . _GA_ and ask them to participate the second phase. Second, to reduce the time
cost spent on the filter transmission, we explore the sparsity of ‘1’ in the filter to compress
its size.

Specifically, the elements ‘0’ in the filter are in the majority, and its proportion increases
with the filter size and the difference of. _GB_ and. _GA_ . Moreover, the filter performs as a binary
test, it is thus adequate to inform the tags of the positions of ‘1’ in the filter. Motivated by
these observations, we design such a compressive algorithm that consecutive zeros between
any two ‘1’ in the filter are replaced by a binary bit sequence of fixed size. It is required that
the denary value of the bit sequence is equal to the number of consecutive zeros, which can
be used to indicate the positions of ‘1’ in the original filter. Through the optimum parameter
configuration, the compressive filter can be significantly more complex than the original
one.


4.4 Basic Approach:Bloom Filter-Based Protocol 79


In the second phase, since a missing tag will be found when it is mapped to a singleton
slot, we aim to improve communication efficiency by changing non-singleton slots into
singleton slots. On the reader side, it first offline maps each representative tag independently
via different seeds and builds a composite vector by picking all singleton slots from the
multiple mapping. It then broadcasts parameters including the vector, its size, and the seeds.
At the tag side, each tag maps to one position of the vector using one seed and should respond
if finding the mapping slot is a singleton. From the responses of tags, the reader can check
whether a representative tag is missing and decide whether to poll the remaining tags in the
corresponding object to verify its existence.

In what follows, we elaborate on the basic approach and the advanced one in subsequence.


**4.4** **Basic Approach: Bloom Filter-Based Protocol**


In the basic approach, downlink and uplink bloom filters are built in the two phases for
missing event detection, respectively. In Phase 1, the reader first constructs a bloom filter to
mark representative tags by encoding each tag in. _GA_ according to the derived parameters and
transmits the parameters and the constructed bloom filter to tags. Tags conduct a membership
test by checking the value of its mapping positions in the received filter. The details of the
method will be described as follows. In Phase 2, the reader interrogates the remaining active
tags with another suit of the derived parameters. Each tag should reply in its mapping slots,
and a virtual bloom filter can be constructed from the responses of all tags at the reader side
for missing tag detection.


**4.4.1** **Protocol Description**


The basic protocol consists of two phases: The marking phase and the detection phase, as
described below.
_(1) Marking phase:_ In the beginning, the reader samples tags to participate in this process.
To achieve sampling probability of . _p_ 1, the reader broadcasts parameters of length . _fsample_,
seed. _ssample_ and threshold. _T h_ 1 = ⌈ _p_ 1 _fsample_ ⌉. Each tag hashes to.[0 _,_ _fsample)_ with. _ssample_ .
If the result is smaller than . _T h_ 1, it will take part in this process, and keep sleep, otherwise.

The rest of the first phase can be executed in multiple rounds, which is decided by the
parameter configuration to be discussed in Sect. 4.4.2. Recall that the objective of this phase
is to filter out the pending tags in . _GB_ . We consider the . _i_ th round mark of . _GA,_ 1 ≤ _i_ ≤ _R_ 1,
where . _R_ 1 is the number of executed rounds. Let . _Bi_ be the number of the still active pending
tags at the beginning of this round.

The Reader offline constructs a. _f_ 1-bit bloom filter. _BVi_ by mapping each tag ID in. _GA_ to. _k_ 1
positions under seed . _si_ and set their value to ‘1’. Then, the reader broadcasts the parameters
and . _BVi_ . Each unmarked tag uses the same parameters to map itself to . _k_ 1 positions as the


80 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


reader does. If the tag finds all the mapped . _k_ 1 bits in . _BVi_ are ones, it passes the filter and
waits for the detection in the second phase. Otherwise, it will keep asleep and cannot take
part in the rest of the protocol. The Bloom filter has no false negative, i.e., tags in . _GA_ must
pass the test, but it suffers from false positive: A tag in . _GB_ may also pass the check. We
denote by . _gi_ the number of the tags filtered out in this round. After all . _R_ 1 rounds, there will
be . _BR_ 1 - _gR_ 1 active tags in . _GB_ which will access to the second phase.
_(2) Detection phase:_ This phase aims to detect potential missing representative tags in . _GA_
with the presence of . _BR_ 1 - _gR_ 1 active tags of . _GB_ . Similar to the first phase, the reader also
first samples the remaining tags with a sampling probability of . _p_ 2 and threshold . _T h_ 2 =
⌈ _p_ 2 _fsample_ ⌉. The rest of the second phase is executed in multiple rounds, which is decided
by the parameter configuration to be discussed in Sect. 4.4.2.

Denote by. _R_ 2 the number of rounds in this phase. Consider an arbitrate round. _i_, different
from the first phase, a Bloom filter will be built from the responses of the tags, which is
used by the reader to check the existence of each tag. To this end, the reader broadcasts the
parameters including filter size . _f_ 2, the number of hush functions . _k_ 2, and seed . _s_ 2 [∗][. Each tag ]
then maps itself to . _k_ 2 slots and will reply in these slots. On the reader side, it can build a
bloom filter by setting positions corresponding to busy slots to ‘1’. As the reader knows all
IDs, it can predict every slot state and can thus detect a missing tag if there exists at least
one ‘0’ at its mapped . _k_ 2 positions.

Although there are false positives and the interference of some pending tags, we could
configure parameters used in the protocol so that the required detection reliability can be met
within the minimum communication overhead. The analysis will be introduced in Sect. 4.4.2.


**4.4.2** **Parameter Optimization**


The execution time of the basic protocol mainly consists of two parts: the communication
cost in the marking phase and that spent on the detection.
_(1)_ We start with the analysis of the first part. The execution time of the marking phase could
be expressed as

_Tid_
. _Tm_ = _Tm_ _ _ini_ + _f_ 1 _R_ 1 (4.1)

96 _[,]_

where . _Tm_ _ _ini_ is the constant time cost of the parameter transmission. The goal is thus to
minimize . _f_ 1 _R_ 1 _[T]_ 96 _[id]_ [. ]

It is known that the false positives of the bloom filter are




   -    . _P_ _f p_ 1 = 1 − 1 − _f_ [1] 1




- _k_ 1 _A_ [�] _k_ 1 - - _k_ 1
≈ 1 − _e_ [−] _[k]_ [1] _f_ 1 _[ A]_ _,_ (4.2)



where . _A_ = _Aorig p_ 1 is the number of tags passing the sampling in . _GA_, . _k_ 1 is the number of
hash functions and. _f_ 1 is the length of the Bloom filter (i.e., frame size). Consider an arbitrary
round, if the . _k_ 1 slots mapped by a tag in . _GB_ are the same as those in . _GA_, then it cannot be


4.4 Basic Approach:Bloom Filter-Based Protocol 81


filtered out in this round. The probability of this event is (4.2). Therefore, the probability
that a tag in . _GB_ remains active after the marking phase can be written as

               -                - _k_ 1 _R_ 1
. _P_ _f p_ _[R]_ [1] 1 [=] 1 − _e_ [−] _[k]_ [1] _f_ 1 _[ A]_ _,_ (4.3)



where . _R_ 1 is the number of executing rounds.



We calculate the first order of differential function and obtain the minimum value of. _P_ _f p_ _[R]_ [1] 1
is . _(_ 2 [1] _[)]_ _f_ 1 _A R_ 1 ln 2 ≈ 0 _._ 6185 _f_ 1 _A R_ 1 when . _k_ 1 = _[f]_ _A_ [1] [ln 2. Therefore, the key is to minimizing ] [.] _[ f]_ [1] _[R]_ [1][. ]

Due to the fact that a smaller. _f_ 1 _R_ 1 results in more active pending tags and more interferences
to the detection phase, we thus jointly minimize the cost with the second phase.
_(2)_ We define the cost of execution time in the detection phase as . _Td_



_f_ 1 _R_ 1

[1] _A_

2 _[)]_



_A R_ 1 ln 2 ≈ 0 _._ 6185 _f_ 1 _A R_ 1



1

_A_ when . _k_ 1 = _[f]_ [1]



. _Td_ = _Td_ _ _ini_ + _f_ 2 _R_ 2 _Tshort_ _._ (4.4)


Similarly, we should minimize . _f_ 2 _R_ 2 for time cost optimization with the constraint of the
detection reliability. To this end, we first calculate the probability of false positives in the
detection phase, as expressed in the below:


               -               - _k_ 2 _R_ 2
. _P_ _f p_ _[R]_ [2] 2 [=] 1 − _e_ [−] _[k]_ [2] _f_ _[ A]_ 2 [′] _,_ (4.5)


where. _f_ 2 is the frame length,. _k_ 2 is the number of mappings (i.e., the number of hash functions)
in a frame, and . _A_ [′] is the number of tags responding to the interrogation. Denote by . _Ar_ the
number of the remaining tags after the first phase and . _m_ is the number of missing tags, then

. _A_ [′] = _(Ar_ - _m)_ _p_ 2. Similar with . _P_ _f p_ _[R]_ [1] 1 [, we have the minimum][ .] _[P][ R]_ _f p_ [2] 2 [: ]



_f_ 2 _R_ 2

. _P_ _f p_ _[R]_ [2] 2 [=][ 0] _[.]_ [6185] _A_ ~~[′]~~ _._ (4.6)



We denote by . _Pd_ the probability that a missing event could be detected in . _GA_ . As we
should detect the missing event when . _ma_ ≥ _Ma_, . _Pd_ could be derived as


. _Pd_ = 1 −[1 − _p_ 1 + _p_ 1 _(_ 1 − _p_ 2 + _p_ 2 _P_ _f p_ _[R]_ [2] 2 _[)]_ []] _[M][a]_ _[,]_ (4.7)


where . _p_ 1, . _p_ 2 are sampling ratios in the two phases, respectively. In order to meet system
requirement in detection, . _Pd_ should be greater than . _α_, then we have



1
_(_ 1− _α)_ _Ma_ + _p_ 1−1



. _P_ _f p_ _[R]_ [2] 2 [≤]



_p_ 1 1 + _p_ 2 − 1



_._ (4.8)
_p_ 2



It is required that

1
. _p_ 1 _p_ 2 _>_ 1 − _(_ 1 − _α)_ _Ma_ _._ (4.9)


As it is adequate to set . _Pd_ = _α_, we have


82 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems



ln - _(_ 1 − _α)_ _Ma_ 1 + _p_ 1 - 1 + _p_ 2 − 1� - ln _(_ _p_ 2 _)_

_p_ 1




 - _(_ 1 − _α)_ _Ma_ 1 + _p_ 1  - 1
ln







_._ (4.10)



′
_A_
. _f_ 2 _R_ 2 =

   - _(_ ln _(_ 2 _))_ [2] [·]







Recall that . _A_ [′] is the number of tags responding to the interrogation including partial tags
of . _GA_ and a few of . _GB_, as it is enough to find missing tags when . _ma_ ≥ _Ma_, we can rewrite

. _A_ [′] for the parameter settings as


′
1
. _A_ = _(A_ + _B P Rf p_ 1 [−] _[M][a][)]_ _[p]_ [2] _[,]_ (4.11)


where . _B_ = _B_ 1 = _Borig p_ 1. Substituting (4.6) and (4.11) into (4.10), we have



1 
_pa_ 1+ _p_ 1−1 + _p_ 2 − 1 - ln _(_ _p_ 2 _)_




    
_R_ 1

_A_ - _Ma_ _p_ 2 _._ (4.12)




    - 1
ln _(_ 1− _α)_ _Mpa_ 1+ _p_ 1−1
. _f_ 2 _R_ 2 =



1 + _p_ 2 − 1 - ln _(_ _p_ 2 _)_ - _f_ 1 _R_ 1

                   - _A_ + _B_ 0 _._ 6185 _A_

- _(_ ln _(_ 2 _))_ [2]



(3) From (4.12), we can observe that. _Td_ increases with the decrease of. _f_ 1 _R_ 1 that is determined
by the first phase. Define the overall time cost of the basic protocol as . _Twhole_, we ha ve


_Tid_
. _Twhole_ = _Tm_ _ _ini_ + _Td_ _ _ini_ + _f_ 1 _R_ 1 _[f]_ [2] _[R]_ [2] _[T][short]_ _[.]_ (4.13)

96 [+]


Since . _Tg_ _ _ini_ and . _Td_ _ _ini_ are constants and too small compared with the other parts. Hence,
we ignore them in the subsequent optimization. The overall cost is simplified as



_Tid_
. _T_ [ˆ] = _f_ 1 _R_ 1




_[f]_ [2] _[R]_ [2] _[T][short]_
96 [+]




  - 1
= ln _(_ 1− _α)_ _Mpa_ 1 + _p_ 1−1



1 
_pa_ 1 + _p_ 1−1 + _p_ 2 − 1 - ln _(_ _p_ 2 _)_




    
_R_ 1

_A_ - _Ma_ _p_ 2 + _[T][id]_



1 + _p_ 2 − 1 - ln _(_ _p_ 2 _)_ - _f_ 1 _R_ 1

- _(_ ln _(_ 2 _))_ [2] _Tshort_ - _A_ + _B_ 0 _._ 6185 _A_



96 _[f]_ [1] _[R]_ [1] _[.]_ [(4.14) ]



Denote . _u_ = _f_ 1 _R_ 1, we derive the differential of . _T_ [ˆ] with . _u_ :




   -    - _(_ 1 − _α)_ _Ma_ 1 + _p_ 1    - 1

_[∂][T]_ [ˆ] ln

_∂u_ [=] _p_ 1




[6185] _A_

+ _[T][id]_
_A_ 96



96 _[.]_



. _[∂][T]_ [ˆ]



+ _p_ 1 - 1 + _p_ 2 − 1� - ln _(_ _p_ 2 _)_ - _Tshort_ - _[Bp]_ [2][0] _[.]_ [6185] _uA_

_p_ 1 _A_



Let . _[∂]_ _∂_ _[T]_ _u_ [ˆ] [=][ 0, we could get the minimum overall when ]



_A_
. _u_ = − ~~�~~ ~~�~~ 2 [×][ ln]
ln 2



⎛

⎜⎜⎜⎜⎝



_Tshort Bp_ 2



(4.15)


⎞


_._ (4.16)
⎟⎟⎟⎟⎠




~~�~~




- _[T][id]_



1 
_pa_ 1+ _p_ 1−1 + _p_ 2 − 1 - ln _p_ 2




_[id]_

96 _[A]_




~~�~~




 - 1
ln _(_ 1− _α)_ _Ma_ + _p_ 1−1


4.5 Advanced Approach:Compressive Filter-Based Protocol 83


_Parameter configuration:_ Given the sampling ratios . _p_ 1 and . _p_ 2 meeting (4.9), the value
of . _f_ 1 and . _R_ 1 can be chosen so that (4.16) holds. Once they are fixed, we can get . _f_ 2 and . _R_ 2
following (4.12). Finally, the optimal parameters can be configured for the basic protocol.


**4.5** **Advanced Approach: Compressive Filter-Based Protocol**


Bloom filter can effectively complete the marking task, yet its performance is hindered by
the tradeoff between filter length (i.e., frame size) and false positive ratio that tags in . _GB_ are
mistakenly marked with a certain probability. Specifically, reducing the false positive ratio
is at the price of a longer filter. Especially, when .| _GB_ | is considerably larger than .| _GA_ |, we
should accordingly increase filter length to reduce the false positive ratio, and a higher false
positive ratio leads to severe interference to the representative tags, o therwise.

To tackle the drawback of the basic protocol, we develop an advanced protocol containing
a new filter for the marking phase that only needs one hash function rather than multiple
in Bloom filter but can achieve better marking performance, and a composite filter picking
all singleton slots from multiple mappings. _The improvement in the first phase results from_
_two aspects: The knowledge of IDs of all tags, and the sparsity of the original vector._ The
first one enables the reader to encode the mappings of both representative and pending tags
instead of only the former in the basic protocol, making the filter more informative. The
second one makes compression of the filter possible reducing communication costs.


**4.5.1** **Protocol Description**


The advanced protocol also consists of two phases: The marking phase and the detection
phase. In the first phase, we use one hash function to encode mappings of all tags and exploit
the sparsity of ‘1’ to build a compressive filter to mark representative tags. In the second
phase, we pick singleton slots from multiple random mappings of a tag to build a composite
filter informing a remaining active tag after the first phase of its response slot and conduct
the detection. Note that the position of a filter and a slot of a frame is injective.


_(1) Marking phase:_ In the marking phase, the reader first samples the tags with ratio of

. _p_ 1. Then, the marking phase works in multiple rounds. Consider an arbitrary round . _i_, the
reader offline employs one hash function to encode all unmarked tags to a n . _fi_ -bit vector
where all positions are initialized to ‘0’. Since the reader knows IDs of all tags, it can predict
A-homogeneous positions that are mapped only by tag(s) of . _GA_, B-homogeneous positions
that are mapped only by tag(s) of . _GB_, heterogeneous positions that are mapped by tags of

. _GA_ and . _GB_, and empty positions. Consequently, the reader only sets the A-homogeneous
positions of the vector to ‘1’ instead of both homogeneous and heterogeneous positions in


84 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


**Fig. 4.1** An illustration of a compressive filter and the checking process at tag side


the basic protocol. Note that a position in an offline built vector corresponds to the slot in
the same sequence of a frame during the online execution.

Let’s take Fig. 4.1a as a toy example. The 1st position is heterogeneous because it is
mapped by tag 1 in set. _GA_ and tag 4 in set. _GB_ . The 21st position is also set to 0 since it is a Bhomogeneous position mapped by tag 6 and tag 8 of set. _GB_ . On the contrary, the 6th and 22nd
positions are A-homogeneous since they are mapped by tags in group. _GA_ . Following the rule,
we can build the original vector as ‘0000_0100_0000_0000_0000_0110_0000_0000_000’.

After the original vector is built, we start to compress it, which is motivated by the
sparsity of ‘1’ as shown in Fig. 4.1a. We exploit the distance between two ‘1’ to indicate the
positions of ‘1’ in the vector. Because the distance is usually short, the vector length can be
significantly reduced. Specifically, the reader replaces each segment of consecutive zeros
between ‘1’ by the number of consecutive zeros in this segment. To this end, the reader
first finds the longest segment of consecutive zeros in the original vector and records the
length of zeros as . _Li_ _[max]_ . Second, each segment of consecutive zeros is converted to a binary � 
sequence of . _li_ = ⌈log2 _Li_ _[max]_ + 1 ⌉ bits whose decimal value is equal to the number of
consecutive zeros, and the compressive filter is finally constructed. If the compressive filter
is longer than 96 bits, the reader can divide it into parts and transmit each part in . _Tid_ .


4.5 Advanced Approach:Compressive Filter-Based Protocol 85


For instance in Fig. 4.1a, the longest segment of 15 zeros is converted to the number 15,
which is compressed from 15 bits to 4 bits, and the other segments are also represented as
4-bit sequences. Consequently, the reader can get a 12-bit compressive filter compressed
from the 35-bit original vector. The compression ratio is .12 _/_ 35 ≈ 0 _._ 34.

The reader then broadcasts parameters including original vector size. _fi_, the segment size

. _li_, and seed . _si_ . We will analyze how to set the parameters in Sect. 4.5.2. The reader also
sends the compressive filter to tags. At the tag side, after receiving the filter, it calculates
the decimal value of each . _li_ -bit segment starting from the head of the filter and outputs the
same number of consecutive zeros. Repeat this for all segments, a tag can learn all positions
of value ‘1’ among .[1 _,_ _f j_ ]. It then can directly check from the compressed filter whether
it is a representative tag. Specifically, the tag hashes itself to a slot among .[1 _,_ _f j_ ]. It then
subtracts the sum shown in Fig. 4.1b from its hash value until the result is non-positive.
It can be marked as a representative tag if the result is zero. Otherwise, it waits for the
following marking round. Note that it means two consecutive ‘1’ that the decimal value of a
compressed segment is 0. Moreover, the length of the reconstructed vector may be smaller
than . _fi_ because the consecutive zeros at the end of the original vector are omitted to save
time cost. The tag just needs to fill with several zeros at the end of the reconstructed vector
to reach . _fi_ . After multi-round execution, all sampled representative tags can be marked and
access the detection phase, while the others keep silent.

Let’s take Fig. 4.1b as an example to illustrate the decompression process at the tag side.
From the received compressive filter, tag 3 can learn that there are 5 zeros until the first ’1’,
matching with its mapping, it can thus be marked. In contrast, tag 6 mapped to the 21st slot
finds the value at the 21st position of the original vector is ‘0’, which can be inferred from
15 zeros between the 1st and 2nd ‘1’. It thus knows that it should keep silent in the rest of
the protocol.
_(2) Detection phase:_ In this phase, the reader first samples the tags marked in the first
phase with the ratio of . _p_ 2. The reader then constructs a composite vector from multiple

�mappings of the sampled tags. Define the composite vector length as� . _fd_ and seed sequence

. _s_ 1 _, s_ 2 _, ..., sl_ . We will analyze how to set the parameters in Sect. 4.5.2. The reader maps a

tag to . _H_ _(id, s j_ _,_ _fd_ _)_ th position of the . _j_ th vector in the . _j_ th mapping where .1 ≤ _j_ ≤ _l_ . Afte r

. _l_ mappings of all tags, the reader can obtain . _l_ vectors and use them to composite a vector
storing indexes of seeds that contribute to singleton slots. Specifically, the . _fd_ -bit composite
vector is initialized to null. For each of its positions . _i_, the reader picks a seed that makes
one of the . _i_ th positions in the obtained . _l_ vectors singleton, for example, . _s j_, and sets the . _i_ th
position in the composite vector to . _j_ . Repeating these operations for all . _fd_ positions, the
reader can obtain the expected composite vector.

After the offline construction of the composite vector, the reader broadcasts the vector �   length . _fd_, seed sequence . _s_ 1 _, s_ 2 _, ..., sl_ and the composite vector. And the reader sends

another interrogation command to ask the qualified tag to respond, subsequently. At the tag
side, for each slot, each tag uses a seed to map itself to a position of the vector and checks
whether the sequence of the position in the vector is equal to the slot in the frame and whether


86 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


the seed index in this position of the vector is equal to the seed used in this mapping. If both
of them hold, the tag will respond in this slot. Otherwise, it uses another seed and repeats
the above operations. On the reader side, the reader can compare the observed slot states
with the predicted ones. It can detect a missing tag if a predicted singleton slot turns out to
be empty.


**4.5.2** **Parameter Setting**


We here introduce how to set parameters so that the detection reliability can be met and the
communication cost can be minimized. To make the analysis feasible, we separately analyze
the communication cost of the two phases.


_(1) Optimum parameters for the marking phase:_ In an arbitrary round . _i_ of this phase, the
objective is to maximize the marking efficiency . _λi_ : The ratio of the number . _φi_ of sampled
representative tags in . _GA_ marked in this round to the execution time . _ti_ of this round. It
implies that more tags can be marked in a unit of time when . _λ_ increases. Let . _fi_ _[c]_ [define the ]
compressive filter length in this round, we have


_φi_

. _λi_ = _[φ]_ _ti_ _[i]_ = _fi_ _[c]_ _._ (4.17)

96 _[T][id]_

As . _φi_ and . _fi_ _[c]_ [depend on][ . ] _[f][i]_ [, the key is to find the optimum][ . ] _[f][i]_ [. ]
Let . _ni_ be the number of sampled representative tags unmarked at the beginning of the
round, and when all sampled representative tags are marked after . _I_ rounds, . _n_ _I_ equals to the
′
number of sampled pending tags in . _GB_ in this phase. Denote by . _φi_ [the number of sampled ]
representative tags unmarked at the beginning of the round, we have


. _ni_ +1 = _ni_                                                                                                  - _φi_ _,_


′ ′
_φi_ +1 [=] _[ φ]_ _i_ [−] _[φ][i]_ _[.]_ (4.18)


Since the protocol is probabilistic, we derive the expected value of . _φi_, and the result is
stated in the following lemma.


**Lemma 4** _Given the original vector size_ . _fi at the_ . _ith round, the expected number of sampled_
_representative tags marked in this round should be_




   ′
. _φi_ = _φi_ 1 − [1] _fi_




- _ni_ - _φi_ ′
_._ (4.19)



_**Proof**_ We first study the event that . _j_ sampled representative tags are mapped to the same
slot. Its probability, defined as . _PA_ _[i]_ [, consists of there parts: The probability of an arbitrary]


4.5 Advanced Approach:Compressive Filter-Based Protocol 87



slot mapped by . _j_ tags which is . _(_ [1]




[1]

_fi_ _[)][ j]_ _[(]_ [1][ −] [1] _fi_




[1]

_fi_ _[)][n][i]_ [−] _[j]_ [, an d][ .]




- _ni_
_j_ kinds of combination of . _j_ tags,



and the probability of . _j_ tags being representative tags which is equal to . _GA_ is .� _φji_ ′ - _/_ - _nji_ �. It

thus holds that



and the probability of . _j_ tags being representative tags which is equal to . _GA_ is .




- _j_ 1 − [1]

_fi_




  - ′
_φi_
. _PA_ _[i]_ [=]
_j_



��
1
_fi_




- _j_ 1 − [1]




- _ni_ - _j_
_._ (4.20)



Hence, the expected number of sampled tags in group. _GA_ mapped to a slot is. [�] _[φ]_ _j_ = _i_ ′ 0 _[j]_ - _φji_ ′ 



1
_fi_



_fi_




- 1 - _j_ - - _ni_ - _j_
_fi_ 1 − [1] _fi_, and the number of the sampled tags in group . _GA_ marked by the com
pressive vector could be written as




- _j_ 1 − [1]




- _j_ 1 − [1]

_fi_




- _ni_ - _j_
_._



. _φi_ = _fi_



′

- _φi_ _j_ - _φi_ ′

_j_
_j_ =0



��
1
_fi_



After algebraic operations, the lemma can be proven.


From the construction of the compressive filter, we can find the following relation between

. _fi_ _[c]_ [and][ . ] _[f][i]_



⎛



. _fi_ _[c]_ [=] _[f][i]_ _[(]_ [1][ −] [1]



′

[1] _)_ _[n][i]_ [−] _[φ]_ _i (_ 1 − _(_ 1 − [1]

_fi_ _fi_



′

[1] _fi_ _)_ _[φ]_ _i )_ × log2



+ 1

[1] _i )_

_fi_ _[)][φ]_ [′]



1
⎝



_(_ 1 − [1]




[1] _fi_ _[)][n][i]_ [−] _[φ]_ _i_ [′] _(_ 1 − _(_ 1 − [1] _f_



⎞


⎠ _,_



(4.21)


where the multiplicators at the two sides of the multiplication sign are the expected number of
A-homogeneous positions and the average length of consecutive zeros in the original vector,
′
i.e.,. _li_, respectively. The relation among. _ni_,. _φi_ and. _φi_ [also satisfies (][4.18][). Substituting (][4.21][) ]
into (4.17), we can approximately have



log2



. _λi_ = [96]

_Tid_



_fi_




~~�~~



′
_φi_

  1 − 1 − [1] _fi_



1

~~�~~ × ~~⎛~~

- _φi_ [′]



~~⎛~~



_._ (4.22)




~~�~~ [+][ 1]

[1] _i_

_fi_ _[)][φ]_ [′]



~~⎞~~

⎟⎠



1
⎜⎝ �1− [1] - _ni_ - _φi_ [′] ~~�~~



_fi_




- _ni_ - _φi_ [′] ~~�~~ 1− _(_ 1− [1]



To accelerate the mark phase, we should select an optimum. _fi_ that maximizes the marking
efficiency . _λi_ . To this end, we conduct theoretical analysis and provide a upper bound for
the optimum . _fi_, which is stated in the following theorem.


**Theorem 6** _Given_ . _ni_ _and_ . _φi_ [′] _[that are known at the beginning of round ]_ [. ] _[i, the optimum ]_ [. ] _[f][i]_

_ni_ [2]
_falls in_ .[1 _,_
_ni_ −0 _._ 5 _φi_ [′] []] _[.]_


88 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems



_**Proof**_ As it is unfeasible to directly derive optimum . _fi_ from (4.22), we derive an upper
bound of . _fi_ and prove that . _λi_ is a decreasing function with respect to . _fi_ when . _fi_ exceeds
this upper bound. As a result, the optimum . _fi_ maximizing . _λi_ can be found between 1 and
this upper bound.




[1] _fi_ _[)][φ]_ _i_ [′] . We can write



Let . _b_ = 1 − _(_ 1 − [1]



. [1]




     1
96 _[T][id]_ _φi_ [′] _fi_ _b_ log 1 +



. [1] = _[T][id]_

_λi_ 96 _φ_



_(_ 1 − _b)_




_._



_ni_ −1
_φi_ ~~[′]~~ _b_



1
We can check that .



_ni_ −1
_φi_ ~~[′]~~ _b_




                  _i_
is decreasing in . _b_ for .0 ≤ _b_ ≤ _[φ]_ _ni_ [′] [. Hence ] [. ][log] 1 +



_(_ 1− _b)_



1



_ni_ −1
_φi_ ~~[′]~~ _b_




- _(_ 1− _b)_ _i_ _b_
is decreasing in . _b_ . Note that it easy to check that . _b_ also decreases with . _fi_,



_(_ 1− _b)_



_(_ 1− _b_ - _)_ _i_ _b_

1
.log 1 +



_ni_ −1
_φi_ ~~[′]~~ _b_




is thus increasing in . _fi_ . On the other hand, regard . _y_ = _fi_ _b_ as a func


_(_ 1− _b)_



tion of . _fi_, we can derive that


          _f_                           - 1
. _y_ [′] = 1 −
_f_




- _φi_ ′ [�] 1 + _φi_ [′]
_fi_         - 1





_>_ 0 _._ (4.23)



_i_

Therefore,. _λ_ [1] _i_ [is increasing in][.] _[ f][i]_ [ when][.][0][ ≤] _[b]_ [ ≤] _[φ]_ _ni_ [′] [. To establish the inequalities,][.] _[ f][i]_ [ should ]

satisfy that



1
. _fi_ ≥

1 − _(_ 1 − _[φ]_ _nii_ [′] _[)]_



1 _._ (4.24)
_φi_ ~~[′]~~



By applying Taylor series .1 − _zx_ _< (_ 1 − _x)_ _[z]_ _<_ 1 − _zx_ + 0 _._ 5 _zx_ [2], we ha ve




       
[−] [0] _[.]_ [5] _[φ]_ _i_ [′] _i_
. _[n][i]_ _<_ 1 − 1 − _[φ]_ [′]
_ni_ [2] _ni_




- 1
_φi_ ~~[′]~~ _<_ [1] _._

_ni_



_λ_ [1] _i_ [is increasing in ] [.] _[ f][i]_ [for ] [.] _[ f][i]_ [≥] _ni_ - _n_ 0 _i_ [2] _._ 5 _φi_ [′] [. Conse-]



Hence it is adequate to guarantee that . [1]



_ni_ [2]
quently,. _λi_ is decreasing when. _fi_ ≥ _ni_ −0 _._ 5 _φi_ [′] [. It thus suffices to search][.] _[ f][i]_ [to find its optimum ]
value until . _λi_ starts to decrease. The theorem follows from here.


4.5 Advanced Approach:Compressive Filter-Based Protocol 89


**Fig. 4.2** An illustration of properties of marking phase . _λi_ vs. original vector size . _fi_


To understand the properties of . _λi_, we depict its numerical results with . _T_ [96] _id_ [omitted in ]

Fig. 4.2 under diverse . _ni_ and . _φi_ [′] [. It can be observed that there exists an optimum ] [.] _[ f][i]_ [maxi-]
mizing . _λi_, which matches with the analysis stated in Theorem 6.


_(2) Optimum parameters for the detection phase:_ The execution time in this phase is mainly
spent on the composite vector transmission and the tags’ responses. It is written as

               -               _fd_ ⌈log2 _l_ + 1 ⌉
. _Td_ = _Tid_ + _fd_ _Tshort_ _._ (4.25)

96


Our goal is to minimize . _f_ with the constraint of the detection reliability requirement.
We first derive the detection probability of our approach. Let . _n A_ define the number of the
representative tags marked in the first phase, and . _p_ 2 be the sampling ratio in the second
phase. Then the probability . _Pj_ _(_ _p_ 2 _)_ that . _j_ marked representative tags are sampled in the
detection could be expressed as


90 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems




   _n A_
. _Pj_ _(_ _p_ 2 _)_ =
_j_




- _p_ 2 _[j]_ �1 − _p_ 2� _n A_ - _j_ _._ (4.26)



We then recursively derive the probability that an arbitrary slot is singleton after . _l_ mappings given a . _j_ :



��
1 − [1]

_fd_




      -       - [�]
_j_                        - _rl_ −1
. _Psl_ = _Psl_ −1 + 1 − _Psl_ −1
1



��
1
_fd_




- _j_ - _rl_ −1−1



_rl_ = ⌊ _fd Psl_ ⌋ _._ (4.27)


Thus, the probability that an arbitrary slot is singleton in our protocol after . _l_ mapping is



. _Pl_ =




- _n A_

_Pj_ _(_ _p_ 2 _)Psl_ _._ (4.28)
_j_ =0



Since an arbitrary tag is mapped to a singleton slot with the probability of . _[f]_ _n_ _[d]_ _A_ _[ P][l]_ [,] [ the]

missing event detection probability in the advanced protocol can be approximately derived
as



�� _Ma_ = 1 − 1 − _[f][d][ P][l]_ _[(]_ _[p]_ [2] _[)]_

| _GA_ |




- _Ma_
_._ (4.29)




    . _Pd_ = 1 − 1 − _p_ 1 + _p_ 1




1 − _[f][d][ P][l]_ _[(]_ _[p]_ [2] _[)]_

_n A_



Note that . _Ma_ is a given threshold. Consequently, we should pick . _fd_ and . _p_ 2 so that . _Pd_ ≥ _α_ .

To this end, we could fix the value of . _p_ 2 and . _Pd_ _(_ _p_ 2 _,_ _fd_ _)_ is degraded into a function of

. _fd_ . Our goal is then turned to minimize. _fd_ with . _Pd_ _(_ _p_ 2 _,_ _fd_ _)_ ≥ _α_ . After getting the optimum

. _fd_ for a given . _p_ 2, we start to introduce how to select . _p_ 2. When the sampling probability
is too small to satisfy . _Pd_ _(_ _p_ 2 _,_ _fd_ _)_ ≥ _α_, we cannot find suitable . _fd_ . Hence we could set
an upper bound for . _fd_ . I f . _Pd_ _(_ _p_ 2 _,_ _fd_ _) < α_ when . _fd_ is greater than the upper bound, we
should increase the sampling probability . _p_ 2 to do another search. Finally, we could find the
minimum sampling probability . _pmin_ that just satisfies the requirement. Then we will search
the minimum . _fd_ in . _pmin_ ≤ _p_ 2 ≤ 1.

Now, we will discuss the influence of the value of multiple mapping. Fixing . _fd_ while
increasing . _l_, we observe that the improvement shrinks rapidly from . _l_ = 7 to . 15, since a
bigger . _l_ would increase execution time according to (4.25). Therefore, we can search for
the optimal value of . _l_ .


**4.6** **Performance Evaluation**


In this section, we evaluate the performance of the proposed basic and advanced protocols in
terms of detection probability and execution time in multi-tagged RFID systems. The timing
parameters in the simulation follow the EPC-global Gen2 standard. Specifically, any two
consecutive communications between the reader and tags are separated by a blank interval


4.6 Performance Evaluation 91


lasting for 266.4. _μs_ . The transmission rate is 40.97kb/s when a response slot. _Tshort_ is 290.81

. _μs_ and a 96-bit slot . _Tid_ is 2609.76 . _μs_, which includes a blank interval. The parameters like
the filter and vector size are set according to the theoretical analysis. In the simulation,
we verify the effectiveness of the two protocols in addressing the missing event detection
problem, where the results are obtained from 1000 independent runs. We also investigate
the impacts of system scale and the number of tags on one object on their performance.

**Performance Verification:** We here verify the effectiveness and the efficiency of the
proposed protocols under three scenarios. In the simulation, the threshold of missing objects
is set to . _Ma_ = 2, and the required detection reliability varies from . _α_ = 95%, t o . _α_ = 99%
and to . _α_ = 99 _._ 9% in the first two scenarios and is fixed to . _α_ = 95% in the third scenario.
(1) In the first scenario, there exist 10 tags on each object and the number of overall tags
varies from.1000 to.5000. The simulation results of detection probability and execution time
are depicted in Figs. 4.3 and 4.4. The results show that both the bloom filter-based basic
protocol and the compressive filter-based advanced one can meet the detection reliability
requirement and they spend more time detecting a missing event as the number of overall tags
increases. This can be interpreted as follows: As the number of objects increases, there are
more representative tags that need to be marked and detected, leading to a longer execution
time.

We can also observe that the advanced protocol needs significantly less time to detect
missing events than the basic one under the same required detection reliability. As shown in
Fig. 4.4c, when the number of total tags is .5000, the execution time of the basic protocol is

.1 _._ 24 _s_ while the advanced protocol spends .0 _._ 38 _s_ which is 3x faster than the basic protocol.

(2) In the second scenario, we study how the number of tags on one object influences
detection probability and execution time. To this end, we set the total number of tags in the
system to .1000 and vary the number of tags in each object . _A_ from 2 to 10. From the results
recorded in Figs. 4.5 and 4.6, we can draw similar conclusions to those in the first scenario
that both protocols can complete the detection task with the required reliability satisfied, and
the advanced protocol is more time-efficient. In addition, the performance gain in terms of
the execution time of the advanced protocol is at least 2x, and reaches 4x when the required
detection reliability is .99 _._ 9% and there are two tags on each object, as shown in Fig. 4.6c.
(3) In the third scenario, we focus on the time efficiency of the two protocols in large-scale
systems, which is one of the most important metrics in RFID-enabled applications. The
experiment consists of two cases: The number of tags on each object is fixed to 10 and
the number of total tags varies from 5000 to 30000 in the first case; in contrast, we set the
number of total tags to 30000 but change the number of tags on each object from . 2 to .10 in
the second case.

Figure 4.7a illustrates the impact of system scale on the execution time in the first case. We
can observe that the two protocols experience longer execution times as the system scales up.
However, the advanced protocol performs better. Figure 4.7b records the simulation results


92 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


**Fig. 4.3** The achieved
detection probability with the
number of total tags varied
from 1000 to 5000 when the
threshold of missing objects is

. _Ma_ = 2 and the required
detection probability is
**a** . _α_ = 95%, **b** . _α_ = 99% and
**c** . _α_ = 99 _._ 9%


4.6 Performance Evaluation 93


**Fig. 4.4** The execution time
with the number of total tags
varied from 1000 to 5000 when
the threshold of missing
objects is . _Ma_ = 2 and the
required detection reliability is
**a** . _α_ = 95%, **b** . _α_ = 99% and
**c** . _α_ = 99 _._ 9%


94 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


**Fig. 4.5** The detection
probability with the number of
tags on each object varied from
2 to 10 when the number of
total tags is set to .1000, the
number of missing objects is

. _Ma_ = 2 and the required
detection probability is **a**

. _α_ = 95%, **b** . _α_ = 99% and
**c** . _α_ = 99 _._ 9%


4.6 Performance Evaluation 95


**Fig. 4.6** The execution time
with the number of tags on each
object varied from 2 to 10 when
the number of total tags is set
to .1000, the number of missing
objects is . _Ma_ = 2 and the
required detection probability
is **a** . _α_ = 95%, **b** . _α_ = 99% and
**c** . _α_ = 99 _._ 9%


96 4 Compact Filter-Based Access Protocol for Multi-Tagged RFID Systems


**Fig.4.7** **a** The execution time with the number of tags varied from 5000 to 30000 when each object is
attached by 10 tags and the required detection probability is. _α_ = 95%. **b** The execution time with the
number of tags on each object varied from 2 to 10 when the number of total tags is .30000, required
detection probability is . _α_ = 95%


in the second case, which also confirms the superiority of the advanced protocol to the basic
one. Moreover, It can be observed from the two figures that the advanced protocol achieves
at least 2x performance gain.


**4.7** **Conclusion**


This chapter has addressed a variation on the missing event detection problem arising from
multi-tagged RFID systems where each object is tagged by multiple tags. Application of prior
works to the new problem suffers low time efficiency due to repeated checks of one object.
To overcome this drawback, we have provided two solutions, namely the basic protocol and
the advanced protocol. The former uses the Bloom filter to ask a subset of tags in the system
to report their presence. The latter exploits the knowability of each tag mapping and sparsity
of slots mapped only by tag(s) of the chosen subset to build a compact compressive filter and
a composite vector from multiple mappings of each tag. We have also derived the optimum
parameters used in the protocols and conducted extensive simulations. The results confirm
the effectiveness of the protocols and the superiority of the advanced protocol in terms of
time efficiency under required detection reliability.


References 97


**References**


1. C. C. Tan, B. Sheng, Q. Li, How to monitor for missing rfid tags, in _IEEE ICDCS_ (2008),
pp. 295–302
2. W. Luo, S. Chen, T. Li, Y. Qiao, Probabilistic missing-tag detection and energy-time tradeoff in
large-scale rfid systems, in _ACM MobiHoc_ (2012), pp. 95–104
3. W. Luo, S. Chen, Y. Qiao, T. Li, Missing-tag detection and energy-time tradeoff in large-scale
rfid systems with unreliable channels. IEEE/ACM ToN **22** (4), 1079–1091 (2014)
4. M. Shahzad, A. X. Liu, Expecting the unexpected: Fast and reliable detection of missing rfid
tags in the wild, in _IEEE INFOCOM_ (2015), pp. 1939–1947
5. J. Yu, L. Chen, R. Zhang, K. Wang, Finding needles in a haystack: Missing tag detection in large
rfid systems. IEEE TCOM **65** (5), 2036–2047 (2017)
6. J. Yu, L. Chen, R. Zhang, K. Wang, On missing tag detection in multiple-group multiple-region
rfid systems. IEEE TMC **16** (5), 1371–1381 (2016)
7. J. Yu, W. Gong, J. Liu, L. Chen, K. Wang, R. Zhang, Missing tag identification in cots rfid
systems: Bridging the gap between theory and practice, _IEEE TMC_ (2018)
8. T. Li, S. Chen, Y. Ling, Identifying the missing tags in a large rfid system, in _Proceedings of the_
_eleventh ACM international symposium on Mobile ad hoc networking and computing_ (ACM,
2010), pp. 1–10
9. R. Zhang, Y. Liu, Y. Zhang, J. Sun, Fast identification of the missing tags in a large rfid system,
in _2011 8th Annual IEEE Communications Society Conference on Sensor, Mesh and Ad Hoc_
_Communications and Networks_ (IEEE, 2011), pp. 278–286
10. X. Liu, K. Li, G. Min, Y. Shen, A.X. Liu, W. Qu, Completely pinpointing the missing rfid tags
in a time-efficient way. IEEE ToC **64** (1), 87–96 (2015)
11. J. Yu, W. Gong, J. Liu, L. Chen, K. Wang, On efficient tree-based tag search in large-scale rfid
systems. IEEE/ACM ToN **27** (1), 42–55 (2019)
12. L. Bolotnyy, G. Robins, Multi-tag rfid systems. Int. J. Internet Protocol Technol. **2** (3), 218–231
(2007)
13. D. Hochhalter, D. Bigelow, N. J. Witchey, C. Milam, Rfid-based rack inventory management
systems, 2018. US Patent App. 15/725, 638
14. J. Yu, J. Liu, R. Zhang, L. Chen, W. Gong, S. Zhang, Multi-seed group labeling in rfid systems,
in _IEEE TMC_ (2019)
15. W. Gong, J. Liu, Z. Yang, Fast and reliable unknown tag detection in large-scale RFID systems,
in _ACM MobiHoc_ (2016), pp. 141–150


**Fast and Reliable Access Protocol for Multi-Tagged**
## **5**
**RFID Systems**


This chapter designs a method for detecting missing multi-tagged events detection from
the perspective of hashing seed. Our key idea is to search appropriate seeds such that the
reader only needs to probe a subset of tags, each selected from different items rather than the
entire tag set for the missing item detection. By employing the computation-communication
trade-offs, we develop two protocols named .M [2] ID and .M [2] ID+, where the latter protocol
improves time efficiency by classifying tags before segmentation compared to the former.
With the derived optimum parameters, our protocols can achieve up to 4x performance gain
in terms of time efficiency compared to state-of-the-art solutions.

**Chapter roadmap:** The rest of this chapter is organized as follows. Section 5.1 introduces
the motivation of joint computation and communication on the multi-tagged detection RFID
systems. In Sect. 5.2, we enumerate the missing event detection in RFID-based applications
and show the time inefficiency in the multi-tagged items in RFID systems. Then, a suit
of the segmentation and the seed searching method and an advanced method to improve
time efficiency are proposed in Sects. 5.4 and 5.5, respectively. In Sect. 5.6, we evaluate the
reliability and time efficiency of the proposed protocols. Finally, we conclude this chapter
in Sect. 5.7.


**5.1** **Introduction**


This chapter also concentrates on a particular missing item detection scenario arising from
multi-tagged RFID systems. As mentioned in Chap. 4, prior works [ 1– 10], cannot be applied
in the missing multi-tagged item detection since here these tag-level algorithms would be
time-inefficient, repeating checking the present item. Therefore, the Chap. 4 proposes the
missing items detection based on the filter construction, which is filtering and detecting a



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_5](https://doi.org/10.1007/978-3-031-93034-8_5)



99


100 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


subset of the entire tags to detect missing items. The simulation results illustrate the time
efficiency of the proposed methods.

We study the missing multi-tagged item detection problem from the aspect of computation
and communication, and develop two protocols. The first protocol named .M [2] ID provides
a suit of the segmentation and the seed searching methods. .M [2] ID divides all tags into
multiple tag segments to reduce the computation time cost of the seed searching. It makes
each segment contain the same number of the target tags with the unique hashing values
falling into a specific interval. This would reduce the communication time cost by avoiding
broadcasting unique hashing values to the tags in sequence and avoiding receiving timeinefficient responses since these unique values imply the positions of the target tags’ response
slots are randomly distributed. On the top of .M [2] ID, we propose .M [2] ID+ to further improve
the time efficiency. .M [2] ID+ works in a ‘Sampling-Classification-Segmentation’ pattern,
which can reduce the reader-tag communication cost at the price of extra less computation
cost and thus the overall time cost. The main contributions of this chapter are articulated as
follows.


- We formulate the largely unaddressed missing multi-tagged item detection problem
in RFID systems and provide solutions from the perspective of the computationcommunication trade-offs.

- We present two concrete protocols namely.M [2] ID and.M [2] ID+..M [2] ID constructs a framework integrating the seed searching and the reader-tag communication, enabling the
computation-communication trade-offs. .M [2] ID+ exploiting the time difference between
the computation and the communication reduces the communication cost at the expense
of affordable extra computational cost, improving the time efficiency.

- We optimize the protocol performance with the optimum parameters derived. The analytical results also reveal the relationship between the frame size and the probability of
finding a proper seed, indicating the computation-communication trade-offs.

- We conduct extensive simulations to evaluate the performance of the proposed protocols.
The results show that .M [2] ID and .M [2] ID+ achieve performance gain of 2x and 4x over the
state-of-the-art one [ 11] in terms of time efficiency, respectively.


We would like to emphasize that we provide not only efficient solutions to the missing multi-tagged item detection problem but also a new methodology embracing the
computation-communication trade-offs, which benefits solving other protocol design problems in RFID systems.


**5.2** **Related Work**


The works of missing item detection are separated into two categories: probabilistic protocols

[ 1– 7] and deterministic protocols [ 8– 10].


5.3 System Model and Problem Formulation 101


Probabilistic protocols detect a missing item event with a predefined probability. Tan et
al. initiate the study of probabilistic detection and propose a solution called Trusted Reader
Protocol (TRP) in [ 1]. TRP detects missing item events by comparing the pre-computed slots
with those picked by the tags attached to items. If an expected singleton slot turns out to be
empty, then the missing item event is detected. Luo [ 2] and [ 3] employ multiple seeds to
increase the probability of the singleton slot, which reduces the useless empty and collision
slots and thus achieves better performance. RUN [ 4] and BMTD [ 5] address the influence
of the unknown tags. Yu et al. design a suit of detection protocols for multi-categories and
multi-region RFID systems and study how to detect missing items by using COTS RFID
devices [ 7].

Deterministic protocols, on the other hand, are able to exactly identify which items are
absent. Li et al. develop a series of deterministic protocols in [ 8] to reduce the radio collision
by reconciling collision slots and finally iron out a bit-level tag identification method by
iteratively deactivating the tags of which the presence has been verified, hence affirming
the presence of items. Subsequently, Zhang et al. propose [ 9] to identify tag responses
in all rounds and observe the change among the corresponding bits among all bitmaps to
determine the present and the absent tags for identifying the presence of items. However,
how to configure the protocol parameters is not theoretically analyzed. More recently, Liu et
al. [ 10] enhanced the work by reconciling both 2-collision and 3-collision slots and filtering
the empty and unreconcilable collision slots to improve time efficiency.

With the presence of multi-tagged items in RFID systems, the prior works show their
weakness in terms of time efficiency. The key to addressing the multi-tagged missing item
detection problem is to probe a subset of the tags for the detection, avoiding repeated checks
of the present items. However, very limited works have studied the problem from this
perspective. The most related work [ 11] utilizes a bloom filter to solve the tag identification
problem for multi-tagged RFID systems. Yet, the false positives of the bloom filter and the
low ratio of the singleton slots (no more than.36 _._ 7%) make it time-inefficient for the missing
item detection.


**5.3** **System Model and Problem Formulation**


In this section, we will introduce the system model used in our chapter and formulate the
problem of detecting the missing multi-tagged items in an RFID system.


102 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


**5.3.1** **System Model**


We consider an RFID system consisting of one reader [1] and a large number of tags, where
each physical item is attached by multiple tags. The reader is connected with a back-end
server which has a powerful computational capability. For the purpose of simplification, we
treat the reader and the server as an entity and just call it the reader. Moreover, each tag has a
unique ID and performs computations such as hashing function. All tags’ IDs in the system
are recorded by the reader.

The communication between the reader and the tags follows the rule of ‘Listen-beforetalk’ [ 13, 14]. In the detection, for example, the reader broadcasts commands and parameters
including the frame size . _f_ and a seed . _s_ at first. Then, each tag uses its ID and the received
seed. _s_ to generate one pseudo-random value via hash function as . _(H (I D, s)_ mod _f )_, and
executes the next step according to the received commands (i.e., compare, response, or wait
for next c ommands).

The downlink (i.e., reader-to-tags) transmission is continuous. The uplink (i.e., tags-toreader), on the other hand, contains a blank slot between any two tags’ 1-bit responses [ 13].
For simplicity, we denote . _Td_ and . _Ttag_ as the time duration of .1-bit broadcasting slot and

.1-bit response slot, respectively. Consider an arbitrate response slot, it may experience three
states. When no tags respond in this slot, it is an empty slot; when a single tag responds,
it is a singleton slot; when multiple tags respond, it is a collision slot. The latter two states
are also regarded as non-empty slots. Considering the unstable channel, there exist error
transmissions. We assume that the downlink works in an error-free channel since the reader
supported by the external power source can increase the transmission power. In contrast, the
tag cannot support much power to counter the interference. Therefore, we assume that the
error occurs in the uplink and the manifestation of the error transmission is bit inversion.
The ‘1’ inverted to ‘0’ brings the false positives and the ‘0’ inverted to ‘1’ induces the false
negatives which will cause the practical damage.


**5.3.2** **Problem Formulation**


In this chapter, we are interested in detecting the missing multi-tagged items in an RFID
system where . _n_ tags monitor . _g_ items each attached by the multiple tags, i.e., . _g_ _< n_ . Considering the instability of the uplink, we define . _ma_ as the number of missing items and . _Pd_
as the probability that the reader succeeds in detecting the missing item event without the
false alarm. We formulate the multi-tagged missing item detection problem as follows: The
missing multi-tagged item detection problem is to devise an algorithm of minimum execu

1 For multiple readers, we can treat them as a single virtual reader as in [ 6, 12]. Specifically, the backend server searches all proper seeds and corresponding hashing values and sends them to all readers
such that readers broadcast these parameters. Consequently, the back-end server can synchronize the
readers and we can logically consider them as a whole.


5.3 System Model and Problem Formulation 103


tion time to detect missing item event with . _Pd_ ≥ _α_ under the condition of . _ma_ ≥ _Ma_ in the
unstable uplink. The. _α_ is the required correct detection probability among all detections, and
the. _Ma_ is a predefined detection threshold meaning the tolerance to the minimum number of
the missing items. Note that the problem is degraded to deterministically identify missing
items when . _α_ = 1 and . _Ma_ = 1. The proposed protocols in this chapter can also achieve
deterministic missing item identification.

We would like to emphasize the key difference between the missing multi-tagged item
detection problem and the prior missing single-tagged item detection problem: The successful response of one tag on a multi-tagged item indicates the presence of the item, it is thus
feasible to query one tag for checking the state of an item. In contrast, if we use the prior
algorithms for the missing single-tagged item detection problem, all tags on the item would
respond to the interrogation, resulting in severe interference and thus considerably degrading
time efficiency. For example, there are .10 _,_ 000 items being monitored where each item is
attached by 3 tags, the prior works have to probe .30 _,_ 000 tags, which sharply increases the
time cost. Instead, we only query .10 _,_ 000 tags by picking one tag from each item. Table 5.1
summarizes the main notations used in this chapter. The difference makes our work different
from the prior ones and more challenging.


**5.3.3** **Design Rational**


The response of a tag means the presence of the item, the reader has no need to query the
other tags on this item. Meanwhile, the absence of one tag indicates the potential missing
item. Therefore, it is feasible to probe one of the tags on an item instead of all for the missing
item event detection. If the probed tag is absent, we would further poll the left tags on the
item, and a missing item would be found if all of them are absent. Considering the number
of missing items is usually small, the idea above can improve time efficiency significantly.

In this chapter, we randomly select one tag from each item, referred to as a representative
tag. These . _g_ tags constitute the representative tag set defined as . _GA_ = { _RT_ 1 _, RT_ 2 _, ..., RTg_ }
where the . _RTk_ is a tag on the item . _k_ for .1 ≤ _k_ ≤ _g_ . The set of the remaining tags named
pending tags is denoted by . _GB_ . We are interested in interrogating the representative tags
to detect potential missing item events. Unfortunately, the pending tags in . _GB_ would cause
severe interference to the representative tag detection. Hence, an efficient scheme should be
able to eliminate this negative impact.

We distinguish the representative tags and the pending tags via their hashing values
by selecting such a seed that there exists no common hash value mapped by the tags in

. _GA_ and . _GB_ . Furthermore, we prefer a proper seed that makes each tag in . _GA_ map to a
unique hash value and respond in a singleton slot. Consequently, the reader only needs to
broadcast the proper seed and corresponding unique hashing values. Each tag learns whether
it should respond after comparing its hashing value with the received hashing value, and the


104 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


**Table 5.1** Main parameter notation

|Symbols|Description|
|---|---|
|._n_|The number of the tags in our system|
|._g_|The number of the items in our detection region|
|._ fsample_|The frame size of the hashing for sampling|
|._ssample_|The seed used for sampling|
|._ fsg_|The frame size of doing hash in the segmentation|
|._ssg_|The seed used in the segmentation|
|._bis_|The lower bound of the._i_-th segment|
|._bie_|The upper bound of the._i_-th segment|
|._psi_|The probability of searching a proper seed in the._i_-th segment|
|._Nsi_|The round of ﬁnding out a proper seed in the._i_-th segment|
|._gd_|The ﬁxed number of representative tags in each segment|
|._Nc_|The round of the CPU clock doing once hash|
|._TC PU_|The period of the CPU c lock|
|._L(_·_)_|The operation of. log2_(_max {·}_)_|
|._ fsegu_|The frame size for segmentation in category. _u_|
|._ fsu_|The identical frame size for seed searching for all segments|
|._nqu_|The number of tags in the._q_-th segment in category. _u_|
|._Td_|The period of broadcasting a bit|
|._Ttag_|The period of the tag’s 1-bit response in a slot|



response slot of the representative tag is determined by the hashing value. After receiving
the representative tags’ responses, the reader can find the potential missing items.

Yet, it is impractical to search a proper seed for all tags in a large-scale system of extremely
high computational complexity, it is necessary to design a strategy that can lessen the number
of tags simultaneously involved in the seed searching. On the other hand, these unique
hashing values indicating the response slot positions of the representative tags are randomly
distributed. Hence, we have to broadcast each of these hashing values and the response slots
might involve empty slots, leading to low efficiency. To address the obstacles, we induct
these unique hashing values to a special range so that we only need to broadcast the boundary
values of this range once and all response slots are singleton, which retrenches the readertags communications. This makes the communication cost from broadcasting hashing values
many times determined by the number of the representative tags to broadcasting only twice,
meanwhile, from involving empty slots to reaching .100% utilization in the response frame.

Moreover, motivated by the difference between the computation time of the reader and
the transmission rate among the reader-tag communications (i.e., the clock period of the


5.4 M [2] ID:Missing Multi-Tagged Item Detection Protocol 105


CPU in the reader is about .0 _._ 3ns and a time slot in the communication is over .10 _μ_ s), we
could trade-off the computation cost and the communication cost to further minimize the
overall execution time. Following the design rational above, we construct .M [2] ID and the
improved .M [2] ID+.


**5.4** . **M** **[2]** **ID: Missing Multi-Tagged Item Detection Protocol**


In this section, we first introduce the Missing Multi-tagged Item Detection Protocol (.M [2] ID)
and analyze how to tune the parameters for performance optimization.


**5.4.1** **Motivation**


The seed and a tag’s ID determine the hashing value of the tag in RFID systems, so we can
find a proper seed that makes each of. _g_ representative tags have a unique hashing value. The
reader then broadcasts the seed and the corresponding hashing values informing the tags
whether/when they should respond. We denote the . _j_ -th representative tag’s hashing value

                           -                           -                           -                           under the proper seed . _s_ and the frame size . _f_ by . _h j_ = _H_ _I D j_ _, s_ mod _f_ + 1, meaning
its response slot is also . _h j_ . To avoid sequentially broadcasting these unique hashing values,
we make them all designated in a range of .[1 _, g_ ] ⊆ [1 _,_ _f_ ] that we only need to broadcast
the parameter . _g_ once at the beginning of the protocol. This makes the communication cost
from broadcasting every unique hashing value to broadcasting only one value.

We take an example to illustrate this. As shown in Fig. 5.1, there exists . 2 items and
each is attached with . 3 tags (i.e., . _g_ = 2 for . 2 representative tags). We pick one tag from
′
each item as a representative tag (i.e., tag 1,4). Originally, we select a proper seed . _s_ so that
all representative tags’ hashing values are unique and their corresponding hashing values
represent the slot position in the response frame. For example, the hashing value of the tag
1 i s . 2 and it should respond in the .2-th slot in the response frame, the tag 4’s hashing value
is . 5 and it should respond in the .5-th slot in the response frame (c.f. Fig. 5.1a). Hence, we
have to broadcast these hashing values (i.e., .2 _,_ 5) to tags and the response frame involves
empty slots, leading to low efficiency. In our design, as shown in Fig. 5.1b, our required
seed . _s_ makes all unique hashing values fall in the range of .[1 _,_ 2], while the pending tags’
hashing values are out of this range. Finally, tag 1,4 will respond in the response slots 1,2,
respectively. Thus, we only need to broadcast hashing value . 2 and the utilization of the
response frame reaches .100%, which retrenches communication time cost.

Finding such a seed is effective for the missing item detection, but the time cost would
soar if we search for all tags in the system. Specifically, the probability of seeking out the
proper seed can be expressed as follows.


106 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


**Fig. 5.1** The example of required seed . _s_ when . _n_ = 6, . _g_ = 2, . _f_ = 6




- _g_ 1 − _[g]_

_f_



. _p f t_ = _[g]_ [!]

_g_ _[g]_




_g_

_f_




- _n_ - _g_
_._ (5.1)



It can be proven that . _p f t_ is maximum when . _f_ = _n_ (c.f. Sect. 5.4.4). We next show that
the time cost is unaffordable even for a small-scale system. For example, when . _n_ = 100
and . _g_ = 50, we have . _p f t_ = 2 _._ 701 × 10 [−][51] . That is to say, we need . _Ns_ × _Tcpu_ ≈ 3 _._ 702 ×
10 [38] s ≈ 1 _._ 174 × 10 [31] years on average with .1 _,_ 000 GHz CPU to find the seed for .100 tags.
Therefore, a scheme of lower computation complexity is called for to achieve time-efficient
detection.

In this chapter, we follow the principle of ‘Divide and Conquer’. Take the system of

. _n_ = 100 and . _g_ = 50 as an example again. We first divide them into .10 segments and each
segment consists of . _ni_ = 10 tags including . _gi_ = 5 representative tags. Recall (5.1), it only
takes .5 _._ 333 _μ_ s to finding the proper seed in a segment when the reader works on a . 5GHz
CPU. The total searching time for all segments is .53 _μ_ s, which is significantly less than the
unsegmented one above. Aggressively, if we divide all tags into .50 segments where . _ni_ = 2,

. _gi_ = 1 on average, the total searching time decreases to .40ns. Therefore, the segmentation
is an effective method to decrease the time cost in the seed searching.


**5.4.2** **Segmentation**


Segmentation can reduce the computational complexity, but directly segmenting the tags
randomly is undesirable. Recall that the tags conduct hashing operations with a seed and
the frame size, and are segmented by their hashing values and a given segment size. The
random segmentation would unbalance the number of the tags falling into the segments,
degrading the performance gain of the segmentation. On the other hand, we have to spend


5.4 M [2] ID:Missing Multi-Tagged Item Detection Protocol 107


extra time on telling tags the range of unique hashing values in each segment due to the
different number of the representative tags in each segment.

In this chapter, we propose a segmentation method of approximately uniformly segmenting the set of tags. By uniform segmentation, each segment contains an identical number of
the representative tags and a similar number of pending tags. Hence, the hashing value range
of each segment might be different. More specifically, this method operates as follows. First,
the reader records all tags’ IDs, we thus simulate at the reader that all tags calculate their
hashing values under a seed . _ssg_ and frame size . _fsg_ . The setting of frame size . _fsg_ will be
discussed in Sect. 5.4.4.

Second, the reader determines the hashing value range of each segment guaranteeing
the identical number of the representative tags in each segment. Each segment’s hashing
value range can be expressed via boundary values. The lower bound and upper bound values
can be set as follows. We denote . _gi_ as the number of the representative tags in the . _i_ -th
segment for . _i_ = 1 _,_ 2 _, ..._ . For the first segment, the reader sets the lower bound as . _bt_ 1 = 1
and then seeks out the largest value of the upper bound . _be_ 1. The required . _be_ 1 should satisfy

. _g_ 1 = [�] _[b]_ _k_ _[e]_ = [1] _bt_ 1 _[�(][k][)]_ [ ≤] _[g][d]_ [, wher e][ .] _[g]_ [1] [is the number of the representative tags whose hashing ]
values are in the range of .[ _bt_ 1 _, be_ 1], . _�(k)_ is the number of the representative tags whose
hashing values equal to . _k_, an d . _gd_ is the required number of the representative tags in each
segment. Once . _be_ 1 set, the boundary values of the first segment are set as .[ _bt_ 1 _, be_ 1]. Thus,
the tags should be in .1-st segment when their hashing values are into the range of .[ _bt_ 1 _, be_ 1].
For the second segment, we set the lower bound as . _bt_ 2 = _be_ 1 + 1 and find the largest value
of . _be_ 2 as the first segment does. After repeating the above processes, we eventually set each
segment’s boundary values so that each segment contains no more than . _gd_ representative
tags.


**5.4.3** **Protocol Description**


Our proposed Multi-tagged Missing Item Detection Protocol .M [2] ID can be described as
follows.

We start at the view of the reader. **(1)** In the segmentation, the reader picks up an arbitrary
seed � . _ssg_ from the seed pool and encodes each tag via its hashing value which is in a range �
of . 1 _,_ _fsg_, meanwhile, confirms the boundary values of each segment. Then, the reader

compares each tag’s hashing value with the segment boundary to decide each tag’s affiliation.
**(2)** In the seed searching, the reader searches a proper seed under the corresponding optimum
frame size to separate the representative tags and the pending tags in each segment. The
position of a tag’s response is determined by the serial number of the segment and its
hashing value. In the . _i_ -th segment, the representative tags’ hashing values are unique and
in a range of .[1 _, gd_ ] with the proper seed . _si_ and the optimum frame size . _fi_ . In case that we
cannot always seek out the proper seed for all representative tags mapping to.[1 _, gd_ ] since the
limited scale of the seed pool, we prefer the sub-optimum seed that makes the representative


108 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


tags map to.[1 _, gd_ ] as many as possible. **(3)** In the reader-tag communications, the reader first
broadcasts parameters including the seed . _ssg_ and the frame size . _fsg_ for the segmentation.
Then, it broadcasts the boundary values .{ _bti_ _, bei_ } of the . _i_ -th segment and its corresponding
seed . _si_ and the frame size . _fi_ . After finishing broadcasting, the reader interrogates the tags
and listens to the tags’ responses for detecting the missing item event.

At the tags end, each tag receives parameters from the reader and first calculates its hashing
value for the segmentation with the seed . _ssg_ and the frame size . _fsg_ . Then, it compares
its hashing values with the boundary values of segments. If its hashing value falls into

.{ _bti_ _, bei_ }, it should be in the . _i_ -th segment. After that, it uses the received . _si_ and . _fi_ to do
another hashing. If the value falls into .[1 _, gd_ ], the tag will regard itself as a representative
tag and then respond in the corresponding position of the response frame when interrogated.
Otherwise, the tag will keep silent and wait for the reader’s new command. Consequently,
only the representative tags respond and all the response slots should be singleton.

Since the response slots are orchestrated to be mapped by one representative tag, the
reader knowing all representative tags’ mapping positions can detect the missing item even
if there exists at least one empty slot. After finding any empty slot, the reader will poll the
other tags on the item attached by this missing representative tag to affirm the item state.

By conducting the operations above across all segments, we can identify all representative
tags. One of the challenges in .M [2] ID is how to tune parameters for the minimum execution
time. We will address this in the following.


**5.4.4** **Parameter Optimization**


In this part, our optimization is described based on the situation that all proper seeds are
sought out in the seed pool. Our goal is to configure the frame size. _fsg_ for the segmentation,
the frame size . _fi_ for the seed searching in the . _i_ -th segment, and the required number of the
representative tags . _gd_ in each segment.


(1) **At the beginning, we first discuss the setting of the frame size** . _fsg_ **in the segmentation** .
Based on the description in Sect. 5.4.2, the number of the representative tags in each segment
is no more than . _gd_ . Thus, the positions of the representative tags’ responses are decided as
follows:


. _RePos j_ = _gd_ _(i_                                          - 1 _)_ + _y j_ _,_ (5.2)


where the . _y j_ is the hashing value of the . _j_ -th representative tag in the . _i_ -th segment. In
a segment, . _gi_ representative tags’ hashing values are unique and in the range of .[1 _, gd_ ].
Sometimes, . _gi_ may be smaller than . _gd_ because of the coincident hashing values of the
multiple representative tags. If we make . _gi_ = _gd_ in each segment, we would achieve . 100%
utilization of the response frame without empty slots. For example, each segment has two
representative tags and we consider the. _i_ -th segment. The proper seed in this segment makes


5.4 M [2] ID:Missing Multi-Tagged Item Detection Protocol 109


the representative tags’ hashing values . _y_ 1 = 1 and . _y_ 2 = 2. Thus, the tags will respond in
the . _(_ 2 _(i_ - 1 _)_ + 1 _)_ -th slot and the . _(_ 2 _(i_ - 1 _)_ + 2 _)_ -th slot, respectively. The key to achieving

. _gi_ = _gd_ is that each representative tag maps to a unique value without considering the
pending tags’ hashing values. The probability that each representative tag maps to a unique
hashing value can be written as



. _pg_ =




- _g_ −1 - _j_ =0 _fsg_   - _j_ ≥ 66 _._ 7% _._ (5.3)

_fs_ _[g]_ _g_



The expected round of the seed searching defined as . _Ng_ is .1 _/_ _pg_ . Here, . _pg_ ≥ 66 _._ 7%
means that an arbitrary seed makes the representative tags map to the unique values, i.e.,

.E[ _Ng_ ] = 1 _/_ _pg_ ≤ 1 _._ 499 ≈ 1. The value of . _fsg_ can thus be derived while the number of the
representative tags in each segment is . _gd_ .


**(2) We next discuss the optimum frame size** . _fi_ **in the seed searching.** The probability of
seeking out a proper seed for the . _i_ -th segment can be expressed as follows:




- _ni_ - _gd_
(5.4)




   1
. _psi_ = _gd_ ! _fi_




- _gd_ 1 − _[g][d]_

_fi_



where. _ni_ is the number of the tags in the. _i_ -th segment and. _fi_ is the frame size for calculating
the hashing value. We then should derive . _fi_ to maximize . _psi_ .


**Theorem 1** _Given_ . _gd_ _and_ . _ni_ _in the_ . _i-th segment, the optimum size of_ . _fi_ _maximizing_ . _psi_
_should satisfy_ . _fi_ = _ni_ _._


_**Proof**_ The partial differential function of . _psi_ by . _fi_ can be expressed as




- _ni_ - _gd_ −1 � _ni_ - 1� _._ (5.5)
_fi_



. _[∂]_ _[p][s][i]_



_fi_ _[g][d]_ [+][1]




_[p][s][i]_ = _[g][d]_ _[g][d]_ [!]

_∂_ _fi_ _f_ _[g][d]_ [+][1]




1 − _[g][d]_

_fi_



_si_

When . _∂_ _fi_ [=][ 0, we have two points such as] [.] _[ f][i]_ [1] [=] _[ g][d]_ [and] [.] _[ f][i]_ [2] [=] _[ n][i]_ [, an d] [.] _[g][d]_ [≤] _[f][i]_ [. According ]

to the requirement of the proper seed, we set . _fi_ = _ni_ . As shown in (5.5), it is positive when



When .



_∂_ _psi_



. _fi_ _< ni_ and negative when . _fi_ _> ni_ . Hence, we can get the maximum . _psi_ with . _fi_ = _ni_ .


Theorem 1 indicates the optimum frame size . _fi_ is determined by the number of the tags

. _ni_ in this segment.


**(3) Now, we discuss the selection of** . _gd_ . The expected execution time of the segmentation, defined as . _Tsg_, consists of the time spent on the seed searching and broadcasting the
parameters including the seed value, the frame size for the segmentation, and each segment’s
boundary values. The cost of broadcasting . _gd_ can be negligible compared with the cost of


110 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


other parameters broadcasting. Thus, the cost of the segmentation and broadcasting of each
boundary value for all segments can be expressed as




                      -                      -                      - _r_
. _Tsg_ = _Tsearching_ + _Teach_ = _nNg NcTcpu_ + _L( fsg)_ + _L(ssg)_ _Td_ + _(L(bti_ _)_ + _L(bei_ _)) Td_ _,_ (5.6)

_i_ =1



where. _Ng_ = 1 holds following (5.3). We use. _L (_ - _)_ to stand for.log2 _(max_ {·} _)_ and the number
of the segments . _r_ is equal to . _g/gd_ . The operator of . _L (_ - _)_ shows the length of data expressed
by the binary sequence. As the boundary values of each segment should be less than . _fsg_,
the length of the binary sequence expressing boundary values is twice of . _L( fsg)_ . Therefore,
(5.6) can be rewritten as

            -            -            -            2 _g_
. _Tsg_ = _nNcTcpu_ + _L(ssg)_ + _gd_ + 1 _L( fsg)_ _Td_ _._ (5.7)


We can observe that the execution time of the segmentation is decided by . _gd_ when . _fsg_ is
derived by (5.3).

Then, we will discuss the execution time after each tag recognizes its belonged segment. As described in Sect. 5.4.3, the expected total execution time of the seed searching,
broadcasting the corresponding optimum frame sizes and the seed values can be written as



. _Ts_ =




- _r_

_Nsi ni NcTcpu_ + _(L( fi_ _)_ + _L(si_ _)) Td_ _,_ (5.8)
_i_ =1



where the . _Nsi_ is the round of the seed searching and we have . _Nsi_ = 1 _/_ _psi_ . As stated in the
Theorem 1, we prefer. _pms_ to represent the maximum of. _psi_ with the respect to. _fi_ if we make

. _fi_ = _ni_ :




- _gd_ 1 − _[g][d]_

_ni_




- _gd_ 1 − _[g][d]_




- _ni_ - _gd_
_._ (5.9)



. _pms(gd_ _, ni_ _)_ = _[g][d]_ [!]

_gd_ _[g][d]_




_gd_
_ni_



Hence, the minimum expected round for searching the proper seed is .1 _/_ _pms(gd_ _, ni_ _)_ .

During the searching process, we initialize the seed value to ‘1’ and increase by ‘1’ in
the next round if we do not find out the proper one. Therefore, the value of . _si_ is equal to

.1 _/_ _pms(gd_ _, ni_ _)_, an d . _Tss_ can be rewritten as




     -     _pnmsi_ _N(gcdT,cpu ni_ _)_ [+] _L(ni_ _)_ + _L_ _pms(g_ 1 _d_ _, ni_ _)_



��
_Td_ _._ (5.10)



. _Ts_ =




- _r_


_i_ =1



In addition, the execution time of the response frame can be expressed as



. _Tr_ =




- _r_

_gi_ _Ttag_ = _r_ _gd_ _Ttag_ = _gTtag._ (5.11)
_i_ =1


5.4 M [2] ID:Missing Multi-Tagged Item Detection Protocol 111


Recall (5.6), (5.10), and (5.11), the expected execution time of the .M [2] ID, defined as the

. _Twhole_, i s


. _Twhole_ = _Tsg_ + _Ts_ + _Tr_ = _nNcTcpu_ + _gTtag_



_g_

 - - 2 _g_ - - - _gd_
+ _L(ssg)_ + _gd_ + 1 _L( fsg)_ _Td_ + _i_ =1




     -     _pnmsi_ _N(gcdT,cpu ni_ _)_ [+] _L(ni_ _)_ + _L_ _pms_ _(g_ 1 _d_ _, ni_ _)_



��
_Td_ _._ (5.12)



We observe that . _Twhole_ is determined by the latter part of . _Tsg_ (i.e., .2 _g/gd L( fsg)Td_ ) and the
whole part of. _Ts_ . Considering. _fi_ and. _fsg_ are fixed so that. _Td_ and. _Ts_ are determined by. _gd_, we
thus only optimize these two part with. _gd_ where we approximate. _ni_ with the expected number
of the tags .E [ _ni_ ] = _ngd_ _/g_ . However, using the expected value of . _ni_ may be inaccurate for

. _L(ni_ _)_ that depends on the maximum. _ni_ . To solve this problem, we set an upper bound for the
maximum . _ni_ . Based on extensive numerical analysis, we fix .max { _ni_ } = 3 _n/g_ . Intuitively,
we extract the part related with . _gd_ from (5.12), the expression is written as follows:




+ [2] _[g]_



. _Tsim_ = _g_ _[g]_ _d_




_ngd_ _NcTcpu_
_g_ _pms(gd_ _,_ E [ _ni_ ] _)_




1
_pms(gd_ _,_ max { _ni_ } _)_



_gd_ log2 _( fsg)Td_




3 _ngd_
_g_




+ log2



��
_Td_ _._ (5.13)



+ _[g]_

_gd_




log2



Now, the problem is converted to find out the proper value of . _gd_ to minimize . _Tsim_ .
Generally, we are going to directly conduct the differential function of . _Tsim_ to calculate the
extreme point where the proper. _gd_ can be found. Yet, the differential function is too complex
to derive the closed form of. _gd_ . A feasible way is to find such an upper bound that the values
of . _gd_ over this bound would make . _Tsim_ increasing.

Conducting algebraic operations, we can observe that the first part of . _Tsim_ is of the order
of the magnitude . _�((_ _[ne]_ _[)][g][d]_ _[)]_ [while the sum of the other parts is in ] [.] _[�(]_ [1] _[)]_ [. Consequently, ]



_g_ _[)][g][d]_ _[)]_ [while the sum of the other parts is in ] [.] _[�(]_ _g_ [1]




_[d]_ _[)]_

of the magnitude . _�((_ _[ne]_ _g_ _[)]_ [while the sum of the other parts is in ] [.] _[�(]_ _g_ [1] _d_ _[)]_ [. Consequently, ]

we can find the upper bound for . _gd_ due to the fact that . _Td_ is significantly larger than . _Tcpu_ .
Considering the exponential increase and the reciprocal decrease of . _Tsim_ with . _gd_, the upper
bound is usually not large. Once finding it, we would search for an optimum . _gd_ from 1 to
the upper bound.

We conduct the numerical experiment to understand this with varying . _n_ and . _g_ where the
period of CPU is .0 _._ 27ns and doing hash function needs .344 clock cycles. As shown in Fig.
5.2, . _Tsim_ increases extremely when . _gd_ is greater than . 4, and the minimum of . _Tsim_ can be
reached by . _gd_ ≤ 4.

After the three steps above, we can obtain. _fsg_,. _fi_, an d. _gd_ that would minimize the overall
execution time of .M [2] ID. Let us take an example to interpret .M [2] ID. As shown in Fig. 5.3,
there exists . _g_ = 3 items each being attached by 3 tags. Using the parameter configuration
method presented in this subsection, we have . _fsg_ = 9 and . _gd_ = 1. The tags are divided into
3 segments with . _ssg_ (c.f. Fig. 5.3a) and then the reader finds the proper seed . _si_ of the . _i_ -th
segment (c.f. Fig. 5.3b). Finally, each tag calculates its position with the received parameters
and decides whether/when to respond following (5.2). If recognizes itself as a representative


112 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


**Fig. 5.2** The impact of . _gd_ on . _T_


tag, the tag replies in the calculated position in the response frame. Consequently, only the
representative tags respond in sequence (c.f. Fig. 5.3c).

As mentioned in Sect. 5.3.1, we assume the downlink works in the error-free channel and
the uplink works in the unstable channel. Hence, we assume the probability of each received
bit from the tags occurring bit inversion is . _pe_ . The probability of a missing representative
tag which is undetected in .M [2] ID resulting from the bit inversion is written as


. _Punde_ = 1 − _Pm (_ 1 − _pe)_ = _pe,_ (5.14)


where . _Pm_ is the probability that a representative maps to a singleton slot and the value is . 1.
Therefore, the probability of detecting the real missing representative tag is expressed as


. _Pcd_ = 1 − _Punde_ _[M][a]_ [=][ 1][ −] _[p]_ _e_ _[M][a]_ _,_ (5.15)


where the . _Ma_ is the detection threshold. Therefore, the reliability of .M [2] ID working in the
unstable channel is estimated.


5.5 M [2] ID+:The Improvement of M [2] ID 113


**Fig. 5.3** An illustration of .M [2] ID when . _n_ = 9 and . _g_ = 3


**5.5** . **M** **[2]** **ID+: The Improvement of** . **M** **[2]** **ID**


In this section, we introduce .M [2] ID+ to more actively trade-off the computation time and
the communication time to further improve the time efficiency.


**5.5.1** **Motivation**


.M [2] ID can effectively complete the missing multi-tagged item event detection, its performance, however, is hindered by the time cost of the reader-tag communication, as described
below: First, probing all representative tags is time-consuming because the detection time
cost is proportionate to their size while it is adequate for the probabilistic detection to interrogate part of the representative tags with the given reliability requirement. Second, the
equation (5.3) indicates that the frame size in the segmentation . _fsg_ increases as the system
scales up, the time spent on broadcasting boundary values of each segment will thus soar
following (5.7), degrading the time efficiency. Moreover, we have to broadcast the different
frame sizes used for the seed searching of each segment in .M [2] ID, which introduces extra
time costs.

To tackle the drawbacks of.M [2] ID, we introduce the following three approaches to further
embrace the computation-communication trade-offs, improving the time efficiency:


114 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


- We select the partial tags via sampling instead of the entire tag set in .M [2] ID, which
reduces the number of representative tags participating in the detection. Note that if both
the sampling ratio and the required reliability are 1,.M [2] ID+ can achieve the deterministic
detection.

- We avoid spending too much time broadcasting the boundary values of each segment and
improve the time efficiency via two steps. (1) We divide the sampled tags into categories
and each is further segmented into multiple segments with a smaller frame size for the
subsequent segmentation. (2) We introduce the seed searching into the segmentation
instead of selecting an arbitrary seed in.M [2] ID, which would further reduce the frame size
used in the segmentation.

- During the seed searching of each segment, we set the identical frame size across all
segments of a category so that the readers broadcast its value once instead of multiple
times in .M [2] ID.


We would like to explain that .M [2] ID+ brings extra computation time cost compared to

.M [2] ID, but this reduces more communication time cost and thus the overall time cost. Let’s
take an example to make the explanation. Consider a system input of . _gd_ = 1 _, g_ = 50 _, n_ =
500, .M [2] ID would use .1212-bit binary sequence to broadcast the boundary values of all
segments. In contrast, this cost reduces to .411 in .M [2] ID+ where the tags are classified into

.10 categories before the segmentation, including .300 bits representing the boundary values,

.100 bits expressing the ten 10-bit seed sequences used in the subsequent segmentation for
all categories, and about .11-bit cost equivalently to the computation time of .279 _μ_ s.


**5.5.2** **Protocol Description**


In .M [2] ID+, the reader works in two modes, i.e., offline or online. In the offline mode, the
reader will conduct the parameters configuration, the operations of the sampling, and the
classification according to the user’s requirements. They are done in the reader once the
system is confirmed before the detection. On the other side, online mode will search the
seed and communicate with the tags for each executed detection. Therefore, the time cost
for the detection discussed in this chapter refers to the cost of online mode.
(1) Sampling-classification: In the offline mode before the detection, the reader first
picks up two arbitrary seeds and two corresponding thresholds to conduct the sampling and the classification. For example, an arbitrary tag’s hashing value is � - - - . _hs, j_ =
_H_ _I D j_ _, ssample_ mod _fsample_ + 1 with the sampling seed . _ssample_ and the frame size

. _fsample_ . The threshold . _T h_ is .⌈ _psample fsample_ ⌉. I f . _hs, j_ ≤ _T h_, this tag is sampled. Consequently,. _npsample_ of the tags are sampled to participate in the sequent operations. The reader
then makes these sampled tags do another hashing operation with the second seed� - - . _sclass_ - and
its corresponding classification size . _fclass_, i.e., . _hc, j_ = _H_ _I D j_ _, sclass_ mod _fclass_ + 1.


5.5 M [2] ID+:The Improvement of M [2] ID 115


The value of . _hc, j_ indicates the category the tag belongs to. For example, If . _hc, j_ = _u_, it
would be classified into the category . _u_ for . _u_ = 1 _,_ 2 _, ...,_ _fclass_ .
(2) Segmentation of a category: During the online mode for the detection, consider an
arbitrary category . _u_, the reader first divides it into multiple segments. Specifically, the
reader searches for such a seed . _ssegu_ that all representative tags of this category map to
unique hashing values with the frame size . _fsegu_ . Furthermore, we only record the length
of each segment (i.e., . _dqu_ = _bequ_ - _btqu_ + 1, wher e . _qu_ represents the . _q_ -th segment in th e
category . _u_ ) instead of the boundary values in .M [2] ID. The reader then finds another proper
seed for the representative tags in each segment ensuring that their hashing values fall
into .[1 _, gd_ ]. The process of the seed searching in each segment is similar with .M [2] ID. The
difference here lies in that we use an identical frame size . _fsu_ across all segments instead of
the different frame sizes in .M [2] ID.
(3) Parameters broadcasting: The reader first broadcasts the seeds, the frame sizes, and the
thresholds used in sampling and classification. For the category . _u_, the reader broadcasts the
parameters used in the segmentation, namely the frame size . _fsegu_ and the seed . _ssegu_ . The
reader then sends the identical frame size . _fsu_ used in the seed searching for each segment
and each segment’s length . _dqu_ and the found seeds. Sequentially, the reader interrogates
the sampled representative tags in the category . _u_ and waits for their responses. Repeating
these operations for all categories, the reader checks the observed response slots of the
representative tags. It can detect missing items if the predicated busy slots turn out to be
empty.

On the tag side, each tag does a hash function to check whether it is sampled according
to the received parameters. Only a sampled tag determines which category it belongs to,
while the unsampled tags will keep silent. After knowing its category, the tag computes
its segment and checks whether it is a representative tag. Each representative tag will then
respond at a corresponding slot as .M [2] ID does.

.M [2] ID+ makes the sampled representative tags map to singleton slots and then identifies
when all proper seeds are sought out. The key left is to configure the parameters used in the
sampling, the classification, and the segmentation to minimize the overall execution time.


**5.5.3** **Parameter Setting**


We here introduce how to set the parameters used in .M [2] ID+ so that the detection reliability
can be satisfied while the overall execution time can be minimized. Consider we have . _U_
categories (i.e.,. _U_ = _fclass_ ), and the expected number of the tags and the representative tags
in each category is . _ns/U_ and . _gs/U_ respectively under the sampling ratio . _psample_, wher e

. _ns_ = _npsample_, . _gs_ = _g psample_ . In an arbitrary category . _u_, the reader divides the tags into
several segments with the frame size. _fsegu_ and each segment contains. _gd_ representative tags.
Recall Sect. 5.5.2, the expected overall time cost of .M [2] ID+ is


116 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


. _Ttotal_ = _Tr_ _ _whole_ + _Tres_ = _UTu_ + _gs_ _Ttag,_ (5.16)


where . _Tr_ _ _whole_ is the expected time cost used by the reader to complete the computation
and the broadcasting for . _U_ categories. . _Tu_ is the expected time cost of the category . _u_, an d

. _Tres_ is the time duration of the response frame determined by the number of the sampled
representative tags . _gs_ .

For the. _u_ -th category, the expected time cost can be divided into the following three parts:


. _Tu_ = _Tsegu_ + _Tidenu_ + _Tssbu_ _,_ (5.17)


where. _Tsegu_ is the expected time cost used for the segmentation and its parameters transmission, . _Tssbu_ is the expected time cost of the seed searching and the seed transmission for all
segments, and . _Tidenu_ is the cost of broadcasting the identical frame size . _fsu_ for all segments
expressed as . _Tidenu_ = _L( fsu_ _)Td_ .

As mentioned above, the time cost of the segmentation contains the cost of the seed
searching and the parameters broadcasting. Thus, . _Tsegu_ is written as

           -           _gs_

. _Tsegu_ = _[C][u][n]_ _U_ _[s][ N][c]_ _Tcpu_ + _gdU_ _[L][(][D][)]_ [ +] _[ L][(][ f][se][g][u]_ _[)]_ [ +] _[ L][(][C][u][)]_ _Td_ _,_ (5.18)


where . _D_ is the expected length of each segment in all categories, and . _Cu_ is the expected
round needed to find a seed for the segmentation. In addition, the value of the seed equals
to . _Cu_ . Specifically, the expected length of each segment is

. _D_ = E[ _dqu_ ] = _[f][se][g]_ _g_ _[u]_ _s_ _[g][d][U]_ _._ (5.19)


And the expected number of rounds is



1
. _Cu_ = _[g][s]_




- _q_ _[g]_ _U_ = _[s]_ 0 [−][1] _fsegu_ - _q_



_gs_

= _fseUgu_ _,_ (5.20)

 - _[g]_ _U_ _[s]_ [−][1]
_q_ =0 _fsegu_    - _q_



~~_g_~~ _s_
_fseUgu_



where . _fsegu_ should meet . _fsegu_ ≥ _[g]_ _U_ _[s]_ [in order to make all representative tags map to the ]

unique hashing values.

Moreover, . _Tssbu_ is the sum of the cost of the seed searching for all segments . _Tssu_ and the
cost of broadcasting the proper seeds . _Tssbu_ . Specifically, . _Tssu_ can be written as




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~ _,_ (5.21)

_[d]_ _[n]_

_g_



. _Tssu_ =




- _ru_


_q_ =1



_nqu_ _NcTcpu_ _n_ ~~�~~ _s_ _NcTcpu_
_psms(gd_ _, nqu_ _,_ _fsu_ _)_ [=] _Up_ _g_ _,_ _[g][d]_ _[n]_




~~�~~
_Upsms_ _gd_ _,_ _[g][d]_ _[n]_



where . _ru_ is the number of the segment in the category . _u_ and its expected value is . _g_ _[g][s]_




_[s]_
where . _ru_ is the number of the segment in the category . _u_ and its expected value is . _gd_ _U_ [.][ . ] _[n][q][u]_

is the number of the tags in the . _q_ -th segment of the category . _u_ and its expected value is . _[g][d]_ _[n]_ [.]



_g_ [.]


5.5 M [2] ID+:The Improvement of M [2] ID 117




        The probability . _psms_ _gd_ _,_ _[g][d]_ _[n]_




 
_[d]_ _g_ _[n]_ of finding a proper seed with the identical frame size



. _[g][d]_ _[n]_

_g_ [can be written as ]




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_



_g_




- _gd_ - _g_
1 −
_gd_ _n_




_g_
_gd_ _n_




- _[g]_ _d_ _[n]_
_g_ [−] _[g][d]_
_._ (5.22)



. _psms_




_gd_ _,_ _[g][d]_ _[n]_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




= _[g][d]_ [!]

_gd_ _[g][d]_




= _[g][d]_ [!]



Correspondingly, the expected time cost . _Tssbu_ of broadcasting the proper seeds of all
segments in the category . _u_ is



⎛



_gs_
. _Tssbu_ = _gdU_ _[L]_




~~�~~
_psms_ _gd_ _,_ _[g][d]_ _[n]_



1
⎝ ~~�~~




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎞


⎠ _Td_ _._ (5.23)



Therefore, the (5.17) can be rewritten by substituting with (5.18) (5.21) and (5.23):



⎛



⎞



��

_Td_



. _Tu_ = _[n][s][ N][c]_

_U_




~~�~~
_psms_ _gd_ _,_ _[g][d]_ _[n]_



1
⎝ _Cu_ + ~~�~~




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎞

   -    ⎠ _Tcpu_ + _ggd_ _sU_ _[L][(][D][)]_ [ +] _[ L][(][ f][se][g][u][ )]_ [ +] _[ L][(][C][u][)]_ [ +] _[ L]_ _gdgn_



⎛



⎞



+ _gs_
_gdU_ _[L]_




~~�~~
_psms_ _gd_ _,_ _[g][d]_ _[n]_



1
⎝ ~~�~~




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎠ _Td_ _._ (5.24)



Recall the operation of . _L(_ - _)_, we make the following settings for the analysis feasi
                 -                 -                 -                 bility: .max { _D_ } = 3 _fsegu_ _gdU_ _/gs_, .max _nqu_ = 3 _gd_ _n/g_, .max _fsegu_ = _fsegu_, . max { _Cu_ } =
_Cu_ . Thus, the expression (5.24) can be expanded as



⎛



. _Tu_ [∗] [=] _[n][s][ N][c]_

_U_



1
⎝ _Cu_ + ~~�~~




~~�~~
_psms_ _gd_ _,_ _[g][d]_ _[n]_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[g][d]_ _[n]_

_g_




- ��
_gd_ _n_
_g_ _Td_



⎞

   ⎠ _Tcpu_ + log2 _( fsegu )_ + log2 _(Cu)_ + log2


⎞



⎛



+ _gs_
_gdU_ [log][2]



⎝ 3 ~~�~~ _fsegu_ _gdU_




~~�~~ _u_
_gs psms_ _gd_ _,_ [3] _[g][d]_ _[n]_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎠ _Td_ _._ (5.25)



And we thus have the expected overall execution time of all categories at the side of the
reader as follows:



⎛



1
⎝ _Cu_ + ~~�~~




~~�~~
_psms_ _gd_ _,_ _[g][d]_ _[n]_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎞


⎠ _ns NcTcpu_



. _Tr_ _ _whole_ =




- _U_

_Tu_ [∗] [=] _[ UT]_ _u_ [ ∗] [=]
_u_ =1




- _U_




 - + log2 _( fsegu )_ + log2 _(Cu)_ + log2 _gd_ _n_

_g_



��
_UTd_ + _g_ _[g]_ _d_ _[s]_ log2



⎛




~~�~~ _u_
_gs psms_ _gd_ _,_ [3] _[g][d]_ _[n]_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_



⎝ 3 ~~�~~ _fsegu_ _gd_ _U_




~~�~~

_[d]_ _[n]_

_g_



⎞


⎠ _Td_ _._


(5.26)



Therefore, the expected overall execution time of our proposed .M [2] ID+ is expressed as


118 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems



⎛



��

_UTd_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎞

     ⎠ _ns NcTcpu_ + log2 _( fsegu )_ + log2 _(Cu)_ + log2


⎞




_gd_ _n_
_g_



. _Ttotal_ =



1
⎝ _Cu_ + ~~�~~




~~�~~
_psms_ _gd_ _,_ _[g][d]_ _[n]_



⎛



+ _g_ _[g]_ _d_ _[s]_ log2



⎝ 3 ~~�~~ _fsegu_ _gd_ _U_




~~�~~ _u_
_gs psms_ _gd_ _,_ [3] _[g][d]_ _[n]_




_[d]_ _[n]_ _[g][d]_ _[n]_

_g_ _[,]_ _g_




~~�~~

_[d]_ _[n]_

_g_



⎠ _Td_ + _gs_ _Ttag._ (5.27)



Obviously, . _Ttotal_ is determined by . _psample_, . _U_, . _fsegu_, an d . _gd_ . The key of achieving the best
time efficiency is to minimize . _Ttotal_ with the optimum values of these four parameters.

To this end, we first show the configuration of the sample ratio. _psample_ under the requirement of the detection. Second, we discuss the optimum number of the categories . _U_, the
optimum frame size for the segmentation . _fsegu_ in the category . _u_, and the optimum number
of the representative tags in each segment . _gd_ . Third, we derive the identical frame size for
the specific situation after the classification and the segmentation.


**(1) The optimum sampling ratio:** A smaller sampling ratio usually yields less time cost,
but the unbounded decreasing would make the detection unreliable. Consequently, we must
set an appropriate sampling ratio. The correct detection probability in the unstable channel
is expressed as

                  -                  - _Ma_
. _Pd_ = 1 − 1 − _psample Pm (_ 1 − _pe)_ _,_ (5.28)


where . _Pm_ is the probability of an arbitrary representative tag mapping to a singleton slot
in the response frame, . _pe_ is the probability of the bit inversion induced by the unstable
channel, and. _Ma_ is the threshold. Recall Sect. 5.5.2, we ensure the probability of an arbitrary
representative tag mapping to a singleton slot in the response frame is. 1. Consequently, given
the reliability requirement . _α_ and establishing . _Pd_ ≥ _α_, we ha ve



1
. _psample_ ≥ 1 − _pe_


which is the sampling ratio we need.




- 1 1 − _(_ 1 − _α)_ _Ma_ _,_ (5.29)



**(2) Configuring the number of the categories** . _U_, **the frame size used for the segmentation**

. _fsegu_, **and the number of the representative tags in each segment** . _gd_ **:** Recall (5.27), the
object moves to configure the number of the categories . _U_, the number of the representative
tags . _gd_ in each segment, and the frame size of the segmentation . _fsegu_ in each category to
minimize the execution time . _Ttotal_ . Because it is difficult to directly derive them, we have
to search for the optimum value of these parameters.

Let us start with the . _gd_ . We have shown in Sect. 5.4.4 that . _gd_ would be small with a
high probability because of the exponentially increasing rate. We set the range of . _gd_ as

.1 ≤ _gd_ ≤ 4. An d . _U_ should be set to ensure that each category contains the representative
tag(s), we thus have .1 ≤ _U_ ≤ _[g][s]_ [. The lower-bound of ] [.] _[ f][se][g]_ [is set as ] [.] _[g][s]_ [according to the]



_g_ _[g]_ _d_ _[s]_ [. The lower-bound of ] [.] _[ f][se][g][u]_ [is set as ] [.] _[g]_ _U_ _[s]_




_[s]_

_U_ [according to the]


5.5 M [2] ID+:The Improvement of M [2] ID 119


**Fig. 5.4** The parameters configuration when . _n_ = 1000 and . _g_ = 100


(5.20). The upper bound . _fsegu_ can be set if . _fsegu_ makes . _Cu( fsegu_ _, U_ _) <_ 2, which means
that the expected round of searching a proper seed for the segmentation is less . 2.

Now, that the range of these three parameters has been determined, we start to seek out
the proper values. We will take an example to explain the searching process with a system
consisting of .100 items and 10 tags on each item (i.e., a total of 1000 tags in the system),
as shown in Fig. 5.4. The period of the CPU is .0 _._ 27ns with the clock round of .344 doing
the hash function and the downlink transmission rate is .40 _._ 97kb/s. The curves in Fig. 5.4a
show the time cost with the different number of categories and the different frame size for
the segmentation. Note that it is adequate to show .1 ≤ _U_ ≤ 7 because the execution time
soars for . _U_ _>_ 6. More specifically, the curves at the different . _gd_ in Fig. 5.4b show the time
cost with the different number of categories under the corresponding optimum. _fsegu_ . Hence,
we can obtain the optimum parameters as follows: The number of the representative tags in
each segment . _gd_ [∗] [=][ 1, the frame size][ .] _[ f]_ [ ∗] _segu_ [=][ 35 used for the segmentation of a category][ . ] _[u]_ [, ]
and the number of the categories . _U_ [∗] = 5.

As mentioned in Sect. 5.5.2, the optimum parameter configuration for the sample, the
classification, and the segmentation can be calculated offline and can be recorded in the
reader’s storage. The reader will select the proper configuration from the storage once the
system input is fixed.


**(3) The identical frame size of the seed searching for each segment:** Before the classification and the segmentation, the expected number of the tags segmented into the. _q_ -th segment

            -            of the category . _u_ is .E _nqu_ = _ngd_ _/g_ under the fixed . _gd_ . After that, the true number of the
tags . _nqu_ might be different, which results in directly using the . _nqu_ = _gd_ _n/g_ is inefficient.

For the category . _u_ after the classification and the segmentation, the number of segments
is . _ru_ under the fixed . _gd_ . The expected cost of the seed searching for all segments is


120 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems



. _Tss_ [∗] _u_ [=]




- _ru_


_q_ =1



_n_ ~~�~~ _qu_ _NcTcpu_ ~~�~~ _._ (5.30)
_psms_ _gd_ _, nqu_ _,_ _fsu_



The difference . _fsu_ between (5.17) and (5.30) is that the former is an expected value used
to set . _U_, . _gd_ and . _fsegu_ while the latter optimum based on the true value of the . _nqu_ . Now, our
objective is to minimize the (5.30) with a proper . _fs_ [∗] _u_ [. We ha ve]




- _gd_ - _nqu_




- _gd_ - _nqu_ −1



_∂_ _Tss_ [∗] _u_ _d_

. = _[N][c][T][cpu][g][g][d]_

_∂_ _fsu_ _gd_ !




- _ru_


_qu_ =1




 _gd_ [2] 1 − _[g]_ _f_ _[d]_




~~�~~
_fs_ [2] _u_ _gfsud_



_fsu_




~~�~~
_fs_ [2] _u_ _gfsud_




~~�~~ _gd_ _._



_fsu_




 - _gd_ - _nqu_ - - [�]

~~�~~ _gd_ +1 + _gd_ _gd_ - _nqu_ ~~�~~ 1 _g_ - ~~�~~ _g_ _[g]_ _fsd_ _[d]_ _u_



(5.31)

      - _ru_

The result is o when . _fs_ [∗] _u_ [=] _r_ [1] _u_ _qu_ =1 _[n][q]_ _u_ [. Thus, the proper frame size] [.] _[ f]_ [ ∗] _su_ [of the category] [. ] _[u]_

is fixed.

We next take an example to explain .M [2] ID+. Our system is shown in Fig. 5.5. The
configuration i s. _gd_ = 1,. _U_ = 2 and all tags are sampled. Then, the tags in the category 1 are
divided into 5 segments with the . _fseg_ 1 = 7 and the reader searches the proper seed for each
segment with the identical frame size . _fs_ 1 = 3. Finally, only the representative tags respond


**Fig. 5.5** Illustrating .M [2] ID+ with 7 items each attached by 3 tags


5.6 Performance Evaluation 121


for the missing item detection, and all the slots in the response frame are singleton, that said
the utilization ratio of the slots to identify the representative tags reaches .100%. The tags in
the category 2 would repeat the above process.


**5.6** **Performance Evaluation**


We evaluate the performance of the proposed .M [2] ID and .M [2] ID+ in terms of the detection
probability and the execution time, and compare their performance with the most related
work named BPI [ 11] that uses bloom filter to identify the tags in the multi-tagged RFID
systems. The timing parameters in the simulation follow the EPC-global Gen2 standard

[ 13]. Specifically, the transmission rate is.40 _._ 97kb/s, and a broadcast slot and a response slot
are . _Td_ = 24 _._ 4 _μ_ s and . _Ttag_ = 290 _._ 8 _μ_ s, respectively. Furthermore, the number of the rounds
accomplishing once hash function is . _Nc_ = 344 [ 15] and the period of the CPU’s clock is

. _TC PU_ = 0 _._ 27ns. The parameters like the sampling ratio and the number of representative tags
in each segment are set from the analysis. The results are obtained from .1000 independent
runs.

**Performance Verification:** We evaluate the proposed protocols under five scenarios. In
the simulation, the threshold of the missing items is set to. _Ma_ = 2 and the required detection
reliability varies from. _α_ = 95% to. _α_ = 99% in the first two scenarios and is fixed to. _α_ = 95%
in the third scenario. In the fourth scenario, we set. _α_ = 100% and. _psample_ = 100% to enable
the tag identification of .M [2] ID+, and we show the superior time efficiency of the proposed
protocols compared with the state-of-the-art BPI [ 11]. The above simulations work in the
ideal channel, i.e., . _pe_ = 0. Therefore, the detection probability equals to the ratio of the
correct detection. In the last simulation, we verify the effectiveness of the proposed protocols
under the unstable channel, and the ratio of the correct detection is set as . _α_ = 95%.
(1) In the first scenario, there exists 10 tags on each item and the number of the tags varies
from .1 _,_ 000 to .5 _,_ 000. The simulation results of the detection probability and the execution
time are depicted in Fig. 5.6. The results show that the proposed .M [2] ID and .M [2] ID+ can
satisfy the requirement of the detection reliability. Yet, these two protocols have to spend
more time on finding a missing item event as the number of the tags in the system increases
when there would be more representative tags leading to the longer time cost of the seed
searching and the parameters broadcasting. We can also observe that .M [2] ID+ is more timeefficient. As shown in Fig. 5.6c, .M [2] ID+ is faster 3x than .M [2] ID when the number of the
total tags is 5000.
(2) In the second scenario, we investigate the impact of the number of tags on one item on
the detection probability and the execution time. To this end, we set the total number of the
tags in the system as .1 _,_ 000, and vary the number of the tags on each item from 2 to 10.
We can draw from Fig. 5.7 similar conclusions as in the first scenario that both .M [2] ID and

.M [2] ID+ can achieve the required reliability, but the latter is more time-efficient and the gain
is 2x at least.


122 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


**Fig. 5.6** The detection probability and the execution time versus the number of the total tags with

. _α_ = 95% and . _α_ = 99%


(3) In the third scenario, we show the impact of the system scale on time efficiency. The
experiment consists of two cases: The first case witnesses 10 tags on each item while the
number of the total tags varies from .5 _,_ 000 to .30 _,_ 000; The second case has .30 _,_ 000 tags
while the number of the tags on each item changes from 2 to 10. They indicate the change of
the number of items. We can observe from Fig. 5.8 that both .M [2] ID and .M [2] ID+ spend more
time as the system scales up, but the increasing speed of .M [2] ID+ is significantly slower.
(4) In the fourth scenario, we compare the proposed protocols with the state-of-the-art
solution BIP. To this end, we set the sample ratio in.M [2] ID+ to.100%. Figure 5.9a shows tha t

.M [2] ID+ is most time-efficient and .M [2] ID+ is faster than BIP when the number of the tags
with the change of the item population. Similarly, Fig. 5.9b depicts the execution time when
the total number of the tags is .30000 and the number of the tags on each item varies from
2 to 10. Similarly, .M [2] ID+ spends least time among these three protocols. From Fig. 5.9,


5.6 Performance Evaluation 123


**Fig. 5.7** The detection probability and the execution time versus The number of the tags on each
item with . _α_ = 95% and . _α_ = 99%


**Fig. 5.8** The time efficiency versus the system scale under . _α_ = 95%: **a** Case 1 with the number of
the total tags varied from 5000 to 30000 and 10 tags on each item; **b** Case 2 with the number of the
tags on each item varied from 2 to 10 and 30000 tags in total


124 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


**Fig. 5.9** **a** The execution time with the number of the total tags varied from 1000 to 30000 and the
number of the tags on each item is set to 10. **b** The execution time with the number of the tags on
each item varied from 2 to 10 and the number of the total tags is set to 30000


.M [2] ID+ is still the most effective among them and.M [2] ID+ achieves at least 4x performance
gain compared with BPI.
(5) In the fifth scenario, we verify the effectiveness of our proposed protocols in the unstable
channel where the downlink works in error-free and the probability of bit inversion in the
uplink is from . _pe_ = 0 _._ 1 to . _pe_ = 0 _._ 2. Figure 5.10 illustrates that 10 tags on each item while
the number of the total tags varies from .1 _,_ 000 to .5 _,_ 000 with different . _pe_ . The ratio of the
correct detection degrades in.M [2] ID but still satisfies the requirement of the correct detection.
The execution time of .M [2] ID+ grows with the increasing . _pe_ since .M [2] ID+ has to increase
the sample ratio to guarantee the correct detection.


**5.7** **Conclusion**


This chapter has addressed a variation on the missing item event detection problem arising
from multi-tagged items in RFID systems. The application of the prior works to the new
problem suffers low time efficiency due to repeated checks of one item. To overcome this
drawback, we have provided two solutions, namely.M [2] ID and.M [2] ID+, from the perspective
of the trade-off between the computation and the communications. They have used the seed
selection to ask a subset of the tags in systems to report their presence while .M [2] ID+ can
achieve both probabilistic detection and deterministic identification. We have also derived the
optimum parameters under the unstable channels. The simulation results have confirmed the
superiority in terms of time efficiency under the required detection reliability to the existing
state-of-the-art solution.


References 125


**Fig. 5.10** The ratio of the correct detection and the execution time versus the error probability of the
uplink with . _pe_ = 0 _._ 1 and . _pe_ = 0 _._ 2


**References**


1. C. C. Tan, B. Sheng, Q. Li, How to monitor for missing rfid tags, in _IEEE ICDCS_ (2008),
pp. 295–302
2. W. Luo, S. Chen, T. Li, Y. Qiao, Probabilistic missing-tag detection and energy-time tradeoff in
large-scale rfid systems, in _ACM MobiHoc_ (2012), pp. 95–104
3. W. Luo, S. Chen, Y. Qiao, T. Li, Missing-tag detection and energy-time tradeoff in large-scale
rfid systems with unreliable channels. IEEE/ACM ToN **22** (4), 1079–1091 (2014)
4. M. Shahzad, A. X. Liu, Expecting the unexpected: Fast and reliable detection of missing rfid
tags in the wild, in _IEEE INFOCOM_ (2015), pp. 1939–1947
5. J. Yu, L. Chen, R. Zhang, K. Wang, Finding needles in a haystack: Missing tag detection in large
rfid systems. IEEE TCOM **65** (5), 2036–2047 (2017)


126 5 Fast and Reliable Access Protocol for Multi-Tagged RFID Systems


6. J. Yu, L. Chen, R. Zhang, K. Wang, On missing tag detection in multiple-group multiple-region
rfid systems. IEEE TMC **16** (5), 1371–1381 (2016)
7. J. Yu, W. Gong, J. Liu, L. Chen, K. Wang, R. Zhang, Missing tag identification in cots rfid
systems: Bridging the gap between theory and practice. IEEE Trans. Mobile Comput. **19** (1),
130–141 (2019)
8. T. Li, S. Chen, Y. Ling, Identifying the missing tags in a large rfid system, in _Proceedings of the_
_eleventh ACM international symposium on Mobile ad hoc networking and computing_ (ACM,
2010), pp. 1–10
9. R. Zhang, Y. Liu, Y. Zhang, J. Sun, Fast identification of the missing tags in a large rfid system,
in _2011 8th Annual IEEE Communications Society Conference on Sensor, Mesh and Ad Hoc_
_Communications and Networks_ (IEEE, 2011), pp. 278–286
10. X. Liu, K. Li, G. Min, Y. Shen, A.X. Liu, W. Qu, Completely pinpointing the missing rfid tags
in a time-efficient way. IEEE ToC **64** (1), 87–96 (2015)
11. X. Xie, X. Liu, H. Qi, K. Li, Fast identification of multi-tagged objects for large-scale rfid
systems. IEEE Wireless Commun. Lett. **8** (4), 992–995 (2019)
12. J. Yu, W. Gong, J. Liu, L. Chen, K. Wang, On efficient tree-based tag search in large-scale rfid
systems. IEEE/ACM ToN **27** (1), 42–55 (2019)
13. _EPC radio-frequency identity protocols Class-1 Generation-2 UHF RFID Protocol for commu-_
_nication at 860 MHz - 960 MHz_ . EPC, 2.0.1 ed., (2015)
14. J. Yu, P. Zhang, L. Chen, J. Liu, R. Zhang, K. Wang, J. An, Stabilizing frame slotted aloha based
iot systems: A geometric ergodicity perspective. IEEE JSAC **39** (3), 1–12 (2020)
15. M. O’Neill et al., Low-cost sha-1 hash function architecture for rfid tags. RFIDSec **8**, 41–51
(2008)


**Practical Hashing-Free Access Implementation**
## **6**
**with COTS RFID Systems**


This chapter presents schemes for detecting all missing tags in COTS RFID systems. Prior
works on missing tag detection have predominantly relied on hash functions implemented
at individual tags. However, in practice, COTS RFID tags do not support hash functions. To
bridge this gap between theoretical approaches and practical implementation, this chapter
focuses on detecting missing tags with COTS Gen2 devices. We first introduce a pointto-multipoint protocol, named P2M, which operates within an analog frame-slotted Aloha
paradigm to interrogate tags and collect their electronic product codes (EPCs). A tag is
identified as a missing tag if its EPC is absent from the collected data. To mitigate the time
cost associated with tag response collision in P2M, we further present a collision-free pointto-point protocol, named P2P, which selectively specifies a tag to respond with its EPC in
each slot. If the EPC is not received, the tag is considered missing. We have developed two
bitmask selection methods to enable selective querying while minimizing communication
overhead. Both P2M and P2P protocols have been implemented using COTS RFID devices,
and their performance has been evaluated under various settings.

**Chapter roadmap:** The rest of this chapter is organized as follows. Section 6.1 highlights
the importance of studying missing tag identification with COTS Gen2 devices. Section 6.3
reviews the system model and the problem statement. In Sect. 6.4, we introduce the P2M
on Gen2-compatible protocol to identify missing tags, estimate the time consumption, and
induct the parameter configuration. The P2P to singularize tags in every slot, avoiding
collision events while improving time efficiency, is proposed in Sect. 6.5. In Sec t. 6.6, we
evaluate the performance of the proposed missing tag identification protocols with the COTS
Gen2 devices. Section 6.2 briefly summarizes the existing missing tag monitoring protocols.
Finally, we summarize the contributions of this chapter in Sect. 6.7.



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_6](https://doi.org/10.1007/978-3-031-93034-8_6)



127


128 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**6.1** **Introduction**


To enable worldwide commercial implementation of RFID, the EPC-global, an organization
that was formed in 2003, developed the Gen2 air interface protocol [ 1] for ultra-highfrequency (UHF) RFID systems. This protocol has been adopted as the ISO 18000-6C
standard and has become mainstream specification worldwide for commercial off-the-shelf
(COTS) RFID devices like ImpinJ [ 2] and ThingMagic series [ 3]. A Gen2 RFID system
comprises two types of devices: passive RFID tags and RFID reader. A passive tag is a
lightweight battery-free device that can record information of a physical object and is able
to capture the energy in the wireless signal of its nearby RFID reader and modulate this
signal by adjusting the impedance match on its antenna so that a message of zeros and ones
is back-scattered to the reader.

Identifying missing tags, which is to completely pinpoint the tags that should be in the
coverage range of the reader but are absent, is one of the most important RFID-enabled
services. According to the statistics presented in [ 4], inventory shrinkage, a combination of
shoplifting, internal theft, administrative and paperwork error, and vendor fraud, resulted
in about .49 billion dollars in loss for retailers in .2016. In this context, RFID provides a
promising technology to reduce financial loss by deploying a reader to monitor passive tags
attached to products in its coverage range and conducting missing tag identification regularly
to find missing items in time.

The study of missing tag identification was initiated in the research community about 10
years ago, and ever since then ten-year effort has been dedicated to reducing communication
overhead, producing a large body of work. However, none of the previous work is compatible
with the Gen2 standard so they cannot be implemented in practice, which leaves billions
of deployed COTS tags behind. The failure of the prior work mainly results from the two
reasons:


1. _Hashing-dependent slot selection_ : Prior work on missing tag identification requires the
functionality of hashing in tags so that each tag can select and respond in a random but
predictable slot corresponding to the hash value of its electronic product code (EPC) and
a random seed. While the hashing functionality has never been implemented in any COTS
tags high energy consumption and manufacturing costs will be incurred otherwise (e.g.,
over 1,000 gate equivalents for hardware), which is contradictory to what is expected of
RFID.
2. _Complete visibility for slot states_ : Prior work must definitely know the states of each
slot, e.g., empty and busy, which depends on the number of one-bit responses from tags
in this slot and exploits the empty slots that should be busy to identify missing tags.
While a COTS Gen2 reader only reports successful reads in a time interval, disabling the
utility of empty slots. Hence, the previous work cannot be implemented in COTS RFID
devices.


6.2 Related Work 129


Motivated by the observations above, we argue that a systematical study on missing tag
identification with COTS Gen2 devices is called for to maximize the function of widely
deployed Gen2 RFID systems and to reduce financial losses.

In this chapter, we develop two protocols named point-to-multipoint (P2M) and point-topoint (P2P). We implement P2M and P2P in extensive scenarios using COTS Gen2 devices:
one ImpinJ reader and 20 ImpinJ Monza tags. The results show that P2P achieves time
efficiency gains of about 4x and 6x over P2M on average in the identification of all missing
tags and the detection of the first missing tag. We also confirm the correctness of bitmask
selection approaches of P2P in larger systems.


**6.2** **Related Work**


In this section, we briefly summarize the existing missing tag monitoring protocols that can
be classified into two categories: probabilistic detection and deterministic identification.

**Probabilistic missing tag detection:** This type of protocol detects a missing tag event
with a predefined probability. Tan et al. initiate the study of missing tag detection and propose
a solution called TRP in [ 5]. To detect a missing tag event, TRP first builds a virtual bitmap
by using a hash function to predict the response slots of tags and compares it with actual
slot states measured from the response of the tags in the population. If an expected busy
(singleton or collision) slot turns out to be empty, then the tag(s) corresponding to this slot
are regarded to be absent. Because the probability of a collision slot having only missing tags
is very low when the missing tag size is small, collision slots are less useful than singleton
ones. Given the importance of singleton slots, follow-up works [ 6, 7] employ multiple seeds
to tune empty and collision slots to singleton slots, which increases the detection probability
and thus improves time efficiency. Subsequently, the existence of unknown tags would make
an empty slot a missing tag mapped to become busy and will interfere with the detection.
To deal with the interference, the work [ 8] and Yu et al. [ 9] expand the frame size in the
detection with unknown tag size and design Bloom filter from the known tags to depress
the unknown ones, respectively. Consider a different kind of application scenario, Yu et al.

[ 10] designed several Bloom-filter-based approaches to detect missing tags in RFID systems
where multi-category tags are distributed in multiple regions. More recently, Yang et al. [ 11]
developed an on-tag hashing function that needs to write offline calculated hash values to
all tags, and illustrate how to use this function to probabilistically detect missing tags.

**Deterministic missing tag identification:** Deterministic protocols are to exactly identify
which tags are absent. Li et al. develop a series of identification protocols in [ 12] to reduce
the time cost step by step by reconciling 2-collision slots and iteratively deactivating the
tags of which the presence has been verified, respectively. Zhang et al. propose identification
protocols in [ 13] which store and compare the bitmaps of tag responses in all rounds and
look for changes at the corresponding bits among all bitmaps to determine the present
and absent tags. Liu et al. [ 14] essentially combine the multi-seed method in [ 6] with the


130 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


deactive-based method in [ 12] to improve the identification performance. Subsequently, Liu
et al. [ 15] further enhance the prior work by reconciling both 2-collision and 3-collision
slots and filtering the empty and unreconcilable collision slots to improve time efficiency.
Recently, physical-layer information is exploited to accelerate missing tag identification.
Zheng et al. [ 16] measure changes in signal strength in each slot and models missing tag
identification using Compressing Sensing, which reduces time cost toward the same order
of magnitude as the missing tag population. In contrast, Chen et al. [ 17] uses changes in
signal strength in each slot to construct a Bloom filter, which can achieve a similar time
efficiency while handling an arbitrary number of missing tags.

Compared with the previous work, the novelty of this chapter lies in that we design
bitmask selection methods and conduct deterministic missing tag identification using COTS
RFID devices without the requirement for hash functions at tags and for writing hash values
to tags.


**6.3** **System Model and Problem Statement**


A typical Gen2 RFID system consists of a reader and multiple passive tags. The reader can
charge, synchronize, and collect information from tags, while tags each having an EPC are
usually attached to physical objects, producing a one-on-one map between a tag and an
object. To interact with battery-free tags, the reader initially transmits a continuous wave to
the tags. The tags capture energy from the incoming wave to power themselves on one hand
and use this wave as a carrier to backscatter their information bits with ON-OFF keying on
the other hand. Specifically, the tags send a ’1’ bit by adjusting the impedance match on
their antennas to reflect the reader’s wave and a ’0’ bit by remaining silent [ 18].

**The Missing Tag Identification Problem:** Consider a Gen2 system containing a reader
and . _n_ tags .{ _x_ 1 _, x_ 2 _,_ - · · _, xn_ } and that the reader knows all tag EPCs, there exists an event
that . _m_ out of the . _n_ tags are missing due to the damage of these tags or the disappearance of
their corresponding objects. _The missing tag identification problem is to exactly find the_ . _m_
_missing tags._ In this problem, execution time which is measured as the time spent achieving
the task is the most important metric. The earlier missing products are found, the more
significantly financial loss is reduced.

**Limitations of prior work:** A large body of work is proposed to accelerate the identification process on top of the assumption that response slots of tags are predictable via hashing
operations. Though the works are promising in improving time efficiency, the reality is that
the widely deployed Gen2 tags cannot support the hash function that is the prerequisite of
these works. Moreover, no manufacturer declares that the hash function will be packaged
into commercial tags in the near future.

**Why is the hashing functionality not supported by COTS tags?** The main reason lies
in the high energy consumption and manufacturing cost introduced by the hardware design


6.4 P2M:Point-to-Multipoint Missing Tag Identification 131


of the hash function. [1] In particular, thousands of gate equivalents are required for current
common hash functions, such as SHA-1 and SHA-256 [ 19] require 8,120 and 10,868 gate
equivalents with power consumption 10.68. _μA_ and 15.87. _μA_, respectively. Even the most
compact hash function that is presented in theory and is not available for COTS tags, e.g.,
PRESENT-80 [ 20], still requires 1,075 gate equivalents. Considering the huge market of
RFID (e.g., .1 _._ 82 × 10 [10] tags in 2017), enabling hash function in tags will incur extremely
high costs.

**The proposed solutions without the requirement of the hash function.** It is still an open
question of how to identify all missing tags without the hash function in the Gen2 system.
To bridge this gap, we design two Gen2-compatible missing tag identification protocols by
using commands specified in the Gen2 standard, such as. _Q_ -command and _Select_ command.
As our protocols can be implemented in COTS RFID devices, they can be used to identify
missing items in RFID-deployed scenarios like Walmart [ 21] and River Island [22], to reduce
or even avoid financial loss resulting from product missing event.

In what follows, we describe P2M that behaves in a point-to-multipoint manner with the

. _Q_ -command used to query all tags in the system. We then show the second work, namely
P2P, which ensures point-to-point communication in each slot with an exclusive bitmask
and avoids empty and collision slots.


**6.4** **P2M: Point-to-Multipoint Missing Tag Identification**


In this section, we introduce the first Gen2-compatible protocol, the point-to-multipoint . _Q_ query, and its application to identify missing tags, and then show the parameter configuration
and time cost computation.


**6.4.1** **Point-to-Multipoint** . _**Q**_ **-Query**


The Gen2 standard specifies how the reader interrogates tags. First, the reader sends a _Query_
command to initiate the interrogation. This command contains backscatter link frequency
(BLF), tag-to-reader encoding method, and a . _Q_ parameter used to specify the number of
slots in this query round. With the parameter. _Q_, each tag is able to determine its response slot
by selecting a random value in.[0 _,_ 2 _[Q]_ - 1 _)_ as its slot counter. If this counter is equal to 0, the
tag replies immediately with a 16-bit random number (RN16); otherwise, it shall keep silent.
Upon receiving an _RN16_ from a tag, the reader transmits an _ACK_ containing the decoded
_RN16_ to acknowledge this tag. If the tag confirms the correctness of the reader-to-tag _RN16_,
the tag will backscatter its _EPC_ to the reader. Subsequently, the reader issues a _QueryRep_ to
instruct tags to decrement their slot counters and the tags whose counters are equal to 0 reply


1 Gate equivalent is a key performance metric in evaluating the efficiency and availability of a hardware
design. The more gate equivalents are required, the higher the implementation overhead and cost are.


132 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Fig. 6.1** Link timing of P2M communications. The Gen2 standard has strict requirements for each
command format and link timing parameters T. 1, T. 2, and T. 3 that stand for an interval-command time,
enabling the computation of overall interrogation time


with another _RN16_, indicating the start of a new slot. [2] Figure 6.1 illustrates the . _Q_ -query
process and shows that there is waiting time between two continuous commands like. _T_ 1,. _T_ 2,
and . _T_ 3.

Since the reader can collect all EPCs of the tags present in its coverage via the. _Q_ -query, it
compares the collected EPCs with the ones recorded in the database. If some recorded EPCs
are not present in the collected EPC set, these tags are missing and can thus be identified
by the reader. This comparison is conducted at the end of the . _Q_ -query. P2M is superior to
the existing works since they need the knowledge of all slot states which cannot be obtained
from a COTS reader. The main question in P2M is when the . _Q_ -query should be terminated.


**6.4.2** **Encoding Methods**


The quest for low cost, tiny size, and battery-free tags severely limits their computation
and hardware capabilities. It is thus important and necessary to encode and decode data in
an extremely simple and robust way. In practice, the reader-to-tag symbols are amplitudemodulated pulse interval encoding (PIE) symbols which an analogy comparator is adequate
to decode. As shown in Fig. 6.2, symbol ’0’ in PIE comprises two intervals of the same length,
namely power-on and power-off (PW: pulse width). Tari (Type A reference interval) is the
duration of data-0, while the duration of data-1 is as long as. _x_ ∈[0 _._ 5 _,_ 1] times of data-0. The
Tari values can be set as 6.25, 12.5, or 25. _μ_ s corresponding to the rates 160, 80, and 40 kbps.
Different from the lightweight tags, the reader has the strong decoding capacity. The Gen2
standard specifies four encoding method for the tag-to-reader link, FM0, M2 (Miller2), M4
(Miller4), and M8 (Miller8). The data rate depends on the BLF and the encoding method. For
example, if BLF is 320 kHz, the data rates of FM0, M2, M4, and M8 are 320/1, 320/2=160,
320/4=80, 320/8=40 kbps, respectively. [3]


2 The counter of a tag in the . _Q_ -query measures the number of slots before it replies, thus setting a
value to a tag’s counter is equivalent to assigning a slot to this tag.
3 The reader sets and packages the parameters, including encoding type and BLF, into a query command, and sends the command to tags.


6.4 P2M:Point-to-Multipoint Missing Tag Identification 133


**Fig. 6.2** Data encoding in the Gen2 standard


**6.4.3** **Configuration of the Parameter** . _**Q**_


From the description of the . _Q_ -query, we can observe that it is a random access process in
nature, with tags randomly setting their individual counters at the beginning of the interrogation. The reader cannot predict the values picked by the tags. Consider an arbitrary slot . _i_,
there would be three states:


- If there is only one tag replying, i.e., this tag uniquely picks the value . _i_, it is a singleton
slot;

- if there are multiple tags replying, i.e., these tags pick the value . _i_, it is a collision slot;

- if there is no tag replying, i.e., no tag selects the value . _i_, it is an empty slot.


We make an illustration in Fig. 6.1 where one tag replies in the first slot and then two tags
and no tag respond in the second and the third slots, respectively.

Among these states, only singleton slots are useful for EPC collection while collision
and empty slots are useless, thus a natural optimization criterion is to ensure with a high
probability that there exist . _n_ singleton slots in the interrogation, meaning that no collision
occurs. Technically, the . _Q_ -query process can be formulated as the classic Ball-into-Bins
problem [ 23]. Specifically, . _n_ tags are balls and .2 _[Q]_ values (or slots) are bins. To avoid
collisions with high probability,.2 _[Q]_ needs to be set to. _�(n_ [2] _)_ [ 24]. Guided by this theoretical
result, we set . _Q_ to .2 log _n_ where .log denotes the logarithm to the base 2. Under such
configuration, the . _Q_ -query lasts . _n_ [2] slots.

By this setting, it is adequate for our point-to-multipoint protocol to know singleton slots,
which fits well in today’s COTS devices. In contrast, we note that existing works require the
reader to report empty slots, which is unsupportable in the current COTS devices.


134 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**6.4.4** **Calculation of the Interrogation Duration**


As shown in Fi g. 6.1, the three types of slots differ in their slot duration. Thus the first step
in the interrogation duration computation is to figure out the number of slots in each type.
Recall that we set. _Q_ = 2 log _n_ to ensure no collision and that there are. _m_ missing tags, there
would be. _n_ - _m_ singleton slots and. _n_ [2] - _n_ + _m_ empty slots in the interrogation. As a result,
the key is to compute the sizes of singleton and empty slots. To do so, we further zoom in
on each slot in Fig. 6.1, and obtain the following observations:


- Singleton slot size: A singleton slot is composed of an _RN16_, an _ACK_, an _EPC_, a nd the
inter-command time. _T_ 1 and. _T_ 2. Thus we can calculate a singleton slot size as. _ACK_  - Tari +
_RN16_ + _EPC_

BLF _/ j_ + 2 _(T_ 1 + _T_ 2 _)_ where. _j_ ∈{1 _,_ 2 _,_ 3 _,_ 4} indicates different tag-to-reader encoding
methods. [4]

- Empty slot size: An empty slot comprises two intervals of commands . _T_ 1 and . _T_ 3, thus its
length is equal to . _T_ 1 + _T_ 3.

- Inter-slot time: There is a _Query_ command in the beginning of the interrogation and a
_QueryRep_ between any two continuous slots, so the overall inter-slot time in the whole
interrogation should be . _(Query_ + _(n_ [2]  - 1 _)_  - _QueryRep)_  - Tari.


Following these observations, now we are able to formulate the overall interrogation

                                   
time of P2M is � . _(n_ - _m)_ - _(ACK_ - Tari + _[RN16]_ BLF [+] _/_ _[EPC]_ _j_ + 2 _(T_ 1 + _T_ 2 _))_ + _Query_ + _(n_ [2] - 1 _)_ 
_QueryRep_ - Tari + _(n_ [2] - _n_ + _m)(T_ 1 + _T_ 3 _)_ .


**6.5** **P2P: Point-to-Point Missing Tag Identification**


Our first proposition presented previously follows the point-to-multipoint paradigm. Due to
its random nature, multiple tags may reply with _RN16_ simultaneously, leading to decoding
failure for the reader. To deal with tag collisions, P2M sets . _Q_ to .2 log _n_, which results in
considerable empty slots and wastes time. To avoid collision events while improving time
efficiency, we propose P2P that performs as a point-to-point paradigm, which is able to
singularize tags in every slot. As shown in Fig. 6.3, the reader cannot control the response
slots of tags in P2M such that it suffers from collisions. In contrast, P2P can assign the reply
order and avoid collisions, such as tags 1-5 responding in slots 1 to 5 in sequence. In what
follows, we first elaborate on the missing tag identification process and then demonstrate
how to build effective and efficient bitmasks.


4 Either a preamble or a frame-sync will be prepended to every command, such as _RN16_, _EPC_, _ACK_,
_Query_, _QueryRep_ and _Select_ . In addition, tags reply PC (protocol control) and CRC along with their
_EPC_ s. We use these commands to represent their individual length plus the extra length (bits).


6.5 P2P:Point-to-Point Missing Tag Identification 135


**Fig. 6.3** Comparison of P2M (the left) and P2P (the right) for multiple tags. P2M would waste some
slots that are collided (slots 4 and 5) or empty (slots 1, 3, 6, and 7). While P2P can selectively read
tags and only needs five slots


**6.5.1** **Point-to-Point Selective Query**


The Gen2 standard provides a command _Select_ that allows the reader to selectively read
a subset of tags based on user-defined criteria. As shown in Fig. 6.4, the selective query
includes two phases: tags filtering and tag query. First, the reader issues a _Select_ that specifies
a bitmask and an action that will be performed by the tags. On receiving _Select_, each tag
checks whether it matches the reader-to-tag bitmask. If yes, it will assert its flag variable SL;
otherwise, it will deassert the SL. By carefully designing the bitmask, we can ensure only
one tag can pass the bitmask comparison, which will be presented shortly. Then the reader
further sends a _Query_ that specifies the tags with asserted SL to reply. Since only one tag
meets the requirement in P2P, this tag is the only one replying to the _Query_ with its _RN16_ .
Subsequently, the reader transmits _ACK_ with the decoded _RN16_ and prepares to receive the
_EPC_ of this tag. When this query finishes, the reader will repeat the above process to read
the tags one by one.

The desired property of P2P is its capacity to specify an individual tag to reply. If there
is no response from this tag, the reader will know its absence. As a result, P2P can identify


**Fig.6.4** Link timing of P2P communication where the black points represent tags. The Gen2 standard
has strict requirements for each command format and link timing parameters T. 1, T. 2, and T. 4 that stand
for an interval-command time, enabling the computation of overall interrogation time


136 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


all . _m_ missing tags after . _n_ selective queries. Moreover, P2P can also detect a missing tag in
at most . _n_ - _m_ selective queries.


**6.5.2** **Calculation of the Overall P2P Execution Time**


As shown in Fig s. 6.1 and 6.4, the length of a P2P selective query on a present tag contains a _Select_, . _T_ 4, a _Query_, and a singleton slot whose length is equal to that in P2M.
If a missing tag is queried, the components of this query duration are almost the same
as the prior except that slot duration becomes to empty slot size instead of singleton slot
size. Thus, recall Sect. 6.4.4, we know that it takes P2P time of . _(Select_ + _Query_ + _ACK)_ Tari + _[RN16]_ BLF [+] _/_ _[EPC]_ _j_ + _T_ 4 + 2 _(T_ 1 + _T_ 2 _)_ to achieve a selective query on a present tag, where

. _j_ ∈{1 _,_ 2 _,_ 3 _,_ 4} indicates different tag-to-reader encoding methods . [4] . As a consequence,

                    the overall time cost of P2P is � . _(n_ - _m)_ _(Select_ + _Query_ + _ACK)_ Tari + _[RN16]_ BLF [+] _/_ _[EPC]_ _j_ + _T_ 4 +

2 _(T_ 1 + _T_ 2 _)_ + _m_ - _((Select_ + _Query)_ - Tari + _T_ 4 + _T_ 1 + _T_ 3 _)_ .
Having described the process of P2P, we next explain how _Select_, the key function in
P2P, is designed in our missing tag detection protocol.


**6.5.3** _**Select**_ **Function**


There are six mandatory fields in the _Select_ command as shown in Fig. 6.5, we introduce
five fields relevant to our design.


1. Action specifies eight types of tag behavior which are listed in Table 6.1. In our
scenario, we use the first type, i.e., .Action = 0002, to specify tag action. Specifically,
tags that match the received bitmask, called matching tags, will assert SL, while the other
tags, called not-matching tags, will deassert SL.
2. MemBank indicates which tag memory model a tag will search to compare with the
received bitmask. The .MemBank = 002 is reserved memory storing passwords associated with the tag. If .MemBank = 012 _,_ 102 _,_ 112 then the tag searches for the bitmask
in the EPC memory bank that stores the tag EPC, TID memory bank that specifies the
permalocked tag and manufacture specific information, and User memory bank that can


**Fig. 6.5** _Select_ command: .MemBank, .Pointer and .Length specify the bitmask position that the
tag needs to search in its memory; .Mask records the bitmask content that the tag will compare with


6.5 P2P:Point-to-Point Missing Tag Identification 137


**Table 6.1** Tag response to action

|Action code|Tag matching|Tag not-matching|
|---|---|---|
|.0002|AssertSL|DeassertSL|
|.0012|AssertSL|Do nothing|
|.0102|Do nothing|DeassertSL|
|.0112|NegateSL|Do nothing|
|.1002|DeassertSL|AssertSL|
|.1012|DeassertSL|Do nothing|
|.1102|Do nothing|AssertSL|
|.1112|Do nothing|NegateSL|



be written with user-defined data. We employ the EPC memory bank in this chapter, i.e.,

.MemBank = 012.
3. Pointer records a starting bit position in the chosen MemBank for the bitmask comparison.
4. Length specifies the bitmask length. If .MemBank = _M_, .Pointer = _p_ and

.Length = _l_ then the tag compares the bitmask with the bits starting from the . _p_ -th
bit to the . _(_ _p_ + _l_   - 1 _)_ -th bit in its memory model . _M_ .
5. Mask records the bitmask content that is a bit string. The tag compares it with the
specified bit string in its memory.


From the description above, we observe that the combination of .MemBank, . Pointer
and .Length specifies the position of the bit string that the tag needs to search for in its
memory while .Mask records the bitmask content that the tag will compare with the bit
string. Thus, we use . _BM_ to represent a bitmask, that is to say, . _BM_ = _(M, p,_ _l, Mask)_ .

In P2P, we build the bitmask from a tag EPC by setting .MemBank = 012. The EPC is
unique and has been stored in tags, thus P2P does not need to write new data to tags. We take
an example to further illustrate its application. As shown in Fig. 6.6, the reader sends a _Select_
specifying the EPC 1010 as the bitmask. [5] Upon receiving this command, each tag checks
the bit string from the first to the fourth bit in its EPC and compares it with the received one
in the Mask. Since only the gray tag meets the criterion, it will assert its SL and wait for
the incoming _Query_, while the others will keep silent. We present an implementation of this
example in Java in Fig. 6.7. As tag EPC starts from the 32nd bit in the memory, the pointer
in the implementation is set to 0x20.


5 Usually a Gen2 tag has a 96-bit EPC. In this example, we assume the EPC length is four for
simplicity.


138 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Fig.6.6** Illustration of a selective query in P2P. There are four tags with EPCs: 0101, 0110, 1010, and
0111, respectively. With the configuration: Action=.0002, Membank=.012, Pointer=.000000002,
Length=.000001002, Mask =.10102, the reader asks the tags to compare the bit string from the 1st
to the 4th bit in their individual EPCs with the content in Mask of the received _Select_ . [5]


**Fig. 6.7** Implementation of
_Select_ command in Fig. 6.6


So far we have introduced the framework of P2P and the _Select_ function, the final question
left is how to effectively and efficiently configure the bitmask, i.e., Mask. We attack the
configuration of bitmask in the next subsection.


**6.5.4** **Bitmask Selection**


Recall that in P2P, the reader seeks to distinguish a tag from the others in every slot. To do
so, a direct way is setting Mask to the tag EPC, as the toy example in Fig. 6.6. Although
such a configuration is effective, it suffers from low efficiency. Recall Fig. 6.5, a _Select_
command is 45-bit long excluding the Mask . [6] If we use 96-bit EPC in Mask which is
over two times of the other fields and over the two-thirds of the whole _Select_ . If we can
use a shorter Mask, the efficiency will be improved. For example, reconfiguring _Select_ in
Fig. 6.6 to Pointer=.000000002, Length=.000000012, Mask=.12 when the tags compare
the first bit of their EPCs with the Mask, we can make the gray tag the only one to meet the
requirement with 1-bit mask instead of previous 4 bits.

Inspirited by the example above, we exploit the potential of building a bitmask with a
portion of a tag EPC instead of the whole. Although 96. ∼496-bit EPC can be supported by
tags like ImpinJ Monza tags, we use 96-bit EPC in this chapter, but our work can be directly
used in the scenarios where EPC length is over 96 bits. We know that 96-bit strings can


6 The format of Pointer is an extensible bit vector that contains one or multiple 8-bit blocks. With
one block, it can represent numeric values between 0 and . 2 [7] . For the value over . 2 [7], it must add
another block. Since the EPC length used in this chapter is 96 bits, it is enough to use one block, that
is to say, field Pointer is 8-bit long.


6.5 P2P:Point-to-Point Missing Tag Identification 139


uniquely identify .2 [96] = 7 _._ 9 × 10 [28] tags at most. Since the number of the tags in a system is
usually much smaller than this quantity, the present EPCs in a Gen2 system are sparse compared with overall .2 [96] EPCs. We can exploit this sparsity to design more efficient bitmask
selection methods. Note that their efficiency is more significant for tags with longer EPC,
e.g., 496-bit EPC.


**A deterministic Bitmask selection algorithm**
We first design a deterministic algorithm, whose core idea is to use only a portion of a tag
EPC as bitmask so that only one tag matches. The fields Length and Pointer specify the
length and the starting position of the bit string in tag memory which will be compared with
the received bitmask, we denote them by. _l_ and. _p_, respectively. Since we select. _l_ consecutive
bits from an . _a_ log _n_ -bit EPC, . _l_ could be equal to a value between 1 to . _a_ log _n_, and there a re

. _a_ log _n_ - _l_ + 1 segments in all in an EPC corresponding to. _p_ = 0 : _a_ log _n_ - _l_ . For instance,
if . _l_ = 2 in Fig. 6.6, we have three segments for the gray tag from left to right, namely 10,
01, and 10. As a result, we can find an optimal bitmask in each slot, i.e., the shortest
bitmask that can make a tag singular in a slot, through the following three-dimensional
search (Algorithm 1). In the algorithm, . _x(_ _p,_ _l)_ denotes a string from the . _p_ -th bit to

. _(_ _p_ + _l_ - 1 _)_ -th bit in the EPC of tag . _x_ ; . _a_ = _[E PC]_ log _n_ [. The Algorithm, whose core steps are ]

explained below, outputs the shortest bitmask specifying Pointer, Length and Mask.


- First, let . _l_ = 1, and we arbitrarily pick one out of . _n_ tags.

- Second, given . _l_ and this tag EPC, we compare its first . _l_ -bit segment, i.e., the leftmost,
with those of the other . _n_   - 1 tags EPCs. If we find the segment unique, it can be used
as a bitmask and Pointer.= 000000002, then the searching process will be terminated;
otherwise, this tag is regarded useless temporally, and we choose another one from the

. _n_     - 1 tags to compare its first. _l_ -bit segment with those in the other. _n_     - 1 tags EPCs. This
step runs until either a unique . _l_ -bit segment is found or any two tags has compared with
each other.

- Third, if we fail to find a unique. _l_ -bit segment in the second step, we repeat the operations
in the second step with the second . _l_ -bit segment. If it succeeds this time, this segment is
assigned to Mask and Pointer is equal to.000000012; otherwise we set. _l_ = _l_ + 1. Th e
third step stops if a bitmask is found or . _l_ = _a_ log _n_ . If a bitmask is found, that is to say,
we can selectively query a tag matched this bitmask, then the algorithm keeps running
to look for a bitmask for another tag.


From the description above, we can interpret the three dimensions in our algorithm as
follows:


- Comparing between any two tags;

- Sliding Pointer . _p_ from 0 to . _a_ log _n_ - _l_ ;

- Incrementing . _l_ from . 1 to . _a_ log _n_ .


140 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Algorithm** **1:** Deterministic bitmask selection

**Input** : Tag se t . { _x_ 1 _, x_ 2 _,_  - · · _, xn_ }

**1** **Initialization:** . _l_ ← 1, . _N_ ←∅, . _j_ ← 0, . _S_ [∗] ←∅

**2** **while** . _j_ ≤ _n_ **do**

**3** **while** . _l_ ≤ _a_ log _n_ **do**

**4** . _p_ ← 0

**5** **while** . _p_ ≤ _a_ log _n_ - _l_ **do**

**6** . _N_ ←{ _x_ 1 _, x_ 2 _,_ - · · _, xn_ }; . _S_ ←∅

**7** Indicator=1

**8** Choose an arbitrary tag . _x_ from . _N_ - _S_ - _S_ [∗]

**9** **for** _each_ . _j_ ∈ _N_ _/x_ **do**

**10** **if** . _x(_ _p,_ _l)_ == _j(_ _p,_ _l)_ **then**

**11** . _S_ ← _S_ ∪ _x_ ; Indicator=0

**12** . _p_ ← _p_ + 1; Jump to Line 6

**13** **end**

**14** **end**

**15** **if** _Indicator==1_ **then**

**16** Record . _x_, . _p_, an d . _l_ ; . _S_ [∗] ← _S_ [∗] ∪ _x_

**17** . _j_ ← _j_ + 1; Jump to Line 2

**18** **else**

**19** . _p_ ← _p_ + 1

**20** **end**

**21** **end**

**22** . _l_ ← _l_ + 1

**23** **end**

**24** . _j_ ← _j_ + 1

**25** **end**

**26** Return a collection of . _x(_ _p,_ _l)_


Our algorithm can deterministically find an optimal bitmask. We now analyze its computational complexity. As we explained previously, the complexity of our algorithm can be
decomposed into three parts: 1). _O(n_ [2] _)_ operations for each. _(_ _p,_ _l)_ ; 2 ). _O(_ log _n_ [2] _)_ combinations
of . _(_ _p,_ _l)_ ; 3) the algorithm needs to find a bitmask for all . _n_ tags. The overall computational
complexity sums up to . _O(n_ [3] _(_ log _n)_ [2] _)_ .


**A probabilistic Bitmask selection algorithm**
We next devise a probabilistic Bitmask selection algorithm that ensures a unique bitmask with
a required success probability. Compared with the deterministic algorithm, the probabilistic
algorithm has three advantages:


- Reduced complexity. The probabilistic scheme reduces the complexity from . _O(n_ [3] _)_ to

. _O(n_ [2] _)_ in the worst case. In practice the gain can be more significant. Low complexity is
desired especially for handhold mobile readers which has limited computational capacity.


6.5 P2P:Point-to-Point Missing Tag Identification 141


- Tunable accuracy. As a desired property, the accuracy of the probabilistic algorithm can
be tuned to strike a balance between the accuracy and computation and communication
overhead.

- Better applicability. The probabilistic algorithm can be used to identify missing tags even
when there are new tags that are not recorded in the database, but the deterministic one
cannot conduct this task. This will be discussed at the end of this section.



In the probabilistic algorithm, we divide a tag EPC into .⌊ [|] _[E PC]_ [|]



In the probabilistic algorithm, we divide a tag EPC into .⌊ _l_ ⌋ non-overlapping seg
ments, i.e., .⌊ _[a]_ [ log] _[ n]_ ⌋ segments. For example, if . _l_ = 2 in Fig. 6.6 where an EPC is assumed



ments, i.e., .⌊ _l_ ⌋ segments. For example, if . _l_ = 2 in Fig. 6.6 where an EPC is assumed

to be four bits long, we have two such segments for the black tag 0111 from left to right,
namely 01 and 11. This method is formally stated in Algorithm 2 that operates as follows:




- First, we set . _l_ and another parameter . _z_ that stands for the execution rounds of this algorithm. How to configure the parameters will be introduced shortly.

- Second, we arbitrarily choose a tag and select the first (leftmost) segment of its EPC.
Then, we compare this segment with those of the other . _n_  - 1 tags. If this segment is
unique, we use it as a bitmask and set Pointer.= 000000002, then the algorithm stops;
otherwise, we select the second segment and repeat the operations above. The algorithm terminates when a unique segment is found or the number of the executed rounds
exceeds . _z_ .


**Algorithm** **2:** Probabilistic Bitmask selection

**Input** : Tag se t .{ _x_ 1 _, x_ 2 _,_  - · · _, xn_ }, . _l_, . _z_

**1** **Initialization:** . _N_ ←{ _x_ 1 _, x_ 2 _,_  - · · _, xn_ }, . _k_ ← 1, . _p_ ← 0;
choose an arbitrary tag . _x_ from . _N_

**2** **while** . _k_ ≤ _z_ **do**

**3** Indicator=1

**4** **for** _each_ . _j_ ∈ _N_ _/x_ **do**

**5** **if** . _x(_ _p,_ _l)_ == _j(_ _p,_ _l)_ **then**

**6** Indicator=0

**7** **end**

**8** **end**

**9** **if** _Indicator==1_ **then**

**10** Stop

**11** **else**

**12** . _p_ ← _p_ + _l_ ; . _k_ ← _k_ + 1

**13** **end**

**14** **end**

**15** Return . _x(_ _p,_ _l)_


142 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


It is obvious that the complexity of the probabilistic method is . _O(n_  - _z)_ where . _z_ ≤
⌊ _[a]_ [ log] _l_ _[ n]_ ⌋. To find bitmasks for all tags in P2P, this method needs to run . _n_ times, so the

overall complexity is . _O(n_ [2] log _n)_ .

Next, we move to the analysis of parameter configuration. Since each bit in EPC is generated randomly in practice, the strings of .⌊ _[a]_ [ log] _l_ _[ n]_ ⌋ non-overlapping segments are mutually

independent. The algorithm would run . _k_ rounds if the first . _k_ - 1 rounds fail where . _k_ ≤ _z_,
thus the probability distribution of the number of executed rounds, defined as . _K_, can be
formulated as a geometric distribution.

Consider an arbitrary round, finding unique bitmasks for all . _n_ tags is equal to the event
that the selected . _l_ -bit segments are different from each other. The probability of this event

is . _e_ [−] 2 _[l][n]_ [+][2][1] [ 23]. As a result, we have



. Pr _(K_ = _k)_ = _(_ 1 − _e_ [−] 2 _[l][n]_ [+][2]




_[n]_ [2]

2 _[l]_ [+][1] _)_ _[k]_ [−][1] - _e_ [−] 2 _[l][n]_ [+][2]



2 _[l]_ [+][1] _._



Hence, the success probability after . _z_ rounds, defined as . _Ps_ can be calculated as




_[n]_ [2]

2 _[l]_ [+][1] _)_ _[k]_ [−][1] - _e_ [−] 2 _[l][n]_ [+][2]



2 _[l]_ [+][1] _)_ _[z]_ _._




_[n]_ [2]

2 _[l]_ [+][1] = 1 − _(_ 1 − _e_ [−] 2 _[l][n]_ [+][2]



. _Ps_ =




- _z_



_(_ 1 − _e_ [−] 2 _[l][n]_ [+][2]

_k_ =1



Denote by . _α_ the required success probability of finding bitmasks for . _n_ tags, we can get
the relationship of . _l_ and . _z_ :


. _Ps_ = _α_ =⇒ log _(_ 1 − _α)_ = _z_ log _(_ 1 − _e_ [−] 2 _[l][n]_ [+][2][1] _)._ (6.1)


To solve this equation, we can first specify a value for either . _l_ or . _z_, and derive the other.



. _Ps_ monotonously increases with . _l_ and . _z_, thus the selection of . _l_ and . _z_ indicates the trade-off
between computational complexity and communication overhead. For example, _let_ . _z_ = 1,
_n_ [2]
_the complexity will be reduced to_ . _O(_ 1 _)_ while . _l_ reaches its maximum value . log - ln _α_ [−] [1]



_n_ [2]
from (6.1). If the required . _α_ is equal to .99% and . _n_ = 2 [10], the n .log - ln _α_ [−] [1][ ≈] [26.] [ In]
contrast, if l et. _z_ = ⌊ [96] [⌋] [under the same requirement, we have] [.] _[l]_ [=][ 20 while][.] _[z]_ [=][ 4. Note that ]



contrast, if l et. _z_ = ⌊ [96] _l_ [⌋] [under the same requirement, we have] [.] _[l]_ [=][ 20 while][.] _[z]_ [=][ 4. Note that ]

the value of . _l_ cannot exceed the length of a tag EPC.



**6.5.5** **Missing Tag Identification with New Tags**


In this part, we discuss whether P2P can be used to identify missing tags in the scenario
with the arrival of new tags that are not recorded in the database. To do so, we study in two
cases: P2P with the deterministic algorithm and P2P with the probabilistic algorithm.

In the first case, P2P cannot be used in such a coexistence scenario as the deterministic
algorithm must search for all EPCs of the tags in the database to find a unique bitmask


6.6 Implementation 143


while those of the new tags are not recorded. As a result, some new tags may also match the
selected bitmask, colliding with the response of the known tag, which makes P2P fail.

In the second case, P2P can be adapted for the coexistence scenario if the number of the
new tags can be estimated or the reader knows the range of the new tag population. Assume
the upper bound of the new tag populations is . _u_, given the required . _α_, we can calculate the
needed bitmask length. _l_ and the number of the execution rounds from the following equation
such that the identification probability is at least . _α_,


. log _(_ 1 − _α)_ = _z_ log _(_ 1 − _e_ [−] _[(][n]_ 2 [+] _[l]_ [+] _[u]_ [1] ~~_[)]_~~ [2] _)._


Note that when the tag EPC is 96-bit long, P2P can deterministically identify all missing
tags if . _l_ = 96.


**6.6** **Implementation**


**6.6.1** **Implementation Setup**


**COTS Gen2 devices:** We use one ImpinJ R420 reader and 20 ImpinJ Monza-4 UHF tags in
our implementation. These devices are completely compiled with the Gen2 standard. The
missing identification programs are written in Java on the top of ImpinJ SDK v.1.28.0.1.
In particular, the ImpinJ R420 reader supports . _Q_ -query and selective query. The ImpinJ
Monza-4 tags have 96-bit EPCs.


**Parameters:** The transmission power of the reader is set to .30dbm, and its reception sensitivity is -70 dbm. We implement three tag-to-reader encoding methods: M2, M4, M8. As
the ImpinJ reader can support three combinations, we vary the tag-to-read link rate from
320kbps with M2, to 68.5kbps with M4, to 21.33kbps with M8. In PMP, we set. _Q_ = 2 log _n_
where . _n_ is the number of the tags in the Gen2 system, which will be set to 5, 10, and
20, respectively. We will investigate the correctness of the deterministic bitmask selection
method and the probabilistic method, but use the former in the implementation of P2P while
the latter will be used in the subsequent experiments where the system scales.


**6.6.2** **Implementation Results**


We evaluate the performance of the proposed missing tag identification protocols, namely
P2M and P2P. We would like to note that this chapter focuses on performance comparison
in the same settings rather than maximizing the throughput.


**Protocol investigation:** Before the formal comparison, we first present how the deterministic
bitmask selection method works. We start with . _n_ = 5 tags whose EPCs are listed in the


144 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Fig. 6.8** The bitmasks used in P2P. There are five tags and we present the first two words of EPCs
in binary. we can first set the bitmask . _BM_ = _(_ 0002 _,_ 6 _,_ 1 _,_ 02 _)_ to query tag . _x_ 3, then use . _BM_ =
_(_ 0002 _,_ 1 _,_ 2 _,_ 012 _)_, . _BM_ = _(_ 0002 _,_ 1 _,_ 2 _,_ 002 _)_, . _BM_ = _(_ 0002 _,_ 3 _,_ 2 _,_ 102 _)_, . _BM_ = _(_ 0002 _,_ 3 _,_ 2 _,_ 112 _)_ in
sequence to query tags . _x_ 1, . _x_ 2, . _x_ 4, . _x_ 5, respectively


first column of Table 6.2, i.e., tags . _x_ 1 [—] . _x_ 5. Running Algorithm 1, we can first set the
bitmask . _BM_ = _(_ 0002 _,_ 6 _,_ 1 _,_ 02 _)_ to query tag . _x_ 3, then use . _BM_ = _(_ 0002 _,_ 9 _,_ 1 _,_ 02 _)_, . _BM_ =
_(_ 0002 _,_ 11 _,_ 1 _,_ 02 _)_, . _BM_ = _(_ 0002 _,_ 37 _,_ 1 _,_ 02 _)_, . _BM_ = _(_ 0002 _,_ 39 _,_ 1 _,_ 02 _)_ in sequence to query
tags. _x_ 4,. _x_ 1,. _x_ 2,. _x_ 5, respectively. That is to say, it is sufficient for P2P to use a one-bit bitmask
in this case. For illustration, we take a toy example where only the first two words of tag
EPCs are searched, as shown in Fig. 6.8. Comparing this example with the prior, we can
observe that searching more positions in EPC will yield shorter bitmasks.

We further execute Algorithm 1 to build the bitmasks for the cases of. _n_ = 10 and. _n_ = 20
corresponding to the first two columns and all tags in Table 6.2, respectively. The results
for . _n_ = 5 _,_ 10 _,_ 20 are shown in Tables 6.3, 6.4, an d 6.5, respectively. Note that we employ

.MemBank = 0002 in P2P, and we just list . _(_ _p,_ _l, Mask)_ for each tag for illustrative clarity.


**Protocol comparison:** From this part, we begin to compare the performance of P2M with
P2P using the deterministic bitmask selection method in terms of execution time spent in
identifying all missing tags and detecting the first missing tag under three different tag-toreader encoding methods supported by an ImpinJ reader, namely M2, M4, and M8.

First, we investigate the impact of overall tag population . _n_ on the performance of P2M
and P2P. To this end, we fix the number of missing tags . _m_ = 0 while increasing . _n_ from
5, to 10, to 20. As shown in Fig. 6.9, P2P can query all tags within significantly less time
than P2M, and the performance gain soars with the increment in the number of tags in the
system. Meanwhile, the execution time of P2M experiences more sharp increase than P2P
does. For example in Fig. 6.9a, when the tag population is 5, P2P is .1 _._ 5× better than P2M.


|ble 6.2 Tag EPCs in the|implementation|Col3|
|---|---|---|
|._xi_|._xi_+5|._xi_+10|
|2E4E6693572D3A8D185E0988|110B1D467E616FCA07E03A31|6402201E11FA2CB336243D3A|
|06DD7F27437B193326BA3F35|70A575FE134C343C67F778CA|37A721130D0879BC3BAA253E|
|415859552FF64559679B4EFE|300833B2DDD9140000000000|4EB922210CEF339B2B3C0F4B|
|76317A5F05056B4072D21075|49D87D2252B13F24278A24CF|75643B7A0D806EA8286E08BD|
|7BD8536F240C0F0C19C2534A|2E8B6D541CCD447E0B7C684D|57EA364D50A277C53EB21B13|


6.6 Implementation 145



**Table 6.3** Bitmasks for

. _x_ 1 − _x_ 5


**Table 6.4** Bitmasks for

. _x_ 1 − _x_ 10




|.i|. xi|
|---|---|
|1|. _(_11_,_ 1_,_ 02_)_|
|2|. _(_37_,_ 1_,_ 02_)_|
|3|. _(_6_,_ 1_,_ 02_)_|
|4|. _(_9_,_ 1_,_ 02_)_|
|5|. _(_39_,_ 1_,_ 02_)_|


|.i|.xi|. xi+5|
|---|---|---|
|1|._(_13_,_ 2_,_ 112_)_|. _(_2_,_ 2_,_ 012_)_|
|2|._(_45_,_ 2_,_ 012_)_|. _(_8_,_ 2_,_ 102_)_|
|3|._(_21_,_ 2_,_ 002_)_|. _(_32_,_ 1_,_ 12_)_|
|4|._(_10_,_ 2_,_ 112_)_|. _(_40_,_ 2_,_ 102_)_|
|5|._(_3_,_ 2_,_ 112_)_|. _(_19_,_ 2_,_ 012_)_|



|Table 6.|.5 Bitmasks for. x1 −x|x20|Col4|Col5|
|---|---|---|---|---|
|._i_|._xi_|._xi_+5|._xi_+10|. _xi_+15|
|1|._(_11_,_ 3_,_ 0112_)_|._(_7_,_ 3_,_ 1002_)_|._(_1_,_ 3_,_ 1102_)_|. _(_33_,_ 3_,_ 1102_)_|
|2|._(_1_,_ 3_,_ 0002_)_|._(_6_,_ 3_,_ 0012_)_|._(_13_,_ 3_,_ 1112_)_|. _(_35_,_ 3_,_ 012_)_|
|3|._(_20_,_ 3_,_ 1002_)_|._(_4_,_ 4_,_ 11112_)_|._(_52_,_ 2_,_ 002_)_|. _(_2_,_ 2_,_ 012_)_|
|4|._(_11_,_ 3_,_ 1002_)_|._(_74_,_ 3_,_ 0012_)_|._(_5_,_ 3_,_ 1012_)_|. _(_4_,_ 3_,_ 0012_)_|
|5|._(_70_,_ 2_,_ 012_)_|._(_55_,_ 3_,_ 0012_)_|._(_68_,_ 2_,_ 112_)_|. _(_18_,_ 2_,_ 002_)_|


While this number increases to .5× when there are 20 tags. The performance gain of P2P
comes from the point-to-point design as it is able to successfully read a tag in every slot, but
it takes . _O(n)_ slots for P2M to access a tag on average.

Second, we move to study how P2M and P2P perform under different missing tag populations in the system. To do so, we fix the number of overall tags . _n_ = 20 while changing
the number of missing tags . _m_ as . _m_ = 4 _,_ 6 _,_ 8 _,_ 12. The experimental results are depicted in
Fig. 6.10. From these results, we can observe the following phenomenons:


- Overall performance: P2P remarkably outperforms P2M. Specifically, the identification
cost of PMP, as shown in Fig. 6.10a, falls into the range between.0 _._ 56 s an d.1 _._ 49 s, which
is .2 _._ 8× to .5 _._ 4× more than that of P2P. In the other tag-to-reader rates, P2P achieves at
least .3 _._ 3× performance gain over P2M. This is primarily due to the point-to-point query
paradigm that reads tags in sequence while P2M needs more time to tackle collisions.

- Impact of missing tags: As the number of missing tags increases, the execution time of
P2M decreases more significantly than P2P. For instance in Fig. 6.10a, the reduction of


146 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Fig. 6.9** Performance
comparison with different
numbers of overall tags under
three tag-to-reader rates: M2
(320kbps) . _>_ M4 (68.5kbps) . _>_
M8 (21.33kbps)


6.6 Implementation 147


**Fig. 6.10** Performance
comparison with different
missing tag population under
three tag-to-reader rates: M2
(320kbps) . _>_ M4 (68.5kbps) . _>_
M8 (21.33kbps)


148 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Fig. 6.11** Performance
comparison in terms of
detection time indicating the
time of finding the first missing
tag


6.6 Implementation 149


**Table 6.6** Bitmask length . _l_ and execution rounds . _z_ when . _n_ = 5







|.l<br>.α|3|4|5|6|7|8–10|11|12|13|14|
|---|---|---|---|---|---|---|---|---|---|---|
|0.99|20|8|5|3|2|2|1|–|–|–|
|0.999|30|12|7|4|3|3|3|3|3|1|


P2M is .62 _._ 2%, which is 2.4 times that of P2P. This can be interpreted as follows: the
increase of missing tags reduces tag collisions in P2M but has a lower impact on P2P as
it employs point-to-point queries.


Under the same settings as the above, we further compare P2M and P2P in terms of
missing tag detection time that is the time spent in finding the first missing tag. It can be
observed from Fig. 6.11 that P2P is able to detect the first missing tag within quite less time
than P2M. In particular, When there are 12 missing tags, it takes P2M with M2 nearly 7. ×
time as much as P2P to find the first missing tag. The performance gap between them reaches
over .8× when M4 and M8 are used. Look at Figs. 6.10 and 6.11, we can also find that the
detection time of P2P significantly reduces especially in the presence of more missing tags
while that of P2M does not change. This difference is resulted from the nature of P2P and
P2M in that the former can learn the existence or absence of a tag in each slot but the latter
cannot know tag states until the execution of the whole frame. That said, P2P can find a
missing tag after probing . _n_ - _m_ tags in the worst case while P2M is expected to query all

. _n_ tags.


**Correctness of the probabilistic bitmask selection method:** Having implemented P2M
and P2P with 20 ImpinJ tags, we move to confirm the correctness of the probabilistic
bitmask selection method in this part. Revisiting Table 6.2 where the 20 tag EPCs are listed,
we first check whether Algorithm 2 works in the 5-tag scenario. To assess the reliability of
1
the probabilistic method, we set . _α_ = 0 _._ 99 and .0 _._ 999, and run Algorithm 2 for . 1− _α_ [times. ]
Each time we randomly select 5 out of 20 tag EPCs. If bitmask collisions among tags
arise more than one time, we claim the failure of Algorithm 2. We record in Table 6.6
the combinations of . _l_ and . _z_ that fulfill the required probability. The results show that with

. _α_ increased Algorithm 2 needs to use a longer bitmask or run more rounds, which is in
correspondence with the analytical results. Moreover, given an . _α_, the increase of either . _l_
or . _z_ can yield a smaller value of the other, confirming the tradeoff between communication
overhead and computational complexity.

To evaluate the impact of the system scale, we increase the number of tags from 50 to
300 with a step length of 50 and generate tag EPCs at random. From the results, we observe
that Algorithm 2 can achieve the required probability . _α_ with the tag population increased.
Since the maximum bitmask length can be directly computed from (6.1) with . _z_ = 1, w e


150 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


**Table 6.7** Bitmask length . _l_ and execution rounds . _z_ : (. _l_, . _z_ )

|.n<br>.α|50|100|150|200|250|300|
|---|---|---|---|---|---|---|
|0.99|(11, 6)|(13, 6)|(15, 4)|(15, 6)|(16, 5)|(17, 4)|
|0.999|(12, 6)|(14, 7)|(15, 6)|(16, 6)|(16, 5)|(18, 5)|



**Table 6.8** Execution time of P2M and P2P with FM0

|Protocol|.γ|500|1,000|2,000|4,000|10,000|
|---|---|---|---|---|---|---|
|P2M|.0_._3|29.86|119.10|475.70|1901.40|1,1878.48|
|P2M|.0_._6|29.78|118.94|475.37|1,900.76|1,1876.87|
|P2P|.0_._3|0.79|1.60|3.26|6.62|16.92|
|P2P|.0_._6|0.72|1.46|3.00|6.06|15.52|



**Table 6.9** Execution time of P2M and P2P with M4

|Protocol|.γ|500|1,000|2,000|4,000|10,000|
|---|---|---|---|---|---|---|
|P2M|.0_._3|44.17|175.84|701.67|2,803.31|1,7508.01|
|P2M|.0_._6|44.00|175.48|701.00|2,801.93|1,7505.00|
|P2P|.0_._3|1.085|2.19|4.44|9.0|22.82|
|P2P|.0_._6|0.91|1.84|3.72|7.55|19.24|



only list the combinations of the minimum bitmask length and execution rounds that make
Algorithm 2 successful in Table 6.7. We can find that either bitmask length or execution
rounds increase when the system scales or the required success probability becomes higher,
which corresponds to the analytical result.


**Performance evaluation under larger systems.** We further show how the time efficiency
of the proposed protocols changes as the system scales up. To this end, we set parameters
following the Gen2 standard and specification of ImpinJ reader as follows: Tari.= 12 _._ 5 _μs_,
BLF.= 640kHz. We use FM0 and M4 as encoding methods for the tag-to-reader link, respectively. Accordingly, the data rate defined by . _r_ is .1 _/B L F_ and .4 _/B L F_ . The time durations
are . _T_ 1 = _T_ 3 = max _(_ 2 _._ 75 _T ari,_ 10 _r_ _)_, . _T_ 2 = 3 _r_, an d . _T_ 4 = 5 _._ 4 _r_ . We vary the number of the
overall tags from 500 to 10,000 and set . _α_ = 0 _._ 999 when the required bitmask length . _l_ is
27, 29, 31, 33, 36 and the execution round of the probabilistic algorithm . _z_ equals to 1. In
addition, define . _γ_ as the ratio of the number of the missing tags to that of the overall tags,
we set it to .0 _._ 3 and .0 _._ 6. We listed the results in Tables 6.8 and 6.9.

We can observe that the increment in the execution time of P2M follows a square pattern
of that in the number of the overall tags. The pattern becomes linear in P2P. Consequently,


References 151


P2P is considerably more time-efficient than P2M. We can also find that the ratio . _γ_ of the
missing tag population has more impact on P2P than P2M. This is because the increase of

. _γ_ leads to fewer success slots and more empty slots in P2P. An empty slot is shorter than a
success slot. Yet due to the change of empty slots resulted from the increase of . _γ_ in P2M,
which is in the order of magnitude . _O(n)_, is significantly smaller than the original number
of empty slots, i.e., . _O(n_ [2] _)_ .


**6.7** **Conclusion**


In this chapter, we have proposed two protocols enabling the missing tag identification
service with COTS RFID reader and tags. Specifically, we first used . _Q_ -query to develop
a point-to-multipoint protocol that operates in an analog frame-slotted Aloha paradigm to
collect tag EPCs. A missing tag can be found if the collected EPC set does not contain its
EPC. We then devised a point-to-point protocol that employs a bitmask to specify one tag to
reply in each slot so that tag response collisions are avoided and time efficiency is improved.
Moreover, we presented two bitmask selection methods to build compact bitmasks. The
proposed protocols were implemented in ImpinJ readers and tags, and the extensive results
showed that they were able to achieve the missing tag identification task.


**References**


1. EPCglobal Inc., Class-1 generation-2 UHF RFID protocol for communications at 860 mhz–960
mhz (2005). [http://www.gs1.org](http://www.gs1.org)
2. ImpingJ Inc., Impingj connectivity devices. [https://www.impinj.com/](https://www.impinj.com/)
3. Thingmagic Inc., Thingmagic products. [http://www.thingmagic.com/index.php](http://www.thingmagic.com/index.php)
4. Chain Store Age, Retailers losing billions to inventory shrink (2017). [https://nrf.com](https://nrf.com)
5. C. C. Tan, B. Sheng, Q. Li, How to monitor for missing RFID tags, in _IEEE ICDCS_ (2008),
pp. 295–302
6. W. Luo, S. Chen, T. Li, Y. Qiao, Probabilistic missing-tag detection and energy-time tradeoff in
large-scale RFID systems, in _ACM MobiHoc_ (2012), pp. 95–104
7. W. Luo, S. Chen, Y. Qiao, T. Li, Missing-tag detection and energy-time tradeoff in large-scale
RFID systems with unreliable channels. IEEE/ACM TON **22** (4), 1079–1091 (2014)
8. M. Shahzad, A. X. Liu, Expecting the unexpected: Fast and reliable detection of missing RFID
tags in the wild, in _IEEE INFOCOM_ (2015), pp. 1939–1947
9. J. Yu et al., Finding needles in a haystack: Missing tag detection in large rfid systems. IEEE
TCOM **65** (5), 2036–2047 (2017)
10. J. Yu, L. Chen, R. Zhang, K. Wang, On missing tag detection in multiple-group multiple-region
rfid systems. IEEE TMC **16** (5), 1371–1381 (2017)
11. L. Yang, Q. Lin, C. Duan, Z. An, Analog on-tag hashing: Towards selective reading as hash
primitives in gen2 rfid systems, in _ACM MobiCom_ (2017), pp. 301–314
12. T. Li, S. Chen, Y. Ling, Identifying the missing tags in a large RFID system, in _ACM MobiHoc_
(2010), pp. 1–10


152 6 Practical Hashing-Free Access Implementation with COTS RFID Systems


13. R. Zhang, Y. Liu, Y. Zhang, J. Sun, Fast identification of the missing tags in a large RFID system,
in _IEEE SECON_ (2011), pp. 278–286
14. X. Liu et al., A multiple hashing approach to complete identification of missing rfid tags. IEEE
TCOM **62** (3), 1046–1057 (2014)
15. X. Liu, K. Li, G. Min, Y. Shen, A.X. Liu, W. Qu, Completely pinpointing the missing RFID tags
in a time-efficient way. IEEE TC **64** (1), 87–96 (2015)
16. Y. Zheng, M. Li, P-mti: Physical-layer missing tag identification via compressive sensing.
IEEE/ACM TON **23** (4), 1356–1366 (2015)
17. M. Chen, J. Liu, S. Chen, Y. Qiao, Y. Zheng, Dbf: A general framework for anomaly detection
in rfid systems, in _IEEE INFOCOM_ (IEEE, 2017), pp. 1–9
18. K. Finkenzeller, _RFID Handbook_ (John Wiley & Sons, 2010)
19. M. Feldhofer, C. Rechberger, A case against currently used hash functions in rfid protocols,
in _International Conferences On the Move to Meaningful Internet Systems_ (Springer, 2006),
pp. 372–381
20. C. Rolfes, A. Poschmann, G. Leander, C. Paar, Ultra-lightweight implementations for smart
devices–security for 1000 gate equivalents, in _International Conference on Smart Card Research_
_and Advanced Applications_ (Springer, 2008), pp. 89–103
21. Systemid, Immediate inventory management: Everyone wins with rfid technology at walmart
(2012). [http://www.systemid.com/learn/](http://www.systemid.com/learn/)
22. RFID Journal, Rfid technology is boosting sales and customer engagement for retailers (2017).

[https://www.raconteur.net/business/](https://www.raconteur.net/business/)
23. M. Mitzenmacher, E. Upfal, _Probability and computing: Randomized algorithms and proba-_
_bilistic analysis_ (Cambridge University Press, 2005)
24. K. Beyer et al., On synopses for distinct-value estimation under multiset operations, in _ACM_
_SIGMOD_ (2007), pp. 199–210


**Conclusion and Perspective**
## **7**


In this chapter, we begin by summarizing the book’s examination of the efficient utilization
of RFID systems for missing event detection. Following this, we engage in a discussion
on various unresolved questions and outline several potential avenues for future research,
including energy utilization, anonymity, and tag implementation.


**7.1** **Book Summary**


RFID technology, which employs low-power radio waves for the automatic identification of
tagged objects and the retrieval of associated data, represents a superior alternative to optical
barcodes that require significant manual intervention. As a result, RFID systems boast a broad
spectrum of applications, including ticketing services, Electronic Toll Collection (ETC),
library management, object tracking, logistics, industrial automation, and medical devices.
Therefore, RFID technology emerges as a pragmatic solution for the IoT.

In this book, we delve into the fundamental applications of efficient and secure backscatter networks with RFID technology, with particular emphasis on the specialized domain of
missing event detection. Readers can track items by querying the tags attached to physical objects within the workplace. The responses from these tags indicate the presence of
objects. Moreover, using universal tags presents a lower cost solution that meets the growing
demand for multi-tasking capabilities. Consequently, the challenge of missing tags detection
revolves around efficiently grouping the tags and then swiftly scheduling non-responsive
tags. In essence, the primary objective of developing efficient missing detection algorithms is
to optimize tag accessibility for readers. However, designing such efficient missing detection
algorithms faces several challenges arising from privacy concerns, complexities associated



© The Author(s), under exclusive license to Springer Nature Switzerland AG 2026
R. Zhang and H. Liu, _RFID Applications_, Synthesis Lectures on Communications,
[https://doi.org/10.1007/978-3-031-93034-8_7](https://doi.org/10.1007/978-3-031-93034-8_7)



153


154 7 Conclusion and Perspective


with multi-tagged scenarios, limited computational capacity on the tag side, unreliable wireless communication channels, and the pervasive yet intrusive nature of these tags.

These challenges highlight the critical need for innovative approaches to missing event
detection algorithms, especially in scenarios involving multiple tagged objects. In this regard,
we propose a systematic analysis and design based on our insights, aiming to provide new
perspectives for future research on missing detection within RFID systems.

In particular, we commence by elucidating group labeling in Chap. 2, which serves as
a fundamental management technique for RFID systems. We present an approximation
algorithm accompanied by a proven competitive ratio, followed by the development of two
streamlined algorithms characterized by reduced complexity while maintaining comparable performance. These advancements effectively address the NP-hard seed assignment
problem associated with the utilization of multiple seeds, thereby enhancing efficiency in
labeling tags and enabling group-wise management. Subsequently, Chap. 3 explores anonymous group writing to bolster the security of backscatter RFID systems. We construct an
approximately random sequence as noise by overlapping transmission data from different tag
groups, thus hiding the original information with low computational complexity. Chapters 4
and 5 introduce a series of algorithms aimed at detecting missing events within multi-tagged
contexts, focusing on filter constructing and hash seed searching, respectively. In Chap. 4,
we employ a filter to designate one tag attached to each object, facilitating access to the
reader. We enhance the efficiency of this process through compression of the constructed
filter, further optimizing broadcasting time efficiency. In Chap. 5, we propose a framework
for missing detection that highlights trade-offs between computation and communication
while considering characteristics of hash functions alongside time discrepancies between
seed searching and communication. Finally, Chap. 6 tackles the challenge of missing tag
identification using COTS tags, bridging theory with practical implementation. Initially, We
used. _Q_ -query to develop a point-to-multipoint protocol and devise a point-to-point protocol
employing a bitmask to specify one tag for response in each slot. The proposed protocols
were implemented in COTS Gen2 reader and tags, thereby validating their effectiveness in
achieving the missing tags detection.

In the subsequent section, we examine a range of open questions that we consider pertinent
to the topics addressed in this book and outline several significant potential avenues for future
research.


**7.2** **Open Questions and Future Work**


**7.2.1** **Energy Utilization**


The active tags, which are powered by batteries, provide enhanced functionality and extended
communication ranges. However, they come with high production and management costs.
In contrast, passive tags operate without batteries and enable large-scale deployment due to


7.2 Open Questions and Future Work 155


their cost-effectiveness. Nevertheless, the stringent energy limitations significantly restrict
the functionality of these tags and limit their communication ranges. As a result, energy
efficiency becomes a critical concern for RFID systems. In this context, the optimal solution
lies in increasing energy income while simultaneously minimizing energy expenditures for
passive tags.

A critical research avenue for enhancing energy income involves the effective harvesting of environmental energy. Intuitively, passive tags can extract energy from solar, wind,
kinetic, and geothermal sources. However, these energy sources are profoundly influenced
by surrounding environmental conditions, necessitating the incorporation of bulky energy
harvesting devices (larger devices yield greater amounts of energy), which conflicts with the
goal of miniaturization. Radiofrequency (RF) energy harvesting offers a promising solution,
enabling tags to capture ambient RF energy from their environment. This method inherently
provides resilience against climatic variations and facilitates miniaturization (the size of the
RF antenna can decrease as the RF frequency increases). In urban environments, ambient RF
energy is abundant due to the widespread deployment of digital TV (DTV) towers, cellular
communication networks, and Wi-Fi hotspots. Therefore, it is essential to consider hybrid
approaches that integrate energy collection from these diverse sources, taking into account
the differing energy spectral densities between urban and suburban settings as well as the
varying frequency bands of the aforementioned sources. Moreover, the rapid deployment
of 5G networks has catalyzed innovations in the design of millimeter-wave-enabled power
solutions, thereby opening new avenues for the utilization of 5G millimeter-wave energy in
RFID systems.

On the other hand, the primary energy-intensive operations associated with tags involve
data processing and RF signal transmission. The clock frequency of the processor dictates
the processing rate. Generally, a higher frequency is correlated with quicker response times
and increased data throughput. However, this also leads to greater power consumption. In
RFID systems, elevated frequencies may not yield faster responses due to the intermittent
nature of processing execution. This phenomenon arises because the energy required at
elevated frequencies can surpass the stored energy available, necessitating that tags engage
in cyclic energy harvesting during processing. A viable solution involves identifying an
optimal frequency that minimizes processing time. Exploring this optimal frequency in real
time, both prior to and during task execution, ensures that each process operates at its most
efficient frequency. Nevertheless, this approach requires additional time for exploring frequency scaling and consumes extra computational resources, both of which contribute to
overall energy expenditure. Therefore, a promising direction lies in quantifying the relationship between processing requirements and frequency selection, such quantification would
facilitate pre-calculations aimed at mitigating energy overhead. Consequently, it is imperative to consider methods for rapidly selecting the optimal frequency with minimal power
consumption. From the perspective of RF signal transmission, a straightforward strategy is to
reduce both the number of responses generated and their duration. Thus, a critical direction


156 7 Conclusion and Perspective


is to explore novel methods for effectively managing the trade-off between communication
time and energy costs.


**7.2.2** **Anonymity**


With the widespread implementation of RFID systems, the volume of transmitted data has
experienced significant growth, highlighting an urgent need for data anonymity to bolster
security and privacy. Traditional methods depend on authentication protocols to prevent
unauthorized users from eavesdropping and compromising data integrity. However, conventional mobile authentication protocols are ill-suited for RFID systems due to their limitations
in energy and computational resources. As a result, a pivotal focus must be directed toward
the development of efficient, ultra-lightweight authentication protocols. Moreover, contemporary authentication protocols require tags to be equipped with specialized encryption and
decryption modules to ensure data anonymity, which consequently increases computational
complexity. Additionally, these protocols typically necessitate the interrogation of each tag
individually, which proves to be time-inefficient, particularly within large-scale systems.
In this book, we present an ultra-lightweight encryption method utilizing logical operators
aimed at enhancing the anonymity of group data through effective encryption techniques.
Therefore, a promising approach is to integrate authentication-free mechanisms with ultralightweight encryption utilizing logical operators, thereby enhancing time efficiency while
safeguarding data anonymity.


**7.2.3** **Tag Implementation**


The passive tags have a vast application market owing to their low maintenance costs and
prolonged system longevity, making them suitable for deployment in harsh environments
and remote locations where active tags may be impractical. Traditional tags operate on the
same frequency for both uplink and downlink transmissions, which can result in challenges
such as self-jamming, multipath scattering, and suboptimal performance in cluttered conditions. In contrast, harmonic RFID tags function at two distinct frequencies—receiving
signals at the fundamental frequency while backscattering at the harmonic frequency. This
design imparts a significant degree of robustness against clutter and multipath interference.
Consequently, an important area of focus is the development of a harmonic generator that
operates with low energy consumption while ensuring miniaturization. Additionally, harmonic RFID systems necessitate two frequency duplexes for communication, requiring a
substantial allocation of frequency bandwidth for large-scale deployment. Unfortunately,
frequency spectrum resources are finite and often subject to licensing requirements. One
potential solution to address this challenge is the adoption of multi-band communication.
Specifically, the reader transmits using multiple ISM frequencies to the tags, which then


7.2 Open Questions and Future Work 157


mix and filter out the desired frequency band for responses. This approach shifts attention
toward exploring interference cancellation techniques.

Further cost reduction of passive tags can be achieved through the elimination of chips,
leading to the development of what are known as chipless tags. However, the absence of
chips complicates data processing and communication. Specifically, anti-collision algorithms designed for chip-based systems cannot be directly applied to chipless architectures.
A viable solution involves distinguishing each tag by its signal characteristics, employing
techniques such as correlational signal processing in the time domain and frequency division access in the frequency domain. Nevertheless, challenges persist when dealing with a
large number of tags. The read distance of a chipless tag is significantly shorter compared
to that of a chip-based tag, primarily due to the lack of energy management inherent in
chip technology. One potential remedy is to minimize background noise and interference.
To achieve this goal, utilizing antenna arrays in the reader can enhance gain. Additionally,
self-interference cancellation techniques may be employed to amplify the backscatter signal.
Moreover, the data storage capacity within chipless tags is limited. There, it is crucial to
focus on enhancing bit capacity within these tags.


