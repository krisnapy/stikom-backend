export const generateRequiredFields = (
  body: Record<string, unknown>,
  fields: string[],
) => {
  return fields.reduce((acc, field) => {
    if (!body[field]) {
      acc.data = {
        ...acc.data,
        ...Object.assign({
          [field]: {
            message: `Please input ${field}`,
            path: field,
          },
        }),
      };
      acc.message = 'Please input all required fields';
    }

    return acc;
  }, Object.assign({}));
};
