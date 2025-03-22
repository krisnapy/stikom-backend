import { findAdminByUuid, findUserByUuid } from "@/db/services";
import { jwtAccessSetup } from "@/routes/helpers/auth.setup";
import { Elysia } from "elysia";

export const isUserAuthenticated = (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .derive(async ({ jwtAccess, set, request: { headers } }) => {
      const authorization = headers.get("authorization");

      if (!authorization) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      const token = authorization.split(" ").pop();

      if (!token) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      const payload = await jwtAccess.verify(token);

      if (!payload) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      const { uuid } = payload;

      const user = await findUserByUuid(uuid);

      if (!user) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      return { user };
    });

export const isAdminAuthenticated = (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .derive(async ({ jwtAccess, set, request: { headers } }) => {
      const authorization = headers.get("authorization");

      if (!authorization) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      const token = authorization.split(" ").pop();

      if (!token) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      const payload = await jwtAccess.verify(token);
      if (!payload) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      const { uuid } = payload;

      const admin = await findAdminByUuid(uuid);

      if (!admin) {
        set.status = 401;
        throw Error("You are not authorized to access this");
      }

      return { admin };
    });
