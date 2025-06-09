import { and, eq } from 'drizzle-orm';

import { InferInsertType } from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { getDataList } from '../helpers/get-data-list';
import { attendees } from '../schemas/attendee.schema';

export const createAttendee = async (data: InferInsertType<'attendees'>) => {
  const attendee = await db.insert(attendees).values(data).returning();
  return attendee;
};

export const findAttendeeById = async (id: string) => {
  const attendee = await db.query.attendees.findFirst({
    where: eq(attendees.id, id),
  });
  return attendee;
};

export const findAllAttendeesByEventId = async (
  eventId: string,
  pagination?: Pagination<'attendees'>,
) => {
  const result = await getDataList<'attendees'>({
    data: attendees,
    pagination,
    options: {
      where: eq(attendees.eventId, eventId),
    },
  });
  return result;
};

export const joinEventById = async (eventId: string, userId: string) => {
  const attendee = await db
    .insert(attendees)
    .values({ eventId, userId })
    .returning();
  return attendee;
};

export const leaveEventById = async (eventId: string, userId: string) => {
  const attendee = await db
    .delete(attendees)
    .where(and(eq(attendees.eventId, eventId), eq(attendees.userId, userId)))
    .returning();
  return attendee;
};
