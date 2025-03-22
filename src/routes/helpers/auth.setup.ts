import jwt from '@elysiajs/jwt';
import { Static } from '@sinclair/typebox';
import { Elysia, t } from 'elysia';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/env';

export const jwtSchema = t.Object({
  id: t.Optional(t.String()),
});

export type JWTSchema = Static<typeof jwtSchema>;

export const jwtAccessSetup = new Elysia({
  name: 'jwtAccess',
}).use(
  jwt({
    name: 'jwtAccess',
    schema: jwtSchema,
    secret: ACCESS_TOKEN_SECRET!,
    exp: '1d',
  }),
);

export const jwtRefreshSetup = new Elysia({
  name: 'jwtRefresh',
}).use(
  jwt({
    name: 'jwtRefresh',
    schema: jwtSchema,
    secret: REFRESH_TOKEN_SECRET!,
    exp: '7d',
  }),
);
