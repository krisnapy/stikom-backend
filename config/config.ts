import { Dialect, Sequelize } from "sequelize";

import {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_URL,
  DATABASE_USERNAME,
} from "../env";

const connection = DATABASE_URL
  ? new Sequelize(DATABASE_URL)
  : new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
      host: DATABASE_HOST,
      dialect: DATABASE_DIALECT as Dialect,
      port: DATABASE_PORT as unknown as number,
    });

export default connection;
