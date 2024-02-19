import { Elysia } from "elysia";

import AdminController from "@/controllers/admin.controller";
import { isAdminAuthenticated } from "@/middlewares/auth.middleware";

export default (app: Elysia) => {
  return app.use(isAdminAuthenticated).group("/admin/admins", (group) => {
    group.get("", AdminController.getAdmins);
    group.get("/:id", AdminController.getAdmin);
    group.put("/:id", AdminController.updateAdmin);
    group.delete("/:id", AdminController.deleteAdmin);
    group.post("", AdminController.createNewAdmin);

    return group;
  });
};
