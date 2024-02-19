import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import * as schema from "@/db/schemas";
import { PgInsertValue, PgUpdateSetSource } from "drizzle-orm/pg-core";

export type Schema = typeof schema;
export type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with?: With;
  }
>;

export type InferInsertType<TableName extends keyof TSchema> = PgInsertValue<
  Schema[TableName]
>;

export type InferUpdateType<TableName extends keyof TSchema> =
  PgUpdateSetSource<Schema[TableName]>;
