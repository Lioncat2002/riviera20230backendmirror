import dotenv from "dotenv";
import express from "express";
import http from "http";
import Kernel from "../middlewares/Kernel";
import Log from "../middlewares/Log";
import Routes from "./Routes";

dotenv.config();
class Express {
  public express: express.Application;
  private server: http.Server;
  constructor() {
    this.express = express();
    this.createServer();
    this.mountMiddlewares();
    this.mountRoutes();
  }
  public init(): any {
    const port = process.env.PORT || 3000;
    this.server.listen(port, () => {
      Log.info(`Server :: Running on port ${port}`);
    });
    
  };

  private mountRoutes(): void {
    this.express = Routes.mount(this.express);
  }

  private mountMiddlewares(): void {
    this.express = Kernel.init(this.express);
  }

  private createServer(): void {
    this.server = http.createServer(this.express);
  }

}

export default new Express();