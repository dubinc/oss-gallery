"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUrlFromString, isValidUrl, trim } from "@dub/utils";
import { revalidatePath } from "next/cache";
import { ZodError, ZodIssue, z } from "zod";
import { editShortLink } from "../dub";
import { getRepo } from "../github";
import { ProjectWithLinks } from "../types";

const editProjectSchema = z.object({
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

export interface EditProjectProps {
  props?: ProjectWithLinks;
  success?: string;
  errors?: ZodIssue[];
}

export async function editProject(
  prevState: EditProjectProps,
  data: FormData,
): Promise<EditProjectProps> {
  try {
    const { name, description, github, website, projectId } =
      editProjectSchema.parse({
        name: data.get("name"),
        description: data.get("description"),
        github: data.get("github"),
        website: data.get("website"),
        projectId: data.get("projectId"),
      });

    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You need to be logged in to edit a project");
    }

    const userIsProjectMember = await prisma.projectUser.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    });

    if (!userIsProjectMember) {
      throw new Error("You need to be a member of this project to edit it");
    }

    const { props } = prevState;

    if (props.githubLink.url !== github) {
      const githubExists = await prisma.link.findUnique({
        where: { url: github },
      });

      if (githubExists) {
        throw new Error("This GitHub repository is already submitted");
      }

      const githubData = await getRepo(github);

      if (!githubData.name) {
        throw new Error("Invalid GitHub repository");
      }

      await editShortLink({
        link: props.githubLink,
        newUrl: github,
      });
    }

    if (props.websiteLink?.url !== website) {
      await editShortLink({
        link: props.websiteLink,
        newUrl: website,
      });
    }

    if (props.name !== name || props.description !== description) {
      const project = await prisma.project.update({
        where: { id: projectId },
        data: {
          name,
          description,
        },
      });

      revalidatePath(`/projects/${project.slug}`);
    }

    return {
      success: "Project updated successfully",
    };
  } catch (errors: any) {
    if (errors instanceof ZodError) {
      return { errors: errors.issues };
    }

    return {
      errors: [{ message: errors.message, code: "custom", path: ["unknown"] }],
    };
  }
}
