import { error } from 'elysia';

import {
  findAllGroups,
  findGroupById,
  updateGroupById,
  deleteGroupById,
} from '@/db/services';
import {
  addMemberToGroupById,
  createGroup,
  findAllMembersOfGroup,
  findGroupsByUserId,
  removeMemberFromGroupById,
} from '@/db/services/group.services';
import { InferResultType } from '@/types/drizzle.types';
import { ElysiaContext } from '@/types/elysia-context.types';

type GroupContext = ElysiaContext<InferResultType<'groups'>>;
type UserIdsContext = ElysiaContext<{ userIds: string[] }>;

const createNewGroup = async ({ body, set }: GroupContext) => {
  try {
    const group = await createGroup(body);

    await addMemberToGroupById(group.id, [body.createdBy], 'creator');

    set.status = 201;

    return { message: 'Group created', group };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const updateGroup = async ({ body, params, set }: GroupContext) => {
  try {
    const group = await updateGroupById(body, params.id);

    if (!group) {
      set.status = 404;
      return { message: 'Group not found' };
    }

    set.status = 200;

    return { message: 'Group updated', group };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getGroups = async ({ query }: ElysiaContext) => {
  try {
    const groups = await findAllGroups(query);

    return { message: 'Get group list successful', ...groups };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getGroup = async ({ params, set }: ElysiaContext) => {
  try {
    const group = await findGroupById(params.id);

    set.status = 200;
    return { message: 'Get group successful', group };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getMyGroup = async ({ user, set }: ElysiaContext) => {
  try {
    const groups = await findGroupsByUserId(user.id);

    set.status = 200;
    return { message: 'Get my group successful', ...groups };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const findAllGroupMembers = async ({ params, set }: ElysiaContext) => {
  try {
    const groupMembers = await findAllMembersOfGroup(params.id);

    set.status = 200;
    return { message: 'Get all group members successful', ...groupMembers };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const addMemberToGroup = async ({ params, body, set }: UserIdsContext) => {
  try {
    const group = await addMemberToGroupById(params.id, body.userIds);

    set.status = 200;
    return { message: 'Add member to group successful', group };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const removeMemberFromGroup = async ({ params, body, set }: UserIdsContext) => {
  try {
    const group = await removeMemberFromGroupById(params.id, body.userIds);

    if (!group) {
      set.status = 404;
      return { message: 'Group not found' };
    }

    set.status = 200;
    return { message: 'Remove member from group successful', group };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const joinGroup = async ({ params, set, user }: ElysiaContext) => {
  try {
    const group = await findGroupById(params.id);

    if (!group) {
      set.status = 404;
      return { message: 'Group not found' };
    }

    const groupMember = await addMemberToGroupById(params.id, [user.id]);

    set.status = 200;
    return { message: 'Join group successful', ...groupMember };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const leaveGroup = async ({ params, set, user }: ElysiaContext) => {
  try {
    const group = await findGroupById(params.id);

    if (!group) {
      set.status = 404;
      return { message: 'Group not found' };
    }

    const groupMember = await removeMemberFromGroupById(params.id, [user.id]);

    set.status = 200;
    return { message: 'Leave group successful', ...groupMember };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const deleteGroup = async ({ params, set }: ElysiaContext) => {
  try {
    const group = await deleteGroupById(params.id);
    const groupMembers = await findAllMembersOfGroup(params.id);

    if (!group) {
      return error(404, { message: 'Group not found' });
    }

    await removeMemberFromGroupById(
      params.id,
      groupMembers.groupMembers.map((member) => member.userId),
    );

    set.status = 200;
    return { message: 'Delete group member successful', ...groupMembers };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
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
