import { error } from 'elysia';
import omit from 'lodash/omit';
import { Argon2id } from 'oslo/password';

import {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from '@/db/services';
import { InferResultType } from '@/types/drizzle.types';
import { ElysiaContext } from '@/types/elysia-context.types';

const argon2 = new Argon2id();

type UserContext = ElysiaContext<InferResultType<'users'>>;

const createNewUser = async ({ body, set }: UserContext) => {
  try {
    const hashPass = await argon2.hash(body.password);

    const user = await createUser({
      ...body,
      password: hashPass,
    });

    set.status = 201;

    return { message: 'User created', user: omit(user, ['password']) };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const updateUser = async ({ body, params, set }: UserContext) => {
  try {
    const user = await updateUserById(body, params.id);

    if (!user) {
      set.status = 404;
      return { message: 'User not found' };
    }

    set.status = 200;

    return { message: 'User updated', user: omit(user, ['password']) };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getUsers = async ({ query }: ElysiaContext) => {
  try {
    const users = await findAllUsers(query);

    return { message: 'Get user list successful', ...users };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getUser = async ({ params, set }: ElysiaContext) => {
  try {
    const users = await findUserById(params.id, ['password']);

    set.status = 200;
    return { message: 'Get user successful', users: omit(users, ['password']) };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const deleteUser = async ({ params, set }: ElysiaContext) => {
  try {
    const user = await deleteUserById(params.id);

    if (!user) {
      set.status = 404;
      return { message: 'User not found' };
    }

    set.status = 200;
    return { message: 'User deleted' };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

export default {
  createNewUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
