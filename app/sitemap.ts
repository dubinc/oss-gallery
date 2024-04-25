import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return [
    {
      url: "https://oss.gallery",
      lastModified: new Date(),
    },
    ...projects.map((project) => ({
      url: `https://oss.gallery/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
  ];
}
