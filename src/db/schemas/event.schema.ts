import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { groups } from './group.schema';
import { routes } from './route.schema';
import { users } from './user.schema';

export const eventStatus = pgEnum('event_status', ['cancelled', 'active']);

export const events = pgTable('events', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  creatorId: uuid('creator_id').references(() => users.id),
  groupId: uuid('group_id').references(() => groups.id),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  startTime: timestamp('start_time', { mode: 'date' }).notNull(),
  endTime: timestamp('end_time', { mode: 'date' }).notNull(),
  routeId: uuid('route_id').references(() => routes.id),
  status: eventStatus('status').notNull().default('active'),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const eventsRelations = relations(events, ({ one }) => ({
  route: one(routes, {
    fields: [events.routeId],
    references: [routes.id],
  }),
  creator: one(users, {
    fields: [events.creatorId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [events.groupId],
    references: [groups.id],
  }),
}));

export type Event = InferResultType<'events'>;
