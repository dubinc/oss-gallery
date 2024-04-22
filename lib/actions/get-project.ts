import { cache } from "react";
import prisma from "../prisma";

export const getProjectBySlug = cache(async (slug: string) => {
  return await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      links: true,
    },
  });
});
