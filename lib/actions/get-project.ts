import { cache } from "react";
import prisma from "../prisma";
import { ProjectWithLinks } from "../types";

export const getProject = cache(
  async ({ id, slug }: { id?: string; slug?: string }) => {
    const project = await prisma.project.findUnique({
      where: {
        id: id || undefined,
        slug: slug || undefined,
      },
      include: {
        links: true,
      },
    });
    if (!project) {
      return null;
    }
    const githubLink = project.links.find((link) => link.type === "GITHUB")!;
    const websiteLink = project.links.find((link) => link.type === "WEBSITE");
    return {
      ...project,
      githubLink,
      websiteLink,
    } as ProjectWithLinks;
  },
);
