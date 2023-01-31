import { createClient, RedisClientType } from "redis";
import Log from "../middlewares/Log";
const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";


export class Redis {

    public static async redis_connect() {
        let redis_cache: RedisClientType;
        const url = process.env.REDIS_URL;
        redis_cache = createClient({
            url,
            password: process.env.REDIS_PASSWORD,
        });
        try {
            await redis_cache.connect();
            Log.info("Connected to Redis");
        } catch (error) {
            Log.error("Redis error: " + error);
        }


        redis_cache.on("error", (err) => {
            Log.error("Redis error: " + err);
        });
        redis_cache.on("connect", () => {
            Log.info("Connected to Redis");
        });
        redis_cache.on("ready", () => {
            Log.info("Redis is ready");
        });
        redis_cache.on("end", () => {
            Log.info("Disconnected from Redis");
        });

        return redis_cache;
    }
}