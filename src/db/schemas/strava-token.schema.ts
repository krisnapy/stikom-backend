import { relations } from 'drizzle-orm';
import { pgTable, varchar, timestamp, bigint, uuid } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { stravaAthletes } from './strava-athlete.schema';
import { users } from './user.schema';

export const stravaTokens = pgTable('strava_tokens', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  userId: uuid('user_id').references(() => users.id),
  accessToken: varchar('access_token', { length: 255 }),
  refreshToken: varchar('refresh_token', { length: 255 }),
  expiresAt: bigint('expires_at', { mode: 'number' }),
  expiresIn: bigint('expires_in', { mode: 'number' }),
  stravaAthleteId: bigint('strava_athlete_id', { mode: 'number' }).references(
    () => stravaAthletes.id,
  ),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const stravaTokensRelations = relations(stravaTokens, ({ one }) => ({
  stravaAthlete: one(stravaAthletes, {
    fields: [stravaTokens.stravaAthleteId],
    references: [stravaAthletes.id],
  }),
  user: one(users, {
    fields: [stravaTokens.userId],
    references: [users.id],
  }),
}));

export type StravaToken = InferResultType<'stravaTokens'>;
