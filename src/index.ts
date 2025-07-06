import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';

import routes from './routes';

const app = new Elysia({ aot: false });

app
  .use(
    swagger({
      path: '/api/v1/docs',
      documentation: {
        info: {
          title: 'API Documentation',
          version: '1.0.0',
        },
      },
    }),
  )
  .use(
    rateLimit({
      max: 100,
      skip: (ctx) => {
        return ctx.url.includes('/api/v1/docs');
      },
    }),
  )
  .use(routes);

export default {
  async fetch(request: Request): Promise<Response> {
    // eslint-disable-next-line no-return-await
    return await app.fetch(request);
  },
};
