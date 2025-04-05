import { error } from 'elysia';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Argon2id as Argon2 } from 'oslo/password';

import { findAdminByEmail, findAdminById } from '@/db/services';
import { ElysiaContext } from '@/types/elysia-context.types';

const argon2 = new Argon2();

export type AuthContext = ElysiaContext<{
  email: string;
  password: string;
}>;

const login = async ({
  body,
  set,
  generateAccessSession,
  generateRefreshSession,
  generateRequiredFields,
}: AuthContext) => {
  try {
    const requiredFields = generateRequiredFields(['email', 'password']);

    if (requiredFields) return error(400, requiredFields);

    const admin = await findAdminByEmail(body.email);

    if (!admin) {
      return error(401, {
        message: 'Invalid email or password!!',
        name: 'InvalidCredentials',
      });
    }

    const matchPass = await argon2.verify(admin.password, body.password);

    if (!matchPass) {
      return error(401, {
        message: 'Invalid email or password!!',
        name: 'InvalidCredentials',
      });
    }

    const adminObj = pick(admin, ['id']);

    await generateAccessSession(adminObj);
    await generateRefreshSession(adminObj);

    set.status = 200;

    return { message: 'Login successful!!', admin: omit(admin, ['password']) };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const me = async ({ admin, set }: AuthContext) => {
  try {
    const data = await findAdminById(admin.id);

    set.status = 200;
    return { message: 'Success', admin: omit(data, ['password']) };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const logout = ({ set, cookie }: AuthContext) => {
  try {
    const refreshToken = cookie.refreshToken;

    if (!refreshToken) return (set.status = 200);

    cookie.refreshToken.set({
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      expires: new Date(0),
      value: '',
    });

    set.status = 200;

    return { message: 'Logout success' };
  } catch (err) {
    return error(500, { message: 'Logout failed', error: err });
  }
};

const refreshToken = async ({
  set,
  cookie,
  jwtRefresh,
  generateAccessSession,
}: AuthContext) => {
  try {
    const refreshToken = String(cookie.refreshToken);
    set.status = 401;

    if (!refreshToken) throw new Error('Invalid token');

    const auth = await jwtRefresh.verify(refreshToken);

    const admin = await findAdminById(auth.id);

    if (!admin) throw new Error('Invalid token');

    const adminObj = pick(admin, ['id']);

    await generateAccessSession(adminObj);

    set.status = 200;

    return {
      message: 'Refresh token success',
      admin: omit(admin, ['password']),
    };
  } catch (err) {
    return error(500, { message: 'Refresh token failed', error: err });
  }
};

export default { login, me, logout, refreshToken };
