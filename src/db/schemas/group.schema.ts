import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { groupMembers } from './group-member.schema';
import { users } from './user.schema';

export const groups = pgTable('groups', {
  id: uuid('id').primaryKey().$defaultFn(uuidv7),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  createdBy: uuid('created_by').references(() => users.id),
  avatar: varchar('avatar', { length: 255 }),
  isPublic: boolean('is_public').notNull().default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  groupMembers: many(groupMembers),
}));

export type Group = InferResultType<'groups'>;
