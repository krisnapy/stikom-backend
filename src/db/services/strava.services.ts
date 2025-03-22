import { eq } from 'drizzle-orm';

import { InferInsertType, InferUpdateType } from '@/types/drizzle.types';

import { db } from '..';
import { stravaAthletes, stravaTokens } from '../schemas';

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
