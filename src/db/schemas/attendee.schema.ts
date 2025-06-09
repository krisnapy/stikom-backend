import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { events } from './event.schema';
import { users } from './user.schema';

export const attendees = pgTable('attendees', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  eventId: uuid('event_id').references(() => events.id),
  userId: uuid('user_id').references(() => users.id),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const attendeesRelations = relations(attendees, ({ one }) => ({
  event: one(events, {
    fields: [attendees.eventId],
    references: [events.id],
  }),
}));

export type Attendee = InferResultType<'attendees'>;