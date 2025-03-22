import { BuildQueryResult } from 'drizzle-orm';
import pick from 'lodash/pick';

import { IncludeRelation, TSchema } from '@/types/drizzle.types';

export const includeAttributes = <DataType extends TSchema[keyof TSchema]>(
  data: BuildQueryResult<TSchema, DataType, any>,
  include: Array<keyof DataType['columns']>,
) => {
  if (Array.isArray(data)) return data.map((item) => pick(item, include));
  return pick(data, include);
};

export const includeWith = <DataType extends TSchema[keyof TSchema]>(
  data: BuildQueryResult<TSchema, DataType, any>,
  include: Array<keyof DataType['columns']>,
) => {
  return {
    with: {
      columns: includeAttributes(data, include),
    },
  } as IncludeRelation<keyof TSchema>;
};
