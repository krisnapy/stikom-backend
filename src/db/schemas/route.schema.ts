import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  doublePrecision,
  pgEnum,
  jsonb,
  AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

import { InferResultType } from '@/types/drizzle.types';

import { stravaData } from './strava-data.schema';
import { users } from './user.schema';

export const routeSources = pgEnum('route_source', [
  'StravaRoute',
  'StravaActivity',
  'Manual',
]);

export const routes = pgTable('routes', {
  id: uuid('id').primaryKey().default(uuidv7()).$defaultFn(uuidv7),
  name: varchar('name', { length: 100 }).notNull(),
  startTime: timestamp('start_time', { mode: 'date' }).notNull(),
  distance: doublePrecision('distance').notNull(),
  duration: doublePrecision('duration').notNull(),
  elevation: doublePrecision('elevation').notNull(),
  startLocation: jsonb('start_location').$type<Location>(),
  finishLocation: jsonb('finish_location').$type<Location>(),
  creatorId: uuid('creator_id').references(() => users.id),
  stravaDataId: uuid('strava_data_id').references(() => stravaData.id),
  source: routeSources('source'),
  routeMapURL: text('route_map_url'),
  routeId: uuid('route_id').notNull().references((): AnyPgColumn => routes.id),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const routesRelations = relations(routes, ({ one }) => ({
  creator: one(users, {
    fields: [routes.creatorId],
    references: [users.id],
  }),
  route: one(routes, {
    fields: [routes.routeId],
    references: [routes.id],
  }),
  stravaData: one(stravaData, {
    fields: [routes.stravaDataId],
    references: [stravaData.id],
  }),
}));

export type Route = InferResultType<'routes'>;
