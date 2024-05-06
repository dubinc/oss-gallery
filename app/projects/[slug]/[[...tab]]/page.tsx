import ProjectAnalytics from "@/components/projects/project-analytics";
import ProjectTeam from "@/components/projects/project-team";
import { getProject } from "@/lib/actions/get-project";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [
    {
      tab: [], // for the root page
    },
  ];
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

  if (tab[0] === "team") {
    return <ProjectTeam project={project} />;
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

  return <ProjectAnalytics project={project} />;
}
