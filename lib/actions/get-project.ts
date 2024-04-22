import { cache } from "react";
import prisma from "../prisma";
import { ProjectWithLinks } from "../types";

export const getProjectBySlug = cache(async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: {
      slug,
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
});
