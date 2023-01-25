import { Request, Response } from "express";
import Log from "../middlewares/Log";
import EventsModel from "../models/event.model";
import sha256 from "sha256";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();


class Events {
  static schema = {
    event: Joi.object({
      name: Joi.string().required(),
      organizing_body: Joi.string().required(),
      image_url: Joi.string().allow(""),
      start: Joi.date().required(),
      end: Joi.date().required(),
      loc: Joi.string().allow(""),
      description: Joi.string().required(),
      instructions: Joi.string().required(),
      event_type: Joi.string().valid("Informal", "Quiz Words Worth", "Cyber Engage", "Pre Riviera", "Premium", "Art Drama", "Workshop", "Music", "Dance", "Adventure Sports", "none", "Proshow", "Sports").required(),
      total_cost: Joi.string().required(),
      seats: Joi.string().required(),
      teams: Joi.string().allow(""),
      team_max_members: Joi.string().allow(""),
      is_team_event: Joi.boolean().required(),
      featured: Joi.boolean().required()
    }),
    events_search: Joi.object({
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
  public static async events_list(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      const events = await EventsModel.find();
      return res.status(200).json(events);
    }
    catch (err) {
      Log.error("Error occurred on GET /events => " + err);
    }
  }

  public static async event_import(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      Log.info("SYSTEM API KEY =>" + process.env.API_KEY);
      Log.info("SHA256 HASHED API KEY =>" + sha256(process.env.API_KEY));
      Log.info("SENT API KEY =>" + req.params.key);
      Log.info("SHA256 HASHED SENT API KEY =>" + sha256(req.params.key));
      if (sha256(req.params.key) === process.env.API_KEY) {
        Log.info(req.body.description);
        return res.status(200).json(await EventsModel.create(req.body));
      }
      else {
        return res.status(401).json({ error: "Invalid key" });
      }
    }
    catch (err) {
      Log.error("Error occurred on PUT /events => " + err);
    }
  }

  public static async event_update(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      Log.info("SYSTEM API KEY =>" + process.env.API_KEY);
      Log.info("SHA256 HASHED API KEY =>" + sha256(process.env.API_KEY));
      Log.info("SENT API KEY =>" + req.params.key);
      Log.info("SHA256 HASHED SENT API KEY =>" + sha256(req.params.key));
      if (sha256(req.params.key) === process.env.API_KEY) {
        Log.info(JSON.stringify(req.body.start));
        return res.status(200).json(await EventsModel.findOneAndUpdate({ name: { '$regex': req.body.name } }, { start: req.body.start, end: req.body.end, loc: req.body.loc }));
      }
      else {
        return res.status(401).json({ error: "Invalid key" });
      }
    }
    catch (err) {
      Log.error("Error occurred on PATCH /events => " + err);
    }
  }

  public static async events_search(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    return res.status(200).json(await EventsModel.find(req.query));
  }

}

export default Events;