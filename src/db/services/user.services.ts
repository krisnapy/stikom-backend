import { eq } from 'drizzle-orm';
import omit from 'lodash/omit';

import {
  InferInsertType,
  InferResultType,
  InferUpdateType,
} from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { getDataList } from '../helpers/get-data-list';
import { users } from '../schemas';

export const userRelation = {
  groups: {
    columns: {
      id: true,
      name: true,
    },
  },
};

export const findUserById = async (
  id: string,
  exclude?: Array<keyof InferResultType<'users'>>,
) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  return omit(user, exclude) as InferResultType<'users'>;
};

export const findUserByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};

export const findAllUsers = async (pagination?: Pagination<'users'>) => {
  const result = await getDataList<'users'>({
    data: users,
    pagination,
    options: {
      with: userRelation,
      exclude: ['password'],
    },
  });

  return result;
};

export const createUser = async (data: InferInsertType<'users'>) => {
  const [user] = await db.insert(users).values(data).returning();

  return user;
};

export const updateUserById = async (
  data: InferUpdateType<'users'>,
  id: string,
) => {
  const user = await db.update(users).set(data).where(eq(users.id, id));

  return user;
};

export const deleteUserById = async (id: string) => {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user;
};
