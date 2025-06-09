import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { InferResultType } from '@/types/drizzle.types';

import { users } from './user.schema';

export const deviceInfos = pgTable('device_infos', {
  id: serial('id').primaryKey(),
  firebaseToken: varchar('firebase_token', { length: 255 }),
  userId: uuid('user_id').references(() => users.id),
  deviceModel: varchar('device_model', { length: 255 }),
  deviceOs: varchar('device_os', { length: 255 }),
  deviceOsVer: varchar('device_os_ver', { length: 255 }),
  country: varchar('country', { length: 255 }),
  appVersion: varchar('app_version', { length: 255 }),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const deviceInfosRelations = relations(deviceInfos, ({ one }) => ({
  user: one(users, {
    fields: [deviceInfos.userId],
    references: [users.id],
  }),
}));

export type DeviceInfo = InferResultType<'deviceInfos'>;
