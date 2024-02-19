import { JWTPayloadSpec } from "@elysiajs/jwt";

export type JwtPayload = {
  readonly sign: (
    morePayload: {
      id?: string;
    } & JWTPayloadSpec
  ) => Promise<string>;
  readonly verify: (jwt?: string) => Promise<
    {
      id?: string;
    } & JWTPayloadSpec
  >;
};
