import axios from "axios";
import { createClient } from "redis";
import Log from "../middlewares/Log";
import { Request, Response } from "express";
const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";
let redis_cache = createClient();
(async () => {

    const url = process.env.REDIS_URL;
    redis_cache = createClient({
        url,
        password: process.env.REDIS_PASSWORD,
    });

    redis_cache.on("error", (error) => console.error(`Error : ${error}`));
    try {
        await redis_cache.connect();
        Log.info("Connected to redis");
    }
    catch (err) {

        Log.info("Couldn't create redis instance" + err);
    }

})();

const access_token = process.env.ACCESS_TOKEN;
const user_id = process.env.USER_ID;

async function geturl() {
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

class Hashtag {
    public static async setblacklist(req: Request, res: Response) {
        const blacklist = req.body.blacklist;
        Log.info(blacklist);
        await redis_cache.set("blacklist", JSON.stringify(blacklist));
        res.send("Blacklist updated");
    }

    public static async gethashtag(req: Request, res: Response) {
        try {
            const cached_data = await redis_cache.get("hashtag");
            let list = await redis_cache.get("blacklist");
            Log.info(list);

            const blacklist: string[] = list ? JSON.parse(list) : [];
            if (!cached_data) {
                const urls = await geturl();

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
                await redis_cache.setEx("hashtag", 3600, JSON.stringify(data));
                res.send([...new Set(data)]);

            } else {
                Log.info("Cache hit");
                const data = JSON.parse(cached_data);
                for (let i = 0; i < data.length; i++) {
                    const post = data[i];
                    const id = post["id"];
                    if (blacklist.includes(id)) {
                        data.splice(i, 1);
                    }
                }
                res.send(data);
            }
        }
        catch (err) {
            Log.info(err)
            res.send({
                "Error": "Failed to fetch from instagram api",
                "error": err
            })
        }


    }
}



export default Hashtag;