"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { editShortLink } from "../dub";
import { getRepo } from "../github";
import { getProject } from "./get-project";
import { FormResponse, editProjectSchema } from "./utils";

export async function editProject(
  _prevState,
  data: FormData,
): Promise<FormResponse> {
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

    const props = await getProject({ id: projectId });

    if (props.githubLink.url !== github) {
      const githubExists = await prisma.link.findUnique({
        where: { url: github },
      });

      if (githubExists) {
        throw new ZodError([
          {
            path: ["github"],
            code: "custom",
            message: "This GitHub repository is already submitted",
          },
        ]);
      }

      const githubData = await getRepo(github);

      if (!githubData.name) {
        throw new ZodError([
          {
            path: ["github"],
            code: "custom",
            message: "Invalid GitHub repository",
          },
        ]);
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
      await prisma.project.update({
        where: { id: projectId },
        data: {
          name,
          description,
        },
      });
    }

    return {
      status: "success",
      message: "Project updated successfully",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }
    return {
      status: "error",
      message: e.message,
    };
  }
}
