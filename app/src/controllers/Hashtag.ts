import axios from "axios";
import { Redis } from "../providers/Cache";
import Log from "../middlewares/Log";
import { Request, Response } from "express";
import { RedisClientType } from "redis";

const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";
const access_token = process.env.ACCESS_TOKEN;
const user_id = process.env.USER_ID;

class Hashtag {
    private static async geturl() {
        const hashtags = ["riviera2023", "riviera23", "rivera2023", "rivera23"];
        const urls = [];
        for (let i = 0; i < hashtags.length; i++) {
            const hashtag = hashtags[i]
            const final_url = BASE_URL + "?user_id=" + user_id + "&q=" + hashtag + "&access_token=" + access_token;

            const url = await axios.get(final_url).then(async (response) => {
                const hashtagId = response.data.data[0].id;
                const url =
                    "https://graph.facebook.com/" +
                    hashtagId +
                    "/top_media?user_id=" +
                    user_id +
                    "&fields=permalink,caption,comments_count,like_count,media_type,media_url&access_token=" +
                    access_token;
                return url;
            });
            urls.push(url);
        }
        return urls;
    }
    public static async setblacklist(req: Request, res: Response) {
      const {blacklist} = req.body;
      try {
        // check if redis is connected
        if (!Redis.isReady) {
            Log.error("Redis not connected");
            return res.status(500).json({
                success: false,
                message: "Redis not connected",
            });
        }

        Log.info(blacklist);
        
        // set blacklist in redis
        await Redis.add(0, "blacklist", JSON.stringify(blacklist));
        
        //  return success
        return res.status(200).send("Blacklist updated");
      } catch (err) {
        Log.error(err);
        return res.status(500).json({
            success: false,
            message: "Error in Updating",
        });
      }

    }
    public static async gethashtag(req: Request, res: Response) {
        if (!Redis.isReady()) {
            Log.error("Redis not connected");
            return res.status(200).send({
                "Error": "Redis not connected"
            })
        }
        try {
            const cachedData = await Redis.get(0, "hashtag");
            const list = await Redis.get(0, "blacklist");
            
            Log.info("List: " + list);

            const blacklist: string[] = list ? JSON.parse(list) : [];
            if (!cachedData) {
                const urls = await Hashtag.geturl();

                const data = [];
                for (let i = 0; i < urls.length; i++) {
                    const url = urls[i];

                    const res_data = await axios.get(url, {
                        headers: { "Accept-Encoding": "gzip,deflate,compress" }
                    }).then(async (response) => {
                        return response.data;
                    });

                    data.push(...res_data.data);
                }
                for (let i = 0; i < data.length; i++) {

                    const id = data[i].id;
                    //const id = post["id"];
                    if (blacklist.includes(id)) {
                        data.splice(i, 1);
                    }
                }
                await Redis.add(0, "hashtag", JSON.stringify(data));
                return res.send([...new Set(data)]);

            } 

            Log.info("Cache hit");

            const data = JSON.parse(cachedData);

            // remove blacklisted posts
            for (let i = 0; i < data.length; i++) {
                const post = data[i];
                const id = post["id"];
                if (blacklist.includes(id)) {
                    data.splice(i, 1);
                }
            }
            return res.send(data);
        }
        catch (err) {
            Log.error(err)
            return res.send({
                "Error": "Failed to fetch from instagram api",
                "error": err
            })
        }
    }
}



export default Hashtag;
