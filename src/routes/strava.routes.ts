import { Elysia } from 'elysia';

import StravaController from '@/controllers/strava.controller';
import UserController from '@/controllers/user.controller';
import { isUserAuthenticated } from '@/middlewares/auth.middleware';

export default (app: Elysia) => {
  return app.group('/strava', (group) => {
    group.get('/exchange-token', StravaController.exchangeStravaToken);
    group.get('/webhook', StravaController.subscribeWebhook);
    group.use(isUserAuthenticated);
    group.delete('/deauthorize', UserController.getUsers);
    group.get('/oauth', StravaController.getStravaOauth);

    return group;
  });
};
