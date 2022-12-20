import Express from "./Express";
import { Database } from "./Database";
import Log from "../middlewares/Log";
import dotenv from "dotenv";

dotenv.config();

class App {
  public loadServer(): void {
    Log.info('Server :: Loading...');
    Express.init();
  }
  public async loadDatabase(): Promise<void> {
    Log.info('Database :: Loading...');
    await Database.init();
  }
}

export default new App;