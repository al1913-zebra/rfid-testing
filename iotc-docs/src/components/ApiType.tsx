import React, { type ReactNode } from 'react';

/**
 * ApiType — color-coded type badge + enum pill for the MQTT API reference.
 *
 * `<Type>string</Type>` renders a color-coded JSON-type token; the word is
 * always the visible text, so the meaning survives when color is unavailable
 * (WCAG 1.4.1 — color is not the only signal). Colors are defined in
 * `src/css/api.scss` and clear WCAG AA (4.5:1) on both themes.
 *
 * `<Enum>ACTIVE</Enum>` renders a neutral monospace pill for one allowed
 * enum value.
 */

/** Color-coded JSON type token, e.g. `<Type>string</Type>`. */
export function Type({ children }: { children: ReactNode }): React.JSX.Element {
  const key = String(children).trim().toLowerCase();
  return <span className={`api-type api-type--${key}`}>{children}</span>;
}

/** Neutral monospace pill for an allowed enum value, e.g. `<Enum>ACTIVE</Enum>`. */
export function Enum({ children }: { children: ReactNode }): React.JSX.Element {
  return <span className="api-enum">{children}</span>;
}
