import { Router } from "express";
import Joi from "joi";
import Validate from "../middlewares/Validate";
import Events from "../controllers/Events";
const router = Router();


const schema =  {
    event: Joi.object({
      name: Joi.string().required(),
      organizing_body: Joi.string().required(),
      image_url: Joi.string().default("https://picsum.photos/200"),
      start: Joi.date(),
      end: Joi.date().required(),
      loc: Joi.string().default("TBD"),
      description: Joi.string().required(),
      instructions: Joi.string().required(),
      event_type: Joi.string().valid("Informal", "Quiz Words Worth", "Cyber Engage", "Pre Riviera", "Premium", "Art Drama", "Workshop", "Music", "Dance", "Adventure Sports", "none", "Proshow", "Sports").required(),
      total_cost: Joi.string().required(),
      seats: Joi.string().required().allow(""),
      teams: Joi.string().allow(""),
      team_max_members: Joi.string().allow(""),
      is_team_event: Joi.boolean().required(),
      featured: Joi.boolean().required()
    }),
    eventSearch: Joi.object({
      _id: Joi.string(),
      name: Joi.string(),
      organizing_body: Joi.string(),
      start: Joi.date(),
      end: Joi.date(),
      loc: Joi.string(),
      description: Joi.string().allow(""),
      instructions: Joi.string().allow(""),
      event_type: Joi.string().valid("Informal", "Quiz Words Worth", "Cyber Engage", "Pre Riviera", "Premium", "Art Drama", "Workshop", "Music", "Dance", "Adventure Sports", "none", "Proshow", "Sports"),
      total_cost: Joi.string(),
      seats: Joi.string(),
      teams: Joi.string().allow(""),
      team_max_members: Joi.string(),
      is_team_event: Joi.boolean(),
      featured: Joi.boolean()
    })
  };


router.get('/', Events.listEvents);
router.get('/search', Validate.query(schema.eventSearch), Events.events_search);
router.post('/search', Validate.body(schema.eventSearch), Events.events_search);

// 
router.put('/:key', Validate.body(schema.event), Events.event_import);
router.patch("/:key", Events.event_update);
router.patch("/loc/:key", Events.event_update_loc);


export default router;
