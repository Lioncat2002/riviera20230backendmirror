import { Application } from "express";
import Log from "../middlewares/Log";
import EventRoute from "../routes/events"
import router from "../routes/hashtagsearch";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);
class Routes {
  public mount(_app: Application): Application {
    Log.info('Initializing routes');
    _app.use('/events', EventRoute);
    _app.use('/hashtag', router);
    _app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
    return _app;
  }
}

export default new Routes;