import { Request, Response } from "express";
import Log from "../middlewares/Log";
import EventsModel from "../models/event.model";
import sha256 from "sha256";


/**
  @class Events
  This class is used to handle all the events related requests
*/
class Events {
  public static async listEvents(req: Request, res: Response) {
    try {
      const events = await EventsModel.find();
      return res.status(200).json(events);
    }
    catch (err) {
      Log.error(err);
      return res.status(500).json({
        success: false,
        message: "Error in getting Events",
      })
    }
  }

  // ! Make it another class, and use it in the events controller if needed
  // ! To separate the public and private routes`
  public static async event_import(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      Log.info("SYSTEM API KEY =>" + process.env.API_KEY);
      Log.info("SHA256 HASHED API KEY =>" + sha256(process.env.API_KEY));
      Log.info("SENT API KEY =>" + req.params.key);
      Log.info("SHA256 HASHED SENT API KEY =>" + sha256(req.params.key));
      
      // Check if the API key is valid
      if (sha256(req.params.key) === process.env.API_KEY) {
        Log.info(req.body.description);
        return res.status(200).json(await EventsModel.create(req.body));
      }
      return res.status(401).json({ error: "Invalid key" });
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

      // Check if the API key is valid
      if (sha256(req.params.key) !== process.env.API_KEY) {
        Log.info(JSON.stringify(req.body.start));
        return res.status(200).json(await EventsModel.findOneAndUpdate({ name: { '$regex': req.body.name } }, { image_url: req.body.image_url }));
      }

      return res.status(401).json({ error: "Invalid key" });
    }
    catch (err) {
      Log.error("Error occurred on PATCH /events => " + err);
    }
  }

  public static async event_update_loc(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      Log.info("SYSTEM API KEY =>" + process.env.API_KEY);
      Log.info("SHA256 HASHED API KEY =>" + sha256(process.env.API_KEY));
      Log.info("SENT API KEY =>" + req.params.key);
      Log.info("SHA256 HASHED SENT API KEY =>" + sha256(req.params.key));
      
      // Check if the API key is valid
      if (sha256(req.params.key) === process.env.API_KEY) {
        Log.info(JSON.stringify(req.body.start));
        return res.status(200).json(await EventsModel.findOneAndUpdate({ name: { '$regex': req.body.name } }, { start: req.body.start, end: req.body.end, loc: req.body.loc }));
      }

      return res.status(401).json({ error: "Invalid key" });
    }
    catch (err) {
      Log.error(err);
      return res.status(500).json({
        success: false,
        message: "Error in Updating",
      })
    }
  }

  public static async events_search(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      // const events = await EventsModel.find({ name: { '$regex': req.params.name } });
      const events = await EventsModel.find(req.query);
    } catch (err) {
      Log.error(err);
      return res.status(500).json({
        success: false,
        message: "Error in getting Events",
      })
    }
  }
}

export default Events;