import React, {
  Children,
  isValidElement,
  useEffect,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * VariantSelect / Variant / VariantView — API reference intent switcher.
 *
 * Used by the MQTT command/event reference templates (see
 * `_templates/COMMAND_TEMPLATE.mdx` and `_templates/EVENT_TEMPLATE.mdx`).
 *
 * - `<VariantSelect>` renders a dropdown that switches between `<Variant>`
 *   panels. Pass a `groupId` to sync it with a `<VariantView>` elsewhere on
 *   the page (e.g. the Response body follows the Request body's intent).
 * - `<VariantView>` is a display-only follower with no control of its own;
 *   give it the same `groupId` and matching `<Variant value="…">` ids.
 * - `<Variant>` is a labeled panel; `value` (or `label`) is its sync key.
 *
 * SSR-safe: the server render and first client render both use the first
 * variant (no hydration mismatch); an effect then restores the shared /
 * persisted choice and subscribes to future changes. This mirrors how
 * Docusaurus `<Tabs groupId>` keep tab choices in sync across a page.
 */

type VariantProps = {
  /** Sync key — must match between a VariantSelect and its VariantView. */
  value?: string;
  /** Human-readable dropdown label. */
  label?: string;
  children?: ReactNode;
};

type GroupState = {
  value: string | undefined;
  listeners: Set<(value: string) => void>;
};

// --- shared per-groupId store (module-level), mirrors Docusaurus <Tabs groupId> sync ---
const VARIANT_GROUPS = new Map<string, GroupState>();

function group(groupId: string): GroupState {
  let g = VARIANT_GROUPS.get(groupId);
  if (!g) {
    g = { value: undefined, listeners: new Set() };
    VARIANT_GROUPS.set(groupId, g);
  }
  return g;
}

function publish(groupId: string, value: string): void {
  const g = group(groupId);
  g.value = value;
  g.listeners.forEach((fn) => fn(value));
  try {
    localStorage.setItem(`variant-group:${groupId}`, value);
  } catch {
    /* SSR / no storage */
  }
}

function useVariantGroup(
  groupId: string | undefined,
  initial: string,
  valid: string[],
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(initial);
  useEffect(() => {
    if (!groupId) return undefined;
    const g = group(groupId);
    let restored = g.value;
    if (restored === undefined) {
      try {
        restored = localStorage.getItem(`variant-group:${groupId}`) ?? undefined;
      } catch {
        /* noop */
      }
    }
    if (restored !== undefined && valid.includes(restored)) setValue(restored);
    const fn = (v: string): void => {
      if (valid.includes(v)) setValue(v);
    };
    g.listeners.add(fn);
    return () => {
      g.listeners.delete(fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);
  return [value, setValue];
}

const variantsOf = (children: ReactNode): ReactElement<VariantProps>[] =>
  Children.toArray(children).filter(isValidElement) as ReactElement<VariantProps>[];

const valuesOf = (items: ReactElement<VariantProps>[]): string[] =>
  items.map((c, i) => String(c.props.value ?? c.props.label ?? i));

const pick = (
  items: ReactElement<VariantProps>[],
  values: string[],
  value: string,
): ReactElement<VariantProps> | null => {
  const i = values.indexOf(value);
  return items[i >= 0 ? i : 0] ?? null;
};

/**
 * A labeled variant panel. `value` (or `label`) identifies it for syncing;
 * put the per-variant Example/Schema `<Tabs>` inside it.
 */
export function Variant({ children }: VariantProps): React.JSX.Element {
  return <>{children}</>;
}

/**
 * The dropdown control. Pass a `groupId` to sync it with a `<VariantView>`
 * (or another `<VariantSelect>`) elsewhere on the page.
 */
export function VariantSelect({
  children,
  label = 'Variant',
  groupId,
}: {
  children: ReactNode;
  label?: string;
  groupId?: string;
}): React.JSX.Element | null {
  const items = variantsOf(children);
  const values = valuesOf(items);
  const id = useId();
  const [value, setValue] = useVariantGroup(groupId, values[0], values);
  const current = values.includes(value) ? value : values[0];
  const onChange = (v: string): void => {
    setValue(v);
    if (groupId) publish(groupId, v);
  };
  if (items.length === 0) return null; // no <Variant> children → nothing to render
  return (
    <div className="variant-select">
      <label className="variant-select__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="variant-select__control"
        value={current}
        onChange={(e) => onChange(e.target.value)}
      >
        {items.map((child, i) => (
          <option key={i} value={values[i]}>
            {child.props.label ?? `Option ${i + 1}`}
          </option>
        ))}
      </select>
      <div className="variant-select__panel">{pick(items, values, current)}</div>
    </div>
  );
}

/**
 * Display-only follower — NO dropdown. Use the SAME `groupId` and matching
 * `value`s as the controlling `<VariantSelect>`; it shows whichever variant
 * the dropdown currently selects.
 */
export function VariantView({
  children,
  groupId,
  caption,
}: {
  children: ReactNode;
  groupId?: string;
  caption?: string;
}): React.JSX.Element | null {
  const items = variantsOf(children);
  const values = valuesOf(items);
  const [value] = useVariantGroup(groupId, values[0], values);
  const current = values.includes(value) ? value : values[0];
  if (items.length === 0) return null; // no <Variant> children → nothing to render
  return (
    <div className="variant-view" aria-live="polite">
      {caption ? <p className="variant-view__caption">{caption}</p> : null}
      {pick(items, values, current)}
    </div>
  );
}
