import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';

const client = algoliasearch(functions.config().algolia.id, functions.config().algolia.key);
const index = client.initIndex(functions.config().algolia.index.courses);

export const upsertRecord = async (course: string, title: string, sectionCount: number): Promise<string> => {
  const response = await index.partialUpdateObject(
    { objectID: course, title, course, sectionCount },
    { createIfNotExists: true },
  );
  return response.objectID;
};
