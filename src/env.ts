import { Dialect } from "sequelize";

export const PORT = Bun.env.PORT;
export const ACCESS_TOKEN_SECRET = Bun.env.ACCESS_TOKEN_SECRET;
export const DATABASE_DIALECT = Bun.env.DATABASE_DIALECT as Dialect;
export const DATABASE_HOST = Bun.env.DATABASE_HOST;
export const DATABASE_NAME = Bun.env.DATABASE_NAME;
export const DATABASE_PASSWORD = Bun.env.DATABASE_PASSWORD;
export const DATABASE_PORT = Bun.env.DATABASE_PORT;
export const DATABASE_USERNAME = Bun.env.DATABASE_USERNAME;
export const REFRESH_TOKEN_SECRET = Bun.env.REFRESH_TOKEN_SECRET;
export const SECRET_PORT = Bun.env.SECRET_PORT;
export const DATABASE_URL = Bun.env.DATABASE_URL;
