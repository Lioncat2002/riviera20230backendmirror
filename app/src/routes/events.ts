import { Router } from "express";
import Events from "../controllers/Events";
import Joi from "joi";
import Validate from "../middlewares/Validate";

const router = Router();

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
router.put('/:key', Validate.body(Events.schema.event), Events.event_import);
router.patch("/:key", Events.event_update);
router.patch("/loc/:key", Events.event_update_loc);

/**
 * @openapi
 * /events/search:
 *   post:
 *     description: Used for searching events
 *     responses:
 *       200:
 *         description: returns the list of events that match the search query
 */
router.post('/search', Validate.body(Events.schema.events_search), Events.events_search);
router.get('/search', Validate.query(Events.schema.events_search), Events.events_search);


export default router;
