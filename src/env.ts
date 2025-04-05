export const PORT = Bun.env.PORT;
export const ACCESS_TOKEN_SECRET = Bun.env.ACCESS_TOKEN_SECRET;
export const DATABASE_HOST = Bun.env.DATABASE_HOST;
export const DATABASE_NAME = Bun.env.DATABASE_NAME;
export const DATABASE_PASSWORD = Bun.env.DATABASE_PASSWORD;
export const DATABASE_PORT = Bun.env.DATABASE_PORT;
export const DATABASE_USERNAME = Bun.env.DATABASE_USERNAME;
export const REFRESH_TOKEN_SECRET = Bun.env.REFRESH_TOKEN_SECRET;
export const SECRET_PORT = Bun.env.SECRET_PORT;
export const DATABASE_URL = Bun.env.DATABASE_URL;
export const STRAVA_CLIENT_ID = Bun.env.STRAVA_CLIENT_ID;
export const STRAVA_CLIENT_SECRET = Bun.env.STRAVA_CLIENT_SECRET;
export const STRAVA_REDIRECT_URI =
  Bun.env.STRAVA_REDIRECT_URI ??
  `http://localhost:${PORT}/api/v1/strava/exchange-token`;
export const STRAVA_WEBHOOK_URL =
  Bun.env.STRAVA_WEBHOOK_URL ??
  `http://localhost:${PORT}/api/v1/strava/webhook`;
// export const STRAVA_WEBHOOK_SECRET = Bun.env.STRAVA_WEBHOOK_SECRET;