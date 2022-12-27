import axios from "axios";
import { Router } from "express";
import { createClient } from "redis";


import Log from "../middlewares/Log";

const router = Router();
const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";
let redis_cache = createClient();
(async () => {
    redis_cache = createClient();

    redis_cache.on("error", (error) => console.error(`Error : ${error}`));

    await redis_cache.connect();
})();

var access_token = process.env.ACCESS_TOKEN;
var user_id = process.env.USER_ID;

async function geturl() {
    let hashtag = "coke";//req.body.hashtag;
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
    return url;
}

router.get('/', async (req, res) => {
    let cached_data = await redis_cache.get("hashtag");
    if (!cached_data) {
        let url = await geturl();
        axios.get(url, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        }).then(async (response) => {
            await redis_cache.setEx("hashtag", 3600, JSON.stringify(response.data));
            res.send(response.data);
        });
    } else {
        Log.info("Cache hit");
        res.send(JSON.parse(cached_data));
    }

});

export default router;