import { Elysia } from 'elysia';

import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import groupRoutes from './group.routes';
import { derive } from './helpers/setup-derive';
import routeRoutes from './route.routes';
import stravaRoutes from './strava.routes';
import userRoutes from './user.routes';

export default (app: Elysia) =>
  app.use(derive).group('/api/v1', (app) =>
    app
      .get('_health', () => 'OK')
      .use(authRoutes)
      .use(userRoutes)
      .use(groupRoutes)
      .use(stravaRoutes)
      .use(routeRoutes)
      .use(eventRoutes),
  );
