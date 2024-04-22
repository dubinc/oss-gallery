import { cache } from "react";
import prisma from "../prisma";

export const getProjectUser = cache(
  async ({ projectId, userId }: { projectId: string; userId: string }) => {
    return await prisma.projectUser.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });
  },
);
