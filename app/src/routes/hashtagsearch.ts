import axios from "axios";
import { Router } from "express";
import { createClient } from "redis";


import Log from "../middlewares/Log";

const router = Router();
const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";
let redis_cache = createClient();
(async () => {
    const url = process.env.REDIS_URL;
    redis_cache = createClient({
        url,
        password: process.env.REDIS_PASSWORD,
    });;

    redis_cache.on("error", (error) => console.error(`Error : ${error}`));

    await redis_cache.connect();
})();

var access_token = process.env.ACCESS_TOKEN;
var user_id = process.env.USER_ID;

async function geturl() {
    let hashtags = ["riviera2023", "riviera23", "rivera2023", "rivera23"];
    let urls = []
    for (var hashtag in hashtags) {
        let final_url = BASE_URL + "?user_id=" + user_id + "&q=" + hashtag + "&access_token=" + access_token;

        let url = await axios.get(final_url).then(async (response) => {
            let hashtagId = response.data.data[0].id;
            let url =
                "https://graph.facebook.com/" +
                hashtagId +
                "/recent_media?user_id=" +
                user_id +
                "&fields=permalink,caption,comments_count,like_count,media_type,media_url&access_token=" +
                access_token;
            return url
        });
        urls.push(url)
    }
    return urls;
}

router.get('/', async (req, res) => {
    let cached_data = await redis_cache.get("hashtag");
    if (!cached_data) {
        let urls = await geturl();
        let data: string[] = []
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];

            let res_data = await axios.get(url, {
                headers: { "Accept-Encoding": "gzip,deflate,compress" }
            }).then(async (response) => {
                return response.data;
            });
            data.push(res_data);
        }
        await redis_cache.setEx("hashtag", 3600, JSON.stringify(data));
        res.send(data);

    } else {
        Log.info("Cache hit");
        res.send(JSON.parse(cached_data));
    }

});

export default router;