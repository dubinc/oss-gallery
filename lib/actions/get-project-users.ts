import { cache } from "react";
import prisma from "../prisma";

export const getProjectUsers = cache(
  async ({ projectId }: { projectId: string }) => {
    return await prisma.user.findMany({
      where: {
        projects: {
          some: {
            projectId,
          },
        },
      },
      include: {
        projects: {
          where: {
            projectId,
          },
        },
      },
    });
  },
);
