export type Function<E> = (event: E, context: Context, callback: Callback) => Promise<void>;

export type Context = {
  eventId: string;
  eventType: string;
  timestamp: string;
  resource: object;
};

export type Callback = (error?: any) => void;
