export const createError = (status: any, message: string) => {
  const err = new Error();
  // err.status = status;
  err.message = message;
  return err;
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
