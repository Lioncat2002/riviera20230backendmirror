import { Router } from "express";
import Hashtag from "../controllers/Hashtag";

const router = Router();

router.get('/', Hashtag.gethashtag);
router.post('/blacklist', Hashtag.setblacklist);

export default router;