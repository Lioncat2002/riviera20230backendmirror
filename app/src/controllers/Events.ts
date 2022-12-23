import { Request, Response } from "express";
import Log from "../middlewares/Log";
import { EventsModel } from "../models/event.model";
import sha256 from "sha256";
class Events {
  public static async events_list(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      return res.status(200).json(await EventsModel.findAll());
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
      return res.status(200).json(await EventsModel.findAll({ where: req.body }))  
  }

}

export default Events;