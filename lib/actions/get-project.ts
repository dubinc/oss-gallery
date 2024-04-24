import { cache } from "react";
import prisma from "../prisma";
import { EnrichedProjectProps } from "../types";

export const getProject = cache(
  async ({ id, slug }: { id?: string; slug?: string }) => {
    const project = await prisma.project.findUnique({
      where: {
        id: id || undefined,
        slug: slug || undefined,
      },
      include: {
        links: true,
        users: {
          select: {
            role: true,
            userId: true,
            user: {
              select: {
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });
    const githubLink = project.links.find((link) => link.type === "GITHUB")!;
    const websiteLink = project.links.find((link) => link.type === "WEBSITE");
    return {
      ...project,
      githubLink,
      websiteLink,
      users: project.users.map(({ userId, role, user }) => ({
        id: userId,
        role,
        name: user.name,
        username: user.username,
        image: user.image,
      })),
    } as EnrichedProjectProps;
  },
);
