import { error } from 'elysia';

import { Route } from '@/db/schemas';
import {
  createRoute,
  deleteRouteById,
  findAllRoutes,
  findRouteById,
  updateRouteById,
} from '@/db/services/route.services';
import { ElysiaContext } from '@/types/elysia-context.types';

type RouteContext = ElysiaContext<Route>;

const createNewRoute = async ({ body, set }: RouteContext) => {
  try {
    const route = await createRoute(body);

    set.status = 201;

    return { message: 'Route created', route };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getRoutes = async ({ query }: RouteContext) => {
  try {
    const routes = await findAllRoutes(query);

    return { message: 'Routes fetched', routes };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getRoute = async ({ params }: RouteContext) => {
  try {
    const route = await findRouteById(params.id);

    return { message: 'Route fetched', route };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const updateRoute = async ({ params, body }: RouteContext) => {
  try {
    const route = await updateRouteById(params.id, body);

    return { message: 'Route updated', route };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const deleteRoute = async ({ params }: RouteContext) => {
  try {
    const route = await deleteRouteById(params.id);

    return { message: 'Route deleted', route };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

export { createNewRoute, getRoutes, getRoute, updateRoute, deleteRoute };
