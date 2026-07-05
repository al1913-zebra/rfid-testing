/**
 * Shared Algolia (InstantSearch) configuration.
 *
 * Single source of truth for the app/index used by both search surfaces:
 *   - the navbar autocomplete  (src/theme/SearchBar)
 *   - the full results page    (src/pages/search.tsx), which the 404 page's
 *     search form posts to.
 *
 * The Search API key is a search-only (public) key — safe to embed in the
 * client bundle, like every Algolia front end.
 */
import {liteClient as algoliasearch} from 'algoliasearch/lite';

export const ALGOLIA_APP_ID = 'O6F3YOCQVE';
export const ALGOLIA_SEARCH_API_KEY = '24384600866aa15e9a37ef6427beccff';
export const ALGOLIA_INDEX_NAME = 'al1913_zebra_github_io_o6f3yocqve_pages';

export const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

/** Shape of a record in the crawler's `…_pages` index. */
export type PageHit = {
  objectID: string;
  url: string;
  title: string;
  description?: string;
  headers?: string[];
};
