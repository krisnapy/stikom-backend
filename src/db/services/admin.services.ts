import { eq } from 'drizzle-orm';

import { InferInsertType, InferUpdateType } from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { getDataList } from '../helpers/get-data-list';
import { admins } from '../schemas';

export const findAdminById = async (id: string) => {
  const admin = await db.query.admins.findFirst({
    where: eq(admins.id, id),
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
  const [admin] = await db.insert(admins).values(data).returning();

  return admin;
};

export const updateAdminById = async (
  data: InferUpdateType<'admins'>,
  id: string,
) => {
  const result = await db
    .update(admins)
    .set(data)
    .where(eq(admins.id, id))
    .returning();
  return result;
};

export const deleteAdminById = async (id: string) => {
  const result = await db.delete(admins).where(eq(admins.id, id));
  return result;
};
