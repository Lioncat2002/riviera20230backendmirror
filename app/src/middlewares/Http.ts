import type { Application } from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import bodyParser from "body-parser";
import Log from "./Log";
import expressValidator from "express-validator";
class Http {
  public static init(_app: Application): Application {
    Log.info("Initializing HTTP middleware");
    _app.use(expressValidator());


    _app.use(hpp());
    _app.use(helmet());
    _app.use(bodyParser.urlencoded({ extended: false }));
    _app.use(bodyParser.json());
    _app.use(compression());

    return _app;
  }
}

export default Http;