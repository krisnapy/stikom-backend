import { error } from 'elysia';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Argon2id as Argon2 } from 'oslo/password';

import { findUserByEmail, findUserById } from '@/db/services/user.services';
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

    const user = await findUserByEmail(body.email);

    if (!user) {
      return error(401, {
        message: 'Invalid username or password!!',
        name: 'InvalidCredentials',
      });
    }

    const matchPass = await argon2.verify(user.password, body.password);

    if (!matchPass) {
      return error(401, {
        message: 'Invalid username or password!!',
        name: 'InvalidCredentials',
      });
    }

    const userObj = pick(user, ['id']);

    await generateAccessSession(userObj);
    await generateRefreshSession(userObj);

    set.status = 200;

    return { message: 'Login successful!!', user: omit(user, ['password']) };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const me = async ({ user, set }: AuthContext) => {
  try {
    const data = await findUserById(user.id);

    set.status = 200;
    return { message: 'Success', user: omit(data, ['password']) };
  } catch (error) {
    set.status = 500;
    return error;
  }
};

const logout = ({ set, cookie, jwtRefresh }: AuthContext) => {
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
  } catch (error) {
    set.status = 500;
    return { message: 'Logout failed', data: error };
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

    if (!refreshToken) return error(401, { message: 'Invalid token' });

    const auth = await jwtRefresh.verify(refreshToken);

    const user = await findUserById(auth.id);

    if (!user) return error(401, { message: 'Invalid token' });

    const userObj = pick(user, ['id']);

    await generateAccessSession(userObj);

    set.status = 200;

    return { message: 'Refresh token success', user: omit(user, ['password']) };
  } catch (err) {
    return error(500, { message: 'Refresh token failed', error: err });
  }
};

export default { login, me, logout, refreshToken };
