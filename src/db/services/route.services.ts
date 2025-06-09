import { eq } from 'drizzle-orm';

import { InferInsertType, InferUpdateType } from '@/types/drizzle.types';
import { Pagination } from '@/types/pagination.types';

import { db } from '..';
import { getDataList } from '../helpers/get-data-list';
import { routes } from '../schemas';

export const createRoute = async (data: InferInsertType<'routes'>) => {
  const [route] = await db.insert(routes).values(data).returning();
  return route;
};

export const findRouteById = async (id: string) => {
  const route = await db.query.routes.findFirst({
    where: eq(routes.id, id),
  });
  return route;
};

export const findAllRoutes = async (pagination?: Pagination<'routes'>) => {
  const result = await getDataList<'routes'>({
    data: routes,
    pagination,
    options: {
      with: {
        creator: true,
        stravaData: true,
      },
    },
  });

  return result;
};

export const updateRouteById = async (
  id: string,
  data: InferUpdateType<'routes'>,
) => {
  const [route] = await db
    .update(routes)
    .set(data)
    .where(eq(routes.id, id))
    .returning();
  return route;
};

export const deleteRouteById = async (id: string) => {
  const [route] = await db.delete(routes).where(eq(routes.id, id)).returning();
  return route;
};
