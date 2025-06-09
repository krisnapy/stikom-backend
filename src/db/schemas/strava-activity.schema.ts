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
} from 'drizzle-orm/pg-core';

import { InferResultType } from '@/types/drizzle.types';

import { stravaAthletes } from './strava-athlete.schema';

export const stravaActivities = pgTable('strava_activities', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  resourceState: integer('resource_state'),
  externalId: varchar('external_id', { length: 255 }),
  athleteId: bigint('athlete_id', { mode: 'number' }).references(
    () => stravaAthletes.id,
  ),
  uploadId: bigint('upload_id', { mode: 'number' }),
  name: varchar('name', { length: 255 }),
  distance: doublePrecision('distance'),
  movingTime: integer('moving_time'),
  elapsedTime: integer('elapsed_time'),
  totalElevationGain: doublePrecision('total_elevation_gain'),
  type: varchar('type', { length: 50 }),
  sportType: varchar('sport_type', { length: 50 }),
  startDate: timestamp('start_date'),
  startDateLocal: timestamp('start_date_local'),
  timezone: varchar('timezone', { length: 100 }),
  startLatitude: doublePrecision('start_latitude'),
  startLongitude: doublePrecision('start_longitude'),
  endLatitude: doublePrecision('end_latitude'),
  endLongitude: doublePrecision('end_longitude'),
  achievementCount: integer('achievement_count'),
  kudosCount: integer('kudos_count'),
  commentCount: integer('comment_count'),
  athleteCount: integer('athlete_count'),
  photoCount: integer('photo_count'),
  polyline: text('polyline'),
  summaryPolyline: text('summary_polyline'),
  trainer: boolean('trainer'),
  commute: boolean('commute'),
  manual: boolean('manual'),
  private: boolean('private'),
  flagged: boolean('flagged'),
  gearId: varchar('gear_id', { length: 255 }),
  fromAcceptedTag: boolean('from_accepted_tag'),
  averageSpeed: doublePrecision('average_speed'),
  maxSpeed: doublePrecision('max_speed'),
  averageCadence: doublePrecision('average_cadence'),
  averageTemp: integer('average_temp'),
  averageWatts: doublePrecision('average_watts'),
  weightedAverageWatts: integer('weighted_average_watts'),
  kilojoules: doublePrecision('kilojoules'),
  deviceWatts: boolean('device_watts'),
  hasHeartrate: boolean('has_heartrate'),
  maxWatts: integer('max_watts'),
  elevHigh: doublePrecision('elev_high'),
  elevLow: doublePrecision('elev_low'),
  prCount: integer('pr_count'),
  totalPhotoCount: integer('total_photo_count'),
  hasKudoed: boolean('has_kudoed'),
  workoutType: integer('workout_type'),
  sufferScore: doublePrecision('suffer_score'),
  description: text('description'),
  calories: doublePrecision('calories'),
  partnerBrandTag: varchar('partner_brand_tag', { length: 255 }),
  hideFromHome: boolean('hide_from_home'),
  deviceName: varchar('device_name', { length: 255 }),
  embedToken: varchar('embed_token', { length: 255 }),
  segmentLeaderboardOptOut: boolean('segment_leaderboard_opt_out'),
  leaderboardOptOut: boolean('leaderboard_opt_out'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const stravaActivitiesRelations = relations(
  stravaActivities,
  ({ one }) => ({
    athlete: one(stravaAthletes, {
      fields: [stravaActivities.athleteId],
      references: [stravaAthletes.id],
    }),
  }),
);

export type StravaActivity = InferResultType<'stravaActivities'>;
