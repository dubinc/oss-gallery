"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { EnrichedProjectProps } from "../types";
import { FormResponse, editTeamSchema } from "./utils";

export async function editTeam(
  users: EnrichedProjectProps["users"],
  _prevState: any,
  data: FormData,
): Promise<FormResponse> {
  try {
    const { projectId } = editTeamSchema.parse({
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

    await Promise.all([
      prisma.projectUser.deleteMany({
        where: {
          projectId,
          NOT: {
            userId: {
              in: users.map((user) => user.id),
            },
          },
        },
      }),
      ...Array.from(users).map((user) =>
        prisma.projectUser.upsert({
          where: {
            projectId_userId: {
              projectId,
              userId: user.id,
            },
          },
          update: {
            role: user.role,
          },
          create: {
            projectId,
            userId: user.id,
            role: user.role,
          },
        }),
      ),
    ]);

    return {
      status: "success",
      message: "Team members updated successfully",
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
