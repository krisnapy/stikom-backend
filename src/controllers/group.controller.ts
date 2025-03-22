import {
  findAllGroups,
  findGroupByUuid,
  updateGroupByUuid,
  deleteGroupByUuid,
} from "@/db/services";
import { ElysiaContext } from "@/types/elysia-context.types";
import { InferResultType } from "@/types/drizzle.types";
import {
  addMemberToGroupByUuid,
  createGroup,
  findAllMembersOfGroup,
  removeMemberFromGroupByUuid,
} from "@/db/services/group.services";

const createNewGroup = async ({
  body,
  set,
}: ElysiaContext<{ body: InferResultType<"groups"> }>) => {
  try {
    const group = await createGroup(body);

    set.status = 201;

    return { message: "Group created", group };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error" };
  }
};

const updateGroup = async ({
  body,
  params,
  set,
}: ElysiaContext<{
  body: InferResultType<"groups">;
}>) => {
  try {
    const group = await updateGroupByUuid(body, params.id);

    if (!group) {
      set.status = 404;
      return { message: "Group not found" };
    }

    set.status = 200;

    return { message: "Group updated", group };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const getGroups = async ({ query, set }: ElysiaContext) => {
  try {
    const groups = await findAllGroups(query);

    return { message: "Get group list successful", ...groups };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const getGroup = async ({ params, set }: ElysiaContext) => {
  try {
    const group = await findGroupByUuid(params.id);

    set.status = 200;
    return { message: "Get group successful", group };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error" };
  }
};

const deleteGroup = async ({ params, set }: ElysiaContext) => {
  try {
    const group = await deleteGroupByUuid(params.id);

    if (!group) {
      set.status = 404;
      return { message: "Group not found" };
    }

    set.status = 200;
    return { message: "Group deleted" };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const getMyGroup = async ({ user, set }: ElysiaContext) => {
  try {
    const group = await findGroupByUuid(user.uuid);

    set.status = 200;
    return { message: "Get my group successful", group };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const findAllGroupMembers = async ({ params, set }: ElysiaContext) => {
  try {
    const members = await findAllMembersOfGroup(params.id);

    set.status = 200;
    return { message: "Get all group members successful", members };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const addMemberToGroup = async ({
  params,
  body,
  set,
}: ElysiaContext<{ body: { userIds: string[] } }>) => {
  try {
    const group = await addMemberToGroupByUuid(params.id, body.userIds);

    set.status = 200;
    return { message: "Add member to group successful", group };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const removeMemberFromGroup = async ({
  params,
  body,
  set,
}: ElysiaContext<{ body: { userIds: string[] } }>) => {
  try {
    const group = await removeMemberFromGroupByUuid(params.id, body.userIds);

    if (!group) {
      set.status = 404;
      return { message: "Group not found" };
    }

    set.status = 200;
    return { message: "Remove member from group successful", group };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const joinGroup = async ({ params, set, user }: ElysiaContext) => {
  try {
    const group = await findGroupByUuid(params.id);

    if (!group) {
      set.status = 404;
      return { message: "Group not found" };
    }

    const groupMember = await addMemberToGroupByUuid(params.id, [user.uuid]);

    set.status = 200;
    return { message: "Join group successful", groupMember };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const leaveGroup = async ({ params, set, user }: ElysiaContext) => {
  try {
    const group = await findGroupByUuid(params.id);

    if (!group) {
      set.status = 404;
      return { message: "Group not found" };
    }

    const groupMember = await removeMemberFromGroupByUuid(params.id, [
      user.uuid,
    ]);

    set.status = 200;
    return { message: "Leave group successful", groupMember };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export default {
  createNewGroup,
  updateGroup,
  deleteGroup,
  getGroups,
  getGroup,
  getMyGroup,
  findAllGroupMembers,
  addMemberToGroup,
  removeMemberFromGroup,
  joinGroup,
  leaveGroup,
};
