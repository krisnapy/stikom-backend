export type ErrorType = {
  status?: number;
  message?: string;
  kind?: string;
};

export const errorHandler = (err?: ErrorType) => {
  let statusCode = 500;
  let message = "You're not authorized to access this";
  let kind = 'Internal Server Error';

  if (err.status) {
    statusCode = err.status;
  }

  if (err.message) {
    message = err.message;
  }

  if (err.kind) {
    kind = err.kind;
  }

  switch (statusCode) {
    case 400:
      kind = 'Bad Request';
      break;
    case 401:
      kind = 'Unauthorized';
      break;
    case 403:
      kind = 'Forbidden';
      break;
    case 404:
      kind = 'Not Found';
      break;
    default:
      kind = 'Internal Server Error';
  }

  return { kind, message };
};
