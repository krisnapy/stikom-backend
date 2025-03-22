import { Context } from "elysia";

import { JwtPayload } from "./jwt.types";
import { Admin, User } from "@/db/schemas";

// Make ElysiaContext properly extend Context
export interface ElysiaContext<T = any> extends Context {
  params: { id: string };
  user?: User;
  admin?: Admin;
  body: T;
  set: Context["set"];
  cookie: Record<string, any>;

  jwtAccess: JwtPayload;
  jwtRefresh: JwtPayload;

  generateAccessSession: (
    auth: Partial<Admin | Admin[]> | Partial<User | User[]>,
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
