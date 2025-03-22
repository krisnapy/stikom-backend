import { Elysia } from "elysia";

import GroupController from "@/controllers/group.controller";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "@/middlewares/auth.middleware";

export default (app: Elysia) => {
  app.group("/admin/groups", (group) => {
    group.use(isAdminAuthenticated);
    group.get("", GroupController.getGroups);
    group.get("/:id", GroupController.getGroup);
    group.put("/:id", GroupController.updateGroup);
    group.delete("/:id", GroupController.deleteGroup);

    return group;
  });

  app.group("/groups", (group) => {
    group.use(isUserAuthenticated);
    group.get("/my-groups", GroupController.getMyGroup);
    group.get("/:id/members", GroupController.findAllGroupMembers);
    group.post("/:id/members/invite", GroupController.addMemberToGroup);
    group.delete("/:id/members", GroupController.removeMemberFromGroup);
    group.post("/:id/members/join", GroupController.joinGroup);
    group.delete("/:id/members/leave", GroupController.leaveGroup);

    return group;
  });

  return app;
};
