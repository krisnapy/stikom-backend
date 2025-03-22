import { Elysia } from "elysia";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import groupRoutes from "./group.routes";
import { derive } from "./helpers/setup-derive";

export default (app: Elysia) =>
  app
    .use(derive)
    .group("/api/v1", (app) =>
      app.use(authRoutes).use(userRoutes).use(groupRoutes)
    );
