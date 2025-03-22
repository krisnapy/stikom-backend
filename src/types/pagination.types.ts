import { TSchema } from './drizzle.types';

export type Pagination<TableName extends keyof TSchema> = {
  limit?: number;
  offset?: number;
  total?: number;
  page?: number;
  totalPage?: number;
  direction?: 'asc' | 'desc';
  orderBy?: keyof TSchema[TableName]['columns'];
};
