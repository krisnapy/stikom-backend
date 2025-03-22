import { Elysia, error } from 'elysia';

import { findAdminByUuid, findUserByUuid } from '@/db/services';
import { jwtAccessSetup } from '@/routes/helpers/auth.setup';

export const isUserAuthenticated = (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .derive(async ({ jwtAccess, request: { headers } }) => {
      const authorization = headers.get('authorization');

      if (!authorization) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      const token = authorization.split(' ').pop();

      if (!token) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      const payload = await jwtAccess.verify(token);

      if (!payload) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      const { uuid } = payload;

      const user = await findUserByUuid(uuid);

      if (!user) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      return { user };
    });

export const isAdminAuthenticated = (app: Elysia) =>
  app
    .use(jwtAccessSetup)
    .derive(async ({ jwtAccess, request: { headers } }) => {
      const authorization = headers.get('authorization');

      console.log('admin', authorization);

      if (!authorization) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      const token = authorization.split(' ').pop();

      if (!token) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      const payload = await jwtAccess.verify(token);
      if (!payload) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      const { uuid } = payload;

      const admin = await findAdminByUuid(uuid);

      if (!admin) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      return { admin };
    });
