export const generateRequiredFields = (body: any, fields: string[]) => {
  return fields.reduce((acc, field) => {
    if (!body[field]) {
      acc.error = {
        ...acc.error,
        ...Object.assign({
          [field]: {
            message: `Please input ${field}`,
            path: field,
          },
        }),
      };
      acc.message = "Please input all required fields";
    }

    return acc;
  }, Object.assign({}));
};
