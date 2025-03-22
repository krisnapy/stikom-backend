import { and, eq, inArray } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

import {
  InferInsertType,
  InferResultType,
  InferUpdateType,
} from "@/types/drizzle.types";
import { Pagination } from "@/types/pagination.types";

import { db } from "..";
import { groupMembers, groups } from "../schemas";
import { getDataList } from "../helpers/get-data-list";
import { excludeAttributes } from "../helpers/exclude-attributes";

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
      uuid: false,
      groupId: false,
      userId: false,
      role: false,
      createdAt: false,
      updatedAt: false,
    },
    with: userColumns,
  },
};

/**
 * Find a group by its UUID
 */
export const findGroupByUuid = async (
  uuid: string,
  exclude?: Array<keyof InferResultType<"groups">>
) => {
  const group = await db.query.groups.findFirst({
    where: eq(groups.uuid, uuid),
    with: groupRelation,
  });

  return excludeAttributes<"groups">(group, exclude);
};

/**
 * Find all groups by user ID
 */
export const findGroupsByUserId = async (
  userId: string,
  pagination?: Pagination<"groups">
) => {
  const memberGroups = await db.query.groupMembers.findMany({
    where: eq(groupMembers.userId, userId),
  });

  const groupIds = memberGroups.map((member) => member.groupId);

  return await getDataList<"groups">(groups, pagination, {
    where: inArray(groups.uuid, groupIds),
    with: groupRelation,
  });
};

/**
 * Find all groups with optional pagination
 */
export const findAllGroups = async (pagination?: Pagination<"groups">) => {
  return await getDataList<"groups">(groups, pagination, {
    with: groupRelation,
  });
};

/**
 * Create a new group
 */
export const createGroup = async (data: InferInsertType<"groups">) => {
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
  data: InferUpdateType<"groups">,
  uuid: string
) => {
  return await db.update(groups).set(data).where(eq(groups.uuid, uuid));
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
  role: "creator" | "admin" | "member" = "member"
) => {
  const group = await db.query.groups.findFirst({
    where: eq(groups.uuid, groupId),
    with: groupRelation,
  });

  if (!group) {
    throw new Error("Group not found");
  }

  return await db
    .insert(groupMembers)
    .values(userId.map((userId) => ({ groupId, userId, role })));
};

/**
 * Remove a member from a group
 */
export const removeMemberFromGroupByUuid = async (
  groupId: string,
  userId: string[]
) => {
  return await db
    .delete(groupMembers)
    .where(
      and(
        eq(groupMembers.groupId, groupId),
        inArray(groupMembers.userId, userId)
      )
    );
};

/**
 * Find all members of a group
 */
export const findAllMembersOfGroup = async (
  groupId: string,
  pagination?: Pagination<"groupMembers">
) => {
  return await getDataList<"groupMembers">(groupMembers, pagination, {
    where: eq(groupMembers.groupId, groupId),
    ...groupRelation.groupMembers,
  });
};
