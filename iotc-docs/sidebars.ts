import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Zebra Handheld RFID — IoT Connector
 * Conceptual Documentation Sidebar
 *
 * Voice stance: outcome- / scent-phrased labels throughout, sentence case.
 *
 * Source-of-truth note: chapter labels come from each page's
 * front-matter `sidebar_label`. The sidebar uses short-form doc
 * references (just the doc id) so there is one source of truth
 * for label text. Part labels live in this file because they are
 * structural (no doc page underlies them).
 *
 * Nine Parts cover the full doc set. Each Part's concept/tutorial
 * "spine" is surfaced first; how-to and reference pages are grouped
 * into collapsed sub-categories so everything is reachable from the
 * nav (no orphaned pages).
 *
 * Navigation contract: EVERY category — both the top-level Parts and
 * the nested sub-categories — carries `link: { type: 'generated-index' }`
 * so its breadcrumb segment is clickable and it gets an auto-generated
 * landing page of card tiles. Each category also carries
 * `customProps.emoji`, and every doc carries `sidebar_custom_props.emoji`,
 * which the swizzled `@theme/DocCard` renders as the tile icon. The core
 * Part 4–6 chapters map to the external MQTT API Reference sub-tags.
 *
 * Tile descriptions: each category also carries a top-level `description`.
 * The swizzled `@theme/DocCard` reads `item.description` for the card
 * shown on a parent landing page; without it a category tile falls back
 * to the generic "{N} items" count. (The `link.description` only sets the
 * subtitle on the category's own generated-index page — Docusaurus strips
 * `link` before building card props, so the two are deliberately separate.)
 *
 * IA note (2026-06): the former combined "Diagnose and reference" Part was
 * split into Part 8 (Diagnose & recover) and Part 9 (Reference) so the
 * incident reader and the lookup reader have distinct front doors. The
 * legacy reference/troubleshooting/* cluster was consolidated into the
 * canonical diagnose/* set (redirects in docusaurus.config.ts).
 */

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Part 1: Get oriented',
      description:
        'Start here — orientation, the MQTT primer, and how this site pairs with the API Reference.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 1: Get oriented',
        description:
          'Where to start, the MQTT primer, and how this site pairs with the auto-generated MQTT API Reference.',
        slug: '/part-1',
      },
      items: [
        'foundations/start',
        'foundations/documentation-guide',
        'tutorials',
        'foundations/mqtt-primer',
        'foundations/rfid-primer',
        'foundations/docs-and-api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Part 2: Foundations',
      description:
        'The mental models to grasp before the API: what IOTC is, which sled you have, and how the actors interact.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 2: Foundations',
        description:
          'The mental models you need before touching the API: what IOTC is, what changed in V1.1, which sled you have, how the actors interact, and how the reader is bootstrapped with 123RFID Desktop.',
        slug: '/part-2',
      },
      items: [
        'foundations/about-iotc',
        'foundations/v1-1-features',
        'foundations/hardware-tiers',
        'foundations/actors',
        'foundations/communication-flow',
        'foundations/bootstrap-tools',
        'foundations/mobile-app',
        'foundations/architecture/interface-model',
        'foundations/native-mqtt-vs-openapi',
        'foundations/rfid-air-interface',
        {
          type: 'category',
          label: 'Architecture & MQTT internals',
          description:
            'End-to-end architecture and the MQTT internals: topic hierarchy, QoS, authentication, and connection lifecycle.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🏛️' },
          link: {
            type: 'generated-index',
            title: 'Architecture & MQTT internals (reference depth)',
            description:
              'The end-to-end architecture, handheld-specific considerations, and the MQTT internals: topic hierarchy, QoS, auth, and connection lifecycle. Reference-depth material: best read after your first successful connection (Part 3) — it is not required before the Quick Start.',
            slug: '/part-2/architecture',
          },
          items: [
            'foundations/architecture/end-to-end',
            'foundations/architecture/handheld-considerations',
            'foundations/mqtt/topic-hierarchy',
            'foundations/mqtt/qos',
            'foundations/mqtt/auth-model',
            'foundations/mqtt/connection-lifecycle',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Part 3: Quick start',
      description:
        'An eight-phase walkthrough from a sealed box to live inventory, then secured with TLS.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 3: Quick start',
        description:
          'An eight-phase, end-to-end walkthrough from a sealed box to live inventory, then secured with TLS. Phase 0 covers prerequisites.',
        slug: '/part-3',
      },
      items: [
        'quick-start/overview',
        {
          type: 'category',
          label: 'Phase 0: Prerequisites',
          description:
            'Line up the hardware, software, and credentials you need before starting Phase 1.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '0️⃣' },
          link: {
            type: 'generated-index',
            title: 'Phase 0: Prerequisites',
            description:
              'Hardware, software, and credentials. Get these in place before Phase 1.',
            slug: '/quick-start/phase-0',
          },
          items: [
            'quick-start/prerequisites/requirements',
            'quick-start/prerequisites/credentials',
          ],
        },
        'quick-start/phase-1',
        'quick-start/phase-2',
        'quick-start/phase-3',
        'quick-start/phase-4',
        'quick-start/phase-5',
        'quick-start/phase-6',
        'quick-start/phase-7',
        'quick-start/phase-8',
      ],
    },
    {
      type: 'category',
      label: 'Part 4: Manage your reader',
      description:
        'Configure device state, networking, MQTT endpoints, TLS certificates, and firmware operations on the reader.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 4: Manage your reader',
        description:
          'Device state, network configuration, MQTT endpoints, TLS and certificate management, and firmware / reboot operations. The core chapters map to sub-tags of the external MQTT API Reference.',
        slug: '/part-4',
      },
      items: [
        'infrastructure/device-state',
        {
          type: 'category',
          label: 'Network',
          description:
            'Get the reader onto Wi-Fi or cradle Ethernet, and troubleshoot connectivity.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🌐' },
          link: {
            type: 'generated-index',
            title: 'Network',
            description:
              'Get the reader onto Wi-Fi or a cradle Ethernet path, and troubleshoot connectivity.',
            slug: '/part-4/network',
          },
          items: [
            'infrastructure/network/architecture',
            'infrastructure/network/wifi',
            'infrastructure/network/ethernet',
            'infrastructure/network/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'MQTT endpoints',
          description:
            'Understand, configure, view, and scale the MQTT endpoints the reader publishes to.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🔌' },
          link: {
            type: 'generated-index',
            title: 'MQTT endpoints',
            description:
              'What endpoints are, how to configure and view them, and multi-endpoint architectures.',
            slug: '/part-4/endpoints',
          },
          items: [
            'infrastructure/mqtt-endpoints',
            'infrastructure/multi-endpoint',
            'infrastructure/configure-endpoints',
            'infrastructure/view-endpoints',
          ],
        },
        {
          type: 'category',
          label: 'Security (TLS & certificates)',
          description:
            'Secure endpoints with TLS, then install, manage, and rotate certificates.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🛡️' },
          link: {
            type: 'generated-index',
            title: 'Security (TLS & certificates)',
            description:
              'The TLS security model, enabling TLS on an endpoint, and installing, managing, and rotating certificates.',
            slug: '/part-4/security',
          },
          items: [
            'infrastructure/tls-and-certificates',
            'infrastructure/certificate-management',
            'infrastructure/tls-setup',
            'infrastructure/certificate-rotation',
          ],
        },
        'infrastructure/system-operations',
      ],
    },
    {
      type: 'category',
      label: 'Part 5: Read tags',
      description:
        'Operating-mode profiles, start/stop and trigger semantics, and post-singulation filtering — the on-air RFID surface.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 5: Read tags',
        description:
          'Operating-mode profiles, start/stop/trigger semantics, and post-singulation filtering — the on-air RFID surface the reader exposes over MQTT.',
        slug: '/part-5',
      },
      items: [
        {
          type: 'category',
          label: 'Operating mode',
          description:
            'Choose, configure, and tune how the reader reads tags — profiles, RF performance, and trigger composition.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '⚙️' },
          link: {
            type: 'generated-index',
            title: 'Operating mode',
            description:
              'Choose an operating-mode profile, configure it, tune RF performance, and compose triggers — how the reader reads tags before you run your first inventory.',
            slug: '/part-5/operating-mode',
          },
          items: [
            'rfid/operating-mode-profiles',
            'rfid/operating-mode/configure',
            'rfid/performance-tuning',
            'rfid/operating-mode/trigger-composition',
          ],
        },
        'tutorials/read-your-first-tag',
        'rfid/start-stop-inventory',
        'rfid/barcode',
        'rfid/post-filters',
        'rfid/operating-mode/post-filters-configure',
      ],
    },
    {
      type: 'category',
      label: 'Part 6: Observe and monitor',
      description:
        'Choose which events the reader emits, then build pipelines around heartbeats, alerts, and tag reads.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 6: Observe and monitor',
        description:
          'Configure which events the reader emits, then design pipelines around heartbeats, alerts, connection-state transitions, and tag-read events.',
        slug: '/part-6',
      },
      items: [
        'observability/heartbeat',
        'observability/alerts',
        'observability/mqtt-connection',
        {
          type: 'category',
          label: 'Event model & catalog',
          description:
            'How IOTC events are structured, and the full catalog of types the reader emits.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '📇' },
          link: {
            type: 'generated-index',
            title: 'Event model & catalog',
            description:
              'How IOTC events are structured, and the catalog of event types the reader can emit.',
            slug: '/part-6/events',
          },
          items: [
            'observability/events/model',
            'observability/events/catalog',
          ],
        },
        'observability/configure-events',
        {
          type: 'category',
          label: 'Monitoring how-tos',
          description:
            'Practical recipes for monitoring device health, battery, connection quality, and fleet-wide dashboards.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '📈' },
          link: {
            type: 'generated-index',
            title: 'Monitoring how-tos',
            description:
              'Practical recipes for monitoring device health, battery lifecycle, connection quality, and a fleet-wide dashboard.',
            slug: '/part-6/monitoring',
          },
          items: [
            'observability/monitoring/device-health',
            'observability/monitoring/battery',
            'observability/monitoring/connection-quality',
            'observability/monitoring/fleet-dashboard',
          ],
        },
        {
          type: 'category',
          label: 'Tag data',
          description:
            'The dataEVT schema, dual data channels, and how to interpret and process tag reads.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🏷️' },
          link: {
            type: 'generated-index',
            title: 'Tag data',
            description:
              'The dataEVT schema, tag-data architecture, the dual data channels, and how to interpret and process tag reads.',
            slug: '/part-6/tag-data',
          },
          items: [
            'rfid/tag-data/architecture',
            'rfid/dataevt-schema',
            'rfid/tag-data/interpret',
            'rfid/tag-data/dual-channels',
            'rfid/tag-data/process',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Part 7: Scale to a fleet',
      description:
        'Provision, configure, and migrate readers at fleet scale, and integrate them with your cloud.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 7: Scale to a fleet',
        description:
          'Provisioning models (single-reader → MDM-managed fleet), bulk configuration, drift, reliability under network duress, migration, and cloud integration.',
        slug: '/part-7',
      },
      items: [
        'fleet/provisioning-models',
        'fleet/provision-fleet',
        'fleet/bulk-management',
        'fleet/management/drift',
        'fleet/retention-and-retry',
        {
          type: 'category',
          label: 'Provisioning how-tos',
          description:
            'Provision readers in bulk with 123RFID Desktop, SOTI Connect zero-touch, or your own automation.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '📲' },
          link: {
            type: 'generated-index',
            title: 'Provisioning how-tos',
            description:
              'Provision readers in bulk with 123RFID Desktop, set up zero-touch provisioning with SOTI Connect, and automate the workflow.',
            slug: '/part-7/provisioning',
          },
          items: [
            'fleet/provisioning/bulk-123rfid',
            'fleet/provisioning/soti-connect',
            'fleet/provisioning/automation',
          ],
        },
        {
          type: 'category',
          label: 'Migration',
          description:
            'Plan, execute, and verify a firmware migration across the fleet.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🛫' },
          link: {
            type: 'generated-index',
            title: 'Migration',
            description:
              'Plan, execute, and verify a firmware migration across the fleet.',
            slug: '/part-7/migration',
          },
          items: [
            'fleet/migration/plan',
            'fleet/migration/execute',
            'fleet/migration/verify',
            'fleet/migration/from-123rfid-desktop',
          ],
        },
        {
          type: 'category',
          label: 'Cloud integration',
          description:
            'Integration patterns plus concrete guides for AWS IoT Core, Azure IoT Hub, Google Cloud, and custom brokers.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '☁️' },
          link: {
            type: 'generated-index',
            title: 'Cloud integration',
            description:
              'Vendor-side prerequisites, integration architecture patterns, plus concrete guides for AWS IoT Core, Azure IoT Hub, Google Cloud, and custom MQTT brokers.',
            slug: '/part-7/cloud',
          },
          items: [
            'fleet/cloud-integration/prerequisites',
            'fleet/cloud-integration/patterns',
            'fleet/cloud-integration/aws',
            'fleet/cloud-integration/azure',
            'fleet/cloud-integration/gcp',
            'fleet/cloud-integration/custom-broker',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Part 8: Diagnose & recover',
      description:
        'Symptom-first diagnostics, the failure-mode catalogue, and recovery playbooks for resolving incidents fast.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 8: Diagnose & recover',
        description:
          'Symptom-first diagnostics, the failure-mode catalogue, the where-things-fail model, recovery playbooks, and common misconceptions — the incident-response surface.',
        slug: '/part-8',
      },
      items: [
        'diagnose/symptoms',
        'diagnose/failure-modes',
        'diagnose/where-things-fail',
        'diagnose/recovery-playbooks',
        'diagnose/handle-errors',
        'diagnose/misconceptions',
      ],
    },
    {
      type: 'category',
      label: 'Part 9: Reference',
      description:
        'Error codes, FAQs, appendices, glossary, and MDM notes — the lookup surface for IOTC. The per-operation MQTT API Reference has its own tab in the top navigation.',
      collapsible: true,
      collapsed: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        title: 'Part 9: Reference',
        description:
          'Error codes and handling, FAQs, appendices, the glossary of canonical terms and limits, and MDM/SOTI notes. The per-operation MQTT API Reference lives under its own "API Reference" tab in the top navigation.',
        slug: '/part-9',
      },
      items: [
        'reference/mdm/about',
        {
          type: 'category',
          label: 'Error codes & handling',
          description:
            'The command-response error codes, the response format, and how to handle errors in your code.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '🔢' },
          link: {
            type: 'generated-index',
            title: 'Error codes & handling',
            description:
              'The command response error codes, the error response format, and how to handle errors in application code.',
            slug: '/part-9/errors',
          },
          items: [
            'reference/errors/format',
            'reference/errors/codes',
          ],
        },
        {
          type: 'category',
          label: 'FAQ',
          description:
            'Answers to common questions — general, connectivity, compatibility, RFID operations, and fleet management.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '❓' },
          link: {
            type: 'generated-index',
            title: 'FAQ',
            description:
              'Answers to common questions about IOTC — general, connectivity, compatibility, RFID operations, and fleet management.',
            slug: '/part-9/faq',
          },
          items: [
            'reference/faq/general',
            'reference/faq/connectivity',
            'reference/faq/compatibility',
            'reference/faq/rfid',
            'reference/faq/fleet',
          ],
        },
        {
          type: 'category',
          label: 'Appendices',
          description:
            'Regulatory information, firmware history, supported tag standards, and the MQTT topic quick reference.',
          collapsible: true,
          collapsed: true,
          customProps: { emoji: '📎' },
          link: {
            type: 'generated-index',
            title: 'Appendices',
            description:
              'Regulatory and regional information, firmware version history, supported RFID tag standards, and the MQTT topic quick reference.',
            slug: '/part-9/appendices',
          },
          items: [
            'reference/appendices/regulatory',
            'reference/appendices/firmware-history',
            'reference/appendices/tag-standards',
            'reference/appendices/topic-quick-reference',
          ],
        },
        'reference/glossary',
      ],
    },
  ],

  // Separate MQTT API Reference doc — its own top-nav tab and sidebar, kept out
  // of the conceptual "9 Parts" above. Pages keep their /reference/... URLs.
  apiReference: [
    'reference/api-overview',
    {
      type: 'category',
      label: 'Management',
      collapsible: true,
      collapsed: false,
      customProps: { emoji: '🛠️' },
      items: [
        {
          type: 'category',
          label: 'Device Status',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '📟' },
          items: [
            'reference/mgmt/get-status',
            'reference/mgmt/get-version',
            'reference/mgmt/get-current-region',
          ],
        },
        {
          type: 'category',
          label: 'Network Configuration',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🌐' },
          items: [
            'reference/mgmt/get-eth',
            'reference/mgmt/get-wifi',
            'reference/mgmt/set-wifi',
            'reference/mgmt/delete-wifi-profile',
          ],
        },
        {
          type: 'category',
          label: 'MQTT Endpoint Configuration',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🔌' },
          items: [
            'reference/mgmt/get-endpoint-config',
            'reference/mgmt/config-endpoint',
          ],
        },
        {
          type: 'category',
          label: 'Certificate Management',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🛡️' },
          items: [
            'reference/mgmt/get-installed-certificate',
            'reference/mgmt/install-certificate',
            'reference/mgmt/delete-certificate',
          ],
        },
        {
          type: 'category',
          label: 'System Operations',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🔧' },
          items: [
            'reference/mgmt/set-os',
            'reference/mgmt/reboot',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Control',
      collapsible: true,
      collapsed: false,
      customProps: { emoji: '🎛️' },
      items: [
        {
          type: 'category',
          label: 'Operating Mode',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '⚙️' },
          items: [
            'reference/ctrl/get-operating-mode',
            'reference/ctrl/set-operating-mode',
          ],
        },
        {
          type: 'category',
          label: 'Tag Filtering',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🔎' },
          items: [
            'reference/ctrl/get-post-filter',
            'reference/ctrl/set-post-filter',
          ],
        },
        {
          type: 'category',
          label: 'Inventory Control',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '▶️' },
          items: [
            'reference/ctrl/control-operation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Events',
      collapsible: true,
      collapsed: false,
      customProps: { emoji: '📣' },
      items: [
        {
          type: 'category',
          label: 'Event Configuration',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🔔' },
          items: [
            'reference/mgmt/config-events',
          ],
        },
        {
          type: 'category',
          label: 'Device Health',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '💓' },
          items: [
            'reference/events/heartbeat-event',
          ],
        },
        {
          type: 'category',
          label: 'Alerts',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🚨' },
          items: [
            'reference/events/alerts-event',
          ],
        },
        {
          type: 'category',
          label: 'MQTT Connectivity',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '🔗' },
          items: [
            'reference/events/mqtt-connection-event',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Data',
      collapsible: true,
      collapsed: false,
      customProps: { emoji: '🏷️' },
      items: [
        {
          type: 'category',
          label: 'Tag Data Event',
          collapsible: true,
          collapsed: false,
          customProps: { emoji: '📥' },
          items: [
            'reference/data/tag-data-event',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
