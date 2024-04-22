import { ZodIssue } from "zod";

export const getFormDataError = (errors: ZodIssue[], field: string) => {
  return errors.find((error) => error.path.includes(field));
};
