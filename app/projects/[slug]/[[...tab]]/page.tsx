import ProjectAnalytics from "@/components/projects/project-analytics";
import { PROJECT_TABS } from "@/components/projects/project-constants";
import ProjectContentWrapper from "@/components/projects/project-content-wrapper";
import ProjectReadme from "@/components/projects/project-readme";
import ProjectTeam from "@/components/projects/project-team";
import { getProject } from "@/lib/actions/get-project";
import { notFound } from "next/navigation";

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
    return (
      <div className="flex flex-col space-y-8">
        <ProjectAnalytics project={project} />
        {project.readme && <ProjectReadme project={project} />}
      </div>
    );
  }

  if (tab[0] === "team") {
    return <ProjectTeam project={project} />;
  }

  if (tab[0] === "contributors") {
    return (
      <ProjectContentWrapper className="min-h-[22rem]">
        <a href={project.githubLink.shortLink} target="_blank">
          <img
            src={`https://contrib.rocks/image?repo=${
              project.githubLink.url.split("https://github.com/")[1]
            }`}
          />
        </a>
      </ProjectContentWrapper>
    );
  }
}
