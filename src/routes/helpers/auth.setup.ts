import jwt from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/env";

export const jwtAccessSetup = new Elysia({
  name: "jwtAccess",
}).use(
  jwt({
    name: "jwtAccess",
    schema: t.Object({
      uuid: t.Optional(t.String()),
    }),
    secret: ACCESS_TOKEN_SECRET!,
    exp: "5m",
  })
);

export const jwtRefreshSetup = new Elysia({
  name: "jwtRefresh",
}).use(
  jwt({
    name: "jwtRefresh",
    schema: t.Object({
      uuid: t.Optional(t.String()),
    }),
    secret: REFRESH_TOKEN_SECRET!,
    exp: "7d",
  })
);
