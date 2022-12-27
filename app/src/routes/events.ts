import { Router } from "express";
import Events from "../controllers/Events"
import Joi from "joi";
import Validate from "../middlewares/Validate";

const router = Router();

const schema = {
    event: Joi.object({
        name: Joi.string().required(),
        organizing_body: Joi.string().required(),
        image_url: Joi.string().allow(""),
        start: Joi.date().required(),
        end: Joi.date().required(),
        loc: Joi.string().allow(""),
        event_type: Joi.string().valid("proshow", "cultural", "sports", "other").required(),
        featured: Joi.boolean().required()
    }),
    events_search: Joi.object({
        _id: Joi.string(),
        name: Joi.string(),
        organizing_body: Joi.string(),
        start: Joi.date(),
        end: Joi.date(),
        loc: Joi.string(),
        event_type: Joi.string().valid("proshow", "cultural", "sports", "other"),
        featured: Joi.boolean()
    })
};
/**
 * @openapi
 * /events:
 *   get:
 *     description: Returns a list of all the events
 *     responses:
 *       200:
 *         description: A List containing all upcoming events
 */
router.get('/', Events.events_list);
/**
 * @openapi
 * /events/:key:
 *   put:
 *     description: Creates a new event (needs an API key)
 *     responses:
 *       201:
 *         description: Returns the newly created event
 */
router.put('/:key', Validate.body(schema.event), Events.event_import);

/**
 * @openapi
 * /events/search:
 *   post:
 *     description: Used for searching events
 *     responses:
 *       200:
 *         description: returns the list of events that match the search query
 */
router.post('/search', Validate.body(schema.events_search), Events.events_search);
router.get('/search', Validate.query(schema.events_search), Events.events_search);



export default router;