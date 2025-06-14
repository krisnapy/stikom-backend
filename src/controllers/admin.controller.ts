import { Argon2id as Argon2 } from 'oslo/password';

import { excludeAttributes } from '@/db/helpers/exclude-attributes';
import {
  createAdmin,
  deleteAdminById,
  updateAdminById,
  findAdminById,
  findAllAdmins,
} from '@/db/services';
import { InferResultType } from '@/types/drizzle.types';
import { ElysiaContext } from '@/types/elysia-context.types';

type AdminContext = ElysiaContext<InferResultType<'admins'>>;

const argon2 = new Argon2();

const createNewAdmin = async ({ body, set }: AdminContext) => {
  try {
    const hashPass = await argon2.hash(body.password);

    const admin = await createAdmin({
      ...body,
      password: hashPass,
    });

    set.status = 201;

    return {
      message: 'Admin created successfully',
      admin: excludeAttributes<'admins'>(admin, ['password']),
    };
  } catch (error) {
    set.status = 500;
    return { message: 'Internal server error', error };
  }
};

const updateAdmin = async ({ body, params, set }: AdminContext) => {
  try {
    const admin = await updateAdminById(body, params.id);

    set.status = 200;

    return {
      message: 'Admin updated successfully',
      admin: excludeAttributes<'admins'>(admin, ['password']),
    };
  } catch (error) {
    set.status = 500;
    return { message: 'Internal server error', error };
  }
};

const getAdmins = async ({ query, set }: AdminContext) => {
  try {
    const admins = await findAllAdmins(query);

    set.status = 200;

    return { message: 'Admins fetched successfully', ...admins };
  } catch (error) {
    set.status = 500;
    return { message: 'Internal server error', error };
  }
};

const getAdmin = async ({ params, set }: AdminContext) => {
  try {
    const admin = await findAdminById(params.id);

    set.status = 200;

    return { message: 'Admin fetched successfully', admin };
  } catch (error) {
    set.status = 500;
    return { message: 'Internal server error', error };
  }
};

const deleteAdmin = async ({ params, set }: AdminContext) => {
  try {
    await deleteAdminById(params.id);

    set.status = 200;

    return { message: 'Admin deleted' };
  } catch (error) {
    set.status = 500;
    return { message: 'Internal server error', error };
  }
};

export default {
  createNewAdmin,
  updateAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
};
