import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { groups } from './group.schema';
import { stravaTokens } from './strava-token.schema';

export const genderEnum = pgEnum('gender', ['male', 'female']);
export const statusEnum = pgEnum('status', ['active', 'inactive']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  fullName: varchar('full_name', { length: 255 }),
  email: varchar('email', { length: 100 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 15 }),
  avatar: varchar('avatar', { length: 255 }),
  gender: genderEnum('gender'),
  password: varchar('password', { length: 100 }),
  country: varchar('country', { length: 100 }),
  address: text('address'),
  description: text('description'),
  status: statusEnum('status'),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(groups),
  stravaTokens: many(stravaTokens),
}));

export type User = InferResultType<'users'>;
