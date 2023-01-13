import { Router } from "express";
import gethashtag from "../providers/Cache";

const router = Router();

router.get('/', gethashtag);

export default router;