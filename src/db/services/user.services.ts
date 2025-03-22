import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

import {
  InferInsertType,
  InferResultType,
  InferUpdateType,
} from "@/types/drizzle.types";
import { Pagination } from "@/types/pagination.types";

import { db } from "..";
import { users } from "../schemas";
import { getDataList } from "../helpers/get-data-list";
import { excludeAttributes } from "../helpers/exclude-attributes";

export const userRelation = {
  groups: {
    columns: {
      uuid: true,
      name: true,
    },
  },
};

export const findUserByUuid = async (
  uuid: string,
  exclude?: Array<keyof InferResultType<"users">>
) => {
  const user = await db.query.users.findFirst({
    where: eq(users.uuid, uuid),
  });

  return excludeAttributes<"users">(user, exclude);
};

export const findUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
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
      uuid: uuidv7(),
      ...data,
    })
    .returning();

  return user;
};

export const updateUserByUuid = async (
  data: InferUpdateType<"users">,
  uuid: string
) => {
  return await db.update(users).set(data).where(eq(users.uuid, uuid));
};

export const deleteUserByUuid = async (uuid: string) => {
  const [user] = await db.delete(users).where(eq(users.uuid, uuid)).returning();
  return user;
};
