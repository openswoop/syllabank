import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
);

export { searchClient };
