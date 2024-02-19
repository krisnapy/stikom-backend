import { Context } from "elysia";

import { JwtPayload } from "./jwt.types";
import { Admin, User } from "@/db/schemas";

interface Params {
  params: { id: string };
}

export interface ElysiaContext<NewContext extends Partial<Context> = {}>
  extends Omit<Context<NewContext>, "params">,
    Params {
  user?: User;
  admin?: Admin;

  jwtAccess: JwtPayload;
  jwtRefresh: JwtPayload;

  generateAccessSession: (
    auth: Partial<Admin> | Partial<User>,
    stored?: boolean
  ) => Promise<{
    accessToken: string;
    payload: JwtPayload;
  }>;

  generateRefreshSession: (
    auth: Partial<Admin> | Partial<User>,
    store?: boolean
  ) => Promise<{
    refreshToken: string;
    payload: JwtPayload;
  }>;

  generateRequiredFields: (fields: Array<string>) => any;
}
