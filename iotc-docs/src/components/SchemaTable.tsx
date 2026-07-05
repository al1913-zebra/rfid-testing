import React, { useMemo, useState, useEffect, useRef, useId, type ReactNode } from 'react';
import TreeControls from './TreeControls';

/**
 * SchemaTable — a single, unified, collapsible tree-table for an MQTT request
 * or response body. It MERGES the schema and the example into one table:
 * columns are Field · Type · Required · Enum / Units · Example · Description,
 * with a line-number gutter on the left.
 *
 * - Nested objects/arrays are child rows, indented under their parent.
 * - Every expandable row has a `+` (collapsed) / `−` (expanded) toggle before
 *   the field name.
 * - "Expand all" / "Collapse all" controls sit above the table.
 * - Line numbers count the currently VISIBLE rows (collapsing a row renumbers).
 *
 * Width strategy (the right-hand TOC stays persistent site-wide — width is solved
 * at the table level, not by hiding navigation):
 *   1. Column sizing (src/css/api.scss) caps the boundable columns so Description
 *      keeps a comfortable, flexible width and most tables fit beside the TOC.
 *   2. When a table is still too wide it scrolls horizontally inside `.schema-table-wrap`
 *      — an edge fade signals the overflow and the scroll box becomes a focusable,
 *      labelled region ONLY while it actually scrolls (WCAG 2.1.1 keyboard scroll).
 *   3. An explicit, per-table "Expand table" toggle full-bleeds ONLY that table to
 *      the viewport's right edge on demand (shown only when the table overflows);
 *      navigation is never hidden.
 *
 * Authoring: pass `rows` as a tree (defined in the page's ESM block). Usually
 * rendered inside <ApiBody> (Schema tab). See `_templates/COMMAND_TEMPLATE.mdx`.
 */

export type SchemaRow = {
  /** Field name (rendered monospace). */
  field: string;
  /** JSON type: string | integer | number | boolean | object | array | enum | null. */
  type?: string;
  /** true → "Yes", false → "No", or a custom string. */
  required?: boolean | string;
  /** Array → enum pills; string → units/constraint text (e.g. "mAh", "0–100"). */
  enumUnits?: string[] | string;
  /** Example value (rendered monospace). */
  example?: string;
  /** Description. Backtick-delimited spans render as inline code. */
  desc?: ReactNode;
  /** Nested child fields. */
  children?: SchemaRow[];
};

type FlatRow = { row: SchemaRow; id: string; depth: number; hasChildren: boolean; isOpen: boolean };

const INDENT_REM = 1.4;

function renderDesc(text: ReactNode): ReactNode {
  if (text == null) return null;
  if (typeof text !== 'string') return text;
  return text.split('`').map((part, i) =>
    i % 2 === 1 ? <code key={i}>{part}</code> : <React.Fragment key={i}>{part}</React.Fragment>,
  );
}

function renderRequired(required: SchemaRow['required']): ReactNode {
  if (required === true) return <span className="schema-req schema-req--yes">Yes</span>;
  if (required === false || required == null) return <span className="schema-req schema-req--no">No</span>;
  return <span className="schema-req">{required}</span>;
}

function renderEnumUnits(enumUnits: SchemaRow['enumUnits']): ReactNode {
  if (Array.isArray(enumUnits)) {
    if (enumUnits.length === 0) return <span className="schema-muted">—</span>;
    return enumUnits.map((v, i) => (
      <span className="api-enum" key={i}>
        {v}
      </span>
    ));
  }
  if (typeof enumUnits === 'string' && enumUnits.trim() !== '') {
    return <span className="schema-units">{enumUnits}</span>;
  }
  return <span className="schema-muted">—</span>;
}

// Horizontal expand/collapse (full-bleed) glyphs for the "Expand table" toggle.
function ExpandTableIcon(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="12" x2="21" y2="12" />
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
    </svg>
  );
}

function CollapseTableIcon(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="12" x2="16" y2="12" />
      <polyline points="4 8 8 12 4 16" />
      <polyline points="20 8 16 12 20 16" />
    </svg>
  );
}

// All expandable (has-children) node ids, by path.
function collectExpandable(rows: SchemaRow[], prefix = '', acc: string[] = []): string[] {
  rows.forEach((r, i) => {
    const id = prefix ? `${prefix}.${i}` : `${i}`;
    if (r.children && r.children.length > 0) {
      acc.push(id);
      collectExpandable(r.children, id, acc);
    }
  });
  return acc;
}

// Flatten to the list of currently VISIBLE rows (respecting `expanded`).
function flatten(
  rows: SchemaRow[],
  expanded: Set<string>,
  depth = 0,
  prefix = '',
  out: FlatRow[] = [],
): FlatRow[] {
  rows.forEach((r, i) => {
    const id = prefix ? `${prefix}.${i}` : `${i}`;
    const hasChildren = !!(r.children && r.children.length > 0);
    const isOpen = expanded.has(id);
    out.push({ row: r, id, depth, hasChildren, isOpen });
    if (hasChildren && isOpen) flatten(r.children!, expanded, depth + 1, id, out);
  });
  return out;
}

export default function SchemaTable({ rows, title }: { rows: SchemaRow[]; title?: string }): React.JSX.Element {
  const titleId = useId(); // labels the <table> for screen readers (tables are jumped between)
  const expandableIds = useMemo(() => collectExpandable(rows), [rows]);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(expandableIds));
  const toggle = (id: string): void =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const expandAll = (): void => setExpanded(new Set(expandableIds));
  const collapseAll = (): void => setExpanded(new Set());
  const hasExpandable = expandableIds.length > 0;
  // Expand-all / Collapse-all disabled-state (this component stores EXPANDED ids):
  const allExpanded = expanded.size === expandableIds.length;
  const allCollapsed = expanded.size === 0;

  // --- Layer 2: horizontal-scroll affordance + accessible scroll region ---
  const wrapRef = useRef<HTMLDivElement>(null); // the overflow:auto scroll container
  const [scroll, setScroll] = useState<{ left: boolean; right: boolean }>({ left: false, right: false });
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const update = (): void => {
      const max = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft > 1;
      const right = el.scrollLeft < max - 1;
      // Bail out when unchanged so horizontal scrolling doesn't re-render every frame.
      setScroll((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // --- Layer 3: per-table "Expand table" (full-bleed) toggle ---
  // On-demand and per-instance (NOT persisted): the toggle only appears on a table
  // that actually overflows, and full-bleed is never auto-applied — so it never
  // force-expands other tables or re-covers the (now persistent) TOC.
  const panelRef = useRef<HTMLDivElement>(null); // the whole panel (header + table); full-bleeds together
  const [fullWidth, setFullWidth] = useState(false);
  const toggleFullWidth = (): void => setFullWidth((v) => !v);
  // Measure the exact width needed to reach the viewport's right edge (reclaiming
  // the TOC gutter) — the doc content column is NOT centred in the viewport, so a
  // pure-CSS `calc(50% - 50vw)` breakout would be mis-offset. clientWidth excludes
  // the scrollbar, so the table never triggers a horizontal page scrollbar. A
  // ResizeObserver re-measures when the panel is revealed (Example is the default
  // tab, so the Schema panel can be display:none); measuring is skipped while hidden.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;
    if (!fullWidth) {
      el.style.removeProperty('--fb-width');
      return undefined;
    }
    const measure = (): void => {
      if (el.clientWidth === 0) return; // hidden (display:none) — the RO re-fires on reveal
      const left = el.getBoundingClientRect().left;
      const vw = document.documentElement.clientWidth;
      el.style.setProperty('--fb-width', `${vw - left}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [fullWidth]);

  const visible = useMemo(() => flatten(rows, expanded), [rows, expanded]);
  const scrollable = scroll.left || scroll.right;
  const showFullWidth = scrollable || fullWidth;

  return (
    <div className="schema">
      <div
        ref={panelRef}
        className={'schema-panel' + (fullWidth ? ' schema-panel--fullbleed' : '')}
      >
        <div className="schema-header">
          {title ? (
            <span className="schema-title" id={titleId}>
              {title}
            </span>
          ) : null}
          <span className="schema-header-spacer" />
          {hasExpandable ? (
            <TreeControls
              className="schema-controls"
              onExpandAll={expandAll}
              onCollapseAll={collapseAll}
              expandDisabled={allExpanded}
              collapseDisabled={allCollapsed}
            />
          ) : null}
          {showFullWidth ? (
            <button
              type="button"
              className="schema-ctrl schema-ctrl--icon schema-fullbleed-toggle"
              aria-pressed={fullWidth}
              aria-label={fullWidth ? 'Collapse table to column width' : 'Expand table to full width'}
              data-tooltip={fullWidth ? 'Collapse table' : 'Expand table'}
              onClick={toggleFullWidth}
            >
              {fullWidth ? <CollapseTableIcon /> : <ExpandTableIcon />}
            </button>
          ) : null}
        </div>
        <div
          className={
            'schema-table-scroll' +
            (scroll.left ? ' has-scroll-left' : '') +
            (scroll.right ? ' has-scroll-right' : '')
          }
        >
          <div
            className="schema-table-wrap"
            ref={wrapRef}
            {...(scrollable
              ? { role: 'region', 'aria-label': 'Schema table, scroll horizontally to see more', tabIndex: 0 }
              : {})}
          >
            <table className="schema-table" aria-labelledby={title ? titleId : undefined}>
            <thead>
              <tr>
                <th className="schema-ln-head" aria-label="Line number">
                  #
                </th>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>Enum / Units</th>
                <th>Example</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(({ row: r, id, depth, hasChildren, isOpen }, idx) => (
                <tr key={id} className={`schema-row${hasChildren ? ' schema-row--parent' : ''}`}>
                  <td className="schema-ln" aria-hidden="true">
                    {idx + 1}
                  </td>
                  <td className="schema-cell schema-cell--field">
                    <span className="schema-indent" style={{ paddingLeft: `${depth * INDENT_REM}rem` }}>
                      {hasChildren ? (
                        <button
                          type="button"
                          className="schema-toggle"
                          aria-expanded={isOpen}
                          aria-label={isOpen ? `Collapse ${r.field}` : `Expand ${r.field}`}
                          onClick={() => toggle(id)}
                        >
                          <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                        </button>
                      ) : (
                        <span className="schema-toggle-spacer" aria-hidden="true" />
                      )}
                      <code className="schema-field">{r.field}</code>
                    </span>
                  </td>
                  <td className="schema-cell schema-cell--type">
                    {r.type ? (
                      <span className={`api-type api-type--${String(r.type).trim().toLowerCase()}`}>{r.type}</span>
                    ) : (
                      <span className="schema-muted">—</span>
                    )}
                  </td>
                  <td className="schema-cell schema-cell--req">{renderRequired(r.required)}</td>
                  <td className="schema-cell schema-cell--enum">{renderEnumUnits(r.enumUnits)}</td>
                  <td className="schema-cell schema-cell--example">
                    {r.example != null && r.example !== '' ? (
                      <code className="schema-example">{r.example}</code>
                    ) : (
                      <span className="schema-muted">—</span>
                    )}
                  </td>
                  <td className="schema-cell schema-cell--desc">{renderDesc(r.desc)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
