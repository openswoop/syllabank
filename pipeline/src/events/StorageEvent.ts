export type StorageEvent = {
  bucket: string;
  name: string;
  contentType: string;
  metageneration: number;
  timeCreated: Date;
  updated: Date;
};
