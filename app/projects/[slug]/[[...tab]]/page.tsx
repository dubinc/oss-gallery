import { PROJECT_TABS } from "@/components/projects/project-constants";
import ProjectTeam from "@/components/projects/project-team";
import { getProject } from "@/lib/actions/get-project";
import { LoadingSpinner } from "@dub/ui";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const ProjectAnalytics = dynamic(
  () => import("@/components/projects/project-analytics"),
  { ssr: false, loading: () => <LoadingSpinner /> },
);

export async function generateStaticParams() {
  return [
    {
      tab: [], // for the root page
    },
    ...PROJECT_TABS.map((tab) => ({
      tab: [tab.tab],
    })),
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

  if (!tab) {
    return <ProjectAnalytics project={project} />;
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
}
