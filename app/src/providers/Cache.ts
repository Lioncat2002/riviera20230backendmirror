import Log from "../middlewares/Log";
import * as redis from 'redis';

type RedisClient = ReturnType<typeof redis.createClient>;

export class Redis {
    private static client: RedisClient
    public static async connect(): Promise<void> {
      try {
        this.client = redis.createClient({
          url: process.env.REDIS_URL,
        });
        this.client.on("connect", () => {
          Log.info("Redis :: Connected");
        });
        this.client.on("error", (err: Error) => {
          Log.error(`Redis :: Error: ${String(err.message)}`);
        });
        this.client.on("end", () => {
          Log.info("Redis :: Disconnected");
        });
        await this.client.connect();
        
      } catch (error: unknown) {
        if (error instanceof Error) {
          Log.error(`Redis :: Error: ${error.message}`);
        }
      }
    }
    public static async add(database: number, key: string, value: string): Promise<void> {
      try {
        this.client.select(database);
        this.client.set(key, value);
      } catch (error: unknown) {
        if (error instanceof Error) {
          Log.error(`Redis :: Error: ${error.message}`);
        }
      }
    }
    public static async get(database: number, key: string): Promise<string> {
      try {
        this.client.select(database);
        const data = await this.client.get(key);
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          Log.error(`Redis :: Error: ${error.message}`);
        }
      }
    }
    public static async delete(database: number, key: string): Promise<void> {
      try {
        this.client.select(database);
        this.client.del(key);
      } catch (error: unknown) {
        if (error instanceof Error) {
          Log.error(`Redis :: Error: ${error.message}`);
        }
      }
    }
    public static async isReady(): Promise<boolean> {
      try {
        const ping = await this.client.ping();
        if (ping === "PONG") {
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    }
}
  