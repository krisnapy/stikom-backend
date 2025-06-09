import { eq, sql } from 'drizzle-orm';

import { InferInsertType, InferUpdateType } from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { getDataList } from '../helpers/get-data-list';
import { events } from '../schemas/event.schema';

export const createEvent = async (data: InferInsertType<'events'>) => {
  const event = await db.insert(events).values(data).returning();
  return event;
};

export const findEventById = async (id: string) => {
  const event = await db.query.events.findFirst({
    where: eq(events.id, id),
  });
  return event;
};

export const findAllEvents = async (pagination?: Pagination<'events'>) => {
  const result = await getDataList<'events'>({
    data: events,
    pagination,
    options: {
      with: {
        creator: true,
        group: true,
        route: true,
      },
    },
  });

  return result;
};

export const updateEventById = async (
  id: string,
  data: InferUpdateType<'events'>,
) => {
  const event = await db
    .update(events)
    .set(data)
    .where(eq(events.id, id))
    .returning();
  return event;
};

export const deleteEventById = async (id: string) => {
  const event = await db.delete(events).where(eq(events.id, id)).returning();
  return event;
};

export const cancelEventById = async (id: string) => {
  const event = await db.execute(
    sql`UPDATE events 
    SET status = 'cancelled'
    WHERE events.id = ${id}`,
  );

  return event;
};
