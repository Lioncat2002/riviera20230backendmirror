import { Application } from "express";
import Log from "../middlewares/Log";
import Event_v2Route from "../routes/events_v2";
import EventRoute from "../routes/events";
import HashtagRoute from "../routes/hashtagsearch";

class Routes {
  public mount(_app: Application): Application {
    Log.info('Initializing routes');
    _app.use('/events', EventRoute);
    _app.use('/events_v2', Event_v2Route);
    _app.use('/hashtag', HashtagRoute);
    return _app;
  }
}

export default new Routes;