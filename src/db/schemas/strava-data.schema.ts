import { relations } from 'drizzle-orm';
import {
  bigint,
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { stravaActivities } from './strava-activity.schema';

export const stravaDataSources = pgEnum('strava_data_source', ['Activity', 'Route']);

export const stravaData = pgTable('strava_data', {
  id: uuid('id').primaryKey().default(uuidv7()),
  activityId: bigint('activity_id', { mode: 'number' }).references(
    () => stravaActivities.id,
  ),
  stravaRouteId: bigint('strava_route_id', { mode: 'number' }),
  routeId: varchar('route_id', { length: 255 }),
  movingTime: bigint('moving_time', { mode: 'number' }),
  estimatedMovingTime: bigint('estimated_moving_time', { mode: 'number' }),
  elapsedTime: bigint('elapsed_time', { mode: 'number' }),
  distance: doublePrecision('distance'),
  summaryPolyline: text('summary_polyline'),
  maxSpeed: doublePrecision('max_speed'),
  elevHigh: doublePrecision('elev_high'),
  elevLow: doublePrecision('elev_low'),
  elevGain: doublePrecision('elev_gain'),
  averageSpeed: doublePrecision('average_speed'),
  totalElevation: doublePrecision('total_elevation_gain'),
  source: stravaDataSources('source'),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const stravaDataRelations = relations(stravaData, ({ one }) => ({
  stravaActivity: one(stravaActivities, {
    fields: [stravaData.activityId],
    references: [stravaActivities.id],
  }),
}));
