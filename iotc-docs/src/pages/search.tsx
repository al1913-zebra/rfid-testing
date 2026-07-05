/**
 * Full search results page (/search), powered by Algolia InstantSearch.
 *
 * This is the target the 404 page's "Search the documentation" form posts
 * to (GET /search?q=…). It reads the `q` query param, seeds InstantSearch
 * with it, and renders a paginated result list over the `…_pages` index.
 * The navbar autocomplete (src/theme/SearchBar) shares the same client/index.
 *
 * InstantSearch is client-only, so the whole widget tree mounts inside
 * <BrowserOnly>; the page shell is server-rendered.
 */
import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  InstantSearch,
  Configure,
  useSearchBox,
  useHits,
  usePagination,
  Highlight,
} from 'react-instantsearch';
import {searchClient, ALGOLIA_INDEX_NAME, type PageHit} from '@site/src/lib/algolia';
import styles from './search.module.css';

function getInitialQuery(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return new URLSearchParams(window.location.search).get('q') ?? '';
}

function SearchExperience() {
  const {query, refine} = useSearchBox();
  const {items} = useHits<PageHit>();
  const {currentRefinement, nbPages, refine: refinePage, isFirstPage, isLastPage} =
    usePagination();

  const hasQuery = query.trim().length > 0;

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search the documentation"
        aria-label="Search the documentation"
        value={query}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={(event) => refinePageReset(event.currentTarget.value, refine, refinePage)}
      />

      {!hasQuery ? (
        <p className={styles.hint}>Type above to search across the documentation.</p>
      ) : items.length === 0 ? (
        <p className={styles.hint}>No results for “{query}”.</p>
      ) : (
        <>
          <ul className={styles.hitList}>
            {items.map((hit) => (
              <li key={hit.objectID} className={styles.hitItem}>
                <a href={hit.url} className={styles.hitTitle}>
                  <Highlight attribute="title" hit={hit} />
                </a>
                {hit.description ? (
                  <p className={styles.hitDesc}>{hit.description}</p>
                ) : null}
                <span className={styles.hitUrl}>{hit.url}</span>
              </li>
            ))}
          </ul>

          {nbPages > 1 ? (
            <nav className={styles.pagination} aria-label="Search results pages">
              <button
                type="button"
                className={styles.pageButton}
                disabled={isFirstPage}
                onClick={() => refinePage(currentRefinement - 1)}>
                ← Previous
              </button>
              <span className={styles.pageStatus}>
                Page {currentRefinement + 1} of {nbPages}
              </span>
              <button
                type="button"
                className={styles.pageButton}
                disabled={isLastPage}
                onClick={() => refinePage(currentRefinement + 1)}>
                Next →
              </button>
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}

// Reset to the first page whenever the query changes, so a new search never
// lands the reader on an out-of-range page from the previous query.
function refinePageReset(
  value: string,
  refineQuery: (value: string) => void,
  refinePage: (page: number) => void,
) {
  refineQuery(value);
  refinePage(0);
}

export default function SearchPage(): React.JSX.Element {
  return (
    <Layout
      title="Search"
      description="Search the Zebra IoT Connector for Handheld RFID documentation.">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="container margin-vert--lg">
        <h1>Search the documentation</h1>
        <BrowserOnly fallback={<p className={styles.hint}>Loading search…</p>}>
          {() => (
            <InstantSearch
              searchClient={searchClient}
              indexName={ALGOLIA_INDEX_NAME}
              initialUiState={{[ALGOLIA_INDEX_NAME]: {query: getInitialQuery()}}}
              future={{preserveSharedStateOnUnmount: true}}>
              <Configure hitsPerPage={10} />
              <SearchExperience />
            </InstantSearch>
          )}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
