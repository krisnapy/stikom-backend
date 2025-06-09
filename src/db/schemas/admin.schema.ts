import { pgTable, varchar, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

export const adminTypes = pgEnum('admin_type', [
  'super_admin',
  'admin',
  'moderator',
]);

export const admins = pgTable('admins', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 50 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 15 }),
  password: varchar('password', { length: 100 }).notNull(),
  adminType: adminTypes('admin_type'),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export type Admin = InferResultType<'admins'>;
