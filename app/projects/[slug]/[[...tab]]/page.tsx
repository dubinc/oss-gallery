import ProjectAnalytics from "@/components/projects/project-analytics";
import { getProject } from "@/lib/actions/get-project";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map(({ slug }) => ({
    slug,
  }));
}

export default async function Project({
  params: { slug, tab },
}: {
  params: {
    slug: string;
    tab?: string[];
  };
}) {
  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  if (!tab) {
    return (
      project.image && (
        <img
          src={project.image}
          alt={project.name}
          className="mt-4 rounded-xl"
        />
      )
    );
  }

  if (tab[0] === "analytics") {
    return <ProjectAnalytics project={project} />;
  }

  if (tab[0] === "contributors") {
    return (
      <a href={project.githubLink.shortLink} target="_blank">
        <img
          src={`https://contrib.rocks/image?repo=${
            project.githubLink.url.split("https://github.com/")[1]
          }`}
        />
      </a>
    );
  }
}
