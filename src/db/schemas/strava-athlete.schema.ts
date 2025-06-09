import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  bigint,
} from 'drizzle-orm/pg-core';

import { InferResultType } from '@/types/drizzle.types';

import { stravaTokens } from './strava-token.schema';

export const stravaAthletes = pgTable('strava_athletes', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  username: varchar('username', { length: 255 }),
  resourceState: integer('resource_state'),
  firstname: varchar('firstname', { length: 255 }),
  lastname: varchar('lastname', { length: 255 }),
  bio: text('bio'),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  country: varchar('country', { length: 255 }),
  sex: varchar('sex', { length: 255 }),
  premium: boolean('premium'),
  summit: boolean('summit'),
  badgeTypeId: integer('badge_type_id'),
  weight: integer('weight'),
  profileMedium: varchar('profile_medium', { length: 255 }),
  profile: varchar('profile', { length: 255 }),
  
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const stravaAthletesRelations = relations(
  stravaAthletes,
  ({ many }) => ({
    stravaTokens: many(stravaTokens),
  }),
);

export type StravaAthlete = InferResultType<'stravaAthletes'>;
