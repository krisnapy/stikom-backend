import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Elysia, ElysiaConfig } from "elysia";

import { Admin, User } from "@/db/schemas";
import { generateRequiredFields as requiredFields } from "@/utils/generate-required-field";

import authRoutes from "./auth.routes";
import { jwtAccessSetup, jwtRefreshSetup } from "./helpers/auth.setup";
import userRoutes from "./user.routes";
import groupRoutes from "./group.routes";

type Auth = Partial<Admin> | Partial<User>;

// const routes = [authRoutes, userRoutes, groupRoutes];

const routes = (app: Elysia<"/api/v1">) => {
  return app.use(authRoutes).use(userRoutes).use(groupRoutes);
};

export default (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup)
    .derive(({ jwtAccess, set, jwtRefresh, cookie, body }) => ({
      generateAccessSession: async (auth: Auth, stored: boolean = true) => {
        const accessToken = await jwtAccess.sign(auth);

        const accessTokenDecode = (await jwtAccess.verify(
          accessToken
        )) as JWTPayloadSpec;

        if (stored) {
          set.headers.authorization = accessToken;
          set.headers["Access-Token-Expires"] = new Date(
            accessTokenDecode.exp * 1000
          ).toISOString();
        }

        return { accessToken, payload: accessTokenDecode };
      },
      generateRefreshSession: async (auth: Auth, stored: boolean = true) => {
        const refreshToken = await jwtRefresh.sign(auth);

        const refreshTokenDecode = (await jwtRefresh.verify(
          refreshToken
        )) as JWTPayloadSpec;

        if (stored) {
          cookie.refreshToken.set({
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            expires: new Date(refreshTokenDecode.exp * 1000),
            value: refreshToken,
          });
        }

        return { refreshToken, payload: refreshTokenDecode };
      },
      generateRequiredFields: (fields: Array<string>) => {
        const error = requiredFields(body, fields);

        set.status = 400;
        if (!!Object.entries(error).length) return error;
      },
    }))
    .group("/api/v1", (route) => routes(route));
