import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, pgEnum  } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { groups } from './group.schema';
import { users } from './user.schema';

export const roleEnum = pgEnum('role', ['creator', 'admin', 'member']);

export const groupMembers = pgTable('group_members', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  groupId: uuid('group_id').references(() => groups.id),
  userId: uuid('user_id').references(() => users.id),
  role: roleEnum('role').notNull().default('member'),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}));

export type GroupMember = InferResultType<'groupMembers'>;
