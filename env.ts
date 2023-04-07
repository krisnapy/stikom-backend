import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const DATABASE_DIALECT = process.env.DATABASE_DIALECT;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const SECRET_PORT = process.env.SECRET_PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
