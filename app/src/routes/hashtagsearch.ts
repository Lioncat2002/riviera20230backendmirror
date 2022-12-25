import axios from "axios";
import { Router } from "express";

import Log from "../middlewares/Log";

const router = Router();
const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";


var access_token = process.env.ACCESS_TOKEN;
var user_id = process.env.USER_ID;

router.post('/', (req, res) => {
    let hashtag = req.body.hashtag;
    let final_url = BASE_URL + "?user_id=" + user_id + "&q=" + hashtag + "&access_toekn=" + access_token;
    axios.get(final_url).then((response) => {
        Log.info("Response: "+response)
    })
})

export default router;