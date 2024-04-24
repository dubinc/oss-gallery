"use server";

import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { EnrichedProjectProps } from "../types";
import { authProject } from "./auth";
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

    await authProject({ projectId });

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
