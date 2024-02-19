import { Elysia } from "elysia";

import AuthController from "@/controllers/auth.controller";
import AdminAuthController from "@/controllers/admin-auth.controller";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "@/middlewares/auth.middleware";

export default (app: Elysia) => {
  return app
    .group("/auth", (group) => {
      group.post("/login", AuthController.login);
      group.delete("/logout", AuthController.logout);
      group.get("/refresh-token", AuthController.refreshToken);
      group.use(isUserAuthenticated);
      group.get("/me", AuthController.me);

      return group;
    })
    .group("admin/auth", (group) => {
      group.post("/login", AdminAuthController.login);
      group.delete("/logout", AdminAuthController.logout);
      group.get("/refresh-token", AdminAuthController.refreshToken);
      group.use(isAdminAuthenticated);
      group.get("/me", AdminAuthController.me);

      return group;
    });
};
