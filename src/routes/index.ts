import { InferResultType } from "@/types/drizzle.types";
import AuthRoutes from "./auth.routes";
import { jwtAccessSetup, jwtRefreshSetup } from "./helpers/auth.setup";
import UserRoutes from "./user.routes";

import { Elysia } from "elysia";
import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Admin, User } from "@/db/schemas";
import { generateRequiredFields as requiredFields } from "@/utils/generate-required-field";

export default (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup)
    .derive(({ jwtAccess, set, jwtRefresh, cookie, body }) => ({
      generateAccessSession: async (
        auth:
          | Partial<InferResultType<"admins">>
          | Partial<InferResultType<"users">>,
        stored: boolean = true
      ) => {
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
      generateRefreshSession: async (
        auth: Partial<Admin> | Partial<User>,
        stored: boolean = true
      ) => {
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
    .group("/api/v1", (routes) => routes.use(AuthRoutes).use(UserRoutes));
