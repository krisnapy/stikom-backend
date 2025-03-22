import { TArray, TObject, TString, TNumber } from '@sinclair/typebox';
import { t } from 'elysia';

export const errorResponse = t.Object({
  message: t.String(),
  error: t.Any(),
});

export const collectionResponse = (
  data: Record<string, TArray | TObject | TString | TNumber>,
) => {
  return t.Object({
    message: t.String(),
    ...data,
    total: t.Number(),
    totalPage: t.Number(),
    currentPage: t.Number(),
    perPage: t.Number(),
    direction: t.String(),
    orderBy: t.String(),
  });
};

export const modelResponse = (model: Record<string, TObject>) => {
  return t.Object({
    message: t.String(),
    ...model,
  });
};
