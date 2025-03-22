import camelCase from "lodash/camelCase";
import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { SQL, asc, desc, getTableName, sql } from "drizzle-orm";

import { Pagination } from "@/types/pagination.types";
import { db } from "..";
import { excludeAttributes } from "./exclude-attributes";
import {
  IncludeRelation,
  InferResultType,
  Schema,
  TSchema,
} from "@/types/drizzle.types";

// Define base pagination metadata type
type PaginationMetadata = {
  total: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
  direction: "asc" | "desc";
  orderBy: string;
};

type GetDataListProps<T extends keyof TSchema> = {
  data: Schema[T];
  pagination: Pagination<T>;
  options?: {
    with?: IncludeRelation<T>;
    where?: SQL;
    exclude?: Array<keyof InferResultType<T>>;
    columns?: Record<keyof InferResultType<T>, boolean>;
  };
};

export const getDataList = async <T extends keyof TSchema>(
  props: GetDataListProps<T>
) => {
  const { data, pagination, options } = props;
  const { direction = "asc", orderBy = "createdAt" } = pagination || {};

  const limit = Number(pagination?.limit) || 10;
  const offset = Number(pagination?.page) || 1;

  const tableName: T = camelCase(getTableName(data)) as T;

  const orderByColumn =
    direction === "asc"
      ? asc((data as any)[orderBy])
      : desc((data as any)[orderBy]);

  const datas = await db.query[tableName].findMany({
    limit: limit,
    offset: limit * Math.max(0, offset - 1),
    orderBy: orderByColumn,
    ...(options as any),
  });

  const formattedDatas = excludeAttributes<T>(datas, options.exclude || []);
  const [total] = await db
    .select({ count: sql<number>`(COUNT(*))` })
    .from(data as PgTableWithColumns<any>)
    .where(options?.where || undefined);
  const totalPage = Math.ceil(Number(total.count) / limit);

  return {
    [tableName as T]: formattedDatas,
    total: Number(total.count),
    totalPage,
    currentPage: offset,
    perPage: limit,
    direction,
    orderBy,
  } as PaginationMetadata & {
    [key in T]: Array<InferResultType<T>>;
  };
};
