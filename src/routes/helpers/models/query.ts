import { t } from "elysia";

export const queryCollectionModel = t.Object({
  limit: t.Optional(t.Number()),
  offset: t.Optional(t.Number()),
  total: t.Optional(t.Number()),
  page: t.Optional(t.Number()),
  totalPage: t.Optional(t.Number()),
  direction: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
  orderBy: t.Optional(t.String()),
});
