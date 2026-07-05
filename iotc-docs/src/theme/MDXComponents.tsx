import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

/**
 * Swizzle (wrap) of the theme MDXComponents map.
 *
 * Every Markdown table is wrapped in a `.table-wrapper` element that allows
 * horizontal scrolling (`overflow-x: auto`, styled in src/css/custom.scss).
 * Most tables still fit the content column and wrap their cells (no
 * scrollbar appears); only genuinely wide tables — the 6-column error-code
 * catalogue, the 4-column interface table — scroll horizontally instead of
 * overflowing and breaking the page layout on narrow viewports.
 */
export default {
  ...MDXComponents,
  table: (props: React.ComponentProps<'table'>): React.JSX.Element => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
};
