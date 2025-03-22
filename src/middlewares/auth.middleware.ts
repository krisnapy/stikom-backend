import { Elysia, error } from 'elysia';

import { findAdminById, findUserById } from '@/db/services';
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

      const { id } = payload;

      const user = await findUserById(id);

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

      const { id } = payload;

      const admin = await findAdminById(id);

      if (!admin) {
        return error(401, {
          message: 'You are not authorized to access this',
          name: 'Unauthorized',
        });
      }

      return { admin };
    });
