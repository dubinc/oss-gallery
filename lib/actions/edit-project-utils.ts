import { getUrlFromString, isValidUrl, trim } from "@dub/utils";
import { z } from "zod";

export type EditProjectProps =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export const editProjectSchema = z.object({
  name: z.preprocess(trim, z.string().min(1).max(64), {
    message: "Invalid project name",
  }),
  description: z.preprocess(trim, z.string().min(1).max(1000), {
    message: "Invalid project description",
  }),
  github: z
    .string()
    .transform((v) => getUrlFromString(v))
    .refine((v) => isValidUrl(v), { message: "Invalid GitHub URL" }),
  website: z
    .string()
    .transform((v) => getUrlFromString(v))
    .refine((v) => isValidUrl(v), { message: "Invalid website URL" })
    .optional(),
  projectId: z.string().min(8),
});
