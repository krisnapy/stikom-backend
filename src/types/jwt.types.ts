import { JWTPayloadSpec } from '@elysiajs/jwt';

import { JWTSchema } from '@/routes/helpers/auth.setup';

export type JWTPayload = JWTSchema & JWTPayloadSpec;

export type JWT = {
  readonly sign: (morePayload: JWTSchema) => Promise<string>;
  readonly verify: (jwt?: string) => Promise<JWTPayload>;
};
