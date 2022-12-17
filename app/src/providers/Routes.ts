import { Application } from "express";
import Log from "../middlewares/Log";
import EventRoute from "../routes/events"
import os from "os";

class Routes {
  public mount(_app: Application): Application {
    Log.info('Initializing routes');
    _app.use('/events', EventRoute);
    return _app;
  }
}

export default new Routes;