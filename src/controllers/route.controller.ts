import { error } from 'elysia';

import { Route } from '@/db/schemas';
import {
  createRoute,
  deleteRouteById,
  findAllRoutes,
  findRouteById,
  findRoutesByCreatorId,
  updateRouteById,
} from '@/db/services/route.services';
import { ElysiaContext } from '@/types/elysia-context.types';

type RouteBody = {
  description: string;
  finishLocation: {
    latitude: number;
    longitude: number;
    name: string;
  };
  name: string;
  startTime: string;
  distance?: number;
  elevation?: number;
  duration?: number;
  routeId?: string;
  startLocation: {
    latitude: number;
    longitude: number;
    name: string;
  };
};

type RouteContext = ElysiaContext<RouteBody>;

const createNewRoute = async ({ body, user, set }: RouteContext) => {
  try {
    const startLatLng: [number, number] = [
      body.startLocation.latitude,
      body.startLocation.longitude,
    ];
    const endLatLng: [number, number] = [
      body.finishLocation.latitude,
      body.finishLocation.longitude,
    ];

    const route = await createRoute({
      ...body,
      startTime: new Date(body.startTime),
      routeId: body.routeId || null,
      startLatLng: startLatLng,
      endLatLng: endLatLng,
      startLocationName: body.startLocation.name,
      endLocationName: body.finishLocation.name,
      creatorId: user.id,
      stravaDataId: null,
      source: 'Manual',
      routeMapURL: null,
    });

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
    const route = await updateRouteById(params.id, {
      ...body,
      startTime: new Date(body.startTime),
    });

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

const getUserRoutes = async ({ user, query }: RouteContext) => {
  try {
    const routes = await findRoutesByCreatorId(user.id, query);
    return { message: 'Routes fetched', routes };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

export default {
  createNewRoute,
  getRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
  getUserRoutes,
};
