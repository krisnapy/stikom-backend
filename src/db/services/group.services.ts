import { and, eq, inArray } from 'drizzle-orm';
import { uuidv7 } from 'uuidv7';

import {
  InferInsertType,
  InferResultType,
  InferUpdateType,
} from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { excludeAttributes } from '../helpers/exclude-attributes';
import { getDataList } from '../helpers/get-data-list';
import { groupMembers, groups } from '../schemas';

// Define consistent relation object for group queries
export const userColumns = {
  user: {
    columns: {
      uuid: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      avatar: true,
      address: true,
      country: true,
      gender: true,
      description: true,
      status: true,
    },
  },
};

export const groupRelation = {
  groupMembers: {
    columns: {
      uuid: true,
      role: true,
    },
    with: userColumns,
  },
};

/**
 * Find a group by its UUID
 */
export const findGroupByUuid = async (
  uuid: string,
  exclude?: Array<keyof InferResultType<'groups'>>,
) => {
  const group = await db.query.groups.findFirst({
    where: eq(groups.uuid, uuid),
    with: groupRelation,
  });

  return excludeAttributes<'groups'>(group, exclude);
};

/**
 * Find all groups by user ID
 */
export const findGroupsByUserId = async (
  userId: string,
  pagination?: Pagination<'groups'>,
) => {
  const memberGroups = await db.query.groupMembers.findMany({
    where: eq(groupMembers.userId, userId),
  });

  const groupIds = memberGroups.map((member) => member.groupId);

  const result = await getDataList<'groups'>({
    data: groups,
    pagination,
    options: {
      where: inArray(groups.uuid, groupIds),
      with: groupRelation,
    },
  });

  return result;
};

/**
 * Find all groups with optional pagination
 */
export const findAllGroups = async (pagination?: Pagination<'groups'>) => {
  const result = await getDataList<'groups'>({
    data: groups,
    pagination,
    options: {
      with: groupRelation,
    },
  });

  return result;
};

/**
 * Create a new group
 */
export const createGroup = async (data: InferInsertType<'groups'>) => {
  const [group] = await db
    .insert(groups)
    .overridingSystemValue()
    .values({
      uuid: uuidv7(),
      ...data,
    })
    .returning();

  return group;
};

/**
 * Update a group by UUID
 */
export const updateGroupByUuid = async (
  data: InferUpdateType<'groups'>,
  uuid: string,
) => {
  const group = await db.update(groups).set(data).where(eq(groups.uuid, uuid));

  return group;
};

/**
 * Delete a group by UUID
 */
export const deleteGroupByUuid = async (uuid: string) => {
  const [group] = await db
    .delete(groups)
    .where(eq(groups.uuid, uuid))
    .returning();

  return group;
};

/**
 * Add a member to a group
 */
export const addMemberToGroupByUuid = async (
  groupId: string,
  userId: string[],
  role: 'creator' | 'admin' | 'member' = 'member',
) => {
  const group = await db.query.groups.findFirst({
    where: eq(groups.uuid, groupId),
    with: groupRelation,
  });

  if (!group) {
    throw new Error('Group not found');
  }

  const groupMember = await db
    .insert(groupMembers)
    .values(userId.map((userId) => ({ groupId, userId, role })));

  return groupMember;
};

/**
 * Remove a member from a group
 */
export const removeMemberFromGroupByUuid = async (
  groupId: string,
  userId: string[],
) => {
  const groupMember = await db
    .delete(groupMembers)
    .where(
      and(
        eq(groupMembers.groupId, groupId),
        inArray(groupMembers.userId, userId),
      ),
    );

  return groupMember;
};

/**
 * Find all members of a group
 */
export const findAllMembersOfGroup = async (
  groupId: string,
  pagination?: Pagination<'groupMembers'>,
) => {
  const members = await getDataList<'groupMembers'>({
    data: groupMembers,
    pagination,
    options: {
      where: eq(groupMembers.groupId, groupId),
      with: userColumns,
    },
  });

  return members;
};
