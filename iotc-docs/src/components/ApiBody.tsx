import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SchemaTable, { type SchemaRow } from './SchemaTable';
import JsonBlock, { type Json } from './JsonBlock';

/**
 * ApiBody — the request/response (or event payload / configuration) body for an
 * MQTT reference page, presented as two tabs of the SAME underlying data:
 *
 *   • "Example" — the collapsible, copy-pasteable <JsonBlock>, with line numbers.
 *                 Shown first (the default view): readers scan a concrete payload
 *                 before drilling into the field-by-field contract.
 *   • "Schema"  — the unified collapsible <SchemaTable> (Field · Type · Required
 *                 · Enum / Units · Example · Description), with line numbers.
 *
 * All ApiBody instances on a page share the "api-body-view" groupId, so choosing
 * Schema/Example on one body switches every body to match (and persists).
 *
 * `title` names the SECTION ("Request payload" / "Response payload" / "Event
 * payload") and is shown in BOTH tabs' header bars — so it must be view-agnostic
 * (no "example", no variant qualifier). `exampleCaption` is the example-specific
 * qualifier ("RFID START", "live, abridged"): it describes only the concrete JSON,
 * so it renders as a caption in the Example tab ONLY (never over the schema, which
 * is variant-agnostic). For genuinely alternative payloads, use VariantSelect.
 *
 * Authoring: define the row tree and JSON object once in the page's ESM block, then
 * `<ApiBody rows={REQUEST_ROWS} json={REQUEST_JSON} title="Request payload" />`.
 */
export default function ApiBody({
  rows,
  json,
  title,
  exampleCaption,
}: {
  rows: SchemaRow[];
  json: Json;
  title?: string;
  exampleCaption?: string;
}): React.JSX.Element {
  return (
    <Tabs groupId="api-body-view" queryString="view" className="api-body-tabs">
      <TabItem value="example" label="Example" default>
        <JsonBlock data={json} title={title} caption={exampleCaption} />
      </TabItem>
      <TabItem value="schema" label="Schema">
        <SchemaTable rows={rows} title={title} />
      </TabItem>
    </Tabs>
  );
}
