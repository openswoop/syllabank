import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_COURSES);

export const upsertRecord = async (course: string, title: string): Promise<string> => {
  const response = await index.partialUpdateObject(
    { objectID: course, title },
    { createIfNotExists: true },
  );
  return response.objectID;
};
