import Express from "./Express";
import { Database } from "./Database";
import { Redis } from "./Cache"
import { Firebase } from "./Firebase";
import Log from "../middlewares/Log";
import dotenv from "dotenv";

dotenv.config();

class App {
  public loadServer(): void {
    Log.info('Server :: Loading...');
    Express.init();
  }
  public loadDatabase(): void {
    Log.info('Database :: Loading...');
    Database.init();
  }
  public loadRedis(): void {
    Log.info('Redis :: Loading...');
    Redis.connect();
  }
  public loadFirebase(): void {
    Log.info('Firebase :: Loading...');
    Firebase.init();
  }

}

export default new App;