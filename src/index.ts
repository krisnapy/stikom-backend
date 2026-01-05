import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';

const server: import('elysia/dist/universal/server').Server | null = null;

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
  .use(routes)
  .listen(9091, () => {
    console.log(`Server is running on ${app.server?.url}`);
  });

// server = app.server;

// export default {
//   async fetch(request: Request): Promise<Response> {
//     // eslint-disable-next-line no-return-await
//     return await app.fetch(request);
//   },
// };
