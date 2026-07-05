---
id: tutorials
title: Tutorials
sidebar_label: Tutorials
description: "The hands-on, learning-oriented path through IOTC: the Quick Start (single-reader bring-up) and the three-reader fleet tutorial. Learn IOTC by doing."
sidebar_custom_props: { emoji: "🎓" }
---

> 📗 **TUTORIALS** · **Audience:** All · the hands-on, learning-oriented path

Tutorials are the **learning-oriented** corner of these docs: hands-on lessons you follow start to finish to build confidence, before you reach for a goal-oriented how-to or look something up in the reference. Each ends with a working result you can see. Start here if you are new to the IOTC and want a reader doing real work by the end.

### The lessons

#### 📗 [Your first 30 minutes — the Quick Start](/quick-start/overview)

The end-to-end, eight-phase walkthrough from a sealed box to a live tag-read stream. A single reader, bootstrapped with 123RFID Desktop, each phase ending in a verifiable artifact. **Start here** if you have never connected an IOTC reader.

- **Audience:** new integrator on a Premium or RFD90 sled
- **You'll finish with:** a reader connected to a broker and reading tags
- Begins at [Phase 0: Prerequisites](/quick-start/phase-0).

#### 📗 [Tutorial: provision a three-reader fleet](/fleet/provision-fleet)

The next step beyond a single reader: provision three RFD90 sleds end-to-end — install certificates, configure dedicated MGMT/CTRL/DATA endpoints over the MDM channel, replay a golden configuration, and stand up a fleet heartbeat dashboard.

- **Audience:** solution builder / fleet operator
- **You'll finish with:** three readers provisioned, secured, and monitored from one golden baseline
- **Prerequisite:** the cloud side already exists — see [Cloud integration prerequisites](/fleet/cloud-integration/prerequisites).

#### 📗 [Tutorial: Read your first tag with Python](/tutorials/read-your-first-tag)

Go beyond device bring-up to working application code: a Python (paho-mqtt) script that starts an inventory, ingests `dataEVT`, and builds a live unique-tag set.

- **Audience:** solution builder writing integration code
- **You'll finish with:** a runnable app that turns the tag stream into deduplicated reads
- **Prerequisite:** a reader already reading — the Quick Start through Phase 6.

### After the tutorials

Once a reader is doing real work, switch modes:

- **A specific goal** (rotate a certificate, configure events, filter tags) → the **how-to** guides in Parts 4–7.
- **Understanding** (why endpoints split, how Gen2 sessions work) → the **explanation** chapters in Parts 1–2 and 4–7.
- **Looking something up** (a field, an error code, an enum) → the **reference** in [Part 9](/part-9) and the MQTT API Reference.

:::note[Why so few?]
The learning quadrant is deliberately small — a few solid tutorials beat a shelf of thin ones. Each one here serves a distinct, real learning need (device bring-up, fleet provisioning, first application code). If you hit an unmet learning need, that is a signal worth raising — not a gap to paper over with empty scaffolding.
:::

**Related:** 📗 [Your first 30 minutes](/quick-start/overview) · 📗 [Provision a three-reader fleet](/fleet/provision-fleet) · 📗 [Read your first tag with Python](/tutorials/read-your-first-tag) · 📘 [Start here](/foundations/start) · 📘 [Pair the docs with the API Reference](/foundations/docs-and-api-reference)
