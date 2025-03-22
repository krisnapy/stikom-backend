import { Elysia, t } from "elysia";

import GroupController from "@/controllers/group.controller";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "@/middlewares/auth.middleware";
import { queryCollectionModel } from "./helpers/models/query";
import { groupCollectionModel, groupModel } from "./helpers/models/group.model";
import {
  collectionResponse,
  errorResponse,
  modelResponse,
} from "./helpers/models/response";

const groupCollectionResponse = {
  200: collectionResponse({ groups: groupCollectionModel }),
  500: errorResponse,
};

const groupResponse = {
  200: modelResponse({ group: groupModel }),
  500: errorResponse,
};

export default (app: Elysia) => {
  // Admin routes
  app.group("/admin/groups", (group) => {
    group.use(isAdminAuthenticated);
    group.get("", GroupController.getGroups, {
      response: groupCollectionResponse,
    });
    group.get("/:id", GroupController.getGroup, {
      response: groupResponse,
    });
    group.put("/:id", GroupController.updateGroup, {
      response: groupResponse,
    });
    group.delete("/:id", GroupController.deleteGroup, {
      response: groupResponse,
    });

    return group;
  });

  // User routes
  app.group("/groups", (group) => {
    group.use(isUserAuthenticated);
    group.get("/my-groups", GroupController.getMyGroup, {
      response: groupCollectionResponse,
      query: queryCollectionModel,
    });
    group.get("/:id", GroupController.getGroup, {
      response: groupResponse,
    });
    group.get("/:id/members", GroupController.findAllGroupMembers, {
      query: queryCollectionModel,
    });
    group.post("/:id/members/join", GroupController.joinGroup, {
      response: groupResponse,
    });
    group.delete("/:id/members/leave", GroupController.leaveGroup, {
      response: groupResponse,
    });
    group.post("/:id/members/invite", GroupController.addMemberToGroup, {
      response: groupResponse,
    });
    group.delete("/:id/members/remove", GroupController.removeMemberFromGroup, {
      response: groupResponse,
    });

    return group;
  });

  return app;
};
