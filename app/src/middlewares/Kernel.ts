import type { Application } from "express";
import CORS from "./Cors";
import Http from "./Http";
import morgan, { StreamOptions } from "morgan";
import Log from "./Log";

class Kernel {
  public static init(_app: Application): Application {
    _app = CORS.init(_app);
    _app = Http.init(_app);
    const StreamOptions: StreamOptions = {
      write: (message) => {
        Log.info(`HTTP: ${message}`);
      },
    };
    _app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: StreamOptions }));
    return _app;
  }
}
export default Kernel;