import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';

// remark-d2 is ESM-only; Docusaurus' config-loader (jiti) chokes on
// top-level await, so we wrap the whole config in an async default
// export and resolve the dynamic import inside it.

export default async function createConfig(): Promise<Config> {
  const remarkD2 = (await import('remark-d2')).default;

  // Site base URL. remark-d2's linkPath must include this prefix or
  // generated img src attributes will skip /zebra-handheld-rfid-iotc/
  // and 404 in production. Define once and reference below.
  const baseUrl = '/zebra-handheld-rfid-iotc/';
  const d2LinkPath = `${baseUrl}d2`.replace(/\/+/g, '/');

  const config: Config = {
  title: 'Zebra Handheld RFID Reader | IoT Connector',
  tagline: 'MQTT API Documentation for RFD40 / RFD90 Series Handheld RFID Reader Sleds',
  url: 'https://al1913-zebra.github.io',
  baseUrl,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true,
  favicon: 'img/zebra-logo-black-stacked.png',
  organizationName: 'al1913-zebra',
  projectName: 'zebra-handheld-rfid-iotc',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  future: {
    faster: true,
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
  },
  plugins: [
    'docusaurus-plugin-sass',
    // 301 redirects for every URL renamed in /_meta/governance/site-rulebooks/URL-NAMING.md §9 so the old
    // URLs stay functional (the rulebook's stability contract). Targets are
    // validated against the live route set; the never-shipped phase-2 branch
    // variants point at /quick-start/phase-2, and deleted pages with no
    // replacement (bluetooth-pairing, config-document) are intentionally omitted.
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Pass 1 (foundations IA cleanup)
          { from: '/foundations/introduction/about-iotc', to: '/foundations/about-iotc' },
          { from: '/foundations/introduction/supported-hardware', to: '/foundations/hardware-tiers' },
          { from: '/foundations/introduction/bootstrap-tools', to: '/foundations/bootstrap-tools' },
          { from: '/foundations/introduction/glossary', to: '/reference/glossary' },
          { from: '/foundations/introduction/documentation-guide', to: '/foundations/documentation-guide' },
          { from: '/foundations/introduction/v1-1-features', to: '/foundations/v1-1-features' },
          { from: '/foundations/concepts/native-mqtt-vs-openapi', to: '/foundations/native-mqtt-vs-openapi' },
          { from: '/foundations/orient/about', to: '/foundations/start' },
          { from: '/foundations/orient/docs-and-api-ref', to: '/foundations/docs-and-api-reference' },
          { from: '/foundations/architecture/components', to: '/foundations/actors' },
          // Pass 2 (higher blast radius)
          { from: '/foundations/mqtt/primer', to: '/foundations/mqtt-primer' },
          { from: '/foundations/architecture/communication-flow', to: '/foundations/communication-flow' },
          { from: '/getting-started/quick-start/overview', to: '/quick-start/overview' },
          { from: '/getting-started/quick-start/step-1-connect', to: '/quick-start/phase-1' },
          { from: '/getting-started/quick-start/step-2-discover', to: '/quick-start/phase-2' },
          { from: '/getting-started/quick-start/step-2-discover-mobile', to: '/quick-start/phase-2' },
          { from: '/getting-started/quick-start/step-3-subscribe', to: '/quick-start/phase-3' },
          { from: '/getting-started/quick-start/step-4-start', to: '/quick-start/phase-4' },
          { from: '/getting-started/quick-start/step-5-read', to: '/quick-start/phase-5' },
          { from: '/getting-started/quick-start/step-6-stop', to: '/quick-start/phase-6' },
          { from: '/getting-started/quick-start/step-7-reboot', to: '/quick-start/phase-7' },
          { from: '/getting-started/prerequisites/requirements', to: '/quick-start/prerequisites/requirements' },
          { from: '/getting-started/prerequisites/credentials', to: '/quick-start/prerequisites/credentials' },
          { from: '/infrastructure/management/device-state', to: '/infrastructure/device-state' },
          { from: '/infrastructure/management/system-operations', to: '/infrastructure/system-operations' },
          { from: '/observability/events/configure', to: '/observability/configure-events' },
          { from: '/observability/events/heartbeat', to: '/observability/heartbeat' },
          { from: '/observability/events/alerts', to: '/observability/alerts' },
          { from: '/observability/events/mqtt-connection', to: '/observability/mqtt-connection' },
          { from: '/rfid/operating-mode/profiles', to: '/rfid/operating-mode-profiles' },
          { from: '/rfid/operating-mode/start-stop', to: '/rfid/start-stop-inventory' },
          { from: '/rfid/operating-mode/post-filters-about', to: '/rfid/post-filters' },
          { from: '/rfid/tag-data/dataevt-schema', to: '/rfid/dataevt-schema' },
          { from: '/fleet/provisioning/models', to: '/fleet/provisioning-models' },
          { from: '/fleet/management/about-bulk', to: '/fleet/bulk-management' },
          { from: '/fleet/reliability/retention-retry', to: '/fleet/retention-and-retry' },
          // tutorial-fleet relocated out of the cloud-integration how-to group to a surfaced Part 7 tutorial node (A-05, 2026-06)
          { from: '/fleet/cloud-integration/tutorial-fleet', to: '/fleet/provision-fleet' },
          // errors/handling (a how-to) re-homed out of the Part 9 reference cluster into Part 8 (A-06, 2026-06)
          { from: '/reference/errors/handling', to: '/diagnose/handle-errors' },
          // A-17 (2026-06): flattened the security/ and endpoints/ sub-folders to /infrastructure/<leaf> (URL-NAMING §9 Pass 4)
          { from: '/infrastructure/security/model', to: '/infrastructure/tls-and-certificates' },
          { from: '/infrastructure/security/tls-setup', to: '/infrastructure/tls-setup' },
          { from: '/infrastructure/security/certificate-management', to: '/infrastructure/certificate-management' },
          { from: '/infrastructure/security/rotation', to: '/infrastructure/certificate-rotation' },
          { from: '/infrastructure/endpoints/about', to: '/infrastructure/mqtt-endpoints' },
          { from: '/infrastructure/endpoints/configure', to: '/infrastructure/configure-endpoints' },
          { from: '/infrastructure/endpoints/multi-endpoint', to: '/infrastructure/multi-endpoint' },
          { from: '/infrastructure/endpoints/view', to: '/infrastructure/view-endpoints' },
          { from: '/reference/diagnose/symptom-index', to: '/diagnose/symptoms' },
          { from: '/reference/diagnose/failure-modes', to: '/diagnose/failure-modes' },
          { from: '/reference/diagnose/two-edges', to: '/diagnose/where-things-fail' },
          { from: '/reference/diagnose/recovery-playbooks', to: '/diagnose/recovery-playbooks' },
          { from: '/reference/diagnose/misconceptions', to: '/diagnose/misconceptions' },
          // Legacy troubleshooting how-tos consolidated into the canonical diagnose/* set (2026-06):
          // the systematic method moved into where-things-fail; the per-area triage flows
          // (connection/rfid/tag-data/battery) moved into recovery-playbooks.
          { from: '/reference/troubleshooting/approach', to: '/diagnose/where-things-fail' },
          { from: '/reference/troubleshooting/connection', to: '/diagnose/recovery-playbooks' },
          { from: '/reference/troubleshooting/rfid', to: '/diagnose/recovery-playbooks' },
          { from: '/reference/troubleshooting/tag-data', to: '/diagnose/recovery-playbooks' },
          { from: '/reference/troubleshooting/battery', to: '/diagnose/recovery-playbooks' },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/zebra-social-card.png',
    docs: {
      sidebar: {
        // Land on any page with the full 9-Part map visible and only the
        // active Part auto-expanded; accordion keeps one Part open at a time.
        autoCollapseCategories: true,
      },
    },
    // Surface H2-H4 in the right-side table of contents. Several pages
    // (troubleshooting, quick-start phases, regulatory) section their
    // content with `####` headings; the Docusaurus default max of 3 left
    // their right-side TOC empty. Raising the max to 4 gives every such
    // page a populated right-side nav, consistent with the rest of the docs.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    metadata: [
      { name: 'og:site_name', content: 'Zebra IoT Connector | Handheld RFID Reader Documentation' },
      { name: 'og:title', content: 'Zebra IoT Connector | Handheld RFID Reader Developer Documentation' },
      { name: 'og:description', content: 'MQTT API documentation for Zebra RFD40/RFD90 handheld RFID reader sleds. Guides, API reference, and fleet management resources.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ZebraTechnology' },
      // Algolia domain-ownership verification (Build plan, pending domain approval).
      { name: 'algolia-site-verification', content: '344C297EEFD75BD3' },
    ],
    navbar: {
      title: 'IoT Connector',
      logo: {
        alt: 'Zebra Technologies',
        src: 'img/zebra-logo-black-horizontal.svg',
        srcDark: 'img/zebra-logo-white-horizontal.svg',
      },
      items: [
        {
          type: 'docSidebar',
          label: 'Documentation',
          sidebarId: 'docs',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiReference',
          label: 'API Reference',
          position: 'left',
        },
        {
          href: 'https://developer.zebra.com',
          label: 'Developer Portal',
          position: 'right',
        },
        {
          href: 'https://github.com/al1913-zebra/zebra-handheld-rfid-iotc',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'About this documentation', to: '/foundations/start' },
            { label: 'Quick Start', to: '/quick-start/overview' },
            { label: 'API Reference', to: '/reference/api-overview' },
            { label: 'Diagnose & Recover', to: '/diagnose/symptoms' },
          ],
        },
        {
          title: 'Zebra Resources',
          items: [
            { label: 'Developer Portal', href: 'https://developer.zebra.com' },
            { label: 'Support', href: 'https://www.zebra.com/us/en/support-downloads.html' },
            { label: 'Product Page (RFD40)', href: 'https://www.zebra.com/us/en/products/rfid/rfid-handhelds/rfd40.html' },
            { label: 'Product Page (RFD90)', href: 'https://www.zebra.com/us/en/products/rfid/rfid-handhelds/rfd90.html' },
          ],
        },
        {
          title: 'Help & Resources',
          items: [
            { label: 'Foundations', to: '/foundations/about-iotc' },
            { label: 'Glossary', to: '/reference/glossary' },
            { label: 'Recovery playbooks', to: '/diagnose/recovery-playbooks' },
            { label: 'Common misconceptions', to: '/diagnose/misconceptions' },
          ],
        },
        {
          title: 'Engage',
          items: [
            { label: 'GitHub', href: 'https://github.com/al1913-zebra/zebra-handheld-rfid-iotc' },
            { label: 'Developer Community', href: 'https://developer.zebra.com/community' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zebra-technologies' },
            { label: 'YouTube', href: 'https://www.youtube.com/@ZebraTechnologies' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zebra Technologies Corporation and/or its affiliates. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.palenight,
      additionalLanguages: [
        'bash',
        'json',
        'yaml',
        'csharp',
        'java',
        'kotlin',
        'swift',
        'python',
        'ruby',
        'go',
        'rust',
        'tsx',
        'protobuf',
        'toml',
      ],
    },
    imgZoom: {
      selector: '.markdown img:not([src^="http"])',
      zoomedInClass: 'zoomed-in-img',
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
          // editUrl intentionally omitted to hide the "Edit this page" link
          // on every doc page. The feedback widget at the bottom of each
          // page replaces this affordance (see src/theme/DocItem/Footer).
          routeBasePath: '/',
          breadcrumbs: true,
          // remark-d2 compiles every ```d2``` fenced block to SVG via the
          // `d2` CLI (must be on PATH at build time) and rewrites the
          // fence to an <img> tag.
          //   defaultD2Opts: pin themes — 0 (Neutral Default) light + 200
          //                  (Dark Mauve) dark per /_meta/governance/site-rulebooks/D2-MIGRATION.md §3.
          //                  Layout engine left as default (dagre); switch
          //                  to elk per-diagram via fence metadata when
          //                  needed for nested architectures.
          //   htmlImage: false — Docusaurus' MDX pipeline rejects raw
          //                      <img> tags ("Cannot handle unknown
          //                      node `raw`"). Markdown ![] syntax is
          //                      what we want anyway.
          //   linkPath: must include the site baseUrl so generated
          //             img tags resolve correctly under GitHub Pages.
          //             The default "/d2" produces absolute URLs that
          //             skip our /zebra-handheld-rfid-iotc/ prefix and
          //             404 in production.
          remarkPlugins: [
            [
              remarkD2,
              {
                defaultD2Opts: ['-t=0', '--dark-theme=200'],
                htmlImage: false,
                defaultImageAttrs: { alt: 'Diagram' },
                linkPath: d2LinkPath,
              },
            ],
          ],
        },
        theme: {
          customCss: './src/css/custom.scss',
        },
        blog: false,
        sitemap: {
          // <lastmod> is derived from each page's last git commit date
          // (the plugin calls vcs.getFileLastUpdateInfo) — showLastUpdateTime
          // is NOT required. This needs a full clone in CI: deploy.yml sets
          // actions/checkout fetch-depth: 0, otherwise every page would share
          // the single latest-commit date.
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          // Utility routes carry a noindex meta tag; keep them out of the
          // public sitemap too. (_meta / ia-blueprints are never built into
          // the site, so they cannot appear here in the first place.)
          ignorePatterns: [
            '/search',
            '/search/**',
            '/report-broken-link',
            '/report-broken-link/**',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  scripts: [
    // PushFeedback web component bundle. Loaded once per page; the
    // <feedback-modal> tag is rendered in src/theme/DocItem/Footer.
    {
      src: 'https://cdn.jsdelivr.net/npm/pushfeedback/dist/pushfeedback/pushfeedback.esm.js',
      type: 'module',
      async: true,
    },
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/pushfeedback/dist/pushfeedback/pushfeedback.css',
      rel: 'stylesheet',
    },
  ],
  clientModules: ['./src/client-modules/img-zoom', './src/client-modules/sidebar-deeplink'],
  // The right-hand TOC is persistent on every page (standard Docusaurus). Wide schema
  // tables get room at the table level instead — see src/components/SchemaTable.tsx
  // (column sizing, a graceful horizontal-scroll region, and an explicit per-table
  // "Expand table" full-width toggle) — so no global TOC-hiding client module is needed.
  };

  return config;
}
