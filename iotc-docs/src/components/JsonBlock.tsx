import React, { useMemo, useState } from 'react';
import TreeControls from './TreeControls';

/**
 * JsonBlock — a collapsible, copy-pasteable raw-JSON viewer.
 *
 * - Objects and arrays are foldable: each has a `+` (collapsed) / `−` (expanded)
 *   toggle before its opening brace/bracket.
 * - "Expand all" / "Collapse all" fold every container at once.
 * - "Copy" copies the pretty-printed JSON to the clipboard.
 *
 * Authoring: pass the actual JS value via `data` (defined in the page's ESM
 * block), not a string. See `_templates/COMMAND_TEMPLATE.mdx`.
 */

export type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

const INDENT_REM = 1.2;

function isContainer(v: Json): v is Json[] | { [k: string]: Json } {
  return v !== null && typeof v === 'object';
}

// Collect the path-ids of every container node (object/array with entries).
function collectContainers(value: Json, path = '', acc: string[] = []): string[] {
  if (isContainer(value)) {
    const entries: [string, Json][] = Array.isArray(value)
      ? value.map((v, i) => [String(i), v])
      : Object.entries(value);
    if (entries.length > 0) acc.push(path);
    entries.forEach(([k, v]) => collectContainers(v, `${path}/${k}`, acc));
  }
  return acc;
}

function Primitive({ value }: { value: Json }): React.JSX.Element {
  if (typeof value === 'string') return <span className="json-string">"{value}"</span>;
  if (typeof value === 'number') return <span className="json-number">{String(value)}</span>;
  if (typeof value === 'boolean') return <span className="json-boolean">{String(value)}</span>;
  return <span className="json-null">null</span>;
}

function KeyLabel({ label }: { label: string | null }): React.JSX.Element | null {
  if (label == null) return null;
  return (
    <>
      <span className="json-key">"{label}"</span>
      <span className="json-punct">: </span>
    </>
  );
}

function renderValue(
  value: Json,
  path: string,
  depth: number,
  keyLabel: string | null,
  trailingComma: boolean,
  collapsed: Set<string>,
  toggle: (p: string) => void,
): React.JSX.Element[] {
  const pad = { paddingLeft: `${depth * INDENT_REM}rem` };

  if (isContainer(value)) {
    const isArr = Array.isArray(value);
    const entries: [string, Json][] = isArr
      ? (value as Json[]).map((v, i) => [String(i), v])
      : Object.entries(value as { [k: string]: Json });
    const open = isArr ? '[' : '{';
    const close = isArr ? ']' : '}';
    const hasChildren = entries.length > 0;
    const isCollapsed = collapsed.has(path);
    const lines: React.JSX.Element[] = [];

    lines.push(
      <div className="json-line" key={`${path}#open`}>
        <span className="json-content" style={pad}>
          {hasChildren ? (
            <button
              type="button"
              className="json-toggle"
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
              onClick={() => toggle(path)}
            >
              <span aria-hidden="true">{isCollapsed ? '+' : '−'}</span>
            </button>
          ) : (
            <span className="json-toggle-spacer" aria-hidden="true" />
          )}
          <KeyLabel label={keyLabel} />
          <span className="json-punct">{open}</span>
          {!hasChildren ? (
            <span className="json-punct">
              {close}
              {trailingComma ? ',' : ''}
            </span>
          ) : isCollapsed ? (
            <>
              <span className="json-collapsed" onClick={() => toggle(path)}>
                {isArr ? ` ${entries.length} items ` : ' … '}
              </span>
              <span className="json-punct">
                {close}
                {trailingComma ? ',' : ''}
              </span>
            </>
          ) : null}
        </span>
      </div>,
    );

    if (hasChildren && !isCollapsed) {
      entries.forEach(([k, v], idx) => {
        lines.push(
          ...renderValue(
            v,
            `${path}/${k}`,
            depth + 1,
            isArr ? null : k,
            idx < entries.length - 1,
            collapsed,
            toggle,
          ),
        );
      });
      lines.push(
        <div className="json-line" key={`${path}#close`}>
          <span className="json-content" style={pad}>
            <span className="json-toggle-spacer" aria-hidden="true" />
            <span className="json-punct">
              {close}
              {trailingComma ? ',' : ''}
            </span>
          </span>
        </div>,
      );
    }
    return lines;
  }

  return [
    <div className="json-line" key={path}>
      <span className="json-content" style={pad}>
        <span className="json-toggle-spacer" aria-hidden="true" />
        <KeyLabel label={keyLabel} />
        <Primitive value={value} />
        <span className="json-punct">{trailingComma ? ',' : ''}</span>
      </span>
    </div>,
  ];
}

export default function JsonBlock({
  data,
  title,
  caption,
}: {
  data: Json;
  title?: string;
  /** Example-specific qualifier shown under the header (Example view only). */
  caption?: string;
}): React.JSX.Element {
  const pretty = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const containers = useMemo(() => collectContainers(data), [data]);
  // Default: fully expanded (collapsed set empty).
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const [copied, setCopied] = useState(false);
  const hasContainers = containers.length > 0;
  // Global state (this component stores COLLAPSED paths, default fully expanded):
  const allExpanded = collapsed.size === 0;
  const allCollapsed = collapsed.size === containers.length;

  const toggle = (p: string): void =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  const expandAll = (): void => setCollapsed(new Set());
  const collapseAll = (): void => setCollapsed(new Set(containers));
  const copy = (): void => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pretty).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        },
        () => {
          /* clipboard blocked — no-op */
        },
      );
    }
  };

  return (
    <div className="json-block">
      <div className="json-toolbar">
        {title ? <span className="json-title">{title}</span> : null}
        <span className="json-toolbar-spacer" />
        {hasContainers ? (
          <TreeControls
            className="json-bulk-controls"
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
            expandDisabled={allExpanded}
            collapseDisabled={allCollapsed}
          />
        ) : null}
        <button type="button" className="schema-ctrl json-copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {caption ? <div className="json-caption">Example: {caption}</div> : null}
      <div className="json-pre">{renderValue(data, '', 0, null, false, collapsed, toggle)}</div>
    </div>
  );
}
