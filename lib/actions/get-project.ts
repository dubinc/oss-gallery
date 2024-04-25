import { cache } from "react";
import { getRepo } from "../github";
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
    if (!project) return null;

    const githubLink = project.links.find((link) => link.type === "GITHUB")!;
    const websiteLink = project.links.find((link) => link.type === "WEBSITE");

    const { stars, default_branch } = await getRepo(githubLink.url);

    if (stars !== project.stars) {
      await prisma.project.update({
        where: {
          slug,
        },
        data: {
          stars,
        },
      });
    }

    const readmeUrl =
      githubLink.url
        .replace("github.com", "raw.githubusercontent.com")
        .replace(/\/$/, "") + `/${default_branch}/README.md`;

    const readme = await fetch(readmeUrl)
      .then((res) => res.text())
      .catch(() => "");

    return {
      ...project,
      stars,
      githubLink,
      websiteLink,
      readme,
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
