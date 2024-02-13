import { Dialect, Options } from "sequelize";

const config: Options = {
  dialect: process.env.DATABASE_DIALECT as Dialect,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  logging: false,
};

module.exports = config;
