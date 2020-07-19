export type BackgroundFunction<E> = (event: E, context: Context, callback: Callback) => Promise<void>;

export type Context = {
  eventId: string;
  eventType: string;
  timestamp: string;
  resource: object;
};

export type Callback = (error?: any) => void;

export type StorageEvent = {
  bucket: string;
  name: string;
  contentType: string;
  metageneration: number;
  timeCreated: Date;
  updated: Date;
};
