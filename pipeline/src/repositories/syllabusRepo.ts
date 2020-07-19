import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export const publishSyllabus = async (bucketName: string, srcFilePath: string) => {
  const destFileName = srcFilePath.replace('inbox/', 'syllabi/');

  const source = storage.bucket(bucketName).file(srcFilePath);
  const dest = storage.bucket(bucketName).file(destFileName);

  await source.move(dest);
  await dest.makePublic();
};
