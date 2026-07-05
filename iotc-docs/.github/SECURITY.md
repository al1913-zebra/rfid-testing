# Security Policy

> **Project:** Zebra Handheld RFID Reader — IoT Connector (IOTC) developer **documentation**
> **Repository:** `al1913-zebra/zebra-handheld-rfid-iotc`
> **Published site:** <https://al1913-zebra.github.io/zebra-handheld-rfid-iotc/>
> **Policy version:** 1.0 · **Last updated:** 2026-06-06 · **Owner:** Lead Technical Writer

This document defines how to **report, triage, and disclose** security vulnerabilities for this repository and the static documentation website it produces. We take the integrity of our documentation, our build pipeline, and our software supply chain seriously, and we welcome reports from the community and from security researchers acting in good faith.

**If you believe you have found a security vulnerability, please report it privately to:**

## 📧 `abdullatheef.mohamed@zebra.com`

**Do _not_ open a public GitHub Issue, Pull Request, or Discussion for a suspected vulnerability.** Public disclosure before a fix is available puts users at risk. See [§3, How to report](#3-how-to-report-a-vulnerability).

---

## Table of contents

1. [What this repository is (and is not)](#1-what-this-repository-is-and-is-not)
2. [Supported versions](#2-supported-versions)
3. [How to report a vulnerability](#3-how-to-report-a-vulnerability)
4. [What to include in your report](#4-what-to-include-in-your-report)
5. [What to expect after you report](#5-what-to-expect-after-you-report-our-commitment)
6. [Scope](#6-scope)
7. [Vulnerability classes we care about](#7-vulnerability-classes-we-care-about-stack-specific)
8. [Severity classification & remediation targets](#8-severity-classification--remediation-targets)
9. [Coordinated disclosure policy](#9-coordinated-disclosure-policy)
10. [Safe harbor & rules of engagement](#10-safe-harbor--rules-of-engagement)
11. [Recognition](#11-recognition)
12. [Reporting non-security issues](#12-reporting-non-security-issues-documentation-errors)
13. [Known limitations & accepted risks](#13-known-limitations--accepted-risks)
14. [Policy maintenance & references](#14-policy-maintenance--references)

---

## 1. What this repository is (and is not)

This repository is the **source for a static documentation website**. It contains Markdown/MDX content, React/TypeScript theme components, SCSS, diagram source, and CI/CD configuration. It is built by [Docusaurus 3.10](https://docusaurus.io/) and deployed as **static HTML/CSS/JS** to GitHub Pages. **There is no application server, no database, no authentication layer, and no collection of personal data or user accounts** in this project.

| Layer | Technology | Security relevance |
|---|---|---|
| Site generator | Docusaurus 3.10 (classic preset) + `@docusaurus/faster` | Build-time code execution; MDX → React compilation |
| UI runtime | React 19, TypeScript | Client-side rendering; potential XSS in components/MDX |
| Diagrams | [D2](https://d2lang.com/) via `remark-d2` + the `d2` CLI | **Build-time process execution** (the `d2` binary is spawned per diagram) |
| Styling | SCSS via `docusaurus-plugin-sass` | Low risk (compiled to CSS) |
| Search | Algolia DocSearch (third-party, hosted) | Third-party script + index; data exfiltration surface |
| Feedback widget | PushFeedback web component loaded from `cdn.jsdelivr.net` | **Third-party script from a public CDN** (supply-chain / integrity) |
| Redirects | `@docusaurus/plugin-client-redirects` | Open-redirect / link-integrity surface |
| Dependencies | npm (`package-lock.json`), Dependabot enabled | **Software supply chain** (direct + transitive) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) | Pipeline integrity, secret handling, third-party Actions |
| Hosting | GitHub Pages (published from the `gh-pages` branch) | Static hosting; limited HTTP-header control |
| Runtime (build) | Node.js ≥ 20 | Build toolchain |

> **Critical distinction — documentation vs. product.** A security weakness in the **Zebra IoT Connector product** (the RFD40 / RFD90 reader firmware, the on-device MQTT control/data plane, TLS/certificate handling on the sled, the published MQTT API, etc.) is **not** a vulnerability in *this documentation repository*. Those must be handled by **Zebra Product Security**, not by this project. See [§6.3, Out of scope](#63-out-of-scope) for routing. If you are unsure which applies, report it to the email above and we will route it appropriately.

---

## 2. Supported versions

This site is **continuously deployed** from the `main` branch; the live site always reflects the latest commit. We do not maintain long-lived release branches of the documentation.

| Version / ref | Supported | Notes |
|---|---|---|
| `main` (current live site) | ✅ Yes | All security fixes land here and deploy automatically |
| Tagged historical snapshots, forks, or local builds | ❌ No | Rebuild from `main` to receive fixes |
| The build toolchain (Docusaurus, Node, dependencies) | ✅ Yes | Kept current; security patches applied via Dependabot + manual review |

Because the site is static and versionless, **"upgrading" simply means pulling the latest `main` and rebuilding.** We strongly recommend consumers of this content always reference the live site rather than cached or forked copies.

---

## 3. How to report a vulnerability

### Primary channel (preferred)

Email **`abdullatheef.mohamed@zebra.com`** with the details described in [§4](#4-what-to-include-in-your-report).

- **Subject line format:** `[SECURITY] <component> — <one-line summary>`
  (e.g., `[SECURITY] CI workflow — secret exposed in pull_request_target run`).
- Reports are accepted in **English**.
- You will receive an acknowledgement of receipt within the timeframe in [§5](#5-what-to-expect-after-you-report-our-commitment).

### Confidential / encrypted reporting

If your report is sensitive and you wish to encrypt it, **request a PGP public key in your first (non-sensitive) email** and one will be provided for subsequent encrypted correspondence. Alternatively, if **GitHub Private Vulnerability Reporting** is enabled for this repository, you may submit through **Security → Report a vulnerability** ("Report a vulnerability" button on the repository's Security tab), which creates a private advisory visible only to the maintainers and you.

### Please DO

- ✅ Report **privately** via the channels above.
- ✅ Give us a **reasonable time** to investigate and remediate before any public disclosure (see [§9](#9-coordinated-disclosure-policy)).
- ✅ Provide enough detail to **reproduce** the issue (see [§4](#4-what-to-include-in-your-report)).
- ✅ Make a good-faith effort to **avoid privacy violations, data destruction, and service disruption** (see [§10](#10-safe-harbor--rules-of-engagement)).

### Please DO NOT

- ❌ Open a **public** Issue, Pull Request, Discussion, or social-media post describing the vulnerability before it is fixed and disclosure is coordinated.
- ❌ Run **denial-of-service**, volumetric, brute-force, or load tests against the live site, GitHub, or any third-party service it uses.
- ❌ Access, modify, or exfiltrate data that is not yours; pivot to other systems; or attempt to deanonymize other users.
- ❌ Use **social engineering, phishing, or physical intrusion** against maintainers, Zebra employees, or service providers.

---

## 4. What to include in your report

A high-quality report dramatically speeds up triage. Please include as much of the following as you can:

- [ ] **Summary** — a clear, concise description of the vulnerability and its impact.
- [ ] **Affected component** — file path(s), URL(s), workflow name, dependency name/version, or page.
- [ ] **Vulnerability class** — e.g., XSS, dependency/supply-chain, CI/CD secret exposure, open redirect (see [§7](#7-vulnerability-classes-we-care-about-stack-specific)).
- [ ] **Reproduction steps** — exact, minimal, deterministic steps. Include the **commit SHA or page URL**, browser/OS, and Node/npm versions if build-related.
- [ ] **Proof of concept** — a minimal PoC (payload, request, screenshot, short video, or code snippet). Keep it non-destructive.
- [ ] **Impact assessment** — what an attacker can achieve (e.g., script execution in a visitor's browser, malicious deploy, credential theft).
- [ ] **Suggested severity** — your view, ideally with a **CVSS v3.1 or v4.0 vector** (see [§8](#8-severity-classification--remediation-targets)).
- [ ] **Remediation ideas** — optional, but welcome.
- [ ] **Your disclosure expectations** — whether you intend to publish, and your preferred timeline.
- [ ] **Credit preference** — the name/handle (and optional link) you would like used in acknowledgements, or a request to remain anonymous.

> If the vulnerability involves a **leaked secret** (token, key, credential), say so explicitly and **do not include the full secret** in plaintext email — provide enough to identify it (e.g., first/last 4 characters, where it appears) so we can revoke it immediately.

---

## 5. What to expect after you report (our commitment)

We aim to handle every good-faith report promptly, transparently, and respectfully. Target timelines are **business days** unless stated otherwise and represent goals, not contractual guarantees.

| Stage | Target | What happens |
|---|---|---|
| **Acknowledgement** | ≤ 2 business days | We confirm we received your report. |
| **Triage & validation** | ≤ 5 business days | We reproduce the issue and assign a preliminary severity ([§8](#8-severity-classification--remediation-targets)). |
| **Status updates** | At least every 7 calendar days | We keep you informed until the issue is resolved or closed. |
| **Remediation** | Per severity (see [§8](#8-severity-classification--remediation-targets)) | We develop, test, and deploy a fix. |
| **Disclosure & credit** | Coordinated (see [§9](#9-coordinated-disclosure-policy)) | We confirm the fix is live and credit you (if desired). |

If a report is **out of scope** or **not a security issue**, we will tell you why and, where possible, point you to the right channel (e.g., a documentation-error workflow, or Zebra Product Security).

---

## 6. Scope

### 6.1 In scope

Security issues affecting the integrity, confidentiality, or availability of **this repository, its build pipeline, or the documentation site it produces**, including:

- The **repository contents** — Markdown/MDX (`docs/`), React/TypeScript components (`src/`), client modules, SCSS, and configuration (`docusaurus.config.ts`, `sidebars.ts`).
- The **build/CI/CD configuration** — GitHub Actions workflows under `.github/workflows/`, and how secrets/tokens are used during build and deploy.
- The **published static site** — the HTML/CSS/JS served at the live URL (e.g., stored/reflected XSS, content/script injection, malicious redirects).
- **Software supply chain** — direct and transitive npm dependencies, the lockfile, and build-time tooling (including the `d2` CLI and remark/rehype plugins).
- **Third-party integrations as configured by this repo** — e.g., the Algolia DocSearch configuration, the PushFeedback widget loaded from a CDN, and any analytics/scripts we inject.
- **Documentation content that could induce insecure behavior** — for example, an example payload or guide that instructs readers to disable TLS, hard-code credentials, or otherwise configure the IOTC product insecurely (a **"dangerous-guidance"** report; see [§7.7](#77-dangerous-or-insecure-documentation-guidance)).

### 6.2 Border cases — report to us, we will route

- A genuine flaw in **content accuracy with a security impact** (insecure example, wrong security default, misleading certificate/TLS instructions).
- Uncertainty about whether something is a documentation issue or a product issue.

### 6.3 Out of scope

The following are **not** vulnerabilities in this repository. Please route them as indicated.

| Out-of-scope item | Where it belongs |
|---|---|
| Flaws in the **Zebra IoT Connector product** — RFD40/RFD90 firmware, on-device MQTT control/data plane, on-sled TLS/certificate handling, the MQTT API behavior itself | **Zebra Product Security** via the official [Zebra Trust Center / Support channels](https://www.zebra.com/). You may also email the maintainer above and we will coordinate routing. |
| Vulnerabilities in **third-party platforms** themselves — GitHub / GitHub Pages / GitHub Actions, Algolia, jsDelivr/CDN, the browser | Report to the respective vendor's security program. |
| The **external MQTT API Reference site** (a separate repository/host) | Report to that project's maintainers. |
| **Denial of service**, volumetric, rate-limit, or load/stress findings | Out of scope (a static site on GitHub Pages — see [§10](#10-safe-harbor--rules-of-engagement)). |
| **Social engineering, phishing, physical access**, or attacks on maintainers/employees | Out of scope. |
| **Missing HTTP security headers** (CSP, HSTS, X-Frame-Options, etc.) on GitHub Pages | Largely a platform limitation — see [§13](#13-known-limitations--accepted-risks). Report only if you can demonstrate concrete exploitation. |
| **Best-practice suggestions without a demonstrable security impact**, automated scanner output with no PoC, missing SPF/DMARC on unrelated domains, "self-XSS," clickjacking on pages with no sensitive actions, theoretical issues | Generally not actionable; welcome as a documentation/quality note via [§12](#12-reporting-non-security-issues-documentation-errors). |

---

## 7. Vulnerability classes we care about (stack-specific)

Because this is a **Docusaurus static site with an automated GitHub Actions → GitHub Pages pipeline**, the most relevant and impactful classes are:

### 7.1 Software supply chain (npm dependencies)
Vulnerable direct or transitive packages, malicious/typosquatted packages, lockfile tampering, postinstall-script abuse, or a compromised dependency that executes at build time. We run **Dependabot** and `npm audit`; reports that identify an exploitable path (not just a raw advisory ID) are especially valuable.

### 7.2 CI/CD & GitHub Actions pipeline
- Workflow command/script injection (e.g., untrusted input interpolated into `run:` steps).
- Misuse of `pull_request_target`/`workflow_run` exposing secrets to untrusted code.
- Over-privileged `GITHUB_TOKEN` or personal access tokens; secret exposure in logs or artifacts.
- Unpinned or compromised third-party Actions; cache poisoning; tampering with the `gh-pages` deploy so malicious content is published.

### 7.3 Build-time code execution
The build **spawns the `d2` CLI** for every ` ```d2 ` diagram fence and runs **remark/rehype/MDX** plugins. Reports demonstrating arbitrary code execution, path traversal, SSRF, or resource exhaustion triggered by crafted content/diagrams during `npm run build` are in scope.

### 7.4 Cross-site scripting (XSS) & content injection
Stored or reflected script execution in the rendered site via MDX, raw HTML/JSX, swizzled React theme components (e.g., `DocItem`, `MDXComponents`, `DocCard`), client modules (e.g., the image-zoom module), or unsafe handling of user-controllable values (such as the broken-link reporter / feedback inputs).

### 7.5 Third-party client scripts & subresource integrity
The site loads the **PushFeedback** web component from `cdn.jsdelivr.net` and uses **Algolia DocSearch**. Reports about missing **Subresource Integrity (SRI)**, CDN/dependency-confusion risk, data exfiltration through these scripts, or unsafe configuration are in scope.

### 7.6 Open redirects & link integrity
The site uses `@docusaurus/plugin-client-redirects`. Reports of open-redirect behavior, redirect-target tampering, or links/anchors that can be manipulated to send users to attacker-controlled destinations are in scope.

### 7.7 Dangerous or insecure documentation guidance
Documentation is our product. A page that instructs readers to **disable TLS, accept invalid certificates, embed long-lived credentials, expose an MQTT broker without authentication, or otherwise weaken the security posture of the IOTC deployment** is treated as a security issue against this repository (even though the *product* is out of scope).

### 7.8 Secret / credential leakage
Tokens, API keys, certificates, or other secrets committed to the repository, exposed in build artifacts, present in the published site, or leaked through CI logs. **Report immediately** so we can revoke and rotate.

### 7.9 Prototype pollution, ReDoS, and parser issues
In our own code or in dependencies, where a crafted input (content, config, or diagram) can cause prototype pollution, catastrophic regex backtracking, or denial of the build.

---

## 8. Severity classification & remediation targets

We classify severity using **CVSS v4.0 (or v3.1)**. Please include a vector string where possible.

| Severity | CVSS score | Examples in this context | Remediation target |
|---|---|---|---|
| **Critical** | 9.0 – 10.0 | RCE in the build pipeline; compromise that publishes malicious content to the live site; leaked credential enabling repo/deploy takeover | Fix & deploy **≤ 7 calendar days** |
| **High** | 7.0 – 8.9 | Stored XSS affecting all visitors; CI secret exposure to untrusted code; exploitable dependency in the shipped/build path | Fix & deploy **≤ 30 calendar days** |
| **Medium** | 4.0 – 6.9 | Reflected XSS requiring user interaction; open redirect; missing SRI on a third-party script; dangerous documentation guidance | Fix & deploy **≤ 90 calendar days** |
| **Low** | 0.1 – 3.9 | Low-impact information disclosure; defense-in-depth gaps with limited exploitability | Best effort; next routine update |
| **Informational** | 0.0 | Hardening suggestions without a demonstrable impact | Tracked as a quality/documentation note |

Final severity is determined by the maintainers in consultation with the reporter; we will explain our reasoning if it differs from your suggestion.

---

## 9. Coordinated disclosure policy

We practice **coordinated (responsible) disclosure**:

1. You report privately; we acknowledge and triage.
2. We develop, test, and **deploy a fix** to `main` (which publishes to the live site).
3. We agree with you on a **public disclosure date**. Our default embargo is **up to 90 days** from the initial report, or until a fix is live — whichever is sooner — and is negotiable for complex issues.
4. If a vulnerability is **being actively exploited** or is already public, we will act on an accelerated timeline.
5. Where a CVE is warranted (e.g., for a vulnerability in code we author and distribute), we will assist with **CVE assignment** (via GitHub Security Advisories or a CNA) and publish an advisory.
6. We ask that you **do not disclose publicly** until the coordinated date. We will not take legal action against researchers who follow this policy in good faith (see [§10](#10-safe-harbor--rules-of-engagement)).

---

## 10. Safe harbor & rules of engagement

We support good-faith security research. **If you make a good-faith effort to comply with this policy during your research, we will consider your activity authorized, we will work with you to understand and resolve the issue quickly, and we will not pursue or support legal action against you.**

To remain within safe harbor, you must:

- ✅ Only test against **your own fork, a local build, or content you are authorized to test**. Do **not** attempt to compromise the maintainers' accounts, GitHub, or third-party providers.
- ✅ **Avoid privacy violations, data destruction, and degradation of service.** No DoS, no automated high-volume scanning against the live site or third-party services.
- ✅ Use only **non-destructive proof-of-concept** activity and stop as soon as you have demonstrated the issue.
- ✅ **Report promptly** and keep details confidential until coordinated disclosure.
- ✅ Comply with all **applicable laws** and the terms of service of GitHub and any third-party services involved.

This safe harbor applies to **this documentation repository and its directly-controlled assets only**. It does **not** authorize testing against the Zebra IOTC product, Zebra corporate systems, GitHub, Algolia, jsDelivr, or any third party — those are governed by their own programs and policies.

---

## 11. Recognition

We are grateful to the researchers who help keep this project and its readers safe. With your permission, we will **credit you by name or handle** in the relevant commit, release note, or security advisory. You may also request to remain **anonymous**. We do not currently operate a paid bug-bounty program; recognition is offered as thanks for responsible disclosure.

---

## 12. Reporting non-security issues (documentation errors)

For **non-security problems** — factual errors, broken links, typos, unclear instructions, outdated screenshots, or general feedback — you may report them through any of:

- **Email:** `abdullatheef.mohamed@zebra.com` (the same address; clearly mark it as a documentation issue, not a security report).
- **GitHub Issues:** open a regular issue on the repository (for non-sensitive content problems only).
- **In-page feedback:** the feedback widget at the bottom of each documentation page.

> If a documentation error has a **security impact** (see [§7.7](#77-dangerous-or-insecure-documentation-guidance)), treat it as a vulnerability and report it **privately** per [§3](#3-how-to-report-a-vulnerability).

---

## 13. Known limitations & accepted risks

To set expectations, the following are understood limitations of a static site hosted on GitHub Pages and are generally **not** treated as actionable vulnerabilities on their own:

- **HTTP response headers** (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, etc.) are largely controlled by **GitHub Pages** and cannot be fully configured from this repository. Report header issues only with a concrete, demonstrated exploitation path.
- The site **intentionally loads third-party scripts** (Algolia DocSearch, PushFeedback) to provide search and feedback. We accept this risk but welcome reports about **integrity (SRI), data handling, or configuration** weaknesses.
- The site is **public and read-only**; it has no login, sessions, or user data, so classes such as CSRF, IDOR, and authentication bypass generally do not apply.
- **Generated diagram SVGs** and other build outputs are derived from in-repo source; report issues in the **source or build process** rather than in generated artifacts.

---

## 14. Policy maintenance & references

- This policy lives at `.github/SECURITY.md` and is surfaced on the repository's **Security → Policy** tab.
- It is reviewed periodically and whenever the technology stack, hosting model, or contact details change. Material changes increment the **Policy version** in the header.
- **Primary security contact:** `abdullatheef.mohamed@zebra.com`

**References**

- GitHub — [Adding a security policy to your repository](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository)
- GitHub — [Privately reporting a security vulnerability](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
- FIRST — [Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/)
- OpenSSF — [Guide to coordinated vulnerability disclosure for open source projects](https://github.com/ossf/oss-vulnerability-guide)
- Zebra Technologies — [Trust Center / Product Security](https://www.zebra.com/) (for **product/firmware** issues, not this documentation repository)

---

_Thank you for helping keep the Zebra Handheld RFID IoT Connector documentation, its readers, and its supply chain secure._
