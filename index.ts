import cors from "cors";
import session from "express-session";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";

import { PORT, SECRET_PORT } from "./src/env";
import { connection } from "./src/config";
import routes from "./src/routes";

connection.sync({ force: true });

const app = express();

app
  .use(cookieParser())
  .use(
    session({
      secret: SECRET_PORT,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: "auto",
        sameSite: "none",
      },
    })
  )
  .use(
    cors({
      credentials: true,
      origin: "*",
      allowedHeaders: ["Content-Type", "Authorization", "Refresh-Token"],
      exposedHeaders: ["Authorization", "Refresh-Token"],
    })
  )
  .use(json())
  .use(routes)
  .listen(PORT, () => {
    console.log(`Application run on http://localhost:${PORT}`);
  });

export default app;
