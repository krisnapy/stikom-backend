import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';

import routes from './routes';

const app = new Elysia();

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
      max: 50,
      skip: (ctx) => {
        return ctx.url.includes('/api/v1/docs');
      },
    }),
  )
  .use(routes)
  .listen(9091);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
