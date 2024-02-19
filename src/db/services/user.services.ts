import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

import {
  InferInsertType,
  InferUpdateType,
  TSchema,
} from "@/types/drizzle.types";
import { Pagination } from "@/types/pagination.types";

import { db } from "..";
import { users } from "../schemas";
import { getDataList } from "../helpers/get-data-list";
import { includeWith } from "../helpers/include-attributes";

export const userRelation = {
  lecture: {
    columns: {
      avatar: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      gender: true,
    },
  },
  religion: {
    columns: {
      name: true,
    },
  },
  role: {
    columns: {
      name: true,
    },
  },
};

export const findUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: userRelation,
  });
};

export const findUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
    with: userRelation,
  });
};

export const findUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
    with: includeWith<TSchema["users"]>(users, ["id", "username", "email"]),
  });
};

export const findAllUsers = async (pagination?: Pagination<"users">) => {
  return await getDataList<"users">(users, pagination, {
    with: userRelation,
    exclude: ["password"],
  });
};

export const createUser = async (data: InferInsertType<"users">) => {
  const [user] = await db
    .insert(users)
    .values({
      id: uuidv7(),
      ...data,
    })
    .returning();

  return user;
};

export const updateUserById = async (
  data: InferUpdateType<"users">,
  id: string
) => {
  return await db.update(users).set(data).where(eq(users.id, id));
};

export const deleteUserById = async (id: string) => {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user;
};
