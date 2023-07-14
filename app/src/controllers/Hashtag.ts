import axios from "axios";
import { Redis } from "../providers/Cache";
import Log from "../middlewares/Log";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://graph.facebook.com/ig_hashtag_search";
const access_token = process.env.ACCESS_TOKEN;
const user_id = process.env.USER_ID;

const dummydata=[
    {
        "permalink": "https://www.instagram.com/p/CrV0H-oh8r4/",
        "caption": "In a Cheerful 😁Conversation with armaanmalik kunal_khubani \n\n#armaanmalik #music #concert #bollywood #chennai #celebrity #celebrityevents #vellore #velloreinstituteoftechnology #vit #riviera2023",
        "comments_count": 1,
        "like_count": 49,
        "media_type": "CAROUSEL_ALBUM",
        "children": {
        "data": [
        {
        "media_url": "https://imgur.com/a/qnqFTSo",
        "id": "17895034022751989"
        },
        {
        "media_url": "https://imgur.com/a/qnqFTSo",
        "id": "17990226256822897"
        }
        ]
        },
        "id": "18049079698420425"
    },
    {
        "permalink": "https://www.instagram.com/p/CoueHBoJZc1/",
        "caption": "We are super excited to welcome the multi-talented actress, singer & dancer Andrea Jeremiah to #Riviera2023\n\nBe it the cult \"O O Antava/Solriya\" to some gripping numbers in English/Hindi/Tamil, there is going to be something for everyone\n\nFor tickets, visit www.riviera.vit.ac.in or download Riviera2023 app from Play store/App store\n\ntherealandreajeremiah \n\nrivieravituniversity \n\n#VIT #Riviera #ReviveTheEra #StudentsWelfare #andreajeremiah #indiemusic #therivieraphenomenon",
        "comments_count": 14,
        "like_count": 7988,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/a/VfhJ9V3",
        "id": "17997791647637542"
    },
    {
        "permalink": "https://www.instagram.com/p/CoryuIuPmNh/",
        "caption": "We welcome Thaikkudam Bridge - the most sought after multi-genre music band as a part of #Riviera2023\n\nFor tickets, visit www.riviera.vit.ac.in or download the Riviera2023 app from the Play store/App store\n\n#VIT #Riviera #ReviveTheEra #StudentsWelfare #bethebridge #Thaikkudam #indiemusic #therivieraphenomenon\n\nrivieravituniversity \nthaikkudambridge",
        "comments_count": 6,
        "like_count": 3757,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/a/4DQnjij",
        "id": "17952039542313901"
        },
        {
        "permalink": "https://www.instagram.com/p/Co-tT8Hr6CQ/",
        "caption": "The day we've all been looking forward to has finally arrived.\nRiviera 2023! Don't miss out on the events of Day 1.\n\n#VIT #Riviera #ReviveTheEra #Riviera2023 #2k23 #VITFest #LiveVellore #VITVellore",
        "comments_count": 3,
        "like_count": 4665,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/a/PHbkx1e",
        "id": "18005133811594249"
        },
        {
        "permalink": "https://www.instagram.com/p/Cuqn50wAfEM/",
        "caption": "Con ellas… 💖\n#riviera2023\nlarh_tatue cbblanch",
        "comments_count": 0,
        "like_count": 2,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/9ZAxzrc",
        "id": "17908774619715309"
        },
        {
        "permalink": "https://www.instagram.com/p/CuNLPa_LXGm/",
        "caption": "🌞 Amie amie, 30 ans déjà \n\n🥿Quel bonheur de se retrouver chaque fois comme si c'était hier\n\n#amitié #amieamie #nice #riviera2023 #riviera #cotedazur",
        "comments_count": 1,
        "like_count": 9,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/a/vSkuTsB",
        "id": "18197501371249369"
        },
        {
        "permalink": "https://www.instagram.com/p/Ctmlc1uN05J/",
        "caption": "#riviera2023 #familytime ❤️",
        "comments_count": 0,
        "like_count": 43,
        "media_type": "IMAGE",
        "media_url": "https://scontent.cdninstagram.com/v/t51.29350-15/354201474_776859657450069_2054225319617726606_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=hZT5b_eoOvsAX9EzaCS&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AfC90DWU_Y_hiIQf-nbbE_dT990fUArMXnV0qR8EtoPnLg&oe=64B64E46",
        "id": "17880559961877666"
        },
        {
        "permalink": "https://www.instagram.com/p/CpBms8ArFhK/",
        "caption": "Wondering which events to attend amidst the Riviera tides?? Here is a list of the premium and Day 2 highlights that you should not miss!\n\nrivieravituniversity \n\n#VIT #Riviera #ReviveTheEra #Riviera2023 #2k23 #VITFest #LiveVellore #VITVellore",
        "comments_count": 0,
        "like_count": 3482,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/a/Fpq58lS",
        "id": "17928444890543533"
        },
        {
        "permalink": "https://www.instagram.com/p/CozYZPhMTnw/",
        "caption": "A versatile musician & singer with a unique style of singing, Javed Ali needs no introduction to Indian and international audiences, having delivered several memorable hits including Ishaqzaade, Kajra Re, Arziyan and the most recent hit Srivalli from the movie Pushpa\n\nrivieravituniversity is super excited to welcome javedali4u on board as a part of the star studded line up\n\n#VIT #Riviera #Riviera2023 #ReviveTheEra #JavedAli #Concert #PROShow",
        "comments_count": 3,
        "like_count": 4091,
        "media_type": "IMAGE",
        "media_url": "https://imgur.com/a/msbAOlo",
        "id": "17991105862751368"
        },

]

//https://graph.facebook.com/ig_hashtag_search/?user_id=17841457007010891&q=riviera2023&access_token=
//https://graph.facebook.com/17903011144065412/recent_media?user_id=17841457007010891&fields=permalink,caption,comments_count,like_count,media_type,thumbnail_url,media_url,children{media_url}&access_token=
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
                    "&fields=permalink,caption,comments_count,like_count,media_type,media_url,children{media_url}&access_token=" +
                    access_token;
                return url;
            });
            urls.push(url);
        }
        return urls;
    }

    public static async setblacklist(req: Request, res: Response) {
        const { blacklist } = req.body;
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
        //return res.send(dummydata)
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
                var whitelisted = [];
                for (let i = 0; i < data.length; i++) {

                    if (!blacklist.includes(data[i].id)) {
                        if(data[i].media_type==="IMAGE")
                            whitelisted.push(data[i]);
                        else if (data[i].media_type === "CAROUSEL_ALBUM")
                        {
                            data[i].media_url = data[i].children.data[0].media_url;
                            whitelisted.push(data[i]);
                        }
                        else if(data[i].media_type==="VIDEO")
                        {
                            data[i].media_url = data[i].thumbnail_url;
                            whitelisted.push(data[i]);
                        }
                    }
                }
                await Redis.addEx(0, "hashtag", JSON.stringify(whitelisted), 900);
                return res.send([...new Set(whitelisted)]);
            }

            Log.info("Cache hit");

            const data = JSON.parse(cachedData);
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
