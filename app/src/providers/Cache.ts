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

    await redis_cache.connect();
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


async function gethashtag(req: Request, res: Response) {
    const cached_data = await redis_cache.get("hashtag");
    if (!cached_data) {
        const urls = await geturl();
        const data: string[] = [];
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];

            const res_data = await axios.get(url, {
                headers: { "Accept-Encoding": "gzip,deflate,compress" }
            }).then(async (response) => {
                return response.data;
            });
            data.push(...res_data.data);
        }
        await redis_cache.setEx("hashtag", 3600, JSON.stringify(data));
        res.send([...new Set(data)]);

    } else {
        Log.info("Cache hit");
        res.send(JSON.parse(cached_data));
    }
}

export default gethashtag;