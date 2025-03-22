import { Elysia } from 'elysia';

import UserController from '@/controllers/user.controller';
import { isAdminAuthenticated } from '@/middlewares/auth.middleware';

import { queryCollectionModel } from './models/query';

export default (app: Elysia) => {
  return app.group('/admin/users', (group) => {
    group.use(isAdminAuthenticated);
    group.get('', UserController.getUsers, { query: queryCollectionModel });
    group.get('/:id', UserController.getUser);
    group.put('/:id', UserController.updateUser);
    group.delete('/:id', UserController.deleteUser);
    group.post('', UserController.createNewUser);

    return group;
  });
};
