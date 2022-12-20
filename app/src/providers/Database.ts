//import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import Log from "../middlewares/Log";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_USER)

export class Database {
  public static async init(): Promise<void> {
    // Authenticating and testing for database connection.
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      dialect: 'postgres',
      logging: msg => Log.info(msg)
    });
    try {
      await sequelize.authenticate();
    } catch(err) {
      Log.error("Postgres connection failed: " + err);
      process.exit();
    }
    Log.info("Postgres connection successful");
  }
}

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
         dialect: 'postgres',
         logging: msg => Log.info(msg)
});
