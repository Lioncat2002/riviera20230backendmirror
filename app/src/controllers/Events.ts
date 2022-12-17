import { Request, Response } from "express";
import Log from "../middlewares/Log";
import { EventsModel } from "../models/event.model";

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
      return res.status(200).json(await EventsModel.create(req.body));
    }
    catch(err) {
      Log.error("Error occurred on POST /events => " + err);
    }
  }
  
  public static async events_search(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    return res.status(200).send("Testing");
  }

}

export default Events;