import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

import { InferInsertType, InferUpdateType } from "@/types/drizzle.types";
import { Pagination } from "@/types/pagination.types";

import { db } from "..";
import { admins } from "../schemas";
import { getDataList } from "../helpers/get-data-list";

export const findAdminById = async (id: string) => {
  return await db.query.admins.findFirst({
    where: eq(admins.id, id),
  });
};

export const findAdminByUsername = async (username: string) => {
  return await db.query.admins.findFirst({
    where: eq(admins.username, username),
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
      id: uuidv7(),
      ...data,
    })
    .returning();

  return admin;
};

export const updateAdminById = async (
  data: InferUpdateType<"admins">,
  id: string
) => {
  return await db.update(admins).set(data).where(eq(admins.id, id)).returning();
};

export const deleteAdminById = async (id: string) => {
  return await db.delete(admins).where(eq(admins.id, id));
};
