import type { ClientModule } from '@docusaurus/types';
import './styles.scss';

/**
 * Sidebar deep-linking + auto-scroll.
 *
 * When a reader arrives via a direct URL (or follows an in-page anchor):
 *
 *  - LEFT sidebar (page nav): the link for the current page
 *    (`.menu__link--active`) is scrolled into view *within the sidebar's own
 *    scroll container* (never the window) and briefly highlighted, so a
 *    reader who lands on e.g. /fleet/cloud-integration/gcp/ immediately sees
 *    where "How to integrate IOTC with Google Cloud IoT" sits in the tree.
 *
 *  - RIGHT sidebar (section nav / TOC): when the URL has a hash
 *    (e.g. /diagnose/failure-modes/#fm-sec-03), the matching table-of-contents
 *    entry is scrolled into view within the TOC and highlighted, and the
 *    target heading in the article is briefly highlighted too.
 *
 *  - RIGHT sidebar (ScrollSpy follow): as the reader scrolls the article,
 *    Docusaurus highlights the active TOC entry; a MutationObserver keeps that
 *    active entry in view within the TOC's own scroll container, so it never
 *    drifts below the fold on long pages (e.g. /diagnose/failure-modes/).
 *
 * Pure DOM, no dependencies. Runs on initial load and every route update.
 */

const LINK_FLASH = 'deeplink-flash';
const HEADING_FLASH = 'deeplink-flash-heading';

// ScrollSpy → TOC sync state: one observer, re-attached on each route update.
let tocObserver: MutationObserver | null = null;
let tocSyncRaf = 0;

function isScrollable(node: HTMLElement): boolean {
  const oy = getComputedStyle(node).overflowY;
  return (oy === 'auto' || oy === 'scroll' || oy === 'overlay') && node.scrollHeight > node.clientHeight + 4;
}

/** Nearest ancestor that actually scrolls vertically (or null if none). */
function scrollableAncestor(el: Element | null): HTMLElement | null {
  let node: HTMLElement | null = el ? el.parentElement : null;
  while (node && node !== document.body) {
    if (isScrollable(node)) return node;
    node = node.parentElement;
  }
  return null;
}

/** Center `el` inside its own scroll container, leaving the window untouched. */
function centerWithinSidebar(el: HTMLElement): void {
  const container = scrollableAncestor(el);
  if (!container) return; // nothing to scroll — the item is already on screen
  const cRect = container.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();
  const delta = eRect.top - cRect.top - container.clientHeight / 2 + eRect.height / 2;
  const target = Math.max(0, container.scrollTop + delta);
  if (Math.abs(target - container.scrollTop) < 4) return; // already roughly centered
  try {
    container.scrollTo({ top: target, behavior: 'smooth' });
  } catch {
    container.scrollTop = target;
  }
}

/**
 * Keep `el` visible inside its own scroll container with the *minimal* movement
 * needed (unlike centering). Used for continuous ScrollSpy sync so the TOC does
 * not jump on every scroll tick. Instant scroll — no animation queue, so no jank
 * during rapid scrolling. Never touches the window scroll position.
 */
function revealWithinSidebar(el: HTMLElement): void {
  const container = scrollableAncestor(el);
  if (!container) return; // already on screen, or nothing scrollable
  const cRect = container.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();
  const margin = 16; // breathing room above/below the active item
  let delta = 0;
  if (eRect.top < cRect.top + margin) delta = eRect.top - (cRect.top + margin);
  else if (eRect.bottom > cRect.bottom - margin) delta = eRect.bottom - (cRect.bottom - margin);
  if (delta === 0) return; // already comfortably in view
  const max = container.scrollHeight - container.clientHeight;
  const target = Math.max(0, Math.min(container.scrollTop + delta, max));
  if (Math.abs(target - container.scrollTop) >= 1) container.scrollTop = target;
}

/** Bring the currently-highlighted desktop-TOC link into view (ScrollSpy). */
function syncActiveTocIntoView(): void {
  const active = document.querySelector<HTMLElement>(
    '.theme-doc-toc-desktop .table-of-contents__link--active',
  );
  if (active) revealWithinSidebar(active);
}

/**
 * Watch the desktop TOC for active-class changes — Docusaurus' ScrollSpy toggles
 * `.table-of-contents__link--active` as the reader scrolls — and keep the active
 * entry in view within the (sticky, overflow-y:auto) TOC container. Re-attached
 * on every route update; coalesced to one sync per animation frame so bursts of
 * class mutations stay cheap.
 */
function attachTocScrollSync(): void {
  if (tocObserver) {
    tocObserver.disconnect();
    tocObserver = null;
  }
  const toc = document.querySelector<HTMLElement>('.theme-doc-toc-desktop');
  if (!toc) return; // page has no desktop TOC (few or no headings)
  syncActiveTocIntoView(); // initial alignment (e.g. a mid-page deep-link)
  tocObserver = new MutationObserver(() => {
    if (tocSyncRaf) return; // coalesce a burst of mutations into one frame
    tocSyncRaf = window.requestAnimationFrame(() => {
      tocSyncRaf = 0;
      syncActiveTocIntoView();
    });
  });
  tocObserver.observe(toc, { subtree: true, attributes: true, attributeFilter: ['class'] });
}

function flash(el: Element | null, cls: string, ms: number): void {
  if (!el) return;
  el.classList.remove(cls);
  // force a reflow so re-adding the class restarts the animation
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
  window.setTimeout(() => el.classList.remove(cls), ms);
}

function clearFlashes(cls: string): void {
  document.querySelectorAll('.' + cls).forEach((n) => n.classList.remove(cls));
}

function cssEscape(s: string): string {
  const c = (window as unknown as { CSS?: { escape?: (v: string) => string } }).CSS;
  if (c && typeof c.escape === 'function') return c.escape(s);
  return s.replace(/["\\\]]/g, '\\$&');
}

function orient(pathChanged: boolean): void {
  // ---- LEFT SIDEBAR: highlight + reveal the active page link ----
  if (pathChanged) {
    clearFlashes(LINK_FLASH);
    const activeLink = document.querySelector<HTMLElement>(
      '.menu__link--active:not(.menu__link--sublist), .theme-doc-sidebar-menu a.menu__link[aria-current="page"]',
    );
    if (activeLink) {
      centerWithinSidebar(activeLink);
      flash(activeLink, LINK_FLASH, 2200);
    }
  }

  // ---- RIGHT SIDEBAR + heading: only when the URL carries a section hash ----
  const rawHash = window.location.hash;
  if (rawHash && rawHash.length > 1) {
    let id = rawHash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* keep raw id */
    }
    const tocLink =
      document.querySelector<HTMLElement>(`.table-of-contents a[href="#${cssEscape(id)}"]`) ||
      document.querySelector<HTMLElement>('.table-of-contents__link--active');
    if (tocLink) {
      centerWithinSidebar(tocLink);
      flash(tocLink, LINK_FLASH, 2200);
    }
    const heading = document.getElementById(id);
    if (heading) {
      flash(heading, HEADING_FLASH, 1800);
    }
  }
}

const clientModule: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (typeof document === 'undefined') return;
    const pathChanged = location.pathname !== previousLocation?.pathname;
    // Let the sidebar/TOC render and the browser's native hash-scroll settle
    // before measuring positions. Longer delay on a full page change.
    window.setTimeout(() => {
      orient(pathChanged);
      attachTocScrollSync();
    }, pathChanged ? 350 : 120);
  },
};

export default clientModule;
