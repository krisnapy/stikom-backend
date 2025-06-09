import { eq } from 'drizzle-orm';

import { InferInsertType, InferUpdateType } from '@/types/drizzle.types';

import { db } from '..';
import {
  stravaActivities,
  stravaAthletes,
  stravaRoutes,
  stravaTokens,
} from '../schemas';
import { stravaData } from '../schemas/strava-data.schema';

import { findUserById } from './user.services';

export const createStravaToken = async (
  data: InferInsertType<'stravaTokens'>,
) => {
  const [token] = await db.insert(stravaTokens).values(data).returning();
  return token;
};

export const findStravaTokenByUserId = async (userId: string) => {
  const token = await db.query.stravaTokens.findFirst({
    where: eq(stravaTokens.userId, userId),
  });

  return token;
};

export const findStravaTokenByStravaAthleteId = async (
  stravaAthleteId: string,
) => {
  const token = await db.query.stravaTokens.findFirst({
    where: eq(stravaTokens.stravaAthleteId, Number(stravaAthleteId)),
  });

  return token;
};

export const createStravaAthlete = async (
  data: InferInsertType<'stravaAthletes'>,
) => {
  const [athlete] = await db.insert(stravaAthletes).values(data).returning();

  return athlete;
};

export const findStravaAthleteById = async (id: number) => {
  const athlete = await db.query.stravaAthletes.findFirst({
    where: eq(stravaAthletes.id, id),
  });

  return athlete;
};

export const findStravaAthleteByUsername = async (username: string) => {
  const athlete = await db.query.stravaAthletes.findFirst({
    where: eq(stravaAthletes.username, username),
  });

  return athlete;
};

export const updateStravaToken = async (
  data: InferUpdateType<'stravaTokens'>,
  id: string,
) => {
  const [token] = await db
    .update(stravaTokens)
    .set(data)
    .where(eq(stravaTokens.id, id))
    .returning();

  return token;
};

export const deleteStravaToken = async (id: string) => {
  const [token] = await db
    .delete(stravaTokens)
    .where(eq(stravaTokens.id, id))
    .returning();

  return token;
};

export const createStravaActivity = async (
  data: InferInsertType<'stravaActivities'>,
) => {
  const [activity] = await db.insert(stravaActivities).values(data).returning();
  return activity;
};

export const findStravaActivityById = async (id: bigint) => {
  const activity = await db.query.stravaActivities.findFirst({
    where: eq(stravaActivities.id, Number(id)),
  });

  return activity;
};

export const createStravaRoute = async (
  data: InferInsertType<'stravaRoutes'>,
) => {
  const [route] = await db.insert(stravaRoutes).values(data).returning();

  return route;
};

export const findStravaRouteById = async (id: bigint) => {
  const route = await db.query.stravaRoutes.findFirst({
    where: eq(stravaRoutes.id, Number(id)),
  });

  return route;
};

export const createStravaData = async (data: InferInsertType<'stravaData'>) => {
  const [strData] = await db.insert(stravaData).values(data).returning();

  return strData;
};

export const findStravaDataById = async (id: string) => {
  const data = await db.query.stravaData.findFirst({
    where: eq(stravaData.id, id),
  });

  return data;
};

export const updateStravaData = async (
  data: InferUpdateType<'stravaData'>,
  id: string,
) => {
  const [strData] = await db
    .update(stravaData)
    .set(data)
    .where(eq(stravaData.id, id))
    .returning();
  return strData;
};

export const findUserByStravaAthleteId = async (stravaAthleteId: string) => {
  const stravaToken = await findStravaTokenByStravaAthleteId(stravaAthleteId);

  if (!stravaToken) {
    return null;
  }

  const user = await findUserById(stravaToken.userId);
  return user;
};

export const findStravaAthleteByUserId = async (userId: string) => {
  const stravaToken = await findStravaTokenByUserId(userId);

  if (!stravaToken) {
    return null;
  }

  const athlete = await findStravaAthleteById(stravaToken.stravaAthleteId);

  return athlete;
};

export const createStravaActivities = async (
  data: InferInsertType<'stravaActivities'>[],
) => {
  const athleteActivities = await db.query.stravaActivities.findMany({
    where: eq(stravaActivities.athleteId, data[0].athleteId),
  });

  const filteredData = data.filter(
    (activity) =>
      !athleteActivities.some(
        (athleteActivity) => athleteActivity.id === activity.id,
      ),
  );

  if (filteredData.length === 0) {
    return athleteActivities;
  }

  const [activities] = await db
    .insert(stravaActivities)
    .overridingSystemValue()
    .values(filteredData)
    .returning();

  return activities;
};
