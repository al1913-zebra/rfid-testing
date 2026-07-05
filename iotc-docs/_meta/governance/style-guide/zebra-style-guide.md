## **Technical Publications** **Style Guide**



P1086622-001 Rev. A


**© 2016 ZIH Corp. and/or its affiliates.** All rights reserved. Zebra and the stylized Zebra head are trademarks
of ZIH Corp., registered in many jurisdictions worldwide. All other trademarks are the property of their respective
owners.


**Proprietary Statement** This manual contains proprietary information of Zebra Technologies Corporation and its
subsidiaries (“Zebra Technologies”). It is intended solely for the information and use of parties operating and
maintaining the equipment described herein. Such proprietary information may not be used, reproduced, or disclosed
to any other parties for any other purpose without the express, written permission of Zebra Technologies.


**Product Improvements** Continuous improvement of products is a policy of Zebra Technologies. All
specifications and designs are subject to change without notice.


**Liability Disclaimer** Zebra Technologies takes steps to ensure that its published Engineering specifications and
manuals are correct; however, errors do occur. Zebra Technologies reserves the right to correct any such errors and
disclaims liability resulting therefrom.


**Limitation of Liability** In no event shall Zebra Technologies or anyone else involved in the creation, production,
or delivery of the accompanying product (including hardware and software) be liable for any damages whatsoever
(including, without limitation, consequential damages including loss of business profits, business interruption, or loss
of business information) arising out of the use of, the results of use of, or inability to use such product, even if Zebra
Technologies has been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or
limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to you.


# Contents

**Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7**


Purpose . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
How This Document Is Organized . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
Audience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
Reference Publications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .11


**Writing Style . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13**


Write Simply, Directly, and Accurately . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Gender . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Humor . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Advocacy . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Declaring the Audience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Sentence and Paragraph Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Active voice . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Present Tense . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
First Person . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
Second Person . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
Misplaced Modifiers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Meaningless Modifiers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Possessive Case . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Case . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
Number . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19


2/29/16 P1086622-001


**4** **Contents**


Rhetoric . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Anthropomorphism . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Cliches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Docucentric Writing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Jargon . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Negative Construction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Nouns . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Parallel Construction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Phrases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Steps . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Menu Navigation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Copyrights and Trademarks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Cross-references . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
If / Then Tables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Mechanics of Writing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
Capitalization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
Contractions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
Numbers and Numerals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
Measurement Abbreviations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
Punctuation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
Apostrophe . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
Colons and Semicolons . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
Comma . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
Em dashes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
En dashes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
Hyphen . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
Italics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
Ellipsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31
Parentheses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31
Period . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32
Prefixes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32
Quotation Marks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32
Straight Quote Marks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32
Slash . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32
Preferred Words and Phrases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 33
Acronyms and Abbreviations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37


**Construction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39**


Lists . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
Unnumbered Single-Column and Multi-Column Lists . . . . . . . . . . . . . . . . . . . . . . . . 41
Line and Page Breaks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Line Breaks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Page Breaks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41


P1086622-001 Style Guide Style Guide 2/29/16


**Contents** **5**


Cross-References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
Procedures . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
Tables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
Notes, Cautions, Warnings and Important Statements . . . . . . . . . . . . . . . . . . . . . . . . . . 43
Dialog Box/Windows/Screens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44
Hyperlink . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44
URLs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 44
Troubleshooting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
Illustrations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Scale . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Leader Lines . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Arrowheads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Call Outs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Product Names . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
Key, Button, and Mouse Conventions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
Menu Selections . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
API . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Syntax . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Related Commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Revisions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 50
Indexing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 50
What to Index . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 50
Capitalization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 51
Special Typography . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 51
Writing for an International Audience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 52


**User Interface Elements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55**


Menu Navigation and Selection . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55
Dialog Boxes/Windows/Screens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55
Touchscreen Gestures . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 56
Key, Button and Mouse Conventions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 56
API and Command Line . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57
Syntax . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57
Related Commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57


**Legal and Regulatory Guidelines . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 59**


TradeMarks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 60
Copyright . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 60
Regulatory Information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61
Warranty Information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61


2/29/16 Style Guide Style Guide P1086622-001


**6** **Contents**


**Editing Reference . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 63**


Editing Tips . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 64
Trademark Information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 64
Resources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Copyediting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Proofreading . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
The proofreading process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 66
To tighten the text, follow these tips: . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 67
Things to Look For When Editing and Reviewing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 68
Subject/verb agreement, noun/adjective agreement . . . . . . . . . . . . . . . . . . . . . . . . . 68
Syntactic Cues . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 68
Consistency in phrasing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 69
Making and Confirming Changes in Your Edited Document . . . . . . . . . . . . . . . . . . . . . . 69
Editor’s Checklist . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 70


**Glossary (Sample) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 71**


P1086622-001 Style Guide Style Guide 2/29/16


# Introduction

The Technical Publications Style Guide is designed to help Content Developers and
developmental editors maintain consistency within and across the Zebra end-user
information product line.

> **Scope & precedence (Zebra Handheld RFID IoT Connector docs site — 2026-06).**
> For this documentation site, the **site-rulebooks** in
> `_meta/governance/site-rulebooks/` (TITLE-NAMING, URL-NAMING, META-DESCRIPTION,
> 404-PAGE, SINGLE-SOURCE-OF-TRUTH) are **operative and take precedence over this
> guide wherever they conflict.** In particular the site uses **sentence-case**
> titles and headings and a warm, scent-phrased voice (e.g. sidebar labels such as
> "Watch your reader's pulse") and permits contractions — overriding this guide's
> legacy title-case / no-contractions / no-humour conventions. This guide governs
> everything the site-rulebooks do not address. (Recorded per actions-v1 Section 4
> #4; this scopes the "this guide overrides the referenced publications" statement
> in §Purpose below to non-site-rulebook matters.)


**Contents**
Purpose . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
How This Document Is Organized . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
Audience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
Reference Publications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11


2/29/16 P1086622-001


**8** **Introduction**
Purpose

### **Purpose**


A style guide provides conventions for writing style and document presentation. When
several options exist, style guides specify which to use. Style guides include company or
industry-specific topics. For some items, commercial style guides might not offer a
standard. Usually, style guide content is not a matter of “correct” or “incorrect.” Instead, the
guide represents employer or client decisions.


Style guides serve many purposes:


              - To ensure that documents conform to corporate requirements


              - To inform writers and editors of style decisions and solutions


              - To define negotiable and nonnegotiable style issues


              - To improve consistency within and among documents


              - To improve consistency between writers


              - To improve consistency between translators


              - To remove the necessity to reinvent the wheel


              - To remind the writer of project-specific style decisions


              - To serve as specifications for vendors, or for deliverables to clients


This guide is not intended at this time to provide guidance specific to the look and feel
(template design) of Zebra documentation.

### **Objectives**


The objective of this guide is to present a writing style that presents the technical content
in the simplest way possible to convey the information. All essential information must be
included, either by direct statements or by reference.


P1086622-001 Style Guide Style Guide 2/29/16


**Introduction** **9**
How This Document Is Organized

### **How This Document Is Organized**


The Style Guide is set up as follows:

|Section|Description|
|---|---|
|Introduction|The Technical Publications Style Guide is<br>designed to help Content Developers and<br>developmental editors maintain consistency<br>within and across the Zebra end-user information<br>product line.|
|Writing Style|Writing style is determined by all the decisions<br>you make while creating a document, such as the<br>type and tone of information you present, choice<br>of words, language and format consistency and<br>use of technical terms. Your style is part of the<br>unique value that information developers add to<br>the product. In the literary world, style is judged in<br>part on artistic grounds, which may be highly<br>subjective. In the field of technical documentation,<br>style is judged in part on the usability of the<br>documentation.|
|Construction|This section provides information about the use of<br>text and graphics elements in your documents.|
|User Interface Elements55|This section describes the User Interface<br>elements and terminology that should be used<br>across all Zebra product lines.55|
|Legal and Regulatory Guidelines|Information developers need to follow legal<br>guidelines that cover the proper usage and<br>marking of trademarks and the protection of<br>intellectual property. Trademarks and materials<br>that can be copyrighted are among a company’s<br>most valuable assets. Everyone who is involved<br>in the preparation of materials that use<br>trademarks or who creates materials subject to<br>copyright has a responsibility for securing and<br>protecting the copyrights and trademarks.|
|Editing Reference|This section contains tips on editing documents,<br>whether they are yours or someone else’s.|
|Glossary (Sample)|This section provides a sample glossary for the<br>printer business. This glossary will need to be<br>expanded to cover the broader product line of the<br>entire company.|



2/29/16 Style Guide Style Guide P1086622-001


**10** **Introduction**
Audience

### **Audience**


When planning a document, consider the appropriate writing style to use for the intended
audience and the manner in which the information is presented. The Technical
Publications team creates training and documentation targeted towards the following
audiences:


               - System administrators of large communication systems and equipment


               - End-users of our products


               - Technicians who troubleshoot and repair products


               - Zebra employees who must learn about products, including trainers, systems
integration, support, deployment, development engineers, testers, marketing, and
more.


               - Application developers using content to create third party applications to mage client
devices within a Zebra infrastructure.


P1086622-001 Style Guide Style Guide 2/29/16


**Introduction** **11**
Reference Publications

### **Reference Publications**


This style guide lists decisions we have made for this company. The guide supplements
standard style guides, dictionaries, and other reference material. If you can’t find your
topic in our style guide, look in these references, or refer your question to the editor.


The publications listed below are the referenced standards cited in this guide. Unless
otherwise specified, use the newest edition of the listed publications. When in conflict,
information in this guide overrides the referenced publications.


All reference documents listed below should be the most recently-released edition.


**Dictionaries and Online References**


            - _Merriam-Webster Collegiate Dictionary,_ www.merriamwebster.com


            - _Roget's Thesaurus_ .


            - ANSI/IEEE Std. 260-1 1D993. _Letter Symbols for Units of Measurement_
[(http://www.ansi.org).](http://www.ansi.org)


            - ANSI/IEEE Std. 280-1985. _Standard Letter Symbols for Quantities Used in Electrical_
_Science and Electrical Engineering_ [(http://www.ansi.org).](http://www.ansi.org)


**Style Manuals**


            - _Chicago Manual of Style_ . University of Chicago Press.


            - Newton, Harry. Newton's _Telecom Dictionary_ . Telecom Books.


            - _Developing Quality Technical Information: A Handbook for Writers and Editors_ . IBM
Press.


            - Horton, William K. _Designing and Writing Online Documentation: Hypermedia for Self-_
_Supporting Products_ ; John Wiley and Sons.


            - _Microsoft Manual of Style for Technical Publications_, Redmond, WA: Microsoft Press.


            - _Read Me First! A Style Guide for the Computer Industry_, Sun Technical Publications


**Grammar and Syntax Guides**


            - _The Cambridge Grammar of the English Language_, Huddleston, Rodney D. and
Pullum, Geoffrey K. (Cambridge England: Cambridge University Press).


            - Rudolf Flesch. The Art of Readable Writing. Particularly the second half of the book,
beginning about Chapter 11.


            - About passive voice: [http://www.asu.edu/aad/manuals/cam/cam301-01.html](http://www.asu.edu/aad/manuals/cam/cam301-01.html)


            - Composition tips, including phrases to avoid:
[http://execsec.od.nih.gov/help/basics/composition.html](https://execsec.od.nih.gov/guidelines/basics.asp)


2/29/16 Style Guide Style Guide P1086622-001


**12** **Introduction**
Reference Publications


**Notes •** ___________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


P1086622-001 Style Guide Style Guide 2/29/16


# Writing Style

Writing style is determined by all the decisions you make while creating a document, such
as the type and tone of information you present, choice of words, language and format
consistency and use of technical terms. Your style is part of the unique value that
information developers add to the product. In the literary world, style is judged in part on
artistic grounds, which may be highly subjective. In the field of technical documentation,
style is judged in part on the usability of the documentation.


**Contents**
Write Simply, Directly, and Accurately . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
Gender . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Humor . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Advocacy . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Declaring the Audience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Sentence and Paragraph Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Active voice . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
Present Tense . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
First Person . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
Second Person . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
Misplaced Modifiers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
Meaningless Modifiers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
Possessive Case . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Case . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Number . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Rhetoric . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
Anthropomorphism . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
Cliches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
Docucentric Writing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
Jargon . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
Negative Construction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Nouns . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Parallel Construction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Phrases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
Steps . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20


2/29/16 P1086622-001


**14** **Writing Style**


Menu Navigation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Copyrights and Trademarks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Cross-references . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
If / Then Tables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Mechanics of Writing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Capitalization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Interface Elements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
Titles and Headings . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
Punctuation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
Contractions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
Numbers and Numerals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
Fractions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
Measurements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
Measurement Abbreviations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
Punctuation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
Apostrophe . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
Colons and Semicolons . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
Comma . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
Em dashes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
En dashes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
Hyphen . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
Italics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
Ellipsis . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
Parentheses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
Period . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
Prefixes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
Quotation Marks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31
Slash . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31
Preferred Words and Phrases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **15**
Write Simply, Directly, and Accurately

### **Write Simply, Directly, and Accurately**


Straightforward, uncluttered writing is easier to understand and translate than more
convoluted text. Keep words, sentences and syntax simple. Minimize word length and the
number of syllables in a word. Avoid words that are general and vague.


Sentence length should be minimized. The number of modifiers should be reduced as
much as possible. Employ simple, active, affirmative, declarative sentences as much as
possible. A complex sentence contains one independent clause and at least one
dependent clause. The independent clause typically contains the primary thought or
information in the sentence. The dependent clause usually contains related, but less
important information. Avoid using complex sentences whenever possible.


Organize each paragraph around a topic sentence which gives the main idea of its
contents. Write sentences in paragraphs in logical order, so the thought progresses
logically as the user moves from one sentence to another and from one paragraph to
another. Avoid breaking a paragraph down beyond the third subdivision.


Preferably, each paragraph should deal with only one idea. Include in each paragraph only
as much as the reader can easily grasp. Use concrete details to make a paragraph
interesting and effective.


Respect a reader’s level of technical knowledge and competency and make sure that your
writing does not convey an arrogant or patronizing tone. Use words that are frequently
used by and are appropriate for the audience.


A reader expects you to be an expert on the subject or product discussed in your
document. Write in a style that affirms your expertise. For example, too many sentences
that include “you can” or “it is recommended” may confuse a reader who asks “but should
I do this?” Instead, use imperative verbs that tell a reader accurately and concisely what to
do. If you explain that a choice exists, describe for a reader the advantages and
disadvantages of the alternatives, and make recommendations depending upon different
scenarios.


**Note •** Zebra may want to consider evaluating Simplified Technical English or a variant
(Simplified English, Plain English, Controlled English, or Global English). Checkers are
available for Word and FrameMaker. These are links for a few example checkers:

**•** [http://www.tcworld.info/rss/article/a-close-look-at-simplified-technical-english/](http://www.tcworld.info/rss/article/a-close-look-at-simplified-technical-english/)

**•** [http://www.absolutedata.com/what-we-do/products/hyperste](http://www.absolutedata.com/what-we-do/products/hyperste)

#### **Gender**


Do not reference age, sex, race or national origin, use sex/age/race neutral terms. The
exception is to avoid creating awkward terms by using the word “person”. Terms such as
“workman” are considered sex neutral. Terms such as male and female connectors, pins,
etc, are acceptable.

#### **Humor**


Avoid humor at all time; it can confuse or even offend users. A jocular tone may sound
patronizing to some users, and others may not understand the joke. Humor causes
problems in localization.


2/29/16 Style Guide Style Guide P1086622-001


**16** **Writing Style**
Sentence and Paragraph Structure

#### **Advocacy**


The writer is the reader’s advocate. The opposition is ignorance of the product and, in
some cases, the infelicities and inconsistencies of the product’s design. If something is
difficult, pronounce it so. If two functions (as an example) use inconsistent argument
ordering, point it out. As a corollary, if two procedures seem to work to the same end,
explicitly emphasize the differences between them. In general, always consider the bigger
picture, and try to anticipate any questions or misconceptions that the reader may have.

#### **Declaring the Audience**


Every document should declare who is the intended audience, and if special acknowledge
or skills have been assumed when writing the manual. This should be stated in the About
This Guide chapter.


"Installed by certified professional" language is required by the FCC throughout installation
guides whenever specific radio channel and power declarations are made.

### **Sentence and Paragraph Structure**

#### **Active voice**


Use active voice instead of passive voice.


**Correct:** The Configuration menu lists the configuration options.

**Incorrect:** Configuration options are listed in the Configuration menu.

**Incorrect:** The configuration options listed are in the Configuration Menu.


Avoid the passive voice except to avoid a wordy or awkward construction; when the
subject is unknown or not the focus of the sentence; or in error messages and
troubleshooters, when the user is the subject and might feel blamed for the error if the
active voice were used.


Passive voice is sometimes used in programming documentation, but its use is
discouraged.


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **17**
Sentence and Paragraph Structure

#### **Present Tense**


Tense is the form of a verb that indicates time distinction. Use present tense whenever
possible.


**Correct:** Click Install. The Installation Options screen appears.

**Incorrect:** Click Install. The Installation Options screen will appear.

**Incorrect:** If you would click Install, the Installation Options screen would appear.


Use other tenses only when the present tense appears awkward or incorrect. The goal is
always to start sentences with an active voice using verbs that represent the subject in
action.


Mixing past, present and future tense leads to confusion and should be avoided at all
costs. If a sentence does not start with the action verb, look to find the verb within the
sentence and switch the sentence in order for the verb to begin the sentence.

#### **First Person**


Avoid the first person (I and we). It is acceptable to say “Zebra recommends” or “Zebra
suggests” to encourage the user to take some action, such as sending in the registration
card or keeping purchase records. The first person in these constructions is friendlier than
the passive “it is recommended.”

#### **Second Person**


The second person imperative mood should be used for procedures, i.e. “Remove mobile
computer from holster.” Third person indicative mood should be used for description and
discussion, i.e. “When the trigger is pulled the mobile computer scans the bar code.”


Use the second person (you) sparingly in most product documentation to refer to the user.
Using the second person focuses the discussion on the user and makes it easier to avoid
the passive voice. In material intended for developers, use the second person for the
developer and use the third person (the user) for the developer's end user. Differentiate
between you (the developer) and the program and actions it can perform.


Avoid vague pronoun references (VPR) where a pronoun cannot possibly refer to more
than one antecedent. If a pronoun seems to refer to more than one antecedent, either
reword the sentence to make the antecedent clear or eliminate the pronoun.


2/29/16 Style Guide Style Guide P1086622-001


**18** **Writing Style**
Sentence and Paragraph Structure

#### **Misplaced Modifiers**


A misplaced modifier is a word or phrase that does not clearly and logically modify a noun
or pronoun. Place modifiers as close as possible to the word or phrase they modify. Do not
use modifiers such as “strictly speaking,” “for the record” and “assuming you are right.”

**Incorrect:** While drinking coffee at the cafe, the system crashed.


**Correct:** The system crashed while Art drank a coffee at the Cafe.

**Incorrect:** The AP was designed by an engineer with a shock-resistant housing.


**Correct:** An engineer designed the AP with a shock-resistant housing.

#### **Meaningless Modifiers**


The following modifiers add bulk, but offer no meaning:


               - actually


               - always


               - currently


               - easily


               - generally


               - simply


               - seamlessly


               - successfully


               - usually

#### **Possessive Case**


Possessives are used to indicate ownership. Do not use possessives for inanimate
objects. The mobile computer does not “own” the holster, so the possessive form “mobile
computer's holster” is not correct. The “holster” is a related component so to correctly
identify which “holster” expand the name of the “holster” to “mobile computer holster”. The
exception to the rule on inanimate possessives is a corporation. While a corporation is an
inanimate, it is also considered an “entity,” so it is correct to use “Zebra’s products.”


P1086622-001 Style Guide Style Guide 2/29/16


#### **Case** **Number**



**Writing Style** **19**
Sentence and Paragraph Structure


Use the correct case, or form of nouns and pronouns, to show their relation to the rest of
the sentence. Nouns change form only in one case, the possessive. Pronouns change in
three cases, possessive, subjective or nominative and objective. Case is determined by
the function of the noun or pronoun within the sentence. A noun or pronoun representing a
thing or person possessing or owning something is in the possessive case. A pronoun
representing a person or thing acting is in the subjective or nominative case. A pronoun
that represents a person or thing receiving an action is in the objective case.


**Examples •** _Better examples needed here._


 - Set key names in all caps — for example, CTRL or ALT.


_•_ _Example 2_


_•_ _Example 3_


The exception to the rule on inanimate possessives is a corporation. While a corporation
is inanimate, it is also considered an “entity”, so it is correct to use “Zebra's products”.


When imputing ownership or other mapping, make sure the N-to-N relationship is clear (if
[the relationship matters). The sentence “Users should remember their passwords” neatly](http://wileyprd.symbol.com/regulatory/index.html)
avoids the gender issue, but the mapping between users and passwords (which is
[probably 1-to-1) is obscured.](http://wileyprd.symbol.com/regulatory/index.html)



2/29/16 Style Guide Style Guide P1086622-001


**20** **Writing Style**
Rhetoric

### **Rhetoric**


Language usage rules as relevant to Zebra Technical Publications documentation are
shown below.

#### **Anthropomorphism**


Do not attribute human characteristics, behavior or emotions to inanimate objects. Use
figurative language occasionally to explain the function of hardware and software as long
as the words do not convey human qualities.


**Correct:** MSP sends a prompt for a password.

**Incorrect:** MSP leads the user by hand to the menu.

#### **Cliches**


Avoid using trite words, phrases or sentences that have lost their impact or meaning
through excessive use. The verbosity and vagueness of a cliche clouds communication.


**Examples •**


               - Obvious cliches:


                 - 'last but not least,'


                 - 'easy as pie'


                 - 'have a nice day.’


               - Less obvious cliches:


                 - 'the job was a good fiit


                 - ‘she was on the fast track.'

#### **Docucentric Writing**


Write documentation in such a manner that reader attention is drawn to the information
and concepts in the document rather than the document itself. However, there are times
when it is necessary for the documentation to draw attention to itself. Making brief and
specific references to other areas of the document or other documents is acceptable.
Writing front matter or initial chapters or section paragraphs that explain what is coming or
what the content is designed to accomplish is also acceptable.


**Correct:**


               - The illustration below depicts the Welcome screen.


               - Refer to this Chapter when configuring device security.


               - Figure 12 below demonstrates.…


P1086622-001 Style Guide Style Guide 2/29/16


#### **Jargon**



**Writing Style** **21**
Rhetoric


Jargon is the technical language used by a particular profession or group. Jargon can be
acceptable in the right context for a particular audience, where it serves as a shortcut to
understanding concepts for those who understand the term. That audience however
requires clear definition. Technical jargon can be acceptable in documentation for
programmers and other technical audiences a certain background or level of expertise is
required. Marketing jargon and buzzwords are not acceptable in Zebra Technical
Publications information products.


Jargon is not acceptable if:


 - A more familiar term could easily be used.


 - It obscures meaning if the target audience is too small.


 - It's not specific to computer software, networks, operating systems, and the like.


#### **Negative Construction**

State information positively within Zebra information products and online reference
systems. Use Notes and Cautions whenever possible when using negative constructions
as they often assert the user “do not” take a certain course of action.

#### **Nouns**


Do not turn verbs into nouns or create verbs from nouns. Try to use concrete nouns and
active verbs to express the meaning of a sentence without being passive.

#### **Parallel Construction**


Phrases and sentences appearing in a list (bulleted or plain) or table should be made
consistent, especially when some of are sentences and some are fragments. Make certain
that all are fragments or all complete sentences, and begin each with the same part of
speech, such as a verb or noun. Use parallel construction for lists, outlines and headings.


**Correct:** To start scanning click the start button, select settings, and then click scan.

**Incorrect:** You start your scanner by clicking the start button, then select the settings
button, and click on scan.


**Correct:** I like eggs because they:


            - Taste great.


            - Break easily.


            - Make a pleasing splat sound.

**Incorrect:** I like eggs because:


            - They taste great.


            - They’re pretty.


            - If I throw them, there’s a pleasing “splat”.


2/29/16 Style Guide Style Guide P1086622-001


**22** **Writing Style**
Rhetoric

#### **Phrases**


When introducing a list or example, avoid mentioning the number of items. If the number
changes, your introduction is wrong.

#### **Steps**


Document from where, and follow with the action.

**Example •** From the menu bar, select File.

#### **Menu Navigation**


When documenting navigation from the menu bar, use > to show selections.

**Example •** From the menu bar, select File > Save.

#### **Copyrights and Trademarks**


For the complete reference on Zebra copyrights and trademarks, refer to
www.zebra.com/copyright. Place the ® or ™ on the first occurrence that is outside a
heading.

#### **Cross-references**


Whenever you introduce an item or location, use a cross-reference. Use _Refer to_ for
external references, and _See_ for internal references.

#### **If / Then Tables**


In a decision if/then table, use the following text to introduce the cross-reference:


               - If the step directs the user to the next step or section, use _Continue with._


               - If the step directs the user to skip steps or sections, use _Go to._


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **23**
Mechanics of Writing

### **Mechanics of Writing**


Error-free writing entails more than using good grammar. You must also use correct
mechanics of writing in your documents. The mechanics of writing specify how words
should be used when printed, whereas grammar reflects the form of words and their
relationships within a sentence. For instance, if you put a sentence-ending period outside
of quotation marks (“You have to stop”.) you have made an error in the mechanics of
writing, not grammar. This section discusses:


            - Capitalization


            - Contractions


            - Numbers and numerals


            - Punctuation.


            - Capitalization


In general, use standard capitalization rules whenever possible — for example, common
nouns are usually all lowercase and proper nouns are always capitalized. For most uses,
follow these guidelines:


            - Follow the capitalization rules or conventions of software or a specific product as
necessary, as in case-sensitive keywords, for example.


            - Never use all uppercase letters for emphasis.


            - Do not capitalize the spelled-out form of an acronym unless specified otherwise in the
list of _Acronyms and Abbreviations_ on page 37 _._


**Important •** [For the correct legal names for all Zebra products, including copyright and](http://www.zebra.com/copyright)
[trademark information, refer to www.zebra.com/copyright. If a product is in development,](http://www.zebra.com/copyright)
consult with the Product Manager.

#### **Capitalization**


**Interface Elements**


The following guidelines cover the basic capitalization rules as they apply to interface






|elements:|Col2|
|---|---|
|**Capitalize**|**Do Not Capitalize**|
|Functional elements that do not have a<br>label in the interface, such as toolbars (the<br>Standard toolbar) and toolbar buttons (the<br>Insert Table button).|Interface elements used generically, such<br>as toolbar, menu, scroll bar, and icon.|
|Menu names, command and command<br>button names, and dialog box titles and tab<br>names.<br>**Note •**Follow the interface. Usually, these<br>items use title caps. If the interface is<br>inconsistent, use title caps.|User input and program output unless it is<br>case-sensitive.|
|Dialog box elements.<br>**Note •**Follow the interface. If the interface<br>is inconsistent, use sentence caps.|Dialog box elements.<br>**Note •**Follow the interface. If the interface<br>is inconsistent, use sentence caps.|



2/29/16 Style Guide Style Guide P1086622-001


**24** **Writing Style**
Mechanics of Writing


**Titles and Headings**


The following guidelines represent traditional title capitalization standards, and are useful
in answering questions about capitalization of adverbs, prepositions, and verbal phrases.









|Capitalize|Do Not Capitalize|
|---|---|
|All<br>**•**<br>nouns<br>**•**<br>verbs (including is and other forms of<br>be)<br>**•**<br>adverbs (including than and when)<br>**•**<br>adjectives (including this and that)<br>**•**<br>pronouns (including its)|Articles unless an article is the first word in<br>the title:<br>**•**<br>a<br>**•**<br>an<br>**•**<br>the|
|The first and last words, regardless of their<br>part of speech<br>**•**<br>“The Text to Look For”|Coordinate conjunctions<br>**•**<br>and, but, for<br>**•**<br>nor, or|
|Prepositions that are part of a verb phrase:<br>**•**<br>“Backing Up Your Disk”|Prepositions of four or fewer letters.|
|The second word in compound words if it is<br>a noun or proper adjective or the words<br>have equal weight:<br>**•**<br>Cross-Reference<br>**•**<br>Pre-Microsoft Software<br>**•**<br>Read/Write Access<br>**•**<br>Run-Time|The word “to” in an infinitive phrase<br>**•**<br>“How to Format Your Hard Disk”|
|Interface and program terms that ordinarily<br>would not be capitalized, unless they are<br>case-sensitive:<br>**•**<br>“The fdisk Command”<br>Follow the traditional use of keywords and<br>other special terms in programming<br>languages<br>**•**<br>“The printf Function,”<br>**•**<br>“Using the EVEN and ALIGN<br>Directives”|The second word of a compound word if it is<br>another part of speech or a participle<br>modifying the first word:<br>**•**<br>How-to<br>**•**<br>Take-off|


**Punctuation**





The following guidelines cover the basic capitalization rules as they apply to punctuation:






|Capitalize|Do Not Capitalize|
|---|---|
|The first word of a new sentence following<br>any end punctuation. Write sentences to<br>avoid the use of a case-sensitive<br>lowercase word at the beginning.|The word following a colon unless the<br>word is a proper noun or the text following<br>the colon is a complete sentence.|
|The first word of a new sentence following<br>any end punctuation. Write sentences to<br>avoid the use of a case-sensitive<br>lowercase word at the beginning.|The word following an em dash unless it is<br>a proper noun, even if the text following<br>the em dash is a complete sentence.|



P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **25**
Mechanics of Writing

#### **Contractions**


A contraction is a word formed from two or more words by eliminating or combining some
letters or sounds. Avoid the use of contractions whenever possible as they can cause
problems during translations.


**Examples •**


            - “aren't” should be written as “are not””


            - “can't” should be written as “cannot”


            - “don't” should be written as “do not

#### **Numbers and Numerals**


In most cases, write numbers zero through nine as words; use numerals for numbers 10
and higher.


**Important •** If a value is displayed in a User Interface numerically, then the collateral
documentation that supports that UI should be stated numerically as well.


Otherwise, follow these guidelines:


            - Always use numerals for page, chapter and table numbers, most units of measure and
percentages except when in a table. Units of measure include bits, bytes, distance,
mass, picas, points, temperature, volume and weight.


            - In general, write numbers representing units of time as words. Units of time include
seconds, minutes, hours, days, weeks, months and years.


            - Use numerals when writing hours, minutes and seconds in the format: 12:02:56.


            - Begin sentences with numbers written as words rather than numerals.


            - Spell out approximate numbers.


            - Write two or more numbers in the same sentence or paragraph in the same manner,
regardless of their value.


            - When writing numerals for temperature, weight, length/distance, or volume, include
both Metric and Imperial values.


            - Use a hyphen when stating a numeric range as opposed to the word “between.” For
example, “Set the radio channel from 1-14.”


            - Do not break a numeric range over two lines if it can be avoided.


**Examples •**


            - two, four, six, eight, 10, 12, 14, 16


            - chapter 2, page 364


            - 47 degrees, about forty-seven degrees


            - it took more than two seconds


            - ten minutes after twelve, 12:10


            - Nine employees sent their…


            - 11 in (279.4 mm)


.


2/29/16 Style Guide Style Guide P1086622-001


**26** **Writing Style**
Mechanics of Writing


**Fractions**


Use numerals for fractions in tables and for units of measurement. Spell out common
fractions in running text. Use a space between a numeral and its related fraction. If a
fraction is being used as a modifier, insert a hyphen between the fraction and what it is
modifying. Spell out a numeric modifier of a fraction.


**Examples •**


               - 15 1/2 inches


               - 5.25-inch disk


               - ten 1/2-inch tape drives


**Measurements**


Avoid using measurements in examples unless mandatory to convey meaning. When
using measurements, use numerals for measurements regardless of number size or if the
unit of measurement is spelled out or abbreviated. Measurements include distance,
temperature, volume, size, weight, points but not time. Bits and bytes are also considered
units of measure.


**Examples •**


               - 5 inches


               - 0.5 inch


               - 8 bits


               - 12 points high.


When indicating distance or temperature, always include metric and standard
U.S./Imperial values. Metric should be listed first, followed by the Imperial measurement.


               - Include the same number of decimal places as in the original measurement.


               - Do not put spaces between the degree symbol and abbreviations for Celsius or
Fahrenheit.

**Example •** 24°C (75°F); 266.7 mm (10.5 in.)


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **27**
Measurement Abbreviations

### **Measurement Abbreviations**


Use these common abbreviations in all documents. With the exception of °C and °F, use a
space between the number and the abbreviation of its measurement.

|Measurement<br>alternating current|Abbrev. Measurement<br>AC inch<br>A joule<br>Bd kilo (SI prefix for 103)<br>b kilobit<br>bps kilobits per second<br>BTU kilobyte<br>B ohm<br>Cd pascal<br>c pico (SI prefix for 10-12)<br>cm picoamp<br>cps picofarad<br>C picohenry<br>m3 picovolt<br>d pound<br>dB pounds per square inch<br>dBm radio frequency<br>°C second<br>°F kilogram<br>DC kilohertz<br>dpi kilohm<br>dpi2 kilometer<br>EMU kilopascal<br>ESU kilovolt<br>F kilovolt-ampere<br>ft kilowatt<br>G kilowatt-hour<br>Gb mega (SI prefix for 106)<br>Gbps megabit<br>GB megabits per second<br>GHz megabyte<br>G megahertz<br>g megawatt<br>H megohm<br>Hz meter<br>hr micro (SI prefix for 10-6)|Abbrev. Measurement<br>in. microamp<br>J microfarad<br>k microhenry<br>kb microvolt<br>kbps micrometer<br>kB microsecond<br>W mile<br>Pa milli (SI prefix for 10-3)<br>p milliampere<br>pA millicandelas<br>pF millimeter<br>pH millihenry<br>pV millisecond<br>lb milivolt<br>psi milliwatt<br>RF millohm<br>sec minute<br>kg nano (SI prefix for 10-9)<br>kHz nanoamp<br>k nanovolt<br>km nanosecond<br>kPa ohm<br>kV newton<br>kVA<br>kW picovolt<br>kWh pounds per square inch<br>M square meter<br>Mb tera (SI prefix for 1012)<br>Mbps terahertz<br>MB terabits<br>MHz terabytes<br>MW volt<br>M volts alternating current<br>m volts direct current<br>m|Abbrev.<br>mA|
|---|---|---|---|
|ampere|ampere|ampere|F|
|baud|baud|baud|H|
|bit|bit|bit|V|
|bits per second|bits per second|bits per second|m|
|British thermal unit|British thermal unit|British thermal unit|sec|
|byte|byte|byte|mi|
|candela<br>|candela<br>|candela<br>|m|
|centi (SI prefix for 10-2)|centi (SI prefix for 10-2)|centi (SI prefix for 10-2)|mA|
|centimeter|centimeter|centimeter|mCd|
|characters per second|characters per second|characters per second|mm|
|coulomb|coulomb|coulomb|mH|
|cubic meter<br>|cubic meter<br>|cubic meter<br>|msec|
|deci (SI prefix for 10-1)|deci (SI prefix for 10-1)|deci (SI prefix for 10-1)|mV|
|decibel|decibel|decibel|mW|
|decibel below 1 milliwatt|decibel below 1 milliwatt|decibel below 1 milliwatt|m|
|degree Celsius|degree Celsius|degree Celsius|min|
|degree Fahrenheit|degree Fahrenheit|degree Fahrenheit|n|
|direct current|direct current|direct current|nA|
|dots per inch|dots per inch|dots per inch|nV|
|dots per square inch|dots per square inch|dots per square inch|nsec|
|electromagnetic unit|electromagnetic unit|electromagnetic unit|W|
|electrostatic unit|electrostatic unit|electrostatic unit|N|
|farad|farad|farad||
|foot<br>|foot<br>|foot<br>|pV|
|giga (SI prefix for 109)|giga (SI prefix for 109)|giga (SI prefix for 109)|psi<br>|
|gigabit|gigabit|gigabit|m2|
|gigabits per second|gigabits per second|gigabits per second|T|
|gigabyte|gigabyte|gigabyte|THz|
|gigahertz|gigahertz|gigahertz|Tb|
|gigohm or gigaohm|gigohm or gigaohm|gigohm or gigaohm|TB|
|gram|gram|gram|V|
|henry|henry|henry|VAC|
|hertz|hertz|hertz|VDC|
|hour|hour|hour||



2/29/16 Style Guide Style Guide P1086622-001


**28** **Writing Style**
Punctuation

### **Punctuation**


This section discusses punctuation rules and guidelines and notes exceptions that are
specific to technical documentation.


**Note •** A separate guide for translations will be developed to indicate how special
characters such as em dashes, or formatting such as italics and bold, will be handled in
localized content. Not all languages and character sets support their usage.

#### **Apostrophe**


Use an apostrophe to show possession, to indicate an omission of letters or numbers and
to form some plurals. Avoid using possessives of acronyms, products, or feature names if
possible. When placing a comma after a possessive noun that ends with an apostrophe,
insert the comma after the apostrophe. When using an apostrophe to indicate missing
letters or numbers, place it where the letters or numbers have been omitted.


Apostrophes should be used only for possessive animate objects. Refer to the Chicago
Manual of Style for exceptions to these rules

#### **Colons and Semicolons**


Use colons only when introducing a list, summary or long quotation. Use colons and
semicolons when separating closely related independent clauses, between explanatory
phrases introduced by words such as “for example,” “that is” and “namely.” Use colons
and semicolons when separating independent clauses connected by adverbs such as
“however,” “thus” and “accordingly.” Use colons in situations that include formal
salutations, ratios, dialogue and separation of a title and subtitle.


Do not insert a colon between a verb and its object, or between a preposition and its
object.

**Example •** Fiber optics provides several advantages: a long cable run, a large data
transmission capacity and a resistance to electromagnetic interference.

#### **Comma**


The comma indicates a subtle break in continuity of thought or sentence structure. An
excessive number of commas can make writing choppy while too few can make writing
confusing.


Use commas in situations that include separating independent clauses joined by
coordinating conjunctions (and, but, or, for, nor, yet, so), three or more items in a series,
and consecutive adjectives modifying the same noun.


When listing a series of items, use the serial comma (also called the Oxford comma)
between the coordinating conjunction and the next to the last item in the series.


**Examples •**


**Correct:** Zebra makes handheld scanners, barcode printers, and tablets.

**Incorrect:** Zebra makes handheld scanners, barcode printers and tablets.


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **29**
Punctuation

#### **Em dashes**


The em dash (—), based on the width of an uppercase M, is used primarily to set off
sentence elements.


Use an em dash to:


            - Set off within a sentence a parenthetical phrase that deserves more emphasis than
parentheses imply. Use two em dashes, one on each side of the phrase.


            - The information in your spreadsheet — numbers, formulas, text — is stored in cells.


            - Set off a phrase at the end of a sentence for emphasis. Use one em dash.


            - Set key names in all caps — for example, CTRL or ALT.


Do not use an em dash in place of a bullet or other typographic symbol to set off items in a
list. When a complete sentence follows an em dash, do not capitalize the first word unless
it's a proper noun.

#### **En dashes**


The en dash (–) is half the length of an em dash (that is, the width of an N) and slightly
longer than a hyphen. It is used primarily as a connecting element, especially with
numbers. Use an en dash:


            - To indicate a range of numbers such as inclusive values, dates or pages. For
Example:


             - © 1993–1994


             - pages 95–110


            - To indicate a minus sign.


            - To indicate negative numbers: –79.


            - Instead of a hyphen in a compound adjective in which at least one of the elements is
an open compound (such as “Windows 95"). That is, don't mix hyphens and endashes in the same compound adjective. For Example:


             - dialog box–type options


             - Windows NT–based programs


             - non-Windows-based programs [hyphenated]


             - MS-DOS-compatible products [hyphenated]


             - non–Windows-based programs


Do not use spaces on either side of an en dash.


2/29/16 Style Guide Style Guide P1086622-001


**30** **Writing Style**
Punctuation

#### **Hyphen** **Italics**



In general, the use of a hyphen should be dictated by whether or not it helps the reader.
Do not hyphenate words at the end of a line. Turn off automatic hyphenation in your
application if it is an option.


Hyphens are used when two or more words are joined together to express a single idea
and modify a noun. For example:


 - A fixed-mount scanner


 - Out-of-the-box implementation


 - Java-based architecture


If a sentence begins with a hyphenated word, only the first letter of the first word is
capitalized. For example:


 - Cost-savings programs make use orf straategic parftnersthips with1Zebra.


 - Any cost-savings programs make use of strategic partnerships with Zebra.


The hyphen functions primarily as a link between numbers and compound words, and a
replacement for the preposition to. Use a hyphen only if it clarifies the meaning of the text.
Do not place a hyphen between an adverb ending in “ly” and the modified verb or
adjective. Use a plus sign (+) in keyboard combinations rather than a hyphen. The primary
reference tools for hyphenation are the Random House Unabridged Dictionary and
Webster's Third International Dictionary.


**Examples •**


 - Press the LEFT-ARROW/RIGHT-ARROW key to enable the dial-up process.


 - Select the number of beeps from 0-9.


 - ALT+F10 not ALT-F10


Always italicize titles of external documents referenced within a document and internal
cross-references. For example:


 - Refer to the _WS5000 Wireless Switch User Guide_ for information on setting up the
network.


It is permissible to use italics for emphasis, but do so sparingly. Try to express emphasis
through your writing structure. If you need to emphasize words in all-italics text, set the
emphasized word(s) in regular typeface. For example:


 - Our customers find that Zebra addresses both their _short-term_ goals and their _long-_
_term_ business strategies.



P1086622-001 Style Guide Style Guide 2/29/16


#### **Ellipsis**



**Writing Style** **31**
Punctuation


Ellipses mark the omission of quoted text from within and between sentences and the
trailing off dialogue or thought. Use the font ligature for an ellipses if available (Alt+0133).
Otherwise, insert three periods without spaces within a sentence, and four periods without
a leading space at the end.


Use ellipses to indicate omitted code and in syntax lines. For example:


 - The documentation states the system administrator, “…assumes responsibility for
maintenance of the hardware.”


#### **Parentheses**

Before using parentheses, consider whether the material is important enough to be
included at all. If it is, perhaps the text fits better without parentheses within the paragraph.
If the information is not important, don’t include it.


Use parentheses:


            - With digressive text. Use parentheses to enclose relevant material that should not be
part of the main sentence, either because it would be confusing if punctuated
otherwise or because it is digressive. For example:


             - The Font menu, which provides four options (Regular, Italic, Bold, Bold Italic), is
easy to use.


             - You can save these settings in a “quick-start” file (explained fully in the next step)
to load them automatically.


            - For elaboration. Parentheses enclose material that further explains an element of the
main sentence, but is not critical to the sentence’s meaning. For example:


             - To suppress the printing of address information (particularly useful for messages
with many addresses), remove the check from the Print Header box.


            - In lists. Use two parentheses to offset letters or numerals that designate items listed
within a sentence. For example:


             - Choose from (a) keyboard entry, (b) mouse entry, and (c) voice entry.


            - With first occurrences. Parentheses enclose special keyboard symbols, and
abbreviations and acronyms when they first appear in text. For example:


             - The operating system inserts a tilde (~) when a file name is too long.


             - The software package tracks maintenance on your heating, ventilating, and air
conditioning (HVAC) systems.


            - When showing English (Translated) terms in a document.


            - When showing Metric (Imperial) measurements, lengths, and weights


2/29/16 Style Guide Style Guide P1086622-001


**32** **Writing Style**
Punctuation

#### **Period**


A period indicates a full stop. Place a period at the end of sentences, in network IP
addresses, factory assigned hardware MAC addresses, after initials in names, and after
abbreviations. Place a period between numbers to indicate decimal points, after the
numbers in numbered lists, and as leaders in tables of contents. Insert only one space
between sentences in all printed and on-line text.


**Examples •**


               - 128.43.76.1


               - …accommodate S1 terminals. Assign sessions to S24 terminals…

#### **Prefixes**


Do not use a hyphen between a prefix and a stem word unless a confusing word would
result or if the stem word begins with a capital letter.

#### **Quotation Marks**


Use double quotation marks to enclose direct quotations. Use italics rather than quotation
marks to identify paraphrasing, special words or technical terms and titles of books and
periodicals. Place commas, periods, question marks and exclamation marks inside
quotation marks, while colons and semicolons go outside. Place punctuation inside
quotation marks when it is part of the quoted text.


Direct quotes are generally not be used in technical publications.

#### **Straight Quote Marks**


Use straight quote marks in programming code and code samples.


**Correct:** ! U1 getvar "odometer.total_print_length"

**Incorrect:** ! U1 getvar “odometer.total_print_length”

#### **Slash**


Use a slash to separate, show omission, in constructions that suggest combination and to
indicate choice (such as in and/or). Use slashes sparingly in documentation.


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **33**
Preferred Words and Phrases

### **Preferred Words and Phrases**


Table 1 includes a list of recommended replacements for commonly used phrases.


**Table 1 • Rephrase List for Concise Writing**



















|USE|Do NOT Use|
|---|---|
|use 1D, 2D, 3D<br>**Note •**EVM has used 1D, 2D, and 3D exclusively in<br>numerous references. It would be impossible to<br>change all these references so we agreed to make<br>this the standard.|2-D or two-dimensional<br>1-D or one-dimensional<br>3-D or three-dimensional|
|about|in reference to|
|act|take action|
|although, even though|despite the fact that|
|always|in all cases, at all times|
|any|any and all|
|apparently, obviously|it is obvious that|
|as|in the form of|
|auto-ID<br>(spell out “automatic identification” on first reference<br>and then “auto-ID” on all subsequent references).|Auto-ID|
|bar code, bar coding, bar code-based|barcode (except Barcode Anything®) or barcoding|
|because|due to the fact that, the reason why is that, since|
|before|prior to that time|
|beneficial, better|advantageous|
|best|optimum|
|by|by means of|
|cable tie|tie wrap|
|can|has the capability to|
|cleanroom (for industrial references only)||
|clearly|it is clear that|
|click|click on|
|.com (when referring to a Internet address). When<br>referring to a dot com as a noun in text, use "dot-<br>com" (lowercase)|.COM|
|Compact Flash (Two words when referring to<br>wireless LAN connectivity, e.g., Symbol® Compact<br>Flash)||
|CompactFlash® (One word when referring to a<br>memory card. CompactFlash is a registered<br>trademark of SanDisk Corporation.)||
|confirmation, proof|verification|
|consecutive|consecutive in a row|


2/29/16 Style Guide Style Guide P1086622-001


**34** **Writing Style**
Preferred Words and Phrases


**Table 1 • Rephrase List for Concise Writing**







|USE|Do NOT Use|
|---|---|
|consider|take into consideration|
|considering|with regard to|
|cooperation|mutual cooperation|
|daily|on a daily basis|
|do|accomplish, perform|
|during|during the course of|
|during, while|in the course of|
|email|e-mail|
|e-business|E-business (unless at beginning of sentence)|
|e-commerce|E-commerce (unless at beginning of sentence)|
|end|terminate|
|end user (n.)|end-user (AP Stylebook does not hyphenate the<br>noun)|
|end-user (adj.)||
|enough|a sufficient amount of|
|essential|absolutely essential, very essential|
|experience|actual experience|
|extranet|Extranet|
|facts|actual facts|
|Flash memory|don’t use flash memory|
|fanfold|fan-fold|
|Generation 1, Generation 2, Gen 1, Gen 2|Generation1, Generation2, Gen1, Gen2|
|generally|as a general rule|
|goal|objective|
|handheld|hand held or hand-held|
|has, contains|is equipped with|
|healthcare|health care|
|help, assist|facilitate|
|ID<br>(spell out “identification” on first reference. You may<br>use “ID” on subsequent references|I.D.  (Except when used in the name “HC100™<br>Patient I.D. Solution)|
|if|in the case of, in the event that, when|
|Internet|internet|
|intranet|Intranet|
|is|be considered as, has been widely acknowledged as|
|latest|state-of-the-art|
|liner|backing|
|many|a large number of|
|MarComms (marketing communications department)|MarCom or marcomms|


P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **35**
Preferred Words and Phrases


**Table 1 • Rephrase List for Concise Writing**

|USE|Do NOT Use|
|---|---|
|microsite|Microsite or micro-site|
|most|a majority of|
|most or maximum|maximum number|
|multi-language|multilanguage|
|multi-protocol|multiprotocol|
|must|need to, required to|
|NASDAQ|Nasdaq|
|now|currently, at this particular time|
|often|it is often the case that, in many cases|
|online|don’t use on-line|
|outcome|final outcome|
|perfect|absolutely perfect|
|plan|preplan, advance plan|
|possible|feasible|
|power cord|AC power cord/power line cord|
|pre-printed|preprinted|
|printer/encoders|printers/encoders|
|printhead|print head|
|probably|there’s a likelihood that|
|refer to|refer back to|
|regard|with regard to|
|regardless|irregardless (this is not a word)|
|regarding|with references to|
|repeat|repeat again|
|requires|involve the use of|
|requisite|necessary requisite|
|result|final result|
|screen saver|screensaver|
|show|demonstrate, appears|
|size|physical size|
|the same|one and the same|
|setup mode|configuration mode|
|smart card reader|Smart Card Reader|
|smartphone|smart phone, Smart Phone or Smartphone|
|so|in a way that|
|sometimes|in some cases, in other cases|
|soon|in the near future, at your earliest convenience|
|some (as an adverb)|a small amount|
|small|small in size|
|start|start off, activate|



2/29/16 Style Guide Style Guide P1086622-001


**36** **Writing Style**
Preferred Words and Phrases


**Table 1 • Rephrase List for Concise Writing**

|USE|Do NOT Use|
|---|---|
|status|current status|
|stop|discontinue, terminate|
|subsite|Subsite or sub-site|
|such as|like|
|to|for the purpose of, in order to|
|to use|in use of|
|turn on|initialize, power up|
|turn off|power down|
|twinax/coax|don’t capitalize the first letters—Twinax/Coax|
|typically, generally|as a general rule|
|upkeep|maintenance|
|use|utilize|
|use the x function to|the x function enables you to|
|username (when referring to computer usage)|user name|
|usually|in many cases|
|variable, factor|parameter|
|verify|check to ensure that|
|want|desire|
|Web (the Web)||
|Web feed|don’t use webfeed|
|Web page|don’t use webpage|
|webcam|don’t use Webcam or Web cam|
|webcast|don’t use Web cast or Webcast|
|webinar|don’t use Webinar|
|webmaster|don’t use Web master or Webmaster|
|website|don’t use Website, web site, Web site|
|weekly|on a weekly basis|
|when|on the occasion of|
|when, if|in the event of|
|whether|whether or not|
|while, during|for the duration of|
|white paper|whitepaper|
|with|w/|
|workflow|work flow or work-flow|
|workforce|work force|
|yearly|on an annual basis|
|©yyyy ZIH Corp.|© Zebra Technologies Corporation|
|www.zebra.com|Zebra.com|
|All|All of the|
|Appears|Appears on the screen|



P1086622-001 Style Guide Style Guide 2/29/16


**Writing Style** **37**
Acronyms and Abbreviations


**Table 1 • Rephrase List for Concise Writing**

|USE|Do NOT Use|
|---|---|
|And|As well as|
|Ensure|Check to make sure|
|Status|Current status|
|Create a|Create a new|
|When|During the same time|
|Edit|Edit an existing|
|Result|End result|
|Complete|Entirely complete|
|Though|Even though|
|To|For the purpose of|
|Can|Has the ability to|
|And|In addition to|
|To|In order to|
|If|In the case of|
|Can|Is able to|
|Must|It is essential that|
|Before|Previous to|
|Before|Prior to|
|See|Refer to|
|See|See also|
|Start|Start up|
|Visit|Visit the following|


### **Acronyms and Abbreviations**


**Note •** This list is yet to be developed.


The content for this section is yet to be developed. It may eventually reside on a
Sharepoint page with a link from within this document.


2/29/16 Style Guide Style Guide P1086622-001


**38** **Writing Style**
Acronyms and Abbreviations


**Notes •** ___________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


P1086622-001 Style Guide Style Guide 2/29/16


# Construction

This section provides information about the use of text and graphics elements in your
documents.


**Contents**
Lists . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 38
Unnumbered Single-Column and Multi-Column Lists . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
Line and Page Breaks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
Line Breaks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
Page Breaks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
Cross-References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
Procedures . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
Tables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
Notes, Cautions, Warnings and Important Statements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Note . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Caution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Warning . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Important . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Dialog Box/Windows/Screens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
Hyperlink . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
URLs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 42
Troubleshooting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
Problem . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
Cause . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
Solution . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
Illustrations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
Scale . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
Leader Lines . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
Arrowheads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
Call Outs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
Product Names . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46
Key, Button, and Mouse Conventions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46
Menu Selections . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 46


2/29/16 P1086622-001


**40** **Construction**
Lists

### **Lists**



API . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Syntax . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Related Commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Revisions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
Indexing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
What to Index . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 48
Nested Entries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Page Number Style . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Capitalization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Special Typography . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 50
Writing for an International Readership (Internationalization) . . . . . . . . . . . . . . . . . . . . . . . . 50


Lists accentuate information and separate list information from other content. Depending
on how you want to present material, choose one of several types of lists: bulleted
(unnumbered, unordered), numbered (ordered), or a term list.


A list can incorporate a nested comment or one nested list. Introduce each list with a
sentence ending with a colon. Use parallel construction in lists, and end the last list entry
with a period. Any list entry that is a complete sentence or is two complete sentences
should be punctuated with a period.


Capitalize the first letter of the first word in each bullet. Omit periods following sentences in
bulleted vertical lists unless one or more of the sentences are complete. Place a period
after all sentences if one or more are complete. Introductory sentences must be complete.


All bulleted items in a list should use the same format; i.e. all should be complete
sentences or all should be fragmented sentences.


These are the lists that technical writers most often use:


 - **Bulleted** —For an unordered series of concepts, items or options. Bullets organize
and emphasize information that paragraph form might obscure.


 - **Numbered or Lettered** —For a procedure or other sequence that the reader must
complete. Introduce a procedure with an infinitive phrase or imperative. For example:

To log on to a database:
**1.** On the File menu, click Open.
**1.** In the User Name box, type your name.
**1.** In the Password box, type your password.
**1.** Click OK.


 - **Terms** —Use a term list for a series of terms, parameters, etc. that precede an
explanation. Do not use an em dash to separate the term from its definition. The
_Glossary (Sample)_ on page 71 is an example of a term list.


**Example •** These are example of a term list, taken from the _Glossary (Sample)_
on page 71.


**alphanumeric** Indicating letters, numerals, and characters such as punctuation marks.



P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **41**
Line and Page Breaks


**bar code** A code by which alphanumeric characters can be represented by a series of
adjacent stripes of different widths. Many different code schemes exist, such as
the universal product code (UPC) or Code 39.

#### **Unnumbered Single-Column and Multi-Column Lists**


Use an unnumbered list to group similar items. Use a single column for six or fewer items
and balanced multiple columns for seven or more. If the list is alphabetical alphabetize
down the columns the list column, not across.


Because there are no page breaks in online files, long multi-column lists can be difficult to
read. Alphabetize from left to right for online file lists.

### **Line and Page Breaks**

#### **Line Breaks**


Line breaks pertain largely to printed documentation. However, Zebra information
developers can set line breaks with the BR tag within HTML files, or the line-break function
in their CMS.


Avoid very short lines that leave large amounts of white space at the end of a line. Break
lines manually during the final stages of production.

#### **Page Breaks**


When constructing printed information products, do not break pages in a document until
all art and textual changes have been added. Therefore, do not add page breaks until final
layout and proof.


Keep related material on one printed page if possible. Leave at least two lines of a
paragraph at the bottom or top of a page (widows and orphans). Do not break a word
across a page. Avoid separating notes, cautions and warnings from the information they
apply to.


In the _Table of Contents_ and the _Index_, avoid breaking subordinate listings across pages.
For example, if a level one listing has six subordinate level two listings, the level two
listings should not be carried over a page break with some of the level two listings on the
following page. A page break should be inserted above the level one listing so that the
entire subordinate list appears on the second page. The same holds true for level two
listings with subordinate level three listings. However, this should not be implemented if it
creates awkward page breaks or otherwise degrades the overall presentation.


2/29/16 Style Guide Style Guide P1086622-001


**42** **Construction**
Cross-References

### **Cross-References**


Cross-references identify for a reader additional information about a specific topic that is
available within the document or a different source. To be useful to a reader, crossreferences must be specific and accurate.


Include any detail that should help a reader find the information easily.


The formats and usage for cross-references will be defined in the Technical Publications
Template.

### **Procedures**


A procedure is a short description of the steps required to complete a specific task. In
printed and online systems, procedures are set off from the main text by their formatting.
Present a procedure (except a single-step procedure) in a numbered list.


Display a result of an action (the display of a screen for example) in a separate paragraph.
Do not number elements of a procedure that do not require action on the part of the user.

### **Tables**


A table is an arrangement of data with two or more columns. The information in the first
column relates to the information in the other column or columns. Table formats can vary
depending on the guide template.


Ensure the table has column headings and a title if required. Do not introduce the table as
that is calling attention to the document or online reference system. Only call attention to
the data presented within the table.


When applicable, label the table with a Table X convention. Online reference tables should
follow the same guidelines as printed tables. However, table dimensions should not
exceed the viewing area of various screen resolutions.


When working with tables, try to avoid:


               - breaking a numeric range in a table over two lines


               - breaking a device model or part number in a table


               - leaving orphans in tables - an orphan is a sole word or number on the last line in a
table


P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **43**
Notes, Cautions, Warnings and Important Statements

### **Notes, Cautions, Warnings and Important Statements**


Note, Caution, Warning and Important statements are used to attract attention to essential
or critical information in a document. They are predesigned tables and should be placed in
the text immediately prior to the step or procedure to which they apply. The same Note,
Caution, Warning and Important statements need not be repeated within a procedure as
long as the emphasis and impact of the Note, Caution, Warning or Important statement is
not lost because of a break in the procedures.


Do not overuse notes and cautions. Using too many notes makes them seem unimportant.
Readers may view frequent notes as a sign of writer laziness.


**Note •** The following explanations will be updated with guidance from the Compliance
Engineering Department, and will follow best international usage (ISO) guidelines.


            - Note – Use Notes to provide additional information that aid the reader in the use or
understanding of the equipment or subject. They are not safety related and are placed
before the associated text.

Reserve notes for important, but incidental information. Notes call attention to ideas
that you can’t present in the text. So that your notes remain attention getters, use
them sparingly.

If you need more than one note in a topic, try to substitute one note with two
paragraphs. Avoid using two or more notes without text between them.

If you have a lot of notes, weave them into the body copy. Suppose that a note directs
the user to perform some task. For example: “Before you make this change, print a
configuration label.” Change the note into a step.


**Correct:**
**1.** Print a configuration label.
**1.** Set the printer darkness to 10.

**Incorrect:**
**1.** Set the printer darkness to 10.
**Note:** Before you make this change, print a configuration label.


            - Caution – Use Cautions to assert that failure to take or avoid an action could result in
damage to equipment, loss of data or potential long-term health hazard. Cautions are
critical in Zebra end user manuals in proving information that could avoid lawsuits.


            - Warning – Use Warnings to advise users that failure to take or avoid a specific action
could result in physical harm to the user or bystanders.


            - Important – Use Important notes to indicate essential information that is needed to
complete a procedure. For example, you may need to instruct a user to have the serial
number available before they start the online registration process.


2/29/16 Style Guide Style Guide P1086622-001


**44** **Construction**
Dialog Box/Windows/Screens

### **Dialog Box/Windows/Screens**


               - Dialog Box – Use dialog box (not dialog - that is jargon) to describe a window requiring
user input to proceed (such as an installer or Yes / No confirmation).


               - Window – Use Window to describe elements that have bounding box and can be
moved on the display. Examples include application window, Control Panel window
and Find WLAN window.


               - Screen – Use screen to describe elements that do not have a bounding box and that
covers the whole display. Examples include calibration screen, IPL screen and boot
screen.


               - Popup – A subscreen launched by a keystroke or data entry. This subscreen does not
appear unless a specific administrator action is performed.


               - Help – An informational page invoked by selecting a help icon within a user interface.

### **Hyperlink**


A hyperlink is the text or graphic users click to access a file, location within a file, an
Internet or intranet site, page or location. Hyperlinks usually appear underlined and in
color, but sometimes the only indication is that the pointer changes to a hand.


Use “see” to describe the process of going to another page within the same help project or
online reference system. Use “refer” to describe the process of going to another page
within a different help project, online reference system or Internet URL.


Use “create” to describe writing the HTML code forming the hyperlink. Do not use hot spot,
hot link, or shortcut to refer to a hyperlink.

### **URLs**


A Uniform Resource Locator (URL) is an Internet address designed to locate a specific
resource on the Internet. URLs consist of the internet protocol name, host name and other
elements such as a port, directory, and file name.


Each main element is lowercase. URLs separate the protocol name (such as http: or
https:) from the rest of the destination with two forward slashes and separate the host and
other main elements from each other with one forward slash.


**Note •** The use of HTTP is discouraged as an insecure interface. HTTPS is
recommended, even if it means adding manually.


In procedural documentation, include the protocol name and forward slashes to avoid
confusion. Set the URL off from the main text to avoid including end punctuation. Include
the trailing slash in a URL unless the final element is a file name.


**Correct:** https://www.zebra.com

**Incorrect:** www.zebra.com


P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **45**
Troubleshooting


While the internet protocol and host name are not case sensitive, adding case can
improve readability. For example,


            - http://www.zipzebra.com


            - https:///www.ZipZebra.com


are the same and both resolve to the same location. This is especially useful when the
protocol is something other than HTTP.


A list of vanity URLs specific to Zebra is available on the Tech Pubs Sharepoint site.

### **Troubleshooting**


Technical data designed to permit fault isolation in corrective maintenance,
troubleshooting or fault isolation technical data is a special type of procedural technical
data (differing primarily in the interactivity involved between display device and the user
and in the presence of extensive branching in the logic).


Technical manual troubleshooting data must promote rapid fault isolation. This allows the
user to quickly remedy the problem and return the equipment to operational status or to
return the unit for service. Quick turnaround with accurate solutions is the essence of
troubleshooting. Troubleshooting data should get the user directly from the symptom(s) of
the problem to the proper solution with a minimum of unnecessary information.


Troubleshooting data should be test and fault-isolation oriented.


**Note •** This Troubleshooting table on the following page is presented in a three column
Problem/Cause/Solution format. The Template team will determine the final look for
Troubleshooting content in future print and online documentation.


            - Problem – The problem column should identify a fault observation (such as a warning
LED flashing) or a set of steps needed to identify the problem (such as run the Display
Test program).


            - Cause – The cause column should list the probable causes for the fault. There may be
more than one possible cause for a fault and if that is the case all causes should be
listed.


            - Solution – The solution column lists the remedies. There must be at least one remedy
for each cause listed. However, there may also be cases where more than one
remedy may need to be listed, or situations where there may be one remedy for two or
more causes. For these situations the path from the problem to the cause to the
remedy must be clearly indicated. For situations where the remedy exceeds the
anticipated level of user expertise, the correct solution is to instruct the user to return
the unit to the appropriate service level.


2/29/16 Style Guide Style Guide P1086622-001


**46** **Construction**
Troubleshooting


**Table 2 • Communications Problems**












|Problem|Possible Cause|Recommended Solution|
|---|---|---|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light does not flash.**|The communication<br>parameters are incorrect.|Check the printer driver or software<br>communications settings (if applicable) for<br>your connection. You may wish to reinstall<br>the printer driver following the instructions in<br>_Install the Printer Driver and Connect the_<br>_Printer to the Computer on page 62_.|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light does not flash.**|The communication<br>parameters are incorrect.|If you are using serial communication, check<br>the serial port settings. See_Port Settings _<br>_on page 139_.|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light does not flash.**|The communication<br>parameters are incorrect.|If you are using serial communication, make<br>sure that you are using a null modem cable<br>or a null modem adapter.|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light does not flash.**|The communication<br>parameters are incorrect.|Check the printer’s handshake protocol<br>setting. The setting used must match the one<br>being used by the host computer. See_Host_<br>_Handshake on page 140_.|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light flashes but no**<br>**printing occurs.**|The prefix and delimiter<br>characters set in the<br>printer do not match the<br>ones in the label format.|Verify the prefix and delimiter characters.<br>See_Command Character on page 134_ and<br>_Delimiter Character on page 135_.|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light flashes but no**<br>**printing occurs.**|Incorrect data is being sent<br>to the printer.|Check the communication settings on the<br>computer. Ensure that they match the printer<br>settings.|
|**A label format was sent**<br>**to the printer but was not**<br>**recognized. The DATA**<br>**light flashes but no**<br>**printing occurs.**|Incorrect data is being sent<br>to the printer.|If the problem continues, check the label<br>format.|
|**A label format was sent**<br>**to the printer. Several**<br>**labels print, then the**<br>**printer skips, misplaces,**<br>**misses, or distorts the**<br>**image on the label.**|The serial communication<br>settings are incorrect.|Ensure that the flow control settings match.|
|**A label format was sent**<br>**to the printer. Several**<br>**labels print, then the**<br>**printer skips, misplaces,**<br>**misses, or distorts the**<br>**image on the label.**|The serial communication<br>settings are incorrect.|Check the printer driver or software<br>communications settings (if applicable).|



P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **47**
Illustrations

### **Illustrations**


Illustrative material is used to:


            - describe an item or idea if this can be done more efficiently and effectively by graphic
methods.


            - clarify text.


            - present concepts difficult to describe by text alone.


            - call attention to details.


            - furnish graphic identification of items.


Multiple sheet, or sequence number illustrations, in addition to step-by-step operational
type, may be used for depicting, removal, installation, etc. Illustrations, should be located
as near as possible to the point at which they are first referenced, except where this would
require unnecessary duplication of illustrations.


**Note •** TBD: The team needs to define the different types of illustrations (e.g., vector,
raster, or 3D), and then describe each type and its preferred uses.

#### **Scale**


Illustrations should be prepared to as small a scale as possible with all essential detail
legible and be same size as areas they should occupy in the document page.

#### **Leader Lines**


Leader lines should be uniform in thickness (typically 0.5 point), short as possible and
straight. The lines may end close to the object, or may touch the objects. Leader lines
should be aligned such that an imaginary projection should point through the center point
of a circular object. Lines should terminate along a uniform imaginary horizontal or vertical
call outs line when ever possible. Dog leg shaped lines are permitted only when straight
lines cannot be used. Leader lines should not cross or come in contact with other call out
lines nor should they obscure essential details. Horizontal and vertical leader lines should
not be used on orthographic type illustrations, however they can be used on isometric type
illustrations. Leader lines that are parallel or perpendicular to the angle of projection
should not be used on isometric illustrations.

#### **Arrowheads**


Arrowheads can be used to clarify or show movement, but author should make sure they
can be seen clearly in the graphic. It may be necessary to outline the arrow.

#### **Call Outs**


Call outs should be neatly arranged and straight. Call outs should be right-hand justified
when the line comes from the right side. Lines which come from the center of the call out
are not preferred, but acceptable. Avoid bending lines, although this is occasionally
unavoidable. Do not cross lines, and lines should cross any part which is called out.


Assign call outs in a clockwise sequence starting at 11 o’clock.


2/29/16 Style Guide Style Guide P1086622-001


**48** **Construction**
Product Names

### **Product Names**


As of this guide’s publishing date, combine alpha and numeric parts of names when
referring to Zebra product names. There should not be a space between the two.


**Correct:** ZT420 printer

**Incorrect:** ZT 420 printer


**Note •** Older products and guides may use the space, but new naming conventions are
removing the space and going forward should not be used.

### **Key, Button, and Mouse Conventions**


Key names are always as it appears on the key. For example:


**Alt, Ctrl, Esc, Shift, ALPHA, BKSP**


If a key does not have a printed name use a descriptive one. Use normal font and initial
cap.


               - Power button


               - Blue key


               - Enter key


               - Scan button.


Buttons on GUIs are listed as they appear.


               - Tap **OK** .


               - Click **Cancel** .


Key and key-mouse combinations are expressed as “key1 - key2” or “key1 + click”. The
key1 and key2 font is dependent upon if the key has a name, the dash and “click” are
normal text.


To express simultaneous key sequences (press both keys at the same time):


               - Alt + F1


               - Power + Left Scan button


To express consecutive key sequences (press a key followed by another key):


               - Blue Key - 1


               - Esc - Q


P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **49**
Menu Selections

### **Menu Selections**


When a number of steps are required to navigate through a menu or sequence of
windows, Use the “>” sign to indicate the next step in the sequence:


            - Select File > Options > Preferences > Setting.


            - Tap Start > Setting > System tab > Today icon.


**Note •** The section below needs better clarification. Venkat will provide new content.

#### **API**


WS2000>admin(network.ap)> add

#### **Description**


Adds entries to the Access Port adoption list. Performs functionality available in the
Access Port Adoption List area of the Wireless screen.

#### **Syntax**


add <idx> <mac1> <mac2> Allows adoption of Access Ports with MAC addresses in the
range of <mac1> to <mac2>


associated with WLAN <idx> (WLAN 1–4).


**Note •** Do not type the colons in the MAC addresses, e.g., type 000000000000, instead of
typing 00:00:00:00:00:00.


**Example •**


admin(network.ap)>add 1 000000000000 00306542b965


admin(network.ap)>list 1


-------------------------------------------------------------------

index start macend mac


-------------------------------------------------------------------- 1
000000000000 00306542B965

#### **Related Commands**


delete - Removes the MAC address range from the adoption list for the specified WLAN.
list - Displays entries in the Access Port adoption list.


2/29/16 Style Guide Style Guide P1086622-001


**50** **Construction**
Revisions

### **Revisions**


A Revisions table may be incorporated into the manual that informs the reader of changes
that were made since the last version. A Revision table is most valuable when document is
for software revisions, when incrementing a base line document from version to version.


The list can be a three column table with the first column listing the revision (digits or
letters) of the document part numbers. The second column should list the date of the
release and the third column should provide a brief description of the changes.

### **Indexing**


An Index may be included in a technical publication. An index is usually not needed in
CMS-generated output.


When developing index entries, be cognizant of the information the user may reference to
complete a task. Think of keywords when developing indexes as terms a user would
associate with a specific task or set of information. A keyword can lead to a single help
topic or to many related topics.


When deciding what keywords to list in an index, consider the following:


               - a keyword for a novice user of the target product


               - a keyword for an advanced user of the target product


               - common synonyms for words in the topics


               - keywords describing the topic in general terms


               - keywords describing the topic specifically


               - keywords used by major competitors.

#### **What to Index**


Before indexing a document or help system, read and understand the concepts that it
covers. If necessary, highlight key words and phrases before starting.


The areas to watch for indexing terms include: first occurrence, when a word appears for
the first time, or is defined in the text; additional occurrences, when a word is used again
but in a different context; proper names such as products, acronyms and parameters.
Other areas include relevant actions, actions important to the user; main topics; lists; and
specific information, such as cautionary notes and low-level procedures. The areas and
terms not to index include: spelled-out acronyms, list items, specific values, articles and
prepositions, sub-topics for product names, front and back matter, and reference matter.
Help Systems, Quick Reference Guides, Regulatory Guides, and Addendum usually do
not need an index.


**Nested Entries**


Use up to three levels of nested entries: primary entry, secondary entry, and tertiary entry.
Each entry level is indented from the previous level.


P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **51**
Indexing


The primary entry is the principal subdivision of an index. A simple primary entry
comprises the entry and a page number. A primary entry comprising several page
numbers is usually divided into secondary entries. Each secondary entry must bear a
logical relationship to the primary entry. A secondary entry comprising several page
numbers may be further divided into tertiary entries. Each tertiary entry must bear a logical
relationship to the secondary entry.


Each secondary entry and each tertiary entry begins a new indented line. If an entry runs
over the width of the column, it is indented. For entries longer than the column width, the
first line is set flush and the rest of the entry is indented below it.


**Page Number Style**


Leader lines are inserted between the entry and the first page number. Subsequent page
numbers are separated with a comma and a space. Page numbers appear in ascending
order.


The primary entry that has two or more secondary entries does not have any page
reference itself.


**“See” and “See Also” References**


Here are basic formatting rules for “See” and “See also” references. (There are also other
acceptable styles.)


            - Italicize the words “See” and “See also.”


            - Place the “See” reference on the same line as the index entry. For example:

DCP, _See_ Device Configuration Package


            - “See” and “See also” references should never include page numbers. Use these
references to direct a reader to another entry. For example:

floppy, _See_ diskette


            - “See also” references should appear at the beginning of the entry. Place the “See
also” reference on a line by itself, and indent the reference from the line above. For
example:

aggregation scheme
_See also_ summarization, data

#### **Capitalization**


Do not capitalize any word in an index entry, unless the word is a proper noun, an
acronym, or an abbreviation that is supposed to be capitalized. Use standard rules for
capitalization.

#### **Special Typography**


The index is subject to many of the same typographic style conventions found in the text
of the document itself. For example, if file names and commands appear in Courier
typeface in the document, then they should appear that way in the index.


2/29/16 Style Guide Style Guide P1086622-001


**52** **Construction**
Writing for an International Audience

### **Writing for an International Audience**


Write documentation destined for international markets as clearly and correctly as
possible to facilitate translation into native languages.


Write documents for translation using:


               - Correct and uniform terminology

Define and use consistently the terminology appropriate for the project and according
to a chosen style manual. Consistent terminology reduces translation time by making
bilingual glossaries shorter.


               - Only one term for each concept


               - Using one term for multiple concepts forces translators to choose the correct term in
each case, increasing the chance that errors might occur. The appropriately modified
nouns


               - Multiple modifiers create problems for translators because different combinations
could appear equally correct. Use only the necessary number of modifiers. Standard
English word order

Use the least confusing word order, usually subject-verb-object, with modifiers as
close as possible to the words that they modify.


               - A higher percentage of illustrations

Illustrations make documentation easier for nonnative English speakers to
understand.


               - Metric measurements followed by Imperial / U.S. equivalents

2.54 centimeters (1 inch)


               - Generic rather than trademark terms for products

Photocopier rather than Xerox machine


Avoid confusion by not using:


               - colloquial English


               - long or complex sentences and paragraphs


               - verbs as nouns or nouns as verbs


               - non-technical jargon, slang or cliches


               - metaphors or similes


               - uncommon symbols .


               - Abbreviations


**Note •** We need more research on Abbreviations. Does acronym change in another
language? In a CMS, how do you handle defining on first occurence when that may
change?


               - passive-voice sentence structure


               - words with multiple meanings.


Show cultural sensitivity by:


               - avoiding text about and illustrations of the human body, except generic depictions of
hands


P1086622-001 Style Guide Style Guide 2/29/16


**Construction** **53**
Writing for an International Audience


            - avoiding the use of humor because of its culturally specific nature


            - avoiding Anglo-centric examples


            - avoiding topics involving race, gender, religion and politics


            - understanding that not all residents of a country speak the same language or belong
to the same culture.


2/29/16 Style Guide Style Guide P1086622-001


**54** **Construction**
Writing for an International Audience


**Notes •** ___________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


P1086622-001 Style Guide Style Guide 2/29/16


This section describes the User Interface elements and terminology that should be used
across all Zebra product lines.


If you have a new UI element that is not addressed, please send your suggestions to
xxxxxxxxxxx@zebra.com or post the suggestion on the SharePoint site (TBD).

### **Menu Navigation and Selection**


When documenting navigation from the menu bar, use > to show selections. When a
number of steps are required to navigate through a menu or sequence of windows, Use
the “>” sign to indicate the next step in the sequence:


**Examples •**


            - From the menu bar, select File > Save.


            - Select File > Options > Preferences > Setting.


            - Using the handheld stylus, tap Start > Setting > System tab > Today icon.

### **Dialog Boxes/Windows/Screens**


            - Dialog Box – Use dialog box (not dialog - that is jargon) to describe a window requiring
user input to proceed (such as an installer or wizard requiring a Yes / No confirmation).


            - Window – Use Window to describe elements that have bounding box and can be
moved on the display. Examples include application window, Control Panel window
and Find WLAN window.


            - Screen – Use screen to describe elements that do not have a bounding box and that
covers the whole display. Examples include calibration screen, IPL screen and boot
screen.


2/29/16 Style Guide Style Guide P1086622-001 Rev. A


**56** **User Interface Elements**
Touchscreen Gestures

### **Touchscreen Gestures**


               - Tablet touchscreen gestures are physical manipulations, not mouse click or keystroke
entries. The following are examples physical surface touchscreen interactions:


               - **Tap** the program icon to launch the application on your tablet.


               - **Tap and Slide** the locationing beacon to move its location on the deployment site map.


               - **Press and Hold** the client icon on the tablet to invoke its configuration sub menu.


               - **Swipe** in from an edge of the tablet screen to display a list of open applications.


               - **Pinch or Stretch** your thumb and forefinger to either move mobile client icons closer
together or further apart on a tablet’s site map.

### **Key, Button and Mouse Conventions**


Key names are always as it appears on the key. Use bold font. For example:


               - Alt, Ctrl, Esc, Shift, ALPHA, BKSP


If a key does not have a printed name use a descriptive one. Use normal font and initial
cap.


               - Power button


               - Blue key


               - Enter key


               - Scan button.


Buttons on GUIs are listed as they appear. Use bold font.


               - Tap **OK** . Click **Cancel** .


Key and key-mouse combinations are expressed as “key1 - key2” or “key1 + click”. The
key1 and key2 font is dependent upon if the key has a name, the dash and “click” are
normal text.


To express simultaneous key sequences (press both keys at the same time):


               - Alt + F1


               - Power + Left Scan button


To express consecutive key sequences (press a key followed by another key):


               - Blue Key - 1


               - Esc


               -                - Q


P1086622-001 Style Guide Style Guide 2/29/16


**User Interface Elements** **57**
API and Command Line

### **API and Command Line**

#### **Syntax**


add <idx> <mac1> <mac2> Allows adoption of Access Ports with MAC
addresses in the range of <mac1> to <mac2> associated with WLAN <idx>
(WLAN 1–4).

**Note •** Do not type the colons in the MAC addresses, e.g., type 000000000000, instead of
typing 00:00:00:00:00:00.

**Example •**


admin(network.ap)>add 1 000000000000 00306542b965


admin(network.ap)>list 1


-------------------------------------------------------------------index start macend mac


-------------------------------------------------------------------1


000000000000 00306542B965

#### **Related Commands**


delete - Removes the MAC address range from the adoption list for the specified WLAN.
list - Displays entries in the Access Port adoption list.


2/29/16 Style Guide Style Guide P1086622-001


**58** **User Interface Elements**
API and Command Line


**Notes •** ___________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


P1086622-001 Style Guide Style Guide 2/29/16


# Legal and Regulatory Guidelines

Information developers need to follow legal guidelines that cover the proper usage and
marking of trademarks and the protection of intellectual property. Trademarks and
materials that can be copyrighted are among a company’s most valuable assets.
Everyone who is involved in the preparation of materials that use trademarks or who
creates materials subject to copyright has a responsibility for securing and protecting the
copyrights and trademarks.


Contents
TradeMarks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 54
Copyright . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 54
Regulatory Information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55
Warranty Information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55


2/29/16 P1086622-001


**60** **Legal Guidelines**
TradeMarks

### **TradeMarks**


The most current list of Zebra trademarks is maintained by the Marketing and Legal
departments. Refer to the Zebra website for that list. If a trademark is not listed on the
website (for example, a new product not yet released), contact the Product Manager for
that product or the Legal Department. Refer to zebra.com/copyright for the current list.


A trademark is a word, phrase, number, symbol, name or device that is used to identify
specific commercial products (e.g., Coca-Cola, Kleenex and Xerox) or services made or
provided by a company and to distinguish them from those produced or provided by
others. A trade name is the name under which a company does business.


There are two parts to indicating trademarks; use both in documentation:


               - Trademark symbols (™ and ®)


               - Trademark footnotes, statements that indicate trademark status and ownership.


The registered symbol, “®” should be used only on, and in connection with, marks
registered with the United States Patent & Trademark Office (PTO). Notice of rights in an
unregistered trademark (™) usually appears above, and to the right of, the mark in which
rights are asserted.


Do not use trademark symbols on a copyright page or screen (Help/ About), in the table of
contents or in the index of printed documentation. Registered trademarks (®) need only
appear on the first use. The trademark symbol is not required on later references, but the
reference should be capitalized. Do not use trademark names to refer to generic products
such as cola, facial tissue and photocopiers. Capitalize trademark names when used.


**Examples •** Trademark name (generic name):


               - Coke or Coca-Cola (cola)


               - Dacron (polyester)


               - Levi's jeans (blue-denim jeans or jeans)


               - Ping-Pong (table tennis)


               - Xerox (photocopier)


               - Vaseline (petroleum jelly).

### **Copyright**


The most current version of the Zebra copyright is determined by the Legal department.
The most current version can be found in each writing group’s template.


The copyright is the ownership by an author or publisher of written works. The ownership
of written works begins at creation and extends to fifty years beyond the life of the
copyright owner. Do not reproduce copyrighted material without explicit, written
permission of the copyright owner.


P1086622-001 Style Guide Style Guide 2/29/16


**Legal Guidelines** **61**
Regulatory Information

### **Regulatory Information**


Regulatory approval is required for all Zebra devices that include electrical, radio, battery,
power supply and laser components. Regulatory information, provided in a Quick
Reference Guide, Quick Start Guide or stand-alone Regulatory Guide, is required in the
box or package with the Zebra device.


A QRG template is available from the Regulatory Department at:
http://wileyprd.symbol.com/regulatory/index.html. A Regulatory engineer must review,
edit, and approve, in writing, the regulatory information in the guide. Guides for products
with scanners must also include an accurate picture of the scanning warning label, a
picture of the product, and an arrow pointing to where on the product the warning label
appears.


Regulatory translations are generally required for each product. Translations may be
printed or electronic only. This is program specific.


In addition to Regulatory information, Waste Electrical and Electronic Equipment (WEEE)
statements, in 20 languages including English, are required in all guides for products sold
in Europe. These statements provide instructions for recycling end-of-life products.

### **Warranty Information**


Warranty information should appear in all relevant guides (i.e., Quick Reference Guides,
Regulatory Guides or Quick Start Guides) with a generic statement that points to the
Zebra warranty Web site. The URLs for the Web site is stored in the respective application
templates.


Warranty information, as it appears on the Zebra Web site, is generic. Ensure that any
product specific warranty information added to the URL link matches the product data
sheet and is reviewed by the Legal Department, if necessary.


2/29/16 Style Guide Style Guide P1086622-001


**62** **Legal Guidelines**
Warranty Information


**Notes •** ___________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


__________________________________________________________________________


P1086622-001 Style Guide Style Guide 2/29/16


# Editing Reference

This section contains tips on editing documents, whether they are yours or someone
else’s.


**Contents**
Editing Tips . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 62
Trademark Information . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 62
Resources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 62
Copyediting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 63
Proofreading . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 63
The proofreading process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 64
To tighten the text, follow these tips: . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Miscellaneous . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Subject/verb agreement, noun/adjective agreement . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
Syntactic Cues . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 66
Consistency in phrasing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 66
Making and Confirming Changes in Your Edited Document . . . . . . . . . . . . . . . . . . . . . . . . . 67


2/29/16 P1086622-001


**64** **Editing Reference**
Editing Tips

### **Editing Tips**


Editing your own document can be difficult. Here are some tips to help you do this:


**1.** Get some distance from the text!

It's hard to edit or proofread a document that you've just finished writing--it's still to
familiar, and you tend to skip over a lot of errors. Put the document aside for a few
hours, or days, or weeks. Go for a run. Take a trip to Aruba. Get the point? Clear your
head of what you've written so you can look at the document fresh and see clearly
what is really on the page.


**2.** Decide what medium lets you proofread most carefully.

Some people like to work right at the computer, while others like to sit back with a
printed copy that they can mark up as they read.


**3.** Try changing the look of your document--altering the size, spacing, color, or style of
the text may trick your brain into thinking it's seeing an unfamiliar document, and that
can help you get a different perspective on what you've written.


**4.** Find a quiet place to work.

Don't try to do your proofreading in front of the TV or while you're chugging away on
the stairmaster. Find a place where you can concentrate and avoid distractions.

You may find it easier to move to a quiet room away from your desk, such as one of
the privacy rooms across from the copier.


**5.** If possible, do your editing and proofreading in several short blocks of time, rather
than all at once--otherwise, your concentration is likely to wane.


**6.** If you're short on time, you may wish to prioritize your editing and proofreading tasks
to be sure that the most important ones are completed.

### **Trademark Information**


You must indicate, on first general occurrence (this does not include the copyright page),
the trademark for all named products and companies. Note that trademark information is
updated frequently (trademarks change to registered trademarks, new products are
added, etc.), so this should be checked each time you revise a document.


               - For all Zebra products, refer to the Zebra website (www.zebra.com/copyright)


               - For all other companies, refer to their website for the most current information. There
is usually a like for Legal, Trademarks, Copyright, Legal, or other similar term at the
bottom of the page which will get you to the appropriate information.


P1086622-001 Style Guide Style Guide 2/29/16


**Editing Reference** **65**
Resources

### **Resources**


Got a question about something or don’t understand it?


**1.** Refer to the TechPubs Style guide (posted on the Sharepoint site).


**2.** Refer to the Job Notes on the TechPubs website.


**3.** Ask an editor.


**4.** Refer to any of the following references:


             - _Reference Publications on page 11_


             - Webgrammar Site
http://www.webgrammar.com/


             - How to Proofread
http://desktoppub.about.com/cs/wpgrammarediting/ht/proofread.htm

### **Copyediting**


The editorial process is not complete without copyediting and proofing. These processes
are much the same for online and print documents—checking for correctness (spelling,
grammar, and punctuation), consistency of capitalization and other mechanics, accuracy
of information, and completeness.


Copyediting online documents also requires that you scan the final pages for consistency
in visual design, test links, and evaluate the document for readability (since screen text is
less legible than quality print text).

### **Proofreading**


Proofreading is the final stage of the editing process, focusing on surface errors such as
misspellings and mistakes in grammar and punctuation. You should proofread only after
you have finished all of your other editing revisions.


Why proofread? It's the content that really matters, right?


Content is important. But like it or not, the way a document looks affects the way others
judge it. When you've worked hard to develop the ideas and procedures and present them
for others to read, you don't want careless errors distracting your reader from what is
important. It's worth paying attention to the details that help you to make a good
impression.


Most people devote only a few minutes to proofreading, hoping to catch any glaring errors
that jump out from the page. But a quick and cursory reread, especially after you've been
working long and hard on a document, usually misses a lot. It's better to work with a
definite plan that helps you to search systematically for specific kinds of errors.


Sure, this takes a little extra time, but it pays off in the end. If you know that you have an
effective way to catch errors when the document is almost finished, you can worry less
about editing while you are writing your first drafts. This makes the entire writing process
more efficient.


2/29/16 Style Guide Style Guide P1086622-001


**66** **Editing Reference**
Proofreading


Try to keep the editing and proofreading processes separate. When you are editing an
early draft, you don't want to be bothered with thinking about punctuation, grammar, and
spelling. If your worrying about the spelling of a word or the placement of a comma, you're
not focusing on the more important development and connection of ideas that make a
document clear and convincing.

#### **The proofreading process**


You probably already use some of the strategies discussed below. Experiment with
different tactics until you find a system that works well for you. The important thing is to
make the process systematic and focused so that you catch as many errors as possible in
the least amount of time.


               - If at all possible, do not proof your own content.


**Note •** A Peer Editing Program may be established to provide quick proofreading or a full
edit for compliance to the Style Guide. This is under discussion.


               - Don't rely entirely on spelling checkers. These can be useful tools but they are far
from foolproof. Spell checkers have a limited dictionary, so some words that show up
as misspelled may just not be in their memory. In addition, spell checkers will not
catch misspellings that form another valid word. For example, if you type "your"
instead of "you're," "to" instead of "too," or "there" instead of "their," the spell checker
won't catch the error.


               - Grammar checkers can be even more problematic. These programs work with a
limited number of rules, so they can't identify every error and often make mistakes.
They also fail to give thorough explanations to help you understand why a sentence
should be revised. You may want to use a grammar checker to help you identify
potential run-on sentences or too frequent use of the passive voice, but you need to
be able to evaluate the feedback it provides.


               - Proofread for only one kind of error at a time. If you try to identify and revise too many
things at once, you risk losing focus, and your proofreading will be less effective. It's
easier to catch grammar errors if you aren't checking punctuation and spelling at the
same time. In addition, some of the techniques that work well for spotting one kind of
mistake won't catch others.


               - Read slow, and read every word. Try reading out loud, which forces you to say each
word and also lets you hear how the words sound together. When you read silently or
too quickly you may skip over errors or make unconscious corrections.


               - Separate the text into individual sentences. This is another technique to help you to
read every sentence carefully. Simply press the return key after every period so that
every line begins a new sentence. Then read each sentence separately, looking for
grammar, punctuation, or spelling errors. If you're working with a printed copy, try
using an opaque object like a ruler or a piece of paper to isolate the line you're working
on.


               - Circle every punctuation mark. This forces you to look at each one. As you circle, ask
yourself if the punctuation is correct.


P1086622-001 Style Guide Style Guide 2/29/16


**Editing Reference** **67**
Proofreading


            - Read the document backwards. This technique is helpful for checking spelling. Start
with the last word on the last page and work your way back to the beginning, reading
each word separately. Because content, punctuation, and grammar won't make any
sense, your focus will be entirely on the spelling of each word. You can also read
backwards sentence by sentence to check grammar; this will help you avoid
becoming distracted by content issues.


            - Try editing your topics in random order, rather than in sequence. This basic trick helps
ensure a suitable and accessible organization for your readers.


            - Proofreading is a learning process. You're not just looking for errors that you
recognize; you're also learning to recognize and correct new errors. This is where
handbooks and dictionaries come in. Keep the ones you find helpful close at hand as
you proofread.


            - Ignorance may be bliss, but it won't make you a better proofreader. You'll often find
things that don't seem quite right to you, but you're not quite sure what's wrong either.
A word looks like it might be misspelled, but the spell checker didn't catch it. You think
you need a comma between two words, but you're not sure why. Should you use "that"
instead of "which"? If you're not sure about something, look it up.


            - The proofreading process becomes more efficient as you develop and practice a
systematic strategy. You'll learn to identify the specific areas of your own writing that
need careful attention, and knowing that you have a sound method for finding errors
will help you to focus more on developing your ideas while drafting the document.

#### **To tighten the text, follow these tips:**


            - Use the active voice. Do not write like a bureaucrat.


            - Use primarily simple declarative and imperative sentence structures. Embedded
clauses risk falling on the boundary between two “scrolling zones.”


            - Use affirmative sentence structure wherever possible.


            - Specify what is true, not what is false.


            - Avoid turning verbs into nouns (nominalizations). For example, use “investigated”
rather than “conducted an investigation.”


            - Eliminate prepositional phrases wherever possible.


            - Use concrete, specific words, not abstract words.


            - Adopt the reader’s vocabulary and perspective, when possible. Do not be afraid to
use the second person,“you.”


            - Avoid unnecessary .


            - Express ideas precisely. For example, state exact quantities.


2/29/16 Style Guide Style Guide P1086622-001


**68** **Editing Reference**
Things to Look For When Editing and Reviewing

### **Things to Look For When Editing and Reviewing**

#### **Subject/verb agreement, noun/adjective agreement**


Locating subject/verb agreement can be tricky, especially in sentences with long clauses
or phrases. Locate the subject of the sentence, and then find the verb of the sentence,
and make sure that they agree. While doing this, you may also find that there is a better
way to rewrite the sentence.


**Correct:** As the name suggests, you can use a multiline variable with more lines of text
in the text object on the label.


**Correct:** As the name suggests, you can use multiline variables with more lines of text
in the text object on the label.

**Incorrect:** As the name suggest, you can use multiline variable with more lines of text in
the text object on the label.

#### **Syntactic Cues**


Syntactic cues are defined as elements or aspects of language that help readers correctly
analyze sentence structure and/or identify parts of speech. While we tend to drop syntactic
cues in our everyday speech, it is important to include them in our writing as a way to
improve translatability and readability of documents.


Syntactic cues include suffixes, articles, prepositions, auxiliary verbs, and word order.
Many of them are mandatory, but some are optional. In many cases, including the optional
syntactic cues may add extra words, but they will make it easier for translators or nonnative speakers of English to comprehend the meaning.


In the **Incorrect** example in the section above, note the missing article before “multiline”.


The following are syntactic cues that may be optional in some contexts:


               - that


               - that + the verb to be


               - the articles a, an, and the


               - to (both as a preposition and as an infinitive marker)


               - modal verbs such as can, should, and may


               - auxiliary verbs such as is, are, was, were, has, have, had, has been, have been, had
been, and will have been


               - prepositions such as by, for, with, in


               - correlative pairs such as either …or, both … and, if … then


               - punctuation such as hyphens, commas, and parentheses


               - pronouns or noun subjects


P1086622-001 Style Guide Style Guide 2/29/16


**Editing Reference** **69**
Making and Confirming Changes in Your Edited Document

#### **Consistency in phrasing**


When using a common phrase, keep the wording the same. In procedural steps, use
imperative verbs at or near the beginning of the step to direct the user to perform an action
(Click, Open, Remove, etc.).


**Correct:** Turn on ( **I** ) the printer.

**Incorrect:**


            - Turn the printer on ( **I** ).


            - Turn on ( **I** ) the power.


            - Turn on the printer power ( **I** ).


            - Turn on the power.


**Correct:** Click the Default option button.

**Incorrect:**


             - Click the Default radio button.


             - Click the Default option.

### **Making and Confirming Changes in Your Edited** **Document**


**Important •** ALWAYS read through and check your work before it is sent out to a
reviewer, editor, or for production.


As you update your source files, mark each comment on a paper or pdf copy of the edits
with a pen or highlighter to indicate that the change was made. If there are changes that
were not made, use a different color to mark them and put a short note beside them as to
why the edit was not made. This helps if questions arise in the future over a particular edit.


Print out (or make a PDF of) files you've made changes to and compare your "changed"
document with the marked up edits. It is possible you may have lost an edit due to an
application freeze-up, or an accidental cut & paste error. Use a different color pen or
highlighter to confirm the edit in this pass.


Refer to the template examples file if necessary. Use this reference to do a quick
comparison and see if there are difference in the layout, headers, footers, et cetera. Do
this for all book files: TOC, preface, chapter, glossary, index, and back cover.


A sample editing checksheet follows this page.


2/29/16 Style Guide Style Guide P1086622-001


**70** **Editing Reference**
Editor’s Checklist

### **Editor’s Checklist**


**Table 3 • Preliminary Edit**






|Layout Pass - Template Issues Only|Editing Pass - Grammar and Style|
|---|---|
|<br>Sequential chapters / appendixes<br><br>Page numbering<br><br>Headers/Footers<br><br>Figures and tables numbered<br><br>Front Matter - Correct Proprietary Statement,<br>DoC, DoI<br><br>Trademarks - Footer or front matter inclusion<br><br>Fonts are consistent<br><br>Cross-references - Color, correct format and<br>target|<br>Proofreading<br><br>Sentence / paragraph construction<br><br>Parallelism<br><br>Grammar<br><br>Subject/verb agreement<br><br>Active voice<br><br>Punctuation<br><br>Capitalization<br><br>Abbreviations<br><br>Standard terminology<br><br>Consistency<br><br>Potential translation issues|





**Table 4 • Final Edit**


**Overall Review**







**Table 5 • Final PDF**


**Overall Review**


 Hyperlinks and bookmarks


 Navigation


 Acrobat Options - (check open, description, and set security options)


P1086622-001 Style Guide Style Guide 2/29/16


# Glossary (Sample)

This section provides a sample glossary for the printer business. This glossary will need to
be expanded to cover the broader product line of the entire company.


**alphanumeric** Indicating letters, numerals, and characters such as punctuation marks.


**backfeed** When the printer pulls the media and ribbon (if used) backward into the printer
so that the beginning of the label to be printed is properly positioned behind the printhead.
Backfeed occurs when operating the printer in Tear-Off and Applicator modes.


**bar code** A code by which alphanumeric characters can be represented by a series of
adjacent stripes of different widths. Many different code schemes exist, such as the
universal product code (UPC) or Code 39.


**black mark** A registration mark found on the underside of the print media that acts as a
start-of-label indication for the printer. (See _non-continuous media_ .)


**calibration (of a printer)** A process in which the printer determines some basic
information needed to print accurately with a particular media and ribbon combination. To
do this, the printer feeds some media and ribbon (if used) through the printer and senses
whether to use the direct thermal or thermal transfer print method, and (if using
non-continuous media) the length of individual labels or tags.


**configuration** The printer configuration is a group of operating parameters specific to
the printer application. Some parameters are user selectable, while others are dependent
on the installed options and mode of operation. Parameters may be switch selectable,
control panel programmable, or downloaded as ZPL II commands. A configuration label
listing all the current printer parameters may be printed for reference.


**continuous media** Label or tag-stock media that has no notch, gap, or web (media liner
only) to separate the labels or tags. The media is one long piece of material.


**core diameter** The inside diameter of the cardboard core at the center of a roll of media
or ribbon.


2/29/16 Style Guide Style Guide P1086622-001 Rev. A


**72** **Glossary**


**diagnostics** Information about which printer functions are not working that is used for
troubleshooting printer problems.


**die-cut media** A type of label stock that has individual labels stuck to a media liner. The
labels may be either lined up against each other or separated by a small distance.
Typically the material surrounding the labels has been removed. (See _non-continuous_
_media_ .)


**direct thermal** A printing method in which the printhead presses directly against the
media. Heating the printhead elements causes a discoloration of the heat-sensitive
coating on the media. By selectively heating the printhead elements as the media moves
past, an image is printed onto the media. No ribbon is used with this printing method.
Contrast this with _thermal transfer_ .


**direct thermal media** Media that is coated with a substance that reacts to the
application of direct heat from the printhead to produce an image.


**dynamic RAM** The memory devices used to store the label formats in electronic form
while they are being printed. The amount of DRAM memory available in the printer
determines the maximum size and number of label formats that can be printed. This is
volatile memory that loses the stored information when power is turned off.


**fanfold media** Media that comes folded in a rectangular stack. Contrast this with _roll_
_media_ .


**firmware** This is the term used to specify the printer’s operating program. This program
is downloaded to the printer from a host computer and stored in FLASH memory. Each
time the printer power is turned on, this operating program starts. This program controls
when to feed the media forward or backward and when to print a dot on the label stock.


**FLASH memory** FLASH memory is non-volatile and maintains the stored information
intact when power is off. This memory area is used to store the printer’s operating
program. In addition, this memory can be used to store optional printer fonts, graphic
formats, and complete label formats.


**Font** A complete set of alphanumeric characters in one style of type. Examples include
CG Times™, CG Triumvirate Bold Condensed™.


**ips (inches-per-second)** The speed at which the label or tag is printed. Many Zebra
printers can print from 1 ips to 12 ips.


**label** An adhesive-backed piece of paper, plastic, or other material on which information
is printed.


**label backing (liner)** The material on which labels are affixed during manufacture and
which is discarded or recycled by the end-users.


**light emitting diode (LED)** Indicators of specific printer status conditions. Each LED is
either off, on, or blinking depending on the feature being monitored.


**liquid crystal display (LCD)** The LCD is a back-lit display that provides the user with
either operating status during normal operation or option menus when configuring the
printer to a specific application.


P1086622-001 Style Guide Style Guide 2/29/16


**Glossary** **73**


**media** Material onto which data is printed by the printer. Types of media include:
tag stock, die-cut labels, continuous labels (with and without media liner), non-continuous
media, fanfold media, and roll media.


**media sensor** This sensor is located behind the printhead to detect the presence of
media and, for non-continuous media, the position of the web, hole, or notch used to
indicate the start of each label.


**media supply hanger** The stationary arm that supports the media roll.


**non-continuous media** Media that contains an indication of where one label/printed
format ends and the next one begins. Examples are die-cut labels, notched tag-stock, and
stock with black mark registration marks.


**non-volatile memory** Electronic memory that retains data even when the power to the
printer is turned off.


**notched media** A type of tag stock containing a cutout area that can be sensed as a
start-of-label indicator by the printer. This is typically a heavier, cardboard-like material
that is either cut or torn away from the next tag. (See _non-continuous media_ .)


**peel-off** A mode of operation in which the printer peels a printed label away from the
backing and allows the user to remove it before another label is printed. Printing pauses
until the label is removed.


**print speed** The speed at which printing occurs. For thermal transfer printers, this speed
is expressed in terms of ips (inches per second).


**printhead wear** The degradation of the surface of the printhead and/or the print
elements over time. Heat and abrasion can cause printhead wear. Therefore, to maximize
the life of the printhead, use the lowest print darkness setting (sometimes called burn
temperature or head temperature) and the lowest printhead pressure necessary to
produce good print quality. In the thermal transfer printing method, use ribbon that is as
wide or wider than the media to protect the printhead from the rough media surface.


**registration** Alignment of printing with respect to the top (vertical) or sides (horizontal) of
a label or tag.


**ribbon** A band of material consisting of a base film coated with wax or resin “ink.” The
inked side of the material is pressed by the printhead against the media. The ribbon
transfers ink onto the media when heated by the small elements within the printhead.
Zebra ribbons have a coating on the back that protects the printhead from wear.


**ribbon wrinkle** A wrinkling of the ribbon caused by improper alignment or improper
printhead pressure. This wrinkle can cause voids in the print and/or the used ribbon to
rewind unevenly. This condition should be corrected by performing adjustment
procedures.


**roll media** Media that comes supplied rolled onto a core (usually cardboard). Contrast
this with _fanfold media_ .


**supplies** A general term for media and ribbon.


2/29/16 Style Guide Style Guide P1086622-001


**74** **Glossary**


**symbology** The term generally used when referring to a bar code.


**tag** A type of media having no adhesive backing but featuring a hole or notch by which
the tag can be hung on something. Tags are usually made of cardboard or other durable
material.


**tear-off** A mode of operation in which the user tears the label or tag stock away from the
remaining media by hand.


**thermal transfer** A printing method in which the printhead presses an ink or resin
coated ribbon against the media. Heating the printhead elements causes the ink or resin
to transfer onto the media. By selectively heating the printhead elements as the media and
ribbon move past, an image is printed onto the media. Contrast this with _direct thermal_ .


**void** A space on which printing should have occurred, but did not due to an error
condition such as wrinkled ribbon or faulty print elements. A void can cause a printed bar
code symbol to be read incorrectly or not at all.


P1086622-001 Style Guide Style Guide 2/29/16


**Zebra Technologies Corporation**
333 Corporate Woods Parkway
Vernon Hills, Illinois 60061.3109 U.S.A.
Telephone: +1 847 634 6700
Facsimile: +1 847 913 8766


**Zebra Technologies Europe Limited**
Zebra House
The Valley Centre, Gordon Road
High Wycombe
Buckinghamshire HP13 6EQ, UK
Telephone: +44 (0) 1494 472872
Facsimile: +44 (0) 1494 450103


**Zebra Technologies Asia Pacific, LLC**
16 New Industrial Road
#05-03 Hudson TechnoCentre
Singapore 536204
Telephone: +65 6858 0722
Facsimile: +65 6885 0838


Part Number: P1086622-001


© 2016 ZIH Corp.


