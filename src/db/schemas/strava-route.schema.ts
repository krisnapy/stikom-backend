import { relations } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  doublePrecision,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';

import { InferResultType } from '@/types/drizzle.types';
import { Location, MapUrls, RouteMap } from '@/types/strava.types';

import { stravaAthletes } from './strava-athlete.schema';
import { users } from './user.schema';

export const stravaRoutes = pgTable('strava_routes', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }),
  idStr: varchar('id_str', { length: 255 }),
  athleteId: bigint('athlete_id', { mode: 'number' }).references(
    () => stravaAthletes.id,
  ),
  type: integer('type'),
  subType: integer('sub_type'),
  description: text('description'),
  distance: doublePrecision('distance'),
  private: boolean('private'),
  resourceState: bigint('resource_state', { mode: 'number' }),
  starred: boolean('starred'),
  estimatedMovingTime: integer('estimated_moving_time'),
  map: jsonb('map').$type<RouteMap>(),
  elevationGain: doublePrecision('elevation_gain'),
  mapUrls: jsonb('map_urls').$type<MapUrls>(),
  startLocation: jsonb('start_location').$type<Location>(),
  finishedLocation: jsonb('finished_location').$type<Location>(),
  creatorId: uuid('creator_id').references(() => users.id),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const stravaRoutesRelations = relations(stravaRoutes, ({ one }) => ({
  athlete: one(stravaAthletes, {
    fields: [stravaRoutes.athleteId],
    references: [stravaAthletes.id],
  }),
  creator: one(users, {
    fields: [stravaRoutes.creatorId],
    references: [users.id],
  }),
}));

export type StravaRoute = InferResultType<'stravaRoutes'>;
