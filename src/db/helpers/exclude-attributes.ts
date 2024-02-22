import { BuildQueryResult } from "drizzle-orm";
import omit from "lodash/omit";

import { InferResultType, TSchema } from "@/types/drizzle.types";

export const excludeAttributes = <T extends keyof TSchema>(
  data: BuildQueryResult<TSchema, TSchema[T], any>,
  exclude: Array<keyof InferResultType<T>>
) => {
  if (Array.isArray(data))
    return data.map((item) => omit(item, exclude) as InferResultType<T>);

  return omit(data, exclude) as InferResultType<T>;
};
