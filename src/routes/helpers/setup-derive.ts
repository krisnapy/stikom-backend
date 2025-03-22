import { Elysia } from "elysia";
import { JWTPayloadSpec } from "@elysiajs/jwt";
import { jwtAccessSetup, jwtRefreshSetup } from "./auth.setup";
import { Admin, User } from "@/db/schemas";
import { generateRequiredFields as requiredFields } from "@/utils/generate-required-field";

type Auth = Partial<Admin> | Partial<User>;

export const derive = (app: Elysia) => {
  return app
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup)
    .derive(({ jwtAccess, jwtRefresh, set, cookie, body }) => ({
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
    }));
};
