import { Context, Cookie } from 'elysia';

import { Admin, User } from '@/db/schemas';

import { JwtPayload } from './jwt.types';

// Define function types separately
export type GenerateAccessSessionFn = (
  auth: Partial<Admin | Admin[]> | Partial<User | User[]>,
  stored?: boolean
) => Promise<{
  accessToken: string;
  payload: JwtPayload;
}>;

export type GenerateRefreshSessionFn = (
  auth: Partial<Admin> | Partial<User>,
  store?: boolean
) => Promise<{
  refreshToken: string;
  payload: JwtPayload;
}>;

export type GenerateRequiredFieldsFn = (
  fields: Array<string>
) => Record<string, unknown>;

// Make ElysiaContext properly extend Context
export interface ElysiaContext<T = unknown> extends Context {
  params: { id: string };
  user?: User;
  admin?: Admin;
  body: T;
  set: Context['set'];
  cookie: Record<string, Cookie<string>>;

  jwtAccess: JwtPayload;
  jwtRefresh: JwtPayload;

  generateAccessSession: GenerateAccessSessionFn;
  generateRefreshSession: GenerateRefreshSessionFn;
  generateRequiredFields: GenerateRequiredFieldsFn;
}
