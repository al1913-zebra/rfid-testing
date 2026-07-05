/**
 * Swizzled @theme/SearchBar — Algolia InstantSearch (Build plan).
 *
 * Replaces the default DocSearch bar with a custom react-instantsearch
 * autocomplete dropdown over our own crawler index (the `…_pages` index,
 * whose records are generic page records: title / description / headers /
 * url — NOT the DocSearch hierarchy schema, which is why InstantSearch is
 * the right front end here).
 *
 * SSR note: Docusaurus statically renders the navbar on every page, but
 * InstantSearch is a client-only library. The whole widget tree is therefore
 * mounted inside <BrowserOnly>; during SSG we render a static, disabled
 * input shell (SearchFallback) that the live bar hydrates over.
 *
 * The Search API key is a search-only (public) key — safe to ship in the
 * client bundle; that is how every Algolia front end works.
 */
import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  InstantSearch,
  Configure,
  useSearchBox,
  useHits,
  Highlight,
} from 'react-instantsearch';
import {searchClient, ALGOLIA_INDEX_NAME, type PageHit} from '@site/src/lib/algolia';
import styles from './styles.module.css';

function SearchInputShell({
  disabled = false,
  inputProps,
}: {
  disabled?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <input
      type="search"
      className={clsx('navbar__search-input', styles.input)}
      placeholder="Search"
      aria-label="Search"
      disabled={disabled}
      {...inputProps}
    />
  );
}

function SearchDropdown() {
  const {query, refine} = useSearchBox();
  const {items} = useHits<PageHit>();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = open && query.trim().length > 0;

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <SearchInputShell
        inputProps={{
          value: query,
          onChange: (event) => {
            refine(event.currentTarget.value);
            setOpen(true);
          },
          onFocus: () => setOpen(true),
          onKeyDown: (event) => {
            if (event.key === 'Escape') {
              setOpen(false);
              event.currentTarget.blur();
            }
          },
        }}
      />
      {showDropdown && (
        <div className={styles.dropdown}>
          {items.length === 0 ? (
            <div className={styles.empty}>No results for “{query}”</div>
          ) : (
            <ul className={styles.hitList}>
              {items.map((hit) => (
                <li key={hit.objectID}>
                  <a
                    className={styles.hit}
                    href={hit.url}
                    onClick={() => setOpen(false)}>
                    <span className={styles.hitTitle}>
                      <Highlight attribute="title" hit={hit} />
                    </span>
                    {hit.description ? (
                      <span className={styles.hitDesc}>{hit.description}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchBar() {
  return (
    <BrowserOnly
      fallback={
        <div className={styles.searchContainer}>
          <SearchInputShell disabled />
        </div>
      }>
      {() => (
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_INDEX_NAME}
          future={{preserveSharedStateOnUnmount: true}}>
          <Configure hitsPerPage={6} />
          <SearchDropdown />
        </InstantSearch>
      )}
    </BrowserOnly>
  );
}
