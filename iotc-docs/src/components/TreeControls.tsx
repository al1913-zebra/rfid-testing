import React from 'react';

/**
 * TreeControls — the shared "Expand all" / "Collapse all" bulk-control pair used by
 * both <SchemaTable> (Schema tab) and <JsonBlock> (Example tab), rendered as two
 * compact icon buttons inside a labelled group.
 *
 * Design rationale (see the UX analysis behind this): a collapsible tree's GLOBAL
 * state is tri-state — fully expanded / fully collapsed / mixed — over 2^N per-node
 * combinations, NOT a binary. So these stay two distinct, stable-labelled commands
 * rather than one relabeling toggle: both actions remain reachable in one click from
 * any state, keep fixed positions (muscle memory), and keep stable accessible names.
 *
 * State-aware: each button is `aria-disabled` (and inert) exactly when its action
 * would be a no-op — Expand all when everything is already expanded, Collapse all
 * when everything is collapsed. The enabled/disabled pair therefore SIGNALS the
 * current global state (both active = mixed; one dimmed = at that extreme), which is
 * the real benefit a single toggle promised — without hiding an action. `aria-disabled`
 * (not the native `disabled` attribute) keeps the icon button focusable so it retains
 * its tooltip and screen-reader name while dimmed.
 */

function ExpandAllIcon(): React.JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* chevrons pointing away from the centre — "unfold" */}
      <polyline points="8 9 12 5 16 9" />
      <polyline points="8 15 12 19 16 15" />
    </svg>
  );
}

function CollapseAllIcon(): React.JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* chevrons pointing toward the centre — "fold" */}
      <polyline points="8 5 12 9 16 5" />
      <polyline points="8 19 12 15 16 19" />
    </svg>
  );
}

export default function TreeControls({
  className,
  onExpandAll,
  onCollapseAll,
  expandDisabled,
  collapseDisabled,
}: {
  /** Wrapper class — the group's layout (e.g. `schema-controls` or `json-bulk-controls`). */
  className?: string;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  /** Expand-all is a no-op (everything already expanded). */
  expandDisabled: boolean;
  /** Collapse-all is a no-op (everything already collapsed). */
  collapseDisabled: boolean;
}): React.JSX.Element {
  return (
    <div className={className} role="group" aria-label="Expand or collapse all">
      <button
        type="button"
        className="schema-ctrl schema-ctrl--icon"
        aria-label="Expand all"
        data-tooltip="Expand all"
        aria-disabled={expandDisabled || undefined}
        onClick={() => {
          if (!expandDisabled) onExpandAll();
        }}
      >
        <ExpandAllIcon />
      </button>
      <button
        type="button"
        className="schema-ctrl schema-ctrl--icon"
        aria-label="Collapse all"
        data-tooltip="Collapse all"
        aria-disabled={collapseDisabled || undefined}
        onClick={() => {
          if (!collapseDisabled) onCollapseAll();
        }}
      >
        <CollapseAllIcon />
      </button>
    </div>
  );
}
