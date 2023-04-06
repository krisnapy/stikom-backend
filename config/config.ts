import { Dialect, Sequelize } from "sequelize";

require('dotenv').config()

const connection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT as Dialect,
    port: process.env.DATABASE_PORT as unknown as number,
  }
);

export default connection;
