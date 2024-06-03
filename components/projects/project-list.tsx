import prisma from "@/lib/prisma";
import { Suspense } from "react";
import ProjectGrid from "./project-grid";
import ProjectSort from "./project-sort";
import { ProjectSorts, sortOrderBy } from "@/lib/project";

export default function ProjectList({ sort }: {sort?: ProjectSorts;}) {
  return (
    <Suspense fallback={null}>
      <ProjectListRSC sort={sort} />
    </Suspense>
  );
}

async function ProjectListRSC({ sort }: {sort?: ProjectSorts;}) {
  const featured = ["gallery", "dub", "ui"];
  const projects = await prisma.project.findMany({
    where: {
      verified: true,
    },
    orderBy: sortOrderBy[sort] ?? sortOrderBy.stars,
  });

  const featuredProjects = featured.map((slug) =>
    projects.find((project) => project.slug === slug),
  );

  return (
    <div className="mx-5 md:mx-0">
      <div className="grid gap-4">
        <h2 className="font-display text-2xl font-semibold">Featured</h2>
        <ProjectGrid projects={featuredProjects} />
      </div>

      <div className="mb-8 mt-12 border-t border-gray-200" />

      <div className="grid gap-4">
        <div className="flex flex-col xs:flex-row gap-2">
          <h2 className="flex-1 font-display text-2xl">All Projects</h2>
          <ProjectSort />
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
