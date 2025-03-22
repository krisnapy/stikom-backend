import { Context, Cookie } from 'elysia';

import { Admin, User } from '@/db/schemas';

import { JWT } from './jwt.types';

// Define function types separately
export type GenerateAccessSessionFn = (
  auth: Partial<Admin | Admin[]> | Partial<User | User[]>,
  stored?: boolean
) => Promise<{
  accessToken: string;
  payload: JWT;
}>;

export type GenerateRefreshSessionFn = (
  auth: Partial<Admin> | Partial<User>,
  store?: boolean
) => Promise<{
  refreshToken: string;
  payload: JWT;
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

  jwtAccess: JWT;
  jwtRefresh: JWT;

  generateAccessSession: GenerateAccessSessionFn;
  generateRefreshSession: GenerateRefreshSessionFn;
  generateRequiredFields: GenerateRequiredFieldsFn;
}
