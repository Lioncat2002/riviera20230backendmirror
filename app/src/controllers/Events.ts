import { Request, Response } from "express";
import Log from "../middlewares/Log";
import EventsModel from "../models/event.model";
import sha256 from "sha256";
import dotenv from "dotenv";

dotenv.config();


class Events {
  public static async events_list(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      const events = await EventsModel.find();
      return res.status(200).json(events);
    }
    catch(err) {
      Log.error("Error occurred on GET /events => " + err);
    }
  }
  
  public static async event_import(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      Log.info("SYSTEM API KEY =>"+process.env.API_KEY);
      Log.info("SHA256 HASHED API KEY =>"+sha256(process.env.API_KEY));
      Log.info("SENT API KEY =>"+req.params.key);
      Log.info("SHA256 HASHED SENT API KEY =>"+sha256(req.params.key));
      if (sha256(req.params.key) === process.env.API_KEY) {
        return res.status(200).json(await EventsModel.create(req.body));
      }
      else {
        return res.status(401).json({ error: "Invalid key" });
      }
    }
    catch(err) {
      Log.error("Error occurred on POST /events => " + err);
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