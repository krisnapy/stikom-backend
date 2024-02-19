import { Elysia } from "elysia";

import UserController from "@/controllers/user.controller";
import { isAdminAuthenticated } from "@/middlewares/auth.middleware";

export default (app: Elysia) => {
  return app.use(isAdminAuthenticated).group("/admin/users", (group) => {
    group.get("", UserController.getUsers);
    group.get("/:id", UserController.getUser);
    group.put("/:id", UserController.updateUser);
    group.delete("/:id", UserController.deleteUser);
    group.post("", UserController.createNewUser);

    return group;
  });
};
