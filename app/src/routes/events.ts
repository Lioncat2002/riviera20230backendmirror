import { Router } from "express";
import Events from "../controllers/Events"
import Joi from "joi";
import Validate from "../middlewares/Validate";

const router = Router();

const schema = {
    event: Joi.object({
        name: Joi.string().required(),
        organizing_body: Joi.string().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
        loc: Joi.string().allow(""),
        event_type: Joi.string().valid("proshow", "cultural", "sports", "other").required(),
        featured: Joi.boolean().required()
    }),
    events_search: Joi.object({
        start: Joi.date(),
        end: Joi.date(),
        loc: Joi.string(),
        event_type: Joi.string().valid("proshow", "cultural", "sports", "other"),
        featured: Joi.boolean()
    })
};
/**
 * @openapi
 * /:
 *   get:
 *     description: Returns a list of all the events
 *     responses:
 *       200:
 *         description: A List containing all upcoming events
 */
router.get('/', Events.events_list);
router.post('/', Validate.body(schema.event), Events.event_import);
router.post('/search', Validate.body(schema.events_search), Events.events_search);


export default router;
