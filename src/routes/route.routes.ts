import { Elysia } from 'elysia';

import RouteController from '@/controllers/route.controller';
import { isUserAuthenticated } from '@/middlewares/auth.middleware';

import { queryCollectionModel } from './models/query';

export default (app: Elysia) => {
  return app.group('/routes', (group) => {
    group.use(isUserAuthenticated);
    group.get('', RouteController.getRoutes, { query: queryCollectionModel });
    group.get('/:id', RouteController.getRoute);
    group.put('/:id', RouteController.updateRoute);
    group.delete('/:id', RouteController.deleteRoute);
    group.post('', RouteController.createNewRoute);
    group.get('/my-routes', RouteController.getUserRoutes, { query: queryCollectionModel });

    return group;
  });
};
