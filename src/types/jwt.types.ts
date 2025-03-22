import { JWTPayloadSpec } from '@elysiajs/jwt';

export type JwtPayload = {
  readonly sign: (
    morePayload: {
      uuid?: string;
    } & JWTPayloadSpec
  ) => Promise<string>;
  readonly verify: (jwt?: string) => Promise<
    {
      uuid?: string;
    } & JWTPayloadSpec
  >;
};
