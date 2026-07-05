![](https://cdnintech.com/web/frontend/www/assets/06.115/journals/OpenAccessLock.svg)Open access

Written By

Manabu Hirakawa

Submitted: 21 October 2010 Published: 15 June 2011

DOI: 10.5772/17514

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18098/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18098/#)

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## Author Information

Show +

-   #### Manabu Hirakawa \*
    
    -   Department of Industrial Engineering and Management, Tokyo Institute of Technology, Japan
    

\*Address all correspondence to:

## 1\. Introduction

Recently, fake brand-name products and other problems concerning the manufacture of counterfeit goods, as well as the abundance of pirated music and movies, and the misuse of personal information, have been the subject of extensive news coverage. Numerous problems related to security have also been reported, in addition to the falsification of expiration dates and production location information labels on food products. As can be seen from these examples, consumers’ trust, especially in regard to food safety, is at risk of being damaged. Information technology has advanced, and traceability has become technologically possible. However, I believe that a societal system for preventing such problems is lacking, and a fundamental reason for this may be a gap in perspective at the business management level with respect to the low-cost requirements of the market place. In society, individuals managing information are assumed to have good intentions. I believe that this system itself is beginning to fail. These problems are seen in the lower reliability of distribution systems, for example, the falsification of information about freshness dates and product origin. At present, the social system for preventing these problems is mostly defective, despite the technologically availability of traceability by means of information technology. Accordingly, new measures for dealing with these problems are urgently needed. It is important to note that ensuring safe distribution, improving security, and managing cost are not independent of each other, but are actually interconnected.

In this research, I analyze these problems in the context of the societal system and propose a solution that uses digital watermarking technology. My focus is on different types of information carriers including multimedia content such as movies and music, distributed manufactured products. At present, the security rules for information carriers are complex and are not uniformly applied to specific objectives and applications. Applying digital watermarking technology to information carriers will allow uniform information to be given to various media regardless of the application and environment; further, mobile services can be provided that do not depend on specific hardware and software. These mobile services be affected neither by structural disparities in applicable systems and codecs, nor by differences of copyright management policy.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 2\. Background of this research

Distribution is what connects the producer with the consumer. Physical products that we can see with our eyes, and those that we cannot, such as data, are both distributed. Images, videos, and audio that can be used on a computer are all forms of digital media. Therefore, recently pressing DVDs and CDs and creating packaging and other types of physical processing have become unnecessary. There are now cases where the data alone can be sent and received thus providing the service. Traditional distribution systems run the risk of increasing production costs due to media creation and packaging, and due to the need to hold unnecessary inventory. On the other hand, digital content services use the infrastructure of the Internet to transmit the digital data directly; therefore, these services have the following advantages: 1) no need to hold unnecessary inventory, 2) reduced distribution time, 3) reduced overhead costs, and 4) the ability to have customers around the world, without borders. Such distribution systems resolve the problems with existing systems, and are still expanding today. Digital content businesses that handle the distribution of images, videos, and audio are able to use the Internet to disclose, transmit, and distribute copyrighted work directly to the consumer. Many Web sites already use this service. On the other hand, there are many illegal Web sites that infringe on copyrights and negatively impact legitimate digital content businesses.

Relevant actors in the upstream process where content is created include the producer, the copyright holder, the secondary copyright creator, and the license manager. At this stage copyright comes into play, so we know that it is necessary to add copyright information to the content. Next, looking at the downstream processes of distribution and disclosure, the irrelevant actors include the distributor, the network company, the broadcasting company, e-commerce site managers, and administrators. Other content is distributed for offline use via Internet downloads, magazines, or DVDs and CDs. In these cases it is necessary to add information on the use of the content. There is an urgent need for a framework to be constructed that can take this copyright information and detect the illegal use of content as copyright infringement, and that can legally enforce copyright.

To ensure the solid growth of the promising digital content industry, content protection technology is necessary, which will be the used as the mechanism to protect copyright holders and their content. Content protection technology is an all-inclusive concept that involves the prevention and deterrence of unauthorized copying of content, as well as copyright protection technologies. Digital watermarking is an example of an effective content protection technology. Digital watermarking technology development began around 1995, and its full-fledged application began around 1998. Digital watermarking places an imperceptible mark that identifies the copyright holder into the digital content itself. In the event that the content is copied, the watermark can be used as evidence for tracking. Digital watermarking does not prevent unauthorized copying. However, it can be applied broadly, and it is effective in enforcing copyright.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 3\. Problems

Digital content businesses that deliver images or music make it possible to release, transmit, and sell copyrighted data directly to users via the Internet. Numerous Web sites already provide this service. On the other hand, there are many illegal Web sites that infringe on copyrights and negatively affect digital content businesses \[[1](https://www.intechopen.com/chapters/18098/#B1)\]. Music, images, and video that can be used on a computer are digital data, so the full service can be provided by simply sending and receiving the data. This eliminates the need for pressing CDs and DVDs, packaging, and other physical processing. This is the concept behind the digital content business. Conventional distribution systems have problems of increased production costs due to CD or DVD manufacturing and packaging, and the risk of carrying unnecessary inventory. With these conventional general distribution systems, there is a fear that it is difficult to commercialize content that has a low sales outlook.

On the other hand, because digital content services use the Internet as the infrastructure to send digital data, it has developed into a distribution system that resolves the problems of conventional systems as follows.

-   No need to carry unnecessary inventory
    
-   People around the world can be customers in a “borderless” manner
    
-   Short distribution time
    
-   Reduced costs
    

Moreover, with the development of infrastructure, the range of customer categories has expanded from the conventional range. Reaching target customer audiences and diversifying categories has become a recent remarkable trend.

As previously noted, the handling of digital content is highly anticipated in the future business scene, but the news is not all good. Because digital data can easily be copied, the user can sell it to a third party without permission, and there is also the possibility that the content will be illegally copied while en route over the Internet. Because there are no markings on the content itself that shows who holds the copyright, who sold it, or who purchased it, it is difficult to determine the route if the content is redistributed. If there is no evidence, then it is impossible for the copyright holder to prove a copyright claim when the content is illegal copied. Because of this, if illegal copies of content are made on a regular basis then the distributor cannot collect income appropriate for the content provided, and the business model will collapse. From the perspective of digital content businesses that use the Internet and construct their business models based on the ability to protect their digital content, the anticipation for success is high \[[2](https://www.intechopen.com/chapters/18098/#B2)\]. On the other hand, they also bear the risk of loss due to illicit copying of their content \[[3](https://www.intechopen.com/chapters/18098/#B3)\].

In recent years there have been major changes in the environment surrounding digital music \[[4](https://www.intechopen.com/chapters/18098/#B4)\]. There have been many reports of illegal MP3 Web sites \[[5](https://www.intechopen.com/chapters/18098/#B5)\]. These Web sites illegally copy music data from commercially available CDs, or from regular broadcasts, and then convert the data into MP3 files. They then publish the MP3 files on Web sites that they run and answer the requests of their users by making the files freely available for download. Commercially available CDs and other distribution media have a legally recognized specific copyright that makes it illegal for users without rights to copy and distribute the content without permission. Because this type of use ignores the legally recognized rights of copyright holders, the Web sites are considered to be illegal MP3 Web sites. The number of Web sites similar to illegal MP3 sites has increased. When digital content is distributed for free, it negatively affects the state of CD distribution, harming its commercial viability. One technology that will form a pillar of the solution is digital watermarking.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 4\. Comparison with existing technology

In recent years, there have been many cases where RFID

Radio-Frequency IDentification. RFID is an automatic identification method.

([Fig. 1)](https://www.intechopen.com/chapters/18098/#F1) and QR codes

Quick Response Code. A matrix code (or two-dimensional bar code).

([Fig. 2)](https://www.intechopen.com/chapters/18098/#F2) technology have been introduced as new technologies for distribution management. In this research, as shown in [Fig. 3](https://www.intechopen.com/chapters/18098/#F3), I apply digital watermarking to a variety of information media, I examine objectives and applications such as copyright protection

![Figure 1.Example of RFID Card](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image2.jpeg)

#### Figure 1.

Example of RFID Card

![Figure 2.Example of QR code](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image3.jpeg)

#### Figure 2.

Example of QR code

![Figure 3.Example of digital watermark to various information carriers](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image4.jpeg)

#### Figure 3.

Example of digital watermark to various information carriers

I compared RFID and QR codes and digital watermarking technology.

The following items were compared.

-   Raw material processing and age degradation: heat resistance, waterproofing properties
    
-   Degrees of freedom of the markings: Minimum required area, degrees of freedom for shape
    
-   Security: Confidentiality, protection against duplication, protection against alteration
    
-   Reading: Ease of reading, reading rate, compatibility with reading devices
    

The results of the technical comparisons of the above items are shown in [Table 1](https://www.intechopen.com/chapters/18098/#T1).

In terms of the raw materials during the processing stage and in the environment of practical use, RFID has inferior heat resistance. RFID uses RF tags to perform wireless communication. RFID can be constructed from multiple elements on a circuit board, or can be implemented on a single chip, both of which are prone to destruction by heat.

Although the impact of heat is reduced in QR codes as compared to RFID, preserving the print condition of the markings becomes a challenge.

In digital watermarking, a laser directly burns the markings into the raw materials, and therefore it has heat resistance and waterproof properties that are superior to those of the conventional technologies.

![Table 1.Comparison of copyright protection technologies(○: Applicable △: Partially applicable ×: Not applicable)](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/table1.jpg)

#### Table 1.

Comparison of copyright protection technologies(○: Applicable △: Partially applicable ×: Not applicable)

Next, in regard to the degrees of freedom of the markings and the reading environment, QE codes have more restrictions. QR codes have between 21 × 21 cells in version 1 and 177 × 177 cells in version 40. The required minimum area is determined by the amount of embedded data and the resolution of the reader. If the area of the managed materials is greater than the minimum area of the QR code, there is no problem. However, if the available area is less that this minimum, it is not possible to mount the marking. Also, reading might not be possible if the managed material is curved, such as a sphere or cylinder (error correction can improve the reading rate). RFID is strong in regard to this point: if it is possible to mount the RF tag, then recognition is certain. Marking for digital watermarking is performed in accordance with the shape; thus, the markings have a high degree of freedom, and reading can be performed easily regardless of the shape.

There are many security concerns with QR codes. QR codes are compatible with reading devices such as specialized readers and mobile phone terminals, and are the most common of these three technologies. However, they are weak in terms of confidentiality and protection against alteration.

The benefit of RFID is that it can ensure non-contact recognition by using wireless communication. However, there is the problem that RFID reader eavesdropping can be performed from an unintended location. In terms of cost, RFID requires that RF tags be installed in all of the target objects. Although the cost is currently lower than 10 yen per RF tag, when the number of target objects is great, this amounts to a cost that cannot be ignored. In QR codes and digital watermarking, the cost can be controlled relatively well since the markings are constructed by printing or burning.

One challenge for digital watermarking is its compatibility with reading devices. Although specialized terminals are used as readers in the current stage of development, the range of usability should be increased in the future by using readers for conventional PCs and mobile terminals.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 5\. Media types and their objectives

Numerous types of information media surround us. In this section, I will discuss the types of media in which digital watermarking technology can be used, and the objectives and applications of its use. Copyright in this digital and networked environment has been debated from a variety of perspectives \[[6](https://www.intechopen.com/chapters/18098/#B6)\-[7](https://www.intechopen.com/chapters/18098/#B7)\]. However, in regard to technology, the advance of digital technology has led to proposals of new copyright protection technologies. In recent years, digital watermarking has been gathering attention as one technology for copyright protection \[[8](https://www.intechopen.com/chapters/18098/#B8)\-[9](https://www.intechopen.com/chapters/18098/#B9)\]. Digital watermarking is technology that directly embeds additional information into content at a level that cannot be detected by the human sense of hearing or sight. Including copyright protection information into these digital watermarks makes it becomes possible to protect the copyright of the author. A variety of engineering methods have been researched regarding digital watermarking technology that can be embedded into a variety of data formats, such as static images, videos, and audio \[[10](https://www.intechopen.com/chapters/18098/#B10)\-[12](https://www.intechopen.com/chapters/18098/#B12)\].

Generally speaking, “multimedia” data comes in three forms: static images, videos, and audio. Here, I have included documents such as public documents and research papers as a type of image medium. From the background to this research, the following five points regarding the objectives and applications for digital watermark use can be noted: 1) copyright protection, 2) distribution traceability, 3) proof of authenticity, 4) security advantages, and 5) sales promotion. [Table 2](https://www.intechopen.com/chapters/18098/#T2) summarize the objectives and applications of digital watermarking for physical media and static images, and for video and audio, respectively.

Digital information has the characteristic that even if it is processed or edited, the quality will hardly deteriorate at all. Therefore, copyright protection, an item listed in the [table 2](https://www.intechopen.com/chapters/18098/#T2), is a critical issue. In the past, the © mark has been displayed to indicate the copyright holder, but a common problem is that this mark can be removed through illegal processing or editing \[[13](https://www.intechopen.com/chapters/18098/#B13)\]. In response to cases like this, digital watermarking can be used on video, image, and voice media to implement a mechanism to prevent the alteration of the copyright owner information, thus protecting the copyright.

In relation to this, the distribution traceability of information media is discussed. Recently, with the spread of digitization and the Internet, the situation is such that content distribution is done over networks, sharing the information with the world \[[14](https://www.intechopen.com/chapters/18098/#B14)\]. Such an environment makes thorough compliance extremely important. The improvement of people’s morals in regard to information must be maintained in tandem with defense mechanisms built into the system; however, the reality is that weak security can cause people’s moral sense to decline. By using digital watermarks to embed distribution route information into image, video, and music media, in the case that the information is leaked, it will be possible to clearly determine what route the information followed. Similar to copyright information protection, information traceability can also be achieved, which should already exist, and can prevent a malicious user from intentionally altering the information during the distribution process.

It is not easy for the user to determine whether public documents, research papers, or other purchased products are actually legitimate, which is referred to as proof of authenticity in [Table 2](https://www.intechopen.com/chapters/18098/#T2). From the fact that counterfeit goods of famous brands are being sold extremely cheaply, it can be inferred that a large quantity of these counterfeit goods are detected \[[15](https://www.intechopen.com/chapters/18098/#B15)\]. Digital watermarks can be used as one method to differentiate between authentic and counterfeit products. Until now, digital watermarks have almost exclusively been used in digital data such as images, videos, and audio. However, current research has shown that it is possible to use digital watermarks to embed information into physical media such as metals, printed-circuit boards, acrylic boards, and cloth \[[16](https://www.intechopen.com/chapters/18098/#B16)\].

During the manufacturing process, invisible digital watermark information is embedded into the patterns or logos of legitimate products. In the distribution process and at the purchase stage, if the digital watermark is detected, the product can be determined to be legitimate. If the digital watermark is not detected, then the product can be determined to be a counterfeit. There is also a method to determine authenticity from another perspective. If the strength of the digital watermarks is purposely reduced, the digital watermarking information in the areas that are altered or processed will be lost. This makes it possible to determine what areas have been tampered with. In this way, depending on the application, two different models can be selected. In one, the strength of the digital watermarks can be increased to improve its evidential capacity, and in the other, the strength can be reduced to enable identification of areas that have been altered.

In regard to the previously mentioned copyright protection, traceability, and proof of authenticity, I believe that adding information that cannot be seen by the human eye to the medium can be effective. On the other hand, displaying a visible mark on the medium could have the effect of deterring illegal use; I refer to this as the deterrent effect. Explicitly displaying visible logos or names on products has the potential to have a deterrent effect, thus providing defense against illegal copying. Credits are often displayed on the edge of images or videos. However, the major difference between credits and visible digital watermarks is that by purposely using a release key afterwards, the visible portion can be removed, allowing the original content to be extracted without leaving any excess. In other words, a service model can be created in which content is first released having the deterrent effect, and users can then be provided the original content upon completing official procedures.

Until now, I have focused on means of protecting media. Next, I will discuss the application of digital watermarking for sales promotion. Digital watermarking is a technology that was originally designed considering strong security elements. However, the use of digital watermarking for advertising purposes can be easily considered \[[17](https://www.intechopen.com/chapters/18098/#B17)\-[19](https://www.intechopen.com/chapters/18098/#B19)\]. By embedding URL information into image, video, or audio content using digital watermarking, a mobile phone camera can be used to read the watermarks and guide the user to Web pages that contain information related to the media content. In the case of video and audio media, unlike images and physical media, the content changes with the passage of time. Therefore, this method has a significant advantage in that users can acquire and view information related to the content of interest, unconstrained by time. As an example of practical use for music content, a model can be devised in which the user can easily be guided to an artist’s Web site while listening to music content of interest.

|                                                          |                                                          |                                        Digital watermarking for physical media                                        |                          Digital watermarking for static images                           |                  Digital watermarking for video                   |                           Digital watermarking for audio                            |
|----------------------------------------------------------|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------|
|                  Medium characteristics                  |                  Visible/<br>Invisible                   |                                                        Visible                                                        |                                          Visible                                          |                              Visible                              |                                      Invisible                                      |
|                  Medium characteristics                  |                 Physical/<br>Electronic                  |                                                    Physical media                                                     |                                      Electronic data                                      |                          Electronic data                          |                                   Electronic data                                   |
|                  Medium characteristics                  |                    Changes over time                     |                                               Does not change over time                                               |                                 Does not change over time                                 |                         Changes over time                         |                                  Changes over time                                  |
|                   Copyright protection                   |                   Copyright protection                   |                                            Embedding copyright information                                            |                           Embedding copyright owner information                           |               Embedding copyright owner information               |                        Embedding copyright owner information                        |
|                   Copyright protection                   |                   Copyright protection                   |                       Copyright protection for physical media (metals, cloths, plastics, etc.)                        |                       Copyright protection for images and pictures                        |       Copyright protection for DVDs, broadcasts, and movies       |                 Copyright protection for CDs, broadcasts, and music                 |
|                   Copyright protection                   |                   Copyright protection                   |                                                                                                                       |               Copyright protection for public documents and research papers               |                                                                   |                                                                                     |
|                   Copyright protection                   |                   Copyright protection                   |                                                                                                                       |                                                                                           |                                                                   |                                                                                     |
|                Distribution traceability                 |                Distribution traceability                 |                             Add the producer's information, and the tracking information                              |              Add the tracking information to the contents for first-time use              |  Add the tracking information to the contents for first-time use  |               Add tracking information to contents for first-time use               |
|                Distribution traceability                 |                Distribution traceability                 |                                 for the distribution route to the products and goods                                  |              (use by the copyright holder), and second-time use (reselling)               |  (use by the copyright holder), and second-time use (reselling)   |           (use by the copyright holder), and second-time use (reselling)            |
|                Distribution traceability                 |                Distribution traceability                 |                            Detect a product's unique information from the physical medium                             |              Understand the distribution process by adding copyright holder               |                 Tracking illegal movie recording                  |           Understand the distribution process by adding copyright holder            |
|                Distribution traceability                 |                Distribution traceability                 |                               (Apply to products that cannot support QR codes and RFID)                               |                  and buyer information to movie and photo download sales                  |                                                                   |                    and buyer information to music download sales                    |
|                Distribution traceability                 |                Distribution traceability                 |              Adding traceability to products and goods in high-temperature or high-humidity environments              |                                                                                           |                                                                   |                                                                                     |
|                Distribution traceability                 |                Distribution traceability                 |                                                                                                                       |                                                                                           |                                                                   |                                                                                     |
|                  Proof of authenticity                   |                  Proof of authenticity                   |                             Detect unique information about products from physical media                              |    Detection of illegal copying and alteration of public documents and research papers    | Detection of pirated DVDs and illegal video distribution websites |          Detection of pirated CDs and illegal music distribution websites           |
|                  Proof of authenticity                   |                  Proof of authenticity                   | Detection of counterfeit brand name goods, or discovery of the illegal export using the vehicle identification number |                                                                                           |                 Tracking illegal movie recording                  |                                                                                     |
|                  Proof of authenticity                   |                  Proof of authenticity                   |                                                                                                                       |                                                                                           |                                                                   |                                                                                     |
|             Can be used on printed materials             |             Can be used on printed materials             |                                                                                                                       |         Detection of illegal copying for magazines, gravure, and CD jacket images         |                                 -                                 |                                          -                                          |
|             Can be used on printed materials             |             Can be used on printed materials             |                                                                                                                       |           Detection of illegal copying of public documents and research papers            |                                 -                                 |                                          -                                          |
|             Can be used on printed materials             |             Can be used on printed materials             |                                                                                                                       |                                                                                           |                                                                   |                                                                                     |
|                     Deterrent effect                     |                     Deterrent effect                     |                              Intimidation against illegal copying of products and goods                               |           Protection for copyright and portrait rights for images and pictures            |      Protection for copyright and portrait rights for images      |                                          -                                          |
| (Deterrent effect from using visible digital watermarks) | (Deterrent effect from using visible digital watermarks) |                                                                                                                       |                Removed depending on the situation (e.g., legitimate sales)                |                Removed depending on the situation                 |                                          -                                          |
| (Deterrent effect from using visible digital watermarks) | (Deterrent effect from using visible digital watermarks) |                                                                                                                       |                           Intimidation against illegal copying                            |               Intimidation against illegal copying                |                                          -                                          |
| (Deterrent effect from using visible digital watermarks) | (Deterrent effect from using visible digital watermarks) |                                                                                                                       |                                                                                           |                                                                   |                                                                                     |
|                     Sales promotion                      |                     Sales promotion                      |                            Guidance to related websites and websites with product details                             |              Guidance to related websites and websites with product details               |  Guidance to related websites and websites with product details   |           Guidance to related websites and websites with product details            |
|                     Sales promotion                      |                     Sales promotion                      |                          Detect unique information about the product from the physical media                          |                    Online provision of the latest magazines and books                     |    Acquire detailed information from TV broadcasts and videos     |                   Download ring tones or entire song for karaoke                    |
|                     Sales promotion                      |                     Sales promotion                      |               (Services available to the purchaser only, introduction campaigns for new products, etc.)               | (Services available to the purchaser only, introduction campaigns for new products, etc.) |                                                                   | Provide visual information from the audio for individuals with hearing disabilities |
|                     Sales promotion                      |                     Sales promotion                      |                                                                                                                       |                                                                                           |                                                                   |                                                                                     |

### Table 2.

[Table 2](https://www.intechopen.com/chapters/18098/#T2). Types of digital watermarking and their objectives and applications

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 6\. Solution by integrated framework

Digital watermarking technology embeds information that cannot be detected by the human eye into the content. By using the redundancy in digital contents to slightly change the values of the pixels across the image, data that the user cannot normally see can be stored in the image in addition to the usual image data. [Fig. 4](https://www.intechopen.com/chapters/18098/#F4) shows the use case chart of the digital watermark.

As shown in [Fig. 4](https://www.intechopen.com/chapters/18098/#F4), this data is directly embedded into the image, and therefore it has the characteristic feature that it cannot be removed even if the image is compressed, formatted, modified, cropped, or printed. This enables the automatic discovery of unauthorized copies of an image file among the enormous number of images on the Internet by embedding the image ID, the copyright holder's name, or other conditions into the image. In addition, by proactively communicating to users that this feature is in use, it will deter unauthorized use.

![Figure 4.Use case chart of the digital watermark](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image5.jpeg)

#### Figure 4.

Use case chart of the digital watermark

I have discussed a variety of ways in which digital watermarking technology can be used to secure information media, and also how it can be used for sales marketing. The framework that integrates these is shown in [Fig 5](https://www.intechopen.com/chapters/18098/#F5).

The platform's general utility is a critical element in implementing this technology on mobile devices such as mobile phones \[[20](https://www.intechopen.com/chapters/18098/#B20)\]. There are two methods for detecting watermarking on mobile devices. The first is a client-server method where the file itself is sent to a server and the server detects the watermark. The second is a method where the mobile device itself detects the digital watermark. Performance is rarely an issue with the client-server method as detection is performed on servers with high processing power. However, the disadvantage of this method is that the file must be sent to the server, a process that is time consuming and entails communication costs. In cases where a digital watermark cannot be detected, this result can only be known after sending the file to the server. By performing the entire process of detecting digital watermarks on the mobile device, users can be guided to a variety of network services such as Web services and e-mail to obtain information without incurring communication costs. For this reason, digital watermarking processes in a mobile environment are preferably based on a method where the detection of digital watermarks is performed on the mobile device, preferably using a digital watermark detection application that supports mobile OS middleware such as Java and BREW.

![Figure 5.Integrated framework](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image6.jpeg)

#### Figure 5.

Integrated framework

As shown in [Fig. 6](https://www.intechopen.com/chapters/18098/#F6), since middleware neutralize the various differences in the bottom-most hardware layer, generic utility of the platform and good development efficiency are achieved. Device manufacturers can outsource the development of embedded software and concentrate on hardware development. Software developers can develop applications without worrying about differences between platforms. Also, developers do not have to develop different applications for different device vendors. This will eventually lead to applications for not only mobile phones but also smart phones and PDAs.

Next, I explain a mobile solution of the digital watermark to each media.

### 6.1. Physical media

Data management is performed by using a laser to burn a digital watermark into raw materials such as iron, aluminium, stainless steel, and plastic, and then reading the marking with a reader. The read data is linked to a database, after which management, acceptance examinations, sorting, and distribution can be monitored. An encryption algorithm protects the marking itself, and user authentication and alteration prevention are considered.

As shown in [Fig. 7](https://www.intechopen.com/chapters/18098/#F7), DPM

Direct Parts Marking. Direct Parts Marking is a process to permanently mark parts.

is a method where markings are made directly onto a product itself. As part of this research project, digital watermarking is implemented using DPM. One characteristic of DPM is that because the markings are made directly onto the material, there is no need to worry that the markings might peel off like an adhesive label. Markings made using DPM can be used in harsh environments and deterioration of the markings is slow, so they can be used over a long period of time \[[21](https://www.intechopen.com/chapters/18098/#B21)\].

![Figure 6.Software stack for mobile equipment](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image7.jpeg)

#### Figure 6.

Software stack for mobile equipment

[Fig. 8](https://www.intechopen.com/chapters/18098/#F8) is an example of the mobile application for physical media. In one example, the application of DRM technology to the design of brand name products allows for legitimate product authentication and makes it possible to identify the distribution route. Also, directions to the Web site of the relevant brands can also be added. An example applies DRM technology to the coating and parts of an automobile. By recording the automobile data, which cannot be altered by the user, DRM can be used as a theft detection and crime-prevention measure. In addition, services can be provided, such as promotions with information about new car models from the car manufacturer, or the current market price for used cars. These markings can be used in the manufacturing industry to embed a unique ID or lot number into metallic parts for the purpose of automobile detection and accident prevention.

![Figure 7.Example of information detection from physical media](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image8.png)

#### Figure 7.

Example of information detection from physical media

New data management and business schemes can be constructed by using the previously mentioned digital watermarking. Digital watermarking technology was originally used to enforce copyright and for certifying authorship. However, new business models have been established on the basis of this technology.

![Figure 8.Example of mobile application for physical media](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image9.jpeg)

#### Figure 8.

Example of mobile application for physical media

Additionally, a system that confirms distribution routes with absolute certainty can be designed and applied in other fields, for example, by embedding digital watermarks into medical equipment (e.g., scalpels or scissors) and managing the equipment with a database. In this way, equipment that needs a lease renewal or quantity check can be managed.

### 6.2. Static images

Presently many posters, pamphlets, magazines, and company brochures have Internet URLs printed on them. Details that cannot be printed on paper such as the latest information or information about related services are published on the Internet. However, there are various problems. Inputting a URL while looking at the printed material is troublesome, input mistakes can occur, and even if there are multiple information items introduced on the printed material, usually only the URL to the top page of the Web site is noted, making it difficult to locate the desired information. Also, the use of many recognition technologies has been hampered by problems with the layout and design of existing media.

A characteristic of using digital watermarking technology in a mobile environment is that mobile content is accessed directly from printed material, providing cross-media marketing. Digital watermarking facilitates the normally difficult task of measuring the effectiveness of promotions using printed medium. When the specialized application software is downloaded, the customer’s data is collected, and a unique digital watermarking ID is embedded based on the type of printed medium, the distribution time, and region. Because the connection destination URL information is managed on the server, the user sends the ID information to the content management server and then receives the URL information. In this way, a detailed access log with information on when and where it was accessed, who accessed it, and what print medium was used can be collected, allowing the effectiveness of the printed material to be measured and analyzed.

### 6.3. Video media

In the introduction, I explained that the distribution of pirated media created from the illegal recording of motion pictures has become a major societal problem \[[22](https://www.intechopen.com/chapters/18098/#B22)\]. In recent years, motions pictures have been distributed not only on film, but also, in many cases, in digital formats as video data. Information about the time and location that the movie is shown can be embedded into the movie as digital watermarking information and then the movie is shown. The viewers will watch the movie without noticing that this information has been embedded. If the movie is pirated and shown illegally via DVD or over the Internet, when the movie was copied and from what movie theater can be determined by detecting the digital watermarking information. [Fig. 9](https://www.intechopen.com/chapters/18098/#F9) is an example of detecting information from movie media.

![Figure 9.Example of information detection from movie media](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image10.jpeg)

#### Figure 9.

Example of information detection from movie media

Next, let us consider a service that links the movie database with mobile devices. In recent years, increasing numbers of TV stations and other companies that possess movie content have been managing their digital data as a media archive stored in a database. They can reuse the content by redistributing them on television or over the Internet, or create added value and use them as services for the mobile market. Information about related sites can be embedded as digital watermarks into the movie content that is managed using the database.

If digital watermarking is used to embed a URL into movie content, the URL can be extracted from the video by inputting it via the mobile phone’s camera by simply holding the phone up to the display. On TV programs information is sometimes displayed temporary on the screen, such as sports scores, or recipes in the case of cooking shows. However the amount of time that this information is provided is extremely short and the necessary information is often missed. With paper media such as magazines it is possible to use a QR code or a URL to link to a mobile Web site, but it is difficult to acquire information from movie content because the screen is constantly changing. It is also undesirable to constantly display a QR code or URL on a screen. However, if digital watermarking for movies is used, the required information can be extracted from the movie itself and linked to the mobile phone. This eliminates the need to display information on the screen for long periods of time. The mobile phone only needs to be held up to the screen to access the information, so there is no need for the viewer to hurry to write down the information. The extremely convenient interface places little burden on the user. For example, the following information could be provided: shop information during a gourmet TV program, recipes during a cooking program, or lodging information during a travel program. It would also be possible to search for and acquire the necessary information from mobile phone sites after the TV program has ended. Also, by holding up a mobile phone to the screen when a favorite musician is playing during a music program, the user can easily access the music data and the artist’s Web site. Finally, similar to the measures to prevent the illegal recording of movies, copyright information could be embedded into the watermark to use in measures to prevent illegal usage.

### 6.4. Audio media

Next, let us turn our attention to services that utilize digital watermarking on audio media. By embedding digital watermark information onto music or audio files, and reading these files on mobile phones and mobile devices equipped with microphones, such as PDAs, information and content can be displayed that is relevant to the music or audio the user is listening to, and users can also be guided to predefined sources of information such as Web sites. Depending on the specification of the digital watermark detection program and the content of embedded information, users, in addition to being guided to a particular Web site, will also be able to access phone numbers and e-mail information, as well as view relevant video.

In [Fig. 10](https://www.intechopen.com/chapters/18098/#F10), this schematic shows an example where the mobile device reads digital watermark information embedded in broadcasts or karaoke tunes, and the user is guided to an advertisement site or presented with information such as coupon information or information on the site of a particular manufacturer. For example, the user can select a favorite karaoke tune, visit the artist’s site, the URL for which is extracted from the audio being played back, and then download the original song.

![Figure 10.Guiding users to mobile services from audio media](https://www.intechopen.com//cdnintech.com/media/chapter/18098/1512345123/media/image11.jpeg)

#### Figure 10.

Guiding users to mobile services from audio media

Digital watermarking can also be used as an information feature at public facilities such as zoos and museums. Since the input source is in audio format, information can be obtained easily over a broad area as opposed to QR codes, which require users to take close-up shots of a specific point. This will be an effective way to provide guidance information in large venues where visitors can often get lost.

Audio files do not require special equipment and can be played back on any consumer market speaker. This technology enables operators to provide interactive services in situations where only a mobile phone or PDA is used. More information can be provided if the mobile device is equipped with Internet connectivity. Compared to similar services based on RFID, digital watermarking, which extracts information from audio files without the use of IC tags, delivers the same effect at a lower cost. Since generic mobile phones can be used instead of special devices, development costs, and device purchase costs can be reduced, expanding the technology’s range of applications.

[Advertisement](https://ehealthcaresolutions.com/contact-us/)

## 7\. Conclusion

In this way, watermarking technology can identify certain copyrighted content and the related rights during the distribution process or after distribution. If revolutionary and new content distribution and usage models can be realized, the confirmation of the copyright owner and rights management will become possible. However, there has been little research done on the implementation method. Especially in the case of embedded software, which is widely used in mobile devices, implementation is seen to be difficult due to the limited implementation resources. Also, in regard to the assimilation of different implementations and platforms of the wide variety of digital watermarking algorithms, the amount of development work is becoming huge and existing resources are only rarely being reused. Moreover, the increasing complexity of errors and memory management that has accompanied this increase in development scale has become a problem that can no longer be ignored. Uncertainty can be actively managed and exploited. The unexpected developments in an environment can be actively managed through flexible designs that can adjust to changed conditions. Moreover, these new states can provide opportunities. Thus, it is important to broaden one’s perspective to consider not only risk but also opportunities. Architecture is important. It is useful and productive to consider explicitly how the parts of an engineering system interact with each other. It may often be essential to do so, to enable us to deal effectively with the need to reconfigure systems in response to new possibilities and new requirements.

Digital multimedia content requires a copyright protection system to be constructed due to the ease by which they can be copied and edited, and due to the ease of high-volume distribution through digital distribution channels. By embedding copy control information into digital watermarks, which are robust against digital disturbances, it is possible to construct a copyright protection system that can prevent illegal copying. The control information that is embedded into digital watermarks can be securely transmitted to the system through both the packaging for physical distribution, and through the network for digital distribution, thus strongly protecting the author’s copyright. Many security rules for information media are complex, and they are not unified across regions and for every application. By using digital watermarking technology on information media, information can be embedded into different media without regard to the application or environment. Moreover, the service can be provided regardless of what hardware or software is used. In sum, digital watermarking is a technology that is not affected by various conditions such as business models or the structure of the system that is used, software differences, coding differences, or copyright management policies. I anticipate that using an economical copyright protection system that uses digital watermarking will promote the digitization of multimedia content, and protect the author’s copyright. This will also foster more open and global multimedia content distribution.

## References

1.  1. Kineo Matsui.1998Base of Digital Watermark (In Japanese), Morikita Publishing Co., Ltd.,
2.  2. LiquidAudio.Musicon.theNet. A.TopographicTour.ofthe.OnlineMusic.Worldhttp://www.minidisc.org/music\_internet.html. .AccessedOct.2010
3.  3. Kazuhiro Okamura.2008The one that electronic watermark brings-First part-(In Japanese), Monthly Automatic Operation Recognition, Feb. 2008 212Japan Industrial Publishing Co. Ltd., 3638
4.  4. Business Software Alliance, Web site, (In Japanese),2010
5.  5. Manabu Hirakawa, Junichi Iijima.2009Validating the effectiveness of using digital watermarking technology for e-commerce website protection,” Proceedings of the 9<sup>th</sup> Asian eBusiness Workshop, 21127132
6.  6. Kotaro Nawa.1996Copyright of Cyberspace (In Japanese), Chuokoron-sha, 194
7.  7. Kenji Naemura.1997Copyright of Multimedia Society (In Japanese), Keio University Press Inc., 285
8.  8. Fumitada Takahashi.1997The digital watermark keeps to the multimedia era (In Japanese),” Nikkei Electronics, Nikkei BP Marketing Inc., 6832-2499124
9.  9. Satoshi Nanamatsu, Toshihiro Masumoto, Kazuyoshi Tanaka.2000Multimedia digital contents and copyright protection (In Japanese),” Information Management, 421210131021
10.  10. Kineo Matsui.1998Base of Digital Watermark- New Protection Technologies for Multimedia- (In Japanese), Morikita Publishing Co., Ltd.,
11.  11. Kineo Matsui.1998Electronic watermark and the evaluation item,” Institute of Image Electronics Engineers of Japan Magazine, 275483491
12.  12. Kiyoshi Yamanaka.1998Problem in application to electronic watermark and copyright protection,” Information Management, 4010933940
13.  13. Naohisa Komatsu, Kenichi Tanaka.2004Digital watermarking technology- Digital content security (In Japanese),” Institute of Image Electronics Engineers of Japan Magazine
14.  14. Tsukasa Ono.2001Digital Watermark and Contents Protection (In Japanese), Ohm-sha Co., Ltd.,
15.  15. Manabu Hirakawa.2008A digital watermark service model’s effectiveness of verification in copyright protection (In Japanese),” Proceedings of National Spring Research Conference 2008, The Japan Society for Management Information, G4G2
16.  16. Manabu Hirakawa, Junichi Iijima.2008A study on usage of digital watermark in distribution management (In Japanese),” Proceedings of National Autumn Research Conference 2008, The Japan Society for Management Information, B1B3
17.  17. KeyPousttchi.DietmarG.Wiedemann2006A Contribution to theory building for mobile marketing: Categorizing mobile marketing campaigns through case study research,” Proceedings of ICMB ‘06. International Conference, 11
18.  18. Andreas Albers, Christian Kahl.2008Design and implementation of context-sensitive mobile marketing platforms,” Proceedings of E-Commerce Technology and the Fifth IEEE Conference on Enterprise Computing, 10th IEEE Conference, 273278
19.  19. Phyoung Jung Kim, Young Ju Noh.2003Mobile agent system architecture for supporting mobile market application service in mobile computing environment,” Proceedings of Geometric Modeling and Graphics International Conference, 149153
20.  20. Hidemi Mizoguchi, Yukinori Miyakita, Yuta Tokoro.2007EZ Applications Explained (BREW) Programming, RIC Telecom Co., Ltd.,
21.  21. Kazuhiro Okamura.2008The one that electronic watermark brings-Latter part-(In Japanese),” Monthly Automatic Operation Recognition, Mar. 2008 213Japan Industrial Publishing Co. Ltd., 3336
22.  22. Japan and International Motion Picture Copyright Association, Inc.2010

## Notes

-   Radio-Frequency IDentification. RFID is an automatic identification method.
-   Quick Response Code. A matrix code (or two-dimensional bar code).
-   Direct Parts Marking. Direct Parts Marking is a process to permanently mark parts.

### Sections

Author information

-   1.Introduction
-   2.Background of this research
-   3.Problems
-   4.Comparison with existing technology
-   5.Media types and their objectives
-   6.Solution by integrated framework
-   7.Conclusion

References Footnotes

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18098/#)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-share.svg) Share

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-copy.svg) Cite

Cite this chapter

There are two ways to cite this chapter:

1\. Choose citation style Select style Vancouver APA Harvard IEEE MLA Chicago  Copy to clipboard Get citation

2\. Choose citation style Select format Bibtex RIS [Download citation](https://www.intechopen.com/chapters/18098/#)

![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-checkmark-circle-checked.svg)

 ![](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/series/icons/ic-open-book.svg) View Book Chapters [![IntechOpen](https://www.intechopen.com//cdnintech.com/web/frontend/www/assets/06.115/svg/logoSmall_red.svg) Publish with IntechOpen](https://www.intechopen.com/publish)

Next chapter

#### RFID Middleware Design and Architecture

By Mehdia Ajana El Khaddar, Mohammed Boulmalf, Hamid Harroud and Mohammed Elkoutbi

10,772 downloads | 6 cites

Written By

Manabu Hirakawa

Submitted: 21 October 2010 Published: 15 June 2011

[DOWNLOAD FOR FREE](https://www.intechopen.com/chapters/18098/#)

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