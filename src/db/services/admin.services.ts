import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

import { InferInsertType, InferUpdateType } from "@/types/drizzle.types";
import { Pagination } from "@/types/pagination.types";

import { db } from "..";
import { admins } from "../schemas";
import { getDataList } from "../helpers/get-data-list";

export const findAdminByUuid = async (uuid: string) => {
  return await db.query.admins.findFirst({
    where: eq(admins.uuid, uuid),
  });
};

export const findAdminByEmail = async (email: string) => {
  return await db.query.admins.findFirst({
    where: eq(admins.email, email),
  });
};

export const findAllAdmins = async (pagination?: Pagination<"admins">) => {
  return await getDataList<"admins">(admins, pagination, {
    exclude: ["password"],
  });
};

export const createAdmin = async (data: InferInsertType<"admins">) => {
  const [admin] = await db
    .insert(admins)
    .values({
      uuid: uuidv7(),
      ...data,
    })
    .returning();

  return admin;
};

export const updateAdminById = async (
  data: InferUpdateType<"admins">,
  uuid: string
) => {
  return await db
    .update(admins)
    .set(data)
    .where(eq(admins.uuid, uuid))
    .returning();
};

export const deleteAdminByUuid = async (uuid: string) => {
  return await db.delete(admins).where(eq(admins.uuid, uuid));
};
