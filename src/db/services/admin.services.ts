import { eq } from 'drizzle-orm';
import { uuidv7 } from 'uuidv7';

import { InferInsertType, InferUpdateType } from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { getDataList } from '../helpers/get-data-list';
import { admins } from '../schemas';

export const findAdminByUuid = async (uuid: string) => {
  const admin = await db.query.admins.findFirst({
    where: eq(admins.uuid, uuid),
  });
  return admin;
};

export const findAdminByEmail = async (email: string) => {
  const admin = await db.query.admins.findFirst({
    where: eq(admins.email, email),
  });
  return admin;
};

export const findAllAdmins = async (pagination?: Pagination<'admins'>) => {
  const result = await getDataList<'admins'>({
    data: admins,
    pagination,
    options: {
      exclude: ['password'],
    },
  });
  return result;
};

export const createAdmin = async (data: InferInsertType<'admins'>) => {
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
  data: InferUpdateType<'admins'>,
  uuid: string,
) => {
  const result = await db
    .update(admins)
    .set(data)
    .where(eq(admins.uuid, uuid))
    .returning();
  return result;
};

export const deleteAdminByUuid = async (uuid: string) => {
  const result = await db.delete(admins).where(eq(admins.uuid, uuid));
  return result;
};
